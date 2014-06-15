<?php defined('SYSPATH') or die('No direct script access.');
ini_set("max_execution_time", 0);
ini_set('memory_limit', '2000M');

class Controller_Scrape extends Kohana_Controller {

	public static $proxys = array('87.110.181.144:8080',
	// '58.22.28.134:83',
	// '221.10.40.234:843',
	// '58.20.127.106:3128',
	// '210.22.59.66:3128',
	// '122.96.59.102:82',
	// '222.87.129.29:80',
	// '218.108.168.67:82',
	// '183.61.240.126:80',
	// '122.96.59.103:82',
	// '219.150.205.35:8080'
	);

	public function action_cea() {
		$s = SimpleHTML::file_get_html('agencies.html');
		$table = $s -> find('table', 0);
		//die(Debug::vars($table));
		$trs = $table -> find('tr');
		for ($t = 0; $t < count($trs); $t++) {
			$tds = $trs[$t] -> children();
			//echo count($tds);t
			for ($i = 0; $i < count($tds); $i++) {
				if ($tds[$i] -> find('a'))
					$td = $tds[$i] -> children(0);
				else
					$td = $tds[$i];

				switch ($i) {
					case 0 :
						$key = 'license';
						break;
					case 1 :
						$key = 'title';
						break;
					case 2 :
						$key = 'expiry';
						break;
				}
				$ts[$t][$key] = trim($td -> innertext());
			}
			echo Debug::vars(Model::factory('page') -> add($ts[$t], 'company'));
		}
		die();
		unset($ts[0]);

		die(Debug::vars(Model::factory('page') -> add($ts, 'company')));
	}

	public static function cleanup($arr) {
		$arr = array_values($arr);
		foreach ($arr as $k => $v) {
			if (is_array($v)) {
				$tag = \Arr::get($v, 'tag');
				if ($tag && $tag === 'br') {
					unset($arr[$k]);
				} else {
					$childNodes = \Arr::get($v, 'childNodes');
					if ($childNodes) {
						if (empty($childNodes)) {
							unset($v['childNodes']);
							$arr[$k] = $v;
						} else {
							foreach ($childNodes as $ck => $cv) {
								if (!\Arr::get($cv, 'tag')) {
									unset($v['childNodes'][$ck]);
								}
							}
							$arr[$k] = $v;
						}
					}
				}
			}
		}

		//return $arr;
		return array_filter(array_values($arr));
	}

	public function extractText($parser) {
		$return = array();
		$p = static::cleanup($parser -> toArray());
		foreach ($p as $k => $v) {
			if (is_array($v)) {
				$tag = \Arr::get($v, 'tag');
				$innerHTML = trim(\Arr::get($v, 'innerHTML'));
				switch ($tag) {
					case 'strong' :
						$return['name'] = ucwords(strtolower($innerHTML));
						break;
					case 'a' :
						if (Valid::email($innerHTML)) {
							$return['email'] = $innerHTML;
						}
						if (strpos(trim($innerHTML), "<img src='http://s3images.sg.ippstatic.com/agencies") === 0) {
							$agencyNode = @current(\Arr::get($v, 'childNodes'));
							if ($agencyNode) {
								$props = @explode('=', \Arr::get($agencyNode, 'stratr'));
								foreach ($props as $pk => $pv) {
									if (strpos($pv, "'http") === 0) {
										$agencyUrl = substr($pv, 1, strlen($pv) - 6);
										$return['agency']['image'] = $agencyUrl;
									}
								}
							}
						}
						break;
					case 'span' :
						$numNode = @current(static::cleanup(\Arr::get($v, 'childNodes')));
						if ($numNode && strpos(trim(\Arr::get($numNode, 'innerHTML')), '+6') === 0) {
							$mobile = explode(' ', \Arr::get($numNode, 'stratr'));
							$mobile = array_pop($mobile);
							$mobile = substr($mobile, 1, 11);
							$return['mobile'] = trim($mobile);
						}
						break;
					case 'td' :
						if (strpos($innerHTML, "<ahref='/realestateagent/") === 0) {
							$children = static::cleanup(\Arr::get($v, 'childNodes'));
							foreach ($children as $ck => $child) {
								$childtag = \Arr::get($child, 'tag');
								$childprop = \Arr::get($child, 'stratr');
								$childInnerHTML = \Arr::get($child, 'innerHTML');
								if ($childprop && strpos($childprop, "href='/realestateagent/") === 0) {
									$parts = explode(' ', $childprop);
									$part = str_replace('href=', '', $parts[0]);
									$part = str_replace('\'', '', $part);
									$return['link'] = 'http://www.iproperty.com.sg' . $part;
								}
								switch ($childtag) {
									case 'span' :
										$numNode = @current(static::cleanup(\Arr::get($child, 'childNodes')));
										if ($numNode && strpos(trim(\Arr::get($numNode, 'innerHTML')), '+6') === 0) {
											$mobile = explode(' ', \Arr::get($numNode, 'stratr'));
											$mobile = array_pop($mobile);
											$mobile = substr($mobile, 1, 11);
											$return['mobile'] = trim($mobile);
										}
										break;
									case 'a' :
										if (Valid::email($childInnerHTML)) {
											$return['email'] = $childInnerHTML;
										}
										if (strpos(trim($childInnerHTML), "<img src='http://s3images.sg.ippstatic.com/agencies") === 0) {
											$agencyNode = @current(\Arr::get($child, 'childNodes'));
											if ($agencyNode) {
												$props = @explode('=', \Arr::get($agencyNode, 'stratr'));
												foreach ($props as $pk => $pv) {
													if (strpos($pv, "'http") === 0) {
														$agencyUrl = substr($pv, 1, strlen($pv) - 6);
														$return['agency']['image'] = $agencyUrl;
													}
												}
											}
										}
										break;
								}
							}
						}
				}
			}
		}

		//return \Arr::merge($return, $p);
		return $return;
	}

