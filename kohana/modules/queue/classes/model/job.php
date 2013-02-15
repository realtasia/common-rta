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
class Model_Job extends Document {

    public function get_next($delivery = 'immediate', $tries = 1)
    {
        try
        {
            return (object) $this->collection()->findAndModify([
                        'query' => [
                            'in_progress' => FALSE,
                            'delivery'    => $delivery,
                            'status'      => ['$gte' => $tries]
                        ],
                        'sort' => array('status' => 1),
                        'update' => array('$set' => array('in_progress' => TRUE)),
                        'upsert'      => FALSE,
                    ]);
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
        $this->atomic($job_id);
        $this->in_progress = FALSE;
        $this->status      = $status;
        $this->save();
        return TRUE;
    }

    public function check_exists($document_id)
    {

        try
        {
//            $this->load([
//                'document_id'   => parent::check_id($document_id),
//                'in_progress'   => FALSE,
//                'is_single'     => FALSE,
//            ]);
            $doc = $this->collection()->collection()->findAndModify([
                            'document_id'   => parent::check_id($document_id),
                            'in_progress'   => FALSE,
                            'is_single'     => FALSE,
                        ], ['$set' => ['in_progress' => TRUE]]);

            $_id = \Arr::get($doc, '_id');

            if($_id)
                $this->load($_id);

            return $this;
        } catch (MongoCursorException $e)
        {
            Debug::error('Error while checking for existing job :id -> :e', array(
                ':id' => $document_id,
                ':e'  => $e->getMessage()
            ));
        }

        return FALSE;
    }

    public function add_to_existing_queue($key, $message)
    {
        try
        {
            $this->in_progress = FALSE;
            $this->addToSet('messages.' . $key, $message);
            $this->save();
        } catch (MongoException $e)
        {
            Debug::error('Error adding to existing queue job:id status -> :e', array(
                ':id' => $job_id,
                ':e'  => $e->getMessage()
            ));

            return FALSE;
        }

        return $job_id;
    }

    public function add_to_queue($document)
    {
        $this->clear();
        try
        {
            $this->load_values($document);
            $this->save();
        } catch (MongoException $e)
        {
            Debug::error('Error adding a new job job :id status -> :e', array(
                ':id' => $document,
                ':e'  => $e->getMessage()
            ));

            return FALSE;
        }

        return $this->id;
    }

}