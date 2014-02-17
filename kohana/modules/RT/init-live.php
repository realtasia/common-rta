<?php

/**
 * Description of init
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Init
 * @subpackage Core
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class RT {

    const BASE_URL      = 'realtasia.com.sg';
    const API_SERVER    = 'api.realtasia.com.sg';
    const APP_SERVER    = 'realtasia.com.sg';
    const COM_SERVER    = 'common.realtasia.com.sg';
	const SOCK_SERVER   = 'sock.realtasia.com';
    const MONGOS        = 'mongodb://admin:PlEPmfBc@SG-RealtDB2-2033.servers.mongodirector.com:27017,SG-RealtDB2-2034.servers.mongodirector.com:27017/admin?replicaSet=RS-RealtDB2-0';
    //const MONGOS        = 'mongodb://jjnb.net:27017';

    const ADMINS        = 'RealtAsia Administrators <jason.nathan@realtasia.com>';
    const NOTIFICATIONS = 'RealtAsia Notifications <support@realtasia.com.sg>';
    const SYSTEM        = 'SiRyA <support@realtasia.com>';

    const AWS_KEY       = '[REDACTED]';
    const AWS_SECRET    = '[REDACTED]';
    const AWS_REGION    = 'ap-southeast-1';
    const CANONICAL_ID  = '27c22ef33fc8b3af046e5fb40cb61f8cf4d89e97b4c013d32cb6cebf1a35921d';
    const CANONICAL_NAME= 'Jason J Nathan';
    const ACCOUNT_ID    = '527573915434';
    const BUCKET        = 'static.realtasia.com.sg';

    const CLIENT_ID     = '123456789';
    const CLIENT_REDIRECT     = 'realtasia.com.sg';
	const DOC_ROOT		= '/home/ubuntu/www/';
	
    public static $AWS_ASGROUPS  = ["RealtApi", "RealtApp"];	

}