	public function action_findagent() {
		$num = $this -> request -> param('id');
		echo "<pre>";
		print_r(Collection::factory('agent') -> findOne(['mobile' => new MongoRegex("/$num/")]));
	}

	public function action_removest() {
		$r = Collection::factory('agent') -> find() -> fields(['mobile' => true]);
		//      $nums = array();
		echo "<ol>";
		while ($r -> hasNext()) {
			$row = $r -> getNext();

			if (SMS::valid($row -> mobile)) {
				$row -> mobile = SMS::valid($row -> mobile);
				echo "<li>" . SMS::valid($row -> mobile) . "</li>";
			}

			//echo SMS::valid($row->mobile) . "<br>";
			//          $e = @explode(' ', $row->mobile);
			//          if($e && !SMS::valid(current($e)))
			//          {
			//              print_r($e);
			//              echo "<br>";
			//              $row->mobile = trim(implode('', $e));
			//              print_r(['new' => $row->mobile]);
			//              echo "<br>";
			//              $row->save();
			//          }
			$row -> mobile = trim($row -> mobile);
			$row -> save();
		}
		echo "</ol>";
		//print_r($nums);
		//      $r->reset();
		//      echo "<pre>";
		//      while($r->hasNext())
		//      {
		//          print_r($r->getNext()->as_array());
		//      }
		Collection::factory('agent') -> remove(['sourcedStProp' => true], ['multiple' => true]);
	}

	public function action_stnewfiles() {
		ob_end_flush();
		$dir = "/home/jason/www/api/stagents";
		//$handle    = opendir($dir);
		$master = [];
		$personcount = 0;
		$filecount = 0;
		$urls = [];

		for ($i = 328; $i <= 328; $i++) {
			$ret = [];

			$urls = is_file("$dir/$i.json") ? json_decode(file_get_contents("$dir/$i.json"), true) : [];
			$total = count($urls);
			print_r(" Currently processing: " . $i . ".json" . PHP_EOL);

			foreach ($urls as $key => $url) {
				print_r(" Accessing: $total - $url " . PHP_EOL);
				$proxy = static::_getProxy();
				$data = $this -> stprop_url(null, $url, $proxy);
				if ($data) {

					preg_match_all('/"_trackEvent","Call Agent.*\.html\("(.*?)"\)/', $data, $matches);
					$mobile = !empty($matches[1]) ? trim($matches[1][0]) : null;
					if ($mobile) {
						unset($urls[$key]);
						file_put_contents("$dir/html/$mobile.html", $data);
						echo "Saved: " . $url . PHP_EOL;
						flush();
						@ob_flush();
					} else {
						try {
							$html = SimpleHTML::str_get_html($data);
							if (is_object($html)) {
								$details = $html -> find(".ab-name");
								$name = null;
								foreach ($details as $detail) {
									$name = static::_validateAndGet($detail, "a[itemprop='url'] span");
								}
								if ($name) {
									unset($urls[$key]);
									$name = URL::title($name);
									file_put_contents("$dir/html/$name.html", $data);
									echo "Saved: " . $name . PHP_EOL;
									flush();
									@ob_flush();
								}
							}
						} catch(Exception $e) {
							static::_removeProxy($proxy);
							print_r($e);

						}

					}
				}
				$total--;
				usleep(500);
			}

			if (!empty($urls)) {
				if (is_file("$dir/$i.json"))
					file_put_contents("$dir/$i.json", json_encode(array_values($urls), JSON_PRETTY_PRINT));
			} else {
				if (is_file("$dir/$i.json"))
					unlink("$dir/$i.json");
			}

			usleep(500);
			//file_put_contents($dir.'/processed-' . $i . '-.json', json_encode($ret, JSON_PRETTY_PRINT));
		}

	}

