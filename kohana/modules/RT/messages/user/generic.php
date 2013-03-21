<?php defined('SYSPATH') or die('No direct script access.');
/*
    ->rule('telephone', 'is_array')
    ->rule('birthday', 'numeric')
    ->rule('gender', 'not_empty');
 */
return [
    'access_denied' => 'You don\'t have permission to perform this action. Are you logged in?',
    'wrong_password' => 'Your old password is incorrect, please try again',
    'same_password' => 'Your new and old password are the same, please enter something different',
    'server_error' => 'There was an error in your submission. Please post as much detail as possible by clicking the feedback button',
];