# “心灵绿野”客户端

本项目为心理咨询平台“心灵绿野”的小程序客户端

## 相关技术和依赖

uni-app

vue3

ts

vite

yarn

eslint

prettier

## 运行步骤

##### 1.安装依赖

```
yarn install
```

##### 2.运行

```
yarn dev:mp-weixin
```

##### 3.用微信开发者工具打开/dist/dev/mp-weixin

## 注意

如果采用如下方式运行，如果出现报错“找不到app.json”:

![image](../../source/images/README/235841050-cd6a6972-2dd2-49c8-aead-d085111554b6.png)


可以右击项目目录“重新识别项目类型”:

![image](../../source/images/README/235841064-23a1b873-531f-4d95-8a7c-eca27e47300f.png)

## 目录结构

apis存放请求后端数据的接口代码，当页面要请求后端数据时，引入对应文件的对应模块

![image](../../source/images/README/235841075-f374f780-2bbb-436e-b671-0406db800043.png)

common存放公共样式文件：

![image](../../source/images/README/235841085-fe2ec1d1-0a7c-4e32-84f8-d9deb4bdc0be.png)

utils存放相关工具文件，例如一些常量和一些图片和图标的文件路径：

![image](../../source/images/README/235841096-2caf576c-807f-4999-b704-781506877d80.png)

components中的third-party存放第三方组件，components的其余地方存放自定义组件：

![image](../../source/images/README/235841108-2ac8d8de-c27c-4d79-9dff-97e535e9b6fc.png)