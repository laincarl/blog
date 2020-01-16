---
title: 如何写一个babel plugin
date: 2020-01-16 17:21:27
tags:
---

在babel中，plugin分为两种，`syntax plugin`(语法插件)和`transform plugin`(转换插件)。
语法插件名字中通常带有syntax，例如babel-plugin-syntax-jsx，同理转换插件名字中通常带有transform，例如babel-plugin-transform-react-jsx，其中语法插件涉及到的方面过广，本文将只涉及转换插件。

<!-- more -->