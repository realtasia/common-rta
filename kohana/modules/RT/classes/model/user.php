<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of user
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage User
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_User extends Document {

    static $new_user_has_company = false;
    static $after_delete_fields = [];
    private $is_admin_request = false;
    /**
     * Retrieve a user by email, username or id
     *
     * @param MongoID|string $id
     * @param array $fields an array of fields to retrieve (or not)
     * @param boolean $object whether to return an object or array
     * @return array|null
     */
    public function get($id, array $fields = [], $object = TRUE)
    {
        if ($this->load(self::_get_one($id), $fields))
        {
            $ret = $this->stringify($this->as_array());
            return $object ? (object) $ret : $ret;
        }

        return null;
    }

    /**
     * Retrieve only user public fields by email, username or id. Fields should
     * ideally be exclude. i.e. <code>
     * [field => false]
     * </code>
     * After which we merge with some protected fields that we don't want anyway.
     *
     * @param MongoID|string $id
     * @param array $fields an array of fields to retrieve (or not)
     * @return array|null
     */
    public function get_public($id, array $fields = [])
    {
        return $this->get($id, static::$protected_fields);
    }

    /**
     * Create a default user with new values.
     *
     * @param array $params
     * @return boolean
     */
    public function create($params)
    {
        // if agent, we check for company and if it's an array.
        if (isset($params['company']) && !is_array($params['company']))
        {
            // retrieve the company
            $company = parent::factory('page');
            $company->load($params['company'], ['_id'  => 1, 'name' => 1, 'uri' => 1]);

            // set the user's company
            $params['company'] = $company->to_array();
        }

        // overwrite defaults to remove unwanted params
        $data = Arr::overwrite(static::$user_fields, $params);
        // merge with defaults
        $data = Arr::merge(static::$user_fields, $data);

        if (isset($data['password']))
        {
            $data['password'] = static::hash($data['password']);
        }
        $data['info']['birthday'] = strtotime($data['info']['birthday']);

        // beta users have a message, an interested field and a rep field (for)
        // sales representatives.
        /**
         * @todo remove these fields after beta
         */
        if(isset($params['message']))
        {
            $data['message'] = $params['message'];
        }

        // this field is only used for users who joined the program via the website
        if(isset($params['interested']))
        {
            $data['interested'] = (int) $params['interested'];
        }

        // this needs to exists for a newly registered user.
        if(isset($params['rep']) && is_array($params['rep']))
        {
            $data['rep'] = $params['rep'];
        }

        if(
                isset($params['company']) &&
                is_array($params['company']) &&
                (bool) Arr::get($data, 'interested', 0) &&
                (bool) Arr::get($data, 'rep', false)
        )
        {
            static::$new_user_has_company = $params['company'];
        }

        ksort($data);

        // load the document
        $this->load_values($data);

        try
        {
            // save
            $this->save();
        } catch (MongoException $e)
        {
            Debug::error(
                    "MongoCursorException while trying to create user :user \n"
                    . "Error Message- :message \n"
                    . "Error Code- :code", [
                ':user'    => print_r($data, TRUE),
                ':message' => $e->getMessage(),
                ':code'    => $e->getCode()
            ]);
            return false;
        }

        return $this;
    }

    /**
     * Unsets the 'created' field which was extracted from the MongoID
     * sets the active timestamp
     */
    public function before_save($action)
    {
        if (!isset($this->_changed["username"]) && isset($this->_object["username"]))
        {
            $this->uri = "/{$this->username}";
            $this->username = strtolower($this->username);
        }

        //Debug::log('Entered before_save ' . count($this->_operations));
        // Updates
        if ($action === parent::SAVE_UPDATE)
        {
            //Debug::log('before_save, in update' . print_r($this->_changed, true));
            $this->modified = time();
            //Debug::log('After modified ' . count($this->_operations));
            if (!isset($this->_changed['counts']) && isset($this->counts))
            {
                foreach ($this->counts as $k => $v)
                {
                    if ($v < 0)
                    {
                        $this->set('counts.' . $k, 0);
                    }
                }
            }
            //Debug::log('after counts ' . count($this->_operations));
            foreach (['interactions', 'private_actions', 'connections', 'actions', 'created'] as $v)
            {
                if (!isset($this->_changed[$v]) && isset($this->_object[$v]))
                {
                    unset($this->_object[$v]);
                }
            }
        }
    }


    public function after_save($action)
    {
        if(static::$new_user_has_company)
        {
            $this->add_to_company(static::$new_user_has_company, $this->_id);
        }

        static::$new_user_has_company = false;
    }

    public function before_delete()
    {
        if(!$this->loaded())
            $this->load();

        static::$after_delete_fields = $this->as_array();
    }

    public function after_delete()
    {
        $id = static::$after_delete_fields['_id'];
        parent::factory('comment')->collection()->remove_safe(['user._id' => parent::check_id($id)], ['multiple' => true]);
        parent::factory('interaction')->collection()->remove_safe(['user._id' => parent::check_id($id)], ['multiple' => true]);
        parent::factory('post')->collection()->remove_safe(['user._id' => parent::check_id($id)], ['multiple' => true]);
        parent::factory('page')->collection()->remove_safe(['user._id' => parent::check_id($id)], ['multiple' => true]);
        $this->remove_from_company(static::$after_delete_fields['company'], $id);
    }

    /**
     * Sets created timestamp
     */
    public function after_load()
    {
        if($this->password && count($this->password) > 0)
        {
            $this->password = null;
        }
    }

    /**
     * Set defaults if it was ever turned into an array.
     *
     * @param array $arr
     * @return array
     */
    public function stringify(array $arr = [])
    {
        $pid                    = parent::check_id($arr['_id']);
        $arr                    = parent::stringify($arr);
        $arr['created']         = $pid->getTimestamp();
        $arr['password']        = null;
        $arr['connections']     = static::get_public_connection_routes($arr['_id']);

        if ($this->current_user && isset($arr['_id']))
        {
                //die(json_encode(['status' => 'success', 'data' => $arr]));
            $current_user = (object) $this->get_default_user_fields();

            $arr['cu'] = $current_user;
            if ((string) $arr['_id'] === (string) $current_user->_id)
            {
                $arr['private_actions'] = [
                    'can_edit'         => true,
                    'can_like'         => false,
                    'can_subscribe'    => false,
                ];
                $arr['connections']  = static::get_all_connection_routes($arr);
                $arr['actions']      = static::get_action_routes($arr['_id']);
                return $arr;
            }
            else
            {
                $interactions        = parent::factory('interaction', NULL, $current_user->_id);
                $arr['interactions'] = $interactions->interacting($arr['_id'], 'user');
                $arr['actions']      = static::get_action_routes($arr['_id']);
                return $this->is_admin_request ? $arr : $this->unset_private_fields($arr);
            }
        }

        return $this->is_admin_request ? $arr : $this->unset_private_fields($arr);
    }

    /**
     * Updates privacy options.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_settings($params, $user_id)
    {
        $privacy  = static::$user_fields['settings']['privacy'];
        $privacy  = Arr::overwrite($privacy, $params['privacy']);
        $privacy  = $this->typecast($privacy, 'upper');

        $notifications  = static::$user_fields['settings']['notifications'];
        $notifications  = Arr::overwrite($notifications, $params['notifications']);
        $notifications  = $this->typecast($notifications, 'bool');


        $this->clear();

        $this->atomic($user_id);
        $this->set('settings.notifications', $notifications);
        $this->set('settings.privacy', $privacy);

        if($this->save())
        {
            return $this;
        }

        return false;

    }

    /**
     * Updates notification options.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_notifications($params, $user_id)
    {
        $field  = static::$user_fields['settings']['notifications'];
        $values = Arr::overwrite($field, $params);
        $values = $this->typecast($values, 'bool');


        $this->clear();

        $this->atomic($user_id);
        $this->set('settings.notifications', $values);

        $this->save();

        return $this->settings['notifications'];
    }

    /**
     * Updates user info.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_password($password, $user_id)
    {
        $this->clear();
        $this->load($user_id);

        $this->password = static::hash($password);

        return $this->save();
    }

    /**
     * Updates user info.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_billing($params, $user_id)
    {
        $field  = static::$user_fields['settings']['billing'];
        $values = Arr::overwrite($field, $params);

        $this->clear();
        $this->atomic($user_id);
        $this->set('settings.billing', $values);

        $this->save();

        return $this->$this->settings['billing'];
    }

    /**
     * Updates user info.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_info($params)
    {
        if(isset($params['password']))
        {
            $params['password'] = static::hash($params['password']);
        }
        $params['info'] = Arr::overwrite(static::$user_fields['info'], $params['info']);
        $params['info']['birthday']  = strtotime($params['info']['birthday']);

        if(isset($params['company']) && is_array($params['company']))
        {
            static::$new_user_has_company = $params['company'];
            $this->load(null, ['company' => 1]);
            $this->remove_from_company($this->company, $this->_id);
        }
        $this->load_values($params);
        $this->keywords = $this->extract_keywords($params);

        if($this->save())
            return $this;

        return false;
    }

    /**
     * Small utility function to reduce typing. returns an $or array for use in
     * a typical Mongo query
     *
     * @param string $username
     * @param bool $regex
     * @return array
     */
    protected static function _get_one($username, $regex = FALSE)
    {
        // Used if an actual keyword search is taking place. Uses MongoRegex()
        if ($regex)
        {
            $username = new MongoRegex("/^$username/i");
            return [
                '$or' => [
                    ['username' => $username],
                    ['email' => $username],
                    ['company.name' => $username]
                ]
            ];
        }
        // just a regular lookup
        return [
            '$or' => [
                ['_id' => new MongoID($username)],
                ['username' => strtolower($username)],
                ['email' => $username],
            ]
        ];
    }

    /**
     * Gets all the available action links that can be done to a user
     * (by a logged in user)
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_action_routes($user_id)
    {
        $actions = ['post' => Router::post('update', $user_id)];

        foreach (['like', 'unlike', 'subscribe', 'unsubscribe'] as $k => $v)
        {
            $actions[$v] = Router::user($v, $user_id);
        }

        return $actions;
    }

    /**
     * Gets all connection links, including private ones belonging to a
     * logged in user
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_all_connection_routes($user)
    {
        $actions = [];
        $uid = \Arr::get($user, '_id');
        $lid = \Arr::path($user, 'library._id');

        foreach (['privacy', 'notifications', 'conversations', 'subscriptions'] as $v)
        {
            $actions[$v] = Router::user($v, $uid);
        }

        $actions['library'] = Router::user('library', $lid);
        $actions['messages'] = Router::user('messages');
        $actions['user'] = $uid;
        return Arr::merge($actions, static::get_public_connection_routes($uid));
    }

    /**
     * Gets all publically available connection links for a given user.
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_public_connection_routes($user_id)
    {
        $actions = [];
        $routes = [
            'likers',
            'avatar',
            'subscribers',
            'info',
            'listings',
            'feed',
            'albums',
            'testimonials'
        ];

        foreach ($routes as $v)
        {
            $actions[$v] = Router::user($v, $user_id);
        }

        return $actions;
    }

    protected function remove_from_company($c, $uid)
    {
        if(empty($c))
            return false;


        $company = parent::factory('page', $c['_id']);
        $company->pull('members', ['_id' => parent::check_id($uid)]);
        $company->inc('counts.members', -1);
        $company->save();
    }

    protected function add_to_company($c, $uid)
    {
        if(!isset($this->name) || empty($this->name))
        {
            $user = $this->collection()->findOne(['_id' => parent::check_id($uid)], ['_id' => 1, 'name' => 1]);
            $user = (object) $this->stringify($user);
        }
        else
        {
            $user = clone $this;
        }
        $company = parent::factory('page', $c['_id']);
        $company->addToSet('members', ['_id' => parent::check_id($user->_id), 'name' => $user->name]);
        $company->inc('counts.members', 1);
        $company->save();
        $company->collection()->update(
          ['_id' => $company->_id, 'members' => ['$size' => 11]],
          ['$pop' => ['members' => -1]]
        );
    }

    public function extract_keywords(array $params)
    {
        $keywords = \Arr::extract($params, ['email', 'name', 'username']);
        $keywords[] = \Arr::path($params, 'company.name');
        $telephone  = SMS::valid(\Arr::path($params, 'info.telephone.mobile'));
        if($telephone)
        {
            $keywords[] = $telephone;
            $keywords[] = substr($telephone, -8);
        }

        $keywords = \Arr::flatten($keywords);

        $keywords = array_map('strtolower', array_filter($keywords));

        return array_values(array_unique($keywords));
    }

    /**
     * Checks privacy and unsets all important private fields. This is called
     * when there is no logged in user or when the current user is requesting
     * for public information.
     *
     * @return \Model_User
     */
    public function unset_private_fields($arr)
    {
        $settings = isset($arr['settings']) ? $arr['settings'] : NULL;
        if ($settings)
        {
            switch ($settings['privacy']['contacts']['is'])
            {
                case 'SUBSCRIBERS':
                    if ($arr['interactions']['subscribe'])
                    {
                        $arr['info']['telephone'] = null;
                        $arr['info']['social'] = null;
                        $arr['email'] = null;
                    }
                    break;

                case 'PRIVATE':
                    $arr['info']['telephone'] = null;
                    $arr['info']['social'] = null;
                    $arr['email'] = null;
                    break;

                case 'CUSTOM': //check if current user id is in this list
                    //$arr['info']['telephone'] = '';
                    //$arr['info']['social']    = '';
                    //$arr['email']             = '';
                    break;
            }
            switch ($settings['privacy']['personal']['is'])
            {
                case 'SUBSCRIBERS':
                    if (!$this->interactions['subscribe'])
                    {
                        $arr['info']['gender'] = null;
                        $arr['info']['birthday'] = null;
                    }
                    break;

                case 'PRIVATE':
                    $arr['info']['gender'] = null;
                    $arr['info']['birthday'] = null;
                    break;

                case 'CUSTOM': //check if current user id is in this list
                    //$arr['info']['telephone'] = '';
                    //$arr['info']['social']    = '';
                    //$arr['email']             = '';
                    break;
            }
        }

        unset($arr['password'],
                $arr['logins'],
                $arr['private_actions'],
                $arr['settings']['billing'],
                $arr['keywords']);

        return $arr;
    }


    public function check_password($id, $password)
    {
        $r = $this->collection()->findOne(['_id' => parent::check_id($id)], ['password' => 1]);

        return $r['password'] === static::hash($password);
    }

    /**
     * A getter/setter that allows admins to retrieve sensitive fields. Yes this
     * is a privacy flaw and not very secure, but I need a quick fix. Existing
     * functionality is not aware of this method.
     *
     * @todo Seriously need to relook this
     * @param boolean $set
     * @return boolean
     */
    public function is_admin($set = false)
    {
        $this->is_admin_request = $set;
        return $this->is_admin_request;
    }

    /**
     * These are fields that are not needed for public consumption.
     *
     * @var array
     */
    private static $protected_fields = [
        'password'               => false,
        'settings.billing'       => false,
        'settings.notifications' => false
    ];

    /**
     * The standard user document.
     *
     * @var array
     */
    public static $user_fields = [
        'password' => '',
        'logins'   => [
//            'user_id'      => '',
//            'type'         => '',
//            'username'     => '',
//            'email'        => '',
//            'access_token' => '',
//            'token_type'   => '',
//            'expires_in'   => '',
//            'name'         => '',
//            'picture'      => '',
        ],
        'settings'     => [
            'locale'  => 'en_SG',
            'billing' => [
                'mode'      => 'cash',
                'frequency' => 'monthly',
                'plan_id'   => NULL
            ],
            'privacy'   => [
                'is'       => 'PUBLIC',
                'contacts' => ['is'       => 'PUBLIC'],
                'personal' => ['is'            => 'PUBLIC'],
                'subscriptions' => ['is'       => 'PUBLIC'],
                'messages' => ['is'       => 'PUBLIC'],
                'mentions' => ['is'        => 'PUBLIC'],
                'wallposts' => [
                    'others_posts' => ['is'                      => 'PUBLIC'],
                    'others_posts_visibility' => ['is'            => 'PUBLIC']
                ]
            ],
            'notifications' => [
                'email'  => '',
                'likers' => [
                    'own_post'    => TRUE,
                    'other_posts' => TRUE,
                    'profile'     => TRUE,
                    'comments'    => TRUE,
                ],
                'subscribers' => [
                    'own_post'    => TRUE,
                    'other_posts' => TRUE,
                    'profile'     => TRUE,
                ],
                'comments'    => [
                    'own_post'    => TRUE,
                    'other_posts' => TRUE,
                ],
                'mentions'    => TRUE,
                'testimonial' => TRUE,
                'wallpost'    => TRUE,
                'messages'    => TRUE,
                'pages'       => 'Weekly',
            ]
        ],
        'username'    => '',
        'email'       => '',
        'first_name'  => '',
        'middle_name' => '',
        'last_name'   => '',
        'name'        => '',
        'status'      => 'pending',
        'company'     => [],
        'designation' => '',
        'license'     => '',
        'roles'       => ['user'],
        'summary'     => '',
        'avatar'      => null,
        'uri'         => '',
        'subscribers' => [],
        'likers' => [],
        'library' => [],
        'active' => '',
        'counts' => [
            'albums'        => 0,
            'attachments'   => 0,
            'checkins'      => 0,
            'conversations' => 0,
            'events'        => 0,
            'likers'        => 0,
            'listings'      => 0,
            'pages'         => 0,
            'posts'         => 0,
            'messages'      => 0,
            'newMessages'   => 0,
            'subscribers'   => 0,
            'testimonials'  => [
                'received'   => 0,
                'written'    => 0,
            ]
        ],
        'info'         => [
            'telephone' => ['mobile'    => ''],
            'languages' => [],
            'birthday'     => '',
            'gender'       => '',
            'achievements' => [],
            'education' => [],
            'social' => []
        ]
    ];

}