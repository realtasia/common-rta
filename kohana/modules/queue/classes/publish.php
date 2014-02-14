<?php

class Publish
{
	//public static $redis = null;
	
	public static function notify( array $message )
	{
		return Request::factory('http://' . RT::SOCK_SERVER)
				->method(Request::POST)
				->body(json_encode([
					"channel" => (string) \Arr::get($message, "receipient_id"),
					"message" => $message,
				]))
				->headers('Content-Type', 'application/json')
				->execute();
	}
	
	public static function adminNotify( array $message )
	{
		return Request::factory('http://' . RT::SOCK_SERVER . '/adminNotify')
				->method(Request::POST)
				->body(json_encode([
					"message" => $message,
				]))
				->headers('Content-Type', 'application/json')
				->execute();
	}
	
}
