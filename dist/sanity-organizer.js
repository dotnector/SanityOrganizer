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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: f, getPrototypeOf: p } = Object, m = globalThis, h = m.trustedTypes, te = h ? h.emptyScript : "", ne = m.reactiveElementPolyfillSupport, g = (e, t) => e, re = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
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
}, ie = (e, t) => !l(e, t), ae = {
	attribute: !0,
	type: String,
	converter: re,
	reflect: !1,
	useDefault: !1,
	hasChanged: ie
};
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var _ = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ae) {
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
		return this.elementProperties.get(e) ?? ae;
	}
	static _$Ei() {
		if (this.hasOwnProperty(g("elementProperties"))) return;
		let e = p(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(g("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(g("properties"))) {
			let e = this.properties, t = [...ee(e), ...f(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? re : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? re : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ie)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
_.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[g("elementProperties")] = /* @__PURE__ */ new Map(), _[g("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: _ }), (m.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var oe = globalThis, se = (e) => e, ce = oe.trustedTypes, le = ce ? ce.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ue = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + v, fe = `<${de}>`, y = document, b = () => y.createComment(""), x = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, _e = />/g, C = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, ye = /"/g, be = /^(?:script|style|textarea|title)$/i, w = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), D = y.createTreeWalker(y, 129);
function Se(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return le === void 0 ? t : le.createHTML(t);
}
var Ce = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === S ? c[1] === "!--" ? o = ge : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (be.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = _e : o === C ? c[0] === ">" ? (o = i ?? S, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? ye : ve) : o === ye || o === ve ? o = C : o === ge || o === _e ? o = S : (o = C, i = void 0);
		let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
		a += o === S ? n + fe : l >= 0 ? (r.push(s), n.slice(0, l) + ue + n.slice(l) + v + d) : n + v + (l === -2 ? t : d);
	}
	return [Se(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, we = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ce(t, n);
		if (this.el = e.createElement(l, r), D.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = D.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ue)) {
					let t = u[o++], n = i.getAttribute(e).split(v), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Oe : r[1] === "?" ? ke : r[1] === "@" ? Ae : De
					}), i.removeAttribute(e);
				} else e.startsWith(v) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (be.test(i.tagName)) {
					let e = i.textContent.split(v), t = e.length - 1;
					if (t > 0) {
						i.textContent = ce ? ce.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], b()), D.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], b());
					}
				}
			} else if (i.nodeType === 8) if (i.data === de) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(v, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += v.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = y.createElement("template");
		return n.innerHTML = e, n;
	}
};
function O(e, t, n = e, r) {
	if (t === T) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = x(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, r)), t;
}
var Te = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? y).importNode(t, !0);
		D.currentNode = r;
		let i = D.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ee(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new je(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = D.nextNode(), a++);
		}
		return D.currentNode = y, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ee = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = O(this, e, t), x(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== T && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== E && x(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = we.createElement(Se(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Te(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = xe.get(e.strings);
		return t === void 0 && xe.set(e.strings, t = new we(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(b()), this.O(b()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = se(e).nextSibling;
			se(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, De = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = E;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = O(this, e, t, 0), a = !x(e) || e !== this._$AH && e !== T, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = O(this, r[n + o], t, o), s === T && (s = this._$AH[o]), a ||= !x(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Oe = class extends De {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === E ? void 0 : e;
	}
}, ke = class extends De {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== E);
	}
}, Ae = class extends De {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = O(this, e, t, 0) ?? E) === T) return;
		let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, je = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		O(this, e);
	}
}, Me = oe.litHtmlPolyfillSupport;
Me?.(we, Ee), (oe.litHtmlVersions ??= []).push("3.3.3");
var Ne = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ee(t.insertBefore(b(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Pe = globalThis, k = class extends _ {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ne(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return T;
	}
};
k._$litElement$ = !0, k.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: k });
var Fe = Pe.litElementPolyfillSupport;
Fe?.({ LitElement: k }), (Pe.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var Ie = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Le = {
	attribute: !0,
	type: String,
	converter: re,
	reflect: !1,
	hasChanged: ie
}, Re = (e = Le, t, n) => {
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
function ze(e) {
	return (t, n) => typeof n == "object" ? Re(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function A(e) {
	return ze({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Be = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ve = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), He = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Ue = class extends He {
	constructor(e) {
		if (super(e), this.it = E, e.type !== Be.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === E || e == null) return this._t = void 0, this.it = e;
		if (e === T) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
Ue.directiveName = "unsafeHTML", Ue.resultType = 1;
var We = Ve(Ue);
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function Ge() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var j = Ge();
function Ke(e) {
	j = e;
}
var M = { exec: () => null };
function N(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function P(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(F.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var qe = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), F = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: N((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: N((e) => RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),
	fencesBeginRegex: N((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: N((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: N((e) => RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`, "i")),
	blockquoteBeginRegex: N((e) => RegExp(`^ {0,${e}}>`))
}, Je = /^(?:[ \t]*(?:\n|$))+/, Ye = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Xe = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ze = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Qe = / {0,3}(?:[*+-]|\d{1,9}[.)])/, $e = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, et = P($e).replace(/bull/g, Qe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), tt = P($e).replace(/bull/g, Qe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), nt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, rt = /^[^\n]+/, it = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, at = P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", it).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ot = P(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Qe).getRegex(), st = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ct = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, lt = P("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ct).replace("tag", st).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ut = P(nt).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", st).getRegex(), dt = {
	blockquote: P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ut).getRegex(),
	code: Ye,
	def: at,
	fences: Xe,
	heading: Ze,
	hr: I,
	html: lt,
	lheading: et,
	list: ot,
	newline: Je,
	paragraph: ut,
	table: M,
	text: rt
}, ft = P("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", st).getRegex(), pt = {
	...dt,
	lheading: tt,
	table: ft,
	paragraph: P(nt).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ft).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", st).getRegex()
}, mt = {
	...dt,
	html: P("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", ct).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: M,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: P(nt).replace("hr", I).replace("heading", " *#{1,6} *[^\n]").replace("lheading", et).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ht = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, gt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _t = /^( {2,}|\\)\n(?!\s*$)/, vt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, L = /[\p{P}\p{S}]/u, yt = /[\s\p{P}\p{S}]/u, bt = /[^\s\p{P}\p{S}]/u, xt = P(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, yt).getRegex(), St = /(?!~)[\p{P}\p{S}]/u, Ct = /(?!~)[\s\p{P}\p{S}]/u, wt = /(?:[^\s\p{P}\p{S}]|~)/u, Tt = P(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", qe ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Et = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Dt = P(Et, "u").replace(/punct/g, L).getRegex(), Ot = P(Et, "u").replace(/punct/g, St).getRegex(), kt = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", At = P(kt, "gu").replace(/notPunctSpace/g, bt).replace(/punctSpace/g, yt).replace(/punct/g, L).getRegex(), jt = P(kt, "gu").replace(/notPunctSpace/g, wt).replace(/punctSpace/g, Ct).replace(/punct/g, St).getRegex(), Mt = P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, bt).replace(/punctSpace/g, yt).replace(/punct/g, L).getRegex(), Nt = P(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, L).getRegex(), Pt = P("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, bt).replace(/punctSpace/g, yt).replace(/punct/g, L).getRegex(), Ft = P(/\\(punct)/, "gu").replace(/punct/g, L).getRegex(), It = P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Lt = P(ct).replace("(?:-->|$)", "-->").getRegex(), Rt = P("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Lt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), zt = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, Bt = P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", zt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Vt = P(/^!?\[(label)\]\[(ref)\]/).replace("label", zt).replace("ref", it).getRegex(), Ht = P(/^!?\[(ref)\](?:\[\])?/).replace("ref", it).getRegex(), Ut = P("reflink|nolink(?!\\()", "g").replace("reflink", Vt).replace("nolink", Ht).getRegex(), Wt = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Gt = {
	_backpedal: M,
	anyPunctuation: Ft,
	autolink: It,
	blockSkip: Tt,
	br: _t,
	code: gt,
	del: M,
	delLDelim: M,
	delRDelim: M,
	emStrongLDelim: Dt,
	emStrongRDelimAst: At,
	emStrongRDelimUnd: Mt,
	escape: ht,
	link: Bt,
	nolink: Ht,
	punctuation: xt,
	reflink: Vt,
	reflinkSearch: Ut,
	tag: Rt,
	text: vt,
	url: M
}, Kt = {
	...Gt,
	link: P(/^!?\[(label)\]\((.*?)\)/).replace("label", zt).getRegex(),
	reflink: P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", zt).getRegex()
}, qt = {
	...Gt,
	emStrongRDelimAst: jt,
	emStrongLDelim: Ot,
	delLDelim: Nt,
	delRDelim: Pt,
	url: P(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Wt).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: P(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Wt).getRegex()
}, Jt = {
	...qt,
	br: P(_t).replace("{2,}", "*").getRegex(),
	text: P(qt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Yt = {
	normal: dt,
	gfm: pt,
	pedantic: mt
}, R = {
	normal: Gt,
	gfm: qt,
	breaks: Jt,
	pedantic: Kt
}, Xt = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, Zt = (e) => Xt[e];
function z(e, t) {
	if (t) {
		if (F.escapeTest.test(e)) return e.replace(F.escapeReplace, Zt);
	} else if (F.escapeTestNoEncode.test(e)) return e.replace(F.escapeReplaceNoEncode, Zt);
	return e;
}
function Qt(e) {
	try {
		e = encodeURI(e).replace(F.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function $t(e, t) {
	let n = e.replace(F.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(F.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) if (n.length > t) n.splice(t);
	else for (; n.length < t;) n.push("");
	for (; r < n.length; r++) n[r] = n[r].trim().replace(F.slashPipe, "|");
	return n;
}
function B(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function en(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && F.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function tn(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function nn(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function rn(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1");
	r.state.inLink = !0;
	let c = {
		type: e[0].charAt(0) === "!" ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: r.inlineTokens(s)
	};
	return r.state.inLink = !1, c;
}
function an(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return r.length >= i.length ? e.slice(i.length) : e;
	}).join("\n");
}
var on = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || j;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : en(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = an(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = B(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: B(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: B(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = B(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o;
				for (o = 0; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.blockquote(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - t.raw.length) + o.raw, r = r.substring(0, r.length - t.text.length) + o.text;
					break;
				} else if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = nn(t[2].split("\n", 1)[0], t[1].length), l = e.split("\n", 1)[0], u = !c.trim(), d = 0;
				if (this.options.pedantic ? (d = 2, s = c.trimStart()) : u ? d = t[1].length + 1 : (d = c.search(this.rules.other.nonSpaceChar), d = d > 4 ? 1 : d, s = c.slice(d), d += t[1].length), u && this.rules.other.blankLine.test(l) && (r += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(d), n = this.rules.other.hrRegex(d), i = this.rules.other.fencesBeginRegex(d), a = this.rules.other.headingBeginRegex(d), o = this.rules.other.htmlBeginRegex(d), ee = this.rules.other.blockquoteBeginRegex(d);
					for (; e;) {
						let f = e.split("\n", 1)[0], p;
						if (l = f, this.options.pedantic ? (l = l.replace(this.rules.other.listReplaceNesting, "  "), p = l) : p = l.replace(this.rules.other.tabCharGlobal, "    "), i.test(l) || a.test(l) || o.test(l) || ee.test(l) || t.test(l) || n.test(l)) break;
						if (p.search(this.rules.other.nonSpaceChar) >= d || !l.trim()) s += "\n" + p.slice(d);
						else {
							if (u || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(c) || a.test(c) || n.test(c)) break;
							s += "\n" + l;
						}
						u = !l.trim(), r += f + "\n", e = e.substring(f.length + 1), c = p.slice(d);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0)), i.items.push({
					type: "list_item",
					raw: r,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(s),
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e of i.items) {
				this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []);
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, i.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
				if (!i.loose) {
					let t = e.tokens.filter((e) => e.type === "space");
					i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
				}
			}
			if (i.loose) for (let e of i.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = en(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: B(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = $t(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: B(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push($t(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: B(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
				if (!this.rules.other.endAngleBracket.test(e)) return;
				let t = B(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = tn(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (n = this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n.slice(1) : n.slice(1, -1)), rn(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return rn(n, e, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (c.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = c.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
				if (a = [...i].length, r[3] || r[4]) {
					o += a;
					continue;
				} else if ((r[5] || r[6]) && n % 3 && !((n + a) % 3)) {
					s += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o + s);
				let t = [...r[0]][0].length, c = e.slice(0, n + r.index + t + a);
				if (Math.min(n, a) % 2) {
					let e = c.slice(1, -1);
					return {
						type: "em",
						raw: c,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = c.slice(2, -2);
				return {
					type: "strong",
					raw: c,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: e
			};
		}
	}
}, V = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || j, this.options.tokenizer = this.options.tokenizer || new on(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		let t = {
			other: F,
			block: Yt.normal,
			inline: R.normal
		};
		this.options.pedantic ? (t.block = Yt.pedantic, t.inline = R.pedantic) : this.options.gfm && (t.block = Yt.gfm, this.options.breaks ? t.inline = R.breaks : t.inline = R.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Yt,
			inline: R
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(F.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(F.tabCharGlobal, "    ").replace(F.spaceLine, ""));
		let r = Infinity;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (i = this.tokenizer.fences(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.heading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.hr(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.blockquote(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.list(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.html(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if (i = this.tokenizer.table(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.lheading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = Infinity, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < Infinity && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
				continue;
			}
			if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e, r = null;
		if (this.tokens.links) {
			let e = Object.keys(this.tokens.links);
			if (e.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) !== null;) e.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
		}
		for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) !== null;) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		let i;
		for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) !== null;) i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let a = !1, o = "", s = Infinity;
		for (; e;) {
			if (e.length < s) s = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			a || (o = ""), a = !1;
			let r;
			if (this.options.extensions?.inline?.some((n) => (r = n.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.escape(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.tag(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.link(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				r.type === "text" && n?.type === "text" ? (n.raw += r.raw, n.text += r.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.emStrong(e, n, o)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.codespan(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.br(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.del(e, n, o)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.autolink(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (!this.state.inLink && (r = this.tokenizer.url(e))) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let i = e;
			if (this.options.extensions?.startInline) {
				let t = Infinity, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < Infinity && t >= 0 && (i = e.substring(0, t + 1));
			}
			if (r = this.tokenizer.inlineText(i)) {
				e = e.substring(r.raw.length), r.raw.slice(-1) !== "_" && (o = r.raw.slice(-1)), a = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += r.raw, n.text += r.text) : t.push(r);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, sn = class {
	options;
	parser;
	constructor(e) {
		this.options = e || j;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(F.notSpaceStart)?.[0], i = e.replace(F.endingNewline, "") + "\n";
		return r ? "<pre><code class=\"language-" + z(r) + "\">" + (n ? i : z(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : z(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${z(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, tokens: n }) {
		let r = this.parser.parseInline(n), i = Qt(e);
		if (i === null) return r;
		e = i;
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + z(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = Qt(e);
		if (i === null) return z(n);
		e = i;
		let a = `<img src="${e}" alt="${z(n)}"`;
		return t && (a += ` title="${z(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : z(e.text);
	}
}, cn = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, H = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || j, this.options.renderer = this.options.renderer || new sn(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new cn();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, U = class {
	options;
	block;
	constructor(e) {
		this.options = e || j;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? V.lex : V.lexInline;
	}
	provideParser(e = this.block) {
		return e ? H.parse : H.parseInline;
	}
}, W = new class {
	defaults = Ge();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = H;
	Renderer = sn;
	TextRenderer = cn;
	Lexer = V;
	Tokenizer = on;
	Hooks = U;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(Infinity);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new sn(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new on(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new U();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					U.passThroughHooks.has(n) ? t[r] = (e) => {
						if (this.defaults.async && U.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : t[r] = (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return V.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return H.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? V.lex : V.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? H.parse : H.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? V.lex : V.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? H.parse : H.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + z(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function G(e, t) {
	return W.parse(e, t);
}
G.options = G.setOptions = function(e) {
	return W.setOptions(e), G.defaults = W.defaults, Ke(G.defaults), G;
}, G.getDefaults = Ge, G.defaults = j, G.use = function(...e) {
	return W.use(...e), G.defaults = W.defaults, Ke(G.defaults), G;
}, G.walkTokens = function(e, t) {
	return W.walkTokens(e, t);
}, G.parseInline = W.parseInline, G.Parser = H, G.parser = H.parse, G.Renderer = sn, G.TextRenderer = cn, G.Lexer = V, G.lexer = V.lex, G.Tokenizer = on, G.Hooks = U, G.parse = G, G.options, G.setOptions, G.use, G.walkTokens, G.parseInline, H.parse, V.lex;
//#endregion
//#region src/app/domain/FolderHaItemRef.ts
var K = class {
	constructor(e, t, n) {
		this.itemKey = e, this.type = t, this.haId = n;
	}
}, q = class {
	constructor(e, t, n, r, i = [], a = [], o = "") {
		this.id = e, this.name = t, this.icon = n, this.parentId = r, this.children = i, this.objects = a, this.notes = o;
	}
}, J = class e {
	constructor(e, t, n, r, i, a, o, s) {
		this.itemKey = e, this.type = t, this.haId = n, this.editorId = s, this.displayName = r, this.icon = i, this.domain = a, this.subtitle = o;
	}
	static createMissing(t, n, r) {
		return new e(n, r, t, `(Missing) ${t}`, "mdi:alert-outline", void 0, "Reference no longer exists");
	}
}, ln = class {
	constructor(e, t) {
		this.byId = e, this.all = t;
	}
}, un = class e {
	constructor(e, t, n, r, i, a) {
		this.sortMode = e, this.autoRefreshSeconds = t, this.openTarget = n, this.notesDialogWidth = r, this.notesDialogHeight = i, this.notesDialogViewMode = a;
	}
	static createDefault() {
		return new e("typeThenName", 60, "new-tab", 720, 460, "both");
	}
}, dn = class {
	constructor(e, t, n, r, i) {
		this.version = 1, this.folders = e, this.rootFolderIds = t, this.expandedFolderIds = n, this.selectedFolderId = r, this.settings = i;
	}
}, fn = class {
	constructor() {
		this.unfilteredFolderCache = null;
	}
	filterCatalog(e, t, n) {
		let r = this.normalizeSearch(t), i = r.length === 0 ? e.all : e.all.filter((e) => this.matchesOrderedFragmentsInField(e.displayName, r) || this.matchesOrderedFragmentsInField(e.haId, r));
		return this.sort(i, n);
	}
	folderObjects(e, t, n, r) {
		let i = this.normalizeSearch(n), a = e.objects.map((e) => t.byId.get(e.itemKey) ?? J.createMissing(e.haId, e.itemKey, e.type)).filter((e) => i.length === 0 ? !0 : this.matchesOrderedFragmentsInField(e.displayName, i) || this.matchesOrderedFragmentsInField(e.haId, i));
		return this.sort(a, r);
	}
	folderObjectsUnfiltered(e, t, n) {
		let r = this.unfilteredFolderCache;
		if (r && r.folder === e && r.byId === t.byId && r.sortMode === n.sortMode) return r.items;
		let i = e.objects.map((e) => t.byId.get(e.itemKey) ?? J.createMissing(e.haId, e.itemKey, e.type)), a = this.sort(i, n);
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
}, pn = class {
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
}, mn = class {
	clone(e) {
		let t = {};
		for (let [n, r] of Object.entries(e.folders)) t[n] = new q(r.id, r.name, r.icon, r.parentId, [...r.children], r.objects.map((e) => new K(e.itemKey, e.type, e.haId)), r.notes);
		return new dn(t, [...e.rootFolderIds], [...e.expandedFolderIds], e.selectedFolderId, new un(e.settings.sortMode, e.settings.autoRefreshSeconds, e.settings.openTarget, e.settings.notesDialogWidth, e.settings.notesDialogHeight, e.settings.notesDialogViewMode));
	}
}, hn = class {
	createInitial() {
		return new dn({}, [], [], null, un.createDefault());
	}
}, gn = class {
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
		e.folders[n] = new q(n, r, i, t, [], []), t ? (e.folders[t]?.children.push(n), this.sortChildren(e, t), e.expandedFolderIds.includes(t) || e.expandedFolderIds.push(t)) : (e.rootFolderIds.push(n), this.sortRootFolders(e)), e.expandedFolderIds.includes(n) || e.expandedFolderIds.push(n);
	}
	renameFolder(e, t, n, r) {
		let i = e.folders[t];
		i && (i.name = n, i.icon = r, i.parentId ? this.sortChildren(e, i.parentId) : this.sortRootFolders(e));
	}
	setFolderNotes(e, t, n) {
		let r = e.folders[t];
		r && (r.notes = n);
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
		r && (r.objects.some((e) => e.itemKey === n.itemKey) || r.objects.push(new K(n.itemKey, n.type, n.haId)));
	}
	addObjectsToFolder(e, t, n) {
		let r = e.folders[t];
		if (r) for (let e of n) r.objects.some((t) => t.itemKey === e.itemKey) || r.objects.push(new K(e.itemKey, e.type, e.haId));
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
}, _n = class {
	constructor() {
		this.factory = new hn();
	}
	sanitize(e) {
		let t = this.factory.createInitial();
		if (!this.isObject(e)) return t;
		let n = this.isObject(e.folders) ? e.folders : {}, r = this.isStringArray(e.rootFolderIds) ? e.rootFolderIds : [], i = this.isStringArray(e.expandedFolderIds) ? e.expandedFolderIds : [], a = typeof e.selectedFolderId == "string" ? e.selectedFolderId : null, o = this.isObject(e.settings) ? e.settings : {}, s = o.sortMode === "name" ? "name" : t.settings.sortMode, c = typeof o.autoRefreshSeconds == "number" && Number.isFinite(o.autoRefreshSeconds) ? Math.round(o.autoRefreshSeconds) : t.settings.autoRefreshSeconds, l = Math.max(0, Math.min(600, c)), u = o.openTarget === "this-tab" || o.openTarget === "overlay" ? o.openTarget : t.settings.openTarget, d = typeof o.notesDialogWidth == "number" && Number.isFinite(o.notesDialogWidth) ? Math.round(o.notesDialogWidth) : t.settings.notesDialogWidth, ee = typeof o.notesDialogHeight == "number" && Number.isFinite(o.notesDialogHeight) ? Math.round(o.notesDialogHeight) : t.settings.notesDialogHeight, f = o.notesDialogViewMode === "markdown" || o.notesDialogViewMode === "preview" ? o.notesDialogViewMode : t.settings.notesDialogViewMode, p = Math.max(520, Math.min(1400, d)), m = Math.max(320, Math.min(1100, ee)), h = {};
		for (let [e, t] of Object.entries(n)) {
			if (!this.isObject(t)) continue;
			let n = typeof t.name == "string" && t.name.trim() ? t.name : "Folder", r = typeof t.icon == "string" && t.icon.trim() ? t.icon : "mdi:folder-outline", i = typeof t.parentId == "string" ? t.parentId : null, a = this.isStringArray(t.children) ? t.children : [], o = typeof t.notes == "string" ? t.notes : "";
			h[e] = new q(e, n, r, i, a, (Array.isArray(t.objects) ? t.objects : []).filter((e) => this.isObject(e)).map((e) => {
				let t = typeof e.itemKey == "string" ? e.itemKey : typeof e.objectId == "string" ? e.objectId : "", n = typeof e.haId == "string" ? e.haId : typeof e.refId == "string" ? e.refId : "";
				return new K(t, this.parseObjectType(e.type), n);
			}).filter((e) => e.itemKey.length > 0 && e.haId.length > 0), o);
		}
		return new dn(h, r, i, a && a in h ? a : r[0] ?? null, new un(s, l, u, p, m, f));
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
}, vn = class e {
	static {
		this.STORAGE_KEY = "sanity_organizer";
	}
	static {
		this.LOG_PREFIX = "[SanityOrganizer][OrganizerStorageService]";
	}
	constructor(e) {
		this.connection = e, this.sanitizer = new _n();
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
}, yn = class e {
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
			r.set(`device:${n.id}`, new J(`device:${n.id}`, Y.Device, n.id, t, e.ICONS[Y.Device], void 0, [n.manufacturer, n.model].filter(Boolean).join(" - ") || void 0, n.id));
		}
		for (let t of n) {
			let n = this.entityDomain(t.entity_id), i = this.connection.states[t.entity_id], a = i && this.displayEntityName(t.entity_id, i.attributes) || t.name || t.original_name || t.entity_id;
			if (e.HELPER_DOMAINS.has(n)) {
				r.set(`helper:${t.entity_id}`, new J(`helper:${t.entity_id}`, Y.Helper, t.entity_id, a, e.ICONS[Y.Helper], n, void 0, t.entity_id));
				continue;
			}
			e.EXCLUDED_ENTITY_DOMAINS.has(n) || r.set(`entity:${t.entity_id}`, new J(`entity:${t.entity_id}`, Y.Entity, t.entity_id, a, e.ICONS[Y.Entity], n, void 0, t.entity_id));
		}
		for (let [t, n] of Object.entries(this.connection.states)) {
			let a = this.entityDomain(t), o = this.displayEntityName(t, n.attributes), s = i.get(t);
			a === "automation" ? r.set(`automation:${t}`, new J(`automation:${t}`, Y.Automation, t, o, e.ICONS[Y.Automation], a, void 0, this.attributeString(n.attributes, "id"))) : a === "script" ? r.set(`script:${t}`, new J(`script:${t}`, Y.Script, t, o, e.ICONS[Y.Script], a, void 0, s?.unique_id ?? void 0)) : a === "scene" && r.set(`scene:${t}`, new J(`scene:${t}`, Y.Scene, t, o, e.ICONS[Y.Scene], a, void 0, this.attributeString(n.attributes, "id")));
		}
		return new ln(r, [...r.values()].sort((e, t) => e.type === t.type ? e.displayName.localeCompare(t.displayName) : e.type.localeCompare(t.type)));
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
}, bn = class {
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
}, xn = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][HomeAssistantRuntime]";
	}
	constructor(e) {
		this.connection = new bn(e), this.storageService = new vn(this.connection), this.catalogService = new yn(this.connection);
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
}, Sn = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][BrowserStorageStateStore]";
	}
	constructor(e) {
		this.storageKey = e, this.sanitizer = new _n();
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
}, Cn = class e {
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
		return this.addDevices(n, t.devices), this.addEntities(n, t.entities), this.addHelpers(n, t.helpers), this.addDomainObjects(n, Y.Automation, "automation", t.automations), this.addDomainObjects(n, Y.Script, "script", t.scripts), this.addDomainObjects(n, Y.Scene, "scene", t.scenes), new ln(n, [...n.values()].sort((e, t) => e.type === t.type ? e.displayName.localeCompare(t.displayName) : e.type.localeCompare(t.type)));
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
			t.set(`device:${n}`, new J(`device:${n}`, Y.Device, n, o, e.ICONS[Y.Device], void 0, s, n));
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
			t.set(`entity:${s}`, new J(`entity:${s}`, Y.Entity, s, c, e.ICONS[Y.Entity], n, void 0, s));
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
			t.set(`helper:${o}`, new J(`helper:${o}`, Y.Helper, o, s, e.ICONS[Y.Helper], n, void 0, o));
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
			t.set(`${n}:${i}`, new J(`${n}:${i}`, n, i, c, e.ICONS[n], r, void 0, l));
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
}, wn = class {
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
		t.favorites = new q("favorites", "Favorites", "mdi:star-outline", null, ["favorites-scripts"], []), t["favorites-scripts"] = new q("favorites-scripts", "Favorite Scripts", "mdi:script-text-outline", "favorites", [], []), t["room-kitchen"] = new q("room-kitchen", "Kitchen", "mdi:silverware-fork-knife", null, ["deep-1"], []), t.archive = new q("archive", "Archive", "mdi:archive-outline", null, [], []);
		for (let e = 1; e <= 8; e += 1) {
			let n = `deep-${e}`, r = e < 8 ? `deep-${e + 1}` : null;
			t[n] = new q(n, `Nested Level ${e}`, "mdi:folder-outline", e === 1 ? "room-kitchen" : `deep-${e - 1}`, r ? [r] : [], []);
		}
		let i = e.all, a = i.filter((e) => e.type === Y.Device).slice(0, 4), o = i.filter((e) => e.type === Y.Entity).slice(0, 12), s = i.filter((e) => e.type === Y.Helper).slice(0, 4), c = i.filter((e) => e.type === Y.Automation).slice(0, 4), l = i.filter((e) => e.type === Y.Script).slice(0, 4), u = i.filter((e) => e.type === Y.Scene).slice(0, 4);
		return t.favorites.objects.push(...a.map((e) => new K(e.itemKey, e.type, e.haId))), t["room-kitchen"].objects.push(...o.slice(0, 5).map((e) => new K(e.itemKey, e.type, e.haId))), t["deep-3"].objects.push(...s.map((e) => new K(e.itemKey, e.type, e.haId))), t["favorites-scripts"].objects.push(...l.map((e) => new K(e.itemKey, e.type, e.haId))), t.archive.objects.push(...c.map((e) => new K(e.itemKey, e.type, e.haId))), t.archive.objects.push(...u.map((e) => new K(e.itemKey, e.type, e.haId))), t["deep-8"].objects.push(new K("entity:sensor.missing_energy_total", Y.Entity, "sensor.missing_energy_total")), t["deep-8"].objects.push(new K("device:dev-missing-9000", Y.Device, "dev-missing-9000")), new dn(t, n, r, "favorites", new un("typeThenName", 60, "new-tab", 720, 460, "both"));
	}
}, Tn = class e {
	static {
		this.LOG_PREFIX = "[SanityOrganizer][MockRuntime]";
	}
	constructor(e) {
		this.catalog = new Cn().create(e), this.stateStore = new Sn(`sanity_organizer_mock_${e}`), this.stateSeeder = new wn();
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
}, En = class {
	resolveFromHass(e) {
		return new xn(e);
	}
	resolveForBrowser() {
		return this.isHomeAssistantShell() ? null : new Tn(this.resolveMockSize());
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
var Q, Dn = "__root__", On = {
	"mdi:folder-outline": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
	"mdi:magnify": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
	"mdi:close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
	"mdi:trash-can-outline": "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z",
	"mdi:information-outline": "M11,17H13V11H11M12,9.75A1.25,1.25 0 0,0 13.25,8.5A1.25,1.25 0 0,0 12,7.25A1.25,1.25 0 0,0 10.75,8.5A1.25,1.25 0 0,0 12,9.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
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
function kn(e) {
	let t = Math.random().toString(36).slice(2, 10);
	return `${e}_${Date.now().toString(36)}_${t}`;
}
var $ = class extends k {
	static {
		Q = this;
	}
	constructor(...e) {
		super(...e), this.organizerState = new hn().createInitial(), this.catalog = new ln(/* @__PURE__ */ new Map(), []), this.loading = !0, this.errorText = "", this.selectedFolderId = null, this.selectedObjectIds = /* @__PURE__ */ new Set(), this.lastSelectedItemKey = null, this.search = "", this.showSettings = !1, this.contextMenu = null, this.folderDialog = null, this.confirmDialog = null, this.notesDialog = null, this.dragTargetFolderId = null, this.iframeDialogOpen = !1, this.iframeDialogUrl = "about:blank", this.initialized = !1, this.refreshTimerId = null, this.notesDialogResizeObserver = null, this.notesDialogResizeSaveTimerId = null, this.notesDialogInitialWidth = 0, this.notesDialogInitialHeight = 0, this.notesDialogHasUserResized = !1, this.stateCloner = new mn(), this.treeService = new gn(), this.queryService = new fn(), this.selectionService = new pn(), this.runtimeResolver = new En(), this.onGlobalClick = () => {
			this.contextMenu &&= null;
		};
	}
	static {
		this.LOG_PREFIX = "[SanityOrganizer][UI]";
	}
	static {
		this.NOTES_DIALOG_MIN_WIDTH = 520;
	}
	static {
		this.NOTES_DIALOG_MIN_HEIGHT = 320;
	}
	static {
		this.NOTES_DIALOG_MAX_WIDTH = 1400;
	}
	static {
		this.NOTES_DIALOG_MAX_HEIGHT = 1100;
	}
	static {
		this.NOTES_DIALOG_DEFAULT_WIDTH = 720;
	}
	static {
		this.NOTES_DIALOG_DEFAULT_HEIGHT = 460;
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("click", this.onGlobalClick);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("click", this.onGlobalClick), this.applyRefreshTimer(0), this.stopNotesDialogResizeTracking();
	}
	async updated(e) {
		if (e.has("hass") && this.hass && !this.runtime) {
			this.runtime = this.runtimeResolver.resolveFromHass(this.hass);
			return;
		}
		e.has("hass") && this.hass && this.runtime instanceof xn && this.runtime.updateHass(this.hass), e.has("runtime") && this.runtime && !this.initialized && (this.initialized = !0, await this.initializePanel(), this.applyRefreshTimer(this.settings.autoRefreshSeconds)), !e.get("folderDialog") && this.folderDialog && requestAnimationFrame(() => {
			let e = this.renderRoot?.querySelector("#folder-name-input");
			e && (e.focus(), e.select());
		}), !e.get("iframeDialogOpen") && this.iframeDialogOpen && requestAnimationFrame(() => {
			(this.renderRoot?.querySelector(".iframe-dialog-shell"))?.focus();
		});
		let t = e.get("notesDialog");
		!t && this.notesDialog && requestAnimationFrame(() => {
			(this.renderRoot?.querySelector("#notes-editor-input"))?.focus();
			let e = this.renderRoot?.querySelector(".notes-dialog-card");
			e && this.startNotesDialogResizeTracking(e);
		}), t && !this.notesDialog && this.stopNotesDialogResizeTracking();
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
				let r = kn("folder");
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
	openNotesDialog(e) {
		let t = this.organizerState.folders[e];
		t && (this.notesDialog = {
			folderId: e,
			notes: t.notes
		});
	}
	closeNotesDialog() {
		this.notesDialog = null;
	}
	onNotesDialogInput(e) {
		this.notesDialog &&= {
			...this.notesDialog,
			notes: e.target.value
		};
	}
	onNotesDialogKeyDown(e) {
		if (!(!this.notesDialog || e.isComposing)) {
			if (e.key === "Escape") {
				e.preventDefault(), e.stopPropagation(), this.closeNotesDialog();
				return;
			}
			e.key === "Enter" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.saveNotesDialog(!0));
		}
	}
	sanitizePreviewHtml(e) {
		let t = document.createElement("template");
		t.innerHTML = e, t.content.querySelectorAll("script, style, iframe, object, embed, link, meta").forEach((e) => e.remove());
		for (let e of t.content.querySelectorAll("*")) for (let t of [...e.attributes]) {
			let n = t.name.toLowerCase(), r = t.value.trim().toLowerCase();
			if (n.startsWith("on")) {
				e.removeAttribute(t.name);
				continue;
			}
			(n === "href" || n === "src") && r.startsWith("javascript:") && e.removeAttribute(t.name);
		}
		return t.innerHTML;
	}
	renderMarkdownPreview(e) {
		let t = G.parse(e ?? "", {
			gfm: !0,
			breaks: !0,
			async: !1
		});
		return w`${We(this.sanitizePreviewHtml(t))}`;
	}
	saveNotesDialog(e) {
		let t = this.notesDialog;
		t && (this.mutateState((e) => {
			this.treeService.setFolderNotes(e, t.folderId, t.notes);
		}), e && (this.notesDialog = null));
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
	clampNotesDialogWidth(e) {
		return Math.max(Q.NOTES_DIALOG_MIN_WIDTH, Math.min(Q.NOTES_DIALOG_MAX_WIDTH, Math.round(e)));
	}
	clampNotesDialogHeight(e) {
		return Math.max(Q.NOTES_DIALOG_MIN_HEIGHT, Math.min(Q.NOTES_DIALOG_MAX_HEIGHT, Math.round(e)));
	}
	notesDialogStyleText() {
		let e = this.clampNotesDialogWidth(this.settings.notesDialogWidth), t = this.clampNotesDialogHeight(this.settings.notesDialogHeight);
		return [
			`width: min(${e}px, calc(100vw - 24px));`,
			`height: min(${t}px, calc(100vh - 24px));`,
			`min-width: ${Q.NOTES_DIALOG_MIN_WIDTH}px;`,
			`min-height: ${Q.NOTES_DIALOG_MIN_HEIGHT}px;`,
			"max-width: calc(100vw - 24px);",
			"max-height: calc(100vh - 24px);"
		].join(" ");
	}
	cycleNotesDialogViewMode() {
		let e = [
			"both",
			"markdown",
			"preview"
		], t = this.settings.notesDialogViewMode, n = e[(e.indexOf(t) + 1 + e.length) % e.length];
		this.mutateState((e) => {
			e.settings.notesDialogViewMode = n;
		});
	}
	notesDialogViewModeButtonText() {
		switch (this.settings.notesDialogViewMode) {
			case "markdown": return "View: Markdown only";
			case "preview": return "View: Preview only";
			default: return "View: Both";
		}
	}
	persistNotesDialogSize(e, t) {
		let n = this.clampNotesDialogWidth(e), r = this.clampNotesDialogHeight(t);
		n === this.settings.notesDialogWidth && r === this.settings.notesDialogHeight || this.mutateState((e) => {
			e.settings.notesDialogWidth = n, e.settings.notesDialogHeight = r;
		});
	}
	startNotesDialogResizeTracking(e) {
		this.stopNotesDialogResizeTracking(), this.notesDialogInitialWidth = e.offsetWidth, this.notesDialogInitialHeight = e.offsetHeight, this.notesDialogHasUserResized = !1, this.notesDialogResizeObserver = new ResizeObserver((e) => {
			let t = e[0];
			if (!t) return;
			let n = t.target, r = n.offsetWidth, i = n.offsetHeight;
			if (!this.notesDialogHasUserResized) {
				let e = Math.abs(r - this.notesDialogInitialWidth), t = Math.abs(i - this.notesDialogInitialHeight);
				if (e < 4 && t < 4) return;
				this.notesDialogHasUserResized = !0;
			}
			this.notesDialogResizeSaveTimerId !== null && window.clearTimeout(this.notesDialogResizeSaveTimerId), this.notesDialogResizeSaveTimerId = window.setTimeout(() => {
				this.persistNotesDialogSize(r, i), this.notesDialogResizeSaveTimerId = null;
			}, 180);
		}), this.notesDialogResizeObserver.observe(e);
	}
	stopNotesDialogResizeTracking() {
		this.notesDialogResizeObserver &&= (this.notesDialogResizeObserver.disconnect(), null), this.notesDialogResizeSaveTimerId !== null && (window.clearTimeout(this.notesDialogResizeSaveTimerId), this.notesDialogResizeSaveTimerId = null), this.notesDialogHasUserResized = !1, this.notesDialogInitialWidth = 0, this.notesDialogInitialHeight = 0;
	}
	resetNotesDialogSize() {
		this.mutateState((e) => {
			e.settings.notesDialogWidth = Q.NOTES_DIALOG_DEFAULT_WIDTH, e.settings.notesDialogHeight = Q.NOTES_DIALOG_DEFAULT_HEIGHT;
		});
	}
	renderIcon(e, t = "") {
		if (customElements.get("ha-icon")) return t ? w`<ha-icon class=${t} .icon=${e}></ha-icon>` : w`<ha-icon .icon=${e}></ha-icon>`;
		let n = On[e] ?? On["mdi:folder-outline"];
		return w`
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
		if (!n) return E;
		let r = n.children.length > 0, i = this.isExpanded(e), a = this.selectedFolderId === e, o = n.notes.trim().length > 0;
		return w`
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
          ${r ? w`
                <button
                  class="tree-toggle"
                  @click=${(t) => {
			t.stopPropagation(), this.toggleFolder(e);
		}}
                  aria-label=${i ? "Collapse folder" : "Expand folder"}
                >
                  <span class="tree-toggle-glyph">${i ? "−" : "+"}</span>
                </button>
              ` : w`<span class="tree-toggle-spacer" aria-hidden="true"></span>`}
          ${this.renderIcon(n.icon, "folder-icon")}
          <span class="folder-name">${n.name}</span>
          <span class="tree-note-indicator ${o ? "has-notes" : "no-notes"}" title=${o ? "Folder has notes" : ""}>
            ${o ? this.renderIcon("mdi:information-outline") : E}
          </span>
          <span class="folder-count">${n.objects.length}</span>
        </div>
        ${r && i ? w`<div class="tree-children" style=${`--depth:${t}`}>
              ${[...n.children].sort((e, t) => {
			let n = this.organizerState.folders[e], r = this.organizerState.folders[t];
			return (n?.name ?? "").localeCompare(r?.name ?? "", void 0, { sensitivity: "base" });
		}).map((e) => this.renderFolderTree(e, t + 1))}
            </div>` : E}
      </div>
    `;
	}
	renderContextMenu() {
		if (!this.contextMenu) return E;
		let e = this.contextMenu.action;
		return X.debug("action.type", e.type), w`
      <div class="menu-backdrop" @click=${this.onGlobalClick}></div>
      <div class="menu" style=${`top:${this.contextMenu.y}px;left:${this.contextMenu.x}px`}>
        <div class="menu-title">${this.contextMenu.title}</div>
        ${e.type === "rename-folder" || e.type === "delete-folder" ? w`
              <button class="menu-item" @click=${() => this.openRenameFolderDialog(e.folderId)}>Rename folder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(e.folderId)}>Add subfolder</button>
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
              <button class="menu-item danger" @click=${() => this.requestDeleteFolder(e.folderId)}>Delete folder</button>
            ` : E}
        ${e.type === "add-folder" ? w`
              <button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>
            ` : E}
        ${e.type === "add-root-folder" ? w`<button class="menu-item" @click=${() => this.openAddFolderDialog(null)}>Add root folder</button>` : E}
        ${e.type === "remove-object" ? w`<button class="menu-item" @click=${() => this.executeContextAction()}>Remove from folder</button>` : E}
      </div>
    `;
	}
	renderFolderDialog() {
		if (!this.folderDialog) return E;
		let e = this.folderDialog.mode === "add" ? "Create Folder" : "Rename Folder", t = this.folderDialog.name.trim().length > 0;
		return w`
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
		return this.confirmDialog ? w`
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
    ` : E;
	}
	renderNotesDialog() {
		if (!this.notesDialog) return E;
		let e = this.settings.notesDialogViewMode, t = e !== "preview", n = e !== "markdown", r = e === "markdown" ? "notes-split only-markdown" : e === "preview" ? "notes-split only-preview" : "notes-split";
		return w`
      <div class="dialog-backdrop" @click=${() => this.closeNotesDialog()}>
        <div
          class="dialog-card notes-dialog-card"
          style=${this.notesDialogStyleText()}
          @click=${(e) => e.stopPropagation()}
          @keydown=${this.onNotesDialogKeyDown}
        >
          <div class="notes-dialog-titlebar">
            <h3>Folder Notes</h3>
            <button
              class="ha-btn notes-view-toggle-btn"
              @click=${() => this.cycleNotesDialogViewMode()}
              title="Cycle notes dialog view"
            >
              ${this.notesDialogViewModeButtonText()}
            </button>
          </div>
          <div class=${r}>
            ${t ? w`<label class="notes-pane">
                  <span class="notes-pane-title">Markdown</span>
                  <textarea
                    id="notes-editor-input"
                    class="dialog-input notes-editor"
                    .value=${this.notesDialog.notes}
                    @input=${this.onNotesDialogInput}
                    placeholder="Write folder notes in markdown"
                  ></textarea>
                </label>` : E}
            ${n ? w`<div class="notes-pane">
                  <div class="notes-pane-title">Preview</div>
                  <article class="notes-preview">${this.renderMarkdownPreview(this.notesDialog.notes)}</article>
                </div>` : E}
          </div>
          <div class="dialog-actions">
            <button class="ha-btn" @click=${() => this.saveNotesDialog(!1)}>Save</button>
            <button class="ha-btn" @click=${() => this.saveNotesDialog(!0)}>Save and close</button>
            <button class="ha-btn" @click=${() => this.closeNotesDialog()}>Close</button>
          </div>
        </div>
      </div>
    `;
	}
	renderIframeDialog() {
		return w`
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
		if (!this.runtime && !this.hass) return w`<div class="panel-shell">Attach this panel inside Home Assistant.</div>`;
		if (this.loading) return w`
        <div class="panel-shell loading">
          <div class="spinner"></div>
          <div class="loading-text">Loading Sanity Organizer...</div>
        </div>
      `;
		let e = this.selectedFolderId && this.organizerState.folders[this.selectedFolderId] || null, t = this.filteredObjects();
		return w`
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

        ${this.showSettings ? w`
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
                   <label>
                    &nbsp;
                    <button class="ha-btn settings-reset-btn" @click=${() => this.resetNotesDialogSize()}>
                      Reset notes dialog
                    </button>
                  </label>
                </div>
              </section>
            ` : E}

        ${this.errorText ? w`<div class="error-banner">${this.errorText}</div>` : E}

        <div class="search-row">
          ${this.renderIcon("mdi:magnify", "search-icon")}
          <input
            id="so-search"
            class="search-input"
            type="text"
            placeholder="Search Home Assistant entities"
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
            <div class="root-drop-zone" data-drop-id=${Dn}>Drop here to move folder to root</div>
            ${this.organizerState.rootFolderIds.length === 0 ? w`<div class="empty">No folders yet. Create one to start organizing.</div>` : [...this.organizerState.rootFolderIds].sort((e, t) => {
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
                ${t.map((e) => w`
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
              ${e ? w`
                    <div class="folder-header">
                      <div class="folder-header-main">
                        ${this.renderIcon(e.icon)}
                        <h2>${e.name}</h2>
                      </div>
                      <div class="folder-header-actions">
                      <button
                          class="icon-button info folder-action-button"
                          @click=${() => this.openNotesDialog(e.id)}
                          aria-label="Edit folder notes"
                          title="Edit folder notes"
                        >
                          ${this.renderIcon("mdi:information-outline")}
                        </button>
                        <button
                          class="icon-button danger folder-action-button"
                          @click=${() => this.requestDeleteFolder(e.id)}
                          aria-label="Delete folder"
                          title="Delete folder"
                        >
                          ${this.renderIcon("mdi:trash-can-outline")}
                        </button>
                      </div>
                    </div>
                    <div
                      class="drop-zone"
                      @dragover=${this.onDragOver}
                      @drop=${(t) => this.onDropToFolder(t, e.id)}
                    >
                      Drop objects here
                    </div>
                    <div class="list">
                      ${this.folderObjects(e).map((t) => w`
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
                      ${this.folderObjects(e).length === 0 ? w`<div class="empty">No objects in this folder.</div>` : E}
                    </div>
                  ` : w`<div class="empty">Select a folder to inspect and edit its contents.</div>`}
            </section>
          </main>
        </section>
      </div>
      ${this.renderContextMenu()}
      ${this.renderFolderDialog()}
      ${this.renderConfirmDialog()}
      ${this.renderNotesDialog()}
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

    .settings-reset-btn {
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
      grid-template-columns: 24px 22px minmax(0, 1fr) auto auto;
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
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    .tree-note-indicator {
      display: inline-grid;
      place-items: center;
      color: color-mix(in srgb, var(--accent) 70%, var(--text-muted));
      line-height: 1;
      transform: translateY(1px);
      width: 12px;
      height: 12px;
      overflow: hidden;
    }

    .tree-note-indicator.no-notes {
      visibility: hidden;
    }

    .tree-note-indicator ha-icon,
    .tree-note-indicator .fallback-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
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

    .icon-button.danger {
      color: var(--error-color, #db4437);
      border: 1px solid color-mix(in srgb, var(--error-color, #db4437) 45%, var(--line));
      background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
    }

    .icon-button.danger:hover {
      background: color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
    }

    .icon-button.info {
      color: var(--accent);
      border: 1px solid color-mix(in srgb, var(--accent) 50%, var(--line));
      background: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .icon-button.info:hover {
      background: color-mix(in srgb, var(--accent) 18%, transparent);
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

    .folder-header-actions {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .folder-action-button {
      width: 26px;
      height: 26px;
      --mdc-icon-size: 16px;
    }

    .folder-action-button .fallback-icon {
      width: 16px;
      height: 16px;
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

    .notes-dialog-card {
      resize: both;
      overflow: auto;
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-width: 520px;
      min-height: 320px;
    }

    .notes-dialog-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .notes-dialog-titlebar h3 {
      margin: 0;
    }

    .notes-view-toggle-btn {
      font-size: 12px;
      padding: 6px 10px;
    }

    .notes-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      height: 100%;
      min-height: 0;
    }

    .notes-split.only-markdown,
    .notes-split.only-preview {
      grid-template-columns: 1fr;
    }

    .notes-pane {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 6px;
      min-height: 0;
    }

    .notes-pane-title {
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
    }

    .notes-editor {
      min-height: 0;
      height: 100%;
      resize: none;
      line-height: 1.5;
      font-family: var(--paper-font-body1_-_font-family, "Segoe UI", sans-serif);
    }

    .notes-preview {
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 10px;
      background: color-mix(in srgb, var(--bg-1) 98%, white);
      overflow: auto;
      min-height: 0;
      height: 100%;
      line-height: 1.45;
      word-break: break-word;
    }

    .notes-preview :is(h1, h2, h3, h4, h5, h6) {
      margin: 0.65em 0 0.35em;
      line-height: 1.2;
    }

    .notes-preview p,
    .notes-preview ul,
    .notes-preview ol,
    .notes-preview blockquote,
    .notes-preview pre,
    .notes-preview table {
      margin: 0 0 0.75em;
    }

    .notes-preview :is(ul, ol) {
      padding-left: 1.2em;
    }

    .notes-preview pre,
    .notes-preview code {
      font-family: "Cascadia Code", Consolas, monospace;
    }

    .notes-preview pre {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 8px;
      overflow: auto;
      background: color-mix(in srgb, var(--bg-1) 94%, black 6%);
    }

    .notes-preview blockquote {
      border-left: 3px solid color-mix(in srgb, var(--accent) 45%, var(--line));
      padding-left: 8px;
      color: var(--text-muted);
    }

    .notes-preview a {
      color: var(--accent);
    }

    .notes-preview hr {
      border: 0;
      border-top: 1px solid var(--line);
      margin: 10px 0;
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

      .notes-split {
        grid-template-columns: 1fr;
      }

      .notes-editor,
      .notes-preview {
        min-height: 220px;
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
Z([ze({ attribute: !1 })], $.prototype, "hass", void 0), Z([ze({ attribute: !1 })], $.prototype, "runtime", void 0), Z([A()], $.prototype, "organizerState", void 0), Z([A()], $.prototype, "catalog", void 0), Z([A()], $.prototype, "loading", void 0), Z([A()], $.prototype, "errorText", void 0), Z([A()], $.prototype, "selectedFolderId", void 0), Z([A()], $.prototype, "selectedObjectIds", void 0), Z([A()], $.prototype, "lastSelectedItemKey", void 0), Z([A()], $.prototype, "search", void 0), Z([A()], $.prototype, "showSettings", void 0), Z([A()], $.prototype, "contextMenu", void 0), Z([A()], $.prototype, "folderDialog", void 0), Z([A()], $.prototype, "confirmDialog", void 0), Z([A()], $.prototype, "notesDialog", void 0), Z([A()], $.prototype, "dragTargetFolderId", void 0), Z([A()], $.prototype, "iframeDialogOpen", void 0), Z([A()], $.prototype, "iframeDialogUrl", void 0), $ = Q = Z([Ie("sanity-organizer")], $);
//#endregion
//#region src/main.ts
var An = new En().resolveForBrowser();
if (An) {
	let e = document.querySelectorAll("sanity-organizer");
	for (let t of e) t.runtime = An;
}
//#endregion

//# sourceMappingURL=sanity-organizer.js.map