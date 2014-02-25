<?php defined('SYSPATH') or die('No direct script access.');


class Repo_Api extends Deploy {

    public function init()
    {
        $this->repository = $this->repository . 'api';
    }

	public function tell_others($repo = 'api')
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
}
