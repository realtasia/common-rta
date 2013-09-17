<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of Page
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Page
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Page extends Document {

    /**
     * Retrieve a single page
     *
     * @param MongoID|string|array $id or an array of query params
     * @return array|null
     */
    public function get($id, array $fields = [], $object = TRUE)
    {
        $id = parent::check_id($id);
        if ($id instanceof MongoID)
        {
            $query['_id'] = $id;
        }
        elseif(is_array($id))
        {
            $query = ['keywords' => [
                '$in' => $id
            ]];
        }
        else
        {
            $query = ['keywords' => URL::title($id)];
        }

        $query['privacy.is'] = 'PUBLIC';

        if ($this->load($query, $fields))
        {
            $ret = $this->stringify($this->as_array());
            return $object ? (object) $ret : $ret;
        }
        return false;
    }

    /**
     * Create a page with new values.
     *
     * @param array $params
     * @return boolean
     */
    public function create($params)
    {
        $type    = Arr::get($params, 'type');
        $subtype = Arr::get($params, 'subtype');

        if (isset($params['name']))
        {
            // library has no uri, for now...
            if ($params['type'] !== 'library')
            {
                $params['uri'] = "/$type";
                $params['uri'] .= empty($subtype) ? '' : "/" . URL::title($subtype);
                $params['uri'] .= "/" . URL::title($params['name']);
            }

            $params['slug'] = URL::title($params['name']);
        }


        // overwrite defaults
        $data = Arr::overwrite(static::_page_defaults($type, $subtype), $params);
        // merge with defaults
        $data = Arr::merge(static::_page_defaults($type, $subtype), $data);

        if ($id = Arr::get($params, '_id'))
        {
            $this->atomic($id);
            unset($params['_id']);
        }

        // sort - for some sanity in debugging.. :-)
        $d = $this->get_keywords($data);
        ksort($d);
        //return $data;
        // load the document
        $this->load_values($data);

        try
        {
            // save
            $this->save();
        }
        catch (MongoException $e)
        {
            Debug::error(
                    "MongoException while trying to create page: :page \n"
                    . "Error Message- :message \n"
                    . "Error Code- :code", [
                ':post'    => print_r($data, TRUE),
                ':message' => $e->getMessage(),
                ':code'    => $e->getCode()
            ]);
            return false;
        }

        return $this;
    }

    /**
     * Searches for a document that has unique values. Returns false if none is
     * found and the id of the document if found.
     *
     * @param array $params
     * @return boolean|array
     */
    public function find_unique(array $params)
    {
        $query = [
            'listing.unit' => $params['unit'],
            'listing.type' => $params['listing_type'],
            'page.id'      => parent::check_id($params['page_id']),
            'user.id'      => parent::check_id($params['user_id'])
        ];

        return $this->get($query, ['_id' => 1], false);
    }

    /**
     * Unsets the 'created' field which was extracted from the MongoID
     * sets the modified timestamp
     */
    public function before_save($action)
    {
        $this->modified = time();
        //$this->keywords = $this->get_keywords();

        if ($action === parent::SAVE_UPDATE)
        {
            // during testing a whole lot of counts went into negative. Just a
            // small sanity check.
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
            foreach (['interactions', 'private_actions', 'connections', 'actions', 'created'] as $v)
            {
                if (!isset($this->_changed[$v]) && isset($this->{$v}))
                {
                    unset($this->{$v});
                }
            }
        }
    }

    /**
     * Converts timestamps to dates.
     * Checks and sets current user attributes. (if user returned is the user logged in)
     * Otherwise, checks current user's interaction with the returned user
     */
    public function after_load()
    {
        return $this;
    }

    /**
     * Converts timestamps to dates.
     * Checks and sets current user attributes. (if user returned is the user logged in)
     * Otherwise, checks current user's interaction with the returned user
     */
    public function stringify(array $arr = [])
    {
        // get the current user
        $cu                   = $this->current_user ? $this->get_default_user_fields() : false;
        $cu_id                = $cu ? (string) $cu['_id'] : false;
        $pid                  = parent::check_id($arr['_id']);
        $arr                  = parent::stringify($arr);
        $u_id                 = Arr::get($arr['user'], '_id');
        $arr['created']       = $pid->getTimestamp();
        $arr['is_owner']      = $cu_id && $u_id && ($u_id === $cu_id);
        $arr['is_page_owner'] = $cu_id && $u_id && ((string) Arr::get($arr['page'], '_id') === $cu_id);
        $arr['connections']   = static::get_connection_routes($arr['_id'], $arr['type'], $arr['subtype']);

        if ($cu)
        {
            $arr['interactions']    = parent::factory('interaction', NULL, $cu_id)->interacting($arr['_id'], 'page');
            $arr['actions']         = static::get_action_routes($arr);
            $arr['actions']['post'] = Router::post('update', $cu_id);
        }

        return $arr;
    }

    /**
     * Updates privacy settings of a page.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_privacy($params, $_id)
    {
        $field  = static::$post_fields['privacy'];
        $values = Arr::overwrite($field, $params);

        $this->load_values([
            '_id'     => new MongoID($_id),
            'privacy' => $values,
        ]);
        $this->save();

        return $values;
    }

    /**
     * Gets all the available action links that can be done to a user
     * (by a logged in user)
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_action_routes($page)
    {
        $a       = ['like', 'unlike'];
        $actions = [];

        if (strtolower($page['type']) !== 'company' && strtolower($page['subtype']) !== 'estate')
        {
            $a[] = 'subscribe';
            $a[] = 'unsubscribe';
        }

        foreach ($a as $v)
        {
            $actions[$v] = Router::page($v, $page['_id']);
        }

        return $actions;
    }

    /**
     * Gets all publically available connection links for a given post.
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_connection_routes($_id, $type, $subtype = NULL)
    {
        $routes  = [
            'likers',
            'feed',
            'subscribers',
            'testimonials',
        ];
        $actions = [];

        switch ($type)
        {
            case 'location':
                if ($subtype && $subtype === 'estate')
                {
                    $routes[] = 'child-locations';
                }
                $routes[] = 'pictures';
                break;
            case 'company':
                $routes[] = 'members';
                break;
        }

        foreach ($routes as $v)
        {
            $actions[$v] = Router::page($v, $_id);
        }

        return $actions;
    }

    protected static function _page_defaults($type, $subtype = null)
    {
        $counts = $type == 'library' ? static::library_counts() : static::counts();
        if ($subtype === 'estate')
        {
            $counts['locations'] = 0;
        }
        $defaults            = array(
            'content'     => '',
            'counts'      => $counts,
            'likers'      => [],
            'modified'    => time(),
            'parent'      => [],
            'privacy'     => ['is' => 'PUBLIC'],
            'stats'       => [],
            'status'      => 'active',
            'subscribers' => [],
            'subtype'     => '',
            'name'        => '',
            'type'        => $type,
            'slug'        => '',
            'uri'         => '',
            'user'        => [],
            'attachments' => [],
        );

        switch ($type)
        {
            case 'location':
                return Arr::merge($defaults, ['attachments' => [], 'sector'      => '']);
            case 'company' : return Arr::merge($defaults, static::_company_defaults());
            default: return $defaults;
        }
    }

    protected static function _company_defaults()
    {
        return ['license' => '', 'counts'  => ['members' => 0], 'members' => []];
    }

    protected static function counts()
    {
        return [
            'attachments'  => 0,
            'checkins'     => 0,
            'events'       => 0,
            'likers'       => 0,
            'listings'     => 0,
            'posts'        => 0,
            'subscribers'  => 0,
            'members'      => 0,
            'testimonials' => 0
        ];
    }

    protected static function library_counts()
    {
        return [
            'pictures'  => 0,
            'videos'    => 0,
            'documents' => 0,
            'albums'    => [
                'public'  => 0,
                'private' => 0,
            ]
        ];
    }

    protected function get_keywords()
    {
        $keywords = [];
        foreach ($this->_object as $k => $v)
        {
            switch ($k)
            {
                case 'parent':
                case 'page':
                    if (is_array($v))
                    {
                        $keywords[] = Arr::get($v, 'name');
                    }
                    break;
                case 'name':
                    if ($this->_object->type !== 'library')
                    {
                        $keywords[] = $v;
                    }
                    break;
            }
        }
        return array_filter($keywords);
    }
}