	public function _extractSt() {
		$data = $this -> stprop_url(null, $url);
		if ($data) {
			preg_match_all('/"_trackEvent","Call Agent.*\.html\("(.*?)"\)/', $data, $matches);
			$person['mobile'] = !empty($matches[1]) ? trim($matches[1][0]) : null;
			$a = SimpleHTML::str_get_html($data);

			if ($a) {
				$div = $a -> find(".ab-name");

				foreach ($div as $item) {
					$person['name'] = static::_validateAndGet($item, "a[itemprop='url'] span");
					$person['title'] = static::_validateAndGet($item, "[itemprop='jobTitle']");
					$person['sources'] = ['stproperty' => ['listings' => static::_validateAndGet($a, '.ab-photo span'), 'subscription' => static::_validateAndGet($a, '#total_rows')]];
					$lic = $item -> find("p", 2);
					if (is_object($lic)) {
						$split = explode(" / ", $lic -> innertext());
						$person['sources']['stproperty']['company'] = trim($split[0]);
						$person['cea'] = trim($split[1]);
					}
				}
			}
			print_r($person);
			$ret[] = $person;
			echo "...Success! " . $url . PHP_EOL;
			// since this url is processed, remove from the list so we can process the ones that are needed.
			unset($urls[$key]);
		}
	}

	public static function _validateAndGet($item, $match) {
		$ret = $item -> find($match, 0);
		if (is_object($ret)) {
			return trim(ucwords(strtolower($ret -> innertext())));
		}
	}

	public function action_stfiles() {
		$this -> response -> headers('Content-type', 'text/plain');
		$dir = "/home/jason/www/api/stagents/";
		$handle = opendir($dir);
		$master = array();
		$personcount = 0;
		$filecount = 0;
		while ($file = readdir($handle)) {
			if ($file !== '.' AND $file !== '..') {
				$a = SimpleHTML::file_get_html($dir . $file);
				// the agent link and image url
				if ($a) {
					$div = $a -> find('div[itemtype=http://schema.org/Person]');
					//print_r(gettype($div[0]));
					foreach ($div as $item) {
						$name = $item -> find('.ca-sr-item-info span[itemprop=name]', 0);
						if (is_object($name)) {
							$master[$personcount]['name'] = trim(ucwords(strtolower($name -> innertext())));
						}

						$url = $item -> find('.ca-sr-item-links ul li:first-child a', 0);

						if (is_object($url)) {
							$master[$personcount]['url'] = 'http://www.stproperty.sg' . trim($url);
						}

						$designation = $item -> find('.ca-sr-item-info p[itemprop=jobTitle]', 0);
						if (is_object($designation)) {
							$designation = $designation -> innertext();
							if (strpos($designation, '-' === 0)) {
								$designation = substr($designation, 1, strlen($designation));
							}
							if ($designation !== '-') {
								$master[$personcount]['title'] = trim(ucwords(strtolower($designation)));
							}
						}

						//$mobile = $item->find('.ca-sr-item-info p[itemprop=telephone]', 0);
						//if(is_object($mobile))
						//{
						//$master[$personcount]['mobile'] = trim(ucwords(strtolower($mobile->innertext())));
						//    $master[$personcount]['mobile'] = trim(implode('', explode(' ', $mobile->innertext())));
						//}

						$agency = $item -> find('.ca-sr-item-info p[itemprop=worksFor]', 0);
						if (is_object($agency)) {
							//$master[$personcount]['mobile'] = trim(ucwords(strtolower($mobile->innertext())));
							$master[$personcount]['company'] = trim(strtoupper($agency -> innertext()));
						}

						$master[$personcount]['sourcedStProp'] = true;

						try {
							$u = Collection::factory('agent') -> find(['mobile' => \Arr::get($master[$personcount], 'mobile')]);
							while ($u -> hasNext()) {
								print_r($u -> getNext() -> as_array());
							}
							//$u->ensureIndex(['mobile' => 1]);
							$u -> update(['mobile' => \Arr::get($master[$personcount], 'mobile')], $master[$personcount], ['upsert' => true]);
							$personcount++;
							//                            echo "\n";
							//                            print_r($u);

						} catch (MongoCursorException $e) {
							exit ;
							Debug::error("Error Message- :message \n" . "Error Code- :code", array(':interaction' => $i::action(), ':message' => $e -> getMessage(), ':code' => $e -> getCode()));
						}

					}
					//print_r($master);
				}
			}
			$filecount++;
		}
		//        $cursor   = Collection::factory('agent')->find();
		//        while ($cursor->hasNext())
		//        {
		//            var_dump(iterator_to_array($cursor->cursor()));
		//        }
		//file_put_contents('master.php', serialize($master));
		//die();
	}

