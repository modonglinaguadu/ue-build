var p = require('../store/store');
require('should');

describe('test store', function() {
	it('test getPath function', function() {
		var res = p.getPath();
		res.should.be.Object();
		res.should.have.property('gan_ji');
		res.should.have.property('dmui');
		res.should.have.property('static');
	});

	it('test setPath function', function() {
		var obj = {
			gan_ji: 'aaa',
			static: 'haha',
			dmui: 'lolo'
		};
		var res = p.setPath(obj);
		res.should.have.property('n', true);
	})
});