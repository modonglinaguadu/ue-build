## 版本说明

***1.0.0版本为长久可用版本***

> v 1.0.0

* 项目提交上github
* 添加使用文档

> v 0.1.9

* 优化组件嵌套，使用自定义尾递归防止内存溢出
* 项目的build过程改成流式(stream)的方式(类似gulp)
* 修复dmui标签上属性没有添加到组件中的bug
* 添加`<text></text>`标签

> v 0.1.8

* 取消原来`ueb dev -p`指令，改成直接在后面添加端口号

> v 0.1.7

* 修复和更新快捷指令

> v 0.1.6

* 测试node-sass自动根据node版本来安装相应的版本

> v 0.1.5

* 修复组件嵌套不编译问题
* 新增快捷指令
* 去掉图片路径处理功能，统一以ganji\_sta项目为路径
* 新增项目生产环境打包后的html页面中引入css的功能
* 项目创建后html模板分为web和pc两种

> v 0.1.4

* 修复指令显示版本不正确问题

> v 0.1.3

* 新增jshint检查
* 修复dmui标签内text未添加到slot中的问题

> v 0.1.2

* 新增业务组件功能
* 新增支持热部署监控多层文件

> v 0.1.1

* 修复node-sass包缺失问题

> v 0.1.0

* 项目初始化
* 项目创建
* 项目开发环境
* 热部署
* ue组件
* js环境嵌入
* scss
* 图片路径
* 项目生产打包
* css压缩
* 图片路径切换