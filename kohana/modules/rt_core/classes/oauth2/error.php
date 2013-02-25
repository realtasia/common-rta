<?php defined('SYSPATH') or die('No direct script access.');
/**
 * 
 * @author Jason Nathan
 * @category Helpers
 * @package RT_Oauth2
 * @subpackage Error
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Oauth2_Error {

    /**
     * Shortcut method to return a formatted error object. Uses keys in the
     * oauth2 message file definitions
     *
     * @uses APPPATH/messages/oauth2.php
     * @param string $key
     * @return array
     */
    public static function create($key)
    {
        return [
            'status' => 'error',
            'data' => [
                'title'   => $key,
                'message' => Kohana::message('oauth2', 'message.'.$key)
            ]
        ];
    }
}
