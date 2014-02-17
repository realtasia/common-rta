<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Amazon Web Services Utility Helper.
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @subpackage Helper
 * @version 1.2
 * @copyright 2011 Realtasia Pte Ltd
 */
 require_once Kohana::find_file('vendor', 'aws', 'phar');

use Aws\S3\S3Client;
use Aws\DynamoDb\DynamoDbClient,
    Aws\DynamoDb\Session\SessionHandler;

class ASDK {

    public static function s3()
    {
        return S3Client::factory(static::creds());
    }

    // using old sdk for SES for simplicity.
    public static function SES()
    {
        $creds = static::creds();
        define('AWS_KEY', $creds['key']);
        define('AWS_SECRET_KEY', $creds['secret']);
        require_once MODPATH . 'kohana-aws/vendor/aws-sdk-for-php/sdk.class.php';
        return new AmazonSES();
    }

    public static function SNS()
    {
        defined('AWS_KEY') or self::_initialise();
        return new AmazonSNS();
    }

    public static function dynamoSession()
    {
        $sessionHandler = SessionHandler::factory([
              'dynamodb_client' => static::dynamodb(),
              'table_name'      => 'app_sessions',
        ]);

        $sessionHandler->register();

        return $sessionHandler;
    }

    public static function dynamodb()
    {
        return DynamoDbClient::factory(static::creds());
    }

    public static function dynamoGC(){
        return static::dynamoSession()->garbageCollect();
    }

    protected static function creds()
    {
        return Kohana::$config->load('amazon.credentials');
    }

}