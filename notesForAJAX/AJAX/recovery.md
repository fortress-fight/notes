# AJAX 错误总结

## 1. 设置datatype：json 无效；

现象： 设置datatype：json后，success分支上接受不到数据，
拍错： 在complete分支上，查看 XHR 后发现，dataTypes 内只有两个值，html text，这里应该是通过 http包中找到的默认值，返回的数据格式是String
原因： php 返回的数据格式并不是json形式的，当设置datatype：json的时候就不能做success分支，导致得不到数据；
解决： 使用eval()将string格式，转换成对应的格式；

## 2. 无论怎么设置，都只能获取一串莫名其妙的代码段

原因： 文件放在了中文路径下，查找错误
解决： 文件目录中不能存在中文
