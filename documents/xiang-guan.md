# 相关

使用前，我们需要确认三个相关项目\(ganji\_sta,static,dmui\)是否准备完毕。

### ganji\_sta

* 如果电脑中没有该项目，需clone下来一个

  $ git clone git@git.corp.doumi.com:doumi/ganji\_sta.git

### dmui

* 如果电脑中没有该项目，需要clone下来一个

  $ git clone git@git.corp.doumi.com:doumi/DMUI.git

* 项目ui组件放在dmui项目的uebTemp文件夹中，请确认该文件夹存在，而且为了您能使用最新的ui组件，请及时pull更新

### static

* 如果电脑中没有该项目，需要clone下来一个

  $ git clone git@git.corp.doumi.com:doumi/static.git

* 该项目是wap端的工程化项目，其使用是需要打包出来才能使用，所以您需要做一下几步工作

可参考[wiki](http://wiki.corp.doumi.com/wiki/Wap端static总结)的框架部署部分

1. 第一步:全局安装grunt。 执行 `npm install grunt -g` 和 `npm install grunt-cli -g`
2. 第二步:到static项目中，安装依赖包。执行 `npm install -d`
3. 第三步:项目中还缺少一个包。执行 `npm install node-sass -d`
4. 第四步:执行 `grunt build` ，看是否有错误，如果还有依赖包没安装成功，请单独安装
5. 第五步:如果顺利执行完毕，那项目根目录会出现一个build文件夹，进入该文件夹，随便打开一个js文件，如果里面有代码，那准备工作就全部准备完成了，如果全部js文件中内容是undefined，那说明还有问题，请看第六步解决。
6. 第六步:回到根目录,按以下路径打开:static\node\_modules\g-builder\builders\uglify.js

原来是这样的

![](/assets/uglifyjs.png)

然后重新执行 `grunt build` 应该就可以了，以后如果更新资源，记得还需要重新打包。  
如果还有问题，找 @UE-莫东霖

### sublime

* ueb开发环境下是热部署，可能是内存存储方式的原因，导致无法动态编译sass，所以使用sublime的需要做一点修改\(其他编译器还不知道是否有影响\)。

打开sublime，打开菜单栏中Preferences -&gt; settings

在settings-User栏中 添加`"atomic_save": true`

![](/assets/sublime.png)


### sublime自定义标签tab补全

ueb中我们有几个自定义标签,如`<dmui>` `<slot>`,为了我们书写能更快捷，我们需要为我们的编辑工具添加该标签的自动补全功能。下面是sublime的设置方式，其他编辑器的需要自己去百度研究。

1.首先得确认sublime中安装了Emmet插件。

![](/assets/emmet.png)

2.然后打开Emmet的setting。

![](/assets/emmet0.png)

3.把下面的代码复制进入，然后重启sublime就可以了。


	{
		"snippets": {
			"html": {
				"abbreviations": {
					"dmui": "<dmui></dmui>",
					"slot":"<slot></slot>"
				}
			}
		}
	}

4.以后您也可以在里面添加自己所需的模板了。