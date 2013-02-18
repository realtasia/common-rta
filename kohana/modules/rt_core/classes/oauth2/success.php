<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of success
 *
 * @author jj
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
