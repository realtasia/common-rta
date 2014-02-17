<?php defined('SYSPATH') or die('No direct script access.');

require_once Kohana::find_file('vendor', 'aws-autoloader');
require_once MODPATH . 'RT/init.php';

// Catch-all route for Codebench classes to run
Route::set('updaterepos', 'updaterepos')
	->defaults(array(
		'controller' => 'Deployer',
		'action' => 'index'));