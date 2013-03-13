<?php defined('SYSPATH') or die('No direct script access.');require_once MODPATH . 'RT/init.php';
/*
 * See http://www.php.net/manual/en/mongo.construct.php for configuration options.
 */
return [
    'default' => [
        'database'  => 'db',
        'server'    => RT::MONGOS,
        'options'   => [],
        'profiling' => FALSE
    ]
];