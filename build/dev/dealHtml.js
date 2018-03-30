var stream = require('stream');
var util = require('util');
var path = require('path');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function() {

	function DealHtml() {
		stream.Transform.call(this);
	}

	util.inherits(DealHtml, stream.Transform);

	DealHtml.prototype.addLink = function() {
		var cssSrc = '/' + this.data.options.scssName + '.css';
		var _link = this.$('\<link rel=\"stylesheet\" type="text\/css" href=\"' + cssSrc + '\"\>');
		this.$('head').append(_link);
	}

	DealHtml.prototype.addScript = function() {
		var ganji = '/js/ganji.js';
		var static = '/js/g.js';
		var _script = '';

		if (this.data.options.projectType == 'web') {
			_script = this.$('\<script type=\"text\/javascript\" src=\"' + static + '\"\>\<\/script>');
		} else if (this.data.options.projectType == 'pc') {
			_script = this.$('\<script type=\"text\/javascript\" src=\"' + ganji + '\"\>\<\/script>');
		}
		this.$('head').after(_script);
	}

	DealHtml.prototype.getTempName = function() {
		//deal with sets of templates
		this.data.tempList.map(function(item) {
			this.data.tempListName.push(item.name);
		}.bind(this));
	}

	DealHtml.prototype.getScssSrc = function() {
		var scssList = [];
		var src = '';
		this.data.tempList.map(function(item) {
			if (~this.data.tempName.indexOf(item.name)) {
				src = path.join(this.data.store.dmui, 'src', 'uebTemp', this.data.options.projectType, item.scss);
				scssList.push(src);
			}
		}.bind(this));
		scssList = scssList.concat(this.data.scssSrc);
		scssList.push(path.join(this.data.statSrc.projectSrc, this.data.options.scssName + '.scss'));
		this.data.scssSrc = scssList;
	}

	// DealHtml.prototype.properties = function(attr) {
	// 	var obj = {};
	// 	this.variable = {};
	// 	for (var prop in attr) {
	// 		if (prop.match(/vm\-.+/)) {
	// 			var p = prop.replace(/^vm\-(.+)/, '$1');
	// 			this.variable[p] = attr[prop];
	// 		} else {
	// 			obj[prop] = attr[prop];
	// 		}
	// 	}
	// 	return obj;
	// }

	// DealHtml.prototype.dealProp = function(cp) {
	// 	var self = this;
	// 	cp.children().each(function(i, el) {
	// 		console.log(self.$(this));
	// 	});
	// }

	DealHtml.prototype.handle = function() {
		function tco(f) {
			var value;
			var active = false;
			var accumulated = [];

			return function accumulator() {
				accumulated.push(arguments);
				if (!active) {
					active = true;
					while (accumulated.length) {
						value = f.apply(this, accumulated.shift());
					}
					active = false;
					return value;
				}
			};
		}
		var self = this;

		//deal with template
		var run = tco(function() {
			if (self.$('dmui').length > 0) {
				self.$('dmui').each(function(i, el) {
					//deal with templates which we were introduced
					var componentName = self.$(this).prop('is'); //template name

					if (typeof componentName !== 'undefined') {
						//add templates to list 
						if (self.data.tempName.indexOf(componentName) == -1) {
							self.data.tempName.push(componentName);
						}

						//determine whether the template in template's sets
						var flag = self.data.tempListName.indexOf(componentName);

						if (flag > -1) {
							var thisTempSrc = path.join(self.data.store.dmui, 'src', 'uebTemp', self.data.options.projectType, self.data.tempList[flag].html);
							//get the template
							var component = fs.readFileSync(thisTempSrc, 'utf-8');
						} else {
							throw new Error('未找到 ' + componentName + ' 组件');
						}
						//get template children elements
						var cp = self.$(component).contents();

						if (cp.length != 1) {
							throw new Error('template内部只能一个标签包裹');
						}
					} else {
						var componentSrc = self.$(this).prop('src');
						var cSrc = path.join(process.cwd(), componentSrc);
						var scssSrc = cSrc + '.scss';
						if (!~self.data.scssSrc.indexOf(scssSrc)) {
							self.data.scssSrc.push(scssSrc);
						}
						var component = fs.readFileSync(cSrc + '.html', 'utf8');
						var cp = self.$(component).contents();
					}

					//take properties of dmui element to template
					var attr = self.$(this).attr();
					self.$(this).removeAttr('src');
					self.$(this).removeAttr('is');

					//get properties like vm-xx
					// attr = self.properties(attr);

					var _class = cp.children().prop('class');
					cp.children().attr(attr);
					cp.children().addClass(_class);

					//slot

					//deal width html slot element
					var _childs = self.$(this).contents();

					var obj = {
						'qwertyuiopasdfghjklzxvbnm123456789': []
					};
					if (_childs.length > 0) {
						_childs.each(function(i, el) {
							var _slot = self.$(this).prop('slot');
							if (typeof _slot != 'undefined') {
								if (!obj[_slot]) {
									obj[_slot] = [];
								}
								//deal with <text>
								if (self.$(this).is('text')) {
									obj[_slot].push(self.$(this).text());
								} else {
									obj[_slot].push(self.$(this));
								}
							} else {
								//deal with <text>
								if (self.$(this).is('text')) {
									obj['qwertyuiopasdfghjklzxvbnm123456789'].push(self.$(this).text());
								} else {
									obj['qwertyuiopasdfghjklzxvbnm123456789'].push(self.$(this));
								}

							}

						});
					}
					//deal with template slot element
					var cpSlots = cp.find('slot');
					if (cpSlots.length > 0) {
						cpSlots.each(function(i, el) {
							var _name = self.$(this).attr('name');
							if (String(_name) !== 'undefined' && obj[_name]) {
								var i = 0;
								for (i; i < obj[_name].length; i++) {
									self.$(this).append(obj[_name][i]);
								}
							} else if (String(_name) === 'undefined') {
								var i = 0;
								for (i; i < obj['qwertyuiopasdfghjklzxvbnm123456789'].length; i++) {
									self.$(this).append(obj['qwertyuiopasdfghjklzxvbnm123456789'][i]);
								}
							}
							var thisChild = self.$(this).contents();
							//dismiss property of slot element
							thisChild.each(function(i, el) {
								self.$(this).removeAttr('slot');
							});

							//dismiss slot element
							self.$(this).replaceWith(thisChild);
						});
					}

					// if (Object.keys(self.variable).length > 0) {
					// 	self.dealProp(cp);
					// }

					// a reference to template body
					self.$(this).replaceWith(cp);

				});
				//deal with component includes component
				self.$ = cheerio.load(self.$.html(), self.data.jq_opt);

				return run();
			} else {
				return
			}
		})

		run();


		//deal with img-src property of img elements
		if (process.env.NODE_ENV === 'pro') {
			// $ = require('./dealImgSrc')($, imgSrc);
			self.$('head').append('<link rel="stylesheet" type="text/css" href="./' + this.data.options.scssName + '.css">');
		}
	}

	DealHtml.prototype._transform = function(chunk, encoding, done) {
		this.data = JSON.parse(chunk);
		this.$ = cheerio.load(this.data.html, this.data.jq_opt);
		if (process.env.NODE_ENV === 'dev') {
			//append link elements to html 
			this.addLink();
			//append script elements to html
			this.addScript();
		}

		//get template list name of dmui
		this.getTempName();
		//handle
		this.handle();
		//get scss src
		this.getScssSrc();

		this.data.jq_html = this.$.html();

		this.push(JSON.stringify(this.data));

		this.emit('ok', this.data);

		done();
	}

	return new DealHtml();

}