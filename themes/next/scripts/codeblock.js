
var attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
  'contenteditable="true"'
]

var attributesStr = attributes.join(' ')

/**
 * 生成 [n,m]的随机数
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

// hexo 渲染引擎 https://hexo.io/zh-cn/api/renderer
hexo.extend.filter.register('after_post_render', function (data) {

  while (/<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/.test(data.content)) {
    data.content = data.content.replace(/<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/, function () {

      var language = RegExp.$1
      var notSupport = "plain"
      if (language == notSupport) {
        //不知高亮的语言
        language = ""
      }

      var lastMatch = RegExp.lastMatch
      //运行代码按钮
      var runcodeBtn = ""
      lastMatch = lastMatch.replace(/<figure class="highlight /, '<figure class="iseeu highlight /')

      var title = ""
      // 处理  figcaption 标签 eg:<figcaption><span>文件路径：~/blog/themes/next/scripts/codeblock.js</span></figcaption>
      var figFirst = lastMatch.indexOf("<figcaption")
      if (figFirst > 0) {
        //有 figcaption 标签
        var figLast = lastMatch.indexOf("</figcaption")
        //</figcaption> 回标签长度
        var len = 13
        figLast += len
        //截取 figcaption 标签内容
        var figStr = lastMatch.substring(figFirst, figLast)
        //删除 figcaption 标签
        lastMatch = lastMatch.replace(figStr, "")

        //获取 [title] [url] [link-text]
        var spanStr = figStr.replace("<figcaption><span>", "").replace("</span></figcaption>", "")
        // console.log(resultContent)
        //根据空格分割
        var resultContent = spanStr.split(" ")
        if (resultContent.length > 0) {
          //取第一个title
          title = "  " + resultContent[0]
        }

        if (resultContent.length > 1) {
          if (resultContent[1] == "runcode") {
            //添加ID
            var id = "runcode" + randomNum(1, 1000);
            //添加运行代码按钮
            runcodeBtn = '<button class="run-code" data-figure-id= ' + id + '>运行代码</button>';
            lastMatch = lastMatch.replace('<figure class="iseeu highlight /', '<figure id=' + id + ' class="iseeu highlight /')

          }
        }
      }

      return runcodeBtn + '<div class="highlight-wrap"' + attributesStr + 'data-rel="' + language + title + '">' + lastMatch + '</div>'
    })
  }
  return data
})
