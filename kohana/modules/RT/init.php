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
    const SOCK_SERVER   = 'https://socket.example.invalid';
    //const MONGOS        = 'mongodb://db.example.invalid/archive';
    const MONGOS        = 'mongodb://db.example.invalid/archive';

    const ADMINS        = 'archive-admin@example.invalid';
    const NOTIFICATIONS = 'archive-notify@example.invalid';
    const SYSTEM        = 'archive-system@example.invalid';

    const AWS_KEY       = 'SYNTHETIC_AWS_ACCESS_KEY';
    const AWS_SECRET    = 'synthetic-aws-secret';
    const AWS_REGION_ALL= 'ap-southeast-1';
    const AWS_REGION_SES= 'us-east-1';
    const SMTP_USER	= 'synthetic-smtp-user';
    const SMTP_PASS	= 'synthetic-smtp-password';
    const CANONICAL_ID  = 'synthetic-canonical-id';
    const CANONICAL_NAME= 'archive-account';
    const ACCOUNT_ID    = '000000000000';
    const BUCKET        = 'archive-example-bucket.sg';

    //const SMTP_SERVER   = 'smtp.example.invalid';
    //const SMTP_USER	= 'synthetic-smtp-user';
    //const SMTP_PASS	= 'synthetic-smtp-password';

    const CLIENT_ID     = '123456789';
    const CLIENT_REDIRECT     = 'realtasia.com.sg';
    const DOC_ROOT	= '/home/www/';

    public static $AWS_ASGROUPS  = ["RealtAPI", "RealtApp"];
}
