<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Ticker is the core of realtasia's Social Network Element. It has one task
 * To build and manage a person's feed.
 *<code>
 * -- for ticker_type "new"
 *      -- get posts page_id && user_id
 *      -- get subscribers of user and insert new doc
 *      -- get subscribers of page and insert new doc
 * -- for ticker_type "delete", remove all by post_id
 * -- for ticker_type "update"
 *      -- check privacy
 *      -- get a ticker by post id, and check if privacy was changed
 *          -- if changed ==> PRIVATE
 *              -- delete all non participating users' tickers with post_id
 *          -- if changed ==> PUBLIC
 *              -- update all remaining tickers, no updates to relevancy or modified
 *          -- if no change
 *              -- update existing docs by doc_id (inc, modified)
 *</code>
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Helpers
 * @subpackage Ticker
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Ticker {
    public $document;
    public $owner;
    public $users;
    public $page_id;
    public $user_id;

    /**
     * This method is the "API" for ticker jobs. Only requires a document_id and
     * a ticker type. New posts use 'new', existing posts use 'update'
     * !NOTE these will create a background process that will only update users
     * that is NOT the interactor. Interactors should create or update using
     * the other methods in this library.
     *
     * @param mixed $document_id MongoID|string
     */
    public static function add($document_id, $ticker_type = 'new')
    {
        $job = Document::factory('job');
        $job->load_values([
            'document_id' => Document::check_id($document_id),
            'in_progress' => false,
            'status' => 1,
            'delivery' => 'ticker',
            'ticker_type' => $ticker_type
        ]);
        $job->save();
    }

    /**
     * Static factory method, returns new self
     *
     * @param mixed $post Mongo_Document|MongoID|string the post
     * @return \Ticker
     */
    public static function factory($post)
    {
        return new Ticker($post);
    }

    /**
     * Sets or gets the default properties for Ticker
     *
     * @param mixed $post Mongo_Document|MongoID|string the post
     * @return \Ticker
     */
    public function __construct($post)
    {
        if($post instanceof Document)
        {
            $this->document = $post->as_array();
            switch(true)
            {
                case !\Arr::get($this->document, 'privacy'):
                case !\Arr::get($this->document, 'page'):
                case !\Arr::get($this->document, 'user'):
                    return $this->get_document($post->_id);
                default:
                    $this->owner = $post->user;
                    return $this;
            }
        }

        $post = Document::check_id($post);

        if($post instanceof MongoID)
        {
            return $this->get_document($post);
        }

        if(is_array($post) && $id = \Arr::get($post, '_id'))
        {
            return $this->get_document($id);
        }
    }

    /**
     * This is a single create method for a single entry.
     *
     * @param mixed MongoID|string $user_id
     * @param int $relevancy
     * @uses \Document
     * @return \Ticker
     */
    public function create($user_id, $relevancy = 1)
    {
        if($this->document && $this->owner)
        {
            $ticker = \Arr::merge(self::defaults($relevancy), [
                'document_id'  => $this->document['_id'],
                'user_id'  => Document::check_id($user_id),
                'owner_id' => $this->owner['_id']
            ]);

            $ticker = Document::factory('ticker')->load_values($ticker);

            $ticker->save();
        }

        return $this;
    }

    /**
     * This method is only used for the person that interacted on the document
     * New post, new comment, new like etc. This sets the hasInteracted field
     * to true.
     *
     * @param mixed MongoID|string $user_id
     * @param int $relevancy
     * @uses \Document
     * @return \Ticker
     */
    public function create_once($user_id, $relevancy = 1)
    {
        if($this->document && $this->owner)
        {
            $ticker = \Arr::merge(self::defaults($relevancy), [
                'document_id'  => $this->document['_id'],
                'user_id'  => Document::check_id($user_id),
                'hasInteracted'  => true,
                'owner_id' => $this->owner['_id']
            ]);

            $ticker = Document::factory('ticker')->load_values($ticker);

            $ticker->save();
        }

        return $this;
    }


    /** This utility method inserts a whole bunch of tickers into the db.
     * I think this data is not mission critical and as such, I have not set the
     * writeconcern option. Mostly this is a fire and forget method.
     * Loops through the array of documents to insert and ensures proper fields
     * set.
     *
     * @param array $documents an array of documents to insert
     * @return boolean
     */
    public function bulk_create(array $documents = [])
    {
        $documents = array_filter($documents);
        if(!empty($documents))
        {
            foreach($documents as $k => $doc)
            {
                $documents[$k] =  \Arr::overwrite($this->defaults(1), $doc);
            }

            Collection::factory('ticker')->batchInsert($documents);
        }

        return $this;
    }

    /** This utility method updates either one or a set of tickers into the db
     * Defaults to multiple, but a single insert can be enforced by providing a
     * user_id.
     *
     * @param array $query the query to find relevant documents
     * @param int $relevancy modified is auto updated. this is the relevancy counter
     * @return boolean
     */
    public function update(array $query = [], $relevancy = 1)
    {
        $update = $this->get_default_update_params($relevancy);
        $query = \Arr::merge($query, ['document_id' => $this->document['_id']]);
        Collection::factory('ticker')->update($query, $update, [
            'multiple' => true
        ]);
        return $this;
    }

    /** This method is a special use case that must return a boolean. It is done
     * once for each interactor. We update only if the document the 'hasInteracted'
     * field is false
     *
     * @param array $query the query to find relevant documents
     * @param int $relevancy modified is auto updated. this is the relevancy counter
     * @return boolean
     */
    public function update_once(array $query = [], $relevancy = 1)
    {
        $update = $this->get_default_update_params($relevancy);
        $update['$set']['hasInteracted'] = true;
        $query = \Arr::merge($query, [
            'document_id' => $this->document['_id'],
            'hasInteracted' => false
        ]);
        $result = Collection::factory('ticker')->update_safe($query, $update);

        if(is_array($result))
        {
            return (bool) \Arr::get($result, 'n');
        }
        return false;
    }


    /**
     * Delete happens in one of 2 scenarios. When owner deletes a post or when
     * user hides post.
     *
     * Deletes do not need instantating of the Ticker class because the original
     * post would have been deleted already.
     *
     *
     * @param array $query
     * @return type
     */
    public function delete(array $query = [])
    {
        if($this->document)
        {
            if(empty($query))
            {
                return static::add($this->document['_id'], 'delete');
            }

            $query = \Arr::merge($query, ['document_id' => $this->document['_id']]);

            Collection::factory('ticker')->remove($query, [
                'multiple' => true
            ]);
        }

        return $this;
    }

    /**
     * Utility that returns a default update array extracting values from the
     * original document.
     *
     * @param int $relevancy
     * @return array
     */
    public function get_default_update_params($relevancy)
    {
        if(!$this->document)
            return [];

        $privacy = \Arr::path($this->document, 'privacy.is');

        return [
            '$inc' => ['relevancy' => $relevancy],
            '$set' => ['modified'  => time(), 'privacy.is' => $privacy]
        ];
    }

    /**
     * Fetches the post document from the db. Utility method
     *
     * @param type $_id
     * @return \Ticker
     */
    public function get_document($_id)
    {
        $post = Document::factory('post', $_id);
        $post->load(null, ['page', 'page_parent', 'user', 'privacy']);
        $this->document = $post->as_array();
        $this->owner = $post->user;
        return $this;
    }

    /**
     * Utility method that returns the schema for the ticker doc.
     *
     * @return array
     */
    public function defaults($relevancy = 1)
    {
        if(!$this->document)
            return [];

        $privacy = \Arr::path($this->document, 'privacy.is');

        return [
            'modified'       => time(),
            'document_id'    => \Arr::get($this->document, '_id'),
            'user_id'        => '',
            'owner_id'       => \Arr::get($this->owner, '_id'),
            'relevancy'      => $relevancy,
            'visibility'     => 'visible',
            'hasInteracted'  => false,
            'privacy'        => ['is' => $privacy]
        ];
    }

    /**
     * Performs a query on the interactions database to fetch all subscribers
     * that are subscribing to a given object id.
     *
     * @param mixed $id string|MongoID of the object (page or user)
     * @return \MongoCursor iterator object
     */
    public function subscribers($id)
    {
        return Collection::factory('interaction')->find([
                'object_id'   => Document::check_id($id),
                'interaction' => 'subscribe'
        ])->fields(['user']);
    }

    /**
     * Utility that checks if the user that created the post is writing on his
     * own wall.
     *
     * @return boolean
     */
    public function is_page_user()
    {
        if(!$this->document || !$this->owner)
            return false;

        $this->page_id = (string) \Arr::get($this->document['page'], '_id');
        $this->user_id = (string) \Arr::get($this->owner, '_id');

        return $this->page_id === $this->user_id;
    }

}