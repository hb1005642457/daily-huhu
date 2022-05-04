<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-15 15:08:49
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-28 15:40:38
-->
# webpack问题
## less-loader的 less转成css的底层原理
less是css预处理语言，拓展了css语言，增加了变量，mixin，函数等特性，作用是将less文件代码转为css

```js
const less = require('less');

module.exports = function(content) {
  const callback = this.async(); // 转译比较耗时，采用异步方式
  const options = this.getOptions(); // 获取配置文件中less-loader的options
  
  less.render(
    content,
    createOptions(options), // less转译的配置
    (err, output) => {
      callback(err, output.css); // 将生成的css代码传递给下一个loader
    }
  );
};
```
postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如：  
1 . 使用下一代css语法  
2 . 自动补全浏览器前缀  
3 . 自动把px代为转换成rem  
4 . css 代码压缩等等  

Css-loader的作用主要是解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回

## scss less
* 安装环境
Sass的安装需要安装Ruby环境，Less基于Javascript，是需要引入Less.js来处理代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放在项目中。
* less较简单
Less并没有裁剪CSS原有的特性，而是在现有CSS语法的基础上，为CSS加入程序式语言的特性。
* sass较强大
1、sass有变量和作用域
　　　2、sass有函数的概念
　　　3、进程控制
　　　　　条件、循环遍历、继承、引用
　　　4、数据结构
　　　　　数组、map
* Less和Sass处理机制不一样
前者是通过客户端处理的，后者是通过服务端处理，相比较之下前者解析会比后者慢一点

* 相同之处
Less和Sass在语法上有些共性，比如下面这些：

1、混入(Mixins)——class中的class；
2、参数混入——可以传递参数的class，就像函数一样；
3、嵌套规则——Class中嵌套class，从而减少重复的代码；
4、运算——CSS中用上数学；
5、颜色功能——可以编辑颜色；
6、名字空间(namespace)——分组样式，从而可以被调用；
7、作用域——局部修改样式；
8、JavaScript 赋值——在CSS中使用JavaScript表达式赋值。

## webpack的 loader 和 plugin 区别
webpack中loader 和 plugin 的主要区别：
1、loader 用于加载某些资源文件。因为 webpack 只能理解 JavaScript 和 JSON 文件，对于其他资源例如 css，图片，或者其他的语法集，比如 jsx， coffee，是没有办法加载的。 这就需要对应的loader将资源转化，加载进来。从字面意思也能看出，loader是用于加载的，它作用于一个个文件上。

2、plugin 用于扩展webpack的功能。目的在于解决loader无法实现的其他事,它直接作用于 webpack，扩展了它的功能。是 webpack 用于在编译过程中利用钩子进行各种自定义输出的函数，可以通过监听编译过程的各个钩子事件来完成如释出模版，对 js、css、html 进行压缩、去重等各类操作，结束后释出对应文件等等你可以想到的任何操作，本质上就是一个 node 模块，通过写一个类来使用编译暴漏出来的钩子实现编译过程的可控。

## webpack 常用插件
* babel 对es6解析插件
babel是一个js编译器，主要用于将es6+语法代码转换成向后兼容的js语法，以便能够运行在当前和旧版本的浏览器或其他环境。  
本质上是操作AST来完成代码的转译。  
babel编译过程：  
1.解析parse：将源代码转成抽象的表示方法，词法分析和语法分析，词法分析将源代码转为令牌流 token stream，语法分析主要是将令牌转为AST  
2.转换transform：通过babel插件的能力，对AST做一些特殊处理，将高版本的AST转换为低版本AST。  
3.生成generate：将AST转为字符串形式的低版本代码，同时创建source map映射

* babel中常用插件
@babel/cli 用于命令行编译文件  
@babel/core 包括整个babel工作流，所有的transform过程都会使用配置文件  
@babel/parse 转AST  
@babel/generator  将修正后的AST解码成js  
@babel/preset-env  预设，可使用最新的js语法，转化箭头函数，class，拓展运算符等，如要转换最新的api还需引入@babel/polyfill  
@babel/polyfill  模拟实现Promise、WeakMap等。需要安装在生产依赖中   
@babel-runtime:在使用后，库和工具只要在 package.json中增加依赖babel-runtime，交给babel-runtime去引入 polyfill 就行了  
corejs 是一个给低版本的浏览器提供接口的库，如 Promise, map, set 等  
@vue/cli-plugin-babel: vue-cli特有的babel插件  
babel-plugin-import  在编译过程中将import改为按需引入

* vue-loader
1.允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 \<style\> 的部分使用 Sass 和在 \<template\> 的部分使用 Pug；  
2.允许在一个 .vue 文件中使用自定义块，并对其运用自定义的 loader 链；  
3.使用 webpack loader 将 \<style\> 和 \<template\> 中引用的资源当作模块依赖来处理；  
4.为每个组件模拟出 scoped CSS；需要使用postcss转为作用域css 即带data-v-\[hash\] 样式     
5.在开发过程中使用热重载来保持状态   
6.vue-loader 和 vue-template-compiler应该一起安装且版本一样  
7.VueLoaderPlugin：职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 \<script\> 块  
8.css提取 webpack3中使用extract-text-webpack-plugin；webpack4中使用mini-css-extract-plugin

