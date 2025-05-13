
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $99cbdba2fb53ce57$exports = {};
!function(t, e) {
    $99cbdba2fb53ce57$exports = e();
}(self, ()=>(()=>{
        "use strict";
        var t = {
            d: (e, i)=>{
                for(var n in i)t.o(i, n) && !t.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: i[n]
                });
            },
            o: (t, e)=>Object.prototype.hasOwnProperty.call(t, e)
        }, e = {};
        function i(t) {
            return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            }, i(t);
        }
        t.d(e, {
            default: ()=>h
        });
        var n = function(t, e) {
            t.forEach(function(t) {
                this[t] = function() {
                    var i, n = e._requestIdCounter++, s = Array.prototype.slice.call(arguments);
                    if (s.length > 0) {
                        var r = s[s.length - 1];
                        "function" == typeof r && (i = s.pop());
                    }
                    i && (e._pendingRequests[n] = i.bind(this)), e._target.postMessage({
                        type: "api.request",
                        instanceId: e.getIdentifier(),
                        requestId: n,
                        member: t,
                        arguments: s
                    }, e.getDomain());
                };
            }, this), this.addEventListener = function(t, i, n) {
                "viewerready" === t && e.isViewerReady && i(), e._eventListeners[t] || (e._eventListeners[t] = []), e._eventListeners[t].push(i), n && this.setListenerOptions && (n.name = t, this.setListenerOptions(n));
            }, this.removeEventListener = function(t, i) {
                if (e._eventListeners[t]) {
                    var n = e._eventListeners[t].indexOf(i);
                    -1 !== n && e._eventListeners[t].splice(n, 1);
                }
            };
        }, s = function(t, e, i) {
            this._target = t, this._requestIdCounter = 0, this._pendingRequests = {}, this._eventListeners = {}, this._ready = !1, this._domain = i, this._instanceId = e, this.listenServer();
        };
        s.prototype = {
            getIdentifier: function() {
                return this._instanceId;
            },
            getDomain: function() {
                return this._domain;
            },
            setIdentifier: function(t) {
                this._instanceId = t;
            },
            use: function(t, e) {
                this._version = t, this._ready = !0;
                var i = this._requestIdCounter++;
                this._pendingRequests[i] = (function(t, i, s) {
                    t ? e.call(this, t) : e.call(this, null, new n(s, this));
                }).bind(this), this._target.postMessage({
                    type: "api.initialize",
                    requestId: i,
                    name: t,
                    instanceId: this._instanceId
                }, this._domain);
            },
            listenServer: function() {
                if (!this._serverReceiveMessageBinded) {
                    var t = [
                        "api.initialize.result",
                        "api.request.result",
                        "api.event"
                    ];
                    this._serverReceiveMessageBinded = (function(e) {
                        if (e.origin === this._domain && e.data && e.data.type && e.data.instanceId && e.data.instanceId === this.getIdentifier()) {
                            var i = e.data.type;
                            if (-1 !== t.indexOf(i)) {
                                if ("api.event" === i) {
                                    var n = e.data.results, s = n[0];
                                    if (this._eventListeners["*"] || this._eventListeners.all) return void [
                                        "*",
                                        "all"
                                    ].forEach(function(t) {
                                        var e = this._eventListeners[t];
                                        e && e.forEach(function(t) {
                                            t.apply(t, n);
                                        });
                                    }, this);
                                    var r = n.slice(1), o = this._eventListeners[s];
                                    o ? o.forEach(function(t) {
                                        t.apply(t, r);
                                    }) : "viewerready" === s && (this.isViewerReady = !0);
                                } else {
                                    var a = e.data.requestId, d = this._pendingRequests[a];
                                    if (!d) return;
                                    d.apply(null, e.data.results), this._pendingRequests[a] = void 0;
                                }
                            }
                        }
                    }).bind(this), window.addEventListener("message", this._serverReceiveMessageBinded);
                }
            }
        };
        const r = s;
        var o = /[&|;]+/g;
        function a(t) {
            var e, n;
            return "object" === i(t) ? (e = t, n = {}, Object.keys(e).forEach(function(t) {
                n[t] = Array.isArray(e[t]) ? e[t] : [
                    e[t]
                ];
            }), n) : ("?" === t[0] && (t = t.substr(1)), t.split(o).reduce(function(t, e) {
                if (0 === e.length) return t;
                var i = e.indexOf("=");
                -1 === i && (i = e.length);
                var n = decodeURIComponent(e.substr(0, i).replace(/\+/g, "%20")), s = decodeURIComponent(e.substr(i + 1).replace(/\+/g, "%20"));
                return void 0 === t[n] && (t[n] = []), t[n].push(s), t;
            }, {}));
        }
        window.SketchfabAPIClient = r;
        var d = function(t, e) {
            var n = t, s = e;
            "object" === i(t) && (s = t, n = null), this._version = n, this._target = s, window.sketchfabAPIinstances || (window.sketchfabAPIinstances = []), window.sketchfabAPIinstances.push(this), this._apiId = window.sketchfabAPIinstances.length.toString(), this._target.id && (this._apiId += "_" + this._target.id), this._target.allow || (this._target.allow = "vr; autoplay; fullscreen"), this._client = void 0, this._options = void 0, this._domain = "sketchfab.com", this._domain = "same-as-current" === this._domain ? window.location.hostname : this._domain, this._urlTemplate = "https://YYYY/models/XXXX/embed", this._url = this._urlTemplate.replace("YYYY", this._domain), this._transmitOptions = {}, this._getURLOptions();
        };
        d.prototype = {
            _urlOptionsDict: {
                skfb_api_version: {
                    default: "1.12.1",
                    type: "string"
                }
            },
            _optionsLoaded: function(t) {
                this._urlOptions = t, this._version = this._getURLOption("skfb_api_version", this._version);
            },
            _getURLOption: function(t, e) {
                var i = this._urlOptionsDict[t];
                if (!i) return e;
                null == e && (e = i.default);
                var n = this._urlOptions[t];
                return n && n.length ? n[0] : e;
            },
            _getURLOptions: function() {
                if (!window || !window.location.search) return this._optionsLoaded({});
                var t = a(window.location.search);
                for(var e in t)e.startsWith("skfb_") && (this._transmitOptions[e.substr(5)] = t[e]);
                return this._optionsLoaded(t);
            },
            getEmbedURL: function(t, e) {
                var i = this._url + "?api_version=" + this._version + "&api_id=" + this._apiId;
                e && Object.keys(e).forEach(function(t) {
                    null != e[t] && "function" != typeof e[t] && (i += "&" + t.toString() + "=" + e[t].toString());
                });
                var n = this._transmitOptions;
                return Object.keys(this._transmitOptions).forEach(function(t) {
                    i += "&" + t.toString() + "=" + n[t].toString();
                }), i.replace("XXXX", t);
            },
            init: function(t, e) {
                this._options = e, this._uid = t, this._realInit();
            },
            _initializeAPIEmbed: function(t) {
                if (t.data && t.data.instanceId && this._apiId === t.data.instanceId && "api.ready" === t.data.type && this._target.src) {
                    if (void 0 !== t.data.error) return this.error(t.data.error), void window.removeEventListener("message", this._initializeAPIEmbedBinded);
                    var e = this._target.src.split("/");
                    e = "https://" + e[2], this._client && (console.log("reusing a Sketchfab instance for multiple client is not supported, please create a new sketchfab instance"), window.removeEventListener("message", this._client._serverReceiveMessageBinded)), this._client = new window.SketchfabAPIClient(this._target.contentWindow, this._apiId, e), this._client.use(this._version, (function(t, e) {
                        if (t) throw t;
                        this.success.call(this, e);
                    }).bind(this)), window.removeEventListener("message", this._initializeAPIEmbedBinded);
                }
            },
            _realInit: function() {
                this._initializeAPIEmbedBinded || (this._initializeAPIEmbedBinded = this._initializeAPIEmbed.bind(this)), window.addEventListener("message", this._initializeAPIEmbedBinded), this._target.src = this.getEmbedURL(this._uid, this._options);
            },
            success: function(t) {
                this._options.success && "function" == typeof this._options.success && this._options.success(t);
            },
            error: function(t) {
                this._options.error && "function" == typeof this._options.error && this._options.error(t);
            },
            show: function() {
                var t = this._target.style.top;
                this._target.style.top = "-1000vh", Promise.resolve().then((function() {
                    this._target.style.top = t;
                }).bind(this));
            }
        };
        const h = d;
        return e.default;
    })()); //# sourceMappingURL=sketchfab-viewer-1.12.1.js.map


