<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Collection extends Mongo_Collection {
    /**
     * Utility to sort arrays
     *
     * @param string $a
     * @param string $b
     * @return int
     */
    public static function sorter($a, $b)
    {
        $order = static::$order;

        if ($a == $b)
            return 0;

        $cmpa = array_search($a, $order);
        $cmpb = array_search($b, $order);

        return ($cmpa > $cmpb) ? 1 : -1;
    }

    public function get_user($user_id = null)
    {
        if ($user_id)
        {
            $user = Document::factory('user', $user_id);
            $user->load(null, ['_id', 'name']);
            return $user;
        }
        return false;
    }

}
