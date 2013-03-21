<?php defined('SYSPATH') or die('No direct script access.');
/**
 * OAuth 2.0 Authentication Class
 * OK, there are lot's more requirements for oAuth2, but we're on a deadline &
 * I oughta rush this. The only thing missing from the current grant_types are
 * scopes. Since our internal app doesn't need scopes (i.e., we use em' all!), I
 * didn't include it's implementation. Phew! Shoot me :-)
 *
 *      1. Validate a Resource Owner Username/Password Flow
 *          a. If user exists, get the stored session & return it.
 *          b. If no session exists or if the access_token has expired, create a
 *             new session & return it.
 *          c. Destroy a session.
 *
 *      2. Validate a client.
 *          a. If client exists & auto_approve is granted, return the session.
 *          b. If no stored session or access_token expired, create a new one &
 *             return it.
 *
 * @author Jason Nathan
 * @category Helpers
 * @package RT_Oauth2
 * @subpackage Authentication
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Oauth2_Authentication {
    // oAuth instances
    protected static $_instance;
    // the client mongo model
    protected static $mClient;
    // the session mongo model
    protected static $mSession;
    // the resource (user) mongo model
    protected static $mResource;
    // the success object formatter
    protected static $success;
    // the error object formatter
    protected static $error;

    /**
     * Just so we can use this statically...
     *
     * @return instanceof self
     */
    public static function instance()
    {
        if (!isset(static::$_instance))
        {
            static::$_instance = new self();
        }

        return static::$_instance;
    }

    /**
     * Sets the Mongo Models for use.
     *
     * @return  void
     */
    public function __construct()
    {
        static::$mClient  = Document::factory('oauth2_client');
        static::$mSession = Document::factory('oauth2_session');
        static::$mResource = Document::factory('oauth2_resource');
        static::$success = new Oauth2_Success;
        static::$error = new Oauth2_Error;
    }

    /**
     * Resource Owner Password Flow or for validating a user
     * Returns a valid token for consumption.
     *
     * @param string $client_id
     * @param string $username
     * @param string $password
     * @param boolean $new
     * @return boolean
     */
    public function login($values)
    {
        // if there is no client_id registered, nothing left to do
        if(!$client = static::$mClient->get_client($values['client_id']))
        {
            Debug::log('unauthorised invoked in get_client');
            return static::$error->create('unauthorized_client');
        }

        // if user registration fails, return false
        if(!$user = static::$mResource->check_password($values['username'], $values['password']))
        {
            Debug::log('Access Denied in check_password');
            return static::$error->create('access_denied');
        }
        if(isset($user['password']))
        {
            $user['password'] = null;
        }

        // get or create a new token
        return $this->get_token($client['client_id'], $user['_id'], TRUE, 'password');
    }

    /**
     * Logout function that destroys the created session.
     *
     * @param string $token
     * @return boolean
     */
    public function logout($token)
    {
        return static::$mSession->destroy($token);
    }

    /**
     * Client Side Application Flow or retrieve Client Credentials.
     * Returns client if found & valid.
     *
     * @param mixed $client_id
     * @param mixed $client_secret
     * @param string $redirect_uri
     *
     * @return object|boolean
     */
    public function credentials($values)
    {
        $params = [
            'client_id' => $values['client_id']
        ];

        // only if we have a secret. This is n
        if (isset($values['client_secret']))
        {
            $params['client_secret'] = $values['client_secret'];
        }

        $client = static::$mClient->get_client($params);

        if ($client)
        {
            // just to confirm the redirect uri's are the same
            $given_domain  = parse_url($values['redirect_uri'], PHP_URL_HOST);
            $stored_domain = parse_url($client['redirect_uri'], PHP_URL_HOST);

            if ($given_domain === $stored_domain)
                return $this->get_token($values['client_id'], NULL, TRUE);
        }
        Debug::log('unauthorised invoked in credentials');
        return static::$error->create('unauthorized_client');
    }

    /**
     * Gets or sets new token
     *
     * @param string $client_id
     * @param string $user_id
     * @param string $grant_type
     * @return string
     */
    public function get_token($client_id, $user_id = NULL, $new = false, $grant_type = 'client_credentials')
    {
        $params = [
            'client_id'  => $client_id,
            'grant_type' => $grant_type
        ];

        if($user_id)
        {
            $params['user_id'] = $user_id;
        }

        $session = static::$mSession->get_session($params);

        // we have one
        if($session)
        {
            // check if the token expired.
            if(static::$mSession->expired($session['expires_in'], $session['modified']))
            {
                // token expired. generate a new one and return the token.
                $update_session = static::$mSession->set_token($session, $new);
                return static::$success->create($update_session);
            }

            // not expired, return the token.
            return static::$success->create($session);
        }

        // no session, create a new token and return it.
        $new_session = static::$mSession->set_token($params, $new);
        return static::$success->create($new_session);
    }

}