	public function action_stnewagent() {
		$find = null;
		//die ($this->stprop_url());
		$a = SimpleHTML::str_get_html((string)$this -> stprop_url());
		if (is_object($a)) {
			$found = $a -> find('.sr-found h2 span', 0) -> innertext();

			preg_match_all("/\d+/", $found, $find);

			print_r("Found $found in total.");
		}

		if (!empty($find)) {
			$total = (int) current(\Arr::flatten($find));
		}
		$pages = (int) ceil($total / 50);

		print_r("Meaning that there are $pages pages in total.");
		$div = [];
		$undone = [];
		$readUndone = json_decode(file_get_contents('stagents/undone.json'));

		//print_r($ret);

		if ($pages) {
			//foreach($readUndone as $i)
			for ($i = 1; $i <= $pages; $i++) {
				$ret = [];
				$url = null;
				$data = $this -> stprop_url($i);
				if ($data) {
					$a = SimpleHTML::str_get_html($data);

					if (is_object($a))
						$div = $a -> find('div[itemtype=http://schema.org/Person]');
					else
						$undone[] = $i;

					foreach ($div as $item) {
						if (is_object($item)) {
							$url = $item -> find('.ca-sr-item-links a', 0);
							if (is_object($url)) {
								$ret[] = 'http://www.stproperty.sg' . $url -> href;
							}
						}
					}

					if (!empty($undone)) {
						file_put_contents('stagents/undone.json', json_encode($undone, JSON_PRETTY_PRINT));
					}

					if (!empty($ret)) {
						file_put_contents("stagents/$i.json", json_encode($ret, JSON_PRETTY_PRINT));
						$ret = [];
					}
				} else {
					$undone[] = $i;
					$ret = [];
					$undone = array_unique($undone);
				}
				usleep(500);
			}
		}
	}

	protected static function match($str, $regex) {
		preg_match($regex, $sourcestring, $matches);

		return isset($matches[1]) ? trim($matches[1]) : null;
	}

	protected function parse_iprop($html) {
		return ['cea' => static::match($html, '/CEA.Registration.Number.:.(.*?)<br>/'), 'mobile' => static::match($html, '/\$\(this\)\.callAgentPhoneLead\(.*, .*, .*, \'(.*?)\'\)/'), 'sources' => ['company' => static::match($html, '/Agency.Licence.Number.:.(.*?)<br>/'), 'email' => static::match($html, '/href="mailto\:"\>(.*?)<\/a>/')]];
	}

