<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Collection
 * @subpackage Ticker
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Ticker_Collection extends Collection {
    protected $name = 'ticker';

    /**
     *
     * @param array $args
     * @return self Sets the $cursor property and returns itself
     */
    public function search($args = array(), $uid = NULL)
    {
        $this->ensureIndex(['user_id' => 1]);
        $this->ensureIndex(['document_id' => 1]);
        $this->ensureIndex(['owner_id' => 1]);
        $this->ensureIndex(['visibility' => 1]);

        $defaults = [
           'skip' => 0, 'limit' => 11, 'sort' => 'popular', 'user_id' => null,
            'owner_id' => null, 'privacy' => NULL
        ];

        // set some empty arrays
        $query = $ids = $return = [];

        extract(Arr::merge($defaults, $args), EXTR_SKIP);


        if($user_id)
        {
            $query['user_id'] = Document::check_id($user_id);
        }

        if($owner_id)
        {
            $query['owner_id'] = Document::check_id($owner_id);
        }

        if($privacy)
            $query['privacy.is'] = $privacy;


        if(!is_array($sort))
        {
            switch($sort)
            {
                case 'popular': $sort = ['_id' => -1, 'relevancy' => -1, 'modified' => -1]; break;
                case 'newest': $sort = ['_id' => -1]; break;
                default: $sort = ['_id' => -1]; break;
            }
        }
        $query['visibility'] = 'visible';
        // $query;
        $results = $this
                ->find($query)
                ->fields(['document_id' => 1])
                ->limit($limit)
                ->sort($sort)
                ->skip($skip);
        //die(json_encode(['data' =>$results->hasNext()]));
        while($results->hasNext())
        {
            $return[] = $results->getNext()->document_id;
        }
        $this->reset();
        return array_filter($return);
    }

}