* file-loader url-loader资源文件打包
file-loader在处理任何大小文件时，都会返回publicPath  
url-loader可以设置一个阈值，文件大于阈值时，与file-loader一样返回publicPath，小于阈值时，返回文件base64形式编码；图片媒体字体文件都可以用url-loader处理  

* svg-sprite-loader 注册svg组件 svg-icon

* mini-css-extract-plugin 分离css与js  
防止将样式打包在 js 中文件过大和因为文件大网络请求超时的情况

* postcss-loader 进一步处理css
1.添加浏览器前缀 Autoprefixer 自动添加前缀  
2.postcss.config.js配置文件  

* optimize-css-assets-webpack-plugin css文件压缩

* terser-webpack-plugin 打包的js进行压缩

* ParallelUglifyPlugin 多进程压缩

以上三个都在 optimization.minimizer中配置 且都在生产模式下

* HtmlWebpackPlugin 生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle

* optimization.SplitChunksPlugin  分割代码
新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹  
新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）  
当按需加载 chunks 时，并行请求的最大数量小于或等于 30  
当加载初始化页面时，并发请求的最大数量小于或等于 30  

* HappyPack HappyPack是让webpack对loader的执行过程，从单一进程形式扩展为多进程模式，也就是将任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。从而加速代码构建 与 DLL动态链接库结合来使用更佳  
使用：给哪个loader加速设置哪个  
```js
new HappyPack({
  id: 'happy-babel',
  loaders: {
    loader: 'babel-loader',
    options: {
        babelrc: true,
        cacheDirectory: true // 启用缓存
    }
  },
  threadPool: HappyPack.ThreadPool({
    size: os.cpus().length
  }),
})
```

## webpack 如何做代码拆分 代码分割
* 方法一：webpack 配置 optimization 配置项 splitChunks
* 方法二：import 异步加载 要分割的 文件
1.安装@babel/plugin-syntax-dynamic-import 插件，支持babel识别import异步加载
2.配置.babelrc文件
```javascript
{
  "plugins": [
    // 允许 babel 去翻译 import 异步加载文件
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```
3.异步加载
import('/path').then(obj=>{})

## webpack tree shaking 原理
https://baijiahao.baidu.com/s?id=1704404768579846284&wfr=spider&for=pc
webpack 本身在打包时只能标记未使用的代码而不移除，而识别代码未使用标记并完成 tree-shaking 的 其实是 UglifyJS、babili、terser 这类压缩代码的工具。简单来说，就是压缩工具读取 webpack 打包结果，在压缩之前移除 bundle 中未使用的代码  
commonJS是动态导入  import是静态导入 可以使用import()表达式改为动态  
ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码

## commonJS和es6 module的区别 esm 和 commonjs 的区别
1、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

2、CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

3、CommonJs 是单个值导出，ES6 Module可以导出多个

4、CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层

5、CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

## webpack 动态导入原理
https://zhuanlan.zhihu.com/p/73325163
1.webpack通过__webpack_require__加载模块代码  
2.__webpack_require__.e  
根据 installedChunks 检查是否加载过该 chunk  
假如没加载过，则发起一个 JSONP 请求去加载 chunk  
将promise对象存在promises数组中  
将promise的resolve 和 reject存在installedChunks[chunkId]中
3.执行异步脚本

## webpack 热更新原理
https://www.cnblogs.com/frank-link/p/14838760.html  
通过 webpack-dev-server 创建两个服务器：提供静态资源的服务（express）和 Socket 服务

express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）

socket server 是一个 websocket 的长连接，双方可以通信

当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest 文件）和.js 文件（update chunk）

通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）

浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新

## webpack5 新特性
* 1.功能清除
不再为Node.js模块自动引用 Polyfills 需要引入crypto-js  
废弃 require.inclue 语法
* 2.长期缓存
新增长期缓存算法，确定的Chunk、模块ID和导出名称  
webpack5 加入长期缓存算法，该算法以确定性的方式为模块和分块分配短的（3 或 5 位）数字 ID， 这是包大小和长期缓存之间的一种权衡。在生成模式下默认开启 chunkIds: "deterministic" moduleIds: "deterministic" mangleExports: "deterministic"  
长期缓存 内容Hash  
* 3.开发支持
开发模式 命名代码块ID  
模块联邦 ModuleFederationPlugin  
* 4.支持崭新的 Web 平台特性
* 5.构建优化
嵌套的esm tree-shaking
内部模块 tree-shaking，设置"sideEffects": false时，可以省略更多的模块  
CommonJS Tree shaking 允许消除未使用的 CommonJs 导出，并从 require() 调用中跟踪引用的导出名称  
* 6.性能优化
持久缓存 缓存将默认存储在 node_modules/.cache/webpack

## mfsu方案 Module Federation Speed Up 基于模块联邦的提速方案
module federation 模块联邦