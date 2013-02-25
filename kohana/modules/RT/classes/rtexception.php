<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Realtasia user notifications. Contains helper functions to aid in user
 * notifications
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Exception
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Rtexception extends Kohana_Kohana_Exception
{

    /**
     * Overriden to show custom page for 404 errors
     */
    public static function handler(Exception $e)
    {
        $mg = 'Sorry, there was an error accessing this page. Did you make a mistake? '.html::anchor('/', 'Go back').' to Realtasia';
        $view = new View('error/default');
        $view->message = $mg;
        $view->breadcrumbs = '';
        $view->menu = '';
        $view->sidebar = '&nbsp;';

        $response = new Response;

        if (is_object(Kohana::$log))
        {
            // Add this exception to the log
            Kohana::$log->add(Log::ERROR, array(self::text($e)));
            // Make sure the logs are written
            Kohana::$log->write();
        }
        switch (get_class($e))
        {
            case 'HTTP_Exception_404':
                $view->title = '404 Not Found';
                $response->status(404);
            break;
            case 'HTTP_Exception_403':
                $view->title = '403 Forbidden';
                $response->status(403);
            break;
            default:
                return Kohana_Kohana_Exception::handler($e);
        }

        echo $response->send_headers()->body($view);
        return true;
    }

    /**
     * Override if necessary.  E.g. below include logged in user's info in the log
     */
    public static function text(Exception $e)
    {
        $id = Auth::instance()->logged_in() ? Auth::instance()->get_user()->_id : '';

        return sprintf('[user: %s] %s [ %s ]: %s ~ %s [ %d ]', $id, get_class($e), $e->getCode(), strip_tags($e->getMessage()), Debug::path($e->getFile()), $e->getLine());
    }

}

?>
