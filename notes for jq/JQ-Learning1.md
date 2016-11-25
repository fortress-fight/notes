# jquery 的学习：

## 1 $()选择器

###  1.1 功能1：模拟css的选择器
可以使用：

`$('.className')`
`$('#id')`
`$('targName')`
来直接选择元素

例：
```
    <body>
        <div id="div1" class="box">div</div>
        <!-- <div class="box">div</div> -->
        <script>
            var a = $('#div1');
            // console.log(a)
            a[0].style.background = '#58a';
        </script>
    </body>
```

```
    <body>
        <ul>
            <li></li>
            <li class="target"></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <script>
            var a = $('ul li');
            console.log(a)
        </script>
    </body>
```

>注：
1. 通过$()获取的是一组数据，在使用时必须配合下标；
2. $()功能相当于`querySelectorAll()`

### 1.2 功能2：具有独有的表达形式

```
    <ul>
        <li></li>
        <li class="target"></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <script>
        var a = $('li:first')
        a[0].style.background = 'red';

        var b = $('li:eq(2)')
        b[0].style.background = '#58a';

        var c = $('li:odd')
        for (var i = 0; i < c.length; i++) {
            c[i].style.background = 'blue';
        }

        var d = $('li:even')
        for (var i = 0; i < d.length; i++) {
            d[i].style.background = 'yellow';
        }
    </script>
```

其中odd代表偶数； even代表奇数；

### 1.3 多种筛选方法：
在$()选择器中可以使用filter关键字

```
    <body>
        <ul>
            <li></li>
            <li class = "target"></li>
            <li data = "attr"></li>
            <li></li>
            <li></li>
        </ul>
        <script>
            var a = $('li');
            /* 从一组元素中选择符合要求的元素 */
            var b = a.filter('.target');
            b[0].style.background = '#58a';
            var c = a.filter('[data=attr]')
            c[0].style.background = 'red';
        </script>
    </body>
```

## 2. JQ的写法

jquery 中，所有的方法都函数化了，所以要使用调用的方式使用；
$不仅仅具有选择器的功能，并且具有window.onload的功能：

1) innerHTML = html();
2) el.onclick = el.click(function(){})
3) window.onload = $(function(){})

```
    <script>
        // window.onload = function () {
        //  var div = document.getElementsByTagName('div')[0];
        //  div.onclick = function () {
        //      alert(this.innerHTML)
        //  }
        // }

        /* 上下两种的方式结果相同 */

        $(function(){
            $('div').click(function(){
                alert($(this).html())
            });
            $('div').click(function(){
                alert(1)
            });
        })
    </script>
```


>注：
1. JQ中很少使用赋值的操作，多数是使用传参的方法；
2. .click() 和 .html() 都必须对$()获取的元素使用，而对于原生JS方法获取的元素没有效果；
3. 通过jq方式绑定的应该是addEventListener的方法，可以同时绑定多个，从上而下执行；

## 3. 设计思想之原生关系和链式操作

### 3.1 JQ 和 原生JS的关系

1) jq 和 原生js 可以同时使用，但是不能混用；
```
    //alert( $(this).html() );  //jq的写法

    //alert( this.innerHTML );  //js的写法

    alert( $(this).innerHTML );  //错误的
    alert( this.html() );  //错误的
```

2) 链式操作：

将所有的操作合在一起使用叫做链式操作；

```
    <script>
        $('div').css('background', 'red').click(function () {
            $(this).css('width', '200px')
        })
    </script>
```

3)取值和赋值：

>注：当对一组元素取值的时候，取的的是这组中的第一个，但是赋值是对全部的元素进行操作；