<?php defined('SYSPATH') or die('No direct script access.');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 5.2.4 or newer
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the Open Software License version 3.0
 *
 * This source file is subject to the Open Software License (OSL 3.0) that is
 * bundled with this package in the files license.txt / license.rst. It is
 * also available through the world wide web at this URL:
 * http://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to obtain it
 * through the world wide web, please send an email to
 * licensing@ellislab.com so we can send you a copy immediately.
 *
 * @package CodeIgniter
 * @author EllisLab Dev Team
 * @copyright Copyright (c) 2008 - 2013, EllisLab, Inc. (http://ellislab.com/)
 * @license http://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @link http://codeigniter.com
 * @since Version 1.0
 * @filesource
 */

/**
 * CodeIgniter Text Helpers
 *
 * @package CodeIgniter
 * @subpackage Helpers
 * @category Helpers
 * @author EllisLab Dev Team
 * @link http://codeigniter.com/user_guide/helpers/text_helper.html
 */
class Text extends Kohana_Text{

    /**
     * High ASCII to Entities
     *
     * Converts high ASCII text and MS Word special characters to character entities
     *
     * @param string $str
     * @return string
     */
    public static function ascii_to_entities($str)
    {
        $out = '';
        for ($i = 0, $s = mb_strlen($str), $count = 1, $temp = array(); $i < $s; $i++)
        {
            $ordinal = ord($str[$i]);

            if ($ordinal < 128)
            {
                /*
                  If the $temp array has a value but we have moved on, then it seems only
                  fair that we output that entity and restart $temp before continuing. -Paul
                 */
                if (count($temp) === 1)
                {
                    $out .= '&#' . array_shift($temp) . ';';
                    $count = 1;
                }

                $out .= $str[$i];
            }
            else
            {
                if (count($temp) === 0)
                {
                    $count = ($ordinal < 224) ? 2 : 3;
                }

                $temp[] = $ordinal;

                if (count($temp) === $count)
                {
                    $number = ($count === 3) ? (($temp[0] % 16) * 4096) + (($temp[1] % 64) * 64) + ($temp[2] % 64) : (($temp[0] % 32) * 64) + ($temp[1] % 64);

                    $out .= '&#' . $number . ';';
                    $count = 1;
                    $temp  = array();
                }
            }
        }

        return $out;
    }

    /**
     * Entities to ASCII
     *
     * Converts character entities back to ASCII
     *
     * @param string
     * @param bool
     * @return string
     */
    public static function entities_to_ascii($str, $all = TRUE)
    {
        if (preg_match_all('/\&#(\d+)\;/', $str, $matches))
        {
            for ($i = 0, $s = count($matches[0]); $i < $s; $i++)
            {
                $digits = $matches[1][$i];
                $out    = '';

                if ($digits < 128)
                {
                    $out .= chr($digits);
                }
                elseif ($digits < 2048)
                {
                    $out .= chr(192 + (($digits - ($digits % 64)) / 64)) . chr(128 + ($digits % 64));
                }
                else
                {
                    $out .= chr(224 + (($digits - ($digits % 4096)) / 4096))
                            . chr(128 + ((($digits % 4096) - ($digits % 64)) / 64))
                            . chr(128 + ($digits % 64));
                }

                $str = str_replace($matches[0][$i], $out, $str);
            }
        }

        if ($all)
        {
            return str_replace(array('&amp;', '&lt;', '&gt;', '&quot;', '&apos;', '&#45;'), array('&', '<', '>', '"', "'", '-'), $str);
        }

        return $str;
    }

    /**
     * Code Highlighter
     *
     * Colorizes code strings
     *
     * @param string the text string
     * @return string
     */
    public static function highlight_code($str)
    {
        /* The highlight string public static function encodes and highlights
         * brackets so we need them to start raw.
         *
         * Also replace any existing PHP tags to temporary markers
         * so they don't accidentally break the string out of PHP,
         * and thus, thwart the highlighting.
         */
        $str = str_replace(array('&lt;', '&gt;', '<?', '?>', '<%', '%>', '\\', '</script>'), array('<', '>', 'phptagopen', 'phptagclose', 'asptagopen', 'asptagclose', 'backslashtmp', 'scriptclose'), $str);

// The highlight_string public static function requires that the text be surrounded
// by PHP tags, which we will remove later
        $str = highlight_string('<?php ' . $str . ' ?>', TRUE);

// Remove our artificially added PHP, and the syntax highlighting that came with it
        $str = preg_replace(array(
            '/<span style="color: #([A-Z0-9]+)">&lt;\?php(&nbsp;| )/i',
            '/(<span style="color: #[A-Z0-9]+">.*?)\?&gt;<\/span>\n<\/span>\n<\/code>/is',
            '/<span style="color: #[A-Z0-9]+"\><\/span>/i'
                ), array(
            '<span style="color: #$1">',
            "$1</span>\n</span>\n</code>",
            ''
                ), $str);

// Replace our markers back to PHP tags.
        return str_replace(array('phptagopen', 'phptagclose', 'asptagopen', 'asptagclose', 'backslashtmp', 'scriptclose'), array('&lt;?', '?&gt;', '&lt;%', '%&gt;', '\\', '&lt;/script&gt;'), $str);
    }

    /**
     * Phrase Highlighter
     *
     * Highlights a phrase within a text string
     *
     * @param string the text string
     * @param string the phrase you'd like to highlight
     * @param string the openging tag to precede the phrase with
     * @param string the closing tag to end the phrase with
     * @return string
     */
    public static function highlight_phrase($str, $phrase, $tag_open = '<strong>', $tag_close = '</strong>')
    {
        if ($str === '')
        {
            return '';
        }

        if ($phrase !== '')
        {
            return preg_replace('/(' . preg_quote($phrase, '/') . ')/i', $tag_open . '\\1' . $tag_close, $str);
        }

        return $str;
    }

    /**
     * Convert Accented Foreign Characters to ASCII
     *
     * @param string the text string
     * @return string
     */
    public static function convert_accented_characters($str)
    {
        global $foreign_characters;

        if (!isset($foreign_characters) OR !is_array($foreign_characters))
        {
            if (defined('ENVIRONMENT') && is_file(APPPATH . 'config/' . ENVIRONMENT . '/foreign_chars.php'))
            {
                include(APPPATH . 'config/' . ENVIRONMENT . '/foreign_chars.php');
            }
            elseif (is_file(APPPATH . 'config/foreign_chars.php'))
            {
                include(APPPATH . 'config/foreign_chars.php');
            }

            if (!isset($foreign_characters) OR !is_array($foreign_characters))
            {
                return $str;
            }
        }

        return preg_replace(array_keys($foreign_characters), array_values($foreign_characters), $str);
    }

    /**
     * Word Wrap
     *
     * Wraps text at the specified character. Maintains the integrity of words.
     * Anything placed between {unwrap}{/unwrap} will not be word wrapped, nor
     * will URLs.
     *
     * @param string $str the text string
     * @param int $charlim = 76 the number of characters to wrap at
     * @return string
     */
    public static function wrap($str, $charlim = 76)
    {
// Set the character limit
        if (!is_numeric($charlim))
        {
            $charlim = 76;
        }

// Reduce multiple spaces
        $str = preg_replace('| +|', ' ', $str);

// Standardize newlines
        if (mb_strpos($str, "\r") !== FALSE)
        {
            $str = str_replace(array("\r\n", "\r"), "\n", $str);
        }

// If the current word is surrounded by {unwrap} tags we'll
// strip the entire chunk and replace it with a marker.
        $unwrap = array();
        if (preg_match_all('|(\{unwrap\}.+?\{/unwrap\})|s', $str, $matches))
        {
            for ($i = 0, $c = count($matches[0]); $i < $c; $i++)
            {
                $unwrap[] = $matches[1][$i];
                $str      = str_replace($matches[1][$i], '{{unwrapped' . $i . '}}', $str);
            }
        }

// Use PHP's native public static function to do the initial wordwrap.
// We set the cut flag to FALSE so that any individual words that are
// too long get left alone. In the next step we'll deal with them.
        $str = wordwrap($str, $charlim, "\n", FALSE);

// Split the string into individual lines of text and cycle through them
        $output = '';
        foreach (explode("\n", $str) as $line)
        {
// Is the line within the allowed character count?
// If so we'll join it to the output and continue
            if (mb_strlen($line) <= $charlim)
            {
                $output .= $line . "\n";
                continue;
            }

            $temp = '';
            while ((mb_strlen($line)) > $charlim)
            {
// If the over-length word is a URL we won't wrap it
                if (preg_match('!\[url.+\]|://|wwww.!', $line))
                {
                    break;
                }

// Trim the word down
                $temp .= mb_substr($line, 0, $charlim - 1);
                $line = mb_substr($line, $charlim - 1);
            }

// If $temp contains data it means we had to split up an over-length
// word into smaller chunks so we'll add it back to our current line
            if ($temp !== '')
            {
                $output .= $temp . "\n" . $line . "\n";
            }
            else
            {
                $output .= $line . "\n";
            }
        }

// Put our markers back
        if (count($unwrap) > 0)
        {
            foreach ($unwrap as $key => $val)
            {
                $output = str_replace('{{unwrapped' . $key . '}}', $val, $output);
            }
        }

// Remove the unwrap tags and return
        return str_replace(array('{unwrap}', '{/unwrap}'), '', $output);
    }

    /**
     * Ellipsize String
     *
     * This public static function will strip tags from a string, split it at its max_length and ellipsize
     *
     * @param string string to ellipsize
     * @param int max length of string
     * @param mixed int (1|0) or float, .5, .2, etc for position to split
     * @param string ellipsis ; Default '...'
     * @return string ellipsized string
     */
    public static function ellipsize($str, $max_length, $position = 1, $ellipsis = '&hellip;')
    {
// Strip tags
        $str = trim(strip_tags($str));

// Is the string long enough to ellipsize?
        if (mb_strlen($str) <= $max_length)
        {
            return $str;
        }

        $beg      = mb_substr($str, 0, floor($max_length * $position));
        $position = ($position > 1) ? 1 : $position;

        if ($position === 1)
        {
            $end = mb_substr($str, 0, -($max_length - mb_strlen($beg)));
        }
        else
        {
            $end = mb_substr($str, -($max_length - mb_strlen($beg)));
        }

        return $beg . $ellipsis . $end;
    }

}

