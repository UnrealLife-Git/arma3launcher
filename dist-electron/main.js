var Kw = Object.defineProperty;
var Ph = (e) => {
  throw TypeError(e);
};
var Ww = (e, t, r) => t in e ? Kw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var pt = (e, t, r) => Ww(e, typeof t != "symbol" ? t + "" : t, r), Th = (e, t, r) => t.has(e) || Ph("Cannot " + r);
var Ce = (e, t, r) => (Th(e, t, "read from private field"), r ? r.call(e) : t.get(e)), fs = (e, t, r) => t.has(e) ? Ph("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), ds = (e, t, r, n) => (Th(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import jr, { ipcMain as jt, dialog as Yw, shell as Ah, app as Ln, BrowserWindow as Nh } from "electron";
import $n from "fs";
import Jw from "constants";
import fo from "stream";
import rc from "util";
import Ky from "assert";
import ge from "path";
import ho, { spawn as Oh } from "child_process";
import Wy from "events";
import po from "crypto";
import Yy from "tty";
import nc from "os";
import Ki from "url";
import Xw from "string_decoder";
import Jy from "zlib";
import Qw from "http";
import { fileURLToPath as Zw } from "node:url";
import X from "node:path";
import Fe from "node:process";
import { promisify as st, isDeepStrictEqual as eE } from "node:util";
import ue from "node:fs";
import xn from "node:crypto";
import tE from "node:assert";
import Xy from "node:os";
import "node:events";
import "node:stream";
import { setTimeout as rE } from "node:timers/promises";
import nE from "dgram";
var _t = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ic(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = {}, ni = {}, we = {};
we.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, s) => i != null ? n(i) : r(s)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
we.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Gr = Jw, iE = process.cwd, va = null, sE = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return va || (va = iE.call(process)), va;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Rh = process.chdir;
  process.chdir = function(e) {
    va = null, Rh.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Rh);
}
var oE = aE;
function aE(e) {
  Gr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, h, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), sE === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(h, p, g) {
      var $ = Date.now(), _ = 0;
      l(h, p, function m(E) {
        if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - $ < 6e4) {
          setTimeout(function() {
            e.stat(p, function(T, I) {
              T && T.code === "ENOENT" ? l(h, p, m) : g(E);
            });
          }, _), _ < 100 && (_ += 10);
          return;
        }
        g && g(E);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(h, p, g, $, _, m) {
      var E;
      if (m && typeof m == "function") {
        var T = 0;
        E = function(I, F, H) {
          if (I && I.code === "EAGAIN" && T < 10)
            return T++, l.call(e, h, p, g, $, _, E);
          m.apply(this, arguments);
        };
      }
      return l.call(e, h, p, g, $, _, E);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, h, p, g, $) {
      for (var _ = 0; ; )
        try {
          return l.call(e, f, h, p, g, $);
        } catch (m) {
          if (m.code === "EAGAIN" && _ < 10) {
            _++;
            continue;
          }
          throw m;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, h, p) {
      l.open(
        f,
        Gr.O_WRONLY | Gr.O_SYMLINK,
        h,
        function(g, $) {
          if (g) {
            p && p(g);
            return;
          }
          l.fchmod($, h, function(_) {
            l.close($, function(m) {
              p && p(_ || m);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, h) {
      var p = l.openSync(f, Gr.O_WRONLY | Gr.O_SYMLINK, h), g = !0, $;
      try {
        $ = l.fchmodSync(p, h), g = !1;
      } finally {
        if (g)
          try {
            l.closeSync(p);
          } catch {
          }
        else
          l.closeSync(p);
      }
      return $;
    };
  }
  function r(l) {
    Gr.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, h, p, g) {
      l.open(f, Gr.O_SYMLINK, function($, _) {
        if ($) {
          g && g($);
          return;
        }
        l.futimes(_, h, p, function(m) {
          l.close(_, function(E) {
            g && g(m || E);
          });
        });
      });
    }, l.lutimesSync = function(f, h, p) {
      var g = l.openSync(f, Gr.O_SYMLINK), $, _ = !0;
      try {
        $ = l.futimesSync(g, h, p), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(g);
          } catch {
          }
        else
          l.closeSync(g);
      }
      return $;
    }) : l.futimes && (l.lutimes = function(f, h, p, g) {
      g && process.nextTick(g);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(f, h, p) {
      return l.call(e, f, h, function(g) {
        u(g) && (g = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(f, h) {
      try {
        return l.call(e, f, h);
      } catch (p) {
        if (!u(p)) throw p;
      }
    };
  }
  function s(l) {
    return l && function(f, h, p, g) {
      return l.call(e, f, h, p, function($) {
        u($) && ($ = null), g && g.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(f, h, p) {
      try {
        return l.call(e, f, h, p);
      } catch (g) {
        if (!u(g)) throw g;
      }
    };
  }
  function a(l) {
    return l && function(f, h, p) {
      typeof h == "function" && (p = h, h = null);
      function g($, _) {
        _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return h ? l.call(e, f, h, g) : l.call(e, f, g);
    };
  }
  function c(l) {
    return l && function(f, h) {
      var p = h ? l.call(e, f, h) : l.call(e, f);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function u(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ih = fo.Stream, cE = lE;
function lE(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Ih.call(this);
    var s = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), a = 0, c = o.length; a < c; a++) {
      var u = o[a];
      this[u] = i[u];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        s._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        s.emit("error", l), s.readable = !1;
        return;
      }
      s.fd = f, s.emit("open", f), s._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Ih.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var s = Object.keys(i), o = 0, a = s.length; o < a; o++) {
      var c = s[o];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var uE = dE, fE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function dE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: fE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var De = $n, hE = oE, pE = cE, mE = uE, qo = rc, tt, ka;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (tt = Symbol.for("graceful-fs.queue"), ka = Symbol.for("graceful-fs.previous")) : (tt = "___graceful-fs.queue", ka = "___graceful-fs.previous");
function yE() {
}
function Qy(e, t) {
  Object.defineProperty(e, tt, {
    get: function() {
      return t;
    }
  });
}
var Jn = yE;
qo.debuglog ? Jn = qo.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Jn = function() {
  var e = qo.format.apply(qo, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!De[tt]) {
  var gE = _t[tt] || [];
  Qy(De, gE), De.close = function(e) {
    function t(r, n) {
      return e.call(De, r, function(i) {
        i || Ch(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, ka, {
      value: e
    }), t;
  }(De.close), De.closeSync = function(e) {
    function t(r) {
      e.apply(De, arguments), Ch();
    }
    return Object.defineProperty(t, ka, {
      value: e
    }), t;
  }(De.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Jn(De[tt]), Ky.equal(De[tt].length, 0);
  });
}
_t[tt] || Qy(_t, De[tt]);
var He = Ru(mE(De));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !De.__patched && (He = Ru(De), De.__patched = !0);
function Ru(e) {
  hE(e), e.gracefulify = Ru, e.createReadStream = F, e.createWriteStream = H;
  var t = e.readFile;
  e.readFile = r;
  function r(R, Q, x) {
    return typeof Q == "function" && (x = Q, Q = null), B(R, Q, x);
    function B(Z, j, L, V) {
      return t(Z, j, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? ci([B, [Z, j, L], U, V || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(R, Q, x, B) {
    return typeof x == "function" && (B = x, x = null), Z(R, Q, x, B);
    function Z(j, L, V, U, G) {
      return n(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? ci([Z, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = o);
  function o(R, Q, x, B) {
    return typeof x == "function" && (B = x, x = null), Z(R, Q, x, B);
    function Z(j, L, V, U, G) {
      return s(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? ci([Z, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(R, Q, x, B) {
    return typeof x == "function" && (B = x, x = 0), Z(R, Q, x, B);
    function Z(j, L, V, U, G) {
      return a(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? ci([Z, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var u = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(R, Q, x) {
    typeof Q == "function" && (x = Q, Q = null);
    var B = l.test(process.version) ? function(L, V, U, G) {
      return u(L, Z(
        L,
        V,
        U,
        G
      ));
    } : function(L, V, U, G) {
      return u(L, V, Z(
        L,
        V,
        U,
        G
      ));
    };
    return B(R, Q, x);
    function Z(j, L, V, U) {
      return function(G, q) {
        G && (G.code === "EMFILE" || G.code === "ENFILE") ? ci([
          B,
          [j, L, V],
          G,
          U || Date.now(),
          Date.now()
        ]) : (q && q.sort && q.sort(), typeof V == "function" && V.call(this, G, q));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = pE(e);
    m = h.ReadStream, T = h.WriteStream;
  }
  var p = e.ReadStream;
  p && (m.prototype = Object.create(p.prototype), m.prototype.open = E);
  var g = e.WriteStream;
  g && (T.prototype = Object.create(g.prototype), T.prototype.open = I), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return m;
    },
    set: function(R) {
      m = R;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(R) {
      T = R;
    },
    enumerable: !0,
    configurable: !0
  });
  var $ = m;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return $;
    },
    set: function(R) {
      $ = R;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return _;
    },
    set: function(R) {
      _ = R;
    },
    enumerable: !0,
    configurable: !0
  });
  function m(R, Q) {
    return this instanceof m ? (p.apply(this, arguments), this) : m.apply(Object.create(m.prototype), arguments);
  }
  function E() {
    var R = this;
    he(R.path, R.flags, R.mode, function(Q, x) {
      Q ? (R.autoClose && R.destroy(), R.emit("error", Q)) : (R.fd = x, R.emit("open", x), R.read());
    });
  }
  function T(R, Q) {
    return this instanceof T ? (g.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function I() {
    var R = this;
    he(R.path, R.flags, R.mode, function(Q, x) {
      Q ? (R.destroy(), R.emit("error", Q)) : (R.fd = x, R.emit("open", x));
    });
  }
  function F(R, Q) {
    return new e.ReadStream(R, Q);
  }
  function H(R, Q) {
    return new e.WriteStream(R, Q);
  }
  var z = e.open;
  e.open = he;
  function he(R, Q, x, B) {
    return typeof x == "function" && (B = x, x = null), Z(R, Q, x, B);
    function Z(j, L, V, U, G) {
      return z(j, L, V, function(q, C) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? ci([Z, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  return e;
}
function ci(e) {
  Jn("ENQUEUE", e[0].name, e[1]), De[tt].push(e), Iu();
}
var Bo;
function Ch() {
  for (var e = Date.now(), t = 0; t < De[tt].length; ++t)
    De[tt][t].length > 2 && (De[tt][t][3] = e, De[tt][t][4] = e);
  Iu();
}
function Iu() {
  if (clearTimeout(Bo), Bo = void 0, De[tt].length !== 0) {
    var e = De[tt].shift(), t = e[0], r = e[1], n = e[2], i = e[3], s = e[4];
    if (i === void 0)
      Jn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Jn("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var a = Date.now() - s, c = Math.max(s - i, 1), u = Math.min(c * 1.2, 100);
      a >= u ? (Jn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : De[tt].push(e);
    }
    Bo === void 0 && (Bo = setTimeout(Iu, 0));
  }
}
(function(e) {
  const t = we.fromCallback, r = He, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, s, o, a, c, u) {
    return typeof u == "function" ? r.read(i, s, o, a, c, u) : new Promise((l, f) => {
      r.read(i, s, o, a, c, (h, p, g) => {
        if (h) return f(h);
        l({ bytesRead: p, buffer: g });
      });
    });
  }, e.write = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, s, ...o) : new Promise((a, c) => {
      r.write(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, s, ...o) : new Promise((a, c) => {
      r.writev(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(ni);
var Cu = {}, Zy = {};
const vE = ge;
Zy.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(vE.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const eg = ni, { checkPath: tg } = Zy, rg = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Cu.makeDir = async (e, t) => (tg(e), eg.mkdir(e, {
  mode: rg(t),
  recursive: !0
}));
Cu.makeDirSync = (e, t) => (tg(e), eg.mkdirSync(e, {
  mode: rg(t),
  recursive: !0
}));
const _E = we.fromPromise, { makeDir: $E, makeDirSync: Jc } = Cu, Xc = _E($E);
var vr = {
  mkdirs: Xc,
  mkdirsSync: Jc,
  // alias
  mkdirp: Xc,
  mkdirpSync: Jc,
  ensureDir: Xc,
  ensureDirSync: Jc
};
const wE = we.fromPromise, ng = ni;
function EE(e) {
  return ng.access(e).then(() => !0).catch(() => !1);
}
var ii = {
  pathExists: wE(EE),
  pathExistsSync: ng.existsSync
};
const Ii = He;
function SE(e, t, r, n) {
  Ii.open(e, "r+", (i, s) => {
    if (i) return n(i);
    Ii.futimes(s, t, r, (o) => {
      Ii.close(s, (a) => {
        n && n(o || a);
      });
    });
  });
}
function bE(e, t, r) {
  const n = Ii.openSync(e, "r+");
  return Ii.futimesSync(n, t, r), Ii.closeSync(n);
}
var ig = {
  utimesMillis: SE,
  utimesMillisSync: bE
};
const Ui = ni, Ke = ge, PE = rc;
function TE(e, t, r) {
  const n = r.dereference ? (i) => Ui.stat(i, { bigint: !0 }) : (i) => Ui.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function AE(e, t, r) {
  let n;
  const i = r.dereference ? (o) => Ui.statSync(o, { bigint: !0 }) : (o) => Ui.lstatSync(o, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: s, destStat: null };
    throw o;
  }
  return { srcStat: s, destStat: n };
}
function NE(e, t, r, n, i) {
  PE.callbackify(TE)(e, t, n, (s, o) => {
    if (s) return i(s);
    const { srcStat: a, destStat: c } = o;
    if (c) {
      if (mo(a, c)) {
        const u = Ke.basename(e), l = Ke.basename(t);
        return r === "move" && u !== l && u.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && ku(e, t) ? i(new Error(sc(e, t, r))) : i(null, { srcStat: a, destStat: c });
  });
}
function OE(e, t, r, n) {
  const { srcStat: i, destStat: s } = AE(e, t, n);
  if (s) {
    if (mo(i, s)) {
      const o = Ke.basename(e), a = Ke.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && ku(e, t))
    throw new Error(sc(e, t, r));
  return { srcStat: i, destStat: s };
}
function sg(e, t, r, n, i) {
  const s = Ke.resolve(Ke.dirname(e)), o = Ke.resolve(Ke.dirname(r));
  if (o === s || o === Ke.parse(o).root) return i();
  Ui.stat(o, { bigint: !0 }, (a, c) => a ? a.code === "ENOENT" ? i() : i(a) : mo(t, c) ? i(new Error(sc(e, r, n))) : sg(e, t, o, n, i));
}
function og(e, t, r, n) {
  const i = Ke.resolve(Ke.dirname(e)), s = Ke.resolve(Ke.dirname(r));
  if (s === i || s === Ke.parse(s).root) return;
  let o;
  try {
    o = Ui.statSync(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (mo(t, o))
    throw new Error(sc(e, r, n));
  return og(e, t, s, n);
}
function mo(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function ku(e, t) {
  const r = Ke.resolve(e).split(Ke.sep).filter((i) => i), n = Ke.resolve(t).split(Ke.sep).filter((i) => i);
  return r.reduce((i, s, o) => i && n[o] === s, !0);
}
function sc(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Wi = {
  checkPaths: NE,
  checkPathsSync: OE,
  checkParentPaths: sg,
  checkParentPathsSync: og,
  isSrcSubdir: ku,
  areIdentical: mo
};
const It = He, Vs = ge, RE = vr.mkdirs, IE = ii.pathExists, CE = ig.utimesMillis, Hs = Wi;
function kE(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Hs.checkPaths(e, t, "copy", r, (i, s) => {
    if (i) return n(i);
    const { srcStat: o, destStat: a } = s;
    Hs.checkParentPaths(e, o, t, "copy", (c) => c ? n(c) : r.filter ? ag(kh, a, e, t, r, n) : kh(a, e, t, r, n));
  });
}
function kh(e, t, r, n, i) {
  const s = Vs.dirname(r);
  IE(s, (o, a) => {
    if (o) return i(o);
    if (a) return Da(e, t, r, n, i);
    RE(s, (c) => c ? i(c) : Da(e, t, r, n, i));
  });
}
function ag(e, t, r, n, i, s) {
  Promise.resolve(i.filter(r, n)).then((o) => o ? e(t, r, n, i, s) : s(), (o) => s(o));
}
function DE(e, t, r, n, i) {
  return n.filter ? ag(Da, e, t, r, n, i) : Da(e, t, r, n, i);
}
function Da(e, t, r, n, i) {
  (n.dereference ? It.stat : It.lstat)(t, (o, a) => o ? i(o) : a.isDirectory() ? qE(a, e, t, r, n, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? FE(a, e, t, r, n, i) : a.isSymbolicLink() ? HE(e, t, r, n, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function FE(e, t, r, n, i, s) {
  return t ? jE(e, r, n, i, s) : cg(e, r, n, i, s);
}
function jE(e, t, r, n, i) {
  if (n.overwrite)
    It.unlink(r, (s) => s ? i(s) : cg(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function cg(e, t, r, n, i) {
  It.copyFile(t, r, (s) => s ? i(s) : n.preserveTimestamps ? LE(e.mode, t, r, i) : oc(r, e.mode, i));
}
function LE(e, t, r, n) {
  return UE(e) ? ME(r, e, (i) => i ? n(i) : Dh(e, t, r, n)) : Dh(e, t, r, n);
}
function UE(e) {
  return (e & 128) === 0;
}
function ME(e, t, r) {
  return oc(e, t | 128, r);
}
function Dh(e, t, r, n) {
  xE(t, r, (i) => i ? n(i) : oc(r, e, n));
}
function oc(e, t, r) {
  return It.chmod(e, t, r);
}
function xE(e, t, r) {
  It.stat(e, (n, i) => n ? r(n) : CE(t, i.atime, i.mtime, r));
}
function qE(e, t, r, n, i, s) {
  return t ? lg(r, n, i, s) : BE(e.mode, r, n, i, s);
}
function BE(e, t, r, n, i) {
  It.mkdir(r, (s) => {
    if (s) return i(s);
    lg(t, r, n, (o) => o ? i(o) : oc(r, e, i));
  });
}
function lg(e, t, r, n) {
  It.readdir(e, (i, s) => i ? n(i) : ug(s, e, t, r, n));
}
function ug(e, t, r, n, i) {
  const s = e.pop();
  return s ? VE(e, s, t, r, n, i) : i();
}
function VE(e, t, r, n, i, s) {
  const o = Vs.join(r, t), a = Vs.join(n, t);
  Hs.checkPaths(o, a, "copy", i, (c, u) => {
    if (c) return s(c);
    const { destStat: l } = u;
    DE(l, o, a, i, (f) => f ? s(f) : ug(e, r, n, i, s));
  });
}
function HE(e, t, r, n, i) {
  It.readlink(t, (s, o) => {
    if (s) return i(s);
    if (n.dereference && (o = Vs.resolve(process.cwd(), o)), e)
      It.readlink(r, (a, c) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? It.symlink(o, r, i) : i(a) : (n.dereference && (c = Vs.resolve(process.cwd(), c)), Hs.isSrcSubdir(o, c) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Hs.isSrcSubdir(c, o) ? i(new Error(`Cannot overwrite '${c}' with '${o}'.`)) : GE(o, r, i)));
    else
      return It.symlink(o, r, i);
  });
}
function GE(e, t, r) {
  It.unlink(t, (n) => n ? r(n) : It.symlink(e, t, r));
}
var zE = kE;
const dt = He, Gs = ge, KE = vr.mkdirsSync, WE = ig.utimesMillisSync, zs = Wi;
function YE(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = zs.checkPathsSync(e, t, "copy", r);
  return zs.checkParentPathsSync(e, n, t, "copy"), JE(i, e, t, r);
}
function JE(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Gs.dirname(r);
  return dt.existsSync(i) || KE(i), fg(e, t, r, n);
}
function XE(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return fg(e, t, r, n);
}
function fg(e, t, r, n) {
  const s = (n.dereference ? dt.statSync : dt.lstatSync)(t);
  if (s.isDirectory()) return iS(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return QE(s, e, t, r, n);
  if (s.isSymbolicLink()) return aS(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function QE(e, t, r, n, i) {
  return t ? ZE(e, r, n, i) : dg(e, r, n, i);
}
function ZE(e, t, r, n) {
  if (n.overwrite)
    return dt.unlinkSync(r), dg(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function dg(e, t, r, n) {
  return dt.copyFileSync(t, r), n.preserveTimestamps && eS(e.mode, t, r), Du(r, e.mode);
}
function eS(e, t, r) {
  return tS(e) && rS(r, e), nS(t, r);
}
function tS(e) {
  return (e & 128) === 0;
}
function rS(e, t) {
  return Du(e, t | 128);
}
function Du(e, t) {
  return dt.chmodSync(e, t);
}
function nS(e, t) {
  const r = dt.statSync(e);
  return WE(t, r.atime, r.mtime);
}
function iS(e, t, r, n, i) {
  return t ? hg(r, n, i) : sS(e.mode, r, n, i);
}
function sS(e, t, r, n) {
  return dt.mkdirSync(r), hg(t, r, n), Du(r, e);
}
function hg(e, t, r) {
  dt.readdirSync(e).forEach((n) => oS(n, e, t, r));
}
function oS(e, t, r, n) {
  const i = Gs.join(t, e), s = Gs.join(r, e), { destStat: o } = zs.checkPathsSync(i, s, "copy", n);
  return XE(o, i, s, n);
}
function aS(e, t, r, n) {
  let i = dt.readlinkSync(t);
  if (n.dereference && (i = Gs.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = dt.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return dt.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (s = Gs.resolve(process.cwd(), s)), zs.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (dt.statSync(r).isDirectory() && zs.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return cS(i, r);
  } else
    return dt.symlinkSync(i, r);
}
function cS(e, t) {
  return dt.unlinkSync(t), dt.symlinkSync(e, t);
}
var lS = YE;
const uS = we.fromCallback;
var Fu = {
  copy: uS(zE),
  copySync: lS
};
const Fh = He, pg = ge, Te = Ky, Ks = process.platform === "win32";
function mg(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Fh[r], r = r + "Sync", e[r] = e[r] || Fh[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function ju(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Te(e, "rimraf: missing path"), Te.strictEqual(typeof e, "string", "rimraf: path should be a string"), Te.strictEqual(typeof r, "function", "rimraf: callback function required"), Te(t, "rimraf: invalid options argument provided"), Te.strictEqual(typeof t, "object", "rimraf: options should be object"), mg(t), jh(e, t, function i(s) {
    if (s) {
      if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const o = n * 100;
        return setTimeout(() => jh(e, t, i), o);
      }
      s.code === "ENOENT" && (s = null);
    }
    r(s);
  });
}
function jh(e, t, r) {
  Te(e), Te(t), Te(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Ks)
      return Lh(e, t, n, r);
    if (i && i.isDirectory())
      return _a(e, t, n, r);
    t.unlink(e, (s) => {
      if (s) {
        if (s.code === "ENOENT")
          return r(null);
        if (s.code === "EPERM")
          return Ks ? Lh(e, t, s, r) : _a(e, t, s, r);
        if (s.code === "EISDIR")
          return _a(e, t, s, r);
      }
      return r(s);
    });
  });
}
function Lh(e, t, r, n) {
  Te(e), Te(t), Te(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (s, o) => {
      s ? n(s.code === "ENOENT" ? null : r) : o.isDirectory() ? _a(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Uh(e, t, r) {
  let n;
  Te(e), Te(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? $a(e, t, r) : t.unlinkSync(e);
}
function _a(e, t, r, n) {
  Te(e), Te(t), Te(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? fS(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function fS(e, t, r) {
  Te(e), Te(t), Te(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let s = i.length, o;
    if (s === 0) return t.rmdir(e, r);
    i.forEach((a) => {
      ju(pg.join(e, a), t, (c) => {
        if (!o) {
          if (c) return r(o = c);
          --s === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function yg(e, t) {
  let r;
  t = t || {}, mg(t), Te(e, "rimraf: missing path"), Te.strictEqual(typeof e, "string", "rimraf: path should be a string"), Te(t, "rimraf: missing options"), Te.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ks && Uh(e, t, n);
  }
  try {
    r && r.isDirectory() ? $a(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ks ? Uh(e, t, n) : $a(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    $a(e, t, n);
  }
}
function $a(e, t, r) {
  Te(e), Te(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      dS(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function dS(e, t) {
  if (Te(e), Te(t), t.readdirSync(e).forEach((r) => yg(pg.join(e, r), t)), Ks) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var hS = ju;
ju.sync = yg;
const Fa = He, pS = we.fromCallback, gg = hS;
function mS(e, t) {
  if (Fa.rm) return Fa.rm(e, { recursive: !0, force: !0 }, t);
  gg(e, t);
}
function yS(e) {
  if (Fa.rmSync) return Fa.rmSync(e, { recursive: !0, force: !0 });
  gg.sync(e);
}
var ac = {
  remove: pS(mS),
  removeSync: yS
};
const gS = we.fromPromise, vg = ni, _g = ge, $g = vr, wg = ac, Mh = gS(async function(t) {
  let r;
  try {
    r = await vg.readdir(t);
  } catch {
    return $g.mkdirs(t);
  }
  return Promise.all(r.map((n) => wg.remove(_g.join(t, n))));
});
function xh(e) {
  let t;
  try {
    t = vg.readdirSync(e);
  } catch {
    return $g.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = _g.join(e, r), wg.removeSync(r);
  });
}
var vS = {
  emptyDirSync: xh,
  emptydirSync: xh,
  emptyDir: Mh,
  emptydir: Mh
};
const _S = we.fromCallback, Eg = ge, on = He, Sg = vr;
function $S(e, t) {
  function r() {
    on.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  on.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const s = Eg.dirname(e);
    on.stat(s, (o, a) => {
      if (o)
        return o.code === "ENOENT" ? Sg.mkdirs(s, (c) => {
          if (c) return t(c);
          r();
        }) : t(o);
      a.isDirectory() ? r() : on.readdir(s, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function wS(e) {
  let t;
  try {
    t = on.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Eg.dirname(e);
  try {
    on.statSync(r).isDirectory() || on.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Sg.mkdirsSync(r);
    else throw n;
  }
  on.writeFileSync(e, "");
}
var ES = {
  createFile: _S($S),
  createFileSync: wS
};
const SS = we.fromCallback, bg = ge, tn = He, Pg = vr, bS = ii.pathExists, { areIdentical: Tg } = Wi;
function PS(e, t, r) {
  function n(i, s) {
    tn.link(i, s, (o) => {
      if (o) return r(o);
      r(null);
    });
  }
  tn.lstat(t, (i, s) => {
    tn.lstat(e, (o, a) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), r(o);
      if (s && Tg(a, s)) return r(null);
      const c = bg.dirname(t);
      bS(c, (u, l) => {
        if (u) return r(u);
        if (l) return n(e, t);
        Pg.mkdirs(c, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function TS(e, t) {
  let r;
  try {
    r = tn.lstatSync(t);
  } catch {
  }
  try {
    const s = tn.lstatSync(e);
    if (r && Tg(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = bg.dirname(t);
  return tn.existsSync(n) || Pg.mkdirsSync(n), tn.linkSync(e, t);
}
var AS = {
  createLink: SS(PS),
  createLinkSync: TS
};
const an = ge, Ns = He, NS = ii.pathExists;
function OS(e, t, r) {
  if (an.isAbsolute(e))
    return Ns.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = an.dirname(t), i = an.join(n, e);
    return NS(i, (s, o) => s ? r(s) : o ? r(null, {
      toCwd: i,
      toDst: e
    }) : Ns.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), r(a)) : r(null, {
      toCwd: e,
      toDst: an.relative(n, e)
    })));
  }
}
function RS(e, t) {
  let r;
  if (an.isAbsolute(e)) {
    if (r = Ns.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = an.dirname(t), i = an.join(n, e);
    if (r = Ns.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Ns.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: an.relative(n, e)
    };
  }
}
var IS = {
  symlinkPaths: OS,
  symlinkPathsSync: RS
};
const Ag = He;
function CS(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Ag.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function kS(e, t) {
  let r;
  if (t) return t;
  try {
    r = Ag.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var DS = {
  symlinkType: CS,
  symlinkTypeSync: kS
};
const FS = we.fromCallback, Ng = ge, tr = ni, Og = vr, jS = Og.mkdirs, LS = Og.mkdirsSync, Rg = IS, US = Rg.symlinkPaths, MS = Rg.symlinkPathsSync, Ig = DS, xS = Ig.symlinkType, qS = Ig.symlinkTypeSync, BS = ii.pathExists, { areIdentical: Cg } = Wi;
function VS(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, tr.lstat(t, (i, s) => {
    !i && s.isSymbolicLink() ? Promise.all([
      tr.stat(e),
      tr.stat(t)
    ]).then(([o, a]) => {
      if (Cg(o, a)) return n(null);
      qh(e, t, r, n);
    }) : qh(e, t, r, n);
  });
}
function qh(e, t, r, n) {
  US(e, t, (i, s) => {
    if (i) return n(i);
    e = s.toDst, xS(s.toCwd, r, (o, a) => {
      if (o) return n(o);
      const c = Ng.dirname(t);
      BS(c, (u, l) => {
        if (u) return n(u);
        if (l) return tr.symlink(e, t, a, n);
        jS(c, (f) => {
          if (f) return n(f);
          tr.symlink(e, t, a, n);
        });
      });
    });
  });
}
function HS(e, t, r) {
  let n;
  try {
    n = tr.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = tr.statSync(e), c = tr.statSync(t);
    if (Cg(a, c)) return;
  }
  const i = MS(e, t);
  e = i.toDst, r = qS(i.toCwd, r);
  const s = Ng.dirname(t);
  return tr.existsSync(s) || LS(s), tr.symlinkSync(e, t, r);
}
var GS = {
  createSymlink: FS(VS),
  createSymlinkSync: HS
};
const { createFile: Bh, createFileSync: Vh } = ES, { createLink: Hh, createLinkSync: Gh } = AS, { createSymlink: zh, createSymlinkSync: Kh } = GS;
var zS = {
  // file
  createFile: Bh,
  createFileSync: Vh,
  ensureFile: Bh,
  ensureFileSync: Vh,
  // link
  createLink: Hh,
  createLinkSync: Gh,
  ensureLink: Hh,
  ensureLinkSync: Gh,
  // symlink
  createSymlink: zh,
  createSymlinkSync: Kh,
  ensureSymlink: zh,
  ensureSymlinkSync: Kh
};
function KS(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const s = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
}
function WS(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var yo = { stringify: KS, stripBom: WS };
let Mi;
try {
  Mi = He;
} catch {
  Mi = $n;
}
const cc = we, { stringify: kg, stripBom: Dg } = yo;
async function YS(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Mi, n = "throws" in t ? t.throws : !0;
  let i = await cc.fromCallback(r.readFile)(e, t);
  i = Dg(i);
  let s;
  try {
    s = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return s;
}
const JS = cc.fromPromise(YS);
function XS(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Mi, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Dg(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function QS(e, t, r = {}) {
  const n = r.fs || Mi, i = kg(t, r);
  await cc.fromCallback(n.writeFile)(e, i, r);
}
const ZS = cc.fromPromise(QS);
function eb(e, t, r = {}) {
  const n = r.fs || Mi, i = kg(t, r);
  return n.writeFileSync(e, i, r);
}
var Fg = {
  readFile: JS,
  readFileSync: XS,
  writeFile: ZS,
  writeFileSync: eb
};
const Vo = Fg;
var tb = {
  // jsonfile exports
  readJson: Vo.readFile,
  readJsonSync: Vo.readFileSync,
  writeJson: Vo.writeFile,
  writeJsonSync: Vo.writeFileSync
};
const rb = we.fromCallback, Os = He, jg = ge, Lg = vr, nb = ii.pathExists;
function ib(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = jg.dirname(e);
  nb(i, (s, o) => {
    if (s) return n(s);
    if (o) return Os.writeFile(e, t, r, n);
    Lg.mkdirs(i, (a) => {
      if (a) return n(a);
      Os.writeFile(e, t, r, n);
    });
  });
}
function sb(e, ...t) {
  const r = jg.dirname(e);
  if (Os.existsSync(r))
    return Os.writeFileSync(e, ...t);
  Lg.mkdirsSync(r), Os.writeFileSync(e, ...t);
}
var Lu = {
  outputFile: rb(ib),
  outputFileSync: sb
};
const { stringify: ob } = yo, { outputFile: ab } = Lu;
async function cb(e, t, r = {}) {
  const n = ob(t, r);
  await ab(e, n, r);
}
var lb = cb;
const { stringify: ub } = yo, { outputFileSync: fb } = Lu;
function db(e, t, r) {
  const n = ub(t, r);
  fb(e, n, r);
}
var hb = db;
const pb = we.fromPromise, Et = tb;
Et.outputJson = pb(lb);
Et.outputJsonSync = hb;
Et.outputJSON = Et.outputJson;
Et.outputJSONSync = Et.outputJsonSync;
Et.writeJSON = Et.writeJson;
Et.writeJSONSync = Et.writeJsonSync;
Et.readJSON = Et.readJson;
Et.readJSONSync = Et.readJsonSync;
var mb = Et;
const yb = He, Kl = ge, gb = Fu.copy, Ug = ac.remove, vb = vr.mkdirp, _b = ii.pathExists, Wh = Wi;
function $b(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Wh.checkPaths(e, t, "move", r, (s, o) => {
    if (s) return n(s);
    const { srcStat: a, isChangingCase: c = !1 } = o;
    Wh.checkParentPaths(e, a, t, "move", (u) => {
      if (u) return n(u);
      if (wb(t)) return Yh(e, t, i, c, n);
      vb(Kl.dirname(t), (l) => l ? n(l) : Yh(e, t, i, c, n));
    });
  });
}
function wb(e) {
  const t = Kl.dirname(e);
  return Kl.parse(t).root === t;
}
function Yh(e, t, r, n, i) {
  if (n) return Qc(e, t, r, i);
  if (r)
    return Ug(t, (s) => s ? i(s) : Qc(e, t, r, i));
  _b(t, (s, o) => s ? i(s) : o ? i(new Error("dest already exists.")) : Qc(e, t, r, i));
}
function Qc(e, t, r, n) {
  yb.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : Eb(e, t, r, n) : n());
}
function Eb(e, t, r, n) {
  gb(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (s) => s ? n(s) : Ug(e, n));
}
var Sb = $b;
const Mg = He, Wl = ge, bb = Fu.copySync, xg = ac.removeSync, Pb = vr.mkdirpSync, Jh = Wi;
function Tb(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = Jh.checkPathsSync(e, t, "move", r);
  return Jh.checkParentPathsSync(e, i, t, "move"), Ab(t) || Pb(Wl.dirname(t)), Nb(e, t, n, s);
}
function Ab(e) {
  const t = Wl.dirname(e);
  return Wl.parse(t).root === t;
}
function Nb(e, t, r, n) {
  if (n) return Zc(e, t, r);
  if (r)
    return xg(t), Zc(e, t, r);
  if (Mg.existsSync(t)) throw new Error("dest already exists.");
  return Zc(e, t, r);
}
function Zc(e, t, r) {
  try {
    Mg.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Ob(e, t, r);
  }
}
function Ob(e, t, r) {
  return bb(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), xg(e);
}
var Rb = Tb;
const Ib = we.fromCallback;
var Cb = {
  move: Ib(Sb),
  moveSync: Rb
}, wn = {
  // Export promiseified graceful-fs:
  ...ni,
  // Export extra methods:
  ...Fu,
  ...vS,
  ...zS,
  ...mb,
  ...vr,
  ...Cb,
  ...Lu,
  ...ii,
  ...ac
}, xr = {}, mn = {}, Ye = {}, yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.CancellationError = yn.CancellationToken = void 0;
const kb = Wy;
class Db extends kb.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Yl());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, s) => {
      let o = null;
      if (n = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          s(new Yl());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, s, (a) => {
        o = a;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
yn.CancellationToken = Db;
class Yl extends Error {
  constructor() {
    super("cancelled");
  }
}
yn.CancellationError = Yl;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.newError = Fb;
function Fb(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var wt = {}, Jl = { exports: {} }, Ho = { exports: {} }, el, Xh;
function jb() {
  if (Xh) return el;
  Xh = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, s = n * 365.25;
  el = function(l, f) {
    f = f || {};
    var h = typeof l;
    if (h === "string" && l.length > 0)
      return o(l);
    if (h === "number" && isFinite(l))
      return f.long ? c(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var h = parseFloat(f[1]), p = (f[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var f = Math.abs(l);
    return f >= n ? Math.round(l / n) + "d" : f >= r ? Math.round(l / r) + "h" : f >= t ? Math.round(l / t) + "m" : f >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n ? u(l, f, n, "day") : f >= r ? u(l, f, r, "hour") : f >= t ? u(l, f, t, "minute") : f >= e ? u(l, f, e, "second") : l + " ms";
  }
  function u(l, f, h, p) {
    var g = f >= h * 1.5;
    return Math.round(l / h) + " " + p + (g ? "s" : "");
  }
  return el;
}
var tl, Qh;
function qg() {
  if (Qh) return tl;
  Qh = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = u, n.disable = a, n.enable = s, n.enabled = c, n.humanize = jb(), n.destroy = l, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let h = 0;
      for (let p = 0; p < f.length; p++)
        h = (h << 5) - h + f.charCodeAt(p), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let h, p = null, g, $;
      function _(...m) {
        if (!_.enabled)
          return;
        const E = _, T = Number(/* @__PURE__ */ new Date()), I = T - (h || T);
        E.diff = I, E.prev = h, E.curr = T, h = T, m[0] = n.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
        let F = 0;
        m[0] = m[0].replace(/%([a-zA-Z%])/g, (z, he) => {
          if (z === "%%")
            return "%";
          F++;
          const R = n.formatters[he];
          if (typeof R == "function") {
            const Q = m[F];
            z = R.call(E, Q), m.splice(F, 1), F--;
          }
          return z;
        }), n.formatArgs.call(E, m), (E.log || n.log).apply(E, m);
      }
      return _.namespace = f, _.useColors = n.useColors(), _.color = n.selectColor(f), _.extend = i, _.destroy = n.destroy, Object.defineProperty(_, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (g !== n.namespaces && (g = n.namespaces, $ = n.enabled(f)), $),
        set: (m) => {
          p = m;
        }
      }), typeof n.init == "function" && n.init(_), _;
    }
    function i(f, h) {
      const p = n(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return p.log = this.log, p;
    }
    function s(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of h)
        p[0] === "-" ? n.skips.push(p.slice(1)) : n.names.push(p);
    }
    function o(f, h) {
      let p = 0, g = 0, $ = -1, _ = 0;
      for (; p < f.length; )
        if (g < h.length && (h[g] === f[p] || h[g] === "*"))
          h[g] === "*" ? ($ = g, _ = p, g++) : (p++, g++);
        else if ($ !== -1)
          g = $ + 1, _++, p = _;
        else
          return !1;
      for (; g < h.length && h[g] === "*"; )
        g++;
      return g === h.length;
    }
    function a() {
      const f = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), f;
    }
    function c(f) {
      for (const h of n.skips)
        if (o(f, h))
          return !1;
      for (const h of n.names)
        if (o(f, h))
          return !0;
      return !1;
    }
    function u(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return tl = e, tl;
}
var Zh;
function Lb() {
  return Zh || (Zh = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = s, t.useColors = r, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const u = "color: " + this.color;
      c.splice(1, 0, u, "color: inherit");
      let l = 0, f = 0;
      c[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (l++, h === "%c" && (f = l));
      }), c.splice(f, 0, u);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = qg()(t);
    const { formatters: a } = e.exports;
    a.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  }(Ho, Ho.exports)), Ho.exports;
}
var Go = { exports: {} }, rl, ep;
function Ub() {
  return ep || (ep = 1, rl = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), rl;
}
var nl, tp;
function Mb() {
  if (tp) return nl;
  tp = 1;
  const e = nc, t = Yy, r = Ub(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function s(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c, u) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !u && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function a(c) {
    const u = o(c, c && c.isTTY);
    return s(u);
  }
  return nl = {
    supportsColor: a,
    stdout: s(o(!0, t.isatty(1))),
    stderr: s(o(!0, t.isatty(2)))
  }, nl;
}
var rp;
function xb() {
  return rp || (rp = 1, function(e, t) {
    const r = Yy, n = rc;
    t.init = l, t.log = a, t.formatArgs = s, t.save = c, t.load = u, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = Mb();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, p) => {
      const g = p.substring(6).toLowerCase().replace(/_([a-z])/g, (_, m) => m.toUpperCase());
      let $ = process.env[p];
      return /^(yes|on|true|enabled)$/i.test($) ? $ = !0 : /^(no|off|false|disabled)$/i.test($) ? $ = !1 : $ === "null" ? $ = null : $ = Number($), h[g] = $, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function s(h) {
      const { namespace: p, useColors: g } = this;
      if (g) {
        const $ = this.color, _ = "\x1B[3" + ($ < 8 ? $ : "8;5;" + $), m = `  ${_};1m${p} \x1B[0m`;
        h[0] = m + h[0].split(`
`).join(`
` + m), h.push(_ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = o() + p + " " + h[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function c(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function u() {
      return process.env.DEBUG;
    }
    function l(h) {
      h.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let g = 0; g < p.length; g++)
        h.inspectOpts[p[g]] = t.inspectOpts[p[g]];
    }
    e.exports = qg()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(Go, Go.exports)), Go.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Jl.exports = Lb() : Jl.exports = xb();
var qb = Jl.exports, go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
go.ProgressCallbackTransform = void 0;
const Bb = fo;
class Vb extends Bb.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
go.ProgressCallbackTransform = Vb;
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.DigestTransform = wt.HttpExecutor = wt.HttpError = void 0;
wt.createHttpError = Xl;
wt.parseJson = Xb;
wt.configureRequestOptionsFromUrl = Vg;
wt.configureRequestUrl = Mu;
wt.safeGetHeader = Ci;
wt.configureRequestOptions = La;
wt.safeStringifyJson = Ua;
const Hb = po, Gb = qb, zb = $n, Kb = fo, Bg = Ki, Wb = yn, np = Yi, Yb = go, hs = (0, Gb.default)("electron-builder");
function Xl(e, t = null) {
  return new Uu(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Ua(e.headers), t);
}
const Jb = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class Uu extends Error {
  constructor(t, r = `HTTP error: ${Jb.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
wt.HttpError = Uu;
function Xb(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class ja {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Wb.CancellationToken(), n) {
    La(t);
    const i = n == null ? void 0 : JSON.stringify(n), s = i ? Buffer.from(i) : void 0;
    if (s != null) {
      hs(i);
      const { headers: o, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": s.length,
          ...o
        },
        ...a
      };
    }
    return this.doApiRequest(t, r, (o) => o.end(s));
  }
  doApiRequest(t, r, n, i = 0) {
    return hs.enabled && hs(`Request: ${Ua(t)}`), r.createPromise((s, o, a) => {
      const c = this.createRequest(t, (u) => {
        try {
          this.handleResponse(u, t, r, s, o, i, n);
        } catch (l) {
          o(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, o, t.timeout), this.addRedirectHandlers(c, t, o, i, (u) => {
        this.doApiRequest(u, r, n, i).then(s).catch(o);
      }), n(c, o), a(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, s) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, s, o, a) {
    var c;
    if (hs.enabled && hs(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Ua(r)}`), t.statusCode === 404) {
      s(Xl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const u = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = u >= 300 && u < 400, f = Ci(t, "location");
    if (l && f != null) {
      if (o > this.maxRedirects) {
        s(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(ja.prepareRedirectUrlOptions(f, r), n, a, o).then(i).catch(s);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", s), t.on("data", (p) => h += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = Ci(t, "content-type"), g = p != null && (Array.isArray(p) ? p.find(($) => $.includes("json")) != null : p.includes("json"));
          s(Xl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${g ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (p) {
        s(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, s) => {
      const o = [], a = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      Mu(t, a), La(a), this.doDownload(a, {
        destination: null,
        options: r,
        onCancel: s,
        callback: (c) => {
          c == null ? n(Buffer.concat(o)) : i(c);
        },
        responseHandler: (c, u) => {
          let l = 0;
          c.on("data", (f) => {
            if (l += f.length, l > 524288e3) {
              u(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(f);
          }), c.on("end", () => {
            u(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (s) => {
      if (s.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${s.statusCode}: ${s.statusMessage}`));
        return;
      }
      s.on("error", r.callback);
      const o = Ci(s, "location");
      if (o != null) {
        n < this.maxRedirects ? this.doDownload(ja.prepareRedirectUrlOptions(o, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Zb(r, s) : r.responseHandler(s, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (s) => {
      this.doDownload(s, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Vg(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const s = new Bg.URL(t);
      (s.hostname.endsWith(".amazonaws.com") || s.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof Uu && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
wt.HttpExecutor = ja;
function Vg(e, t) {
  const r = La(t);
  return Mu(new Bg.URL(e), r), r;
}
function Mu(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ql extends Kb.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Hb.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, np.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, np.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
wt.DigestTransform = Ql;
function Qb(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Ci(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Zb(e, t) {
  if (!Qb(Ci(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const o = Ci(t, "content-length");
    o != null && r.push(new Yb.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ql(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ql(e.options.sha2, "sha256", "hex"));
  const i = (0, zb.createWriteStream)(e.destination);
  r.push(i);
  let s = t;
  for (const o of r)
    o.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), s = s.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function La(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Ua(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var lc = {};
Object.defineProperty(lc, "__esModule", { value: !0 });
lc.MemoLazy = void 0;
class eP {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Hg(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
lc.MemoLazy = eP;
function Hg(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), s = Object.keys(t);
    return i.length === s.length && i.every((o) => Hg(e[o], t[o]));
  }
  return e === t;
}
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
uc.githubUrl = tP;
uc.getS3LikeProviderBaseUrl = rP;
function tP(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function rP(e) {
  const t = e.provider;
  if (t === "s3")
    return nP(e);
  if (t === "spaces")
    return iP(e);
  throw new Error(`Not supported provider: ${t}`);
}
function nP(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Gg(t, e.path);
}
function Gg(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function iP(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Gg(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var xu = {};
Object.defineProperty(xu, "__esModule", { value: !0 });
xu.retry = zg;
const sP = yn;
async function zg(e, t, r, n = 0, i = 0, s) {
  var o;
  const a = new sP.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((o = s == null ? void 0 : s(c)) !== null && o !== void 0) || o) && t > 0 && !a.cancelled)
      return await new Promise((u) => setTimeout(u, r + n * i)), await zg(e, t - 1, r, n, i + 1, s);
    throw c;
  }
}
var qu = {};
Object.defineProperty(qu, "__esModule", { value: !0 });
qu.parseDn = oP;
function oP(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const s = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      r !== null && s.set(r, n);
      break;
    }
    const a = e[o];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        o++;
        const c = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(c) ? n += e[o] : (o++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && a === "=") {
        r = n, n = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        r !== null && s.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (n.length === 0)
        continue;
      if (o > i) {
        let c = o;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        o = i - 1;
        continue;
      }
    }
    n += a;
  }
  return s;
}
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.nil = xi.UUID = void 0;
const Kg = po, Wg = Yi, aP = "options.name must be either a string or a Buffer", ip = (0, Kg.randomBytes)(16);
ip[0] = ip[0] | 1;
const wa = {}, ve = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  wa[t] = e, ve[e] = t;
}
class Qn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Qn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return cP(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = lP(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (wa[t[14] + t[15]] & 240) >> 4,
        variant: sp((wa[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: sp((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Wg.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = wa[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
xi.UUID = Qn;
Qn.OID = Qn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function sp(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Rs;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Rs || (Rs = {}));
function cP(e, t, r, n, i = Rs.ASCII) {
  const s = (0, Kg.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Wg.newError)(aP, "ERR_INVALID_UUID_NAME");
  s.update(n), s.update(e);
  const a = s.digest();
  let c;
  switch (i) {
    case Rs.BINARY:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, c = a;
      break;
    case Rs.OBJECT:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, c = new Qn(a);
      break;
    default:
      c = ve[a[0]] + ve[a[1]] + ve[a[2]] + ve[a[3]] + "-" + ve[a[4]] + ve[a[5]] + "-" + ve[a[6] & 15 | r] + ve[a[7]] + "-" + ve[a[8] & 63 | 128] + ve[a[9]] + "-" + ve[a[10]] + ve[a[11]] + ve[a[12]] + ve[a[13]] + ve[a[14]] + ve[a[15]];
      break;
  }
  return c;
}
function lP(e) {
  return ve[e[0]] + ve[e[1]] + ve[e[2]] + ve[e[3]] + "-" + ve[e[4]] + ve[e[5]] + "-" + ve[e[6]] + ve[e[7]] + "-" + ve[e[8]] + ve[e[9]] + "-" + ve[e[10]] + ve[e[11]] + ve[e[12]] + ve[e[13]] + ve[e[14]] + ve[e[15]];
}
xi.nil = new Qn("00000000-0000-0000-0000-000000000000");
var vo = {}, Yg = {};
(function(e) {
  (function(t) {
    t.parser = function(w, y) {
      return new n(w, y);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = u, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(w, y) {
      if (!(this instanceof n))
        return new n(w, y);
      var D = this;
      s(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.opt = y || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!w, D.noscript = !!(w || D.opt.noscript), D.state = R.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create($)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !w), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), x(D, "onready");
    }
    Object.create || (Object.create = function(w) {
      function y() {
      }
      y.prototype = w;
      var D = new y();
      return D;
    }), Object.keys || (Object.keys = function(w) {
      var y = [];
      for (var D in w) w.hasOwnProperty(D) && y.push(D);
      return y;
    });
    function i(w) {
      for (var y = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, O = 0, W = r.length; O < W; O++) {
        var de = w[r[O]].length;
        if (de > y)
          switch (r[O]) {
            case "textNode":
              Z(w);
              break;
            case "cdata":
              B(w, "oncdata", w.cdata), w.cdata = "";
              break;
            case "script":
              B(w, "onscript", w.script), w.script = "";
              break;
            default:
              L(w, "Max buffer length exceeded: " + r[O]);
          }
        D = Math.max(D, de);
      }
      var Ee = t.MAX_BUFFER_LENGTH - D;
      w.bufferCheckPosition = Ee + w.position;
    }
    function s(w) {
      for (var y = 0, D = r.length; y < D; y++)
        w[r[y]] = "";
    }
    function o(w) {
      Z(w), w.cdata !== "" && (B(w, "oncdata", w.cdata), w.cdata = ""), w.script !== "" && (B(w, "onscript", w.script), w.script = "");
    }
    n.prototype = {
      end: function() {
        V(this);
      },
      write: A,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        o(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var c = t.EVENTS.filter(function(w) {
      return w !== "error" && w !== "end";
    });
    function u(w, y) {
      return new l(w, y);
    }
    function l(w, y) {
      if (!(this instanceof l))
        return new l(w, y);
      a.apply(this), this._parser = new n(w, y), this.writable = !0, this.readable = !0;
      var D = this;
      this._parser.onend = function() {
        D.emit("end");
      }, this._parser.onerror = function(O) {
        D.emit("error", O), D._parser.error = null;
      }, this._decoder = null, c.forEach(function(O) {
        Object.defineProperty(D, "on" + O, {
          get: function() {
            return D._parser["on" + O];
          },
          set: function(W) {
            if (!W)
              return D.removeAllListeners(O), D._parser["on" + O] = W, W;
            D.on(O, W);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(a.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(w) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(w)) {
        if (!this._decoder) {
          var y = Xw.StringDecoder;
          this._decoder = new y("utf8");
        }
        w = this._decoder.write(w);
      }
      return this._parser.write(w.toString()), this.emit("data", w), !0;
    }, l.prototype.end = function(w) {
      return w && w.length && this.write(w), this._parser.end(), !0;
    }, l.prototype.on = function(w, y) {
      var D = this;
      return !D._parser["on" + w] && c.indexOf(w) !== -1 && (D._parser["on" + w] = function() {
        var O = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        O.splice(0, 0, w), D.emit.apply(D, O);
      }), a.prototype.on.call(D, w, y);
    };
    var f = "[CDATA[", h = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", $ = { xml: p, xmlns: g }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, E = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function I(w) {
      return w === " " || w === `
` || w === "\r" || w === "	";
    }
    function F(w) {
      return w === '"' || w === "'";
    }
    function H(w) {
      return w === ">" || I(w);
    }
    function z(w, y) {
      return w.test(y);
    }
    function he(w, y) {
      return !z(w, y);
    }
    var R = 0;
    t.STATE = {
      BEGIN: R++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: R++,
      // leading whitespace
      TEXT: R++,
      // general stuff
      TEXT_ENTITY: R++,
      // &amp and such.
      OPEN_WAKA: R++,
      // <
      SGML_DECL: R++,
      // <!BLARG
      SGML_DECL_QUOTED: R++,
      // <!BLARG foo "bar
      DOCTYPE: R++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: R++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: R++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: R++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: R++,
      // <!-
      COMMENT: R++,
      // <!--
      COMMENT_ENDING: R++,
      // <!-- blah -
      COMMENT_ENDED: R++,
      // <!-- blah --
      CDATA: R++,
      // <![CDATA[ something
      CDATA_ENDING: R++,
      // ]
      CDATA_ENDING_2: R++,
      // ]]
      PROC_INST: R++,
      // <?hi
      PROC_INST_BODY: R++,
      // <?hi there
      PROC_INST_ENDING: R++,
      // <?hi "there" ?
      OPEN_TAG: R++,
      // <strong
      OPEN_TAG_SLASH: R++,
      // <strong /
      ATTRIB: R++,
      // <a
      ATTRIB_NAME: R++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: R++,
      // <a foo _
      ATTRIB_VALUE: R++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: R++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: R++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: R++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: R++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: R++,
      // <foo bar=&quot
      CLOSE_TAG: R++,
      // </a
      CLOSE_TAG_SAW_WHITE: R++,
      // </a   >
      SCRIPT: R++,
      // <script> ...
      SCRIPT_ENDING: R++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(w) {
      var y = t.ENTITIES[w], D = typeof y == "number" ? String.fromCharCode(y) : y;
      t.ENTITIES[w] = D;
    });
    for (var Q in t.STATE)
      t.STATE[t.STATE[Q]] = Q;
    R = t.STATE;
    function x(w, y, D) {
      w[y] && w[y](D);
    }
    function B(w, y, D) {
      w.textNode && Z(w), x(w, y, D);
    }
    function Z(w) {
      w.textNode = j(w.opt, w.textNode), w.textNode && x(w, "ontext", w.textNode), w.textNode = "";
    }
    function j(w, y) {
      return w.trim && (y = y.trim()), w.normalize && (y = y.replace(/\s+/g, " ")), y;
    }
    function L(w, y) {
      return Z(w), w.trackPosition && (y += `
Line: ` + w.line + `
Column: ` + w.column + `
Char: ` + w.c), y = new Error(y), w.error = y, x(w, "onerror", y), w;
    }
    function V(w) {
      return w.sawRoot && !w.closedRoot && U(w, "Unclosed root tag"), w.state !== R.BEGIN && w.state !== R.BEGIN_WHITESPACE && w.state !== R.TEXT && L(w, "Unexpected end"), Z(w), w.c = "", w.closed = !0, x(w, "onend"), n.call(w, w.strict, w.opt), w;
    }
    function U(w, y) {
      if (typeof w != "object" || !(w instanceof n))
        throw new Error("bad call to strictFail");
      w.strict && L(w, y);
    }
    function G(w) {
      w.strict || (w.tagName = w.tagName[w.looseCase]());
      var y = w.tags[w.tags.length - 1] || w, D = w.tag = { name: w.tagName, attributes: {} };
      w.opt.xmlns && (D.ns = y.ns), w.attribList.length = 0, B(w, "onopentagstart", D);
    }
    function q(w, y) {
      var D = w.indexOf(":"), O = D < 0 ? ["", w] : w.split(":"), W = O[0], de = O[1];
      return y && w === "xmlns" && (W = "xmlns", de = ""), { prefix: W, local: de };
    }
    function C(w) {
      if (w.strict || (w.attribName = w.attribName[w.looseCase]()), w.attribList.indexOf(w.attribName) !== -1 || w.tag.attributes.hasOwnProperty(w.attribName)) {
        w.attribName = w.attribValue = "";
        return;
      }
      if (w.opt.xmlns) {
        var y = q(w.attribName, !0), D = y.prefix, O = y.local;
        if (D === "xmlns")
          if (O === "xml" && w.attribValue !== p)
            U(
              w,
              "xml: prefix must be bound to " + p + `
Actual: ` + w.attribValue
            );
          else if (O === "xmlns" && w.attribValue !== g)
            U(
              w,
              "xmlns: prefix must be bound to " + g + `
Actual: ` + w.attribValue
            );
          else {
            var W = w.tag, de = w.tags[w.tags.length - 1] || w;
            W.ns === de.ns && (W.ns = Object.create(de.ns)), W.ns[O] = w.attribValue;
          }
        w.attribList.push([w.attribName, w.attribValue]);
      } else
        w.tag.attributes[w.attribName] = w.attribValue, B(w, "onattribute", {
          name: w.attribName,
          value: w.attribValue
        });
      w.attribName = w.attribValue = "";
    }
    function S(w, y) {
      if (w.opt.xmlns) {
        var D = w.tag, O = q(w.tagName);
        D.prefix = O.prefix, D.local = O.local, D.uri = D.ns[O.prefix] || "", D.prefix && !D.uri && (U(
          w,
          "Unbound namespace prefix: " + JSON.stringify(w.tagName)
        ), D.uri = O.prefix);
        var W = w.tags[w.tags.length - 1] || w;
        D.ns && W.ns !== D.ns && Object.keys(D.ns).forEach(function(Bt) {
          B(w, "onopennamespace", {
            prefix: Bt,
            uri: D.ns[Bt]
          });
        });
        for (var de = 0, Ee = w.attribList.length; de < Ee; de++) {
          var Ae = w.attribList[de], Ie = Ae[0], nt = Ae[1], Se = q(Ie, !0), qe = Se.prefix, Yt = Se.local, qt = qe === "" ? "" : D.ns[qe] || "", kt = {
            name: Ie,
            value: nt,
            prefix: qe,
            local: Yt,
            uri: qt
          };
          qe && qe !== "xmlns" && !qt && (U(
            w,
            "Unbound namespace prefix: " + JSON.stringify(qe)
          ), kt.uri = qe), w.tag.attributes[Ie] = kt, B(w, "onattribute", kt);
        }
        w.attribList.length = 0;
      }
      w.tag.isSelfClosing = !!y, w.sawRoot = !0, w.tags.push(w.tag), B(w, "onopentag", w.tag), y || (!w.noscript && w.tagName.toLowerCase() === "script" ? w.state = R.SCRIPT : w.state = R.TEXT, w.tag = null, w.tagName = ""), w.attribName = w.attribValue = "", w.attribList.length = 0;
    }
    function N(w) {
      if (!w.tagName) {
        U(w, "Weird empty close tag."), w.textNode += "</>", w.state = R.TEXT;
        return;
      }
      if (w.script) {
        if (w.tagName !== "script") {
          w.script += "</" + w.tagName + ">", w.tagName = "", w.state = R.SCRIPT;
          return;
        }
        B(w, "onscript", w.script), w.script = "";
      }
      var y = w.tags.length, D = w.tagName;
      w.strict || (D = D[w.looseCase]());
      for (var O = D; y--; ) {
        var W = w.tags[y];
        if (W.name !== O)
          U(w, "Unexpected close tag");
        else
          break;
      }
      if (y < 0) {
        U(w, "Unmatched closing tag: " + w.tagName), w.textNode += "</" + w.tagName + ">", w.state = R.TEXT;
        return;
      }
      w.tagName = D;
      for (var de = w.tags.length; de-- > y; ) {
        var Ee = w.tag = w.tags.pop();
        w.tagName = w.tag.name, B(w, "onclosetag", w.tagName);
        var Ae = {};
        for (var Ie in Ee.ns)
          Ae[Ie] = Ee.ns[Ie];
        var nt = w.tags[w.tags.length - 1] || w;
        w.opt.xmlns && Ee.ns !== nt.ns && Object.keys(Ee.ns).forEach(function(Se) {
          var qe = Ee.ns[Se];
          B(w, "onclosenamespace", { prefix: Se, uri: qe });
        });
      }
      y === 0 && (w.closedRoot = !0), w.tagName = w.attribValue = w.attribName = "", w.attribList.length = 0, w.state = R.TEXT;
    }
    function b(w) {
      var y = w.entity, D = y.toLowerCase(), O, W = "";
      return w.ENTITIES[y] ? w.ENTITIES[y] : w.ENTITIES[D] ? w.ENTITIES[D] : (y = D, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), O = parseInt(y, 16), W = O.toString(16)) : (y = y.slice(1), O = parseInt(y, 10), W = O.toString(10))), y = y.replace(/^0+/, ""), isNaN(O) || W.toLowerCase() !== y || O < 0 || O > 1114111 ? (U(w, "Invalid character entity"), "&" + w.entity + ";") : String.fromCodePoint(O));
    }
    function d(w, y) {
      y === "<" ? (w.state = R.OPEN_WAKA, w.startTagPosition = w.position) : I(y) || (U(w, "Non-whitespace before first tag."), w.textNode = y, w.state = R.TEXT);
    }
    function v(w, y) {
      var D = "";
      return y < w.length && (D = w.charAt(y)), D;
    }
    function A(w) {
      var y = this;
      if (this.error)
        throw this.error;
      if (y.closed)
        return L(
          y,
          "Cannot write after close. Assign an onready handler."
        );
      if (w === null)
        return V(y);
      typeof w == "object" && (w = w.toString());
      for (var D = 0, O = ""; O = v(w, D++), y.c = O, !!O; )
        switch (y.trackPosition && (y.position++, O === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
          case R.BEGIN:
            if (y.state = R.BEGIN_WHITESPACE, O === "\uFEFF")
              continue;
            d(y, O);
            continue;
          case R.BEGIN_WHITESPACE:
            d(y, O);
            continue;
          case R.TEXT:
            if (y.sawRoot && !y.closedRoot) {
              for (var de = D - 1; O && O !== "<" && O !== "&"; )
                O = v(w, D++), O && y.trackPosition && (y.position++, O === `
` ? (y.line++, y.column = 0) : y.column++);
              y.textNode += w.substring(de, D - 1);
            }
            O === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = R.OPEN_WAKA, y.startTagPosition = y.position) : (!I(O) && (!y.sawRoot || y.closedRoot) && U(y, "Text data outside of root node."), O === "&" ? y.state = R.TEXT_ENTITY : y.textNode += O);
            continue;
          case R.SCRIPT:
            O === "<" ? y.state = R.SCRIPT_ENDING : y.script += O;
            continue;
          case R.SCRIPT_ENDING:
            O === "/" ? y.state = R.CLOSE_TAG : (y.script += "<" + O, y.state = R.SCRIPT);
            continue;
          case R.OPEN_WAKA:
            if (O === "!")
              y.state = R.SGML_DECL, y.sgmlDecl = "";
            else if (!I(O)) if (z(_, O))
              y.state = R.OPEN_TAG, y.tagName = O;
            else if (O === "/")
              y.state = R.CLOSE_TAG, y.tagName = "";
            else if (O === "?")
              y.state = R.PROC_INST, y.procInstName = y.procInstBody = "";
            else {
              if (U(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                var W = y.position - y.startTagPosition;
                O = new Array(W).join(" ") + O;
              }
              y.textNode += "<" + O, y.state = R.TEXT;
            }
            continue;
          case R.SGML_DECL:
            if (y.sgmlDecl + O === "--") {
              y.state = R.COMMENT, y.comment = "", y.sgmlDecl = "";
              continue;
            }
            y.doctype && y.doctype !== !0 && y.sgmlDecl ? (y.state = R.DOCTYPE_DTD, y.doctype += "<!" + y.sgmlDecl + O, y.sgmlDecl = "") : (y.sgmlDecl + O).toUpperCase() === f ? (B(y, "onopencdata"), y.state = R.CDATA, y.sgmlDecl = "", y.cdata = "") : (y.sgmlDecl + O).toUpperCase() === h ? (y.state = R.DOCTYPE, (y.doctype || y.sawRoot) && U(
              y,
              "Inappropriately located doctype declaration"
            ), y.doctype = "", y.sgmlDecl = "") : O === ">" ? (B(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = R.TEXT) : (F(O) && (y.state = R.SGML_DECL_QUOTED), y.sgmlDecl += O);
            continue;
          case R.SGML_DECL_QUOTED:
            O === y.q && (y.state = R.SGML_DECL, y.q = ""), y.sgmlDecl += O;
            continue;
          case R.DOCTYPE:
            O === ">" ? (y.state = R.TEXT, B(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += O, O === "[" ? y.state = R.DOCTYPE_DTD : F(O) && (y.state = R.DOCTYPE_QUOTED, y.q = O));
            continue;
          case R.DOCTYPE_QUOTED:
            y.doctype += O, O === y.q && (y.q = "", y.state = R.DOCTYPE);
            continue;
          case R.DOCTYPE_DTD:
            O === "]" ? (y.doctype += O, y.state = R.DOCTYPE) : O === "<" ? (y.state = R.OPEN_WAKA, y.startTagPosition = y.position) : F(O) ? (y.doctype += O, y.state = R.DOCTYPE_DTD_QUOTED, y.q = O) : y.doctype += O;
            continue;
          case R.DOCTYPE_DTD_QUOTED:
            y.doctype += O, O === y.q && (y.state = R.DOCTYPE_DTD, y.q = "");
            continue;
          case R.COMMENT:
            O === "-" ? y.state = R.COMMENT_ENDING : y.comment += O;
            continue;
          case R.COMMENT_ENDING:
            O === "-" ? (y.state = R.COMMENT_ENDED, y.comment = j(y.opt, y.comment), y.comment && B(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + O, y.state = R.COMMENT);
            continue;
          case R.COMMENT_ENDED:
            O !== ">" ? (U(y, "Malformed comment"), y.comment += "--" + O, y.state = R.COMMENT) : y.doctype && y.doctype !== !0 ? y.state = R.DOCTYPE_DTD : y.state = R.TEXT;
            continue;
          case R.CDATA:
            for (var de = D - 1; O && O !== "]"; )
              O = v(w, D++), O && y.trackPosition && (y.position++, O === `
` ? (y.line++, y.column = 0) : y.column++);
            y.cdata += w.substring(de, D - 1), O === "]" && (y.state = R.CDATA_ENDING);
            continue;
          case R.CDATA_ENDING:
            O === "]" ? y.state = R.CDATA_ENDING_2 : (y.cdata += "]" + O, y.state = R.CDATA);
            continue;
          case R.CDATA_ENDING_2:
            O === ">" ? (y.cdata && B(y, "oncdata", y.cdata), B(y, "onclosecdata"), y.cdata = "", y.state = R.TEXT) : O === "]" ? y.cdata += "]" : (y.cdata += "]]" + O, y.state = R.CDATA);
            continue;
          case R.PROC_INST:
            O === "?" ? y.state = R.PROC_INST_ENDING : I(O) ? y.state = R.PROC_INST_BODY : y.procInstName += O;
            continue;
          case R.PROC_INST_BODY:
            if (!y.procInstBody && I(O))
              continue;
            O === "?" ? y.state = R.PROC_INST_ENDING : y.procInstBody += O;
            continue;
          case R.PROC_INST_ENDING:
            O === ">" ? (B(y, "onprocessinginstruction", {
              name: y.procInstName,
              body: y.procInstBody
            }), y.procInstName = y.procInstBody = "", y.state = R.TEXT) : (y.procInstBody += "?" + O, y.state = R.PROC_INST_BODY);
            continue;
          case R.OPEN_TAG:
            z(m, O) ? y.tagName += O : (G(y), O === ">" ? S(y) : O === "/" ? y.state = R.OPEN_TAG_SLASH : (I(O) || U(y, "Invalid character in tag name"), y.state = R.ATTRIB));
            continue;
          case R.OPEN_TAG_SLASH:
            O === ">" ? (S(y, !0), N(y)) : (U(
              y,
              "Forward-slash in opening tag not followed by >"
            ), y.state = R.ATTRIB);
            continue;
          case R.ATTRIB:
            if (I(O))
              continue;
            O === ">" ? S(y) : O === "/" ? y.state = R.OPEN_TAG_SLASH : z(_, O) ? (y.attribName = O, y.attribValue = "", y.state = R.ATTRIB_NAME) : U(y, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME:
            O === "=" ? y.state = R.ATTRIB_VALUE : O === ">" ? (U(y, "Attribute without value"), y.attribValue = y.attribName, C(y), S(y)) : I(O) ? y.state = R.ATTRIB_NAME_SAW_WHITE : z(m, O) ? y.attribName += O : U(y, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME_SAW_WHITE:
            if (O === "=")
              y.state = R.ATTRIB_VALUE;
            else {
              if (I(O))
                continue;
              U(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", B(y, "onattribute", {
                name: y.attribName,
                value: ""
              }), y.attribName = "", O === ">" ? S(y) : z(_, O) ? (y.attribName = O, y.state = R.ATTRIB_NAME) : (U(y, "Invalid attribute name"), y.state = R.ATTRIB);
            }
            continue;
          case R.ATTRIB_VALUE:
            if (I(O))
              continue;
            F(O) ? (y.q = O, y.state = R.ATTRIB_VALUE_QUOTED) : (y.opt.unquotedAttributeValues || L(y, "Unquoted attribute value"), y.state = R.ATTRIB_VALUE_UNQUOTED, y.attribValue = O);
            continue;
          case R.ATTRIB_VALUE_QUOTED:
            if (O !== y.q) {
              O === "&" ? y.state = R.ATTRIB_VALUE_ENTITY_Q : y.attribValue += O;
              continue;
            }
            C(y), y.q = "", y.state = R.ATTRIB_VALUE_CLOSED;
            continue;
          case R.ATTRIB_VALUE_CLOSED:
            I(O) ? y.state = R.ATTRIB : O === ">" ? S(y) : O === "/" ? y.state = R.OPEN_TAG_SLASH : z(_, O) ? (U(y, "No whitespace between attributes"), y.attribName = O, y.attribValue = "", y.state = R.ATTRIB_NAME) : U(y, "Invalid attribute name");
            continue;
          case R.ATTRIB_VALUE_UNQUOTED:
            if (!H(O)) {
              O === "&" ? y.state = R.ATTRIB_VALUE_ENTITY_U : y.attribValue += O;
              continue;
            }
            C(y), O === ">" ? S(y) : y.state = R.ATTRIB;
            continue;
          case R.CLOSE_TAG:
            if (y.tagName)
              O === ">" ? N(y) : z(m, O) ? y.tagName += O : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = R.SCRIPT) : (I(O) || U(y, "Invalid tagname in closing tag"), y.state = R.CLOSE_TAG_SAW_WHITE);
            else {
              if (I(O))
                continue;
              he(_, O) ? y.script ? (y.script += "</" + O, y.state = R.SCRIPT) : U(y, "Invalid tagname in closing tag.") : y.tagName = O;
            }
            continue;
          case R.CLOSE_TAG_SAW_WHITE:
            if (I(O))
              continue;
            O === ">" ? N(y) : U(y, "Invalid characters in closing tag");
            continue;
          case R.TEXT_ENTITY:
          case R.ATTRIB_VALUE_ENTITY_Q:
          case R.ATTRIB_VALUE_ENTITY_U:
            var Ee, Ae;
            switch (y.state) {
              case R.TEXT_ENTITY:
                Ee = R.TEXT, Ae = "textNode";
                break;
              case R.ATTRIB_VALUE_ENTITY_Q:
                Ee = R.ATTRIB_VALUE_QUOTED, Ae = "attribValue";
                break;
              case R.ATTRIB_VALUE_ENTITY_U:
                Ee = R.ATTRIB_VALUE_UNQUOTED, Ae = "attribValue";
                break;
            }
            if (O === ";") {
              var Ie = b(y);
              y.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ie) ? (y.entity = "", y.state = Ee, y.write(Ie)) : (y[Ae] += Ie, y.entity = "", y.state = Ee);
            } else z(y.entity.length ? T : E, O) ? y.entity += O : (U(y, "Invalid character in entity name"), y[Ae] += "&" + y.entity + O, y.entity = "", y.state = Ee);
            continue;
          default:
            throw new Error(y, "Unknown state: " + y.state);
        }
      return y.position >= y.bufferCheckPosition && i(y), y;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var w = String.fromCharCode, y = Math.floor, D = function() {
        var O = 16384, W = [], de, Ee, Ae = -1, Ie = arguments.length;
        if (!Ie)
          return "";
        for (var nt = ""; ++Ae < Ie; ) {
          var Se = Number(arguments[Ae]);
          if (!isFinite(Se) || // `NaN`, `+Infinity`, or `-Infinity`
          Se < 0 || // not a valid Unicode code point
          Se > 1114111 || // not a valid Unicode code point
          y(Se) !== Se)
            throw RangeError("Invalid code point: " + Se);
          Se <= 65535 ? W.push(Se) : (Se -= 65536, de = (Se >> 10) + 55296, Ee = Se % 1024 + 56320, W.push(de, Ee)), (Ae + 1 === Ie || W.length > O) && (nt += w.apply(null, W), W.length = 0);
        }
        return nt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(Yg);
Object.defineProperty(vo, "__esModule", { value: !0 });
vo.XElement = void 0;
vo.parseXml = hP;
const uP = Yg, zo = Yi;
class Jg {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, zo.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!dP(t))
      throw (0, zo.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, zo.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, zo.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (op(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => op(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
vo.XElement = Jg;
const fP = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function dP(e) {
  return fP.test(e);
}
function op(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function hP(e) {
  let t = null;
  const r = uP.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const s = new Jg(i.name);
    if (s.attributes = i.attributes, t === null)
      t = s;
    else {
      const o = n[n.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(s);
    }
    n.push(s);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const s = n[n.length - 1];
    s.value = i, s.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = yn;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Yi;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = wt;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = lc;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var s = go;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var o = uc;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } });
  var a = xu;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var c = qu;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var u = xi;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return u.UUID;
  } });
  var l = vo;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(Ye);
var rt = {}, Bu = {}, ar = {};
function Xg(e) {
  return typeof e > "u" || e === null;
}
function pP(e) {
  return typeof e == "object" && e !== null;
}
function mP(e) {
  return Array.isArray(e) ? e : Xg(e) ? [] : [e];
}
function yP(e, t) {
  var r, n, i, s;
  if (t)
    for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1)
      i = s[r], e[i] = t[i];
  return e;
}
function gP(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function vP(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
ar.isNothing = Xg;
ar.isObject = pP;
ar.toArray = mP;
ar.repeat = gP;
ar.isNegativeZero = vP;
ar.extend = yP;
function Qg(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Ws(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Qg(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ws.prototype = Object.create(Error.prototype);
Ws.prototype.constructor = Ws;
Ws.prototype.toString = function(t) {
  return this.name + ": " + Qg(this, t);
};
var _o = Ws, Es = ar;
function il(e, t, r, n, i) {
  var s = "", o = "", a = Math.floor(i / 2) - 1;
  return n - t > a && (s = " ... ", t = n - a + s.length), r - n > a && (o = " ...", r = n + a - o.length), {
    str: s + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: n - t + s.length
    // relative position
  };
}
function sl(e, t) {
  return Es.repeat(" ", t - e.length) + e;
}
function _P(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], s, o = -1; s = r.exec(e.buffer); )
    i.push(s.index), n.push(s.index + s[0].length), e.position <= s.index && o < 0 && (o = n.length - 2);
  o < 0 && (o = n.length - 1);
  var a = "", c, u, l = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(o - c < 0); c++)
    u = il(
      e.buffer,
      n[o - c],
      i[o - c],
      e.position - (n[o] - n[o - c]),
      f
    ), a = Es.repeat(" ", t.indent) + sl((e.line - c + 1).toString(), l) + " | " + u.str + `
` + a;
  for (u = il(e.buffer, n[o], i[o], e.position, f), a += Es.repeat(" ", t.indent) + sl((e.line + 1).toString(), l) + " | " + u.str + `
`, a += Es.repeat("-", t.indent + l + 3 + u.pos) + `^
`, c = 1; c <= t.linesAfter && !(o + c >= i.length); c++)
    u = il(
      e.buffer,
      n[o + c],
      i[o + c],
      e.position - (n[o] - n[o + c]),
      f
    ), a += Es.repeat(" ", t.indent) + sl((e.line + c + 1).toString(), l) + " | " + u.str + `
`;
  return a.replace(/\n$/, "");
}
var $P = _P, ap = _o, wP = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], EP = [
  "scalar",
  "sequence",
  "mapping"
];
function SP(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function bP(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (wP.indexOf(r) === -1)
      throw new ap('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = SP(t.styleAliases || null), EP.indexOf(this.kind) === -1)
    throw new ap('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var bt = bP, ps = _o, ol = bt;
function cp(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(s, o) {
      s.tag === n.tag && s.kind === n.kind && s.multi === n.multi && (i = o);
    }), r[i] = n;
  }), r;
}
function PP() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Zl(e) {
  return this.extend(e);
}
Zl.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof ol)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new ps("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(s) {
    if (!(s instanceof ol))
      throw new ps("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new ps("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new ps("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(s) {
    if (!(s instanceof ol))
      throw new ps("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Zl.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = cp(i, "implicit"), i.compiledExplicit = cp(i, "explicit"), i.compiledTypeMap = PP(i.compiledImplicit, i.compiledExplicit), i;
};
var Zg = Zl, TP = bt, e0 = new TP("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), AP = bt, t0 = new AP("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), NP = bt, r0 = new NP("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), OP = Zg, n0 = new OP({
  explicit: [
    e0,
    t0,
    r0
  ]
}), RP = bt;
function IP(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function CP() {
  return null;
}
function kP(e) {
  return e === null;
}
var i0 = new RP("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: IP,
  construct: CP,
  predicate: kP,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), DP = bt;
function FP(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function jP(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function LP(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var s0 = new DP("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: FP,
  construct: jP,
  predicate: LP,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), UP = ar, MP = bt;
function xP(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function qP(e) {
  return 48 <= e && e <= 55;
}
function BP(e) {
  return 48 <= e && e <= 57;
}
function VP(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!xP(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!qP(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!BP(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function HP(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function GP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !UP.isNegativeZero(e);
}
var o0 = new MP("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: VP,
  construct: HP,
  predicate: GP,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), a0 = ar, zP = bt, KP = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function WP(e) {
  return !(e === null || !KP.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function YP(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var JP = /^[-+]?[0-9]+e/;
function XP(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (a0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), JP.test(r) ? r.replace("e", ".e") : r;
}
function QP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || a0.isNegativeZero(e));
}
var c0 = new zP("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: WP,
  construct: YP,
  predicate: QP,
  represent: XP,
  defaultStyle: "lowercase"
}), l0 = n0.extend({
  implicit: [
    i0,
    s0,
    o0,
    c0
  ]
}), u0 = l0, ZP = bt, f0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), d0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function e1(e) {
  return e === null ? !1 : f0.exec(e) !== null || d0.exec(e) !== null;
}
function t1(e) {
  var t, r, n, i, s, o, a, c = 0, u = null, l, f, h;
  if (t = f0.exec(e), t === null && (t = d0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (s = +t[4], o = +t[5], a = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], f = +(t[11] || 0), u = (l * 60 + f) * 6e4, t[9] === "-" && (u = -u)), h = new Date(Date.UTC(r, n, i, s, o, a, c)), u && h.setTime(h.getTime() - u), h;
}
function r1(e) {
  return e.toISOString();
}
var h0 = new ZP("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: e1,
  construct: t1,
  instanceOf: Date,
  represent: r1
}), n1 = bt;
function i1(e) {
  return e === "<<" || e === null;
}
var p0 = new n1("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: i1
}), s1 = bt, Vu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function o1(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, s = Vu;
  for (r = 0; r < i; r++)
    if (t = s.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function a1(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, s = Vu, o = 0, a = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (a.push(o >> 16 & 255), a.push(o >> 8 & 255), a.push(o & 255)), o = o << 6 | s.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (a.push(o >> 16 & 255), a.push(o >> 8 & 255), a.push(o & 255)) : r === 18 ? (a.push(o >> 10 & 255), a.push(o >> 2 & 255)) : r === 12 && a.push(o >> 4 & 255), new Uint8Array(a);
}
function c1(e) {
  var t = "", r = 0, n, i, s = e.length, o = Vu;
  for (n = 0; n < s; n++)
    n % 3 === 0 && n && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[n];
  return i = s % 3, i === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : i === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : i === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
function l1(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var m0 = new s1("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: o1,
  construct: a1,
  predicate: l1,
  represent: c1
}), u1 = bt, f1 = Object.prototype.hasOwnProperty, d1 = Object.prototype.toString;
function h1(e) {
  if (e === null) return !0;
  var t = [], r, n, i, s, o, a = e;
  for (r = 0, n = a.length; r < n; r += 1) {
    if (i = a[r], o = !1, d1.call(i) !== "[object Object]") return !1;
    for (s in i)
      if (f1.call(i, s))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(s) === -1) t.push(s);
    else return !1;
  }
  return !0;
}
function p1(e) {
  return e !== null ? e : [];
}
var y0 = new u1("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: h1,
  construct: p1
}), m1 = bt, y1 = Object.prototype.toString;
function g1(e) {
  if (e === null) return !0;
  var t, r, n, i, s, o = e;
  for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (n = o[t], y1.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    s[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function v1(e) {
  if (e === null) return [];
  var t, r, n, i, s, o = e;
  for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    n = o[t], i = Object.keys(n), s[t] = [i[0], n[i[0]]];
  return s;
}
var g0 = new m1("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: g1,
  construct: v1
}), _1 = bt, $1 = Object.prototype.hasOwnProperty;
function w1(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if ($1.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function E1(e) {
  return e !== null ? e : {};
}
var v0 = new _1("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: w1,
  construct: E1
}), Hu = u0.extend({
  implicit: [
    h0,
    p0
  ],
  explicit: [
    m0,
    y0,
    g0,
    v0
  ]
}), qn = ar, _0 = _o, S1 = $P, b1 = Hu, gn = Object.prototype.hasOwnProperty, Ma = 1, $0 = 2, w0 = 3, xa = 4, al = 1, P1 = 2, lp = 3, T1 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, A1 = /[\x85\u2028\u2029]/, N1 = /[,\[\]\{\}]/, E0 = /^(?:!|!!|![a-z\-]+!)$/i, S0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function up(e) {
  return Object.prototype.toString.call(e);
}
function gr(e) {
  return e === 10 || e === 13;
}
function Xn(e) {
  return e === 9 || e === 32;
}
function Ct(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Si(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function O1(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function R1(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function I1(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function fp(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function C1(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function b0(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var P0 = new Array(256), T0 = new Array(256);
for (var li = 0; li < 256; li++)
  P0[li] = fp(li) ? 1 : 0, T0[li] = fp(li);
function k1(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || b1, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function A0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = S1(r), new _0(t, r);
}
function re(e, t) {
  throw A0(e, t);
}
function qa(e, t) {
  e.onWarning && e.onWarning.call(null, A0(e, t));
}
var dp = {
  YAML: function(t, r, n) {
    var i, s, o;
    t.version !== null && re(t, "duplication of %YAML directive"), n.length !== 1 && re(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && re(t, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), o = parseInt(i[2], 10), s !== 1 && re(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && qa(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, s;
    n.length !== 2 && re(t, "TAG directive accepts exactly two arguments"), i = n[0], s = n[1], E0.test(i) || re(t, "ill-formed tag handle (first argument) of the TAG directive"), gn.call(t.tagMap, i) && re(t, 'there is a previously declared suffix for "' + i + '" tag handle'), S0.test(s) || re(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      re(t, "tag prefix is malformed: " + s);
    }
    t.tagMap[i] = s;
  }
};
function fn(e, t, r, n) {
  var i, s, o, a;
  if (t < r) {
    if (a = e.input.slice(t, r), n)
      for (i = 0, s = a.length; i < s; i += 1)
        o = a.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || re(e, "expected valid JSON character");
    else T1.test(a) && re(e, "the stream contains non-printable characters");
    e.result += a;
  }
}
function hp(e, t, r, n) {
  var i, s, o, a;
  for (qn.isObject(r) || re(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), o = 0, a = i.length; o < a; o += 1)
    s = i[o], gn.call(t, s) || (b0(t, s, r[s]), n[s] = !0);
}
function bi(e, t, r, n, i, s, o, a, c) {
  var u, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), u = 0, l = i.length; u < l; u += 1)
      Array.isArray(i[u]) && re(e, "nested arrays are not supported inside keys"), typeof i == "object" && up(i[u]) === "[object Object]" && (i[u] = "[object Object]");
  if (typeof i == "object" && up(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (u = 0, l = s.length; u < l; u += 1)
        hp(e, t, s[u], r);
    else
      hp(e, t, s, r);
  else
    !e.json && !gn.call(r, i) && gn.call(t, i) && (e.line = o || e.line, e.lineStart = a || e.lineStart, e.position = c || e.position, re(e, "duplicated mapping key")), b0(t, i, s), delete r[i];
  return t;
}
function Gu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : re(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function xe(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Xn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (gr(i))
      for (Gu(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && qa(e, "deficient indentation"), n;
}
function fc(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Ct(r)));
}
function zu(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += qn.repeat(`
`, t - 1));
}
function D1(e, t, r) {
  var n, i, s, o, a, c, u, l, f = e.kind, h = e.result, p;
  if (p = e.input.charCodeAt(e.position), Ct(p) || Si(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), Ct(i) || r && Si(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", s = o = e.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Ct(i) || r && Si(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Ct(n))
        break;
    } else {
      if (e.position === e.lineStart && fc(e) || r && Si(p))
        break;
      if (gr(p))
        if (c = e.line, u = e.lineStart, l = e.lineIndent, xe(e, !1, -1), e.lineIndent >= t) {
          a = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = u, e.lineIndent = l;
          break;
        }
    }
    a && (fn(e, s, o, !1), zu(e, e.line - c), s = o = e.position, a = !1), Xn(p) || (o = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return fn(e, s, o, !1), e.result ? !0 : (e.kind = f, e.result = h, !1);
}
function F1(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (fn(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else gr(r) ? (fn(e, n, i, !0), zu(e, xe(e, !1, t)), n = i = e.position) : e.position === e.lineStart && fc(e) ? re(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  re(e, "unexpected end of the stream within a single quoted scalar");
}
function j1(e, t) {
  var r, n, i, s, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
    if (a === 34)
      return fn(e, r, e.position, !0), e.position++, !0;
    if (a === 92) {
      if (fn(e, r, e.position, !0), a = e.input.charCodeAt(++e.position), gr(a))
        xe(e, !1, t);
      else if (a < 256 && P0[a])
        e.result += T0[a], e.position++;
      else if ((o = R1(a)) > 0) {
        for (i = o, s = 0; i > 0; i--)
          a = e.input.charCodeAt(++e.position), (o = O1(a)) >= 0 ? s = (s << 4) + o : re(e, "expected hexadecimal character");
        e.result += C1(s), e.position++;
      } else
        re(e, "unknown escape sequence");
      r = n = e.position;
    } else gr(a) ? (fn(e, r, n, !0), zu(e, xe(e, !1, t)), r = n = e.position) : e.position === e.lineStart && fc(e) ? re(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  re(e, "unexpected end of the stream within a double quoted scalar");
}
function L1(e, t) {
  var r = !0, n, i, s, o = e.tag, a, c = e.anchor, u, l, f, h, p, g = /* @__PURE__ */ Object.create(null), $, _, m, E;
  if (E = e.input.charCodeAt(e.position), E === 91)
    l = 93, p = !1, a = [];
  else if (E === 123)
    l = 125, p = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), E = e.input.charCodeAt(++e.position); E !== 0; ) {
    if (xe(e, !0, t), E = e.input.charCodeAt(e.position), E === l)
      return e.position++, e.tag = o, e.anchor = c, e.kind = p ? "mapping" : "sequence", e.result = a, !0;
    r ? E === 44 && re(e, "expected the node content, but found ','") : re(e, "missed comma between flow collection entries"), _ = $ = m = null, f = h = !1, E === 63 && (u = e.input.charCodeAt(e.position + 1), Ct(u) && (f = h = !0, e.position++, xe(e, !0, t))), n = e.line, i = e.lineStart, s = e.position, qi(e, t, Ma, !1, !0), _ = e.tag, $ = e.result, xe(e, !0, t), E = e.input.charCodeAt(e.position), (h || e.line === n) && E === 58 && (f = !0, E = e.input.charCodeAt(++e.position), xe(e, !0, t), qi(e, t, Ma, !1, !0), m = e.result), p ? bi(e, a, g, _, $, m, n, i, s) : f ? a.push(bi(e, null, g, _, $, m, n, i, s)) : a.push($), xe(e, !0, t), E = e.input.charCodeAt(e.position), E === 44 ? (r = !0, E = e.input.charCodeAt(++e.position)) : r = !1;
  }
  re(e, "unexpected end of the stream within a flow collection");
}
function U1(e, t) {
  var r, n, i = al, s = !1, o = !1, a = t, c = 0, u = !1, l, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      al === i ? i = f === 43 ? lp : P1 : re(e, "repeat of a chomping mode identifier");
    else if ((l = I1(f)) >= 0)
      l === 0 ? re(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? re(e, "repeat of an indentation width identifier") : (a = t + l - 1, o = !0);
    else
      break;
  if (Xn(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Xn(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!gr(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Gu(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < a) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > a && (a = e.lineIndent), gr(f)) {
      c++;
      continue;
    }
    if (e.lineIndent < a) {
      i === lp ? e.result += qn.repeat(`
`, s ? 1 + c : c) : i === al && s && (e.result += `
`);
      break;
    }
    for (n ? Xn(f) ? (u = !0, e.result += qn.repeat(`
`, s ? 1 + c : c)) : u ? (u = !1, e.result += qn.repeat(`
`, c + 1)) : c === 0 ? s && (e.result += " ") : e.result += qn.repeat(`
`, c) : e.result += qn.repeat(`
`, s ? 1 + c : c), s = !0, o = !0, c = 0, r = e.position; !gr(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    fn(e, r, e.position, !1);
  }
  return !0;
}
function pp(e, t) {
  var r, n = e.tag, i = e.anchor, s = [], o, a = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !Ct(o)))); ) {
    if (a = !0, e.position++, xe(e, !0, -1) && e.lineIndent <= t) {
      s.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, qi(e, t, w0, !1, !0), s.push(e.result), xe(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      re(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return a ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = s, !0) : !1;
}
function M1(e, t, r) {
  var n, i, s, o, a, c, u = e.tag, l = e.anchor, f = {}, h = /* @__PURE__ */ Object.create(null), p = null, g = null, $ = null, _ = !1, m = !1, E;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), E = e.input.charCodeAt(e.position); E !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), s = e.line, (E === 63 || E === 58) && Ct(n))
      E === 63 ? (_ && (bi(e, f, h, p, g, null, o, a, c), p = g = $ = null), m = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : re(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, E = n;
    else {
      if (o = e.line, a = e.lineStart, c = e.position, !qi(e, r, $0, !1, !0))
        break;
      if (e.line === s) {
        for (E = e.input.charCodeAt(e.position); Xn(E); )
          E = e.input.charCodeAt(++e.position);
        if (E === 58)
          E = e.input.charCodeAt(++e.position), Ct(E) || re(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (bi(e, f, h, p, g, null, o, a, c), p = g = $ = null), m = !0, _ = !1, i = !1, p = e.tag, g = e.result;
        else if (m)
          re(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = u, e.anchor = l, !0;
      } else if (m)
        re(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = u, e.anchor = l, !0;
    }
    if ((e.line === s || e.lineIndent > t) && (_ && (o = e.line, a = e.lineStart, c = e.position), qi(e, t, xa, !0, i) && (_ ? g = e.result : $ = e.result), _ || (bi(e, f, h, p, g, $, o, a, c), p = g = $ = null), xe(e, !0, -1), E = e.input.charCodeAt(e.position)), (e.line === s || e.lineIndent > t) && E !== 0)
      re(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && bi(e, f, h, p, g, null, o, a, c), m && (e.tag = u, e.anchor = l, e.kind = "mapping", e.result = f), m;
}
function x1(e) {
  var t, r = !1, n = !1, i, s, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && re(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (s = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : re(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Ct(o); )
      o === 33 && (n ? re(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), E0.test(i) || re(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    s = e.input.slice(t, e.position), N1.test(s) && re(e, "tag suffix cannot contain flow indicator characters");
  }
  s && !S0.test(s) && re(e, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    re(e, "tag name is malformed: " + s);
  }
  return r ? e.tag = s : gn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + s : i === "!" ? e.tag = "!" + s : i === "!!" ? e.tag = "tag:yaml.org,2002:" + s : re(e, 'undeclared tag handle "' + i + '"'), !0;
}
function q1(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && re(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Ct(r) && !Si(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function B1(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ct(n) && !Si(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), gn.call(e.anchorMap, r) || re(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], xe(e, !0, -1), !0;
}
function qi(e, t, r, n, i) {
  var s, o, a, c = 1, u = !1, l = !1, f, h, p, g, $, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, s = o = a = xa === r || w0 === r, n && xe(e, !0, -1) && (u = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; x1(e) || q1(e); )
      xe(e, !0, -1) ? (u = !0, a = s, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : a = !1;
  if (a && (a = u || i), (c === 1 || xa === r) && (Ma === r || $0 === r ? $ = t : $ = t + 1, _ = e.position - e.lineStart, c === 1 ? a && (pp(e, _) || M1(e, _, $)) || L1(e, $) ? l = !0 : (o && U1(e, $) || F1(e, $) || j1(e, $) ? l = !0 : B1(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && re(e, "alias node should not have any properties")) : D1(e, $, Ma === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = a && pp(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && re(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, h = e.implicitTypes.length; f < h; f += 1)
      if (g = e.implicitTypes[f], g.resolve(e.result)) {
        e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (gn.call(e.typeMap[e.kind || "fallback"], e.tag))
      g = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (g = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, h = p.length; f < h; f += 1)
        if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
          g = p[f];
          break;
        }
    g || re(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && re(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + g.kind + '", not "' + e.kind + '"'), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : re(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function V1(e) {
  var t = e.position, r, n, i, s = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (xe(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (s = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !Ct(o); )
      o = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && re(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; Xn(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !gr(o));
        break;
      }
      if (gr(o)) break;
      for (r = e.position; o !== 0 && !Ct(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    o !== 0 && Gu(e), gn.call(dp, n) ? dp[n](e, n, i) : qa(e, 'unknown document directive "' + n + '"');
  }
  if (xe(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, xe(e, !0, -1)) : s && re(e, "directives end mark is expected"), qi(e, e.lineIndent - 1, xa, !1, !0), xe(e, !0, -1), e.checkLineBreaks && A1.test(e.input.slice(t, e.position)) && qa(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && fc(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, xe(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    re(e, "end of the stream or a document separator is expected");
  else
    return;
}
function N0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new k1(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, re(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    V1(r);
  return r.documents;
}
function H1(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = N0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, s = n.length; i < s; i += 1)
    t(n[i]);
}
function G1(e, t) {
  var r = N0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new _0("expected a single document in the stream, but found more");
  }
}
Bu.loadAll = H1;
Bu.load = G1;
var O0 = {}, dc = ar, $o = _o, z1 = Hu, R0 = Object.prototype.toString, I0 = Object.prototype.hasOwnProperty, Ku = 65279, K1 = 9, Ys = 10, W1 = 13, Y1 = 32, J1 = 33, X1 = 34, eu = 35, Q1 = 37, Z1 = 38, eT = 39, tT = 42, C0 = 44, rT = 45, Ba = 58, nT = 61, iT = 62, sT = 63, oT = 64, k0 = 91, D0 = 93, aT = 96, F0 = 123, cT = 124, j0 = 125, ht = {};
ht[0] = "\\0";
ht[7] = "\\a";
ht[8] = "\\b";
ht[9] = "\\t";
ht[10] = "\\n";
ht[11] = "\\v";
ht[12] = "\\f";
ht[13] = "\\r";
ht[27] = "\\e";
ht[34] = '\\"';
ht[92] = "\\\\";
ht[133] = "\\N";
ht[160] = "\\_";
ht[8232] = "\\L";
ht[8233] = "\\P";
var lT = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], uT = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function fT(e, t) {
  var r, n, i, s, o, a, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
    o = n[i], a = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && I0.call(c.styleAliases, a) && (a = c.styleAliases[a]), r[o] = a;
  return r;
}
function dT(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new $o("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + dc.repeat("0", n - t.length) + t;
}
var hT = 1, Js = 2;
function pT(e) {
  this.schema = e.schema || z1, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = dc.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = fT(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Js : hT, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function mp(e, t) {
  for (var r = dc.repeat(" ", t), n = 0, i = -1, s = "", o, a = e.length; n < a; )
    i = e.indexOf(`
`, n), i === -1 ? (o = e.slice(n), n = a) : (o = e.slice(n, i + 1), n = i + 1), o.length && o !== `
` && (s += r), s += o;
  return s;
}
function tu(e, t) {
  return `
` + dc.repeat(" ", e.indent * t);
}
function mT(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Va(e) {
  return e === Y1 || e === K1;
}
function Xs(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Ku || 65536 <= e && e <= 1114111;
}
function yp(e) {
  return Xs(e) && e !== Ku && e !== W1 && e !== Ys;
}
function gp(e, t, r) {
  var n = yp(e), i = n && !Va(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== C0 && e !== k0 && e !== D0 && e !== F0 && e !== j0) && e !== eu && !(t === Ba && !i) || yp(t) && !Va(t) && e === eu || t === Ba && i
  );
}
function yT(e) {
  return Xs(e) && e !== Ku && !Va(e) && e !== rT && e !== sT && e !== Ba && e !== C0 && e !== k0 && e !== D0 && e !== F0 && e !== j0 && e !== eu && e !== Z1 && e !== tT && e !== J1 && e !== cT && e !== nT && e !== iT && e !== eT && e !== X1 && e !== Q1 && e !== oT && e !== aT;
}
function gT(e) {
  return !Va(e) && e !== Ba;
}
function Ss(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function L0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var U0 = 1, ru = 2, M0 = 3, x0 = 4, $i = 5;
function vT(e, t, r, n, i, s, o, a) {
  var c, u = 0, l = null, f = !1, h = !1, p = n !== -1, g = -1, $ = yT(Ss(e, 0)) && gT(Ss(e, e.length - 1));
  if (t || o)
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = Ss(e, c), !Xs(u))
        return $i;
      $ = $ && gp(u, l, a), l = u;
    }
  else {
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = Ss(e, c), u === Ys)
        f = !0, p && (h = h || // Foldable line = too long, and not more-indented.
        c - g - 1 > n && e[g + 1] !== " ", g = c);
      else if (!Xs(u))
        return $i;
      $ = $ && gp(u, l, a), l = u;
    }
    h = h || p && c - g - 1 > n && e[g + 1] !== " ";
  }
  return !f && !h ? $ && !o && !i(e) ? U0 : s === Js ? $i : ru : r > 9 && L0(e) ? $i : o ? s === Js ? $i : ru : h ? x0 : M0;
}
function _T(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Js ? '""' : "''";
    if (!e.noCompatMode && (lT.indexOf(t) !== -1 || uT.test(t)))
      return e.quotingType === Js ? '"' + t + '"' : "'" + t + "'";
    var s = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s), a = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(u) {
      return mT(e, u);
    }
    switch (vT(
      t,
      a,
      e.indent,
      o,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case U0:
        return t;
      case ru:
        return "'" + t.replace(/'/g, "''") + "'";
      case M0:
        return "|" + vp(t, e.indent) + _p(mp(t, s));
      case x0:
        return ">" + vp(t, e.indent) + _p(mp($T(t, o), s));
      case $i:
        return '"' + wT(t) + '"';
      default:
        throw new $o("impossible error: invalid scalar style");
    }
  }();
}
function vp(e, t) {
  var r = L0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), s = i ? "+" : n ? "" : "-";
  return r + s + `
`;
}
function _p(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function $T(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var u = e.indexOf(`
`);
    return u = u !== -1 ? u : e.length, r.lastIndex = u, $p(e.slice(0, u), t);
  }(), i = e[0] === `
` || e[0] === " ", s, o; o = r.exec(e); ) {
    var a = o[1], c = o[2];
    s = c[0] === " ", n += a + (!i && !s && c !== "" ? `
` : "") + $p(c, t), i = s;
  }
  return n;
}
function $p(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, s, o = 0, a = 0, c = ""; n = r.exec(e); )
    a = n.index, a - i > t && (s = o > i ? o : a, c += `
` + e.slice(i, s), i = s + 1), o = a;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function wT(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Ss(e, i), n = ht[r], !n && Xs(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || dT(r);
  return t;
}
function ET(e, t, r) {
  var n = "", i = e.tag, s, o, a;
  for (s = 0, o = r.length; s < o; s += 1)
    a = r[s], e.replacer && (a = e.replacer.call(r, String(s), a)), (Lr(e, t, a, !1, !1) || typeof a > "u" && Lr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function wp(e, t, r, n) {
  var i = "", s = e.tag, o, a, c;
  for (o = 0, a = r.length; o < a; o += 1)
    c = r[o], e.replacer && (c = e.replacer.call(r, String(o), c)), (Lr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Lr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += tu(e, t)), e.dump && Ys === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = s, e.dump = i || "[]";
}
function ST(e, t, r) {
  var n = "", i = e.tag, s = Object.keys(r), o, a, c, u, l;
  for (o = 0, a = s.length; o < a; o += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = s[o], u = r[c], e.replacer && (u = e.replacer.call(r, c, u)), Lr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Lr(e, t, u, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function bT(e, t, r, n) {
  var i = "", s = e.tag, o = Object.keys(r), a, c, u, l, f, h;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new $o("sortKeys must be a boolean or a function");
  for (a = 0, c = o.length; a < c; a += 1)
    h = "", (!n || i !== "") && (h += tu(e, t)), u = o[a], l = r[u], e.replacer && (l = e.replacer.call(r, u, l)), Lr(e, t + 1, u, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Ys === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, f && (h += tu(e, t)), Lr(e, t + 1, l, !0, f) && (e.dump && Ys === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = s, e.dump = i || "{}";
}
function Ep(e, t, r) {
  var n, i, s, o, a, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, s = 0, o = i.length; s < o; s += 1)
    if (a = i[s], (a.instanceOf || a.predicate) && (!a.instanceOf || typeof t == "object" && t instanceof a.instanceOf) && (!a.predicate || a.predicate(t))) {
      if (r ? a.multi && a.representName ? e.tag = a.representName(t) : e.tag = a.tag : e.tag = "?", a.represent) {
        if (c = e.styleMap[a.tag] || a.defaultStyle, R0.call(a.represent) === "[object Function]")
          n = a.represent(t, c);
        else if (I0.call(a.represent, c))
          n = a.represent[c](t, c);
        else
          throw new $o("!<" + a.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Lr(e, t, r, n, i, s, o) {
  e.tag = null, e.dump = r, Ep(e, r, !1) || Ep(e, r, !0);
  var a = R0.call(e.dump), c = n, u;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = a === "[object Object]" || a === "[object Array]", f, h;
  if (l && (f = e.duplicates.indexOf(r), h = f !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (l && h && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), a === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (bT(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (ST(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (a === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? wp(e, t - 1, e.dump, i) : wp(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (ET(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && _T(e, e.dump, t, s, c);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new $o("unacceptable kind of an object to dump " + a);
    }
    e.tag !== null && e.tag !== "?" && (u = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? u = "!" + u : u.slice(0, 18) === "tag:yaml.org,2002:" ? u = "!!" + u.slice(18) : u = "!<" + u + ">", e.dump = u + " " + e.dump);
  }
  return !0;
}
function PT(e, t) {
  var r = [], n = [], i, s;
  for (nu(e, r, n), i = 0, s = n.length; i < s; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(s);
}
function nu(e, t, r) {
  var n, i, s;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, s = e.length; i < s; i += 1)
        nu(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1)
        nu(e[n[i]], t, r);
}
function TT(e, t) {
  t = t || {};
  var r = new pT(t);
  r.noRefs || PT(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Lr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
O0.dump = TT;
var q0 = Bu, AT = O0;
function Wu(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
rt.Type = bt;
rt.Schema = Zg;
rt.FAILSAFE_SCHEMA = n0;
rt.JSON_SCHEMA = l0;
rt.CORE_SCHEMA = u0;
rt.DEFAULT_SCHEMA = Hu;
rt.load = q0.load;
rt.loadAll = q0.loadAll;
rt.dump = AT.dump;
rt.YAMLException = _o;
rt.types = {
  binary: m0,
  float: c0,
  map: r0,
  null: i0,
  pairs: g0,
  set: v0,
  timestamp: h0,
  bool: s0,
  int: o0,
  merge: p0,
  omap: y0,
  seq: t0,
  str: e0
};
rt.safeLoad = Wu("safeLoad", "load");
rt.safeLoadAll = Wu("safeLoadAll", "loadAll");
rt.safeDump = Wu("safeDump", "dump");
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
hc.Lazy = void 0;
class NT {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
hc.Lazy = NT;
var iu = { exports: {} };
const OT = "2.0.0", B0 = 256, RT = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, IT = 16, CT = B0 - 6, kT = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var pc = {
  MAX_LENGTH: B0,
  MAX_SAFE_COMPONENT_LENGTH: IT,
  MAX_SAFE_BUILD_LENGTH: CT,
  MAX_SAFE_INTEGER: RT,
  RELEASE_TYPES: kT,
  SEMVER_SPEC_VERSION: OT,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const DT = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var mc = DT;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = pc, s = mc;
  t = e.exports = {};
  const o = t.re = [], a = t.safeRe = [], c = t.src = [], u = t.safeSrc = [], l = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], g = (_) => {
    for (const [m, E] of p)
      _ = _.split(`${m}*`).join(`${m}{0,${E}}`).split(`${m}+`).join(`${m}{1,${E}}`);
    return _;
  }, $ = (_, m, E) => {
    const T = g(m), I = f++;
    s(_, I, m), l[_] = I, c[I] = m, u[I] = T, o[I] = new RegExp(m, E ? "g" : void 0), a[I] = new RegExp(T, E ? "g" : void 0);
  };
  $("NUMERICIDENTIFIER", "0|[1-9]\\d*"), $("NUMERICIDENTIFIERLOOSE", "\\d+"), $("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), $("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), $("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), $("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), $("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), $("BUILDIDENTIFIER", `${h}+`), $("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), $("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), $("FULL", `^${c[l.FULLPLAIN]}$`), $("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), $("LOOSE", `^${c[l.LOOSEPLAIN]}$`), $("GTLT", "((?:<|>)?=?)"), $("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), $("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), $("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), $("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), $("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), $("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), $("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), $("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), $("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), $("COERCERTL", c[l.COERCE], !0), $("COERCERTLFULL", c[l.COERCEFULL], !0), $("LONETILDE", "(?:~>?)"), $("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", $("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), $("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), $("LONECARET", "(?:\\^)"), $("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", $("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), $("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), $("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), $("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), $("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", $("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), $("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), $("STAR", "(<|>)?=?\\s*\\*"), $("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), $("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(iu, iu.exports);
var wo = iu.exports;
const FT = Object.freeze({ loose: !0 }), jT = Object.freeze({}), LT = (e) => e ? typeof e != "object" ? FT : e : jT;
var Yu = LT;
const Sp = /^[0-9]+$/, V0 = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Sp.test(e), n = Sp.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, UT = (e, t) => V0(t, e);
var H0 = {
  compareIdentifiers: V0,
  rcompareIdentifiers: UT
};
const Ko = mc, { MAX_LENGTH: bp, MAX_SAFE_INTEGER: Wo } = pc, { safeRe: Yo, t: Jo } = wo, MT = Yu, { compareIdentifiers: cl } = H0;
let xT = class ur {
  constructor(t, r) {
    if (r = MT(r), t instanceof ur) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > bp)
      throw new TypeError(
        `version is longer than ${bp} characters`
      );
    Ko("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Yo[Jo.LOOSE] : Yo[Jo.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Wo || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Wo || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Wo || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < Wo)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Ko("SemVer.compare", this.version, this.options, t), !(t instanceof ur)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ur(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ur || (t = new ur(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ur || (t = new ur(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Ko("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return cl(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ur || (t = new ur(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Ko("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return cl(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Yo[Jo.PRERELEASELOOSE] : Yo[Jo.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]), cl(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Pt = xT;
const Pp = Pt, qT = (e, t, r = !1) => {
  if (e instanceof Pp)
    return e;
  try {
    return new Pp(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ji = qT;
const BT = Ji, VT = (e, t) => {
  const r = BT(e, t);
  return r ? r.version : null;
};
var HT = VT;
const GT = Ji, zT = (e, t) => {
  const r = GT(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var KT = zT;
const Tp = Pt, WT = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Tp(
      e instanceof Tp ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var YT = WT;
const Ap = Ji, JT = (e, t) => {
  const r = Ap(e, null, !0), n = Ap(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const s = i > 0, o = s ? r : n, a = s ? n : r, c = !!o.prerelease.length;
  if (!!a.prerelease.length && !c) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(o) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var XT = JT;
const QT = Pt, ZT = (e, t) => new QT(e, t).major;
var eA = ZT;
const tA = Pt, rA = (e, t) => new tA(e, t).minor;
var nA = rA;
const iA = Pt, sA = (e, t) => new iA(e, t).patch;
var oA = sA;
const aA = Ji, cA = (e, t) => {
  const r = aA(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var lA = cA;
const Np = Pt, uA = (e, t, r) => new Np(e, r).compare(new Np(t, r));
var cr = uA;
const fA = cr, dA = (e, t, r) => fA(t, e, r);
var hA = dA;
const pA = cr, mA = (e, t) => pA(e, t, !0);
var yA = mA;
const Op = Pt, gA = (e, t, r) => {
  const n = new Op(e, r), i = new Op(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Ju = gA;
const vA = Ju, _A = (e, t) => e.sort((r, n) => vA(r, n, t));
var $A = _A;
const wA = Ju, EA = (e, t) => e.sort((r, n) => wA(n, r, t));
var SA = EA;
const bA = cr, PA = (e, t, r) => bA(e, t, r) > 0;
var yc = PA;
const TA = cr, AA = (e, t, r) => TA(e, t, r) < 0;
var Xu = AA;
const NA = cr, OA = (e, t, r) => NA(e, t, r) === 0;
var G0 = OA;
const RA = cr, IA = (e, t, r) => RA(e, t, r) !== 0;
var z0 = IA;
const CA = cr, kA = (e, t, r) => CA(e, t, r) >= 0;
var Qu = kA;
const DA = cr, FA = (e, t, r) => DA(e, t, r) <= 0;
var Zu = FA;
const jA = G0, LA = z0, UA = yc, MA = Qu, xA = Xu, qA = Zu, BA = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return jA(e, r, n);
    case "!=":
      return LA(e, r, n);
    case ">":
      return UA(e, r, n);
    case ">=":
      return MA(e, r, n);
    case "<":
      return xA(e, r, n);
    case "<=":
      return qA(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var K0 = BA;
const VA = Pt, HA = Ji, { safeRe: Xo, t: Qo } = wo, GA = (e, t) => {
  if (e instanceof VA)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Xo[Qo.COERCEFULL] : Xo[Qo.COERCE]);
  else {
    const c = t.includePrerelease ? Xo[Qo.COERCERTLFULL] : Xo[Qo.COERCERTL];
    let u;
    for (; (u = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), c.lastIndex = u.index + u[1].length + u[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", a = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return HA(`${n}.${i}.${s}${o}${a}`, t);
};
var zA = GA;
class KA {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var WA = KA, ll, Rp;
function lr() {
  if (Rp) return ll;
  Rp = 1;
  const e = /\s+/g;
  class t {
    constructor(L, V) {
      if (V = i(V), L instanceof t)
        return L.loose === !!V.loose && L.includePrerelease === !!V.includePrerelease ? L : new t(L.raw, V);
      if (L instanceof s)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = V, this.loose = !!V.loose, this.includePrerelease = !!V.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((U) => this.parseRange(U.trim())).filter((U) => U.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const U = this.set[0];
        if (this.set = this.set.filter((G) => !$(G[0])), this.set.length === 0)
          this.set = [U];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && _(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const V = this.set[L];
          for (let U = 0; U < V.length; U++)
            U > 0 && (this.formatted += " "), this.formatted += V[U].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(L) {
      const U = ((this.options.includePrerelease && p) | (this.options.loose && g)) + ":" + L, G = n.get(U);
      if (G)
        return G;
      const q = this.options.loose, C = q ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
      L = L.replace(C, B(this.options.includePrerelease)), o("hyphen replace", L), L = L.replace(c[u.COMPARATORTRIM], l), o("comparator trim", L), L = L.replace(c[u.TILDETRIM], f), o("tilde trim", L), L = L.replace(c[u.CARETTRIM], h), o("caret trim", L);
      let S = L.split(" ").map((v) => E(v, this.options)).join(" ").split(/\s+/).map((v) => x(v, this.options));
      q && (S = S.filter((v) => (o("loose invalid filter", v, this.options), !!v.match(c[u.COMPARATORLOOSE])))), o("range list", S);
      const N = /* @__PURE__ */ new Map(), b = S.map((v) => new s(v, this.options));
      for (const v of b) {
        if ($(v))
          return [v];
        N.set(v.value, v);
      }
      N.size > 1 && N.has("") && N.delete("");
      const d = [...N.values()];
      return n.set(U, d), d;
    }
    intersects(L, V) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((U) => m(U, V) && L.set.some((G) => m(G, V) && U.every((q) => G.every((C) => q.intersects(C, V)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new a(L, this.options);
        } catch {
          return !1;
        }
      for (let V = 0; V < this.set.length; V++)
        if (Z(this.set[V], L, this.options))
          return !0;
      return !1;
    }
  }
  ll = t;
  const r = WA, n = new r(), i = Yu, s = gc(), o = mc, a = Pt, {
    safeRe: c,
    t: u,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = wo, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = pc, $ = (j) => j.value === "<0.0.0-0", _ = (j) => j.value === "", m = (j, L) => {
    let V = !0;
    const U = j.slice();
    let G = U.pop();
    for (; V && U.length; )
      V = U.every((q) => G.intersects(q, L)), G = U.pop();
    return V;
  }, E = (j, L) => (j = j.replace(c[u.BUILD], ""), o("comp", j, L), j = H(j, L), o("caret", j), j = I(j, L), o("tildes", j), j = he(j, L), o("xrange", j), j = Q(j, L), o("stars", j), j), T = (j) => !j || j.toLowerCase() === "x" || j === "*", I = (j, L) => j.trim().split(/\s+/).map((V) => F(V, L)).join(" "), F = (j, L) => {
    const V = L.loose ? c[u.TILDELOOSE] : c[u.TILDE];
    return j.replace(V, (U, G, q, C, S) => {
      o("tilde", j, U, G, q, C, S);
      let N;
      return T(G) ? N = "" : T(q) ? N = `>=${G}.0.0 <${+G + 1}.0.0-0` : T(C) ? N = `>=${G}.${q}.0 <${G}.${+q + 1}.0-0` : S ? (o("replaceTilde pr", S), N = `>=${G}.${q}.${C}-${S} <${G}.${+q + 1}.0-0`) : N = `>=${G}.${q}.${C} <${G}.${+q + 1}.0-0`, o("tilde return", N), N;
    });
  }, H = (j, L) => j.trim().split(/\s+/).map((V) => z(V, L)).join(" "), z = (j, L) => {
    o("caret", j, L);
    const V = L.loose ? c[u.CARETLOOSE] : c[u.CARET], U = L.includePrerelease ? "-0" : "";
    return j.replace(V, (G, q, C, S, N) => {
      o("caret", j, G, q, C, S, N);
      let b;
      return T(q) ? b = "" : T(C) ? b = `>=${q}.0.0${U} <${+q + 1}.0.0-0` : T(S) ? q === "0" ? b = `>=${q}.${C}.0${U} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.0${U} <${+q + 1}.0.0-0` : N ? (o("replaceCaret pr", N), q === "0" ? C === "0" ? b = `>=${q}.${C}.${S}-${N} <${q}.${C}.${+S + 1}-0` : b = `>=${q}.${C}.${S}-${N} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.${S}-${N} <${+q + 1}.0.0-0`) : (o("no pr"), q === "0" ? C === "0" ? b = `>=${q}.${C}.${S}${U} <${q}.${C}.${+S + 1}-0` : b = `>=${q}.${C}.${S}${U} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.${S} <${+q + 1}.0.0-0`), o("caret return", b), b;
    });
  }, he = (j, L) => (o("replaceXRanges", j, L), j.split(/\s+/).map((V) => R(V, L)).join(" ")), R = (j, L) => {
    j = j.trim();
    const V = L.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
    return j.replace(V, (U, G, q, C, S, N) => {
      o("xRange", j, U, G, q, C, S, N);
      const b = T(q), d = b || T(C), v = d || T(S), A = v;
      return G === "=" && A && (G = ""), N = L.includePrerelease ? "-0" : "", b ? G === ">" || G === "<" ? U = "<0.0.0-0" : U = "*" : G && A ? (d && (C = 0), S = 0, G === ">" ? (G = ">=", d ? (q = +q + 1, C = 0, S = 0) : (C = +C + 1, S = 0)) : G === "<=" && (G = "<", d ? q = +q + 1 : C = +C + 1), G === "<" && (N = "-0"), U = `${G + q}.${C}.${S}${N}`) : d ? U = `>=${q}.0.0${N} <${+q + 1}.0.0-0` : v && (U = `>=${q}.${C}.0${N} <${q}.${+C + 1}.0-0`), o("xRange return", U), U;
    });
  }, Q = (j, L) => (o("replaceStars", j, L), j.trim().replace(c[u.STAR], "")), x = (j, L) => (o("replaceGTE0", j, L), j.trim().replace(c[L.includePrerelease ? u.GTE0PRE : u.GTE0], "")), B = (j) => (L, V, U, G, q, C, S, N, b, d, v, A) => (T(U) ? V = "" : T(G) ? V = `>=${U}.0.0${j ? "-0" : ""}` : T(q) ? V = `>=${U}.${G}.0${j ? "-0" : ""}` : C ? V = `>=${V}` : V = `>=${V}${j ? "-0" : ""}`, T(b) ? N = "" : T(d) ? N = `<${+b + 1}.0.0-0` : T(v) ? N = `<${b}.${+d + 1}.0-0` : A ? N = `<=${b}.${d}.${v}-${A}` : j ? N = `<${b}.${d}.${+v + 1}-0` : N = `<=${N}`, `${V} ${N}`.trim()), Z = (j, L, V) => {
    for (let U = 0; U < j.length; U++)
      if (!j[U].test(L))
        return !1;
    if (L.prerelease.length && !V.includePrerelease) {
      for (let U = 0; U < j.length; U++)
        if (o(j[U].semver), j[U].semver !== s.ANY && j[U].semver.prerelease.length > 0) {
          const G = j[U].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ll;
}
var ul, Ip;
function gc() {
  if (Ip) return ul;
  Ip = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, f) {
      if (f = r(f), l instanceof t) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = l.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, f) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  ul = t;
  const r = Yu, { safeRe: n, t: i } = wo, s = K0, o = mc, a = Pt, c = lr();
  return ul;
}
const YA = lr(), JA = (e, t, r) => {
  try {
    t = new YA(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var vc = JA;
const XA = lr(), QA = (e, t) => new XA(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var ZA = QA;
const eN = Pt, tN = lr(), rN = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new tN(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new eN(n, r));
  }), n;
};
var nN = rN;
const iN = Pt, sN = lr(), oN = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new sN(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new iN(n, r));
  }), n;
};
var aN = oN;
const fl = Pt, cN = lr(), Cp = yc, lN = (e, t) => {
  e = new cN(e, t);
  let r = new fl("0.0.0");
  if (e.test(r) || (r = new fl("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((o) => {
      const a = new fl(o.semver.version);
      switch (o.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!s || Cp(a, s)) && (s = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), s && (!r || Cp(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var uN = lN;
const fN = lr(), dN = (e, t) => {
  try {
    return new fN(e, t).range || "*";
  } catch {
    return null;
  }
};
var hN = dN;
const pN = Pt, W0 = gc(), { ANY: mN } = W0, yN = lr(), gN = vc, kp = yc, Dp = Xu, vN = Zu, _N = Qu, $N = (e, t, r, n) => {
  e = new pN(e, n), t = new yN(t, n);
  let i, s, o, a, c;
  switch (r) {
    case ">":
      i = kp, s = vN, o = Dp, a = ">", c = ">=";
      break;
    case "<":
      i = Dp, s = _N, o = kp, a = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (gN(e, t, n))
    return !1;
  for (let u = 0; u < t.set.length; ++u) {
    const l = t.set[u];
    let f = null, h = null;
    if (l.forEach((p) => {
      p.semver === mN && (p = new W0(">=0.0.0")), f = f || p, h = h || p, i(p.semver, f.semver, n) ? f = p : o(p.semver, h.semver, n) && (h = p);
    }), f.operator === a || f.operator === c || (!h.operator || h.operator === a) && s(e, h.semver))
      return !1;
    if (h.operator === c && o(e, h.semver))
      return !1;
  }
  return !0;
};
var ef = $N;
const wN = ef, EN = (e, t, r) => wN(e, t, ">", r);
var SN = EN;
const bN = ef, PN = (e, t, r) => bN(e, t, "<", r);
var TN = PN;
const Fp = lr(), AN = (e, t, r) => (e = new Fp(e, r), t = new Fp(t, r), e.intersects(t, r));
var NN = AN;
const ON = vc, RN = cr;
var IN = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const o = e.sort((l, f) => RN(l, f, r));
  for (const l of o)
    ON(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const a = [];
  for (const [l, f] of n)
    l === f ? a.push(l) : !f && l === o[0] ? a.push("*") : f ? l === o[0] ? a.push(`<=${f}`) : a.push(`${l} - ${f}`) : a.push(`>=${l}`);
  const c = a.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < u.length ? c : t;
};
const jp = lr(), tf = gc(), { ANY: dl } = tf, ms = vc, rf = cr, CN = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new jp(e, r), t = new jp(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const o = DN(i, s, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, kN = [new tf(">=0.0.0-0")], Lp = [new tf(">=0.0.0")], DN = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === dl) {
    if (t.length === 1 && t[0].semver === dl)
      return !0;
    r.includePrerelease ? e = kN : e = Lp;
  }
  if (t.length === 1 && t[0].semver === dl) {
    if (r.includePrerelease)
      return !0;
    t = Lp;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = Up(i, p, r) : p.operator === "<" || p.operator === "<=" ? s = Mp(s, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let o;
  if (i && s) {
    if (o = rf(i.semver, s.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !ms(p, String(i), r) || s && !ms(p, String(s), r))
      return null;
    for (const g of t)
      if (!ms(p, String(g), r))
        return !1;
    return !0;
  }
  let a, c, u, l, f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const p of t) {
    if (l = l || p.operator === ">" || p.operator === ">=", u = u || p.operator === "<" || p.operator === "<=", i) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === ">" || p.operator === ">=") {
        if (a = Up(i, p, r), a === p && a !== i)
          return !1;
      } else if (i.operator === ">=" && !ms(i.semver, String(p), r))
        return !1;
    }
    if (s) {
      if (f && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === f.major && p.semver.minor === f.minor && p.semver.patch === f.patch && (f = !1), p.operator === "<" || p.operator === "<=") {
        if (c = Mp(s, p, r), c === p && c !== s)
          return !1;
      } else if (s.operator === "<=" && !ms(s.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (s || i) && o !== 0)
      return !1;
  }
  return !(i && u && !s && o !== 0 || s && l && !i && o !== 0 || h || f);
}, Up = (e, t, r) => {
  if (!e)
    return t;
  const n = rf(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Mp = (e, t, r) => {
  if (!e)
    return t;
  const n = rf(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var FN = CN;
const hl = wo, xp = pc, jN = Pt, qp = H0, LN = Ji, UN = HT, MN = KT, xN = YT, qN = XT, BN = eA, VN = nA, HN = oA, GN = lA, zN = cr, KN = hA, WN = yA, YN = Ju, JN = $A, XN = SA, QN = yc, ZN = Xu, eO = G0, tO = z0, rO = Qu, nO = Zu, iO = K0, sO = zA, oO = gc(), aO = lr(), cO = vc, lO = ZA, uO = nN, fO = aN, dO = uN, hO = hN, pO = ef, mO = SN, yO = TN, gO = NN, vO = IN, _O = FN;
var nf = {
  parse: LN,
  valid: UN,
  clean: MN,
  inc: xN,
  diff: qN,
  major: BN,
  minor: VN,
  patch: HN,
  prerelease: GN,
  compare: zN,
  rcompare: KN,
  compareLoose: WN,
  compareBuild: YN,
  sort: JN,
  rsort: XN,
  gt: QN,
  lt: ZN,
  eq: eO,
  neq: tO,
  gte: rO,
  lte: nO,
  cmp: iO,
  coerce: sO,
  Comparator: oO,
  Range: aO,
  satisfies: cO,
  toComparators: lO,
  maxSatisfying: uO,
  minSatisfying: fO,
  minVersion: dO,
  validRange: hO,
  outside: pO,
  gtr: mO,
  ltr: yO,
  intersects: gO,
  simplifyRange: vO,
  subset: _O,
  SemVer: jN,
  re: hl.re,
  src: hl.src,
  tokens: hl.t,
  SEMVER_SPEC_VERSION: xp.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: xp.RELEASE_TYPES,
  compareIdentifiers: qp.compareIdentifiers,
  rcompareIdentifiers: qp.rcompareIdentifiers
};
const ui = /* @__PURE__ */ ic(nf);
var Eo = {}, Ha = { exports: {} };
Ha.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, s = 2, o = 9007199254740991, a = "[object Arguments]", c = "[object Array]", u = "[object AsyncFunction]", l = "[object Boolean]", f = "[object Date]", h = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", $ = "[object Map]", _ = "[object Number]", m = "[object Null]", E = "[object Object]", T = "[object Promise]", I = "[object Proxy]", F = "[object RegExp]", H = "[object Set]", z = "[object String]", he = "[object Symbol]", R = "[object Undefined]", Q = "[object WeakMap]", x = "[object ArrayBuffer]", B = "[object DataView]", Z = "[object Float32Array]", j = "[object Float64Array]", L = "[object Int8Array]", V = "[object Int16Array]", U = "[object Int32Array]", G = "[object Uint8Array]", q = "[object Uint8ClampedArray]", C = "[object Uint16Array]", S = "[object Uint32Array]", N = /[\\^$.*+?()[\]{}|]/g, b = /^\[object .+?Constructor\]$/, d = /^(?:0|[1-9]\d*)$/, v = {};
  v[Z] = v[j] = v[L] = v[V] = v[U] = v[G] = v[q] = v[C] = v[S] = !0, v[a] = v[c] = v[x] = v[l] = v[B] = v[f] = v[h] = v[p] = v[$] = v[_] = v[E] = v[F] = v[H] = v[z] = v[Q] = !1;
  var A = typeof _t == "object" && _t && _t.Object === Object && _t, w = typeof self == "object" && self && self.Object === Object && self, y = A || w || Function("return this")(), D = t && !t.nodeType && t, O = D && !0 && e && !e.nodeType && e, W = O && O.exports === D, de = W && A.process, Ee = function() {
    try {
      return de && de.binding && de.binding("util");
    } catch {
    }
  }(), Ae = Ee && Ee.isTypedArray;
  function Ie(P, k) {
    for (var M = -1, J = P == null ? 0 : P.length, Ne = 0, ae = []; ++M < J; ) {
      var je = P[M];
      k(je, M, P) && (ae[Ne++] = je);
    }
    return ae;
  }
  function nt(P, k) {
    for (var M = -1, J = k.length, Ne = P.length; ++M < J; )
      P[Ne + M] = k[M];
    return P;
  }
  function Se(P, k) {
    for (var M = -1, J = P == null ? 0 : P.length; ++M < J; )
      if (k(P[M], M, P))
        return !0;
    return !1;
  }
  function qe(P, k) {
    for (var M = -1, J = Array(P); ++M < P; )
      J[M] = k(M);
    return J;
  }
  function Yt(P) {
    return function(k) {
      return P(k);
    };
  }
  function qt(P, k) {
    return P.has(k);
  }
  function kt(P, k) {
    return P == null ? void 0 : P[k];
  }
  function Bt(P) {
    var k = -1, M = Array(P.size);
    return P.forEach(function(J, Ne) {
      M[++k] = [Ne, J];
    }), M;
  }
  function wr(P, k) {
    return function(M) {
      return P(k(M));
    };
  }
  function Er(P) {
    var k = -1, M = Array(P.size);
    return P.forEach(function(J) {
      M[++k] = J;
    }), M;
  }
  var Sr = Array.prototype, Dt = Function.prototype, Vt = Object.prototype, br = y["__core-js_shared__"], qr = Dt.toString, At = Vt.hasOwnProperty, ch = function() {
    var P = /[^.]+$/.exec(br && br.keys && br.keys.IE_PROTO || "");
    return P ? "Symbol(src)_1." + P : "";
  }(), lh = Vt.toString, Y$ = RegExp(
    "^" + qr.call(At).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), uh = W ? y.Buffer : void 0, Do = y.Symbol, fh = y.Uint8Array, dh = Vt.propertyIsEnumerable, J$ = Sr.splice, Nn = Do ? Do.toStringTag : void 0, hh = Object.getOwnPropertySymbols, X$ = uh ? uh.isBuffer : void 0, Q$ = wr(Object.keys, Object), Hc = ai(y, "DataView"), as = ai(y, "Map"), Gc = ai(y, "Promise"), zc = ai(y, "Set"), Kc = ai(y, "WeakMap"), cs = ai(Object, "create"), Z$ = In(Hc), ew = In(as), tw = In(Gc), rw = In(zc), nw = In(Kc), ph = Do ? Do.prototype : void 0, Wc = ph ? ph.valueOf : void 0;
  function On(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function iw() {
    this.__data__ = cs ? cs(null) : {}, this.size = 0;
  }
  function sw(P) {
    var k = this.has(P) && delete this.__data__[P];
    return this.size -= k ? 1 : 0, k;
  }
  function ow(P) {
    var k = this.__data__;
    if (cs) {
      var M = k[P];
      return M === n ? void 0 : M;
    }
    return At.call(k, P) ? k[P] : void 0;
  }
  function aw(P) {
    var k = this.__data__;
    return cs ? k[P] !== void 0 : At.call(k, P);
  }
  function cw(P, k) {
    var M = this.__data__;
    return this.size += this.has(P) ? 0 : 1, M[P] = cs && k === void 0 ? n : k, this;
  }
  On.prototype.clear = iw, On.prototype.delete = sw, On.prototype.get = ow, On.prototype.has = aw, On.prototype.set = cw;
  function Pr(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function lw() {
    this.__data__ = [], this.size = 0;
  }
  function uw(P) {
    var k = this.__data__, M = jo(k, P);
    if (M < 0)
      return !1;
    var J = k.length - 1;
    return M == J ? k.pop() : J$.call(k, M, 1), --this.size, !0;
  }
  function fw(P) {
    var k = this.__data__, M = jo(k, P);
    return M < 0 ? void 0 : k[M][1];
  }
  function dw(P) {
    return jo(this.__data__, P) > -1;
  }
  function hw(P, k) {
    var M = this.__data__, J = jo(M, P);
    return J < 0 ? (++this.size, M.push([P, k])) : M[J][1] = k, this;
  }
  Pr.prototype.clear = lw, Pr.prototype.delete = uw, Pr.prototype.get = fw, Pr.prototype.has = dw, Pr.prototype.set = hw;
  function Rn(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function pw() {
    this.size = 0, this.__data__ = {
      hash: new On(),
      map: new (as || Pr)(),
      string: new On()
    };
  }
  function mw(P) {
    var k = Lo(this, P).delete(P);
    return this.size -= k ? 1 : 0, k;
  }
  function yw(P) {
    return Lo(this, P).get(P);
  }
  function gw(P) {
    return Lo(this, P).has(P);
  }
  function vw(P, k) {
    var M = Lo(this, P), J = M.size;
    return M.set(P, k), this.size += M.size == J ? 0 : 1, this;
  }
  Rn.prototype.clear = pw, Rn.prototype.delete = mw, Rn.prototype.get = yw, Rn.prototype.has = gw, Rn.prototype.set = vw;
  function Fo(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.__data__ = new Rn(); ++k < M; )
      this.add(P[k]);
  }
  function _w(P) {
    return this.__data__.set(P, n), this;
  }
  function $w(P) {
    return this.__data__.has(P);
  }
  Fo.prototype.add = Fo.prototype.push = _w, Fo.prototype.has = $w;
  function Br(P) {
    var k = this.__data__ = new Pr(P);
    this.size = k.size;
  }
  function ww() {
    this.__data__ = new Pr(), this.size = 0;
  }
  function Ew(P) {
    var k = this.__data__, M = k.delete(P);
    return this.size = k.size, M;
  }
  function Sw(P) {
    return this.__data__.get(P);
  }
  function bw(P) {
    return this.__data__.has(P);
  }
  function Pw(P, k) {
    var M = this.__data__;
    if (M instanceof Pr) {
      var J = M.__data__;
      if (!as || J.length < r - 1)
        return J.push([P, k]), this.size = ++M.size, this;
      M = this.__data__ = new Rn(J);
    }
    return M.set(P, k), this.size = M.size, this;
  }
  Br.prototype.clear = ww, Br.prototype.delete = Ew, Br.prototype.get = Sw, Br.prototype.has = bw, Br.prototype.set = Pw;
  function Tw(P, k) {
    var M = Uo(P), J = !M && qw(P), Ne = !M && !J && Yc(P), ae = !M && !J && !Ne && Sh(P), je = M || J || Ne || ae, ze = je ? qe(P.length, String) : [], Je = ze.length;
    for (var ke in P)
      At.call(P, ke) && !(je && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ke == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Ne && (ke == "offset" || ke == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ae && (ke == "buffer" || ke == "byteLength" || ke == "byteOffset") || // Skip index properties.
      jw(ke, Je))) && ze.push(ke);
    return ze;
  }
  function jo(P, k) {
    for (var M = P.length; M--; )
      if (_h(P[M][0], k))
        return M;
    return -1;
  }
  function Aw(P, k, M) {
    var J = k(P);
    return Uo(P) ? J : nt(J, M(P));
  }
  function ls(P) {
    return P == null ? P === void 0 ? R : m : Nn && Nn in Object(P) ? Dw(P) : xw(P);
  }
  function mh(P) {
    return us(P) && ls(P) == a;
  }
  function yh(P, k, M, J, Ne) {
    return P === k ? !0 : P == null || k == null || !us(P) && !us(k) ? P !== P && k !== k : Nw(P, k, M, J, yh, Ne);
  }
  function Nw(P, k, M, J, Ne, ae) {
    var je = Uo(P), ze = Uo(k), Je = je ? c : Vr(P), ke = ze ? c : Vr(k);
    Je = Je == a ? E : Je, ke = ke == a ? E : ke;
    var Ft = Je == E, Jt = ke == E, it = Je == ke;
    if (it && Yc(P)) {
      if (!Yc(k))
        return !1;
      je = !0, Ft = !1;
    }
    if (it && !Ft)
      return ae || (ae = new Br()), je || Sh(P) ? gh(P, k, M, J, Ne, ae) : Cw(P, k, Je, M, J, Ne, ae);
    if (!(M & i)) {
      var Ht = Ft && At.call(P, "__wrapped__"), Gt = Jt && At.call(k, "__wrapped__");
      if (Ht || Gt) {
        var Hr = Ht ? P.value() : P, Tr = Gt ? k.value() : k;
        return ae || (ae = new Br()), Ne(Hr, Tr, M, J, ae);
      }
    }
    return it ? (ae || (ae = new Br()), kw(P, k, M, J, Ne, ae)) : !1;
  }
  function Ow(P) {
    if (!Eh(P) || Uw(P))
      return !1;
    var k = $h(P) ? Y$ : b;
    return k.test(In(P));
  }
  function Rw(P) {
    return us(P) && wh(P.length) && !!v[ls(P)];
  }
  function Iw(P) {
    if (!Mw(P))
      return Q$(P);
    var k = [];
    for (var M in Object(P))
      At.call(P, M) && M != "constructor" && k.push(M);
    return k;
  }
  function gh(P, k, M, J, Ne, ae) {
    var je = M & i, ze = P.length, Je = k.length;
    if (ze != Je && !(je && Je > ze))
      return !1;
    var ke = ae.get(P);
    if (ke && ae.get(k))
      return ke == k;
    var Ft = -1, Jt = !0, it = M & s ? new Fo() : void 0;
    for (ae.set(P, k), ae.set(k, P); ++Ft < ze; ) {
      var Ht = P[Ft], Gt = k[Ft];
      if (J)
        var Hr = je ? J(Gt, Ht, Ft, k, P, ae) : J(Ht, Gt, Ft, P, k, ae);
      if (Hr !== void 0) {
        if (Hr)
          continue;
        Jt = !1;
        break;
      }
      if (it) {
        if (!Se(k, function(Tr, Cn) {
          if (!qt(it, Cn) && (Ht === Tr || Ne(Ht, Tr, M, J, ae)))
            return it.push(Cn);
        })) {
          Jt = !1;
          break;
        }
      } else if (!(Ht === Gt || Ne(Ht, Gt, M, J, ae))) {
        Jt = !1;
        break;
      }
    }
    return ae.delete(P), ae.delete(k), Jt;
  }
  function Cw(P, k, M, J, Ne, ae, je) {
    switch (M) {
      case B:
        if (P.byteLength != k.byteLength || P.byteOffset != k.byteOffset)
          return !1;
        P = P.buffer, k = k.buffer;
      case x:
        return !(P.byteLength != k.byteLength || !ae(new fh(P), new fh(k)));
      case l:
      case f:
      case _:
        return _h(+P, +k);
      case h:
        return P.name == k.name && P.message == k.message;
      case F:
      case z:
        return P == k + "";
      case $:
        var ze = Bt;
      case H:
        var Je = J & i;
        if (ze || (ze = Er), P.size != k.size && !Je)
          return !1;
        var ke = je.get(P);
        if (ke)
          return ke == k;
        J |= s, je.set(P, k);
        var Ft = gh(ze(P), ze(k), J, Ne, ae, je);
        return je.delete(P), Ft;
      case he:
        if (Wc)
          return Wc.call(P) == Wc.call(k);
    }
    return !1;
  }
  function kw(P, k, M, J, Ne, ae) {
    var je = M & i, ze = vh(P), Je = ze.length, ke = vh(k), Ft = ke.length;
    if (Je != Ft && !je)
      return !1;
    for (var Jt = Je; Jt--; ) {
      var it = ze[Jt];
      if (!(je ? it in k : At.call(k, it)))
        return !1;
    }
    var Ht = ae.get(P);
    if (Ht && ae.get(k))
      return Ht == k;
    var Gt = !0;
    ae.set(P, k), ae.set(k, P);
    for (var Hr = je; ++Jt < Je; ) {
      it = ze[Jt];
      var Tr = P[it], Cn = k[it];
      if (J)
        var bh = je ? J(Cn, Tr, it, k, P, ae) : J(Tr, Cn, it, P, k, ae);
      if (!(bh === void 0 ? Tr === Cn || Ne(Tr, Cn, M, J, ae) : bh)) {
        Gt = !1;
        break;
      }
      Hr || (Hr = it == "constructor");
    }
    if (Gt && !Hr) {
      var Mo = P.constructor, xo = k.constructor;
      Mo != xo && "constructor" in P && "constructor" in k && !(typeof Mo == "function" && Mo instanceof Mo && typeof xo == "function" && xo instanceof xo) && (Gt = !1);
    }
    return ae.delete(P), ae.delete(k), Gt;
  }
  function vh(P) {
    return Aw(P, Hw, Fw);
  }
  function Lo(P, k) {
    var M = P.__data__;
    return Lw(k) ? M[typeof k == "string" ? "string" : "hash"] : M.map;
  }
  function ai(P, k) {
    var M = kt(P, k);
    return Ow(M) ? M : void 0;
  }
  function Dw(P) {
    var k = At.call(P, Nn), M = P[Nn];
    try {
      P[Nn] = void 0;
      var J = !0;
    } catch {
    }
    var Ne = lh.call(P);
    return J && (k ? P[Nn] = M : delete P[Nn]), Ne;
  }
  var Fw = hh ? function(P) {
    return P == null ? [] : (P = Object(P), Ie(hh(P), function(k) {
      return dh.call(P, k);
    }));
  } : Gw, Vr = ls;
  (Hc && Vr(new Hc(new ArrayBuffer(1))) != B || as && Vr(new as()) != $ || Gc && Vr(Gc.resolve()) != T || zc && Vr(new zc()) != H || Kc && Vr(new Kc()) != Q) && (Vr = function(P) {
    var k = ls(P), M = k == E ? P.constructor : void 0, J = M ? In(M) : "";
    if (J)
      switch (J) {
        case Z$:
          return B;
        case ew:
          return $;
        case tw:
          return T;
        case rw:
          return H;
        case nw:
          return Q;
      }
    return k;
  });
  function jw(P, k) {
    return k = k ?? o, !!k && (typeof P == "number" || d.test(P)) && P > -1 && P % 1 == 0 && P < k;
  }
  function Lw(P) {
    var k = typeof P;
    return k == "string" || k == "number" || k == "symbol" || k == "boolean" ? P !== "__proto__" : P === null;
  }
  function Uw(P) {
    return !!ch && ch in P;
  }
  function Mw(P) {
    var k = P && P.constructor, M = typeof k == "function" && k.prototype || Vt;
    return P === M;
  }
  function xw(P) {
    return lh.call(P);
  }
  function In(P) {
    if (P != null) {
      try {
        return qr.call(P);
      } catch {
      }
      try {
        return P + "";
      } catch {
      }
    }
    return "";
  }
  function _h(P, k) {
    return P === k || P !== P && k !== k;
  }
  var qw = mh(/* @__PURE__ */ function() {
    return arguments;
  }()) ? mh : function(P) {
    return us(P) && At.call(P, "callee") && !dh.call(P, "callee");
  }, Uo = Array.isArray;
  function Bw(P) {
    return P != null && wh(P.length) && !$h(P);
  }
  var Yc = X$ || zw;
  function Vw(P, k) {
    return yh(P, k);
  }
  function $h(P) {
    if (!Eh(P))
      return !1;
    var k = ls(P);
    return k == p || k == g || k == u || k == I;
  }
  function wh(P) {
    return typeof P == "number" && P > -1 && P % 1 == 0 && P <= o;
  }
  function Eh(P) {
    var k = typeof P;
    return P != null && (k == "object" || k == "function");
  }
  function us(P) {
    return P != null && typeof P == "object";
  }
  var Sh = Ae ? Yt(Ae) : Rw;
  function Hw(P) {
    return Bw(P) ? Tw(P) : Iw(P);
  }
  function Gw() {
    return [];
  }
  function zw() {
    return !1;
  }
  e.exports = Vw;
})(Ha, Ha.exports);
var $O = Ha.exports;
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.DownloadedUpdateHelper = void 0;
Eo.createTempUpdateFile = PO;
const wO = po, EO = $n, Bp = $O, Un = wn, Is = ge;
class SO {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Is.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Bp(this.versionInfo, r) && Bp(this.fileInfo.info, n.info) && await (0, Un.pathExists)(t) ? t : null;
    const s = await this.getValidCachedUpdateFile(n, i);
    return s === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = s, s);
  }
  async setDownloadedFile(t, r, n, i, s, o) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: s,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, Un.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Un.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Un.pathExists)(n))
      return null;
    let s;
    try {
      s = await (0, Un.readJson)(n);
    } catch (u) {
      let l = "No cached update info available";
      return u.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${u.message})`), r.info(l), null;
    }
    if (!((s == null ? void 0 : s.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== s.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = Is.join(this.cacheDirForPendingUpdate, s.fileName);
    if (!await (0, Un.pathExists)(a))
      return r.info("Cached update file doesn't exist"), null;
    const c = await bO(a);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = s, a);
  }
  getUpdateInfoFile() {
    return Is.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Eo.DownloadedUpdateHelper = SO;
function bO(e, t = "sha512", r = "base64", n) {
  return new Promise((i, s) => {
    const o = (0, wO.createHash)(t);
    o.on("error", s).setEncoding(r), (0, EO.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", s).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function PO(e, t, r) {
  let n = 0, i = Is.join(t, e);
  for (let s = 0; s < 3; s++)
    try {
      return await (0, Un.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${o}`), i = Is.join(t, `${n++}-${e}`);
    }
  return i;
}
var _c = {}, sf = {};
Object.defineProperty(sf, "__esModule", { value: !0 });
sf.getAppCacheDir = AO;
const pl = ge, TO = nc;
function AO() {
  const e = (0, TO.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || pl.join(e, "AppData", "Local") : process.platform === "darwin" ? t = pl.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || pl.join(e, ".cache"), t;
}
Object.defineProperty(_c, "__esModule", { value: !0 });
_c.ElectronAppAdapter = void 0;
const Vp = ge, NO = sf;
class OO {
  constructor(t = jr.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Vp.join(process.resourcesPath, "app-update.yml") : Vp.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, NO.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
_c.ElectronAppAdapter = OO;
var Y0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Ye;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return jr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(s) {
      super(), this.proxyLoginCallback = s, this.cachedSession = null;
    }
    async download(s, o, a) {
      return await a.cancellationToken.createPromise((c, u, l) => {
        const f = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(s, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: o,
          options: a,
          onCancel: l,
          callback: (h) => {
            h == null ? c(o) : u(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(s, o) {
      s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const a = jr.net.request({
        ...s,
        session: this.cachedSession
      });
      return a.on("response", o), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(s, o, a, c, u) {
      s.on("redirect", (l, f, h) => {
        s.abort(), c > this.maxRedirects ? a(this.createMaxRedirectError()) : u(t.HttpExecutor.prepareRedirectUrlOptions(h, o));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Y0);
var So = {}, Wt = {}, RO = "[object Symbol]", J0 = /[\\^$.*+?()[\]{}|]/g, IO = RegExp(J0.source), CO = typeof _t == "object" && _t && _t.Object === Object && _t, kO = typeof self == "object" && self && self.Object === Object && self, DO = CO || kO || Function("return this")(), FO = Object.prototype, jO = FO.toString, Hp = DO.Symbol, Gp = Hp ? Hp.prototype : void 0, zp = Gp ? Gp.toString : void 0;
function LO(e) {
  if (typeof e == "string")
    return e;
  if (MO(e))
    return zp ? zp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function UO(e) {
  return !!e && typeof e == "object";
}
function MO(e) {
  return typeof e == "symbol" || UO(e) && jO.call(e) == RO;
}
function xO(e) {
  return e == null ? "" : LO(e);
}
function qO(e) {
  return e = xO(e), e && IO.test(e) ? e.replace(J0, "\\$&") : e;
}
var BO = qO;
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.newBaseUrl = HO;
Wt.newUrlFromBase = su;
Wt.getChannelFilename = GO;
Wt.blockmapFiles = zO;
const X0 = Ki, VO = BO;
function HO(e) {
  const t = new X0.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function su(e, t, r = !1) {
  const n = new X0.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function GO(e) {
  return `${e}.yml`;
}
function zO(e, t, r) {
  const n = su(`${e.pathname}.blockmap`, e);
  return [su(`${e.pathname.replace(new RegExp(VO(r), "g"), t)}.blockmap`, e), n];
}
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.Provider = void 0;
Ge.findFile = YO;
Ge.parseUpdateInfo = JO;
Ge.getFileList = Q0;
Ge.resolveFiles = XO;
const vn = Ye, KO = rt, Kp = Wt;
class WO {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, vn.configureRequestUrl)(t, n), n;
  }
}
Ge.Provider = WO;
function YO(e, t, r) {
  if (e.length === 0)
    throw (0, vn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((s) => i.url.pathname.toLowerCase().endsWith(`.${s}`))));
}
function JO(e, t, r) {
  if (e == null)
    throw (0, vn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, KO.load)(e);
  } catch (i) {
    throw (0, vn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Q0(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, vn.newError)(`No files provided: ${(0, vn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function XO(e, t, r = (n) => n) {
  const i = Q0(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, vn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, vn.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Kp.newUrlFromBase)(r(a.url), t),
      info: a
    };
  }), s = e.packages, o = s == null ? null : s[process.arch] || s.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, Kp.newUrlFromBase)(r(o.path), t).href
  }), i;
}
Object.defineProperty(So, "__esModule", { value: !0 });
So.GenericProvider = void 0;
const Wp = Ye, ml = Wt, yl = Ge;
class QO extends yl.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, ml.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, ml.getChannelFilename)(this.channel), r = (0, ml.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, yl.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Wp.HttpError && i.statusCode === 404)
          throw (0, Wp.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((s, o) => {
            try {
              setTimeout(s, 1e3 * n);
            } catch (a) {
              o(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, yl.resolveFiles)(t, this.baseUrl);
  }
}
So.GenericProvider = QO;
var $c = {}, wc = {};
Object.defineProperty(wc, "__esModule", { value: !0 });
wc.BitbucketProvider = void 0;
const Yp = Ye, gl = Wt, vl = Ge;
class ZO extends vl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: s } = t;
    this.baseUrl = (0, gl.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${s}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Yp.CancellationToken(), r = (0, gl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, gl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, vl.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Yp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, vl.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
wc.BitbucketProvider = ZO;
var _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.GitHubProvider = _n.BaseGitHubProvider = void 0;
_n.computeReleaseNotes = ev;
const Nr = Ye, Pi = nf, eR = Ki, Ti = Wt, ou = Ge, _l = /\/tag\/([^/]+)$/;
class Z0 extends ou.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Ti.newBaseUrl)((0, Nr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Ti.newBaseUrl)((0, Nr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
_n.BaseGitHubProvider = Z0;
class tR extends Z0 {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, s;
    const o = new Nr.CancellationToken(), a = await this.httpRequest((0, Ti.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), c = (0, Nr.parseXml)(a);
    let u = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Pi.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          l = _l.exec(u.element("link").attribute("href"))[1];
        else
          for (const m of c.getElements("entry")) {
            const E = _l.exec(m.element("link").attribute("href"));
            if (E === null)
              continue;
            const T = E[1], I = ((n = Pi.prerelease(T)) === null || n === void 0 ? void 0 : n[0]) || null, F = !_ || ["alpha", "beta"].includes(_), H = I !== null && !["alpha", "beta"].includes(String(I));
            if (F && !H && !(_ === "beta" && I === "alpha")) {
              l = T;
              break;
            }
            if (I && I === _) {
              l = T;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(o);
        for (const _ of c.getElements("entry"))
          if (_l.exec(_.element("link").attribute("href"))[1] === l) {
            u = _;
            break;
          }
      }
    } catch (_) {
      throw (0, Nr.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Nr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", p = "";
    const g = async (_) => {
      h = (0, Ti.getChannelFilename)(_), p = (0, Ti.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const m = this.createRequestOptions(p);
      try {
        return await this.executor.request(m, o);
      } catch (E) {
        throw E instanceof Nr.HttpError && E.statusCode === 404 ? (0, Nr.newError)(`Cannot find ${h} in the latest release artifacts (${p}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = Pi.prerelease(l)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((s = Pi.prerelease(l)) === null || s === void 0 ? void 0 : s[0]))), f = await g(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        f = await g(this.getDefaultChannelName());
      else
        throw _;
    }
    const $ = (0, ou.parseUpdateInfo)(f, h, p);
    return $.releaseName == null && ($.releaseName = u.elementValueOrEmpty("title")), $.releaseNotes == null && ($.releaseNotes = ev(this.updater.currentVersion, this.updater.fullChangelog, c, u)), {
      tag: l,
      ...$
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Ti.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new eR.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Nr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, ou.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
_n.GitHubProvider = tR;
function Jp(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function ev(e, t, r, n) {
  if (!t)
    return Jp(n);
  const i = [];
  for (const s of r.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
    Pi.lt(e, o) && i.push({
      version: o,
      note: Jp(s)
    });
  }
  return i.sort((s, o) => Pi.rcompare(s.version, o.version));
}
var Ec = {};
Object.defineProperty(Ec, "__esModule", { value: !0 });
Ec.KeygenProvider = void 0;
const Xp = Ye, $l = Wt, wl = Ge;
class rR extends wl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, $l.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Xp.CancellationToken(), r = (0, $l.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, $l.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, wl.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Xp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, wl.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Ec.KeygenProvider = rR;
var Sc = {};
Object.defineProperty(Sc, "__esModule", { value: !0 });
Sc.PrivateGitHubProvider = void 0;
const fi = Ye, nR = rt, iR = ge, Qp = Ki, Zp = Wt, sR = _n, oR = Ge;
class aR extends sR.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new fi.CancellationToken(), r = (0, Zp.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((a) => a.name === r);
    if (i == null)
      throw (0, fi.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const s = new Qp.URL(i.url);
    let o;
    try {
      o = (0, nR.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof fi.HttpError && a.statusCode === 404 ? (0, fi.newError)(`Cannot find ${r} in the latest release artifacts (${s}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return o.assets = n.assets, o;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Zp.newUrlFromBase)(n, this.baseUrl);
    try {
      const s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? s.find((o) => o.prerelease) || s[0] : s;
    } catch (s) {
      throw (0, fi.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, oR.getFileList)(t).map((r) => {
      const n = iR.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((s) => s != null && s.name === n);
      if (i == null)
        throw (0, fi.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Qp.URL(i.url),
        info: r
      };
    });
  }
}
Sc.PrivateGitHubProvider = aR;
Object.defineProperty($c, "__esModule", { value: !0 });
$c.isUrlProbablySupportMultiRangeRequests = tv;
$c.createClient = dR;
const Zo = Ye, cR = wc, em = So, lR = _n, uR = Ec, fR = Sc;
function tv(e) {
  return !e.includes("s3.amazonaws.com");
}
function dR(e, t, r) {
  if (typeof e == "string")
    throw (0, Zo.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return s == null ? new lR.GitHubProvider(i, t, r) : new fR.PrivateGitHubProvider(i, t, s, r);
    }
    case "bitbucket":
      return new cR.BitbucketProvider(e, t, r);
    case "keygen":
      return new uR.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new em.GenericProvider({
        provider: "generic",
        url: (0, Zo.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new em.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && tv(i.url)
      });
    }
    case "custom": {
      const i = e, s = i.updateProvider;
      if (!s)
        throw (0, Zo.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new s(i, t, r);
    }
    default:
      throw (0, Zo.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var bc = {}, bo = {}, Xi = {}, si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.OperationKind = void 0;
si.computeOperations = hR;
var Yn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Yn || (si.OperationKind = Yn = {}));
function hR(e, t, r) {
  const n = rm(e.files), i = rm(t.files);
  let s = null;
  const o = t.files[0], a = [], c = o.name, u = n.get(c);
  if (u == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: p } = mR(n.get(c), u.offset, r);
  let g = o.offset;
  for (let $ = 0; $ < l.checksums.length; g += l.sizes[$], $++) {
    const _ = l.sizes[$], m = l.checksums[$];
    let E = h.get(m);
    E != null && p.get(m) !== _ && (r.warn(`Checksum ("${m}") matches, but size differs (old: ${p.get(m)}, new: ${_})`), E = void 0), E === void 0 ? (f++, s != null && s.kind === Yn.DOWNLOAD && s.end === g ? s.end += _ : (s = {
      kind: Yn.DOWNLOAD,
      start: g,
      end: g + _
      // oldBlocks: null,
    }, tm(s, a, m, $))) : s != null && s.kind === Yn.COPY && s.end === E ? s.end += _ : (s = {
      kind: Yn.COPY,
      start: E,
      end: E + _
      // oldBlocks: [checksum]
    }, tm(s, a, m, $));
  }
  return f > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${f} changed blocks`), a;
}
const pR = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function tm(e, t, r, n) {
  if (pR && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const s = [i.start, i.end, e.start, e.end].reduce((o, a) => o < a ? o : a);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Yn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - s} until ${i.end - s} and ${e.start - s} until ${e.end - s}`);
    }
  }
  t.push(e);
}
function mR(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let s = t;
  for (let o = 0; o < e.checksums.length; o++) {
    const a = e.checksums[o], c = e.sizes[o], u = i.get(a);
    if (u === void 0)
      n.set(a, s), i.set(a, c);
    else if (r.debug != null) {
      const l = u === c ? "(same size)" : `(size: ${u}, this size: ${c})`;
      r.debug(`${a} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    s += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function rm(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.DataSplitter = void 0;
Xi.copyData = rv;
const ea = Ye, yR = $n, gR = fo, vR = si, nm = Buffer.from(`\r
\r
`);
var en;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(en || (en = {}));
function rv(e, t, r, n, i) {
  const s = (0, yR.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  s.on("error", n), s.once("end", i), s.pipe(t, {
    end: !1
  });
}
class _R extends gR.Writable {
  constructor(t, r, n, i, s, o) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = s, this.finishHandler = o, this.partIndex = -1, this.headerListBuffer = null, this.readState = en.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, ea.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === en.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = en.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === en.BODY)
          this.readState = en.INIT;
        else {
          this.partIndex++;
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, ea.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < o)
            await this.copyExistingData(a, o);
          else if (a > o)
            throw (0, ea.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = en.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, s = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, s), this.remainingPartDataCount = n - (s - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const s = () => {
        if (t === r) {
          n();
          return;
        }
        const o = this.options.tasks[t];
        if (o.kind !== vR.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        rv(o, this.out, this.options.oldFileFd, i, () => {
          t++, s();
        });
      };
      s();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(nm, r);
    if (n !== -1)
      return n + nm.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, ea.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((s, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), s();
      });
    });
  }
}
Xi.DataSplitter = _R;
var Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
Pc.executeTasksUsingMultipleRangeRequests = $R;
Pc.checkIsRangesSupported = cu;
const au = Ye, im = Xi, sm = si;
function $R(e, t, r, n, i) {
  const s = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const a = o + 1e3;
    wR(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, a),
      oldFileFd: n
    }, r, () => s(a), i);
  };
  return s;
}
function wR(e, t, r, n, i) {
  let s = "bytes=", o = 0;
  const a = /* @__PURE__ */ new Map(), c = [];
  for (let f = t.start; f < t.end; f++) {
    const h = t.tasks[f];
    h.kind === sm.OperationKind.DOWNLOAD && (s += `${h.start}-${h.end - 1}, `, a.set(o, f), o++, c.push(h.end - h.start));
  }
  if (o <= 1) {
    const f = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const p = t.tasks[h++];
      if (p.kind === sm.OperationKind.COPY)
        (0, im.copyData)(p, r, t.oldFileFd, i, () => f(h));
      else {
        const g = e.createRequestOptions();
        g.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const $ = e.httpExecutor.createRequest(g, (_) => {
          cu(_, i) && (_.pipe(r, {
            end: !1
          }), _.once("end", () => f(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers($, i), $.end();
      }
    };
    f(t.start);
    return;
  }
  const u = e.createRequestOptions();
  u.headers.Range = s.substring(0, s.length - 2);
  const l = e.httpExecutor.createRequest(u, (f) => {
    if (!cu(f, i))
      return;
    const h = (0, au.safeGetHeader)(f, "content-type"), p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const g = new im.DataSplitter(r, t, a, p[1] || p[2], c, n);
    g.on("error", i), f.pipe(g), f.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function cu(e, t) {
  if (e.statusCode >= 400)
    return t((0, au.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, au.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
Tc.ProgressDifferentialDownloadCallbackTransform = void 0;
const ER = fo;
var Ai;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Ai || (Ai = {}));
class SR extends ER.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Ai.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Ai.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Ai.COPY;
  }
  beginRangeDownload() {
    this.operationType = Ai.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Tc.ProgressDifferentialDownloadCallbackTransform = SR;
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.DifferentialDownloader = void 0;
const ys = Ye, El = wn, bR = $n, PR = Xi, TR = Ki, ta = si, om = Pc, AR = Tc;
class NR {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, ys.configureRequestUrl)(this.options.newUrl, t), (0, ys.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, ta.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let s = 0, o = 0;
    for (const c of i) {
      const u = c.end - c.start;
      c.kind === ta.OperationKind.DOWNLOAD ? s += u : o += u;
    }
    const a = this.blockAwareFileInfo.size;
    if (s + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${s}, copySize: ${o}, newSize: ${a}`);
    return n.info(`Full: ${am(a)}, To download: ${am(s)} (${Math.round(s / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, El.close)(i.descriptor).catch((s) => {
      this.logger.error(`cannot close file "${i.path}": ${s}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((s) => {
      try {
        this.logger.error(`cannot close files: ${s}`);
      } catch (o) {
        try {
          console.error(o);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, El.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, El.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const s = (0, bR.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, a) => {
      const c = [];
      let u;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const m = [];
        let E = 0;
        for (const I of t)
          I.kind === ta.OperationKind.DOWNLOAD && (m.push(I.end - I.start), E += I.end - I.start);
        const T = {
          expectedByteCounts: m,
          grandTotal: E
        };
        u = new AR.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), c.push(u);
      }
      const l = new ys.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), s.on("finish", () => {
        s.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (m) {
            a(m);
            return;
          }
          o(void 0);
        });
      }), c.push(s);
      let f = null;
      for (const m of c)
        m.on("error", a), f == null ? f = m : f = f.pipe(m);
      const h = c[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, om.executeTasksUsingMultipleRangeRequests)(this, t, h, n, a), p(0);
        return;
      }
      let g = 0, $ = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const _ = this.createRequestOptions();
      _.redirect = "manual", p = (m) => {
        var E, T;
        if (m >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const I = t[m++];
        if (I.kind === ta.OperationKind.COPY) {
          u && u.beginFileCopy(), (0, PR.copyData)(I, h, n, a, () => p(m));
          return;
        }
        const F = `bytes=${I.start}-${I.end - 1}`;
        _.headers.range = F, (T = (E = this.logger) === null || E === void 0 ? void 0 : E.debug) === null || T === void 0 || T.call(E, `download range: ${F}`), u && u.beginRangeDownload();
        const H = this.httpExecutor.createRequest(_, (z) => {
          z.on("error", a), z.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), z.statusCode >= 400 && a((0, ys.createHttpError)(z)), z.pipe(h, {
            end: !1
          }), z.once("end", () => {
            u && u.endRangeDownload(), ++g === 100 ? (g = 0, setTimeout(() => p(m), 1e3)) : p(m);
          });
        });
        H.on("redirect", (z, he, R) => {
          this.logger.info(`Redirect to ${OR(R)}`), $ = R, (0, ys.configureRequestUrl)(new TR.URL($), _), H.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(H, a), H.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let s = 0;
    if (await this.request(i, (o) => {
      o.copy(n, s), s += o.length;
    }), s !== n.length)
      throw new Error(`Received data length ${s} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const s = this.httpExecutor.createRequest(t, (o) => {
        (0, om.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", r), o.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
    });
  }
}
bo.DifferentialDownloader = NR;
function am(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function OR(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(bc, "__esModule", { value: !0 });
bc.GenericDifferentialDownloader = void 0;
const RR = bo;
class IR extends RR.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
bc.GenericDifferentialDownloader = IR;
var En = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = Ye;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(s) {
      this.emitter = s;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(s) {
      n(this.emitter, "login", s);
    }
    progress(s) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, s);
    }
    updateDownloaded(s) {
      n(this.emitter, e.UPDATE_DOWNLOADED, s);
    }
    updateCancelled(s) {
      n(this.emitter, "update-cancelled", s);
    }
  }
  e.UpdaterSignal = r;
  function n(i, s, o) {
    i.on(s, o);
  }
})(En);
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.NoOpLogger = mn.AppUpdater = void 0;
const mt = Ye, CR = po, kR = nc, DR = Wy, di = wn, FR = rt, Sl = hc, kn = ge, Mn = nf, cm = Eo, jR = _c, lm = Y0, LR = So, bl = $c, UR = Jy, MR = Wt, xR = bc, hi = En;
class of extends DR.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, mt.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, mt.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, lm.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new nv();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Sl.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new hi.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (s) => this.checkIfUpdateSupported(s), this.clientPromise = null, this.stagingUserIdPromise = new Sl.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Sl.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (s) => {
      this._logger.error(`Error: ${s.stack || s.message}`);
    }), r == null ? (this.app = new jR.ElectronAppAdapter(), this.httpExecutor = new lm.ElectronHttpExecutor((s, o) => this.emit("login", s, o))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Mn.parse)(n);
    if (i == null)
      throw (0, mt.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = qR(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new LR.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, bl.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, bl.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = of.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new jr.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, o = mt.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${o}, user id: ${i}`), o < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Mn.parse)(t.version);
    if (r == null)
      throw (0, mt.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Mn.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const s = (0, Mn.gt)(r, n), o = (0, Mn.lt)(r, n);
    return s ? !0 : this.allowDowngrade && o;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, kR.release)();
    if (r)
      try {
        if ((0, Mn.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, bl.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new mt.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, mt.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new mt.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, mt.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof mt.CancellationError))
        try {
          this.dispatchError(i);
        } catch (s) {
          this._logger.warn(`Cannot dispatch error event: ${s.stack || s}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(hi.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, FR.load)(await (0, di.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = kn.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, di.readFile)(t, "utf-8");
      if (mt.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = mt.UUID.v5((0, CR.randomBytes)(4096), mt.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, di.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = kn.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new cm.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(hi.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (E) => this.emit(hi.DOWNLOAD_PROGRESS, E));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, s = i.version, o = r.packageInfo;
    function a() {
      const E = decodeURIComponent(t.fileInfo.url.pathname);
      return E.endsWith(`.${t.fileExtension}`) ? kn.basename(E) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), u = c.cacheDirForPendingUpdate;
    await (0, di.mkdir)(u, { recursive: !0 });
    const l = a();
    let f = kn.join(u, l);
    const h = o == null ? null : kn.join(u, `package-${s}${kn.extname(o.path) || ".7z"}`), p = async (E) => (await c.setDownloadedFile(f, h, i, r, l, E), await t.done({
      ...i,
      downloadedFile: f
    }), h == null ? [f] : [f, h]), g = this._logger, $ = await c.validateDownloadedPath(f, i, r, g);
    if ($ != null)
      return f = $, await p(!1);
    const _ = async () => (await c.clear().catch(() => {
    }), await (0, di.unlink)(f).catch(() => {
    })), m = await (0, cm.createTempUpdateFile)(`temp-${l}`, u, g);
    try {
      await t.task(m, n, h, _), await (0, mt.retry)(() => (0, di.rename)(m, f), 60, 500, 0, 0, (E) => E instanceof Error && /^EBUSY:/.test(E.message));
    } catch (E) {
      throw await _(), E instanceof mt.CancellationError && (g.info("cancelled"), this.emit("update-cancelled", i)), E;
    }
    return g.info(`New version ${s} has been downloaded to ${f}`), await p(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, s) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const o = (0, MR.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const a = async (l) => {
        const f = await this.httpExecutor.downloadToBuffer(l, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (f == null || f.length === 0)
          throw new Error(`Blockmap "${l.href}" is empty`);
        try {
          return JSON.parse((0, UR.gunzipSync)(f).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${l.href}", error: ${h}`);
        }
      }, c = {
        newUrl: t.url,
        oldFile: kn.join(this.downloadedUpdateHelper.cacheDir, s),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(hi.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (l) => this.emit(hi.DOWNLOAD_PROGRESS, l));
      const u = await Promise.all(o.map((l) => a(l)));
      return await new xR.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(u[0], u[1]), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
mn.AppUpdater = of;
function qR(e) {
  const t = (0, Mn.prerelease)(e);
  return t != null && t.length > 0;
}
class nv {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
mn.NoOpLogger = nv;
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.BaseUpdater = void 0;
const um = ho, BR = mn;
class VR extends BR.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      jr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, s = n == null ? null : n.downloadedFileInfo;
    if (i == null || s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: s.isAdminRightsRequired
      });
    } catch (o) {
      return this.dispatchError(o), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, um.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: s, status: o, stdout: a, stderr: c } = i;
    if (s != null)
      throw this._logger.error(c), s;
    if (o != null && o !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${o}`);
    return a.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((s, o) => {
      try {
        const a = { stdio: i, env: n, detached: !0 }, c = (0, um.spawn)(t, r, a);
        c.on("error", (u) => {
          o(u);
        }), c.unref(), c.pid !== void 0 && s(!0);
      } catch (a) {
        o(a);
      }
    });
  }
}
xr.BaseUpdater = VR;
var Qs = {}, Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
Po.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const pi = wn, HR = bo, GR = Jy;
class zR extends HR.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = iv(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await KR(this.options.oldFile), i);
  }
}
Po.FileWithEmbeddedBlockMapDifferentialDownloader = zR;
function iv(e) {
  return JSON.parse((0, GR.inflateRawSync)(e).toString());
}
async function KR(e) {
  const t = await (0, pi.open)(e, "r");
  try {
    const r = (await (0, pi.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, pi.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, pi.read)(t, i, 0, i.length, r - n.length - i.length), await (0, pi.close)(t), iv(i);
  } catch (r) {
    throw await (0, pi.close)(t), r;
  }
}
Object.defineProperty(Qs, "__esModule", { value: !0 });
Qs.AppImageUpdater = void 0;
const fm = Ye, dm = ho, WR = wn, YR = $n, gs = ge, JR = xr, XR = Po, QR = Ge, hm = En;
class ZR extends JR.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, QR.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, fm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, o, i, r, t)) && await this.httpExecutor.download(n.url, i, s), await (0, WR.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, s) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: s.requestHeaders,
        cancellationToken: s.cancellationToken
      };
      return this.listenerCount(hm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(hm.DOWNLOAD_PROGRESS, a)), await new XR.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, fm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, YR.unlinkSync)(r);
    let n;
    const i = gs.basename(r), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    gs.basename(s) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = gs.join(gs.dirname(r), gs.basename(s)), (0, dm.execFileSync)("mv", ["-f", s, n]), n !== r && this.emit("appimage-filename-updated", n);
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, dm.execFileSync)(n, [], { env: o })), !0;
  }
}
Qs.AppImageUpdater = ZR;
var Zs = {};
Object.defineProperty(Zs, "__esModule", { value: !0 });
Zs.DebUpdater = void 0;
const eI = xr, tI = Ge, pm = En;
class rI extends eI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, tI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(pm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(pm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const s = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Zs.DebUpdater = rI;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.PacmanUpdater = void 0;
const nI = xr, mm = En, iI = Ge;
class sI extends nI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, iI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(mm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(mm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const s = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
eo.PacmanUpdater = sI;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
to.RpmUpdater = void 0;
const oI = xr, ym = En, aI = Ge;
class cI extends oI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, aI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(ym.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(ym.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let o;
    return i ? o = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", s] : o = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", s], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
to.RpmUpdater = cI;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.MacUpdater = void 0;
const gm = Ye, Pl = wn, lI = $n, vm = ge, uI = Qw, fI = mn, dI = Ge, _m = ho, $m = po;
class hI extends fI.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = jr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let s = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), s = (0, _m.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${s})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, _m.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), o = o || h;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    o = o || process.arch === "arm64" || s;
    const a = (f) => {
      var h;
      return f.url.pathname.includes("arm64") || ((h = f.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    o && r.some(a) ? r = r.filter((f) => o === a(f)) : r = r.filter((f) => !a(f));
    const c = (0, dI.findFile)(r, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, gm.newError)(`ZIP file not provided: ${(0, gm.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const u = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (f, h) => {
        const p = vm.join(this.downloadedUpdateHelper.cacheDir, l), g = () => (0, Pl.pathExistsSync)(p) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let $ = !0;
        g() && ($ = await this.differentialDownloadInstaller(c, t, f, u, l)), $ && await this.httpExecutor.download(c.url, f, h);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = vm.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, Pl.copyFile)(f.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(c, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Pl.stat)(i)).size, o = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, uI.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const c = (u) => {
      const l = u.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((u, l) => {
      const f = (0, $m.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), p = `/${(0, $m.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (g, $) => {
        const _ = g.url;
        if (o.info(`${_} requested`), _ === "/") {
          if (!g.headers.authorization || g.headers.authorization.indexOf("Basic ") === -1) {
            $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), o.warn("No authenthication info");
            return;
          }
          const T = g.headers.authorization.split(" ")[1], I = Buffer.from(T, "base64").toString("ascii"), [F, H] = I.split(":");
          if (F !== "autoupdater" || H !== f) {
            $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const z = Buffer.from(`{ "url": "${c(this.server)}${p}" }`);
          $.writeHead(200, { "Content-Type": "application/json", "Content-Length": z.length }), $.end(z);
          return;
        }
        if (!_.startsWith(p)) {
          o.warn(`${_} requested, but not supported`), $.writeHead(404), $.end();
          return;
        }
        o.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let m = !1;
        $.on("finish", () => {
          m || (this.nativeUpdater.removeListener("error", l), u([]));
        });
        const E = (0, lI.createReadStream)(i);
        E.on("error", (T) => {
          try {
            $.end();
          } catch (I) {
            o.warn(`cannot end response: ${I}`);
          }
          m = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${T}`));
        }), $.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": s
        }), E.pipe($);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : u([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
ro.MacUpdater = hI;
var no = {}, af = {};
Object.defineProperty(af, "__esModule", { value: !0 });
af.verifySignature = mI;
const wm = Ye, sv = ho, pI = nc, Em = ge;
function mI(e, t, r) {
  return new Promise((n, i) => {
    const s = t.replace(/'/g, "''");
    r.info(`Verifying signature ${s}`), (0, sv.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${s}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (o, a, c) => {
      var u;
      try {
        if (o != null || c) {
          Tl(r, o, c, i), n(null);
          return;
        }
        const l = yI(a);
        if (l.Status === 0) {
          try {
            const g = Em.normalize(l.Path), $ = Em.normalize(t);
            if (r.info(`LiteralPath: ${g}. Update Path: ${$}`), g !== $) {
              Tl(r, new Error(`LiteralPath of ${g} is different than ${$}`), c, i), n(null);
              return;
            }
          } catch (g) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(u = g.message) !== null && u !== void 0 ? u : g.stack}`);
          }
          const h = (0, wm.parseDn)(l.SignerCertificate.Subject);
          let p = !1;
          for (const g of e) {
            const $ = (0, wm.parseDn)(g);
            if ($.size ? p = Array.from($.keys()).every((m) => $.get(m) === h.get(m)) : g === h.get("CN") && (r.warn(`Signature validated using only CN ${g}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, p) => h === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (l) {
        Tl(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function yI(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Tl(e, t, r, n) {
  if (gI()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, sv.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function gI() {
  const e = pI.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(no, "__esModule", { value: !0 });
no.NsisUpdater = void 0;
const ra = Ye, Sm = ge, vI = xr, _I = Po, bm = En, $I = Ge, wI = wn, EI = af, Pm = Ki;
class SI extends vI.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, EI.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, $I.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, s, o, a) => {
        const c = n.packageInfo, u = c != null && o != null;
        if (u && t.disableWebInstaller)
          throw (0, ra.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !u && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (u || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, ra.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, s);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, ra.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (u && await this.differentialDownloadWebPackage(t, c, o, r))
          try {
            await this.httpExecutor.download(new Pm.URL(c.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (f) {
            try {
              await (0, wI.unlink)(o);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const s = () => {
      this.spawnLog(Sm.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), s(), !0) : (this.spawnLog(r, n).catch((o) => {
      const a = o.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? s() : a === "ENOENT" ? jr.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(o);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const s = {
        newUrl: new Pm.URL(r.path),
        oldFile: Sm.join(this.downloadedUpdateHelper.cacheDir, ra.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(bm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(bm.DOWNLOAD_PROGRESS, o)), await new _I.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "win32";
    }
    return !1;
  }
}
no.NsisUpdater = SI;
(function(e) {
  var t = _t && _t.__createBinding || (Object.create ? function(_, m, E, T) {
    T === void 0 && (T = E);
    var I = Object.getOwnPropertyDescriptor(m, E);
    (!I || ("get" in I ? !m.__esModule : I.writable || I.configurable)) && (I = { enumerable: !0, get: function() {
      return m[E];
    } }), Object.defineProperty(_, T, I);
  } : function(_, m, E, T) {
    T === void 0 && (T = E), _[T] = m[E];
  }), r = _t && _t.__exportStar || function(_, m) {
    for (var E in _) E !== "default" && !Object.prototype.hasOwnProperty.call(m, E) && t(m, _, E);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = wn, i = ge;
  var s = xr;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return s.BaseUpdater;
  } });
  var o = mn;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var a = Ge;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var c = Qs;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var u = Zs;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return u.DebUpdater;
  } });
  var l = eo;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var f = to;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = ro;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var p = no;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), r(En, e);
  let g;
  function $() {
    if (process.platform === "win32")
      g = new no.NsisUpdater();
    else if (process.platform === "darwin")
      g = new ro.MacUpdater();
    else {
      g = new Qs.AppImageUpdater();
      try {
        const _ = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(_))
          return g;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const m = (0, n.readFileSync)(_).toString().trim();
        switch (console.info("Found package-type:", m), m) {
          case "deb":
            g = new Zs.DebUpdater();
            break;
          case "rpm":
            g = new to.RpmUpdater();
            break;
          case "pacman":
            g = new eo.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (_) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", _.message);
      }
    }
    return g;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => g || $()
  });
})(or);
var Tt = {};
(function(e) {
  const t = we.fromCallback, r = He, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, s, o, a, c, u) {
    return typeof u == "function" ? r.read(i, s, o, a, c, u) : new Promise((l, f) => {
      r.read(i, s, o, a, c, (h, p, g) => {
        if (h) return f(h);
        l({ bytesRead: p, buffer: g });
      });
    });
  }, e.write = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, s, ...o) : new Promise((a, c) => {
      r.write(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, e.readv = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.readv(i, s, ...o) : new Promise((a, c) => {
      r.readv(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesRead: l, buffers: f });
      });
    });
  }, e.writev = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, s, ...o) : new Promise((a, c) => {
      r.writev(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Tt);
var cf = {}, ov = {};
const bI = ge;
ov.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(bI.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const av = Tt, { checkPath: cv } = ov, lv = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
cf.makeDir = async (e, t) => (cv(e), av.mkdir(e, {
  mode: lv(t),
  recursive: !0
}));
cf.makeDirSync = (e, t) => (cv(e), av.mkdirSync(e, {
  mode: lv(t),
  recursive: !0
}));
const PI = we.fromPromise, { makeDir: TI, makeDirSync: Al } = cf, Nl = PI(TI);
var _r = {
  mkdirs: Nl,
  mkdirsSync: Al,
  // alias
  mkdirp: Nl,
  mkdirpSync: Al,
  ensureDir: Nl,
  ensureDirSync: Al
};
const AI = we.fromPromise, uv = Tt;
function NI(e) {
  return uv.access(e).then(() => !0).catch(() => !1);
}
var oi = {
  pathExists: AI(NI),
  pathExistsSync: uv.existsSync
};
const ki = Tt, OI = we.fromPromise;
async function RI(e, t, r) {
  const n = await ki.open(e, "r+");
  let i = null;
  try {
    await ki.futimes(n, t, r);
  } finally {
    try {
      await ki.close(n);
    } catch (s) {
      i = s;
    }
  }
  if (i)
    throw i;
}
function II(e, t, r) {
  const n = ki.openSync(e, "r+");
  return ki.futimesSync(n, t, r), ki.closeSync(n);
}
var fv = {
  utimesMillis: OI(RI),
  utimesMillisSync: II
};
const Bi = Tt, We = ge, Tm = we.fromPromise;
function CI(e, t, r) {
  const n = r.dereference ? (i) => Bi.stat(i, { bigint: !0 }) : (i) => Bi.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function kI(e, t, r) {
  let n;
  const i = r.dereference ? (o) => Bi.statSync(o, { bigint: !0 }) : (o) => Bi.lstatSync(o, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: s, destStat: null };
    throw o;
  }
  return { srcStat: s, destStat: n };
}
async function DI(e, t, r, n) {
  const { srcStat: i, destStat: s } = await CI(e, t, n);
  if (s) {
    if (To(i, s)) {
      const o = We.basename(e), a = We.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && lf(e, t))
    throw new Error(Ac(e, t, r));
  return { srcStat: i, destStat: s };
}
function FI(e, t, r, n) {
  const { srcStat: i, destStat: s } = kI(e, t, n);
  if (s) {
    if (To(i, s)) {
      const o = We.basename(e), a = We.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && lf(e, t))
    throw new Error(Ac(e, t, r));
  return { srcStat: i, destStat: s };
}
async function dv(e, t, r, n) {
  const i = We.resolve(We.dirname(e)), s = We.resolve(We.dirname(r));
  if (s === i || s === We.parse(s).root) return;
  let o;
  try {
    o = await Bi.stat(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (To(t, o))
    throw new Error(Ac(e, r, n));
  return dv(e, t, s, n);
}
function hv(e, t, r, n) {
  const i = We.resolve(We.dirname(e)), s = We.resolve(We.dirname(r));
  if (s === i || s === We.parse(s).root) return;
  let o;
  try {
    o = Bi.statSync(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (To(t, o))
    throw new Error(Ac(e, r, n));
  return hv(e, t, s, n);
}
function To(e, t) {
  return t.ino !== void 0 && t.dev !== void 0 && t.ino === e.ino && t.dev === e.dev;
}
function lf(e, t) {
  const r = We.resolve(e).split(We.sep).filter((i) => i), n = We.resolve(t).split(We.sep).filter((i) => i);
  return r.every((i, s) => n[s] === i);
}
function Ac(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Qi = {
  // checkPaths
  checkPaths: Tm(DI),
  checkPathsSync: FI,
  // checkParent
  checkParentPaths: Tm(dv),
  checkParentPathsSync: hv,
  // Misc
  isSrcSubdir: lf,
  areIdentical: To
};
async function jI(e, t) {
  const r = [];
  for await (const n of e)
    r.push(
      t(n).then(
        () => null,
        (i) => i ?? new Error("unknown error")
      )
    );
  await Promise.all(
    r.map(
      (n) => n.then((i) => {
        if (i !== null) throw i;
      })
    )
  );
}
var LI = {
  asyncIteratorConcurrentProcess: jI
};
const ft = Tt, io = ge, { mkdirs: UI } = _r, { pathExists: MI } = oi, { utimesMillis: xI } = fv, so = Qi, { asyncIteratorConcurrentProcess: qI } = LI;
async function BI(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await so.checkPaths(e, t, "copy", r);
  if (await so.checkParentPaths(e, n, t, "copy"), !await pv(e, t, r)) return;
  const o = io.dirname(t);
  await MI(o) || await UI(o), await mv(i, e, t, r);
}
async function pv(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function mv(e, t, r, n) {
  const s = await (n.dereference ? ft.stat : ft.lstat)(t);
  if (s.isDirectory()) return zI(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return VI(s, e, t, r, n);
  if (s.isSymbolicLink()) return KI(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function VI(e, t, r, n, i) {
  if (!t) return Am(e, r, n, i);
  if (i.overwrite)
    return await ft.unlink(n), Am(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function Am(e, t, r, n) {
  if (await ft.copyFile(t, r), n.preserveTimestamps) {
    HI(e.mode) && await GI(r, e.mode);
    const i = await ft.stat(t);
    await xI(r, i.atime, i.mtime);
  }
  return ft.chmod(r, e.mode);
}
function HI(e) {
  return (e & 128) === 0;
}
function GI(e, t) {
  return ft.chmod(e, t | 128);
}
async function zI(e, t, r, n, i) {
  t || await ft.mkdir(n), await qI(await ft.opendir(r), async (s) => {
    const o = io.join(r, s.name), a = io.join(n, s.name);
    if (await pv(o, a, i)) {
      const { destStat: u } = await so.checkPaths(o, a, "copy", i);
      await mv(u, o, a, i);
    }
  }), t || await ft.chmod(n, e.mode);
}
async function KI(e, t, r, n) {
  let i = await ft.readlink(t);
  if (n.dereference && (i = io.resolve(process.cwd(), i)), !e)
    return ft.symlink(i, r);
  let s = null;
  try {
    s = await ft.readlink(r);
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return ft.symlink(i, r);
    throw o;
  }
  if (n.dereference && (s = io.resolve(process.cwd(), s)), so.isSrcSubdir(i, s))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
  if (so.isSrcSubdir(s, i))
    throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
  return await ft.unlink(r), ft.symlink(i, r);
}
var WI = BI;
const $t = He, oo = ge, YI = _r.mkdirsSync, JI = fv.utimesMillisSync, ao = Qi;
function XI(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = ao.checkPathsSync(e, t, "copy", r);
  if (ao.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const s = oo.dirname(t);
  return $t.existsSync(s) || YI(s), yv(i, e, t, r);
}
function yv(e, t, r, n) {
  const s = (n.dereference ? $t.statSync : $t.lstatSync)(t);
  if (s.isDirectory()) return iC(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return QI(s, e, t, r, n);
  if (s.isSymbolicLink()) return aC(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function QI(e, t, r, n, i) {
  return t ? ZI(e, r, n, i) : gv(e, r, n, i);
}
function ZI(e, t, r, n) {
  if (n.overwrite)
    return $t.unlinkSync(r), gv(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function gv(e, t, r, n) {
  return $t.copyFileSync(t, r), n.preserveTimestamps && eC(e.mode, t, r), uf(r, e.mode);
}
function eC(e, t, r) {
  return tC(e) && rC(r, e), nC(t, r);
}
function tC(e) {
  return (e & 128) === 0;
}
function rC(e, t) {
  return uf(e, t | 128);
}
function uf(e, t) {
  return $t.chmodSync(e, t);
}
function nC(e, t) {
  const r = $t.statSync(e);
  return JI(t, r.atime, r.mtime);
}
function iC(e, t, r, n, i) {
  return t ? vv(r, n, i) : sC(e.mode, r, n, i);
}
function sC(e, t, r, n) {
  return $t.mkdirSync(r), vv(t, r, n), uf(r, e);
}
function vv(e, t, r) {
  const n = $t.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      oC(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function oC(e, t, r, n) {
  const i = oo.join(t, e), s = oo.join(r, e);
  if (n.filter && !n.filter(i, s)) return;
  const { destStat: o } = ao.checkPathsSync(i, s, "copy", n);
  return yv(o, i, s, n);
}
function aC(e, t, r, n) {
  let i = $t.readlinkSync(t);
  if (n.dereference && (i = oo.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = $t.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return $t.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (s = oo.resolve(process.cwd(), s)), ao.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (ao.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return cC(i, r);
  } else
    return $t.symlinkSync(i, r);
}
function cC(e, t) {
  return $t.unlinkSync(t), $t.symlinkSync(e, t);
}
var lC = XI;
const uC = we.fromPromise;
var ff = {
  copy: uC(WI),
  copySync: lC
};
const _v = He, fC = we.fromCallback;
function dC(e, t) {
  _v.rm(e, { recursive: !0, force: !0 }, t);
}
function hC(e) {
  _v.rmSync(e, { recursive: !0, force: !0 });
}
var Nc = {
  remove: fC(dC),
  removeSync: hC
};
const pC = we.fromPromise, $v = Tt, wv = ge, Ev = _r, Sv = Nc, Nm = pC(async function(t) {
  let r;
  try {
    r = await $v.readdir(t);
  } catch {
    return Ev.mkdirs(t);
  }
  return Promise.all(r.map((n) => Sv.remove(wv.join(t, n))));
});
function Om(e) {
  let t;
  try {
    t = $v.readdirSync(e);
  } catch {
    return Ev.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = wv.join(e, r), Sv.removeSync(r);
  });
}
var mC = {
  emptyDirSync: Om,
  emptydirSync: Om,
  emptyDir: Nm,
  emptydir: Nm
};
const yC = we.fromPromise, bv = ge, Ir = Tt, Pv = _r;
async function gC(e) {
  let t;
  try {
    t = await Ir.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = bv.dirname(e);
  let n = null;
  try {
    n = await Ir.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await Pv.mkdirs(r), await Ir.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await Ir.writeFile(e, "") : await Ir.readdir(r);
}
function vC(e) {
  let t;
  try {
    t = Ir.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = bv.dirname(e);
  try {
    Ir.statSync(r).isDirectory() || Ir.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Pv.mkdirsSync(r);
    else throw n;
  }
  Ir.writeFileSync(e, "");
}
var _C = {
  createFile: yC(gC),
  createFileSync: vC
};
const $C = we.fromPromise, Tv = ge, rn = Tt, Av = _r, { pathExists: wC } = oi, { areIdentical: Nv } = Qi;
async function EC(e, t) {
  let r;
  try {
    r = await rn.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await rn.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  if (r && Nv(n, r)) return;
  const i = Tv.dirname(t);
  await wC(i) || await Av.mkdirs(i), await rn.link(e, t);
}
function SC(e, t) {
  let r;
  try {
    r = rn.lstatSync(t);
  } catch {
  }
  try {
    const s = rn.lstatSync(e);
    if (r && Nv(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = Tv.dirname(t);
  return rn.existsSync(n) || Av.mkdirsSync(n), rn.linkSync(e, t);
}
var bC = {
  createLink: $C(EC),
  createLinkSync: SC
};
const cn = ge, Cs = Tt, { pathExists: PC } = oi, TC = we.fromPromise;
async function AC(e, t) {
  if (cn.isAbsolute(e)) {
    try {
      await Cs.lstat(e);
    } catch (s) {
      throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = cn.dirname(t), n = cn.join(r, e);
  if (await PC(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Cs.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
  }
  return {
    toCwd: e,
    toDst: cn.relative(r, e)
  };
}
function NC(e, t) {
  if (cn.isAbsolute(e)) {
    if (!Cs.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = cn.dirname(t), n = cn.join(r, e);
  if (Cs.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Cs.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: cn.relative(r, e)
  };
}
var OC = {
  symlinkPaths: TC(AC),
  symlinkPathsSync: NC
};
const Ov = Tt, RC = we.fromPromise;
async function IC(e, t) {
  if (t) return t;
  let r;
  try {
    r = await Ov.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function CC(e, t) {
  if (t) return t;
  let r;
  try {
    r = Ov.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var kC = {
  symlinkType: RC(IC),
  symlinkTypeSync: CC
};
const DC = we.fromPromise, Rv = ge, fr = Tt, { mkdirs: FC, mkdirsSync: jC } = _r, { symlinkPaths: LC, symlinkPathsSync: UC } = OC, { symlinkType: MC, symlinkTypeSync: xC } = kC, { pathExists: qC } = oi, { areIdentical: Iv } = Qi;
async function BC(e, t, r) {
  let n;
  try {
    n = await fr.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [a, c] = await Promise.all([
      fr.stat(e),
      fr.stat(t)
    ]);
    if (Iv(a, c)) return;
  }
  const i = await LC(e, t);
  e = i.toDst;
  const s = await MC(i.toCwd, r), o = Rv.dirname(t);
  return await qC(o) || await FC(o), fr.symlink(e, t, s);
}
function VC(e, t, r) {
  let n;
  try {
    n = fr.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = fr.statSync(e), c = fr.statSync(t);
    if (Iv(a, c)) return;
  }
  const i = UC(e, t);
  e = i.toDst, r = xC(i.toCwd, r);
  const s = Rv.dirname(t);
  return fr.existsSync(s) || jC(s), fr.symlinkSync(e, t, r);
}
var HC = {
  createSymlink: DC(BC),
  createSymlinkSync: VC
};
const { createFile: Rm, createFileSync: Im } = _C, { createLink: Cm, createLinkSync: km } = bC, { createSymlink: Dm, createSymlinkSync: Fm } = HC;
var GC = {
  // file
  createFile: Rm,
  createFileSync: Im,
  ensureFile: Rm,
  ensureFileSync: Im,
  // link
  createLink: Cm,
  createLinkSync: km,
  ensureLink: Cm,
  ensureLinkSync: km,
  // symlink
  createSymlink: Dm,
  createSymlinkSync: Fm,
  ensureSymlink: Dm,
  ensureSymlinkSync: Fm
};
const na = Fg;
var zC = {
  // jsonfile exports
  readJson: na.readFile,
  readJsonSync: na.readFileSync,
  writeJson: na.writeFile,
  writeJsonSync: na.writeFileSync
};
const KC = we.fromPromise, lu = Tt, Cv = ge, kv = _r, WC = oi.pathExists;
async function YC(e, t, r = "utf-8") {
  const n = Cv.dirname(e);
  return await WC(n) || await kv.mkdirs(n), lu.writeFile(e, t, r);
}
function JC(e, ...t) {
  const r = Cv.dirname(e);
  lu.existsSync(r) || kv.mkdirsSync(r), lu.writeFileSync(e, ...t);
}
var df = {
  outputFile: KC(YC),
  outputFileSync: JC
};
const { stringify: XC } = yo, { outputFile: QC } = df;
async function ZC(e, t, r = {}) {
  const n = XC(t, r);
  await QC(e, n, r);
}
var ek = ZC;
const { stringify: tk } = yo, { outputFileSync: rk } = df;
function nk(e, t, r) {
  const n = tk(t, r);
  rk(e, n, r);
}
var ik = nk;
const sk = we.fromPromise, St = zC;
St.outputJson = sk(ek);
St.outputJsonSync = ik;
St.outputJSON = St.outputJson;
St.outputJSONSync = St.outputJsonSync;
St.writeJSON = St.writeJson;
St.writeJSONSync = St.writeJsonSync;
St.readJSON = St.readJson;
St.readJSONSync = St.readJsonSync;
var ok = St;
const ak = Tt, jm = ge, { copy: ck } = ff, { remove: Dv } = Nc, { mkdirp: lk } = _r, { pathExists: uk } = oi, Lm = Qi;
async function fk(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = await Lm.checkPaths(e, t, "move", r);
  await Lm.checkParentPaths(e, i, t, "move");
  const o = jm.dirname(t);
  return jm.parse(o).root !== o && await lk(o), dk(e, t, n, s);
}
async function dk(e, t, r, n) {
  if (!n) {
    if (r)
      await Dv(t);
    else if (await uk(t))
      throw new Error("dest already exists.");
  }
  try {
    await ak.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await hk(e, t, r);
  }
}
async function hk(e, t, r) {
  return await ck(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Dv(e);
}
var pk = fk;
const Fv = He, uu = ge, mk = ff.copySync, jv = Nc.removeSync, yk = _r.mkdirpSync, Um = Qi;
function gk(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = Um.checkPathsSync(e, t, "move", r);
  return Um.checkParentPathsSync(e, i, t, "move"), vk(t) || yk(uu.dirname(t)), _k(e, t, n, s);
}
function vk(e) {
  const t = uu.dirname(e);
  return uu.parse(t).root === t;
}
function _k(e, t, r, n) {
  if (n) return Ol(e, t, r);
  if (r)
    return jv(t), Ol(e, t, r);
  if (Fv.existsSync(t)) throw new Error("dest already exists.");
  return Ol(e, t, r);
}
function Ol(e, t, r) {
  try {
    Fv.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return $k(e, t, r);
  }
}
function $k(e, t, r) {
  return mk(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), jv(e);
}
var wk = gk;
const Ek = we.fromPromise;
var Sk = {
  move: Ek(pk),
  moveSync: wk
}, bk = {
  // Export promiseified graceful-fs:
  ...Tt,
  // Export extra methods:
  ...ff,
  ...mC,
  ...GC,
  ...ok,
  ..._r,
  ...Sk,
  ...df,
  ...oi,
  ...Nc
};
const se = /* @__PURE__ */ ic(bk), Zn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Rl = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Pk = new Set("0123456789");
function Oc(e) {
  const t = [];
  let r = "", n = "start", i = !1;
  for (const s of e)
    switch (s) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += s), n = "property", i = !i;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (Rl.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (n === "property") {
          if (Rl.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !Pk.has(s))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += s;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (Rl.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function hf(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Lv(e, t) {
  if (hf(e, t))
    throw new Error("Cannot use string index");
}
function Tk(e, t, r) {
  if (!Zn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = Oc(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (hf(e, s) ? e = i === n.length - 1 ? void 0 : null : e = e[s], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Mm(e, t, r) {
  if (!Zn(e) || typeof t != "string")
    return e;
  const n = e, i = Oc(t);
  for (let s = 0; s < i.length; s++) {
    const o = i[s];
    Lv(e, o), s === i.length - 1 ? e[o] = r : Zn(e[o]) || (e[o] = typeof i[s + 1] == "number" ? [] : {}), e = e[o];
  }
  return n;
}
function Ak(e, t) {
  if (!Zn(e) || typeof t != "string")
    return !1;
  const r = Oc(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (Lv(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !Zn(e))
      return !1;
  }
}
function Nk(e, t) {
  if (!Zn(e) || typeof t != "string")
    return !1;
  const r = Oc(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Zn(e) || !(n in e) || hf(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const nn = Xy.homedir(), pf = Xy.tmpdir(), { env: Ni } = Fe, Ok = (e) => {
  const t = X.join(nn, "Library");
  return {
    data: X.join(t, "Application Support", e),
    config: X.join(t, "Preferences", e),
    cache: X.join(t, "Caches", e),
    log: X.join(t, "Logs", e),
    temp: X.join(pf, e)
  };
}, Rk = (e) => {
  const t = Ni.APPDATA || X.join(nn, "AppData", "Roaming"), r = Ni.LOCALAPPDATA || X.join(nn, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: X.join(r, e, "Data"),
    config: X.join(t, e, "Config"),
    cache: X.join(r, e, "Cache"),
    log: X.join(r, e, "Log"),
    temp: X.join(pf, e)
  };
}, Ik = (e) => {
  const t = X.basename(nn);
  return {
    data: X.join(Ni.XDG_DATA_HOME || X.join(nn, ".local", "share"), e),
    config: X.join(Ni.XDG_CONFIG_HOME || X.join(nn, ".config"), e),
    cache: X.join(Ni.XDG_CACHE_HOME || X.join(nn, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: X.join(Ni.XDG_STATE_HOME || X.join(nn, ".local", "state"), e),
    temp: X.join(pf, t, e)
  };
};
function Ck(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), Fe.platform === "darwin" ? Ok(e) : Fe.platform === "win32" ? Rk(e) : Ik(e);
}
const zr = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    return e.apply(void 0, i).catch(r);
  };
}, Ar = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    try {
      return e.apply(void 0, i);
    } catch (s) {
      return r(s);
    }
  };
}, kk = 250, Kr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, o = i.interval ?? kk, a = Date.now() + s;
    return function c(...u) {
      return e.apply(void 0, u).catch((l) => {
        if (!r(l) || Date.now() >= a)
          throw l;
        const f = Math.round(o * Math.random());
        return f > 0 ? new Promise((p) => setTimeout(p, f)).then(() => c.apply(void 0, u)) : c.apply(void 0, u);
      });
    };
  };
}, Wr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, o = Date.now() + s;
    return function(...c) {
      for (; ; )
        try {
          return e.apply(void 0, c);
        } catch (u) {
          if (!r(u) || Date.now() >= o)
            throw u;
          continue;
        }
    };
  };
}, Oi = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Oi.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !Dk && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Oi.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Oi.isNodeError(e))
      throw e;
    if (!Oi.isChangeErrorOk(e))
      throw e;
  }
}, ia = {
  onError: Oi.onChangeError
}, Lt = {
  onError: () => {
  }
}, Dk = Fe.getuid ? !Fe.getuid() : !1, ot = {
  isRetriable: Oi.isRetriableError
}, lt = {
  attempt: {
    /* ASYNC */
    chmod: zr(st(ue.chmod), ia),
    chown: zr(st(ue.chown), ia),
    close: zr(st(ue.close), Lt),
    fsync: zr(st(ue.fsync), Lt),
    mkdir: zr(st(ue.mkdir), Lt),
    realpath: zr(st(ue.realpath), Lt),
    stat: zr(st(ue.stat), Lt),
    unlink: zr(st(ue.unlink), Lt),
    /* SYNC */
    chmodSync: Ar(ue.chmodSync, ia),
    chownSync: Ar(ue.chownSync, ia),
    closeSync: Ar(ue.closeSync, Lt),
    existsSync: Ar(ue.existsSync, Lt),
    fsyncSync: Ar(ue.fsync, Lt),
    mkdirSync: Ar(ue.mkdirSync, Lt),
    realpathSync: Ar(ue.realpathSync, Lt),
    statSync: Ar(ue.statSync, Lt),
    unlinkSync: Ar(ue.unlinkSync, Lt)
  },
  retry: {
    /* ASYNC */
    close: Kr(st(ue.close), ot),
    fsync: Kr(st(ue.fsync), ot),
    open: Kr(st(ue.open), ot),
    readFile: Kr(st(ue.readFile), ot),
    rename: Kr(st(ue.rename), ot),
    stat: Kr(st(ue.stat), ot),
    write: Kr(st(ue.write), ot),
    writeFile: Kr(st(ue.writeFile), ot),
    /* SYNC */
    closeSync: Wr(ue.closeSync, ot),
    fsyncSync: Wr(ue.fsyncSync, ot),
    openSync: Wr(ue.openSync, ot),
    readFileSync: Wr(ue.readFileSync, ot),
    renameSync: Wr(ue.renameSync, ot),
    statSync: Wr(ue.statSync, ot),
    writeSync: Wr(ue.writeSync, ot),
    writeFileSync: Wr(ue.writeFileSync, ot)
  }
}, Fk = "utf8", xm = 438, jk = 511, Lk = {}, Uk = Fe.geteuid ? Fe.geteuid() : -1, Mk = Fe.getegid ? Fe.getegid() : -1, xk = 1e3, qk = !!Fe.getuid;
Fe.getuid && Fe.getuid();
const qm = 128, Bk = (e) => e instanceof Error && "code" in e, Bm = (e) => typeof e == "string", Il = (e) => e === void 0, Vk = Fe.platform === "linux", Uv = Fe.platform === "win32", mf = ["SIGHUP", "SIGINT", "SIGTERM"];
Uv || mf.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
Vk && mf.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class Hk {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Uv && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? Fe.kill(Fe.pid, "SIGTERM") : Fe.kill(Fe.pid, t));
      }
    }, this.hook = () => {
      Fe.once("exit", () => this.exit());
      for (const t of mf)
        try {
          Fe.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Gk = new Hk(), zk = Gk.register, ut = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = ut.truncate(t(e));
    return n in ut.store ? ut.get(e, t, r) : (ut.store[n] = r, [n, () => delete ut.store[n]]);
  },
  purge: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlink(e));
  },
  purgeSync: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in ut.store)
      ut.purgeSync(e);
  },
  truncate: (e) => {
    const t = X.basename(e);
    if (t.length <= qm)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - qm;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
zk(ut.purgeSyncAll);
function Mv(e, t, r = Lk) {
  if (Bm(r))
    return Mv(e, t, { encoding: r });
  const i = { timeout: r.timeout ?? xk };
  let s = null, o = null, a = null;
  try {
    const c = lt.attempt.realpathSync(e), u = !!c;
    e = c || e, [o, s] = ut.get(e, r.tmpCreate || ut.create, r.tmpPurge !== !1);
    const l = qk && Il(r.chown), f = Il(r.mode);
    if (u && (l || f)) {
      const h = lt.attempt.statSync(e);
      h && (r = { ...r }, l && (r.chown = { uid: h.uid, gid: h.gid }), f && (r.mode = h.mode));
    }
    if (!u) {
      const h = X.dirname(e);
      lt.attempt.mkdirSync(h, {
        mode: jk,
        recursive: !0
      });
    }
    a = lt.retry.openSync(i)(o, "w", r.mode || xm), r.tmpCreated && r.tmpCreated(o), Bm(t) ? lt.retry.writeSync(i)(a, t, 0, r.encoding || Fk) : Il(t) || lt.retry.writeSync(i)(a, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? lt.retry.fsyncSync(i)(a) : lt.attempt.fsync(a)), lt.retry.closeSync(i)(a), a = null, r.chown && (r.chown.uid !== Uk || r.chown.gid !== Mk) && lt.attempt.chownSync(o, r.chown.uid, r.chown.gid), r.mode && r.mode !== xm && lt.attempt.chmodSync(o, r.mode);
    try {
      lt.retry.renameSync(i)(o, e);
    } catch (h) {
      if (!Bk(h) || h.code !== "ENAMETOOLONG")
        throw h;
      lt.retry.renameSync(i)(o, ut.truncate(e));
    }
    s(), o = null;
  } finally {
    a && lt.attempt.closeSync(a), o && ut.purge(o);
  }
}
var fu = { exports: {} }, xv = {}, ir = {}, Vi = {}, Ao = {}, oe = {}, co = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((T, I) => `${T}${I}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((T, I) => (I instanceof r && (T[I.str] = (T[I.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...E) {
    const T = [m[0]];
    let I = 0;
    for (; I < E.length; )
      a(T, E[I]), T.push(m[++I]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function o(m, ...E) {
    const T = [p(m[0])];
    let I = 0;
    for (; I < E.length; )
      T.push(s), a(T, E[I]), T.push(s, p(m[++I]));
    return c(T), new n(T);
  }
  e.str = o;
  function a(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(f(E));
  }
  e.addCodeArg = a;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === s) {
        const T = u(m[E - 1], m[E + 1]);
        if (T !== void 0) {
          m.splice(E - 1, 3, T);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function u(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  e.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function h(m) {
    return new n(p(m));
  }
  e.stringify = h;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function g(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = g;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(co);
var du = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = co;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class a extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const h = this.toName(u), { prefix: p } = h, g = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let $ = this._values[p];
      if ($) {
        const E = $.get(g);
        if (E)
          return E;
      } else
        $ = this._values[p] = /* @__PURE__ */ new Map();
      $.set(g, h);
      const _ = this._scope[p] || (this._scope[p] = []), m = _.length;
      return _[m] = l.ref, h.setValue(l, { property: p, itemIndex: m }), h;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (h) => {
        if (h.value === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return h.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, h) {
      let p = t.nil;
      for (const g in u) {
        const $ = u[g];
        if (!$)
          continue;
        const _ = f[g] = f[g] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = l(m);
          if (E) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${T} ${m} = ${E};${this.opts._n}`;
          } else if (E = h == null ? void 0 : h(m))
            p = (0, t._)`${p}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = a;
})(du);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = co, r = du;
  var n = co;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = du;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, v) {
      return this;
    }
  }
  class o extends s {
    constructor(d, v, A) {
      super(), this.varKind = d, this.name = v, this.rhs = A;
    }
    render({ es5: d, _n: v }) {
      const A = d ? r.varKinds.var : this.varKind, w = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${A} ${this.name}${w};` + v;
    }
    optimizeNames(d, v) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, d, v)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class a extends s {
    constructor(d, v, A) {
      super(), this.lhs = d, this.rhs = v, this.sideEffects = A;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, v) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, d, v), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Z(d, this.rhs);
    }
  }
  class c extends a {
    constructor(d, v, A, w) {
      super(d, A, w), this.op = v;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class h extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, v) {
      return this.code = j(this.code, d, v), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((v, A) => v + A.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let v = d.length;
      for (; v--; ) {
        const A = d[v].optimizeNodes();
        Array.isArray(A) ? d.splice(v, 1, ...A) : A ? d[v] = A : d.splice(v, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, v) {
      const { nodes: A } = this;
      let w = A.length;
      for (; w--; ) {
        const y = A[w];
        y.optimizeNames(d, v) || (L(d, y.names), A.splice(w, 1));
      }
      return A.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, v) => B(d, v.names), {});
    }
  }
  class g extends p {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class $ extends p {
  }
  class _ extends g {
  }
  _.kind = "else";
  class m extends g {
    constructor(d, v) {
      super(v), this.condition = d;
    }
    render(d) {
      let v = `if(${this.condition})` + super.render(d);
      return this.else && (v += "else " + this.else.render(d)), v;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let v = this.else;
      if (v) {
        const A = v.optimizeNodes();
        v = this.else = Array.isArray(A) ? new _(A) : A;
      }
      if (v)
        return d === !1 ? v instanceof m ? v : v.nodes : this.nodes.length ? this : new m(V(d), v instanceof m ? [v] : v.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, v) {
      var A;
      if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(d, v), !!(super.optimizeNames(d, v) || this.else))
        return this.condition = j(this.condition, d, v), this;
    }
    get names() {
      const d = super.names;
      return Z(d, this.condition), this.else && B(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends g {
  }
  E.kind = "for";
  class T extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, v) {
      if (super.optimizeNames(d, v))
        return this.iteration = j(this.iteration, d, v), this;
    }
    get names() {
      return B(super.names, this.iteration.names);
    }
  }
  class I extends E {
    constructor(d, v, A, w) {
      super(), this.varKind = d, this.name = v, this.from = A, this.to = w;
    }
    render(d) {
      const v = d.es5 ? r.varKinds.var : this.varKind, { name: A, from: w, to: y } = this;
      return `for(${v} ${A}=${w}; ${A}<${y}; ${A}++)` + super.render(d);
    }
    get names() {
      const d = Z(super.names, this.from);
      return Z(d, this.to);
    }
  }
  class F extends E {
    constructor(d, v, A, w) {
      super(), this.loop = d, this.varKind = v, this.name = A, this.iterable = w;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, v) {
      if (super.optimizeNames(d, v))
        return this.iterable = j(this.iterable, d, v), this;
    }
    get names() {
      return B(super.names, this.iterable.names);
    }
  }
  class H extends g {
    constructor(d, v, A) {
      super(), this.name = d, this.args = v, this.async = A;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends p {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class he extends g {
    render(d) {
      let v = "try" + super.render(d);
      return this.catch && (v += this.catch.render(d)), this.finally && (v += this.finally.render(d)), v;
    }
    optimizeNodes() {
      var d, v;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (v = this.finally) === null || v === void 0 || v.optimizeNodes(), this;
    }
    optimizeNames(d, v) {
      var A, w;
      return super.optimizeNames(d, v), (A = this.catch) === null || A === void 0 || A.optimizeNames(d, v), (w = this.finally) === null || w === void 0 || w.optimizeNames(d, v), this;
    }
    get names() {
      const d = super.names;
      return this.catch && B(d, this.catch.names), this.finally && B(d, this.finally.names), d;
    }
  }
  class R extends g {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  R.kind = "catch";
  class Q extends g {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Q.kind = "finally";
  class x {
    constructor(d, v = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...v, _n: v.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, v) {
      const A = this._extScope.value(d, v);
      return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
    }
    getScopeValue(d, v) {
      return this._extScope.getValue(d, v);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, v, A, w) {
      const y = this._scope.toName(v);
      return A !== void 0 && w && (this._constants[y.str] = A), this._leafNode(new o(d, y, A)), y;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, v, A) {
      return this._def(r.varKinds.const, d, v, A);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, v, A) {
      return this._def(r.varKinds.let, d, v, A);
    }
    // `var` declaration with optional assignment
    var(d, v, A) {
      return this._def(r.varKinds.var, d, v, A);
    }
    // assignment code
    assign(d, v, A) {
      return this._leafNode(new a(d, v, A));
    }
    // `+=` code
    add(d, v) {
      return this._leafNode(new c(d, e.operators.ADD, v));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new h(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const v = ["{"];
      for (const [A, w] of d)
        v.length > 1 && v.push(","), v.push(A), (A !== w || this.opts.es5) && (v.push(":"), (0, t.addCodeArg)(v, w));
      return v.push("}"), new t._Code(v);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, v, A) {
      if (this._blockNode(new m(d)), v && A)
        this.code(v).else().code(A).endIf();
      else if (v)
        this.code(v).endIf();
      else if (A)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(d, v) {
      return this._blockNode(d), v && this.code(v).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, v) {
      return this._for(new T(d), v);
    }
    // `for` statement for a range of values
    forRange(d, v, A, w, y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(d);
      return this._for(new I(y, D, v, A), () => w(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, v, A, w = r.varKinds.const) {
      const y = this._scope.toName(d);
      if (this.opts.es5) {
        const D = v instanceof t.Name ? v : this.var("_arr", v);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (O) => {
          this.var(y, (0, t._)`${D}[${O}]`), A(y);
        });
      }
      return this._for(new F("of", w, y, v), () => A(y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, v, A, w = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${v})`, A);
      const y = this._scope.toName(d);
      return this._for(new F("in", w, y, v), () => A(y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const v = new z();
      if (this._blockNode(v), this.code(d), v.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, v, A) {
      if (!v && !A)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const w = new he();
      if (this._blockNode(w), this.code(d), v) {
        const y = this.name("e");
        this._currNode = w.catch = new R(y), v(y);
      }
      return A && (this._currNode = w.finally = new Q(), this.code(A)), this._endBlockNode(R, Q);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, v) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(v), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const v = this._blockStarts.pop();
      if (v === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const A = this._nodes.length - v;
      if (A < 0 || d !== void 0 && A !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${d} expected`);
      return this._nodes.length = v, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, v = t.nil, A, w) {
      return this._blockNode(new H(d, v, A)), w && this.code(w).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, v) {
      const A = this._currNode;
      if (A instanceof d || v && A instanceof v)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${v ? `${d.kind}/${v.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const v = this._currNode;
      if (!(v instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = v.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const v = this._nodes;
      v[v.length - 1] = d;
    }
  }
  e.CodeGen = x;
  function B(b, d) {
    for (const v in d)
      b[v] = (b[v] || 0) + (d[v] || 0);
    return b;
  }
  function Z(b, d) {
    return d instanceof t._CodeOrName ? B(b, d.names) : b;
  }
  function j(b, d, v) {
    if (b instanceof t.Name)
      return A(b);
    if (!w(b))
      return b;
    return new t._Code(b._items.reduce((y, D) => (D instanceof t.Name && (D = A(D)), D instanceof t._Code ? y.push(...D._items) : y.push(D), y), []));
    function A(y) {
      const D = v[y.str];
      return D === void 0 || d[y.str] !== 1 ? y : (delete d[y.str], D);
    }
    function w(y) {
      return y instanceof t._Code && y._items.some((D) => D instanceof t.Name && d[D.str] === 1 && v[D.str] !== void 0);
    }
  }
  function L(b, d) {
    for (const v in d)
      b[v] = (b[v] || 0) - (d[v] || 0);
  }
  function V(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${N(b)}`;
  }
  e.not = V;
  const U = S(e.operators.AND);
  function G(...b) {
    return b.reduce(U);
  }
  e.and = G;
  const q = S(e.operators.OR);
  function C(...b) {
    return b.reduce(q);
  }
  e.or = C;
  function S(b) {
    return (d, v) => d === t.nil ? v : v === t.nil ? d : (0, t._)`${N(d)} ${b} ${N(v)}`;
  }
  function N(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(oe);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const be = oe, Kk = co;
function Wk(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = Wk;
function Yk(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (qv(e, t), !Bv(t, e.self.RULES.all));
}
K.alwaysValidSchema = Yk;
function qv(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || Gv(e, `unknown keyword: "${s}"`);
}
K.checkUnknownRules = qv;
function Bv(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = Bv;
function Jk(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = Jk;
function Xk({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, be._)`${r}`;
  }
  return (0, be._)`${e}${t}${(0, be.getProperty)(n)}`;
}
K.schemaRefOrVal = Xk;
function Qk(e) {
  return Vv(decodeURIComponent(e));
}
K.unescapeFragment = Qk;
function Zk(e) {
  return encodeURIComponent(yf(e));
}
K.escapeFragment = Zk;
function yf(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = yf;
function Vv(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = Vv;
function eD(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = eD;
function Vm({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, o, a) => {
    const c = o === void 0 ? s : o instanceof be.Name ? (s instanceof be.Name ? e(i, s, o) : t(i, s, o), o) : s instanceof be.Name ? (t(i, o, s), s) : r(s, o);
    return a === be.Name && !(c instanceof be.Name) ? n(i, c) : c;
  };
}
K.mergeEvaluated = {
  props: Vm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, be._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, be._)`${r} || {}`).code((0, be._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, be._)`${r} || {}`), gf(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Hv
  }),
  items: Vm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, be._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, be._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Hv(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, be._)`{}`);
  return t !== void 0 && gf(e, r, t), r;
}
K.evaluatedPropsToName = Hv;
function gf(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, be._)`${t}${(0, be.getProperty)(n)}`, !0));
}
K.setEvaluated = gf;
const Hm = {};
function tD(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Hm[t.code] || (Hm[t.code] = new Kk._Code(t.code))
  });
}
K.useFunc = tD;
var hu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(hu || (K.Type = hu = {}));
function rD(e, t, r) {
  if (e instanceof be.Name) {
    const n = t === hu.Num;
    return r ? n ? (0, be._)`"[" + ${e} + "]"` : (0, be._)`"['" + ${e} + "']"` : n ? (0, be._)`"/" + ${e}` : (0, be._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, be.getProperty)(e).toString() : "/" + yf(e);
}
K.getErrorPath = rD;
function Gv(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = Gv;
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
const at = oe, nD = {
  // validation function arguments
  data: new at.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new at.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new at.Name("instancePath"),
  parentData: new at.Name("parentData"),
  parentDataProperty: new at.Name("parentDataProperty"),
  rootData: new at.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new at.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new at.Name("vErrors"),
  // null or array of validation errors
  errors: new at.Name("errors"),
  // counter of validation errors
  this: new at.Name("this"),
  // "globals"
  self: new at.Name("self"),
  scope: new at.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new at.Name("json"),
  jsonPos: new at.Name("jsonPos"),
  jsonLen: new at.Name("jsonLen"),
  jsonPart: new at.Name("jsonPart")
};
xt.default = nD;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = oe, r = K, n = xt;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, m = e.keywordError, E, T) {
    const { it: I } = _, { gen: F, compositeRule: H, allErrors: z } = I, he = f(_, m, E);
    T ?? (H || z) ? c(F, he) : u(I, (0, t._)`[${he}]`);
  }
  e.reportError = i;
  function s(_, m = e.keywordError, E) {
    const { it: T } = _, { gen: I, compositeRule: F, allErrors: H } = T, z = f(_, m, E);
    c(I, z), F || H || u(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function o(_, m) {
    _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function a({ gen: _, keyword: m, schemaValue: E, data: T, errsCount: I, it: F }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const H = _.name("err");
    _.forRange("i", I, n.default.errors, (z) => {
      _.const(H, (0, t._)`${n.default.vErrors}[${z}]`), _.if((0, t._)`${H}.instancePath === undefined`, () => _.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), _.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (_.assign((0, t._)`${H}.schema`, E), _.assign((0, t._)`${H}.data`, T));
    });
  }
  e.extendErrors = a;
  function c(_, m) {
    const E = _.const("err", m);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function u(_, m) {
    const { gen: E, validateName: T, schemaEnv: I } = _;
    I.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${T}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(_, m, E) {
    const { createErrors: T } = _.it;
    return T === !1 ? (0, t._)`{}` : h(_, m, E);
  }
  function h(_, m, E = {}) {
    const { gen: T, it: I } = _, F = [
      p(I, E),
      g(_, E)
    ];
    return $(_, m, F), T.object(...F);
  }
  function p({ errorPath: _ }, { instancePath: m }) {
    const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function g({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: T }) {
    let I = T ? m : (0, t.str)`${m}/${_}`;
    return E && (I = (0, t.str)`${I}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, I];
  }
  function $(_, { params: m, message: E }, T) {
    const { keyword: I, data: F, schemaValue: H, it: z } = _, { opts: he, propertyName: R, topSchemaRef: Q, schemaPath: x } = z;
    T.push([l.keyword, I], [l.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), he.messages && T.push([l.message, typeof E == "function" ? E(_) : E]), he.verbose && T.push([l.schema, H], [l.parentSchema, (0, t._)`${Q}${x}`], [n.default.data, F]), R && T.push([l.propertyName, R]);
  }
})(Ao);
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.boolOrEmptySchema = Vi.topBoolOrEmptySchema = void 0;
const iD = Ao, sD = oe, oD = xt, aD = {
  message: "boolean schema is false"
};
function cD(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? zv(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(oD.default.data) : (t.assign((0, sD._)`${n}.errors`, null), t.return(!0));
}
Vi.topBoolOrEmptySchema = cD;
function lD(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), zv(e)) : r.var(t, !0);
}
Vi.boolOrEmptySchema = lD;
function zv(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, iD.reportError)(i, aD, void 0, t);
}
var Be = {}, ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.getRules = ei.isJSONType = void 0;
const uD = ["string", "number", "integer", "boolean", "null", "object", "array"], fD = new Set(uD);
function dD(e) {
  return typeof e == "string" && fD.has(e);
}
ei.isJSONType = dD;
function hD() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
ei.getRules = hD;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.shouldUseRule = Cr.shouldUseGroup = Cr.schemaHasRulesForType = void 0;
function pD({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Kv(e, n);
}
Cr.schemaHasRulesForType = pD;
function Kv(e, t) {
  return t.rules.some((r) => Wv(e, r));
}
Cr.shouldUseGroup = Kv;
function Wv(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Cr.shouldUseRule = Wv;
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.reportTypeError = Be.checkDataTypes = Be.checkDataType = Be.coerceAndCheckDataType = Be.getJSONTypes = Be.getSchemaTypes = Be.DataType = void 0;
const mD = ei, yD = Cr, gD = Ao, ce = oe, Yv = K;
var Di;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Di || (Be.DataType = Di = {}));
function vD(e) {
  const t = Jv(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Be.getSchemaTypes = vD;
function Jv(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(mD.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Be.getJSONTypes = Jv;
function _D(e, t) {
  const { gen: r, data: n, opts: i } = e, s = $D(t, i.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, yD.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const a = vf(t, n, i.strictNumbers, Di.Wrong);
    r.if(a, () => {
      s.length ? wD(e, t, s) : _f(e);
    });
  }
  return o;
}
Be.coerceAndCheckDataType = _D;
const Xv = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function $D(e, t) {
  return t ? e.filter((r) => Xv.has(r) || t === "array" && r === "array") : [];
}
function wD(e, t, r) {
  const { gen: n, data: i, opts: s } = e, o = n.let("dataType", (0, ce._)`typeof ${i}`), a = n.let("coerced", (0, ce._)`undefined`);
  s.coerceTypes === "array" && n.if((0, ce._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ce._)`${i}[0]`).assign(o, (0, ce._)`typeof ${i}`).if(vf(t, i, s.strictNumbers), () => n.assign(a, i))), n.if((0, ce._)`${a} !== undefined`);
  for (const u of r)
    (Xv.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), _f(e), n.endIf(), n.if((0, ce._)`${a} !== undefined`, () => {
    n.assign(i, a), ED(e, a);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, ce._)`${o} == "number" || ${o} == "boolean"`).assign(a, (0, ce._)`"" + ${i}`).elseIf((0, ce._)`${i} === null`).assign(a, (0, ce._)`""`);
        return;
      case "number":
        n.elseIf((0, ce._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(a, (0, ce._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ce._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(a, (0, ce._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ce._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(a, !1).elseIf((0, ce._)`${i} === "true" || ${i} === 1`).assign(a, !0);
        return;
      case "null":
        n.elseIf((0, ce._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(a, null);
        return;
      case "array":
        n.elseIf((0, ce._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(a, (0, ce._)`[${i}]`);
    }
  }
}
function ED({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ce._)`${t} !== undefined`, () => e.assign((0, ce._)`${t}[${r}]`, n));
}
function pu(e, t, r, n = Di.Correct) {
  const i = n === Di.Correct ? ce.operators.EQ : ce.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, ce._)`${t} ${i} null`;
    case "array":
      s = (0, ce._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, ce._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, ce._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, ce._)`typeof ${t} ${i} ${e}`;
  }
  return n === Di.Correct ? s : (0, ce.not)(s);
  function o(a = ce.nil) {
    return (0, ce.and)((0, ce._)`typeof ${t} == "number"`, a, r ? (0, ce._)`isFinite(${t})` : ce.nil);
  }
}
Be.checkDataType = pu;
function vf(e, t, r, n) {
  if (e.length === 1)
    return pu(e[0], t, r, n);
  let i;
  const s = (0, Yv.toHash)(e);
  if (s.array && s.object) {
    const o = (0, ce._)`typeof ${t} != "object"`;
    i = s.null ? o : (0, ce._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    i = ce.nil;
  s.number && delete s.integer;
  for (const o in s)
    i = (0, ce.and)(i, pu(o, t, r, n));
  return i;
}
Be.checkDataTypes = vf;
const SD = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ce._)`{type: ${e}}` : (0, ce._)`{type: ${t}}`
};
function _f(e) {
  const t = bD(e);
  (0, gD.reportError)(t, SD);
}
Be.reportTypeError = _f;
function bD(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Yv.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Rc = {};
Object.defineProperty(Rc, "__esModule", { value: !0 });
Rc.assignDefaults = void 0;
const mi = oe, PD = K;
function TD(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Gm(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => Gm(e, s, i.default));
}
Rc.assignDefaults = TD;
function Gm(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: o } = e;
  if (r === void 0)
    return;
  const a = (0, mi._)`${s}${(0, mi.getProperty)(t)}`;
  if (i) {
    (0, PD.checkStrictMode)(e, `default is ignored for: ${a}`);
    return;
  }
  let c = (0, mi._)`${a} === undefined`;
  o.useDefaults === "empty" && (c = (0, mi._)`${c} || ${a} === null || ${a} === ""`), n.if(c, (0, mi._)`${a} = ${(0, mi.stringify)(r)}`);
}
var pr = {}, me = {};
Object.defineProperty(me, "__esModule", { value: !0 });
me.validateUnion = me.validateArray = me.usePattern = me.callValidateCode = me.schemaProperties = me.allSchemaProperties = me.noPropertyInData = me.propertyInData = me.isOwnProperty = me.hasPropFunc = me.reportMissingProp = me.checkMissingProp = me.checkReportMissingProp = void 0;
const Oe = oe, $f = K, Yr = xt, AD = K;
function ND(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Ef(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Oe._)`${t}` }, !0), e.error();
  });
}
me.checkReportMissingProp = ND;
function OD({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Oe.or)(...n.map((s) => (0, Oe.and)(Ef(e, t, s, r.ownProperties), (0, Oe._)`${i} = ${s}`)));
}
me.checkMissingProp = OD;
function RD(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
me.reportMissingProp = RD;
function Qv(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Oe._)`Object.prototype.hasOwnProperty`
  });
}
me.hasPropFunc = Qv;
function wf(e, t, r) {
  return (0, Oe._)`${Qv(e)}.call(${t}, ${r})`;
}
me.isOwnProperty = wf;
function ID(e, t, r, n) {
  const i = (0, Oe._)`${t}${(0, Oe.getProperty)(r)} !== undefined`;
  return n ? (0, Oe._)`${i} && ${wf(e, t, r)}` : i;
}
me.propertyInData = ID;
function Ef(e, t, r, n) {
  const i = (0, Oe._)`${t}${(0, Oe.getProperty)(r)} === undefined`;
  return n ? (0, Oe.or)(i, (0, Oe.not)(wf(e, t, r))) : i;
}
me.noPropertyInData = Ef;
function Zv(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
me.allSchemaProperties = Zv;
function CD(e, t) {
  return Zv(t).filter((r) => !(0, $f.alwaysValidSchema)(e, t[r]));
}
me.schemaProperties = CD;
function kD({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: o }, a, c, u) {
  const l = u ? (0, Oe._)`${e}, ${t}, ${n}${i}` : t, f = [
    [Yr.default.instancePath, (0, Oe.strConcat)(Yr.default.instancePath, s)],
    [Yr.default.parentData, o.parentData],
    [Yr.default.parentDataProperty, o.parentDataProperty],
    [Yr.default.rootData, Yr.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Yr.default.dynamicAnchors, Yr.default.dynamicAnchors]);
  const h = (0, Oe._)`${l}, ${r.object(...f)}`;
  return c !== Oe.nil ? (0, Oe._)`${a}.call(${c}, ${h})` : (0, Oe._)`${a}(${h})`;
}
me.callValidateCode = kD;
const DD = (0, Oe._)`new RegExp`;
function FD({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Oe._)`${i.code === "new RegExp" ? DD : (0, AD.useFunc)(e, i)}(${r}, ${n})`
  });
}
me.usePattern = FD;
function jD(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const a = t.let("valid", !0);
    return o(() => t.assign(a, !1)), a;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(a) {
    const c = t.const("len", (0, Oe._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: $f.Type.Num
      }, s), t.if((0, Oe.not)(s), a);
    });
  }
}
me.validateArray = jD;
function LD(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, $f.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), a = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, a);
    t.assign(o, (0, Oe._)`${o} || ${a}`), e.mergeValidEvaluated(l, a) || t.if((0, Oe.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
me.validateUnion = LD;
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.validateKeywordUsage = pr.validSchemaType = pr.funcKeywordCode = pr.macroKeywordCode = void 0;
const yt = oe, Bn = xt, UD = me, MD = Ao;
function xD(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: o } = e, a = t.macro.call(o.self, i, s, o), c = e_(r, n, a);
  o.opts.validateSchema !== !1 && o.self.validateSchema(a, !0);
  const u = r.name("valid");
  e.subschema({
    schema: a,
    schemaPath: yt.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
pr.macroKeywordCode = xD;
function qD(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: o, $data: a, it: c } = e;
  VD(c, t);
  const u = !a && t.compile ? t.compile.call(c.self, s, o, c) : t.validate, l = e_(n, i, u), f = n.let("valid");
  e.block$data(f, h), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function h() {
    if (t.errors === !1)
      $(), t.modifying && zm(e), _(() => e.error());
    else {
      const m = t.async ? p() : g();
      t.modifying && zm(e), _(() => BD(e, m));
    }
  }
  function p() {
    const m = n.let("ruleErrs", null);
    return n.try(() => $((0, yt._)`await `), (E) => n.assign(f, !1).if((0, yt._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, yt._)`${E}.errors`), () => n.throw(E))), m;
  }
  function g() {
    const m = (0, yt._)`${l}.errors`;
    return n.assign(m, null), $(yt.nil), m;
  }
  function $(m = t.async ? (0, yt._)`await ` : yt.nil) {
    const E = c.opts.passContext ? Bn.default.this : Bn.default.self, T = !("compile" in t && !a || t.schema === !1);
    n.assign(f, (0, yt._)`${m}${(0, UD.callValidateCode)(e, l, E, T)}`, t.modifying);
  }
  function _(m) {
    var E;
    n.if((0, yt.not)((E = t.valid) !== null && E !== void 0 ? E : f), m);
  }
}
pr.funcKeywordCode = qD;
function zm(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, yt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function BD(e, t) {
  const { gen: r } = e;
  r.if((0, yt._)`Array.isArray(${t})`, () => {
    r.assign(Bn.default.vErrors, (0, yt._)`${Bn.default.vErrors} === null ? ${t} : ${Bn.default.vErrors}.concat(${t})`).assign(Bn.default.errors, (0, yt._)`${Bn.default.vErrors}.length`), (0, MD.extendErrors)(e);
  }, () => e.error());
}
function VD({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function e_(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, yt.stringify)(r) });
}
function HD(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
pr.validSchemaType = HD;
function GD({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((a) => !Object.prototype.hasOwnProperty.call(e, a)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const c = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
pr.validateKeywordUsage = GD;
var dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.extendSubschemaMode = dn.extendSubschemaData = dn.getSubschema = void 0;
const dr = oe, t_ = K;
function zD(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const a = e.schema[t];
    return r === void 0 ? {
      schema: a,
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: a[r],
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}${(0, dr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, t_.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
dn.getSubschema = zD;
function KD(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: a } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, h = a.let("data", (0, dr._)`${t.data}${(0, dr.getProperty)(r)}`, !0);
    c(h), e.errorPath = (0, dr.str)`${u}${(0, t_.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, dr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof dr.Name ? i : a.let("data", i, !0);
    c(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
dn.extendSubschemaData = KD;
function WD(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
dn.extendSubschemaMode = WD;
var Ze = {}, Ic = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, s;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, s[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var o = s[i];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, r_ = { exports: {} }, ln = r_.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  Ea(t, n, i, e, "", e);
};
ln.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
ln.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
ln.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
ln.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Ea(e, t, r, n, i, s, o, a, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, o, a, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in ln.arrayKeywords)
          for (var h = 0; h < f.length; h++)
            Ea(e, t, r, f[h], i + "/" + l + "/" + h, s, i, l, n, h);
      } else if (l in ln.propsKeywords) {
        if (f && typeof f == "object")
          for (var p in f)
            Ea(e, t, r, f[p], i + "/" + l + "/" + YD(p), s, i, l, n, p);
      } else (l in ln.keywords || e.allKeys && !(l in ln.skipKeywords)) && Ea(e, t, r, f, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, o, a, c, u);
  }
}
function YD(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var JD = r_.exports;
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.getSchemaRefs = Ze.resolveUrl = Ze.normalizeId = Ze._getFullPath = Ze.getFullPath = Ze.inlineRef = void 0;
const XD = K, QD = Ic, ZD = JD, eF = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function tF(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !mu(e) : t ? n_(e) <= t : !1;
}
Ze.inlineRef = tF;
const rF = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function mu(e) {
  for (const t in e) {
    if (rF.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(mu) || typeof r == "object" && mu(r))
      return !0;
  }
  return !1;
}
function n_(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !eF.has(r) && (typeof e[r] == "object" && (0, XD.eachItem)(e[r], (n) => t += n_(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function i_(e, t = "", r) {
  r !== !1 && (t = Fi(t));
  const n = e.parse(t);
  return s_(e, n);
}
Ze.getFullPath = i_;
function s_(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ze._getFullPath = s_;
const nF = /#\/?$/;
function Fi(e) {
  return e ? e.replace(nF, "") : "";
}
Ze.normalizeId = Fi;
function iF(e, t, r) {
  return r = Fi(r), e.resolve(t, r);
}
Ze.resolveUrl = iF;
const sF = /^[a-z_][-a-z0-9._]*$/i;
function oF(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Fi(e[r] || t), s = { "": i }, o = i_(n, i, !1), a = {}, c = /* @__PURE__ */ new Set();
  return ZD(e, { allKeys: !0 }, (f, h, p, g) => {
    if (g === void 0)
      return;
    const $ = o + h;
    let _ = s[g];
    typeof f[r] == "string" && (_ = m.call(this, f[r])), E.call(this, f.$anchor), E.call(this, f.$dynamicAnchor), s[h] = _;
    function m(T) {
      const I = this.opts.uriResolver.resolve;
      if (T = Fi(_ ? I(_, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let F = this.refs[T];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? u(f, F.schema, T) : T !== Fi($) && (T[0] === "#" ? (u(f, a[T], T), a[T] = f) : this.refs[T] = $), T;
    }
    function E(T) {
      if (typeof T == "string") {
        if (!sF.test(T))
          throw new Error(`invalid anchor "${T}"`);
        m.call(this, `#${T}`);
      }
    }
  }), a;
  function u(f, h, p) {
    if (h !== void 0 && !QD(f, h))
      throw l(p);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Ze.getSchemaRefs = oF;
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.getData = ir.KeywordCxt = ir.validateFunctionCode = void 0;
const o_ = Vi, Km = Be, Sf = Cr, Ga = Be, aF = Rc, ks = pr, Cl = dn, ee = oe, ne = xt, cF = Ze, kr = K, vs = Ao;
function lF(e) {
  if (l_(e) && (u_(e), c_(e))) {
    dF(e);
    return;
  }
  a_(e, () => (0, o_.topBoolOrEmptySchema)(e));
}
ir.validateFunctionCode = lF;
function a_({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, ee._)`${ne.default.data}, ${ne.default.valCxt}`, n.$async, () => {
    e.code((0, ee._)`"use strict"; ${Wm(r, i)}`), fF(e, i), e.code(s);
  }) : e.func(t, (0, ee._)`${ne.default.data}, ${uF(i)}`, n.$async, () => e.code(Wm(r, i)).code(s));
}
function uF(e) {
  return (0, ee._)`{${ne.default.instancePath}="", ${ne.default.parentData}, ${ne.default.parentDataProperty}, ${ne.default.rootData}=${ne.default.data}${e.dynamicRef ? (0, ee._)`, ${ne.default.dynamicAnchors}={}` : ee.nil}}={}`;
}
function fF(e, t) {
  e.if(ne.default.valCxt, () => {
    e.var(ne.default.instancePath, (0, ee._)`${ne.default.valCxt}.${ne.default.instancePath}`), e.var(ne.default.parentData, (0, ee._)`${ne.default.valCxt}.${ne.default.parentData}`), e.var(ne.default.parentDataProperty, (0, ee._)`${ne.default.valCxt}.${ne.default.parentDataProperty}`), e.var(ne.default.rootData, (0, ee._)`${ne.default.valCxt}.${ne.default.rootData}`), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`${ne.default.valCxt}.${ne.default.dynamicAnchors}`);
  }, () => {
    e.var(ne.default.instancePath, (0, ee._)`""`), e.var(ne.default.parentData, (0, ee._)`undefined`), e.var(ne.default.parentDataProperty, (0, ee._)`undefined`), e.var(ne.default.rootData, ne.default.data), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`{}`);
  });
}
function dF(e) {
  const { schema: t, opts: r, gen: n } = e;
  a_(e, () => {
    r.$comment && t.$comment && d_(e), gF(e), n.let(ne.default.vErrors, null), n.let(ne.default.errors, 0), r.unevaluated && hF(e), f_(e), $F(e);
  });
}
function hF(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, ee._)`${r}.evaluated`), t.if((0, ee._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ee._)`${e.evaluated}.props`, (0, ee._)`undefined`)), t.if((0, ee._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ee._)`${e.evaluated}.items`, (0, ee._)`undefined`));
}
function Wm(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, ee._)`/*# sourceURL=${r} */` : ee.nil;
}
function pF(e, t) {
  if (l_(e) && (u_(e), c_(e))) {
    mF(e, t);
    return;
  }
  (0, o_.boolOrEmptySchema)(e, t);
}
function c_({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function l_(e) {
  return typeof e.schema != "boolean";
}
function mF(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && d_(e), vF(e), _F(e);
  const s = n.const("_errs", ne.default.errors);
  f_(e, s), n.var(t, (0, ee._)`${s} === ${ne.default.errors}`);
}
function u_(e) {
  (0, kr.checkUnknownRules)(e), yF(e);
}
function f_(e, t) {
  if (e.opts.jtd)
    return Ym(e, [], !1, t);
  const r = (0, Km.getSchemaTypes)(e.schema), n = (0, Km.coerceAndCheckDataType)(e, r);
  Ym(e, r, !n, t);
}
function yF(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, kr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function gF(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, kr.checkStrictMode)(e, "default is ignored in the schema root");
}
function vF(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, cF.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function _F(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function d_({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, ee._)`${ne.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, ee.str)`${n}/$comment`, a = e.scopeValue("root", { ref: t.root });
    e.code((0, ee._)`${ne.default.self}.opts.$comment(${s}, ${o}, ${a}.schema)`);
  }
}
function $F(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, ee._)`${ne.default.errors} === 0`, () => t.return(ne.default.data), () => t.throw((0, ee._)`new ${i}(${ne.default.vErrors})`)) : (t.assign((0, ee._)`${n}.errors`, ne.default.vErrors), s.unevaluated && wF(e), t.return((0, ee._)`${ne.default.errors} === 0`));
}
function wF({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof ee.Name && e.assign((0, ee._)`${t}.props`, r), n instanceof ee.Name && e.assign((0, ee._)`${t}.items`, n);
}
function Ym(e, t, r, n) {
  const { gen: i, schema: s, data: o, allErrors: a, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, kr.schemaHasRulesButRef)(s, l))) {
    i.block(() => m_(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || EF(e, t), i.block(() => {
    for (const h of l.rules)
      f(h);
    f(l.post);
  });
  function f(h) {
    (0, Sf.shouldUseGroup)(s, h) && (h.type ? (i.if((0, Ga.checkDataType)(h.type, o, c.strictNumbers)), Jm(e, h), t.length === 1 && t[0] === h.type && r && (i.else(), (0, Ga.reportTypeError)(e)), i.endIf()) : Jm(e, h), a || i.if((0, ee._)`${ne.default.errors} === ${n || 0}`));
  }
}
function Jm(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, aF.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, Sf.shouldUseRule)(n, s) && m_(e, s.keyword, s.definition, t.type);
  });
}
function EF(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (SF(e, t), e.opts.allowUnionTypes || bF(e, t), PF(e, e.dataTypes));
}
function SF(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      h_(e.dataTypes, r) || bf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), AF(e, t);
  }
}
function bF(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && bf(e, "use allowUnionTypes to allow union type keyword");
}
function PF(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, Sf.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => TF(t, o)) && bf(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function TF(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function h_(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function AF(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    h_(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function bf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, kr.checkStrictMode)(e, t, e.opts.strictTypes);
}
let p_ = class {
  constructor(t, r, n) {
    if ((0, ks.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, kr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", y_(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, ks.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ne.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, ee.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, ee.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, ee._)`${r} !== undefined && (${(0, ee.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? vs.reportExtraError : vs.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, vs.reportError)(this, this.def.$dataError || vs.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, vs.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = ee.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = ee.nil, r = ee.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: o } = this;
    n.if((0, ee.or)((0, ee._)`${i} === undefined`, r)), t !== ee.nil && n.assign(t, !0), (s.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== ee.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, ee.or)(o(), a());
    function o() {
      if (n.length) {
        if (!(r instanceof ee.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, ee._)`${(0, Ga.checkDataTypes)(c, r, s.opts.strictNumbers, Ga.DataType.Wrong)}`;
      }
      return ee.nil;
    }
    function a() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ee._)`!${c}(${r})`;
      }
      return ee.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Cl.getSubschema)(this.it, t);
    (0, Cl.extendSubschemaData)(n, this.it, t), (0, Cl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return pF(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = kr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = kr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, ee.Name)), !0;
  }
};
ir.KeywordCxt = p_;
function m_(e, t, r, n) {
  const i = new p_(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, ks.funcKeywordCode)(i, r) : "macro" in r ? (0, ks.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, ks.funcKeywordCode)(i, r);
}
const NF = /^\/(?:[^~]|~0|~1)*$/, OF = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function y_(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ne.default.rootData;
  if (e[0] === "/") {
    if (!NF.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ne.default.rootData;
  } else {
    const u = OF.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (s = r[t - l], !i)
      return s;
  }
  let o = s;
  const a = i.split("/");
  for (const u of a)
    u && (s = (0, ee._)`${s}${(0, ee.getProperty)((0, kr.unescapeJsonPointer)(u))}`, o = (0, ee._)`${o} && ${s}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
ir.getData = y_;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
let RF = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
No.default = RF;
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
const kl = Ze;
let IF = class extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, kl.resolveUrl)(t, r, n), this.missingSchema = (0, kl.normalizeId)((0, kl.getFullPath)(t, this.missingRef));
  }
};
Zi.default = IF;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.resolveSchema = vt.getCompilingSchema = vt.resolveRef = vt.compileSchema = vt.SchemaEnv = void 0;
const Xt = oe, CF = No, Dn = xt, rr = Ze, Xm = K, kF = ir;
let Cc = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rr.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
vt.SchemaEnv = Cc;
function Pf(e) {
  const t = g_.call(this, e);
  if (t)
    return t;
  const r = (0, rr.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new Xt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let a;
  e.$async && (a = o.scopeValue("Error", {
    ref: CF.default,
    code: (0, Xt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Dn.default.data,
    parentData: Dn.default.parentData,
    parentDataProperty: Dn.default.parentDataProperty,
    dataNames: [Dn.default.data],
    dataPathArr: [Xt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: a,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, kF.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(Dn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${Dn.default.self}`, `${Dn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: g, items: $ } = u;
      p.evaluated = {
        props: g instanceof Xt.Name ? void 0 : g,
        items: $ instanceof Xt.Name ? void 0 : $,
        dynamicProps: g instanceof Xt.Name,
        dynamicItems: $ instanceof Xt.Name
      }, p.source && (p.source.evaluated = (0, Xt.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
vt.compileSchema = Pf;
function DF(e, t, r) {
  var n;
  r = (0, rr.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = LF.call(this, e, r);
  if (s === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: a } = this.opts;
    o && (s = new Cc({ schema: o, schemaId: a, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = FF.call(this, s);
}
vt.resolveRef = DF;
function FF(e) {
  return (0, rr.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Pf.call(this, e);
}
function g_(e) {
  for (const t of this._compilations)
    if (jF(t, e))
      return t;
}
vt.getCompilingSchema = g_;
function jF(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function LF(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || kc.call(this, e, t);
}
function kc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rr._getFullPath)(this.opts.uriResolver, r);
  let i = (0, rr.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Dl.call(this, r, e);
  const s = (0, rr.normalizeId)(n), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const a = kc.call(this, e, o);
    return typeof (a == null ? void 0 : a.schema) != "object" ? void 0 : Dl.call(this, r, a);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Pf.call(this, o), s === (0, rr.normalizeId)(t)) {
      const { schema: a } = o, { schemaId: c } = this.opts, u = a[c];
      return u && (i = (0, rr.resolveUrl)(this.opts.uriResolver, i, u)), new Cc({ schema: a, schemaId: c, root: e, baseId: i });
    }
    return Dl.call(this, r, o);
  }
}
vt.resolveSchema = kc;
const UF = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Dl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const a of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Xm.unescapeFragment)(a)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !UF.has(a) && u && (t = (0, rr.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Xm.schemaHasRulesButRef)(r, this.RULES)) {
    const a = (0, rr.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = kc.call(this, n, a);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new Cc({ schema: r, schemaId: o, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const MF = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", xF = "Meta-schema for $data reference (JSON AnySchema extension proposal)", qF = "object", BF = [
  "$data"
], VF = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, HF = !1, GF = {
  $id: MF,
  description: xF,
  type: qF,
  required: BF,
  properties: VF,
  additionalProperties: HF
};
var Tf = {}, Dc = { exports: {} };
const zF = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), v_ = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function __(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const KF = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Qm(e) {
  return e.length = 0, !0;
}
function WF(e, t, r) {
  if (e.length) {
    const n = __(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function YF(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let s = !1, o = !1, a = WF;
  for (let c = 0; c < e.length; c++) {
    const u = e[c];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (s === !0 && (o = !0), !a(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (s = !0), n.push(":");
        continue;
      } else if (u === "%") {
        if (!a(i, n, r))
          break;
        a = Qm;
      } else {
        i.push(u);
        continue;
      }
  }
  return i.length && (a === Qm ? r.zone = i.join("") : o ? n.push(i.join("")) : n.push(__(i))), r.address = n.join(""), r;
}
function $_(e) {
  if (JF(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = YF(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function JF(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function XF(e) {
  let t = e;
  const r = [];
  let n = -1, i = 0;
  for (; i = t.length; ) {
    if (i === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (i === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (i === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function QF(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function ZF(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!v_(r)) {
      const n = $_(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var w_ = {
  nonSimpleDomain: KF,
  recomposeAuthority: ZF,
  normalizeComponentEncoding: QF,
  removeDotSegments: XF,
  isIPv4: v_,
  isUUID: zF,
  normalizeIPv6: $_
};
const { isUUID: ej } = w_, tj = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function E_(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function S_(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function b_(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function rj(e) {
  return e.secure = E_(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function nj(e) {
  if ((e.port === (E_(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function ij(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(tj);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, s = Af(i);
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function sj(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, s = Af(i);
  s && (e = s.serialize(e, t));
  const o = e, a = e.nss;
  return o.path = `${n || t.nid}:${a}`, t.skipEscape = !0, o;
}
function oj(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !ej(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function aj(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const P_ = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: S_,
    serialize: b_
  }
), cj = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: P_.domainHost,
    parse: S_,
    serialize: b_
  }
), Sa = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: rj,
    serialize: nj
  }
), lj = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Sa.domainHost,
    parse: Sa.parse,
    serialize: Sa.serialize
  }
), uj = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: ij,
    serialize: sj,
    skipNormalize: !0
  }
), fj = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: oj,
    serialize: aj,
    skipNormalize: !0
  }
), za = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: P_,
    https: cj,
    ws: Sa,
    wss: lj,
    urn: uj,
    "urn:uuid": fj
  }
);
Object.setPrototypeOf(za, null);
function Af(e) {
  return e && (za[
    /** @type {SchemeName} */
    e
  ] || za[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var dj = {
  SCHEMES: za,
  getSchemeHandler: Af
};
const { normalizeIPv6: hj, removeDotSegments: bs, recomposeAuthority: pj, normalizeComponentEncoding: sa, isIPv4: mj, nonSimpleDomain: yj } = w_, { SCHEMES: gj, getSchemeHandler: T_ } = dj;
function vj(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  mr(Ur(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Ur(mr(e, t), t)), e;
}
function _j(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = A_(Ur(e, n), Ur(t, n), n, !0);
  return n.skipEscape = !0, mr(i, n);
}
function A_(e, t, r, n) {
  const i = {};
  return n || (e = Ur(mr(e, r), r), t = Ur(mr(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = bs(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = bs(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = bs(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = bs(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function $j(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = mr(sa(Ur(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = mr(sa(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = mr(sa(Ur(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = mr(sa(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function mr(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], s = T_(n.scheme || r.scheme);
  s && s.serialize && s.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const o = pj(r);
  if (o !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(o), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let a = r.path;
    !n.absolutePath && (!s || !s.absolutePath) && (a = bs(a)), o === void 0 && a[0] === "/" && a[1] === "/" && (a = "/%2F" + a.slice(2)), i.push(a);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const wj = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Ur(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let i = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const s = e.match(wj);
  if (s) {
    if (n.scheme = s[1], n.userinfo = s[3], n.host = s[4], n.port = parseInt(s[5], 10), n.path = s[6] || "", n.query = s[7], n.fragment = s[8], isNaN(n.port) && (n.port = s[5]), n.host)
      if (mj(n.host) === !1) {
        const c = hj(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const o = T_(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!o || !o.unicodeSupport) && n.host && (r.domainHost || o && o.domainHost) && i === !1 && yj(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (a) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + a;
      }
    (!o || o && !o.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), o && o.parse && o.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Nf = {
  SCHEMES: gj,
  normalize: vj,
  resolve: _j,
  resolveComponent: A_,
  equal: $j,
  serialize: mr,
  parse: Ur
};
Dc.exports = Nf;
Dc.exports.default = Nf;
Dc.exports.fastUri = Nf;
var N_ = Dc.exports;
Object.defineProperty(Tf, "__esModule", { value: !0 });
const O_ = N_;
O_.code = 'require("ajv/dist/runtime/uri").default';
Tf.default = O_;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ir;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = oe;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = No, i = Zi, s = ei, o = vt, a = oe, c = Ze, u = Be, l = K, f = GF, h = Tf, p = (C, S) => new RegExp(C, S);
  p.code = "new RegExp";
  const g = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), _ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function T(C) {
    var S, N, b, d, v, A, w, y, D, O, W, de, Ee, Ae, Ie, nt, Se, qe, Yt, qt, kt, Bt, wr, Er, Sr;
    const Dt = C.strict, Vt = (S = C.code) === null || S === void 0 ? void 0 : S.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, qr = (b = (N = C.code) === null || N === void 0 ? void 0 : N.regExp) !== null && b !== void 0 ? b : p, At = (d = C.uriResolver) !== null && d !== void 0 ? d : h.default;
    return {
      strictSchema: (A = (v = C.strictSchema) !== null && v !== void 0 ? v : Dt) !== null && A !== void 0 ? A : !0,
      strictNumbers: (y = (w = C.strictNumbers) !== null && w !== void 0 ? w : Dt) !== null && y !== void 0 ? y : !0,
      strictTypes: (O = (D = C.strictTypes) !== null && D !== void 0 ? D : Dt) !== null && O !== void 0 ? O : "log",
      strictTuples: (de = (W = C.strictTuples) !== null && W !== void 0 ? W : Dt) !== null && de !== void 0 ? de : "log",
      strictRequired: (Ae = (Ee = C.strictRequired) !== null && Ee !== void 0 ? Ee : Dt) !== null && Ae !== void 0 ? Ae : !1,
      code: C.code ? { ...C.code, optimize: br, regExp: qr } : { optimize: br, regExp: qr },
      loopRequired: (Ie = C.loopRequired) !== null && Ie !== void 0 ? Ie : E,
      loopEnum: (nt = C.loopEnum) !== null && nt !== void 0 ? nt : E,
      meta: (Se = C.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (qe = C.messages) !== null && qe !== void 0 ? qe : !0,
      inlineRefs: (Yt = C.inlineRefs) !== null && Yt !== void 0 ? Yt : !0,
      schemaId: (qt = C.schemaId) !== null && qt !== void 0 ? qt : "$id",
      addUsedSchema: (kt = C.addUsedSchema) !== null && kt !== void 0 ? kt : !0,
      validateSchema: (Bt = C.validateSchema) !== null && Bt !== void 0 ? Bt : !0,
      validateFormats: (wr = C.validateFormats) !== null && wr !== void 0 ? wr : !0,
      unicodeRegExp: (Er = C.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (Sr = C.int32range) !== null && Sr !== void 0 ? Sr : !0,
      uriResolver: At
    };
  }
  class I {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...T(S) };
      const { es5: N, lines: b } = this.opts.code;
      this.scope = new a.ValueScope({ scope: {}, prefixes: $, es5: N, lines: b }), this.logger = B(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, s.getRules)(), F.call(this, _, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), S.formats && he.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && R.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), z.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: N, schemaId: b } = this.opts;
      let d = f;
      b === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), N && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: N } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[N] || S : void 0;
    }
    validate(S, N) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(N);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, N) {
      const b = this._addSchema(S, N);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, N) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, N);
      async function d(O, W) {
        await v.call(this, O.$schema);
        const de = this._addSchema(O, W);
        return de.validate || A.call(this, de);
      }
      async function v(O) {
        O && !this.getSchema(O) && await d.call(this, { $ref: O }, !0);
      }
      async function A(O) {
        try {
          return this._compileSchemaEnv(O);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return w.call(this, W), await y.call(this, W.missingSchema), A.call(this, O);
        }
      }
      function w({ missingSchema: O, missingRef: W }) {
        if (this.refs[O])
          throw new Error(`AnySchema ${O} is loaded but ${W} cannot be resolved`);
      }
      async function y(O) {
        const W = await D.call(this, O);
        this.refs[O] || await v.call(this, W.$schema), this.refs[O] || this.addSchema(W, O, N);
      }
      async function D(O) {
        const W = this._loading[O];
        if (W)
          return W;
        try {
          return await (this._loading[O] = b(O));
        } finally {
          delete this._loading[O];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, N, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const A of S)
          this.addSchema(A, void 0, b, d);
        return this;
      }
      let v;
      if (typeof S == "object") {
        const { schemaId: A } = this.opts;
        if (v = S[A], v !== void 0 && typeof v != "string")
          throw new Error(`schema ${A} must be string`);
      }
      return N = (0, c.normalizeId)(N || v), this._checkUnique(N), this.schemas[N] = this._addSchema(S, b, N, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, N, b = this.opts.validateSchema) {
      return this.addSchema(S, N, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, N) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && N) {
        const v = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(v);
        else
          throw new Error(v);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let N;
      for (; typeof (N = H.call(this, S)) == "string"; )
        S = N;
      if (N === void 0) {
        const { schemaId: b } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: b });
        if (N = o.resolveSchema.call(this, d, S), !N)
          return;
        this.refs[S] = N;
      }
      return N.validate || this._compileSchemaEnv(N);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const N = H.call(this, S);
          return typeof N == "object" && this._cache.delete(N.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const N = S;
          this._cache.delete(N);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const N of S)
        this.addKeyword(N);
      return this;
    }
    addKeyword(S, N) {
      let b;
      if (typeof S == "string")
        b = S, typeof N == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), N.keyword = b);
      else if (typeof S == "object" && N === void 0) {
        if (N = S, b = N.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, b, N), !N)
        return (0, l.eachItem)(b, (v) => L.call(this, v)), this;
      U.call(this, N);
      const d = {
        ...N,
        type: (0, u.getJSONTypes)(N.type),
        schemaType: (0, u.getJSONTypes)(N.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? (v) => L.call(this, v, d) : (v) => d.type.forEach((A) => L.call(this, v, d, A))), this;
    }
    getKeyword(S) {
      const N = this.RULES.all[S];
      return typeof N == "object" ? N.definition : !!N;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: N } = this;
      delete N.keywords[S], delete N.all[S];
      for (const b of N.rules) {
        const d = b.rules.findIndex((v) => v.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, N) {
      return typeof N == "string" && (N = new RegExp(N)), this.formats[S] = N, this;
    }
    errorsText(S = this.errors, { separator: N = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, v) => d + N + v);
    }
    $dataMetaSchema(S, N) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of N) {
        const v = d.split("/").slice(1);
        let A = S;
        for (const w of v)
          A = A[w];
        for (const w in b) {
          const y = b[w];
          if (typeof y != "object")
            continue;
          const { $data: D } = y.definition, O = A[w];
          D && O && (A[w] = q(O));
        }
      }
      return S;
    }
    _removeAllSchemas(S, N) {
      for (const b in S) {
        const d = S[b];
        (!N || N.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, N, b, d = this.opts.validateSchema, v = this.opts.addUsedSchema) {
      let A;
      const { schemaId: w } = this.opts;
      if (typeof S == "object")
        A = S[w];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let y = this._cache.get(S);
      if (y !== void 0)
        return y;
      b = (0, c.normalizeId)(A || b);
      const D = c.getSchemaRefs.call(this, S, b);
      return y = new o.SchemaEnv({ schema: S, schemaId: w, meta: N, baseId: b, localRefs: D }), this._cache.set(y.schema, y), v && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = y), d && this.validateSchema(S, !0), y;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : o.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const N = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, S);
      } finally {
        this.opts = N;
      }
    }
  }
  I.ValidationError = n.default, I.MissingRefError = i.default, e.default = I;
  function F(C, S, N, b = "error") {
    for (const d in C) {
      const v = d;
      v in S && this.logger[b](`${N}: option ${d}. ${C[v]}`);
    }
  }
  function H(C) {
    return C = (0, c.normalizeId)(C), this.schemas[C] || this.refs[C];
  }
  function z() {
    const C = this.opts.schemas;
    if (C)
      if (Array.isArray(C))
        this.addSchema(C);
      else
        for (const S in C)
          this.addSchema(C[S], S);
  }
  function he() {
    for (const C in this.opts.formats) {
      const S = this.opts.formats[C];
      S && this.addFormat(C, S);
    }
  }
  function R(C) {
    if (Array.isArray(C)) {
      this.addVocabulary(C);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in C) {
      const N = C[S];
      N.keyword || (N.keyword = S), this.addKeyword(N);
    }
  }
  function Q() {
    const C = { ...this.opts };
    for (const S of g)
      delete C[S];
    return C;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function B(C) {
    if (C === !1)
      return x;
    if (C === void 0)
      return console;
    if (C.log && C.warn && C.error)
      return C;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(C, S) {
    const { RULES: N } = this;
    if ((0, l.eachItem)(C, (b) => {
      if (N.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Z.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(C, S, N) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (N && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: v } = this;
    let A = d ? v.post : v.rules.find(({ type: y }) => y === N);
    if (A || (A = { type: N, rules: [] }, v.rules.push(A)), v.keywords[C] = !0, !S)
      return;
    const w = {
      keyword: C,
      definition: {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? V.call(this, A, w, S.before) : A.rules.push(w), v.all[C] = w, (b = S.implements) === null || b === void 0 || b.forEach((y) => this.addKeyword(y));
  }
  function V(C, S, N) {
    const b = C.rules.findIndex((d) => d.keyword === N);
    b >= 0 ? C.rules.splice(b, 0, S) : (C.rules.push(S), this.logger.warn(`rule ${N} is not defined`));
  }
  function U(C) {
    let { metaSchema: S } = C;
    S !== void 0 && (C.$data && this.opts.$data && (S = q(S)), C.validateSchema = this.compile(S, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function q(C) {
    return { anyOf: [C, G] };
  }
})(xv);
var Of = {}, Rf = {}, If = {};
Object.defineProperty(If, "__esModule", { value: !0 });
const Ej = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
If.default = Ej;
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.callRef = Mr.getValidate = void 0;
const Sj = Zi, Zm = me, Nt = oe, yi = xt, ey = vt, oa = K, bj = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: o, opts: a, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = ey.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new Sj.default(n.opts.uriResolver, i, r);
    if (l instanceof ey.SchemaEnv)
      return h(l);
    return p(l);
    function f() {
      if (s === u)
        return ba(e, o, s, s.$async);
      const g = t.scopeValue("root", { ref: u });
      return ba(e, (0, Nt._)`${g}.validate`, u, u.$async);
    }
    function h(g) {
      const $ = R_(e, g);
      ba(e, $, g, g.$async);
    }
    function p(g) {
      const $ = t.scopeValue("schema", a.code.source === !0 ? { ref: g, code: (0, Nt.stringify)(g) } : { ref: g }), _ = t.name("valid"), m = e.subschema({
        schema: g,
        dataTypes: [],
        schemaPath: Nt.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function R_(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Nt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Mr.getValidate = R_;
function ba(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: o, schemaEnv: a, opts: c } = s, u = c.passContext ? yi.default.this : Nt.nil;
  n ? l() : f();
  function l() {
    if (!a.$async)
      throw new Error("async schema referenced by sync schema");
    const g = i.let("valid");
    i.try(() => {
      i.code((0, Nt._)`await ${(0, Zm.callValidateCode)(e, t, u)}`), p(t), o || i.assign(g, !0);
    }, ($) => {
      i.if((0, Nt._)`!(${$} instanceof ${s.ValidationError})`, () => i.throw($)), h($), o || i.assign(g, !1);
    }), e.ok(g);
  }
  function f() {
    e.result((0, Zm.callValidateCode)(e, t, u), () => p(t), () => h(t));
  }
  function h(g) {
    const $ = (0, Nt._)`${g}.errors`;
    i.assign(yi.default.vErrors, (0, Nt._)`${yi.default.vErrors} === null ? ${$} : ${yi.default.vErrors}.concat(${$})`), i.assign(yi.default.errors, (0, Nt._)`${yi.default.vErrors}.length`);
  }
  function p(g) {
    var $;
    if (!s.opts.unevaluated)
      return;
    const _ = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (s.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (s.props = oa.mergeEvaluated.props(i, _.props, s.props));
      else {
        const m = i.var("props", (0, Nt._)`${g}.evaluated.props`);
        s.props = oa.mergeEvaluated.props(i, m, s.props, Nt.Name);
      }
    if (s.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (s.items = oa.mergeEvaluated.items(i, _.items, s.items));
      else {
        const m = i.var("items", (0, Nt._)`${g}.evaluated.items`);
        s.items = oa.mergeEvaluated.items(i, m, s.items, Nt.Name);
      }
  }
}
Mr.callRef = ba;
Mr.default = bj;
Object.defineProperty(Rf, "__esModule", { value: !0 });
const Pj = If, Tj = Mr, Aj = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Pj.default,
  Tj.default
];
Rf.default = Aj;
var Cf = {}, kf = {};
Object.defineProperty(kf, "__esModule", { value: !0 });
const Ka = oe, Jr = Ka.operators, Wa = {
  maximum: { okStr: "<=", ok: Jr.LTE, fail: Jr.GT },
  minimum: { okStr: ">=", ok: Jr.GTE, fail: Jr.LT },
  exclusiveMaximum: { okStr: "<", ok: Jr.LT, fail: Jr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Jr.GT, fail: Jr.LTE }
}, Nj = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ka.str)`must be ${Wa[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ka._)`{comparison: ${Wa[e].okStr}, limit: ${t}}`
}, Oj = {
  keyword: Object.keys(Wa),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Nj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ka._)`${r} ${Wa[t].fail} ${n} || isNaN(${r})`);
  }
};
kf.default = Oj;
var Df = {};
Object.defineProperty(Df, "__esModule", { value: !0 });
const Ds = oe, Rj = {
  message: ({ schemaCode: e }) => (0, Ds.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Ds._)`{multipleOf: ${e}}`
}, Ij = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Rj,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, o = t.let("res"), a = s ? (0, Ds._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Ds._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Ds._)`(${n} === 0 || (${o} = ${r}/${n}, ${a}))`);
  }
};
Df.default = Ij;
var Ff = {}, jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
function I_(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
jf.default = I_;
I_.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ff, "__esModule", { value: !0 });
const Vn = oe, Cj = K, kj = jf, Dj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Vn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Vn._)`{limit: ${e}}`
}, Fj = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Dj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Vn.operators.GT : Vn.operators.LT, o = i.opts.unicode === !1 ? (0, Vn._)`${r}.length` : (0, Vn._)`${(0, Cj.useFunc)(e.gen, kj.default)}(${r})`;
    e.fail$data((0, Vn._)`${o} ${s} ${n}`);
  }
};
Ff.default = Fj;
var Lf = {};
Object.defineProperty(Lf, "__esModule", { value: !0 });
const jj = me, Ya = oe, Lj = {
  message: ({ schemaCode: e }) => (0, Ya.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ya._)`{pattern: ${e}}`
}, Uj = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Lj,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", a = r ? (0, Ya._)`(new RegExp(${i}, ${o}))` : (0, jj.usePattern)(e, n);
    e.fail$data((0, Ya._)`!${a}.test(${t})`);
  }
};
Lf.default = Uj;
var Uf = {};
Object.defineProperty(Uf, "__esModule", { value: !0 });
const Fs = oe, Mj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Fs.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Fs._)`{limit: ${e}}`
}, xj = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Mj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Fs.operators.GT : Fs.operators.LT;
    e.fail$data((0, Fs._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Uf.default = xj;
var Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const _s = me, js = oe, qj = K, Bj = {
  message: ({ params: { missingProperty: e } }) => (0, js.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, js._)`{missingProperty: ${e}}`
}, Vj = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Bj,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: o } = e, { opts: a } = o;
    if (!s && r.length === 0)
      return;
    const c = r.length >= a.loopRequired;
    if (o.allErrors ? u() : l(), a.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: g } = e.it;
      for (const $ of r)
        if ((p == null ? void 0 : p[$]) === void 0 && !g.has($)) {
          const _ = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${_}" (strictRequired)`;
          (0, qj.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(js.nil, f);
      else
        for (const p of r)
          (0, _s.checkReportMissingProp)(e, p);
    }
    function l() {
      const p = t.let("missing");
      if (c || s) {
        const g = t.let("valid", !0);
        e.block$data(g, () => h(p, g)), e.ok(g);
      } else
        t.if((0, _s.checkMissingProp)(e, r, p)), (0, _s.reportMissingProp)(e, p), t.else();
    }
    function f() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, _s.noPropertyInData)(t, i, p, a.ownProperties), () => e.error());
      });
    }
    function h(p, g) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(g, (0, _s.propertyInData)(t, i, p, a.ownProperties)), t.if((0, js.not)(g), () => {
          e.error(), t.break();
        });
      }, js.nil);
    }
  }
};
Mf.default = Vj;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const Ls = oe, Hj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Ls.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Ls._)`{limit: ${e}}`
}, Gj = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Hj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Ls.operators.GT : Ls.operators.LT;
    e.fail$data((0, Ls._)`${r}.length ${i} ${n}`);
  }
};
xf.default = Gj;
var qf = {}, Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const C_ = Ic;
C_.code = 'require("ajv/dist/runtime/equal").default';
Oo.default = C_;
Object.defineProperty(qf, "__esModule", { value: !0 });
const Fl = Be, Xe = oe, zj = K, Kj = Oo, Wj = {
  message: ({ params: { i: e, j: t } }) => (0, Xe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Xe._)`{i: ${e}, j: ${t}}`
}, Yj = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Wj,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: o, it: a } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, Fl.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, Xe._)`${o} === false`), e.ok(c);
    function l() {
      const g = t.let("i", (0, Xe._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: g, j: $ }), t.assign(c, !0), t.if((0, Xe._)`${g} > 1`, () => (f() ? h : p)(g, $));
    }
    function f() {
      return u.length > 0 && !u.some((g) => g === "object" || g === "array");
    }
    function h(g, $) {
      const _ = t.name("item"), m = (0, Fl.checkDataTypes)(u, _, a.opts.strictNumbers, Fl.DataType.Wrong), E = t.const("indices", (0, Xe._)`{}`);
      t.for((0, Xe._)`;${g}--;`, () => {
        t.let(_, (0, Xe._)`${r}[${g}]`), t.if(m, (0, Xe._)`continue`), u.length > 1 && t.if((0, Xe._)`typeof ${_} == "string"`, (0, Xe._)`${_} += "_"`), t.if((0, Xe._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign($, (0, Xe._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Xe._)`${E}[${_}] = ${g}`);
      });
    }
    function p(g, $) {
      const _ = (0, zj.useFunc)(t, Kj.default), m = t.name("outer");
      t.label(m).for((0, Xe._)`;${g}--;`, () => t.for((0, Xe._)`${$} = ${g}; ${$}--;`, () => t.if((0, Xe._)`${_}(${r}[${g}], ${r}[${$}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
qf.default = Yj;
var Bf = {};
Object.defineProperty(Bf, "__esModule", { value: !0 });
const yu = oe, Jj = K, Xj = Oo, Qj = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, yu._)`{allowedValue: ${e}}`
}, Zj = {
  keyword: "const",
  $data: !0,
  error: Qj,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, yu._)`!${(0, Jj.useFunc)(t, Xj.default)}(${r}, ${i})`) : e.fail((0, yu._)`${s} !== ${r}`);
  }
};
Bf.default = Zj;
var Vf = {};
Object.defineProperty(Vf, "__esModule", { value: !0 });
const Ps = oe, e2 = K, t2 = Oo, r2 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ps._)`{allowedValues: ${e}}`
}, n2 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: r2,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const a = i.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, e2.useFunc)(t, t2.default));
    let l;
    if (a || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", s);
      l = (0, Ps.or)(...i.map((g, $) => h(p, $)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (p) => t.if((0, Ps._)`${u()}(${r}, ${p})`, () => t.assign(l, !0).break()));
    }
    function h(p, g) {
      const $ = i[g];
      return typeof $ == "object" && $ !== null ? (0, Ps._)`${u()}(${r}, ${p}[${g}])` : (0, Ps._)`${r} === ${$}`;
    }
  }
};
Vf.default = n2;
Object.defineProperty(Cf, "__esModule", { value: !0 });
const i2 = kf, s2 = Df, o2 = Ff, a2 = Lf, c2 = Uf, l2 = Mf, u2 = xf, f2 = qf, d2 = Bf, h2 = Vf, p2 = [
  // number
  i2.default,
  s2.default,
  // string
  o2.default,
  a2.default,
  // object
  c2.default,
  l2.default,
  // array
  u2.default,
  f2.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  d2.default,
  h2.default
];
Cf.default = p2;
var Hf = {}, es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.validateAdditionalItems = void 0;
const Hn = oe, gu = K, m2 = {
  message: ({ params: { len: e } }) => (0, Hn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hn._)`{limit: ${e}}`
}, y2 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: m2,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, gu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    k_(e, n);
  }
};
function k_(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: o } = e;
  o.items = !0;
  const a = r.const("len", (0, Hn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Hn._)`${a} <= ${t.length}`);
  else if (typeof n == "object" && !(0, gu.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, Hn._)`${a} <= ${t.length}`);
    r.if((0, Hn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, a, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: gu.Type.Num }, u), o.allErrors || r.if((0, Hn.not)(u), () => r.break());
    });
  }
}
es.validateAdditionalItems = k_;
es.default = y2;
var Gf = {}, ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.validateTuple = void 0;
const ty = oe, Pa = K, g2 = me, v2 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return D_(e, "additionalItems", t);
    r.items = !0, !(0, Pa.alwaysValidSchema)(r, t) && e.ok((0, g2.validateArray)(e));
  }
};
function D_(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: o, it: a } = e;
  l(i), a.opts.unevaluated && r.length && a.items !== !0 && (a.items = Pa.mergeEvaluated.items(n, r.length, a.items));
  const c = n.name("valid"), u = n.const("len", (0, ty._)`${s}.length`);
  r.forEach((f, h) => {
    (0, Pa.alwaysValidSchema)(a, f) || (n.if((0, ty._)`${u} > ${h}`, () => e.subschema({
      keyword: o,
      schemaProp: h,
      dataProp: h
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: h, errSchemaPath: p } = a, g = r.length, $ = g === f.minItems && (g === f.maxItems || f[t] === !1);
    if (h.strictTuples && !$) {
      const _ = `"${o}" is ${g}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, Pa.checkStrictMode)(a, _, h.strictTuples);
    }
  }
}
ts.validateTuple = D_;
ts.default = v2;
Object.defineProperty(Gf, "__esModule", { value: !0 });
const _2 = ts, $2 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, _2.validateTuple)(e, "items")
};
Gf.default = $2;
var zf = {};
Object.defineProperty(zf, "__esModule", { value: !0 });
const ry = oe, w2 = K, E2 = me, S2 = es, b2 = {
  message: ({ params: { len: e } }) => (0, ry.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ry._)`{limit: ${e}}`
}, P2 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: b2,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, w2.alwaysValidSchema)(n, t) && (i ? (0, S2.validateAdditionalItems)(e, i) : e.ok((0, E2.validateArray)(e)));
  }
};
zf.default = P2;
var Kf = {};
Object.defineProperty(Kf, "__esModule", { value: !0 });
const zt = oe, aa = K, T2 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, zt.str)`must contain at least ${e} valid item(s)` : (0, zt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, zt._)`{minContains: ${e}}` : (0, zt._)`{minContains: ${e}, maxContains: ${t}}`
}, A2 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: T2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let o, a;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (o = c === void 0 ? 1 : c, a = u) : o = 1;
    const l = t.const("len", (0, zt._)`${i}.length`);
    if (e.setParams({ min: o, max: a }), a === void 0 && o === 0) {
      (0, aa.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (a !== void 0 && o > a) {
      (0, aa.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, aa.alwaysValidSchema)(s, r)) {
      let $ = (0, zt._)`${l} >= ${o}`;
      a !== void 0 && ($ = (0, zt._)`${$} && ${l} <= ${a}`), e.pass($);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    a === void 0 && o === 1 ? p(f, () => t.if(f, () => t.break())) : o === 0 ? (t.let(f, !0), a !== void 0 && t.if((0, zt._)`${i}.length > 0`, h)) : (t.let(f, !1), h()), e.result(f, () => e.reset());
    function h() {
      const $ = t.name("_valid"), _ = t.let("count", 0);
      p($, () => t.if($, () => g(_)));
    }
    function p($, _) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: aa.Type.Num,
          compositeRule: !0
        }, $), _();
      });
    }
    function g($) {
      t.code((0, zt._)`${$}++`), a === void 0 ? t.if((0, zt._)`${$} >= ${o}`, () => t.assign(f, !0).break()) : (t.if((0, zt._)`${$} > ${a}`, () => t.assign(f, !1).break()), o === 1 ? t.assign(f, !0) : t.if((0, zt._)`${$} >= ${o}`, () => t.assign(f, !0)));
    }
  }
};
Kf.default = A2;
var Fc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = K, n = me;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      o(c, u), a(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const h = Array.isArray(c[f]) ? u : l;
      h[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: h } = c;
    if (Object.keys(u).length === 0)
      return;
    const p = l.let("missing");
    for (const g in u) {
      const $ = u[g];
      if ($.length === 0)
        continue;
      const _ = (0, n.propertyInData)(l, f, g, h.opts.ownProperties);
      c.setParams({
        property: g,
        depsCount: $.length,
        deps: $.join(", ")
      }), h.allErrors ? l.if(_, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, $, p)})`), (0, n.reportMissingProp)(c, p), l.else());
    }
  }
  e.validatePropertyDeps = o;
  function a(c, u = c.schema) {
    const { gen: l, data: f, keyword: h, it: p } = c, g = l.name("valid");
    for (const $ in u)
      (0, r.alwaysValidSchema)(p, u[$]) || (l.if(
        (0, n.propertyInData)(l, f, $, p.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: h, schemaProp: $ }, g);
          c.mergeValidEvaluated(_, g);
        },
        () => l.var(g, !0)
        // TODO var
      ), c.ok(g));
  }
  e.validateSchemaDeps = a, e.default = i;
})(Fc);
var Wf = {};
Object.defineProperty(Wf, "__esModule", { value: !0 });
const F_ = oe, N2 = K, O2 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, F_._)`{propertyName: ${e.propertyName}}`
}, R2 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: O2,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, N2.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, F_.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Wf.default = R2;
var jc = {};
Object.defineProperty(jc, "__esModule", { value: !0 });
const ca = me, Zt = oe, I2 = xt, la = K, C2 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Zt._)`{additionalProperty: ${e.additionalProperty}}`
}, k2 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: C2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: a, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, la.alwaysValidSchema)(o, r))
      return;
    const u = (0, ca.allSchemaProperties)(n.properties), l = (0, ca.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Zt._)`${s} === ${I2.default.errors}`);
    function f() {
      t.forIn("key", i, (_) => {
        !u.length && !l.length ? g(_) : t.if(h(_), () => g(_));
      });
    }
    function h(_) {
      let m;
      if (u.length > 8) {
        const E = (0, la.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, ca.isOwnProperty)(t, E, _);
      } else u.length ? m = (0, Zt.or)(...u.map((E) => (0, Zt._)`${_} === ${E}`)) : m = Zt.nil;
      return l.length && (m = (0, Zt.or)(m, ...l.map((E) => (0, Zt._)`${(0, ca.usePattern)(e, E)}.test(${_})`))), (0, Zt.not)(m);
    }
    function p(_) {
      t.code((0, Zt._)`delete ${i}[${_}]`);
    }
    function g(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), a || t.break();
        return;
      }
      if (typeof r == "object" && !(0, la.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? ($(_, m, !1), t.if((0, Zt.not)(m), () => {
          e.reset(), p(_);
        })) : ($(_, m), a || t.if((0, Zt.not)(m), () => t.break()));
      }
    }
    function $(_, m, E) {
      const T = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: la.Type.Str
      };
      E === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, m);
    }
  }
};
jc.default = k2;
var Yf = {};
Object.defineProperty(Yf, "__esModule", { value: !0 });
const D2 = ir, ny = me, jl = K, iy = jc, F2 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && iy.default.code(new D2.KeywordCxt(s, iy.default, "additionalProperties"));
    const o = (0, ny.allSchemaProperties)(r);
    for (const f of o)
      s.definedProperties.add(f);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = jl.mergeEvaluated.props(t, (0, jl.toHash)(o), s.props));
    const a = o.filter((f) => !(0, jl.alwaysValidSchema)(s, r[f]));
    if (a.length === 0)
      return;
    const c = t.name("valid");
    for (const f of a)
      u(f) ? l(f) : (t.if((0, ny.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Yf.default = F2;
var Jf = {};
Object.defineProperty(Jf, "__esModule", { value: !0 });
const sy = me, ua = oe, oy = K, ay = K, j2 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: o } = s, a = (0, sy.allSchemaProperties)(r), c = a.filter(($) => (0, oy.alwaysValidSchema)(s, r[$]));
    if (a.length === 0 || c.length === a.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof ua.Name) && (s.props = (0, ay.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    h();
    function h() {
      for (const $ of a)
        u && p($), s.allErrors ? g($) : (t.var(l, !0), g($), t.if(l));
    }
    function p($) {
      for (const _ in u)
        new RegExp($).test(_) && (0, oy.checkStrictMode)(s, `property ${_} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function g($) {
      t.forIn("key", n, (_) => {
        t.if((0, ua._)`${(0, sy.usePattern)(e, $)}.test(${_})`, () => {
          const m = c.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: _,
            dataPropType: ay.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, ua._)`${f}[${_}]`, !0) : !m && !s.allErrors && t.if((0, ua.not)(l), () => t.break());
        });
      });
    }
  }
};
Jf.default = j2;
var Xf = {};
Object.defineProperty(Xf, "__esModule", { value: !0 });
const L2 = K, U2 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, L2.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Xf.default = U2;
var Qf = {};
Object.defineProperty(Qf, "__esModule", { value: !0 });
const M2 = me, x2 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: M2.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Qf.default = x2;
var Zf = {};
Object.defineProperty(Zf, "__esModule", { value: !0 });
const Ta = oe, q2 = K, B2 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ta._)`{passingSchemas: ${e.passing}}`
}, V2 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: B2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, o = t.let("valid", !1), a = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: a }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let h;
        (0, q2.alwaysValidSchema)(i, l) ? t.var(c, !0) : h = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, Ta._)`${c} && ${o}`).assign(o, !1).assign(a, (0, Ta._)`[${a}, ${f}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(a, f), h && e.mergeEvaluated(h, Ta.Name);
        });
      });
    }
  }
};
Zf.default = V2;
var ed = {};
Object.defineProperty(ed, "__esModule", { value: !0 });
const H2 = K, G2 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, o) => {
      if ((0, H2.alwaysValidSchema)(n, s))
        return;
      const a = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(a);
    });
  }
};
ed.default = G2;
var td = {};
Object.defineProperty(td, "__esModule", { value: !0 });
const Ja = oe, j_ = K, z2 = {
  message: ({ params: e }) => (0, Ja.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ja._)`{failingKeyword: ${e.ifClause}}`
}, K2 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: z2,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, j_.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = cy(n, "then"), s = cy(n, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", !0), a = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(a, u("then", l), u("else", l));
    } else i ? t.if(a, u("then")) : t.if((0, Ja.not)(a), u("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, a);
      e.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const h = e.subschema({ keyword: l }, a);
        t.assign(o, a), e.mergeValidEvaluated(h, o), f ? t.assign(f, (0, Ja._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function cy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, j_.alwaysValidSchema)(e, r);
}
td.default = K2;
var rd = {};
Object.defineProperty(rd, "__esModule", { value: !0 });
const W2 = K, Y2 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, W2.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
rd.default = Y2;
Object.defineProperty(Hf, "__esModule", { value: !0 });
const J2 = es, X2 = Gf, Q2 = ts, Z2 = zf, eL = Kf, tL = Fc, rL = Wf, nL = jc, iL = Yf, sL = Jf, oL = Xf, aL = Qf, cL = Zf, lL = ed, uL = td, fL = rd;
function dL(e = !1) {
  const t = [
    // any
    oL.default,
    aL.default,
    cL.default,
    lL.default,
    uL.default,
    fL.default,
    // object
    rL.default,
    nL.default,
    tL.default,
    iL.default,
    sL.default
  ];
  return e ? t.push(X2.default, Z2.default) : t.push(J2.default, Q2.default), t.push(eL.default), t;
}
Hf.default = dL;
var nd = {}, rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.dynamicAnchor = void 0;
const Ll = oe, hL = xt, ly = vt, pL = Mr, mL = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => L_(e, e.schema)
};
function L_(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Ll._)`${hL.default.dynamicAnchors}${(0, Ll.getProperty)(t)}`, s = n.errSchemaPath === "#" ? n.validateName : yL(e);
  r.if((0, Ll._)`!${i}`, () => r.assign(i, s));
}
rs.dynamicAnchor = L_;
function yL(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: s, localRefs: o, meta: a } = t.root, { schemaId: c } = n.opts, u = new ly.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: s, localRefs: o, meta: a });
  return ly.compileSchema.call(n, u), (0, pL.getValidate)(e, u);
}
rs.default = mL;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.dynamicRef = void 0;
const uy = oe, gL = xt, fy = Mr, vL = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => U_(e, e.schema)
};
function U_(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const s = t.slice(1);
  if (i.allErrors)
    o();
  else {
    const c = r.let("valid", !1);
    o(c), e.ok(c);
  }
  function o(c) {
    if (i.schemaEnv.root.dynamicAnchors[s]) {
      const u = r.let("_v", (0, uy._)`${gL.default.dynamicAnchors}${(0, uy.getProperty)(s)}`);
      r.if(u, a(u, c), a(i.validateName, c));
    } else
      a(i.validateName, c)();
  }
  function a(c, u) {
    return u ? () => r.block(() => {
      (0, fy.callRef)(e, c), r.let(u, !0);
    }) : () => (0, fy.callRef)(e, c);
  }
}
ns.dynamicRef = U_;
ns.default = vL;
var id = {};
Object.defineProperty(id, "__esModule", { value: !0 });
const _L = rs, $L = K, wL = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, _L.dynamicAnchor)(e, "") : (0, $L.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
id.default = wL;
var sd = {};
Object.defineProperty(sd, "__esModule", { value: !0 });
const EL = ns, SL = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, EL.dynamicRef)(e, e.schema)
};
sd.default = SL;
Object.defineProperty(nd, "__esModule", { value: !0 });
const bL = rs, PL = ns, TL = id, AL = sd, NL = [bL.default, PL.default, TL.default, AL.default];
nd.default = NL;
var od = {}, ad = {};
Object.defineProperty(ad, "__esModule", { value: !0 });
const dy = Fc, OL = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: dy.error,
  code: (e) => (0, dy.validatePropertyDeps)(e)
};
ad.default = OL;
var cd = {};
Object.defineProperty(cd, "__esModule", { value: !0 });
const RL = Fc, IL = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, RL.validateSchemaDeps)(e)
};
cd.default = IL;
var ld = {};
Object.defineProperty(ld, "__esModule", { value: !0 });
const CL = K, kL = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, CL.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
ld.default = kL;
Object.defineProperty(od, "__esModule", { value: !0 });
const DL = ad, FL = cd, jL = ld, LL = [DL.default, FL.default, jL.default];
od.default = LL;
var ud = {}, fd = {};
Object.defineProperty(fd, "__esModule", { value: !0 });
const Zr = oe, hy = K, UL = xt, ML = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Zr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, xL = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: ML,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: s } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: a } = s;
    a instanceof Zr.Name ? t.if((0, Zr._)`${a} !== true`, () => t.forIn("key", n, (f) => t.if(u(a, f), () => c(f)))) : a !== !0 && t.forIn("key", n, (f) => a === void 0 ? c(f) : t.if(l(a, f), () => c(f))), s.props = !0, e.ok((0, Zr._)`${i} === ${UL.default.errors}`);
    function c(f) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: f }), e.error(), o || t.break();
        return;
      }
      if (!(0, hy.alwaysValidSchema)(s, r)) {
        const h = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: f,
          dataPropType: hy.Type.Str
        }, h), o || t.if((0, Zr.not)(h), () => t.break());
      }
    }
    function u(f, h) {
      return (0, Zr._)`!${f} || !${f}[${h}]`;
    }
    function l(f, h) {
      const p = [];
      for (const g in f)
        f[g] === !0 && p.push((0, Zr._)`${h} !== ${g}`);
      return (0, Zr.and)(...p);
    }
  }
};
fd.default = xL;
var dd = {};
Object.defineProperty(dd, "__esModule", { value: !0 });
const Gn = oe, py = K, qL = {
  message: ({ params: { len: e } }) => (0, Gn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Gn._)`{limit: ${e}}`
}, BL = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: qL,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, s = i.items || 0;
    if (s === !0)
      return;
    const o = t.const("len", (0, Gn._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: s }), e.fail((0, Gn._)`${o} > ${s}`);
    else if (typeof r == "object" && !(0, py.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, Gn._)`${o} <= ${s}`);
      t.if((0, Gn.not)(c), () => a(c, s)), e.ok(c);
    }
    i.items = !0;
    function a(c, u) {
      t.forRange("i", u, o, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: py.Type.Num }, c), i.allErrors || t.if((0, Gn.not)(c), () => t.break());
      });
    }
  }
};
dd.default = BL;
Object.defineProperty(ud, "__esModule", { value: !0 });
const VL = fd, HL = dd, GL = [VL.default, HL.default];
ud.default = GL;
var hd = {}, pd = {};
Object.defineProperty(pd, "__esModule", { value: !0 });
const Ue = oe, zL = {
  message: ({ schemaCode: e }) => (0, Ue.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ue._)`{format: ${e}}`
}, KL = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: zL,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: o, it: a } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = a;
    if (!c.validateFormats)
      return;
    i ? h() : p();
    function h() {
      const g = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), $ = r.const("fDef", (0, Ue._)`${g}[${o}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, Ue._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(_, (0, Ue._)`${$}.type || "string"`).assign(m, (0, Ue._)`${$}.validate`), () => r.assign(_, (0, Ue._)`"string"`).assign(m, $)), e.fail$data((0, Ue.or)(E(), T()));
      function E() {
        return c.strictSchema === !1 ? Ue.nil : (0, Ue._)`${o} && !${m}`;
      }
      function T() {
        const I = l.$async ? (0, Ue._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Ue._)`${m}(${n})`, F = (0, Ue._)`(typeof ${m} == "function" ? ${I} : ${m}.test(${n}))`;
        return (0, Ue._)`${m} && ${m} !== true && ${_} === ${t} && !${F}`;
      }
    }
    function p() {
      const g = f.formats[s];
      if (!g) {
        E();
        return;
      }
      if (g === !0)
        return;
      const [$, _, m] = T(g);
      $ === t && e.pass(I());
      function E() {
        if (c.strictSchema === !1) {
          f.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function T(F) {
        const H = F instanceof RegExp ? (0, Ue.regexpCode)(F) : c.code.formats ? (0, Ue._)`${c.code.formats}${(0, Ue.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: F, code: H });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Ue._)`${z}.validate`] : ["string", F, z];
      }
      function I() {
        if (typeof g == "object" && !(g instanceof RegExp) && g.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Ue._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, Ue._)`${m}(${n})` : (0, Ue._)`${m}.test(${n})`;
      }
    }
  }
};
pd.default = KL;
Object.defineProperty(hd, "__esModule", { value: !0 });
const WL = pd, YL = [WL.default];
hd.default = YL;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.contentVocabulary = Hi.metadataVocabulary = void 0;
Hi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Hi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Of, "__esModule", { value: !0 });
const JL = Rf, XL = Cf, QL = Hf, ZL = nd, eU = od, tU = ud, rU = hd, my = Hi, nU = [
  ZL.default,
  JL.default,
  XL.default,
  (0, QL.default)(!0),
  rU.default,
  my.metadataVocabulary,
  my.contentVocabulary,
  eU.default,
  tU.default
];
Of.default = nU;
var md = {}, Lc = {};
Object.defineProperty(Lc, "__esModule", { value: !0 });
Lc.DiscrError = void 0;
var yy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(yy || (Lc.DiscrError = yy = {}));
Object.defineProperty(md, "__esModule", { value: !0 });
const wi = oe, vu = Lc, gy = vt, iU = Zi, sU = K, oU = {
  message: ({ params: { discrError: e, tagName: t } }) => e === vu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, wi._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, aU = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: oU,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const a = n.propertyName;
    if (typeof a != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), u = t.const("tag", (0, wi._)`${r}${(0, wi.getProperty)(a)}`);
    t.if((0, wi._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: vu.DiscrError.Tag, tag: u, tagName: a })), e.ok(c);
    function l() {
      const p = h();
      t.if(!1);
      for (const g in p)
        t.elseIf((0, wi._)`${u} === ${g}`), t.assign(c, f(p[g]));
      t.else(), e.error(!1, { discrError: vu.DiscrError.Mapping, tag: u, tagName: a }), t.endIf();
    }
    function f(p) {
      const g = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: p }, g);
      return e.mergeEvaluated($, wi.Name), g;
    }
    function h() {
      var p;
      const g = {}, $ = m(i);
      let _ = !0;
      for (let I = 0; I < o.length; I++) {
        let F = o[I];
        if (F != null && F.$ref && !(0, sU.schemaHasRulesButRef)(F, s.self.RULES)) {
          const z = F.$ref;
          if (F = gy.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), F instanceof gy.SchemaEnv && (F = F.schema), F === void 0)
            throw new iU.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (p = F == null ? void 0 : F.properties) === null || p === void 0 ? void 0 : p[a];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);
        _ = _ && ($ || m(F)), E(H, I);
      }
      if (!_)
        throw new Error(`discriminator: "${a}" must be required`);
      return g;
      function m({ required: I }) {
        return Array.isArray(I) && I.includes(a);
      }
      function E(I, F) {
        if (I.const)
          T(I.const, F);
        else if (I.enum)
          for (const H of I.enum)
            T(H, F);
        else
          throw new Error(`discriminator: "properties/${a}" must have "const" or "enum"`);
      }
      function T(I, F) {
        if (typeof I != "string" || I in g)
          throw new Error(`discriminator: "${a}" values must be unique strings`);
        g[I] = F;
      }
    }
  }
};
md.default = aU;
var yd = {};
const cU = "https://json-schema.org/draft/2020-12/schema", lU = "https://json-schema.org/draft/2020-12/schema", uU = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, fU = "meta", dU = "Core and Validation specifications meta-schema", hU = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], pU = [
  "object",
  "boolean"
], mU = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", yU = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, gU = {
  $schema: cU,
  $id: lU,
  $vocabulary: uU,
  $dynamicAnchor: fU,
  title: dU,
  allOf: hU,
  type: pU,
  $comment: mU,
  properties: yU
}, vU = "https://json-schema.org/draft/2020-12/schema", _U = "https://json-schema.org/draft/2020-12/meta/applicator", $U = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, wU = "meta", EU = "Applicator vocabulary meta-schema", SU = [
  "object",
  "boolean"
], bU = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, PU = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, TU = {
  $schema: vU,
  $id: _U,
  $vocabulary: $U,
  $dynamicAnchor: wU,
  title: EU,
  type: SU,
  properties: bU,
  $defs: PU
}, AU = "https://json-schema.org/draft/2020-12/schema", NU = "https://json-schema.org/draft/2020-12/meta/unevaluated", OU = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, RU = "meta", IU = "Unevaluated applicator vocabulary meta-schema", CU = [
  "object",
  "boolean"
], kU = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, DU = {
  $schema: AU,
  $id: NU,
  $vocabulary: OU,
  $dynamicAnchor: RU,
  title: IU,
  type: CU,
  properties: kU
}, FU = "https://json-schema.org/draft/2020-12/schema", jU = "https://json-schema.org/draft/2020-12/meta/content", LU = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, UU = "meta", MU = "Content vocabulary meta-schema", xU = [
  "object",
  "boolean"
], qU = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, BU = {
  $schema: FU,
  $id: jU,
  $vocabulary: LU,
  $dynamicAnchor: UU,
  title: MU,
  type: xU,
  properties: qU
}, VU = "https://json-schema.org/draft/2020-12/schema", HU = "https://json-schema.org/draft/2020-12/meta/core", GU = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, zU = "meta", KU = "Core vocabulary meta-schema", WU = [
  "object",
  "boolean"
], YU = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, JU = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, XU = {
  $schema: VU,
  $id: HU,
  $vocabulary: GU,
  $dynamicAnchor: zU,
  title: KU,
  type: WU,
  properties: YU,
  $defs: JU
}, QU = "https://json-schema.org/draft/2020-12/schema", ZU = "https://json-schema.org/draft/2020-12/meta/format-annotation", eM = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, tM = "meta", rM = "Format vocabulary meta-schema for annotation results", nM = [
  "object",
  "boolean"
], iM = {
  format: {
    type: "string"
  }
}, sM = {
  $schema: QU,
  $id: ZU,
  $vocabulary: eM,
  $dynamicAnchor: tM,
  title: rM,
  type: nM,
  properties: iM
}, oM = "https://json-schema.org/draft/2020-12/schema", aM = "https://json-schema.org/draft/2020-12/meta/meta-data", cM = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, lM = "meta", uM = "Meta-data vocabulary meta-schema", fM = [
  "object",
  "boolean"
], dM = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, hM = {
  $schema: oM,
  $id: aM,
  $vocabulary: cM,
  $dynamicAnchor: lM,
  title: uM,
  type: fM,
  properties: dM
}, pM = "https://json-schema.org/draft/2020-12/schema", mM = "https://json-schema.org/draft/2020-12/meta/validation", yM = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, gM = "meta", vM = "Validation vocabulary meta-schema", _M = [
  "object",
  "boolean"
], $M = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, wM = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, EM = {
  $schema: pM,
  $id: mM,
  $vocabulary: yM,
  $dynamicAnchor: gM,
  title: vM,
  type: _M,
  properties: $M,
  $defs: wM
};
Object.defineProperty(yd, "__esModule", { value: !0 });
const SM = gU, bM = TU, PM = DU, TM = BU, AM = XU, NM = sM, OM = hM, RM = EM, IM = ["/properties"];
function CM(e) {
  return [
    SM,
    bM,
    PM,
    TM,
    AM,
    t(this, NM),
    OM,
    t(this, RM)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, IM) : n;
  }
}
yd.default = CM;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = xv, n = Of, i = md, s = yd, o = "https://json-schema.org/draft/2020-12/schema";
  class a extends r.default {
    constructor(p = {}) {
      super({
        ...p,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((p) => this.addVocabulary(p)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: p, meta: g } = this.opts;
      g && (s.default.call(this, p), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv2020 = a, e.exports = t = a, e.exports.Ajv2020 = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  var c = ir;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var u = oe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var l = No;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var f = Zi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(fu, fu.exports);
var kM = fu.exports, _u = { exports: {} }, M_ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(x, B) {
    return { validate: x, compare: B };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), u),
    "date-time": t(h(!0), p),
    "iso-time": t(c(), l),
    "iso-date-time": t(h(), g),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Q,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: T,
    // signed 32 bit integer
    int32: { type: "number", validate: H },
    // signed 64 bit integer
    int64: { type: "number", validate: z },
    // C-type float
    float: { type: "number", validate: he },
    // C-type double
    double: { type: "number", validate: he },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, p),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, g),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(x) {
    return x % 4 === 0 && (x % 100 !== 0 || x % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(x) {
    const B = n.exec(x);
    if (!B)
      return !1;
    const Z = +B[1], j = +B[2], L = +B[3];
    return j >= 1 && j <= 12 && L >= 1 && L <= (j === 2 && r(Z) ? 29 : i[j]);
  }
  function o(x, B) {
    if (x && B)
      return x > B ? 1 : x < B ? -1 : 0;
  }
  const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(x) {
    return function(Z) {
      const j = a.exec(Z);
      if (!j)
        return !1;
      const L = +j[1], V = +j[2], U = +j[3], G = j[4], q = j[5] === "-" ? -1 : 1, C = +(j[6] || 0), S = +(j[7] || 0);
      if (C > 23 || S > 59 || x && !G)
        return !1;
      if (L <= 23 && V <= 59 && U < 60)
        return !0;
      const N = V - S * q, b = L - C * q - (N < 0 ? 1 : 0);
      return (b === 23 || b === -1) && (N === 59 || N === -1) && U < 61;
    };
  }
  function u(x, B) {
    if (!(x && B))
      return;
    const Z = (/* @__PURE__ */ new Date("2020-01-01T" + x)).valueOf(), j = (/* @__PURE__ */ new Date("2020-01-01T" + B)).valueOf();
    if (Z && j)
      return Z - j;
  }
  function l(x, B) {
    if (!(x && B))
      return;
    const Z = a.exec(x), j = a.exec(B);
    if (Z && j)
      return x = Z[1] + Z[2] + Z[3], B = j[1] + j[2] + j[3], x > B ? 1 : x < B ? -1 : 0;
  }
  const f = /t|\s/i;
  function h(x) {
    const B = c(x);
    return function(j) {
      const L = j.split(f);
      return L.length === 2 && s(L[0]) && B(L[1]);
    };
  }
  function p(x, B) {
    if (!(x && B))
      return;
    const Z = new Date(x).valueOf(), j = new Date(B).valueOf();
    if (Z && j)
      return Z - j;
  }
  function g(x, B) {
    if (!(x && B))
      return;
    const [Z, j] = x.split(f), [L, V] = B.split(f), U = o(Z, L);
    if (U !== void 0)
      return U || u(j, V);
  }
  const $ = /\/|:/, _ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(x) {
    return $.test(x) && _.test(x);
  }
  const E = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function T(x) {
    return E.lastIndex = 0, E.test(x);
  }
  const I = -2147483648, F = 2 ** 31 - 1;
  function H(x) {
    return Number.isInteger(x) && x <= F && x >= I;
  }
  function z(x) {
    return Number.isInteger(x);
  }
  function he() {
    return !0;
  }
  const R = /[^\\]\\Z/;
  function Q(x) {
    if (R.test(x))
      return !1;
    try {
      return new RegExp(x), !0;
    } catch {
      return !1;
    }
  }
})(M_);
var x_ = {}, $u = { exports: {} }, q_ = {}, sr = {}, Gi = {}, Ro = {}, fe = {}, lo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((T, I) => `${T}${I}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((T, I) => (I instanceof r && (T[I.str] = (T[I.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...E) {
    const T = [m[0]];
    let I = 0;
    for (; I < E.length; )
      a(T, E[I]), T.push(m[++I]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function o(m, ...E) {
    const T = [p(m[0])];
    let I = 0;
    for (; I < E.length; )
      T.push(s), a(T, E[I]), T.push(s, p(m[++I]));
    return c(T), new n(T);
  }
  e.str = o;
  function a(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(f(E));
  }
  e.addCodeArg = a;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === s) {
        const T = u(m[E - 1], m[E + 1]);
        if (T !== void 0) {
          m.splice(E - 1, 3, T);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function u(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  e.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function h(m) {
    return new n(p(m));
  }
  e.stringify = h;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function g(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = g;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(lo);
var wu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = lo;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class a extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const h = this.toName(u), { prefix: p } = h, g = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let $ = this._values[p];
      if ($) {
        const E = $.get(g);
        if (E)
          return E;
      } else
        $ = this._values[p] = /* @__PURE__ */ new Map();
      $.set(g, h);
      const _ = this._scope[p] || (this._scope[p] = []), m = _.length;
      return _[m] = l.ref, h.setValue(l, { property: p, itemIndex: m }), h;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (h) => {
        if (h.value === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return h.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, h) {
      let p = t.nil;
      for (const g in u) {
        const $ = u[g];
        if (!$)
          continue;
        const _ = f[g] = f[g] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = l(m);
          if (E) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${T} ${m} = ${E};${this.opts._n}`;
          } else if (E = h == null ? void 0 : h(m))
            p = (0, t._)`${p}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = a;
})(wu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = lo, r = wu;
  var n = lo;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = wu;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, v) {
      return this;
    }
  }
  class o extends s {
    constructor(d, v, A) {
      super(), this.varKind = d, this.name = v, this.rhs = A;
    }
    render({ es5: d, _n: v }) {
      const A = d ? r.varKinds.var : this.varKind, w = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${A} ${this.name}${w};` + v;
    }
    optimizeNames(d, v) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, d, v)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class a extends s {
    constructor(d, v, A) {
      super(), this.lhs = d, this.rhs = v, this.sideEffects = A;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, v) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, d, v), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Z(d, this.rhs);
    }
  }
  class c extends a {
    constructor(d, v, A, w) {
      super(d, A, w), this.op = v;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class h extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, v) {
      return this.code = j(this.code, d, v), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((v, A) => v + A.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let v = d.length;
      for (; v--; ) {
        const A = d[v].optimizeNodes();
        Array.isArray(A) ? d.splice(v, 1, ...A) : A ? d[v] = A : d.splice(v, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, v) {
      const { nodes: A } = this;
      let w = A.length;
      for (; w--; ) {
        const y = A[w];
        y.optimizeNames(d, v) || (L(d, y.names), A.splice(w, 1));
      }
      return A.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, v) => B(d, v.names), {});
    }
  }
  class g extends p {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class $ extends p {
  }
  class _ extends g {
  }
  _.kind = "else";
  class m extends g {
    constructor(d, v) {
      super(v), this.condition = d;
    }
    render(d) {
      let v = `if(${this.condition})` + super.render(d);
      return this.else && (v += "else " + this.else.render(d)), v;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let v = this.else;
      if (v) {
        const A = v.optimizeNodes();
        v = this.else = Array.isArray(A) ? new _(A) : A;
      }
      if (v)
        return d === !1 ? v instanceof m ? v : v.nodes : this.nodes.length ? this : new m(V(d), v instanceof m ? [v] : v.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, v) {
      var A;
      if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(d, v), !!(super.optimizeNames(d, v) || this.else))
        return this.condition = j(this.condition, d, v), this;
    }
    get names() {
      const d = super.names;
      return Z(d, this.condition), this.else && B(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends g {
  }
  E.kind = "for";
  class T extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, v) {
      if (super.optimizeNames(d, v))
        return this.iteration = j(this.iteration, d, v), this;
    }
    get names() {
      return B(super.names, this.iteration.names);
    }
  }
  class I extends E {
    constructor(d, v, A, w) {
      super(), this.varKind = d, this.name = v, this.from = A, this.to = w;
    }
    render(d) {
      const v = d.es5 ? r.varKinds.var : this.varKind, { name: A, from: w, to: y } = this;
      return `for(${v} ${A}=${w}; ${A}<${y}; ${A}++)` + super.render(d);
    }
    get names() {
      const d = Z(super.names, this.from);
      return Z(d, this.to);
    }
  }
  class F extends E {
    constructor(d, v, A, w) {
      super(), this.loop = d, this.varKind = v, this.name = A, this.iterable = w;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, v) {
      if (super.optimizeNames(d, v))
        return this.iterable = j(this.iterable, d, v), this;
    }
    get names() {
      return B(super.names, this.iterable.names);
    }
  }
  class H extends g {
    constructor(d, v, A) {
      super(), this.name = d, this.args = v, this.async = A;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends p {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class he extends g {
    render(d) {
      let v = "try" + super.render(d);
      return this.catch && (v += this.catch.render(d)), this.finally && (v += this.finally.render(d)), v;
    }
    optimizeNodes() {
      var d, v;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (v = this.finally) === null || v === void 0 || v.optimizeNodes(), this;
    }
    optimizeNames(d, v) {
      var A, w;
      return super.optimizeNames(d, v), (A = this.catch) === null || A === void 0 || A.optimizeNames(d, v), (w = this.finally) === null || w === void 0 || w.optimizeNames(d, v), this;
    }
    get names() {
      const d = super.names;
      return this.catch && B(d, this.catch.names), this.finally && B(d, this.finally.names), d;
    }
  }
  class R extends g {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  R.kind = "catch";
  class Q extends g {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Q.kind = "finally";
  class x {
    constructor(d, v = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...v, _n: v.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, v) {
      const A = this._extScope.value(d, v);
      return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
    }
    getScopeValue(d, v) {
      return this._extScope.getValue(d, v);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, v, A, w) {
      const y = this._scope.toName(v);
      return A !== void 0 && w && (this._constants[y.str] = A), this._leafNode(new o(d, y, A)), y;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, v, A) {
      return this._def(r.varKinds.const, d, v, A);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, v, A) {
      return this._def(r.varKinds.let, d, v, A);
    }
    // `var` declaration with optional assignment
    var(d, v, A) {
      return this._def(r.varKinds.var, d, v, A);
    }
    // assignment code
    assign(d, v, A) {
      return this._leafNode(new a(d, v, A));
    }
    // `+=` code
    add(d, v) {
      return this._leafNode(new c(d, e.operators.ADD, v));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new h(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const v = ["{"];
      for (const [A, w] of d)
        v.length > 1 && v.push(","), v.push(A), (A !== w || this.opts.es5) && (v.push(":"), (0, t.addCodeArg)(v, w));
      return v.push("}"), new t._Code(v);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, v, A) {
      if (this._blockNode(new m(d)), v && A)
        this.code(v).else().code(A).endIf();
      else if (v)
        this.code(v).endIf();
      else if (A)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(d, v) {
      return this._blockNode(d), v && this.code(v).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, v) {
      return this._for(new T(d), v);
    }
    // `for` statement for a range of values
    forRange(d, v, A, w, y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(d);
      return this._for(new I(y, D, v, A), () => w(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, v, A, w = r.varKinds.const) {
      const y = this._scope.toName(d);
      if (this.opts.es5) {
        const D = v instanceof t.Name ? v : this.var("_arr", v);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (O) => {
          this.var(y, (0, t._)`${D}[${O}]`), A(y);
        });
      }
      return this._for(new F("of", w, y, v), () => A(y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, v, A, w = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${v})`, A);
      const y = this._scope.toName(d);
      return this._for(new F("in", w, y, v), () => A(y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const v = new z();
      if (this._blockNode(v), this.code(d), v.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, v, A) {
      if (!v && !A)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const w = new he();
      if (this._blockNode(w), this.code(d), v) {
        const y = this.name("e");
        this._currNode = w.catch = new R(y), v(y);
      }
      return A && (this._currNode = w.finally = new Q(), this.code(A)), this._endBlockNode(R, Q);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, v) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(v), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const v = this._blockStarts.pop();
      if (v === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const A = this._nodes.length - v;
      if (A < 0 || d !== void 0 && A !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${d} expected`);
      return this._nodes.length = v, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, v = t.nil, A, w) {
      return this._blockNode(new H(d, v, A)), w && this.code(w).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, v) {
      const A = this._currNode;
      if (A instanceof d || v && A instanceof v)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${v ? `${d.kind}/${v.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const v = this._currNode;
      if (!(v instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = v.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const v = this._nodes;
      v[v.length - 1] = d;
    }
  }
  e.CodeGen = x;
  function B(b, d) {
    for (const v in d)
      b[v] = (b[v] || 0) + (d[v] || 0);
    return b;
  }
  function Z(b, d) {
    return d instanceof t._CodeOrName ? B(b, d.names) : b;
  }
  function j(b, d, v) {
    if (b instanceof t.Name)
      return A(b);
    if (!w(b))
      return b;
    return new t._Code(b._items.reduce((y, D) => (D instanceof t.Name && (D = A(D)), D instanceof t._Code ? y.push(...D._items) : y.push(D), y), []));
    function A(y) {
      const D = v[y.str];
      return D === void 0 || d[y.str] !== 1 ? y : (delete d[y.str], D);
    }
    function w(y) {
      return y instanceof t._Code && y._items.some((D) => D instanceof t.Name && d[D.str] === 1 && v[D.str] !== void 0);
    }
  }
  function L(b, d) {
    for (const v in d)
      b[v] = (b[v] || 0) - (d[v] || 0);
  }
  function V(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${N(b)}`;
  }
  e.not = V;
  const U = S(e.operators.AND);
  function G(...b) {
    return b.reduce(U);
  }
  e.and = G;
  const q = S(e.operators.OR);
  function C(...b) {
    return b.reduce(q);
  }
  e.or = C;
  function S(b) {
    return (d, v) => d === t.nil ? v : v === t.nil ? d : (0, t._)`${N(d)} ${b} ${N(v)}`;
  }
  function N(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(fe);
var Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.checkStrictMode = Y.getErrorPath = Y.Type = Y.useFunc = Y.setEvaluated = Y.evaluatedPropsToName = Y.mergeEvaluated = Y.eachItem = Y.unescapeJsonPointer = Y.escapeJsonPointer = Y.escapeFragment = Y.unescapeFragment = Y.schemaRefOrVal = Y.schemaHasRulesButRef = Y.schemaHasRules = Y.checkUnknownRules = Y.alwaysValidSchema = Y.toHash = void 0;
const Pe = fe, DM = lo;
function FM(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Y.toHash = FM;
function jM(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (B_(e, t), !V_(t, e.self.RULES.all));
}
Y.alwaysValidSchema = jM;
function B_(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || z_(e, `unknown keyword: "${s}"`);
}
Y.checkUnknownRules = B_;
function V_(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Y.schemaHasRules = V_;
function LM(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Y.schemaHasRulesButRef = LM;
function UM({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, Pe._)`${r}`;
  }
  return (0, Pe._)`${e}${t}${(0, Pe.getProperty)(n)}`;
}
Y.schemaRefOrVal = UM;
function MM(e) {
  return H_(decodeURIComponent(e));
}
Y.unescapeFragment = MM;
function xM(e) {
  return encodeURIComponent(gd(e));
}
Y.escapeFragment = xM;
function gd(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Y.escapeJsonPointer = gd;
function H_(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Y.unescapeJsonPointer = H_;
function qM(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Y.eachItem = qM;
function vy({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, o, a) => {
    const c = o === void 0 ? s : o instanceof Pe.Name ? (s instanceof Pe.Name ? e(i, s, o) : t(i, s, o), o) : s instanceof Pe.Name ? (t(i, o, s), s) : r(s, o);
    return a === Pe.Name && !(c instanceof Pe.Name) ? n(i, c) : c;
  };
}
Y.mergeEvaluated = {
  props: vy({
    mergeNames: (e, t, r) => e.if((0, Pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, Pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, Pe._)`${r} || {}`).code((0, Pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, Pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, Pe._)`${r} || {}`), vd(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: G_
  }),
  items: vy({
    mergeNames: (e, t, r) => e.if((0, Pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, Pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, Pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, Pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function G_(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, Pe._)`{}`);
  return t !== void 0 && vd(e, r, t), r;
}
Y.evaluatedPropsToName = G_;
function vd(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, Pe._)`${t}${(0, Pe.getProperty)(n)}`, !0));
}
Y.setEvaluated = vd;
const _y = {};
function BM(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: _y[t.code] || (_y[t.code] = new DM._Code(t.code))
  });
}
Y.useFunc = BM;
var Eu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Eu || (Y.Type = Eu = {}));
function VM(e, t, r) {
  if (e instanceof Pe.Name) {
    const n = t === Eu.Num;
    return r ? n ? (0, Pe._)`"[" + ${e} + "]"` : (0, Pe._)`"['" + ${e} + "']"` : n ? (0, Pe._)`"/" + ${e}` : (0, Pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, Pe.getProperty)(e).toString() : "/" + gd(e);
}
Y.getErrorPath = VM;
function z_(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Y.checkStrictMode = z_;
var $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
const ct = fe, HM = {
  // validation function arguments
  data: new ct.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ct.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ct.Name("instancePath"),
  parentData: new ct.Name("parentData"),
  parentDataProperty: new ct.Name("parentDataProperty"),
  rootData: new ct.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ct.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ct.Name("vErrors"),
  // null or array of validation errors
  errors: new ct.Name("errors"),
  // counter of validation errors
  this: new ct.Name("this"),
  // "globals"
  self: new ct.Name("self"),
  scope: new ct.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ct.Name("json"),
  jsonPos: new ct.Name("jsonPos"),
  jsonLen: new ct.Name("jsonLen"),
  jsonPart: new ct.Name("jsonPart")
};
$r.default = HM;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = fe, r = Y, n = $r;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, m = e.keywordError, E, T) {
    const { it: I } = _, { gen: F, compositeRule: H, allErrors: z } = I, he = f(_, m, E);
    T ?? (H || z) ? c(F, he) : u(I, (0, t._)`[${he}]`);
  }
  e.reportError = i;
  function s(_, m = e.keywordError, E) {
    const { it: T } = _, { gen: I, compositeRule: F, allErrors: H } = T, z = f(_, m, E);
    c(I, z), F || H || u(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function o(_, m) {
    _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function a({ gen: _, keyword: m, schemaValue: E, data: T, errsCount: I, it: F }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const H = _.name("err");
    _.forRange("i", I, n.default.errors, (z) => {
      _.const(H, (0, t._)`${n.default.vErrors}[${z}]`), _.if((0, t._)`${H}.instancePath === undefined`, () => _.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), _.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (_.assign((0, t._)`${H}.schema`, E), _.assign((0, t._)`${H}.data`, T));
    });
  }
  e.extendErrors = a;
  function c(_, m) {
    const E = _.const("err", m);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function u(_, m) {
    const { gen: E, validateName: T, schemaEnv: I } = _;
    I.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${T}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(_, m, E) {
    const { createErrors: T } = _.it;
    return T === !1 ? (0, t._)`{}` : h(_, m, E);
  }
  function h(_, m, E = {}) {
    const { gen: T, it: I } = _, F = [
      p(I, E),
      g(_, E)
    ];
    return $(_, m, F), T.object(...F);
  }
  function p({ errorPath: _ }, { instancePath: m }) {
    const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function g({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: T }) {
    let I = T ? m : (0, t.str)`${m}/${_}`;
    return E && (I = (0, t.str)`${I}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, I];
  }
  function $(_, { params: m, message: E }, T) {
    const { keyword: I, data: F, schemaValue: H, it: z } = _, { opts: he, propertyName: R, topSchemaRef: Q, schemaPath: x } = z;
    T.push([l.keyword, I], [l.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), he.messages && T.push([l.message, typeof E == "function" ? E(_) : E]), he.verbose && T.push([l.schema, H], [l.parentSchema, (0, t._)`${Q}${x}`], [n.default.data, F]), R && T.push([l.propertyName, R]);
  }
})(Ro);
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.boolOrEmptySchema = Gi.topBoolOrEmptySchema = void 0;
const GM = Ro, zM = fe, KM = $r, WM = {
  message: "boolean schema is false"
};
function YM(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? K_(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(KM.default.data) : (t.assign((0, zM._)`${n}.errors`, null), t.return(!0));
}
Gi.topBoolOrEmptySchema = YM;
function JM(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), K_(e)) : r.var(t, !0);
}
Gi.boolOrEmptySchema = JM;
function K_(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, GM.reportError)(i, WM, void 0, t);
}
var Ve = {}, ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.getRules = ti.isJSONType = void 0;
const XM = ["string", "number", "integer", "boolean", "null", "object", "array"], QM = new Set(XM);
function ZM(e) {
  return typeof e == "string" && QM.has(e);
}
ti.isJSONType = ZM;
function ex() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
ti.getRules = ex;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.shouldUseRule = Dr.shouldUseGroup = Dr.schemaHasRulesForType = void 0;
function tx({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && W_(e, n);
}
Dr.schemaHasRulesForType = tx;
function W_(e, t) {
  return t.rules.some((r) => Y_(e, r));
}
Dr.shouldUseGroup = W_;
function Y_(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Dr.shouldUseRule = Y_;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.reportTypeError = Ve.checkDataTypes = Ve.checkDataType = Ve.coerceAndCheckDataType = Ve.getJSONTypes = Ve.getSchemaTypes = Ve.DataType = void 0;
const rx = ti, nx = Dr, ix = Ro, le = fe, J_ = Y;
var ji;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ji || (Ve.DataType = ji = {}));
function sx(e) {
  const t = X_(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Ve.getSchemaTypes = sx;
function X_(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(rx.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ve.getJSONTypes = X_;
function ox(e, t) {
  const { gen: r, data: n, opts: i } = e, s = ax(t, i.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, nx.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const a = _d(t, n, i.strictNumbers, ji.Wrong);
    r.if(a, () => {
      s.length ? cx(e, t, s) : $d(e);
    });
  }
  return o;
}
Ve.coerceAndCheckDataType = ox;
const Q_ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ax(e, t) {
  return t ? e.filter((r) => Q_.has(r) || t === "array" && r === "array") : [];
}
function cx(e, t, r) {
  const { gen: n, data: i, opts: s } = e, o = n.let("dataType", (0, le._)`typeof ${i}`), a = n.let("coerced", (0, le._)`undefined`);
  s.coerceTypes === "array" && n.if((0, le._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, le._)`${i}[0]`).assign(o, (0, le._)`typeof ${i}`).if(_d(t, i, s.strictNumbers), () => n.assign(a, i))), n.if((0, le._)`${a} !== undefined`);
  for (const u of r)
    (Q_.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), $d(e), n.endIf(), n.if((0, le._)`${a} !== undefined`, () => {
    n.assign(i, a), lx(e, a);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, le._)`${o} == "number" || ${o} == "boolean"`).assign(a, (0, le._)`"" + ${i}`).elseIf((0, le._)`${i} === null`).assign(a, (0, le._)`""`);
        return;
      case "number":
        n.elseIf((0, le._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(a, (0, le._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, le._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(a, (0, le._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, le._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(a, !1).elseIf((0, le._)`${i} === "true" || ${i} === 1`).assign(a, !0);
        return;
      case "null":
        n.elseIf((0, le._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(a, null);
        return;
      case "array":
        n.elseIf((0, le._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(a, (0, le._)`[${i}]`);
    }
  }
}
function lx({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, le._)`${t} !== undefined`, () => e.assign((0, le._)`${t}[${r}]`, n));
}
function Su(e, t, r, n = ji.Correct) {
  const i = n === ji.Correct ? le.operators.EQ : le.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, le._)`${t} ${i} null`;
    case "array":
      s = (0, le._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, le._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, le._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, le._)`typeof ${t} ${i} ${e}`;
  }
  return n === ji.Correct ? s : (0, le.not)(s);
  function o(a = le.nil) {
    return (0, le.and)((0, le._)`typeof ${t} == "number"`, a, r ? (0, le._)`isFinite(${t})` : le.nil);
  }
}
Ve.checkDataType = Su;
function _d(e, t, r, n) {
  if (e.length === 1)
    return Su(e[0], t, r, n);
  let i;
  const s = (0, J_.toHash)(e);
  if (s.array && s.object) {
    const o = (0, le._)`typeof ${t} != "object"`;
    i = s.null ? o : (0, le._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    i = le.nil;
  s.number && delete s.integer;
  for (const o in s)
    i = (0, le.and)(i, Su(o, t, r, n));
  return i;
}
Ve.checkDataTypes = _d;
const ux = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, le._)`{type: ${e}}` : (0, le._)`{type: ${t}}`
};
function $d(e) {
  const t = fx(e);
  (0, ix.reportError)(t, ux);
}
Ve.reportTypeError = $d;
function fx(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, J_.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Uc = {};
Object.defineProperty(Uc, "__esModule", { value: !0 });
Uc.assignDefaults = void 0;
const gi = fe, dx = Y;
function hx(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      $y(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => $y(e, s, i.default));
}
Uc.assignDefaults = hx;
function $y(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: o } = e;
  if (r === void 0)
    return;
  const a = (0, gi._)`${s}${(0, gi.getProperty)(t)}`;
  if (i) {
    (0, dx.checkStrictMode)(e, `default is ignored for: ${a}`);
    return;
  }
  let c = (0, gi._)`${a} === undefined`;
  o.useDefaults === "empty" && (c = (0, gi._)`${c} || ${a} === null || ${a} === ""`), n.if(c, (0, gi._)`${a} = ${(0, gi.stringify)(r)}`);
}
var yr = {}, ye = {};
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.validateUnion = ye.validateArray = ye.usePattern = ye.callValidateCode = ye.schemaProperties = ye.allSchemaProperties = ye.noPropertyInData = ye.propertyInData = ye.isOwnProperty = ye.hasPropFunc = ye.reportMissingProp = ye.checkMissingProp = ye.checkReportMissingProp = void 0;
const Re = fe, wd = Y, Xr = $r, px = Y;
function mx(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Sd(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Re._)`${t}` }, !0), e.error();
  });
}
ye.checkReportMissingProp = mx;
function yx({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Re.or)(...n.map((s) => (0, Re.and)(Sd(e, t, s, r.ownProperties), (0, Re._)`${i} = ${s}`)));
}
ye.checkMissingProp = yx;
function gx(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ye.reportMissingProp = gx;
function Z_(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Re._)`Object.prototype.hasOwnProperty`
  });
}
ye.hasPropFunc = Z_;
function Ed(e, t, r) {
  return (0, Re._)`${Z_(e)}.call(${t}, ${r})`;
}
ye.isOwnProperty = Ed;
function vx(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} !== undefined`;
  return n ? (0, Re._)`${i} && ${Ed(e, t, r)}` : i;
}
ye.propertyInData = vx;
function Sd(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} === undefined`;
  return n ? (0, Re.or)(i, (0, Re.not)(Ed(e, t, r))) : i;
}
ye.noPropertyInData = Sd;
function e$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ye.allSchemaProperties = e$;
function _x(e, t) {
  return e$(t).filter((r) => !(0, wd.alwaysValidSchema)(e, t[r]));
}
ye.schemaProperties = _x;
function $x({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: o }, a, c, u) {
  const l = u ? (0, Re._)`${e}, ${t}, ${n}${i}` : t, f = [
    [Xr.default.instancePath, (0, Re.strConcat)(Xr.default.instancePath, s)],
    [Xr.default.parentData, o.parentData],
    [Xr.default.parentDataProperty, o.parentDataProperty],
    [Xr.default.rootData, Xr.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Xr.default.dynamicAnchors, Xr.default.dynamicAnchors]);
  const h = (0, Re._)`${l}, ${r.object(...f)}`;
  return c !== Re.nil ? (0, Re._)`${a}.call(${c}, ${h})` : (0, Re._)`${a}(${h})`;
}
ye.callValidateCode = $x;
const wx = (0, Re._)`new RegExp`;
function Ex({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Re._)`${i.code === "new RegExp" ? wx : (0, px.useFunc)(e, i)}(${r}, ${n})`
  });
}
ye.usePattern = Ex;
function Sx(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const a = t.let("valid", !0);
    return o(() => t.assign(a, !1)), a;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(a) {
    const c = t.const("len", (0, Re._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: wd.Type.Num
      }, s), t.if((0, Re.not)(s), a);
    });
  }
}
ye.validateArray = Sx;
function bx(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, wd.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), a = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, a);
    t.assign(o, (0, Re._)`${o} || ${a}`), e.mergeValidEvaluated(l, a) || t.if((0, Re.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ye.validateUnion = bx;
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.validateKeywordUsage = yr.validSchemaType = yr.funcKeywordCode = yr.macroKeywordCode = void 0;
const gt = fe, zn = $r, Px = ye, Tx = Ro;
function Ax(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: o } = e, a = t.macro.call(o.self, i, s, o), c = t$(r, n, a);
  o.opts.validateSchema !== !1 && o.self.validateSchema(a, !0);
  const u = r.name("valid");
  e.subschema({
    schema: a,
    schemaPath: gt.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
yr.macroKeywordCode = Ax;
function Nx(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: o, $data: a, it: c } = e;
  Rx(c, t);
  const u = !a && t.compile ? t.compile.call(c.self, s, o, c) : t.validate, l = t$(n, i, u), f = n.let("valid");
  e.block$data(f, h), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function h() {
    if (t.errors === !1)
      $(), t.modifying && wy(e), _(() => e.error());
    else {
      const m = t.async ? p() : g();
      t.modifying && wy(e), _(() => Ox(e, m));
    }
  }
  function p() {
    const m = n.let("ruleErrs", null);
    return n.try(() => $((0, gt._)`await `), (E) => n.assign(f, !1).if((0, gt._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, gt._)`${E}.errors`), () => n.throw(E))), m;
  }
  function g() {
    const m = (0, gt._)`${l}.errors`;
    return n.assign(m, null), $(gt.nil), m;
  }
  function $(m = t.async ? (0, gt._)`await ` : gt.nil) {
    const E = c.opts.passContext ? zn.default.this : zn.default.self, T = !("compile" in t && !a || t.schema === !1);
    n.assign(f, (0, gt._)`${m}${(0, Px.callValidateCode)(e, l, E, T)}`, t.modifying);
  }
  function _(m) {
    var E;
    n.if((0, gt.not)((E = t.valid) !== null && E !== void 0 ? E : f), m);
  }
}
yr.funcKeywordCode = Nx;
function wy(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, gt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ox(e, t) {
  const { gen: r } = e;
  r.if((0, gt._)`Array.isArray(${t})`, () => {
    r.assign(zn.default.vErrors, (0, gt._)`${zn.default.vErrors} === null ? ${t} : ${zn.default.vErrors}.concat(${t})`).assign(zn.default.errors, (0, gt._)`${zn.default.vErrors}.length`), (0, Tx.extendErrors)(e);
  }, () => e.error());
}
function Rx({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function t$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, gt.stringify)(r) });
}
function Ix(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
yr.validSchemaType = Ix;
function Cx({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((a) => !Object.prototype.hasOwnProperty.call(e, a)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const c = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
yr.validateKeywordUsage = Cx;
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.extendSubschemaMode = hn.extendSubschemaData = hn.getSubschema = void 0;
const hr = fe, r$ = Y;
function kx(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const a = e.schema[t];
    return r === void 0 ? {
      schema: a,
      schemaPath: (0, hr._)`${e.schemaPath}${(0, hr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: a[r],
      schemaPath: (0, hr._)`${e.schemaPath}${(0, hr.getProperty)(t)}${(0, hr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, r$.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
hn.getSubschema = kx;
function Dx(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: a } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, h = a.let("data", (0, hr._)`${t.data}${(0, hr.getProperty)(r)}`, !0);
    c(h), e.errorPath = (0, hr.str)`${u}${(0, r$.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, hr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof hr.Name ? i : a.let("data", i, !0);
    c(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
hn.extendSubschemaData = Dx;
function Fx(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
hn.extendSubschemaMode = Fx;
var et = {}, n$ = { exports: {} }, un = n$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  Aa(t, n, i, e, "", e);
};
un.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
un.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
un.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
un.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Aa(e, t, r, n, i, s, o, a, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, o, a, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in un.arrayKeywords)
          for (var h = 0; h < f.length; h++)
            Aa(e, t, r, f[h], i + "/" + l + "/" + h, s, i, l, n, h);
      } else if (l in un.propsKeywords) {
        if (f && typeof f == "object")
          for (var p in f)
            Aa(e, t, r, f[p], i + "/" + l + "/" + jx(p), s, i, l, n, p);
      } else (l in un.keywords || e.allKeys && !(l in un.skipKeywords)) && Aa(e, t, r, f, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, o, a, c, u);
  }
}
function jx(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Lx = n$.exports;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getSchemaRefs = et.resolveUrl = et.normalizeId = et._getFullPath = et.getFullPath = et.inlineRef = void 0;
const Ux = Y, Mx = Ic, xx = Lx, qx = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Bx(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !bu(e) : t ? i$(e) <= t : !1;
}
et.inlineRef = Bx;
const Vx = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function bu(e) {
  for (const t in e) {
    if (Vx.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(bu) || typeof r == "object" && bu(r))
      return !0;
  }
  return !1;
}
function i$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !qx.has(r) && (typeof e[r] == "object" && (0, Ux.eachItem)(e[r], (n) => t += i$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function s$(e, t = "", r) {
  r !== !1 && (t = Li(t));
  const n = e.parse(t);
  return o$(e, n);
}
et.getFullPath = s$;
function o$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
et._getFullPath = o$;
const Hx = /#\/?$/;
function Li(e) {
  return e ? e.replace(Hx, "") : "";
}
et.normalizeId = Li;
function Gx(e, t, r) {
  return r = Li(r), e.resolve(t, r);
}
et.resolveUrl = Gx;
const zx = /^[a-z_][-a-z0-9._]*$/i;
function Kx(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Li(e[r] || t), s = { "": i }, o = s$(n, i, !1), a = {}, c = /* @__PURE__ */ new Set();
  return xx(e, { allKeys: !0 }, (f, h, p, g) => {
    if (g === void 0)
      return;
    const $ = o + h;
    let _ = s[g];
    typeof f[r] == "string" && (_ = m.call(this, f[r])), E.call(this, f.$anchor), E.call(this, f.$dynamicAnchor), s[h] = _;
    function m(T) {
      const I = this.opts.uriResolver.resolve;
      if (T = Li(_ ? I(_, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let F = this.refs[T];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? u(f, F.schema, T) : T !== Li($) && (T[0] === "#" ? (u(f, a[T], T), a[T] = f) : this.refs[T] = $), T;
    }
    function E(T) {
      if (typeof T == "string") {
        if (!zx.test(T))
          throw new Error(`invalid anchor "${T}"`);
        m.call(this, `#${T}`);
      }
    }
  }), a;
  function u(f, h, p) {
    if (h !== void 0 && !Mx(f, h))
      throw l(p);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
et.getSchemaRefs = Kx;
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.getData = sr.KeywordCxt = sr.validateFunctionCode = void 0;
const a$ = Gi, Ey = Ve, bd = Dr, Xa = Ve, Wx = Uc, Us = yr, Ul = hn, te = fe, ie = $r, Yx = et, Fr = Y, $s = Ro;
function Jx(e) {
  if (u$(e) && (f$(e), l$(e))) {
    Zx(e);
    return;
  }
  c$(e, () => (0, a$.topBoolOrEmptySchema)(e));
}
sr.validateFunctionCode = Jx;
function c$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, te._)`${ie.default.data}, ${ie.default.valCxt}`, n.$async, () => {
    e.code((0, te._)`"use strict"; ${Sy(r, i)}`), Qx(e, i), e.code(s);
  }) : e.func(t, (0, te._)`${ie.default.data}, ${Xx(i)}`, n.$async, () => e.code(Sy(r, i)).code(s));
}
function Xx(e) {
  return (0, te._)`{${ie.default.instancePath}="", ${ie.default.parentData}, ${ie.default.parentDataProperty}, ${ie.default.rootData}=${ie.default.data}${e.dynamicRef ? (0, te._)`, ${ie.default.dynamicAnchors}={}` : te.nil}}={}`;
}
function Qx(e, t) {
  e.if(ie.default.valCxt, () => {
    e.var(ie.default.instancePath, (0, te._)`${ie.default.valCxt}.${ie.default.instancePath}`), e.var(ie.default.parentData, (0, te._)`${ie.default.valCxt}.${ie.default.parentData}`), e.var(ie.default.parentDataProperty, (0, te._)`${ie.default.valCxt}.${ie.default.parentDataProperty}`), e.var(ie.default.rootData, (0, te._)`${ie.default.valCxt}.${ie.default.rootData}`), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`${ie.default.valCxt}.${ie.default.dynamicAnchors}`);
  }, () => {
    e.var(ie.default.instancePath, (0, te._)`""`), e.var(ie.default.parentData, (0, te._)`undefined`), e.var(ie.default.parentDataProperty, (0, te._)`undefined`), e.var(ie.default.rootData, ie.default.data), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`{}`);
  });
}
function Zx(e) {
  const { schema: t, opts: r, gen: n } = e;
  c$(e, () => {
    r.$comment && t.$comment && h$(e), i3(e), n.let(ie.default.vErrors, null), n.let(ie.default.errors, 0), r.unevaluated && e3(e), d$(e), a3(e);
  });
}
function e3(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, te._)`${r}.evaluated`), t.if((0, te._)`${e.evaluated}.dynamicProps`, () => t.assign((0, te._)`${e.evaluated}.props`, (0, te._)`undefined`)), t.if((0, te._)`${e.evaluated}.dynamicItems`, () => t.assign((0, te._)`${e.evaluated}.items`, (0, te._)`undefined`));
}
function Sy(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, te._)`/*# sourceURL=${r} */` : te.nil;
}
function t3(e, t) {
  if (u$(e) && (f$(e), l$(e))) {
    r3(e, t);
    return;
  }
  (0, a$.boolOrEmptySchema)(e, t);
}
function l$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function u$(e) {
  return typeof e.schema != "boolean";
}
function r3(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && h$(e), s3(e), o3(e);
  const s = n.const("_errs", ie.default.errors);
  d$(e, s), n.var(t, (0, te._)`${s} === ${ie.default.errors}`);
}
function f$(e) {
  (0, Fr.checkUnknownRules)(e), n3(e);
}
function d$(e, t) {
  if (e.opts.jtd)
    return by(e, [], !1, t);
  const r = (0, Ey.getSchemaTypes)(e.schema), n = (0, Ey.coerceAndCheckDataType)(e, r);
  by(e, r, !n, t);
}
function n3(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Fr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function i3(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Fr.checkStrictMode)(e, "default is ignored in the schema root");
}
function s3(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Yx.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function o3(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function h$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, te._)`${ie.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, te.str)`${n}/$comment`, a = e.scopeValue("root", { ref: t.root });
    e.code((0, te._)`${ie.default.self}.opts.$comment(${s}, ${o}, ${a}.schema)`);
  }
}
function a3(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, te._)`${ie.default.errors} === 0`, () => t.return(ie.default.data), () => t.throw((0, te._)`new ${i}(${ie.default.vErrors})`)) : (t.assign((0, te._)`${n}.errors`, ie.default.vErrors), s.unevaluated && c3(e), t.return((0, te._)`${ie.default.errors} === 0`));
}
function c3({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof te.Name && e.assign((0, te._)`${t}.props`, r), n instanceof te.Name && e.assign((0, te._)`${t}.items`, n);
}
function by(e, t, r, n) {
  const { gen: i, schema: s, data: o, allErrors: a, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, Fr.schemaHasRulesButRef)(s, l))) {
    i.block(() => y$(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || l3(e, t), i.block(() => {
    for (const h of l.rules)
      f(h);
    f(l.post);
  });
  function f(h) {
    (0, bd.shouldUseGroup)(s, h) && (h.type ? (i.if((0, Xa.checkDataType)(h.type, o, c.strictNumbers)), Py(e, h), t.length === 1 && t[0] === h.type && r && (i.else(), (0, Xa.reportTypeError)(e)), i.endIf()) : Py(e, h), a || i.if((0, te._)`${ie.default.errors} === ${n || 0}`));
  }
}
function Py(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, Wx.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, bd.shouldUseRule)(n, s) && y$(e, s.keyword, s.definition, t.type);
  });
}
function l3(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (u3(e, t), e.opts.allowUnionTypes || f3(e, t), d3(e, e.dataTypes));
}
function u3(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      p$(e.dataTypes, r) || Pd(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), p3(e, t);
  }
}
function f3(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Pd(e, "use allowUnionTypes to allow union type keyword");
}
function d3(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, bd.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => h3(t, o)) && Pd(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function h3(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function p$(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function p3(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    p$(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Pd(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Fr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class m$ {
  constructor(t, r, n) {
    if ((0, Us.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Fr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", g$(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Us.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ie.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, te.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, te.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, te._)`${r} !== undefined && (${(0, te.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? $s.reportExtraError : $s.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, $s.reportError)(this, this.def.$dataError || $s.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, $s.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = te.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = te.nil, r = te.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: o } = this;
    n.if((0, te.or)((0, te._)`${i} === undefined`, r)), t !== te.nil && n.assign(t, !0), (s.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== te.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, te.or)(o(), a());
    function o() {
      if (n.length) {
        if (!(r instanceof te.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, te._)`${(0, Xa.checkDataTypes)(c, r, s.opts.strictNumbers, Xa.DataType.Wrong)}`;
      }
      return te.nil;
    }
    function a() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, te._)`!${c}(${r})`;
      }
      return te.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ul.getSubschema)(this.it, t);
    (0, Ul.extendSubschemaData)(n, this.it, t), (0, Ul.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return t3(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Fr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Fr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, te.Name)), !0;
  }
}
sr.KeywordCxt = m$;
function y$(e, t, r, n) {
  const i = new m$(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Us.funcKeywordCode)(i, r) : "macro" in r ? (0, Us.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Us.funcKeywordCode)(i, r);
}
const m3 = /^\/(?:[^~]|~0|~1)*$/, y3 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function g$(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ie.default.rootData;
  if (e[0] === "/") {
    if (!m3.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ie.default.rootData;
  } else {
    const u = y3.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (s = r[t - l], !i)
      return s;
  }
  let o = s;
  const a = i.split("/");
  for (const u of a)
    u && (s = (0, te._)`${s}${(0, te.getProperty)((0, Fr.unescapeJsonPointer)(u))}`, o = (0, te._)`${o} && ${s}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
sr.getData = g$;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
class g3 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Io.default = g3;
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
const Ml = et;
class v3 extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ml.resolveUrl)(t, r, n), this.missingSchema = (0, Ml.normalizeId)((0, Ml.getFullPath)(t, this.missingRef));
  }
}
is.default = v3;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.resolveSchema = Rt.getCompilingSchema = Rt.resolveRef = Rt.compileSchema = Rt.SchemaEnv = void 0;
const Qt = fe, _3 = Io, Fn = $r, nr = et, Ty = Y, $3 = sr;
class Mc {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, nr.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Rt.SchemaEnv = Mc;
function Td(e) {
  const t = v$.call(this, e);
  if (t)
    return t;
  const r = (0, nr.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new Qt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let a;
  e.$async && (a = o.scopeValue("Error", {
    ref: _3.default,
    code: (0, Qt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Fn.default.data,
    parentData: Fn.default.parentData,
    parentDataProperty: Fn.default.parentDataProperty,
    dataNames: [Fn.default.data],
    dataPathArr: [Qt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Qt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: a,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Qt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Qt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, $3.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(Fn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${Fn.default.self}`, `${Fn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: g, items: $ } = u;
      p.evaluated = {
        props: g instanceof Qt.Name ? void 0 : g,
        items: $ instanceof Qt.Name ? void 0 : $,
        dynamicProps: g instanceof Qt.Name,
        dynamicItems: $ instanceof Qt.Name
      }, p.source && (p.source.evaluated = (0, Qt.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
Rt.compileSchema = Td;
function w3(e, t, r) {
  var n;
  r = (0, nr.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = b3.call(this, e, r);
  if (s === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: a } = this.opts;
    o && (s = new Mc({ schema: o, schemaId: a, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = E3.call(this, s);
}
Rt.resolveRef = w3;
function E3(e) {
  return (0, nr.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Td.call(this, e);
}
function v$(e) {
  for (const t of this._compilations)
    if (S3(t, e))
      return t;
}
Rt.getCompilingSchema = v$;
function S3(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function b3(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || xc.call(this, e, t);
}
function xc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, nr._getFullPath)(this.opts.uriResolver, r);
  let i = (0, nr.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return xl.call(this, r, e);
  const s = (0, nr.normalizeId)(n), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const a = xc.call(this, e, o);
    return typeof (a == null ? void 0 : a.schema) != "object" ? void 0 : xl.call(this, r, a);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Td.call(this, o), s === (0, nr.normalizeId)(t)) {
      const { schema: a } = o, { schemaId: c } = this.opts, u = a[c];
      return u && (i = (0, nr.resolveUrl)(this.opts.uriResolver, i, u)), new Mc({ schema: a, schemaId: c, root: e, baseId: i });
    }
    return xl.call(this, r, o);
  }
}
Rt.resolveSchema = xc;
const P3 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function xl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const a of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ty.unescapeFragment)(a)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !P3.has(a) && u && (t = (0, nr.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Ty.schemaHasRulesButRef)(r, this.RULES)) {
    const a = (0, nr.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = xc.call(this, n, a);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new Mc({ schema: r, schemaId: o, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const T3 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", A3 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", N3 = "object", O3 = [
  "$data"
], R3 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, I3 = !1, C3 = {
  $id: T3,
  description: A3,
  type: N3,
  required: O3,
  properties: R3,
  additionalProperties: I3
};
var Ad = {};
Object.defineProperty(Ad, "__esModule", { value: !0 });
const _$ = N_;
_$.code = 'require("ajv/dist/runtime/uri").default';
Ad.default = _$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = sr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = fe;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Io, i = is, s = ti, o = Rt, a = fe, c = et, u = Ve, l = Y, f = C3, h = Ad, p = (C, S) => new RegExp(C, S);
  p.code = "new RegExp";
  const g = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), _ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function T(C) {
    var S, N, b, d, v, A, w, y, D, O, W, de, Ee, Ae, Ie, nt, Se, qe, Yt, qt, kt, Bt, wr, Er, Sr;
    const Dt = C.strict, Vt = (S = C.code) === null || S === void 0 ? void 0 : S.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, qr = (b = (N = C.code) === null || N === void 0 ? void 0 : N.regExp) !== null && b !== void 0 ? b : p, At = (d = C.uriResolver) !== null && d !== void 0 ? d : h.default;
    return {
      strictSchema: (A = (v = C.strictSchema) !== null && v !== void 0 ? v : Dt) !== null && A !== void 0 ? A : !0,
      strictNumbers: (y = (w = C.strictNumbers) !== null && w !== void 0 ? w : Dt) !== null && y !== void 0 ? y : !0,
      strictTypes: (O = (D = C.strictTypes) !== null && D !== void 0 ? D : Dt) !== null && O !== void 0 ? O : "log",
      strictTuples: (de = (W = C.strictTuples) !== null && W !== void 0 ? W : Dt) !== null && de !== void 0 ? de : "log",
      strictRequired: (Ae = (Ee = C.strictRequired) !== null && Ee !== void 0 ? Ee : Dt) !== null && Ae !== void 0 ? Ae : !1,
      code: C.code ? { ...C.code, optimize: br, regExp: qr } : { optimize: br, regExp: qr },
      loopRequired: (Ie = C.loopRequired) !== null && Ie !== void 0 ? Ie : E,
      loopEnum: (nt = C.loopEnum) !== null && nt !== void 0 ? nt : E,
      meta: (Se = C.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (qe = C.messages) !== null && qe !== void 0 ? qe : !0,
      inlineRefs: (Yt = C.inlineRefs) !== null && Yt !== void 0 ? Yt : !0,
      schemaId: (qt = C.schemaId) !== null && qt !== void 0 ? qt : "$id",
      addUsedSchema: (kt = C.addUsedSchema) !== null && kt !== void 0 ? kt : !0,
      validateSchema: (Bt = C.validateSchema) !== null && Bt !== void 0 ? Bt : !0,
      validateFormats: (wr = C.validateFormats) !== null && wr !== void 0 ? wr : !0,
      unicodeRegExp: (Er = C.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (Sr = C.int32range) !== null && Sr !== void 0 ? Sr : !0,
      uriResolver: At
    };
  }
  class I {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...T(S) };
      const { es5: N, lines: b } = this.opts.code;
      this.scope = new a.ValueScope({ scope: {}, prefixes: $, es5: N, lines: b }), this.logger = B(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, s.getRules)(), F.call(this, _, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), S.formats && he.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && R.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), z.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: N, schemaId: b } = this.opts;
      let d = f;
      b === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), N && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: N } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[N] || S : void 0;
    }
    validate(S, N) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(N);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, N) {
      const b = this._addSchema(S, N);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, N) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, N);
      async function d(O, W) {
        await v.call(this, O.$schema);
        const de = this._addSchema(O, W);
        return de.validate || A.call(this, de);
      }
      async function v(O) {
        O && !this.getSchema(O) && await d.call(this, { $ref: O }, !0);
      }
      async function A(O) {
        try {
          return this._compileSchemaEnv(O);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return w.call(this, W), await y.call(this, W.missingSchema), A.call(this, O);
        }
      }
      function w({ missingSchema: O, missingRef: W }) {
        if (this.refs[O])
          throw new Error(`AnySchema ${O} is loaded but ${W} cannot be resolved`);
      }
      async function y(O) {
        const W = await D.call(this, O);
        this.refs[O] || await v.call(this, W.$schema), this.refs[O] || this.addSchema(W, O, N);
      }
      async function D(O) {
        const W = this._loading[O];
        if (W)
          return W;
        try {
          return await (this._loading[O] = b(O));
        } finally {
          delete this._loading[O];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, N, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const A of S)
          this.addSchema(A, void 0, b, d);
        return this;
      }
      let v;
      if (typeof S == "object") {
        const { schemaId: A } = this.opts;
        if (v = S[A], v !== void 0 && typeof v != "string")
          throw new Error(`schema ${A} must be string`);
      }
      return N = (0, c.normalizeId)(N || v), this._checkUnique(N), this.schemas[N] = this._addSchema(S, b, N, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, N, b = this.opts.validateSchema) {
      return this.addSchema(S, N, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, N) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && N) {
        const v = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(v);
        else
          throw new Error(v);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let N;
      for (; typeof (N = H.call(this, S)) == "string"; )
        S = N;
      if (N === void 0) {
        const { schemaId: b } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: b });
        if (N = o.resolveSchema.call(this, d, S), !N)
          return;
        this.refs[S] = N;
      }
      return N.validate || this._compileSchemaEnv(N);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const N = H.call(this, S);
          return typeof N == "object" && this._cache.delete(N.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const N = S;
          this._cache.delete(N);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const N of S)
        this.addKeyword(N);
      return this;
    }
    addKeyword(S, N) {
      let b;
      if (typeof S == "string")
        b = S, typeof N == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), N.keyword = b);
      else if (typeof S == "object" && N === void 0) {
        if (N = S, b = N.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, b, N), !N)
        return (0, l.eachItem)(b, (v) => L.call(this, v)), this;
      U.call(this, N);
      const d = {
        ...N,
        type: (0, u.getJSONTypes)(N.type),
        schemaType: (0, u.getJSONTypes)(N.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? (v) => L.call(this, v, d) : (v) => d.type.forEach((A) => L.call(this, v, d, A))), this;
    }
    getKeyword(S) {
      const N = this.RULES.all[S];
      return typeof N == "object" ? N.definition : !!N;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: N } = this;
      delete N.keywords[S], delete N.all[S];
      for (const b of N.rules) {
        const d = b.rules.findIndex((v) => v.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, N) {
      return typeof N == "string" && (N = new RegExp(N)), this.formats[S] = N, this;
    }
    errorsText(S = this.errors, { separator: N = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, v) => d + N + v);
    }
    $dataMetaSchema(S, N) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of N) {
        const v = d.split("/").slice(1);
        let A = S;
        for (const w of v)
          A = A[w];
        for (const w in b) {
          const y = b[w];
          if (typeof y != "object")
            continue;
          const { $data: D } = y.definition, O = A[w];
          D && O && (A[w] = q(O));
        }
      }
      return S;
    }
    _removeAllSchemas(S, N) {
      for (const b in S) {
        const d = S[b];
        (!N || N.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, N, b, d = this.opts.validateSchema, v = this.opts.addUsedSchema) {
      let A;
      const { schemaId: w } = this.opts;
      if (typeof S == "object")
        A = S[w];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let y = this._cache.get(S);
      if (y !== void 0)
        return y;
      b = (0, c.normalizeId)(A || b);
      const D = c.getSchemaRefs.call(this, S, b);
      return y = new o.SchemaEnv({ schema: S, schemaId: w, meta: N, baseId: b, localRefs: D }), this._cache.set(y.schema, y), v && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = y), d && this.validateSchema(S, !0), y;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : o.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const N = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, S);
      } finally {
        this.opts = N;
      }
    }
  }
  I.ValidationError = n.default, I.MissingRefError = i.default, e.default = I;
  function F(C, S, N, b = "error") {
    for (const d in C) {
      const v = d;
      v in S && this.logger[b](`${N}: option ${d}. ${C[v]}`);
    }
  }
  function H(C) {
    return C = (0, c.normalizeId)(C), this.schemas[C] || this.refs[C];
  }
  function z() {
    const C = this.opts.schemas;
    if (C)
      if (Array.isArray(C))
        this.addSchema(C);
      else
        for (const S in C)
          this.addSchema(C[S], S);
  }
  function he() {
    for (const C in this.opts.formats) {
      const S = this.opts.formats[C];
      S && this.addFormat(C, S);
    }
  }
  function R(C) {
    if (Array.isArray(C)) {
      this.addVocabulary(C);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in C) {
      const N = C[S];
      N.keyword || (N.keyword = S), this.addKeyword(N);
    }
  }
  function Q() {
    const C = { ...this.opts };
    for (const S of g)
      delete C[S];
    return C;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function B(C) {
    if (C === !1)
      return x;
    if (C === void 0)
      return console;
    if (C.log && C.warn && C.error)
      return C;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(C, S) {
    const { RULES: N } = this;
    if ((0, l.eachItem)(C, (b) => {
      if (N.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Z.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(C, S, N) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (N && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: v } = this;
    let A = d ? v.post : v.rules.find(({ type: y }) => y === N);
    if (A || (A = { type: N, rules: [] }, v.rules.push(A)), v.keywords[C] = !0, !S)
      return;
    const w = {
      keyword: C,
      definition: {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? V.call(this, A, w, S.before) : A.rules.push(w), v.all[C] = w, (b = S.implements) === null || b === void 0 || b.forEach((y) => this.addKeyword(y));
  }
  function V(C, S, N) {
    const b = C.rules.findIndex((d) => d.keyword === N);
    b >= 0 ? C.rules.splice(b, 0, S) : (C.rules.push(S), this.logger.warn(`rule ${N} is not defined`));
  }
  function U(C) {
    let { metaSchema: S } = C;
    S !== void 0 && (C.$data && this.opts.$data && (S = q(S)), C.validateSchema = this.compile(S, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function q(C) {
    return { anyOf: [C, G] };
  }
})(q_);
var Nd = {}, Od = {}, Rd = {};
Object.defineProperty(Rd, "__esModule", { value: !0 });
const k3 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Rd.default = k3;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.callRef = ri.getValidate = void 0;
const D3 = is, Ay = ye, Ot = fe, vi = $r, Ny = Rt, fa = Y, F3 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: o, opts: a, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = Ny.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new D3.default(n.opts.uriResolver, i, r);
    if (l instanceof Ny.SchemaEnv)
      return h(l);
    return p(l);
    function f() {
      if (s === u)
        return Na(e, o, s, s.$async);
      const g = t.scopeValue("root", { ref: u });
      return Na(e, (0, Ot._)`${g}.validate`, u, u.$async);
    }
    function h(g) {
      const $ = $$(e, g);
      Na(e, $, g, g.$async);
    }
    function p(g) {
      const $ = t.scopeValue("schema", a.code.source === !0 ? { ref: g, code: (0, Ot.stringify)(g) } : { ref: g }), _ = t.name("valid"), m = e.subschema({
        schema: g,
        dataTypes: [],
        schemaPath: Ot.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function $$(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ot._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ri.getValidate = $$;
function Na(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: o, schemaEnv: a, opts: c } = s, u = c.passContext ? vi.default.this : Ot.nil;
  n ? l() : f();
  function l() {
    if (!a.$async)
      throw new Error("async schema referenced by sync schema");
    const g = i.let("valid");
    i.try(() => {
      i.code((0, Ot._)`await ${(0, Ay.callValidateCode)(e, t, u)}`), p(t), o || i.assign(g, !0);
    }, ($) => {
      i.if((0, Ot._)`!(${$} instanceof ${s.ValidationError})`, () => i.throw($)), h($), o || i.assign(g, !1);
    }), e.ok(g);
  }
  function f() {
    e.result((0, Ay.callValidateCode)(e, t, u), () => p(t), () => h(t));
  }
  function h(g) {
    const $ = (0, Ot._)`${g}.errors`;
    i.assign(vi.default.vErrors, (0, Ot._)`${vi.default.vErrors} === null ? ${$} : ${vi.default.vErrors}.concat(${$})`), i.assign(vi.default.errors, (0, Ot._)`${vi.default.vErrors}.length`);
  }
  function p(g) {
    var $;
    if (!s.opts.unevaluated)
      return;
    const _ = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (s.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (s.props = fa.mergeEvaluated.props(i, _.props, s.props));
      else {
        const m = i.var("props", (0, Ot._)`${g}.evaluated.props`);
        s.props = fa.mergeEvaluated.props(i, m, s.props, Ot.Name);
      }
    if (s.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (s.items = fa.mergeEvaluated.items(i, _.items, s.items));
      else {
        const m = i.var("items", (0, Ot._)`${g}.evaluated.items`);
        s.items = fa.mergeEvaluated.items(i, m, s.items, Ot.Name);
      }
  }
}
ri.callRef = Na;
ri.default = F3;
Object.defineProperty(Od, "__esModule", { value: !0 });
const j3 = Rd, L3 = ri, U3 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  j3.default,
  L3.default
];
Od.default = U3;
var Id = {}, Cd = {};
Object.defineProperty(Cd, "__esModule", { value: !0 });
const Qa = fe, Qr = Qa.operators, Za = {
  maximum: { okStr: "<=", ok: Qr.LTE, fail: Qr.GT },
  minimum: { okStr: ">=", ok: Qr.GTE, fail: Qr.LT },
  exclusiveMaximum: { okStr: "<", ok: Qr.LT, fail: Qr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Qr.GT, fail: Qr.LTE }
}, M3 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Qa.str)`must be ${Za[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Qa._)`{comparison: ${Za[e].okStr}, limit: ${t}}`
}, x3 = {
  keyword: Object.keys(Za),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: M3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Qa._)`${r} ${Za[t].fail} ${n} || isNaN(${r})`);
  }
};
Cd.default = x3;
var kd = {};
Object.defineProperty(kd, "__esModule", { value: !0 });
const Ms = fe, q3 = {
  message: ({ schemaCode: e }) => (0, Ms.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Ms._)`{multipleOf: ${e}}`
}, B3 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: q3,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, o = t.let("res"), a = s ? (0, Ms._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Ms._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Ms._)`(${n} === 0 || (${o} = ${r}/${n}, ${a}))`);
  }
};
kd.default = B3;
var Dd = {}, Fd = {};
Object.defineProperty(Fd, "__esModule", { value: !0 });
function w$(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Fd.default = w$;
w$.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Dd, "__esModule", { value: !0 });
const Kn = fe, V3 = Y, H3 = Fd, G3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Kn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Kn._)`{limit: ${e}}`
}, z3 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: G3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Kn.operators.GT : Kn.operators.LT, o = i.opts.unicode === !1 ? (0, Kn._)`${r}.length` : (0, Kn._)`${(0, V3.useFunc)(e.gen, H3.default)}(${r})`;
    e.fail$data((0, Kn._)`${o} ${s} ${n}`);
  }
};
Dd.default = z3;
var jd = {};
Object.defineProperty(jd, "__esModule", { value: !0 });
const K3 = ye, ec = fe, W3 = {
  message: ({ schemaCode: e }) => (0, ec.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ec._)`{pattern: ${e}}`
}, Y3 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: W3,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", a = r ? (0, ec._)`(new RegExp(${i}, ${o}))` : (0, K3.usePattern)(e, n);
    e.fail$data((0, ec._)`!${a}.test(${t})`);
  }
};
jd.default = Y3;
var Ld = {};
Object.defineProperty(Ld, "__esModule", { value: !0 });
const xs = fe, J3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, xs.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, xs._)`{limit: ${e}}`
}, X3 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: J3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? xs.operators.GT : xs.operators.LT;
    e.fail$data((0, xs._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Ld.default = X3;
var Ud = {};
Object.defineProperty(Ud, "__esModule", { value: !0 });
const ws = ye, qs = fe, Q3 = Y, Z3 = {
  message: ({ params: { missingProperty: e } }) => (0, qs.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, qs._)`{missingProperty: ${e}}`
}, e9 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Z3,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: o } = e, { opts: a } = o;
    if (!s && r.length === 0)
      return;
    const c = r.length >= a.loopRequired;
    if (o.allErrors ? u() : l(), a.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: g } = e.it;
      for (const $ of r)
        if ((p == null ? void 0 : p[$]) === void 0 && !g.has($)) {
          const _ = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${_}" (strictRequired)`;
          (0, Q3.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(qs.nil, f);
      else
        for (const p of r)
          (0, ws.checkReportMissingProp)(e, p);
    }
    function l() {
      const p = t.let("missing");
      if (c || s) {
        const g = t.let("valid", !0);
        e.block$data(g, () => h(p, g)), e.ok(g);
      } else
        t.if((0, ws.checkMissingProp)(e, r, p)), (0, ws.reportMissingProp)(e, p), t.else();
    }
    function f() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, ws.noPropertyInData)(t, i, p, a.ownProperties), () => e.error());
      });
    }
    function h(p, g) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(g, (0, ws.propertyInData)(t, i, p, a.ownProperties)), t.if((0, qs.not)(g), () => {
          e.error(), t.break();
        });
      }, qs.nil);
    }
  }
};
Ud.default = e9;
var Md = {};
Object.defineProperty(Md, "__esModule", { value: !0 });
const Bs = fe, t9 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Bs.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Bs._)`{limit: ${e}}`
}, r9 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: t9,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Bs.operators.GT : Bs.operators.LT;
    e.fail$data((0, Bs._)`${r}.length ${i} ${n}`);
  }
};
Md.default = r9;
var xd = {}, Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const E$ = Ic;
E$.code = 'require("ajv/dist/runtime/equal").default';
Co.default = E$;
Object.defineProperty(xd, "__esModule", { value: !0 });
const ql = Ve, Qe = fe, n9 = Y, i9 = Co, s9 = {
  message: ({ params: { i: e, j: t } }) => (0, Qe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Qe._)`{i: ${e}, j: ${t}}`
}, o9 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: s9,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: o, it: a } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, ql.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, Qe._)`${o} === false`), e.ok(c);
    function l() {
      const g = t.let("i", (0, Qe._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: g, j: $ }), t.assign(c, !0), t.if((0, Qe._)`${g} > 1`, () => (f() ? h : p)(g, $));
    }
    function f() {
      return u.length > 0 && !u.some((g) => g === "object" || g === "array");
    }
    function h(g, $) {
      const _ = t.name("item"), m = (0, ql.checkDataTypes)(u, _, a.opts.strictNumbers, ql.DataType.Wrong), E = t.const("indices", (0, Qe._)`{}`);
      t.for((0, Qe._)`;${g}--;`, () => {
        t.let(_, (0, Qe._)`${r}[${g}]`), t.if(m, (0, Qe._)`continue`), u.length > 1 && t.if((0, Qe._)`typeof ${_} == "string"`, (0, Qe._)`${_} += "_"`), t.if((0, Qe._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign($, (0, Qe._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Qe._)`${E}[${_}] = ${g}`);
      });
    }
    function p(g, $) {
      const _ = (0, n9.useFunc)(t, i9.default), m = t.name("outer");
      t.label(m).for((0, Qe._)`;${g}--;`, () => t.for((0, Qe._)`${$} = ${g}; ${$}--;`, () => t.if((0, Qe._)`${_}(${r}[${g}], ${r}[${$}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
xd.default = o9;
var qd = {};
Object.defineProperty(qd, "__esModule", { value: !0 });
const Pu = fe, a9 = Y, c9 = Co, l9 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Pu._)`{allowedValue: ${e}}`
}, u9 = {
  keyword: "const",
  $data: !0,
  error: l9,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, Pu._)`!${(0, a9.useFunc)(t, c9.default)}(${r}, ${i})`) : e.fail((0, Pu._)`${s} !== ${r}`);
  }
};
qd.default = u9;
var Bd = {};
Object.defineProperty(Bd, "__esModule", { value: !0 });
const Ts = fe, f9 = Y, d9 = Co, h9 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ts._)`{allowedValues: ${e}}`
}, p9 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: h9,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const a = i.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, f9.useFunc)(t, d9.default));
    let l;
    if (a || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", s);
      l = (0, Ts.or)(...i.map((g, $) => h(p, $)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (p) => t.if((0, Ts._)`${u()}(${r}, ${p})`, () => t.assign(l, !0).break()));
    }
    function h(p, g) {
      const $ = i[g];
      return typeof $ == "object" && $ !== null ? (0, Ts._)`${u()}(${r}, ${p}[${g}])` : (0, Ts._)`${r} === ${$}`;
    }
  }
};
Bd.default = p9;
Object.defineProperty(Id, "__esModule", { value: !0 });
const m9 = Cd, y9 = kd, g9 = Dd, v9 = jd, _9 = Ld, $9 = Ud, w9 = Md, E9 = xd, S9 = qd, b9 = Bd, P9 = [
  // number
  m9.default,
  y9.default,
  // string
  g9.default,
  v9.default,
  // object
  _9.default,
  $9.default,
  // array
  w9.default,
  E9.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  S9.default,
  b9.default
];
Id.default = P9;
var Vd = {}, ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.validateAdditionalItems = void 0;
const Wn = fe, Tu = Y, T9 = {
  message: ({ params: { len: e } }) => (0, Wn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Wn._)`{limit: ${e}}`
}, A9 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: T9,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Tu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    S$(e, n);
  }
};
function S$(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: o } = e;
  o.items = !0;
  const a = r.const("len", (0, Wn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Wn._)`${a} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Tu.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, Wn._)`${a} <= ${t.length}`);
    r.if((0, Wn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, a, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: Tu.Type.Num }, u), o.allErrors || r.if((0, Wn.not)(u), () => r.break());
    });
  }
}
ss.validateAdditionalItems = S$;
ss.default = A9;
var Hd = {}, os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.validateTuple = void 0;
const Oy = fe, Oa = Y, N9 = ye, O9 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return b$(e, "additionalItems", t);
    r.items = !0, !(0, Oa.alwaysValidSchema)(r, t) && e.ok((0, N9.validateArray)(e));
  }
};
function b$(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: o, it: a } = e;
  l(i), a.opts.unevaluated && r.length && a.items !== !0 && (a.items = Oa.mergeEvaluated.items(n, r.length, a.items));
  const c = n.name("valid"), u = n.const("len", (0, Oy._)`${s}.length`);
  r.forEach((f, h) => {
    (0, Oa.alwaysValidSchema)(a, f) || (n.if((0, Oy._)`${u} > ${h}`, () => e.subschema({
      keyword: o,
      schemaProp: h,
      dataProp: h
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: h, errSchemaPath: p } = a, g = r.length, $ = g === f.minItems && (g === f.maxItems || f[t] === !1);
    if (h.strictTuples && !$) {
      const _ = `"${o}" is ${g}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, Oa.checkStrictMode)(a, _, h.strictTuples);
    }
  }
}
os.validateTuple = b$;
os.default = O9;
Object.defineProperty(Hd, "__esModule", { value: !0 });
const R9 = os, I9 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, R9.validateTuple)(e, "items")
};
Hd.default = I9;
var Gd = {};
Object.defineProperty(Gd, "__esModule", { value: !0 });
const Ry = fe, C9 = Y, k9 = ye, D9 = ss, F9 = {
  message: ({ params: { len: e } }) => (0, Ry.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ry._)`{limit: ${e}}`
}, j9 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: F9,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, C9.alwaysValidSchema)(n, t) && (i ? (0, D9.validateAdditionalItems)(e, i) : e.ok((0, k9.validateArray)(e)));
  }
};
Gd.default = j9;
var zd = {};
Object.defineProperty(zd, "__esModule", { value: !0 });
const Kt = fe, da = Y, L9 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Kt.str)`must contain at least ${e} valid item(s)` : (0, Kt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Kt._)`{minContains: ${e}}` : (0, Kt._)`{minContains: ${e}, maxContains: ${t}}`
}, U9 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: L9,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let o, a;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (o = c === void 0 ? 1 : c, a = u) : o = 1;
    const l = t.const("len", (0, Kt._)`${i}.length`);
    if (e.setParams({ min: o, max: a }), a === void 0 && o === 0) {
      (0, da.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (a !== void 0 && o > a) {
      (0, da.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, da.alwaysValidSchema)(s, r)) {
      let $ = (0, Kt._)`${l} >= ${o}`;
      a !== void 0 && ($ = (0, Kt._)`${$} && ${l} <= ${a}`), e.pass($);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    a === void 0 && o === 1 ? p(f, () => t.if(f, () => t.break())) : o === 0 ? (t.let(f, !0), a !== void 0 && t.if((0, Kt._)`${i}.length > 0`, h)) : (t.let(f, !1), h()), e.result(f, () => e.reset());
    function h() {
      const $ = t.name("_valid"), _ = t.let("count", 0);
      p($, () => t.if($, () => g(_)));
    }
    function p($, _) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: da.Type.Num,
          compositeRule: !0
        }, $), _();
      });
    }
    function g($) {
      t.code((0, Kt._)`${$}++`), a === void 0 ? t.if((0, Kt._)`${$} >= ${o}`, () => t.assign(f, !0).break()) : (t.if((0, Kt._)`${$} > ${a}`, () => t.assign(f, !1).break()), o === 1 ? t.assign(f, !0) : t.if((0, Kt._)`${$} >= ${o}`, () => t.assign(f, !0)));
    }
  }
};
zd.default = U9;
var P$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = fe, r = Y, n = ye;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      o(c, u), a(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const h = Array.isArray(c[f]) ? u : l;
      h[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: h } = c;
    if (Object.keys(u).length === 0)
      return;
    const p = l.let("missing");
    for (const g in u) {
      const $ = u[g];
      if ($.length === 0)
        continue;
      const _ = (0, n.propertyInData)(l, f, g, h.opts.ownProperties);
      c.setParams({
        property: g,
        depsCount: $.length,
        deps: $.join(", ")
      }), h.allErrors ? l.if(_, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, $, p)})`), (0, n.reportMissingProp)(c, p), l.else());
    }
  }
  e.validatePropertyDeps = o;
  function a(c, u = c.schema) {
    const { gen: l, data: f, keyword: h, it: p } = c, g = l.name("valid");
    for (const $ in u)
      (0, r.alwaysValidSchema)(p, u[$]) || (l.if(
        (0, n.propertyInData)(l, f, $, p.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: h, schemaProp: $ }, g);
          c.mergeValidEvaluated(_, g);
        },
        () => l.var(g, !0)
        // TODO var
      ), c.ok(g));
  }
  e.validateSchemaDeps = a, e.default = i;
})(P$);
var Kd = {};
Object.defineProperty(Kd, "__esModule", { value: !0 });
const T$ = fe, M9 = Y, x9 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, T$._)`{propertyName: ${e.propertyName}}`
}, q9 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: x9,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, M9.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, T$.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Kd.default = q9;
var qc = {};
Object.defineProperty(qc, "__esModule", { value: !0 });
const ha = ye, er = fe, B9 = $r, pa = Y, V9 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, er._)`{additionalProperty: ${e.additionalProperty}}`
}, H9 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: V9,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: a, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, pa.alwaysValidSchema)(o, r))
      return;
    const u = (0, ha.allSchemaProperties)(n.properties), l = (0, ha.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, er._)`${s} === ${B9.default.errors}`);
    function f() {
      t.forIn("key", i, (_) => {
        !u.length && !l.length ? g(_) : t.if(h(_), () => g(_));
      });
    }
    function h(_) {
      let m;
      if (u.length > 8) {
        const E = (0, pa.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, ha.isOwnProperty)(t, E, _);
      } else u.length ? m = (0, er.or)(...u.map((E) => (0, er._)`${_} === ${E}`)) : m = er.nil;
      return l.length && (m = (0, er.or)(m, ...l.map((E) => (0, er._)`${(0, ha.usePattern)(e, E)}.test(${_})`))), (0, er.not)(m);
    }
    function p(_) {
      t.code((0, er._)`delete ${i}[${_}]`);
    }
    function g(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), a || t.break();
        return;
      }
      if (typeof r == "object" && !(0, pa.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? ($(_, m, !1), t.if((0, er.not)(m), () => {
          e.reset(), p(_);
        })) : ($(_, m), a || t.if((0, er.not)(m), () => t.break()));
      }
    }
    function $(_, m, E) {
      const T = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: pa.Type.Str
      };
      E === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, m);
    }
  }
};
qc.default = H9;
var Wd = {};
Object.defineProperty(Wd, "__esModule", { value: !0 });
const G9 = sr, Iy = ye, Bl = Y, Cy = qc, z9 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Cy.default.code(new G9.KeywordCxt(s, Cy.default, "additionalProperties"));
    const o = (0, Iy.allSchemaProperties)(r);
    for (const f of o)
      s.definedProperties.add(f);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = Bl.mergeEvaluated.props(t, (0, Bl.toHash)(o), s.props));
    const a = o.filter((f) => !(0, Bl.alwaysValidSchema)(s, r[f]));
    if (a.length === 0)
      return;
    const c = t.name("valid");
    for (const f of a)
      u(f) ? l(f) : (t.if((0, Iy.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Wd.default = z9;
var Yd = {};
Object.defineProperty(Yd, "__esModule", { value: !0 });
const ky = ye, ma = fe, Dy = Y, Fy = Y, K9 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: o } = s, a = (0, ky.allSchemaProperties)(r), c = a.filter(($) => (0, Dy.alwaysValidSchema)(s, r[$]));
    if (a.length === 0 || c.length === a.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof ma.Name) && (s.props = (0, Fy.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    h();
    function h() {
      for (const $ of a)
        u && p($), s.allErrors ? g($) : (t.var(l, !0), g($), t.if(l));
    }
    function p($) {
      for (const _ in u)
        new RegExp($).test(_) && (0, Dy.checkStrictMode)(s, `property ${_} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function g($) {
      t.forIn("key", n, (_) => {
        t.if((0, ma._)`${(0, ky.usePattern)(e, $)}.test(${_})`, () => {
          const m = c.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: _,
            dataPropType: Fy.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, ma._)`${f}[${_}]`, !0) : !m && !s.allErrors && t.if((0, ma.not)(l), () => t.break());
        });
      });
    }
  }
};
Yd.default = K9;
var Jd = {};
Object.defineProperty(Jd, "__esModule", { value: !0 });
const W9 = Y, Y9 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, W9.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Jd.default = Y9;
var Xd = {};
Object.defineProperty(Xd, "__esModule", { value: !0 });
const J9 = ye, X9 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: J9.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Xd.default = X9;
var Qd = {};
Object.defineProperty(Qd, "__esModule", { value: !0 });
const Ra = fe, Q9 = Y, Z9 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ra._)`{passingSchemas: ${e.passing}}`
}, eq = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Z9,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, o = t.let("valid", !1), a = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: a }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let h;
        (0, Q9.alwaysValidSchema)(i, l) ? t.var(c, !0) : h = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, Ra._)`${c} && ${o}`).assign(o, !1).assign(a, (0, Ra._)`[${a}, ${f}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(a, f), h && e.mergeEvaluated(h, Ra.Name);
        });
      });
    }
  }
};
Qd.default = eq;
var Zd = {};
Object.defineProperty(Zd, "__esModule", { value: !0 });
const tq = Y, rq = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, o) => {
      if ((0, tq.alwaysValidSchema)(n, s))
        return;
      const a = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(a);
    });
  }
};
Zd.default = rq;
var eh = {};
Object.defineProperty(eh, "__esModule", { value: !0 });
const tc = fe, A$ = Y, nq = {
  message: ({ params: e }) => (0, tc.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, tc._)`{failingKeyword: ${e.ifClause}}`
}, iq = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: nq,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, A$.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = jy(n, "then"), s = jy(n, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", !0), a = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(a, u("then", l), u("else", l));
    } else i ? t.if(a, u("then")) : t.if((0, tc.not)(a), u("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, a);
      e.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const h = e.subschema({ keyword: l }, a);
        t.assign(o, a), e.mergeValidEvaluated(h, o), f ? t.assign(f, (0, tc._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function jy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, A$.alwaysValidSchema)(e, r);
}
eh.default = iq;
var th = {};
Object.defineProperty(th, "__esModule", { value: !0 });
const sq = Y, oq = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, sq.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
th.default = oq;
Object.defineProperty(Vd, "__esModule", { value: !0 });
const aq = ss, cq = Hd, lq = os, uq = Gd, fq = zd, dq = P$, hq = Kd, pq = qc, mq = Wd, yq = Yd, gq = Jd, vq = Xd, _q = Qd, $q = Zd, wq = eh, Eq = th;
function Sq(e = !1) {
  const t = [
    // any
    gq.default,
    vq.default,
    _q.default,
    $q.default,
    wq.default,
    Eq.default,
    // object
    hq.default,
    pq.default,
    dq.default,
    mq.default,
    yq.default
  ];
  return e ? t.push(cq.default, uq.default) : t.push(aq.default, lq.default), t.push(fq.default), t;
}
Vd.default = Sq;
var rh = {}, nh = {};
Object.defineProperty(nh, "__esModule", { value: !0 });
const Me = fe, bq = {
  message: ({ schemaCode: e }) => (0, Me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Me._)`{format: ${e}}`
}, Pq = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: bq,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: o, it: a } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = a;
    if (!c.validateFormats)
      return;
    i ? h() : p();
    function h() {
      const g = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), $ = r.const("fDef", (0, Me._)`${g}[${o}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, Me._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(_, (0, Me._)`${$}.type || "string"`).assign(m, (0, Me._)`${$}.validate`), () => r.assign(_, (0, Me._)`"string"`).assign(m, $)), e.fail$data((0, Me.or)(E(), T()));
      function E() {
        return c.strictSchema === !1 ? Me.nil : (0, Me._)`${o} && !${m}`;
      }
      function T() {
        const I = l.$async ? (0, Me._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Me._)`${m}(${n})`, F = (0, Me._)`(typeof ${m} == "function" ? ${I} : ${m}.test(${n}))`;
        return (0, Me._)`${m} && ${m} !== true && ${_} === ${t} && !${F}`;
      }
    }
    function p() {
      const g = f.formats[s];
      if (!g) {
        E();
        return;
      }
      if (g === !0)
        return;
      const [$, _, m] = T(g);
      $ === t && e.pass(I());
      function E() {
        if (c.strictSchema === !1) {
          f.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function T(F) {
        const H = F instanceof RegExp ? (0, Me.regexpCode)(F) : c.code.formats ? (0, Me._)`${c.code.formats}${(0, Me.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: F, code: H });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Me._)`${z}.validate`] : ["string", F, z];
      }
      function I() {
        if (typeof g == "object" && !(g instanceof RegExp) && g.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Me._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, Me._)`${m}(${n})` : (0, Me._)`${m}.test(${n})`;
      }
    }
  }
};
nh.default = Pq;
Object.defineProperty(rh, "__esModule", { value: !0 });
const Tq = nh, Aq = [Tq.default];
rh.default = Aq;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.contentVocabulary = zi.metadataVocabulary = void 0;
zi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
zi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Nd, "__esModule", { value: !0 });
const Nq = Od, Oq = Id, Rq = Vd, Iq = rh, Ly = zi, Cq = [
  Nq.default,
  Oq.default,
  (0, Rq.default)(),
  Iq.default,
  Ly.metadataVocabulary,
  Ly.contentVocabulary
];
Nd.default = Cq;
var ih = {}, Bc = {};
Object.defineProperty(Bc, "__esModule", { value: !0 });
Bc.DiscrError = void 0;
var Uy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Uy || (Bc.DiscrError = Uy = {}));
Object.defineProperty(ih, "__esModule", { value: !0 });
const Ei = fe, Au = Bc, My = Rt, kq = is, Dq = Y, Fq = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Au.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Ei._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, jq = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Fq,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const a = n.propertyName;
    if (typeof a != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), u = t.const("tag", (0, Ei._)`${r}${(0, Ei.getProperty)(a)}`);
    t.if((0, Ei._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: Au.DiscrError.Tag, tag: u, tagName: a })), e.ok(c);
    function l() {
      const p = h();
      t.if(!1);
      for (const g in p)
        t.elseIf((0, Ei._)`${u} === ${g}`), t.assign(c, f(p[g]));
      t.else(), e.error(!1, { discrError: Au.DiscrError.Mapping, tag: u, tagName: a }), t.endIf();
    }
    function f(p) {
      const g = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: p }, g);
      return e.mergeEvaluated($, Ei.Name), g;
    }
    function h() {
      var p;
      const g = {}, $ = m(i);
      let _ = !0;
      for (let I = 0; I < o.length; I++) {
        let F = o[I];
        if (F != null && F.$ref && !(0, Dq.schemaHasRulesButRef)(F, s.self.RULES)) {
          const z = F.$ref;
          if (F = My.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), F instanceof My.SchemaEnv && (F = F.schema), F === void 0)
            throw new kq.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (p = F == null ? void 0 : F.properties) === null || p === void 0 ? void 0 : p[a];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);
        _ = _ && ($ || m(F)), E(H, I);
      }
      if (!_)
        throw new Error(`discriminator: "${a}" must be required`);
      return g;
      function m({ required: I }) {
        return Array.isArray(I) && I.includes(a);
      }
      function E(I, F) {
        if (I.const)
          T(I.const, F);
        else if (I.enum)
          for (const H of I.enum)
            T(H, F);
        else
          throw new Error(`discriminator: "properties/${a}" must have "const" or "enum"`);
      }
      function T(I, F) {
        if (typeof I != "string" || I in g)
          throw new Error(`discriminator: "${a}" values must be unique strings`);
        g[I] = F;
      }
    }
  }
};
ih.default = jq;
const Lq = "http://json-schema.org/draft-07/schema#", Uq = "http://json-schema.org/draft-07/schema#", Mq = "Core schema meta-schema", xq = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, qq = [
  "object",
  "boolean"
], Bq = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, Vq = {
  $schema: Lq,
  $id: Uq,
  title: Mq,
  definitions: xq,
  type: qq,
  properties: Bq,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = q_, n = Nd, i = ih, s = Vq, o = ["/properties"], a = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((g) => this.addVocabulary(g)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const g = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(g, a, !1), this.refs["http://json-schema.org/schema"] = a;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var u = sr;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var l = fe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var f = Io;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var h = is;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return h.default;
  } });
})($u, $u.exports);
var Hq = $u.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Hq, r = fe, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, s = {
    message: ({ keyword: a, schemaCode: c }) => (0, r.str)`should be ${i[a].okStr} ${c}`,
    params: ({ keyword: a, schemaCode: c }) => (0, r._)`{comparison: ${i[a].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(a) {
      const { gen: c, data: u, schemaCode: l, keyword: f, it: h } = a, { opts: p, self: g } = h;
      if (!p.validateFormats)
        return;
      const $ = new t.KeywordCxt(h, g.RULES.all.format.definition, "format");
      $.$data ? _() : m();
      function _() {
        const T = c.scopeValue("formats", {
          ref: g.formats,
          code: p.code.formats
        }), I = c.const("fmt", (0, r._)`${T}[${$.schemaCode}]`);
        a.fail$data((0, r.or)((0, r._)`typeof ${I} != "object"`, (0, r._)`${I} instanceof RegExp`, (0, r._)`typeof ${I}.compare != "function"`, E(I)));
      }
      function m() {
        const T = $.schema, I = g.formats[T];
        if (!I || I === !0)
          return;
        if (typeof I != "object" || I instanceof RegExp || typeof I.compare != "function")
          throw new Error(`"${f}": format "${T}" does not define "compare" function`);
        const F = c.scopeValue("formats", {
          key: T,
          ref: I,
          code: p.code.formats ? (0, r._)`${p.code.formats}${(0, r.getProperty)(T)}` : void 0
        });
        a.fail$data(E(F));
      }
      function E(T) {
        return (0, r._)`${T}.compare(${u}, ${l}) ${i[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (a) => (a.addKeyword(e.formatLimitDefinition), a);
  e.default = o;
})(x_);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = M_, n = x_, i = fe, s = new i.Name("fullFormats"), o = new i.Name("fastFormats"), a = (u, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(u, l, r.fullFormats, s), u;
    const [f, h] = l.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, s], p = l.formats || r.formatNames;
    return c(u, p, f, h), l.keywords && (0, n.default)(u), u;
  };
  a.get = (u, l = "full") => {
    const h = (l === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!h)
      throw new Error(`Unknown format "${u}"`);
    return h;
  };
  function c(u, l, f, h) {
    var p, g;
    (p = (g = u.opts.code).formats) !== null && p !== void 0 || (g.formats = (0, i._)`require("ajv-formats/dist/formats").${h}`);
    for (const $ of l)
      u.addFormat($, f[$]);
  }
  e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
})(_u, _u.exports);
var Gq = _u.exports;
const zq = /* @__PURE__ */ ic(Gq), Kq = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !Wq(i, s) && n || Object.defineProperty(e, r, s);
}, Wq = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Yq = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Jq = (e, t) => `/* Wrapped ${e}*/
${t}`, Xq = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Qq = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Zq = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = Jq.bind(null, n, t.toString());
  Object.defineProperty(i, "name", Qq);
  const { writable: s, enumerable: o, configurable: a } = Xq;
  Object.defineProperty(e, "toString", { value: i, writable: s, enumerable: o, configurable: a });
};
function eB(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    Kq(e, t, i, r);
  return Yq(e, t), Zq(e, t, n), e;
}
const xy = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: s = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, a, c;
  const u = function(...l) {
    const f = this, h = () => {
      o = void 0, a && (clearTimeout(a), a = void 0), s && (c = e.apply(f, l));
    }, p = () => {
      a = void 0, o && (clearTimeout(o), o = void 0), s && (c = e.apply(f, l));
    }, g = i && !o;
    return clearTimeout(o), o = setTimeout(h, r), n > 0 && n !== Number.POSITIVE_INFINITY && !a && (a = setTimeout(p, n)), g && (c = e.apply(f, l)), c;
  };
  return eB(u, e), u.cancel = () => {
    o && (clearTimeout(o), o = void 0), a && (clearTimeout(a), a = void 0);
  }, u;
}, tB = Object.prototype.toString, rB = "[object Uint8Array]", nB = "[object ArrayBuffer]";
function N$(e, t, r) {
  return e ? e.constructor === t ? !0 : tB.call(e) === r : !1;
}
function O$(e) {
  return N$(e, Uint8Array, rB);
}
function iB(e) {
  return N$(e, ArrayBuffer, nB);
}
function sB(e) {
  return O$(e) || iB(e);
}
function oB(e) {
  if (!O$(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function aB(e) {
  if (!sB(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function qy(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, s) => i + s.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    oB(i), r.set(i, n), n += i.length;
  return r;
}
const ya = {
  utf8: new globalThis.TextDecoder("utf8")
};
function By(e, t = "utf8") {
  return aB(e), ya[t] ?? (ya[t] = new globalThis.TextDecoder(t)), ya[t].decode(e);
}
function cB(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const lB = new globalThis.TextEncoder();
function Vl(e) {
  return cB(e), lB.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const uB = zq.default, Vy = "aes-256-cbc", _i = () => /* @__PURE__ */ Object.create(null), fB = (e) => e != null, dB = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Ia = "__internal__", Hl = `${Ia}.migrations.version`;
var sn, Or, Mt, Rr;
class hB {
  constructor(t = {}) {
    pt(this, "path");
    pt(this, "events");
    fs(this, sn);
    fs(this, Or);
    fs(this, Mt);
    fs(this, Rr, {});
    pt(this, "_deserialize", (t) => JSON.parse(t));
    pt(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = Ck(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (ds(this, Mt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const o = new kM.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      uB(o);
      const a = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      ds(this, sn, o.compile(a));
      for (const [c, u] of Object.entries(r.schema ?? {}))
        u != null && u.default && (Ce(this, Rr)[c] = u.default);
    }
    r.defaults && ds(this, Rr, {
      ...Ce(this, Rr),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), ds(this, Or, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = X.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, s = Object.assign(_i(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(s);
    try {
      tE.deepEqual(i, s);
    } catch {
      this.store = s;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (Ce(this, Mt).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${Ia} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (s, o) => {
      dB(s, o), Ce(this, Mt).accessPropertiesByDotNotation ? Mm(n, s, o) : n[s] = o;
    };
    if (typeof t == "object") {
      const s = t;
      for (const [o, a] of Object.entries(s))
        i(o, a);
    } else
      i(t, r);
    this.store = n;
  }
  has(t) {
    return Ce(this, Mt).accessPropertiesByDotNotation ? Nk(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      fB(Ce(this, Rr)[r]) && this.set(r, Ce(this, Rr)[r]);
  }
  delete(t) {
    const { store: r } = this;
    Ce(this, Mt).accessPropertiesByDotNotation ? Ak(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = _i();
    for (const t of Object.keys(Ce(this, Rr)))
      this.reset(t);
  }
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  /**
      Get all the config as an object or replace the current config with an object.
  
      @example
      ```
      console.log(config.store);
      //=> {name: 'John', age: 30}
      ```
  
      @example
      ```
      config.store = {
          hello: 'world'
      };
      ```
      */
  get store() {
    try {
      const t = ue.readFileSync(this.path, Ce(this, Or) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(_i(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), _i();
      if (Ce(this, Mt).clearInvalidConfig && t.name === "SyntaxError")
        return _i();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      yield [t, r];
  }
  _encryptData(t) {
    if (!Ce(this, Or))
      return typeof t == "string" ? t : By(t);
    try {
      const r = t.slice(0, 16), n = xn.pbkdf2Sync(Ce(this, Or), r.toString(), 1e4, 32, "sha512"), i = xn.createDecipheriv(Vy, n, r), s = t.slice(17), o = typeof s == "string" ? Vl(s) : s;
      return By(qy([i.update(o), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const s = n, o = t();
      eE(o, s) || (n = o, r.call(this, o, s));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!Ce(this, sn) || Ce(this, sn).call(this, t) || !Ce(this, sn).errors)
      return;
    const n = Ce(this, sn).errors.map(({ instancePath: i, message: s = "" }) => `\`${i.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ue.mkdirSync(X.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (Ce(this, Or)) {
      const n = xn.randomBytes(16), i = xn.pbkdf2Sync(Ce(this, Or), n.toString(), 1e4, 32, "sha512"), s = xn.createCipheriv(Vy, i, n);
      r = qy([n, Vl(":"), s.update(Vl(r)), s.final()]);
    }
    if (Fe.env.SNAP)
      ue.writeFileSync(this.path, r, { mode: Ce(this, Mt).configFileMode });
    else
      try {
        Mv(this.path, r, { mode: Ce(this, Mt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          ue.writeFileSync(this.path, r, { mode: Ce(this, Mt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), ue.existsSync(this.path) || this._write(_i()), Fe.platform === "win32" ? ue.watch(this.path, { persistent: !1 }, xy(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : ue.watchFile(this.path, { persistent: !1 }, xy(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(Hl, "0.0.0");
    const s = Object.keys(t).filter((a) => this._shouldPerformMigration(a, i, r));
    let o = { ...this.store };
    for (const a of s)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: a,
          finalVersion: r,
          versions: s
        });
        const c = t[a];
        c == null || c(this), this._set(Hl, a), i = a, o = { ...this.store };
      } catch (c) {
        throw this.store = o, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !ui.eq(i, r)) && this._set(Hl, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === Ia ? !0 : typeof t != "string" ? !1 : Ce(this, Mt).accessPropertiesByDotNotation ? !!t.startsWith(`${Ia}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return ui.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && ui.satisfies(r, t) ? !1 : ui.satisfies(n, t) : !(ui.lte(t, r) || ui.gt(t, n));
  }
  _get(t, r) {
    return Tk(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Mm(n, t, r), this.store = n;
  }
}
sn = new WeakMap(), Or = new WeakMap(), Mt = new WeakMap(), Rr = new WeakMap();
const { app: Ca, ipcMain: Nu, shell: pB } = jr;
let Hy = !1;
const Gy = () => {
  if (!Nu || !Ca)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Ca.getPath("userData"),
    appVersion: Ca.getVersion()
  };
  return Hy || (Nu.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Hy = !0), e;
};
class mB extends hB {
  constructor(t) {
    let r, n;
    if (Fe.type === "renderer") {
      const i = jr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else Nu && Ca && ({ defaultCwd: r, appVersion: n } = Gy());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = X.isAbsolute(t.cwd) ? t.cwd : X.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Gy();
  }
  async openInEditor() {
    const t = await pB.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var sh = rc, yB = ge, Sn = ho.spawn, oh = "HKLM", R$ = "HKCU", I$ = "HKCR", C$ = "HKU", k$ = "HKCC", D$ = [oh, R$, I$, C$, k$], F$ = "REG_SZ", j$ = "REG_MULTI_SZ", L$ = "REG_EXPAND_SZ", U$ = "REG_DWORD", M$ = "REG_QWORD", x$ = "REG_BINARY", q$ = "REG_NONE", B$ = [F$, j$, L$, U$, M$, x$, q$], gB = "", vB = /(\\[a-zA-Z0-9_\s]+)*/, _B = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, V$ = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function Ri(e, t) {
  if (!(this instanceof Ri))
    return new Ri(e, t);
  Error.captureStackTrace(this, Ri), this.__defineGetter__("name", function() {
    return Ri.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
sh.inherits(Ri, Error);
function bn(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function Pn(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), s = sh.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new Ri(s, t);
}
function $B(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function Tn(e, t) {
  t && e.push("/reg:" + $B(t));
}
function An() {
  return process.platform === "win32" ? yB.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function uo(e, t, r, n, i, s, o) {
  if (!(this instanceof uo))
    return new uo(e, t, r, n, i, s, o);
  var a = e, c = t, u = r, l = n, f = i, h = s, p = o;
  this.__defineGetter__("host", function() {
    return a;
  }), this.__defineGetter__("hive", function() {
    return c;
  }), this.__defineGetter__("key", function() {
    return u;
  }), this.__defineGetter__("name", function() {
    return l;
  }), this.__defineGetter__("type", function() {
    return f;
  }), this.__defineGetter__("value", function() {
    return h;
  }), this.__defineGetter__("arch", function() {
    return p;
  });
}
sh.inherits(uo, Object);
function $e(e) {
  if (!(this instanceof $e))
    return new $e(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || oh), i = "" + (t.key || ""), s = t.arch || null;
  if (this.__defineGetter__("host", function() {
    return r;
  }), this.__defineGetter__("hive", function() {
    return n;
  }), this.__defineGetter__("key", function() {
    return i;
  }), this.__defineGetter__("path", function() {
    return '"' + (r.length == 0 ? "" : "\\\\" + r + "\\") + n + i + '"';
  }), this.__defineGetter__("arch", function() {
    return s;
  }), this.__defineGetter__("parent", function() {
    var o = i.lastIndexOf("\\");
    return new $e({
      host: this.host,
      hive: this.hive,
      key: o == -1 ? "" : i.substring(0, o),
      arch: this.arch
    });
  }), D$.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!vB.test(i))
    throw new Error("illegal key specified.");
  if (s && s != "x64" && s != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
$e.HKLM = oh;
$e.HKCU = R$;
$e.HKCR = I$;
$e.HKU = C$;
$e.HKCC = k$;
$e.HIVES = D$;
$e.REG_SZ = F$;
$e.REG_MULTI_SZ = j$;
$e.REG_EXPAND_SZ = L$;
$e.REG_DWORD = U$;
$e.REG_QWORD = M$;
$e.REG_BINARY = x$;
$e.REG_NONE = q$;
$e.REG_TYPES = B$;
$e.DEFAULT_VALUE = gB;
$e.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Tn(r, this.arch);
  var n = Sn(An(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", s = this, o = null, a = bn(n);
  return n.on("close", function(c) {
    if (!o)
      if (c !== 0)
        t(Pn("QUERY", c, a), null);
      else {
        for (var u = [], l = [], f = i.split(`
`), h = 0, p = 0, g = f.length; p < g; p++) {
          var $ = f[p].trim();
          $.length > 0 && (h != 0 && u.push($), ++h);
        }
        for (var p = 0, g = u.length; p < g; p++) {
          var _ = V$.exec(u[p]), m, E, T;
          _ && (m = _[1].trim(), E = _[2].trim(), T = _[3], l.push(new uo(s.host, s.hive, s.key, m, E, T, s.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
$e.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Tn(r, this.arch);
  var n = Sn(An(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", s = this, o = null, a = bn(n);
  return n.on("close", function(c) {
    o || c !== 0 && t(Pn("QUERY", c, a), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], u = [], l = i.split(`
`), f = 0, h = l.length; f < h; f++) {
      var p = l[f].trim();
      p.length > 0 && c.push(p);
    }
    for (var f = 0, h = c.length; f < h; f++) {
      var g = _B.exec(c[f]), $;
      g && (g[1], $ = g[2], $ && $ !== s.key && u.push(new $e({
        host: s.host,
        hive: s.hive,
        key: $,
        arch: s.arch
      })));
    }
    t(null, u);
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
$e.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), Tn(n, this.arch);
  var i = Sn(An(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = "", o = this, a = null, c = bn(i);
  return i.on("close", function(u) {
    if (!a)
      if (u !== 0)
        r(Pn("QUERY", u, c), null);
      else {
        for (var l = [], f = null, h = s.split(`
`), p = 0, g = 0, $ = h.length; g < $; g++) {
          var _ = h[g].trim();
          _.length > 0 && (p != 0 && l.push(_), ++p);
        }
        var m = l[l.length - 1] || "", E = V$.exec(m), T, I, F;
        E && (T = E[1].trim(), I = E[2].trim(), F = E[3], f = new uo(o.host, o.hive, o.key, T, I, F, o.arch)), r(null, f);
      }
  }), i.stdout.on("data", function(u) {
    s += u.toString();
  }), i.on("error", function(u) {
    a = u, r(u);
  }), this;
};
$e.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (B$.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var s = ["ADD", this.path];
  t == "" ? s.push("/ve") : s = s.concat(["/v", t]), s = s.concat(["/t", r, "/d", n, "/f"]), Tn(s, this.arch);
  var o = Sn(An(), s, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = null, c = bn(o);
  return o.on("close", function(u) {
    a || i(u !== 0 ? Pn("ADD", u, c) : null);
  }), o.stdout.on("data", function(u) {
  }), o.on("error", function(u) {
    a = u, i(u);
  }), this;
};
$e.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  Tn(n, this.arch);
  var i = Sn(An(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, o = bn(i);
  return i.on("close", function(a) {
    s || (a !== 0 ? r(Pn("DELETE", a, o), null) : r(null));
  }), i.stdout.on("data", function(a) {
  }), i.on("error", function(a) {
    s = a, r(a);
  }), this;
};
$e.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  Tn(r, this.arch);
  var n = Sn(An(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = bn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Pn("DELETE", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
$e.prototype.erase = $e.prototype.clear;
$e.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  Tn(r, this.arch);
  var n = Sn(An(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = bn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Pn("DELETE", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
$e.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  Tn(r, this.arch);
  var n = Sn(An(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = bn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Pn("ADD", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
$e.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
$e.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var wB = $e;
const zy = /* @__PURE__ */ ic(wB), _e = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Unreallife launcher",
    version: "1.0.0"
  },
  servers: [
    {
      id: "1",
      name: "UnrealLife",
      ip: "91.134.62.7",
      port: 2302,
      queryPort: 2303,
      maxSlots: 64,
      isDefault: !0
    }
  ],
  mods: {
    folderName: "@Arma",
    urlMods: "http://188.165.227.197:8080/mods",
    urlRessources: "http://188.165.227.197:8080/ressources",
    manifestUrl: "http://188.165.227.197:8080/mods/manifest.json"
  },
  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "http://188.165.227.197:8080/news/news.json",
    refreshInterval: 3e5
    // 5 minutes
  },
  // 🔗 Liens utiles
  links: {
    principal: [
      {
        title: "Site Web Officiel",
        description: "Accédez au site web du serveur",
        url: "https://unreallife.fr/",
        icon: "🌐"
      },
      {
        title: "Intranet",
        description: "Gérer votre compte et vos informations",
        url: "https://intranet.unreallife.fr/",
        icon: "🌐"
      }
    ],
    communaute: [
      {
        title: "Discord",
        description: "Rejoignez notre serveur Discord",
        url: "https://discord.gg/SRMgZRPrqg",
        icon: "💬"
      }
    ],
    communication: [
      {
        title: "TeamSpeak 3",
        description: "Serveur vocal pour la communication en jeu",
        url: "ts3server://ts3.unreallife.fr",
        icon: "🎤"
      },
      {
        title: "Guide TFAR",
        description: "Guide d'utilisation de Task Force Arrowhead Radio",
        url: "https://discord.com/channels/791056321596227595/1410997569877839956",
        icon: "📡"
      }
    ],
    information: [
      {
        title: "Règlement",
        description: "Règles et conditions d'utilisation du serveur",
        url: "https://discord.com/channels/791056321596227595/1427012155504464054",
        icon: "📋"
      }
    ],
    support: [
      {
        title: "Ticket Support",
        description: "Créer un ticket de support",
        url: "https://discord.com/channels/791056321596227595/1299421761644793917",
        icon: "🎫"
      },
      {
        title: "FAQ",
        description: "Questions fréquemment posées",
        url: "https://discord.com/channels/791056321596227595/791361882870513674",
        icon: "❓"
      }
    ]
  },
  // 🔧 Mode maintenance
  maintenance: !1,
  // ⚡ Optimisations
  performance: {
    chunkSize: 1024 * 1024,
    // 1MB chunks pour téléchargement
    concurrentDownloads: 3,
    // 3 téléchargements simultanés
    quickCheckSampleSize: 5
    // Vérifier seulement 5 fichiers au démarrage
  },
  // 🎨 Personnalisation UI
  ui: {
    primaryColor: "#ff6b35",
    // Orange Arma 3
    secondaryColor: "#dc2626",
    // Rouge Arma 3
    accentColor: "#10b981",
    // Vert succès
    particleCount: 30,
    animationDuration: 300
  }
};
async function EB(e) {
  return new Promise((t, r) => {
    const n = xn.createHash("sha256"), i = se.createReadStream(e);
    i.on("data", (s) => n.update(s)), i.on("end", () => t(n.digest("hex"))), i.on("error", r);
  });
}
async function H$(e, t, r, n, i = 3) {
  var a;
  const s = `${t}.partial`;
  await se.ensureDir(X.dirname(t));
  let o = 0;
  for (; ; )
    try {
      const c = await se.pathExists(s) ? (await se.stat(s)).size : 0, u = {};
      c > 0 && (u.Range = `bytes=${c}-`);
      const l = await fetch(e, { headers: u });
      if (!l.ok && l.status !== 206)
        throw new Error(`HTTP ${l.status}`);
      const f = l.status === 206, h = l.headers.get("content-length") || "0", p = parseInt(h, 10) || 0, g = f ? c + p : p, $ = await se.open(s, f ? "a" : "w");
      try {
        const _ = (a = l.body) == null ? void 0 : a.getReader();
        if (!_) throw new Error("No readable stream from response.body");
        let m = c;
        for (; ; ) {
          const { done: E, value: T } = await _.read();
          if (E) break;
          T && (await se.write($, Buffer.from(T)), m += T.length, r && g > 0 && r({
            downloadedBytes: m,
            totalBytes: g,
            percent: Math.max(0, Math.min(100, m / g * 100))
          }));
        }
      } finally {
        await se.close($);
      }
      if (n && (await EB(s)).toLowerCase() !== n.toLowerCase())
        throw await se.remove(s), new Error("SHA256 mismatch");
      await se.move(s, t, { overwrite: !0 });
      return;
    } catch (c) {
      if (o += 1, o >= i)
        throw c;
      await rE(500 * o);
    }
}
class G$ {
  constructor(t, r) {
    pt(this, "manifestUrl");
    pt(this, "localManifestPath");
    this.manifestUrl = t, this.localManifestPath = X.join(r, "manifest.json");
  }
  /**
   * Télécharge le manifest serveur (très rapide, ~1-5KB)
   */
  async fetchServerManifest() {
    try {
      const t = await fetch(this.manifestUrl);
      return t.ok ? await t.json() : null;
    } catch (t) {
      return console.error("Erreur fetch manifest:", t), null;
    }
  }
  /**
   * Lit le manifest local s'il existe
   */
  async getLocalManifest() {
    try {
      if (await se.pathExists(this.localManifestPath))
        return await se.readJson(this.localManifestPath);
    } catch (t) {
      console.error("Erreur lecture manifest local:", t);
    }
    return null;
  }
  /**
   * Sauvegarde le manifest local
   */
  async saveLocalManifest(t) {
    await se.ensureDir(X.dirname(this.localManifestPath)), await se.writeJson(this.localManifestPath, t, { spaces: 2 });
  }
  /**
   * Compare les manifests et retourne seulement les fichiers à télécharger
   * TRÈS RAPIDE - Compare seulement hash + size + lastModified
   */
  async calculateDelta(t) {
    const r = await this.fetchServerManifest(), n = await this.getLocalManifest();
    if (!r)
      throw new Error("Impossible de récupérer le manifest serveur");
    const i = [], s = [];
    let o = 0;
    const a = !n;
    a && console.log("🔍 Première utilisation : scan du dossier local...");
    for (const c of r.files) {
      const u = n == null ? void 0 : n.files.find((g) => g.name === c.name), l = X.join(t, c.name), f = await se.pathExists(l);
      let h = !1, p = "";
      if (!f)
        h = !0, p = u ? "fichier manquant" : "nouveau";
      else if (!u && a)
        console.log(`   🔍 Vérification de ${c.name}...`), (await se.stat(l)).size !== c.size ? (h = !0, p = "taille différente") : await this.calculateFileHash(l) !== c.hash ? (h = !0, p = "hash différent") : console.log(`   ✅ ${c.name} - déjà à jour`);
      else if (u) {
        const g = u.hash !== c.hash, $ = u.lastModified !== c.lastModified;
        (g || $) && (h = !0, p = g ? "hash différent" : "modifié");
      }
      h && (console.log(`   📥 ${c.name} - ${p}`), i.push(c), o += c.size);
    }
    if (n)
      for (const c of n.files)
        r.files.find((l) => l.name === c.name) || (console.log(`   🗑️ ${c.name} - supprimé du serveur`), s.push(c.name));
    else
      try {
        if (await se.pathExists(t)) {
          const c = await se.readdir(t);
          for (const u of c) {
            if (u.startsWith(".") || u === "manifest.json") continue;
            const l = X.join(t, u);
            (await se.stat(l)).isFile() && (r.files.find((p) => p.name === u) || (console.log(`   🗑️ ${u} - fichier orphelin (pas dans le manifest serveur)`), s.push(u)));
          }
        }
      } catch (c) {
        console.error("Erreur lors du scan des fichiers orphelins:", c);
      }
    return console.log(`📊 Résultat: ${i.length} à télécharger, ${s.length} à supprimer`), { toDownload: i, toDelete: s, totalDownloadSize: o };
  }
  /**
   * Vérification rapide par sampling (vérifie seulement quelques fichiers)
   * Utile pour un check rapide au démarrage
   */
  async quickIntegrityCheck(t, r = 5) {
    const n = await this.getLocalManifest();
    if (!n) return !1;
    const i = n.files.sort(() => 0.5 - Math.random()).slice(0, Math.min(r, n.files.length));
    for (const s of i) {
      const o = X.join(t, s.name);
      if (!await se.pathExists(o) || (await se.stat(o)).size !== s.size || await this.calculateFileHash(o) !== s.hash) return !1;
    }
    return !0;
  }
  /**
   * Hash rapide avec streaming pour les gros fichiers
   */
  async calculateFileHash(t) {
    return new Promise((r, n) => {
      const i = xn.createHash("sha256"), s = se.createReadStream(t, { highWaterMark: 64 * 1024 });
      s.on("data", (o) => i.update(o)), s.on("end", () => r(i.digest("hex"))), s.on("error", n);
    });
  }
}
class SB {
  constructor(t, r) {
    pt(this, "newsUrl");
    pt(this, "localNewsPath");
    this.newsUrl = t, this.localNewsPath = X.join(r, "news.json");
  }
  /**
  * Récupérer les actualités depuis le serveur
  */
  async fetchNews() {
    if (!this.newsUrl || this.newsUrl.trim() === "")
      return null;
    try {
      const t = await fetch(this.newsUrl);
      if (!t.ok) return null;
      const r = t.headers.get("content-type");
      if (!r || !r.includes("application/json"))
        return console.log("URL news ne retourne pas du JSON, actualités désactivées"), null;
      const n = await t.json();
      let i = [];
      if (Array.isArray(n))
        i = n;
      else if (n.items && Array.isArray(n.items))
        i = n.items;
      else
        return console.log("Format de données news non reconnu"), null;
      const s = i.map((c) => ({
        ...c,
        publishedAt: c.publishedAt || c.timestamp || Date.now()
      })), o = Date.now(), a = s.filter(
        (c) => !c.expiresAt || c.expiresAt > o
      );
      return {
        version: n.version || "1.0.0",
        lastUpdated: n.lastUpdated || Date.now(),
        items: a
      };
    } catch (t) {
      return console.error("Erreur fetch news:", t), null;
    }
  }
  /**
   * Sauvegarder les actualités localement
   */
  async saveLocalNews(t) {
    await se.ensureDir(X.dirname(this.localNewsPath)), await se.writeJson(this.localNewsPath, t, { spaces: 2 });
  }
  /**
   * Lire les actualités locales
   */
  async getLocalNews() {
    try {
      if (await se.pathExists(this.localNewsPath))
        return await se.readJson(this.localNewsPath);
    } catch (t) {
      console.error("Erreur lecture news locales:", t);
    }
    return null;
  }
  /**
   * Obtenir les actualités avec fallback local
   */
  async getNews() {
    const t = await this.fetchNews();
    if (t)
      return await this.saveLocalNews(t), this.sortNewsByPriority(t.items);
    const r = await this.getLocalNews();
    return r ? this.sortNewsByPriority(r.items) : this.getDefaultNews();
  }
  /**
   * Trier les actualités par priorité et date
   */
  sortNewsByPriority(t) {
    const r = { critical: 4, high: 3, medium: 2, low: 1 };
    return t.sort((n, i) => {
      const s = (r[i.priority] || 1) - (r[n.priority] || 1);
      return s !== 0 ? s : i.publishedAt - n.publishedAt;
    });
  }
  /**
   * Actualités par défaut
   */
  getDefaultNews() {
    return [
      {
        id: "welcome",
        title: "Bienvenue sur Arma RP",
        content: "Merci d'avoir installé le launcher ! Assurez-vous d'avoir Arma 3 installé et rejoignez-nous sur le serveur.",
        author: "Équipe Arma",
        type: "info",
        priority: "medium",
        publishedAt: Date.now(),
        tags: ["bienvenue", "info"]
      }
    ];
  }
  /**
   * Obtenir les actualités critiques (maintenance, urgence)
   */
  async getCriticalNews() {
    return (await this.getNews()).filter((r) => r.priority === "critical");
  }
}
var As = {}, Vc = {}, ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
ko.PromiseSocket = void 0;
const bB = nE;
class PB {
  constructor(t, r) {
    if (this._attempts = t, this._timeout = r, Array.isArray(this._timeout) && this._attempts !== this._timeout.length)
      throw new Error(`Number of attempts (${this._attempts}) does not match the length of the timeout array (${this._timeout.length})`);
    this._socket = (0, bB.createSocket)("udp4");
  }
  async send(t, r, n) {
    return new Promise(async (i, s) => {
      for (let o = 0; o < this._attempts; o++) {
        let a;
        Array.isArray(this._timeout) ? a = this._timeout[o] : a = this._timeout;
        try {
          const c = await this._socketSend(t, r, n, a);
          return i(c);
        } catch (c) {
          if (o === this._attempts - 1)
            return s(c);
        }
      }
    });
  }
  closeSocket() {
    this._socket.close();
  }
  _socketSend(t, r, n, i) {
    return new Promise((s, o) => {
      this._socket.send(t, n, r, (a) => {
        if (a)
          return o(typeof a == "string" ? new Error(a) : a);
        const c = (f) => (this._socket.removeListener("message", c), this._socket.removeListener("error", u), clearTimeout(l), s(f)), u = (f) => (clearTimeout(l), o(f)), l = setTimeout(() => (this._socket.removeListener("message", c), this._socket.removeListener("error", u), o("Timeout reached. Possible reasons: You are being rate limited; Timeout too short; Wrong server host configured;")), i);
        this._socket.on("message", c), this._socket.on("error", u);
      });
    });
  }
}
ko.PromiseSocket = PB;
Object.defineProperty(Vc, "__esModule", { value: !0 });
Vc.queryMasterServer = void 0;
const TB = ko, Gl = "0.0.0.0:0", AB = Buffer.from([255, 255, 255, 255, 102, 10]);
async function NB(e, t, r = {}, n = 1e3, i) {
  const s = e.split(":"), o = s[0], a = parseInt(s[1]);
  return await new OB(o, a, t, r, n, i).fetchServers();
}
Vc.queryMasterServer = NB;
class OB {
  constructor(t, r, n, i, s, o) {
    this._host = t, this._port = r, this._region = n, this._filters = i, this._maxHosts = o, this._seedId = Gl, this._hosts = [], this._promiseSocket = new TB.PromiseSocket(1, s);
  }
  async fetchServers() {
    do {
      let t;
      try {
        t = await this._promiseSocket.send(this._buildPacket(), this._host, this._port);
      } catch (n) {
        throw this._promiseSocket.closeSocket(), new Error(n);
      }
      const r = this._parseBuffer(t);
      if (this._seedId = r[r.length - 1], this._hosts.push(...r), this._maxHosts && this._hosts.length >= this._maxHosts && this._hosts[this._maxHosts - 1] !== Gl)
        return this._promiseSocket.closeSocket(), this._hosts.slice(0, this._maxHosts);
    } while (this._seedId !== Gl);
    return this._promiseSocket.closeSocket(), this._hosts.pop(), this._hosts;
  }
  _buildPacket() {
    return Buffer.concat([
      Buffer.from([49]),
      Buffer.from([this._region]),
      Buffer.from(this._seedId, "ascii"),
      Buffer.from([0]),
      Buffer.from(this.formatFilters(), "ascii")
    ]);
  }
  formatFilters() {
    let t = "";
    for (const r of Object.keys(this._filters)) {
      let n = this._filters[r];
      t += "\\" + r + "\\", r === "nor" || r === "nand" ? t += Object.keys(n).length + this._slashifyObject(n) : Array.isArray(n) ? t += n.join(",") : t += n;
    }
    return t += "\0", t;
  }
  _slashifyObject(t) {
    let r = "";
    for (const n of Object.keys(t)) {
      let i = t[n];
      r += "\\" + n + "\\" + i;
    }
    return r;
  }
  _parseBuffer(t) {
    const r = [];
    t.compare(AB, 0, 6, 0, 6) === 0 && (t = t.slice(6));
    let n = 0;
    for (; n < t.length; ) {
      const i = this._numberToIp(t.readInt32BE(n)), s = t[n + 4] << 8 | t[n + 5];
      r.push(`${i}:${s}`), n += 6;
    }
    return r;
  }
  _numberToIp(t) {
    var r = new ArrayBuffer(4), n = new DataView(r);
    n.setUint32(0, t);
    for (var i = new Array(), s = 0; s < 4; s++)
      i[s] = n.getUint8(s);
    return i.join(".");
  }
}
var z$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.REGIONS = void 0, function(t) {
    t[t.US_EAST_COAST = 0] = "US_EAST_COAST", t[t.US_WEST_COAST = 1] = "US_WEST_COAST", t[t.SOUTH_AMERICA = 2] = "SOUTH_AMERICA", t[t.EUROPE = 3] = "EUROPE", t[t.ASIA = 4] = "ASIA", t[t.AUSTRALIA = 5] = "AUSTRALIA", t[t.MIDDLE_EAST = 6] = "MIDDLE_EAST", t[t.AFRICA = 7] = "AFRICA", t[t.ALL = 255] = "ALL";
  }(e.REGIONS || (e.REGIONS = {}));
})(z$);
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.queryGameServerRules = pn.queryGameServerPlayer = pn.queryGameServerInfo = void 0;
const RB = ko;
async function IB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ah(i, s, t, r).info();
}
pn.queryGameServerInfo = IB;
async function CB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ah(i, s, t, r).player();
}
pn.queryGameServerPlayer = CB;
async function kB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ah(i, s, t, r).rules();
}
pn.queryGameServerRules = kB;
class ah {
  constructor(t, r, n, i) {
    this._host = t, this._port = r, this._promiseSocket = new RB.PromiseSocket(n, i);
  }
  async info() {
    let t;
    try {
      t = await this._promiseSocket.send(this._buildInfoPacket(), this._host, this._port);
    } catch (n) {
      throw this._promiseSocket.closeSocket(), new Error(n);
    }
    if (this._isChallengeResponse(t)) {
      t = t.slice(5);
      const n = t;
      try {
        t = await this._promiseSocket.send(this._buildInfoPacket(n), this._host, this._port);
      } catch (i) {
        throw this._promiseSocket.closeSocket(), new Error(i);
      }
    }
    return this._promiseSocket.closeSocket(), this._parseInfoBuffer(t);
  }
  async player() {
    let t, r = !1, n = 0;
    do {
      let s;
      try {
        s = await this._promiseSocket.send(this._buildPacket(Buffer.from([85])), this._host, this._port);
      } catch (a) {
        throw this._promiseSocket.closeSocket(), new Error(a);
      }
      const o = s.slice(5);
      try {
        t = await this._promiseSocket.send(this._buildPacket(Buffer.from([85]), o), this._host, this._port);
      } catch (a) {
        throw this._promiseSocket.closeSocket(), new Error(a);
      }
      this._isChallengeResponse(t) || (r = !0), n++;
    } while (!r && n < 5);
    if (this._promiseSocket.closeSocket(), this._isChallengeResponse(t))
      throw new Error("Server kept sending challenge responses.");
    return this._parsePlayerBuffer(t);
  }
  async rules() {
    let t;
    try {
      t = await this._promiseSocket.send(this._buildPacket(Buffer.from([86])), this._host, this._port);
    } catch (s) {
      throw this._promiseSocket.closeSocket(), new Error(s);
    }
    const r = t.slice(5);
    let n;
    try {
      n = await this._promiseSocket.send(this._buildPacket(Buffer.from([86]), r), this._host, this._port);
    } catch (s) {
      throw this._promiseSocket.closeSocket(), new Error(s);
    }
    return this._promiseSocket.closeSocket(), this._parseRulesBuffer(n);
  }
  _buildInfoPacket(t) {
    let r = Buffer.concat([
      Buffer.from([255, 255, 255, 255]),
      Buffer.from([84]),
      Buffer.from("Source Engine Query", "ascii"),
      Buffer.from([0])
    ]);
    return t && (r = Buffer.concat([
      r,
      t
    ])), r;
  }
  _buildPacket(t, r) {
    let n = Buffer.concat([
      Buffer.from([255, 255, 255, 255]),
      t
    ]);
    return r ? n = Buffer.concat([
      n,
      r
    ]) : n = Buffer.concat([
      n,
      Buffer.from([255, 255, 255, 255])
    ]), n;
  }
  _isChallengeResponse(t) {
    return t.compare(Buffer.from([255, 255, 255, 255, 65]), 0, 5, 0, 5) === 0;
  }
  _parseInfoBuffer(t) {
    const r = {};
    if (t = t.slice(5), [r.protocol, t] = this._readUInt8(t), [r.name, t] = this._readString(t), [r.map, t] = this._readString(t), [r.folder, t] = this._readString(t), [r.game, t] = this._readString(t), [r.appId, t] = this._readInt16LE(t), [r.players, t] = this._readUInt8(t), [r.maxPlayers, t] = this._readUInt8(t), [r.bots, t] = this._readUInt8(t), r.serverType = t.subarray(0, 1).toString("utf-8"), t = t.slice(1), r.environment = t.subarray(0, 1).toString("utf-8"), t = t.slice(1), [r.visibility, t] = this._readUInt8(t), [r.vac, t] = this._readUInt8(t), [r.version, t] = this._readString(t), t.length > 1) {
      let n;
      [n, t] = this._readUInt8(t), n & 128 && ([r.port, t] = this._readInt16LE(t)), n & 16 && (t = t.slice(8)), n & 64 && ([r.spectatorPort, t] = this._readUInt8(t), [r.spectatorName, t] = this._readString(t)), n & 32 && ([r.keywords, t] = this._readString(t)), n & 1 && (r.gameId = t.readBigInt64LE(), t = t.slice(8));
    }
    return r;
  }
  _parsePlayerBuffer(t) {
    const r = {};
    t = t.slice(5), [r.playerCount, t] = this._readUInt8(t), r.players = [];
    for (let n = 0; n < r.playerCount; n++) {
      let i;
      [i, t] = this._readPlayer(t), r.players.push(i);
    }
    return r;
  }
  _parseRulesBuffer(t) {
    const r = {};
    t = t.slice(5), [r.ruleCount, t] = this._readInt16LE(t), r.rules = [];
    for (let n = 0; n < r.ruleCount; n++) {
      let i;
      [i, t] = this._readRule(t), r.rules.push(i);
    }
    return r;
  }
  _readString(t) {
    const r = t.indexOf(0), n = t.subarray(0, r), i = t.slice(r + 1);
    return [n.toString("utf-8"), i];
  }
  _readUInt8(t) {
    return [t.readUInt8(), t.slice(1)];
  }
  _readInt16LE(t) {
    return [t.readInt16LE(), t.slice(2)];
  }
  _readPlayer(t) {
    let r = {};
    return [r.index, t] = this._readUInt8(t), [r.name, t] = this._readString(t), r.score = t.readInt32LE(), t = t.slice(4), r.duration = t.readFloatLE(), t = t.slice(4), [r, t];
  }
  _readRule(t) {
    let r = {};
    return [r.name, t] = this._readString(t), [r.value, t] = this._readString(t), [r, t];
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.queryGameServerRules = e.queryGameServerPlayer = e.queryGameServerInfo = e.REGIONS = e.queryMasterServer = void 0;
  var t = Vc;
  Object.defineProperty(e, "queryMasterServer", { enumerable: !0, get: function() {
    return t.queryMasterServer;
  } });
  var r = z$;
  Object.defineProperty(e, "REGIONS", { enumerable: !0, get: function() {
    return r.REGIONS;
  } });
  var n = pn;
  Object.defineProperty(e, "queryGameServerInfo", { enumerable: !0, get: function() {
    return n.queryGameServerInfo;
  } }), Object.defineProperty(e, "queryGameServerPlayer", { enumerable: !0, get: function() {
    return n.queryGameServerPlayer;
  } }), Object.defineProperty(e, "queryGameServerRules", { enumerable: !0, get: function() {
    return n.queryGameServerRules;
  } });
})(As);
class DB {
  constructor() {
    pt(this, "lastServerInfo", null);
    pt(this, "lastQueryTime", 0);
    pt(this, "CACHE_DURATION", 1e4);
    // 10 secondes de cache
    pt(this, "consecutiveErrors", 0);
    pt(this, "lastErrorLogTime", 0);
    pt(this, "ERROR_LOG_INTERVAL", 6e4);
  }
  // Logger les erreurs max 1 fois par minute
  /**
   * Implémentation native du protocole Steam Query A2S_INFO
   * Aucun mot de passe requis - informations publiques
   */
  async getPublicServerInfo() {
    const t = Date.now();
    if (this.lastServerInfo && t - this.lastQueryTime < this.CACHE_DURATION)
      return this.lastServerInfo;
    try {
      const r = Date.now(), n = _e.servers[0].queryPort || _e.servers[0].port, i = `${_e.servers[0].ip}:${n}`;
      this.consecutiveErrors === 0 && console.log(`🔍 Steam Query vers ${i}...`);
      const s = await As.queryGameServerInfo(
        i,
        1,
        15e3
        // Augmenté à 15 secondes
      );
      let o = [];
      try {
        const l = await As.queryGameServerPlayer(
          i,
          1,
          15e3
        );
        o = Array.isArray(l) ? l.map((f) => f == null ? void 0 : f.name).filter(Boolean) : [];
      } catch {
      }
      const a = Date.now() - r, c = {
        playerCount: (s == null ? void 0 : s.players) ?? 0,
        maxPlayers: (s == null ? void 0 : s.maxPlayers) ?? _e.servers[0].maxSlots,
        serverName: (s == null ? void 0 : s.name) ?? _e.servers[0].name,
        map: (s == null ? void 0 : s.map) ?? "",
        gameMode: (s == null ? void 0 : s.game) ?? "",
        ping: a,
        isOnline: !0,
        version: (s == null ? void 0 : s.version) ?? "Unknown",
        playerList: o
      };
      this.lastServerInfo = c, this.lastQueryTime = t;
      const u = this.consecutiveErrors > 0;
      return this.consecutiveErrors = 0, u && console.log(`✅ Steam Query reconnecté: ${c.playerCount}/${c.maxPlayers} joueurs, ${a}ms`), c;
    } catch {
      this.consecutiveErrors++, t - this.lastErrorLogTime > this.ERROR_LOG_INTERVAL && (console.warn(`⚠️ Steam Query indisponible (${this.consecutiveErrors} échecs) - Le serveur est peut-être hors ligne ou le port ${_e.servers[0].queryPort} n'est pas ouvert`), this.lastErrorLogTime = t);
      const i = {
        playerCount: 0,
        maxPlayers: 0,
        serverName: "",
        map: "",
        gameMode: "",
        ping: 0,
        isOnline: !1,
        version: "",
        playerList: []
      };
      return this.lastServerInfo = i, this.lastQueryTime = t, i;
    }
  }
  // Les implémentations UDP natives sont remplacées par la librairie steam-server-query
  /**
   * Ping simple du serveur
   */
  async pingServer() {
    try {
      const t = Date.now(), r = _e.servers[0].queryPort || _e.servers[0].port, n = `${_e.servers[0].ip}:${r}`;
      return await As.queryGameServerInfo(
        n,
        1,
        15e3
      ), { online: !0, ping: Date.now() - t };
    } catch {
      return { online: !1, ping: 0 };
    }
  }
  /**
   * Vérifier si le serveur est en ligne
   */
  async isServerOnline() {
    return (await this.pingServer()).online;
  }
  /**
   * Obtenir seulement le nombre de joueurs (requête très rapide)
   */
  async getPlayerCount() {
    try {
      const t = _e.servers[0].queryPort || _e.servers[0].port, r = `${_e.servers[0].ip}:${t}`, n = await As.queryGameServerInfo(
        r,
        1,
        15e3
      );
      return {
        count: (n == null ? void 0 : n.players) ?? 0,
        max: (n == null ? void 0 : n.maxPlayers) ?? _e.servers[0].maxSlots
      };
    } catch {
      return { count: 0, max: _e.servers[0].maxSlots };
    }
  }
}
const Ut = new mB({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
});
let jn = null, ga = null;
async function FB() {
  return new Promise((e) => {
    new zy({
      hive: zy.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function jB(e) {
  return se.existsSync(`${e}\\${_e.mods.folderName}`);
}
async function LB(e) {
  return await se.pathExists(`${e}\\arma3.exe`);
}
function pe(e, t, r, n, i, s, o) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: s,
    timeRemaining: o
  });
}
function UB(e) {
  ga = new DB(), console.log(`✅ Steam Query activé pour ${_e.servers[0].ip}:${_e.servers[0].queryPort}`), setInterval(async () => {
    try {
      const r = await ga.getPublicServerInfo();
      r.isOnline ? pe(e, "server-info-update", JSON.stringify({
        playerCount: r.playerCount,
        maxPlayers: r.maxPlayers,
        serverName: r.serverName,
        map: r.map,
        gameMode: r.gameMode,
        ping: r.ping,
        isOnline: !0,
        fps: 0,
        // Pas disponible via Steam Query
        uptime: "0:00:00",
        // Pas disponible via Steam Query
        playerList: r.playerList
      })) : pe(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    } catch {
      pe(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    }
  }, 3e4);
  const t = X.join(process.env.APPDATA || process.env.HOME || "", "arma3-data");
  jn = new SB(_e.news.url, t), e.webContents.on("did-finish-load", async () => {
    let r = Ut.get("arma3Path");
    const n = Ut.get("firstLaunch");
    try {
      if (jn) {
        const i = await jn.getNews();
        console.log(`✅ ${i.length} actualités chargées`);
      }
    } catch (i) {
      console.error("Erreur lors du chargement des actualités:", i);
    }
    if ((!r || r === "null") && (r = await FB(), r && Ut.set("arma3Path", r)), r && r !== "null") {
      const i = jB(r);
      pe(
        e,
        i ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        i ? void 0 : `Mod ${_e.mods.folderName} non installé`
      ), n && (pe(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), Ut.set("firstLaunch", !1)), await MB(e);
    } else
      Ut.set("arma3Path", null), pe(e, "arma3Path-not-loaded");
    await zl(e);
  }), jt.on("locate-arma3", async () => {
    try {
      const r = await Yw.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!r.canceled && r.filePaths.length > 0) {
        const n = r.filePaths[0];
        await LB(n) ? (Ut.set("arma3Path", n), pe(e, "arma3Path-ready", "Arma 3 trouvé"), await zl(e)) : pe(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (r) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", r), pe(
        e,
        "arma3Path-error",
        void 0,
        r instanceof Error ? r.message : "Erreur inconnue"
      );
    }
  }), jt.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée"), await zl(e);
  }), jt.on("download-mods", async () => {
    const r = Ut.get("arma3Path");
    if (!r) {
      pe(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    const n = `${r}\\${_e.mods.folderName}`, i = `${n}\\addons`;
    try {
      await se.ensureDir(i), pe(e, "download-start");
      const s = new G$(_e.mods.manifestUrl, n), o = await s.calculateDelta(i);
      if (o.toDelete.length > 0) {
        console.log(`🗑️ Suppression de ${o.toDelete.length} fichier(s) orphelin(s)...`), pe(e, "cleanup-start", `Nettoyage de ${o.toDelete.length} fichier(s) obsolète(s)...`);
        let h = 0;
        for (const p of o.toDelete) {
          const g = X.join(i, p);
          try {
            await se.pathExists(g) && (await se.remove(g), h++, console.log(`   ✅ Supprimé: ${p}`));
          } catch ($) {
            console.error(`   ❌ Erreur suppression ${p}:`, $);
          }
        }
        h > 0 && pe(e, "cleanup-complete", `${h} fichier(s) supprimé(s) avec succès`);
      }
      if (o.toDownload.length === 0) {
        pe(e, "download-complete", "Mods déjà à jour");
        return;
      }
      const a = o.totalDownloadSize;
      let c = 0;
      const u = Date.now();
      let l = 0;
      for (const h of o.toDownload) {
        const p = X.join(i, h.name);
        let g = 0;
        await H$(
          `${_e.mods.urlMods}/${h.name}`,
          p,
          ($) => {
            const _ = Math.floor((h.size || 0) * ($.percent / 100)), m = Math.max(0, _ - g);
            g = _, c = Math.min(a, c + m);
            const E = (Date.now() - u) / 1e3, T = c / Math.max(E, 1e-3), I = Math.max(0, a - c), F = Math.round(I / Math.max(T, 1)), H = Math.floor(F / 60), z = Math.round(F % 60), he = `${H}m ${z}s`, R = a > 0 ? Math.round(c / a * 100) : 0, Q = Math.round($.percent);
            Date.now() - l > 1e3 && (pe(
              e,
              "download-progress",
              R.toString(),
              void 0,
              h.name,
              Q.toString(),
              he
            ), l = Date.now());
          },
          h.hash
        );
      }
      const f = await s.fetchServerManifest();
      f && await s.saveLocalManifest(f), pe(e, "download-complete", "Mods synchronisés avec succès"), pe(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (s) {
      console.error("Erreur lors de la synchronisation des mods:", s), pe(
        e,
        "download-error",
        void 0,
        s instanceof Error ? s.message : "Erreur inconnue"
      );
    }
  }), jt.handle("get-arma3-path", async () => {
    const r = Ut.get("arma3Path");
    return r || null;
  }), jt.handle("launch-game", async () => {
    const r = Ut.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const s = process.arch === "x64", o = s ? "arma3_x64.exe" : "arma3.exe", a = s ? n : i, c = X.join(r, o);
    if (!se.existsSync(c)) {
      pe(e, "launch-game-error", void 0, `Impossible de trouver ${o}`);
      return;
    }
    Oh(c, [a]), pe(e, "launch-game-success", "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), jt.handle("connect-server", async () => {
    const r = Ut.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const s = process.arch === "x64", o = s ? "arma3_x64.exe" : "arma3.exe", a = s ? n : i, c = X.join(r, o);
    if (!se.existsSync(c)) {
      pe(e, "launch-game-error", void 0, `Impossible de trouver ${o}`);
      return;
    }
    const u = `-connect=${_e.servers[0].ip} -port=${_e.servers[0].port}`;
    Oh(c, [`${a} ${u}`]), pe(e, "launch-game-success", "Jeu lancé — connexion au serveur en cours"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), jt.handle("get-news", async () => {
    if (!jn) return [];
    try {
      return await jn.getNews();
    } catch (r) {
      return console.error("Erreur récupération actualités:", r), [];
    }
  }), jt.handle("get-critical-news", async () => {
    if (!jn) return [];
    try {
      return await jn.getCriticalNews();
    } catch (r) {
      return console.error("Erreur récupération actualités critiques:", r), [];
    }
  }), jt.handle("get-server-info", async () => {
    if (ga)
      try {
        const r = await ga.getPublicServerInfo();
        return {
          playerCount: r.playerCount,
          maxPlayers: r.maxPlayers,
          serverName: r.serverName,
          map: r.map,
          gameMode: r.gameMode,
          ping: r.ping,
          isOnline: r.isOnline,
          fps: 0,
          // Pas disponible via Steam Query
          uptime: "0:00:00",
          // Pas disponible via Steam Query
          playerList: r.playerList
        };
      } catch (r) {
        console.error("Erreur Steam Query:", r);
      }
    return null;
  }), jt.handle("install-tfar", async () => {
    const r = Ut.get("arma3Path");
    if (!r)
      return pe(e, "tfar-install-error", void 0, "Chemin Arma 3 non trouvé"), { ok: !1 };
    try {
      pe(e, "tfar-install-start", "Installation du plugin TFAR...");
      const n = [
        X.join(r, _e.mods.folderName, "task_force_radio")
      ], i = [
        X.join(r, _e.mods.folderName, "task_force_radio")
      ];
      for (const l of i)
        if (await se.pathExists(l)) {
          const h = (await se.readdir(l)).find((p) => p.toLowerCase().endsWith(".ts3_plugin"));
          if (h) {
            const p = X.join(l, h), g = await Ah.openPath(p);
            return g ? (pe(e, "tfar-install-error", void 0, g), { ok: !1 }) : (pe(e, "tfar-install-success", "TFAR installé via le paquet .ts3_plugin"), { ok: !0 });
          }
        }
      let s = null;
      for (const l of n)
        if (await se.pathExists(l)) {
          s = l;
          break;
        }
      if (!s)
        return pe(e, "tfar-install-error", void 0, "Fichiers TFAR introuvables (teamspeak/plugins)"), { ok: !1 };
      const o = process.env.APPDATA || null;
      if (!o)
        return pe(e, "tfar-install-error", void 0, "Variable APPDATA introuvable"), { ok: !1 };
      const a = X.join(o, "TS3Client", "plugins");
      await se.ensureDir(a);
      const u = (await se.readdir(s)).filter((l) => /\.dll$/i.test(l));
      if (u.length === 0)
        return pe(e, "tfar-install-error", void 0, "Aucun fichier plugin .dll trouvé pour TFAR"), { ok: !1 };
      for (const l of u)
        await se.copy(X.join(s, l), X.join(a, l), { overwrite: !0 });
      return pe(e, "tfar-install-success", "Plugin TFAR installé dans TeamSpeak"), { ok: !0 };
    } catch (n) {
      return console.error("Erreur installation TFAR:", n), pe(
        e,
        "tfar-install-error",
        void 0,
        n instanceof Error ? n.message : "Erreur inconnue"
      ), { ok: !1 };
    }
  }), jt.handle("open-url", async (r, n) => {
    Ah.openExternal(n);
  }), jt.on("close-app", () => {
    e.close();
  }), jt.on("minimize-app", () => {
    e.minimize();
  });
}
async function zl(e) {
  const t = Ut.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${_e.mods.folderName}`, n = `${r}\\addons`;
  try {
    await se.ensureDir(n);
    const i = new G$(_e.mods.manifestUrl, r), s = await i.calculateDelta(n);
    if (s.toDelete.length > 0) {
      console.log(`🗑️ Suppression de ${s.toDelete.length} fichier(s) orphelin(s)...`), pe(e, "cleanup-start", `Nettoyage de ${s.toDelete.length} fichier(s) obsolète(s)...`);
      let c = 0;
      for (const u of s.toDelete) {
        const l = X.join(n, u);
        try {
          await se.pathExists(l) && (await se.remove(l), c++, console.log(`   ✅ Supprimé: ${u}`));
        } catch (f) {
          console.error(`   ❌ Erreur suppression ${u}:`, f);
        }
      }
      c > 0 && pe(e, "cleanup-complete", `${c} fichier(s) supprimé(s) avec succès`);
    }
    const o = await i.fetchServerManifest();
    if ((!o || o.files.length === 0) && s.toDownload.length === 0) {
      const c = X.join(r, "manifest.json");
      return await se.pathExists(c) && await se.remove(c), pe(e, "mods-check-complete", "Aucun mod requis - synchronisé"), !0;
    }
    if (s.toDownload.length === 0 && s.toDelete.length === 0) {
      if (await i.quickIntegrityCheck(
        n,
        _e.performance.quickCheckSampleSize
      ))
        return pe(e, "mods-check-complete", "Mods à jour"), !0;
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
    }
    if (!_e.maintenance) {
      if (s.toDownload.length > 0) {
        const c = (s.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
        pe(
          e,
          "updateMod-needed",
          `${s.toDownload.length} fichier(s) à synchroniser (${c} GB)`
        );
      }
    }
    return !0;
  } catch (i) {
    return console.error("Erreur lors de la vérification des mods:", i), pe(e, "mods-check-error", void 0, "Erreur de vérification"), !1;
  }
}
async function MB(e) {
  console.log("Synchronisation des ressources serveur");
  const t = Ut.get("arma3Path");
  if (!t) return;
  console.log(t);
  const r = _e.mods.urlRessources;
  if (r.trim() !== "") {
    console.log(r);
    try {
      const n = [
        `${r.replace(/\/$/, "")}/index.json`,
        `${r.replace(/\/$/, "")}/list.json`
      ];
      let i = null;
      for (const a of n)
        try {
          const c = await fetch(a);
          if (c.ok) {
            const u = await c.json();
            if (Array.isArray(u)) {
              i = u;
              break;
            }
          }
        } catch {
        }
      if (!i) {
        const a = [
          r.replace(/\/$/, "/"),
          `${r.replace(/\/$/, "")}/addons/`
        ], c = /* @__PURE__ */ new Set(), u = [], l = [];
        for (const p of a)
          try {
            const g = new URL(p), $ = g.toString().endsWith("/") ? g.toString() : `${g.toString()}/`;
            u.push($);
          } catch {
          }
        const f = (() => {
          try {
            return new URL(r).origin;
          } catch {
            return null;
          }
        })(), h = (() => {
          try {
            return new URL(r).pathname;
          } catch {
            return "/";
          }
        })();
        for (; u.length > 0; ) {
          const p = u.shift();
          if (!c.has(p)) {
            c.add(p);
            try {
              const g = await fetch(p);
              if (!g.ok) continue;
              const $ = await g.text(), _ = /href\s*=\s*"([^"]+)"/gi;
              let m;
              for (; (m = _.exec($)) !== null; ) {
                const E = m[1];
                if (!E || E === "../") continue;
                let T;
                try {
                  T = new URL(E, p).toString();
                } catch {
                  continue;
                }
                try {
                  const I = new URL(T);
                  if (f && I.origin !== f || !I.pathname.startsWith(h)) continue;
                  if (I.pathname.endsWith("/"))
                    c.has(I.toString()) || u.push(I.toString());
                  else {
                    const F = I.pathname.toLowerCase();
                    (F.endsWith(".dll") || F.endsWith(".ts3_plugin")) && (l.includes(I.toString()) || l.push(I.toString()));
                  }
                } catch {
                }
              }
            } catch {
            }
          }
        }
        if (l.length > 0)
          i = l;
        else
          return;
      }
      const s = X.join(t, _e.mods.folderName), o = X.join(s, "task_force_radio");
      await se.ensureDir(s), await se.ensureDir(o);
      for (const a of i) {
        const c = typeof a == "string" ? a : a == null ? void 0 : a.name, u = typeof a == "object" && a ? a.hash : void 0;
        if (!c || typeof c != "string") continue;
        const l = c.toLowerCase(), f = X.basename(c), h = r.replace(/\/$/, ""), p = c.startsWith("http") ? c : `${h}/${c.replace(/^\//, "")}`;
        let g = null;
        if (l.endsWith(".dll"))
          g = X.join(s, f);
        else if (l.endsWith(".ts3_plugin"))
          g = X.join(o, f);
        else
          continue;
        try {
          await H$(p, g, void 0, u);
        } catch ($) {
          console.warn(`Échec téléchargement ressource: ${c}`, $);
        }
      }
      pe(e, "resources-sync-complete", "Ressources synchronisées");
    } catch (n) {
      console.error("Erreur synchronisation ressources:", n);
    }
  }
}
const K$ = X.dirname(Zw(import.meta.url));
process.env.APP_ROOT = X.join(K$, "..");
const Ou = process.env.VITE_DEV_SERVER_URL, $V = X.join(process.env.APP_ROOT, "dist-electron"), W$ = X.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ou ? X.join(process.env.APP_ROOT, "public") : W$;
let Le;
or.autoUpdater.autoDownload = !0;
or.autoUpdater.autoInstallOnAppQuit = !0;
or.autoUpdater.on("update-available", () => {
  Le && Le.webContents.send("update-available");
});
or.autoUpdater.on("update-downloaded", () => {
  Le && (Le.webContents.send("update-ready"), setTimeout(() => {
    or.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
or.autoUpdater.on("error", (e) => {
  Le && Le.webContents.send("update-error", e.message);
});
or.autoUpdater.on("checking-for-update", () => {
  Le && Le.webContents.send("checking-update");
});
or.autoUpdater.on("update-not-available", () => {
  Le && Le.webContents.send("update-not-available");
});
or.autoUpdater.on("download-progress", (e) => {
  Le && Le.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const xB = Ln.requestSingleInstanceLock();
if (!xB)
  Ln.quit();
else {
  let e = function() {
    Le = new Nh({
      icon: X.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 550,
      width: 900,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: X.join(K$, "preload.mjs")
      }
    }), UB(Le), or.autoUpdater.checkForUpdates().catch(console.error), Ou ? (Le.loadURL(Ou), Le.webContents.openDevTools({
      mode: "detach"
    })) : Le.loadFile(X.join(W$, "index.html"));
  };
  Ln.on("second-instance", () => {
    Le && (Le.isMinimized() && Le.restore(), Le.focus());
  }), Ln.on("window-all-closed", () => {
    process.platform !== "darwin" && (Ln.quit(), Le = null);
  }), Ln.on("activate", () => {
    Nh.getAllWindows().length === 0 && e();
  }), Ln.whenReady().then(() => {
    e();
  });
}
export {
  $V as MAIN_DIST,
  W$ as RENDERER_DIST,
  Ou as VITE_DEV_SERVER_URL
};
