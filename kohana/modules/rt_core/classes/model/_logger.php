<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Mongo Logger Model.
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.8
 * @subpackage Model
 * @copyright 2011 Realtasia Pte Ltd
 */
class Model_Logger extends Model{

    /**
     * Just save the message for now. Safe is defaulting to false. Ideal for logs
     *
     *
     * @param type $message
     * @return void
     */
    public function save($message)
    {
        return $this->collection->insert($message);
    }

    /**
     * Logger does not need any recursion. adding it here for sanity's sake.
     * Should possibly implement an interface Model.
     */
    protected function _recurse($object = TRUE)
    {
        // we check if the cursor is valid
        if (is_object($this->cursor))
        {
            return iterator_to_array($this->cursor);
        }
    }

}