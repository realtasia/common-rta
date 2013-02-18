<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of utils
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage /Trait/oAuth2/Utils
 * @copyright 2012 Realtasia Pte Ltd
 */
trait Trait_Oauth2_Utils {

    public function stringify($arr = [])
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


    protected function get_default_user_fields()
    {
        if(isset($this->current_user))
        {
            $user = $this->current_user instanceof Document ? $this->current_user->as_array() : (array) $this->current_user;
            return Arr::overwrite(['_id' => '', 'name' => ''], $user);
        }
    }

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
