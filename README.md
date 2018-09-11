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
- .babelrc中
```
{
  "presets": [
    ["es2015", {"loose": true}],
    "react"
  ]
}
```

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

## 第三次提交

模块热更新和webpack-dev-server自动刷新的区别

*react hot loader官方解释*

>React Hot Loader is a plugin that allows React components to be live reloaded without the loss of state. It works with Webpack and other bundlers that support both Hot Module Replacement (HMR) and Babel plugins.

模块热更新后state不会丢失，但是不同的webpack-dev-server相当于浏览器清除缓存的的刷新，state是不会保存的

*模块热更新新增的重要代码*

- webpack.config.client.js中
```
config.plugins.push(new webpack.HotModuleReplacementPlugin())

devServer中增加配置项
hot: true
```
- .babelrc中
```
"plugins": [
  "react-hot-loader/babel"
]
```
- app.js中
```
import { AppContainer } from 'react-hot-loader'

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const nextApp = require('./views/App').default
    render(nextApp)
  })
}
```

用`webpack-dev-server`启动的时候，一定要将根目录下的`dist`目录删除，否则，`webpack`就会直接去找到这个文件

## 第四次提交

*基本服务端渲染*

思路就是，node拿到html内容直接返回给前端，注意：服务端渲染的时候，`dist`文件中的内容都要提前生成好，也就是说要执行以下命令：

```
"build:client": "webpack --config build/webpack.config.client.js",
"build:server": "webpack --config build/webpack.config.server.js",
```
这样之后会生成`dist`目录已经相关的内容，然后

```
"dev:server": "node server/server.js",
```

localhost:8888启动，可以看到效果

```
const app = express()

const serverEntry = require('../dist/server-entry').default
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
console.log(12, template)
app.use('/public', express.static(path.join(__dirname, '../dist')))
app.get('*', function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry)
  console.log(16, appString)
  res.send(template.replace('<!--app-->', appString))
})
```