<?php defined('SYSPATH') or die('No direct script access.');
/*
    ->rule('email', 'email')
    ->rule('email', 'email_domain')
    ->rule('likers.own_post', 'range', [':value', 0, 1])
    ->rule('likers.other_post', 'range', [':value', 0, 1])
    ->rule('likers.profile', 'range', [':value', 0, 1])
    ->rule('subscribers.own_post', 'range', [':value', 0, 1])
    ->rule('subscribers.other_post', 'range', [':value', 0, 1])
    ->rule('subscribers.profile', 'range', [':value', 0, 1])
    ->rule('comments.own_post', 'range', [':value', 0, 1])
    ->rule('comments.other_post', 'range', [':value', 0, 1])
    ->rule('mentions', 'range', [':value', 0, 1])
    ->rule('testimonials', 'range', [':value', 0, 1])
    ->rule('wallpost', 'range', [':value', 0, 1])
    ->rule('messages', 'range', [':value', 0, 1]);
 */
return [
    'email' => [
        'email' => 'Please enter a valid email address',
        'email_domain' => 'Please enter a valid email address',
    ],
    'not_empty' => 'A required value is missing. Something went wrong with your submission.',
    'range'     => 'The server does not understand your entry, please try again.'
];