<?php defined('SYSPATH') or die('No direct script access.');
/**
 * The interface all action classes must implement.
 *
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Modules/Interact/Interface/Actions
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
*/
Interface Interface_Actions{

    // method that returns a boolean to check if this is a positive interaction
    public function is_positive();

    // method that sets the properties of the implementing class
    public function set_properties($action, $model = NULL);

    // method that returns a Mongo '$addToSet' or '$pull' modifier based on is_positive()
    public function get_modifier();

    // constructs a Mongo query array for '$inc' modifier based on the action
    public function get_count_query($subscribers = FALSE);

    // constructs a Mongo query array for '$inc' modifier to update the interacter based on the action
    public function get_user_count_query($subscribers = FALSE);

    // constructs a Mongo query array for the modifier set above based on action
    public function get_modifier_query(MongoID $_id, $subscribers = FALSE);

    // constructs a Mongo query array to update the interacter based on the action
    public function get_user_modifier_query(MongoID $_id, $subscribers = FALSE);

    // constructs a Mongo query array for the criteria based on action
    public function get_criteria_query(MongoID $user_id);

    // constructs a Mongo query array to query the interacter based on the action
    public function get_user_criteria_query(MongoID $_id);

}