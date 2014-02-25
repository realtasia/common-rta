<?php defined('SYSPATH') or die('No direct script access.');

class Repo_Common extends Deploy {

    public function init()
    {
        $this->repository = $this->repository . 'common';
    }

    public function after_pull()
    {
        $path = MODPATH . "RT";
        $init = realpath("$path/init.php");
		Deploy::debug("Need to remove: $init");
        $init_live = realpath("$path/init-live.php");
		Deploy::debug("and replace it with: $init_live");

        if(is_file($init) && is_file($init_live))
        {
        	Deploy::debug("Both the above files were found");
            unlink ($init);
            rename($init_live, $init);
        } 
		elseif(is_file($init_live))
		{
        	Deploy::debug("Only the live file was found");			
			rename($init_live, "$path/init.php");
		}
    }
	
	public function tell_others($repo = 'common')
	{
		return parent::tell_others($repo);
	}	
} 