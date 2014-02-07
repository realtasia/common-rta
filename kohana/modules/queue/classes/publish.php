<?php
require 'Predis/Autoloader.php';

class Publish
{
	public static $redis = null;
	
	public function instance()
	{
		if(!static::$redis)
		{
			Predis\Autoloader::register();
			static::$redis = new Predis\Client();				
		}
		
		return self;
	}
	
	public static function send($message)
	{
		if(!static::$redis)
		{
			throw new Kohana_Exception("Publish can only be used if has been instantated.");
		}
				
		static::$redis->publish('notify', json_encode([
			"channel" => \Arr::get($message, "receipient_id"),
			"message" => $message,
		]));
	}
	
}
