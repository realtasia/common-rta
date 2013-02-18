<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Interaction model. MongoDB awesomeness
 * Schema:
 *      object_type => post|page|user|comment,
 *      object_id   => MongoID
 *      user        =>
 *          _id         => MongoID (retrieved from public static variable user_id),
 *          name        => The name of the user, for ease.
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage Model/Interaction
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Interaction extends Document {

    private static $inc = 1;
    private static $count_field;
    private static $valid_interactions = ['like', 'unlike', 'subscribe', 'unsubscribe'];
    private static $valid_objects = ['post', 'page', 'comment', 'user', 'listing'];

    /**
     * Proxy method to self::interact
     *
     * Performs a like on an object.
     *
     * @param id|MongoID $object_id
     * @param string $object_type
     *
     * @return boolean|\Model_Interaction
     */
    public function like($object_id, $object_type)
    {
        return $this->interact('like', $object_id, $object_type);
    }

    /**
     * Proxy method to self::interact
     *
     * Performs a subscribe.
     *
     * @param id|MongoID $object_id
     * @param string $object_type
     *
     * @return boolean|\Model_Interaction
     */
    public function subscribe($object_id, $object_type)
    {
        return $this->interact('subscribe', $object_id, $object_type);
    }

    /**
     * Proxy method to self::interact
     *
     * Performs a like on an object.
     *
     * @param id|MongoID $object_id
     * @param string $object_type
     *
     * @return boolean|\Model_Interaction
     */
    public function unlike($object_id, $object_type)
    {
        return $this->interact('unlike', $object_id, $object_type);
    }

    /**
     * Proxy method to self::interact
     *
     * Performs a subscribe.
     *
     * @param id|MongoID $object_id
     * @param string $object_type
     *
     * @return boolean|\Model_Interaction
     */
    public function unsubscribe($object_id, $object_type)
    {
        return $this->interact('unsubscribe', $object_id, $object_type);
    }

    /**
     * Checks if current user is interacting with object
     *
     * @param id|MongoID $object_id
     *
     * @return boolean|array of interactions
     */
    public function interacting($object_id, $object_type)
    {
        if ($this->current_user == NULL)
            return false;


        $results = $this->collection(true)->find([
                    'user._id'  => parent::check_id($this->current_user->_id),
                    'object_id' => parent::check_id($object_id),
                    'object_type' => $object_type
                ]);
        $return = ['like' => false, 'subscribe' => false];
        while($results->hasNext())
        {
            foreach ($results->getNext()->as_array() as $k => $v)
            {
                if ($k == 'interaction')
                {
                    $return[$v] = true;
//                    if($v === 'subscribe')
//                    {
//                        $return['subscribing'] = true;
//                    }
                }
            }
        }
        return $return;
    }

    /**
     * Sets the user field to the current_user
     *
     * @return void
     */
    public function before_save($action)
    {
        $user =  $this->get_default_user_fields();

        $this->user = $user;
    }

    /**
     * 1. Updated the counts in the object.
     *      Upon saving, the object timestamps are updated automatically
     * 2. Saves the current user
     *      Upon saving, timestamps are updated automatically
     *
     * @return \Model_Interaction
     */
    public function after_save($action)
    {
        // guess the update for this interaction.
        $this->guess_update();

        $count_field = static::$count_field;

        $interactor = $this->get_default_user_fields();
        // fetch the concerned object
        $object = parent::factory($this->object_type, $this->object_id);


        // update the latest interactions in the object
        if (static::$inc === 1)
        {
            // add this subscriber to the list
            $object->addToSet($count_field, $interactor);
        }
        else
        {
            // we just remove the interaction.
            $object->pull($count_field, ['_id' => $interactor['_id']]);
        }

        // increment the count for this interaction
        $object->inc('counts.' . $count_field, static::$inc);
        $object->save();

        /*
         * Small hack to ensure a capped interaction list.
         * @see https://github.com/colinmollenhour/mongodb-php-odm/issues/27#issuecomment-9950515
         */
        if (static::$inc === 1)
        {
            $object->collection()->update_safe(
              ['_id' => $this->object_id, $count_field => ['$size' => 6]],
              ['$pop' => [$count_field => 1]]
            );
        }

        // update the user's last active
        $this->current_user->save();

        return $this;
    }


    /**
     * Runs the after_save method as it needs to do the same thing
     *
     */
    public function after_delete()
    {
        $this->after_save(null);
    }

    /**
     * Performs an interaction. Currently not very optimised.
     * 1. unlike|unsubscribe
     *      delete entry from db.
     *      call the after_save function to update the user and interacted object
     * 2. like
     *      check current interactions and add a like if not available
     *      check if this is a comment and fetch the parent object to run a subscribe
     *      if not a comment, run a subscribe on the object anyway.
     *      call the after_save function to update the user and interacted object
     * 3. subscribe
     *      check current interactions and add a subscribe if not available
     *      call the after_save function to update the user and interacted object
     *
     * @param string $interaction
     * @param string|MongoID $object_id
     * @param string $object_type
     * @return boolean|\Model_Interaction
     */
    protected function interact($interaction, $object_id, $object_type)
    {
        $this->collection()->ensureIndex(['interaction' => 1]);
        $this->collection()->ensureIndex(['object_id' => 1]);
        $this->collection()->ensureIndex(['user._id' => 1]);

        if ( is_object($this->current_user) && !$this->current_user->loaded())
            return false;

        $user = (object) $this->get_default_user_fields();

        $object_id = $object_id instanceof MongoID ? $object_id : new MongoID($object_id);

        // set the query
        $query = [
            'interaction' => $interaction,
            'object_id'   => $object_id,
            'user._id'    => $user->_id,
        ];

        $this->verify_fields($interaction, $object_id, $object_type);

        try
        {
            switch ($this->interaction)
            {
                case 'unlike':
                case 'unsubscribe':
                    // remove the 'un'
                    $query['interaction'] = substr($this->interaction, 2);

                    // remove the interaction
                    if((bool) $this->collection(true)->remove_safe($query, ['justOne' => TRUE]))
                    {
                        // only do updates if there was a succesful removal.
                        // the remove_safe returns the number of documents removed
                        $this->after_delete();
                    }
                    break;
                case 'like':

                    // check current interactions with this object
                    $interacting = $this->interacting($object_id, $object_type);

                    // there were no likes by this user on this object
                    if (!$interacting['like'])
                    {
                        $this->save();
                    }
                    /*
                     * Comments are special. If someone likes a comment, we
                     * have to subscribe that person to the object the comment
                     * was created for. Cos we can't subscribe to comments.
                     */
                    if($this->object_type == 'comment')
                    {
                        // get the comment's parent object. variables are
                        // confusing. $object_id refers to this comment _id.
                        // retrieving 'object_id' for it's parent object
                        $p = parent::factory('comment')
                                ->get($object_id, ['object_id', 'object_type']);

                        // get the parent object interactions with the current user
                        $p_interacting = $this->interacting($p->object_id, $p->object_type);

                        // same as below, we create a subscribe if none exist.
                        if (!$p_interacting['subscribe'])
                        {
                            $this->clear();
                            $this->interact('subscribe', $p->object_id, $p->object_type);
                        }
                    }
                    else
                    {
                        // this isn't a like on a comment, we proceed with user
                        // subscription of this object
                        if (!$interacting['subscribe'])
                        {
                            $this->clear();
                            $this->interact('subscribe', $object_id, $object_type);
                        }
                    }
                    break;
                case 'subscribe':
                    $interacting = $this->interacting($object_id, $object_type);
                    if (!$interacting['subscribe'])
                    {
                        $this->save();
                    }
                    break;
            }
        }
        catch (MongoException $e)
        {
            Debug::error(
                    "MongoException while user :user tried to :interact a :object_type (:oid) \n"
                    . "Error Message- :message \n"
                    . "Error Code- :code", [
                ':user'        => $user->name,
                ':interact'    => $interaction,
                ':iod'         => $object_id,
                ':object_type' => $object_type,
                ':message'     => $e->getMessage(),
                ':code'        => $e->getCode()
            ]);
            return FALSE;
        }
        return TRUE;
    }

    /**
     * This is normally called when a post (or comment or user) is deleted.
     * We need to remove all interactions pertaining to the object
     *
     * @param type $object_id
     * @param type $object_type
     */
    protected function uninteract($object_id, $object_type)
    {
        $this->collection(true)->remove_safe([
            'object_id' => parent::check_id($object_id),
            'object_type' => parent::check_id($object_type),
        ]);
    }

    /**
     * Decides whether it is a positive or negative action based on the interaction
     *
     * @return \Model_Interaction
     */
    protected function guess_update()
    {
        switch ($this->interaction)
        {
            case 'like':
                static::$inc = 1;
                static::$count_field = 'likers';
                break;
            case 'unlike':
                static::$inc = -1;
                static::$count_field = 'likers';
                break;
            case 'subscribe':
                static::$inc = 1;
                static::$count_field = 'subscribers';
                break;
            case 'unsubscribe':
                static::$inc = -1;
                static::$count_field = 'subscribers';
                break;
        }

        return $this;
    }

    /**
     * Verifies the fields needed for an insertion
     *
     * @param string $interaction
     * @param string|MongoID $object_id
     * @param string $object_type
     *
     * @return boolean|\Model_Interaction
     */
    protected function verify_fields($interaction, $object_id, $object_type)
    {
        switch (true)
        {
            case!isset($interaction):
            case!in_array($interaction, self::$valid_interactions):
            case!isset($object_type):
            case!in_array($object_type, self::$valid_objects):
            case!isset($this->current_user):
            case!isset($object_id):
                return false;
        }

        $this->interaction = $interaction;
        $this->object_id   = $object_id;
        $this->object_type = $object_type;

        return $this;
    }
}