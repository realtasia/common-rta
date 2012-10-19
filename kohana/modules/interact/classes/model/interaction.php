<?php

class Model_Interaction extends Model {

    /**
     *
     * @var array The existing post types in Realtasia
     */
    public static $post_types = array(
        'post', 'listing', 'testimonial', 'attachment', 'event', 'checkin'
    );

    /**
     *
     * @var array The existing page types in realtasia
     */
    public static $page_types = array(
        'location', 'profile', 'company'
    );

    /**
     *
     * @var array Interactions 
     */
    public static $interactions = array(
        'positive' => array(
            'subscribe', 'like'
        ),
        'negative' => array(
            'unsubscribe', 'unlike'
        )
    );

    /**
     * Retrieve a user's subscriptions.
     *
     * @param string|MongoID $user_id
     * 
     * @return array of object_id & type
     */
    public function subscriptions($user_id)
    {
        $cursor = $this->collection->find(
                array('user_id'     => parent::check_id($user_id), 'interaction' => 'subscribe'), array('object_id' => 1, 'type'      => 1)
        );
        if ($cursor->hasNext())
            return iterator_to_array($cursor);
    }

    /**
     * Retrieve an object's Subscribers
     * 
     * @param string|MongoID $_id
     * 
     * @return array of user_id & type 
     */
    public function subscribers($_id)
    {
        $cursor = $this->collection->find(
                array('object_id'   => parent::check_id($_id), 'interaction' => 'subscribe'), array('user_id' => 1, 'type'    => 1)
        );
        if ($cursor->hasNext())
            return iterator_to_array($cursor);
    }

    /**
     * Perform a subscribe action
     *
     * @param string|MongoID $_id
     * @param string $type
     * @param string|MongoID $user_id
     * @uses self::insert_positive()
     * 
     * @return bool 
     * @throws MongoCursorException 
     */
    public function subscribe($_id, $type, $user_id)
    {
        $query = static::query($_id, $type, $user_id);

        return $this->insert_positive('subscribe', $query);
    }

    /**
     * Perform an unsubscribe action
     *
     * @param string|MongoID $_id
     * @param string $type
     * @param string|MongoID $user_id
     * @uses self::remove_negative()
     * 
     * @return bool
     * @throws MongoCursorException 
     */
    public function unsubscribe($_id, $type, $user_id)
    {
        $query = static::query($_id, $type, $user_id);

        return $this->remove_negative('unsubscribe', $query);
    }

    /**
     * Retrieve a user's likes 
     *
     * @param string|MongoID $user_id
     * 
     * @return array of object_id & type 
     */
    public function likes($user_id)
    {
        $cursor = $this->collection->find(
                array('user_id'     => parent::check_id($user_id), 'interaction' => 'like'), array('object_id' => 1, 'type'      => 1)
        );
        if ($cursor->hasNext())
            return iterator_to_array($cursor);
    }

    /**
     * Retrieve a object's likers 
     *
     * @param string|MongoID $_id
     * 
     * @return array of user_ids & type 
     */
    public function likers($_id)
    {
        $cursor = $this->collection->find(
                array('object_id'   => parent::check_id($_id), 'interaction' => 'like'), array('user_id' => 1, 'type'    => 1)
        );
        if ($cursor->hasNext())
            return iterator_to_array($cursor);
    }

    /**
     * Perform a like action
     *
     * @param string|MongoID $_id
     * @param string $type
     * @param string|MongoID $user_id
     * @uses self::insert_positive()
     * 
     * @return bool 
     * @throws MongoCursorException 
     */
    public function like($_id, $type, $user_id)
    {
        $query = static::query($_id, $type, $user_id);

        return $this->insert_positive('like', $query);
    }

    /**
     * Perform an unlike action
     *
     * @param string|MongoID $_id
     * @param string $type
     * @param string|MongoID $user_id
     * @uses self::remove_negative()
     * 
     * @return bool
     * @throws MongoCursorException 
     */
    public function unlike($_id, $type, $user_id)
    {
        $query = static::query($_id, $type, $user_id);

        return $this->remove_negative('unlike', $query);
    }

    /**
     * Static function that performs a negative operation on an interaction
     *
     * @param string $interaction
     * @param array $query
     *
     * @return bool
     * @throws MongoCursorException 
     */
    public function remove_negative($interaction, $query)
    {
        if (!static::verify_interaction($interaction, FALSE))
            return FALSE;

        $query['interaction'] = $interaction;

        try
        {
            $this->collection->remove($query, array('safe' => TRUE));

            return TRUE;
        } catch (MongoCursorException $e)
        {
            Debug::error('Error deleting interaction: :interaction for query: :query -> :e', array(
                ':interaction' => print_r($interaction, TRUE),
                ':query'       => print_r($query, TRUE),
                ':e'           => $e->getMessage()
            ));
        }

        return FALSE;
    }

    /**
     * Static function that performs a positive operation on an interaction
     *
     * @param string $interaction
     * @param array $query
     *
     * @return boolean
     * @throws MongoCursorException 
     */    
    public function insert_positive($interaction, $query)
    {
        if (!static::verify_interaction($interaction))
            return FALSE;

        $query['interaction'] = $interaction;

        try
        {
            $this->collection->save($query, array('safe' => TRUE));

            return $query;
        } catch (MongoCursorException $e)
        {
            Debug::error('Error creating interaction: :interaction for query: :query -> :e', array(
                ':interaction' => print_r($interaction, TRUE),
                ':query'       => print_r($query, TRUE),
                ':e'           => $e->getMessage()
            ));
        }

        return FALSE;
    }

    /**
     * Static function that builds a query array for all operations
     *
     * @param string|MongoID $_id the object id
     * @param string $type the object types
     * @param string|MongoID $user_id the user id
     *
     * @return array
     */    
    protected static function query($_id, $type, $user_id)
    {
        if (static::verify_type($type))
            return array(
                'object_id' => parent::check_id($_id),
                'user_id'   => parent::check_id($user_id),
                'type'      => $type,
            );
    }

    /**
     * Verifies a given string type that it exists
     *
     * @param string $type
     * @return boolean
     * @throws Interaction_Exception 
     */
    protected static function verify_type($type)
    {
        $type = Inflector::singular($type);
        if (in_array($type, static::$post_types) OR !in_array($type, static::$page_types))
            throw new Interaction_Exception('Object Type not in List of available Types');

        return TRUE;
    }

    /**
     * Verifies a given string interaction that it exists
     *
     * @param string $interaction
     * @param boolean $positive
     * 
     * @return boolean
     * @throws Interaction_Exception 
     */
    protected static function verify_interaction($interaction, $positive = TRUE)
    {
        $i_type = $positive ? 'positive' : 'negative';
        if (in_array($interaction, static::$interactions[$i_type]))
            return TRUE;

        throw new Interaction_Exception('Interaction Type not in interaction list.');
    }

}