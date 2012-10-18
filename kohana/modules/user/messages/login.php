<?php defined('SYSPATH') or die('No direct script access.');

// see /system/mesages/validation.php for the defaults for each rule. These can be overridden on a per-field basis.
return array(
      'user_login' => array(
         'not_empty' => 'Username must not be empty.',
         'invalid' => 'Password or user_login is incorrect.',
       ),
      'user_pass' => array(
         'not_empty'      => 'Password must not be empty.',
         'invalid' => 'Password or user_login is incorrect.',
      ),
);

