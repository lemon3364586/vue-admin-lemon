# vue-admin-lemon


### 前言

vue-admin-lemon，基于vue3，vite，TypeScript，Element-Plus…的简单后台管理模板，利用业余时间开发

项目开发过程中借鉴了其他开源模板，感谢开源社区的各位大佬

#### 为什么写这个？

-   学习vue3，vite，TypeScript…等vue3周边生态
-   开了开源社区上，已经有很多开源后台管理模板了，他们功能齐全，设计精美，不是我个小菜鸡能比的。但同样的，它们太庞大了，而在实际开发过程中，其实很多功能很少会用到，所以，本着学习的态度，自己抽时间手搓一个，一方面学习新技术，另一方面也给自己后续工作提供些许帮助

### 技术栈

- Vue
- Vite
- TypeScript
- ElelmentPlus
- Axios
- Es6+
- Pinia
- I18n
- ...

### 目录说明

```
env 环境变量
mock mock.js数据
public
types 全局类型定义
src
  ├api 				api接口
  ├assets			静态资源
  ├components		全局组件
  ├config			全局配置
  ├dependencies		依赖相关引用注入等
  ├directives		自定义指令
  ├i18n				国际化
  ├layout			页面布局
  ├plugins			自定义插件
  ├router			路由
  ├styles			全局样式
  ├types			类型定义
  ├utils			自定义工具函数
  ├views			页面
  	├dashboard		首页
  	├error			错误页
  	├login			登录
  	├platform		平台相关其他页面都可放在此文件夹下
  		├about		关于平台
  	├profile		用户相关(个人中心)
  App.vue
  main.js  
```

### 在线预览

暂无

### 文档

……编写中

### 项目功能

详见文档（目前还没有，手动滑稽.jpg）…

### 使用

```shell
// 克隆项目
git clone https://github.com/lemon3364586/vue-admin-lemon.git

// 安装依赖
// 建议更换淘宝镜像源，可大幅缩短安装时间，更可避免安装失败
npm config set registry https://registry.npmmirror.com
npm i

// 启动
npm run dev

// 打包发布
npm run build

// 代码检查
npm run lint

// 格式化src下所有指定类型文件
npm run format
```
