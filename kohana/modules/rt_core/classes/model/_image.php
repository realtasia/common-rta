<?php defined('SYSPATH') or die('No direct access allowed.');

class Model_Image extends Model
{
    /*The S3 Bucket we're using*/
    protected $bucket = 'static2.realtasia.com.sg';

    /*the different thumbnail sizes that realtasia uses*/
    protected $_avatar_sizes = array(150, 90, 32);

    public function handle_media($files, $user, $component)
    {
        $user = $this->_get_user($user);
    }

    public function update_media(){}

    /**
     * This method handles user avatar uploads. Sets some defaults and then delegates
     * the avatar processing to the following process_avatar() method
     *
     * @param array $files the $_FILES array
     * @param MongoID|string|User Object $user either a mongoID, the stringed ID or the user itself
     * @uses self::process_avatar()
     * @return the results of process_avatar()
     */
    public function handle_uploaded_avatar($files, $user)
    {
        // we need a valid user object array
        if(!is_object($user))
            $user = (object) $this->_get_user($user);

        // verification of file
        if (!$verify = $this->verify_upload($files, 'file')->check())
        {
            Debug::error('the files array :files', array(':files' =>print_r($verify->errors(), TRUE)));
            return $verify->errors();
        }

        $file = array(
           // get the uploaded location
           'location' => $files['file']['tmp_name'],
           // the original name of the file
           'old_name' => $files['file']['name']
        );

        return $this->process_avatar($file, $user);
    }

    /**
     * This is the parent method that processes avatars. It then saves the results
     * using the save_user_info() method. Requires an array of defaults
     *<pre>
     * array(
     *      'location' => the physical location of the file. Can be URL,
     *      'old_name' => the original name or created name for creating unique filename
     * )
     *</pre>
     * @param array $file an array of defaults that it needs as described above
     * @param type $user
     * @return type
     */
    public function process_avatar($file, $user)
    {
        // create an instance of Image
        $avatar = Image::factory($file['location']);
        // create a unique filename
        $filename = self::unique_filename($file['old_name'], $user);

        // we can't work with images too big in size
        if($avatar->width > 900)
            $avatar->resize(900);

        // trying to put a file instead of the stream for cache to work on s3
        $metadata['body']  = $avatar->render();
        $metadata['contentType'] = $avatar->mime;

        //save local temp
        self::put($filename, $file['location']);

        // save to s3
        $insert_url = $this->saveS3($user->username, $filename, $metadata);

        // save the user avatar location
        if ($insert_url)
        {
            parent::factory('user')
                  ->collection
                  ->update(array('_id' => $user->_id), array(
                      '$addtoset' => array('avatar.uncropped' => $insert_url),
                      '$inc' => array('counts.attachments' => 1)
                  ));

            // extract metadata
            $image_info = get_object_vars($avatar); unset($image_info['type']);
            $media = Arr::merge($image_info, array(
                    'user_id' => $user->_id, 'file' => $filename,
                    'name' => $file['old_name'], 'url' => $insert_url,
                    'usage' => 'profile_picture'
             ));
            $media = $this->save_user_media($media);
        }
        return $media;
    }

    /**
     * This method takes the cropped dimensions of the avatar (if available) and
     * crops it and then subsequently saves the various resized versions of the
     * file for use throughout Realtasia. Requires an array with the following
     * <pre>
     * array(
     *      'user_id   => required string,
     *      'filename' => required file location to retrieve the file to process,
     *      // optional, crop dimensions
     *      'w' => INT, 'h' => INT, 'x' => INT, 'y' => INT
     * )
     * </pre>
     *
     * @param array $post_array required array of defaults
     * @return type
     */
    public function update_avatar($post_array)
    {
        // we need a valid user id
        $user_id  = Arr::get($post_array, 'user_id');
        // the location of the file
        $file     = Arr::get($post_array, 'file');
        // empty update array to update the db
        $u     = array();

        $image = Image::factory($file);
        $user = Model::factory('user')->get($user_id);

        if(isset($post_array['x']))
        {
            $image->crop($post_array['w'], $post_array['h'], $post_array['x'], $post_array['y']);
            $image->save();
        }

        foreach ($this->_avatar_sizes as $k => $size)
        {
            $i = clone $image;

            if($size == 150)
                $i->resize($size);
            else
                $i->resize($size, $size, Image::INVERSE);

            $new_filename = md5($user_id . uniqid()) . '.' . self::_extension($file);
            $metadata['body']  = $i->render(NULL, 90);
            $metadata['contentType'] = $i->mime;

            $url = $this->saveS3($user->username, $new_filename, $metadata);

            // save the user avatar location
            if ($url)
            {
                $u['avatar.'.$size] = $url;
            }
        }
        if(!empty($u))
        {
            //$u['avatar']['uncropped'] = $user->avatar['uncropped'];
            parent::factory('user')
                  ->collection
                  ->update(array('_id' => new MongoID($user_id)), array('$set' => $u));
            //return $this->_get_user($user_id);
        }

        unlink($file);
        return $this->_get_user($user_id);
    }

