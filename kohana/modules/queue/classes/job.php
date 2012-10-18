<?php defined('SYSPATH') or die('No direct script access.');

/**
 * RTA Interface for Jobs.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.8
 * @subpackage Queue
 * @copyright 2011 Realtasia Pte Ltd
 */
class Job{
    /**
     * Returns a new Job_Add() instance to add a job to the queue
     *
     * @param string|MongoID $document_id
     * @param string $document_type
     * @param string|MongoID optional $user_id
     * */
    public static function add($doc_id, $doc_type, $user_id)
    {
        return new Job_Add($doc_id, $doc_type, $user_id);
    }

    public static function process($delivery = 'immediate')
    {
        $processor = 'Job_Processor' . strtolower(ucfirst($delivery));
        return new $processor(Model::factory('job')->get_next($delivery));
    }
}

?>
