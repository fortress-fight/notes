# 第一节移动端基础介绍

##  1.1 测试

### 1.1.1 通过chrom模拟移动端设备

注：chrom模拟的只是尺寸以及部分移动端的特性，所以要得到准确的测试结果需要在真机上测试；

如何使用Emulation?
注：由于chrom的更新，目前只能使用插件或者老版chrom内核的浏览器才能使用Emulation

其中: 
model 代表设备
Emulate screen resolution 是否选择模拟
Emulate mobile 是否模拟移动端特性
shrink 是否缩放

Media

NetWork

sensors 特性

### 1.1.2 通过安装服务器，在手机上测试

wamp

## 1.2 viewport 视口设置

viewport -- 视口，用于设置可视区窗口的属性，默认不设置viewport，一般在移动端上为980px；

`<meta name = 'viewport' content=''>`

### 1.2.1 width 设置

`<meta name = 'viewport' content = 'width = 'device-width'>`

语法：
`width = [number || device-width]`

注：
尺寸不带单位；
在部分android机型上不支持设置 number

### 1.2.2 缩放设置

1）user-scalable 是否允许用户缩放；

语法：`user-scalable = [no || yes]`
注：ios10无效，需要使用js解决

2）initial-scale 初始缩放比例：

语法：`initial-scale = [number]`

3）minimum-scale 最小缩放比例

语法：`minimum-scale = [number]`

4）maximum-scale 最大缩放比例

语法：`maximum-scale = [number]`

2-3-4必须配合使用，单独使用没有意义
浏览器是通过放大、缩小浏览器窗口的尺寸的方式实现的

## 1.3 像素比

通过`window.devicePixelRatio`可以得到像素比，该属性只读；
浏览器使用n个像素显示一个像素，n就是像素比，即 设备的真实像素数比上 设备能显示的像素数；

例：
当一个640的像素比为2的设备，能显示的像素个数为320，当使用一个320的图片放入设备显示，那么这张照片会被拉伸成640，从而变得模糊，所以在取图的时候至少使用720以上

## 1.4 移动端常规设置

### 1.4.1 强制浏览器横竖屏

1)X5内核

`<meta name = 'x5-orientation' context='portrait || landscape'>`

2)UC内核
`<meta name = 'screen-orientation' content='portrait || landscape'>`

### 1.4.2 强制全屏显示

1)X5内核

`<meta name = 'x5-fullscreen' context='true'>`

2)UC内核
`<meta name = 'full-screen' content='yes'>`

目前只有x5 和 uc 支持

### 1.4.3 在移动端上，浏览器会自动识别电话和邮箱

通过`<meta name = 'formate-detection' content = 'telephone=no, emall=no'>`实现
禁止；

在a标签中使用 `href：'tel:...........'` 或者 `href: 'mailto..........'`实现

## 1.5 移动端独有的默认样式

### 1.5.1 a || input || button 标签在点击的时候，会有黑色的阴影

```
    a,
    input,
    button {
        /*-webkit-appearance:none;*/
        -webkit-tap-highlight-color: rgba(255,0,0,0);
    }
```

### 1.5.2 ios中button圆角

```
    input {
        -webkit-appearance: none;
        border-radius: 0;
    }
    button {
        -webkit-appearance: none;
    }
```

### 1.5.3 移动端默认字体设置

移动端中只有一种字体：Helvetica

```
    body {
        font-style: Helvetica;
    }
```

### 1.5.4 禁止文字缩放

```
    body * {
        -webkit-text-size-adjust: 100%;
    }
```

### 1.5.5 禁止移动端的文字选中

部分手机无效需要通过js实现

```
    body * {
        -webkit-user-select: none;
    }
```

### 1.5.6 FontBoosting

偶尔会出现的，当大选文字并且文字大小较小的时候，浏览器会方大这段文字
解决方法： 给这段文字设置一个高度，或者是`max-height`

### 1.5.7 固定定位

固定定位在移动端上支持性不好，需要通过js解决
可以使用css模拟，
```
    body,
    html {
        width: 100%;
        height: 100%
        overflow: hidden;
    }
    div {
        postition: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        <!-- 还需要调节具体位置 -->
    }
```
css模拟的缺陷：在部分手机上有卡顿，有下拉上拉回弹；

### 1.5.8 在ios下，body的`overflow：hidden`横向无效

解决方法：通过在body下加上一层标签，内部以body定位，但是overflow加载标签上

## 1.6 浏览器的适配：
由于各个浏览器的尺寸问题，需要使用适配

### 1.6.1 百分比是适配：
注：百分比适配的缺陷在于，不能灵活设置高度

### 1.6.2 viewport适配

```
    <script>
        function setMobileMeta (target) {
            var w = window.screen.width;
            var targetW = target;
            var scale = w/targetW;
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content='width=device-width, user-scalable = no, initial-scale = '+scale+', minimum-scale = '+scale+', maximum-scale = '+scale;
            document.head.appendChild(meta);
            alert(document.documentElement.clientWidth)
        }
        setMobileMeta(500)
    </script>
```

原理：首先缩放是通过修改视口大小实现的，所有通过调整缩放比例，就可以将不同大小的视口统一成相同大小的

### 1.6.3 rem适配

### 1.6.4 弹性盒模型 flex || box

## 2. 补充：

在移动端中：背景和图片一定要设置尺寸

在移动端中：精灵图不能拼的太紧凑，因为布局使用了rem，而转换成rem的过程中会有小数，从而产生误差；如果靠的太近会有可能显示别的图；