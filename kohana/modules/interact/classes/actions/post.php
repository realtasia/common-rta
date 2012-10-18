<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Interactions Post Helper.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.9
 * @subpackage Modules/Interactions/Post
 * @copyright 2012 Realtasia Pte Ltd
 */
class Actions_Post extends Actions implements Interface_Actions{

    public $model = 'post';
    public $object;

    public function set_properties($action, $model = NULL)
    {
        $action_arr = explode('_', $action);
        $this->action = $action_arr[0];
        $this->object = Inflector::plural($action_arr[1]);
        switch ($this->action)
        {
            case 'new':
            case 'approve':
                $this->is_positive = TRUE;
            break;
            default:
                $this->is_positive = FALSE;
            break;
        }
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
        $subs = array('$set' => array('modified' => time()));

        if($subscribers)
            $subs[parent::get_modifier()] = array('subscribers' => $user_id);

        return $subs;
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