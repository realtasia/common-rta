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
     *
     * @param array $args
     * @return self Sets the $cursor property and returns itself
     */
    public function search($args = array(), $uid = NULL)
    {
        $defaults = [
           'status' => null, 'skip' => 0, 'limit' => 11, 'sort' => 'active',
           's' => '', 'include_ids' => [], 'page_id' => null, 'parent_id' => null,
           'user_id' => null, 'type' => null, 'listing' => [], 'to_id' => null,
           'privacy' => NULL, 'company_id' => null, 'filter' => null, 'unread' => null
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

        if($unread)
            $query['unread'] = Document::check_id($unread);

        // iterate through the $ids and make sure they're all MongoID objects
        if (!empty($ids))
            $query['_id']['$in'] = Arr::map('Document::check_id', $ids);

        if (in_array($filter, ['Private Apartments', 'Serviced Apartments', 'Private Landed', 'HDB']))
        {
            $query['page.subtype'] = $filter;
        }

        if(!empty($listing))
        {
            $query = \Arr::merge($query, self::process_listing($listing));
        }

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
        // $query;
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
    public function conversations($args = array(), $user_id = NULL)
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
     *
        [type] => Sale
        [price] => 5000000
        [rooms] => 3
        [built_size] => 5
        [leaseSpace] =>
        [land_size] => 0
        [cov] => 0
        [valuation] => 0
        [cobroke] => These are only seen by other agents
        [unit] => 10-80
        [property_type] => 4STD (Standard)
        [baths] => 3
     */
    public static function process_listing($q)
    {
        $query = [
            'listing.type' => ucfirst(strtolower(\Arr::get($q, 'type', 'Sale'))),
            'listing.built_size' => ['$gte' => (int) \Arr::get($q, 'builtLow', 0)],
            'listing.price' => ['$gte' => (int) \Arr::get($q, 'priceLow', 0)],
            'listing.rooms' => ['$gte' => (int) \Arr::get($q, 'roomsLow', 0)],
        ];

        $builtHigh = \Arr::get($q, 'builtHigh');
        if($builtHigh && (int) $builtHigh !== 9000)
        {
            $query['listing.built_size']['$lte'] = (int) $builtHigh;
        }

        $priceHigh = \Arr::get($q, 'priceHigh');
        if($priceHigh)
        {
            $query['listing.price']['$lte'] = (int) $priceHigh;
        }

        $roomsHigh = \Arr::get($q, 'roomsHigh');
        if($roomsHigh && (int) $roomsHigh !== 9)
        {
            $query['listing.rooms']['$lte'] = (int) $roomsHigh;
        }

        $s = \Arr::get($q, 's');
        if($s)
        {
            $query['keywords'] = new MongoRegex("/^" . strtolower($s) . "/");
        }

        return $query;
    }

    protected static $listing_fields = [
        'type' => 'Sale', 'price' => 0, 'rooms' => 1,   'built_size' => 0,
        'leaseSpace' => '', 'land_size' => 0, 'cov' => 0, 'valuation' => 0,
        'cobroke' => 0, 'unit' => 0, 'property_type' => 0, 'baths' => 0
    ];

    protected static $sort = [
        'status', 'user._id', 'page._id, privacy.is', 'modified', 'listing.type',
        'listing.price', 'listing.rooms', 'listing.built_size', 'listing.property_type',
        'listing.tenure', 'listing.land_size', 'listing.value', 'listing.description',
        'listing.cobroke'
    ];
}
