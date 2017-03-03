# note For Cookie

## 1. 简介

在一个域名下, 发生页面跳转(A-->B), 这时B页面,需要使用A页面的变量；就可以通过cookie来存储变量，以供使用；

由于js运行在客户端，所以可以设置cookie

## 2. 使用cookie

### 2.1 利用 document 的属性 cookie 来存储数据，

`document.cookie = 'key = value'`

每个cookie以‘;’隔开，一次只能写入一个

注：必须在服务器环境下运行

查看： 通过浏览器调试工具，查看application 下的cookie


实例：

```
//简易：
    document.cookie = 'name=ff';
        document.cookie = 'age=24';
```

```
//完整：
    var username=document.cookie.split(";")[0].split("=")[1];
    //JS操作cookies方法!
    //写cookies
    function setCookie(name,value)
    {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
```

注：
escape --- 将非特殊字符的字符串转码，这样各个浏览器都能识别；
expires --- 设置cookie的生命周期，为GTM格式的字符串参数；

### 2.2 读取cookie

```
    function getCookie(name) {
        // reg: 以name开头，或者是空格开头，name后存在‘=’，并且‘=’后以‘;’ 结束或者是以任意字符开头，后面紧跟着‘;’或者直接结束
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        // match 匹配失败，返回null
        if(arr=document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }
```

注：unescape 是将通过escape转码的数据，在转回来

### 2.3 删除cookie

```
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null) {
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
    }
```


### 2.4 完善：


## cookie 特征

1）声明周期

默认当浏览器关闭的时候，就清除；
设置：
    expires 参数：

2）长度

每个域名下cookie的长度不定，但是都不长；