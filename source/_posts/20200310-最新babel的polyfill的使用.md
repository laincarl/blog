---
title: 最新babel的polyfill的使用
date: 2020-03-10 20:41:13
tags:
---

@babel/polyfill
@babel/runtime
@babel/plugin-transform-runtime
core-js v2
core-js v3

babel 7.4版本之后，添加了corejs的配置，可以配置2或3，因此必须保证core-js2和3都安装了，由于core-js 2和core-js 3不兼容所以废弃了@babel/polyfill

useBuiltIns可选`entry`,`usage`两种配置的用法不同，下面以usage为例
注意：不需要再手动引入polyfill，会自动根据代码中的使用情况自动引入需要的polyfill

```json babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "corejs": 3,
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

如果使用entry则需要手动引入
在webpack中的entry指定@babel/polyfill或者手动引入，这样会根据配置的`targets`来决定最终的polyfill具体包含哪些，
注意写法
// 入口文件index.js
// 之前
import "@babel/polyfill";

// 现在
import "core-js/stable";
import "regenerator-runtime/runtime";

core-js 2升级到3都干了什么
