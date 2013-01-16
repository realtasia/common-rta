<?php defined('SYSPATH') OR die('No direct access allowed.');
/**
 * Test the user module extension for auth singleton
 *
 * @group modules
 * @group modules.useradmin
 * @group modules.useradmin.auth
 * 
 * @package    Useradmin
 * @category   Tests
 * @author     Gabriel R. Giannattasio
 * @author     gabrielgiannattasio <gabriel@l6.com.br>
 * @copyright  (c) 2011-2011 Fleep.me
 */
class UserTests extends Unittest_TestCase {

	const dbConnection = "unittest";
	
	/**
	 * Configure database for test
	 */
	static public function useTestDB() 
	{
		Kohana::$config->load('database')->set( "default", Kohana::$config->load('database.'.UserTests::dbConnection) );
	}
	
	/**
	 * Populate Schema
	 * Exec the file from tests/data if founded
	 * @param string $schema SQL Schema file, without extension.
	 */
	static public function runSchema($schema)
	{
		$testDb = Kohana::$config->load('database.default');

		// Try define the path for the schema if connection config exists
		if( ( ! is_null($testDb) ) && ($path = Kohana::find_file('tests', 'data/'.$schema, 'sql')) )
		{
			$command = "-u{$testDb['connection']['user_login']} -p{$testDb['connection']['password']} {$testDb['connection']['database']}";
			// Set the default database to test connection
			return (exec("mysql $command < $path "))?TRUE:FALSE;
		}
		return FALSE;
	}
	
	public function setUp() 
	{	
		parent::setUp();
		UserTests::useTestDB();
	}
	
	static public function setUpBeforeClass()
	{
		UserTests::useTestDB();
		UserTests::runSchema( "clean-setup" );
	}
	
	/**
	 * Valid users Provider
	 */
	public function providerValidUsers() 
	{
		return array(
			// Basic user_login
			array(array(
				"user_login" => "validuser",
				"password" => "123456",
				"password_confirm" => "123456",
				"email" => "valid@user.com",
			)),
			// Caps user_login
			array(array(
				"user_login" => "MyOwnUser",
				"password" => "ab38cab38c",
				"password_confirm" => "ab38cab38c",
				"email" => "MyOwn@User.com",
			)),
			// Underline user_login
			array(array(
				"user_login" => "separate_user",
				"password" => "verylongpasswordwith@chars!dix97",
				"password_confirm" => "verylongpasswordwith@chars!dix97",
				"email" => "separate@User.com",
			)),
			// Single char user_login
			array(array(
				"user_login" => "a",
				"password" => "verylongpasswordwith@chars!dix97",
				"password_confirm" => "verylongpasswordwith@chars!dix97",
				"email" => "a@User.com",
			)),
		);
	}
	
	/**
	 * Valid user updates Provider
	 */
	public function providerValidUserUpdates()
	{
		return array(
			// #0: Update email
			array(
				// login
				array(
					"user_login" => "validuser",
					"password" => "123456",
				), 
				// fields
				array(
					"user_login" => "validuser",
					"email" => "valid_changed@user.com",
				),
			),
			// #1: Update user_login
			array(
				// login
				array(
					"user_login" => "validuser",
					"password" => "123456",
				), 
				// fields
				array(
					"user_login" => "validuser_changed",
					"email" => "valid_changed@user.com",
				),
			),
			// #2: Update password
			array(
				// login
				array(
					"user_login" => "validuser_changed",
					"password" => "123456",
				), 
				// fields
				array(
					"password" => "123456789",
					"password_confirm" => "123456789",
				),
			),
			// #3: Update nothing
			array(
				// login
				array(
					"user_login" => "validuser_changed",
					"password" => "123456789",
				), 
				// fields
				array(
				),
			),
			// Loop
		);
	}
	
