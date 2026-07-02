//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, h = (e, t) => !l(e, t), oe = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: h
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = oe) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? oe;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? h)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[p("elementProperties")] = /* @__PURE__ */ new Map(), g[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: g }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var _ = globalThis, v = (e) => e, y = _.trustedTypes, se = y ? y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + b, ue = `<${le}>`, x = document, S = () => x.createComment(""), C = (e) => e === null || typeof e != "object" && typeof e != "function", w = Array.isArray, de = (e) => w(e) || typeof e?.[Symbol.iterator] == "function", T = "[ 	\n\f\r]", E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, pe = />/g, D = RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, O = /"/g, k = /^(?:script|style|textarea|title)$/i, A = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), j = Symbol.for("lit-noChange"), M = Symbol.for("lit-nothing"), N = /* @__PURE__ */ new WeakMap(), P = x.createTreeWalker(x, 129);
function he(e, t) {
	if (!w(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var ge = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === E ? c[1] === "!--" ? o = fe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = D) : (k.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = D) : o = pe : o === D ? c[0] === ">" ? (o = i ?? E, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? D : c[3] === "\"" ? O : me) : o === O || o === me ? o = D : o === fe || o === pe ? o = E : (o = D, i = void 0);
		let d = o === D && e[t + 1].startsWith("/>") ? " " : "";
		a += o === E ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
	}
	return [he(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, F = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ge(t, n);
		if (this.el = e.createElement(l, r), P.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = P.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ve : r[1] === "?" ? ye : r[1] === "@" ? be : R
					}), i.removeAttribute(e);
				} else e.startsWith(b) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (k.test(i.tagName)) {
					let e = i.textContent.split(b), t = e.length - 1;
					if (t > 0) {
						i.textContent = y ? y.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], S()), P.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], S());
					}
				}
			} else if (i.nodeType === 8) if (i.data === le) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += b.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = x.createElement("template");
		return n.innerHTML = e, n;
	}
};
function I(e, t, n = e, r) {
	if (t === j) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = C(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = I(e, i._$AS(e, t.values), i, r)), t;
}
var _e = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
		P.currentNode = r;
		let i = P.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new L(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new xe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = P.nextNode(), a++);
		}
		return P.currentNode = x, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, L = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = I(this, e, t), C(e) ? e === M || e == null || e === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : e !== this._$AH && e !== j && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? de(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== M && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = F.createElement(he(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new _e(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = N.get(e.strings);
		return t === void 0 && N.set(e.strings, t = new F(e)), t;
	}
	k(t) {
		w(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(S()), this.O(S()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = v(e).nextSibling;
			v(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, R = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = M, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = M;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = I(this, e, t, 0), a = !C(e) || e !== this._$AH && e !== j, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = I(this, r[n + o], t, o), s === j && (s = this._$AH[o]), a ||= !C(s) || s !== this._$AH[o], s === M ? e = M : e !== M && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ve = class extends R {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === M ? void 0 : e;
	}
}, ye = class extends R {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== M);
	}
}, be = class extends R {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = I(this, e, t, 0) ?? M) === j) return;
		let n = this._$AH, r = e === M && n !== M || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== M && (n === M || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, xe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		I(this, e);
	}
}, Se = _.litHtmlPolyfillSupport;
Se?.(F, L), (_.litHtmlVersions ??= []).push("3.3.3");
var Ce = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new L(t.insertBefore(S(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, z = globalThis, B = class extends g {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ce(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return j;
	}
};
B._$litElement$ = !0, B.finalized = !0, z.litElementHydrateSupport?.({ LitElement: B });
var we = z.litElementPolyfillSupport;
we?.({ LitElement: B }), (z.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var Te = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ee = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: h
}, De = (e = Ee, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function V(e) {
	return (t, n) => typeof n == "object" ? De(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function H(e) {
	return V({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/app/domain/FolderHaItemRef.ts
var U = class {
	constructor(e, t, n) {
		this.itemKey = e, this.type = t, this.haId = n;
	}
}, W = class {
	constructor(e, t, n, r, i = [], a = []) {
		this.id = e, this.name = t, this.icon = n, this.parentId = r, this.children = i, this.objects = a;
	}
}, G = class e {
	constructor(e, t, n, r, i, a, o, s) {
		this.itemKey = e, this.type = t, this.haId = n, this.editorId = s, this.displayName = r, this.icon = i, this.domain = a, this.subtitle = o;
	}
	static createMissing(t, n, r) {
		return new e(n, r, t, `(Missing) ${t}`, "mdi:alert-outline", void 0, "Reference no longer exists");
	}
}, K = class {
	constructor(e, t) {
		this.byId = e, this.all = t;
	}
}, q = class e {
	constructor(e, t, n) {
		this.sortMode = e, this.autoRefreshSeconds = t, this.openTarget = n;
	}
	static createDefault() {
		return new e("typeThenName", 60, "new-tab");
	}
}, J = class {
	constructor(e, t, n, r, i) {
		this.version = 1, this.folders = e, this.rootFolderIds = t, this.expandedFolderIds = n, this.selectedFolderId = r, this.settings = i;
	}
}, Oe = class {
	constructor() {
		this.unfilteredFolderCache = null;
	}
	filterCatalog(e, t, n) {
		let r = this.normalizeSearch(t), i = r.length === 0 ? e.all : e.all.filter((e) => this.matchesOrderedFragmentsInField(e.displayName, r) || this.matchesOrderedFragmentsInField(e.haId, r));
		return this.sort(i, n);
	}
	folderObjects(e, t, n, r) {
		let i = this.normalizeSearch(n), a = e.objects.map((e) => t.byId.get(e.itemKey) ?? G.createMissing(e.haId, e.itemKey, e.type)).filter((e) => i.length === 0 ? !0 : this.matchesOrderedFragmentsInField(e.displayName, i) || this.matchesOrderedFragmentsInField(e.haId, i));
		return this.sort(a, r);
	}
	folderObjectsUnfiltered(e, t, n) {
		let r = this.unfilteredFolderCache;
		if (r && r.folder === e && r.byId === t.byId && r.sortMode === n.sortMode) return r.items;
		let i = e.objects.map((e) => t.byId.get(e.itemKey) ?? G.createMissing(e.haId, e.itemKey, e.type)), a = this.sort(i, n);
		return this.unfilteredFolderCache = {
			folder: e,
			byId: t.byId,
			sortMode: n.sortMode,
			items: a
		}, a;
	}
	normalizeSearch(e) {
		return e.trim().toLowerCase().split(/\s+/).filter((e) => e.length > 0);
	}
	matchesOrderedFragments(e, t) {
		let n = 0;
		for (let r of t) {
			let t = e.indexOf(r, n);
			if (t < 0) return !1;
			n = t + r.length;
		}
		return !0;
	}
	matchesOrderedFragmentsInField(e, t) {
		return this.matchesOrderedFragments(e.toLowerCase(), t);
	}
	sort(e, t) {
		let n = [...e];
		return t.sortMode === "name" ? (n.sort((e, t) => e.displayName.localeCompare(t.displayName)), n) : (n.sort((e, t) => e.type === t.type ? e.displayName.localeCompare(t.displayName) : e.type.localeCompare(t.type)), n);
	}
}, ke = class {
	onRowClick(e, t, n, r, i, a) {
		let o = new Set(e);
		if (i && r) {
			let e = t.indexOf(r), i = t.indexOf(n);
			if (e >= 0 && i >= 0) {
				let n = Math.min(e, i), r = Math.max(e, i), s = t.slice(n, r + 1);
				a || o.clear();
				for (let e of s) o.add(e);
				return o;
			}
		}
		return a ? (o.has(n) ? o.delete(n) : o.add(n), o) : (o.clear(), o.add(n), o);
	}
	onCheckboxToggle(e, t, n) {
		let r = new Set(e);
		return n ? r.add(t) : r.delete(t), r;
	}
	selectAll(e) {
		return new Set(e);
	}
}, Ae = class {
	clone(e) {
		let t = {};
		for (let [n, r] of Object.entries(e.folders)) t[n] = new W(r.id, r.name, r.icon, r.parentId, [...r.children], r.objects.map((e) => new U(e.itemKey, e.type, e.haId)));
		return new J(t, [...e.rootFolderIds], [...e.expandedFolderIds], e.selectedFolderId, new q(e.settings.sortMode, e.settings.autoRefreshSeconds, e.settings.openTarget));
	}
}, je = class {
	createInitial() {
		return new J({}, [], [], null, q.createDefault());
	}
}, Me = class {
	compareFolderNames(e, t, n) {
		let r = e.folders[t], i = e.folders[n], a = r?.name ?? "", o = i?.name ?? "";
		return a.localeCompare(o, void 0, { sensitivity: "base" });
	}
	sortRootFolders(e) {
		e.rootFolderIds.sort((t, n) => this.compareFolderNames(e, t, n));
	}
	sortChildren(e, t) {
		let n = e.folders[t];
		n && n.children.sort((t, n) => this.compareFolderNames(e, t, n));
	}
	toggleExpanded(e, t) {
		e.expandedFolderIds.includes(t) ? e.expandedFolderIds = e.expandedFolderIds.filter((e) => e !== t) : e.expandedFolderIds.push(t);
	}
	createFolder(e, t, n, r, i) {
		e.folders[n] = new W(n, r, i, t, [], []), t ? (e.folders[t]?.children.push(n), this.sortChildren(e, t), e.expandedFolderIds.includes(t) || e.expandedFolderIds.push(t)) : (e.rootFolderIds.push(n), this.sortRootFolders(e)), e.expandedFolderIds.includes(n) || e.expandedFolderIds.push(n);
	}
	renameFolder(e, t, n, r) {
		let i = e.folders[t];
		i && (i.name = n, i.icon = r, i.parentId ? this.sortChildren(e, i.parentId) : this.sortRootFolders(e));
	}
	deleteFolder(e, t) {
		let n = /* @__PURE__ */ new Set();
		this.collectDescendants(e, t, n, /* @__PURE__ */ new Set()), e.rootFolderIds = e.rootFolderIds.filter((e) => !n.has(e)), e.expandedFolderIds = e.expandedFolderIds.filter((e) => !n.has(e));
		for (let t of Object.values(e.folders)) t.children = t.children.filter((e) => !n.has(e));
		for (let t of n) delete e.folders[t];
		return n;
	}
	moveFolder(e, t, n) {
		if (t === n) return;
		let r = e.folders[t];
		if (r && !(n && this.isDescendant(e, t, n))) {
			if (r.parentId) {
				let n = e.folders[r.parentId];
				n && (n.children = n.children.filter((e) => e !== t));
			} else e.rootFolderIds = e.rootFolderIds.filter((e) => e !== t);
			r.parentId = n, n ? (e.folders[n]?.children.push(t), this.sortChildren(e, n)) : (e.rootFolderIds.push(t), this.sortRootFolders(e));
		}
	}
	addObjectToFolder(e, t, n) {
		let r = e.folders[t];
		r && (r.objects.some((e) => e.itemKey === n.itemKey) || r.objects.push(new U(n.itemKey, n.type, n.haId)));
	}
	addObjectsToFolder(e, t, n) {
		let r = e.folders[t];
		if (r) for (let e of n) r.objects.some((t) => t.itemKey === e.itemKey) || r.objects.push(new U(e.itemKey, e.type, e.haId));
	}
	removeObjectFromFolder(e, t, n) {
		let r = e.folders[t];
		r && (r.objects = r.objects.filter((e) => e.itemKey !== n));
	}
	removeObjectEverywhere(e, t) {
		for (let n of Object.values(e.folders)) n.objects = n.objects.filter((e) => e.itemKey !== t);
	}
	collectDescendants(e, t, n, r) {
		if (r.has(t)) return;
		r.add(t), n.add(t);
		let i = e.folders[t];
		if (i) for (let t of i.children) this.collectDescendants(e, t, n, r);
	}
	isDescendant(e, t, n) {
		let r = /* @__PURE__ */ new Set();
		return this.collectDescendants(e, t, r, /* @__PURE__ */ new Set()), r.has(n);
	}
}, Y = class {
	static {
		this.Device = "device";
	}
	static {
		this.Entity = "entity";
	}
	static {
		this.Helper = "helper";
	}
	static {
		this.Automation = "automation";
	}
	static {
		this.Script = "script";
	}
	static {
		this.Scene = "scene";
	}
}, Ne = class {
	constructor() {
		this.factory = new je();
	}
	sanitize(e) {
		let t = this.factory.createInitial();
		if (!this.isObject(e)) return t;
		let n = this.isObject(e.folders) ? e.folders : {}, r = this.isStringArray(e.rootFolderIds) ? e.rootFolderIds : [], i = this.isStringArray(e.expandedFolderIds) ? e.expandedFolderIds : [], a = typeof e.selectedFolderId == "string" ? e.selectedFolderId : null, o = this.isObject(e.settings) ? e.settings : {}, s = o.sortMode === "name" ? "name" : t.settings.sortMode, c = typeof o.autoRefreshSeconds == "number" && Number.isFinite(o.autoRefreshSeconds) ? Math.round(o.autoRefreshSeconds) : t.settings.autoRefreshSeconds, l = Math.max(0, Math.min(600, c)), u = o.openTarget === "this-tab" || o.openTarget === "overlay" ? o.openTarget : t.settings.openTarget, d = {};
		for (let [e, t] of Object.entries(n)) this.isObject(t) && (d[e] = new W(e, typeof t.name == "string" && t.name.trim() ? t.name : "Folder", typeof t.icon == "string" && t.icon.trim() ? t.icon : "mdi:folder-outline", typeof t.parentId == "string" ? t.parentId : null, this.isStringArray(t.children) ? t.children : [], (Array.isArray(t.objects) ? t.objects : []).filter((e) => this.isObject(e)).map((e) => {
			let t = typeof e.itemKey == "string" ? e.itemKey : typeof e.objectId == "string" ? e.objectId : "", n = typeof e.haId == "string" ? e.haId : typeof e.refId == "string" ? e.refId : "";
			return new U(t, this.parseObjectType(e.type), n);
		}).filter((e) => e.itemKey.length > 0 && e.haId.length > 0)));
		return new J(d, r, i, a && a in d ? a : r[0] ?? null, new q(s, l, u));
	}
	parseObjectType(e) {
		switch (e) {
			case Y.Device:
			case Y.Entity:
			case Y.Helper:
			case Y.Automation:
			case Y.Script:
			case Y.Scene: return e;
			default: return Y.Entity;
		}
	}
	isObject(e) {
		return typeof e == "object" && !!e;
	}
	isStringArray(e) {
		return Array.isArray(e) && e.every((e) => typeof e == "string");
	}
}, X = class {
	static debug(e, ...t) {
		console.debug(e, ...t);
	}
	static info(e, ...t) {
		console.info(e, ...t);
	}
	static log(e, ...t) {
		console.log(e, ...t);
	}
	static warn(e, ...t) {
		console.warn(e, ...t);
	}
	static error(e, ...t) {
		console.error(e, ...t);
	}
}, Pe = class e {
	static {
		this.STORAGE_KEY = "sanity_organizer";
	}
	static {
		this.LOG_PREFIX = "[SanityOrganizer][OrganizerStorageService]";
	}
	constructor(e) {
		this.connection = e, this.sanitizer = new Ne();
	}
	async load() {
		X.debug(`${e.LOG_PREFIX} load:start`, { storageKey: e.STORAGE_KEY });
		try {
			let t = await this.connection.callWS({
				type: "frontend/get_user_data",
				key: e.STORAGE_KEY
			}), n = this.sanitizer.sanitize(t?.value ?? null);
			return X.debug(`${e.LOG_PREFIX} load:success`, {
				hasEnvelope: !!t,
				hasValue: t?.value != null,
				folderCount: Object.keys(n.folders).length,
				rootFolderCount: n.rootFolderIds.length
			}), n;
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} load:error`, t), t;
		}
	}
	async save(t) {
		X.debug(`${e.LOG_PREFIX} save:start`, {
			storageKey: e.STORAGE_KEY,
			folderCount: Object.keys(t.folders).length,
			rootFolderCount: t.rootFolderIds.length
		});
		try {
			await this.connection.callWS({
				type: "frontend/set_user_data",
				key: e.STORAGE_KEY,
				value: t
			}), X.debug(`${e.LOG_PREFIX} save:success`, { storageKey: e.STORAGE_KEY });
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} save:error`, t), t;
		}
	}
}, Fe = class e {
	static {
		this.HELPER_DOMAINS = /* @__PURE__ */ new Set([
			"input_boolean",
			"input_button",
			"input_datetime",
			"input_number",
			"input_select",
			"input_text",
			"counter",
			"timer",
			"schedule",
			"todo"
		]);
	}
	static {
		this.EXCLUDED_ENTITY_DOMAINS = /* @__PURE__ */ new Set([
			"automation",
			"script",
			"scene"
		]);
	}
	static {
		this.ICONS = {
			[Y.Device]: "mdi:devices",
			[Y.Entity]: "mdi:shape-outline",
			[Y.Helper]: "mdi:tune-variant",
			[Y.Automation]: "mdi:robot",
			[Y.Script]: "mdi:script-text-outline",
			[Y.Scene]: "mdi:palette-outline"
		};
	}
	constructor(e) {
		this.connection = e;
	}
	async loadHaItemCatalog() {
		let [t, n] = await Promise.all([this.connection.callWS({ type: "config/device_registry/list" }), this.connection.callWS({ type: "config/entity_registry/list" })]), r = /* @__PURE__ */ new Map(), i = new Map(n.map((e) => [e.entity_id, e]));
		for (let n of t) {
			let t = n.name_by_user || n.name || `Device ${n.id}`;
			r.set(`device:${n.id}`, new G(`device:${n.id}`, Y.Device, n.id, t, e.ICONS[Y.Device], void 0, [n.manufacturer, n.model].filter(Boolean).join(" - ") || void 0, n.id));
		}
		for (let t of n) {
			let n = this.entityDomain(t.entity_id), i = this.connection.states[t.entity_id], a = i && this.displayEntityName(t.entity_id, i.attributes) || t.name || t.original_name || t.entity_id;
			if (e.HELPER_DOMAINS.has(n)) {
				r.set(`helper:${t.entity_id}`, new G(`helper:${t.entity_id}`, Y.Helper, t.entity_id, a, e.ICONS[Y.Helper], n, void 0, t.entity_id));
				continue;
			}
			e.EXCLUDED_ENTITY_DOMAINS.has(n) || r.set(`entity:${t.entity_id}`, new G(`entity:${t.entity_id}`, Y.Entity, t.entity_id, a, e.ICONS[Y.Entity], n, void 0, t.entity_id));
		}
		for (let [t, n] of Object.entries(this.connection.states)) {
			let a = this.entityDomain(t), o = this.displayEntityName(t, n.attributes), s = i.get(t);
			a === "automation" ? r.set(`automation:${t}`, new G(`automation:${t}`, Y.Automation, t, o, e.ICONS[Y.Automation], a, void 0, this.attributeString(n.attributes, "id"))) : a === "script" ? r.set(`script:${t}`, new G(`script:${t}`, Y.Script, t, o, e.ICONS[Y.Script], a, void 0, s?.unique_id ?? void 0)) : a === "scene" && r.set(`scene:${t}`, new G(`scene:${t}`, Y.Scene, t, o, e.ICONS[Y.Scene], a, void 0, this.attributeString(n.attributes, "id")));
		}
		return new K(r, [...r.values()].sort((e, t) => e.type === t.type ? e.displayName.localeCompare(t.displayName) : e.type.localeCompare(t.type)));
	}
	displayEntityName(e, t) {
		let n = t.friendly_name;
		return typeof n == "string" && n.trim().length > 0 ? n : e;
	}
	entityDomain(e) {
		let t = e.indexOf(".");
		return t > 0 ? e.slice(0, t) : "";
	}
	attributeString(e, t) {
		let n = e[t];
		return typeof n == "string" && n.length > 0 ? n : void 0;
	}
}, Ie = class {
	constructor(e) {
		this.runtime = e;
	}
	updateHass(e) {
		this.runtime = e;
	}
	get states() {
		return this.runtime.states;
	}
	async callWS(e) {
		return this.runtime.callWS(e);
	}
}, Le = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][HomeAssistantRuntime]";
	}
	constructor(e) {
		this.connection = new Ie(e), this.storageService = new Pe(this.connection), this.catalogService = new Fe(this.connection);
	}
	updateHass(e) {
		this.connection.updateHass(e);
	}
	async loadHaItemCatalog() {
		X.debug(`${e.LOG_PREFIX} loadHaItemCatalog:start`);
		try {
			let t = await this.catalogService.loadHaItemCatalog();
			return X.debug(`${e.LOG_PREFIX} loadHaItemCatalog:success`, { itemCount: t.all.length }), t;
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} loadHaItemCatalog:error`, t), t;
		}
	}
	async loadState() {
		X.debug(`${e.LOG_PREFIX} loadState:start`);
		try {
			let t = await this.storageService.load();
			return X.debug(`${e.LOG_PREFIX} loadState:success`, {
				folderCount: Object.keys(t.folders).length,
				rootFolderCount: t.rootFolderIds.length
			}), t;
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} loadState:error`, t), t;
		}
	}
	async saveState(t) {
		X.debug(`${e.LOG_PREFIX} saveState:start`, {
			folderCount: Object.keys(t.folders).length,
			rootFolderCount: t.rootFolderIds.length
		});
		try {
			await this.storageService.save(t), X.debug(`${e.LOG_PREFIX} saveState:success`);
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} saveState:error`, t), t;
		}
	}
}, Re = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][BrowserStorageStateStore]";
	}
	constructor(e) {
		this.storageKey = e, this.sanitizer = new Ne();
	}
	load(t) {
		X.debug(`${e.LOG_PREFIX} load:start`, { storageKey: this.storageKey });
		let n = window.localStorage.getItem(this.storageKey);
		if (!n) {
			X.warn(`${e.LOG_PREFIX} load:missing`, {
				storageKey: this.storageKey,
				reason: "No state found. Seeding initial state."
			});
			let n = t();
			return this.save(n), X.debug(`${e.LOG_PREFIX} load:seeded`, {
				folderCount: Object.keys(n.folders).length,
				rootFolderCount: n.rootFolderIds.length
			}), n;
		}
		try {
			let t = this.sanitizer.sanitize(JSON.parse(n));
			return X.debug(`${e.LOG_PREFIX} load:success`, {
				storageKey: this.storageKey,
				rawLength: n.length,
				folderCount: Object.keys(t.folders).length,
				rootFolderCount: t.rootFolderIds.length
			}), t;
		} catch (r) {
			X.error(`${e.LOG_PREFIX} load:parse-error`, {
				storageKey: this.storageKey,
				rawPreview: n.slice(0, 200)
			}, r);
			let i = t();
			return this.save(i), X.debug(`${e.LOG_PREFIX} load:reseeded-after-error`, {
				folderCount: Object.keys(i.folders).length,
				rootFolderCount: i.rootFolderIds.length
			}), i;
		}
	}
	save(t) {
		X.debug(`${e.LOG_PREFIX} save:start`, {
			storageKey: this.storageKey,
			folderCount: Object.keys(t.folders).length,
			rootFolderCount: t.rootFolderIds.length
		});
		try {
			let n = JSON.stringify(t);
			window.localStorage.setItem(this.storageKey, n), X.debug(`${e.LOG_PREFIX} save:success`, {
				storageKey: this.storageKey,
				serializedLength: n.length
			});
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} save:error`, { storageKey: this.storageKey }, t), t;
		}
	}
}, ze = class e {
	static {
		this.ICONS = {
			[Y.Device]: "mdi:devices",
			[Y.Entity]: "mdi:shape-outline",
			[Y.Helper]: "mdi:tune-variant",
			[Y.Automation]: "mdi:robot",
			[Y.Script]: "mdi:script-text-outline",
			[Y.Scene]: "mdi:palette-outline"
		};
	}
	create(e) {
		let t = this.getCounts(e), n = /* @__PURE__ */ new Map();
		return this.addDevices(n, t.devices), this.addEntities(n, t.entities), this.addHelpers(n, t.helpers), this.addDomainObjects(n, Y.Automation, "automation", t.automations), this.addDomainObjects(n, Y.Script, "script", t.scripts), this.addDomainObjects(n, Y.Scene, "scene", t.scenes), new K(n, [...n.values()].sort((e, t) => e.type === t.type ? e.displayName.localeCompare(t.displayName) : e.type.localeCompare(t.type)));
	}
	addDevices(t, n) {
		let r = [
			"Philips",
			"Aqara",
			"IKEA",
			"Shelly",
			"Samsung"
		], i = [
			"Hub",
			"Sensor",
			"Switch",
			"Plug",
			"Light"
		];
		for (let a = 1; a <= n; a += 1) {
			let n = `dev-${a.toString().padStart(4, "0")}`, o = `Kitchen Sensor ${(a - 1) % 7 + 1}`, s = `${r[a % r.length]} - ${i[a % i.length]}`;
			t.set(`device:${n}`, new G(`device:${n}`, Y.Device, n, o, e.ICONS[Y.Device], void 0, s, n));
		}
	}
	addEntities(t, n) {
		let r = [
			"light",
			"sensor",
			"binary_sensor",
			"switch",
			"climate",
			"cover"
		], i = [
			"kitchen",
			"living_room",
			"hallway",
			"bedroom",
			"garage",
			"office"
		], a = [
			"Lamp",
			"Temperature",
			"Motion",
			"Fan",
			"Door",
			"Outlet"
		];
		for (let o = 1; o <= n; o += 1) {
			let n = r[o % r.length], s = `${n}.${i[o % i.length]}_${o.toString().padStart(4, "0")}`, c = `${i[o % i.length].replace("_", " ")} ${a[o % a.length]}`;
			t.set(`entity:${s}`, new G(`entity:${s}`, Y.Entity, s, c, e.ICONS[Y.Entity], n, void 0, s));
		}
	}
	addHelpers(t, n) {
		let r = [
			"input_boolean",
			"input_select",
			"input_number",
			"input_text",
			"timer"
		], i = [
			"Vacation Mode",
			"Heating Preset",
			"Brightness Offset",
			"Note",
			"Cleanup Timer"
		];
		for (let a = 1; a <= n; a += 1) {
			let n = r[a % r.length], o = `${n}.helper_${a.toString().padStart(4, "0")}`, s = i[a % i.length];
			t.set(`helper:${o}`, new G(`helper:${o}`, Y.Helper, o, s, e.ICONS[Y.Helper], n, void 0, o));
		}
	}
	addDomainObjects(t, n, r, i) {
		let a = [
			"Morning Routine",
			"Arrival",
			"Night Shutdown",
			"Energy Saver",
			"Garden Watering"
		], o = n === Y.Automation ? "automation" : n === Y.Script ? "script" : "scene";
		for (let s = 1; s <= i; s += 1) {
			let i = `${r}.${o}_${s.toString().padStart(4, "0")}`, c = `${a[s % a.length]} ${(s - 1) % 9 + 1}`, l = n === Y.Automation || n === Y.Scene ? `${1782896022e3 + s}` : `script_${s.toString().padStart(4, "0")}`;
			t.set(`${n}:${i}`, new G(`${n}:${i}`, n, i, c, e.ICONS[n], r, void 0, l));
		}
	}
	getCounts(e) {
		switch (e) {
			case "small": return {
				devices: 8,
				entities: 20,
				helpers: 8,
				automations: 6,
				scripts: 4,
				scenes: 4
			};
			case "large": return {
				devices: 800,
				entities: 2800,
				helpers: 500,
				automations: 400,
				scripts: 250,
				scenes: 250
			};
			default: return {
				devices: 80,
				entities: 250,
				helpers: 70,
				automations: 40,
				scripts: 30,
				scenes: 30
			};
		}
	}
}, Be = class {
	createInitialState(e) {
		let t = {}, n = [
			"favorites",
			"room-kitchen",
			"archive"
		], r = [
			"favorites",
			"room-kitchen",
			"deep-1",
			"deep-2",
			"deep-3"
		];
		t.favorites = new W("favorites", "Favorites", "mdi:star-outline", null, ["favorites-scripts"], []), t["favorites-scripts"] = new W("favorites-scripts", "Favorite Scripts", "mdi:script-text-outline", "favorites", [], []), t["room-kitchen"] = new W("room-kitchen", "Kitchen", "mdi:silverware-fork-knife", null, ["deep-1"], []), t.archive = new W("archive", "Archive", "mdi:archive-outline", null, [], []);
		for (let e = 1; e <= 8; e += 1) {
			let n = `deep-${e}`, r = e < 8 ? `deep-${e + 1}` : null;
			t[n] = new W(n, `Nested Level ${e}`, "mdi:folder-outline", e === 1 ? "room-kitchen" : `deep-${e - 1}`, r ? [r] : [], []);
		}
		let i = e.all, a = i.filter((e) => e.type === Y.Device).slice(0, 4), o = i.filter((e) => e.type === Y.Entity).slice(0, 12), s = i.filter((e) => e.type === Y.Helper).slice(0, 4), c = i.filter((e) => e.type === Y.Automation).slice(0, 4), l = i.filter((e) => e.type === Y.Script).slice(0, 4), u = i.filter((e) => e.type === Y.Scene).slice(0, 4);
		return t.favorites.objects.push(...a.map((e) => new U(e.itemKey, e.type, e.haId))), t["room-kitchen"].objects.push(...o.slice(0, 5).map((e) => new U(e.itemKey, e.type, e.haId))), t["deep-3"].objects.push(...s.map((e) => new U(e.itemKey, e.type, e.haId))), t["favorites-scripts"].objects.push(...l.map((e) => new U(e.itemKey, e.type, e.haId))), t.archive.objects.push(...c.map((e) => new U(e.itemKey, e.type, e.haId))), t.archive.objects.push(...u.map((e) => new U(e.itemKey, e.type, e.haId))), t["deep-8"].objects.push(new U("entity:sensor.missing_energy_total", Y.Entity, "sensor.missing_energy_total")), t["deep-8"].objects.push(new U("device:dev-missing-9000", Y.Device, "dev-missing-9000")), new J(t, n, r, "favorites", new q("typeThenName", 60, "new-tab"));
	}
}, Ve = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][MockRuntime]";
	}
	constructor(e) {
		this.catalog = new ze().create(e), this.stateStore = new Re(`sanity_organizer_mock_${e}`), this.stateSeeder = new Be();
	}
	async loadHaItemCatalog() {
		return X.debug(`${e.LOG_PREFIX} loadHaItemCatalog:start`), X.debug(`${e.LOG_PREFIX} loadHaItemCatalog:success`, { itemCount: this.catalog.all.length }), this.catalog;
	}
	async loadState() {
		X.debug(`${e.LOG_PREFIX} loadState:start`);
		try {
			let t = this.stateStore.load(() => this.stateSeeder.createInitialState(this.catalog));
			return X.debug(`${e.LOG_PREFIX} loadState:success`, {
				folderCount: Object.keys(t.folders).length,
				rootFolderCount: t.rootFolderIds.length
			}), t;
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} loadState:error`, t), t;
		}
	}
	async saveState(t) {
		X.debug(`${e.LOG_PREFIX} saveState:start`, {
			folderCount: Object.keys(t.folders).length,
			rootFolderCount: t.rootFolderIds.length
		});
		try {
			this.stateStore.save(t), X.debug(`${e.LOG_PREFIX} saveState:success`);
		} catch (t) {
			throw X.error(`${e.LOG_PREFIX} saveState:error`, t), t;
		}
	}
}, He = class {
	resolveFromHass(e) {
		return new Le(e);
	}
	resolveForBrowser() {
		return this.isHomeAssistantShell() ? null : new Ve(this.resolveMockSize());
	}
	isHomeAssistantShell() {
		return document.querySelector("home-assistant") !== null;
	}
	resolveMockSize() {
		let e = new URLSearchParams(window.location.search).get("mockSize");
		if (e === "small" || e === "medium" || e === "large") return window.localStorage.setItem("sanity_organizer_mock_size", e), e;
		let t = window.localStorage.getItem("sanity_organizer_mock_size");
		return t === "small" || t === "medium" || t === "large" ? t : "medium";
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/decorate.js
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/sanityorganizer.ts
var Q, Ue = "__root__", We = {
	"mdi:folder-outline": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
	"mdi:magnify": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
	"mdi:close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
	"mdi:devices": "M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z",
	"mdi:shape-outline": "M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z",
	"mdi:tune-variant": "M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z",
	"mdi:robot": "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z",
	"mdi:script-text-outline": "M15,20A1,1 0 0,0 16,19V4H8A1,1 0 0,0 7,5V16H5V5A3,3 0 0,1 8,2H19A3,3 0 0,1 22,5V6H20V5A1,1 0 0,0 19,4A1,1 0 0,0 18,5V9L18,19A3,3 0 0,1 15,22H5A3,3 0 0,1 2,19V18H13A2,2 0 0,0 15,20M9,6H14V8H9V6M9,10H14V12H9V10M9,14H14V16H9V14Z",
	"mdi:palette-outline": "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z",
	"mdi:star-outline": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
	"mdi:silverware-fork-knife": "M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",
	"mdi:archive-outline": "M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z",
	"mdi:alert-outline": "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"
};
function Ge(e) {
	let t = Math.random().toString(36).slice(2, 10);
	return `${e}_${Date.now().toString(36)}_${t}`;
}
var $ = class extends B {
	static {
		Q = this;
	}
	constructor(...e) {
		super(...e), this.organizerState = new je().createInitial(), this.catalog = new K(/* @__PURE__ */ new Map(), []), this.loading = !0, this.errorText = "", this.selectedFolderId = null, this.selectedObjectIds = /* @__PURE__ */ new Set(), this.lastSelectedItemKey = null, this.search = "", this.showSettings = !1, this.contextMenu = null, this.folderDialog = null, this.confirmDialog = null, this.dragTargetFolderId = null, this.iframeDialogOpen = !1, this.iframeDialogUrl = "about:blank", this.initialized = !1, this.refreshTimerId = null, this.stateCloner = new Ae(), this.treeService = new Me(), this.queryService = new Oe(), this.selectionService = new ke(), this.runtimeResolver = new He(), this.onGlobalClick = () => {
			this.contextMenu &&= null;
		};
	}
	static {
		this.LOG_PREFIX = "[SanityOrganizer][UI]";
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("click", this.onGlobalClick);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("click", this.onGlobalClick), this.applyRefreshTimer(0);
	}
	async updated(e) {
		if (e.has("hass") && this.hass && !this.runtime) {
			this.runtime = this.runtimeResolver.resolveFromHass(this.hass);
			return;
		}
		e.has("hass") && this.hass && this.runtime instanceof Le && this.runtime.updateHass(this.hass), e.has("runtime") && this.runtime && !this.initialized && (this.initialized = !0, await this.initializePanel(), this.applyRefreshTimer(this.settings.autoRefreshSeconds)), !e.get("folderDialog") && this.folderDialog && requestAnimationFrame(() => {
			let e = this.renderRoot?.querySelector("#folder-name-input");
			e && (e.focus(), e.select());
		}), !e.get("iframeDialogOpen") && this.iframeDialogOpen && requestAnimationFrame(() => {
			(this.renderRoot?.querySelector(".iframe-dialog-shell"))?.focus();
		});
	}
	get settings() {
		return this.organizerState.settings;
	}
	applyRefreshTimer(e) {
		this.refreshTimerId !== null && (window.clearInterval(this.refreshTimerId), this.refreshTimerId = null), e > 0 && (this.refreshTimerId = window.setInterval(() => {
			this.refreshCatalog();
		}, e * 1e3));
	}
	async initializePanel() {
		if (X.debug("----initializePanel----"), X.debug("runtime", this.runtime), this.runtime) {
			X.debug(`${Q.LOG_PREFIX} initializePanel:start`), this.loading = !0, this.errorText = "", X.debug("yes, please");
			try {
				let [e, t] = await Promise.all([this.runtime.loadState(), this.runtime.loadHaItemCatalog()]);
				this.organizerState = e, this.catalog = t, this.selectedFolderId = this.resolveSelectedFolderId(e, e.selectedFolderId), X.debug(`${Q.LOG_PREFIX} initializePanel:success`, {
					folderCount: Object.keys(e.folders).length,
					rootFolderCount: e.rootFolderIds.length,
					catalogItemCount: t.all.length,
					selectedFolderId: this.selectedFolderId
				});
			} catch (e) {
				this.errorText = `Failed to load panel data: ${e instanceof Error ? e.message : String(e)}`, X.error(`${Q.LOG_PREFIX} initializePanel:error`, e);
			} finally {
				this.loading = !1;
			}
		}
	}
	async refreshCatalog() {
		if (this.runtime) try {
			this.catalog = await this.runtime.loadHaItemCatalog();
		} catch {}
	}
	async persistState(e) {
		if (this.organizerState = e, this.runtime) {
			X.debug(`${Q.LOG_PREFIX} persistState:start`, {
				folderCount: Object.keys(e.folders).length,
				rootFolderCount: e.rootFolderIds.length
			});
			try {
				await this.runtime.saveState(e), this.errorText = "", X.debug(`${Q.LOG_PREFIX} persistState:success`);
			} catch (e) {
				this.errorText = `Failed to persist changes: ${e instanceof Error ? e.message : String(e)}`, X.error(`${Q.LOG_PREFIX} persistState:error`, e);
			}
		}
	}
	mutateState(e) {
		let t = this.stateCloner.clone(this.organizerState);
		e(t), this.persistState(t);
	}
	resolveSelectedFolderId(e, t) {
		return t && e.folders[t] ? t : e.rootFolderIds.find((t) => !!e.folders[t]) ?? null;
	}
	selectFolder(e) {
		let t = this.resolveSelectedFolderId(this.organizerState, e);
		this.selectedFolderId = t, this.organizerState.selectedFolderId !== t && this.mutateState((t) => {
			t.selectedFolderId = this.resolveSelectedFolderId(t, e);
		});
	}
	isExpanded(e) {
		return this.organizerState.expandedFolderIds.includes(e);
	}
	toggleFolder(e) {
		this.mutateState((t) => {
			this.treeService.toggleExpanded(t, e);
		});
	}
	openAddFolderDialog(e) {
		this.folderDialog = {
			mode: "add",
			folderId: null,
			parentId: e,
			name: "",
			icon: "mdi:folder-outline"
		};
	}
	openNormalAddFolderDialog() {
		this.openAddFolderDialog(this.selectedFolderId ?? null);
	}
	openRenameFolderDialog(e) {
		let t = this.organizerState.folders[e];
		t && (this.folderDialog = {
			mode: "rename",
			folderId: e,
			parentId: t.parentId,
			name: t.name,
			icon: t.icon
		});
	}
	onFolderDialogNameInput(e) {
		this.folderDialog &&= {
			...this.folderDialog,
			name: e.target.value
		};
	}
	onFolderDialogKeyDown(e) {
		if (this.folderDialog) {
			if (e.key === "Escape") {
				e.preventDefault(), this.folderDialog = null;
				return;
			}
			e.key === "Enter" && (e.preventDefault(), this.submitFolderDialog());
		}
	}
	submitFolderDialog() {
		let e = this.folderDialog;
		if (!e) return;
		let t = e.name.trim(), n = e.icon.trim() || "mdi:folder-outline";
		if (t) {
			if (e.mode === "add") {
				let r = Ge("folder");
				this.mutateState((i) => {
					this.treeService.createFolder(i, e.parentId, r, t, n), i.selectedFolderId = r;
				}), this.selectedFolderId = r;
			} else e.folderId && this.mutateState((r) => {
				this.treeService.renameFolder(r, e.folderId, t, n);
			});
			this.folderDialog = null;
		}
	}
	requestDeleteFolder(e) {
		let t = this.organizerState.folders[e];
		if (t) {
			if (t.objects.length === 0 && t.children.length === 0) {
				let t = /* @__PURE__ */ new Set();
				this.mutateState((n) => {
					t = this.treeService.deleteFolder(n, e), n.selectedFolderId && t.has(n.selectedFolderId) && (n.selectedFolderId = this.resolveSelectedFolderId(n, null));
				}), this.selectedFolderId && t.has(this.selectedFolderId) && (this.selectedFolderId = this.resolveSelectedFolderId(this.organizerState, null));
				return;
			}
			this.confirmDialog = {
				title: "Delete Folder",
				message: `Delete '${t.name}' and all nested folders?`,
				action: {
					type: "delete-folder",
					folderId: e
				}
			};
		}
	}
	executeConfirmDialog() {
		let e = this.confirmDialog;
		if (this.confirmDialog = null, e && e.action.type === "delete-folder") {
			let t = e.action.folderId, n = /* @__PURE__ */ new Set();
			this.mutateState((e) => {
				n = this.treeService.deleteFolder(e, t), e.selectedFolderId && n.has(e.selectedFolderId) && (e.selectedFolderId = this.resolveSelectedFolderId(e, null));
			}), this.selectedFolderId && n.has(this.selectedFolderId) && (this.selectedFolderId = this.resolveSelectedFolderId(this.organizerState, null));
		}
	}
	addObjectToFolder(e, t) {
		this.mutateState((n) => {
			this.treeService.addObjectToFolder(n, e, t);
		});
	}
	moveFolder(e, t) {
		this.mutateState((n) => {
			this.treeService.moveFolder(n, e, t);
		});
	}
	addSelectedObjectsToActiveFolder() {
		if (!this.selectedFolderId || this.selectedObjectIds.size === 0) return;
		let e = this.selectedFolderId, t = [...this.selectedObjectIds].map((e) => this.catalog.byId.get(e)).filter((e) => !!e);
		this.mutateState((n) => {
			this.treeService.addObjectsToFolder(n, e, t);
		}), this.selectedObjectIds = /* @__PURE__ */ new Set(), this.lastSelectedItemKey = null;
	}
	removeObjectFromFolder(e, t) {
		this.mutateState((n) => {
			this.treeService.removeObjectFromFolder(n, e, t);
		});
	}
	editorPathFor(e) {
		return e.type === "automation" ? e.editorId ? `/config/automation/edit/${encodeURIComponent(e.editorId)}` : `/config/automation/show/${encodeURIComponent(e.haId)}` : e.type === "scene" ? e.editorId ? `/config/scene/edit/${encodeURIComponent(e.editorId)}` : `/history?entity_id=${encodeURIComponent(e.haId)}` : e.type === "script" ? e.editorId ? `/config/script/edit/${encodeURIComponent(e.editorId)}` : `/config/script/show/${encodeURIComponent(e.haId)}` : e.type === "device" ? `/config/devices/device/${encodeURIComponent(e.haId)}` : e.type === "entity" || e.type === "helper" ? `/history?entity_id=${encodeURIComponent(e.haId)}` : "/config";
	}
	editorTarget() {
		return this.settings.openTarget === "new-tab" ? "_blank" : "_self";
	}
	editorRel() {
		return this.settings.openTarget === "new-tab" ? "noopener noreferrer" : "";
	}
	onFolderItemNameClick(e, t) {
		e.stopPropagation(), this.settings.openTarget === "overlay" && (e.preventDefault(), this.iframeDialogUrl = this.editorPathFor(t), this.iframeDialogOpen = !0);
	}
	closeIframeDialog() {
		this.iframeDialogOpen = !1, this.iframeDialogUrl = "about:blank";
	}
	onIframeDialogKeyDown(e) {
		e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this.closeIframeDialog());
	}
	findElementAcrossShadowRoots(e, t) {
		let n = e.querySelector(t);
		if (n) return n;
		let r = e.querySelectorAll("*");
		for (let e of r) {
			let n = e;
			if (!n.shadowRoot) continue;
			let r = this.findElementAcrossShadowRoots(n.shadowRoot, t);
			if (r) return r;
		}
		return null;
	}
	collapseIframeSidebar(e) {}
	onIframeDialogFrameLoad(e) {
		let t = e.currentTarget;
		t && (this.collapseIframeSidebar(t), window.setTimeout(() => this.collapseIframeSidebar(t), 50), window.setTimeout(() => this.collapseIframeSidebar(t), 800));
	}
	getFilteredObjectIds() {
		return this.filteredObjects().map((e) => e.itemKey);
	}
	onSourceSelectClick(e, t) {
		e.stopPropagation();
		let n = this.getFilteredObjectIds(), r = this.selectionService.onRowClick(this.selectedObjectIds, n, t, this.lastSelectedItemKey, e.shiftKey, e.ctrlKey || e.metaKey);
		this.selectedObjectIds = r, this.lastSelectedItemKey = t;
	}
	onSourceCheckboxToggle(e, t) {
		e.stopPropagation();
		let n = e.target.checked, r = this.selectionService.onCheckboxToggle(this.selectedObjectIds, t, n);
		this.selectedObjectIds = r, this.lastSelectedItemKey = t;
	}
	onSourceKeyDown(e) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
			e.preventDefault(), this.selectedObjectIds = this.selectionService.selectAll(this.getFilteredObjectIds());
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault(), this.addSelectedObjectsToActiveFolder();
			return;
		}
		if (e.key === "Escape") {
			if (e.preventDefault(), this.contextMenu) {
				this.contextMenu = null;
				return;
			}
			if (this.selectedObjectIds.size > 0) {
				this.selectedObjectIds = /* @__PURE__ */ new Set();
				return;
			}
			this.search = "";
		}
	}
	onSearchInput(e) {
		this.search = e.target.value;
	}
	onDragStart(e, t) {
		e.dataTransfer && (e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("application/json", JSON.stringify(t)));
	}
	clearDragState() {
		this.dragTargetFolderId = null;
	}
	parseDropPayload(e) {
		let t = e.dataTransfer?.getData("application/json");
		if (!t) return null;
		try {
			return JSON.parse(t);
		} catch {
			return null;
		}
	}
	onDragOver(e) {
		e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
	}
	onFolderDragOver(e, t) {
		this.onDragOver(e), this.parseDropPayload(e)?.kind === "folder" && (this.dragTargetFolderId = t);
	}
	onFolderDragLeave(e, t) {
		let n = e.relatedTarget;
		n instanceof Node && e.currentTarget.contains(n) || this.dragTargetFolderId === t && (this.dragTargetFolderId = null);
	}
	onDropToFolder(e, t) {
		e.preventDefault(), e.stopPropagation(), this.dragTargetFolderId = null;
		let n = this.parseDropPayload(e);
		if (n) {
			if (n.kind === "folder") {
				this.moveFolder(n.folderId, t);
				return;
			}
			if (n.kind === "object") {
				if (!t) {
					n.fromFolderId && this.removeObjectFromFolder(n.fromFolderId, n.itemKey);
					return;
				}
				let e = this.catalog.byId.get(n.itemKey);
				e && this.addObjectToFolder(t, e);
			}
		}
	}
	showContextMenu(e, t, n) {
		e.preventDefault(), this.contextMenu = {
			x: e.clientX,
			y: e.clientY,
			title: t,
			action: n
		};
	}
	executeContextAction() {
		if (!this.contextMenu) return;
		let e = this.contextMenu.action;
		this.contextMenu = null, e.type === "rename-folder" ? this.openRenameFolderDialog(e.folderId) : e.type === "delete-folder" ? this.requestDeleteFolder(e.folderId) : e.type === "add-folder" ? this.openNormalAddFolderDialog() : e.type === "add-subfolder" ? this.openAddFolderDialog(e.folderId) : e.type === "add-root-folder" ? this.openAddFolderDialog(null) : e.type === "remove-object" && this.removeObjectFromFolder(e.folderId, e.itemKey);
	}
	filteredObjects() {
		return this.queryService.filterCatalog(this.catalog, this.search, this.settings);
	}
	folderObjects(e) {
		return this.queryService.folderObjectsUnfiltered(e, this.catalog, this.settings);
	}
	onSortModeChange(e) {
		let t = e.target.value === "name" ? "name" : "typeThenName";
		this.mutateState((e) => {
			e.settings.sortMode = t;
		});
	}
	onOpenTargetChange(e) {
		let t = e.target.value, n = t === "this-tab" || t === "overlay" ? t : "new-tab";
		this.mutateState((e) => {
			e.settings.openTarget = n;
		});
	}
	onAutoRefreshChange(e) {
		let t = Number(e.target.value), n = Math.max(0, Math.min(600, Number.isFinite(t) ? Math.round(t) : 60));
		this.mutateState((e) => {
			e.settings.autoRefreshSeconds = n;
		}), this.applyRefreshTimer(n);
	}
	renderIcon(e, t = "") {
		if (customElements.get("ha-icon")) return t ? A`<ha-icon class=${t} .icon=${e}></ha-icon>` : A`<ha-icon .icon=${e}></ha-icon>`;
		let n = We[e] ?? We["mdi:folder-outline"];
		return A`
      <svg
        class=${t ? `fallback-icon ${t}` : "fallback-icon"}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d=${n}></path>
      </svg>
    `;
	}
	renderFolderTree(e, t = 0) {
		let n = this.organizerState.folders[e];
		if (!n) return M;
		let r = n.children.length > 0, i = this.isExpanded(e), a = this.selectedFolderId === e;
		return A`
      <div class="tree-node" style=${`--depth:${t}`}>
        <div
          class="folder-row ${a ? "selected" : ""} ${this.dragTargetFolderId === e ? "drop-target" : ""} ${t === 0 ? "root" : "child"}"
          style=${`--depth:${t}`}
          draggable="true"
          @dragstart=${(t) => this.onDragStart(t, {
			kind: "folder",
			folderId: e
		})}
          @dragend=${this.clearDragState}
          @dragover=${(t) => this.onFolderDragOver(t, e)}
          @dragleave=${(t) => this.onFolderDragLeave(t, e)}
          @drop=${(t) => this.onDropToFolder(t, e)}
          @click=${() => this.selectFolder(e)}
          @contextmenu=${(t) => {
			t.stopPropagation(), this.showContextMenu(t, n.name, {
				type: "rename-folder",
				folderId: e
			});
		}}
        >
          ${r ? A`
                <button
                  class="tree-toggle"
                  @click=${(t) => {
			t.stopPropagation(), this.toggleFolder(e);
		}}
                  aria-label=${i ? "Collapse folder" : "Expand folder"}
                >
                  <span class="tree-toggle-glyph">${i ? "−" : "+"}</span>
                </button>
              ` : A`<span class="tree-toggle-spacer" aria-hidden="true"></span>`}
          ${this.renderIcon(n.icon, "folder-icon")}
          <span class="folder-name">${n.name}</span>
          <span class="folder-count">${n.objects.length}</span>
        </div>
        ${r && i ? A`<div class="tree-children" style=${`--depth:${t}`}>
              ${[...n.children].sort((e, t) => {
			let n = this.organizerState.folders[e], r = this.organizerState.folders[t];
			return (n?.name ?? "").localeCompare(r?.name ?? "", void 0, { sensitivity: "base" });
		}).map((e) => this.renderFolderTree(e, t + 1))}
            </div>` : M}
      </div>
    `;
	}
	renderContextMenu() {
		if (!this.contextMenu) return M;
		let e = this.contextMenu.action;
		return X.debug("action.type", e.type), A`
      <div class="menu-backdrop" @click=${this.onGlobalClick}></div>
      <div class="menu" style=${`top:${this.contextMenu.y}px;left:${this.contextMenu.x}px`}>
        <div class="menu-title">${this.contextMenu.title}</div>
        ${e.type === "rename-folder" || e.type === "delete-folder" ? A`
              <button class="menu-item" @click=${() => this.openRenameFolderDialog(e.folderId)}>Rename folder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(e.folderId)}>Add subfolder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
              <button class="menu-item danger" @click=${() => this.requestDeleteFolder(e.folderId)}>Delete folder</button>
            ` : M}
        ${e.type === "add-folder" ? A`
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
            ` : M}
        ${e.type === "add-root-folder" ? A`<button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>` : M}
        ${e.type === "remove-object" ? A`<button class="menu-item" @click=${() => this.executeContextAction()}>Remove from folder</button>` : M}
      </div>
    `;
	}
	renderFolderDialog() {
		if (!this.folderDialog) return M;
		let e = this.folderDialog.mode === "add" ? "Create Folder" : "Rename Folder", t = this.folderDialog.name.trim().length > 0;
		return A`
      <div class="dialog-backdrop" @click=${() => {
			this.folderDialog = null;
		}}>
        <div class="dialog-card" @click=${(e) => e.stopPropagation()} @keydown=${this.onFolderDialogKeyDown}>
          <h3>${e}</h3>
          <label>
            Name
            <input
              id="folder-name-input"
              class="dialog-input"
              .value=${this.folderDialog.name}
              @input=${this.onFolderDialogNameInput}
              placeholder="Folder name"
            />
          </label>
          <div class="dialog-actions">
            <button class="ha-btn" @click=${() => {
			this.folderDialog = null;
		}}>Cancel</button>
            <button class="ha-btn" ?disabled=${!t} @click=${() => this.submitFolderDialog()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
	}
	renderConfirmDialog() {
		return this.confirmDialog ? A`
      <div class="dialog-backdrop" @click=${() => {
			this.confirmDialog = null;
		}}>
        <div class="dialog-card" @click=${(e) => e.stopPropagation()}>
          <h3>${this.confirmDialog.title}</h3>
          <p>${this.confirmDialog.message}</p>
          <div class="dialog-actions">
            <button class="ha-btn" @click=${() => {
			this.confirmDialog = null;
		}}>Cancel</button>
            <button class="ha-btn danger-fill" @click=${() => this.executeConfirmDialog()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    ` : M;
	}
	renderIframeDialog() {
		return A`
      <div
        class="iframe-dialog ${this.iframeDialogOpen ? "open" : ""}"
        role="dialog"
        aria-modal="true"
        aria-hidden=${String(!this.iframeDialogOpen)}
        @click=${() => this.closeIframeDialog()}
      >
        <div
          class="iframe-dialog-shell"
          tabindex="0"
          @click=${(e) => e.stopPropagation()}
          @keydown=${this.onIframeDialogKeyDown}
        >
          <div class="iframe-dialog-top">
            <div class="iframe-dialog-title">Edit in Home Assistant</div>
            <button
              class="iframe-dialog-close"
              @click=${() => this.closeIframeDialog()}
              aria-label="Close embedded page"
            >
              ${this.renderIcon("mdi:close")}
              <span>Close</span>
            </button>
          </div>
          <iframe
            class="iframe-dialog-frame"
            src=${this.iframeDialogUrl}
            @load=${this.onIframeDialogFrameLoad}
          ></iframe>
        </div>
      </div>
    `;
	}
	render() {
		if (!this.runtime && !this.hass) return A`<div class="panel-shell">Attach this panel inside Home Assistant.</div>`;
		if (this.loading) return A`
        <div class="panel-shell loading">
          <div class="spinner"></div>
          <div class="loading-text">Loading Sanity Organizer...</div>
        </div>
      `;
		let e = this.selectedFolderId && this.organizerState.folders[this.selectedFolderId] || null, t = this.filteredObjects();
		return A`
      <div class="panel-shell">
        <header class="toolbar">
          <div class="title-wrap">
            <h1>Sanity Organizer</h1>
            <span class="subtitle">Virtual folders for Home Assistant references</span>
          </div>
          <div class="toolbar-actions">
            <button class="ha-btn" @click=${() => this.openNormalAddFolderDialog()}>New Folder</button>
            <button class="ha-btn" @click=${() => this.showSettings = !this.showSettings}>Settings</button>
            <button class="ha-btn" @click=${() => void this.refreshCatalog()}>Reload from HA</button>
          </div>
        </header>

        ${this.showSettings ? A`
              <section class="settings-panel">
                <div class="pane-title">Panel Settings</div>
                <div class="settings-grid">
                  <label>
                    Open items in
                    <select class="dialog-input" .value=${this.settings.openTarget} @change=${this.onOpenTargetChange}>
                      <option value="new-tab">New tab</option>
                      <option value="this-tab">This tab</option>
                      <option value="overlay">Overlay</option>
                    </select>
                  </label>
                  <label>
                    Sort mode
                    <select class="dialog-input" .value=${this.settings.sortMode} @change=${this.onSortModeChange}>
                      <option value="typeThenName">Type then Name</option>
                      <option value="name">Name only</option>
                    </select>
                  </label>
                  <label>
                    Auto-refresh seconds (0 to disable)
                    <input
                      class="dialog-input"
                      type="number"
                      min="0"
                      max="600"
                      step="1"
                      .value=${String(this.settings.autoRefreshSeconds)}
                      @change=${this.onAutoRefreshChange}
                    />
                  </label>
                </div>
              </section>
            ` : M}

        ${this.errorText ? A`<div class="error-banner">${this.errorText}</div>` : M}

        <div class="search-row">
          ${this.renderIcon("mdi:magnify", "search-icon")}
          <input
            id="so-search"
            class="search-input"
            type="text"
            placeholder="Search folders and objects"
            .value=${this.search}
            @input=${this.onSearchInput}
          />
        </div>

        <section class="layout-grid">
          <aside
            class="tree-pane"
            @dragover=${this.onDragOver}
            @drop=${(e) => this.onDropToFolder(e, null)}
            @contextmenu=${(e) => this.showContextMenu(e, "Root", {
			type: "add-folder",
			folderId: null
		})}
          >
            <div class="pane-title">Folders</div>
            <div class="root-drop-zone" data-drop-id=${Ue}>Drop here to move folder to root</div>
            ${this.organizerState.rootFolderIds.length === 0 ? A`<div class="empty">No folders yet. Create one to start organizing.</div>` : [...this.organizerState.rootFolderIds].sort((e, t) => {
			let n = this.organizerState.folders[e], r = this.organizerState.folders[t];
			return (n?.name ?? "").localeCompare(r?.name ?? "", void 0, { sensitivity: "base" });
		}).map((e) => this.renderFolderTree(e))}
          </aside>

          <main class="content-pane">
            <section class="source-panel" tabindex="0" @keydown=${this.onSourceKeyDown}>
              <div class="pane-title">Available Objects</div>
              <div class="source-actions">
                <button
                  class="ha-btn"
                  ?disabled=${!this.selectedFolderId || this.selectedObjectIds.size === 0}
                  @click=${() => this.addSelectedObjectsToActiveFolder()}
                >
                  Add Selected to Folder
                </button>
                <span>${t.length} items</span>
              </div>
              <div class="shortcut-hint">Shortcuts: Ctrl/Cmd+A select all, Shift+Click range, Enter add, Esc clear.</div>
              <div class="list">
                ${t.map((e) => A`
                    <div
                      class="list-item ${this.selectedObjectIds.has(e.itemKey) ? "selected" : ""}"
                      draggable="true"
                      @dragstart=${(t) => this.onDragStart(t, {
			kind: "object",
			itemKey: e.itemKey,
			fromFolderId: null
		})}
                      @click=${(t) => this.onSourceSelectClick(t, e.itemKey)}
                    >
                      <input
                        type="checkbox"
                        .checked=${this.selectedObjectIds.has(e.itemKey)}
                        @change=${(t) => this.onSourceCheckboxToggle(t, e.itemKey)}
                      />
                      ${this.renderIcon(e.icon)}
                      <div>
                        <div>${e.displayName}</div>
                        <div class="meta">${e.type} - ${e.haId}</div>
                      </div>
                    </div>
                  `)}
              </div>
            </section>

            <section class="folder-panel">
              <div class="pane-title">Folder Contents</div>
              ${e ? A`
                    <div class="folder-header">
                      <div class="folder-header-main">
                        ${this.renderIcon(e.icon)}
                        <h2>${e.name}</h2>
                      </div>
                      <button
                        class="ha-btn danger-fill"
                        @click=${() => this.requestDeleteFolder(e.id)}
                      >
                        Delete Folder
                      </button>
                    </div>
                    <div
                      class="drop-zone"
                      @dragover=${this.onDragOver}
                      @drop=${(t) => this.onDropToFolder(t, e.id)}
                    >
                      Drop objects here
                    </div>
                    <div class="list">
                      ${this.folderObjects(e).map((t) => A`
                          <div
                            class="list-item folder-object-item"
                            draggable="true"
                            @dragstart=${(n) => this.onDragStart(n, {
			kind: "object",
			itemKey: t.itemKey,
			fromFolderId: e.id
		})}
                            @contextmenu=${(n) => this.showContextMenu(n, t.displayName, {
			type: "remove-object",
			folderId: e.id,
			itemKey: t.itemKey
		})}
                          >
                            ${this.renderIcon(t.icon)}
                            <div>
                              <div>
                                <a
                                  class="item-link"
                                  href=${this.editorPathFor(t)}
                                  target=${this.editorTarget()}
                                  rel=${this.editorRel()}
                                  @click=${(e) => this.onFolderItemNameClick(e, t)}
                                >
                                  ${t.displayName}
                                </a>
                              </div>
                              <div class="meta">${t.type} - ${t.haId}</div>
                            </div>
                            <button
                              class="icon-button"
                              @click=${() => this.removeObjectFromFolder(e.id, t.itemKey)}
                            >
                              ${this.renderIcon("mdi:close")}
                            </button>
                          </div>
                        `)}
                      ${this.folderObjects(e).length === 0 ? A`<div class="empty">No objects in this folder.</div>` : M}
                    </div>
                  ` : A`<div class="empty">Select a folder to inspect and edit its contents.</div>`}
            </section>
          </main>
        </section>
      </div>
      ${this.renderContextMenu()}
      ${this.renderFolderDialog()}
      ${this.renderConfirmDialog()}
      ${this.renderIframeDialog()}
    `;
	}
	static {
		this.styles = o`
    :host {
      --bg-1: var(--card-background-color, #ffffff);
      --bg-2: color-mix(in srgb, var(--card-background-color, #ffffff) 90%, var(--primary-color, #03a9f4));
      --line: var(--divider-color, #d8dde6);
      --text-main: var(--primary-text-color, #1f2937);
      --text-muted: var(--secondary-text-color, #6b7280);
      --accent: var(--primary-color, #03a9f4);
      display: block;
      color: var(--text-main);
      font: 400 14px/1.4 var(--paper-font-body1_-_font-family, "Segoe UI", sans-serif);
      min-height: 100%;
    }

    * {
      box-sizing: border-box;
    }

    .panel-shell {
      min-height: 100vh;
      padding: 16px;
      background: radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 30%),
        linear-gradient(180deg, var(--bg-2), var(--bg-1));
    }

    .loading {
      display: grid;
      place-items: center;
      gap: 12px;
    }

    .spinner {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 3px solid color-mix(in srgb, var(--accent) 25%, transparent);
      border-top-color: var(--accent);
      animation: spin 0.8s linear infinite;
    }

    .loading-text {
      color: var(--text-muted);
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }

    .title-wrap h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 12px;
    }

    .toolbar-actions {
      display: flex;
      gap: 8px;
    }

    .ha-btn {
      appearance: none;
      border: 1px solid color-mix(in srgb, var(--accent) 55%, var(--line));
      background: color-mix(in srgb, var(--accent) 8%, var(--bg-1));
      color: var(--text-main);
      border-radius: 10px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
    }

    .ha-btn:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .danger-fill {
      border-color: color-mix(in srgb, var(--error-color, #db4437) 70%, var(--line));
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, var(--bg-1));
      color: var(--error-color, #db4437);
    }

    .settings-panel {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: color-mix(in srgb, var(--bg-1) 97%, white);
      padding: 10px;
      margin-bottom: 12px;
    }

    .settings-grid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .settings-grid label {
      display: grid;
      gap: 6px;
      color: var(--text-muted);
      font-size: 12px;
    }

    .error-banner {
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 40%, transparent);
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, var(--bg-1));
      color: var(--error-color, #db4437);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 12px;
    }

    .search-row {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      gap: 8px;
      align-items: center;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--bg-1) 96%, white);
      border-radius: 12px;
      padding: 8px 10px;
      margin-bottom: 12px;
    }

    .search-icon {
      color: var(--text-muted);
    }

    .fallback-icon {
      width: 20px;
      height: 20px;
      display: block;
      fill: currentColor;
      color: inherit;
      flex: 0 0 auto;
    }

    .search-input {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--text-main);
      font: inherit;
      outline: none;
    }

    .status-pill {
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 12px;
      color: var(--text-muted);
      border: 1px solid var(--line);
    }

    .layout-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 12px;
      min-height: calc(100vh - 160px);
    }

    .tree-pane,
    .source-panel,
    .folder-panel {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: color-mix(in srgb, var(--bg-1) 97%, white);
      padding: 10px;
    }

    .source-panel:focus {
      outline: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
      outline-offset: 2px;
    }

    .content-pane {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      min-height: 0;
    }

    .pane-title {
      margin: 0 0 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      font-weight: 700;
    }

    .root-drop-zone,
    .drop-zone {
      border: 1px dashed color-mix(in srgb, var(--accent) 55%, var(--line));
      border-radius: 8px;
      padding: 8px;
      color: var(--text-muted);
      font-size: 12px;
      margin-bottom: 8px;
      text-align: center;
    }

    .folder-row {
      --pad: calc(var(--depth) * 10px);
      position: relative;
      display: grid;
      grid-template-columns: 24px 22px 1fr auto;
      align-items: center;
      gap: 6px;
      margin: 2px 0;
      padding: 6px;
      padding-left: calc(2px + var(--pad));
      border-radius: 8px;
      cursor: pointer;
    }

    .tree-node {
      position: relative;
    }

    .tree-children {
      position: relative;
    }

    .tree-toggle {
      appearance: none;
      border: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
      background: color-mix(in srgb, var(--bg-1) 92%, white);
      color: var(--text-main);
      display: grid;
      place-items: center;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }

    .tree-toggle:hover {
      border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
      background: color-mix(in srgb, var(--accent) 8%, var(--bg-1));
    }

    .tree-toggle-glyph {
      font-size: 14px;
      line-height: 1;
      font-weight: 700;
      transform: translateY(-1px);
    }

    .tree-toggle-spacer {
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .folder-row:hover,
    .folder-row.selected {
      background: color-mix(in srgb, var(--accent) 14%, transparent);
    }

    .folder-row.drop-target {
      background: color-mix(in srgb, var(--accent) 22%, transparent);
      outline: 1px solid color-mix(in srgb, var(--accent) 65%, var(--line));
    }

    .folder-count {
      color: var(--text-muted);
      font-size: 12px;
    }

    .icon-button {
      appearance: none;
      border: 0;
      background: transparent;
      color: var(--text-muted);
      display: grid;
      place-items: center;
      cursor: pointer;
      width: 22px;
      height: 22px;
      border-radius: 6px;
    }

    .icon-button:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }

    .source-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 8px;
    }

    .shortcut-hint {
      color: var(--text-muted);
      font-size: 12px;
      margin-bottom: 8px;
    }

    .list {
      max-height: calc(100vh - 290px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-item {
      display: grid;
      grid-template-columns: auto 20px 1fr auto;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 8px;
    }

    .list-item.selected {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      border-color: color-mix(in srgb, var(--accent) 40%, transparent);
    }

    .list-item:hover {
      border-color: var(--line);
    }

    .folder-object-item {
      grid-template-columns: 20px 1fr auto;
    }

    .item-link {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      color: var(--accent);
      cursor: pointer;
      font: inherit;
      text-align: left;
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }

    .item-link:hover {
      color: color-mix(in srgb, var(--accent) 80%, var(--text-main));
    }

    .meta {
      color: var(--text-muted);
      font-size: 12px;
    }

    .folder-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    .folder-header-main {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .folder-header h2 {
      margin: 0;
      font-size: 18px;
    }

    .empty {
      padding: 16px;
      color: var(--text-muted);
      text-align: center;
    }

    .menu-backdrop,
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 20;
    }

    .menu {
      position: fixed;
      z-index: 21;
      min-width: 180px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--bg-1);
      box-shadow: 0 16px 28px rgba(0, 0, 0, 0.2);
      padding: 6px;
    }

    .menu-title {
      color: var(--text-muted);
      font-size: 12px;
      padding: 6px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 4px;
    }

    .menu-item {
      display: block;
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--text-main);
      text-align: left;
      padding: 8px;
      border-radius: 7px;
      cursor: pointer;
    }

    .menu-item:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }

    .menu-item.danger {
      color: var(--error-color, #db4437);
    }

    .dialog-backdrop {
      background: rgba(0, 0, 0, 0.35);
      display: grid;
      place-items: center;
      padding: 12px;
    }

    .dialog-card {
      width: min(420px, 100%);
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--bg-1);
      padding: 14px;
      box-shadow: 0 20px 34px rgba(0, 0, 0, 0.22);
      display: grid;
      gap: 10px;
      z-index: 22;
    }

    .dialog-card h3 {
      margin: 0;
    }

    .dialog-card p {
      margin: 0;
      color: var(--text-muted);
    }

    .dialog-card label {
      display: grid;
      gap: 6px;
      color: var(--text-muted);
      font-size: 12px;
    }

    .dialog-input {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 8px 10px;
      color: var(--text-main);
      background: color-mix(in srgb, var(--bg-1) 96%, white);
      font: inherit;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .iframe-dialog {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      z-index: 30;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.15s ease;
    }

    .iframe-dialog.open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .iframe-dialog-shell {
      width: calc(100% - 24px);
      height: calc(100% - 24px);
      margin: 12px;
      border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--line));
      border-radius: 14px;
      overflow: hidden;
      background: var(--bg-1);
      box-shadow: 0 20px 38px rgba(0, 0, 0, 0.28);
      position: relative;
      display: grid;
      grid-template-rows: 64px 1fr;
    }

    .iframe-dialog-top {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, color-mix(in srgb, var(--bg-1) 90%, var(--accent)), var(--bg-1));
    }

    .iframe-dialog-title {
      color: var(--text-main);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .iframe-dialog-close {
      appearance: none;
      border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--line));
      background: color-mix(in srgb, var(--accent) 10%, var(--bg-1));
      color: var(--text-main);
      border-radius: 10px;
      padding: 8px 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
    }

    .iframe-dialog-close .fallback-icon {
      width: 18px;
      height: 18px;
    }

    .iframe-dialog-close:hover {
      background: color-mix(in srgb, var(--accent) 18%, var(--bg-1));
    }

    .iframe-dialog-frame {
      width: 100%;
      height: 100%;
      border: 0;
      background: var(--bg-1);
    }

    @media (max-width: 1180px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }

      .content-pane {
        grid-template-columns: 1fr;
      }

      .list {
        max-height: 300px;
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
	}
};
Z([V({ attribute: !1 })], $.prototype, "hass", void 0), Z([V({ attribute: !1 })], $.prototype, "runtime", void 0), Z([H()], $.prototype, "organizerState", void 0), Z([H()], $.prototype, "catalog", void 0), Z([H()], $.prototype, "loading", void 0), Z([H()], $.prototype, "errorText", void 0), Z([H()], $.prototype, "selectedFolderId", void 0), Z([H()], $.prototype, "selectedObjectIds", void 0), Z([H()], $.prototype, "lastSelectedItemKey", void 0), Z([H()], $.prototype, "search", void 0), Z([H()], $.prototype, "showSettings", void 0), Z([H()], $.prototype, "contextMenu", void 0), Z([H()], $.prototype, "folderDialog", void 0), Z([H()], $.prototype, "confirmDialog", void 0), Z([H()], $.prototype, "dragTargetFolderId", void 0), Z([H()], $.prototype, "iframeDialogOpen", void 0), Z([H()], $.prototype, "iframeDialogUrl", void 0), $ = Q = Z([Te("sanity-organizer")], $);
//#endregion
//#region src/main.ts
var Ke = new He().resolveForBrowser();
if (Ke) {
	let e = document.querySelectorAll("sanity-organizer");
	for (let t of e) t.runtime = Ke;
}
//#endregion

//# sourceMappingURL=sanity-organizer.js.map