    /**
     * The actual method that saves processed images to S3. Sets cache control
     * headers and other required defaults for S3
     *
     * @param string $filename the new filename
     * @param array $metadata and array of extra information for the file
     * @param array $headers any possible extra headers to set
     * @return string the newly created URL of the file
     */
    public function saveS3($username, $filename, $metadata = array(), $headers = array())
    {
        $exp_time = strtotime("+2 years");
        $expires = $exp_time - time();
        $s3 = AWS::s3();

        $header = Arr::merge(array(
            'Expires' => date('D, d M Y H:i:s \G\M\T', $exp_time),
            'Cache-Control' => "max-age=$expires, public"
        ), $headers);

        $meta = Arr::merge(array(
            'body' => NULL,
            'contentType' => NULL,
            'acl' => $s3::ACL_PUBLIC,
            'headers' => $header
        ), $metadata);

        $new_filename = $username . '/' . $filename;

        try
        {
            $r = $s3->create_object($this->bucket, $new_filename, $meta);
        }
        catch (Exception $e)
        {
            return false;
        }

        return $r->isOK() ? $this->bucket . '/' . $new_filename : false;
    }

    /**
     * Method that sets defaults and saves a file to the db. Calls the attachment
     * model. The params are an array with defaults set to:
     *<pre>
     *  array(
     *      'user_id' => NULL, 'date' => time(), 'file' => NULL, 'name' => NULL,
     *      'url' => NULL, 'usage' => NULL, 'width' => 0, 'height' => 0, 'mime' => NULL
     *  );
     *</pre>
     * @param array $info
     * @return newly created document with id
     */
    public function save_user_media($info)
    {
        $default = array(
            'user_id' => NULL, 'date' => time(), 'file' => NULL, 'name' => NULL,
            'url' => NULL, 'usage' => NULL, 'width' => 0, 'height' => 0, 'mime' => NULL
        );

        // returns the original data with newly created id
        return parent::factory('attachment')->new_media(Arr::merge($default, $info));
    }

    /**
     * Utility method that creates a unique filename
     *
     * @param string the original filename
     * @param object an instantated user object
     * @return user object
     */
    public static function unique_filename($filename, $user)
    {
        $name = (string) new MongoID($user->username . uniqid());
        return $name . '.' . self::_extension($filename);
    }

    /**
     * Utility method that retrieves relevant information from the db
     *
     * @param string|MongoID $user the user id
     * @return user object
     */
    protected static function _get_user($user)
    {
        return parent::factory('user')->get_selective($user, array('username', 'avatar'));
    }

    /**
     * Utility method to retrieve the filetype based on the filename
     *
     * @param string $file the filename
     * @return the retrieved extension
     */
    protected static function _extension($file)
    {
        return pathinfo($file, PATHINFO_EXTENSION);
    }

    /**
     * Utility method that saves temp image to upload folder
     *
     * @param string $filename the filename
     * @param string|binary the location of the image or it's binary contents
     * @return the name of the file
     */
    public static function put($filename, $image)
    {
        $image = is_string($image) ? @file_get_contents($image) : $image;
        file_put_contents('upload/' . $filename, $image);
        return $filename;
    }

    /**
     * Utility method that validates upload
     *
     * @param array $files_array the $_FILES array
     * @return instance of the Validation object
     */
    protected static function verify_upload($files_array, $fieldname)
    {
        return Validation::factory($files_array)
            ->rules($fieldname, array(
                array('Upload::not_empty'),
                array('Upload::valid'),
                array('Upload::size', array(':value', '10M')),
                array('Upload::type', array(':value', array('jpg', 'png', 'gif', 'jpeg'))),
             )
        );
    }
}