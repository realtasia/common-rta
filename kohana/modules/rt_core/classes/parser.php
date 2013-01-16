<?php
    class parser
    {
        public $data = null;

        public $types = array(
        'activity'     => array('activity', 'sport'),
        'business'     => array('bar', 'company', 'cafe', 'hotel', 'restaurant'),
        'group'        => array('cause', 'sports_league', 'sports_team'),
        'organization' => array('band', 'government', 'non_profit', 'school', 'university'),
        'person'       => array('actor', 'athlete', 'author', 'director', 'musician', 'politician', 'public_figure'),
        'place'        => array('city', 'country', 'landmark', 'state_province'),
        'product'      => array('album', 'book', 'drink', 'food', 'game', 'isbn', 'movie', 'product', 'song', 'tv_show', 'upc'),
        'website'      => array('article', 'blog', 'website')
        );

        public static function factory( $content )
        {
            return new parser( $content );
        }

        public function __construct( $content )
        {
            //@todo: for www links later     |www(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(/|/([\w#!:.?+=&%@!\-/]))?
            $regex = '~(http|https)://(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(/|/([\w#!:.?+=&%@!\-/]))?~si';
            if (preg_match( $regex, $content, $matches))
            {

                $temp_content = preg_replace( '#' . $matches[0] . '#', 'TEMP_PLACEHOLDER', $content );
                //$url = $this->check( $matches[0] );
                $url = $matches[0];
                $ch  = curl_init();

                curl_setopt( $ch, CURLOPT_URL, $url ); // Define target site
                curl_setopt( $ch, CURLOPT_RETURNTRANSFER, TRUE ); // Return page in string
                curl_setopt( $ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2' );
                curl_setopt( $ch, CURLOPT_ENCODING , "gzip" );
                curl_setopt( $ch, CURLOPT_TIMEOUT,5 );
                curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, TRUE ); // Follow redirects

                $return = curl_exec( $ch);
                $this->info = curl_getinfo( $ch );
                curl_close( $ch );

                $dom = new DOMDocument;
                @$dom->loadHTML( $return );

                $tags = $dom->getElementsByTagName( 'meta' );

                if( $success = $this->_parse_og( $tags ) )
                {
                    $data = $success;
                }

                $data = View::factory( 'opengraph' )->set( 'data', $data )->__toString();
                $this->content = preg_replace( $regex, $data, $content );
                //$this->content = $temp_content;
            }
            else
            {
                $this->content = $content;
            }
        }

        protected static function _parse_og( $tags )
        {
            $object = new stdClass();

            foreach( $tags as $tag )
            {
                if ( $tag->hasAttribute( 'property' ) && strpos( $tag->getAttribute( 'property' ), 'og:') === 0 )
                {
                    $key = str_replace( 'og:', '', $tag->getAttribute( 'property' ) );
                    $object->$key = $tag->getAttribute( 'content' );
                }
            }

            return $object;
        }

        public function check( $url )
        {
            $url = trim( $url );
            if ( get_magic_quotes_gpc() )
            {
                $url = stripslashes( $url );
            }
            $url = strtr( $url, array_flip( get_html_translation_table( HTML_ENTITIES ) ) );
            $url = strip_tags( $url );
            $url = htmlspecialchars ($url );
            return $url;
        }
    }
?>
