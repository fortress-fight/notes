# LearnWebpack

## 1. webpack 初步使用

### 1.1 简单使用

1. 建立一个项目 -- npm init
2. 安装本地的webpack -- npm install webpack --save-dev
3. webpack 编译

    - 通过 webpack index.js boundle.js 的方式进行直接打包
    注： index.js 是源文件 boundle.js 是打包后的输出文件
  
### 1.2 打包 css 文件 

1. webpack 不能直接打包 .css 类型的文件，需要别的插件进行支持，常用的有 css-loader 和 style-loader 通过 `npm install css-loader style-loader --save-dev` 安装

    - css-loader 是将 .css 文件打包
      style-loader 是将 style 标签插入到 html 中

2. 可以通过在引入的js文件通过 `import css from 'style-loader!css-loader!../css/style.css';` 然后通过webpack的打包命令使用 注： style-loader 要在前 

3. 可以在命令行中进行打包指令，使用webpack的参数 module.bind;具体使用：`webpack index.js boundle.js --module.bind css=style-loader!css-loader!`

### 1.3 webpack 常用参数

1. --watch 实时监控，如果进行修改了就重新打包
2. --progress 查看打包进程
3. --display-modules || --labeled-modules 显示打包的模块
4. --display-reasons || --verbose 显示打包的细节
5. --config [path] 配置文件的地址,默认为根目录下的webpack.config.js文件


## 2 webpack 基本配置

这次通过模式项目来进行练习

### 2.1 创建一个项目

`npm init`
`npm install webpack --save-dev`

### 2.2 搭建一个项目树

示例：
>dist -- 存放 打包后的文件
>src -- 存放 打包前的文件
>    -- script -- 存放js
>    -- style -- 存放css 

### 2.3 配置webpack.config.js

在命令行中使用 webpack 命令，可以通过配置文件进行打包，其中默认执行的是 webpack.config.js 文件 如果需要使用其它的配置文件可以通过 webpack --config [name]使用

#### 2.3.1 基本配置

```js
module.exports = {
    entry: './src/script/main.js',
    output: {
        path: './dist/js',
        filename: 'bundle.js'
    }
}
```

#### 2.3.2 entry -- 入口文件

入口文件有三种类型：

1. string -- 单文件 -- 直接存放路径
2. Array -- 多文件 -- 使用数组存放多个文件
3. 对象 -- {key:value} -- key 是指这一项的 chunk name；value表示真实的入口文件

#### 2.3.3 output -- 输出文件

- path -- 输出文件的存放路径
- filename -- 输出文件的文件名
- publicPath -- 占位符，当需要上线的时候，这里将引用变成线上地址

如果输入文件是一个对象并包含多个key，就需要在filename中进行修改，如果只有一个bundle.js 那么后面的会覆盖掉前面的；这时可以通过占位符来进行多个文件的输出：[name],[hash],[chunk-hash]

>注：hash -- 相当于版本号，chunk-hash 只会在文件修改的时候，才会修改的hash

实例：

```js
module.exports = {
    entry: {
        main: './src/script/main.js',
        main2: './src/script/main2.js'
    },
    output: {
        path: './dist/js',
        filename: '[name]bundle.js',
        publicPath: 'http://cdn.com/'
    }
}
```

通过这种方式可以输出两个文件 mainbundle.js 和 main2bundle.js
并且引入的路径格式是线上绝对路径：`http://cdn.com/dist/js/...`

如果不想每次都要在命令行中运行webpack打包命令，可以通过在npm的配置文件中的Script里，输入运行指令然后直接调用
例如：

``` json
 "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "webpack": "webpack --watch"
    },
```

可以通过`npm run webpack`执行命令

### 2.4 插件

如果使用了hash作为文件名，那么输出的文件如何引入就成为了问题，这是可用使用 `html-webpack-plugin`来实现；

#### 2.4.1 html-webpack-plugin 插件

具体使用：

1. 在输出文件中引入

需要使用  commonJs 语法 `var htmlWebpackPlugin = require("html-webpack-plugin");`

2. 在webpack.config.js中配置

```json
context: -- 文件上下文
plugins: [
    new htmlWebpackPlugin({ // -- 没有参数会创建一个index文件，并且所有的输出都与其关联；    template: "index.html", // 模板
        filename: "输出的文件名",
        inject: "head" //-- 将script的标签插入到指定职位
    })
]
```

1. 传参

可以通过plugins的配置，对模板（index.html）进行传参；使用的 `<%= %>` 的格式
例如：在htmlWebpackPlugin的配置中添加title，可以通过 `<%= htmlWebpackPlugin.options.title %>`进行引入；

我们可以在模板中使用

```jsp
 <% for (var key in htmlWebpackPlugin) { %>
            <%= key %>
                <% } %>
```

的语法将 htmlWebpackPlugin 中能遍历的属性显示出来；
其中key包括：files 和 options
继续遍历：

