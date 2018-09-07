# react-ssr
简单的react开发环境搭建 服务端渲染 开发环境的服务端渲染

---
## 第一次提交
**最基础的react项目工程化搭建**

*目录结构*

```
  - build
    webpack.base.js
  - client
    - views
      App.jsx
    app.js
    tpl.html
```
`.babelrc`

*需要安装的包*

```
"dependencies": {
  "react": "^16.4.2",
  "react-dom": "^16.4.2",
  "webpack": "^3.10.0"
},
"devDependencies": {
  "@babel/core": "^7.0.0",
  "babel-core": "^6.26.3",
  "babel-loader": "^7.1.5",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-es2015-loose": "^8.0.0",
  "babel-preset-react": "^6.24.1",
  "html-webpack-plugin": "^3.2.0",
  "rimraf": "^2.6.2"
}
```

*package.json中写的运行的命令*

`rimraf` 清除每次`dist`目录下生成的文件


```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "clean": "rimraf dist",
  "build:client": "webpack --config build/webpack.base.js",
  "build": "npm run clean && npm run build:client"
},
```

## 第二次提交

**webpack-dev-server**

增加webpack-dev-server之后，可以实现自动刷新，原因是：

支持两种自动刷新模式：

· `iframe mode`

· `inline mode` （默认是这种模式）

*这里重点说一下inline mode这种模式*

1、构建消息在浏览器控制台显示。

2、`socket.io`的`client`代码被打包进了你的包(bundle)中，以此来与`webpack-dev-server`进行`websocket`通讯，从而完成自动编译打包、页面自动刷新的功能。

3、但是，每一个入口文件都会被插入上述的一段脚本，使得打包后的bundle文件很臃肿。

![websocket](./doc-pic/websocket.jpg "webpack-dev-server 相关websocket截图")

`webpack-dev-server: ^2.9.7` 不要高于这个版本，否则会报错