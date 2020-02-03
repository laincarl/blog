---
title: PowerShell美化
date: 2020-02-03 16:27:40
categories: 
- 工具
tags:
---

美化结果：
{% asset_img 美化结果.png 美化结果 %}
特性

- 支持emoji显示
- 颜色方案支持自定义
- 支持git状态显示

<!-- more -->

### 1. 安装Windows Terminal

直接在windows应用商店搜索安装即可
{% asset_img 安装termial.png 安装termial %}

### 2. 安装主题

主题[地址](https://github.com/dracula/powershell)，按照README中的安装方式进行安装
安装之后需要设置颜色，打开Windows Terminal的Settings,在schemes中添加

```json
{
  "background" : "#282A36",
  "black" : "#21222C",
  "blue" : "#BD93F9",
  "brightBlack" : "#6272A4",
  "brightBlue" : "#D6ACFF",
  "brightCyan" : "#A4FFFF",
  "brightGreen" : "#69FF94",
  "brightPurple" : "#FF92DF",
  "brightRed" : "#FF6E6E",
  "brightWhite" : "#FFFFFF",
  "brightYellow" : "#FFFFA5",
  "cyan" : "#8BE9FD",
  "foreground" : "#F8F8F2",
  "green" : "#50FA7B",
  "name" : "Dracula",
  "purple" : "#FF79C6",
  "red" : "#FF5555",
  "white" : "#F8F8F2",
  "yellow" : "#F1FA8C"
}
```

然后在profile中找到powershell,设置`colorScheme`为`Dracula`,`startingDirectory`设置为`null`，下面贴一个我的完整配置

```json
// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
    "profiles": [
        {
            "acrylicOpacity": 0.5,
            "background": "#282A36",
            "closeOnExit": true,
            "colorScheme": "Dracula",
            "commandline": "powershell.exe",
            "cursorColor": "#FFFFFF",
            "cursorShape": "bar",
            "fontFace": "Consolas",
            "fontSize": 12,
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "historySize": 9001,
            "icon": "ms-appx:///ProfileIcons/{61c54bbd-c2c6-5271-96e7-009a87ff44bf}.png",
            "name": "Windows PowerShell",
            "padding": "20, 10, 20, 20",
            "snapOnInput": true,
            "useAcrylic": false,
            "startingDirectory": null
        },
        {
            // Make changes here to the cmd.exe profile
            "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "name": "cmd",
            "commandline": "cmd.exe",
            "hidden": false
        },
        {
            "guid": "{c6eaf9f4-32a7-5fdc-b5cf-066e8a4b1e40}",
            "hidden": false,
            "name": "Ubuntu-18.04",
            "source": "Windows.Terminal.Wsl"
        },
        {
            "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
            "hidden": false,
            "name": "Azure Cloud Shell",
            "source": "Windows.Terminal.Azure"
        }
    ],
    // Add custom color schemes to this array
    "schemes": [
        {
            "background": "#282A36",
            "black": "#21222C",
            "blue": "#BD93F9",
            "brightBlack": "#6272A4",
            "brightBlue": "#D6ACFF",
            "brightCyan": "#A4FFFF",
            "brightGreen": "#69FF94",
            "brightPurple": "#FF92DF",
            "brightRed": "#FF6E6E",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#FFFFA5",
            "cyan": "#8BE9FD",
            "foreground": "#F8F8F2",
            "green": "#50FA7B",
            "name": "Dracula",
            "purple": "#FF79C6",
            "red": "#FF5555",
            "white": "#F8F8F2",
            "yellow": "#F1FA8C"
        }
    ],
    // Add any keybinding overrides to this array.
    // To unbind a default keybinding, set the command to "unbound"
    "keybindings": []
}
```

### 3. 将Windows Terminal加入右键菜单

1. 新建一个.reg文件
2. 将以下代码中的用户名替换为你的用户名，然后粘贴进reg文件
3. 将ico文件<img src="terminal.ico" height="25" width="25" style="display: inline-block;margin: 0 5px -6px 5px;"/>放入正确的路径
4. 双击运行reg文件

```bash
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
@="Windows Terminal here"
"Icon"="C:\\Users\\你的用户名\\AppData\\Local\\Terminal\\terminal.ico"

[HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
@="C:\\Users\\你的用户名\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"
```
