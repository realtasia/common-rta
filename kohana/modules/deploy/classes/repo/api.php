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
	
	public function after_pull()
	{
		Deploy::debug("In after pull");
		
		parent::emptyDirectory(APPPATH . 'cache');
		parent::emptyDirectory(APPPATH . 'logs');
	}
}
