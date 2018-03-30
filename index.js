#! /usr/bin/env node

var fs = require('fs'),
	program = require('commander'),
	c = require('child_process'),
	platform = process.platform,
	path = require('path'),
	runSrc = process.cwd(), //the path of project which running by directive
	fileSrc = __dirname; //the path of this file

var ver = '1.0.0';

program
	.version(ver)
	.option('-d, --_dev [port]', '开发环境,若要更改端口，直接在后面加端口号：ueb -d 8080')
	.option('-p, --_pro', '生产环境')
	.option('-o, --_open [web]', 'web类型包含以下几种参数:dmui,help,dn,pc-demo,wap-demo')
	.option('-i, --_init', '初始化ueb项目')
	.option('-c, --_create', '创建项目')
	.option('-j, --_jshint <name>', '对js文件进行格式检查');



function open(src) {
	if (platform == 'win32') {
		c.exec('start ' + src);
	} else if (platform == 'darwin') {
		c.exec('open ' + src);
	} else if (platform == 'linux') {
		c.exec('x-www-browser ' + src);
	}
}

program
	.command('open [web]')
	.description('web类型包含以下几种参数:dmui,help,dn,pc-demo,wap-demo')
	.action(function (web) {
		if (typeof web === 'undefined' || web === 'dmui') {
			open('http://dmui.doumi.com/');
		} else if (web === 'help') {
			open('http://dmui.doumi.com/UEBdocs/book/');
		} else if (web === 'dn') {
			open('http://dmui.doumi.com/docs/build/');
		} else if (web === 'pc-demo') {
			open('http://dmui.doumi.com/pcDemo/');
		} else if (web === 'wap-demo') {
			open('http://dmui.doumi.com/wapDemo/');
		} else {
			open('http://dmui.doumi.com/');
		}
	});

program
	.command('init')
	.description('初始化ueb项目')
	.action(function () {
		require('./server/init');
	});

program
	.command('create')
	.description('创建项目')
	.action(function () {
		require('./server/create');
	});

program
	.command('dev [port]')
	.description('开发环境,参数:[port],服务器端口号设置，默认3050,例子:ueb dev 3000 ')
	.action(function (port) {
		require('./build/index')('dev', port);
	});

program
	.command('pro')
	.description('生产环境')
	.action(function (options) {
		require('./build/index')('pro');
	});

program
	.command('jshint <name>')
	.description('对js文件进行格式检查')
	.action(function (name) {
		require('./file/check.js')(name);
	});



program.parse(process.argv);


if (program._dev) {
	if (program._dev === true) {
		require('./build/index')('dev');
	} else {
		require('./build/index')('dev', program._dev);
	}
}

if (program._pro) {
	require('./build/index')('pro');
}

if (program._open) {

	if (program._open === true) {
		var web = 'dmui';
	} else {
		var web = program._open;
	}

	if (web === 'dmui') {
		open('http://dmui.doumi.com/');
	} else if (web === 'help') {
		open('http://dmui.doumi.com/UEBdocs/book/');
	} else if (web === 'dn') {
		open('http://dmui.doumi.com/docs/build/');
	} else if (web === 'pc-demo') {
		open('http://dmui.doumi.com/pcDemo/');
	} else if (web === 'wap-demo') {
		open('http://dmui.doumi.com/wapDemo/');
	} else {
		open('http://dmui.doumi.com/');
	}
}

if (program._init) {
	require('./server/init');
}

if (program._create) {
	require('./server/create');
}

if (program._jshint) {
	require('./file/check.js')(program._jshint);
}