var file = require('../../file/file');
var Promise = require('bluebird');
module.exports = function(req) {
	return new Promise(function(resolve, reject) {
		var result = {
			n: false,
			detail: ''
		};
		var sta_src = req.query.sta_src,
			gan_src = req.query.gan_src,
			dmui = req.query.dmui;


		Promise.all([file.hasCat(sta_src, '本地static'), file.hasCat(gan_src, '本地ganji_sta'), file.hasCat(dmui, '本地DMUI')])
			.then(function() {
				result.n = true;
				result.detail = '';
				resolve(result);
			})
			.catch(function(err) {
				result.n = false;
				result.detail = err;
				reject(result);
			});
	});
}