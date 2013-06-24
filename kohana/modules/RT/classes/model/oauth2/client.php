<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Oauth2_Client
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 *   db.oauth_clients.insert({name :, client_id :, client_secret :, redirect_uri :, status :, auto_approve :});
 */
class Model_Oauth2_Client extends Document {
    protected $name = 'oauth2_clients';

    /**
     * An implementation to validate client credentials. Since this can be used
     * in an all oAuth2 authentication flows, we add the auto-approve flag
     * to it for extensibility,
     *
     * @param array $params query fields, usually (client_id, client_secret, redirect_uri)
     * @param boolean $auto_approve
     *
     * @return boolean
     */
    public function get_client($params, $auto_approve = false)
    {
        if(is_string($params)) $params = ['client_id' => $params];
        if ($this->load($params))
        {
            if ($auto_approve)
                return $this->auto_approve ? $this->stringify($this->as_array()) : false;

            return $this->stringify($this->as_array());
        }
        return false;
    }

    public function set_client($params)
    {
        $this->collection()->ensureIndex(['client_id' => 1], ['unique' => 1]);
        // typing it out to remind myself of the fields
        $this->load_values($params);
        return $this->save();
    }
}