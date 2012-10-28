<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Realtasia user notifications. Contains helper functions to aid in user
 * notifications
 *
 * @author Jason Nathan
 * @package RTA Core
 * @subpackage Modules/RTA Core/Notifications
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
 */
class Notifications{

    /**
     * @var notifications object
     */
    protected $notifications;

    /**
     * factory method. requires a string id or MongoID. can also be a user array directly
     *
     * @param string|MongoID|MongoDocument $user
     * @return Notifications
     */
    public static function factory($user)
    {
        return new Notifications($user);
    }

    public function __construct($user)
    {
        $this->notifications = static::parse_input($user);
    }

    /**
     * Sets or gets notification setting for likes on a user's own post
     *
     * @param bool $set if param is given, sets this notification.
     * @return bool
     */
    public function own_post_likes($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->likers['own_post'];

        $this->notifications->likers['own_post'] = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for likes on another user's post.
     * This is in the event a user has interacted on that post (consequently
     * effecting an auto-subscribe) and does not want to receive further
     * notifications for new likes.
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function other_post_likes($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->likers['other_posts'];

        $this->notifications->likers['other_posts'] = (bool) $set;
        return TRUE;

    }

    /**
     * Sets or gets notification setting for likes on a user's profile
     *
     * @param bool $set if param is given, sets this notification.
     * @return bool
     */
    public function profile_likes($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->likers['profile'];

        $this->notifications->likers['profile'] = (bool) $set;
        return TRUE;

    }

    /**
     * Sets or gets notification setting when a another user subscribes to a post
     *
     * @param bool $set if param is given, sets this notification.
     * @return bool
     */
    public function own_post_subscribes($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->subscribers['own_post'];

        $this->notifications->subscribers['own_post'] = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for subscribes on a user's profile
     *
     * @param bool $set if param is given, sets this notification.
     * @return bool
     */
    public function profile_subscribes($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->subscribers['profile'];

        $this->notifications->subscribers['profile'] = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for comments on a user's own post
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function own_post_comments($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->comments['own_post'];

        $this->notifications->comments['own_post'] = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for comments on another user's post.
     * This is in the event a user has interacted on that post (consequently
     * effecting an auto-subscribe) and does not want to receive further
     * notifications for new comments.
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function other_post_comments($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->comments['other_posts'];

        $this->notifications->comments['other_posts'] = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for a mention
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function mention($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->mentions;

        $this->notifications->mentions = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for a new testimonial
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function testimonial($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->testimonial;

        $this->notifications->testimonial = (bool) $set;
        return TRUE;
    }

    /**
     * Sets or gets notification setting for a new post in profile page
     *
     * @param bool $set if param is given, sets this notification
     * @return bool
     */
    public function wallpost($set = NULL)
    {
        if ($set === NULL)
            return (bool) $this->notifications->wallpost;

        $this->notifications->wallpost = (bool) $set;
        return TRUE;
    }

    /**
     * Decides what input was given in the factory method and sets the static
     * notification property
     *
     * @param string|MongoID|MongoDocument $input
     * @return object|bool a notification object or false
     */
    protected static function parse_input($input)
    {
        if((is_object($input) AND $input instanceof MongoID) OR is_string($input))
        {
            $u = Model::factory('user')->get_selective($input, array('notifications'));
            return (object) $u->notifications;

        }
        if(isset($input['notifications']) AND !empty($input['notifications']))
            return (object) $input['notifications'];

        if(isset($input['wallpost']))
            return (object) $input;

        return false;
    }

    public function as_array()
    {
        return (array) $this->notifications;
    }

    public function __destruct()
    {
        return $this->as_array();
    }

}