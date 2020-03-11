---
title: 最新babel的polyfill的使用
date: 2020-03-10 20:41:13
tags:
---

最近面试遇到了一个关于polyfill的问题，而我对于polyfill使用的记忆还停留在很久之前，这里就记下最近的探究结果。

### 为什么使用polyfill

Babel默认只会对语法进行转义，例如将let转换为var，将箭头函数转换为普通函数，但是对于新的对象例如`Map`或者新的实例方法例如`Array.includes`就无能为力了，这时候就需要polyfill来支持新的特性

<!-- more -->

### polyfill是如何打补丁的

目前有两种方法来让我们可以正常使用这种新特性，babel中使用的是`core-js`(除了Generator外的补丁)和`regenerator-runtime/runtime`(Generator补丁)

#### 一. 直接修改window对象和内置对象

如果window对象上不存在Map，就自定义一个，Array原型上没有includes方法，就加一个上去，这样形如

```javascript
var map = new Map();
array.includes(1)
```

的代码即使不转换也可以正常使用，这样对于一个前端应用来说没什么关系，但是对于类库来说就不太好了，比如axios中使用了Promise，那么如果axios中覆盖了window中的Promise，就会有两个问题

1. 对于引用了axios的前端来说，直接修改window和原生对象是有很大风险的
2. 打包出来的文件会很大，并且如果每一个用到Promise的库如果都打包进一个Promise，那我们的前端打包出来的大小就不可想象了
所以就需要一种方法来解决这两个问题

#### 二. 转换 + 导入

例如

```javascript
var map = new Map();
// 转换后, 这里只是简写，实际上polyfill里的名字并不是这个
// map.js
module.exports = function Map(){
  ...
}
var PolyfillMap = require('map.js');
var map = new PolyfillMap();
```

`注意：转换后即使浏览器支持Map也会使用polyfill版本的Map`
实例方法的转换（目前core-js 3支持）这就是@babel/runtime干的事

```javascript
array.includes(1)
Object.prototype.includes = function(){

}
object.includes(1)
// 转换后, 这里只是简写，实际上polyfill里的名字并不是这个
// includes.js
module.exports = function includes(){
  ...
}
var includes = require('includes.js');
includes.call(array, 1)
Object.prototype.includes = function(){

}
// 是的，不管是不是数组，都会转换，但是不会影响功能，includes.js内部会判断是否有includes方法，有的话会使用默认的
includes.call(object, 1)
```

这样就可以保证全局变量的安全
看起来第二种方法好处很多，那么为什么还要使用第一种呢，根据测试第一种代码打包之后大小会小一些，应该是实现上会简单一些

### 两种polyfill的方法对应的使用方法

#### 1. 覆盖法对应的是@babel/env的`useBuiltIns`, 可以设置为`false`,`usage`,`entry`,对应的意思分别是

- false：不使用polyfill
- usage：根据代码中使用的新特性，和配置的`targets`自动引入对应polyfill（推荐）
- entry：需要手动在入口引入polyfill，在webpack中的entry指定@babel/polyfill或者手动引入，这样会根据配置的`targets`来决定最终的polyfill具体包含哪些，

```json babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        },
        "corejs": 3,
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

使用`entry`需要手动引入

```javascript
// 入口文件index.js
// 使用corejs: 2
import "@babel/polyfill";

// 使用corejs: 3
import "core-js/stable";
import "regenerator-runtime/runtime";
```

此方法需要安装的依赖

```shell
yarn add -D @babel/core @babel/preset-env
# regenerator-runtime已经被@babel/preset-env所包含
yarn add core-js
```

#### 2. 转换法对应的是@babel/runtime-corejs3

但是需要哪个polyfill需要手动引入，所以可以使用`@babel/plugin-transform-runtime`来帮我们自动引入

```json babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

此方法需要安装的依赖

```shell
yarn add -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
yarn add @babel/runtime-corejs3
```

参考：
<https://zhuanlan.zhihu.com/p/97884144>
<https://zhuanlan.zhihu.com/p/58624930>
