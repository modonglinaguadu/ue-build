var fs = require('fs');
var path = require('path');
var runSrc = process.cwd();
var ncp = require('ncp').ncp;
ncp.limit = 16;
var pjSrc = '';
var Promise = require('bluebird');
module.exports = {
	hasFile: function(name) {
		var fileName = name || 'UEB';
		var fileSrc = path.join(runSrc, fileName);
		return new Promise(function(resolve, reject) {
			fs.exists(fileSrc, function(sta) {
				if (sta) {
					reject('当前目录中已存在该文件名(项目名)');
				} else {
					resolve(true);
				}
			});
		});
	},
	hasCat: function(src, project) {
		return new Promise(function(resolve, reject) {
			fs.stat(src, function(err) {
				if (err) {
					reject(project + '项目路径不正确');
				} else {
					resolve(true);
				}
			});
		});
	},
	createFolder: function(src) {
		return new Promise(function(resolve, reject) {
			fs.mkdir(src, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},
	createFile: function(name, content) {
		var cont = content || '';
		var src = path.join(pjSrc, name);
		return new Promise(function(resolve, reject) {
			fs.writeFile(src, cont, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},
	deleteFile: function(src) {
		return new Promise(function(resolve, reject) {
			fs.unlink(src, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		})
	},
	createPjCat: function(name, htmlName, scssName, str, pjt) {
		var self = this;
		return new Promise(function(resolve, reject) {
			pjSrc = path.join(runSrc, name);
			self.createFolder(pjSrc).then(function() {
				if (pjt === 'web') {
					var temp = fs.readFileSync(path.join(__dirname, '..', 'source', 'template_web.html')).toString();
				} else if (pjt === 'pc') {
					var temp = fs.readFileSync(path.join(__dirname, '..', 'source', 'template_pc.html')).toString();
				}
				Promise.all([self.createFile(htmlName + '.html', temp), self.createFile(scssName + '.scss'), self.createFile('ueb.config.js', str)])
					.then(function() {
						resolve();
					}).catch(function(err) {
						reject(err);
					});
			}).catch(function(err) {
				reject(err);
			});
		});
	},
	clearCache: function(src) {
		var files = [];
		var i = 0;
		var filesName = Array.from(fs.readdirSync(src));
		var self = this;
		for (i; i < filesName.length; i++) {
			files.push(self.deleteFile(path.join(src, filesName[i])));
		}
		return Promise.all(files)
	},
	createCache: function(src, cont) {
		return new Promise(function(resolve, reject) {
			fs.writeFile(src, cont, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		})
	},
	createDist: function(name) {
		var src = path.join(process.cwd(), name);
		var res = fs.existsSync(src);
		if (!res) {
			fs.mkdirSync(path.join(src));
		}
	}
}