	public function action_ipfiles() {
		$this -> response -> headers('Content-type', 'text/plain');
		$dir = "/home/jason/www/rta.casa.net/agents/";
		$handle = opendir($dir);
		$master = array();
		$filecount = 0;
		while ($file = readdir($handle)) {
			if ($file !== '.' AND $file !== '..') {
				$a = SimpleHTML::file_get_html($dir . $file);
				// the agent link and image url
				if ($a) {
					$td1 = $a -> find('.agentlistingimagespace');
					// all other details.
					$td2 = $a -> find('.morelistingtext');
					$count = 0;
					foreach ($td2 as $child) {

						$info = Inflector::br2nl($child -> outertext());
						$parser = new htmlParser($child -> outertext());
						$return = $this -> extractText($parser);
						$info = preg_replace('/\t/', '', $info);
						$info = trim(strip_tags($info));
						$info = trim(nl2br($info));
						if (strlen($info) > 1) {
							$arr = explode('<br />', $info);
							//print_r($arr);
							foreach ($arr as $k => $v) {
								$arr[$k] = trim($v);
								$arr[$k] = preg_replace('/\t/', '', $v);
								$arr[$k] = preg_replace('/\n/', '', $v);
								$arr[$k] = preg_replace('/\n/', '', $v);
								$arr[$k] = trim($v);
							}
							foreach ($arr as $k => $v) {
								switch (true) {
									case strpos(trim($v), 'CEA Registration Number') === 0 :
										$l = explode(':', $v);
										$return['license'] = trim($l[1]);
										break;
									case strpos(trim($v), 'Agency Licence Number') === 0 :
										$l = explode(':', $v);
										$return['agency']['license'] = trim($l[1]);
										break;
								}
							}
							if (isset($td1[$count])) {
								$return['image'] = $td1[$count] -> children(0) -> children(0) -> src;
							}
							$return['source'] = 'iproperty';
							$co = Collection::factory('page');
							//$co->ensureIndex(['license' => 1]);
							$a = $co -> findOne(['license' => $return['agency']['license']], ['name' => 1]);
							if ($a) {
								$return['agency']['_id'] = \Arr::get($a, '_id');
								$return['agency']['name'] = \Arr::get($a, 'name');
							}
							ksort($return);
							try {
								$u = Collection::factory('agent');
								//$u->ensureIndex(['email' => 1]);
								$u -> update(['email' => \Arr::get($return, 'email')], $return, ['upsert' => true]);
								echo "\n";
								print_r($u);
							} catch (MongoCursorException $e) {
								Debug::error("Error Message- :message \n" . "Error Code- :code", array(':interaction' => $i::action(), ':message' => $e -> getMessage(), ':code' => $e -> getCode()));
							}
						}
						$count++;
					}
				}
			}
			$filecount++;
		}
		//        $cursor   = Collection::factory('agent')->find();
		//        while ($cursor->hasNext())
		//        {
		//            var_dump(iterator_to_array($cursor->cursor()));
		//        }
		//file_put_contents('master.php', serialize($master));
		//die();
	}

	public function action_ipagents() {
		$proxy = static::_getProxy();
		$html = $this -> iprop_url(null, null, $proxy);
		$undone = [];
		ob_end_flush();
		try {
//			$a = SimpleHTML::str_get_html($html);
//
//			if (is_object($a)) {
//				echo "Getting first page..." . PHP_EOL;
//				file_put_contents("ipagents/1.html", $a);
//				$found = $a -> find('.totalfound', 0);
//				if (is_object($found)) {
//					$found = $found -> innertext();
//				} else {
//					file_put_contents('ipagents/debug-feature.html', $html);
//				}
//				preg_match_all("/\d+/", $found, $find);
//				if (count($find[0]) === 2) {
//					$pages = (int)$find[0][1];
//				}
				$pages = json_decode(file_get_contents('ipagents/undone.json'));
				if ($pages) {
					//echo "There are $pages pages to process..." . PHP_EOL;
					foreach($pages as $i){
					//for ($i = 2; $i <= $pages; $i++) {
						echo "Currently serving page $i" . PHP_EOL;
						$proxy = static::_getProxy();
						$found = null;
						//$a = SimpleHTML::str_get_html(gzdecode($this->agent_url($letter)));
						$a = SimpleHTML::str_get_html($this -> iprop_url($i, null, $proxy));

						if (is_object($a)) {
							$found = $a -> find('.totalfound', 0);

							if (is_object($found)) {
								file_put_contents("ipagents/$i.html", $a);
								echo "Saved ipagents/$i.html" . PHP_EOL;
							} else {
								file_put_contents('ipagents/debug-' . $i . '.html', $html);
								echo "Saved Debug ipagents/debug-$i.html" . PHP_EOL;
							}
						} else {
							$undone[] = $i;
						}

						if (!empty($undone)) {
							file_put_contents('ipagents/undone.json', json_encode($undone, JSON_PRETTY_PRINT));
							echo "Saving unprocessed records to undone.json" . PHP_EOL;
							echo "***************************************************************************" . PHP_EOL;
							echo json_encode($undone, JSON_PRETTY_PRINT) . PHP_EOL;
							echo "***************************************************************************" . PHP_EOL;							
							
						}

						echo "Sleeping now..." . PHP_EOL;
						echo "***************************************************************************" . PHP_EOL;						
						flush();
						@ob_flush();
						usleep(500);
					}
					//sleep(1);
				}
//			}
		} catch(Exception $e) {
			static::_removeProxy($proxy);
			print_r($e);
		}
	}

