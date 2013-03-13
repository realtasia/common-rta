<?php defined('SYSPATH') or die('No direct script access.');
/**
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Mongo_Document
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Document extends Mongo_Document {

    use Trait_Oauth2_Utils;

    /**
     *
     * @var mixed MongoID || string. Used if a record(s) is retrieved for an
     * authenticated user. Some methods will check for interactions.
     */
    protected $_user_id;

    /**
     *
     * @var array This field is used in most document schemas
     */
    protected static $counts = array(
        'attachments'  => 0,
        'comments'     => 0,
        'events'       => 0,
        'likers'       => 0,
        'listings'     => 0,
        'posts'        => 0,
        'subscribers'  => 0,
        'testimonials' => 0,
    );

    /**
     * shorthand for findOne
     *
     * @param array|string $params
     * @param boolean $object
     * @return MongoDocument|object
     */
    public function get($params, array $fields = [], $object = TRUE)
    {
        if ($this->load($params, $fields))
        {
            $ret = $this->stringify($this->as_array());
            return $object ? (object) $ret : $ret;
        }

        return $object ? (object) [] : [];
    }

    /**
     * I should have just stuck to using the official mongo driver. This is a
     * method that changes the values of the fields in a loaded document.
     * Hacky but works.
     *
     * Dot(.) notation allowed
     *
     * // returns Document[settings][privacy][something][else] = NULL;
     * $this->modify('settings.privacy.something.else', NULL)
     *
     * @param string $key
     * @param mixed $value
     */
    public function modify($key, $value)
    {
        // a method I wrote in Arr class
        $object = Arr::delim_to_multi([$key           => $value]);
        $this->_object = Arr::merge($this->_object, $object);
    }

    /**
     * Does the same as __construct except that we don't have to construct.
     * Colin's library is pissing me off.
     *
     * @param mixed $id
     */
    public function atomic($id)
    {
        if ($id !== NULL)
        {
            if (is_array($id))
            {
                foreach ($id as $key => $value)
                {
                    $this->_object[$this->get_field_name($key)] = $value;
                }
            }
            else
            {
                $this->_object['_id'] = $this->_cast('_id', $id);
            }
        }
    }

    /**
     * Catches the Mongo Exceptions and logs it.
     *
     * @param boolean $safe
     * @return boolean
     */
    public function save($safe = TRUE)
    {
        try
        {
            parent::save($safe);
        } catch (MongoException $e)
        {
            Debug::error('Error: :e with values :v', [
                ':e' => $e->getMessage(),
                ':v' => print_r($this->as_array(), TRUE),
            ]);

            return false;
        }

        return true;
    }

    /**
     * Utility to cast array values to a certain type.
     *
     * @param array $array
     * @param string $type can be UPPER, BOOL or INT currently
     * @return array
     */
    public function typecast(array $array, $type)
    {
        foreach ($array as $key => $value)
        {
            if (is_array($value))
            {
                $array[$key] = $this->typecast($value, $type);
            }
            else
            {
                switch ($type)
                {
                    case 'bool' :
                        if (is_numeric($value))
                        {
                            $array[$key] = (bool) $value;
                        }
                        break;
                    case 'int' :
                        if (is_numeric($value))
                        {
                            $array[$key] = (int) $value;
                        }
                        break;
                    case 'upper' :
                        $array[$key] = strtoupper((string) $value);
                        break;
                    default :
                        $array[$key] = $value;
                        break;
                }
            }
        }
        return $array;
    }

    /**
     * Testing revealed that can't query the DB with string IDs if it isn't an
     * index. Utility to ensure all _ids are in fact instances of the MongoID object.
     *
     * @todo Consider DBRefs??
     *
     *
     * @param string|MongoID $id
     * @return type
     */
    public static function check_id($val)
    {
        if($val instanceof MongoID)
            return $val;

        if(is_string($val) && strlen($val) === 24)
        {
            $id = new MongoID($val);
        }
        return ((string) $id === $val) ? $id : $val;
    }

    /**
     * Just to ensure that the plural versions of an object tallies with their
     * respective count fields and subarrays
     *
     * @param string $type
     */
    protected static function plural($type)
    {
        switch ($type)
        {
            case 'wallpost': return 'posts';
            case 'testimonial': return 'testimonials';
            case 'message': return 'messages';
            case 'checkin': return 'checkins';
            case 'event': return 'events';
            case 'user': return 'users';
            case 'page': return 'pages';
            case 'location': return 'locations';
            case 'agency': return 'agencies';
            case 'comment': return 'comments';
            case 'attachment': return 'attachments';
            case 'like': return 'likes';
            case 'liker': return 'likers';
            case 'subscribe': return 'subscribes';
            case 'subscriber': return 'subscribers';
        }
    }
}
