<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Interactions Comment Helper.
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Modules/Interactions/Comment
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
 */
class Actions_Comment extends Actions implements Interface_Actions{

    public $model = 'post';
    public $object = 'comments';

    /**
     * Comments have 2 positive actions and one negative
     *
     * @param string $action
     * @param string $model
     */
    public function set_properties($action, $model = NULL)
    {
        switch ($action)
        {
            case 'new_comment':
                $this->action = 'new';
                $this->is_positive = TRUE;
            break;
            case 'delete_comment':
                $this->action = 'delete';
                $this->is_positive = FALSE;
            break;
            case 'approve_comment':
                $this->action = 'approve';
                $this->is_positive = FALSE;
            break;
        }
    }

    /**
     * No need for extra criterias
     *
     * @param MongoID $user_id
     * @return array
     */
    public function get_criteria_query(MongoID $user_id)
    {
        return array();
    }

    /**
     * No need for extra criterias.
     *
     * @param MongoID $_id
     * @return type
     */
    public function get_user_criteria_query(MongoID $_id)
    {
        return array();
    }

    /**
     * If model wants a subscriber update, we'd include it. Otherwise, just a
     * modified time query is returned
     *
     * @param MongoID $user_id
     * @param bool $subscribers
     * @return array
     */
    public function get_modifier_query(MongoID $user_id, $subscribers = FALSE)
    {
        $subs = array('$set' => array('modified' => time()));

        if($subscribers)
            $subs[parent::get_modifier()] = array('subscribers' => $user_id);

        return $subs;
    }

    /**
     * If model wants a subscription update, we'd include it. Otherwise, just a
     * modified active query is returned
     *
     * @param MongoID $_id
     * @param bool $subscribers
     * @return array
     */
    public function get_user_modifier_query(MongoID $_id, $subscribers = FALSE)
    {
        $subs = array('$set' => array('active' => time()));
        $subs[parent::get_modifier()] = array('subscriptions.'.Inflector::plural($this->model) => $_id);

        return $subs;
    }

    /**
     * If model wants a subscriber count, we'd include it. Otherwise, just a
     * comment count query is returned
     *
     * @param bool $subscribers
     * @return array
     */
    public function get_count_query($subscribers = FALSE)
    {
        $count = $this->is_positive() ? 1 : -1;

        $counter = array('counts.'.$this->object => $count);

        if($subscribers)
            $counter['counts.subscribers'] = $count;

        return array('$inc' => $counter);
    }

    /**
     * If model wants a subscription count, we'd include it. Otherwise, just a
     * comment count query is returned
     *
     * @param MongoID $user_id
     * @param bool $subscribers
     * @return array
     */
    public function get_user_count_query($subscribers = FALSE)
    {
        $count = $this->is_positive() ? 1 : -1;

        $counter = array('counts.'.$this->object => $count);

        if($subscribers)
            $counter['counts.subscriptions'] = $count;

        return array('$inc' => $counter);
    }

}