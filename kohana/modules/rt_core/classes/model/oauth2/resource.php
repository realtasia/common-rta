<?php

defined('SYSPATH') or die('No direct access allowed.');
/*
 *   db.oauth_clients.insert({name :, client_id :, client_secret :, redirect_uri :, status :, auto_approve :});
 */

class Model_Oauth2_Resource extends Document {

    protected $name = 'oauth2_resources';

    /**
     * An implementation to validate a Resource Owner Flow by user credentials
     *
     * @param array $params query fields, usually (client_id, client_secret, redirect_uri)
     * @param boolean $auto_approve
     * @uses Model_User
     *
     * @return boolean
     */
    public function check_password($username, $password)
    {
        $params = [
            '$or'      => [
                ['username' => $username],
                ['email' => $username]
            ],
            'password' => static::hash($password)
        ];

        $user = parent::factory('user');

        return $user->load($params, ['_id']) ? $this->stringify($user->as_array()) : false;
    }


}