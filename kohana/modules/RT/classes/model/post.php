<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of post
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Post
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Post extends Document {

    protected static $after_delete_processing;
    public $is_single = false;

    /**
     * Create a default post with new values.
     *
     * @param array $params
     * @return boolean
     */
    public function create(array $params)
    {
//        $sparse = array_fill_keys(['sparse', 'safe'], true);
        $this->collection()->deleteIndexes();

        $this->collection()->ensureIndex(array_fill_keys([
                    'status', 'user._id', 'privacy.is', 'modified'], 1), [
            'name' => 'post_id_fields', 'safe' => true
        ]);
        $this->collection()->ensureIndex(['keywords' => 1]);
        $this->collection()->ensureIndex(['page_parent._id' => 1]);
        $this->collection()->ensureIndex(['company._id' => 1]);
        $this->collection()->ensureIndex(['page._id' => 1]);
        $this->collection()->ensureIndex(['page.subtype' => 1]);
        $this->collection()->ensureIndex(['to._id' => 1]);
        $this->collection()->ensureIndex(['type' => 1]);
        $this->collection()->ensureIndex(['listing.unit' => 1]);
        $this->collection()->ensureIndex(array_fill_keys([
                    'listing.type', 'listing.price', 'listing.rooms', 'listing.built_size', 'listing.leaseSpace'
                        ], 1));

        // overwrite defaults
        $type = \Arr::get($params, 'type', 'post') . '_fields';
        $type = $type === 'wallpost_fields' ? 'post_fields' : $type;
        // merge with defaults
        $data = Arr::merge(static::$type(), Arr::overwrite(static::$type(), static::validate_ids($params)));

        if (isset($data['listing']))
        {
            // sort fields so it matches DB index
            $data['listing'] = static::sort_listing_fields($data['listing']);
        }

        // load the document
        $this->load_values($data);
        //return $this;
        try
        {
            // save
            $this->save();
            $this->uri = '/post?id=' . (string) $this->_id;
            if ($this->message)
            {
                $this->excerpt = $this->get_excerpt_link();
            }
            $this->save();
        }
        catch (MongoException $e)
        {
            Debug::error(
                    "MongoException while trying to create post: :post \n"
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
     * A conversation is special. It is a post with dynamic messages. Messages are
     * added via comments & the latest message updates the conversation.
     * This method automatically creates a comment.
     *
     * @param array $params
     * @return array|boolean
     */
    public function create_conversation(array $params)
    {
        $this->create($params);

        return $this;
    }

    /**
     * An album is special. An album is a post because it has comments, privacy
     * and counts (of attachments)
     */
    public function create_album(array $params)
    {
        $defaults = [
            'name'      => '', 'mediainfo' => [], 'picture'   => '', 'privacy'   => ['is' => 'PUBLIC'], 'user'      => [],
            'message'   => '', 'excerpt'   => '', 'page'      => [], 'subtype'   => null, 'type'      => 'album',
        ];

        return $this->create(Arr::merge($defaults, $params));
    }

    /**
     * An attachment is currently the only post type that is a child of another
     * post type, (album)
     *
     * @param array $params
     * @return type
     */
    public function create_attachment(array $params)
    {
        $defaults = [
            'name'      => '', 'mediainfo' => [], 'picture'   => '', 'privacy'   => ['is' => 'PUBLIC'], 'user'      => [],
            'message'   => '', 'excerpt'   => '', 'page'      => [], 'subtype'   => null, 'type'      => 'attachment',
        ];

        return $this->create(Arr::merge($defaults, $params));
    }

    /**
     * Searches for a listing that has unique values. Returns false if none is
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
     * Calls the parent pages and user to update counts and timestamps.
     */
    public function after_save($action)
    {
        if ($action === parent::SAVE_INSERT || $action === parent::SAVE_UPSERT)
        {
            return $this->process_counts($this->as_array());
        }
    }

    /**
     * Unsets the 'created' field which was extracted from the MongoID
     * sets the modified timestamp, among other things.
     */
    public function before_save($action)
    {
        $this->modified = time();
        // Updates
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

        // Creates
        if ($action === parent::SAVE_INSERT || $action === parent::SAVE_UPSERT)
        {
            // auto-posts have no subscriptions, likes or comments for now.
            if (in_array($this->type, ['subscription', 'like']))
            {
                foreach (['comments', 'subscribers', 'likers'] as $value)
                {
                    unset($this->{$value}, $this->counts[$value]);
                }
            }

            // testimonials have no comments.
            if ($this->type === 'testimonial')
            {
                unset($this->comments, $this->counts['comments']);
            }

            // make sure all ids are mongo ids.
            $this->set('user._id', parent::check_id($this->user['_id']));
            $this->set('page._id', parent::check_id($this->page['_id']));
            // we check if there is a parent too.
            if (isset($this->page_parent))
            {
                $this->set('page_parent._id', parent::check_id($this->page_parent['_id']));
            }
        }

        return $this;
    }

    /**
     * Sets created timestamp
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
        $cu                     = $this->current_user ? $this->get_default_user_fields() : false;
        $cu_id                  = $cu ? (string) $cu['_id'] : false;
        $pid                    = parent::check_id($arr['_id']);
        $arr                    = parent::stringify($arr);
        $u_id                   = Arr::get($arr['user'], '_id');
        $arr['created']         = $pid->getTimestamp();
        $arr['generated_title'] = static::generate_title($arr);
        $arr['is_owner']        = $cu_id && $u_id && ($u_id === $cu_id);
        $arr['is_page_owner']   = $cu_id && $u_id && ((string) Arr::get($arr['page'], '_id') === $cu_id);
        if ($this->current_user)
        {
            $arr['actions'] = static::get_action_routes($arr);
            if ($arr['is_owner'])
            {
                $arr['actions'] = static::get_owner_action_routes($arr);
            }
            elseif ($arr['is_page_owner'])
            {
                $arr['actions'] = static::get_page_owner_action_routes($arr);
            }
        }

        $arr['connections'] = static::get_connection_routes($arr['_id']);

        if ($cu)
        {
            $arr['interactions'] = parent::factory('interaction', NULL, $cu_id)->interacting($arr['_id'], 'post');
        }

        if ($arr['type'] === 'album')
        {
            $limit                             = $this->is_single ? 12 : 6;
            $arr['connections']['attachments'] = Router::post('attachments', $arr['_id']);
            $subdocs                           = Collection::factory('post')
                    ->find(['type'     => 'attachment', 'page._id' => Document::check_id($arr['_id'])])
                    ->fields([
                        'picture', 'excerpt', 'type', 'subtype', 'mediainfo',
                        'user', 'page', 'uri', 'counts', 'link', 'status', 'name'
                    ])
                    ->limit($limit)
                    ->sort_desc('_id');
            while ($subdocs->hasNext())
            {
                $doc                  = $subdocs->getNext();
                $doc->current_user    = $this->current_user;
                $arr['attachments'][] = $doc->stringify($doc->as_array());
            }
        }
        if ($arr['type'] === 'listing')
        {
            if ($arr['showAddress'])
            {
                $add    = strtolower($arr['address']);
                $postal = parent::factory('singpost');
                $postal->load([
                    'keywords' => $add
                        ], ['geo' => 1]);
                if (!empty($postal->geo))
                {
                    $arr['geo']                        = $postal->geo;
                }
            }
            $arr['connections']['attachments'] = Router::listing('attachments');
            $arr['addedMedia']                 = parent::stringify((array) $arr['addedMedia']);
            $arr['attachments']                = [];
        }
        // we should trigger the comment model's formatting so each comment in
        // this post is properly formatted.
        $limit                             = $this->is_single ? 50 : 2;
        $skip                              = $this->is_single ? 0 : static::get_initial_comment_skip($arr['counts']['comments']);
        $arr['comments']                   = Collection::factory('comment')->fetch([
            'post_id' => $arr['_id'], 'status'  => 'active', 'type'    => 'comment',
            'limit'   => $limit,
            'skip'    => $skip
                ], $this->current_user, $arr);

        return $arr;
    }

    /**
     * Extract the user, post_id and pages.
     *
     */
    public function before_delete()
    {
        $this->load();
        Ticker::factory($this->_id)->delete();
        static::$after_delete_processing = $this->as_array();
    }

    /**
     * Process counts, remove comments and interactions.
     *
     * @return type
     */
    public function after_delete()
    {
        $f = static::$after_delete_processing;
        $this->process_counts($f, -1);

        // remove all embedded documents
        if (isset($f['counts']))
        {
            if ($f['counts']['subscribers'] > 0 || $f['counts']['likers'] > 0)
            {
                Collection::factory('interaction')
                        ->remove([
                            'object_id'   => parent::check_id($f['_id']),
                            'object_type' => 'post',
                                ], ['multiple' => true]);
            }

            if ($f['counts']['comments'] > 0)
            {
                Collection::factory('comment')
                        ->remove(['post._id' => parent::check_id($f['_id'])], ['multiple' => true]);
            }
        }

        if ($f['type'] === 'attachment' && $f['subtype'] === 'avatar')
        {
            $u = parent::factory('user', $f['user']['_id']);
            $u->load([], ['avatar' => 1]);
            if ($f['picture'] === $u->avatar)
            {
                $u->set('avatar', null);
                $u->save();
            }
        }

        return $this;
    }

    /**
     * This updates all respective counts of a post's user and a post's pages
     * depending the type of post and the increment.
     *
     * @param array $params the post
     * @param int $inc increase or decrease
     * @return \Model_Post
     */
    public function process_counts(array $params, $inc = 1)
    {
        $pages     = array_filter(\Arr::extract($params, ['page', 'to', 'page_parent']));
        $privacy   = \Arr::get($params, 'privacy');
        $type      = \Arr::get($params, 'type');
        $user      = \Arr::get($params, 'user');
        $subtype   = \Arr::get($params, 'subtype');
        $mediainfo = \Arr::get($params, 'mediainfo');

        // not empty seem redundant, just in case there are no pages.
        // future posts maybe?
        if (!empty($pages))
        {
            foreach ($pages as $page)
            {
                // we do different page updates based on the post type
                switch ($type)
                {
                    case 'wallpost' :
                    case 'checkin' :
                    case 'event' :
                    case 'post' :
                        $type = $type === 'wallpost' ? 'posts' : Inflector::plural($type);
                        // for other kinds of posts, we don't update the
                        // user whose page was written on.
                        parent::factory('page', $page['_id'])
                                ->inc('counts.' . $type, $inc)
                                ->save();
                        break;

                    case 'testimonial' :
                        // get the page type
                        $page_type = $page['type'] === 'user' ? 'user' : 'page';

                        parent::factory($page_type, $page['_id'])
                                ->inc('counts.testimonials.received', $inc)
                                ->save();
                        break;

                    case 'attachment':
                        $page_type = Arr::get($page, 'type');

                        if ($page_type === 'library')
                        {
                            if (strpos($mediainfo['mime'], 'image') !== false)
                            {
                                $type = 'picture';
                            }
                            elseif ($subtype === 'avatar')
                            {
                                $type = 'picture';
                            }
                            else
                            {
                                $type = 'document';
                            }
                            parent::factory('page', $page['_id'])
                                    ->inc('counts.' . Inflector::plural($type), $inc)
                                    ->save();
                        }
                        else
                        {
                            parent::factory('post', $page['_id'])
                                    ->inc('counts.' . Inflector::plural($type), $inc)
                                    ->save();
                        }

                        break;
                    case 'conversation' :
                        // conversations, we update both. Because we need
                        // the number of total conversations in each user's
                        // inbox.
                        parent::factory('user', $page['_id'])
                                ->inc('counts.conversations', $inc)
                                ->save();
                        break;
                    case 'album' :
                        // albums are organised by private and public
                        $field = $privacy['is'] === 'PUBLIC' ? 'albums.public' : 'albums.private';
                        parent::factory('page', $page['_id'])
                                ->inc('counts.' . $field, $inc)
                                ->save();
                        break;
                }
            }
        } // pages
        // now we update the user that created the post
        switch ($type)
        {
            case 'testimonial' :
                // update the user's count
                parent::factory('user', $user['_id'])
                        ->inc('counts.testimonials.written', $inc)
                        ->save();
                break;

            default :
                $type = $type === 'wallpost' ? 'posts' : Inflector::plural($type);

                parent::factory('user', $user['_id'])
                        ->inc('counts.' . $type, $inc)
                        ->save();
                break;
        }

        return $this;
    }

    /**
     * Updates privacy settings of a post.
     *
     * @param array $params
     * @param string|MongoID $user_id
     * @return type
     */
    public function update_privacy($params, $_id)
    {
        $field  = static::post_fields()['privacy'];
        $values = Arr::overwrite($field, $params);

        $this->load_values([
            '_id'     => new MongoID($_id),
            'privacy' => $values,
        ]);
        $this->save();

        return $values;
    }

    /**
     * returns a document with fields specific to what the Job::factory needs.
     *
     * @return \Document
     */
    public function job_fields()
    {
        return $this->load([], [
                    'user'         => 1, // '_id', 'name' of the user who created this
                    'to'           => 1, // '_id', 'name' of the user this message was sent to (for messages)
                    'page'         => 1, // '_id', 'name', 'type' the page it was written on (location, user profile etc...)
                    'page_parent'  => 1, // '_id', 'name', 'type' the page's parent (company or estate)
                    'listing'      => 1, // '_id'
                    'message'      => 1, // the content
                    'message_tags' => 1, // names of existing people within the content are parsed
                    'type'         => 1, // wallpost, testimonial, conversation, listing, checkin, event, album, image
                    'status'       => 1, // pending, active, expired,
                    'uri'          => 1,
                    'modified'     => 1,
                    'privacy'      => 1,
                    'counts'       => 1
                ]);
    }

    /**
     * Gets all the available action links that can be done to a user
     * (by a logged in user)
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_action_routes($post)
    {
        $defs = ['like', 'unlike', 'hide', 'unhide'];
        switch ($post['type'])
        {
            case 'testimonial' :
                $all = $defs;
                break;
            default:
                $all = \Arr::merge($defs, [
                    'subscribe', 'unsubscribe', 'comment', 'share', 'message'
                ]);
                break;
        }

        $actions = [];

        foreach ($all as $v)
        {
            $actions[$v] = Router::post($v, $post['_id']);
        }

        return $actions;
    }

    /**
     * Gets all action links, including private ones that a logged in user
     * can perform on this post
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_owner_action_routes($post)
    {
        $actions = ['privacy' => Router::post('privacy', $post['_id'])];
        return Arr::merge($actions, static::get_page_owner_action_routes($post));
    }

    /**
     * Gets all action links, including private ones that a logged in user
     * can perform on this post -> on his page
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_page_owner_action_routes($post)
    {
        $actions = [
            'delete' => Router::post('delete', $post['_id'])
        ];
        return Arr::merge($actions, static::get_action_routes($post));
    }

    /**
     * Gets all publically available connection links for a given post.
     *
     * @param string|MongoID $user_id
     * @return array
     */
    protected static function get_connection_routes($_id)
    {
        foreach (['likers', 'subscribers', 'fullContent'] as $k => $v)
        {
            $actions[$v]         = Router::post($v, $_id);
        }
        $actions['comments'] = Router::comment('get', $_id);
        return $actions;
    }

    /**
     * Generate the post title based on the post type and activity.
     *
     * @param array $post
     * @return string
     */
    protected static function generate_title($post)
    {
        // some empty vars
        $page_title = "Go to the {$post['page']['name']} {$post['page']['type']} page";

        $uri = $post['uri'];

        // for user type pages
        if ($post['page']['type'] === 'user')
        {
            $page_title = "Go to {$post['page']['name']}'s profile page";
        }

        // for album type pages
        if ($post['page']['type'] === 'album')
        {
            $page_title = "See {$post['user']['name']}'s {$post['page']['name']} album";
        }

        // for library type pages
        if ($post['page']['type'] === 'library')
        {
            $page_title = "See {$post['user']['name']}'s library";
        }

        // boolean if the post was written on on the author's wall
        $own_wall = (string) $post['page']['_id'] === (string) $post['user']['_id'];
        // used in case it was wriiten on his wall
        $ohw      = '.';

        if (isset($post['page']['uri']))
        {
            $page_link = html::anchor($post['page']['uri'], $post['page']['name'], ['title' => $page_title, 'class' => 'hoverCard', 'data-bind' => "title:'$page_title', qtip:getHoverCard"]);
        }
        else
        {
            // this is a user...
            $page_link = html::anchor('/' . $post['page']['_id'], $post['page']['name'], ['title' => $page_title, 'class' => 'hoverCard', 'data-bind' => "title:'$page_title', qtip:getUserHoverCard"]);
        }

        switch ($post['type'])
        {
            // wallpost, testimonial, conversation, listing, checkin, event, album
            case "checkin": return static::l($uri, 'checked in') . " to $page_link.";
            case "testimonial": return "wrote a " . static::l($uri, 'testimonial') . " about $page_link.";
            case "listing": return "created a " . static::l($uri, 'listing') . " in $page_link.";
            case "event": return "created an " . static::l($uri, 'event') . " in $page_link.";
            // because we don't show attachments...
            case "album":
                if ($post['counts']['attachments'] >= 1)
                    return "uploaded new media to " . static::l($uri, $post['name']) . ".";
                else
                    return "created a new album " . static::l($uri, $post['name']) . ".";
            case ("post" || 'wallpost'):
                $link = Arr::get($post, 'link');
                if ($link)
                {
                    switch ($link['type'])
                    {
                        case 'rich':
                            return "shared a " . static::l($uri, 'document') . "" . ($own_wall ? $ohw : " on $page_link's profile page.");
                        case 'video':
                            return "shared a " . static::l($uri, 'video') . "" . ($own_wall ? $ohw : " on $page_link's profile page.");
                        case 'photo':
                            return "shared a " . static::l($uri, 'photo') . "" . ($own_wall ? $ohw : " on $page_link's profile page.");
                        case 'link':
                            return "shared a " . static::l($uri, 'link') . "" . ($own_wall ? $ohw : " on $page_link's profile page.");
                    }
                }
                return "wrote a " . static::l($uri, 'post') . ($own_wall ? $ohw : " on $page_link's profile page.");
            default: return "shared in $page_link.";
        }
    }

    protected static function l($uri, $title)
    {
        return HTML::anchor($uri, $title, ['onclick' => 'javascript:return false;']);
    }

    /**
     * The standard post document.
     *
     * @return array
     */
    protected static function post_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'company'     => [], // '_id', 'name', 'type' the user's company if available
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'picture'     => null, // if this post has an image, this will be the url
            'mediainfo'   => [], // if this post has an image, this will be the url
            'link'        => [], // 'name', 'description', 'source' the original link if there is one.
            'type'        => 'post', // wallpost, testimonial, conversation, listing, checkin, event, album
            'subtype'     => '', // wallpost, testimonial, conversation, listing, checkin, event, album
            'status'      => 'active', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys([
                'attachments', 'comments', 'events', 'likers', 'subscribers'
                    ], 0),
            'subscribers' => [],
            'likers'      => []
        ];
    }

    protected static function conversation_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'to'          => [], // '_id', 'name' of the user this message was sent to (for messages)
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'type'        => 'conversation', // wallpost, testimonial, conversation, listing, checkin, event, album
            'subtype'     => '', // avatar
            'status'      => 'active', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys([
                'attachments', 'comments', 'events', 'likers', 'subscribers', 'conversations', 'newMessages'
            ], 0),
            'subscribers' => []
        ];
    }

    protected static function testimonial_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'company'     => [], // '_id', 'name', 'type' the user's company if available
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'picture'     => null, // if this post has an image, this will be the url
            'mediainfo'   => [], // if this post has an image, this will be the url
            'link'        => [], // 'name', 'description', 'source' the original link if there is one.
            'type'        => 'testimonial', // wallpost, testimonial, conversation, listing, checkin, event, album
            'subtype'     => '', // wallpost, testimonial, conversation, listing, checkin, event, album
            'status'      => 'pending', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys([ 'attachments', 'comments', 'likers', 'subscribers'], 0),
            'subscribers' => [],
            'likers'      => []
        ];
    }

    protected static function listing_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'company'     => [], // '_id', 'name', 'type' the user's company if available
            'listing'     => array_fill_keys([
                'type', 'price', 'rooms', 'built_size', 'land_size', 'cov', 'valuation', 'leaseSpace', 'cobroke', 'unit', 'property_type', 'baths'
                    ], 0),
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'picture'     => null, // if this post has an image, this will be the url
            'mediainfo'   => [], // if this post has an image, this will be the url
            'link'        => [], // 'name', 'description', 'source' the original link if there is one.
            'type'        => 'post', // wallpost, testimonial, conversation, listing, checkin, event, album
            'status'      => 'active', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys(['attachments', 'comments', 'events', 'likers', 'subscribers'], 0),
            'addedMedia'  => [],
            'subscribers' => [],
            'likers'      => [],
            'keywords'    => [],
            'subtype'     => "",
            'address'     => "",
            'showAddress' => true,
            'expiry'      => 0,
        ];
    }

    protected static function album_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'company'     => [], // '_id', 'name', 'type' the user's company if available
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'picture'     => null, // if this post has an image, this will be the url
            'mediainfo'   => [], // if this post has an image, this will be the url
            'link'        => [], // 'name', 'description', 'source' the original link if there is one.
            'type'        => 'album', // wallpost, testimonial, conversation, listing, checkin, event, album
            'subtype'     => '', // wallpost, testimonial, conversation, listing, checkin, event, album
            'status'      => 'active', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys([ 'attachments', 'comments', 'likers', 'subscribers'], 0),
            'subscribers' => [],
            'likers'      => []
        ];
    }

    protected static function attachment_fields()
    {
        return [
            'user'        => [], // '_id', 'name' of the user who created this
            'page'        => [], // '_id', 'name', 'type' the page it was written on (location, user profile, album etc...)
            'page_parent' => [], // '_id', 'name', 'type' the page's parent (estate or library)
            'company'     => [], // '_id', 'name', 'type' the user's company if available
            'name'        => '', // the content
            'excerpt'     => '', // the content summary (truncated)
            'message'     => '', // the content
            'picture'     => null, // if this post has an image, this will be the url
            'mediainfo'   => [], // if this post has an image, this will be the url
            'link'        => [], // 'name', 'description', 'source' the original link if there is one.
            'type'        => 'attachment', // wallpost, testimonial, conversation, listing, checkin, event, album
            'subtype'     => '', // wallpost, testimonial, conversation, listing, checkin, event, album
            'status'      => 'active', // pending, active, expired,
            'uri'         => '',
            'modified'    => 0,
            'privacy'     => ['is' => 'PUBLIC'],
            'counts'      => array_fill_keys(['comments', 'likers', 'subscribers'], 0),
            'subscribers' => [],
            'likers'      => []
        ];
    }

    protected static function validate_ids($data)
    {
        foreach ($data as $key => $value)
        {
            switch ($key)
            {
                case 'user':
                case 'to':
                case 'page':
                case 'company':
                case 'page_parent':
                    if (is_array($value))
                    {
                        foreach ($value as $k => $v)
                        {
                            if ($k === '_id')
                            {
                                $value[$k]  = parent::check_id($v);
                            }
                        }
                    }
                    $data[$key] = $value;
                    break;
                case '_id':
                    $data[$key] = parent::check_id($value);
                    break;
            }
        }

        return $data;
    }

    protected static function get_initial_comment_skip($count)
    {
        if ($count <= 2)
            return 0;
        if ($count > 2)
            return $count - 2;
    }

    protected function get_excerpt_link()
    {
        $link = '';
        if ($this->message)
        {
            if (strlen($this->message) !== strlen($this->excerpt))
            {
                $link = '&nbsp;&hellip;' . HTML::anchor($this->uri, '<small class="muted"><br>Continue Reading</small>', ['class' => 'post_read_more']);
            }
        }

        return $this->excerpt . $link;
    }

    protected static function sort_listing_fields(array $listing)
    {
        $keys = ['type', 'price', 'rooms', 'built_size', 'leaseSpace'];
        return \Arr::order($listing, $keys);
    }

}