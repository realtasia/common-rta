<?php defined('SYSPATH') OR die('No direct script access.');

class Asset_Processor_Googleclosure {

    public static function process($content)
    {
        return Request::factory("http://closure-compiler.appspot.com/compile")
          ->post([
                'js_code' => $content,
                'output_info' => 'compiled_code',
            ])
          ->headers([
              'Content-type' => 'application/x-www-form-urlencoded'
          ])->execute()->body();
    }

    public static function _post($content)
    {
        return Request::factory("http://closure-compiler.appspot.com/compile")
          ->post([
                'js_code' => $content,
                'output_info' => 'compiled_code',
            ])
          ->headers([
              'Content-type' => 'application/x-www-form-urlencoded'
          ])->execute()->body();
    }
}