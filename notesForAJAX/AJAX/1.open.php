<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

// 接收GET提交的数据
$username = $_GET['username'];
$age = $_GET['age'];

// echo 的内容是返回出去的；
echo "我的姓名：{$username}，年龄：{$age}";