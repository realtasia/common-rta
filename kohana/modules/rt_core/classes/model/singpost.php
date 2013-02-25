<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Interaction model. MongoDB awesomeness
 * Schema:
 *      object_type => post|page|user|comment,
 *      object_id   => MongoID
 *      user        =>
 *          _id         => MongoID (retrieved from public static variable user_id),
 *          name        => The name of the user, for ease.
 *
 * @author Jason Nathan
 * @category Realtasia
 * @package RT_Document
 * @subpackage Singpost
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Model_Singpost extends Document {

}