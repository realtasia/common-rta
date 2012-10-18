<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Mongo Job Model.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.8
 * @subpackage Model
 * @copyright 2011 Realtasia Pte Ltd
 */

/**
  Jobs
 * Document ID   -> MongoID,
 * Document Type  -> STRING,
 * In Progress -> BOOL TRUE/FALSE,
 * Status      -> INT 0 = Success, 1 = Pending, 2 = Failed,
  Messages (array)[
      Type (array) [
          (optional) User ID       -> MongoID,
          (optional) User Email    -> STRING,
          (optional) Mentionee Ids -> array,
          Date                     -> INT timestamp,
          Prority                  -> INT 1 = Lowest
      ]
  ]
 */
class Model_Job extends Model{


    public function get_next($delivery = 'immediate', $tries = 1)
    {
        $table = Inflector::plural($this->collname);
        $query = array(
            'in_progress' => FALSE,
            'delivery' => $delivery,
            'status' => array('$gte' => $tries)
        );
        try
        {
            $result = $this->db->command(
              array(
                 'findandmodify' => $table,
                 'query'         => $query,
                 'sort'          => array('status' => 1),
                 'update'        => array('$set' => array('in_progress' => (int) TRUE)),
                 'upsert'        => FALSE,
                 'limit'         => 1
              ));

            if(isset($result['value']))
                return (object) $result['value'];
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error retrieving next job to process -> :e', array(
               ':e' => $e->getMessage()
            ));
        }

        return FALSE;
    }

    public function update_status($job_id, $status)
    {
        $job_id = parent::check_id($job_id);
        try{
            $this->collection->update(
                  array('_id'  => $job_id),
                  array('$set' => array('in_progress' => (int) FALSE, 'status' => $status)),
                  array('safe' => TRUE)
            );
            return TRUE;
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error updating job:id status -> :e', array(
               ':id' => $job_id->__toString(),
               ':e' => $e->getMessage()
            ));
        }

        return FALSE;
    }


    public function check_exists($document_id, $document_type)
    {
        try
        {
            $jobitem = $this->db->command(
                  array(
                     'findandmodify' => 'jobs',
                     'query' => array(
                        'document_id' => parent::check_id($document_id),
                        'document_type' => $document_type,
                        'in_progress' => (int) FALSE,
                        'in_single' => (int) FALSE,
                     ),
                     'update' => array('$set' => array('in_progress' => (int) TRUE)),
                     'upsert' => FALSE,
                  ));
            if (isset($jobitem['value']))
                return $jobitem['value'];
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error while checking for existing job :id -> :e', array(
               ':id' => $document_id,
               ':e' => $e->getMessage()
            ));
        }

        return FALSE;
    }

    public function add_to_existing_queue($document_id, $message)
    {
        try
        {
            $this->collection->update(
                  array('document_id' => parent::check_id($document_id)), array('$set' => array('in_progress' => (int) FALSE), '$addToSet' => $message), array('safe' => TRUE)
            );
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error adding to existing queue job:id status -> :e', array(
               ':id' => $document_id,
               ':e' => $e->getMessage()
            ));

            return FALSE;
        }

        return $document_id;
    }

    public function add_to_queue($document)
    {
        try
        {
            $this->collection->save($document, array('safe' => TRUE));
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error adding a new job job :id status -> :e', array(
               ':id' => $document,
               ':e' => $e->getMessage()
            ));

            return FALSE;
        }

        return $document['_id'];
    }

}