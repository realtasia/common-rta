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
    const SOCK_SERVER   = 'socket.realtasia.com.sg';
    //const MONGOS        = 'mongodb://admin:PlEPmfBc@SG-RealtDB2-2033.servers.mongodirector.com:27017,SG-RealtDB2-2034.servers.mongodirector.com:27017/admin?replicaSet=RS-RealtDB2-0';
    const MONGOS        = 'mongodb://localhost:27717';

    const ADMINS        = 'RealtAsia Administrators <jason.nathan@realtasia.com>';
    const NOTIFICATIONS = 'RealtAsia Notifications <support@realtasia.com.sg>';
    const SYSTEM        = 'SiRyA <support@realtasia.com>';

    const AWS_KEY       = '[REDACTED]';
    const AWS_SECRET    = '[REDACTED]';
    const AWS_REGION_ALL= 'ap-southeast-1';
    const AWS_REGION_SES= 'us-east-1';
    const SMTP_USER	= '[REDACTED]';
    const SMTP_PASS	= 'AmRpaD/6kwvoJi7iL4brR4qs5Cb4aOQ+ONftVYN2ZSJ7';
    const CANONICAL_ID  = '27c22ef33fc8b3af046e5fb40cb61f8cf4d89e97b4c013d32cb6cebf1a35921d';
    const CANONICAL_NAME= 'Jason J Nathan';
    const ACCOUNT_ID    = '527573915434';
    const BUCKET        = 'static2.realtasia.com.sg';

    //const SMTP_SERVER   = 'smtp.mailgun.org';
    //const SMTP_USER	= 'postmaster@mailer.realtasia.com.sg';
    //const SMTP_PASS	= '5ea7fa3352f8223f8640dfd9da90d953';

    const CLIENT_ID     = '123456789';
    const CLIENT_REDIRECT     = 'realtasia.com.sg';
    const DOC_ROOT	= '/home/www/';

    public static $AWS_ASGROUPS  = ["RealtAPI", "RealtApp"];
}