var $2795bb3588ef9b49$exports = {};
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */ (function webpackUniversalModuleDefinition(root, factory) {
    $2795bb3588ef9b49$exports = factory();
})($2795bb3588ef9b49$exports, function() {
    return /******/ function() {
        /******/ var __webpack_modules__ = {
            /***/ 686: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                // EXPORTS
                __webpack_require__.d(__webpack_exports__, {
                    "default": function() {
                        return /* binding */ clipboard;
                    }
                });
                // EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
                var tiny_emitter = __webpack_require__(279);
                var tiny_emitter_default = /*#__PURE__*/ __webpack_require__.n(tiny_emitter);
                // EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
                var listen = __webpack_require__(370);
                var listen_default = /*#__PURE__*/ __webpack_require__.n(listen);
                // EXTERNAL MODULE: ./node_modules/select/src/select.js
                var src_select = __webpack_require__(817);
                var select_default = /*#__PURE__*/ __webpack_require__.n(src_select);
                /**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */ function command(type) {
                    try {
                        return document.execCommand(type);
                    } catch (err) {
                        return false;
                    }
                }
                /**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */ var ClipboardActionCut = function ClipboardActionCut(target) {
                    var selectedText = select_default()(target);
                    command('cut');
                    return selectedText;
                };
                /* harmony default export */ var actions_cut = ClipboardActionCut;
                /**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */ function createFakeElement(value) {
                    var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
                    var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS
                    fakeElement.style.fontSize = '12pt'; // Reset box model
                    fakeElement.style.border = '0';
                    fakeElement.style.padding = '0';
                    fakeElement.style.margin = '0'; // Move element out of screen horizontally
                    fakeElement.style.position = 'absolute';
                    fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    fakeElement.style.top = "".concat(yPosition, "px");
                    fakeElement.setAttribute('readonly', '');
                    fakeElement.value = value;
                    return fakeElement;
                }
                /**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */ var fakeCopyAction = function fakeCopyAction(value, options) {
                    var fakeElement = createFakeElement(value);
                    options.container.appendChild(fakeElement);
                    var selectedText = select_default()(fakeElement);
                    command('copy');
                    fakeElement.remove();
                    return selectedText;
                };
                /**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */ var ClipboardActionCopy = function ClipboardActionCopy(target) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                        container: document.body
                    };
                    var selectedText = '';
                    if (typeof target === 'string') selectedText = fakeCopyAction(target, options);
                    else if (target instanceof HTMLInputElement && ![
                        'text',
                        'search',
                        'url',
                        'tel',
                        'password'
                    ].includes(target === null || target === void 0 ? void 0 : target.type)) // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
                    selectedText = fakeCopyAction(target.value, options);
                    else {
                        selectedText = select_default()(target);
                        command('copy');
                    }
                    return selectedText;
                };
                /* harmony default export */ var actions_copy = ClipboardActionCopy;
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                    else _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    return _typeof(obj);
                }
                /**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */ var ClipboardActionDefault = function ClipboardActionDefault() {
                    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    // Defines base properties passed from constructor.
                    var _options$action = options.action, action = _options$action === void 0 ? 'copy' : _options$action, container = options.container, target = options.target, text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.
                    if (action !== 'copy' && action !== 'cut') throw new Error('Invalid "action" value, use either "copy" or "cut"');
                     // Sets the `target` property using an element that will be have its content copied.
                    if (target !== undefined) {
                        if (target && _typeof(target) === 'object' && target.nodeType === 1) {
                            if (action === 'copy' && target.hasAttribute('disabled')) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                            if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        } else throw new Error('Invalid "target" value, use a valid Element');
                    } // Define selection strategy based on `text` property.
                    if (text) return actions_copy(text, {
                        container: container
                    });
                     // Defines which selection strategy based on `target` property.
                    if (target) return action === 'cut' ? actions_cut(target) : actions_copy(target, {
                        container: container
                    });
                };
                /* harmony default export */ var actions_default = ClipboardActionDefault;
                function clipboard_typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") clipboard_typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                    else clipboard_typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    return clipboard_typeof(obj);
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties(target, props) {
                    for(var i = 0; i < props.length; i++){
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                }
                function _setPrototypeOf(o, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                        o.__proto__ = p;
                        return o;
                    };
                    return _setPrototypeOf(o, p);
                }
                function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                        var Super = _getPrototypeOf(Derived), result;
                        if (hasNativeReflectConstruct) {
                            var NewTarget = _getPrototypeOf(this).constructor;
                            result = Reflect.construct(Super, arguments, NewTarget);
                        } else result = Super.apply(this, arguments);
                        return _possibleConstructorReturn(this, result);
                    };
                }
                function _possibleConstructorReturn(self, call) {
                    if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) return call;
                    return _assertThisInitialized(self);
                }
                function _assertThisInitialized(self) {
                    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return self;
                }
                function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                function _getPrototypeOf(o) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                        return o.__proto__ || Object.getPrototypeOf(o);
                    };
                    return _getPrototypeOf(o);
                }
                /**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */ function getAttributeValue(suffix, element) {
                    var attribute = "data-clipboard-".concat(suffix);
                    if (!element.hasAttribute(attribute)) return;
                    return element.getAttribute(attribute);
                }
                /**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */ var Clipboard = /*#__PURE__*/ function(_Emitter) {
                    _inherits(Clipboard, _Emitter);
                    var _super = _createSuper(Clipboard);
                    /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */ function Clipboard(trigger, options) {
                        var _this;
                        _classCallCheck(this, Clipboard);
                        _this = _super.call(this);
                        _this.resolveOptions(options);
                        _this.listenClick(trigger);
                        return _this;
                    }
                    /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */ _createClass(Clipboard, [
                        {
                            key: "resolveOptions",
                            value: function resolveOptions() {
                                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                                this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
                            }
                        },
                        {
                            key: "listenClick",
                            value: function listenClick(trigger) {
                                var _this2 = this;
                                this.listener = listen_default()(trigger, 'click', function(e) {
                                    return _this2.onClick(e);
                                });
                            }
                        },
                        {
                            key: "onClick",
                            value: function onClick(e) {
                                var trigger = e.delegateTarget || e.currentTarget;
                                var action = this.action(trigger) || 'copy';
                                var text = actions_default({
                                    action: action,
                                    container: this.container,
                                    target: this.target(trigger),
                                    text: this.text(trigger)
                                }); // Fires an event based on the copy operation result.
                                this.emit(text ? 'success' : 'error', {
                                    action: action,
                                    text: text,
                                    trigger: trigger,
                                    clearSelection: function clearSelection() {
                                        if (trigger) trigger.focus();
                                        window.getSelection().removeAllRanges();
                                    }
                                });
                            }
                        },
                        {
                            key: "defaultAction",
                            value: function defaultAction(trigger) {
                                return getAttributeValue('action', trigger);
                            }
                        },
                        {
                            key: "defaultTarget",
                            value: function defaultTarget(trigger) {
                                var selector = getAttributeValue('target', trigger);
                                if (selector) return document.querySelector(selector);
                            }
                        },
                        {
                            key: "defaultText",
                            /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */ value: function defaultText(trigger) {
                                return getAttributeValue('text', trigger);
                            }
                        },
                        {
                            key: "destroy",
                            value: function destroy() {
                                this.listener.destroy();
                            }
                        }
                    ], [
                        {
                            key: "copy",
                            value: function copy(target) {
                                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                                    container: document.body
                                };
                                return actions_copy(target, options);
                            }
                        },
                        {
                            key: "cut",
                            value: function cut(target) {
                                return actions_cut(target);
                            }
                        },
                        {
                            key: "isSupported",
                            value: function isSupported() {
                                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [
                                    'copy',
                                    'cut'
                                ];
                                var actions = typeof action === 'string' ? [
                                    action
                                ] : action;
                                var support = !!document.queryCommandSupported;
                                actions.forEach(function(action) {
                                    support = support && !!document.queryCommandSupported(action);
                                });
                                return support;
                            }
                        }
                    ]);
                    return Clipboard;
                }(tiny_emitter_default());
                /* harmony default export */ var clipboard = Clipboard;
            /***/ },
            /***/ 828: /***/ function(module1) {
                var DOCUMENT_NODE_TYPE = 9;
                /**
 * A polyfill for Element.matches()
 */ if (typeof Element !== 'undefined' && !Element.prototype.matches) {
                    var proto = Element.prototype;
                    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                }
                /**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */ function closest(element, selector) {
                    while(element && element.nodeType !== DOCUMENT_NODE_TYPE){
                        if (typeof element.matches === 'function' && element.matches(selector)) return element;
                        element = element.parentNode;
                    }
                }
                module1.exports = closest;
            /***/ },
            /***/ 438: /***/ function(module1, __unused_webpack_exports, __webpack_require__) {
                var closest = __webpack_require__(828);
                /**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */ function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);
                    element.addEventListener(type, listenerFn, useCapture);
                    return {
                        destroy: function() {
                            element.removeEventListener(type, listenerFn, useCapture);
                        }
                    };
                }
                /**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */ function delegate(elements, selector, type, callback, useCapture) {
                    // Handle the regular Element usage
                    if (typeof elements.addEventListener === 'function') return _delegate.apply(null, arguments);
                    // Handle Element-less usage, it defaults to global delegation
                    if (typeof type === 'function') // Use `document` as the first parameter, then apply arguments
                    // This is a short way to .unshift `arguments` without running into deoptimizations
                    return _delegate.bind(null, document).apply(null, arguments);
                    // Handle Selector-based usage
                    if (typeof elements === 'string') elements = document.querySelectorAll(elements);
                    // Handle Array-like based usage
                    return Array.prototype.map.call(elements, function(element) {
                        return _delegate(element, selector, type, callback, useCapture);
                    });
                }
                /**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */ function listener(element, selector, type, callback) {
                    return function(e) {
                        e.delegateTarget = closest(e.target, selector);
                        if (e.delegateTarget) callback.call(element, e);
                    };
                }
                module1.exports = delegate;
            /***/ },
            /***/ 879: /***/ function(__unused_webpack_module, exports) {
                /**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */ exports.node = function(value) {
                    return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
                };
                /**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */ exports.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
                };
                /**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */ exports.string = function(value) {
                    return typeof value === 'string' || value instanceof String;
                };
                /**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */ exports.fn = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return type === '[object Function]';
                };
            /***/ },
            /***/ 370: /***/ function(module1, __unused_webpack_exports, __webpack_require__) {
                var is = __webpack_require__(879);
                var delegate = __webpack_require__(438);
                /**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */ function listen(target, type, callback) {
                    if (!target && !type && !callback) throw new Error('Missing required arguments');
                    if (!is.string(type)) throw new TypeError('Second argument must be a String');
                    if (!is.fn(callback)) throw new TypeError('Third argument must be a Function');
                    if (is.node(target)) return listenNode(target, type, callback);
                    else if (is.nodeList(target)) return listenNodeList(target, type, callback);
                    else if (is.string(target)) return listenSelector(target, type, callback);
                    else throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                }
                /**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */ function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);
                    return {
                        destroy: function() {
                            node.removeEventListener(type, callback);
                        }
                    };
                }
                /**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */ function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                        node.addEventListener(type, callback);
                    });
                    return {
                        destroy: function() {
                            Array.prototype.forEach.call(nodeList, function(node) {
                                node.removeEventListener(type, callback);
                            });
                        }
                    };
                }
                /**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */ function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                }
                module1.exports = listen;
            /***/ },
            /***/ 817: /***/ function(module1) {
                function select(element) {
                    var selectedText;
                    if (element.nodeName === 'SELECT') {
                        element.focus();
                        selectedText = element.value;
                    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
                        var isReadOnly = element.hasAttribute('readonly');
                        if (!isReadOnly) element.setAttribute('readonly', '');
                        element.select();
                        element.setSelectionRange(0, element.value.length);
                        if (!isReadOnly) element.removeAttribute('readonly');
                        selectedText = element.value;
                    } else {
                        if (element.hasAttribute('contenteditable')) element.focus();
                        var selection = window.getSelection();
                        var range = document.createRange();
                        range.selectNodeContents(element);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        selectedText = selection.toString();
                    }
                    return selectedText;
                }
                module1.exports = select;
            /***/ },
            /***/ 279: /***/ function(module1) {
                function E() {
                // Keep this empty so it's easier to inherit from
                // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
                }
                E.prototype = {
                    on: function(name, callback, ctx) {
                        var e = this.e || (this.e = {});
                        (e[name] || (e[name] = [])).push({
                            fn: callback,
                            ctx: ctx
                        });
                        return this;
                    },
                    once: function(name, callback, ctx) {
                        var self = this;
                        function listener() {
                            self.off(name, listener);
                            callback.apply(ctx, arguments);
                        }
                        listener._ = callback;
                        return this.on(name, listener, ctx);
                    },
                    emit: function(name) {
                        var data = [].slice.call(arguments, 1);
                        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                        var i = 0;
                        var len = evtArr.length;
                        for(i; i < len; i++)evtArr[i].fn.apply(evtArr[i].ctx, data);
                        return this;
                    },
                    off: function(name, callback) {
                        var e = this.e || (this.e = {});
                        var evts = e[name];
                        var liveEvents = [];
                        if (evts && callback) {
                            for(var i = 0, len = evts.length; i < len; i++)if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
                        }
                        // Remove event from queue to prevent memory leak
                        // Suggested by https://github.com/lazd
                        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
                        liveEvents.length ? e[name] = liveEvents : delete e[name];
                        return this;
                    }
                };
                module1.exports = E;
                module1.exports.TinyEmitter = E;
            /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ if (__webpack_module_cache__[moduleId]) /******/ return __webpack_module_cache__[moduleId].exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module1 = __webpack_module_cache__[moduleId] = {
                /******/ // no module.id needed
                /******/ // no module.loaded needed
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __webpack_require__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/compat get default export */ /******/ !function() {
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/ __webpack_require__.n = function(module1) {
                /******/ var getter = module1 && module1.__esModule ? /******/ function() {
                    return module1['default'];
                } : /******/ function() {
                    return module1;
                };
                /******/ __webpack_require__.d(getter, {
                    a: getter
                });
                /******/ return getter;
            /******/ };
        /******/ }();
        /******/ /******/ /* webpack/runtime/define property getters */ /******/ !function() {
            /******/ // define getter functions for harmony exports
            /******/ __webpack_require__.d = function(exports, definition) {
                /******/ for(var key in definition)/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) /******/ Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: definition[key]
                });
            /******/ };
        /******/ }();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ !function() {
            /******/ __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            };
        /******/ }();
        /******/ /************************************************************************/ /******/ // module exports must be returned from runtime so entry inlining is disabled
        /******/ // startup
        /******/ // Load entry module and return exports
        /******/ return __webpack_require__(686);
    /******/ }().default;
});


