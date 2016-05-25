<?php defined('SYSPATH') or die('No direct script access.');


class Repo_App extends Deploy {

    public function init()
    {
        $this->repository = $this->repository . 'app';
    }

	public function tell_others($repo = 'app')
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
		$url = $this->repository . '/assets/js/;';
		unlink($url . 'deps.js');
		unlink($url . 'final.js');
	}

}
