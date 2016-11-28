# JQ学习进阶 （下面的js都代表原生js）

## 1. 基础方法补充

### 1.1 get() 方法

get() 是将JQ方法转成JS使用，可以实现JQ和JS混用, 经过get方法就不能继续使用JQ的方法；
语法：
`$('li').get(index)`

```
    <script>
        // $('li').get(2).css('background', 'red');
        /*上面就不能正常使用了*/

        $('li').get(2).style.background = 'red'
    </script>
```

补： 
1. jq中有length 和js中length功能一样；
2. jq中使用$('li')[0]也可以将jq 和 js混用，但是规范中并没有说明

### 1.2 JQ中的outerWidth 和 js 中的offsetWidth

jq中的outerWidth可以识别出，display：none的元素尺寸，但是offsetWidth不能

### 1.3 text() 和 html();

通过text()获得的只有文本，通过text()写入的也都是字符串；
当对一组元素使用 text() 的时候，获得的是这组元素内的所有文本内容组成的字符串,写入也是针对所有元素的写入

## 2. 节点的操作

### 2.1 remove() || detach() 删除节点

都会返回删除的节点，但是remove()不仅可以删除节点，并且可以移除该节点的事件，而detach()仅仅是删除节点

```
    <script>
        /*$('li').eq(2).mouseover(function () {
            alert($(this).html())
        })
        $('li').eq(2).remove().appendTo($('ul'));*/

        /*事件已经被删除，不能再次触发*/

        $('li').eq(2).mouseover(function () {
            alert($(this).html())
        })
        $('li').eq(2).detach().appendTo($('ul'));
        /*事件没有被删除，还能再次触发*/
    </script>
```

### 2.2 $(function(){}) || window.onload = function(){}

$(function(){}) 是在 DOM加载完成后就触发， 相当于`DOMContentLoaded`window.onload 是在所有的都加载后才执行；

$(function(){}) 的第二中写法 $(document).ready(function(){})

## 3. DOM操作：

parents() || closest() || siblings() || nextAll() || prevAll() || parentUtile() || clone() || wrap() || wrapAll() || wrapInner() || unwrap() || add() || serialize() || serializeArray() || slice()

1）parents() 得到所有的祖先节点,一直可以找到html,接受一个参数，表示查找的结束位置

```
    <script>
        $('li').parents('ul').css('background', '#fb3')
    </script>
```

2) closest()
找到距离节点，最近的节点。
接受一个参数，表示距离最近的符合参数类型的节点；

```
    <script>
        $('li').eq(3).closest('li').css('background', '#fb3')
    </script>
```

3) siblings() 得到所有的兄弟节点,

```
    <script>
        $('li').eq(3).siblings().css('background', '#fb3')
    </script>
```

4) nextAll() 得到所有在下面兄弟节点 || prevAll() 得到所有在下面兄弟节点

```
    <script>
        $('li').eq(3).nextAll().css('background', '#fb3')
    </script>
```

5) parentUntil() || nextUntil() || prevUntil()

通过一个参数，指定相应的方式的查询截止位置；

6) clone()

复制 节点，参数 true 复制节点的事件 || false(默认)

```
    <script>
        $('li').eq(3).mousemove(function () {
            alert(1)
        });
        $('li').eq(3).clone(true).appendTo($('ul'));
    </script>
```

7) wrap() 包装 || wrapAll()整体包装 || wrapInner()内部包装 || unWrap()

包装：在一个元素的外面再添加一层标签

```
    <script>
        // $('span').wrap('<div>')

        // $('span').wrapAll('<div>')

        $('span').wrapInner('<em>')
        $('em').unwrap();
    </script>
```
 
----6----

8) add() 添加

add : 在一组元素中，加入另一个元素，会形成一个新的集合

```
    <span>111</span>
    <span>111</span>
    <span>111</span>
    <span>111</span>
    <span>111</span>
    <div>2222222</div>
    <script src = 'jquery-1.10.1.min.js'></script>
    <script>
        /*var a = $('div')
        $('span').add(a).css('background', 'blue')*/
        // 或者
        $('span').add('div').css('background', 'red')
    </script>
```

9) slice()

和数组中的slice相同，不过 这个适用于一个元素的集合（类数组）

```
    <script>
        $('span').slice(2, 4).css('background', 'skyblue')
    </script>
```

10) 数据的串联

serialize() || serializeArray()
将form中的value值进行数据串联；

```
    <script>
        var a = $('form').serialize();
        console.log(a)
        // a=1&b=2&c=3

        var b = $('form').serializeArray()
        console.log(b)

        /*
        b的格式：
        [
            {
                name: ,
                value:
            }
        ]
         */

    </script>
```

##4 JQ中的运动