	public function action_pgagents() {
		$letters = range('B', 'Z');
		$pages = null;
		$found = "";
		//$debug = [];
		ob_end_flush();
		foreach ($letters as $letter) {
			echo "Proccessing: $letter" . PHP_EOL;
			try {
				$a = SimpleHTML::str_get_html($this -> propg_url(1, $letter));

				if (is_object($a)) {
					file_put_contents("pgagents/$letter-1.html", $a);

					$found = $a -> find('.resultFound2 font', 0);

					if (is_object($found)) {
						$found = $found -> innertext();
						//$debug['Found is an object with text'] = $found;
					} else {
						//$debug['Found is not an object with text'] = true;
						file_put_contents("pgagents/debug-$letter.html'", $html);
					}

					$pages = $found ? ceil((int)$found / 50) : null;
					echo "$letter has $pages pages to process... " . PHP_EOL;

					$a = null;

					if ($pages) {
						for ($i = 2; $i <= $pages; $i++) {
							echo "Proccessing: $letter... Currently on page $i of $pages" . PHP_EOL;
							//$debug['Inside Pages Loop'] = $letter.$i;
							$proxy = static::_getProxy();
							$found = null;
							$data = $this -> propg_url($i, $letter, null, $proxy);

							if ($data) {
								preg_match('/Browse Singapore Property Agents By First Name/', $data, $match);

								//$debug['Making fetched data a DOM object '] = is_object($dom);

								if (is_array($match) && $match[0] === 'Browse Singapore Property Agents By First Name') {
									file_put_contents("pgagents/$letter-$i.html", $data);
									echo "Saved file $letter-$i.html..." . PHP_EOL;
									echo "***************************************************************************" . PHP_EOL;

								} else {
									$undone[$letter][] = $i;
									file_put_contents("pgagents/debug-$letter-$i", $data);
									echo "Saved DEBUG debug-$letter-$i.html..." . PHP_EOL;
									echo "***************************************************************************" . PHP_EOL;

								}

								if (!empty($undone)) {
									file_put_contents('pgagents/undone.json', json_encode($undone, JSON_PRETTY_PRINT));
									echo "Saving unprocessed records to undeone.json" . PHP_EOL;
									echo "***************************************************************************" . PHP_EOL;
									echo json_encode($undone, JSON_PRETTY_PRINT) . PHP_EOL;
									echo "***************************************************************************" . PHP_EOL;

								}
								$dom = null;
							} else {
								$undone[$letter][] = $i;
								$undone[$letter] = array_unique($undone[$letter]);
							}
							echo "Sleeping now..." . PHP_EOL;
							flush();
							@ob_flush();
							usleep(500);
						}
					}
					echo "Sleeping now..." . PHP_EOL;

					flush();
					@ob_flush();
					usleep(500);
				}
			} catch(Exception $e) {
				static::_removeProxy($proxy);
				print_r($e);
				flush();
				@ob_flush();
			}
			usleep(500);
		}

	}

