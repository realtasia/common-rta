<?php defined('SYSPATH') or die('No direct script access.');

 // if(!class_exists('AutoScalingClient'))
	// require_once Kohana::find_file('vendor', 'aws-autoloader');

 
use Aws\AutoScaling\AutoScalingClient;
use Aws\Ec2\Ec2Client;

class Deploy {

    public $repository = RT::DOC_ROOT;
	public static $_debug = true;
	

    /**
     * A static factory method
     * */
    public static function factory($repo = null, $debug = true)
    {
    	$repo = "Repo_" . ucfirst(strtolower($repo));
        if (class_exists($repo))
        {
            $Crepo = new $repo;
            if ( is_subclass_of($Crepo, get_called_class()) )
            {
            	Deploy::debug("Yeap inside the repo subclass: " . $repo);
                $Crepo->run("init");
                return $Crepo;
            }
        }    	
        return new Deploy($repo);
    }

    /**
     * A simple method that runs internal callbacks if they are callable
     * */
    protected function run($event)
    {
        if (is_callable(array($this, $event)))
        {
            return $this->{$event}();
        }

        return true;
    }

    public function execute($repo = null)
    {
    	Deploy::debug($this->repository);
        try
        {
            $this->run("before_pull");


			Deploy::debug('Attempting to cd into: ' . realpath($this->repository));
            // In case any changes were made locally, make sure to reset it.
            exec( 'cd ' . realpath($this->repository) . ' && git reset --hard HEAD && git pull', $output);

            $this->run("after_pull");
            
			Deploy::debug($output);
        }
        catch (Exception $e)
        {

        }
		
		return $this;
    }
	
	public function tell_others($repo)
	{
		Deploy::debug("Telling others");
		$connect = array(
		    'key'    => RT::AWS_KEY,
		    'secret' => RT::AWS_SECRET,
		    'region' => RT::AWS_REGION_ALL		
		);
		# Create a autoscaling client object
		$as_client = AutoScalingClient::factory($connect);
		# Create a ec2 client object
		$ec2_client = Ec2Client::factory($connect);
		# EC2 instance ids
		$ec2_ids = array();
	
		# This includes all Amazon EC2 instances that are members of the group
		$result = $as_client->describeAutoScalingGroups();
		
		$result = $result['AutoScalingGroups'];
			
		if(empty($result))
			return;

		foreach($result as $value) {
			$instance = $value['Instances'];
			# Append ec2 instance id
			foreach($instance as $id)
				$ec2_ids[] = $id['InstanceId'];
		}
	
		Deploy::debug("Found these instanceIds: " .  Debug::vars($ec2_ids));
	
		# This includes all information about instance id in $ec2_id which are currently running
		$result = $ec2_client->describeInstances(array(
			'InstanceIds'	=> $ec2_ids,
			'Filters'	=> array(
				array(
					'Name'	=> 'instance-state-name',
					'Values'	=> array('running')
					)
				)
		));
	
		$result = $result['Reservations'];
		foreach($result as $value) {
			$instance = $value['Instances'];
			foreach($instance as $public_dns) {
				
				$url = 'http://' . $public_dns['PublicDnsName'] . '/updaterepos';
				
				Deploy::debug("Executing: " .  $url);
				
				$r = Request::factory($url)
					->method(HTTP_Request::POST)
					->post([
						'repo' => $repo
					])
					->execute();
				if(static::$_debug)
					echo $r->body();
			}
		}		
	}

    /* Callbacks - Not in interface, cos not needed all the time */

    public function before_pull()
    {

    }

    public function after_pull()
    {

    }

	public function run_all($repos)
	{
		Deploy::debug("Running all");
		foreach($repos as $r)
		{
	        if (class_exists(ucfirst(strtolower($r)), false))
	        {
	        	echo "Class exisits \n";
	            $r = new $r;
	            if (is_subclass_of($r, "Deploy"))
	            {
	                $r->run("init");
					if(is_dir($r->repository))
	                	$r->execute();
	            }
	        }
		}
	}

	public static function debug($message)
	{
		$msg = Debug::vars($message);
		
		file_put_contents( APPPATH . 'debug.html', $msg);
		
		if(static::$_debug)
			echo $msg;
	}


	public static function emptyDirectory($dirname, $self_delete=false) 
	{
	   if (is_dir($dirname))
	      $dir_handle = opendir($dirname);
	   if (!$dir_handle)
	      return false;
	   while($file = readdir($dir_handle)) {
	      if ($file != "." && $file != "..") {
	         if (!is_dir($dirname."/".$file))
	            @unlink($dirname."/".$file);
	         else
	            static::emptyDirectory($dirname.'/'.$file,true);    
	      }
	   }
	   closedir($dir_handle);
	   
	   if ($self_delete){
	        @rmdir($dirname);
	   }   
	   return true;
	}

}