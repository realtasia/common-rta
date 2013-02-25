<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Some helper methods used by many subclasses
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Oauth2
 * @subpackage Utils
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */

trait Trait_Oauth2_Utils {

    /**
     * Loops through and array and converts all Mongo Object Ids to strings
     * 
     * @param array $arr
     * @return array
     */
    public function stringify( array $arr = [])
    {
        foreach($arr as $k => $v)
        {
            if($v instanceof MongoID)
            {
                $arr[$k] = (string) $v;
            }
            elseif(is_array($v))
            {
                $arr[$k] = self::stringify($v);
            }
        }

        return $arr;
    }

    /**
     * Returns a properly formatted user array for use in embedding in documents. Retrieves user information
     * from the $current_user property
     * 
     * @return array
     */
    protected function get_default_user_fields()
    {
        if(isset($this->current_user))
        {
            $user = $this->current_user instanceof Document ? $this->current_user->as_array() : (array) $this->current_user;
            return Arr::overwrite(['_id' => '', 'name' => ''], $user);
        }
    }

    /**
     * Returns a properly formatted page document array for use in embedding in documents. Retrieves the
     * info by querying the db with an id
     * 
     * @return array
     */    
    protected function get_default_page_fields($_id)
    {
        $fields = ['_id' => '', 'name' => ''];

        if($_id instanceof MongoID)
        {
            $page = Document::factory('page')
                    ->get($_id, $fields)
                    ->as_array();

            return Arr::overwrite($fields, $page);
        }

        if(is_array($_id))
        {
            if(Arr::get($_id, '_id') && Arr::get($_id, 'name'))
                return Arr::overwrite($fields, $_id);
        }

        if(is_string($_id))
            return $this->get_default_page_fields(new MongoID($_id));
    }

    /**
     * Perform a hmac hash, using the configured method.
     *
     * @param   string  string to hash
     * @return  string
     */
    public static function hash($str)
    {
        return hash_hmac('sha256', $str, 'pS3*Z2f9Ow<}^H6L,{<dS<><ld; 6|xAkwg3MgakYd}>t:KZgjjDx4U@/}#XO+]*');
    }

}
