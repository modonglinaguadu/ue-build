var stream = require('stream');
var util = require('util');
var fs = require('fs');
var path = require('path');
var sass = require('node-sass');

module.exports = function() {


	function DealScss() {
		stream.Transform.call(this);
	}

	util.inherits(DealScss, stream.Transform);

	DealScss.prototype.init = function() {
		if (process.env.NODE_ENV === 'pro') {
			this.data.statSrc.cssOutputSrc = path.join(this.data.statSrc.projectSrc, this.data.options.outputName, this.data.options.scssName + '.css');
			this.data.statSrc.sourceMapSrc = path.join(this.data.statSrc.projectSrc, this.data.options.outputName, this.data.options.scssName + '.css.map');
		} else if (process.env.NODE_ENV === 'dev') {
			this.data.statSrc.cssOutputSrc = path.join(this.data.statSrc.cacheSrc, this.data.options.scssName + '.css');
			this.data.statSrc.sourceMapSrc = path.join(this.data.statSrc.cacheSrc, this.data.options.scssName + '.css.map');
		}
	}

	DealScss.prototype.handle = function() {
		var inp = '';
		this.data.scssSrc.map(function(item) {
			item = item.replace(/\\/g, "/");
			var _import = " @import \"" + item + "\"; ";
			inp += _import;
		});

		var outputStyle = 'expanded';
		if (process.env.NODE_ENV === 'pro' && this.data.options.cssMin) {
			outputStyle = 'compressed';
		}
		var self = this;
		var _css = sass.renderSync({
			data: inp,
			outputStyle: outputStyle,
			outFile: self.data.statSrc.cssOutputSrc,
			sourceMap: true,
		});

		this.data.css = _css.css.toString('utf8');
		this.data.sourceMap = _css.map.toString('utf8');
	}

	DealScss.prototype._transform = function(chunk, encoding, done) {
		this.data = JSON.parse(chunk);
		//init
		this.init();
		//handle
		this.handle();

		this.push(JSON.stringify(this.data));
		done();
	}

	return new DealScss();


}