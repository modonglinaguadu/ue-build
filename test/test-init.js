require('should');
var request = require('supertest');

describe('test init server', function() {
	var server;

	beforeEach(function() {
		delete require.cache[require('../server/bin/createInitServer')];
		server = require('../server/bin/createInitServer');
	});

	afterEach(function() {
		server.close();
	});

	it('test /msg which should return true', function(done) {
		request(server)
			.get('/msg')
			.query({
				sta_src: 'F:/workSpace/static',
				gan_src: 'F:/workSpace/ganji_sta',
				dmui: 'F:/workSpace/DMUI',
			})
			.expect(200)
			.expect(function(res) {
				var json = JSON.parse(res.text);
				json.should.have.property('n', true);
			})
			.end(done);
	});


});