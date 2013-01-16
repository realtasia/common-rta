<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Abstract Class that is extended by all Action classes. These methods are collectives
 * that validates the interface and never change between subclasses
 *
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Modules/Interact/Interact
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
*/
abstract class Actions{

    /**
     * @var string. the object in question by name. listing, comment etc
     */
    public $object;
    /**
     * @var string. the model in question by name. post, page etc
     */
    public $model;
    /**
     * @var bool. a boolean value that dictates if this a positive action
     */
    public $is_positive;

    /**
     * construct runs the set_properties() method of the current extending class
     * certain classes don't need model (type) to be declared (comments)
     *
     * @param string $action
     * @param string $model
     */
    public function __construct($action, $model = NULL)
    {
        $this->set_properties($action, $model);
    }

    /**
     * Utility method that returns the already instantated property
     *
     * @return bool
     */
    public function is_positive()
    {
        return $this->is_positive;
    }

    /**
     * Utility method that returns the db modifier to use. '$pull' or '$addToSet'
     * based on the the is_positive attribute
     *
     * @return bool
     */
    public function get_modifier()
    {
        return $this->is_positive() ? '$addToSet' : '$pull';
    }

    /**
     * a combined final update query of get_count_query() and get_modifier_query()
     * of the extending sub class. this method pertains to the document.
     *
     * @param MongoID $user_id
     * @param bool $subscribers
     * @return array
     */
    public function get_update_query(MongoID $user_id, $subscribers = FALSE)
    {
        //debug::log(print_r($subscribers, true));
        return $this->get_count_query($subscribers) + $this->get_modifier_query($user_id, $subscribers);
    }

    /**
     * a combined final update query of get_count_query() and get_modifier_query()
     * of the extending sub class. this method pertains to the user.
     *
     * @param MongoID $_id
     * @param bool $subscribers
     * @return array
     */
    public function get_user_update_query(MongoID $_id, $subscribers = FALSE)
    {
        return $this->get_user_count_query($subscribers) + $this->get_user_modifier_query($_id, $subscribers);
    }

    /**
     * Utility method that returns the proper db collection based on the given
     * object type
     *
     * @param string $model the object type given
     * @return string
     */
    protected static function _get_model($model)
    {
        switch($model)
        {
            case 'user':
            case 'comment': return $model;
            case 'location': return 'page';
            default: return 'post';
        }
    }
}