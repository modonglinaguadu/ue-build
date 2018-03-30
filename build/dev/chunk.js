var stream = require('stream');
var util = require('util');
var path = require('path');
var file = require('../../file/file');
var store = require('../../store/store');

module.exports = function() {

	function Chunk(opt) {
		stream.Transform.call(this, opt);
		this.data = {
			html: '',
			jq_html: '',
			css: '',
			sourceMap: '',
			options: {},
			store: {},
			statSrc: {
				cacheSrc: '',
				projectSrc: '',
				cssOutputSrc: '',
				sourceMapSrc: ''
			},
			tempName: [],
			scssSrc: [],
			jq_opt: {},
			tempList: [],
			tempListName: []
		}
		this.init();
	}

	util.inherits(Chunk, stream.Transform);

	Chunk.prototype.init = function() {
		this.data.statSrc.cacheSrc = path.join(__dirname, '..', '..', 'source', 'cache');
		this.data.statSrc.projectSrc = process.cwd();
		this.data.store = store.getPath();
		this.data.options = require(path.join(this.data.statSrc.projectSrc, 'ueb.config.js'))
		this.data.jq_opt = {
			decodeEntities: false,
			ignoreWhitespace: false,
			recognizeSelfClosing: true,
			lowerCaseAttributeNames: true,
		};
		this.getTemplate();

		return this;
	}

	Chunk.prototype.getTemplate = function() {
		var templateSrc = '';
		if (this.data.options.projectType == 'web') {
			templateSrc = path.join(this.data.store.dmui, 'src', 'uebTemp', 'web', 'config.js');
		} else if (this.data.options.projectType == 'pc') {
			templateSrc = path.join(this.data.store.dmui, 'src', 'uebTemp', 'pc', 'config.js');
		}
		this.data.tempList = require(templateSrc);
	}

	Chunk.prototype._transform = function(chunk, encoding, done) {
		this.data.html = chunk.toString('utf8');
		this.push(JSON.stringify(this.data));
		done();
	}

	return new Chunk();

}