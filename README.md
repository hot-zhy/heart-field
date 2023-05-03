### “心灵绿野”客户端

本项目为心理咨询平台“心灵绿野”的小程序客户端

#### 相关技术和依赖

uni-app

vue3

ts

vite

yarn

eslint

prettier

#### 运行步骤

##### 1.安装依赖

```
yarn install
```

##### 2.运行

```
yarn dev:mp-weixin
```

##### 3.用微信开发者工具打开/dist/dev/mp-weixin

#### 注意

如果采用如下方式运行，如果出现报错“找不到app.json”:

![image-20230503133934341](../../source/images/README/image-20230503133934341.png)

可以右击项目目录“重新识别项目类型”:

![image-20230503134020190](../../source/images/README/image-20230503134020190.png)

#### 目录结构

apis存放请求后端数据的接口代码，当页面要请求后端数据时，引入对应文件的对应模块

![image-20230503134350100](../../source/images/README/image-20230503134350100.png)

common存放公共样式文件：

![image-20230503134528958](../../source/images/README/image-20230503134528958.png)

utils存放相关工具文件，例如一些常量和一些图片和图标的文件路径：

![image-20230503134633329](../../source/images/README/image-20230503134633329.png)

components中的third-party存放第三方组件，components的其余地方存放自定义组件：

![image-20230503134809249](../../source/images/README/image-20230503134809249.png)

