<?php defined('SYSPATH') or die('No direct access allowed.');
/**
 * ORM Auth driver extended for Useradmin module support.
 *
 * @package    Useradmin/Auth
 * @author     Gabriel R. Giannattasio
 */
class Useradmin_Auth_ORM extends Kohana_Auth_ORM implements Useradmin_Driver_iAuth {
        
	/**
	 * Extends the Kohana Auth ORM driver to give useradmin module extras
	 * @see Kohana_Auth_ORM::_login()
	 */
     
   protected $_password_column = array('column' => 'user_pass');
   protected $_created_column = array('column' => 'user_registered', 'format' => 'Y-m-d H:i:s');
   protected $_username_column = array('column' => 'user_login');     
   protected $_email_column = array('column' => 'user_email');     
     
	protected function _login($user, $user_pass, $remember) 
	{
        if ( ! is_object($user))
        {
            $username = $user;

            // Load the user
            $user = Model::factory('user');
            $user->where($user->unique_key($username), '=', $username)->find();
        }

        // If the passwords match, perform a login
        if ($user->has('roles', ORM::factory('role', array('name' => 'login'))) AND $user->user_pass === $user_pass)
        {
            if ($remember === TRUE)
            {
                // Token data
                $data = array(
                    'user_id'    => $user->id,
                    'expires'    => time() + $this->_config['lifetime'],
                    'user_agent' => sha1(Request::$user_agent),
                );

                // Create a new autologin token
                $token = ORM::factory('token')
                            ->values($data)
                            ->create();

                // Set the autologin cookie
                Cookie::set('authautologin', $token->token, $this->_config['lifetime']);
            }

            // Finish the login
            $this->complete_login($user);

            return TRUE;
        }

        // Login failed
        return FALSE;
	}
	
	/**
	 * Register a single user
	 * Method to register new user by Useradmin Auth module, when you set the
	 * fields, be sure they must respect the driver rules
	 * 
	 * @param array $fields An array witch contains the fields to be populate
	 * @returnboolean Operation final status
	 * @see Useradmin_Driver_iAuth::register()
	 */
	public function register($fields) 
	{
		if( ! is_object($fields) ) 
		{
			// Load the user
			$user = Model::factory('user');
		} 
		else 
		{
			// Check for instanced model
			if( $fields instanceof Model_User ) 
			{
				$user = $fields;
			} 
			else 
			{ 
				throw new Kohana_Exception('Invalid user fields.');
			}
		}
		try 
		{
			$user->create_user($fields, array(
				'user_login',
				'user_pass',
				'user_email',
			));
         // Add the login role to the user (add a row to the db)
         $login_role = new Model_Role(array('name' =>'login'));
         $user->add('roles', $login_role);
		} 
		catch (ORM_Validation_Exception $e) 
		{
			throw $e;
			return FALSE;
		}
		return TRUE;
	}
	
	/**
	 * Unegister multiple users
	 * Method to unregister existing user by Useradmin Auth module, when you set the
	 * Model_User reference for removing a user.
	 * 
	 * @param mixed $users An array witch contains the Model_User or a array of Model_User
	 * @return void
	 * @see Useradmin_Driver_iAuth::unregister()
	 */
	public function unregister ($users)
	{
		if( ! is_array($users))
			$users = array($users);
		
		foreach ($users as $user)
		{
			if($user instanceof Model_User) 
			{
				try 
				{
					$user->delete();
				} 
				catch (ORM_Validation_Exception $e) 
				{
					throw $e;
				}
			}
			elseif( ! is_null($user) )
			{
				throw new Kohana_Exception("Invalid argument, must be instance of Model_User or array() containing Model_User's");
			}
		}
	}
    
    /**
     * Complete the login for a user by incrementing the logins and setting
     * session data: user_id, username, roles.
     *
     * @param   object  user ORM object
     * @return  void
     */
    protected function complete_login($user)
    {
        // Regenerate session_id
        $this->_session->regenerate();

        // Store username in session
        $this->_session->set( Kohana::$config->load('auth.session_key'), $user );

        return TRUE;
    }

}