	/**
	 * Invalid user updates Provider
	 */
	public function providerInvalidUserUpdates()
	{
		return array(
			// #0: Short password
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"password" => "12345",
					"password_confirm" => "12345",
				),
			),
			// #1: Wrong password confirmation
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"password" => "123456",
					"password_confirm" => "654321",
				),
			),
			// #2: Used user_login
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "A",
				),
			),
			// #3: Used email
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"email" => "a@User.com",
				),
			),
			// #4: Username with spaces
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "name with spaces",
				),
			),
			// #5: Username with invalid char
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "name with spaces",
				),
			),
			// #6: Blank user_login
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "",
				),
			),
			// #7: Too long user_login
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "anamewithtoomanycharacterscantwork",
				),
			),
			// #8: Invalid e-mail
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"email" => "anamewithtoo@manychar@aar.sck",
				),
			),
			// #9: Used user_login with space
			array(
				// login
				array(
					"user_login" => "MyOwnUser",
					"password" => "ab38cab38c",
				), 
				// fields
				array(
					"user_login" => "A ",
				),
			),
			// Loop
		);
	}
	
	/**
	 * Invalid users Provider
	 */
	public function providerInvalidUsers() 
	{
		return array(
			// Userame with spaces
			array(array(
				"user_login" => "name with spaces",
				"password" => "123456789",
				"password_confirm" => "123456789",
				"email" => "email with spaces@user.com",
			)),
			// Userame with a invalid char
			array(array(
				"user_login" => "namewith@char",
				"password" => "ab38cab38c",
				"password_confirm" => "ab38cab38c",
				"email" => "namewith@char@User.com",
			)),
			// Blank user_login
			array(array(
				"user_login" => "",
				"password" => "verylongpasswordwith@chars!dix97",
				"password_confirm" => "verylongpasswordwith@chars!dix97",
				"email" => "@User.com",
			)),
			// Too long user_login
			array(array(
				"user_login" => "anamewithtoomanycharacterscantwork",
				"password" => "verylongpasswordwith@chars!dix97",
				"password_confirm" => "verylongpasswordwith@chars!dix97",
				"email" => "anamewithtoomanycharacterscantwork@User.com",
			)),
			// No password
			array(array(
				"user_login" => "validuser_login2",
				"password" => "",
				"password_confirm" => "",
				"email" => "validuser_login2@User.com",
			)),
			// No confirm password
			array(array(
				"user_login" => "validuser_login3",
				"password" => "123456789",
				"password_confirm" => "",
				"email" => "validuser_login3@User.com",
			)),
			// Diferent confirm password
			array(array(
				"user_login" => "validuser_login4",
				"password" => "123456789",
				"password_confirm" => "987654321",
				"email" => "validuser_login4@User.com",
			)),
			// Too short Password
			array(array(
				"user_login" => "validuser_login6",
				"password" => "12345",
				"password_confirm" => "12345",
				"email" => "validuser_login6@User.com",
			)),
			// Invalid e-mail
			array(array(
				"user_login" => "validuser_login5",
				"password" => "123456789",
				"password_confirm" => "987654321",
				"email" => "validu@sername5@User.com",
			)),
			// Already registred user with diferente case
			array(array(
				"user_login" => "A",
				"password" => "123456789",
				"password_confirm" => "123456789",
				"email" => "a_new@User.com",
			)),
		);
	}
	
	/**
	 * test if auth exists
	 * @author Gabriel Giannattasio
	 * @test
	 */
	public function test_if_auth_exists()
	{
		$this->assertTrue( class_exists("Auth"), 'Auth class not found' );
	} // test if auth is a class
		
	/**
	 * test auth register user
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerValidUsers
	 * @depends test_if_auth_exists
	 */
	public function test_auth_register_valid_users( $fields )
	{
		UserTests::useTestDB();
		$this->assertTrue( Auth::instance()->register($fields), 'Must be a valid user.');
	}
	
	/**
	 * test auth register invalid users
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerInvalidUsers
	 * @depends test_if_auth_exists
	 */
	public function test_auth_register_invalid_users( $fields )
	{
		try 
		{
			$status = Auth::instance()->register($fields);
		} 
		catch (ORM_Validation_Exception $e) 
		{
			$status = FALSE;
		}
		
		$this->assertFalse( $status, 'Must be a invalid user.');
	}
	
	/**
	 * test auth register invalid fields
	 * @author Gabriel Giannattasio
	 * @test
	 * @depends test_if_auth_exists
	 * @expectedException ErrorException
	 */
	public function test_auth_register_invalid_fields()
	{
		$this->assertFalse( Auth::instance()->register(NULL), 'Must be a invalid field user.');
	}
	
	/**
	 * test auth valid logins and logout
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerValidUsers
	 * @depends test_auth_register_valid_users
	 */
	public function test_auth_valid_logins_and_logout( $fields )
	{
		$this->assertTrue( Auth::instance()->logout(TRUE, TRUE), "Force logout all" );
		$this->assertTrue( Auth::instance()->login( $fields['user_login'], $fields['password']) , "Check login using user_login");
		$this->assertTrue( Auth::instance()->login( $fields['email'], $fields['password']) , "Check login using email");
		// Get the user model
		$user = Auth::instance()->get_user();
		$this->assertInstanceOf("Model_User", $user, "Checking the Model_User instance");
		$this->assertSame($fields['user_login'], $user->user_login, "Check the logedin user_login");
		$this->assertTrue( Auth::instance()->logout() );
	}
	
	/**
	 * test auth valid logins and update_user
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerValidUserUpdates
	 * @depends test_auth_register_valid_users
	 */
	public function test_auth_valid_logins_and_update_user( $login, $fields )
	{
		$this->assertTrue( Auth::instance()->logout(TRUE, TRUE), "Force logout all" );
		$this->assertTrue( Auth::instance()->login( $login['user_login'], $login['password']), "Do the login" );
		$user = Auth::instance()->get_user();
		try 
		{
			$user->update_user( $fields, array(
				'user_login',
				'user_pass',
				'user_email',
			) );
			$status = TRUE;
		} 
		catch (ORM_Validation_Exception $e) 
		{
			$status = FALSE;
		}
		
		$this->assertTrue( $status, "Do the user update");
	}
	
	/**
	 * test auth valid logins and invalid update_user
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerInvalidUserUpdates
	 * @depends test_auth_register_valid_users
	 */
	public function test_auth_valid_logins_and_invalid_update_user( $login, $fields )
	{
		$this->assertTrue( Auth::instance()->logout(TRUE, TRUE), "Force logout all" );
		$this->assertTrue( Auth::instance()->login( $login['user_login'], $login['password']), "Do the login" );
		$user = Auth::instance()->get_user();
		try 
		{
			$user->update_user( $fields, array(
				'user_login',
				'user_pass',
				'user_email',
			) );
			$status = TRUE;
		} 
		catch (ORM_Validation_Exception $e) 
		{
			$status = FALSE;
		}
		
		$this->assertFalse( $status, "Do the user update");
	}
	
	/**
	 * test auth invalid logins and logout
	 * @author Gabriel Giannattasio
	 * @test
	 * @dataProvider providerInvalidUsers
	 * @depends test_auth_register_invalid_users
	 */
	public function test_auth_invalid_logins_and_logout( $fields )
	{
		$this->assertTrue( Auth::instance()->logout(TRUE, TRUE), "Force logout all" );
		$this->assertFalse( Auth::instance()->login( $fields['user_login'], $fields['password']), "Check login using user_login" );
		$this->assertFalse( Auth::instance()->login( $fields['email'], $fields['password']), "Check login using email" );
		$this->assertFalse( Auth::instance()->get_user(), "get_user must fail.");
		$this->assertTrue( Auth::instance()->logout() );
	}
	
	/**
	 * test auth login jail
	 * @author Gabriel Giannattasio
	 * @test
	 * @depends test_auth_register_valid_users
	 */
	public function test_auth_login_jail()
	{
		$this->assertTrue( Auth::instance()->logout(TRUE, TRUE), "Force logout all" );
		$validUser = $this->providerValidUsers();
		// Must fail 5 times before jail the user for 5 minutes
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], "*********"), "Check login using wrong password #1" );
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], "*********"), "Check login using wrong password #2" );
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], "*********"), "Check login using wrong password #3" );
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], "*********"), "Check login using wrong password #4" );
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], "*********"), "Check login using wrong password #5" );
		// Try to login with the correct password must fail
		$this->assertFalse( Auth::instance()->login( $validUser[2][0]['user_login'], $validUser[2][0]['password']), "Check login using correct password" );
	}
	
	/**
	 * test auth delete loged user
	 * @author Gabriel Giannattasio
	 * @test
	 */
	public function test_auth_delete_loged_user()
	{
		$validUser = $this->providerValidUserUpdates();
		$this->assertTrue( Auth::instance()->login( $validUser[3][0]['user_login'], $validUser[3][0]['password']), "Do the login" );
		$this->assertInstanceOf("Model_User", $user = Auth::instance()->get_user(), "Get Model_User instance form Auth");
		$this->assertNull( Auth::instance()->unregister($user), "Delete the loged user");
		$this->assertNull( Auth::instance()->logged_in(), "The user was deleted, why this isn't Null?");
	}
	
	/**
	 * test auth delete multiple users
	 * @author Gabriel Giannattasio
	 * @test
	 * @depends test_auth_delete_loged_user
	 */
	public function test_auth_delete_multiple_users()
	{
		$validUsers = $this->providerValidUsers();
		array_pop($validUsers);
		array_shift($validUsers);
		array_walk ($validUsers, function(&$user)
		{
			$user_login = $user[0]['user_login'];
			$user = new Model_User();
			$user->where("user_login","=", $user_login)
				 ->find();
		});
		$this->assertNull( Auth::instance()->unregister($validUsers), "Delete the users in array");
		foreach ($validUsers as $user)
		{
			$this->assertFalse( $user->loaded(), "Ok, so you think the user was deleted? think again!");
		}
	}
}