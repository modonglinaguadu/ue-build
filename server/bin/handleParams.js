var file = require('../../file/file');
var createProject = require('../../file/createProject');
var Promise = require('bluebird');
module.exports = function(req) {
	return new Promise(function(resolve, reject) {
		var result = {
			n: false,
			detail: ''
		};

		//get arguments
		var pjn = req.query.pjn;

		file.hasFile(pjn).then(function() {
			createProject(req).then(function() {
				result.n = true;
				result.detail = '';
				resolve(result);
			}).catch(function() {
				result.n = false;
				result.detail = '项目搭建失败，具体原因请查看doc';
				reject(result);
			})
		}).catch(function(err) {
			result.n = false;
			result.detail = err;
			reject(result);
		});
	});
}