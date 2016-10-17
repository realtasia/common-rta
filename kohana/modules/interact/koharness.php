<?php
$modpath = dirname(__DIR__);
return array(
    // This list of paths will also be passed to Kohana::modules(). Define the modules (including your own)
    // in the order you want them to appear in Kohana::modules()
    'modules' => array(
    	'RT'         => $modpath . '/RT', // Core RT classes
    	'queue'      => $modpath . '/queue', // Core RT classes
        'interact'   => __DIR__,
        'unittest'   => __DIR__.'/vendor/kohana/unittest'
    ),

    // You can specify where to create the harness application - the default is /tmp/koharness
    'temp_dir' => '/Users/jasonnathan/Repositories/Realtasia/test-app-folder'
);

?>
