//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {};
})), u = /* @__PURE__ */ o(((e, t) => {
	var n = l()();
	t.exports = function(e) {
		return e !== n && e !== null;
	};
})), d = /* @__PURE__ */ o(((e, t) => {
	var n = u(), r = Array.prototype.forEach, i = Object.create, a = function(e, t) {
		for (var n in e) t[n] = e[n];
	};
	t.exports = function(e) {
		var t = i(null);
		return r.call(arguments, function(e) {
			n(e) && a(Object(e), t);
		}), t;
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = Math.sign;
		return typeof e == "function" && e(10) === 1 && e(-20) === -1;
	};
})), p = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e = Number(e), isNaN(e) || e === 0 ? e : e > 0 ? 1 : -1;
	};
})), m = /* @__PURE__ */ o(((e, t) => {
	t.exports = f()() ? Math.sign : p();
})), h = /* @__PURE__ */ o(((e, t) => {
	var n = m(), r = Math.abs, i = Math.floor;
	t.exports = function(e) {
		return isNaN(e) ? 0 : (e = Number(e), e === 0 || !isFinite(e) ? e : n(e) * i(r(e)));
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	var n = h(), r = Math.max;
	t.exports = function(e) {
		return r(0, n(e));
	};
})), _ = /* @__PURE__ */ o(((e, t) => {
	var n = g();
	t.exports = function(e, t, r) {
		var i;
		return isNaN(e) ? (i = t, i >= 0 ? r && i ? i - 1 : i : 1) : e !== !1 && n(e);
	};
})), v = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		if (typeof e != "function") throw TypeError(e + " is not a function");
		return e;
	};
})), y = /* @__PURE__ */ o(((e, t) => {
	var n = u();
	t.exports = function(e) {
		if (!n(e)) throw TypeError("Cannot use null or undefined");
		return e;
	};
})), b = /* @__PURE__ */ o(((e, t) => {
	var n = v(), r = y(), i = Function.prototype.bind, a = Function.prototype.call, o = Object.keys, s = Object.prototype.propertyIsEnumerable;
	t.exports = function(e, t) {
		return function(c, l) {
			var u, d = arguments[2], f = arguments[3];
			return c = Object(r(c)), n(l), u = o(c), f && u.sort(typeof f == "function" ? i.call(f, c) : void 0), typeof e != "function" && (e = u[e]), a.call(e, u, function(e, n) {
				return s.call(c, e) ? a.call(l, d, c[e], e, c, n) : t;
			});
		};
	};
})), ee = /* @__PURE__ */ o(((e, t) => {
	t.exports = b()("forEach");
})), x = /* @__PURE__ */ o((() => {})), te = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = Object.assign, t;
		return typeof e == "function" && (t = { foo: "raz" }, e(t, { bar: "dwa" }, { trzy: "trzy" }), t.foo + t.bar + t.trzy === "razdwatrzy");
	};
})), S = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		try {
			return !0;
		} catch {
			return !1;
		}
	};
})), ne = /* @__PURE__ */ o(((e, t) => {
	var n = u(), r = Object.keys;
	t.exports = function(e) {
		return r(n(e) ? Object(e) : e);
	};
})), re = /* @__PURE__ */ o(((e, t) => {
	t.exports = S()() ? Object.keys : ne();
})), ie = /* @__PURE__ */ o(((e, t) => {
	var n = re(), r = y(), i = Math.max;
	t.exports = function(e, t) {
		var a, o, s = i(arguments.length, 2), c;
		for (e = Object(r(e)), c = function(n) {
			try {
				e[n] = t[n];
			} catch (e) {
				a ||= e;
			}
		}, o = 1; o < s; ++o) t = arguments[o], n(t).forEach(c);
		if (a !== void 0) throw a;
		return e;
	};
})), ae = /* @__PURE__ */ o(((e, t) => {
	t.exports = te()() ? Object.assign : ie();
})), C = /* @__PURE__ */ o(((e, t) => {
	var n = u(), r = {
		function: !0,
		object: !0
	};
	t.exports = function(e) {
		return n(e) && r[typeof e] || !1;
	};
})), oe = /* @__PURE__ */ o(((e, t) => {
	var n = ae(), r = C(), i = u(), a = Error.captureStackTrace;
	t.exports = function(e) {
		var o = Error(e), s = arguments[1], c = arguments[2];
		return i(c) || r(s) && (c = s, s = null), i(c) && n(o, c), i(s) && (o.code = s), a && a(o, t.exports), o;
	};
})), se = /* @__PURE__ */ o(((e, t) => {
	var n = y(), r = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.getOwnPropertySymbols;
	t.exports = function(e, t) {
		var s, c = Object(n(t));
		if (e = Object(n(e)), a(c).forEach(function(n) {
			try {
				r(e, n, i(t, n));
			} catch (e) {
				s = e;
			}
		}), typeof o == "function" && o(c).forEach(function(n) {
			try {
				r(e, n, i(t, n));
			} catch (e) {
				s = e;
			}
		}), s !== void 0) throw s;
		return e;
	};
})), ce = /* @__PURE__ */ o(((e, t) => {
	var n = g(), r = function(e, t) {
		return t;
	}, i, a, o, s;
	try {
		Object.defineProperty(r, "length", {
			configurable: !0,
			writable: !1,
			enumerable: !1,
			value: 1
		});
	} catch {}
	r.length === 1 ? (i = {
		configurable: !0,
		writable: !1,
		enumerable: !1
	}, a = Object.defineProperty, t.exports = function(e, t) {
		return t = n(t), e.length === t ? e : (i.value = t, a(e, "length", i));
	}) : (s = se(), o = (function() {
		var e = [];
		return function(t) {
			var n, r = 0;
			if (e[t]) return e[t];
			for (n = []; t--;) n.push("a" + (++r).toString(36));
			return Function("fn", "return function (" + n.join(", ") + ") { return fn.apply(this, arguments); };");
		};
	})(), t.exports = function(e, t) {
		var r;
		if (t = n(t), e.length === t) return e;
		r = o(t)(e);
		try {
			s(r, e);
		} catch {}
		return r;
	});
})), le = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e != null;
	};
})), ue = /* @__PURE__ */ o(((e, t) => {
	var n = le(), r = {
		object: !0,
		function: !0,
		undefined: !0
	};
	t.exports = function(e) {
		return n(e) ? hasOwnProperty.call(r, typeof e) : !1;
	};
})), de = /* @__PURE__ */ o(((e, t) => {
	var n = ue();
	t.exports = function(e) {
		if (!n(e)) return !1;
		try {
			return e.constructor ? e.constructor.prototype === e : !1;
		} catch {
			return !1;
		}
	};
})), fe = /* @__PURE__ */ o(((e, t) => {
	var n = de();
	t.exports = function(e) {
		if (typeof e != "function" || !hasOwnProperty.call(e, "length")) return !1;
		try {
			if (typeof e.length != "number" || typeof e.call != "function" || typeof e.apply != "function") return !1;
		} catch {
			return !1;
		}
		return !n(e);
	};
})), pe = /* @__PURE__ */ o(((e, t) => {
	var n = fe(), r = /^\s*class[\s{/}]/, i = Function.prototype.toString;
	t.exports = function(e) {
		return !(!n(e) || r.test(i.call(e)));
	};
})), me = /* @__PURE__ */ o(((e, t) => {
	var n = "razdwatrzy";
	t.exports = function() {
		return typeof n.contains == "function" && n.contains("dwa") === !0 && n.contains("foo") === !1;
	};
})), he = /* @__PURE__ */ o(((e, t) => {
	var n = String.prototype.indexOf;
	t.exports = function(e) {
		return n.call(this, e, arguments[1]) > -1;
	};
})), ge = /* @__PURE__ */ o(((e, t) => {
	t.exports = me()() ? String.prototype.contains : he();
})), _e = /* @__PURE__ */ o(((e, t) => {
	var n = le(), r = pe(), i = ae(), a = d(), o = ge(), s = t.exports = function(e, t) {
		var r, s, c, l, u;
		return arguments.length < 2 || typeof e != "string" ? (l = t, t = e, e = null) : l = arguments[2], n(e) ? (r = o.call(e, "c"), s = o.call(e, "e"), c = o.call(e, "w")) : (r = c = !0, s = !1), u = {
			value: t,
			configurable: r,
			enumerable: s,
			writable: c
		}, l ? i(a(l), u) : u;
	};
	s.gs = function(e, t, s) {
		var c, l, u, d;
		return typeof e == "string" ? u = arguments[3] : (u = s, s = t, t = e, e = null), n(t) ? r(t) ? n(s) ? r(s) || (u = s, s = void 0) : s = void 0 : (u = t, t = s = void 0) : t = void 0, n(e) ? (c = o.call(e, "c"), l = o.call(e, "e")) : (c = !0, l = !1), d = {
			get: t,
			set: s,
			configurable: c,
			enumerable: l
		}, u ? i(a(u), d) : d;
	};
})), ve = /* @__PURE__ */ o(((e, t) => {
	var n = _e(), r = v(), i = Function.prototype.apply, a = Function.prototype.call, o = Object.create, s = Object.defineProperty, c = Object.defineProperties, l = Object.prototype.hasOwnProperty, u = {
		configurable: !0,
		enumerable: !1,
		writable: !0
	}, d = function(e, t) {
		var n;
		return r(t), l.call(this, "__ee__") ? n = this.__ee__ : (n = u.value = o(null), s(this, "__ee__", u), u.value = null), n[e] ? typeof n[e] == "object" ? n[e].push(t) : n[e] = [n[e], t] : n[e] = t, this;
	}, f = function(e, t) {
		var n, a;
		return r(t), a = this, d.call(this, e, n = function() {
			p.call(a, e, n), i.call(t, this, arguments);
		}), n.__eeOnceListener__ = t, this;
	}, p = function(e, t) {
		var n, i, a, o;
		if (r(t), !l.call(this, "__ee__") || (n = this.__ee__, !n[e])) return this;
		if (i = n[e], typeof i == "object") for (o = 0; a = i[o]; ++o) (a === t || a.__eeOnceListener__ === t) && (i.length === 2 ? n[e] = i[+!o] : i.splice(o, 1));
		else (i === t || i.__eeOnceListener__ === t) && delete n[e];
		return this;
	}, m = function(e) {
		var t, n, r, o, s;
		if (l.call(this, "__ee__") && (o = this.__ee__[e], o)) {
			if (typeof o == "object") {
				for (n = arguments.length, s = Array(n - 1), t = 1; t < n; ++t) s[t - 1] = arguments[t];
				for (o = o.slice(), t = 0; r = o[t]; ++t) i.call(r, this, s);
			} else switch (arguments.length) {
				case 1:
					a.call(o, this);
					break;
				case 2:
					a.call(o, this, arguments[1]);
					break;
				case 3:
					a.call(o, this, arguments[1], arguments[2]);
					break;
				default:
					for (n = arguments.length, s = Array(n - 1), t = 1; t < n; ++t) s[t - 1] = arguments[t];
					i.call(o, this, s);
			}
		}
	}, h = {
		on: d,
		once: f,
		off: p,
		emit: m
	}, g = {
		on: n(d),
		once: n(f),
		off: n(p),
		emit: n(m)
	}, _ = c({}, g);
	t.exports = e = function(e) {
		return e == null ? o(_) : c(Object(e), g);
	}, e.methods = h;
})), ye = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = Array.from, t, n;
		return typeof e == "function" && (t = ["raz", "dwa"], n = e(t), !!(n && n !== t && n[1] === "dwa"));
	};
})), be = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		return typeof globalThis != "object" || !globalThis ? !1 : globalThis.Array === Array;
	};
})), xe = /* @__PURE__ */ o(((e, t) => {
	var n = function() {
		if (typeof self == "object" && self) return self;
		if (typeof window == "object" && window) return window;
		throw Error("Unable to resolve global `this`");
	};
	t.exports = (function() {
		if (this) return this;
		try {
			Object.defineProperty(Object.prototype, "__global__", {
				get: function() {
					return this;
				},
				configurable: !0
			});
		} catch {
			return n();
		}
		try {
			return __global__ || n();
		} finally {
			delete Object.prototype.__global__;
		}
	})();
})), Se = /* @__PURE__ */ o(((e, t) => {
	t.exports = be()() ? globalThis : xe();
})), Ce = /* @__PURE__ */ o(((e, t) => {
	var n = Se(), r = {
		object: !0,
		symbol: !0
	};
	t.exports = function() {
		var e = n.Symbol;
		return !(typeof e != "function" || (e("test symbol"), !r[typeof e.iterator]) || !r[typeof e.toPrimitive] || !r[typeof e.toStringTag]);
	};
})), we = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e ? typeof e == "symbol" ? !0 : !e.constructor || e.constructor.name !== "Symbol" ? !1 : e[e.constructor.toStringTag] === "Symbol" : !1;
	};
})), Te = /* @__PURE__ */ o(((e, t) => {
	var n = we();
	t.exports = function(e) {
		if (!n(e)) throw TypeError(e + " is not a symbol");
		return e;
	};
})), Ee = /* @__PURE__ */ o(((e, t) => {
	var n = _e(), r = Object.create, i = Object.defineProperty, a = Object.prototype, o = r(null);
	t.exports = function(e) {
		for (var t = 0, r, s; o[e + (t || "")];) ++t;
		return e += t || "", o[e] = !0, r = "@@" + e, i(a, r, n.gs(null, function(e) {
			s ||= (s = !0, i(this, r, n(e)), !1);
		})), r;
	};
})), De = /* @__PURE__ */ o(((e, t) => {
	var n = _e(), r = Se().Symbol;
	t.exports = function(e) {
		return Object.defineProperties(e, {
			hasInstance: n("", r && r.hasInstance || e("hasInstance")),
			isConcatSpreadable: n("", r && r.isConcatSpreadable || e("isConcatSpreadable")),
			iterator: n("", r && r.iterator || e("iterator")),
			match: n("", r && r.match || e("match")),
			replace: n("", r && r.replace || e("replace")),
			search: n("", r && r.search || e("search")),
			species: n("", r && r.species || e("species")),
			split: n("", r && r.split || e("split")),
			toPrimitive: n("", r && r.toPrimitive || e("toPrimitive")),
			toStringTag: n("", r && r.toStringTag || e("toStringTag")),
			unscopables: n("", r && r.unscopables || e("unscopables"))
		});
	};
})), Oe = /* @__PURE__ */ o(((e, t) => {
	var n = _e(), r = Te(), i = Object.create(null);
	t.exports = function(e) {
		return Object.defineProperties(e, {
			for: n(function(t) {
				return i[t] ? i[t] : i[t] = e(String(t));
			}),
			keyFor: n(function(e) {
				for (var t in r(e), i) if (i[t] === e) return t;
			})
		});
	};
})), ke = /* @__PURE__ */ o(((e, t) => {
	var n = _e(), r = Te(), i = Se().Symbol, a = Ee(), o = De(), s = Oe(), c = Object.create, l = Object.defineProperties, u = Object.defineProperty, d, f, p;
	if (typeof i == "function") try {
		String(i()), p = !0;
	} catch {}
	else i = null;
	f = function(e) {
		if (this instanceof f) throw TypeError("Symbol is not a constructor");
		return d(e);
	}, t.exports = d = function e(t) {
		var r;
		if (this instanceof e) throw TypeError("Symbol is not a constructor");
		return p ? i(t) : (r = c(f.prototype), t = t === void 0 ? "" : String(t), l(r, {
			__description__: n("", t),
			__name__: n("", a(t))
		}));
	}, o(d), s(d), l(f.prototype, {
		constructor: n(d),
		toString: n("", function() {
			return this.__name__;
		})
	}), l(d.prototype, {
		toString: n(function() {
			return "Symbol (" + r(this).__description__ + ")";
		}),
		valueOf: n(function() {
			return r(this);
		})
	}), u(d.prototype, d.toPrimitive, n("", function() {
		var e = r(this);
		return typeof e == "symbol" ? e : e.toString();
	})), u(d.prototype, d.toStringTag, n("c", "Symbol")), u(f.prototype, d.toStringTag, n("c", d.prototype[d.toStringTag])), u(f.prototype, d.toPrimitive, n("c", d.prototype[d.toPrimitive]));
})), Ae = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ce()() ? Se().Symbol : ke();
})), je = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString, r = n.call((function() {
		return arguments;
	})());
	t.exports = function(e) {
		return n.call(e) === r;
	};
})), Me = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString, r = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
	t.exports = function(e) {
		return typeof e == "function" && r(n.call(e));
	};
})), Ne = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString, r = n.call("");
	t.exports = function(e) {
		return typeof e == "string" || e && typeof e == "object" && (e instanceof String || n.call(e) === r) || !1;
	};
})), Pe = /* @__PURE__ */ o(((e, t) => {
	var n = Ae().iterator, r = je(), i = Me(), a = g(), o = v(), s = y(), c = u(), l = Ne(), d = Array.isArray, f = Function.prototype.call, p = {
		configurable: !0,
		enumerable: !0,
		writable: !0,
		value: null
	}, m = Object.defineProperty;
	t.exports = function(e) {
		var t = arguments[1], u = arguments[2], h, g, _, v, y, b, ee, x, te, S;
		if (e = Object(s(e)), c(t) && o(t), !this || this === Array || !i(this)) {
			if (!t) {
				if (r(e)) return y = e.length, y === 1 ? (v = [,], v[0] = e[0], v) : Array.apply(null, e);
				if (d(e)) {
					for (v = Array(y = e.length), g = 0; g < y; ++g) v[g] = e[g];
					return v;
				}
			}
			v = [];
		} else h = this;
		if (!d(e)) {
			if ((te = e[n]) !== void 0) {
				for (ee = o(te).call(e), h && (v = new h()), x = ee.next(), g = 0; !x.done;) S = t ? f.call(t, u, x.value, g) : x.value, h ? (p.value = S, m(v, g, p)) : v[g] = S, x = ee.next(), ++g;
				y = g;
			} else if (l(e)) {
				for (y = e.length, h && (v = new h()), g = 0, _ = 0; g < y; ++g) S = e[g], g + 1 < y && (b = S.charCodeAt(0), b >= 55296 && b <= 56319 && (S += e[++g])), S = t ? f.call(t, u, S, _) : S, h ? (p.value = S, m(v, _, p)) : v[_] = S, ++_;
				y = _;
			}
		}
		if (y === void 0) for (y = a(e.length), h && (v = new h(y)), g = 0; g < y; ++g) S = t ? f.call(t, u, e[g], g) : e[g], h ? (p.value = S, m(v, g, p)) : v[g] = S;
		return h && (p.value = null, v.length = y), v;
	};
})), Fe = /* @__PURE__ */ o(((e, t) => {
	t.exports = ye()() ? Array.from : Pe();
})), Ie = /* @__PURE__ */ o(((e, t) => {
	var n = Fe(), r = Array.isArray;
	t.exports = function(e) {
		return r(e) ? e : n(e);
	};
})), Le = /* @__PURE__ */ o(((e, t) => {
	var n = Ie(), r = u(), i = v(), a = Array.prototype.slice, o = function(e) {
		return this.map(function(t, n) {
			return t ? t(e[n]) : e[n];
		}).concat(a.call(e, this.length));
	};
	t.exports = function(e) {
		return e = n(e), e.forEach(function(e) {
			r(e) && i(e);
		}), o.bind(e);
	};
})), Re = /* @__PURE__ */ o(((e, t) => {
	var n = v();
	t.exports = function(e) {
		var t;
		return typeof e == "function" ? {
			set: e,
			get: e
		} : (t = { get: n(e.get) }, e.set === void 0 ? (t.set = t.get, t) : (t.set = n(e.set), e.delete && (t.delete = n(e.delete)), e.clear && (t.clear = n(e.clear)), t));
	};
})), ze = /* @__PURE__ */ o(((e, t) => {
	var n = oe(), r = ce(), i = _e(), a = ve().methods, o = Le(), s = Re(), c = Function.prototype.apply, l = Function.prototype.call, u = Object.create, d = Object.defineProperties, f = a.on, p = a.emit;
	t.exports = function(e, t, a) {
		var m = u(null), h, g = t === !1 ? isNaN(e.length) ? 1 : e.length : t, _, v, y, b, ee, x, te, S, ne, re, ie, ae, C;
		return a.normalizer && (S = s(a.normalizer), _ = S.get, v = S.set, y = S.delete, b = S.clear), a.resolvers != null && (C = o(a.resolvers)), ae = _ ? r(function(t) {
			var r, i, a = arguments;
			if (C && (a = C(a)), r = _(a), r !== null && hasOwnProperty.call(m, r)) return ne && h.emit("get", r, a, this), m[r];
			if (i = a.length === 1 ? l.call(e, this, a[0]) : c.call(e, this, a), r === null) {
				if (r = _(a), r !== null) throw n("Circular invocation", "CIRCULAR_INVOCATION");
				r = v(a);
			} else if (hasOwnProperty.call(m, r)) throw n("Circular invocation", "CIRCULAR_INVOCATION");
			return m[r] = i, re && h.emit("set", r, null, i), i;
		}, g) : t === 0 ? function() {
			var t;
			if (hasOwnProperty.call(m, "data")) return ne && h.emit("get", "data", arguments, this), m.data;
			if (t = arguments.length ? c.call(e, this, arguments) : l.call(e, this), hasOwnProperty.call(m, "data")) throw n("Circular invocation", "CIRCULAR_INVOCATION");
			return m.data = t, re && h.emit("set", "data", null, t), t;
		} : function(t) {
			var r, i = arguments, a;
			if (C && (i = C(arguments)), a = String(i[0]), hasOwnProperty.call(m, a)) return ne && h.emit("get", a, i, this), m[a];
			if (r = i.length === 1 ? l.call(e, this, i[0]) : c.call(e, this, i), hasOwnProperty.call(m, a)) throw n("Circular invocation", "CIRCULAR_INVOCATION");
			return m[a] = r, re && h.emit("set", a, null, r), r;
		}, h = {
			original: e,
			memoized: ae,
			profileName: a.profileName,
			get: function(e) {
				return C && (e = C(e)), _ ? _(e) : String(e[0]);
			},
			has: function(e) {
				return hasOwnProperty.call(m, e);
			},
			delete: function(e) {
				var t;
				hasOwnProperty.call(m, e) && (y && y(e), t = m[e], delete m[e], ie && h.emit("delete", e, t));
			},
			clear: function() {
				var e = m;
				b && b(), m = u(null), h.emit("clear", e);
			},
			on: function(e, t) {
				return e === "get" ? ne = !0 : e === "set" ? re = !0 : e === "delete" && (ie = !0), f.call(this, e, t);
			},
			emit: p,
			updateEnv: function() {
				e = h.original;
			}
		}, ee = _ ? r(function(e) {
			var t, n = arguments;
			C && (n = C(n)), t = _(n), t !== null && h.delete(t);
		}, g) : t === 0 ? function() {
			return h.delete("data");
		} : function(e) {
			return C && (e = C(arguments)[0]), h.delete(e);
		}, x = r(function() {
			var e, n = arguments;
			return t === 0 ? m.data : (C && (n = C(n)), e = _ ? _(n) : String(n[0]), m[e]);
		}), te = r(function() {
			var e, n = arguments;
			return t === 0 ? h.has("data") : (C && (n = C(n)), e = _ ? _(n) : String(n[0]), e !== null && h.has(e));
		}), d(ae, {
			__memoized__: i(!0),
			delete: i(ee),
			clear: i(h.clear),
			_get: i(x),
			_has: i(te)
		}), h;
	};
})), Be = /* @__PURE__ */ o(((e, t) => {
	var n = v(), r = ee(), i = x(), a = ze(), o = _();
	t.exports = function e(t) {
		var s, c, l;
		if (n(t), s = Object(arguments[1]), s.async && s.promise) throw Error("Options 'async' and 'promise' cannot be used together");
		return hasOwnProperty.call(t, "__memoized__") && !s.force ? t : (c = o(s.length, t.length, s.async && i.async), l = a(t, c, s), r(i, function(e, t) {
			s[t] && e(s[t], l, s);
		}), e.__profiler__ && e.__profiler__(l), l.updateEnv(), l.memoized);
	};
})), Ve = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		var t, n, r = e.length;
		if (!r) return "";
		for (t = String(e[n = 0]); --r;) t += "" + e[++n];
		return t;
	};
})), He = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e ? function(t) {
			for (var n = String(t[0]), r = 0, i = e; --i;) n += "" + t[++r];
			return n;
		} : function() {
			return "";
		};
	};
})), Ue = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = Number.isNaN;
		return typeof e == "function" && !e({}) && e(NaN) && !e(34);
	};
})), We = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e !== e;
	};
})), Ge = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ue()() ? Number.isNaN : We();
})), Ke = /* @__PURE__ */ o(((e, t) => {
	var n = Ge(), r = g(), i = y(), a = Array.prototype.indexOf, o = Object.prototype.hasOwnProperty, s = Math.abs, c = Math.floor;
	t.exports = function(e) {
		var t, l, u, d;
		if (!n(e)) return a.apply(this, arguments);
		for (l = r(i(this).length), u = arguments[1], u = isNaN(u) ? 0 : u >= 0 ? c(u) : r(this.length) - c(s(u)), t = u; t < l; ++t) if (o.call(this, t) && (d = this[t], n(d))) return t;
		return -1;
	};
})), qe = /* @__PURE__ */ o(((e, t) => {
	var n = Ke(), r = Object.create;
	t.exports = function() {
		var e = 0, t = [], i = r(null);
		return {
			get: function(e) {
				var r = 0, i = t, a, o = e.length;
				if (o === 0) return i[o] || null;
				if (i = i[o]) {
					for (; r < o - 1;) {
						if (a = n.call(i[0], e[r]), a === -1) return null;
						i = i[1][a], ++r;
					}
					return a = n.call(i[0], e[r]), a === -1 ? null : i[1][a] || null;
				}
				return null;
			},
			set: function(r) {
				var a = 0, o = t, s, c = r.length;
				if (c === 0) o[c] = ++e;
				else {
					for (o[c] || (o[c] = [[], []]), o = o[c]; a < c - 1;) s = n.call(o[0], r[a]), s === -1 && (s = o[0].push(r[a]) - 1, o[1].push([[], []])), o = o[1][s], ++a;
					s = n.call(o[0], r[a]), s === -1 && (s = o[0].push(r[a]) - 1), o[1][s] = ++e;
				}
				return i[e] = r, e;
			},
			delete: function(e) {
				var r = 0, a = t, o, s = i[e], c = s.length, l = [];
				if (c === 0) delete a[c];
				else if (a = a[c]) {
					for (; r < c - 1;) {
						if (o = n.call(a[0], s[r]), o === -1) return;
						l.push(a, o), a = a[1][o], ++r;
					}
					if (o = n.call(a[0], s[r]), o === -1) return;
					for (e = a[1][o], a[0].splice(o, 1), a[1].splice(o, 1); !a[0].length && l.length;) o = l.pop(), a = l.pop(), a[0].splice(o, 1), a[1].splice(o, 1);
				}
				delete i[e];
			},
			clear: function() {
				t = [], i = r(null);
			}
		};
	};
})), Je = /* @__PURE__ */ o(((e, t) => {
	var n = Ke();
	t.exports = function() {
		var e = 0, t = [], r = [];
		return {
			get: function(e) {
				var i = n.call(t, e[0]);
				return i === -1 ? null : r[i];
			},
			set: function(n) {
				return t.push(n[0]), r.push(++e), e;
			},
			delete: function(e) {
				var i = n.call(r, e);
				i !== -1 && (t.splice(i, 1), r.splice(i, 1));
			},
			clear: function() {
				t = [], r = [];
			}
		};
	};
})), Ye = /* @__PURE__ */ o(((e, t) => {
	var n = Ke(), r = Object.create;
	t.exports = function(e) {
		var t = 0, i = [[], []], a = r(null);
		return {
			get: function(t) {
				for (var r = 0, a = i, o; r < e - 1;) {
					if (o = n.call(a[0], t[r]), o === -1) return null;
					a = a[1][o], ++r;
				}
				return o = n.call(a[0], t[r]), o === -1 ? null : a[1][o] || null;
			},
			set: function(r) {
				for (var o = 0, s = i, c; o < e - 1;) c = n.call(s[0], r[o]), c === -1 && (c = s[0].push(r[o]) - 1, s[1].push([[], []])), s = s[1][c], ++o;
				return c = n.call(s[0], r[o]), c === -1 && (c = s[0].push(r[o]) - 1), s[1][c] = ++t, a[t] = r, t;
			},
			delete: function(t) {
				for (var r = 0, o = i, s, c = [], l = a[t]; r < e - 1;) {
					if (s = n.call(o[0], l[r]), s === -1) return;
					c.push(o, s), o = o[1][s], ++r;
				}
				if (s = n.call(o[0], l[r]), s !== -1) {
					for (t = o[1][s], o[0].splice(s, 1), o[1].splice(s, 1); !o[0].length && c.length;) s = c.pop(), o = c.pop(), o[0].splice(s, 1), o[1].splice(s, 1);
					delete a[t];
				}
			},
			clear: function() {
				i = [[], []], a = r(null);
			}
		};
	};
})), Xe = /* @__PURE__ */ o(((e, t) => {
	var n = v(), r = ee(), i = Function.prototype.call;
	t.exports = function(e, t) {
		var a = {}, o = arguments[2];
		return n(t), r(e, function(e, n, r, s) {
			a[n] = i.call(t, o, e, n, r, s);
		}), a;
	};
})), Ze = /* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		if (typeof e != "function") throw TypeError(e + " is not a function");
		return e;
	}, r = function(e) {
		var t = document.createTextNode(""), r, i, a = 0;
		return new e(function() {
			var e;
			if (r) i && (r = i.concat(r));
			else {
				if (!i) return;
				r = i;
			}
			if (i = r, r = null, typeof i == "function") {
				e = i, i = null, e();
				return;
			}
			for (t.data = a = ++a % 2; i;) e = i.shift(), i.length || (i = null), e();
		}).observe(t, { characterData: !0 }), function(e) {
			if (n(e), r) {
				typeof r == "function" ? r = [r, e] : r.push(e);
				return;
			}
			r = e, t.data = a = ++a % 2;
		};
	};
	t.exports = function() {
		if (typeof process == "object" && process && typeof process.nextTick == "function") return process.nextTick;
		if (typeof queueMicrotask == "function") return function(e) {
			queueMicrotask(n(e));
		};
		if (typeof document == "object" && document) {
			if (typeof MutationObserver == "function") return r(MutationObserver);
			if (typeof WebKitMutationObserver == "function") return r(WebKitMutationObserver);
		}
		return typeof setImmediate == "function" ? function(e) {
			setImmediate(n(e));
		} : typeof setTimeout == "function" || typeof setTimeout == "object" ? function(e) {
			setTimeout(n(e), 0);
		} : null;
	}();
})), Qe = /* @__PURE__ */ o((() => {
	var e = Fe(), t = Xe(), n = se(), r = ce(), i = Ze(), a = Array.prototype.slice, o = Function.prototype.apply, s = Object.create;
	x().async = function(c, l) {
		var u = s(null), d = s(null), f = l.memoized, p = l.original, m, h, g;
		l.memoized = r(function(e) {
			var t = arguments, n = t[t.length - 1];
			return typeof n == "function" && (m = n, t = a.call(t, 0, -1)), f.apply(h = this, g = t);
		}, f);
		try {
			n(l.memoized, f);
		} catch {}
		l.on("get", function(e) {
			var t, n, r;
			if (m) {
				if (u[e]) {
					typeof u[e] == "function" ? u[e] = [u[e], m] : u[e].push(m), m = null;
					return;
				}
				t = m, n = h, r = g, m = h = g = null, i(function() {
					var i;
					hasOwnProperty.call(d, e) ? (i = d[e], l.emit("getasync", e, r, n), o.call(t, i.context, i.args)) : (m = t, h = n, g = r, f.apply(n, r));
				});
			}
		}), l.original = function() {
			var t, n, r, a;
			return m ? (t = e(arguments), n = function t(n) {
				var r, s, c = t.id;
				if (c == null) {
					i(o.bind(t, this, arguments));
					return;
				}
				if (delete t.id, r = u[c], delete u[c], r) return s = e(arguments), l.has(c) && (n ? l.delete(c) : (d[c] = {
					context: this,
					args: s
				}, l.emit("setasync", c, typeof r == "function" ? 1 : r.length))), typeof r == "function" ? a = o.call(r, this, s) : r.forEach(function(e) {
					a = o.call(e, this, s);
				}, this), a;
			}, r = m, m = h = g = null, t.push(n), a = o.call(p, this, t), n.cb = r, m = n, a) : o.call(p, this, arguments);
		}, l.on("set", function(e) {
			if (!m) {
				l.delete(e);
				return;
			}
			u[e] ? typeof u[e] == "function" ? u[e] = [u[e], m.cb] : u[e].push(m.cb) : u[e] = m.cb, delete m.cb, m.id = e, m = null;
		}), l.on("delete", function(e) {
			var t;
			hasOwnProperty.call(u, e) || d[e] && (t = d[e], delete d[e], l.emit("deleteasync", e, a.call(t.args, 1)));
		}), l.on("clear", function() {
			var e = d;
			d = s(null), l.emit("clearasync", t(e, function(e) {
				return a.call(e.args, 1);
			}));
		});
	};
})), $e = /* @__PURE__ */ o(((e, t) => {
	var n = Array.prototype.forEach, r = Object.create;
	t.exports = function(e) {
		var t = r(null);
		return n.call(arguments, function(e) {
			t[e] = !0;
		}), t;
	};
})), et = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return typeof e == "function";
	};
})), tt = /* @__PURE__ */ o(((e, t) => {
	var n = et();
	t.exports = function(e) {
		try {
			return e && n(e.toString) ? e.toString() : String(e);
		} catch {
			throw TypeError("Passed argument cannot be stringifed");
		}
	};
})), nt = /* @__PURE__ */ o(((e, t) => {
	var n = y(), r = tt();
	t.exports = function(e) {
		return r(n(e));
	};
})), rt = /* @__PURE__ */ o(((e, t) => {
	var n = et();
	t.exports = function(e) {
		try {
			return e && n(e.toString) ? e.toString() : String(e);
		} catch {
			return "<Non-coercible to string value>";
		}
	};
})), it = /* @__PURE__ */ o(((e, t) => {
	var n = rt(), r = /[\n\r\u2028\u2029]/g;
	t.exports = function(e) {
		var t = n(e);
		return t.length > 100 && (t = t.slice(0, 99) + "…"), t = t.replace(r, function(e) {
			return JSON.stringify(e).slice(1, -1);
		}), t;
	};
})), at = /* @__PURE__ */ o(((e, t) => {
	t.exports = n, t.exports.default = n;
	function n(e) {
		return !!e && (typeof e == "object" || typeof e == "function") && typeof e.then == "function";
	}
})), ot = /* @__PURE__ */ o((() => {
	var e = Xe(), t = $e(), n = nt(), r = it(), i = at(), a = Ze(), o = Object.create, s = t("then", "then:finally", "done", "done:finally");
	x().promise = function(t, c) {
		var l = o(null), u = o(null), d = o(null);
		if (t === !0) t = null;
		else if (t = n(t), !s[t]) throw TypeError("'" + r(t) + "' is not valid promise mode");
		c.on("set", function(e, n, r) {
			var o = !1;
			if (!i(r)) {
				u[e] = r, c.emit("setasync", e, 1);
				return;
			}
			l[e] = 1, d[e] = r;
			var s = function(t) {
				var n = l[e];
				if (o) throw Error("Memoizee error: Detected unordered then|done & finally resolution, which in turn makes proper detection of success/failure impossible (when in 'done:finally' mode)\nConsider to rely on 'then' or 'done' mode instead.");
				n && (delete l[e], u[e] = t, c.emit("setasync", e, n));
			}, f = function() {
				o = !0, l[e] && (delete l[e], delete d[e], c.delete(e));
			}, p = t;
			if (p ||= "then", p === "then") {
				var m = function() {
					a(f);
				};
				r = r.then(function(e) {
					a(s.bind(this, e));
				}, m), typeof r.finally == "function" && r.finally(m);
			} else if (p === "done") {
				if (typeof r.done != "function") throw Error("Memoizee error: Retrieved promise does not implement 'done' in 'done' mode");
				r.done(s, f);
			} else if (p === "done:finally") {
				if (typeof r.done != "function") throw Error("Memoizee error: Retrieved promise does not implement 'done' in 'done:finally' mode");
				if (typeof r.finally != "function") throw Error("Memoizee error: Retrieved promise does not implement 'finally' in 'done:finally' mode");
				r.done(s), r.finally(f);
			}
		}), c.on("get", function(e, t, n) {
			var r;
			if (l[e]) {
				++l[e];
				return;
			}
			r = d[e];
			var o = function() {
				c.emit("getasync", e, t, n);
			};
			i(r) ? typeof r.done == "function" ? r.done(o) : r.then(function() {
				a(o);
			}) : o();
		}), c.on("delete", function(e) {
			if (delete d[e], l[e]) {
				delete l[e];
				return;
			}
			if (hasOwnProperty.call(u, e)) {
				var t = u[e];
				delete u[e], c.emit("deleteasync", e, [t]);
			}
		}), c.on("clear", function() {
			var t = u;
			u = o(null), l = o(null), d = o(null), c.emit("clearasync", e(t, function(e) {
				return [e];
			}));
		});
	};
})), st = /* @__PURE__ */ o((() => {
	var e = v(), t = ee(), n = x(), r = Function.prototype.apply;
	n.dispose = function(i, a, o) {
		var s;
		if (e(i), o.async && n.async || o.promise && n.promise) {
			a.on("deleteasync", s = function(e, t) {
				r.call(i, null, t);
			}), a.on("clearasync", function(e) {
				t(e, function(e, t) {
					s(t, e);
				});
			});
			return;
		}
		a.on("delete", s = function(e, t) {
			i(t);
		}), a.on("clear", function(e) {
			t(e, function(e, t) {
				s(t, e);
			});
		});
	};
})), ct = /* @__PURE__ */ o(((e, t) => {
	t.exports = 2147483647;
})), lt = /* @__PURE__ */ o(((e, t) => {
	var n = g(), r = ct();
	t.exports = function(e) {
		if (e = n(e), e > r) throw TypeError(e + " exceeds maximum possible timeout");
		return e;
	};
})), ut = /* @__PURE__ */ o((() => {
	var e = Fe(), t = ee(), n = Ze(), r = at(), i = lt(), a = x(), o = Function.prototype, s = Math.max, c = Math.min, l = Object.create;
	a.maxAge = function(u, d, f) {
		var p, m, h, g;
		u = i(u), u && (p = l(null), m = f.async && a.async || f.promise && a.promise ? "async" : "", d.on("set" + m, function(e) {
			p[e] = setTimeout(function() {
				d.delete(e);
			}, u), typeof p[e].unref == "function" && p[e].unref(), g && (g[e] && g[e] !== "nextTick" && clearTimeout(g[e]), g[e] = setTimeout(function() {
				delete g[e];
			}, h), typeof g[e].unref == "function" && g[e].unref());
		}), d.on("delete" + m, function(e) {
			clearTimeout(p[e]), delete p[e], g && (g[e] !== "nextTick" && clearTimeout(g[e]), delete g[e]);
		}), f.preFetch && (h = f.preFetch === !0 || isNaN(f.preFetch) ? .333 : s(c(Number(f.preFetch), 1), 0), h && (g = {}, h = (1 - h) * u, d.on("get" + m, function(t, i, a) {
			g[t] || (g[t] = "nextTick", n(function() {
				var n;
				g[t] === "nextTick" && (delete g[t], d.delete(t), f.async && (i = e(i), i.push(o)), n = d.memoized.apply(a, i), f.promise && r(n) && (typeof n.done == "function" ? n.done(o, o) : n.then(o, o)));
			}));
		}))), d.on("clear" + m, function() {
			t(p, function(e) {
				clearTimeout(e);
			}), p = {}, g &&= (t(g, function(e) {
				e !== "nextTick" && clearTimeout(e);
			}), {});
		}));
	};
})), dt = /* @__PURE__ */ o(((e, t) => {
	var n = g(), r = Object.create, i = Object.prototype.hasOwnProperty;
	t.exports = function(e) {
		var t = 0, a = 1, o = r(null), s = r(null), c = 0, l;
		return e = n(e), {
			hit: function(n) {
				var r = s[n], u = ++c;
				if (o[u] = n, s[n] = u, !r) return ++t, t <= e ? void 0 : (n = o[a], l(n), n);
				if (delete o[r], a === r) for (; !i.call(o, ++a);) continue;
			},
			delete: l = function(e) {
				var n = s[e];
				if (n && (delete o[n], delete s[e], --t, a === n)) {
					if (!t) {
						c = 0, a = 1;
						return;
					}
					for (; !i.call(o, ++a);) continue;
				}
			},
			clear: function() {
				t = 0, a = 1, o = r(null), s = r(null), c = 0;
			}
		};
	};
})), ft = /* @__PURE__ */ o((() => {
	var e = g(), t = dt(), n = x();
	n.max = function(r, i, a) {
		var o, s, c;
		r = e(r), r && (s = t(r), o = a.async && n.async || a.promise && n.promise ? "async" : "", i.on("set" + o, c = function(e) {
			e = s.hit(e), e !== void 0 && i.delete(e);
		}), i.on("get" + o, c), i.on("delete" + o, s.delete), i.on("clear" + o, s.clear));
	};
})), pt = /* @__PURE__ */ o((() => {
	var e = _e(), t = x(), n = Object.create, r = Object.defineProperties;
	t.refCounter = function(i, a, o) {
		var s = n(null), c = o.async && t.async || o.promise && t.promise ? "async" : "";
		a.on("set" + c, function(e, t) {
			s[e] = t || 1;
		}), a.on("get" + c, function(e) {
			++s[e];
		}), a.on("delete" + c, function(e) {
			delete s[e];
		}), a.on("clear" + c, function() {
			s = {};
		}), r(a.memoized, {
			deleteRef: e(function() {
				var e = a.get(arguments);
				return e === null || !s[e] ? null : !--s[e] && (a.delete(e), !0);
			}),
			getRefCount: e(function() {
				var e = a.get(arguments);
				return e === null || !s[e] ? 0 : s[e];
			})
		});
	};
})), w = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	var n = d(), r = _(), i = Be();
	t.exports = function(e) {
		var t = n(arguments[1]), a;
		return t.normalizer || (a = t.length = r(t.length, e.length, t.async), a !== 0 && (t.primitive ? a === !1 ? t.normalizer = Ve() : a > 1 && (t.normalizer = He()(a)) : t.normalizer = a === !1 ? qe()() : a === 1 ? Je()() : Ye()(a))), t.async && Qe(), t.promise && ot(), t.dispose && st(), t.maxAge && ut(), t.max && ft(), t.refCounter && pt(), i(e, t);
	};
})))(), 1), mt = (0, w.default)((e, t, n, r) => Math.max(e, n) < Math.min(t, r)), ht = (e, t) => mt(e.start, e.end, t.start, t.end), gt = {
	INVALID_ANNOTATION: "Invalid annotation",
	INVALID_LINE: "Invalid line"
}, T = class e {
	constructor() {
		this._verboseEnabled = !1, this._debugEnabled = !1;
	}
	static get instance() {
		return e._instance ||= new e(), e._instance;
	}
	static setDebug(e) {
		this.instance._debugEnabled = e;
	}
	static setVerbose(e) {
		this.instance._verboseEnabled = e;
	}
	static get verboseEnabled() {
		return this.instance._verboseEnabled;
	}
	static get debugEnabled() {
		return this.instance._debugEnabled;
	}
	static time(t, n) {
		let r = Date.now() - t, i = `${n} took ${r} ms , ${r / 1e3} s`;
		r > 1e3 ? console.warn("TIMER", i) : e.debug("TIMER", i);
	}
	static warn(...e) {
		this.verboseEnabled && console.warn(...e);
	}
	static error(...e) {
		console.error(...e);
	}
	static debug(t, n, ...r) {
		this.debugEnabled && console.log(e.formatMessage(t, n), r);
	}
	static verbose(t, n, ...r) {
		this.verboseEnabled && console.debug(e.formatMessage(t, n), r);
	}
	static formatMessage(e, t) {
		return `${e}: ${t}`;
	}
}, _t = class {
	constructor() {
		this.eventMap = /* @__PURE__ */ new Map(), this.errorSet = [], this.eventMap.set("all", []);
	}
	register(e, t) {
		this.eventMap.has(e) || this.eventMap.set(e, []), this.eventMap.get(e)?.push(t);
	}
	registerError(e) {
		this.errorSet.push(e);
	}
	sendError(e, t, ...n) {
		T.warn(`[${gt[e]}] - `, t, ...n), this.errorSet.forEach((r) => r({
			code: e,
			error: gt[e],
			message: t,
			params: n
		}));
	}
	sendEvent(e, t, n) {
		let r = [this.eventMap.get(e), this.eventMap.get("all")].flat();
		for (let i of r) i && i({
			event: e,
			mouseEvent: n,
			data: t
		});
	}
}, vt = { value: () => {} };
function yt() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new bt(n);
}
function bt(e) {
	this._ = e;
}
function xt(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
bt.prototype = yt.prototype = {
	constructor: bt,
	on: function(e, t) {
		var n = this._, r = xt(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = St(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = Ct(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = Ct(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new bt(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function St(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function Ct(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = vt, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var wt = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function Tt(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), wt.hasOwnProperty(t) ? {
		space: wt[t],
		local: e
	} : e;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function Et(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function Dt(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function Ot(e) {
	var t = Tt(e);
	return (t.local ? Dt : Et)(t);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function kt() {}
function At(e) {
	return e == null ? kt : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function jt(e) {
	typeof e != "function" && (e = At(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new br(r, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function Mt(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function Nt() {
	return [];
}
function Pt(e) {
	return e == null ? Nt : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function Ft(e) {
	return function() {
		return Mt(e.apply(this, arguments));
	};
}
function It(e) {
	e = typeof e == "function" ? Ft(e) : Pt(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new br(r, i);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function Lt(e) {
	return function() {
		return this.matches(e);
	};
}
function Rt(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var zt = Array.prototype.find;
function Bt(e) {
	return function() {
		return zt.call(this.children, e);
	};
}
function Vt() {
	return this.firstElementChild;
}
function Ht(e) {
	return this.select(e == null ? Vt : Bt(typeof e == "function" ? e : Rt(e)));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var Ut = Array.prototype.filter;
function Wt() {
	return Array.from(this.children);
}
function Gt(e) {
	return function() {
		return Ut.call(this.children, e);
	};
}
function Kt(e) {
	return this.selectAll(e == null ? Wt : Gt(typeof e == "function" ? e : Rt(e)));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function qt(e) {
	typeof e != "function" && (e = Lt(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new br(r, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function Jt(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function Yt() {
	return new br(this._enter || this._groups.map(Jt), this._parents);
}
function Xt(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Xt.prototype = {
	constructor: Xt,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function Zt(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function Qt(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Xt(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function $t(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Xt(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function en(e) {
	return e.__data__;
}
function tn(e, t) {
	if (!arguments.length) return Array.from(this, en);
	var n = t ? $t : Qt, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Zt(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = nn(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new br(o, r), o._enter = s, o._exit = c, o;
}
function nn(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function rn() {
	return new br(this._exit || this._groups.map(Jt), this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function an(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function on(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new br(s, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function sn() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function cn(e) {
	e ||= ln;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new br(i, this._parents).order();
}
function ln(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function un() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function dn() {
	return Array.from(this);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function fn() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function pn() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function mn() {
	return !this.node();
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function hn(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function gn(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function _n(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function vn(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function yn(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function bn(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function xn(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function Sn(e, t) {
	var n = Tt(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? _n : gn : typeof t == "function" ? n.local ? xn : bn : n.local ? yn : vn)(n, t));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function Cn(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function wn(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Tn(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function En(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Dn(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? wn : typeof t == "function" ? En : Tn)(e, t, n ?? "")) : On(this.node(), e);
}
function On(e, t) {
	return e.style.getPropertyValue(t) || Cn(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function kn(e) {
	return function() {
		delete this[e];
	};
}
function An(e, t) {
	return function() {
		this[e] = t;
	};
}
function jn(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Mn(e, t) {
	return arguments.length > 1 ? this.each((t == null ? kn : typeof t == "function" ? jn : An)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function Nn(e) {
	return e.trim().split(/^|\s+/);
}
function Pn(e) {
	return e.classList || new Fn(e);
}
function Fn(e) {
	this._node = e, this._names = Nn(e.getAttribute("class") || "");
}
Fn.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function In(e, t) {
	for (var n = Pn(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Ln(e, t) {
	for (var n = Pn(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function Rn(e) {
	return function() {
		In(this, e);
	};
}
function zn(e) {
	return function() {
		Ln(this, e);
	};
}
function Bn(e, t) {
	return function() {
		(t.apply(this, arguments) ? In : Ln)(this, e);
	};
}
function Vn(e, t) {
	var n = Nn(e + "");
	if (arguments.length < 2) {
		for (var r = Pn(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? Bn : t ? Rn : zn)(n, t));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function Hn() {
	this.textContent = "";
}
function Un(e) {
	return function() {
		this.textContent = e;
	};
}
function Wn(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Gn(e) {
	return arguments.length ? this.each(e == null ? Hn : (typeof e == "function" ? Wn : Un)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function Kn() {
	this.innerHTML = "";
}
function qn(e) {
	return function() {
		this.innerHTML = e;
	};
}
function Jn(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function Yn(e) {
	return arguments.length ? this.each(e == null ? Kn : (typeof e == "function" ? Jn : qn)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function Xn() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Zn() {
	return this.each(Xn);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function Qn() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $n() {
	return this.each(Qn);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function er(e) {
	var t = typeof e == "function" ? e : Ot(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function tr() {
	return null;
}
function nr(e, t) {
	var n = typeof e == "function" ? e : Ot(e), r = t == null ? tr : typeof t == "function" ? t : At(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function rr() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function ir() {
	return this.each(rr);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function ar() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function or() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function sr(e) {
	return this.select(e ? or : ar);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function cr(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function lr(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function ur(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function dr(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function fr(e, t, n) {
	return function() {
		var r = this.__on, i, a = lr(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function pr(e, t, n) {
	var r = ur(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? fr : dr, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function mr(e, t, n) {
	var r = Cn(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function hr(e, t) {
	return function() {
		return mr(this, e, t);
	};
}
function gr(e, t) {
	return function() {
		return mr(this, e, t.apply(this, arguments));
	};
}
function _r(e, t) {
	return this.each((typeof t == "function" ? gr : hr)(e, t));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* vr() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var yr = [null];
function br(e, t) {
	this._groups = e, this._parents = t;
}
function xr() {
	return new br([[document.documentElement]], yr);
}
function Sr() {
	return this;
}
br.prototype = xr.prototype = {
	constructor: br,
	select: jt,
	selectAll: It,
	selectChild: Ht,
	selectChildren: Kt,
	filter: qt,
	data: tn,
	enter: Yt,
	exit: rn,
	join: an,
	merge: on,
	selection: Sr,
	order: sn,
	sort: cn,
	call: un,
	nodes: dn,
	node: fn,
	size: pn,
	empty: mn,
	each: hn,
	attr: Sn,
	style: Dn,
	property: Mn,
	classed: Vn,
	text: Gn,
	html: Yn,
	raise: Zn,
	lower: $n,
	append: er,
	insert: nr,
	remove: ir,
	clone: sr,
	datum: cr,
	on: pr,
	dispatch: _r,
	[Symbol.iterator]: vr
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function Cr(e) {
	return typeof e == "string" ? new br([[document.querySelector(e)]], [document.documentElement]) : new br([[e]], yr);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
function wr(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
function Tr(e, t) {
	if (e = wr(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
var Er = { passive: !1 }, Dr = {
	capture: !0,
	passive: !1
};
function Or(e) {
	e.stopImmediatePropagation();
}
function kr(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
function Ar(e) {
	var t = e.document.documentElement, n = Cr(e).on("dragstart.drag", kr, Dr);
	"onselectstart" in t ? n.on("selectstart.drag", kr, Dr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function jr(e, t) {
	var n = e.document.documentElement, r = Cr(e).on("dragstart.drag", null);
	t && (r.on("click.drag", kr, Dr), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
var Mr = (e) => () => e;
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function Nr(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
Nr.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js
function Pr(e) {
	return !e.ctrlKey && !e.button;
}
function Fr() {
	return this.parentNode;
}
function Ir(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function Lr() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Rr() {
	var e = Pr, t = Fr, n = Ir, r = Lr, i = {}, a = yt("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, Er).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!u && e.call(this, n, r)) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (Cr(n.view).on("mousemove.drag", m, Dr).on("mouseup.drag", h, Dr), Ar(n.view), Or(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (kr(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		Cr(e.view).on("mousemove.drag mouseup.drag", null), jr(e.view, l), kr(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) for (var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s = 0, c; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Or(n), c("start", n, i[s]));
	}
	function _(e) {
		for (var t = e.changedTouches, n = t.length, r = 0, a; r < n; ++r) (a = i[t[r].identifier]) && (kr(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Or(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = Tr(l || r, t), p, m, h;
		if ((h = n.call(e, new Nr("beforestart", {
			sourceEvent: r,
			target: f,
			identifier: c,
			active: o,
			x: d[0],
			y: d[1],
			dx: 0,
			dy: 0,
			dispatch: u
		}), s)) != null) return p = h.x - d[0] || 0, m = h.y - d[1] || 0, function n(r, a, l) {
			var g = d, _;
			switch (r) {
				case "start":
					i[c] = n, _ = o++;
					break;
				case "end": delete i[c], --o;
				case "drag": d = Tr(l || a, t), _ = o;
			}
			u.call(r, e, new Nr(r, {
				sourceEvent: a,
				subject: h,
				target: f,
				identifier: c,
				active: _,
				x: d[0] + p,
				y: d[1] + m,
				dx: d[0] - g[0],
				dy: d[1] - g[1],
				dispatch: u
			}), s);
		};
	}
	return f.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Mr(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Mr(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Mr(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Mr(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function zr(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Br(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Vr() {}
var Hr = .7, Ur = 1 / Hr, Wr = "\\s*([+-]?\\d+)\\s*", Gr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Kr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qr = /^#([0-9a-f]{3,8})$/, Jr = RegExp(`^rgb\\(${Wr},${Wr},${Wr}\\)$`), Yr = RegExp(`^rgb\\(${Kr},${Kr},${Kr}\\)$`), Xr = RegExp(`^rgba\\(${Wr},${Wr},${Wr},${Gr}\\)$`), Zr = RegExp(`^rgba\\(${Kr},${Kr},${Kr},${Gr}\\)$`), Qr = RegExp(`^hsl\\(${Gr},${Kr},${Kr}\\)$`), $r = RegExp(`^hsla\\(${Gr},${Kr},${Kr},${Gr}\\)$`), ei = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
zr(Vr, ai, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: ti,
	formatHex: ti,
	formatHex8: ni,
	formatHsl: ri,
	formatRgb: ii,
	toString: ii
});
function ti() {
	return this.rgb().formatHex();
}
function ni() {
	return this.rgb().formatHex8();
}
function ri() {
	return _i(this).formatHsl();
}
function ii() {
	return this.rgb().formatRgb();
}
function ai(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = qr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? oi(t) : n === 3 ? new E(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? si(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? si(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Jr.exec(e)) ? new E(t[1], t[2], t[3], 1) : (t = Yr.exec(e)) ? new E(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Xr.exec(e)) ? si(t[1], t[2], t[3], t[4]) : (t = Zr.exec(e)) ? si(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Qr.exec(e)) ? gi(t[1], t[2] / 100, t[3] / 100, 1) : (t = $r.exec(e)) ? gi(t[1], t[2] / 100, t[3] / 100, t[4]) : ei.hasOwnProperty(e) ? oi(ei[e]) : e === "transparent" ? new E(NaN, NaN, NaN, 0) : null;
}
function oi(e) {
	return new E(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function si(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new E(e, t, n, r);
}
function ci(e) {
	return e instanceof Vr || (e = ai(e)), e ? (e = e.rgb(), new E(e.r, e.g, e.b, e.opacity)) : new E();
}
function li(e, t, n, r) {
	return arguments.length === 1 ? ci(e) : new E(e, t, n, r ?? 1);
}
function E(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
zr(E, li, Br(Vr, {
	brighter(e) {
		return e = e == null ? Ur : Ur ** +e, new E(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Hr : Hr ** +e, new E(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new E(mi(this.r), mi(this.g), mi(this.b), pi(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: ui,
	formatHex: ui,
	formatHex8: di,
	formatRgb: fi,
	toString: fi
}));
function ui() {
	return `#${hi(this.r)}${hi(this.g)}${hi(this.b)}`;
}
function di() {
	return `#${hi(this.r)}${hi(this.g)}${hi(this.b)}${hi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function fi() {
	let e = pi(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${mi(this.r)}, ${mi(this.g)}, ${mi(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function pi(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function mi(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function hi(e) {
	return e = mi(e), (e < 16 ? "0" : "") + e.toString(16);
}
function gi(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new yi(e, t, n, r);
}
function _i(e) {
	if (e instanceof yi) return new yi(e.h, e.s, e.l, e.opacity);
	if (e instanceof Vr || (e = ai(e)), !e) return new yi();
	if (e instanceof yi) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new yi(o, s, c, e.opacity);
}
function vi(e, t, n, r) {
	return arguments.length === 1 ? _i(e) : new yi(e, t, n, r ?? 1);
}
function yi(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
zr(yi, vi, Br(Vr, {
	brighter(e) {
		return e = e == null ? Ur : Ur ** +e, new yi(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Hr : Hr ** +e, new yi(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new E(Si(e >= 240 ? e - 240 : e + 120, i, r), Si(e, i, r), Si(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new yi(bi(this.h), xi(this.s), xi(this.l), pi(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = pi(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${bi(this.h)}, ${xi(this.s) * 100}%, ${xi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function bi(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function xi(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function Si(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var Ci = (e) => () => e;
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function wi(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Ti(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Ei(e) {
	return (e = +e) == 1 ? Di : function(t, n) {
		return n - t ? Ti(t, n, e) : Ci(isNaN(t) ? n : t);
	};
}
function Di(e, t) {
	var n = t - e;
	return n ? wi(e, n) : Ci(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var Oi = (function e(t) {
	var n = Ei(t);
	function r(e, t) {
		var r = n((e = li(e)).r, (t = li(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Di(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function ki(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var Ai = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ji = new RegExp(Ai.source, "g");
function Mi(e) {
	return function() {
		return e;
	};
}
function Ni(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Pi(e, t) {
	var n = Ai.lastIndex = ji.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Ai.exec(e)) && (i = ji.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: ki(r, i)
	})), n = ji.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Ni(c[0].x) : Mi(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var Fi = 180 / Math.PI, Ii = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Li(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Fi,
		skewX: Math.atan(c) * Fi,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var Ri;
function zi(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Ii : Li(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Bi(e) {
	return e == null || (Ri ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Ri.setAttribute("transform", e), !(e = Ri.transform.baseVal.consolidate())) ? Ii : (e = e.matrix, Li(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function Vi(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: ki(e, i)
			}, {
				i: c - 2,
				x: ki(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: ki(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: ki(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: ki(e, n)
			}, {
				i: s - 2,
				x: ki(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var Hi = Vi(zi, "px, ", "px)", "deg)"), Ui = Vi(Bi, ", ", ")", ")"), Wi = 0, Gi = 0, Ki = 0, qi = 1e3, Ji, Yi, Xi = 0, Zi = 0, Qi = 0, $i = typeof performance == "object" && performance.now ? performance : Date, ea = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function ta() {
	return Zi ||= (ea(na), $i.now() + Qi);
}
function na() {
	Zi = 0;
}
function ra() {
	this._call = this._time = this._next = null;
}
ra.prototype = ia.prototype = {
	constructor: ra,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? ta() : +n) + (t == null ? 0 : +t), !this._next && Yi !== this && (Yi ? Yi._next = this : Ji = this, Yi = this), this._call = e, this._time = n, la();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, la());
	}
};
function ia(e, t, n) {
	var r = new ra();
	return r.restart(e, t, n), r;
}
function aa() {
	ta(), ++Wi;
	for (var e = Ji, t; e;) (t = Zi - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--Wi;
}
function oa() {
	Zi = (Xi = $i.now()) + Qi, Wi = Gi = 0;
	try {
		aa();
	} finally {
		Wi = 0, ca(), Zi = 0;
	}
}
function sa() {
	var e = $i.now(), t = e - Xi;
	t > qi && (Qi -= t, Xi = e);
}
function ca() {
	for (var e, t = Ji, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Ji = n);
	Yi = e, la(r);
}
function la(e) {
	Wi || (Gi &&= clearTimeout(Gi), e - Zi > 24 ? (e < Infinity && (Gi = setTimeout(oa, e - $i.now() - Qi)), Ki &&= clearInterval(Ki)) : (Ki ||= (Xi = $i.now(), setInterval(sa, qi)), Wi = 1, ea(oa)));
}
//#endregion
//#region node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function ua(e, t, n) {
	var r = new ra();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var da = yt("start", "end", "cancel", "interrupt"), fa = [];
function pa(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	_a(e, n, {
		name: t,
		index: r,
		group: i,
		on: da,
		tween: fa,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function ma(e, t) {
	var n = ga(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function ha(e, t) {
	var n = ga(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function ga(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function _a(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = ia(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return ua(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (ua(function() {
			n.state === 3 && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), n.state === 2) {
			for (n.state = 3, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = 5, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === 5 && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = 6, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function va(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) {
			if ((r = n[o]).name !== t) {
				a = !1;
				continue;
			}
			i = r.state > 2 && r.state < 5, r.state = 6, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
		}
		a && delete e.__transition;
	}
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function ya(e) {
	return this.each(function() {
		va(this, e);
	});
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function ba(e, t) {
	var n, r;
	return function() {
		var i = ha(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function xa(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = ha(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function Sa(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = ga(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? ba : xa)(n, e, t));
}
function Ca(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = ha(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return ga(e, r).value[t];
	};
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function wa(e, t) {
	var n;
	return (typeof t == "number" ? ki : t instanceof ai ? Oi : (n = ai(t)) ? (t = n, Oi) : Pi)(e, t);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function Ta(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Ea(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Da(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Oa(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function ka(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Aa(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function ja(e, t) {
	var n = Tt(e), r = n === "transform" ? Ui : wa;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Aa : ka)(n, r, Ca(this, "attr." + e, t)) : t == null ? (n.local ? Ea : Ta)(n) : (n.local ? Oa : Da)(n, r, t));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function Ma(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Na(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Pa(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Na(e, i)), n;
	}
	return i._value = t, i;
}
function Fa(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Ma(e, i)), n;
	}
	return i._value = t, i;
}
function Ia(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = Tt(e);
	return this.tween(n, (r.local ? Pa : Fa)(r, t));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function La(e, t) {
	return function() {
		ma(this, e).delay = +t.apply(this, arguments);
	};
}
function Ra(e, t) {
	return t = +t, function() {
		ma(this, e).delay = t;
	};
}
function za(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? La : Ra)(t, e)) : ga(this.node(), t).delay;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function Ba(e, t) {
	return function() {
		ha(this, e).duration = +t.apply(this, arguments);
	};
}
function Va(e, t) {
	return t = +t, function() {
		ha(this, e).duration = t;
	};
}
function Ha(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Ba : Va)(t, e)) : ga(this.node(), t).duration;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function Ua(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		ha(this, e).ease = t;
	};
}
function Wa(e) {
	var t = this._id;
	return arguments.length ? this.each(Ua(t, e)) : ga(this.node(), t).ease;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function Ga(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		ha(this, e).ease = n;
	};
}
function Ka(e) {
	if (typeof e != "function") throw Error();
	return this.each(Ga(this._id, e));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function qa(e) {
	typeof e != "function" && (e = Lt(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Co(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function Ja(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new Co(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function Ya(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function Xa(e, t, n) {
	var r, i, a = Ya(t) ? ma : ha;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function Za(e, t) {
	var n = this._id;
	return arguments.length < 2 ? ga(this.node(), n).on.on(e) : this.each(Xa(n, e, t));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function Qa(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function $a() {
	return this.on("end.remove", Qa(this._id));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function eo(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = At(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, pa(l[f], t, n, f, l, ga(u, n)));
	return new Co(a, this._parents, t, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function to(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Pt(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = ga(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && pa(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new Co(a, o, t, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var no = xr.prototype.constructor;
function ro() {
	return new no(this._groups, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function io(e, t) {
	var n, r, i;
	return function() {
		var a = On(this, e), o = (this.style.removeProperty(e), On(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function ao(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function oo(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = On(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function so(e, t, n) {
	var r, i, a;
	return function() {
		var o = On(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), On(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function co(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = ha(this, e), l = c.on, u = c.value[a] == null ? s ||= ao(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function lo(e, t, n) {
	var r = (e += "") == "transform" ? Hi : wa;
	return t == null ? this.styleTween(e, io(e, r)).on("end.style." + e, ao(e)) : typeof t == "function" ? this.styleTween(e, so(e, r, Ca(this, "style." + e, t))).each(co(this._id, e)) : this.styleTween(e, oo(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function uo(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function fo(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && uo(e, a, n)), r;
	}
	return a._value = t, a;
}
function po(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, fo(e, t, n ?? ""));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function mo(e) {
	return function() {
		this.textContent = e;
	};
}
function ho(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function go(e) {
	return this.tween("text", typeof e == "function" ? ho(Ca(this, "text", e)) : mo(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function _o(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function vo(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && _o(r)), t;
	}
	return r._value = e, r;
}
function yo(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, vo(e));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function bo() {
	for (var e = this._name, t = this._id, n = wo(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = ga(c, t);
		pa(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new Co(r, this._parents, e, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function xo() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = ha(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var So = 0;
function Co(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function wo() {
	return ++So;
}
var To = xr.prototype;
Co.prototype = {
	constructor: Co,
	select: eo,
	selectAll: to,
	selectChild: To.selectChild,
	selectChildren: To.selectChildren,
	filter: qa,
	merge: Ja,
	selection: ro,
	transition: bo,
	call: To.call,
	nodes: To.nodes,
	node: To.node,
	size: To.size,
	empty: To.empty,
	each: To.each,
	on: Za,
	attr: ja,
	attrTween: Ia,
	style: lo,
	styleTween: po,
	text: go,
	textTween: yo,
	remove: $a,
	tween: Sa,
	delay: za,
	duration: Ha,
	ease: Wa,
	easeVarying: Ka,
	end: xo,
	[Symbol.iterator]: To[Symbol.iterator]
};
//#endregion
//#region node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function Eo(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var Do = {
	time: null,
	delay: 0,
	duration: 250,
	ease: Eo
};
function Oo(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function ko(e) {
	var t, n;
	e instanceof Co ? (t = e._id, e = e._name) : (t = wo(), (n = Do).time = ta(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && pa(c, e, t, l, o, n || Oo(c, t));
	return new Co(r, this._parents, e, t);
}
xr.prototype.interrupt = ya, xr.prototype.transition = ko;
//#endregion
//#region node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js
var { abs: Ao, max: jo, min: Mo } = Math;
["w", "e"].map(No), ["n", "s"].map(No), [
	"n",
	"w",
	"e",
	"s",
	"nw",
	"ne",
	"sw",
	"se"
].map(No);
function No(e) {
	return { type: e };
}
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Po(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Po.prototype = {
	constructor: Po,
	scale: function(e) {
		return e === 1 ? this : new Po(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Po(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var Fo = new Po(1, 0, 0);
Io.prototype = Po.prototype;
function Io(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return Fo;
	return e.__zoom;
}
//#endregion
//#region libs/core/src/lib/compute/styles.const.ts
var Lo = "ghent-cdh-annotation", Ro = {
	text: `annotated-text ${Lo}-text`,
	svg: `${Lo}-svg`,
	wrapper: `${Lo}-wrapper`,
	line: {
		wrapper: "",
		text: { wrapper: "content" },
		gutter: { wrapper: "gutter text" }
	}
}, zo = (0, w.default)((e, t) => e / t || 1), Bo = (0, w.default)((e, t, n, r, i) => ({
	width: Ho(e, i),
	height: Ho(t, i),
	x: Ho(n, i),
	y: Ho(r, i)
})), Vo = (e) => {
	let t = Wo(e), n = zo(t.width, e.offsetWidth), r = {
		width: e.offsetWidth,
		height: e.offsetHeight,
		x: t.x,
		y: t.y
	};
	return {
		original: r,
		scaled: Bo(r.width, r.height, r.x, r.y, n),
		scale: n
	};
}, Ho = (0, w.default)((e, t) => e / t), Uo = (0, w.default)((e, t, n) => (t - e) / n), Wo = (e) => {
	let t = e.getBoundingClientRect(), n = getComputedStyle(e), r = parseFloat(n.lineHeight), i = isNaN(r) ? t.height : r;
	return {
		x: t.x,
		y: t.y,
		width: t.width,
		height: i
	};
}, Go = (e, t) => {
	let n = e.original;
	return {
		x: Uo(n.x, t.x, e.scale),
		y: Uo(n.y, t.y, e.scale),
		height: Ho(t.height, e.scale),
		width: Ho(t.width, e.scale)
	};
}, Ko = "dummy-uid", D = {
	ANNOTATION_UID: "data-annotation-uid",
	ANNOTATION_ROLE: "data-annotation-role",
	LINE_UID: "data-line-uid"
}, qo = {
	BORDER: "border",
	FILL: "fill",
	HANDLE: "handle",
	ANNOTATIONS: "annotations",
	TAG: "tag"
}, Jo = class {
	createTextElement() {
		return document ? (this.textElement = document?.createElement("div"), this) : (T.debug("drawText", "no document available, cannot draw text"), this);
	}
	createModel() {
		let e = this.getTextElementDimensions(), t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		return this.svg = Cr(t).attr("class", Ro.svg).attr("width", e.original.width).attr("height", e.original.height), this.annotations = this.svg.append("g").attr(D.ANNOTATION_ROLE, qo.ANNOTATIONS), this.tagSvg = this.svg.append("g").attr(D.ANNOTATION_ROLE, qo.TAG), this.handles = this.svg.append("g").attr(D.ANNOTATION_ROLE, qo.HANDLE), this;
	}
	getTextElementDimensions() {
		return Vo(this.textElement);
	}
	findTags(e) {
		return this.findRelatedAnnotations(e, `[${D.ANNOTATION_ROLE}="${qo.TAG}"]`);
	}
	findRelatedAnnotations(e, t = "") {
		let n = this.svg.selectAll(`[data-annotation-uid="${e}"]${t}`);
		return n.empty() ? null : n;
	}
	findFills(e) {
		return this.findRelatedAnnotations(e, `[${D.ANNOTATION_ROLE}="${qo.FILL}"]`);
	}
	findBorders(e) {
		return this.findRelatedAnnotations(e, `[${D.ANNOTATION_ROLE}="${qo.BORDER}"]`);
	}
	setClass(e, t) {
		this.findFills(e)?.attr("class", t), this.findBorders(e)?.attr("class", t);
	}
	node() {
		return this.svg.node();
	}
}, Yo = class {
	constructor() {
		this.eventMap = /* @__PURE__ */ new Map(), this.block = !1;
	}
	on(e, t) {
		return this.eventMap.has(e) || this.eventMap.set(e, []), this.eventMap.get(e)?.push(t), this;
	}
	get isBlocking() {
		return this.block;
	}
	blockEvents(e) {
		T.debug("InternalEventListener", `Events  "blocked": ${e}`), this.block = !0;
	}
	unBlockEvents(e) {
		T.debug("InternalEventListener", `Events "unblocked": ${e}`), this.block = !1;
	}
	sendEvent(e, t, n) {
		let r = this.eventMap.get(e) ?? [];
		for (let i of r) i && i({
			event: e,
			mouseEvent: n,
			data: t
		});
	}
};
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function Xo(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Zo(e, t = "|") {
	return e.map((e) => Cs(e)).join(t);
}
function Qo(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var $o = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function es(e) {
	return new $o(e);
}
function ts(e) {
	return e == null;
}
function ns(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function rs(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var is = /* @__PURE__*/ Symbol("evaluating");
function as(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== is) return r === void 0 && (r = is, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function os(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function ss(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function cs(e) {
	return ss(e._zod.def) ?? e._zod.def.shape;
}
function ls(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return os(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function us(e, t, n) {
	t in e ? os(e, t, n) : e[t] = n;
}
function ds(e, t, n, r) {
	let i = cs(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? ls(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : us(e, a, r ? r(n.value, a) : n.value));
	}
}
function fs(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? ls(e, n, () => t[n]) : us(e, n, r.value));
	}
}
function O(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ps(e) {
	return JSON.stringify(e);
}
function ms(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var hs = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function gs(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var _s = /* @__PURE__*/ es(() => {
	if (dc.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function vs(e) {
	if (gs(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return gs(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ys(e) {
	return vs(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var bs = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function xs(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ss(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function k(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function Cs(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function ws(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
var Ts = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, Es = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function Ds(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return ds(i, e, Os(e, t)), Ss(e, O(n, {
		shape: i,
		checks: []
	}));
}
function Os(e, t) {
	let n = cs(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function ks(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(Os(e, t)), a = {};
	return ds(a, e, Reflect.ownKeys(cs(e)).filter((e) => !i.has(e))), Ss(e, O(n, {
		shape: a,
		checks: []
	}));
}
function As(e, t) {
	if (!vs(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = cs(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Ss(e, O(e._zod.def, { shape: js(e, t) }));
}
function js(e, t) {
	let n = {};
	return ds(n, e, Reflect.ownKeys(cs(e))), fs(n, t), n;
}
function Ms(e, t) {
	if (!vs(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return Ss(e, O(e._zod.def, { shape: js(e, t) }));
}
function Ns(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return ds(n, e, Reflect.ownKeys(cs(e))), ds(n, t, Reflect.ownKeys(cs(t))), Ss(e, O(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function Ps(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(Os(t, n)) : void 0, o = {};
	return ds(o, t, Reflect.ownKeys(cs(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), Ss(t, O(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function Fs(e, t, n) {
	let r = n ? new Set(Os(t, n)) : void 0, i = {};
	return ds(i, t, Reflect.ownKeys(cs(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), Ss(t, O(t._zod.def, { shape: i }));
}
function Is(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Ls(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Rs(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function zs(e) {
	return typeof e == "string" ? e : e?.message;
}
function Bs(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Vs(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : zs(e.inst?._zod.def?.error?.(e)) ?? zs(a?.(e)) ?? zs(t?.error?.(e)) ?? zs(n.customError?.(e)) ?? zs(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Hs = /[\uD800-\uDBFF]/;
function Us(e) {
	let t = e.length;
	if (!Hs.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Ws(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Gs(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function Ks(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function qs(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Zs(e, n, r.value);
	}
}
function Js(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Ys(e, t, n) {
	return Js(e, t, n, !1);
}
function Xs(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return Js(this, n, r(this));
			},
			set(e) {
				Js(this, n, e);
			}
		});
	}
	return t;
}
function Zs(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Js(this, t, n.bind(this));
		},
		set(e) {
			Js(this, t, e);
		}
	});
}
function Qs(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var $s, ec = !1, tc = {
	configurable: !0,
	get() {
		ec = !0;
	}
};
function A(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && $s !== e._zod) {
		$s = void 0;
		return;
	}
	$s = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, tc);
			let e = ec;
			ec = !1;
			try {
				let r = n(this);
				return ec ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), ec ||= e, r;
			} catch (n) {
				throw delete this[t], ec ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function nc(e, t, n, r) {
	let i = Qs(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
var rc = "~constantCatch";
function ic(e) {
	let t = () => e;
	return t[rc] = !0, t;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var ac, oc = {
	value: void 0,
	enumerable: !1
}, sc = "captureStackTrace" in Error ? Error : null;
function cc(e) {
	let t = sc;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return sc = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function j(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			oc.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", oc);
			} finally {
				oc.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), qs(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? cc(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var lc = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, uc = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(ac = globalThis).__zod_globalConfig ?? (ac.__zod_globalConfig = {});
var dc = globalThis.__zod_globalConfig;
function fc(e) {
	return e && Object.assign(dc, e), dc;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function pc() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Qo, 2), e.message;
}
function mc(e) {
	this._zod.message = e;
}
var hc = {
	get: pc,
	set: mc,
	enumerable: !0,
	configurable: !0
}, gc = {
	value: void 0,
	enumerable: !1
}, _c = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), vc = (e, t) => {
	e.name = "$ZodError", gc.value = t, Object.defineProperty(e, "issues", gc), gc.value = void 0, Object.defineProperty(e, "message", hc);
	let n = Object.getPrototypeOf(e);
	_c.has(n) || (_c.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, yc = j("$ZodError", vc);
j("$ZodError", vc, void 0, { Parent: Error });
function bc(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function xc(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? bc(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Sc(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function Cc(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var wc = (e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new lc();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Vs(e, o, fc())));
			throw hs(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, Tc = (e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Vs(e, o, fc())));
			throw hs(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, Ec = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new lc();
	return a.issues.length ? Dc(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
};
function Dc(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Vs(e, n, fc()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Oc = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Dc(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, kc = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), Ac = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), jc = ((e, t, n) => {
	let r = e._zod.bag.validator;
	if (r !== void 0) {
		if (r(t) !== kc) return !0;
		if (r.definite === !0 && n === void 0) return !1;
	}
	return Mc(e, t, n);
});
function Mc(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[Ac] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new lc();
	return a.issues.length === 0;
}
var Nc = async (e, t, n) => {
	let r = n ? {
		...n,
		async: !0,
		abortEarly: !0
	} : {
		async: !0,
		abortEarly: !0
	}, i = e._zod.run({
		value: t,
		issues: []
	}, r);
	return i instanceof Promise && (i = await i), i.issues.length === 0;
}, Pc = (e) => {
	let t = wc(e), n = (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return t(e, r, o, Cc(n, a));
	};
	return n;
}, Fc = (e) => {
	let t = wc(e), n = (e, r, i, a) => t(e, r, i, Cc(n, a));
	return n;
}, Ic = (e) => {
	let t = Tc(e), n = async (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return await t(e, r, o, Cc(n, a));
	};
	return n;
}, Lc = (e) => {
	let t = Tc(e), n = async (e, r, i, a) => await t(e, r, i, Cc(n, a));
	return n;
}, Rc = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ec(e)(t, n, i);
}, zc = (e) => (t, n, r) => Ec(e)(t, n, r), Bc = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Oc(e)(t, n, i);
}, Vc = (e) => async (t, n, r) => Oc(e)(t, n, r), Hc = /^[cC][0-9a-z]{6,}$/, Uc = /^[0-9a-z]+$/, Wc = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Gc = /^[0-9a-vA-V]{20}$/, Kc = /^[A-Za-z0-9]{27}$/, qc = /^[a-zA-Z0-9_-]{21}$/;
function Jc(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var Yc = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Xc = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Zc = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Qc = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, $c = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function el() {
	return new RegExp($c, "u");
}
var tl = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, nl = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, rl = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, il = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, al = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ol = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, sl = /^https?$/, cl = /^\+[1-9]\d{6,14}$/, ll = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function ul(e) {
	return RegExp(`^${e}$`);
}
var dl = /*@__PURE__*/ ul(ll);
function fl(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function pl(e) {
	return RegExp(`^${fl(e)}$`);
}
function ml(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${fl({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${fl({ precision: e.precision })}` : n;
	return RegExp(`^${ll}T(?:${r})$`);
}
var hl = /^[\s\S]{0,}$/, gl = /^-?\d+$/, _l = /^-?\d+(?:\.\d+)?$/, vl = /^(?:true|false)$/i, yl = /^null$/i, bl = /^[^A-Z]*$/, xl = /^[^a-z]*$/, M = /*@__PURE__*/ j("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Sl = (e) => {
	let t = e.value;
	return !ts(t) && t.length !== void 0;
}, Cl = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, wl = /*@__PURE__*/ j("$ZodCheckLessThan", (e, t) => {
	M.init(e, t);
	let n = Cl[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: Cl[typeof r.value] ?? n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Tl = /*@__PURE__*/ j("$ZodCheckGreaterThan", (e, t) => {
	M.init(e, t);
	let n = Cl[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: Cl[typeof r.value] ?? n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), El = /*@__PURE__*/ j("$ZodCheckMultipleOf", (e, t) => {
	M.init(e, t), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : rs(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Dl = /*@__PURE__*/ j("$ZodCheckNumberFormat", (e, t) => {
	M.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Ts[t.format];
	e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), Ol = /*@__PURE__*/ j("$ZodCheckMaxLength", (e, t) => {
	var n;
	M.init(e, t), (n = e._zod.def).when ?? (n.when = Sl), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Us(r) : i) <= t.maximum) return;
		let a = Ws(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), kl = /*@__PURE__*/ j("$ZodCheckMinLength", (e, t) => {
	var n;
	M.init(e, t), (n = e._zod.def).when ?? (n.when = Sl), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Us(r) : i) >= t.minimum) return;
		let a = Ws(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Al = /*@__PURE__*/ j("$ZodCheckLengthEquals", (e, t) => {
	var n;
	M.init(e, t), (n = e._zod.def).when ?? (n.when = Sl), e._zod.check = (n) => {
		let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? Us(r) : i;
		if (a === t.length) return;
		let o = Ws(r), s = a > t.length;
		n.issues.push({
			origin: o,
			...s ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), jl = /*@__PURE__*/ j("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	M.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Ml = /*@__PURE__*/ j("$ZodCheckRegex", (e, t) => {
	jl.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Nl = /*@__PURE__*/ j("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= bl, jl.init(e, t);
}), Pl = /*@__PURE__*/ j("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= xl, jl.init(e, t);
}), Fl = /*@__PURE__*/ j("$ZodCheckIncludes", (e, t) => {
	M.init(e, t);
	let n = xs(t.includes);
	t.pattern = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Il = /*@__PURE__*/ j("$ZodCheckStartsWith", (e, t) => {
	M.init(e, t);
	let n = RegExp(`^${xs(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ll = /*@__PURE__*/ j("$ZodCheckEndsWith", (e, t) => {
	M.init(e, t);
	let n = RegExp(`.*${xs(t.suffix)}$`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Rl = /*@__PURE__*/ j("$ZodCheckOverwrite", (e, t) => {
	M.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), zl = class {
	constructor(e = [], t = {}) {
		this.content = [], this.indent = 0, this.args = e, this.closed = t;
	}
	indented(e) {
		this.indent += 1;
		try {
			e(this);
		} finally {
			--this.indent;
		}
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.content ?? [""];
		return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
	}
}, Bl = {
	major: 4,
	minor: 6,
	patch: 5
}, N = /*@__PURE__*/ j("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Bl;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Is(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Ls(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new lc();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Bs(t.issues, n, e), i ||= Is(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Bs(t.issues, n, e), i ||= Is(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Is(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new lc();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new lc();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return Ys(this, "~standard", Ul(this));
	},
	set "~standard"(e) {
		Js(this, "~standard", e);
	}
}), Vl = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Vs(e, t, fc())) } : { value: e.value };
async function Hl(e, t) {
	let n = { async: !0 };
	return Vl(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Ul(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Vl(r, n);
			} catch {}
			return Hl(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Wl = /*@__PURE__*/ j("$ZodString", (e, t) => {
	N.init(e, t), e._zod.pattern = t.pattern ?? hl, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), P = /*@__PURE__*/ j("$ZodStringFormat", (e, t) => {
	jl.init(e, t), Wl.init(e, t);
}), Gl = /*@__PURE__*/ j("$ZodGUID", (e, t) => {
	t.pattern ??= Xc, P.init(e, t);
}), Kl = /*@__PURE__*/ j("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= Zc(e);
	} else t.pattern ??= Zc();
	P.init(e, t);
}), ql = /*@__PURE__*/ j("$ZodEmail", (e, t) => {
	t.pattern ??= Qc, P.init(e, t);
});
function Jl(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function Yl(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? Jl(e) || 2 : Xl(e, t);
}
function Xl(e, t) {
	if (!t.normalize && t.protocol?.source === sl.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			let t = URL;
			if (typeof t.parse == "function") return t.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
var Zl = /[\t\n\r]/g;
function Ql(e) {
	return e.replace(Zl, "");
}
function $l(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function eu(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
var tu = /*@__PURE__*/ j("$ZodURL", (e, t) => {
	P.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = Yl(r, t);
			if (i === 1) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === 2) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === !0) {
				n.value = Ql(r);
				return;
			}
			t.hostname && !$l(i, t.hostname) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), t.protocol && !eu(i, t.protocol) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), n.value = t.normalize ? i.href : Ql(r);
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), nu = /*@__PURE__*/ j("$ZodEmoji", (e, t) => {
	t.pattern ??= el(), P.init(e, t);
}), ru = /*@__PURE__*/ j("$ZodNanoID", (e, t) => {
	if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
	t.pattern ??= t.length === void 0 ? qc : Jc(t.length), P.init(e, t);
}), iu = /*@__PURE__*/ j("$ZodCUID", (e, t) => {
	t.pattern ??= Hc, P.init(e, t);
}), au = /*@__PURE__*/ j("$ZodCUID2", (e, t) => {
	t.pattern ??= Uc, P.init(e, t);
}), ou = /*@__PURE__*/ j("$ZodULID", (e, t) => {
	t.pattern ??= Wc, P.init(e, t);
}), su = /*@__PURE__*/ j("$ZodXID", (e, t) => {
	t.pattern ??= Gc, P.init(e, t);
}), cu = /*@__PURE__*/ j("$ZodKSUID", (e, t) => {
	t.pattern ??= Kc, P.init(e, t);
}), lu = /*@__PURE__*/ j("$ZodISODateTime", (e, t) => {
	t.pattern ??= ml(t), P.init(e, t);
}), uu = /*@__PURE__*/ j("$ZodISODate", (e, t) => {
	t.pattern ??= dl, P.init(e, t);
}), du = /*@__PURE__*/ j("$ZodISOTime", (e, t) => {
	t.pattern ??= pl(t), P.init(e, t);
}), fu = /*@__PURE__*/ j("$ZodISODuration", (e, t) => {
	t.pattern ??= Yc, P.init(e, t);
}), pu = /*@__PURE__*/ j("$ZodIPv4", (e, t) => {
	t.pattern ??= tl, P.init(e, t);
}), mu = /^[0-9a-fA-F:.]+$/;
function hu(e) {
	return mu.test(e) ? Jl(`http://[${e}]`) : !1;
}
var gu = /*@__PURE__*/ j("$ZodIPv6", (e, t) => {
	t.pattern ??= nl, P.init(e, t), e._zod.check = (n) => {
		hu(n.value) || n.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _u = /*@__PURE__*/ j("$ZodCIDRv4", (e, t) => {
	t.pattern ??= rl, P.init(e, t);
});
function vu(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : hu(n);
}
var yu = /*@__PURE__*/ j("$ZodCIDRv6", (e, t) => {
	t.pattern ??= il, P.init(e, t), e._zod.check = (n) => {
		vu(n.value) || n.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function bu(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var xu = /^[0-9a-zA-Z+/]*={0,2}$/, Su = /*@__PURE__*/ j("$ZodBase64", (e, t) => {
	t.pattern ??= xu, P.init(e, t), e._zod.check = (n) => {
		bu(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Cu = /^[A-Za-z0-9_-]*$/;
function wu(e) {
	if (!Cu.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return bu(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var Tu = /*@__PURE__*/ j("$ZodBase64URL", (e, t) => {
	t.pattern ??= Cu, P.init(e, t), e._zod.check = (n) => {
		wu(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Eu = /*@__PURE__*/ j("$ZodE164", (e, t) => {
	t.pattern ??= cl, P.init(e, t);
});
function Du(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var Ou = /*@__PURE__*/ j("$ZodJWT", (e, t) => {
	P.init(e, t), e._zod.check = (n) => {
		Du(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), ku = /*@__PURE__*/ j("$ZodNumber", (e, t) => {
	N.init(e, t), e._zod.pattern = _l, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), Au = /*@__PURE__*/ j("$ZodNumberFormat", (e, t) => {
	Dl.init(e, t), ku.init(e, t);
}), ju = /*@__PURE__*/ j("$ZodBoolean", (e, t) => {
	N.init(e, t), e._zod.pattern = vl, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), Mu = /*@__PURE__*/ j("$ZodNull", (e, t) => {
	N.init(e, t), e._zod.pattern = yl, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), Nu = /*@__PURE__*/ j("$ZodAny", (e, t) => {
	N.init(e, t), e._zod.parse = (e) => e;
}), Pu = /*@__PURE__*/ j("$ZodUnknown", (e, t) => {
	N.init(e, t), e._zod.parse = (e) => e;
}), Fu = /*@__PURE__*/ j("$ZodNever", (e, t) => {
	N.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
}), Iu = /*@__PURE__*/ j("$ZodDate", (e, t) => {
	N.init(e, t), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = new Date(n.value);
		} catch {}
		let i = n.value, a = i instanceof Date;
		return a && !Number.isNaN(i.getTime()) || n.issues.push({
			expected: "date",
			code: "invalid_type",
			input: i,
			...a ? { received: "Invalid Date" } : {},
			inst: e
		}), n;
	};
});
function Lu(e, t, n) {
	e.issues.length && t.issues.push(...Rs(n, e.issues)), t.value[n] = e.value;
}
var Ru = /*@__PURE__*/ j("$ZodArray", (e, t) => {
	N.init(e, t);
	let n = dc.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => Lu(t, r, e)));
			else if (Lu(c, r, e), s && c.issues.length !== 0 && Is(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function zu(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Rs(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var Bu = [];
function Vu(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Bu, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = ws(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Hu(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Is(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => zu(e, n, i, t, d, f))) : zu(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Uu = /*@__PURE__*/ j("$ZodObject", (e, t) => {
	N.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = es(() => Vu(t));
	A(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || os(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = gs, o = t.catchall, s, c = dc.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ??= i.value;
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if (Is(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => zu(n, t, e, r, a, o))) : zu(s, t, e, r, a, o);
		}
		return o ? Hu(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
}), Wu = /*@__PURE__*/ j("$ZodObjectJIT", (e, t) => {
	Uu.init(e, t);
	let n = e._zod.parse, r = es(() => Vu(t)), i = dc.memoizer, a = (t) => {
		let n = r.value, a = n.symbolKeys, o = new zl(["payload", "ctx"], {
			shape: t,
			inst: e,
			memo: i,
			syms: a
		}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		o.write("const input = payload.value;");
		let l = Object.create(null), u = 0;
		for (let e of n.allKeys) l[e] = `key_${u++}`;
		o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
		for (let e of n.allKeys) {
			if (e === "__proto__") continue;
			let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : ps(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
			if (o.write(`const ${n} = ${s(r)};`), f && p) {
				let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
				o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
			} else f ? (o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
      `), d === "defaulted" ? o.write(`newResult[${r}] = ${n}.value;`) : o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
		}
		return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
	}, o, s = gs, c = !dc.jitless, l = c && _s.value, u = t.catchall, d;
	e._zod.parse = (i, f) => {
		d ??= r.value;
		let p = i.value;
		return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Hu([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), i);
	};
});
function Gu(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Is(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Vs(e, r, fc())))
	}), t);
}
var Ku = /*@__PURE__*/ j("$ZodUnion", (e, t) => {
	N.init(e, t), A(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), A(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), A(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), A(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => ns(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => Gu(t, r, e, i)) : Gu(o, r, e, i);
	};
}), qu = /*@__PURE__*/ j("$ZodIntersection", (e, t) => {
	N.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Yu(e, t, n)) : Yu(e, i, a);
	};
});
function Ju(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (vs(e) && vs(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Ju(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Ju(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Yu(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = Ju(t.value, n.value);
	if (!c.valid) {
		if (Is(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
var Xu = /*@__PURE__*/ j("$ZodRecord", (e, t) => {
	N.init(e, t);
	let n = dc.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!vs(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => Vs(e, i, fc())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...Rs(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...Rs(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && _l.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => Vs(e, i, fc())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...Rs(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...Rs(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), Zu = /*@__PURE__*/ j("$ZodEnum", (e, t) => {
	N.init(e, t);
	let n = Xo(t.entries), r = new Set(n);
	e._zod.values = r, A(e, "pattern", (e) => {
		let t = Xo(e.def.entries).filter((e) => bs.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => xs(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Qu = /*@__PURE__*/ j("$ZodLiteral", (e, t) => {
	N.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, A(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? xs(e) : e ? xs(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), $u = /*@__PURE__*/ j("$ZodTransform", (e, t) => {
	N.init(e, t), e._zod.optin = "optional", dc.memoizer?.guard(e), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new uc(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new lc();
		return n.value = i, n;
	};
});
function ed(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var td = /*@__PURE__*/ j("$ZodOptional", (e, t) => {
	N.init(e, t), A(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", A(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), A(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${ns(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => ed(e, t)) : ed(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), nd = /*@__PURE__*/ j("$ZodExactOptional", (e, t) => {
	td.init(e, t), A(e, "values", (e) => e.def.innerType._zod.values), A(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), rd = /*@__PURE__*/ j("$ZodNullable", (e, t) => {
	N.init(e, t), A(e, "optin", (e) => e.def.innerType._zod.optin), A(e, "optout", (e) => e.def.innerType._zod.optout), A(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${ns(t.source)}|null)$`) : void 0;
	}), A(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), id = /*@__PURE__*/ j("$ZodDefault", (e, t) => {
	N.init(e, t), e._zod.optin = "defaulted", A(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => ad(e, t)) : ad(r, t);
	};
});
function ad(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var od = /*@__PURE__*/ j("$ZodPrefault", (e, t) => {
	N.init(e, t), e._zod.optin = "defaulted", A(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), sd = /*@__PURE__*/ j("$ZodNonOptional", (e, t) => {
	N.init(e, t), A(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => cd(t, e)) : cd(i, e);
	};
});
function cd(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function ld(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => Vs(e, r, fc())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
var ud = /*@__PURE__*/ j("$ZodCatch", (e, t) => {
	N.init(e, t), A(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), A(e, "optout", (e) => e.def.innerType._zod.optout), A(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run({
			value: e.value,
			issues: []
		}, n);
		return r instanceof Promise ? r.then((r) => ld(e, r, t, n)) : ld(e, r, t, n);
	};
}), dd = /*@__PURE__*/ j("$ZodPipe", (e, t) => {
	N.init(e, t), A(e, "values", (e) => e.def.in._zod.values), A(e, "optin", (e) => e.def.in._zod.optin), A(e, "optout", (e) => e.def.out._zod.optout), A(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => fd(e, t.in, n)) : fd(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => fd(e, t.out, n)) : fd(r, t.out, n);
	};
});
function fd(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var pd = /*@__PURE__*/ j("$ZodReadonly", (e, t) => {
	N.init(e, t), A(e, "propValues", (e) => e.def.innerType._zod.propValues), A(e, "values", (e) => e.def.innerType._zod.values), A(e, "optin", (e) => e.def.innerType?._zod?.optin), A(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(md) : md(r);
	};
});
function md(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
var hd = /*@__PURE__*/ j("$ZodLazy", (e, t) => {
	N.init(e, t), as(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), A(e, "pattern", (e) => e.innerType?._zod?.pattern), A(e, "propValues", (e) => e.innerType?._zod?.propValues), A(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), A(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), gd = /*@__PURE__*/ j("$ZodCustom", (e, t) => {
	M.init(e, t), N.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => _d(t, n, r, e));
		_d(i, n, r, e);
	};
});
function _d(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Ks(e));
	}
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
var vd = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, yd = "~memo", bd = [];
function xd(e) {
	return typeof e == "object" && !!e;
}
function Sd(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var Cd = /*@__PURE__*/ new WeakMap(), wd = 0, Td = 1, Ed = 2;
function Dd(e, t, n) {
	let r = Cd.get(e);
	if (r !== void 0) return r ? Ed : wd;
	if (t.has(e)) return Ed;
	t.add(e);
	let i = wd, a = (e) => {
		if (i !== Ed && e?._zod) {
			let r = Dd(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = wd;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? Td : o.value?._zod ? Dd(o.value, t, n) : wd;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = ss(c);
			s(e ? o(e, !0) : Td), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? Dd(r, t, !1) : Td);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), Od(e, i);
}
function Od(e, t) {
	return t !== Td && Cd.set(e, t === Ed), t;
}
function kd(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var Ad, jd = [], Md = {
	alloc(e, t, n) {
		let r = Ad;
		if (!r) return n;
		Ad = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), jd.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && Pd(n, e.value)) throw new vd();
				return t(e, n);
			};
			e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
		});
	},
	attach(e) {
		var t;
		let n, r = !1, i, a;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, o = (s, c) => {
				if (n === void 0) {
					let i = Dd(e, /* @__PURE__ */ new Set(), !1);
					if (i === wd) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === Ed || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!xd(l)) return t(s, c);
				let u = c[yd];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[yd] = u);
				let d;
				i === c ? d = a : (d = kd(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...Sd(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				Ad = d;
				let p = jd.length, m = t(s, c);
				Ad = void 0;
				let h = jd.length > p ? jd.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? Sd(e.issues) : bd), e)) : (h && (h.issues = m.issues.length ? Sd(m.issues) : bd), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function Nd() {
	return Md;
}
function Pd(e, t) {
	let n = e[yd]?.backEdges;
	return n !== void 0 && xd(t) && n.has(t);
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var Fd = () => {
	let e = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, r = { nan: "NaN" };
	function i(e, t) {
		return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
	}
	return (e) => {
		switch (e.code) {
			case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(Gs(e.input), e.input)}`;
			case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${Cs(e.values[0])}` : `Invalid option: expected one of ${Zo(e.values, "|")}`;
			case "too_big": {
				let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
			}
			case "too_small": {
				let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case "invalid_format": {
				let t = e;
				return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Zo(e.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${e.origin}`;
			case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element": return `Invalid value in ${e.origin}`;
			default: return "Invalid input";
		}
	};
};
function Id() {
	return { localeError: Fd() };
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var Ld, Rd = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function zd() {
	return new Rd();
}
(Ld = globalThis).__zod_globalRegistry ?? (Ld.__zod_globalRegistry = zd());
var Bd = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function Vd(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Hd(e, t) {
	return new e(Vd({
		type: "string",
		...k(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Ud(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wd(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gd(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Kd(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qd(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jd(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yd(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xd(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zd(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qd(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $d(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ef(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tf(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nf(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rf(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function af(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function of(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sf(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cf(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lf(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function uf(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function df(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ff(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pf(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mf(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hf(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gf(e, t) {
	return new e(Vd({
		type: "number",
		checks: [],
		...k(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function _f(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vf(e, t) {
	return new e({
		type: "boolean",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yf(e, t) {
	return new e({
		type: "null",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function bf(e) {
	return new e({ type: "any" });
}
// @__NO_SIDE_EFFECTS__
function xf(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Sf(e, t) {
	return new e({
		type: "never",
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cf(e, t) {
	return new e({
		type: "date",
		coerce: !0,
		...k(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wf(e, t) {
	return new wl({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Tf(e, t) {
	return new wl({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Ef(e, t) {
	return new Tl({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Df(e, t) {
	return new Tl({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Of(e, t) {
	return new El({
		check: "multiple_of",
		...k(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function kf(e, t) {
	return new Ol({
		check: "max_length",
		...k(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Af(e, t) {
	return new kl({
		check: "min_length",
		...k(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function jf(e, t) {
	return new Al({
		check: "length_equals",
		...k(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Mf(e, t) {
	return new Ml({
		check: "string_format",
		format: "regex",
		...k(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Nf(e) {
	return new Nl({
		check: "string_format",
		format: "lowercase",
		...k(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Pf(e) {
	return new Pl({
		check: "string_format",
		format: "uppercase",
		...k(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Ff(e, t) {
	return new Fl({
		check: "string_format",
		format: "includes",
		...k(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function If(e, t) {
	return new Il({
		check: "string_format",
		format: "starts_with",
		...k(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Lf(e, t) {
	return new Ll({
		check: "string_format",
		format: "ends_with",
		...k(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Rf(e) {
	return new Rl({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function zf(e) {
	return /* @__PURE__ */ Rf((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Bf() {
	return /* @__PURE__ */ Rf((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Vf() {
	return /* @__PURE__ */ Rf((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Hf() {
	return /* @__PURE__ */ Rf((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Uf() {
	return /* @__PURE__ */ Rf((e) => ms(e));
}
// @__NO_SIDE_EFFECTS__
function Wf(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...k(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Gf(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...k(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Kf(e, t) {
	let n = /* @__PURE__ */ qf((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Ks(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Ks(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function qf(e, t) {
	let n = new M({
		check: "custom",
		...k(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function Jf(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && os(e, t, n[t]);
	return e;
}
function Yf(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Bd,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function Xf(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function F(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, F(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Jf(o.schema, c), t.io === "input" && I(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Zf(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Qf(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${Zf(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Zf(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		r.count > 1 && e.reused === "ref" && a(n);
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function $f(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		$f(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
var ep = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), tp = ["oneOf", "anyOf"];
function np(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function rp(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!ep.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? np(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			os(n, r, e.length === 1 ? e[0] : rp(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = np(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function ip(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of ep) if (t in e) return;
	let n = t.filter((e) => tp.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = rp(t);
	else {
		let e = n[0], i = tp.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => rp([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Jf(e, r));
}
function ap(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Jf(i, s), Jf(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) $f(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) ip(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Jf(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, os(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: sp(t, "input", e.processors),
					output: sp(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function I(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return I(r.element, n);
	if (r.type === "set") return I(r.valueType, n);
	if (r.type === "lazy") return I(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return I(r.innerType, n);
	if (r.type === "intersection") return I(r.left, n) || I(r.right, n);
	if (r.type === "record" || r.type === "map") return I(r.keyType, n) || I(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : I(r.in, n) || I(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (I(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (I(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (I(e, n)) return !0;
		return !!(r.rest && I(r.rest, n));
	}
	return !1;
}
var op = (e, t = {}) => (n) => {
	let r = Yf({
		...n,
		processors: t
	});
	return F(e, r), Qf(r, e), ap(r, e);
}, sp = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Yf({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return F(e, o), Qf(o, e), ap(o, e);
}, cp = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, lp = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, up = (e, t) => {
	cp(e, "minimum", t), lp(e, "maximum", t);
}, dp = (e, t) => {
	e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
}, fp = (e, t) => {
	e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
}, pp = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, mp = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, hp = (e, t) => cp(e, "minimum", t.minimum), gp = (e, t) => lp(e, "maximum", t.maximum), _p = (e) => (t, n) => {
	mp(t, n.format);
	let [r, i] = e[n.format];
	cp(t, "minimum", r), lp(t, "maximum", i);
}, vp = {
	greater_than: (e, t) => cp(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => lp(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => dp(e, t.value),
	number_format: _p(Ts),
	bigint_format: _p(Es),
	min_length: hp,
	max_length: gp,
	length_equals: (e, t) => up(e, t.length),
	min_size: hp,
	max_size: gp,
	size_equals: (e, t) => up(e, t.size),
	string_format: (e, t) => {
		mp(e, t.format), t.pattern && fp(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => pp(e, t.mime)
};
function L(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) vp[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && cp(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && cp(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && lp(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && lp(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && dp(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && pp(t, i.mime);
	for (let e of i.patterns ?? []) fp(t, e);
	return t;
}
var yp = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, bp = /* @__PURE__ */ new Map([[xu, al], [Cu, ol]]), xp = (e) => bp.get(e) ?? e, Sp = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = L(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = yp[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map(xp);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, Cp = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = L(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : Xf(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, wp = (e, t, n, r) => {
	n.type = "boolean";
}, Tp = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, Ep = (e, t, n, r) => {
	n.not = {};
}, Dp = (e, t, n, r) => {
	Xf(e, t, n, r, "Date cannot be represented in JSON Schema");
}, Op = (e, t, n, r) => {
	let i = e._zod.def, a = Xo(i.entries);
	if (a.length === 0) {
		n.not = {};
		return;
	}
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, kp = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (Xf(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (Xf(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, Ap = (e, t, n, r) => {
	Xf(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, jp = (e, t, n, r) => {
	Xf(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Mp = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = L(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = F(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function Np(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Np(t.out) : t.type === "catch" ? Np(t.innerType) : e._zod.optin;
}
var Pp = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && Xf(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) os(i.properties, e, F(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	}));
	let s = [];
	for (let e of Object.keys(o)) {
		let n = a.shape[e];
		(t.io === "input" ? Np(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = F(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Fp = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => F(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Ip = (e, t, n, r) => {
	let i = e._zod.def, a = F(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = F(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
};
function Lp(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Lp(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Lp(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? _l : gl).source), p) : p;
}
var Rp = /* @__PURE__ */ new WeakMap();
function zp(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Rp.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Lp(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var Bp = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = L(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = F(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) os(i.patternProperties, xp(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = F(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = Rp.get(t);
			n || (n = [], Rp.set(t, n), t.deferred.push(() => zp(t))), n.push(e);
		}
		i.additionalProperties = F(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, l = t.io === "input" && Np(a.valueType) !== void 0;
	if (c && !a.partial && !l) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, Vp = (e, t, n, r) => {
	let i = e._zod.def, a = F(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Hp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Up = Symbol();
function Wp(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (Xf(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Up) : JSON.parse(o);
}
var Gp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = Wp(i.defaultValue, e, t, n, r);
	o !== Up && (n.default = o);
}, Kp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = Wp(i.defaultValue, e, t, n, r);
	o !== Up && (n._prefault = o);
}, qp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		Xf(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, Jp = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	F(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Yp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Xp = (e, t, n, r) => {
	let i = e._zod.def;
	F(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Zp = (e, t, n, r) => {
	let i = e._zod.innerType;
	F(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Qp = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function $p(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var em = /*@__PURE__*/ j("ZodError", (e, t) => {
	yc.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	Qp.has(n) || (Qp.add(n), $p(n, "format", (e) => (t) => Sc(e, t)), $p(n, "flatten", (e) => (t) => xc(e, t)), $p(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, Qo, 2);
	}), $p(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, Qo, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, void 0, { Parent: Error }), tm = /* @__PURE__ */ wc(em), nm = /* @__PURE__ */ Tc(em), rm = /* @__PURE__ */ Ec(em), im = /* @__PURE__ */ Oc(em), am = /* @__PURE__ */ Pc(em), om = /* @__PURE__ */ Fc(em), sm = /* @__PURE__ */ Ic(em), cm = /* @__PURE__ */ Lc(em), lm = /* @__PURE__ */ Rc(em), um = /* @__PURE__ */ zc(em), dm = /* @__PURE__ */ Bc(em), fm = /* @__PURE__ */ Vc(em);
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function pm() {
	dc.localeError || fc(Id());
}
function mm() {
	dc.memoizer || fc({ memoizer: Nd() });
}
var R = /*@__PURE__*/ j("ZodType", (e, t) => (pm(), N.init(e, t), e.def = t, e.type = t.type, e), {
	check(...e) {
		let t = this.def;
		return this.clone(O(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return Ss(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Nh(e, t));
	},
	superRefine(e, t) {
		return this.check(Ph(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ Rf(e));
	},
	optional() {
		return ph(this);
	},
	exactOptional() {
		return hh(this);
	},
	nullable() {
		return _h(this);
	},
	nullish() {
		return ph(_h(this));
	},
	nonoptional(e) {
		return Ch(this, e);
	},
	array() {
		return H(this);
	},
	or(e) {
		return W([this, e]);
	},
	and(e) {
		return ih(this, e);
	},
	transform(e) {
		return Dh(this, dh(e));
	},
	default(e) {
		return yh(this, e);
	},
	prefault(e) {
		return xh(this, e);
	},
	catch(e) {
		return Th(this, e);
	},
	pipe(e) {
		return Dh(this, e);
	},
	readonly() {
		return kh(this);
	},
	describe(e) {
		let t = this.clone();
		return Bd.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return Bd.get(this);
		let t = this.clone();
		return Bd.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	},
	get "~standard"() {
		return Ys(this, "~standard", {
			...Ul(this),
			jsonSchema: {
				input: sp(this, "input"),
				output: sp(this, "output")
			}
		});
	},
	set "~standard"(e) {
		Js(this, "~standard", e);
	},
	parse: function e(t, n) {
		return tm(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await nm(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return rm(this, e, t);
	},
	async safeParseAsync(e, t) {
		return im(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		Js(this, "spa", e);
	},
	validate(e, t) {
		return jc(this, e, t);
	},
	validateAsync(e, t) {
		return Nc(this, e, t);
	},
	encode: function e(t, n) {
		return am(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return om(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await sm(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await cm(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return lm(this, e, t);
	},
	safeDecode(e, t) {
		return um(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return dm(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return fm(this, e, t);
	},
	toJSONSchema(e) {
		return op(this, {})(e);
	},
	get description() {
		return Bd.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), hm = /*@__PURE__*/ j("_ZodString", (e, t) => {
	Wl.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Sp(e, t, n, r);
}, /*@__PURE__*/ Xs({
	format: (e) => L(e).format ?? null,
	minLength: (e) => L(e).minimum ?? null,
	maxLength: (e) => L(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(/* @__PURE__ */ Mf(...e));
	},
	includes(...e) {
		return this.check(/* @__PURE__ */ Ff(...e));
	},
	startsWith(...e) {
		return this.check(/* @__PURE__ */ If(...e));
	},
	endsWith(...e) {
		return this.check(/* @__PURE__ */ Lf(...e));
	},
	min(...e) {
		return this.check(/* @__PURE__ */ Af(...e));
	},
	max(...e) {
		return this.check(/* @__PURE__ */ kf(...e));
	},
	length(...e) {
		return this.check(/* @__PURE__ */ jf(...e));
	},
	nonempty(...e) {
		return this.check(/* @__PURE__ */ Af(1, ...e));
	},
	lowercase(e) {
		return this.check(/* @__PURE__ */ Nf(e));
	},
	uppercase(e) {
		return this.check(/* @__PURE__ */ Pf(e));
	},
	trim() {
		return this.check(/* @__PURE__ */ Bf());
	},
	normalize(...e) {
		return this.check(/* @__PURE__ */ zf(...e));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ Vf());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ Hf());
	},
	slugify() {
		return this.check(/* @__PURE__ */ Uf());
	}
})), gm = /*@__PURE__*/ j("ZodString", (e, t) => {
	Wl.init(e, t), hm.init(e, t);
}, {
	email(e) {
		return this.check(/* @__PURE__ */ Ud(xm, e));
	},
	url(e) {
		return this.check(/* @__PURE__ */ Yd(wm, e));
	},
	jwt(e) {
		return this.check(/* @__PURE__ */ df(zm, e));
	},
	emoji(e) {
		return this.check(/* @__PURE__ */ Xd(Tm, e));
	},
	guid(e) {
		return this.check(/* @__PURE__ */ Wd(Sm, e));
	},
	uuid(e) {
		return this.check(/* @__PURE__ */ Gd(Cm, e));
	},
	uuidv4(e) {
		return this.check(/* @__PURE__ */ Kd(Cm, e));
	},
	uuidv6(e) {
		return this.check(/* @__PURE__ */ qd(Cm, e));
	},
	uuidv7(e) {
		return this.check(/* @__PURE__ */ Jd(Cm, e));
	},
	nanoid(e) {
		return this.check(/* @__PURE__ */ Zd(Em, e));
	},
	cuid(e) {
		return this.check(/* @__PURE__ */ Qd(Dm, e));
	},
	cuid2(e) {
		return this.check(/* @__PURE__ */ $d(Om, e));
	},
	ulid(e) {
		return this.check(/* @__PURE__ */ ef(km, e));
	},
	base64(e) {
		return this.check(/* @__PURE__ */ cf(Im, e));
	},
	base64url(e) {
		return this.check(/* @__PURE__ */ lf(Lm, e));
	},
	xid(e) {
		return this.check(/* @__PURE__ */ tf(Am, e));
	},
	ksuid(e) {
		return this.check(/* @__PURE__ */ nf(jm, e));
	},
	ipv4(e) {
		return this.check(/* @__PURE__ */ rf(Mm, e));
	},
	ipv6(e) {
		return this.check(/* @__PURE__ */ af(Nm, e));
	},
	cidrv4(e) {
		return this.check(/* @__PURE__ */ of(Pm, e));
	},
	cidrv6(e) {
		return this.check(/* @__PURE__ */ sf(Fm, e));
	},
	e164(e) {
		return this.check(/* @__PURE__ */ uf(Rm, e));
	},
	datetime(e) {
		return this.check(/* @__PURE__ */ ff(_m, e));
	},
	date(e) {
		return this.check(/* @__PURE__ */ pf(vm, e));
	},
	time(e) {
		return this.check(/* @__PURE__ */ mf(ym, e));
	},
	duration(e) {
		return this.check(/* @__PURE__ */ hf(bm, e));
	}
});
function z(e) {
	return /* @__PURE__ */ Hd(gm, e);
}
var B = /*@__PURE__*/ j("ZodStringFormat", (e, t) => {
	P.init(e, t), hm.init(e, t);
}), _m = /*@__PURE__*/ j("ZodISODateTime", (e, t) => {
	lu.init(e, t), B.init(e, t);
}), vm = /*@__PURE__*/ j("ZodISODate", (e, t) => {
	uu.init(e, t), B.init(e, t);
}), ym = /*@__PURE__*/ j("ZodISOTime", (e, t) => {
	du.init(e, t), B.init(e, t);
}), bm = /*@__PURE__*/ j("ZodISODuration", (e, t) => {
	fu.init(e, t), B.init(e, t);
}), xm = /*@__PURE__*/ j("ZodEmail", (e, t) => {
	ql.init(e, t), B.init(e, t);
}), Sm = /*@__PURE__*/ j("ZodGUID", (e, t) => {
	Gl.init(e, t), B.init(e, t);
}), Cm = /*@__PURE__*/ j("ZodUUID", (e, t) => {
	Kl.init(e, t), B.init(e, t);
}), wm = /*@__PURE__*/ j("ZodURL", (e, t) => {
	tu.init(e, t), B.init(e, t);
}), Tm = /*@__PURE__*/ j("ZodEmoji", (e, t) => {
	nu.init(e, t), B.init(e, t);
}), Em = /*@__PURE__*/ j("ZodNanoID", (e, t) => {
	ru.init(e, t), B.init(e, t);
}), Dm = /*@__PURE__*/ j("ZodCUID", (e, t) => {
	iu.init(e, t), B.init(e, t);
}), Om = /*@__PURE__*/ j("ZodCUID2", (e, t) => {
	au.init(e, t), B.init(e, t);
}), km = /*@__PURE__*/ j("ZodULID", (e, t) => {
	ou.init(e, t), B.init(e, t);
}), Am = /*@__PURE__*/ j("ZodXID", (e, t) => {
	su.init(e, t), B.init(e, t);
}), jm = /*@__PURE__*/ j("ZodKSUID", (e, t) => {
	cu.init(e, t), B.init(e, t);
}), Mm = /*@__PURE__*/ j("ZodIPv4", (e, t) => {
	pu.init(e, t), B.init(e, t);
}), Nm = /*@__PURE__*/ j("ZodIPv6", (e, t) => {
	gu.init(e, t), B.init(e, t);
}), Pm = /*@__PURE__*/ j("ZodCIDRv4", (e, t) => {
	_u.init(e, t), B.init(e, t);
}), Fm = /*@__PURE__*/ j("ZodCIDRv6", (e, t) => {
	yu.init(e, t), B.init(e, t);
}), Im = /*@__PURE__*/ j("ZodBase64", (e, t) => {
	Su.init(e, t), B.init(e, t);
}), Lm = /*@__PURE__*/ j("ZodBase64URL", (e, t) => {
	Tu.init(e, t), B.init(e, t);
}), Rm = /*@__PURE__*/ j("ZodE164", (e, t) => {
	Eu.init(e, t), B.init(e, t);
}), zm = /*@__PURE__*/ j("ZodJWT", (e, t) => {
	Ou.init(e, t), B.init(e, t);
}), Bm = /*@__PURE__*/ j("ZodNumber", (e, t) => {
	ku.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cp(e, t, n, r), e.isFinite = !0;
}, /*@__PURE__*/ Xs({
	minValue: (e) => {
		let { minimum: t, exclusiveMinimum: n } = L(e);
		return Math.max(t ?? -Infinity, n ?? -Infinity);
	},
	maxValue: (e) => {
		let { maximum: t, exclusiveMaximum: n } = L(e);
		return Math.min(t ?? Infinity, n ?? Infinity);
	},
	isInt: (e) => {
		let { isInt: t, multipleOf: n } = L(e);
		return !!t || !!n?.some(Number.isSafeInteger);
	},
	format: (e) => L(e).format ?? null
}, {
	gt(e, t) {
		return this.check(/* @__PURE__ */ Ef(e, t));
	},
	gte(e, t) {
		return this.check(/* @__PURE__ */ Df(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ Df(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ wf(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ Tf(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ Tf(e, t));
	},
	int(e) {
		return this.check(Hm(e));
	},
	safe(e) {
		return this.check(Hm(e));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ Ef(0, e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ Df(0, e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ wf(0, e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ Tf(0, e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ Of(e, t));
	},
	step(e, t) {
		return this.check(/* @__PURE__ */ Of(e, t));
	},
	finite() {
		return this;
	}
}));
function V(e) {
	return /* @__PURE__ */ gf(Bm, e);
}
var Vm = /*@__PURE__*/ j("ZodNumberFormat", (e, t) => {
	Au.init(e, t), Bm.init(e, t);
});
function Hm(e) {
	return /* @__PURE__ */ _f(Vm, e);
}
var Um = /*@__PURE__*/ j("ZodBoolean", (e, t) => {
	ju.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => wp(e, t, n, r);
});
function Wm(e) {
	return /* @__PURE__ */ vf(Um, e);
}
var Gm = /*@__PURE__*/ j("ZodNull", (e, t) => {
	Mu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Tp(e, t, n, r);
});
function Km(e) {
	return /* @__PURE__ */ yf(Gm, e);
}
var qm = /*@__PURE__*/ j("ZodAny", (e, t) => {
	Nu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Jm() {
	return /* @__PURE__ */ bf(qm);
}
var Ym = /*@__PURE__*/ j("ZodUnknown", (e, t) => {
	Pu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Xm() {
	return /* @__PURE__ */ xf(Ym);
}
var Zm = /*@__PURE__*/ j("ZodNever", (e, t) => {
	Fu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ep(e, t, n, r);
});
function Qm(e) {
	return /* @__PURE__ */ Sf(Zm, e);
}
var $m = /*@__PURE__*/ j("ZodDate", (e, t) => {
	Iu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dp(e, t, n, r), e.min = (t, n) => e.check(/* @__PURE__ */ Df(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ Tf(t, n));
}, /*@__PURE__*/ Xs({
	minDate: (e) => {
		let { minimum: t } = L(e);
		return t ? new Date(t) : null;
	},
	maxDate: (e) => {
		let { maximum: t } = L(e);
		return t ? new Date(t) : null;
	}
}, {})), eh = /*@__PURE__*/ j("ZodArray", (e, t) => {
	mm(), Ru.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mp(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(/* @__PURE__ */ Af(e, t));
	},
	nonempty(e) {
		return this.check(/* @__PURE__ */ Af(1, e));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ kf(e, t));
	},
	length(e, t) {
		return this.check(/* @__PURE__ */ jf(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function H(e, t) {
	return /* @__PURE__ */ Wf(eh, e, t);
}
var th = /*@__PURE__*/ j("ZodObject", (e, t) => {
	mm(), Wu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pp(e, t, n, r), nc(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return ch(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(O(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(O(this._zod.def, { catchall: Xm() }));
	},
	loose() {
		return this.clone(O(this._zod.def, { catchall: Xm() }));
	},
	strict() {
		return this.clone(O(this._zod.def, { catchall: Qm() }));
	},
	strip() {
		return this.clone(O(this._zod.def, { catchall: void 0 }));
	},
	extend(e) {
		return As(this, e);
	},
	safeExtend(e) {
		return Ms(this, e);
	},
	merge(e) {
		return Ns(this, e);
	},
	pick(e) {
		return Ds(this, e);
	},
	omit(e) {
		return ks(this, e);
	},
	partial(...e) {
		return Ps(fh, this, e[0]);
	},
	exactPartial(...e) {
		return Ps(mh, this, e[0], "exactPartial");
	},
	required(...e) {
		return Fs(Sh, this, e[0]);
	}
});
function U(e, t) {
	return new th({
		type: "object",
		shape: e ?? {},
		...k(t)
	});
}
var nh = /*@__PURE__*/ j("ZodUnion", (e, t) => {
	Ku.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fp(e, t, n, r), e.options = t.options;
});
function W(e, t) {
	return new nh({
		type: "union",
		options: e,
		...k(t)
	});
}
var rh = /*@__PURE__*/ j("ZodIntersection", (e, t) => {
	qu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ip(e, t, n, r);
});
function ih(e, t) {
	return new rh({
		type: "intersection",
		left: e,
		right: t
	});
}
var ah = /*@__PURE__*/ j("ZodRecord", (e, t) => {
	mm(), Xu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bp(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function oh(e, t, n) {
	return !t || !t._zod ? new ah({
		type: "record",
		keyType: z(),
		valueType: e,
		...k(t)
	}) : new ah({
		type: "record",
		keyType: e,
		valueType: t,
		...k(n)
	});
}
var sh = /*@__PURE__*/ j("ZodEnum", (e, t) => {
	Zu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Op(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new sh({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new sh({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	};
});
function ch(e, t) {
	return new sh({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...k(t)
	});
}
var lh = /*@__PURE__*/ j("ZodLiteral", (e, t) => {
	Qu.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => kp(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function G(e, t) {
	return new lh({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...k(t)
	});
}
var uh = /*@__PURE__*/ j("ZodTransform", (e, t) => {
	mm(), $u.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => jp(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new uc(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Ks(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(Ks(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function dh(e) {
	return new uh({
		type: "transform",
		transform: e
	});
}
var fh = /*@__PURE__*/ j("ZodOptional", (e, t) => {
	td.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ph(e) {
	return new fh({
		type: "optional",
		innerType: e
	});
}
var mh = /*@__PURE__*/ j("ZodExactOptional", (e, t) => {
	nd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function hh(e) {
	return new mh({
		type: "optional",
		innerType: e
	});
}
var gh = /*@__PURE__*/ j("ZodNullable", (e, t) => {
	rd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function _h(e) {
	return new gh({
		type: "nullable",
		innerType: e
	});
}
var vh = /*@__PURE__*/ j("ZodDefault", (e, t) => {
	id.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gp(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function yh(e, t) {
	return new vh({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ys(t);
		}
	});
}
var bh = /*@__PURE__*/ j("ZodPrefault", (e, t) => {
	od.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function xh(e, t) {
	return new bh({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ys(t);
		}
	});
}
var Sh = /*@__PURE__*/ j("ZodNonOptional", (e, t) => {
	sd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ch(e, t) {
	return new Sh({
		type: "nonoptional",
		innerType: e,
		...k(t)
	});
}
var wh = /*@__PURE__*/ j("ZodCatch", (e, t) => {
	ud.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => qp(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Th(e, t) {
	return new wh({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : ic(t)
	});
}
var Eh = /*@__PURE__*/ j("ZodPipe", (e, t) => {
	dd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jp(e, t, n, r), e.in = t.in, e.out = t.out;
});
function Dh(e, t) {
	return new Eh({
		type: "pipe",
		in: e,
		out: t
	});
}
var Oh = /*@__PURE__*/ j("ZodReadonly", (e, t) => {
	pd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yp(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function kh(e) {
	return new Oh({
		type: "readonly",
		innerType: e
	});
}
var Ah = /*@__PURE__*/ j("ZodLazy", (e, t) => {
	hd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zp(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function jh(e) {
	return new Ah({
		type: "lazy",
		getter: e
	});
}
var Mh = /*@__PURE__*/ j("ZodCustom", (e, t) => {
	gd.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ap(e, t, n, r);
});
function Nh(e, t = {}) {
	return /* @__PURE__ */ Gf(Mh, e, t);
}
function Ph(e, t) {
	return /* @__PURE__ */ Kf(e, t);
}
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/coerce.js
function Fh(e) {
	return /* @__PURE__ */ Cf($m, e);
}
//#endregion
//#region libs/w3c/utils/src/lib/annotation/annotation.schema.ts
var K = z(), Ih = W([
	z().datetime({ offset: !0 }),
	Fh().transform((e) => e.toISOString()),
	G(""),
	Km()
]), Lh = z().regex(/^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/), Rh = ch([
	"ltr",
	"rtl",
	"auto"
]), zh = W([
	G("oa:assessing"),
	G("oa:bookmarking"),
	G("oa:classifying"),
	G("oa:commenting"),
	G("oa:describing"),
	G("oa:editing"),
	G("oa:highlighting"),
	G("oa:identifying"),
	G("oa:linking"),
	G("oa:moderating"),
	G("oa:questioning"),
	G("oa:replying"),
	G("oa:tagging"),
	z()
]), Bh = U({
	type: G("FragmentSelector"),
	value: z(),
	conformsTo: K.optional(),
	refinedBy: jh(() => Jh).optional()
}), Vh = U({
	type: G("CssSelector"),
	value: z(),
	refinedBy: jh(() => Jh).optional()
}), Hh = U({
	type: G("XPathSelector"),
	value: z(),
	refinedBy: jh(() => Jh).optional()
}), Uh = U({
	type: G("TextQuoteSelector"),
	exact: z(),
	prefix: z().optional(),
	suffix: z().optional(),
	refinedBy: jh(() => Jh).optional()
}), Wh = U({
	type: G("TextPositionSelector"),
	start: V().int().nonnegative(),
	end: V().int().nonnegative(),
	refinedBy: jh(() => Jh).optional()
}), Gh = U({
	type: G("DataPositionSelector"),
	start: V().int().nonnegative(),
	end: V().int().nonnegative(),
	refinedBy: jh(() => Jh).optional()
}), Kh = U({
	type: G("SvgSelector"),
	value: z().optional(),
	id: K.optional(),
	refinedBy: jh(() => Jh).optional()
}), qh = U({
	type: G("RangeSelector"),
	startSelector: jh(() => Jh),
	endSelector: jh(() => Jh),
	refinedBy: jh(() => Jh).optional()
}), Jh = jh(() => W([
	Bh,
	Vh,
	Hh,
	Uh,
	Wh,
	Gh,
	Kh,
	qh
])), Yh = W([U({
	type: G("TimeState"),
	sourceDate: W([Ih, H(Ih)]).optional(),
	sourceDateStart: Ih.optional(),
	sourceDateEnd: Ih.optional(),
	cachedSource: K.optional()
}), U({
	type: G("HttpRequestState"),
	value: z()
})]), Xh = U({
	type: G("CssStylesheet"),
	id: K.optional(),
	value: z().optional()
}), Zh = ch([
	"Person",
	"Organization",
	"Software"
]), Qh = U({
	id: K.optional(),
	type: W([Zh, H(Zh)]).optional(),
	name: W([z(), H(z())]).optional(),
	nickname: z().optional(),
	email: W([z(), H(z())]).optional(),
	email_sha1: W([z(), H(z())]).optional(),
	homepage: W([K, H(K)]).optional()
}), $h = U({
	id: K.optional(),
	type: z().optional()
}), eg = U({
	"@context": W([z(), H(W([z(), oh(z(), z())]))]).optional(),
	id: K.optional(),
	format: W([z(), H(z())]).optional(),
	language: W([Lh, H(Lh)]).optional(),
	processingLanguage: Lh.optional(),
	textDirection: Rh.optional(),
	accessibility: W([z(), H(z())]).optional(),
	rights: W([K, H(K)]).optional(),
	canonical: K.optional(),
	via: W([K, H(K)]).optional(),
	creator: W([Qh, H(Qh)]).optional(),
	created: Ih.optional(),
	modified: Ih.optional(),
	audience: W([$h, H($h)]).optional(),
	scope: K.optional()
}), tg = W([G("TextualBody"), H(z()).refine((e) => e.includes("TextualBody"), { message: "Type array must include \"TextualBody\"" })]), ng = eg.extend({
	type: tg,
	value: z(),
	purpose: W([zh, H(zh)]).optional()
}).passthrough(), rg = eg.extend({
	type: G("SpecificResource").optional(),
	source: K,
	selector: W([Jh, H(Jh)]).optional(),
	state: W([Yh, H(Yh)]).optional(),
	styleClass: z().optional(),
	renderedVia: W([Qh, H(Qh)]).optional(),
	purpose: W([zh, H(zh)]).optional()
}).passthrough(), ig = eg.extend({
	id: K,
	type: W([z(), H(z())]).optional(),
	purpose: W([zh, H(zh)]).optional()
}).passthrough(), ag = W([
	ng,
	rg,
	ig,
	U({
		type: G("Choice"),
		items: H(W([
			ng,
			rg,
			ig
		]))
	}),
	oh(z(), Xm()),
	K
]), og = W([
	rg,
	ig,
	K
]), sg = U({
	"@context": W([G("http://www.w3.org/ns/anno.jsonld"), H(z())]).optional(),
	id: K,
	type: G("Annotation"),
	body: W([ag, H(ag)]).optional(),
	target: W([og, H(og)]),
	motivation: W([zh, H(zh)]).optional(),
	creator: W([Qh, H(Qh)]).optional(),
	created: Ih.optional(),
	modified: Ih.optional(),
	generator: W([Qh, H(Qh)]).optional(),
	generated: Ih.optional(),
	audience: W([$h, H($h)]).optional(),
	rights: W([K, H(K)]).optional(),
	canonical: K.optional(),
	via: W([K, H(K)]).optional(),
	stylesheet: W([Xh, K]).optional()
}), cg = U({
	id: K,
	type: G("AnnotationPage"),
	partOf: K.optional(),
	startIndex: V().int().nonnegative().optional(),
	next: K.optional(),
	prev: K.optional(),
	items: H(sg).optional()
});
U({
	"@context": W([G("http://www.w3.org/ns/anno.jsonld"), H(z())]).optional(),
	id: K,
	type: G("AnnotationCollection"),
	label: z().optional(),
	total: V().int().nonnegative().optional(),
	first: W([cg, K]).optional(),
	last: K.optional()
});
//#endregion
//#region libs/w3c/utils/src/lib/annotation/annotation-helpers.ts
var lg = (e) => e === void 0 ? [] : Array.isArray(e) ? e : [e], ug = (e) => typeof e == "string", dg = (e) => ng.safeParse(e).success, fg = (e) => !ug(e) && rg.safeParse(e).success, pg = (e) => lg(e.target), mg = (e) => pg(e).filter(fg).flatMap((e) => lg(e.selector)), hg = (e) => (t) => mg(t).filter((t) => !ug(t) && t.type === e), gg = hg("TextQuoteSelector"), _g = hg("TextPositionSelector"), vg = (e) => JSON.parse(JSON.stringify(e)), q = (e) => e === void 0 ? [] : Array.isArray(e) ? e : [e], yg = (e) => q(e.target), bg = (e) => q(e.body), xg = (e, t) => {
	let n = [...q(e), ...q(t)];
	return n.length === 0 ? void 0 : n.length === 1 ? n[0] : n;
}, Sg = (e, t) => {
	if (typeof e == "string") return !1;
	let n = e.type;
	return n === void 0 ? !1 : Array.isArray(n) ? n.includes(t) : n === t;
}, Cg = (e, t) => {
	let n = [.../* @__PURE__ */ new Set([...q(e), ...q(t)])];
	return n.length === 0 ? void 0 : n.length === 1 ? n[0] : n;
}, wg = (e, t) => {
	let n = t.type, r = [...q(e.selector).filter((e) => e.type !== n), t];
	return {
		...e,
		selector: r.length === 1 ? r[0] : r
	};
}, Tg = (e, t) => {
	let n = q(e.selector).filter((e) => e.type !== t);
	return {
		...e,
		selector: n.length === 0 ? void 0 : n.length === 1 ? n[0] : n
	};
}, Eg = class e {
	state;
	constructor(e) {
		this.state = e ? vg(e) : {
			"@context": "http://www.w3.org/ns/anno.jsonld",
			type: "Annotation"
		};
	}
	clone() {
		return new e(vg(this.state));
	}
	setId(e) {
		return this.state.id = e, this;
	}
	setContext(e) {
		return this.state["@context"] = e, this;
	}
	addContext(e) {
		let t = this.state["@context"], n = t === void 0 ? [] : Array.isArray(t) ? [...t] : [t];
		return n.includes(e) || n.push(e), this.state["@context"] = n.length === 1 ? n[0] : n, this;
	}
	setMotivation(e) {
		return this.state.motivation = e, this;
	}
	addMotivation(e) {
		let t = q(this.state.motivation), n = [.../* @__PURE__ */ new Set([...t, e])];
		return this.state.motivation = n.length === 1 ? n[0] : n, this;
	}
	removeMotivation(e) {
		let t = q(this.state.motivation).filter((t) => t !== e);
		return this.state.motivation = t.length === 0 ? void 0 : t.length === 1 ? t[0] : t, this;
	}
	setTarget(e) {
		return this.state.target = e, this;
	}
	addTarget(e) {
		let t = yg(this.state);
		return this.state.target = [...t, e], this;
	}
	replaceTarget(e, t) {
		let n = yg(this.state).map((n) => typeof n == "string" ? n === e ? t : n : fg(n) && n.source === e ? t : n);
		return this.state.target = n.length === 1 ? n[0] : n, this;
	}
	removeTarget(e) {
		let t = yg(this.state).filter((t) => typeof t == "string" ? t !== e : !fg(t) || t.source !== e);
		return this.state.target = t.length === 1 ? t[0] : t, this;
	}
	updateTextQuoteSelector(e, t) {
		return this._upsertSelectorOnTarget({
			type: "TextQuoteSelector",
			...e
		}, t);
	}
	updateTextPositionSelector(e, t) {
		return this._upsertSelectorOnTarget({
			type: "TextPositionSelector",
			...e
		}, t);
	}
	updateFragmentSelector(e, t) {
		return this._upsertSelectorOnTarget({
			type: "FragmentSelector",
			...e
		}, t);
	}
	updateSvgSelector(e, t) {
		return this._upsertSelectorOnTarget({
			type: "SvgSelector",
			...e
		}, t);
	}
	removeTextQuoteSelector(e) {
		return this._removeSelectorFromTarget("TextQuoteSelector", e);
	}
	removeTextPositionSelector(e) {
		return this._removeSelectorFromTarget("TextPositionSelector", e);
	}
	removeFragmentSelector(e) {
		return this._removeSelectorFromTarget("FragmentSelector", e);
	}
	setBody(e) {
		return this.state.body = e, this;
	}
	addBody(e) {
		let t = bg(this.state);
		return this.state.body = [...t, e], this;
	}
	updateTextualBody(e, t, n) {
		let r = {
			type: "TextualBody",
			value: e,
			...t ? { purpose: t } : {},
			...n
		};
		if (!t) return this.updateBodyByType("TextualBody", r);
		let i = bg(this.state), a = i.findIndex((e) => dg(e) && q(e.purpose).includes(t)), o = a === -1 ? [...i, r] : i.map((e, t) => t === a ? r : e);
		return this.state.body = o.length === 1 ? o[0] : o, this;
	}
	updateBodyByType(e, t) {
		let n = bg(this.state), r = n.findIndex((t) => Sg(t, e)), i = r === -1 ? [...n, t] : n.map((e, n) => n === r ? t : e);
		return this.state.body = i.length === 1 ? i[0] : i, this;
	}
	removeTextualBody(e) {
		let t = bg(this.state).filter((t) => dg(t) ? e ? !q(t.purpose).includes(e) : !1 : !0);
		return this.state.body = t.length === 0 ? void 0 : t.length === 1 ? t[0] : t, this;
	}
	setCreator(e) {
		return this.state.creator = e, this;
	}
	setGenerator(e) {
		return this.state.generator = e, this;
	}
	setCreated(e) {
		return this.state.created = e instanceof Date ? e.toISOString() : e, this;
	}
	setModified(e) {
		return this.state.modified = e instanceof Date ? e.toISOString() : e, this;
	}
	touch() {
		return this.state.modified = (/* @__PURE__ */ new Date()).toISOString(), this;
	}
	setStylesheet(e) {
		return this.state.stylesheet = e, this;
	}
	merge(e) {
		let t = vg(e);
		return t["@context"] !== void 0 && (this.state["@context"] = t["@context"]), t.id !== void 0 && (this.state.id = t.id), t.type !== void 0 && (this.state.type = t.type), t.created !== void 0 && (this.state.created = t.created), t.modified !== void 0 && (this.state.modified = t.modified), t.generated !== void 0 && (this.state.generated = t.generated), t.canonical !== void 0 && (this.state.canonical = t.canonical), t.stylesheet !== void 0 && (this.state.stylesheet = t.stylesheet), t.motivation !== void 0 && (this.state.motivation = Cg(this.state.motivation, t.motivation)), t.rights !== void 0 && (this.state.rights = Cg(this.state.rights, t.rights)), t.via !== void 0 && (this.state.via = Cg(this.state.via, t.via)), t.target !== void 0 && (this.state.target = xg(this.state.target, t.target)), t.body !== void 0 && (this.state.body = xg(this.state.body, t.body)), t.creator !== void 0 && (this.state.creator = xg(this.state.creator, t.creator)), t.generator !== void 0 && (this.state.generator = xg(this.state.generator, t.generator)), t.audience !== void 0 && (this.state.audience = xg(this.state.audience, t.audience)), this;
	}
	getTextQuoteSelector(e) {
		let t = this.state;
		return e ? yg(this.state).filter((t) => fg(t) && t.source === e).flatMap((e) => q(e.selector).filter((e) => e.type === "TextQuoteSelector")) : gg(t);
	}
	getTextPositionSelector(e) {
		let t = this.state;
		return e ? yg(this.state).filter((t) => fg(t) && t.source === e).flatMap((e) => q(e.selector).filter((e) => e.type === "TextPositionSelector")) : _g(t);
	}
	getFragmentSelector(e) {
		return yg(this.state).filter((t) => fg(t) && (!e || t.source === e)).flatMap((e) => q(e.selector).filter((e) => e.type === "FragmentSelector"));
	}
	getBodiesByType(e) {
		return bg(this.state).filter((t) => Sg(t, e));
	}
	getBodiesByPurpose(e) {
		return bg(this.state).filter((t) => {
			if (typeof t == "string") return !1;
			let n = t.purpose;
			return n === void 0 ? !1 : !e || q(n).includes(e);
		});
	}
	getSpecificResourceTargets(e) {
		return yg(this.state).filter((t) => fg(t) && (!e || t.source === e));
	}
	getSourceUri() {
		return this.getSpecificResourceTargets()[0]?.source;
	}
	peek() {
		return vg(this.state);
	}
	build() {
		let e = sg.safeParse(this.state);
		if (!e.success) {
			let t = e.error.issues.map((e) => `  • ${e.path.join(".")} — ${e.message}`).join("\n");
			throw Error(`Invalid W3C Annotation:\n${t}`);
		}
		return e.data;
	}
	safeBuild() {
		let e = sg.safeParse(this.state);
		return e.success ? {
			success: !0,
			data: e.data
		} : {
			success: !1,
			errors: e.error.issues
		};
	}
	validate() {
		let e = sg.safeParse(this.state);
		return e.success ? [] : e.error.issues;
	}
	_findOrCreateSpecificResource(e) {
		let t = yg(this.state), n = t.find((t) => fg(t) ? !e || t.source === e : !1);
		if (n) return n;
		if (e) {
			let n = {
				type: "SpecificResource",
				source: e
			};
			return this.state.target = [...t, n], n;
		}
		return null;
	}
	_upsertSelectorOnTarget(e, t) {
		let n = this._findOrCreateSpecificResource(t);
		if (!n) throw Error(t ? `No SpecificResource target found with source "${t}"` : "No SpecificResource target found. Provide a sourceUri to create one.");
		let r = wg(n, e), i = yg(this.state).map((e) => e === n ? r : e);
		return this.state.target = i.length === 1 ? i[0] : i, this;
	}
	_removeSelectorFromTarget(e, t) {
		let n = yg(this.state).map((n) => !fg(n) || t && n.source !== t ? n : Tg(n, e));
		return this.state.target = n.length === 1 ? n[0] : n, this;
	}
}, Dg = (e) => new Eg(e), Og = typeof global == "object" && global && global.Object === Object && global, kg = typeof self == "object" && self && self.Object === Object && self, Ag = Og || kg || Function("return this")(), jg = Ag.Symbol, Mg = Object.prototype, Ng = Mg.hasOwnProperty, Pg = Mg.toString, Fg = jg ? jg.toStringTag : void 0;
function Ig(e) {
	var t = Ng.call(e, Fg), n = e[Fg];
	try {
		e[Fg] = void 0;
		var r = !0;
	} catch {}
	var i = Pg.call(e);
	return r && (t ? e[Fg] = n : delete e[Fg]), i;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_objectToString.js
var Lg = Object.prototype.toString;
function Rg(e) {
	return Lg.call(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetTag.js
var zg = "[object Null]", Bg = "[object Undefined]", Vg = jg ? jg.toStringTag : void 0;
function Hg(e) {
	return e == null ? e === void 0 ? Bg : zg : Vg && Vg in Object(e) ? Ig(e) : Rg(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObjectLike.js
function Ug(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isSymbol.js
var Wg = "[object Symbol]";
function Gg(e) {
	return typeof e == "symbol" || Ug(e) && Hg(e) == Wg;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayMap.js
function Kg(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
	return i;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArray.js
var J = Array.isArray, qg = 1 / 0, Jg = jg ? jg.prototype : void 0, Yg = Jg ? Jg.toString : void 0;
function Xg(e) {
	if (typeof e == "string") return e;
	if (J(e)) return Kg(e, Xg) + "";
	if (Gg(e)) return Yg ? Yg.call(e) : "";
	var t = e + "";
	return t == "0" && 1 / e == -qg ? "-0" : t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObject.js
function Zg(e) {
	var t = typeof e;
	return e != null && (t == "object" || t == "function");
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/identity.js
function Qg(e) {
	return e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isFunction.js
var $g = "[object AsyncFunction]", e_ = "[object Function]", t_ = "[object GeneratorFunction]", n_ = "[object Proxy]";
function r_(e) {
	if (!Zg(e)) return !1;
	var t = Hg(e);
	return t == e_ || t == t_ || t == $g || t == n_;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_coreJsData.js
var i_ = Ag["__core-js_shared__"], a_ = function() {
	var e = /[^.]+$/.exec(i_ && i_.keys && i_.keys.IE_PROTO || "");
	return e ? "Symbol(src)_1." + e : "";
}();
function o_(e) {
	return !!a_ && a_ in e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_toSource.js
var s_ = Function.prototype.toString;
function c_(e) {
	if (e != null) {
		try {
			return s_.call(e);
		} catch {}
		try {
			return e + "";
		} catch {}
	}
	return "";
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsNative.js
var l_ = /[\\^$.*+?()[\]{}|]/g, u_ = /^\[object .+?Constructor\]$/, d_ = Function.prototype, f_ = Object.prototype, p_ = d_.toString, m_ = f_.hasOwnProperty, h_ = RegExp("^" + p_.call(m_).replace(l_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function g_(e) {
	return !Zg(e) || o_(e) ? !1 : (r_(e) ? h_ : u_).test(c_(e));
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getValue.js
function __(e, t) {
	return e?.[t];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getNative.js
function v_(e, t) {
	var n = __(e, t);
	return g_(n) ? n : void 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_WeakMap.js
var y_ = v_(Ag, "WeakMap"), b_ = Object.create, x_ = function() {
	function e() {}
	return function(t) {
		if (!Zg(t)) return {};
		if (b_) return b_(t);
		e.prototype = t;
		var n = new e();
		return e.prototype = void 0, n;
	};
}();
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_apply.js
function S_(e, t, n) {
	switch (n.length) {
		case 0: return e.call(t);
		case 1: return e.call(t, n[0]);
		case 2: return e.call(t, n[0], n[1]);
		case 3: return e.call(t, n[0], n[1], n[2]);
	}
	return e.apply(t, n);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyArray.js
function C_(e, t) {
	var n = -1, r = e.length;
	for (t ||= Array(r); ++n < r;) t[n] = e[n];
	return t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_shortOut.js
var w_ = 800, T_ = 16, E_ = Date.now;
function D_(e) {
	var t = 0, n = 0;
	return function() {
		var r = E_(), i = T_ - (r - n);
		if (n = r, i > 0) {
			if (++t >= w_) return arguments[0];
		} else t = 0;
		return e.apply(void 0, arguments);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/constant.js
function O_(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_defineProperty.js
var k_ = function() {
	try {
		var e = v_(Object, "defineProperty");
		return e({}, "", {}), e;
	} catch {}
}(), A_ = D_(k_ ? function(e, t) {
	return k_(e, "toString", {
		configurable: !0,
		enumerable: !1,
		value: O_(t),
		writable: !0
	});
} : Qg);
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayEach.js
function j_(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1;);
	return e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isIndex.js
var M_ = 9007199254740991, N_ = /^(?:0|[1-9]\d*)$/;
function P_(e, t) {
	var n = typeof e;
	return t ??= M_, !!t && (n == "number" || n != "symbol" && N_.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignValue.js
function F_(e, t, n) {
	t == "__proto__" && k_ ? k_(e, t, {
		configurable: !0,
		enumerable: !0,
		value: n,
		writable: !0
	}) : e[t] = n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/eq.js
function I_(e, t) {
	return e === t || e !== e && t !== t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assignValue.js
var L_ = Object.prototype.hasOwnProperty;
function R_(e, t, n) {
	var r = e[t];
	(!(L_.call(e, t) && I_(r, n)) || n === void 0 && !(t in e)) && F_(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyObject.js
function z_(e, t, n, r) {
	var i = !n;
	n ||= {};
	for (var a = -1, o = t.length; ++a < o;) {
		var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
		c === void 0 && (c = e[s]), i ? F_(n, s, c) : R_(n, s, c);
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_overRest.js
var B_ = Math.max;
function V_(e, t, n) {
	return t = B_(t === void 0 ? e.length - 1 : t, 0), function() {
		for (var r = arguments, i = -1, a = B_(r.length - t, 0), o = Array(a); ++i < a;) o[i] = r[t + i];
		i = -1;
		for (var s = Array(t + 1); ++i < t;) s[i] = r[i];
		return s[t] = n(o), S_(e, this, s);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseRest.js
function H_(e, t) {
	return A_(V_(e, t, Qg), e + "");
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isLength.js
var U_ = 9007199254740991;
function W_(e) {
	return typeof e == "number" && e > -1 && e % 1 == 0 && e <= U_;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArrayLike.js
function G_(e) {
	return e != null && W_(e.length) && !r_(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isIterateeCall.js
function K_(e, t, n) {
	if (!Zg(n)) return !1;
	var r = typeof t;
	return (r == "number" ? G_(n) && P_(t, n.length) : r == "string" && t in n) ? I_(n[t], e) : !1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createAssigner.js
function q_(e) {
	return H_(function(t, n) {
		var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
		for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && K_(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i;) {
			var s = n[r];
			s && e(t, s, r, a);
		}
		return t;
	});
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isPrototype.js
var J_ = Object.prototype;
function Y_(e) {
	var t = e && e.constructor;
	return e === (typeof t == "function" && t.prototype || J_);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseTimes.js
function X_(e, t) {
	for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
	return r;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsArguments.js
var Z_ = "[object Arguments]";
function Q_(e) {
	return Ug(e) && Hg(e) == Z_;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArguments.js
var $_ = Object.prototype, ev = $_.hasOwnProperty, tv = $_.propertyIsEnumerable, nv = Q_(function() {
	return arguments;
}()) ? Q_ : function(e) {
	return Ug(e) && ev.call(e, "callee") && !tv.call(e, "callee");
};
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubFalse.js
function rv() {
	return !1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isBuffer.js
var iv = typeof exports == "object" && exports && !exports.nodeType && exports, av = iv && typeof module == "object" && module && !module.nodeType && module, ov = av && av.exports === iv ? Ag.Buffer : void 0, sv = (ov ? ov.isBuffer : void 0) || rv, cv = "[object Arguments]", lv = "[object Array]", uv = "[object Boolean]", dv = "[object Date]", fv = "[object Error]", pv = "[object Function]", mv = "[object Map]", hv = "[object Number]", gv = "[object Object]", _v = "[object RegExp]", vv = "[object Set]", yv = "[object String]", bv = "[object WeakMap]", xv = "[object ArrayBuffer]", Sv = "[object DataView]", Cv = "[object Float32Array]", wv = "[object Float64Array]", Tv = "[object Int8Array]", Ev = "[object Int16Array]", Dv = "[object Int32Array]", Ov = "[object Uint8Array]", kv = "[object Uint8ClampedArray]", Av = "[object Uint16Array]", jv = "[object Uint32Array]", Y = {};
Y[Cv] = Y[wv] = Y[Tv] = Y[Ev] = Y[Dv] = Y[Ov] = Y[kv] = Y[Av] = Y[jv] = !0, Y[cv] = Y[lv] = Y[xv] = Y[uv] = Y[Sv] = Y[dv] = Y[fv] = Y[pv] = Y[mv] = Y[hv] = Y[gv] = Y[_v] = Y[vv] = Y[yv] = Y[bv] = !1;
function Mv(e) {
	return Ug(e) && W_(e.length) && !!Y[Hg(e)];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseUnary.js
function Nv(e) {
	return function(t) {
		return e(t);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nodeUtil.js
var Pv = typeof exports == "object" && exports && !exports.nodeType && exports, Fv = Pv && typeof module == "object" && module && !module.nodeType && module, Iv = Fv && Fv.exports === Pv && Og.process, Lv = function() {
	try {
		return Fv && Fv.require && Fv.require("util").types || Iv && Iv.binding && Iv.binding("util");
	} catch {}
}(), Rv = Lv && Lv.isTypedArray, zv = Rv ? Nv(Rv) : Mv, Bv = Object.prototype.hasOwnProperty;
function Vv(e, t) {
	var n = J(e), r = !n && nv(e), i = !n && !r && sv(e), a = !n && !r && !i && zv(e), o = n || r || i || a, s = o ? X_(e.length, String) : [], c = s.length;
	for (var l in e) (t || Bv.call(e, l)) && !(o && (l == "length" || i && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || P_(l, c))) && s.push(l);
	return s;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_overArg.js
function Hv(e, t) {
	return function(n) {
		return e(t(n));
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeys.js
var Uv = Hv(Object.keys, Object), Wv = Object.prototype.hasOwnProperty;
function Gv(e) {
	if (!Y_(e)) return Uv(e);
	var t = [];
	for (var n in Object(e)) Wv.call(e, n) && n != "constructor" && t.push(n);
	return t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keys.js
function Kv(e) {
	return G_(e) ? Vv(e) : Gv(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeysIn.js
function qv(e) {
	var t = [];
	if (e != null) for (var n in Object(e)) t.push(n);
	return t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseKeysIn.js
var Jv = Object.prototype.hasOwnProperty;
function Yv(e) {
	if (!Zg(e)) return qv(e);
	var t = Y_(e), n = [];
	for (var r in e) (r != "constructor" || !t && Jv.call(e, r)) && n.push(r);
	return n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keysIn.js
function Xv(e) {
	return G_(e) ? Vv(e, !0) : Yv(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isKey.js
var Zv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qv = /^\w*$/;
function $v(e, t) {
	if (J(e)) return !1;
	var n = typeof e;
	return n == "number" || n == "symbol" || n == "boolean" || e == null || Gg(e) ? !0 : Qv.test(e) || !Zv.test(e) || t != null && e in Object(t);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeCreate.js
var ey = v_(Object, "create");
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashClear.js
function ty() {
	this.__data__ = ey ? ey(null) : {}, this.size = 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashDelete.js
function ny(e) {
	var t = this.has(e) && delete this.__data__[e];
	return this.size -= +!!t, t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashGet.js
var ry = "__lodash_hash_undefined__", iy = Object.prototype.hasOwnProperty;
function ay(e) {
	var t = this.__data__;
	if (ey) {
		var n = t[e];
		return n === ry ? void 0 : n;
	}
	return iy.call(t, e) ? t[e] : void 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashHas.js
var oy = Object.prototype.hasOwnProperty;
function sy(e) {
	var t = this.__data__;
	return ey ? t[e] !== void 0 : oy.call(t, e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashSet.js
var cy = "__lodash_hash_undefined__";
function ly(e, t) {
	var n = this.__data__;
	return this.size += +!this.has(e), n[e] = ey && t === void 0 ? cy : t, this;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Hash.js
function uy(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
uy.prototype.clear = ty, uy.prototype.delete = ny, uy.prototype.get = ay, uy.prototype.has = sy, uy.prototype.set = ly;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheClear.js
function dy() {
	this.__data__ = [], this.size = 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assocIndexOf.js
function fy(e, t) {
	for (var n = e.length; n--;) if (I_(e[n][0], t)) return n;
	return -1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheDelete.js
var py = Array.prototype.splice;
function my(e) {
	var t = this.__data__, n = fy(t, e);
	return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : py.call(t, n, 1), --this.size, !0);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheGet.js
function hy(e) {
	var t = this.__data__, n = fy(t, e);
	return n < 0 ? void 0 : t[n][1];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheHas.js
function gy(e) {
	return fy(this.__data__, e) > -1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheSet.js
function _y(e, t) {
	var n = this.__data__, r = fy(n, e);
	return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_ListCache.js
function vy(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
vy.prototype.clear = dy, vy.prototype.delete = my, vy.prototype.get = hy, vy.prototype.has = gy, vy.prototype.set = _y;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Map.js
var yy = v_(Ag, "Map");
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheClear.js
function by() {
	this.size = 0, this.__data__ = {
		hash: new uy(),
		map: new (yy || vy)(),
		string: new uy()
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isKeyable.js
function xy(e) {
	var t = typeof e;
	return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getMapData.js
function Sy(e, t) {
	var n = e.__data__;
	return xy(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheDelete.js
function Cy(e) {
	var t = Sy(this, e).delete(e);
	return this.size -= +!!t, t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheGet.js
function wy(e) {
	return Sy(this, e).get(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheHas.js
function Ty(e) {
	return Sy(this, e).has(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheSet.js
function Ey(e, t) {
	var n = Sy(this, e), r = n.size;
	return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_MapCache.js
function Dy(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
Dy.prototype.clear = by, Dy.prototype.delete = Cy, Dy.prototype.get = wy, Dy.prototype.has = Ty, Dy.prototype.set = Ey;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/memoize.js
var Oy = "Expected a function";
function ky(e, t) {
	if (typeof e != "function" || t != null && typeof t != "function") throw TypeError(Oy);
	var n = function() {
		var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
		if (a.has(i)) return a.get(i);
		var o = e.apply(this, r);
		return n.cache = a.set(i, o) || a, o;
	};
	return n.cache = new (ky.Cache || Dy)(), n;
}
ky.Cache = Dy;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_memoizeCapped.js
var Ay = 500;
function jy(e) {
	var t = ky(e, function(e) {
		return n.size === Ay && n.clear(), e;
	}), n = t.cache;
	return t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stringToPath.js
var My = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ny = /\\(\\)?/g, Py = jy(function(e) {
	var t = [];
	return e.charCodeAt(0) === 46 && t.push(""), e.replace(My, function(e, n, r, i) {
		t.push(r ? i.replace(Ny, "$1") : n || e);
	}), t;
});
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/toString.js
function Fy(e) {
	return e == null ? "" : Xg(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_castPath.js
function Iy(e, t) {
	return J(e) ? e : $v(e, t) ? [e] : Py(Fy(e));
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_toKey.js
var Ly = 1 / 0;
function Ry(e) {
	if (typeof e == "string" || Gg(e)) return e;
	var t = e + "";
	return t == "0" && 1 / e == -Ly ? "-0" : t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGet.js
function zy(e, t) {
	t = Iy(t, e);
	for (var n = 0, r = t.length; e != null && n < r;) e = e[Ry(t[n++])];
	return n && n == r ? e : void 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/get.js
function By(e, t, n) {
	var r = e == null ? void 0 : zy(e, t);
	return r === void 0 ? n : r;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayPush.js
function Vy(e, t) {
	for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
	return e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isFlattenable.js
var Hy = jg ? jg.isConcatSpreadable : void 0;
function Uy(e) {
	return J(e) || nv(e) || !!(Hy && e && e[Hy]);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseFlatten.js
function Wy(e, t, n, r, i) {
	var a = -1, o = e.length;
	for (n ||= Uy, i ||= []; ++a < o;) {
		var s = e[a];
		t > 0 && n(s) ? t > 1 ? Wy(s, t - 1, n, r, i) : Vy(i, s) : r || (i[i.length] = s);
	}
	return i;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/flatten.js
function Gy(e) {
	return e != null && e.length ? Wy(e, 1) : [];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_flatRest.js
function Ky(e) {
	return A_(V_(e, void 0, Gy), e + "");
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getPrototype.js
var qy = Hv(Object.getPrototypeOf, Object), Jy = "[object Object]", Yy = Function.prototype, Xy = Object.prototype, Zy = Yy.toString, Qy = Xy.hasOwnProperty, $y = Zy.call(Object);
function eb(e) {
	if (!Ug(e) || Hg(e) != Jy) return !1;
	var t = qy(e);
	if (t === null) return !0;
	var n = Qy.call(t, "constructor") && t.constructor;
	return typeof n == "function" && n instanceof n && Zy.call(n) == $y;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackClear.js
function tb() {
	this.__data__ = new vy(), this.size = 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackDelete.js
function nb(e) {
	var t = this.__data__, n = t.delete(e);
	return this.size = t.size, n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackGet.js
function rb(e) {
	return this.__data__.get(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackHas.js
function ib(e) {
	return this.__data__.has(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackSet.js
var ab = 200;
function ob(e, t) {
	var n = this.__data__;
	if (n instanceof vy) {
		var r = n.__data__;
		if (!yy || r.length < ab - 1) return r.push([e, t]), this.size = ++n.size, this;
		n = this.__data__ = new Dy(r);
	}
	return n.set(e, t), this.size = n.size, this;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Stack.js
function sb(e) {
	var t = this.__data__ = new vy(e);
	this.size = t.size;
}
sb.prototype.clear = tb, sb.prototype.delete = nb, sb.prototype.get = rb, sb.prototype.has = ib, sb.prototype.set = ob;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssign.js
function cb(e, t) {
	return e && z_(t, Kv(t), e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignIn.js
function lb(e, t) {
	return e && z_(t, Xv(t), e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneBuffer.js
var ub = typeof exports == "object" && exports && !exports.nodeType && exports, db = ub && typeof module == "object" && module && !module.nodeType && module, fb = db && db.exports === ub ? Ag.Buffer : void 0, pb = fb ? fb.allocUnsafe : void 0;
function mb(e, t) {
	if (t) return e.slice();
	var n = e.length, r = pb ? pb(n) : new e.constructor(n);
	return e.copy(r), r;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayFilter.js
function hb(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
		var o = e[n];
		t(o, n, e) && (a[i++] = o);
	}
	return a;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubArray.js
function gb() {
	return [];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbols.js
var _b = Object.prototype.propertyIsEnumerable, vb = Object.getOwnPropertySymbols, yb = vb ? function(e) {
	return e == null ? [] : (e = Object(e), hb(vb(e), function(t) {
		return _b.call(e, t);
	}));
} : gb;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbols.js
function bb(e, t) {
	return z_(e, yb(e), t);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbolsIn.js
var xb = Object.getOwnPropertySymbols ? function(e) {
	for (var t = []; e;) Vy(t, yb(e)), e = qy(e);
	return t;
} : gb;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbolsIn.js
function Sb(e, t) {
	return z_(e, xb(e), t);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetAllKeys.js
function Cb(e, t, n) {
	var r = t(e);
	return J(e) ? r : Vy(r, n(e));
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeys.js
function wb(e) {
	return Cb(e, Kv, yb);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeysIn.js
function Tb(e) {
	return Cb(e, Xv, xb);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_DataView.js
var Eb = v_(Ag, "DataView"), Db = v_(Ag, "Promise"), Ob = v_(Ag, "Set"), kb = "[object Map]", Ab = "[object Object]", jb = "[object Promise]", Mb = "[object Set]", Nb = "[object WeakMap]", Pb = "[object DataView]", Fb = c_(Eb), Ib = c_(yy), Lb = c_(Db), Rb = c_(Ob), zb = c_(y_), Bb = Hg;
(Eb && Bb(new Eb(/* @__PURE__ */ new ArrayBuffer(1))) != Pb || yy && Bb(new yy()) != kb || Db && Bb(Db.resolve()) != jb || Ob && Bb(new Ob()) != Mb || y_ && Bb(new y_()) != Nb) && (Bb = function(e) {
	var t = Hg(e), n = t == Ab ? e.constructor : void 0, r = n ? c_(n) : "";
	if (r) switch (r) {
		case Fb: return Pb;
		case Ib: return kb;
		case Lb: return jb;
		case Rb: return Mb;
		case zb: return Nb;
	}
	return t;
});
var Vb = Bb, Hb = Object.prototype.hasOwnProperty;
function Ub(e) {
	var t = e.length, n = new e.constructor(t);
	return t && typeof e[0] == "string" && Hb.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Uint8Array.js
var Wb = Ag.Uint8Array;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneArrayBuffer.js
function Gb(e) {
	var t = new e.constructor(e.byteLength);
	return new Wb(t).set(new Wb(e)), t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneDataView.js
function Kb(e, t) {
	var n = t ? Gb(e.buffer) : e.buffer;
	return new e.constructor(n, e.byteOffset, e.byteLength);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneRegExp.js
var qb = /\w*$/;
function Jb(e) {
	var t = new e.constructor(e.source, qb.exec(e));
	return t.lastIndex = e.lastIndex, t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneSymbol.js
var Yb = jg ? jg.prototype : void 0, Xb = Yb ? Yb.valueOf : void 0;
function Zb(e) {
	return Xb ? Object(Xb.call(e)) : {};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneTypedArray.js
function Qb(e, t) {
	var n = t ? Gb(e.buffer) : e.buffer;
	return new e.constructor(n, e.byteOffset, e.length);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneByTag.js
var $b = "[object Boolean]", ex = "[object Date]", tx = "[object Map]", nx = "[object Number]", rx = "[object RegExp]", ix = "[object Set]", ax = "[object String]", ox = "[object Symbol]", sx = "[object ArrayBuffer]", cx = "[object DataView]", lx = "[object Float32Array]", ux = "[object Float64Array]", dx = "[object Int8Array]", fx = "[object Int16Array]", px = "[object Int32Array]", mx = "[object Uint8Array]", hx = "[object Uint8ClampedArray]", gx = "[object Uint16Array]", _x = "[object Uint32Array]";
function vx(e, t, n) {
	var r = e.constructor;
	switch (t) {
		case sx: return Gb(e);
		case $b:
		case ex: return new r(+e);
		case cx: return Kb(e, n);
		case lx:
		case ux:
		case dx:
		case fx:
		case px:
		case mx:
		case hx:
		case gx:
		case _x: return Qb(e, n);
		case tx: return new r();
		case nx:
		case ax: return new r(e);
		case rx: return Jb(e);
		case ix: return new r();
		case ox: return Zb(e);
	}
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneObject.js
function yx(e) {
	return typeof e.constructor == "function" && !Y_(e) ? x_(qy(e)) : {};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsMap.js
var bx = "[object Map]";
function xx(e) {
	return Ug(e) && Vb(e) == bx;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isMap.js
var Sx = Lv && Lv.isMap, Cx = Sx ? Nv(Sx) : xx, wx = "[object Set]";
function Tx(e) {
	return Ug(e) && Vb(e) == wx;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isSet.js
var Ex = Lv && Lv.isSet, Dx = Ex ? Nv(Ex) : Tx, Ox = 1, kx = 2, Ax = 4, jx = "[object Arguments]", Mx = "[object Array]", Nx = "[object Boolean]", Px = "[object Date]", Fx = "[object Error]", Ix = "[object Function]", Lx = "[object GeneratorFunction]", Rx = "[object Map]", zx = "[object Number]", Bx = "[object Object]", Vx = "[object RegExp]", Hx = "[object Set]", Ux = "[object String]", Wx = "[object Symbol]", Gx = "[object WeakMap]", Kx = "[object ArrayBuffer]", qx = "[object DataView]", Jx = "[object Float32Array]", Yx = "[object Float64Array]", Xx = "[object Int8Array]", Zx = "[object Int16Array]", Qx = "[object Int32Array]", $x = "[object Uint8Array]", eS = "[object Uint8ClampedArray]", tS = "[object Uint16Array]", nS = "[object Uint32Array]", X = {};
X[jx] = X[Mx] = X[Kx] = X[qx] = X[Nx] = X[Px] = X[Jx] = X[Yx] = X[Xx] = X[Zx] = X[Qx] = X[Rx] = X[zx] = X[Bx] = X[Vx] = X[Hx] = X[Ux] = X[Wx] = X[$x] = X[eS] = X[tS] = X[nS] = !0, X[Fx] = X[Ix] = X[Gx] = !1;
function rS(e, t, n, r, i, a) {
	var o, s = t & Ox, c = t & kx, l = t & Ax;
	if (n && (o = i ? n(e, r, i, a) : n(e)), o !== void 0) return o;
	if (!Zg(e)) return e;
	var u = J(e);
	if (u) {
		if (o = Ub(e), !s) return C_(e, o);
	} else {
		var d = Vb(e), f = d == Ix || d == Lx;
		if (sv(e)) return mb(e, s);
		if (d == Bx || d == jx || f && !i) {
			if (o = c || f ? {} : yx(e), !s) return c ? Sb(e, lb(o, e)) : bb(e, cb(o, e));
		} else {
			if (!X[d]) return i ? e : {};
			o = vx(e, d, s);
		}
	}
	a ||= new sb();
	var p = a.get(e);
	if (p) return p;
	a.set(e, o), Dx(e) ? e.forEach(function(r) {
		o.add(rS(r, t, n, r, e, a));
	}) : Cx(e) && e.forEach(function(r, i) {
		o.set(i, rS(r, t, n, i, e, a));
	});
	var m = u ? void 0 : (l ? c ? Tb : wb : c ? Xv : Kv)(e);
	return j_(m || e, function(r, i) {
		m && (i = r, r = e[i]), R_(o, i, rS(r, t, n, i, e, a));
	}), o;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/cloneDeep.js
var iS = 1, aS = 4;
function oS(e) {
	return rS(e, iS | aS);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setCacheAdd.js
var sS = "__lodash_hash_undefined__";
function cS(e) {
	return this.__data__.set(e, sS), this;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setCacheHas.js
function lS(e) {
	return this.__data__.has(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_SetCache.js
function uS(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.__data__ = new Dy(); ++t < n;) this.add(e[t]);
}
uS.prototype.add = uS.prototype.push = cS, uS.prototype.has = lS;
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arraySome.js
function dS(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
	return !1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cacheHas.js
function fS(e, t) {
	return e.has(t);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalArrays.js
var pS = 1, mS = 2;
function hS(e, t, n, r, i, a) {
	var o = n & pS, s = e.length, c = t.length;
	if (s != c && !(o && c > s)) return !1;
	var l = a.get(e), u = a.get(t);
	if (l && u) return l == t && u == e;
	var d = -1, f = !0, p = n & mS ? new uS() : void 0;
	for (a.set(e, t), a.set(t, e); ++d < s;) {
		var m = e[d], h = t[d];
		if (r) var g = o ? r(h, m, d, t, e, a) : r(m, h, d, e, t, a);
		if (g !== void 0) {
			if (g) continue;
			f = !1;
			break;
		}
		if (p) {
			if (!dS(t, function(e, t) {
				if (!fS(p, t) && (m === e || i(m, e, n, r, a))) return p.push(t);
			})) {
				f = !1;
				break;
			}
		} else if (!(m === h || i(m, h, n, r, a))) {
			f = !1;
			break;
		}
	}
	return a.delete(e), a.delete(t), f;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapToArray.js
function gS(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e, r) {
		n[++t] = [r, e];
	}), n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setToArray.js
function _S(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e) {
		n[++t] = e;
	}), n;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalByTag.js
var vS = 1, yS = 2, bS = "[object Boolean]", xS = "[object Date]", SS = "[object Error]", CS = "[object Map]", wS = "[object Number]", TS = "[object RegExp]", ES = "[object Set]", DS = "[object String]", OS = "[object Symbol]", kS = "[object ArrayBuffer]", AS = "[object DataView]", jS = jg ? jg.prototype : void 0, MS = jS ? jS.valueOf : void 0;
function NS(e, t, n, r, i, a, o) {
	switch (n) {
		case AS:
			if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
			e = e.buffer, t = t.buffer;
		case kS: return !(e.byteLength != t.byteLength || !a(new Wb(e), new Wb(t)));
		case bS:
		case xS:
		case wS: return I_(+e, +t);
		case SS: return e.name == t.name && e.message == t.message;
		case TS:
		case DS: return e == t + "";
		case CS: var s = gS;
		case ES:
			var c = r & vS;
			if (s ||= _S, e.size != t.size && !c) return !1;
			var l = o.get(e);
			if (l) return l == t;
			r |= yS, o.set(e, t);
			var u = hS(s(e), s(t), r, i, a, o);
			return o.delete(e), u;
		case OS: if (MS) return MS.call(e) == MS.call(t);
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalObjects.js
var PS = 1, FS = Object.prototype.hasOwnProperty;
function IS(e, t, n, r, i, a) {
	var o = n & PS, s = wb(e), c = s.length;
	if (c != wb(t).length && !o) return !1;
	for (var l = c; l--;) {
		var u = s[l];
		if (!(o ? u in t : FS.call(t, u))) return !1;
	}
	var d = a.get(e), f = a.get(t);
	if (d && f) return d == t && f == e;
	var p = !0;
	a.set(e, t), a.set(t, e);
	for (var m = o; ++l < c;) {
		u = s[l];
		var h = e[u], g = t[u];
		if (r) var _ = o ? r(g, h, u, t, e, a) : r(h, g, u, e, t, a);
		if (!(_ === void 0 ? h === g || i(h, g, n, r, a) : _)) {
			p = !1;
			break;
		}
		m ||= u == "constructor";
	}
	if (p && !m) {
		var v = e.constructor, y = t.constructor;
		v != y && "constructor" in e && "constructor" in t && !(typeof v == "function" && v instanceof v && typeof y == "function" && y instanceof y) && (p = !1);
	}
	return a.delete(e), a.delete(t), p;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsEqualDeep.js
var LS = 1, RS = "[object Arguments]", zS = "[object Array]", BS = "[object Object]", VS = Object.prototype.hasOwnProperty;
function HS(e, t, n, r, i, a) {
	var o = J(e), s = J(t), c = o ? zS : Vb(e), l = s ? zS : Vb(t);
	c = c == RS ? BS : c, l = l == RS ? BS : l;
	var u = c == BS, d = l == BS, f = c == l;
	if (f && sv(e)) {
		if (!sv(t)) return !1;
		o = !0, u = !1;
	}
	if (f && !u) return a ||= new sb(), o || zv(e) ? hS(e, t, n, r, i, a) : NS(e, t, c, n, r, i, a);
	if (!(n & LS)) {
		var p = u && VS.call(e, "__wrapped__"), m = d && VS.call(t, "__wrapped__");
		if (p || m) {
			var h = p ? e.value() : e, g = m ? t.value() : t;
			return a ||= new sb(), i(h, g, n, r, a);
		}
	}
	return f ? (a ||= new sb(), IS(e, t, n, r, i, a)) : !1;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsEqual.js
function US(e, t, n, r, i) {
	return e === t ? !0 : e == null || t == null || !Ug(e) && !Ug(t) ? e !== e && t !== t : HS(e, t, n, r, US, i);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsMatch.js
var WS = 1, GS = 2;
function KS(e, t, n, r) {
	var i = n.length, a = i, o = !r;
	if (e == null) return !a;
	for (e = Object(e); i--;) {
		var s = n[i];
		if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
	}
	for (; ++i < a;) {
		s = n[i];
		var c = s[0], l = e[c], u = s[1];
		if (o && s[2]) {
			if (l === void 0 && !(c in e)) return !1;
		} else {
			var d = new sb();
			if (r) var f = r(l, u, c, e, t, d);
			if (!(f === void 0 ? US(u, l, WS | GS, r, d) : f)) return !1;
		}
	}
	return !0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isStrictComparable.js
function qS(e) {
	return e === e && !Zg(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getMatchData.js
function JS(e) {
	for (var t = Kv(e), n = t.length; n--;) {
		var r = t[n], i = e[r];
		t[n] = [
			r,
			i,
			qS(i)
		];
	}
	return t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_matchesStrictComparable.js
function YS(e, t) {
	return function(n) {
		return n != null && n[e] === t && (t !== void 0 || e in Object(n));
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseMatches.js
function XS(e) {
	var t = JS(e);
	return t.length == 1 && t[0][2] ? YS(t[0][0], t[0][1]) : function(n) {
		return n === e || KS(n, e, t);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseHasIn.js
function ZS(e, t) {
	return e != null && t in Object(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hasPath.js
function QS(e, t, n) {
	t = Iy(t, e);
	for (var r = -1, i = t.length, a = !1; ++r < i;) {
		var o = Ry(t[r]);
		if (!(a = e != null && n(e, o))) break;
		e = e[o];
	}
	return a || ++r != i ? a : (i = e == null ? 0 : e.length, !!i && W_(i) && P_(o, i) && (J(e) || nv(e)));
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/hasIn.js
function $S(e, t) {
	return e != null && QS(e, t, ZS);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseMatchesProperty.js
var eC = 1, tC = 2;
function nC(e, t) {
	return $v(e) && qS(t) ? YS(Ry(e), t) : function(n) {
		var r = By(n, e);
		return r === void 0 && r === t ? $S(n, e) : US(t, r, eC | tC);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseProperty.js
function rC(e) {
	return function(t) {
		return t?.[e];
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePropertyDeep.js
function iC(e) {
	return function(t) {
		return zy(t, e);
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/property.js
function aC(e) {
	return $v(e) ? rC(Ry(e)) : iC(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIteratee.js
function oC(e) {
	return typeof e == "function" ? e : e == null ? Qg : typeof e == "object" ? J(e) ? nC(e[0], e[1]) : XS(e) : aC(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createBaseFor.js
function sC(e) {
	return function(t, n, r) {
		for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
			var c = o[e ? s : ++i];
			if (n(a[c], c, a) === !1) break;
		}
		return t;
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseFor.js
var cC = sC();
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseForOwn.js
function lC(e, t) {
	return e && cC(e, t, Kv);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createBaseEach.js
function uC(e, t) {
	return function(n, r) {
		if (n == null) return n;
		if (!G_(n)) return e(n, r);
		for (var i = n.length, a = t ? i : -1, o = Object(n); (t ? a-- : ++a < i) && r(o[a], a, o) !== !1;);
		return n;
	};
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseEach.js
var dC = uC(lC);
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assignMergeValue.js
function fC(e, t, n) {
	(n !== void 0 && !I_(e[t], n) || n === void 0 && !(t in e)) && F_(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArrayLikeObject.js
function pC(e) {
	return Ug(e) && G_(e);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_safeGet.js
function mC(e, t) {
	if ((t !== "constructor" || typeof e[t] != "function") && t != "__proto__") return e[t];
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/toPlainObject.js
function hC(e) {
	return z_(e, Xv(e));
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseMergeDeep.js
function gC(e, t, n, r, i, a, o) {
	var s = mC(e, n), c = mC(t, n), l = o.get(c);
	if (l) {
		fC(e, n, l);
		return;
	}
	var u = a ? a(s, c, n + "", e, t, o) : void 0, d = u === void 0;
	if (d) {
		var f = J(c), p = !f && sv(c), m = !f && !p && zv(c);
		u = c, f || p || m ? J(s) ? u = s : pC(s) ? u = C_(s) : p ? (d = !1, u = mb(c, !0)) : m ? (d = !1, u = Qb(c, !0)) : u = [] : eb(c) || nv(c) ? (u = s, nv(s) ? u = hC(s) : (!Zg(s) || r_(s)) && (u = yx(c))) : d = !1;
	}
	d && (o.set(c, u), i(u, c, r, a, o), o.delete(c)), fC(e, n, u);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseMerge.js
function _C(e, t, n, r, i) {
	e !== t && cC(t, function(a, o) {
		if (i ||= new sb(), Zg(a)) gC(e, t, o, n, _C, r, i);
		else {
			var s = r ? r(mC(e, o), a, o + "", e, t, i) : void 0;
			s === void 0 && (s = a), fC(e, o, s);
		}
	}, Xv);
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseMap.js
function vC(e, t) {
	var n = -1, r = G_(e) ? Array(e.length) : [];
	return dC(e, function(e, i, a) {
		r[++n] = t(e, i, a);
	}), r;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGt.js
function yC(e, t) {
	return e > t;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseExtremum.js
function bC(e, t, n) {
	for (var r = -1, i = e.length; ++r < i;) {
		var a = e[r], o = t(a);
		if (o != null && (s === void 0 ? o === o && !Gg(o) : n(o, s))) var s = o, c = a;
	}
	return c;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/maxBy.js
function xC(e, t) {
	return e && e.length ? bC(e, oC(t, 2), yC) : void 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/merge.js
var SC = q_(function(e, t, n) {
	_C(e, t, n);
});
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseSet.js
function CC(e, t, n, r) {
	if (!Zg(e)) return e;
	t = Iy(t, e);
	for (var i = -1, a = t.length, o = a - 1, s = e; s != null && ++i < a;) {
		var c = Ry(t[i]), l = n;
		if (c === "__proto__" || c === "constructor" || c === "prototype") return e;
		if (i != o) {
			var u = s[c];
			l = r ? r(u, c, s) : void 0, l === void 0 && (l = Zg(u) ? u : P_(t[i + 1]) ? [] : {});
		}
		R_(s, c, l), s = s[c];
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePickBy.js
function wC(e, t, n) {
	for (var r = -1, i = t.length, a = {}; ++r < i;) {
		var o = t[r], s = zy(e, o);
		n(s, o) && CC(a, Iy(o, e), s);
	}
	return a;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseSortBy.js
function TC(e, t) {
	var n = e.length;
	for (e.sort(t); n--;) e[n] = e[n].value;
	return e;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_compareAscending.js
function EC(e, t) {
	if (e !== t) {
		var n = e !== void 0, r = e === null, i = e === e, a = Gg(e), o = t !== void 0, s = t === null, c = t === t, l = Gg(t);
		if (!s && !l && !a && e > t || a && o && c && !s && !l || r && o && c || !n && c || !i) return 1;
		if (!r && !a && !l && e < t || l && n && i && !r && !a || s && n && i || !o && i || !c) return -1;
	}
	return 0;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_compareMultiple.js
function DC(e, t, n) {
	for (var r = -1, i = e.criteria, a = t.criteria, o = i.length, s = n.length; ++r < o;) {
		var c = EC(i[r], a[r]);
		if (c) return r >= s ? c : c * (n[r] == "desc" ? -1 : 1);
	}
	return e.index - t.index;
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseOrderBy.js
function OC(e, t, n) {
	t = t.length ? Kg(t, function(e) {
		return J(e) ? function(t) {
			return zy(t, e.length === 1 ? e[0] : e);
		} : e;
	}) : [Qg];
	var r = -1;
	return t = Kg(t, Nv(oC)), TC(vC(e, function(e, n, i) {
		return {
			criteria: Kg(t, function(t) {
				return t(e);
			}),
			index: ++r,
			value: e
		};
	}), function(e, t) {
		return DC(e, t, n);
	});
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePick.js
function kC(e, t) {
	return wC(e, t, function(t, n) {
		return $S(e, n);
	});
}
//#endregion
//#region node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/pick.js
var AC = Ky(function(e, t) {
	return e == null ? {} : kC(e, t);
}), jC = H_(function(e, t) {
	if (e == null) return [];
	var n = t.length;
	return n > 1 && K_(e, t[0], t[1]) ? t = [] : n > 2 && K_(t[0], t[1], t[2]) && (t = [t[0]]), OC(e, Wy(t, 1), []);
}), Z = [];
for (let e = 0; e < 256; ++e) Z.push((e + 256).toString(16).slice(1));
function MC(e, t = 0) {
	return (Z[e[t + 0]] + Z[e[t + 1]] + Z[e[t + 2]] + Z[e[t + 3]] + "-" + Z[e[t + 4]] + Z[e[t + 5]] + "-" + Z[e[t + 6]] + Z[e[t + 7]] + "-" + Z[e[t + 8]] + Z[e[t + 9]] + "-" + Z[e[t + 10]] + Z[e[t + 11]] + Z[e[t + 12]] + Z[e[t + 13]] + Z[e[t + 14]] + Z[e[t + 15]]).toLowerCase();
}
//#endregion
//#region node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/rng.js
var NC = /* @__PURE__ */ new Uint8Array(16);
function PC() {
	return crypto.getRandomValues(NC);
}
//#endregion
//#region node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v4.js
function FC(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : IC(e, t, n);
}
function IC(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? PC();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return MC(r);
}
//#endregion
//#region libs/core/src/lib/adapter/annotation/style/annotation.style.default.ts
var LC = {
	backgroundColor: "#ff3b3b",
	backgroundOpacity: .3,
	borderColor: "#ff3b3b",
	borderOpacity: .6,
	borderWidth: 2,
	borderRadius: 6,
	tagTextColor: "#000000",
	tagBackgroundColor: "#ffffff",
	tagBackgroundOpacity: .1,
	tagBorderColor: "#ff3b3b",
	tagBorderOpacity: .6,
	tagBorderWidth: 1,
	gutterGap: 6,
	gutterWidth: 3
}, RC = {
	default: LC,
	hover: {
		borderWidth: 2,
		backgroundColor: "#cccccc",
		borderColor: "#cccccc",
		borderOpacity: .9
	},
	active: {
		backgroundOpacity: .8,
		borderOpacity: .9,
		borderWidth: 2
	},
	edit: {
		backgroundColor: "#ff3b3b",
		borderColor: "#ff3b3b",
		borderOpacity: .9,
		borderWidth: 2
	}
}, zC = (0, w.default)((e) => {
	let t = parseInt(e.slice(1), 16);
	return `${t >> 16 & 255},${t >> 8 & 255},${t & 255}`;
}), BC = (0, w.default)((e, t) => e === "transparent" ? "transparent" : `rgba(${zC(e)},${t})`), VC = (...e) => {
	let t = (t) => {
		for (let n of e) {
			let e = n?.[t];
			if (e !== void 0) return e;
		}
		throw Error(`value not found ${t}`);
	};
	return {
		generateColor: (e, n) => BC(t(e), t(n) ?? 1),
		getValue: t
	};
}, HC = (e, t) => {
	let n = (n) => {
		let r = VC(t?.[n] ?? {}, e?.[n] ?? {}, RC[n] ?? {}, RC.default ?? {});
		return {
			backgroundColor: r.generateColor("backgroundColor", "backgroundOpacity"),
			borderColor: r.generateColor("borderColor", "borderOpacity"),
			borderWidth: r.getValue("borderWidth"),
			borderRadius: r.getValue("borderRadius"),
			gutterWidth: r.getValue("gutterWidth"),
			gutterGap: r.getValue("gutterGap"),
			tagTextColor: r.getValue("tagTextColor"),
			tagBackgroundColor: r.generateColor("tagBackgroundColor", "tagBackgroundOpacity"),
			tagBorderColor: r.generateColor("tagBorderColor", "tagBorderOpacity"),
			tagBorderWidth: r.getValue("tagBorderWidth")
		};
	};
	return {
		default: n("default"),
		edit: n("edit"),
		hover: n("hover"),
		active: n("active")
	};
}, UC = "DEFAULT", WC = {
	styleFn: (e) => null,
	defaultStyle: UC
}, Q = class {
	constructor(e) {
		this.annotationModule = e, this.eventListener = this.inject(_t), this.internalEventListener = this.inject(Yo);
	}
	inject(e) {
		return this.annotationModule.inject(e);
	}
	getSnapper() {
		return this.annotationModule.getSnapper();
	}
	get textAdapter() {
		return this.annotationModule.getTextAdapter();
	}
	get annotationAdapter() {
		return this.annotationModule.getAnnotationAdapter();
	}
}, $ = class extends Q {
	constructor(e) {
		super(e), this.styleParams = WC, this.origStyleMap = /* @__PURE__ */ new Map();
	}
	registerStyle(e, t) {
		this.origStyleMap.set(e, t), this.annotationModule.getAllRenderInstances().forEach((n) => {
			n.annotationRenderStyle.registerStyle(e, t);
		});
	}
	updateAllStyles() {
		this.annotationModule.getAllRenderInstances().forEach((e) => {
			e.annotationRenderStyle.setDefaultStyleName(this.styleParams.defaultStyle), e.annotationRenderStyle.setStyleFn(this.styleParams.styleFn);
			for (let [t, n] of this.origStyleMap.entries()) e.annotationRenderStyle.registerStyle(t, n);
		});
	}
	setParams(e) {
		this.styleParams = SC(this.styleParams, e), this.updateAllStyles();
	}
}, GC = (e, t) => {
	let n = /* @__PURE__ */ new Map();
	t.forEach((e) => {
		let t = e._render.lines ?? [], r = t.length;
		t.forEach((t, i) => {
			let a = n.get(t.uuid) ?? [];
			a.push({
				annotation: e,
				height: r,
				index: i
			}), n.set(t.uuid, a);
		});
	});
	let r = 0;
	return e.forEach((e) => {
		if (!n.has(e.uuid)) return;
		let t = jC(n.get(e.uuid), (e) => -e.height), i = t.map((e) => e.annotation._render.weight).filter((e) => e !== void 0);
		t.forEach((e) => {
			if (e.index > 0) {
				!e.annotation._render.weight === void 0 && T.warn("no weight for annotation", e.annotation);
				return;
			}
			if (e.annotation._render.weight !== void 0) {
				T.warn("!!! weight for annotation already set?", e.annotation);
				return;
			}
			let t = 0;
			for (; e.annotation._render.weight === void 0;) i.includes(t) ? t++ : (i.push(t), e.annotation._render.weight = t), r < t && (r = t);
		});
	}), r;
};
//#endregion
//#region node_modules/.pnpm/quickselect@3.0.0/node_modules/quickselect/index.js
function KC(e, t, n = 0, r = e.length - 1, i = JC) {
	for (; r > n;) {
		if (r - n > 600) {
			let a = r - n + 1, o = t - n + 1, s = Math.log(a), c = .5 * Math.exp(2 * s / 3), l = .5 * Math.sqrt(s * c * (a - c) / a) * (o - a / 2 < 0 ? -1 : 1);
			KC(e, t, Math.max(n, Math.floor(t - o * c / a + l)), Math.min(r, Math.floor(t + (a - o) * c / a + l)), i);
		}
		let a = e[t], o = n, s = r;
		for (qC(e, n, t), i(e[r], a) > 0 && qC(e, n, r); o < s;) {
			for (qC(e, o, s), o++, s--; i(e[o], a) < 0;) o++;
			for (; i(e[s], a) > 0;) s--;
		}
		i(e[n], a) === 0 ? qC(e, n, s) : (s++, qC(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
	}
}
function qC(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
function JC(e, t) {
	return e < t ? -1 : +(e > t);
}
//#endregion
//#region node_modules/.pnpm/rbush@4.0.1/node_modules/rbush/index.js
var YC = class {
	constructor(e = 9) {
		this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * .4)), this.clear();
	}
	all() {
		return this._all(this.data, []);
	}
	search(e) {
		let t = this.data, n = [];
		if (!sw(e, t)) return n;
		let r = this.toBBox, i = [];
		for (; t;) {
			for (let a = 0; a < t.children.length; a++) {
				let o = t.children[a], s = t.leaf ? r(o) : o;
				sw(e, s) && (t.leaf ? n.push(o) : ow(e, s) ? this._all(o, n) : i.push(o));
			}
			t = i.pop();
		}
		return n;
	}
	collides(e) {
		let t = this.data;
		if (!sw(e, t)) return !1;
		let n = [];
		for (; t;) {
			for (let r = 0; r < t.children.length; r++) {
				let i = t.children[r], a = t.leaf ? this.toBBox(i) : i;
				if (sw(e, a)) {
					if (t.leaf || ow(e, a)) return !0;
					n.push(i);
				}
			}
			t = n.pop();
		}
		return !1;
	}
	load(e) {
		if (!(e && e.length)) return this;
		if (e.length < this._minEntries) {
			for (let t = 0; t < e.length; t++) this.insert(e[t]);
			return this;
		}
		let t = this._build(e.slice(), 0, e.length - 1, 0);
		if (!this.data.children.length) this.data = t;
		else if (this.data.height === t.height) this._splitRoot(this.data, t);
		else {
			if (this.data.height < t.height) {
				let e = this.data;
				this.data = t, t = e;
			}
			this._insert(t, this.data.height - t.height - 1, !0);
		}
		return this;
	}
	insert(e) {
		return e && this._insert(e, this.data.height - 1), this;
	}
	clear() {
		return this.data = cw([]), this;
	}
	remove(e, t) {
		if (!e) return this;
		let n = this.data, r = this.toBBox(e), i = [], a = [], o, s, c;
		for (; n || i.length;) {
			if (n || (n = i.pop(), s = i[i.length - 1], o = a.pop(), c = !0), n.leaf) {
				let r = XC(e, n.children, t);
				if (r !== -1) return n.children.splice(r, 1), i.push(n), this._condense(i), this;
			}
			!c && !n.leaf && ow(n, r) ? (i.push(n), a.push(o), o = 0, s = n, n = n.children[0]) : s ? (o++, n = s.children[o], c = !1) : n = null;
		}
		return this;
	}
	toBBox(e) {
		return e;
	}
	compareMinX(e, t) {
		return e.minX - t.minX;
	}
	compareMinY(e, t) {
		return e.minY - t.minY;
	}
	toJSON() {
		return this.data;
	}
	fromJSON(e) {
		return this.data = e, this;
	}
	_all(e, t) {
		let n = [];
		for (; e;) e.leaf ? t.push(...e.children) : n.push(...e.children), e = n.pop();
		return t;
	}
	_build(e, t, n, r) {
		let i = n - t + 1, a = this._maxEntries, o;
		if (i <= a) return o = cw(e.slice(t, n + 1)), ZC(o, this.toBBox), o;
		r || (r = Math.ceil(Math.log(i) / Math.log(a)), a = Math.ceil(i / a ** (r - 1))), o = cw([]), o.leaf = !1, o.height = r;
		let s = Math.ceil(i / a), c = s * Math.ceil(Math.sqrt(a));
		lw(e, t, n, c, this.compareMinX);
		for (let i = t; i <= n; i += c) {
			let t = Math.min(i + c - 1, n);
			lw(e, i, t, s, this.compareMinY);
			for (let n = i; n <= t; n += s) {
				let i = Math.min(n + s - 1, t);
				o.children.push(this._build(e, n, i, r - 1));
			}
		}
		return ZC(o, this.toBBox), o;
	}
	_chooseSubtree(e, t, n, r) {
		for (; r.push(t), !(t.leaf || r.length - 1 === n);) {
			let n = Infinity, r = Infinity, i;
			for (let a = 0; a < t.children.length; a++) {
				let o = t.children[a], s = nw(o), c = iw(e, o) - s;
				c < r ? (r = c, n = s < n ? s : n, i = o) : c === r && s < n && (n = s, i = o);
			}
			t = i || t.children[0];
		}
		return t;
	}
	_insert(e, t, n) {
		let r = n ? e : this.toBBox(e), i = [], a = this._chooseSubtree(r, this.data, t, i);
		for (a.children.push(e), $C(a, r); t >= 0 && i[t].children.length > this._maxEntries;) this._split(i, t), t--;
		this._adjustParentBBoxes(r, i, t);
	}
	_split(e, t) {
		let n = e[t], r = n.children.length, i = this._minEntries;
		this._chooseSplitAxis(n, i, r);
		let a = this._chooseSplitIndex(n, i, r), o = cw(n.children.splice(a, n.children.length - a));
		o.height = n.height, o.leaf = n.leaf, ZC(n, this.toBBox), ZC(o, this.toBBox), t ? e[t - 1].children.push(o) : this._splitRoot(n, o);
	}
	_splitRoot(e, t) {
		this.data = cw([e, t]), this.data.height = e.height + 1, this.data.leaf = !1, ZC(this.data, this.toBBox);
	}
	_chooseSplitIndex(e, t, n) {
		let r, i = Infinity, a = Infinity;
		for (let o = t; o <= n - t; o++) {
			let t = QC(e, 0, o, this.toBBox), s = QC(e, o, n, this.toBBox), c = aw(t, s), l = nw(t) + nw(s);
			c < i ? (i = c, r = o, a = l < a ? l : a) : c === i && l < a && (a = l, r = o);
		}
		return r || n - t;
	}
	_chooseSplitAxis(e, t, n) {
		let r = e.leaf ? this.compareMinX : ew, i = e.leaf ? this.compareMinY : tw;
		this._allDistMargin(e, t, n, r) < this._allDistMargin(e, t, n, i) && e.children.sort(r);
	}
	_allDistMargin(e, t, n, r) {
		e.children.sort(r);
		let i = this.toBBox, a = QC(e, 0, t, i), o = QC(e, n - t, n, i), s = rw(a) + rw(o);
		for (let r = t; r < n - t; r++) {
			let t = e.children[r];
			$C(a, e.leaf ? i(t) : t), s += rw(a);
		}
		for (let r = n - t - 1; r >= t; r--) {
			let t = e.children[r];
			$C(o, e.leaf ? i(t) : t), s += rw(o);
		}
		return s;
	}
	_adjustParentBBoxes(e, t, n) {
		for (let r = n; r >= 0; r--) $C(t[r], e);
	}
	_condense(e) {
		for (let t = e.length - 1, n; t >= 0; t--) e[t].children.length === 0 ? t > 0 ? (n = e[t - 1].children, n.splice(n.indexOf(e[t]), 1)) : this.clear() : ZC(e[t], this.toBBox);
	}
};
function XC(e, t, n) {
	if (!n) return t.indexOf(e);
	for (let r = 0; r < t.length; r++) if (n(e, t[r])) return r;
	return -1;
}
function ZC(e, t) {
	QC(e, 0, e.children.length, t, e);
}
function QC(e, t, n, r, i) {
	i ||= cw(null), i.minX = Infinity, i.minY = Infinity, i.maxX = -Infinity, i.maxY = -Infinity;
	for (let a = t; a < n; a++) {
		let t = e.children[a];
		$C(i, e.leaf ? r(t) : t);
	}
	return i;
}
function $C(e, t) {
	return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
}
function ew(e, t) {
	return e.minX - t.minX;
}
function tw(e, t) {
	return e.minY - t.minY;
}
function nw(e) {
	return (e.maxX - e.minX) * (e.maxY - e.minY);
}
function rw(e) {
	return e.maxX - e.minX + (e.maxY - e.minY);
}
function iw(e, t) {
	return (Math.max(t.maxX, e.maxX) - Math.min(t.minX, e.minX)) * (Math.max(t.maxY, e.maxY) - Math.min(t.minY, e.minY));
}
function aw(e, t) {
	let n = Math.max(e.minX, t.minX), r = Math.max(e.minY, t.minY), i = Math.min(e.maxX, t.maxX), a = Math.min(e.maxY, t.maxY);
	return Math.max(0, i - n) * Math.max(0, a - r);
}
function ow(e, t) {
	return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
}
function sw(e, t) {
	return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
}
function cw(e) {
	return {
		children: e,
		height: 1,
		leaf: !0,
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity
	};
}
function lw(e, t, n, r, i) {
	let a = [t, n];
	for (; a.length;) {
		if (n = a.pop(), t = a.pop(), n - t <= r) continue;
		let o = t + Math.ceil((n - t) / r / 2) * r;
		KC(e, o, t, n, i), a.push(t, o, o, n);
	}
}
//#endregion
//#region libs/core/src/lib/compute/utils/annotation.overlap.ts
var uw = class e {
	static init(t) {
		return new e(t);
	}
	constructor(e) {
		this.tree = new YC(), this.annotationById = /* @__PURE__ */ new Map();
		let t = e.map((e) => (this.annotationById.set(e.id, e), this.toRBushItem(e)));
		this.tree.load(t);
	}
	toRBushItem(e) {
		return {
			minX: e.start,
			maxX: e.end,
			minY: 0,
			maxY: 0,
			annotation: e
		};
	}
	overlaps(e, t) {
		return e.start < t.end && t.start < e.end;
	}
	findCandidates(e) {
		return e.start === e.end ? [] : this.tree.search({
			minX: e.start,
			maxX: e.end,
			minY: 0,
			maxY: 0
		});
	}
	isMatchingCandidate(e, t) {
		return e.annotation.id !== t.id && this.overlaps(t, e.annotation);
	}
	getOverlaps(e) {
		return this.findCandidates(e).filter((t) => this.isMatchingCandidate(t, e)).map((e) => e.annotation);
	}
	hasOverlap(e) {
		return this.findCandidates(e).some((t) => this.isMatchingCandidate(t, e));
	}
}, dw = (e, t, n = !0) => {
	if (e.start === t.start) {
		let r = n ? -1 : 1, i = n ? 1 : -1;
		return t.end < e.end ? r : i;
	}
	return e.start < t.start ? -1 : 1;
}, fw = class e {
	static calculate(t, n) {
		return new e(t, n);
	}
	constructor(e, t) {
		this.annotations = e, this.annotationRenders = t, this.totalMaxWeight = 0, this.annotationOverlap = uw.init(e), e.forEach((e) => {
			e._render.weight = null;
		});
		let n = this.assignWeights();
		this.renderWeights = n.renderWeights, this.renderOrder = n.renderOrders, this.calculateBasedOnRenderOrder();
	}
	assignWeights() {
		let e = /* @__PURE__ */ new Map(), t = {};
		e.set(0, []), this.annotationRenders.forEach((n) => {
			t[n.name] = n.weightOrder, e.set(n.weightOrder, []);
		}), this.annotations.forEach((n) => {
			let r = t[n._render.render] ?? 0;
			e.get(r)?.push(n), n._render.lines.forEach((e) => this.resetLineMaxWeight(e));
		});
		let n = [];
		for (let [t, r] of e.entries()) r.length > 0 && n.push(t);
		return {
			renderOrders: n,
			renderWeights: e
		};
	}
	calculateBasedOnRenderOrder() {
		this.renderOrder.forEach((e, t) => {
			this.calculateAnnotationArray(this.renderWeights.get(e), t);
		});
	}
	calculateAnnotationArray(e, t) {
		e.sort(dw).forEach((e) => {
			let n = 0;
			this.annotationOverlap.hasOverlap(e) && (n = (xC(this.annotationOverlap.getOverlaps(e), (e) => e._render.weight)?._render.weight ?? t - 1) + 1), e._render.weight = n, this.setTotalMaxWeight(n), e._render.lines.forEach((e) => this.setMaxWeightForLine(e, n));
		});
	}
	setMaxWeightForLine(e, t) {
		t > (e.maxLineWeight ?? 0) && (e.maxLineWeight = t);
	}
	setTotalMaxWeight(e) {
		e > this.totalMaxWeight && (this.totalMaxWeight = e);
	}
	resetLineMaxWeight(e) {
		e.maxLineWeight = e.maxLineWeight ?? 0;
	}
	get maxWeight() {
		return this.totalMaxWeight;
	}
}, pw = class {
	constructor() {
		this.originalAnnotationsMap = /* @__PURE__ */ new Map(), this.parsedAnnotationsMap = /* @__PURE__ */ new Map(), this.gutter = {
			maxWeight: 0,
			paddingLeft: 0
		}, this.positions = {
			minStartPosition: 0,
			maxStartPosition: 0
		}, this.getAnnotationsSortedBy = Object.assign(() => this.getAnnotations(), { sortBy: (e) => e === "weight" ? this.getSortedByWeightAnnotations() : this.getAnnotations() });
	}
	getAnnotations() {
		return Array.from(this.parsedAnnotationsMap.values());
	}
	getSortedByWeightAnnotations() {
		return this.getAnnotations().sort((e, t) => t._render.weight - e._render.weight);
	}
	addAnnotation(e, t, n) {
		this.originalAnnotationsMap.set(e, t), this.parsedAnnotationsMap.set(e, n);
	}
	getOriginalAnnotation(e) {
		return this.originalAnnotationsMap.get(e);
	}
	clear() {
		this.originalAnnotationsMap.clear(), this.parsedAnnotationsMap.clear();
	}
	getParsedAnnotation(e) {
		return this.parsedAnnotationsMap.get(e);
	}
	calculateWeights(e, t) {
		this.calculateGutterWeights(e, t), this.calculateTextAnnotationsWeight(e, t);
	}
	calculateGutterWeights(e, t) {
		let n = this.getAnnotations().filter((e) => e._render.isGutter);
		GC(e, n);
		let r = xC(n, (e) => e._render.weight)?._render.weight ?? 0, i = t.getGutterRenders().map((e) => e.annotationRenderStyle.getDefaultStyle().default), a = (xC(i, (e) => e.gutterWidth)?.gutterWidth ?? 0) + (xC(i, (e) => e.gutterGap)?.gutterGap ?? 0);
		this.gutter = {
			maxWeight: r,
			paddingLeft: a * r
		};
	}
	calculateTextAnnotationsWeight(e, t) {
		let n = this.getAnnotations().filter((e) => !e._render.isGutter);
		fw.calculate(n, t.getTextRenders());
	}
	addDrawAnnotations(e, t, n) {
		let r = this.getParsedAnnotation(e);
		r._drawMetadata.draws = t, r._drawMetadata.dimensions = n;
	}
	clearDrawAnnotation() {
		this.parsedAnnotationsMap.forEach((e) => {
			e._drawMetadata.draws = [], e._drawMetadata.dimensions = void 0;
		});
	}
}, mw = {
	highlight: "highlight",
	underline: "underline",
	gutter: "gutter"
}, hw = class {
	setModule(e) {
		this.annotationModule = e, this.svgModel = e.inject(Jo);
	}
	inject(e) {
		return this.annotationModule.inject(e);
	}
	get textAdapter() {
		return this.annotationModule.getTextAdapter();
	}
	get annotationAdapter() {
		return this.annotationModule.getAnnotationAdapter();
	}
}, gw = class {
	constructor(e = {}) {
		this.defaultStyle = e, this.styleMap = /* @__PURE__ */ new Map(), this.defaultStyleName = UC, this.styleFn = WC.styleFn, this.styleMap.set(UC, HC({}, this.defaultStyle));
	}
	registerStyle(e, t) {
		this.styleMap.set(e, HC(this.defaultStyle, t));
	}
	getDefaultStyle() {
		let e = this.styleMap.get(this.defaultStyleName) ?? this.styleMap.get("DEFAULT");
		return e ||= HC({}, this.defaultStyle), e;
	}
	setDefaultStyleName(e) {
		if (!this.styleMap.has(e)) {
			T.warn("Style not found: " + e + ". Default style name remains unchanged.");
			return;
		}
		this.defaultStyleName = e;
	}
	setStyleFn(e) {
		this.styleFn = e;
	}
	getStyle(e) {
		if (!e) return this.getDefaultStyle();
		let t = this.styleFn(e);
		return t === null ? (T.verbose("StyleInstances", "No style specified for annotation, returning default style."), this.getDefaultStyle()) : typeof t == "string" ? this.styleMap.get(t) || (T.warn("Style not found: " + t + ". Returning default style."), this.defaultStyle) : HC(this.defaultStyle, t);
	}
	updateDefaultStyle(e) {
		this.defaultStyle = SC(oS(this.defaultStyle), oS(e));
	}
}, _w = class extends hw {
	constructor(e, t, n) {
		super(), this.name = e, this.annotationRenderStyle = new gw({
			default: SC(oS(t.default), oS(n.default)),
			edit: SC(oS(t.edit), oS(n.edit)),
			active: SC(oS(t.active), oS(n.active)),
			hover: SC(oS(t.hover), oS(n.hover))
		});
	}
	getStyle(e) {
		return this.annotationRenderStyle.getStyle(e);
	}
}, vw = {
	hover: { color: {
		border: "rgba(100, 100, 100, 0.5)",
		fill: "rgba(1, 1, 1, 0.1)"
	} },
	edit: { color: { border: "rgba(255,0,0,0.9)" } }
}, yw = (e, t) => {
	let n = e.start - t.start, r = e.end - t.start;
	return n < 0 && (n = 0), {
		start: n,
		end: r
	};
}, bw = (e, t, n) => {
	let r = n.element;
	if (!r) return T.debug("getRange", `No textElement for line ${n.lineNumber} found for annotation ${t.id}`), null;
	let { start: i, end: a } = yw(t, n);
	return a < 0 ? null : xw(e, r, i, a);
}, xw = (e, t, n, r) => {
	if (!t) return [];
	if (t.childNodes?.length > 0) {
		let i = 0, a = [];
		for (let o of t.childNodes) {
			if (i > r) break;
			let t = o.textContent.length, s = xw(e, o, n - i, r - i);
			i += t, a.push(...s);
		}
		return a;
	}
	let i = t.textContent.length;
	if (n < 0 && (n = 0), n >= i) return [];
	let a = Math.min(i, r), o = document.createRange();
	return o.setStart(t, n), o.setEnd(t, a), Array.from(o.getClientRects()).map((t) => ({
		original: {
			x: t.x,
			y: t.y,
			height: t.height,
			width: t.width
		},
		dimensions: Go(e, t)
	})).flat();
}, Sw = (e, t, n, r) => ({ fill: `M${e},${t} 
          H${e + n} 
          V${t + r} 
          H${e} 
          Z` }), Cw = (e, t, n) => {
	let r = n._style.default.gutterWidth, i = n._style.default.gutterGap;
	if (!n._render.lines || n._render.lines.length === 0) return T.warn("no lines to render for annotation", n), {
		draws: [],
		dimensions: void 0
	};
	let a = e.maxGutterWeight - n._render.weight, o = {
		x: (r + i) * a,
		y: -1,
		height: 0
	};
	return (n._render.lines ?? []).forEach((e) => {
		let r = bw(t, n, e);
		if (!r?.length || r.length === 0) return;
		let i = r[0], a = r[r?.length - 1];
		o.x < 0 && (o.x = i.dimensions.x), o.y < 0 && (o.y = i.dimensions.y), o.height = a.dimensions.y + a.dimensions.height;
	}), {
		draws: [{
			weight: n._render.weight,
			uuid: FC(),
			annotationUuid: n.id,
			lineNumber: 0,
			path: Sw(o.x, o.y, r, o.height),
			draggable: {},
			height: o
		}],
		dimensions: {
			x: o.x,
			y1: o.y,
			y2: o.y + o.height
		}
	};
}, ww = (e, t = {}) => ({
	borderColor: "transparent",
	backgroundColor: e,
	tagBorderColor: e,
	borderOpacity: 0,
	borderRadius: 0,
	...t
}), Tw = { default: ww(LC.backgroundColor) }, Ew = class extends _w {
	constructor(e, t = {}) {
		super(e, Tw, t), this.weightOrder = 1, this.isGutter = !0, this.renderTag = !1;
	}
	createDraws(e) {
		let t = this.svgModel.getTextElementDimensions();
		return Cw({
			textDirection: this.textAdapter.textDirection,
			maxGutterWeight: this.annotationAdapter.gutter.maxWeight
		}, t, e);
	}
}, Dw = class extends _w {
	constructor(e, t, n) {
		super(e, t, n), this.borders = !0, this.fillBg = !0;
	}
	createDraws(e) {
		let t = this.svgModel.getTextElementDimensions(), n = this.textAdapter.textDirection, r = this.textAdapter.style, i = e._style.default.borderRadius, a = [], o = r.lineOffset / 2, s = r.padding * e._render.weight, c = s * 2, l = r.lineHeight + s * 2, u, d = e._render.lines ?? [];
		return d.forEach((r, f) => {
			let p = bw(t, e, r), m = d[f - 1]?.end, h = !m || m <= e.start, g = d[f + 1]?.start, _ = !g || e.end < g;
			p?.forEach((t, d) => {
				let f = t.dimensions, m = f.height + c;
				m < l && (m = l);
				let g = f.x, v = f.y - s - o, y = h && d === 0, b = d === p.length - 1 && _;
				if (n === "rtl") {
					let e = b;
					b = y, y = e;
				}
				u ||= {
					x: g,
					y1: v,
					y2: v + m
				}, a.push({
					weight: e._render.weight,
					uuid: FC(),
					annotationUuid: e.id,
					lineNumber: r.lineNumber,
					path: this.createPath({
						x: g,
						y: v,
						width: f.width,
						height: m,
						r: i,
						leftBorder: y,
						rightBorder: b
					}),
					draggable: {
						start: y ? {
							x: g,
							y: v,
							height: m
						} : void 0,
						end: b ? {
							x: g + f.width,
							y: v,
							height: m
						} : void 0
					},
					height: {
						x: g,
						y: v,
						height: m
					}
				});
			});
		}), a || console.warn(`No draws for annotation ${e.id}`), {
			draws: a,
			dimensions: u
		};
	}
}, Ow = (0, w.default)((e, t, n, r, i) => [
	`H${n - i}`,
	`A${i},${i} 0 0 1 ${n},${t + i}`,
	`V${r - i}`,
	`A${i},${i} 0 0 1 ${n - i},${r}`
]), kw = (0, w.default)((e, t, n, r) => [
	`H${e + r}`,
	`A${r},${r} 0 0 1 ${e},${n - r}`,
	`V${t + r}`,
	`A${r},${r} 0 0 1 ${e + r},${t}`
]), Aw = ({ x: e, y: t, width: n, height: r, r: i, leftBorder: a, rightBorder: o }) => {
	let s = e + n, c = t + r, l = [`M${e + (a ? i : 0)},${t}`];
	return o ? l.push(Ow(e, t, s, c, i)) : l.push(Ow(e, t, s, c, 0)), a ? l.push(kw(e, t, c, i)) : l.push(kw(e, t, c, 0)), l.flat().join(" ");
}, jw = ({ x: e, y: t, width: n, height: r, r: i, leftBorder: a, rightBorder: o }) => {
	let s = e + n, c = t + r, l = [`M${e + (a ? i : 0)},${t}`], u = a ? e + i : e;
	return o ? (l.push(Ow(e, t, s, c, i)), l.push(`H${u}`)) : l.push([
		`M${u},${t}`,
		`H${s}`,
		`M${s},${c}`
	]), a ? l.push(kw(e, t, c, i)) : l.push(`H${e}`), l.flat().join(" ");
}, Mw = (e) => ({
	border: jw(e),
	fill: Aw(e)
}), Nw = (e, t = {}) => ({
	backgroundColor: e,
	borderColor: e,
	tagBorderColor: e,
	...t
}), Pw = class extends Dw {
	constructor(e, t = {}) {
		super(e, {}, t), this.weightOrder = 1, this.isGutter = !1, this.renderTag = !0;
	}
	createPath(e) {
		return Mw(e);
	}
}, Fw = (0, w.default)((e, t, n, r) => `M${e} ${t + r} h ${n}`), Iw = (e) => {
	let t = Aw(e), { x: n, y: r, height: i, width: a } = e;
	return {
		border: Fw(n, r, a, i),
		fill: t
	};
}, Lw = (e, t = {}) => ({
	backgroundColor: "transparent",
	borderColor: e,
	tagBorderColor: e,
	backgroundOpacity: 0,
	borderRadius: 0,
	...t
}), Rw = {
	default: Lw(LC.backgroundColor),
	hover: { borderWidth: 4 }
}, zw = class extends Dw {
	constructor(e, t = {}) {
		super(e, Rw, t), this.weightOrder = 2, this.isGutter = !1, this.renderTag = !0, this.fillBg = !1;
	}
	createPath(e) {
		return Iw(e);
	}
}, Bw = class extends Q {
	constructor(e) {
		super(e), this.renderParams = {
			defaultRenderer: mw.highlight,
			styleFn: (e) => null,
			renderFn: (e) => null
		}, this.annotationModule.registerRender(mw.highlight, () => new Pw(mw.highlight)), this.annotationModule.registerRender(mw.gutter, () => new Ew(mw.gutter)), this.annotationModule.registerRender(mw.underline, () => new zw(mw.underline)), this.annotationModule.inject($).updateAllStyles();
	}
	setParams(e) {
		this.renderParams = SC(this.renderParams, e);
	}
	get defaultRenderer() {
		return this.renderParams.defaultRenderer;
	}
	getRenders() {
		return this.annotationModule.getAllRenderInstances();
	}
	getGutterRenders() {
		return Array.from(this.getRenders()).filter((e) => e.isGutter);
	}
	getTextRenders() {
		return Array.from(this.getRenders()).filter((e) => !e.isGutter);
	}
	getDefaultRenderer() {
		if (this.annotationModule.hasRender(this.defaultRenderer)) return this.annotationModule.injectRender(this.defaultRenderer);
		throw Error("Default renderer not found: " + this.defaultRenderer);
	}
	getRenderer(e) {
		let t = this.renderParams.renderFn?.(e);
		if (t ||= (T.verbose("RenderInstances", "Fallback to default renderer as no render was specified for annotation.", e), this.defaultRenderer), this.annotationModule.hasRender(t)) return this.annotationModule.injectRender(t);
		if (t === this.defaultRenderer) throw Error("Default renderer not found: " + this.defaultRenderer);
		return T.warn("RenderInstances", `Renderer "${t}" not found for annotation. fallback to default renderer: [${this.defaultRenderer}]`), this.annotationModule.injectRender(this.defaultRenderer);
	}
	get highlightInstance() {
		return this.annotationModule.injectRender("highlight");
	}
	createDraws(e) {
		let t = e._render.render;
		return this.annotationModule.injectRender(t).createDraws(e);
	}
}, Vw = class extends hw {
	constructor(e) {
		super(), this.setParams(e);
	}
}, Hw = U({
	start: V(),
	end: V(),
	text: z(),
	gutter: z().optional()
}), Uw = Hw.extend({
	lineNumber: V(),
	uuid: z().default(FC),
	maxLineWeight: V().default(0),
	flatText: z(),
	html: z(),
	element: Jm().optional()
}), Ww = U({
	border: z().optional(),
	fill: z().optional()
}), Gw = U({
	height: V(),
	x: V(),
	y: V()
}), Kw = U({
	x: V(),
	y1: V(),
	y2: V()
}), qw = U({
	uuid: z(),
	annotationUuid: W([z(), V()]),
	lineNumber: V(),
	path: Ww,
	draggable: U({
		start: Gw.optional(),
		end: Gw.optional()
	}),
	height: Gw,
	weight: V()
}), Jw = U({
	draws: H(qw).default([]),
	dimensions: Kw.optional()
}), Yw = U({
	label: z(),
	padding: V(),
	fontSize: V()
}), Xw = W([G("gutter"), G("text")]), Zw = W([z(), V()]), Qw = U({
	id: Zw,
	start: V(),
	end: V(),
	label: z().optional(),
	textSelection: z().optional()
}), $w = U({ renderStyle: Jm() }), eT = U({
	backgroundColor: z(),
	borderColor: z(),
	borderRadius: V(),
	borderWidth: V(),
	gutterWidth: V(),
	gutterGap: V(),
	tagTextColor: z(),
	tagBorderColor: z(),
	tagBackgroundColor: z(),
	tagBorderWidth: V()
}), tT = U({
	default: eT,
	edit: eT,
	active: eT,
	hover: eT
}), nT = U({
	weight: V().optional().nullish(),
	isGutter: Wm(),
	render: z(),
	lines: H(Uw).default([])
}), rT = Qw.extend({
	_render: nT,
	_style: tT,
	_drawMetadata: Jw,
	_tagMetadata: Yw.nullish()
}), iT = U({
	border: z().optional(),
	background: z().optional(),
	borderActive: z().optional(),
	backgroundActive: z().optional(),
	gutterColor: z().optional(),
	color: z().optional(),
	tagBackground: z().optional(),
	tagColor: z().optional()
}), aT = class extends Q {
	setTagFn(e) {
		this.tagFn = e;
	}
	getTagConfig(e, t) {
		if (!this.tagFn || !t.renderTag) return null;
		let n = this.tagFn(e);
		return n ? Yw.parse({
			label: n,
			padding: 1,
			fontSize: 8
		}) : null;
	}
}, oT = { text: { handleRadius: 6 } }, sT = class extends Vw {
	constructor(...e) {
		super(...e), this.annotationCache = new pw(), this.annotations = this.annotationCache.getAnnotationsSortedBy;
	}
	setModule(e) {
		super.setModule(e), this.styleInstance = this.inject($), this.renderInstance = this.inject(Bw), this.tagRenderer = this.inject(aT);
	}
	parse(e) {
		let t = this._parse(e);
		if (!t) return null;
		let n = this.renderInstance.getRenderer(e), r = nT.parse({
			weight: void 0,
			isGutter: n.isGutter,
			render: n.name
		}), i = Jw.parse({}), a = n.getStyle(e), o = tT.parse(a), s = rT.parse({
			...t,
			_render: r,
			_style: o,
			_tagMetadata: this.tagRenderer.getTagConfig(e, n),
			_drawMetadata: i
		});
		return this.addAnnotation(t.id, e, s), s;
	}
	hover(e) {
		return !0;
	}
	createAnnotation(e) {
		let t = this.renderInstance.highlightInstance, n = t.annotationRenderStyle.getDefaultStyle(), r = nT.parse({
			weight: 0,
			isGutter: t.isGutter,
			render: t.name
		}), i = Jw.parse({}), a = tT.parse(n);
		return rT.parse({
			_render: r,
			_drawMetadata: i,
			_style: a,
			id: FC(),
			start: e,
			end: e + 1
		});
	}
	setParams(e) {
		this.edit = e.edit ?? this.edit ?? !1, this.create = e.create ?? this.create ?? !1, this.config = SC(oS(this.config ?? oT), e.config), this.startOffset = e.startOffset ?? this.startOffset ?? 0;
	}
	getOriginalAnnotation(e) {
		return this.annotationCache.getOriginalAnnotation(e);
	}
	getAnnotation(e) {
		return this.annotationCache.getParsedAnnotation(e);
	}
	addDrawAnnotations(e, t, n) {
		return this.annotationCache.addDrawAnnotations(e, t, n);
	}
	addAnnotation(e, t, n) {
		this.annotationCache.addAnnotation(e, t, n);
	}
	clear() {
		this.annotationCache.clear();
	}
	clearDraws() {
		return this.annotationCache.clearDrawAnnotation();
	}
	calculateWeights(e) {
		return this.annotationCache.calculateWeights(e, this.renderInstance);
	}
	get gutter() {
		return this.annotationCache.gutter;
	}
	get position() {
		return this.annotationCache.positions;
	}
}, cT = (0, w.default)((e, t, n, r, i = 10) => {
	let a = t - r, o = a - i;
	o < 0 && (o = 0);
	let s = n - r + 1, c = s + i;
	return c > e.length && (c = e.length), {
		prefix: e.substring(o, a),
		exact: e.substring(a, s),
		suffix: e.substring(s, c)
	};
}), lT = class extends sT {
	constructor(e = {}) {
		super(e), this.name = "W3CAnnotationAdapter", this.w3cBuilderMap = /* @__PURE__ */ new Map();
	}
	setParams(e) {
		this.sourceUri = e.sourceUri ?? this.sourceUri, this.language = e.language ?? this.language, super.setParams(e);
	}
	_parse(e) {
		let t = Dg(e), n = t.getTextPositionSelector(this.sourceUri)[0];
		return n ? (this.w3cBuilderMap.set(e.id, t), Qw.parse({
			id: e.id,
			start: n.start,
			end: n.end
		})) : null;
	}
	format(e, t, n) {
		if (!e) return null;
		let r = this.getOriginalAnnotation(e.id);
		if (!t && !n) return r;
		if (!t && !e.id) throw Error("annotation id is required");
		let i = t ? Dg() : this.w3cBuilderMap.get(e.id);
		if (!i) throw Error(`No builder found for annotation ${e.id}. This should not happen.`);
		let a = this.sourceUri ?? "";
		t && i.setId(`new:annotation:${e.id}`), i.getSpecificResourceTargets(a).length || i.setTarget({
			type: "SpecificResource",
			language: this.language,
			source: a,
			textDirection: this.textAdapter.textDirection ?? "ltr"
		}), i.updateTextPositionSelector({
			start: e.start,
			end: e.end
		}, a);
		let o = cT(this.textAdapter.fullFlatText, e.start, e.end, this.startOffset);
		i.updateTextQuoteSelector({
			prefix: o.prefix,
			suffix: o.suffix,
			exact: o.exact
		}, a);
		let s = i.build();
		return this.w3cBuilderMap.set(e.id, i), this.addAnnotation(e.id, s, e), s;
	}
}, uT = (e = {}) => new lT(e), dT = class extends sT {
	constructor(...e) {
		super(...e), this.name = "DefaultAnnotationAdapter";
	}
	_parse(e) {
		let t = Qw.safeParse(e);
		return t.success ? t.data : (T.warn(e, t.error), e);
	}
	format(e, t, n) {
		if (!e) return null;
		let r = this.getOriginalAnnotation(e.id);
		if (!n) return r;
		let i = cT(this.textAdapter.fullFlatText, e.start, e.end, this.startOffset), a = Qw.safeParse({
			...e,
			text: i.exact,
			suffix: i.suffix,
			prefix: i.prefix
		}), o;
		return a.success ? o = a.data : (T.warn(e, a.error), o = e), o = {
			...r ?? {},
			...o
		}, this.addAnnotation(e.id, o, e), o;
	}
}, fT = (e = {}) => new dT(e), pT = (0, w.default)((e, t, n, r, i) => {
	let a = e + 4;
	return {
		rectDimensions: {
			x: a,
			y: t - r / 2,
			width: n + i * 2,
			height: r + i * 2
		},
		textDimensions: {
			x: a + i,
			y: t + i
		}
	};
}), mT = (e, t, n) => {
	let r = t.append("text").attr("font-size", n).text(e), i = r.node()?.getBBox(), a = i?.width || 0, o = i?.height || 0;
	return r.remove(), {
		textWidth: a,
		textHeight: o
	};
}, hT = (e) => !(!e._tagMetadata || !e._drawMetadata.dimensions), gT = (e, t) => {
	let n = t._tagMetadata;
	if (!n) return;
	let r = t._drawMetadata.dimensions;
	if (!r) return;
	let i = t._style.default, a = {
		x: r.x,
		y: r.y2
	}, o = e.append("g").attr(D.ANNOTATION_UID, t.id).attr(D.ANNOTATION_ROLE, qo.TAG), s = `${n.fontSize}px`, c = n.padding, { textWidth: l, textHeight: u } = mT(n.label, o, n.fontSize), { rectDimensions: d, textDimensions: f } = pT(a.x, a.y, l, u, c);
	o.append("rect").attr(D.ANNOTATION_UID, t.id).attr(D.ANNOTATION_ROLE, qo.TAG).attr("x", d.x).attr("y", d.y).attr("width", d.width).attr("height", d.height).attr("fill", "white").attr("pointer-events", "none").attr("rx", 3), o.append("rect").attr(D.ANNOTATION_UID, t.id).attr(D.ANNOTATION_ROLE, qo.TAG).attr("x", d.x).attr("y", d.y).attr("width", d.width).attr("height", d.height).attr("fill", i.tagBackgroundColor ?? "none").attr("stroke", i.tagBorderColor ?? "none").attr("stroke-width", i.tagBorderWidth ?? 0).attr("pointer-events", "none").attr("rx", 3), o.append("text").attr("x", f.x).attr("y", f.y).attr("dominant-baseline", "central").attr("font-size", s).attr("pointer-events", "none").attr("fill", i.tagTextColor).text(n.label);
}, _T = class extends Q {
	constructor(...e) {
		super(...e), this.svgModel = super.inject(Jo);
	}
	drawAll() {
		this.annotationAdapter.annotations().forEach((e) => this.drawTag(e));
	}
	drawTag(e) {
		let t = this.svgModel.tagSvg;
		return hT(e) ? (this.removeTag(e.id), gT(t, e), !0) : !1;
	}
	removeTag(e) {
		this.svgModel?.findTags(e)?.remove();
	}
}, vT = {
	padding: 6,
	lineOffset: 2,
	lineHeight: 22
}, yT = class extends Vw {
	constructor(...e) {
		super(...e), this.TYPE = "TextAdapter", this.lines = [];
	}
	parse(e, t) {
		let n = this._parse(e, t);
		return this.lines = n.lines, this.fullFlatText = n.flatText, this.lines;
	}
	getLimit(e) {
		return this.limit ? (e ??= this.lines, this.limit.ignoreLines || e.length === 0 ? AC(this.limit, ["start", "end"]) : {
			start: Math.min(this.limit.start, e[0].start),
			end: Math.max(this.limit.end, e[e.length - 1].end)
		}) : null;
	}
	setLines(e) {
		this.lines = e, this.clear();
	}
	setLineHeight(e) {
		this.style = {
			...this.style,
			lineHeight: e
		};
	}
	setParams(e) {
		this.textDirection = e.textDirection ?? this.textDirection ?? "ltr", this.flatText = e.flatText ?? this.flatText ?? !1, this.style = Object.assign(this.style ?? { ...vT }, e.style ?? {}), this.limit = e.limit === null ? null : e.limit ?? this.limit;
	}
	getLine(e) {
		return this.lines.find((t) => t.uuid === e);
	}
	clear() {
		this.textLength = 0, this.lines.forEach((e) => {
			this.textLength < e.end && (this.textLength = e.end);
		});
	}
}, bT = (0, w.default)((e, t) => t <= e ? 0 : t - e), xT = (0, w.default)((e, t, n) => t <= n ? t - e : n - e), ST = (e, t) => ({
	start: bT(e.start, t.start),
	end: xT(e.start, e.end, t.end)
}), CT = (e, t, n) => {
	if (!t) return Uw.parse(e);
	if (!ht(e, t)) return null;
	if (!t.ignoreLines) return Uw.parse(e);
	let r = e;
	if (r.start < t.start) {
		let e = ST(r, t);
		r = n(r, t.start, r.end, e);
	}
	if (r.end > t.end) {
		let e = ST(r, t);
		r = n(r, r.start, t.end, e);
	}
	return Uw.parse(r);
}, wT = (e, t, n) => e.map((e) => CT(e, t, n)).filter(Boolean), TT = (0, w.default)((e, t) => {
	let n = e?.split("\n") ?? [""], r = t;
	return n.map((e, t) => {
		let n = r + e.length + 1, i = Uw.parse({
			lineNumber: t,
			start: r,
			end: n,
			id: `line-${t}`,
			text: e,
			html: `${e}`,
			flatText: e
		});
		return r = n, i;
	});
}), ET = (e, t, n, r) => {
	let i = e.flatText.substring(r.start, r.end);
	return Uw.parse({
		...e,
		text: i,
		flatText: i,
		html: i,
		start: t,
		end: n
	});
}, DT = (e, t, n) => wT(TT(e, n), t, ET), OT = class extends yT {
	constructor(...e) {
		super(...e), this.name = "PlainTextAdapter_" + Date.now();
	}
	_parse(e) {
		return {
			lines: DT(e, this.limit, this.annotationAdapter.startOffset),
			flatText: e
		};
	}
}, kT = (e = {}) => new OT(e), AT = (0, w.default)((e, t) => {
	e = e.replace(/\r\n/g, "\n").replace(/\u000b/g, "\n");
	let n = /^([0-9/]+[a-z]?)\./g, r = t, i, a, o = e.split("\n"), s = [];
	for (let e = 0; e < o.length; e++) {
		i = r + (o[e].length - 1);
		let t = o[e].match(n);
		a = t ? t[0] : "";
		let c = r + a.length, l = Math.max(i, c), u = o[e].replace(n, ""), d = Uw.parse({
			gutter: a,
			text: u,
			start: c,
			end: l,
			id: `line-${e}`,
			html: u,
			flatText: u,
			lineNumber: e
		});
		s.push(d), r = i + 2;
	}
	return s;
}), jT = (e, t, n, r) => {
	let i = e.flatText.substring(r.start, r.end);
	return Uw.parse({
		...e,
		text: i,
		flatText: i,
		html: i,
		start: t,
		end: n
	});
}, MT = (e, t, n) => wT(AT(e, n), t, jT), NT = class extends yT {
	constructor(...e) {
		super(...e), this.name = "TextLineAdapter";
	}
	_parse(e) {
		return {
			lines: MT(e, this.limit, this.annotationAdapter.startOffset),
			flatText: e
		};
	}
}, PT = (e = {}) => new NT(e), FT = class {}, IT = class extends FT {
	constructor(...e) {
		super(...e), this.text = "", this.offsetStart = 0, this.textLength = 0;
	}
	setText(e, t) {
		this.text = e ?? "", this.offsetStart = t, this.textLength = this.text.length + t;
	}
	fixOffset(e) {
		return {
			start: e.start,
			end: e.end,
			modified: !1
		};
	}
}, LT = (e) => e.charCodeAt(0).toString(16).toUpperCase(), RT = (e, t) => {
	let n = e.length, r = Math.max(t - 20, 0), i = Math.min(t + 20, n), a = (e, t, n) => e.substring(t, t + n).replaceAll(/\\/g, "\\\\").replaceAll(/\x08/g, "\\b").replaceAll(/\t/g, "\\t").replaceAll(/\n/g, "\\n").replaceAll(/\f/g, "\\f").replaceAll(/\r/g, "\\r").replaceAll(/[\x00-\x07\x0B\x0E\x0F]/g, (e) => "\\x0" + LT(e)).replaceAll(/[\x10-\x1F\x80-\xFF]/g, (e) => "\\x" + LT(e)).replaceAll(/[\u0100-\u0FFF]/g, (e) => "\\u0" + LT(e)).replaceAll(/[\u1000-\uFFFF]/g, (e) => "\\u" + LT(e));
	return {
		prologTrunc: r > 0,
		prologText: a(e, r, t - r),
		tokenText: a(e, t, 1),
		epilogText: a(e, t + 1, i - (t + 1)),
		epilogTrunc: i < n
	};
}, zT = class {
	constructor(e, t, n, r = 0, i = 0, a = 0) {
		this.type = e, this.value = t, this.text = n, this.pos = r, this.line = i, this.column = a;
	}
	toString(e = (e, t) => t) {
		return `${e("type", this.type)} (value: ${e("value", JSON.stringify(this.value))}, text: ${e("text", JSON.stringify(this.text))}, pos: ${e("pos", this.pos.toString())}, line: ${e("line", this.line.toString())}, column: ${e("column", this.column.toString())})`;
	}
	isA(e, t) {
		return !(e !== this.type || t !== void 0 && t !== this.value);
	}
}, BT = class extends Error {
	constructor(e, t, n, r, i) {
		super(e), this.name = "ParsingError", this.message = e, this.pos = t, this.line = n, this.column = r, this.input = i;
	}
	toString() {
		let e = RT(this.input, this.pos), t = `line ${this.line} (column ${this.column}): `, n = e.prologTrunc ? "..." : "\"", r = e.epilogTrunc ? "..." : "\"", i = " ".repeat(t.length + n.length + e.prologText.length);
		return "Parsing Error: " + this.message + "\n" + t + n + e.prologText + e.tokenText + e.epilogText + r + "\n" + i + "^";
	}
}, VT = class {
	constructor(e) {
		this._tokenizr = e, this._data = {}, this._repeat = !1, this._reject = !1, this._ignore = !1, this._match = null;
	}
	data(e, t) {
		let n = this._data[e];
		return arguments.length === 2 && (this._data[e] = t), n;
	}
	info() {
		return {
			line: this._tokenizr._line,
			column: this._tokenizr._column,
			pos: this._tokenizr._pos,
			len: this._match?.[0]?.length ?? 0
		};
	}
	push(e) {
		return this._tokenizr.push(e), this;
	}
	pop() {
		return this._tokenizr.pop();
	}
	state(e) {
		return e === void 0 ? this._tokenizr.state() : (this._tokenizr.state(e), this);
	}
	tag(e) {
		return this._tokenizr.tag(e), this;
	}
	tagged(e) {
		return this._tokenizr.tagged(e);
	}
	untag(e) {
		return this._tokenizr.untag(e), this;
	}
	repeat() {
		return this._tokenizr._log("    REPEAT"), this._repeat = !0, this;
	}
	reject() {
		return this._tokenizr._log("    REJECT"), this._reject = !0, this;
	}
	ignore() {
		return this._tokenizr._log("    IGNORE"), this._ignore = !0, this;
	}
	accept(e, t) {
		return t ??= this._match?.[0], this._tokenizr._log(`    ACCEPT: type: ${e}, value: ${JSON.stringify(t)} (${typeof t}), text: "${this._match?.[0] ?? ""}"`), this._tokenizr._pending.push(new zT(e, t, this._match?.[0] ?? "", this._tokenizr._pos, this._tokenizr._line, this._tokenizr._column)), this;
	}
	stop() {
		return this._tokenizr._stopped = !0, this;
	}
}, HT = class {
	constructor() {
		this._before = null, this._after = null, this._finish = null, this._rules = [], this._debug = !1, this._input = "", this._len = 0, this._eof = !1, this._pos = 0, this._line = 1, this._column = 1, this._state = ["default"], this._tag = {}, this._transaction = [], this._pending = [], this._stopped = !1, this._ctx = new VT(this);
	}
	reset() {
		return this._input = "", this._len = 0, this._eof = !1, this._pos = 0, this._line = 1, this._column = 1, this._state = ["default"], this._tag = {}, this._transaction = [], this._pending = [], this._stopped = !1, this._ctx = new VT(this), this;
	}
	error(e) {
		return new BT(e, this._pos, this._line, this._column, this._input);
	}
	debug(e) {
		return this._debug = e, this;
	}
	_log(e) {
		this._debug && console.log(`tokenizr: ${e}`);
	}
	input(e) {
		if (typeof e != "string") throw Error("parameter \"input\" not a String");
		return this.reset(), this._input = e, this._len = e.length, this;
	}
	push(e) {
		if (arguments.length !== 1) throw Error("invalid number of arguments");
		if (typeof e != "string") throw Error("parameter \"state\" not a String");
		return this._log(`    STATE (PUSH): old: <${this._state[this._state.length - 1]}>, new: <${e}>`), this._state.push(e), this;
	}
	pop() {
		if (arguments.length !== 0) throw Error("invalid number of arguments");
		if (this._state.length < 2) throw Error("no more custom states to pop");
		return this._log(`    STATE (POP): old: <${this._state[this._state.length - 1]}>, new: <${this._state[this._state.length - 2]}>`), this._state.pop();
	}
	state(e) {
		if (arguments.length === 1) {
			if (typeof e != "string") throw Error("parameter \"state\" not a String");
			return this._log(`    STATE (SET): old: <${this._state[this._state.length - 1]}>, new: <${e}>`), this._state[this._state.length - 1] = e, this;
		}
		if (arguments.length === 0) return this._state[this._state.length - 1];
		throw Error("invalid number of arguments");
	}
	tag(e) {
		if (arguments.length !== 1) throw Error("invalid number of arguments");
		if (typeof e != "string") throw Error("parameter \"tag\" not a String");
		return this._log(`    TAG (ADD): ${e}`), this._tag[e] = !0, this;
	}
	tagged(e) {
		if (arguments.length !== 1) throw Error("invalid number of arguments");
		if (typeof e != "string") throw Error("parameter \"tag\" not a String");
		return this._tag[e] === !0;
	}
	untag(e) {
		if (arguments.length !== 1) throw Error("invalid number of arguments");
		if (typeof e != "string") throw Error("parameter \"tag\" not a String");
		return this._log(`    TAG (DEL): ${e}`), delete this._tag[e], this;
	}
	before(e) {
		return this._before = e, this;
	}
	after(e) {
		return this._after = e, this;
	}
	finish(e) {
		return this._finish = e, this;
	}
	rule(e, t, n, r = "unknown") {
		if (arguments.length === 2 && typeof t == "function" ? ([t, n] = [e, t], e = "*") : arguments.length === 3 && typeof t == "function" && ([t, n, r] = [
			e,
			t,
			n
		], e = "*"), typeof e != "string") throw Error("parameter \"state\" not a String");
		if (!(t instanceof RegExp)) throw Error("parameter \"pattern\" not a RegExp");
		if (typeof n != "function") throw Error("parameter \"action\" not a Function");
		if (typeof r != "string") throw Error("parameter \"name\" not a String");
		let i = e.split(/\s*,\s*/g).map((e) => {
			let t = e.split(/\s+/g), n = t.filter((e) => !e.startsWith("#")), r = t.filter((e) => e.startsWith("#")).map((e) => e.slice(1));
			if (n.length !== 1) throw Error("exactly one state required");
			return {
				state: n[0],
				tags: r
			};
		}), a = "y";
		t.multiline && (a += "m"), t.dotAll && (a += "s"), t.ignoreCase && (a += "i"), t.unicode && (a += "u");
		let o = new RegExp(t.source, a);
		return this._log(`RULE: configure rule (state: ${e}, pattern: ${o.source})`), this._rules.push({
			state: i,
			pattern: o,
			action: n,
			name: r
		}), this;
	}
	_progress(e, t) {
		let n = this._line, r = this._column, i = this._input;
		for (let n = e; n < t; n++) {
			let e = i.charAt(n);
			e === "\r" ? (this._line++, this._column = 1, n + 1 < t && i.charAt(n + 1) === "\n" && n++) : e === "\n" ? (this._line++, this._column = 1) : e === "	" ? this._column += 8 - (this._column - 1) % 8 : this._column++;
		}
		this._log(`    PROGRESS: characters: ${t - e}, from: <line ${n}, column ${r}>, to: <line ${this._line}, column ${this._column}>`);
	}
	_tokenize() {
		let e = () => {
			this._eof || (this._finish !== null && this._finish.call(this._ctx, this._ctx), this._eof = !0, this._pending.push(new zT("EOF", "", "", this._pos, this._line, this._column)));
		};
		if (this._stopped || this._pos >= this._len) {
			e();
			return;
		}
		let t = !0;
		for (; t;) {
			if (t = !1, this._debug) {
				let e = RT(this._input, this._pos), t = Object.keys(this._tag).map((e) => `#${e}`).join(" ");
				this._log(`INPUT: state: <${this._state[this._state.length - 1]}>, tags: <${t}>, text: ` + (e.prologTrunc ? "..." : "\"") + `${e.prologText}<${e.tokenText}>${e.epilogText}` + (e.epilogTrunc ? "..." : "\"") + `, at: <line ${this._line}, column ${this._column}>`);
			}
			for (let n = 0; n < this._rules.length; n++) {
				if (this._debug) {
					let e = this._rules[n].state.map((e) => {
						let t = e.state;
						return e.tags.length > 0 && (t += " " + e.tags.map((e) => `#${e}`).join(" ")), t;
					}).join(", ");
					this._log(`  RULE: state(s): <${e}>, pattern: ${this._rules[n].pattern.source}`);
				}
				let r = !1, i = this._rules[n].state.findIndex((e) => e.state === this._state[this._state.length - 1]);
				if (i < 0 && (i = this._rules[n].state.findIndex((e) => e.state === "*")), i >= 0 && (r = this._rules[n].state[i].tags.every((e) => this._tag[e])), !r) continue;
				this._rules[n].pattern.lastIndex = this._pos;
				let a = this._rules[n].pattern.exec(this._input);
				if (a !== null && a.index === this._pos) {
					if (this._debug && this._log("    MATCHED: " + JSON.stringify(a)), this._ctx._match = a, this._ctx._repeat = !1, this._ctx._reject = !1, this._ctx._ignore = !1, this._before !== null && this._before.call(this._ctx, this._ctx, a, this._rules[n]), this._rules[n].action.call(this._ctx, this._ctx, a), this._after !== null && this._after.call(this._ctx, this._ctx, a, this._rules[n]), this._stopped) {
						e();
						return;
					}
					if (this._ctx._reject) continue;
					if (this._ctx._repeat) {
						t = !0;
						break;
					}
					if (this._ctx._ignore) {
						if (this._progress(this._pos, this._rules[n].pattern.lastIndex), this._pos = this._rules[n].pattern.lastIndex, this._pos >= this._len) {
							e();
							return;
						}
						t = !0;
						break;
					}
					if (this._pending.length > 0) {
						this._progress(this._pos, this._rules[n].pattern.lastIndex), this._pos = this._rules[n].pattern.lastIndex, this._pos >= this._len && e();
						return;
					}
					throw Error("action of pattern \"" + this._rules[n].pattern.source + "\" neither rejected nor accepted any token(s)");
				}
			}
		}
		throw this.error("token not recognized");
	}
	token() {
		if (this._pending.length === 0 && this._tokenize(), this._pending.length > 0) {
			let e = this._pending.shift();
			return this._transaction.length > 0 && this._transaction[0].push(e), this._log(`TOKEN: ${e.toString()}`), e;
		}
		return null;
	}
	tokens() {
		let e = [], t;
		for (; (t = this.token()) !== null;) e.push(t);
		return e;
	}
	peek(e) {
		if (arguments.length === 0 && (e = 0), typeof e != "number" || e < 0) throw Error("parameter \"offset\" not a positive Number");
		for (; e >= this._pending.length;) {
			let e = this._pending.length;
			if (this._tokenize(), this._eof || this._pending.length === e) break;
		}
		if (e >= this._pending.length) throw Error("not enough tokens available for peek operation");
		return this._log(`PEEK: ${this._pending[e].toString()}`), this._pending[e];
	}
	skip(e) {
		e === void 0 && (e = 1);
		for (let t = 0; t < e; t++) if (this.token() === null) throw Error("not enough tokens available for skip operation");
		return this;
	}
	consume(e, t) {
		if (this._pending.length === 0 && this._tokenize(), this._pending.length === 0) throw Error("not enough tokens available for consume operation");
		let n = this.token();
		return this._log(`CONSUME: ${n.toString()}`), (arguments.length === 2 && !n.isA(e, t) || arguments.length === 1 && !n.isA(e)) && (() => {
			throw new BT(`expected: <type: ${e}, value: ${JSON.stringify(t)} (${typeof t})>, found: <type: ${n.type}, value: ${JSON.stringify(n.value)} (${typeof n.value})>`, n.pos, n.line, n.column, this._input);
		})(), n;
	}
	begin() {
		return this._log(`BEGIN: level ${this._transaction.length}`), this._transaction.unshift([]), this;
	}
	depth() {
		if (this._transaction.length === 0) throw Error("cannot determine depth -- no active transaction");
		return this._transaction[0].length;
	}
	commit() {
		if (this._transaction.length === 0) throw Error("cannot commit transaction -- no active transaction");
		let e = this._transaction.shift();
		return this._transaction.length > 0 && (this._transaction[0] = this._transaction[0].concat(e)), this._log(`COMMIT: level ${this._transaction.length}`), this;
	}
	rollback() {
		if (this._transaction.length === 0) throw Error("cannot rollback transaction -- no active transaction");
		let e = this._transaction.shift();
		return this._pending = e.concat(this._pending), this._log(`ROLLBACK: level ${this._transaction.length}`), this;
	}
	alternatives(...e) {
		let t = null, n = !1, r = [];
		for (let i = 0; i < e.length; i++) {
			let a = 0;
			try {
				this.begin(), a = this._transaction.length, t = e[i].call(this), this.commit(), n = !0;
				break;
			} catch (e) {
				for (; this._transaction.length > a;) this.rollback();
				e instanceof Error ? (this._log(`EXCEPTION: ${e.message}`), r.push({
					ex: e,
					depth: this.depth()
				})) : (this._log("EXCEPTION: alternative failed"), r.push({
					ex: /* @__PURE__ */ Error("alternative failed"),
					depth: this.depth()
				})), this.rollback();
				continue;
			}
		}
		if (!n && r.length > 0) throw r.sort((e, t) => t.depth - e.depth), r[0].ex;
		return t;
	}
	static {
		this.Token = zT;
	}
	static {
		this.ParsingError = BT;
	}
	static {
		this.ActionContext = VT;
	}
}, UT = (e) => {
	let t = new HT();
	return t.rule(/†/, (e) => {
		e.accept("start");
	}), t.rule(/\d+\./, (e) => {
		e.ignore();
	}), t.rule(/(\s+)|(,)|\./, (e) => {
		e.ignore();
	}), t.rule(/[^\s,.]+/, (e) => {
		e.accept("token");
	}), t.input(e), t.tokens();
}, WT = class extends IT {
	constructor(e = UT) {
		super(), this.words = [], this.tokenizer = e, this.tree = new YC();
	}
	setText(e, t) {
		(this.text !== e || this.offsetStart !== t) && (super.setText(e, t), this.words = this.parseWords(), this.buildTree());
	}
	parseWords() {
		let e = this.tokenizer(this.text), t = [];
		for (let n of e) if (n.type === "token" || n.type === "start") {
			let e = n.pos + this.offsetStart, r = n.pos + n.text.length + this.offsetStart;
			t.push({
				start: e,
				end: r,
				word: n.text
			});
		}
		return t;
	}
	buildTree() {
		this.tree.clear();
		let e = this.words.map((e) => ({
			minX: e.start,
			maxX: e.end,
			minY: 0,
			maxY: 0,
			word: e
		}));
		this.tree.load(e);
	}
	fixOffset(e) {
		if (this.words.length === 0) return {
			start: e.start,
			end: e.end,
			modified: !1
		};
		let t = this.snapStart(e.start), n = this.snapEnd(e.end), r = t, i = n;
		if (r > i || !this.hasWordInRange(r, i)) {
			let t = Math.floor((e.start + e.end) / 2), n = this.findWordContaining(t) || this.findClosestWord(t);
			n && (r = n.start, i = n.end);
		}
		return {
			start: r,
			end: i,
			modified: r !== e.start || i !== e.end
		};
	}
	snapStart(e) {
		let t = this.findWordContaining(e);
		if (t) {
			if (e < t.start + (t.end - t.start) / 2) return t.start;
			{
				let e = this.findNextWord(t);
				return e ? e.start : t.end + 1;
			}
		}
		return this.findClosestWordStart(e);
	}
	snapEnd(e) {
		let t = this.findWordContaining(e);
		if (t) {
			if (e < t.start + (t.end - t.start) / 2) {
				let e = this.findPreviousWord(t);
				return e ? e.end : t.start - 1;
			}
			return t.end;
		}
		return e > this.textLength ? this.textLength : e;
	}
	findWordContaining(e) {
		let t = this.tree.search({
			minX: e,
			maxX: e,
			minY: 0,
			maxY: 0
		});
		for (let n of t) if (e >= n.word.start && e <= n.word.end) return n.word;
		return null;
	}
	findNextWord(e) {
		let t = this.words.indexOf(e);
		return t >= 0 && t < this.words.length - 1 ? this.words[t + 1] : null;
	}
	findPreviousWord(e) {
		let t = this.words.indexOf(e);
		return t > 0 ? this.words[t - 1] : null;
	}
	findClosestWordStart(e) {
		let t = this.words[0], n = Math.abs(e - t.start);
		for (let r of this.words) {
			let i = Math.abs(e - r.start);
			i < n && (n = i, t = r);
		}
		return t.start;
	}
	findClosestWordEnd(e) {
		let t = this.words[this.words.length - 1], n = Math.abs(e - t.end);
		for (let r of this.words) {
			let i = Math.abs(e - r.end);
			i < n && (n = i, t = r);
		}
		return t.end;
	}
	findClosestWord(e) {
		if (this.words.length === 0) return null;
		let t = this.words[0], n = Math.min(Math.abs(e - t.start), Math.abs(e - t.end));
		for (let r of this.words) {
			let i = Math.min(Math.abs(e - r.start), Math.abs(e - r.end));
			i < n && (n = i, t = r);
		}
		return t;
	}
	hasWordInRange(e, t) {
		for (let n of this.words) if (n.start <= t && n.end >= e) return !0;
		return !1;
	}
	getWords() {
		return this.words;
	}
}, GT = (0, w.default)((e, t, n, r) => (r ||= 0, n >= e - r && n <= t + r)), KT = (e, t, n = 0) => {
	if (t.contains(e)) {
		let r = 0;
		for (let i = 0; i < t.childNodes.length; i++) {
			let a = t.childNodes[i];
			if (a.contains(e)) return a === e ? n + r : KT(e, a, n + r);
			r += a.textContent.length;
		}
	}
	return 0;
}, qT = (e) => {
	let t = e.parentNode, n = t.getAttribute(D.LINE_UID);
	if (!n) for (; t && !n;) t = t.parentNode, t && (n = t.getAttribute?.(D.LINE_UID));
	if (!t) return {
		lineElement: null,
		lineUid: null,
		offset: 0,
		lineHeight: 0
	};
	let r = window.getComputedStyle?.(t).lineHeight, i = parseFloat(r), a = KT(e, t);
	return {
		lineElement: t,
		lineUid: n,
		offset: a,
		lineHeight: i
	};
}, JT = (0, w.default)((e, t) => (e - t) / 2), YT = (e, t, n) => {
	let r = e.search({
		minX: t,
		minY: n,
		maxX: t,
		maxY: n
	});
	for (let e of r) if (GT(e.minX, e.maxX, t) && GT(e.minY, e.maxY, n)) return e;
	return null;
};
function XT(e, t, n, r) {
	let i = Go(n, {
		x: e,
		y: t,
		height: 0,
		width: 0
	}), a = i.x, o = i.y, s = YT(r, a, o);
	if (!s) return null;
	let c = s.textPosition, l = a < s.centerX ? "left" : "right";
	return {
		newIndex: s.textPosition,
		characterPos: c,
		side: l
	};
}
var ZT = ({ characterPos: e, side: t }, n, r) => {
	let i = r === "start" ? e : n?.start, a = r === "end" ? e : n?.end, o = Math.min(i, a), s = Math.max(i, a);
	if (o === e) {
		if (t === "right") return {
			start: o + 1,
			end: s
		};
	} else if (t === "right") return {
		start: o,
		end: s + 1
	};
	return {
		start: o,
		end: s
	};
}, QT = class extends Q {
	constructor(e, t) {
		super(e), this.getCharacterFromTextNodesAtPoint = t, this.drawing = !1, this.drawingAndMove = !1, this.dummyAnnotation = null, this.prevEndIndex = null, this.draw = this.inject(pE);
	}
	startCreate(e, t) {
		if (this.annotationAdapter.create && !(this.internalEventListener.isBlocking || this.drawing)) {
			if (this.dummyAnnotation = null, this.drawing = !0, this.createDummyAnnotation(e, t), !this.dummyAnnotation) {
				console.warn("no character found");
				return;
			}
			this.internalEventListener.sendEvent("send-event--annotation", {
				event: "annotation-create--start",
				mouseEvent: t,
				annotationUuid: this.dummyAnnotation.id || "",
				additionalData: { annotation: this.dummyAnnotation }
			});
		}
	}
	moveCreate(e, t) {
		if (!this.drawing) return;
		this.internalEventListener.blockEvents("starting annotation creation"), this.drawingAndMove = !0, this.createDummyAnnotation(e, t, !0);
		let n = this.dummyAnnotation;
		this.internalEventListener.sendEvent("send-event--annotation", {
			event: "annotation-create--move",
			mouseEvent: t,
			annotationUuid: n?.id || "",
			additionalData: { annotation: n }
		});
	}
	endCreate(e, t) {
		if (this.prevEndIndex = null, this.drawing = !1, !this.drawingAndMove) return !1;
		this.drawingAndMove = !1, this.internalEventListener.unBlockEvents("ending annotation creation");
		let n = this.dummyAnnotation;
		return this.dummyAnnotation = null, this.internalEventListener.sendEvent("send-event--annotation", {
			event: "annotation-create--end",
			mouseEvent: t,
			annotationUuid: n?.id || "",
			additionalData: { annotation: n }
		}), this.internalEventListener.sendEvent("annotation--add", { annotation: n }), !0;
	}
	createInitialDummyAnnotation(e) {
		return this.dummyAnnotation = this.annotationAdapter.createAnnotation(e), this.startIndex = e, this.prevEndIndex = e + 1, this.dummyAnnotation;
	}
	createDummyAnnotation(e, t, n = !1) {
		let r = this.getCharacterFromTextNodesAtPoint(e);
		if (!r) return;
		this.dummyAnnotation ||= this.createInitialDummyAnnotation(r.characterPos);
		let i = this.dummyAnnotation, { start: a, end: o } = ZT(r, {
			start: this.startIndex,
			end: this.prevEndIndex
		}, "end");
		if (a === o) return;
		i.start = a, i.end = o;
		let s = this.getSnapper().fixOffset(i);
		return i.start = s.start, i.end = s.end, n && this.draw.annotation.dummy(i), this.prevEndIndex = r.characterPos, this.dummyAnnotation = i, e;
	}
}, $T = (e, t) => {
	let n = new YC(), r = e, i = Vo(r), a = document.createTreeWalker(r, NodeFilter.SHOW_TEXT, null), o, s = null, c = 0;
	for (; o = a.nextNode();) {
		let e = o.textContent;
		if (!e) continue;
		let { lineUid: r, lineHeight: a } = qT(o);
		if (!r) continue;
		let l = t.getLine(r);
		if (l) {
			r !== s && (c = 0), s = r;
			for (let t = 0; t < e.length; t++) {
				let r = document.createRange();
				r.setStart(o, t), r.setEnd(o, t + 1);
				let s = Go(i, r.getBoundingClientRect()), u = JT(a, s.height), d = l.start + t + c, f = s.x, p = s.y - u, m = s.width, h = s.height + u * 2, g = f + m / 2, _ = {
					minX: f,
					minY: p,
					maxX: f + m,
					maxY: p + h,
					textPosition: d,
					centerX: g,
					text: e[t]
				};
				n.insert(_);
			}
			c += e.length;
		}
	}
	return n;
}, eE = globalThis.document || null, tE = (e, t) => {
	let n = eE?.createElement("div"), { lineHeight: r } = nE(t.style.padding, e.maxLineWeight, t.style.lineHeight);
	return n.style.setProperty("--gutter--line-height", `${r}px`), n.className = Ro.line.gutter.wrapper, n.innerHTML = e.gutter ?? "", n.setAttribute("data-gutter-uid", e.uuid), n;
}, nE = (0, w.default)((e, t, n) => {
	let r = e * t;
	return {
		linePadding: r,
		lineHeight: r + n + e * 2
	};
}), rE = (e, t) => {
	let n = eE.createElement("div"), { linePadding: r, lineHeight: i } = nE(t.style.padding, e.maxLineWeight, t.style.lineHeight);
	return n.style.setProperty("--line-padding", `${r}px`), n.style.setProperty("--line-height", `${i}px`), n.className = `${Ro.line.text.wrapper} ${t.textDirection}`, n.innerHTML = t?.flatText ? e.flatText : e.html, n.setAttribute("data-line-uid", e.uuid), n.setAttribute("data-annotation-role", "line"), n;
}, iE = (e, t, n) => {
	e.innerHTML = "";
	let r = n.gutter.paddingLeft;
	e.className = `${Ro.text} `, e.style.setProperty("--gutter-left", `${r}px`), T.verbose("DrawText", "Draw the lines", t.lines.length), t.lines.forEach((n) => {
		e.appendChild(tE(n, t)), e.appendChild(rE(n, t));
	});
}, aE = (e, t) => {
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (ht(i, t) && n.push(i), t.end <= i.end) break;
	}
	return n;
}, oE = (e, t) => e.querySelector(`[data-line-uid="${t.uuid}"]`), sE = class extends Q {
	constructor(...e) {
		super(...e), this.svgModel = this.inject(Jo);
	}
	createTree() {
		this.textTree = $T(this.svgModel.textElement, this.textAdapter);
	}
	getCharacterFromTextNodesAtPoint(e, t) {
		return XT(e, t, this.svgModel.getTextElementDimensions(), this.textTree);
	}
	draw() {
		return iE(this.svgModel.textElement, this.textAdapter, this.annotationAdapter), this;
	}
	compute() {
		let e = this.svgModel.textElement;
		return this.textAdapter.lines.forEach((t) => {
			let n = oE(e, t);
			if (!n) {
				T.debug("computeLinePositions", `Text line with UUID ${t.uuid} not found in the text element.`);
				return;
			}
			t.element = n;
		}), this;
	}
}, cE = (e) => {
	let t = e.inject(Jo).svg, n = e.inject(sE), r = (e) => ({
		x: e.clientX,
		y: e.clientY
	}), i = new QT(e, ({ x: e, y: t }) => n.getCharacterFromTextNodesAtPoint(e, t));
	t.on("mousedown", (e) => {
		i.startCreate(r(e), e);
	}), t.on("mousemove", (e) => {
		i.moveCreate(r(e), e);
	}), t.on("mouseup", (e) => {
		i.endCreate(r(e), e);
	});
}, lE = class extends Q {
	constructor(...e) {
		super(...e), this.annotationColors = this.inject(OE), this.svgModel = this.annotationModule.inject(Jo), this.renderInstances = this.annotationModule.inject(Bw);
	}
	drawAll() {
		return this.annotationAdapter.annotations.sortBy("weight").forEach((e) => this.draw(e)), this.color(), this;
	}
	color() {
		this.annotationColors.color();
	}
	highlight(e) {
		this.annotationColors.highlightAnnotations(e);
	}
	select(e) {
		this.annotationColors.selectAnnotations(e);
	}
	draw(e) {
		DE(this.annotationModule, e);
	}
	dummy(e) {
		let t = Ko;
		e._render.lines = aE(this.textAdapter.lines, e), this.createDraws(e, t);
	}
	createDraws(e, t) {
		let n = t ?? e.id;
		this.removeDraw(n);
		let r = this.renderInstances.highlightInstance, i = e._style ?? this.renderInstances.getDefaultRenderer().annotationRenderStyle.getDefaultStyle();
		r.createDraws(e).draws.forEach((e) => {
			EE({
				...e,
				annotationUuid: n
			}, this.svgModel, i, "edit");
		});
	}
	compute() {
		this.annotationAdapter.annotations().forEach((e) => {
			this.computeOne(e);
		});
	}
	computeOne(e) {
		let t = this.renderInstances.createDraws(e);
		this.annotationAdapter.addDrawAnnotations(e.id, t.draws, t.dimensions);
	}
	removeDraw(e, t = "") {
		this.svgModel?.findRelatedAnnotations(e, t)?.remove();
	}
	setClass(e, t) {
		this.svgModel?.setClass(e, t);
	}
}, uE = (e, t = 2) => {
	let n = document.createElement("span");
	n.style.visibility = "hidden", n.style.position = "absolute", n.style.whiteSpace = "pre", n.textContent = e, document.body.appendChild(n);
	let r = dE(n);
	return document.body.removeChild(n), r + t;
}, dE = (e) => {
	let t = window.getComputedStyle(e);
	if (t.lineHeight !== "normal") return parseFloat(t.lineHeight);
	let n = document.createElement("span");
	n.style.visibility = "hidden", n.textContent = "Mg", e.appendChild(n);
	let r = n.offsetHeight;
	return e.removeChild(n), r;
}, fE = (e, t, n) => {
	if (e.start >= e.end && n.sendError("INVALID_ANNOTATION", `start (${e.start}) must be less than end (${e.end})`, e), t < e.start) {
		n.sendError("INVALID_ANNOTATION", `Invalid annotation: start (${e.start}) must be less than text length (${t})`, e);
		return;
	}
	t < e.end && n.sendError("INVALID_ANNOTATION", `Invalid annotation: end (${e.end}) must be less than text length (${t})`, e);
}, pE = class extends Q {
	constructor(e) {
		super(e), this.annotation = this.inject(lE), this.text = this.inject(sE), this.tag = this.inject(_T);
	}
	initialDraw() {
		return this.text.createTree(), cE(this.annotationModule), this.annotation.drawAll(), this;
	}
	drawTags() {
		return this.tag.drawAll(), this;
	}
	setText(e) {
		let t = this.annotationAdapter.startOffset, n = this.textAdapter, r = this.getSnapper(), i = this.textAdapter.parse(e, t);
		return n.setLines(i), r.setText(e, t), n.setLineHeight(uE(e, n.style.lineOffset)), this;
	}
	setAnnotations(e) {
		let t = this.textAdapter, n = this.annotationAdapter, r = this.textAdapter.lines, i = t.getLimit();
		return t.clear(), n.clear(), e?.forEach((e) => {
			let t = n.parse(e);
			t && (!i || ht(t, i)) && this.setAnnotation(t);
		}), n.calculateWeights(r), this;
	}
	setAnnotation(e) {
		let t = this.textAdapter.textLength;
		fE(e, t, this.eventListener);
		let n = aE(this.textAdapter.lines, e);
		if (!n?.length) {
			T.warn("Invalid annotation: no lines found for annotation", e);
			return;
		}
		e._render.lines = n;
	}
	initDraw(e, t) {
		return this.setText(e), this.setAnnotations(t), this;
	}
	compute() {
		return this.text.compute(), this.annotationAdapter.clearDraws(), this.annotation.compute(), this;
	}
}, mE = class extends Q {
	constructor(e, t = {}) {
		super(e), this.draw = this.inject(pE), this.annotation = t.annotation ?? null, this.originalStartEnd = {
			start: this.annotation?.start,
			end: this.annotation?.end
		};
	}
	start(e, t, n) {
		this.annotationAdapter.edit && (this.internalEventListener.isBlocking || (this.internalEventListener.blockEvents("annotation-edit--start"), this.onStart(e, t), this.sendExternalEvent("annotation-edit--start", this.dummyAnnotation?.id), this.draw.tag.removeTag(this.annotation.id)));
	}
	move(e, t, n) {
		if (!this.annotationAdapter.edit) return;
		let r = this.onDrag(e, t);
		if (!r) return;
		let { startEnd: i, prevPosition: a } = r, o = this.drawDummyAnnotation(i, a);
		o && (this.dummyAnnotation = o, this.sendExternalEvent("annotation-edit--move", this.dummyAnnotation?.id));
	}
	end(e) {
		this.dummyAnnotation && (this.internalEventListener.unBlockEvents("ending annotation edit"), this.draw.annotation.removeDraw(this.dummyAnnotation?.id), this.dummyAnnotation && (this.annotation && (this.dummyAnnotation.id = this.annotation.id), this.internalEventListener.sendEvent("annotation--update", { annotation: this.dummyAnnotation }), this.sendExternalEvent("annotation-edit--end", this.dummyAnnotation?.id)));
	}
	drawDummyAnnotation(e, t) {
		let n = this.annotation, r = rT.parse({
			...oS(n),
			...e,
			id: Ko
		});
		r._render.weight = n._render.weight + 1;
		let i = this.annotationModule.getSnapper(), a = i.fixOffset(r);
		if (a.end < a.start && (r.start = a.start, a = i.fixOffset(r)), !(a.end <= a.start) && !(t && a.start === t.start && a.end === t.end)) return r.start = a.start, r.end = a.end, this.draw.annotation.dummy(r), r;
	}
	sendExternalEvent(e, t) {
		let n = this.annotation;
		n && this.internalEventListener.sendEvent("send-event--annotation", {
			event: e,
			annotationUuid: n.id || "",
			additionalData: {
				annotation: {
					start: this.dummyAnnotation?.start ?? n.start,
					end: this.dummyAnnotation?.end ?? n.end
				},
				annotationUuid: this.dummyAnnotation?.id,
				moveId: t
			}
		});
	}
}, hE = class extends mE {
	constructor(e, t, n, r) {
		super(n, { annotation: t }), this.minStartPosition = e, this.getCharacterFromTextNodesAtPoint = r, this.dragBusy = !1, this.pickupIndex = 0, this.textStart = 0;
	}
	onStart(e) {
		let t = this.annotation._drawMetadata.draws;
		this.startDimensions = t.find((e) => e.draggable.start).draggable?.start, this.endDimensions = t.find((e) => e.draggable.end).draggable?.end;
		let n = this.getCharacterFromTextNodesAtPoint(e);
		n && (this.pickupIndex = n.characterPos, this.textStart = this.minStartPosition, this.internalEventListener.blockEvents("starting annotation drag"), this.dragBusy = !0, this.draw.annotation.setClass(this.annotation.id, "move"));
	}
	onDrag(e, t) {
		if (!this.dragBusy) return null;
		let n = this.getCharacterFromTextNodesAtPoint(e);
		if (!n) return null;
		let r = this.originalStartEnd, i = n.characterPos - this.pickupIndex, a = r.start + i;
		if (a < this.textStart) return null;
		let o = this.originalStartEnd.end + i;
		return o < a ? null : {
			startEnd: {
				start: a,
				end: o
			},
			prevPosition: this.dummyAnnotation && AC(this.dummyAnnotation, ["start", "end"])
		};
	}
}, gE = (e, t) => {
	let n = e.inject(sE), r = new hE(e.getAnnotationAdapter().position.minStartPosition, t, e, ({ x: e, y: t }) => n.getCharacterFromTextNodesAtPoint(e, t));
	return Rr().on("drag", (e) => {
		let t = e.sourceEvent.clientX, n = e.sourceEvent.clientY;
		r.move({
			x: t,
			y: n
		}, "start", e);
	}).on("start", (e) => {
		let t = e.sourceEvent.clientX, n = e.sourceEvent.clientY;
		r.start({
			x: t,
			y: n
		}, "start", e);
	}).on("end", (e) => {
		r.end(e);
	});
}, _E = class extends mE {
	constructor(e, t, n) {
		super(t, { annotation: e }), this.getCharacterFromTextNodesAtPoint = n;
	}
	onStart(e, t) {}
	onDrag(e, t) {
		let n = this.getCharacterFromTextNodesAtPoint(e);
		return n ? {
			startEnd: ZT(n, this.originalStartEnd, t),
			prevPosition: (this.dummyAnnotation && AC(this.dummyAnnotation, ["start", "end"])) ?? void 0
		} : null;
	}
}, vE = [
	"annotation-create--move",
	"annotation-create--start",
	"annotation-create--end"
], yE = [
	...vE,
	"annotation-edit--move",
	"annotation-edit--start",
	"annotation-edit--end"
], bE = class extends Q {
	sendEvent({ event: e, mouseEvent: t, annotationUuid: n }, r = {}) {
		let i = this.annotationAdapter.getAnnotation(n), a = vE.includes(e), o = yE.includes(e), s = {
			annotation: this.annotationAdapter.format(SC(i, r.annotation), a, o),
			annotationUuid: n
		};
		return this.eventListener.sendEvent(e, s, t), i;
	}
}, xE = class extends Q {
	addToAnnotation(e, t) {
		return new SE(this.annotationModule, e, t);
	}
}, SE = class extends Q {
	constructor(e, t, n) {
		super(e), this.annotation = t, this.externalEventSender = this.inject(bE), this.annotationColors = this.inject(OE), n?.on("mouseover", this.hover()).on("mouseleave", this.leave()).on("dblclick", this.doubleClick()).on("click", this.click());
	}
	sendEvent(e, t) {
		return this.externalEventSender.sendEvent({
			event: e,
			mouseEvent: t,
			annotationUuid: this.annotation?.id || ""
		});
	}
	hover() {
		return (e) => {
			if (this.internalEventListener.isBlocking) return;
			let t = this.sendEvent("mouse-enter", e);
			this.annotationAdapter.hover(t) && this.annotationColors.colorAnnotation(this.annotation.id, "hover");
		};
	}
	leave() {
		return (e) => {
			this.internalEventListener.isBlocking || (this.sendEvent("mouse-leave", e), this.annotationColors.resetAnnotationColor(this.annotation.id));
		};
	}
	click() {
		return (e) => {
			this.internalEventListener.isBlocking || this.sendEvent("click", e);
		};
	}
	doubleClick() {
		return (e) => {
			this.internalEventListener.isBlocking || (e.preventDefault(), this.sendEvent("double-click", e));
		};
	}
}, CE = (e, t, n) => {
	t.draggable && (t.draggable.start && wE(n, e, t.draggable.start, "start"), t.draggable.end && wE(n, e, t.draggable.end, "end"));
}, wE = (e, t, n, r) => {
	let i = e.getAnnotationAdapter(), a = i.config.text.handleRadius, o = e.inject(sE), s = e.inject(Jo), c = new _E(t, e, ({ x: e, y: t }) => o.getCharacterFromTextNodesAtPoint(e, t)), l = (e) => {
		c.end(e);
	}, u = (e) => ({
		x: e.sourceEvent.clientX,
		y: e.sourceEvent.clientY
	}), d = (e) => {
		c.move(u(e), r, e);
	}, f = (e) => {
		c.start(u(e), r, e);
	}, p = a, m = s.handles.append("rect").attr(D.ANNOTATION_UID, t.id).attr(D.ANNOTATION_ROLE, "handle").attr("width", p).attr("height", n.height).attr("fill", "gray").attr("opacity", 0).attr("x", n.x - p / 2).attr("y", n.y).call(Rr().on("drag", d).on("start", f).on("end", l));
	return e.inject(xE).addToAnnotation(t, m), m.on("mouseenter", () => {
		m.attr("class", i.edit ? "handle" : "");
	}), m;
}, TE = (e, t, n, r) => {
	let i = e[t];
	r?.attr("fill", i.backgroundColor ?? "none").attr("border", "none").attr("stroke", "none"), n?.attr("fill", "none").attr("stroke", i.borderColor ?? "none").attr("stroke-width", i.borderWidth ?? 0);
}, EE = (e, t, n, r = "default") => {
	let i = null, a = t.annotations.append("g").attr("data-annotation-uid", e.annotationUuid), o = null;
	return e.path.fill && (o = a.append("path").attr(D.ANNOTATION_UID, e.annotationUuid).attr("data-annotation-start", e.lineNumber).attr(D.ANNOTATION_ROLE, qo.FILL).attr("d", e.path.fill)), e.path.border && (i = a.append("path").attr(D.ANNOTATION_UID, e.annotationUuid).attr(D.ANNOTATION_ROLE, qo.BORDER).attr("d", e.path.border).attr("fill", "none")), TE(n, r, i, o), {
		rect: o,
		border: i
	};
}, DE = (e, t) => {
	let n = e.inject(Jo);
	t._drawMetadata.draws.forEach((r) => {
		let { rect: i, border: a } = EE(r, n, t._style);
		CE(t, r, e), e.inject(xE).addToAnnotation(t, i), i?.call(gE(e, t)), a?.call(gE(e, t));
	});
}, OE = class extends Q {
	constructor(...e) {
		super(...e), this.svgModel = this.inject(Jo), this.activeIds = /* @__PURE__ */ new Set(), this.highlightedIds = /* @__PURE__ */ new Set(), this.renderInstances = this.annotationModule.inject(Bw);
	}
	highlightAnnotations(e) {
		let t = new Set(this.highlightedIds);
		return this.highlightedIds.clear(), e.forEach((e) => this.highlightedIds.add(e)), this.color(), this.resetColors(t), this;
	}
	selectAnnotations(e) {
		let t = new Set(this.activeIds);
		return this.activeIds.clear(), e.forEach((e) => {
			this.highlightedIds.delete(e), this.activeIds.add(e);
		}), this.color(), this.resetColors(t), this;
	}
	resetColors(e) {
		return e.forEach((e) => this.resetAnnotationColor(e)), this;
	}
	color() {
		return this.resetColors(this.highlightedIds).resetColors(this.activeIds), this;
	}
	getAnnotationColor(e) {
		return this.activeIds.has(e.id) ? "active" : this.highlightedIds.has(e.id) ? "hover" : "default";
	}
	resetAnnotationColor(e) {
		let t = this.annotationAdapter.getAnnotation(e);
		if (!t) {
			T.warn("No annotation found for uuid", e);
			return;
		}
		let n = this.getAnnotationColor(t);
		if (!n) {
			T.warn("No default color found for annotation", e);
			return;
		}
		this.colorAnnotation(e, n);
	}
	colorAnnotation(e, t) {
		TE(this.annotationAdapter.getAnnotation(e)?._style ?? this.renderInstances.getDefaultRenderer().annotationRenderStyle.getDefaultStyle(), t, this.svgModel.findBorders(e), this.svgModel.findFills(e));
	}
}, kE = class {
	constructor(e) {
		this.annotationModule = e, this.textElement = null, this.resizeObserver = null, this.prevSvgNode = null, this.internalEventListener = this.annotationModule.inject(Yo);
	}
	setMainElement(e) {
		this.mainElement = e, this.textElement && (this.mainElement.removeChild(this.textElement), T.warn("element already initialized, clear and reinitialize"));
		let t = document.createElement("div");
		this.mainElement.innerHTML = "", this.mainElement.appendChild(t), this.element = t, this.element.innerHTML = "", this.element.classList.add(Ro.wrapper), this.startObserving();
	}
	clear() {
		this.prevSvgNode && this.element?.removeChild(this.prevSvgNode), this.textElement && this.element?.removeChild(this.textElement);
	}
	setTextElement(e) {
		this.textElement = e, this.element?.append(e);
	}
	setSvg(e) {
		this.prevSvgNode = e, e && this.element?.prepend(e);
	}
	startObserving() {
		if (T.debug("CreateAnnotations", "Start observing element", this.mainElement), this.resizeObserver) return;
		let e = !1;
		this.resizeObserver = new ResizeObserver(() => {
			T.verbose("CreateAnnotations", "resize detected", e), e && this.internalEventListener.sendEvent("redraw-svg", void 0), e = !0;
		}), this.element && (T.debug("CreateAnnotations", "start observing", this.mainElement), this.resizeObserver.observe(this.mainElement));
	}
	stopObserving() {
		this.resizeObserver &&= (T.debug("CreateAnnotations", "Stop observing element", this.mainElement), this.mainElement && (this.resizeObserver?.unobserve(this.mainElement), this.mainElement.innerHTML = ""), this.resizeObserver?.disconnect(), null);
	}
	destroy() {
		this.textElement = null, this.prevSvgNode = null, this.stopObserving();
	}
}, AE = "ANNOTATION_ADAPTER", jE = "TEXT_ADAPTER", ME = "SNAPPER", NE = class {
	constructor(e, t) {
		this.container = e.createScope(), this.configure(t);
	}
	configure(e) {
		this.container.register(Yo).register(_t), this.container.register(Jo, () => new Jo()), this.container.register(jE, () => e.textAdapter).register(AE, () => e.annotationAdapter), this.container.register(_T, () => new _T(this)).register(bE, () => new bE(this)).register(xE, () => new xE(this)).register(OE, () => new OE(this)).register(pE, () => new pE(this)).register(lE, () => new lE(this)).register(sE, () => new sE(this)).register($, () => new $(this)).register(Bw, () => new Bw(this)).register(aT, () => new aT(this)).register(ME, () => new IT()), this.container.register(kE, () => new kE(this)), this.inject(jE).setModule(this), this.inject(AE).setModule(this);
	}
	inject(e) {
		return this.container.get(e);
	}
	destroy() {
		this.container.destroy();
	}
	updateTextAdapter(e) {
		return console.warn("Use  createAnnotatedText(id, {textAdapter})"), this.hasTextAdapter() ? this.container.update(jE, () => e) : this.container.register(jE, () => e), this.getTextAdapter().setModule(this), this;
	}
	updateAnnotationAdapter(e) {
		return console.warn("Use  createAnnotatedText(id, {annotationAdapter})"), this.hasAnnotationAdapter() ? this.container.update(AE, () => e) : this.container.register(AE, () => e), this.getAnnotationAdapter().setModule(this), this;
	}
	useDefaultAnnotationAdapter() {
		return T.warn("use default annotation adapter"), this.container.register(AE, fT), this.updateAnnotationAdapter(fT()), this.inject(AE);
	}
	useDefaultTextAdapter() {
		return T.warn("use default text adapter"), this.updateTextAdapter(kT()), this.container.register(jE, kT), this.inject(jE);
	}
	updateSnapper(e) {
		return this.container.update(ME, () => e), this;
	}
	getSnapper() {
		return this.inject(ME);
	}
	getTextAdapter() {
		try {
			let e = this.inject(jE);
			if (e) return e;
		} catch {}
		return this.useDefaultTextAdapter();
	}
	hasTextAdapter() {
		try {
			if (this.inject(jE)) return !0;
		} catch {}
		return !1;
	}
	hasAnnotationAdapter() {
		try {
			if (this.inject(AE)) return !0;
		} catch {}
		return !1;
	}
	getAnnotationAdapter() {
		return this.hasAnnotationAdapter() ? this.inject(AE) : (console.warn("use default annotation adapter"), this.useDefaultAnnotationAdapter());
	}
	getAllRenderInstances() {
		let e = this.container.getAllTokens().filter((e) => String(e).startsWith("RENDER_INSTANCE_"));
		return this.container.getMany(e);
	}
	registerRender(e, t) {
		t().setModule(this), this.container.register(`RENDER_INSTANCE_${e}`, t), this.injectRender(e).setModule(this);
	}
	hasRender(e) {
		return this.container.has(`RENDER_INSTANCE_${e}`);
	}
	injectRender(e) {
		return this.inject(`RENDER_INSTANCE_${e}`);
	}
}, PE = new class e {
	constructor(e) {
		this.parent = e, this.factories = /* @__PURE__ */ new Map(), this.instances = /* @__PURE__ */ new Map();
	}
	register(e, t) {
		let n = t ?? (() => new e());
		return this.factories.set(e, n), this;
	}
	update(e, t) {
		if (!this.factories.has(e)) throw Error(`Cannot update unregistered service: ${String(e)}`);
		return this.factories.set(e, t), this.instances.delete(e), this;
	}
	get(e) {
		if (this.instances.has(e)) return this.instances.get(e);
		if (this.factories.has(e)) {
			let t = this.factories.get(e)();
			return this.instances.set(e, t), t;
		}
		if (this.parent) return this.parent.get(e);
		throw Error(`Service not found: ${String(e)}`);
	}
	has(e) {
		return this.factories.has(e) || (this.parent?.has(e) ?? !1);
	}
	getTokens() {
		return Array.from(this.factories.keys());
	}
	getAllTokens() {
		let e = new Set(this.factories.keys());
		if (this.parent) for (let t of this.parent.getAllTokens()) e.add(t);
		return Array.from(e);
	}
	getMany(e) {
		return e.map((e) => this.get(e));
	}
	createScope() {
		return new e(this);
	}
	reset() {
		this.instances.clear();
	}
	destroy() {
		this.factories.clear(), this.instances.clear();
	}
}(), FE = (e, t) => {
	if (t instanceof yT || t.TYPE === "TextAdapter") return e.updateTextAdapter(t), t;
	let n = e.getTextAdapter();
	return n.setParams(t), n;
}, IE = (e, t) => {
	if (t instanceof sT) return e.updateAnnotationAdapter(t), t;
	let n = e.getAnnotationAdapter();
	return n.setParams(t), n;
}, LE = (e, t) => {
	let n = e.getTextAdapter().fullFlatText;
	e.updateSnapper(t);
	let r = e.getAnnotationAdapter();
	return t.setText(n, r.startOffset), t;
}, RE = globalThis.document || null, zE = class {
	constructor(e, t) {
		this.id = e, this.annotationsMap = /* @__PURE__ */ new Map(), this.annotationModule = new NE(PE, t), this.svgModel = this.annotationModule.inject(Jo), this.mainContainer = this.annotationModule.inject(kE), this.draw = this.annotationModule.inject(pE);
		let n = this.annotationModule.inject(Yo);
		this.eventListener = this.annotationModule.inject(_t), this.init(), n.on("annotation--add", ({ data: e }) => {
			let t = this.annotationModule.getAnnotationAdapter().format(e.annotation, !0, !0);
			this.addAnnotation(t);
		}).on("annotation--update", ({ data: e }) => {
			let t = this.annotationModule.getAnnotationAdapter().format(e.annotation, !1, !0);
			this.addAnnotation(t);
		}).on("send-event--annotation", ({ data: e }) => {
			this.annotationModule.inject(bE).sendEvent(e, e.additionalData);
		}).on("redraw-svg", () => {
			this.redrawSvg();
		});
	}
	annotations() {
		return Array.from(this.annotationsMap.values());
	}
	setText(e) {
		return this.text = e || "", this.draw.initDraw(this.text, this.annotations()), this.setAnnotations(this.annotations()), this;
	}
	setSnapper(e) {
		return LE(this.annotationModule, e), this;
	}
	setTagLabelFn(e) {
		return this.annotationModule.inject(aT).setTagFn(e), this.recalculate(), this;
	}
	setAnnotations(e) {
		return this.annotationsMap.clear(), e.forEach((e) => {
			this.annotationsMap.set(e.id, e);
		}), this.recalculate(), this;
	}
	recalculate() {
		let e = Date.now();
		if (!this.text) return T.debug("setAnnotations", "------ no lines set, cannot set annotations"), this;
		let t = Date.now();
		this.draw.initDraw(this.text, this.annotations()), T.time(t, "  draw.initDraw 	");
		let n = Date.now();
		return this.redrawSvg(), T.time(n, "  redrawSvg 		"), T.time(e, "recalculate 		"), this;
	}
	on(e, t) {
		return this.eventListener.register(e, t), this;
	}
	onError(e) {
		return this.eventListener.registerError(e), this;
	}
	init() {
		if (!RE) return;
		let e = this.id, t = RE?.getElementById(e);
		if (!t) {
			T.error("element not found", e);
			return;
		}
		this.mainContainer.setMainElement(t), this.text && this.redrawSvg();
	}
	async redrawSvg() {
		if (!RE) return;
		this.mainContainer.clear(), this.svgModel.createTextElement(), this.draw.text.draw(), this.mainContainer.setTextElement(this.svgModel.textElement), this.svgModel.createModel();
		let e = Date.now();
		this.draw.compute().initialDraw(), this.mainContainer.setSvg(this.svgModel.node()), this.draw.drawTags(), T.time(e, " 	 initialDraw 	");
	}
	destroy() {
		return T.debug("CreateAnnotations", "destroy", this.id), this.eventListener.sendEvent("destroy", null, null), this.mainContainer.destroy(), this;
	}
	highlightAnnotations(e) {
		return this.draw.annotation.highlight(e), this;
	}
	selectAnnotations(e) {
		return this.draw.annotation.select(e), this;
	}
	setAnnotationAdapter(e) {
		return IE(this.annotationModule, e), this.recalculate(), this;
	}
	setAnnotationAdapterParams(e) {
		return IE(this.annotationModule, e), this.recalculate(), this;
	}
	setTextAdapter(e) {
		return FE(this.annotationModule, e), this.recalculate(), this;
	}
	setTextAdapterParams(e) {
		return FE(this.annotationModule, e), this.recalculate(), this;
	}
	scrollToAnnotation(e) {
		let t = this.annotationModule.getAnnotationAdapter().getAnnotation(e)?._render.lines;
		if (!t) return T.warn("No lines found for annotation", e), this;
		let n = t[0].element;
		return n ? (n.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "nearest"
		}), this) : (T.warn("No line element found for annotation", e), this);
	}
	addAnnotation(e) {
		return this.annotationsMap.has(e.id) ? this.updateAnnotation(e.id, e) : (this.annotationsMap.set(e.id, e), this.setAnnotations(this.annotations()), this);
	}
	updateAnnotation(e, t) {
		return this.annotationsMap.has(t.id) ? (this.annotationsMap.set(t.id, t), this.setAnnotations(this.annotations()), this) : this.addAnnotation(t);
	}
	deleteAnnotation(e) {
		return this.annotationsMap.delete(e), this.setAnnotations(this.annotations()), this;
	}
	setRenderParams(e) {
		return this.annotationModule.inject(Bw).setParams(e), this.recalculate(), this;
	}
	registerRender(e) {
		return this.annotationModule.registerRender(e.name, () => e), this.annotationModule.inject($).updateAllStyles(), this.recalculate(), this;
	}
	registerRenders(...e) {
		return e.forEach((e) => {
			this.annotationModule.registerRender(e.name, () => e);
		}), this.annotationModule.inject($).updateAllStyles(), this;
	}
	updateRenderStyle(e, t) {
		return this.annotationModule.injectRender(e).annotationRenderStyle.updateDefaultStyle(t), this.annotationModule.inject($).updateAllStyles(), this.recalculate(), this;
	}
	registerStyle(e, t) {
		return this.annotationModule.inject($).registerStyle(e, t), this.annotationModule.inject($).updateAllStyles(), this.recalculate(), this;
	}
	setStyleParams(e) {
		return this.annotationModule.inject($).setParams(e), this.annotationModule.inject($).updateAllStyles(), this.recalculate(), this;
	}
	registerStyles(e) {
		let t = this.annotationModule.inject($);
		return Object.keys(e).forEach((n) => {
			t.registerStyle(n, e[n]);
		}), this.annotationModule.inject($).updateAllStyles(), this.recalculate(), this;
	}
}, BE = /* @__PURE__ */ new Map(), VE = (e, t) => {
	let n = new zE(e, {
		annotationAdapter: t?.annotationAdapter ?? fT(),
		textAdapter: t?.textAdapter ?? kT()
	});
	return n.on("destroy", () => {
		BE.delete(e), T.verbose("AnnotatedText with ID", e, "has been destroyed and removed from cache.");
	}), n;
}, HE = (e) => {
	let t = BE.get(e);
	if (!t) throw Error("AnnotatedText with this ID does not exist");
	return t;
}, UE = () => {
	BE.clear();
};
//#endregion
export { sT as AnnotationAdapter, _w as AnnotationRender, yE as CHANGED_EVENTS, T as Debugger, fT as DefaultAnnotationAdapter, dT as DefaultAnnotationAdapterImpl, vw as DefaultAnnotationRenderStyle, mw as DefaultRenders, IT as DefaultSnapper, vT as DefaultTextAdapterStyle, gt as Errors, Ew as GutterAnnotationRender, Pw as HighlightAnnotationRender, vE as NEW_EVENTS, kT as PlainTextAdapter, OT as PlainTextAdapterImpl, FT as Snapper, Dw as SvgAnnotationRender, yT as TextAdapter, PT as TextLineAdapter, NT as TextLineAdapterImpl, zw as UnderLineAnnotationRender, uT as W3CAnnotationAdapter, lT as W3CAnnotationAdapterImpl, WT as WordSnapper, iT as annotationColorSchema, Kw as annotationDimensionSchema, Jw as annotationDrawMetadataSchema, Ww as annotationDrawPath, qw as annotationDrawSchema, Zw as annotationIdSchema, Qw as annotationSchema, Xw as annotationTargetSchema, UE as clearAnnotatedTextCache, VE as createAnnotatedText, Aw as createAnnotationFill, Sw as createGutterPath, ww as createGutterStyle, Mw as createHighlightPath, Nw as createHighlightStyle, kw as createLeftBorder, Ow as createRightBorder, Lw as createUnderlineStyle, Gw as dimensionsSchema, HE as getAnnotatedText, ht as isIntersection, Hw as lineSchema, nT as renderSchema, $w as renderStyleSchema, cT as selectText, eT as styleDetailSchema, tT as styleSchema, Yw as tagDrawMetadataSchema, rT as textAnnotationSchema, Uw as textLineSchema };
