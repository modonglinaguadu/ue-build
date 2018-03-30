var express = require('express');
var app = express();
var path = require('path');
var s = require('../../store/store');

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/msg', function(req, res) {
	require('./handleInit')(req).then(function() {
		var obj = {
			'gan_ji': req.query.gan_src.replace(/\\/g, '/'),
			'static': req.query.sta_src.replace(/\\/g, '/'),
			'dmui': req.query.dmui.replace(/\\/g, '/')
		};
		var result = s.setPath(obj);
		var a = 'http://localhost:3040/';
		if (result.n) {
			require('./handleJs')(a, a).then(function() {
				res.send(result);
				process.exit(0);
			}).catch(function(err) {
				throw new Error(err);
				res.send({
					n: false,
					detail: '修改ganji.js文件和static.js文件错误，请重新init，详情请看指令窗口'
				});
			});

		} else {
			res.send(result);
		}
	}).catch(function(result) {
		res.send(result);
	});

})

var server = app.listen(3050, function() {
	var host = 'localhost';
	var port = server.address().port;

	console.log('create project app listening at http://%s:%s/init.html', host, port);
});

module.exports = server;