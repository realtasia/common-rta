<?php defined('SYSPATH') or die('No direct script access.');
/**
 * 
 * @author Jason Nathan
 * @category Helpers
 * @package RT_Session
 * @subpackage Mongo
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Session_Mongo extends Session {

    // MongoDB instance instance
    protected $_db;
    // Database table name
    protected $_collection = 'sessions';

    /**
     * @var string the current session
     */
    protected $_session;
    // Garbage collection requests
    protected $_gc = 500;
    // The current session id
    protected $_id;

    public function __construct(array $config = NULL, $id = NULL)
    {
        if (!isset($config['group']))
            $config['group'] = 'default';

        if (!isset($config['name']))
            $config['name'] = 'oauth2';

        // Load the database
        $this->_db = Mongo_Database::instance($config['group'])->db()->{$this->_collection};

        if (isset($config['gc']))
            $this->_gc = (int) $config['gc'];

        parent::__construct($config, $id);

        if (mt_rand(0, $this->_gc) === $this->_gc)
            $this->_gc();
    }

    public function id()
    {
        return $this->_session;
    }

    /**
     * Read session data
     *
     * @param mixed $id
     */
    protected function _read($id = NULL)
    {
        if ($id OR $id = Cookie::get($this->_name))
        {
            $id = explode('-', $id);

            if (count($id) === 2)
            {
                $criteria = array(
                    '_id'   => new MongoId($id[0]),
                    'token' => new MongoId($id[1])
                );

                $result = $this->_db->findOne($criteria);

                if ($result != NULL)
                {
                    // Set the current session id
                    $this->_session = $result['_id'];

                    return $result['contents'];
                }
            }
        }

        return NULL;
    }

    protected function _regenerate()
    {
        // token is regenerated
    }

    protected function _write()
    {
        $insert = array(
            'last_active' => $this->_data['last_active'],
            'contents'    => $this->__toString(),
            'token'       => new MongoId, // regenerate against session fixation attacks
        );

        try
        {
            if ($this->_session == NULL OR !isset($data['_id']))
            {
                $this->_db->insert($insert);
            }
            else
            {
                $data['_id'] = new MongoId($this->_session);
                $criteria    = array('_id' => $data['_id']);
                $this->_db->update($criteria, $insert);
            }
        } catch (MongoException $e)
        {
            // An error occurred, the session has not been deleted
            return FALSE;
        }

        if (isset($data['_id']))
        {
            $this->_session = $data['_id'];

            // Update cookie
            Cookie::set($this->_name, $this->_session . '-' . $data['token'], $this->_lifetime);
        }

        return TRUE;
    }

    protected function _destroy()
    {
        if ($this->_session !== NULL)
        {
            $this->_db->remove(array('_id'           => new MongoId($this->_session)));
            $this->_session = NULL;

            Cookie::delete($this->_name);
        }

        return TRUE;
    }

    protected function _gc()
    {
        if ($this->_lifetime)
            $expires = $this->_lifetime;
        else
            $expires = Date::MONTH;

        $this->_db->remove(array("last_active" => array('$lt' => time() - $expires)));
    }

    /**
     * @return bool
     */
    protected function _restart()
    {
        // token is regenerated
    }

    /**
     * Overload catch exception with session destory and log
     *
     * Loads existing session data.
     *
     * $session->read();
     *
     * @param string session id
     * @return void
     */
    public function read($id = NULL)
    {
        $data = NULL;

        try
        {
            if (is_string($data = $this->_read($id)))
            {
                if ($this->_encrypted)
                {
                    // Decrypt the data using the default key
                    $data = Encrypt::instance($this->_encrypted)->decode($data);
                }
                else
                {
                    // Decode the base64 encoded data
                    $data = base64_decode($data);
                }

                // Unserialize the data
                $data = unserialize($data);
            }
            else
            {
                // Ignore these, session is valid, likely no data though.
            }
        } catch (Exception $e)
        {
            // Destroy the session
            $this->destroy();

            // Error reading the session, usually
            // a corrupt session.
            //throw new Session_Exception('Error reading session data.', NULL, Session_Exception::SESSION_CORRUPT);
            // Log & ignore all errors when a read fails
            Kohana::$log->add(Log::ERROR, Kohana_Exception::text($e))->write();

            return;
        }

        if (is_array($data))
        {
            // Load the data locally
            $this->_data = $data;
        }
    }

}

// End Session_Mongo
