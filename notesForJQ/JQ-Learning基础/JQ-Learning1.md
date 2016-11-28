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

css() || attr()

```
   <script>
        $('div').filter('#box').css('width', '300px')
        // 这回会将所有的都修改，css中两个参数即是设置
        $('div').html('这是修改后的').css('background', 'blue');
        // attr 设置attribute 即属性，不能改变样式
        $('div').attr('height', '400px')
        alert($('div').html())
        // 这里只会弹出第一个的宽度，css中一个参数即是获取
        alert($('div').css('width'))
        alert($('div').attr('height'))
    </script>
```



>注：当对一组元素取值的时候，取的的是这组中的第一个，但是赋值是对全部的元素进行操作；

4) 过滤

filter() || not() || has()

```
    <script>
        $(function  () {
            $('li').css('border', '1px solid black').css('height', '100px').css('width', '200px');

            // not -- 除了not的
            $('li').not('.box').css('background', 'red')

            // filter -- 符合要求的
            $('li').filter('.box').css('background','yellow');

            // 里面具有span的
            $('li').has('span').css('background', 'blue')
        })
    </script>
```

5) 选择元素

next() || prev() || find() || eq() || index()

```
    <script>
        $(function  () {
            $('.box').next().css('background', 'red').next().css('background', 'blue');
            $('.box').prev().css('background', 'yellow');

            /*这里像素的单位不写默认px*/
            $('ul').find('li').css('width', '400px').css('height', '100');

            $('li').eq(1).css('background', 'pink');

            // 当对一组元素使用index的时候，得到的是这组元素中的第一个的位置
            alert($('#div').index())
        })
    </script>
```

实例一：

jq编写选项卡：

```
    <script>
        /*window.onload = function () {
            var aBtn = document.getElementsByTagName('input');
            var aDiv = document.getElementsByTagName('div');
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].index = i;
                aBtn[i].onclick = function () {
                    for (var i = 0; i < aDiv.length; i++) {
                        aDiv[i].className = '';
                        aBtn[i].className = '';
                    }
                    aDiv[this.index].className = 'active';
                    this.className = 'active';
                }
            }
        }*/
        $(function  () {
            $('input').click(function () {
                $('div').attr('class', '');
                $('div').eq($(this).index()).attr('class', 'active');
                $('input').attr('class', '')
                $(this).attr('class', 'active');
            })
        })
    </script>
```

## 4. JQ 放方法之属性操作

### 4.1 属性相关

addClass() || removeClass() || width() || innerWidth() || outerWidth() || outerWidth(true);

width: 计算后宽度
innerWidth：width + padding
outerWidth：width + padding + border
outerWidth(true): width + padding + border + margin

### 4.2 节点相关：

insertBefore() || before() || insetAfter() || after() || appendTo() || append() || prependTo() || prepend() || remove()

insetAfter() -- 放到目标点后面；
prependTo() -- 从前面插入；

以insertBefore()为例：
```
    // $(function () {
    //  $('div div').insertBefore($('span'))
    // })

    /*上下使用效果是一样的*/

    // var a = document.getElementById('div');
    // a.insertBefore(a.children[1], a.children[0])

    /* insetBefore 和 before 的区别 */

    $(function () {
        $('div div').insertBefore($('span')).css('background', 'red')

        /* 首先before的意思是将后面元素放到前面元素的前面 */

        $('span').before($('div div')).css('background', 'blue');
    })

```


### 4.3 事件相关：

on() || off() || $('').事件名(fn)

```
    <script>
    /* 首先 on 适用于绑定事件， 可以同时绑定多个事件，以及自定义事件 */
        $(function () {
            $('#div').on('click mouseover', function () {
                alert(1);
                // off 适用于解绑事件，
                $(this).off('mouseover')
            })
        })
    </script>
```

### 4.4 BOM相关

scrollTop()

```
    $(function () {
        $(document).on('click', function () {
            alert($(window).scrollTop());
        })
    })
```

## 5. JQ方法：

### 5.1 事件细节

ev || ev.pageX || ev.which || ev.preventDefault() || ev.stopPropagation() || return false || on() || one()

