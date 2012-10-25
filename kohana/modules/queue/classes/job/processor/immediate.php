<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Realtasia Queue Processor.
 *
 * @author Jason Nathan
 * @package Queue
 * @subpackage Modules/Queue/Queue/Processor
 * @version 0.9
 * @copyright 2012 Realtasia Pte Ltd
 */
class Job_Processor_Immediate
{

    public $job;
    public $recipients;
    public $interactors;
    public $emails;
    public $original_document;
    public $document_owner;

    /** @var bool  if false, performs batch operations. */
    public $is_single = FALSE;

    public static $types = array(
       'single' => array(
          'register', 'joined-beta', 'welcome-beta', 'lost-password', 'feedback',
          'mention', 'testimonial', 'wallpost', 'approve-testimonial'
       ),
       'group' => array(
          'comment',  'like', 'subscribe'
       )
    );

    /**
     *
     * @param MongoDocument $job
     * @return class Queue_Processer
     */
    public function __construct($job)
    {
        $this->job = (object) $job;
        $this->messages = $this->job->messages;
        return $this->process();
    }

    /**
     * Retrieves all users that are involved in this job after retrieving the
     * original document. Subsequently loops through the messages and calls
     * the respective methods to process them.
     *
     * @return Queue_Processer
     */
    public function process()
    {
        // fetch the document
        $this->original_document = static::get_original_document($this->job);

        // set the author
        $this->document_owner = static::string_id($this->original_document->user_id);

        if($this->job->is_single)
        {
            $this->is_single = TRUE;
            foreach (self::$types['single'] as $k => $type)
            {
                if (isset($this->messages[$type]) AND !empty($this->messages[$type]))
                {
                    $this->{str_replace('-', '_', $type)}($this->messages[$type][0]);
                }
            }

            return $this;
        }

        $this->set_users();

        // loop through the message types.
        foreach (self::$types['group'] as $k => $type)
        {
            if (isset($this->messages[$type]) AND !empty($this->messages[$type]))
            {
                foreach($this->recipients as $recipient_id => $recipient)
                {
                    // check notifications before building emails.
                    $notifications = Notifications::factory($recipient);
                    $this->{$type}(array_reverse($this->messages[$type]), $recipient_id, $notifications);
                }
            }
        }

        return $this;

    }

    /**
     * This method consolidates all recipients and interactors and makes a
     * single db call to retrieve user information. Then it sets the recipient
     * and interactor class properties.
     *
     * @return Queue_Processer
     */
    public function set_users($recipients = NULL, $interactors = NULL)
    {

        $recipients = is_null($recipients)
                       ? $this->extract_recipients($this->original_document)
                       : array($recipients);

        $interactors = is_null($interactors)
                       ? $this->extract_interactors($this->messages)
                       : array($interactors);

        $user_ids = array_unique(Arr::merge($recipients, $interactors));

        $cursor = static::_get_users($user_ids);
        // we put the retrieved users back into the recipients and interactor
        // properties
        while ($cursor->hasNext())
        {
            $u = $cursor->getNext();

            //echo debug::vars($u['_id'], $recipients, in_array($u['_id'], $recipients));

            if(in_array($u['_id'], $recipients))
                  $this->recipients[$u['_id']->__toString()] = $u;

            if(in_array($u['_id'], $interactors))
                  $this->interactors[$u['_id']->__toString()] = $u;
        }

        return $this;
    }

    /**
     * sets possible 'comment' email messages for each recipient. Checks their
     * notifications and adds accordingly
     *
     * @param array $items all comment items in this job
     * @param array $recipient the retrived recipient array
     * @return Queue_Processer
     */
    public function comment($items, $receip_id, $notifications)
    {
        // check if recipient is document owner and would like notifications
        // from his own post
        if($this->document_owner == $receip_id)
        {
            if(!$notifications->own_post_comments())
                return;
        }

        // check if this recipient wants notifications from other user's posts
        if($this->document_owner !== $receip_id)
        {
            if(!$notifications->other_post_comments())
                return;
        }
        //echo Debug::vars(Model::factory('comment')->get($items[0]['comment_id']));

        return $this->recipient_emails($items, $receip_id, 'comment');
    }

