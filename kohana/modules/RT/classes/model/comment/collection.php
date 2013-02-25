<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Collection
 * @subpackage Comment
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Comment_Collection extends Mongo_Collection {
    protected $name = 'comments';

    public function fetch($args, $user_id = NULL, $current_post = null)
    {
        $defaults = [
           'limit' => 2, 'skip' => 0, 'type' => 'comment', 'sort' => 1,
           'post_id' => NULL, 'include_ids' => NULL, 'status' => 'active'
        ];

        extract(Arr::overwrite($defaults, $args), EXTR_SKIP);

        $query = $return = [];

        if($post_id)
            $query['post._id'] = Document::check_id ($post_id);

        if ($include_ids)
        {
            if (is_array($include_ids))
                $query['_id'] = ['$in'  => $include_ids];
            else
                $query['_id'] = $include_ids;
        }

        $query['status'] = $status;
        $query['type']   = $type;

        $results = $this->find($query)
                ->limit($limit)
                ->fields(['message'], 0)
                ->sort('_id', $sort)
                ->skip($skip);
//Debug::log(print_r($results->hasNext(), true));
        while($results->hasNext())
        {
            $row = $results->getNext();
            if($user_id)
            {
                $row->current_user = $user_id;
            }
            $row->current_post = $current_post;
            $row->after_load();
            $return[] = $row->stringify($row->as_array());
        }

        return $return;
    }
}
?>
