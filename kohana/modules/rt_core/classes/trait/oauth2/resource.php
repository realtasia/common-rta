<?php defined('SYSPATH') or die('No direct script access.');

/**
 * A simple helper class that validates an access token
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Oauth2
 * @subpackage Resource
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */

trait Trait_Oauth2_Resource {
    // the session mongo model
    protected static $mSession;

    /**
     * Loads Session and configuration options.
     *
     * @return  self
     */
    public function init()
    {
        static::$mSession = Document::factory('oauth2_session');

        return $this;
    }

    /**
     * Validates an access token and returns session
     *
     * @param string $token
     *
     * @return boolean
     */
    public function validate_token($token)
    {
        $this->init();
        $session = static::$mSession->get_session_by_token($token);

        if($session)
        {
            // check if the token expired.
            if(static::$mSession->expired($session['expires_in'], $session['modified']))
            {
                // token expired. generate a new one and return the token.
                $update_session = static::$mSession->set_token($session, true);
                return $update_session;
            }

            // not expired, return the session.
            return $session;
        }

        return null;
    }

}