var bs = require("browser-sync").create();
var path = require('path');
var fs = require('fs');

//stream
var chunk = require('../build/dev/chunk');
var dealHtml = require('../build/dev/dealHtml');
var dealScss = require('../build/dev/dealScss');
var push = require('../build/dev/push');
var create = require('../build/dev/create');
var createStream = require('../build/dev/createStream');

module.exports = function(dealHtmlStream, options) {

	var res;
	dealHtmlStream.on('ok', function(data) {
		res = data;
	});

	var watchHtmlSrc = path.join(process.cwd(), '**/*.html');
	bs.watch(watchHtmlSrc, function(event, file) {
		if (event === "change") {
			console.log('change');

			var dhs = dealHtml();
			var c = create();

			dhs.on('ok', function(data) {
				res = data;
			});

			var flag = 0;
			c.on('ok', function() {
				flag++;
				if (flag === 3) {
					bs.reload();
				}
			});

			fs.createReadStream(path.join(process.cwd(), options.htmlName + ".html"))
				.pipe(chunk())
				.pipe(dhs)
				.pipe(dealScss())
				.pipe(push())
				.pipe(c);
		}
	});
	var watchCssSrc = path.join(process.cwd(), '**/*.css');
	bs.watch(watchCssSrc, function(event, file) {
		if (event === "change") {
			bs.reload("*.css");
		}
	});

	var watchScssSrc = path.join(process.cwd(), '**/*.scss');
	bs.watch(watchScssSrc, function(event, file) {
		if (event === 'change') {
			var c = create();
			var flag = 0;
			c.on('ok', function() {
				flag++;
				if (flag === 2) {
					console.log(flag);
					bs.reload("*.css");
				}
			});
			var read = createStream(res);
			read.pipe(dealScss())
				.pipe(push('css'))
				.pipe(c);
		}
	});

	var watchJsSrc = path.join(process.cwd(), '**/*.js');
	bs.watch(watchJsSrc, function(event, file) {
		if (event === 'change') {
			bs.reload();
		}
	});

	bs.init({
		port: global.port,
		proxy: "localhost:3040/" + options.htmlName + '.html',
		online: false,
		open: 'local'
	});
}