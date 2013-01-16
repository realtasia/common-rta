<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Interactions Subscribe Helper.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.9
 * @subpackage Modules/Interactions/Subscribe
 * @copyright 2012 Realtasia Pte Ltd
 */
class Actions_Subscribe extends Actions implements Interface_Actions{

    public function set_properties($action, $model = NULL)
    {
        $this->model = parent::_get_model($model);
        $this->object = Inflector::plural($model);
        $this->action = $action;
        $this->is_positive = $this->action == 'subscribe' ? TRUE : FALSE;
    }

    public function get_criteria_query(MongoID $user_id)
    {
        $check = $this->is_positive() ? '$nin' : '$in';

        return array(
           'subscribers' => array( $check => array($user_id))
        );
    }

    public function get_user_criteria_query(MongoID $_id)
    {
        $check = $this->is_positive() ? '$nin' : '$in';

        return array(
           'subscriptions' => array( $check => array($_id))
        );
    }

    public function get_modifier_query(MongoID $user_id, $subscribers = FALSE)
    {
        return array(
           parent::get_modifier() => array('subscribers' => $user_id),
           '$set' => array('modified' => time())
        );
    }

    public function get_user_modifier_query(MongoID $_id, $subscribers = FALSE)
    {
        $subs = array('$set' => array('active' => time()));
        $subs[parent::get_modifier()] = array('subscriptions.'.$this->object => $_id);

        return $subs;
    }

    public function get_count_query($subscribers = FALSE)
    {
        $count = $this->is_positive() ? 1 : -1;

        return array('$inc' => array('counts.subscribers' => $count));
    }

    public function get_user_count_query($subscribers = FALSE)
    {
        $count = $this->is_positive() ? 1 : -1;

        return array('$inc' => array(
           'counts.'.$this->object => $count,
           'counts.subscriptions' => $count
        ));
    }

}