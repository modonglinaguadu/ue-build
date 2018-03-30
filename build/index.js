var path = require('path');
module.exports = function(env, port) {
	global.port = port || 3050;
	var runSrc = process.cwd();
	var config = require(path.join(runSrc, 'ueb.config.js'));
	if (env == 'dev') {
		process.env.NODE_ENV = 'dev';

	} else if (env == 'pro') {
		process.env.NODE_ENV = 'pro';
	}
	require('./dev/index');
}