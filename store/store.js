var fs = require('fs');
var path = require('path');
var storeSrc = path.join(__dirname, 'path.json');
module.exports = {
	getPath: function() {
		//retrieve the data
		var json = fs.readFileSync(storeSrc, 'utf8').toString();
		return JSON.parse(json);
	},
	setPath: function(obj) {
		var json = fs.readFileSync(storeSrc, 'utf8').toString();
		//set gan_ji
		json = json.replace(/("gan_ji": ").*(")/, '$1' + obj.gan_ji + '$2');
		//set static
		json = json.replace(/("static": ").*(")/, '$1' + obj.static + '$2');
		//set dmui
		json = json.replace(/("dmui": ").*(")/, '$1' + obj.dmui + '$2');
		//store the data
		var res = fs.writeFileSync(storeSrc, json, 'utf8');
		if (typeof res === 'undefined') {
			return {
				n: true,
				detail: ''
			};
		} else {
			return {
				n: false,
				detail: res
			};
		}
	}
}