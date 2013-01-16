<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Utitlity module for interactions. This is the 3rd implementation of interactions.
 * Twice within MongoDB and once in MySQL. This class depends on Actions sub classes
 * now. Each action class (interaction) has it's own attributes for both the document
 * interacted upon and the user that did the activity.
 *
 * The subclasses create database querys given certain details and are used
 * extensively throughout the models. This class provides a static interface
 * to those subclasses. It's other primary function is to decide which subclass
 * to call based on the interaction string given
 *
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Modules/Interact/Interact
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
*/
class Interact{

    /**
     *
     * @var Interact_Actions instantated subclass for actions
     */
    protected static $action_instance;

    /**
     * This is the primary function of this class. It deciphers which action
     * subclass to call.
     *
     * @param string $action look at the method itself to see what kind we user
     * @param string $model named object (type) e.g. listing (which is also a post)
     * @return Interact
     */
    public static function factory($action, $model = NULL)
    {
        $i = new Interact();
        switch($action)
        {
            case 'new_comment':
            case 'delete_comment':
            case 'approve_comment':
                static::$action_instance = new Actions_Comment($action);
            break;
            case 'like':
            case 'unlike':
                static::$action_instance = new Actions_Like($action, $model);
            break;
            case 'subscribe':
            case 'unsubscribe':
                static::$action_instance = new Actions_Subscribe($action, $model);
            break;
            //case 'new_post':case 'new_event':case 'new_listing':case 'new_testimonial':case 'delete_post':case 'delete_event':case 'delete_listing':case 'delete_testimonial':case 'approve_testimonial':
            default:
                static::$action_instance = new Actions_Post($action);
            break;
        }

        return $i;
    }

    /**
     * returns the actual database collection
     *
     * @see Interact_Actions
     * @return string
     */
    public static function model()
    {
        return static::$action_instance->model;
    }

    /**
     * returns the object type. this is different from the model. e.g
     * type = listing but model = post
     *
     * @see Interact_Actions
     * @return string
     */
    public static function object()
    {
        return static::$action_instance->object;
    }

    /**
     * returns the action performed by the user. like, subscribe, unlike, delete
     *
     * @see Interact_Actions
     * @return string
     */
    public static function action()
    {
        return static::$action_instance->action;
    }

    /**
     * returns a boolean that dictates if this is a positive action. e.g.
     * new post = positive. delete post = negative. this is critical in business
     * logical decisions in the models.
     *
     * @see Interact_Actions
     * @return bool
     */
    public static function is_positive()
    {
        return static::$action_instance->is_positive();
    }

    /**
     * every subclass has this method as depicted by the interface. this basically
     * sets the default properties of the action class. Each action has it's own
     * implementation
     *
     * @param string $action
     * @param string $model
     * @see Interact_Actions
     * @return null
     */
    public static function set_properties($action, $model = NULL)
    {
        return static::$action_instance->set_properties($action, $model);
    }

    /**
     * this method decides on the modifier operator to use on the db. depends on
     * is_positive() and returns either '$pull' or '$addToSet'
     *
     * @see Interact_Actions
     * @return string
     */
    public static function get_modifier()
    {
        return static::$action_instance->get_modifier();
    }

    /**
     * constructs a mongodb query array for the relevant counts updating
     * (i.e) the '$inc' modifier. this method pertains to the document
     *
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_count_query($subscribers = FALSE)
    {
        return static::$action_instance->get_count_query($subscribers);
    }

    /**
     * constructs a mongodb query array for the relevant counts updating
     * (i.e) the '$inc' modifier. this method pertains to the user
     *
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_user_count_query($subscribers = FALSE)
    {
        return static::$action_instance->get_user_count_query($subscribers);
    }

    /**
     * constructs a mongodb query array for the relevant document updates
     * relies on the get_modifier method above.
     * this method pertains to the document
     *
     * @param MongoID $user_id
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_modifier_query(MongoID $user_id, $subscribers = FALSE)
    {
        return static::$action_instance->get_modifier_query($user_id, $subscribers);
    }

    /**
     * constructs a mongodb query array for the relevant document updates
     * relies on the get_modifier method above.
     * this method pertains to the user
     *
     * @param MongoID $_id
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_user_modifier_query(MongoID $_id, $subscribers = FALSE)
    {
        return static::$action_instance->get_user_modifier_query($_id, $subscribers);
    }

    /**
     * constructs a mongodb query array that decides which document to work on
     * in the db. This query is to ensure no duplicated entries/updates are
     * created. this method pertains to the document
     *
     * @param MongoID $user_id
     * @see Interact_Actions
     * @return array
     */
    public static function get_criteria_query(MongoID $user_id)
    {
        return static::$action_instance->get_criteria_query($user_id);
    }

    /**
     * constructs a mongodb query array that decides which document to work on
     * in the db. This query is to ensure no duplicated entries/updates are
     * created. this method pertains to the user
     *
     * @see Interact_Actions
     * @param MongoID $_id
     * @return array
     */
    public static function get_user_criteria_query(MongoID $_id)
    {
        return static::$action_instance->get_user_criteria_query($_id);
    }

    /**
     * a combined final update query of get_count_query() and get_modifier_query()
     * of the extending sub class. this method pertains to the document.
     *
     * @param MongoID $user_id
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_update_query(MongoID $user_id, $subscribers = FALSE)
    {
        return static::$action_instance->get_update_query($user_id, $subscribers);
    }

    /**
     * a combined final update query of get_count_query() and get_modifier_query()
     * this method pertains to the user.
     *
     * @param MongoID $_id
     * @param bool $subscribers
     * @see Interact_Actions
     * @return array
     */
    public static function get_user_update_query(MongoID $_id, $subscribers = FALSE)
    {
        return static::$action_instance->get_user_update_query($_id, $subscribers);
    }

}