<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author jj
 * @package RealtAsia API
 * @subpackage /Model/Interaction
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Interaction_Collection extends Mongo_Collection {
    protected $name = 'interactions';

    /**
     *
     * @param array $args should at least include an object_type & user_id in args
     * @return type
     */
    public function subscriptions(array $args)
    {
        $args['interaction'] = 'subscribe';
        return $this->fetch($args);
    }

    /**
     * Method that retrieves an object's subscribers in an array containing a
     * user id and user name
     *
     * @param array $args
     * @return array
     */
    public function subscribers(array $args)
    {
        $args['interaction'] = 'subscribe';
        return $this->fetch($args, 'user');
    }

    /**
     * Method that retrieves an object's likers in an array containing a
     * user id and user name
     *
     * @param array $args
     * @return array
     */
    public function likers(array $args)
    {
        $args['interaction'] = 'like';
        return $this->fetch($args, 'user');
    }

    /**
     * Utility method that aids in the above to retrievals
     *
     * @param array $args
     * @param string $field the field to retrieve
     * @param int $include if the field is to be included or not
     * @return array
     */
    public function fetch(array $args, $field = NULL, $include = 1)
    {
        $defaults = [
            'limit' => 11, 'skip' => 0, 'object_id' => NULL,
            'object_type' => NULL, 'interaction' => NULL, 'user_id' => NULL
        ];
        $return = [];

        extract(Arr::merge($defaults, $args), EXTR_SKIP);

        $query = [
            //'object_id'   => new MongoID($object_id),
            'object_type' => $object_type,
            'interaction' => $interaction
        ];

        if($object_id)
        {
            $query['object_id'] = Document::check_id($object_id);
        }
        else if($user_id)
        {
            $query['user._id'] = Document::check_id($user_id);
        }
        //return $query;
        $results = $this->find($query)
                ->limit($limit)
                ->skip($skip);

        if($field)
        {
            $results->fields([$field], $include);
        }

        while($results->hasNext())
        {
            $row = $results->getNext();

            $data = $row->as_array();

            if($field && $include === 1)
            {
                $return[] = $row->stringify($data[$field]);
            }
            else
            {
                $return[] = $row->stringify($data);
            }
        }
        return $return;
    }
}