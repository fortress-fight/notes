<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array('title'=>'德裂','date'=>'2014-1-6'),
	array('title'=>'中日互为"伏"','date'=>'2014-1-6'),
	array('title'=>'安倍:望与中国人会面 中方:你关闭了大门','date'=>'2014-1-6'),
	array('title'=>'揭秘台湾驻港间谍网运作 湖北宜昌副市长被查','date'=>'2014-1-6'),
	array('title'=>'习近平：嫦娥三号是货真价实的中国创造','date'=>'2014-1-6'),
	array('title'=>'习近平：嫦娥三号是货真价实的中国创造','date'=>'2014-1-6'),
	array('title'=>'阿斯蒂芬','date'=>'2014-1-6'),
	array('title'=>'习近平：嫦娥实的中国创造','date'=>'2014-1-6'),
	array('title'=>'习近平：嫦娥三号是货真价实的中国创造','date'=>'2014-1-6'),
	array('title'=>'中国长达13正式解除 外企可进入','date'=>'2014-1-6'),
	array('title'=>'70种证件伴中国人一生:领养老金要办生存证明','date'=>'2014-1-6'),
	array('title'=>'德国女总理默克尔滑雪时摔倒 骨盆断裂','date'=>'2014-1-6'),
	array('title'=>'中日驻英外交官撰文互称对方国家为"伏地魔"','date'=>'2014-1-6'),
	array('title'=>'安倍:望与中国领导人会面 中方:你关闭了大门','date'=>'2014-1-6'),
	array('title'=>'揭秘台湾驻港间谍网运作 湖北宜昌副市长被查','date'=>'2014-1-6'),
);

echo json_encode($news);
