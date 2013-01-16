<?php defined('SYSPATH') OR die('No direct access allowed.');

return array(
   'api' => array(
      'key' => '291017440941918',
      'secret' => '[REDACTED]'
   ),
   'registrationFields' => array(
      array('name' => 'name', 'view' => 'prefilled'),
      array('name' => 'first_name', 'view' => 'not_prefilled'),
      array('name' => 'last_name', 'view' => 'not_prefilled'),
      array('name' => 'email', 'view' => 'prefilled'),
      array('name' => 'realtmail', 'description' => 'Email Address', 'view' => 'not_prefilled', 'type' => 'text'),
      array('name' => 'gender'),
      array('name' => 'birthday'),
      array('name' => 'nicename', 'description' => 'Realtasia Username', 'type' => 'text'),
      array('name' => 'password', 'view' => 'not_prefilled'),
      array('name' => 'mobile', 'description' => 'Mobile Number (+65)', 'type' => 'text'),
      array('name' => 'captcha')
   )
);