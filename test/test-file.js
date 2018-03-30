var path = require('path');
var _fileTest = path.join(__dirname, 'file-test');
var file = require('../file/file');
require('should');

describe('test file', function() {
	var src = '';
	beforeEach(function() {
		src = '';
	});

	// test hasFile function
	it('test hasFile function which should return error', function(done) {
		file.hasFile('test-file.js').catch(function(res) {
			res.should.equal('当前目录中已存在该文件名(项目名)');
			done();
		});
	});
	it('test hasFile function which should return true', function(done) {
		file.hasFile('test.js').then(function(res) {
			res.should.be.ok();
			done();
		});
	});

	//test hasCat function
	it('test hasCat function which should return error', function(done) {
		var errSrc = path.join(__dirname, 'file-xx');
		file.hasCat(errSrc, 'test').catch(function(res) {
			res.should.equal('test项目路径不正确');
			done();
		});
	});
	it('test hasCat function which should return true', function(done) {
		file.hasCat(_fileTest, 'test').then(function(res) {
			res.should.be.ok();
			done();
		});
	});
});