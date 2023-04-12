parcelRequire = function(e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire,
            u = "function" == typeof require && require;

        function f(t, n) { if (!r[t]) { if (!e[t]) { var i = "function" == typeof parcelRequire && parcelRequire; if (!n && i) return i(t, !0); if (o) return o(t, !0); if (u && "string" == typeof t) return u(t); var c = new Error("Cannot find module '" + t + "'"); throw c.code = "MODULE_NOT_FOUND", c }
                p.resolve = function(r) { return e[t][1][r] || r }, p.cache = {}; var l = r[t] = new f.Module(t);
                e[t][0].call(l.exports, p, l, l.exports, this) } return r[t].exports;

            function p(e) { return f(p.resolve(e)) } }
        f.isParcelRequire = !0, f.Module = function(e) { this.id = e, this.bundle = f, this.exports = {} }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) { e[r] = [function(e, r) { r.exports = t }, {}] }; for (var c = 0; c < t.length; c++) try { f(t[c]) } catch (e) { i || (i = e) }
        if (t.length) { var l = f(t[t.length - 1]); "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() { return l }) : n && (this[n] = l) } if (parcelRequire = f, i) throw i; return f }({
        "HCq8": [function(require, module, exports) {
            var define;
            var global = arguments[3];
            var e, t = arguments[3];
            ! function(t, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof e && e.amd ? e(n) : (t = t || self).Alpine = n() }(this, function() { "use strict";

                function e(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

                function t(e, t) { var n = Object.keys(e); if (Object.getOwnPropertySymbols) { var i = Object.getOwnPropertySymbols(e);
                        t && (i = i.filter(function(t) { return Object.getOwnPropertyDescriptor(e, t).enumerable })), n.push.apply(n, i) } return n }

                function n(n) { for (var i = 1; i < arguments.length; i++) { var r = null != arguments[i] ? arguments[i] : {};
                        i % 2 ? t(Object(r), !0).forEach(function(t) { e(n, t, r[t]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r)) : t(Object(r)).forEach(function(e) { Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(r, e)) }) } return n }

                function i(e) { return Array.from(new Set(e)) }

                function r() { return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom") }

                function s(e, t) { return e == t }

                function o(e, t) { "template" !== e.tagName.toLowerCase() ? console.warn(`Alpine: [${t}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${t}`) : 1 !== e.content.childElementCount && console.warn(`Alpine: <template> tag with [${t}] encountered with an unexpected number of root elements. Make sure <template> has a single root element. `) }

                function a(e) { return e.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase()) }

                function l(e, t) { var n; return function() { var i = this,
                            r = arguments;
                        clearTimeout(n), n = setTimeout(function() { n = null, e.apply(i, r) }, t) } } const c = (e, t, n) => { if (console.warn(`Alpine Error: "${n}"\n\nExpression: "${t}"\nElement:`, e), !r()) throw Object.assign(n, { el: e, expression: t }), n };

                function u(e, { el: t, expression: n }) { try { const r = e(); return r instanceof Promise ? r.catch(e => c(t, n, e)) : r } catch (i) { c(t, n, i) } }

                function d(e, t, n, i = {}) { return u(() => "function" == typeof t ? t.call(n) : new Function(["$data", ...Object.keys(i)], `var __alpine_result; with($data) { __alpine_result = ${t} }; return __alpine_result`)(n, ...Object.values(i)), { el: e, expression: t }) } const f = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;

                function m(e) { const t = v(e.name); return f.test(t) }

                function p(e, t, n) { let i = Array.from(e.attributes).filter(m).map(h),
                        r = i.filter(e => "spread" === e.type)[0]; if (r) { let n = d(e, r.expression, t.$data);
                        i = i.concat(Object.entries(n).map(([e, t]) => h({ name: e, value: t }))) } return n ? i.filter(e => e.type === n) : function(e) { let t = ["bind", "model", "show", "catch-all"]; return e.sort((e, n) => { let i = -1 === t.indexOf(e.type) ? "catch-all" : e.type,
                                r = -1 === t.indexOf(n.type) ? "catch-all" : n.type; return t.indexOf(i) - t.indexOf(r) }) }(i) }

                function h({ name: e, value: t }) { const n = v(e),
                        i = n.match(f),
                        r = n.match(/:([a-zA-Z0-9\-:]+)/),
                        s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || []; return { type: i ? i[1] : null, value: r ? r[1] : null, modifiers: s.map(e => e.replace(".", "")), expression: t } }

                function v(e) { return e.startsWith("@") ? e.replace("@", "x-on:") : e.startsWith(":") ? e.replace(":", "x-bind:") : e }

                function y(e, t = Boolean) { return e.split(" ").filter(t) } const b = "in",
                    g = "out",
                    x = "cancelled";

                function _(e, t, n, i, r = !1) { if (r) return t(); if (e.__x_transition && e.__x_transition.type === b) return; const s = p(e, i, "transition"),
                        o = p(e, i, "show")[0]; if (o && o.modifiers.includes("transition")) { let i = o.modifiers; if (i.includes("out") && !i.includes("in")) return t(); const r = i.includes("in") && i.includes("out");
                        (function(e, t, n, i) { const r = { duration: E(t, "duration", 150), origin: E(t, "origin", "center"), first: { opacity: 0, scale: E(t, "scale", 95) }, second: { opacity: 1, scale: 100 } };
                            O(e, t, n, () => {}, i, r, b) })(e, i = r ? i.filter((e, t) => t < i.indexOf("out")) : i, t, n) } else s.some(e => ["enter", "enter-start", "enter-end"].includes(e.value)) ? function(e, t, n, i, r) { const s = y(k((n.find(e => "enter" === e.value) || { expression: "" }).expression, e, t)),
                            o = y(k((n.find(e => "enter-start" === e.value) || { expression: "" }).expression, e, t)),
                            a = y(k((n.find(e => "enter-end" === e.value) || { expression: "" }).expression, e, t));
                        A(e, s, o, a, i, () => {}, b, r) }(e, i, s, t, n) : t() }

                function w(e, t, n, i, r = !1) { if (r) return t(); if (e.__x_transition && e.__x_transition.type === g) return; const s = p(e, i, "transition"),
                        o = p(e, i, "show")[0]; if (o && o.modifiers.includes("transition")) { let i = o.modifiers; if (i.includes("in") && !i.includes("out")) return t(); const r = i.includes("in") && i.includes("out");
                        (function(e, t, n, i, r) { const s = { duration: n ? E(t, "duration", 150) : E(t, "duration", 150) / 2, origin: E(t, "origin", "center"), first: { opacity: 1, scale: 100 }, second: { opacity: 0, scale: E(t, "scale", 95) } };
                            O(e, t, () => {}, i, r, s, g) })(e, i = r ? i.filter((e, t) => t > i.indexOf("out")) : i, r, t, n) } else s.some(e => ["leave", "leave-start", "leave-end"].includes(e.value)) ? function(e, t, n, i, r) { const s = y(k((n.find(e => "leave" === e.value) || { expression: "" }).expression, e, t)),
                            o = y(k((n.find(e => "leave-start" === e.value) || { expression: "" }).expression, e, t)),
                            a = y(k((n.find(e => "leave-end" === e.value) || { expression: "" }).expression, e, t));
                        A(e, s, o, a, () => {}, i, g, r) }(e, i, s, t, n) : t() }

                function E(e, t, n) { if (-1 === e.indexOf(t)) return n; const i = e[e.indexOf(t) + 1]; if (!i) return n; if ("scale" === t && !$(i)) return n; if ("duration" === t) { let e = i.match(/([0-9]+)ms/); if (e) return e[1] } return "origin" === t && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [i, e[e.indexOf(t) + 2]].join(" ") : i }

                function O(e, t, n, i, r, s, o) { e.__x_transition && e.__x_transition.cancel && e.__x_transition.cancel(); const a = e.style.opacity,
                        l = e.style.transform,
                        c = e.style.transformOrigin,
                        u = !t.includes("opacity") && !t.includes("scale"),
                        d = u || t.includes("opacity"),
                        f = u || t.includes("scale"),
                        m = { start() { d && (e.style.opacity = s.first.opacity), f && (e.style.transform = `scale(${s.first.scale/100})`) }, during() { f && (e.style.transformOrigin = s.origin), e.style.transitionProperty = [d ? "opacity" : "", f ? "transform" : ""].join(" ").trim(), e.style.transitionDuration = `${s.duration/1e3}s`, e.style.transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)" }, show() { n() }, end() { d && (e.style.opacity = s.second.opacity), f && (e.style.transform = `scale(${s.second.scale/100})`) }, hide() { i() }, cleanup() { d && (e.style.opacity = a), f && (e.style.transform = l), f && (e.style.transformOrigin = c), e.style.transitionProperty = null, e.style.transitionDuration = null, e.style.transitionTimingFunction = null } };
                    S(e, m, o, r) } const k = (e, t, n) => "function" == typeof e ? n.evaluateReturnExpression(t, e) : e;

                function A(e, t, n, i, r, s, o, a) { e.__x_transition && e.__x_transition.cancel && e.__x_transition.cancel(); const l = e.__x_original_classes || [],
                        c = { start() { e.classList.add(...n) }, during() { e.classList.add(...t) }, show() { r() }, end() { e.classList.remove(...n.filter(e => !l.includes(e))), e.classList.add(...i) }, hide() { s() }, cleanup() { e.classList.remove(...t.filter(e => !l.includes(e))), e.classList.remove(...i.filter(e => !l.includes(e))) } };
                    S(e, c, o, a) }

                function S(e, t, n, i) { const r = P(() => { t.hide(), e.isConnected && t.cleanup(), delete e.__x_transition });
                    e.__x_transition = { type: n, cancel: P(() => { i(x), r() }), finish: r, nextFrame: null }, t.start(), t.during(), e.__x_transition.nextFrame = requestAnimationFrame(() => { let n = 1e3 * Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", ""));
                        0 === n && (n = 1e3 * Number(getComputedStyle(e).animationDuration.replace("s", ""))), t.show(), e.__x_transition.nextFrame = requestAnimationFrame(() => { t.end(), setTimeout(e.__x_transition.finish, n) }) }) }

                function $(e) { return !Array.isArray(e) && !isNaN(e) }

                function P(e) { let t = !1; return function() { t || (t = !0, e.apply(this, arguments)) } }

                function C(e, t, i, r, s) { o(t, "x-for"); let a = j("function" == typeof i ? e.evaluateReturnExpression(t, i) : i),
                        l = function(e, t, n, i) { let r = p(t, e, "if")[0]; if (r && !e.evaluateReturnExpression(t, r.expression)) return []; let s = e.evaluateReturnExpression(t, n.items, i);
                            $(s) && s >= 0 && (s = Array.from(Array(s).keys(), e => e + 1)); return s }(e, t, a, s),
                        c = t;
                    l.forEach((i, o) => { let u = function(e, t, i, r, s) { let o = s ? n({}, s) : {};
                                    o[e.item] = t, e.index && (o[e.index] = i);
                                    e.collection && (o[e.collection] = r); return o }(a, i, o, l, s()),
                                d = function(e, t, n, i) { let r = p(t, e, "bind").filter(e => "key" === e.value)[0]; return r ? e.evaluateReturnExpression(t, r.expression, () => i) : n }(e, t, o, u),
                                f = function(e, t) { if (!e) return; if (void 0 === e.__x_for_key) return; if (e.__x_for_key === t) return e; let n = e; for (; n;) { if (n.__x_for_key === t) return n.parentElement.insertBefore(n, e);
                                        n = !(!n.nextElementSibling || void 0 === n.nextElementSibling.__x_for_key) && n.nextElementSibling } }(c.nextElementSibling, d);
                            f ? (delete f.__x_for_key, f.__x_for = u, e.updateElements(f, () => f.__x_for)) : (_(f = function(e, t) { let n = document.importNode(e.content, !0); return t.parentElement.insertBefore(n, t.nextElementSibling), t.nextElementSibling }(t, c), () => {}, () => {}, e, r), f.__x_for = u, e.initializeElements(f, () => f.__x_for)), (c = f).__x_for_key = d }),
                        function(e, t) { var n = !(!e.nextElementSibling || void 0 === e.nextElementSibling.__x_for_key) && e.nextElementSibling; for (; n;) { let e = n,
                                    i = n.nextElementSibling;
                                w(n, () => { e.remove() }, () => {}, t), n = !(!i || void 0 === i.__x_for_key) && i } }(c, e) }

                function j(e) { let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                        n = String(e).match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/); if (!n) return; let i = {};
                    i.items = n[2].trim(); let r = n[1].trim().replace(/^\(|\)$/g, ""),
                        s = r.match(t); return s ? (i.item = r.replace(t, "").trim(), i.index = s[1].trim(), s[2] && (i.collection = s[2].trim())) : i.item = r, i }

                function D(e, t, n, r, o, l, c) { var u = e.evaluateReturnExpression(t, r, o); if ("value" === n) { if (be.ignoreFocusedForValueBinding && document.activeElement.isSameNode(t)) return; if (void 0 === u && String(r).match(/\./) && (u = ""), "radio" === t.type) void 0 === t.attributes.value && "bind" === l ? t.value = u : "bind" !== l && (t.checked = s(t.value, u));
                        else if ("checkbox" === t.type) "boolean" == typeof u || [null, void 0].includes(u) || "bind" !== l ? "bind" !== l && (Array.isArray(u) ? t.checked = u.some(e => s(e, t.value)) : t.checked = !!u) : t.value = String(u);
                        else if ("SELECT" === t.tagName) ! function(e, t) { const n = [].concat(t).map(e => e + "");
                            Array.from(e.options).forEach(e => { e.selected = n.includes(e.value || e.text) }) }(t, u);
                        else { if (t.value === u) return;
                            t.value = u } } else if ("class" === n)
                        if (Array.isArray(u)) { const e = t.__x_original_classes || [];
                            t.setAttribute("class", i(e.concat(u)).join(" ")) } else if ("object" == typeof u) { Object.keys(u).sort((e, t) => u[e] - u[t]).forEach(e => { u[e] ? y(e).forEach(e => t.classList.add(e)) : y(e).forEach(e => t.classList.remove(e)) }) } else { const e = t.__x_original_classes || [],
                            n = u ? y(u) : [];
                        t.setAttribute("class", i(e.concat(n)).join(" ")) } else n = c.includes("camel") ? a(n) : n, [null, void 0, !1].includes(u) ? t.removeAttribute(n) : ! function(e) { return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e) }(n) ? T(t, n, u) : T(t, n, n) }

                function T(e, t, n) { e.getAttribute(t) != n && e.setAttribute(t, n) }

                function L(e, t, n, i, r, s = {}) { const o = { passive: i.includes("passive") }; let c, u; if (i.includes("camel") && (n = a(n)), i.includes("away") ? (u = document, c = (a => { t.contains(a.target) || t.offsetWidth < 1 && t.offsetHeight < 1 || (N(e, r, a, s), i.includes("once") && document.removeEventListener(n, c, o)) })) : (u = i.includes("window") ? window : i.includes("document") ? document : t, c = (a => { if (u !== window && u !== document || document.body.contains(t)) { if (!(function(e) { return ["keydown", "keyup"].includes(e) }(n) && function(e, t) { let n = t.filter(e => !["window", "document", "prevent", "stop"].includes(e)); if (n.includes("debounce")) { let e = n.indexOf("debounce");
                                            n.splice(e, $((n[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1) } if (0 === n.length) return !1; if (1 === n.length && n[0] === z(e.key)) return !1; const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(e => n.includes(e)); if (n = n.filter(e => !i.includes(e)), i.length > 0) { const t = i.filter(t => ("cmd" !== t && "super" !== t || (t = "meta"), e[`${t}Key`])); if (t.length === i.length && n[0] === z(e.key)) return !1 } return !0 }(a, i) || (i.includes("prevent") && a.preventDefault(), i.includes("stop") && a.stopPropagation(), i.includes("self") && a.target !== t))) { N(e, r, a, s).then(e => {!1 === e ? a.preventDefault() : i.includes("once") && u.removeEventListener(n, c, o) }) } } else u.removeEventListener(n, c, o) })), i.includes("debounce")) { let e = i[i.indexOf("debounce") + 1] || "invalid-wait",
                            t = $(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
                        c = l(c, t) }
                    u.addEventListener(n, c, o) }

                function N(e, t, i, r) { return e.evaluateCommandExpression(i.target, t, () => n(n({}, r()), {}, { $event: i })) }

                function z(e) { switch (e) {
                        case "/":
                            return "slash";
                        case " ":
                        case "Spacebar":
                            return "space";
                        default:
                            return e && e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase() } }

                function R(e, t, n) { return "radio" === e.type && (e.hasAttribute("name") || e.setAttribute("name", n)), (n, i) => { if (n instanceof CustomEvent && n.detail) return n.detail; if ("checkbox" === e.type) { if (Array.isArray(i)) { const e = t.includes("number") ? F(n.target.value) : n.target.value; return n.target.checked ? i.concat([e]) : i.filter(t => !s(t, e)) } return n.target.checked } if ("select" === e.tagName.toLowerCase() && e.multiple) return t.includes("number") ? Array.from(n.target.selectedOptions).map(e => { return F(e.value || e.text) }) : Array.from(n.target.selectedOptions).map(e => e.value || e.text); { const e = n.target.value; return t.includes("number") ? F(e) : t.includes("trim") ? e.trim() : e } } }

                function F(e) { const t = e ? parseFloat(e) : null; return $(t) ? t : e } const { isArray: I } = Array, { getPrototypeOf: M, create: B, defineProperty: q, defineProperties: U, isExtensible: W, getOwnPropertyDescriptor: K, getOwnPropertyNames: G, getOwnPropertySymbols: H, preventExtensions: V, hasOwnProperty: Z } = Object, { push: J, concat: Q, map: X } = Array.prototype;

                function Y(e) { return void 0 === e }

                function ee(e) { return "function" == typeof e } const te = new WeakMap;

                function ne(e, t) { te.set(e, t) } const ie = e => te.get(e) || e;

                function re(e, t) { return e.valueIsObservable(t) ? e.getProxy(t) : t }

                function se(e, t, n) { Q.call(G(n), H(n)).forEach(i => { let r = K(n, i);
                        r.configurable || (r = he(e, r, re)), q(t, i, r) }), V(t) }
                class oe { constructor(e, t) { this.originalTarget = t, this.membrane = e }
                    get(e, t) { const { originalTarget: n, membrane: i } = this, r = n[t], { valueObserved: s } = i; return s(n, t), i.getProxy(r) }
                    set(e, t, n) { const { originalTarget: i, membrane: { valueMutated: r } } = this; return i[t] !== n ? (i[t] = n, r(i, t)) : "length" === t && I(i) && r(i, t), !0 }
                    deleteProperty(e, t) { const { originalTarget: n, membrane: { valueMutated: i } } = this; return delete n[t], i(n, t), !0 }
                    apply(e, t, n) {}
                    construct(e, t, n) {}
                    has(e, t) { const { originalTarget: n, membrane: { valueObserved: i } } = this; return i(n, t), t in n }
                    ownKeys(e) { const { originalTarget: t } = this; return Q.call(G(t), H(t)) }
                    isExtensible(e) { const t = W(e); if (!t) return t; const { originalTarget: n, membrane: i } = this, r = W(n); return r || se(i, e, n), r }
                    setPrototypeOf(e, t) {}
                    getPrototypeOf(e) { const { originalTarget: t } = this; return M(t) }
                    getOwnPropertyDescriptor(e, t) { const { originalTarget: n, membrane: i } = this, { valueObserved: r } = this.membrane;
                        r(n, t); let s = K(n, t); if (Y(s)) return s; const o = K(e, t); return Y(o) ? ((s = he(i, s, re)).configurable || q(e, t, s), s) : o }
                    preventExtensions(e) { const { originalTarget: t, membrane: n } = this; return se(n, e, t), V(t), !0 }
                    defineProperty(e, t, n) { const { originalTarget: i, membrane: r } = this, { valueMutated: s } = r, { configurable: o } = n; if (Z.call(n, "writable") && !Z.call(n, "value")) { const e = K(i, t);
                            n.value = e.value } return q(i, t, function(e) { return Z.call(e, "value") && (e.value = ie(e.value)), e }(n)), !1 === o && q(e, t, he(r, n, re)), s(i, t), !0 } }

                function ae(e, t) { return e.valueIsObservable(t) ? e.getReadOnlyProxy(t) : t }
                class le { constructor(e, t) { this.originalTarget = t, this.membrane = e }
                    get(e, t) { const { membrane: n, originalTarget: i } = this, r = i[t], { valueObserved: s } = n; return s(i, t), n.getReadOnlyProxy(r) }
                    set(e, t, n) { return !1 }
                    deleteProperty(e, t) { return !1 }
                    apply(e, t, n) {}
                    construct(e, t, n) {}
                    has(e, t) { const { originalTarget: n, membrane: { valueObserved: i } } = this; return i(n, t), t in n }
                    ownKeys(e) { const { originalTarget: t } = this; return Q.call(G(t), H(t)) }
                    setPrototypeOf(e, t) {}
                    getOwnPropertyDescriptor(e, t) { const { originalTarget: n, membrane: i } = this, { valueObserved: r } = i;
                        r(n, t); let s = K(n, t); if (Y(s)) return s; const o = K(e, t); return Y(o) ? (s = he(i, s, ae), Z.call(s, "set") && (s.set = void 0), s.configurable || q(e, t, s), s) : o }
                    preventExtensions(e) { return !1 }
                    defineProperty(e, t, n) { return !1 } }

                function ce(e) { let t = void 0; return I(e) ? t = [] : "object" == typeof e && (t = {}), t } const ue = Object.prototype;

                function de(e) { if (null === e) return !1; if ("object" != typeof e) return !1; if (I(e)) return !0; const t = M(e); return t === ue || null === t || null === M(t) } const fe = (e, t) => {},
                    me = (e, t) => {},
                    pe = e => e;

                function he(e, t, n) { const { set: i, get: r } = t; return Z.call(t, "value") ? t.value = n(e, t.value) : (Y(r) || (t.get = function() { return n(e, r.call(ie(this))) }), Y(i) || (t.set = function(t) { i.call(ie(this), e.unwrapProxy(t)) })), t }
                class ve { constructor(e) { if (this.valueDistortion = pe, this.valueMutated = me, this.valueObserved = fe, this.valueIsObservable = de, this.objectGraph = new WeakMap, !Y(e)) { const { valueDistortion: t, valueMutated: n, valueObserved: i, valueIsObservable: r } = e;
                            this.valueDistortion = ee(t) ? t : pe, this.valueMutated = ee(n) ? n : me, this.valueObserved = ee(i) ? i : fe, this.valueIsObservable = ee(r) ? r : de } }
                    getProxy(e) { const t = ie(e),
                            n = this.valueDistortion(t); if (this.valueIsObservable(n)) { const i = this.getReactiveState(t, n); return i.readOnly === e ? e : i.reactive } return n }
                    getReadOnlyProxy(e) { e = ie(e); const t = this.valueDistortion(e); return this.valueIsObservable(t) ? this.getReactiveState(e, t).readOnly : t }
                    unwrapProxy(e) { return ie(e) }
                    getReactiveState(e, t) { const { objectGraph: n } = this; let i = n.get(t); if (i) return i; const r = this; return i = {get reactive() { const n = new oe(r, t),
                                    i = new Proxy(ce(t), n); return ne(i, e), q(this, "reactive", { value: i }), i }, get readOnly() { const n = new le(r, t),
                                    i = new Proxy(ce(t), n); return ne(i, e), q(this, "readOnly", { value: i }), i } }, n.set(t, i), i } }
                class ye { constructor(e, t = null) { this.$el = e; const n = this.$el.getAttribute("x-data"),
                            i = "" === n ? "{}" : n,
                            r = this.$el.getAttribute("x-init"); let s = { $el: this.$el },
                            o = t ? t.$el : this.$el;
                        Object.entries(be.magicProperties).forEach(([e, t]) => { Object.defineProperty(s, `$${e}`, { get: function() { return t(o) } }) }), this.unobservedData = t ? t.getUnobservedData() : d(e, i, s); let { membrane: a, data: l } = this.wrapDataInObservable(this.unobservedData); var c;
                        this.$data = l, this.membrane = a, this.unobservedData.$el = this.$el, this.unobservedData.$refs = this.getRefsProxy(), this.nextTickStack = [], this.unobservedData.$nextTick = (e => { this.nextTickStack.push(e) }), this.watchers = {}, this.unobservedData.$watch = ((e, t) => { this.watchers[e] || (this.watchers[e] = []), this.watchers[e].push(t) }), Object.entries(be.magicProperties).forEach(([e, t]) => { Object.defineProperty(this.unobservedData, `$${e}`, { get: function() { return t(o, this.$el) } }) }), this.showDirectiveStack = [], this.showDirectiveLastElement, t || be.onBeforeComponentInitializeds.forEach(e => e(this)), r && !t && (this.pauseReactivity = !0, c = this.evaluateReturnExpression(this.$el, r), this.pauseReactivity = !1), this.initializeElements(this.$el, () => {}, !t), this.listenForNewElementsToInitialize(), "function" == typeof c && c.call(this.$data), t || setTimeout(() => { be.onComponentInitializeds.forEach(e => e(this)) }, 0) }
                    getUnobservedData() { return function(e, t) { let n = e.unwrapProxy(t),
                                i = {}; return Object.keys(n).forEach(e => {
                                ["$el", "$refs", "$nextTick", "$watch"].includes(e) || (i[e] = n[e]) }), i }(this.membrane, this.$data) }
                    wrapDataInObservable(e) { var t = this; let n = l(function() { t.updateElements(t.$el) }, 0); return function(e, t) { let n = new ve({ valueMutated(e, n) { t(e, n) } }); return { data: n.getProxy(e), membrane: n } }(e, (e, i) => { t.watchers[i] ? t.watchers[i].forEach(t => t(e[i])) : Array.isArray(e) ? Object.keys(t.watchers).forEach(n => { let r = n.split("."); "length" !== i && r.reduce((i, r) => (Object.is(e, i[r]) && t.watchers[n].forEach(t => t(e)), i[r]), t.unobservedData) }) : Object.keys(t.watchers).filter(e => e.includes(".")).forEach(n => { let r = n.split(".");
                                i === r[r.length - 1] && r.reduce((r, s) => (Object.is(e, r) && t.watchers[n].forEach(t => t(e[i])), r[s]), t.unobservedData) }), t.pauseReactivity || n() }) }
                    walkAndSkipNestedComponents(e, t, n = (() => {})) {! function e(t, n) { if (!1 === n(t)) return; let i = t.firstElementChild; for (; i;) e(i, n), i = i.nextElementSibling }(e, e => e.hasAttribute("x-data") && !e.isSameNode(this.$el) ? (e.__x || n(e), !1) : t(e)) }
                    initializeElements(e, t = (() => {}), n = !0) { this.walkAndSkipNestedComponents(e, e => void 0 === e.__x_for_key && (void 0 === e.__x_inserted_me && void this.initializeElement(e, t, n)), e => { e.__x = new ye(e) }), this.executeAndClearRemainingShowDirectiveStack(), this.executeAndClearNextTickStack(e) }
                    initializeElement(e, t, n = !0) { e.hasAttribute("class") && p(e, this).length > 0 && (e.__x_original_classes = y(e.getAttribute("class"))), n && this.registerListeners(e, t), this.resolveBoundAttributes(e, !0, t) }
                    updateElements(e, t = (() => {})) { this.walkAndSkipNestedComponents(e, e => { if (void 0 !== e.__x_for_key && !e.isSameNode(this.$el)) return !1;
                            this.updateElement(e, t) }, e => { e.__x = new ye(e) }), this.executeAndClearRemainingShowDirectiveStack(), this.executeAndClearNextTickStack(e) }
                    executeAndClearNextTickStack(e) { e === this.$el && this.nextTickStack.length > 0 && requestAnimationFrame(() => { for (; this.nextTickStack.length > 0;) this.nextTickStack.shift()() }) }
                    executeAndClearRemainingShowDirectiveStack() { this.showDirectiveStack.reverse().map(e => new Promise((t, n) => { e(t, n) })).reduce((e, t) => e.then(() => t.then(e => { e() })), Promise.resolve(() => {})).catch(e => { if (e !== x) throw e }), this.showDirectiveStack = [], this.showDirectiveLastElement = void 0 }
                    updateElement(e, t) { this.resolveBoundAttributes(e, !1, t) }
                    registerListeners(e, t) { p(e, this).forEach(({ type: i, value: r, modifiers: s, expression: o }) => { switch (i) {
                                case "on":
                                    L(this, e, r, s, o, t); break;
                                case "model":
                                    ! function(e, t, i, r, s) { var o = "select" === t.tagName.toLowerCase() || ["checkbox", "radio"].includes(t.type) || i.includes("lazy") ? "change" : "input";
                                        L(e, t, o, i, `${r} = rightSideOfExpression($event, ${r})`, () => n(n({}, s()), {}, { rightSideOfExpression: R(t, i, r) })) }(this, e, s, o, t) } }) }
                    resolveBoundAttributes(e, t = !1, n) { let i = p(e, this);
                        i.forEach(({ type: r, value: s, modifiers: a, expression: l }) => { switch (r) {
                                case "model":
                                    D(this, e, "value", l, n, r, a); break;
                                case "bind":
                                    if ("template" === e.tagName.toLowerCase() && "key" === s) return;
                                    D(this, e, s, l, n, r, a); break;
                                case "text":
                                    var c = this.evaluateReturnExpression(e, l, n);! function(e, t, n) { void 0 === t && String(n).match(/\./) && (t = ""), e.textContent = t }(e, c, l); break;
                                case "html":
                                    ! function(e, t, n, i) { t.innerHTML = e.evaluateReturnExpression(t, n, i) }(this, e, l, n); break;
                                case "show":
                                    c = this.evaluateReturnExpression(e, l, n);! function(e, t, n, i, r = !1) { const s = () => { t.style.display = "none", t.__x_is_shown = !1 },
                                            o = () => { 1 === t.style.length && "none" === t.style.display ? t.removeAttribute("style") : t.style.removeProperty("display"), t.__x_is_shown = !0 }; if (!0 === r) return void(n ? o() : s()); const a = (i, r) => { n ? (("none" === t.style.display || t.__x_transition) && _(t, () => { o() }, r, e), i(() => {})) : "none" !== t.style.display ? w(t, () => { i(() => { s() }) }, r, e) : i(() => {}) };
                                        i.includes("immediate") ? a(e => e(), () => {}) : (e.showDirectiveLastElement && !e.showDirectiveLastElement.contains(t) && e.executeAndClearRemainingShowDirectiveStack(), e.showDirectiveStack.push(a), e.showDirectiveLastElement = t) }(this, e, c, a, t); break;
                                case "if":
                                    if (i.some(e => "for" === e.type)) return;
                                    c = this.evaluateReturnExpression(e, l, n);! function(e, t, n, i, r) { o(t, "x-if"); const s = t.nextElementSibling && !0 === t.nextElementSibling.__x_inserted_me; if (!n || s && !t.__x_transition) !n && s && w(t.nextElementSibling, () => { t.nextElementSibling.remove() }, () => {}, e, i);
                                        else { const n = document.importNode(t.content, !0);
                                            t.parentElement.insertBefore(n, t.nextElementSibling), _(t.nextElementSibling, () => {}, () => {}, e, i), e.initializeElements(t.nextElementSibling, r), t.nextElementSibling.__x_inserted_me = !0 } }(this, e, c, t, n); break;
                                case "for":
                                    C(this, e, l, t, n); break;
                                case "cloak":
                                    e.removeAttribute("x-cloak") } }) }
                    evaluateReturnExpression(e, t, i = (() => {})) { return d(e, t, this.$data, n(n({}, i()), {}, { $dispatch: this.getDispatchFunction(e) })) }
                    evaluateCommandExpression(e, t, i = (() => {})) { return function(e, t, n, i = {}) { return u(() => { if ("function" == typeof t) return Promise.resolve(t.call(n, i.$event)); let e = Function; if (e = Object.getPrototypeOf(async function() {}).constructor, Object.keys(n).includes(t)) { let e = new Function(["dataContext", ...Object.keys(i)], `with(dataContext) { return ${t} }`)(n, ...Object.values(i)); return "function" == typeof e ? Promise.resolve(e.call(n, i.$event)) : Promise.resolve() } return Promise.resolve(new e(["dataContext", ...Object.keys(i)], `with(dataContext) { ${t} }`)(n, ...Object.values(i))) }, { el: e, expression: t }) }(e, t, this.$data, n(n({}, i()), {}, { $dispatch: this.getDispatchFunction(e) })) }
                    getDispatchFunction(e) { return (t, n = {}) => { e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0 })) } }
                    listenForNewElementsToInitialize() { const e = this.$el;
                        new MutationObserver(e => { for (let t = 0; t < e.length; t++) { const n = e[t].target.closest("[x-data]"); if (n && n.isSameNode(this.$el)) { if ("attributes" === e[t].type && "x-data" === e[t].attributeName) { const n = e[t].target.getAttribute("x-data") || "{}",
                                            i = d(this.$el, n, { $el: this.$el });
                                        Object.keys(i).forEach(e => { this.$data[e] !== i[e] && (this.$data[e] = i[e]) }) }
                                    e[t].addedNodes.length > 0 && e[t].addedNodes.forEach(e => { 1 !== e.nodeType || e.__x_inserted_me || (!e.matches("[x-data]") || e.__x ? this.initializeElements(e) : e.__x = new ye(e)) }) } } }).observe(e, { childList: !0, attributes: !0, subtree: !0 }) }
                    getRefsProxy() { var e = this; return new Proxy({}, {get(t, n) { return "$isAlpineProxy" === n || (e.walkAndSkipNestedComponents(e.$el, e => { e.hasAttribute("x-ref") && e.getAttribute("x-ref") === n && (i = e) }), i); var i } }) } } const be = { version: "2.8.1", pauseMutationObserver: !1, magicProperties: {}, onComponentInitializeds: [], onBeforeComponentInitializeds: [], ignoreFocusedForValueBinding: !1, start: async function() { r() || await new Promise(e => { "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", e) : e() }), this.discoverComponents(e => { this.initializeComponent(e) }), document.addEventListener("turbolinks:load", () => { this.discoverUninitializedComponents(e => { this.initializeComponent(e) }) }), this.listenForNewUninitializedComponentsAtRunTime() }, discoverComponents: function(e) { document.querySelectorAll("[x-data]").forEach(t => { e(t) }) }, discoverUninitializedComponents: function(e, t = null) { const n = (t || document).querySelectorAll("[x-data]");
                        Array.from(n).filter(e => void 0 === e.__x).forEach(t => { e(t) }) }, listenForNewUninitializedComponentsAtRunTime: function() { const e = document.querySelector("body");
                        new MutationObserver(e => { if (!this.pauseMutationObserver)
                                for (let t = 0; t < e.length; t++) e[t].addedNodes.length > 0 && e[t].addedNodes.forEach(e => { 1 === e.nodeType && (e.parentElement && e.parentElement.closest("[x-data]") || this.discoverUninitializedComponents(e => { this.initializeComponent(e) }, e.parentElement)) }) }).observe(e, { childList: !0, attributes: !0, subtree: !0 }) }, initializeComponent: function(e) { if (!e.__x) try { e.__x = new ye(e) } catch (t) { setTimeout(() => { throw t }, 0) } }, clone: function(e, t) { t.__x || (t.__x = new ye(t, e)) }, addMagicProperty: function(e, t) { this.magicProperties[e] = t }, onComponentInitialized: function(e) { this.onComponentInitializeds.push(e) }, onBeforeComponentInitialized: function(e) { this.onBeforeComponentInitializeds.push(e) } }; return r() || (window.Alpine = be, window.deferLoadingAlpine ? window.deferLoadingAlpine(function() { window.Alpine.start() }) : window.Alpine.start()), be });
        }, {}],
        "EDTP": [function(require, module, exports) {
            "use strict";
            module.exports = function(r, n) { return function() { for (var t = new Array(arguments.length), e = 0; e < t.length; e++) t[e] = arguments[e]; return r.apply(n, t) } };
        }, {}],
        "S1cf": [function(require, module, exports) {
            "use strict";
            var r = require("./helpers/bind"),
                t = Object.prototype.toString;

            function n(r) { return "[object Array]" === t.call(r) }

            function e(r) { return void 0 === r }

            function o(r) { return null !== r && !e(r) && null !== r.constructor && !e(r.constructor) && "function" == typeof r.constructor.isBuffer && r.constructor.isBuffer(r) }

            function i(r) { return "[object ArrayBuffer]" === t.call(r) }

            function u(r) { return "undefined" != typeof FormData && r instanceof FormData }

            function c(r) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(r) : r && r.buffer && r.buffer instanceof ArrayBuffer }

            function f(r) { return "string" == typeof r }

            function a(r) { return "number" == typeof r }

            function l(r) { return null !== r && "object" == typeof r }

            function s(r) { if ("[object Object]" !== t.call(r)) return !1; var n = Object.getPrototypeOf(r); return null === n || n === Object.prototype }

            function p(r) { return "[object Date]" === t.call(r) }

            function d(r) { return "[object File]" === t.call(r) }

            function y(r) { return "[object Blob]" === t.call(r) }

            function b(r) { return "[object Function]" === t.call(r) }

            function j(r) { return l(r) && b(r.pipe) }

            function v(r) { return "undefined" != typeof URLSearchParams && r instanceof URLSearchParams }

            function B(r) { return r.replace(/^\s*/, "").replace(/\s*$/, "") }

            function m() { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document) }

            function g(r, t) { if (null != r)
                    if ("object" != typeof r && (r = [r]), n(r))
                        for (var e = 0, o = r.length; e < o; e++) t.call(null, r[e], e, r);
                    else
                        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && t.call(null, r[i], i, r) }

            function A() { var r = {};

                function t(t, e) { s(r[e]) && s(t) ? r[e] = A(r[e], t) : s(t) ? r[e] = A({}, t) : n(t) ? r[e] = t.slice() : r[e] = t } for (var e = 0, o = arguments.length; e < o; e++) g(arguments[e], t); return r }

            function O(t, n, e) { return g(n, function(n, o) { t[o] = e && "function" == typeof n ? r(n, e) : n }), t }

            function h(r) { return 65279 === r.charCodeAt(0) && (r = r.slice(1)), r }
            module.exports = { isArray: n, isArrayBuffer: i, isBuffer: o, isFormData: u, isArrayBufferView: c, isString: f, isNumber: a, isObject: l, isPlainObject: s, isUndefined: e, isDate: p, isFile: d, isBlob: y, isFunction: b, isStream: j, isURLSearchParams: v, isStandardBrowserEnv: m, forEach: g, merge: A, extend: O, trim: B, stripBOM: h };
        }, { "./helpers/bind": "EDTP" }],
        "H6Qo": [function(require, module, exports) {
            "use strict";
            var e = require("../utils");

            function r(e) { return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }
            module.exports = function(i, n, t) { if (!n) return i; var a; if (t) a = t(n);
                else if (e.isURLSearchParams(n)) a = n.toString();
                else { var c = [];
                    e.forEach(n, function(i, n) { null != i && (e.isArray(i) ? n += "[]" : i = [i], e.forEach(i, function(i) { e.isDate(i) ? i = i.toISOString() : e.isObject(i) && (i = JSON.stringify(i)), c.push(r(n) + "=" + r(i)) })) }), a = c.join("&") } if (a) { var o = i.indexOf("#"); - 1 !== o && (i = i.slice(0, o)), i += (-1 === i.indexOf("?") ? "?" : "&") + a } return i };
        }, { "./../utils": "S1cf" }],
        "rj2i": [function(require, module, exports) {
            "use strict";
            var t = require("../utils");

            function e() { this.handlers = [] }
            e.prototype.use = function(t, e) { return this.handlers.push({ fulfilled: t, rejected: e }), this.handlers.length - 1 }, e.prototype.eject = function(t) { this.handlers[t] && (this.handlers[t] = null) }, e.prototype.forEach = function(e) { t.forEach(this.handlers, function(t) { null !== t && e(t) }) }, module.exports = e;
        }, { "./../utils": "S1cf" }],
        "woEt": [function(require, module, exports) {
            "use strict";
            var r = require("../utils");
            module.exports = function(t, u, e) { return r.forEach(e, function(r) { t = r(t, u) }), t };
        }, { "./../utils": "S1cf" }],
        "V30M": [function(require, module, exports) {
            "use strict";
            module.exports = function(t) { return !(!t || !t.__CANCEL__) };
        }, {}],
        "M8l6": [function(require, module, exports) {
            "use strict";
            var e = require("../utils");
            module.exports = function(t, r) { e.forEach(t, function(e, o) { o !== r && o.toUpperCase() === r.toUpperCase() && (t[r] = e, delete t[o]) }) };
        }, { "../utils": "S1cf" }],
        "YdsM": [function(require, module, exports) {
            "use strict";
            module.exports = function(e, i, s, t, n) { return e.config = i, s && (e.code = s), e.request = t, e.response = n, e.isAxiosError = !0, e.toJSON = function() { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code } }, e };
        }, {}],
        "bIiH": [function(require, module, exports) {
            "use strict";
            var r = require("./enhanceError");
            module.exports = function(e, n, o, t, u) { var a = new Error(e); return r(a, n, o, t, u) };
        }, { "./enhanceError": "YdsM" }],
        "aS8y": [function(require, module, exports) {
            "use strict";
            var t = require("./createError");
            module.exports = function(e, s, u) { var a = u.config.validateStatus;
                u.status && a && !a(u.status) ? s(t("Request failed with status code " + u.status, u.config, null, u.request, u)) : e(u) };
        }, { "./createError": "bIiH" }],
        "dn2M": [function(require, module, exports) {
            "use strict";
            var e = require("../utils");
            module.exports = e.isStandardBrowserEnv() ? { write: function(n, t, o, r, i, u) { var s = [];
                    s.push(n + "=" + encodeURIComponent(t)), e.isNumber(o) && s.push("expires=" + new Date(o).toGMTString()), e.isString(r) && s.push("path=" + r), e.isString(i) && s.push("domain=" + i), !0 === u && s.push("secure"), document.cookie = s.join("; ") }, read: function(e) { var n = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return n ? decodeURIComponent(n[3]) : null }, remove: function(e) { this.write(e, "", Date.now() - 864e5) } } : { write: function() {}, read: function() { return null }, remove: function() {} };
        }, { "./../utils": "S1cf" }],
        "YZjV": [function(require, module, exports) {
            "use strict";
            module.exports = function(t) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t) };
        }, {}],
        "a2Uu": [function(require, module, exports) {
            "use strict";
            module.exports = function(e, r) { return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e };
        }, {}],
        "KxkP": [function(require, module, exports) {
            "use strict";
            var e = require("../helpers/isAbsoluteURL"),
                r = require("../helpers/combineURLs");
            module.exports = function(s, u) { return s && !e(u) ? r(s, u) : u };
        }, { "../helpers/isAbsoluteURL": "YZjV", "../helpers/combineURLs": "a2Uu" }],
        "ZeD7": [function(require, module, exports) {
            "use strict";
            var e = require("../utils"),
                t = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            module.exports = function(r) { var i, o, n, s = {}; return r ? (e.forEach(r.split("\n"), function(r) { if (n = r.indexOf(":"), i = e.trim(r.substr(0, n)).toLowerCase(), o = e.trim(r.substr(n + 1)), i) { if (s[i] && t.indexOf(i) >= 0) return;
                        s[i] = "set-cookie" === i ? (s[i] ? s[i] : []).concat([o]) : s[i] ? s[i] + ", " + o : o } }), s) : s };
        }, { "./../utils": "S1cf" }],
        "w7LF": [function(require, module, exports) {
            "use strict";
            var t = require("../utils");
            module.exports = t.isStandardBrowserEnv() ? function() { var r, e = /(msie|trident)/i.test(navigator.userAgent),
                    o = document.createElement("a");

                function a(t) { var r = t; return e && (o.setAttribute("href", r), r = o.href), o.setAttribute("href", r), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname } } return r = a(window.location.href),
                    function(e) { var o = t.isString(e) ? a(e) : e; return o.protocol === r.protocol && o.host === r.host } }() : function() { return !0 };
        }, { "./../utils": "S1cf" }],
        "KRuG": [function(require, module, exports) {
            "use strict";
            var e = require("../utils"),
                r = require("../core/settle"),
                t = require("../helpers/cookies"),
                s = require("../helpers/buildURL"),
                o = require("../core/buildFullPath"),
                n = require("../helpers/parseHeaders"),
                a = require("../helpers/isURLSameOrigin"),
                i = require("../core/createError");
            module.exports = function(u) { return new Promise(function(l, d) { var p = u.data,
                        c = u.headers;
                    e.isFormData(p) && delete c["Content-Type"]; var f = new XMLHttpRequest; if (u.auth) { var h = u.auth.username || "",
                            m = u.auth.password ? unescape(encodeURIComponent(u.auth.password)) : "";
                        c.Authorization = "Basic " + btoa(h + ":" + m) } var w = o(u.baseURL, u.url); if (f.open(u.method.toUpperCase(), s(w, u.params, u.paramsSerializer), !0), f.timeout = u.timeout, f.onreadystatechange = function() { if (f && 4 === f.readyState && (0 !== f.status || f.responseURL && 0 === f.responseURL.indexOf("file:"))) { var e = "getAllResponseHeaders" in f ? n(f.getAllResponseHeaders()) : null,
                                    t = { data: u.responseType && "text" !== u.responseType ? f.response : f.responseText, status: f.status, statusText: f.statusText, headers: e, config: u, request: f };
                                r(l, d, t), f = null } }, f.onabort = function() { f && (d(i("Request aborted", u, "ECONNABORTED", f)), f = null) }, f.onerror = function() { d(i("Network Error", u, null, f)), f = null }, f.ontimeout = function() { var e = "timeout of " + u.timeout + "ms exceeded";
                            u.timeoutErrorMessage && (e = u.timeoutErrorMessage), d(i(e, u, "ECONNABORTED", f)), f = null }, e.isStandardBrowserEnv()) { var R = (u.withCredentials || a(w)) && u.xsrfCookieName ? t.read(u.xsrfCookieName) : void 0;
                        R && (c[u.xsrfHeaderName] = R) } if ("setRequestHeader" in f && e.forEach(c, function(e, r) { void 0 === p && "content-type" === r.toLowerCase() ? delete c[r] : f.setRequestHeader(r, e) }), e.isUndefined(u.withCredentials) || (f.withCredentials = !!u.withCredentials), u.responseType) try { f.responseType = u.responseType } catch (T) { if ("json" !== u.responseType) throw T }
                    "function" == typeof u.onDownloadProgress && f.addEventListener("progress", u.onDownloadProgress), "function" == typeof u.onUploadProgress && f.upload && f.upload.addEventListener("progress", u.onUploadProgress), u.cancelToken && u.cancelToken.promise.then(function(e) { f && (f.abort(), d(e), f = null) }), p || (p = null), f.send(p) }) };
        }, { "./../utils": "S1cf", "./../core/settle": "aS8y", "./../helpers/cookies": "dn2M", "./../helpers/buildURL": "H6Qo", "../core/buildFullPath": "KxkP", "./../helpers/parseHeaders": "ZeD7", "./../helpers/isURLSameOrigin": "w7LF", "../core/createError": "bIiH" }],
        "pBGv": [function(require, module, exports) {

            var t, e, n = module.exports = {};

            function r() { throw new Error("setTimeout has not been defined") }

            function o() { throw new Error("clearTimeout has not been defined") }

            function i(e) { if (t === setTimeout) return setTimeout(e, 0); if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0); try { return t(e, 0) } catch (n) { try { return t.call(null, e, 0) } catch (n) { return t.call(this, e, 0) } } }

            function u(t) { if (e === clearTimeout) return clearTimeout(t); if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t); try { return e(t) } catch (n) { try { return e.call(null, t) } catch (n) { return e.call(this, t) } } }! function() { try { t = "function" == typeof setTimeout ? setTimeout : r } catch (n) { t = r } try { e = "function" == typeof clearTimeout ? clearTimeout : o } catch (n) { e = o } }();
            var c, s = [],
                l = !1,
                a = -1;

            function f() { l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h()) }

            function h() { if (!l) { var t = i(f);
                    l = !0; for (var e = s.length; e;) { for (c = s, s = []; ++a < e;) c && c[a].run();
                        a = -1, e = s.length }
                    c = null, l = !1, u(t) } }

            function m(t, e) { this.fun = t, this.array = e }

            function p() {}
            n.nextTick = function(t) { var e = new Array(arguments.length - 1); if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                s.push(new m(t, e)), 1 !== s.length || l || i(h) }, m.prototype.run = function() { this.fun.apply(null, this.array) }, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function(t) { return [] }, n.binding = function(t) { throw new Error("process.binding is not supported") }, n.cwd = function() { return "/" }, n.chdir = function(t) { throw new Error("process.chdir is not supported") }, n.umask = function() { return 0 };
        }, {}],
        "BXyq": [function(require, module, exports) {
            var process = require("process");
            var e = require("process"),
                t = require("./utils"),
                r = require("./helpers/normalizeHeaderName"),
                n = { "Content-Type": "application/x-www-form-urlencoded" };

            function a(e, r) {!t.isUndefined(e) && t.isUndefined(e["Content-Type"]) && (e["Content-Type"] = r) }

            function i() { var t; return "undefined" != typeof XMLHttpRequest ? t = require("./adapters/xhr") : void 0 !== e && "[object process]" === Object.prototype.toString.call(e) && (t = require("./adapters/http")), t }
            var o = { adapter: i(), transformRequest: [function(e, n) { return r(n, "Accept"), r(n, "Content-Type"), t.isFormData(e) || t.isArrayBuffer(e) || t.isBuffer(e) || t.isStream(e) || t.isFile(e) || t.isBlob(e) ? e : t.isArrayBufferView(e) ? e.buffer : t.isURLSearchParams(e) ? (a(n, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : t.isObject(e) ? (a(n, "application/json;charset=utf-8"), JSON.stringify(e)) : e }], transformResponse: [function(e) { if ("string" == typeof e) try { e = JSON.parse(e) } catch (t) {}
                    return e }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, validateStatus: function(e) { return e >= 200 && e < 300 }, headers: { common: { Accept: "application/json, text/plain, */*" } } };
            t.forEach(["delete", "get", "head"], function(e) { o.headers[e] = {} }), t.forEach(["post", "put", "patch"], function(e) { o.headers[e] = t.merge(n) }), module.exports = o;
        }, { "./utils": "S1cf", "./helpers/normalizeHeaderName": "M8l6", "./adapters/xhr": "KRuG", "./adapters/http": "KRuG", "process": "pBGv" }],
        "uz6X": [function(require, module, exports) {
            "use strict";
            var e = require("../utils"),
                r = require("./transformData"),
                a = require("../cancel/isCancel"),
                t = require("../defaults");

            function s(e) { e.cancelToken && e.cancelToken.throwIfRequested() }
            module.exports = function(n) { return s(n), n.headers = n.headers || {}, n.data = r(n.data, n.headers, n.transformRequest), n.headers = e.merge(n.headers.common || {}, n.headers[n.method] || {}, n.headers), e.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) { delete n.headers[e] }), (n.adapter || t.adapter)(n).then(function(e) { return s(n), e.data = r(e.data, e.headers, n.transformResponse), e }, function(e) { return a(e) || (s(n), e && e.response && (e.response.data = r(e.response.data, e.response.headers, n.transformResponse))), Promise.reject(e) }) };
        }, { "./../utils": "S1cf", "./transformData": "woEt", "../cancel/isCancel": "V30M", "../defaults": "BXyq" }],
        "OHvn": [function(require, module, exports) {
            "use strict";
            var e = require("../utils");
            module.exports = function(n, t) { t = t || {}; var r = {},
                    o = ["url", "method", "data"],
                    i = ["headers", "auth", "proxy", "params"],
                    a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                    s = ["validateStatus"];

                function c(n, t) { return e.isPlainObject(n) && e.isPlainObject(t) ? e.merge(n, t) : e.isPlainObject(t) ? e.merge({}, t) : e.isArray(t) ? t.slice() : t }

                function d(o) { e.isUndefined(t[o]) ? e.isUndefined(n[o]) || (r[o] = c(void 0, n[o])) : r[o] = c(n[o], t[o]) }
                e.forEach(o, function(n) { e.isUndefined(t[n]) || (r[n] = c(void 0, t[n])) }), e.forEach(i, d), e.forEach(a, function(o) { e.isUndefined(t[o]) ? e.isUndefined(n[o]) || (r[o] = c(void 0, n[o])) : r[o] = c(void 0, t[o]) }), e.forEach(s, function(e) { e in t ? r[e] = c(n[e], t[e]) : e in n && (r[e] = c(void 0, n[e])) }); var f = o.concat(i).concat(a).concat(s),
                    u = Object.keys(n).concat(Object.keys(t)).filter(function(e) { return -1 === f.indexOf(e) }); return e.forEach(u, d), r };
        }, { "../utils": "S1cf" }],
        "OvAf": [function(require, module, exports) {
            "use strict";
            var e = require("../utils"),
                t = require("../helpers/buildURL"),
                r = require("./InterceptorManager"),
                o = require("./dispatchRequest"),
                s = require("./mergeConfig");

            function i(e) { this.defaults = e, this.interceptors = { request: new r, response: new r } }
            i.prototype.request = function(e) { "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get"; var t = [o, void 0],
                    r = Promise.resolve(e); for (this.interceptors.request.forEach(function(e) { t.unshift(e.fulfilled, e.rejected) }), this.interceptors.response.forEach(function(e) { t.push(e.fulfilled, e.rejected) }); t.length;) r = r.then(t.shift(), t.shift()); return r }, i.prototype.getUri = function(e) { return e = s(this.defaults, e), t(e.url, e.params, e.paramsSerializer).replace(/^\?/, "") }, e.forEach(["delete", "get", "head", "options"], function(e) { i.prototype[e] = function(t, r) { return this.request(s(r || {}, { method: e, url: t, data: (r || {}).data })) } }), e.forEach(["post", "put", "patch"], function(e) { i.prototype[e] = function(t, r, o) { return this.request(s(o || {}, { method: e, url: t, data: r })) } }), module.exports = i;
        }, { "./../utils": "S1cf", "../helpers/buildURL": "H6Qo", "./InterceptorManager": "rj2i", "./dispatchRequest": "uz6X", "./mergeConfig": "OHvn" }],
        "mIKj": [function(require, module, exports) {
            "use strict";

            function t(t) { this.message = t }
            t.prototype.toString = function() { return "Cancel" + (this.message ? ": " + this.message : "") }, t.prototype.__CANCEL__ = !0, module.exports = t;
        }, {}],
        "tsWd": [function(require, module, exports) {
            "use strict";
            var e = require("./Cancel");

            function n(n) { if ("function" != typeof n) throw new TypeError("executor must be a function."); var o;
                this.promise = new Promise(function(e) { o = e }); var r = this;
                n(function(n) { r.reason || (r.reason = new e(n), o(r.reason)) }) }
            n.prototype.throwIfRequested = function() { if (this.reason) throw this.reason }, n.source = function() { var e; return { token: new n(function(n) { e = n }), cancel: e } }, module.exports = n;
        }, { "./Cancel": "mIKj" }],
        "X8jb": [function(require, module, exports) {
            "use strict";
            module.exports = function(n) { return function(t) { return n.apply(null, t) } };
        }, {}],
        "wICU": [function(require, module, exports) {
            "use strict";
            module.exports = function(o) { return "object" == typeof o && !0 === o.isAxiosError };
        }, {}],
        "nUiQ": [function(require, module, exports) {
            "use strict";
            var e = require("./utils"),
                r = require("./helpers/bind"),
                i = require("./core/Axios"),
                n = require("./core/mergeConfig"),
                u = require("./defaults");

            function o(n) { var u = new i(n),
                    o = r(i.prototype.request, u); return e.extend(o, i.prototype, u), e.extend(o, u), o }
            var l = o(u);
            l.Axios = i, l.create = function(e) { return o(n(l.defaults, e)) }, l.Cancel = require("./cancel/Cancel"), l.CancelToken = require("./cancel/CancelToken"), l.isCancel = require("./cancel/isCancel"), l.all = function(e) { return Promise.all(e) }, l.spread = require("./helpers/spread"), l.isAxiosError = require("./helpers/isAxiosError"), module.exports = l, module.exports.default = l;
        }, { "./utils": "S1cf", "./helpers/bind": "EDTP", "./core/Axios": "OvAf", "./core/mergeConfig": "OHvn", "./defaults": "BXyq", "./cancel/Cancel": "mIKj", "./cancel/CancelToken": "tsWd", "./cancel/isCancel": "V30M", "./helpers/spread": "X8jb", "./helpers/isAxiosError": "wICU" }],
        "dZBD": [function(require, module, exports) {
            module.exports = require("./lib/axios");
        }, { "./lib/axios": "nUiQ" }],
        "Focm": [function(require, module, exports) {
            "use strict";
            require("alpinejs");
            var e = t(require("axios"));

            function t(e) { return e && e.__esModule ? e : { default: e } }

            function n() { return { version: "v1.0.1", course_id: null, user_id: null, user_name: null, isStaff: !1, meetings: null, allRecords: null, hasRecords: !1, selectedMeeting: null, newMeetingBox: !1, showModal: !1, removeRecordModal: !1, feedbackMessage: null, createFormErrorMsg: null, loading: !0, axios: null, init: function() { var t = this,
                            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                            o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        console.log("MeetingsApp - Version: " + this.version + " (BigBlueButton Integration for GraspWay)"), this.course_id = n, this.axios = e.default.create({ baseURL: o + "/api/meetings", headers: { "Content-Type": "application/json" }, withCredentials: !0 }), this.axios.interceptors.request.use(function(e) { return t.loading = !0, console.log("".concat(e.method, " ").concat(e.url)), e }), this.axios.interceptors.response.use(function(e) { return console.dir(e.data), t.loading = !1, e }, function(e) { return t.feedbackMessage = e, 401 == e.response.status && (t.feedbackMessage = "No autorizado"), t.createFormErrorMsg = e, t.loading = !1, Promise.reject(e) }), this.getMeetings() }, getMeetings: function() { var e = this;
                        this.axios.get(this.course_id).then(function(t) { if (t.data.error) return console.dir(t.data.error), void(e.feedbackMessage = t.data.error);
                            t.data.course_id ? e.feedbackMessage = t.data.course_id : (e.feedbackMessage = 0 == t.data.meetings.length ? "No hay videoconferencias" : null, e.meetings = t.data.meetings.length > 0 && t.data.meetings, e.allRecords = t.data.allRecords.length > 0 && t.data.allRecords, e.hasRecords = t.data.hasRecords, e.fullName = t.data.fullName, e.user_id = t.data.user_id, e.isStaff = t.data.isStaff, console.log("User FullName: " + e.fullName), console.log("User ID: " + e.user_id)) }) }, createMeetingBox: function() { this.newMeetingBox = !this.newMeetingBox }, createMeeting: function() { var e = this; if (console.log("create meeting"), "" == this.$refs.meetingName.value) return this.createFormErrorMsg = "Inserte un nombre de la Videoconferencia.", void this.$refs.meetingName.focus(); if ("" == this.$refs.meetingDate.value) return this.createFormErrorMsg = "La fecha de momento de inicio es requerida.", void this.$refs.meetingDate.focus(); if (this.$refs.meetingDuration.value <= 0) return this.createFormErrorMsg = "Inserte la duración de la Videoconferencia. ", void this.$refs.meetingDuration.focus(); var t = this.$refs.meetingDate.value + "T" + this.$refs.meetingTime.value + ":00",
                            n = { name: this.$refs.meetingName.value, user_id: this.user_id, record: this.$refs.meetingRecord.checked ? 1 : 0, notify: this.$refs.meetingSendWarnings.checked ? 1 : 0, meetingDate: t, meetingDuration: this.$refs.meetingDuration.value };
                        this.axios.get(this.course_id + "/create", { params: n }).then(function() { return e.getMeetings() }).then(function() { return e.newMeetingBox = !1 }).then(function() { return e.$refs.meetingName.value = "" }).then(function() { return e.$refs.meetingDate.value = "" }).then(function() { return e.createFormErrorMsg = "" }) }, joinMeeting: function() { var e = this,
                            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Number,
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : String;
                        console.log("join meeting " + t); var o = { fullName: this.fullName, meetingID: t, password: n };
                        this.axios.get(this.course_id + "/join", { params: o }).then(function(t) { return e.openInNewTab(t.data.response.url) }) }, playMeeting: function(e) { console.log("play meeting " + e), this.openInNewTab(e) }, confirmRemove: function(e) { console.log("confirm remove " + e), this.selectedMeeting = { meetingID: e }, this.showModal = !this.showModal }, confirmRemoveRecord: function(e) { console.log("confirm remove " + e), this.selectedRecord = { recordID: e }, this.removeRecordModal = !this.removeRecordModal }, removeRecord: function() { var e = this;
                        console.log("remove meeting " + this.selectedRecord.recordID); var t = { recordID: this.selectedRecord.recordID };
                        this.axios.get(this.course_id + "/record/delete", { params: t }).then(function(e) { console.log(e.data.response) }).then(function() { return e.getMeetings() }).then(function() { return e.removeRecordModal = !e.removeRecordModal }) }, removeMeeting: function() { var e = this;
                        console.log("remove meeting " + this.selectedMeeting.meetingID), this.axios.get(this.course_id + "/remove/" + this.selectedMeeting.meetingID).then(function(e) { console.log(e.data.response) }).then(function() { return e.getMeetings() }).then(function() { return e.showModal = !e.showModal }) }, sanitizeInput: function(e) { var t = document.createElement("div"); return t.textContent = e, t.innerHTML }, openInNewTab: function(e) { window.open(e, "_blank").focus() } } }
            window.BBBIntegration = n;
        }, { "alpinejs": "HCq8", "axios": "dZBD" }]
    }, {}, ["Focm"], null)
    //# sourceMappingURL=/index.js.map