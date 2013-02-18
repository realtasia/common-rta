<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage /Model/User/Collection
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_User_Collection extends Collection {
    protected $name = 'users';

    /**
     * Does a search, sort and limit. $args is an array that defaults to:
     *
     *  array(
     *          'limit' => 11, 'offset' => 0, 'type' => '',
     *          'subtypes' => array(), 'sort' => 'alpha',
     *          's' => '', 'include_ids' => FALSE,
     *          'object_id' => FALSE, 'user_id' => false, 'children' => FALSE
     *  );
     *
     * @param array $args
     * @return self Sets the $cursor property and returns itself
     */
    public function search($args = array(), $user_id = NULL)
    {
//        $this->collection()->ensureIndex([
//            'keywords' => 1
//                ], ['name' => 'user_keywords', 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'status' => 1, 'roles' => 1, 'settings.privacy.is' => 1, 'active' => -1
//        ], ['name' => 'user_search_fields', 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'logins.user_id' => 1
//        ], ['sparse' => true, 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'company._id' => 1
//        ], ['sparse' => true, 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'rep._id' => 1
//        ], ['sparse' => true, 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'rep.type' => 1
//        ], ['sparse' => true, 'safe' => true]);
//        $this->collection()->ensureIndex([
//            'rep.token' => 1
//        ], ['sparse' => true, 'safe' => true]);
        $logged_in_user = $user_search_fields_hint = false;
//
        $defaults = [
           'limit' => 11, 'skip' => 0, 'roles' => [], 'sort' => null,
           's' => null, 'include_ids' => [], 'status' => 'active',
           'privacy' => NULL, 'company' => NULL, 'company_id' => NULL
        ];

        // set some empty arrays
        $query = $ids = $return = [];

        extract(Arr::merge($defaults, $args), EXTR_SKIP);

        // status is a must for a query. It is the fisrt field of a compound index
        $query['status'] = $status;

        if($privacy)
            $query['settings.privacy.is'] = $privacy;

        /*
         * For some reason, explain() showed Mongo wasn't using any of the indexes
         * created. So giving an explicit hint. This hint describes one of the
         * compound indexes. It might be swapped with another later depending on
         * the query.
         */
        $user_id_fields_hint = [
            'status' => 1, 'roles' => 1, 'settings.privacy.is' => 1, 'active' => -1
        ];

        if($user_id)
        {
            // we don't fetch a user's own record... or do we... ?? Commenting
            $logged_in_user = $this->get_user($user_id);
            // $query['_id']['$ne'] = new MongoID($user_id);
        }

        if($company)
        {
            $query['keywords'] = new MongoRegex('/^'. strtolower($company) .'/');
        }

        if($company_id)
        {
            $query['company._id'] = Document::check_id($company_id);
        }
        // looking for a specific role
        if (!empty($roles))
            $query['roles'] = array('$in' => $roles);

        // if specific records are needed add to the ids array
        // here's where we set the $id array
        if (!empty($include_ids))
            $ids = Arr::merge($ids, $include_ids);

        // keyword searches
        if ($s)
        {
            // this time it's a regex search. Since it is a "start with", ie ^,
            // indexes should work... Hopefully.
            $keyword = new MongoRegex("/^".strtolower($s)."/");
            $query['keywords'] = $keyword;

            //print_r($query);
            // we change the hint now as these are more relevant.
            $user_search_fields_hint = ['keywords' => 1];
        }

        // iterate through the $ids and make sure they're all MongoID objects
        if (!empty($ids))
            $query['_id'] = ['$in' => Arr::map('Document::check_id', $ids)];

        switch($sort)
        {
            case 'alpha': $sort = ['name' => 1]; break;
            case 'active': $sort = ['modified' => -1]; break;
            default: $sort = ['_id' => -1]; break;
        }
        //return $query;
        //print_r(json_encode($query));

        $results = $this
                ->find($query)
                ->fields(static::$protected_fields, false)
                ->limit($limit)
                ->sort($sort)
                ->skip($skip);
                //->explain();
                //
//        // Give the MongoCursor a hint. Set earlier.
//        if($user_search_fields_hint)
//        {
//            $results->hint($user_search_fields_hint);
//        }
//        else
//        {
//            $results->hint($user_id_fields_hint);
//        }
        //die(Debug::Vars($query));
        while($results->hasNext())
        {
            $row = $results->getNext();
            if($logged_in_user)
            {
                $row->current_user = $logged_in_user;
                $row->after_load();
            }

            $ret = $row->stringify($row->as_array(true));

            $return[] = $ret;
        }

        return array_filter($return);
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
 *         $this->collection()->ensureIndex([
            'status' => 1, 'name' => 1, 'roles' => 1, 'settings.privacy.is' => 1, 'active' => -1
        ], ['name' => 'user_search_fields', 'safe' => true]);
        $this->collection()->ensureIndex([
            'username' => 1, 'email' => 1, 'info.telephone.mobile' => 1
        ], ['name' => 'user_id_fields', 'safe' => true]);
        $this->collection()->ensureIndex([
            'logins.user_id' => 1
        ], ['sparse' => true, 'safe' => true]);
        $this->collection()->ensureIndex([
            'company._id' => 1
        ], ['sparse' => true, 'safe' => true]);
 *
 * @var array
 */
    protected static $order = [
        'status', 'name', 'roles', 'settings.privacy.is', 'active', 'username',
        'email', 'info.telephone.mobile'
    ];
    private static $protected_fields = [
        'password',
        'settings.notifications',
        'settings.billing',
    ];

}