```jsp
    <p>
        <% for (var key in htmlWebpackPlugin.files) { %>
            <%= key %>:
                <%= htmlWebpackPlugin.files[key]%>
                    <% } %>
    </p>
    <p>
        <% for (var key in htmlWebpackPlugin.options) { %>
            <%= key %>:
                <%= htmlWebpackPlugin.options[key]%>
                    <% } %>
    </p>
```

得到：

```json
publicPath: ""
chunks:{
    "bundle2":{
        "size":49,
        "entry":"/js/bundle2bundle.js",
        "hash":"29d6d9e58bc3a8780d88",
        "css":[]
        },
    "bundle":{
        "size":45,
        "entry":"/js/bundlebundle.js",
        "hash":"a9442c1b47c167c76685",
        "css":[]
        }
    }
js:["/js/bundle2bundle.js","/js/bundlebundle.js"]
css:[]
manifest:
```

```js
template:
            D:\soft\wamp\www\GitHub\LearnES6\Module\project2\node_modules\.2.28.0@html-webpack-plugin\lib\loader.js!D:\soft\wamp\www\GitHub\LearnES6\Module\project2\index.html
filename:index.html
hash:false
inject:true
compile:true
favicon:false
minify:false
cache:true
showErrors:true
chunks:all
excludeChunks:this is a webpack project
xhtml:false
```

可以使用这些参数进行配置；可以通过 npm 官网 查询 插件的详细解释

实际使用：

1. 手动添加js文件，注：首先要将 htmlWebpackPlugin 配置项中的 inject 值 改成false，阻止默认插入的行为

```html
<script src="<%= htmlWebpackPlugin.files.chunks.bundle.entry %>"></script>
```

2. 上线压缩

