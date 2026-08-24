import C, { createElement as nr } from "react";
var R = function() {
  return R = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, R.apply(this, arguments);
};
function ae(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, s = t.length, o; n < s; n++)
    (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var _ = "-ms-", me = "-moz-", b = "-webkit-", $t = "comm", De = "rule", st = "decl", sr = "@import", or = "@namespace", Tt = "@keyframes", ir = "@layer", jt = Math.abs, ot = String.fromCharCode, Ve = Object.assign;
function ar(e, t) {
  return O(e, 0) ^ 45 ? (((t << 2 ^ O(e, 0)) << 2 ^ O(e, 1)) << 2 ^ O(e, 2)) << 2 ^ O(e, 3) : 0;
}
function Dt(e) {
  return e.trim();
}
function Y(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function p(e, t, r) {
  return e.replace(t, r);
}
function Pe(e, t, r) {
  return e.indexOf(t, r);
}
function O(e, t) {
  return e.charCodeAt(t) | 0;
}
function ee(e, t, r) {
  return e.slice(t, r);
}
function z(e) {
  return e.length;
}
function Gt(e) {
  return e.length;
}
function ge(e, t) {
  return t.push(e), e;
}
function cr(e, t) {
  return e.map(t).join("");
}
function St(e, t) {
  return e.filter(function(r) {
    return !Y(r, t);
  });
}
var Ge = 1, ce = 1, Mt = 0, D = 0, k = 0, le = "";
function Me(e, t, r, n, s, o, i, f) {
  return { value: e, root: t, parent: r, type: n, props: s, children: o, line: Ge, column: ce, length: i, return: "", siblings: f };
}
function K(e, t) {
  return Ve(Me("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function oe(e) {
  for (; e.root; )
    e = K(e.root, { children: [e] });
  ge(e, e.siblings);
}
function ur() {
  return k;
}
function fr() {
  return k = D > 0 ? O(le, --D) : 0, ce--, k === 10 && (ce = 1, Ge--), k;
}
function L() {
  return k = D < Mt ? O(le, D++) : 0, ce++, k === 10 && (ce = 1, Ge++), k;
}
function U() {
  return O(le, D);
}
function Ee() {
  return D;
}
function Fe(e, t) {
  return ee(le, e, t);
}
function ve(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function hr(e) {
  return Ge = ce = 1, Mt = z(le = e), D = 0, [];
}
function lr(e) {
  return le = "", e;
}
function Ye(e) {
  return Dt(Fe(D - 1, Ze(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function pr(e) {
  for (; (k = U()) && k < 33; )
    L();
  return ve(e) > 2 || ve(k) > 3 ? "" : " ";
}
function dr(e, t) {
  for (; --t && L() && !(k < 48 || k > 102 || k > 57 && k < 65 || k > 70 && k < 97); )
    ;
  return Fe(e, Ee() + (t < 6 && U() == 32 && L() == 32));
}
function Ze(e) {
  for (; L(); )
    switch (k) {
      // ] ) " '
      case e:
        return D;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ze(k);
        break;
      // (
      case 40:
        e === 41 && Ze(e);
        break;
      // \
      case 92:
        L();
        break;
    }
  return D;
}
function gr(e, t) {
  for (; L() && e + k !== 57; )
    if (e + k === 84 && U() === 47)
      break;
  return "/*" + Fe(t, D - 1) + "*" + ot(e === 47 ? e : L());
}
function mr(e) {
  for (; !ve(U()); )
    L();
  return Fe(e, D);
}
function yr(e) {
  return lr(Re("", null, null, null, [""], e = hr(e), 0, [0], e));
}
function Re(e, t, r, n, s, o, i, f, c) {
  for (var d = 0, h = 0, m = i, w = 0, I = 0, y = 0, v = 1, E = 1, N = 1, P = 0, x = "", u = s, S = o, g = n, a = x; E; )
    switch (y = P, P = L()) {
      // (
      case 40:
        if (y != 108 && O(a, m - 1) == 58) {
          Pe(a += p(Ye(P), "&", "&\f"), "&\f", jt(d ? f[d - 1] : 0)) != -1 && (N = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        a += Ye(P);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        a += pr(y);
        break;
      // \
      case 92:
        a += dr(Ee() - 1, 7);
        continue;
      // /
      case 47:
        switch (U()) {
          case 42:
          case 47:
            ge(vr(gr(L(), Ee()), t, r, c), c), (ve(y || 1) == 5 || ve(U() || 1) == 5) && z(a) && ee(a, -1, void 0) !== " " && (a += " ");
            break;
          default:
            a += "/";
        }
        break;
      // {
      case 123 * v:
        f[d++] = z(a) * N;
      // } ; \0
      case 125 * v:
      case 59:
      case 0:
        switch (P) {
          // \0 }
          case 0:
          case 125:
            E = 0;
          // ;
          case 59 + h:
            N == -1 && (a = p(a, /\f/g, "")), I > 0 && (z(a) - m || v === 0 && y === 47) && ge(I > 32 ? wt(a + ";", n, r, m - 1, c) : wt(p(a, " ", "") + ";", n, r, m - 2, c), c);
            break;
          // @ ;
          case 59:
            a += ";";
          // { rule/at-rule
          default:
            if (ge(g = bt(a, t, r, d, h, s, f, x, u = [], S = [], m, o), o), P === 123)
              if (h === 0)
                Re(a, t, g, g, u, o, m, f, S);
              else {
                switch (w) {
                  // c(ontainer)
                  case 99:
                    if (O(a, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (O(a, 2) === 97) break;
                  default:
                    h = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                h ? Re(e, g, g, n && ge(bt(e, g, g, 0, 0, s, f, x, s, u = [], m, S), S), s, S, m, f, n ? u : S) : Re(a, g, g, g, [""], S, 0, f, S);
              }
        }
        d = h = I = 0, v = N = 1, x = a = "", m = i;
        break;
      // :
      case 58:
        m = 1 + z(a), I = y;
      default:
        if (v < 1) {
          if (P == 123)
            --v;
          else if (P == 125 && v++ == 0 && fr() == 125)
            continue;
        }
        switch (a += ot(P), P * v) {
          // &
          case 38:
            N = h > 0 ? 1 : (a += "\f", -1);
            break;
          // ,
          case 44:
            f[d++] = (z(a) - 1) * N, N = 1;
            break;
          // @
          case 64:
            U() === 45 && (a += Ye(L())), w = U(), h = m = z(x = a += mr(Ee())), P++;
            break;
          // -
          case 45:
            y === 45 && z(a) == 2 && (v = 0);
        }
    }
  return o;
}
function bt(e, t, r, n, s, o, i, f, c, d, h, m) {
  for (var w = s - 1, I = s === 0 ? o : [""], y = Gt(I), v = 0, E = 0, N = 0; v < n; ++v)
    for (var P = 0, x = ee(e, w + 1, w = jt(E = i[v])), u = e; P < y; ++P)
      (u = Dt(E > 0 ? I[P] + " " + x : p(x, /&\f/g, I[P]))) && (c[N++] = u);
  return Me(e, t, r, s === 0 ? De : f, c, d, h, m);
}
function vr(e, t, r, n) {
  return Me(e, t, r, $t, ot(ur()), ee(e, 2, -2), 0, n);
}
function wt(e, t, r, n, s) {
  return Me(e, t, r, st, ee(e, 0, n), ee(e, n + 1, -1), n, s);
}
function Ft(e, t, r) {
  switch (ar(e, t)) {
    // color-adjust
    case 5103:
      return b + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return b + e + e;
    // mask-composite
    case 4855:
      return b + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
    // tab-size
    case 4789:
      return me + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return b + e + me + e + _ + e + e;
    // writing-mode
    case 5936:
      switch (O(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return b + e + _ + p(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return b + e + _ + p(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return b + e + _ + p(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828:
    case 4268:
    case 2903:
      return b + e + _ + e + e;
    // order
    case 6165:
      return b + e + _ + "flex-" + e + e;
    // align-items
    case 5187:
      return b + e + p(e, /(\w+).+(:[^]+)/, b + "box-$1$2" + _ + "flex-$1$2") + e;
    // align-self
    case 5443:
      return b + e + _ + "flex-item-" + p(e, /flex-|-self/g, "") + (Y(e, /flex-|baseline/) ? "" : _ + "grid-row-" + p(e, /flex-|-self/g, "")) + e;
    // align-content
    case 4675:
      return b + e + _ + "flex-line-pack" + p(e, /align-content|flex-|-self/g, "") + e;
    // flex-shrink
    case 5548:
      return b + e + _ + p(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return b + e + _ + p(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return b + "box-" + p(e, "-grow", "") + b + e + _ + p(e, "grow", "positive") + e;
    // transition
    case 4554:
      return b + p(e, /([^-])(transform)/g, "$1" + b + "$2") + e;
    // cursor
    case 6187:
      return p(p(p(e, /(zoom-|grab)/, b + "$1"), /(image-set)/, b + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return p(e, /(image-set\([^]*)/, b + "$1$`$1");
    // justify-content
    case 4968:
      return p(p(e, /(.+:)(flex-)?(.*)/, b + "box-pack:$3" + _ + "flex-pack:$3"), /space-between/, "justify") + b + e + e;
    // justify-self
    case 4200:
      if (!Y(e, /flex-|baseline/)) return _ + "grid-column-align" + ee(e, t) + e;
      break;
    // grid-template-(columns|rows)
    case 2592:
    case 3360:
      return _ + p(e, "template-", "") + e;
    // grid-(row|column)-start
    case 4384:
    case 3616:
      return r && r.some(function(n, s) {
        return t = s, Y(n.props, /grid-\w+-end/);
      }) ? ~Pe(e + (r = r[t].value), "span", 0) ? e : _ + p(e, "-start", "") + e + _ + "grid-row-span:" + (~Pe(r, "span", 0) ? Y(r, /\d+/) : +Y(r, /\d+/) - +Y(e, /\d+/)) + ";" : _ + p(e, "-start", "") + e;
    // grid-(row|column)-end
    case 4896:
    case 4128:
      return r && r.some(function(n) {
        return Y(n.props, /grid-\w+-start/);
      }) ? e : _ + p(p(e, "-end", "-span"), "span ", "") + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return p(e, /(.+)-inline(.+)/, b + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (z(e) - 1 - t > 6)
        switch (O(e, t + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            if (O(e, t + 4) !== 45)
              break;
          // (f)ill-available, (f)it-content
          case 102:
            return p(e, /(.+:)(.+)-([^]+)/, "$1" + b + "$2-$3$1" + me + (O(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          // (s)tretch
          case 115:
            return ~Pe(e, "stretch", 0) ? Ft(p(e, "stretch", "fill-available"), t, r) + e : e;
        }
      break;
    // grid-(column|row)
    case 5152:
    case 5920:
      return p(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(n, s, o, i, f, c, d) {
        return _ + s + ":" + o + d + (i ? _ + s + "-span:" + (f ? c : +c - +o) + d : "") + e;
      });
    // position: sticky
    case 4949:
      if (O(e, t + 6) === 121)
        return p(e, ":", ":" + b) + e;
      break;
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch (O(e, O(e, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return p(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + b + (O(e, 14) === 45 ? "inline-" : "") + "box$3$1" + b + "$2$3$1" + _ + "$2box$3") + e;
        // (inline-)?gri(d)
        case 100:
          return p(e, ":", ":" + _) + e;
      }
      break;
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return p(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function Oe(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Sr(e, t, r, n) {
  switch (e.type) {
    case ir:
      if (e.children.length) break;
    case sr:
    case or:
    case st:
      return e.return = e.return || e.value;
    case $t:
      return "";
    case Tt:
      return e.return = e.value + "{" + Oe(e.children, n) + "}";
    case De:
      if (!z(e.value = e.props.join(","))) return "";
  }
  return z(r = Oe(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function br(e) {
  var t = Gt(e);
  return function(r, n, s, o) {
    for (var i = "", f = 0; f < t; f++)
      i += e[f](r, n, s, o) || "";
    return i;
  };
}
function wr(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Cr(e, t, r, n) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case st:
        e.return = Ft(e.value, e.length, r);
        return;
      case Tt:
        return Oe([K(e, { value: p(e.value, "@", "@" + b) })], n);
      case De:
        if (e.length)
          return cr(r = e.props, function(s) {
            switch (Y(s, n = /(::plac\w+|:read-\w+)/)) {
              // :read-(only|write)
              case ":read-only":
              case ":read-write":
                oe(K(e, { props: [p(s, /:(read-\w+)/, ":" + me + "$1")] })), oe(K(e, { props: [s] })), Ve(e, { props: St(r, n) });
                break;
              // :placeholder
              case "::placeholder":
                oe(K(e, { props: [p(s, /:(plac\w+)/, ":" + b + "input-$1")] })), oe(K(e, { props: [p(s, /:(plac\w+)/, ":" + me + "$1")] })), oe(K(e, { props: [p(s, /:(plac\w+)/, _ + "input-$1")] })), oe(K(e, { props: [s] })), Ve(e, { props: St(r, n) });
                break;
            }
            return "";
          });
    }
}
var Ar = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Z = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", zt = "active", $e = "data-styled-version", ue = "6.3.9", it = `/*!sc*/
`, ye = typeof window < "u" && typeof document < "u", T = C.createContext === void 0, Ir = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" && process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY), xr = {}, at = Object.freeze([]), fe = Object.freeze({});
function ct(e, t, r) {
  return r === void 0 && (r = fe), e.theme !== r.theme && e.theme || t || r.theme;
}
var Lt = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]), _r = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Pr = /(^-|-$)/g;
function Ct(e) {
  return e.replace(_r, "-").replace(Pr, "");
}
var Er = /(a)(d)/gi, At = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Je(e) {
  var t, r = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = At(t % 52) + r;
  return (At(t % 52) + r).replace(Er, "$1-$2");
}
var qe, J = function(e, t) {
  for (var r = t.length; r; ) e = 33 * e ^ t.charCodeAt(--r);
  return e;
}, Bt = function(e) {
  return J(5381, e);
};
function ut(e) {
  return Je(Bt(e) >>> 0);
}
function Wt(e) {
  return e.displayName || e.name || "Component";
}
function He(e) {
  return typeof e == "string" && !0;
}
var Yt = typeof Symbol == "function" && Symbol.for, qt = Yt ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, Rr = Yt ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, Nr = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, kr = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, Ht = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Or = ((qe = {})[Rr] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, qe[qt] = Ht, qe);
function It(e) {
  return ("type" in (t = e) && t.type.$$typeof) === qt ? Ht : "$$typeof" in e ? Or[e.$$typeof] : Nr;
  var t;
}
var $r = Object.defineProperty, Tr = Object.getOwnPropertyNames, xt = Object.getOwnPropertySymbols, jr = Object.getOwnPropertyDescriptor, Dr = Object.getPrototypeOf, _t = Object.prototype;
function ft(e, t, r) {
  if (typeof t != "string") {
    if (_t) {
      var n = Dr(t);
      n && n !== _t && ft(e, n, r);
    }
    var s = Tr(t);
    xt && (s = s.concat(xt(t)));
    for (var o = It(e), i = It(t), f = 0; f < s.length; ++f) {
      var c = s[f];
      if (!(c in kr || r && r[c] || i && c in i || o && c in o)) {
        var d = jr(t, c);
        try {
          $r(e, c, d);
        } catch {
        }
      }
    }
  }
  return e;
}
function te(e) {
  return typeof e == "function";
}
function ht(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function X(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function Se(e, t) {
  return e.join(t || "");
}
function be(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Qe(e, t, r) {
  if (r === void 0 && (r = !1), !r && !be(e) && !Array.isArray(e)) return t;
  if (Array.isArray(t)) for (var n = 0; n < t.length; n++) e[n] = Qe(e[n], t[n]);
  else if (be(t)) for (var n in t) e[n] = Qe(e[n], t[n]);
  return e;
}
function lt(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
function j(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : ""));
}
var Gr = (function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t, this._cGroup = 0, this._cIndex = 0;
  }
  return e.prototype.indexOfGroup = function(t) {
    if (t === this._cGroup) return this._cIndex;
    var r = this._cIndex;
    if (t > this._cGroup) for (var n = this._cGroup; n < t; n++) r += this.groupSizes[n];
    else for (n = this._cGroup - 1; n >= t; n--) r -= this.groupSizes[n];
    return this._cGroup = t, this._cIndex = r, r;
  }, e.prototype.insertRules = function(t, r) {
    if (t >= this.groupSizes.length) {
      for (var n = this.groupSizes, s = n.length, o = s; t >= o; ) if ((o <<= 1) < 0) throw j(16, "".concat(t));
      this.groupSizes = new Uint32Array(o), this.groupSizes.set(n), this.length = o;
      for (var i = s; i < o; i++) this.groupSizes[i] = 0;
    }
    for (var f = this.indexOfGroup(t + 1), c = 0, d = (i = 0, r.length); i < d; i++) this.tag.insertRule(f, r[i]) && (this.groupSizes[t]++, f++, c++);
    c > 0 && this._cGroup > t && (this._cIndex += c);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var r = this.groupSizes[t], n = this.indexOfGroup(t), s = n + r;
      this.groupSizes[t] = 0;
      for (var o = n; o < s; o++) this.tag.deleteRule(n);
      r > 0 && this._cGroup > t && (this._cIndex -= r);
    }
  }, e.prototype.getGroup = function(t) {
    var r = "";
    if (t >= this.length || this.groupSizes[t] === 0) return r;
    for (var n = this.groupSizes[t], s = this.indexOfGroup(t), o = s + n, i = s; i < o; i++) r += this.tag.getRule(i) + it;
    return r;
  }, e;
})(), Ne = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), ke = 1, ie = function(e) {
  if (Ne.has(e)) return Ne.get(e);
  for (; Te.has(ke); ) ke++;
  var t = ke++;
  return Ne.set(e, t), Te.set(t, e), t;
}, Mr = function(e, t) {
  ke = t + 1, Ne.set(e, t), Te.set(t, e);
}, Fr = "style[".concat(Z, "][").concat($e, '="').concat(ue, '"]'), zr = new RegExp("^".concat(Z, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Pt = function(e) {
  return typeof ShadowRoot < "u" && e instanceof ShadowRoot || "host" in e && e.nodeType === 11;
}, Xe = function(e) {
  if (!e) return document;
  if (Pt(e)) return e;
  if ("getRootNode" in e) {
    var t = e.getRootNode();
    if (Pt(t)) return t;
  }
  return document;
}, Lr = function(e, t, r) {
  for (var n, s = r.split(","), o = 0, i = s.length; o < i; o++) (n = s[o]) && e.registerName(t, n);
}, Br = function(e, t) {
  for (var r, n = ((r = t.textContent) !== null && r !== void 0 ? r : "").split(it), s = [], o = 0, i = n.length; o < i; o++) {
    var f = n[o].trim();
    if (f) {
      var c = f.match(zr);
      if (c) {
        var d = 0 | parseInt(c[1], 10), h = c[2];
        d !== 0 && (Mr(h, d), Lr(e, h, c[3]), e.getTag().insertRules(d, s)), s.length = 0;
      } else s.push(f);
    }
  }
}, Ke = function(e) {
  for (var t = Xe(e.options.target).querySelectorAll(Fr), r = 0, n = t.length; r < n; r++) {
    var s = t[r];
    s && s.getAttribute(Z) !== zt && (Br(e, s), s.parentNode && s.parentNode.removeChild(s));
  }
};
function et() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var Kt = function(e) {
  var t = document.head, r = e || t, n = document.createElement("style"), s = (function(f) {
    var c = Array.from(f.querySelectorAll("style[".concat(Z, "]")));
    return c[c.length - 1];
  })(r), o = s !== void 0 ? s.nextSibling : null;
  n.setAttribute(Z, zt), n.setAttribute($e, ue);
  var i = et();
  return i && n.setAttribute("nonce", i), r.insertBefore(n, o), n;
}, Wr = (function() {
  function e(t) {
    this.element = Kt(t), this.element.appendChild(document.createTextNode("")), this.sheet = (function(r) {
      var n;
      if (r.sheet) return r.sheet;
      for (var s = (n = r.getRootNode().styleSheets) !== null && n !== void 0 ? n : document.styleSheets, o = 0, i = s.length; o < i; o++) {
        var f = s[o];
        if (f.ownerNode === r) return f;
      }
      throw j(17);
    })(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    try {
      return this.sheet.insertRule(r, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var r = this.sheet.cssRules[t];
    return r && r.cssText ? r.cssText : "";
  }, e;
})(), Yr = (function() {
  function e(t) {
    this.element = Kt(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    if (t <= this.length && t >= 0) {
      var n = document.createTextNode(r);
      return this.element.insertBefore(n, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
})(), qr = (function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    return t <= this.length && (t === this.length ? this.rules.push(r) : this.rules.splice(t, 0, r), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
})(), Et = ye, Hr = { isServer: !ye, useCSSOMInjection: !Ir }, he = (function() {
  function e(t, r, n) {
    t === void 0 && (t = fe), r === void 0 && (r = {});
    var s = this;
    this.options = R(R({}, Hr), t), this.gs = r, this.names = new Map(n), this.server = !!t.isServer, !this.server && ye && Et && (Et = !1, Ke(this)), lt(this, function() {
      return (function(o) {
        for (var i = o.getTag(), f = i.length, c = "", d = function(m) {
          var w = (function(N) {
            return Te.get(N);
          })(m);
          if (w === void 0) return "continue";
          var I = o.names.get(w);
          if (I === void 0 || !I.size) return "continue";
          var y = i.getGroup(m);
          if (y.length === 0) return "continue";
          var v = Z + ".g" + m + '[id="' + w + '"]', E = "";
          I.forEach(function(N) {
            N.length > 0 && (E += N + ",");
          }), c += y + v + '{content:"' + E + '"}' + it;
        }, h = 0; h < f; h++) d(h);
        return c;
      })(s);
    });
  }
  return e.registerId = function(t) {
    return ie(t);
  }, e.prototype.rehydrate = function() {
    !this.server && ye && Ke(this);
  }, e.prototype.reconstructWithOptions = function(t, r) {
    r === void 0 && (r = !0);
    var n = new e(R(R({}, this.options), t), this.gs, r && this.names || void 0);
    return !this.server && ye && t.target !== this.options.target && Xe(this.options.target) !== Xe(t.target) && Ke(n), n;
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = (function(r) {
      var n = r.useCSSOMInjection, s = r.target;
      return r.isServer ? new qr(s) : n ? new Wr(s) : new Yr(s);
    })(this.options), new Gr(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, r) {
    var n, s;
    return (s = (n = this.names.get(t)) === null || n === void 0 ? void 0 : n.has(r)) !== null && s !== void 0 && s;
  }, e.prototype.registerName = function(t, r) {
    ie(t);
    var n = this.names.get(t);
    n ? n.add(r) : this.names.set(t, /* @__PURE__ */ new Set([r]));
  }, e.prototype.insertRules = function(t, r, n) {
    this.registerName(t, r), this.getTag().insertRules(ie(t), n);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(ie(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
})(), Kr = /&/g, q = 47, Q = 42;
function Rt(e) {
  if (e.indexOf("}") === -1) return !1;
  for (var t = e.length, r = 0, n = 0, s = !1, o = 0; o < t; o++) {
    var i = e.charCodeAt(o);
    if (n !== 0 || s || i !== q || e.charCodeAt(o + 1) !== Q) if (s) i === Q && e.charCodeAt(o + 1) === q && (s = !1, o++);
    else if (i !== 34 && i !== 39 || o !== 0 && e.charCodeAt(o - 1) === 92) {
      if (n === 0) {
        if (i === 123) r++;
        else if (i === 125 && --r < 0) return !0;
      }
    } else n === 0 ? n = i : n === i && (n = 0);
    else s = !0, o++;
  }
  return r !== 0 || n !== 0;
}
function Ut(e, t) {
  return e.map(function(r) {
    return r.type === "rule" && (r.value = "".concat(t, " ").concat(r.value), r.value = r.value.replaceAll(",", ",".concat(t, " ")), r.props = r.props.map(function(n) {
      return "".concat(t, " ").concat(n);
    })), Array.isArray(r.children) && r.type !== "@keyframes" && (r.children = Ut(r.children, t)), r;
  });
}
function Vt(e) {
  var t, r, n, s = e === void 0 ? fe : e, o = s.options, i = o === void 0 ? fe : o, f = s.plugins, c = f === void 0 ? at : f, d = function(y, v, E) {
    return E.startsWith(r) && E.endsWith(r) && E.replaceAll(r, "").length > 0 ? ".".concat(t) : y;
  }, h = c.slice();
  h.push(function(y) {
    y.type === De && y.value.includes("&") && (n || (n = new RegExp("\\".concat(r, "\\b"), "g")), y.props[0] = y.props[0].replace(Kr, r).replace(n, d));
  }), i.prefix && h.push(Cr), h.push(Sr);
  var m = [], w = br(h.concat(wr(function(y) {
    return m.push(y);
  }))), I = function(y, v, E, N) {
    v === void 0 && (v = ""), E === void 0 && (E = ""), N === void 0 && (N = "&"), t = N, r = v, n = void 0;
    var P = (function(u) {
      if (!Rt(u)) return u;
      for (var S = u.length, g = "", a = 0, l = 0, $ = 0, G = !1, A = 0; A < S; A++) {
        var M = u.charCodeAt(A);
        if ($ !== 0 || G || M !== q || u.charCodeAt(A + 1) !== Q) if (G) M === Q && u.charCodeAt(A + 1) === q && (G = !1, A++);
        else if (M !== 34 && M !== 39 || A !== 0 && u.charCodeAt(A - 1) === 92) {
          if ($ === 0) if (M === 123) l++;
          else if (M === 125) {
            if (--l < 0) {
              for (var F = A + 1; F < S; ) {
                var we = u.charCodeAt(F);
                if (we === 59 || we === 10) break;
                F++;
              }
              F < S && u.charCodeAt(F) === 59 && F++, l = 0, A = F - 1, a = F;
              continue;
            }
            l === 0 && (g += u.substring(a, A + 1), a = A + 1);
          } else M === 59 && l === 0 && (g += u.substring(a, A + 1), a = A + 1);
        } else $ === 0 ? $ = M : $ === M && ($ = 0);
        else G = !0, A++;
      }
      if (a < S) {
        var Ce = u.substring(a);
        Rt(Ce) || (g += Ce);
      }
      return g;
    })((function(u) {
      if (u.indexOf("//") === -1) return u;
      for (var S = u.length, g = [], a = 0, l = 0, $ = 0, G = 0; l < S; ) {
        var A = u.charCodeAt(l);
        if (A !== 34 && A !== 39 || l !== 0 && u.charCodeAt(l - 1) === 92) if ($ === 0) if (A === q && l + 1 < S && u.charCodeAt(l + 1) === Q) {
          for (l += 2; l + 1 < S && (u.charCodeAt(l) !== Q || u.charCodeAt(l + 1) !== q); ) l++;
          l += 2;
        } else if (A === 40 && l >= 3 && (32 | u.charCodeAt(l - 1)) == 108 && (32 | u.charCodeAt(l - 2)) == 114 && (32 | u.charCodeAt(l - 3)) == 117) G = 1, l++;
        else if (G > 0) A === 41 ? G-- : A === 40 && G++, l++;
        else if (A === Q && l + 1 < S && u.charCodeAt(l + 1) === q) l > a && g.push(u.substring(a, l)), a = l += 2;
        else if (A === q && l + 1 < S && u.charCodeAt(l + 1) === q) {
          for (l > a && g.push(u.substring(a, l)); l < S && u.charCodeAt(l) !== 10; ) l++;
          a = l;
        } else l++;
        else l++;
        else $ === 0 ? $ = A : $ === A && ($ = 0), l++;
      }
      return a === 0 ? u : (a < S && g.push(u.substring(a)), g.join(""));
    })(y)), x = yr(E || v ? "".concat(E, " ").concat(v, " { ").concat(P, " }") : P);
    return i.namespace && (x = Ut(x, i.namespace)), m = [], Oe(x, w), m;
  };
  return I.hash = c.length ? c.reduce(function(y, v) {
    return v.name || j(15), J(y, v.name);
  }, 5381).toString() : "", I;
}
var Zt = new he(), tt = Vt(), rt = { shouldForwardProp: void 0, styleSheet: Zt, stylis: tt }, pt = T ? { Provider: function(e) {
  return e.children;
}, Consumer: function(e) {
  return (0, e.children)(rt);
} } : C.createContext(rt), sn = pt.Consumer, Ur = T ? { Provider: function(e) {
  return e.children;
} } : C.createContext(void 0);
function je() {
  return T ? rt : C.useContext(pt);
}
function Vr(e) {
  if (T || !C.useMemo) return e.children;
  var t = je().styleSheet, r = C.useMemo(function() {
    var o = t;
    return e.sheet ? o = e.sheet : e.target && (o = o.reconstructWithOptions({ target: e.target }, !1)), e.disableCSSOMInjection && (o = o.reconstructWithOptions({ useCSSOMInjection: !1 })), o;
  }, [e.disableCSSOMInjection, e.sheet, e.target, t]), n = C.useMemo(function() {
    return Vt({ options: { namespace: e.namespace, prefix: e.enableVendorPrefixes }, plugins: e.stylisPlugins });
  }, [e.enableVendorPrefixes, e.namespace, e.stylisPlugins]), s = C.useMemo(function() {
    return { shouldForwardProp: e.shouldForwardProp, styleSheet: r, stylis: n };
  }, [e.shouldForwardProp, r, n]);
  return C.createElement(pt.Provider, { value: s }, C.createElement(Ur.Provider, { value: n }, e.children));
}
var Jt = (function() {
  function e(t, r) {
    var n = this;
    this.inject = function(s, o) {
      o === void 0 && (o = tt);
      var i = n.name + o.hash;
      s.hasNameForId(n.id, i) || s.insertRules(n.id, i, o(n.rules, i, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = r, lt(this, function() {
      throw j(12, String(n.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = tt), this.name + t.hash;
  }, e;
})();
function Zr(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t != "number" || t === 0 || e in Ar || e.startsWith("--") ? String(t).trim() : "".concat(t, "px");
}
var Jr = function(e) {
  return e >= "A" && e <= "Z";
};
function Nt(e) {
  for (var t = "", r = 0; r < e.length; r++) {
    var n = e[r];
    if (r === 1 && n === "-" && e[0] === "-") return e;
    Jr(n) ? t += "-" + n.toLowerCase() : t += n;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var Qt = function(e) {
  return e == null || e === !1 || e === "";
}, Xt = function(e) {
  var t = [];
  for (var r in e) {
    var n = e[r];
    e.hasOwnProperty(r) && !Qt(n) && (Array.isArray(n) && n.isCss || te(n) ? t.push("".concat(Nt(r), ":"), n, ";") : be(n) ? t.push.apply(t, ae(ae(["".concat(r, " {")], Xt(n), !1), ["}"], !1)) : t.push("".concat(Nt(r), ": ").concat(Zr(r, n), ";")));
  }
  return t;
};
function V(e, t, r, n, s) {
  if (s === void 0 && (s = []), typeof e == "string") return e && s.push(e), s;
  if (Qt(e)) return s;
  if (ht(e)) return s.push(".".concat(e.styledComponentId)), s;
  if (te(e)) {
    if (!te(i = e) || i.prototype && i.prototype.isReactComponent || !t) return s.push(e), s;
    var o = e(t);
    return V(o, t, r, n, s);
  }
  var i;
  if (e instanceof Jt) return r ? (e.inject(r, n), s.push(e.getName(n))) : s.push(e), s;
  if (be(e)) {
    for (var f = Xt(e), c = 0; c < f.length; c++) s.push(f[c]);
    return s;
  }
  if (!Array.isArray(e)) return s.push(e.toString()), s;
  for (c = 0; c < e.length; c++) V(e[c], t, r, n, s);
  return s;
}
function er(e) {
  for (var t = 0; t < e.length; t += 1) {
    var r = e[t];
    if (te(r) && !ht(r)) return !1;
  }
  return !0;
}
var Qr = Bt(ue), Xr = (function() {
  function e(t, r, n) {
    this.rules = t, this.staticRulesId = "", this.isStatic = (n === void 0 || n.isStatic) && er(t), this.componentId = r, this.baseHash = J(Qr, r), this.baseStyle = n, he.registerId(r);
  }
  return e.prototype.generateAndInjectStyles = function(t, r, n) {
    var s = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, r, n).className : "";
    if (this.isStatic && !n.hash) if (this.staticRulesId && r.hasNameForId(this.componentId, this.staticRulesId)) s = X(s, this.staticRulesId);
    else {
      var o = Se(V(this.rules, t, r, n)), i = Je(J(this.baseHash, o) >>> 0);
      if (!r.hasNameForId(this.componentId, i)) {
        var f = n(o, ".".concat(i), void 0, this.componentId);
        r.insertRules(this.componentId, i, f);
      }
      s = X(s, i), this.staticRulesId = i;
    }
    else {
      for (var c = J(this.baseHash, n.hash), d = "", h = 0; h < this.rules.length; h++) {
        var m = this.rules[h];
        if (typeof m == "string") d += m;
        else if (m) {
          var w = Se(V(m, t, r, n));
          c = J(J(c, String(h)), w), d += w;
        }
      }
      if (d) {
        var I = Je(c >>> 0);
        if (!r.hasNameForId(this.componentId, I)) {
          var y = n(d, ".".concat(I), void 0, this.componentId);
          r.insertRules(this.componentId, I, y);
        }
        s = X(s, I);
      }
    }
    return { className: s, css: typeof window > "u" ? r.getTag().getGroup(ie(this.componentId)) : "" };
  }, e;
})(), re = T ? { Provider: function(e) {
  return e.children;
}, Consumer: function(e) {
  return (0, e.children)(void 0);
} } : C.createContext(void 0), on = re.Consumer;
function an() {
  var e = T ? void 0 : C.useContext(re);
  if (!e) throw j(18);
  return e;
}
function cn(e) {
  if (T) return e.children;
  var t = C.useContext(re), r = C.useMemo(function() {
    return (function(n, s) {
      if (!n) throw j(14);
      if (te(n)) {
        var o = n(s);
        return o;
      }
      if (Array.isArray(n) || typeof n != "object") throw j(8);
      return s ? R(R({}, s), n) : n;
    })(e.theme, t);
  }, [e.theme, t]);
  return e.children ? C.createElement(re.Provider, { value: r }, e.children) : null;
}
var Ue = {};
function en(e, t, r) {
  var n = ht(e), s = e, o = !He(e), i = t.attrs, f = i === void 0 ? at : i, c = t.componentId, d = c === void 0 ? (function(u, S) {
    var g = typeof u != "string" ? "sc" : Ct(u);
    Ue[g] = (Ue[g] || 0) + 1;
    var a = "".concat(g, "-").concat(ut(ue + g + Ue[g]));
    return S ? "".concat(S, "-").concat(a) : a;
  })(t.displayName, t.parentComponentId) : c, h = t.displayName, m = h === void 0 ? (function(u) {
    return He(u) ? "styled.".concat(u) : "Styled(".concat(Wt(u), ")");
  })(e) : h, w = t.displayName && t.componentId ? "".concat(Ct(t.displayName), "-").concat(t.componentId) : t.componentId || d, I = n && s.attrs ? s.attrs.concat(f).filter(Boolean) : f, y = t.shouldForwardProp;
  if (n && s.shouldForwardProp) {
    var v = s.shouldForwardProp;
    if (t.shouldForwardProp) {
      var E = t.shouldForwardProp;
      y = function(u, S) {
        return v(u, S) && E(u, S);
      };
    } else y = v;
  }
  var N = new Xr(r, w, n ? s.componentStyle : void 0);
  function P(u, S) {
    return (function(g, a, l) {
      var $ = g.attrs, G = g.componentStyle, A = g.defaultProps, M = g.foldedComponentIds, F = g.styledComponentId, we = g.target, Ce = T ? void 0 : C.useContext(re), rr = je(), ze = g.shouldForwardProp || rr.shouldForwardProp, gt = ct(a, Ce, A) || (T ? void 0 : fe), B = (function(Ie, ne, xe) {
        for (var de, W = R(R({}, ne), { className: void 0, theme: xe }), We = 0; We < Ie.length; We += 1) {
          var _e = te(de = Ie[We]) ? de(W) : de;
          for (var se in _e) se === "className" ? W.className = X(W.className, _e[se]) : se === "style" ? W.style = R(R({}, W.style), _e[se]) : W[se] = _e[se];
        }
        return "className" in ne && typeof ne.className == "string" && (W.className = X(W.className, ne.className)), W;
      })($, a, gt), Ae = B.as || we, pe = {};
      for (var H in B) B[H] === void 0 || H[0] === "$" || H === "as" || H === "theme" && B.theme === gt || (H === "forwardedAs" ? pe.as = B.forwardedAs : ze && !ze(H, Ae) || (pe[H] = B[H]));
      var mt = (function(Ie, ne) {
        var xe = je(), de = Ie.generateAndInjectStyles(ne, xe.styleSheet, xe.stylis);
        return de;
      })(G, B), Le = mt.className, yt = mt.css, Be = X(M, F);
      Le && (Be += " " + Le), B.className && (Be += " " + B.className), pe[He(Ae) && !Lt.has(Ae) ? "class" : "className"] = Be, l && (pe.ref = l);
      var vt = nr(Ae, pe);
      return T && yt ? C.createElement(C.Fragment, null, C.createElement("style", { precedence: "styled-components", href: "sc-".concat(F, "-").concat(Le), children: yt }), vt) : vt;
    })(x, u, S);
  }
  P.displayName = m;
  var x = C.forwardRef(P);
  return x.attrs = I, x.componentStyle = N, x.displayName = m, x.shouldForwardProp = y, x.foldedComponentIds = n ? X(s.foldedComponentIds, s.styledComponentId) : "", x.styledComponentId = w, x.target = n ? s.target : e, Object.defineProperty(x, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(u) {
    this._foldedDefaultProps = n ? (function(S) {
      for (var g = [], a = 1; a < arguments.length; a++) g[a - 1] = arguments[a];
      for (var l = 0, $ = g; l < $.length; l++) Qe(S, $[l], !0);
      return S;
    })({}, s.defaultProps, u) : u;
  } }), lt(x, function() {
    return ".".concat(x.styledComponentId);
  }), o && ft(x, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), x;
}
function kt(e, t) {
  for (var r = [e[0]], n = 0, s = t.length; n < s; n += 1) r.push(t[n], e[n + 1]);
  return r;
}
var Ot = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function dt(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  if (te(e) || be(e)) return Ot(V(kt(at, ae([e], t, !0))));
  var n = e;
  return t.length === 0 && n.length === 1 && typeof n[0] == "string" ? V(n) : Ot(V(kt(n, t)));
}
function nt(e, t, r) {
  if (r === void 0 && (r = fe), !t) throw j(1, t);
  var n = function(s) {
    for (var o = [], i = 1; i < arguments.length; i++) o[i - 1] = arguments[i];
    return e(t, r, dt.apply(void 0, ae([s], o, !1)));
  };
  return n.attrs = function(s) {
    return nt(e, t, R(R({}, r), { attrs: Array.prototype.concat(r.attrs, s).filter(Boolean) }));
  }, n.withConfig = function(s) {
    return nt(e, t, R(R({}, r), s));
  }, n;
}
var tr = function(e) {
  return nt(en, e);
}, tn = tr;
Lt.forEach(function(e) {
  tn[e] = tr(e);
});
var rn = (function() {
  function e(t, r) {
    this.rules = t, this.componentId = r, this.isStatic = er(t), he.registerId(this.componentId + 1);
  }
  return e.prototype.createStyles = function(t, r, n, s) {
    var o = s(Se(V(this.rules, r, n, s)), ""), i = this.componentId + t;
    n.insertRules(i, i, o);
  }, e.prototype.removeStyles = function(t, r) {
    r.clearRules(this.componentId + t);
  }, e.prototype.renderStyles = function(t, r, n, s) {
    t > 2 && he.registerId(this.componentId + t);
    var o = this.componentId + t;
    this.isStatic ? n.hasNameForId(o, o) || this.createStyles(t, r, n, s) : (this.removeStyles(t, n), this.createStyles(t, r, n, s));
  }, e;
})();
function un(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = dt.apply(void 0, ae([e], t, !1)), s = "sc-global-".concat(ut(JSON.stringify(n))), o = new rn(n, s), i = /* @__PURE__ */ new WeakMap(), f = function(d) {
    var h = je(), m = T ? void 0 : C.useContext(re), w = i.get(h.styleSheet);
    if (w === void 0 && (w = h.styleSheet.allocateGSInstance(s), i.set(h.styleSheet, w)), (typeof window > "u" || !h.styleSheet.server) && c(w, d, h.styleSheet, m, h.stylis), T || C.useLayoutEffect(function() {
      return h.styleSheet.server || c(w, d, h.styleSheet, m, h.stylis), function() {
        var v;
        o.removeStyles(w, h.styleSheet), v = h.styleSheet.options.target, typeof document < "u" && (v ?? document).querySelectorAll('style[data-styled-global="'.concat(s, '"]')).forEach(function(E) {
          return E.remove();
        });
      };
    }, [w, d, h.styleSheet, m, h.stylis]), T) {
      var I = s + w, y = typeof window > "u" ? h.styleSheet.getTag().getGroup(ie(I)) : "";
      if (y) return C.createElement("style", { key: "".concat(s, "-").concat(w), "data-styled-global": s, children: y });
    }
    return null;
  };
  function c(d, h, m, w, I) {
    if (o.isStatic) o.renderStyles(d, xr, m, I);
    else {
      var y = R(R({}, h), { theme: ct(h, w, f.defaultProps) });
      o.renderStyles(d, y, m, I);
    }
  }
  return C.memo(f);
}
function fn(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = Se(dt.apply(void 0, ae([e], t, !1))), s = ut(n);
  return new Jt(s, n);
}
function hn(e) {
  var t = C.forwardRef(function(r, n) {
    var s = ct(r, T ? void 0 : C.useContext(re), e.defaultProps);
    return C.createElement(e, R(R({}, r), { theme: s, ref: n }));
  });
  return t.displayName = "WithTheme(".concat(Wt(e), ")"), ft(t, e);
}
var ln = (function() {
  function e() {
    var t = this;
    this._emitSheetCSS = function() {
      var r = t.instance.toString();
      if (!r) return "";
      var n = et(), s = Se([n && 'nonce="'.concat(n, '"'), "".concat(Z, '="true"'), "".concat($e, '="').concat(ue, '"')].filter(Boolean), " ");
      return "<style ".concat(s, ">").concat(r, "</style>");
    }, this.getStyleTags = function() {
      if (t.sealed) throw j(2);
      return t._emitSheetCSS();
    }, this.getStyleElement = function() {
      var r;
      if (t.sealed) throw j(2);
      var n = t.instance.toString();
      if (!n) return [];
      var s = ((r = {})[Z] = "", r[$e] = ue, r.dangerouslySetInnerHTML = { __html: n }, r), o = et();
      return o && (s.nonce = o), [C.createElement("style", R({}, s, { key: "sc-0-0" }))];
    }, this.seal = function() {
      t.sealed = !0;
    }, this.instance = new he({ isServer: !0 }), this.sealed = !1;
  }
  return e.prototype.collectStyles = function(t) {
    if (this.sealed) throw j(2);
    return C.createElement(Vr, { sheet: this.instance }, t);
  }, e.prototype.interleaveWithNodeStream = function(t) {
    throw j(3);
  }, e;
})(), pn = { StyleSheet: he, mainSheet: Zt };
export {
  ln as ServerStyleSheet,
  sn as StyleSheetConsumer,
  pt as StyleSheetContext,
  Vr as StyleSheetManager,
  on as ThemeConsumer,
  re as ThemeContext,
  cn as ThemeProvider,
  pn as __PRIVATE__,
  un as createGlobalStyle,
  dt as css,
  tn as default,
  ht as isStyledComponent,
  fn as keyframes,
  tn as styled,
  an as useTheme,
  ue as version,
  hn as withTheme
};
