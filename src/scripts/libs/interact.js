/* interact.js 1.9.22 | https://raw.github.com/taye/interact.js/master/LICENSE */
!(function (t) {
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		("undefined" != typeof window
			? window
			: "undefined" != typeof global
			? global
			: "undefined" != typeof self
			? self
			: this
		).interact = t();
	}
})(function () {
	var t = {};
	Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
	t.default = function (t) {
		return !(!t || !t.Window) && t instanceof t.Window;
	};
	var e = {};
	Object.defineProperty(e, "__esModule", { value: !0 }),
		(e.init = o),
		(e.getWindow = function (e) {
			if ((0, t.default)(e)) return e;
			return (e.ownerDocument || e).defaultView || r.window;
		}),
		(e.window = e.realWindow = void 0);
	var n = void 0;
	e.realWindow = n;
	var r = void 0;
	function o(t) {
		e.realWindow = n = t;
		var o = t.document.createTextNode("");
		o.ownerDocument !== t.document &&
			"function" == typeof t.wrap &&
			t.wrap(o) === o &&
			(t = t.wrap(t)),
			(e.window = r = t);
	}
	(e.window = r), "undefined" != typeof window && window && o(window);
	var i = {};
	function a(t) {
		return (a =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	Object.defineProperty(i, "__esModule", { value: !0 }), (i.default = void 0);
	var s = function (t) {
			return !!t && "object" === a(t);
		},
		l = function (t) {
			return "function" == typeof t;
		},
		u = {
			window: function (n) {
				return n === e.window || (0, t.default)(n);
			},
			docFrag: function (t) {
				return s(t) && 11 === t.nodeType;
			},
			object: s,
			func: l,
			number: function (t) {
				return "number" == typeof t;
			},
			bool: function (t) {
				return "boolean" == typeof t;
			},
			string: function (t) {
				return "string" == typeof t;
			},
			element: function (t) {
				if (!t || "object" !== a(t)) return !1;
				var n = e.getWindow(t) || e.window;
				return /object|function/.test(a(n.Element))
					? t instanceof n.Element
					: 1 === t.nodeType && "string" == typeof t.nodeName;
			},
			plainObject: function (t) {
				return (
					s(t) &&
					!!t.constructor &&
					/function Object\b/.test(t.constructor.toString())
				);
			},
			array: function (t) {
				return s(t) && void 0 !== t.length && l(t.splice);
			},
		};
	i.default = u;
	var c = {};
	function f(t) {
		var e = t.interaction;
		if ("drag" === e.prepared.name) {
			var n = e.prepared.axis;
			"x" === n
				? ((e.coords.cur.page.y = e.coords.start.page.y),
				  (e.coords.cur.client.y = e.coords.start.client.y),
				  (e.coords.velocity.client.y = 0),
				  (e.coords.velocity.page.y = 0))
				: "y" === n &&
				  ((e.coords.cur.page.x = e.coords.start.page.x),
				  (e.coords.cur.client.x = e.coords.start.client.x),
				  (e.coords.velocity.client.x = 0),
				  (e.coords.velocity.page.x = 0));
		}
	}
	function d(t) {
		var e = t.iEvent,
			n = t.interaction;
		if ("drag" === n.prepared.name) {
			var r = n.prepared.axis;
			if ("x" === r || "y" === r) {
				var o = "x" === r ? "y" : "x";
				(e.page[o] = n.coords.start.page[o]),
					(e.client[o] = n.coords.start.client[o]),
					(e.delta[o] = 0);
			}
		}
	}
	Object.defineProperty(c, "__esModule", { value: !0 }), (c.default = void 0);
	var p = {
			id: "actions/drag",
			install: function (t) {
				var e = t.actions,
					n = t.Interactable,
					r = t.defaults;
				(n.prototype.draggable = p.draggable),
					(e.map.drag = p),
					(e.methodDict.drag = "draggable"),
					(r.actions.drag = p.defaults);
			},
			listeners: {
				"interactions:before-action-move": f,
				"interactions:action-resume": f,
				"interactions:action-move": d,
				"auto-start:check": function (t) {
					var e = t.interaction,
						n = t.interactable,
						r = t.buttons,
						o = n.options.drag;
					if (
						o &&
						o.enabled &&
						(!e.pointerIsDown ||
							!/mouse|pointer/.test(e.pointerType) ||
							0 != (r & n.options.drag.mouseButtons))
					)
						return (
							(t.action = {
								name: "drag",
								axis: "start" === o.lockAxis ? o.startAxis : o.lockAxis,
							}),
							!1
						);
				},
			},
			draggable: function (t) {
				return i.default.object(t)
					? ((this.options.drag.enabled = !1 !== t.enabled),
					  this.setPerAction("drag", t),
					  this.setOnEvents("drag", t),
					  /^(xy|x|y|start)$/.test(t.lockAxis) &&
							(this.options.drag.lockAxis = t.lockAxis),
					  /^(xy|x|y)$/.test(t.startAxis) &&
							(this.options.drag.startAxis = t.startAxis),
					  this)
					: i.default.bool(t)
					? ((this.options.drag.enabled = t), this)
					: this.options.drag;
			},
			beforeMove: f,
			move: d,
			defaults: { startAxis: "xy", lockAxis: "xy" },
			getCursor: function () {
				return "move";
			},
		},
		v = p;
	c.default = v;
	var h = {};
	Object.defineProperty(h, "__esModule", { value: !0 }), (h.default = void 0);
	var g = {
		init: function (t) {
			var e = t;
			(g.document = e.document),
				(g.DocumentFragment = e.DocumentFragment || y),
				(g.SVGElement = e.SVGElement || y),
				(g.SVGSVGElement = e.SVGSVGElement || y),
				(g.SVGElementInstance = e.SVGElementInstance || y),
				(g.Element = e.Element || y),
				(g.HTMLElement = e.HTMLElement || g.Element),
				(g.Event = e.Event),
				(g.Touch = e.Touch || y),
				(g.PointerEvent = e.PointerEvent || e.MSPointerEvent);
		},
		document: null,
		DocumentFragment: null,
		SVGElement: null,
		SVGSVGElement: null,
		SVGElementInstance: null,
		Element: null,
		HTMLElement: null,
		Event: null,
		Touch: null,
		PointerEvent: null,
	};
	function y() {}
	var m = g;
	h.default = m;
	var b = {};
	Object.defineProperty(b, "__esModule", { value: !0 }), (b.default = void 0);
	var x = {
		init: function (t) {
			var n = h.default.Element,
				r = e.window.navigator;
			(x.supportsTouch =
				"ontouchstart" in t ||
				(i.default.func(t.DocumentTouch) &&
					h.default.document instanceof t.DocumentTouch)),
				(x.supportsPointerEvent =
					!1 !== r.pointerEnabled && !!h.default.PointerEvent),
				(x.isIOS = /iP(hone|od|ad)/.test(r.platform)),
				(x.isIOS7 =
					/iP(hone|od|ad)/.test(r.platform) && /OS 7[^\d]/.test(r.appVersion)),
				(x.isIe9 = /MSIE 9/.test(r.userAgent)),
				(x.isOperaMobile =
					"Opera" === r.appName &&
					x.supportsTouch &&
					/Presto/.test(r.userAgent)),
				(x.prefixedMatchesSelector =
					"matches" in n.prototype
						? "matches"
						: "webkitMatchesSelector" in n.prototype
						? "webkitMatchesSelector"
						: "mozMatchesSelector" in n.prototype
						? "mozMatchesSelector"
						: "oMatchesSelector" in n.prototype
						? "oMatchesSelector"
						: "msMatchesSelector"),
				(x.pEventTypes = x.supportsPointerEvent
					? h.default.PointerEvent === t.MSPointerEvent
						? {
								up: "MSPointerUp",
								down: "MSPointerDown",
								over: "mouseover",
								out: "mouseout",
								move: "MSPointerMove",
								cancel: "MSPointerCancel",
						  }
						: {
								up: "pointerup",
								down: "pointerdown",
								over: "pointerover",
								out: "pointerout",
								move: "pointermove",
								cancel: "pointercancel",
						  }
					: null),
				(x.wheelEvent =
					"onmousewheel" in h.default.document ? "mousewheel" : "wheel");
		},
		supportsTouch: null,
		supportsPointerEvent: null,
		isIOS7: null,
		isIOS: null,
		isIe9: null,
		isOperaMobile: null,
		prefixedMatchesSelector: null,
		pEventTypes: null,
		wheelEvent: null,
	};
	var w = x;
	b.default = w;
	var _ = {};
	function S(t) {
		var e = t.parentNode;
		if (i.default.docFrag(e)) {
			for (; (e = e.host) && i.default.docFrag(e); );
			return e;
		}
		return e;
	}
	function P(t, n) {
		return (
			e.window !== e.realWindow && (n = n.replace(/\/deep\//g, " ")),
			t[b.default.prefixedMatchesSelector](n)
		);
	}
	Object.defineProperty(_, "__esModule", { value: !0 }),
		(_.nodeContains = function (t, e) {
			if (t.contains) return t.contains(e);
			for (; e; ) {
				if (e === t) return !0;
				e = e.parentNode;
			}
			return !1;
		}),
		(_.closest = function (t, e) {
			for (; i.default.element(t); ) {
				if (P(t, e)) return t;
				t = S(t);
			}
			return null;
		}),
		(_.parentNode = S),
		(_.matchesSelector = P),
		(_.indexOfDeepestElement = function (t) {
			for (var n, r = [], o = 0; o < t.length; o++) {
				var i = t[o],
					a = t[n];
				if (i && o !== n)
					if (a) {
						var s = O(i),
							l = O(a);
						if (s !== i.ownerDocument)
							if (l !== i.ownerDocument)
								if (s !== l) {
									r = r.length ? r : E(a);
									var u = void 0;
									if (
										a instanceof h.default.HTMLElement &&
										i instanceof h.default.SVGElement &&
										!(i instanceof h.default.SVGSVGElement)
									) {
										if (i === l) continue;
										u = i.ownerSVGElement;
									} else u = i;
									for (
										var c = E(u, a.ownerDocument), f = 0;
										c[f] && c[f] === r[f];

									)
										f++;
									for (
										var d = [c[f - 1], c[f], r[f]], p = d[0].lastChild;
										p;

									) {
										if (p === d[1]) {
											(n = o), (r = c);
											break;
										}
										if (p === d[2]) break;
										p = p.previousSibling;
									}
								} else
									(v = i),
										(g = a),
										(y = void 0),
										(m = void 0),
										(y =
											parseInt(e.getWindow(v).getComputedStyle(v).zIndex, 10) ||
											0),
										(m =
											parseInt(e.getWindow(g).getComputedStyle(g).zIndex, 10) ||
											0),
										y >= m && (n = o);
							else n = o;
					} else n = o;
			}
			var v, g, y, m;
			return n;
		}),
		(_.matchesUpTo = function (t, e, n) {
			for (; i.default.element(t); ) {
				if (P(t, e)) return !0;
				if ((t = S(t)) === n) return P(t, e);
			}
			return !1;
		}),
		(_.getActualElement = function (t) {
			return t.correspondingUseElement || t;
		}),
		(_.getScrollXY = T),
		(_.getElementClientRect = M),
		(_.getElementRect = function (t) {
			var n = M(t);
			if (!b.default.isIOS7 && n) {
				var r = T(e.getWindow(t));
				(n.left += r.x), (n.right += r.x), (n.top += r.y), (n.bottom += r.y);
			}
			return n;
		}),
		(_.getPath = function (t) {
			var e = [];
			for (; t; ) e.push(t), (t = S(t));
			return e;
		}),
		(_.trySelector = function (t) {
			if (!i.default.string(t)) return !1;
			return h.default.document.querySelector(t), !0;
		});
	var O = function (t) {
		return t.parentNode || t.host;
	};
	function E(t, e) {
		for (var n, r = [], o = t; (n = O(o)) && o !== e && n !== o.ownerDocument; )
			r.unshift(o), (o = n);
		return r;
	}
	function T(t) {
		return {
			x: (t = t || e.window).scrollX || t.document.documentElement.scrollLeft,
			y: t.scrollY || t.document.documentElement.scrollTop,
		};
	}
	function M(t) {
		var e =
			t instanceof h.default.SVGElement
				? t.getBoundingClientRect()
				: t.getClientRects()[0];
		return (
			e && {
				left: e.left,
				right: e.right,
				top: e.top,
				bottom: e.bottom,
				width: e.width || e.right - e.left,
				height: e.height || e.bottom - e.top,
			}
		);
	}
	var j = {};
	Object.defineProperty(j, "__esModule", { value: !0 }),
		(j.default = function (t, e) {
			for (var n in e) t[n] = e[n];
			return t;
		});
	var k = {};
	function I(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	function D(t, e, n) {
		return "parent" === t
			? (0, _.parentNode)(n)
			: "self" === t
			? e.getRect(n)
			: (0, _.closest)(n, t);
	}
	Object.defineProperty(k, "__esModule", { value: !0 }),
		(k.getStringOptionResult = D),
		(k.resolveRectLike = function (t, e, n, r) {
			var o = t;
			i.default.string(o)
				? (o = D(o, e, n))
				: i.default.func(o) &&
				  (o = o.apply(
						void 0,
						(function (t) {
							if (Array.isArray(t)) return I(t);
						})((a = r)) ||
							(function (t) {
								if (
									"undefined" != typeof Symbol &&
									Symbol.iterator in Object(t)
								)
									return Array.from(t);
							})(a) ||
							(function (t, e) {
								if (t) {
									if ("string" == typeof t) return I(t, e);
									var n = Object.prototype.toString.call(t).slice(8, -1);
									return (
										"Object" === n && t.constructor && (n = t.constructor.name),
										"Map" === n || "Set" === n
											? Array.from(t)
											: "Arguments" === n ||
											  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
											? I(t, e)
											: void 0
									);
								}
							})(a) ||
							(function () {
								throw new TypeError(
									"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
								);
							})()
				  ));
			var a;
			i.default.element(o) && (o = (0, _.getElementRect)(o));
			return o;
		}),
		(k.rectToXY = function (t) {
			return t && { x: "x" in t ? t.x : t.left, y: "y" in t ? t.y : t.top };
		}),
		(k.xywhToTlbr = function (t) {
			!t ||
				("left" in t && "top" in t) ||
				(((t = (0, j.default)({}, t)).left = t.x || 0),
				(t.top = t.y || 0),
				(t.right = t.right || t.left + t.width),
				(t.bottom = t.bottom || t.top + t.height));
			return t;
		}),
		(k.tlbrToXywh = function (t) {
			!t ||
				("x" in t && "y" in t) ||
				(((t = (0, j.default)({}, t)).x = t.left || 0),
				(t.y = t.top || 0),
				(t.width = t.width || (t.right || 0) - t.x),
				(t.height = t.height || (t.bottom || 0) - t.y));
			return t;
		}),
		(k.addEdges = function (t, e, n) {
			t.left && (e.left += n.x);
			t.right && (e.right += n.x);
			t.top && (e.top += n.y);
			t.bottom && (e.bottom += n.y);
			(e.width = e.right - e.left), (e.height = e.bottom - e.top);
		});
	var A = {};
	Object.defineProperty(A, "__esModule", { value: !0 }),
		(A.default = function (t, e, n) {
			var r = t.options[n],
				o = (r && r.origin) || t.options.origin,
				i = (0, k.resolveRectLike)(o, t, e, [t && e]);
			return (0, k.rectToXY)(i) || { x: 0, y: 0 };
		});
	var z = {};
	function C(t) {
		return t.trim().split(/ +/);
	}
	Object.defineProperty(z, "__esModule", { value: !0 }),
		(z.default = function t(e, n, r) {
			(r = r || {}), i.default.string(e) && -1 !== e.search(" ") && (e = C(e));
			if (i.default.array(e))
				return e.reduce(function (e, o) {
					return (0, j.default)(e, t(o, n, r));
				}, r);
			i.default.object(e) && ((n = e), (e = ""));
			if (i.default.func(n)) (r[e] = r[e] || []), r[e].push(n);
			else if (i.default.array(n))
				for (var o = 0; o < n.length; o++) {
					var a;
					(a = n[o]), t(e, a, r);
				}
			else if (i.default.object(n))
				for (var s in n) {
					var l = C(s).map(function (t) {
						return "".concat(e).concat(t);
					});
					t(l, n[s], r);
				}
			return r;
		});
	var R = {};
	Object.defineProperty(R, "__esModule", { value: !0 }), (R.default = void 0);
	R.default = function (t, e) {
		return Math.sqrt(t * t + e * e);
	};
	var F = {};
	function X(t, e) {
		for (var n in e) {
			var r = X.prefixedPropREs,
				o = !1;
			for (var i in r)
				if (0 === n.indexOf(i) && r[i].test(n)) {
					o = !0;
					break;
				}
			o || "function" == typeof e[n] || (t[n] = e[n]);
		}
		return t;
	}
	Object.defineProperty(F, "__esModule", { value: !0 }),
		(F.default = void 0),
		(X.prefixedPropREs = {
			webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,
			moz: /(Pressure)$/,
		});
	var Y = X;
	F.default = Y;
	var W = {};
	function L(t) {
		return t instanceof h.default.Event || t instanceof h.default.Touch;
	}
	function B(t, e, n) {
		return (
			(t = t || "page"), ((n = n || {}).x = e[t + "X"]), (n.y = e[t + "Y"]), n
		);
	}
	function U(t, e) {
		return (
			(e = e || { x: 0, y: 0 }),
			b.default.isOperaMobile && L(t)
				? (B("screen", t, e), (e.x += window.scrollX), (e.y += window.scrollY))
				: B("page", t, e),
			e
		);
	}
	function N(t, e) {
		return (
			(e = e || {}),
			b.default.isOperaMobile && L(t) ? B("screen", t, e) : B("client", t, e),
			e
		);
	}
	function V(t) {
		var e = [];
		return (
			i.default.array(t)
				? ((e[0] = t[0]), (e[1] = t[1]))
				: "touchend" === t.type
				? 1 === t.touches.length
					? ((e[0] = t.touches[0]), (e[1] = t.changedTouches[0]))
					: 0 === t.touches.length &&
					  ((e[0] = t.changedTouches[0]), (e[1] = t.changedTouches[1]))
				: ((e[0] = t.touches[0]), (e[1] = t.touches[1])),
			e
		);
	}
	function q(t) {
		for (
			var e = {
					pageX: 0,
					pageY: 0,
					clientX: 0,
					clientY: 0,
					screenX: 0,
					screenY: 0,
				},
				n = 0;
			n < t.length;
			n++
		) {
			var r = t[n];
			for (var o in e) e[o] += r[o];
		}
		for (var i in e) e[i] /= t.length;
		return e;
	}
	Object.defineProperty(W, "__esModule", { value: !0 }),
		(W.copyCoords = function (t, e) {
			(t.page = t.page || {}),
				(t.page.x = e.page.x),
				(t.page.y = e.page.y),
				(t.client = t.client || {}),
				(t.client.x = e.client.x),
				(t.client.y = e.client.y),
				(t.timeStamp = e.timeStamp);
		}),
		(W.setCoordDeltas = function (t, e, n) {
			(t.page.x = n.page.x - e.page.x),
				(t.page.y = n.page.y - e.page.y),
				(t.client.x = n.client.x - e.client.x),
				(t.client.y = n.client.y - e.client.y),
				(t.timeStamp = n.timeStamp - e.timeStamp);
		}),
		(W.setCoordVelocity = function (t, e) {
			var n = Math.max(e.timeStamp / 1e3, 0.001);
			(t.page.x = e.page.x / n),
				(t.page.y = e.page.y / n),
				(t.client.x = e.client.x / n),
				(t.client.y = e.client.y / n),
				(t.timeStamp = n);
		}),
		(W.setZeroCoords = function (t) {
			(t.page.x = 0), (t.page.y = 0), (t.client.x = 0), (t.client.y = 0);
		}),
		(W.isNativePointer = L),
		(W.getXY = B),
		(W.getPageXY = U),
		(W.getClientXY = N),
		(W.getPointerId = function (t) {
			return i.default.number(t.pointerId) ? t.pointerId : t.identifier;
		}),
		(W.setCoords = function (t, e, n) {
			var r = e.length > 1 ? q(e) : e[0];
			U(r, t.page), N(r, t.client), (t.timeStamp = n);
		}),
		(W.getTouchPair = V),
		(W.pointerAverage = q),
		(W.touchBBox = function (t) {
			if (!t.length) return null;
			var e = V(t),
				n = Math.min(e[0].pageX, e[1].pageX),
				r = Math.min(e[0].pageY, e[1].pageY),
				o = Math.max(e[0].pageX, e[1].pageX),
				i = Math.max(e[0].pageY, e[1].pageY);
			return {
				x: n,
				y: r,
				left: n,
				top: r,
				right: o,
				bottom: i,
				width: o - n,
				height: i - r,
			};
		}),
		(W.touchDistance = function (t, e) {
			var n = e + "X",
				r = e + "Y",
				o = V(t),
				i = o[0][n] - o[1][n],
				a = o[0][r] - o[1][r];
			return (0, R.default)(i, a);
		}),
		(W.touchAngle = function (t, e) {
			var n = e + "X",
				r = e + "Y",
				o = V(t),
				i = o[1][n] - o[0][n],
				a = o[1][r] - o[0][r];
			return (180 * Math.atan2(a, i)) / Math.PI;
		}),
		(W.getPointerType = function (t) {
			return i.default.string(t.pointerType)
				? t.pointerType
				: i.default.number(t.pointerType)
				? [void 0, void 0, "touch", "pen", "mouse"][t.pointerType]
				: /touch/.test(t.type) || t instanceof h.default.Touch
				? "touch"
				: "mouse";
		}),
		(W.getEventTargets = function (t) {
			var e = i.default.func(t.composedPath) ? t.composedPath() : t.path;
			return [
				_.getActualElement(e ? e[0] : t.target),
				_.getActualElement(t.currentTarget),
			];
		}),
		(W.newCoords = function () {
			return { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 };
		}),
		(W.coordsToEvent = function (t) {
			return {
				coords: t,
				get page() {
					return this.coords.page;
				},
				get client() {
					return this.coords.client;
				},
				get timeStamp() {
					return this.coords.timeStamp;
				},
				get pageX() {
					return this.coords.page.x;
				},
				get pageY() {
					return this.coords.page.y;
				},
				get clientX() {
					return this.coords.client.x;
				},
				get clientY() {
					return this.coords.client.y;
				},
				get pointerId() {
					return this.coords.pointerId;
				},
				get target() {
					return this.coords.target;
				},
				get type() {
					return this.coords.type;
				},
				get pointerType() {
					return this.coords.pointerType;
				},
				get buttons() {
					return this.coords.buttons;
				},
				preventDefault: function () {},
			};
		}),
		Object.defineProperty(W, "pointerExtend", {
			enumerable: !0,
			get: function () {
				return F.default;
			},
		});
	var $ = {};
	function G(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	Object.defineProperty($, "__esModule", { value: !0 }), ($.BaseEvent = void 0);
	var H = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.type = void 0),
				(this.target = void 0),
				(this.currentTarget = void 0),
				(this.interactable = void 0),
				(this._interaction = void 0),
				(this.timeStamp = void 0),
				(this.immediatePropagationStopped = !1),
				(this.propagationStopped = !1),
				(this._interaction = e);
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{ key: "preventDefault", value: function () {} },
				{
					key: "stopPropagation",
					value: function () {
						this.propagationStopped = !0;
					},
				},
				{
					key: "stopImmediatePropagation",
					value: function () {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					},
				},
			]) && G(e.prototype, n),
			r && G(e, r),
			t
		);
	})();
	($.BaseEvent = H),
		Object.defineProperty(H.prototype, "interaction", {
			get: function () {
				return this._interaction._proxy;
			},
			set: function () {},
		});
	var K = {};
	Object.defineProperty(K, "__esModule", { value: !0 }),
		(K.find = K.findIndex = K.from = K.merge = K.remove = K.contains = void 0);
	K.contains = function (t, e) {
		return -1 !== t.indexOf(e);
	};
	K.remove = function (t, e) {
		return t.splice(t.indexOf(e), 1);
	};
	var Z = function (t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			t.push(r);
		}
		return t;
	};
	K.merge = Z;
	K.from = function (t) {
		return Z([], t);
	};
	var J = function (t, e) {
		for (var n = 0; n < t.length; n++) if (e(t[n], n, t)) return n;
		return -1;
	};
	K.findIndex = J;
	K.find = function (t, e) {
		return t[J(t, e)];
	};
	var Q = {};
	function tt(t) {
		return (tt =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	function et(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function nt(t, e) {
		return (nt =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, e);
	}
	function rt(t) {
		var e = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = it(t);
			if (e) {
				var o = it(this).constructor;
				n = Reflect.construct(r, arguments, o);
			} else n = r.apply(this, arguments);
			return ot(this, n);
		};
	}
	function ot(t, e) {
		return !e || ("object" !== tt(e) && "function" != typeof e)
			? (function (t) {
					if (void 0 === t)
						throw new ReferenceError(
							"this hasn't been initialised - super() hasn't been called"
						);
					return t;
			  })(t)
			: e;
	}
	function it(t) {
		return (it = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	Object.defineProperty(Q, "__esModule", { value: !0 }), (Q.DropEvent = void 0);
	var at = (function (t) {
		!(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError(
					"Super expression must either be null or a function"
				);
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, writable: !0, configurable: !0 },
			})),
				e && nt(t, e);
		})(i, t);
		var e,
			n,
			r,
			o = rt(i);
		function i(t, e, n) {
			var r;
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, i),
				((r = o.call(this, e._interaction)).target = void 0),
				(r.dropzone = void 0),
				(r.dragEvent = void 0),
				(r.relatedTarget = void 0),
				(r.draggable = void 0),
				(r.timeStamp = void 0),
				(r.propagationStopped = !1),
				(r.immediatePropagationStopped = !1);
			var a = "dragleave" === n ? t.prev : t.cur,
				s = a.element,
				l = a.dropzone;
			return (
				(r.type = n),
				(r.target = s),
				(r.currentTarget = s),
				(r.dropzone = l),
				(r.dragEvent = e),
				(r.relatedTarget = e.target),
				(r.draggable = e.interactable),
				(r.timeStamp = e.timeStamp),
				r
			);
		}
		return (
			(e = i),
			(n = [
				{
					key: "reject",
					value: function () {
						var t = this,
							e = this._interaction.dropState;
						if (
							"dropactivate" === this.type ||
							(this.dropzone &&
								e.cur.dropzone === this.dropzone &&
								e.cur.element === this.target)
						)
							if (
								((e.prev.dropzone = this.dropzone),
								(e.prev.element = this.target),
								(e.rejected = !0),
								(e.events.enter = null),
								this.stopImmediatePropagation(),
								"dropactivate" === this.type)
							) {
								var n = e.activeDrops,
									r = K.findIndex(n, function (e) {
										var n = e.dropzone,
											r = e.element;
										return n === t.dropzone && r === t.target;
									});
								e.activeDrops.splice(r, 1);
								var o = new i(e, this.dragEvent, "dropdeactivate");
								(o.dropzone = this.dropzone),
									(o.target = this.target),
									this.dropzone.fire(o);
							} else this.dropzone.fire(new i(e, this.dragEvent, "dragleave"));
					},
				},
				{ key: "preventDefault", value: function () {} },
				{
					key: "stopPropagation",
					value: function () {
						this.propagationStopped = !0;
					},
				},
				{
					key: "stopImmediatePropagation",
					value: function () {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					},
				},
			]) && et(e.prototype, n),
			r && et(e, r),
			i
		);
	})($.BaseEvent);
	Q.DropEvent = at;
	var st = {};
	function lt(t, e) {
		for (var n = 0; n < t.slice().length; n++) {
			var r = t.slice()[n],
				o = r.dropzone,
				i = r.element;
			(e.dropzone = o),
				(e.target = i),
				o.fire(e),
				(e.propagationStopped = e.immediatePropagationStopped = !1);
		}
	}
	function ut(t, e) {
		for (
			var n = (function (t, e) {
					for (var n = t.interactables, r = [], o = 0; o < n.list.length; o++) {
						var a = n.list[o];
						if (a.options.drop.enabled) {
							var s = a.options.drop.accept;
							if (
								!(
									(i.default.element(s) && s !== e) ||
									(i.default.string(s) && !_.matchesSelector(e, s)) ||
									(i.default.func(s) &&
										!s({ dropzone: a, draggableElement: e }))
								)
							)
								for (
									var l = i.default.string(a.target)
											? a._context.querySelectorAll(a.target)
											: i.default.array(a.target)
											? a.target
											: [a.target],
										u = 0;
									u < l.length;
									u++
								) {
									var c = l[u];
									c !== e && r.push({ dropzone: a, element: c });
								}
						}
					}
					return r;
				})(t, e),
				r = 0;
			r < n.length;
			r++
		) {
			var o = n[r];
			o.rect = o.dropzone.getRect(o.element);
		}
		return n;
	}
	function ct(t, e, n) {
		for (
			var r = t.dropState, o = t.interactable, i = t.element, a = [], s = 0;
			s < r.activeDrops.length;
			s++
		) {
			var l = r.activeDrops[s],
				u = l.dropzone,
				c = l.element,
				f = l.rect;
			a.push(u.dropCheck(e, n, o, i, c, f) ? c : null);
		}
		var d = _.indexOfDeepestElement(a);
		return r.activeDrops[d] || null;
	}
	function ft(t, e, n) {
		var r = t.dropState,
			o = {
				enter: null,
				leave: null,
				activate: null,
				deactivate: null,
				move: null,
				drop: null,
			};
		return (
			"dragstart" === n.type &&
				((o.activate = new Q.DropEvent(r, n, "dropactivate")),
				(o.activate.target = null),
				(o.activate.dropzone = null)),
			"dragend" === n.type &&
				((o.deactivate = new Q.DropEvent(r, n, "dropdeactivate")),
				(o.deactivate.target = null),
				(o.deactivate.dropzone = null)),
			r.rejected ||
				(r.cur.element !== r.prev.element &&
					(r.prev.dropzone &&
						((o.leave = new Q.DropEvent(r, n, "dragleave")),
						(n.dragLeave = o.leave.target = r.prev.element),
						(n.prevDropzone = o.leave.dropzone = r.prev.dropzone)),
					r.cur.dropzone &&
						((o.enter = new Q.DropEvent(r, n, "dragenter")),
						(n.dragEnter = r.cur.element),
						(n.dropzone = r.cur.dropzone))),
				"dragend" === n.type &&
					r.cur.dropzone &&
					((o.drop = new Q.DropEvent(r, n, "drop")),
					(n.dropzone = r.cur.dropzone),
					(n.relatedTarget = r.cur.element)),
				"dragmove" === n.type &&
					r.cur.dropzone &&
					((o.move = new Q.DropEvent(r, n, "dropmove")),
					(o.move.dragmove = n),
					(n.dropzone = r.cur.dropzone))),
			o
		);
	}
	function dt(t, e) {
		var n = t.dropState,
			r = n.activeDrops,
			o = n.cur,
			i = n.prev;
		e.leave && i.dropzone.fire(e.leave),
			e.enter && o.dropzone.fire(e.enter),
			e.move && o.dropzone.fire(e.move),
			e.drop && o.dropzone.fire(e.drop),
			e.deactivate && lt(r, e.deactivate),
			(n.prev.dropzone = o.dropzone),
			(n.prev.element = o.element);
	}
	function pt(t, e) {
		var n = t.interaction,
			r = t.iEvent,
			o = t.event;
		if ("dragmove" === r.type || "dragend" === r.type) {
			var i = n.dropState;
			e.dynamicDrop && (i.activeDrops = ut(e, n.element));
			var a = r,
				s = ct(n, a, o);
			(i.rejected =
				i.rejected &&
				!!s &&
				s.dropzone === i.cur.dropzone &&
				s.element === i.cur.element),
				(i.cur.dropzone = s && s.dropzone),
				(i.cur.element = s && s.element),
				(i.events = ft(n, 0, a));
		}
	}
	Object.defineProperty(st, "__esModule", { value: !0 }), (st.default = void 0);
	var vt = {
			id: "actions/drop",
			install: function (t) {
				var e = t.actions,
					n = t.interactStatic,
					r = t.Interactable,
					o = t.defaults;
				t.usePlugin(c.default),
					(r.prototype.dropzone = function (t) {
						return (function (t, e) {
							if (i.default.object(e)) {
								if (
									((t.options.drop.enabled = !1 !== e.enabled), e.listeners)
								) {
									var n = (0, z.default)(e.listeners),
										r = Object.keys(n).reduce(function (t, e) {
											return (
												(t[
													/^(enter|leave)/.test(e)
														? "drag".concat(e)
														: /^(activate|deactivate|move)/.test(e)
														? "drop".concat(e)
														: e
												] = n[e]),
												t
											);
										}, {});
									t.off(t.options.drop.listeners),
										t.on(r),
										(t.options.drop.listeners = r);
								}
								return (
									i.default.func(e.ondrop) && t.on("drop", e.ondrop),
									i.default.func(e.ondropactivate) &&
										t.on("dropactivate", e.ondropactivate),
									i.default.func(e.ondropdeactivate) &&
										t.on("dropdeactivate", e.ondropdeactivate),
									i.default.func(e.ondragenter) &&
										t.on("dragenter", e.ondragenter),
									i.default.func(e.ondragleave) &&
										t.on("dragleave", e.ondragleave),
									i.default.func(e.ondropmove) &&
										t.on("dropmove", e.ondropmove),
									/^(pointer|center)$/.test(e.overlap)
										? (t.options.drop.overlap = e.overlap)
										: i.default.number(e.overlap) &&
										  (t.options.drop.overlap = Math.max(
												Math.min(1, e.overlap),
												0
										  )),
									"accept" in e && (t.options.drop.accept = e.accept),
									"checker" in e && (t.options.drop.checker = e.checker),
									t
								);
							}
							if (i.default.bool(e)) return (t.options.drop.enabled = e), t;
							return t.options.drop;
						})(this, t);
					}),
					(r.prototype.dropCheck = function (t, e, n, r, o, a) {
						return (function (t, e, n, r, o, a, s) {
							var l = !1;
							if (!(s = s || t.getRect(a)))
								return (
									!!t.options.drop.checker &&
									t.options.drop.checker(e, n, l, t, a, r, o)
								);
							var u = t.options.drop.overlap;
							if ("pointer" === u) {
								var c = (0, A.default)(r, o, "drag"),
									f = W.getPageXY(e);
								(f.x += c.x), (f.y += c.y);
								var d = f.x > s.left && f.x < s.right,
									p = f.y > s.top && f.y < s.bottom;
								l = d && p;
							}
							var v = r.getRect(o);
							if (v && "center" === u) {
								var h = v.left + v.width / 2,
									g = v.top + v.height / 2;
								l = h >= s.left && h <= s.right && g >= s.top && g <= s.bottom;
							}
							if (v && i.default.number(u)) {
								var y =
									(Math.max(
										0,
										Math.min(s.right, v.right) - Math.max(s.left, v.left)
									) *
										Math.max(
											0,
											Math.min(s.bottom, v.bottom) - Math.max(s.top, v.top)
										)) /
									(v.width * v.height);
								l = y >= u;
							}
							t.options.drop.checker &&
								(l = t.options.drop.checker(e, n, l, t, a, r, o));
							return l;
						})(this, t, e, n, r, o, a);
					}),
					(n.dynamicDrop = function (e) {
						return i.default.bool(e) ? ((t.dynamicDrop = e), n) : t.dynamicDrop;
					}),
					(0, j.default)(e.phaselessTypes, {
						dragenter: !0,
						dragleave: !0,
						dropactivate: !0,
						dropdeactivate: !0,
						dropmove: !0,
						drop: !0,
					}),
					(e.methodDict.drop = "dropzone"),
					(t.dynamicDrop = !1),
					(o.actions.drop = vt.defaults);
			},
			listeners: {
				"interactions:before-action-start": function (t) {
					var e = t.interaction;
					"drag" === e.prepared.name &&
						(e.dropState = {
							cur: { dropzone: null, element: null },
							prev: { dropzone: null, element: null },
							rejected: null,
							events: null,
							activeDrops: [],
						});
				},
				"interactions:after-action-start": function (t, e) {
					var n = t.interaction,
						r = (t.event, t.iEvent);
					if ("drag" === n.prepared.name) {
						var o = n.dropState;
						(o.activeDrops = null),
							(o.events = null),
							(o.activeDrops = ut(e, n.element)),
							(o.events = ft(n, 0, r)),
							o.events.activate &&
								(lt(o.activeDrops, o.events.activate),
								e.fire("actions/drop:start", { interaction: n, dragEvent: r }));
					}
				},
				"interactions:action-move": pt,
				"interactions:after-action-move": function (t, e) {
					var n = t.interaction,
						r = t.iEvent;
					"drag" === n.prepared.name &&
						(dt(n, n.dropState.events),
						e.fire("actions/drop:move", { interaction: n, dragEvent: r }),
						(n.dropState.events = {}));
				},
				"interactions:action-end": function (t, e) {
					if ("drag" === t.interaction.prepared.name) {
						var n = t.interaction,
							r = t.iEvent;
						pt(t, e),
							dt(n, n.dropState.events),
							e.fire("actions/drop:end", { interaction: n, dragEvent: r });
					}
				},
				"interactions:stop": function (t) {
					var e = t.interaction;
					if ("drag" === e.prepared.name) {
						var n = e.dropState;
						n &&
							((n.activeDrops = null),
							(n.events = null),
							(n.cur.dropzone = null),
							(n.cur.element = null),
							(n.prev.dropzone = null),
							(n.prev.element = null),
							(n.rejected = !1));
					}
				},
			},
			getActiveDrops: ut,
			getDrop: ct,
			getDropEvents: ft,
			fireDropEvents: dt,
			defaults: { enabled: !1, accept: null, overlap: "pointer" },
		},
		ht = vt;
	st.default = ht;
	var gt = {};
	function yt(t) {
		var e = t.interaction,
			n = t.iEvent,
			r = t.phase;
		if ("gesture" === e.prepared.name) {
			var o = e.pointers.map(function (t) {
					return t.pointer;
				}),
				a = "start" === r,
				s = "end" === r,
				l = e.interactable.options.deltaSource;
			if (((n.touches = [o[0], o[1]]), a))
				(n.distance = W.touchDistance(o, l)),
					(n.box = W.touchBBox(o)),
					(n.scale = 1),
					(n.ds = 0),
					(n.angle = W.touchAngle(o, l)),
					(n.da = 0),
					(e.gesture.startDistance = n.distance),
					(e.gesture.startAngle = n.angle);
			else if (s) {
				var u = e.prevEvent;
				(n.distance = u.distance),
					(n.box = u.box),
					(n.scale = u.scale),
					(n.ds = 0),
					(n.angle = u.angle),
					(n.da = 0);
			} else
				(n.distance = W.touchDistance(o, l)),
					(n.box = W.touchBBox(o)),
					(n.scale = n.distance / e.gesture.startDistance),
					(n.angle = W.touchAngle(o, l)),
					(n.ds = n.scale - e.gesture.scale),
					(n.da = n.angle - e.gesture.angle);
			(e.gesture.distance = n.distance),
				(e.gesture.angle = n.angle),
				i.default.number(n.scale) &&
					n.scale !== 1 / 0 &&
					!isNaN(n.scale) &&
					(e.gesture.scale = n.scale);
		}
	}
	Object.defineProperty(gt, "__esModule", { value: !0 }), (gt.default = void 0);
	var mt = {
			id: "actions/gesture",
			before: ["actions/drag", "actions/resize"],
			install: function (t) {
				var e = t.actions,
					n = t.Interactable,
					r = t.defaults;
				(n.prototype.gesturable = function (t) {
					return i.default.object(t)
						? ((this.options.gesture.enabled = !1 !== t.enabled),
						  this.setPerAction("gesture", t),
						  this.setOnEvents("gesture", t),
						  this)
						: i.default.bool(t)
						? ((this.options.gesture.enabled = t), this)
						: this.options.gesture;
				}),
					(e.map.gesture = mt),
					(e.methodDict.gesture = "gesturable"),
					(r.actions.gesture = mt.defaults);
			},
			listeners: {
				"interactions:action-start": yt,
				"interactions:action-move": yt,
				"interactions:action-end": yt,
				"interactions:new": function (t) {
					t.interaction.gesture = {
						angle: 0,
						distance: 0,
						scale: 1,
						startAngle: 0,
						startDistance: 0,
					};
				},
				"auto-start:check": function (t) {
					if (!(t.interaction.pointers.length < 2)) {
						var e = t.interactable.options.gesture;
						if (e && e.enabled) return (t.action = { name: "gesture" }), !1;
					}
				},
			},
			defaults: {},
			getCursor: function () {
				return "";
			},
		},
		bt = mt;
	gt.default = bt;
	var xt = {};
	function wt(t, e, n, r, o, a, s) {
		if (!e) return !1;
		if (!0 === e) {
			var l = i.default.number(a.width) ? a.width : a.right - a.left,
				u = i.default.number(a.height) ? a.height : a.bottom - a.top;
			if (
				((s = Math.min(
					s,
					Math.abs(("left" === t || "right" === t ? l : u) / 2)
				)),
				l < 0 && ("left" === t ? (t = "right") : "right" === t && (t = "left")),
				u < 0 && ("top" === t ? (t = "bottom") : "bottom" === t && (t = "top")),
				"left" === t)
			)
				return n.x < (l >= 0 ? a.left : a.right) + s;
			if ("top" === t) return n.y < (u >= 0 ? a.top : a.bottom) + s;
			if ("right" === t) return n.x > (l >= 0 ? a.right : a.left) - s;
			if ("bottom" === t) return n.y > (u >= 0 ? a.bottom : a.top) - s;
		}
		return (
			!!i.default.element(r) &&
			(i.default.element(e) ? e === r : _.matchesUpTo(r, e, o))
		);
	}
	function _t(t) {
		var e = t.iEvent,
			n = t.interaction;
		if ("resize" === n.prepared.name && n.resizeAxes) {
			var r = e;
			n.interactable.options.resize.square
				? ("y" === n.resizeAxes
						? (r.delta.x = r.delta.y)
						: (r.delta.y = r.delta.x),
				  (r.axes = "xy"))
				: ((r.axes = n.resizeAxes),
				  "x" === n.resizeAxes
						? (r.delta.y = 0)
						: "y" === n.resizeAxes && (r.delta.x = 0));
		}
	}
	Object.defineProperty(xt, "__esModule", { value: !0 }), (xt.default = void 0);
	var St = {
			id: "actions/resize",
			before: ["actions/drag"],
			install: function (t) {
				var e = t.actions,
					n = t.browser,
					r = t.Interactable,
					o = t.defaults;
				(St.cursors = (function (t) {
					return t.isIe9
						? {
								x: "e-resize",
								y: "s-resize",
								xy: "se-resize",
								top: "n-resize",
								left: "w-resize",
								bottom: "s-resize",
								right: "e-resize",
								topleft: "se-resize",
								bottomright: "se-resize",
								topright: "ne-resize",
								bottomleft: "ne-resize",
						  }
						: {
								x: "ew-resize",
								y: "ns-resize",
								xy: "nwse-resize",
								top: "ns-resize",
								left: "ew-resize",
								bottom: "ns-resize",
								right: "ew-resize",
								topleft: "nwse-resize",
								bottomright: "nwse-resize",
								topright: "nesw-resize",
								bottomleft: "nesw-resize",
						  };
				})(n)),
					(St.defaultMargin =
						n.supportsTouch || n.supportsPointerEvent ? 20 : 10),
					(r.prototype.resizable = function (e) {
						return (function (t, e, n) {
							if (i.default.object(e))
								return (
									(t.options.resize.enabled = !1 !== e.enabled),
									t.setPerAction("resize", e),
									t.setOnEvents("resize", e),
									i.default.string(e.axis) && /^x$|^y$|^xy$/.test(e.axis)
										? (t.options.resize.axis = e.axis)
										: null === e.axis &&
										  (t.options.resize.axis = n.defaults.actions.resize.axis),
									i.default.bool(e.preserveAspectRatio)
										? (t.options.resize.preserveAspectRatio =
												e.preserveAspectRatio)
										: i.default.bool(e.square) &&
										  (t.options.resize.square = e.square),
									t
								);
							if (i.default.bool(e)) return (t.options.resize.enabled = e), t;
							return t.options.resize;
						})(this, e, t);
					}),
					(e.map.resize = St),
					(e.methodDict.resize = "resizable"),
					(o.actions.resize = St.defaults);
			},
			listeners: {
				"interactions:new": function (t) {
					t.interaction.resizeAxes = "xy";
				},
				"interactions:action-start": function (t) {
					!(function (t) {
						var e = t.iEvent,
							n = t.interaction;
						if ("resize" === n.prepared.name && n.prepared.edges) {
							var r = e,
								o = n.rect;
							(n._rects = {
								start: (0, j.default)({}, o),
								corrected: (0, j.default)({}, o),
								previous: (0, j.default)({}, o),
								delta: {
									left: 0,
									right: 0,
									width: 0,
									top: 0,
									bottom: 0,
									height: 0,
								},
							}),
								(r.edges = n.prepared.edges),
								(r.rect = n._rects.corrected),
								(r.deltaRect = n._rects.delta);
						}
					})(t),
						_t(t);
				},
				"interactions:action-move": function (t) {
					!(function (t) {
						var e = t.iEvent,
							n = t.interaction;
						if ("resize" === n.prepared.name && n.prepared.edges) {
							var r = e,
								o = n.interactable.options.resize.invert,
								i = "reposition" === o || "negate" === o,
								a = n.rect,
								s = n._rects,
								l = s.start,
								u = s.corrected,
								c = s.delta,
								f = s.previous;
							if (((0, j.default)(f, u), i)) {
								if (((0, j.default)(u, a), "reposition" === o)) {
									if (u.top > u.bottom) {
										var d = u.top;
										(u.top = u.bottom), (u.bottom = d);
									}
									if (u.left > u.right) {
										var p = u.left;
										(u.left = u.right), (u.right = p);
									}
								}
							} else
								(u.top = Math.min(a.top, l.bottom)),
									(u.bottom = Math.max(a.bottom, l.top)),
									(u.left = Math.min(a.left, l.right)),
									(u.right = Math.max(a.right, l.left));
							for (var v in ((u.width = u.right - u.left),
							(u.height = u.bottom - u.top),
							u))
								c[v] = u[v] - f[v];
							(r.edges = n.prepared.edges), (r.rect = u), (r.deltaRect = c);
						}
					})(t),
						_t(t);
				},
				"interactions:action-end": function (t) {
					var e = t.iEvent,
						n = t.interaction;
					if ("resize" === n.prepared.name && n.prepared.edges) {
						var r = e;
						(r.edges = n.prepared.edges),
							(r.rect = n._rects.corrected),
							(r.deltaRect = n._rects.delta);
					}
				},
				"auto-start:check": function (t) {
					var e = t.interaction,
						n = t.interactable,
						r = t.element,
						o = t.rect,
						a = t.buttons;
					if (o) {
						var s = (0, j.default)({}, e.coords.cur.page),
							l = n.options.resize;
						if (
							l &&
							l.enabled &&
							(!e.pointerIsDown ||
								!/mouse|pointer/.test(e.pointerType) ||
								0 != (a & l.mouseButtons))
						) {
							if (i.default.object(l.edges)) {
								var u = { left: !1, right: !1, top: !1, bottom: !1 };
								for (var c in u)
									u[c] = wt(
										c,
										l.edges[c],
										s,
										e._latestPointer.eventTarget,
										r,
										o,
										l.margin || St.defaultMargin
									);
								(u.left = u.left && !u.right),
									(u.top = u.top && !u.bottom),
									(u.left || u.right || u.top || u.bottom) &&
										(t.action = { name: "resize", edges: u });
							} else {
								var f = "y" !== l.axis && s.x > o.right - St.defaultMargin,
									d = "x" !== l.axis && s.y > o.bottom - St.defaultMargin;
								(f || d) &&
									(t.action = {
										name: "resize",
										axes: (f ? "x" : "") + (d ? "y" : ""),
									});
							}
							return !t.action && void 0;
						}
					}
				},
			},
			defaults: {
				square: !1,
				preserveAspectRatio: !1,
				axis: "xy",
				margin: NaN,
				edges: null,
				invert: "none",
			},
			cursors: null,
			getCursor: function (t) {
				var e = t.edges,
					n = t.axis,
					r = t.name,
					o = St.cursors,
					i = null;
				if (n) i = o[r + n];
				else if (e) {
					for (
						var a = "", s = ["top", "bottom", "left", "right"], l = 0;
						l < s.length;
						l++
					) {
						var u = s[l];
						e[u] && (a += u);
					}
					i = o[a];
				}
				return i;
			},
			defaultMargin: null,
		},
		Pt = St;
	xt.default = Pt;
	var Ot = {};
	Object.defineProperty(Ot, "__esModule", { value: !0 }), (Ot.default = void 0);
	var Et = {
		id: "actions",
		install: function (t) {
			t.usePlugin(gt.default),
				t.usePlugin(xt.default),
				t.usePlugin(c.default),
				t.usePlugin(st.default);
		},
	};
	Ot.default = Et;
	var Tt = {};
	Object.defineProperty(Tt, "__esModule", { value: !0 }), (Tt.default = void 0);
	Tt.default = {};
	var Mt = {};
	Object.defineProperty(Mt, "__esModule", { value: !0 }), (Mt.default = void 0);
	var jt,
		kt,
		It = 0;
	var Dt = {
		request: function (t) {
			return jt(t);
		},
		cancel: function (t) {
			return kt(t);
		},
		init: function (t) {
			if (((jt = t.requestAnimationFrame), (kt = t.cancelAnimationFrame), !jt))
				for (var e = ["ms", "moz", "webkit", "o"], n = 0; n < e.length; n++) {
					var r = e[n];
					(jt = t["".concat(r, "RequestAnimationFrame")]),
						(kt =
							t["".concat(r, "CancelAnimationFrame")] ||
							t["".concat(r, "CancelRequestAnimationFrame")]);
				}
			(jt = jt && jt.bind(t)),
				(kt = kt && kt.bind(t)),
				jt ||
					((jt = function (e) {
						var n = Date.now(),
							r = Math.max(0, 16 - (n - It)),
							o = t.setTimeout(function () {
								e(n + r);
							}, r);
						return (It = n + r), o;
					}),
					(kt = function (t) {
						return clearTimeout(t);
					}));
		},
	};
	Mt.default = Dt;
	var At = {};
	Object.defineProperty(At, "__esModule", { value: !0 }),
		(At.getContainer = Ct),
		(At.getScroll = Rt),
		(At.getScrollSize = function (t) {
			i.default.window(t) && (t = window.document.body);
			return { x: t.scrollWidth, y: t.scrollHeight };
		}),
		(At.getScrollSizeDelta = function (t, e) {
			var n = t.interaction,
				r = t.element,
				o = n && n.interactable.options[n.prepared.name].autoScroll;
			if (!o || !o.enabled) return e(), { x: 0, y: 0 };
			var i = Ct(o.container, n.interactable, r),
				a = Rt(i);
			e();
			var s = Rt(i);
			return { x: s.x - a.x, y: s.y - a.y };
		}),
		(At.default = void 0);
	var zt = {
		defaults: { enabled: !1, margin: 60, container: null, speed: 300 },
		now: Date.now,
		interaction: null,
		i: 0,
		x: 0,
		y: 0,
		isScrolling: !1,
		prevTime: 0,
		margin: 0,
		speed: 0,
		start: function (t) {
			(zt.isScrolling = !0),
				Mt.default.cancel(zt.i),
				(t.autoScroll = zt),
				(zt.interaction = t),
				(zt.prevTime = zt.now()),
				(zt.i = Mt.default.request(zt.scroll));
		},
		stop: function () {
			(zt.isScrolling = !1),
				zt.interaction && (zt.interaction.autoScroll = null),
				Mt.default.cancel(zt.i);
		},
		scroll: function () {
			var t = zt.interaction,
				e = t.interactable,
				n = t.element,
				r = t.prepared.name,
				o = e.options[r].autoScroll,
				a = Ct(o.container, e, n),
				s = zt.now(),
				l = (s - zt.prevTime) / 1e3,
				u = o.speed * l;
			if (u >= 1) {
				var c = { x: zt.x * u, y: zt.y * u };
				if (c.x || c.y) {
					var f = Rt(a);
					i.default.window(a)
						? a.scrollBy(c.x, c.y)
						: a && ((a.scrollLeft += c.x), (a.scrollTop += c.y));
					var d = Rt(a),
						p = { x: d.x - f.x, y: d.y - f.y };
					(p.x || p.y) &&
						e.fire({
							type: "autoscroll",
							target: n,
							interactable: e,
							delta: p,
							interaction: t,
							container: a,
						});
				}
				zt.prevTime = s;
			}
			zt.isScrolling &&
				(Mt.default.cancel(zt.i), (zt.i = Mt.default.request(zt.scroll)));
		},
		check: function (t, e) {
			var n = t.options;
			return n[e].autoScroll && n[e].autoScroll.enabled;
		},
		onInteractionMove: function (t) {
			var e = t.interaction,
				n = t.pointer;
			if (e.interacting() && zt.check(e.interactable, e.prepared.name))
				if (e.simulation) zt.x = zt.y = 0;
				else {
					var r,
						o,
						a,
						s,
						l = e.interactable,
						u = e.element,
						c = e.prepared.name,
						f = l.options[c].autoScroll,
						d = Ct(f.container, l, u);
					if (i.default.window(d))
						(s = n.clientX < zt.margin),
							(r = n.clientY < zt.margin),
							(o = n.clientX > d.innerWidth - zt.margin),
							(a = n.clientY > d.innerHeight - zt.margin);
					else {
						var p = _.getElementClientRect(d);
						(s = n.clientX < p.left + zt.margin),
							(r = n.clientY < p.top + zt.margin),
							(o = n.clientX > p.right - zt.margin),
							(a = n.clientY > p.bottom - zt.margin);
					}
					(zt.x = o ? 1 : s ? -1 : 0),
						(zt.y = a ? 1 : r ? -1 : 0),
						zt.isScrolling ||
							((zt.margin = f.margin), (zt.speed = f.speed), zt.start(e));
				}
		},
	};
	function Ct(t, n, r) {
		return (
			(i.default.string(t) ? (0, k.getStringOptionResult)(t, n, r) : t) ||
			(0, e.getWindow)(r)
		);
	}
	function Rt(t) {
		return (
			i.default.window(t) && (t = window.document.body),
			{ x: t.scrollLeft, y: t.scrollTop }
		);
	}
	var Ft = {
		id: "auto-scroll",
		install: function (t) {
			var e = t.defaults,
				n = t.actions;
			(t.autoScroll = zt),
				(zt.now = function () {
					return t.now();
				}),
				(n.phaselessTypes.autoscroll = !0),
				(e.perAction.autoScroll = zt.defaults);
		},
		listeners: {
			"interactions:new": function (t) {
				t.interaction.autoScroll = null;
			},
			"interactions:destroy": function (t) {
				(t.interaction.autoScroll = null),
					zt.stop(),
					zt.interaction && (zt.interaction = null);
			},
			"interactions:stop": zt.stop,
			"interactions:action-move": function (t) {
				return zt.onInteractionMove(t);
			},
		},
	};
	At.default = Ft;
	var Xt = {};
	Object.defineProperty(Xt, "__esModule", { value: !0 }),
		(Xt.warnOnce = function (t, n) {
			var r = !1;
			return function () {
				return (
					r || (e.window.console.warn(n), (r = !0)), t.apply(this, arguments)
				);
			};
		}),
		(Xt.copyAction = function (t, e) {
			return (t.name = e.name), (t.axis = e.axis), (t.edges = e.edges), t;
		});
	var Yt = {};
	function Wt(t) {
		return i.default.bool(t)
			? ((this.options.styleCursor = t), this)
			: null === t
			? (delete this.options.styleCursor, this)
			: this.options.styleCursor;
	}
	function Lt(t) {
		return i.default.func(t)
			? ((this.options.actionChecker = t), this)
			: null === t
			? (delete this.options.actionChecker, this)
			: this.options.actionChecker;
	}
	Object.defineProperty(Yt, "__esModule", { value: !0 }), (Yt.default = void 0);
	var Bt = {
		id: "auto-start/interactableMethods",
		install: function (t) {
			var e = t.Interactable;
			(e.prototype.getAction = function (e, n, r, o) {
				var i = (function (t, e, n, r, o) {
					var i = t.getRect(r),
						a = e.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[e.button],
						s = {
							action: null,
							interactable: t,
							interaction: n,
							element: r,
							rect: i,
							buttons: a,
						};
					return o.fire("auto-start:check", s), s.action;
				})(this, n, r, o, t);
				return this.options.actionChecker
					? this.options.actionChecker(e, n, i, this, o, r)
					: i;
			}),
				(e.prototype.ignoreFrom = (0, Xt.warnOnce)(function (t) {
					return this._backCompatOption("ignoreFrom", t);
				}, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).")),
				(e.prototype.allowFrom = (0, Xt.warnOnce)(function (t) {
					return this._backCompatOption("allowFrom", t);
				}, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).")),
				(e.prototype.actionChecker = Lt),
				(e.prototype.styleCursor = Wt);
		},
	};
	Yt.default = Bt;
	var Ut = {};
	function Nt(t, e, n, r, o) {
		return e.testIgnoreAllow(e.options[t.name], n, r) &&
			e.options[t.name].enabled &&
			Gt(e, n, t, o)
			? t
			: null;
	}
	function Vt(t, e, n, r, o, i, a) {
		for (var s = 0, l = r.length; s < l; s++) {
			var u = r[s],
				c = o[s],
				f = u.getAction(e, n, t, c);
			if (f) {
				var d = Nt(f, u, c, i, a);
				if (d) return { action: d, interactable: u, element: c };
			}
		}
		return { action: null, interactable: null, element: null };
	}
	function qt(t, e, n, r, o) {
		var a = [],
			s = [],
			l = r;
		function u(t) {
			a.push(t), s.push(l);
		}
		for (; i.default.element(l); ) {
			(a = []), (s = []), o.interactables.forEachMatch(l, u);
			var c = Vt(t, e, n, a, s, r, o);
			if (c.action && !c.interactable.options[c.action.name].manualStart)
				return c;
			l = _.parentNode(l);
		}
		return { action: null, interactable: null, element: null };
	}
	function $t(t, e, n) {
		var r = e.action,
			o = e.interactable,
			i = e.element;
		(r = r || { name: null }),
			(t.interactable = o),
			(t.element = i),
			(0, Xt.copyAction)(t.prepared, r),
			(t.rect = o && r.name ? o.getRect(i) : null),
			Zt(t, n),
			n.fire("autoStart:prepared", { interaction: t });
	}
	function Gt(t, e, n, r) {
		var o = t.options,
			i = o[n.name].max,
			a = o[n.name].maxPerElement,
			s = r.autoStart.maxInteractions,
			l = 0,
			u = 0,
			c = 0;
		if (!(i && a && s)) return !1;
		for (var f = 0; f < r.interactions.list.length; f++) {
			var d = r.interactions.list[f],
				p = d.prepared.name;
			if (d.interacting()) {
				if (++l >= s) return !1;
				if (d.interactable === t) {
					if ((u += p === n.name ? 1 : 0) >= i) return !1;
					if (d.element === e && (c++, p === n.name && c >= a)) return !1;
				}
			}
		}
		return s > 0;
	}
	function Ht(t, e) {
		return i.default.number(t)
			? ((e.autoStart.maxInteractions = t), this)
			: e.autoStart.maxInteractions;
	}
	function Kt(t, e, n) {
		var r = n.autoStart.cursorElement;
		r && r !== t && (r.style.cursor = ""),
			(t.ownerDocument.documentElement.style.cursor = e),
			(t.style.cursor = e),
			(n.autoStart.cursorElement = e ? t : null);
	}
	function Zt(t, e) {
		var n = t.interactable,
			r = t.element,
			o = t.prepared;
		if ("mouse" === t.pointerType && n && n.options.styleCursor) {
			var a = "";
			if (o.name) {
				var s = n.options[o.name].cursorChecker;
				a = i.default.func(s)
					? s(o, n, r, t._interacting)
					: e.actions.map[o.name].getCursor(o);
			}
			Kt(t.element, a || "", e);
		} else e.autoStart.cursorElement && Kt(e.autoStart.cursorElement, "", e);
	}
	Object.defineProperty(Ut, "__esModule", { value: !0 }), (Ut.default = void 0);
	var Jt = {
		id: "auto-start/base",
		before: ["actions"],
		install: function (t) {
			var e = t.interactStatic,
				n = t.defaults;
			t.usePlugin(Yt.default),
				(n.base.actionChecker = null),
				(n.base.styleCursor = !0),
				(0, j.default)(n.perAction, {
					manualStart: !1,
					max: 1 / 0,
					maxPerElement: 1,
					allowFrom: null,
					ignoreFrom: null,
					mouseButtons: 1,
				}),
				(e.maxInteractions = function (e) {
					return Ht(e, t);
				}),
				(t.autoStart = {
					maxInteractions: 1 / 0,
					withinInteractionLimit: Gt,
					cursorElement: null,
				});
		},
		listeners: {
			"interactions:down": function (t, e) {
				var n = t.interaction,
					r = t.pointer,
					o = t.event,
					i = t.eventTarget;
				n.interacting() || $t(n, qt(n, r, o, i, e), e);
			},
			"interactions:move": function (t, e) {
				!(function (t, e) {
					var n = t.interaction,
						r = t.pointer,
						o = t.event,
						i = t.eventTarget;
					"mouse" !== n.pointerType ||
						n.pointerIsDown ||
						n.interacting() ||
						$t(n, qt(n, r, o, i, e), e);
				})(t, e),
					(function (t, e) {
						var n = t.interaction;
						if (
							n.pointerIsDown &&
							!n.interacting() &&
							n.pointerWasMoved &&
							n.prepared.name
						) {
							e.fire("autoStart:before-start", t);
							var r = n.interactable,
								o = n.prepared.name;
							o &&
								r &&
								(r.options[o].manualStart || !Gt(r, n.element, n.prepared, e)
									? n.stop()
									: (n.start(n.prepared, r, n.element), Zt(n, e)));
						}
					})(t, e);
			},
			"interactions:stop": function (t, e) {
				var n = t.interaction,
					r = n.interactable;
				r && r.options.styleCursor && Kt(n.element, "", e);
			},
		},
		maxInteractions: Ht,
		withinInteractionLimit: Gt,
		validateAction: Nt,
	};
	Ut.default = Jt;
	var Qt = {};
	Object.defineProperty(Qt, "__esModule", { value: !0 }), (Qt.default = void 0);
	var te = {
		id: "auto-start/dragAxis",
		listeners: {
			"autoStart:before-start": function (t, e) {
				var n = t.interaction,
					r = t.eventTarget,
					o = t.dx,
					a = t.dy;
				if ("drag" === n.prepared.name) {
					var s = Math.abs(o),
						l = Math.abs(a),
						u = n.interactable.options.drag,
						c = u.startAxis,
						f = s > l ? "x" : s < l ? "y" : "xy";
					if (
						((n.prepared.axis = "start" === u.lockAxis ? f[0] : u.lockAxis),
						"xy" !== f && "xy" !== c && c !== f)
					) {
						n.prepared.name = null;
						for (
							var d = r,
								p = function (t) {
									if (t !== n.interactable) {
										var o = n.interactable.options.drag;
										if (!o.manualStart && t.testIgnoreAllow(o, d, r)) {
											var i = t.getAction(n.downPointer, n.downEvent, n, d);
											if (
												i &&
												"drag" === i.name &&
												(function (t, e) {
													if (!e) return !1;
													var n = e.options.drag.startAxis;
													return "xy" === t || "xy" === n || n === t;
												})(f, t) &&
												Ut.default.validateAction(i, t, d, r, e)
											)
												return t;
										}
									}
								};
							i.default.element(d);

						) {
							var v = e.interactables.forEachMatch(d, p);
							if (v) {
								(n.prepared.name = "drag"),
									(n.interactable = v),
									(n.element = d);
								break;
							}
							d = (0, _.parentNode)(d);
						}
					}
				}
			},
		},
	};
	Qt.default = te;
	var ee = {};
	function ne(t) {
		var e = t.prepared && t.prepared.name;
		if (!e) return null;
		var n = t.interactable.options;
		return n[e].hold || n[e].delay;
	}
	Object.defineProperty(ee, "__esModule", { value: !0 }), (ee.default = void 0);
	var re = {
		id: "auto-start/hold",
		install: function (t) {
			var e = t.defaults;
			t.usePlugin(Ut.default), (e.perAction.hold = 0), (e.perAction.delay = 0);
		},
		listeners: {
			"interactions:new": function (t) {
				t.interaction.autoStartHoldTimer = null;
			},
			"autoStart:prepared": function (t) {
				var e = t.interaction,
					n = ne(e);
				n > 0 &&
					(e.autoStartHoldTimer = setTimeout(function () {
						e.start(e.prepared, e.interactable, e.element);
					}, n));
			},
			"interactions:move": function (t) {
				var e = t.interaction,
					n = t.duplicate;
				e.autoStartHoldTimer &&
					e.pointerWasMoved &&
					!n &&
					(clearTimeout(e.autoStartHoldTimer), (e.autoStartHoldTimer = null));
			},
			"autoStart:before-start": function (t) {
				var e = t.interaction;
				ne(e) > 0 && (e.prepared.name = null);
			},
		},
		getHoldDuration: ne,
	};
	ee.default = re;
	var oe = {};
	Object.defineProperty(oe, "__esModule", { value: !0 }), (oe.default = void 0);
	var ie = {
		id: "auto-start",
		install: function (t) {
			t.usePlugin(Ut.default), t.usePlugin(ee.default), t.usePlugin(Qt.default);
		},
	};
	oe.default = ie;
	var ae = {};
	Object.defineProperty(ae, "__esModule", { value: !0 }), (ae.default = void 0);
	ae.default = {};
	var se = {};
	function le(t) {
		return /^(always|never|auto)$/.test(t)
			? ((this.options.preventDefault = t), this)
			: i.default.bool(t)
			? ((this.options.preventDefault = t ? "always" : "never"), this)
			: this.options.preventDefault;
	}
	function ue(t) {
		var e = t.interaction,
			n = t.event;
		e.interactable && e.interactable.checkAndPreventDefault(n);
	}
	function ce(t) {
		var n = t.Interactable;
		(n.prototype.preventDefault = le),
			(n.prototype.checkAndPreventDefault = function (n) {
				return (function (t, n, r) {
					var o = t.options.preventDefault;
					if ("never" !== o)
						if ("always" !== o) {
							if (
								n.events.supportsPassive &&
								/^touch(start|move)$/.test(r.type)
							) {
								var a = (0, e.getWindow)(r.target).document,
									s = n.getDocOptions(a);
								if (!s || !s.events || !1 !== s.events.passive) return;
							}
							/^(mouse|pointer|touch)*(down|start)/i.test(r.type) ||
								(i.default.element(r.target) &&
									(0, _.matchesSelector)(
										r.target,
										"input,select,textarea,[contenteditable=true],[contenteditable=true] *"
									)) ||
								r.preventDefault();
						} else r.preventDefault();
				})(this, t, n);
			}),
			t.interactions.docEvents.push({
				type: "dragstart",
				listener: function (e) {
					for (var n = 0; n < t.interactions.list.length; n++) {
						var r = t.interactions.list[n];
						if (
							r.element &&
							(r.element === e.target ||
								(0, _.nodeContains)(r.element, e.target))
						)
							return void r.interactable.checkAndPreventDefault(e);
					}
				},
			});
	}
	Object.defineProperty(se, "__esModule", { value: !0 }),
		(se.install = ce),
		(se.default = void 0);
	var fe = {
		id: "core/interactablePreventDefault",
		install: ce,
		listeners: ["down", "move", "up", "cancel"].reduce(function (t, e) {
			return (t["interactions:".concat(e)] = ue), t;
		}, {}),
	};
	se.default = fe;
	var de,
		pe = {};
	function ve(t) {
		return (
			(function (t) {
				if (Array.isArray(t)) return he(t);
			})(t) ||
			(function (t) {
				if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
					return Array.from(t);
			})(t) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return he(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return he(t, e);
			})(t) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function he(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	Object.defineProperty(pe, "__esModule", { value: !0 }),
		(pe.default = void 0),
		(function (t) {
			(t.touchAction = "touchAction"),
				(t.boxSizing = "boxSizing"),
				(t.noListeners = "noListeners");
		})(de || (de = {}));
	var ge = {
		touchAction:
			"https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",
		boxSizing: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
	};
	var ye = [
		{
			name: de.touchAction,
			perform: function (t) {
				return !(function (t, e, n) {
					var r = t;
					for (; i.default.element(r); ) {
						if (me(r, e, n)) return !0;
						r = (0, _.parentNode)(r);
					}
					return !1;
				})(t.element, "touchAction", /pan-|pinch|none/);
			},
			getInfo: function (t) {
				return [t.element, ge.touchAction];
			},
			text: 'Consider adding CSS "touch-action: none" to this element\n',
		},
		{
			name: de.boxSizing,
			perform: function (t) {
				var e = t.element;
				return (
					"resize" === t.prepared.name &&
					e instanceof h.default.HTMLElement &&
					!me(e, "boxSizing", /border-box/)
				);
			},
			text:
				'Consider adding CSS "box-sizing: border-box" to this resizable element',
			getInfo: function (t) {
				return [t.element, ge.boxSizing];
			},
		},
		{
			name: de.noListeners,
			perform: function (t) {
				var e = t.prepared.name;
				return !(t.interactable.events.types["".concat(e, "move")] || [])
					.length;
			},
			getInfo: function (t) {
				return [t.prepared.name, t.interactable];
			},
			text: "There are no listeners set for this action",
		},
	];
	function me(t, n, r) {
		var o = t.style[n] || e.window.getComputedStyle(t)[n];
		return r.test((o || "").toString());
	}
	var be = "dev-tools",
		xe = {
			id: be,
			install: function (t) {
				var e =
						arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
					n = e.logger,
					r = t.Interactable,
					o = t.defaults;
				(t.logger = n || console),
					(o.base.devTools = { ignore: {} }),
					(r.prototype.devTools = function (t) {
						return t
							? ((0, j.default)(this.options.devTools, t), this)
							: this.options.devTools;
					});
			},
			listeners: {
				"interactions:action-start": function (t, e) {
					for (var n = t.interaction, r = 0; r < ye.length; r++) {
						var o,
							i = ye[r],
							a = n.interactable && n.interactable.options;
						if (!(a && a.devTools && a.devTools.ignore[i.name]) && i.perform(n))
							(o = e.logger).warn.apply(
								o,
								["[interact.js] " + i.text].concat(ve(i.getInfo(n)))
							);
					}
				},
			},
			checks: ye,
			CheckName: de,
			links: ge,
			prefix: "[interact.js] ",
		};
	pe.default = xe;
	var we = {};
	Object.defineProperty(we, "__esModule", { value: !0 }), (we.default = void 0);
	we.default = {};
	var _e = {};
	Object.defineProperty(_e, "__esModule", { value: !0 }),
		(_e.default = function t(e) {
			var n = {};
			for (var r in e) {
				var o = e[r];
				i.default.plainObject(o)
					? (n[r] = t(o))
					: i.default.array(o)
					? (n[r] = K.from(o))
					: (n[r] = o);
			}
			return n;
		});
	var Se = {};
	function Pe(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
					return;
				var n = [],
					r = !0,
					o = !1,
					i = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) &&
						(n.push(a.value), !e || n.length !== e);
						r = !0
					);
				} catch (t) {
					(o = !0), (i = t);
				} finally {
					try {
						r || null == s.return || s.return();
					} finally {
						if (o) throw i;
					}
				}
				return n;
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return Oe(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return Oe(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function Oe(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	function Ee(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	Object.defineProperty(Se, "__esModule", { value: !0 }),
		(Se.getRectOffset = je),
		(Se.default = void 0);
	var Te = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.states = []),
				(this.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }),
				(this.startDelta = null),
				(this.result = null),
				(this.endResult = null),
				(this.edges = void 0),
				(this.interaction = void 0),
				(this.interaction = e),
				(this.result = Me());
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{
					key: "start",
					value: function (t, e) {
						var n = t.phase,
							r = this.interaction,
							o = (function (t) {
								var e = t.interactable.options[t.prepared.name],
									n = e.modifiers;
								return n && n.length
									? n
									: [
											"snap",
											"snapSize",
											"snapEdges",
											"restrict",
											"restrictEdges",
											"restrictSize",
									  ]
											.map(function (t) {
												var n = e[t];
												return (
													n && n.enabled && { options: n, methods: n._methods }
												);
											})
											.filter(function (t) {
												return !!t;
											});
							})(r);
						this.prepareStates(o),
							(this.edges = (0, j.default)({}, r.edges)),
							(this.startOffset = je(r.rect, e)),
							(this.startDelta = { x: 0, y: 0 });
						var i = { phase: n, pageCoords: e, preEnd: !1 };
						return (
							(this.result = Me()),
							this.startAll(i),
							(this.result = this.setAll(i))
						);
					},
				},
				{
					key: "fillArg",
					value: function (t) {
						var e = this.interaction;
						(t.interaction = e),
							(t.interactable = e.interactable),
							(t.element = e.element),
							(t.rect = t.rect || e.rect),
							(t.edges = this.edges),
							(t.startOffset = this.startOffset);
					},
				},
				{
					key: "startAll",
					value: function (t) {
						this.fillArg(t);
						for (var e = 0; e < this.states.length; e++) {
							var n = this.states[e];
							n.methods.start && ((t.state = n), n.methods.start(t));
						}
					},
				},
				{
					key: "setAll",
					value: function (t) {
						this.fillArg(t);
						var e = t.phase,
							n = t.preEnd,
							r = t.skipModifiers,
							o = t.rect;
						(t.coords = (0, j.default)({}, t.pageCoords)),
							(t.rect = (0, j.default)({}, o));
						for (
							var i = r ? this.states.slice(r) : this.states,
								a = Me(t.coords, t.rect),
								s = 0;
							s < i.length;
							s++
						) {
							var l = i[s],
								u = l.options,
								c = (0, j.default)({}, t.coords),
								f = null;
							l.methods.set &&
								this.shouldDo(u, n, e) &&
								((t.state = l),
								(f = l.methods.set(t)),
								k.addEdges(this.interaction.edges, t.rect, {
									x: t.coords.x - c.x,
									y: t.coords.y - c.y,
								})),
								a.eventProps.push(f);
						}
						(a.delta.x = t.coords.x - t.pageCoords.x),
							(a.delta.y = t.coords.y - t.pageCoords.y),
							(a.rectDelta.left = t.rect.left - o.left),
							(a.rectDelta.right = t.rect.right - o.right),
							(a.rectDelta.top = t.rect.top - o.top),
							(a.rectDelta.bottom = t.rect.bottom - o.bottom);
						var d = this.result.coords,
							p = this.result.rect;
						if (d && p) {
							var v =
								a.rect.left !== p.left ||
								a.rect.right !== p.right ||
								a.rect.top !== p.top ||
								a.rect.bottom !== p.bottom;
							a.changed = v || d.x !== a.coords.x || d.y !== a.coords.y;
						}
						return a;
					},
				},
				{
					key: "applyToInteraction",
					value: function (t) {
						var e = this.interaction,
							n = t.phase,
							r = e.coords.cur,
							o = e.coords.start,
							i = this.result,
							a = this.startDelta,
							s = i.delta;
						"start" === n && (0, j.default)(this.startDelta, i.delta);
						for (
							var l = [
									[o, a],
									[r, s],
								],
								u = 0;
							u < l.length;
							u++
						) {
							var c = Pe(l[u], 2),
								f = c[0],
								d = c[1];
							(f.page.x += d.x),
								(f.page.y += d.y),
								(f.client.x += d.x),
								(f.client.y += d.y);
						}
						var p = this.result.rectDelta,
							v = t.rect || e.rect;
						(v.left += p.left),
							(v.right += p.right),
							(v.top += p.top),
							(v.bottom += p.bottom),
							(v.width = v.right - v.left),
							(v.height = v.bottom - v.top);
					},
				},
				{
					key: "setAndApply",
					value: function (t) {
						var e = this.interaction,
							n = t.phase,
							r = t.preEnd,
							o = t.skipModifiers,
							i = this.setAll({
								preEnd: r,
								phase: n,
								pageCoords: t.modifiedCoords || e.coords.cur.page,
							});
						if (
							((this.result = i),
							!i.changed && (!o || o < this.states.length) && e.interacting())
						)
							return !1;
						if (t.modifiedCoords) {
							var a = e.coords.cur.page,
								s = {
									x: t.modifiedCoords.x - a.x,
									y: t.modifiedCoords.y - a.y,
								};
							(i.coords.x += s.x),
								(i.coords.y += s.y),
								(i.delta.x += s.x),
								(i.delta.y += s.y);
						}
						this.applyToInteraction(t);
					},
				},
				{
					key: "beforeEnd",
					value: function (t) {
						var e = t.interaction,
							n = t.event,
							r = this.states;
						if (r && r.length) {
							for (var o = !1, i = 0; i < r.length; i++) {
								var a = r[i];
								t.state = a;
								var s = a.options,
									l = a.methods,
									u = l.beforeEnd && l.beforeEnd(t);
								if (u) return (this.endResult = u), !1;
								o = o || (!o && this.shouldDo(s, !0, t.phase, !0));
							}
							o && e.move({ event: n, preEnd: !0 });
						}
					},
				},
				{
					key: "stop",
					value: function (t) {
						var e = t.interaction;
						if (this.states && this.states.length) {
							var n = (0, j.default)(
								{
									states: this.states,
									interactable: e.interactable,
									element: e.element,
									rect: null,
								},
								t
							);
							this.fillArg(n);
							for (var r = 0; r < this.states.length; r++) {
								var o = this.states[r];
								(n.state = o), o.methods.stop && o.methods.stop(n);
							}
							(this.states = null), (this.endResult = null);
						}
					},
				},
				{
					key: "prepareStates",
					value: function (t) {
						this.states = [];
						for (var e = 0; e < t.length; e++) {
							var n = t[e],
								r = n.options,
								o = n.methods,
								i = n.name;
							this.states.push({ options: r, methods: o, index: e, name: i });
						}
						return this.states;
					},
				},
				{
					key: "restoreInteractionCoords",
					value: function (t) {
						var e = t.interaction,
							n = e.coords,
							r = e.rect,
							o = e.modification;
						if (o.result) {
							for (
								var i = o.startDelta,
									a = o.result,
									s = a.delta,
									l = a.rectDelta,
									u = [
										[n.start, i],
										[n.cur, s],
									],
									c = 0;
								c < u.length;
								c++
							) {
								var f = Pe(u[c], 2),
									d = f[0],
									p = f[1];
								(d.page.x -= p.x),
									(d.page.y -= p.y),
									(d.client.x -= p.x),
									(d.client.y -= p.y);
							}
							(r.left -= l.left),
								(r.right -= l.right),
								(r.top -= l.top),
								(r.bottom -= l.bottom);
						}
					},
				},
				{
					key: "shouldDo",
					value: function (t, e, n, r) {
						return !(
							!t ||
							!1 === t.enabled ||
							(r && !t.endOnly) ||
							(t.endOnly && !e) ||
							("start" === n && !t.setStart)
						);
					},
				},
				{
					key: "copyFrom",
					value: function (t) {
						(this.startOffset = t.startOffset),
							(this.startDelta = t.startDelta),
							(this.edges = t.edges),
							(this.states = t.states.map(function (t) {
								return (0, _e.default)(t);
							})),
							(this.result = Me(
								(0, j.default)({}, t.result.coords),
								(0, j.default)({}, t.result.rect)
							));
					},
				},
				{
					key: "destroy",
					value: function () {
						for (var t in this) this[t] = null;
					},
				},
			]) && Ee(e.prototype, n),
			r && Ee(e, r),
			t
		);
	})();
	function Me(t, e) {
		return {
			rect: e,
			coords: t,
			delta: { x: 0, y: 0 },
			rectDelta: { left: 0, right: 0, top: 0, bottom: 0 },
			eventProps: [],
			changed: !0,
		};
	}
	function je(t, e) {
		return t
			? {
					left: e.x - t.left,
					top: e.y - t.top,
					right: t.right - e.x,
					bottom: t.bottom - e.y,
			  }
			: { left: 0, top: 0, right: 0, bottom: 0 };
	}
	Se.default = Te;
	var ke = {};
	function Ie(t) {
		var e = t.iEvent,
			n = t.interaction.modification.result;
		n && (e.modifiers = n.eventProps);
	}
	Object.defineProperty(ke, "__esModule", { value: !0 }),
		(ke.makeModifier = function (t, e) {
			var n = t.defaults,
				r = {
					start: t.start,
					set: t.set,
					beforeEnd: t.beforeEnd,
					stop: t.stop,
				},
				o = function (t) {
					var o = t || {};
					for (var i in ((o.enabled = !1 !== o.enabled), n))
						i in o || (o[i] = n[i]);
					var a = {
						options: o,
						methods: r,
						name: e,
						enable: function () {
							return (o.enabled = !0), a;
						},
						disable: function () {
							return (o.enabled = !1), a;
						},
					};
					return a;
				};
			e && "string" == typeof e && ((o._defaults = n), (o._methods = r));
			return o;
		}),
		(ke.addEventModifiers = Ie),
		(ke.default = void 0);
	var De = {
		id: "modifiers/base",
		before: ["actions"],
		install: function (t) {
			t.defaults.perAction.modifiers = [];
		},
		listeners: {
			"interactions:new": function (t) {
				var e = t.interaction;
				e.modification = new Se.default(e);
			},
			"interactions:before-action-start": function (t) {
				var e = t.interaction.modification;
				e.start(t, t.interaction.coords.start.page),
					(t.interaction.edges = e.edges),
					e.applyToInteraction(t);
			},
			"interactions:before-action-move": function (t) {
				return t.interaction.modification.setAndApply(t);
			},
			"interactions:before-action-end": function (t) {
				return t.interaction.modification.beforeEnd(t);
			},
			"interactions:action-start": Ie,
			"interactions:action-move": Ie,
			"interactions:action-end": Ie,
			"interactions:after-action-start": function (t) {
				return t.interaction.modification.restoreInteractionCoords(t);
			},
			"interactions:after-action-move": function (t) {
				return t.interaction.modification.restoreInteractionCoords(t);
			},
			"interactions:stop": function (t) {
				return t.interaction.modification.stop(t);
			},
		},
	};
	ke.default = De;
	var Ae = {};
	Object.defineProperty(Ae, "__esModule", { value: !0 }),
		(Ae.defaults = void 0);
	Ae.defaults = {
		base: { preventDefault: "auto", deltaSource: "page" },
		perAction: { enabled: !1, origin: { x: 0, y: 0 } },
		actions: {},
	};
	var ze = {};
	function Ce(t) {
		return (Ce =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	function Re(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function Fe(t, e) {
		return (Fe =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, e);
	}
	function Xe(t) {
		var e = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Le(t);
			if (e) {
				var o = Le(this).constructor;
				n = Reflect.construct(r, arguments, o);
			} else n = r.apply(this, arguments);
			return Ye(this, n);
		};
	}
	function Ye(t, e) {
		return !e || ("object" !== Ce(e) && "function" != typeof e) ? We(t) : e;
	}
	function We(t) {
		if (void 0 === t)
			throw new ReferenceError(
				"this hasn't been initialised - super() hasn't been called"
			);
		return t;
	}
	function Le(t) {
		return (Le = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	Object.defineProperty(ze, "__esModule", { value: !0 }),
		(ze.InteractEvent = void 0);
	var Be = (function (t) {
		!(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError(
					"Super expression must either be null or a function"
				);
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, writable: !0, configurable: !0 },
			})),
				e && Fe(t, e);
		})(i, t);
		var e,
			n,
			r,
			o = Xe(i);
		function i(t, e, n, r, a, s, l) {
			var u;
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, i),
				((u = o.call(this, t)).target = void 0),
				(u.currentTarget = void 0),
				(u.relatedTarget = null),
				(u.screenX = void 0),
				(u.screenY = void 0),
				(u.button = void 0),
				(u.buttons = void 0),
				(u.ctrlKey = void 0),
				(u.shiftKey = void 0),
				(u.altKey = void 0),
				(u.metaKey = void 0),
				(u.page = void 0),
				(u.client = void 0),
				(u.delta = void 0),
				(u.rect = void 0),
				(u.x0 = void 0),
				(u.y0 = void 0),
				(u.t0 = void 0),
				(u.dt = void 0),
				(u.duration = void 0),
				(u.clientX0 = void 0),
				(u.clientY0 = void 0),
				(u.velocity = void 0),
				(u.speed = void 0),
				(u.swipe = void 0),
				(u.timeStamp = void 0),
				(u.dragEnter = void 0),
				(u.dragLeave = void 0),
				(u.axes = void 0),
				(u.preEnd = void 0),
				(a = a || t.element);
			var c = t.interactable,
				f = ((c && c.options) || Ae.defaults).deltaSource,
				d = (0, A.default)(c, a, n),
				p = "start" === r,
				v = "end" === r,
				h = p ? We(u) : t.prevEvent,
				g = p
					? t.coords.start
					: v
					? {
							page: h.page,
							client: h.client,
							timeStamp: t.coords.cur.timeStamp,
					  }
					: t.coords.cur;
			return (
				(u.page = (0, j.default)({}, g.page)),
				(u.client = (0, j.default)({}, g.client)),
				(u.rect = (0, j.default)({}, t.rect)),
				(u.timeStamp = g.timeStamp),
				v ||
					((u.page.x -= d.x),
					(u.page.y -= d.y),
					(u.client.x -= d.x),
					(u.client.y -= d.y)),
				(u.ctrlKey = e.ctrlKey),
				(u.altKey = e.altKey),
				(u.shiftKey = e.shiftKey),
				(u.metaKey = e.metaKey),
				(u.button = e.button),
				(u.buttons = e.buttons),
				(u.target = a),
				(u.currentTarget = a),
				(u.preEnd = s),
				(u.type = l || n + (r || "")),
				(u.interactable = c),
				(u.t0 = p ? t.pointers[t.pointers.length - 1].downTime : h.t0),
				(u.x0 = t.coords.start.page.x - d.x),
				(u.y0 = t.coords.start.page.y - d.y),
				(u.clientX0 = t.coords.start.client.x - d.x),
				(u.clientY0 = t.coords.start.client.y - d.y),
				(u.delta =
					p || v ? { x: 0, y: 0 } : { x: u[f].x - h[f].x, y: u[f].y - h[f].y }),
				(u.dt = t.coords.delta.timeStamp),
				(u.duration = u.timeStamp - u.t0),
				(u.velocity = (0, j.default)({}, t.coords.velocity[f])),
				(u.speed = (0, R.default)(u.velocity.x, u.velocity.y)),
				(u.swipe = v || "inertiastart" === r ? u.getSwipe() : null),
				u
			);
		}
		return (
			(e = i),
			(n = [
				{
					key: "getSwipe",
					value: function () {
						var t = this._interaction;
						if (
							t.prevEvent.speed < 600 ||
							this.timeStamp - t.prevEvent.timeStamp > 150
						)
							return null;
						var e =
							(180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX)) /
							Math.PI;
						e < 0 && (e += 360);
						var n = 112.5 <= e && e < 247.5,
							r = 202.5 <= e && e < 337.5;
						return {
							up: r,
							down: !r && 22.5 <= e && e < 157.5,
							left: n,
							right: !n && (292.5 <= e || e < 67.5),
							angle: e,
							speed: t.prevEvent.speed,
							velocity: { x: t.prevEvent.velocityX, y: t.prevEvent.velocityY },
						};
					},
				},
				{ key: "preventDefault", value: function () {} },
				{
					key: "stopImmediatePropagation",
					value: function () {
						this.immediatePropagationStopped = this.propagationStopped = !0;
					},
				},
				{
					key: "stopPropagation",
					value: function () {
						this.propagationStopped = !0;
					},
				},
			]) && Re(e.prototype, n),
			r && Re(e, r),
			i
		);
	})($.BaseEvent);
	(ze.InteractEvent = Be),
		Object.defineProperties(Be.prototype, {
			pageX: {
				get: function () {
					return this.page.x;
				},
				set: function (t) {
					this.page.x = t;
				},
			},
			pageY: {
				get: function () {
					return this.page.y;
				},
				set: function (t) {
					this.page.y = t;
				},
			},
			clientX: {
				get: function () {
					return this.client.x;
				},
				set: function (t) {
					this.client.x = t;
				},
			},
			clientY: {
				get: function () {
					return this.client.y;
				},
				set: function (t) {
					this.client.y = t;
				},
			},
			dx: {
				get: function () {
					return this.delta.x;
				},
				set: function (t) {
					this.delta.x = t;
				},
			},
			dy: {
				get: function () {
					return this.delta.y;
				},
				set: function (t) {
					this.delta.y = t;
				},
			},
			velocityX: {
				get: function () {
					return this.velocity.x;
				},
				set: function (t) {
					this.velocity.x = t;
				},
			},
			velocityY: {
				get: function () {
					return this.velocity.y;
				},
				set: function (t) {
					this.velocity.y = t;
				},
			},
		});
	var Ue = {};
	Object.defineProperty(Ue, "__esModule", { value: !0 }),
		(Ue.PointerInfo = void 0);
	Ue.PointerInfo = function t(e, n, r, o, i) {
		!(function (t, e) {
			if (!(t instanceof e))
				throw new TypeError("Cannot call a class as a function");
		})(this, t),
			(this.id = void 0),
			(this.pointer = void 0),
			(this.event = void 0),
			(this.downTime = void 0),
			(this.downTarget = void 0),
			(this.id = e),
			(this.pointer = n),
			(this.event = r),
			(this.downTime = o),
			(this.downTarget = i);
	};
	var Ne,
		Ve,
		qe = {};
	function $e(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function Ge(t, e, n) {
		return e && $e(t.prototype, e), n && $e(t, n), t;
	}
	Object.defineProperty(qe, "__esModule", { value: !0 }),
		Object.defineProperty(qe, "PointerInfo", {
			enumerable: !0,
			get: function () {
				return Ue.PointerInfo;
			},
		}),
		(qe.default = qe.Interaction = qe._ProxyMethods = qe._ProxyValues = void 0),
		(qe._ProxyValues = Ne),
		(function (t) {
			(t.interactable = ""),
				(t.element = ""),
				(t.prepared = ""),
				(t.pointerIsDown = ""),
				(t.pointerWasMoved = ""),
				(t._proxy = "");
		})(Ne || (qe._ProxyValues = Ne = {})),
		(qe._ProxyMethods = Ve),
		(function (t) {
			(t.start = ""),
				(t.move = ""),
				(t.end = ""),
				(t.stop = ""),
				(t.interacting = "");
		})(Ve || (qe._ProxyMethods = Ve = {}));
	var He = 0,
		Ke = (function () {
			function t(e) {
				var n = this,
					r = e.pointerType,
					o = e.scopeFire;
				!(function (t, e) {
					if (!(t instanceof e))
						throw new TypeError("Cannot call a class as a function");
				})(this, t),
					(this.interactable = null),
					(this.element = null),
					(this.rect = void 0),
					(this._rects = void 0),
					(this.edges = void 0),
					(this._scopeFire = void 0),
					(this.prepared = { name: null, axis: null, edges: null }),
					(this.pointerType = void 0),
					(this.pointers = []),
					(this.downEvent = null),
					(this.downPointer = {}),
					(this._latestPointer = {
						pointer: null,
						event: null,
						eventTarget: null,
					}),
					(this.prevEvent = null),
					(this.pointerIsDown = !1),
					(this.pointerWasMoved = !1),
					(this._interacting = !1),
					(this._ending = !1),
					(this._stopped = !0),
					(this._proxy = null),
					(this.simulation = null),
					(this.doMove = (0, Xt.warnOnce)(function (t) {
						this.move(t);
					}, "The interaction.doMove() method has been renamed to interaction.move()")),
					(this.coords = {
						start: W.newCoords(),
						prev: W.newCoords(),
						cur: W.newCoords(),
						delta: W.newCoords(),
						velocity: W.newCoords(),
					}),
					(this._id = He++),
					(this._scopeFire = o),
					(this.pointerType = r);
				var i = this;
				this._proxy = {};
				var a = function (t) {
					Object.defineProperty(n._proxy, t, {
						get: function () {
							return i[t];
						},
					});
				};
				for (var s in Ne) a(s);
				var l = function (t) {
					Object.defineProperty(n._proxy, t, {
						value: function () {
							return i[t].apply(i, arguments);
						},
					});
				};
				for (var u in Ve) l(u);
				this._scopeFire("interactions:new", { interaction: this });
			}
			return (
				Ge(t, [
					{
						key: "pointerMoveTolerance",
						get: function () {
							return 1;
						},
					},
				]),
				Ge(t, [
					{
						key: "pointerDown",
						value: function (t, e, n) {
							var r = this.updatePointer(t, e, n, !0),
								o = this.pointers[r];
							this._scopeFire("interactions:down", {
								pointer: t,
								event: e,
								eventTarget: n,
								pointerIndex: r,
								pointerInfo: o,
								type: "down",
								interaction: this,
							});
						},
					},
					{
						key: "start",
						value: function (t, e, n) {
							return (
								!(
									this.interacting() ||
									!this.pointerIsDown ||
									this.pointers.length < ("gesture" === t.name ? 2 : 1) ||
									!e.options[t.name].enabled
								) &&
								((0, Xt.copyAction)(this.prepared, t),
								(this.interactable = e),
								(this.element = n),
								(this.rect = e.getRect(n)),
								(this.edges = this.prepared.edges
									? (0, j.default)({}, this.prepared.edges)
									: { left: !0, right: !0, top: !0, bottom: !0 }),
								(this._stopped = !1),
								(this._interacting =
									this._doPhase({
										interaction: this,
										event: this.downEvent,
										phase: "start",
									}) && !this._stopped),
								this._interacting)
							);
						},
					},
					{
						key: "pointerMove",
						value: function (t, e, n) {
							this.simulation ||
								(this.modification && this.modification.endResult) ||
								this.updatePointer(t, e, n, !1);
							var r,
								o,
								i =
									this.coords.cur.page.x === this.coords.prev.page.x &&
									this.coords.cur.page.y === this.coords.prev.page.y &&
									this.coords.cur.client.x === this.coords.prev.client.x &&
									this.coords.cur.client.y === this.coords.prev.client.y;
							this.pointerIsDown &&
								!this.pointerWasMoved &&
								((r = this.coords.cur.client.x - this.coords.start.client.x),
								(o = this.coords.cur.client.y - this.coords.start.client.y),
								(this.pointerWasMoved =
									(0, R.default)(r, o) > this.pointerMoveTolerance));
							var a = this.getPointerIndex(t),
								s = {
									pointer: t,
									pointerIndex: a,
									pointerInfo: this.pointers[a],
									event: e,
									type: "move",
									eventTarget: n,
									dx: r,
									dy: o,
									duplicate: i,
									interaction: this,
								};
							i || W.setCoordVelocity(this.coords.velocity, this.coords.delta),
								this._scopeFire("interactions:move", s),
								i ||
									this.simulation ||
									(this.interacting() && ((s.type = null), this.move(s)),
									this.pointerWasMoved &&
										W.copyCoords(this.coords.prev, this.coords.cur));
						},
					},
					{
						key: "move",
						value: function (t) {
							(t && t.event) || W.setZeroCoords(this.coords.delta),
								((t = (0, j.default)(
									{
										pointer: this._latestPointer.pointer,
										event: this._latestPointer.event,
										eventTarget: this._latestPointer.eventTarget,
										interaction: this,
									},
									t || {}
								)).phase = "move"),
								this._doPhase(t);
						},
					},
					{
						key: "pointerUp",
						value: function (t, e, n, r) {
							var o = this.getPointerIndex(t);
							-1 === o && (o = this.updatePointer(t, e, n, !1));
							var i = /cancel$/i.test(e.type) ? "cancel" : "up";
							this._scopeFire("interactions:".concat(i), {
								pointer: t,
								pointerIndex: o,
								pointerInfo: this.pointers[o],
								event: e,
								eventTarget: n,
								type: i,
								curEventTarget: r,
								interaction: this,
							}),
								this.simulation || this.end(e),
								this.removePointer(t, e);
						},
					},
					{
						key: "documentBlur",
						value: function (t) {
							this.end(t),
								this._scopeFire("interactions:blur", {
									event: t,
									type: "blur",
									interaction: this,
								});
						},
					},
					{
						key: "end",
						value: function (t) {
							var e;
							(this._ending = !0),
								(t = t || this._latestPointer.event),
								this.interacting() &&
									(e = this._doPhase({
										event: t,
										interaction: this,
										phase: "end",
									})),
								(this._ending = !1),
								!0 === e && this.stop();
						},
					},
					{
						key: "currentAction",
						value: function () {
							return this._interacting ? this.prepared.name : null;
						},
					},
					{
						key: "interacting",
						value: function () {
							return this._interacting;
						},
					},
					{
						key: "stop",
						value: function () {
							this._scopeFire("interactions:stop", { interaction: this }),
								(this.interactable = this.element = null),
								(this._interacting = !1),
								(this._stopped = !0),
								(this.prepared.name = this.prevEvent = null);
						},
					},
					{
						key: "getPointerIndex",
						value: function (t) {
							var e = W.getPointerId(t);
							return "mouse" === this.pointerType || "pen" === this.pointerType
								? this.pointers.length - 1
								: K.findIndex(this.pointers, function (t) {
										return t.id === e;
								  });
						},
					},
					{
						key: "getPointerInfo",
						value: function (t) {
							return this.pointers[this.getPointerIndex(t)];
						},
					},
					{
						key: "updatePointer",
						value: function (t, e, n, r) {
							var o = W.getPointerId(t),
								i = this.getPointerIndex(t),
								a = this.pointers[i];
							return (
								(r = !1 !== r && (r || /(down|start)$/i.test(e.type))),
								a
									? (a.pointer = t)
									: ((a = new Ue.PointerInfo(o, t, e, null, null)),
									  (i = this.pointers.length),
									  this.pointers.push(a)),
								W.setCoords(
									this.coords.cur,
									this.pointers.map(function (t) {
										return t.pointer;
									}),
									this._now()
								),
								W.setCoordDeltas(
									this.coords.delta,
									this.coords.prev,
									this.coords.cur
								),
								r &&
									((this.pointerIsDown = !0),
									(a.downTime = this.coords.cur.timeStamp),
									(a.downTarget = n),
									W.pointerExtend(this.downPointer, t),
									this.interacting() ||
										(W.copyCoords(this.coords.start, this.coords.cur),
										W.copyCoords(this.coords.prev, this.coords.cur),
										(this.downEvent = e),
										(this.pointerWasMoved = !1))),
								this._updateLatestPointer(t, e, n),
								this._scopeFire("interactions:update-pointer", {
									pointer: t,
									event: e,
									eventTarget: n,
									down: r,
									pointerInfo: a,
									pointerIndex: i,
									interaction: this,
								}),
								i
							);
						},
					},
					{
						key: "removePointer",
						value: function (t, e) {
							var n = this.getPointerIndex(t);
							if (-1 !== n) {
								var r = this.pointers[n];
								this._scopeFire("interactions:remove-pointer", {
									pointer: t,
									event: e,
									eventTarget: null,
									pointerIndex: n,
									pointerInfo: r,
									interaction: this,
								}),
									this.pointers.splice(n, 1),
									(this.pointerIsDown = !1);
							}
						},
					},
					{
						key: "_updateLatestPointer",
						value: function (t, e, n) {
							(this._latestPointer.pointer = t),
								(this._latestPointer.event = e),
								(this._latestPointer.eventTarget = n);
						},
					},
					{
						key: "destroy",
						value: function () {
							(this._latestPointer.pointer = null),
								(this._latestPointer.event = null),
								(this._latestPointer.eventTarget = null);
						},
					},
					{
						key: "_createPreparedEvent",
						value: function (t, e, n, r) {
							return new ze.InteractEvent(
								this,
								t,
								this.prepared.name,
								e,
								this.element,
								n,
								r
							);
						},
					},
					{
						key: "_fireEvent",
						value: function (t) {
							this.interactable.fire(t),
								(!this.prevEvent || t.timeStamp >= this.prevEvent.timeStamp) &&
									(this.prevEvent = t);
						},
					},
					{
						key: "_doPhase",
						value: function (t) {
							var e = t.event,
								n = t.phase,
								r = t.preEnd,
								o = t.type,
								i = this.rect;
							if (
								(i &&
									"move" === n &&
									(k.addEdges(
										this.edges,
										i,
										this.coords.delta[this.interactable.options.deltaSource]
									),
									(i.width = i.right - i.left),
									(i.height = i.bottom - i.top)),
								!1 ===
									this._scopeFire("interactions:before-action-".concat(n), t))
							)
								return !1;
							var a = (t.iEvent = this._createPreparedEvent(e, n, r, o));
							return (
								this._scopeFire("interactions:action-".concat(n), t),
								"start" === n && (this.prevEvent = a),
								this._fireEvent(a),
								this._scopeFire("interactions:after-action-".concat(n), t),
								!0
							);
						},
					},
					{
						key: "_now",
						value: function () {
							return Date.now();
						},
					},
				]),
				t
			);
		})();
	qe.Interaction = Ke;
	var Ze = Ke;
	qe.default = Ze;
	var Je = {};
	function Qe(t) {
		t.pointerIsDown &&
			(rn(t.coords.cur, t.offset.total),
			(t.offset.pending.x = 0),
			(t.offset.pending.y = 0));
	}
	function tn(t) {
		en(t.interaction);
	}
	function en(t) {
		if (
			!(function (t) {
				return !(!t.offset.pending.x && !t.offset.pending.y);
			})(t)
		)
			return !1;
		var e = t.offset.pending;
		return (
			rn(t.coords.cur, e),
			rn(t.coords.delta, e),
			k.addEdges(t.edges, t.rect, e),
			(e.x = 0),
			(e.y = 0),
			!0
		);
	}
	function nn(t) {
		var e = t.x,
			n = t.y;
		(this.offset.pending.x += e),
			(this.offset.pending.y += n),
			(this.offset.total.x += e),
			(this.offset.total.y += n);
	}
	function rn(t, e) {
		var n = t.page,
			r = t.client,
			o = e.x,
			i = e.y;
		(n.x += o), (n.y += i), (r.x += o), (r.y += i);
	}
	Object.defineProperty(Je, "__esModule", { value: !0 }),
		(Je.addTotal = Qe),
		(Je.applyPending = en),
		(Je.default = void 0),
		(qe._ProxyMethods.offsetBy = "");
	var on = {
		id: "offset",
		before: ["modifiers", "pointer-events", "actions", "inertia"],
		install: function (t) {
			t.Interaction.prototype.offsetBy = nn;
		},
		listeners: {
			"interactions:new": function (t) {
				t.interaction.offset = {
					total: { x: 0, y: 0 },
					pending: { x: 0, y: 0 },
				};
			},
			"interactions:update-pointer": function (t) {
				return Qe(t.interaction);
			},
			"interactions:before-action-start": tn,
			"interactions:before-action-move": tn,
			"interactions:before-action-end": function (t) {
				var e = t.interaction;
				if (en(e)) return e.move({ offset: !0 }), e.end(), !1;
			},
			"interactions:stop": function (t) {
				var e = t.interaction;
				(e.offset.total.x = 0),
					(e.offset.total.y = 0),
					(e.offset.pending.x = 0),
					(e.offset.pending.y = 0);
			},
		},
	};
	Je.default = on;
	var an = {};
	function sn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	Object.defineProperty(an, "__esModule", { value: !0 }),
		(an.default = an.InertiaState = void 0);
	var ln = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.active = !1),
				(this.isModified = !1),
				(this.smoothEnd = !1),
				(this.allowResume = !1),
				(this.modification = null),
				(this.modifierCount = 0),
				(this.modifierArg = null),
				(this.startCoords = null),
				(this.t0 = 0),
				(this.v0 = 0),
				(this.te = 0),
				(this.targetOffset = null),
				(this.modifiedOffset = null),
				(this.currentOffset = null),
				(this.lambda_v0 = 0),
				(this.one_ve_v0 = 0),
				(this.timeout = null),
				(this.interaction = void 0),
				(this.interaction = e);
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{
					key: "start",
					value: function (t) {
						var e = this.interaction,
							n = un(e);
						if (!n || !n.enabled) return !1;
						var r = e.coords.velocity.client,
							o = (0, R.default)(r.x, r.y),
							i = this.modification || (this.modification = new Se.default(e));
						if (
							(i.copyFrom(e.modification),
							(this.t0 = e._now()),
							(this.allowResume = n.allowResume),
							(this.v0 = o),
							(this.currentOffset = { x: 0, y: 0 }),
							(this.startCoords = e.coords.cur.page),
							(this.modifierArg = {
								interaction: e,
								interactable: e.interactable,
								element: e.element,
								rect: e.rect,
								edges: e.edges,
								pageCoords: this.startCoords,
								preEnd: !0,
								phase: "inertiastart",
							}),
							this.t0 - e.coords.cur.timeStamp < 50 &&
								o > n.minSpeed &&
								o > n.endSpeed)
						)
							this.startInertia();
						else {
							if (((i.result = i.setAll(this.modifierArg)), !i.result.changed))
								return !1;
							this.startSmoothEnd();
						}
						return (
							(e.modification.result.rect = null),
							e.offsetBy(this.targetOffset),
							e._doPhase({ interaction: e, event: t, phase: "inertiastart" }),
							e.offsetBy({ x: -this.targetOffset.x, y: -this.targetOffset.y }),
							(e.modification.result.rect = null),
							(this.active = !0),
							(e.simulation = this),
							!0
						);
					},
				},
				{
					key: "startInertia",
					value: function () {
						var t = this,
							e = this.interaction.coords.velocity.client,
							n = un(this.interaction),
							r = n.resistance,
							o = -Math.log(n.endSpeed / this.v0) / r;
						(this.targetOffset = { x: (e.x - o) / r, y: (e.y - o) / r }),
							(this.te = o),
							(this.lambda_v0 = r / this.v0),
							(this.one_ve_v0 = 1 - n.endSpeed / this.v0);
						var i = this.modification,
							a = this.modifierArg;
						(a.pageCoords = {
							x: this.startCoords.x + this.targetOffset.x,
							y: this.startCoords.y + this.targetOffset.y,
						}),
							(i.result = i.setAll(a)),
							i.result.changed &&
								((this.isModified = !0),
								(this.modifiedOffset = {
									x: this.targetOffset.x + i.result.delta.x,
									y: this.targetOffset.y + i.result.delta.y,
								})),
							this.onNextFrame(function () {
								return t.inertiaTick();
							});
					},
				},
				{
					key: "startSmoothEnd",
					value: function () {
						var t = this;
						(this.smoothEnd = !0),
							(this.isModified = !0),
							(this.targetOffset = {
								x: this.modification.result.delta.x,
								y: this.modification.result.delta.y,
							}),
							this.onNextFrame(function () {
								return t.smoothEndTick();
							});
					},
				},
				{
					key: "onNextFrame",
					value: function (t) {
						var e = this;
						this.timeout = Mt.default.request(function () {
							e.active && t();
						});
					},
				},
				{
					key: "inertiaTick",
					value: function () {
						var t,
							e,
							n,
							r,
							o,
							i,
							a,
							s = this,
							l = this.interaction,
							u = un(l).resistance,
							c = (l._now() - this.t0) / 1e3;
						if (c < this.te) {
							var f,
								d = 1 - (Math.exp(-u * c) - this.lambda_v0) / this.one_ve_v0;
							this.isModified
								? ((t = 0),
								  (e = 0),
								  (n = this.targetOffset.x),
								  (r = this.targetOffset.y),
								  (o = this.modifiedOffset.x),
								  (i = this.modifiedOffset.y),
								  (f = { x: cn((a = d), t, n, o), y: cn(a, e, r, i) }))
								: (f = {
										x: this.targetOffset.x * d,
										y: this.targetOffset.y * d,
								  });
							var p = {
								x: f.x - this.currentOffset.x,
								y: f.y - this.currentOffset.y,
							};
							(this.currentOffset.x += p.x),
								(this.currentOffset.y += p.y),
								l.offsetBy(p),
								l.move(),
								this.onNextFrame(function () {
									return s.inertiaTick();
								});
						} else
							l.offsetBy({
								x: this.modifiedOffset.x - this.currentOffset.x,
								y: this.modifiedOffset.y - this.currentOffset.y,
							}),
								this.end();
					},
				},
				{
					key: "smoothEndTick",
					value: function () {
						var t = this,
							e = this.interaction,
							n = e._now() - this.t0,
							r = un(e).smoothEndDuration;
						if (n < r) {
							var o = {
									x: fn(n, 0, this.targetOffset.x, r),
									y: fn(n, 0, this.targetOffset.y, r),
								},
								i = {
									x: o.x - this.currentOffset.x,
									y: o.y - this.currentOffset.y,
								};
							(this.currentOffset.x += i.x),
								(this.currentOffset.y += i.y),
								e.offsetBy(i),
								e.move({ skipModifiers: this.modifierCount }),
								this.onNextFrame(function () {
									return t.smoothEndTick();
								});
						} else
							e.offsetBy({
								x: this.targetOffset.x - this.currentOffset.x,
								y: this.targetOffset.y - this.currentOffset.y,
							}),
								this.end();
					},
				},
				{
					key: "resume",
					value: function (t) {
						var e = t.pointer,
							n = t.event,
							r = t.eventTarget,
							o = this.interaction;
						o.offsetBy({ x: -this.currentOffset.x, y: -this.currentOffset.y }),
							o.updatePointer(e, n, r, !0),
							o._doPhase({ interaction: o, event: n, phase: "resume" }),
							(0, W.copyCoords)(o.coords.prev, o.coords.cur),
							this.stop();
					},
				},
				{
					key: "end",
					value: function () {
						this.interaction.move(), this.interaction.end(), this.stop();
					},
				},
				{
					key: "stop",
					value: function () {
						(this.active = this.smoothEnd = !1),
							(this.interaction.simulation = null),
							Mt.default.cancel(this.timeout);
					},
				},
			]) && sn(e.prototype, n),
			r && sn(e, r),
			t
		);
	})();
	function un(t) {
		var e = t.interactable,
			n = t.prepared;
		return e && e.options && n.name && e.options[n.name].inertia;
	}
	function cn(t, e, n, r) {
		var o = 1 - t;
		return o * o * e + 2 * o * t * n + t * t * r;
	}
	function fn(t, e, n, r) {
		return -n * (t /= r) * (t - 2) + e;
	}
	an.InertiaState = ln;
	var dn = {
		id: "inertia",
		before: ["modifiers", "actions"],
		install: function (t) {
			var e = t.defaults;
			t.usePlugin(Je.default),
				t.usePlugin(ke.default),
				(t.actions.phases.inertiastart = !0),
				(t.actions.phases.resume = !0),
				(e.perAction.inertia = {
					enabled: !1,
					resistance: 10,
					minSpeed: 100,
					endSpeed: 10,
					allowResume: !0,
					smoothEndDuration: 300,
				});
		},
		listeners: {
			"interactions:new": function (t) {
				var e = t.interaction;
				e.inertia = new ln(e);
			},
			"interactions:before-action-end": function (t) {
				var e = t.interaction,
					n = t.event;
				return (!e._interacting || e.simulation || !e.inertia.start(n)) && null;
			},
			"interactions:down": function (t) {
				var e = t.interaction,
					n = t.eventTarget,
					r = e.inertia;
				if (r.active)
					for (var o = n; i.default.element(o); ) {
						if (o === e.element) {
							r.resume(t);
							break;
						}
						o = _.parentNode(o);
					}
			},
			"interactions:stop": function (t) {
				var e = t.interaction.inertia;
				e.active && e.stop();
			},
			"interactions:before-action-resume": function (t) {
				var e = t.interaction.modification;
				e.stop(t),
					e.start(t, t.interaction.coords.cur.page),
					e.applyToInteraction(t);
			},
			"interactions:before-action-inertiastart": function (t) {
				return t.interaction.modification.setAndApply(t);
			},
			"interactions:action-resume": ke.addEventModifiers,
			"interactions:action-inertiastart": ke.addEventModifiers,
			"interactions:after-action-inertiastart": function (t) {
				return t.interaction.modification.restoreInteractionCoords(t);
			},
			"interactions:after-action-resume": function (t) {
				return t.interaction.modification.restoreInteractionCoords(t);
			},
		},
	};
	an.default = dn;
	var pn = {};
	function vn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function hn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			if (t.immediatePropagationStopped) break;
			r(t);
		}
	}
	Object.defineProperty(pn, "__esModule", { value: !0 }),
		(pn.Eventable = void 0);
	var gn = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.options = void 0),
				(this.types = {}),
				(this.propagationStopped = !1),
				(this.immediatePropagationStopped = !1),
				(this.global = void 0),
				(this.options = (0, j.default)({}, e || {}));
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{
					key: "fire",
					value: function (t) {
						var e,
							n = this.global;
						(e = this.types[t.type]) && hn(t, e),
							!t.propagationStopped && n && (e = n[t.type]) && hn(t, e);
					},
				},
				{
					key: "on",
					value: function (t, e) {
						var n = (0, z.default)(t, e);
						for (t in n) this.types[t] = K.merge(this.types[t] || [], n[t]);
					},
				},
				{
					key: "off",
					value: function (t, e) {
						var n = (0, z.default)(t, e);
						for (t in n) {
							var r = this.types[t];
							if (r && r.length)
								for (var o = 0; o < n[t].length; o++) {
									var i = n[t][o],
										a = r.indexOf(i);
									-1 !== a && r.splice(a, 1);
								}
						}
					},
				},
				{
					key: "getRect",
					value: function (t) {
						return null;
					},
				},
			]) && vn(e.prototype, n),
			r && vn(e, r),
			t
		);
	})();
	pn.Eventable = gn;
	var yn = {};
	Object.defineProperty(yn, "__esModule", { value: !0 }),
		(yn.default = function (t, e) {
			if (e.phaselessTypes[t]) return !0;
			for (var n in e.map)
				if (0 === t.indexOf(n) && t.substr(n.length) in e.phases) return !0;
			return !1;
		});
	var mn = {};
	function bn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function xn(t, e, n) {
		return e && bn(t.prototype, e), n && bn(t, n), t;
	}
	Object.defineProperty(mn, "__esModule", { value: !0 }),
		(mn.Interactable = void 0);
	var wn = (function () {
		function t(n, r, o, i) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.options = void 0),
				(this._actions = void 0),
				(this.target = void 0),
				(this.events = new pn.Eventable()),
				(this._context = void 0),
				(this._win = void 0),
				(this._doc = void 0),
				(this._scopeEvents = void 0),
				(this._rectChecker = void 0),
				(this._actions = r.actions),
				(this.target = n),
				(this._context = r.context || o),
				(this._win = (0, e.getWindow)(
					(0, _.trySelector)(n) ? this._context : n
				)),
				(this._doc = this._win.document),
				(this._scopeEvents = i),
				this.set(r);
		}
		return (
			xn(t, [
				{
					key: "_defaults",
					get: function () {
						return { base: {}, perAction: {}, actions: {} };
					},
				},
			]),
			xn(t, [
				{
					key: "setOnEvents",
					value: function (t, e) {
						return (
							i.default.func(e.onstart) &&
								this.on("".concat(t, "start"), e.onstart),
							i.default.func(e.onmove) &&
								this.on("".concat(t, "move"), e.onmove),
							i.default.func(e.onend) && this.on("".concat(t, "end"), e.onend),
							i.default.func(e.oninertiastart) &&
								this.on("".concat(t, "inertiastart"), e.oninertiastart),
							this
						);
					},
				},
				{
					key: "updatePerActionListeners",
					value: function (t, e, n) {
						(i.default.array(e) || i.default.object(e)) && this.off(t, e),
							(i.default.array(n) || i.default.object(n)) && this.on(t, n);
					},
				},
				{
					key: "setPerAction",
					value: function (t, e) {
						var n = this._defaults;
						for (var r in e) {
							var o = r,
								a = this.options[t],
								s = e[o];
							"listeners" === o &&
								this.updatePerActionListeners(t, a.listeners, s),
								i.default.array(s)
									? (a[o] = K.from(s))
									: i.default.plainObject(s)
									? ((a[o] = (0, j.default)(a[o] || {}, (0, _e.default)(s))),
									  i.default.object(n.perAction[o]) &&
											"enabled" in n.perAction[o] &&
											(a[o].enabled = !1 !== s.enabled))
									: i.default.bool(s) && i.default.object(n.perAction[o])
									? (a[o].enabled = s)
									: (a[o] = s);
						}
					},
				},
				{
					key: "getRect",
					value: function (t) {
						return (
							(t = t || (i.default.element(this.target) ? this.target : null)),
							i.default.string(this.target) &&
								(t = t || this._context.querySelector(this.target)),
							(0, _.getElementRect)(t)
						);
					},
				},
				{
					key: "rectChecker",
					value: function (t) {
						var e = this;
						return i.default.func(t)
							? ((this._rectChecker = t),
							  (this.getRect = function (t) {
									var n = (0, j.default)({}, e._rectChecker(t));
									return (
										"width" in n ||
											((n.width = n.right - n.left),
											(n.height = n.bottom - n.top)),
										n
									);
							  }),
							  this)
							: null === t
							? (delete this.getRect, delete this._rectChecker, this)
							: this.getRect;
					},
				},
				{
					key: "_backCompatOption",
					value: function (t, e) {
						if ((0, _.trySelector)(e) || i.default.object(e)) {
							for (var n in ((this.options[t] = e), this._actions.map))
								this.options[n][t] = e;
							return this;
						}
						return this.options[t];
					},
				},
				{
					key: "origin",
					value: function (t) {
						return this._backCompatOption("origin", t);
					},
				},
				{
					key: "deltaSource",
					value: function (t) {
						return "page" === t || "client" === t
							? ((this.options.deltaSource = t), this)
							: this.options.deltaSource;
					},
				},
				{
					key: "context",
					value: function () {
						return this._context;
					},
				},
				{
					key: "inContext",
					value: function (t) {
						return (
							this._context === t.ownerDocument ||
							(0, _.nodeContains)(this._context, t)
						);
					},
				},
				{
					key: "testIgnoreAllow",
					value: function (t, e, n) {
						return (
							!this.testIgnore(t.ignoreFrom, e, n) &&
							this.testAllow(t.allowFrom, e, n)
						);
					},
				},
				{
					key: "testAllow",
					value: function (t, e, n) {
						return (
							!t ||
							(!!i.default.element(n) &&
								(i.default.string(t)
									? (0, _.matchesUpTo)(n, t, e)
									: !!i.default.element(t) && (0, _.nodeContains)(t, n)))
						);
					},
				},
				{
					key: "testIgnore",
					value: function (t, e, n) {
						return (
							!(!t || !i.default.element(n)) &&
							(i.default.string(t)
								? (0, _.matchesUpTo)(n, t, e)
								: !!i.default.element(t) && (0, _.nodeContains)(t, n))
						);
					},
				},
				{
					key: "fire",
					value: function (t) {
						return this.events.fire(t), this;
					},
				},
				{
					key: "_onOff",
					value: function (t, e, n, r) {
						i.default.object(e) && !i.default.array(e) && ((r = n), (n = null));
						var o = "on" === t ? "add" : "remove",
							a = (0, z.default)(e, n);
						for (var s in a) {
							"wheel" === s && (s = b.default.wheelEvent);
							for (var l = 0; l < a[s].length; l++) {
								var u = a[s][l];
								(0, yn.default)(s, this._actions)
									? this.events[t](s, u)
									: i.default.string(this.target)
									? this._scopeEvents["".concat(o, "Delegate")](
											this.target,
											this._context,
											s,
											u,
											r
									  )
									: this._scopeEvents[o](this.target, s, u, r);
							}
						}
						return this;
					},
				},
				{
					key: "on",
					value: function (t, e, n) {
						return this._onOff("on", t, e, n);
					},
				},
				{
					key: "off",
					value: function (t, e, n) {
						return this._onOff("off", t, e, n);
					},
				},
				{
					key: "set",
					value: function (t) {
						var e = this._defaults;
						for (var n in (i.default.object(t) || (t = {}),
						(this.options = (0, _e.default)(e.base)),
						this._actions.methodDict)) {
							var r = n,
								o = this._actions.methodDict[r];
							(this.options[r] = {}),
								this.setPerAction(
									r,
									(0, j.default)((0, j.default)({}, e.perAction), e.actions[r])
								),
								this[o](t[r]);
						}
						for (var a in t) i.default.func(this[a]) && this[a](t[a]);
						return this;
					},
				},
				{
					key: "unset",
					value: function () {
						if (i.default.string(this.target))
							for (var t in this._scopeEvents.delegatedEvents)
								for (
									var e = this._scopeEvents.delegatedEvents[t],
										n = e.length - 1;
									n >= 0;
									n--
								) {
									var r = e[n],
										o = r.selector,
										a = r.context,
										s = r.listeners;
									o === this.target && a === this._context && e.splice(n, 1);
									for (var l = s.length - 1; l >= 0; l--)
										this._scopeEvents.removeDelegate(
											this.target,
											this._context,
											t,
											s[l][0],
											s[l][1]
										);
								}
						else this._scopeEvents.remove(this.target, "all");
					},
				},
			]),
			t
		);
	})();
	mn.Interactable = wn;
	var _n = {};
	function Sn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	Object.defineProperty(_n, "__esModule", { value: !0 }),
		(_n.InteractableSet = void 0);
	var Pn = (function () {
		function t(e) {
			var n = this;
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.list = []),
				(this.selectorMap = {}),
				(this.scope = void 0),
				(this.scope = e),
				e.addListeners({
					"interactable:unset": function (t) {
						var e = t.interactable,
							r = e.target,
							o = e._context,
							a = i.default.string(r) ? n.selectorMap[r] : r[n.scope.id],
							s = K.findIndex(a, function (t) {
								return t.context === o;
							});
						a[s] && ((a[s].context = null), (a[s].interactable = null)),
							a.splice(s, 1);
					},
				});
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{
					key: "new",
					value: function (t, e) {
						e = (0, j.default)(e || {}, { actions: this.scope.actions });
						var n = new this.scope.Interactable(
								t,
								e,
								this.scope.document,
								this.scope.events
							),
							r = { context: n._context, interactable: n };
						return (
							this.scope.addDocument(n._doc),
							this.list.push(n),
							i.default.string(t)
								? (this.selectorMap[t] || (this.selectorMap[t] = []),
								  this.selectorMap[t].push(r))
								: (n.target[this.scope.id] ||
										Object.defineProperty(t, this.scope.id, {
											value: [],
											configurable: !0,
										}),
								  t[this.scope.id].push(r)),
							this.scope.fire("interactable:new", {
								target: t,
								options: e,
								interactable: n,
								win: this.scope._win,
							}),
							n
						);
					},
				},
				{
					key: "get",
					value: function (t, e) {
						var n = (e && e.context) || this.scope.document,
							r = i.default.string(t),
							o = r ? this.selectorMap[t] : t[this.scope.id];
						if (!o) return null;
						var a = K.find(o, function (e) {
							return e.context === n && (r || e.interactable.inContext(t));
						});
						return a && a.interactable;
					},
				},
				{
					key: "forEachMatch",
					value: function (t, e) {
						for (var n = 0; n < this.list.length; n++) {
							var r = this.list[n],
								o = void 0;
							if (
								((i.default.string(r.target)
									? i.default.element(t) && _.matchesSelector(t, r.target)
									: t === r.target) &&
									r.inContext(t) &&
									(o = e(r)),
								void 0 !== o)
							)
								return o;
						}
					},
				},
			]) && Sn(e.prototype, n),
			r && Sn(e, r),
			t
		);
	})();
	_n.InteractableSet = Pn;
	var On = {};
	function En(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function Tn(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
					return;
				var n = [],
					r = !0,
					o = !1,
					i = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) &&
						(n.push(a.value), !e || n.length !== e);
						r = !0
					);
				} catch (t) {
					(o = !0), (i = t);
				} finally {
					try {
						r || null == s.return || s.return();
					} finally {
						if (o) throw i;
					}
				}
				return n;
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return Mn(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return Mn(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function Mn(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	Object.defineProperty(On, "__esModule", { value: !0 }), (On.default = void 0);
	var jn = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this.currentTarget = void 0),
				(this.originalEvent = void 0),
				(this.type = void 0),
				(this.originalEvent = e),
				(0, F.default)(this, e);
		}
		var e, n, r;
		return (
			(e = t),
			(n = [
				{
					key: "preventOriginalDefault",
					value: function () {
						this.originalEvent.preventDefault();
					},
				},
				{
					key: "stopPropagation",
					value: function () {
						this.originalEvent.stopPropagation();
					},
				},
				{
					key: "stopImmediatePropagation",
					value: function () {
						this.originalEvent.stopImmediatePropagation();
					},
				},
			]) && En(e.prototype, n),
			r && En(e, r),
			t
		);
	})();
	function kn(t) {
		if (!i.default.object(t)) return { capture: !!t, passive: !1 };
		var e = (0, j.default)({}, t);
		return (e.capture = !!t.capture), (e.passive = !!t.passive), e;
	}
	var In = {
		id: "events",
		install: function (t) {
			var e = [],
				n = {},
				r = [],
				o = {
					add: a,
					remove: s,
					addDelegate: function (t, e, o, i, s) {
						var c = kn(s);
						if (!n[o]) {
							n[o] = [];
							for (var f = 0; f < r.length; f++) {
								var d = r[f];
								a(d, o, l), a(d, o, u, !0);
							}
						}
						var p = n[o],
							v = K.find(p, function (n) {
								return n.selector === t && n.context === e;
							});
						v || ((v = { selector: t, context: e, listeners: [] }), p.push(v));
						v.listeners.push([i, c]);
					},
					removeDelegate: function (t, e, r, o, i) {
						var a,
							c = kn(i),
							f = n[r],
							d = !1;
						if (!f) return;
						for (a = f.length - 1; a >= 0; a--) {
							var p = f[a];
							if (p.selector === t && p.context === e) {
								for (var v = p.listeners, h = v.length - 1; h >= 0; h--) {
									var g = Tn(v[h], 2),
										y = g[0],
										m = g[1],
										b = m.capture,
										x = m.passive;
									if (y === o && b === c.capture && x === c.passive) {
										v.splice(h, 1),
											v.length || (f.splice(a, 1), s(e, r, l), s(e, r, u, !0)),
											(d = !0);
										break;
									}
								}
								if (d) break;
							}
						}
					},
					delegateListener: l,
					delegateUseCapture: u,
					delegatedEvents: n,
					documents: r,
					targets: e,
					supportsOptions: !1,
					supportsPassive: !1,
				};
			function a(t, n, r, i) {
				var a = kn(i),
					s = K.find(e, function (e) {
						return e.eventTarget === t;
					});
				s || ((s = { eventTarget: t, events: {} }), e.push(s)),
					s.events[n] || (s.events[n] = []),
					t.addEventListener &&
						!K.contains(s.events[n], r) &&
						(t.addEventListener(n, r, o.supportsOptions ? a : a.capture),
						s.events[n].push(r));
			}
			function s(t, n, r, i) {
				var a = kn(i),
					l = K.findIndex(e, function (e) {
						return e.eventTarget === t;
					}),
					u = e[l];
				if (u && u.events)
					if ("all" !== n) {
						var c = !1,
							f = u.events[n];
						if (f) {
							if ("all" === r) {
								for (var d = f.length - 1; d >= 0; d--) s(t, n, f[d], a);
								return;
							}
							for (var p = 0; p < f.length; p++)
								if (f[p] === r) {
									t.removeEventListener(
										n,
										r,
										o.supportsOptions ? a : a.capture
									),
										f.splice(p, 1),
										0 === f.length && (delete u.events[n], (c = !0));
									break;
								}
						}
						c && !Object.keys(u.events).length && e.splice(l, 1);
					} else
						for (n in u.events) u.events.hasOwnProperty(n) && s(t, n, "all");
			}
			function l(t, e) {
				for (
					var r = kn(e),
						o = new jn(t),
						a = n[t.type],
						s = Tn(W.getEventTargets(t), 1)[0],
						l = s;
					i.default.element(l);

				) {
					for (var u = 0; u < a.length; u++) {
						var c = a[u],
							f = c.selector,
							d = c.context;
						if (
							_.matchesSelector(l, f) &&
							_.nodeContains(d, s) &&
							_.nodeContains(d, l)
						) {
							var p = c.listeners;
							o.currentTarget = l;
							for (var v = 0; v < p.length; v++) {
								var h = Tn(p[v], 2),
									g = h[0],
									y = h[1],
									m = y.capture,
									b = y.passive;
								m === r.capture && b === r.passive && g(o);
							}
						}
					}
					l = _.parentNode(l);
				}
			}
			function u(t) {
				return l(t, !0);
			}
			return (
				t.document.createElement("div").addEventListener("test", null, {
					get capture() {
						return (o.supportsOptions = !0);
					},
					get passive() {
						return (o.supportsPassive = !0);
					},
				}),
				(t.events = o),
				o
			);
		},
	};
	On.default = In;
	var Dn = {};
	Object.defineProperty(Dn, "__esModule", { value: !0 }),
		(Dn.createInteractStatic = function (t) {
			var e = function e(n, r) {
				var o = t.interactables.get(n, r);
				return (
					o || ((o = t.interactables.new(n, r)).events.global = e.globalEvents),
					o
				);
			};
			return (
				(e.getPointerAverage = W.pointerAverage),
				(e.getTouchBBox = W.touchBBox),
				(e.getTouchDistance = W.touchDistance),
				(e.getTouchAngle = W.touchAngle),
				(e.getElementRect = _.getElementRect),
				(e.getElementClientRect = _.getElementClientRect),
				(e.matchesSelector = _.matchesSelector),
				(e.closest = _.closest),
				(e.globalEvents = {}),
				(e.version = void 0),
				(e.scope = t),
				(e.use = function (t, e) {
					return this.scope.usePlugin(t, e), this;
				}),
				(e.isSet = function (t, e) {
					return !!this.scope.interactables.get(t, e && e.context);
				}),
				(e.on = function (t, e, n) {
					if (
						(i.default.string(t) &&
							-1 !== t.search(" ") &&
							(t = t.trim().split(/ +/)),
						i.default.array(t))
					) {
						for (var r = 0; r < t.length; r++) {
							var o = t[r];
							this.on(o, e, n);
						}
						return this;
					}
					if (i.default.object(t)) {
						for (var a in t) this.on(a, t[a], e);
						return this;
					}
					return (
						(0, yn.default)(t, this.scope.actions)
							? this.globalEvents[t]
								? this.globalEvents[t].push(e)
								: (this.globalEvents[t] = [e])
							: this.scope.events.add(this.scope.document, t, e, {
									options: n,
							  }),
						this
					);
				}),
				(e.off = function (t, e, n) {
					if (
						(i.default.string(t) &&
							-1 !== t.search(" ") &&
							(t = t.trim().split(/ +/)),
						i.default.array(t))
					) {
						for (var r = 0; r < t.length; r++) {
							var o = t[r];
							this.off(o, e, n);
						}
						return this;
					}
					if (i.default.object(t)) {
						for (var a in t) this.off(a, t[a], e);
						return this;
					}
					var s;
					(0, yn.default)(t, this.scope.actions)
						? t in this.globalEvents &&
						  -1 !== (s = this.globalEvents[t].indexOf(e)) &&
						  this.globalEvents[t].splice(s, 1)
						: this.scope.events.remove(this.scope.document, t, e, n);
					return this;
				}),
				(e.debug = function () {
					return this.scope;
				}),
				(e.supportsTouch = function () {
					return b.default.supportsTouch;
				}),
				(e.supportsPointerEvent = function () {
					return b.default.supportsPointerEvent;
				}),
				(e.stop = function () {
					for (var t = 0; t < this.scope.interactions.list.length; t++) {
						this.scope.interactions.list[t].stop();
					}
					return this;
				}),
				(e.pointerMoveTolerance = function (t) {
					return i.default.number(t)
						? ((this.scope.interactions.pointerMoveTolerance = t), this)
						: this.scope.interactions.pointerMoveTolerance;
				}),
				(e.addDocument = function (t, e) {
					this.scope.addDocument(t, e);
				}),
				(e.removeDocument = function (t) {
					this.scope.removeDocument(t);
				}),
				e
			);
		});
	var An = {};
	Object.defineProperty(An, "__esModule", { value: !0 }), (An.default = void 0);
	var zn = {
		methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
		search: function (t) {
			for (var e = 0; e < zn.methodOrder.length; e++) {
				var n;
				n = zn.methodOrder[e];
				var r = zn[n](t);
				if (r) return r;
			}
			return null;
		},
		simulationResume: function (t) {
			var e = t.pointerType,
				n = t.eventType,
				r = t.eventTarget,
				o = t.scope;
			if (!/down|start/i.test(n)) return null;
			for (var i = 0; i < o.interactions.list.length; i++) {
				var a = o.interactions.list[i],
					s = r;
				if (a.simulation && a.simulation.allowResume && a.pointerType === e)
					for (; s; ) {
						if (s === a.element) return a;
						s = _.parentNode(s);
					}
			}
			return null;
		},
		mouseOrPen: function (t) {
			var e,
				n = t.pointerId,
				r = t.pointerType,
				o = t.eventType,
				i = t.scope;
			if ("mouse" !== r && "pen" !== r) return null;
			for (var a = 0; a < i.interactions.list.length; a++) {
				var s = i.interactions.list[a];
				if (s.pointerType === r) {
					if (s.simulation && !Cn(s, n)) continue;
					if (s.interacting()) return s;
					e || (e = s);
				}
			}
			if (e) return e;
			for (var l = 0; l < i.interactions.list.length; l++) {
				var u = i.interactions.list[l];
				if (!(u.pointerType !== r || (/down/i.test(o) && u.simulation)))
					return u;
			}
			return null;
		},
		hasPointer: function (t) {
			for (
				var e = t.pointerId, n = t.scope, r = 0;
				r < n.interactions.list.length;
				r++
			) {
				var o = n.interactions.list[r];
				if (Cn(o, e)) return o;
			}
			return null;
		},
		idle: function (t) {
			for (
				var e = t.pointerType, n = t.scope, r = 0;
				r < n.interactions.list.length;
				r++
			) {
				var o = n.interactions.list[r];
				if (1 === o.pointers.length) {
					var i = o.interactable;
					if (i && (!i.options.gesture || !i.options.gesture.enabled)) continue;
				} else if (o.pointers.length >= 2) continue;
				if (!o.interacting() && e === o.pointerType) return o;
			}
			return null;
		},
	};
	function Cn(t, e) {
		return t.pointers.some(function (t) {
			return t.id === e;
		});
	}
	var Rn = zn;
	An.default = Rn;
	var Fn = {};
	function Xn(t) {
		return (Xn =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	function Yn(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
					return;
				var n = [],
					r = !0,
					o = !1,
					i = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) &&
						(n.push(a.value), !e || n.length !== e);
						r = !0
					);
				} catch (t) {
					(o = !0), (i = t);
				} finally {
					try {
						r || null == s.return || s.return();
					} finally {
						if (o) throw i;
					}
				}
				return n;
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return Wn(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return Wn(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function Wn(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	function Ln(t, e) {
		if (!(t instanceof e))
			throw new TypeError("Cannot call a class as a function");
	}
	function Bn(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function Un(t, e) {
		return (Un =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, e);
	}
	function Nn(t) {
		var e = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = qn(t);
			if (e) {
				var o = qn(this).constructor;
				n = Reflect.construct(r, arguments, o);
			} else n = r.apply(this, arguments);
			return Vn(this, n);
		};
	}
	function Vn(t, e) {
		return !e || ("object" !== Xn(e) && "function" != typeof e)
			? (function (t) {
					if (void 0 === t)
						throw new ReferenceError(
							"this hasn't been initialised - super() hasn't been called"
						);
					return t;
			  })(t)
			: e;
	}
	function qn(t) {
		return (qn = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	Object.defineProperty(Fn, "__esModule", { value: !0 }), (Fn.default = void 0);
	var $n = [
		"pointerDown",
		"pointerMove",
		"pointerUp",
		"updatePointer",
		"removePointer",
		"windowBlur",
	];
	function Gn(t, e) {
		return function (n) {
			var r = e.interactions.list,
				o = W.getPointerType(n),
				i = Yn(W.getEventTargets(n), 2),
				a = i[0],
				s = i[1],
				l = [];
			if (/^touch/.test(n.type)) {
				e.prevTouchTime = e.now();
				for (var u = 0; u < n.changedTouches.length; u++) {
					var c = n.changedTouches[u],
						f = {
							pointer: c,
							pointerId: W.getPointerId(c),
							pointerType: o,
							eventType: n.type,
							eventTarget: a,
							curEventTarget: s,
							scope: e,
						},
						d = Hn(f);
					l.push([f.pointer, f.eventTarget, f.curEventTarget, d]);
				}
			} else {
				var p = !1;
				if (!b.default.supportsPointerEvent && /mouse/.test(n.type)) {
					for (var v = 0; v < r.length && !p; v++)
						p = "mouse" !== r[v].pointerType && r[v].pointerIsDown;
					p = p || e.now() - e.prevTouchTime < 500 || 0 === n.timeStamp;
				}
				if (!p) {
					var h = {
							pointer: n,
							pointerId: W.getPointerId(n),
							pointerType: o,
							eventType: n.type,
							curEventTarget: s,
							eventTarget: a,
							scope: e,
						},
						g = Hn(h);
					l.push([h.pointer, h.eventTarget, h.curEventTarget, g]);
				}
			}
			for (var y = 0; y < l.length; y++) {
				var m = Yn(l[y], 4),
					x = m[0],
					w = m[1],
					_ = m[2];
				m[3][t](x, n, w, _);
			}
		};
	}
	function Hn(t) {
		var e = t.pointerType,
			n = t.scope,
			r = { interaction: An.default.search(t), searchDetails: t };
		return (
			n.fire("interactions:find", r),
			r.interaction || n.interactions.new({ pointerType: e })
		);
	}
	function Kn(t, e) {
		var n = t.doc,
			r = t.scope,
			o = t.options,
			i = r.interactions.docEvents,
			a = r.events,
			s = a[e];
		for (var l in (r.browser.isIOS && !o.events && (o.events = { passive: !1 }),
		a.delegatedEvents))
			s(n, l, a.delegateListener), s(n, l, a.delegateUseCapture, !0);
		for (var u = o && o.events, c = 0; c < i.length; c++) {
			var f = i[c];
			s(n, f.type, f.listener, u);
		}
	}
	var Zn = {
		id: "core/interactions",
		install: function (t) {
			for (var e = {}, n = 0; n < $n.length; n++) {
				var r = $n[n];
				e[r] = Gn(r, t);
			}
			var o,
				i = b.default.pEventTypes;
			function a() {
				for (var e = 0; e < t.interactions.list.length; e++) {
					var n = t.interactions.list[e];
					if (n.pointerIsDown && "touch" === n.pointerType && !n._interacting)
						for (
							var r = function () {
									var e = n.pointers[o];
									t.documents.some(function (t) {
										var n = t.doc;
										return (0, _.nodeContains)(n, e.downTarget);
									}) || n.removePointer(e.pointer, e.event);
								},
								o = 0;
							o < n.pointers.length;
							o++
						) {
							r();
						}
				}
			}
			(o = h.default.PointerEvent
				? [
						{ type: i.down, listener: a },
						{ type: i.down, listener: e.pointerDown },
						{ type: i.move, listener: e.pointerMove },
						{ type: i.up, listener: e.pointerUp },
						{ type: i.cancel, listener: e.pointerUp },
				  ]
				: [
						{ type: "mousedown", listener: e.pointerDown },
						{ type: "mousemove", listener: e.pointerMove },
						{ type: "mouseup", listener: e.pointerUp },
						{ type: "touchstart", listener: a },
						{ type: "touchstart", listener: e.pointerDown },
						{ type: "touchmove", listener: e.pointerMove },
						{ type: "touchend", listener: e.pointerUp },
						{ type: "touchcancel", listener: e.pointerUp },
				  ]).push({
				type: "blur",
				listener: function (e) {
					for (var n = 0; n < t.interactions.list.length; n++) {
						t.interactions.list[n].documentBlur(e);
					}
				},
			}),
				(t.prevTouchTime = 0),
				(t.Interaction = (function (e) {
					!(function (t, e) {
						if ("function" != typeof e && null !== e)
							throw new TypeError(
								"Super expression must either be null or a function"
							);
						(t.prototype = Object.create(e && e.prototype, {
							constructor: { value: t, writable: !0, configurable: !0 },
						})),
							e && Un(t, e);
					})(a, e);
					var n,
						r,
						o,
						i = Nn(a);
					function a() {
						return Ln(this, a), i.apply(this, arguments);
					}
					return (
						(n = a),
						(r = [
							{
								key: "_now",
								value: function () {
									return t.now();
								},
							},
							{
								key: "pointerMoveTolerance",
								get: function () {
									return t.interactions.pointerMoveTolerance;
								},
								set: function (e) {
									t.interactions.pointerMoveTolerance = e;
								},
							},
						]) && Bn(n.prototype, r),
						o && Bn(n, o),
						a
					);
				})(qe.default)),
				(t.interactions = {
					list: [],
					new: function (e) {
						e.scopeFire = function (e, n) {
							return t.fire(e, n);
						};
						var n = new t.Interaction(e);
						return t.interactions.list.push(n), n;
					},
					listeners: e,
					docEvents: o,
					pointerMoveTolerance: 1,
				}),
				t.usePlugin(se.default);
		},
		listeners: {
			"scope:add-document": function (t) {
				return Kn(t, "add");
			},
			"scope:remove-document": function (t) {
				return Kn(t, "remove");
			},
			"interactable:unset": function (t, e) {
				for (
					var n = t.interactable, r = e.interactions.list.length - 1;
					r >= 0;
					r--
				) {
					var o = e.interactions.list[r];
					o.interactable === n &&
						(o.stop(),
						e.fire("interactions:destroy", { interaction: o }),
						o.destroy(),
						e.interactions.list.length > 2 && e.interactions.list.splice(r, 1));
				}
			},
		},
		onDocSignal: Kn,
		doOnInteractions: Gn,
		methodNames: $n,
	};
	Fn.default = Zn;
	var Jn = {};
	function Qn(t) {
		return (Qn =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	function tr(t, e, n) {
		return (tr =
			"undefined" != typeof Reflect && Reflect.get
				? Reflect.get
				: function (t, e, n) {
						var r = (function (t, e) {
							for (
								;
								!Object.prototype.hasOwnProperty.call(t, e) &&
								null !== (t = or(t));

							);
							return t;
						})(t, e);
						if (r) {
							var o = Object.getOwnPropertyDescriptor(r, e);
							return o.get ? o.get.call(n) : o.value;
						}
				  })(t, e, n || t);
	}
	function er(t, e) {
		return (er =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, e);
	}
	function nr(t) {
		var e = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = or(t);
			if (e) {
				var o = or(this).constructor;
				n = Reflect.construct(r, arguments, o);
			} else n = r.apply(this, arguments);
			return rr(this, n);
		};
	}
	function rr(t, e) {
		return !e || ("object" !== Qn(e) && "function" != typeof e)
			? (function (t) {
					if (void 0 === t)
						throw new ReferenceError(
							"this hasn't been initialised - super() hasn't been called"
						);
					return t;
			  })(t)
			: e;
	}
	function or(t) {
		return (or = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	function ir(t, e) {
		if (!(t instanceof e))
			throw new TypeError("Cannot call a class as a function");
	}
	function ar(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function sr(t, e, n) {
		return e && ar(t.prototype, e), n && ar(t, n), t;
	}
	Object.defineProperty(Jn, "__esModule", { value: !0 }),
		(Jn.initScope = ur),
		(Jn.Scope = void 0);
	var lr = (function () {
		function t() {
			var e = this;
			ir(this, t),
				(this.id = "__interact_scope_".concat(Math.floor(100 * Math.random()))),
				(this.isInitialized = !1),
				(this.listenerMaps = []),
				(this.browser = b.default),
				(this.defaults = (0, _e.default)(Ae.defaults)),
				(this.Eventable = pn.Eventable),
				(this.actions = {
					map: {},
					phases: { start: !0, move: !0, end: !0 },
					methodDict: {},
					phaselessTypes: {},
				}),
				(this.interactStatic = (0, Dn.createInteractStatic)(this)),
				(this.InteractEvent = ze.InteractEvent),
				(this.Interactable = void 0),
				(this.interactables = new _n.InteractableSet(this)),
				(this._win = void 0),
				(this.document = void 0),
				(this.window = void 0),
				(this.documents = []),
				(this._plugins = { list: [], map: {} }),
				(this.onWindowUnload = function (t) {
					return e.removeDocument(t.target);
				});
			var n = this;
			this.Interactable = (function (t) {
				!(function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError(
							"Super expression must either be null or a function"
						);
					(t.prototype = Object.create(e && e.prototype, {
						constructor: { value: t, writable: !0, configurable: !0 },
					})),
						e && er(t, e);
				})(r, t);
				var e = nr(r);
				function r() {
					return ir(this, r), e.apply(this, arguments);
				}
				return (
					sr(r, [
						{
							key: "set",
							value: function (t) {
								return (
									tr(or(r.prototype), "set", this).call(this, t),
									n.fire("interactable:set", {
										options: t,
										interactable: this,
									}),
									this
								);
							},
						},
						{
							key: "unset",
							value: function () {
								tr(or(r.prototype), "unset", this).call(this),
									n.interactables.list.splice(
										n.interactables.list.indexOf(this),
										1
									),
									n.fire("interactable:unset", { interactable: this });
							},
						},
						{
							key: "_defaults",
							get: function () {
								return n.defaults;
							},
						},
					]),
					r
				);
			})(mn.Interactable);
		}
		return (
			sr(t, [
				{
					key: "addListeners",
					value: function (t, e) {
						this.listenerMaps.push({ id: e, map: t });
					},
				},
				{
					key: "fire",
					value: function (t, e) {
						for (var n = 0; n < this.listenerMaps.length; n++) {
							var r = this.listenerMaps[n].map[t];
							if (r && !1 === r(e, this, t)) return !1;
						}
					},
				},
				{
					key: "init",
					value: function (t) {
						return this.isInitialized ? this : ur(this, t);
					},
				},
				{
					key: "pluginIsInstalled",
					value: function (t) {
						return (
							this._plugins.map[t.id] || -1 !== this._plugins.list.indexOf(t)
						);
					},
				},
				{
					key: "usePlugin",
					value: function (t, e) {
						if (!this.isInitialized) return this;
						if (this.pluginIsInstalled(t)) return this;
						if (
							(t.id && (this._plugins.map[t.id] = t),
							this._plugins.list.push(t),
							t.install && t.install(this, e),
							t.listeners && t.before)
						) {
							for (
								var n = 0,
									r = this.listenerMaps.length,
									o = t.before.reduce(function (t, e) {
										return (t[e] = !0), (t[cr(e)] = !0), t;
									}, {});
								n < r;
								n++
							) {
								var i = this.listenerMaps[n].id;
								if (o[i] || o[cr(i)]) break;
							}
							this.listenerMaps.splice(n, 0, { id: t.id, map: t.listeners });
						} else
							t.listeners &&
								this.listenerMaps.push({ id: t.id, map: t.listeners });
						return this;
					},
				},
				{
					key: "addDocument",
					value: function (t, n) {
						if (-1 !== this.getDocIndex(t)) return !1;
						var r = e.getWindow(t);
						(n = n ? (0, j.default)({}, n) : {}),
							this.documents.push({ doc: t, options: n }),
							this.events.documents.push(t),
							t !== this.document &&
								this.events.add(r, "unload", this.onWindowUnload),
							this.fire("scope:add-document", {
								doc: t,
								window: r,
								scope: this,
								options: n,
							});
					},
				},
				{
					key: "removeDocument",
					value: function (t) {
						var n = this.getDocIndex(t),
							r = e.getWindow(t),
							o = this.documents[n].options;
						this.events.remove(r, "unload", this.onWindowUnload),
							this.documents.splice(n, 1),
							this.events.documents.splice(n, 1),
							this.fire("scope:remove-document", {
								doc: t,
								window: r,
								scope: this,
								options: o,
							});
					},
				},
				{
					key: "getDocIndex",
					value: function (t) {
						for (var e = 0; e < this.documents.length; e++)
							if (this.documents[e].doc === t) return e;
						return -1;
					},
				},
				{
					key: "getDocOptions",
					value: function (t) {
						var e = this.getDocIndex(t);
						return -1 === e ? null : this.documents[e].options;
					},
				},
				{
					key: "now",
					value: function () {
						return (this.window.Date || Date).now();
					},
				},
			]),
			t
		);
	})();
	function ur(t, n) {
		return (
			(t.isInitialized = !0),
			e.init(n),
			h.default.init(n),
			b.default.init(n),
			Mt.default.init(n),
			(t.window = n),
			(t.document = n.document),
			t.usePlugin(Fn.default),
			t.usePlugin(On.default),
			t
		);
	}
	function cr(t) {
		return t && t.replace(/\/.*$/, "");
	}
	Jn.Scope = lr;
	var fr = {};
	function dr(t) {
		return (dr =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	Object.defineProperty(fr, "__esModule", { value: !0 }),
		(fr.init = fr.default = void 0);
	var pr = new Jn.Scope(),
		vr = pr.interactStatic;
	fr.default = vr;
	var hr = function (t) {
		return pr.init(t);
	};
	(fr.init = hr),
		"object" === ("undefined" == typeof window ? "undefined" : dr(window)) &&
			window &&
			hr(window);
	var gr = {};
	Object.defineProperty(gr, "__esModule", { value: !0 }), (gr.default = void 0);
	gr.default = function () {};
	var yr = {};
	Object.defineProperty(yr, "__esModule", { value: !0 }), (yr.default = void 0);
	yr.default = function () {};
	var mr = {};
	function br(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
					return;
				var n = [],
					r = !0,
					o = !1,
					i = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) &&
						(n.push(a.value), !e || n.length !== e);
						r = !0
					);
				} catch (t) {
					(o = !0), (i = t);
				} finally {
					try {
						r || null == s.return || s.return();
					} finally {
						if (o) throw i;
					}
				}
				return n;
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return xr(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return xr(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function xr(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	Object.defineProperty(mr, "__esModule", { value: !0 }), (mr.default = void 0);
	mr.default = function (t) {
		var e = [
				["x", "y"],
				["left", "top"],
				["right", "bottom"],
				["width", "height"],
			].filter(function (e) {
				var n = br(e, 2),
					r = n[0],
					o = n[1];
				return r in t || o in t;
			}),
			n = function (n, r) {
				for (
					var o = t.range,
						i = t.limits,
						a =
							void 0 === i
								? { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 }
								: i,
						s = t.offset,
						l = void 0 === s ? { x: 0, y: 0 } : s,
						u = { range: o, grid: t, x: null, y: null },
						c = 0;
					c < e.length;
					c++
				) {
					var f = br(e[c], 2),
						d = f[0],
						p = f[1],
						v = Math.round((n - l.x) / t[d]),
						h = Math.round((r - l.y) / t[p]);
					(u[d] = Math.max(a.left, Math.min(a.right, v * t[d] + l.x))),
						(u[p] = Math.max(a.top, Math.min(a.bottom, h * t[p] + l.y)));
				}
				return u;
			};
		return (n.grid = t), (n.coordFields = e), n;
	};
	var wr = {};
	Object.defineProperty(wr, "__esModule", { value: !0 }),
		Object.defineProperty(wr, "edgeTarget", {
			enumerable: !0,
			get: function () {
				return gr.default;
			},
		}),
		Object.defineProperty(wr, "elements", {
			enumerable: !0,
			get: function () {
				return yr.default;
			},
		}),
		Object.defineProperty(wr, "grid", {
			enumerable: !0,
			get: function () {
				return mr.default;
			},
		});
	var _r = {};
	Object.defineProperty(_r, "__esModule", { value: !0 }), (_r.default = void 0);
	var Sr = {
		id: "snappers",
		install: function (t) {
			var e = t.interactStatic;
			(e.snappers = (0, j.default)(e.snappers || {}, wr)),
				(e.createSnapGrid = e.snappers.grid);
		},
	};
	_r.default = Sr;
	var Pr = {};
	function Or(t, e) {
		var n = Object.keys(t);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(t);
			e &&
				(r = r.filter(function (e) {
					return Object.getOwnPropertyDescriptor(t, e).enumerable;
				})),
				n.push.apply(n, r);
		}
		return n;
	}
	function Er(t) {
		for (var e = 1; e < arguments.length; e++) {
			var n = null != arguments[e] ? arguments[e] : {};
			e % 2
				? Or(Object(n), !0).forEach(function (e) {
						Tr(t, e, n[e]);
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
				: Or(Object(n)).forEach(function (e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
				  });
		}
		return t;
	}
	function Tr(t, e, n) {
		return (
			e in t
				? Object.defineProperty(t, e, {
						value: n,
						enumerable: !0,
						configurable: !0,
						writable: !0,
				  })
				: (t[e] = n),
			t
		);
	}
	Object.defineProperty(Pr, "__esModule", { value: !0 }),
		(Pr.aspectRatio = Pr.default = void 0);
	var Mr = {
		start: function (t) {
			var e = t.state,
				n = t.rect,
				r = t.edges,
				o = t.pageCoords,
				i = e.options.ratio,
				a = e.options,
				s = a.equalDelta,
				l = a.modifiers;
			"preserve" === i && (i = n.width / n.height),
				(e.startCoords = (0, j.default)({}, o)),
				(e.startRect = (0, j.default)({}, n)),
				(e.ratio = i),
				(e.equalDelta = s);
			var u = (e.linkedEdges = {
				top: r.top || (r.left && !r.bottom),
				left: r.left || (r.top && !r.right),
				bottom: r.bottom || (r.right && !r.top),
				right: r.right || (r.bottom && !r.left),
			});
			if (((e.xIsPrimaryAxis = !(!r.left && !r.right)), e.equalDelta))
				e.edgeSign = (u.left ? 1 : -1) * (u.top ? 1 : -1);
			else {
				var c = e.xIsPrimaryAxis ? u.top : u.left;
				e.edgeSign = c ? -1 : 1;
			}
			if (((0, j.default)(t.edges, u), l && l.length)) {
				var f = new Se.default(t.interaction);
				f.copyFrom(t.interaction.modification),
					f.prepareStates(l),
					(e.subModification = f),
					f.startAll(Er({}, t));
			}
		},
		set: function (t) {
			var e = t.state,
				n = t.rect,
				r = t.coords,
				o = (0, j.default)({}, r),
				i = e.equalDelta ? jr : kr;
			if ((i(e, e.xIsPrimaryAxis, r, n), !e.subModification)) return null;
			var a = (0, j.default)({}, n);
			(0, k.addEdges)(e.linkedEdges, a, { x: r.x - o.x, y: r.y - o.y });
			var s = e.subModification.setAll(
					Er(
						Er({}, t),
						{},
						{
							rect: a,
							edges: e.linkedEdges,
							pageCoords: r,
							prevCoords: r,
							prevRect: a,
						}
					)
				),
				l = s.delta;
			s.changed &&
				(i(e, Math.abs(l.x) > Math.abs(l.y), s.coords, s.rect),
				(0, j.default)(r, s.coords));
			return s.eventProps;
		},
		defaults: { ratio: "preserve", equalDelta: !1, modifiers: [], enabled: !1 },
	};
	function jr(t, e, n) {
		var r = t.startCoords,
			o = t.edgeSign;
		e ? (n.y = r.y + (n.x - r.x) * o) : (n.x = r.x + (n.y - r.y) * o);
	}
	function kr(t, e, n, r) {
		var o = t.startRect,
			i = t.startCoords,
			a = t.ratio,
			s = t.edgeSign;
		if (e) {
			var l = r.width / a;
			n.y = i.y + (l - o.height) * s;
		} else {
			var u = r.height * a;
			n.x = i.x + (u - o.width) * s;
		}
	}
	Pr.aspectRatio = Mr;
	var Ir = (0, ke.makeModifier)(Mr, "aspectRatio");
	Pr.default = Ir;
	var Dr = {};
	Object.defineProperty(Dr, "__esModule", { value: !0 }), (Dr.default = void 0);
	var Ar = function () {};
	Ar._defaults = {};
	var zr = Ar;
	Dr.default = zr;
	var Cr = {};
	Object.defineProperty(Cr, "__esModule", { value: !0 }),
		Object.defineProperty(Cr, "default", {
			enumerable: !0,
			get: function () {
				return Dr.default;
			},
		});
	var Rr = {};
	function Fr(t, e, n) {
		return i.default.func(t)
			? k.resolveRectLike(t, e.interactable, e.element, [n.x, n.y, e])
			: k.resolveRectLike(t, e.interactable, e.element);
	}
	Object.defineProperty(Rr, "__esModule", { value: !0 }),
		(Rr.getRestrictionRect = Fr),
		(Rr.restrict = Rr.default = void 0);
	var Xr = {
		start: function (t) {
			var e = t.rect,
				n = t.startOffset,
				r = t.state,
				o = t.interaction,
				i = t.pageCoords,
				a = r.options,
				s = a.elementRect,
				l = (0, j.default)(
					{ left: 0, top: 0, right: 0, bottom: 0 },
					a.offset || {}
				);
			if (e && s) {
				var u = Fr(a.restriction, o, i);
				if (u) {
					var c = u.right - u.left - e.width,
						f = u.bottom - u.top - e.height;
					c < 0 && ((l.left += c), (l.right += c)),
						f < 0 && ((l.top += f), (l.bottom += f));
				}
				(l.left += n.left - e.width * s.left),
					(l.top += n.top - e.height * s.top),
					(l.right += n.right - e.width * (1 - s.right)),
					(l.bottom += n.bottom - e.height * (1 - s.bottom));
			}
			r.offset = l;
		},
		set: function (t) {
			var e = t.coords,
				n = t.interaction,
				r = t.state,
				o = r.options,
				i = r.offset,
				a = Fr(o.restriction, n, e);
			if (a) {
				var s = k.xywhToTlbr(a);
				(e.x = Math.max(Math.min(s.right - i.right, e.x), s.left + i.left)),
					(e.y = Math.max(Math.min(s.bottom - i.bottom, e.y), s.top + i.top));
			}
		},
		defaults: {
			restriction: null,
			elementRect: null,
			offset: null,
			endOnly: !1,
			enabled: !1,
		},
	};
	Rr.restrict = Xr;
	var Yr = (0, ke.makeModifier)(Xr, "restrict");
	Rr.default = Yr;
	var Wr = {};
	Object.defineProperty(Wr, "__esModule", { value: !0 }),
		(Wr.restrictEdges = Wr.default = void 0);
	var Lr = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 },
		Br = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 };
	function Ur(t, e) {
		for (var n = ["top", "left", "bottom", "right"], r = 0; r < n.length; r++) {
			var o = n[r];
			o in t || (t[o] = e[o]);
		}
		return t;
	}
	var Nr = {
		noInner: Lr,
		noOuter: Br,
		start: function (t) {
			var e,
				n = t.interaction,
				r = t.startOffset,
				o = t.state,
				i = o.options;
			if (i) {
				var a = (0, Rr.getRestrictionRect)(i.offset, n, n.coords.start.page);
				e = k.rectToXY(a);
			}
			(e = e || { x: 0, y: 0 }),
				(o.offset = {
					top: e.y + r.top,
					left: e.x + r.left,
					bottom: e.y - r.bottom,
					right: e.x - r.right,
				});
		},
		set: function (t) {
			var e = t.coords,
				n = t.edges,
				r = t.interaction,
				o = t.state,
				i = o.offset,
				a = o.options;
			if (n) {
				var s = (0, j.default)({}, e),
					l = (0, Rr.getRestrictionRect)(a.inner, r, s) || {},
					u = (0, Rr.getRestrictionRect)(a.outer, r, s) || {};
				Ur(l, Lr),
					Ur(u, Br),
					n.top
						? (e.y = Math.min(Math.max(u.top + i.top, s.y), l.top + i.top))
						: n.bottom &&
						  (e.y = Math.max(
								Math.min(u.bottom + i.bottom, s.y),
								l.bottom + i.bottom
						  )),
					n.left
						? (e.x = Math.min(Math.max(u.left + i.left, s.x), l.left + i.left))
						: n.right &&
						  (e.x = Math.max(
								Math.min(u.right + i.right, s.x),
								l.right + i.right
						  ));
			}
		},
		defaults: {
			inner: null,
			outer: null,
			offset: null,
			endOnly: !1,
			enabled: !1,
		},
	};
	Wr.restrictEdges = Nr;
	var Vr = (0, ke.makeModifier)(Nr, "restrictEdges");
	Wr.default = Vr;
	var qr = {};
	Object.defineProperty(qr, "__esModule", { value: !0 }),
		(qr.restrictRect = qr.default = void 0);
	var $r = (0, j.default)(
			{
				get elementRect() {
					return { top: 0, left: 0, bottom: 1, right: 1 };
				},
				set elementRect(t) {},
			},
			Rr.restrict.defaults
		),
		Gr = { start: Rr.restrict.start, set: Rr.restrict.set, defaults: $r };
	qr.restrictRect = Gr;
	var Hr = (0, ke.makeModifier)(Gr, "restrictRect");
	qr.default = Hr;
	var Kr = {};
	Object.defineProperty(Kr, "__esModule", { value: !0 }),
		(Kr.restrictSize = Kr.default = void 0);
	var Zr = { width: -1 / 0, height: -1 / 0 },
		Jr = { width: 1 / 0, height: 1 / 0 };
	var Qr = {
		start: function (t) {
			return Wr.restrictEdges.start(t);
		},
		set: function (t) {
			var e = t.interaction,
				n = t.state,
				r = t.rect,
				o = t.edges,
				i = n.options;
			if (o) {
				var a =
						k.tlbrToXywh((0, Rr.getRestrictionRect)(i.min, e, t.coords)) || Zr,
					s =
						k.tlbrToXywh((0, Rr.getRestrictionRect)(i.max, e, t.coords)) || Jr;
				(n.options = {
					endOnly: i.endOnly,
					inner: (0, j.default)({}, Wr.restrictEdges.noInner),
					outer: (0, j.default)({}, Wr.restrictEdges.noOuter),
				}),
					o.top
						? ((n.options.inner.top = r.bottom - a.height),
						  (n.options.outer.top = r.bottom - s.height))
						: o.bottom &&
						  ((n.options.inner.bottom = r.top + a.height),
						  (n.options.outer.bottom = r.top + s.height)),
					o.left
						? ((n.options.inner.left = r.right - a.width),
						  (n.options.outer.left = r.right - s.width))
						: o.right &&
						  ((n.options.inner.right = r.left + a.width),
						  (n.options.outer.right = r.left + s.width)),
					Wr.restrictEdges.set(t),
					(n.options = i);
			}
		},
		defaults: { min: null, max: null, endOnly: !1, enabled: !1 },
	};
	Kr.restrictSize = Qr;
	var to = (0, ke.makeModifier)(Qr, "restrictSize");
	Kr.default = to;
	var eo = {};
	Object.defineProperty(eo, "__esModule", { value: !0 }),
		Object.defineProperty(eo, "default", {
			enumerable: !0,
			get: function () {
				return Dr.default;
			},
		});
	var no = {};
	Object.defineProperty(no, "__esModule", { value: !0 }),
		(no.snap = no.default = void 0);
	var ro = {
		start: function (t) {
			var e,
				n = t.interaction,
				r = t.interactable,
				o = t.element,
				i = t.rect,
				a = t.state,
				s = t.startOffset,
				l = a.options,
				u = l.offsetWithOrigin
					? (function (t) {
							var e = t.interaction.element;
							return (
								(0, k.rectToXY)(
									(0, k.resolveRectLike)(t.state.options.origin, null, null, [
										e,
									])
								) ||
								(0, A.default)(t.interactable, e, t.interaction.prepared.name)
							);
					  })(t)
					: { x: 0, y: 0 };
			if ("startCoords" === l.offset)
				e = { x: n.coords.start.page.x, y: n.coords.start.page.y };
			else {
				var c = (0, k.resolveRectLike)(l.offset, r, o, [n]);
				((e = (0, k.rectToXY)(c) || { x: 0, y: 0 }).x += u.x), (e.y += u.y);
			}
			var f = l.relativePoints;
			a.offsets =
				i && f && f.length
					? f.map(function (t, n) {
							return {
								index: n,
								relativePoint: t,
								x: s.left - i.width * t.x + e.x,
								y: s.top - i.height * t.y + e.y,
							};
					  })
					: [(0, j.default)({ index: 0, relativePoint: null }, e)];
		},
		set: function (t) {
			var e = t.interaction,
				n = t.coords,
				r = t.state,
				o = r.options,
				a = r.offsets,
				s = (0, A.default)(e.interactable, e.element, e.prepared.name),
				l = (0, j.default)({}, n),
				u = [];
			o.offsetWithOrigin || ((l.x -= s.x), (l.y -= s.y));
			for (var c = 0; c < a.length; c++)
				for (
					var f = a[c],
						d = l.x - f.x,
						p = l.y - f.y,
						v = 0,
						h = o.targets.length;
					v < h;
					v++
				) {
					var g = o.targets[v],
						y = void 0;
					(y = i.default.func(g) ? g(d, p, e._proxy, f, v) : g) &&
						u.push({
							x: (i.default.number(y.x) ? y.x : d) + f.x,
							y: (i.default.number(y.y) ? y.y : p) + f.y,
							range: i.default.number(y.range) ? y.range : o.range,
							source: g,
							index: v,
							offset: f,
						});
				}
			for (
				var m = {
						target: null,
						inRange: !1,
						distance: 0,
						range: 0,
						delta: { x: 0, y: 0 },
					},
					b = 0;
				b < u.length;
				b++
			) {
				var x = u[b],
					w = x.range,
					_ = x.x - l.x,
					S = x.y - l.y,
					P = (0, R.default)(_, S),
					O = P <= w;
				w === 1 / 0 && m.inRange && m.range !== 1 / 0 && (O = !1),
					(m.target &&
						!(O
							? m.inRange && w !== 1 / 0
								? P / w < m.distance / m.range
								: (w === 1 / 0 && m.range !== 1 / 0) || P < m.distance
							: !m.inRange && P < m.distance)) ||
						((m.target = x),
						(m.distance = P),
						(m.range = w),
						(m.inRange = O),
						(m.delta.x = _),
						(m.delta.y = S));
			}
			return (
				m.inRange && ((n.x = m.target.x), (n.y = m.target.y)),
				(r.closest = m),
				m
			);
		},
		defaults: {
			range: 1 / 0,
			targets: null,
			offset: null,
			offsetWithOrigin: !0,
			origin: null,
			relativePoints: null,
			endOnly: !1,
			enabled: !1,
		},
	};
	no.snap = ro;
	var oo = (0, ke.makeModifier)(ro, "snap");
	no.default = oo;
	var io = {};
	function ao(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
					return;
				var n = [],
					r = !0,
					o = !1,
					i = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) &&
						(n.push(a.value), !e || n.length !== e);
						r = !0
					);
				} catch (t) {
					(o = !0), (i = t);
				} finally {
					try {
						r || null == s.return || s.return();
					} finally {
						if (o) throw i;
					}
				}
				return n;
			})(t, e) ||
			(function (t, e) {
				if (!t) return;
				if ("string" == typeof t) return so(t, e);
				var n = Object.prototype.toString.call(t).slice(8, -1);
				"Object" === n && t.constructor && (n = t.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(t);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return so(t, e);
			})(t, e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function so(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
		return r;
	}
	Object.defineProperty(io, "__esModule", { value: !0 }),
		(io.snapSize = io.default = void 0);
	var lo = {
		start: function (t) {
			var e = t.state,
				n = t.edges,
				r = e.options;
			if (!n) return null;
			(t.state = {
				options: {
					targets: null,
					relativePoints: [{ x: n.left ? 0 : 1, y: n.top ? 0 : 1 }],
					offset: r.offset || "self",
					origin: { x: 0, y: 0 },
					range: r.range,
				},
			}),
				(e.targetFields = e.targetFields || [
					["width", "height"],
					["x", "y"],
				]),
				no.snap.start(t),
				(e.offsets = t.state.offsets),
				(t.state = e);
		},
		set: function (t) {
			var e = t.interaction,
				n = t.state,
				r = t.coords,
				o = n.options,
				a = n.offsets,
				s = { x: r.x - a[0].x, y: r.y - a[0].y };
			(n.options = (0, j.default)({}, o)), (n.options.targets = []);
			for (var l = 0; l < (o.targets || []).length; l++) {
				var u = (o.targets || [])[l],
					c = void 0;
				if ((c = i.default.func(u) ? u(s.x, s.y, e) : u)) {
					for (var f = 0; f < n.targetFields.length; f++) {
						var d = ao(n.targetFields[f], 2),
							p = d[0],
							v = d[1];
						if (p in c || v in c) {
							(c.x = c[p]), (c.y = c[v]);
							break;
						}
					}
					n.options.targets.push(c);
				}
			}
			var h = no.snap.set(t);
			return (n.options = o), h;
		},
		defaults: {
			range: 1 / 0,
			targets: null,
			offset: null,
			endOnly: !1,
			enabled: !1,
		},
	};
	io.snapSize = lo;
	var uo = (0, ke.makeModifier)(lo, "snapSize");
	io.default = uo;
	var co = {};
	Object.defineProperty(co, "__esModule", { value: !0 }),
		(co.snapEdges = co.default = void 0);
	var fo = {
		start: function (t) {
			var e = t.edges;
			return e
				? ((t.state.targetFields = t.state.targetFields || [
						[e.left ? "left" : "right", e.top ? "top" : "bottom"],
				  ]),
				  io.snapSize.start(t))
				: null;
		},
		set: io.snapSize.set,
		defaults: (0, j.default)((0, _e.default)(io.snapSize.defaults), {
			targets: null,
			range: null,
			offset: { x: 0, y: 0 },
		}),
	};
	co.snapEdges = fo;
	var po = (0, ke.makeModifier)(fo, "snapEdges");
	co.default = po;
	var vo = {};
	Object.defineProperty(vo, "__esModule", { value: !0 }),
		Object.defineProperty(vo, "default", {
			enumerable: !0,
			get: function () {
				return Dr.default;
			},
		});
	var ho = {};
	Object.defineProperty(ho, "__esModule", { value: !0 }),
		Object.defineProperty(ho, "default", {
			enumerable: !0,
			get: function () {
				return Dr.default;
			},
		});
	var go = {};
	Object.defineProperty(go, "__esModule", { value: !0 }), (go.default = void 0);
	var yo = {
		aspectRatio: Pr.default,
		restrictEdges: Wr.default,
		restrict: Rr.default,
		restrictRect: qr.default,
		restrictSize: Kr.default,
		snapEdges: co.default,
		snap: no.default,
		snapSize: io.default,
		spring: vo.default,
		avoid: Cr.default,
		transform: ho.default,
		rubberband: eo.default,
	};
	go.default = yo;
	var mo = {};
	Object.defineProperty(mo, "__esModule", { value: !0 }), (mo.default = void 0);
	var bo = {
		id: "modifiers",
		install: function (t) {
			var e = t.interactStatic;
			for (var n in (t.usePlugin(ke.default),
			t.usePlugin(_r.default),
			(e.modifiers = go.default),
			go.default)) {
				var r = go.default[n],
					o = r._defaults,
					i = r._methods;
				(o._methods = i), (t.defaults.perAction[n] = o);
			}
		},
	};
	mo.default = bo;
	var xo = {};
	Object.defineProperty(xo, "__esModule", { value: !0 }), (xo.default = void 0);
	xo.default = {};
	var wo = {};
	function _o(t) {
		return (_o =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	function So(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			(r.enumerable = r.enumerable || !1),
				(r.configurable = !0),
				"value" in r && (r.writable = !0),
				Object.defineProperty(t, r.key, r);
		}
	}
	function Po(t, e) {
		return (Po =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, e);
	}
	function Oo(t) {
		var e = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})();
		return function () {
			var n,
				r = Mo(t);
			if (e) {
				var o = Mo(this).constructor;
				n = Reflect.construct(r, arguments, o);
			} else n = r.apply(this, arguments);
			return Eo(this, n);
		};
	}
	function Eo(t, e) {
		return !e || ("object" !== _o(e) && "function" != typeof e) ? To(t) : e;
	}
	function To(t) {
		if (void 0 === t)
			throw new ReferenceError(
				"this hasn't been initialised - super() hasn't been called"
			);
		return t;
	}
	function Mo(t) {
		return (Mo = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	Object.defineProperty(wo, "__esModule", { value: !0 }),
		(wo.PointerEvent = wo.default = void 0);
	var jo = (function (t) {
		!(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError(
					"Super expression must either be null or a function"
				);
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, writable: !0, configurable: !0 },
			})),
				e && Po(t, e);
		})(i, t);
		var e,
			n,
			r,
			o = Oo(i);
		function i(t, e, n, r, a, s) {
			var l;
			if (
				((function (t, e) {
					if (!(t instanceof e))
						throw new TypeError("Cannot call a class as a function");
				})(this, i),
				((l = o.call(this, a)).type = void 0),
				(l.originalEvent = void 0),
				(l.pointerId = void 0),
				(l.pointerType = void 0),
				(l.double = void 0),
				(l.pageX = void 0),
				(l.pageY = void 0),
				(l.clientX = void 0),
				(l.clientY = void 0),
				(l.dt = void 0),
				(l.eventable = void 0),
				W.pointerExtend(To(l), n),
				n !== e && W.pointerExtend(To(l), e),
				(l.timeStamp = s),
				(l.originalEvent = n),
				(l.type = t),
				(l.pointerId = W.getPointerId(e)),
				(l.pointerType = W.getPointerType(e)),
				(l.target = r),
				(l.currentTarget = null),
				"tap" === t)
			) {
				var u = a.getPointerIndex(e);
				l.dt = l.timeStamp - a.pointers[u].downTime;
				var c = l.timeStamp - a.tapTime;
				l.double = !!(
					a.prevTap &&
					"doubletap" !== a.prevTap.type &&
					a.prevTap.target === l.target &&
					c < 500
				);
			} else "doubletap" === t && (l.dt = e.timeStamp - a.tapTime);
			return l;
		}
		return (
			(e = i),
			(n = [
				{
					key: "_subtractOrigin",
					value: function (t) {
						var e = t.x,
							n = t.y;
						return (
							(this.pageX -= e),
							(this.pageY -= n),
							(this.clientX -= e),
							(this.clientY -= n),
							this
						);
					},
				},
				{
					key: "_addOrigin",
					value: function (t) {
						var e = t.x,
							n = t.y;
						return (
							(this.pageX += e),
							(this.pageY += n),
							(this.clientX += e),
							(this.clientY += n),
							this
						);
					},
				},
				{
					key: "preventDefault",
					value: function () {
						this.originalEvent.preventDefault();
					},
				},
			]) && So(e.prototype, n),
			r && So(e, r),
			i
		);
	})($.BaseEvent);
	wo.PointerEvent = wo.default = jo;
	var ko = {};
	Object.defineProperty(ko, "__esModule", { value: !0 }), (ko.default = void 0);
	var Io = {
		id: "pointer-events/base",
		before: ["inertia", "modifiers", "auto-start", "actions"],
		install: function (t) {
			(t.pointerEvents = Io),
				(t.defaults.actions.pointerEvents = Io.defaults),
				(0, j.default)(t.actions.phaselessTypes, Io.types);
		},
		listeners: {
			"interactions:new": function (t) {
				var e = t.interaction;
				(e.prevTap = null), (e.tapTime = 0);
			},
			"interactions:update-pointer": function (t) {
				var e = t.down,
					n = t.pointerInfo;
				if (!e && n.hold) return;
				n.hold = { duration: 1 / 0, timeout: null };
			},
			"interactions:move": function (t, e) {
				var n = t.interaction,
					r = t.pointer,
					o = t.event,
					i = t.eventTarget;
				t.duplicate ||
					(n.pointerIsDown && !n.pointerWasMoved) ||
					(n.pointerIsDown && zo(t),
					Do(
						{
							interaction: n,
							pointer: r,
							event: o,
							eventTarget: i,
							type: "move",
						},
						e
					));
			},
			"interactions:down": function (t, e) {
				!(function (t, e) {
					for (
						var n = t.interaction,
							r = t.pointer,
							o = t.event,
							i = t.eventTarget,
							a = t.pointerIndex,
							s = n.pointers[a].hold,
							l = _.getPath(i),
							u = {
								interaction: n,
								pointer: r,
								event: o,
								eventTarget: i,
								type: "hold",
								targets: [],
								path: l,
								node: null,
							},
							c = 0;
						c < l.length;
						c++
					) {
						var f = l[c];
						(u.node = f), e.fire("pointerEvents:collect-targets", u);
					}
					if (!u.targets.length) return;
					for (var d = 1 / 0, p = 0; p < u.targets.length; p++) {
						var v = u.targets[p].eventable.options.holdDuration;
						v < d && (d = v);
					}
					(s.duration = d),
						(s.timeout = setTimeout(function () {
							Do(
								{
									interaction: n,
									eventTarget: i,
									pointer: r,
									event: o,
									type: "hold",
								},
								e
							);
						}, d));
				})(t, e),
					Do(t, e);
			},
			"interactions:up": function (t, e) {
				zo(t),
					Do(t, e),
					(function (t, e) {
						var n = t.interaction,
							r = t.pointer,
							o = t.event,
							i = t.eventTarget;
						n.pointerWasMoved ||
							Do(
								{
									interaction: n,
									eventTarget: i,
									pointer: r,
									event: o,
									type: "tap",
								},
								e
							);
					})(t, e);
			},
			"interactions:cancel": function (t, e) {
				zo(t), Do(t, e);
			},
		},
		PointerEvent: wo.PointerEvent,
		fire: Do,
		collectEventTargets: Ao,
		defaults: {
			holdDuration: 600,
			ignoreFrom: null,
			allowFrom: null,
			origin: { x: 0, y: 0 },
		},
		types: {
			down: !0,
			move: !0,
			up: !0,
			cancel: !0,
			tap: !0,
			doubletap: !0,
			hold: !0,
		},
	};
	function Do(t, e) {
		var n = t.interaction,
			r = t.pointer,
			o = t.event,
			i = t.eventTarget,
			a = t.type,
			s = t.targets,
			l = void 0 === s ? Ao(t, e) : s,
			u = new wo.PointerEvent(a, r, o, i, n, e.now());
		e.fire("pointerEvents:new", { pointerEvent: u });
		for (
			var c = {
					interaction: n,
					pointer: r,
					event: o,
					eventTarget: i,
					targets: l,
					type: a,
					pointerEvent: u,
				},
				f = 0;
			f < l.length;
			f++
		) {
			var d = l[f];
			for (var p in d.props || {}) u[p] = d.props[p];
			var v = (0, A.default)(d.eventable, d.node);
			if (
				(u._subtractOrigin(v),
				(u.eventable = d.eventable),
				(u.currentTarget = d.node),
				d.eventable.fire(u),
				u._addOrigin(v),
				u.immediatePropagationStopped ||
					(u.propagationStopped &&
						f + 1 < l.length &&
						l[f + 1].node !== u.currentTarget))
			)
				break;
		}
		if ((e.fire("pointerEvents:fired", c), "tap" === a)) {
			var h = u.double
				? Do(
						{
							interaction: n,
							pointer: r,
							event: o,
							eventTarget: i,
							type: "doubletap",
						},
						e
				  )
				: u;
			(n.prevTap = h), (n.tapTime = h.timeStamp);
		}
		return u;
	}
	function Ao(t, e) {
		var n = t.interaction,
			r = t.pointer,
			o = t.event,
			i = t.eventTarget,
			a = t.type,
			s = n.getPointerIndex(r),
			l = n.pointers[s];
		if ("tap" === a && (n.pointerWasMoved || !l || l.downTarget !== i))
			return [];
		for (
			var u = _.getPath(i),
				c = {
					interaction: n,
					pointer: r,
					event: o,
					eventTarget: i,
					type: a,
					path: u,
					targets: [],
					node: null,
				},
				f = 0;
			f < u.length;
			f++
		) {
			var d = u[f];
			(c.node = d), e.fire("pointerEvents:collect-targets", c);
		}
		return (
			"hold" === a &&
				(c.targets = c.targets.filter(function (t) {
					return (
						t.eventable.options.holdDuration === n.pointers[s].hold.duration
					);
				})),
			c.targets
		);
	}
	function zo(t) {
		var e = t.interaction,
			n = t.pointerIndex,
			r = e.pointers[n].hold;
		r && r.timeout && (clearTimeout(r.timeout), (r.timeout = null));
	}
	var Co = Io;
	ko.default = Co;
	var Ro = {};
	function Fo(t) {
		var e = t.interaction;
		e.holdIntervalHandle &&
			(clearInterval(e.holdIntervalHandle), (e.holdIntervalHandle = null));
	}
	Object.defineProperty(Ro, "__esModule", { value: !0 }), (Ro.default = void 0);
	var Xo = {
		id: "pointer-events/holdRepeat",
		install: function (t) {
			t.usePlugin(ko.default);
			var e = t.pointerEvents;
			(e.defaults.holdRepeatInterval = 0),
				(e.types.holdrepeat = t.actions.phaselessTypes.holdrepeat = !0);
		},
		listeners: ["move", "up", "cancel", "endall"].reduce(
			function (t, e) {
				return (t["pointerEvents:".concat(e)] = Fo), t;
			},
			{
				"pointerEvents:new": function (t) {
					var e = t.pointerEvent;
					"hold" === e.type && (e.count = (e.count || 0) + 1);
				},
				"pointerEvents:fired": function (t, e) {
					var n = t.interaction,
						r = t.pointerEvent,
						o = t.eventTarget,
						i = t.targets;
					if ("hold" === r.type && i.length) {
						var a = i[0].eventable.options.holdRepeatInterval;
						a <= 0 ||
							(n.holdIntervalHandle = setTimeout(function () {
								e.pointerEvents.fire(
									{
										interaction: n,
										eventTarget: o,
										type: "hold",
										pointer: r,
										event: r,
									},
									e
								);
							}, a));
					}
				},
			}
		),
	};
	Ro.default = Xo;
	var Yo = {};
	function Wo(t) {
		return (0, j.default)(this.events.options, t), this;
	}
	Object.defineProperty(Yo, "__esModule", { value: !0 }), (Yo.default = void 0);
	var Lo = {
		id: "pointer-events/interactableTargets",
		install: function (t) {
			var e = t.Interactable;
			e.prototype.pointerEvents = Wo;
			var n = e.prototype._backCompatOption;
			e.prototype._backCompatOption = function (t, e) {
				var r = n.call(this, t, e);
				return r === this && (this.events.options[t] = e), r;
			};
		},
		listeners: {
			"pointerEvents:collect-targets": function (t, e) {
				var n = t.targets,
					r = t.node,
					o = t.type,
					i = t.eventTarget;
				e.interactables.forEachMatch(r, function (t) {
					var e = t.events,
						a = e.options;
					e.types[o] &&
						e.types[o].length &&
						t.testIgnoreAllow(a, r, i) &&
						n.push({ node: r, eventable: e, props: { interactable: t } });
				});
			},
			"interactable:new": function (t) {
				var e = t.interactable;
				e.events.getRect = function (t) {
					return e.getRect(t);
				};
			},
			"interactable:set": function (t, e) {
				var n = t.interactable,
					r = t.options;
				(0, j.default)(n.events.options, e.pointerEvents.defaults),
					(0, j.default)(n.events.options, r.pointerEvents || {});
			},
		},
	};
	Yo.default = Lo;
	var Bo = {};
	Object.defineProperty(Bo, "__esModule", { value: !0 }), (Bo.default = void 0);
	var Uo = {
		id: "pointer-events",
		install: function (t) {
			t.usePlugin(ko), t.usePlugin(Ro.default), t.usePlugin(Yo.default);
		},
	};
	Bo.default = Uo;
	var No = {};
	Object.defineProperty(No, "__esModule", { value: !0 }), (No.default = void 0);
	No.default = {};
	var Vo = {};
	function qo(t) {
		var e = t.Interactable;
		(t.actions.phases.reflow = !0),
			(e.prototype.reflow = function (e) {
				return (function (t, e, n) {
					for (
						var r = i.default.string(t.target)
								? K.from(t._context.querySelectorAll(t.target))
								: [t.target],
							o = n.window.Promise,
							a = o ? [] : null,
							s = function () {
								var i = r[l],
									s = t.getRect(i);
								if (!s) return "break";
								var u = K.find(n.interactions.list, function (n) {
										return (
											n.interacting() &&
											n.interactable === t &&
											n.element === i &&
											n.prepared.name === e.name
										);
									}),
									c = void 0;
								if (u)
									u.move(),
										a &&
											(c =
												u._reflowPromise ||
												new o(function (t) {
													u._reflowResolve = t;
												}));
								else {
									var f = (0, k.tlbrToXywh)(s),
										d = {
											page: { x: f.x, y: f.y },
											client: { x: f.x, y: f.y },
											timeStamp: n.now(),
										},
										p = W.coordsToEvent(d);
									c = (function (t, e, n, r, o) {
										var i = t.interactions.new({ pointerType: "reflow" }),
											a = {
												interaction: i,
												event: o,
												pointer: o,
												eventTarget: n,
												phase: "reflow",
											};
										(i.interactable = e),
											(i.element = n),
											(i.prevEvent = o),
											i.updatePointer(o, o, n, !0),
											W.setZeroCoords(i.coords.delta),
											(0, Xt.copyAction)(i.prepared, r),
											i._doPhase(a);
										var s = t.window.Promise,
											l = s
												? new s(function (t) {
														i._reflowResolve = t;
												  })
												: void 0;
										(i._reflowPromise = l),
											i.start(r, e, n),
											i._interacting
												? (i.move(a), i.end(o))
												: (i.stop(), i._reflowResolve());
										return i.removePointer(o, o), l;
									})(n, t, i, e, p);
								}
								a && a.push(c);
							},
							l = 0;
						l < r.length;
						l++
					) {
						if ("break" === s()) break;
					}
					return (
						a &&
						o.all(a).then(function () {
							return t;
						})
					);
				})(this, e, t);
			});
	}
	Object.defineProperty(Vo, "__esModule", { value: !0 }),
		(Vo.install = qo),
		(Vo.default = void 0);
	var $o = {
		id: "reflow",
		install: qo,
		listeners: {
			"interactions:stop": function (t, e) {
				var n = t.interaction;
				"reflow" === n.pointerType &&
					(n._reflowResolve && n._reflowResolve(),
					K.remove(e.interactions.list, n));
			},
		},
	};
	Vo.default = $o;
	var Go = {};
	Object.defineProperty(Go, "__esModule", { value: !0 }), (Go.default = void 0);
	Go.default = {};
	var Ho = {};
	Object.defineProperty(Ho, "__esModule", { value: !0 }),
		(Ho.exchange = void 0);
	Ho.exchange = {};
	var Ko = {};
	Object.defineProperty(Ko, "__esModule", { value: !0 }), (Ko.default = void 0);
	Ko.default = {};
	var Zo = { exports: {} };
	function Jo(t) {
		return (Jo =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	Object.defineProperty(Zo.exports, "__esModule", { value: !0 }),
		(Zo.exports.default = void 0),
		fr.default.use(xo.default),
		fr.default.use(se.default),
		fr.default.use(Je.default),
		fr.default.use(ae.default),
		fr.default.use(Tt.default),
		fr.default.use(Bo.default),
		fr.default.use(an.default),
		fr.default.use(mo.default),
		fr.default.use(oe.default),
		fr.default.use(Ot.default),
		fr.default.use(At.default),
		fr.default.use(Vo.default),
		fr.default.use(we.default),
		fr.default.use(Ko.default),
		fr.default.use(No.default),
		(fr.default.__utils = { exchange: Ho.exchange, displace: Go, pointer: W }),
		fr.default.use(pe.default);
	var Qo = fr.default;
	if (((Zo.exports.default = Qo), "object" === Jo(Zo) && Zo))
		try {
			Zo.exports = fr.default;
		} catch (t) {}
	(fr.default.default = fr.default), (Zo = Zo.exports);
	var ti = { exports: {} };
	function ei(t) {
		return (ei =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  })(t);
	}
	Object.defineProperty(ti.exports, "__esModule", { value: !0 }),
		(ti.exports.default = void 0);
	var ni = Zo.default;
	if (((ti.exports.default = ni), "object" === ei(ti) && ti))
		try {
			ti.exports = Zo.default;
		} catch (t) {}
	return (Zo.default.default = Zo.default), (ti = ti.exports);
});
//# sourceMappingURL=interact.min.js.map
