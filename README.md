# 文件阅读器

> 基于WEB的文件阅读器UI库



注: 本库中只包含最基础的UI部分, 不包含任何的文件解析器, 如果需要文件解析请自行实现<a href="#fileparser">文件解析器</a>并将它附加到阅读器中



# 目录

1.  <a href="#install">安装</a>

2. <a href="#integration">应用集成</a>
   
   1. <a href="#website">传统WEB项目</a>
   
   2. <a href="#react">React项目</a>
   
   3. <a href="#vue">Vue项目</a>

3. <a href="#fileparser">文件解析器</a>
   
   1. <a href="#fileparser-interface">接口</a>
   
   2. <a href="#fileparser-sample">示例</a>

4. <a href="#api">阅读器API</a>
   
   1. <a href="#CommonlyUsedAPI">常用API</a>
   
   2. <a href="#other">其他</a>

5. <a href="#notice">注意事项</a>



# <div id="install">安装</div>

## 浏览器中使用

```html
<script src="https://raw.githubusercontent.com/byzk-worker/document-reader-web/main/build/dist/docReader.min.js"></script>
```

在IE中使用

```html
<script src="https://raw.githubusercontent.com/byzk-worker/document-reader-web/main/build/dist/docReader.ie.min.js"></script>
```

## npm中使用

```shell
npm install --save @byzk/document-reader
```

## yarn中使用

```shell
yarn add @byzk/document-reader
```



<!-- 在 web 中中阅读文件并对文件进行签章的视图展示库, 底层采用图片进行展示，文件转换功能以及印章操作相关功能需由调用方自行完成，本库只提供基础接口 -->

# <div id="integration">应用集成</div>

# <div id="website">传统WEB项目</div>

关键代码

```html
<script src="https://raw.githubusercontent.com/byzk-worker/document-reader-web/main/build/dist/docReader.min.js"></script> 
<script>
  // window load事件
  window.onload = function () {
    // 初始化阅读器
    window.app = new docReader.App(document.body, {
      // 指定阅读器字体图标的文件路径
      fontConfig: {
        dir: "./fonts",
        eotFile: "iconfont.eot",
        woffFile: "iconfont.woff",
        woff2File: "iconfont.woff2",
        ttfFile: "iconfont.ttf",
        svgFile: "iconfont.svg",
      },
    });
    window.app.show();
    //   window.app.loading.show("哈哈哈");
    // window.app.message.success('成功提示文字成功提示文字成功提示文字成功提示文字成功提示文字成功提示文字成功提示文字成功提示文字');
    window.app.message.warn('警告提示文字');
    // window.app.message.error('失败提示文字');
  };
</script>
```




[完整示例]()



# <div id="React">React项目</div>

正在实现中。。。



# <div id="react">React项目</div>

正在实现中。。。



# <div id="fileparser">文件解析器</div>

## <div id="fileparser-interface">接口</div>

## <div id="fileparser-sample">示例</div>