    /**
     * sets possible 'like' email messages for each recipient. Checks their
     * notifications and adds accordingly
     *
     * @param array $items all like items in this job
     * @param array $recipient the retrived recipient array
     * @return Queue_Processer
     */
    public function like($items, $receip_id, $notifications)
    {
        $doc_id = static::string_id($this->original_document->_id);

        // check if recipient is document owner and would like notifications
        // from his own post
        if($this->document_owner == $receip_id)
        {
            if(!$notifications->own_post_likes())
                return;
        }

        // check if this recipient wants notifications from other user's posts
        if($this->original_document !== $receip_id)
        {
            if(!$notifications->other_post_likes())
                return;
        }

        // check if this is a profile like and see if user wants to be notified
        if($doc_id == $receip_id)
        {
            if(!$notifications->profile_likes())
                return;
        }

        return $this->recipient_emails($items, $receip_id, 'like');
    }

    /**
     * sets possible 'subscribe' email messages for each recipient. Checks their
     * notifications and adds accordingly
     *
     * @param array $items all like items in this job
     * @param array $recipient the retrived recipient array
     * @return Queue_Processer
     */
    public function subscribe($items, $receip_id, $notifications)
    {
        $doc_id = static::string_id($this->original_document->_id);

        // check if recipient is document owner and would like notifications
        // from his own post
        if($this->document_owner == $receip_id)
        {
            if(!$notifications->own_post_subscribes())
                return;
        }

        // check if this recipient wants notifications from other user's posts
        if($this->document_owner !== $receip_id)
        {
            if(!$notifications->profile_subscribes())
                return;
        }

        // check if profile subscription and see if user wants to be notified
        if($doc_id == $receip_id)
        {
            if(!$notifications->profile_subscribes())
                return;
        }

        return $this->recipient_emails($items, $receip_id, 'subscribe');
    }

    /**
     * sets possible 'mention' email messages for each recipient. Checks their
     * notifications and adds accordingly
     *
     * @param array $items all like items in this job
     * @param array $recipient the retrived recipient array
     * @return Queue_Processer
     */
    public function mention($items, $receip_id, $notifications)
    {
        // check if recipient wants to receive emails for his mentions
        if(!$notifications->mention())
            return;

        return $this->recipient_emails($items, $receip_id, 'mention');
    }

    /**
     * sets possible 'wallpost' email messages for each recipient. This is a
     * little different because we send an email to the person's page where the
     * post is written, not to the writer. As usual, only if their
     * notifications settings allow it.
     *
     * @param array $items this job message
     * @return Queue_Processer
     */
    public function wallpost($item)
    {
        $notifications = Notifications::factory($item['mentionee_ids']);
        // check if recipient wants to receive emails for posts written on his wall
        if(!$notifications->wallpost())
            return;

        $this->set_users($item['mentionee_ids'], $item['user_id']);

        return $this->single_recipient_emails(
              $item, $item['mentionee_ids'], $item['user_id'], 'wallpost'
        );
    }

    /**
     * sets possible 'testimonial' email messages for each recipient. This is a
     * little different because we send an email to the person whose page the
     * testimonial was written, not to the writer. As usual, only if their
     * notifications settings allow it.
     *
     * @param array $item this job message
     * @return Queue_Processer
     */
    public function testimonial($item)
    {
        $notifications = Notifications::factory($item['mentionee_ids']);
        // check if recipient wants to receive emails for testimonials written
        // about him
        if(!$notifications->testimonial())
            return;

        $this->set_users($item['mentionee_ids'], $item['user_id']);

        return $this->single_recipient_emails(
              $item, $item['mentionee_ids'], $item['user_id'], 'testimonial'
        );
    }

    /**
     * approval 'testimonial' email messages for testimonial writer. This is
     * automatically sent. In this case the recipient is as per normal, the
     * original post creator.
     *
     * @param array $item this job message
     * @return Queue_Processer
     */
    public function approve_testimonial($item)
    {
        $this->set_users($item['user_id'], $item['mentionee_ids']);

        return $this->single_recipient_emails(
              $item, $item['user_id'], $item['mentionee_ids'], 'approve-testimonial'
        );
    }

    /**
     *
     * @param type $item
     */
    public function register($item)
    {
        ;
    }


    public function joined_beta($item)
    {
        ;
    }


    public function welcome_beta($item)
    {
        ;
    }


    public function lost_password($item)
    {
        ;
    }


