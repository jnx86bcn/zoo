/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/vendor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@microsoft/load-themed-styles/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@microsoft/load-themed-styles/lib/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
 * to use if that slot is not specified by the theme.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
// value will initialize as undefined, and later will be set once on first loadStyles injection.
var _injectStylesWithCssText;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
var _themeState = initializeThemeState();
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
// tslint:disable-next-line:max-line-length
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
/** Maximum style text length, for supporting IE style restrictions. */
var MAX_STYLE_CONTENT_SIZE = 10000;
var now = function () { return (typeof performance !== 'undefined' && !!performance.now) ? performance.now() : Date.now(); };
function measure(func) {
    var start = now();
    func();
    var end = now();
    _themeState.perf.duration += end - start;
}
/**
 * initialize global state object
 */
function initializeThemeState() {
    var state = _root.__themeState__ || {
        theme: undefined,
        lastStyleElement: undefined,
        registeredStyles: []
    };
    if (!state.runState) {
        state = __assign({}, (state), { perf: {
                count: 0,
                duration: 0
            }, runState: {
                flushTimer: 0,
                mode: 0 /* sync */,
                buffer: []
            } });
    }
    if (!state.registeredThemableStyles) {
        state = __assign({}, (state), { registeredThemableStyles: [] });
    }
    _root.__themeState__ = state;
    return state;
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 * @param {boolean} loadAsync When true, always load styles in async mode, irrespective of current sync mode.
 */
function loadStyles(styles, loadAsync) {
    if (loadAsync === void 0) { loadAsync = false; }
    measure(function () {
        var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
        if (_injectStylesWithCssText === undefined) {
            _injectStylesWithCssText = shouldUseCssText();
        }
        var _a = _themeState.runState, mode = _a.mode, buffer = _a.buffer, flushTimer = _a.flushTimer;
        if (loadAsync || mode === 1 /* async */) {
            buffer.push(styleParts);
            if (!flushTimer) {
                _themeState.runState.flushTimer = asyncLoadStyles();
            }
        }
        else {
            applyThemableStyles(styleParts);
        }
    });
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
exports.configureRunMode = configureRunMode;
/**
 * external code can call flush to synchronously force processing of currently buffered styles
 */
function flush() {
    measure(function () {
        var styleArrays = _themeState.runState.buffer.slice();
        _themeState.runState.buffer = [];
        var mergedStyleArray = [].concat.apply([], styleArrays);
        if (mergedStyleArray.length > 0) {
            applyThemableStyles(mergedStyleArray);
        }
    });
}
exports.flush = flush;
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    return setTimeout(function () {
        _themeState.runState.flushTimer = 0;
        flush();
    }, 0);
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
    }
    else {
        _injectStylesWithCssText ?
            registerStylesIE(stylesArray, styleRecord) :
            registerStyles(stylesArray);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 * @option: specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = 3 /* all */; }
    if (option === 3 /* all */ || option === 2 /* onlyNonThemable */) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === 3 /* all */ || option === 1 /* onlyThemable */) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
exports.clearStyles = clearStyles;
function clearStylesInternal(records) {
    records.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
}
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        var themableStyles = [];
        for (var _i = 0, _a = _themeState.registeredThemableStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            themableStyles.push(styleRecord.themableStyle);
        }
        if (themableStyles.length > 0) {
            clearStyles(1 /* onlyThemable */);
            applyThemableStyles([].concat.apply([], themableStyles));
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles)).styleString;
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var themable = false;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            themable = true;
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, but only if "DEBUG" is true.
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme && !themedValue && console && !(themeSlot in theme) && typeof DEBUG !== 'undefined' && DEBUG) {
                console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + defaultValue + "\".");
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return {
        styleString: resolvedArray.join(''),
        themable: themable
    };
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0; // tslint:disable-line:no-null-keyword
        while (tokenMatch = _themeTokenRegex.exec(styles)) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray) {
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    var _a = resolveThemableArray(styleArray), styleString = _a.styleString, themable = _a.themable;
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styleString));
    _themeState.perf.count++;
    head.appendChild(styleElement);
    var record = {
        styleElement: styleElement,
        themableStyle: styleArray
    };
    if (themable) {
        _themeState.registeredThemableStyles.push(record);
    }
    else {
        _themeState.registeredStyles.push(record);
    }
}
/**
 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
 * to register slightly differently.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStylesIE(styleArray, styleRecord) {
    var head = document.getElementsByTagName('head')[0];
    var registeredStyles = _themeState.registeredStyles;
    var lastStyleElement = _themeState.lastStyleElement;
    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
    var resolvedStyleText = resolveThemableArray(styleArray).styleString;
    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
        lastStyleElement = document.createElement('style');
        lastStyleElement.type = 'text/css';
        if (styleRecord) {
            head.replaceChild(lastStyleElement, styleRecord.styleElement);
            styleRecord.styleElement = lastStyleElement;
        }
        else {
            head.appendChild(lastStyleElement);
        }
        if (!styleRecord) {
            lastRegisteredStyle = {
                styleElement: lastStyleElement,
                themableStyle: styleArray
            };
            registeredStyles.push(lastRegisteredStyle);
        }
    }
    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
    // Preserve the theme state.
    _themeState.lastStyleElement = lastStyleElement;
}
/**
 * Checks to see if styleSheet exists as a property off of a style element.
 * This will determine if style registration should be done via cssText (<= IE9) or not
 */
function shouldUseCssText() {
    var useCSSText = false;
    if (typeof document !== 'undefined') {
        var emptyStyle = document.createElement('style');
        emptyStyle.type = 'text/css';
        useCSSText = !!emptyStyle.styleSheet;
    }
    return useCSSText;
}
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/Stylesheet.js ***!
  \***************************************************************/
/*! exports provided: InjectionMode, Stylesheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectionMode", function() { return InjectionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return Stylesheet; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

/**
 * Injection mode for the stylesheet.
 *
 * @public
 */
var InjectionMode;
(function (InjectionMode) {
    /**
     * Avoids style injection, use getRules() to read the styles.
     */
    InjectionMode[InjectionMode["none"] = 0] = "none";
    /**
     * Inserts rules using the insertRule api.
     */
    InjectionMode[InjectionMode["insertNode"] = 1] = "insertNode";
    /**
     * Appends rules using appendChild.
     */
    InjectionMode[InjectionMode["appendChild"] = 2] = "appendChild";
})(InjectionMode || (InjectionMode = {}));
var STYLESHEET_SETTING = '__stylesheet__';
// tslint:disable-next-line:no-any
var _fileScopedGlobal = {};
var _stylesheet;
/**
 * Represents the state of styles registered in the page. Abstracts
 * the surface for adding styles to the stylesheet, exposes helpers
 * for reading the styles registered in server rendered scenarios.
 *
 * @public
 */
var Stylesheet = /** @class */ (function () {
    function Stylesheet(config) {
        this._rules = [];
        this._preservedRules = [];
        this._rulesToInsert = [];
        this._counter = 0;
        this._keyToClassName = {};
        this._onResetCallbacks = [];
        // tslint:disable-next-line:no-any
        this._classNameToArgs = {};
        this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ injectionMode: 1 /* insertNode */, defaultPrefix: 'css', namespace: undefined }, config);
    }
    /**
     * Gets the singleton instance.
     */
    Stylesheet.getInstance = function () {
        // tslint:disable-next-line:no-any
        var global = typeof window !== 'undefined' ? window : typeof process !== 'undefined' ? process : _fileScopedGlobal;
        _stylesheet = global[STYLESHEET_SETTING];
        if (!_stylesheet || (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== document)) {
            // tslint:disable-next-line:no-string-literal
            var fabricConfig = (global && global['FabricConfig']) || {};
            _stylesheet = global[STYLESHEET_SETTING] = new Stylesheet(fabricConfig.mergeStyles);
        }
        return _stylesheet;
    };
    /**
     * Configures the stylesheet.
     */
    Stylesheet.prototype.setConfig = function (config) {
        this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this._config, config);
    };
    /**
     * Configures a reset callback.
     *
     * @param callback - A callback which will be called when the Stylesheet is reset.
     */
    Stylesheet.prototype.onReset = function (callback) {
        this._onResetCallbacks.push(callback);
    };
    /**
     * Generates a unique classname.
     *
     * @param displayName - Optional value to use as a prefix.
     */
    Stylesheet.prototype.getClassName = function (displayName) {
        var namespace = this._config.namespace;
        var prefix = displayName || this._config.defaultPrefix;
        return "" + (namespace ? namespace + '-' : '') + prefix + "-" + this._counter++;
    };
    /**
     * Used internally to cache information about a class which was
     * registered with the stylesheet.
     */
    Stylesheet.prototype.cacheClassName = function (className, key, args, rules) {
        this._keyToClassName[key] = className;
        this._classNameToArgs[className] = {
            args: args,
            rules: rules
        };
    };
    /**
     * Gets the appropriate classname given a key which was previously
     * registered using cacheClassName.
     */
    Stylesheet.prototype.classNameFromKey = function (key) {
        return this._keyToClassName[key];
    };
    /**
     * Gets the arguments associated with a given classname which was
     * previously registered using cacheClassName.
     */
    Stylesheet.prototype.argsFromClassName = function (className) {
        var entry = this._classNameToArgs[className];
        return entry && entry.args;
    };
    /**
     * Gets the arguments associated with a given classname which was
     * previously registered using cacheClassName.
     */
    Stylesheet.prototype.insertedRulesFromClassName = function (className) {
        var entry = this._classNameToArgs[className];
        return entry && entry.rules;
    };
    /**
     * Inserts a css rule into the stylesheet.
     * @param preserve - Preserves the rule beyond a reset boundary.
     */
    Stylesheet.prototype.insertRule = function (rule, preserve) {
        var injectionMode = this._config.injectionMode;
        var element = injectionMode !== 0 /* none */ ? this._getStyleElement() : undefined;
        if (preserve) {
            this._preservedRules.push(rule);
        }
        if (element) {
            switch (this._config.injectionMode) {
                case 1 /* insertNode */:
                    var sheet = element.sheet;
                    try {
                        sheet.insertRule(rule, sheet.cssRules.length);
                    }
                    catch (e) {
                        // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
                        // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
                        // which could be slower and bulkier.
                    }
                    break;
                case 2 /* appendChild */:
                    element.appendChild(document.createTextNode(rule));
                    break;
            }
        }
        else {
            this._rules.push(rule);
        }
        if (this._config.onInsertRule) {
            this._config.onInsertRule(rule);
        }
    };
    /**
     * Gets all rules registered with the stylesheet; only valid when
     * using InsertionMode.none.
     */
    Stylesheet.prototype.getRules = function (includePreservedRules) {
        return (includePreservedRules ? this._preservedRules.join('') : '') + this._rules.join('') + this._rulesToInsert.join('');
    };
    /**
     * Resets the internal state of the stylesheet. Only used in server
     * rendered scenarios where we're using InsertionMode.none.
     */
    Stylesheet.prototype.reset = function () {
        this._rules = [];
        this._rulesToInsert = [];
        this._counter = 0;
        this._classNameToArgs = {};
        this._keyToClassName = {};
        this._onResetCallbacks.forEach(function (callback) { return callback(); });
    };
    // Forces the regeneration of incoming styles without totally resetting the stylesheet.
    Stylesheet.prototype.resetKeys = function () {
        this._keyToClassName = {};
    };
    Stylesheet.prototype._getStyleElement = function () {
        var _this = this;
        if (!this._styleElement && typeof document !== 'undefined') {
            this._styleElement = this._createStyleElement();
            // Reset the style element on the next frame.
            window.requestAnimationFrame(function () {
                _this._styleElement = undefined;
            });
        }
        return this._styleElement;
    };
    Stylesheet.prototype._createStyleElement = function () {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('data-merge-styles', 'true');
        styleElement.type = 'text/css';
        if (this._lastStyleElement && this._lastStyleElement.nextElementSibling) {
            document.head.insertBefore(styleElement, this._lastStyleElement.nextElementSibling);
        }
        else {
            document.head.appendChild(styleElement);
        }
        this._lastStyleElement = styleElement;
        return styleElement;
    };
    return Stylesheet;
}());

//# sourceMappingURL=Stylesheet.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/concatStyleSets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/concatStyleSets.js ***!
  \********************************************************************/
/*! exports provided: concatStyleSets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatStyleSets", function() { return concatStyleSets; });
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSets - One or more stylesets to be merged (each param can also be falsy).
 */
function concatStyleSets() {
    var styleSets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        styleSets[_i] = arguments[_i];
    }
    var mergedSet = {};
    // We process sub component styles in two phases. First we collect them, then we combine them into 1 style function.
    var workingSubcomponentStyles = {};
    for (var _a = 0, styleSets_1 = styleSets; _a < styleSets_1.length; _a++) {
        var currentSet = styleSets_1[_a];
        if (currentSet) {
            for (var prop in currentSet) {
                if (currentSet.hasOwnProperty(prop)) {
                    if (prop === 'subComponentStyles' && currentSet.subComponentStyles !== undefined) {
                        // subcomponent styles - style functions or objects
                        var currentComponentStyles = currentSet.subComponentStyles;
                        for (var subCompProp in currentComponentStyles) {
                            if (currentComponentStyles.hasOwnProperty(subCompProp)) {
                                if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                                    workingSubcomponentStyles[subCompProp].push(currentComponentStyles[subCompProp]);
                                }
                                else {
                                    workingSubcomponentStyles[subCompProp] = [currentComponentStyles[subCompProp]];
                                }
                            }
                        }
                        continue;
                    }
                    // the as any casts below is a workaround for ts 2.8.
                    // todo: remove cast to any in ts 2.9.
                    var mergedValue = mergedSet[prop];
                    var currentValue = currentSet[prop];
                    if (mergedValue === undefined) {
                        mergedSet[prop] = currentValue;
                    }
                    else {
                        mergedSet[prop] = (Array.isArray(mergedValue) ? mergedValue : [mergedValue]).concat((Array.isArray(currentValue) ? currentValue : [currentValue]));
                    }
                }
            }
        }
    }
    if (Object.keys(workingSubcomponentStyles).length > 0) {
        mergedSet.subComponentStyles = {};
        var mergedSubStyles = mergedSet.subComponentStyles;
        var _loop_1 = function (subCompProp) {
            if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                var workingSet_1 = workingSubcomponentStyles[subCompProp];
                mergedSubStyles[subCompProp] = function (styleProps) {
                    return concatStyleSets.apply(void 0, workingSet_1.map(function (styleFunctionOrObject) {
                        return typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject;
                    }));
                };
            }
        };
        // now we process the subcomponent styles if there are any
        for (var subCompProp in workingSubcomponentStyles) {
            _loop_1(subCompProp);
        }
    }
    return mergedSet;
}
//# sourceMappingURL=concatStyleSets.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/extractStyleParts.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/extractStyleParts.js ***!
  \**********************************************************************/
/*! exports provided: extractStyleParts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractStyleParts", function() { return extractStyleParts; });
/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");

/**
 * Separates the classes and style objects. Any classes that are pre-registered
 * args are auto expanded into objects.
 */
function extractStyleParts() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    var objects = [];
    var stylesheet = _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
    function _processArgs(argsList) {
        for (var _i = 0, argsList_1 = argsList; _i < argsList_1.length; _i++) {
            var arg = argsList_1[_i];
            if (arg) {
                if (typeof arg === 'string') {
                    if (arg.indexOf(' ') >= 0) {
                        _processArgs(arg.split(' '));
                    }
                    else {
                        var translatedArgs = stylesheet.argsFromClassName(arg);
                        if (translatedArgs) {
                            _processArgs(translatedArgs);
                        }
                        else {
                            // Avoid adding the same class twice.
                            if (classes.indexOf(arg) === -1) {
                                classes.push(arg);
                            }
                        }
                    }
                }
                else if (Array.isArray(arg)) {
                    _processArgs(arg);
                }
                else if (typeof arg === 'object') {
                    objects.push(arg);
                }
            }
        }
    }
    _processArgs(args);
    return {
        classes: classes,
        objects: objects
    };
}
//# sourceMappingURL=extractStyleParts.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/fontFace.js":
/*!*************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/fontFace.js ***!
  \*************************************************************/
/*! exports provided: fontFace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return fontFace; });
/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");
/* harmony import */ var _styleToClassName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styleToClassName */ "./node_modules/@uifabric/merge-styles/lib/styleToClassName.js");


/**
 * Registers a font face.
 * @public
 */
function fontFace(font) {
    _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance().insertRule("@font-face{" + Object(_styleToClassName__WEBPACK_IMPORTED_MODULE_1__["serializeRuleEntries"])(font) + "}", true);
}
//# sourceMappingURL=fontFace.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/getVendorSettings.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/getVendorSettings.js ***!
  \**********************************************************************/
/*! exports provided: getVendorSettings, setVendorSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVendorSettings", function() { return getVendorSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVendorSettings", function() { return setVendorSettings; });
var _vendorSettings;
function getVendorSettings() {
    if (!_vendorSettings) {
        var doc = typeof document !== 'undefined' ? document : undefined;
        var nav = typeof navigator !== 'undefined' ? navigator : undefined;
        var userAgent = nav ? nav.userAgent.toLowerCase() : undefined;
        if (!doc) {
            _vendorSettings = {
                isWebkit: true,
                isMoz: true,
                isOpera: true,
                isMs: true
            };
        }
        else {
            _vendorSettings = {
                isWebkit: !!(doc && 'WebkitAppearance' in doc.documentElement.style),
                isMoz: !!(userAgent && userAgent.indexOf('firefox') > -1),
                isOpera: !!(userAgent && userAgent.indexOf('opera') > -1),
                isMs: !!(nav && (/rv:11.0/i.test(nav.userAgent) || /Edge\/\d./i.test(navigator.userAgent)))
            };
        }
    }
    return _vendorSettings;
}
/**
 * Sets the vendor settings for prefixing and vendor specific operations.
 */
function setVendorSettings(vendorSettings) {
    _vendorSettings = vendorSettings;
}
//# sourceMappingURL=getVendorSettings.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/index.js ***!
  \**********************************************************/
/*! exports provided: mergeStyles, mergeStyleSets, concatStyleSets, fontFace, keyframes, InjectionMode, Stylesheet, setRTL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mergeStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeStyles */ "./node_modules/@uifabric/merge-styles/lib/mergeStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return _mergeStyles__WEBPACK_IMPORTED_MODULE_0__["mergeStyles"]; });

/* harmony import */ var _mergeStyleSets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeStyleSets */ "./node_modules/@uifabric/merge-styles/lib/mergeStyleSets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyleSets", function() { return _mergeStyleSets__WEBPACK_IMPORTED_MODULE_1__["mergeStyleSets"]; });

/* harmony import */ var _concatStyleSets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./concatStyleSets */ "./node_modules/@uifabric/merge-styles/lib/concatStyleSets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatStyleSets", function() { return _concatStyleSets__WEBPACK_IMPORTED_MODULE_2__["concatStyleSets"]; });

/* harmony import */ var _fontFace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fontFace */ "./node_modules/@uifabric/merge-styles/lib/fontFace.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return _fontFace__WEBPACK_IMPORTED_MODULE_3__["fontFace"]; });

/* harmony import */ var _keyframes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyframes */ "./node_modules/@uifabric/merge-styles/lib/keyframes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return _keyframes__WEBPACK_IMPORTED_MODULE_4__["keyframes"]; });

/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InjectionMode", function() { return _Stylesheet__WEBPACK_IMPORTED_MODULE_5__["InjectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return _Stylesheet__WEBPACK_IMPORTED_MODULE_5__["Stylesheet"]; });

/* harmony import */ var _transforms_rtlifyRules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transforms/rtlifyRules */ "./node_modules/@uifabric/merge-styles/lib/transforms/rtlifyRules.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRTL", function() { return _transforms_rtlifyRules__WEBPACK_IMPORTED_MODULE_6__["setRTL"]; });

/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./version */ "./node_modules/@uifabric/merge-styles/lib/version.js");








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/keyframes.js":
/*!**************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/keyframes.js ***!
  \**************************************************************/
/*! exports provided: keyframes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");
/* harmony import */ var _styleToClassName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styleToClassName */ "./node_modules/@uifabric/merge-styles/lib/styleToClassName.js");


/**
 * Registers keyframe definitions.
 *
 * @public
 */
function keyframes(timeline) {
    var stylesheet = _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
    var name = stylesheet.getClassName();
    var rulesArray = [];
    for (var prop in timeline) {
        if (timeline.hasOwnProperty(prop)) {
            rulesArray.push(prop, '{', Object(_styleToClassName__WEBPACK_IMPORTED_MODULE_1__["serializeRuleEntries"])(timeline[prop]), '}');
        }
    }
    var rules = rulesArray.join('');
    stylesheet.insertRule("@keyframes " + name + "{" + rules + "}", true);
    stylesheet.cacheClassName(name, rules, [], ['keyframes', rules]);
    return name;
}
//# sourceMappingURL=keyframes.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/mergeStyleSets.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/mergeStyleSets.js ***!
  \*******************************************************************/
/*! exports provided: mergeStyleSets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeStyleSets", function() { return mergeStyleSets; });
/* harmony import */ var _extractStyleParts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extractStyleParts */ "./node_modules/@uifabric/merge-styles/lib/extractStyleParts.js");
/* harmony import */ var _concatStyleSets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concatStyleSets */ "./node_modules/@uifabric/merge-styles/lib/concatStyleSets.js");
/* harmony import */ var _styleToClassName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styleToClassName */ "./node_modules/@uifabric/merge-styles/lib/styleToClassName.js");



/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
function mergeStyleSets() {
    var styleSets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        styleSets[_i] = arguments[_i];
    }
    // tslint:disable-next-line:no-any
    var classNameSet = { subComponentStyles: {} };
    var classMap = {};
    var styleSet = styleSets[0];
    if (!styleSet && styleSets.length <= 1) {
        return { subComponentStyles: {} };
    }
    var concatenatedStyleSet = 
    // we have guarded against falsey values just above.
    styleSet;
    concatenatedStyleSet = _concatStyleSets__WEBPACK_IMPORTED_MODULE_1__["concatStyleSets"].apply(void 0, styleSets);
    var registrations = [];
    for (var styleSetArea in concatenatedStyleSet) {
        if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
            if (styleSetArea === 'subComponentStyles') {
                classNameSet.subComponentStyles = concatenatedStyleSet.subComponentStyles || {};
                continue;
            }
            var styles = concatenatedStyleSet[styleSetArea];
            var _a = Object(_extractStyleParts__WEBPACK_IMPORTED_MODULE_0__["extractStyleParts"])(styles), classes = _a.classes, objects = _a.objects;
            var registration = Object(_styleToClassName__WEBPACK_IMPORTED_MODULE_2__["styleToRegistration"])({ displayName: styleSetArea }, objects);
            registrations.push(registration);
            if (registration) {
                classMap[styleSetArea] = registration.className;
                // as any cast not needed in ts >=2.9
                classNameSet[styleSetArea] = classes.concat([registration.className]).join(' ');
            }
        }
    }
    for (var _b = 0, registrations_1 = registrations; _b < registrations_1.length; _b++) {
        var registration = registrations_1[_b];
        if (registration) {
            Object(_styleToClassName__WEBPACK_IMPORTED_MODULE_2__["applyRegistration"])(registration, classMap);
        }
    }
    return classNameSet;
}
//# sourceMappingURL=mergeStyleSets.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/mergeStyles.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/mergeStyles.js ***!
  \****************************************************************/
/*! exports provided: mergeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return mergeStyles; });
/* harmony import */ var _styleToClassName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styleToClassName */ "./node_modules/@uifabric/merge-styles/lib/styleToClassName.js");
/* harmony import */ var _extractStyleParts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extractStyleParts */ "./node_modules/@uifabric/merge-styles/lib/extractStyleParts.js");


/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
function mergeStyles() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = Object(_extractStyleParts__WEBPACK_IMPORTED_MODULE_1__["extractStyleParts"])(args), classes = _a.classes, objects = _a.objects;
    if (objects.length) {
        classes.push(Object(_styleToClassName__WEBPACK_IMPORTED_MODULE_0__["styleToClassName"])(objects));
    }
    return classes.join(' ');
}
//# sourceMappingURL=mergeStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/styleToClassName.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/styleToClassName.js ***!
  \*********************************************************************/
/*! exports provided: serializeRuleEntries, styleToRegistration, applyRegistration, styleToClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeRuleEntries", function() { return serializeRuleEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleToRegistration", function() { return styleToRegistration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyRegistration", function() { return applyRegistration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleToClassName", function() { return styleToClassName; });
/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");
/* harmony import */ var _transforms_kebabRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transforms/kebabRules */ "./node_modules/@uifabric/merge-styles/lib/transforms/kebabRules.js");
/* harmony import */ var _transforms_prefixRules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transforms/prefixRules */ "./node_modules/@uifabric/merge-styles/lib/transforms/prefixRules.js");
/* harmony import */ var _transforms_provideUnits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transforms/provideUnits */ "./node_modules/@uifabric/merge-styles/lib/transforms/provideUnits.js");
/* harmony import */ var _transforms_rtlifyRules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transforms/rtlifyRules */ "./node_modules/@uifabric/merge-styles/lib/transforms/rtlifyRules.js");





var DISPLAY_NAME = 'displayName';
function getDisplayName(rules) {
    var rootStyle = rules && rules['&'];
    return rootStyle ? rootStyle.displayName : undefined;
}
function extractRules(args, rules, currentSelector) {
    if (rules === void 0) { rules = { __order: [] }; }
    if (currentSelector === void 0) { currentSelector = '&'; }
    var stylesheet = _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
    var currentRules = rules[currentSelector];
    if (!currentRules) {
        currentRules = {};
        rules[currentSelector] = currentRules;
        rules.__order.push(currentSelector);
    }
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var arg = args_1[_i];
        // If the arg is a string, we need to look up the class map and merge.
        if (typeof arg === 'string') {
            var expandedRules = stylesheet.argsFromClassName(arg);
            if (expandedRules) {
                extractRules(expandedRules, rules, currentSelector);
            }
            // Else if the arg is an array, we need to recurse in.
        }
        else if (Array.isArray(arg)) {
            extractRules(arg, rules, currentSelector);
        }
        else {
            // tslint:disable-next-line:no-any
            for (var prop in arg) {
                if (prop === 'selectors') {
                    // tslint:disable-next-line:no-any
                    var selectors = arg.selectors;
                    for (var newSelector in selectors) {
                        if (selectors.hasOwnProperty(newSelector)) {
                            var selectorValue = selectors[newSelector];
                            if (newSelector.indexOf(':global(') === 0) {
                                newSelector = newSelector.replace(/:global\(|\)$/g, '');
                            }
                            else if (newSelector.indexOf('@') === 0) {
                                newSelector = newSelector + '{' + currentSelector;
                            }
                            else if (newSelector.indexOf(':') === 0) {
                                newSelector = currentSelector + newSelector;
                            }
                            else if (newSelector.indexOf('&') < 0) {
                                newSelector = currentSelector + ' ' + newSelector;
                            }
                            extractRules([selectorValue], rules, newSelector);
                        }
                    }
                }
                else {
                    if (arg[prop] !== undefined) {
                        // Else, add the rule to the currentSelector.
                        if (prop === 'margin' || prop === 'padding') {
                            // tslint:disable-next-line:no-any
                            expandQuads(currentRules, prop, arg[prop]);
                        }
                        else {
                            // tslint:disable-next-line:no-any
                            currentRules[prop] = arg[prop];
                        }
                    }
                }
            }
        }
    }
    return rules;
}
function expandQuads(currentRules, name, value) {
    var parts = typeof value === 'string' ? value.split(' ') : [value];
    currentRules[name + 'Top'] = parts[0];
    currentRules[name + 'Right'] = parts[1] || parts[0];
    currentRules[name + 'Bottom'] = parts[2] || parts[0];
    currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}
function getKeyForRules(rules) {
    var serialized = [];
    var hasProps = false;
    for (var _i = 0, _a = rules.__order; _i < _a.length; _i++) {
        var selector = _a[_i];
        serialized.push(selector);
        var rulesForSelector = rules[selector];
        for (var propName in rulesForSelector) {
            if (rulesForSelector.hasOwnProperty(propName) && rulesForSelector[propName] !== undefined) {
                hasProps = true;
                serialized.push(propName, rulesForSelector[propName]);
            }
        }
    }
    return hasProps ? serialized.join('') : undefined;
}
function serializeRuleEntries(ruleEntries) {
    if (!ruleEntries) {
        return '';
    }
    var allEntries = [];
    for (var entry in ruleEntries) {
        if (ruleEntries.hasOwnProperty(entry) && entry !== DISPLAY_NAME && ruleEntries[entry] !== undefined) {
            allEntries.push(entry, ruleEntries[entry]);
        }
    }
    // Apply transforms.
    for (var i = 0; i < allEntries.length; i += 2) {
        Object(_transforms_kebabRules__WEBPACK_IMPORTED_MODULE_1__["kebabRules"])(allEntries, i);
        Object(_transforms_provideUnits__WEBPACK_IMPORTED_MODULE_3__["provideUnits"])(allEntries, i);
        Object(_transforms_rtlifyRules__WEBPACK_IMPORTED_MODULE_4__["rtlifyRules"])(allEntries, i);
        Object(_transforms_prefixRules__WEBPACK_IMPORTED_MODULE_2__["prefixRules"])(allEntries, i);
    }
    // Apply punctuation.
    for (var i = 1; i < allEntries.length; i += 4) {
        allEntries.splice(i, 1, ':', allEntries[i], ';');
    }
    return allEntries.join('');
}
function styleToRegistration() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var rules = extractRules(args);
    var key = getKeyForRules(rules);
    if (key) {
        var stylesheet = _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
        var registration = {
            className: stylesheet.classNameFromKey(key),
            key: key,
            args: args
        };
        if (!registration.className) {
            registration.className = stylesheet.getClassName(getDisplayName(rules));
            var rulesToInsert = [];
            for (var _a = 0, _b = rules.__order; _a < _b.length; _a++) {
                var selector = _b[_a];
                rulesToInsert.push(selector, serializeRuleEntries(rules[selector]));
            }
            registration.rulesToInsert = rulesToInsert;
        }
        return registration;
    }
}
function applyRegistration(registration, classMap) {
    var stylesheet = _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
    var className = registration.className, key = registration.key, args = registration.args, rulesToInsert = registration.rulesToInsert;
    if (rulesToInsert) {
        // rulesToInsert is an ordered array of selector/rule pairs.
        for (var i = 0; i < rulesToInsert.length; i += 2) {
            var rules = rulesToInsert[i + 1];
            if (rules) {
                var selector = rulesToInsert[i];
                // Fix selector using map.
                selector = selector.replace(/(&)|\$([\w-]+)\b/g, function (match, amp, cn) {
                    if (amp) {
                        return '.' + registration.className;
                    }
                    else if (cn) {
                        return '.' + ((classMap && classMap[cn]) || cn);
                    }
                    return '';
                });
                // Insert. Note if a media query, we must close the query with a final bracket.
                var processedRule = selector + "{" + rules + "}" + (selector.indexOf('@') === 0 ? '}' : '');
                stylesheet.insertRule(processedRule);
            }
        }
        stylesheet.cacheClassName(className, key, args, rulesToInsert);
    }
}
function styleToClassName() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var registration = styleToRegistration.apply(void 0, args);
    if (registration) {
        applyRegistration(registration);
        return registration.className;
    }
    return '';
}
//# sourceMappingURL=styleToClassName.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/transforms/kebabRules.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/transforms/kebabRules.js ***!
  \**************************************************************************/
/*! exports provided: kebabRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kebabRules", function() { return kebabRules; });
function kebabRules(rulePairs, index) {
    rulePairs[index] = rulePairs[index].replace(/([A-Z])/g, '-$1').toLowerCase();
}
//# sourceMappingURL=kebabRules.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/transforms/prefixRules.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/transforms/prefixRules.js ***!
  \***************************************************************************/
/*! exports provided: prefixRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixRules", function() { return prefixRules; });
/* harmony import */ var _getVendorSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../getVendorSettings */ "./node_modules/@uifabric/merge-styles/lib/getVendorSettings.js");

var autoPrefixNames = {
    'user-select': 1
};
function prefixRules(rulePairs, index) {
    var vendorSettings = Object(_getVendorSettings__WEBPACK_IMPORTED_MODULE_0__["getVendorSettings"])();
    var name = rulePairs[index];
    if (autoPrefixNames[name]) {
        var value = rulePairs[index + 1];
        if (autoPrefixNames[name]) {
            if (vendorSettings.isWebkit) {
                rulePairs.push('-webkit-' + name, value);
            }
            if (vendorSettings.isMoz) {
                rulePairs.push('-moz-' + name, value);
            }
            if (vendorSettings.isMs) {
                rulePairs.push('-ms-' + name, value);
            }
            if (vendorSettings.isOpera) {
                rulePairs.push('-o-' + name, value);
            }
        }
    }
}
//# sourceMappingURL=prefixRules.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/transforms/provideUnits.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/transforms/provideUnits.js ***!
  \****************************************************************************/
/*! exports provided: provideUnits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideUnits", function() { return provideUnits; });
var NON_PIXEL_NUMBER_PROPS = [
    'column-count',
    'font-weight',
    'flex-basis',
    'flex',
    'flex-grow',
    'flex-shrink',
    'fill-opacity',
    'opacity',
    'order',
    'z-index',
    'zoom'
];
function provideUnits(rulePairs, index) {
    var name = rulePairs[index];
    var value = rulePairs[index + 1];
    if (typeof value === 'number') {
        var unit = NON_PIXEL_NUMBER_PROPS.indexOf(name) === -1 ? 'px' : '';
        rulePairs[index + 1] = "" + value + unit;
    }
}
//# sourceMappingURL=provideUnits.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/transforms/rtlifyRules.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/transforms/rtlifyRules.js ***!
  \***************************************************************************/
/*! exports provided: setRTL, getRTL, rtlifyRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRTL", function() { return setRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRTL", function() { return getRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rtlifyRules", function() { return rtlifyRules; });
/* harmony import */ var _Stylesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stylesheet */ "./node_modules/@uifabric/merge-styles/lib/Stylesheet.js");

var LEFT = 'left';
var RIGHT = 'right';
var NO_FLIP = '@noflip';
var NAME_REPLACEMENTS = (_a = {},
    _a[LEFT] = RIGHT,
    _a[RIGHT] = LEFT,
    _a);
var VALUE_REPLACEMENTS = {
    'w-resize': 'e-resize',
    'sw-resize': 'se-resize',
    'nw-resize': 'ne-resize'
};
var _rtl = getRTL();
/**
 * Sets the current RTL value.
 */
function setRTL(isRTL) {
    if (_rtl !== isRTL) {
        _Stylesheet__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance().resetKeys();
        _rtl = isRTL;
    }
}
/**
 * Gets the current RTL value.
 */
function getRTL() {
    if (_rtl === undefined) {
        _rtl =
            typeof document !== 'undefined' &&
                !!document.documentElement &&
                document.documentElement.getAttribute('dir') === 'rtl';
    }
    return _rtl;
}
/**
 * RTLifies the rulePair in the array at the current index. This mutates the array for performance
 * reasons.
 */
function rtlifyRules(rulePairs, index) {
    if (getRTL()) {
        var name_1 = rulePairs[index];
        if (!name_1) {
            return;
        }
        var value = rulePairs[index + 1];
        if (typeof value === 'string' && value.indexOf(NO_FLIP) >= 0) {
            rulePairs[index + 1] = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, '');
        }
        else if (name_1.indexOf(LEFT) >= 0) {
            rulePairs[index] = name_1.replace(LEFT, RIGHT);
        }
        else if (name_1.indexOf(RIGHT) >= 0) {
            rulePairs[index] = name_1.replace(RIGHT, LEFT);
        }
        else if (String(value).indexOf(LEFT) >= 0) {
            rulePairs[index + 1] = value.replace(LEFT, RIGHT);
        }
        else if (String(value).indexOf(RIGHT) >= 0) {
            rulePairs[index + 1] = value.replace(RIGHT, LEFT);
        }
        else if (NAME_REPLACEMENTS[name_1]) {
            rulePairs[index] = NAME_REPLACEMENTS[name_1];
        }
        else if (VALUE_REPLACEMENTS[value]) {
            rulePairs[index + 1] = VALUE_REPLACEMENTS[value];
        }
        else {
            switch (name_1) {
                case 'margin':
                case 'padding':
                    rulePairs[index + 1] = flipQuad(value);
                    break;
                case 'box-shadow':
                    rulePairs[index + 1] = negateNum(value, 0);
                    break;
            }
        }
    }
}
/**
 * Given a string value in a space delimited format (e.g. "1 2 3 4"), negates a particular value.
 */
function negateNum(value, partIndex) {
    var parts = value.split(' ');
    var numberVal = parseInt(parts[partIndex], 10);
    parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));
    return parts.join(' ');
}
/**
 * Given a string quad, flips the left and right values.
 */
function flipQuad(value) {
    if (typeof value === 'string') {
        var parts = value.split(' ');
        if (parts.length === 4) {
            return parts[0] + " " + parts[3] + " " + parts[2] + " " + parts[1];
        }
    }
    return value;
}
var _a;
//# sourceMappingURL=rtlifyRules.js.map

/***/ }),

/***/ "./node_modules/@uifabric/merge-styles/lib/version.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/merge-styles/lib/version.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "./node_modules/@uifabric/set-version/lib/index.js");
// @uifabric/merge-styles@6.10.3
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/merge-styles', '6.10.3');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@uifabric/set-version/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@uifabric/set-version/lib/index.js ***!
  \*********************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setVersion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setVersion */ "./node_modules/@uifabric/set-version/lib/setVersion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return _setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"]; });



Object(_setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/set-version', '6.0.0');
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/set-version/lib/setVersion.js":
/*!**************************************************************!*\
  !*** ./node_modules/@uifabric/set-version/lib/setVersion.js ***!
  \**************************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return setVersion; });
// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
var packagesCache = {};
function setVersion(packageName, packageVersion) {
    if (typeof window !== 'undefined') {
        // tslint:disable-next-line:no-any
        var packages = (window.__packages__ = window.__packages__ || {});
        // We allow either the global packages or local packages caches to invalidate so testing can just clear the global to set this state
        if (!packages[packageName] || !packagesCache[packageName]) {
            packagesCache[packageName] = packageVersion;
            var versions = (packages[packageName] = packages[packageName] || []);
            versions.push(packageVersion);
        }
    }
}
//# sourceMappingURL=setVersion.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/MergeStyles.js":
/*!***********************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/MergeStyles.js ***!
  \***********************************************************/
/*! exports provided: InjectionMode, Stylesheet, concatStyleSets, fontFace, keyframes, mergeStyleSets, mergeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InjectionMode", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["InjectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatStyleSets", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["concatStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["fontFace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyleSets", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["mergeStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["mergeStyles"]; });


//# sourceMappingURL=MergeStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/classNames/AnimationClassNames.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/classNames/AnimationClassNames.js ***!
  \******************************************************************************/
/*! exports provided: AnimationClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationClassNames", function() { return AnimationClassNames; });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./node_modules/@uifabric/styling/lib/utilities/index.js");
/* harmony import */ var _styles_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/index */ "./node_modules/@uifabric/styling/lib/styles/index.js");


var AnimationClassNames = Object(_utilities_index__WEBPACK_IMPORTED_MODULE_0__["buildClassMap"])(_styles_index__WEBPACK_IMPORTED_MODULE_1__["AnimationStyles"]);
//# sourceMappingURL=AnimationClassNames.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/classNames/ColorClassNames.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/classNames/ColorClassNames.js ***!
  \**************************************************************************/
/*! exports provided: ColorClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorClassNames", function() { return ColorClassNames; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony import */ var _styles_DefaultPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/DefaultPalette */ "./node_modules/@uifabric/styling/lib/styles/DefaultPalette.js");
/* harmony import */ var _styles_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/index */ "./node_modules/@uifabric/styling/lib/styles/index.js");



var ColorClassNames = {};
for (var colorName in _styles_DefaultPalette__WEBPACK_IMPORTED_MODULE_1__["DefaultPalette"]) {
    if (_styles_DefaultPalette__WEBPACK_IMPORTED_MODULE_1__["DefaultPalette"].hasOwnProperty(colorName)) {
        // Foreground color
        _defineGetter(ColorClassNames, colorName, '', false, 'color');
        // Hover color
        _defineGetter(ColorClassNames, colorName, 'Hover', true, 'color');
        // Background color
        _defineGetter(ColorClassNames, colorName, 'Background', false, 'background');
        // Background hover
        _defineGetter(ColorClassNames, colorName, 'BackgroundHover', true, 'background');
        // Border color
        _defineGetter(ColorClassNames, colorName, 'Border', false, 'borderColor');
        // Border hover color
        _defineGetter(ColorClassNames, colorName, 'BorderHover', true, 'borderColor');
    }
}
/**
 * Defines a getter for the given class configuration.
 */
function _defineGetter(obj, colorName, suffix, isHover, cssProperty) {
    Object.defineProperty(obj, colorName + suffix, {
        get: function () {
            // tslint:disable-next-line:no-any
            var style = (_a = {}, _a[cssProperty] = Object(_styles_index__WEBPACK_IMPORTED_MODULE_2__["getTheme"])().palette[colorName], _a);
            return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["mergeStyles"])(isHover ? { selectors: { ':hover': style } } : style).toString();
            var _a;
        },
        enumerable: true,
        configurable: true
    });
}
//# sourceMappingURL=ColorClassNames.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/classNames/FontClassNames.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/classNames/FontClassNames.js ***!
  \*************************************************************************/
/*! exports provided: FontClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontClassNames", function() { return FontClassNames; });
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index */ "./node_modules/@uifabric/styling/lib/utilities/index.js");
/* harmony import */ var _styles_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/index */ "./node_modules/@uifabric/styling/lib/styles/index.js");


var FontClassNames = Object(_utilities_index__WEBPACK_IMPORTED_MODULE_0__["buildClassMap"])(_styles_index__WEBPACK_IMPORTED_MODULE_1__["DefaultFontStyles"]);
//# sourceMappingURL=FontClassNames.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/classNames/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/classNames/index.js ***!
  \****************************************************************/
/*! exports provided: AnimationClassNames, FontClassNames, ColorClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnimationClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationClassNames */ "./node_modules/@uifabric/styling/lib/classNames/AnimationClassNames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationClassNames", function() { return _AnimationClassNames__WEBPACK_IMPORTED_MODULE_0__["AnimationClassNames"]; });

/* harmony import */ var _FontClassNames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FontClassNames */ "./node_modules/@uifabric/styling/lib/classNames/FontClassNames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontClassNames", function() { return _FontClassNames__WEBPACK_IMPORTED_MODULE_1__["FontClassNames"]; });

/* harmony import */ var _ColorClassNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorClassNames */ "./node_modules/@uifabric/styling/lib/classNames/ColorClassNames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorClassNames", function() { return _ColorClassNames__WEBPACK_IMPORTED_MODULE_2__["ColorClassNames"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/index.js ***!
  \*****************************************************/
/*! exports provided: AnimationClassNames, FontClassNames, ColorClassNames, AnimationStyles, AnimationVariables, DefaultPalette, DefaultFontStyles, registerDefaultFontFaces, FontSizes, FontWeights, IconFontSizes, createFontStyles, getFocusStyle, focusClear, hiddenContentStyle, PulsingBeaconAnimationStyles, getGlobalClassNames, ThemeSettingName, getTheme, loadTheme, createTheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, buildClassMap, getIcon, registerIcons, registerIconAlias, unregisterIcons, setIconOptions, getIconClassName, InjectionMode, Stylesheet, concatStyleSets, fontFace, keyframes, mergeStyleSets, mergeStyles, getSchemedContext, HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack, ScreenWidthMinSmall, ScreenWidthMinMedium, ScreenWidthMinLarge, ScreenWidthMinXLarge, ScreenWidthMinXXLarge, ScreenWidthMinXXXLarge, ScreenWidthMaxSmall, ScreenWidthMaxMedium, ScreenWidthMaxLarge, ScreenWidthMaxXLarge, ScreenWidthMaxXXLarge, ScreenWidthMinUhfMobile, getScreenSelector, normalize, noWrap, getFadedOverflowStyle, ZIndexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classNames_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classNames/index */ "./node_modules/@uifabric/styling/lib/classNames/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationClassNames", function() { return _classNames_index__WEBPACK_IMPORTED_MODULE_0__["AnimationClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontClassNames", function() { return _classNames_index__WEBPACK_IMPORTED_MODULE_0__["FontClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorClassNames", function() { return _classNames_index__WEBPACK_IMPORTED_MODULE_0__["ColorClassNames"]; });

/* harmony import */ var _styles_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index */ "./node_modules/@uifabric/styling/lib/styles/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationStyles", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["AnimationStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationVariables", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["AnimationVariables"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultPalette", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["DefaultPalette"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultFontStyles", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["DefaultFontStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerDefaultFontFaces", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["registerDefaultFontFaces"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontSizes", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["FontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontWeights", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["FontWeights"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconFontSizes", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["IconFontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFontStyles", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["createFontStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFocusStyle", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusClear", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["focusClear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hiddenContentStyle", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["hiddenContentStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PulsingBeaconAnimationStyles", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["PulsingBeaconAnimationStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalClassNames", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getGlobalClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeSettingName", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ThemeSettingName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadTheme", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["loadTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTheme", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["createTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerOnThemeChangeCallback", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["registerOnThemeChangeCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeOnThemeChangeCallback", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["removeOnThemeChangeCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSchemedContext", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getSchemedContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelector", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorWhite", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelectorWhite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorBlack", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelectorBlack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinSmall", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinMedium", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXXLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxSmall", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxMedium", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXXLarge", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinUhfMobile", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinUhfMobile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScreenSelector", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getScreenSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noWrap", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["noWrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFadedOverflowStyle", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["getFadedOverflowStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZIndexes", function() { return _styles_index__WEBPACK_IMPORTED_MODULE_1__["ZIndexes"]; });

/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/index */ "./node_modules/@uifabric/styling/lib/utilities/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildClassMap", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["buildClassMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIcon", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["getIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIcons", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["registerIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIconAlias", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["registerIconAlias"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unregisterIcons", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["unregisterIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setIconOptions", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["setIconOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIconClassName", function() { return _utilities_index__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"]; });

/* harmony import */ var _MergeStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MergeStyles */ "./node_modules/@uifabric/styling/lib/MergeStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InjectionMode", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["InjectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["Stylesheet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatStyleSets", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["concatStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["fontFace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["keyframes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyleSets", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["mergeStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return _MergeStyles__WEBPACK_IMPORTED_MODULE_3__["mergeStyles"]; });

/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./version */ "./node_modules/@uifabric/styling/lib/version.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/AnimationStyles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/AnimationStyles.js ***!
  \**********************************************************************/
/*! exports provided: AnimationVariables, AnimationStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationVariables", function() { return AnimationVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationStyles", function() { return AnimationStyles; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");

/* Register the keyframes */
var EASING_FUNCTION_1 = 'cubic-bezier(.1,.9,.2,1)';
var EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)';
var DURATION_1 = '0.167s';
var DURATION_2 = '0.267s';
var DURATION_3 = '0.367s';
var DURATION_4 = '0.467s';
var FADE_IN = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { opacity: 0 },
    to: { opacity: 1 }
});
var FADE_OUT = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { opacity: 1 },
    to: { opacity: 0 }
});
var SLIDE_RIGHT_IN10 = _createSlideInX(-10);
var SLIDE_RIGHT_IN20 = _createSlideInX(-20);
var SLIDE_RIGHT_IN40 = _createSlideInX(-40);
var SLIDE_RIGHT_IN400 = _createSlideInX(-400);
var SLIDE_LEFT_IN10 = _createSlideInX(10);
var SLIDE_LEFT_IN20 = _createSlideInX(20);
var SLIDE_LEFT_IN40 = _createSlideInX(40);
var SLIDE_LEFT_IN400 = _createSlideInX(400);
var SLIDE_UP_IN10 = _createSlideInY(10);
var SLIDE_UP_IN20 = _createSlideInY(20);
var SLIDE_DOWN_IN10 = _createSlideInY(-10);
var SLIDE_DOWN_IN20 = _createSlideInY(-20);
var SLIDE_RIGHT_OUT10 = _createSlideOutX(10);
var SLIDE_RIGHT_OUT20 = _createSlideOutX(20);
var SLIDE_RIGHT_OUT40 = _createSlideOutX(40);
var SLIDE_RIGHT_OUT400 = _createSlideOutX(400);
var SLIDE_LEFT_OUT10 = _createSlideOutX(-10);
var SLIDE_LEFT_OUT20 = _createSlideOutX(-20);
var SLIDE_LEFT_OUT40 = _createSlideOutX(-40);
var SLIDE_LEFT_OUT400 = _createSlideOutX(-400);
var SLIDE_UP_OUT10 = _createSlideOutY(-10);
var SLIDE_UP_OUT20 = _createSlideOutY(-20);
var SLIDE_DOWN_OUT10 = _createSlideOutY(10);
var SLIDE_DOWN_OUT20 = _createSlideOutY(20);
var SCALE_UP100 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'scale3d(.98,.98,1)' },
    to: { transform: 'scale3d(1,1,1)' }
});
var SCALE_DOWN98 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'scale3d(1,1,1)' },
    to: { transform: 'scale3d(.98,.98,1)' }
});
var SCALE_DOWN100 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'scale3d(1.03,1.03,1)' },
    to: { transform: 'scale3d(1,1,1)' }
});
var SCALE_UP103 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'scale3d(1,1,1)' },
    to: { transform: 'scale3d(1.03,1.03,1)' }
});
var ROTATE90 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'rotateZ(0deg)' },
    to: { transform: 'rotateZ(90deg)' }
});
var ROTATE_N90 = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
    from: { transform: 'rotateZ(0deg)' },
    to: { transform: 'rotateZ(-90deg)' }
});
/**
 * Exporting raw duraction values and easing functions to be used in custom animations
 */
var AnimationVariables = {
    easeFunction1: EASING_FUNCTION_1,
    easeFunction2: EASING_FUNCTION_2,
    durationValue1: DURATION_1,
    durationValue2: DURATION_2,
    durationValue3: DURATION_3,
    durationValue4: DURATION_4
};
/**
 * All Fabric standard animations, exposed as json objects referencing predefined
 * keyframes. These objects can be mixed in with other class definitions.
 */
var AnimationStyles = {
    slideRightIn10: _createAnimation(FADE_IN + "," + SLIDE_RIGHT_IN10, DURATION_3, EASING_FUNCTION_1),
    slideRightIn20: _createAnimation(FADE_IN + "," + SLIDE_RIGHT_IN20, DURATION_3, EASING_FUNCTION_1),
    slideRightIn40: _createAnimation(FADE_IN + "," + SLIDE_RIGHT_IN40, DURATION_3, EASING_FUNCTION_1),
    slideRightIn400: _createAnimation(FADE_IN + "," + SLIDE_RIGHT_IN400, DURATION_3, EASING_FUNCTION_1),
    slideLeftIn10: _createAnimation(FADE_IN + "," + SLIDE_LEFT_IN10, DURATION_3, EASING_FUNCTION_1),
    slideLeftIn20: _createAnimation(FADE_IN + "," + SLIDE_LEFT_IN20, DURATION_3, EASING_FUNCTION_1),
    slideLeftIn40: _createAnimation(FADE_IN + "," + SLIDE_LEFT_IN40, DURATION_3, EASING_FUNCTION_1),
    slideLeftIn400: _createAnimation(FADE_IN + "," + SLIDE_LEFT_IN400, DURATION_3, EASING_FUNCTION_1),
    slideUpIn10: _createAnimation(FADE_IN + "," + SLIDE_UP_IN10, DURATION_3, EASING_FUNCTION_1),
    slideUpIn20: _createAnimation(FADE_IN + "," + SLIDE_UP_IN20, DURATION_3, EASING_FUNCTION_1),
    slideDownIn10: _createAnimation(FADE_IN + "," + SLIDE_DOWN_IN10, DURATION_3, EASING_FUNCTION_1),
    slideDownIn20: _createAnimation(FADE_IN + "," + SLIDE_DOWN_IN20, DURATION_3, EASING_FUNCTION_1),
    slideRightOut10: _createAnimation(FADE_OUT + "," + SLIDE_RIGHT_OUT10, DURATION_3, EASING_FUNCTION_1),
    slideRightOut20: _createAnimation(FADE_OUT + "," + SLIDE_RIGHT_OUT20, DURATION_3, EASING_FUNCTION_1),
    slideRightOut40: _createAnimation(FADE_OUT + "," + SLIDE_RIGHT_OUT40, DURATION_3, EASING_FUNCTION_1),
    slideRightOut400: _createAnimation(FADE_OUT + "," + SLIDE_RIGHT_OUT400, DURATION_3, EASING_FUNCTION_1),
    slideLeftOut10: _createAnimation(FADE_OUT + "," + SLIDE_LEFT_OUT10, DURATION_3, EASING_FUNCTION_1),
    slideLeftOut20: _createAnimation(FADE_OUT + "," + SLIDE_LEFT_OUT20, DURATION_3, EASING_FUNCTION_1),
    slideLeftOut40: _createAnimation(FADE_OUT + "," + SLIDE_LEFT_OUT40, DURATION_3, EASING_FUNCTION_1),
    slideLeftOut400: _createAnimation(FADE_OUT + "," + SLIDE_LEFT_OUT400, DURATION_3, EASING_FUNCTION_1),
    slideUpOut10: _createAnimation(FADE_OUT + "," + SLIDE_UP_OUT10, DURATION_3, EASING_FUNCTION_1),
    slideUpOut20: _createAnimation(FADE_OUT + "," + SLIDE_UP_OUT20, DURATION_3, EASING_FUNCTION_1),
    slideDownOut10: _createAnimation(FADE_OUT + "," + SLIDE_DOWN_OUT10, DURATION_3, EASING_FUNCTION_1),
    slideDownOut20: _createAnimation(FADE_OUT + "," + SLIDE_DOWN_OUT20, DURATION_3, EASING_FUNCTION_1),
    scaleUpIn100: _createAnimation(FADE_IN + "," + SCALE_UP100, DURATION_3, EASING_FUNCTION_1),
    scaleDownIn100: _createAnimation(FADE_IN + "," + SCALE_DOWN100, DURATION_3, EASING_FUNCTION_1),
    scaleUpOut103: _createAnimation(FADE_OUT + "," + SCALE_UP103, DURATION_1, EASING_FUNCTION_2),
    scaleDownOut98: _createAnimation(FADE_OUT + "," + SCALE_DOWN98, DURATION_1, EASING_FUNCTION_2),
    fadeIn100: _createAnimation(FADE_IN, DURATION_1, EASING_FUNCTION_2),
    fadeIn200: _createAnimation(FADE_IN, DURATION_2, EASING_FUNCTION_2),
    fadeIn400: _createAnimation(FADE_IN, DURATION_3, EASING_FUNCTION_2),
    fadeIn500: _createAnimation(FADE_IN, DURATION_4, EASING_FUNCTION_2),
    fadeOut100: _createAnimation(FADE_OUT, DURATION_1, EASING_FUNCTION_2),
    fadeOut200: _createAnimation(FADE_OUT, DURATION_2, EASING_FUNCTION_2),
    fadeOut400: _createAnimation(FADE_OUT, DURATION_3, EASING_FUNCTION_2),
    fadeOut500: _createAnimation(FADE_OUT, DURATION_4, EASING_FUNCTION_2),
    rotate90deg: _createAnimation(ROTATE90, '0.1s', EASING_FUNCTION_2),
    rotateN90deg: _createAnimation(ROTATE_N90, '0.1s', EASING_FUNCTION_2)
    // expandCollapse 100/200/400, delay 100/200
};
function _createAnimation(animationName, animationDuration, animationTimingFunction) {
    return {
        animationName: animationName,
        animationDuration: animationDuration,
        animationTimingFunction: animationTimingFunction,
        animationFillMode: 'both'
    };
}
function _createSlideInX(fromX) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
        from: { transform: "translate3d(" + fromX + "px,0,0)" },
        to: { transform: "translate3d(0,0,0)" }
    });
}
function _createSlideInY(fromY) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
        from: { transform: "translate3d(0," + fromY + "px,0)" },
        to: { transform: "translate3d(0,0,0)" }
    });
}
function _createSlideOutX(toX) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
        from: { transform: "translate3d(0,0,0)" },
        to: { transform: "translate3d(" + toX + "px,0,0)" }
    });
}
function _createSlideOutY(toY) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["keyframes"])({
        from: { transform: "translate3d(0,0,0)" },
        to: { transform: "translate3d(0," + toY + "px,0)" }
    });
}
//# sourceMappingURL=AnimationStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/CommonStyles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/CommonStyles.js ***!
  \*******************************************************************/
/*! exports provided: HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack, ScreenWidthMinSmall, ScreenWidthMinMedium, ScreenWidthMinLarge, ScreenWidthMinXLarge, ScreenWidthMinXXLarge, ScreenWidthMinXXXLarge, ScreenWidthMaxSmall, ScreenWidthMaxMedium, ScreenWidthMaxLarge, ScreenWidthMaxXLarge, ScreenWidthMaxXXLarge, ScreenWidthMinUhfMobile, getScreenSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelector", function() { return HighContrastSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorWhite", function() { return HighContrastSelectorWhite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorBlack", function() { return HighContrastSelectorBlack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinSmall", function() { return ScreenWidthMinSmall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinMedium", function() { return ScreenWidthMinMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinLarge", function() { return ScreenWidthMinLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXLarge", function() { return ScreenWidthMinXLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXLarge", function() { return ScreenWidthMinXXLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXXLarge", function() { return ScreenWidthMinXXXLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxSmall", function() { return ScreenWidthMaxSmall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxMedium", function() { return ScreenWidthMaxMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxLarge", function() { return ScreenWidthMaxLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXLarge", function() { return ScreenWidthMaxXLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXXLarge", function() { return ScreenWidthMaxXXLarge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinUhfMobile", function() { return ScreenWidthMinUhfMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenSelector", function() { return getScreenSelector; });
var HighContrastSelector = '@media screen and (-ms-high-contrast: active)';
var HighContrastSelectorWhite = '@media screen and (-ms-high-contrast: black-on-white)';
var HighContrastSelectorBlack = '@media screen and (-ms-high-contrast: white-on-black)';
var ScreenWidthMinSmall = 320;
var ScreenWidthMinMedium = 480;
var ScreenWidthMinLarge = 640;
var ScreenWidthMinXLarge = 1024;
var ScreenWidthMinXXLarge = 1366;
var ScreenWidthMinXXXLarge = 1920;
var ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
var ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
var ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
var ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
var ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;
var ScreenWidthMinUhfMobile = 768;
function getScreenSelector(min, max) {
    return "@media only screen and (min-width: " + min + "px) and (max-width: " + max + "px)";
}
//# sourceMappingURL=CommonStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/DefaultFontStyles.js":
/*!************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/DefaultFontStyles.js ***!
  \************************************************************************/
/*! exports provided: DefaultFontStyles, registerDefaultFontFaces */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFontStyles", function() { return DefaultFontStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerDefaultFontFaces", function() { return registerDefaultFontFaces; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony import */ var _fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fonts */ "./node_modules/@uifabric/styling/lib/styles/fonts.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");



// Default urls.
var DefaultBaseUrl = 'https://static2.sharepointonline.com/files/fabric/assets';
// Standard font styling.
var DefaultFontStyles = Object(_fonts__WEBPACK_IMPORTED_MODULE_1__["createFontStyles"])(Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_2__["getLanguage"])());
function _registerFontFace(fontFamily, url, fontWeight, localFontName) {
    fontFamily = "'" + fontFamily + "'";
    var localFontSrc = localFontName !== undefined ? "local('" + localFontName + "')," : '';
    Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["fontFace"])({
        fontFamily: fontFamily,
        src: localFontSrc + ("url('" + url + ".woff2') format('woff2'),") + ("url('" + url + ".woff') format('woff')"),
        fontWeight: fontWeight,
        fontStyle: 'normal'
    });
}
function _registerFontFaceSet(baseUrl, fontFamily, cdnFolder, cdnFontName, localFontName) {
    if (cdnFontName === void 0) { cdnFontName = 'segoeui'; }
    var urlBase = baseUrl + "/" + cdnFolder + "/" + cdnFontName;
    _registerFontFace(fontFamily, urlBase + '-light', _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].light, localFontName && localFontName + ' Light');
    _registerFontFace(fontFamily, urlBase + '-semilight', _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semilight, localFontName && localFontName + ' SemiLight');
    _registerFontFace(fontFamily, urlBase + '-regular', _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular, localFontName);
    _registerFontFace(fontFamily, urlBase + '-semibold', _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semibold, localFontName && localFontName + ' SemiBold');
}
function registerDefaultFontFaces(baseUrl) {
    if (baseUrl) {
        var fontUrl = baseUrl + "/fonts";
        // Produce @font-face definitions for all supported web fonts.
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Thai, 'leelawadeeui-thai', 'leelawadeeui');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Arabic, 'segoeui-arabic');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Cyrillic, 'segoeui-cyrillic');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].EastEuropean, 'segoeui-easteuropean');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Greek, 'segoeui-greek');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Hebrew, 'segoeui-hebrew');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].Vietnamese, 'segoeui-vietnamese');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontNames"].WestEuropean, 'segoeui-westeuropean', 'segoeui', 'Segoe UI');
        _registerFontFaceSet(fontUrl, _fonts__WEBPACK_IMPORTED_MODULE_1__["LocalizedFontFamilies"].Selawik, 'selawik', 'selawik');
        // Leelawadee UI (Thai) does not have a 'light' weight, so we override
        // the font-face generated above to use the 'semilight' weight instead.
        _registerFontFace('Leelawadee UI Web', fontUrl + "/leelawadeeui-thai/leelawadeeui-semilight", _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].light);
        // Leelawadee UI (Thai) does not have a 'semibold' weight, so we override
        // the font-face generated above to use the 'bold' weight instead.
        _registerFontFace('Leelawadee UI Web', fontUrl + "/leelawadeeui-thai/leelawadeeui-bold", _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semibold);
    }
}
/**
 * Reads the fontBaseUrl from window.FabricConfig.fontBaseUrl or falls back to a default.
 */
function _getFontBaseUrl() {
    var win = typeof window !== 'undefined' ? window : undefined;
    // tslint:disable-next-line:no-string-literal no-any
    var fabricConfig = win ? win['FabricConfig'] : undefined;
    return fabricConfig && fabricConfig.fontBaseUrl !== undefined ? fabricConfig.fontBaseUrl : DefaultBaseUrl;
}
/**
 * Register the font faces.
 */
registerDefaultFontFaces(_getFontBaseUrl());
//# sourceMappingURL=DefaultFontStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/DefaultPalette.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/DefaultPalette.js ***!
  \*********************************************************************/
/*! exports provided: DefaultPalette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPalette", function() { return DefaultPalette; });
// When adding or removing a color, make sure you keep this consistent with IColorClassNames by adding the color variants.
var DefaultPalette = {
    themeDarker: '#004578',
    themeDark: '#005a9e',
    themeDarkAlt: '#106ebe',
    themePrimary: '#0078d4',
    themeSecondary: '#2b88d8',
    themeTertiary: '#71afe5',
    themeLight: '#c7e0f4',
    themeLighter: '#deecf9',
    themeLighterAlt: '#eff6fc',
    black: '#000000',
    blackTranslucent40: 'rgba(0,0,0,.4)',
    neutralDark: '#212121',
    neutralPrimary: '#333333',
    neutralPrimaryAlt: '#3c3c3c',
    neutralSecondary: '#666666',
    neutralSecondaryAlt: '#767676',
    neutralTertiary: '#a6a6a6',
    neutralTertiaryAlt: '#c8c8c8',
    neutralQuaternary: '#d0d0d0',
    neutralQuaternaryAlt: '#dadada',
    neutralLight: '#eaeaea',
    neutralLighter: '#f4f4f4',
    neutralLighterAlt: '#f8f8f8',
    accent: '#0078d4',
    white: '#ffffff',
    whiteTranslucent40: 'rgba(255,255,255,.4)',
    yellow: '#ffb900',
    yellowLight: '#fff100',
    orange: '#d83b01',
    orangeLight: '#ea4300',
    orangeLighter: '#ff8c00',
    redDark: '#a80000',
    red: '#e81123',
    magentaDark: '#5c005c',
    magenta: '#b4009e',
    magentaLight: '#e3008c',
    purpleDark: '#32145a',
    purple: '#5c2d91',
    purpleLight: '#b4a0ff',
    blueDark: '#002050',
    blueMid: '#00188f',
    blue: '#0078d4',
    blueLight: '#00bcf2',
    tealDark: '#004b50',
    teal: '#008272',
    tealLight: '#00b294',
    greenDark: '#004b1c',
    green: '#107c10',
    greenLight: '#bad80a'
};
//# sourceMappingURL=DefaultPalette.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/DefaultSpacing.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/DefaultSpacing.js ***!
  \*********************************************************************/
/*! exports provided: DefaultSpacing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultSpacing", function() { return DefaultSpacing; });
var DefaultSpacing = {
    s2: '4px',
    s1: '8px',
    m: '16px',
    l1: '20px',
    l2: '32px'
};
//# sourceMappingURL=DefaultSpacing.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/DefaultTypography.js":
/*!************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/DefaultTypography.js ***!
  \************************************************************************/
/*! exports provided: DefaultFontSizes, DefaultFontFamilies, DefaultFontWeights, DefaultFontVariants, DefaultTypography */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFontSizes", function() { return DefaultFontSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFontFamilies", function() { return DefaultFontFamilies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFontWeights", function() { return DefaultFontWeights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFontVariants", function() { return DefaultFontVariants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTypography", function() { return DefaultTypography; });
/* harmony import */ var _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultFontStyles */ "./node_modules/@uifabric/styling/lib/styles/DefaultFontStyles.js");
/* harmony import */ var _fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fonts */ "./node_modules/@uifabric/styling/lib/styles/fonts.js");


var DefaultFontSizes = {
    mini: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].mini,
    xSmall: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].xSmall,
    small: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].small,
    smallPlus: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].smallPlus,
    medium: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].medium,
    mediumPlus: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].mediumPlus,
    large: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].large,
    xLarge: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].xLarge,
    xxLarge: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].xxLarge,
    mega: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontSizes"].mega
};
var DefaultFontFamilies = {
    default: _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_0__["DefaultFontStyles"].medium.fontFamily,
    monospace: 'Menlo, Monaco, "Courier New", monospace'
};
var DefaultFontWeights = {
    default: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular,
    regular: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].regular,
    light: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].light,
    semibold: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semibold,
    bold: _fonts__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].bold
};
var DefaultFontVariants = {
    default: {
        family: 'default',
        size: 'inherit'
    },
    caption: {
        size: 'xSmall'
    },
    h1: {
        size: 'mega',
        weight: 'light'
    },
    h2: {
        size: 'xxLarge',
        weight: 'light'
    },
    h3: {
        size: 'xLarge',
        weight: 'light'
    },
    h4: {
        size: 'large',
        weight: 'light'
    },
    h5: {
        size: 'mediumPlus',
        weight: 'light'
    },
    link: {
        color: 'link',
        hoverColor: 'linkHovered'
    }
};
var DefaultTypography = {
    families: DefaultFontFamilies,
    sizes: DefaultFontSizes,
    weights: DefaultFontWeights,
    variants: DefaultFontVariants
};
//# sourceMappingURL=DefaultTypography.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/GeneralStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/GeneralStyles.js ***!
  \********************************************************************/
/*! exports provided: normalize, noWrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noWrap", function() { return noWrap; });
// This file mimics styles and mixins from _General.Mixins.scss
var normalize = {
    boxShadow: 'none',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
};
var noWrap = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
//# sourceMappingURL=GeneralStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/PulsingBeaconAnimationStyles.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/PulsingBeaconAnimationStyles.js ***!
  \***********************************************************************************/
/*! exports provided: PulsingBeaconAnimationStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PulsingBeaconAnimationStyles", function() { return PulsingBeaconAnimationStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");


var DEFAULT_DURATION = '14s';
var DEFAULT_DELAY = '2s';
var DEFAULT_ITERATION_COUNT = '1';
function _continuousPulseStepOne(beaconColorOne, innerDimension) {
    return {
        borderColor: beaconColorOne,
        borderWidth: '0px',
        width: innerDimension,
        height: innerDimension
    };
}
function _continuousPulseStepTwo(borderWidth) {
    return {
        opacity: 1,
        borderWidth: borderWidth
    };
}
function _continuousPulseStepThree() {
    return {
        opacity: 1
    };
}
function _continuousPulseStepFour(beaconColorTwo, outerDimension) {
    return {
        borderWidth: '0',
        width: outerDimension,
        height: outerDimension,
        opacity: 0,
        borderColor: beaconColorTwo
    };
}
function _continuousPulseStepFive(beaconColorOne, innerDimension) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _continuousPulseStepOne(beaconColorOne, innerDimension), {
        opacity: 0
    });
}
function _continuousPulseAnimationDouble(beaconColorOne, beaconColorTwo, innerDimension, outerDimension, borderWidth) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_1__["keyframes"])({
        '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
        '1.42%': _continuousPulseStepTwo(borderWidth),
        '3.57%': _continuousPulseStepThree(),
        '7.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
        '8%': _continuousPulseStepFive(beaconColorOne, innerDimension),
        '29.99%': _continuousPulseStepFive(beaconColorOne, innerDimension),
        '30%': _continuousPulseStepOne(beaconColorOne, innerDimension),
        '31.42%': _continuousPulseStepTwo(borderWidth),
        '33.57%': _continuousPulseStepThree(),
        '37.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
        '38%': _continuousPulseStepFive(beaconColorOne, innerDimension),
        '79.42%': _continuousPulseStepFive(beaconColorOne, innerDimension),
        '79.43': _continuousPulseStepOne(beaconColorOne, innerDimension),
        '81.85': _continuousPulseStepTwo(borderWidth),
        '83.42': _continuousPulseStepThree(),
        '87%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
        '100%': {}
    });
}
function _continuousPulseAnimationSingle(beaconColorOne, beaconColorTwo, innerDimension, outerDimension, borderWidth) {
    return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_1__["keyframes"])({
        '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
        '14.2%': _continuousPulseStepTwo(borderWidth),
        '35.7%': _continuousPulseStepThree(),
        '71.4%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
        '100%': {}
    });
}
function _createDefaultAnimation(animationName, delayLength) {
    return {
        animationName: animationName,
        animationIterationCount: DEFAULT_ITERATION_COUNT,
        animationDuration: DEFAULT_DURATION,
        animationDelay: delayLength || DEFAULT_DELAY
    };
}
var PulsingBeaconAnimationStyles = {
    continuousPulseAnimationDouble: _continuousPulseAnimationDouble,
    continuousPulseAnimationSingle: _continuousPulseAnimationSingle,
    createDefaultAnimation: _createDefaultAnimation
};
//# sourceMappingURL=PulsingBeaconAnimationStyles.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/fonts.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/fonts.js ***!
  \************************************************************/
/*! exports provided: LocalizedFontNames, LocalizedFontFamilies, FontSizes, FontWeights, IconFontSizes, createFontStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalizedFontNames", function() { return LocalizedFontNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalizedFontFamilies", function() { return LocalizedFontFamilies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontSizes", function() { return FontSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontWeights", function() { return FontWeights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconFontSizes", function() { return IconFontSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFontStyles", function() { return createFontStyles; });
// Fallback fonts, if specified system or web fonts are unavailable.
var FontFamilyFallbacks = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif";
// Font face names to be registered.
var LocalizedFontNames;
(function (LocalizedFontNames) {
    LocalizedFontNames.Arabic = 'Segoe UI Web (Arabic)';
    LocalizedFontNames.Cyrillic = 'Segoe UI Web (Cyrillic)';
    LocalizedFontNames.EastEuropean = 'Segoe UI Web (East European)';
    LocalizedFontNames.Greek = 'Segoe UI Web (Greek)';
    LocalizedFontNames.Hebrew = 'Segoe UI Web (Hebrew)';
    LocalizedFontNames.Thai = 'Leelawadee UI Web';
    LocalizedFontNames.Vietnamese = 'Segoe UI Web (Vietnamese)';
    LocalizedFontNames.WestEuropean = 'Segoe UI Web (West European)';
    LocalizedFontNames.Selawik = 'Selawik Web';
})(LocalizedFontNames || (LocalizedFontNames = {}));
// Font families with fallbacks, for the general regions.
var LocalizedFontFamilies;
(function (LocalizedFontFamilies) {
    LocalizedFontFamilies.Arabic = "'" + LocalizedFontNames.Arabic + "'";
    LocalizedFontFamilies.ChineseSimplified = "'Microsoft Yahei UI', Verdana, Simsun";
    LocalizedFontFamilies.ChineseTraditional = "'Microsoft Jhenghei UI', Pmingliu";
    LocalizedFontFamilies.Cyrillic = "'" + LocalizedFontNames.Cyrillic + "'";
    LocalizedFontFamilies.EastEuropean = "'" + LocalizedFontNames.EastEuropean + "'";
    LocalizedFontFamilies.Greek = "'" + LocalizedFontNames.Greek + "'";
    LocalizedFontFamilies.Hebrew = "'" + LocalizedFontNames.Hebrew + "'";
    LocalizedFontFamilies.Hindi = "'Nirmala UI'";
    LocalizedFontFamilies.Japanese = "'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
    LocalizedFontFamilies.Korean = "'Malgun Gothic', Gulim";
    LocalizedFontFamilies.Selawik = "'" + LocalizedFontNames.Selawik + "'";
    LocalizedFontFamilies.Thai = "'Leelawadee UI Web', 'Kmer UI'";
    LocalizedFontFamilies.Vietnamese = "'" + LocalizedFontNames.Vietnamese + "'";
    LocalizedFontFamilies.WestEuropean = "'" + LocalizedFontNames.WestEuropean + "'";
})(LocalizedFontFamilies || (LocalizedFontFamilies = {}));
// By default, we favor system fonts for the default.
// All localized fonts use a web font and never use the system font.
var defaultFontFamily = "'Segoe UI', '" + LocalizedFontNames.WestEuropean + "'";
// Mapping of language prefix to to font family.
var LanguageToFontMap = {
    ar: LocalizedFontFamilies.Arabic,
    bg: LocalizedFontFamilies.Cyrillic,
    cs: LocalizedFontFamilies.EastEuropean,
    el: LocalizedFontFamilies.Greek,
    et: LocalizedFontFamilies.EastEuropean,
    he: LocalizedFontFamilies.Hebrew,
    hi: LocalizedFontFamilies.Hindi,
    hr: LocalizedFontFamilies.EastEuropean,
    hu: LocalizedFontFamilies.EastEuropean,
    ja: LocalizedFontFamilies.Japanese,
    kk: LocalizedFontFamilies.EastEuropean,
    ko: LocalizedFontFamilies.Korean,
    lt: LocalizedFontFamilies.EastEuropean,
    lv: LocalizedFontFamilies.EastEuropean,
    pl: LocalizedFontFamilies.EastEuropean,
    ru: LocalizedFontFamilies.Cyrillic,
    sk: LocalizedFontFamilies.EastEuropean,
    'sr-latn': LocalizedFontFamilies.EastEuropean,
    th: LocalizedFontFamilies.Thai,
    tr: LocalizedFontFamilies.EastEuropean,
    uk: LocalizedFontFamilies.Cyrillic,
    vi: LocalizedFontFamilies.Vietnamese,
    'zh-hans': LocalizedFontFamilies.ChineseSimplified,
    'zh-hant': LocalizedFontFamilies.ChineseTraditional
};
// Standard font sizes.
var FontSizes;
(function (FontSizes) {
    FontSizes.mini = '10px';
    FontSizes.xSmall = '11px';
    FontSizes.small = '12px';
    FontSizes.smallPlus = '13px';
    FontSizes.medium = '14px';
    FontSizes.mediumPlus = '15px';
    FontSizes.icon = '16px';
    FontSizes.large = '17px';
    FontSizes.xLarge = '21px';
    FontSizes.xxLarge = '28px';
    FontSizes.superLarge = '42px';
    FontSizes.mega = '72px';
})(FontSizes || (FontSizes = {}));
// Standard font weights.
var FontWeights;
(function (FontWeights) {
    FontWeights.light = 100;
    FontWeights.semilight = 300;
    FontWeights.regular = 400;
    FontWeights.semibold = 600;
    FontWeights.bold = 700;
})(FontWeights || (FontWeights = {}));
// Standard Icon Sizes.
var IconFontSizes;
(function (IconFontSizes) {
    IconFontSizes.xSmall = '10px';
    IconFontSizes.small = '12px';
    IconFontSizes.medium = '16px';
    IconFontSizes.large = '20px';
})(IconFontSizes || (IconFontSizes = {}));
function _fontFamilyWithFallbacks(fontFamily) {
    return fontFamily + ", " + FontFamilyFallbacks;
}
function createFontStyles(localeCode) {
    var localizedFont = _getLocalizedFontFamily(localeCode);
    var fontFamilyWithFallback = _fontFamilyWithFallbacks(localizedFont);
    var semilightFontFamilyWithFallback = fontFamilyWithFallback;
    // Chrome has a bug where it does not render Segoe UI Semilight correctly, so we force the webfont to be used in that case
    if (localizedFont === defaultFontFamily) {
        semilightFontFamilyWithFallback = _fontFamilyWithFallbacks(LocalizedFontFamilies.WestEuropean);
    }
    var fontStyles = {
        tiny: _createFont(FontSizes.mini, FontWeights.semibold, fontFamilyWithFallback),
        xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamilyWithFallback),
        small: _createFont(FontSizes.small, FontWeights.regular, fontFamilyWithFallback),
        smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamilyWithFallback),
        medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamilyWithFallback),
        mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamilyWithFallback),
        large: _createFont(FontSizes.large, FontWeights.semilight, semilightFontFamilyWithFallback),
        xLarge: _createFont(FontSizes.xLarge, FontWeights.light, fontFamilyWithFallback),
        xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light, fontFamilyWithFallback),
        superLarge: _createFont(FontSizes.superLarge, FontWeights.light, fontFamilyWithFallback),
        mega: _createFont(FontSizes.mega, FontWeights.light, fontFamilyWithFallback)
    };
    return fontStyles;
}
/**
 * If there is a localized font for this language, return that. Returns undefined if there is no localized font for that language.
 */
function _getLocalizedFontFamily(language) {
    for (var lang in LanguageToFontMap) {
        if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
            // tslint:disable-next-line:no-any
            return LanguageToFontMap[lang];
        }
    }
    return defaultFontFamily;
}
function _createFont(size, weight, fontFamily) {
    return {
        fontFamily: fontFamily,
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        fontSize: size,
        fontWeight: weight
    };
}
//# sourceMappingURL=fonts.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/getFadedOverflowStyle.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/getFadedOverflowStyle.js ***!
  \****************************************************************************/
/*! exports provided: getFadedOverflowStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFadedOverflowStyle", function() { return getFadedOverflowStyle; });
var DEFAULT_HEIGHT = '50%';
var DEFAULT_WIDTH = 20;
/**
 * - Generates a style used to fade out an overflowing content by defining a style for an :after pseudo element.
 * - Apply it to the :after selector for all combination of states the parent of content might have (normal, hover, selected, focus).
 * - Requires the target to have position set to relative and overflow set to hidden.
 *
 * @example
 * ```tsx
 * // Assuming the following DOM structure and the different background colors coming from the parent holding the content.
 * <div className={classNames.parent}>
 *   <span className={classNames.content}>Overflown Content</span>
 * </div>
 * ```
 * ```ts
 * // This is how the style set would look in Component.styles.ts
 * const { bodyBackground } = theme.semanticColors;
 * const { neutralLighter } = theme.palette;
 *
 * // The second argument of getFadedOverflowStyle function is a string representing a key of ISemanticColors or IPalette.
 *
 * const styles = {
 *   parent: [
 *     backgroundColor: bodyBackground,
 *     selectors: {
 *       '&:hover: {
 *         backgroundColor: neutralLighter
 *       },
 *       '$content:after': {
 *         ...getFadedOverflowStyle(theme, 'bodyBackground')
 *       },
 *       '&:hover $content:after': {
 *         ...getFadedOverflowStyle(theme, 'neutralLighter')
 *       }
 *     }
 *   ],
 *   content: [
 *     width: '100%',
 *     display: 'inline-block',
 *     position: 'relative',
 *     overflow: 'hidden'
 *   ]
 * }
 * ```
 * @param theme - The theme object to use.
 * @param color - The background color to fade out to. Accepts only keys of ISemanticColors or IPalette. Defaults to 'bodyBackground'.
 * @param direction - The direction of the overflow. Defaults to horizontal.
 * @param width - The width of the fading overflow. Vertical direction defaults it to 100% vs 20px when horizontal.
 * @param height - The Height of the fading overflow. Vertical direction defaults it to 50% vs 100% when horizontal.
 * @returns The style object.
 */
function getFadedOverflowStyle(theme, color, direction, width, height) {
    if (color === void 0) { color = 'bodyBackground'; }
    if (direction === void 0) { direction = 'horizontal'; }
    if (width === void 0) { width = getDefaultValue('width', direction); }
    if (height === void 0) { height = getDefaultValue('height', direction); }
    // Get the color value string from the theme semanticColors or palette.
    var colorValue = theme.semanticColors[color] || theme.palette[color];
    // Get the red, green, blue values of the colorValue.
    var rgbColor = color2rgb(colorValue);
    // Apply opacity 0 to serve as a start color of the gradient.
    var rgba = "rgba(" + rgbColor.r + ", " + rgbColor.g + ", " + rgbColor.b + ", 0)";
    // Get the direction of the gradient.
    var gradientDirection = direction === 'vertical' ? 'to bottom' : 'to right'; // mergeStyles take care of RTL direction.
    return {
        content: '""',
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        pointerEvents: 'none',
        backgroundImage: "linear-gradient(" + gradientDirection + ", " + rgba + " 0%, " + colorValue + " 100%)"
    };
}
// TODO consider moving this to a separate module along with some more color functions from OUFR/utilities.
/**
 * Helper function to convert a string hex color to an RGB object.
 *
 * @param colorValue - Color to be converted from hex to rgba.
 */
function color2rgb(colorValue) {
    if (colorValue[0] === '#') {
        // If it's a hex code
        return {
            r: parseInt(colorValue.slice(1, 3), 16),
            g: parseInt(colorValue.slice(3, 5), 16),
            b: parseInt(colorValue.slice(5, 7), 16)
        };
    }
    else if (colorValue.indexOf('rgba(') === 0) {
        // If it's an rgba color string
        colorValue = colorValue.match(/rgba\(([^)]+)\)/)[1];
        var parts = colorValue.split(/ *, */).map(Number);
        return {
            r: parts[0],
            g: parts[1],
            b: parts[2]
        };
    }
    // The only remaining possibility is transparent.
    return {
        r: 255,
        g: 255,
        b: 255
    };
}
/**
 * Helper function to get the default values for parameters of main function.
 *
 * @param style - Which style to get the default value for.
 * @param direction - What direction to take into consideration.
 */
function getDefaultValue(style, direction) {
    if (style === 'width') {
        return direction === 'horizontal' ? DEFAULT_WIDTH : '100%';
    }
    else {
        return direction === 'vertical' ? DEFAULT_HEIGHT : '100%';
    }
}
//# sourceMappingURL=getFadedOverflowStyle.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/getFocusStyle.js":
/*!********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/getFocusStyle.js ***!
  \********************************************************************/
/*! exports provided: getFocusStyle, focusClear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusStyle", function() { return getFocusStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusClear", function() { return focusClear; });
/* harmony import */ var _CommonStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommonStyles */ "./node_modules/@uifabric/styling/lib/styles/CommonStyles.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");
/* harmony import */ var _zIndexes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zIndexes */ "./node_modules/@uifabric/styling/lib/styles/zIndexes.js");



/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @param highContrastStyle - Style for high contrast mode.
 * @param borderColor - Color of the border.
 * @param outlineColor - Color of the outline.
 * @param isFocusedOnly - If the styles should apply on focus or not.
 * @returns The style object.
 */
function getFocusStyle(theme, inset, position, highContrastStyle, borderColor, outlineColor, isFocusedOnly) {
    if (inset === void 0) { inset = 0; }
    if (position === void 0) { position = 'relative'; }
    if (highContrastStyle === void 0) { highContrastStyle = undefined; }
    if (borderColor === void 0) { borderColor = theme.palette.white; }
    if (outlineColor === void 0) { outlineColor = theme.palette.neutralSecondary; }
    if (isFocusedOnly === void 0) { isFocusedOnly = true; }
    return {
        outline: 'transparent',
        position: position,
        selectors: (_a = {
                '::-moz-focus-inner': {
                    border: '0'
                }
            },
            _a["." + _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &" + (isFocusedOnly ? ':focus' : '') + ":after"] = {
                content: '""',
                position: 'absolute',
                left: inset + 1,
                top: inset + 1,
                bottom: inset + 1,
                right: inset + 1,
                border: '1px solid ' + borderColor,
                outline: '1px solid ' + outlineColor,
                zIndex: _zIndexes__WEBPACK_IMPORTED_MODULE_2__["ZIndexes"].FocusStyle,
                selectors: (_b = {},
                    _b[_CommonStyles__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = highContrastStyle,
                    _b)
            },
            _a)
    };
    var _a, _b;
}
/**
 * Generates style to clear browser specific focus styles.
 */
function focusClear() {
    return {
        selectors: {
            '&::-moz-focus-inner': {
                // Clear the focus border in Firefox. Reference: http://stackoverflow.com/a/199319/1436671
                border: 0
            },
            '&': {
                // Clear browser specific focus styles and use transparent as placeholder for focus style
                outline: 'transparent'
            }
        }
    };
}
//# sourceMappingURL=getFocusStyle.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/getGlobalClassNames.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/getGlobalClassNames.js ***!
  \**************************************************************************/
/*! exports provided: getGlobalClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalClassNames", function() { return getGlobalClassNames; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");


/**
 * Internal memoized function which simply takes in the class map and the
 * disable boolean. These immutable values can be memoized.
 */
var _getGlobalClassNames = Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["memoizeFunction"])(function (classNames, disableGlobalClassNames) {
    var styleSheet = _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
    if (disableGlobalClassNames) {
        // disable global classnames
        return Object.keys(classNames).reduce(function (acc, className) {
            acc[className] = styleSheet.getClassName(classNames[className]);
            return acc;
        }, {});
    }
    // use global classnames
    return classNames;
});
/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */
function getGlobalClassNames(classNames, theme, disableGlobalClassNames) {
    return _getGlobalClassNames(classNames, disableGlobalClassNames !== undefined ? disableGlobalClassNames : theme.disableGlobalClassNames);
}
//# sourceMappingURL=getGlobalClassNames.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/hiddenContentStyle.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/hiddenContentStyle.js ***!
  \*************************************************************************/
/*! exports provided: hiddenContentStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hiddenContentStyle", function() { return hiddenContentStyle; });
var hiddenContentStyle = {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    border: 0,
    overflow: 'hidden'
};
//# sourceMappingURL=hiddenContentStyle.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/index.js ***!
  \************************************************************/
/*! exports provided: AnimationStyles, AnimationVariables, DefaultPalette, DefaultFontStyles, registerDefaultFontFaces, FontSizes, FontWeights, IconFontSizes, createFontStyles, getFocusStyle, focusClear, hiddenContentStyle, PulsingBeaconAnimationStyles, getGlobalClassNames, ThemeSettingName, getTheme, loadTheme, createTheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, getSchemedContext, HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack, ScreenWidthMinSmall, ScreenWidthMinMedium, ScreenWidthMinLarge, ScreenWidthMinXLarge, ScreenWidthMinXXLarge, ScreenWidthMinXXXLarge, ScreenWidthMaxSmall, ScreenWidthMaxMedium, ScreenWidthMaxLarge, ScreenWidthMaxXLarge, ScreenWidthMaxXXLarge, ScreenWidthMinUhfMobile, getScreenSelector, normalize, noWrap, getFadedOverflowStyle, ZIndexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnimationStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationStyles */ "./node_modules/@uifabric/styling/lib/styles/AnimationStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationStyles", function() { return _AnimationStyles__WEBPACK_IMPORTED_MODULE_0__["AnimationStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationVariables", function() { return _AnimationStyles__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"]; });

/* harmony import */ var _DefaultPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultPalette */ "./node_modules/@uifabric/styling/lib/styles/DefaultPalette.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultPalette", function() { return _DefaultPalette__WEBPACK_IMPORTED_MODULE_1__["DefaultPalette"]; });

/* harmony import */ var _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultFontStyles */ "./node_modules/@uifabric/styling/lib/styles/DefaultFontStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultFontStyles", function() { return _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__["DefaultFontStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerDefaultFontFaces", function() { return _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__["registerDefaultFontFaces"]; });

/* harmony import */ var _fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts */ "./node_modules/@uifabric/styling/lib/styles/fonts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontSizes", function() { return _fonts__WEBPACK_IMPORTED_MODULE_3__["FontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontWeights", function() { return _fonts__WEBPACK_IMPORTED_MODULE_3__["FontWeights"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconFontSizes", function() { return _fonts__WEBPACK_IMPORTED_MODULE_3__["IconFontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFontStyles", function() { return _fonts__WEBPACK_IMPORTED_MODULE_3__["createFontStyles"]; });

/* harmony import */ var _getFocusStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getFocusStyle */ "./node_modules/@uifabric/styling/lib/styles/getFocusStyle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFocusStyle", function() { return _getFocusStyle__WEBPACK_IMPORTED_MODULE_4__["getFocusStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusClear", function() { return _getFocusStyle__WEBPACK_IMPORTED_MODULE_4__["focusClear"]; });

/* harmony import */ var _hiddenContentStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hiddenContentStyle */ "./node_modules/@uifabric/styling/lib/styles/hiddenContentStyle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hiddenContentStyle", function() { return _hiddenContentStyle__WEBPACK_IMPORTED_MODULE_5__["hiddenContentStyle"]; });

/* harmony import */ var _PulsingBeaconAnimationStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PulsingBeaconAnimationStyles */ "./node_modules/@uifabric/styling/lib/styles/PulsingBeaconAnimationStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PulsingBeaconAnimationStyles", function() { return _PulsingBeaconAnimationStyles__WEBPACK_IMPORTED_MODULE_6__["PulsingBeaconAnimationStyles"]; });

/* harmony import */ var _getGlobalClassNames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getGlobalClassNames */ "./node_modules/@uifabric/styling/lib/styles/getGlobalClassNames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalClassNames", function() { return _getGlobalClassNames__WEBPACK_IMPORTED_MODULE_7__["getGlobalClassNames"]; });

/* harmony import */ var _scheme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scheme */ "./node_modules/@uifabric/styling/lib/styles/scheme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSchemedContext", function() { return _scheme__WEBPACK_IMPORTED_MODULE_8__["getSchemedContext"]; });

/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme */ "./node_modules/@uifabric/styling/lib/styles/theme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeSettingName", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["ThemeSettingName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["getTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadTheme", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["loadTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTheme", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["createTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerOnThemeChangeCallback", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["registerOnThemeChangeCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeOnThemeChangeCallback", function() { return _theme__WEBPACK_IMPORTED_MODULE_9__["removeOnThemeChangeCallback"]; });

/* harmony import */ var _CommonStyles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CommonStyles */ "./node_modules/@uifabric/styling/lib/styles/CommonStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelector", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["HighContrastSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorWhite", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["HighContrastSelectorWhite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorBlack", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["HighContrastSelectorBlack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinSmall", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinMedium", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXXLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinXXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxSmall", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMaxSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxMedium", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMaxMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMaxLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMaxXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXXLarge", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMaxXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinUhfMobile", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["ScreenWidthMinUhfMobile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScreenSelector", function() { return _CommonStyles__WEBPACK_IMPORTED_MODULE_10__["getScreenSelector"]; });

/* harmony import */ var _GeneralStyles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./GeneralStyles */ "./node_modules/@uifabric/styling/lib/styles/GeneralStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _GeneralStyles__WEBPACK_IMPORTED_MODULE_11__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noWrap", function() { return _GeneralStyles__WEBPACK_IMPORTED_MODULE_11__["noWrap"]; });

/* harmony import */ var _getFadedOverflowStyle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getFadedOverflowStyle */ "./node_modules/@uifabric/styling/lib/styles/getFadedOverflowStyle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFadedOverflowStyle", function() { return _getFadedOverflowStyle__WEBPACK_IMPORTED_MODULE_12__["getFadedOverflowStyle"]; });

/* harmony import */ var _zIndexes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./zIndexes */ "./node_modules/@uifabric/styling/lib/styles/zIndexes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZIndexes", function() { return _zIndexes__WEBPACK_IMPORTED_MODULE_13__["ZIndexes"]; });















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/scheme.js":
/*!*************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/scheme.js ***!
  \*************************************************************/
/*! exports provided: getSchemedContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSchemedContext", function() { return getSchemedContext; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");


/**
 * Modify context to activate the specified scheme, using scheme in context (if available)
 * and falling back to settingsTheme. If no scheme is available, undefined context will be returned.
 *
 * @param scheme - Scheme to get customizations for.
 * @param context - Context in which to get schemed customizations.
 * @param settingsTheme - Themes setting fallback if context does not have schemed theme.
 */
function getSchemedContext(scheme, context, settingsTheme) {
    var newContext;
    var contextTheme = context.customizations.settings.theme;
    // Grab scheme theme from context (if it exists) with fallback to settings.
    var schemeSource = contextTheme && contextTheme.schemes && contextTheme.schemes[scheme] ? contextTheme : settingsTheme;
    var schemeTheme = schemeSource && schemeSource.schemes && schemeSource.schemes[scheme] ? schemeSource.schemes[scheme] : undefined;
    // These first two checks are logically redundant but TS doesn't infer schemeSource.schemes is defined when schemeTheme is defined.
    // TODO: This should be optimized (whether here or outside of this function TBD) so that this code block is not executing on every
    //        render if scheme name and theme data has not changed. This needs to be carefully implemented to consider scheme data
    //        changing when scheme name doesn't, to account for the fact that mergeCustomizations makes new objects (shallow ref won't
    //        work), etc.
    if (schemeSource && schemeSource.schemes && schemeTheme) {
        // TODO: are either or both of these spreads necessary?
        var newTheme = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, schemeTheme);
        newTheme.schemes = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, schemeSource.schemes);
        newContext = Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeCustomizations"])({ settings: { theme: newTheme } }, context);
    }
    return newContext;
}
//# sourceMappingURL=scheme.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/theme.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/theme.js ***!
  \************************************************************/
/*! exports provided: ThemeSettingName, getTheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, loadTheme, createTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeSettingName", function() { return ThemeSettingName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return getTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerOnThemeChangeCallback", function() { return registerOnThemeChangeCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeOnThemeChangeCallback", function() { return removeOnThemeChangeCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTheme", function() { return loadTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTheme", function() { return createTheme; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");
/* harmony import */ var _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultFontStyles */ "./node_modules/@uifabric/styling/lib/styles/DefaultFontStyles.js");
/* harmony import */ var _DefaultPalette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultPalette */ "./node_modules/@uifabric/styling/lib/styles/DefaultPalette.js");
/* harmony import */ var _DefaultSpacing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DefaultSpacing */ "./node_modules/@uifabric/styling/lib/styles/DefaultSpacing.js");
/* harmony import */ var _DefaultTypography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DefaultTypography */ "./node_modules/@uifabric/styling/lib/styles/DefaultTypography.js");
/* harmony import */ var _microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @microsoft/load-themed-styles */ "./node_modules/@microsoft/load-themed-styles/lib/index.js");
/* harmony import */ var _microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_6__);







var _theme = createTheme({
    palette: _DefaultPalette__WEBPACK_IMPORTED_MODULE_3__["DefaultPalette"],
    semanticColors: _makeSemanticColorsFromPalette(_DefaultPalette__WEBPACK_IMPORTED_MODULE_3__["DefaultPalette"], false, false),
    fonts: _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__["DefaultFontStyles"],
    isInverted: false,
    typography: _DefaultTypography__WEBPACK_IMPORTED_MODULE_5__["DefaultTypography"],
    disableGlobalClassNames: false
});
var _onThemeChangeCallbacks = [];
var ThemeSettingName = 'theme';
if (!_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Customizations"].getSettings([ThemeSettingName]).theme) {
    var win = typeof window !== 'undefined' ? window : undefined;
    // tslint:disable:no-string-literal no-any
    if (win && win['FabricConfig'] && win['FabricConfig'].theme) {
        _theme = createTheme(win['FabricConfig'].theme);
    }
    // tslint:enable:no-string-literal no-any
    // Set the default theme.
    _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Customizations"].applySettings((_a = {}, _a[ThemeSettingName] = _theme, _a));
}
/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
function getTheme(depComments) {
    if (depComments === void 0) { depComments = false; }
    if (depComments === true) {
        _theme = createTheme({}, depComments);
    }
    return _theme;
}
/**
 * Registers a callback that gets called whenever the theme changes.
 * This should only be used when the component cannot automatically get theme changes through its state.
 * This will not register duplicate callbacks.
 */
function registerOnThemeChangeCallback(callback) {
    if (_onThemeChangeCallbacks.indexOf(callback) === -1) {
        _onThemeChangeCallbacks.push(callback);
    }
}
/**
 * See registerOnThemeChangeCallback().
 * Removes previously registered callbacks.
 */
function removeOnThemeChangeCallback(callback) {
    var i = _onThemeChangeCallbacks.indexOf(callback);
    if (i === -1) {
        return;
    }
    _onThemeChangeCallbacks.splice(i, 1);
}
/**
 * Applies the theme, while filling in missing slots.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
function loadTheme(theme, depComments) {
    if (depComments === void 0) { depComments = false; }
    _theme = createTheme(theme, depComments);
    // Invoke the legacy method of theming the page as well.
    Object(_microsoft_load_themed_styles__WEBPACK_IMPORTED_MODULE_6__["loadTheme"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _theme.palette, _theme.semanticColors));
    _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Customizations"].applySettings((_a = {}, _a[ThemeSettingName] = _theme, _a));
    _onThemeChangeCallbacks.forEach(function (callback) {
        try {
            callback(_theme);
        }
        catch (e) {
            // don't let a bad callback break everything else
        }
    });
    return _theme;
    var _a;
}
/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
function createTheme(theme, depComments) {
    if (depComments === void 0) { depComments = false; }
    var newPalette = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _DefaultPalette__WEBPACK_IMPORTED_MODULE_3__["DefaultPalette"], theme.palette);
    if (!theme.palette || !theme.palette.accent) {
        newPalette.accent = newPalette.themePrimary;
    }
    // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
    var newSemanticColors = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _makeSemanticColorsFromPalette(newPalette, !!theme.isInverted, depComments), theme.semanticColors);
    var typography = Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["merge"])({}, _DefaultTypography__WEBPACK_IMPORTED_MODULE_5__["DefaultTypography"], theme.typography);
    var variants = typography.variants;
    for (var variantName in variants) {
        if (variants.hasOwnProperty(variantName)) {
            var variant = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, variants.default, variants[variantName]);
            variant.family = _expandFrom(variant.family, typography.families);
            variant.size = _expandFrom(variant.size, typography.sizes);
            variant.weight = _expandFrom(variant.weight, typography.weights);
            variant.color = _expandFrom(variant.color, newSemanticColors);
            variant.hoverColor = _expandFrom(variant.hoverColor, newSemanticColors);
            variant.disabledColor = _expandFrom(variant.disabledColor, newSemanticColors);
            variants[variantName] = variant;
        }
    }
    return {
        palette: newPalette,
        fonts: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _DefaultFontStyles__WEBPACK_IMPORTED_MODULE_2__["DefaultFontStyles"], theme.fonts),
        semanticColors: newSemanticColors,
        isInverted: !!theme.isInverted,
        disableGlobalClassNames: !!theme.disableGlobalClassNames,
        typography: typography,
        spacing: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _DefaultSpacing__WEBPACK_IMPORTED_MODULE_4__["DefaultSpacing"], theme.spacing)
    };
}
/**
 * Helper to pull a given property name from a given set of sources, in order, if available. Otherwise returns the property name.
 */
function _expandFrom(propertyName) {
    var maps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        maps[_i - 1] = arguments[_i];
    }
    if (propertyName) {
        for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
            var map = maps_1[_a];
            if (map[propertyName]) {
                return map[propertyName];
            }
        }
    }
    return propertyName;
}
// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p, isInverted, depComments) {
    var toReturn = {
        bodyBackground: p.white,
        bodyStandoutBackground: p.neutralLighterAlt,
        bodyFrameBackground: p.white,
        bodyFrameDivider: p.neutralLight,
        bodyText: p.neutralPrimary,
        bodyTextChecked: p.black,
        bodySubtext: p.neutralSecondary,
        bodyDivider: p.neutralLight,
        disabledBackground: p.neutralLighter,
        disabledText: p.neutralTertiary,
        disabledBodyText: p.neutralTertiaryAlt,
        disabledSubtext: p.neutralQuaternary,
        focusBorder: p.neutralSecondary,
        variantBorder: p.neutralLight,
        variantBorderHovered: p.neutralTertiary,
        defaultStateBackground: p.neutralLight,
        errorText: !isInverted ? p.redDark : '#ff5f5f',
        warningText: !isInverted ? '#333333' : '#ffffff',
        errorBackground: !isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)',
        blockingBackground: !isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)',
        warningBackground: !isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)',
        warningHighlight: !isInverted ? '#ffb900' : '#fff100',
        successBackground: !isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)',
        inputBorder: p.neutralTertiary,
        inputBorderHovered: p.neutralDark,
        inputBackground: p.white,
        inputBackgroundChecked: p.themePrimary,
        inputBackgroundCheckedHovered: p.themeDarkAlt,
        inputForegroundChecked: p.white,
        inputFocusBorderAlt: p.themePrimary,
        smallInputBorder: p.neutralSecondary,
        inputPlaceholderText: p.neutralSecondary,
        buttonBackground: p.neutralLighter,
        buttonBackgroundChecked: p.neutralTertiaryAlt,
        buttonBackgroundHovered: p.neutralLight,
        buttonBackgroundCheckedHovered: p.neutralLight,
        buttonBackgroundPressed: p.neutralLight,
        buttonBackgroundDisabled: p.neutralLighter,
        buttonBorder: 'transparent',
        buttonText: p.neutralPrimary,
        buttonTextHovered: p.neutralDark,
        buttonTextChecked: p.neutralDark,
        buttonTextCheckedHovered: p.black,
        buttonTextPressed: p.neutralDark,
        buttonTextDisabled: p.neutralTertiary,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.themePrimary,
        primaryButtonBackgroundHovered: p.themeDarkAlt,
        primaryButtonBackgroundPressed: p.themeDark,
        primaryButtonBackgroundDisabled: p.neutralLighter,
        primaryButtonBorder: 'transparent',
        primaryButtonText: p.white,
        primaryButtonTextHovered: p.white,
        primaryButtonTextPressed: p.white,
        primaryButtonTextDisabled: p.neutralQuaternary,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuIcon: p.themePrimary,
        menuHeader: p.themePrimary,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: p.neutralDark,
        listBackground: p.white,
        listText: p.neutralPrimary,
        listItemBackgroundHovered: p.neutralLighter,
        listItemBackgroundChecked: p.neutralLight,
        listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,
        listHeaderBackgroundHovered: p.neutralLighter,
        listHeaderBackgroundPressed: p.neutralLight,
        actionLink: p.neutralPrimary,
        actionLinkHovered: p.neutralDark,
        link: p.themePrimary,
        linkHovered: p.themeDarker,
        // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
        listTextColor: '',
        menuItemBackgroundChecked: p.neutralLight
    };
    return _fixDeprecatedSlots(toReturn, depComments);
}
function _fixDeprecatedSlots(s, depComments) {
    // Add @deprecated tag as comment if enabled
    var dep = '';
    if (depComments === true) {
        dep = ' /* @deprecated */';
    }
    s.listTextColor = s.listText + dep;
    s.menuItemBackgroundChecked += dep;
    return s;
}
var _a;
//# sourceMappingURL=theme.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/styles/zIndexes.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/styles/zIndexes.js ***!
  \***************************************************************/
/*! exports provided: ZIndexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZIndexes", function() { return ZIndexes; });
var ZIndexes;
(function (ZIndexes) {
    ZIndexes.Nav = 1;
    ZIndexes.ScrollablePane = 1;
    ZIndexes.FocusStyle = 1;
    ZIndexes.Coachmark = 1000;
    ZIndexes.Layer = 1000000;
    ZIndexes.KeytipLayer = 1000001;
})(ZIndexes || (ZIndexes = {}));
//# sourceMappingURL=zIndexes.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/utilities/buildClassMap.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/utilities/buildClassMap.js ***!
  \***********************************************************************/
/*! exports provided: buildClassMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildClassMap", function() { return buildClassMap; });
/* harmony import */ var _MergeStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MergeStyles */ "./node_modules/@uifabric/styling/lib/MergeStyles.js");

/**
 * Builds a class names object from a given map.
 *
 * @param styles - Map of unprocessed styles.
 * @returns Map of property name to class name.
 */
function buildClassMap(styles) {
    var classes = {};
    var _loop_1 = function (styleName) {
        if (styles.hasOwnProperty(styleName)) {
            var className_1;
            Object.defineProperty(classes, styleName, {
                get: function () {
                    if (className_1 === undefined) {
                        // tslint:disable-next-line:no-any
                        className_1 = Object(_MergeStyles__WEBPACK_IMPORTED_MODULE_0__["mergeStyles"])(styles[styleName]).toString();
                    }
                    return className_1;
                },
                enumerable: true,
                configurable: true
            });
        }
    };
    for (var styleName in styles) {
        _loop_1(styleName);
    }
    return classes;
}
//# sourceMappingURL=buildClassMap.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/utilities/getIconClassName.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/utilities/getIconClassName.js ***!
  \**************************************************************************/
/*! exports provided: getIconClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIconClassName", function() { return getIconClassName; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons */ "./node_modules/@uifabric/styling/lib/utilities/icons.js");


var defaultIconStyles = {
    display: 'inline-block'
};
/**
 * Gets an icon classname. You should be able to add this classname to an I tag with no
 * additional classnames, and render the icon.
 *
 * @public
 */
function getIconClassName(name) {
    var className = '';
    var icon = Object(_icons__WEBPACK_IMPORTED_MODULE_1__["getIcon"])(name);
    if (icon) {
        className = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["mergeStyles"])(icon.subset.className, defaultIconStyles, {
            selectors: {
                '::before': {
                    content: "\"" + icon.code + "\""
                }
            }
        });
    }
    return className;
}
//# sourceMappingURL=getIconClassName.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/utilities/icons.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/utilities/icons.js ***!
  \***************************************************************/
/*! exports provided: registerIcons, unregisterIcons, registerIconAlias, getIcon, setIconOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerIcons", function() { return registerIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregisterIcons", function() { return unregisterIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerIconAlias", function() { return registerIconAlias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIcon", function() { return getIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIconOptions", function() { return setIconOptions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");



var ICON_SETTING_NAME = 'icons';
var _iconSettings = _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["GlobalSettings"].getValue(ICON_SETTING_NAME, {
    __options: {
        disableWarnings: false,
        warnOnMissingIcons: true
    },
    __remapped: {}
});
// Reset icon registration on stylesheet resets.
var stylesheet = _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["Stylesheet"].getInstance();
if (stylesheet && stylesheet.onReset) {
    stylesheet.onReset(function () {
        for (var name_1 in _iconSettings) {
            if (_iconSettings.hasOwnProperty(name_1) && !!_iconSettings[name_1].subset) {
                _iconSettings[name_1].subset.className = undefined;
            }
        }
    });
}
/**
 * Normalizes an icon name for consistent mapping.
 * Current implementation is to convert the icon name to lower case.
 *
 * @param name - Icon name to normalize.
 * @returns {string} Normalized icon name to use for indexing and mapping.
 */
var normalizeIconName = function (name) { return name.toLowerCase(); };
/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
function registerIcons(iconSubset, options) {
    var subset = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, iconSubset, { isRegistered: false, className: undefined });
    var icons = iconSubset.icons;
    // Grab options, optionally mix user provided ones on top.
    options = options ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _iconSettings.__options, options) : _iconSettings.__options;
    for (var iconName in icons) {
        if (icons.hasOwnProperty(iconName)) {
            var code = icons[iconName];
            var normalizedIconName = normalizeIconName(iconName);
            if (_iconSettings[normalizedIconName]) {
                if (!options.disableWarnings) {
                    Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warn"])("Icon '" + iconName + " being re-registered. Ignoring duplicate registration.");
                }
            }
            else {
                _iconSettings[normalizedIconName] = {
                    code: code,
                    subset: subset
                };
            }
        }
    }
}
/**
 * Unregisters icons by name.
 *
 * @param iconNames - List of icons to unregister.
 */
function unregisterIcons(iconNames) {
    var options = _iconSettings.__options;
    var _loop_1 = function (iconName) {
        var normalizedIconName = normalizeIconName(iconName);
        if (_iconSettings[normalizedIconName]) {
            delete _iconSettings[normalizedIconName];
        }
        else {
            // Warn that we are trying to delete an icon that doesn't exist
            if (!options.disableWarnings) {
                Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warn"])("The icon \"" + iconName + "\" tried to unregister but was not registered.");
            }
        }
        // Delete any aliases for this iconName
        if (_iconSettings.__remapped[normalizedIconName]) {
            delete _iconSettings.__remapped[normalizedIconName];
        }
        // Delete any items that were an alias for this iconName
        Object.keys(_iconSettings.__remapped).forEach(function (key) {
            if (_iconSettings.__remapped[key] === normalizedIconName) {
                delete _iconSettings.__remapped[key];
            }
        });
    };
    for (var _i = 0, iconNames_1 = iconNames; _i < iconNames_1.length; _i++) {
        var iconName = iconNames_1[_i];
        _loop_1(iconName);
    }
}
/**
 * Remaps one icon name to another.
 */
function registerIconAlias(iconName, mappedToName) {
    _iconSettings.__remapped[normalizeIconName(iconName)] = normalizeIconName(mappedToName);
}
/**
 * Gets an icon definition. If an icon is requested but the subset has yet to be registered,
 * it will get registered immediately.
 *
 * @public
 * @param name - Name of icon.
 */
function getIcon(name) {
    var icon = undefined;
    var options = _iconSettings.__options;
    name = name ? normalizeIconName(name) : '';
    name = _iconSettings.__remapped[name] || name;
    if (name) {
        icon = _iconSettings[name];
        if (icon) {
            var subset = icon.subset;
            if (subset && subset.fontFace) {
                if (!subset.isRegistered) {
                    Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["fontFace"])(subset.fontFace);
                    subset.isRegistered = true;
                }
                if (!subset.className) {
                    subset.className = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["mergeStyles"])(subset.style, {
                        fontFamily: subset.fontFace.fontFamily,
                        fontWeight: subset.fontFace.fontWeight || 'normal',
                        fontStyle: subset.fontFace.fontStyle || 'normal'
                    });
                }
            }
        }
        else {
            if (!options.disableWarnings && options.warnOnMissingIcons) {
                Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warn"])("The icon \"" + name + "\" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.");
            }
        }
    }
    return icon;
}
/**
 * Sets the icon options.
 *
 * @public
 */
function setIconOptions(options) {
    _iconSettings.__options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _iconSettings.__options, options);
}
//# sourceMappingURL=icons.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/utilities/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/utilities/index.js ***!
  \***************************************************************/
/*! exports provided: buildClassMap, getIcon, registerIcons, registerIconAlias, unregisterIcons, setIconOptions, getIconClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buildClassMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildClassMap */ "./node_modules/@uifabric/styling/lib/utilities/buildClassMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildClassMap", function() { return _buildClassMap__WEBPACK_IMPORTED_MODULE_0__["buildClassMap"]; });

/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons */ "./node_modules/@uifabric/styling/lib/utilities/icons.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIcon", function() { return _icons__WEBPACK_IMPORTED_MODULE_1__["getIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIcons", function() { return _icons__WEBPACK_IMPORTED_MODULE_1__["registerIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIconAlias", function() { return _icons__WEBPACK_IMPORTED_MODULE_1__["registerIconAlias"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unregisterIcons", function() { return _icons__WEBPACK_IMPORTED_MODULE_1__["unregisterIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setIconOptions", function() { return _icons__WEBPACK_IMPORTED_MODULE_1__["setIconOptions"]; });

/* harmony import */ var _getIconClassName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getIconClassName */ "./node_modules/@uifabric/styling/lib/utilities/getIconClassName.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIconClassName", function() { return _getIconClassName__WEBPACK_IMPORTED_MODULE_2__["getIconClassName"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/styling/lib/version.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/styling/lib/version.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "./node_modules/@uifabric/set-version/lib/index.js");
// @uifabric/styling@6.32.1
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/styling', '6.32.1');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/Async.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/Async.js ***!
  \*******************************************************/
/*! exports provided: Async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 *
 * @public
 */
var Async = /** @class */ (function () {
    // tslint:disable-next-line:no-any
    function Async(parent, onError) {
        this._timeoutIds = null;
        this._immediateIds = null;
        this._intervalIds = null;
        this._animationFrameIds = null;
        this._isDisposed = false;
        this._parent = parent || null;
        this._onErrorHandler = onError;
        this._noop = function () {
            /* do nothing */
        };
    }
    /**
     * Dispose function, clears all async operations.
     */
    Async.prototype.dispose = function () {
        var id;
        this._isDisposed = true;
        this._parent = null;
        // Clear timeouts.
        if (this._timeoutIds) {
            for (id in this._timeoutIds) {
                if (this._timeoutIds.hasOwnProperty(id)) {
                    this.clearTimeout(parseInt(id, 10));
                }
            }
            this._timeoutIds = null;
        }
        // Clear immediates.
        if (this._immediateIds) {
            for (id in this._immediateIds) {
                if (this._immediateIds.hasOwnProperty(id)) {
                    this.clearImmediate(parseInt(id, 10));
                }
            }
            this._immediateIds = null;
        }
        // Clear intervals.
        if (this._intervalIds) {
            for (id in this._intervalIds) {
                if (this._intervalIds.hasOwnProperty(id)) {
                    this.clearInterval(parseInt(id, 10));
                }
            }
            this._intervalIds = null;
        }
        // Clear animation frames.
        if (this._animationFrameIds) {
            for (id in this._animationFrameIds) {
                if (this._animationFrameIds.hasOwnProperty(id)) {
                    this.cancelAnimationFrame(parseInt(id, 10));
                }
            }
            this._animationFrameIds = null;
        }
    };
    /**
     * SetTimeout override, which will auto cancel the timeout during dispose.
     * @param callback - Callback to execute.
     * @param duration - Duration in milliseconds.
     * @returns The setTimeout id.
     */
    Async.prototype.setTimeout = function (callback, duration) {
        var _this = this;
        var timeoutId = 0;
        if (!this._isDisposed) {
            if (!this._timeoutIds) {
                this._timeoutIds = {};
            }
            /* tslint:disable:ban-native-functions */
            timeoutId = setTimeout(function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    if (_this._timeoutIds) {
                        delete _this._timeoutIds[timeoutId];
                    }
                    callback.apply(_this._parent);
                }
                catch (e) {
                    if (_this._onErrorHandler) {
                        _this._onErrorHandler(e);
                    }
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._timeoutIds[timeoutId] = true;
        }
        return timeoutId;
    };
    /**
     * Clears the timeout.
     * @param id - Id to cancel.
     */
    Async.prototype.clearTimeout = function (id) {
        if (this._timeoutIds && this._timeoutIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearTimeout(id);
            delete this._timeoutIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetImmediate override, which will auto cancel the immediate during dispose.
     * @param callback - Callback to execute.
     * @returns The setTimeout id.
     */
    Async.prototype.setImmediate = function (callback) {
        var _this = this;
        var immediateId = 0;
        if (!this._isDisposed) {
            if (!this._immediateIds) {
                this._immediateIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var setImmediateCallback = function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    if (_this._immediateIds) {
                        delete _this._immediateIds[immediateId];
                    }
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            immediateId = window.setImmediate
                ? window.setImmediate(setImmediateCallback)
                : window.setTimeout(setImmediateCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._immediateIds[immediateId] = true;
        }
        return immediateId;
    };
    /**
     * Clears the immediate.
     * @param id - Id to cancel.
     */
    Async.prototype.clearImmediate = function (id) {
        if (this._immediateIds && this._immediateIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.clearImmediate ? window.clearImmediate(id) : window.clearTimeout(id);
            delete this._immediateIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetInterval override, which will auto cancel the timeout during dispose.
     * @param callback - Callback to execute.
     * @param duration - Duration in milliseconds.
     * @returns The setTimeout id.
     */
    Async.prototype.setInterval = function (callback, duration) {
        var _this = this;
        var intervalId = 0;
        if (!this._isDisposed) {
            if (!this._intervalIds) {
                this._intervalIds = {};
            }
            /* tslint:disable:ban-native-functions */
            intervalId = setInterval(function () {
                // Time to execute the interval callback, enqueue it as a foreground task to be executed.
                try {
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._intervalIds[intervalId] = true;
        }
        return intervalId;
    };
    /**
     * Clears the interval.
     * @param id - Id to cancel.
     */
    Async.prototype.clearInterval = function (id) {
        if (this._intervalIds && this._intervalIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearInterval(id);
            delete this._intervalIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * Creates a function that, when executed, will only call the func function at most once per
     * every wait milliseconds. Provide an options object to indicate that func should be invoked
     * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
     * function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the throttled function is invoked more than once during the wait timeout.
     *
     * @param func - The function to throttle.
     * @param wait - The number of milliseconds to throttle executions to. Defaults to 0.
     * @param options - The options object.
     * @returns The new throttled function.
     */
    Async.prototype.throttle = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            return this._noop;
        }
        var waitMS = wait || 0;
        var leading = true;
        var trailing = true;
        var lastExecuteTime = 0;
        var lastResult;
        // tslint:disable-next-line:no-any
        var lastArgs;
        var timeoutId = null;
        if (options && typeof options.leading === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof options.trailing === 'boolean') {
            trailing = options.trailing;
        }
        var callback = function (userCall) {
            var now = new Date().getTime();
            var delta = now - lastExecuteTime;
            var waitLength = leading ? waitMS - delta : waitMS;
            if (delta >= waitMS && (!userCall || leading)) {
                lastExecuteTime = now;
                if (timeoutId) {
                    _this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastResult = func.apply(_this._parent, lastArgs);
            }
            else if (timeoutId === null && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        // tslint:disable-next-line:no-any
        var resultFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    };
    /**
     * Creates a function that will delay the execution of func until after wait milliseconds have
     * elapsed since the last time it was invoked. Provide an options object to indicate that func
     * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
     * to the debounced function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the debounced function is invoked more than once during the wait
     * timeout.
     *
     * @param func - The function to debounce.
     * @param wait - The number of milliseconds to delay.
     * @param options - The options object.
     * @returns The new debounced function.
     */
    Async.prototype.debounce = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            var noOpFunction = (function () {
                /** Do nothing */
            });
            noOpFunction.cancel = function () {
                return;
            };
            /* tslint:disable:no-any */
            noOpFunction.flush = (function () { return null; });
            /* tslint:enable:no-any */
            noOpFunction.pending = function () { return false; };
            return noOpFunction;
        }
        var waitMS = wait || 0;
        var leading = false;
        var trailing = true;
        var maxWait = null;
        var lastCallTime = 0;
        var lastExecuteTime = new Date().getTime();
        var lastResult;
        // tslint:disable-next-line:no-any
        var lastArgs;
        var timeoutId = null;
        if (options && typeof options.leading === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof options.trailing === 'boolean') {
            trailing = options.trailing;
        }
        if (options && typeof options.maxWait === 'number' && !isNaN(options.maxWait)) {
            maxWait = options.maxWait;
        }
        var markExecuted = function (time) {
            if (timeoutId) {
                _this.clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastExecuteTime = time;
        };
        var invokeFunction = function (time) {
            markExecuted(time);
            lastResult = func.apply(_this._parent, lastArgs);
        };
        var callback = function (userCall) {
            var now = new Date().getTime();
            var executeImmediately = false;
            if (userCall) {
                if (leading && now - lastCallTime >= waitMS) {
                    executeImmediately = true;
                }
                lastCallTime = now;
            }
            var delta = now - lastCallTime;
            var waitLength = waitMS - delta;
            var maxWaitDelta = now - lastExecuteTime;
            var maxWaitExpired = false;
            if (maxWait !== null) {
                // maxWait only matters when there is a pending callback
                if (maxWaitDelta >= maxWait && timeoutId) {
                    maxWaitExpired = true;
                }
                else {
                    waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
                }
            }
            if (delta >= waitMS || maxWaitExpired || executeImmediately) {
                invokeFunction(now);
            }
            else if ((timeoutId === null || !userCall) && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        var pending = function () {
            return !!timeoutId;
        };
        var cancel = function () {
            if (pending()) {
                // Mark the debounced function as having executed
                markExecuted(new Date().getTime());
            }
        };
        var flush = function () {
            if (pending()) {
                invokeFunction(new Date().getTime());
            }
            return lastResult;
        };
        // tslint:disable-next-line:no-any
        var resultFunction = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        });
        resultFunction.cancel = cancel;
        resultFunction.flush = flush;
        resultFunction.pending = pending;
        return resultFunction;
    };
    Async.prototype.requestAnimationFrame = function (callback) {
        var _this = this;
        var animationFrameId = 0;
        if (!this._isDisposed) {
            if (!this._animationFrameIds) {
                this._animationFrameIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var animationFrameCallback = function () {
                try {
                    // Now delete the record and call the callback.
                    if (_this._animationFrameIds) {
                        delete _this._animationFrameIds[animationFrameId];
                    }
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            animationFrameId = window.requestAnimationFrame
                ? window.requestAnimationFrame(animationFrameCallback)
                : window.setTimeout(animationFrameCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._animationFrameIds[animationFrameId] = true;
        }
        return animationFrameId;
    };
    Async.prototype.cancelAnimationFrame = function (id) {
        if (this._animationFrameIds && this._animationFrameIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.cancelAnimationFrame ? window.cancelAnimationFrame(id) : window.clearTimeout(id);
            /* tslint:enable:ban-native-functions */
            delete this._animationFrameIds[id];
        }
    };
    // tslint:disable-next-line:no-any
    Async.prototype._logError = function (e) {
        if (this._onErrorHandler) {
            this._onErrorHandler(e);
        }
    };
    return Async;
}());

//# sourceMappingURL=Async.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/AutoScroll.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/AutoScroll.js ***!
  \************************************************************/
/*! exports provided: AutoScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoScroll", function() { return AutoScroll; });
/* harmony import */ var _EventGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventGroup */ "./node_modules/@uifabric/utilities/lib/EventGroup.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroll */ "./node_modules/@uifabric/utilities/lib/scroll.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");



var SCROLL_ITERATION_DELAY = 16;
var SCROLL_GUTTER_HEIGHT = 100;
var MAX_SCROLL_VELOCITY = 15;
/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 *
 * @public
 */
var AutoScroll = /** @class */ (function () {
    function AutoScroll(element) {
        this._events = new _EventGroup__WEBPACK_IMPORTED_MODULE_0__["EventGroup"](this);
        this._scrollableParent = Object(_scroll__WEBPACK_IMPORTED_MODULE_1__["findScrollableParent"])(element);
        this._incrementScroll = this._incrementScroll.bind(this);
        this._scrollRect = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["getRect"])(this._scrollableParent);
        // tslint:disable-next-line:no-any
        if (this._scrollableParent === window) {
            this._scrollableParent = document.body;
        }
        if (this._scrollableParent) {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'touchmove', this._onTouchMove, true);
        }
    }
    AutoScroll.prototype.dispose = function () {
        this._events.dispose();
        this._stopScroll();
    };
    AutoScroll.prototype._onMouseMove = function (ev) {
        this._computeScrollVelocity(ev.clientY);
    };
    AutoScroll.prototype._onTouchMove = function (ev) {
        if (ev.touches.length > 0) {
            this._computeScrollVelocity(ev.touches[0].clientY);
        }
    };
    AutoScroll.prototype._computeScrollVelocity = function (clientY) {
        if (!this._scrollRect) {
            return;
        }
        var scrollRectTop = this._scrollRect.top;
        var scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;
        if (clientY < scrollRectTop + SCROLL_GUTTER_HEIGHT) {
            this._scrollVelocity = Math.max(-MAX_SCROLL_VELOCITY, -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT));
        }
        else if (clientY > scrollClientBottom) {
            this._scrollVelocity = Math.min(MAX_SCROLL_VELOCITY, MAX_SCROLL_VELOCITY * ((clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT));
        }
        else {
            this._scrollVelocity = 0;
        }
        if (this._scrollVelocity) {
            this._startScroll();
        }
        else {
            this._stopScroll();
        }
    };
    AutoScroll.prototype._startScroll = function () {
        if (!this._timeoutId) {
            this._incrementScroll();
        }
    };
    AutoScroll.prototype._incrementScroll = function () {
        if (this._scrollableParent) {
            this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
        }
        this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
    };
    AutoScroll.prototype._stopScroll = function () {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            delete this._timeoutId;
        }
    };
    return AutoScroll;
}());

//# sourceMappingURL=AutoScroll.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/BaseComponent.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/BaseComponent.js ***!
  \***************************************************************/
/*! exports provided: BaseComponent, nullRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nullRender", function() { return nullRender; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Async */ "./node_modules/@uifabric/utilities/lib/Async.js");
/* harmony import */ var _EventGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventGroup */ "./node_modules/@uifabric/utilities/lib/EventGroup.js");
/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./warn */ "./node_modules/@uifabric/utilities/lib/warn.js");
/* harmony import */ var _initializeFocusRects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initializeFocusRects */ "./node_modules/@uifabric/utilities/lib/initializeFocusRects.js");
/* harmony import */ var _initializeDir__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./initializeDir */ "./node_modules/@uifabric/utilities/lib/initializeDir.js");







/**
 * BaseComponent class, which provides basic helpers for all components.
 *
 * @public
 */
var BaseComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BaseComponent, _super);
    // tslint:enable:variable-name
    /**
     * BaseComponent constructor
     * @param props - The props for the component.
     * @param context - The context for the component.
     */
    // tslint:disable-next-line:no-any
    function BaseComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        // Ensure basic assumptions about the environment.
        Object(_initializeFocusRects__WEBPACK_IMPORTED_MODULE_5__["initializeFocusRects"])();
        Object(_initializeDir__WEBPACK_IMPORTED_MODULE_6__["initializeDir"])();
        _makeAllSafe(_this, BaseComponent.prototype, [
            'componentWillMount',
            'componentDidMount',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentWillReceiveProps',
            'render',
            'componentDidUpdate',
            'componentWillUnmount'
        ]);
        return _this;
    }
    /**
     * When the component will receive props, make sure the componentRef is updated.
     */
    // tslint:disable-next-line:no-any
    BaseComponent.prototype.componentWillReceiveProps = function (newProps, newContext) {
        this._updateComponentRef(this.props, newProps);
    };
    /**
     * When the component has mounted, update the componentRef.
     */
    BaseComponent.prototype.componentDidMount = function () {
        this._setComponentRef(this.props.componentRef, this);
    };
    /**
     * If we have disposables, dispose them automatically on unmount.
     */
    BaseComponent.prototype.componentWillUnmount = function () {
        this._setComponentRef(this.props.componentRef, null);
        if (this.__disposables) {
            for (var i = 0, len = this._disposables.length; i < len; i++) {
                var disposable = this.__disposables[i];
                if (disposable.dispose) {
                    disposable.dispose();
                }
            }
            this.__disposables = null;
        }
    };
    Object.defineProperty(BaseComponent.prototype, "className", {
        /**
         * Gets the object's class name.
         */
        get: function () {
            if (!this.__className) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = funcNameRegex.exec(this.constructor.toString());
                this.__className = results && results.length > 1 ? results[1] : '';
            }
            return this.__className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_disposables", {
        /**
         * Allows subclasses to push things to this._disposables to be auto disposed.
         */
        get: function () {
            if (!this.__disposables) {
                this.__disposables = [];
            }
            return this.__disposables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_async", {
        /**
         * Gets the async instance associated with the component, created on demand. The async instance gives
         * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
         * will be cleared/ignored automatically after unmounting. The helpers within the async object also
         * preserve the this pointer so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__async) {
                this.__async = new _Async__WEBPACK_IMPORTED_MODULE_2__["Async"](this);
                this._disposables.push(this.__async);
            }
            return this.__async;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_events", {
        /**
         * Gets the event group instance assocaited with the component, created on demand. The event instance
         * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
         * will be automatically disconnected after unmounting. The helpers within the events object also
         * preserve the this reference so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__events) {
                this.__events = new _EventGroup__WEBPACK_IMPORTED_MODULE_3__["EventGroup"](this);
                this._disposables.push(this.__events);
            }
            return this.__events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to return a memoized ref resolver function.
     * @param refName - Name of the member to assign the ref to.
     * @returns A function instance keyed from the given refname.
     * @deprecated Use `createRef` from React.createRef.
     */
    BaseComponent.prototype._resolveRef = function (refName) {
        var _this = this;
        if (!this.__resolves) {
            this.__resolves = {};
        }
        if (!this.__resolves[refName]) {
            // tslint:disable-next-line:no-any
            this.__resolves[refName] = function (ref) {
                // tslint:disable-next-line:no-any
                return (_this[refName] = ref);
            };
        }
        return this.__resolves[refName];
    };
    /**
     * Updates the componentRef (by calling it with "this" when necessary.)
     */
    BaseComponent.prototype._updateComponentRef = function (currentProps, newProps) {
        if (newProps === void 0) { newProps = {}; }
        if (currentProps.componentRef !== newProps.componentRef) {
            this._setComponentRef(currentProps.componentRef, null);
            this._setComponentRef(newProps.componentRef, this);
        }
    };
    /**
     * Warns when a deprecated props are being used.
     *
     * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
     * either null or a replacement prop name.
     */
    BaseComponent.prototype._warnDeprecations = function (deprecationMap) {
        Object(_warn__WEBPACK_IMPORTED_MODULE_4__["warnDeprecations"])(this.className, this.props, deprecationMap);
    };
    /**
     * Warns when props which are mutually exclusive with each other are both used.
     *
     * @param mutuallyExclusiveMap - The map of mutually exclusive props.
     */
    BaseComponent.prototype._warnMutuallyExclusive = function (mutuallyExclusiveMap) {
        Object(_warn__WEBPACK_IMPORTED_MODULE_4__["warnMutuallyExclusive"])(this.className, this.props, mutuallyExclusiveMap);
    };
    /**
     * Warns when props are required if a condition is met.
     *
     * @param requiredProps - The name of the props that are required when the condition is met.
     * @param conditionalPropName - The name of the prop that the condition is based on.
     * @param condition - Whether the condition is met.
     */
    BaseComponent.prototype._warnConditionallyRequiredProps = function (requiredProps, conditionalPropName, condition) {
        Object(_warn__WEBPACK_IMPORTED_MODULE_4__["warnConditionallyRequiredProps"])(this.className, this.props, requiredProps, conditionalPropName, condition);
    };
    BaseComponent.prototype._setComponentRef = function (ref, value) {
        if (!this._skipComponentRefResolution && ref) {
            if (typeof ref === 'function') {
                ref(value);
            }
            if (typeof ref === 'object') {
                // tslint:disable:no-any
                ref.current = value;
            }
        }
    };
    return BaseComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj, prototype, methodNames) {
    for (var i = 0, len = methodNames.length; i < len; i++) {
        _makeSafe(obj, prototype, methodNames[i]);
    }
}
function _makeSafe(obj, prototype, methodName) {
    // tslint:disable:no-any
    var classMethod = obj[methodName];
    var prototypeMethod = prototype[methodName];
    // tslint:enable:no-any
    if (classMethod || prototypeMethod) {
        // tslint:disable-next-line:no-any
        obj[methodName] = function () {
            var retVal;
            if (prototypeMethod) {
                retVal = prototypeMethod.apply(this, arguments);
            }
            if (classMethod !== prototypeMethod) {
                retVal = classMethod.apply(this, arguments);
            }
            return retVal;
        };
    }
}
/**
 * Simple constant function for returning null, used to render empty templates in JSX.
 *
 * @public
 */
function nullRender() {
    return null;
}
//# sourceMappingURL=BaseComponent.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/Context.js":
/*!*********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/Context.js ***!
  \*********************************************************/
/*! exports provided: provideContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideContext", function() { return provideContext; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function provideContext(contextTypes, mapPropsToContext) {
    var Provider = /** @class */ (function (_super) {
        tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Provider, _super);
        function Provider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Provider.prototype.getChildContext = function () {
            return mapPropsToContext(this.props);
        };
        Provider.prototype.render = function () {
            return react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(this.props.children);
        };
        Provider.childContextTypes = contextTypes;
        return Provider;
    }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
    return Provider;
}
//# sourceMappingURL=Context.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/Customizations.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/Customizations.js ***!
  \****************************************************************/
/*! exports provided: Customizations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Customizations", function() { return Customizations; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _GlobalSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalSettings */ "./node_modules/@uifabric/utilities/lib/GlobalSettings.js");
/* harmony import */ var _EventGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventGroup */ "./node_modules/@uifabric/utilities/lib/EventGroup.js");



var CustomizationsGlobalKey = 'customizations';
var NO_CUSTOMIZATIONS = { settings: {}, scopedSettings: {} };
var _allSettings = _GlobalSettings__WEBPACK_IMPORTED_MODULE_1__["GlobalSettings"].getValue(CustomizationsGlobalKey, {
    settings: {},
    scopedSettings: {}
});
var _events = new _EventGroup__WEBPACK_IMPORTED_MODULE_2__["EventGroup"](_allSettings);
var Customizations = /** @class */ (function () {
    function Customizations() {
    }
    Customizations.reset = function () {
        _allSettings.settings = {};
        _allSettings.scopedSettings = {};
    };
    // tslint:disable-next-line:no-any
    Customizations.applySettings = function (settings) {
        _allSettings.settings = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _allSettings.settings, settings);
        Customizations._raiseChange();
    };
    // tslint:disable-next-line:no-any
    Customizations.applyScopedSettings = function (scopeName, settings) {
        _allSettings.scopedSettings[scopeName] = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _allSettings.scopedSettings[scopeName], settings);
        Customizations._raiseChange();
    };
    Customizations.getSettings = function (properties, scopeName, localSettings
    // tslint:disable-next-line:no-any
    ) {
        if (localSettings === void 0) { localSettings = NO_CUSTOMIZATIONS; }
        // tslint:disable-next-line:no-any
        var settings = {};
        var localScopedSettings = (scopeName && localSettings.scopedSettings[scopeName]) || {};
        var globalScopedSettings = (scopeName && _allSettings.scopedSettings[scopeName]) || {};
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            settings[property] =
                localScopedSettings[property] ||
                    localSettings.settings[property] ||
                    globalScopedSettings[property] ||
                    _allSettings.settings[property];
        }
        return settings;
    };
    Customizations.observe = function (onChange) {
        _events.on(_allSettings, 'change', onChange);
    };
    Customizations.unobserve = function (onChange) {
        _events.off(_allSettings, 'change', onChange);
    };
    Customizations._raiseChange = function () {
        _events.raise('change');
    };
    return Customizations;
}());

//# sourceMappingURL=Customizations.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/Customizer.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/Customizer.js ***!
  \************************************************************/
/*! exports provided: CustomizerContext, Customizer, mergeCustomizations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomizerContext", function() { return CustomizerContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Customizer", function() { return Customizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeCustomizations", function() { return mergeCustomizations; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseComponent */ "./node_modules/@uifabric/utilities/lib/BaseComponent.js");
/* harmony import */ var _Customizations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Customizations */ "./node_modules/@uifabric/utilities/lib/Customizations.js");




var CustomizerContext = react__WEBPACK_IMPORTED_MODULE_1__["createContext"]({
    customizations: {
        settings: {},
        scopedSettings: {}
    }
});
/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator, or use the styled HOC. This enables
 * injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop which should be one of the following:
 * - A json map which contains 1 or more name/value pairs representing injectable props.
 * - A function that receives the current settings and returns the new ones that apply to the scope
 *
 * @public
 */
var Customizer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Customizer, _super);
    function Customizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onCustomizationChange = function () { return _this.forceUpdate(); };
        return _this;
    }
    Customizer.prototype.componentDidMount = function () {
        _Customizations__WEBPACK_IMPORTED_MODULE_3__["Customizations"].observe(this._onCustomizationChange);
    };
    Customizer.prototype.componentWillUnmount = function () {
        _Customizations__WEBPACK_IMPORTED_MODULE_3__["Customizations"].unobserve(this._onCustomizationChange);
    };
    Customizer.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](CustomizerContext.Consumer, null, function (parentContext) {
            var newContext = mergeCustomizations(_this.props, parentContext);
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](CustomizerContext.Provider, { value: newContext }, _this.props.children);
        }));
    };
    return Customizer;
}(_BaseComponent__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

function mergeCustomizations(props, parentContext) {
    var _a = (parentContext || {}).customizations, customizations = _a === void 0 ? { settings: {}, scopedSettings: {} } : _a;
    return {
        customizations: {
            settings: mergeSettings(customizations.settings, props.settings),
            scopedSettings: mergeScopedSettings(customizations.scopedSettings, props.scopedSettings)
        }
    };
}
function mergeSettings(oldSettings, newSettings) {
    if (oldSettings === void 0) { oldSettings = {}; }
    var mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : settingsMergeWith(newSettings);
    return mergeSettingsWith(oldSettings);
}
function mergeScopedSettings(oldSettings, newSettings) {
    if (oldSettings === void 0) { oldSettings = {}; }
    var mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : scopedSettingsMergeWith(newSettings);
    return mergeSettingsWith(oldSettings);
}
function isSettingsFunction(settings) {
    return typeof settings === 'function';
}
function settingsMergeWith(newSettings) {
    return function (settings) { return (newSettings ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, settings, newSettings) : settings); };
}
function scopedSettingsMergeWith(scopedSettingsFromProps) {
    if (scopedSettingsFromProps === void 0) { scopedSettingsFromProps = {}; }
    return function (oldScopedSettings) {
        var newScopedSettings = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, oldScopedSettings);
        for (var scopeName in scopedSettingsFromProps) {
            if (scopedSettingsFromProps.hasOwnProperty(scopeName)) {
                newScopedSettings[scopeName] = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, oldScopedSettings[scopeName], scopedSettingsFromProps[scopeName]);
            }
        }
        return newScopedSettings;
    };
}
//# sourceMappingURL=Customizer.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/DelayedRender.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/DelayedRender.js ***!
  \***************************************************************/
/*! exports provided: DelayedRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayedRender", function() { return DelayedRender; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @public
 */
var DelayedRender = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DelayedRender, _super);
    function DelayedRender(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRendered: false
        };
        return _this;
    }
    DelayedRender.prototype.componentDidMount = function () {
        var _this = this;
        var delay = this.props.delay;
        this._timeoutId = setTimeout(function () {
            _this.setState({
                isRendered: true
            });
        }, delay);
    };
    DelayedRender.prototype.componentWillUnmount = function () {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    };
    DelayedRender.prototype.render = function () {
        return this.state.isRendered ? react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(this.props.children) : null;
    };
    DelayedRender.defaultProps = {
        delay: 0
    };
    return DelayedRender;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=DelayedRender.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/EventGroup.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/EventGroup.js ***!
  \************************************************************/
/*! exports provided: EventGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventGroup", function() { return EventGroup; });
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "./node_modules/@uifabric/utilities/lib/object.js");
/* tslint:disable:no-string-literal */

/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 *
 * @public
 */
var EventGroup = /** @class */ (function () {
    /** parent: the context in which events attached to non-HTMLElements are called */
    // tslint:disable-next-line:no-any
    function EventGroup(parent) {
        this._id = EventGroup._uniqueId++;
        this._parent = parent;
        this._eventRecords = [];
    }
    /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
     *  Events raised here by default have bubbling set to false and cancelable set to true.
     *  This applies also to built-in events being raised manually here on HTMLElements,
     *  which may lead to unexpected behavior if it differs from the defaults.
     *
     */
    EventGroup.raise = function (
    // tslint:disable-next-line:no-any
    target, eventName, 
    // tslint:disable-next-line:no-any
    eventArgs, bubbleEvent) {
        var retVal;
        if (EventGroup._isElement(target)) {
            if (document.createEvent) {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, bubbleEvent || false, true);
                Object(_object__WEBPACK_IMPORTED_MODULE_0__["assign"])(ev, eventArgs);
                retVal = target.dispatchEvent(ev);
                // tslint:disable-next-line:no-any
            }
            else if (document['createEventObject']) {
                // IE8
                // tslint:disable-next-line:no-any
                var evObj = document['createEventObject'](eventArgs);
                // cannot set cancelBubble on evObj, fireEvent will overwrite it
                target.fireEvent('on' + eventName, evObj);
            }
        }
        else {
            while (target && retVal !== false) {
                var events = target.__events__;
                var eventRecords = events ? events[eventName] : null;
                if (eventRecords) {
                    for (var id in eventRecords) {
                        if (eventRecords.hasOwnProperty(id)) {
                            var eventRecordList = eventRecords[id];
                            for (var listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                                var record = eventRecordList[listIndex];
                                if (record.objectCallback) {
                                    retVal = record.objectCallback.call(record.parent, eventArgs);
                                }
                            }
                        }
                    }
                }
                // If the target has a parent, bubble the event up.
                target = bubbleEvent ? target.parent : null;
            }
        }
        return retVal;
    };
    // tslint:disable-next-line:no-any
    EventGroup.isObserved = function (target, eventName) {
        var events = target && target.__events__;
        return !!events && !!events[eventName];
    };
    /** Check to see if the target has declared support of the given event. */
    // tslint:disable-next-line:no-any
    EventGroup.isDeclared = function (target, eventName) {
        var declaredEvents = target && target.__declaredEvents;
        return !!declaredEvents && !!declaredEvents[eventName];
    };
    // tslint:disable-next-line:no-any
    EventGroup.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            // IE8
            event.cancelBubble = true;
        }
    };
    EventGroup._isElement = function (target) {
        return (!!target && (!!target.addEventListener || (typeof HTMLElement !== 'undefined' && target instanceof HTMLElement)));
    };
    EventGroup.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._isDisposed = true;
            this.off();
            this._parent = null;
        }
    };
    /** On the target, attach a set of events, where the events object is a name to function mapping. */
    // tslint:disable-next-line:no-any
    EventGroup.prototype.onAll = function (target, events, useCapture) {
        for (var eventName in events) {
            if (events.hasOwnProperty(eventName)) {
                this.on(target, eventName, events[eventName], useCapture);
            }
        }
    };
    /** On the target, attach an event whose handler will be called in the context of the parent
     * of this instance of EventGroup.
     */
    // tslint:disable-next-line:no-any
    EventGroup.prototype.on = function (target, eventName, callback, useCapture) {
        var _this = this;
        if (eventName.indexOf(',') > -1) {
            var events = eventName.split(/[ ,]+/);
            for (var i = 0; i < events.length; i++) {
                this.on(target, events[i], callback, useCapture);
            }
        }
        else {
            var parent_1 = this._parent;
            var eventRecord = {
                target: target,
                eventName: eventName,
                parent: parent_1,
                callback: callback,
                useCapture: useCapture || false
            };
            // Initialize and wire up the record on the target, so that it can call the callback if the event fires.
            var events = (target.__events__ = target.__events__ || {});
            events[eventName] =
                events[eventName] ||
                    {
                        count: 0
                    };
            events[eventName][this._id] = events[eventName][this._id] || [];
            events[eventName][this._id].push(eventRecord);
            events[eventName].count++;
            if (EventGroup._isElement(target)) {
                // tslint:disable-next-line:no-any
                var processElementEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    var result;
                    try {
                        result = callback.apply(parent_1, args);
                        if (result === false && args[0]) {
                            var e = args[0];
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                        }
                    }
                    catch (e) {
                        /* ErrorHelper.log(e); */
                    }
                    return result;
                };
                eventRecord.elementCallback = processElementEvent;
                if (target.addEventListener) {
                    /* tslint:disable:ban-native-functions */
                    target.addEventListener(eventName, processElementEvent, useCapture);
                    /* tslint:enable:ban-native-functions */
                }
                else if (target.attachEvent) {
                    // IE8
                    target.attachEvent('on' + eventName, processElementEvent);
                }
            }
            else {
                // tslint:disable-next-line:no-any
                var processObjectEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    return callback.apply(parent_1, args);
                };
                eventRecord.objectCallback = processObjectEvent;
            }
            // Remember the record locally, so that it can be removed.
            this._eventRecords.push(eventRecord);
        }
    };
    // tslint:disable-next-line:no-any
    EventGroup.prototype.off = function (target, eventName, callback, useCapture) {
        for (var i = 0; i < this._eventRecords.length; i++) {
            var eventRecord = this._eventRecords[i];
            if ((!target || target === eventRecord.target) &&
                (!eventName || eventName === eventRecord.eventName) &&
                (!callback || callback === eventRecord.callback) &&
                (typeof useCapture !== 'boolean' || useCapture === eventRecord.useCapture)) {
                var events = eventRecord.target.__events__;
                var targetArrayLookup = events[eventRecord.eventName];
                var targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null;
                // We may have already target's entries, so check for null.
                if (targetArray) {
                    if (targetArray.length === 1 || !callback) {
                        targetArrayLookup.count -= targetArray.length;
                        delete events[eventRecord.eventName][this._id];
                    }
                    else {
                        targetArrayLookup.count--;
                        targetArray.splice(targetArray.indexOf(eventRecord), 1);
                    }
                    if (!targetArrayLookup.count) {
                        delete events[eventRecord.eventName];
                    }
                }
                if (eventRecord.elementCallback) {
                    if (eventRecord.target.removeEventListener) {
                        eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.useCapture);
                    }
                    else if (eventRecord.target.detachEvent) {
                        // IE8
                        eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
                    }
                }
                this._eventRecords.splice(i--, 1);
            }
        }
    };
    /** Trigger the given event in the context of this instance of EventGroup. */
    // tslint:disable-next-line:no-any
    EventGroup.prototype.raise = function (eventName, eventArgs, bubbleEvent) {
        return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
    };
    /** Declare an event as being supported by this instance of EventGroup. */
    EventGroup.prototype.declare = function (event) {
        var declaredEvents = (this._parent.__declaredEvents = this._parent.__declaredEvents || {});
        if (typeof event === 'string') {
            declaredEvents[event] = true;
        }
        else {
            for (var i = 0; i < event.length; i++) {
                declaredEvents[event[i]] = true;
            }
        }
    };
    // tslint:disable-next-line:no-inferrable-types
    EventGroup._uniqueId = 0;
    return EventGroup;
}());

//# sourceMappingURL=EventGroup.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/FabricPerformance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/FabricPerformance.js ***!
  \*******************************************************************/
/*! exports provided: FabricPerformance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FabricPerformance", function() { return FabricPerformance; });
var now = function () {
    return typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now();
};
var RESET_INTERVAL = 3 * 60 * 1000; // auto reset every 3 minutes
/**
 * Performance helper class for measuring things.
 *
 * @public
 */
var FabricPerformance = /** @class */ (function () {
    function FabricPerformance() {
    }
    /**
     * Measures execution time of the given syncronous function. If the same logic is executed multiple times,
     * each individual measurement will be collected as well the overall numbers.
     * @param name - The name of this measurement
     * @param func - The logic to be measured for execution time
     */
    FabricPerformance.measure = function (name, func) {
        if (FabricPerformance._timeoutId) {
            FabricPerformance.setPeriodicReset();
        }
        var start = now();
        func();
        var end = now();
        var measurement = FabricPerformance.summary[name] || {
            totalDuration: 0,
            count: 0,
            all: []
        };
        var duration = end - start;
        measurement.totalDuration += duration;
        measurement.count++;
        measurement.all.push({
            duration: duration,
            timeStamp: end
        });
        FabricPerformance.summary[name] = measurement;
    };
    FabricPerformance.reset = function () {
        FabricPerformance.summary = {};
        clearTimeout(FabricPerformance._timeoutId);
        FabricPerformance._timeoutId = NaN;
    };
    FabricPerformance.setPeriodicReset = function () {
        FabricPerformance._timeoutId = setTimeout(function () { return FabricPerformance.reset(); }, RESET_INTERVAL);
    };
    FabricPerformance.summary = {};
    return FabricPerformance;
}());

//# sourceMappingURL=FabricPerformance.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/GlobalSettings.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/GlobalSettings.js ***!
  \****************************************************************/
/*! exports provided: GlobalSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalSettings", function() { return GlobalSettings; });
/**
 * Storing global state in local module variables has issues when more than one copy
 * if the module gets loaded on the page (due to a bundling error or simply by consuming
 * a prebundled script.)
 *
 * This file contains helpers to deal with the getting and setting local state, and allows
 * callers to get called back when it mutates.
 */
var GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
var CALLBACK_STATE_PROP_NAME = '__callbacks__';
// tslint:disable-next-line:no-any
var _global;
var _counter = 0;
if (typeof window !== 'undefined') {
    _global = window;
}
else if (typeof global !== 'undefined') {
    _global = global;
}
else {
    _global = {};
}
// tslint:disable-next-line:no-any
var _globalSettings = (_global[GLOBAL_SETTINGS_PROP_NAME] = _global[GLOBAL_SETTINGS_PROP_NAME] || (_a = {},
    _a[CALLBACK_STATE_PROP_NAME] = {},
    _a));
var _callbacks = _globalSettings[CALLBACK_STATE_PROP_NAME];
/**
 * Global settings helper, which stores settings in the global (window) namespace.
 * If window is not provided, it will store settings in module scope. Provides a
 * way to observe changes as well when their values change.
 *
 * @public
 */
var GlobalSettings = /** @class */ (function () {
    function GlobalSettings() {
    }
    GlobalSettings.getValue = function (key, defaultValue) {
        if (_globalSettings[key] === undefined) {
            _globalSettings[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }
        return _globalSettings[key];
    };
    GlobalSettings.setValue = function (key, value) {
        var oldValue = _globalSettings[key];
        if (value !== oldValue) {
            _globalSettings[key] = value;
            var changeDescription = {
                oldValue: oldValue,
                value: value,
                key: key
            };
            for (var id in _callbacks) {
                if (_callbacks.hasOwnProperty(id)) {
                    _callbacks[id](changeDescription);
                }
            }
        }
        return value;
    };
    GlobalSettings.addChangeListener = function (cb) {
        // Note: we use generated ids on the callbacks to create a map of the callbacks, which optimizes removal.
        // (It's faster to delete a key than it is to look up the index of an object and splice an array.)
        var id = cb.__id__;
        if (!id) {
            id = cb.__id__ = String(_counter++);
        }
        _callbacks[id] = cb;
    };
    GlobalSettings.removeChangeListener = function (cb) {
        delete _callbacks[cb.__id__];
    };
    return GlobalSettings;
}());

var _a;
//# sourceMappingURL=GlobalSettings.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/KeyCodes.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/KeyCodes.js ***!
  \**********************************************************/
/*! exports provided: KeyCodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/**
 * Const enum for keycodes.
 *
 * @public
 */
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["shift"] = 16] = "shift";
    KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
    KeyCodes[KeyCodes["alt"] = 18] = "alt";
    KeyCodes[KeyCodes["pauseBreak"] = 19] = "pauseBreak";
    KeyCodes[KeyCodes["capslock"] = 20] = "capslock";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["space"] = 32] = "space";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["left"] = 37] = "left";
    KeyCodes[KeyCodes["up"] = 38] = "up";
    KeyCodes[KeyCodes["right"] = 39] = "right";
    KeyCodes[KeyCodes["down"] = 40] = "down";
    KeyCodes[KeyCodes["insert"] = 45] = "insert";
    KeyCodes[KeyCodes["del"] = 46] = "del";
    KeyCodes[KeyCodes["zero"] = 48] = "zero";
    KeyCodes[KeyCodes["one"] = 49] = "one";
    KeyCodes[KeyCodes["two"] = 50] = "two";
    KeyCodes[KeyCodes["three"] = 51] = "three";
    KeyCodes[KeyCodes["four"] = 52] = "four";
    KeyCodes[KeyCodes["five"] = 53] = "five";
    KeyCodes[KeyCodes["six"] = 54] = "six";
    KeyCodes[KeyCodes["seven"] = 55] = "seven";
    KeyCodes[KeyCodes["eight"] = 56] = "eight";
    KeyCodes[KeyCodes["nine"] = 57] = "nine";
    KeyCodes[KeyCodes["a"] = 65] = "a";
    KeyCodes[KeyCodes["b"] = 66] = "b";
    KeyCodes[KeyCodes["c"] = 67] = "c";
    KeyCodes[KeyCodes["d"] = 68] = "d";
    KeyCodes[KeyCodes["e"] = 69] = "e";
    KeyCodes[KeyCodes["f"] = 70] = "f";
    KeyCodes[KeyCodes["g"] = 71] = "g";
    KeyCodes[KeyCodes["h"] = 72] = "h";
    KeyCodes[KeyCodes["i"] = 73] = "i";
    KeyCodes[KeyCodes["j"] = 74] = "j";
    KeyCodes[KeyCodes["k"] = 75] = "k";
    KeyCodes[KeyCodes["l"] = 76] = "l";
    KeyCodes[KeyCodes["m"] = 77] = "m";
    KeyCodes[KeyCodes["n"] = 78] = "n";
    KeyCodes[KeyCodes["o"] = 79] = "o";
    KeyCodes[KeyCodes["p"] = 80] = "p";
    KeyCodes[KeyCodes["q"] = 81] = "q";
    KeyCodes[KeyCodes["r"] = 82] = "r";
    KeyCodes[KeyCodes["s"] = 83] = "s";
    KeyCodes[KeyCodes["t"] = 84] = "t";
    KeyCodes[KeyCodes["u"] = 85] = "u";
    KeyCodes[KeyCodes["v"] = 86] = "v";
    KeyCodes[KeyCodes["w"] = 87] = "w";
    KeyCodes[KeyCodes["x"] = 88] = "x";
    KeyCodes[KeyCodes["y"] = 89] = "y";
    KeyCodes[KeyCodes["z"] = 90] = "z";
    KeyCodes[KeyCodes["leftWindow"] = 91] = "leftWindow";
    KeyCodes[KeyCodes["rightWindow"] = 92] = "rightWindow";
    KeyCodes[KeyCodes["select"] = 93] = "select";
    KeyCodes[KeyCodes["zero_numpad"] = 96] = "zero_numpad";
    KeyCodes[KeyCodes["one_numpad"] = 97] = "one_numpad";
    KeyCodes[KeyCodes["two_numpad"] = 98] = "two_numpad";
    KeyCodes[KeyCodes["three_numpad"] = 99] = "three_numpad";
    KeyCodes[KeyCodes["four_numpad"] = 100] = "four_numpad";
    KeyCodes[KeyCodes["five_numpad"] = 101] = "five_numpad";
    KeyCodes[KeyCodes["six_numpad"] = 102] = "six_numpad";
    KeyCodes[KeyCodes["seven_numpad"] = 103] = "seven_numpad";
    KeyCodes[KeyCodes["eight_numpad"] = 104] = "eight_numpad";
    KeyCodes[KeyCodes["nine_numpad"] = 105] = "nine_numpad";
    KeyCodes[KeyCodes["multiply"] = 106] = "multiply";
    KeyCodes[KeyCodes["add"] = 107] = "add";
    KeyCodes[KeyCodes["subtract"] = 109] = "subtract";
    KeyCodes[KeyCodes["decimalPoint"] = 110] = "decimalPoint";
    KeyCodes[KeyCodes["divide"] = 111] = "divide";
    KeyCodes[KeyCodes["f1"] = 112] = "f1";
    KeyCodes[KeyCodes["f2"] = 113] = "f2";
    KeyCodes[KeyCodes["f3"] = 114] = "f3";
    KeyCodes[KeyCodes["f4"] = 115] = "f4";
    KeyCodes[KeyCodes["f5"] = 116] = "f5";
    KeyCodes[KeyCodes["f6"] = 117] = "f6";
    KeyCodes[KeyCodes["f7"] = 118] = "f7";
    KeyCodes[KeyCodes["f8"] = 119] = "f8";
    KeyCodes[KeyCodes["f9"] = 120] = "f9";
    KeyCodes[KeyCodes["f10"] = 121] = "f10";
    KeyCodes[KeyCodes["f11"] = 122] = "f11";
    KeyCodes[KeyCodes["f12"] = 123] = "f12";
    KeyCodes[KeyCodes["numlock"] = 144] = "numlock";
    KeyCodes[KeyCodes["scrollLock"] = 145] = "scrollLock";
    KeyCodes[KeyCodes["semicolon"] = 186] = "semicolon";
    KeyCodes[KeyCodes["equalSign"] = 187] = "equalSign";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["dash"] = 189] = "dash";
    KeyCodes[KeyCodes["period"] = 190] = "period";
    KeyCodes[KeyCodes["forwardSlash"] = 191] = "forwardSlash";
    KeyCodes[KeyCodes["graveAccent"] = 192] = "graveAccent";
    KeyCodes[KeyCodes["openBracket"] = 219] = "openBracket";
    KeyCodes[KeyCodes["backSlash"] = 220] = "backSlash";
    KeyCodes[KeyCodes["closeBracket"] = 221] = "closeBracket";
    KeyCodes[KeyCodes["singleQuote"] = 222] = "singleQuote";
})(KeyCodes || (KeyCodes = {}));
//# sourceMappingURL=KeyCodes.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/Rectangle.js":
/*!***********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/Rectangle.js ***!
  \***********************************************************/
/*! exports provided: Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/**
 * Rectangle helper class.
 *
 * @public
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(left, right, top, bottom) {
        if (left === void 0) { left = 0; }
        if (right === void 0) { right = 0; }
        if (top === void 0) { top = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        /**
         * Calculated automatically by subtracting the right from left
         */
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        /**
         * Calculated automatically by subtracting the bottom from top.
         */
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
     */
    Rectangle.prototype.equals = function (rect) {
        // I'm fixing it to 4 decimal places because it allows enough precision and will handle cases when something should be rounded,
        // like .999999 should round to 1.
        return (parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) &&
            parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) &&
            parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) &&
            parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4)));
    };
    return Rectangle;
}());

//# sourceMappingURL=Rectangle.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/aria.js":
/*!******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/aria.js ***!
  \******************************************************/
/*! exports provided: mergeAriaAttributeValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeAriaAttributeValues", function() { return mergeAriaAttributeValues; });
/**
 * ARIA helper to concatenate attributes, returning undefined if all attributes
 * are undefined. (Empty strings are not a valid ARIA attribute value.)
 *
 * NOTE: This function will NOT insert whitespace between provided attributes.
 *
 * @param ariaAttributes - ARIA attributes to merge
 */
function mergeAriaAttributeValues() {
    var ariaAttributes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ariaAttributes[_i] = arguments[_i];
    }
    var mergedAttribute = ariaAttributes
        .filter(function (arg) { return arg !== undefined && arg !== null; })
        .join('');
    return mergedAttribute === '' ? undefined : mergedAttribute;
}
//# sourceMappingURL=aria.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/array.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/array.js ***!
  \*******************************************************/
/*! exports provided: findIndex, find, createArray, toMatrix, removeIndex, replaceElement, addElementAtIndex, flatten, arraysEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArray", function() { return createArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMatrix", function() { return toMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeIndex", function() { return removeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceElement", function() { return replaceElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addElementAtIndex", function() { return addElementAtIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 */
function findIndex(array, cb) {
    var index = -1;
    for (var i = 0; array && i < array.length; i++) {
        if (cb(array[i], i)) {
            index = i;
            break;
        }
    }
    return index;
}
/**
 * Helper to find the first item within an array that satisfies the callback.
 * @param array - Array to search
 * @param cb - Callback which returns true on matches
 */
function find(array, cb) {
    var index = findIndex(array, cb);
    if (index < 0) {
        return undefined;
    }
    return array[index];
}
/**
 * Creates an array of a given size and helper method to populate.
 *
 * @public
 * @param size - Size of array.
 * @param getItem - Callback to populate given cell index.
 */
function createArray(size, getItem) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(getItem(i));
    }
    return array;
}
/**
 * Convert the given array to a matrix with columnCount number
 * of columns.
 *
 * @public
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns A matrix of items
 */
function toMatrix(items, columnCount) {
    return items.reduce(function (rows, currentValue, index) {
        if (index % columnCount === 0) {
            rows.push([currentValue]);
        }
        else {
            rows[rows.length - 1].push(currentValue);
        }
        return rows;
    }, []);
}
/**
 * Given an array, it returns a new array that does not contain the item at the given index.
 * @param array - The array to operate on
 * @param index - The index of the element to remove
 */
function removeIndex(array, index) {
    return array.filter(function (_, i) { return index !== i; });
}
/**
 * Given an array, this function returns a new array where the element at a given index has been replaced.
 * @param array - The array to operate on
 * @param newElement - The element that will be placed in the new array
 * @param index - The index of the element that should be replaced
 */
function replaceElement(array, newElement, index) {
    var copy = array.slice();
    copy[index] = newElement;
    return copy;
}
/**
 * Given an array, this function returns a new array where an element has been inserted at the given index.
 * @param array - The array to operate on
 * @param index - The index where an element should be inserted
 * @param itemToAdd - The element to insert
 */
function addElementAtIndex(array, index, itemToAdd) {
    var copy = array.slice();
    copy.splice(index, 0, itemToAdd);
    return copy;
}
/**
 * Given an array where each element is of type T or T[], flatten it into an array of T
 * @param array - The array where each element can optionally also be an array
 */
function flatten(array) {
    var result = [];
    array.forEach(function (item) { return (result = result.concat(item)); });
    return result;
}
/**
 * Returns a boolean indicating if the two given arrays are equal in length and values.
 *
 * @param array1 - First array to compare
 * @param array2 - Second array to compare
 * @returns True if the arrays are the same length and have the same values in the same positions, false otherwise.
 */
function arraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/asAsync.js":
/*!*********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/asAsync.js ***!
  \*********************************************************/
/*! exports provided: asAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asAsync", function() { return asAsync; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/**
 * asAsync - a HOC for async loading components.
 *
 * Usage:
 *
 * const AsyncDialog = asAsync({
 *   load: () => import('Dialog').then(result => result.default),
 * });
 *
 * React.render(domElement, <AsyncDialog asyncPlaceholder={ () => <Spinner/> } { ...dialogProps } />);
 *
 * Note the `asyncPlaceholder` prop will be respected when rendering the async component and it hasn't
 * been loaded yet.
 */


/**
 * If possible, use a WeakMap to maintain a cache of loaded components.
 * This can be used to synchronously render components that have already been loaded,
 * rather than having to wait for at least one async tick.
 */
var _syncModuleCache = typeof WeakMap !== 'undefined'
    ? // tslint:disable-next-line:no-any
        new WeakMap()
    : undefined;
/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a module with a default export for the component.
 */
function asAsync(options) {
    var Async = /** @class */ (function (_super) {
        tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Async, _super);
        function Async() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                Component: _syncModuleCache ? _syncModuleCache.get(options.load) : undefined
            };
            return _this;
        }
        Async.prototype.render = function () {
            // Typescript issue: the rest can't be pulled without the any cast, as TypeScript fails with rest on generics.
            // tslint:disable-next-line:no-any
            var _a = this.props, forwardedRef = _a.forwardedRef, Placeholder = _a.asyncPlaceholder, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["forwardedRef", "asyncPlaceholder"]);
            var Component = this.state.Component;
            return Component ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Component, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: forwardedRef }, rest)) : Placeholder ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Placeholder, null) : null;
        };
        Async.prototype.componentDidMount = function () {
            var _this = this;
            var Component = this.state.Component;
            if (!Component) {
                options
                    .load()
                    .then(function (LoadedComponent) {
                    if (LoadedComponent) {
                        // Cache component for future reference.
                        _syncModuleCache && _syncModuleCache.set(options.load, LoadedComponent);
                        // Set state.
                        _this.setState({
                            Component: LoadedComponent
                        }, options.onLoad);
                    }
                })
                    .catch(options.onError);
            }
        };
        return Async;
    }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
    return react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Async, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { forwardedRef: ref }))); });
}
//# sourceMappingURL=asAsync.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/assertNever.js":
/*!*************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/assertNever.js ***!
  \*************************************************************/
/*! exports provided: assertNever */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertNever", function() { return assertNever; });
/**
 * AssertNever is a utility function that can be used for exhaustiveness checks in switch statements.
 *
 * @public
 */
function assertNever(x) {
    throw new Error('Unexpected object: ' + x);
}
//# sourceMappingURL=assertNever.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/autobind.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/autobind.js ***!
  \**********************************************************/
/*! exports provided: autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 * @deprecated This has been deprecated in favor of using arrow function properties
 */
function autobind(
// tslint:disable-next-line:no-any
target, key, descriptor) {
    var fn = descriptor.value;
    var defining = false;
    return {
        configurable: true,
        get: function () {
            if (defining || (fn && this === fn.prototype) || this.hasOwnProperty(key)) {
                return fn;
            }
            // Bind method only once, and update the property to return the bound value from now on
            var fnBound = fn && fn.bind(this);
            defining = true;
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: fnBound
            });
            defining = false;
            return fnBound;
        },
        // tslint:disable-next-line:no-any
        set: function (newValue) {
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: newValue
            });
        }
    };
}
//# sourceMappingURL=autobind.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/classNamesFunction.js":
/*!********************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/classNamesFunction.js ***!
  \********************************************************************/
/*! exports provided: classNamesFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classNamesFunction", function() { return classNamesFunction; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
function classNamesFunction() {
    // TODO: memoize.
    var getClassNames = function (styleFunctionOrObject, styleProps) {
        if (styleProps === void 0) { styleProps = {}; }
        // styleSet might be undefined if styleFunctionOrObject is undefined, but getStyles should never
        // ordinarily be undefined (it would hardly make any sense).
        // However, because we usually use `props.styles` as the argument to an invocation of this method, and
        // `props.styles` itself is defined as optional, this avoids the need to use `!` at all invocation points.
        if (styleFunctionOrObject === undefined) {
            return {};
        }
        var styleSet = styleFunctionOrObject &&
            (typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject);
        return Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["mergeStyleSets"])(styleSet);
    };
    return getClassNames;
}
//# sourceMappingURL=classNamesFunction.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/createRef.js":
/*!***********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/createRef.js ***!
  \***********************************************************/
/*! exports provided: createRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
/**
 * @deprecated Use React.createRef.
 * May be removed in 6 months (Jan '19).
 */
function createRef() {
    var refObject = (function (element) {
        refObject.current = element;
    });
    // This getter is here to support the deprecated value prop on the refObject.
    Object.defineProperty(refObject, 'value', {
        get: function () {
            return refObject.current;
        }
    });
    refObject.current = null;
    return refObject;
}
//# sourceMappingURL=createRef.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/css.js":
/*!*****************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/css.js ***!
  \*****************************************************/
/*! exports provided: css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
function css() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (arg) {
            if (typeof arg === 'string') {
                classes.push(arg);
            }
            else if (arg.hasOwnProperty('toString') && typeof arg.toString === 'function') {
                classes.push(arg.toString());
            }
            else {
                // tslint:disable-next-line:no-any
                for (var key in arg) {
                    // tslint:disable-next-line:no-any
                    if (arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}
//# sourceMappingURL=css.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/customizable.js":
/*!**************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/customizable.js ***!
  \**************************************************************/
/*! exports provided: customizable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customizable", function() { return customizable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Customizations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Customizations */ "./node_modules/@uifabric/utilities/lib/Customizations.js");
/* harmony import */ var _hoistStatics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hoistStatics */ "./node_modules/@uifabric/utilities/lib/hoistStatics.js");
/* harmony import */ var _Customizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Customizer */ "./node_modules/@uifabric/utilities/lib/Customizer.js");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");






function customizable(scope, fields, concatStyles
// tslint:disable-next-line:no-any
) {
    // tslint:disable-next-line:no-shadowed-variable
    return function customizableFactory(
    // tslint:disable-next-line:no-any
    ComposedComponent
    // tslint:disable-next-line:no-any
    ) {
        var resultClass = (_a = /** @class */ (function (_super) {
                tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ComponentWithInjectedProps, _super);
                // tslint:disable-next-line:no-any
                function ComponentWithInjectedProps(props) {
                    var _this = _super.call(this, props) || this;
                    _this._onSettingChanged = _this._onSettingChanged.bind(_this);
                    return _this;
                }
                ComponentWithInjectedProps.prototype.componentDidMount = function () {
                    _Customizations__WEBPACK_IMPORTED_MODULE_2__["Customizations"].observe(this._onSettingChanged);
                };
                ComponentWithInjectedProps.prototype.componentWillUnmount = function () {
                    _Customizations__WEBPACK_IMPORTED_MODULE_2__["Customizations"].unobserve(this._onSettingChanged);
                };
                ComponentWithInjectedProps.prototype.render = function () {
                    var _this = this;
                    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Customizer__WEBPACK_IMPORTED_MODULE_4__["CustomizerContext"].Consumer, null, function (context) {
                        var defaultProps = _Customizations__WEBPACK_IMPORTED_MODULE_2__["Customizations"].getSettings(fields, scope, context.customizations);
                        // tslint:disable-next-line:no-any
                        var componentProps = _this.props;
                        if (concatStyles) {
                            var mergedStyles = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_5__["concatStyleSets"])(defaultProps.styles, componentProps.styles);
                            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](ComposedComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultProps, componentProps, { styles: mergedStyles }));
                        }
                        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](ComposedComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultProps, componentProps));
                    }));
                };
                ComponentWithInjectedProps.prototype._onSettingChanged = function () {
                    this.forceUpdate();
                };
                return ComponentWithInjectedProps;
            }(react__WEBPACK_IMPORTED_MODULE_1__["Component"])),
            _a.displayName = 'Customized' + scope,
            _a);
        return Object(_hoistStatics__WEBPACK_IMPORTED_MODULE_3__["hoistStatics"])(ComposedComponent, resultClass);
        var _a;
    };
}
//# sourceMappingURL=customizable.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/dom.js":
/*!*****************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/dom.js ***!
  \*****************************************************/
/*! exports provided: DATA_PORTAL_ATTRIBUTE, setVirtualParent, getVirtualParent, getParent, getChildren, elementContains, setSSR, getWindow, getDocument, getRect, setPortalAttribute, portalContainsElement, findElementRecursive, elementContainsAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_PORTAL_ATTRIBUTE", function() { return DATA_PORTAL_ATTRIBUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVirtualParent", function() { return setVirtualParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualParent", function() { return getVirtualParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return getParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChildren", function() { return getChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementContains", function() { return elementContains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSSR", function() { return setSSR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWindow", function() { return getWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return getDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRect", function() { return getRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPortalAttribute", function() { return setPortalAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "portalContainsElement", function() { return portalContainsElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findElementRecursive", function() { return findElementRecursive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementContainsAttribute", function() { return elementContainsAttribute; });
var DATA_PORTAL_ATTRIBUTE = 'data-portal-element';
/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @public
 */
function setVirtualParent(child, parent) {
    var virtualChild = child;
    var virtualParent = parent;
    if (!virtualChild._virtual) {
        virtualChild._virtual = {
            children: []
        };
    }
    var oldParent = virtualChild._virtual.parent;
    if (oldParent && oldParent !== parent) {
        // Remove the child from its old parent.
        var index = oldParent._virtual.children.indexOf(virtualChild);
        if (index > -1) {
            oldParent._virtual.children.splice(index, 1);
        }
    }
    virtualChild._virtual.parent = virtualParent || undefined;
    if (virtualParent) {
        if (!virtualParent._virtual) {
            virtualParent._virtual = {
                children: []
            };
        }
        virtualParent._virtual.children.push(virtualChild);
    }
}
/**
 * Gets the virtual parent given the child element, if it exists.
 *
 * @public
 */
function getVirtualParent(child) {
    var parent;
    if (child && isVirtualElement(child)) {
        parent = child._virtual.parent;
    }
    return parent;
}
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @public
 */
function getParent(child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    return (child &&
        ((allowVirtualParents && getVirtualParent(child)) || (child.parentNode && child.parentNode)));
}
/**
 * Gets the elements which are child elements of the given element.
 * If `allowVirtualChildren` is `true`, this method enumerates virtual child elements
 * after the original children.
 * @param parent - The element to get the children of.
 * @param allowVirtualChildren - true if the method should enumerate virtual child elements.
 */
function getChildren(parent, allowVirtualChildren) {
    if (allowVirtualChildren === void 0) { allowVirtualChildren = true; }
    var children = [];
    if (parent) {
        for (var i = 0; i < parent.children.length; i++) {
            children.push(parent.children.item(i));
        }
        if (allowVirtualChildren && isVirtualElement(parent)) {
            children.push.apply(children, parent._virtual.children);
        }
    }
    return children;
}
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @public
 */
function elementContains(parent, child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    var isContained = false;
    if (parent && child) {
        if (allowVirtualParents) {
            isContained = false;
            while (child) {
                var nextParent = getParent(child);
                if (nextParent === parent) {
                    isContained = true;
                    break;
                }
                child = nextParent;
            }
        }
        else if (parent.contains) {
            isContained = parent.contains(child);
        }
    }
    return isContained;
}
var _isSSR = false;
/**
 * Helper to set ssr mode to simulate no window object returned from getWindow helper.
 *
 * @public
 */
function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
/**
 * Helper to get the window object.
 *
 * @public
 */
function getWindow(rootElement) {
    if (_isSSR || typeof window === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView
            ? rootElement.ownerDocument.defaultView
            : window;
    }
}
/**
 * Helper to get the document object.
 *
 * @public
 */
function getDocument(rootElement) {
    if (_isSSR || typeof document === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
    }
}
/**
 * Helper to get bounding client rect, works with window.
 *
 * @public
 */
function getRect(element) {
    var rect;
    if (element) {
        if (element === window) {
            rect = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            };
        }
        else if (element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
        }
    }
    return rect;
}
/**
 * Identify element as a portal by setting an attribute.
 * @param element - Element to mark as a portal.
 */
function setPortalAttribute(element) {
    element.setAttribute(DATA_PORTAL_ATTRIBUTE, 'true');
}
/**
 * Determine whether a target is within a portal from perspective of root or optional parent.
 * This function only works against portal components that use the setPortalAttribute function.
 * If both parent and child are within the same portal this function will return false.
 * @param target - Element to query portal containment status of.
 * @param parent - Optional parent perspective. Search for containing portal stops at parent (or root if parent is undefined or invalid.)
 */
function portalContainsElement(target, parent) {
    var elementMatch = findElementRecursive(target, function (testElement) { return parent === testElement || testElement.hasAttribute(DATA_PORTAL_ATTRIBUTE); });
    return elementMatch !== null && elementMatch.hasAttribute(DATA_PORTAL_ATTRIBUTE);
}
/**
 * Finds the first parent element where the matchFunction returns true
 * @param element - element to start searching at
 * @param matchFunction - the function that determines if the element is a match
 * @returns the matched element or null no match was found
 */
function findElementRecursive(element, matchFunction) {
    if (!element || element === document.body) {
        return null;
    }
    return matchFunction(element) ? element : findElementRecursive(getParent(element), matchFunction);
}
/**
 * Determines if an element, or any of its ancestors, contain the given attribute
 * @param element - element to start searching at
 * @param attribute - the attribute to search for
 * @returns the value of the first instance found
 */
function elementContainsAttribute(element, attribute) {
    var elementMatch = findElementRecursive(element, function (testElement) { return testElement.hasAttribute(attribute); });
    return elementMatch && elementMatch.getAttribute(attribute);
}
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @public
 */
function isVirtualElement(element) {
    return element && !!element._virtual;
}
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/focus.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/focus.js ***!
  \*******************************************************/
/*! exports provided: getFirstFocusable, getLastFocusable, getFirstTabbable, getLastTabbable, focusFirstChild, getPreviousElement, getNextElement, isElementVisible, isElementTabbable, isElementFocusZone, isElementFocusSubZone, doesElementContainFocus, shouldWrapFocus, focusAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstFocusable", function() { return getFirstFocusable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastFocusable", function() { return getLastFocusable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstTabbable", function() { return getFirstTabbable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastTabbable", function() { return getLastTabbable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusFirstChild", function() { return focusFirstChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreviousElement", function() { return getPreviousElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextElement", function() { return getNextElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementVisible", function() { return isElementVisible; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementTabbable", function() { return isElementTabbable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusZone", function() { return isElementFocusZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusSubZone", function() { return isElementFocusSubZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doesElementContainFocus", function() { return doesElementContainFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldWrapFocus", function() { return shouldWrapFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusAsync", function() { return focusAsync; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* tslint:disable:no-string-literal */

var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
var FOCUSZONE_SUB_ATTRIBUTE = 'data-is-sub-focuszone';
/**
 * Gets the first focusable element.
 *
 * @public
 */
function getFirstFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getNextElement(rootElement, currentElement, true /*checkNode*/, false /*suppressParentTraversal*/, false /*suppressChildTraversal*/, includeElementsInFocusZones);
}
/**
 * Gets the last focusable element.
 *
 * @public
 */
function getLastFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getPreviousElement(rootElement, currentElement, true /*checkNode*/, false /*suppressParentTraversal*/, true /*traverseChildren*/, includeElementsInFocusZones);
}
/**
 * Gets the first tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues forward.  Typical use passes rootElement.firstChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
function getFirstTabbable(rootElement, currentElement, includeElementsInFocusZones) {
    return getNextElement(rootElement, currentElement, true /*checkNode*/, false /*suppressParentTraversal*/, false /*suppressChildTraversal*/, includeElementsInFocusZones, false /*allowFocusRoot*/, true /*tabbable*/);
}
/**
 * Gets the last tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues in reverse.  Typical use passes rootElement.lastChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
function getLastTabbable(rootElement, currentElement, includeElementsInFocusZones) {
    return getPreviousElement(rootElement, currentElement, true /*checkNode*/, false /*suppressParentTraversal*/, true /*traverseChildren*/, includeElementsInFocusZones, false /*allowFocusRoot*/, true /*tabbable*/);
}
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */
function focusFirstChild(rootElement) {
    var element = getNextElement(rootElement, rootElement, true, false, false, true);
    if (element) {
        focusAsync(element);
        return true;
    }
    return false;
}
/**
 * Traverse to find the previous element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 */
function getPreviousElement(rootElement, currentElement, checkNode, suppressParentTraversal, traverseChildren, includeElementsInFocusZones, allowFocusRoot, tabbable) {
    if (!currentElement || (!allowFocusRoot && currentElement === rootElement)) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check its children.
    if (traverseChildren &&
        isCurrentElementVisible &&
        (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
        var childMatch = getPreviousElement(rootElement, currentElement.lastElementChild, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
        if (childMatch) {
            if ((tabbable && isElementTabbable(childMatch, true)) || !tabbable) {
                return childMatch;
            }
            var childMatchSiblingMatch = getPreviousElement(rootElement, childMatch.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
            if (childMatchSiblingMatch) {
                return childMatchSiblingMatch;
            }
            var childMatchParent = childMatch.parentElement;
            // At this point if we have not found any potential matches
            // start looking at the rest of the subtree under the currentParent.
            // NOTE: We do not want to recurse here because doing so could
            // cause elements to get skipped.
            while (childMatchParent && childMatchParent !== currentElement) {
                var childMatchParentMatch = getPreviousElement(rootElement, childMatchParent.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
                if (childMatchParentMatch) {
                    return childMatchParentMatch;
                }
                childMatchParent = childMatchParent.parentElement;
            }
        }
    }
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
        return currentElement;
    }
    // Check its previous sibling.
    var siblingMatch = getPreviousElement(rootElement, currentElement.previousElementSibling, true, true, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
    if (siblingMatch) {
        return siblingMatch;
    }
    // Check its parent.
    if (!suppressParentTraversal) {
        return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones, allowFocusRoot, tabbable);
    }
    return null;
}
/**
 * Traverse to find the next focusable element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 */
function getNextElement(rootElement, currentElement, checkNode, suppressParentTraversal, suppressChildTraversal, includeElementsInFocusZones, allowFocusRoot, tabbable) {
    if (!currentElement || (currentElement === rootElement && suppressChildTraversal && !allowFocusRoot)) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable)) {
        return currentElement;
    }
    // Check its children.
    if (!suppressChildTraversal &&
        isCurrentElementVisible &&
        (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
        var childMatch = getNextElement(rootElement, currentElement.firstElementChild, true, true, false, includeElementsInFocusZones, allowFocusRoot, tabbable);
        if (childMatch) {
            return childMatch;
        }
    }
    if (currentElement === rootElement) {
        return null;
    }
    // Check its sibling.
    var siblingMatch = getNextElement(rootElement, currentElement.nextElementSibling, true, true, false, includeElementsInFocusZones, allowFocusRoot, tabbable);
    if (siblingMatch) {
        return siblingMatch;
    }
    if (!suppressParentTraversal) {
        return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones, allowFocusRoot, tabbable);
    }
    return null;
}
/**
 * Determines if an element is visible.
 *
 * @public
 */
function isElementVisible(element) {
    // If the element is not valid, return false.
    if (!element || !element.getAttribute) {
        return false;
    }
    var visibilityAttribute = element.getAttribute(IS_VISIBLE_ATTRIBUTE);
    // If the element is explicitly marked with the visibility attribute, return that value as boolean.
    if (visibilityAttribute !== null && visibilityAttribute !== undefined) {
        return visibilityAttribute === 'true';
    }
    // Fallback to other methods of determining actual visibility.
    return (element.offsetHeight !== 0 ||
        element.offsetParent !== null ||
        // tslint:disable-next-line:no-any
        element.isVisible === true); // used as a workaround for testing.
}
/**
 * Determines if an element can receive focus programmatically or via a mouse click.
 * If checkTabIndex is true, additionally checks to ensure the element can be focused with the tab key, meaning tabIndex != -1.
 *
 * @public
 */
function isElementTabbable(element, checkTabIndex) {
    // If this element is null or is disabled, it is not considered tabbable.
    if (!element || element.disabled) {
        return false;
    }
    var tabIndex = 0;
    var tabIndexAttributeValue = null;
    if (element && element.getAttribute) {
        tabIndexAttributeValue = element.getAttribute('tabIndex');
        if (tabIndexAttributeValue) {
            tabIndex = parseInt(tabIndexAttributeValue, 10);
        }
    }
    var isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
    var isTabIndexSet = tabIndexAttributeValue !== null && tabIndex >= 0;
    var result = !!element &&
        isFocusableAttribute !== 'false' &&
        (element.tagName === 'A' ||
            element.tagName === 'BUTTON' ||
            element.tagName === 'INPUT' ||
            element.tagName === 'TEXTAREA' ||
            isFocusableAttribute === 'true' ||
            isTabIndexSet ||
            (element.getAttribute && element.getAttribute('role') === 'button'));
    return checkTabIndex ? tabIndex !== -1 && result : result;
}
/**
 * Determines if a given element is a focus zone.
 *
 * @public
 */
function isElementFocusZone(element) {
    return !!(element && element.getAttribute && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE));
}
/**
 * Determines if a given element is a focus sub zone.
 *
 * @public
 */
function isElementFocusSubZone(element) {
    return !!(element && element.getAttribute && element.getAttribute(FOCUSZONE_SUB_ATTRIBUTE) === 'true');
}
/**
 * Determines if an element, or any of its children, contain focus.
 *
 * @public
 */
function doesElementContainFocus(element) {
    var document = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])(element);
    var currentActiveElement = document && document.activeElement;
    if (currentActiveElement && Object(_dom__WEBPACK_IMPORTED_MODULE_0__["elementContains"])(element, currentActiveElement)) {
        return true;
    }
    return false;
}
/**
 * Determines if an, or any of its ancestors, sepcificies that it doesn't want focus to wrap
 * @param element - element to start searching from
 * @param noWrapDataAttribute - the no wrap data attribute to match (either)
 * @returns true if focus should wrap, false otherwise
 */
function shouldWrapFocus(element, noWrapDataAttribute) {
    return Object(_dom__WEBPACK_IMPORTED_MODULE_0__["elementContainsAttribute"])(element, noWrapDataAttribute) === 'true' ? false : true;
}
var targetToFocusOnNextRepaint = undefined;
/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
function focusAsync(element) {
    if (element) {
        // An element was already queued to be focused, so replace that one with the new element
        if (targetToFocusOnNextRepaint) {
            targetToFocusOnNextRepaint = element;
            return;
        }
        targetToFocusOnNextRepaint = element;
        var win = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getWindow"])(element);
        if (win) {
            // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
            win.requestAnimationFrame(function () {
                targetToFocusOnNextRepaint && targetToFocusOnNextRepaint.focus();
                // We are done focusing for this frame, so reset the queued focus element
                targetToFocusOnNextRepaint = undefined;
            });
        }
    }
}
//# sourceMappingURL=focus.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/hoist.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/hoist.js ***!
  \*******************************************************/
/*! exports provided: hoistMethods, unhoistMethods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hoistMethods", function() { return hoistMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unhoistMethods", function() { return unhoistMethods; });
var REACT_LIFECYCLE_EXCLUSIONS = [
    'setState',
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];
/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 *
 * @public
 * @param destination - The instance of the object to hoist the methods onto.
 * @param source - The instance of the object where the methods are hoisted from.
 * @param exclusions - (Optional) What methods to exclude from being hoisted.
 * @returns An array of names of methods that were hoisted.
 */
function hoistMethods(
// tslint:disable-next-line:no-any
destination, 
// tslint:disable-next-line:no-any
source, exclusions) {
    if (exclusions === void 0) { exclusions = REACT_LIFECYCLE_EXCLUSIONS; }
    var hoisted = [];
    var _loop_1 = function (methodName) {
        if (typeof source[methodName] === 'function' &&
            destination[methodName] === undefined &&
            (!exclusions || exclusions.indexOf(methodName) === -1)) {
            hoisted.push(methodName);
            /* tslint:disable:no-function-expression */
            destination[methodName] = function () {
                source[methodName].apply(source, arguments);
            };
            /* tslint:enable */
        }
    };
    for (var methodName in source) {
        _loop_1(methodName);
    }
    return hoisted;
}
/**
 * Provides a method for convenience to unhoist hoisted methods.
 *
 * @public
 * @param source - The source object upon which methods were hoisted.
 * @param methodNames - An array of method names to unhoist.
 */
// tslint:disable-next-line:no-any
function unhoistMethods(source, methodNames) {
    methodNames.forEach(function (methodName) { return delete source[methodName]; });
}
//# sourceMappingURL=hoist.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/hoistStatics.js":
/*!**************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/hoistStatics.js ***!
  \**************************************************************/
/*! exports provided: hoistStatics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hoistStatics", function() { return hoistStatics; });
/**
 * Allows you to hoist static functions in components.
 * Created for the purpose of fixing broken static functions in classes
 * that utilize decorators.
 *
 * @public
 * @param source - The object where the methods are hoisted from.
 * @param dest - The object to hoist the methods onto.
 * @returns The dest object with methods added
 */
function hoistStatics(source, dest) {
    for (var name_1 in source) {
        if (source.hasOwnProperty(name_1)) {
            // tslint:disable-next-line:no-any
            dest[name_1] = source[name_1];
        }
    }
    return dest;
}
//# sourceMappingURL=hoistStatics.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/index.js ***!
  \*******************************************************/
/*! exports provided: Async, AutoScroll, BaseComponent, nullRender, provideContext, Customizations, CustomizerContext, Customizer, mergeCustomizations, DelayedRender, EventGroup, FabricPerformance, GlobalSettings, KeyCodes, Rectangle, mergeAriaAttributeValues, findIndex, find, createArray, toMatrix, removeIndex, replaceElement, addElementAtIndex, flatten, arraysEqual, asAsync, assertNever, autobind, classNamesFunction, createRef, css, customizable, DATA_PORTAL_ATTRIBUTE, setVirtualParent, getVirtualParent, getParent, getChildren, elementContains, setSSR, getWindow, getDocument, getRect, setPortalAttribute, portalContainsElement, findElementRecursive, elementContainsAttribute, getFirstFocusable, getLastFocusable, getFirstTabbable, getLastTabbable, focusFirstChild, getPreviousElement, getNextElement, isElementVisible, isElementTabbable, isElementFocusZone, isElementFocusSubZone, doesElementContainFocus, shouldWrapFocus, focusAsync, hoistMethods, unhoistMethods, hoistStatics, IsFocusVisibleClassName, initializeFocusRects, getInitials, isDirectionalKeyCode, addDirectionalKeyCode, getLanguage, setLanguage, getDistanceBetweenPoints, fitContentToBounds, calculatePrecision, precisionRound, setMemoizeWeakMap, resetMemoizations, memoize, memoizeFunction, merge, isIOS, shallowCompare, assign, filteredAssign, getId, resetIds, mapEnumByName, values, hasHorizontalOverflow, hasVerticalOverflow, hasOverflow, baseElementEvents, baseElementProperties, htmlElementProperties, anchorProperties, buttonProperties, divProperties, inputProperties, textAreaProperties, imageProperties, getNativeProps, getResourceUrl, setBaseUrl, getRTL, setRTL, getRTLSafeKeyCode, DATA_IS_SCROLLABLE_ATTRIBUTE, allowScrollOnElement, disableBodyScroll, enableBodyScroll, getScrollbarWidth, findScrollableParent, format, styled, warnDeprecations, warnMutuallyExclusive, warnConditionallyRequiredProps, warn, setWarningCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Async */ "./node_modules/@uifabric/utilities/lib/Async.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return _Async__WEBPACK_IMPORTED_MODULE_0__["Async"]; });

/* harmony import */ var _AutoScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoScroll */ "./node_modules/@uifabric/utilities/lib/AutoScroll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AutoScroll", function() { return _AutoScroll__WEBPACK_IMPORTED_MODULE_1__["AutoScroll"]; });

/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseComponent */ "./node_modules/@uifabric/utilities/lib/BaseComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _BaseComponent__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nullRender", function() { return _BaseComponent__WEBPACK_IMPORTED_MODULE_2__["nullRender"]; });

/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Context */ "./node_modules/@uifabric/utilities/lib/Context.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "provideContext", function() { return _Context__WEBPACK_IMPORTED_MODULE_3__["provideContext"]; });

/* harmony import */ var _Customizations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Customizations */ "./node_modules/@uifabric/utilities/lib/Customizations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Customizations", function() { return _Customizations__WEBPACK_IMPORTED_MODULE_4__["Customizations"]; });

/* harmony import */ var _Customizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Customizer */ "./node_modules/@uifabric/utilities/lib/Customizer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CustomizerContext", function() { return _Customizer__WEBPACK_IMPORTED_MODULE_5__["CustomizerContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Customizer", function() { return _Customizer__WEBPACK_IMPORTED_MODULE_5__["Customizer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeCustomizations", function() { return _Customizer__WEBPACK_IMPORTED_MODULE_5__["mergeCustomizations"]; });

/* harmony import */ var _DelayedRender__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DelayedRender */ "./node_modules/@uifabric/utilities/lib/DelayedRender.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DelayedRender", function() { return _DelayedRender__WEBPACK_IMPORTED_MODULE_6__["DelayedRender"]; });

/* harmony import */ var _EventGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventGroup */ "./node_modules/@uifabric/utilities/lib/EventGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventGroup", function() { return _EventGroup__WEBPACK_IMPORTED_MODULE_7__["EventGroup"]; });

/* harmony import */ var _FabricPerformance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FabricPerformance */ "./node_modules/@uifabric/utilities/lib/FabricPerformance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricPerformance", function() { return _FabricPerformance__WEBPACK_IMPORTED_MODULE_8__["FabricPerformance"]; });

/* harmony import */ var _GlobalSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GlobalSettings */ "./node_modules/@uifabric/utilities/lib/GlobalSettings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalSettings", function() { return _GlobalSettings__WEBPACK_IMPORTED_MODULE_9__["GlobalSettings"]; });

/* harmony import */ var _KeyCodes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KeyCodes */ "./node_modules/@uifabric/utilities/lib/KeyCodes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return _KeyCodes__WEBPACK_IMPORTED_MODULE_10__["KeyCodes"]; });

/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Rectangle */ "./node_modules/@uifabric/utilities/lib/Rectangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _Rectangle__WEBPACK_IMPORTED_MODULE_11__["Rectangle"]; });

/* harmony import */ var _aria__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./aria */ "./node_modules/@uifabric/utilities/lib/aria.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAriaAttributeValues", function() { return _aria__WEBPACK_IMPORTED_MODULE_12__["mergeAriaAttributeValues"]; });

/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./array */ "./node_modules/@uifabric/utilities/lib/array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["findIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["find"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createArray", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["createArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toMatrix", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["toMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeIndex", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["removeIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceElement", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["replaceElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addElementAtIndex", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["addElementAtIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["flatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return _array__WEBPACK_IMPORTED_MODULE_13__["arraysEqual"]; });

/* harmony import */ var _asAsync__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./asAsync */ "./node_modules/@uifabric/utilities/lib/asAsync.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asAsync", function() { return _asAsync__WEBPACK_IMPORTED_MODULE_14__["asAsync"]; });

/* harmony import */ var _assertNever__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./assertNever */ "./node_modules/@uifabric/utilities/lib/assertNever.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertNever", function() { return _assertNever__WEBPACK_IMPORTED_MODULE_15__["assertNever"]; });

/* harmony import */ var _autobind__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./autobind */ "./node_modules/@uifabric/utilities/lib/autobind.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return _autobind__WEBPACK_IMPORTED_MODULE_16__["autobind"]; });

/* harmony import */ var _classNamesFunction__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./classNamesFunction */ "./node_modules/@uifabric/utilities/lib/classNamesFunction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classNamesFunction", function() { return _classNamesFunction__WEBPACK_IMPORTED_MODULE_17__["classNamesFunction"]; });

/* harmony import */ var _createRef__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./createRef */ "./node_modules/@uifabric/utilities/lib/createRef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return _createRef__WEBPACK_IMPORTED_MODULE_18__["createRef"]; });

/* harmony import */ var _css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./css */ "./node_modules/@uifabric/utilities/lib/css.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _css__WEBPACK_IMPORTED_MODULE_19__["css"]; });

/* harmony import */ var _customizable__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./customizable */ "./node_modules/@uifabric/utilities/lib/customizable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customizable", function() { return _customizable__WEBPACK_IMPORTED_MODULE_20__["customizable"]; });

/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_PORTAL_ATTRIBUTE", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["DATA_PORTAL_ATTRIBUTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setVirtualParent", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["setVirtualParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getVirtualParent", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getVirtualParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChildren", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getChildren"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementContains", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["elementContains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSSR", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["setSSR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getWindow", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRect", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["getRect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setPortalAttribute", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["setPortalAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "portalContainsElement", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["portalContainsElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findElementRecursive", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["findElementRecursive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementContainsAttribute", function() { return _dom__WEBPACK_IMPORTED_MODULE_21__["elementContainsAttribute"]; });

/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./focus */ "./node_modules/@uifabric/utilities/lib/focus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFirstFocusable", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getFirstFocusable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLastFocusable", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getLastFocusable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFirstTabbable", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getFirstTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLastTabbable", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getLastTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusFirstChild", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["focusFirstChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPreviousElement", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getPreviousElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNextElement", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["getNextElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementVisible", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["isElementVisible"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementTabbable", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["isElementTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementFocusZone", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["isElementFocusZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementFocusSubZone", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["isElementFocusSubZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "doesElementContainFocus", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["doesElementContainFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shouldWrapFocus", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["shouldWrapFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusAsync", function() { return _focus__WEBPACK_IMPORTED_MODULE_22__["focusAsync"]; });

/* harmony import */ var _hoist__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./hoist */ "./node_modules/@uifabric/utilities/lib/hoist.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hoistMethods", function() { return _hoist__WEBPACK_IMPORTED_MODULE_23__["hoistMethods"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unhoistMethods", function() { return _hoist__WEBPACK_IMPORTED_MODULE_23__["unhoistMethods"]; });

/* harmony import */ var _hoistStatics__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./hoistStatics */ "./node_modules/@uifabric/utilities/lib/hoistStatics.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hoistStatics", function() { return _hoistStatics__WEBPACK_IMPORTED_MODULE_24__["hoistStatics"]; });

/* harmony import */ var _initializeFocusRects__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./initializeFocusRects */ "./node_modules/@uifabric/utilities/lib/initializeFocusRects.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IsFocusVisibleClassName", function() { return _initializeFocusRects__WEBPACK_IMPORTED_MODULE_25__["IsFocusVisibleClassName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initializeFocusRects", function() { return _initializeFocusRects__WEBPACK_IMPORTED_MODULE_25__["initializeFocusRects"]; });

/* harmony import */ var _initials__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./initials */ "./node_modules/@uifabric/utilities/lib/initials.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInitials", function() { return _initials__WEBPACK_IMPORTED_MODULE_26__["getInitials"]; });

/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./keyboard */ "./node_modules/@uifabric/utilities/lib/keyboard.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirectionalKeyCode", function() { return _keyboard__WEBPACK_IMPORTED_MODULE_27__["isDirectionalKeyCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addDirectionalKeyCode", function() { return _keyboard__WEBPACK_IMPORTED_MODULE_27__["addDirectionalKeyCode"]; });

/* harmony import */ var _language__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./language */ "./node_modules/@uifabric/utilities/lib/language.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return _language__WEBPACK_IMPORTED_MODULE_28__["getLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return _language__WEBPACK_IMPORTED_MODULE_28__["setLanguage"]; });

/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./math */ "./node_modules/@uifabric/utilities/lib/math.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenPoints", function() { return _math__WEBPACK_IMPORTED_MODULE_29__["getDistanceBetweenPoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fitContentToBounds", function() { return _math__WEBPACK_IMPORTED_MODULE_29__["fitContentToBounds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculatePrecision", function() { return _math__WEBPACK_IMPORTED_MODULE_29__["calculatePrecision"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "precisionRound", function() { return _math__WEBPACK_IMPORTED_MODULE_29__["precisionRound"]; });

/* harmony import */ var _memoize__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./memoize */ "./node_modules/@uifabric/utilities/lib/memoize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setMemoizeWeakMap", function() { return _memoize__WEBPACK_IMPORTED_MODULE_30__["setMemoizeWeakMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetMemoizations", function() { return _memoize__WEBPACK_IMPORTED_MODULE_30__["resetMemoizations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return _memoize__WEBPACK_IMPORTED_MODULE_30__["memoize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoizeFunction", function() { return _memoize__WEBPACK_IMPORTED_MODULE_30__["memoizeFunction"]; });

/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./merge */ "./node_modules/@uifabric/utilities/lib/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _merge__WEBPACK_IMPORTED_MODULE_31__["merge"]; });

/* harmony import */ var _mobileDetector__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./mobileDetector */ "./node_modules/@uifabric/utilities/lib/mobileDetector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return _mobileDetector__WEBPACK_IMPORTED_MODULE_32__["isIOS"]; });

/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./object */ "./node_modules/@uifabric/utilities/lib/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowCompare", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["shallowCompare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["assign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filteredAssign", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["filteredAssign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getId", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["getId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetIds", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["resetIds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapEnumByName", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["mapEnumByName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _object__WEBPACK_IMPORTED_MODULE_33__["values"]; });

/* harmony import */ var _overflow__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./overflow */ "./node_modules/@uifabric/utilities/lib/overflow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasHorizontalOverflow", function() { return _overflow__WEBPACK_IMPORTED_MODULE_34__["hasHorizontalOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasVerticalOverflow", function() { return _overflow__WEBPACK_IMPORTED_MODULE_34__["hasVerticalOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasOverflow", function() { return _overflow__WEBPACK_IMPORTED_MODULE_34__["hasOverflow"]; });

/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./properties */ "./node_modules/@uifabric/utilities/lib/properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseElementEvents", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["baseElementEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseElementProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["baseElementProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "htmlElementProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["htmlElementProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "anchorProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["anchorProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buttonProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["buttonProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "divProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["divProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["inputProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "textAreaProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["textAreaProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "imageProperties", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["imageProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNativeProps", function() { return _properties__WEBPACK_IMPORTED_MODULE_35__["getNativeProps"]; });

/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./resources */ "./node_modules/@uifabric/utilities/lib/resources.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResourceUrl", function() { return _resources__WEBPACK_IMPORTED_MODULE_36__["getResourceUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setBaseUrl", function() { return _resources__WEBPACK_IMPORTED_MODULE_36__["setBaseUrl"]; });

/* harmony import */ var _rtl__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./rtl */ "./node_modules/@uifabric/utilities/lib/rtl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRTL", function() { return _rtl__WEBPACK_IMPORTED_MODULE_37__["getRTL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRTL", function() { return _rtl__WEBPACK_IMPORTED_MODULE_37__["setRTL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRTLSafeKeyCode", function() { return _rtl__WEBPACK_IMPORTED_MODULE_37__["getRTLSafeKeyCode"]; });

/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./scroll */ "./node_modules/@uifabric/utilities/lib/scroll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_IS_SCROLLABLE_ATTRIBUTE", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["DATA_IS_SCROLLABLE_ATTRIBUTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allowScrollOnElement", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["allowScrollOnElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "disableBodyScroll", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["disableBodyScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enableBodyScroll", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["enableBodyScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["getScrollbarWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findScrollableParent", function() { return _scroll__WEBPACK_IMPORTED_MODULE_38__["findScrollableParent"]; });

/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./string */ "./node_modules/@uifabric/utilities/lib/string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "format", function() { return _string__WEBPACK_IMPORTED_MODULE_39__["format"]; });

/* harmony import */ var _styled__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./styled */ "./node_modules/@uifabric/utilities/lib/styled.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styled", function() { return _styled__WEBPACK_IMPORTED_MODULE_40__["styled"]; });

/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./warn */ "./node_modules/@uifabric/utilities/lib/warn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnDeprecations", function() { return _warn__WEBPACK_IMPORTED_MODULE_41__["warnDeprecations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnMutuallyExclusive", function() { return _warn__WEBPACK_IMPORTED_MODULE_41__["warnMutuallyExclusive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnConditionallyRequiredProps", function() { return _warn__WEBPACK_IMPORTED_MODULE_41__["warnConditionallyRequiredProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _warn__WEBPACK_IMPORTED_MODULE_41__["warn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setWarningCallback", function() { return _warn__WEBPACK_IMPORTED_MODULE_41__["setWarningCallback"]; });

/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./version */ "./node_modules/@uifabric/utilities/lib/version.js");











































//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/initializeDir.js":
/*!***************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/initializeDir.js ***!
  \***************************************************************/
/*! exports provided: initializeDir */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeDir", function() { return initializeDir; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");

function initializeDir(window) {
    var win = (window || Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getWindow"])());
    if (win && !win.__hasInitializedDir__) {
        win.__hasInitializedDir__ = true;
        // Ensure that the documentElement has a 'dir' attribute.
        var documentElement = win.document.documentElement;
        if (!documentElement.hasAttribute('dir')) {
            documentElement.setAttribute('dir', 'ltr');
        }
    }
}
//# sourceMappingURL=initializeDir.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/initializeFocusRects.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/initializeFocusRects.js ***!
  \**********************************************************************/
/*! exports provided: IsFocusVisibleClassName, initializeFocusRects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsFocusVisibleClassName", function() { return IsFocusVisibleClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeFocusRects", function() { return initializeFocusRects; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard */ "./node_modules/@uifabric/utilities/lib/keyboard.js");


var IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
/**
 * Initializes the logic which:
 *
 * 1. Subscribes keydown and mousedown events. (It will only do it once per window,
 *    so it's safe to call this method multiple times.)
 * 2. When the user presses directional keyboard keys, adds the 'ms-Fabric--isFocusVisible' classname
 *    to the document body.
 * 3. When the user clicks a mouse button, we remove the classname if it exists.
 *
 * This logic allows components on the page to conditionally render focus treatments only
 * if the global classname exists, which simplifies logic overall.
 *
 * @param window - the window used to add the event listeners
 */
function initializeFocusRects(window) {
    var win = (window || Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getWindow"])());
    if (win && !win.__hasInitializeFocusRects__) {
        win.__hasInitializeFocusRects__ = true;
        win.addEventListener('mousedown', _onMouseDown, true);
        win.addEventListener('keydown', _onKeyDown, true);
    }
}
function _onMouseDown(ev) {
    var win = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getWindow"])(ev.target);
    if (win) {
        var classList = win.document.body.classList;
        if (classList.contains(IsFocusVisibleClassName)) {
            classList.remove(IsFocusVisibleClassName);
        }
    }
}
function _onKeyDown(ev) {
    var win = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getWindow"])(ev.target);
    if (win) {
        var classList = win.document.body.classList;
        if (Object(_keyboard__WEBPACK_IMPORTED_MODULE_1__["isDirectionalKeyCode"])(ev.which) && !classList.contains(IsFocusVisibleClassName)) {
            classList.add(IsFocusVisibleClassName);
        }
    }
}
//# sourceMappingURL=initializeFocusRects.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/initials.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/initials.js ***!
  \**********************************************************/
/*! exports provided: getInitials */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitials", function() { return getInitials; });
/**
 * Regular expression matching characters to ignore when calculating the initials.
 * The first part matches characters within parenthesis, including the parenthesis.
 * The second part matches special ASCII characters except space, plus some unicode special characters.
 */
var UNWANTED_CHARS_REGEX = /\([^)]*\)|[\0-\u001F\!-/:-@\[-`\{-\u00BF\u0250-\u036F\uD800-\uFFFF]/g;
/**
 * Regular expression matching phone numbers. Applied after chars matching UNWANTED_CHARS_REGEX have been removed
 * and number has been trimmed for whitespaces
 */
var PHONENUMBER_REGEX = /^\d+[\d\s]*(:?ext|x|)\s*\d+$/i;
/** Regular expression matching one or more spaces. */
var MULTIPLE_WHITESPACES_REGEX = /\s+/g;
/**
 * Regular expression matching languages for which we currently don't support initials.
 * Arabic:   Arabic, Arabic Supplement, Arabic Extended-A.
 * Korean:   Hangul Jamo, Hangul Compatibility Jamo, Hangul Jamo Extended-A, Hangul Syllables, Hangul Jamo Extended-B.
 * Japanese: Hiragana, Katakana.
 * CJK:      CJK Unified Ideographs Extension A, CJK Unified Ideographs, CJK Compatibility Ideographs, CJK Unified Ideographs Extension B
 */
/* tslint:disable:max-line-length */
var UNSUPPORTED_TEXT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD869][\uDC00-\uDED6]/;
/* tslint:enable:max-line-length */
function getInitialsLatin(displayName, isRtl) {
    var initials = '';
    var splits = displayName.split(' ');
    if (splits.length === 2) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[1].charAt(0).toUpperCase();
    }
    else if (splits.length === 3) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[2].charAt(0).toUpperCase();
    }
    else if (splits.length !== 0) {
        initials += splits[0].charAt(0).toUpperCase();
    }
    if (isRtl && initials.length > 1) {
        return initials.charAt(1) + initials.charAt(0);
    }
    return initials;
}
function cleanupDisplayName(displayName) {
    displayName = displayName.replace(UNWANTED_CHARS_REGEX, '');
    displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX, ' ');
    displayName = displayName.trim();
    return displayName;
}
/**
 * Get (up to 2 characters) initials based on display name of the persona.
 *
 * @public
 */
function getInitials(displayName, isRtl, allowPhoneInitials) {
    if (!displayName) {
        return '';
    }
    displayName = cleanupDisplayName(displayName);
    // For names containing CJK characters, and phone numbers, we don't display initials
    if (UNSUPPORTED_TEXT_REGEX.test(displayName) || (!allowPhoneInitials && PHONENUMBER_REGEX.test(displayName))) {
        return '';
    }
    return getInitialsLatin(displayName, isRtl);
}
//# sourceMappingURL=initials.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/keyboard.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/keyboard.js ***!
  \**********************************************************/
/*! exports provided: isDirectionalKeyCode, addDirectionalKeyCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirectionalKeyCode", function() { return isDirectionalKeyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDirectionalKeyCode", function() { return addDirectionalKeyCode; });
var DirectionalKeyCodes = (_a = {},
    _a[38 /* up */] = 1,
    _a[40 /* down */] = 1,
    _a[37 /* left */] = 1,
    _a[39 /* right */] = 1,
    _a[36 /* home */] = 1,
    _a[35 /* end */] = 1,
    _a[9 /* tab */] = 1,
    _a[33 /* pageUp */] = 1,
    _a[34 /* pageDown */] = 1,
    _a);
/**
 * Returns true if the keycode is a directional keyboard key.
 */
function isDirectionalKeyCode(which) {
    return !!DirectionalKeyCodes[which];
}
/**
 * Adds a keycode to the list of keys that, when pressed, should cause the focus outlines to be visible.
 * This can be used to add global shortcut keys that directionally move from section to section within
 * an app or between focus trap zones.
 */
function addDirectionalKeyCode(which) {
    DirectionalKeyCodes[which] = 1;
}
var _a;
//# sourceMappingURL=keyboard.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/language.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/language.js ***!
  \**********************************************************/
/*! exports provided: getLanguage, setLanguage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return getLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return setLanguage; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./node_modules/@uifabric/utilities/lib/localStorage.js");


// Default to undefined so that we initialize on first read.
var _language;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */
function getLanguage() {
    if (_language === undefined) {
        var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
        var savedLanguage = Object(_localStorage__WEBPACK_IMPORTED_MODULE_1__["getItem"])('language');
        if (savedLanguage !== null) {
            _language = savedLanguage;
        }
        if (_language === undefined && doc) {
            _language = doc.documentElement.getAttribute('lang');
        }
        if (_language === undefined) {
            _language = 'en';
        }
    }
    return _language;
}
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */
function setLanguage(language, avoidPersisting) {
    if (avoidPersisting === void 0) { avoidPersisting = false; }
    var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
    if (doc) {
        doc.documentElement.setAttribute('lang', language);
    }
    if (!avoidPersisting) {
        Object(_localStorage__WEBPACK_IMPORTED_MODULE_1__["setItem"])('language', language);
    }
    _language = language;
}
//# sourceMappingURL=language.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/localStorage.js":
/*!**************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/localStorage.js ***!
  \**************************************************************/
/*! exports provided: getItem, setItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItem", function() { return getItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setItem", function() { return setItem; });
/**
 * Fetches an item from local storage without throwing an exception
 * @param key The key of the item to fetch from local storage
 */
function getItem(key) {
    var result = null;
    try {
        result = window.localStorage.getItem(key);
    }
    catch (e) {
        /* Eat the exception */
    }
    return result;
}
/**
 * Inserts an item into local storage without throwing an exception
 * @param key The key of the item to add to local storage
 * @param data The data to put into local storage
 */
function setItem(key, data) {
    try {
        window.localStorage.setItem(key, data);
    }
    catch (e) {
        /* Eat the exception */
    }
}
//# sourceMappingURL=localStorage.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/math.js":
/*!******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/math.js ***!
  \******************************************************/
/*! exports provided: getDistanceBetweenPoints, fitContentToBounds, calculatePrecision, precisionRound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenPoints", function() { return getDistanceBetweenPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitContentToBounds", function() { return fitContentToBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculatePrecision", function() { return calculatePrecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "precisionRound", function() { return precisionRound; });
/**
 * Determines the distance between two points.
 *
 * @public
 */
function getDistanceBetweenPoints(point1, point2) {
    var distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    return distance;
}
/**
 * Produces a proportionally-scaled version of an input content size when fit to a bounding size.
 * Given a `contentSize` and a `boundsSize`, this function scales `contentSize` proportionally
 * using either `contain` or `cover` fit behaviors.
 * Use this function to pre-calculate the layout for the CSS `object-fit` and `background-fit` behaviors.
 * With `contain`, the output size must be the largest it can be while completely within the `boundsSize`.
 * With `cover`, the output size must be the smallest it can be while completely around the `boundsSize`.
 * By default, there is a `maxScale` value of 1, which prevents the `contentSize` from being scaled larger.
 *
 * @param options - the options for the bounds fit operation
 */
function fitContentToBounds(options) {
    var contentSize = options.contentSize, boundsSize = options.boundsSize, _a = options.mode, mode = _a === void 0 ? 'contain' : _a, _b = options.maxScale, maxScale = _b === void 0 ? 1 : _b;
    var contentAspectRatio = contentSize.width / contentSize.height;
    var boundsAspectRatio = boundsSize.width / boundsSize.height;
    var scale;
    if (mode === 'contain' ? contentAspectRatio > boundsAspectRatio : contentAspectRatio < boundsAspectRatio) {
        scale = boundsSize.width / contentSize.width;
    }
    else {
        scale = boundsSize.height / contentSize.height;
    }
    var finalScale = Math.min(maxScale, scale);
    return {
        width: contentSize.width * finalScale,
        height: contentSize.height * finalScale
    };
}
/**
 * Calculates a number's precision based on the number of trailing
 * zeros if the number does not have a decimal indicated by a negative
 * precision. Otherwise, it calculates the number of digits after
 * the decimal point indicated by a positive precision.
 * @param value - the value to determine the precision of
 */
function calculatePrecision(value) {
    /**
     * Group 1:
     * [1-9]([0]+$) matches trailing zeros
     * Group 2:
     * \.([0-9]*) matches all digits after a decimal point.
     */
    var groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
    if (!groups) {
        return 0;
    }
    if (groups[1]) {
        return -groups[1].length;
    }
    if (groups[2]) {
        return groups[2].length;
    }
    return 0;
}
/**
 * Rounds a number to a certain level of precision. Accepts negative precision.
 * @param value - The value that is being rounded.
 * @param precision - The number of decimal places to round the number to
 */
function precisionRound(value, precision, base) {
    if (base === void 0) { base = 10; }
    var exp = Math.pow(base, precision);
    return Math.round(value * exp) / exp;
}
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/memoize.js":
/*!*********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/memoize.js ***!
  \*********************************************************/
/*! exports provided: setMemoizeWeakMap, resetMemoizations, memoize, memoizeFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMemoizeWeakMap", function() { return setMemoizeWeakMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetMemoizations", function() { return resetMemoizations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return memoize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoizeFunction", function() { return memoizeFunction; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");

var stylesheet = _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
if (stylesheet && stylesheet.onReset) {
    _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance().onReset(resetMemoizations);
}
var _resetCounter = 0;
var _emptyObject = { empty: true };
var _dictionary = {};
var _weakMap = typeof WeakMap === 'undefined' ? null : WeakMap;
/**
 *  Test utility for providing a custom weakmap.
 *
 * @internal
 * */
function setMemoizeWeakMap(weakMap) {
    _weakMap = weakMap;
}
/**
 * Reset memoizations.
 */
function resetMemoizations() {
    _resetCounter++;
}
/**
 * Memoize decorator to be used on class methods. Note that the "this" reference
 * will be inaccessible within a memoized method, given that a cached method's this
 * would not be instance specific.
 *
 * @public
 */
function memoize(target, key, descriptor) {
    // We bind to "null" to prevent people from inadvertently pulling values from "this",
    // rather than passing them in as input values which can be memoized.
    var fn = memoizeFunction(descriptor.value && descriptor.value.bind(null));
    return {
        configurable: true,
        get: function () {
            return fn;
        }
    };
}
/**
 * Memoizes a function; when you pass in the same parameters multiple times, it returns a cached result.
 * Be careful when passing in objects, you need to pass in the same INSTANCE for caching to work. Otherwise
 * it will grow the cache unnecessarily. Also avoid using default values that evaluate functions; passing in
 * undefined for a value and relying on a default function will execute it the first time, but will not
 * re-evaluate subsequent times which may have been unexpected.
 *
 * By default, the cache will reset after 100 permutations, to avoid abuse cases where the function is
 * unintendedly called with unique objects. Without a reset, the cache could grow infinitely, so we safeguard
 * by resetting. To override this behavior, pass a value of 0 to the maxCacheSize parameter.
 *
 * @public
 * @param cb - The function to memoize.
 * @param maxCacheSize - Max results to cache. If the cache exceeds this value, it will reset on the next call.
 * @returns A memoized version of the function.
 */
function memoizeFunction(cb, maxCacheSize) {
    if (maxCacheSize === void 0) { maxCacheSize = 100; }
    // Avoid breaking scenarios which don't have weak map.
    if (!_weakMap) {
        return cb;
    }
    var rootNode;
    var cacheSize = 0;
    var localResetCounter = _resetCounter;
    // tslint:disable-next-line:no-function-expression
    return function memoizedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var currentNode = rootNode;
        if (rootNode === undefined || localResetCounter !== _resetCounter || (maxCacheSize > 0 && cacheSize > maxCacheSize)) {
            rootNode = _createNode();
            cacheSize = 0;
            localResetCounter = _resetCounter;
        }
        currentNode = rootNode;
        // Traverse the tree until we find the match.
        for (var i = 0; i < args.length; i++) {
            var arg = _normalizeArg(args[i]);
            if (!currentNode.map.has(arg)) {
                currentNode.map.set(arg, _createNode());
            }
            currentNode = currentNode.map.get(arg);
        }
        if (!currentNode.hasOwnProperty('value')) {
            currentNode.value = cb.apply(void 0, args);
            cacheSize++;
        }
        return currentNode.value;
    };
}
function _normalizeArg(val) {
    if (!val) {
        return _emptyObject;
    }
    else if (typeof val === 'object' || typeof val === 'function') {
        return val;
    }
    else if (!_dictionary[val]) {
        _dictionary[val] = { val: val };
    }
    return _dictionary[val];
}
function _createNode() {
    return {
        map: _weakMap ? new _weakMap() : null
    };
}
//# sourceMappingURL=memoize.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/merge.js":
/*!*******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/merge.js ***!
  \*******************************************************/
/*! exports provided: merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/**
 * Simple deep merge function. Takes all arguments and returns a deep copy of the objects merged
 * together in the order provided. If an object creates a circular reference, it will assign the
 * original reference.
 */
function merge(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        _merge(target || {}, arg);
    }
    return target;
}
/**
 * The _merge helper iterates through all props on source and assigns them to target.
 * When the value is an object, we will create a deep clone of the object. However if
 * there is a circular reference, the value will not be deep cloned and will persist
 * the reference.
 */
// tslint:disable-next-line:no-any
function _merge(target, source, circularReferences) {
    if (circularReferences === void 0) { circularReferences = []; }
    circularReferences.push(source);
    for (var name_1 in source) {
        if (source.hasOwnProperty(name_1)) {
            var value = source[name_1];
            if (typeof value === 'object') {
                var isCircularReference = circularReferences.indexOf(value) > -1;
                target[name_1] = isCircularReference ? value : _merge(target[name_1] || {}, value, circularReferences);
            }
            else {
                target[name_1] = value;
            }
        }
    }
    circularReferences.pop();
    return target;
}
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/mobileDetector.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/mobileDetector.js ***!
  \****************************************************************/
/*! exports provided: isIOS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return isIOS; });
/**
 * Returns true if and only if the user is on a iOS device.
 * Used to determine whether iOS-specific behavior should be applied.
 */
var isIOS = function () {
    if (!window || !window.navigator || !window.navigator.userAgent) {
        return false;
    }
    return /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
};
//# sourceMappingURL=mobileDetector.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/object.js":
/*!********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/object.js ***!
  \********************************************************/
/*! exports provided: shallowCompare, assign, filteredAssign, getId, resetIds, mapEnumByName, values */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowCompare", function() { return shallowCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filteredAssign", function() { return filteredAssign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getId", function() { return getId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetIds", function() { return resetIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapEnumByName", function() { return mapEnumByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");

// Initialize global window id.
var CURRENT_ID_PROPERTY = '__currentId__';
var DEFAULT_ID_STRING = 'id__';
// tslint:disable-next-line:no-any
var _global = (typeof window !== 'undefined' && window) || process;
if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0;
}
// tslint:disable-next-line:no-any
function checkProperties(a, b) {
    for (var propName in a) {
        if (a.hasOwnProperty(propName)) {
            if (!b.hasOwnProperty(propName) || b[propName] !== a[propName]) {
                return false;
            }
        }
    }
    return true;
}
/**
 * Compares a to b and b to a.
 *
 * @public
 */
function shallowCompare(a, b) {
    return checkProperties(a, b) && checkProperties(b, a);
}
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @public
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return filteredAssign.apply(this, [null, target].concat(args));
}
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @public
 * @param isAllowed - Callback to determine if the given propName is allowed in the result.
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any
function filteredAssign(isAllowed, target) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    target = target || {};
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var sourceObject = args_1[_a];
        if (sourceObject) {
            for (var propName in sourceObject) {
                if (sourceObject.hasOwnProperty(propName) && (!isAllowed || isAllowed(propName))) {
                    target[propName] = sourceObject[propName];
                }
            }
        }
    }
    return target;
}
// Configure ids to reset on stylesheet resets.
var stylesheet = _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_0__["Stylesheet"].getInstance();
if (stylesheet && stylesheet.onReset) {
    stylesheet.onReset(resetIds);
}
/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
function getId(prefix) {
    var index = _global[CURRENT_ID_PROPERTY]++;
    return (prefix || DEFAULT_ID_STRING) + index;
}
/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */
function resetIds(counter) {
    if (counter === void 0) { counter = 0; }
    _global[CURRENT_ID_PROPERTY] = counter;
}
/* Takes an enum and iterates over each value of the enum (as a string), running the callback on each, returning a mapped array.
 * The callback takes as a first parameter the string that represents the name of the entry, and the second parameter is the
 * value of that entry, which is the value you'd normally use when using the enum (usually a number).
 * */
function mapEnumByName(
// tslint:disable-next-line:no-any
theEnum, callback) {
    // map<any> to satisfy compiler since it doesn't realize we strip out undefineds in the .filter() call
    return Object.keys(theEnum)
        .map(function (p) {
        // map on each property name as a string
        if (String(Number(p)) !== p) {
            // if the property is not just a number (because enums in TypeScript will map both ways)
            return callback(p, theEnum[p]);
        }
    })
        .filter(function (v) { return !!v; }); // only return elements with values
}
/**
 * Get all values in an object dictionary
 *
 * @param obj - The dictionary to get values for
 */
// tslint:disable-next-line:no-any
function values(obj) {
    return Object.keys(obj).reduce(function (arr, key) {
        arr.push(obj[key]);
        return arr;
    }, []);
}
//# sourceMappingURL=object.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/overflow.js":
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/overflow.js ***!
  \**********************************************************/
/*! exports provided: hasHorizontalOverflow, hasVerticalOverflow, hasOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasHorizontalOverflow", function() { return hasHorizontalOverflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasVerticalOverflow", function() { return hasVerticalOverflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOverflow", function() { return hasOverflow; });
/**
 * Detects whether an element's content has horizontal overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
function hasHorizontalOverflow(element) {
    return element.clientWidth < element.scrollWidth;
}
/**
 * Detects whether an element's content has vertical overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
function hasVerticalOverflow(element) {
    return element.clientHeight < element.scrollHeight;
}
/**
 * Detects whether an element's content has overflow in any direction
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
function hasOverflow(element) {
    return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
//# sourceMappingURL=overflow.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/properties.js":
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/properties.js ***!
  \************************************************************/
/*! exports provided: baseElementEvents, baseElementProperties, htmlElementProperties, anchorProperties, buttonProperties, divProperties, inputProperties, textAreaProperties, imageProperties, getNativeProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseElementEvents", function() { return baseElementEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseElementProperties", function() { return baseElementProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlElementProperties", function() { return htmlElementProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anchorProperties", function() { return anchorProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttonProperties", function() { return buttonProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divProperties", function() { return divProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputProperties", function() { return inputProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textAreaProperties", function() { return textAreaProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageProperties", function() { return imageProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNativeProps", function() { return getNativeProps; });
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "./node_modules/@uifabric/utilities/lib/object.js");

/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
var baseElementEvents = [
    'onCopy',
    'onCut',
    'onPaste',
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
    'onFocus',
    'onFocusCapture',
    'onBlur',
    'onBlurCapture',
    'onChange',
    'onInput',
    'onSubmit',
    'onLoad',
    'onError',
    'onKeyDown',
    'onKeyDownCapture',
    'onKeyPress',
    'onKeyUp',
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
    'onClick',
    'onClickCapture',
    'onContextMenu',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseDownCapture',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onMouseUpCapture',
    'onSelect',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onScroll',
    'onWheel'
];
/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
var baseElementProperties = [
    'defaultChecked',
    'defaultValue',
    'accept',
    'acceptCharset',
    'accessKey',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'children',
    'classID',
    'className',
    'cols',
    'colSpan',
    'content',
    'contentEditable',
    'contextMenu',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'dir',
    'download',
    'draggable',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'hidden',
    'high',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'icon',
    'id',
    'inputMode',
    'integrity',
    'is',
    'keyParams',
    'keyType',
    'kind',
    'lang',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'poster',
    'preload',
    'radioGroup',
    'readOnly',
    'rel',
    'required',
    'role',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'spellCheck',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'style',
    'summary',
    'tabIndex',
    'title',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap'
];
/**
 * An array of HTML element properties and events.
 *
 * @public
 */
var htmlElementProperties = baseElementProperties.concat(baseElementEvents);
/**
 * An array of A tag properties and events.
 *
 * @public
 */
var anchorProperties = htmlElementProperties.concat(['href', 'target']);
/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
var buttonProperties = htmlElementProperties.concat(['disabled']);
/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
var divProperties = htmlElementProperties.concat(['align', 'noWrap']);
/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
var inputProperties = buttonProperties;
/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
var textAreaProperties = buttonProperties;
/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
var imageProperties = divProperties;
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
function getNativeProps(props, allowedPropNames, excludedPropNames) {
    return Object(_object__WEBPACK_IMPORTED_MODULE_0__["filteredAssign"])(function (propName) {
        return ((!excludedPropNames || excludedPropNames.indexOf(propName) < 0) &&
            (propName.indexOf('data-') === 0 || propName.indexOf('aria-') === 0 || allowedPropNames.indexOf(propName) >= 0));
    }, {}, props);
}
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/resources.js":
/*!***********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/resources.js ***!
  \***********************************************************/
/*! exports provided: getResourceUrl, setBaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourceUrl", function() { return getResourceUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBaseUrl", function() { return setBaseUrl; });
var _baseUrl = '';
/** Sets the current base url used for fetching images. */
function getResourceUrl(url) {
    return _baseUrl + url;
}
/** Gets the current base url used for fetching images. */
function setBaseUrl(baseUrl) {
    _baseUrl = baseUrl;
}
//# sourceMappingURL=resources.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/rtl.js":
/*!*****************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/rtl.js ***!
  \*****************************************************/
/*! exports provided: getRTL, setRTL, getRTLSafeKeyCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRTL", function() { return getRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRTL", function() { return setRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRTLSafeKeyCode", function() { return getRTLSafeKeyCode; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* harmony import */ var _sessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionStorage */ "./node_modules/@uifabric/utilities/lib/sessionStorage.js");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");



var RTL_LOCAL_STORAGE_KEY = 'isRTL';
// Default to undefined so that we initialize on first read.
var _isRTL;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
function getRTL() {
    if (_isRTL === undefined) {
        // Fabric supports persisting the RTL setting between page refreshes via session storage
        var savedRTL = Object(_sessionStorage__WEBPACK_IMPORTED_MODULE_1__["getItem"])(RTL_LOCAL_STORAGE_KEY);
        if (savedRTL !== null) {
            _isRTL = savedRTL === '1';
            setRTL(_isRTL);
        }
        var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
        if (_isRTL === undefined && doc) {
            _isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
            Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["setRTL"])(_isRTL);
        }
    }
    return !!_isRTL;
}
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
function setRTL(isRTL, persistSetting) {
    if (persistSetting === void 0) { persistSetting = false; }
    var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
    if (doc) {
        doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    if (persistSetting) {
        Object(_sessionStorage__WEBPACK_IMPORTED_MODULE_1__["setItem"])(RTL_LOCAL_STORAGE_KEY, isRTL ? '1' : '0');
    }
    _isRTL = isRTL;
    Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["setRTL"])(_isRTL);
}
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
function getRTLSafeKeyCode(key) {
    if (getRTL()) {
        if (key === 37 /* left */) {
            key = 39 /* right */;
        }
        else if (key === 39 /* right */) {
            key = 37 /* left */;
        }
    }
    return key;
}
//# sourceMappingURL=rtl.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/scroll.js":
/*!********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/scroll.js ***!
  \********************************************************/
/*! exports provided: DATA_IS_SCROLLABLE_ATTRIBUTE, allowScrollOnElement, disableBodyScroll, enableBodyScroll, getScrollbarWidth, findScrollableParent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_IS_SCROLLABLE_ATTRIBUTE", function() { return DATA_IS_SCROLLABLE_ATTRIBUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allowScrollOnElement", function() { return allowScrollOnElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableBodyScroll", function() { return disableBodyScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableBodyScroll", function() { return enableBodyScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return getScrollbarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findScrollableParent", function() { return findScrollableParent; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/@uifabric/utilities/lib/dom.js");
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");


var _scrollbarWidth;
var _bodyScrollDisabledCount = 0;
var DisabledScrollClassName = Object(_uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_1__["mergeStyles"])({
    overflow: 'hidden !important'
});
/**
 * Placing this attribute on scrollable divs optimizes detection to know
 * if the div is scrollable or not (given we can avoid expensive operations
 * like getComputedStyle.)
 *
 * @public
 */
var DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
var _makeElementScrollAllower = function () {
    var _previousClientY = 0;
    var _element = null;
    // remember the clientY for future calls of _preventOverscrolling
    var _saveClientY = function (event) {
        if (event.targetTouches.length === 1) {
            _previousClientY = event.targetTouches[0].clientY;
        }
    };
    // prevent the body from scrolling when the user attempts
    // to scroll past the top or bottom of the element
    var _preventOverscrolling = function (event) {
        // only respond to a single-finger touch
        if (event.targetTouches.length !== 1) {
            return;
        }
        // prevent the body touchmove handler from firing
        // so that scrolling is allowed within the element
        event.stopPropagation();
        if (!_element) {
            return;
        }
        var clientY = event.targetTouches[0].clientY - _previousClientY;
        // if the element is scrolled to the top,
        // prevent the user from scrolling up
        if (_element.scrollTop === 0 && clientY > 0) {
            event.preventDefault();
        }
        // if the element is scrolled to the bottom,
        // prevent the user from scrolling down
        if (_element.scrollHeight - _element.scrollTop <= _element.clientHeight && clientY < 0) {
            event.preventDefault();
        }
    };
    return function (element, events) {
        if (!element) {
            return;
        }
        events.on(element, 'touchstart', _saveClientY);
        events.on(element, 'touchmove', _preventOverscrolling);
        _element = element;
    };
};
/**
 * Allows the user to scroll within a element,
 * while preventing the user from scrolling the body
 */
var allowScrollOnElement = _makeElementScrollAllower();
var _disableIosBodyScroll = function (event) {
    event.preventDefault();
};
/**
 * Disables the body scrolling.
 *
 * @public
 */
function disableBodyScroll() {
    var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
    if (doc && doc.body && !_bodyScrollDisabledCount) {
        doc.body.classList.add(DisabledScrollClassName);
        doc.body.addEventListener('touchmove', _disableIosBodyScroll, { passive: false, capture: false });
    }
    _bodyScrollDisabledCount++;
}
/**
 * Enables the body scrolling.
 *
 * @public
 */
function enableBodyScroll() {
    if (_bodyScrollDisabledCount > 0) {
        var doc = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getDocument"])();
        if (doc && doc.body && _bodyScrollDisabledCount === 1) {
            doc.body.classList.remove(DisabledScrollClassName);
            doc.body.removeEventListener('touchmove', _disableIosBodyScroll);
        }
        _bodyScrollDisabledCount--;
    }
}
/**
 * Calculates the width of a scrollbar for the browser/os.
 *
 * @public
 */
function getScrollbarWidth() {
    if (_scrollbarWidth === undefined) {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.setProperty('width', '100px');
        scrollDiv.style.setProperty('height', '100px');
        scrollDiv.style.setProperty('overflow', 'scroll');
        scrollDiv.style.setProperty('position', 'absolute');
        scrollDiv.style.setProperty('top', '-9999px');
        document.body.appendChild(scrollDiv);
        // Get the scrollbar width
        _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        // Delete the DIV
        document.body.removeChild(scrollDiv);
    }
    return _scrollbarWidth;
}
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 *
 * @public
 */
function findScrollableParent(startingElement) {
    var el = startingElement;
    // First do a quick scan for the scrollable attribute.
    while (el && el !== document.body) {
        if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
            return el;
        }
        el = el.parentElement;
    }
    // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
    el = startingElement;
    while (el && el !== document.body) {
        if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
            var computedStyles = getComputedStyle(el);
            var overflowY = computedStyles ? computedStyles.getPropertyValue('overflow-y') : '';
            if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
                return el;
            }
        }
        el = el.parentElement;
    }
    // Fall back to window scroll.
    if (!el || el === document.body) {
        // tslint:disable-next-line:no-any
        el = window;
    }
    return el;
}
//# sourceMappingURL=scroll.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/sessionStorage.js":
/*!****************************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/sessionStorage.js ***!
  \****************************************************************/
/*! exports provided: getItem, setItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItem", function() { return getItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setItem", function() { return setItem; });
/**
 * Fetches an item from session storage without throwing an exception
 * @param key The key of the item to fetch from session storage
 */
function getItem(key) {
    var result = null;
    try {
        result = window.sessionStorage.getItem(key);
    }
    catch (e) {
        /* Eat the exception */
    }
    return result;
}
/**
 * Inserts an item into session storage without throwing an exception
 * @param key The key of the item to add to session storage
 * @param data The data to put into session storage
 */
function setItem(key, data) {
    try {
        window.sessionStorage.setItem(key, data);
    }
    catch (e) {
        /* Eat the exception */
    }
}
//# sourceMappingURL=sessionStorage.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/string.js":
/*!********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/string.js ***!
  \********************************************************/
/*! exports provided: format */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
// Regex that finds { and } so they can be removed on a lookup for string format
var FORMAT_ARGS_REGEX = /[\{\}]/g;
// Regex that finds {#} so it can be replaced by the arguments in string format
var FORMAT_REGEX = /\{\d+\}/g;
/**
 * String format method, used for scenarios where at runtime you
 * need to evaluate a formatted string given a tokenized string. This
 * usually only is needed in localization scenarios.

 * @example
 * ```tsx
 * "I love {0} every {1}".format("CXP")
 * ```
 * will result in a Debug Exception.
 *
 * @public
 */
// tslint:disable-next-line:no-any
function format(s) {
    'use strict';
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var args = values;
    // Callback match function
    function replace_func(match) {
        // looks up in the args
        // tslint:disable-next-line:no-any
        var replacement = args[match.replace(FORMAT_ARGS_REGEX, '')];
        // catches undefined in nondebug and null in debug and nondebug
        if (replacement === null || replacement === undefined) {
            replacement = '';
        }
        return replacement;
    }
    return s.replace(FORMAT_REGEX, replace_func);
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/styled.js":
/*!********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/styled.js ***!
  \********************************************************/
/*! exports provided: styled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styled", function() { return styled; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uifabric/merge-styles */ "./node_modules/@uifabric/merge-styles/lib/index.js");
/* harmony import */ var _Customizations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Customizations */ "./node_modules/@uifabric/utilities/lib/Customizations.js");
/* harmony import */ var _Customizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Customizer */ "./node_modules/@uifabric/utilities/lib/Customizer.js");





var DefaultFields = ['theme', 'styles'];
/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets.
 *
 * @example
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   props => ({ root: { background: 'red' }})
 * );
 * ```
 * @param Component - The unstyled base component to render, which receives styles.
 * @param baseStyles - The styles which should be curried with the component.
 * @param getProps - A helper which provides default props.
 * @param customizable - An object which defines which props can be customized using the Customizer.
 */
function styled(Component, baseStyles, getProps, customizable) {
    var Wrapped = function (componentProps) {
        customizable = customizable || { scope: '', fields: undefined };
        var scope = customizable.scope, _a = customizable.fields, fields = _a === void 0 ? DefaultFields : _a;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Customizer__WEBPACK_IMPORTED_MODULE_4__["CustomizerContext"].Consumer, null, function (context) {
            var settings = _Customizations__WEBPACK_IMPORTED_MODULE_3__["Customizations"].getSettings(fields, scope, context.customizations);
            var customizedStyles = settings.styles, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](settings, ["styles"]);
            var styles = function (styleProps) { return _resolve(styleProps, baseStyles, customizedStyles, componentProps.styles); };
            var additionalProps = getProps ? getProps(componentProps) : undefined;
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Component, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rest, additionalProps, componentProps, { styles: styles }));
        }));
    };
    Wrapped.displayName = "Styled" + (Component.displayName || Component.name);
    return Wrapped;
}
function _resolve(styleProps) {
    var allStyles = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        allStyles[_i - 1] = arguments[_i];
    }
    var result = [];
    for (var _a = 0, allStyles_1 = allStyles; _a < allStyles_1.length; _a++) {
        var styles = allStyles_1[_a];
        if (styles) {
            result.push(typeof styles === 'function' ? styles(styleProps) : styles);
        }
    }
    if (result.length) {
        // cliffkoh: I cannot figure out how to avoid the cast to any here.
        // It is something to do with the use of Omit in IStyleSet.
        // It might not be necessary once  Omit becomes part of lib.d.ts (when we remove our own Omit and rely on
        // the official version).
        // tslint:disable-next-line:no-any
        return _uifabric_merge_styles__WEBPACK_IMPORTED_MODULE_2__["concatStyleSets"].apply(void 0, result);
    }
    return undefined;
}
//# sourceMappingURL=styled.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/version.js":
/*!*********************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/version.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "./node_modules/@uifabric/set-version/lib/index.js");
// @uifabric/utilities@6.23.1
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/utilities', '6.23.1');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@uifabric/utilities/lib/warn.js":
/*!******************************************************!*\
  !*** ./node_modules/@uifabric/utilities/lib/warn.js ***!
  \******************************************************/
/*! exports provided: warnDeprecations, warnMutuallyExclusive, warnConditionallyRequiredProps, warn, setWarningCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnDeprecations", function() { return warnDeprecations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnMutuallyExclusive", function() { return warnMutuallyExclusive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnConditionallyRequiredProps", function() { return warnConditionallyRequiredProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setWarningCallback", function() { return setWarningCallback; });
var _warningCallback = undefined;
/**
 * Warns when a deprecated props are being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
function warnDeprecations(componentName, props, deprecationMap) {
    for (var propName in deprecationMap) {
        if (props && propName in props) {
            var deprecationMessage = componentName + " property '" + propName + "' was used but has been deprecated.";
            var replacementPropName = deprecationMap[propName];
            if (replacementPropName) {
                deprecationMessage += " Use '" + replacementPropName + "' instead.";
            }
            warn(deprecationMessage);
        }
    }
}
/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */
function warnMutuallyExclusive(componentName, props, exclusiveMap) {
    for (var propName in exclusiveMap) {
        if (props && propName in props) {
            var propInExclusiveMapValue = exclusiveMap[propName];
            if (propInExclusiveMapValue && propInExclusiveMapValue in props) {
                warn(componentName + " property '" + propName + "' is mutually exclusive with '" + exclusiveMap[propName] + "'. Use one or the other.");
            }
        }
    }
}
/**
 * Warns when props are required if a condition is met.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param requiredProps - The name of the props that are required when the condition is met.
 * @param conditionalPropName - The name of the prop that the condition is based on.
 * @param condition - Whether the condition is met.
 */
function warnConditionallyRequiredProps(componentName, props, requiredProps, conditionalPropName, condition) {
    if (condition === true) {
        for (var _i = 0, requiredProps_1 = requiredProps; _i < requiredProps_1.length; _i++) {
            var requiredPropName = requiredProps_1[_i];
            if (!(requiredPropName in props)) {
                warn(componentName + " property '" + requiredPropName + "' is required when '" + conditionalPropName + "' is used.'");
            }
        }
    }
}
/**
 * Sends a warning to console, if the api is present.
 *
 * @public
 * @param message - Warning message.
 */
function warn(message) {
    if (_warningCallback) {
        _warningCallback(message);
    }
    else if (console && console.warn) {
        console.warn(message);
    }
}
/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @public
 * @param warningCallback - Callback to override the generated warnings.
 */
function setWarningCallback(warningCallback) {
    _warningCallback = warningCallback;
}
//# sourceMappingURL=warn.js.map

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/Fabric.js":
/*!***********************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/Fabric.js ***!
  \***********************************************************/
/*! exports provided: Fabric, FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Fabric/index */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__["Fabric"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return _components_Fabric_index__WEBPACK_IMPORTED_MODULE_0__["FabricBase"]; });


//# sourceMappingURL=Fabric.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/Styling.js":
/*!************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/Styling.js ***!
  \************************************************************/
/*! exports provided: AnimationClassNames, FontClassNames, ColorClassNames, AnimationStyles, AnimationVariables, DefaultPalette, DefaultFontStyles, registerDefaultFontFaces, FontSizes, FontWeights, IconFontSizes, createFontStyles, getFocusStyle, focusClear, hiddenContentStyle, PulsingBeaconAnimationStyles, getGlobalClassNames, ThemeSettingName, getTheme, loadTheme, createTheme, registerOnThemeChangeCallback, removeOnThemeChangeCallback, buildClassMap, getIcon, registerIcons, registerIconAlias, unregisterIcons, setIconOptions, getIconClassName, InjectionMode, Stylesheet, concatStyleSets, fontFace, keyframes, mergeStyleSets, mergeStyles, getSchemedContext, HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack, ScreenWidthMinSmall, ScreenWidthMinMedium, ScreenWidthMinLarge, ScreenWidthMinXLarge, ScreenWidthMinXXLarge, ScreenWidthMinXXXLarge, ScreenWidthMaxSmall, ScreenWidthMaxMedium, ScreenWidthMaxLarge, ScreenWidthMaxXLarge, ScreenWidthMaxXXLarge, ScreenWidthMinUhfMobile, getScreenSelector, normalize, noWrap, getFadedOverflowStyle, ZIndexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/office-ui-fabric-react/lib/version.js");
/* harmony import */ var _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/styling */ "./node_modules/@uifabric/styling/lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationClassNames", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["AnimationClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontClassNames", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["FontClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorClassNames", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ColorClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationStyles", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["AnimationStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationVariables", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["AnimationVariables"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultPalette", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["DefaultPalette"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultFontStyles", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["DefaultFontStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerDefaultFontFaces", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["registerDefaultFontFaces"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontSizes", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["FontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FontWeights", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconFontSizes", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["IconFontSizes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFontStyles", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["createFontStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFocusStyle", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusClear", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["focusClear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hiddenContentStyle", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["hiddenContentStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PulsingBeaconAnimationStyles", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["PulsingBeaconAnimationStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalClassNames", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getGlobalClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeSettingName", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ThemeSettingName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadTheme", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["loadTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTheme", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["createTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerOnThemeChangeCallback", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["registerOnThemeChangeCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeOnThemeChangeCallback", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["removeOnThemeChangeCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildClassMap", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["buildClassMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIcon", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIcons", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["registerIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerIconAlias", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["registerIconAlias"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unregisterIcons", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["unregisterIcons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setIconOptions", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["setIconOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIconClassName", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getIconClassName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InjectionMode", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["InjectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["Stylesheet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatStyleSets", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["concatStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["fontFace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["keyframes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyleSets", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["mergeStyleSets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["mergeStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSchemedContext", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getSchemedContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelector", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorWhite", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelectorWhite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighContrastSelectorBlack", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelectorBlack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinSmall", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinMedium", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinXXXLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinXXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxSmall", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxSmall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxMedium", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxMedium"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMaxXXLarge", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMaxXXLarge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenWidthMinUhfMobile", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ScreenWidthMinUhfMobile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScreenSelector", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getScreenSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noWrap", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["noWrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFadedOverflowStyle", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["getFadedOverflowStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZIndexes", function() { return _uifabric_styling__WEBPACK_IMPORTED_MODULE_1__["ZIndexes"]; });



//# sourceMappingURL=Styling.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/Utilities.js":
/*!**************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/Utilities.js ***!
  \**************************************************************/
/*! exports provided: Async, AutoScroll, BaseComponent, nullRender, provideContext, Customizations, CustomizerContext, Customizer, mergeCustomizations, DelayedRender, EventGroup, FabricPerformance, GlobalSettings, KeyCodes, Rectangle, mergeAriaAttributeValues, findIndex, find, createArray, toMatrix, removeIndex, replaceElement, addElementAtIndex, flatten, arraysEqual, asAsync, assertNever, autobind, classNamesFunction, createRef, css, customizable, DATA_PORTAL_ATTRIBUTE, setVirtualParent, getVirtualParent, getParent, getChildren, elementContains, setSSR, getWindow, getDocument, getRect, setPortalAttribute, portalContainsElement, findElementRecursive, elementContainsAttribute, getFirstFocusable, getLastFocusable, getFirstTabbable, getLastTabbable, focusFirstChild, getPreviousElement, getNextElement, isElementVisible, isElementTabbable, isElementFocusZone, isElementFocusSubZone, doesElementContainFocus, shouldWrapFocus, focusAsync, hoistMethods, unhoistMethods, hoistStatics, IsFocusVisibleClassName, initializeFocusRects, getInitials, isDirectionalKeyCode, addDirectionalKeyCode, getLanguage, setLanguage, getDistanceBetweenPoints, fitContentToBounds, calculatePrecision, precisionRound, setMemoizeWeakMap, resetMemoizations, memoize, memoizeFunction, merge, isIOS, shallowCompare, assign, filteredAssign, getId, resetIds, mapEnumByName, values, hasHorizontalOverflow, hasVerticalOverflow, hasOverflow, baseElementEvents, baseElementProperties, htmlElementProperties, anchorProperties, buttonProperties, divProperties, inputProperties, textAreaProperties, imageProperties, getNativeProps, getResourceUrl, setBaseUrl, getRTL, setRTL, getRTLSafeKeyCode, DATA_IS_SCROLLABLE_ATTRIBUTE, allowScrollOnElement, disableBodyScroll, enableBodyScroll, getScrollbarWidth, findScrollableParent, format, styled, warnDeprecations, warnMutuallyExclusive, warnConditionallyRequiredProps, warn, setWarningCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/office-ui-fabric-react/lib/version.js");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uifabric/utilities */ "./node_modules/@uifabric/utilities/lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Async"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AutoScroll", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["AutoScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nullRender", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["nullRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "provideContext", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["provideContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Customizations", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Customizations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CustomizerContext", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["CustomizerContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Customizer", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Customizer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeCustomizations", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeCustomizations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DelayedRender", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["DelayedRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventGroup", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricPerformance", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["FabricPerformance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalSettings", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["GlobalSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["KeyCodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["Rectangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAriaAttributeValues", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeAriaAttributeValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["findIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["find"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createArray", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["createArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toMatrix", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["toMatrix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeIndex", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["removeIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceElement", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["replaceElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addElementAtIndex", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["addElementAtIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["flatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["arraysEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asAsync", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["asAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertNever", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["assertNever"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["autobind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classNamesFunction", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["classNamesFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["createRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["css"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customizable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["customizable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_PORTAL_ATTRIBUTE", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["DATA_PORTAL_ATTRIBUTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setVirtualParent", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setVirtualParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getVirtualParent", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getVirtualParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChildren", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getChildren"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementContains", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["elementContains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSSR", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setSSR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getWindow", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDocument", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRect", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getRect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setPortalAttribute", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setPortalAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "portalContainsElement", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["portalContainsElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findElementRecursive", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["findElementRecursive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementContainsAttribute", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["elementContainsAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFirstFocusable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getFirstFocusable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLastFocusable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getLastFocusable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFirstTabbable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getFirstTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLastTabbable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getLastTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusFirstChild", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["focusFirstChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPreviousElement", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getPreviousElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNextElement", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getNextElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementVisible", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isElementVisible"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementTabbable", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isElementTabbable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementFocusZone", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isElementFocusZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElementFocusSubZone", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isElementFocusSubZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "doesElementContainFocus", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["doesElementContainFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shouldWrapFocus", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["shouldWrapFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusAsync", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["focusAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hoistMethods", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["hoistMethods"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unhoistMethods", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["unhoistMethods"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hoistStatics", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["hoistStatics"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IsFocusVisibleClassName", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initializeFocusRects", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["initializeFocusRects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInitials", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getInitials"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirectionalKeyCode", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isDirectionalKeyCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addDirectionalKeyCode", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["addDirectionalKeyCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLanguage", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setLanguage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenPoints", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getDistanceBetweenPoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fitContentToBounds", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["fitContentToBounds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculatePrecision", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["calculatePrecision"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "precisionRound", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["precisionRound"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setMemoizeWeakMap", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setMemoizeWeakMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetMemoizations", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["resetMemoizations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["memoize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoizeFunction", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["memoizeFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["merge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["isIOS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowCompare", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["shallowCompare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filteredAssign", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["filteredAssign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getId", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetIds", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["resetIds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapEnumByName", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["mapEnumByName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["values"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasHorizontalOverflow", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["hasHorizontalOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasVerticalOverflow", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["hasVerticalOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasOverflow", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["hasOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseElementEvents", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["baseElementEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseElementProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["baseElementProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "htmlElementProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["htmlElementProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "anchorProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["anchorProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buttonProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["buttonProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "divProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["divProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["inputProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "textAreaProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["textAreaProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "imageProperties", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["imageProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNativeProps", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getNativeProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResourceUrl", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getResourceUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setBaseUrl", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setBaseUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRTL", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getRTL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRTL", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setRTL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRTLSafeKeyCode", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getRTLSafeKeyCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_IS_SCROLLABLE_ATTRIBUTE", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["DATA_IS_SCROLLABLE_ATTRIBUTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allowScrollOnElement", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["allowScrollOnElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "disableBodyScroll", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["disableBodyScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enableBodyScroll", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["enableBodyScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["getScrollbarWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findScrollableParent", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["findScrollableParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "format", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["format"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styled", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["styled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnDeprecations", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warnDeprecations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnMutuallyExclusive", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warnMutuallyExclusive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warnConditionallyRequiredProps", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warnConditionallyRequiredProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["warn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setWarningCallback", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_1__["setWarningCallback"]; });



//# sourceMappingURL=Utilities.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.base.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.base.js ***!
  \**********************************************************************************/
/*! exports provided: FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return FabricBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "./node_modules/office-ui-fabric-react/lib/Utilities.js");
/* harmony import */ var _Fabric_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Fabric.styles */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.styles.js");




var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var FabricBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FabricBase, _super);
    function FabricBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootElement = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        _this._onMouseDown = function (ev) {
            _this.setState({ isFocusVisible: false });
        };
        _this._onKeyDown = function (ev) {
            if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["isDirectionalKeyCode"])(ev.which)) {
                _this.setState({ isFocusVisible: true });
            }
        };
        _this.state = { isFocusVisible: false };
        return _this;
    }
    FabricBase.prototype.render = function () {
        var classNames = getClassNames(_Fabric_styles__WEBPACK_IMPORTED_MODULE_3__["getStyles"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, this.state));
        var divProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["divProperties"]);
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, divProps, { className: classNames.root, ref: this._rootElement }));
    };
    FabricBase.prototype.componentDidMount = function () {
        var win = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getWindow"])(this._rootElement.value);
        if (win) {
            this._events.on(win, 'mousedown', this._onMouseDown, true);
            this._events.on(win, 'keydown', this._onKeyDown, true);
        }
    };
    return FabricBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Fabric.base.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.js ***!
  \*****************************************************************************/
/*! exports provided: Fabric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return Fabric; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "./node_modules/office-ui-fabric-react/lib/Utilities.js");
/* harmony import */ var _Fabric_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fabric.base */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.base.js");
/* harmony import */ var _Fabric_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fabric.styles */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.styles.js");



var Fabric = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Fabric_base__WEBPACK_IMPORTED_MODULE_1__["FabricBase"], _Fabric_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Fabric'
});
//# sourceMappingURL=Fabric.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.styles.js":
/*!************************************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.styles.js ***!
  \************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "./node_modules/office-ui-fabric-react/lib/Styling.js");

var inheritFont = { fontFamily: 'inherit' };
var GlobalClassNames = {
    root: 'ms-Fabric'
};
var getStyles = function (props) {
    var theme = props.theme, className = props.className, isFocusVisible = props.isFocusVisible;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            isFocusVisible && 'is-focusVisible',
            theme.fonts.medium,
            {
                color: theme.palette.neutralPrimary,
                selectors: {
                    '& button': inheritFont,
                    '& input': inheritFont,
                    '& textarea': inheritFont,
                    ':global(button)': {
                        overflow: 'visible',
                        margin: 0
                    }
                }
            },
            className
        ]
    };
};
//# sourceMappingURL=Fabric.styles.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/components/Fabric/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/components/Fabric/index.js ***!
  \****************************************************************************/
/*! exports provided: Fabric, FabricBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fabric */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fabric", function() { return _Fabric__WEBPACK_IMPORTED_MODULE_0__["Fabric"]; });

/* harmony import */ var _Fabric_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fabric.base */ "./node_modules/office-ui-fabric-react/lib/components/Fabric/Fabric.base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FabricBase", function() { return _Fabric_base__WEBPACK_IMPORTED_MODULE_1__["FabricBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/office-ui-fabric-react/lib/version.js":
/*!************************************************************!*\
  !*** ./node_modules/office-ui-fabric-react/lib/version.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "./node_modules/@uifabric/set-version/lib/index.js");
// office-ui-fabric-react@6.91.0
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('office-ui-fabric-react', '6.91.0');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.production.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.production.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.6.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(/*! react */ "./node_modules/react/index.js"),n=__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),da=__webpack_require__(/*! scheduler */ "./node_modules/scheduler/index.js");function ea(a,b,c,d,e,f,g,h){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var k=[c,d,e,f,g,h],l=0;a=Error(b.replace(/%s/g,function(){return k[l++]}));a.name="Invariant Violation"}a.framesToPop=1;throw a;}}
function r(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);ea(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}aa?void 0:r("227");function fa(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}
var ha=!1,ia=null,ja=!1,ka=null,la={onError:function(a){ha=!0;ia=a}};function ma(a,b,c,d,e,f,g,h,k){ha=!1;ia=null;fa.apply(la,arguments)}function na(a,b,c,d,e,f,g,h,k){ma.apply(this,arguments);if(ha){if(ha){var l=ia;ha=!1;ia=null}else r("198"),l=void 0;ja||(ja=!0,ka=l)}}var oa=null,pa={};
function qa(){if(oa)for(var a in pa){var b=pa[a],c=oa.indexOf(a);-1<c?void 0:r("96",a);if(!ra[c]){b.extractEvents?void 0:r("97",a);ra[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;sa.hasOwnProperty(h)?r("99",h):void 0;sa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ta(k[e],g,h);e=!0}else f.registrationName?(ta(f.registrationName,g,h),e=!0):e=!1;e?void 0:r("98",d,a)}}}}
function ta(a,b,c){ua[a]?r("100",a):void 0;ua[a]=b;va[a]=b.eventTypes[c].dependencies}var ra=[],sa={},ua={},va={},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);na(b,c,void 0,a);a.currentTarget=null}function Aa(a,b){null==b?r("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ca=null;function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}
var Ga={injectEventPluginOrder:function(a){oa?r("101"):void 0;oa=Array.prototype.slice.call(a);qa()},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];pa.hasOwnProperty(c)&&pa[c]===d||(pa[c]?r("102",c):void 0,pa[c]=d,b=!0)}b&&qa()}};
function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?r("231",b,typeof c):void 0;
return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;if(a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?r("95"):void 0,ja))throw b=ka,ja=!1,ka=null,b;}var Ka=Math.random().toString(36).slice(2),La="__reactInternalInstance$"+Ka,Ma="__reactEventHandlers$"+Ka;function Na(a){if(a[La])return a[La];for(;!a[La];)if(a.parentNode)a=a.parentNode;else return null;a=a[La];return 5===a.tag||6===a.tag?a:null}function Oa(a){a=a[La];return!a||5!==a.tag&&6!==a.tag?null:a}
function Pa(a){if(5===a.tag||6===a.tag)return a.stateNode;r("33")}function Qa(a){return a[Ma]||null}function Ra(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a)}
function Ta(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=Ra(b);for(b=c.length;0<b--;)Sa(c[b],"captured",a);for(b=0;b<c.length;b++)Sa(c[b],"bubbled",a)}}function Ua(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a))}function Va(a){a&&a.dispatchConfig.registrationName&&Ua(a._targetInst,null,a)}
function Wa(a){Ba(a,Ta)}var Xa=!("undefined"===typeof window||!window.document||!window.document.createElement);function Ya(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Za={animationend:Ya("Animation","AnimationEnd"),animationiteration:Ya("Animation","AnimationIteration"),animationstart:Ya("Animation","AnimationStart"),transitionend:Ya("Transition","TransitionEnd")},$a={},ab={};
Xa&&(ab=document.createElement("div").style,"AnimationEvent"in window||(delete Za.animationend.animation,delete Za.animationiteration.animation,delete Za.animationstart.animation),"TransitionEvent"in window||delete Za.transitionend.transition);function bb(a){if($a[a])return $a[a];if(!Za[a])return a;var b=Za[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in ab)return $a[a]=b[c];return a}
var cb=bb("animationend"),ib=bb("animationiteration"),jb=bb("animationstart"),kb=bb("transitionend"),lb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mb=null,nb=null,ob=null;
function pb(){if(ob)return ob;var a,b=nb,c=b.length,d,e="value"in mb?mb.value:mb.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return ob=e.slice(a,1<d?1-d:void 0)}function qb(){return!0}function rb(){return!1}
function y(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?qb:rb;this.isPropagationStopped=rb;return this}
n(y.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=qb)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=qb)},persist:function(){this.isPersistent=qb},isPersistent:rb,destructor:function(){var a=this.constructor.Interface,
b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=rb;this._dispatchInstances=this._dispatchListeners=null}});y.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
y.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;n(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=n({},d.Interface,a);c.extend=d.extend;sb(c);return c};sb(y);function tb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function ub(a){a instanceof this?void 0:r("279");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}
function sb(a){a.eventPool=[];a.getPooled=tb;a.release=ub}var vb=y.extend({data:null}),wb=y.extend({data:null}),xb=[9,13,27,32],yb=Xa&&"CompositionEvent"in window,zb=null;Xa&&"documentMode"in document&&(zb=document.documentMode);
var Ab=Xa&&"TextEvent"in window&&!zb,Bb=Xa&&(!yb||zb&&8<zb&&11>=zb),Cb=String.fromCharCode(32),Db={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Eb=!1;
function Fb(a,b){switch(a){case "keyup":return-1!==xb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Gb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Hb=!1;function Kb(a,b){switch(a){case "compositionend":return Gb(b);case "keypress":if(32!==b.which)return null;Eb=!0;return Cb;case "textInput":return a=b.data,a===Cb&&Eb?null:a;default:return null}}
function Lb(a,b){if(Hb)return"compositionend"===a||!yb&&Fb(a,b)?(a=pb(),ob=nb=mb=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return Bb&&"ko"!==b.locale?null:b.data;default:return null}}
var Mb={eventTypes:Db,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(yb)b:{switch(a){case "compositionstart":e=Db.compositionStart;break b;case "compositionend":e=Db.compositionEnd;break b;case "compositionupdate":e=Db.compositionUpdate;break b}e=void 0}else Hb?Fb(a,c)&&(e=Db.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Db.compositionStart);e?(Bb&&"ko"!==c.locale&&(Hb||e!==Db.compositionStart?e===Db.compositionEnd&&Hb&&(f=pb()):(mb=d,nb="value"in mb?mb.value:mb.textContent,Hb=
!0)),e=vb.getPooled(e,b,c,d),f?e.data=f:(f=Gb(c),null!==f&&(e.data=f)),Wa(e),f=e):f=null;(a=Ab?Kb(a,c):Lb(a,c))?(b=wb.getPooled(Db.beforeInput,b,c,d),b.data=a,Wa(b)):b=null;return null===f?b:null===b?f:[f,b]}},Nb=null,Ob=null,Pb=null;function Vb(a){if(a=xa(a)){"function"!==typeof Nb?r("280"):void 0;var b=wa(a.stateNode);Nb(a.stateNode,a.type,b)}}function Wb(a){Ob?Pb?Pb.push(a):Pb=[a]:Ob=a}function Xb(){if(Ob){var a=Ob,b=Pb;Pb=Ob=null;Vb(a);if(b)for(a=0;a<b.length;a++)Vb(b[a])}}
function Yb(a,b){return a(b)}function Zb(a,b,c){return a(b,c)}function $b(){}var ac=!1;function bc(a,b){if(ac)return a(b);ac=!0;try{return Yb(a,b)}finally{if(ac=!1,null!==Ob||null!==Pb)$b(),Xb()}}var cc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!cc[a.type]:"textarea"===b?!0:!1}
function ec(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function fc(a){if(!Xa)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function gc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function hc(a){var b=gc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function ic(a){a._valueTracker||(a._valueTracker=hc(a))}function jc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=gc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var kc=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,lc=/^(.*)[\\\/]/,D="function"===typeof Symbol&&Symbol.for,mc=D?Symbol.for("react.element"):60103,nc=D?Symbol.for("react.portal"):60106,oc=D?Symbol.for("react.fragment"):60107,pc=D?Symbol.for("react.strict_mode"):60108,qc=D?Symbol.for("react.profiler"):60114,rc=D?Symbol.for("react.provider"):60109,sc=D?Symbol.for("react.context"):60110,tc=D?Symbol.for("react.concurrent_mode"):60111,uc=D?Symbol.for("react.forward_ref"):60112,vc=D?Symbol.for("react.suspense"):
60113,wc=D?Symbol.for("react.memo"):60115,xc=D?Symbol.for("react.lazy"):60116,yc="function"===typeof Symbol&&Symbol.iterator;function zc(a){if(null===a||"object"!==typeof a)return null;a=yc&&a[yc]||a["@@iterator"];return"function"===typeof a?a:null}
function Ac(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case tc:return"ConcurrentMode";case oc:return"Fragment";case nc:return"Portal";case qc:return"Profiler";case pc:return"StrictMode";case vc:return"Suspense"}if("object"===typeof a)switch(a.$$typeof){case sc:return"Context.Consumer";case rc:return"Context.Provider";case uc:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+
")":"ForwardRef");case wc:return Ac(a.type);case xc:if(a=1===a._status?a._result:null)return Ac(a)}return null}function Bc(a){var b="";do{a:switch(a.tag){case 2:case 16:case 0:case 1:case 5:case 8:var c=a._debugOwner,d=a._debugSource,e=Ac(a.type);var f=null;c&&(f=Ac(c.type));c=e;e="";d?e=" (at "+d.fileName.replace(lc,"")+":"+d.lineNumber+")":f&&(e=" (created by "+f+")");f="\n    in "+(c||"Unknown")+e;break a;default:f=""}b+=f;a=a.return}while(a);return b}
var Cc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Dc=Object.prototype.hasOwnProperty,Ec={},Fc={};
function Gc(a){if(Dc.call(Fc,a))return!0;if(Dc.call(Ec,a))return!1;if(Cc.test(a))return Fc[a]=!0;Ec[a]=!0;return!1}function Hc(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function Ic(a,b,c,d){if(null===b||"undefined"===typeof b||Hc(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function F(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var G={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){G[a]=new F(a,0,!1,a,null)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];G[b]=new F(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){G[a]=new F(a,2,!1,a.toLowerCase(),null)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){G[a]=new F(a,2,!1,a,null)});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){G[a]=new F(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){G[a]=new F(a,3,!0,a,null)});
["capture","download"].forEach(function(a){G[a]=new F(a,4,!1,a,null)});["cols","rows","size","span"].forEach(function(a){G[a]=new F(a,6,!1,a,null)});["rowSpan","start"].forEach(function(a){G[a]=new F(a,5,!1,a.toLowerCase(),null)});var Mc=/[\-:]([a-z])/g;function Nc(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Mc,
Nc);G[b]=new F(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Mc,Nc);G[b]=new F(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Mc,Nc);G[b]=new F(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});G.tabIndex=new F("tabIndex",1,!1,"tabindex",null);
function Oc(a,b,c,d){var e=G.hasOwnProperty(b)?G[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Ic(b,c,e,d)&&(c=null),d||null===e?Gc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Pc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Qc(a,b){var c=b.checked;return n({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
function Rc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Pc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Sc(a,b){b=b.checked;null!=b&&Oc(a,"checked",b,!1)}
function Tc(a,b){Sc(a,b);var c=Pc(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Uc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Uc(a,b.type,Pc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function bd(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function Uc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var cd={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function dd(a,b,c){a=y.getPooled(cd.change,a,b,c);a.type="change";Wb(c);Wa(a);return a}var ed=null,fd=null;function gd(a){Ia(a,!1)}
function hd(a){var b=Pa(a);if(jc(b))return a}function id(a,b){if("change"===a)return b}var jd=!1;Xa&&(jd=fc("input")&&(!document.documentMode||9<document.documentMode));function kd(){ed&&(ed.detachEvent("onpropertychange",ld),fd=ed=null)}function ld(a){"value"===a.propertyName&&hd(fd)&&(a=dd(fd,a,ec(a)),bc(gd,a))}function md(a,b,c){"focus"===a?(kd(),ed=b,fd=c,ed.attachEvent("onpropertychange",ld)):"blur"===a&&kd()}function nd(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return hd(fd)}
function od(a,b){if("click"===a)return hd(b)}function pd(a,b){if("input"===a||"change"===a)return hd(b)}
var qd={eventTypes:cd,_isInputEventSupported:jd,extractEvents:function(a,b,c,d){var e=b?Pa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=id:dc(e)?jd?f=pd:(f=nd,g=md):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=od);if(f&&(f=f(a,b)))return dd(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Uc(e,"number",e.value)}},rd=y.extend({view:null,detail:null}),sd={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function td(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=sd[a])?!!b[a]:!1}function ud(){return td}
var vd=0,wd=0,xd=!1,yd=!1,zd=rd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ud,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=vd;vd=a.screenX;return xd?"mousemove"===a.type?a.screenX-b:0:(xd=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;
var b=wd;wd=a.screenY;return yd?"mousemove"===a.type?a.screenY-b:0:(yd=!0,0)}}),Ad=zd.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),Bd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
dependencies:["pointerout","pointerover"]}},Cd={eventTypes:Bd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,l=void 0;if("mouseout"===a||"mouseover"===a)g=zd,h=Bd.mouseLeave,k=Bd.mouseEnter,l="mouse";
else if("pointerout"===a||"pointerover"===a)g=Ad,h=Bd.pointerLeave,k=Bd.pointerEnter,l="pointer";var m=null==f?e:Pa(f);e=null==b?e:Pa(b);a=g.getPooled(h,f,c,d);a.type=l+"leave";a.target=m;a.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=l+"enter";c.target=e;c.relatedTarget=m;d=b;if(f&&d)a:{b=f;e=d;l=0;for(g=b;g;g=Ra(g))l++;g=0;for(k=e;k;k=Ra(k))g++;for(;0<l-g;)b=Ra(b),l--;for(;0<g-l;)e=Ra(e),g--;for(;l--;){if(b===e||b===e.alternate)break a;b=Ra(b);e=Ra(e)}b=null}else b=null;e=b;for(b=[];f&&f!==e;){l=
f.alternate;if(null!==l&&l===e)break;b.push(f);f=Ra(f)}for(f=[];d&&d!==e;){l=d.alternate;if(null!==l&&l===e)break;f.push(d);d=Ra(d)}for(d=0;d<b.length;d++)Ua(b[d],"bubbled",a);for(d=f.length;0<d--;)Ua(f[d],"captured",c);return[a,c]}},Dd=Object.prototype.hasOwnProperty;function Ed(a,b){return a===b?0!==a||0!==b||1/a===1/b:a!==a&&b!==b}
function Fd(a,b){if(Ed(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Dd.call(b,c[d])||!Ed(a[c[d]],b[c[d]]))return!1;return!0}function Gd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function Hd(a){2!==Gd(a)?r("188"):void 0}
function Id(a){var b=a.alternate;if(!b)return b=Gd(a),3===b?r("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return Hd(e),a;if(g===d)return Hd(e),b;g=g.sibling}r("188")}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:r("189")}}c.alternate!==d?r("190"):void 0}3!==c.tag?r("188"):void 0;return c.stateNode.current===c?a:b}function Jd(a){a=Id(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
var Kd=y.extend({animationName:null,elapsedTime:null,pseudoElement:null}),Ld=y.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Md=rd.extend({relatedTarget:null});function Nd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var Od={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Pd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qd=rd.extend({key:function(a){if(a.key){var b=Od[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=Nd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Pd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ud,charCode:function(a){return"keypress"===
a.type?Nd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?Nd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=zd.extend({dataTransfer:null}),Sd=rd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ud}),Td=y.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),Ud=zd.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),Vd=[["abort","abort"],[cb,"animationEnd"],[ib,"animationIteration"],[jb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[kb,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Wd={},Xd={};function Yd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Wd[a]=b;Xd[c]=b}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["auxclick","auxClick"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],
["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Yd(a,!0)});Vd.forEach(function(a){Yd(a,!1)});
var Zd={eventTypes:Wd,isInteractiveTopLevelEventType:function(a){a=Xd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Xd[a];if(!e)return null;switch(a){case "keypress":if(0===Nd(c))return null;case "keydown":case "keyup":a=Qd;break;case "blur":case "focus":a=Md;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=zd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
Rd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=Sd;break;case cb:case ib:case jb:a=Kd;break;case kb:a=Td;break;case "scroll":a=rd;break;case "wheel":a=Ud;break;case "copy":case "cut":case "paste":a=Ld;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=Ad;break;default:a=y}b=a.getPooled(e,b,c,d);Wa(b);return b}},$d=Zd.isInteractiveTopLevelEventType,
ae=[];function be(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d;for(d=c;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo;if(!d)break;a.ancestors.push(c);c=Na(d)}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=ec(a.nativeEvent);d=a.topLevelType;for(var f=a.nativeEvent,g=null,h=0;h<ra.length;h++){var k=ra[h];k&&(k=k.extractEvents(d,b,f,e))&&(g=Aa(g,k))}Ia(g,!1)}}var ce=!0;
function H(a,b){if(!b)return null;var c=($d(a)?de:ee).bind(null,a);b.addEventListener(a,c,!1)}function ge(a,b){if(!b)return null;var c=($d(a)?de:ee).bind(null,a);b.addEventListener(a,c,!0)}function de(a,b){Zb(ee,a,b)}
function ee(a,b){if(ce){var c=ec(b);c=Na(c);null===c||"number"!==typeof c.tag||2===Gd(c)||(c=null);if(ae.length){var d=ae.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{bc(be,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>ae.length&&ae.push(a)}}}var he={},ie=0,je="_reactListenersID"+(""+Math.random()).slice(2);
function ke(a){Object.prototype.hasOwnProperty.call(a,je)||(a[je]=ie++,he[a[je]]={});return he[a[je]]}function le(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function me(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function ne(a,b){var c=me(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=me(c)}}function oe(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?oe(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function pe(){for(var a=window,b=le();b instanceof a.HTMLIFrameElement;){try{a=b.contentDocument.defaultView}catch(c){break}b=le(a.document)}return b}function qe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var re=Xa&&"documentMode"in document&&11>=document.documentMode,se={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},te=null,ue=null,He=null,Ie=!1;
function Je(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if(Ie||null==te||te!==le(c))return null;c=te;"selectionStart"in c&&qe(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return He&&Fd(He,c)?null:(He=c,a=y.getPooled(se.select,ue,a,b),a.type="select",a.target=te,Wa(a),a)}
var Ke={eventTypes:se,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=ke(e);f=va.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Pa(b):window;switch(a){case "focus":if(dc(e)||"true"===e.contentEditable)te=e,ue=b,He=null;break;case "blur":He=ue=te=null;break;case "mousedown":Ie=!0;break;case "contextmenu":case "mouseup":case "dragend":return Ie=!1,Je(c,d);case "selectionchange":if(re)break;
case "keydown":case "keyup":return Je(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa;xa=Oa;ya=Pa;Ga.injectEventPluginsByName({SimpleEventPlugin:Zd,EnterLeaveEventPlugin:Cd,ChangeEventPlugin:qd,SelectEventPlugin:Ke,BeforeInputEventPlugin:Mb});function Le(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}
function Me(a,b){a=n({children:void 0},b);if(b=Le(b.children))a.children=b;return a}function Ne(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Pc(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Oe(a,b){null!=b.dangerouslySetInnerHTML?r("91"):void 0;return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Pe(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?r("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:r("93"),b=b[0]),c=b),null==c&&(c=""));a._wrapperState={initialValue:Pc(c)}}
function Qe(a,b){var c=Pc(b.value),d=Pc(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function Re(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Se={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Te(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ue(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Te(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Ve=void 0,We=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Se.svg||"innerHTML"in a)a.innerHTML=b;else{Ve=Ve||document.createElement("div");Ve.innerHTML="<svg>"+b+"</svg>";for(b=Ve.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Xe(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var Ye={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ze=["Webkit","ms","Moz","O"];Object.keys(Ye).forEach(function(a){Ze.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Ye[b]=Ye[a]})});
function $e(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Ye.hasOwnProperty(e)&&Ye[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var af=n({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function bf(a,b){b&&(af[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?r("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?r("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:r("61")),null!=b.style&&"object"!==typeof b.style?r("62",""):void 0)}
function cf(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}
function df(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=ke(a);b=va[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":ge("scroll",a);break;case "focus":case "blur":ge("focus",a);ge("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":fc(e)&&ge(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===lb.indexOf(e)&&H(e,a)}c[e]=!0}}}function ef(){}var ff=null,gf=null;
function hf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}function jf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var kf=setTimeout,lf=clearTimeout;function mf(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}
function nf(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}new Set;var of=[],pf=-1;function I(a){0>pf||(a.current=of[pf],of[pf]=null,pf--)}function J(a,b){pf++;of[pf]=a.current;a.current=b}var qf={},K={current:qf},L={current:!1},rf=qf;
function sf(a,b){var c=a.type.contextTypes;if(!c)return qf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function M(a){a=a.childContextTypes;return null!==a&&void 0!==a}function tf(a){I(L,a);I(K,a)}function uf(a){I(L,a);I(K,a)}
function vf(a,b,c){K.current!==qf?r("168"):void 0;J(K,b,a);J(L,c,a)}function wf(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)e in a?void 0:r("108",Ac(b)||"Unknown",e);return n({},c,d)}function xf(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||qf;rf=K.current;J(K,b,a);J(L,L.current,a);return!0}
function yf(a,b,c){var d=a.stateNode;d?void 0:r("169");c?(b=wf(a,b,rf),d.__reactInternalMemoizedMergedChildContext=b,I(L,a),I(K,a),J(K,b,a)):I(L,a);J(L,c,a)}var zf=null,Af=null;function Bf(a){return function(b){try{return a(b)}catch(c){}}}
function Cf(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);zf=Bf(function(a){return b.onCommitFiberRoot(c,a)});Af=Bf(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}
function Df(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.firstContextDependency=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null}function N(a,b,c,d){return new Df(a,b,c,d)}
function Ef(a){a=a.prototype;return!(!a||!a.isReactComponent)}function Ff(a){if("function"===typeof a)return Ef(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===uc)return 11;if(a===wc)return 14}return 2}
function Gf(a,b){var c=a.alternate;null===c?(c=N(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.firstContextDependency=a.firstContextDependency;c.sibling=a.sibling;
c.index=a.index;c.ref=a.ref;return c}
function Hf(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)Ef(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case oc:return If(c.children,e,f,b);case tc:return Jf(c,e|3,f,b);case pc:return Jf(c,e|2,f,b);case qc:return a=N(12,c,b,e|4),a.elementType=qc,a.type=qc,a.expirationTime=f,a;case vc:return a=N(13,c,b,e),a.elementType=vc,a.type=vc,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case rc:g=10;break a;case sc:g=9;break a;case uc:g=11;break a;case wc:g=
14;break a;case xc:g=16;d=null;break a}r("130",null==a?a:typeof a,"")}b=N(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function If(a,b,c,d){a=N(7,a,d,b);a.expirationTime=c;return a}function Jf(a,b,c,d){a=N(8,a,d,b);b=0===(b&1)?pc:tc;a.elementType=b;a.type=b;a.expirationTime=c;return a}function Kf(a,b,c){a=N(6,a,null,b);a.expirationTime=c;return a}
function Lf(a,b,c){b=N(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Mf(a,b){a.didError=!1;var c=a.earliestPendingTime;0===c?a.earliestPendingTime=a.latestPendingTime=b:c>b?a.earliestPendingTime=b:a.latestPendingTime<b&&(a.latestPendingTime=b);Nf(b,a)}
function Of(a,b){a.didError=!1;var c=a.latestPingedTime;0!==c&&c<=b&&(a.latestPingedTime=0);c=a.earliestPendingTime;var d=a.latestPendingTime;c===b?a.earliestPendingTime=d===b?a.latestPendingTime=0:d:d===b&&(a.latestPendingTime=c);c=a.earliestSuspendedTime;d=a.latestSuspendedTime;0===c?a.earliestSuspendedTime=a.latestSuspendedTime=b:c>b?a.earliestSuspendedTime=b:d<b&&(a.latestSuspendedTime=b);Nf(b,a)}
function Pf(a,b){var c=a.earliestPendingTime;a=a.earliestSuspendedTime;if(0===b||0!==c&&c<b)b=c;if(0===b||0!==a&&a<b)b=a;return b}function Nf(a,b){var c=b.earliestSuspendedTime,d=b.latestSuspendedTime,e=b.earliestPendingTime,f=b.latestPingedTime;e=0!==e?e:f;0===e&&(0===a||d>a)&&(e=d);a=e;0!==a&&0!==c&&c<a&&(a=c);b.nextExpirationTimeToWorkOn=e;b.expirationTime=a}var Qf=!1;
function Rf(a){return{baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Sf(a){return{baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Tf(a){return{expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Uf(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b)}
function Vf(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=Rf(a.memoizedState))}else d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=Rf(a.memoizedState),e=c.updateQueue=Rf(c.memoizedState)):d=a.updateQueue=Sf(e):null===e&&(e=c.updateQueue=Sf(d));null===e||d===e?Uf(d,b):null===d.lastUpdate||null===e.lastUpdate?(Uf(d,b),Uf(e,b)):(Uf(d,b),e.lastUpdate=b)}
function Wf(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=Rf(a.memoizedState):Xf(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b)}function Xf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Sf(b));return b}
function Yf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return n({},d,e);case 2:Qf=!0}return d}
function Zf(a,b,c,d,e){Qf=!1;b=Xf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,l=f;null!==k;){var m=k.expirationTime;if(m>e){if(null===g&&(g=k,f=l),0===h||h>m)h=m}else l=Yf(a,b,k,l,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next}m=null;for(k=b.firstCapturedUpdate;null!==k;){var p=k.expirationTime;if(p>e){if(null===m&&(m=k,null===g&&(f=l)),0===h||h>p)h=p}else l=Yf(a,b,k,l,c,d),
null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next}null===g&&(b.lastUpdate=null);null===m?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===m&&(f=l);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=m;a.expirationTime=h;a.memoizedState=l}
function $f(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);ag(b.firstEffect,c);b.firstEffect=b.lastEffect=null;ag(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null}function ag(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;"function"!==typeof c?r("191",c):void 0;c.call(d)}a=a.nextEffect}}
function bg(a,b){return{value:a,source:b,stack:Bc(b)}}var cg={current:null},dg=null,eg=null,fg=null;function gg(a,b){var c=a.type._context;J(cg,c._currentValue,a);c._currentValue=b}function hg(a){var b=cg.current;I(cg,a);a.type._context._currentValue=b}function ig(a){dg=a;fg=eg=null;a.firstContextDependency=null}
function jg(a,b){if(fg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)fg=a,b=1073741823;b={context:a,observedBits:b,next:null};null===eg?(null===dg?r("293"):void 0,dg.firstContextDependency=eg=b):eg=eg.next=b}return a._currentValue}var kg={},O={current:kg},lg={current:kg},mg={current:kg};function ng(a){a===kg?r("174"):void 0;return a}
function og(a,b){J(mg,b,a);J(lg,a,a);J(O,kg,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:Ue(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=Ue(b,c)}I(O,a);J(O,b,a)}function pg(a){I(O,a);I(lg,a);I(mg,a)}function qg(a){ng(mg.current);var b=ng(O.current);var c=Ue(b,a.type);b!==c&&(J(lg,a,a),J(O,c,a))}function rg(a){lg.current===a&&(I(O,a),I(lg,a))}var sg=kc.ReactCurrentOwner,tg=(new aa.Component).refs;
function ug(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:n({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c)}
var yg={isMounted:function(a){return(a=a._reactInternalFiber)?2===Gd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=vg();d=wg(d,a);var e=Tf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Vf(a,e);xg(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=vg();d=wg(d,a);var e=Tf(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Vf(a,e);xg(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=vg();c=wg(c,a);var d=Tf(c);d.tag=2;void 0!==
b&&null!==b&&(d.callback=b);Vf(a,d);xg(a,c)}};function zg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Fd(c,d)||!Fd(e,f):!0}
function Ag(a,b,c){var d=!1,e=qf;var f=b.contextType;"object"===typeof f&&null!==f?f=sg.currentDispatcher.readContext(f):(e=M(b)?rf:K.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?sf(a,e):qf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=yg;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Bg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&yg.enqueueReplaceState(b,b.state,null)}
function Cg(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=tg;var f=b.contextType;"object"===typeof f&&null!==f?e.context=sg.currentDispatcher.readContext(f):(f=M(b)?rf:K.current,e.context=sf(a,f));f=a.updateQueue;null!==f&&(Zf(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(ug(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&
"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&yg.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(Zf(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4)}var Dg=Array.isArray;
function Eg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(1!==c.tag?r("289"):void 0,d=c.stateNode);d?void 0:r("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===tg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?r("284"):void 0;c._owner?void 0:r("290",a)}return a}
function Fg(a,b){"textarea"!==a.type&&r("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function Gg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=Gf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Kf(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props,d),d.ref=Eg(a,b,c),d.return=a,d;d=Hf(c.type,c.key,c.props,null,a.mode,d);d.ref=Eg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
c.implementation)return b=Lf(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=If(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function p(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Kf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case mc:return c=Hf(b.type,b.key,b.props,null,a.mode,c),c.ref=Eg(a,null,b),c.return=a,c;case nc:return b=Lf(b,a.mode,c),b.return=a,b}if(Dg(b)||
zc(b))return b=If(b,a.mode,c,null),b.return=a,b;Fg(a,b)}return null}function v(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case mc:return c.key===e?c.type===oc?m(a,b,c.props.children,d,e):k(a,b,c,d):null;case nc:return c.key===e?l(a,b,c,d):null}if(Dg(c)||zc(c))return null!==e?null:m(a,b,c,d,null);Fg(a,c)}return null}function B(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case mc:return a=a.get(null===d.key?c:d.key)||null,d.type===oc?m(b,a,d.props.children,e,d.key):k(b,a,d,e);case nc:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Dg(d)||zc(d))return a=a.get(c)||null,m(b,a,d,e,null);Fg(b,d)}return null}function w(e,g,h,k){for(var l=null,m=null,q=g,u=g=0,A=null;null!==q&&u<h.length;u++){q.index>u?(A=q,q=null):A=q.sibling;var t=v(e,q,h[u],k);if(null===t){null===q&&(q=A);break}a&&
q&&null===t.alternate&&b(e,q);g=f(t,g,u);null===m?l=t:m.sibling=t;m=t;q=A}if(u===h.length)return c(e,q),l;if(null===q){for(;u<h.length;u++)if(q=p(e,h[u],k))g=f(q,g,u),null===m?l=q:m.sibling=q,m=q;return l}for(q=d(e,q);u<h.length;u++)if(A=B(q,e,u,h[u],k))a&&null!==A.alternate&&q.delete(null===A.key?u:A.key),g=f(A,g,u),null===m?l=A:m.sibling=A,m=A;a&&q.forEach(function(a){return b(e,a)});return l}function C(e,g,h,k){var l=zc(h);"function"!==typeof l?r("150"):void 0;h=l.call(h);null==h?r("151"):void 0;
for(var m=l=null,q=g,u=g=0,A=null,t=h.next();null!==q&&!t.done;u++,t=h.next()){q.index>u?(A=q,q=null):A=q.sibling;var w=v(e,q,t.value,k);if(null===w){q||(q=A);break}a&&q&&null===w.alternate&&b(e,q);g=f(w,g,u);null===m?l=w:m.sibling=w;m=w;q=A}if(t.done)return c(e,q),l;if(null===q){for(;!t.done;u++,t=h.next())t=p(e,t.value,k),null!==t&&(g=f(t,g,u),null===m?l=t:m.sibling=t,m=t);return l}for(q=d(e,q);!t.done;u++,t=h.next())t=B(q,e,u,t.value,k),null!==t&&(a&&null!==t.alternate&&q.delete(null===t.key?u:
t.key),g=f(t,g,u),null===m?l=t:m.sibling=t,m=t);a&&q.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===oc&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case mc:a:{l=f.key;for(k=d;null!==k;){if(k.key===l)if(7===k.tag?f.type===oc:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===oc?f.props.children:f.props,h);d.ref=Eg(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=
k.sibling}f.type===oc?(d=If(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Hf(f.type,f.key,f.props,null,a.mode,h),h.ref=Eg(a,d,f),h.return=a,a=h)}return g(a);case nc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Lf(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=
""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=a,a=d):(c(a,d),d=Kf(f,a.mode,h),d.return=a,a=d),g(a);if(Dg(f))return w(a,d,f,h);if(zc(f))return C(a,d,f,h);l&&Fg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:h=a.type,r("152",h.displayName||h.name||"Component")}return c(a,d)}}var Hg=Gg(!0),Ig=Gg(!1),Jg=null,Kg=null,Lg=!1;
function Mg(a,b){var c=N(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function Ng(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return!1}}
function Og(a){if(Lg){var b=Kg;if(b){var c=b;if(!Ng(a,b)){b=mf(c);if(!b||!Ng(a,b)){a.effectTag|=2;Lg=!1;Jg=a;return}Mg(Jg,c)}Jg=a;Kg=nf(b)}else a.effectTag|=2,Lg=!1,Jg=a}}function Pg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;Jg=a}function Qg(a){if(a!==Jg)return!1;if(!Lg)return Pg(a),Lg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!jf(b,a.memoizedProps))for(b=Kg;b;)Mg(a,b),b=mf(b);Pg(a);Kg=Jg?mf(a.stateNode):null;return!0}function Rg(){Kg=Jg=null;Lg=!1}
function Sg(a){var b=a._result;switch(a._status){case 1:return b;case 2:throw b;case 0:throw b;default:throw a._status=0,b=a._ctor,b=b(),b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)}),a._result=b,b;}}var Tg=kc.ReactCurrentOwner;function P(a,b,c,d){b.child=null===a?Ig(b,null,c,d):Hg(b,a.child,c,d)}
function Ug(a,b,c,d,e){c=c.render;var f=b.ref;if(!L.current&&b.memoizedProps===d&&f===(null!==a?a.ref:null))return Vg(a,b,e);d=c(d,f);P(a,b,d,e);return b.child}
function Wg(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!Ef(g)&&void 0===g.defaultProps&&null===c.compare)return b.tag=15,b.type=g,Xg(a,b,g,d,e,f);a=Hf(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===e||e>f)if(e=g.memoizedProps,c=c.compare,c=null!==c?c:Fd,c(e,d)&&a.ref===b.ref)return Vg(a,b,f);a=Gf(g,d,f);a.ref=b.ref;a.return=b;return b.child=a}
function Xg(a,b,c,d,e,f){return null!==a&&(0===e||e>f)&&Fd(a.memoizedProps,d)&&a.ref===b.ref?Vg(a,b,f):Yg(a,b,c,d,f)}function Zg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function Yg(a,b,c,d,e){var f=M(c)?rf:K.current;f=sf(b,f);ig(b,e);c=c(d,f);b.effectTag|=1;P(a,b,c,e);return b.child}
function $g(a,b,c,d,e){if(M(c)){var f=!0;xf(b)}else f=!1;ig(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Ag(b,c,d,e),Cg(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=sg.currentDispatcher.readContext(l):(l=M(c)?rf:K.current,l=sf(b,l));var m=c.getDerivedStateFromProps,p="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;p||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Bg(b,g,d,l);Qf=!1;var v=b.memoizedState;k=g.state=v;var B=b.updateQueue;null!==B&&(Zf(b,B,d,g,e),k=b.memoizedState);h!==d||v!==k||L.current||Qf?("function"===typeof m&&(ug(b,c,m,d),k=b.memoizedState),(h=Qf||zg(b,c,h,d,v,k,l))?(p||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1)}else g=b.stateNode,h=b.memoizedProps,g.props=h,k=g.context,l=c.contextType,"object"===typeof l&&null!==l?l=sg.currentDispatcher.readContext(l):(l=M(c)?rf:K.current,l=sf(b,l)),m=c.getDerivedStateFromProps,(p="function"===
typeof m||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Bg(b,g,d,l),Qf=!1,k=b.memoizedState,v=g.state=k,B=b.updateQueue,null!==B&&(Zf(b,B,d,g,e),v=b.memoizedState),h!==d||k!==v||L.current||Qf?("function"===typeof m&&(ug(b,c,m,d),v=b.memoizedState),(m=Qf||zg(b,c,h,d,k,v,l))?(p||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===
typeof g.componentWillUpdate&&g.componentWillUpdate(d,v,l),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,v,l)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),b.memoizedProps=d,b.memoizedState=
v),g.props=d,g.state=v,g.context=l,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),d=!1);return ah(a,b,c,d,f,e)}
function ah(a,b,c,d,e,f){Zg(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&yf(b,c,!1),Vg(a,b,f);d=b.stateNode;Tg.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=Hg(b,a.child,null,f),b.child=Hg(b,null,h,f)):P(a,b,h,f);b.memoizedState=d.state;e&&yf(b,c,!0);return b.child}function bh(a){var b=a.stateNode;b.pendingContext?vf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&vf(a,b.context,!1);og(a,b.containerInfo)}
function ch(a,b){if(a&&a.defaultProps){b=n({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c])}return b}
function dh(a,b,c){var d=b.mode,e=b.pendingProps,f=b.memoizedState;null!==f&&(f.alreadyCaptured?null!==a&&f===a.memoizedState?f={alreadyCaptured:!0,didTimeout:!0,timedOutAt:f.timedOutAt}:(f.alreadyCaptured=!0,f.didTimeout=!0):f=null);var g=null!==f&&f.didTimeout;if(null===a)g?(g=e.fallback,e=If(null,d,0,null),d=If(g,d,c,null),e.sibling=d,c=e,c.return=d.return=b):c=d=Ig(b,null,e.children,c);else{var h=a.memoizedState;null!==h&&h.didTimeout?(d=a.child,a=d.sibling,g?(c=e.fallback,d=Gf(d,d.pendingProps,
0),d.effectTag|=2,e=d.sibling=Gf(a,c,a.expirationTime),e.effectTag|=2,c=d,d.childExpirationTime=0,d=e,c.return=d.return=b):(g=a.child,d=Hg(b,d.child,e.children,c),Hg(b,g,null,c),c=d)):(a=a.child,g?(g=e.fallback,e=If(null,d,0,null),e.effectTag|=2,e.child=a,a.return=e,d=e.sibling=If(g,d,c,null),d.effectTag|=2,c=e,e.childExpirationTime=0,c.return=d.return=b):d=c=Hg(b,a,e.children,c))}b.memoizedState=f;b.child=c;return d}
function Vg(a,b,c){null!==a&&(b.firstContextDependency=a.firstContextDependency);var d=b.childExpirationTime;if(0===d||d>c)return null;null!==a&&b.child!==a.child?r("153"):void 0;if(null!==b.child){a=b.child;c=Gf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Gf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}
function eh(a,b,c){var d=b.expirationTime;if(null!==a&&a.memoizedProps===b.pendingProps&&!L.current&&(0===d||d>c)){switch(b.tag){case 3:bh(b);Rg();break;case 5:qg(b);break;case 1:M(b.type)&&xf(b);break;case 4:og(b,b.stateNode.containerInfo);break;case 10:gg(b,b.memoizedProps.value);break;case 13:if(d=b.memoizedState,null!==d&&d.didTimeout){d=b.child.childExpirationTime;if(0!==d&&d<=c)return dh(a,b,c);b=Vg(a,b,c);return null!==b?b.sibling:null}}return Vg(a,b,c)}b.expirationTime=0;switch(b.tag){case 2:d=
b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;var e=sf(b,K.current);ig(b,c);e=d(a,e);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;if(M(d)){var f=!0;xf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&ug(b,d,g,a);e.updater=yg;b.stateNode=e;e._reactInternalFiber=b;Cg(b,d,a,c);b=ah(null,b,d,!0,f,c)}else b.tag=0,
P(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);f=b.pendingProps;a=Sg(e);b.type=a;e=b.tag=Ff(a);f=ch(a,f);g=void 0;switch(e){case 0:g=Yg(null,b,a,f,c);break;case 1:g=$g(null,b,a,f,c);break;case 11:g=Ug(null,b,a,f,c);break;case 14:g=Wg(null,b,a,ch(a.type,f),d,c);break;default:r("283",a)}return g;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ch(d,e),Yg(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===
d?e:ch(d,e),$g(a,b,d,e,c);case 3:bh(b);d=b.updateQueue;null===d?r("282"):void 0;e=b.memoizedState;e=null!==e?e.element:null;Zf(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e)Rg(),b=Vg(a,b,c);else{e=b.stateNode;if(e=(null===a||null===a.child)&&e.hydrate)Kg=nf(b.stateNode.containerInfo),Jg=b,e=Lg=!0;e?(b.effectTag|=2,b.child=Ig(b,null,d,c)):(P(a,b,d,c),Rg());b=b.child}return b;case 5:return qg(b),null===a&&Og(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,jf(d,
e)?g=null:null!==f&&jf(d,f)&&(b.effectTag|=16),Zg(a,b),1073741823!==c&&b.mode&1&&e.hidden?(b.expirationTime=1073741823,b=null):(P(a,b,g,c),b=b.child),b;case 6:return null===a&&Og(b),null;case 13:return dh(a,b,c);case 4:return og(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Hg(b,null,d,c):P(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ch(d,e),Ug(a,b,d,e,c);case 7:return P(a,b,b.pendingProps,c),b.child;case 8:return P(a,b,b.pendingProps.children,
c),b.child;case 12:return P(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;gg(b,f);if(null!==g){var h=g.value;f=h===f&&(0!==h||1/h===1/f)||h!==h&&f!==f?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!L.current){b=Vg(a,b,c);break a}}else for(g=b.child,null!==g&&(g.return=b);null!==g;){h=g.firstContextDependency;if(null!==h){do{if(h.context===d&&0!==(h.observedBits&
f)){if(1===g.tag){var k=Tf(c);k.tag=2;Vf(g,k)}if(0===g.expirationTime||g.expirationTime>c)g.expirationTime=c;k=g.alternate;null!==k&&(0===k.expirationTime||k.expirationTime>c)&&(k.expirationTime=c);for(var l=g.return;null!==l;){k=l.alternate;if(0===l.childExpirationTime||l.childExpirationTime>c)l.childExpirationTime=c,null!==k&&(0===k.childExpirationTime||k.childExpirationTime>c)&&(k.childExpirationTime=c);else if(null!==k&&(0===k.childExpirationTime||k.childExpirationTime>c))k.childExpirationTime=
c;else break;l=l.return}}k=g.child;h=h.next}while(null!==h)}else k=10===g.tag?g.type===b.type?null:g.child:g.child;if(null!==k)k.return=g;else for(k=g;null!==k;){if(k===b){k=null;break}g=k.sibling;if(null!==g){g.return=k.return;k=g;break}k=k.return}g=k}}P(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,ig(b,c),e=jg(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,P(a,b,d,c),b.child;case 14:return e=b.type,f=ch(e.type,b.pendingProps),Wg(a,b,e,f,d,c);case 15:return Xg(a,
b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ch(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,M(d)?(a=!0,xf(b)):a=!1,ig(b,c),Ag(b,d,e,c),Cg(b,d,e,c),ah(null,b,d,!0,a,c);default:r("156")}}function zh(a){a.effectTag|=4}var Ah=void 0,Bh=void 0,Ch=void 0,Dh=void 0;
Ah=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Bh=function(){};
Ch=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;ng(O.current);a=null;switch(c){case "input":f=Qc(g,f);d=Qc(g,d);a=[];break;case "option":f=Me(g,f);d=Me(g,d);a=[];break;case "select":f=n({},f,{value:void 0});d=n({},d,{value:void 0});a=[];break;case "textarea":f=Oe(g,f);d=Oe(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=ef)}bf(c,d);g=c=void 0;var h=null;for(c in f)if(!d.hasOwnProperty(c)&&f.hasOwnProperty(c)&&null!=f[c])if("style"===
c){var k=f[c];for(g in k)k.hasOwnProperty(g)&&(h||(h={}),h[g]="")}else"dangerouslySetInnerHTML"!==c&&"children"!==c&&"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(ua.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in d){var l=d[c];k=null!=f?f[c]:void 0;if(d.hasOwnProperty(c)&&l!==k&&(null!=l||null!=k))if("style"===c)if(k){for(g in k)!k.hasOwnProperty(g)||l&&l.hasOwnProperty(g)||(h||(h={}),h[g]="");for(g in l)l.hasOwnProperty(g)&&k[g]!==l[g]&&(h||
(h={}),h[g]=l[g])}else h||(a||(a=[]),a.push(c,h)),h=l;else"dangerouslySetInnerHTML"===c?(l=l?l.__html:void 0,k=k?k.__html:void 0,null!=l&&k!==l&&(a=a||[]).push(c,""+l)):"children"===c?k===l||"string"!==typeof l&&"number"!==typeof l||(a=a||[]).push(c,""+l):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&(ua.hasOwnProperty(c)?(null!=l&&df(e,c),a||k===l||(a=[])):(a=a||[]).push(c,l))}h&&(a=a||[]).push("style",h);e=a;(b.updateQueue=e)&&zh(b)}};Dh=function(a,b,c,d){c!==d&&zh(b)};
function Eh(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=Bc(c));null!==c&&Ac(c.type);b=b.value;null!==a&&1===a.tag&&Ac(a.type);try{console.error(b)}catch(e){setTimeout(function(){throw e;})}}function Fh(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Gh(a,c)}else b.current=null}
function Hh(a){"function"===typeof Af&&Af(a);switch(a.tag){case 1:Fh(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Gh(a,c)}break;case 5:Fh(a);break;case 4:Ih(a)}}function Jh(a){return 5===a.tag||3===a.tag||4===a.tag}
function Kh(a){a:{for(var b=a.return;null!==b;){if(Jh(b)){var c=b;break a}b=b.return}r("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:r("161")}c.effectTag&16&&(Xe(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Jh(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h)}else b.insertBefore(e.stateNode,c);else d?(g=b,h=e.stateNode,8===g.nodeType?(f=g.parentNode,f.insertBefore(h,g)):(f=g,f.appendChild(h)),g=g._reactRootContainer,null!==g&&void 0!==g||null!==f.onclick||(f.onclick=ef)):b.appendChild(e.stateNode);
else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function Ih(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?r("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return}c=!0}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if(Hh(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return}g.sibling.return=g.return;g=g.sibling}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode)}else if(4===b.tag?(d=b.stateNode.containerInfo,e=!0):Hh(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1)}b.sibling.return=b.return;b=b.sibling}}
function Lh(a,b){switch(b.tag){case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps,e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[Ma]=d;"input"===a&&"radio"===d.type&&null!=d.name&&Sc(c,d);cf(a,e);b=cf(a,d);for(e=0;e<f.length;e+=2){var g=f[e],h=f[e+1];"style"===g?$e(c,h):"dangerouslySetInnerHTML"===g?We(c,h):"children"===g?Xe(c,h):Oc(c,g,h,b)}switch(a){case "input":Tc(c,d);break;case "textarea":Qe(c,d);break;case "select":a=c._wrapperState.wasMultiple,
c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?Ne(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?Ne(c,!!d.multiple,d.defaultValue,!0):Ne(c,!!d.multiple,d.multiple?[]:"",!1))}}}break;case 6:null===b.stateNode?r("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 12:break;case 13:break;case 17:break;default:r("163")}}function Mh(a,b,c){c=Tf(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Nh(d);Eh(a,b)};return c}
function Oh(a,b,c){c=Tf(c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ph?Ph=new Set([this]):Ph.add(this));var c=b.value,e=b.stack;Eh(a,b);this.componentDidCatch(c,{componentStack:null!==e?e:""})});return c}
function Qh(a){switch(a.tag){case 1:M(a.type)&&tf(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return pg(a),uf(a),b=a.effectTag,0!==(b&64)?r("285"):void 0,a.effectTag=b&-1025|64,a;case 5:return rg(a),null;case 13:b=a.effectTag;if(b&1024){a.effectTag=b&-1025|64;b=a.alternate;b=null!==b?b.memoizedState:null;var c=a.memoizedState;null===c?c={alreadyCaptured:!0,didTimeout:!1,timedOutAt:0}:b===c?c={alreadyCaptured:!0,didTimeout:c.didTimeout,timedOutAt:c.timedOutAt}:c.alreadyCaptured=
!0;a.memoizedState=c;return a}return null;case 4:return pg(a),null;case 10:return hg(a),null;default:return null}}var Rh={readContext:jg},Sh=kc.ReactCurrentOwner,Th=0,Uh=0,Vh=!1,Q=null,R=null,S=0,Wh=-1,Xh=!1,T=null,Yh=!1,Ph=null;function Zh(){if(null!==Q)for(var a=Q.return;null!==a;){var b=a;switch(b.tag){case 1:var c=b.type.childContextTypes;null!==c&&void 0!==c&&tf(b);break;case 3:pg(b);uf(b);break;case 5:rg(b);break;case 4:pg(b);break;case 10:hg(b)}a=a.return}R=null;S=0;Wh=-1;Xh=!1;Q=null}
function $h(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){var e=b;b=a;var f=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:M(b.type)&&tf(b);break;case 3:pg(b);uf(b);f=b.stateNode;f.pendingContext&&(f.context=f.pendingContext,f.pendingContext=null);if(null===e||null===e.child)Qg(b),b.effectTag&=-3;Bh(b);break;case 5:rg(b);var g=ng(mg.current),h=b.type;if(null!==e&&null!=b.stateNode)Ch(e,b,h,f,g),e.ref!==b.ref&&(b.effectTag|=128);
else if(f){var k=ng(O.current);if(Qg(b)){f=b;e=f.stateNode;var l=f.type,m=f.memoizedProps,p=g;e[La]=f;e[Ma]=m;h=void 0;g=l;switch(g){case "iframe":case "object":H("load",e);break;case "video":case "audio":for(l=0;l<lb.length;l++)H(lb[l],e);break;case "source":H("error",e);break;case "img":case "image":case "link":H("error",e);H("load",e);break;case "form":H("reset",e);H("submit",e);break;case "details":H("toggle",e);break;case "input":Rc(e,m);H("invalid",e);df(p,"onChange");break;case "select":e._wrapperState=
{wasMultiple:!!m.multiple};H("invalid",e);df(p,"onChange");break;case "textarea":Pe(e,m),H("invalid",e),df(p,"onChange")}bf(g,m);l=null;for(h in m)m.hasOwnProperty(h)&&(k=m[h],"children"===h?"string"===typeof k?e.textContent!==k&&(l=["children",k]):"number"===typeof k&&e.textContent!==""+k&&(l=["children",""+k]):ua.hasOwnProperty(h)&&null!=k&&df(p,h));switch(g){case "input":ic(e);bd(e,m,!0);break;case "textarea":ic(e);Re(e,m);break;case "select":case "option":break;default:"function"===typeof m.onClick&&
(e.onclick=ef)}h=l;f.updateQueue=h;f=null!==h?!0:!1;f&&zh(b)}else{m=b;e=h;p=f;l=9===g.nodeType?g:g.ownerDocument;k===Se.html&&(k=Te(e));k===Se.html?"script"===e?(e=l.createElement("div"),e.innerHTML="<script>\x3c/script>",l=e.removeChild(e.firstChild)):"string"===typeof p.is?l=l.createElement(e,{is:p.is}):(l=l.createElement(e),"select"===e&&p.multiple&&(l.multiple=!0)):l=l.createElementNS(k,e);e=l;e[La]=m;e[Ma]=f;Ah(e,b,!1,!1);p=e;l=h;m=f;var v=g,B=cf(l,m);switch(l){case "iframe":case "object":H("load",
p);g=m;break;case "video":case "audio":for(g=0;g<lb.length;g++)H(lb[g],p);g=m;break;case "source":H("error",p);g=m;break;case "img":case "image":case "link":H("error",p);H("load",p);g=m;break;case "form":H("reset",p);H("submit",p);g=m;break;case "details":H("toggle",p);g=m;break;case "input":Rc(p,m);g=Qc(p,m);H("invalid",p);df(v,"onChange");break;case "option":g=Me(p,m);break;case "select":p._wrapperState={wasMultiple:!!m.multiple};g=n({},m,{value:void 0});H("invalid",p);df(v,"onChange");break;case "textarea":Pe(p,
m);g=Oe(p,m);H("invalid",p);df(v,"onChange");break;default:g=m}bf(l,g);k=void 0;var w=l,C=p,u=g;for(k in u)if(u.hasOwnProperty(k)){var q=u[k];"style"===k?$e(C,q):"dangerouslySetInnerHTML"===k?(q=q?q.__html:void 0,null!=q&&We(C,q)):"children"===k?"string"===typeof q?("textarea"!==w||""!==q)&&Xe(C,q):"number"===typeof q&&Xe(C,""+q):"suppressContentEditableWarning"!==k&&"suppressHydrationWarning"!==k&&"autoFocus"!==k&&(ua.hasOwnProperty(k)?null!=q&&df(v,k):null!=q&&Oc(C,k,q,B))}switch(l){case "input":ic(p);
bd(p,m,!1);break;case "textarea":ic(p);Re(p,m);break;case "option":null!=m.value&&p.setAttribute("value",""+Pc(m.value));break;case "select":g=p;g.multiple=!!m.multiple;p=m.value;null!=p?Ne(g,!!m.multiple,p,!1):null!=m.defaultValue&&Ne(g,!!m.multiple,m.defaultValue,!0);break;default:"function"===typeof g.onClick&&(p.onclick=ef)}(f=hf(h,f))&&zh(b);b.stateNode=e}null!==b.ref&&(b.effectTag|=128)}else null===b.stateNode?r("166"):void 0;break;case 6:e&&null!=b.stateNode?Dh(e,b,e.memoizedProps,f):("string"!==
typeof f&&(null===b.stateNode?r("166"):void 0),e=ng(mg.current),ng(O.current),Qg(b)?(f=b,h=f.stateNode,e=f.memoizedProps,h[La]=f,(f=h.nodeValue!==e)&&zh(b)):(h=b,f=(9===e.nodeType?e:e.ownerDocument).createTextNode(f),f[La]=b,h.stateNode=f));break;case 11:break;case 13:f=b.memoizedState;h=null!==e?e.memoizedState:null;(null!==f&&f.didTimeout)!==(null!==h&&h.didTimeout)&&(b.effectTag|=4);break;case 7:break;case 8:break;case 12:break;case 4:pg(b);Bh(b);break;case 10:hg(b);break;case 9:break;case 14:break;
case 17:M(b.type)&&tf(b);break;default:r("156")}Q=null;b=a;if(1073741823===S||1073741823!==b.childExpirationTime){f=0;for(h=b.child;null!==h;){e=h.expirationTime;g=h.childExpirationTime;if(0===f||0!==e&&e<f)f=e;if(0===f||0!==g&&g<f)f=g;h=h.sibling}b.childExpirationTime=f}null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?
c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a))}else{a=Qh(a,S);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512)}if(null!==d)return d;if(null!==c)a=c;else break}return null}function ai(a){var b=eh(a.alternate,a,S);a.memoizedProps=a.pendingProps;null===b&&(b=$h(a));Sh.current=null;return b}
function bi(a,b,c){Vh?r("243"):void 0;Vh=!0;Sh.currentDispatcher=Rh;var d=a.nextExpirationTimeToWorkOn;if(d!==S||a!==R||null===Q)Zh(),R=a,S=d,Q=Gf(R.current,null,S),a.pendingCommitExpirationTime=0;var e=!1;do{try{if(b)for(;null!==Q&&!ci();)Q=ai(Q);else for(;null!==Q;)Q=ai(Q)}catch(C){if(null===Q)e=!0,Nh(C);else{null===Q?r("271"):void 0;var f=Q,g=f.return;if(null===g)e=!0,Nh(C);else{a:{var h=a,k=g,l=f,m=C;g=S;l.effectTag|=512;l.firstEffect=l.lastEffect=null;if(null!==m&&"object"===typeof m&&"function"===
typeof m.then){var p=m;m=k;var v=-1,B=-1;do{if(13===m.tag){var w=m.alternate;if(null!==w&&(w=w.memoizedState,null!==w&&w.didTimeout)){B=10*(w.timedOutAt-2);break}w=m.pendingProps.maxDuration;if("number"===typeof w)if(0>=w)v=0;else if(-1===v||w<v)v=w}m=m.return}while(null!==m);m=k;do{if(w=13===m.tag)void 0===m.memoizedProps.fallback?w=!1:(w=m.memoizedState,w=null===w||!w.didTimeout);if(w){k=di.bind(null,h,m,l,0===(m.mode&1)?1:g);p.then(k,k);if(0===(m.mode&1)){m.effectTag|=32;P(l.alternate,l,null,g);
l.effectTag&=-513;1===l.tag&&(l.effectTag&=-421,null===l.alternate&&(l.tag=17));break a}-1===v?h=1073741823:(-1===B&&(B=10*(Pf(h,g)-2)-5E3),h=B+v);0<=h&&Wh<h&&(Wh=h);m.effectTag|=1024;m.expirationTime=g;break a}m=m.return}while(null!==m);m=Error("An update was suspended, but no placeholder UI was provided.")}Xh=!0;m=bg(m,l);h=k;do{switch(h.tag){case 3:l=m;h.effectTag|=1024;h.expirationTime=g;g=Mh(h,l,g);Wf(h,g);break a;case 1:if(l=m,k=h.type,p=h.stateNode,0===(h.effectTag&64)&&("function"===typeof k.getDerivedStateFromError||
null!==p&&"function"===typeof p.componentDidCatch&&(null===Ph||!Ph.has(p)))){h.effectTag|=1024;h.expirationTime=g;g=Oh(h,l,g);Wf(h,g);break a}}h=h.return}while(null!==h)}Q=$h(f);continue}}}break}while(1);Vh=!1;fg=eg=dg=Sh.currentDispatcher=null;if(e)R=null,a.finishedWork=null;else if(null!==Q)a.finishedWork=null;else{b=a.current.alternate;null===b?r("281"):void 0;R=null;if(Xh){e=a.latestPendingTime;f=a.latestSuspendedTime;g=a.latestPingedTime;if(0!==e&&e>d||0!==f&&f>d||0!==g&&g>d){Of(a,d);ei(a,b,
d,a.expirationTime,-1);return}if(!a.didError&&!c){a.didError=!0;d=a.nextExpirationTimeToWorkOn=d;c=a.expirationTime=1;ei(a,b,d,c,-1);return}}c||-1===Wh?(a.pendingCommitExpirationTime=d,a.finishedWork=b):(Of(a,d),c=10*(Pf(a,d)-2),c<Wh&&(Wh=c),c=10*(vg()-2),c=Wh-c,ei(a,b,d,a.expirationTime,0>c?0:c))}}
function Gh(a,b){var c;a:{Vh&&!Yh?r("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 1:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ph||!Ph.has(d))){a=bg(b,a);a=Oh(c,a,1);Vf(c,a);xg(c,1);c=void 0;break a}break;case 3:a=bg(b,a);a=Mh(c,a,1);Vf(c,a);xg(c,1);c=void 0;break a}c=c.return}3===a.tag&&(c=bg(b,a),c=Mh(a,c,1),Vf(a,c),xg(a,1));c=void 0}return c}
function wg(a,b){0!==Uh?a=Uh:Vh?a=Yh?1:S:b.mode&1?(a=fi?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1),null!==R&&a===S&&(a+=1)):a=1;fi&&a>gi&&(gi=a);return a}
function di(a,b,c,d){var e=a.earliestSuspendedTime;var f=a.latestSuspendedTime;if(0!==e&&d>=e&&d<=f){f=e=d;a.didError=!1;var g=a.latestPingedTime;if(0===g||g<f)a.latestPingedTime=f;Nf(f,a)}else e=vg(),e=wg(e,b),Mf(a,e);0!==(b.mode&1)&&a===R&&S===d&&(R=null);hi(b,e);0===(b.mode&1)&&(hi(c,e),1===c.tag&&null!==c.stateNode&&(b=Tf(e),b.tag=2,Vf(c,b)));c=a.expirationTime;0!==c&&ii(a,c)}
function hi(a,b){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;var c=a.alternate;null!==c&&(0===c.expirationTime||c.expirationTime>b)&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;if(0===d.childExpirationTime||d.childExpirationTime>b)d.childExpirationTime=b;null!==c&&(0===c.childExpirationTime||c.childExpirationTime>b)&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return}return null===
e?null:e}function xg(a,b){a=hi(a,b);null!==a&&(!Vh&&0!==S&&b<S&&Zh(),Mf(a,b),Vh&&!Yh&&R===a||ii(a,a.expirationTime),ji>ki&&(ji=0,r("185")))}function li(a,b,c,d,e){var f=Uh;Uh=1;try{return a(b,c,d,e)}finally{Uh=f}}var U=null,V=null,mi=0,ni=void 0,W=!1,X=null,Y=0,gi=0,oi=!1,pi=!1,qi=null,ri=null,Z=!1,si=!1,fi=!1,ti=null,ui=da.unstable_now(),vi=(ui/10|0)+2,wi=vi,ki=50,ji=0,xi=null,yi=1;function zi(){vi=((da.unstable_now()-ui)/10|0)+2}
function Ai(a,b){if(0!==mi){if(b>mi)return;null!==ni&&da.unstable_cancelCallback(ni)}mi=b;a=da.unstable_now()-ui;ni=da.unstable_scheduleCallback(Bi,{timeout:10*(b-2)-a})}function ei(a,b,c,d,e){a.expirationTime=d;0!==e||ci()?0<e&&(a.timeoutHandle=kf(Ci.bind(null,a,b,c),e)):(a.pendingCommitExpirationTime=c,a.finishedWork=b)}function Ci(a,b,c){a.pendingCommitExpirationTime=c;a.finishedWork=b;zi();wi=vi;Di(a,c)}function vg(){if(W)return wi;Ei();if(0===Y||1073741823===Y)zi(),wi=vi;return wi}
function ii(a,b){if(null===a.nextScheduledRoot)a.expirationTime=b,null===V?(U=V=a,a.nextScheduledRoot=a):(V=V.nextScheduledRoot=a,V.nextScheduledRoot=U);else{var c=a.expirationTime;if(0===c||b<c)a.expirationTime=b}W||(Z?si&&(X=a,Y=1,Fi(a,1,!0)):1===b?Gi(1,null):Ai(a,b))}
function Ei(){var a=0,b=null;if(null!==V)for(var c=V,d=U;null!==d;){var e=d.expirationTime;if(0===e){null===c||null===V?r("244"):void 0;if(d===d.nextScheduledRoot){U=V=d.nextScheduledRoot=null;break}else if(d===U)U=e=d.nextScheduledRoot,V.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V){V=c;V.nextScheduledRoot=U;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===V)break;if(1===a)break;
c=d;d=d.nextScheduledRoot}}X=b;Y=a}function Bi(a){if(a.didTimeout&&null!==U){zi();var b=U;do{var c=b.expirationTime;0!==c&&vi>=c&&(b.nextExpirationTimeToWorkOn=vi);b=b.nextScheduledRoot}while(b!==U)}Gi(0,a)}
function Gi(a,b){ri=b;Ei();if(null!==ri)for(zi(),wi=vi;null!==X&&0!==Y&&(0===a||a>=Y)&&(!oi||vi>=Y);)Fi(X,Y,vi>=Y),Ei(),zi(),wi=vi;else for(;null!==X&&0!==Y&&(0===a||a>=Y);)Fi(X,Y,!0),Ei();null!==ri&&(mi=0,ni=null);0!==Y&&Ai(X,Y);ri=null;oi=!1;ji=0;xi=null;if(null!==ti)for(a=ti,ti=null,b=0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(d){pi||(pi=!0,qi=d)}}if(pi)throw a=qi,qi=null,pi=!1,a;}function Di(a,b){W?r("253"):void 0;X=a;Y=b;Fi(a,b,!0);Gi(1,null)}
function Fi(a,b,c){W?r("245"):void 0;W=!0;if(null===ri||c){var d=a.finishedWork;null!==d?Hi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,lf(d)),bi(a,!1,c),d=a.finishedWork,null!==d&&Hi(a,d,b))}else d=a.finishedWork,null!==d?Hi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,lf(d)),bi(a,!0,c),d=a.finishedWork,null!==d&&(ci()?a.finishedWork=d:Hi(a,d,b)));W=!1}
function Hi(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===ti?ti=[d]:ti.push(d),d._defer)){a.finishedWork=b;a.expirationTime=0;return}a.finishedWork=null;a===xi?ji++:(xi=a,ji=0);Yh=Vh=!0;a.current===b?r("177"):void 0;var e=a.pendingCommitExpirationTime;0===e?r("261"):void 0;a.pendingCommitExpirationTime=0;var f=b.expirationTime,g=b.childExpirationTime,h=0===f||0!==g&&g<f?g:f;a.didError=!1;if(0===h)a.earliestPendingTime=0,a.latestPendingTime=0,a.earliestSuspendedTime=0,a.latestSuspendedTime=
0,a.latestPingedTime=0;else{var k=a.latestPendingTime;0!==k&&(k<h?a.earliestPendingTime=a.latestPendingTime=0:a.earliestPendingTime<h&&(a.earliestPendingTime=a.latestPendingTime));var l=a.earliestSuspendedTime;0===l?Mf(a,h):h>a.latestSuspendedTime?(a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=0,Mf(a,h)):h<l&&Mf(a,h)}Nf(0,a);Sh.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var m=b.firstEffect}else m=b;else m=b.firstEffect;ff=ce;var p=pe();if(qe(p)){if("selectionStart"in
p)var v={start:p.selectionStart,end:p.selectionEnd};else a:{var B=p.ownerDocument,w=B&&B.defaultView||window,C=w.getSelection&&w.getSelection();if(C&&0!==C.rangeCount){var u=C.anchorNode,q=C.anchorOffset,A=C.focusNode,fe=C.focusOffset;try{u.nodeType,A.nodeType}catch(db){v=null;break a}var Ib=0,Jc=-1,Kc=-1,Ni=0,Oi=0,t=p,Jb=null;b:for(;;){for(var Lc;;){t!==u||0!==q&&3!==t.nodeType||(Jc=Ib+q);t!==A||0!==fe&&3!==t.nodeType||(Kc=Ib+fe);3===t.nodeType&&(Ib+=t.nodeValue.length);if(null===(Lc=t.firstChild))break;
Jb=t;t=Lc}for(;;){if(t===p)break b;Jb===u&&++Ni===q&&(Jc=Ib);Jb===A&&++Oi===fe&&(Kc=Ib);if(null!==(Lc=t.nextSibling))break;t=Jb;Jb=t.parentNode}t=Lc}v=-1===Jc||-1===Kc?null:{start:Jc,end:Kc}}else v=null}var fh=v||{start:0,end:0}}else fh=null;gf={focusedElem:p,selectionRange:fh};ce=!1;for(T=m;null!==T;){var gh=!1,hh=void 0;try{for(;null!==T;){if(T.effectTag&256){var ve=T.alternate;a:{var Qb=T;switch(Qb.tag){case 1:if(Qb.effectTag&256&&null!==ve){var Zi=ve.memoizedProps,$i=ve.memoizedState,Vc=Qb.stateNode;
Vc.props=Qb.memoizedProps;Vc.state=Qb.memoizedState;var aj=Vc.getSnapshotBeforeUpdate(Zi,$i);Vc.__reactInternalSnapshotBeforeUpdate=aj}break a;case 3:case 5:case 6:case 4:case 17:break a;default:r("163")}}}T=T.nextEffect}}catch(db){gh=!0,hh=db}gh&&(null===T?r("178"):void 0,Gh(T,hh),null!==T&&(T=T.nextEffect))}for(T=m;null!==T;){var ih=!1,jh=void 0;try{for(;null!==T;){var we=T.effectTag;we&16&&Xe(T.stateNode,"");if(we&128){var kh=T.alternate;if(null!==kh){var Wc=kh.ref;null!==Wc&&("function"===typeof Wc?
Wc(null):Wc.current=null)}}switch(we&14){case 2:Kh(T);T.effectTag&=-3;break;case 6:Kh(T);T.effectTag&=-3;Lh(T.alternate,T);break;case 4:Lh(T.alternate,T);break;case 8:var lh=T;Ih(lh);var Rb=lh;Rb.return=null;Rb.child=null;Rb.alternate&&(Rb.alternate.child=null,Rb.alternate.return=null)}T=T.nextEffect}}catch(db){ih=!0,jh=db}ih&&(null===T?r("178"):void 0,Gh(T,jh),null!==T&&(T=T.nextEffect))}var mh=gf,bj=pe(),E=mh.focusedElem,eb=mh.selectionRange;if(bj!==E&&E&&E.ownerDocument&&oe(E.ownerDocument.documentElement,
E)){if(null!==eb&&qe(E)){var nh=eb.start,xe=eb.end;void 0===xe&&(xe=nh);if("selectionStart"in E)E.selectionStart=nh,E.selectionEnd=Math.min(xe,E.value.length);else{var ye=E.ownerDocument||document,ba=(ye&&ye.defaultView||window).getSelection(),oh=E.textContent.length,fb=Math.min(eb.start,oh),Sb=void 0===eb.end?fb:Math.min(eb.end,oh);if(!ba.extend&&fb>Sb){var cj=Sb;Sb=fb;fb=cj}var Tb=ne(E,fb),Ja=ne(E,Sb);if(Tb&&Ja&&(1!==ba.rangeCount||ba.anchorNode!==Tb.node||ba.anchorOffset!==Tb.offset||ba.focusNode!==
Ja.node||ba.focusOffset!==Ja.offset)){var Xc=ye.createRange();Xc.setStart(Tb.node,Tb.offset);ba.removeAllRanges();fb>Sb?(ba.addRange(Xc),ba.extend(Ja.node,Ja.offset)):(Xc.setEnd(Ja.node,Ja.offset),ba.addRange(Xc))}}}for(var ze=[],gb=E;gb=gb.parentNode;)1===gb.nodeType&&ze.push({element:gb,left:gb.scrollLeft,top:gb.scrollTop});"function"===typeof E.focus&&E.focus();for(var Ae=0;Ae<ze.length;Ae++){var Yc=ze[Ae];Yc.element.scrollLeft=Yc.left;Yc.element.scrollTop=Yc.top}}gf=null;ce=!!ff;ff=null;a.current=
b;for(T=m;null!==T;){var ph=!1,qh=void 0;try{for(var dj=e;null!==T;){var rh=T.effectTag;if(rh&36){var Zc=void 0,hb=T.alternate,x=T,sh=dj;switch(x.tag){case 1:var ca=x.stateNode;if(x.effectTag&4)if(null===hb)ca.props=x.memoizedProps,ca.state=x.memoizedState,ca.componentDidMount();else{var ej=hb.memoizedProps,fj=hb.memoizedState;ca.props=x.memoizedProps;ca.state=x.memoizedState;ca.componentDidUpdate(ej,fj,ca.__reactInternalSnapshotBeforeUpdate)}var th=x.updateQueue;null!==th&&(ca.props=x.memoizedProps,
ca.state=x.memoizedState,$f(x,th,ca,sh));break;case 3:var uh=x.updateQueue;if(null!==uh){var Be=null;if(null!==x.child)switch(x.child.tag){case 5:Be=x.child.stateNode;break;case 1:Be=x.child.stateNode}$f(x,uh,Be,sh)}break;case 5:var gj=x.stateNode;null===hb&&x.effectTag&4&&hf(x.type,x.memoizedProps)&&gj.focus();break;case 6:break;case 4:break;case 12:break;case 13:if(x.effectTag&32){x.memoizedState={alreadyCaptured:!0,didTimeout:!1,timedOutAt:0};xg(x,1);break}var vh=null!==hb?hb.memoizedState:null,
Ub=x.memoizedState,hj=null!==vh?vh.didTimeout:!1,Ce=x;if(null===Ub)Zc=!1;else if(Zc=Ub.didTimeout)Ce=x.child,Ub.alreadyCaptured=!1,0===Ub.timedOutAt&&(Ub.timedOutAt=vg());if(Zc!==hj&&null!==Ce)a:for(var De=Ce,wh=Zc,z=De;;){if(5===z.tag){var ij=z.stateNode;if(wh)ij.style.display="none";else{var jj=z.stateNode,$c=z.memoizedProps.style,kj=void 0!==$c&&null!==$c&&$c.hasOwnProperty("display")?$c.display:null;jj.style.display=kj}}else if(6===z.tag)z.stateNode.nodeValue=wh?"":z.memoizedProps;else if(null!==
z.child){z.child.return=z;z=z.child;continue}if(z===De)break a;for(;null===z.sibling;){if(null===z.return||z.return===De)break a;z=z.return}z.sibling.return=z.return;z=z.sibling}break;case 17:break;default:r("163")}}if(rh&128){var ad=T.ref;if(null!==ad){var xh=T.stateNode;switch(T.tag){case 5:var Ee=xh;break;default:Ee=xh}"function"===typeof ad?ad(Ee):ad.current=Ee}}var lj=T.nextEffect;T.nextEffect=null;T=lj}}catch(db){ph=!0,qh=db}ph&&(null===T?r("178"):void 0,Gh(T,qh),null!==T&&(T=T.nextEffect))}Vh=
Yh=!1;"function"===typeof zf&&zf(b.stateNode);var Fe=b.expirationTime,Ge=b.childExpirationTime,yh=0===Fe||0!==Ge&&Ge<Fe?Ge:Fe;0===yh&&(Ph=null);a.expirationTime=yh;a.finishedWork=null}function ci(){return oi?!0:null===ri||ri.timeRemaining()>yi?!1:oi=!0}function Nh(a){null===X?r("246"):void 0;X.expirationTime=0;pi||(pi=!0,qi=a)}function Ii(a,b){var c=Z;Z=!0;try{return a(b)}finally{(Z=c)||W||Gi(1,null)}}function Ji(a,b){if(Z&&!si){si=!0;try{return a(b)}finally{si=!1}}return a(b)}
function Ki(a,b,c){if(fi)return a(b,c);Z||W||0===gi||(Gi(gi,null),gi=0);var d=fi,e=Z;Z=fi=!0;try{return a(b,c)}finally{fi=d,(Z=e)||W||Gi(1,null)}}
function Li(a,b,c,d,e){var f=b.current;a:if(c){c=c._reactInternalFiber;b:{2===Gd(c)&&1===c.tag?void 0:r("170");var g=c;do{switch(g.tag){case 3:g=g.stateNode.context;break b;case 1:if(M(g.type)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}}g=g.return}while(null!==g);r("171");g=void 0}if(1===c.tag){var h=c.type;if(M(h)){c=wf(c,h,g);break a}}c=g}else c=qf;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Tf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);
Vf(f,e);xg(f,d);return d}function Mi(a,b,c,d){var e=b.current,f=vg();e=wg(f,e);return Li(a,b,c,e,d)}function Pi(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Qi(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:nc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
Nb=function(a,b,c){switch(b){case "input":Tc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Qa(d);e?void 0:r("90");jc(d);Tc(d,e)}}}break;case "textarea":Qe(a,c);break;case "select":b=c.value,null!=b&&Ne(a,!!c.multiple,b,!1)}};
function Ri(a){var b=2+25*(((vg()-2+500)/25|0)+1);b<=Th&&(b=Th+1);this._expirationTime=Th=b;this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}Ri.prototype.render=function(a){this._defer?void 0:r("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new Si;Li(a,b,null,c,d._onCommit);return d};
Ri.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
Ri.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:r("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?r("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;Di(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};Ri.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function Si(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}Si.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
Si.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?r("191",c):void 0;c()}}};
function Ti(a,b,c){b=N(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,didError:!1,pendingCommitExpirationTime:0,finishedWork:null,timeoutHandle:-1,context:null,pendingContext:null,hydrate:c,nextExpirationTimeToWorkOn:0,expirationTime:0,firstBatch:null,nextScheduledRoot:null};this._internalRoot=b.stateNode=a}
Ti.prototype.render=function(a,b){var c=this._internalRoot,d=new Si;b=void 0===b?null:b;null!==b&&d.then(b);Mi(a,c,null,d._onCommit);return d};Ti.prototype.unmount=function(a){var b=this._internalRoot,c=new Si;a=void 0===a?null:a;null!==a&&c.then(a);Mi(null,b,null,c._onCommit);return c};Ti.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new Si;c=void 0===c?null:c;null!==c&&e.then(c);Mi(b,d,a,e._onCommit);return e};
Ti.prototype.createBatch=function(){var a=new Ri(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function Ui(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Yb=Ii;Zb=Ki;$b=function(){W||0===gi||(Gi(gi,null),gi=0)};
function Vi(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new Ti(a,!1,b)}
function Wi(a,b,c,d,e){Ui(c)?void 0:r("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=Pi(f._internalRoot);g.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=Vi(c,d);if("function"===typeof e){var h=e;e=function(){var a=Pi(f._internalRoot);h.call(a)}}Ji(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return Pi(f._internalRoot)}
function Xi(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Ui(b)?void 0:r("200");return Qi(a,b,null,c)}
var Yi={createPortal:Xi,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?r("188"):r("268",Object.keys(a)));a=Jd(b);a=null===a?null:a.stateNode;return a},hydrate:function(a,b,c){return Wi(null,a,b,!0,c)},render:function(a,b,c){return Wi(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?r("38"):void 0;return Wi(a,b,c,!1,d)},unmountComponentAtNode:function(a){Ui(a)?
void 0:r("40");return a._reactRootContainer?(Ji(function(){Wi(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return Xi.apply(void 0,arguments)},unstable_batchedUpdates:Ii,unstable_interactiveUpdates:Ki,flushSync:function(a,b){W?r("187"):void 0;var c=Z;Z=!0;try{return li(a,b)}finally{Z=c,Gi(1,null)}},unstable_flushControlled:function(a){var b=Z;Z=!0;try{li(a)}finally{(Z=b)||W||Gi(1,null)}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[Oa,
Pa,Qa,Ga.injectEventPluginsByName,sa,Wa,function(a){Ba(a,Va)},Wb,Xb,ee,Ia]},unstable_createRoot:function(a,b){Ui(a)?void 0:r("278");return new Ti(a,!0,null!=b&&!0===b.hydrate)}};(function(a){var b=a.findFiberByHostInstance;return Cf(n({},a,{findHostInstanceByFiber:function(a){a=Jd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))})({findFiberByHostInstance:Na,bundleType:0,version:"16.6.0",rendererPackageName:"react-dom"});
var mj={default:Yi},nj=mj&&Yi||mj;module.exports=nj.default||nj;


/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(/*! ./cjs/react-dom.production.min.js */ "./node_modules/react-dom/cjs/react-dom.production.min.js");
} else {}


/***/ }),

/***/ "./node_modules/react/cjs/react.production.min.js":
/*!********************************************************!*\
  !*** ./node_modules/react/cjs/react.production.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.6.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var k=__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,z=n?Symbol.for("react.suspense"):60113,A=n?Symbol.for("react.memo"):
60115,B=n?Symbol.for("react.lazy"):60116,C="function"===typeof Symbol&&Symbol.iterator;function aa(a,b,e,c,d,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[e,c,d,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation"}a.framesToPop=1;throw a;}}
function D(a){for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)e+="&args[]="+encodeURIComponent(arguments[c+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},F={};
function G(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E}G.prototype.isReactComponent={};G.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};G.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function H(){}H.prototype=G.prototype;function I(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E}var J=I.prototype=new H;
J.constructor=I;k(J,G.prototype);J.isPureReactComponent=!0;var K={current:null,currentDispatcher:null},L=Object.prototype.hasOwnProperty,M={key:!0,ref:!0,__self:!0,__source:!0};
function N(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];d.children=l}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:p,type:a,key:g,ref:h,props:d,_owner:K.current}}
function ba(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,e,c){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return e(c,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+U(d,h);g+=T(d,f,e,c)}else if(null===a||"object"!==typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),h=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,h++),g+=T(d,f,e,c);else"object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function V(a,b,e){return null==a?0:T(a,"",b,e)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ca(a,b){a.func.call(a.context,b,a.count++)}
function da(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,function(a){return a}):null!=a&&(O(a)&&(a=ba(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+e)),c.push(a))}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(P,"$&/")+"/");b=R(b,g,c,d);V(a,da,b);S(b)}
var X={Children:{map:function(a,b,e){if(null==a)return a;var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=R(null,null,b,e);V(a,ca,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];W(a,b,null,function(a){return a});return b},only:function(a){O(a)?void 0:D("143");return a}},createRef:function(){return{current:null}},Component:G,PureComponent:I,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
_currentValue:a,_currentValue2:a,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:y,render:a}},lazy:function(a){return{$$typeof:B,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return{$$typeof:A,type:a,compare:void 0===b?null:b}},Fragment:r,StrictMode:t,unstable_ConcurrentMode:x,Suspense:z,unstable_Profiler:u,createElement:N,cloneElement:function(a,b,e){null===a||void 0===a?D("267",a):void 0;var c=void 0,d=k({},a.props),
g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=K.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c])}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];d.children=l}return{$$typeof:p,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=N.bind(null,a);b.type=a;return b},
isValidElement:O,version:"16.6.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:K,assign:k}},Y={default:X},Z=Y&&X||Y;module.exports=Z.default||Z;


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react.production.min.js */ "./node_modules/react/cjs/react.production.min.js");
} else {}


/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.production.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.production.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.6.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});var c=null,f=3,h=-1,k=-1,l=!1,m=!1,n="object"===typeof performance&&"function"===typeof performance.now,q={timeRemaining:n?function(){if(null!==c&&c.expirationTime<k)return 0;var a=p()-performance.now();return 0<a?a:0}:function(){if(null!==c&&c.expirationTime<k)return 0;var a=p()-Date.now();return 0<a?a:0},didTimeout:!1};function r(){if(!l){var a=c.expirationTime;m?t():m=!0;u(v,a)}}
function w(){var a=c,b=c.next;if(c===b)c=null;else{var d=c.previous;c=d.next=b;b.previous=d}a.next=a.previous=null;d=a.callback;b=a.expirationTime;a=a.priorityLevel;var e=f,R=k;f=a;k=b;try{var g=d(q)}finally{f=e,k=R}if("function"===typeof g)if(g={callback:g,priorityLevel:a,expirationTime:b,next:null,previous:null},null===c)c=g.next=g.previous=g;else{d=null;a=c;do{if(a.expirationTime>=b){d=a;break}a=a.next}while(a!==c);null===d?d=c:d===c&&(c=g,r());b=d.previous;b.next=d.previous=g;g.next=d;g.previous=
b}}function x(){if(-1===h&&null!==c&&1===c.priorityLevel){l=!0;q.didTimeout=!0;try{do w();while(null!==c&&1===c.priorityLevel)}finally{l=!1,null!==c?r():m=!1}}}function v(a){l=!0;q.didTimeout=a;try{if(a)for(;null!==c;){var b=exports.unstable_now();if(c.expirationTime<=b){do w();while(null!==c&&c.expirationTime<=b)}else break}else if(null!==c){do w();while(null!==c&&0<p()-exports.unstable_now())}}finally{l=!1,null!==c?r():m=!1,x()}}
var y=Date,z="function"===typeof setTimeout?setTimeout:void 0,A="function"===typeof clearTimeout?clearTimeout:void 0,B="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,C="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,D,E;function F(a){D=B(function(b){A(E);a(b)});E=z(function(){C(D);a(exports.unstable_now())},100)}if(n){var G=performance;exports.unstable_now=function(){return G.now()}}else exports.unstable_now=function(){return y.now()};var u,t,p;
if("undefined"!==typeof window&&window._schedMock){var H=window._schedMock;u=H[0];t=H[1];p=H[2]}else if("undefined"===typeof window||"function"!==typeof window.addEventListener){var I=null,J=-1,K=function(a,b){if(null!==I){var d=I;I=null;try{J=b,d(a)}finally{J=-1}}};u=function(a,b){-1!==J?setTimeout(u,0,a,b):(I=a,setTimeout(K,b,!0,b),setTimeout(K,1073741823,!1,1073741823))};t=function(){I=null};p=function(){return Infinity};exports.unstable_now=function(){return-1===J?0:J}}else{"undefined"!==typeof console&&
("function"!==typeof B&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!==typeof C&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var L=null,M=!1,N=-1,O=!1,P=!1,Q=0,S=33,T=33;p=function(){return Q};var U="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",
function(a){if(a.source===window&&a.data===U){M=!1;a=L;var b=N;L=null;N=-1;var d=exports.unstable_now(),e=!1;if(0>=Q-d)if(-1!==b&&b<=d)e=!0;else{O||(O=!0,F(V));L=a;N=b;return}if(null!==a){P=!0;try{a(e)}finally{P=!1}}}},!1);var V=function(a){if(null!==L){F(V);var b=a-Q+T;b<T&&S<T?(8>b&&(b=8),T=b<S?S:b):S=b;Q=a+T;M||(M=!0,window.postMessage(U,"*"))}else O=!1};u=function(a,b){L=a;N=b;P||0>b?window.postMessage(U,"*"):O||(O=!0,F(V))};t=function(){L=null;M=!1;N=-1}}exports.unstable_ImmediatePriority=1;
exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=4;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:break;default:a=3}var d=f,e=h;f=a;h=exports.unstable_now();try{return b()}finally{f=d,h=e,x()}};
exports.unstable_scheduleCallback=function(a,b){var d=-1!==h?h:exports.unstable_now();if("object"===typeof b&&null!==b&&"number"===typeof b.timeout)b=d+b.timeout;else switch(f){case 1:b=d+-1;break;case 2:b=d+250;break;case 4:b=d+1073741823;break;default:b=d+5E3}a={callback:a,priorityLevel:f,expirationTime:b,next:null,previous:null};if(null===c)c=a.next=a.previous=a,r();else{d=null;var e=c;do{if(e.expirationTime>b){d=e;break}e=e.next}while(e!==c);null===d?d=c:d===c&&(c=a,r());b=d.previous;b.next=d.previous=
a;a.next=d;a.previous=b}return a};exports.unstable_cancelCallback=function(a){var b=a.next;if(null!==b){if(b===a)c=null;else{a===c&&(c=b);var d=a.previous;d.next=b;b.previous=d}a.next=a.previous=null}};exports.unstable_wrapCallback=function(a){var b=f;return function(){var d=f,e=h;f=b;h=exports.unstable_now();try{return a.apply(this,arguments)}finally{f=d,h=e,x()}}};exports.unstable_getCurrentPriorityLevel=function(){return f};


/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.production.min.js */ "./node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./vendor/vendor.ts":
/*!**************************!*\
  !*** ./vendor/vendor.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_Fabric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/Fabric */ "./node_modules/office-ui-fabric-react/lib/Fabric.js");





/***/ })

/******/ });
//# sourceMappingURL=vendor.map