### 4.1 animate()

语法：
`$('').animate(json, time, type, callback)`

参数：
json： {属性名：属性值}
time：默认400 不带单位
type：默认 swing 目前只有两种运动形式： swing 和 linear
callback： 回调函数

```
    $('div').click(function () {
        $(this).animate({
            'width': 1000
        }, 1000, 'swing', function () {
            $(this).animate({
                'height': 500
            })
        })
    })
```


注：通过链式操作可以做成回调功能

```
    $('div').click(function () {$(this).animate({'width': 1000}, 1000, 'swing').animate({'height': 500})})
```

### 4.2 运动相关

1）stop() 阻止运动

stop() 可以传入两个参数：
1：true||false true--阻止所有运动，false--阻止当前运动，并立即开始下个运动（默认）

2：true||false
停止到当前运动的目标位置；

```
    $('div').eq(0).click(function () {$(this).animate({'width': 1000}, 2000, 'swing').animate({'height': 500})});
        $('div').eq(1).click(function () {
            $('div').eq(0).stop(true,true);
        })
```

2）finish()

立即停止到所有运动结束后的位置；

```
    $('div').eq(0).click(function () {$(this).animate({'width': 1000}, 2000, 'swing').animate({'height': 500})});
        $('div').eq(1).click(function () {
            $('div').eq(0).finish();
        })
```

3）delay()
一个参数，设置一个延迟运动时间

```
    /*$('div').eq(1).click(function () {
        $(this).animate({"width":1000}, 2000).delay(1000).animate({'height': 500})
    })*/

    $('div').eq(1).click(function () {
        $(this).animate({"width":1000}, 2000, function () {
            $(this).delay(1000).animate({'height': 500})
        })
    })
```

## 5. 事件相关：

### 5.1 事件委托： delegate()

语法：
    delegate(目标类型, 事件名称, 执行函数)；

```
    $("ul").delegate('li', 'click', function () {
        $(this).css('background', 'red')
    })
```

### 5.2 阻止事件委托：undelegate()

```
    <script>
        $("ul").delegate('li', 'click', function () {
            $(this).css('background', 'red');
            $('ul').undelegate();
        })
    </script>
```

### 5.3 主动触发：trigger()

```
    <script>
        $("ul").click(function () {
            alert(1)
        })
        $('ul').trigger('click')
    </script>
```

## 6. event 对象

### 6.1 ev.target || ev.type || ev.data

```
    /*$("ul").click(function (ev) {
        console.log(ev.target) // 点击的标签
        console.log(ev.type) // 事件名 click
    })*/

    $('ul').on('click', {'name':'hello'},function (ev) {
        console.log(ev.data.name) // hello
    })
```

## 7. JQ的工具方法

在$.后面的方法就是工具方法，工具方法既可以用于JQ也可以用于JS

1）$.type()

返回变量类型

```
    <script>
        var a = [];
        alert($.type(a)); // array
    </script>
```

注： $.type() 相较于 js中的typeof 能够识别更细

2) $.trim()

去除字符串中的前后空格

```
    var a = ('  hello  ');
    var b = a.trim();
    console.log(a) // '  hello  '
    console.log(b) // 'hello'
```

3) $.inArray()

相当于字符串的indexOf接受两个参数:
1. 要查找的项；
2. 目标数组；

返回查找项的位置

```
    var a = ['a', 'b', 'c', 'd'];
    alert($.inArray('c', a)) // 2
```

4) $.proxy() 
修改this指向

三种使用方式：
其中后面有括号的就直接执行；
```
    function show (n1, n2) {
        console.log(n1);
        console.log(n2);
        console.log(this);
    }

    // $.proxy(show, window)(1, 2)


    // $(document).click($.proxy(show, window, 1, 2));
    
    $(document).click($.proxy(show, window, 1)(2));
```

5) $ 和 jQuery 是一样使用的

6) $.parseJSON()

和 JSON.parse(str) 一样

7) $.markeArray() 和 Arrayfrom()一样

## 8 JQ与Ajax

待补充





## 9 JQ插件

在修改jq的基础上，为jq添加功能


$.extend() || $.fn.extend()

两个接受的都是一个json，调用的时候直接使用key就可以
$.extend()是扩展一个工具方法的插件
$.fn.extend()是扩展一个JQ对象的方法插件

例：

```
    $.extend ({
        leftTrim: function (str) {
            return str.replace(/^\s+/,'');
        }
    })
    var a = '  hello   +'

    var b = $.leftTrim(a);
    console.log(b)


    $.fn.extend({
        drag: function (ev) {
            $(this).mousedown(function (ev) {
                alert(ev.pageX)
            })
        }
    })

    $("ul").drag();
```




