# CyanMapleDesign

![CyanMapleDesign logo](http://xuqiang.cc/wp-content/uploads/2018/03/cmlogo.png)

## 项目目录
```
├── CMUI                     
├── build
├── demo                      //实际开发目录
│   ├── headComponent
│   ├── img
│   ├── index
│   └── tabbar
├── dist                      //编译后文件
├── node_modules              //依赖模块
└── src                       //库文件
    ├── cyan                  //UI组件库(CyanMapleDesign)
    ├── libs                  //第三方工具库
    ├── maple                 //JS组件库（CyanMapleDesign）
    └── pageComponent         //特殊组件库（业务定制组件）
```
        
## 快速开始
### Install
```console
npm install 
```
### start
```console
npm start 
```
## 可能出现的问题
打包或编译失败：
1.全局安装打包工具parcel
2.删除node_modules文件夹
3.删除package.json中的devDependencies中的内容
4.安装autoprefixer和node-sass:npm i node-sass autoprefixer -D
5.直接执行npm run start,第一次执行需要几分钟时间来安装依赖并生成缓存，之后速度回很快
## 贡献
欢迎给我们提issue或PR。

## 联系
- [Blog](http://node.51tiangou.com/)

## LICENSE
[MIT](LICENSE)