```
    /*$(document).on('click', function (ev) {
        // 到文档的距离
        alert(ev.pageX);
    })
    $(document).on('keydown', function  (ev) {
        alert(ev.which)
    })*/
    $('div').css('width', '200px').css('background','red').one('click', function () {
        $(this).html($(this).html() + '哈哈')
    })
```


### 5.2 JQ方法之位置操作：

offset() || position()

1) offset() 返回一个对象，对象中包含两个值，距离屏幕的left 和 top值
2) position() 返回一个对象，对象中包含两个值，如果这个元素转化成absolute后的left值和top值


```
    <script>
        /*function getPos (obj) {
            var pos = {
                left: 0,
                top: 0
            };
            while (obj) {
                pos.left += obj.offsetLeft;
                pos.top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return pos;
        }
        var b = document.getElementsByTagName('span')[0];
        var a = getPos(b);
        var l = b.getBoundingClientRect().left;
        console.log(l)*/
        
        /*$('div').on('click', function () {
            alert($(this).offset().left)
        })*/


        $('span').on('click', function () {
            <!-- 这里是0 -->
            alert($(this).position().left)
        })

    </script>
```

### 5.3 其他：

offsetParent() || parent() || val() || size() || each() ||

offsetParent() --- 原生的offsetParent一样
parent() --- parentNode;
val() --- value;
size() --- length;
each()；

其中：
val() 取值赋值一体，和html()一样；
size() 只能获取一组元素的长度；
each() -- 和forEach有一些不同；



```
    <script>
        var a = [1,2,3,4,5]

        $('li').each(function (i, item) {
            $(item).css('background', 'red')
        })
        // var aLi = document.getElementsByTagName('li');
        // // console.log(aLi)
        // a.forEach(function (item, i) {
        //  if (i == 2) {
        //      return false;
        //  }
        //  alert(i)
        // })
    </script>
```

1) forEach() 只使用在数组，而不是用与类数值；
2) each() 只用于一组元素，不能用于数组；
3) each() 中第一个参数是i，而第二个参数是item；forEach相反





## 6 拖拽实例:

```
    <script>
        $('#box').on('mousedown', function (ev) {
            var disX = ev.pageX - $(this).offset().left;
            var disY = ev.pageY - $(this).offset().top;
            $(document).on('mousemove', function (ev) {
                $('#box').css('left', ev.pageX - disX)
                $('#box').css('top', ev.pageY - disY)
                ev.preventDefault();
            });
            $(document).on('mouseup', function () {
                $(document).off()
            })
        })
    </script>
```

注：$(document).on('click', function(){}) 
$(document).click = function(){}
只用.只能绑定一个函数
使用on能够绑定多个函数


## 7 JQ方法之hover和简单动画

hover() || show() || hide() || fadeOut() || fadeIn() || slideUp() || slideDown() || fadeTo()
这些（除hover以外）都可以接受一个以毫秒为单位的时间参数,默认为400ms；

hover() 接受两个函数，第一个是移入执行，第二个是移出执行；

```
    <div id="box1">1111</div>
    <div id="box2">2222</div>
    <script>
        $('#box1').hover(function () {
            $('#box2').css('background', 'red')
        }, function () {
            $('#box2').css('background', 'yellow')
        })
    </script>
```

show() || hide()

接受时间参数，透明度和宽高同时发生变化；

fadeOut() || fadeIn()

接受时间参数，只有透明度发生变化

slideUp() || slideDown()

接受时间参数，只有高度发生变化

fadeTo()

接受两个参数，第一个是时间参数，第二个是透明度参数，在时间内到达指定透明度

```
    <script>
        /*$('#box1').hover(function () {
            $('#box2').hide(1000)
        }, function () {
            $('#box2').show(1000)
        })*/
        /*$('#box1').hover(function () {
            $('#box2').fadeOut(1000)
        }, function () {
            $('#box2').fadeIn(1000)
        })*/
        /*$('#box1').hover(function () {
            $('#box2').slideUp(1000)
        }, function () {
            $('#box2').slideDown(1000)
        })*/


        $('#box1').hover(function () {
            $('#box2').fadeTo(1000, 0.3)
        }, function () {
            $('#box2').slideUp(1000)
        })
    </script>
```

