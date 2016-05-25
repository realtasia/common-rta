<?php defined('SYSPATH') or die('No direct script access.');

require_once MODPATH . 'RT/init.php';
require_once 'AWSSDKforPHP/aws.phar';

// Catch-all route for Codebench classes to run
Route::set('updaterepos', 'updaterepos')
	->defaults(array(
		'controller' => 'Deployer',
		'action' => 'index'));