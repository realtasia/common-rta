<?php defined('SYSPATH') or die('No direct script access.');
require_once MODPATH . 'kohana-aws/vendor/aws-sdk-for-php/sdk.class.php';
/**
 * Realtasia Mail Adder. A helper class to add Emails to the queue in a standardised
 * fashion
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package Queue
 * @subpackage Mail_Processor
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Mail_Processor{

    /** @var array The generated list of emails to add to the db
     */
    public $email = null;
	
	/**
	 * The current notification document that we are processing
	 */
	public static $doc;


	public function __construct($doc)
	{
		static::$doc = $doc;
	}

    /**
     * This method sets the default template for and then calls each interaction
     * method for the customised templates. Adds generated emails to the static
     * $emails property
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param string $type the interaction type, comment, like etc
     * @param array $items the items by interaction type
     * @return \Mail_Add
     */
    public function process()
    {
        $notification_url = static::_notification_url(static::$doc->receipient_id);
        $url = 'http://' . RT::APP_SERVER . static::$doc->post_uri;
		$type = static::$doc->type;

        switch($type)
        {
            case 'feedback': case 'registration': case 'marketting':
            case 'welcome': case 'beta':
				
				// these are single emails. Reciepients are the initiators
				$content = call_user_func( [$this, $type]);
				
                $view = View::factory('emails/generic')
                    ->set('title', $content['header_plain'])
                    ->set('teaser', strip_tags($content['message']))
                    ->set('content_view', $content['message']);

                $plainview = View::factory('emails/content/plaintext')
                    ->set('title', $content['header_plain'])
                    ->set('teaser', strip_tags($content['message']))
                    ->set('content_view', $content['message']);
                $this->email      = static::email_array(array(
                      'to'        => static::$doc->name . "<" . static::$doc->email . ">",
                      'subject'   => trim($content['header_plain']),
                      'plaintext' => trim($plainview->render()),
                      'html'      => static::compactHTML($view->render()),
                ));
                break;
            case 'adminEmail':
                $content = array(
                    'header_plain'  => $content['header_plain'],
                    'message_plain' => $content['message'],
                    'message'       => View::factory('emails/content/standard')
                            ->set('content_header', "<h3>{$content['header_plain']}</h3>")
                            ->set('content_message', "<pre>{$content['message']}</pre>")
                );

                $view = View::factory('emails/admin')
                        ->set('title', $content['header_plain'])
                        ->set('teaser', strip_tags($content['header_plain']))
                        ->set('content_view', $content['message']);

                $plainview = View::factory('emails/content/plaintext_generic')
                        ->set('content_header', $content['header_plain'])
                        ->set('content_message', $content['message_plain']);

                $this->email      = static::email_array(array(
                      'to'        => array(RT::ADMINS),
                      'subject'   => trim($content['header_plain']),
                      'plaintext' => trim($plainview->render()),
                      'html'      => static::compactHTML($view->render()),
                ));

                break;
            default:
				$content = $this->_generic(null, View::factory('emails/content/comment', static::$doc->as_array())->render());
				if(in_array($type, ['like', 'subscribe']))
				{
					$content = $this->like_or_subscribe();
				}
				
                $view = View::factory('emails/email')
                    ->set('title', $content['header_plain'])
                    ->set('notification_url', $notification_url)
                    ->set('teaser', strip_tags($content['message']))
                    ->set('type', ucfirst($type))
                    ->set('post_link', $url)
                    ->set('content_view', $content['message']);

                $plainview = View::factory('emails/content/plaintext')
                      ->set('notification_url', $notification_url)
                      ->set('type', ucfirst($type))
                      ->set('post_link', $url)
                      ->set('content_header', $content['header_plain'])
                      ->set('content_message', $content['message_plain']);

                $this->email      = static::email_array(array(
                      'to'        => static::$doc->name . "<" . static::$doc->email . ">",
                      'subject'   => trim($content['header_plain']),
                      'plaintext' => trim($plainview->render()),
                      'html'      => static::compactHTML($view->render()),
                ));

                break;
        }

        return $this;

    }
    /**
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function feedback()
    {
        $summary  = "thank you for your feedback.";

        $comment  = "We have received your email and will keep you posted.";

        return $this->_generic($summary, $comment);
    }

    /**
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function beta()
    {
        //'We received your submission', Kohana::message('user/info', 'welcome_aboard')
        $summary  = "we received your submission!";

        $comment  = Kohana::message('user/info', 'thank_you_beta_email');

        return $this->_generic($summary, $comment);
    }


    /**
     * Process likes
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function like_or_subscribe()
    {
        return $this->_generic(null, "");

    }

    /*****************Single Emails*********************/


    /**
     * Used by all notification interaction emails. Creates a greeting, the plain text
     * version of the content and the HTML version of the content
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $item the item by interaction type
     * @uses static::_greeting to generate content
     * @return array
     */
    protected function _generic($summary, $content)
    {
    	$summary 		 = $summary ? $summary : static::$doc->summary;
        $greeting        = static::_greeting(static::$doc->first_name);
        $content_header  = View::factory('emails/header/h4')
                               ->set('header', $greeting . " " . $summary);

        $content = View::factory('emails/content/standard')
                       ->set('content_header', $content_header)
                       ->set('content_message', $content)
                       ->render();

        return [
           'header_plain' => trim($greeting),
           'message_plain' => trim(strip_tags(Inflector::br2nl($content))),
           'message' => trim($content)
        ];
    }

    /**
     * Builds the notification (unsubscribe) uri for a recipient
     *
     * @param MongoID $recipient_id the recipient id
     * @return string the generated uri
     */
    protected static function _notification_url($recipient_id)
    {
        return 'http://' . RT::APP_SERVER . '/' . $recipient_id . '#settings';
    }


    /**
     * A small utility that randomises greetings in emails
     *
     * @param string $name the user name
     * @return string
     */
    protected static function _greeting($name)
    {
        $greetings = array(
           'Hello ', 'Hey there ', 'Hey ', 'Hi '
        );

        return $greetings[array_rand($greetings)] . $name . ', ';
    }

    /**
     * Small utility to remove whitespaces form html emails.
     *
     * @param string $html
     * @return string    
     */
    protected static function compactHTML($html)
    {
        $search = array(
            '/\>[^\S ]+/s', //strip whitespaces after tags, except space
            '/[^\S ]+\</s', //strip whitespaces before tags, except space
            '/(\s)+/s'  // shorten multiple whitespace sequences
            );
        $replace = array(
            '>',
            '<',
            '\\1'
            );
        return preg_replace($search, $replace, $html);
    }


    protected static function email_array($arr)
    {
        return array(
            'Source' => RT::NOTIFICATIONS,
            'Destination' => array(
                'ToAddresses' => array(Arr::get($arr, 'to'))
            ),
            'Message' => array(
                'Subject' => array('Data' => Arr::get($arr, 'subject')),
                'Body'    => array(
                    'Text' => array('Data' => Arr::get($arr, 'plaintext')),
                    'Html' => array('Data' => Arr::get($arr, 'html')),
                )
            )
        );
    }
}