	public function iprop_url($page = 1, $url = null, $proxy = null) {
		if (!$url) {
			$url = 'http://www.iproperty.com.sg/realestate/findanagent.aspx?';
			$url .= http_build_query(['ty' => 'as', 'ak' => '', 'rk' => '', 'p' => $page, 's' => 100]);
		}

		$proxy = $proxy ? $proxy : static::_getProxy();

		if ($proxy) {
			try {
				return static::_pRequest($proxy, $url);
			} catch(Exception $e) {
				return static::_pRequest($proxy, $url);
			}
		}
		return null;
	}

	public function stprop_url($page = 1, $url = null, $proxy = null) {
		//http://schema.org/Person
		//$letter  = strtolower($letter);
		if (!$url) {
			$url = "http://www.stproperty.sg/property-agent/page$page/size-50/sort-name-asc";
		}

		if (!$proxy) {
			$proxy = static::_getProxy();
		}

		if ($proxy) {
			try {
				//print_r(static::_pRequest($proxy, $url));
				return static::_pRequest($proxy, $url);
			} catch(Exception $e) {
				return static::_pRequest($proxy, $url);
			}
		}
		return null;
	}

	public function propg_url($page = 1, $letter = "A", $url = null, $proxy = null) {
		//if( file_exists( realpath("pgagents/$letter-$page.html") ) )
		//return file_get_contents(realpath("pgagents/$letter-$page.html"));

		if (!$url) {
			$url = "http://www.propertyguru.com.sg/property-agent-directory/firstname/$letter/$page?items_per_page=50";
		}

		if (!$proxy) {
			$proxy = static::_getProxy();
		}

		if ($proxy) {
			try {
				return static::_pRequest($proxy, $url);
			} catch(Exception $e) {
				return static::_pRequest($proxy, $url);
			}
		}
		return null;
	}

	public function action_extractip() {

		/**
		 {
		 "link": "http://www.stproperty.sg/property-agent/yw-w/user/311682",
		 "listings": NumberInt(0),
		 "name": "Yw W",
		 "picture": null,
		 "source": "stproperty",
		 "subscription": "Corporate Standard Member",
		 "title": "Sales"
		 }
		 */

		$this -> response -> headers('Content-type', 'text/plain');
		$dir = "/home/jason/www/api/ipagents";
		$handle = opendir($dir);
		$personcount = 0;
		$successcount = 0;

		$match = function($d, $pattern) {
			preg_match($pattern, $d, $m);

			return json_encode($m);
		};

		ob_end_flush();

		while (($file = readdir($handle)) && $personcount < 1) {
			if ($file !== '.' AND $file !== '..') {
				$data = file_get_contents($dir . '/' . $file);
				$html = SimpleHTML::str_get_html($data);
				$rows = $html -> find('.middle-column .SGmiddleColsub2 table tr td table');

				foreach ($rows as $row) {
					//$row = $row->find('table', 0)->children();
					$e = $row -> find('tr', 0);
					if (is_object($e)) {
						foreach ($e->children() as $td) {
							$f .= (string)$td;
						}
						$p[$personcount] = $f;
					}

					if (is_object($row)) {
						$p[] = (string)$row;
						/**
						 $p[] = [
						 'cea' => $match($row->innertext, '/CEA.Registration.Number.:.(.*?)<br>/'),
						 'mobile' => $match($row->innertext, '/\$\(this\)\.callAgentPhoneLead\(.*, .*, .*, \'(.*?)\'\)/'),
						 'agency' => $match($row->innertext, '/Agency.Licence.Number.:.(.*?)<br>/'),
						 'email' => $match($row->innertext, '/href="mailto\:"\>(.*?)<\/a>/'),
						 ];
						 */

						$personcount++;
						print_r($p);
						flush();
						@ob_flush();
						print_r("***** Processed $personcount records so far *****" . PHP_EOL);
						flush();
						@ob_flush();
					}
				}
			}
		}
	}

