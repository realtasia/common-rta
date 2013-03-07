<?php defined('SYSPATH') or die('No direct script access.');
/*
 * See http://www.php.net/manual/en/mongo.construct.php for configuration options.
 */
return [
    'default' => [
        'database'  => 'db',
        'server'    => 'mongodb://mongo1:27017,mongo2:27017/?replicaSet=rtdbs',
        'options'   => [],
        'profiling' => FALSE
    ]
];