new (0, (/*@__PURE__*/$parcel$interopDefault($2795bb3588ef9b49$exports)))('.btn');
// Sketchfab Viewer API: Start/Stop the viewer
var $30732a08c2749711$var$version = "1.12.1";
var $30732a08c2749711$var$iframe = document.getElementById("api-frame");
var $30732a08c2749711$var$client = new (0, (/*@__PURE__*/$parcel$interopDefault($99cbdba2fb53ce57$exports)))($30732a08c2749711$var$version, $30732a08c2749711$var$iframe);
var $30732a08c2749711$var$error = function error() {
    console.error("Sketchfab API error");
};
var $30732a08c2749711$var$success = function success(api) {
    api.addEventListener("viewerstart", function() {
        console.log("viewerstart");
    });
    api.addEventListener("viewerstop", function() {
        console.log("viewerstop");
    });
    api.start(function() {
        api.addEventListener("viewerready", function() {
            console.log("viewerReady");
            api.getAnnotationList(function(err, annotations) {
                if (!err) {
                    console.log("annotations", annotations);
                    if (annotations) {
                        const sketchfabAnnotations = annotations.map((anno)=>{
                            return {
                                title: anno.name,
                                position: anno.position,
                                localPosition: anno.localPosition,
                                eye: anno.eye,
                                target: anno.target
                            };
                        });
                        // Report SketchFab Annotation Format
                        const sketchfabAnnotationsInput = document.getElementById("sketchfab-annotations");
                        sketchfabAnnotationsInput.value = JSON.stringify(sketchfabAnnotations, null, 2);
                        // Convert and Report MorphoSource Annotation Format
                        $30732a08c2749711$var$updateMorphosourceAnnotations();
                    }
                }
                document.querySelector("#import-sketchfab .spinner-border").hidden = true;
            });
        // api.getSceneGraph(function (err, graph) {
        //   if (!err) {
        //     console.log("scene", graph); // { ... }
        //   }
        // });
        });
    });
};
function $30732a08c2749711$var$updateMorphosourceAnnotations() {
    const sketchfabAnnotationsInput = document.getElementById("sketchfab-annotations");
    const sketchfabAnnotations = JSON.parse(sketchfabAnnotationsInput.value);
    if (sketchfabAnnotations.length) {
        const morphosourceCameraScale = document.getElementById("morphosource-camera-scale");
        const morphosourceCameraScaleValue = parseFloat(morphosourceCameraScale.value) || 1.0;
        const morphosourceAnnotationsInput = document.getElementById("morphosource-annotations");
        morphosourceAnnotationsInput.value = JSON.stringify(sketchfabAnnotations.map((anno)=>{
            const cameraPosition = $30732a08c2749711$var$convertCoordsSfToMs(anno.eye);
            cameraPosition['x'] *= morphosourceCameraScaleValue;
            cameraPosition['y'] *= morphosourceCameraScaleValue;
            cameraPosition['z'] *= morphosourceCameraScaleValue;
            return {
                label: anno.title,
                description: anno.text,
                position: $30732a08c2749711$var$convertCoordsSfToMs(anno.position),
                cameraPosition: cameraPosition,
                cameraTarget: $30732a08c2749711$var$convertCoordsSfToMs(anno.target)
            };
        }), null, 2);
    }
}
document.getElementById("sketchfab-url").addEventListener("input", function() {
    this.setCustomValidity('');
});
document.getElementById("sketchfab-form").addEventListener("submit", function(event) {
    event.preventDefault();
    event.target.querySelector(".spinner-border").hidden = false;
    const urlElement = document.getElementById("sketchfab-url");
    if (!urlElement) return;
    urlElement.setCustomValidity('');
    const url = urlElement.value;
    const uid = $30732a08c2749711$var$extractSketchfabUID(url);
    if (uid) $30732a08c2749711$var$client.init(uid, {
        success: $30732a08c2749711$var$success,
        error: $30732a08c2749711$var$error,
        autostart: 1,
        preload: 1
    });
    else {
        urlElement.setCustomValidity("Invalid SketchFab URL");
        urlElement.reportValidity();
        event.target.querySelector(".spinner-border").hidden = true;
    }
});
document.getElementById("morphosource-units").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
document.getElementById("morphosource-extra-scale").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
document.getElementById("morphosource-camera-scale").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
document.getElementById("morphosource-transform-x").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
document.getElementById("morphosource-transform-y").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
document.getElementById("morphosource-transform-z").addEventListener("input", function() {
    $30732a08c2749711$var$updateMorphosourceAnnotations();
});
// For now, start by importing to speed up development
// const importSketchfabButton = document.getElementById("import-sketchfab");
// importSketchfabButton.click();
// Function to extract UID from SketchFab URL
function $30732a08c2749711$var$extractSketchfabUID(url) {
    const regex = /(?:models|3d-models)\/(?:.*-)?([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
// Code for converting to MS annotation format
function $30732a08c2749711$var$convertCoordsSfToMs(xyz) {
    if (xyz) {
        // Sometimes XYZ is an object instead of an array
        if (!Array.isArray(xyz)) xyz = [
            xyz["0"],
            xyz["1"],
            xyz["2"]
        ];
        const msUnit = document.getElementById("morphosource-units");
        const msUnitValue = parseFloat(msUnit.value) || 1.0;
        const msExtraScale = document.getElementById("morphosource-extra-scale");
        const msExtraScaleValue = parseFloat(msExtraScale.value) || 1.0;
        const msTransformX = parseFloat(document.getElementById("morphosource-transform-x").value) || 0.0;
        const msTransformY = parseFloat(document.getElementById("morphosource-transform-y").value) || 0.0;
        const msTransformZ = parseFloat(document.getElementById("morphosource-transform-z").value) || 0.0;
        // Where MS uses Y+ up Z+ toward viewer, SF uses Z+ up Y+ away from viewer
        return {
            x: xyz[0] * msUnitValue * msExtraScaleValue + msTransformX,
            y: xyz[2] * msUnitValue * msExtraScaleValue + msTransformY,
            z: xyz[1] * -1 * msUnitValue * msExtraScaleValue + msTransformZ
        };
    } else return undefined;
}


//# sourceMappingURL=export-sketchfab-annotations.98e66b73.js.map
