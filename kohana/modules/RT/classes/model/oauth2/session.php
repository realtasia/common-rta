<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of collection
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Oauth2_Session
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Oauth2_Session extends Document {
    protected $name = 'oauth2_sessions';


    /**
     * Gets a stored session for the given token.
     *
     * @param string $token
     * @return boolean|array
     */
    public function get_session_by_token($token)
    {
        return $this->get_session(['access_token' => $token]);
    }

    /**
     * Retrieves a session by an array of params. Normal cases should include
     * user_id, client_id or a given token.
     *
     * @param array $params
     * @return boolean|array
     */
    public function get_session(array $params)
    {
        // try to get a session with the given params.
        if ($this->load($params))
            return $this->stringify($this->as_array());
        // return it. Auth class should check for expiry
        return false;
    }

    /**
     * Destroys a session by it's access token.
     *
     * @param string $token
     * @return type
     */
    public function destroy($token)
    {
        $this->load(['access_token' => $token]);
        return $this->delete() ? true : false;
    }

    /**
     * Either updates or creates a new session with given params. The params
     * array should look like this.
     * [
     *      _id        => the MongoID of the existing session or null for new.
     *      client_id  => REQUIRED,
     *      user_id    => OPTIONAL,
     *      code       => OPTIONAL,
     *      grant_type => REQUIRED. Currently serving "password" and "client_credentials",
     *      stage      => the stage of the auth flow, defaults to "granted"
     * ]
     *
     * @param array $params
     * @param boolean $new destroys an old token
     *
     * @return string|array
     */
    public function set_token($params, $new = false)
    {
        //Debug::log(print_r($params[true]));
        // the access token
        $access_token = sha1(time() . uniqid());

        // query array can safely contain these
        $query = [
            'client_id'    => $params['client_id'],
            'grant_type'   => $params['grant_type']
        ];

        // only add the next 3 params if they exist
        if(isset($params['user_id']))
        {
            $query['user_id'] = new MongoID($params['user_id']);
        }

        if(isset($params['_id']))
        {
            $query['_id'] = new MongoID($params['_id']);
        }

        if(isset($params['access_token']))
        {
            //Debug::log($params['access_token']);
            $query['access_token'] = $params['access_token'];
            if($new)
            {
                $this->destroy($params['access_token']);
            }
        }

        // for the new or the update object.
        $params = [
            'client_id'    => $params['client_id'],
            'user_id'      => isset($params['user_id']) ? $query['user_id'] : NULL,
            'code'         => isset($params['code']) ? $params['code'] : NULL,
            'access_token' => $access_token,
            'expires_in'   => isset($params['user_id']) ? Date::MONTH * 2 : Date::HOUR * 2,
            'grant_type'   => $params['grant_type'],
            'stage'        => isset($params['stage']) ? $params['stage'] : 'granted',
            'modified'     => time(),
        ];

        $return = $this->collection(true)->findAndModify([
            'query'         => $query,
            'update'        => $params,
            'new'           => true,
            'upsert'        => true
        ]);

        //print_r($return);

        $params = Arr::merge($return, $params);

        // keeping this here for future
//        $this->collection->ensureIndex(['user_id' => 1]);
//        $this->collection->ensureIndex(['client_id' => 1]);
//        $this->collection->ensureIndex(['access_token' => 1], ['unique' => 1]);

        return $this->stringify($params);
    }

    /**
     * Utility to check if a token expired.
     *
     * @param integer $expires the current expiry timestamp.
     * @return boolean
     */
    public static function expired($expires, $modified)
    {
        return (int) $expires + (int) $modified <= time();
    }

}