---
title: 如何写一个babel plugin
date: 2020-01-16 17:21:27
tags:
---

在babel中，plugin分为两种，`syntax plugin`(语法插件)和`transform plugin`(转换插件)。

语法插件名字中通常带有`syntax`，例如`babel-plugin-syntax-jsx`
转换插件名字中通常带有`transform`，例如`babel-plugin-transform-react-jsx`
其中语法插件涉及到的方面过广，本文将只涉及转换插件。

<!-- more -->

一个plugin其实就是一个函数，在编写插件时，推荐去[astexplorer.net](https://astexplorer.net/)
![astexplorer](astexplorer.png)
然后选择parser和transformer，例如想编写一个普通的js转换插件就把parser设置为最新的babylon，把transformer设置为最新的babel。
左下角就是需要写的plugin部分的代码了。

```javascript 一个最简单的plugin
export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Identifier(path) {
        path.node.name = path.node.name.split('').reverse().join('');
      }
    }
  };
}
```

函数的参数为babel对象，其中用到的一个属性就是types，它包含了创建AST节点的接口，详见[babel-types文档](https://babeljs.io/docs/en/babel-types)。而我们需要返回一个对象，其中visitor是访问者模式。

相关资源

- [一个babel-plugin开发模板]()
- [astexplorer.net](https://astexplorer.net/)
- [babel-types文档](https://babeljs.io/docs/en/babel-types)
- [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
