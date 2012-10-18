<?php defined('SYSPATH') OR die('No direct access allowed.');

/**
 * Asset helper class. Helps you group and output css and js files.
 *
 * @package  Kohana
 * @category  Helpers
 * @author   Gregorio Ramirez
 * @copyright (c) 2010 Gregorio Ramirez
 * @license  http://kohanaphp.com/license
 */
require_once MODPATH . 'facebook/vendor/src/facebook.php';

class Kohana_FB
{

    /**
     * @var configuration
     */
    protected static $_config;

    /**
     * @var Kohana_FB Singleton static instance
     */
    protected static $_instance;

    /**
     * @var Facebook Instance
     */
    protected $_facebook;

    /**
     * @var array User information
     */
    protected $_me;

    /**
     * @var array What fields to query about the user
     */
    protected $_fields = array();

    /**
     * @var boolean Whether user has been authed
     */
    protected $_authed = FALSE;

    public function auth()
    {
        if (!$this->_authed)
        {
            $this->_authed = TRUE;
            $this->_facebook = new facebook(array(
                     'appId' => self::$_config->api['key'],
                     'secret' => self::$_config->api['secret'],
                  ));
            // Attempt to query information about the user
            try
            {
                $this->_me = $this->get_user();
            }

            // If failed attempt, redirect to login page (Auth)
            catch (Exception $error)
            {
                if (strpos($error, 'OAuth') !== FALSE || $this->_facebook->getUser() == 0)
                {
                    exit;
                }

                //error_log($error);
            }
        }

        return $this;
    }

    /**
     * Gets users data from Facebook
     *
     * @return array
     */
    protected function get_user()
    {
        return $this->_facebook->api("/" . $this->_facebook->getUser() . "?fields=" . implode(',', $this->_fields));
    }

    /**
     * Returns information about current user
     *
     * @returns array User information
     */
    public function me()
    {
        if ($this->_authed)
        {
            return $this->_me;
        }
    }

    /**
     * Returns instance of Kohana_FB
     *
     * @returns object Kohana_FB
     */
    public static function instance()
    {
        self::$_config = Kohana::$config->load('facebook');

        if (!isset(self::$_instance))
        {
            self::$_instance = new FB();
        }

        return self::$_instance;
    }

    public static function registration_fields()
    {
        return self::$_config->registrationFields;
    }

    public static function compare_fields($return_fields)
    {
        return (bool) array_diff(self::registration_fields(), $return_fields);
    }

    /**
     * Returns instance of provided Facebook
     *
     * @returns object Facebook
     */
    public static function facebook()
    {
        $instance = self::$_instance;

        if ($instance->_authed)
        {
            return $instance->_facebook;
        }
    }

    public static function keys()
    {
        return self::$_config->api;
    }

}