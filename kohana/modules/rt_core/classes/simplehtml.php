<?php defined('SYSPATH') or die('No direct script access.');

/**
 * DOM parser
 * Controller.
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Controller
 * @version 0.8
 * @copyright 2011 Realtasia Pte Ltd
 * @link Kohana_Controller_Template
 */
class SimpleHTML extends DOM_SimpleHTML
{

    public static function file_get_html($url, $use_include_path = false, $context=null, $offset = -1, $maxLen=-1, $lowercase = true, $forceTagsClosed=true, $target_charset = DEFAULT_TARGET_CHARSET, $stripRN=true, $defaultBRText=DEFAULT_BR_TEXT)
    {
        // We DO force the tags to be terminated.
        $dom = new DOM_SimpleHTML(null, $lowercase, $forceTagsClosed, $target_charset, $defaultBRText);
        // For sourceforge users: uncomment the next line and comment the retreive_url_contents line 2 lines down if it is not already done.
        $contents = file_get_contents($url, $use_include_path, $context, $offset);
        // Paperg - use our own mechanism for getting the contents as we want to control the timeout.
//    $contents = retrieve_url_contents($url);
        if (empty($contents))
        {
            return false;
        }
        // The second parameter can force the selectors to all be lowercase.
        $dom->load($contents, $lowercase, $stripRN);
        return $dom;
    }

// get html dom from string
    public static function str_get_html($str, $lowercase=true, $forceTagsClosed=true, $target_charset = DEFAULT_TARGET_CHARSET, $stripRN=true, $defaultBRText=DEFAULT_BR_TEXT)
    {
        $dom = new DOM_SimpleHTML(null, $lowercase, $forceTagsClosed, $target_charset, $defaultBRText);
        if (empty($str))
        {
            $dom->clear();
            return false;
        }
        $dom->load($str, $lowercase, $stripRN);
        return $dom;
    }

// dump html dom tree
    public static function dump_html_tree($node, $show_attr=true, $deep=0)
    {
        $node->dump($node);
    }

}