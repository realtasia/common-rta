<?php

class Model_Useradmin_User extends Model_Auth_User {

    protected $_primary_key = 'ID';
   //protected $_table_name = 'wp_users';
   
   /**
    * A user has many tokens and roles
    *
    * @var array Relationhips
    */
   protected $_has_many = array(
      // auth
      'roles' => array('through' => 'roles_users'),
      'tokens' => array(),
      // for facebook / twitter / google / yahoo identities
      'user_identity' => array(),
      );
   protected $_has_one= array(
      );
   protected $_password_column = array('column' => 'user_pass');
   protected $_created_column = array('column' => 'user_registered', 'format' => 'Y-m-d H:i:s');
   protected $_username_column = array('column' => 'user_login');
   //protected $_updated_column = array('column' => 'modified', 'format' => 'Y-m-d H:i:s');

   /**
    * Rules for the user model. Because the user_pass is _always_ a hash
    * when it's set,you need to run an additional not_empty rule in your controller
    * to make sure you didn't hash an empty string. The user_pass rules
    * should be enforced outside the model or with a model helper method.
    *
    * @return array Rules
    * @see Model_Auth_User::rules
    */
   public function rules()
   {
      $parent = parent::rules();
      // fixes the min_length user_login value
      $parent['user_login'][1] = array('min_length', array(':value', 1));
      return $parent;
   }

   // TODO overload filters() and add user_login/created_on/updated_on coluns filters

   /**
    * Password validation for plain user_passs.
    *
    * @param array $values
    * @return Validation
    * @see Model_Auth_User::get_user_pass_validation
    */
   public static function get_user_pass_validation($values) {
      return Validation::factory($values)
         ->rule('user_pass', 'min_length', array(':value', 6))
         ->rule('user_pass_confirm', 'matches', array(':validation', ':field', 'user_pass'));
   }

   /**
    * Generates a user_pass of given length using mt_rand.
    * @param int $length
    * @return string
    */
   function generate_user_pass($length = 8) {
      // start with a blank user_pass
      $user_pass = "";
      // define possible characters (does not include l, number relatively likely)
      $possible = "123456789abcdefghjkmnpqrstuvwxyz123456789";
      $i = 0;
      // add random characters to $user_pass until $length is reached
      while ($i < $length) {
         // pick a random character from the possible ones
         $char = substr($possible, mt_rand(0, strlen($possible)-1), 1);

         $user_pass .= $char;
         $i++;

      }
      return $user_pass;
   }

   /**
    * Transcribe name to ASCII
    * @param string $string
    * @return string
    */
   function transcribe($string) {
    $string = strtr($string,
       "\xA1\xAA\xBA\xBF\xC0\xC1\xC2\xC3\xC5\xC7\xC8\xC9\xCA\xCB\xCC\xCD\xCE\xCF\xD0\xD1\xD2\xD3\xD4\xD5\xD8\xD9\xDA\xDB\xDD\xE0\xE1\xE2\xE3\xE5\xE7\xE8\xE9\xEA\xEB\xEC\xED\xEE\xEF\xF0\xF1\xF2\xF3\xF4\xF5\xF8\xF9\xFA\xFB\xFD\xFF\xC4\xD6\xE4\xF6",
        "_ao_AAAAACEEEEIIIIDNOOOOOUUUYaaaaaceeeeiiiidnooooouuuyyAOao");
    $string = strtr($string, array("\xC6"=>"AE", "\xDC"=>"Ue", "\xDE"=>"TH", "\xDF"=>"ss",  "\xE6"=>"ae", "\xFC"=>"ue", "\xFE"=>"th"));
    $string = preg_replace("/([^a-z0-9\.]+)/", "", strtolower($string));
    return($string);
   }

   /**
    * Given a string, this function will try to find an unused user_login by appending a number.
    * Ex. user_login2, user_login3, user_login4 ...
    *
    * @param string $base
    */
   function generate_user_login($base = '') {
      $base = $this->transcribe($base);
      $user_login = $base;
      $i = 2;
      while($this->user_login_exist($user_login)) {
         $user_login = $base.$i;
         $i++;
      }
      return $user_login;
   }

   /**
    * Check whether a user_login exists.
    * @param string $user_login
    * @return boolean
    */
   public function user_login_exist($user_login) 
   {
      return ( (bool) $this->unique_key_exists( $user_login, 'user_login') ) ;
   }
   
    /**
     * Allows a model use both email and username as unique identifiers for login
     *
     * @param   string  unique value
     * @return  string  field name
     */
    public function unique_key($value)
    {
        return Valid::email($value) ? 'user_email' : 'user_login';
    }   

}
