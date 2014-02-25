<?php defined('SYSPATH') or die('No direct script access.');

class Repo_Queue extends Deploy {

    public function init()
    {
        $this->repository = $this->repository . 'queue';
    }

	public function tell_others($repo = 'queue')
	{
		return parent::tell_others($repo);
	}	

	public function before_pull()
	{
		Deploy::debug("In before pull");
		Deploy::debug("Emptying Cache: " . APPPATH . 'cache');
		parent::emptyDirectory(APPPATH . 'cache');
		Deploy::debug("Emptying Logs: " . APPPATH . 'logs');		
		parent::emptyDirectory(APPPATH . 'logs');
	}
	
	public function after_pull()
	{
		Deploy::debug("In after pull");
		@exec("sudo service rtanotify restart;", $output);
		@exec("sudo service rtaticker restart;", $output);
		@exec("sudo service rtaemail restart;", $output);
	}

}