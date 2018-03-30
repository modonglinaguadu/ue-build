var Promise = require('bluebird');
var path = require('path');
var file = require('./file');
module.exports = function(req) {
	return new Promise(function(resolve, reject) {
		var pjn = req.query.pjn,
			pjt = req.query.pjt,
			htmlName = req.query.htmlName,
			scssName = req.query.scssName,
			// imgSrc = dealSrc(req.query.imgSrc),
			outName = req.query.outName,
			cssMin = dealBoolean(req.query.cssMin);

		// function dealSrc(src) {
		// 	return path.normalize(src).replace(/\\/gi, '/');
		// }

		function dealBoolean(inp) {
			if (inp == 'yes') {
				return true;
			} else if (inp == 'no') {
				return false;
			}
		}

		var str = 'module.exports={\n ' +
			'\t"projectType":' + '"' + pjt + '",\n' +
			'\t"outputName":' + '"' + outName + '",\n' +
			'\t"htmlName":' + '"' + htmlName + '",\n' +
			'\t"scssName":' + '"' + scssName + '",\n' +
			// '\t"imgSrc":' + '"' + imgSrc + '",\n' +
			'\t"cssMin":' + cssMin + ',\n' +
			'};';

		//创建文件夹
		file.createPjCat(pjn, htmlName, scssName, str, pjt).then(function() {
			resolve();
		}).catch(function(err) {
			console.error(err);
			reject(err);
		})
	});

}