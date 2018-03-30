var path = require('path');
var options = require(path.join(process.cwd(), 'ueb.config.js'));
var runSrc = process.cwd();
var fs = require('fs');
var file = require('../../file/file');
//stream
var chunk = require('./chunk');
var dealHtml = require('./dealHtml');
var dealScss = require('./dealScss');
var push = require('./push');
var create = require('./create');


if (process.env.NODE_ENV === 'pro') {
	fs.stat(path.join(process.cwd(), options.outputName), function(err, stat) {
		if (err) {
			fs.mkdir(path.join(process.cwd(), options.outputName));
		}
	});
} else if (process.env.NODE_ENV === 'dev') {
	file.clearCache(path.join(__dirname, '..', '..', 'source', 'cache'));
}



var dealHtmlStream = dealHtml();

fs.createReadStream(path.join(runSrc, options.htmlName + ".html"))
	.pipe(chunk())
	.pipe(dealHtmlStream)
	.pipe(dealScss())
	.pipe(push())
	.pipe(create());


if (process.env.NODE_ENV === 'dev') {



	var store = require('../../store/store');
	var obj = store.getPath();

	require('../../server/bin/createProjectServer')(options.htmlName, options.projectType, obj);
	require('../../refresh/index')(dealHtmlStream, options);
}