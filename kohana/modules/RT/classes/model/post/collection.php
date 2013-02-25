<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Collection
 * @subpackage Post
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Post_Collection extends Collection {
    protected $name = 'posts';

    /**
     * 'price' => 0, 'rooms' => 1, 'built_size' => 0, 'property_type' => 0, 'tenure' => 0,
     * 'land_size' => 0, 'value' => 0, 'description' => 0, 'cobroke' => 0,
     *
     * @param array $args
     * @return self Sets the $cursor property and returns itself
     */
    public function search($args = array(), $uid = NULL)
    {
        $this->ensureIndex(['company._id' => 1], ['sparse' => true]);
        $defaults = [
           'status' => null, 'skip' => 0, 'limit' => 11, 'sort' => 'active',
           's' => '', 'include_ids' => [], 'page_id' => null, 'parent_id' => null,
           'user_id' => null, 'type' => null, 'listing' => [], 'to_id' => null,
           'privacy' => NULL, 'company_id' => null,
        ];

        // set some empty arrays
        $query = $ids = $return = [];

        extract(Arr::merge($defaults, $args), EXTR_SKIP);

        if ($status && strlen($status) > 0)
        {
            $query['status'] = $status;
        }
        // looking for a specific type
        if ($type)
        {
            $query['type'] = $type;
        }

        // if specific records are needed add to the ids array
        // here's where we set the $id array
        if (!empty($include_ids))
            $ids = Arr::merge($ids, $include_ids);

        // keyword searches
        if ($s)
        {
            // this time it's a regex search.
            $query['keywords'] = new MongoRegex("/^".  strtolower($s)."/i");
        }

        if ($user_id && $page_id)
        {
            $query['$or'] = [
                ['user._id' => Document::check_id($user_id)],
                ['page._id' => Document::check_id($page_id)]
            ];
        }
        elseif($user_id)
        {
            $query['user._id'] = Document::check_id($user_id);
        }
        elseif($page_id)
        {
            $query['page._id'] = Document::check_id($page_id);
        }

        if($privacy)
            $query['privacy.is'] = $privacy;

        if($parent_id)
            $query['page_parent._id'] = Document::check_id($parent_id);

        if($company_id)
            $query['company._id'] = Document::check_id($company_id);

        if($to_id)
            $query['to._id'] = Document::check_id($to_id);

        // iterate through the $ids and make sure they're all MongoID objects
        if (!empty($ids))
            $query['_id']['$in'] = Arr::map('Document::check_id', $ids);

        if(!is_array($sort))
        {
            switch($sort)
            {
                case 'active': $sort = ['modified' => -1]; break;
                case 'newest': $sort = ['_id' => -1]; break;
                default: $sort = ['_id' => -1]; break;
            }
        }

        unset($fields['message']);
        //return $query;
        $results = $this
                ->find($query)
                ->fields(['message' => 0])
                ->limit($limit)
                ->sort($sort)
                ->skip($skip);
        //die(json_encode(['data' =>$results->hasNext()]));
        while($results->hasNext())
        {
            //die(json_encode(['data' => iterator_to_array($results)]));
            $row = $results->getNext();
            if($uid && $usr = $this->get_user($uid))
            {
                $row->current_user = $usr;
                $row->after_load();
            }
            $ret = $row->stringify($row->as_array());

            $return[] = $ret;
        }
        $this->reset();
        return array_filter($return);
    }

    /**
     * Utility method to retrieve albums
     *
     * @uses self::search()
     * @param array $args
     * @param string||MongoID $user_id
     * @return type
     */
    public function albums($args = array(), $user_id = NULL)
    {
        $defaults = ['type' => 'album'];

        return $this->search(Arr::merge($defaults, $args), $user_id);
    }

    /**
     * Utility method to retrieve testimonials
     *
     * @uses self::search()
     * @param array $args
     * @param string||MongoID $user_id
     * @return type
     */
    public function testimonials($args = array(), $user_id = NULL)
    {
        $defaults = ['type' => 'testimonial'];

        return $this->search(Arr::merge($defaults, $args), $user_id);
    }

    /**
     * Utility method to retrieve listings
     *
     * @uses self::search()
     * @param array $args
     * @param string||MongoID $user_id
     * @return type
     */
    public function listings($args = array(), $user_id = NULL)
    {
        $defaults = ['status' => 'active', 'type' => 'listing'];

        $sort = Arr::get($args, 'sort', ['listing.price' => 1]);
        if(!is_array($sort))
        {
            $sort = [$sort => 1];
        }

        if ($this->validate_listing_sort($sort))
        {
            $args['sort'] = $sort;
        }

        return $this->search(Arr::merge($defaults, $args), $user_id);
    }

    /**
     * Method to retrieve messages.
     *
     * @param array $args
     * @param string||MongoID $user_id
     * @return type
     */
    public function inbox($args = array(), $user_id = NULL)
    {
        if(!$user_id)
            return [];

        $return = [];
        $status = Arr::get($args, 'status', 'active');
        $limit = Arr::get($args, 'limit', 11);
        $skip = Arr::get($args, 'skip', 0);
        $sort = Arr::get($args, 'sort', ['_id' => -1]);
        $id = Document::check_id(Arr::get($args, 'user', $user_id));

        $query = [
            'type' => 'conversation', 'status' => $status, '$or' => [
                'user._id' => $id,
                'to._id'   => $id
            ]
        ];
        $results = $this
                ->find($query)
                ->limit($limit)
                ->sort($sort)
                ->skip($skip);

        while($results->hasNext())
        {
            $row = $results->getNext();
            if($user_id && $usr = $this->get_user($user_id))
            {
                $row->current_user = $usr;
                $row->after_load();
            }
            $ret = $row->stringify($row->as_array());

            $return[] = $ret;
        }

        return $return;
    }

    /**
     * Multi keys (Compound indexes) in MongoDB need an exact order that was
     * previously prescribed by ensureIndex() for it properly search by index
     *
     * e.g
     *
     * key = [status => 1, userid => 1, pageid => 1];
     *
     * // will use index because the order is correct
     * $query = [status => 1, userid => 1, pageid => 1];
     *
     * // no index usage, because the first param should be 'status'
     * $query = [userid => 1, pageid => 1, status => 1];
     *
     * So, here's a method that ensures that the query params are in the correct
     * order
     *
     * @param array $args
     * @uses parent::sorter
     * @return array properly sorted args
     */
    protected static function ensure_order(array $args)
    {
        usort($args, 'parent::sorter');
        return $args;
    }

    /**
     * Just to make sure a sort field is in the proper format for mongo.
     *
     * @param array $sort
     * @return boolean
     */
    protected function validate_listing_sort(array $sort)
    {
        foreach ($sort as $key => $value)
        {
            if(array_key_exists($key, static::$listing_fields) && ( (int) $value === 1 || (int) $value === -1))
            {
                return true;
            }
        }

        return false;
    }

    protected static $listing_fields = [
            'listing.type' => 'sale', 'listing.price' => 0, 'listing.rooms' => 1, 'listing.built_size' => 0,
            'listing.property_type' => '', 'listing.tenure' => 0, 'listing.land_size' => 0,
            'listing.value' => 0, 'listing.description' => 0, 'listing.cobroke' => 0
        ];

    protected static $sort = [
        'status', 'user._id', 'page._id, privacy.is', 'modified', 'listing.type',
        'listing.price', 'listing.rooms', 'listing.built_size', 'listing.property_type',
        'listing.tenure', 'listing.land_size', 'listing.value', 'listing.description',
        'listing.cobroke'
    ];
}
