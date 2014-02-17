<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Deployer extends Kohana_Controller{
	
	public static $repos = ["api", "app", "common", "queue"];
	
	public function action_index()
	{
		$repo = \Arr::get($_REQUEST, 'repo');
		$payload = \Arr::get($_REQUEST, 'payload');
		
		if(!in_array($repo, static::$repos))
			throw new HTTP_Exception_404();
		
		$d = Deploy::factory($repo);
		
		if(is_subclass_of($d, 'Deploy'))
			$d->execute();
		else
			Deploy::debug("Not a subclass of Deploy");
		
		if($payload)
			$d->tell_others($repo);
		
		echo "";
	}
	
}
