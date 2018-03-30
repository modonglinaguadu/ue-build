var G = this.G = {};
! function(e) {
	var t = {};
	e.config = function(e, n) {
		if (!arguments.length) return t;
		if (2 === arguments.length) t[e] = n;
		else {
			if ("object" != typeof e) return t[e];
			Object.keys(e).forEach(function(n) {
				t[n] = e[n]
			})
		}
	}
}(G),
function(e) {
	var t = e.util = {},
		n = /([^:\/])\/\/+/g,
		r = /.*(?=\/.*$)/,
		o = document,
		i = o.head || o.getElementsByTagName("head")[0] || o.documentElement,
		a = i.getElementsByTagName("base")[0],
		u = +navigator.userAgent.replace(/.*AppleWebKit.*?(\d+)\..*/i, "$1") < 536,
		c = window.navigator.userAgent.indexOf("Firefox") > 0 && !("onload" in document.createElement("link"));
	t.getVersion = function(t) {
		var n = e.config("version") || {},
			r = n[t],
			o = e.config("expire") || 604800,
			i = Date.now() / 1e3;
		return r || (r = parseInt(i - i % o, 10)), r
	}, t.loadScript = function(e, t) {
		var n = o.createElement("script"),
			r = !1,
			u = null;
		var aguaUrl = "http://localhost:3040//build/"+ e.url.replace(/^\/js\//, '');
		return e = e || {}, n.setAttribute("type", "text/javascript"), n.setAttribute("charset", "utf-8"), n.setAttribute("async", !0), t = t || function() {}, e.url ? n.src = aguaUrl : e.text && (n.text = e.text), n.onload = n.onreadystatechange = function() {
			r || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (r = !0, clearTimeout(u), n.onload = n.onreadystatechange = null, t())
		}, n.onerror = function(e) {
			clearTimeout(u), i.removeChild(n), t(e)
		}, u = setTimeout(function() {
			i.removeChild(n), t(new Error("time out"))
		}, 3e4), a ? i.insertBefore(n, a) : i.appendChild(n), n
	}, t.loadStyle = function(e, t) {
		function n() {
			clearTimeout(a), t()
		}

		function r(e, t) {
			var n;
			if (u) e.sheet && (n = !0);
			else if (e.sheet) try {
				e.sheet.cssRules && (n = !0)
			} catch (e) {
				"NS_ERROR_DOM_SECURITY_ERR" === e.name && (n = !0)
			}
			setTimeout(function() {
				n ? t() : r(e, t)
			}, 1)
		}
		var a, s = o.createElement("link");
		var aguaUrl = "http://localhost:3040//build/"+ e.url;
		return s.setAttribute("type", "text/css"), s.setAttribute("href", aguaUrl), s.setAttribute("rel", "stylesheet"), u || c ? setTimeout(function() {
			r(s, n)
		}, 0) : (s.onload = n, s.onerror = function() {
			clearTimeout(a), i.removeChild(s), t(new Error("Load Fail"))
		}), i.appendChild(s), a = setTimeout(function() {
			i.removeChild(s), t(new Error("Load timeout"))
		}, 3e4), s
	}, t.path = {
		idToUrl: function(n) {
			return t.path.isAbsolute(n) ? n : t.path.realpath(e.config("baseUrl") + n)
		},
		dirname: function(e) {
			var t = e.match(r);
			return (t ? t[0] : ".") + "/"
		},
		isAbsolute: function(e) {
			return e.indexOf("://") > 0 || 0 === e.indexOf("//")
		},
		isRelative: function(e) {
			return 0 === e.indexOf("./") || 0 === e.indexOf("../")
		},
		realpath: function(e) {
			if (n.lastIndex = 0, n.test(e) && (e = e.replace(n, "$1/")), e.indexOf(".") === -1) return e;
			for (var t, r = e.split("/"), o = [], i = 0; i < r.length; i++)
				if (t = r[i], ".." === t) {
					if (0 === o.length) throw new Error("The path is invalid: " + e);
					o.pop()
				} else "." !== t && o.push(t);
			return o.join("/")
		},
		map: function(t) {
			for (var n, r = t, o = e.config("map") || [], i = 0; i < o.length && (n = o[i], r = "function" == typeof n ? n(t) : t.replace(n[0], n[1]), r === t); i++);
			return r
		}
	}, t.touchmove = {
		disableTouchmove: function(e) {
			e.preventDefault()
		},
		off: function() {
			window.addEventListener("touchmove", this.disableTouchmove, !1)
		},
		on: function() {
			window.removeEventListener("touchmove", this.disableTouchmove, !1)
		}
	}
}(G),
function() {
	G.Deferred = function() {
		function e(e) {
			for (var t;
				(t = e.shift()) || (t = i.always.shift());) setTimeout(function(e) {
				return function() {
					e.apply({}, a)
				}
			}(t), 0)
		}
		var t = "pending",
			n = "done",
			r = "fail",
			o = t,
			i = {
				done: [],
				fail: [],
				always: []
			},
			a = [],
			u = {},
			c = {
				done: function(e) {
					return o === n && setTimeout(function() {
						e.apply(u, a)
					}, 0), o === t && i.done.push(e), c
				},
				fail: function(e) {
					return o === r && setTimeout(function() {
						e.apply(u, a)
					}, 0), o === t && i.fail.push(e), c
				},
				always: function(e) {
					return o !== t ? void setTimeout(function() {
						e.apply(u, a)
					}, 0) : (i.always.push(e), c)
				},
				resolve: function() {
					return o !== t ? c : (a = [].slice.call(arguments), o = n, e(i.done), c)
				},
				reject: function() {
					return o !== t ? c : (a = [].slice.call(arguments), o = r, e(i.fail), c)
				},
				state: function() {
					return o
				},
				promise: function() {
					var e = {};
					return Object.keys(c).forEach(function(t) {
						"resolve" !== t && "reject" !== t && (e[t] = c[t])
					}), e
				}
			};
		return c
	}, G.when = function(e) {
		Array.isArray(e) || (e = [].slice.call(arguments));
		var t = G.Deferred(),
			n = e.length,
			r = 0,
			o = [];
		return n ? (e.forEach(function(e, i) {
			e.fail(function(e) {
				t.reject(e)
			}).done(function(e) {
				o[i] = e, ++r === n && t.resolve.apply(t, o)
			})
		}), t.promise()) : t.resolve().promise()
	}
}(G),
function(e) {
	var t = [];
	e.Loader = {
		buffer: {},
		dispatch: function() {
			t.forEach(function(e) {
				e()
			})
		},
		addLoader: function(e) {
			t.push(e)
		}
	}
}(G),
function(e, t, n) {
	function r(e, n, r) {
		var o = c.getOrCreate("module_" + u++),
			i = o.id,
			a = t.Deferred();
		return o.isAnonymous = !0, Array.isArray(e) || (e = [e]), c.save(i, e, n, r), c.defers[i].done(function() {
			a.resolve.apply(a, o.dependencies.map(function(e) {
				return e.exports
			}))
		}).fail(function(e) {
			a.reject(e)
		}), a.promise()
	}

	function o(e) {
		function o(e) {
			if (e = o.resolve(e), !c.cache[e] || c.cache[e].status !== i.COMPILED) throw new Error("Module not found:" + e);
			return c.cache[e].exports
		}
		return e = e || window.location.href, o.resolve = function(r) {
			if (a.alias && a.alias[r]) return a.alias[r];
			if (c.cache[r]) return r;
			if (n.path.isAbsolute(r)) return r;
			if (n.path.isRelative(r)) {
				r = n.path.realpath(n.path.dirname(e) + r);
				var o = t.config("baseUrl");
				0 === r.indexOf(o) && (r = r.replace(o, ""))
			}
			return /(\.[a-z]*$)|([\?;].*)$/.test(r) ? r : r + ".js"
		}, o.async = function(t, n) {
			return r(t, n, e)
		}, o.cache = c.cache, o
	}
	var i = {
			ERROR: -2,
			FAILED: -1,
			FETCHING: 1,
			FETCHED: 2,
			SAVED: 3,
			READY: 4,
			COMPILING: 5,
			PAUSE: 6,
			COMPILED: 7
		},
		a = t.config(),
		u = 0;
	t.use = function(e, t) {
		return r(e, t, window.location.href)
	}, e.define = function(e, n, r) {
		if ("string" != typeof e) throw new Error("module.id must be a string");
		if (r || (r = n, n = []), delete t.Loader.buffer[e], !(c.cache[e] && c.cache[e].status >= i.SAVED)) return c.save(e, n, r, e)
	}, t.Require = o;
	var c = {};
	c.cache = {}, c.defers = {}, c.STATUS = i, c.getOrCreate = function(e) {
		return c.cache[e] || (c.cache[e] = {
			id: e,
			status: 0,
			dependencies: []
		}, c.defers[e] = t.Deferred()), c.cache[e]
	}, c.compile = function(e) {
		var t, n;
		if (e.status = i.READY, "function" == typeof e.factory) {
			e.status = i.COMPILING;
			try {
				e.isAnonymous ? (t = e.dependencies.map(function(e) {
					return e.exports
				}), e.exports = e.factory.apply(window, t)) : (e.exports = {}, e.async = function() {
					return e.status = i.PAUSE,
						function() {
							e.status = i.COMPILED, c.defers[e.id].resolve(e.exports)
						}
				}, c.defers[e.id].always(function() {
					delete e.async
				}), n = e.factory.call(window, new o(e.id), e.exports, e), n && (e.exports = n))
			} catch (t) {
				throw e.status = i.ERROR, c.fail(e, t), t
			}
		} else e.exports = e.factory;
		e.status !== i.PAUSE && (e.status = i.COMPILED, c.defers[e.id].resolve(e.exports))
	}, c.fail = function(e, t) {
		throw c.defers[e.id].reject(t), t
	}, c.save = function(e, r, a, u) {
		var s = c.getOrCreate(e),
			f = new o(u),
			r = r.map(function(e) {
				return c.getOrCreate(f.resolve(e))
			});
		s.dependencies = r, s.factory = a, s.status = i.SAVED, r = r.map(function(e) {
			return e.status < i.FETCHING && (e.status = i.FETCHING, e.url = n.path.map(n.path.idToUrl(e.id)), t.Loader.buffer[e.id] = e), c.defers[e.id]

		}), t.when(r).done(function() {
			c.compile(s)
		}).fail(function(e) {
			c.fail(s, e)
		}), setTimeout(function() {
			t.Loader.dispatch()
		}, 0)
	}, c.remove = function(e) {
		var t = c.getOrCreate(e);
		delete c.cache[t.id], delete c.defers[t.id]
	}, t.Module = c
}(window, G, G.util),
function(e) {
	e.Loader.addLoader(function() {
		var t = Object.keys(e.Loader.buffer);
		t.forEach(function(t) {
			var n = e.Loader.buffer[t];
			delete e.Loader.buffer[t], e.util.loadScript({
				url: n.url
			}, function(t) {
				return t ? e.Module.fail(n, t) : void(n.status > 0 && n.status < e.Module.STATUS.SAVED && e.Module.compile(n))
			})
		})
	})
}(G),
function(e) {
	e.Loader.addLoader(function() {
		var t = Object.keys(e.Loader.buffer);
		t.forEach(function(t) {
			/\.css$/.test(t) && (t = e.Loader.buffer[t], delete e.Loader.buffer[t.id], e.util.loadStyle({
				url: t.url
			}, function() {
				e.Module.compile(t)
			}))
		})
	})
}(G),
function() {
	for (var e, t = window.document.getElementsByTagName("script"), n = t.length, r = 0; r < n; r++) {
		var o = t[r].getAttribute("src");
		if (o && o.indexOf("g.js") > -1) {
			e = o;
			break
		}
	}
	var i = e.substring(0, e.indexOf("g.js")),
		a = e.replace(i + "g.js?v=", "");
	G.config({
		baseUrl: i,
		alias: {
			underscore: "lib/underscore/underscore.js",
			$: "lib/zepto/zepto-1.1.6.js",
			"virtual-dom": "lib/virtual-dom/index.js",
			class: "lib/class/class.js"
		},
		map: [
			[/^(.*\/\/)((.*)\.(js|css|tpl|jcss|vdtpl))$/, function(e, t, n, r, o) {
				n = n.replace(i, "");
				var u = G.config("version") || {},
					c = a || u[n] || G.config("defaultVersion");
				return t + r + ".__" + c + "__." + o
			}]
		]
	})
}();