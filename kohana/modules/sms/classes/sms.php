<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * Description of sms
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage Modules/SMS
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
        $config     = Arr::merge(Kohana::$config->load('sms')->as_array(), $config);
        // Create a new message
        $this->_sms = NexmoMessage($config['api_key'], $config['api_secret']);

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
        if ($this->check_number($to))
        {
            $this->to = $to;
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
        $this->message($message);
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
            return $this->error((object)['errortext' => 'Invalid params, please set a valid $to, $from & $message']);
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
    protected function check_number($number, $code = '+65')
    {
        // if 11 characters & starts with '+', it's okay (erm... really??)
        if (count($number) === 11 && strpos($number, '+') === 0)
        {
            return $number;
        }

        // if we've got 8 chars and doesn't start with +, add the code. (right..)
        if (count($number) === 8 && strpos($number, '+') !== 0)
        {
            return $code . $number;
        }

        // nope, didn't validate!!
        return $this->error((object)['errortext' => 'Invalid $to number. Must be a valid SG mobile number with or without "+65" ']);
    }

    /**
     * Parse server response from nexmo and return a properly formatted array
     */
    private function parse($from_nexmo)
    {
        $result = json_decode($from_nexmo);

        if($result)
        {
            foreach($result->messages as $message)
            {
                if($message->status == 0)
                    $this->success($message);
                else
                    $this->error($message);
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
                'state'             => isset($message->clientref)? $message->clientref : null,
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