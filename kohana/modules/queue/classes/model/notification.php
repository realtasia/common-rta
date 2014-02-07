<?php defined('SYSPATH') or die('No direct script access.');

/**
 * RTA Queue Model.
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package Queue
 * @subpackage Model_Notification
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */

class Model_Notification extends Document {

    /**
     * The job got sent successfully
     */
    const SUCCESS = 0;
    /**
     * The job is pending.
     */
    const PENDING = 1;
    /**
     * The job failed.
     */
    const FAILED = 2;


    /**
     * Get the next job in the line to process...
     *
     * @param string $delivery
     * @param INT $tries
     * @return mixed
     */
    public function get_next_email($delivery = 'immediate', $tries = self::PENDING)
    {
//        $this->collection()->deleteIndexes();
        $this->collection()->ensureIndex([
            'emailed' => 1,
        ]);
        $this->collection()->ensureIndex([
            'notified' => 1
        ]);
        $this->collection()->ensureIndex([
            'receipient_id' => 1
        ]);		
        try
        {
            $result = $this->collection()->collection()->findAndModify([
                'emailed' 	  => ['$gte' => $tries],
            ], [
                '$set' => ['in_progress' => TRUE]
            ], null, [
                'sort'   => ['emailed' => 1],
            ]);
			
			if($result)
			{
				$this->load_values($result);
				$this->load();
				return $this;				
			}
			
			return false;
			
        }
        catch (MongoCursorException $e)
        {
            Debug::error('Error retrieving next job to process -> :e', array(
                ':e' => $e->getMessage()
            ));
        }

        return FALSE;
    }
	
	public function count_unread_notifications($user_id)
	{
		$user_id = parent::check_id($user_id);
		
		return $this->collection()->find([
			'receipient_id' => $user_id,
			'notified' => ['$gte' => self::PENDING]
		])->count();
		
	}

    /**
     * Update a Notification's emailed flag
     *
     * @param INT $status
     * @return \Model_Job|boolean
     */
    public function update_emailed_status($status = self::SUCCESS)
    {
        return $this->update_status("emailed", $status);
    }
	
    /**
     * Update a Notification's notification flag
     *
     * @param INT $status
     * @return \Model_Job|boolean
     */
    public function update_notification_status($status = self::SUCCESS)
    {
        return $this->update_status("notified", $status);
    }
	
	protected function update_status($type = "emailed", $status = self::SUCCESS)
	{
        $this->in_progress = FALSE;
        $this->{$type}     = $status;
        if($this->save());
            return $this;

        return false;
	}
	
}