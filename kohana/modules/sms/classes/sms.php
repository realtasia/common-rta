<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * Description of sms
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package Helpers
 * @subpackage SMS
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class SMS {

    public $to      = NULL;
    public $message = NULL;
    public $from    = NULL;

    /**
     * Create a new SMS message.
     *
     * @param   string  message subject
     * @param   string  message body
     * @param   string  body mime type
     * @return  Email
     */
    public static function factory($to = NULL, $message = NULL, $config = [])
    {
        return new SMS($to, $message, $config);
    }

    /**
     * @var object message instance
     */
    protected $_sms;

    /**
     * Initialize a new Nexmo_Message, set the subject and body.
     *
     * @param   string  $to the receipient
     * @param   string  $message the message body
     * @param   array  $config load config [normally you'd set the 'from' key]
     * @return  void
     */
    public function __construct($to = NULL, $message = NULL, $config = [])
    {
        $config = Arr::merge(Kohana::$config->load('sms')->as_array(), $config);
        // Create a new message

        $this->_sms = new NexmoMessage($config['api_key'], $config['api_secret']);

        if ($to)
        {
            // Apply message
            $this->to($to);
        }

        if ($message)
        {
            // Apply message
            $this->message($message);
        }

        $this->from($config['from']);


        return $this;
    }

    /**
     * Checks fro a correctly formatted Singapore number before sending
     *
     * @todo Add checks for more countries
     * @param string $to
     * @return \SMS
     */
    public function to($to)
    {
        if ($number = static::valid($to))
        {
            $this->to = $number;
        }
        return $this;
    }

    /**
     * Sets the message body
     *
     * @param string $message
     * @return \SMS
     */
    public function message($message)
    {
        $this->message = $message;
        return $this;
    }

    /**
     * Sets the sender
     *
     * @todo Some operators require special requirements. Should add some validation
     * @param string $from
     * @return \SMS
     */
    public function from($from)
    {
        $this->from = $from;
        return $this;
    }

    /**
     * Sends the SMS
     *
     * @return \NexmoMessage server response
     */
    public function send()
    {
        // we need all 3
        if (!$this->to || !$this->from || !$this->message)
        {
            //Debug::log('Error invoked in MODPATH/classes/sms. Empty params');
            return $this->error((object) ['errortext' => 'Invalid params, please set a valid $to, $from & $message']);
        }

        $result = $this->_sms->sendText($this->to, $this->from, $this->message);
        return $this->parse($result);
    }

    /**
     * A rather overtly simplistic check for a properly formatted Singapore Number
     *
     * @param string $number
     * @param string $code
     * @return boolean|string
     */
    public static function valid($number, $code = '+65')
    {
        // if 11 characters & starts with '+65', it's okay (erm... really??)
        if (strlen($number) === 11 && strpos($number, $code) === 0)
        {
                // sg mobile numbers start with 8 or 9. so remove the code and check
                if ((int) substr($number, strlen($code)) > 80000000)
                    return $number;
        }

        // if we've got 8 chars and doesn't start with +, add the code. (right..)
        if (strlen($number) === 8 && strpos($number, $code) !== 0 && (int) $number > 80000000)
        {
            return $code . $number;
        }

        // nope, didn't validate!!
        //Debug::log('Error invoked in MODPATH/classes/sms. invalid number');
        return false;
    }

    /**
     * Parse server response from nexmo and return a properly formatted array
     */
    private function parse($from_nexmo)
    {
        $result = json_decode($from_nexmo);

        if ($result)
        {
            foreach ($result->messages as $message)
            {
                if ($message->status == 0)
                {
                    return $this->success($message);
                }
                else
                    return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Returns a JSEND formatted array
     *
     * @param object $message
     * @return array
     */
    private function success($message)
    {
        return[
            'status' => 'success',
            'data'   => [
                'message_id'        => $message->messageid,
                'to'                => $message->to,
                'remaining_balance' => $message->remainingbalance,
                'message_price'     => $message->messageprice,
                'state'             => isset($message->clientref) ? $message->clientref : null,
            ]
        ];
    }

    /**
     * Returns a JSEND formatted array
     *
     * @param object $message
     * @return array
     */
    private function error($message)
    {
        return[
            'status' => 'error',
            'data'   => [
                'message' => $message->errortext
            ]
        ];
    }

}