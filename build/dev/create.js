var util = require('util');
var stream = require('stream');
var path = require('path');
var fs = require('fs');

module.exports = function() {
	function CreateServer(bs) {
		stream.Writable.call(this);
	}

	util.inherits(CreateServer, stream.Writable);


	CreateServer.prototype._write = function(chunk, encoding, done) {
		var data = JSON.parse(chunk);
		var write = fs.createWriteStream(path.join(data.src, data.name));
		var res = write.write(data.content);
		var self = this;
		write.on('finish', function() {
			self.emit('ok');
		});
		write.end();
		done();
	}

	return new CreateServer();
}