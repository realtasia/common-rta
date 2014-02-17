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
	
	public function after_pull()
	{
		Deploy::debug("In after pull");
		
		parent::emptyDirectory(APPPATH . 'cache');
		parent::emptyDirectory(APPPATH . 'logs');
		@exec("sudo service rtanotify restart;");
		@exec("sudo service rtaticker restart;");
		@exec("sudo service rtaemail restart;");
	}

}