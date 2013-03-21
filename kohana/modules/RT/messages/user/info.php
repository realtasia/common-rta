<?php defined('SYSPATH') or die('No direct script access.');
/*
  ->rule('telephone', 'is_array')
  ->rule('birthday', 'numeric')
  ->rule('gender', 'not_empty');
 */
return [
'default' => 'Something went wrong with your submission'
, 'thank_you_beta_email' => <<<EOD
    We are honoured for your interest to participate in Realtasia's Private Preview Program.
    <br />Our customer service officers will call you within the next few days
    with instructions on how to activate your account.
    <br />
    <br /><br />Stay tuned for our official release, you will like it!
EOD
    ,'welcome_aboard' => <<<EOD
    This will be the official welcome email. with account information, help with screenshots & other neat, nice&dandy stuff!!
EOD
];