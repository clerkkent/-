# 简介
一个react+redux+stylus+webpack+antd+mui的框架

# 安装
npm install
如果安装失败  那么推荐使用淘宝的注册源 直接运行 npm install -g cnpm --registry=https://registry.npm.taobao.org

# 启动
npm start

# 打包部署
npm run build
打包之后会再当目录生成一个dist文件夹  index.html就是入口文件

# src项目结构描述
* actions 存储redux的Action
* components 存储组件
* containers 容器,调用组件组织页面
* imgs 存储图片
* pages 存储对应路由的页面
* plugins 插件
* reducers 存储redux的reducer
* router 路由配置
* stylus stylus存储目录
* app.js 入口js
* index.html 入口html页面

# 其他
* react 中文官网 [http://www.react-cn.com/](http://www.react-cn.com/)
* 使用antd为了减少项目大小，使用 babel-plugin-import [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)
* stylus参考网址 [http://stylus-lang.com/](http://stylus-lang.com/)
* antdesign参考网址 [https://ant.design/index-cn](https://ant.design/index-cn)
* redux中文文档 [http://www.redux.org.cn/](http://www.redux.org.cn/)
* react-router参考网址 [https://reacttraining.com/react-router/web/guides/quick-start](https://reacttraining.com/react-router/web/guides/quick-start)
* react-router v4中文地址 [https://reacttraining.cn](https://reacttraining.cn)
* redux-actions [https://github.com/acdlite/redux-actions](https://github.com/acdlite/redux-actions)
* webpack中文文档地址 [https://doc.webpack-china.org](https://doc.webpack-china.org/)
* ant design mobile [https://mobile.ant.design/index-cn](https://mobile.ant.design/index-cn)
* [antd mobile 0.8 以上版本「高清」方案设置](https://github.com/ant-design/ant-design-mobile/wiki/antd-mobile-0.8-%E4%BB%A5%E4%B8%8A%E7%89%88%E6%9C%AC%E3%80%8C%E9%AB%98%E6%B8%85%E3%80%8D%E6%96%B9%E6%A1%88%E8%AE%BE%E7%BD%AE)
* mui 文档 [http://dev.dcloud.net.cn/mui/](http://dev.dcloud.net.cn/mui/)
