<?php defined('SYSPATH') or die('No direct script access.');

class Email extends Kohana_Email {

    /**
     * Creates a SwiftMailer instance.
     *
     * @return  object  Swift object
     */
    public static function mailer()
    {
        if (!Email::$_mailer)
        {
            // Extract Amazon configured options for SES
            //extract(Kohana::$config->load('amazon')->as_array(), EXTR_SKIP);

            // Create SES transport
            //$transport = Swift_Awstransport::newInstance(RT::AWS_KEY, RT::AWS_SECRET);
	    $transport = Swift_SmtpTransport::newInstance(RT::SMTP_SERVER, 25)
              ->setUsername(RT::SMTP_USER)
              ->setPassword(RT::SMTP_PASS);

            // Create the SwiftMailer instance
            Email::$_mailer = Swift_Mailer::newInstance($transport);
        }

        return Email::$_mailer;
    }

}
