var stream = require('stream');
var util = require('util');

module.exports = function(res) {

	function CreateStream() {
		stream.Readable.call(this);
	}

	util.inherits(CreateStream, stream.Readable);

	CreateStream.prototype._read = function() {
		this.push(JSON.stringify(res));
		this.push(null);
	}

	return new CreateStream();
}