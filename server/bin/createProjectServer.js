var express = require('express');
var app = express();
var path = require('path');

module.exports = function(name, pjt, obj) {
	app.use(express.static(path.join(__dirname, '..', '..', 'source', 'cache')));
	app.use(express.static(path.join(__dirname, '..', '..', 'source')));
	app.use(express.static(process.cwd()));
	//image static path
	app.use(express.static(path.join(obj.gan_ji)));
	if (pjt === 'web') {
		app.use(express.static(obj.static));
	}



	var server = app.listen(3040, function() {
		var host = 'localhost';
		var port = server.address().port;

		console.log('项目开启时间较长，请稍后。。。。');
	});
}