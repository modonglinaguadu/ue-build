var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
module.exports = function(ganjiSrc, staticSrc) {
	return new Promise(function(resolve, reject) {
		var ganji = path.join(__dirname, '..', '..', 'source', 'js', 'ganji.js');
		var static = path.join(__dirname, '..', '..', 'source', 'js', 'g.js');

		function dealGanji(ganji) {
			return new Promise(function(resolve, reject) {
				fs.readFile(ganji, function(err, buf) {
					if (err) {
						reject(err);
					} else {
						var cont = buf.toString();
						cont = cont.replace(/(defaultServer:).*(,)/g, '$1 \"' + ganjiSrc + '\"$2');
						cont = cont.replace(/(servers\: \[).*(\],)/g, '$1\"' + ganjiSrc + '\"$2');
						fs.writeFile(ganji, cont, function(err) {
							if (err) {
								reject(err);
							} else {
								resolve();
							}
						})
					}
				});
			});
		}

		function dealStatic(static) {
			return new Promise(function(resolve, reject) {
				fs.readFile(static, function(err, buf) {
					if (err) {
						reject(err)
					} else {
						var cont = buf.toString();
						cont = cont.replace(/(var aguaUrl =).*(\+ e\.url.*;)/g, '$1 \"' + staticSrc + '/build/' + '\"$2');
						fs.writeFile(static, cont, function(err) {
							if (err) {
								reject(err);
							} else {
								resolve();
							}
						})
					}
				});
			});
		}
		Promise.all([dealGanji(ganji), dealStatic(static)])
			.then(function() {
				resolve();
			}).catch(function(err) {
				reject(err);
			})
	});
}