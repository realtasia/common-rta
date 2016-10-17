<?php

class commentTest extends PHPUnit_Framework_TestCase{
  protected static $instance;

  public function testNewCommentModifer(){
    static::$instance =  Interact::factory('new_comment');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.comments":1,"counts.subscriptions":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('new_comment') should return \$addToSet as the modifier");
  }
  public function testRemoveCommentModifer(){
    static::$instance =  Interact::factory('delete_comment');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('delete_comment') should return \$pull as the modifier");
  }

  public function testApproveCommentModifer(){
    static::$instance =  Interact::factory('delete_comment');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('approve_comment') should return \$pull as the modifier");
  }

  public function testLikeUser(){
    static::$instance =  Interact::factory('like', 'user');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.users":1,"counts.likes":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('like', 'user') should return \$addToSet as the modifier");
  }

  public function testUnLikeUser(){
    static::$instance =  Interact::factory('unlike', 'user');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unlike', 'user') should return \$pull as the modifier");
  }

  public function testLikePost(){
    static::$instance =  Interact::factory('like', 'post');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.posts":1,"counts.likes":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('like', 'post') should return \$addToSet as the modifier");
  }

  public function testUnLikePost(){
    static::$instance =  Interact::factory('unlike', 'post');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unlike', 'post') should return \$pull as the modifier");
  }
  public function testLikePage(){
    static::$instance =  Interact::factory('like', 'page');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.pages":1,"counts.likes":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('like', 'page') should return \$addToSet as the modifier");
  }

  public function testUnLikePage(){
    static::$instance =  Interact::factory('unlike', 'page');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unlike', 'page') should return \$pull as the modifier");
  }

  public function testSubscribeUser(){
    static::$instance =  Interact::factory('subscribe', 'user');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.users":1,"counts.subscriptions":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('subscribe', 'user') should return \$addToSet as the modifier");
  }

  public function testUnSubscribeUser(){
    static::$instance =  Interact::factory('unsubscribe', 'user');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unsubscribe', 'user') should return \$pull as the modifier");
  }

  public function testSubscribePost(){
    static::$instance =  Interact::factory('subscribe', 'post');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.posts":1,"counts.subscriptions":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('subscribe', 'post') should return \$addToSet as the modifier");
  }

  public function testUnSubscribePost(){
    static::$instance =  Interact::factory('unsubscribe', 'post');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unsubscribe', 'post') should return \$pull as the modifier");
  }
  public function testSubscribePage(){
    static::$instance =  Interact::factory('subscribe', 'page');
    $m = static::$instance->get_modifier();
    $cq = json_encode( static::$instance->get_user_count_query(true) );
    $eq = '{"$inc":{"counts.pages":1,"counts.subscriptions":1}}';
    $this->assertEquals($cq, $eq, "Interact::get_user_count_query(true) should have a query looking like: " + $eq);
    $this->assertEquals($m, '$addToSet', "Interact::factory('subscribe', 'page') should return \$addToSet as the modifier");
  }

  public function testUnSubscribePage(){
    static::$instance =  Interact::factory('unsubscribe', 'page');
    $m = static::$instance->get_modifier();
    $this->assertEquals($m, '$pull', "Interact::factory('unsubscribe', 'page') should return \$pull as the modifier");
  }
}

?>
