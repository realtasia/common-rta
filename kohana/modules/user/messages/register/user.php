<?php defined('SYSPATH') or die('No direct script access.');

// see /system/messages/validation.php for the defaults for each rule. These can be overridden on a per-field basis.
return array(
      'user_login' => array(
         'user_login_available' => 'This user_login is already registered, please choose another one.',
         'user_login_not_unique' => 'This user_login is already in use.',
       ),
      'email' => array(
         'email' => 'This is not a valid email.', // Workaround for Bug Report #3750
         'email_available' => 'This email address is already in use.',
         'email_not_unique' => 'This email address is already in use.',
       ),
      'email_confirm' => array(
         'email' => 'This is not a valid email.', // Workaround for Bug Report #3750
         'email_available' => 'This email address is already in use.',
         'email_not_unique' => 'This email address is already in use.',
       ),
      'user_pass' => array(
         'matches'      => 'The password and password confirmation are different.',
      ),
      'password_confirm' => array(
         'matches'      => 'The password and password confirmation are different.',
      ),
);

