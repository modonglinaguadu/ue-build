require('should');
var request = require('supertest');

describe('test init server', function() {
	var url = '';
	var server;
	beforeEach(function() {
		delete require.cache[require('../server/bin/createServer')];
		server = require('../server/bin/createServer');
		url = '';
	});

	afterEach(function() {
		server.close();
	});

	it('response to /msg when the sta_src attribute is error', function(done) {
		url = '/msg'
		request(server)
			.get(url)
			.query({
				pjn: 'dada',
				pjt: 'web',
				sta_src: 'F:/workSpace/staticx',
				gan_src: 'F:/workSpace/ganji_sta',
				dmui: 'F:/workSpace/DMUI',
				htmlName: 'index',
				scssName: 'index',
				imgSrc: 'http://sta.doumi.com/src/image/',
				outName: 'dist',
				hashV: 'no',
				cssMin: 'no'
			})
			.expect(200)
			.expect(function(res) {
				var json = JSON.parse(res.text);
				json.should.have.property('n', false);
			})
			.end(done);
	});
	it('response to /msg when gan_src attribute is error', function(done) {
		url = '/msg'
		request(server)
			.get(url)
			.query({
				pjn: 'dada',
				pjt: 'web',
				sta_src: 'F:/workSpace/static',
				gan_src: 'F:/workSpace/ganji_stax',
				dmui: 'F:/workSpace/DMUI',
				htmlName: 'index',
				scssName: 'index',
				imgSrc: 'http://sta.doumi.com/src/image/',
				outName: 'dist',
				hashV: 'no',
				cssMin: 'no'
			})
			.expect(200)
			.expect(function(res) {
				var json = JSON.parse(res.text);
				json.should.have.property('n', false);
			})
			.end(done);
	});
	it('response to /msg when dmui attribute is error', function(done) {
		url = '/msg'
		request(server)
			.get(url)
			.query({
				pjn: 'dada',
				pjt: 'web',
				sta_src: 'F:/workSpace/static',
				gan_src: 'F:/workSpace/ganji_stax',
				dmui: 'F:/workSpace/DMUIx',
				htmlName: 'index',
				scssName: 'index',
				imgSrc: 'http://sta.doumi.com/src/image/',
				outName: 'dist',
				hashV: 'no',
				cssMin: 'no'
			})
			.expect(200)
			.expect(function(res) {
				var json = JSON.parse(res.text);
				json.should.have.property('n', false);
			})
			.end(done);
	});
	it('response to /', function(done) {
		request(server)
			.get('/')
			.expect(200)
			.expect(function(res) {
				res.text.should.be.String();
			})
			.end(done)
	});
});