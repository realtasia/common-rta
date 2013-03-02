<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Collection
 * @subpackage Page
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Page_Collection extends Collection {

    protected $name = 'pages';

    public function search($args = [], $user_id = NULL)
    {

//        $this->collection()->ensureIndex([
//            'status'     => 1, 'privacy.is' => 1, 'modified'   => -1
//                ], ['name' => 'status_privacy_modified', 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'parent._id' => 1
//                ], ['name'   => 'parent_id', 'sparse' => true, 'safe'   => true]);
//        $this->collection()->ensureIndex([
//            'keywords' => 1
//                ], ['name' => 'page_keyword', 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'type'    => 1, 'subtype' => 1
//                ], ['name' => 'page_types', 'safe' => true]);

        $defaults = array(
            'limit'       => 11, 'offset'      => 0, 'type'        => '', 'skip'        => 0,
            'subtypes'    => [], 'sort'        => 'alpha', 'status'      => 'active',
            's'           => '', 'include_ids' => FALSE, 'privacy'     => NULL,
            'object_id'   => FALSE, 'children'    => FALSE
        );
        extract(Arr::merge($defaults, $args), EXTR_SKIP);

        // Now we build the query
        // if there is a user id, set the class property for interaction
        // retrieval later (subscripts & likes)
        if ($user_id)
            $this->_user_id = Document::check_id($user_id);

        // set some empty arrays
        $query  = $ids    = $return = [];

        $query['status'] = 'active';

        if (!empty($type))
            $query['type'] = $type;

        /**
         * subtypes =>
         *      Locations (estate, hdb, private-apartment, private-landed,
         *                 serviced-residences)
         *      Company (agency, property-management, developer)
         */
        if (!empty($subtypes))
            $query['subtype'] = ['$in' => (array) $subtypes];

        $query['subtype']['$ne'] = 'Estate';
        // if specific records are needed add to the ids array
        if (!empty($include_ids))
            $ids              = $include_ids;

        if ($privacy)
            $query['privacy.is'] = $privacy;

        // this is the search term typed.
        if ($s)
        {
            $query['keywords'] = new MongoRegex("/^" . strtolower($s) . "/");
        }

        // this is different from include_ids as we are looking in the
        // parent_id property to find children. @TODO dbrefs instead?
        if ($object_id)
        {
            $query['parent._id'] = Document::check_id($object_id);
        }


        // now we validate the consodilated ids and continue building
        if (!empty($ids))
            $query['_id']['$in'] = array_map('Document::check_id', $ids);

        if (!is_array($sort))
        {
            switch ($sort)
            {
                case 'active': $sort = ['modified' => -1];
                    break;
                case 'alpha': $sort = ['name' => 1];
                    break;
                default: $sort = ['_id' => -1];
                    break;
            }
        }

        //return $query;

        $results = $this
                ->find($query)
                ->limit($limit)
                ->sort($sort)
                ->skip($skip);

        while ($results->hasNext())
        {
            $row = $results->getNext();
            if ($user_id && $usr = $this->get_user($user_id))
            {
                $row->current_user = $usr;
                $row->after_load();
            }
            $ret               = $row->stringify($row->as_array());

            $return[] = $ret;
        }

        return array_filter($return);
    }

    public function correct()
    {
        $ret = [];
        $estates = $this->find(['subtype' => 'estate'])->fields(['counts', 'name', '_id']);

        while($estates->hasNext())
        {
            $e = $estates->getNext();
            $children = parent::factory('page')->find(['parent._id' => $e->_id])->fields(['_id']);
            $e->set('oldestate', $children->count());
            $e->save();
            $ret[] = [$e->name => $e->counts['locations']];
        }

        return $ret;
    }

    public function correct2()
    {
        $ret = [];
        $estates = $this->find(['subtype' => 'estate'])->fields(['counts', 'name', '_id']);

        while($estates->hasNext())
        {
            $e = $estates->getNext();
            $ret[] = parent::factory('page')->update_safe(['parent._id' => $e->_id], ['$set' => ['oldestate' => $e->_id]]);
        }

        return $ret;
    }

    public function correct3()
    {
        return $this->remove_safe([
            '$or' => [
                ['subtype' => 'estate'],
                ['subtype' => 'Estate'],
            ]
        ], ['multiple' => true]);
    }

}