	public function action_extractst() {
		$this -> response -> headers('Content-type', 'text/plain');
		$dir = "/home/jason/www/api/stagents/html";
		$dirDone = "/home/jason/www/api/stagents/agentsDone";
		$handle = opendir($dir);
		$personcount = 0;
		$successcount = 0;
		ob_end_flush();
		while (($file = readdir($handle))) {
			if ($file !== '.' AND $file !== '..') {
				$data = file_get_contents($dir . '/' . $file);
				$p = [];
				preg_match('/"_trackEvent","Call Agent.*\.html\("(.*?)"\)/', $data, $matches);
				$p['mobile'] = trim(str_replace(' ', '', $matches[1]));

				$html = SimpleHTML::str_get_html($data);
				if (is_object($html)) {
					$details = $html -> find(".ab-name");
					$name = null;
					foreach ($details as $detail) {
						$a = $detail -> find("a[itemprop='url']", 0);
						if (is_object($a)) {
							$p['name'] = ucwords(trim(str_replace('  ', ' ', $a -> find("span", 0) -> plaintext)));
							$link = str_replace('/tab-details', '', $a -> href);
							$p['link'] = 'http://www.stproperty.sg' . $link;
						}

						$p['title'] = trim(str_replace('  ', ' ', static::_validateAndGet($detail, "[itemprop='jobTitle']")));
						$p['listings'] = (int)$html -> find("#total_rows", 0) -> innertext();
						$p['picture'] = $html -> find('.ab-photo a img', 0) -> src;
						$p['subscription'] = trim(ucwords(str_replace('<br>', ' ', static::_validateAndGet($html, '.ab-photo span'))));
						$lic = $detail -> find("p", 2);
						if (is_object($lic)) {
							$split = explode(" / ", $lic -> plaintext);
							$p['agency'] = strtoupper(trim($split[0]));
							$p['cea'] = str_replace('O', 0, strtoupper(trim($split[1])));
						}
					}

				}
			}
			if ($p) {
				$personcount++;
				$insert = $p;
				$updated = $this -> saveToDb($p, 'stproperty', $p['cea']);
				if (\Arr::get($updated, 'n') === 1) {
					$successcount++;
					print_r("Successfully updated an existing agent. " . $successcount . " records so far" . PHP_EOL);
					rename($dir . DIRECTORY_SEPARATOR . $file, $dirDone . DIRECTORY_SEPARATOR . $file);
					print_r("Moved file to new location. " . $successcount . " records so far" . PHP_EOL);
					flush();
					@ob_flush();
				} else {
					//$this->saveRogueToDb($insert);
					//print_r("Saved to rogue instead. Maybe already saved?" . PHP_EOL);
					//flush();
					//@ob_flush();
				}
				print_r("***** Processed $personcount records so far *****" . PHP_EOL);
				flush();
				@ob_flush();
			}
		}
	}

	public function action_fixrogue() {
		print_r($this -> removeFromRogue());
	}

	protected static function _getProxy() {
		return static::$proxys[0];
		if (!empty(static::$proxys)) {
			return static::$proxys[array_rand(static::$proxys)];
		}

		return false;
	}

	protected static function _removeProxy($proxy) {
		$key = array_search($proxy, static::$proxys);
		if ($key)
			unset(static::$proxys[$key]);
	}

	protected function saveToDb($document, $source, $cea) {
		$m = new MongoClient();
		$collection = $m -> selectCollection('agentGraph', 'agents');
		return $collection -> update(['cea' => $cea], ['$set' => [$source => $document]]);
	}

	protected function saveRogueToDb($document) {
		$m = new MongoClient();
		$collection = $m -> selectCollection('agentGraph', 'STNonAgents');
		return $collection -> insert($document);
	}

	protected function removeFromRogue() {
		$m = new MongoClient();
		$rogue = $m -> selectCollection('agentGraph', 'STNonAgents');
		//$agent = $m->selectCollection('agentGraph', 'agents');

		//$cursor = $rogue->find();
		return $rogue -> update(new stdClass, ['$set' => ['source' => 'stproperty']], ['multiple' => true]);

		while ($cursor -> hasNext()) {
			$item = $cursor -> getNext();

			$found = $agent -> findOne(["cea" => $item['cea']]);
			if ($found) {
				$rogue -> remove($item);
			}
		}

	}

	protected static function _pRequest($proxy, $url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Accept-Encoding' => 'gzip, deflate', 'Accept-Language' => 'en-us,en;q=0.5', 'Connection' => 'keep-alive', 'Host' => 'www.propertyguru.com.sg', 'Referer' => 'http://www.propertyguru.com.sg/property-agent-directory/firstname', 'User-Agent' => 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Zune 4.0; InfoPath.3; MS-RTC LM 8; .NET4.0C; .NET4.0E)', ]);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_COOKIESESSION, TRUE);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_PROXY, $proxy);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		//timeout in seconds

		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	}

}
