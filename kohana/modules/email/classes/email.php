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
            extract(Kohana::$config->load('amazon')->as_array(), EXTR_SKIP);

            // Create SES transport
            $transport = Swift_Awstransport::newInstance($AWS_KEY, $AWS_SECRET_KEY);

            // Create the SwiftMailer instance
            Email::$_mailer = Swift_Mailer::newInstance($transport);
        }

        return Email::$_mailer;
    }

}
