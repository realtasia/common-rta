<?php defined('SYSPATH') or die('No direct script access.');

/**
 * RealtAsia's comment Model
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Comment
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Comment extends Document {

    protected $after_delete_fields = [];
    public $current_post;

    /**
     * Creates a comment.
     *
     * @param array $params
     */
    public function create($params)
    {
        $this->collection()->ensureIndex([
            'type'     => 1, 'status'   => 1, 'modified' => -1
                ], ['safe' => true]);
        $this->collection()->ensureIndex([
            'user._id' => 1
                ], ['safe' => true]);
        $this->collection()->ensureIndex([
            'post._id'  => 1, 'post.type' => 1
                ], [ 'safe' => true]);

        $params = $this->check_params($params);

        if (isset($params['_id']))
        {
            $this->atomic($params['_id']);
            unset($params['_id']);
        }
        //return $params;
        $this->load_values($params);

        if ($this->save())
        {
            $this->uri     = '/comment.php?id=' . (string) $this->_id;
            $this->excerpt = $this->get_excerpt_link();
            $this->save();
            return $this;
        }

        return false;
    }

    /**
     * A message is only created for the conversation post type. Slightly different
     * because it doesn't have counts or is likeable.
     *
     * @param type $params
     * @return \Model_Comment|boolean
     */
    public function create_message($params)
    {
        $args = [
            'post'    => [
                '_id'  => $params['post']['_id'],
                'type' => $params['post']['type'],
            ],
            'message' => $params['message'],
            'excerpt' => $params['excerpt'],
            'user'    => $params['user'],
            'type'    => 'message'
        ];

        $this->load_values($params);

        if ($this->save())
            return $this;

        return false;
    }

    /**
     * Feedback is a special comment type that does not have a post id.
     *
     * @param type $params
     * @return \Model_Comment|boolean
     */
    public function create_feedback($params)
    {
        $args = [
            'message'     => $params['message'],
            'user'        => $params['user'],
            'environment' => (array) $params['environment'],
            'type'        => 'feedback'
        ];

        $this->load_values($args);

        if ($this->save())
            return $this;

        return false;
    }

    /**
     * Checks & validates the comment
     *
     * @param array $params
     * @return boolean
     */
    protected function check_params(array $params)
    {
        if (!$this->current_user->loaded())
            return false;

        $user = (array) $this->get_default_user_fields();

        $params['user']    = Arr::get($params, 'user', $user);
        $params['counts']  = ['likers' => 0];
        $params['likers']  = [];
        $params['excerpt'] = Arr::get($params, 'excerpt');
        $params['status']  = Arr::get($params, 'status', 'active');
        return static::validate_ids($params);
    }

    /**
     * Extract the post and user id of this comment. Possibly, retrieve the post
     * object.
     */
    public function before_delete()
    {
        if (!$this->loaded())
            $this->load();

        $this->after_delete_fields = $this->as_array();
    }

    /**
     * Job should have a delete function with given params. Updates counts and
     * deletes potential likers to this comment.
     */
    public function after_delete()
    {
        $id     = Arr::get($this->after_delete_fields, '_id');
        $post   = Arr::get($this->after_delete_fields, 'post');
        $user   = Arr::get($this->after_delete_fields, 'user');
        $counts = Arr::get($this->after_delete_fields, 'counts');

        $object = parent::factory('post', $post['_id']);

        $object->inc('counts.comments', -1);
        //$object->pull('comments', $this->after_delete_fields);
        $object->save();

        if ($counts && $counts['subscribers'] > 1)
        {
            parent::factory('interaction')->collection()
                    ->remove_safe([
                        'object_id'   => parent::check_id($id),
                        'object_type' => 'comment',
                            ], ['multiple' => true]);
        }

        parent::factory('user', $user['_id'])->save();
    }

    /**
     * Add this user as a subscriber to the object that he commented on.
     *
     * @param type $action
     */
    public function after_save($action)
    {
        if ($action === parent::SAVE_INSERT || $action === parent::SAVE_UPSERT)
        {
            $i = parent::factory('interaction', null, $this->user['_id']);
            $i->subscribe($this->post['_id'], 'post');

            $object = parent::factory('post', $this->post['_id']);

            $object->inc('counts.' . Inflector::plural($this->type));

            $object->save();
        }

        // update the user's last active
        if ($this->current_user instanceof Document)
        {
            $this->current_user->save();
        }

        return $this;
    }

    /**
     * Checks if the current_user is interacting with this object.
     * Also checks if the current_user can delete this object
     */
    public function after_load()
    {
        return $this;
    }

    public function stringify(array $arr = [])
    {
        // get the current user
        $cu             = $this->current_user ? $this->get_default_user_fields() : false;
        $cu_id          = $cu ? (string) $cu['_id'] : false;
        $pid            = parent::check_id($arr['_id']);
        $arr            = parent::stringify($arr);
        $arr['created'] = $pid->getTimestamp();
        $post           = $this->current_post;
        if (!$post)
        {
            $post = Document::factory('post', $arr['_id']);
            $post->load(null, ['user' => 1, 'page' => 1]);
            $post = $post->as_array();
        }

        $u_id        = (string) Arr::get($arr['user'], '_id');
        $arr['post'] = \Arr::merge(\Arr::get($arr, 'post', []), \Arr::extract($post, ['user', 'page'], []));

        $arr['is_owner']      = $cu_id && $u_id && ($u_id === $cu_id);
        $arr['is_post_owner'] = $cu_id && $u_id && ((string) $post['user']['_id'] === $cu_id);
        $arr['is_user_page']  = $cu_id && $u_id && ((string) $post['page']['_id'] === $cu_id);
        $arr['actions']       = $arr['is_owner'] || $arr['is_post_owner'] || $arr['is_user_page'] ? static::get_all_action_routes($arr) : static::get_action_routes($arr);

        $arr['connections'] = [
            'likers'      => Router::comment('likers', $arr['_id']),
            'fullContent' => Router::comment('fullContent', $arr['_id'])
        ];

        if ($cu)
        {
            $arr['interactions'] = parent::factory('interaction', NULL, $cu_id)->interacting($arr['_id'], 'comment');
        }

        return $arr;
    }

    public function get_action_routes($comment)
    {
        $all = [];
        switch ($comment['type'])
        {
            case 'comment' :
                $all = ['like', 'unlike'];
                break;
        }

        $actions = [];

        foreach ($all as $v)
        {
            $actions[$v] = Router::comment($v, $comment['_id']);
        }

        return $actions;
    }

    public function get_all_action_routes($comment)
    {
        $actions = ['delete' => Router::comment('delete', $comment['_id'])];
        return Arr::merge($actions, static::get_action_routes($comment));
    }

    protected static function validate_ids($data)
    {
        foreach ($data as $key => $value)
        {
            switch ($key)
            {
                case 'user':
                case 'post':
                case 'page':
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

    protected function get_excerpt_link()
    {
        $link = '';
        if ($this->message)
        {
            if (strlen($this->message) !== strlen($this->excerpt))
            {
                $link = '&nbsp;&hellip;' . HTML::anchor($this->uri, '<small class="muted"><br>Continue Reading</small>', ['class' => 'comment_read_more']);
            }
        }

        return $this->excerpt . $link;
    }

}