    public function feedback($item)
    {
        ;
    }


    /**
     * Utility method that adds qualified recipient emails to the email property
     * after all the individual checks
     *
     * @param array $items
     * @param string|mongoID $recipient
     * @return Queue_Processer
     */
    protected function recipient_emails($items, $receip_id, $type)
    {
        // loops through all the items.
        foreach($items as $key => $item)
        {
            $item_uid = static::string_id($item['user_id']);
            // this is the decision making process. Document owner does not
            // get emails for his own interactions. And each recipient does
            // not get his own interaction emails.
            if ($item_uid !== $receip_id)
            {
                $item['user'] = $this->interactors[static::string_id($item['user_id'])];
                //just for comments, retrieve the comment
                if($type == 'comment')
                    $item['comment'] = Model::factory('comment')->get($item['comment_id']);

                unset($item['comment_id'], $item['user_id']);

                // add to the final array and build templates.
                $this->emails[static::string_id($receip_id)][$type][] = $item;
            }
        }

        return $this;
    }

    /**
     * Utility method that adds qualified recipient emails to the email property
     * for single emails
     *
     * @param array $item
     * @param string|mongoID $recipient
     * @return Queue_Processer
     */
    protected function single_recipient_emails($item, $receip_id, $interact_id, $type)
    {
        $item['user'] = $this->interactors[static::string_id($item['user_id'])];

        unset($item['user_id']);

        // add to the final array and build templates.
        $this->emails[static::string_id($receip_id)][$type][] = $item;

        return $this;
    }

    /**
     * extracts all subscribers and likers from the original document. Removes
     * duplicates and merges them into an array of user_ids
     *
     * @param MongoDocument $document the extracted original document
     * @return array of user_ids
     */
    protected static function extract_recipients($document)
    {
        $s = Arr::get((array) $document, 'subscribers', array());

        return array_unique($s);
    }

    /**
     * A method that loops through all messages and extracts user_ids of the
     * respective interactors.
     *
     * @param array $messages the list of messages pertaining to this job
     * @return array of interactor ids
     */
    protected static function extract_interactors($messages)
    {
        foreach ($messages as $key => $types)
        {
            foreach ($types as $type => $message)
            {
                $ids[] = $message['user_id'];
            }
        }

        return array_unique($ids);
    }

    /**
     * Retrieves the original document that was interacted upon from the database
     * uses the job document to fetch the doc id and model
     *
     * @param MongoDocument $job the job currently being processed
     * @return MongoDocument the extracted original document
     */
    protected static function get_original_document($job)
    {
        $fields = array(
           'user_id', 'user_full_name','subscribers', 'likers', 'counts',
           'page_title', 'page_uri', 'uri', 'content'
        );
        return Model::factory($job->document_type)
                    ->get_selective($job->document_id, $fields);
    }

    /**
     * Utility to convert mongoids to string for comparisons
     *
     * @param MongoID $id
     * @return string
     */
    protected static function string_id($id)
    {
        return $id instanceof MongoID ? $id->__toString() : $id;
    }

    /**
     * Retrieves users from database only with the fields needed for Queue
     *
     * @param array|MongoID $user_ids an array of user_ids or a single id
     * @return MongoCursor
     */
    protected static function _get_users($user_ids)
    {
        $query['status'] = 'active';
        $query['_id'] = is_array($user_ids)
                        ? array('$in' => array_map('Model::check_id', $user_ids))
                        : Model::check_id($user_ids);

        return Model::factory('user')->collection->find($query,
              array(
                 '_id' => 1, 'email' => 1, 'first_name' => 1,
                 'display_name' => 1, 'avatar' => 1, 'notifications' => 1
              ));
    }

    /**
     *
     * @return type
     */
    public function add($type_key = 'group')
    {
        $mail_adder = Mail_Add::factory($this->original_document, $this->job);

        //return debug::vars($this->emails);
        foreach($this->emails as $r => $messages)
        {
            // loop through the message types.
            foreach (self::$types[$type_key] as $k => $type)
            {

                if (isset($messages[$type]) AND !empty($messages[$type]))
                {
                    //echo Debug::vars($r);
                    $mail_adder->process($this->recipients[$r], $type, $messages[$type]);
                }
            }
        }

        return $mail_adder;
    }

}