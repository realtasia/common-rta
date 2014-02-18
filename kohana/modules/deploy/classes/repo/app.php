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
	
	public function after_pull()
	{
		Deploy::debug("In after pull");
		
		parent::emptyDirectory(APPPATH . 'cache');
		parent::emptyDirectory(APPPATH . 'logs');
		parent::exmptyDirectory($this->repository . '/assets/js')
	}

}
