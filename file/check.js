var JSHINT = require('jshint').JSHINT;
var colors = require('colors/safe');
var path = require('path');
var fs = require('fs');
module.exports = function(name) {
	if (!name.match(/\.js/)) {
		name = name + '.js';
	}
	var src = path.join(process.cwd(), name);
	var options = {
		"predef": [
			"GJ",
			"define",
			"G",
			"require",
			"exports",
			"module",
			"JSON",
			"console"
		],
		"esversion": 6,
		"indent": 4,
		"bitwise": true,
		"eqeqeq": true,
		"immed": true,
		"newcap": true,
		"noarg": true,
		"noempty": true,
		"nonew": true,
		"undef": true,
		"unused": true,
		"quotmark": "single",
		"boss": true,
		"debug": true,
		"eqnull": true,
		"evil": true,
		"expr": true,
		"loopfunc": true,
		"scripturl": true,
		"shadow": true,
		"jquery": true,
		"validthis": true,
		"browser": true,
	}

	fs.readFile(src, (err, data) => {
		if (err) throw err;
		data = data.toString();
		var arr = data.split('\r\n');
		JSHINT(arr, options);
		var doc = colors.green('[' + name + '] ');
		var str = "";
		var errors = JSHINT.data().errors;
		if (errors) {
			errors.map((obj) => {
				var line = colors.yellow(' ( line: ' + obj.line + ' ) ');
				var reason = ' error: ' + colors.red(obj.reason + '\r\n');
				var string = doc + line + reason;
				str += string;
			});
			console.error(str);
		}
	})
}