function Xf(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var fr, _s;
function Hf() {
  return _s || (_s = 1, fr = function() {
  }), fr;
}
var hr, ys;
function Xt() {
  if (ys) return hr;
  ys = 1;
  var t = Hf()();
  return hr = function(e) {
    return e !== t && e !== null;
  }, hr;
}
var dr, ws;
function Ic() {
  if (ws) return dr;
  ws = 1;
  var t = Xt(), e = Array.prototype.forEach, n = Object.create, r = function(i, o) {
    var s;
    for (s in i) o[s] = i[s];
  };
  return dr = function(i) {
    var o = n(null);
    return e.call(arguments, function(s) {
      t(s) && r(Object(s), o);
    }), o;
  }, dr;
}
var pr, bs;
function Yf() {
  return bs || (bs = 1, pr = function() {
    var t = Math.sign;
    return typeof t != "function" ? !1 : t(10) === 1 && t(-20) === -1;
  }), pr;
}
var gr, xs;
function Jf() {
  return xs || (xs = 1, gr = function(t) {
    return t = Number(t), isNaN(t) || t === 0 ? t : t > 0 ? 1 : -1;
  }), gr;
}
var mr, As;
function Kf() {
  return As || (As = 1, mr = Yf()() ? Math.sign : Jf()), mr;
}
var vr, Ss;
function Qf() {
  if (Ss) return vr;
  Ss = 1;
  var t = Kf(), e = Math.abs, n = Math.floor;
  return vr = function(r) {
    return isNaN(r) ? 0 : (r = Number(r), r === 0 || !isFinite(r) ? r : t(r) * n(e(r)));
  }, vr;
}
var _r, Ts;
function Ht() {
  if (Ts) return _r;
  Ts = 1;
  var t = Qf(), e = Math.max;
  return _r = function(n) {
    return e(0, t(n));
  }, _r;
}
var yr, $s;
function zc() {
  if ($s) return yr;
  $s = 1;
  var t = Ht();
  return yr = function(e, n, r) {
    var i;
    return isNaN(e) ? (i = n, i >= 0 ? r && i ? i - 1 : i : 1) : e === !1 ? !1 : t(e);
  }, yr;
}
var wr, Es;
function Ft() {
  return Es || (Es = 1, wr = function(t) {
    if (typeof t != "function") throw new TypeError(t + " is not a function");
    return t;
  }), wr;
}
var br, Os;
function ye() {
  if (Os) return br;
  Os = 1;
  var t = Xt();
  return br = function(e) {
    if (!t(e)) throw new TypeError("Cannot use null or undefined");
    return e;
  }, br;
}
var xr, Is;
function th() {
  if (Is) return xr;
  Is = 1;
  var t = Ft(), e = ye(), n = Function.prototype.bind, r = Function.prototype.call, i = Object.keys, o = Object.prototype.propertyIsEnumerable;
  return xr = function(s, a) {
    return function(u, c) {
      var l, f = arguments[2], h = arguments[3];
      return u = Object(e(u)), t(c), l = i(u), h && l.sort(typeof h == "function" ? n.call(h, u) : void 0), typeof s != "function" && (s = l[s]), r.call(s, l, function(d, m) {
        return o.call(u, d) ? r.call(c, f, u[d], d, u, m) : a;
      });
    };
  }, xr;
}
var Ar, zs;
function Gn() {
  return zs || (zs = 1, Ar = th()("forEach")), Ar;
}
var Cs = {}, Ns;
function Yt() {
  return Ns || (Ns = 1), Cs;
}
var Sr = { exports: {} }, Tr, Rs;
function eh() {
  return Rs || (Rs = 1, Tr = function() {
    var t = Object.assign, e;
    return typeof t != "function" ? !1 : (e = { foo: "raz" }, t(e, { bar: "dwa" }, { trzy: "trzy" }), e.foo + e.bar + e.trzy === "razdwatrzy");
  }), Tr;
}
var $r, Ps;
function nh() {
  return Ps || (Ps = 1, $r = function() {
    try {
      return Object.keys("primitive"), !0;
    } catch {
      return !1;
    }
  }), $r;
}
var Er, Ms;
function rh() {
  if (Ms) return Er;
  Ms = 1;
  var t = Xt(), e = Object.keys;
  return Er = function(n) {
    return e(t(n) ? Object(n) : n);
  }, Er;
}
var Or, ks;
function ih() {
  return ks || (ks = 1, Or = nh()() ? Object.keys : rh()), Or;
}
var Ir, Ds;
function oh() {
  if (Ds) return Ir;
  Ds = 1;
  var t = ih(), e = ye(), n = Math.max;
  return Ir = function(r, i) {
    var o, s, a = n(arguments.length, 2), u;
    for (r = Object(e(r)), u = function(c) {
      try {
        r[c] = i[c];
      } catch (l) {
        o || (o = l);
      }
    }, s = 1; s < a; ++s)
      i = arguments[s], t(i).forEach(u);
    if (o !== void 0) throw o;
    return r;
  }, Ir;
}
var zr, js;
function Cc() {
  return js || (js = 1, zr = eh()() ? Object.assign : oh()), zr;
}
var Cr, Zs;
function sh() {
  if (Zs) return Cr;
  Zs = 1;
  var t = Xt(), e = { function: !0, object: !0 };
  return Cr = function(n) {
    return t(n) && e[typeof n] || !1;
  }, Cr;
}
var Fs;
function ah() {
  return Fs || (Fs = 1, (function(t) {
    var e = Cc(), n = sh(), r = Xt(), i = Error.captureStackTrace;
    t.exports = function(o) {
      var s = new Error(o), a = arguments[1], u = arguments[2];
      return r(u) || n(a) && (u = a, a = null), r(u) && e(s, u), r(a) && (s.code = a), i && i(s, t.exports), s;
    };
  })(Sr)), Sr.exports;
}
var Je = { exports: {} }, Nr, Ls;
function Nc() {
  if (Ls) return Nr;
  Ls = 1;
  var t = ye(), e = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getOwnPropertySymbols;
  return Nr = function(o, s) {
    var a, u = Object(t(s));
    if (o = Object(t(o)), r(u).forEach(function(c) {
      try {
        e(o, c, n(s, c));
      } catch (l) {
        a = l;
      }
    }), typeof i == "function" && i(u).forEach(function(c) {
      try {
        e(o, c, n(s, c));
      } catch (l) {
        a = l;
      }
    }), a !== void 0) throw a;
    return o;
  }, Nr;
}
var Bs;
function Rc() {
  if (Bs) return Je.exports;
  Bs = 1;
  var t = Ht(), e = function(s, a) {
    return a;
  }, n, r, i, o;
  try {
    Object.defineProperty(e, "length", {
      configurable: !0,
      writable: !1,
      enumerable: !1,
      value: 1
    });
  } catch {
  }
  return e.length === 1 ? (n = { configurable: !0, writable: !1, enumerable: !1 }, r = Object.defineProperty, Je.exports = function(s, a) {
    return a = t(a), s.length === a ? s : (n.value = a, r(s, "length", n));
  }) : (o = Nc(), i = /* @__PURE__ */ (function() {
    var s = [];
    return function(a) {
      var u, c = 0;
      if (s[a]) return s[a];
      for (u = []; a--; ) u.push("a" + (++c).toString(36));
      return new Function(
        "fn",
        "return function (" + u.join(", ") + ") { return fn.apply(this, arguments); };"
      );
    };
  })(), Je.exports = function(s, a) {
    var u;
    if (a = t(a), s.length === a) return s;
    u = i(a)(s);
    try {
      o(u, s);
    } catch {
    }
    return u;
  }), Je.exports;
}
var Rr = { exports: {} }, Pr, qs;
function Pc() {
  if (qs) return Pr;
  qs = 1;
  var t = void 0;
  return Pr = function(e) {
    return e !== t && e !== null;
  }, Pr;
}
var Mr, Ws;
function uh() {
  if (Ws) return Mr;
  Ws = 1;
  var t = Pc(), e = {
    object: !0,
    function: !0,
    undefined: !0
    /* document.all */
  };
  return Mr = function(n) {
    return t(n) ? hasOwnProperty.call(e, typeof n) : !1;
  }, Mr;
}
var kr, Us;
function ch() {
  if (Us) return kr;
  Us = 1;
  var t = uh();
  return kr = function(e) {
    if (!t(e)) return !1;
    try {
      return e.constructor ? e.constructor.prototype === e : !1;
    } catch {
      return !1;
    }
  }, kr;
}
var Dr, Gs;
function lh() {
  if (Gs) return Dr;
  Gs = 1;
  var t = ch();
  return Dr = function(e) {
    if (typeof e != "function" || !hasOwnProperty.call(e, "length")) return !1;
    try {
      if (typeof e.length != "number" || typeof e.call != "function" || typeof e.apply != "function") return !1;
    } catch {
      return !1;
    }
    return !t(e);
  }, Dr;
}
var jr, Vs;
function fh() {
  if (Vs) return jr;
  Vs = 1;
  var t = lh(), e = /^\s*class[\s{/}]/, n = Function.prototype.toString;
  return jr = function(r) {
    return !(!t(r) || e.test(n.call(r)));
  }, jr;
}
var Zr, Xs;
function hh() {
  if (Xs) return Zr;
  Xs = 1;
  var t = "razdwatrzy";
  return Zr = function() {
    return typeof t.contains != "function" ? !1 : t.contains("dwa") === !0 && t.contains("foo") === !1;
  }, Zr;
}
var Fr, Hs;
function dh() {
  if (Hs) return Fr;
  Hs = 1;
  var t = String.prototype.indexOf;
  return Fr = function(e) {
    return t.call(this, e, arguments[1]) > -1;
  }, Fr;
}
var Lr, Ys;
function ph() {
  return Ys || (Ys = 1, Lr = hh()() ? String.prototype.contains : dh()), Lr;
}
var Js;
function Jt() {
  if (Js) return Rr.exports;
  Js = 1;
  var t = Pc(), e = fh(), n = Cc(), r = Ic(), i = ph(), o = Rr.exports = function(s, a) {
    var u, c, l, f, h;
    return arguments.length < 2 || typeof s != "string" ? (f = a, a = s, s = null) : f = arguments[2], t(s) ? (u = i.call(s, "c"), c = i.call(s, "e"), l = i.call(s, "w")) : (u = l = !0, c = !1), h = { value: a, configurable: u, enumerable: c, writable: l }, f ? n(r(f), h) : h;
  };
  return o.gs = function(s, a, u) {
    var c, l, f, h;
    return typeof s != "string" ? (f = u, u = a, a = s, s = null) : f = arguments[3], t(a) ? e(a) ? t(u) ? e(u) || (f = u, u = void 0) : u = void 0 : (f = a, a = u = void 0) : a = void 0, t(s) ? (c = i.call(s, "c"), l = i.call(s, "e")) : (c = !0, l = !1), h = { get: a, set: u, configurable: c, enumerable: l }, f ? n(r(f), h) : h;
  }, Rr.exports;
}
var Ke = { exports: {} }, Ks;
function gh() {
  return Ks || (Ks = 1, (function(t, e) {
    var n = Jt(), r = Ft(), i = Function.prototype.apply, o = Function.prototype.call, s = Object.create, a = Object.defineProperty, u = Object.defineProperties, c = Object.prototype.hasOwnProperty, l = { configurable: !0, enumerable: !1, writable: !0 }, f, h, d, m, g, y, _;
    f = function(w, b) {
      var p;
      return r(b), c.call(this, "__ee__") ? p = this.__ee__ : (p = l.value = s(null), a(this, "__ee__", l), l.value = null), p[w] ? typeof p[w] == "object" ? p[w].push(b) : p[w] = [p[w], b] : p[w] = b, this;
    }, h = function(w, b) {
      var p, x;
      return r(b), x = this, f.call(this, w, p = function() {
        d.call(x, w, p), i.call(b, this, arguments);
      }), p.__eeOnceListener__ = b, this;
    }, d = function(w, b) {
      var p, x, T, $;
      if (r(b), !c.call(this, "__ee__")) return this;
      if (p = this.__ee__, !p[w]) return this;
      if (x = p[w], typeof x == "object")
        for ($ = 0; T = x[$]; ++$)
          (T === b || T.__eeOnceListener__ === b) && (x.length === 2 ? p[w] = x[$ ? 0 : 1] : x.splice($, 1));
      else
        (x === b || x.__eeOnceListener__ === b) && delete p[w];
      return this;
    }, m = function(w) {
      var b, p, x, T, $;
      if (c.call(this, "__ee__") && (T = this.__ee__[w], !!T))
        if (typeof T == "object") {
          for (p = arguments.length, $ = new Array(p - 1), b = 1; b < p; ++b) $[b - 1] = arguments[b];
          for (T = T.slice(), b = 0; x = T[b]; ++b)
            i.call(x, this, $);
        } else
          switch (arguments.length) {
            case 1:
              o.call(T, this);
              break;
            case 2:
              o.call(T, this, arguments[1]);
              break;
            case 3:
              o.call(T, this, arguments[1], arguments[2]);
              break;
            default:
              for (p = arguments.length, $ = new Array(p - 1), b = 1; b < p; ++b)
                $[b - 1] = arguments[b];
              i.call(T, this, $);
          }
    }, g = {
      on: f,
      once: h,
      off: d,
      emit: m
    }, y = {
      on: n(f),
      once: n(h),
      off: n(d),
      emit: n(m)
    }, _ = u({}, y), t.exports = e = function(w) {
      return w == null ? s(_) : u(Object(w), y);
    }, e.methods = g;
  })(Ke, Ke.exports)), Ke.exports;
}
var Br, Qs;
function mh() {
  return Qs || (Qs = 1, Br = function() {
    var t = Array.from, e, n;
    return typeof t != "function" ? !1 : (e = ["raz", "dwa"], n = t(e), !!(n && n !== e && n[1] === "dwa"));
  }), Br;
}
var qr, ta;
function vh() {
  return ta || (ta = 1, qr = function() {
    return typeof globalThis != "object" || !globalThis ? !1 : globalThis.Array === Array;
  }), qr;
}
var Wr, ea;
function _h() {
  if (ea) return Wr;
  ea = 1;
  var t = function() {
    if (typeof self == "object" && self) return self;
    if (typeof window == "object" && window) return window;
    throw new Error("Unable to resolve global `this`");
  };
  return Wr = (function() {
    if (this) return this;
    try {
      Object.defineProperty(Object.prototype, "__global__", {
        get: function() {
          return this;
        },
        configurable: !0
      });
    } catch {
      return t();
    }
    try {
      return __global__ || t();
    } finally {
      delete Object.prototype.__global__;
    }
  })(), Wr;
}
var Ur, na;
function Vn() {
  return na || (na = 1, Ur = vh()() ? globalThis : _h()), Ur;
}
var Gr, ra;
function yh() {
  if (ra) return Gr;
  ra = 1;
  var t = Vn(), e = { object: !0, symbol: !0 };
  return Gr = function() {
    var n = t.Symbol, r;
    if (typeof n != "function") return !1;
    r = n("test symbol");
    try {
      String(r);
    } catch {
      return !1;
    }
    return !(!e[typeof n.iterator] || !e[typeof n.toPrimitive] || !e[typeof n.toStringTag]);
  }, Gr;
}
var Vr, ia;
function wh() {
  return ia || (ia = 1, Vr = function(t) {
    return t ? typeof t == "symbol" ? !0 : !t.constructor || t.constructor.name !== "Symbol" ? !1 : t[t.constructor.toStringTag] === "Symbol" : !1;
  }), Vr;
}
var Xr, oa;
function Mc() {
  if (oa) return Xr;
  oa = 1;
  var t = wh();
  return Xr = function(e) {
    if (!t(e)) throw new TypeError(e + " is not a symbol");
    return e;
  }, Xr;
}
var Hr, sa;
function bh() {
  if (sa) return Hr;
  sa = 1;
  var t = Jt(), e = Object.create, n = Object.defineProperty, r = Object.prototype, i = e(null);
  return Hr = function(o) {
    for (var s = 0, a, u; i[o + (s || "")]; ) ++s;
    return o += s || "", i[o] = !0, a = "@@" + o, n(
      r,
      a,
      t.gs(null, function(c) {
        u || (u = !0, n(this, a, t(c)), u = !1);
      })
    ), a;
  }, Hr;
}
var Yr, aa;
function xh() {
  if (aa) return Yr;
  aa = 1;
  var t = Jt(), e = Vn().Symbol;
  return Yr = function(n) {
    return Object.defineProperties(n, {
      // To ensure proper interoperability with other native functions (e.g. Array.from)
      // fallback to eventual native implementation of given symbol
      hasInstance: t(
        "",
        e && e.hasInstance || n("hasInstance")
      ),
      isConcatSpreadable: t(
        "",
        e && e.isConcatSpreadable || n("isConcatSpreadable")
      ),
      iterator: t("", e && e.iterator || n("iterator")),
      match: t("", e && e.match || n("match")),
      replace: t("", e && e.replace || n("replace")),
      search: t("", e && e.search || n("search")),
      species: t("", e && e.species || n("species")),
      split: t("", e && e.split || n("split")),
      toPrimitive: t(
        "",
        e && e.toPrimitive || n("toPrimitive")
      ),
      toStringTag: t(
        "",
        e && e.toStringTag || n("toStringTag")
      ),
      unscopables: t(
        "",
        e && e.unscopables || n("unscopables")
      )
    });
  }, Yr;
}
var Jr, ua;
function Ah() {
  if (ua) return Jr;
  ua = 1;
  var t = Jt(), e = Mc(), n = /* @__PURE__ */ Object.create(null);
  return Jr = function(r) {
    return Object.defineProperties(r, {
      for: t(function(i) {
        return n[i] ? n[i] : n[i] = r(String(i));
      }),
      keyFor: t(function(i) {
        var o;
        e(i);
        for (o in n)
          if (n[o] === i) return o;
      })
    });
  }, Jr;
}
var Kr, ca;
function Sh() {
  if (ca) return Kr;
  ca = 1;
  var t = Jt(), e = Mc(), n = Vn().Symbol, r = bh(), i = xh(), o = Ah(), s = Object.create, a = Object.defineProperties, u = Object.defineProperty, c, l, f;
  if (typeof n == "function")
    try {
      String(n()), f = !0;
    } catch {
    }
  else
    n = null;
  return l = function(d) {
    if (this instanceof l) throw new TypeError("Symbol is not a constructor");
    return c(d);
  }, Kr = c = function h(d) {
    var m;
    if (this instanceof h) throw new TypeError("Symbol is not a constructor");
    return f ? n(d) : (m = s(l.prototype), d = d === void 0 ? "" : String(d), a(m, {
      __description__: t("", d),
      __name__: t("", r(d))
    }));
  }, i(c), o(c), a(l.prototype, {
    constructor: t(c),
    toString: t("", function() {
      return this.__name__;
    })
  }), a(c.prototype, {
    toString: t(function() {
      return "Symbol (" + e(this).__description__ + ")";
    }),
    valueOf: t(function() {
      return e(this);
    })
  }), u(
    c.prototype,
    c.toPrimitive,
    t("", function() {
      var h = e(this);
      return typeof h == "symbol" ? h : h.toString();
    })
  ), u(c.prototype, c.toStringTag, t("c", "Symbol")), u(
    l.prototype,
    c.toStringTag,
    t("c", c.prototype[c.toStringTag])
  ), u(
    l.prototype,
    c.toPrimitive,
    t("c", c.prototype[c.toPrimitive])
  ), Kr;
}
var Qr, la;
function Th() {
  return la || (la = 1, Qr = yh()() ? Vn().Symbol : Sh()), Qr;
}
var ti, fa;
function $h() {
  if (fa) return ti;
  fa = 1;
  var t = Object.prototype.toString, e = t.call(/* @__PURE__ */ (function() {
    return arguments;
  })());
  return ti = function(n) {
    return t.call(n) === e;
  }, ti;
}
var ei, ha;
function Eh() {
  if (ha) return ei;
  ha = 1;
  var t = Object.prototype.toString, e = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
  return ei = function(n) {
    return typeof n == "function" && e(t.call(n));
  }, ei;
}
var ni, da;
function Oh() {
  if (da) return ni;
  da = 1;
  var t = Object.prototype.toString, e = t.call("");
  return ni = function(n) {
    return typeof n == "string" || n && typeof n == "object" && (n instanceof String || t.call(n) === e) || !1;
  }, ni;
}
var ri, pa;
function Ih() {
  if (pa) return ri;
  pa = 1;
  var t = Th().iterator, e = $h(), n = Eh(), r = Ht(), i = Ft(), o = ye(), s = Xt(), a = Oh(), u = Array.isArray, c = Function.prototype.call, l = { configurable: !0, enumerable: !0, writable: !0, value: null }, f = Object.defineProperty;
  return ri = function(h) {
    var d = arguments[1], m = arguments[2], g, y, _, w, b, p, x, T, $, I;
    if (h = Object(o(h)), s(d) && i(d), !this || this === Array || !n(this)) {
      if (!d) {
        if (e(h))
          return b = h.length, b !== 1 ? Array.apply(null, h) : (w = new Array(1), w[0] = h[0], w);
        if (u(h)) {
          for (w = new Array(b = h.length), y = 0; y < b; ++y) w[y] = h[y];
          return w;
        }
      }
      w = [];
    } else
      g = this;
    if (!u(h)) {
      if (($ = h[t]) !== void 0) {
        for (x = i($).call(h), g && (w = new g()), T = x.next(), y = 0; !T.done; )
          I = d ? c.call(d, m, T.value, y) : T.value, g ? (l.value = I, f(w, y, l)) : w[y] = I, T = x.next(), ++y;
        b = y;
      } else if (a(h)) {
        for (b = h.length, g && (w = new g()), y = 0, _ = 0; y < b; ++y)
          I = h[y], y + 1 < b && (p = I.charCodeAt(0), p >= 55296 && p <= 56319 && (I += h[++y])), I = d ? c.call(d, m, I, _) : I, g ? (l.value = I, f(w, _, l)) : w[_] = I, ++_;
        b = _;
      }
    }
    if (b === void 0)
      for (b = r(h.length), g && (w = new g(b)), y = 0; y < b; ++y)
        I = d ? c.call(d, m, h[y], y) : h[y], g ? (l.value = I, f(w, y, l)) : w[y] = I;
    return g && (l.value = null, w.length = b), w;
  }, ri;
}
var ii, ga;
function $o() {
  return ga || (ga = 1, ii = mh()() ? Array.from : Ih()), ii;
}
var oi, ma;
function zh() {
  if (ma) return oi;
  ma = 1;
  var t = $o(), e = Array.isArray;
  return oi = function(n) {
    return e(n) ? n : t(n);
  }, oi;
}
var si, va;
function Ch() {
  if (va) return si;
  va = 1;
  var t = zh(), e = Xt(), n = Ft(), r = Array.prototype.slice, i;
  return i = function(o) {
    return this.map(function(s, a) {
      return s ? s(o[a]) : o[a];
    }).concat(
      r.call(o, this.length)
    );
  }, si = function(o) {
    return o = t(o), o.forEach(function(s) {
      e(s) && n(s);
    }), i.bind(o);
  }, si;
}
var ai, _a;
function Nh() {
  if (_a) return ai;
  _a = 1;
  var t = Ft();
  return ai = function(e) {
    var n;
    return typeof e == "function" ? { set: e, get: e } : (n = { get: t(e.get) }, e.set !== void 0 ? (n.set = t(e.set), e.delete && (n.delete = t(e.delete)), e.clear && (n.clear = t(e.clear)), n) : (n.set = n.get, n));
  }, ai;
}
var ui, ya;
function Rh() {
  if (ya) return ui;
  ya = 1;
  var t = ah(), e = Rc(), n = Jt(), r = gh().methods, i = Ch(), o = Nh(), s = Function.prototype.apply, a = Function.prototype.call, u = Object.create, c = Object.defineProperties, l = r.on, f = r.emit;
  return ui = function(h, d, m) {
    var g = u(null), y, _, w, b, p, x, T, $, I, j, J, Q, wt, bt, G;
    return d !== !1 ? _ = d : isNaN(h.length) ? _ = 1 : _ = h.length, m.normalizer && (j = o(m.normalizer), w = j.get, b = j.set, p = j.delete, x = j.clear), m.resolvers != null && (G = i(m.resolvers)), w ? bt = e(function(O) {
      var z, X, H = arguments;
      if (G && (H = G(H)), z = w(H), z !== null && hasOwnProperty.call(g, z))
        return J && y.emit("get", z, H, this), g[z];
      if (H.length === 1 ? X = a.call(h, this, H[0]) : X = s.call(h, this, H), z === null) {
        if (z = w(H), z !== null) throw t("Circular invocation", "CIRCULAR_INVOCATION");
        z = b(H);
      } else if (hasOwnProperty.call(g, z))
        throw t("Circular invocation", "CIRCULAR_INVOCATION");
      return g[z] = X, Q && y.emit("set", z, null, X), X;
    }, _) : d === 0 ? bt = function() {
      var O;
      if (hasOwnProperty.call(g, "data"))
        return J && y.emit("get", "data", arguments, this), g.data;
      if (arguments.length ? O = s.call(h, this, arguments) : O = a.call(h, this), hasOwnProperty.call(g, "data"))
        throw t("Circular invocation", "CIRCULAR_INVOCATION");
      return g.data = O, Q && y.emit("set", "data", null, O), O;
    } : bt = function(O) {
      var z, X = arguments, H;
      if (G && (X = G(arguments)), H = String(X[0]), hasOwnProperty.call(g, H))
        return J && y.emit("get", H, X, this), g[H];
      if (X.length === 1 ? z = a.call(h, this, X[0]) : z = s.call(h, this, X), hasOwnProperty.call(g, H))
        throw t("Circular invocation", "CIRCULAR_INVOCATION");
      return g[H] = z, Q && y.emit("set", H, null, z), z;
    }, y = {
      original: h,
      memoized: bt,
      profileName: m.profileName,
      get: function(O) {
        return G && (O = G(O)), w ? w(O) : String(O[0]);
      },
      has: function(O) {
        return hasOwnProperty.call(g, O);
      },
      delete: function(O) {
        var z;
        hasOwnProperty.call(g, O) && (p && p(O), z = g[O], delete g[O], wt && y.emit("delete", O, z));
      },
      clear: function() {
        var O = g;
        x && x(), g = u(null), y.emit("clear", O);
      },
      on: function(O, z) {
        return O === "get" ? J = !0 : O === "set" ? Q = !0 : O === "delete" && (wt = !0), l.call(this, O, z);
      },
      emit: f,
      updateEnv: function() {
        h = y.original;
      }
    }, w ? T = e(function(O) {
      var z, X = arguments;
      G && (X = G(X)), z = w(X), z !== null && y.delete(z);
    }, _) : d === 0 ? T = function() {
      return y.delete("data");
    } : T = function(O) {
      return G && (O = G(arguments)[0]), y.delete(O);
    }, $ = e(function() {
      var O, z = arguments;
      return d === 0 ? g.data : (G && (z = G(z)), w ? O = w(z) : O = String(z[0]), g[O]);
    }), I = e(function() {
      var O, z = arguments;
      return d === 0 ? y.has("data") : (G && (z = G(z)), w ? O = w(z) : O = String(z[0]), O === null ? !1 : y.has(O));
    }), c(bt, {
      __memoized__: n(!0),
      delete: n(T),
      clear: n(y.clear),
      _get: n($),
      _has: n(I)
    }), y;
  }, ui;
}
var ci, wa;
function Ph() {
  if (wa) return ci;
  wa = 1;
  var t = Ft(), e = Gn(), n = Yt(), r = Rh(), i = zc();
  return ci = function o(s) {
    var a, u, c;
    if (t(s), a = Object(arguments[1]), a.async && a.promise)
      throw new Error("Options 'async' and 'promise' cannot be used together");
    return hasOwnProperty.call(s, "__memoized__") && !a.force ? s : (u = i(a.length, s.length, a.async && n.async), c = r(s, u, a), e(n, function(l, f) {
      a[f] && l(a[f], c, a);
    }), o.__profiler__ && o.__profiler__(c), c.updateEnv(), c.memoized);
  }, ci;
}
var li, ba;
function Mh() {
  return ba || (ba = 1, li = function(t) {
    var e, n, r = t.length;
    if (!r) return "";
    for (e = String(t[n = 0]); --r; ) e += "" + t[++n];
    return e;
  }), li;
}
var fi, xa;
function kh() {
  return xa || (xa = 1, fi = function(t) {
    return t ? function(e) {
      for (var n = String(e[0]), r = 0, i = t; --i; )
        n += "" + e[++r];
      return n;
    } : function() {
      return "";
    };
  }), fi;
}
var hi, Aa;
function Dh() {
  return Aa || (Aa = 1, hi = function() {
    var t = Number.isNaN;
    return typeof t != "function" ? !1 : !t({}) && t(NaN) && !t(34);
  }), hi;
}
var di, Sa;
function jh() {
  return Sa || (Sa = 1, di = function(t) {
    return t !== t;
  }), di;
}
var pi, Ta;
function Zh() {
  return Ta || (Ta = 1, pi = Dh()() ? Number.isNaN : jh()), pi;
}
var gi, $a;
function Eo() {
  if ($a) return gi;
  $a = 1;
  var t = Zh(), e = Ht(), n = ye(), r = Array.prototype.indexOf, i = Object.prototype.hasOwnProperty, o = Math.abs, s = Math.floor;
  return gi = function(a) {
    var u, c, l, f;
    if (!t(a)) return r.apply(this, arguments);
    for (c = e(n(this).length), l = arguments[1], isNaN(l) ? l = 0 : l >= 0 ? l = s(l) : l = e(this.length) - s(o(l)), u = l; u < c; ++u)
      if (i.call(this, u) && (f = this[u], t(f)))
        return u;
    return -1;
  }, gi;
}
var mi, Ea;
function Fh() {
  if (Ea) return mi;
  Ea = 1;
  var t = Eo(), e = Object.create;
  return mi = function() {
    var n = 0, r = [], i = e(null);
    return {
      get: function(o) {
        var s = 0, a = r, u, c = o.length;
        if (c === 0) return a[c] || null;
        if (a = a[c]) {
          for (; s < c - 1; ) {
            if (u = t.call(a[0], o[s]), u === -1) return null;
            a = a[1][u], ++s;
          }
          return u = t.call(a[0], o[s]), u === -1 ? null : a[1][u] || null;
        }
        return null;
      },
      set: function(o) {
        var s = 0, a = r, u, c = o.length;
        if (c === 0)
          a[c] = ++n;
        else {
          for (a[c] || (a[c] = [[], []]), a = a[c]; s < c - 1; )
            u = t.call(a[0], o[s]), u === -1 && (u = a[0].push(o[s]) - 1, a[1].push([[], []])), a = a[1][u], ++s;
          u = t.call(a[0], o[s]), u === -1 && (u = a[0].push(o[s]) - 1), a[1][u] = ++n;
        }
        return i[n] = o, n;
      },
      delete: function(o) {
        var s = 0, a = r, u, c = i[o], l = c.length, f = [];
        if (l === 0)
          delete a[l];
        else if (a = a[l]) {
          for (; s < l - 1; ) {
            if (u = t.call(a[0], c[s]), u === -1)
              return;
            f.push(a, u), a = a[1][u], ++s;
          }
          if (u = t.call(a[0], c[s]), u === -1)
            return;
          for (o = a[1][u], a[0].splice(u, 1), a[1].splice(u, 1); !a[0].length && f.length; )
            u = f.pop(), a = f.pop(), a[0].splice(u, 1), a[1].splice(u, 1);
        }
        delete i[o];
      },
      clear: function() {
        r = [], i = e(null);
      }
    };
  }, mi;
}
var vi, Oa;
function Lh() {
  if (Oa) return vi;
  Oa = 1;
  var t = Eo();
  return vi = function() {
    var e = 0, n = [], r = [];
    return {
      get: function(i) {
        var o = t.call(n, i[0]);
        return o === -1 ? null : r[o];
      },
      set: function(i) {
        return n.push(i[0]), r.push(++e), e;
      },
      delete: function(i) {
        var o = t.call(r, i);
        o !== -1 && (n.splice(o, 1), r.splice(o, 1));
      },
      clear: function() {
        n = [], r = [];
      }
    };
  }, vi;
}
var _i, Ia;
function Bh() {
  if (Ia) return _i;
  Ia = 1;
  var t = Eo(), e = Object.create;
  return _i = function(n) {
    var r = 0, i = [[], []], o = e(null);
    return {
      get: function(s) {
        for (var a = 0, u = i, c; a < n - 1; ) {
          if (c = t.call(u[0], s[a]), c === -1) return null;
          u = u[1][c], ++a;
        }
        return c = t.call(u[0], s[a]), c === -1 ? null : u[1][c] || null;
      },
      set: function(s) {
        for (var a = 0, u = i, c; a < n - 1; )
          c = t.call(u[0], s[a]), c === -1 && (c = u[0].push(s[a]) - 1, u[1].push([[], []])), u = u[1][c], ++a;
        return c = t.call(u[0], s[a]), c === -1 && (c = u[0].push(s[a]) - 1), u[1][c] = ++r, o[r] = s, r;
      },
      delete: function(s) {
        for (var a = 0, u = i, c, l = [], f = o[s]; a < n - 1; ) {
          if (c = t.call(u[0], f[a]), c === -1)
            return;
          l.push(u, c), u = u[1][c], ++a;
        }
        if (c = t.call(u[0], f[a]), c !== -1) {
          for (s = u[1][c], u[0].splice(c, 1), u[1].splice(c, 1); !u[0].length && l.length; )
            c = l.pop(), u = l.pop(), u[0].splice(c, 1), u[1].splice(c, 1);
          delete o[s];
        }
      },
      clear: function() {
        i = [[], []], o = e(null);
      }
    };
  }, _i;
}
var za = {}, yi, Ca;
function kc() {
  if (Ca) return yi;
  Ca = 1;
  var t = Ft(), e = Gn(), n = Function.prototype.call;
  return yi = function(r, i) {
    var o = {}, s = arguments[2];
    return t(i), e(r, function(a, u, c, l) {
      o[u] = n.call(i, s, a, u, c, l);
    }), o;
  }, yi;
}
var wi, Na;
function Oo() {
  if (Na) return wi;
  Na = 1;
  var t = function(n) {
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    return n;
  }, e = function(n) {
    var r = document.createTextNode(""), i, o, s = 0;
    return new n(function() {
      var a;
      if (i)
        o && (i = o.concat(i));
      else {
        if (!o) return;
        i = o;
      }
      if (o = i, i = null, typeof o == "function") {
        a = o, o = null, a();
        return;
      }
      for (r.data = s = ++s % 2; o; )
        a = o.shift(), o.length || (o = null), a();
    }).observe(r, { characterData: !0 }), function(a) {
      if (t(a), i) {
        typeof i == "function" ? i = [i, a] : i.push(a);
        return;
      }
      i = a, r.data = s = ++s % 2;
    };
  };
  return wi = (function() {
    if (typeof process == "object" && process && typeof process.nextTick == "function")
      return process.nextTick;
    if (typeof queueMicrotask == "function")
      return function(n) {
        queueMicrotask(t(n));
      };
    if (typeof document == "object" && document) {
      if (typeof MutationObserver == "function") return e(MutationObserver);
      if (typeof WebKitMutationObserver == "function") return e(WebKitMutationObserver);
    }
    return typeof setImmediate == "function" ? function(n) {
      setImmediate(t(n));
    } : typeof setTimeout == "function" || typeof setTimeout == "object" ? function(n) {
      setTimeout(t(n), 0);
    } : null;
  })(), wi;
}
var Ra;
function qh() {
  if (Ra) return za;
  Ra = 1;
  var t = $o(), e = kc(), n = Nc(), r = Rc(), i = Oo(), o = Array.prototype.slice, s = Function.prototype.apply, a = Object.create;
  return Yt().async = function(u, c) {
    var l = a(null), f = a(null), h = c.memoized, d = c.original, m, g, y;
    c.memoized = r(function(_) {
      var w = arguments, b = w[w.length - 1];
      return typeof b == "function" && (m = b, w = o.call(w, 0, -1)), h.apply(g = this, y = w);
    }, h);
    try {
      n(c.memoized, h);
    } catch {
    }
    c.on("get", function(_) {
      var w, b, p;
      if (m) {
        if (l[_]) {
          typeof l[_] == "function" ? l[_] = [l[_], m] : l[_].push(m), m = null;
          return;
        }
        w = m, b = g, p = y, m = g = y = null, i(function() {
          var x;
          hasOwnProperty.call(f, _) ? (x = f[_], c.emit("getasync", _, p, b), s.call(w, x.context, x.args)) : (m = w, g = b, y = p, h.apply(b, p));
        });
      }
    }), c.original = function() {
      var _, w, b, p;
      return m ? (_ = t(arguments), w = function x(T) {
        var $, I, j = x.id;
        if (j == null) {
          i(s.bind(x, this, arguments));
          return;
        }
        if (delete x.id, $ = l[j], delete l[j], !!$)
          return I = t(arguments), c.has(j) && (T ? c.delete(j) : (f[j] = { context: this, args: I }, c.emit("setasync", j, typeof $ == "function" ? 1 : $.length))), typeof $ == "function" ? p = s.call($, this, I) : $.forEach(function(J) {
            p = s.call(J, this, I);
          }, this), p;
      }, b = m, m = g = y = null, _.push(w), p = s.call(d, this, _), w.cb = b, m = w, p) : s.call(d, this, arguments);
    }, c.on("set", function(_) {
      if (!m) {
        c.delete(_);
        return;
      }
      l[_] ? typeof l[_] == "function" ? l[_] = [l[_], m.cb] : l[_].push(m.cb) : l[_] = m.cb, delete m.cb, m.id = _, m = null;
    }), c.on("delete", function(_) {
      var w;
      hasOwnProperty.call(l, _) || f[_] && (w = f[_], delete f[_], c.emit("deleteasync", _, o.call(w.args, 1)));
    }), c.on("clear", function() {
      var _ = f;
      f = a(null), c.emit(
        "clearasync",
        e(_, function(w) {
          return o.call(w.args, 1);
        })
      );
    });
  }, za;
}
var Pa = {}, bi, Ma;
function Wh() {
  if (Ma) return bi;
  Ma = 1;
  var t = Array.prototype.forEach, e = Object.create;
  return bi = function(n) {
    var r = e(null);
    return t.call(arguments, function(i) {
      r[i] = !0;
    }), r;
  }, bi;
}
var xi, ka;
function Dc() {
  return ka || (ka = 1, xi = function(t) {
    return typeof t == "function";
  }), xi;
}
var Ai, Da;
function Uh() {
  if (Da) return Ai;
  Da = 1;
  var t = Dc();
  return Ai = function(e) {
    try {
      return e && t(e.toString) ? e.toString() : String(e);
    } catch {
      throw new TypeError("Passed argument cannot be stringifed");
    }
  }, Ai;
}
var Si, ja;
function Gh() {
  if (ja) return Si;
  ja = 1;
  var t = ye(), e = Uh();
  return Si = function(n) {
    return e(t(n));
  }, Si;
}
var Ti, Za;
function Vh() {
  if (Za) return Ti;
  Za = 1;
  var t = Dc();
  return Ti = function(e) {
    try {
      return e && t(e.toString) ? e.toString() : String(e);
    } catch {
      return "<Non-coercible to string value>";
    }
  }, Ti;
}
var $i, Fa;
function Xh() {
  if (Fa) return $i;
  Fa = 1;
  var t = Vh(), e = /[\n\r\u2028\u2029]/g;
  return $i = function(n) {
    var r = t(n);
    return r.length > 100 && (r = r.slice(0, 99) + "…"), r = r.replace(e, function(i) {
      return JSON.stringify(i).slice(1, -1);
    }), r;
  }, $i;
}
var Qe = { exports: {} }, La;
function jc() {
  if (La) return Qe.exports;
  La = 1, Qe.exports = t, Qe.exports.default = t;
  function t(e) {
    return !!e && (typeof e == "object" || typeof e == "function") && typeof e.then == "function";
  }
  return Qe.exports;
}
var Ba;
function Hh() {
  if (Ba) return Pa;
  Ba = 1;
  var t = kc(), e = Wh(), n = Gh(), r = Xh(), i = jc(), o = Oo(), s = Object.create, a = e("then", "then:finally", "done", "done:finally");
  return Yt().promise = function(u, c) {
    var l = s(null), f = s(null), h = s(null);
    if (u === !0)
      u = null;
    else if (u = n(u), !a[u])
      throw new TypeError("'" + r(u) + "' is not valid promise mode");
    c.on("set", function(d, m, g) {
      var y = !1;
      if (!i(g)) {
        f[d] = g, c.emit("setasync", d, 1);
        return;
      }
      l[d] = 1, h[d] = g;
      var _ = function(x) {
        var T = l[d];
        if (y)
          throw new Error(
            `Memoizee error: Detected unordered then|done & finally resolution, which in turn makes proper detection of success/failure impossible (when in 'done:finally' mode)
Consider to rely on 'then' or 'done' mode instead.`
          );
        T && (delete l[d], f[d] = x, c.emit("setasync", d, T));
      }, w = function() {
        y = !0, l[d] && (delete l[d], delete h[d], c.delete(d));
      }, b = u;
      if (b || (b = "then"), b === "then") {
        var p = function() {
          o(w);
        };
        g = g.then(function(x) {
          o(_.bind(this, x));
        }, p), typeof g.finally == "function" && g.finally(p);
      } else if (b === "done") {
        if (typeof g.done != "function")
          throw new Error(
            "Memoizee error: Retrieved promise does not implement 'done' in 'done' mode"
          );
        g.done(_, w);
      } else if (b === "done:finally") {
        if (typeof g.done != "function")
          throw new Error(
            "Memoizee error: Retrieved promise does not implement 'done' in 'done:finally' mode"
          );
        if (typeof g.finally != "function")
          throw new Error(
            "Memoizee error: Retrieved promise does not implement 'finally' in 'done:finally' mode"
          );
        g.done(_), g.finally(w);
      }
    }), c.on("get", function(d, m, g) {
      var y;
      if (l[d]) {
        ++l[d];
        return;
      }
      y = h[d];
      var _ = function() {
        c.emit("getasync", d, m, g);
      };
      i(y) ? typeof y.done == "function" ? y.done(_) : y.then(function() {
        o(_);
      }) : _();
    }), c.on("delete", function(d) {
      if (delete h[d], l[d]) {
        delete l[d];
        return;
      }
      if (hasOwnProperty.call(f, d)) {
        var m = f[d];
        delete f[d], c.emit("deleteasync", d, [m]);
      }
    }), c.on("clear", function() {
      var d = f;
      f = s(null), l = s(null), h = s(null), c.emit("clearasync", t(d, function(m) {
        return [m];
      }));
    });
  }, Pa;
}
var qa = {}, Wa;
function Yh() {
  if (Wa) return qa;
  Wa = 1;
  var t = Ft(), e = Gn(), n = Yt(), r = Function.prototype.apply;
  return n.dispose = function(i, o, s) {
    var a;
    if (t(i), s.async && n.async || s.promise && n.promise) {
      o.on(
        "deleteasync",
        a = function(u, c) {
          r.call(i, null, c);
        }
      ), o.on("clearasync", function(u) {
        e(u, function(c, l) {
          a(l, c);
        });
      });
      return;
    }
    o.on("delete", a = function(u, c) {
      i(c);
    }), o.on("clear", function(u) {
      e(u, function(c, l) {
        a(l, c);
      });
    });
  }, qa;
}
var Ua = {}, Ei, Ga;
function Jh() {
  return Ga || (Ga = 1, Ei = 2147483647), Ei;
}
var Oi, Va;
function Kh() {
  if (Va) return Oi;
  Va = 1;
  var t = Ht(), e = Jh();
  return Oi = function(n) {
    if (n = t(n), n > e) throw new TypeError(n + " exceeds maximum possible timeout");
    return n;
  }, Oi;
}
var Xa;
function Qh() {
  if (Xa) return Ua;
  Xa = 1;
  var t = $o(), e = Gn(), n = Oo(), r = jc(), i = Kh(), o = Yt(), s = Function.prototype, a = Math.max, u = Math.min, c = Object.create;
  return o.maxAge = function(l, f, h) {
    var d, m, g, y;
    l = i(l), l && (d = c(null), m = h.async && o.async || h.promise && o.promise ? "async" : "", f.on("set" + m, function(_) {
      d[_] = setTimeout(function() {
        f.delete(_);
      }, l), typeof d[_].unref == "function" && d[_].unref(), y && (y[_] && y[_] !== "nextTick" && clearTimeout(y[_]), y[_] = setTimeout(function() {
        delete y[_];
      }, g), typeof y[_].unref == "function" && y[_].unref());
    }), f.on("delete" + m, function(_) {
      clearTimeout(d[_]), delete d[_], y && (y[_] !== "nextTick" && clearTimeout(y[_]), delete y[_]);
    }), h.preFetch && (h.preFetch === !0 || isNaN(h.preFetch) ? g = 0.333 : g = a(u(Number(h.preFetch), 1), 0), g && (y = {}, g = (1 - g) * l, f.on("get" + m, function(_, w, b) {
      y[_] || (y[_] = "nextTick", n(function() {
        var p;
        y[_] === "nextTick" && (delete y[_], f.delete(_), h.async && (w = t(w), w.push(s)), p = f.memoized.apply(b, w), h.promise && r(p) && (typeof p.done == "function" ? p.done(s, s) : p.then(s, s)));
      }));
    }))), f.on("clear" + m, function() {
      e(d, function(_) {
        clearTimeout(_);
      }), d = {}, y && (e(y, function(_) {
        _ !== "nextTick" && clearTimeout(_);
      }), y = {});
    }));
  }, Ua;
}
var Ha = {}, Ii, Ya;
function td() {
  if (Ya) return Ii;
  Ya = 1;
  var t = Ht(), e = Object.create, n = Object.prototype.hasOwnProperty;
  return Ii = function(r) {
    var i = 0, o = 1, s = e(null), a = e(null), u = 0, c;
    return r = t(r), {
      hit: function(l) {
        var f = a[l], h = ++u;
        if (s[h] = l, a[l] = h, !f)
          return ++i, i <= r ? void 0 : (l = s[o], c(l), l);
        if (delete s[f], o === f)
          for (; !n.call(s, ++o); ) ;
      },
      delete: c = function(l) {
        var f = a[l];
        if (f && (delete s[f], delete a[l], --i, o === f)) {
          if (!i) {
            u = 0, o = 1;
            return;
          }
          for (; !n.call(s, ++o); ) ;
        }
      },
      clear: function() {
        i = 0, o = 1, s = e(null), a = e(null), u = 0;
      }
    };
  }, Ii;
}
var Ja;
function ed() {
  if (Ja) return Ha;
  Ja = 1;
  var t = Ht(), e = td(), n = Yt();
  return n.max = function(r, i, o) {
    var s, a, u;
    r = t(r), r && (a = e(r), s = o.async && n.async || o.promise && n.promise ? "async" : "", i.on(
      "set" + s,
      u = function(c) {
        c = a.hit(c), c !== void 0 && i.delete(c);
      }
    ), i.on("get" + s, u), i.on("delete" + s, a.delete), i.on("clear" + s, a.clear));
  }, Ha;
}
var Ka = {}, Qa;
function nd() {
  if (Qa) return Ka;
  Qa = 1;
  var t = Jt(), e = Yt(), n = Object.create, r = Object.defineProperties;
  return e.refCounter = function(i, o, s) {
    var a, u;
    a = n(null), u = s.async && e.async || s.promise && e.promise ? "async" : "", o.on("set" + u, function(c, l) {
      a[c] = l || 1;
    }), o.on("get" + u, function(c) {
      ++a[c];
    }), o.on("delete" + u, function(c) {
      delete a[c];
    }), o.on("clear" + u, function() {
      a = {};
    }), r(o.memoized, {
      deleteRef: t(function() {
        var c = o.get(arguments);
        return c === null || !a[c] ? null : --a[c] ? !1 : (o.delete(c), !0);
      }),
      getRefCount: t(function() {
        var c = o.get(arguments);
        return c === null || !a[c] ? 0 : a[c];
      })
    });
  }, Ka;
}
var zi, tu;
function rd() {
  if (tu) return zi;
  tu = 1;
  var t = Ic(), e = zc(), n = Ph();
  return zi = function(r) {
    var i = t(arguments[1]), o;
    return i.normalizer || (o = i.length = e(i.length, r.length, i.async), o !== 0 && (i.primitive ? o === !1 ? i.normalizer = Mh() : o > 1 && (i.normalizer = kh()(o)) : o === !1 ? i.normalizer = Fh()() : o === 1 ? i.normalizer = Lh()() : i.normalizer = Bh()(o))), i.async && qh(), i.promise && Hh(), i.dispose && Yh(), i.maxAge && Qh(), i.max && ed(), i.refCounter && nd(), n(r, i);
  }, zi;
}
var id = rd();
const Y = /* @__PURE__ */ Xf(id), od = Y(
  (t, e, n, r) => {
    const i = Math.max(t, n), o = Math.min(e, r);
    return i < o;
  }
), Io = (t, e) => od(t.start, t.end, e.start, e.end), eu = {
  INVALID_ANNOTATION: "Invalid annotation",
  INVALID_LINE: "Invalid line"
};
class N {
  constructor() {
    this._verboseEnabled = !1, this._debugEnabled = !1;
  }
  static get instance() {
    return N._instance || (N._instance = new N()), N._instance;
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
  static warn(...e) {
    console.warn(...e);
  }
  static time(e, n) {
    const i = Date.now() - e, o = `${n} took ${i} ms , ${i / 1e3} s`;
    i > 1e3 ? console.warn("TIMER", o) : N.debug("TIMER", o);
  }
  static debug(e, n, ...r) {
    this.debugEnabled && console.log(N.formatMessage(e, n), r);
  }
  static verbose(e, n, ...r) {
    this.verboseEnabled && console.debug(N.formatMessage(e, n), r);
  }
  static formatMessage(e, n) {
    return `${e}: ${n}`;
  }
}
class zo {
  constructor() {
    this.eventMap = /* @__PURE__ */ new Map(), this.errorSet = [], this.eventMap.set("all", []);
  }
  register(e, n) {
    this.eventMap.has(e) || this.eventMap.set(e, []), this.eventMap.get(e)?.push(n);
  }
  registerError(e) {
    this.errorSet.push(e);
  }
  sendError(e, n, ...r) {
    N.warn(`[${eu[e]}] - `, n, ...r), this.errorSet.forEach(
      (i) => i({ code: e, error: eu[e], message: n, params: r })
    );
  }
  sendEvent(e, n, r) {
    const i = [
      this.eventMap.get(e),
      this.eventMap.get("all")
    ].flat();
    for (const o of i)
      o && o({ event: e, mouseEvent: r, data: n });
  }
}
var sd = { value: () => {
} };
function Co() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new vn(n);
}
function vn(t) {
  this._ = t;
}
function ad(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
vn.prototype = Co.prototype = {
  constructor: vn,
  on: function(t, e) {
    var n = this._, r = ad(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = ud(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = nu(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = nu(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new vn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function ud(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function nu(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = sd, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Xi = "http://www.w3.org/1999/xhtml";
const ru = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Xi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Xn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ru.hasOwnProperty(e) ? { space: ru[e], local: t } : t;
}
function cd(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Xi && e.documentElement.namespaceURI === Xi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ld(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Zc(t) {
  var e = Xn(t);
  return (e.local ? ld : cd)(e);
}
function fd() {
}
function No(t) {
  return t == null ? fd : function() {
    return this.querySelector(t);
  };
}
function hd(t) {
  typeof t != "function" && (t = No(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), u, c, l = 0; l < s; ++l)
      (u = o[l]) && (c = t.call(u, u.__data__, l, o)) && ("__data__" in u && (c.__data__ = u.__data__), a[l] = c);
  return new st(r, this._parents);
}
function dd(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function pd() {
  return [];
}
function Fc(t) {
  return t == null ? pd : function() {
    return this.querySelectorAll(t);
  };
}
function gd(t) {
  return function() {
    return dd(t.apply(this, arguments));
  };
}
function md(t) {
  typeof t == "function" ? t = gd(t) : t = Fc(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, u, c = 0; c < a; ++c)
      (u = s[c]) && (r.push(t.call(u, u.__data__, c, s)), i.push(u));
  return new st(r, i);
}
function Lc(t) {
  return function() {
    return this.matches(t);
  };
}
function Bc(t) {
  return function(e) {
    return e.matches(t);
  };
}
var vd = Array.prototype.find;
function _d(t) {
  return function() {
    return vd.call(this.children, t);
  };
}
function yd() {
  return this.firstElementChild;
}
function wd(t) {
  return this.select(t == null ? yd : _d(typeof t == "function" ? t : Bc(t)));
}
var bd = Array.prototype.filter;
function xd() {
  return Array.from(this.children);
}
function Ad(t) {
  return function() {
    return bd.call(this.children, t);
  };
}
function Sd(t) {
  return this.selectAll(t == null ? xd : Ad(typeof t == "function" ? t : Bc(t)));
}
function Td(t) {
  typeof t != "function" && (t = Lc(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], u, c = 0; c < s; ++c)
      (u = o[c]) && t.call(u, u.__data__, c, o) && a.push(u);
  return new st(r, this._parents);
}
function qc(t) {
  return new Array(t.length);
}
function $d() {
  return new st(this._enter || this._groups.map(qc), this._parents);
}
function En(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
En.prototype = {
  constructor: En,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Ed(t) {
  return function() {
    return t;
  };
}
function Od(t, e, n, r, i, o) {
  for (var s = 0, a, u = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new En(t, o[s]);
  for (; s < u; ++s)
    (a = e[s]) && (i[s] = a);
}
function Id(t, e, n, r, i, o, s) {
  var a, u, c = /* @__PURE__ */ new Map(), l = e.length, f = o.length, h = new Array(l), d;
  for (a = 0; a < l; ++a)
    (u = e[a]) && (h[a] = d = s.call(u, u.__data__, a, e) + "", c.has(d) ? i[a] = u : c.set(d, u));
  for (a = 0; a < f; ++a)
    d = s.call(t, o[a], a, o) + "", (u = c.get(d)) ? (r[a] = u, u.__data__ = o[a], c.delete(d)) : n[a] = new En(t, o[a]);
  for (a = 0; a < l; ++a)
    (u = e[a]) && c.get(h[a]) === u && (i[a] = u);
}
function zd(t) {
  return t.__data__;
}
function Cd(t, e) {
  if (!arguments.length) return Array.from(this, zd);
  var n = e ? Id : Od, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ed(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), u = new Array(o), c = 0; c < o; ++c) {
    var l = r[c], f = i[c], h = f.length, d = Nd(t.call(l, l && l.__data__, c, r)), m = d.length, g = a[c] = new Array(m), y = s[c] = new Array(m), _ = u[c] = new Array(h);
    n(l, f, g, y, _, d, e);
    for (var w = 0, b = 0, p, x; w < m; ++w)
      if (p = g[w]) {
        for (w >= b && (b = w + 1); !(x = y[b]) && ++b < m; ) ;
        p._next = x || null;
      }
  }
  return s = new st(s, r), s._enter = a, s._exit = u, s;
}
function Nd(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Rd() {
  return new st(this._exit || this._groups.map(qc), this._parents);
}
function Pd(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Md(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), u = 0; u < s; ++u)
    for (var c = n[u], l = r[u], f = c.length, h = a[u] = new Array(f), d, m = 0; m < f; ++m)
      (d = c[m] || l[m]) && (h[m] = d);
  for (; u < i; ++u)
    a[u] = n[u];
  return new st(a, this._parents);
}
function kd() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Dd(t) {
  t || (t = jd);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, u = i[o] = new Array(a), c, l = 0; l < a; ++l)
      (c = s[l]) && (u[l] = c);
    u.sort(e);
  }
  return new st(i, this._parents).order();
}
function jd(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Zd() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Fd() {
  return Array.from(this);
}
function Ld() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Bd() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function qd() {
  return !this.node();
}
function Wd(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Ud(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Gd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vd(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Xd(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Hd(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Yd(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Jd(t, e) {
  var n = Xn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Gd : Ud : typeof e == "function" ? n.local ? Yd : Hd : n.local ? Xd : Vd)(n, e));
}
function Wc(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Kd(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qd(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function tp(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ep(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Kd : typeof e == "function" ? tp : Qd)(t, e, n ?? "")) : fe(this.node(), t);
}
function fe(t, e) {
  return t.style.getPropertyValue(e) || Wc(t).getComputedStyle(t, null).getPropertyValue(e);
}
function np(t) {
  return function() {
    delete this[t];
  };
}
function rp(t, e) {
  return function() {
    this[t] = e;
  };
}
function ip(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function op(t, e) {
  return arguments.length > 1 ? this.each((e == null ? np : typeof e == "function" ? ip : rp)(t, e)) : this.node()[t];
}
function Uc(t) {
  return t.trim().split(/^|\s+/);
}
function Ro(t) {
  return t.classList || new Gc(t);
}
function Gc(t) {
  this._node = t, this._names = Uc(t.getAttribute("class") || "");
}
Gc.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Vc(t, e) {
  for (var n = Ro(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Xc(t, e) {
  for (var n = Ro(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function sp(t) {
  return function() {
    Vc(this, t);
  };
}
function ap(t) {
  return function() {
    Xc(this, t);
  };
}
function up(t, e) {
  return function() {
    (e.apply(this, arguments) ? Vc : Xc)(this, t);
  };
}
function cp(t, e) {
  var n = Uc(t + "");
  if (arguments.length < 2) {
    for (var r = Ro(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? up : e ? sp : ap)(n, e));
}
function lp() {
  this.textContent = "";
}
function fp(t) {
  return function() {
    this.textContent = t;
  };
}
function hp(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function dp(t) {
  return arguments.length ? this.each(t == null ? lp : (typeof t == "function" ? hp : fp)(t)) : this.node().textContent;
}
function pp() {
  this.innerHTML = "";
}
function gp(t) {
  return function() {
    this.innerHTML = t;
  };
}
function mp(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function vp(t) {
  return arguments.length ? this.each(t == null ? pp : (typeof t == "function" ? mp : gp)(t)) : this.node().innerHTML;
}
function _p() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yp() {
  return this.each(_p);
}
function wp() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function bp() {
  return this.each(wp);
}
function xp(t) {
  var e = typeof t == "function" ? t : Zc(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ap() {
  return null;
}
function Sp(t, e) {
  var n = typeof t == "function" ? t : Zc(t), r = e == null ? Ap : typeof e == "function" ? e : No(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Tp() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function $p() {
  return this.each(Tp);
}
function Ep() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Op() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ip(t) {
  return this.select(t ? Op : Ep);
}
function zp(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Cp(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Np(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Rp(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Pp(t, e, n) {
  return function() {
    var r = this.__on, i, o = Cp(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Mp(t, e, n) {
  var r = Np(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var u = 0, c = a.length, l; u < c; ++u)
        for (i = 0, l = a[u]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = e ? Pp : Rp, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function Hc(t, e, n) {
  var r = Wc(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function kp(t, e) {
  return function() {
    return Hc(this, t, e);
  };
}
function Dp(t, e) {
  return function() {
    return Hc(this, t, e.apply(this, arguments));
  };
}
function jp(t, e) {
  return this.each((typeof e == "function" ? Dp : kp)(t, e));
}
function* Zp() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Yc = [null];
function st(t, e) {
  this._groups = t, this._parents = e;
}
function Ge() {
  return new st([[document.documentElement]], Yc);
}
function Fp() {
  return this;
}
st.prototype = Ge.prototype = {
  constructor: st,
  select: hd,
  selectAll: md,
  selectChild: wd,
  selectChildren: Sd,
  filter: Td,
  data: Cd,
  enter: $d,
  exit: Rd,
  join: Pd,
  merge: Md,
  selection: Fp,
  order: kd,
  sort: Dd,
  call: Zd,
  nodes: Fd,
  node: Ld,
  size: Bd,
  empty: qd,
  each: Wd,
  attr: Jd,
  style: ep,
  property: op,
  classed: cp,
  text: dp,
  html: vp,
  raise: yp,
  lower: bp,
  append: xp,
  insert: Sp,
  remove: $p,
  clone: Ip,
  datum: zp,
  on: Mp,
  dispatch: jp,
  [Symbol.iterator]: Zp
};
function Pe(t) {
  return typeof t == "string" ? new st([[document.querySelector(t)]], [document.documentElement]) : new st([[t]], Yc);
}
function Lp(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function iu(t, e) {
  if (t = Lp(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const Bp = { passive: !1 }, Me = { capture: !0, passive: !1 };
function Ci(t) {
  t.stopImmediatePropagation();
}
function ue(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function qp(t) {
  var e = t.document.documentElement, n = Pe(t).on("dragstart.drag", ue, Me);
  "onselectstart" in e ? n.on("selectstart.drag", ue, Me) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Wp(t, e) {
  var n = t.document.documentElement, r = Pe(t).on("dragstart.drag", null);
  e && (r.on("click.drag", ue, Me), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const tn = (t) => () => t;
function Hi(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: s,
  y: a,
  dx: u,
  dy: c,
  dispatch: l
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
Hi.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Up(t) {
  return !t.ctrlKey && !t.button;
}
function Gp() {
  return this.parentNode;
}
function Vp(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Xp() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jc() {
  var t = Up, e = Gp, n = Vp, r = Xp, i = {}, o = Co("start", "drag", "end"), s = 0, a, u, c, l, f = 0;
  function h(p) {
    p.on("mousedown.drag", d).filter(r).on("touchstart.drag", y).on("touchmove.drag", _, Bp).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(p, x) {
    if (!(l || !t.call(this, p, x))) {
      var T = b(this, e.call(this, p, x), p, x, "mouse");
      T && (Pe(p.view).on("mousemove.drag", m, Me).on("mouseup.drag", g, Me), qp(p.view), Ci(p), c = !1, a = p.clientX, u = p.clientY, T("start", p));
    }
  }
  function m(p) {
    if (ue(p), !c) {
      var x = p.clientX - a, T = p.clientY - u;
      c = x * x + T * T > f;
    }
    i.mouse("drag", p);
  }
  function g(p) {
    Pe(p.view).on("mousemove.drag mouseup.drag", null), Wp(p.view, c), ue(p), i.mouse("end", p);
  }
  function y(p, x) {
    if (t.call(this, p, x)) {
      var T = p.changedTouches, $ = e.call(this, p, x), I = T.length, j, J;
      for (j = 0; j < I; ++j)
        (J = b(this, $, p, x, T[j].identifier, T[j])) && (Ci(p), J("start", p, T[j]));
    }
  }
  function _(p) {
    var x = p.changedTouches, T = x.length, $, I;
    for ($ = 0; $ < T; ++$)
      (I = i[x[$].identifier]) && (ue(p), I("drag", p, x[$]));
  }
  function w(p) {
    var x = p.changedTouches, T = x.length, $, I;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), $ = 0; $ < T; ++$)
      (I = i[x[$].identifier]) && (Ci(p), I("end", p, x[$]));
  }
  function b(p, x, T, $, I, j) {
    var J = o.copy(), Q = iu(j || T, x), wt, bt, G;
    if ((G = n.call(p, new Hi("beforestart", {
      sourceEvent: T,
      target: h,
      identifier: I,
      active: s,
      x: Q[0],
      y: Q[1],
      dx: 0,
      dy: 0,
      dispatch: J
    }), $)) != null)
      return wt = G.x - Q[0] || 0, bt = G.y - Q[1] || 0, function O(z, X, H) {
        var vs = Q, lr;
        switch (z) {
          case "start":
            i[I] = O, lr = s++;
            break;
          case "end":
            delete i[I], --s;
          // falls through
          case "drag":
            Q = iu(H || X, x), lr = s;
            break;
        }
        J.call(
          z,
          p,
          new Hi(z, {
            sourceEvent: X,
            subject: G,
            target: h,
            identifier: I,
            active: lr,
            x: Q[0] + wt,
            y: Q[1] + bt,
            dx: Q[0] - vs[0],
            dy: Q[1] - vs[1],
            dispatch: J
          }),
          $
        );
      };
  }
  return h.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : tn(!!p), h) : t;
  }, h.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : tn(p), h) : e;
  }, h.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : tn(p), h) : n;
  }, h.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : tn(!!p), h) : r;
  }, h.on = function() {
    var p = o.on.apply(o, arguments);
    return p === o ? h : p;
  }, h.clickDistance = function(p) {
    return arguments.length ? (f = (p = +p) * p, h) : Math.sqrt(f);
  }, h;
}
function Po(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Kc(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Ve() {
}
var ke = 0.7, On = 1 / ke, ce = "\\s*([+-]?\\d+)\\s*", De = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", At = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Hp = /^#([0-9a-f]{3,8})$/, Yp = new RegExp(`^rgb\\(${ce},${ce},${ce}\\)$`), Jp = new RegExp(`^rgb\\(${At},${At},${At}\\)$`), Kp = new RegExp(`^rgba\\(${ce},${ce},${ce},${De}\\)$`), Qp = new RegExp(`^rgba\\(${At},${At},${At},${De}\\)$`), tg = new RegExp(`^hsl\\(${De},${At},${At}\\)$`), eg = new RegExp(`^hsla\\(${De},${At},${At},${De}\\)$`), ou = {
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
Po(Ve, je, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: su,
  // Deprecated! Use color.formatHex.
  formatHex: su,
  formatHex8: ng,
  formatHsl: rg,
  formatRgb: au,
  toString: au
});
function su() {
  return this.rgb().formatHex();
}
function ng() {
  return this.rgb().formatHex8();
}
function rg() {
  return Qc(this).formatHsl();
}
function au() {
  return this.rgb().formatRgb();
}
function je(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Hp.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? uu(e) : n === 3 ? new nt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? en(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? en(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Yp.exec(t)) ? new nt(e[1], e[2], e[3], 1) : (e = Jp.exec(t)) ? new nt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Kp.exec(t)) ? en(e[1], e[2], e[3], e[4]) : (e = Qp.exec(t)) ? en(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = tg.exec(t)) ? fu(e[1], e[2] / 100, e[3] / 100, 1) : (e = eg.exec(t)) ? fu(e[1], e[2] / 100, e[3] / 100, e[4]) : ou.hasOwnProperty(t) ? uu(ou[t]) : t === "transparent" ? new nt(NaN, NaN, NaN, 0) : null;
}
function uu(t) {
  return new nt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function en(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new nt(t, e, n, r);
}
function ig(t) {
  return t instanceof Ve || (t = je(t)), t ? (t = t.rgb(), new nt(t.r, t.g, t.b, t.opacity)) : new nt();
}
function Yi(t, e, n, r) {
  return arguments.length === 1 ? ig(t) : new nt(t, e, n, r ?? 1);
}
function nt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Po(nt, Yi, Kc(Ve, {
  brighter(t) {
    return t = t == null ? On : Math.pow(On, t), new nt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ke : Math.pow(ke, t), new nt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new nt(Ut(this.r), Ut(this.g), Ut(this.b), In(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: cu,
  // Deprecated! Use color.formatHex.
  formatHex: cu,
  formatHex8: og,
  formatRgb: lu,
  toString: lu
}));
function cu() {
  return `#${Wt(this.r)}${Wt(this.g)}${Wt(this.b)}`;
}
function og() {
  return `#${Wt(this.r)}${Wt(this.g)}${Wt(this.b)}${Wt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function lu() {
  const t = In(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ut(this.r)}, ${Ut(this.g)}, ${Ut(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function In(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ut(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Wt(t) {
  return t = Ut(t), (t < 16 ? "0" : "") + t.toString(16);
}
function fu(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new pt(t, e, n, r);
}
function Qc(t) {
  if (t instanceof pt) return new pt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ve || (t = je(t)), !t) return new pt();
  if (t instanceof pt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, u = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= u < 0.5 ? o + i : 2 - o - i, s *= 60) : a = u > 0 && u < 1 ? 0 : s, new pt(s, a, u, t.opacity);
}
function sg(t, e, n, r) {
  return arguments.length === 1 ? Qc(t) : new pt(t, e, n, r ?? 1);
}
function pt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Po(pt, sg, Kc(Ve, {
  brighter(t) {
    return t = t == null ? On : Math.pow(On, t), new pt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ke : Math.pow(ke, t), new pt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new nt(
      Ni(t >= 240 ? t - 240 : t + 120, i, r),
      Ni(t, i, r),
      Ni(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new pt(hu(this.h), nn(this.s), nn(this.l), In(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = In(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${hu(this.h)}, ${nn(this.s) * 100}%, ${nn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function hu(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function nn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ni(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const tl = (t) => () => t;
function ag(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ug(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function cg(t) {
  return (t = +t) == 1 ? el : function(e, n) {
    return n - e ? ug(e, n, t) : tl(isNaN(e) ? n : e);
  };
}
function el(t, e) {
  var n = e - t;
  return n ? ag(t, n) : tl(isNaN(t) ? e : t);
}
const du = (function t(e) {
  var n = cg(e);
  function r(i, o) {
    var s = n((i = Yi(i)).r, (o = Yi(o)).r), a = n(i.g, o.g), u = n(i.b, o.b), c = el(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = u(l), i.opacity = c(l), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function Pt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ri = new RegExp(Ji.source, "g");
function lg(t) {
  return function() {
    return t;
  };
}
function fg(t) {
  return function(e) {
    return t(e) + "";
  };
}
function hg(t, e) {
  var n = Ji.lastIndex = Ri.lastIndex = 0, r, i, o, s = -1, a = [], u = [];
  for (t = t + "", e = e + ""; (r = Ji.exec(t)) && (i = Ri.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, u.push({ i: s, x: Pt(r, i) })), n = Ri.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? u[0] ? fg(u[0].x) : lg(e) : (e = u.length, function(c) {
    for (var l = 0, f; l < e; ++l) a[(f = u[l]).i] = f.x(c);
    return a.join("");
  });
}
var pu = 180 / Math.PI, Ki = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function nl(t, e, n, r, i, o) {
  var s, a, u;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (u = t * n + e * r) && (n -= t * u, r -= e * u), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, u /= a), t * r < e * n && (t = -t, e = -e, u = -u, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * pu,
    skewX: Math.atan(u) * pu,
    scaleX: s,
    scaleY: a
  };
}
var rn;
function dg(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ki : nl(e.a, e.b, e.c, e.d, e.e, e.f);
}
function pg(t) {
  return t == null || (rn || (rn = document.createElementNS("http://www.w3.org/2000/svg", "g")), rn.setAttribute("transform", t), !(t = rn.transform.baseVal.consolidate())) ? Ki : (t = t.matrix, nl(t.a, t.b, t.c, t.d, t.e, t.f));
}
function rl(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, l, f, h, d, m) {
    if (c !== f || l !== h) {
      var g = d.push("translate(", null, e, null, n);
      m.push({ i: g - 4, x: Pt(c, f) }, { i: g - 2, x: Pt(l, h) });
    } else (f || h) && d.push("translate(" + f + e + h + n);
  }
  function s(c, l, f, h) {
    c !== l ? (c - l > 180 ? l += 360 : l - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Pt(c, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function a(c, l, f, h) {
    c !== l ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Pt(c, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function u(c, l, f, h, d, m) {
    if (c !== f || l !== h) {
      var g = d.push(i(d) + "scale(", null, ",", null, ")");
      m.push({ i: g - 4, x: Pt(c, f) }, { i: g - 2, x: Pt(l, h) });
    } else (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(c, l) {
    var f = [], h = [];
    return c = t(c), l = t(l), o(c.translateX, c.translateY, l.translateX, l.translateY, f, h), s(c.rotate, l.rotate, f, h), a(c.skewX, l.skewX, f, h), u(c.scaleX, c.scaleY, l.scaleX, l.scaleY, f, h), c = l = null, function(d) {
      for (var m = -1, g = h.length, y; ++m < g; ) f[(y = h[m]).i] = y.x(d);
      return f.join("");
    };
  };
}
var gg = rl(dg, "px, ", "px)", "deg)"), mg = rl(pg, ", ", ")", ")"), he = 0, $e = 0, xe = 0, il = 1e3, zn, Ee, Cn = 0, Gt = 0, Hn = 0, Ze = typeof performance == "object" && performance.now ? performance : Date, ol = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Mo() {
  return Gt || (ol(vg), Gt = Ze.now() + Hn);
}
function vg() {
  Gt = 0;
}
function Nn() {
  this._call = this._time = this._next = null;
}
Nn.prototype = sl.prototype = {
  constructor: Nn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Mo() : +n) + (e == null ? 0 : +e), !this._next && Ee !== this && (Ee ? Ee._next = this : zn = this, Ee = this), this._call = t, this._time = n, Qi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Qi());
  }
};
function sl(t, e, n) {
  var r = new Nn();
  return r.restart(t, e, n), r;
}
function _g() {
  Mo(), ++he;
  for (var t = zn, e; t; )
    (e = Gt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --he;
}
function gu() {
  Gt = (Cn = Ze.now()) + Hn, he = $e = 0;
  try {
    _g();
  } finally {
    he = 0, wg(), Gt = 0;
  }
}
function yg() {
  var t = Ze.now(), e = t - Cn;
  e > il && (Hn -= e, Cn = t);
}
function wg() {
  for (var t, e = zn, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : zn = n);
  Ee = t, Qi(r);
}
function Qi(t) {
  if (!he) {
    $e && ($e = clearTimeout($e));
    var e = t - Gt;
    e > 24 ? (t < 1 / 0 && ($e = setTimeout(gu, t - Ze.now() - Hn)), xe && (xe = clearInterval(xe))) : (xe || (Cn = Ze.now(), xe = setInterval(yg, il)), he = 1, ol(gu));
  }
}
function mu(t, e, n) {
  var r = new Nn();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var bg = Co("start", "end", "cancel", "interrupt"), xg = [], al = 0, vu = 1, to = 2, _n = 3, _u = 4, eo = 5, yn = 6;
function Yn(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Ag(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: bg,
    tween: xg,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: al
  });
}
function ko(t, e) {
  var n = yt(t, e);
  if (n.state > al) throw new Error("too late; already scheduled");
  return n;
}
function Tt(t, e) {
  var n = yt(t, e);
  if (n.state > _n) throw new Error("too late; already running");
  return n;
}
function yt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Ag(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = sl(o, 0, n.time);
  function o(c) {
    n.state = vu, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var l, f, h, d;
    if (n.state !== vu) return u();
    for (l in r)
      if (d = r[l], d.name === n.name) {
        if (d.state === _n) return mu(s);
        d.state === _u ? (d.state = yn, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[l]) : +l < e && (d.state = yn, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[l]);
      }
    if (mu(function() {
      n.state === _n && (n.state = _u, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = to, n.on.call("start", t, t.__data__, n.index, n.group), n.state === to) {
      for (n.state = _n, i = new Array(h = n.tween.length), l = 0, f = -1; l < h; ++l)
        (d = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function a(c) {
    for (var l = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = eo, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, l);
    n.state === eo && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = yn, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Sg(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > to && r.state < eo, r.state = yn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Tg(t) {
  return this.each(function() {
    Sg(this, t);
  });
}
function $g(t, e) {
  var n, r;
  return function() {
    var i = Tt(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Eg(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Tt(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, u = 0, c = i.length; u < c; ++u)
        if (i[u].name === e) {
          i[u] = a;
          break;
        }
      u === c && i.push(a);
    }
    o.tween = i;
  };
}
function Og(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = yt(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? $g : Eg)(n, t, e));
}
function Do(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Tt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return yt(i, r).value[e];
  };
}
function ul(t, e) {
  var n;
  return (typeof e == "number" ? Pt : e instanceof je ? du : (n = je(e)) ? (e = n, du) : hg)(t, e);
}
function Ig(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zg(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Cg(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Ng(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Rg(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), u;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = e(r = s, a)));
  };
}
function Pg(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), u;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = e(r = s, a)));
  };
}
function Mg(t, e) {
  var n = Xn(t), r = n === "transform" ? mg : ul;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Pg : Rg)(n, r, Do(this, "attr." + t, e)) : e == null ? (n.local ? zg : Ig)(n) : (n.local ? Ng : Cg)(n, r, e));
}
function kg(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Dg(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function jg(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Dg(t, o)), n;
  }
  return i._value = e, i;
}
function Zg(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && kg(t, o)), n;
  }
  return i._value = e, i;
}
function Fg(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Xn(t);
  return this.tween(n, (r.local ? jg : Zg)(r, e));
}
function Lg(t, e) {
  return function() {
    ko(this, t).delay = +e.apply(this, arguments);
  };
}
function Bg(t, e) {
  return e = +e, function() {
    ko(this, t).delay = e;
  };
}
function qg(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Lg : Bg)(e, t)) : yt(this.node(), e).delay;
}
function Wg(t, e) {
  return function() {
    Tt(this, t).duration = +e.apply(this, arguments);
  };
}
function Ug(t, e) {
  return e = +e, function() {
    Tt(this, t).duration = e;
  };
}
function Gg(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wg : Ug)(e, t)) : yt(this.node(), e).duration;
}
function Vg(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Tt(this, t).ease = e;
  };
}
function Xg(t) {
  var e = this._id;
  return arguments.length ? this.each(Vg(e, t)) : yt(this.node(), e).ease;
}
function Hg(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Tt(this, t).ease = n;
  };
}
function Yg(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Hg(this._id, t));
}
function Jg(t) {
  typeof t != "function" && (t = Lc(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], u, c = 0; c < s; ++c)
      (u = o[c]) && t.call(u, u.__data__, c, o) && a.push(u);
  return new Ct(r, this._parents, this._name, this._id);
}
function Kg(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var u = e[a], c = n[a], l = u.length, f = s[a] = new Array(l), h, d = 0; d < l; ++d)
      (h = u[d] || c[d]) && (f[d] = h);
  for (; a < r; ++a)
    s[a] = e[a];
  return new Ct(s, this._parents, this._name, this._id);
}
function Qg(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function tm(t, e, n) {
  var r, i, o = Qg(e) ? ko : Tt;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function em(t, e) {
  var n = this._id;
  return arguments.length < 2 ? yt(this.node(), n).on.on(t) : this.each(tm(n, t, e));
}
function nm(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function rm() {
  return this.on("end.remove", nm(this._id));
}
function im(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = No(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], u = a.length, c = o[s] = new Array(u), l, f, h = 0; h < u; ++h)
      (l = a[h]) && (f = t.call(l, l.__data__, h, a)) && ("__data__" in l && (f.__data__ = l.__data__), c[h] = f, Yn(c[h], e, n, h, c, yt(l, n)));
  return new Ct(o, this._parents, e, n);
}
function om(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Fc(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var u = r[a], c = u.length, l, f = 0; f < c; ++f)
      if (l = u[f]) {
        for (var h = t.call(l, l.__data__, f, u), d, m = yt(l, n), g = 0, y = h.length; g < y; ++g)
          (d = h[g]) && Yn(d, e, n, g, h, m);
        o.push(h), s.push(l);
      }
  return new Ct(o, s, e, n);
}
var sm = Ge.prototype.constructor;
function am() {
  return new sm(this._groups, this._parents);
}
function um(t, e) {
  var n, r, i;
  return function() {
    var o = fe(this, t), s = (this.style.removeProperty(t), fe(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function cl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function cm(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = fe(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function lm(t, e, n) {
  var r, i, o;
  return function() {
    var s = fe(this, t), a = n(this), u = a + "";
    return a == null && (u = a = (this.style.removeProperty(t), fe(this, t))), s === u ? null : s === r && u === i ? o : (i = u, o = e(r = s, a));
  };
}
function fm(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var u = Tt(this, t), c = u.on, l = u.value[o] == null ? a || (a = cl(e)) : void 0;
    (c !== n || i !== l) && (r = (n = c).copy()).on(s, i = l), u.on = r;
  };
}
function hm(t, e, n) {
  var r = (t += "") == "transform" ? gg : ul;
  return e == null ? this.styleTween(t, um(t, r)).on("end.style." + t, cl(t)) : typeof e == "function" ? this.styleTween(t, lm(t, r, Do(this, "style." + t, e))).each(fm(this._id, t)) : this.styleTween(t, cm(t, r, e), n).on("end.style." + t, null);
}
function dm(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function pm(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && dm(t, s, n)), r;
  }
  return o._value = e, o;
}
function gm(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, pm(t, e, n ?? ""));
}
function mm(t) {
  return function() {
    this.textContent = t;
  };
}
function vm(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function _m(t) {
  return this.tween("text", typeof t == "function" ? vm(Do(this, "text", t)) : mm(t == null ? "" : t + ""));
}
function ym(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function wm(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ym(i)), e;
  }
  return r._value = t, r;
}
function bm(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, wm(t));
}
function xm() {
  for (var t = this._name, e = this._id, n = ll(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, c = 0; c < a; ++c)
      if (u = s[c]) {
        var l = yt(u, e);
        Yn(u, t, n, c, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new Ct(r, this._parents, t, n);
}
function Am() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var c = Tt(this, r), l = c.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(u)), c.on = e;
    }), i === 0 && o();
  });
}
var Sm = 0;
function Ct(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function ll() {
  return ++Sm;
}
var Et = Ge.prototype;
Ct.prototype = {
  constructor: Ct,
  select: im,
  selectAll: om,
  selectChild: Et.selectChild,
  selectChildren: Et.selectChildren,
  filter: Jg,
  merge: Kg,
  selection: am,
  transition: xm,
  call: Et.call,
  nodes: Et.nodes,
  node: Et.node,
  size: Et.size,
  empty: Et.empty,
  each: Et.each,
  on: em,
  attr: Mg,
  attrTween: Fg,
  style: hm,
  styleTween: gm,
  text: _m,
  textTween: bm,
  remove: rm,
  tween: Og,
  delay: qg,
  duration: Gg,
  ease: Xg,
  easeVarying: Yg,
  end: Am,
  [Symbol.iterator]: Et[Symbol.iterator]
};
function Tm(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var $m = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Tm
};
function Em(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Om(t) {
  var e, n;
  t instanceof Ct ? (e = t._id, t = t._name) : (e = ll(), (n = $m).time = Mo(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, c = 0; c < a; ++c)
      (u = s[c]) && Yn(u, t, e, c, s, n || Em(u, e));
  return new Ct(r, this._parents, t, e);
}
Ge.prototype.interrupt = Tg;
Ge.prototype.transition = Om;
function Oe(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Oe.prototype = {
  constructor: Oe,
  scale: function(t) {
    return t === 1 ? this : new Oe(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Oe(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Oe.prototype;
const Pi = "ghent-cdh-annotation", Xe = {
  text: `annotated-text ${Pi}-text`,
  svg: `${Pi}-svg`,
  wrapper: `${Pi}-wrapper`,
  line: {
    text: {
      wrapper: "content"
    },
    gutter: {
      wrapper: "gutter text"
    }
  }
}, Im = Y((t, e) => t / e || 1), zm = Y(
  (t, e, n, r, i) => ({
    width: oe(t, i),
    height: oe(e, i),
    x: oe(n, i),
    y: oe(r, i)
  })
), fl = (t) => {
  const e = Cm(t), n = Im(e.width, t.offsetWidth), r = {
    width: t.offsetWidth,
    height: t.offsetHeight,
    x: e.x,
    y: e.y
  };
  return {
    original: r,
    scaled: zm(
      r.width,
      r.height,
      r.x,
      r.y,
      n
    ),
    scale: n
  };
}, oe = Y((t, e) => t / e), yu = Y((t, e, n) => (e - t) / n), Cm = (t) => {
  const e = t.getBoundingClientRect(), n = getComputedStyle(t), r = parseFloat(n.lineHeight), i = isNaN(r) ? e.height : r;
  return {
    x: e.x,
    y: e.y,
    width: e.width,
    height: i
  };
}, jo = (t, e) => {
  const n = t.original;
  return {
    x: yu(n.x, e.x, t.scale),
    y: yu(n.y, e.y, t.scale),
    height: oe(e.height, t.scale),
    width: oe(e.width, t.scale)
  };
}, hl = "dummy-uid", V = {
  ANNOTATION_UID: "data-annotation-uid",
  ANNOTATION_ROLE: "data-annotation-role",
  LINE_UID: "data-line-uid"
}, ht = {
  BORDER: "border",
  FILL: "fill",
  HANDLE: "handle",
  ANNOTATIONS: "annotations",
  TAG: "tag"
};
class vt {
  createTextElement() {
    return document ? (this.textElement = document?.createElement("div"), this) : (N.debug("drawText", "no document available, cannot draw text"), this);
  }
  createModel() {
    const e = this.getTextElementDimensions(), n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return this.svg = Pe(n).attr("class", Xe.svg).attr("width", e.original.width).attr("height", e.original.height), this.annotations = this.svg.append("g").attr(
      V.ANNOTATION_ROLE,
      ht.ANNOTATIONS
    ), this.tagSvg = this.svg.append("g").attr(V.ANNOTATION_ROLE, ht.TAG), this.handles = this.svg.append("g").attr(
      V.ANNOTATION_ROLE,
      ht.HANDLE
    ), this;
  }
  getTextElementDimensions() {
    return fl(this.textElement);
  }
  findTags(e) {
    return this.findRelatedAnnotations(
      e,
      `[${V.ANNOTATION_ROLE}="${ht.TAG}"]`
    );
  }
  findRelatedAnnotations(e, n = "") {
    const r = this.svg.selectAll(
      `[data-annotation-uid="${e}"]${n}`
    );
    return r.empty() ? null : r;
  }
  findFills(e) {
    return this.findRelatedAnnotations(
      e,
      `[${V.ANNOTATION_ROLE}="${ht.FILL}"]`
    );
  }
  findBorders(e) {
    return this.findRelatedAnnotations(
      e,
      `[${V.ANNOTATION_ROLE}="${ht.BORDER}"]`
    );
  }
  setClass(e, n) {
    this.findFills(e)?.attr("class", n), this.findBorders(e)?.attr("class", n);
  }
  node() {
    return this.svg.node();
  }
}
class Jn {
  constructor() {
    this.eventMap = /* @__PURE__ */ new Map(), this.block = !1;
  }
  on(e, n) {
    return this.eventMap.has(e) || this.eventMap.set(e, []), this.eventMap.get(e)?.push(n), this;
  }
  get isBlocking() {
    return this.block;
  }
  blockEvents(e) {
    N.debug("InternalEventListener", `Events  "blocked": ${e}`), this.block = !0;
  }
  unBlockEvents(e) {
    N.debug("InternalEventListener", `Events "unblocked": ${e}`), this.block = !1;
  }
  sendEvent(e, n, r) {
    const i = this.eventMap.get(e) ?? [];
    for (const o of i)
      o && o({ event: e, mouseEvent: r, data: n });
  }
}
function v(t, e, n) {
  function r(a, u) {
    if (a._zod || Object.defineProperty(a, "_zod", {
      value: {
        def: u,
        constr: s,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), a._zod.traits.has(t))
      return;
    a._zod.traits.add(t), e(a, u);
    const c = s.prototype, l = Object.keys(c);
    for (let f = 0; f < l.length; f++) {
      const h = l[f];
      h in a || (a[h] = c[h].bind(a));
    }
  }
  const i = n?.Parent ?? Object;
  class o extends i {
  }
  Object.defineProperty(o, "name", { value: t });
  function s(a) {
    var u;
    const c = n?.Parent ? new o() : this;
    r(c, a), (u = c._zod).deferred ?? (u.deferred = []);
    for (const l of c._zod.deferred)
      l();
    return c;
  }
  return Object.defineProperty(s, "init", { value: r }), Object.defineProperty(s, Symbol.hasInstance, {
    value: (a) => n?.Parent && a instanceof n.Parent ? !0 : a?._zod?.traits?.has(t)
  }), Object.defineProperty(s, "name", { value: t }), s;
}
class le extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class dl extends Error {
  constructor(e) {
    super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
  }
}
const pl = {};
function Dt(t) {
  return pl;
}
function gl(t) {
  const e = Object.values(t).filter((r) => typeof r == "number");
  return Object.entries(t).filter(([r, i]) => e.indexOf(+r) === -1).map(([r, i]) => i);
}
function no(t, e) {
  return typeof e == "bigint" ? e.toString() : e;
}
function Zo(t) {
  return {
    get value() {
      {
        const e = t();
        return Object.defineProperty(this, "value", { value: e }), e;
      }
    }
  };
}
function Fo(t) {
  return t == null;
}
function Lo(t) {
  const e = t.startsWith("^") ? 1 : 0, n = t.endsWith("$") ? t.length - 1 : t.length;
  return t.slice(e, n);
}
function Nm(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = e.toString();
  let i = (r.split(".")[1] || "").length;
  if (i === 0 && /\d?e-\d?/.test(r)) {
    const u = r.match(/\d?e-(\d?)/);
    u?.[1] && (i = Number.parseInt(u[1]));
  }
  const o = n > i ? n : i, s = Number.parseInt(t.toFixed(o).replace(".", "")), a = Number.parseInt(e.toFixed(o).replace(".", ""));
  return s % a / 10 ** o;
}
const wu = Symbol("evaluating");
function P(t, e, n) {
  let r;
  Object.defineProperty(t, e, {
    get() {
      if (r !== wu)
        return r === void 0 && (r = wu, r = n()), r;
    },
    set(i) {
      Object.defineProperty(t, e, {
        value: i
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Kt(t, e, n) {
  Object.defineProperty(t, e, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Lt(...t) {
  const e = {};
  for (const n of t) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(e, r);
  }
  return Object.defineProperties({}, e);
}
function bu(t) {
  return JSON.stringify(t);
}
function Rm(t) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const ml = "captureStackTrace" in Error ? Error.captureStackTrace : (...t) => {
};
function Rn(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
const Pm = Zo(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function de(t) {
  if (Rn(t) === !1)
    return !1;
  const e = t.constructor;
  if (e === void 0 || typeof e != "function")
    return !0;
  const n = e.prototype;
  return !(Rn(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function vl(t) {
  return de(t) ? { ...t } : Array.isArray(t) ? [...t] : t;
}
const Mm = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function pe(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Bt(t, e, n) {
  const r = new t._zod.constr(e ?? t._zod.def);
  return (!e || n?.parent) && (r._zod.parent = t), r;
}
function S(t) {
  const e = t;
  if (!e)
    return {};
  if (typeof e == "string")
    return { error: () => e };
  if (e?.message !== void 0) {
    if (e?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    e.error = e.message;
  }
  return delete e.message, typeof e.error == "string" ? { ...e, error: () => e.error } : e;
}
function km(t) {
  return Object.keys(t).filter((e) => t[e]._zod.optin === "optional" && t[e]._zod.optout === "optional");
}
const Dm = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function jm(t, e) {
  const n = t._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = Lt(t._zod.def, {
    get shape() {
      const s = {};
      for (const a in e) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        e[a] && (s[a] = n.shape[a]);
      }
      return Kt(this, "shape", s), s;
    },
    checks: []
  });
  return Bt(t, o);
}
function Zm(t, e) {
  const n = t._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = Lt(t._zod.def, {
    get shape() {
      const s = { ...t._zod.def.shape };
      for (const a in e) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        e[a] && delete s[a];
      }
      return Kt(this, "shape", s), s;
    },
    checks: []
  });
  return Bt(t, o);
}
function Fm(t, e) {
  if (!de(e))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = t._zod.def.checks;
  if (n && n.length > 0) {
    const o = t._zod.def.shape;
    for (const s in e)
      if (Object.getOwnPropertyDescriptor(o, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const i = Lt(t._zod.def, {
    get shape() {
      const o = { ...t._zod.def.shape, ...e };
      return Kt(this, "shape", o), o;
    }
  });
  return Bt(t, i);
}
function Lm(t, e) {
  if (!de(e))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = Lt(t._zod.def, {
    get shape() {
      const r = { ...t._zod.def.shape, ...e };
      return Kt(this, "shape", r), r;
    }
  });
  return Bt(t, n);
}
function Bm(t, e) {
  const n = Lt(t._zod.def, {
    get shape() {
      const r = { ...t._zod.def.shape, ...e._zod.def.shape };
      return Kt(this, "shape", r), r;
    },
    get catchall() {
      return e._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Bt(t, n);
}
function qm(t, e, n) {
  const i = e._zod.def.checks;
  if (i && i.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const s = Lt(e._zod.def, {
    get shape() {
      const a = e._zod.def.shape, u = { ...a };
      if (n)
        for (const c in n) {
          if (!(c in a))
            throw new Error(`Unrecognized key: "${c}"`);
          n[c] && (u[c] = t ? new t({
            type: "optional",
            innerType: a[c]
          }) : a[c]);
        }
      else
        for (const c in a)
          u[c] = t ? new t({
            type: "optional",
            innerType: a[c]
          }) : a[c];
      return Kt(this, "shape", u), u;
    },
    checks: []
  });
  return Bt(e, s);
}
function Wm(t, e, n) {
  const r = Lt(e._zod.def, {
    get shape() {
      const i = e._zod.def.shape, o = { ...i };
      if (n)
        for (const s in n) {
          if (!(s in o))
            throw new Error(`Unrecognized key: "${s}"`);
          n[s] && (o[s] = new t({
            type: "nonoptional",
            innerType: i[s]
          }));
        }
      else
        for (const s in i)
          o[s] = new t({
            type: "nonoptional",
            innerType: i[s]
          });
      return Kt(this, "shape", o), o;
    }
  });
  return Bt(e, r);
}
function se(t, e = 0) {
  if (t.aborted === !0)
    return !0;
  for (let n = e; n < t.issues.length; n++)
    if (t.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function ae(t, e) {
  return e.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(t), n;
  });
}
function on(t) {
  return typeof t == "string" ? t : t?.message;
}
function jt(t, e, n) {
  const r = { ...t, path: t.path ?? [] };
  if (!t.message) {
    const i = on(t.inst?._zod.def?.error?.(t)) ?? on(e?.error?.(t)) ?? on(n.customError?.(t)) ?? on(n.localeError?.(t)) ?? "Invalid input";
    r.message = i;
  }
  return delete r.inst, delete r.continue, e?.reportInput || delete r.input, r;
}
function Bo(t) {
  return Array.isArray(t) ? "array" : typeof t == "string" ? "string" : "unknown";
}
function Fe(...t) {
  const [e, n, r] = t;
  return typeof e == "string" ? {
    message: e,
    code: "custom",
    input: n,
    inst: r
  } : { ...e };
}
const _l = (t, e) => {
  t.name = "$ZodError", Object.defineProperty(t, "_zod", {
    value: t._zod,
    enumerable: !1
  }), Object.defineProperty(t, "issues", {
    value: e,
    enumerable: !1
  }), t.message = JSON.stringify(e, no, 2), Object.defineProperty(t, "toString", {
    value: () => t.message,
    enumerable: !1
  });
}, yl = v("$ZodError", _l), wl = v("$ZodError", _l, { Parent: Error });
function Um(t, e = (n) => n.message) {
  const n = {}, r = [];
  for (const i of t.issues)
    i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(e(i))) : r.push(e(i));
  return { formErrors: r, fieldErrors: n };
}
function Gm(t, e = (n) => n.message) {
  const n = { _errors: [] }, r = (i) => {
    for (const o of i.issues)
      if (o.code === "invalid_union" && o.errors.length)
        o.errors.map((s) => r({ issues: s }));
      else if (o.code === "invalid_key")
        r({ issues: o.issues });
      else if (o.code === "invalid_element")
        r({ issues: o.issues });
      else if (o.path.length === 0)
        n._errors.push(e(o));
      else {
        let s = n, a = 0;
        for (; a < o.path.length; ) {
          const u = o.path[a];
          a === o.path.length - 1 ? (s[u] = s[u] || { _errors: [] }, s[u]._errors.push(e(o))) : s[u] = s[u] || { _errors: [] }, s = s[u], a++;
        }
      }
  };
  return r(t), n;
}
const qo = (t) => (e, n, r, i) => {
  const o = r ? Object.assign(r, { async: !1 }) : { async: !1 }, s = e._zod.run({ value: n, issues: [] }, o);
  if (s instanceof Promise)
    throw new le();
  if (s.issues.length) {
    const a = new (i?.Err ?? t)(s.issues.map((u) => jt(u, o, Dt())));
    throw ml(a, i?.callee), a;
  }
  return s.value;
}, Wo = (t) => async (e, n, r, i) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let s = e._zod.run({ value: n, issues: [] }, o);
  if (s instanceof Promise && (s = await s), s.issues.length) {
    const a = new (i?.Err ?? t)(s.issues.map((u) => jt(u, o, Dt())));
    throw ml(a, i?.callee), a;
  }
  return s.value;
}, Kn = (t) => (e, n, r) => {
  const i = r ? { ...r, async: !1 } : { async: !1 }, o = e._zod.run({ value: n, issues: [] }, i);
  if (o instanceof Promise)
    throw new le();
  return o.issues.length ? {
    success: !1,
    error: new (t ?? yl)(o.issues.map((s) => jt(s, i, Dt())))
  } : { success: !0, data: o.value };
}, Vm = /* @__PURE__ */ Kn(wl), Qn = (t) => async (e, n, r) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let o = e._zod.run({ value: n, issues: [] }, i);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new t(o.issues.map((s) => jt(s, i, Dt())))
  } : { success: !0, data: o.value };
}, Xm = /* @__PURE__ */ Qn(wl), Hm = (t) => (e, n, r) => {
  const i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return qo(t)(e, n, i);
}, Ym = (t) => (e, n, r) => qo(t)(e, n, r), Jm = (t) => async (e, n, r) => {
  const i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Wo(t)(e, n, i);
}, Km = (t) => async (e, n, r) => Wo(t)(e, n, r), Qm = (t) => (e, n, r) => {
  const i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Kn(t)(e, n, i);
}, tv = (t) => (e, n, r) => Kn(t)(e, n, r), ev = (t) => async (e, n, r) => {
  const i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Qn(t)(e, n, i);
}, nv = (t) => async (e, n, r) => Qn(t)(e, n, r), rv = /^[cC][^\s-]{8,}$/, iv = /^[0-9a-z]+$/, ov = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, sv = /^[0-9a-vA-V]{20}$/, av = /^[A-Za-z0-9]{27}$/, uv = /^[a-zA-Z0-9_-]{21}$/, cv = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, lv = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, xu = (t) => t ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${t}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, fv = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, hv = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function dv() {
  return new RegExp(hv, "u");
}
const pv = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, gv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, mv = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, vv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, _v = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, bl = /^[A-Za-z0-9_-]*$/, yv = /^\+[1-9]\d{6,14}$/, xl = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", wv = /* @__PURE__ */ new RegExp(`^${xl}$`);
function Al(t) {
  const e = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof t.precision == "number" ? t.precision === -1 ? `${e}` : t.precision === 0 ? `${e}:[0-5]\\d` : `${e}:[0-5]\\d\\.\\d{${t.precision}}` : `${e}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function bv(t) {
  return new RegExp(`^${Al(t)}$`);
}
function xv(t) {
  const e = Al({ precision: t.precision }), n = ["Z"];
  t.local && n.push(""), t.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${e}(?:${n.join("|")})`;
  return new RegExp(`^${xl}T(?:${r})$`);
}
const Av = (t) => {
  const e = t ? `[\\s\\S]{${t?.minimum ?? 0},${t?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${e}$`);
}, Sv = /^-?\d+$/, Sl = /^-?\d+(?:\.\d+)?$/, Tv = /^(?:true|false)$/i, $v = /^null$/i, Ev = /^[^A-Z]*$/, Ov = /^[^a-z]*$/, it = /* @__PURE__ */ v("$ZodCheck", (t, e) => {
  var n;
  t._zod ?? (t._zod = {}), t._zod.def = e, (n = t._zod).onattach ?? (n.onattach = []);
}), Tl = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, $l = /* @__PURE__ */ v("$ZodCheckLessThan", (t, e) => {
  it.init(t, e);
  const n = Tl[typeof e.value];
  t._zod.onattach.push((r) => {
    const i = r._zod.bag, o = (e.inclusive ? i.maximum : i.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    e.value < o && (e.inclusive ? i.maximum = e.value : i.exclusiveMaximum = e.value);
  }), t._zod.check = (r) => {
    (e.inclusive ? r.value <= e.value : r.value < e.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: r.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), El = /* @__PURE__ */ v("$ZodCheckGreaterThan", (t, e) => {
  it.init(t, e);
  const n = Tl[typeof e.value];
  t._zod.onattach.push((r) => {
    const i = r._zod.bag, o = (e.inclusive ? i.minimum : i.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    e.value > o && (e.inclusive ? i.minimum = e.value : i.exclusiveMinimum = e.value);
  }), t._zod.check = (r) => {
    (e.inclusive ? r.value >= e.value : r.value > e.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: r.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), Iv = /* @__PURE__ */ v("$ZodCheckMultipleOf", (t, e) => {
  it.init(t, e), t._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = e.value);
  }), t._zod.check = (n) => {
    if (typeof n.value != typeof e.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % e.value === BigInt(0) : Nm(n.value, e.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: e.value,
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), zv = /* @__PURE__ */ v("$ZodCheckNumberFormat", (t, e) => {
  it.init(t, e), e.format = e.format || "float64";
  const n = e.format?.includes("int"), r = n ? "int" : "number", [i, o] = Dm[e.format];
  t._zod.onattach.push((s) => {
    const a = s._zod.bag;
    a.format = e.format, a.minimum = i, a.maximum = o, n && (a.pattern = Sv);
  }), t._zod.check = (s) => {
    const a = s.value;
    if (n) {
      if (!Number.isInteger(a)) {
        s.issues.push({
          expected: r,
          format: e.format,
          code: "invalid_type",
          continue: !1,
          input: a,
          inst: t
        });
        return;
      }
      if (!Number.isSafeInteger(a)) {
        a > 0 ? s.issues.push({
          input: a,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: r,
          inclusive: !0,
          continue: !e.abort
        }) : s.issues.push({
          input: a,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: r,
          inclusive: !0,
          continue: !e.abort
        });
        return;
      }
    }
    a < i && s.issues.push({
      origin: "number",
      input: a,
      code: "too_small",
      minimum: i,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    }), a > o && s.issues.push({
      origin: "number",
      input: a,
      code: "too_big",
      maximum: o,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    });
  };
}), Cv = /* @__PURE__ */ v("$ZodCheckMaxLength", (t, e) => {
  var n;
  it.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Fo(i) && i.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const i = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    e.maximum < i && (r._zod.bag.maximum = e.maximum);
  }), t._zod.check = (r) => {
    const i = r.value;
    if (i.length <= e.maximum)
      return;
    const s = Bo(i);
    r.issues.push({
      origin: s,
      code: "too_big",
      maximum: e.maximum,
      inclusive: !0,
      input: i,
      inst: t,
      continue: !e.abort
    });
  };
}), Nv = /* @__PURE__ */ v("$ZodCheckMinLength", (t, e) => {
  var n;
  it.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Fo(i) && i.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const i = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    e.minimum > i && (r._zod.bag.minimum = e.minimum);
  }), t._zod.check = (r) => {
    const i = r.value;
    if (i.length >= e.minimum)
      return;
    const s = Bo(i);
    r.issues.push({
      origin: s,
      code: "too_small",
      minimum: e.minimum,
      inclusive: !0,
      input: i,
      inst: t,
      continue: !e.abort
    });
  };
}), Rv = /* @__PURE__ */ v("$ZodCheckLengthEquals", (t, e) => {
  var n;
  it.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Fo(i) && i.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.minimum = e.length, i.maximum = e.length, i.length = e.length;
  }), t._zod.check = (r) => {
    const i = r.value, o = i.length;
    if (o === e.length)
      return;
    const s = Bo(i), a = o > e.length;
    r.issues.push({
      origin: s,
      ...a ? { code: "too_big", maximum: e.length } : { code: "too_small", minimum: e.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), tr = /* @__PURE__ */ v("$ZodCheckStringFormat", (t, e) => {
  var n, r;
  it.init(t, e), t._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.format = e.format, e.pattern && (o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(e.pattern));
  }), e.pattern ? (n = t._zod).check ?? (n.check = (i) => {
    e.pattern.lastIndex = 0, !e.pattern.test(i.value) && i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: e.format,
      input: i.value,
      ...e.pattern ? { pattern: e.pattern.toString() } : {},
      inst: t,
      continue: !e.abort
    });
  }) : (r = t._zod).check ?? (r.check = () => {
  });
}), Pv = /* @__PURE__ */ v("$ZodCheckRegex", (t, e) => {
  tr.init(t, e), t._zod.check = (n) => {
    e.pattern.lastIndex = 0, !e.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: e.pattern.toString(),
      inst: t,
      continue: !e.abort
    });
  };
}), Mv = /* @__PURE__ */ v("$ZodCheckLowerCase", (t, e) => {
  e.pattern ?? (e.pattern = Ev), tr.init(t, e);
}), kv = /* @__PURE__ */ v("$ZodCheckUpperCase", (t, e) => {
  e.pattern ?? (e.pattern = Ov), tr.init(t, e);
}), Dv = /* @__PURE__ */ v("$ZodCheckIncludes", (t, e) => {
  it.init(t, e);
  const n = pe(e.includes), r = new RegExp(typeof e.position == "number" ? `^.{${e.position}}${n}` : n);
  e.pattern = r, t._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), t._zod.check = (i) => {
    i.value.includes(e.includes, e.position) || i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: e.includes,
      input: i.value,
      inst: t,
      continue: !e.abort
    });
  };
}), jv = /* @__PURE__ */ v("$ZodCheckStartsWith", (t, e) => {
  it.init(t, e);
  const n = new RegExp(`^${pe(e.prefix)}.*`);
  e.pattern ?? (e.pattern = n), t._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
  }), t._zod.check = (r) => {
    r.value.startsWith(e.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: e.prefix,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Zv = /* @__PURE__ */ v("$ZodCheckEndsWith", (t, e) => {
  it.init(t, e);
  const n = new RegExp(`.*${pe(e.suffix)}$`);
  e.pattern ?? (e.pattern = n), t._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
  }), t._zod.check = (r) => {
    r.value.endsWith(e.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: e.suffix,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Fv = /* @__PURE__ */ v("$ZodCheckOverwrite", (t, e) => {
  it.init(t, e), t._zod.check = (n) => {
    n.value = e.tx(n.value);
  };
});
class Lv {
  constructor(e = []) {
    this.content = [], this.indent = 0, this && (this.args = e);
  }
  indented(e) {
    this.indent += 1, e(this), this.indent -= 1;
  }
  write(e) {
    if (typeof e == "function") {
      e(this, { execution: "sync" }), e(this, { execution: "async" });
      return;
    }
    const r = e.split(`
`).filter((s) => s), i = Math.min(...r.map((s) => s.length - s.trimStart().length)), o = r.map((s) => s.slice(i)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of o)
      this.content.push(s);
  }
  compile() {
    const e = Function, n = this?.args, i = [...(this?.content ?? [""]).map((o) => `  ${o}`)];
    return new e(...n, i.join(`
`));
  }
}
const Bv = {
  major: 4,
  minor: 3,
  patch: 6
}, Z = /* @__PURE__ */ v("$ZodType", (t, e) => {
  var n;
  t ?? (t = {}), t._zod.def = e, t._zod.bag = t._zod.bag || {}, t._zod.version = Bv;
  const r = [...t._zod.def.checks ?? []];
  t._zod.traits.has("$ZodCheck") && r.unshift(t);
  for (const i of r)
    for (const o of i._zod.onattach)
      o(t);
  if (r.length === 0)
    (n = t._zod).deferred ?? (n.deferred = []), t._zod.deferred?.push(() => {
      t._zod.run = t._zod.parse;
    });
  else {
    const i = (s, a, u) => {
      let c = se(s), l;
      for (const f of a) {
        if (f._zod.def.when) {
          if (!f._zod.def.when(s))
            continue;
        } else if (c)
          continue;
        const h = s.issues.length, d = f._zod.check(s);
        if (d instanceof Promise && u?.async === !1)
          throw new le();
        if (l || d instanceof Promise)
          l = (l ?? Promise.resolve()).then(async () => {
            await d, s.issues.length !== h && (c || (c = se(s, h)));
          });
        else {
          if (s.issues.length === h)
            continue;
          c || (c = se(s, h));
        }
      }
      return l ? l.then(() => s) : s;
    }, o = (s, a, u) => {
      if (se(s))
        return s.aborted = !0, s;
      const c = i(a, r, u);
      if (c instanceof Promise) {
        if (u.async === !1)
          throw new le();
        return c.then((l) => t._zod.parse(l, u));
      }
      return t._zod.parse(c, u);
    };
    t._zod.run = (s, a) => {
      if (a.skipChecks)
        return t._zod.parse(s, a);
      if (a.direction === "backward") {
        const c = t._zod.parse({ value: s.value, issues: [] }, { ...a, skipChecks: !0 });
        return c instanceof Promise ? c.then((l) => o(l, s, a)) : o(c, s, a);
      }
      const u = t._zod.parse(s, a);
      if (u instanceof Promise) {
        if (a.async === !1)
          throw new le();
        return u.then((c) => i(c, r, a));
      }
      return i(u, r, a);
    };
  }
  P(t, "~standard", () => ({
    validate: (i) => {
      try {
        const o = Vm(t, i);
        return o.success ? { value: o.data } : { issues: o.error?.issues };
      } catch {
        return Xm(t, i).then((s) => s.success ? { value: s.data } : { issues: s.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Uo = /* @__PURE__ */ v("$ZodString", (t, e) => {
  Z.init(t, e), t._zod.pattern = [...t?._zod.bag?.patterns ?? []].pop() ?? Av(t._zod.bag), t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: t
    }), n;
  };
}), q = /* @__PURE__ */ v("$ZodStringFormat", (t, e) => {
  tr.init(t, e), Uo.init(t, e);
}), qv = /* @__PURE__ */ v("$ZodGUID", (t, e) => {
  e.pattern ?? (e.pattern = lv), q.init(t, e);
}), Wv = /* @__PURE__ */ v("$ZodUUID", (t, e) => {
  if (e.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[e.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${e.version}"`);
    e.pattern ?? (e.pattern = xu(r));
  } else
    e.pattern ?? (e.pattern = xu());
  q.init(t, e);
}), Uv = /* @__PURE__ */ v("$ZodEmail", (t, e) => {
  e.pattern ?? (e.pattern = fv), q.init(t, e);
}), Gv = /* @__PURE__ */ v("$ZodURL", (t, e) => {
  q.init(t, e), t._zod.check = (n) => {
    try {
      const r = n.value.trim(), i = new URL(r);
      e.hostname && (e.hostname.lastIndex = 0, e.hostname.test(i.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: e.hostname.source,
        input: n.value,
        inst: t,
        continue: !e.abort
      })), e.protocol && (e.protocol.lastIndex = 0, e.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: e.protocol.source,
        input: n.value,
        inst: t,
        continue: !e.abort
      })), e.normalize ? n.value = i.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), Vv = /* @__PURE__ */ v("$ZodEmoji", (t, e) => {
  e.pattern ?? (e.pattern = dv()), q.init(t, e);
}), Xv = /* @__PURE__ */ v("$ZodNanoID", (t, e) => {
  e.pattern ?? (e.pattern = uv), q.init(t, e);
}), Hv = /* @__PURE__ */ v("$ZodCUID", (t, e) => {
  e.pattern ?? (e.pattern = rv), q.init(t, e);
}), Yv = /* @__PURE__ */ v("$ZodCUID2", (t, e) => {
  e.pattern ?? (e.pattern = iv), q.init(t, e);
}), Jv = /* @__PURE__ */ v("$ZodULID", (t, e) => {
  e.pattern ?? (e.pattern = ov), q.init(t, e);
}), Kv = /* @__PURE__ */ v("$ZodXID", (t, e) => {
  e.pattern ?? (e.pattern = sv), q.init(t, e);
}), Qv = /* @__PURE__ */ v("$ZodKSUID", (t, e) => {
  e.pattern ?? (e.pattern = av), q.init(t, e);
}), t_ = /* @__PURE__ */ v("$ZodISODateTime", (t, e) => {
  e.pattern ?? (e.pattern = xv(e)), q.init(t, e);
}), e_ = /* @__PURE__ */ v("$ZodISODate", (t, e) => {
  e.pattern ?? (e.pattern = wv), q.init(t, e);
}), n_ = /* @__PURE__ */ v("$ZodISOTime", (t, e) => {
  e.pattern ?? (e.pattern = bv(e)), q.init(t, e);
}), r_ = /* @__PURE__ */ v("$ZodISODuration", (t, e) => {
  e.pattern ?? (e.pattern = cv), q.init(t, e);
}), i_ = /* @__PURE__ */ v("$ZodIPv4", (t, e) => {
  e.pattern ?? (e.pattern = pv), q.init(t, e), t._zod.bag.format = "ipv4";
}), o_ = /* @__PURE__ */ v("$ZodIPv6", (t, e) => {
  e.pattern ?? (e.pattern = gv), q.init(t, e), t._zod.bag.format = "ipv6", t._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), s_ = /* @__PURE__ */ v("$ZodCIDRv4", (t, e) => {
  e.pattern ?? (e.pattern = mv), q.init(t, e);
}), a_ = /* @__PURE__ */ v("$ZodCIDRv6", (t, e) => {
  e.pattern ?? (e.pattern = vv), q.init(t, e), t._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [i, o] = r;
      if (!o)
        throw new Error();
      const s = Number(o);
      if (`${s}` !== o)
        throw new Error();
      if (s < 0 || s > 128)
        throw new Error();
      new URL(`http://[${i}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
});
function Ol(t) {
  if (t === "")
    return !0;
  if (t.length % 4 !== 0)
    return !1;
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}
const u_ = /* @__PURE__ */ v("$ZodBase64", (t, e) => {
  e.pattern ?? (e.pattern = _v), q.init(t, e), t._zod.bag.contentEncoding = "base64", t._zod.check = (n) => {
    Ol(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
});
function c_(t) {
  if (!bl.test(t))
    return !1;
  const e = t.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = e.padEnd(Math.ceil(e.length / 4) * 4, "=");
  return Ol(n);
}
const l_ = /* @__PURE__ */ v("$ZodBase64URL", (t, e) => {
  e.pattern ?? (e.pattern = bl), q.init(t, e), t._zod.bag.contentEncoding = "base64url", t._zod.check = (n) => {
    c_(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), f_ = /* @__PURE__ */ v("$ZodE164", (t, e) => {
  e.pattern ?? (e.pattern = yv), q.init(t, e);
});
function h_(t, e = null) {
  try {
    const n = t.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const i = JSON.parse(atob(r));
    return !("typ" in i && i?.typ !== "JWT" || !i.alg || e && (!("alg" in i) || i.alg !== e));
  } catch {
    return !1;
  }
}
const d_ = /* @__PURE__ */ v("$ZodJWT", (t, e) => {
  q.init(t, e), t._zod.check = (n) => {
    h_(n.value, e.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Il = /* @__PURE__ */ v("$ZodNumber", (t, e) => {
  Z.init(t, e), t._zod.pattern = t._zod.bag.pattern ?? Sl, t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const i = n.value;
    if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i))
      return n;
    const o = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: i,
      inst: t,
      ...o ? { received: o } : {}
    }), n;
  };
}), p_ = /* @__PURE__ */ v("$ZodNumberFormat", (t, e) => {
  zv.init(t, e), Il.init(t, e);
}), g_ = /* @__PURE__ */ v("$ZodBoolean", (t, e) => {
  Z.init(t, e), t._zod.pattern = Tv, t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const i = n.value;
    return typeof i == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: i,
      inst: t
    }), n;
  };
}), m_ = /* @__PURE__ */ v("$ZodNull", (t, e) => {
  Z.init(t, e), t._zod.pattern = $v, t._zod.values = /* @__PURE__ */ new Set([null]), t._zod.parse = (n, r) => {
    const i = n.value;
    return i === null || n.issues.push({
      expected: "null",
      code: "invalid_type",
      input: i,
      inst: t
    }), n;
  };
}), v_ = /* @__PURE__ */ v("$ZodAny", (t, e) => {
  Z.init(t, e), t._zod.parse = (n) => n;
}), __ = /* @__PURE__ */ v("$ZodUnknown", (t, e) => {
  Z.init(t, e), t._zod.parse = (n) => n;
}), y_ = /* @__PURE__ */ v("$ZodNever", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: t
  }), n);
}), w_ = /* @__PURE__ */ v("$ZodDate", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = new Date(n.value);
      } catch {
      }
    const i = n.value, o = i instanceof Date;
    return o && !Number.isNaN(i.getTime()) || n.issues.push({
      expected: "date",
      code: "invalid_type",
      input: i,
      ...o ? { received: "Invalid Date" } : {},
      inst: t
    }), n;
  };
});
function Au(t, e, n) {
  t.issues.length && e.issues.push(...ae(n, t.issues)), e.value[n] = t.value;
}
const b_ = /* @__PURE__ */ v("$ZodArray", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => {
    const i = n.value;
    if (!Array.isArray(i))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: i,
        inst: t
      }), n;
    n.value = Array(i.length);
    const o = [];
    for (let s = 0; s < i.length; s++) {
      const a = i[s], u = e.element._zod.run({
        value: a,
        issues: []
      }, r);
      u instanceof Promise ? o.push(u.then((c) => Au(c, n, s))) : Au(u, n, s);
    }
    return o.length ? Promise.all(o).then(() => n) : n;
  };
});
function Pn(t, e, n, r, i) {
  if (t.issues.length) {
    if (i && !(n in r))
      return;
    e.issues.push(...ae(n, t.issues));
  }
  t.value === void 0 ? n in r && (e.value[n] = void 0) : e.value[n] = t.value;
}
function zl(t) {
  const e = Object.keys(t.shape);
  for (const r of e)
    if (!t.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const n = km(t.shape);
  return {
    ...t,
    keys: e,
    keySet: new Set(e),
    numKeys: e.length,
    optionalKeys: new Set(n)
  };
}
function Cl(t, e, n, r, i, o) {
  const s = [], a = i.keySet, u = i.catchall._zod, c = u.def.type, l = u.optout === "optional";
  for (const f in e) {
    if (a.has(f))
      continue;
    if (c === "never") {
      s.push(f);
      continue;
    }
    const h = u.run({ value: e[f], issues: [] }, r);
    h instanceof Promise ? t.push(h.then((d) => Pn(d, n, f, e, l))) : Pn(h, n, f, e, l);
  }
  return s.length && n.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: e,
    inst: o
  }), t.length ? Promise.all(t).then(() => n) : n;
}
const x_ = /* @__PURE__ */ v("$ZodObject", (t, e) => {
  if (Z.init(t, e), !Object.getOwnPropertyDescriptor(e, "shape")?.get) {
    const a = e.shape;
    Object.defineProperty(e, "shape", {
      get: () => {
        const u = { ...a };
        return Object.defineProperty(e, "shape", {
          value: u
        }), u;
      }
    });
  }
  const r = Zo(() => zl(e));
  P(t._zod, "propValues", () => {
    const a = e.shape, u = {};
    for (const c in a) {
      const l = a[c]._zod;
      if (l.values) {
        u[c] ?? (u[c] = /* @__PURE__ */ new Set());
        for (const f of l.values)
          u[c].add(f);
      }
    }
    return u;
  });
  const i = Rn, o = e.catchall;
  let s;
  t._zod.parse = (a, u) => {
    s ?? (s = r.value);
    const c = a.value;
    if (!i(c))
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: c,
        inst: t
      }), a;
    a.value = {};
    const l = [], f = s.shape;
    for (const h of s.keys) {
      const d = f[h], m = d._zod.optout === "optional", g = d._zod.run({ value: c[h], issues: [] }, u);
      g instanceof Promise ? l.push(g.then((y) => Pn(y, a, h, c, m))) : Pn(g, a, h, c, m);
    }
    return o ? Cl(l, c, a, u, r.value, t) : l.length ? Promise.all(l).then(() => a) : a;
  };
}), A_ = /* @__PURE__ */ v("$ZodObjectJIT", (t, e) => {
  x_.init(t, e);
  const n = t._zod.parse, r = Zo(() => zl(e)), i = (h) => {
    const d = new Lv(["shape", "payload", "ctx"]), m = r.value, g = (b) => {
      const p = bu(b);
      return `shape[${p}]._zod.run({ value: input[${p}], issues: [] }, ctx)`;
    };
    d.write("const input = payload.value;");
    const y = /* @__PURE__ */ Object.create(null);
    let _ = 0;
    for (const b of m.keys)
      y[b] = `key_${_++}`;
    d.write("const newResult = {};");
    for (const b of m.keys) {
      const p = y[b], x = bu(b), $ = h[b]?._zod?.optout === "optional";
      d.write(`const ${p} = ${g(b)};`), $ ? d.write(`
        if (${p}.issues.length) {
          if (${x} in input) {
            payload.issues = payload.issues.concat(${p}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${x}, ...iss.path] : [${x}]
            })));
          }
        }
        
        if (${p}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${p}.value;
        }
        
      `) : d.write(`
        if (${p}.issues.length) {
          payload.issues = payload.issues.concat(${p}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${x}, ...iss.path] : [${x}]
          })));
        }
        
        if (${p}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${p}.value;
        }
        
      `);
    }
    d.write("payload.value = newResult;"), d.write("return payload;");
    const w = d.compile();
    return (b, p) => w(h, b, p);
  };
  let o;
  const s = Rn, a = !pl.jitless, c = a && Pm.value, l = e.catchall;
  let f;
  t._zod.parse = (h, d) => {
    f ?? (f = r.value);
    const m = h.value;
    return s(m) ? a && c && d?.async === !1 && d.jitless !== !0 ? (o || (o = i(e.shape)), h = o(h, d), l ? Cl([], m, h, d, f, t) : h) : n(h, d) : (h.issues.push({
      expected: "object",
      code: "invalid_type",
      input: m,
      inst: t
    }), h);
  };
});
function Su(t, e, n, r) {
  for (const o of t)
    if (o.issues.length === 0)
      return e.value = o.value, e;
  const i = t.filter((o) => !se(o));
  return i.length === 1 ? (e.value = i[0].value, i[0]) : (e.issues.push({
    code: "invalid_union",
    input: e.value,
    inst: n,
    errors: t.map((o) => o.issues.map((s) => jt(s, r, Dt())))
  }), e);
}
const S_ = /* @__PURE__ */ v("$ZodUnion", (t, e) => {
  Z.init(t, e), P(t._zod, "optin", () => e.options.some((i) => i._zod.optin === "optional") ? "optional" : void 0), P(t._zod, "optout", () => e.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0), P(t._zod, "values", () => {
    if (e.options.every((i) => i._zod.values))
      return new Set(e.options.flatMap((i) => Array.from(i._zod.values)));
  }), P(t._zod, "pattern", () => {
    if (e.options.every((i) => i._zod.pattern)) {
      const i = e.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${i.map((o) => Lo(o.source)).join("|")})$`);
    }
  });
  const n = e.options.length === 1, r = e.options[0]._zod.run;
  t._zod.parse = (i, o) => {
    if (n)
      return r(i, o);
    let s = !1;
    const a = [];
    for (const u of e.options) {
      const c = u._zod.run({
        value: i.value,
        issues: []
      }, o);
      if (c instanceof Promise)
        a.push(c), s = !0;
      else {
        if (c.issues.length === 0)
          return c;
        a.push(c);
      }
    }
    return s ? Promise.all(a).then((u) => Su(u, i, t, o)) : Su(a, i, t, o);
  };
}), T_ = /* @__PURE__ */ v("$ZodIntersection", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => {
    const i = n.value, o = e.left._zod.run({ value: i, issues: [] }, r), s = e.right._zod.run({ value: i, issues: [] }, r);
    return o instanceof Promise || s instanceof Promise ? Promise.all([o, s]).then(([u, c]) => Tu(n, u, c)) : Tu(n, o, s);
  };
});
function ro(t, e) {
  if (t === e)
    return { valid: !0, data: t };
  if (t instanceof Date && e instanceof Date && +t == +e)
    return { valid: !0, data: t };
  if (de(t) && de(e)) {
    const n = Object.keys(e), r = Object.keys(t).filter((o) => n.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of r) {
      const s = ro(t[o], e[o]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [o, ...s.mergeErrorPath]
        };
      i[o] = s.data;
    }
    return { valid: !0, data: i };
  }
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < t.length; r++) {
      const i = t[r], o = e[r], s = ro(i, o);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...s.mergeErrorPath]
        };
      n.push(s.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Tu(t, e, n) {
  const r = /* @__PURE__ */ new Map();
  let i;
  for (const a of e.issues)
    if (a.code === "unrecognized_keys") {
      i ?? (i = a);
      for (const u of a.keys)
        r.has(u) || r.set(u, {}), r.get(u).l = !0;
    } else
      t.issues.push(a);
  for (const a of n.issues)
    if (a.code === "unrecognized_keys")
      for (const u of a.keys)
        r.has(u) || r.set(u, {}), r.get(u).r = !0;
    else
      t.issues.push(a);
  const o = [...r].filter(([, a]) => a.l && a.r).map(([a]) => a);
  if (o.length && i && t.issues.push({ ...i, keys: o }), se(t))
    return t;
  const s = ro(e.value, n.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return t.value = s.data, t;
}
const $_ = /* @__PURE__ */ v("$ZodRecord", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => {
    const i = n.value;
    if (!de(i))
      return n.issues.push({
        expected: "record",
        code: "invalid_type",
        input: i,
        inst: t
      }), n;
    const o = [], s = e.keyType._zod.values;
    if (s) {
      n.value = {};
      const a = /* @__PURE__ */ new Set();
      for (const c of s)
        if (typeof c == "string" || typeof c == "number" || typeof c == "symbol") {
          a.add(typeof c == "number" ? c.toString() : c);
          const l = e.valueType._zod.run({ value: i[c], issues: [] }, r);
          l instanceof Promise ? o.push(l.then((f) => {
            f.issues.length && n.issues.push(...ae(c, f.issues)), n.value[c] = f.value;
          })) : (l.issues.length && n.issues.push(...ae(c, l.issues)), n.value[c] = l.value);
        }
      let u;
      for (const c in i)
        a.has(c) || (u = u ?? [], u.push(c));
      u && u.length > 0 && n.issues.push({
        code: "unrecognized_keys",
        input: i,
        inst: t,
        keys: u
      });
    } else {
      n.value = {};
      for (const a of Reflect.ownKeys(i)) {
        if (a === "__proto__")
          continue;
        let u = e.keyType._zod.run({ value: a, issues: [] }, r);
        if (u instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof a == "string" && Sl.test(a) && u.issues.length) {
          const f = e.keyType._zod.run({ value: Number(a), issues: [] }, r);
          if (f instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          f.issues.length === 0 && (u = f);
        }
        if (u.issues.length) {
          e.mode === "loose" ? n.value[a] = i[a] : n.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: u.issues.map((f) => jt(f, r, Dt())),
            input: a,
            path: [a],
            inst: t
          });
          continue;
        }
        const l = e.valueType._zod.run({ value: i[a], issues: [] }, r);
        l instanceof Promise ? o.push(l.then((f) => {
          f.issues.length && n.issues.push(...ae(a, f.issues)), n.value[u.value] = f.value;
        })) : (l.issues.length && n.issues.push(...ae(a, l.issues)), n.value[u.value] = l.value);
      }
    }
    return o.length ? Promise.all(o).then(() => n) : n;
  };
}), E_ = /* @__PURE__ */ v("$ZodEnum", (t, e) => {
  Z.init(t, e);
  const n = gl(e.entries), r = new Set(n);
  t._zod.values = r, t._zod.pattern = new RegExp(`^(${n.filter((i) => Mm.has(typeof i)).map((i) => typeof i == "string" ? pe(i) : i.toString()).join("|")})$`), t._zod.parse = (i, o) => {
    const s = i.value;
    return r.has(s) || i.issues.push({
      code: "invalid_value",
      values: n,
      input: s,
      inst: t
    }), i;
  };
}), O_ = /* @__PURE__ */ v("$ZodLiteral", (t, e) => {
  if (Z.init(t, e), e.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const n = new Set(e.values);
  t._zod.values = n, t._zod.pattern = new RegExp(`^(${e.values.map((r) => typeof r == "string" ? pe(r) : r ? pe(r.toString()) : String(r)).join("|")})$`), t._zod.parse = (r, i) => {
    const o = r.value;
    return n.has(o) || r.issues.push({
      code: "invalid_value",
      values: e.values,
      input: o,
      inst: t
    }), r;
  };
}), I_ = /* @__PURE__ */ v("$ZodTransform", (t, e) => {
  Z.init(t, e), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new dl(t.constructor.name);
    const i = e.transform(n.value, n);
    if (r.async)
      return (i instanceof Promise ? i : Promise.resolve(i)).then((s) => (n.value = s, n));
    if (i instanceof Promise)
      throw new le();
    return n.value = i, n;
  };
});
function $u(t, e) {
  return t.issues.length && e === void 0 ? { issues: [], value: void 0 } : t;
}
const Nl = /* @__PURE__ */ v("$ZodOptional", (t, e) => {
  Z.init(t, e), t._zod.optin = "optional", t._zod.optout = "optional", P(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, void 0]) : void 0), P(t._zod, "pattern", () => {
    const n = e.innerType._zod.pattern;
    return n ? new RegExp(`^(${Lo(n.source)})?$`) : void 0;
  }), t._zod.parse = (n, r) => {
    if (e.innerType._zod.optin === "optional") {
      const i = e.innerType._zod.run(n, r);
      return i instanceof Promise ? i.then((o) => $u(o, n.value)) : $u(i, n.value);
    }
    return n.value === void 0 ? n : e.innerType._zod.run(n, r);
  };
}), z_ = /* @__PURE__ */ v("$ZodExactOptional", (t, e) => {
  Nl.init(t, e), P(t._zod, "values", () => e.innerType._zod.values), P(t._zod, "pattern", () => e.innerType._zod.pattern), t._zod.parse = (n, r) => e.innerType._zod.run(n, r);
}), C_ = /* @__PURE__ */ v("$ZodNullable", (t, e) => {
  Z.init(t, e), P(t._zod, "optin", () => e.innerType._zod.optin), P(t._zod, "optout", () => e.innerType._zod.optout), P(t._zod, "pattern", () => {
    const n = e.innerType._zod.pattern;
    return n ? new RegExp(`^(${Lo(n.source)}|null)$`) : void 0;
  }), P(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, null]) : void 0), t._zod.parse = (n, r) => n.value === null ? n : e.innerType._zod.run(n, r);
}), N_ = /* @__PURE__ */ v("$ZodDefault", (t, e) => {
  Z.init(t, e), t._zod.optin = "optional", P(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = e.defaultValue, n;
    const i = e.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => Eu(o, e)) : Eu(i, e);
  };
});
function Eu(t, e) {
  return t.value === void 0 && (t.value = e.defaultValue), t;
}
const R_ = /* @__PURE__ */ v("$ZodPrefault", (t, e) => {
  Z.init(t, e), t._zod.optin = "optional", P(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = e.defaultValue), e.innerType._zod.run(n, r));
}), P_ = /* @__PURE__ */ v("$ZodNonOptional", (t, e) => {
  Z.init(t, e), P(t._zod, "values", () => {
    const n = e.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), t._zod.parse = (n, r) => {
    const i = e.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => Ou(o, t)) : Ou(i, t);
  };
});
function Ou(t, e) {
  return !t.issues.length && t.value === void 0 && t.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: t.value,
    inst: e
  }), t;
}
const M_ = /* @__PURE__ */ v("$ZodCatch", (t, e) => {
  Z.init(t, e), P(t._zod, "optin", () => e.innerType._zod.optin), P(t._zod, "optout", () => e.innerType._zod.optout), P(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    const i = e.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => (n.value = o.value, o.issues.length && (n.value = e.catchValue({
      ...n,
      error: {
        issues: o.issues.map((s) => jt(s, r, Dt()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = i.value, i.issues.length && (n.value = e.catchValue({
      ...n,
      error: {
        issues: i.issues.map((o) => jt(o, r, Dt()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), k_ = /* @__PURE__ */ v("$ZodPipe", (t, e) => {
  Z.init(t, e), P(t._zod, "values", () => e.in._zod.values), P(t._zod, "optin", () => e.in._zod.optin), P(t._zod, "optout", () => e.out._zod.optout), P(t._zod, "propValues", () => e.in._zod.propValues), t._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const o = e.out._zod.run(n, r);
      return o instanceof Promise ? o.then((s) => sn(s, e.in, r)) : sn(o, e.in, r);
    }
    const i = e.in._zod.run(n, r);
    return i instanceof Promise ? i.then((o) => sn(o, e.out, r)) : sn(i, e.out, r);
  };
});
function sn(t, e, n) {
  return t.issues.length ? (t.aborted = !0, t) : e._zod.run({ value: t.value, issues: t.issues }, n);
}
const D_ = /* @__PURE__ */ v("$ZodReadonly", (t, e) => {
  Z.init(t, e), P(t._zod, "propValues", () => e.innerType._zod.propValues), P(t._zod, "values", () => e.innerType._zod.values), P(t._zod, "optin", () => e.innerType?._zod?.optin), P(t._zod, "optout", () => e.innerType?._zod?.optout), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    const i = e.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then(Iu) : Iu(i);
  };
});
function Iu(t) {
  return t.value = Object.freeze(t.value), t;
}
const j_ = /* @__PURE__ */ v("$ZodLazy", (t, e) => {
  Z.init(t, e), P(t._zod, "innerType", () => e.getter()), P(t._zod, "pattern", () => t._zod.innerType?._zod?.pattern), P(t._zod, "propValues", () => t._zod.innerType?._zod?.propValues), P(t._zod, "optin", () => t._zod.innerType?._zod?.optin ?? void 0), P(t._zod, "optout", () => t._zod.innerType?._zod?.optout ?? void 0), t._zod.parse = (n, r) => t._zod.innerType._zod.run(n, r);
}), Z_ = /* @__PURE__ */ v("$ZodCustom", (t, e) => {
  it.init(t, e), Z.init(t, e), t._zod.parse = (n, r) => n, t._zod.check = (n) => {
    const r = n.value, i = e.fn(r);
    if (i instanceof Promise)
      return i.then((o) => zu(o, n, r, t));
    zu(i, n, r, t);
  };
});
function zu(t, e, n, r) {
  if (!t) {
    const i = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (i.params = r._zod.def.params), e.issues.push(Fe(i));
  }
}
var Cu;
class F_ {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(e, ...n) {
    const r = n[0];
    return this._map.set(e, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, e), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(e) {
    const n = this._map.get(e);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(e), this;
  }
  get(e) {
    const n = e._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const i = { ...r, ...this._map.get(e) };
      return Object.keys(i).length ? i : void 0;
    }
    return this._map.get(e);
  }
  has(e) {
    return this._map.has(e);
  }
}
function L_() {
  return new F_();
}
(Cu = globalThis).__zod_globalRegistry ?? (Cu.__zod_globalRegistry = L_());
const Ie = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function B_(t, e) {
  return new t({
    type: "string",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function q_(t, e) {
  return new t({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Nu(t, e) {
  return new t({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function W_(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function U_(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function G_(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function V_(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function X_(t, e) {
  return new t({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function H_(t, e) {
  return new t({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Y_(t, e) {
  return new t({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function J_(t, e) {
  return new t({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function K_(t, e) {
  return new t({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Q_(t, e) {
  return new t({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ty(t, e) {
  return new t({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ey(t, e) {
  return new t({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ny(t, e) {
  return new t({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ry(t, e) {
  return new t({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function iy(t, e) {
  return new t({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function oy(t, e) {
  return new t({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function sy(t, e) {
  return new t({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ay(t, e) {
  return new t({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function uy(t, e) {
  return new t({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function cy(t, e) {
  return new t({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function ly(t, e) {
  return new t({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function fy(t, e) {
  return new t({
    type: "string",
    format: "date",
    check: "string_format",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function hy(t, e) {
  return new t({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function dy(t, e) {
  return new t({
    type: "string",
    format: "duration",
    check: "string_format",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function py(t, e) {
  return new t({
    type: "number",
    checks: [],
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function gy(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function my(t, e) {
  return new t({
    type: "boolean",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function vy(t, e) {
  return new t({
    type: "null",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function _y(t) {
  return new t({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function yy(t) {
  return new t({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function wy(t, e) {
  return new t({
    type: "never",
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function by(t, e) {
  return new t({
    type: "date",
    coerce: !0,
    ...S(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ru(t, e) {
  return new $l({
    check: "less_than",
    ...S(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function wn(t, e) {
  return new $l({
    check: "less_than",
    ...S(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Pu(t, e) {
  return new El({
    check: "greater_than",
    ...S(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function bn(t, e) {
  return new El({
    check: "greater_than",
    ...S(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Mu(t, e) {
  return new Iv({
    check: "multiple_of",
    ...S(e),
    value: t
  });
}
// @__NO_SIDE_EFFECTS__
function Rl(t, e) {
  return new Cv({
    check: "max_length",
    ...S(e),
    maximum: t
  });
}
// @__NO_SIDE_EFFECTS__
function Mn(t, e) {
  return new Nv({
    check: "min_length",
    ...S(e),
    minimum: t
  });
}
// @__NO_SIDE_EFFECTS__
function Pl(t, e) {
  return new Rv({
    check: "length_equals",
    ...S(e),
    length: t
  });
}
// @__NO_SIDE_EFFECTS__
function xy(t, e) {
  return new Pv({
    check: "string_format",
    format: "regex",
    ...S(e),
    pattern: t
  });
}
// @__NO_SIDE_EFFECTS__
function Ay(t) {
  return new Mv({
    check: "string_format",
    format: "lowercase",
    ...S(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Sy(t) {
  return new kv({
    check: "string_format",
    format: "uppercase",
    ...S(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ty(t, e) {
  return new Dv({
    check: "string_format",
    format: "includes",
    ...S(e),
    includes: t
  });
}
// @__NO_SIDE_EFFECTS__
function $y(t, e) {
  return new jv({
    check: "string_format",
    format: "starts_with",
    ...S(e),
    prefix: t
  });
}
// @__NO_SIDE_EFFECTS__
function Ey(t, e) {
  return new Zv({
    check: "string_format",
    format: "ends_with",
    ...S(e),
    suffix: t
  });
}
// @__NO_SIDE_EFFECTS__
function we(t) {
  return new Fv({
    check: "overwrite",
    tx: t
  });
}
// @__NO_SIDE_EFFECTS__
function Oy(t) {
  return /* @__PURE__ */ we((e) => e.normalize(t));
}
// @__NO_SIDE_EFFECTS__
function Iy() {
  return /* @__PURE__ */ we((t) => t.trim());
}
// @__NO_SIDE_EFFECTS__
function zy() {
  return /* @__PURE__ */ we((t) => t.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Cy() {
  return /* @__PURE__ */ we((t) => t.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Ny() {
  return /* @__PURE__ */ we((t) => Rm(t));
}
// @__NO_SIDE_EFFECTS__
function Ry(t, e, n) {
  return new t({
    type: "array",
    element: e,
    // get element() {
    //   return element;
    // },
    ...S(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Py(t, e, n) {
  return new t({
    type: "custom",
    check: "custom",
    fn: e,
    ...S(n)
  });
}
// @__NO_SIDE_EFFECTS__
function My(t) {
  const e = /* @__PURE__ */ ky((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(Fe(r, n.value, e._zod.def));
    else {
      const i = r;
      i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = e), i.continue ?? (i.continue = !e._zod.def.abort), n.issues.push(Fe(i));
    }
  }, t(n.value, n)));
  return e;
}
// @__NO_SIDE_EFFECTS__
function ky(t, e) {
  const n = new it({
    check: "custom",
    ...S(e)
  });
  return n._zod.check = t, n;
}
function Ml(t) {
  let e = t?.target ?? "draft-2020-12";
  return e === "draft-4" && (e = "draft-04"), e === "draft-7" && (e = "draft-07"), {
    processors: t.processors ?? {},
    metadataRegistry: t?.metadata ?? Ie,
    target: e,
    unrepresentable: t?.unrepresentable ?? "throw",
    override: t?.override ?? (() => {
    }),
    io: t?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: t?.cycles ?? "ref",
    reused: t?.reused ?? "inline",
    external: t?.external ?? void 0
  };
}
function U(t, e, n = { path: [], schemaPath: [] }) {
  var r;
  const i = t._zod.def, o = e.seen.get(t);
  if (o)
    return o.count++, n.schemaPath.includes(t) && (o.cycle = n.path), o.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  e.seen.set(t, s);
  const a = t._zod.toJSONSchema?.();
  if (a)
    s.schema = a;
  else {
    const l = {
      ...n,
      schemaPath: [...n.schemaPath, t],
      path: n.path
    };
    if (t._zod.processJSONSchema)
      t._zod.processJSONSchema(e, s.schema, l);
    else {
      const h = s.schema, d = e.processors[i.type];
      if (!d)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
      d(t, e, h, l);
    }
    const f = t._zod.parent;
    f && (s.ref || (s.ref = f), U(f, e, l), e.seen.get(f).isParent = !0);
  }
  const u = e.metadataRegistry.get(t);
  return u && Object.assign(s.schema, u), e.io === "input" && et(t) && (delete s.schema.examples, delete s.schema.default), e.io === "input" && s.schema._prefault && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, e.seen.get(t).schema;
}
function kl(t, e) {
  const n = t.seen.get(e);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = /* @__PURE__ */ new Map();
  for (const s of t.seen.entries()) {
    const a = t.metadataRegistry.get(s[0])?.id;
    if (a) {
      const u = r.get(a);
      if (u && u !== s[0])
        throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(a, s[0]);
    }
  }
  const i = (s) => {
    const a = t.target === "draft-2020-12" ? "$defs" : "definitions";
    if (t.external) {
      const f = t.external.registry.get(s[0])?.id, h = t.external.uri ?? ((m) => m);
      if (f)
        return { ref: h(f) };
      const d = s[1].defId ?? s[1].schema.id ?? `schema${t.counter++}`;
      return s[1].defId = d, { defId: d, ref: `${h("__shared")}#/${a}/${d}` };
    }
    if (s[1] === n)
      return { ref: "#" };
    const c = `#/${a}/`, l = s[1].schema.id ?? `__schema${t.counter++}`;
    return { defId: l, ref: c + l };
  }, o = (s) => {
    if (s[1].schema.$ref)
      return;
    const a = s[1], { ref: u, defId: c } = i(s);
    a.def = { ...a.schema }, c && (a.defId = c);
    const l = a.schema;
    for (const f in l)
      delete l[f];
    l.$ref = u;
  };
  if (t.cycles === "throw")
    for (const s of t.seen.entries()) {
      const a = s[1];
      if (a.cycle)
        throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const s of t.seen.entries()) {
    const a = s[1];
    if (e === s[0]) {
      o(s);
      continue;
    }
    if (t.external) {
      const c = t.external.registry.get(s[0])?.id;
      if (e !== s[0] && c) {
        o(s);
        continue;
      }
    }
    if (t.metadataRegistry.get(s[0])?.id) {
      o(s);
      continue;
    }
    if (a.cycle) {
      o(s);
      continue;
    }
    if (a.count > 1 && t.reused === "ref") {
      o(s);
      continue;
    }
  }
}
function Dl(t, e) {
  const n = t.seen.get(e);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (s) => {
    const a = t.seen.get(s);
    if (a.ref === null)
      return;
    const u = a.def ?? a.schema, c = { ...u }, l = a.ref;
    if (a.ref = null, l) {
      r(l);
      const h = t.seen.get(l), d = h.schema;
      if (d.$ref && (t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0") ? (u.allOf = u.allOf ?? [], u.allOf.push(d)) : Object.assign(u, d), Object.assign(u, c), s._zod.parent === l)
        for (const g in u)
          g === "$ref" || g === "allOf" || g in c || delete u[g];
      if (d.$ref && h.def)
        for (const g in u)
          g === "$ref" || g === "allOf" || g in h.def && JSON.stringify(u[g]) === JSON.stringify(h.def[g]) && delete u[g];
    }
    const f = s._zod.parent;
    if (f && f !== l) {
      r(f);
      const h = t.seen.get(f);
      if (h?.schema.$ref && (u.$ref = h.schema.$ref, h.def))
        for (const d in u)
          d === "$ref" || d === "allOf" || d in h.def && JSON.stringify(u[d]) === JSON.stringify(h.def[d]) && delete u[d];
    }
    t.override({
      zodSchema: s,
      jsonSchema: u,
      path: a.path ?? []
    });
  };
  for (const s of [...t.seen.entries()].reverse())
    r(s[0]);
  const i = {};
  if (t.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : t.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : t.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : t.target, t.external?.uri) {
    const s = t.external.registry.get(e)?.id;
    if (!s)
      throw new Error("Schema is missing an `id` property");
    i.$id = t.external.uri(s);
  }
  Object.assign(i, n.def ?? n.schema);
  const o = t.external?.defs ?? {};
  for (const s of t.seen.entries()) {
    const a = s[1];
    a.def && a.defId && (o[a.defId] = a.def);
  }
  t.external || Object.keys(o).length > 0 && (t.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
  try {
    const s = JSON.parse(JSON.stringify(i));
    return Object.defineProperty(s, "~standard", {
      value: {
        ...e["~standard"],
        jsonSchema: {
          input: kn(e, "input", t.processors),
          output: kn(e, "output", t.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), s;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function et(t, e) {
  const n = e ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(t))
    return !1;
  n.seen.add(t);
  const r = t._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return et(r.element, n);
  if (r.type === "set")
    return et(r.valueType, n);
  if (r.type === "lazy")
    return et(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return et(r.innerType, n);
  if (r.type === "intersection")
    return et(r.left, n) || et(r.right, n);
  if (r.type === "record" || r.type === "map")
    return et(r.keyType, n) || et(r.valueType, n);
  if (r.type === "pipe")
    return et(r.in, n) || et(r.out, n);
  if (r.type === "object") {
    for (const i in r.shape)
      if (et(r.shape[i], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const i of r.options)
      if (et(i, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const i of r.items)
      if (et(i, n))
        return !0;
    return !!(r.rest && et(r.rest, n));
  }
  return !1;
}
const Dy = (t, e = {}) => (n) => {
  const r = Ml({ ...n, processors: e });
  return U(t, r), kl(r, t), Dl(r, t);
}, kn = (t, e, n = {}) => (r) => {
  const { libraryOptions: i, target: o } = r ?? {}, s = Ml({ ...i ?? {}, target: o, io: e, processors: n });
  return U(t, s), kl(s, t), Dl(s, t);
}, jy = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Zy = (t, e, n, r) => {
  const i = n;
  i.type = "string";
  const { minimum: o, maximum: s, format: a, patterns: u, contentEncoding: c } = t._zod.bag;
  if (typeof o == "number" && (i.minLength = o), typeof s == "number" && (i.maxLength = s), a && (i.format = jy[a] ?? a, i.format === "" && delete i.format, a === "time" && delete i.format), c && (i.contentEncoding = c), u && u.size > 0) {
    const l = [...u];
    l.length === 1 ? i.pattern = l[0].source : l.length > 1 && (i.allOf = [
      ...l.map((f) => ({
        ...e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: f.source
      }))
    ]);
  }
}, Fy = (t, e, n, r) => {
  const i = n, { minimum: o, maximum: s, format: a, multipleOf: u, exclusiveMaximum: c, exclusiveMinimum: l } = t._zod.bag;
  typeof a == "string" && a.includes("int") ? i.type = "integer" : i.type = "number", typeof l == "number" && (e.target === "draft-04" || e.target === "openapi-3.0" ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l), typeof o == "number" && (i.minimum = o, typeof l == "number" && e.target !== "draft-04" && (l >= o ? delete i.minimum : delete i.exclusiveMinimum)), typeof c == "number" && (e.target === "draft-04" || e.target === "openapi-3.0" ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c), typeof s == "number" && (i.maximum = s, typeof c == "number" && e.target !== "draft-04" && (c <= s ? delete i.maximum : delete i.exclusiveMaximum)), typeof u == "number" && (i.multipleOf = u);
}, Ly = (t, e, n, r) => {
  n.type = "boolean";
}, By = (t, e, n, r) => {
  e.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, qy = (t, e, n, r) => {
  n.not = {};
}, Wy = (t, e, n, r) => {
}, Uy = (t, e, n, r) => {
}, Gy = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Date cannot be represented in JSON Schema");
}, Vy = (t, e, n, r) => {
  const i = t._zod.def, o = gl(i.entries);
  o.every((s) => typeof s == "number") && (n.type = "number"), o.every((s) => typeof s == "string") && (n.type = "string"), n.enum = o;
}, Xy = (t, e, n, r) => {
  const i = t._zod.def, o = [];
  for (const s of i.values)
    if (s === void 0) {
      if (e.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof s == "bigint") {
      if (e.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      o.push(Number(s));
    } else
      o.push(s);
  if (o.length !== 0) if (o.length === 1) {
    const s = o[0];
    n.type = s === null ? "null" : typeof s, e.target === "draft-04" || e.target === "openapi-3.0" ? n.enum = [s] : n.const = s;
  } else
    o.every((s) => typeof s == "number") && (n.type = "number"), o.every((s) => typeof s == "string") && (n.type = "string"), o.every((s) => typeof s == "boolean") && (n.type = "boolean"), o.every((s) => s === null) && (n.type = "null"), n.enum = o;
}, Hy = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Yy = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, Jy = (t, e, n, r) => {
  const i = n, o = t._zod.def, { minimum: s, maximum: a } = t._zod.bag;
  typeof s == "number" && (i.minItems = s), typeof a == "number" && (i.maxItems = a), i.type = "array", i.items = U(o.element, e, { ...r, path: [...r.path, "items"] });
}, Ky = (t, e, n, r) => {
  const i = n, o = t._zod.def;
  i.type = "object", i.properties = {};
  const s = o.shape;
  for (const c in s)
    i.properties[c] = U(s[c], e, {
      ...r,
      path: [...r.path, "properties", c]
    });
  const a = new Set(Object.keys(s)), u = new Set([...a].filter((c) => {
    const l = o.shape[c]._zod;
    return e.io === "input" ? l.optin === void 0 : l.optout === void 0;
  }));
  u.size > 0 && (i.required = Array.from(u)), o.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : o.catchall ? o.catchall && (i.additionalProperties = U(o.catchall, e, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : e.io === "output" && (i.additionalProperties = !1);
}, Qy = (t, e, n, r) => {
  const i = t._zod.def, o = i.inclusive === !1, s = i.options.map((a, u) => U(a, e, {
    ...r,
    path: [...r.path, o ? "oneOf" : "anyOf", u]
  }));
  o ? n.oneOf = s : n.anyOf = s;
}, tw = (t, e, n, r) => {
  const i = t._zod.def, o = U(i.left, e, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = U(i.right, e, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), a = (c) => "allOf" in c && Object.keys(c).length === 1, u = [
    ...a(o) ? o.allOf : [o],
    ...a(s) ? s.allOf : [s]
  ];
  n.allOf = u;
}, ew = (t, e, n, r) => {
  const i = n, o = t._zod.def;
  i.type = "object";
  const s = o.keyType, u = s._zod.bag?.patterns;
  if (o.mode === "loose" && u && u.size > 0) {
    const l = U(o.valueType, e, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    i.patternProperties = {};
    for (const f of u)
      i.patternProperties[f.source] = l;
  } else
    (e.target === "draft-07" || e.target === "draft-2020-12") && (i.propertyNames = U(o.keyType, e, {
      ...r,
      path: [...r.path, "propertyNames"]
    })), i.additionalProperties = U(o.valueType, e, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  const c = s._zod.values;
  if (c) {
    const l = [...c].filter((f) => typeof f == "string" || typeof f == "number");
    l.length > 0 && (i.required = l);
  }
}, nw = (t, e, n, r) => {
  const i = t._zod.def, o = U(i.innerType, e, r), s = e.seen.get(t);
  e.target === "openapi-3.0" ? (s.ref = i.innerType, n.nullable = !0) : n.anyOf = [o, { type: "null" }];
}, rw = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType;
}, iw = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, ow = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType, e.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, sw = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType;
  let s;
  try {
    s = i.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = s;
}, aw = (t, e, n, r) => {
  const i = t._zod.def, o = e.io === "input" ? i.in._zod.def.type === "transform" ? i.out : i.in : i.out;
  U(o, e, r);
  const s = e.seen.get(t);
  s.ref = o;
}, uw = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType, n.readOnly = !0;
}, jl = (t, e, n, r) => {
  const i = t._zod.def;
  U(i.innerType, e, r);
  const o = e.seen.get(t);
  o.ref = i.innerType;
}, cw = (t, e, n, r) => {
  const i = t._zod.innerType;
  U(i, e, r);
  const o = e.seen.get(t);
  o.ref = i;
}, lw = /* @__PURE__ */ v("ZodISODateTime", (t, e) => {
  t_.init(t, e), W.init(t, e);
});
function fw(t) {
  return /* @__PURE__ */ ly(lw, t);
}
const hw = /* @__PURE__ */ v("ZodISODate", (t, e) => {
  e_.init(t, e), W.init(t, e);
});
function dw(t) {
  return /* @__PURE__ */ fy(hw, t);
}
const pw = /* @__PURE__ */ v("ZodISOTime", (t, e) => {
  n_.init(t, e), W.init(t, e);
});
function gw(t) {
  return /* @__PURE__ */ hy(pw, t);
}
const mw = /* @__PURE__ */ v("ZodISODuration", (t, e) => {
  r_.init(t, e), W.init(t, e);
});
function vw(t) {
  return /* @__PURE__ */ dy(mw, t);
}
const _w = (t, e) => {
  yl.init(t, e), t.name = "ZodError", Object.defineProperties(t, {
    format: {
      value: (n) => Gm(t, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Um(t, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        t.issues.push(n), t.message = JSON.stringify(t.issues, no, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        t.issues.push(...n), t.message = JSON.stringify(t.issues, no, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return t.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ft = v("ZodError", _w, {
  Parent: Error
}), yw = /* @__PURE__ */ qo(ft), ww = /* @__PURE__ */ Wo(ft), bw = /* @__PURE__ */ Kn(ft), xw = /* @__PURE__ */ Qn(ft), Aw = /* @__PURE__ */ Hm(ft), Sw = /* @__PURE__ */ Ym(ft), Tw = /* @__PURE__ */ Jm(ft), $w = /* @__PURE__ */ Km(ft), Ew = /* @__PURE__ */ Qm(ft), Ow = /* @__PURE__ */ tv(ft), Iw = /* @__PURE__ */ ev(ft), zw = /* @__PURE__ */ nv(ft), F = /* @__PURE__ */ v("ZodType", (t, e) => (Z.init(t, e), Object.assign(t["~standard"], {
  jsonSchema: {
    input: kn(t, "input"),
    output: kn(t, "output")
  }
}), t.toJSONSchema = Dy(t, {}), t.def = e, t.type = e.type, Object.defineProperty(t, "_def", { value: e }), t.check = (...n) => t.clone(Lt(e, {
  checks: [
    ...e.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
}), {
  parent: !0
}), t.with = t.check, t.clone = (n, r) => Bt(t, n, r), t.brand = () => t, t.register = ((n, r) => (n.add(t, r), t)), t.parse = (n, r) => yw(t, n, r, { callee: t.parse }), t.safeParse = (n, r) => bw(t, n, r), t.parseAsync = async (n, r) => ww(t, n, r, { callee: t.parseAsync }), t.safeParseAsync = async (n, r) => xw(t, n, r), t.spa = t.safeParseAsync, t.encode = (n, r) => Aw(t, n, r), t.decode = (n, r) => Sw(t, n, r), t.encodeAsync = async (n, r) => Tw(t, n, r), t.decodeAsync = async (n, r) => $w(t, n, r), t.safeEncode = (n, r) => Ew(t, n, r), t.safeDecode = (n, r) => Ow(t, n, r), t.safeEncodeAsync = async (n, r) => Iw(t, n, r), t.safeDecodeAsync = async (n, r) => zw(t, n, r), t.refine = (n, r) => t.check(I0(n, r)), t.superRefine = (n) => t.check(z0(n)), t.overwrite = (n) => t.check(/* @__PURE__ */ we(n)), t.optional = () => ju(t), t.exactOptional = () => g0(t), t.nullable = () => Zu(t), t.nullish = () => ju(Zu(t)), t.nonoptional = (n) => b0(t, n), t.array = () => C(t), t.or = (n) => E([t, n]), t.and = (n) => c0(t, n), t.transform = (n) => Fu(t, d0(n)), t.default = (n) => _0(t, n), t.prefault = (n) => w0(t, n), t.catch = (n) => A0(t, n), t.pipe = (n) => Fu(t, n), t.readonly = () => $0(t), t.describe = (n) => {
  const r = t.clone();
  return Ie.add(r, { description: n }), r;
}, Object.defineProperty(t, "description", {
  get() {
    return Ie.get(t)?.description;
  },
  configurable: !0
}), t.meta = (...n) => {
  if (n.length === 0)
    return Ie.get(t);
  const r = t.clone();
  return Ie.add(r, n[0]), r;
}, t.isOptional = () => t.safeParse(void 0).success, t.isNullable = () => t.safeParse(null).success, t.apply = (n) => n(t), t)), Zl = /* @__PURE__ */ v("_ZodString", (t, e) => {
  Uo.init(t, e), F.init(t, e), t._zod.processJSONSchema = (r, i, o) => Zy(t, r, i);
  const n = t._zod.bag;
  t.format = n.format ?? null, t.minLength = n.minimum ?? null, t.maxLength = n.maximum ?? null, t.regex = (...r) => t.check(/* @__PURE__ */ xy(...r)), t.includes = (...r) => t.check(/* @__PURE__ */ Ty(...r)), t.startsWith = (...r) => t.check(/* @__PURE__ */ $y(...r)), t.endsWith = (...r) => t.check(/* @__PURE__ */ Ey(...r)), t.min = (...r) => t.check(/* @__PURE__ */ Mn(...r)), t.max = (...r) => t.check(/* @__PURE__ */ Rl(...r)), t.length = (...r) => t.check(/* @__PURE__ */ Pl(...r)), t.nonempty = (...r) => t.check(/* @__PURE__ */ Mn(1, ...r)), t.lowercase = (r) => t.check(/* @__PURE__ */ Ay(r)), t.uppercase = (r) => t.check(/* @__PURE__ */ Sy(r)), t.trim = () => t.check(/* @__PURE__ */ Iy()), t.normalize = (...r) => t.check(/* @__PURE__ */ Oy(...r)), t.toLowerCase = () => t.check(/* @__PURE__ */ zy()), t.toUpperCase = () => t.check(/* @__PURE__ */ Cy()), t.slugify = () => t.check(/* @__PURE__ */ Ny());
}), Cw = /* @__PURE__ */ v("ZodString", (t, e) => {
  Uo.init(t, e), Zl.init(t, e), t.email = (n) => t.check(/* @__PURE__ */ q_(Nw, n)), t.url = (n) => t.check(/* @__PURE__ */ X_(Rw, n)), t.jwt = (n) => t.check(/* @__PURE__ */ cy(Xw, n)), t.emoji = (n) => t.check(/* @__PURE__ */ H_(Pw, n)), t.guid = (n) => t.check(/* @__PURE__ */ Nu(ku, n)), t.uuid = (n) => t.check(/* @__PURE__ */ W_(an, n)), t.uuidv4 = (n) => t.check(/* @__PURE__ */ U_(an, n)), t.uuidv6 = (n) => t.check(/* @__PURE__ */ G_(an, n)), t.uuidv7 = (n) => t.check(/* @__PURE__ */ V_(an, n)), t.nanoid = (n) => t.check(/* @__PURE__ */ Y_(Mw, n)), t.guid = (n) => t.check(/* @__PURE__ */ Nu(ku, n)), t.cuid = (n) => t.check(/* @__PURE__ */ J_(kw, n)), t.cuid2 = (n) => t.check(/* @__PURE__ */ K_(Dw, n)), t.ulid = (n) => t.check(/* @__PURE__ */ Q_(jw, n)), t.base64 = (n) => t.check(/* @__PURE__ */ sy(Uw, n)), t.base64url = (n) => t.check(/* @__PURE__ */ ay(Gw, n)), t.xid = (n) => t.check(/* @__PURE__ */ ty(Zw, n)), t.ksuid = (n) => t.check(/* @__PURE__ */ ey(Fw, n)), t.ipv4 = (n) => t.check(/* @__PURE__ */ ny(Lw, n)), t.ipv6 = (n) => t.check(/* @__PURE__ */ ry(Bw, n)), t.cidrv4 = (n) => t.check(/* @__PURE__ */ iy(qw, n)), t.cidrv6 = (n) => t.check(/* @__PURE__ */ oy(Ww, n)), t.e164 = (n) => t.check(/* @__PURE__ */ uy(Vw, n)), t.datetime = (n) => t.check(fw(n)), t.date = (n) => t.check(dw(n)), t.time = (n) => t.check(gw(n)), t.duration = (n) => t.check(vw(n));
});
function A(t) {
  return /* @__PURE__ */ B_(Cw, t);
}
const W = /* @__PURE__ */ v("ZodStringFormat", (t, e) => {
  q.init(t, e), Zl.init(t, e);
}), Nw = /* @__PURE__ */ v("ZodEmail", (t, e) => {
  Uv.init(t, e), W.init(t, e);
}), ku = /* @__PURE__ */ v("ZodGUID", (t, e) => {
  qv.init(t, e), W.init(t, e);
}), an = /* @__PURE__ */ v("ZodUUID", (t, e) => {
  Wv.init(t, e), W.init(t, e);
}), Rw = /* @__PURE__ */ v("ZodURL", (t, e) => {
  Gv.init(t, e), W.init(t, e);
}), Pw = /* @__PURE__ */ v("ZodEmoji", (t, e) => {
  Vv.init(t, e), W.init(t, e);
}), Mw = /* @__PURE__ */ v("ZodNanoID", (t, e) => {
  Xv.init(t, e), W.init(t, e);
}), kw = /* @__PURE__ */ v("ZodCUID", (t, e) => {
  Hv.init(t, e), W.init(t, e);
}), Dw = /* @__PURE__ */ v("ZodCUID2", (t, e) => {
  Yv.init(t, e), W.init(t, e);
}), jw = /* @__PURE__ */ v("ZodULID", (t, e) => {
  Jv.init(t, e), W.init(t, e);
}), Zw = /* @__PURE__ */ v("ZodXID", (t, e) => {
  Kv.init(t, e), W.init(t, e);
}), Fw = /* @__PURE__ */ v("ZodKSUID", (t, e) => {
  Qv.init(t, e), W.init(t, e);
}), Lw = /* @__PURE__ */ v("ZodIPv4", (t, e) => {
  i_.init(t, e), W.init(t, e);
}), Bw = /* @__PURE__ */ v("ZodIPv6", (t, e) => {
  o_.init(t, e), W.init(t, e);
}), qw = /* @__PURE__ */ v("ZodCIDRv4", (t, e) => {
  s_.init(t, e), W.init(t, e);
}), Ww = /* @__PURE__ */ v("ZodCIDRv6", (t, e) => {
  a_.init(t, e), W.init(t, e);
}), Uw = /* @__PURE__ */ v("ZodBase64", (t, e) => {
  u_.init(t, e), W.init(t, e);
}), Gw = /* @__PURE__ */ v("ZodBase64URL", (t, e) => {
  l_.init(t, e), W.init(t, e);
}), Vw = /* @__PURE__ */ v("ZodE164", (t, e) => {
  f_.init(t, e), W.init(t, e);
}), Xw = /* @__PURE__ */ v("ZodJWT", (t, e) => {
  d_.init(t, e), W.init(t, e);
}), Fl = /* @__PURE__ */ v("ZodNumber", (t, e) => {
  Il.init(t, e), F.init(t, e), t._zod.processJSONSchema = (r, i, o) => Fy(t, r, i), t.gt = (r, i) => t.check(/* @__PURE__ */ Pu(r, i)), t.gte = (r, i) => t.check(/* @__PURE__ */ bn(r, i)), t.min = (r, i) => t.check(/* @__PURE__ */ bn(r, i)), t.lt = (r, i) => t.check(/* @__PURE__ */ Ru(r, i)), t.lte = (r, i) => t.check(/* @__PURE__ */ wn(r, i)), t.max = (r, i) => t.check(/* @__PURE__ */ wn(r, i)), t.int = (r) => t.check(Du(r)), t.safe = (r) => t.check(Du(r)), t.positive = (r) => t.check(/* @__PURE__ */ Pu(0, r)), t.nonnegative = (r) => t.check(/* @__PURE__ */ bn(0, r)), t.negative = (r) => t.check(/* @__PURE__ */ Ru(0, r)), t.nonpositive = (r) => t.check(/* @__PURE__ */ wn(0, r)), t.multipleOf = (r, i) => t.check(/* @__PURE__ */ Mu(r, i)), t.step = (r, i) => t.check(/* @__PURE__ */ Mu(r, i)), t.finite = () => t;
  const n = t._zod.bag;
  t.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, t.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, t.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), t.isFinite = !0, t.format = n.format ?? null;
});
function D(t) {
  return /* @__PURE__ */ py(Fl, t);
}
const Hw = /* @__PURE__ */ v("ZodNumberFormat", (t, e) => {
  p_.init(t, e), Fl.init(t, e);
});
function Du(t) {
  return /* @__PURE__ */ gy(Hw, t);
}
const Yw = /* @__PURE__ */ v("ZodBoolean", (t, e) => {
  g_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Ly(t, n, r);
});
function Jw(t) {
  return /* @__PURE__ */ my(Yw, t);
}
const Kw = /* @__PURE__ */ v("ZodNull", (t, e) => {
  m_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => By(t, n, r);
});
function Qw(t) {
  return /* @__PURE__ */ vy(Kw, t);
}
const t0 = /* @__PURE__ */ v("ZodAny", (t, e) => {
  v_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Wy();
});
function Ll() {
  return /* @__PURE__ */ _y(t0);
}
const e0 = /* @__PURE__ */ v("ZodUnknown", (t, e) => {
  __.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Uy();
});
function io() {
  return /* @__PURE__ */ yy(e0);
}
const n0 = /* @__PURE__ */ v("ZodNever", (t, e) => {
  y_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => qy(t, n, r);
});
function r0(t) {
  return /* @__PURE__ */ wy(n0, t);
}
const i0 = /* @__PURE__ */ v("ZodDate", (t, e) => {
  w_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (r, i, o) => Gy(t, r), t.min = (r, i) => t.check(/* @__PURE__ */ bn(r, i)), t.max = (r, i) => t.check(/* @__PURE__ */ wn(r, i));
  const n = t._zod.bag;
  t.minDate = n.minimum ? new Date(n.minimum) : null, t.maxDate = n.maximum ? new Date(n.maximum) : null;
}), o0 = /* @__PURE__ */ v("ZodArray", (t, e) => {
  b_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Jy(t, n, r, i), t.element = e.element, t.min = (n, r) => t.check(/* @__PURE__ */ Mn(n, r)), t.nonempty = (n) => t.check(/* @__PURE__ */ Mn(1, n)), t.max = (n, r) => t.check(/* @__PURE__ */ Rl(n, r)), t.length = (n, r) => t.check(/* @__PURE__ */ Pl(n, r)), t.unwrap = () => t.element;
});
function C(t, e) {
  return /* @__PURE__ */ Ry(o0, t, e);
}
const s0 = /* @__PURE__ */ v("ZodObject", (t, e) => {
  A_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Ky(t, n, r, i), P(t, "shape", () => e.shape), t.keyof = () => Go(Object.keys(t._zod.def.shape)), t.catchall = (n) => t.clone({ ...t._zod.def, catchall: n }), t.passthrough = () => t.clone({ ...t._zod.def, catchall: io() }), t.loose = () => t.clone({ ...t._zod.def, catchall: io() }), t.strict = () => t.clone({ ...t._zod.def, catchall: r0() }), t.strip = () => t.clone({ ...t._zod.def, catchall: void 0 }), t.extend = (n) => Fm(t, n), t.safeExtend = (n) => Lm(t, n), t.merge = (n) => Bm(t, n), t.pick = (n) => jm(t, n), t.omit = (n) => Zm(t, n), t.partial = (...n) => qm(ql, t, n[0]), t.required = (...n) => Wm(Wl, t, n[0]);
});
function k(t, e) {
  const n = {
    type: "object",
    shape: t ?? {},
    ...S(e)
  };
  return new s0(n);
}
const a0 = /* @__PURE__ */ v("ZodUnion", (t, e) => {
  S_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Qy(t, n, r, i), t.options = e.options;
});
function E(t, e) {
  return new a0({
    type: "union",
    options: t,
    ...S(e)
  });
}
const u0 = /* @__PURE__ */ v("ZodIntersection", (t, e) => {
  T_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => tw(t, n, r, i);
});
function c0(t, e) {
  return new u0({
    type: "intersection",
    left: t,
    right: e
  });
}
const l0 = /* @__PURE__ */ v("ZodRecord", (t, e) => {
  $_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => ew(t, n, r, i), t.keyType = e.keyType, t.valueType = e.valueType;
});
function Bl(t, e, n) {
  return new l0({
    type: "record",
    keyType: t,
    valueType: e,
    ...S(n)
  });
}
const oo = /* @__PURE__ */ v("ZodEnum", (t, e) => {
  E_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (r, i, o) => Vy(t, r, i), t.enum = e.entries, t.options = Object.values(e.entries);
  const n = new Set(Object.keys(e.entries));
  t.extract = (r, i) => {
    const o = {};
    for (const s of r)
      if (n.has(s))
        o[s] = e.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new oo({
      ...e,
      checks: [],
      ...S(i),
      entries: o
    });
  }, t.exclude = (r, i) => {
    const o = { ...e.entries };
    for (const s of r)
      if (n.has(s))
        delete o[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new oo({
      ...e,
      checks: [],
      ...S(i),
      entries: o
    });
  };
});
function Go(t, e) {
  const n = Array.isArray(t) ? Object.fromEntries(t.map((r) => [r, r])) : t;
  return new oo({
    type: "enum",
    entries: n,
    ...S(e)
  });
}
const f0 = /* @__PURE__ */ v("ZodLiteral", (t, e) => {
  O_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Xy(t, n, r), t.values = new Set(e.values), Object.defineProperty(t, "value", {
    get() {
      if (e.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return e.values[0];
    }
  });
});
function R(t, e) {
  return new f0({
    type: "literal",
    values: Array.isArray(t) ? t : [t],
    ...S(e)
  });
}
const h0 = /* @__PURE__ */ v("ZodTransform", (t, e) => {
  I_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Yy(t, n), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new dl(t.constructor.name);
    n.addIssue = (o) => {
      if (typeof o == "string")
        n.issues.push(Fe(o, n.value, e));
      else {
        const s = o;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = n.value), s.inst ?? (s.inst = t), n.issues.push(Fe(s));
      }
    };
    const i = e.transform(n.value, n);
    return i instanceof Promise ? i.then((o) => (n.value = o, n)) : (n.value = i, n);
  };
});
function d0(t) {
  return new h0({
    type: "transform",
    transform: t
  });
}
const ql = /* @__PURE__ */ v("ZodOptional", (t, e) => {
  Nl.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => jl(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function ju(t) {
  return new ql({
    type: "optional",
    innerType: t
  });
}
const p0 = /* @__PURE__ */ v("ZodExactOptional", (t, e) => {
  z_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => jl(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function g0(t) {
  return new p0({
    type: "optional",
    innerType: t
  });
}
const m0 = /* @__PURE__ */ v("ZodNullable", (t, e) => {
  C_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => nw(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function Zu(t) {
  return new m0({
    type: "nullable",
    innerType: t
  });
}
const v0 = /* @__PURE__ */ v("ZodDefault", (t, e) => {
  N_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => iw(t, n, r, i), t.unwrap = () => t._zod.def.innerType, t.removeDefault = t.unwrap;
});
function _0(t, e) {
  return new v0({
    type: "default",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : vl(e);
    }
  });
}
const y0 = /* @__PURE__ */ v("ZodPrefault", (t, e) => {
  R_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => ow(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function w0(t, e) {
  return new y0({
    type: "prefault",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : vl(e);
    }
  });
}
const Wl = /* @__PURE__ */ v("ZodNonOptional", (t, e) => {
  P_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => rw(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function b0(t, e) {
  return new Wl({
    type: "nonoptional",
    innerType: t,
    ...S(e)
  });
}
const x0 = /* @__PURE__ */ v("ZodCatch", (t, e) => {
  M_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => sw(t, n, r, i), t.unwrap = () => t._zod.def.innerType, t.removeCatch = t.unwrap;
});
function A0(t, e) {
  return new x0({
    type: "catch",
    innerType: t,
    catchValue: typeof e == "function" ? e : () => e
  });
}
const S0 = /* @__PURE__ */ v("ZodPipe", (t, e) => {
  k_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => aw(t, n, r, i), t.in = e.in, t.out = e.out;
});
function Fu(t, e) {
  return new S0({
    type: "pipe",
    in: t,
    out: e
    // ...util.normalizeParams(params),
  });
}
const T0 = /* @__PURE__ */ v("ZodReadonly", (t, e) => {
  D_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => uw(t, n, r, i), t.unwrap = () => t._zod.def.innerType;
});
function $0(t) {
  return new T0({
    type: "readonly",
    innerType: t
  });
}
const E0 = /* @__PURE__ */ v("ZodLazy", (t, e) => {
  j_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => cw(t, n, r, i), t.unwrap = () => t._zod.def.getter();
});
function gt(t) {
  return new E0({
    type: "lazy",
    getter: t
  });
}
const O0 = /* @__PURE__ */ v("ZodCustom", (t, e) => {
  Z_.init(t, e), F.init(t, e), t._zod.processJSONSchema = (n, r, i) => Hy(t, n);
});
function I0(t, e = {}) {
  return /* @__PURE__ */ Py(O0, t, e);
}
function z0(t) {
  return /* @__PURE__ */ My(t);
}
function C0(t) {
  return /* @__PURE__ */ by(i0, t);
}
const M = A(), It = E([
  A().datetime({ offset: !0 }),
  C0().transform((t) => t.toISOString()),
  R(""),
  Qw()
]), Mi = A().regex(/^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/), N0 = Go(["ltr", "rtl", "auto"]), Zt = E([
  R("oa:assessing"),
  R("oa:bookmarking"),
  R("oa:classifying"),
  R("oa:commenting"),
  R("oa:describing"),
  R("oa:editing"),
  R("oa:highlighting"),
  R("oa:identifying"),
  R("oa:linking"),
  R("oa:moderating"),
  R("oa:questioning"),
  R("oa:replying"),
  R("oa:tagging"),
  A()
  // open for extension
]), R0 = k({
  type: R("FragmentSelector"),
  value: A(),
  conformsTo: M.optional(),
  refinedBy: gt(() => ct).optional()
}), P0 = k({
  type: R("CssSelector"),
  value: A(),
  refinedBy: gt(() => ct).optional()
}), M0 = k({
  type: R("XPathSelector"),
  value: A(),
  refinedBy: gt(() => ct).optional()
}), k0 = k({
  type: R("TextQuoteSelector"),
  exact: A(),
  prefix: A().optional(),
  suffix: A().optional(),
  refinedBy: gt(() => ct).optional()
}), D0 = k({
  type: R("TextPositionSelector"),
  start: D().int().nonnegative(),
  end: D().int().nonnegative(),
  refinedBy: gt(() => ct).optional()
}), j0 = k({
  type: R("DataPositionSelector"),
  start: D().int().nonnegative(),
  end: D().int().nonnegative(),
  refinedBy: gt(() => ct).optional()
}), Z0 = k({
  type: R("SvgSelector"),
  /** Inline SVG string or IRI pointing to an SVG resource */
  value: A().optional(),
  id: M.optional(),
  refinedBy: gt(() => ct).optional()
}), F0 = k({
  type: R("RangeSelector"),
  startSelector: gt(() => ct),
  endSelector: gt(() => ct),
  refinedBy: gt(() => ct).optional()
}), ct = gt(
  () => E([
    R0,
    P0,
    M0,
    k0,
    D0,
    j0,
    Z0,
    F0
  ])
), L0 = k({
  type: R("TimeState"),
  sourceDate: E([It, C(It)]).optional(),
  sourceDateStart: It.optional(),
  sourceDateEnd: It.optional(),
  cachedSource: M.optional()
}), B0 = k({
  type: R("HttpRequestState"),
  value: A()
}), Lu = E([L0, B0]), q0 = k({
  type: R("CssStylesheet"),
  id: M.optional(),
  value: A().optional()
}), Bu = Go(["Person", "Organization", "Software"]), Mt = k({
  id: M.optional(),
  type: E([Bu, C(Bu)]).optional(),
  name: E([A(), C(A())]).optional(),
  nickname: A().optional(),
  email: E([A(), C(A())]).optional(),
  email_sha1: E([A(), C(A())]).optional(),
  homepage: E([M, C(M)]).optional()
}), Dn = k({
  id: M.optional(),
  type: A().optional()
}), W0 = E([
  A(),
  C(E([A(), Bl(A(), A())]))
]), Vo = k({
  "@context": W0.optional(),
  id: M.optional(),
  format: E([A(), C(A())]).optional(),
  language: E([Mi, C(Mi)]).optional(),
  processingLanguage: Mi.optional(),
  textDirection: N0.optional(),
  accessibility: E([A(), C(A())]).optional(),
  rights: E([M, C(M)]).optional(),
  canonical: M.optional(),
  via: E([M, C(M)]).optional(),
  creator: E([Mt, C(Mt)]).optional(),
  created: It.optional(),
  modified: It.optional(),
  audience: E([Dn, C(Dn)]).optional(),
  scope: M.optional()
}), U0 = E([
  R("TextualBody"),
  C(A()).refine((t) => t.includes("TextualBody"), {
    message: 'Type array must include "TextualBody"'
  })
]), Xo = Vo.extend({
  type: U0,
  value: A(),
  purpose: E([Zt, C(Zt)]).optional()
}).passthrough(), er = Vo.extend({
  type: R("SpecificResource").optional(),
  source: M,
  selector: E([ct, C(ct)]).optional(),
  state: E([Lu, C(Lu)]).optional(),
  styleClass: A().optional(),
  renderedVia: E([Mt, C(Mt)]).optional(),
  purpose: E([Zt, C(Zt)]).optional()
}).passthrough(), Ho = Vo.extend({
  id: M,
  type: E([A(), C(A())]).optional(),
  purpose: E([Zt, C(Zt)]).optional()
}).passthrough(), G0 = k({
  type: R("Choice"),
  items: C(
    E([Xo, er, Ho])
  )
}), V0 = Bl(A(), io()), qu = E([
  Xo,
  er,
  Ho,
  G0,
  /** Application-specific custom body */
  V0,
  /** Simple IRI body */
  M
]), Wu = E([
  er,
  Ho,
  M
]), xn = k({
  "@context": E([R("http://www.w3.org/ns/anno.jsonld"), C(A())]).optional(),
  id: M,
  type: R("Annotation"),
  // Body — optional: annotation may have no body
  body: E([qu, C(qu)]).optional(),
  // Target — required
  target: E([Wu, C(Wu)]),
  // Motivation
  motivation: E([Zt, C(Zt)]).optional(),
  // Provenance
  creator: E([Mt, C(Mt)]).optional(),
  created: It.optional(),
  modified: It.optional(),
  generator: E([Mt, C(Mt)]).optional(),
  generated: It.optional(),
  // Attribution
  audience: E([Dn, C(Dn)]).optional(),
  rights: E([M, C(M)]).optional(),
  canonical: M.optional(),
  via: E([M, C(M)]).optional(),
  // Styling
  stylesheet: E([q0, M]).optional()
}), X0 = k({
  id: M,
  type: R("AnnotationPage"),
  partOf: M.optional(),
  startIndex: D().int().nonnegative().optional(),
  next: M.optional(),
  prev: M.optional(),
  items: C(xn).optional()
});
k({
  "@context": E([R("http://www.w3.org/ns/anno.jsonld"), C(A())]).optional(),
  id: M,
  type: R("AnnotationCollection"),
  label: A().optional(),
  total: D().int().nonnegative().optional(),
  first: E([X0, M]).optional(),
  last: M.optional()
});
const Ul = (t) => t === void 0 ? [] : Array.isArray(t) ? t : [t], Gl = (t) => typeof t == "string", Uu = (t) => Xo.safeParse(t).success, Ot = (t) => !Gl(t) && er.safeParse(t).success, H0 = (t) => Ul(t.target), Y0 = (t) => H0(t).filter(Ot).flatMap((e) => Ul(e.selector)), Vl = (t) => (e) => Y0(e).filter(
  (n) => !Gl(n) && n.type === t
), J0 = Vl("TextQuoteSelector"), K0 = Vl("TextPositionSelector"), un = (t) => JSON.parse(JSON.stringify(t)), tt = (t) => t === void 0 ? [] : Array.isArray(t) ? t : [t], xt = (t) => tt(t.target), ne = (t) => tt(t.body), Ae = (t, e) => {
  const n = [...tt(t), ...tt(e)];
  return n.length === 0 ? void 0 : n.length === 1 ? n[0] : n;
}, Gu = (t, e) => {
  if (typeof t == "string") return !1;
  const n = t.type;
  return n === void 0 ? !1 : Array.isArray(n) ? n.includes(e) : n === e;
}, ki = (t, e) => {
  const n = [
    .../* @__PURE__ */ new Set([...tt(t), ...tt(e)])
  ];
  return n.length === 0 ? void 0 : n.length === 1 ? n[0] : n;
}, Q0 = (t, e) => {
  const n = e.type, o = [...tt(t.selector).filter(
    (s) => s.type !== n
  ), e];
  return { ...t, selector: o.length === 1 ? o[0] : o };
}, tb = (t, e) => {
  const r = tt(t.selector).filter(
    (i) => i.type !== e
  );
  return {
    ...t,
    selector: r.length === 0 ? void 0 : r.length === 1 ? r[0] : r
  };
};
class Yo {
  state;
  constructor(e) {
    this.state = e ? un(e) : { "@context": "http://www.w3.org/ns/anno.jsonld", type: "Annotation" };
  }
  // -------------------------------------------------------------------------
  // Clone
  // -------------------------------------------------------------------------
  /** Return a deep copy of this builder */
  clone() {
    return new Yo(un(this.state));
  }
  // -------------------------------------------------------------------------
  // Identity
  // -------------------------------------------------------------------------
  setId(e) {
    return this.state.id = e, this;
  }
  setContext(e) {
    return this.state["@context"] = e, this;
  }
  /** Add a context entry, converting to array if needed (deduplicates) */
  addContext(e) {
    const n = this.state["@context"], r = n === void 0 ? [] : Array.isArray(n) ? [...n] : [n];
    return r.includes(e) || r.push(e), this.state["@context"] = r.length === 1 ? r[0] : r, this;
  }
  // -------------------------------------------------------------------------
  // Motivation
  // -------------------------------------------------------------------------
  setMotivation(e) {
    return this.state.motivation = e, this;
  }
  addMotivation(e) {
    const n = tt(
      this.state.motivation
    ), r = [.../* @__PURE__ */ new Set([...n, e])];
    return this.state.motivation = r.length === 1 ? r[0] : r, this;
  }
  removeMotivation(e) {
    const r = tt(
      this.state.motivation
    ).filter((i) => i !== e);
    return this.state.motivation = r.length === 0 ? void 0 : r.length === 1 ? r[0] : r, this;
  }
  // -------------------------------------------------------------------------
  // Target
  // -------------------------------------------------------------------------
  setTarget(e) {
    return this.state.target = e, this;
  }
  addTarget(e) {
    const n = xt(this.state);
    return this.state.target = [...n, e], this;
  }
  /** Replace the target whose source / IRI matches `sourceUri` */
  replaceTarget(e, n) {
    const i = xt(this.state).map((o) => typeof o == "string" ? o === e ? n : o : Ot(o) && o.source === e ? n : o);
    return this.state.target = i.length === 1 ? i[0] : i, this;
  }
  removeTarget(e) {
    const n = xt(this.state).filter((r) => typeof r == "string" ? r !== e : Ot(r) ? r.source !== e : !0);
    return this.state.target = n.length === 1 ? n[0] : n, this;
  }
  // -------------------------------------------------------------------------
  // Selector helpers  (operate on the first / matching SpecificResource target)
  // -------------------------------------------------------------------------
  /**
   * Upsert a TextQuoteSelector on the SpecificResource target matching
   * `sourceUri` (or the first SpecificResource target if omitted).
   */
  updateTextQuoteSelector(e, n) {
    return this._upsertSelectorOnTarget(
      { type: "TextQuoteSelector", ...e },
      n
    );
  }
  updateTextPositionSelector(e, n) {
    return this._upsertSelectorOnTarget(
      { type: "TextPositionSelector", ...e },
      n
    );
  }
  updateFragmentSelector(e, n) {
    return this._upsertSelectorOnTarget(
      { type: "FragmentSelector", ...e },
      n
    );
  }
  updateSvgSelector(e, n) {
    return this._upsertSelectorOnTarget(
      { type: "SvgSelector", ...e },
      n
    );
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
  // -------------------------------------------------------------------------
  // Body
  // -------------------------------------------------------------------------
  setBody(e) {
    return this.state.body = e, this;
  }
  addBody(e) {
    const n = ne(this.state);
    return this.state.body = [...n, e], this;
  }
  /** Add or replace a TextualBody with the given purpose */
  updateTextualBody(e, n, r) {
    const i = {
      type: "TextualBody",
      value: e,
      ...n ? { purpose: n } : {},
      ...r
    };
    if (!n)
      return this.updateBodyByType("TextualBody", i);
    const o = ne(this.state), s = o.findIndex(
      (u) => Uu(u) && tt(u.purpose).includes(n)
    ), a = s === -1 ? [...o, i] : o.map((u, c) => c === s ? i : u);
    return this.state.body = a.length === 1 ? a[0] : a, this;
  }
  /** Add or replace a body matching the given `type` */
  updateBodyByType(e, n) {
    const r = ne(this.state), i = r.findIndex((s) => Gu(s, e)), o = i === -1 ? [...r, n] : r.map((s, a) => a === i ? n : s);
    return this.state.body = o.length === 1 ? o[0] : o, this;
  }
  removeTextualBody(e) {
    const r = ne(this.state).filter((i) => Uu(i) ? e ? !tt(i.purpose).includes(e) : !1 : !0);
    return this.state.body = r.length === 0 ? void 0 : r.length === 1 ? r[0] : r, this;
  }
  // -------------------------------------------------------------------------
  // Provenance
  // -------------------------------------------------------------------------
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
  /** Stamp `modified` with the current timestamp */
  touch() {
    return this.state.modified = (/* @__PURE__ */ new Date()).toISOString(), this;
  }
  // -------------------------------------------------------------------------
  // Styling
  // -------------------------------------------------------------------------
  setStylesheet(e) {
    return this.state.stylesheet = e, this;
  }
  // -------------------------------------------------------------------------
  // Merge
  // -------------------------------------------------------------------------
  /**
   * Merge a partial W3C annotation into the current state.
   *
   * - Scalar fields (`id`, `created`, `modified`, ...) are overwritten by the incoming value.
   * - Array-like fields (`target`, `body`, `creator`, ...) are concatenated.
   * - String array fields (`motivation`, `rights`, `via`) are concatenated and deduplicated.
   */
  merge(e) {
    const n = un(e);
    return n["@context"] !== void 0 && (this.state["@context"] = n["@context"]), n.id !== void 0 && (this.state.id = n.id), n.type !== void 0 && (this.state.type = n.type), n.created !== void 0 && (this.state.created = n.created), n.modified !== void 0 && (this.state.modified = n.modified), n.generated !== void 0 && (this.state.generated = n.generated), n.canonical !== void 0 && (this.state.canonical = n.canonical), n.stylesheet !== void 0 && (this.state.stylesheet = n.stylesheet), n.motivation !== void 0 && (this.state.motivation = ki(
      this.state.motivation,
      n.motivation
    )), n.rights !== void 0 && (this.state.rights = ki(
      this.state.rights,
      n.rights
    )), n.via !== void 0 && (this.state.via = ki(
      this.state.via,
      n.via
    )), n.target !== void 0 && (this.state.target = Ae(
      this.state.target,
      n.target
    )), n.body !== void 0 && (this.state.body = Ae(
      this.state.body,
      n.body
    )), n.creator !== void 0 && (this.state.creator = Ae(
      this.state.creator,
      n.creator
    )), n.generator !== void 0 && (this.state.generator = Ae(
      this.state.generator,
      n.generator
    )), n.audience !== void 0 && (this.state.audience = Ae(
      this.state.audience,
      n.audience
    )), this;
  }
  // -------------------------------------------------------------------------
  // Read / inspect (non-mutating)  w3cAnnotation(existing).getTextQuoteSelector(sourceUri)
  // -------------------------------------------------------------------------
  /**
   * Return all TextQuoteSelectors from the annotation,
   * optionally scoped to a specific target source URI.
   */
  getTextQuoteSelector(e) {
    const n = this.state;
    return e ? xt(this.state).filter(
      (i) => Ot(i) && i.source === e
    ).flatMap(
      (i) => tt(i.selector).filter(
        (o) => o.type === "TextQuoteSelector"
      )
    ) : J0(n);
  }
  getTextPositionSelector(e) {
    const n = this.state;
    return e ? xt(this.state).filter(
      (i) => Ot(i) && i.source === e
    ).flatMap(
      (i) => tt(i.selector).filter(
        (o) => o.type === "TextPositionSelector"
      )
    ) : K0(n);
  }
  getFragmentSelector(e) {
    return xt(this.state).filter(
      (r) => Ot(r) && (!e || r.source === e)
    ).flatMap(
      (r) => tt(r.selector).filter(
        (i) => i.type === "FragmentSelector"
      )
    );
  }
  /**
   * Return all bodies whose `type` matches the given type string.
   * Handles both single-string and array-of-strings `type` fields.
   */
  getBodiesByType(e) {
    return ne(this.state).filter((n) => Gu(n, e));
  }
  /**
   * Return all bodies that have a matching `purpose`.
   * When no purpose is provided, returns all bodies that have any purpose set.
   */
  getBodiesByPurpose(e) {
    return ne(this.state).filter((n) => {
      if (typeof n == "string") return !1;
      const r = n.purpose;
      return r === void 0 ? !1 : e ? tt(r).includes(e) : !0;
    });
  }
  /**
   * Return all SpecificResource targets, optionally filtered by source URI.
   */
  getSpecificResourceTargets(e) {
    return xt(this.state).filter(
      (n) => Ot(n) && (!e || n.source === e)
    );
  }
  /**
   * Return the source URI of the first SpecificResource target,
   * or `undefined` if none exists.
   */
  getSourceUri() {
    return this.getSpecificResourceTargets()[0]?.source;
  }
  /** Return a snapshot of the current (potentially unvalidated) state */
  peek() {
    return un(this.state);
  }
  // -------------------------------------------------------------------------
  // Build / validate
  // -------------------------------------------------------------------------
  /**
   * Validate and return the annotation.
   * Throws a descriptive error if validation fails.
   */
  build() {
    const e = xn.safeParse(this.state);
    if (!e.success) {
      const n = e.error.issues.map((r) => `  • ${r.path.join(".")} — ${r.message}`).join(`
`);
      throw new Error(`Invalid W3C Annotation:
${n}`);
    }
    return e.data;
  }
  /**
   * Like build() but returns a result object instead of throwing.
   */
  safeBuild() {
    const e = xn.safeParse(this.state);
    return e.success ? { success: !0, data: e.data } : { success: !1, errors: e.error.issues };
  }
  /**
   * Validate the current state without producing the final object.
   * Returns an array of issues (empty = valid).
   */
  validate() {
    const e = xn.safeParse(this.state);
    return e.success ? [] : e.error.issues;
  }
  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------
  _findOrCreateSpecificResource(e) {
    const n = xt(this.state), r = n.find((i) => Ot(i) ? e ? i.source === e : !0 : !1);
    if (r) return r;
    if (e) {
      const i = {
        type: "SpecificResource",
        source: e
      };
      return this.state.target = [...n, i], i;
    }
    return null;
  }
  _upsertSelectorOnTarget(e, n) {
    const r = this._findOrCreateSpecificResource(n);
    if (!r)
      throw new Error(
        n ? `No SpecificResource target found with source "${n}"` : "No SpecificResource target found. Provide a sourceUri to create one."
      );
    const i = Q0(r, e), o = xt(this.state).map(
      (s) => s === r ? i : s
    );
    return this.state.target = o.length === 1 ? o[0] : o, this;
  }
  _removeSelectorFromTarget(e, n) {
    const r = xt(this.state).map((i) => !Ot(i) || n && i.source !== n ? i : tb(i, e));
    return this.state.target = r.length === 1 ? r[0] : r, this;
  }
}
const Vu = (t) => new Yo(t);
var Xl = typeof global == "object" && global && global.Object === Object && global, eb = typeof self == "object" && self && self.Object === Object && self, $t = Xl || eb || Function("return this")(), lt = $t.Symbol, Hl = Object.prototype, nb = Hl.hasOwnProperty, rb = Hl.toString, Se = lt ? lt.toStringTag : void 0;
function ib(t) {
  var e = nb.call(t, Se), n = t[Se];
  try {
    t[Se] = void 0;
    var r = !0;
  } catch {
  }
  var i = rb.call(t);
  return r && (e ? t[Se] = n : delete t[Se]), i;
}
var ob = Object.prototype, sb = ob.toString;
function ab(t) {
  return sb.call(t);
}
var ub = "[object Null]", cb = "[object Undefined]", Xu = lt ? lt.toStringTag : void 0;
function Qt(t) {
  return t == null ? t === void 0 ? cb : ub : Xu && Xu in Object(t) ? ib(t) : ab(t);
}
function St(t) {
  return t != null && typeof t == "object";
}
var lb = "[object Symbol]";
function ge(t) {
  return typeof t == "symbol" || St(t) && Qt(t) == lb;
}
function An(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var rt = Array.isArray, Hu = lt ? lt.prototype : void 0, Yu = Hu ? Hu.toString : void 0;
function Yl(t) {
  if (typeof t == "string")
    return t;
  if (rt(t))
    return An(t, Yl) + "";
  if (ge(t))
    return Yu ? Yu.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function _t(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function nr(t) {
  return t;
}
var fb = "[object AsyncFunction]", hb = "[object Function]", db = "[object GeneratorFunction]", pb = "[object Proxy]";
function Jo(t) {
  if (!_t(t))
    return !1;
  var e = Qt(t);
  return e == hb || e == db || e == fb || e == pb;
}
var Di = $t["__core-js_shared__"], Ju = (function() {
  var t = /[^.]+$/.exec(Di && Di.keys && Di.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
})();
function gb(t) {
  return !!Ju && Ju in t;
}
var mb = Function.prototype, vb = mb.toString;
function te(t) {
  if (t != null) {
    try {
      return vb.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var _b = /[\\^$.*+?()[\]{}|]/g, yb = /^\[object .+?Constructor\]$/, wb = Function.prototype, bb = Object.prototype, xb = wb.toString, Ab = bb.hasOwnProperty, Sb = RegExp(
  "^" + xb.call(Ab).replace(_b, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Tb(t) {
  if (!_t(t) || gb(t))
    return !1;
  var e = Jo(t) ? Sb : yb;
  return e.test(te(t));
}
function $b(t, e) {
  return t?.[e];
}
function ee(t, e) {
  var n = $b(t, e);
  return Tb(n) ? n : void 0;
}
var so = ee($t, "WeakMap"), Ku = Object.create, Eb = /* @__PURE__ */ (function() {
  function t() {
  }
  return function(e) {
    if (!_t(e))
      return {};
    if (Ku)
      return Ku(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
})();
function Ob(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function Ib(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var zb = 800, Cb = 16, Nb = Date.now;
function Rb(t) {
  var e = 0, n = 0;
  return function() {
    var r = Nb(), i = Cb - (r - n);
    if (n = r, i > 0) {
      if (++e >= zb)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Pb(t) {
  return function() {
    return t;
  };
}
var jn = (function() {
  try {
    var t = ee(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
})(), Mb = jn ? function(t, e) {
  return jn(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Pb(e),
    writable: !0
  });
} : nr, Jl = Rb(Mb);
function kb(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
var Db = 9007199254740991, jb = /^(?:0|[1-9]\d*)$/;
function rr(t, e) {
  var n = typeof t;
  return e = e ?? Db, !!e && (n == "number" || n != "symbol" && jb.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Ko(t, e, n) {
  e == "__proto__" && jn ? jn(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function He(t, e) {
  return t === e || t !== t && e !== e;
}
var Zb = Object.prototype, Fb = Zb.hasOwnProperty;
function Qo(t, e, n) {
  var r = t[e];
  (!(Fb.call(t, e) && He(r, n)) || n === void 0 && !(e in t)) && Ko(t, e, n);
}
function Lb(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var a = e[o], u = void 0;
    u === void 0 && (u = t[a]), i ? Ko(n, a, u) : Qo(n, a, u);
  }
  return n;
}
var Qu = Math.max;
function Kl(t, e, n) {
  return e = Qu(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = Qu(r.length - e, 0), s = Array(o); ++i < o; )
      s[i] = r[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = r[i];
    return a[e] = n(s), Ob(t, this, a);
  };
}
function Ql(t, e) {
  return Jl(Kl(t, e, nr), t + "");
}
var Bb = 9007199254740991;
function ts(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Bb;
}
function be(t) {
  return t != null && ts(t.length) && !Jo(t);
}
function ao(t, e, n) {
  if (!_t(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? be(n) && rr(e, n.length) : r == "string" && e in n) ? He(n[e], t) : !1;
}
function qb(t) {
  return Ql(function(e, n) {
    var r = -1, i = n.length, o = i > 1 ? n[i - 1] : void 0, s = i > 2 ? n[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, s && ao(n[0], n[1], s) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++r < i; ) {
      var a = n[r];
      a && t(e, a, r, o);
    }
    return e;
  });
}
var Wb = Object.prototype;
function es(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || Wb;
  return t === n;
}
function Ub(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var Gb = "[object Arguments]";
function tc(t) {
  return St(t) && Qt(t) == Gb;
}
var tf = Object.prototype, Vb = tf.hasOwnProperty, Xb = tf.propertyIsEnumerable, Le = tc(/* @__PURE__ */ (function() {
  return arguments;
})()) ? tc : function(t) {
  return St(t) && Vb.call(t, "callee") && !Xb.call(t, "callee");
};
function Hb() {
  return !1;
}
var ef = typeof exports == "object" && exports && !exports.nodeType && exports, ec = ef && typeof module == "object" && module && !module.nodeType && module, Yb = ec && ec.exports === ef, nc = Yb ? $t.Buffer : void 0, Jb = nc ? nc.isBuffer : void 0, Be = Jb || Hb, Kb = "[object Arguments]", Qb = "[object Array]", tx = "[object Boolean]", ex = "[object Date]", nx = "[object Error]", rx = "[object Function]", ix = "[object Map]", ox = "[object Number]", sx = "[object Object]", ax = "[object RegExp]", ux = "[object Set]", cx = "[object String]", lx = "[object WeakMap]", fx = "[object ArrayBuffer]", hx = "[object DataView]", dx = "[object Float32Array]", px = "[object Float64Array]", gx = "[object Int8Array]", mx = "[object Int16Array]", vx = "[object Int32Array]", _x = "[object Uint8Array]", yx = "[object Uint8ClampedArray]", wx = "[object Uint16Array]", bx = "[object Uint32Array]", B = {};
B[dx] = B[px] = B[gx] = B[mx] = B[vx] = B[_x] = B[yx] = B[wx] = B[bx] = !0;
B[Kb] = B[Qb] = B[fx] = B[tx] = B[hx] = B[ex] = B[nx] = B[rx] = B[ix] = B[ox] = B[sx] = B[ax] = B[ux] = B[cx] = B[lx] = !1;
function xx(t) {
  return St(t) && ts(t.length) && !!B[Qt(t)];
}
function ir(t) {
  return function(e) {
    return t(e);
  };
}
var nf = typeof exports == "object" && exports && !exports.nodeType && exports, Ne = nf && typeof module == "object" && module && !module.nodeType && module, Ax = Ne && Ne.exports === nf, ji = Ax && Xl.process, me = (function() {
  try {
    var t = Ne && Ne.require && Ne.require("util").types;
    return t || ji && ji.binding && ji.binding("util");
  } catch {
  }
})(), rc = me && me.isTypedArray, ns = rc ? ir(rc) : xx, Sx = Object.prototype, Tx = Sx.hasOwnProperty;
function rf(t, e) {
  var n = rt(t), r = !n && Le(t), i = !n && !r && Be(t), o = !n && !r && !i && ns(t), s = n || r || i || o, a = s ? Ub(t.length, String) : [], u = a.length;
  for (var c in t)
    (e || Tx.call(t, c)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    rr(c, u))) && a.push(c);
  return a;
}
function of(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var $x = of(Object.keys, Object), Ex = Object.prototype, Ox = Ex.hasOwnProperty;
function Ix(t) {
  if (!es(t))
    return $x(t);
  var e = [];
  for (var n in Object(t))
    Ox.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function rs(t) {
  return be(t) ? rf(t) : Ix(t);
}
function zx(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var Cx = Object.prototype, Nx = Cx.hasOwnProperty;
function Rx(t) {
  if (!_t(t))
    return zx(t);
  var e = es(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Nx.call(t, r)) || n.push(r);
  return n;
}
function sf(t) {
  return be(t) ? rf(t, !0) : Rx(t);
}
var Px = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mx = /^\w*$/;
function is(t, e) {
  if (rt(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || ge(t) ? !0 : Mx.test(t) || !Px.test(t) || e != null && t in Object(e);
}
var qe = ee(Object, "create");
function kx() {
  this.__data__ = qe ? qe(null) : {}, this.size = 0;
}
function Dx(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var jx = "__lodash_hash_undefined__", Zx = Object.prototype, Fx = Zx.hasOwnProperty;
function Lx(t) {
  var e = this.__data__;
  if (qe) {
    var n = e[t];
    return n === jx ? void 0 : n;
  }
  return Fx.call(e, t) ? e[t] : void 0;
}
var Bx = Object.prototype, qx = Bx.hasOwnProperty;
function Wx(t) {
  var e = this.__data__;
  return qe ? e[t] !== void 0 : qx.call(e, t);
}
var Ux = "__lodash_hash_undefined__";
function Gx(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = qe && e === void 0 ? Ux : e, this;
}
function Vt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Vt.prototype.clear = kx;
Vt.prototype.delete = Dx;
Vt.prototype.get = Lx;
Vt.prototype.has = Wx;
Vt.prototype.set = Gx;
function Vx() {
  this.__data__ = [], this.size = 0;
}
function or(t, e) {
  for (var n = t.length; n--; )
    if (He(t[n][0], e))
      return n;
  return -1;
}
var Xx = Array.prototype, Hx = Xx.splice;
function Yx(t) {
  var e = this.__data__, n = or(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Hx.call(e, n, 1), --this.size, !0;
}
function Jx(t) {
  var e = this.__data__, n = or(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Kx(t) {
  return or(this.__data__, t) > -1;
}
function Qx(t, e) {
  var n = this.__data__, r = or(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Nt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Nt.prototype.clear = Vx;
Nt.prototype.delete = Yx;
Nt.prototype.get = Jx;
Nt.prototype.has = Kx;
Nt.prototype.set = Qx;
var We = ee($t, "Map");
function tA() {
  this.size = 0, this.__data__ = {
    hash: new Vt(),
    map: new (We || Nt)(),
    string: new Vt()
  };
}
function eA(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function sr(t, e) {
  var n = t.__data__;
  return eA(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function nA(t) {
  var e = sr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function rA(t) {
  return sr(this, t).get(t);
}
function iA(t) {
  return sr(this, t).has(t);
}
function oA(t, e) {
  var n = sr(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function Rt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Rt.prototype.clear = tA;
Rt.prototype.delete = nA;
Rt.prototype.get = rA;
Rt.prototype.has = iA;
Rt.prototype.set = oA;
var sA = "Expected a function";
function os(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(sA);
  var n = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], o = n.cache;
    if (o.has(i))
      return o.get(i);
    var s = t.apply(this, r);
    return n.cache = o.set(i, s) || o, s;
  };
  return n.cache = new (os.Cache || Rt)(), n;
}
os.Cache = Rt;
var aA = 500;
function uA(t) {
  var e = os(t, function(r) {
    return n.size === aA && n.clear(), r;
  }), n = e.cache;
  return e;
}
var cA = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, lA = /\\(\\)?/g, fA = uA(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(cA, function(n, r, i, o) {
    e.push(i ? o.replace(lA, "$1") : r || n);
  }), e;
});
function hA(t) {
  return t == null ? "" : Yl(t);
}
function ar(t, e) {
  return rt(t) ? t : is(t, e) ? [t] : fA(hA(t));
}
function Ye(t) {
  if (typeof t == "string" || ge(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function ur(t, e) {
  e = ar(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[Ye(e[n++])];
  return n && n == r ? t : void 0;
}
function dA(t, e, n) {
  var r = t == null ? void 0 : ur(t, e);
  return r === void 0 ? n : r;
}
function af(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var ic = lt ? lt.isConcatSpreadable : void 0;
function pA(t) {
  return rt(t) || Le(t) || !!(ic && t && t[ic]);
}
function uf(t, e, n, r, i) {
  var o = -1, s = t.length;
  for (n || (n = pA), i || (i = []); ++o < s; ) {
    var a = t[o];
    n(a) ? af(i, a) : i[i.length] = a;
  }
  return i;
}
function gA(t) {
  var e = t == null ? 0 : t.length;
  return e ? uf(t) : [];
}
function mA(t) {
  return Jl(Kl(t, void 0, gA), t + "");
}
var cf = of(Object.getPrototypeOf, Object), vA = "[object Object]", _A = Function.prototype, yA = Object.prototype, lf = _A.toString, wA = yA.hasOwnProperty, bA = lf.call(Object);
function xA(t) {
  if (!St(t) || Qt(t) != vA)
    return !1;
  var e = cf(t);
  if (e === null)
    return !0;
  var n = wA.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && lf.call(n) == bA;
}
function AA() {
  this.__data__ = new Nt(), this.size = 0;
}
function SA(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function TA(t) {
  return this.__data__.get(t);
}
function $A(t) {
  return this.__data__.has(t);
}
var EA = 200;
function OA(t, e) {
  var n = this.__data__;
  if (n instanceof Nt) {
    var r = n.__data__;
    if (!We || r.length < EA - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new Rt(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function mt(t) {
  var e = this.__data__ = new Nt(t);
  this.size = e.size;
}
mt.prototype.clear = AA;
mt.prototype.delete = SA;
mt.prototype.get = TA;
mt.prototype.has = $A;
mt.prototype.set = OA;
var ff = typeof exports == "object" && exports && !exports.nodeType && exports, oc = ff && typeof module == "object" && module && !module.nodeType && module, IA = oc && oc.exports === ff, sc = IA ? $t.Buffer : void 0, ac = sc ? sc.allocUnsafe : void 0;
function hf(t, e) {
  if (e)
    return t.slice();
  var n = t.length, r = ac ? ac(n) : new t.constructor(n);
  return t.copy(r), r;
}
function zA(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = 0, o = []; ++n < r; ) {
    var s = t[n];
    e(s, n, t) && (o[i++] = s);
  }
  return o;
}
function CA() {
  return [];
}
var NA = Object.prototype, RA = NA.propertyIsEnumerable, uc = Object.getOwnPropertySymbols, PA = uc ? function(t) {
  return t == null ? [] : (t = Object(t), zA(uc(t), function(e) {
    return RA.call(t, e);
  }));
} : CA;
function MA(t, e, n) {
  var r = e(t);
  return rt(t) ? r : af(r, n(t));
}
function uo(t) {
  return MA(t, rs, PA);
}
var co = ee($t, "DataView"), lo = ee($t, "Promise"), fo = ee($t, "Set"), cc = "[object Map]", kA = "[object Object]", lc = "[object Promise]", fc = "[object Set]", hc = "[object WeakMap]", dc = "[object DataView]", DA = te(co), jA = te(We), ZA = te(lo), FA = te(fo), LA = te(so), dt = Qt;
(co && dt(new co(new ArrayBuffer(1))) != dc || We && dt(new We()) != cc || lo && dt(lo.resolve()) != lc || fo && dt(new fo()) != fc || so && dt(new so()) != hc) && (dt = function(t) {
  var e = Qt(t), n = e == kA ? t.constructor : void 0, r = n ? te(n) : "";
  if (r)
    switch (r) {
      case DA:
        return dc;
      case jA:
        return cc;
      case ZA:
        return lc;
      case FA:
        return fc;
      case LA:
        return hc;
    }
  return e;
});
var BA = Object.prototype, qA = BA.hasOwnProperty;
function WA(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && qA.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var Zn = $t.Uint8Array;
function ss(t) {
  var e = new t.constructor(t.byteLength);
  return new Zn(e).set(new Zn(t)), e;
}
function UA(t, e) {
  var n = ss(t.buffer);
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var GA = /\w*$/;
function VA(t) {
  var e = new t.constructor(t.source, GA.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var pc = lt ? lt.prototype : void 0, gc = pc ? pc.valueOf : void 0;
function XA(t) {
  return gc ? Object(gc.call(t)) : {};
}
function df(t, e) {
  var n = e ? ss(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var HA = "[object Boolean]", YA = "[object Date]", JA = "[object Map]", KA = "[object Number]", QA = "[object RegExp]", tS = "[object Set]", eS = "[object String]", nS = "[object Symbol]", rS = "[object ArrayBuffer]", iS = "[object DataView]", oS = "[object Float32Array]", sS = "[object Float64Array]", aS = "[object Int8Array]", uS = "[object Int16Array]", cS = "[object Int32Array]", lS = "[object Uint8Array]", fS = "[object Uint8ClampedArray]", hS = "[object Uint16Array]", dS = "[object Uint32Array]";
function pS(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case rS:
      return ss(t);
    case HA:
    case YA:
      return new r(+t);
    case iS:
      return UA(t);
    case oS:
    case sS:
    case aS:
    case uS:
    case cS:
    case lS:
    case fS:
    case hS:
    case dS:
      return df(t, n);
    case JA:
      return new r();
    case KA:
    case eS:
      return new r(t);
    case QA:
      return VA(t);
    case tS:
      return new r();
    case nS:
      return XA(t);
  }
}
function pf(t) {
  return typeof t.constructor == "function" && !es(t) ? Eb(cf(t)) : {};
}
var gS = "[object Map]";
function mS(t) {
  return St(t) && dt(t) == gS;
}
var mc = me && me.isMap, vS = mc ? ir(mc) : mS, _S = "[object Set]";
function yS(t) {
  return St(t) && dt(t) == _S;
}
var vc = me && me.isSet, wS = vc ? ir(vc) : yS, bS = 1, gf = "[object Arguments]", xS = "[object Array]", AS = "[object Boolean]", SS = "[object Date]", TS = "[object Error]", mf = "[object Function]", $S = "[object GeneratorFunction]", ES = "[object Map]", OS = "[object Number]", vf = "[object Object]", IS = "[object RegExp]", zS = "[object Set]", CS = "[object String]", NS = "[object Symbol]", RS = "[object WeakMap]", PS = "[object ArrayBuffer]", MS = "[object DataView]", kS = "[object Float32Array]", DS = "[object Float64Array]", jS = "[object Int8Array]", ZS = "[object Int16Array]", FS = "[object Int32Array]", LS = "[object Uint8Array]", BS = "[object Uint8ClampedArray]", qS = "[object Uint16Array]", WS = "[object Uint32Array]", L = {};
L[gf] = L[xS] = L[PS] = L[MS] = L[AS] = L[SS] = L[kS] = L[DS] = L[jS] = L[ZS] = L[FS] = L[ES] = L[OS] = L[vf] = L[IS] = L[zS] = L[CS] = L[NS] = L[LS] = L[BS] = L[qS] = L[WS] = !0;
L[TS] = L[mf] = L[RS] = !1;
function Sn(t, e, n, r, i, o) {
  var s, a = e & bS;
  if (s !== void 0)
    return s;
  if (!_t(t))
    return t;
  var u = rt(t);
  if (u)
    s = WA(t);
  else {
    var c = dt(t), l = c == mf || c == $S;
    if (Be(t))
      return hf(t, a);
    if (c == vf || c == gf || l && !i)
      s = l ? {} : pf(t);
    else {
      if (!L[c])
        return i ? t : {};
      s = pS(t, c, a);
    }
  }
  o || (o = new mt());
  var f = o.get(t);
  if (f)
    return f;
  o.set(t, s), wS(t) ? t.forEach(function(m) {
    s.add(Sn(m, e, n, m, t, o));
  }) : vS(t) && t.forEach(function(m, g) {
    s.set(g, Sn(m, e, n, g, t, o));
  });
  var h = uo, d = u ? void 0 : h(t);
  return kb(d || t, function(m, g) {
    d && (g = m, m = t[g]), Qo(s, g, Sn(m, e, n, g, t, o));
  }), s;
}
var US = 1, GS = 4;
function ut(t) {
  return Sn(t, US | GS);
}
var VS = "__lodash_hash_undefined__";
function XS(t) {
  return this.__data__.set(t, VS), this;
}
function HS(t) {
  return this.__data__.has(t);
}
function Fn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new Rt(); ++e < n; )
    this.add(t[e]);
}
Fn.prototype.add = Fn.prototype.push = XS;
Fn.prototype.has = HS;
function YS(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function JS(t, e) {
  return t.has(e);
}
var KS = 1, QS = 2;
function _f(t, e, n, r, i, o) {
  var s = n & KS, a = t.length, u = e.length;
  if (a != u && !(s && u > a))
    return !1;
  var c = o.get(t), l = o.get(e);
  if (c && l)
    return c == e && l == t;
  var f = -1, h = !0, d = n & QS ? new Fn() : void 0;
  for (o.set(t, e), o.set(e, t); ++f < a; ) {
    var m = t[f], g = e[f];
    if (r)
      var y = s ? r(g, m, f, e, t, o) : r(m, g, f, t, e, o);
    if (y !== void 0) {
      if (y)
        continue;
      h = !1;
      break;
    }
    if (d) {
      if (!YS(e, function(_, w) {
        if (!JS(d, w) && (m === _ || i(m, _, n, r, o)))
          return d.push(w);
      })) {
        h = !1;
        break;
      }
    } else if (!(m === g || i(m, g, n, r, o))) {
      h = !1;
      break;
    }
  }
  return o.delete(t), o.delete(e), h;
}
function t1(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, i) {
    n[++e] = [i, r];
  }), n;
}
function e1(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var n1 = 1, r1 = 2, i1 = "[object Boolean]", o1 = "[object Date]", s1 = "[object Error]", a1 = "[object Map]", u1 = "[object Number]", c1 = "[object RegExp]", l1 = "[object Set]", f1 = "[object String]", h1 = "[object Symbol]", d1 = "[object ArrayBuffer]", p1 = "[object DataView]", _c = lt ? lt.prototype : void 0, Zi = _c ? _c.valueOf : void 0;
function g1(t, e, n, r, i, o, s) {
  switch (n) {
    case p1:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case d1:
      return !(t.byteLength != e.byteLength || !o(new Zn(t), new Zn(e)));
    case i1:
    case o1:
    case u1:
      return He(+t, +e);
    case s1:
      return t.name == e.name && t.message == e.message;
    case c1:
    case f1:
      return t == e + "";
    case a1:
      var a = t1;
    case l1:
      var u = r & n1;
      if (a || (a = e1), t.size != e.size && !u)
        return !1;
      var c = s.get(t);
      if (c)
        return c == e;
      r |= r1, s.set(t, e);
      var l = _f(a(t), a(e), r, i, o, s);
      return s.delete(t), l;
    case h1:
      if (Zi)
        return Zi.call(t) == Zi.call(e);
  }
  return !1;
}
var m1 = 1, v1 = Object.prototype, _1 = v1.hasOwnProperty;
function y1(t, e, n, r, i, o) {
  var s = n & m1, a = uo(t), u = a.length, c = uo(e), l = c.length;
  if (u != l && !s)
    return !1;
  for (var f = u; f--; ) {
    var h = a[f];
    if (!(s ? h in e : _1.call(e, h)))
      return !1;
  }
  var d = o.get(t), m = o.get(e);
  if (d && m)
    return d == e && m == t;
  var g = !0;
  o.set(t, e), o.set(e, t);
  for (var y = s; ++f < u; ) {
    h = a[f];
    var _ = t[h], w = e[h];
    if (r)
      var b = s ? r(w, _, h, e, t, o) : r(_, w, h, t, e, o);
    if (!(b === void 0 ? _ === w || i(_, w, n, r, o) : b)) {
      g = !1;
      break;
    }
    y || (y = h == "constructor");
  }
  if (g && !y) {
    var p = t.constructor, x = e.constructor;
    p != x && "constructor" in t && "constructor" in e && !(typeof p == "function" && p instanceof p && typeof x == "function" && x instanceof x) && (g = !1);
  }
  return o.delete(t), o.delete(e), g;
}
var w1 = 1, yc = "[object Arguments]", wc = "[object Array]", cn = "[object Object]", b1 = Object.prototype, bc = b1.hasOwnProperty;
function x1(t, e, n, r, i, o) {
  var s = rt(t), a = rt(e), u = s ? wc : dt(t), c = a ? wc : dt(e);
  u = u == yc ? cn : u, c = c == yc ? cn : c;
  var l = u == cn, f = c == cn, h = u == c;
  if (h && Be(t)) {
    if (!Be(e))
      return !1;
    s = !0, l = !1;
  }
  if (h && !l)
    return o || (o = new mt()), s || ns(t) ? _f(t, e, n, r, i, o) : g1(t, e, u, n, r, i, o);
  if (!(n & w1)) {
    var d = l && bc.call(t, "__wrapped__"), m = f && bc.call(e, "__wrapped__");
    if (d || m) {
      var g = d ? t.value() : t, y = m ? e.value() : e;
      return o || (o = new mt()), i(g, y, n, r, o);
    }
  }
  return h ? (o || (o = new mt()), y1(t, e, n, r, i, o)) : !1;
}
function as(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !St(t) && !St(e) ? t !== t && e !== e : x1(t, e, n, r, as, i);
}
var A1 = 1, S1 = 2;
function T1(t, e, n, r) {
  var i = n.length, o = i;
  if (t == null)
    return !o;
  for (t = Object(t); i--; ) {
    var s = n[i];
    if (s[2] ? s[1] !== t[s[0]] : !(s[0] in t))
      return !1;
  }
  for (; ++i < o; ) {
    s = n[i];
    var a = s[0], u = t[a], c = s[1];
    if (s[2]) {
      if (u === void 0 && !(a in t))
        return !1;
    } else {
      var l = new mt(), f;
      if (!(f === void 0 ? as(c, u, A1 | S1, r, l) : f))
        return !1;
    }
  }
  return !0;
}
function yf(t) {
  return t === t && !_t(t);
}
function $1(t) {
  for (var e = rs(t), n = e.length; n--; ) {
    var r = e[n], i = t[r];
    e[n] = [r, i, yf(i)];
  }
  return e;
}
function wf(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
function E1(t) {
  var e = $1(t);
  return e.length == 1 && e[0][2] ? wf(e[0][0], e[0][1]) : function(n) {
    return n === t || T1(n, t, e);
  };
}
function O1(t, e) {
  return t != null && e in Object(t);
}
function I1(t, e, n) {
  e = ar(e, t);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var s = Ye(e[r]);
    if (!(o = t != null && n(t, s)))
      break;
    t = t[s];
  }
  return o || ++r != i ? o : (i = t == null ? 0 : t.length, !!i && ts(i) && rr(s, i) && (rt(t) || Le(t)));
}
function bf(t, e) {
  return t != null && I1(t, e, O1);
}
var z1 = 1, C1 = 2;
function N1(t, e) {
  return is(t) && yf(e) ? wf(Ye(t), e) : function(n) {
    var r = dA(n, t);
    return r === void 0 && r === e ? bf(n, t) : as(e, r, z1 | C1);
  };
}
function R1(t) {
  return function(e) {
    return e?.[t];
  };
}
function P1(t) {
  return function(e) {
    return ur(e, t);
  };
}
function M1(t) {
  return is(t) ? R1(Ye(t)) : P1(t);
}
function xf(t) {
  return typeof t == "function" ? t : t == null ? nr : typeof t == "object" ? rt(t) ? N1(t[0], t[1]) : E1(t) : M1(t);
}
function k1(t) {
  return function(e, n, r) {
    for (var i = -1, o = Object(e), s = r(e), a = s.length; a--; ) {
      var u = s[++i];
      if (n(o[u], u, o) === !1)
        break;
    }
    return e;
  };
}
var Af = k1();
function D1(t, e) {
  return t && Af(t, e, rs);
}
function j1(t, e) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!be(n))
      return t(n, r);
    for (var i = n.length, o = -1, s = Object(n); ++o < i && r(s[o], o, s) !== !1; )
      ;
    return n;
  };
}
var Z1 = j1(D1);
function ho(t, e, n) {
  (n !== void 0 && !He(t[e], n) || n === void 0 && !(e in t)) && Ko(t, e, n);
}
function F1(t) {
  return St(t) && be(t);
}
function po(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function L1(t) {
  return Lb(t, sf(t));
}
function B1(t, e, n, r, i, o, s) {
  var a = po(t, n), u = po(e, n), c = s.get(u);
  if (c) {
    ho(t, n, c);
    return;
  }
  var l = o ? o(a, u, n + "", t, e, s) : void 0, f = l === void 0;
  if (f) {
    var h = rt(u), d = !h && Be(u), m = !h && !d && ns(u);
    l = u, h || d || m ? rt(a) ? l = a : F1(a) ? l = Ib(a) : d ? (f = !1, l = hf(u, !0)) : m ? (f = !1, l = df(u, !0)) : l = [] : xA(u) || Le(u) ? (l = a, Le(a) ? l = L1(a) : (!_t(a) || Jo(a)) && (l = pf(u))) : f = !1;
  }
  f && (s.set(u, l), i(l, u, r, o, s), s.delete(u)), ho(t, n, l);
}
function Sf(t, e, n, r, i) {
  t !== e && Af(e, function(o, s) {
    if (i || (i = new mt()), _t(o))
      B1(t, e, s, n, Sf, r, i);
    else {
      var a = r ? r(po(t, s), o, s + "", t, e, i) : void 0;
      a === void 0 && (a = o), ho(t, s, a);
    }
  }, sf);
}
function q1(t, e) {
  var n = -1, r = be(t) ? Array(t.length) : [];
  return Z1(t, function(i, o, s) {
    r[++n] = e(i, o, s);
  }), r;
}
function W1(t, e) {
  return t > e;
}
function U1(t, e, n) {
  for (var r = -1, i = t.length; ++r < i; ) {
    var o = t[r], s = e(o);
    if (s != null && (a === void 0 ? s === s && !ge(s) : n(s, a)))
      var a = s, u = o;
  }
  return u;
}
function Tn(t, e) {
  return t && t.length ? U1(t, xf(e), W1) : void 0;
}
var zt = qb(function(t, e, n) {
  Sf(t, e, n);
});
function G1(t, e, n, r) {
  if (!_t(t))
    return t;
  e = ar(e, t);
  for (var i = -1, o = e.length, s = o - 1, a = t; a != null && ++i < o; ) {
    var u = Ye(e[i]), c = n;
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      return t;
    if (i != s) {
      var l = a[u];
      c = void 0, c === void 0 && (c = _t(l) ? l : rr(e[i + 1]) ? [] : {});
    }
    Qo(a, u, c), a = a[u];
  }
  return t;
}
function V1(t, e, n) {
  for (var r = -1, i = e.length, o = {}; ++r < i; ) {
    var s = e[r], a = ur(t, s);
    n(a, s) && G1(o, ar(s, t), a);
  }
  return o;
}
function X1(t, e) {
  var n = t.length;
  for (t.sort(e); n--; )
    t[n] = t[n].value;
  return t;
}
function H1(t, e) {
  if (t !== e) {
    var n = t !== void 0, r = t === null, i = t === t, o = ge(t), s = e !== void 0, a = e === null, u = e === e, c = ge(e);
    if (!a && !c && !o && t > e || o && s && u && !a && !c || r && s && u || !n && u || !i)
      return 1;
    if (!r && !o && !c && t < e || c && n && i && !r && !o || a && n && i || !s && i || !u)
      return -1;
  }
  return 0;
}
function Y1(t, e, n) {
  for (var r = -1, i = t.criteria, o = e.criteria, s = i.length, a = n.length; ++r < s; ) {
    var u = H1(i[r], o[r]);
    if (u) {
      if (r >= a)
        return u;
      var c = n[r];
      return u * (c == "desc" ? -1 : 1);
    }
  }
  return t.index - e.index;
}
function J1(t, e, n) {
  e.length ? e = An(e, function(o) {
    return rt(o) ? function(s) {
      return ur(s, o.length === 1 ? o[0] : o);
    } : o;
  }) : e = [nr];
  var r = -1;
  e = An(e, ir(xf));
  var i = q1(t, function(o, s, a) {
    var u = An(e, function(c) {
      return c(o);
    });
    return { criteria: u, index: ++r, value: o };
  });
  return X1(i, function(o, s) {
    return Y1(o, s, n);
  });
}
function K1(t, e) {
  return V1(t, e, function(n, r) {
    return bf(t, r);
  });
}
var us = mA(function(t, e) {
  return t == null ? {} : K1(t, e);
}), Q1 = Ql(function(t, e) {
  if (t == null)
    return [];
  var n = e.length;
  return n > 1 && ao(t, e[0], e[1]) ? e = [] : n > 2 && ao(e[0], e[1], e[2]) && (e = [e[0]]), J1(t, uf(e), []);
});
const K = [];
for (let t = 0; t < 256; ++t)
  K.push((t + 256).toString(16).slice(1));
function tT(t, e = 0) {
  return (K[t[e + 0]] + K[t[e + 1]] + K[t[e + 2]] + K[t[e + 3]] + "-" + K[t[e + 4]] + K[t[e + 5]] + "-" + K[t[e + 6]] + K[t[e + 7]] + "-" + K[t[e + 8]] + K[t[e + 9]] + "-" + K[t[e + 10]] + K[t[e + 11]] + K[t[e + 12]] + K[t[e + 13]] + K[t[e + 14]] + K[t[e + 15]]).toLowerCase();
}
let Fi;
const eT = new Uint8Array(16);
function nT() {
  if (!Fi) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Fi = crypto.getRandomValues.bind(crypto);
  }
  return Fi(eT);
}
const rT = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), xc = { randomUUID: rT };
function iT(t, e, n) {
  t = t || {};
  const r = t.random ?? t.rng?.() ?? nT();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    if (n = n || 0, n < 0 || n + 16 > e.length)
      throw new RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
    for (let i = 0; i < 16; ++i)
      e[n + i] = r[i];
    return e;
  }
  return tT(r);
}
function cr(t, e, n) {
  return xc.randomUUID && !e && !t ? xc.randomUUID() : iT(t, e, n);
}
const cs = {
  backgroundColor: "#ff3b3b",
  backgroundOpacity: 0.3,
  borderColor: "#ff3b3b",
  borderOpacity: 0.6,
  borderWidth: 2,
  borderRadius: 6,
  // Only for tags
  tagTextColor: "#000000",
  tagBackgroundColor: "#ffffff",
  tagBackgroundOpacity: 0.1,
  tagBorderColor: "#ff3b3b",
  tagBorderOpacity: 0.6,
  tagBorderWidth: 1,
  // only for gutter annotations for now
  gutterGap: 6,
  gutterWidth: 3
}, oT = {
  borderWidth: 2,
  backgroundColor: "#cccccc",
  borderColor: "#cccccc",
  borderOpacity: 0.9
}, sT = {
  backgroundColor: "#ff3b3b",
  borderColor: "#ff3b3b",
  borderOpacity: 0.9,
  borderWidth: 2
}, aT = {
  backgroundOpacity: 0.8,
  borderOpacity: 0.9,
  borderWidth: 2
}, Ac = {
  default: cs,
  hover: oT,
  active: aT,
  edit: sT
}, uT = Y((t) => {
  const e = parseInt(t.slice(1), 16), n = e >> 16 & 255, r = e >> 8 & 255, i = e & 255;
  return `${n},${r},${i}`;
}), cT = Y((t, e) => t === "transparent" ? "transparent" : `rgba(${uT(t)},${e})`), lT = (...t) => {
  const e = (r) => {
    for (const i of t) {
      const o = i?.[r];
      if (o !== void 0)
        return o;
    }
    throw new Error(`value not found ${r}`);
  };
  return { generateColor: (r, i) => {
    const o = e(r), s = e(i);
    return cT(o, s ?? 1);
  }, getValue: e };
}, ln = (t, e) => {
  const n = (r) => {
    const i = lT(
      e?.[r] ?? {},
      t?.[r] ?? {},
      Ac[r] ?? {},
      Ac.default ?? {}
    );
    return {
      backgroundColor: i.generateColor(
        "backgroundColor",
        "backgroundOpacity"
      ),
      borderColor: i.generateColor("borderColor", "borderOpacity"),
      borderWidth: i.getValue("borderWidth"),
      borderRadius: i.getValue("borderRadius"),
      // gutter
      gutterWidth: i.getValue("gutterWidth"),
      gutterGap: i.getValue("gutterGap"),
      // Tag
      tagTextColor: i.getValue("tagTextColor"),
      tagBackgroundColor: i.generateColor(
        "tagBackgroundColor",
        "tagBackgroundOpacity"
      ),
      tagBorderColor: i.generateColor(
        "tagBorderColor",
        "tagBorderOpacity"
      ),
      tagBorderWidth: i.getValue("tagBorderWidth")
    };
  };
  return {
    default: n("default"),
    edit: n("edit"),
    hover: n("hover"),
    active: n("active")
  };
}, $n = "DEFAULT", Tf = {
  styleFn: (t) => null,
  defaultStyle: $n
};
class at {
  /**
   * @param annotationModule - The module providing dependency injection for this service
   */
  constructor(e) {
    this.annotationModule = e, this.eventListener = this.inject(zo), this.internalEventListener = this.inject(Jn);
  }
  /**
   * Inject a dependency from the annotation module's container.
   * Use this to access other services registered with the module.
   *
   * @param token - The token identifying the service to inject
   * @returns The service instance
   */
  inject(e) {
    return this.annotationModule.inject(e);
  }
  getSnapper() {
    return this.annotationModule.getSnapper();
  }
  /** Adapter for accessing text content and styling */
  get textAdapter() {
    return this.annotationModule.getTextAdapter();
  }
  /** Adapter for accessing and modifying annotation data */
  get annotationAdapter() {
    return this.annotationModule.getAnnotationAdapter();
  }
}
class ot extends at {
  constructor(e) {
    super(e), this.styleParams = Tf, this.origStyleMap = /* @__PURE__ */ new Map();
  }
  /**
   * Registers a named style that can be referenced by the style function.
   *
   * When `styleFn` returns a string matching a registered name,
   * the corresponding style will be used for the annotation.
   * The style is stored in `origStyleMap` and immediately propagated
   * to all current render instances.
   *
   * @param name - The unique identifier for this style
   * @param style - The style configuration to associate with this name
   *
   * @example
   * ```ts
   * styles.registerStyle('error', {
   *   default: { backgroundColor: '#f44336', borderColor: '#f44336' },
   *   hover: { borderColor: '#d32f2f' },
   * });
   *
   * styles.registerStyle('warning', {
   *   default: { backgroundColor: '#ff9800', borderColor: '#ff9800' },
   * });
   * ```
   */
  registerStyle(e, n) {
    this.origStyleMap.set(e, n), this.annotationModule.getAllRenderInstances().forEach((r) => {
      r.annotationRenderStyle.registerStyle(e, n);
    });
  }
  /**
   * Propagates the current defaultStyleName, styleFn, and all registered styles
   * to every render instance returned by `annotationModule.getAllRenderInstances()`.
   *
   * Call this after adding new render instances to ensure they receive
   * the full style configuration.
   */
  updateAllStyles() {
    this.annotationModule.getAllRenderInstances().forEach((e) => {
      e.annotationRenderStyle.setDefaultStyleName(
        this.styleParams.defaultStyle
      ), e.annotationRenderStyle.setStyleFn(this.styleParams.styleFn);
      for (const [n, r] of this.origStyleMap.entries())
        e.annotationRenderStyle.registerStyle(n, r);
    });
  }
  /**
   * Merges the given params into the current style params and
   * propagates the updated configuration to all render instances.
   *
   * @param params - Partial style params to merge (styleFn, defaultStyle)
   */
  setParams(e) {
    this.styleParams = zt(this.styleParams, e), this.updateAllStyles();
  }
}
const fT = (t, e) => {
  const n = /* @__PURE__ */ new Map();
  e.forEach((i) => {
    const o = i._render.lines ?? [], s = o.length;
    o.forEach((a, u) => {
      const c = n.get(a.uuid) ?? [];
      c.push({ annotation: i, height: s, index: u }), n.set(a.uuid, c);
    });
  });
  let r = 0;
  return t.forEach((i) => {
    if (!n.has(i.uuid))
      return;
    const o = Q1(
      n.get(i.uuid),
      (a) => -a.height
    ), s = o.map((a) => a.annotation._render.weight).filter((a) => a !== void 0);
    o.forEach((a) => {
      if (a.index > 0) {
        !a.annotation._render.weight === void 0 && console.warn("no weight for annotation", a.annotation);
        return;
      }
      if (a.annotation._render.weight !== void 0) {
        console.warn(
          "!!! weight for annotation already set?",
          a.annotation
        );
        return;
      }
      let u = 0;
      for (; a.annotation._render.weight === void 0; )
        s.includes(u) ? u++ : (s.push(u), a.annotation._render.weight = u), r < u && (r = u);
    });
  }), r;
};
function $f(t, e, n = 0, r = t.length - 1, i = hT) {
  for (; r > n; ) {
    if (r - n > 600) {
      const u = r - n + 1, c = e - n + 1, l = Math.log(u), f = 0.5 * Math.exp(2 * l / 3), h = 0.5 * Math.sqrt(l * f * (u - f) / u) * (c - u / 2 < 0 ? -1 : 1), d = Math.max(n, Math.floor(e - c * f / u + h)), m = Math.min(r, Math.floor(e + (u - c) * f / u + h));
      $f(t, e, d, m, i);
    }
    const o = t[e];
    let s = n, a = r;
    for (Te(t, n, e), i(t[r], o) > 0 && Te(t, n, r); s < a; ) {
      for (Te(t, s, a), s++, a--; i(t[s], o) < 0; ) s++;
      for (; i(t[a], o) > 0; ) a--;
    }
    i(t[n], o) === 0 ? Te(t, n, a) : (a++, Te(t, a, r)), a <= e && (n = a + 1), e <= a && (r = a - 1);
  }
}
function Te(t, e, n) {
  const r = t[e];
  t[e] = t[n], t[n] = r;
}
function hT(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
class ls {
  constructor(e = 9) {
    this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let n = this.data;
    const r = [];
    if (!hn(e, n)) return r;
    const i = this.toBBox, o = [];
    for (; n; ) {
      for (let s = 0; s < n.children.length; s++) {
        const a = n.children[s], u = n.leaf ? i(a) : a;
        hn(e, u) && (n.leaf ? r.push(a) : Bi(e, u) ? this._all(a, r) : o.push(a));
      }
      n = o.pop();
    }
    return r;
  }
  collides(e) {
    let n = this.data;
    if (!hn(e, n)) return !1;
    const r = [];
    for (; n; ) {
      for (let i = 0; i < n.children.length; i++) {
        const o = n.children[i], s = n.leaf ? this.toBBox(o) : o;
        if (hn(e, s)) {
          if (n.leaf || Bi(e, s)) return !0;
          r.push(o);
        }
      }
      n = r.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length)) return this;
    if (e.length < this._minEntries) {
      for (let r = 0; r < e.length; r++)
        this.insert(e[r]);
      return this;
    }
    let n = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const r = this.data;
        this.data = n, n = r;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return this.data = ie([]), this;
  }
  remove(e, n) {
    if (!e) return this;
    let r = this.data;
    const i = this.toBBox(e), o = [], s = [];
    let a, u, c;
    for (; r || o.length; ) {
      if (r || (r = o.pop(), u = o[o.length - 1], a = s.pop(), c = !0), r.leaf) {
        const l = dT(e, r.children, n);
        if (l !== -1)
          return r.children.splice(l, 1), o.push(r), this._condense(o), this;
      }
      !c && !r.leaf && Bi(r, i) ? (o.push(r), s.push(a), a = 0, u = r, r = r.children[0]) : u ? (a++, r = u.children[a], c = !1) : r = null;
    }
    return this;
  }
  toBBox(e) {
    return e;
  }
  compareMinX(e, n) {
    return e.minX - n.minX;
  }
  compareMinY(e, n) {
    return e.minY - n.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(e) {
    return this.data = e, this;
  }
  _all(e, n) {
    const r = [];
    for (; e; )
      e.leaf ? n.push(...e.children) : r.push(...e.children), e = r.pop();
    return n;
  }
  _build(e, n, r, i) {
    const o = r - n + 1;
    let s = this._maxEntries, a;
    if (o <= s)
      return a = ie(e.slice(n, r + 1)), re(a, this.toBBox), a;
    i || (i = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / Math.pow(s, i - 1))), a = ie([]), a.leaf = !1, a.height = i;
    const u = Math.ceil(o / s), c = u * Math.ceil(Math.sqrt(s));
    Sc(e, n, r, c, this.compareMinX);
    for (let l = n; l <= r; l += c) {
      const f = Math.min(l + c - 1, r);
      Sc(e, l, f, u, this.compareMinY);
      for (let h = l; h <= f; h += u) {
        const d = Math.min(h + u - 1, f);
        a.children.push(this._build(e, h, d, i - 1));
      }
    }
    return re(a, this.toBBox), a;
  }
  _chooseSubtree(e, n, r, i) {
    for (; i.push(n), !(n.leaf || i.length - 1 === r); ) {
      let o = 1 / 0, s = 1 / 0, a;
      for (let u = 0; u < n.children.length; u++) {
        const c = n.children[u], l = Li(c), f = mT(e, c) - l;
        f < s ? (s = f, o = l < o ? l : o, a = c) : f === s && l < o && (o = l, a = c);
      }
      n = a || n.children[0];
    }
    return n;
  }
  _insert(e, n, r) {
    const i = r ? e : this.toBBox(e), o = [], s = this._chooseSubtree(i, this.data, n, o);
    for (s.children.push(e), Ce(s, i); n >= 0 && o[n].children.length > this._maxEntries; )
      this._split(o, n), n--;
    this._adjustParentBBoxes(i, o, n);
  }
  // split overflowed node into two
  _split(e, n) {
    const r = e[n], i = r.children.length, o = this._minEntries;
    this._chooseSplitAxis(r, o, i);
    const s = this._chooseSplitIndex(r, o, i), a = ie(r.children.splice(s, r.children.length - s));
    a.height = r.height, a.leaf = r.leaf, re(r, this.toBBox), re(a, this.toBBox), n ? e[n - 1].children.push(a) : this._splitRoot(r, a);
  }
  _splitRoot(e, n) {
    this.data = ie([e, n]), this.data.height = e.height + 1, this.data.leaf = !1, re(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, n, r) {
    let i, o = 1 / 0, s = 1 / 0;
    for (let a = n; a <= r - n; a++) {
      const u = ze(e, 0, a, this.toBBox), c = ze(e, a, r, this.toBBox), l = vT(u, c), f = Li(u) + Li(c);
      l < o ? (o = l, i = a, s = f < s ? f : s) : l === o && f < s && (s = f, i = a);
    }
    return i || r - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(e, n, r) {
    const i = e.leaf ? this.compareMinX : pT, o = e.leaf ? this.compareMinY : gT, s = this._allDistMargin(e, n, r, i), a = this._allDistMargin(e, n, r, o);
    s < a && e.children.sort(i);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(e, n, r, i) {
    e.children.sort(i);
    const o = this.toBBox, s = ze(e, 0, n, o), a = ze(e, r - n, r, o);
    let u = fn(s) + fn(a);
    for (let c = n; c < r - n; c++) {
      const l = e.children[c];
      Ce(s, e.leaf ? o(l) : l), u += fn(s);
    }
    for (let c = r - n - 1; c >= n; c--) {
      const l = e.children[c];
      Ce(a, e.leaf ? o(l) : l), u += fn(a);
    }
    return u;
  }
  _adjustParentBBoxes(e, n, r) {
    for (let i = r; i >= 0; i--)
      Ce(n[i], e);
  }
  _condense(e) {
    for (let n = e.length - 1, r; n >= 0; n--)
      e[n].children.length === 0 ? n > 0 ? (r = e[n - 1].children, r.splice(r.indexOf(e[n]), 1)) : this.clear() : re(e[n], this.toBBox);
  }
}
function dT(t, e, n) {
  if (!n) return e.indexOf(t);
  for (let r = 0; r < e.length; r++)
    if (n(t, e[r])) return r;
  return -1;
}
function re(t, e) {
  ze(t, 0, t.children.length, e, t);
}
function ze(t, e, n, r, i) {
  i || (i = ie(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
  for (let o = e; o < n; o++) {
    const s = t.children[o];
    Ce(i, t.leaf ? r(s) : s);
  }
  return i;
}
function Ce(t, e) {
  return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t;
}
function pT(t, e) {
  return t.minX - e.minX;
}
function gT(t, e) {
  return t.minY - e.minY;
}
function Li(t) {
  return (t.maxX - t.minX) * (t.maxY - t.minY);
}
function fn(t) {
  return t.maxX - t.minX + (t.maxY - t.minY);
}
function mT(t, e) {
  return (Math.max(e.maxX, t.maxX) - Math.min(e.minX, t.minX)) * (Math.max(e.maxY, t.maxY) - Math.min(e.minY, t.minY));
}
function vT(t, e) {
  const n = Math.max(t.minX, e.minX), r = Math.max(t.minY, e.minY), i = Math.min(t.maxX, e.maxX), o = Math.min(t.maxY, e.maxY);
  return Math.max(0, i - n) * Math.max(0, o - r);
}
function Bi(t, e) {
  return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY;
}
function hn(t, e) {
  return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY;
}
function ie(t) {
  return {
    children: t,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function Sc(t, e, n, r, i) {
  const o = [e, n];
  for (; o.length; ) {
    if (n = o.pop(), e = o.pop(), n - e <= r) continue;
    const s = e + Math.ceil((n - e) / r / 2) * r;
    $f(t, s, e, n, i), o.push(e, s, s, n);
  }
}
class fs {
  static init(e) {
    return new fs(e);
  }
  constructor(e) {
    this.tree = new ls(), this.annotationById = /* @__PURE__ */ new Map();
    const n = e.map(
      (r) => (this.annotationById.set(r.id, r), this.toRBushItem(r))
    );
    this.tree.load(n);
  }
  /**
   * Convert annotation to RBush item.
   * We use a 1D approach: minX=start, maxX=end, minY=0, maxY=0
   *
   * Important: RBush uses inclusive bounds, but our overlap logic is:
   * a.start < b.end && b.start < a.end (exclusive at boundaries)
   *
   * To handle this, we shrink the search box slightly to exclude exact boundary matches.
   */
  toRBushItem(e) {
    return {
      minX: e.start,
      maxX: e.end,
      minY: 0,
      maxY: 0,
      annotation: e
    };
  }
  /**
   * Check if two annotations truly overlap (exclusive boundaries).
   * a.start < b.end && b.start < a.end
   */
  overlaps(e, n) {
    return e.start < n.end && n.start < e.end;
  }
  findCandidates(e) {
    return e.start === e.end ? [] : this.tree.search({
      minX: e.start,
      maxX: e.end,
      minY: 0,
      maxY: 0
    });
  }
  isMatchingCandidate(e, n) {
    return e.annotation.id !== n.id && this.overlaps(n, e.annotation);
  }
  /**
   * Get all annotations that overlap with the given annotation.
   * Excludes the annotation itself (by id).
   * Time complexity: O(log n + k) where k is the number of results
   */
  getOverlaps(e) {
    return this.findCandidates(e).filter((n) => this.isMatchingCandidate(n, e)).map((n) => n.annotation);
  }
  /**
   * Check if a query annotation overlaps with any stored annotation.
   * Excludes the annotation itself (by id).
   */
  hasOverlap(e) {
    return this.findCandidates(e).some(
      (n) => this.isMatchingCandidate(n, e)
    );
  }
}
const _T = (t, e, n = !0) => {
  if (t.start === e.start) {
    const r = n ? -1 : 1, i = n ? 1 : -1;
    return e.end < t.end ? r : i;
  }
  return t.start < e.start ? -1 : 1;
};
class hs {
  constructor(e, n) {
    this.annotations = e, this.annotationRenders = n, this.totalMaxWeight = 0, this.annotationOverlap = fs.init(e), e.forEach((i) => {
      i._render.weight = null;
    });
    const r = this.assignWeights();
    this.renderWeights = r.renderWeights, this.renderOrder = r.renderOrders, this.calculateBasedOnRenderOrder();
  }
  static calculate(e, n) {
    return new hs(e, n);
  }
  assignWeights() {
    const e = /* @__PURE__ */ new Map(), n = {};
    e.set(0, []), this.annotationRenders.forEach((i) => {
      n[i.name] = i.weightOrder, e.set(i.weightOrder, []);
    }), this.annotations.forEach((i) => {
      const o = n[i._render.render] ?? 0;
      e.get(o)?.push(i), i._render.lines.forEach((s) => this.resetLineMaxWeight(s));
    });
    const r = [];
    for (const [i, o] of e.entries())
      o.length > 0 && r.push(i);
    return { renderOrders: r, renderWeights: e };
  }
  calculateBasedOnRenderOrder() {
    this.renderOrder.forEach((e, n) => {
      this.calculateAnnotationArray(this.renderWeights.get(e), n);
    });
  }
  calculateAnnotationArray(e, n) {
    e.sort(_T).forEach((i) => {
      let o = 0;
      if (this.annotationOverlap.hasOverlap(i)) {
        const s = this.annotationOverlap.getOverlaps(i);
        o = (Tn(s, (u) => u._render.weight)?._render.weight ?? n - 1) + 1;
      }
      i._render.weight = o, this.setTotalMaxWeight(o), i._render.lines.forEach(
        (s) => this.setMaxWeightForLine(s, o)
      );
    });
  }
  setMaxWeightForLine(e, n) {
    const r = e.maxLineWeight ?? 0;
    n > r && (e.maxLineWeight = n);
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
}
class yT {
  constructor() {
    this.originalAnnotationsMap = /* @__PURE__ */ new Map(), this.parsedAnnotationsMap = /* @__PURE__ */ new Map(), this.gutter = {
      maxWeight: 0,
      paddingLeft: 0
    }, this.positions = {
      minStartPosition: 0,
      maxStartPosition: 0
    }, this.getAnnotationsSortedBy = Object.assign(
      () => this.getAnnotations(),
      {
        sortBy: (e) => {
          switch (e) {
            case "weight":
              return this.getSortedByWeightAnnotations();
          }
          return this.getAnnotations();
        }
      }
    );
  }
  getAnnotations() {
    return Array.from(this.parsedAnnotationsMap.values());
  }
  getSortedByWeightAnnotations() {
    return this.getAnnotations().sort(
      (e, n) => n._render.weight - e._render.weight
    );
  }
  addAnnotation(e, n, r) {
    this.originalAnnotationsMap.set(e, n), this.parsedAnnotationsMap.set(e, r);
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
  calculateWeights(e, n) {
    this.calculateGutterWeights(e, n), this.calculateTextAnnotationsWeight(e, n);
  }
  calculateGutterWeights(e, n) {
    const r = this.getAnnotations().filter(
      (c) => c._render.isGutter
    );
    fT(e, r);
    const i = Tn(r, (c) => c._render.weight)?._render.weight ?? 0, o = n.getGutterRenders().map((c) => c.annotationRenderStyle.getDefaultStyle().default), s = Tn(o, (c) => c.gutterWidth)?.gutterWidth ?? 0, a = Tn(o, (c) => c.gutterGap)?.gutterGap ?? 0, u = s + a;
    this.gutter = {
      maxWeight: i,
      paddingLeft: u * i
    };
  }
  calculateTextAnnotationsWeight(e, n) {
    const r = this.getAnnotations().filter(
      (i) => !i._render.isGutter
    );
    hs.calculate(
      r,
      n.getTextRenders()
    );
  }
  addDrawAnnotations(e, n, r) {
    const i = this.getParsedAnnotation(e);
    i._drawMetadata.draws = n, i._drawMetadata.dimensions = r;
  }
  clearDrawAnnotation() {
    this.parsedAnnotationsMap.forEach((e) => {
      e._drawMetadata.draws = [], e._drawMetadata.dimensions = void 0;
    });
  }
}
const qt = {
  highlight: "highlight",
  underline: "underline",
  gutter: "gutter"
};
class Ef {
  /**
   * Set the annotation module for dependency injection.
   * This must be called before using inject().
   */
  setModule(e) {
    this.annotationModule = e, this.svgModel = e.inject(vt);
  }
  /**
   * Inject a dependency from the annotation module's container.
   *
   * @param token - The token identifying the service to inject
   * @returns The service instance
   */
  inject(e) {
    return this.annotationModule.inject(e);
  }
  get textAdapter() {
    return this.annotationModule.getTextAdapter();
  }
  get annotationAdapter() {
    return this.annotationModule.getAnnotationAdapter();
  }
}
class wT {
  constructor(e = {}) {
    this.defaultStyle = e, this.styleMap = /* @__PURE__ */ new Map(), this.defaultStyleName = $n, this.styleFn = Tf.styleFn, this.styleMap.set(
      $n,
      ln({}, this.defaultStyle)
    );
  }
  registerStyle(e, n) {
    this.styleMap.set(e, ln(this.defaultStyle, n));
  }
  getDefaultStyle() {
    let e = this.styleMap.get(this.defaultStyleName) ?? this.styleMap.get($n);
    return e || (e = ln({}, this.defaultStyle)), e;
  }
  setDefaultStyleName(e) {
    if (!this.styleMap.has(e)) {
      N.warn(
        "Style not found: " + e + ". Default style name remains unchanged."
      );
      return;
    }
    this.defaultStyleName = e;
  }
  setStyleFn(e) {
    this.styleFn = e;
  }
  getStyle(e) {
    if (!e) return this.getDefaultStyle();
    const n = this.styleFn(e);
    if (n === null)
      return N.verbose(
        "StyleInstances",
        "No style specified for annotation, returning default style."
      ), this.getDefaultStyle();
    if (typeof n == "string") {
      const r = this.styleMap.get(n);
      return r || (N.warn(
        "Style not found: " + n + ". Returning default style."
      ), this.defaultStyle);
    }
    return ln(this.defaultStyle, n);
  }
  updateDefaultStyle(e) {
    this.defaultStyle = zt(ut(this.defaultStyle), ut(e));
  }
}
class Of extends Ef {
  /**
   * Creates a new annotation renderer with the specified default style.
   *
   * The defaultStyle is deep cloned to ensure isolation between instances.
   *
   * @param name - name of the renderer, used for identifying it in the style configuration
   * @param style - Partial style object containing properties to override
   * @param defaultStyle - The default style configuration for this renderer
   *
   * @protected
   */
  constructor(e, n, r) {
    super(), this.name = e, this.annotationRenderStyle = new wT({
      default: zt(ut(n.default), ut(r.default)),
      edit: zt(ut(n.edit), ut(r.edit)),
      active: zt(ut(n.active), ut(r.active)),
      hover: zt(ut(n.hover), ut(r.hover))
    });
  }
  getStyle(e) {
    return this.annotationRenderStyle.getStyle(e);
  }
}
const M$ = {
  hover: {
    color: {
      border: "rgba(100, 100, 100, 0.5)",
      fill: "rgba(1, 1, 1, 0.1)"
    }
  },
  edit: {
    color: {
      border: "rgba(255,0,0,0.9)"
    }
  }
}, bT = (t, e) => {
  let n = t.start - e.start;
  const r = t.end - e.start;
  return n < 0 && (n = 0), { start: n, end: r };
}, If = (t, e, n) => {
  const r = n.element;
  if (!r)
    return N.debug(
      "getRange",
      `No textElement for line ${n.lineNumber} found for annotation ${e.id}`
    ), null;
  const { start: i, end: o } = bT(e, n);
  return o < 0 ? null : zf(t, r, i, o);
}, zf = (t, e, n, r) => {
  if (!e)
    return [];
  if (e.childNodes?.length > 0) {
    let a = 0;
    const u = [];
    for (const c of e.childNodes) {
      if (a > r)
        break;
      const l = c.textContent.length, f = zf(
        t,
        c,
        n - a,
        r - a
      );
      a += l, u.push(...f);
    }
    return u;
  }
  const i = e.textContent.length;
  if (n < 0 && (n = 0), n >= i)
    return [];
  const o = Math.min(i, r), s = document.createRange();
  return s.setStart(e, n), s.setEnd(e, o), Array.from(s.getClientRects()).map((a) => ({
    original: { x: a.x, y: a.y, height: a.height, width: a.width },
    dimensions: jo(t, a)
  })).flat();
}, xT = (t, e, n, r) => ({
  fill: `M${t},${e} 
          H${t + n} 
          V${e + r} 
          H${t} 
          Z`
}), AT = (t, e, n) => {
  const r = n._style.default.gutterWidth, i = n._style.default.gutterGap;
  if (!n._render.lines || n._render.lines.length === 0)
    return N.warn("no lines to render for annotation", n), {
      draws: [],
      dimensions: void 0
    };
  const o = t.maxGutterWeight - n._render.weight, s = {
    x: (r + i) * o,
    y: -1,
    height: 0
  };
  return (n._render.lines ?? []).forEach((c) => {
    const l = If(e, n, c);
    if (!l?.length || l.length === 0)
      return;
    const f = l[0], h = l[l?.length - 1];
    s.x < 0 && (s.x = f.dimensions.x), s.y < 0 && (s.y = f.dimensions.y), s.height = h.dimensions.y + h.dimensions.height;
  }), {
    draws: [
      {
        weight: n._render.weight,
        uuid: cr(),
        annotationUuid: n.id,
        lineNumber: 0,
        path: xT(
          s.x,
          s.y,
          r,
          s.height
        ),
        draggable: {},
        height: s
      }
    ],
    dimensions: {
      x: s.x,
      y1: s.y,
      y2: s.y + s.height
    }
  };
}, ST = (t, e = {}) => ({
  borderColor: "transparent",
  backgroundColor: t,
  tagBorderColor: t,
  borderOpacity: 0,
  borderRadius: 0,
  ...e
}), TT = {
  default: ST(cs.backgroundColor)
};
class $T extends Of {
  constructor(e, n = {}) {
    super(e, TT, n), this.weightOrder = 1, this.isGutter = !0, this.renderTag = !1;
  }
  createDraws(e) {
    const n = this.svgModel.getTextElementDimensions(), r = {
      textDirection: this.textAdapter.textDirection,
      maxGutterWeight: this.annotationAdapter.gutter.maxWeight
    };
    return AT(r, n, e);
  }
}
class Cf extends Of {
  constructor(e, n, r) {
    super(e, n, r), this.borders = !0, this.fillBg = !0;
  }
  // Implemented by default
  createDraws(e) {
    const n = this.svgModel.getTextElementDimensions(), r = this.textAdapter.textDirection, i = this.textAdapter.style, o = e._style.default.borderRadius, s = [], a = i.lineOffset / 2, u = i.padding * e._render.weight, c = u * 2, l = i.lineHeight + u * 2;
    let f;
    const h = e._render.lines ?? [];
    return h.forEach((d, m) => {
      const g = If(n, e, d), y = h[m - 1]?.end, _ = !y || y <= e.start, w = h[m + 1]?.start, b = !w || e.end < w;
      g?.forEach((p, x) => {
        const T = p.dimensions;
        let $ = T.height + c;
        $ < l && ($ = l);
        const I = T.x, j = T.y - u - a;
        let J = _ && x === 0, wt = x === g.length - 1 && b;
        if (r === "rtl") {
          const bt = wt;
          wt = J, J = bt;
        }
        f || (f = {
          x: I,
          y1: j,
          y2: j + $
        }), s.push({
          weight: e._render.weight,
          uuid: cr(),
          annotationUuid: e.id,
          lineNumber: d.lineNumber,
          path: this.createPath({
            x: I,
            y: j,
            width: T.width,
            height: $,
            r: o,
            leftBorder: J,
            rightBorder: wt
          }),
          draggable: {
            start: J ? { x: I, y: j, height: $ } : void 0,
            end: wt ? { x: I + T.width, y: j, height: $ } : void 0
          },
          height: { x: I, y: j, height: $ }
        });
      });
    }), { draws: s, dimensions: f };
  }
}
const go = Y(
  (t, e, n, r, i) => [
    // move to top-left
    `H${n - i}`,
    // top edge
    `A${i},${i} 0 0 1 ${n},${e + i}`,
    // top-right corner
    `V${r - i}`,
    // right edge
    `A${i},${i} 0 0 1 ${n - i},${r}`
    // bottom-right corner
  ]
), mo = Y(
  (t, e, n, r) => [
    `H${t + r}`,
    `A${r},${r} 0 0 1 ${t},${n - r}`,
    // bottom-left corner
    `V${e + r}`,
    `A${r},${r} 0 0 1 ${t + r},${e}`
  ]
), Nf = ({
  x: t,
  y: e,
  width: n,
  height: r,
  r: i,
  leftBorder: o,
  rightBorder: s
}) => {
  const a = t + n, u = e + r, c = [`M${t + (o ? i : 0)},${e}`];
  return s ? c.push(go(t, e, a, u, i)) : c.push(go(t, e, a, u, 0)), o ? c.push(mo(t, e, u, i)) : c.push(mo(t, e, u, 0)), c.flat().join(" ");
}, ET = ({
  x: t,
  y: e,
  width: n,
  height: r,
  r: i,
  leftBorder: o,
  rightBorder: s
}) => {
  const a = t + n, u = e + r, c = [`M${t + (o ? i : 0)},${e}`], l = o ? t + i : t;
  return s ? (c.push(go(t, e, a, u, i)), c.push(`H${l}`)) : c.push([
    `M${l},${e}`,
    // move to top-left
    `H${a}`,
    // top edge
    `M${a},${u}`
    //  move to bottom-right
  ]), o ? c.push(mo(t, e, u, i)) : c.push(`H${t}`), c.flat().join(" ");
}, OT = (t) => {
  const e = ET(t), n = Nf(t);
  return { border: e, fill: n };
}, k$ = (t, e = {}) => ({
  backgroundColor: t,
  borderColor: t,
  tagBorderColor: t,
  ...e
});
class IT extends Cf {
  constructor(e, n = {}) {
    super(e, {}, n), this.weightOrder = 1, this.isGutter = !1, this.renderTag = !0;
  }
  createPath(e) {
    return OT(e);
  }
}
const zT = Y(
  (t, e, n, r) => `M${t} ${e + r} h ${n}`
), CT = (t) => {
  const e = Nf(t), { x: n, y: r, height: i, width: o } = t;
  return {
    border: (
      // move to top-left
      zT(n, r, o, i)
    ),
    fill: e
  };
}, NT = (t, e = {}) => ({
  backgroundColor: "transparent",
  borderColor: t,
  tagBorderColor: t,
  backgroundOpacity: 0,
  borderRadius: 0,
  ...e
}), RT = {
  default: NT(cs.backgroundColor),
  hover: {
    borderWidth: 4
  }
};
class PT extends Cf {
  constructor(e, n = {}) {
    super(e, RT, n), this.weightOrder = 2, this.isGutter = !1, this.renderTag = !0, this.fillBg = !1;
  }
  createPath(e) {
    return CT(e);
  }
}
class ve extends at {
  // Should be removed
  // protected readonly renderMap = new Map<string, AnnotationRender<any>>();
  constructor(e) {
    super(e), this.renderParams = {
      defaultRenderer: qt.highlight,
      styleFn: (n) => null,
      renderFn: (n) => null
    }, this.annotationModule.registerRender(
      qt.highlight,
      () => new IT(qt.highlight)
    ), this.annotationModule.registerRender(
      qt.gutter,
      () => new $T(qt.gutter)
    ), this.annotationModule.registerRender(
      qt.underline,
      () => new PT(qt.underline)
    ), this.annotationModule.inject(ot).updateAllStyles();
  }
  setParams(e) {
    this.renderParams = zt(this.renderParams, e);
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
    if (this.annotationModule.hasRender(this.defaultRenderer))
      return this.annotationModule.injectRender(this.defaultRenderer);
    throw new Error("Default renderer not found: " + this.defaultRenderer);
  }
  getRenderer(e) {
    let n = this.renderParams.renderFn?.(e);
    if (n || (N.verbose(
      "RenderInstances",
      "Fallback to default renderer as no render was specified for annotation.",
      e
    ), n = this.defaultRenderer), this.annotationModule.hasRender(n))
      return this.annotationModule.injectRender(n);
    if (n === this.defaultRenderer)
      throw new Error("Default renderer not found: " + this.defaultRenderer);
    return N.warn(
      "RenderInstances",
      `Renderer "${n}" not found for annotation. fallback to default renderer: [${this.defaultRenderer}]`
    ), this.annotationModule.injectRender(this.defaultRenderer);
  }
  get highlightInstance() {
    return this.annotationModule.injectRender("highlight");
  }
  createDraws(e) {
    const n = e._render.render;
    return this.annotationModule.injectRender(n).createDraws(e);
  }
}
class Rf extends Ef {
  constructor(e) {
    super(), this.setParams(e);
  }
}
const MT = k({
  start: D(),
  end: D(),
  text: A(),
  gutter: A().optional()
}), kt = MT.extend({
  lineNumber: D(),
  uuid: A().default(cr),
  maxLineWeight: D().default(0),
  flatText: A(),
  html: A(),
  element: Ll().optional()
}), kT = k({
  border: A().optional(),
  fill: A().optional()
}), qi = k({
  height: D(),
  x: D(),
  y: D()
}), DT = k({
  x: D(),
  y1: D(),
  y2: D()
}), jT = k({
  uuid: A(),
  annotationUuid: E([A(), D()]),
  lineNumber: D(),
  path: kT,
  draggable: k({
    start: qi.optional(),
    end: qi.optional()
  }),
  height: qi,
  weight: D()
}), vo = k({
  draws: C(jT).default([]),
  dimensions: DT.optional()
}), Pf = k({
  label: A(),
  padding: D(),
  fontSize: D()
}), D$ = E([
  R("gutter"),
  R("text")
]), ZT = E([A(), D()]), Ln = k({
  id: ZT,
  start: D(),
  end: D(),
  // TODO should be implemented in v2 if needed
  label: A().optional(),
  textSelection: A().optional()
}), j$ = k({
  renderStyle: Ll()
}), dn = k({
  backgroundColor: A(),
  borderColor: A(),
  borderRadius: D(),
  borderWidth: D(),
  // Gutter styles
  gutterWidth: D(),
  gutterGap: D(),
  // Tag styles
  tagTextColor: A(),
  tagBorderColor: A(),
  tagBackgroundColor: A(),
  tagBorderWidth: D()
}), _o = k({
  default: dn,
  edit: dn,
  active: dn,
  hover: dn
}), yo = k({
  weight: D().optional().nullish(),
  isGutter: Jw(),
  render: A(),
  // Name of the renderer
  lines: C(kt).default([])
}), wo = Ln.extend({
  _render: yo,
  _style: _o,
  _drawMetadata: vo,
  _tagMetadata: Pf.nullish()
}), Z$ = k({
  border: A().optional(),
  background: A().optional(),
  borderActive: A().optional(),
  backgroundActive: A().optional(),
  gutterColor: A().optional(),
  color: A().optional(),
  tagBackground: A().optional(),
  tagColor: A().optional()
});
class Bn extends at {
  /**
   * Sets the function used to derive a tag label from an annotation.
   * Pass `null` to disable tag rendering.
   *
   * @param tagFn - Label extraction function, or `null` to disable tags
   */
  setTagFn(e) {
    this.tagFn = e;
  }
  /**
   * Builds the draw metadata for an annotation's tag.
   *
   * Returns `null` when any of the following is true:
   * - No {@link tagFn} has been set
   * - The renderer does not support tags (`renderInstance.renderTag` is `false`)
   * - The {@link tagFn} returns an empty string for the given annotation
   *
   * @param annotation - The annotation to generate tag metadata for
   * @param renderInstance - The renderer that will draw the annotation; checked for tag support
   * @returns The tag draw metadata, or `null` if the tag should not be rendered
   */
  getTagConfig(e, n) {
    if (!this.tagFn || !n.renderTag) return null;
    const r = this.tagFn(e);
    return r ? Pf.parse({
      label: r,
      padding: 1,
      fontSize: 8
    }) : null;
  }
}
const FT = {
  text: {
    // Width of the handle used to resize annotations
    handleRadius: 6
  }
};
class ds extends Rf {
  constructor() {
    super(...arguments), this.annotationCache = new yT(), this.annotations = this.annotationCache.getAnnotationsSortedBy;
  }
  setModule(e) {
    super.setModule(e), this.styleInstance = this.inject(ot), this.renderInstance = this.inject(ve), this.tagRenderer = this.inject(Bn);
  }
  parse(e) {
    const n = this._parse(e);
    if (!n) return null;
    const r = this.renderInstance.getRenderer(e), i = yo.parse({
      weight: void 0,
      isGutter: r.isGutter,
      render: r.name
    }), o = vo.parse({}), s = r.getStyle(e), a = _o.parse(s), u = wo.parse({
      ...n,
      _render: i,
      _style: a,
      _tagMetadata: this.tagRenderer.getTagConfig(e, r),
      _drawMetadata: o
    });
    return this.addAnnotation(n.id, e, u), u;
  }
  /**
   *  If return true, then on hover it becomes the active color
   */
  hover(e) {
    return !0;
  }
  /**
   * Create a new annotation object with default values.
   */
  createAnnotation(e) {
    const n = this.renderInstance.highlightInstance, r = n.annotationRenderStyle.getDefaultStyle(), i = yo.parse({
      weight: 0,
      isGutter: n.isGutter,
      render: n.name
    }), o = vo.parse({}), s = _o.parse(r);
    return wo.parse({
      _render: i,
      _drawMetadata: o,
      _style: s,
      id: cr(),
      start: e,
      end: e + 1
    });
  }
  setParams(e) {
    this.edit = e.edit ?? this.edit ?? !1, this.create = e.create ?? this.create ?? !1, this.config = zt(ut(this.config ?? FT), e.config), this.startOffset = e.startOffset ?? this.startOffset ?? 0;
  }
  // @region annotation  cache
  getOriginalAnnotation(e) {
    return this.annotationCache.getOriginalAnnotation(e);
  }
  getAnnotation(e) {
    return this.annotationCache.getParsedAnnotation(e);
  }
  addDrawAnnotations(e, n, r) {
    return this.annotationCache.addDrawAnnotations(
      e,
      n,
      r
    );
  }
  addAnnotation(e, n, r) {
    this.annotationCache.addAnnotation(
      e,
      n,
      r
    );
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
  // @endregion annotation  cache
}
const Mf = Y(
  (t, e, n, r, i = 10) => {
    const o = e - r;
    let s = o - i;
    s < 0 && (s = 0);
    const a = n - r + 1;
    let u = a + i;
    return u > t.length && (u = t.length), {
      prefix: t.substring(s, o),
      exact: t.substring(o, a),
      suffix: t.substring(a, u)
    };
  }
);
class LT extends ds {
  constructor(e = {}) {
    super(e), this.name = "W3CAnnotationAdapter", this.w3cBuilderMap = /* @__PURE__ */ new Map();
  }
  setParams(e) {
    this.sourceUri = e.sourceUri ?? this.sourceUri, this.language = e.language ?? this.language, super.setParams(e);
  }
  _parse(e) {
    const n = Vu(e), r = n.getTextPositionSelector(this.sourceUri)[0];
    return r ? (this.w3cBuilderMap.set(e.id, n), Ln.parse({
      id: e.id,
      start: r.start,
      end: r.end
    })) : null;
  }
  format(e, n, r) {
    if (!e) return null;
    const i = this.getOriginalAnnotation(e.id);
    if (!n && !r) return i;
    if (!n && !e.id)
      throw new Error("annotation id is required");
    const o = n ? Vu() : this.w3cBuilderMap.get(e.id);
    if (!o)
      throw new Error(
        `No builder found for annotation ${e.id}. This should not happen.`
      );
    const s = this.sourceUri ?? "";
    n && o.setId(`new:annotation:${e.id}`), o.getSpecificResourceTargets(s).length || o.setTarget({
      type: "SpecificResource",
      language: this.language,
      source: s,
      textDirection: this.textAdapter.textDirection ?? "ltr"
    }), o.updateTextPositionSelector(
      { start: e.start, end: e.end },
      s
    );
    const a = Mf(
      this.textAdapter.fullFlatText,
      e.start,
      e.end,
      this.startOffset
    );
    o.updateTextQuoteSelector(
      {
        prefix: a.prefix,
        suffix: a.suffix,
        exact: a.exact
      },
      s
    );
    const u = o.build();
    return this.w3cBuilderMap.set(e.id, o), this.addAnnotation(e.id, u, e), u;
  }
}
const F$ = (t = {}) => new LT(t);
class BT extends ds {
  constructor() {
    super(...arguments), this.name = "DefaultAnnotationAdapter";
  }
  _parse(e) {
    const n = Ln.safeParse(e);
    return n.success ? n.data : (N.warn(e, n.error), e);
  }
  format(e, n, r) {
    if (!e) return null;
    const i = this.getOriginalAnnotation(e.id);
    if (!r) return i;
    const o = Mf(
      this.textAdapter.fullFlatText,
      e.start,
      e.end,
      this.startOffset
    ), s = Ln.safeParse({
      ...e,
      text: o.exact,
      suffix: o.suffix,
      prefix: o.prefix
    });
    let a;
    return s.success ? a = s.data : (N.warn(e, s.error), a = e), a = {
      ...i ?? {},
      ...a
    }, this.addAnnotation(e.id, a, e), a;
  }
}
const qT = (t = {}) => new BT(t), WT = Y(
  (t, e, n, r, i) => {
    const o = t + 4, s = e - r / 2;
    return {
      rectDimensions: {
        x: o,
        y: s,
        width: n + i * 2,
        height: r + i * 2
      },
      textDimensions: { x: o + i, y: e + i }
    };
  }
), UT = (t, e, n) => {
  const r = e.append("text").attr("font-size", n).text(t), i = r.node()?.getBBox(), o = i?.width || 0, s = i?.height || 0;
  return r.remove(), { textWidth: o, textHeight: s };
}, GT = (t) => !(!t._tagMetadata || !t._drawMetadata.dimensions), VT = (t, e) => {
  const n = e._tagMetadata;
  if (!n) return;
  const r = e._drawMetadata.dimensions;
  if (!r) return;
  const i = e._style.default, o = {
    x: r.x,
    y: r.y2
  }, s = t.append("g").attr(V.ANNOTATION_UID, e.id).attr(V.ANNOTATION_ROLE, ht.TAG), a = `${n.fontSize}px`, u = n.padding, { textWidth: c, textHeight: l } = UT(
    n.label,
    s,
    n.fontSize
  ), { rectDimensions: f, textDimensions: h } = WT(
    o.x,
    o.y,
    c,
    l,
    u
  );
  s.append("rect").attr(V.ANNOTATION_UID, e.id).attr(V.ANNOTATION_ROLE, ht.TAG).attr("x", f.x).attr("y", f.y).attr("width", f.width).attr("height", f.height).attr("fill", "white").attr("pointer-events", "none").attr("rx", 3), s.append("rect").attr(V.ANNOTATION_UID, e.id).attr(V.ANNOTATION_ROLE, ht.TAG).attr("x", f.x).attr("y", f.y).attr("width", f.width).attr("height", f.height).attr("fill", i.tagBackgroundColor ?? "none").attr("stroke", i.tagBorderColor ?? "none").attr("stroke-width", i.tagBorderWidth ?? 0).attr("pointer-events", "none").attr("rx", 3), s.append("text").attr("x", h.x).attr("y", h.y).attr("dominant-baseline", "central").attr("font-size", a).attr("pointer-events", "none").attr("fill", i.tagTextColor).text(n.label);
};
class bo extends at {
  constructor() {
    super(...arguments), this.svgModel = super.inject(vt);
  }
  drawAll() {
    this.annotationAdapter.annotations().forEach((e) => this.drawTag(e));
  }
  drawTag(e) {
    const n = this.svgModel.tagSvg;
    return GT(e) ? (this.removeTag(e.id), VT(n, e), !0) : !1;
  }
  removeTag(e) {
    this.svgModel?.findTags(e)?.remove();
  }
}
const XT = {
  padding: 6,
  lineOffset: 2,
  lineHeight: 22
};
class ps extends Rf {
  constructor() {
    super(...arguments), this.TYPE = "TextAdapter", this.lines = [];
  }
  parse(e, n) {
    const r = this._parse(e, n);
    return this.lines = r.lines, this.fullFlatText = r.flatText, this.lines;
  }
  getLimit(e) {
    if (!this.limit) return null;
    if (e = e ?? this.lines, this.limit.ignoreLines || e.length === 0)
      return us(this.limit, ["start", "end"]);
    const n = Math.min(this.limit.start, e[0].start), r = Math.max(this.limit.end, e[e.length - 1].end);
    return { start: n, end: r };
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
    this.textDirection = e.textDirection ?? this.textDirection ?? "ltr", this.flatText = e.flatText ?? this.flatText ?? !1, this.style = Object.assign(
      this.style ?? { ...XT },
      e.style ?? {}
    ), e.limit === null ? this.limit = null : this.limit = e.limit ?? this.limit;
  }
  getLine(e) {
    return this.lines.find((n) => n.uuid === e);
  }
  clear() {
    this.textLength = 0, this.lines.forEach((e) => {
      this.textLength < e.end && (this.textLength = e.end);
    });
  }
}
const HT = Y((t, e) => e <= t ? 0 : e - t), YT = Y(
  (t, e, n) => e <= n ? e - t : n - t
), Tc = (t, e) => {
  const n = HT(t.start, e.start), r = YT(t.start, t.end, e.end);
  return { start: n, end: r };
}, JT = (t, e, n) => {
  if (!e)
    return kt.parse(t);
  if (!Io(t, e))
    return null;
  if (!e.ignoreLines)
    return kt.parse(t);
  let r = t;
  if (r.start < e.start) {
    const i = Tc(r, e);
    r = n(r, e.start, r.end, i);
  }
  if (r.end > e.end) {
    const i = Tc(r, e);
    r = n(r, r.start, e.end, i);
  }
  return kt.parse(r);
}, kf = (t, e, n) => t.map((r) => JT(r, e, n)).filter(Boolean), KT = Y(
  (t, e) => {
    const n = t?.split(`
`) ?? [""];
    let r = e;
    return n.map((i, o) => {
      const s = r + i.length + 1, a = kt.parse({
        lineNumber: o,
        start: r,
        end: s,
        id: `line-${o}`,
        text: i,
        html: `${i}`,
        flatText: i
      });
      return r = s, a;
    });
  }
), QT = (t, e, n, r) => {
  const i = t.flatText.substring(r.start, r.end);
  return kt.parse({
    ...t,
    text: i,
    flatText: i,
    html: i,
    start: e,
    end: n
  });
}, t$ = (t, e, n) => {
  const r = KT(t, n);
  return kf(r, e, QT);
};
class e$ extends ps {
  constructor() {
    super(...arguments), this.name = "PlainTextAdapter";
  }
  _parse(e) {
    return { lines: t$(
      e,
      this.limit,
      this.annotationAdapter.startOffset
    ), flatText: e };
  }
}
const n$ = (t = {}) => new e$(t), r$ = Y(
  (t, e) => {
    t = t.replace(/\r\n/g, `
`).replace(/\u000b/g, `
`);
    const n = /^([0-9/]+[a-z]?)\./g;
    let r = e, i = r, o = "";
    const s = t.split(`
`), a = [];
    for (let u = 0; u < s.length; u++) {
      i = r + (s[u].length - 1);
      const c = s[u].match(n);
      c ? o = c[0] : o = "";
      const l = r + o.length, h = Math.max(i, l), d = s[u].replace(n, ""), m = kt.parse({
        gutter: o,
        text: d,
        start: l,
        end: h,
        id: `line-${u}`,
        html: d,
        flatText: d,
        lineNumber: u
      });
      a.push(m), r = i + 2;
    }
    return a;
  }
), i$ = (t, e, n, r) => {
  const i = t.flatText.substring(r.start, r.end);
  return kt.parse({
    ...t,
    text: i,
    flatText: i,
    html: i,
    start: e,
    end: n
  });
}, o$ = (t, e, n) => {
  const r = r$(t, n);
  return kf(r, e, i$);
};
class s$ extends ps {
  constructor() {
    super(...arguments), this.name = "TextLineAdapter";
  }
  _parse(e) {
    return { lines: o$(
      e,
      this.limit,
      this.annotationAdapter.startOffset
    ), flatText: e };
  }
}
const L$ = (t = {}) => new s$(t);
class a$ {
}
class Df extends a$ {
  constructor() {
    super(...arguments), this.text = "", this.offsetStart = 0, this.textLength = 0;
  }
  setText(e, n) {
    this.text = e ?? "", this.offsetStart = n, this.textLength = this.text.length + n;
  }
  fixOffset(e) {
    return {
      start: e.start,
      end: e.end,
      modified: !1
    };
  }
}
const pn = (t) => t.charCodeAt(0).toString(16).toUpperCase(), jf = (t, e) => {
  const n = t.length;
  let r = e - 20;
  r < 0 && (r = 0);
  let i = e + 20;
  i > n && (i = n);
  const o = (s, a, u) => s.substring(a, a + u).replaceAll(/\\/g, "\\\\").replaceAll(/\x08/g, "\\b").replaceAll(/\t/g, "\\t").replaceAll(/\n/g, "\\n").replaceAll(/\f/g, "\\f").replaceAll(/\r/g, "\\r").replaceAll(/[\x00-\x07\x0B\x0E\x0F]/g, (c) => "\\x0" + pn(c)).replaceAll(/[\x10-\x1F\x80-\xFF]/g, (c) => "\\x" + pn(c)).replaceAll(/[\u0100-\u0FFF]/g, (c) => "\\u0" + pn(c)).replaceAll(/[\u1000-\uFFFF]/g, (c) => "\\u" + pn(c));
  return {
    prologTrunc: r > 0,
    prologText: o(t, r, e - r),
    tokenText: o(t, e, 1),
    epilogText: o(t, e + 1, i - (e + 1)),
    epilogTrunc: i < n
  };
};
class xo {
  /*  construct and initialize object  */
  constructor(e, n, r, i = 0, o = 0, s = 0) {
    this.type = e, this.value = n, this.text = r, this.pos = i, this.line = o, this.column = s;
  }
  /*  render a useful string representation  */
  toString(e = (n, r) => r) {
    return `${e("type", this.type)} (value: ${e("value", JSON.stringify(this.value))}, text: ${e("text", JSON.stringify(this.text))}, pos: ${e("pos", this.pos.toString())}, line: ${e("line", this.line.toString())}, column: ${e("column", this.column.toString())})`;
  }
  /*  check whether value is a Token  */
  isA(e, n) {
    return !(e !== this.type || n !== void 0 && n !== this.value);
  }
}
class Wi extends Error {
  /*  construct and initialize object  */
  constructor(e, n, r, i, o) {
    super(e), this.name = "ParsingError", this.message = e, this.pos = n, this.line = r, this.column = i, this.input = o;
  }
  /*  render a useful string representation  */
  toString() {
    const e = jf(this.input, this.pos), n = `line ${this.line} (column ${this.column}): `, r = " ".repeat(n.length + e.prologText.length);
    return "Parsing Error: " + this.message + `
` + n + e.prologText + e.tokenText + e.epilogText + `
` + r + "^";
  }
}
class Ui {
  /*  construct and initialize the object  */
  constructor(e) {
    this._tokenizr = e, this._data = {}, this._repeat = !1, this._reject = !1, this._ignore = !1, this._match = null;
  }
  /*  store and retrieve user data attached to context  */
  data(e, n) {
    const r = this._data[e];
    return arguments.length === 2 && (this._data[e] = n), r;
  }
  /*  retrieve information of current matching  */
  info() {
    return {
      line: this._tokenizr._line,
      column: this._tokenizr._column,
      pos: this._tokenizr._pos,
      len: this._match?.[0]?.length ?? 0
    };
  }
  /*  pass-through functions to attached tokenizer  */
  push(e) {
    return this._tokenizr.push(e), this;
  }
  pop() {
    return this._tokenizr.pop();
  }
  state(e) {
    return e !== void 0 ? (this._tokenizr.state(e), this) : this._tokenizr.state();
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
  /*  mark current matching to be repeated from scratch  */
  repeat() {
    return this._tokenizr._log("    REPEAT"), this._repeat = !0, this;
  }
  /*  mark current matching to be rejected  */
  reject() {
    return this._tokenizr._log("    REJECT"), this._reject = !0, this;
  }
  /*  mark current matching to be ignored  */
  ignore() {
    return this._tokenizr._log("    IGNORE"), this._ignore = !0, this;
  }
  /*  accept current matching as a new token  */
  accept(e, n) {
    return n = n ?? this._match?.[0], this._tokenizr._log(`    ACCEPT: type: ${e}, value: ${JSON.stringify(n)} (${typeof n}), text: "${this._match?.[0] ?? ""}"`), this._tokenizr._pending.push(new xo(e, n, this._match?.[0] ?? "", this._tokenizr._pos, this._tokenizr._line, this._tokenizr._column)), this;
  }
  /*  immediately stop tokenization  */
  stop() {
    return this._tokenizr._stopped = !0, this;
  }
}
const Re = class Re {
  /*  construct and initialize the object  */
  constructor() {
    this._before = null, this._after = null, this._finish = null, this._rules = [], this._debug = !1, this._input = "", this._len = 0, this._eof = !1, this._pos = 0, this._line = 1, this._column = 1, this._state = ["default"], this._tag = {}, this._transaction = [], this._pending = [], this._stopped = !1, this._ctx = new Ui(this);
  }
  /*  reset the internal state  */
  reset() {
    return this._input = "", this._len = 0, this._eof = !1, this._pos = 0, this._line = 1, this._column = 1, this._state = ["default"], this._tag = {}, this._transaction = [], this._pending = [], this._stopped = !1, this._ctx = new Ui(this), this;
  }
  /*  create an error message for the current position  */
  error(e) {
    return new Wi(e, this._pos, this._line, this._column, this._input);
  }
  /*  configure debug operation  */
  debug(e) {
    return this._debug = e, this;
  }
  /*  output a debug message  */
  _log(e) {
    this._debug && console.log(`tokenizr: ${e}`);
  }
  /*  provide (new) input string to tokenize  */
  input(e) {
    if (typeof e != "string")
      throw new Error('parameter "input" not a String');
    return this.reset(), this._input = e, this._len = e.length, this;
  }
  /*  push state  */
  push(e) {
    if (arguments.length !== 1)
      throw new Error("invalid number of arguments");
    if (typeof e != "string")
      throw new Error('parameter "state" not a String');
    return this._log(`    STATE (PUSH): old: <${this._state[this._state.length - 1]}>, new: <${e}>`), this._state.push(e), this;
  }
  /*  pop state  */
  pop() {
    if (arguments.length !== 0)
      throw new Error("invalid number of arguments");
    if (this._state.length < 2)
      throw new Error("no more custom states to pop");
    return this._log(`    STATE (POP): old: <${this._state[this._state.length - 1]}>, new: <${this._state[this._state.length - 2]}>`), this._state.pop();
  }
  state(e) {
    if (arguments.length === 1) {
      if (typeof e != "string")
        throw new Error('parameter "state" not a String');
      return this._log(`    STATE (SET): old: <${this._state[this._state.length - 1]}>, new: <${e}>`), this._state[this._state.length - 1] = e, this;
    } else if (arguments.length === 0)
      return this._state[this._state.length - 1];
    throw new Error("invalid number of arguments");
  }
  /*  set a tag  */
  tag(e) {
    if (arguments.length !== 1)
      throw new Error("invalid number of arguments");
    if (typeof e != "string")
      throw new Error('parameter "tag" not a String');
    return this._log(`    TAG (ADD): ${e}`), this._tag[e] = !0, this;
  }
  /*  check whether tag is set  */
  tagged(e) {
    if (arguments.length !== 1)
      throw new Error("invalid number of arguments");
    if (typeof e != "string")
      throw new Error('parameter "tag" not a String');
    return this._tag[e] === !0;
  }
  /*  unset a tag  */
  untag(e) {
    if (arguments.length !== 1)
      throw new Error("invalid number of arguments");
    if (typeof e != "string")
      throw new Error('parameter "tag" not a String');
    return this._log(`    TAG (DEL): ${e}`), delete this._tag[e], this;
  }
  /*  configure a tokenization before-rule callback  */
  before(e) {
    return this._before = e, this;
  }
  /*  configure a tokenization after-rule callback  */
  after(e) {
    return this._after = e, this;
  }
  /*  configure a tokenization finish callback  */
  finish(e) {
    return this._finish = e, this;
  }
  rule(e, n, r, i = "unknown") {
    if (arguments.length === 2 && typeof n == "function" ? ([n, r] = [e, n], e = "*") : arguments.length === 3 && typeof n == "function" && ([n, r, i] = [e, n, r], e = "*"), typeof e != "string")
      throw new Error('parameter "state" not a String');
    if (!(typeof n == "object" && n instanceof RegExp))
      throw new Error('parameter "pattern" not a RegExp');
    if (typeof r != "function")
      throw new Error('parameter "action" not a Function');
    if (typeof i != "string")
      throw new Error('parameter "name" not a String');
    const o = e.split(/\s*,\s*/g).map((u) => {
      const c = u.split(/\s+/g), l = c.filter((h) => h.match(/^#/) === null), f = c.filter((h) => h.match(/^#/) !== null).map((h) => h.replace(/^#/, ""));
      if (l.length !== 1)
        throw new Error("exactly one state required");
      return { state: l[0], tags: f };
    });
    let s = "g";
    try {
      typeof new RegExp("", "y").sticky == "boolean" && (s = "y");
    } catch {
    }
    typeof n.multiline == "boolean" && n.multiline && (s += "m"), typeof n.dotAll == "boolean" && n.dotAll && (s += "s"), typeof n.ignoreCase == "boolean" && n.ignoreCase && (s += "i"), typeof n.unicode == "boolean" && n.unicode && (s += "u");
    const a = new RegExp(n.source, s);
    return this._log(`rule: configure rule (state: ${e}, pattern: ${a.source})`), this._rules.push({ state: o, pattern: a, action: r, name: i }), this;
  }
  /*  progress the line/column counter  */
  _progress(e, n) {
    const r = this._line, i = this._column, o = this._input;
    for (let s = e; s < n; s++) {
      const a = o.charAt(s);
      a === "\r" ? this._column = 1 : a === `
` ? (this._line++, this._column = 1) : a === "	" ? this._column += 8 - this._column % 8 : this._column++;
    }
    this._log(`    PROGRESS: characters: ${n - e}, from: <line ${r}, column ${i}>, to: <line ${this._line}, column ${this._column}>`);
  }
  /*  determine and provide the next token  */
  _tokenize() {
    const e = () => {
      this._eof || (this._finish !== null && this._finish.call(this._ctx, this._ctx), this._eof = !0, this._pending.push(new xo("EOF", "", "", this._pos, this._line, this._column)));
    };
    if (this._stopped || this._pos >= this._len) {
      e();
      return;
    }
    let n = !0;
    for (; n; ) {
      if (n = !1, this._debug) {
        const r = jf(this._input, this._pos), i = Object.keys(this._tag).map((o) => `#${o}`).join(" ");
        this._log(`INPUT: state: <${this._state[this._state.length - 1]}>, tags: <${i}>, text: ` + (r.prologTrunc ? "..." : '"') + `${r.prologText}<${r.tokenText}>${r.epilogText}` + (r.epilogTrunc ? "..." : '"') + `, at: <line ${this._line}, column ${this._column}>`);
      }
      for (let r = 0; r < this._rules.length; r++) {
        if (this._debug) {
          const u = this._rules[r].state.map((c) => {
            let l = c.state;
            return c.tags.length > 0 && (l += " " + c.tags.map((f) => `#${f}`).join(" ")), l;
          }).join(", ");
          this._log(`  RULE: state(s): <${u}>, pattern: ${this._rules[r].pattern.source}`);
        }
        let i = !1;
        const o = this._rules[r].state.map((u) => u.state);
        let s = o.indexOf("*");
        if (s < 0 && (s = o.indexOf(this._state[this._state.length - 1])), s >= 0 && (i = this._rules[r].state[s].tags.every((c) => this._tag[c])), !i)
          continue;
        this._rules[r].pattern.lastIndex = this._pos;
        const a = this._rules[r].pattern.exec(this._input);
        if (a !== null && a.index === this._pos) {
          if (this._debug && this._log("    MATCHED: " + JSON.stringify(a)), this._ctx._match = a, this._ctx._repeat = !1, this._ctx._reject = !1, this._ctx._ignore = !1, this._before !== null && this._before.call(this._ctx, this._ctx, a, this._rules[r]), this._rules[r].action.call(this._ctx, this._ctx, a), this._after !== null && this._after.call(this._ctx, this._ctx, a, this._rules[r]), this._ctx._reject)
            continue;
          if (this._ctx._repeat) {
            n = !0;
            break;
          } else if (this._ctx._ignore) {
            if (this._progress(this._pos, this._rules[r].pattern.lastIndex), this._pos = this._rules[r].pattern.lastIndex, this._pos >= this._len) {
              e();
              return;
            }
            n = !0;
            break;
          } else if (this._pending.length > 0) {
            this._progress(this._pos, this._rules[r].pattern.lastIndex), this._pos = this._rules[r].pattern.lastIndex, this._pos >= this._len && e();
            return;
          } else
            throw new Error('action of pattern "' + this._rules[r].pattern.source + '" neither rejected nor accepted any token(s)');
        }
      }
    }
    throw this.error("token not recognized");
  }
  /*  determine and return next token  */
  token() {
    if (this._pending.length === 0 && this._tokenize(), this._pending.length > 0) {
      const e = this._pending.shift();
      return this._transaction.length > 0 && this._transaction[0].push(e), this._log(`TOKEN: ${e.toString()}`), e;
    }
    return null;
  }
  /*  determine and return all tokens  */
  tokens() {
    const e = [];
    let n;
    for (; (n = this.token()) !== null; )
      e.push(n);
    return e;
  }
  /*  peek at the next token or token at particular offset  */
  peek(e) {
    if (e === void 0 && (e = 0), typeof e != "number" || e < 0)
      throw new Error('parameter "offset" not a positive Number');
    for (; e >= this._pending.length && (this._tokenize(), this._pending.length !== 0); )
      ;
    if (e >= this._pending.length)
      throw new Error("not enough tokens available for peek operation");
    return this._log(`PEEK: ${this._pending[e].toString()}`), this._pending[e];
  }
  /*  skip one or more tokens  */
  skip(e) {
    e === void 0 && (e = 1);
    for (let n = 0; n < e; n++)
      this._tokenize();
    if (e > this._pending.length)
      throw new Error("not enough tokens available for skip operation");
    for (; e-- > 0; )
      this.token();
    return this;
  }
  /*  consume the current token (by expecting it to be a particular symbol)  */
  consume(e, n) {
    for (let o = 0; o < this._pending.length + 1; o++)
      this._tokenize();
    if (this._pending.length === 0)
      throw new Error("not enough tokens available for consume operation");
    const r = this.token();
    this._log(`CONSUME: ${r.toString()}`);
    const i = () => {
      throw new Wi(`expected: <type: ${e}, value: ${JSON.stringify(n)} (${typeof n})>, found: <type: ${r.type}, value: ${JSON.stringify(r.value)} (${typeof r.value})>`, r.pos, r.line, r.column, this._input);
    };
    return arguments.length === 2 && !r.isA(e, n) ? i() : r.isA(e) || i(), r;
  }
  /*  open tokenization transaction  */
  begin() {
    return this._log(`BEGIN: level ${this._transaction.length}`), this._transaction.unshift([]), this;
  }
  /*  determine depth of still open tokenization transaction  */
  depth() {
    if (this._transaction.length === 0)
      throw new Error("cannot determine depth -- no active transaction");
    return this._transaction[0].length;
  }
  /*  close (successfully) tokenization transaction  */
  commit() {
    if (this._transaction.length === 0)
      throw new Error("cannot commit transaction -- no active transaction");
    const e = this._transaction.shift();
    return this._transaction.length > 0 && (this._transaction[0] = this._transaction[0].concat(e)), this._log(`COMMIT: level ${this._transaction.length}`), this;
  }
  /*  close (unsuccessfully) tokenization transaction  */
  rollback() {
    if (this._transaction.length === 0)
      throw new Error("cannot rollback transaction -- no active transaction");
    const e = this._transaction.shift();
    return this._pending = e.concat(this._pending), this._log(`ROLLBACK: level ${this._transaction.length}`), this;
  }
  /*  execute multiple alternative callbacks  */
  alternatives(...e) {
    let n = null;
    const r = [];
    for (let i = 0; i < e.length; i++)
      try {
        this.begin(), n = e[i].call(this), this.commit();
        break;
      } catch (o) {
        o instanceof Error ? (this._log(`EXCEPTION: ${o.message}`), r.push({ ex: o, depth: this.depth() })) : (this._log("EXCEPTION: alternative failed"), r.push({ ex: new Error("alternative failed"), depth: this.depth() })), this.rollback();
        continue;
      }
    if (n === null && r.length > 0)
      throw r.sort((i, o) => i.depth - o.depth), r[0].ex;
    return n;
  }
};
Re.Token = xo, Re.ParsingError = Wi, Re.ActionContext = Ui;
let Ao = Re;
const u$ = (t) => {
  const e = new Ao();
  return e.rule(/†/, (n) => {
    n.accept("start");
  }), e.rule(/\d+\./, (n) => {
    n.ignore();
  }), e.rule(/(\s+)|(,)|\./, (n) => {
    n.ignore();
  }), e.rule(/[^\s,.]+/, (n) => {
    n.accept("token");
  }), e.input(t), e.tokens();
};
class B$ extends Df {
  constructor(e = u$) {
    super(), this.words = [], this.tokenizer = e, this.tree = new ls();
  }
  setText(e, n) {
    this.text === e && this.offsetStart === n || (super.setText(e, n), this.words = this.parseWords(), this.buildTree());
  }
  /**
   * Parse the text into words using the tokenizer.
   * Each word has a start (inclusive) and end (inclusive) position.
   */
  parseWords() {
    const e = this.tokenizer(this.text), n = [];
    for (const r of e)
      if (r.type === "token" || r.type === "start") {
        const i = r.pos + this.offsetStart, o = r.pos + r.text.length + this.offsetStart;
        n.push({ start: i, end: o, word: r.text });
      }
    return n;
  }
  /**
   * Build the R-tree spatial index from words.
   */
  buildTree() {
    this.tree.clear();
    const e = this.words.map((n) => ({
      minX: n.start,
      maxX: n.end,
      minY: 0,
      maxY: 0,
      word: n
    }));
    this.tree.load(e);
  }
  fixOffset(e) {
    if (this.words.length === 0)
      return {
        start: e.start,
        end: e.end,
        modified: !1
      };
    const n = this.snapStart(e.start), r = this.snapEnd(e.end);
    let i = n, o = r;
    if (i > o || !this.hasWordInRange(i, o)) {
      const s = Math.floor((e.start + e.end) / 2), a = this.findWordContaining(s) || this.findClosestWord(s);
      a && (i = a.start, o = a.end);
    }
    return {
      start: i,
      end: o,
      modified: i !== e.start || o !== e.end
    };
  }
  /**
   * Snap start position using halfway rule.
   * - If in first half of word: snap to word start (include word)
   * - If in second half of word: snap to next word start (exclude word)
   * - If not in a word: snap to closest word start
   */
  snapStart(e) {
    const n = this.findWordContaining(e);
    if (n) {
      const r = n.start + (n.end - n.start) / 2;
      if (e < r)
        return n.start;
      {
        const i = this.findNextWord(n);
        return i ? i.start : n.end + 1;
      }
    }
    return this.findClosestWordStart(e);
  }
  /**
   * Snap end position using halfway rule.
   * - If in first half of word: snap to previous word end (exclude word)
   * - If in second half of word: snap to word end (include word)
   * - If not in a word (whitespace): keep position as-is
   */
  snapEnd(e) {
    const n = this.findWordContaining(e);
    if (n) {
      const r = n.start + (n.end - n.start) / 2;
      if (e < r) {
        const i = this.findPreviousWord(n);
        return i ? i.end : n.start - 1;
      } else
        return n.end;
    }
    return e > this.textLength ? this.textLength : e;
  }
  /**
   * Find the word containing the given position (inclusive bounds).
   */
  findWordContaining(e) {
    const n = this.tree.search({
      minX: e,
      maxX: e,
      minY: 0,
      maxY: 0
    });
    for (const r of n)
      if (e >= r.word.start && e <= r.word.end)
        return r.word;
    return null;
  }
  /**
   * Find the word after the given word.
   */
  findNextWord(e) {
    const n = this.words.indexOf(e);
    return n >= 0 && n < this.words.length - 1 ? this.words[n + 1] : null;
  }
  /**
   * Find the word before the given word.
   */
  findPreviousWord(e) {
    const n = this.words.indexOf(e);
    return n > 0 ? this.words[n - 1] : null;
  }
  /**
   * Find the closest word start to the given position.
   */
  findClosestWordStart(e) {
    let n = this.words[0], r = Math.abs(e - n.start);
    for (const i of this.words) {
      const o = Math.abs(e - i.start);
      o < r && (r = o, n = i);
    }
    return n.start;
  }
  /**
   * Find the closest word end to the given position.
   */
  findClosestWordEnd(e) {
    let n = this.words[this.words.length - 1], r = Math.abs(e - n.end);
    for (const i of this.words) {
      const o = Math.abs(e - i.end);
      o < r && (r = o, n = i);
    }
    return n.end;
  }
  /**
   * Find the closest word to the given position.
   */
  findClosestWord(e) {
    if (this.words.length === 0) return null;
    let n = this.words[0], r = Math.min(
      Math.abs(e - n.start),
      Math.abs(e - n.end)
    );
    for (const i of this.words) {
      const o = Math.min(
        Math.abs(e - i.start),
        Math.abs(e - i.end)
      );
      o < r && (r = o, n = i);
    }
    return n;
  }
  /**
   * Check if there's at least one word in the given range.
   */
  hasWordInRange(e, n) {
    for (const r of this.words)
      if (r.start <= n && r.end >= e)
        return !0;
    return !1;
  }
  /**
   * Get the parsed words (useful for debugging/testing)
   */
  getWords() {
    return this.words;
  }
}
const $c = Y(
  (t, e, n, r) => (r || (r = 0), n >= t - r && n <= e + r)
), Zf = (t, e, n = 0) => {
  if (e.contains(t)) {
    let r = 0;
    for (let i = 0; i < e.childNodes.length; i++) {
      const o = e.childNodes[i];
      if (o.contains(t))
        return o === t ? n + r : Zf(t, o, n + r);
      r += o.textContent.length;
    }
  }
  return 0;
}, c$ = (t) => {
  let n = t.parentNode, r = n.getAttribute(V.LINE_UID), i = 0;
  if (!r)
    for (; n && !r; )
      n = n.parentNode, n && (r = n.getAttribute?.(V.LINE_UID));
  if (!n)
    return { lineElement: null, lineUid: null, offset: 0, lineHeight: 0 };
  const o = window.getComputedStyle?.(n).lineHeight, s = parseFloat(o);
  return i = Zf(t, n), { lineElement: n, lineUid: r, offset: i, lineHeight: s };
}, l$ = Y((t, e) => (t - e) / 2), f$ = (t, e, n) => {
  const r = t.search({ minX: e, minY: n, maxX: e, maxY: n });
  for (const i of r)
    if ($c(i.minX, i.maxX, e) && $c(i.minY, i.maxY, n))
      return i;
  return null;
};
function h$(t, e, n, r) {
  const i = jo(n, {
    x: t,
    y: e,
    height: 0,
    width: 0
  }), o = i.x, s = i.y, a = f$(r, o, s);
  if (!a) return null;
  const u = a.textPosition, c = o < a.centerX ? "left" : "right";
  return {
    newIndex: a.textPosition,
    characterPos: u,
    side: c
  };
}
const Ff = ({ characterPos: t, side: e }, n, r) => {
  const i = r === "start" ? t : n?.start, o = r === "end" ? t : n?.end, s = Math.min(i, o), a = Math.max(i, o);
  if (s === t) {
    if (e === "right")
      return { start: s + 1, end: a };
  } else if (e === "right")
    return { start: s, end: a + 1 };
  return { start: s, end: a };
};
class d$ extends at {
  constructor(e, n) {
    super(e), this.getCharacterFromTextNodesAtPoint = n, this.drawing = !1, this.drawingAndMove = !1, this.dummyAnnotation = null, this.prevEndIndex = null, this.draw = this.inject(Ue);
  }
  startCreate(e, n) {
    if (this.annotationAdapter.create && !(this.internalEventListener.isBlocking || this.drawing)) {
      if (this.dummyAnnotation = null, this.drawing = !0, this.createDummyAnnotation(e, n), !this.dummyAnnotation) {
        console.warn("no character found");
        return;
      }
      this.internalEventListener.sendEvent("send-event--annotation", {
        event: "annotation-create--start",
        mouseEvent: n,
        annotationUuid: this.dummyAnnotation.id || "",
        additionalData: { annotation: this.dummyAnnotation }
      });
    }
  }
  moveCreate(e, n) {
    if (!this.drawing) return;
    this.internalEventListener.blockEvents("starting annotation creation"), this.drawingAndMove = !0, this.createDummyAnnotation(e, n, !0);
    const r = this.dummyAnnotation;
    this.internalEventListener.sendEvent(
      "send-event--annotation",
      {
        event: "annotation-create--move",
        mouseEvent: n,
        annotationUuid: r?.id || "",
        additionalData: { annotation: r }
      }
    );
  }
  endCreate(e, n) {
    if (this.prevEndIndex = null, this.drawing = !1, !this.drawingAndMove) return !1;
    this.drawingAndMove = !1, this.internalEventListener.unBlockEvents("ending annotation creation");
    const r = this.dummyAnnotation;
    return this.dummyAnnotation = null, this.internalEventListener.sendEvent("send-event--annotation", {
      event: "annotation-create--end",
      mouseEvent: n,
      annotationUuid: r?.id || "",
      additionalData: { annotation: r }
    }), this.internalEventListener.sendEvent("annotation--add", {
      annotation: r
    }), !0;
  }
  createInitialDummyAnnotation(e) {
    return this.dummyAnnotation = this.annotationAdapter.createAnnotation(e), this.startIndex = e, this.prevEndIndex = e + 1, this.dummyAnnotation;
  }
  createDummyAnnotation(e, n, r = !1) {
    const i = this.getCharacterFromTextNodesAtPoint(e);
    if (!i) return;
    this.dummyAnnotation || (this.dummyAnnotation = this.createInitialDummyAnnotation(
      i.characterPos
    ));
    const o = this.dummyAnnotation, { start: s, end: a } = Ff(
      i,
      { start: this.startIndex, end: this.prevEndIndex },
      "end"
    );
    if (s === a) return;
    o.start = s, o.end = a;
    const u = this.getSnapper().fixOffset(o);
    return o.start = u.start, o.end = u.end, r && this.draw.annotation.dummy(o), this.prevEndIndex = i.characterPos, this.dummyAnnotation = o, e;
  }
}
const p$ = (t, e) => {
  const n = new ls(), r = t, i = fl(r), o = document.createTreeWalker(
    r,
    NodeFilter.SHOW_TEXT,
    null
  );
  let s, a = null, u = 0;
  for (; s = o.nextNode(); ) {
    const c = s.textContent;
    if (!c) continue;
    const { lineUid: l, lineHeight: f } = c$(s);
    if (!l)
      continue;
    const h = e.getLine(l);
    if (h) {
      l !== a && (u = 0), a = l;
      for (let d = 0; d < c.length; d++) {
        const m = document.createRange();
        m.setStart(s, d), m.setEnd(s, d + 1);
        const g = jo(
          i,
          m.getBoundingClientRect()
        ), y = l$(f, g.height), _ = h.start + d + u, w = g.x, b = g.y - y, p = g.width, x = g.height + y * 2, T = w + p / 2, $ = {
          minX: w,
          minY: b,
          maxX: w + p,
          maxY: b + x,
          textPosition: _,
          centerX: T,
          text: c[d]
        };
        n.insert($);
      }
      u += c.length;
    }
  }
  return n;
}, Lf = globalThis.document || null, g$ = (t, e) => {
  const n = Lf?.createElement("div"), { lineHeight: r } = Bf(
    e.style.padding,
    t.maxLineWeight,
    e.style.lineHeight
  );
  return n.style.setProperty("--gutter--line-height", `${r}px`), n.className = Xe.line.gutter.wrapper, n.innerHTML = t.gutter ?? "", n.setAttribute("data-gutter-uid", t.uuid), n;
}, Bf = Y(
  (t, e, n) => {
    const r = t * e, i = r + n + t * 2;
    return { linePadding: r, lineHeight: i };
  }
), m$ = (t, e) => {
  const n = Lf.createElement("div"), { linePadding: r, lineHeight: i } = Bf(
    e.style.padding,
    t.maxLineWeight,
    e.style.lineHeight
  );
  return n.style.setProperty("--line-padding", `${r}px`), n.style.setProperty("--line-height", `${i}px`), n.className = `${Xe.line.text.wrapper} ${e.textDirection}`, n.innerHTML = e?.flatText ? t.flatText : t.html, n.setAttribute("data-line-uid", t.uuid), n.setAttribute("data-annotation-role", "line"), n;
}, v$ = (t, e, n) => {
  t.innerHTML = "";
  const r = n.gutter.paddingLeft;
  t.className = `${Xe.text} `, t.style.setProperty("--gutter-left", `${r}px`), N.verbose("DrawText", "Draw the lines", e.lines.length), e.lines.forEach((i) => {
    t.appendChild(g$(i, e)), t.appendChild(m$(i, e));
  });
}, qf = (t, e) => {
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    if (Io(i, e) && n.push(i), e.end <= i.end) {
      r = t.length;
      break;
    }
  }
  return n;
}, _$ = (t, e) => t.querySelector(
  `[data-line-uid="${e.uuid}"]`
);
class _e extends at {
  constructor() {
    super(...arguments), this.svgModel = this.inject(vt);
  }
  createTree() {
    this.textTree = p$(this.svgModel.textElement, this.textAdapter);
  }
  getCharacterFromTextNodesAtPoint(e, n) {
    return h$(
      e,
      n,
      this.svgModel.getTextElementDimensions(),
      this.textTree
    );
  }
  draw() {
    return v$(
      this.svgModel.textElement,
      this.textAdapter,
      this.annotationAdapter
    ), this;
  }
  compute() {
    const e = this.svgModel.textElement;
    return this.textAdapter.lines.forEach((n) => {
      const r = _$(e, n);
      if (!r) {
        N.debug(
          "computeLinePositions",
          `Text line with UUID ${n.uuid} not found in the text element.`
        );
        return;
      }
      n.element = r;
    }), this;
  }
}
const y$ = (t) => {
  const n = t.inject(vt).svg, r = t.inject(_e), i = (s) => {
    const a = s.clientX, u = s.clientY;
    return { x: a, y: u };
  }, o = new d$(
    t,
    ({ x: s, y: a }) => r.getCharacterFromTextNodesAtPoint(s, a)
  );
  n.on("mousedown", (s) => {
    o.startCreate(i(s), s);
  }), n.on("mousemove", (s) => {
    o.moveCreate(i(s), s);
  }), n.on("mouseup", (s) => {
    o.endCreate(i(s), s);
  });
};
class So extends at {
  constructor() {
    super(...arguments), this.annotationColors = this.inject(Un), this.svgModel = this.annotationModule.inject(vt), this.renderInstances = this.annotationModule.inject(ve);
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
    O$(this.annotationModule, e);
  }
  dummy(e) {
    const n = hl;
    e._render.lines = qf(
      this.textAdapter.lines,
      e
    ), this.createDraws(e, n);
  }
  createDraws(e, n) {
    const r = n ?? e.id;
    this.removeDraw(r);
    const i = this.renderInstances.highlightInstance, o = e._style ?? this.renderInstances.getDefaultRenderer().annotationRenderStyle.getDefaultStyle();
    i.createDraws(e).draws.forEach((s) => {
      Vf(
        { ...s, annotationUuid: r },
        this.svgModel,
        o,
        "edit"
      );
    });
  }
  compute() {
    this.annotationAdapter.annotations().forEach((e) => {
      this.computeOne(e);
    });
  }
  computeOne(e) {
    const n = this.renderInstances.createDraws(e);
    this.annotationAdapter.addDrawAnnotations(
      e.id,
      n.draws,
      n.dimensions
    );
  }
  removeDraw(e, n = "") {
    this.svgModel?.findRelatedAnnotations(e, n)?.remove();
  }
  setClass(e, n) {
    this.svgModel?.setClass(e, n);
  }
}
const w$ = (t, e = 2) => {
  const n = document.createElement("span");
  n.style.visibility = "hidden", n.style.position = "absolute", n.style.whiteSpace = "pre", n.textContent = t, document.body.appendChild(n);
  const r = b$(n);
  return document.body.removeChild(n), r + e;
}, b$ = (t) => {
  const e = window.getComputedStyle(t);
  if (e.lineHeight !== "normal")
    return parseFloat(e.lineHeight);
  const n = document.createElement("span");
  n.style.visibility = "hidden", n.textContent = "Mg", t.appendChild(n);
  const r = n.offsetHeight;
  return t.removeChild(n), r;
}, x$ = (t, e, n) => {
  if (t.start >= t.end && n.sendError(
    "INVALID_ANNOTATION",
    `start (${t.start}) must be less than end (${t.end})`,
    t
  ), e < t.start) {
    n.sendError(
      "INVALID_ANNOTATION",
      `Invalid annotation: start (${t.start}) must be less than text length (${e})`,
      t
    );
    return;
  }
  e < t.end && n.sendError(
    "INVALID_ANNOTATION",
    `Invalid annotation: end (${t.end}) must be less than text length (${e})`,
    t
  );
};
class Ue extends at {
  constructor(e) {
    super(e), this.annotation = this.inject(So), this.text = this.inject(_e), this.tag = this.inject(bo);
  }
  initialDraw() {
    return this.text.createTree(), y$(this.annotationModule), this.annotation.drawAll(), this;
  }
  drawTags() {
    return this.tag.drawAll(), this;
  }
  setText(e) {
    const n = this.annotationAdapter.startOffset, r = this.textAdapter, i = this.getSnapper(), o = this.textAdapter.parse(e, n);
    return r.setLines(o), i.setText(e, n), r.setLineHeight(
      w$(e, r.style.lineOffset)
    ), this;
  }
  setAnnotations(e) {
    const n = this.textAdapter, r = this.annotationAdapter, i = this.textAdapter.lines, o = n.getLimit();
    return n.clear(), r.clear(), e?.forEach((s) => {
      const a = r.parse(s);
      a && (o && !Io(a, o) || this.setAnnotation(a));
    }), r.calculateWeights(i), this;
  }
  setAnnotation(e) {
    const n = this.textAdapter.textLength;
    x$(e, n, this.eventListener);
    const r = qf(this.textAdapter.lines, e);
    if (!r?.length) {
      N.warn(
        "Invalid annotation: no lines found for annotation",
        e
      );
      return;
    }
    e._render.lines = r;
  }
  initDraw(e, n) {
    return this.setText(e), this.setAnnotations(n), this;
  }
  compute() {
    return this.text.compute(), this.annotationAdapter.clearDraws(), this.annotation.compute(), this;
  }
}
class Wf extends at {
  constructor(e, n = {}) {
    super(e), this.draw = this.inject(Ue), this.annotation = n.annotation ?? null, this.originalStartEnd = {
      start: this.annotation?.start,
      end: this.annotation?.end
    };
  }
  start(e, n, r) {
    this.annotationAdapter.edit && (this.internalEventListener.isBlocking || (this.internalEventListener.blockEvents("annotation-edit--start"), this.onStart(e, n), this.sendExternalEvent("annotation-edit--start", this.dummyAnnotation?.id), this.draw.tag.removeTag(this.annotation.id)));
  }
  move(e, n, r) {
    if (!this.annotationAdapter.edit) return;
    const i = this.onDrag(e, n);
    if (!i) return;
    const { startEnd: o, prevPosition: s } = i, a = this.drawDummyAnnotation(o, s);
    a && (this.dummyAnnotation = a, this.sendExternalEvent("annotation-edit--move", this.dummyAnnotation?.id));
  }
  end(e) {
    this.dummyAnnotation && (this.internalEventListener.unBlockEvents("ending annotation edit"), this.draw.annotation.removeDraw(this.dummyAnnotation?.id), this.dummyAnnotation && (this.annotation && (this.dummyAnnotation.id = this.annotation.id), this.internalEventListener.sendEvent("annotation--update", {
      annotation: this.dummyAnnotation
    }), this.sendExternalEvent("annotation-edit--end", this.dummyAnnotation?.id)));
  }
  drawDummyAnnotation(e, n) {
    const r = this.annotation, i = wo.parse({
      ...ut(r),
      ...e,
      id: hl
    });
    i._render.weight = r._render.weight + 1;
    const o = this.annotationModule.getSnapper();
    let s = o.fixOffset(i);
    if (s.end < s.start && (i.start = s.start, s = o.fixOffset(i)), !(s.end <= s.start) && !(n && s.start === n.start && s.end === n.end))
      return i.start = s.start, i.end = s.end, this.draw.annotation.dummy(i), i;
  }
  sendExternalEvent(e, n) {
    const r = this.annotation;
    r && this.internalEventListener.sendEvent("send-event--annotation", {
      event: e,
      annotationUuid: r.id || "",
      additionalData: {
        annotation: {
          start: this.dummyAnnotation?.start ?? r.start,
          end: this.dummyAnnotation?.end ?? r.end
        },
        annotationUuid: this.dummyAnnotation?.id,
        moveId: n
      }
    });
  }
}
class A$ extends Wf {
  constructor(e, n, r, i) {
    super(r, { annotation: n }), this.minStartPosition = e, this.getCharacterFromTextNodesAtPoint = i, this.dragBusy = !1, this.pickupIndex = 0, this.textStart = 0;
  }
  onStart(e) {
    const n = this.annotation._drawMetadata.draws;
    this.startDimensions = n.find((i) => i.draggable.start).draggable?.start, this.endDimensions = n.find((i) => i.draggable.end).draggable?.end;
    const r = this.getCharacterFromTextNodesAtPoint(e);
    r && (this.pickupIndex = r.characterPos, this.textStart = this.minStartPosition, this.internalEventListener.blockEvents("starting annotation drag"), this.dragBusy = !0, this.draw.annotation.setClass(this.annotation.id, "move"));
  }
  onDrag(e, n) {
    if (!this.dragBusy) return null;
    const r = this.getCharacterFromTextNodesAtPoint(e);
    if (!r) return null;
    const i = this.originalStartEnd, o = r.characterPos - this.pickupIndex, s = i.start + o;
    if (s < this.textStart)
      return null;
    const a = this.originalStartEnd.end + o;
    if (a < s)
      return null;
    const u = { start: s, end: a }, c = this.dummyAnnotation && us(this.dummyAnnotation, ["start", "end"]);
    return { startEnd: u, prevPosition: c };
  }
}
const Ec = (t, e) => {
  const n = t.inject(_e), r = t.getAnnotationAdapter(), i = new A$(
    r.position.minStartPosition,
    e,
    t,
    ({ x: u, y: c }) => n.getCharacterFromTextNodesAtPoint(u, c)
  ), o = () => (u) => {
    const c = u.sourceEvent.clientX, l = u.sourceEvent.clientY;
    i.start({ x: c, y: l }, "start", u);
  }, s = () => (u) => {
    const c = u.sourceEvent.clientX, l = u.sourceEvent.clientY;
    i.move({ x: c, y: l }, "start", u);
  }, a = () => (u) => {
    i.end(u);
  };
  return Jc().on("drag", s()).on("start", o()).on("end", a());
};
class S$ extends Wf {
  constructor(e, n, r) {
    super(n, { annotation: e }), this.getCharacterFromTextNodesAtPoint = r;
  }
  onStart(e, n) {
  }
  onDrag(e, n) {
    const r = this.getCharacterFromTextNodesAtPoint(e);
    if (!r) return null;
    const i = Ff(
      r,
      this.originalStartEnd,
      n
    ), o = (this.dummyAnnotation && us(this.dummyAnnotation, ["start", "end"])) ?? void 0;
    return { startEnd: i, prevPosition: o };
  }
}
const Uf = [
  "annotation-create--move",
  "annotation-create--start",
  "annotation-create--end"
], T$ = [
  ...Uf,
  "annotation-edit--move",
  "annotation-edit--start",
  "annotation-edit--end"
];
class qn extends at {
  sendEvent({
    event: e,
    mouseEvent: n,
    annotationUuid: r
  }, i = {}) {
    const o = this.annotationAdapter.getAnnotation(r), s = Uf.includes(e), a = T$.includes(e), c = {
      annotation: this.annotationAdapter.format(
        zt(
          o,
          i.annotation
        ),
        s,
        a
      ),
      annotationUuid: r
    };
    return this.eventListener.sendEvent(
      e,
      c,
      n
    ), o;
  }
}
class Wn extends at {
  addToAnnotation(e, n) {
    return new $$(this.annotationModule, e, n);
  }
}
class $$ extends at {
  constructor(e, n, r) {
    super(e), this.annotation = n, this.externalEventSender = this.inject(qn), this.annotationColors = this.inject(Un), r?.on("mouseover", this.hover()).on("mouseleave", this.leave()).on("dblclick", this.doubleClick()).on("click", this.click());
  }
  sendEvent(e, n) {
    return this.externalEventSender.sendEvent({
      event: e,
      mouseEvent: n,
      annotationUuid: this.annotation?.id || ""
    });
  }
  hover() {
    return (e) => {
      if (this.internalEventListener.isBlocking) return;
      const n = this.sendEvent("mouse-enter", e);
      this.annotationAdapter.hover(n) && this.annotationColors.colorAnnotation(this.annotation.id, "hover");
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
}
const E$ = (t, e, n) => {
  e.draggable && (e.draggable.start && Oc(n, t, e.draggable.start, "start"), e.draggable.end && Oc(n, t, e.draggable.end, "end"));
}, Oc = (t, e, n, r) => {
  const i = t.getAnnotationAdapter(), s = i.config.text.handleRadius, a = t.inject(_e), u = t.inject(vt), c = new S$(
    e,
    t,
    ({ x: _, y: w }) => a.getCharacterFromTextNodesAtPoint(_, w)
  ), l = (_) => {
    c.end(_);
  }, f = (_) => {
    const w = _.sourceEvent.clientX, b = _.sourceEvent.clientY;
    return { x: w, y: b };
  }, h = (_) => {
    c.move(f(_), r, _);
  }, d = (_) => {
    c.start(f(_), r, _);
  }, m = s, g = u.handles.append("rect").attr(V.ANNOTATION_UID, e.id).attr(V.ANNOTATION_ROLE, "handle").attr("width", m).attr("height", n.height).attr("fill", "gray").attr("opacity", 0).attr("x", n.x - m / 2).attr("y", n.y).call(
    Jc().on("drag", h).on("start", d).on("end", l)
  );
  return t.inject(Wn).addToAnnotation(e, g), g.on("mouseenter", () => {
    g.attr("class", i.edit ? "handle" : "");
  }), g;
}, Gf = (t, e, n, r) => {
  const i = t[e];
  r?.attr("fill", i.backgroundColor ?? "none").attr("border", "none").attr("stroke", "none"), n?.attr("fill", "none").attr("stroke", i.borderColor ?? "none").attr("stroke-width", i.borderWidth ?? 0);
}, Vf = (t, e, n, r = "default") => {
  let i = null;
  const o = e.annotations.append("g").attr("data-annotation-uid", t.annotationUuid);
  let s = null;
  return t.path.fill && (s = o.append("path").attr(V.ANNOTATION_UID, t.annotationUuid).attr("data-annotation-start", t.lineNumber).attr(V.ANNOTATION_ROLE, ht.FILL).attr("d", t.path.fill)), t.path.border && (i = o.append("path").attr(V.ANNOTATION_UID, t.annotationUuid).attr(V.ANNOTATION_ROLE, ht.BORDER).attr("d", t.path.border).attr("fill", "none")), Gf(n, r, i, s), { rect: s, border: i };
}, O$ = (t, e) => {
  const n = t.inject(vt);
  e._drawMetadata.draws.forEach((r) => {
    const { rect: i, border: o } = Vf(
      r,
      n,
      e._style
    );
    E$(e, r, t), t.inject(Wn).addToAnnotation(
      e,
      i
    ), i?.call(Ec(t, e)), o?.call(Ec(t, e));
  });
};
class Un extends at {
  constructor() {
    super(...arguments), this.svgModel = this.inject(vt), this.activeIds = /* @__PURE__ */ new Set(), this.highlightedIds = /* @__PURE__ */ new Set(), this.renderInstances = this.annotationModule.inject(ve);
  }
  highlightAnnotations(e) {
    const n = new Set(this.highlightedIds);
    return this.highlightedIds.clear(), e.forEach((r) => this.highlightedIds.add(r)), this.color(), this.resetColors(n), this;
  }
  selectAnnotations(e) {
    const n = new Set(this.activeIds);
    return this.activeIds.clear(), e.forEach((r) => {
      this.highlightedIds.delete(r), this.activeIds.add(r);
    }), this.color(), this.resetColors(n), this;
  }
  resetColors(e) {
    return e.forEach((n) => this.resetAnnotationColor(n)), this;
  }
  color() {
    return this.resetColors(this.highlightedIds).resetColors(this.activeIds), this;
  }
  getAnnotationColor(e) {
    return this.activeIds.has(e.id) ? "active" : this.highlightedIds.has(e.id) ? "hover" : "default";
  }
  resetAnnotationColor(e) {
    const n = this.annotationAdapter.getAnnotation(e);
    if (!n) {
      N.warn("No annotation found for uuid", e);
      return;
    }
    const r = this.getAnnotationColor(n);
    if (!r) {
      N.warn("No default color found for annotation", e);
      return;
    }
    this.colorAnnotation(e, r);
  }
  colorAnnotation(e, n) {
    const r = this.annotationAdapter.getAnnotation(e)?._style ?? this.renderInstances.getDefaultRenderer().annotationRenderStyle.getDefaultStyle();
    Gf(
      r,
      n,
      this.svgModel.findBorders(e),
      this.svgModel.findFills(e)
    );
  }
}
class To {
  constructor(e) {
    this.annotationModule = e, this.textElement = null, this.resizeObserver = null, this.prevSvgNode = null, this.internalEventListener = this.annotationModule.inject(
      Jn
    );
  }
  setMainElement(e) {
    this.mainElement = e, this.textElement && (this.mainElement.removeChild(this.textElement), console.warn("element already initialized, clear and reinitialize"));
    const n = document.createElement("div");
    this.mainElement.innerHTML = "", this.mainElement.appendChild(n), this.element = n, this.element.innerHTML = "", this.element.classList.add(Xe.wrapper), this.startObserving();
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
    if (N.debug(
      "CreateAnnotations",
      "Start observing element",
      this.mainElement
    ), this.resizeObserver)
      return;
    let e = !1;
    this.resizeObserver = new ResizeObserver(() => {
      N.verbose("CreateAnnotations", "resize detected", e), e && this.internalEventListener.sendEvent("redraw-svg", void 0), e = !0;
    }), this.element && (N.debug("CreateAnnotations", "start observing", this.mainElement), this.resizeObserver.observe(this.mainElement));
  }
  stopObserving() {
    this.resizeObserver && (N.debug(
      "CreateAnnotations",
      "Stop observing element",
      this.mainElement
    ), this.mainElement && (this.resizeObserver?.unobserve(this.mainElement), this.mainElement.innerHTML = ""), this.resizeObserver?.disconnect(), this.resizeObserver = null);
  }
  destroy() {
    this.textElement = null, this.prevSvgNode = null, this.stopObserving();
  }
}
const gn = "ANNOTATION_ADAPTER", mn = "TEXT_ADAPTER", Gi = "SNAPPER";
class I$ {
  /**
   * Creates a new AnnotationModule with its own scoped container.
   *
   * @param parentContainer - Parent container (usually rootContainer) for hierarchical lookup
   * @param config - Configuration with required adapters
   */
  constructor(e) {
    this.container = e.createScope(), this.configure();
  }
  /**
   * Registers all annotation-related services with the container.
   * Order matters: SvgModel must be registered last as it depends on other services.
   */
  configure() {
    this.container.register(Jn).register(zo), this.container.register(vt, () => new vt()), this.container.register(mn, n$).register(gn, qT), this.container.register(bo, () => new bo(this)).register(qn, () => new qn(this)).register(Wn, () => new Wn(this)).register(Un, () => new Un(this)).register(Ue, () => new Ue(this)).register(So, () => new So(this)).register(_e, () => new _e(this)).register(ot, () => new ot(this)).register(ve, () => new ve(this)).register(Bn, () => new Bn(this)).register(Gi, () => new Df()), this.container.register(To, () => new To(this)), this.inject(mn).setModule(this), this.inject(gn).setModule(this);
  }
  /**
   * Retrieve a service from this module's container.
   *
   * @param token - The token identifying the service (class, string, or symbol)
   * @returns The service instance
   */
  inject(e) {
    return this.container.get(e);
  }
  /**
   * Destroy this module and clean up all service instances.
   * Should be called when the annotation component is unmounted.
   */
  destroy() {
    this.container.destroy();
  }
  updateTextAdapter(e) {
    return this.container.update(mn, () => e), this.getTextAdapter().setModule(this), this;
  }
  updateAnnotationAdapter(e) {
    return this.container.update(gn, () => e), this.getAnnotationAdapter().setModule(this), this;
  }
  updateSnapper(e) {
    return this.container.update(Gi, () => e), this;
  }
  getSnapper() {
    return this.inject(Gi);
  }
  getTextAdapter() {
    return this.inject(mn);
  }
  getAnnotationAdapter() {
    return this.inject(gn);
  }
  getAllRenderInstances() {
    const e = this.container.getAllTokens().filter((n) => String(n).startsWith("RENDER_INSTANCE_"));
    return this.container.getMany(e);
  }
  registerRender(e, n) {
    n().setModule(this), this.container.register(`RENDER_INSTANCE_${e}`, n), this.injectRender(e).setModule(this);
  }
  hasRender(e) {
    return this.container.has(`RENDER_INSTANCE_${e}`);
  }
  injectRender(e) {
    return this.inject(
      `RENDER_INSTANCE_${e}`
    );
  }
}
class gs {
  /**
   * @param parent - Optional parent container for hierarchical lookup
   */
  constructor(e) {
    this.parent = e, this.factories = /* @__PURE__ */ new Map(), this.instances = /* @__PURE__ */ new Map();
  }
  register(e, n) {
    const r = n ?? (() => new e());
    return this.factories.set(e, r), this;
  }
  /**
   * Update the factory for an existing service. This allows changing how a service is created without modifying the registration logic.
   *
   * @throws Error if the service is not already registered
   * @param token
   * @param factory
   */
  update(e, n) {
    if (!this.factories.has(e))
      throw new Error(`Cannot update unregistered service: ${String(e)}`);
    return this.factories.set(e, n), this.instances.delete(e), this;
  }
  /**
   * Retrieve a service instance from the container.
   * Creates the instance on first access (lazy instantiation) and caches it.
   * Falls back to parent container if service not found locally.
   *
   * @param token - The token identifying the service
   * @returns The service instance
   * @throws Error if service is not registered in this container or any parent
   */
  get(e) {
    if (this.instances.has(e))
      return this.instances.get(e);
    if (this.factories.has(e)) {
      const n = this.factories.get(e)();
      return this.instances.set(e, n), n;
    }
    if (this.parent)
      return this.parent.get(e);
    throw new Error(`Service not found: ${String(e)}`);
  }
  /**
   * Check if a service is registered in this container or any parent.
   */
  has(e) {
    return this.factories.has(e) || (this.parent?.has(e) ?? !1);
  }
  /**
   * Get all registered tokens in this container.
   * Does not include tokens from parent containers.
   */
  getTokens() {
    return Array.from(this.factories.keys());
  }
  /**
   * Get all registered tokens including those from parent containers.
   */
  getAllTokens() {
    const e = new Set(this.factories.keys());
    if (this.parent)
      for (const n of this.parent.getAllTokens())
        e.add(n);
    return Array.from(e);
  }
  /**
   * Retrieve multiple service instances at once.
   *
   * @param tokens - Array of tokens identifying the services
   * @returns Array of service instances in the same order as the tokens
   */
  getMany(e) {
    return e.map((n) => this.get(n));
  }
  /**
   * Create a child container with this container as its parent.
   * Child containers inherit access to parent services but can override them.
   */
  createScope() {
    return new gs(this);
  }
  /**
   * Clear cached instances but keep factories.
   * Useful for testing to reset service state between tests.
   */
  reset() {
    this.instances.clear();
  }
  /**
   * Completely destroy the container, clearing both factories and instances.
   * Use when disposing of a scoped container.
   */
  destroy() {
    this.factories.clear(), this.instances.clear();
  }
}
const z$ = new gs(), C$ = (t, e) => {
  if (e instanceof ps || e.TYPE === "TextAdapter")
    return t.updateTextAdapter(e), e;
  const n = t.getTextAdapter();
  return n.setParams(e), n;
}, N$ = (t, e) => {
  if (e instanceof ds)
    return t.updateAnnotationAdapter(e), e;
  const n = t.getAnnotationAdapter();
  return n.setParams(e), n;
}, R$ = (t, e) => {
  const n = t.getTextAdapter().fullFlatText;
  t.updateSnapper(e);
  const r = t.getAnnotationAdapter();
  return e.setText(n, r.startOffset), e;
}, Vi = globalThis.document || null;
class P$ {
  constructor(e) {
    this.id = e, this.annotationsMap = /* @__PURE__ */ new Map(), this.annotationModule = new I$(z$), this.svgModel = this.annotationModule.inject(vt), this.mainContainer = this.annotationModule.inject(To), this.draw = this.annotationModule.inject(Ue);
    const n = this.annotationModule.inject(
      Jn
    );
    this.eventListener = this.annotationModule.inject(
      zo
    ), this.init(), n.on("annotation--add", ({ data: r }) => {
      const i = this.annotationModule.getAnnotationAdapter().format(r.annotation, !0, !0);
      this.addAnnotation(i);
    }).on("annotation--update", ({ data: r }) => {
      const i = this.annotationModule.getAnnotationAdapter().format(r.annotation, !1, !0);
      this.addAnnotation(i);
    }).on("send-event--annotation", ({ data: r }) => {
      this.annotationModule.inject(qn).sendEvent(r, r.additionalData);
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
    return R$(this.annotationModule, e), this;
  }
  setTagLabelFn(e) {
    return this.annotationModule.inject(Bn).setTagFn(e), this.recalculate(), this;
  }
  setAnnotations(e) {
    return this.annotationsMap.clear(), e.forEach((n) => {
      this.annotationsMap.set(n.id, n);
    }), this.recalculate(), this;
  }
  recalculate() {
    const e = Date.now();
    if (!this.text)
      return N.debug(
        "setAnnotations",
        "------ no lines set, cannot set annotations"
      ), this;
    const n = Date.now();
    this.draw.initDraw(this.text, this.annotations()), N.time(n, "  draw.initDraw 	");
    const r = Date.now();
    return this.redrawSvg(), N.time(r, "  redrawSvg 		"), N.time(e, "recalculate 		"), this;
  }
  on(e, n) {
    return this.eventListener.register(e, n), this;
  }
  onError(e) {
    return this.eventListener.registerError(e), this;
  }
  init() {
    if (!Vi) return;
    const e = this.id, n = Vi?.getElementById(e);
    if (!n) {
      console.error("element not found", e);
      return;
    }
    this.mainContainer.setMainElement(n), this.text && this.redrawSvg();
  }
  async redrawSvg() {
    if (!Vi) return;
    this.mainContainer.clear(), this.svgModel.createTextElement(), this.draw.text.draw(), this.mainContainer.setTextElement(this.svgModel.textElement), this.svgModel.createModel();
    const e = Date.now();
    this.draw.compute().initialDraw(), this.mainContainer.setSvg(this.svgModel.node()), this.draw.drawTags(), N.time(e, " 	 initialDraw 	");
  }
  destroy() {
    return N.debug("CreateAnnotations", "destroy", this.id), this.eventListener.sendEvent("destroy", null, null), this.mainContainer.destroy(), this;
  }
  highlightAnnotations(e) {
    return this.draw.annotation.highlight(e), this;
  }
  selectAnnotations(e) {
    return this.draw.annotation.select(e), this;
  }
  setAnnotationAdapter(e) {
    return N$(this.annotationModule, e), this.recalculate(), this;
  }
  setTextAdapter(e) {
    return C$(this.annotationModule, e), this.recalculate(), this;
  }
  scrollToAnnotation(e) {
    const n = this.annotationModule.getAnnotationAdapter().getAnnotation(e)?._render.lines;
    if (!n)
      return console.warn("No lines found for annotation", e), this;
    const r = n[0].element;
    return r ? (r.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    }), this) : (console.warn("No line element found for annotation", e), this);
  }
  addAnnotation(e) {
    return this.annotationsMap.has(e.id) ? this.updateAnnotation(e.id, e) : (this.annotationsMap.set(e.id, e), this.setAnnotations(this.annotations()), this);
  }
  updateAnnotation(e, n) {
    return this.annotationsMap.has(n.id) ? (this.annotationsMap.set(n.id, n), this.setAnnotations(this.annotations()), this) : this.addAnnotation(n);
  }
  deleteAnnotation(e) {
    return this.annotationsMap.delete(e), this.setAnnotations(this.annotations()), this;
  }
  setRenderParams(e) {
    return this.annotationModule.inject(ve).setParams(e), this.recalculate(), this;
  }
  registerRender(e) {
    return this.annotationModule.registerRender(e.name, () => e), this.annotationModule.inject(ot).updateAllStyles(), this.recalculate(), this;
  }
  registerRenders(...e) {
    return e.forEach((n) => {
      this.annotationModule.registerRender(n.name, () => n);
    }), this.annotationModule.inject(ot).updateAllStyles(), this;
  }
  updateRenderStyle(e, n) {
    return this.annotationModule.injectRender(e).annotationRenderStyle.updateDefaultStyle(n), this.annotationModule.inject(ot).updateAllStyles(), this.recalculate(), this;
  }
  registerStyle(e, n) {
    return this.annotationModule.inject(ot).registerStyle(e, n), this.annotationModule.inject(ot).updateAllStyles(), this.recalculate(), this;
  }
  setStyleParams(e) {
    return this.annotationModule.inject(ot).setParams(e), this.annotationModule.inject(ot).updateAllStyles(), this.recalculate(), this;
  }
  registerStyles(e) {
    const n = this.annotationModule.inject(ot);
    return Object.keys(e).forEach((r) => {
      n.registerStyle(r, e[r]);
    }), this.annotationModule.inject(ot).updateAllStyles(), this.recalculate(), this;
  }
}
const ms = /* @__PURE__ */ new Map(), q$ = (t) => {
  const e = new P$(
    t
  );
  return e.on("destroy", () => {
    ms.delete(t), N.verbose(
      "AnnotatedText with ID",
      t,
      "has been destroyed and removed from cache."
    );
  }), e;
}, W$ = (t) => {
  const e = ms.get(t);
  if (!e)
    throw new Error("AnnotatedText with this ID does not exist");
  return e;
}, U$ = () => {
  ms.clear();
};
export {
  ds as AnnotationAdapter,
  Of as AnnotationRender,
  T$ as CHANGED_EVENTS,
  N as Debugger,
  qT as DefaultAnnotationAdapter,
  BT as DefaultAnnotationAdapterImpl,
  M$ as DefaultAnnotationRenderStyle,
  qt as DefaultRenders,
  Df as DefaultSnapper,
  XT as DefaultTextAdapterStyle,
  eu as Errors,
  $T as GutterAnnotationRender,
  IT as HighlightAnnotationRender,
  Uf as NEW_EVENTS,
  n$ as PlainTextAdapter,
  e$ as PlainTextAdapterImpl,
  a$ as Snapper,
  Cf as SvgAnnotationRender,
  ps as TextAdapter,
  L$ as TextLineAdapter,
  s$ as TextLineAdapterImpl,
  PT as UnderLineAnnotationRender,
  F$ as W3CAnnotationAdapter,
  LT as W3CAnnotationAdapterImpl,
  B$ as WordSnapper,
  Z$ as annotationColorSchema,
  DT as annotationDimensionSchema,
  vo as annotationDrawMetadataSchema,
  kT as annotationDrawPath,
  jT as annotationDrawSchema,
  ZT as annotationIdSchema,
  Ln as annotationSchema,
  D$ as annotationTargetSchema,
  U$ as clearAnnotatedTextCache,
  q$ as createAnnotatedText,
  Nf as createAnnotationFill,
  xT as createGutterPath,
  ST as createGutterStyle,
  OT as createHighlightPath,
  k$ as createHighlightStyle,
  mo as createLeftBorder,
  go as createRightBorder,
  NT as createUnderlineStyle,
  qi as dimensionsSchema,
  W$ as getAnnotatedText,
  Io as isIntersection,
  MT as lineSchema,
  yo as renderSchema,
  j$ as renderStyleSchema,
  Mf as selectText,
  dn as styleDetailSchema,
  _o as styleSchema,
  Pf as tagDrawMetadataSchema,
  wo as textAnnotationSchema,
  kt as textLineSchema
};
