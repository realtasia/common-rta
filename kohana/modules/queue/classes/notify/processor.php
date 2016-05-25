<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Realtasia Notify Processor. A helper class to add Notifications to the queue in a standardised
 * fashion
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package Queue
 * @subpackage Mail_Add
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Notify_Processor{

    /** @var array The generated list of notifications to add to the db
     */
    public $notifications = [];

    /** @var MongoDocument object the original job from the job queue
     */
    public static $job;

    /** @var MongoDocument object the original document retrieved. normally a post.
     */
    public static $doc;
	
    /** @var boolean Debug flag
     */
	public static $debug = true;

    /**
     * No __construct really needed as most properties are static but returns an
     * instance to aid in method chaining. Requires the original job document
     * and a retrieved post document.
     *
     * @param MongoDocument $doc object the original job from the job queue
     * @param MongoDocument $job object the original document retrieved. normally a post.
     * @return Mail_Add
     */
    public static function factory($doc, $job)
    {
        static::$doc = $doc;
        static::$job = $job;
        return new Notify_Processor;
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
    public function process($recipient, $type, $items)
    {
        static::debug("In notify");
						
        $content  = call_user_func( [$this, str_replace('-', '_', $type)], $recipient, $items);
		$id = (string) $recipient["_id"];

		/**
		 * Notifications array is organised into [user_id => array of items]
		 * Checking if the id exists
		 */			
		if(!isset($this->notifications[ $id ]))
		{
			unset($recipient["_id"]);
			$this->notifications[ $id ] = $recipient;
			$this->notifications[ $id ]['items'] = array();
		}
		
		$item = array_merge([
			'settings' => \Arr::get($recipient, 'settings'),
			'first_name' => \Arr::get($recipient, 'first_name'),
			'name' => \Arr::get($recipient, 'name'),
			'email' => \Arr::get($recipient, 'email')
		], $content);
		
		static::debug("receipient..................:");
		static::debug($recipient);
		static::debug("..................:");
		
		$item['post_uri'] = static::_post_uri();

		// the reason why the notifications is organised in this manner
		// although super unlikely, better to check for duplicates.
		// optimally against smaller arrays .
		if(!in_array($item, $this->notifications[ $id ]['items']))
		{
			$this->notifications[ $id ]['items'][] = $item;
		}
		

        return $this;
    }

    /**
     * Comments differ from likes and subscribes because the content of the
     * comment is also included.
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function comment($recipient, $items)
    {
    	static::debug("In comment");
        //echo Debug::vars();
        foreach($items as $i)
        {
            if(isset($i['comment']))
            {
                $excerpt = $i['comment']->message;
                $user    = $i['comment']->user;
				$cid	 = $i['comment']->_id;
            }
        }
        static::debug("passing to summary builder");
        $summary  = static::_build_interaction_summary($recipient, $items, 'commented on ');

        return [
        	'summary' => $summary,
        	'interactor_name'	  => $user['name'],
        	'avatar'  => static::_get_avatar($user),
        	'excerpt' => $excerpt,
        	'timestamp' => Document::check_id($cid)->getTimestamp(),
        	'type'    => 'comment'
        ];
    }

    /**
     * Private messages work like comments but are only sent (currently) to a
     * single person.
     *
     * @param type $recipient
     * @param type $items
     * @return type
     */
    public function private_message($recipient, $items)
    {
        //echo Debug::vars();
        foreach($items as $i)
        {
            if(isset($i['private-message']))
            {
                $excerpt = $i['private-message']->message;
                $user    = $i['private-message']->user;
				$cid	 = $i['private-message']->_id;
            }
        }
        //Kohana::$log->add('debug', static::_get_avatar($user));
        $summary  = static::_build_interaction_summary($recipient, $items, 'wrote you a private message ');
        return [
        	'summary' => $summary,
        	'interactor_name'	  => $user['name'],
        	'avatar'  => static::_get_avatar($user),
        	'excerpt' => $excerpt,
        	'timestamp' => Document::check_id($cid)->getTimestamp(),
        	'type'    => 'private-message'
        ];
    }

    /**
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function feedback($recipient, $item)
    {
        $summary  = "thank you for your feedback.";

        $comment  = "We have received your email and will keep you posted.";

        return [
        	'summary' => $summary,
        	'excerpt' => $comment,
        	'type'    => 'feedback'
        ];
    }

    /**
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function join_beta($recipient, $item)
    {
        //'We received your submission', Kohana::message('user/info', 'welcome_aboard')
        $summary  = "we received your submission!";

        $comment  = Kohana::message('user/info', 'thank_you_beta_email');
        return [
        	'summary' => $summary,
        	'excerpt' => $comment,
        	'type'    => 'join_beta'
        ];
    }


    /**
     * Process likes
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function like($recipient, $items)
    {
        $summary  = static::_build_interaction_summary($recipient, $items, 'likes');
        return [
        	'summary' => $summary,
        	'type'    => 'like'
        ];

    }

    /**
     * Process subscribes
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function subscribe($recipient, $items)
    {
        $summary  = static::_build_interaction_summary($recipient, $items, 'subscribed to ');
        return [
        	'summary' => $summary,
        	'type'    => 'subscribe'
        ];
    }

    /*****************Single Emails*********************/

    /**
     * Testimonials, like wallposts are sent to the page owner. This creates
     * the content and sets the approval link.
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function testimonial($recipient, $item)
    {
        //echo Debug::vars($recipient);
        $summary  = static::get_people_counts($item)
                          ."wrote you a "
                          .static::_post_link('testimonial', 'testimonial')
                          ." in your profile page.";
        $content_message = "\n"."You can approve or remove this testimonial by following the link below.";

        if(isset($item['user']))
        {
            $user = $item['user'];
        }
        else
        {
            foreach($item as $i)
            {
                if(isset($i['user']['name']))
                {
                    $user = $i['user'];
                }
            }
        }

        $excerpt = $content_message . "\n" . static::$doc->excerpt;
        return [
        	'summary' => $summary,
        	'name'	  => $user['name'],
        	'avatar'  => static::_get_avatar($user),
        	'excerpt' => $excerpt,
        	'type'    => 'testimonial'
        ];
    }

    /**
     * Approval of testimonials. Just to inform the writer that it was approved
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function approve_testimonial($recipient, $item)
    {
        //echo Debug::vars($recipient);
        $summary  = static::get_people_counts($item)
                          ."approved the "
                          .static::_post_link('testimonial')
                          ." you wrote:";

        return [
        	'summary' => $summary,
        	'name'	  => $user['name'],
        	'avatar'  => static::_get_avatar($user),
        	'excerpt' => static::$doc->excerpt,
        	'type'    => 'approve_testimonial'
        ];
    }

    /**
     * Process Wall posts
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return NULL
     */
    public function wallpost($recipient, $item)
    {
    	static::debug("In wallpost");
        $summary  = static::get_people_counts($item)
                          ."shared a "
                          .static::_post_link('post')
                          ." on your profile page.";
        if(isset($item['user']))
        {
            $user = $item['user'];
        }
        else
        {
            foreach($item as $i)
            {
                if(isset($i['user']['name']))
                {
                    $user = $i['user'];
                }
            }
        }

        return [
        	'summary' => $summary,
        	'name'	  => $user['name'],
        	'avatar'  => static::_get_avatar($user),
        	'excerpt' => static::$doc->excerpt,
        	'type'    => 'wallpost'
        ];
    }
// 
// 
    /**
     * Process likes
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::_generic() to generate content
     * @return Mail_Add
     */
    public function addAll($priority = 1)
    {
    	static::debug("Total Notifications: " . count($this->notifications));
		
        if(empty($this->notifications)) return; 
        
        static::debug("Starting to process notifications....");
		
		$m = Document::factory('notification');
		
		/**
		 * Notifications array is organised into [user_id => array of items]
		 * In this case $k is the user id.
		 */		
		foreach ($this->notifications as $k => $n) 
		{								
			$rid = new MongoId($k);
			//$time = Document::check_id(static::$doc->_id)->getTimestamp();
			
			// making each item a document in Mongo
			foreach( $n['items'] as $item)
			{
				$m->receipient_id = $rid;
				$m->load_values($item);
				$m->in_progress = false;
				$m->emailed     = Model_Notification::PENDING;
				$m->notified    = Model_Notification::PENDING;
				$m->doc_id      = (string) static::$doc->_id;
				$m->timestamp	= \Arr::get($item, 'timestamp', time());
				$m->doc_type    = static::$doc->type;
				$m->save();
				// send notification to socket server.
				Publish::notify($m->stringify($m->as_array()));
				$m->clear();				
			}
						
		}
        return $this;
    }

    /**
     * Used by all generic interaction emails. counts the number of items in a
     * message array by interaction type. Builds a sentence by extracting user
     * names depending on the count.
     *
     * @param array $items the items by interaction type
     * @uses static::_extract_user to generate content
     * @return NULL
     */
    public static function get_people_counts($items)
    {
    	static::debug("In people counter");
		$users = array();
		$original_count = 1;
		
		// weirdly, names get repeated sometimes. Just a double-check that it doesn't
		// happen by making user names unique
		foreach($items as $key => $item)
		{
			// since only the first 3 people are named.
			if($original_count <= 3)
			{
				static::debug("Count is less than or equal to 3: " . $original_count);
				$user = static::_extract_user($item);
				if(!in_array($user, $users))
				{
					$users[] = $user;
				}
				else
				{
					// still need to update the master items as only first 3 users are
					// in the users array.
					unset($items[$key]);
				}	
			}
			$original_count++;			
			
		}
		static::debug("Done fetching users");
		// after unique checks, count total number of people who interacted with this document.
        $count = count($items);
        switch($count)
        {
        	// shouldn't happen, but you never know.
            case 0:
                return '';

            case 1:
                return $users[0] . ' ';

            case 2:
                return $users[0] . ' and '
                     . $users[1] . ' also ';

            case 3:
                return $users[0] . ', '
                     . $users[1] . ' and '
                     . $users[2] . ' also ';

            // more than 3. return first three followed by the count.
            default:
                return $users[0] . ', '
                     . $users[1] . ', '
                     . $users[2] . ' and '
                     . $count - 3 . ' other people also ';
        }
    }

     /**
     * Completes the sentence summary for emails. Extracts the users, post item
     * and parent page item along with the relevant links.
     *
     * ** Updated to check if the person interacting did so on his own post so
     * ** we get emails like ...commented on his own... etc.
     *
     * @param MongoDocument $recipient the user object for the recipient
     * @param array $items the items by interaction type
     * @uses static::get_people_counts()
     * @uses static::_adj_or_noun()
     * @uses static::_post_link()
     * @uses static::_page_link()
     * @return NULL
     */
    protected static function _build_interaction_summary($recipient, $items, $action)
    {
    	static::debug("In summary builder");
        $adj = null;
        foreach($items as $i)
        {
            // this only works for comments. Should be easy to integrate
            // other actions.
            if(isset($i['comment']))
            {
                $commentor = $i->user;
                $doc_owner = isset(static::$doc->user) ? static::$doc->user : static::$doc->as_array();

                // check if commentor is the same as doc owner
                if( (string) $commentor['_id'] === (string) $doc_owner['_id'])
                {
                    // fetch the user to get his gender
                    $getOwner = Document::factory('user', $doc_owner['_id']);
                    $getOwner->load(null, 'info');
                    $adj = strlower(\Arr::get($getOwner->info, 'gender')) === 'male' ? 'his own ' : 'her own ';
                }
            }
            if(isset($i['private-message']))
            {
                return static::get_people_counts($items) ."$action.";
            }
        }
        return static::get_people_counts($items)
              ."$action "
              .($adj ? $adj : static::_adj_or_noun($recipient))
              .static::_post_link()
              .static::_page_link();
    }

    /**
     * Utility to extract username from various documents used in this class
     *
     * @param array $message the item or a user array to fetch data from
     * @param bool $set_owner if set, will return ownership too i.e. User's
     * @return string the retrieved name
     */
    protected static function _extract_user($message, $set_owner = FALSE)
    {
        $message = (array) $message;
        $info = \Arr::get($message, 'user', $message);
        return $set_owner ? $info['name'] . "'s" : $info['name'];
    }

    /**
     * Builds the post uri for the interacted document in question.
     *
     * @return string URI
     */
    protected static function _post_uri()
    {
        $type = static::$doc->type ? static::$doc->type : 'user';
        $name = $type === 'user' ? 'profile page' : $type;
        $link = Inflector::singularize( (string) static::$doc->collection());

        return "/$link/?id=" . static::$job->document_id;
    }

    /**
     * Builds the post link for the interacted document in question.
     *
     * @return string the generated HTML link
     */
    protected static function _post_link($type = NULL)
    {
        if(!$type)
        {
            $type = static::$doc->type ? static::$doc->type : 'user';
        }

        $name = $type === 'user' ? 'profile page' : $type;
        $link = Inflector::singularize( (string) static::$doc->collection());

        return static::_anchor("/$link/?id=" . static::$job->document_id, $name);
    }

    /**
     * Builds the parent page link for the interacted document in question.
     *
     * @return string the generated HTML link
     */
    protected static function _page_link($noun = NULL)
    {
        $uri = \Arr::get(static::$doc->page, 'uri');
        $page = $uri
              ? ' in ' . static::_anchor($uri, static::$doc->page['name'])
              : '';

        return ($noun) ? $page . " $noun" : $page;
    }

    /**
     * Decides if the recipient is the document owner. returns the doc owner's
     * name if not.
     *
     * @param MongoID $recipient_id the recipient id
     * @param string $adjective the possessive adjective to use
     * @return string the document owner name or an adjective (your)
     */
    protected static function _adj_or_noun($recipient, $adjective = 'your')
    {
        $user = isset(static::$doc->user) ? static::$doc->user : static::$doc->as_array();

        if((string) $user['_id'] === (string) $recipient['_id'])
            return "$adjective ";

        return $user['name'] . '\'s ';
    }

    /**
     * Builds all email links. Since we need a proper domain and also ensures
     * that the anchor attribute "target" is set to blank
     *
     * @param string the uri
     * @param string the link name
     * @uses HTML::anchor()
     * @return string the generated HTML link
     */
    protected static function _anchor($uri, $name)
    {
        return HTML::anchor('http://' . RT::APP_SERVER . $uri, $name, ['target' => '_blank']);
    }

    /**
     * Small utility that extracts the avatar for a user.
     *
     * @param mixed Document|array $user
     * @return string the url for the avatar
     */
    protected static function _get_avatar($user)
    {
        if($user instanceof Document)
        {
            $user = $user->as_array();
        }

        $id   = (string) $user['_id'];
        $size = 40;
        $avtr = \Arr::get($user, 'avatar');
		
		if(!$avtr)
		{
			$avtr = Document::factory('user', $id)->avatar;
		}

        if($avtr)
        {
            return 'http://' . str_replace($id, "$id/$size", $avtr);
        }
        $url = 'http://' . RT::BUCKET . '/avatars/';
        $gender = \Arr::get($user['info'], 'gender', 'male');
        return $url . strtoupper(substr($gender, 0, 1)) . $size . '.png';
    }

    public static function debug($text)
    {
    	if(!static::$debug) return;
    	if(!is_string($text))
		{
			$text = var_export($text, true);
		}
		
        $STDOUT = fopen("php://stdout", "w");
        fwrite($STDOUT, "$text \n");
        fclose($STDOUT);		
		
		
        //echo "$text \n";
        //echo "-------------------------------- \n";
        //Kohana::$log->add("debug", $text);
        //Kohana::$log->write();

        return;
    }
}
