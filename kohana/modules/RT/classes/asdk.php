<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * Amazon Web Services Utility Helper.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.8
 * @subpackage Helper
 * @copyright 2011 Realtasia Pte Ltd
 */
require 'AWSSDKforPHP/aws.phar';

use Aws\S3\S3Client;
use Aws\DynamoDb\DynamoDbClient;
use Aws\DynamoDb\Session\SessionHandler;

class ASDK {

    public static function s3()
    {
        return S3Client::factory([
              'key'    => '[REDACTED]',
              'secret' => '[REDACTED]',
              //'base_url' => 's3.amazonaws.com',
              'region' => 'ap-southeast-1'
        ]);
    }

    public static function SES()
    {
        define('AWS_KEY', '[REDACTED]');
        define('AWS_SECRET_KEY', '[REDACTED]');
        require_once MODPATH . 'kohana-aws/vendor/aws-sdk-for-php/sdk.class.php';
        return new AmazonSES();
    }

    public static function sns()
    {
        defined('AWS_KEY') or self::_initialise();
        return new AmazonSNS();
    }

    public static function dynamo()
    {
        $dynamoDb = DynamoDbClient::factory([
              'key'    => '[REDACTED]',
              'secret' => '[REDACTED]',
              //'base_url' => 's3.amazonaws.com',
              'region' => 'ap-southeast-1'
        ]);
        $sessionHandler = SessionHandler::factory([
              'dynamodb_client' => $dynamoDb,
              'table_name'      => 'app_sessions',
        ]);
        //$sessionHandler->createSessionsTable(5, 5);
        return $sessionHandler->register();
    }

    protected static function _initialise()
    {
        $config = Kohana::$config->load('amazon');
        foreach ($config as $key => $value)
        {
            define($key, $value);
        }
    }

}