上面讲到了上线时的路径问题，这里再说一下上线时要注意的压缩问题
在 htmlWebpackPlugin 中提供了压缩的功能
通过在配置中添加 minify 进行配置：
常用参数：查看 [npm-htmlWebpackPlugin](http://https://github.com/kangax/html-minifier#options-quick-reference)
例如：

```js
minify {
    removeComments: true, // -- 是否移出注释
    collapseWhitespace: true // -- 是否合并空格
}
```

3. 多文件引用

如果一个项目中需要同时生成多个文件，可以重复调用 `new htmlWebpackPlugin()`,每一次调用都会生成一次文件,这样就会引入相同的chunk；

但是如果需要使用各自的chunk，可以在各自的配置项中添加chunks(包含的文件)参数或者excludeChunks(排除的文件)

4. 内联文件内容

通过模板的方式将文件的内容内联到文件中去；

使用下面的代码可以提取文件内容

```js
<%= compilation.assets[htmlWebpackPlugin.files.chunks.bundle.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
```

注：

1. 使用 htmlWebpackPlugin.files.chunks.bundle.entry 为添加chunk的入口文件，使用substr是为了截取掉publicPath部分
1. 这里的chunks是文件引入的chunk，而不是指所有的chunk

但是这个时候已经内联的文件，就不需要通过script标签引用了，可以通过

```jsp
  <% for (var item in htmlWebpackPlugin.files.chunks) { %>
        <% if (item !== 'bundle') { %>
            <%= item %>
                <script src="<%= htmlWebpackPlugin.files.chunks[item].entry %>"></script>
                <% } %>
                    <% } %>
```

进行筛选

### 2.5 webpack - loader

webpack 中的loader 就相当于预先在文件中定义了一些执行命令，当遇到某些文件的时候，对其进行相应的一个操作

使用 project3 来演示



1. 首先要建立项目, 建立项目目录 
    - npm init 
    - npm install webpack --save-dev
    - npm install html-webpack-plugin

    项目目录：

    - dist -- 打包后文件的存放目录 
    - src -- 打包前的文件存放目录
    - src/components -- 存放项目模块
    - src/css -- 存放项目的css文件
    - src/app.js -- 打包的接口
    - index.js -- 打包时使用的模板

2. 配置 webpack.config.js 文件
简易：

```js
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'js/[name].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}
```

3. 添加loader

首先添加babel,可以查看官网使用说明

[babel-setup](http://babeljs.cn/docs/setup/)

` npm install --save-dev babel-loader `

在 webpack.config.js 中添加相关loader

```js
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
  ]
}
```
test -- 要编译的文件类型
exclude -- 不包括的
loader -- 执行的编译方式
[webpack 文档 -- configration](http://webpack.github.io/docs/configuration.html)

注：通过exclude方法进行设置的，可以加快打包速度，接受三种类型
A condition may be a RegExp (tested against absolute path), a string containing the absolute path, a function(absPath): bool, or an array of one of these combined with “and”.

如何使用绝对路径：

通过 node 的path 模块，可以使用 

```js
var path = require('path');
path.resolve(__dirname, 'node_modules'),
// __dirname -- 绝对路径， 'node_modules' -- 相对路径
```

的方法得到相应的绝对路径


但是这种方式是无法直接使用的，需要添加插件（用于编码）

`npm install --save-dev babel-cli babel-preset-es2015`

可以使用的有：
>env
>es2015
>es2016
>es2017
>flow
>latest
>react

有时还要限制版本就需要使用

>es2015
>stage-0
>stage-1
>stage-2
>stage-3
>react

[babel插件](http://babeljs.io/docs/plugins/#presets) 查看详情
[babel插件](http://babeljs.cn/docs/plugins/) 查看详情

在有了babel插件以后还需要引用这个插件，有以下几个方法：

- 使用 .babelrc 文件
在根目录下创建一个 .babelrc 文件，在文件中添加：

```js
{
  "presets": ["es2015"]
}
```

- 在 package.js 文件中，添加

```js
"babel": {
    "presets": ["es2015"]
}
```

- 在 loaders 中添加参数

```js
module: {
  loaders: [
    { 
        test: /\.js$/, 
        exclude: ./node_modules/, 
        loader: "babel-loader",
        query: {
            "presets": ["es2015"]
        }
    }
  ]
}
```

4. 打包css文件：

    使用css-loader 和 style-loader 可以对css文件进行打包

    1. 首先安装 

    `npm install css-loader style-loader --save-dev`

    2. 在入口文件中引入css文件

    `improt '.css'`

    3. 配置webpack.config.js

    ```js
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }
    ```
    注意：在loader 中使用先后顺序的，处理顺序是从右向左；

    4. 运行webpack 打包

5. 使用 css 后处理
    使用 postcss-loader 使用css后处理一般是用于处理浏览器版本的兼容问题，为css样式添加前缀等

    1. 安装 postcss-loader 
    2. 安装相关插件
    postcss-loader 的功能十分强大，使用的过程中需要根据要实现的功能对其添加相关的插件，例如：'autoprefixer'
    `npm install autoprefixer --save-dev`
    3. 配置webpack.config.js
    在 webpack.config.js 配置postcss-loader 文件，由于postcss-loader 是处理css文件的，可以将其与style-loader写在一个loader中，

```js
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
    }
```

然后配置postcss-loader 的插件相关，配置插件的方法有很多种

第一种：
```js
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')({
                        broswers: ['last 2 version'] // autoprefixer的参数
                    })
                ]
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
```
第二种(webpack 2 语法)：

```js
module.exports = {
    ...
     module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        use: [{
            {
                loader: "postcss-loader", // 好像每次只能添加一个
                options: {
                /* ... */
                    plugins: function () {
                        return [
                            require('autoprefixer')({
                                broswers:['last 5 version']
                            })
                        ]
                    }
                }
        }],
        }
```
    
6. @import 引入的问题

 如果在一个style中通过@import引入多个css文件的时候，就需要对css-loader 传入参数

 `?importLoaders=1`, 在cssloader之后使用几个loader 处理import进来的资源

7. 配置预处理器

    目前常用的预处理器包括： less，sass，stylus

    以sass 为例：

    1. 安装sass-loader
    `npm install sass-loader --save-dev`
    注： 这里如果没有sass会有提示安装  node-sass

    2. 配置sass 

    ```js
    {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
    }
    ```

    3. 在入口文件- app.js 中引入 scss 文件

    4. 运行webpack

    注： 在less中处理 @import 的问题，无需额外的操作

8. html 模板加载

    模块化开发，就需要在文件中引入相应的模块文件；并且找到对应的解析方法；

    可以通过webpack官网查看其对应的loader

    [template](http://webpack.github.io/docs/list-of-loaders.html);
    
    以html模板为例：

    1. 首先安装html-loader
    `cnpm install html-loader --save-dev`

    2. 然后配置其 loader

    ```js
    test: /\.html$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'html-loader'
    ```


8. img -- loader 的问题
    
    在项目中 如果需要引入 图片或者文件，需要额外的工具 -- file-loader

    使用：
    
    首先安装 
    `cnpm install file-loader --save-dev`

    然后配置loader

```js
    {
        test: /\.(jpg|png|gif|sev)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'file-loader'

    }
```

这种方式可以解决在根文件下引入的图片问题，以及在样式中引入的图片问题，并能匹配相对路径的绝对路径，但是在模板中相对路径就会存在路径问题；

如果希望打包后的文件具有相应的路径，可以在loader中传入相应的参数

```
query : {
    name: 'assets/[name]-[hash:5].[ext]'
}
```
[]--中的都是占位符，具体含义查找相关文档

在模板中引入 img 存在路径的问题，解决方法一个：就是使用 url-loader，另一个通过模板定义的方法引入

当你的文件或者图片，大于限制的大小的时候就会交给 file-loader，否则转换成为 base64 位的编码

下载，配置；

在loader 中可以传入 limite 参数 ，用于指定大小；

使用图片 会有缓存，而使用base64 每一使用都是新的

图片压缩 相关 -- image-webpack-loader

配置：

```js
 {
    test: /\.(jpg|png|gif|sev)$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    loaders: [
        'url-loader?limit=500&name=assets/img-[hash:5].[ext]',
        'image-webpack-loader'
    ]
} 
```

image-webpack-loader -- 是个功能很强的包，具有很多参数，对不同类型有不同的优化方法；