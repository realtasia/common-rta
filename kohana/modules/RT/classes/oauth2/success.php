<?php defined('SYSPATH') or die('No direct script access.');
/**
 * 
 * @author Jason Nathan
 * @category Helpers
 * @package RT_Oauth2
 * @subpackage Success
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Oauth2_Success {

    /**
     * Shortcut method to return a formatted success object
     *
     * @param string $token
     * @param string $state
     * @return array
     */
    public static function create($session, $state = NULL)
    {
        return array_merge([
            'token_type' => 'bearer',
            'state' => $state,
        ], $session);
    }
}

?>
