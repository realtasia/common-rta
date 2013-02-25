<?php defined('SYSPATH') or die('No direct script access.');
/**
 * 
 * @author Jason Nathan
 * @category Helpers
 * @package RT_Log
 * @subpackage Mongo
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Log_Mongo extends Log_Writer {

    public function write(array $messages)
    {
        $m = Model::factory('log')->collection;
        $r = Request::current();
        foreach($messages as $message)
        {
            $m->insert($message);
//            Email::factory('Beta ERROR!', Debug::vars($message, $r), 'text/html')
//                  ->to('support@realtasia.com', 'Jason Nathan')
//                  ->from('support@realtasia.com', 'Jason Nathan')
//                  ->send();
        }

        return;
    }
}
