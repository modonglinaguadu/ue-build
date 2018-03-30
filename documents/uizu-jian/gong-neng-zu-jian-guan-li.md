# 组件管理

组件的管理分为两种，一种是业务组件，一种是功能组件。

### 业务组件

* 业务组件的html和css文件名需要一致。在使用是以文件名(没有后缀)为组件名。

### 功能组件

* 功能组件分为wap端和pc端。统一使用DMUI来管理。
* 组件的存放路径在DMUI下的 src/uebTemp/pc或web中
* 在书写完组件后，请到pc或web目录的config.js按要求填写您写的组件信息，如果没有填写，即算作未注册，不可调用。
* 在使用功能组件时，以组件的name属性为组件名。
* 组件name属性要唯一，不可重复。

**config.js填写**

文件结构如下

    //已当前目录为根目录
	var config = [{
		name: 'welcome',
		html: './welcome/welcome.html',
		scss: './welcome/welcome.scss'
	}];
	
	module.exports = config;

比如您添加一个button组件，您只需要加入一个对象，填写name、html、src三个属性的值即可

如下：
	
	
	//已当前目录为根目录
	var config = [{
		name: 'welcome',
		html: './welcome/welcome.html',
		scss: './welcome/welcome.scss'
	},{
		name:'button',
		html:'html路径',
		scss:'scss路径'
	}];
	
	module.exports = config;

