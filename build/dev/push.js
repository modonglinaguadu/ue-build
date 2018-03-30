var util = require('util');
var stream = require('stream');
var path = require('path');

module.exports = function(type) {
	type = type || 'all';

	function Push() {
		stream.Transform.call(this);
	}

	util.inherits(Push, stream.Transform);

	Push.prototype.dealHtml = function(data) {
		if (process.env.NODE_ENV === 'pro') {
			var beautify_html = require('js-beautify').html;

			var option = {
				"indent_size": 4,
				"indent_char": " ",
				"indent_with_tabs": false,
				"eol": "\\n",
				"end_with_newline": false,
				"indent_level": 0,
				"preserve_newlines": true,
				"max_preserve_newlines": 10,
				"space_in_paren": false,
				"space_in_empty_paren": false,
				"jslint_happy": false,
				"space_after_anon_function": false,
				"brace_style": "collapse",
				"break_chained_methods": false,
				"keep_array_indentation": false,
				"unescape_strings": false,
				"wrap_line_length": 0,
				"e4x": false,
				"comma_first": false,
				"operator_position": "before-newline"
			}

			this.data.jq_html = beautify_html(this.data.jq_html, option);

			return {
				type: 'html',
				src: path.join(this.data.statSrc.projectSrc, this.data.options.outputName),
				name: this.data.options.htmlName + '.html',
				content: this.data.jq_html
			};
		} else if (process.env.NODE_ENV === 'dev') {
			return {
				type: 'html',
				src: this.data.statSrc.cacheSrc,
				name: this.data.options.htmlName + '.html',
				content: this.data.jq_html
			};
		}


	}

	Push.prototype.dealScss = function() {
		if (process.env.NODE_ENV === 'pro') {
			return {
				type: 'css',
				src: path.join(this.data.statSrc.projectSrc, this.data.options.outputName),
				name: this.data.options.scssName + '.css',
				content: this.data.css
			};
		} else if (process.env.NODE_ENV === 'dev') {
			return {
				type: 'css',
				src: this.data.statSrc.cacheSrc,
				name: this.data.options.scssName + '.css',
				content: this.data.css
			};
		}

	}

	Push.prototype.sourceMap = function() {
		if (process.env.NODE_ENV === 'pro') {
			return {
				type: 'sourceMap',
				src: path.join(this.data.statSrc.projectSrc, this.data.options.outputName),
				name: this.data.options.scssName + '.css.map',
				content: this.data.sourceMap
			}
		} else if (process.env.NODE_ENV === 'dev') {
			return {
				type: 'sourceMap',
				src: this.data.statSrc.cacheSrc,
				name: this.data.options.scssName + '.css.map',
				content: this.data.sourceMap
			}
		}

	}

	Push.prototype._transform = function(chunk, encoding, done) {
		this.data = JSON.parse(chunk);
		if (type === 'html') {
			//push html
			this.push(JSON.stringify(this.dealHtml()));
		} else if (type === 'css') {
			//push css
			this.push(JSON.stringify(this.dealScss()));
			//push sourceMap
			this.push(JSON.stringify(this.sourceMap()));
		} else {
			//push html
			this.push(JSON.stringify(this.dealHtml()));
			//push css
			this.push(JSON.stringify(this.dealScss()));
			//push sourceMap
			this.push(JSON.stringify(this.sourceMap()));
		}


	}

	return new Push();


}