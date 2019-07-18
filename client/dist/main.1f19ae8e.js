// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {};
  },
  methods: {
    record: function record() {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(function (stream) {
        var mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        var audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", function (event) {
          audioChunks.push(event.data);
        });
        var recordButton = document.getElementById("stoprecord");
        recordButton.addEventListener("click", function () {
          mediaRecorder.stop();
        });
        mediaRecorder.addEventListener("stop", function () {
          var audioBlob = new Blob(audioChunks);
          var audioURL = URL.createObjectURL(audioBlob);
          var audio = new Audio(audioURL);
          audio.play();
          console.log(audio, "==========================");
        });
      });
    }
  }
};
exports.default = _default;
        var $7126de = exports.default || module.exports;
      
      if (typeof $7126de === 'function') {
        $7126de = $7126de.options;
      }
    
        /* template */
        Object.assign($7126de, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Hello World")]),
    _vm._v(" "),
    _c("button", { on: { click: _vm.record } }, [_vm._v("Record")]),
    _vm._v(" "),
    _c("button", { attrs: { id: "stoprecord" } }, [_vm._v("Stop Recording")])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$7126de', $7126de);
          } else {
            api.reload('$7126de', $7126de);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/vue-audio-recorder/dist/vue-audio-recorder.min.js":[function(require,module,exports) {
var define;
!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("VueAudioRecorder", [], t) : "object" == typeof exports ? exports.VueAudioRecorder = t() : e.VueAudioRecorder = t();
}(window, function () {
  return function (n) {
    var a = {};

    function r(e) {
      if (a[e]) return a[e].exports;
      var t = a[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return n[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports;
    }

    return r.m = n, r.c = a, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      });
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, r.t = function (t, e) {
      if (1 & e && (t = r(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var a in t) r.d(n, a, function (e) {
        return t[e];
      }.bind(null, a));
      return n;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 49);
  }([function (e, t) {
    function s(e) {
      return new Int16Array(e);
    }

    function i(e) {
      return new Int32Array(e);
    }

    function o(e) {
      return new Float32Array(e);
    }

    var n = {
      fill: function (e, t, n, a) {
        if (2 == arguments.length) for (var r = 0; r < e.length; r++) e[r] = t;else for (r = t; r < n; r++) e[r] = a;
      }
    },
        a = {
      arraycopy: function (e, t, n, a, r) {
        for (var s = t + r; t < s;) n[a++] = e[t++];
      }
    },
        r = {};

    function _(e) {
      this.ordinal = e;
    }

    r.SQRT2 = 1.4142135623730951, r.FAST_LOG10 = function (e) {
      return Math.log10(e);
    }, r.FAST_LOG10_X = function (e, t) {
      return Math.log10(e) * t;
    }, _.short_block_allowed = new _(0), _.short_block_coupled = new _(1), _.short_block_dispensed = new _(2), _.short_block_forced = new _(3);
    var l = {};

    function f(e) {
      this.ordinal = e;
    }

    l.MAX_VALUE = 34028235e31, f.vbr_off = new f(0), f.vbr_mt = new f(1), f.vbr_rh = new f(2), f.vbr_abr = new f(3), f.vbr_mtrh = new f(4), f.vbr_default = f.vbr_mtrh;
    e.exports = {
      System: a,
      VbrMode: f,
      Float: l,
      ShortBlock: _,
      Util: r,
      Arrays: n,
      new_array_n: function e(t) {
        if (1 == t.length) return new Array(t[0]);
        var n = t[0];
        t = t.slice(1);

        for (var a = [], r = 0; r < n; r++) a.push(e(t));

        return a;
      },
      new_byte: function (e) {
        return new Int8Array(e);
      },
      new_double: function (e) {
        return new Float64Array(e);
      },
      new_float: o,
      new_float_n: function e(t) {
        if (1 == t.length) return o(t[0]);
        var n = t[0];
        t = t.slice(1);

        for (var a = [], r = 0; r < n; r++) a.push(e(t));

        return a;
      },
      new_int: i,
      new_int_n: function e(t) {
        if (1 == t.length) return i(t[0]);
        var n = t[0];
        t = t.slice(1);

        for (var a = [], r = 0; r < n; r++) a.push(e(t));

        return a;
      },
      new_short: s,
      new_short_n: function e(t) {
        if (1 == t.length) return s(t[0]);
        var n = t[0];
        t = t.slice(1);

        for (var a = [], r = 0; r < n; r++) a.push(e(t));

        return a;
      },
      assert: function (e) {}
    };
  }, function (e, t, n) {
    var a = n(0),
        F = a.System,
        C = a.VbrMode,
        D = (a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n),
        X = (a.new_byte, a.new_double, a.new_float),
        q = a.new_float_n,
        Y = a.new_int,
        j = (a.new_int_n, a.assert);

    function U() {
      var e = n(30),
          k = n(31),
          P = U.FFTOFFSET,
          L = U.MPG_MD_MS_LR,
          I = null,
          V = this.psy = null,
          H = null,
          O = null;

      this.setModules = function (e, t, n, a) {
        I = e, this.psy = t, V = t, H = a, O = n;
      };

      var N = new e();

      this.lame_encode_mp3_frame = function (e, t, n, a, r, s) {
        var i,
            o = D([2, 2]);
        o[0][0] = new k(), o[0][1] = new k(), o[1][0] = new k(), o[1][1] = new k();

        var _,
            l = D([2, 2]);

        l[0][0] = new k(), l[0][1] = new k(), l[1][0] = new k(), l[1][1] = new k();
        var f,
            c,
            u,
            h = [null, null],
            p = e.internal_flags,
            d = q([2, 4]),
            b = [.5, .5],
            m = [[0, 0], [0, 0]],
            v = [[0, 0], [0, 0]];

        if (h[0] = t, h[1] = n, 0 == p.lame_encode_frame_init && function (e, t) {
          var n,
              a,
              r = e.internal_flags;

          if (0 == r.lame_encode_frame_init) {
            var s,
                i,
                o = X(2014),
                _ = X(2014);

            for (r.lame_encode_frame_init = 1, i = s = 0; s < 286 + 576 * (1 + r.mode_gr); ++s) s < 576 * r.mode_gr ? (o[s] = 0, 2 == r.channels_out && (_[s] = 0)) : (o[s] = t[0][i], 2 == r.channels_out && (_[s] = t[1][i]), ++i);

            for (a = 0; a < r.mode_gr; a++) for (n = 0; n < r.channels_out; n++) r.l3_side.tt[a][n].block_type = U.SHORT_TYPE;

            N.mdct_sub48(r, o, _), j(U.FFTOFFSET <= 576), j(r.mf_size >= U.BLKSIZE + e.framesize - U.FFTOFFSET), j(r.mf_size >= 512 + e.framesize - 32);
          }
        }(e, h), p.padding = 0, (p.slot_lag -= p.frac_SpF) < 0 && (p.slot_lag += e.out_samplerate, p.padding = 1), 0 != p.psymodel) {
          var g = [null, null],
              w = 0,
              S = Y(2);

          for (u = 0; u < p.mode_gr; u++) {
            for (c = 0; c < p.channels_out; c++) g[c] = h[c], w = 576 + 576 * u - U.FFTOFFSET;

            if (0 != (e.VBR == C.vbr_mtrh || e.VBR == C.vbr_mt ? V.L3psycho_anal_vbr(e, g, w, u, o, l, m[u], v[u], d[u], S) : V.L3psycho_anal_ns(e, g, w, u, o, l, m[u], v[u], d[u], S))) return -4;

            for (e.mode == MPEGMode.JOINT_STEREO && (b[u] = d[u][2] + d[u][3], 0 < b[u] && (b[u] = d[u][3] / b[u])), c = 0; c < p.channels_out; c++) {
              var y = p.l3_side.tt[u][c];
              y.block_type = S[c], y.mixed_block_flag = 0;
            }
          }
        } else for (u = 0; u < p.mode_gr; u++) for (c = 0; c < p.channels_out; c++) p.l3_side.tt[u][c].block_type = U.NORM_TYPE, p.l3_side.tt[u][c].mixed_block_flag = 0, v[u][c] = m[u][c] = 700;

        if (function (e) {
          var t, n;
          if (0 != e.ATH.useAdjust) {
            if (n = e.loudness_sq[0][0], t = e.loudness_sq[1][0], 2 == e.channels_out ? (n += e.loudness_sq[0][1], t += e.loudness_sq[1][1]) : (n += n, t += t), 2 == e.mode_gr && (n = Math.max(n, t)), n *= .5, .03125 < (n *= e.ATH.aaSensitivityP)) 1 <= e.ATH.adjust ? e.ATH.adjust = 1 : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = 1;else {
              var a = 31.98 * n + 625e-6;
              e.ATH.adjust >= a ? (e.ATH.adjust *= .075 * a + .925, e.ATH.adjust < a && (e.ATH.adjust = a)) : e.ATH.adjustLimit >= a ? e.ATH.adjust = a : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = a;
            }
          } else e.ATH.adjust = 1;
        }(p), N.mdct_sub48(p, h[0], h[1]), p.mode_ext = U.MPG_MD_LR_LR, e.force_ms) p.mode_ext = U.MPG_MD_MS_LR;else if (e.mode == MPEGMode.JOINT_STEREO) {
          var M = 0,
              x = 0;

          for (u = 0; u < p.mode_gr; u++) for (c = 0; c < p.channels_out; c++) M += v[u][c], x += m[u][c];

          if (M <= 1 * x) {
            var R = p.l3_side.tt[0],
                A = p.l3_side.tt[p.mode_gr - 1];
            R[0].block_type == R[1].block_type && A[0].block_type == A[1].block_type && (p.mode_ext = U.MPG_MD_MS_LR);
          }
        }
        if (f = p.mode_ext == L ? (_ = l, v) : (_ = o, m), e.analysis && null != p.pinfo) for (u = 0; u < p.mode_gr; u++) for (c = 0; c < p.channels_out; c++) p.pinfo.ms_ratio[u] = p.ms_ratio[u], p.pinfo.ms_ener_ratio[u] = b[u], p.pinfo.blocktype[u][c] = p.l3_side.tt[u][c].block_type, p.pinfo.pe[u][c] = f[u][c], F.arraycopy(p.l3_side.tt[u][c].xr, 0, p.pinfo.xr[u][c], 0, 576), p.mode_ext == L && (p.pinfo.ers[u][c] = p.pinfo.ers[u][c + 2], F.arraycopy(p.pinfo.energy[u][c + 2], 0, p.pinfo.energy[u][c], 0, p.pinfo.energy[u][c].length));

        if (e.VBR == C.vbr_off || e.VBR == C.vbr_abr) {
          var B, E;

          for (B = 0; B < 18; B++) p.nsPsy.pefirbuf[B] = p.nsPsy.pefirbuf[B + 1];

          for (u = E = 0; u < p.mode_gr; u++) for (c = 0; c < p.channels_out; c++) E += f[u][c];

          for (p.nsPsy.pefirbuf[18] = E, E = p.nsPsy.pefirbuf[9], B = 0; B < 9; B++) E += (p.nsPsy.pefirbuf[B] + p.nsPsy.pefirbuf[18 - B]) * U.fircoef[B];

          for (E = 3350 * p.mode_gr * p.channels_out / E, u = 0; u < p.mode_gr; u++) for (c = 0; c < p.channels_out; c++) f[u][c] *= E;
        }

        if (p.iteration_loop.iteration_loop(e, f, b, _), I.format_bitstream(e), i = I.copy_buffer(p, a, r, s, 1), e.bWriteVbrTag && H.addVbrFrame(e), e.analysis && null != p.pinfo) {
          for (c = 0; c < p.channels_out; c++) {
            var T;

            for (T = 0; T < P; T++) p.pinfo.pcmdata[c][T] = p.pinfo.pcmdata[c][T + e.framesize];

            for (T = P; T < 1600; T++) p.pinfo.pcmdata[c][T] = h[c][T - P];
          }

          O.set_frame_pinfo(e, _);
        }

        return function (e) {
          var t, n;

          for (j(0 <= e.bitrate_index && e.bitrate_index < 16), j(0 <= e.mode_ext && e.mode_ext < 4), e.bitrate_stereoMode_Hist[e.bitrate_index][4]++, e.bitrate_stereoMode_Hist[15][4]++, 2 == e.channels_out && (e.bitrate_stereoMode_Hist[e.bitrate_index][e.mode_ext]++, e.bitrate_stereoMode_Hist[15][e.mode_ext]++), t = 0; t < e.mode_gr; ++t) for (n = 0; n < e.channels_out; ++n) {
            var a = 0 | e.l3_side.tt[t][n].block_type;
            0 != e.l3_side.tt[t][n].mixed_block_flag && (a = 4), e.bitrate_blockType_Hist[e.bitrate_index][a]++, e.bitrate_blockType_Hist[e.bitrate_index][5]++, e.bitrate_blockType_Hist[15][a]++, e.bitrate_blockType_Hist[15][5]++;
          }
        }(p), i;
      };
    }

    U.ENCDELAY = 576, U.POSTDELAY = 1152, U.FFTOFFSET = 224 + (U.MDCTDELAY = 48), U.DECDELAY = 528, U.SBLIMIT = 32, U.CBANDS = 64, U.SBPSY_l = 21, U.SBPSY_s = 12, U.SBMAX_l = 22, U.SBMAX_s = 13, U.PSFB21 = 6, U.PSFB12 = 6, U.HBLKSIZE = (U.BLKSIZE = 1024) / 2 + 1, U.HBLKSIZE_s = (U.BLKSIZE_s = 256) / 2 + 1, U.NORM_TYPE = 0, U.START_TYPE = 1, U.SHORT_TYPE = 2, U.STOP_TYPE = 3, U.MPG_MD_LR_LR = 0, U.MPG_MD_LR_I = 1, U.MPG_MD_MS_LR = 2, U.MPG_MD_MS_I = 3, U.fircoef = [-.1039435, -.1892065, 5 * -.0432472, -.155915, 3898045e-23, .0467745 * 5, .50455, .756825, .187098 * 5], e.exports = U;
  }, function (e, t) {
    e.exports = function (n) {
      var i = [];
      return i.toString = function () {
        return this.map(function (e) {
          var t = function (e, t) {
            var n = e[1] || "",
                a = e[3];
            if (!a) return n;

            if (t && "function" == typeof btoa) {
              var r = (i = a, ""),
                  s = a.sources.map(function (e) {
                return "/*# sourceURL=" + a.sourceRoot + e + " */";
              });
              return [n].concat(s).concat([r]).join("\n");
            }

            var i;
            return [n].join("\n");
          }(e, n);

          return e[2] ? "@media " + e[2] + "{" + t + "}" : t;
        }).join("");
      }, i.i = function (e, t) {
        "string" == typeof e && (e = [[null, e, ""]]);

        for (var n = {}, a = 0; a < this.length; a++) {
          var r = this[a][0];
          "number" == typeof r && (n[r] = !0);
        }

        for (a = 0; a < e.length; a++) {
          var s = e[a];
          "number" == typeof s[0] && n[s[0]] || (t && !s[2] ? s[2] = t : t && (s[2] = "(" + s[2] + ") and (" + t + ")"), i.push(s));
        }
      }, i;
    };
  }, function (e, t, n) {
    "use strict";

    function _(e, t) {
      for (var n = [], a = {}, r = 0; r < t.length; r++) {
        var s = t[r],
            i = s[0],
            o = {
          id: e + ":" + r,
          css: s[1],
          media: s[2],
          sourceMap: s[3]
        };
        a[i] ? a[i].parts.push(o) : n.push(a[i] = {
          id: i,
          parts: [o]
        });
      }

      return n;
    }

    n.r(t), n.d(t, "default", function () {
      return p;
    });
    var a = "undefined" != typeof document;
    if ("undefined" != typeof DEBUG && DEBUG && !a) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");

    var l = {},
        r = a && (document.head || document.getElementsByTagName("head")[0]),
        s = null,
        i = 0,
        f = !1,
        o = function () {},
        c = null,
        u = "data-vue-ssr-id",
        h = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

    function p(i, e, t, n) {
      f = t, c = n || {};

      var o = _(i, e);

      return d(o), function (e) {
        for (var t = [], n = 0; n < o.length; n++) {
          var a = o[n];
          (r = l[a.id]).refs--, t.push(r);
        }

        e ? d(o = _(i, e)) : o = [];

        for (n = 0; n < t.length; n++) {
          var r;

          if (0 === (r = t[n]).refs) {
            for (var s = 0; s < r.parts.length; s++) r.parts[s]();

            delete l[r.id];
          }
        }
      };
    }

    function d(e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t],
            a = l[n.id];

        if (a) {
          a.refs++;

          for (var r = 0; r < a.parts.length; r++) a.parts[r](n.parts[r]);

          for (; r < n.parts.length; r++) a.parts.push(m(n.parts[r]));

          a.parts.length > n.parts.length && (a.parts.length = n.parts.length);
        } else {
          var s = [];

          for (r = 0; r < n.parts.length; r++) s.push(m(n.parts[r]));

          l[n.id] = {
            id: n.id,
            refs: 1,
            parts: s
          };
        }
      }
    }

    function b() {
      var e = document.createElement("style");
      return e.type = "text/css", r.appendChild(e), e;
    }

    function m(t) {
      var n,
          a,
          e = document.querySelector("style[" + u + '~="' + t.id + '"]');

      if (e) {
        if (f) return o;
        e.parentNode.removeChild(e);
      }

      if (h) {
        var r = i++;
        e = s || (s = b()), n = w.bind(null, e, r, !1), a = w.bind(null, e, r, !0);
      } else e = b(), n = function (e, t) {
        var n = t.css,
            a = t.media,
            r = t.sourceMap;
        a && e.setAttribute("media", a);
        c.ssrId && e.setAttribute(u, t.id);
        r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        if (e.styleSheet) e.styleSheet.cssText = n;else {
          for (; e.firstChild;) e.removeChild(e.firstChild);

          e.appendChild(document.createTextNode(n));
        }
      }.bind(null, e), a = function () {
        e.parentNode.removeChild(e);
      };

      return n(t), function (e) {
        if (e) {
          if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
          n(t = e);
        } else a();
      };
    }

    var v,
        g = (v = [], function (e, t) {
      return v[e] = t, v.filter(Boolean).join("\n");
    });

    function w(e, t, n, a) {
      var r = n ? "" : a.css;
      if (e.styleSheet) e.styleSheet.cssText = g(t, r);else {
        var s = document.createTextNode(r),
            i = e.childNodes;
        i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(s, i[t]) : e.appendChild(s);
      }
    }
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte),
        s = a.new_double,
        i = a.new_float,
        o = a.new_float_n,
        _ = a.new_int,
        l = a.new_int_n,
        f = (a.assert, n(33)),
        c = n(10),
        u = n(34),
        h = n(35),
        p = n(8),
        d = n(1),
        b = n(5);

    function m() {
      var e = 40;

      function t() {
        this.write_timing = 0, this.ptr = 0, this.buf = r(e);
      }

      this.Class_ID = 0, this.lame_encode_frame_init = 0, this.iteration_init_init = 0, this.fill_buffer_resample_init = 0, this.mfbuf = o([2, m.MFSIZE]), this.mode_gr = 0, this.channels_in = 0, this.channels_out = 0, this.resample_ratio = 0, this.mf_samples_to_encode = 0, this.mf_size = 0, this.VBR_min_bitrate = 0, this.VBR_max_bitrate = 0, this.bitrate_index = 0, this.samplerate_index = 0, this.mode_ext = 0, this.lowpass1 = 0, this.lowpass2 = 0, this.highpass1 = 0, this.highpass2 = 0, this.noise_shaping = 0, this.noise_shaping_amp = 0, this.substep_shaping = 0, this.psymodel = 0, this.noise_shaping_stop = 0, this.subblock_gain = 0, this.use_best_huffman = 0, this.full_outer_loop = 0, this.l3_side = new f(), this.ms_ratio = i(2), this.padding = 0, this.frac_SpF = 0, this.slot_lag = 0, this.tag_spec = null, this.nMusicCRC = 0, this.OldValue = _(2), this.CurrentStep = _(2), this.masking_lower = 0, this.bv_scf = _(576), this.pseudohalf = _(b.SFBMAX), this.sfb21_extra = !1, this.inbuf_old = new Array(2), this.blackfilt = new Array(2 * m.BPC + 1), this.itime = s(2), this.sideinfo_len = 0, this.sb_sample = o([2, 2, 18, d.SBLIMIT]), this.amp_filter = i(32), this.header = new Array(m.MAX_HEADER_BUF), this.h_ptr = 0, this.w_ptr = 0, this.ancillary_flag = 0, this.ResvSize = 0, this.ResvMax = 0, this.scalefac_band = new c(), this.minval_l = i(d.CBANDS), this.minval_s = i(d.CBANDS), this.nb_1 = o([4, d.CBANDS]), this.nb_2 = o([4, d.CBANDS]), this.nb_s1 = o([4, d.CBANDS]), this.nb_s2 = o([4, d.CBANDS]), this.s3_ss = null, this.s3_ll = null, this.decay = 0, this.thm = new Array(4), this.en = new Array(4), this.tot_ener = i(4), this.loudness_sq = o([2, 2]), this.loudness_sq_save = i(2), this.mld_l = i(d.SBMAX_l), this.mld_s = i(d.SBMAX_s), this.bm_l = _(d.SBMAX_l), this.bo_l = _(d.SBMAX_l), this.bm_s = _(d.SBMAX_s), this.bo_s = _(d.SBMAX_s), this.npart_l = 0, this.npart_s = 0, this.s3ind = l([d.CBANDS, 2]), this.s3ind_s = l([d.CBANDS, 2]), this.numlines_s = _(d.CBANDS), this.numlines_l = _(d.CBANDS), this.rnumlines_l = i(d.CBANDS), this.mld_cb_l = i(d.CBANDS), this.mld_cb_s = i(d.CBANDS), this.numlines_s_num1 = 0, this.numlines_l_num1 = 0, this.pe = i(4), this.ms_ratio_s_old = 0, this.ms_ratio_l_old = 0, this.ms_ener_ratio_old = 0, this.blocktype_old = _(2), this.nsPsy = new u(), this.VBR_seek_table = new h(), this.ATH = null, this.PSY = null, this.nogap_total = 0, this.nogap_current = 0, this.decode_on_the_fly = !0, this.findReplayGain = !0, this.findPeakSample = !0, this.PeakSample = 0, this.RadioGain = 0, this.AudiophileGain = 0, this.rgdata = null, this.noclipGainChange = 0, this.noclipScale = 0, this.bitrate_stereoMode_Hist = l([16, 5]), this.bitrate_blockType_Hist = l([16, 6]), this.pinfo = null, this.hip = null, this.in_buffer_nsamples = 0, this.in_buffer_0 = null, this.in_buffer_1 = null, this.iteration_loop = null;

      for (var n = 0; n < this.en.length; n++) this.en[n] = new p();

      for (n = 0; n < this.thm.length; n++) this.thm[n] = new p();

      for (n = 0; n < this.header.length; n++) this.header[n] = new t();
    }

    m.MFSIZE = 3456 + d.ENCDELAY - d.MDCTDELAY, m.MAX_HEADER_BUF = 256, m.MAX_BITS_PER_CHANNEL = 4095, m.MAX_BITS_PER_GRANULE = 7680, m.BPC = 320, e.exports = m;
  }, function (e, t, n) {
    var a = n(1),
        r = {};
    r.SFBMAX = 3 * a.SBMAX_s, e.exports = r;
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        s = (a.new_float_n, a.new_int),
        i = (a.new_int_n, a.assert, n(5));

    e.exports = function () {
      this.xr = r(576), this.l3_enc = s(576), this.scalefac = s(i.SFBMAX), this.xrpow_max = 0, this.part2_3_length = 0, this.big_values = 0, this.count1 = 0, this.global_gain = 0, this.scalefac_compress = 0, this.block_type = 0, this.mixed_block_flag = 0, this.table_select = s(3), this.subblock_gain = s(4), this.region0_count = 0, this.region1_count = 0, this.preflag = 0, this.scalefac_scale = 0, this.count1table_select = 0, this.part2_length = 0, this.sfb_lmax = 0, this.sfb_smin = 0, this.psy_lmax = 0, this.sfbmax = 0, this.psymax = 0, this.sfbdivide = 0, this.width = s(i.SFBMAX), this.window = s(i.SFBMAX), this.count1bits = 0, this.sfb_partition_table = null, this.slen = s(4), this.max_nonzero_coeff = 0;
      var n = this;

      function a(e) {
        return new Int32Array(e);
      }

      this.assign = function (e) {
        var t;
        n.xr = (t = e.xr, new Float32Array(t)), n.l3_enc = a(e.l3_enc), n.scalefac = a(e.scalefac), n.xrpow_max = e.xrpow_max, n.part2_3_length = e.part2_3_length, n.big_values = e.big_values, n.count1 = e.count1, n.global_gain = e.global_gain, n.scalefac_compress = e.scalefac_compress, n.block_type = e.block_type, n.mixed_block_flag = e.mixed_block_flag, n.table_select = a(e.table_select), n.subblock_gain = a(e.subblock_gain), n.region0_count = e.region0_count, n.region1_count = e.region1_count, n.preflag = e.preflag, n.scalefac_scale = e.scalefac_scale, n.count1table_select = e.count1table_select, n.part2_length = e.part2_length, n.sfb_lmax = e.sfb_lmax, n.sfb_smin = e.sfb_smin, n.psy_lmax = e.psy_lmax, n.sfbmax = e.sfbmax, n.psymax = e.psymax, n.sfbdivide = e.sfbdivide, n.width = a(e.width), n.window = a(e.window), n.count1bits = e.count1bits, n.sfb_partition_table = e.sfb_partition_table.slice(0), n.slen = a(e.slen), n.max_nonzero_coeff = e.max_nonzero_coeff;
      };
    };
  }, function (e, t) {
    function n(e, t, n, a) {
      this.xlen = e, this.linmax = t, this.table = n, this.hlen = a;
    }

    var a = {
      t1HB: [1, 1, 1, 0],
      t2HB: [1, 2, 1, 3, 1, 1, 3, 2, 0],
      t3HB: [3, 2, 1, 1, 1, 1, 3, 2, 0],
      t5HB: [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0],
      t6HB: [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0],
      t7HB: [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0],
      t8HB: [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0],
      t9HB: [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0],
      t10HB: [1, 2, 10, 23, 35, 30, 12, 17, 3, 3, 8, 12, 18, 21, 12, 7, 11, 9, 15, 21, 32, 40, 19, 6, 14, 13, 22, 34, 46, 23, 18, 7, 20, 19, 33, 47, 27, 22, 9, 3, 31, 22, 41, 26, 21, 20, 5, 3, 14, 13, 10, 11, 16, 6, 5, 1, 9, 8, 7, 8, 4, 4, 2, 0],
      t11HB: [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0],
      t12HB: [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0],
      t13HB: [1, 5, 14, 21, 34, 51, 46, 71, 42, 52, 68, 52, 67, 44, 43, 19, 3, 4, 12, 19, 31, 26, 44, 33, 31, 24, 32, 24, 31, 35, 22, 14, 15, 13, 23, 36, 59, 49, 77, 65, 29, 40, 30, 40, 27, 33, 42, 16, 22, 20, 37, 61, 56, 79, 73, 64, 43, 76, 56, 37, 26, 31, 25, 14, 35, 16, 60, 57, 97, 75, 114, 91, 54, 73, 55, 41, 48, 53, 23, 24, 58, 27, 50, 96, 76, 70, 93, 84, 77, 58, 79, 29, 74, 49, 41, 17, 47, 45, 78, 74, 115, 94, 90, 79, 69, 83, 71, 50, 59, 38, 36, 15, 72, 34, 56, 95, 92, 85, 91, 90, 86, 73, 77, 65, 51, 44, 43, 42, 43, 20, 30, 44, 55, 78, 72, 87, 78, 61, 46, 54, 37, 30, 20, 16, 53, 25, 41, 37, 44, 59, 54, 81, 66, 76, 57, 54, 37, 18, 39, 11, 35, 33, 31, 57, 42, 82, 72, 80, 47, 58, 55, 21, 22, 26, 38, 22, 53, 25, 23, 38, 70, 60, 51, 36, 55, 26, 34, 23, 27, 14, 9, 7, 34, 32, 28, 39, 49, 75, 30, 52, 48, 40, 52, 28, 18, 17, 9, 5, 45, 21, 34, 64, 56, 50, 49, 45, 31, 19, 12, 15, 10, 7, 6, 3, 48, 23, 20, 39, 36, 35, 53, 21, 16, 23, 13, 10, 6, 1, 4, 2, 16, 15, 17, 27, 25, 20, 29, 11, 17, 12, 16, 8, 1, 1, 0, 1],
      t15HB: [7, 12, 18, 53, 47, 76, 124, 108, 89, 123, 108, 119, 107, 81, 122, 63, 13, 5, 16, 27, 46, 36, 61, 51, 42, 70, 52, 83, 65, 41, 59, 36, 19, 17, 15, 24, 41, 34, 59, 48, 40, 64, 50, 78, 62, 80, 56, 33, 29, 28, 25, 43, 39, 63, 55, 93, 76, 59, 93, 72, 54, 75, 50, 29, 52, 22, 42, 40, 67, 57, 95, 79, 72, 57, 89, 69, 49, 66, 46, 27, 77, 37, 35, 66, 58, 52, 91, 74, 62, 48, 79, 63, 90, 62, 40, 38, 125, 32, 60, 56, 50, 92, 78, 65, 55, 87, 71, 51, 73, 51, 70, 30, 109, 53, 49, 94, 88, 75, 66, 122, 91, 73, 56, 42, 64, 44, 21, 25, 90, 43, 41, 77, 73, 63, 56, 92, 77, 66, 47, 67, 48, 53, 36, 20, 71, 34, 67, 60, 58, 49, 88, 76, 67, 106, 71, 54, 38, 39, 23, 15, 109, 53, 51, 47, 90, 82, 58, 57, 48, 72, 57, 41, 23, 27, 62, 9, 86, 42, 40, 37, 70, 64, 52, 43, 70, 55, 42, 25, 29, 18, 11, 11, 118, 68, 30, 55, 50, 46, 74, 65, 49, 39, 24, 16, 22, 13, 14, 7, 91, 44, 39, 38, 34, 63, 52, 45, 31, 52, 28, 19, 14, 8, 9, 3, 123, 60, 58, 53, 47, 43, 32, 22, 37, 24, 17, 12, 15, 10, 2, 1, 71, 37, 34, 30, 28, 20, 17, 26, 21, 16, 10, 6, 8, 6, 2, 0],
      t16HB: [1, 5, 14, 44, 74, 63, 110, 93, 172, 149, 138, 242, 225, 195, 376, 17, 3, 4, 12, 20, 35, 62, 53, 47, 83, 75, 68, 119, 201, 107, 207, 9, 15, 13, 23, 38, 67, 58, 103, 90, 161, 72, 127, 117, 110, 209, 206, 16, 45, 21, 39, 69, 64, 114, 99, 87, 158, 140, 252, 212, 199, 387, 365, 26, 75, 36, 68, 65, 115, 101, 179, 164, 155, 264, 246, 226, 395, 382, 362, 9, 66, 30, 59, 56, 102, 185, 173, 265, 142, 253, 232, 400, 388, 378, 445, 16, 111, 54, 52, 100, 184, 178, 160, 133, 257, 244, 228, 217, 385, 366, 715, 10, 98, 48, 91, 88, 165, 157, 148, 261, 248, 407, 397, 372, 380, 889, 884, 8, 85, 84, 81, 159, 156, 143, 260, 249, 427, 401, 392, 383, 727, 713, 708, 7, 154, 76, 73, 141, 131, 256, 245, 426, 406, 394, 384, 735, 359, 710, 352, 11, 139, 129, 67, 125, 247, 233, 229, 219, 393, 743, 737, 720, 885, 882, 439, 4, 243, 120, 118, 115, 227, 223, 396, 746, 742, 736, 721, 712, 706, 223, 436, 6, 202, 224, 222, 218, 216, 389, 386, 381, 364, 888, 443, 707, 440, 437, 1728, 4, 747, 211, 210, 208, 370, 379, 734, 723, 714, 1735, 883, 877, 876, 3459, 865, 2, 377, 369, 102, 187, 726, 722, 358, 711, 709, 866, 1734, 871, 3458, 870, 434, 0, 12, 10, 7, 11, 10, 17, 11, 9, 13, 12, 10, 7, 5, 3, 1, 3],
      t24HB: [15, 13, 46, 80, 146, 262, 248, 434, 426, 669, 653, 649, 621, 517, 1032, 88, 14, 12, 21, 38, 71, 130, 122, 216, 209, 198, 327, 345, 319, 297, 279, 42, 47, 22, 41, 74, 68, 128, 120, 221, 207, 194, 182, 340, 315, 295, 541, 18, 81, 39, 75, 70, 134, 125, 116, 220, 204, 190, 178, 325, 311, 293, 271, 16, 147, 72, 69, 135, 127, 118, 112, 210, 200, 188, 352, 323, 306, 285, 540, 14, 263, 66, 129, 126, 119, 114, 214, 202, 192, 180, 341, 317, 301, 281, 262, 12, 249, 123, 121, 117, 113, 215, 206, 195, 185, 347, 330, 308, 291, 272, 520, 10, 435, 115, 111, 109, 211, 203, 196, 187, 353, 332, 313, 298, 283, 531, 381, 17, 427, 212, 208, 205, 201, 193, 186, 177, 169, 320, 303, 286, 268, 514, 377, 16, 335, 199, 197, 191, 189, 181, 174, 333, 321, 305, 289, 275, 521, 379, 371, 11, 668, 184, 183, 179, 175, 344, 331, 314, 304, 290, 277, 530, 383, 373, 366, 10, 652, 346, 171, 168, 164, 318, 309, 299, 287, 276, 263, 513, 375, 368, 362, 6, 648, 322, 316, 312, 307, 302, 292, 284, 269, 261, 512, 376, 370, 364, 359, 4, 620, 300, 296, 294, 288, 282, 273, 266, 515, 380, 374, 369, 365, 361, 357, 2, 1033, 280, 278, 274, 267, 264, 259, 382, 378, 372, 367, 363, 360, 358, 356, 0, 43, 20, 19, 17, 15, 13, 11, 9, 7, 6, 4, 7, 5, 3, 1, 3],
      t32HB: [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16],
      t33HB: [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0],
      t1l: [1, 4, 3, 5],
      t2l: [1, 4, 7, 4, 5, 7, 6, 7, 8],
      t3l: [2, 3, 7, 4, 4, 7, 6, 7, 8],
      t5l: [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10],
      t6l: [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9],
      t7l: [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12],
      t8l: [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13],
      t9l: [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11],
      t10l: [1, 4, 7, 9, 10, 10, 10, 11, 4, 6, 8, 9, 10, 11, 10, 10, 7, 8, 9, 10, 11, 12, 11, 11, 8, 9, 10, 11, 12, 12, 11, 12, 9, 10, 11, 12, 12, 12, 12, 12, 10, 11, 12, 12, 13, 13, 12, 13, 9, 10, 11, 12, 12, 12, 13, 13, 10, 10, 11, 12, 12, 13, 13, 13],
      t11l: [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12],
      t12l: [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12],
      t13l: [1, 5, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 13, 13, 14, 14, 4, 6, 8, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13, 14, 14, 14, 7, 8, 9, 10, 11, 11, 12, 12, 11, 12, 12, 13, 13, 14, 15, 15, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 15, 9, 9, 11, 11, 12, 12, 13, 13, 12, 13, 13, 14, 14, 15, 15, 16, 10, 10, 11, 12, 12, 12, 13, 13, 13, 13, 14, 13, 15, 15, 16, 16, 10, 11, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 16, 16, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 16, 18, 18, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14, 15, 15, 16, 17, 17, 11, 11, 12, 12, 13, 13, 13, 15, 14, 15, 15, 16, 16, 16, 18, 17, 11, 12, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 18, 19, 12, 12, 12, 13, 14, 14, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 12, 13, 13, 14, 14, 15, 14, 15, 16, 16, 17, 17, 17, 18, 18, 18, 13, 13, 14, 15, 15, 15, 16, 16, 16, 16, 16, 17, 18, 17, 18, 18, 14, 14, 14, 15, 15, 15, 17, 16, 16, 19, 17, 17, 17, 19, 18, 18, 13, 14, 15, 16, 16, 16, 17, 16, 17, 17, 18, 18, 21, 20, 21, 18],
      t15l: [3, 5, 6, 8, 8, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 5, 5, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 6, 7, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 13, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 8, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 13, 13, 13, 14, 10, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 14, 14, 14, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 14, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 12, 12, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 14, 15, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15],
      t16_5l: [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 11, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 11, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 12, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 13, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 12, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 13, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 13, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 13, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 13, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 14, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 13, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 14, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 14, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 14, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 14, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 12],
      t16l: [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 10, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 10, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 11, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 12, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 11, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 12, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 12, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 12, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 13, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 13, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 13, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 13, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10],
      t24l: [4, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 13, 10, 5, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 12, 10, 7, 7, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 9, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 9, 10, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 9, 11, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 10, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10, 13, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 6],
      t32l: [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10],
      t33l: [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8]
    };
    a.ht = [new n(0, 0, null, null), new n(2, 0, a.t1HB, a.t1l), new n(3, 0, a.t2HB, a.t2l), new n(3, 0, a.t3HB, a.t3l), new n(0, 0, null, null), new n(4, 0, a.t5HB, a.t5l), new n(4, 0, a.t6HB, a.t6l), new n(6, 0, a.t7HB, a.t7l), new n(6, 0, a.t8HB, a.t8l), new n(6, 0, a.t9HB, a.t9l), new n(8, 0, a.t10HB, a.t10l), new n(8, 0, a.t11HB, a.t11l), new n(8, 0, a.t12HB, a.t12l), new n(16, 0, a.t13HB, a.t13l), new n(0, 0, null, a.t16_5l), new n(16, 0, a.t15HB, a.t15l), new n(1, 1, a.t16HB, a.t16l), new n(2, 3, a.t16HB, a.t16l), new n(3, 7, a.t16HB, a.t16l), new n(4, 15, a.t16HB, a.t16l), new n(6, 63, a.t16HB, a.t16l), new n(8, 255, a.t16HB, a.t16l), new n(10, 1023, a.t16HB, a.t16l), new n(13, 8191, a.t16HB, a.t16l), new n(4, 15, a.t24HB, a.t24l), new n(5, 31, a.t24HB, a.t24l), new n(6, 63, a.t24HB, a.t24l), new n(7, 127, a.t24HB, a.t24l), new n(8, 255, a.t24HB, a.t24l), new n(9, 511, a.t24HB, a.t24l), new n(11, 2047, a.t24HB, a.t24l), new n(13, 8191, a.t24HB, a.t24l), new n(0, 0, a.t32HB, a.t32l), new n(0, 0, a.t33HB, a.t33l)], a.largetbl = [65540, 327685, 458759, 589832, 655369, 655370, 720906, 720907, 786443, 786444, 786444, 851980, 851980, 851980, 917517, 655370, 262149, 393222, 524295, 589832, 655369, 720906, 720906, 720907, 786443, 786443, 786444, 851980, 917516, 851980, 917516, 655370, 458759, 524295, 589832, 655369, 720905, 720906, 786442, 786443, 851979, 786443, 851979, 851980, 851980, 917516, 917517, 720905, 589832, 589832, 655369, 720905, 720906, 786442, 786442, 786443, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 786441, 655369, 655369, 720905, 720906, 786442, 786442, 851978, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 983053, 720905, 655370, 655369, 720906, 720906, 786442, 851978, 851979, 917515, 851979, 917515, 917516, 983052, 983052, 983052, 1048588, 786441, 720906, 720906, 720906, 786442, 851978, 851979, 851979, 851979, 917515, 917516, 917516, 917516, 983052, 983052, 1048589, 786441, 720907, 720906, 786442, 786442, 851979, 851979, 851979, 917515, 917516, 983052, 983052, 983052, 983052, 1114125, 1114125, 786442, 720907, 786443, 786443, 851979, 851979, 851979, 917515, 917515, 983051, 983052, 983052, 983052, 1048588, 1048589, 1048589, 786442, 786443, 786443, 786443, 851979, 851979, 917515, 917515, 983052, 983052, 983052, 983052, 1048588, 983053, 1048589, 983053, 851978, 786444, 851979, 786443, 851979, 917515, 917516, 917516, 917516, 983052, 1048588, 1048588, 1048589, 1114125, 1114125, 1048589, 786442, 851980, 851980, 851979, 851979, 917515, 917516, 983052, 1048588, 1048588, 1048588, 1048588, 1048589, 1048589, 983053, 1048589, 851978, 851980, 917516, 917516, 917516, 917516, 983052, 983052, 983052, 983052, 1114124, 1048589, 1048589, 1048589, 1048589, 1179661, 851978, 983052, 917516, 917516, 917516, 983052, 983052, 1048588, 1048588, 1048589, 1179661, 1114125, 1114125, 1114125, 1245197, 1114125, 851978, 917517, 983052, 851980, 917516, 1048588, 1048588, 983052, 1048589, 1048589, 1114125, 1179661, 1114125, 1245197, 1114125, 1048589, 851978, 655369, 655369, 655369, 720905, 720905, 786441, 786441, 786441, 851977, 851977, 851977, 851978, 851978, 851978, 851978, 655366], a.table23 = [65538, 262147, 458759, 262148, 327684, 458759, 393222, 458759, 524296], a.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369], a.bitrate_table = [[0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1], [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1], [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]], a.samplerate_table = [[22050, 24e3, 16e3, -1], [44100, 48e3, 32e3, -1], [11025, 12e3, 8e3, -1]], a.scfsi_band = [0, 6, 11, 16, 21], e.exports = a;
  }, function (e, t, n) {
    var r = n(1),
        a = n(0),
        s = a.System,
        i = (a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        o = a.new_float_n;
    a.new_int, a.new_int_n, a.assert;

    e.exports = function () {
      this.l = i(r.SBMAX_l), this.s = o([r.SBMAX_s, 3]);
      var a = this;

      this.assign = function (e) {
        s.arraycopy(e.l, 0, a.l, 0, r.SBMAX_l);

        for (var t = 0; t < r.SBMAX_s; t++) for (var n = 0; n < 3; n++) a.s[t][n] = e.s[t][n];
      };
    };
  }, function (e, t) {
    function n(e) {
      var t = e;

      this.ordinal = function () {
        return t;
      };
    }

    n.STEREO = new n(0), n.JOINT_STEREO = new n(1), n.DUAL_CHANNEL = new n(2), n.MONO = new n(3), n.NOT_SET = new n(4), e.exports = n;
  }, function (e, t, n) {
    var a = n(0),
        i = a.System,
        o = (a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float, a.new_float_n, a.new_int),
        _ = (a.new_int_n, a.assert, n(1));

    e.exports = function (e, t, n, a) {
      this.l = o(1 + _.SBMAX_l), this.s = o(1 + _.SBMAX_s), this.psfb21 = o(1 + _.PSFB21), this.psfb12 = o(1 + _.PSFB12);
      var r = this.l,
          s = this.s;
      4 == arguments.length && (this.arrL = e, this.arrS = t, this.arr21 = n, this.arr12 = a, i.arraycopy(this.arrL, 0, r, 0, Math.min(this.arrL.length, this.l.length)), i.arraycopy(this.arrS, 0, s, 0, Math.min(this.arrS.length, this.s.length)), i.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), i.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)));
    };
  }, function (e, t, n) {
    var a = n(0),
        y = a.System,
        s = (a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays);
    a.new_array_n, a.new_byte, a.new_double, a.new_float, a.new_float_n, a.new_int, a.new_int_n, a.assert;

    function M() {
      var a = M.RMS_WINDOW_TIME_NUMERATOR,
          r = M.RMS_WINDOW_TIME_DENOMINATOR,
          m = [[.038575994352, -3.84664617118067, -.02160367184185, 7.81501653005538, -.00123395316851, -11.34170355132042, -9291677959e-14, 13.05504219327545, -.01655260341619, -12.28759895145294, .02161526843274, 9.4829380631979, -.02074045215285, -5.87257861775999, .00594298065125, 2.75465861874613, .00306428023191, -.86984376593551, .00012025322027, .13919314567432, .00288463683916], [.0541865640643, -3.47845948550071, -.02911007808948, 6.36317777566148, -.00848709379851, -8.54751527471874, -.00851165645469, 9.4769360780128, -.00834990904936, -8.81498681370155, .02245293253339, 6.85401540936998, -.02596338512915, -4.39470996079559, .01624864962975, 2.19611684890774, -.00240879051584, -.75104302451432, .00674613682247, .13149317958808, -.00187763777362], [.15457299681924, -2.37898834973084, -.09331049056315, 2.84868151156327, -.06247880153653, -2.64577170229825, .02163541888798, 2.23697657451713, -.05588393329856, -1.67148153367602, .04781476674921, 1.00595954808547, .00222312597743, -.45953458054983, .03174092540049, .16378164858596, -.01390589421898, -.05032077717131, .00651420667831, .0234789740702, -.00881362733839], [.30296907319327, -1.61273165137247, -.22613988682123, 1.0797749225997, -.08587323730772, -.2565625775407, .03282930172664, -.1627671912044, -.00915702933434, -.22638893773906, -.02364141202522, .39120800788284, -.00584456039913, -.22138138954925, .06276101321749, .04500235387352, -828086748e-14, .02005851806501, .00205861885564, .00302439095741, -.02950134983287], [.33642304856132, -1.49858979367799, -.2557224142557, .87350271418188, -.11828570177555, .12205022308084, .11921148675203, -.80774944671438, -.07834489609479, .47854794562326, -.0046997791438, -.12453458140019, -.0058950022444, -.04067510197014, .05724228140351, .08333755284107, .00832043980773, -.04237348025746, -.0163538138454, .02977207319925, -.0176017656815], [.4491525660845, -.62820619233671, -.14351757464547, .29661783706366, -.22784394429749, -.372563729424, -.01419140100551, .00213767857124, .04078262797139, -.42029820170918, -.12398163381748, .22199650564824, .04097565135648, .00613424350682, .10478503600251, .06747620744683, -.01863887810927, .05784820375801, -.03193428438915, .03222754072173, .00541907748707], [.56619470757641, -1.04800335126349, -.75464456939302, .29156311971249, .1624213774223, -.26806001042947, .16744243493672, .00819999645858, -.18901604199609, .45054734505008, .3093178284183, -.33032403314006, -.27562961986224, .0673936833311, .00647310677246, -.04784254229033, .08647503780351, .01639907836189, -.0378898455484, .01807364323573, -.00588215443421], [.58100494960553, -.51035327095184, -.53174909058578, -.31863563325245, -.14289799034253, -.20256413484477, .17520704835522, .1472815413433, .02377945217615, .38952639978999, .15558449135573, -.23313271880868, -.25344790059353, -.05246019024463, .01628462406333, -.02505961724053, .06920467763959, .02442357316099, -.03721611395801, .01818801111503, -.00749618797172], [.53648789255105, -.2504987195602, -.42163034350696, -.43193942311114, -.00275953611929, -.03424681017675, .04267842219415, -.04678328784242, -.10214864179676, .26408300200955, .14590772289388, .15113130533216, -.02459864859345, -.17556493366449, -.11202315195388, -.18823009262115, -.04060034127, .05477720428674, .0478866554818, .0470440968812, -.02217936801134]],
          v = [[.98621192462708, -1.97223372919527, -1.97242384925416, .97261396931306, .98621192462708], [.98500175787242, -1.96977855582618, -1.97000351574484, .9702284756635, .98500175787242], [.97938932735214, -1.95835380975398, -1.95877865470428, .95920349965459, .97938932735214], [.97531843204928, -1.95002759149878, -1.95063686409857, .95124613669835, .97531843204928], [.97316523498161, -1.94561023566527, -1.94633046996323, .94705070426118, .97316523498161], [.96454515552826, -1.92783286977036, -1.92909031105652, .93034775234268, .96454515552826], [.96009142950541, -1.91858953033784, -1.92018285901082, .92177618768381, .96009142950541], [.95856916599601, -1.9154210807478, -1.91713833199203, .91885558323625, .95856916599601], [.94597685600279, -1.88903307939452, -1.89195371200558, .89487434461664, .94597685600279]];

      function g(e, t, n, a, r, s) {
        for (; 0 != r--;) n[a] = 1e-10 + e[t + 0] * s[0] - n[a - 1] * s[1] + e[t - 1] * s[2] - n[a - 2] * s[3] + e[t - 2] * s[4] - n[a - 3] * s[5] + e[t - 3] * s[6] - n[a - 4] * s[7] + e[t - 4] * s[8] - n[a - 5] * s[9] + e[t - 5] * s[10] - n[a - 6] * s[11] + e[t - 6] * s[12] - n[a - 7] * s[13] + e[t - 7] * s[14] - n[a - 8] * s[15] + e[t - 8] * s[16] - n[a - 9] * s[17] + e[t - 9] * s[18] - n[a - 10] * s[19] + e[t - 10] * s[20], ++a, ++t;
      }

      function w(e, t, n, a, r, s) {
        for (; 0 != r--;) n[a] = e[t + 0] * s[0] - n[a - 1] * s[1] + e[t - 1] * s[2] - n[a - 2] * s[3] + e[t - 2] * s[4], ++a, ++t;
      }

      function S(e) {
        return e * e;
      }

      this.InitGainAnalysis = function (e, t) {
        return function (e, t) {
          for (var n = 0; n < MAX_ORDER; n++) e.linprebuf[n] = e.lstepbuf[n] = e.loutbuf[n] = e.rinprebuf[n] = e.rstepbuf[n] = e.routbuf[n] = 0;

          switch (0 | t) {
            case 48e3:
              e.reqindex = 0;
              break;

            case 44100:
              e.reqindex = 1;
              break;

            case 32e3:
              e.reqindex = 2;
              break;

            case 24e3:
              e.reqindex = 3;
              break;

            case 22050:
              e.reqindex = 4;
              break;

            case 16e3:
              e.reqindex = 5;
              break;

            case 12e3:
              e.reqindex = 6;
              break;

            case 11025:
              e.reqindex = 7;
              break;

            case 8e3:
              e.reqindex = 8;
              break;

            default:
              return INIT_GAIN_ANALYSIS_ERROR;
          }

          return e.sampleWindow = 0 | (t * a + r - 1) / r, e.lsum = 0, e.rsum = 0, e.totsamp = 0, s.ill(e.A, 0), INIT_GAIN_ANALYSIS_OK;
        }(e, t) != INIT_GAIN_ANALYSIS_OK ? INIT_GAIN_ANALYSIS_ERROR : (e.linpre = MAX_ORDER, e.rinpre = MAX_ORDER, e.lstep = MAX_ORDER, e.rstep = MAX_ORDER, e.lout = MAX_ORDER, e.rout = MAX_ORDER, s.fill(e.B, 0), INIT_GAIN_ANALYSIS_OK);
      }, this.AnalyzeSamples = function (e, t, n, a, r, s, i) {
        var o, _, l, f, c, u, h;

        if (0 == s) return GAIN_ANALYSIS_OK;

        switch (h = 0, c = s, i) {
          case 1:
            a = t, r = n;
            break;

          case 2:
            break;

          default:
            return GAIN_ANALYSIS_ERROR;
        }

        for (s < MAX_ORDER ? (y.arraycopy(t, n, e.linprebuf, MAX_ORDER, s), y.arraycopy(a, r, e.rinprebuf, MAX_ORDER, s)) : (y.arraycopy(t, n, e.linprebuf, MAX_ORDER, MAX_ORDER), y.arraycopy(a, r, e.rinprebuf, MAX_ORDER, MAX_ORDER)); 0 < c;) {
          u = c > e.sampleWindow - e.totsamp ? e.sampleWindow - e.totsamp : c, h < MAX_ORDER ? (o = e.linpre + h, _ = e.linprebuf, l = e.rinpre + h, f = e.rinprebuf, u > MAX_ORDER - h && (u = MAX_ORDER - h)) : (o = n + h, _ = t, l = r + h, f = a), g(_, o, e.lstepbuf, e.lstep + e.totsamp, u, m[e.reqindex]), g(f, l, e.rstepbuf, e.rstep + e.totsamp, u, m[e.reqindex]), w(e.lstepbuf, e.lstep + e.totsamp, e.loutbuf, e.lout + e.totsamp, u, v[e.reqindex]), w(e.rstepbuf, e.rstep + e.totsamp, e.routbuf, e.rout + e.totsamp, u, v[e.reqindex]), o = e.lout + e.totsamp, _ = e.loutbuf, l = e.rout + e.totsamp, f = e.routbuf;

          for (var p = u % 8; 0 != p--;) e.lsum += S(_[o++]), e.rsum += S(f[l++]);

          for (p = u / 8; 0 != p--;) e.lsum += S(_[o + 0]) + S(_[o + 1]) + S(_[o + 2]) + S(_[o + 3]) + S(_[o + 4]) + S(_[o + 5]) + S(_[o + 6]) + S(_[o + 7]), o += 8, e.rsum += S(f[l + 0]) + S(f[l + 1]) + S(f[l + 2]) + S(f[l + 3]) + S(f[l + 4]) + S(f[l + 5]) + S(f[l + 6]) + S(f[l + 7]), l += 8;

          if (c -= u, h += u, e.totsamp += u, e.totsamp == e.sampleWindow) {
            var d = 10 * M.STEPS_per_dB * Math.log10((e.lsum + e.rsum) / e.totsamp * .5 + 1e-37),
                b = d <= 0 ? 0 : 0 | d;
            b >= e.A.length && (b = e.A.length - 1), e.A[b]++, e.lsum = e.rsum = 0, y.arraycopy(e.loutbuf, e.totsamp, e.loutbuf, 0, MAX_ORDER), y.arraycopy(e.routbuf, e.totsamp, e.routbuf, 0, MAX_ORDER), y.arraycopy(e.lstepbuf, e.totsamp, e.lstepbuf, 0, MAX_ORDER), y.arraycopy(e.rstepbuf, e.totsamp, e.rstepbuf, 0, MAX_ORDER), e.totsamp = 0;
          }

          if (e.totsamp > e.sampleWindow) return GAIN_ANALYSIS_ERROR;
        }

        return s < MAX_ORDER ? (y.arraycopy(e.linprebuf, s, e.linprebuf, 0, MAX_ORDER - s), y.arraycopy(e.rinprebuf, s, e.rinprebuf, 0, MAX_ORDER - s), y.arraycopy(t, n, e.linprebuf, MAX_ORDER - s, s), y.arraycopy(a, r, e.rinprebuf, MAX_ORDER - s, s)) : (y.arraycopy(t, n + s - MAX_ORDER, e.linprebuf, 0, MAX_ORDER), y.arraycopy(a, r + s - MAX_ORDER, e.rinprebuf, 0, MAX_ORDER)), GAIN_ANALYSIS_OK;
      }, this.GetTitleGain = function (e) {
        for (var t = function (e, t) {
          var n,
              a = 0;

          for (n = 0; n < t; n++) a += e[n];

          if (0 == a) return GAIN_NOT_ENOUGH_SAMPLES;
          var r = 0 | Math.ceil(a * (1 - .95));

          for (n = t; 0 < n-- && !((r -= e[n]) <= 0););

          return 64.82 - n / M.STEPS_per_dB;
        }(e.A, e.A.length), n = 0; n < e.A.length; n++) e.B[n] += e.A[n], e.A[n] = 0;

        for (n = 0; n < MAX_ORDER; n++) e.linprebuf[n] = e.lstepbuf[n] = e.loutbuf[n] = e.rinprebuf[n] = e.rstepbuf[n] = e.routbuf[n] = 0;

        return e.totsamp = 0, e.lsum = e.rsum = 0, t;
      };
    }

    M.STEPS_per_dB = 100, M.MAX_dB = 120, M.GAIN_NOT_ENOUGH_SAMPLES = -24601, M.GAIN_ANALYSIS_ERROR = 0, M.GAIN_ANALYSIS_OK = 1, M.INIT_GAIN_ANALYSIS_ERROR = 0, M.INIT_GAIN_ANALYSIS_OK = 1, M.MAX_ORDER = M.YULE_ORDER = 10, M.MAX_SAMPLES_PER_WINDOW = (M.MAX_SAMP_FREQ = 48e3) * (M.RMS_WINDOW_TIME_NUMERATOR = 1) / (M.RMS_WINDOW_TIME_DENOMINATOR = 20) + 1, e.exports = M;
  }, function (e, t) {
    e.exports = function (e) {
      this.bits = e;
    };
  }, function (e, t, n) {
    var a = n(0),
        R = a.System,
        A = (a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays),
        B = (a.new_array_n, a.new_byte),
        E = (a.new_double, a.new_float, a.new_float_n),
        T = a.new_int,
        k = (a.new_int_n, a.assert),
        P = n(14),
        L = n(7),
        I = n(1),
        V = n(4);

    function r() {
      var _ = this,
          m = 32,
          c = null,
          u = null,
          s = null,
          h = null;

      this.setModules = function (e, t, n, a) {
        c = e, u = t, s = n, h = a;
      };

      var p = null,
          l = 0,
          d = 0,
          b = 0;

      function v(e, t, n) {
        for (k(n < m - 2); 0 < n;) {
          var a;
          0 == b && (b = 8, k(++d < Lame.LAME_MAXMP3BUFFER), k(e.header[e.w_ptr].write_timing >= l), e.header[e.w_ptr].write_timing == l && (r = e, R.arraycopy(r.header[r.w_ptr].buf, 0, p, d, r.sideinfo_len), d += r.sideinfo_len, l += 8 * r.sideinfo_len, r.w_ptr = r.w_ptr + 1 & V.MAX_HEADER_BUF - 1), p[d] = 0), a = Math.min(n, b), b -= a, k((n -= a) < m), k(b < m), p[d] |= t >> n << b, l += a;
        }

        var r;
      }

      function i(e, t, n) {
        for (k(n < m - 2); 0 < n;) {
          var a;
          0 == b && (b = 8, k(++d < Lame.LAME_MAXMP3BUFFER), p[d] = 0), a = Math.min(n, b), b -= a, k((n -= a) < m), k(b < m), p[d] |= t >> n << b, l += a;
        }
      }

      function o(e, t) {
        var n,
            a = e.internal_flags;

        if (k(0 <= t), 8 <= t && (v(a, 76, 8), t -= 8), 8 <= t && (v(a, 65, 8), t -= 8), 8 <= t && (v(a, 77, 8), t -= 8), 8 <= t && (v(a, 69, 8), t -= 8), 32 <= t) {
          var r = s.getLameShortVersion();
          if (32 <= t) for (n = 0; n < r.length && 8 <= t; ++n) t -= 8, v(a, r.charAt(n), 8);
        }

        for (; 1 <= t; t -= 1) v(a, a.ancillary_flag, 1), a.ancillary_flag ^= e.disable_reservoir ? 0 : 1;

        k(0 == t);
      }

      function f(e, t, n) {
        for (var a = e.header[e.h_ptr].ptr; 0 < n;) {
          var r = Math.min(n, 8 - (7 & a));
          k((n -= r) < m), e.header[e.h_ptr].buf[a >> 3] |= t >> n << 8 - (7 & a) - r, a += r;
        }

        e.header[e.h_ptr].ptr = a;
      }

      function r(e, t) {
        e <<= 8;

        for (var n = 0; n < 8; n++) 0 != (65536 & ((t <<= 1) ^ (e <<= 1))) && (t ^= 32773);

        return t;
      }

      function g(e, t) {
        var n,
            a = L.ht[t.count1table_select + 32],
            r = 0,
            s = t.big_values,
            i = t.big_values;

        for (k(t.count1table_select < 2), n = (t.count1 - t.big_values) / 4; 0 < n; --n) {
          var o,
              _ = 0,
              l = 0;
          0 != (o = t.l3_enc[s + 0]) && (l += 8, t.xr[i + 0] < 0 && _++, k(o <= 1)), 0 != (o = t.l3_enc[s + 1]) && (l += 4, _ *= 2, t.xr[i + 1] < 0 && _++, k(o <= 1)), 0 != (o = t.l3_enc[s + 2]) && (l += 2, _ *= 2, t.xr[i + 2] < 0 && _++, k(o <= 1)), 0 != (o = t.l3_enc[s + 3]) && (l++, _ *= 2, t.xr[i + 3] < 0 && _++, k(o <= 1)), s += 4, i += 4, v(e, _ + a.table[l], a.hlen[l]), r += a.hlen[l];
        }

        return r;
      }

      function w(e, t, n, a, r) {
        var s = L.ht[t],
            i = 0;
        if (k(t < 32), 0 == t) return i;

        for (var o = n; o < a; o += 2) {
          var _ = 0,
              l = 0,
              f = s.xlen,
              c = s.xlen,
              u = 0,
              h = r.l3_enc[o],
              p = r.l3_enc[o + 1];

          if (0 != h && (r.xr[o] < 0 && u++, _--), 15 < t) {
            if (14 < h) {
              var d = h - 15;
              k(d <= s.linmax), u |= d << 1, l = f, h = 15;
            }

            if (14 < p) {
              var b = p - 15;
              k(b <= s.linmax), u <<= f, u |= b, l += f, p = 15;
            }

            c = 16;
          }

          0 != p && (u <<= 1, r.xr[o + 1] < 0 && u++, _--), k((h | p) < 16), h = h * c + p, l -= _, _ += s.hlen[h], k(_ <= m), k(l <= m), v(e, s.table[h], _), v(e, u, l), i += _ + l;
        }

        return i;
      }

      function S(e, t) {
        var n = 3 * e.scalefac_band.s[3];
        n > t.big_values && (n = t.big_values);
        var a = w(e, t.table_select[0], 0, n, t);
        return a += w(e, t.table_select[1], n, t.big_values, t);
      }

      function y(e, t) {
        var n, a, r, s;
        n = t.big_values, k(0 <= n && n <= 576);
        var i = t.region0_count + 1;
        return k(0 <= i), k(i < e.scalefac_band.l.length), r = e.scalefac_band.l[i], i += t.region1_count + 1, k(0 <= i), k(i < e.scalefac_band.l.length), n < r && (r = n), n < (s = e.scalefac_band.l[i]) && (s = n), a = w(e, t.table_select[0], 0, r, t), a += w(e, t.table_select[1], r, s, t), a += w(e, t.table_select[2], s, n, t);
      }

      function M() {
        this.total = 0;
      }

      function x(e, t) {
        var n,
            a,
            r,
            s,
            i,
            o = e.internal_flags;
        return i = o.w_ptr, -1 == (s = o.h_ptr - 1) && (s = V.MAX_HEADER_BUF - 1), n = o.header[s].write_timing - l, 0 <= (t.total = n) && (a = 1 + s - i, s < i && (a = 1 + s - i + V.MAX_HEADER_BUF), n -= 8 * a * o.sideinfo_len), n += r = _.getframebits(e), t.total += r, t.total % 8 != 0 ? t.total = 1 + t.total / 8 : t.total = t.total / 8, t.total += d + 1, n < 0 && R.err.println("strange error flushing buffer ... \n"), n;
      }

      this.getframebits = function (e) {
        var t,
            n = e.internal_flags;
        return t = 0 != n.bitrate_index ? L.bitrate_table[e.version][n.bitrate_index] : e.brate, k(8 <= t && t <= 640), 8 * (0 | 72e3 * (e.version + 1) * t / e.out_samplerate + n.padding);
      }, this.CRC_writeheader = function (e, t) {
        var n = 65535;
        n = r(255 & t[2], n), n = r(255 & t[3], n);

        for (var a = 6; a < e.sideinfo_len; a++) n = r(255 & t[a], n);

        t[4] = byte(n >> 8), t[5] = byte(255 & n);
      }, this.flush_bitstream = function (e) {
        var t,
            n,
            a = e.internal_flags,
            r = a.h_ptr - 1;

        if (-1 == r && (r = V.MAX_HEADER_BUF - 1), t = a.l3_side, !((n = x(e, new M())) < 0)) {
          if (o(e, n), k(a.header[r].write_timing + this.getframebits(e) == l), a.ResvSize = 0, t.main_data_begin = 0, a.findReplayGain) {
            var s = c.GetTitleGain(a.rgdata);
            k(NEQ(s, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)), a.RadioGain = 0 | Math.floor(10 * s + .5);
          }

          a.findPeakSample && (a.noclipGainChange = 0 | Math.ceil(20 * Math.log10(a.PeakSample / 32767) * 10), 0 < a.noclipGainChange && (EQ(e.scale, 1) || EQ(e.scale, 0)) ? a.noclipScale = Math.floor(32767 / a.PeakSample * 100) / 100 : a.noclipScale = -1);
        }
      }, this.add_dummy_byte = function (e, t, n) {
        for (var a, r = e.internal_flags; 0 < n--;) for (i(0, t, 8), a = 0; a < V.MAX_HEADER_BUF; ++a) r.header[a].write_timing += 8;
      }, this.format_bitstream = function (e) {
        var t,
            n = e.internal_flags;
        t = n.l3_side;
        var a = this.getframebits(e);
        o(e, t.resvDrain_pre), function (e, t) {
          var n,
              a,
              r,
              s = e.internal_flags;

          if (n = s.l3_side, s.header[s.h_ptr].ptr = 0, A.fill(s.header[s.h_ptr].buf, 0, s.sideinfo_len, 0), e.out_samplerate < 16e3 ? f(s, 4094, 12) : f(s, 4095, 12), f(s, e.version, 1), f(s, 1, 2), f(s, e.error_protection ? 0 : 1, 1), f(s, s.bitrate_index, 4), f(s, s.samplerate_index, 2), f(s, s.padding, 1), f(s, e.extension, 1), f(s, e.mode.ordinal(), 2), f(s, s.mode_ext, 2), f(s, e.copyright, 1), f(s, e.original, 1), f(s, e.emphasis, 2), e.error_protection && f(s, 0, 16), 1 == e.version) {
            for (k(0 <= n.main_data_begin), f(s, n.main_data_begin, 9), 2 == s.channels_out ? f(s, n.private_bits, 3) : f(s, n.private_bits, 5), r = 0; r < s.channels_out; r++) {
              var i;

              for (i = 0; i < 4; i++) f(s, n.scfsi[r][i], 1);
            }

            for (a = 0; a < 2; a++) for (r = 0; r < s.channels_out; r++) f(s, (o = n.tt[a][r]).part2_3_length + o.part2_length, 12), f(s, o.big_values / 2, 9), f(s, o.global_gain, 8), f(s, o.scalefac_compress, 4), o.block_type != I.NORM_TYPE ? (f(s, 1, 1), f(s, o.block_type, 2), f(s, o.mixed_block_flag, 1), 14 == o.table_select[0] && (o.table_select[0] = 16), f(s, o.table_select[0], 5), 14 == o.table_select[1] && (o.table_select[1] = 16), f(s, o.table_select[1], 5), f(s, o.subblock_gain[0], 3), f(s, o.subblock_gain[1], 3), f(s, o.subblock_gain[2], 3)) : (f(s, 0, 1), 14 == o.table_select[0] && (o.table_select[0] = 16), f(s, o.table_select[0], 5), 14 == o.table_select[1] && (o.table_select[1] = 16), f(s, o.table_select[1], 5), 14 == o.table_select[2] && (o.table_select[2] = 16), f(s, o.table_select[2], 5), k(0 <= o.region0_count && o.region0_count < 16), k(0 <= o.region1_count && o.region1_count < 8), f(s, o.region0_count, 4), f(s, o.region1_count, 3)), f(s, o.preflag, 1), f(s, o.scalefac_scale, 1), f(s, o.count1table_select, 1);
          } else for (k(0 <= n.main_data_begin), f(s, n.main_data_begin, 8), f(s, n.private_bits, s.channels_out), r = a = 0; r < s.channels_out; r++) {
            var o;
            f(s, (o = n.tt[a][r]).part2_3_length + o.part2_length, 12), f(s, o.big_values / 2, 9), f(s, o.global_gain, 8), f(s, o.scalefac_compress, 9), o.block_type != I.NORM_TYPE ? (f(s, 1, 1), f(s, o.block_type, 2), f(s, o.mixed_block_flag, 1), 14 == o.table_select[0] && (o.table_select[0] = 16), f(s, o.table_select[0], 5), 14 == o.table_select[1] && (o.table_select[1] = 16), f(s, o.table_select[1], 5), f(s, o.subblock_gain[0], 3), f(s, o.subblock_gain[1], 3), f(s, o.subblock_gain[2], 3)) : (f(s, 0, 1), 14 == o.table_select[0] && (o.table_select[0] = 16), f(s, o.table_select[0], 5), 14 == o.table_select[1] && (o.table_select[1] = 16), f(s, o.table_select[1], 5), 14 == o.table_select[2] && (o.table_select[2] = 16), f(s, o.table_select[2], 5), k(0 <= o.region0_count && o.region0_count < 16), k(0 <= o.region1_count && o.region1_count < 8), f(s, o.region0_count, 4), f(s, o.region1_count, 3)), f(s, o.scalefac_scale, 1), f(s, o.count1table_select, 1);
          }

          e.error_protection && CRC_writeheader(s, s.header[s.h_ptr].buf);
          var _ = s.h_ptr;
          k(s.header[_].ptr == 8 * s.sideinfo_len), s.h_ptr = _ + 1 & V.MAX_HEADER_BUF - 1, s.header[s.h_ptr].write_timing = s.header[_].write_timing + t, s.h_ptr == s.w_ptr && R.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n");
        }(e, a);
        var r = 8 * n.sideinfo_len;

        if (r += function (e) {
          var t,
              n,
              a,
              r,
              s = 0,
              i = e.internal_flags,
              o = i.l3_side;
          if (1 == e.version) for (t = 0; t < 2; t++) for (n = 0; n < i.channels_out; n++) {
            var _ = o.tt[t][n],
                l = P.slen1_tab[_.scalefac_compress],
                f = P.slen2_tab[_.scalefac_compress];

            for (a = r = 0; a < _.sfbdivide; a++) -1 != _.scalefac[a] && (v(i, _.scalefac[a], l), r += l);

            for (; a < _.sfbmax; a++) -1 != _.scalefac[a] && (v(i, _.scalefac[a], f), r += f);

            k(r == _.part2_length), _.block_type == I.SHORT_TYPE ? r += S(i, _) : r += y(i, _), r += g(i, _), k(r == _.part2_3_length + _.part2_length), s += r;
          } else for (n = t = 0; n < i.channels_out; n++) {
            _ = o.tt[t][n];
            var c,
                u,
                h = 0;

            if (k(null != _.sfb_partition_table), u = a = r = 0, _.block_type == I.SHORT_TYPE) {
              for (; u < 4; u++) {
                var p = _.sfb_partition_table[u] / 3,
                    d = _.slen[u];

                for (c = 0; c < p; c++, a++) v(i, Math.max(_.scalefac[3 * a + 0], 0), d), v(i, Math.max(_.scalefac[3 * a + 1], 0), d), v(i, Math.max(_.scalefac[3 * a + 2], 0), d), h += 3 * d;
              }

              r += S(i, _);
            } else {
              for (; u < 4; u++) for (p = _.sfb_partition_table[u], d = _.slen[u], c = 0; c < p; c++, a++) v(i, Math.max(_.scalefac[a], 0), d), h += d;

              r += y(i, _);
            }

            r += g(i, _), k(r == _.part2_3_length), k(h == _.part2_length), s += h + r;
          }
          return s;
        }(e), o(e, t.resvDrain_post), r += t.resvDrain_post, t.main_data_begin += (a - r) / 8, x(e, new M()) != n.ResvSize && R.err.println("Internal buffer inconsistency. flushbits <> ResvSize"), 8 * t.main_data_begin != n.ResvSize && (R.err.printf("bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n", 8 * t.main_data_begin, n.ResvSize, t.resvDrain_post, t.resvDrain_pre, 8 * n.sideinfo_len, r - t.resvDrain_post - 8 * n.sideinfo_len, r, r % 8, a), R.err.println("This is a fatal error.  It has several possible causes:"), R.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), R.err.println(" 9%%  Your system is overclocked"), R.err.println(" 1%%  bug in LAME encoding library"), n.ResvSize = 8 * t.main_data_begin), k(l % 8 == 0), 1e9 < l) {
          var s;

          for (s = 0; s < V.MAX_HEADER_BUF; ++s) n.header[s].write_timing -= l;

          l = 0;
        }

        return 0;
      }, this.copy_buffer = function (e, t, n, a, r) {
        var s = d + 1;
        if (s <= 0) return 0;
        if (0 != a && a < s) return -1;

        if (R.arraycopy(p, 0, t, n, s), d = -1, (b = 0) != r) {
          var i = T(1);
          if (i[0] = e.nMusicCRC, h.updateMusicCRC(i, t, n, s), e.nMusicCRC = i[0], 0 < s && (e.VBR_seek_table.nBytesWritten += s), e.decode_on_the_fly) for (var o, _ = E([2, 1152]), l = s, f = -1; 0 != f;) if (f = u.hip_decode1_unclipped(e.hip, t, n, l, _[0], _[1]), l = 0, -1 == f && (f = 0), 0 < f) {
            if (k(f <= 1152), e.findPeakSample) {
              for (o = 0; o < f; o++) _[0][o] > e.PeakSample ? e.PeakSample = _[0][o] : -_[0][o] > e.PeakSample && (e.PeakSample = -_[0][o]);

              if (1 < e.channels_out) for (o = 0; o < f; o++) _[1][o] > e.PeakSample ? e.PeakSample = _[1][o] : -_[1][o] > e.PeakSample && (e.PeakSample = -_[1][o]);
            }

            if (e.findReplayGain && c.AnalyzeSamples(e.rgdata, _[0], 0, _[1], 0, f, e.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
          }
        }

        return s;
      }, this.init_bit_stream_w = function (e) {
        p = B(Lame.LAME_MAXMP3BUFFER), e.h_ptr = e.w_ptr = 0, e.header[e.h_ptr].write_timing = 0, d = -1, l = b = 0;
      };
    }

    r.EQ = function (e, t) {
      return Math.abs(e) > Math.abs(t) ? Math.abs(e - t) <= 1e-6 * Math.abs(e) : Math.abs(e - t) <= 1e-6 * Math.abs(t);
    }, r.NEQ = function (e, t) {
      return !r.EQ(e, t);
    }, e.exports = r;
  }, function (e, t, n) {
    var a = n(0),
        x = a.System,
        R = (a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays),
        A = (a.new_array_n, a.new_byte, a.new_double, a.new_float, a.new_float_n, a.new_int),
        B = (a.new_int_n, a.assert),
        E = n(1),
        T = n(7),
        k = n(6),
        P = n(15);

    e.exports = function e() {
      var S = null;

      function m(e) {
        this.bits = 0 | e;
      }

      this.qupvt = null, this.setModules = function (e) {
        this.qupvt = e, S = e;
      };
      var r = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [1, 1], [1, 1], [1, 2], [2, 2], [2, 3], [2, 3], [3, 4], [3, 4], [3, 4], [4, 5], [4, 5], [4, 6], [5, 6], [5, 6], [5, 7], [6, 7], [6, 7]];

      function y(e, t, n, a, r, s) {
        var i = .5946 / t;

        for (B(0 < e), e >>= 1; 0 != e--;) r[s++] = i > n[a++] ? 0 : 1, r[s++] = i > n[a++] ? 0 : 1;
      }

      function M(e, t, n, a, r, s) {
        B(0 < e);
        var i = (e >>= 1) % 2;

        for (e >>= 1; 0 != e--;) {
          var o, _, l, f, c, u, h, p;

          o = n[a++] * t, _ = n[a++] * t, c = 0 | o, l = n[a++] * t, u = 0 | _, f = n[a++] * t, h = 0 | l, o += S.adj43[c], p = 0 | f, _ += S.adj43[u], r[s++] = 0 | o, l += S.adj43[h], r[s++] = 0 | _, f += S.adj43[p], r[s++] = 0 | l, r[s++] = 0 | f;
        }

        0 != i && (c = 0 | (o = n[a++] * t), u = 0 | (_ = n[a++] * t), o += S.adj43[c], _ += S.adj43[u], r[s++] = 0 | o, r[s++] = 0 | _);
      }

      var o = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];

      function v(e, t, n, a) {
        var r = function (e, t, n) {
          var a = 0,
              r = 0;

          do {
            var s = e[t++],
                i = e[t++];
            a < s && (a = s), r < i && (r = i);
          } while (t < n);

          return a < r && (a = r), a;
        }(e, t, n);

        switch (r) {
          case 0:
            return r;

          case 1:
            return function (e, t, n, a) {
              var r = 0,
                  s = T.ht[1].hlen;

              do {
                var i = 2 * e[t + 0] + e[t + 1];
                t += 2, r += s[i];
              } while (t < n);

              return a.bits += r, 1;
            }(e, t, n, a);

          case 2:
          case 3:
            return function (e, t, n, a, r) {
              var s,
                  i,
                  o = 0,
                  _ = T.ht[a].xlen;
              i = 2 == a ? T.table23 : T.table56;

              do {
                var l = e[t + 0] * _ + e[t + 1];
                t += 2, o += i[l];
              } while (t < n);

              return (s = 65535 & o) < (o >>= 16) && (o = s, a++), r.bits += o, a;
            }(e, t, n, o[r - 1], a);

          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            return function (e, t, n, a, r) {
              var s = 0,
                  i = 0,
                  o = 0,
                  _ = T.ht[a].xlen,
                  l = T.ht[a].hlen,
                  f = T.ht[a + 1].hlen,
                  c = T.ht[a + 2].hlen;

              do {
                var u = e[t + 0] * _ + e[t + 1];
                t += 2, s += l[u], i += f[u], o += c[u];
              } while (t < n);

              var h = a;
              return i < s && (s = i, h++), o < s && (s = o, h = a + 2), r.bits += s, h;
            }(e, t, n, o[r - 1], a);

          default:
            if (r > P.IXMAX_VAL) return a.bits = P.LARGE_BITS, -1;
            var s, i;

            for (r -= 15, s = 24; s < 32 && !(T.ht[s].linmax >= r); s++);

            for (i = s - 8; i < 24 && !(T.ht[i].linmax >= r); i++);

            return function (e, t, n, a, r, s) {
              var i,
                  o = 65536 * T.ht[a].xlen + T.ht[r].xlen,
                  _ = 0;

              do {
                var l = e[t++],
                    f = e[t++];
                0 != l && (14 < l && (l = 15, _ += o), l *= 16), 0 != f && (14 < f && (f = 15, _ += o), l += f), _ += T.largetbl[l];
              } while (t < n);

              return (i = 65535 & _) < (_ >>= 16) && (_ = i, a = r), s.bits += _, a;
            }(e, t, n, i, s, a);
        }
      }

      function h(e, t, n, a, r, s, i, o) {
        for (var _ = t.big_values, l = 2; l < E.SBMAX_l + 1; l++) {
          var f = e.scalefac_band.l[l];
          if (_ <= f) break;
          var c = r[l - 2] + t.count1bits;
          if (n.part2_3_length <= c) break;
          var u = new m(c),
              h = v(a, f, _, u);
          c = u.bits, n.part2_3_length <= c || (n.assign(t), n.part2_3_length = c, n.region0_count = s[l - 2], n.region1_count = l - 2 - s[l - 2], n.table_select[0] = i[l - 2], n.table_select[1] = o[l - 2], n.table_select[2] = h);
        }
      }

      this.noquant_count_bits = function (e, t, n) {
        var a = t.l3_enc,
            r = Math.min(576, t.max_nonzero_coeff + 2 >> 1 << 1);

        for (null != n && (n.sfb_count1 = 0); 1 < r && 0 == (a[r - 1] | a[r - 2]); r -= 2);

        t.count1 = r;

        for (var s = 0, i = 0; 3 < r; r -= 4) {
          var o;
          if (1 < (2147483647 & (a[r - 1] | a[r - 2] | a[r - 3] | a[r - 4]))) break;
          o = 2 * (2 * (2 * a[r - 4] + a[r - 3]) + a[r - 2]) + a[r - 1], s += T.t32l[o], i += T.t33l[o];
        }

        var _ = s;
        if (t.count1table_select = 0, i < s && (_ = i, t.count1table_select = 1), t.count1bits = _, 0 == (t.big_values = r)) return _;
        if (t.block_type == E.SHORT_TYPE) (s = 3 * e.scalefac_band.s[3]) > t.big_values && (s = t.big_values), i = t.big_values;else if (t.block_type == E.NORM_TYPE) {
          if (B(r <= 576), s = t.region0_count = e.bv_scf[r - 2], i = t.region1_count = e.bv_scf[r - 1], B(s + i + 2 < E.SBPSY_l), i = e.scalefac_band.l[s + i + 2], s = e.scalefac_band.l[s + 1], i < r) {
            var l = new m(_);
            t.table_select[2] = v(a, i, r, l), _ = l.bits;
          }
        } else t.region0_count = 7, t.region1_count = E.SBMAX_l - 1 - 7 - 1, (i = r) < (s = e.scalefac_band.l[8]) && (s = i);

        if (s = Math.min(s, r), i = Math.min(i, r), B(0 <= s), B(0 <= i), 0 < s && (l = new m(_), t.table_select[0] = v(a, 0, s, l), _ = l.bits), s < i && (l = new m(_), t.table_select[1] = v(a, s, i, l), _ = l.bits), 2 == e.use_best_huffman && (t.part2_3_length = _, best_huffman_divide(e, t), _ = t.part2_3_length), null != n && t.block_type == E.NORM_TYPE) {
          for (var f = 0; e.scalefac_band.l[f] < t.big_values;) f++;

          n.sfb_count1 = f;
        }

        return _;
      }, this.count_bits = function (e, t, n, a) {
        var r = n.l3_enc,
            s = P.IXMAX_VAL / S.IPOW20(n.global_gain);
        if (n.xrpow_max > s) return P.LARGE_BITS;
        if (function (e, t, n, a, r) {
          var s,
              i,
              o,
              _ = 0,
              l = 0,
              f = 0,
              c = 0,
              u = t,
              h = 0,
              p = u,
              d = 0,
              b = e,
              m = 0;

          for (o = null != r && a.global_gain == r.global_gain, i = a.block_type == E.SHORT_TYPE ? 38 : 21, s = 0; s <= i; s++) {
            var v = -1;
            if ((o || a.block_type == E.NORM_TYPE) && (v = a.global_gain - (a.scalefac[s] + (0 != a.preflag ? S.pretab[s] : 0) << a.scalefac_scale + 1) - 8 * a.subblock_gain[a.window[s]]), B(0 <= a.width[s]), o && r.step[s] == v) 0 != l && (M(l, n, b, m, p, d), l = 0), 0 != f && (y(f, n, b, m, p, d), f = 0);else {
              var g,
                  w = a.width[s];

              if (_ + a.width[s] > a.max_nonzero_coeff && (g = a.max_nonzero_coeff - _ + 1, R.fill(t, a.max_nonzero_coeff, 576, 0), (w = g) < 0 && (w = 0), s = i + 1), 0 == l && 0 == f && (p = u, d = h, b = e, m = c), null != r && 0 < r.sfb_count1 && s >= r.sfb_count1 && 0 < r.step[s] && v >= r.step[s] ? (0 != l && (M(l, n, b, m, p, d), l = 0, p = u, d = h, b = e, m = c), f += w) : (0 != f && (y(f, n, b, m, p, d), f = 0, p = u, d = h, b = e, m = c), l += w), w <= 0) {
                0 != f && (y(f, n, b, m, p, d), f = 0), 0 != l && (M(l, n, b, m, p, d), l = 0);
                break;
              }
            }
            s <= i && (h += a.width[s], c += a.width[s], _ += a.width[s]);
          }

          0 != l && (M(l, n, b, m, p, d), l = 0), 0 != f && (y(f, n, b, m, p, d), f = 0);
        }(t, r, S.IPOW20(n.global_gain), n, a), 0 != (2 & e.substep_shaping)) for (var i = 0, o = n.global_gain + n.scalefac_scale, _ = .634521682242439 / S.IPOW20(o), l = 0; l < n.sfbmax; l++) {
          var f,
              c = n.width[l];
          if (B(0 <= c), 0 == e.pseudohalf[l]) i += c;else for (f = i, i += c; f < i; ++f) r[f] = t[f] >= _ ? r[f] : 0;
        }
        return this.noquant_count_bits(e, n, a);
      }, this.best_huffman_divide = function (e, t) {
        var n = new k(),
            a = t.l3_enc,
            r = A(23),
            s = A(23),
            i = A(23),
            o = A(23);

        if (t.block_type != E.SHORT_TYPE || 1 != e.mode_gr) {
          n.assign(t), t.block_type == E.NORM_TYPE && (function (e, t, n, a, r, s, i) {
            for (var o = t.big_values, _ = 0; _ <= 22; _++) a[_] = P.LARGE_BITS;

            for (_ = 0; _ < 16; _++) {
              var l = e.scalefac_band.l[_ + 1];
              if (o <= l) break;
              var f = 0,
                  c = new m(f),
                  u = v(n, 0, l, c);
              f = c.bits;

              for (var h = 0; h < 8; h++) {
                var p = e.scalefac_band.l[_ + h + 2];
                if (o <= p) break;
                var d = f,
                    b = v(n, l, p, c = new m(d));
                d = c.bits, a[_ + h] > d && (a[_ + h] = d, s[(r[_ + h] = _) + h] = u, i[_ + h] = b);
              }
            }
          }(e, t, a, r, s, i, o), h(e, n, t, a, r, s, i, o));
          var _ = n.big_values;

          if (!(0 == _ || 1 < (a[_ - 2] | a[_ - 1]) || 576 < (_ = t.count1 + 2))) {
            n.assign(t), n.count1 = _;
            var l = 0,
                f = 0;

            for (B(_ <= 576); _ > n.big_values; _ -= 4) {
              var c = 2 * (2 * (2 * a[_ - 4] + a[_ - 3]) + a[_ - 2]) + a[_ - 1];
              l += T.t32l[c], f += T.t33l[c];
            }

            if (n.big_values = _, n.count1table_select = 0, f < l && (l = f, n.count1table_select = 1), n.count1bits = l, n.block_type == E.NORM_TYPE) h(e, n, t, a, r, s, i, o);else {
              if (n.part2_3_length = l, _ < (l = e.scalefac_band.l[8]) && (l = _), 0 < l) {
                var u = new m(n.part2_3_length);
                n.table_select[0] = v(a, 0, l, u), n.part2_3_length = u.bits;
              }

              l < _ && (u = new m(n.part2_3_length), n.table_select[1] = v(a, l, _, u), n.part2_3_length = u.bits), t.part2_3_length > n.part2_3_length && t.assign(n);
            }
          }
        }
      };
      var u = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
          p = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
          d = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
          b = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
      e.slen1_tab = d, e.slen2_tab = b, this.best_scalefac_store = function (e, t, n, a) {
        var r,
            s,
            i,
            o,
            _ = a.tt[t][n],
            l = 0;

        for (r = i = 0; r < _.sfbmax; r++) {
          var f = _.width[r];

          for (B(0 <= f), i += f, o = -f; o < 0 && 0 == _.l3_enc[o + i]; o++);

          0 == o && (_.scalefac[r] = l = -2);
        }

        if (0 == _.scalefac_scale && 0 == _.preflag) {
          var c = 0;

          for (r = 0; r < _.sfbmax; r++) 0 < _.scalefac[r] && (c |= _.scalefac[r]);

          if (0 == (1 & c) && 0 != c) {
            for (r = 0; r < _.sfbmax; r++) 0 < _.scalefac[r] && (_.scalefac[r] >>= 1);

            _.scalefac_scale = l = 1;
          }
        }

        if (0 == _.preflag && _.block_type != E.SHORT_TYPE && 2 == e.mode_gr) {
          for (r = 11; r < E.SBPSY_l && !(_.scalefac[r] < S.pretab[r] && -2 != _.scalefac[r]); r++);

          if (r == E.SBPSY_l) {
            for (r = 11; r < E.SBPSY_l; r++) 0 < _.scalefac[r] && (_.scalefac[r] -= S.pretab[r]);

            _.preflag = l = 1;
          }
        }

        for (s = 0; s < 4; s++) a.scfsi[n][s] = 0;

        for (2 == e.mode_gr && 1 == t && a.tt[0][n].block_type != E.SHORT_TYPE && a.tt[1][n].block_type != E.SHORT_TYPE && (function (e, t) {
          for (var n, a = t.tt[1][e], r = t.tt[0][e], s = 0; s < T.scfsi_band.length - 1; s++) {
            for (n = T.scfsi_band[s]; n < T.scfsi_band[s + 1] && !(r.scalefac[n] != a.scalefac[n] && 0 <= a.scalefac[n]); n++);

            if (n == T.scfsi_band[s + 1]) {
              for (n = T.scfsi_band[s]; n < T.scfsi_band[s + 1]; n++) a.scalefac[n] = -1;

              t.scfsi[e][s] = 1;
            }
          }

          var i = 0,
              o = 0;

          for (n = 0; n < 11; n++) -1 != a.scalefac[n] && (o++, i < a.scalefac[n] && (i = a.scalefac[n]));

          for (var _ = 0, l = 0; n < E.SBPSY_l; n++) -1 != a.scalefac[n] && (l++, _ < a.scalefac[n] && (_ = a.scalefac[n]));

          for (s = 0; s < 16; s++) if (i < u[s] && _ < p[s]) {
            var f = d[s] * o + b[s] * l;
            a.part2_length > f && (a.part2_length = f, a.scalefac_compress = s);
          }
        }(n, a), l = 0), r = 0; r < _.sfbmax; r++) -2 == _.scalefac[r] && (_.scalefac[r] = 0);

        0 != l && (2 == e.mode_gr ? this.scale_bitcount(_) : this.scale_bitcount_lsf(e, _));
      };
      var _ = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
          l = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
          f = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];

      this.scale_bitcount = function (e) {
        var t,
            n,
            a,
            r = 0,
            s = 0,
            i = e.scalefac;
        if (B(function (e, t) {
          for (var n = 0; n < t; ++n) if (e[n] < 0) return !1;

          return !0;
        }(i, e.sfbmax)), e.block_type == E.SHORT_TYPE) a = _, 0 != e.mixed_block_flag && (a = l);else if (a = f, 0 == e.preflag) {
          for (n = 11; n < E.SBPSY_l && !(i[n] < S.pretab[n]); n++);

          if (n == E.SBPSY_l) for (e.preflag = 1, n = 11; n < E.SBPSY_l; n++) i[n] -= S.pretab[n];
        }

        for (n = 0; n < e.sfbdivide; n++) r < i[n] && (r = i[n]);

        for (; n < e.sfbmax; n++) s < i[n] && (s = i[n]);

        for (e.part2_length = P.LARGE_BITS, t = 0; t < 16; t++) r < u[t] && s < p[t] && e.part2_length > a[t] && (e.part2_length = a[t], e.scalefac_compress = t);

        return e.part2_length == P.LARGE_BITS;
      };

      var g = [[15, 15, 7, 7], [15, 15, 7, 0], [7, 3, 0, 0], [15, 31, 31, 0], [7, 7, 7, 0], [3, 3, 0, 0]];

      this.scale_bitcount_lsf = function (e, t) {
        var n,
            a,
            r,
            s,
            i,
            o,
            _,
            l,
            f = A(4),
            c = t.scalefac;

        for (n = 0 != t.preflag ? 2 : 0, _ = 0; _ < 4; _++) f[_] = 0;

        if (t.block_type == E.SHORT_TYPE) {
          a = 1;
          var u = S.nr_of_sfb_block[n][a];

          for (r = l = 0; r < 4; r++) for (s = u[r] / 3, _ = 0; _ < s; _++, l++) for (i = 0; i < 3; i++) c[3 * l + i] > f[r] && (f[r] = c[3 * l + i]);
        } else for (a = 0, u = S.nr_of_sfb_block[n][a], r = l = 0; r < 4; r++) for (s = u[r], _ = 0; _ < s; _++, l++) c[l] > f[r] && (f[r] = c[l]);

        for (o = !1, r = 0; r < 4; r++) f[r] > g[n][r] && (o = !0);

        if (!o) {
          var h, p, d, b;

          for (t.sfb_partition_table = S.nr_of_sfb_block[n][a], r = 0; r < 4; r++) t.slen[r] = w[f[r]];

          switch (h = t.slen[0], p = t.slen[1], d = t.slen[2], b = t.slen[3], n) {
            case 0:
              t.scalefac_compress = (5 * h + p << 4) + (d << 2) + b;
              break;

            case 1:
              t.scalefac_compress = 400 + (5 * h + p << 2) + d;
              break;

            case 2:
              t.scalefac_compress = 500 + 3 * h + p;
              break;

            default:
              x.err.printf("intensity stereo not implemented yet\n");
          }
        }

        if (!o) for (B(null != t.sfb_partition_table), r = t.part2_length = 0; r < 4; r++) t.part2_length += t.slen[r] * t.sfb_partition_table[r];
        return o;
      };

      var w = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];

      this.huffman_init = function (e) {
        for (var t = 2; t <= 576; t += 2) {
          for (var n, a = 0; e.scalefac_band.l[++a] < t;);

          for (n = r[a][0]; e.scalefac_band.l[n + 1] > t;) n--;

          for (n < 0 && (n = r[a][0]), e.bv_scf[t - 2] = n, n = r[a][1]; e.scalefac_band.l[n + e.bv_scf[t - 2] + 2] > t;) n--;

          n < 0 && (n = r[a][1]), e.bv_scf[t - 1] = n;
        }
      };
    };
  }, function (e, t, n) {
    var s = n(10),
        a = n(0),
        T = (a.System, a.VbrMode),
        v = a.Float,
        A = (a.ShortBlock, a.Util),
        S = (a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        g = (a.new_float_n, a.new_int),
        B = (a.new_int_n, a.assert),
        k = n(1),
        w = n(12),
        y = n(4);

    function P() {
      var l = null,
          d = null,
          a = null;
      this.setModules = function (e, t, n) {
        l = e, d = t, a = n;
      }, this.IPOW20 = function (e) {
        return B(0 <= e && e < P.Q_MAX), h[e];
      };
      var E = 2220446049250313e-31,
          f = P.IXMAX_VAL + 2,
          c = P.Q_MAX,
          u = P.Q_MAX2,
          r = 100;
      this.nr_of_sfb_block = [[[6, 5, 5, 5], [9, 9, 9, 9], [6, 9, 9, 9]], [[6, 5, 7, 3], [9, 9, 12, 6], [6, 9, 12, 6]], [[11, 10, 0, 0], [18, 18, 0, 0], [15, 18, 0, 0]], [[7, 7, 7, 0], [12, 12, 12, 0], [6, 15, 12, 0]], [[6, 6, 6, 3], [12, 9, 9, 6], [6, 12, 9, 6]], [[8, 8, 5, 0], [15, 12, 9, 0], [6, 18, 9, 0]]];
      var M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
      this.pretab = M, this.sfBandIndex = [new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
      var x = S(c + u + 1),
          h = S(c),
          p = S(f),
          b = S(f);

      function m(e, t) {
        var n = a.ATHformula(t, e);
        return n -= r, n = Math.pow(10, n / 10 + e.ATHlower);
      }

      function R(e) {
        this.s = e;
      }

      this.adj43 = b, this.iteration_init = function (e) {
        var t,
            n = e.internal_flags,
            a = n.l3_side;

        if (0 == n.iteration_init_init) {
          for (n.iteration_init_init = 1, a.main_data_begin = 0, function (e) {
            for (var t = e.internal_flags.ATH.l, n = e.internal_flags.ATH.psfb21, a = e.internal_flags.ATH.s, r = e.internal_flags.ATH.psfb12, s = e.internal_flags, i = e.out_samplerate, o = 0; o < k.SBMAX_l; o++) {
              var _ = s.scalefac_band.l[o],
                  l = s.scalefac_band.l[o + 1];
              t[o] = v.MAX_VALUE;

              for (var f = _; f < l; f++) {
                var c = m(e, f * i / 1152);
                t[o] = Math.min(t[o], c);
              }
            }

            for (o = 0; o < k.PSFB21; o++) for (_ = s.scalefac_band.psfb21[o], l = s.scalefac_band.psfb21[o + 1], n[o] = v.MAX_VALUE, f = _; f < l; f++) c = m(e, f * i / 1152), n[o] = Math.min(n[o], c);

            for (o = 0; o < k.SBMAX_s; o++) {
              for (_ = s.scalefac_band.s[o], l = s.scalefac_band.s[o + 1], a[o] = v.MAX_VALUE, f = _; f < l; f++) c = m(e, f * i / 384), a[o] = Math.min(a[o], c);

              a[o] *= s.scalefac_band.s[o + 1] - s.scalefac_band.s[o];
            }

            for (o = 0; o < k.PSFB12; o++) {
              for (_ = s.scalefac_band.psfb12[o], l = s.scalefac_band.psfb12[o + 1], r[o] = v.MAX_VALUE, f = _; f < l; f++) c = m(e, f * i / 384), r[o] = Math.min(r[o], c);

              r[o] *= s.scalefac_band.s[13] - s.scalefac_band.s[12];
            }

            if (e.noATH) {
              for (o = 0; o < k.SBMAX_l; o++) t[o] = 1e-20;

              for (o = 0; o < k.PSFB21; o++) n[o] = 1e-20;

              for (o = 0; o < k.SBMAX_s; o++) a[o] = 1e-20;

              for (o = 0; o < k.PSFB12; o++) r[o] = 1e-20;
            }

            s.ATH.floor = 10 * Math.log10(m(e, -1));
          }(e), p[0] = 0, t = 1; t < f; t++) p[t] = Math.pow(t, 4 / 3);

          for (t = 0; t < f - 1; t++) b[t] = t + 1 - Math.pow(.5 * (p[t] + p[t + 1]), .75);

          for (b[t] = .5, t = 0; t < c; t++) h[t] = Math.pow(2, -.1875 * (t - 210));

          for (t = 0; t <= c + u; t++) x[t] = Math.pow(2, .25 * (t - 210 - u));

          var r, s, i, o;

          for (l.huffman_init(n), 32 <= (t = e.exp_nspsytune >> 2 & 63) && (t -= 64), r = Math.pow(10, t / 4 / 10), 32 <= (t = e.exp_nspsytune >> 8 & 63) && (t -= 64), s = Math.pow(10, t / 4 / 10), 32 <= (t = e.exp_nspsytune >> 14 & 63) && (t -= 64), i = Math.pow(10, t / 4 / 10), 32 <= (t = e.exp_nspsytune >> 20 & 63) && (t -= 64), o = i * Math.pow(10, t / 4 / 10), t = 0; t < k.SBMAX_l; t++) {
            _ = t <= 6 ? r : t <= 13 ? s : t <= 20 ? i : o, n.nsPsy.longfact[t] = _;
          }

          for (t = 0; t < k.SBMAX_s; t++) {
            var _;

            _ = t <= 5 ? r : t <= 10 ? s : t <= 11 ? i : o, n.nsPsy.shortfact[t] = _;
          }
        }
      }, this.on_pe = function (e, t, n, a, r, s) {
        var i,
            o,
            _ = e.internal_flags,
            l = 0,
            f = g(2),
            c = new w(l),
            u = d.ResvMaxBits(e, a, c, s),
            h = (l = c.bits) + u;

        for (h > y.MAX_BITS_PER_GRANULE && (h = y.MAX_BITS_PER_GRANULE), o = i = 0; o < _.channels_out; ++o) n[o] = Math.min(y.MAX_BITS_PER_CHANNEL, l / _.channels_out), f[o] = 0 | n[o] * t[r][o] / 700 - n[o], f[o] > 3 * a / 4 && (f[o] = 3 * a / 4), f[o] < 0 && (f[o] = 0), f[o] + n[o] > y.MAX_BITS_PER_CHANNEL && (f[o] = Math.max(0, y.MAX_BITS_PER_CHANNEL - n[o])), i += f[o];

        if (u < i) for (o = 0; o < _.channels_out; ++o) f[o] = u * f[o] / i;

        for (o = 0; o < _.channels_out; ++o) n[o] += f[o], u -= f[o];

        for (o = i = 0; o < _.channels_out; ++o) i += n[o];

        if (i > y.MAX_BITS_PER_GRANULE) {
          var p = 0;

          for (o = 0; o < _.channels_out; ++o) n[o] *= y.MAX_BITS_PER_GRANULE, n[o] /= i, p += n[o];

          B(p <= y.MAX_BITS_PER_GRANULE);
        }

        return h;
      }, this.reduce_side = function (e, t, n, a) {
        B(a <= y.MAX_BITS_PER_GRANULE), B(e[0] + e[1] <= y.MAX_BITS_PER_GRANULE);
        var r = .33 * (.5 - t) / .5;
        r < 0 && (r = 0), .5 < r && (r = .5);
        var s = 0 | .5 * r * (e[0] + e[1]);
        s > y.MAX_BITS_PER_CHANNEL - e[0] && (s = y.MAX_BITS_PER_CHANNEL - e[0]), s < 0 && (s = 0), 125 <= e[1] && (125 < e[1] - s ? (e[0] < n && (e[0] += s), e[1] -= s) : (e[0] += e[1] - 125, e[1] = 125)), a < (s = e[0] + e[1]) && (e[0] = a * e[0] / s, e[1] = a * e[1] / s), B(e[0] <= y.MAX_BITS_PER_CHANNEL), B(e[1] <= y.MAX_BITS_PER_CHANNEL), B(e[0] + e[1] <= y.MAX_BITS_PER_GRANULE);
      }, this.athAdjust = function (e, t, n) {
        var a = 90.30873362,
            r = A.FAST_LOG10_X(t, 10),
            s = e * e,
            i = 0;
        return r -= n, 1e-20 < s && (i = 1 + A.FAST_LOG10_X(s, 10 / a)), i < 0 && (i = 0), r *= i, r += n + a - 94.82444863, Math.pow(10, .1 * r);
      }, this.calc_xmin = function (e, t, n, a) {
        var r,
            s = 0,
            i = e.internal_flags,
            o = 0,
            _ = 0,
            l = i.ATH,
            f = n.xr,
            c = e.VBR == T.vbr_mtrh ? 1 : 0,
            u = i.masking_lower;

        for (e.VBR != T.vbr_mtrh && e.VBR != T.vbr_mt || (u = 1), r = 0; r < n.psy_lmax; r++) {
          w = (g = e.VBR == T.vbr_rh || e.VBR == T.vbr_mtrh ? athAdjust(l.adjust, l.l[r], l.floor) : l.adjust * l.l[r]) / (b = n.width[r]), S = E, R = b >> 1, x = 0;

          do {
            x += A = f[o] * f[o], S += A < w ? A : w, x += B = f[++o] * f[o], S += B < w ? B : w, o++;
          } while (0 < --R);

          if (g < x && _++, r == k.SBPSY_l) S < (M = g * i.nsPsy.longfact[r]) && (S = M);
          if (0 != c && (g = S), !e.ATHonly) if (0 < (y = t.en.l[r])) M = x * t.thm.l[r] * u / y, 0 != c && (M *= i.nsPsy.longfact[r]), g < M && (g = M);
          a[s++] = 0 != c ? g : g * i.nsPsy.longfact[r];
        }

        var h = 575;
        if (n.block_type != k.SHORT_TYPE) for (var p = 576; 0 != p-- && BitStream.EQ(f[p], 0);) h = p;
        n.max_nonzero_coeff = h;

        for (var d = n.sfb_smin; r < n.psymax; d++, r += 3) {
          var b, m, v;

          for (v = e.VBR == T.vbr_rh || e.VBR == T.vbr_mtrh ? athAdjust(l.adjust, l.s[d], l.floor) : l.adjust * l.s[d], b = n.width[r], m = 0; m < 3; m++) {
            var g,
                w,
                S,
                y,
                M,
                x = 0,
                R = b >> 1;
            w = v / b, S = E;

            do {
              var A, B;
              x += A = f[o] * f[o], S += A < w ? A : w, x += B = f[++o] * f[o], S += B < w ? B : w, o++;
            } while (0 < --R);

            if (v < x && _++, d == k.SBPSY_s) S < (M = v * i.nsPsy.shortfact[d]) && (S = M);
            if (g = 0 != c ? S : v, !e.ATHonly && !e.ATHshort) if (0 < (y = t.en.s[d][m])) M = x * t.thm.s[d][m] * u / y, 0 != c && (M *= i.nsPsy.shortfact[d]), g < M && (g = M);
            a[s++] = 0 != c ? g : g * i.nsPsy.shortfact[d];
          }

          e.useTemporal && (a[s - 3] > a[s - 3 + 1] && (a[s - 3 + 1] += (a[s - 3] - a[s - 3 + 1]) * i.decay), a[s - 3 + 1] > a[s - 3 + 2] && (a[s - 3 + 2] += (a[s - 3 + 1] - a[s - 3 + 2]) * i.decay));
        }

        return _;
      }, this.calc_noise_core = function (e, t, n, a) {
        var r = 0,
            s = t.s,
            i = e.l3_enc;
        if (s > e.count1) for (; 0 != n--;) {
          _ = e.xr[s], s++, r += _ * _, _ = e.xr[s], s++, r += _ * _;
        } else if (s > e.big_values) {
          var o = S(2);

          for (o[0] = 0, o[1] = a; 0 != n--;) {
            _ = Math.abs(e.xr[s]) - o[i[s]], s++, r += _ * _, _ = Math.abs(e.xr[s]) - o[i[s]], s++, r += _ * _;
          }
        } else for (; 0 != n--;) {
          var _;

          _ = Math.abs(e.xr[s]) - p[i[s]] * a, s++, r += _ * _, _ = Math.abs(e.xr[s]) - p[i[s]] * a, s++, r += _ * _;
        }
        return t.s = s, r;
      }, this.calc_noise = function (e, t, n, a, r) {
        var s,
            i,
            o,
            _ = 0,
            l = 0,
            f = 0,
            c = 0,
            u = 0,
            h = -20,
            p = 0,
            d = e.scalefac,
            b = 0;

        for (s = a.over_SSD = 0; s < e.psymax; s++) {
          var m,
              v = e.global_gain - (d[b++] + (0 != e.preflag ? M[s] : 0) << e.scalefac_scale + 1) - 8 * e.subblock_gain[e.window[s]],
              g = 0;
          if (null != r && r.step[s] == v) g = r.noise[s], p += e.width[s], n[_++] = g / t[l++], g = r.noise_log[s];else {
            var w,
                S = (B(0 <= (o = v) + P.Q_MAX2 && o < P.Q_MAX), x[o + P.Q_MAX2]);
            if (i = e.width[s] >> 1, p + e.width[s] > e.max_nonzero_coeff) i = 0 < (w = e.max_nonzero_coeff - p + 1) ? w >> 1 : 0;
            var y = new R(p);
            g = this.calc_noise_core(e, y, i, S), p = y.s, null != r && (r.step[s] = v, r.noise[s] = g), g = n[_++] = g / t[l++], g = A.FAST_LOG10(Math.max(g, 1e-20)), null != r && (r.noise_log[s] = g);
          }
          if (null != r && (r.global_gain = e.global_gain), u += g, 0 < g) m = Math.max(0 | 10 * g + .5, 1), a.over_SSD += m * m, f++, c += g;
          h = Math.max(h, g);
        }

        return a.over_count = f, a.tot_noise = u, a.over_noise = c, a.max_noise = h, f;
      }, this.set_pinfo = function (e, t, n, a, r) {
        var s,
            i,
            o,
            _,
            l,
            f = e.internal_flags,
            c = 0 == t.scalefac_scale ? .5 : 1,
            u = t.scalefac,
            h = S(L3Side.SFBMAX),
            p = S(L3Side.SFBMAX),
            d = new CalcNoiseResult();

        calc_xmin(e, n, t, h), calc_noise(t, h, p, d, null);
        var b = 0;

        for (i = t.sfb_lmax, t.block_type != k.SHORT_TYPE && 0 == t.mixed_block_flag && (i = 22), s = 0; s < i; s++) {
          var m = f.scalefac_band.l[s],
              v = (g = f.scalefac_band.l[s + 1]) - m;

          for (_ = 0; b < g; b++) _ += t.xr[b] * t.xr[b];

          _ /= v, l = 1e15, f.pinfo.en[a][r][s] = l * _, f.pinfo.xfsf[a][r][s] = l * h[s] * p[s] / v, 0 < n.en.l[s] && !e.ATHonly ? _ /= n.en.l[s] : _ = 0, f.pinfo.thr[a][r][s] = l * Math.max(_ * n.thm.l[s], f.ATH.l[s]), (f.pinfo.LAMEsfb[a][r][s] = 0) != t.preflag && 11 <= s && (f.pinfo.LAMEsfb[a][r][s] = -c * M[s]), s < k.SBPSY_l && (B(0 <= u[s]), f.pinfo.LAMEsfb[a][r][s] -= c * u[s]);
        }

        if (t.block_type == k.SHORT_TYPE) for (i = s, s = t.sfb_smin; s < k.SBMAX_s; s++) {
          m = f.scalefac_band.s[s], v = (g = f.scalefac_band.s[s + 1]) - m;

          for (var g, w = 0; w < 3; w++) {
            for (_ = 0, o = m; o < g; o++) _ += t.xr[b] * t.xr[b], b++;

            _ = Math.max(_ / v, 1e-20), l = 1e15, f.pinfo.en_s[a][r][3 * s + w] = l * _, f.pinfo.xfsf_s[a][r][3 * s + w] = l * h[i] * p[i] / v, 0 < n.en.s[s][w] ? _ /= n.en.s[s][w] : _ = 0, (e.ATHonly || e.ATHshort) && (_ = 0), f.pinfo.thr_s[a][r][3 * s + w] = l * Math.max(_ * n.thm.s[s][w], f.ATH.s[s]), f.pinfo.LAMEsfb_s[a][r][3 * s + w] = -2 * t.subblock_gain[w], s < k.SBPSY_s && (f.pinfo.LAMEsfb_s[a][r][3 * s + w] -= c * u[i]), i++;
          }
        }
        f.pinfo.LAMEqss[a][r] = t.global_gain, f.pinfo.LAMEmainbits[a][r] = t.part2_3_length + t.part2_length, f.pinfo.LAMEsfbits[a][r] = t.part2_length, f.pinfo.over[a][r] = d.over_count, f.pinfo.max_noise[a][r] = 10 * d.max_noise, f.pinfo.over_noise[a][r] = 10 * d.over_noise, f.pinfo.tot_noise[a][r] = 10 * d.tot_noise, f.pinfo.over_SSD[a][r] = d.over_SSD;
      };
    }

    P.Q_MAX = 257, P.Q_MAX2 = 116, P.LARGE_BITS = 1e5, P.IXMAX_VAL = 8206, e.exports = P;
  }, function (e, t, n) {
    var a = n(0),
        y = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte),
        M = (a.new_double, a.new_float, a.new_float_n, a.new_int, a.new_int_n, a.assert);
    Lame = n(27), Presets = n(39), GainAnalysis = n(11), QuantizePVT = n(15), Quantize = n(40), Takehiro = n(14), Reservoir = n(44), MPEGMode = n(9), BitStream = n(13);
    n(1);
    var x = n(45),
        R = n(46);

    function A() {
      this.setModules = function (e, t) {
        e, t;
      };
    }

    function B() {
      this.setModules = function (e, t, n) {
        e, t, n;
      };
    }

    function E() {}

    function T() {
      this.setModules = function (e, t) {
        e, t;
      };
    }

    function o() {
      this.dataOffset = 0, this.dataLen = 0, this.channels = 0, this.sampleRate = 0;
    }

    function r(e) {
      return e.charCodeAt(0) << 24 | e.charCodeAt(1) << 16 | e.charCodeAt(2) << 8 | e.charCodeAt(3);
    }

    o.RIFF = r("RIFF"), o.WAVE = r("WAVE"), o.fmt_ = r("fmt "), o.data = r("data"), o.readHeader = function (e) {
      var t = new o(),
          n = e.getUint32(0, !1);

      if (o.RIFF == n) {
        e.getUint32(4, !0);

        if (o.WAVE == e.getUint32(8, !1) && o.fmt_ == e.getUint32(12, !1)) {
          var a = e.getUint32(16, !0),
              r = 20;

          switch (a) {
            case 16:
            case 18:
              t.channels = e.getUint16(r + 2, !0), t.sampleRate = e.getUint32(r + 4, !0);
              break;

            default:
              throw "extended fmt chunk not implemented";
          }

          r += a;

          for (var s = o.data, i = 0; s != n && (n = e.getUint32(r, !1), i = e.getUint32(r + 4, !0), s != n);) r += i + 8;

          return t.dataLen = i, t.dataOffset = r + 8, t;
        }
      }
    }, e.exports.Mp3Encoder = function (a, e, t) {
      3 != arguments.length && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), a = 1, e = 44100, t = 128);

      var r = new Lame(),
          n = new A(),
          s = new GainAnalysis(),
          i = new BitStream(),
          o = new Presets(),
          _ = new QuantizePVT(),
          l = new Quantize(),
          f = new R(),
          c = new x(),
          u = new T(),
          h = new Reservoir(),
          p = new Takehiro(),
          d = new B(),
          b = new E();

      r.setModules(s, i, o, _, l, f, c, u, b), i.setModules(s, b, c, f), u.setModules(i, c), o.setModules(r), l.setModules(i, h, _, p), _.setModules(p, h, r.enc.psy), h.setModules(i), p.setModules(_), f.setModules(r, i, c), n.setModules(d, b), d.setModules(c, u, o);
      var m = r.lame_init();
      m.num_channels = a, m.in_samplerate = e, m.brate = t, m.mode = MPEGMode.STEREO, m.quality = 3, m.bWriteVbrTag = !1, m.disable_reservoir = !0, m.write_id3tag_automatic = !1;
      var v = r.lame_init_params(m);
      M(0 == v);
      var g = 1152,
          w = 0 | 1.25 * g + 7200,
          S = y(w);
      this.encodeBuffer = function (e, t) {
        1 == a && (t = e), M(e.length == t.length), e.length > g && (g = e.length, S = y(w = 0 | 1.25 * g + 7200));
        var n = r.lame_encode_buffer(m, e, t, e.length, S, 0, w);
        return new Int8Array(S.subarray(0, n));
      }, this.flush = function () {
        var e = r.lame_encode_flush(m, S, 0, w);
        return new Int8Array(S.subarray(0, e));
      };
    }, e.exports.WavHeader = o;
  }, function (e, t, n) {
    var a = n(18);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("9d62102e", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar-player {\n  width: 380px;\n  height: unset;\n  border: 0;\n  border-radius: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: unset;\n  font-family: 'Roboto', sans-serif;\n}\n.ar-player > .ar-player-bar {\n    border: 1px solid #E8E8E8;\n    border-radius: 24px;\n    margin: 0 0 0 5px;\n}\n.ar-player > .ar-player-bar > .ar-player__progress {\n      width: 125px;\n}\n.ar-player-bar {\n    display: flex;\n    align-items: center;\n    height: 38px;\n    padding: 0 12px;\n    margin: 0 5px;\n}\n.ar-player-actions {\n    width: 55%;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n.ar-player__progress {\n    width: 160px;\n    margin: 0 8px;\n}\n.ar-player__time {\n    color: rgba(84, 84, 84, 0.5);\n    font-size: 16px;\n    width: 41px;\n}\n.ar-player__play {\n    width: 45px;\n    height: 45px;\n    background-color: #FFFFFF;\n    box-shadow: 0 2px 11px 11px rgba(0, 0, 0, 0.07);\n}\n.ar-player__play--active {\n      fill: white !important;\n      background-color: #05CBCD !important;\n}\n.ar-icon {\n  fill: #747474;\n  border-radius: 50%;\n  border: 1px solid #05CBCD;\n  background-color: #FFFFFF;\n  padding: 5px;\n  cursor: pointer;\n  transition: .2s;\n}\n.ar-icon--no-border {\n    border: 0;\n    border-radius: 0;\n    padding: 0;\n}\n.ar-icon--rec {\n    fill: white;\n    background-color: #FF6B64;\n    border-color: transparent;\n}\n.ar-icon--pulse {\n    animation: ripple .5s linear infinite;\n}\n@keyframes ripple {\n0% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 1px rgba(255, 0, 0, 0.1), 0 0 0 5px rgba(255, 0, 0, 0.1);\n}\n100% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 10px rgba(255, 0, 0, 0.1), 0 0 0 20px rgba(255, 0, 0, 0);\n}\n}\n.ar-icon__xs {\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n}\n.ar-icon__sm {\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n}\n.ar-icon__lg {\n    width: 45px;\n    height: 45px;\n    line-height: 45px;\n    box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);\n}\n", ""]);
  }, function (e, t, n) {
    var a = n(20);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("722c44a2", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar-line-control {\n  position: relative;\n  height: 8px;\n  border-radius: 5px;\n  background-color: #E6E6E6;\n}\n.ar-line-control__head {\n    position: absolute;\n    height: inherit;\n    background-color: #616161;\n    border-radius: inherit;\n}\n", ""]);
  }, function (e, t, n) {
    var a = n(22);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("7e43270a", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar-volume {\n  display: flex;\n  align-items: center;\n  line-height: 10px;\n}\n.ar-volume-bar {\n    width: 50px;\n    height: 6px;\n    background: #E6E6E6;\n    border-radius: 4px;\n    position: relative;\n}\n.ar-volume__icon {\n    fill: #747474;\n    width: 24px;\n    height: 24px;\n    border: 0;\n    border-radius: 0;\n    padding: 0;\n    background-color: unset;\n    margin-right: 3px;\n}\n", ""]);
  }, function (e, t, n) {
    var a = n(24);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("00c7c6ba", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar {\n  width: 420px;\n  font-family: 'Roboto', sans-serif;\n  border-radius: 16px;\n  background-color: #FAFAFA;\n  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);\n  position: relative;\n  box-sizing: content-box;\n}\n.ar-content {\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.ar-records {\n    height: 138px;\n    padding-top: 1px;\n    overflow-y: auto;\n    margin-bottom: 20px;\n}\n.ar-records__record {\n      width: 320px;\n      height: 45px;\n      padding: 0 10px;\n      margin: 0 auto;\n      line-height: 45px;\n      display: flex;\n      justify-content: space-between;\n      border-bottom: 1px solid #E8E8E8;\n      position: relative;\n}\n.ar-records__record--selected {\n        border: 1px solid #E8E8E8;\n        border-radius: 24px;\n        background-color: #FFFFFF;\n        margin-top: -1px;\n        padding: 0 34px;\n}\n.ar-recorder {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.ar-recorder__duration {\n      color: #AEAEAE;\n      font-size: 32px;\n      font-weight: 500;\n      margin-top: 20px;\n      margin-bottom: 16px;\n}\n.ar-recorder__stop {\n      position: absolute;\n      top: 10px;\n      right: -52px;\n}\n.ar-recorder__time-limit {\n      position: absolute;\n      color: #AEAEAE;\n      font-size: 12px;\n      top: 128px;\n}\n.ar-recorder__records-limit {\n      position: absolute;\n      color: #AEAEAE;\n      font-size: 13px;\n      top: 78px;\n}\n.ar-spinner {\n    display: flex;\n    height: 30px;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n    width: 144px;\n    z-index: 10;\n}\n.ar-spinner__dot {\n      display: block;\n      margin: 0 8px;\n      border-radius: 50%;\n      width: 30px;\n      height: 30px;\n      background: #05CBCD;\n      animation-name: blink;\n      animation-duration: 1.4s;\n      animation-iteration-count: infinite;\n      animation-fill-mode: both;\n}\n.ar-spinner__dot:nth-child(2) {\n        animation-delay: .2s;\n}\n.ar-spinner__dot:nth-child(3) {\n        animation-delay: .4s;\n}\n@keyframes blink {\n0% {\n    opacity: .2;\n}\n20% {\n    opacity: 1;\n}\n100% {\n    opacity: .2;\n}\n}\n.ar__text {\n    color: rgba(84, 84, 84, 0.5);\n    font-size: 16px;\n}\n.ar__blur {\n    filter: blur(2px);\n    opacity: 0.7;\n}\n.ar__overlay {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    z-index: 10;\n}\n.ar__upload-status {\n    text-align: center;\n    font-size: 10px;\n    padding: 2px;\n    letter-spacing: 1px;\n    position: absolute;\n    bottom: 0;\n}\n.ar__upload-status--success {\n      color: green;\n}\n.ar__upload-status--fail {\n      color: red;\n}\n.ar__rm {\n    cursor: pointer;\n    position: absolute;\n    width: 6px;\n    height: 6px;\n    padding: 6px;\n    line-height: 6px;\n    margin: auto;\n    left: 10px;\n    bottom: 0;\n    top: 0;\n    color: #f4785a;\n}\n.ar__downloader, .ar__uploader {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n}\n.ar__downloader {\n    right: 115px;\n}\n.ar__uploader {\n    right: 85px;\n}\n.ar-icon {\n  fill: #747474;\n  border-radius: 50%;\n  border: 1px solid #05CBCD;\n  background-color: #FFFFFF;\n  padding: 5px;\n  cursor: pointer;\n  transition: .2s;\n}\n.ar-icon--no-border {\n    border: 0;\n    border-radius: 0;\n    padding: 0;\n}\n.ar-icon--rec {\n    fill: white;\n    background-color: #FF6B64;\n    border-color: transparent;\n}\n.ar-icon--pulse {\n    animation: ripple .5s linear infinite;\n}\n@keyframes ripple {\n0% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 1px rgba(255, 0, 0, 0.1), 0 0 0 5px rgba(255, 0, 0, 0.1);\n}\n100% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 10px rgba(255, 0, 0, 0.1), 0 0 0 20px rgba(255, 0, 0, 0);\n}\n}\n.ar-icon__xs {\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n}\n.ar-icon__sm {\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n}\n.ar-icon__lg {\n    width: 45px;\n    height: 45px;\n    line-height: 45px;\n    box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);\n}\n", ""]);
  }, function (e, t, n) {
    var a = n(26);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("07a135de", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar-icon {\n  fill: #747474;\n  border-radius: 50%;\n  border: 1px solid #05CBCD;\n  background-color: #FFFFFF;\n  padding: 5px;\n  cursor: pointer;\n  transition: .2s;\n}\n.ar-icon--no-border {\n    border: 0;\n    border-radius: 0;\n    padding: 0;\n}\n.ar-icon--rec {\n    fill: white;\n    background-color: #FF6B64;\n    border-color: transparent;\n}\n.ar-icon--pulse {\n    animation: ripple .5s linear infinite;\n}\n@keyframes ripple {\n0% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 1px rgba(255, 0, 0, 0.1), 0 0 0 5px rgba(255, 0, 0, 0.1);\n}\n100% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 10px rgba(255, 0, 0, 0.1), 0 0 0 20px rgba(255, 0, 0, 0);\n}\n}\n.ar-icon__xs {\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n}\n.ar-icon__sm {\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n}\n.ar-icon__lg {\n    width: 45px;\n    height: 45px;\n    line-height: 45px;\n    box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);\n}\n", ""]);
  }, function (e, t, n) {
    var a = n(0),
        X = a.System,
        q = a.VbrMode,
        Y = (a.Float, a.ShortBlock),
        j = (a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        U = (a.new_float_n, a.new_int, a.new_int_n),
        d = a.new_short_n,
        z = a.assert,
        G = n(28),
        s = n(32),
        K = n(4),
        Z = n(36),
        Q = n(37),
        W = n(38),
        $ = n(13),
        J = n(7),
        ee = n(1);

    e.exports = function e() {
      var T = this;
      e.V9 = 410, e.V8 = 420, e.V7 = 430, e.V6 = 440, e.V5 = 450, e.V4 = 460, e.V3 = 470, e.V2 = 480, e.V1 = 490, e.V0 = 500, e.R3MIX = 1e3, e.STANDARD = 1001, e.EXTREME = 1002, e.INSANE = 1003, e.STANDARD_FAST = 1004, e.EXTREME_FAST = 1005, e.MEDIUM = 1006, e.MEDIUM_FAST = 1007;
      var k, P, g, w, S;
      e.LAME_MAXMP3BUFFER = 147456;
      var y,
          M,
          x,
          R = new G();

      function A() {
        this.mask_adjust = 0, this.mask_adjust_short = 0, this.bo_l_weight = j(ee.SBMAX_l), this.bo_s_weight = j(ee.SBMAX_s);
      }

      function B() {
        this.lowerlimit = 0;
      }

      function r(e, t) {
        this.lowpass = t;
      }

      this.enc = new ee(), this.setModules = function (e, t, n, a, r, s, i, o, _) {
        k = e, P = t, g = n, w = a, S = r, y = s, M = o, x = _, this.enc.setModules(P, R, w, y);
      };
      var L = 4294479419;

      function E(e) {
        return 1 < e ? 0 : e <= 0 ? 1 : Math.cos(Math.PI / 2 * e);
      }

      function I(e, t) {
        switch (e) {
          case 44100:
            return t.version = 1, 0;

          case 48e3:
            return t.version = 1;

          case 32e3:
            return t.version = 1, 2;

          case 22050:
            return t.version = 0;

          case 24e3:
            return t.version = 0, 1;

          case 16e3:
            return t.version = 0, 2;

          case 11025:
            return t.version = 0;

          case 12e3:
            return t.version = 0, 1;

          case 8e3:
            return t.version = 0, 2;

          default:
            return t.version = 0, -1;
        }
      }

      function V(e, t, n) {
        n < 16e3 && (t = 2);

        for (var a = J.bitrate_table[t][1], r = 2; r <= 14; r++) 0 < J.bitrate_table[t][r] && Math.abs(J.bitrate_table[t][r] - e) < Math.abs(a - e) && (a = J.bitrate_table[t][r]);

        return a;
      }

      function H(e, t, n) {
        n < 16e3 && (t = 2);

        for (var a = 0; a <= 14; a++) if (0 < J.bitrate_table[t][a] && J.bitrate_table[t][a] == e) return a;

        return -1;
      }

      function O(e, t) {
        var n = [new r(8, 2e3), new r(16, 3700), new r(24, 3900), new r(32, 5500), new r(40, 7e3), new r(48, 7500), new r(56, 1e4), new r(64, 11e3), new r(80, 13500), new r(96, 15100), new r(112, 15600), new r(128, 17e3), new r(160, 17500), new r(192, 18600), new r(224, 19400), new r(256, 19700), new r(320, 20500)],
            a = T.nearestBitrateFullIndex(t);
        e.lowerlimit = n[a].lowpass;
      }

      function N(e) {
        var t = ee.BLKSIZE + e.framesize - ee.FFTOFFSET;
        return t = Math.max(t, 512 + e.framesize - 32), z(K.MFSIZE >= t), t;
      }

      function F() {
        this.n_in = 0, this.n_out = 0;
      }

      function f() {
        this.num_used = 0;
      }

      function C(e, t, n) {
        var a = Math.PI * t;
        (e /= n) < 0 && (e = 0), 1 < e && (e = 1);
        var r = e - .5,
            s = .42 - .5 * Math.cos(2 * e * Math.PI) + .08 * Math.cos(4 * e * Math.PI);
        return Math.abs(r) < 1e-9 ? a / Math.PI : s * Math.sin(n * a * r) / (Math.PI * n * r);
      }

      function c(e, t, n, a, r, s, i, o, _) {
        var l,
            f,
            c = e.internal_flags,
            u = 0,
            h = e.out_samplerate / function e(t, n) {
          return 0 != n ? e(n, t % n) : t;
        }(e.out_samplerate, e.in_samplerate);

        h > K.BPC && (h = K.BPC);
        var p = Math.abs(c.resample_ratio - Math.floor(.5 + c.resample_ratio)) < 1e-4 ? 1 : 0,
            d = 1 / c.resample_ratio;
        1 < d && (d = 1);
        var b = 31;
        0 == b % 2 && --b;
        var m = (b += p) + 1;

        if (0 == c.fill_buffer_resample_init) {
          for (c.inbuf_old[0] = j(m), c.inbuf_old[1] = j(m), l = 0; l <= 2 * h; ++l) c.blackfilt[l] = j(m);

          for (c.itime[0] = 0, u = c.itime[1] = 0; u <= 2 * h; u++) {
            var v = 0,
                g = (u - h) / (2 * h);

            for (l = 0; l <= b; l++) v += c.blackfilt[u][l] = C(l - g, d, b);

            for (l = 0; l <= b; l++) c.blackfilt[u][l] /= v;
          }

          c.fill_buffer_resample_init = 1;
        }

        var w = c.inbuf_old[_];

        for (f = 0; f < a; f++) {
          var S, y;
          if (S = f * c.resample_ratio, i <= b + (u = 0 | Math.floor(S - c.itime[_])) - b / 2) break;
          g = S - c.itime[_] - (u + b % 2 * .5), z(Math.abs(g) <= .501), y = 0 | Math.floor(2 * g * h + h + .5);
          var M = 0;

          for (l = 0; l <= b; ++l) {
            var x = l + u - b / 2;
            z(x < i), z(0 <= x + m), M += (x < 0 ? w[m + x] : r[s + x]) * c.blackfilt[y][l];
          }

          t[n + f] = M;
        }

        if (o.num_used = Math.min(i, b + u - b / 2), c.itime[_] += o.num_used - f * c.resample_ratio, o.num_used >= m) for (l = 0; l < m; l++) w[l] = r[s + o.num_used + l - m];else {
          var R = m - o.num_used;

          for (l = 0; l < R; ++l) w[l] = w[l + o.num_used];

          for (u = 0; l < m; ++l, ++u) w[l] = r[s + u];

          z(u == o.num_used);
        }
        return f;
      }

      function D(e, t, n, a, r, s) {
        var i = e.internal_flags;
        if (i.resample_ratio < .9999 || 1.0001 < i.resample_ratio) for (var o = 0; o < i.channels_out; o++) {
          var _ = new f();

          s.n_out = c(e, t[o], i.mf_size, e.framesize, n[o], a, r, _, o), s.n_in = _.num_used;
        } else {
          s.n_out = Math.min(e.framesize, r), s.n_in = s.n_out;

          for (var l = 0; l < s.n_out; ++l) t[0][i.mf_size + l] = n[0][a + l], 2 == i.channels_out && (t[1][i.mf_size + l] = n[1][a + l]);
        }
      }

      this.lame_init = function () {
        var e,
            t,
            n = new s();
        return 0 != ((e = n).class_id = L, t = e.internal_flags = new K(), e.mode = MPEGMode.NOT_SET, e.original = 1, e.in_samplerate = 44100, e.num_channels = 2, e.num_samples = -1, e.bWriteVbrTag = !0, e.quality = -1, e.short_blocks = null, t.subblock_gain = -1, e.lowpassfreq = 0, e.highpassfreq = 0, e.lowpasswidth = -1, e.highpasswidth = -1, e.VBR = q.vbr_off, e.VBR_q = 4, e.ATHcurve = -1, e.VBR_mean_bitrate_kbps = 128, e.VBR_min_bitrate_kbps = 0, e.VBR_max_bitrate_kbps = 0, e.VBR_hard_min = 0, t.VBR_min_bitrate = 1, t.VBR_max_bitrate = 13, e.quant_comp = -1, e.quant_comp_short = -1, e.msfix = -1, t.resample_ratio = 1, t.OldValue[0] = 180, t.OldValue[1] = 180, t.CurrentStep[0] = 4, t.CurrentStep[1] = 4, t.masking_lower = 1, t.nsPsy.attackthre = -1, t.nsPsy.attackthre_s = -1, e.scale = -1, e.athaa_type = -1, e.ATHtype = -1, e.athaa_loudapprox = -1, e.athaa_sensitivity = 0, e.useTemporal = null, e.interChRatio = -1, t.mf_samples_to_encode = ee.ENCDELAY + ee.POSTDELAY, e.encoder_padding = 0, t.mf_size = ee.ENCDELAY - ee.MDCTDELAY, e.findReplayGain = !1, e.decode_on_the_fly = !1, t.decode_on_the_fly = !1, t.findReplayGain = !1, t.findPeakSample = !1, t.RadioGain = 0, t.AudiophileGain = 0, t.noclipGainChange = 0, t.noclipScale = -1, e.preset = 0, e.write_id3tag_automatic = !0, 0) ? null : (n.lame_allocated_gfp = 1, n);
      }, this.nearestBitrateFullIndex = function (e) {
        var t = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
            n = 0,
            a = 0,
            r = 0,
            s = 0;
        s = t[16], a = t[r = 16], n = 16;

        for (var i = 0; i < 16; i++) if (Math.max(e, t[i + 1]) != e) {
          s = t[i + 1], r = i + 1, a = t[i], n = i;
          break;
        }

        return e - a < s - e ? n : r;
      }, this.lame_init_params = function (e) {
        var t,
            n,
            a,
            r = e.internal_flags;

        if (r.Class_ID = 0, null == r.ATH && (r.ATH = new Z()), null == r.PSY && (r.PSY = new A()), null == r.rgdata && (r.rgdata = new Q()), r.channels_in = e.num_channels, 1 == r.channels_in && (e.mode = MPEGMode.MONO), r.channels_out = e.mode == MPEGMode.MONO ? 1 : 2, r.mode_ext = ee.MPG_MD_MS_LR, e.mode == MPEGMode.MONO && (e.force_ms = !1), e.VBR == q.vbr_off && 128 != e.VBR_mean_bitrate_kbps && 0 == e.brate && (e.brate = e.VBR_mean_bitrate_kbps), e.VBR == q.vbr_off || e.VBR == q.vbr_mtrh || e.VBR == q.vbr_mt || (e.free_format = !1), e.VBR == q.vbr_off && 0 == e.brate && $.EQ(e.compression_ratio, 0) && (e.compression_ratio = 11.025), e.VBR == q.vbr_off && 0 < e.compression_ratio && (0 == e.out_samplerate && (e.out_samplerate = map2MP3Frequency(int(.97 * e.in_samplerate))), e.brate = 0 | 16 * e.out_samplerate * r.channels_out / (1e3 * e.compression_ratio), r.samplerate_index = I(e.out_samplerate, e), e.free_format || (e.brate = V(e.brate, e.version, e.out_samplerate))), 0 != e.out_samplerate && (e.out_samplerate < 16e3 ? (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 64)) : e.out_samplerate < 32e3 ? (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 160)) : (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 32), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320))), 0 == e.lowpassfreq) {
          var s = 16e3;

          switch (e.VBR) {
            case q.vbr_off:
              O(i = new B(), e.brate), s = i.lowerlimit;
              break;

            case q.vbr_abr:
              var i;
              O(i = new B(), e.VBR_mean_bitrate_kbps), s = i.lowerlimit;
              break;

            case q.vbr_rh:
              var o = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];

              if (0 <= e.VBR_q && e.VBR_q <= 9) {
                var _ = o[e.VBR_q],
                    l = o[e.VBR_q + 1],
                    f = e.VBR_q_frac;
                s = linear_int(_, l, f);
              } else s = 19500;

              break;

            default:
              o = [19500, 19e3, 18500, 18e3, 17500, 16500, 15500, 14500, 12500, 9500, 3950], s = 0 <= e.VBR_q && e.VBR_q <= 9 ? (_ = o[e.VBR_q], l = o[e.VBR_q + 1], f = e.VBR_q_frac, linear_int(_, l, f)) : 19500;
          }

          e.mode != MPEGMode.MONO || e.VBR != q.vbr_off && e.VBR != q.vbr_abr || (s *= 1.5), e.lowpassfreq = 0 | s;
        }

        if (0 == e.out_samplerate && (2 * e.lowpassfreq > e.in_samplerate && (e.lowpassfreq = e.in_samplerate / 2), e.out_samplerate = (t = 0 | e.lowpassfreq, n = e.in_samplerate, a = 44100, 48e3 <= n ? a = 48e3 : 44100 <= n ? a = 44100 : 32e3 <= n ? a = 32e3 : 24e3 <= n ? a = 24e3 : 22050 <= n ? a = 22050 : 16e3 <= n ? a = 16e3 : 12e3 <= n ? a = 12e3 : 11025 <= n ? a = 11025 : 8e3 <= n && (a = 8e3), -1 == t ? a : (t <= 15960 && (a = 44100), t <= 15250 && (a = 32e3), t <= 11220 && (a = 24e3), t <= 9970 && (a = 22050), t <= 7230 && (a = 16e3), t <= 5420 && (a = 12e3), t <= 4510 && (a = 11025), t <= 3970 && (a = 8e3), n < a ? 44100 < n ? 48e3 : 32e3 < n ? 44100 : 24e3 < n ? 32e3 : 22050 < n ? 24e3 : 16e3 < n ? 22050 : 12e3 < n ? 16e3 : 11025 < n ? 12e3 : 8e3 < n ? 11025 : 8e3 : a))), e.lowpassfreq = Math.min(20500, e.lowpassfreq), e.lowpassfreq = Math.min(e.out_samplerate / 2, e.lowpassfreq), e.VBR == q.vbr_off && (e.compression_ratio = 16 * e.out_samplerate * r.channels_out / (1e3 * e.brate)), e.VBR == q.vbr_abr && (e.compression_ratio = 16 * e.out_samplerate * r.channels_out / (1e3 * e.VBR_mean_bitrate_kbps)), e.bWriteVbrTag || (e.findReplayGain = !1, e.decode_on_the_fly = !1, r.findPeakSample = !1), r.findReplayGain = e.findReplayGain, r.decode_on_the_fly = e.decode_on_the_fly, r.decode_on_the_fly && (r.findPeakSample = !0), r.findReplayGain && k.InitGainAnalysis(r.rgdata, e.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) return e.internal_flags = null, -6;

        switch (r.decode_on_the_fly && !e.decode_only && (null != r.hip && x.hip_decode_exit(r.hip), r.hip = x.hip_decode_init()), r.mode_gr = e.out_samplerate <= 24e3 ? 1 : 2, e.framesize = 576 * r.mode_gr, e.encoder_delay = ee.ENCDELAY, r.resample_ratio = e.in_samplerate / e.out_samplerate, e.VBR) {
          case q.vbr_mt:
          case q.vbr_rh:
          case q.vbr_mtrh:
            e.compression_ratio = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5][e.VBR_q];
            break;

          case q.vbr_abr:
            e.compression_ratio = 16 * e.out_samplerate * r.channels_out / (1e3 * e.VBR_mean_bitrate_kbps);
            break;

          default:
            e.compression_ratio = 16 * e.out_samplerate * r.channels_out / (1e3 * e.brate);
        }

        if (e.mode == MPEGMode.NOT_SET && (e.mode = MPEGMode.JOINT_STEREO), 0 < e.highpassfreq ? (r.highpass1 = 2 * e.highpassfreq, 0 <= e.highpasswidth ? r.highpass2 = 2 * (e.highpassfreq + e.highpasswidth) : r.highpass2 = 2 * e.highpassfreq, r.highpass1 /= e.out_samplerate, r.highpass2 /= e.out_samplerate) : (r.highpass1 = 0, r.highpass2 = 0), 0 < e.lowpassfreq ? (r.lowpass2 = 2 * e.lowpassfreq, 0 <= e.lowpasswidth ? (r.lowpass1 = 2 * (e.lowpassfreq - e.lowpasswidth), r.lowpass1 < 0 && (r.lowpass1 = 0)) : r.lowpass1 = 2 * e.lowpassfreq, r.lowpass1 /= e.out_samplerate, r.lowpass2 /= e.out_samplerate) : (r.lowpass1 = 0, r.lowpass2 = 0), function (e) {
          var t = e.internal_flags,
              n = 32,
              a = -1;

          if (0 < t.lowpass1) {
            for (var r = 999, s = 0; s <= 31; s++) (l = s / 31) >= t.lowpass2 && (n = Math.min(n, s)), t.lowpass1 < l && l < t.lowpass2 && (r = Math.min(r, s));

            t.lowpass1 = 999 == r ? (n - .75) / 31 : (r - .75) / 31, t.lowpass2 = n / 31;
          }

          if (0 < t.highpass2 && t.highpass2 < .75 / 31 * .9 && (t.highpass1 = 0, t.highpass2 = 0, X.err.println("Warning: highpass filter disabled.  highpass frequency too small\n")), 0 < t.highpass2) {
            var i = -1;

            for (s = 0; s <= 31; s++) (l = s / 31) <= t.highpass1 && (a = Math.max(a, s)), t.highpass1 < l && l < t.highpass2 && (i = Math.max(i, s));

            t.highpass1 = a / 31, t.highpass2 = -1 == i ? (a + .75) / 31 : (i + .75) / 31;
          }

          for (s = 0; s < 32; s++) {
            var o,
                _,
                l = s / 31;

            o = t.highpass2 > t.highpass1 ? E((t.highpass2 - l) / (t.highpass2 - t.highpass1 + 1e-20)) : 1, _ = t.lowpass2 > t.lowpass1 ? E((l - t.lowpass1) / (t.lowpass2 - t.lowpass1 + 1e-20)) : 1, t.amp_filter[s] = o * _;
          }
        }(e), r.samplerate_index = I(e.out_samplerate, e), r.samplerate_index < 0) return e.internal_flags = null, -1;

        if (e.VBR == q.vbr_off) {
          if (e.free_format) r.bitrate_index = 0;else if (e.brate = V(e.brate, e.version, e.out_samplerate), r.bitrate_index = H(e.brate, e.version, e.out_samplerate), r.bitrate_index <= 0) return e.internal_flags = null, -1;
        } else r.bitrate_index = 1;

        e.analysis && (e.bWriteVbrTag = !1), null != r.pinfo && (e.bWriteVbrTag = !1), P.init_bit_stream_w(r);

        for (var c, u, h, p = r.samplerate_index + 3 * e.version + 6 * (e.out_samplerate < 16e3 ? 1 : 0), d = 0; d < ee.SBMAX_l + 1; d++) r.scalefac_band.l[d] = w.sfBandIndex[p].l[d];

        for (d = 0; d < ee.PSFB21 + 1; d++) {
          var b = (r.scalefac_band.l[22] - r.scalefac_band.l[21]) / ee.PSFB21,
              m = r.scalefac_band.l[21] + d * b;
          r.scalefac_band.psfb21[d] = m;
        }

        for (r.scalefac_band.psfb21[ee.PSFB21] = 576, d = 0; d < ee.SBMAX_s + 1; d++) r.scalefac_band.s[d] = w.sfBandIndex[p].s[d];

        for (d = 0; d < ee.PSFB12 + 1; d++) b = (r.scalefac_band.s[13] - r.scalefac_band.s[12]) / ee.PSFB12, m = r.scalefac_band.s[12] + d * b, r.scalefac_band.psfb12[d] = m;

        for (r.scalefac_band.psfb12[ee.PSFB12] = 192, 1 == e.version ? r.sideinfo_len = 1 == r.channels_out ? 21 : 36 : r.sideinfo_len = 1 == r.channels_out ? 13 : 21, e.error_protection && (r.sideinfo_len += 2), u = (c = e).internal_flags, c.frameNum = 0, c.write_id3tag_automatic && M.id3tag_write_v2(c), u.bitrate_stereoMode_Hist = U([16, 5]), u.bitrate_blockType_Hist = U([16, 6]), u.PeakSample = 0, c.bWriteVbrTag && y.InitVbrTag(c), r.Class_ID = L, h = 0; h < 19; h++) r.nsPsy.pefirbuf[h] = 700 * r.mode_gr * r.channels_out;

        switch (-1 == e.ATHtype && (e.ATHtype = 4), z(e.VBR_q <= 9), z(0 <= e.VBR_q), e.VBR) {
          case q.vbr_mt:
            e.VBR = q.vbr_mtrh;

          case q.vbr_mtrh:
            null == e.useTemporal && (e.useTemporal = !1), g.apply_preset(e, 500 - 10 * e.VBR_q, 0), e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), e.quality < 5 && (e.quality = 0), 5 < e.quality && (e.quality = 5), r.PSY.mask_adjust = e.maskingadjust, r.PSY.mask_adjust_short = e.maskingadjust_short, e.experimentalY ? r.sfb21_extra = !1 : r.sfb21_extra = 44e3 < e.out_samplerate, r.iteration_loop = new VBRNewIterationLoop(S);
            break;

          case q.vbr_rh:
            g.apply_preset(e, 500 - 10 * e.VBR_q, 0), r.PSY.mask_adjust = e.maskingadjust, r.PSY.mask_adjust_short = e.maskingadjust_short, e.experimentalY ? r.sfb21_extra = !1 : r.sfb21_extra = 44e3 < e.out_samplerate, 6 < e.quality && (e.quality = 6), e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), r.iteration_loop = new VBROldIterationLoop(S);
            break;

          default:
            var v;
            r.sfb21_extra = !1, e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), (v = e.VBR) == q.vbr_off && (e.VBR_mean_bitrate_kbps = e.brate), g.apply_preset(e, e.VBR_mean_bitrate_kbps, 0), e.VBR = v, r.PSY.mask_adjust = e.maskingadjust, r.PSY.mask_adjust_short = e.maskingadjust_short, v == q.vbr_off ? r.iteration_loop = new W(S) : r.iteration_loop = new ABRIterationLoop(S);
        }

        if (z(0 <= e.scale), e.VBR != q.vbr_off) {
          if (r.VBR_min_bitrate = 1, r.VBR_max_bitrate = 14, e.out_samplerate < 16e3 && (r.VBR_max_bitrate = 8), 0 != e.VBR_min_bitrate_kbps && (e.VBR_min_bitrate_kbps = V(e.VBR_min_bitrate_kbps, e.version, e.out_samplerate), r.VBR_min_bitrate = H(e.VBR_min_bitrate_kbps, e.version, e.out_samplerate), r.VBR_min_bitrate < 0)) return -1;
          if (0 != e.VBR_max_bitrate_kbps && (e.VBR_max_bitrate_kbps = V(e.VBR_max_bitrate_kbps, e.version, e.out_samplerate), r.VBR_max_bitrate = H(e.VBR_max_bitrate_kbps, e.version, e.out_samplerate), r.VBR_max_bitrate < 0)) return -1;
          e.VBR_min_bitrate_kbps = J.bitrate_table[e.version][r.VBR_min_bitrate], e.VBR_max_bitrate_kbps = J.bitrate_table[e.version][r.VBR_max_bitrate], e.VBR_mean_bitrate_kbps = Math.min(J.bitrate_table[e.version][r.VBR_max_bitrate], e.VBR_mean_bitrate_kbps), e.VBR_mean_bitrate_kbps = Math.max(J.bitrate_table[e.version][r.VBR_min_bitrate], e.VBR_mean_bitrate_kbps);
        }

        return e.tune && (r.PSY.mask_adjust += e.tune_value_a, r.PSY.mask_adjust_short += e.tune_value_a), function (e) {
          var t = e.internal_flags;

          switch (e.quality) {
            default:
            case 9:
              t.psymodel = 0, t.noise_shaping = 0, t.noise_shaping_amp = 0, t.noise_shaping_stop = 0, t.use_best_huffman = 0, t.full_outer_loop = 0;
              break;

            case 8:
              e.quality = 7;

            case 7:
              t.psymodel = 1, t.noise_shaping = 0, t.noise_shaping_amp = 0, t.noise_shaping_stop = 0, t.use_best_huffman = 0, t.full_outer_loop = 0;
              break;

            case 6:
            case 5:
              t.psymodel = 1, 0 == t.noise_shaping && (t.noise_shaping = 1), t.noise_shaping_amp = 0, t.noise_shaping_stop = 0, -1 == t.subblock_gain && (t.subblock_gain = 1), t.use_best_huffman = 0, t.full_outer_loop = 0;
              break;

            case 4:
              t.psymodel = 1, 0 == t.noise_shaping && (t.noise_shaping = 1), t.noise_shaping_amp = 0, t.noise_shaping_stop = 0, -1 == t.subblock_gain && (t.subblock_gain = 1), t.use_best_huffman = 1, t.full_outer_loop = 0;
              break;

            case 3:
              t.psymodel = 1, 0 == t.noise_shaping && (t.noise_shaping = 1), t.noise_shaping_amp = 1, -(t.noise_shaping_stop = 1) == t.subblock_gain && (t.subblock_gain = 1), t.use_best_huffman = 1, t.full_outer_loop = 0;
              break;

            case 2:
              t.psymodel = 1, 0 == t.noise_shaping && (t.noise_shaping = 1), 0 == t.substep_shaping && (t.substep_shaping = 2), t.noise_shaping_amp = 1, -(t.noise_shaping_stop = 1) == t.subblock_gain && (t.subblock_gain = 1), t.use_best_huffman = 1, t.full_outer_loop = 0;
              break;

            case 1:
            case 0:
              t.psymodel = 1, 0 == t.noise_shaping && (t.noise_shaping = 1), 0 == t.substep_shaping && (t.substep_shaping = 2), t.noise_shaping_amp = 2, -(t.noise_shaping_stop = 1) == t.subblock_gain && (t.subblock_gain = 1), t.use_best_huffman = 1, t.full_outer_loop = 0;
          }
        }(e), z(0 <= e.scale), e.athaa_type < 0 ? r.ATH.useAdjust = 3 : r.ATH.useAdjust = e.athaa_type, r.ATH.aaSensitivityP = Math.pow(10, e.athaa_sensitivity / -10), null == e.short_blocks && (e.short_blocks = Y.short_block_allowed), e.short_blocks != Y.short_block_allowed || e.mode != MPEGMode.JOINT_STEREO && e.mode != MPEGMode.STEREO || (e.short_blocks = Y.short_block_coupled), e.quant_comp < 0 && (e.quant_comp = 1), e.quant_comp_short < 0 && (e.quant_comp_short = 0), e.msfix < 0 && (e.msfix = 0), e.exp_nspsytune = 1 | e.exp_nspsytune, e.internal_flags.nsPsy.attackthre < 0 && (e.internal_flags.nsPsy.attackthre = G.NSATTACKTHRE), e.internal_flags.nsPsy.attackthre_s < 0 && (e.internal_flags.nsPsy.attackthre_s = G.NSATTACKTHRE_S), z(0 <= e.scale), e.scale < 0 && (e.scale = 1), e.ATHtype < 0 && (e.ATHtype = 4), e.ATHcurve < 0 && (e.ATHcurve = 4), e.athaa_loudapprox < 0 && (e.athaa_loudapprox = 2), e.interChRatio < 0 && (e.interChRatio = 0), null == e.useTemporal && (e.useTemporal = !0), r.slot_lag = r.frac_SpF = 0, e.VBR == q.vbr_off && (r.slot_lag = r.frac_SpF = 72e3 * (e.version + 1) * e.brate % e.out_samplerate | 0), w.iteration_init(e), R.psymodel_init(e), z(0 <= e.scale), 0;
      }, this.lame_encode_flush = function (e, t, n, a) {
        var r,
            s,
            i,
            o,
            _ = e.internal_flags,
            l = d([2, 1152]),
            f = 0,
            c = _.mf_samples_to_encode - ee.POSTDELAY,
            u = N(e);
        if (_.mf_samples_to_encode < 1) return 0;

        for (r = 0, e.in_samplerate != e.out_samplerate && (c += 16 * e.out_samplerate / e.in_samplerate), (i = e.framesize - c % e.framesize) < 576 && (i += e.framesize), o = (c + (e.encoder_padding = i)) / e.framesize; 0 < o && 0 <= f;) {
          var h = u - _.mf_size,
              p = e.frameNum;
          h *= e.in_samplerate, 1152 < (h /= e.out_samplerate) && (h = 1152), h < 1 && (h = 1), s = a - r, 0 == a && (s = 0), n += f = this.lame_encode_buffer(e, l[0], l[1], h, t, n, s), r += f, o -= p != e.frameNum ? 1 : 0;
        }

        if (f < (_.mf_samples_to_encode = 0)) return f;
        if (s = a - r, 0 == a && (s = 0), P.flush_bitstream(e), (f = P.copy_buffer(_, t, n, s, 1)) < 0) return f;

        if (n += f, s = a - (r += f), 0 == a && (s = 0), e.write_id3tag_automatic) {
          if (M.id3tag_write_v1(e), (f = P.copy_buffer(_, t, n, s, 0)) < 0) return f;
          r += f;
        }

        return r;
      }, this.lame_encode_buffer = function (e, t, n, a, r, s, i) {
        var o,
            _,
            l = e.internal_flags,
            f = [null, null];

        if (l.Class_ID != L) return -3;
        if (0 == a) return 0;
        _ = a, (null == (o = l).in_buffer_0 || o.in_buffer_nsamples < _) && (o.in_buffer_0 = j(_), o.in_buffer_1 = j(_), o.in_buffer_nsamples = _), f[0] = l.in_buffer_0, f[1] = l.in_buffer_1;

        for (var c = 0; c < a; c++) f[0][c] = t[c], 1 < l.channels_in && (f[1][c] = n[c]);

        return function (e, t, n, a, r, s, i) {
          var o,
              _,
              l,
              f,
              c,
              u = e.internal_flags,
              h = 0,
              p = [null, null],
              d = [null, null];

          if (u.Class_ID != L) return -3;
          if (0 == a) return 0;
          if ((c = P.copy_buffer(u, r, s, i, 0)) < 0) return c;
          if (s += c, h += c, d[0] = t, d[1] = n, $.NEQ(e.scale, 0) && $.NEQ(e.scale, 1)) for (_ = 0; _ < a; ++_) d[0][_] *= e.scale, 2 == u.channels_out && (d[1][_] *= e.scale);
          if ($.NEQ(e.scale_left, 0) && $.NEQ(e.scale_left, 1)) for (_ = 0; _ < a; ++_) d[0][_] *= e.scale_left;
          if ($.NEQ(e.scale_right, 0) && $.NEQ(e.scale_right, 1)) for (_ = 0; _ < a; ++_) d[1][_] *= e.scale_right;
          if (2 == e.num_channels && 1 == u.channels_out) for (_ = 0; _ < a; ++_) d[0][_] = .5 * (d[0][_] + d[1][_]), d[1][_] = 0;
          f = N(e), p[0] = u.mfbuf[0], p[1] = u.mfbuf[1];

          for (var b, m, v, g, w, S, y, M = 0; 0 < a;) {
            var x = [null, null],
                R = 0,
                A = 0;
            x[0] = d[0], x[1] = d[1];
            var B = new F();
            if (D(e, p, x, M, a, B), R = B.n_in, A = B.n_out, u.findReplayGain && !u.decode_on_the_fly && k.AnalyzeSamples(u.rgdata, p[0], u.mf_size, p[1], u.mf_size, A, u.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;

            if (a -= R, M += R, u.channels_out, u.mf_size += A, z(u.mf_size <= K.MFSIZE), u.mf_samples_to_encode < 1 && (u.mf_samples_to_encode = ee.ENCDELAY + ee.POSTDELAY), u.mf_samples_to_encode += A, u.mf_size >= f) {
              var E = i - h;
              if (0 == i && (E = 0), b = e, m = p[0], v = p[1], g = r, w = s, S = E, void 0, y = T.enc.lame_encode_mp3_frame(b, m, v, g, w, S), b.frameNum++, (o = y) < 0) return o;

              for (s += o, h += o, u.mf_size -= e.framesize, u.mf_samples_to_encode -= e.framesize, l = 0; l < u.channels_out; l++) for (_ = 0; _ < u.mf_size; _++) p[l][_] = p[l][_ + e.framesize];
            }
          }

          return z(0 == a), h;
        }(e, f[0], f[1], a, r, s, i);
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        xe = (a.System, a.VbrMode),
        G = a.Float,
        Re = a.ShortBlock,
        K = a.Util,
        Ae = a.Arrays,
        Be = (a.new_array_n, a.new_byte, a.new_double, a.new_float),
        Ee = a.new_float_n,
        Te = a.new_int,
        ke = (a.new_int_n, a.assert),
        i = n(29),
        Pe = n(1);

    e.exports = function () {
      var R = new i(),
          A = 2.302585092994046,
          _e = 2,
          le = 16,
          v = 2,
          g = 16,
          k = .34,
          r = 1 / 217621504 / (Pe.BLKSIZE / 2),
          fe = .3,
          ce = 21,
          w = .2302585093;

      function S(e) {
        return e;
      }

      function F(e, t) {
        for (var n = 0, a = 0; a < Pe.BLKSIZE / 2; ++a) n += e[a] * t.ATH.eql_w[a];

        return n *= r;
      }

      function ue(e, t, n, a, r, s, i, o, _, l, f) {
        var c = e.internal_flags;
        if (_ < 2) R.fft_long(c, a[r], _, l, f), R.fft_short(c, s[i], _, l, f);else if (2 == _) {
          for (var u = Pe.BLKSIZE - 1; 0 <= u; --u) {
            var h = a[r + 0][u],
                p = a[r + 1][u];
            a[r + 0][u] = (h + p) * K.SQRT2 * .5, a[r + 1][u] = (h - p) * K.SQRT2 * .5;
          }

          for (var d = 2; 0 <= d; --d) for (u = Pe.BLKSIZE_s - 1; 0 <= u; --u) h = s[i + 0][d][u], p = s[i + 1][d][u], s[i + 0][d][u] = (h + p) * K.SQRT2 * .5, s[i + 1][d][u] = (h - p) * K.SQRT2 * .5;
        }

        for (t[0] = S(a[r + 0][0]), t[0] *= t[0], u = Pe.BLKSIZE / 2 - 1; 0 <= u; --u) {
          var b = a[r + 0][Pe.BLKSIZE / 2 - u],
              m = a[r + 0][Pe.BLKSIZE / 2 + u];
          t[Pe.BLKSIZE / 2 - u] = S(.5 * (b * b + m * m));
        }

        for (d = 2; 0 <= d; --d) for (n[d][0] = s[i + 0][d][0], n[d][0] *= n[d][0], u = Pe.BLKSIZE_s / 2 - 1; 0 <= u; --u) b = s[i + 0][d][Pe.BLKSIZE_s / 2 - u], m = s[i + 0][d][Pe.BLKSIZE_s / 2 + u], n[d][Pe.BLKSIZE_s / 2 - u] = S(.5 * (b * b + m * m));

        var v = 0;

        for (u = 11; u < Pe.HBLKSIZE; u++) v += t[u];

        if (c.tot_ener[_] = v, e.analysis) {
          for (u = 0; u < Pe.HBLKSIZE; u++) c.pinfo.energy[o][_][u] = c.pinfo.energy_save[_][u], c.pinfo.energy_save[_][u] = t[u];

          c.pinfo.pe[o][_] = c.pe[_];
        }

        2 == e.athaa_loudapprox && _ < 2 && (c.loudness_sq[o][_] = c.loudness_sq_save[_], c.loudness_sq_save[_] = F(t, c));
      }

      var B,
          E,
          T,
          P = 8,
          L = 23,
          I = 15,
          he = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749],
          f = [3.3246 * 3.3246, 3.23837 * 3.23837, 9.9500500969, 9.0247369744, 8.1854926609, 7.0440875649, 2.46209 * 2.46209, 2.284 * 2.284, 4.4892710641, 1.96552 * 1.96552, 1.82335 * 1.82335, 1.69146 * 1.69146, 2.4621061921, 2.1508568964, 1.37074 * 1.37074, 1.31036 * 1.31036, 1.5691069696, 1.4555939904, 1.16203 * 1.16203, 1.2715945225, 1.09428 * 1.09428, 1.0659 * 1.0659, 1.0779838276, 1.0382591025, 1],
          c = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
          u = [5.5396212496, 2.29259 * 2.29259, 4.9868695969, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 2.2499700001, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.2339655056, 1.0779838276];

      function pe(e, t, n, a, r, s) {
        var i, o, _;

        if (e < t) {
          if (!(t < e * E)) return e + t;
          i = t / e;
        } else {
          if (t * E <= e) return e + t;
          i = e / t;
        }

        if (ke(0 <= e), ke(0 <= t), e += t, a + 3 <= 6) {
          if (B <= i) return e;
          var l = 0 | K.FAST_LOG10_X(i, 16);
          return e * c[l];
        }

        return l = 0 | K.FAST_LOG10_X(i, 16), t = 0 != s ? r.ATH.cb_s[n] * r.ATH.adjust : r.ATH.cb_l[n] * r.ATH.adjust, ke(0 <= t), e < T * t ? t < e ? (o = 1, l <= 13 && (o = u[l]), _ = K.FAST_LOG10_X(e / t, 10 / 15), e * ((f[l] - o) * _ + o)) : 13 < l ? e : e * u[l] : e * f[l];
      }

      var s = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1];

      function x(e, t, n) {
        var a;
        if (e < 0 && (e = 0), t < 0 && (t = 0), e <= 0) return t;
        if (t <= 0) return e;

        if (a = e < t ? t / e : e / t, -2 <= n && n <= 2) {
          if (B <= a) return e + t;
          var r = 0 | K.FAST_LOG10_X(a, 16);
          return (e + t) * s[r];
        }

        return a < E ? e + t : (e < t && (e = t), e);
      }

      function de(e, t, n, a, r) {
        var s,
            i,
            o = 0,
            _ = 0;

        for (s = i = 0; s < Pe.SBMAX_s; ++i, ++s) {
          for (var l = e.bo_s[s], f = e.npart_s, c = l < f ? l : f; i < c;) ke(0 <= t[i]), ke(0 <= n[i]), o += t[i], _ += n[i], i++;

          if (e.en[a].s[s][r] = o, e.thm[a].s[s][r] = _, f <= i) {
            ++s;
            break;
          }

          ke(0 <= t[i]), ke(0 <= n[i]);
          var u = e.PSY.bo_s_weight[s],
              h = 1 - u;
          o = u * t[i], _ = u * n[i], e.en[a].s[s][r] += o, e.thm[a].s[s][r] += _, o = h * t[i], _ = h * n[i];
        }

        for (; s < Pe.SBMAX_s; ++s) e.en[a].s[s][r] = 0, e.thm[a].s[s][r] = 0;
      }

      function be(e, t, n, a) {
        var r,
            s,
            i = 0,
            o = 0;

        for (r = s = 0; r < Pe.SBMAX_l; ++s, ++r) {
          for (var _ = e.bo_l[r], l = e.npart_l, f = _ < l ? _ : l; s < f;) ke(0 <= t[s]), ke(0 <= n[s]), i += t[s], o += n[s], s++;

          if (e.en[a].l[r] = i, e.thm[a].l[r] = o, l <= s) {
            ++r;
            break;
          }

          ke(0 <= t[s]), ke(0 <= n[s]);
          var c = e.PSY.bo_l_weight[r],
              u = 1 - c;
          i = c * t[s], o = c * n[s], e.en[a].l[r] += i, e.thm[a].l[r] += o, i = u * t[s], o = u * n[s];
        }

        for (; r < Pe.SBMAX_l; ++r) e.en[a].l[r] = 0, e.thm[a].l[r] = 0;
      }

      function me(e, t, n, a, r, s) {
        var i,
            o,
            _ = e.internal_flags;

        for (o = i = 0; o < _.npart_s; ++o) {
          for (var l = 0, f = 0, c = _.numlines_s[o], u = 0; u < c; ++u, ++i) {
            var h = t[s][i];
            l += h, f < h && (f = h);
          }

          n[o] = l;
        }

        for (ke(o == _.npart_s), ke(129 == i), i = o = 0; o < _.npart_s; o++) {
          var p = _.s3ind_s[o][0],
              d = _.s3_ss[i++] * n[p];

          for (++p; p <= _.s3ind_s[o][1];) d += _.s3_ss[i] * n[p], ++i, ++p;

          var b = v * _.nb_s1[r][o];

          if (a[o] = Math.min(d, b), _.blocktype_old[1 & r] == Pe.SHORT_TYPE) {
            b = g * _.nb_s2[r][o];
            var m = a[o];
            a[o] = Math.min(b, m);
          }

          _.nb_s2[r][o] = _.nb_s1[r][o], _.nb_s1[r][o] = d, ke(0 <= a[o]);
        }

        for (; o <= Pe.CBANDS; ++o) n[o] = 0, a[o] = 0;
      }

      function ve(e, t, n) {
        return 1 <= n ? e : n <= 0 ? t : 0 < t ? Math.pow(e / t, n) * t : 0;
      }

      var _ = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130];

      function ge(e, t) {
        for (var n = 309.07, a = 0; a < Pe.SBMAX_s - 1; a++) for (var r = 0; r < 3; r++) {
          var s = e.thm.s[a][r];

          if (ke(a < _.length), 0 < s) {
            var i = s * t,
                o = e.en.s[a][r];
            i < o && (1e10 * i < o ? n += _[a] * (10 * A) : (ke(0 < i), n += _[a] * K.FAST_LOG10(o / i)));
          }
        }

        return n;
      }

      var o = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1];

      function we(e, t) {
        for (var n = 281.0575, a = 0; a < Pe.SBMAX_l - 1; a++) {
          var r = e.thm.l[a];

          if (ke(a < o.length), 0 < r) {
            var s = r * t,
                i = e.en.l[a];
            s < i && (1e10 * s < i ? n += o[a] * (10 * A) : (ke(0 < s), n += o[a] * K.FAST_LOG10(i / s)));
          }
        }

        return n;
      }

      function Se(e, t, n, a, r) {
        var s, i;

        for (s = i = 0; s < e.npart_l; ++s) {
          var o,
              _ = 0,
              l = 0;

          for (o = 0; o < e.numlines_l[s]; ++o, ++i) {
            var f = t[i];
            ke(0 <= f), _ += f, l < f && (l = f);
          }

          n[s] = _, a[s] = l, r[s] = _ * e.rnumlines_l[s], ke(0 <= e.rnumlines_l[s]), ke(0 <= _), ke(0 <= n[s]), ke(0 <= a[s]), ke(0 <= r[s]);
        }
      }

      function ye(e, t, n, a) {
        var r = he.length - 1,
            s = 0,
            i = n[s] + n[s + 1];

        for (ke(0 <= i), a[s] = 0 < i ? ((o = t[s]) < t[s + 1] && (o = t[s + 1]), ke(0 < e.numlines_l[s] + e.numlines_l[s + 1] - 1), r < (_ = 0 | (i = 20 * (2 * o - i) / (i * (e.numlines_l[s] + e.numlines_l[s + 1] - 1)))) && (_ = r), _) : 0, s = 1; s < e.npart_l - 1; s++) {
          var o, _;

          i = n[s - 1] + n[s] + n[s + 1], ke(0 <= i), a[s] = 0 < i ? ((o = t[s - 1]) < t[s] && (o = t[s]), o < t[s + 1] && (o = t[s + 1]), ke(0 < e.numlines_l[s - 1] + e.numlines_l[s] + e.numlines_l[s + 1] - 1), r < (_ = 0 | (i = 20 * (3 * o - i) / (i * (e.numlines_l[s - 1] + e.numlines_l[s] + e.numlines_l[s + 1] - 1)))) && (_ = r), _) : 0;
        }

        ke(0 < s), ke(s == e.npart_l - 1), i = n[s - 1] + n[s], ke(0 <= i), a[s] = 0 < i ? ((o = t[s - 1]) < t[s] && (o = t[s]), ke(0 < e.numlines_l[s - 1] + e.numlines_l[s] - 1), r < (_ = 0 | (i = 20 * (2 * o - i) / (i * (e.numlines_l[s - 1] + e.numlines_l[s] - 1)))) && (_ = r), _) : 0, ke(s == e.npart_l - 1);
      }

      var Me = [-1730326e-23, -.01703172, -1349528e-23, .0418072, -673278e-22, -.0876324, -30835e-21, .1863476, -1104424e-22, -.627638];

      function C(e, t, n, a, r, s, i, o) {
        var _ = e.internal_flags;
        if (a < 2) R.fft_long(_, i[o], a, t, n);else if (2 == a) for (var l = Pe.BLKSIZE - 1; 0 <= l; --l) {
          var f = i[o + 0][l],
              c = i[o + 1][l];
          i[o + 0][l] = (f + c) * K.SQRT2 * .5, i[o + 1][l] = (f - c) * K.SQRT2 * .5;
        }

        for (s[0] = S(i[o + 0][0]), s[0] *= s[0], l = Pe.BLKSIZE / 2 - 1; 0 <= l; --l) {
          var u = i[o + 0][Pe.BLKSIZE / 2 - l],
              h = i[o + 0][Pe.BLKSIZE / 2 + l];
          s[Pe.BLKSIZE / 2 - l] = S(.5 * (u * u + h * h));
        }

        var p = 0;

        for (l = 11; l < Pe.HBLKSIZE; l++) p += s[l];

        if (_.tot_ener[a] = p, e.analysis) {
          for (l = 0; l < Pe.HBLKSIZE; l++) _.pinfo.energy[r][a][l] = _.pinfo.energy_save[a][l], _.pinfo.energy_save[a][l] = s[l];

          _.pinfo.pe[r][a] = _.pe[a];
        }
      }

      function D(e, t, n, a, r, s, i, o) {
        var _ = e.internal_flags;
        if (0 == r && a < 2 && R.fft_short(_, i[o], a, t, n), 2 == a) for (var l = Pe.BLKSIZE_s - 1; 0 <= l; --l) {
          var f = i[o + 0][r][l],
              c = i[o + 1][r][l];
          i[o + 0][r][l] = (f + c) * K.SQRT2 * .5, i[o + 1][r][l] = (f - c) * K.SQRT2 * .5;
        }

        for (s[r][0] = i[o + 0][r][0], s[r][0] *= s[r][0], l = Pe.BLKSIZE_s / 2 - 1; 0 <= l; --l) {
          var u = i[o + 0][r][Pe.BLKSIZE_s / 2 - l],
              h = i[o + 0][r][Pe.BLKSIZE_s / 2 + l];
          s[r][Pe.BLKSIZE_s / 2 - l] = S(.5 * (u * u + h * h));
        }
      }

      this.L3psycho_anal_ns = function (e, t, n, a, r, s, i, o, _, l) {
        var f,
            c,
            u,
            h,
            p,
            d,
            b,
            m,
            v,
            g,
            w = e.internal_flags,
            S = Ee([2, Pe.BLKSIZE]),
            y = Ee([2, 3, Pe.BLKSIZE_s]),
            M = Be(Pe.CBANDS + 1),
            x = Be(Pe.CBANDS + 1),
            R = Be(Pe.CBANDS + 2),
            A = Te(2),
            B = Te(2),
            E = Ee([2, 576]),
            T = Te(Pe.CBANDS + 2),
            k = Te(Pe.CBANDS + 2);

        for (Ae.fill(k, 0), f = w.channels_out, e.mode == MPEGMode.JOINT_STEREO && (f = 4), v = e.VBR == xe.vbr_off ? 0 == w.ResvMax ? 0 : w.ResvSize / w.ResvMax * .5 : e.VBR == xe.vbr_rh || e.VBR == xe.vbr_mtrh || e.VBR == xe.vbr_mt ? .6 : 1, c = 0; c < w.channels_out; c++) {
          var P = t[c],
              L = n + 576 - 350 - ce + 192;

          for (ke(Me.length == (ce - 1) / 2), h = 0; h < 576; h++) {
            var I, V;

            for (I = P[L + h + 10], p = V = 0; p < (ce - 1) / 2 - 1; p += 2) I += Me[p] * (P[L + h + p] + P[L + h + ce - p]), V += Me[p + 1] * (P[L + h + p + 1] + P[L + h + ce - p - 1]);

            E[c][h] = I + V;
          }

          r[a][c].en.assign(w.en[c]), r[a][c].thm.assign(w.thm[c]), 2 < f && (s[a][c].en.assign(w.en[c + 2]), s[a][c].thm.assign(w.thm[c + 2]));
        }

        for (c = 0; c < f; c++) {
          var H,
              O = Be(12),
              N = [0, 0, 0, 0],
              F = Be(12),
              C = 1,
              D = Be(Pe.CBANDS),
              X = Be(Pe.CBANDS),
              q = [0, 0, 0, 0],
              Y = Be(Pe.HBLKSIZE),
              j = Ee([3, Pe.HBLKSIZE_s]);

          for (ke(w.npart_s <= Pe.CBANDS), ke(w.npart_l <= Pe.CBANDS), h = 0; h < 3; h++) O[h] = w.nsPsy.last_en_subshort[c][h + 6], ke(0 < w.nsPsy.last_en_subshort[c][h + 4]), F[h] = O[h] / w.nsPsy.last_en_subshort[c][h + 4], N[0] += O[h];

          if (2 == c) for (h = 0; h < 576; h++) {
            var U, z;
            U = E[0][h], z = E[1][h], E[0][h] = U + z, E[1][h] = U - z;
          }
          var G = E[1 & c],
              K = 0;

          for (h = 0; h < 9; h++) {
            for (var Z = K + 64, Q = 1; K < Z; K++) Q < Math.abs(G[K]) && (Q = Math.abs(G[K]));

            w.nsPsy.last_en_subshort[c][h] = O[h + 3] = Q, N[1 + h / 3] += Q, Q > O[h + 3 - 2] ? (ke(0 < O[h + 3 - 2]), Q /= O[h + 3 - 2]) : Q = O[h + 3 - 2] > 10 * Q ? (ke(0 < Q), O[h + 3 - 2] / (10 * Q)) : 0, F[h + 3] = Q;
          }

          if (e.analysis) {
            var W = F[0];

            for (h = 1; h < 12; h++) W < F[h] && (W = F[h]);

            w.pinfo.ers[a][c] = w.pinfo.ers_save[c], w.pinfo.ers_save[c] = W;
          }

          for (H = 3 == c ? w.nsPsy.attackthre_s : w.nsPsy.attackthre, h = 0; h < 12; h++) 0 == q[h / 3] && F[h] > H && (q[h / 3] = h % 3 + 1);

          for (h = 1; h < 4; h++) (N[h - 1] > N[h] ? (ke(0 < N[h]), N[h - 1] / N[h]) : (ke(0 < N[h - 1]), N[h] / N[h - 1])) < 1.7 && (q[h] = 0, 1 == h && (q[0] = 0));

          for (0 != q[0] && 0 != w.nsPsy.lastAttacks[c] && (q[0] = 0), 3 != w.nsPsy.lastAttacks[c] && q[0] + q[1] + q[2] + q[3] == 0 || ((C = 0) != q[1] && 0 != q[0] && (q[1] = 0), 0 != q[2] && 0 != q[1] && (q[2] = 0), 0 != q[3] && 0 != q[2] && (q[3] = 0)), c < 2 ? B[c] = C : 0 == C && (B[0] = B[1] = 0), _[c] = w.tot_ener[c], ue(e, Y, j, S, 1 & c, y, 1 & c, a, c, t, n), Se(w, Y, M, D, X), ye(w, D, X, T), m = 0; m < 3; m++) {
            var $, J;

            for (me(e, j, x, R, c, m), de(w, x, R, c, m), b = 0; b < Pe.SBMAX_s; b++) {
              if (J = w.thm[c].s[b][m], J *= .8, 2 <= q[m] || 1 == q[m + 1]) {
                var ee = 0 != m ? m - 1 : 2;
                Q = ve(w.thm[c].s[b][ee], J, .6 * v), J = Math.min(J, Q);
              }

              1 == q[m] ? (ee = 0 != m ? m - 1 : 2, Q = ve(w.thm[c].s[b][ee], J, fe * v), J = Math.min(J, Q)) : (0 != m && 3 == q[m - 1] || 0 == m && 3 == w.nsPsy.lastAttacks[c]) && (ee = 2 != m ? m + 1 : 0, Q = ve(w.thm[c].s[b][ee], J, fe * v), J = Math.min(J, Q)), $ = O[3 * m + 3] + O[3 * m + 4] + O[3 * m + 5], 6 * O[3 * m + 5] < $ && (J *= .5, 6 * O[3 * m + 4] < $ && (J *= .5)), w.thm[c].s[b][m] = J;
            }
          }

          for (w.nsPsy.lastAttacks[c] = q[2], u = d = 0; u < w.npart_l; u++) {
            for (var te = w.s3ind[u][0], ne = M[te] * he[T[te]], ae = w.s3_ll[d++] * ne; ++te <= w.s3ind[u][1];) ne = M[te] * he[T[te]], ae = pe(ae, w.s3_ll[d++] * ne, te, te - u, w, 0);

            ae *= .158489319246111, w.blocktype_old[1 & c] == Pe.SHORT_TYPE ? R[u] = ae : R[u] = ve(Math.min(ae, Math.min(_e * w.nb_1[c][u], le * w.nb_2[c][u])), ae, v), w.nb_2[c][u] = w.nb_1[c][u], w.nb_1[c][u] = ae;
          }

          for (; u <= Pe.CBANDS; ++u) M[u] = 0, R[u] = 0;

          be(w, M, R, c);
        }

        for (e.mode != MPEGMode.STEREO && e.mode != MPEGMode.JOINT_STEREO || 0 < e.interChRatio && function (e, t) {
          var n = e.internal_flags;

          if (1 < n.channels_out) {
            for (var a = 0; a < Pe.SBMAX_l; a++) {
              var r = n.thm[0].l[a],
                  s = n.thm[1].l[a];
              n.thm[0].l[a] += s * t, n.thm[1].l[a] += r * t;
            }

            for (a = 0; a < Pe.SBMAX_s; a++) for (var i = 0; i < 3; i++) r = n.thm[0].s[a][i], s = n.thm[1].s[a][i], n.thm[0].s[a][i] += s * t, n.thm[1].s[a][i] += r * t;
          }
        }(e, e.interChRatio), e.mode == MPEGMode.JOINT_STEREO && (function (e) {
          for (var t = 0; t < Pe.SBMAX_l; t++) if (!(e.thm[0].l[t] > 1.58 * e.thm[1].l[t] || e.thm[1].l[t] > 1.58 * e.thm[0].l[t])) {
            var n = e.mld_l[t] * e.en[3].l[t],
                a = Math.max(e.thm[2].l[t], Math.min(e.thm[3].l[t], n));
            n = e.mld_l[t] * e.en[2].l[t];
            var r = Math.max(e.thm[3].l[t], Math.min(e.thm[2].l[t], n));
            e.thm[2].l[t] = a, e.thm[3].l[t] = r;
          }

          for (t = 0; t < Pe.SBMAX_s; t++) for (var s = 0; s < 3; s++) e.thm[0].s[t][s] > 1.58 * e.thm[1].s[t][s] || e.thm[1].s[t][s] > 1.58 * e.thm[0].s[t][s] || (n = e.mld_s[t] * e.en[3].s[t][s], a = Math.max(e.thm[2].s[t][s], Math.min(e.thm[3].s[t][s], n)), n = e.mld_s[t] * e.en[2].s[t][s], r = Math.max(e.thm[3].s[t][s], Math.min(e.thm[2].s[t][s], n)), e.thm[2].s[t][s] = a, e.thm[3].s[t][s] = r);
        }(w), g = e.msfix, 0 < Math.abs(g) && function (e, t, n) {
          var a = t,
              r = Math.pow(10, n);
          t *= 2, a *= 2;

          for (var s = 0; s < Pe.SBMAX_l; s++) f = e.ATH.cb_l[e.bm_l[s]] * r, (o = Math.min(Math.max(e.thm[0].l[s], f), Math.max(e.thm[1].l[s], f))) * t < (_ = Math.max(e.thm[2].l[s], f)) + (l = Math.max(e.thm[3].l[s], f)) && ke(0 < (_ *= c = o * a / (_ + l)) + (l *= c)), e.thm[2].l[s] = Math.min(_, e.thm[2].l[s]), e.thm[3].l[s] = Math.min(l, e.thm[3].l[s]);

          for (r *= Pe.BLKSIZE_s / Pe.BLKSIZE, s = 0; s < Pe.SBMAX_s; s++) for (var i = 0; i < 3; i++) {
            var o, _, l, f, c;

            f = e.ATH.cb_s[e.bm_s[s]] * r, (o = Math.min(Math.max(e.thm[0].s[s][i], f), Math.max(e.thm[1].s[s][i], f))) * t < (_ = Math.max(e.thm[2].s[s][i], f)) + (l = Math.max(e.thm[3].s[s][i], f)) && ke(0 < (_ *= c = o * t / (_ + l)) + (l *= c)), e.thm[2].s[s][i] = Math.min(e.thm[2].s[s][i], _), e.thm[3].s[s][i] = Math.min(e.thm[3].s[s][i], l);
          }
        }(w, g, e.ATHlower * w.ATH.adjust)), function (e, t, n, a) {
          var r = e.internal_flags;
          e.short_blocks != Re.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);

          for (var s = 0; s < r.channels_out; s++) a[s] = Pe.NORM_TYPE, e.short_blocks == Re.short_block_dispensed && (t[s] = 1), e.short_blocks == Re.short_block_forced && (t[s] = 0), 0 != t[s] ? (ke(r.blocktype_old[s] != Pe.START_TYPE), r.blocktype_old[s] == Pe.SHORT_TYPE && (a[s] = Pe.STOP_TYPE)) : (a[s] = Pe.SHORT_TYPE, r.blocktype_old[s] == Pe.NORM_TYPE && (r.blocktype_old[s] = Pe.START_TYPE), r.blocktype_old[s] == Pe.STOP_TYPE && (r.blocktype_old[s] = Pe.SHORT_TYPE)), n[s] = r.blocktype_old[s], r.blocktype_old[s] = a[s];
        }(e, B, l, A), c = 0; c < f; c++) {
          var re,
              se,
              ie,
              oe = 0;
          ie = 1 < c ? (re = o, oe = -2, se = Pe.NORM_TYPE, l[0] != Pe.SHORT_TYPE && l[1] != Pe.SHORT_TYPE || (se = Pe.SHORT_TYPE), s[a][c - 2]) : (re = i, oe = 0, se = l[c], r[a][c]), se == Pe.SHORT_TYPE ? re[oe + c] = ge(ie, w.masking_lower) : re[oe + c] = we(ie, w.masking_lower), e.analysis && (w.pinfo.pe[a][c] = re[oe + c]);
        }

        return 0;
      };

      var X = [-1730326e-23, -.01703172, -1349528e-23, .0418072, -673278e-22, -.0876324, -30835e-21, .1863476, -1104424e-22, -.627638];

      function q(e, t, n) {
        if (0 == n) for (var a = 0; a < e.npart_s; a++) e.nb_s2[t][a] = e.nb_s1[t][a], e.nb_s1[t][a] = 0;
      }

      function Y(e, t) {
        for (var n = 0; n < e.npart_l; n++) e.nb_2[t][n] = e.nb_1[t][n], e.nb_1[t][n] = 0;
      }

      function j(e, t, n, a, r, s) {
        var i,
            o,
            _,
            l = e.internal_flags,
            f = new float[Pe.CBANDS](),
            c = Be(Pe.CBANDS),
            u = new int[Pe.CBANDS]();

        for (_ = o = 0; _ < l.npart_s; ++_) {
          var h = 0,
              p = 0,
              d = l.numlines_s[_];

          for (i = 0; i < d; ++i, ++o) {
            var b = t[s][o];
            h += b, p < b && (p = b);
          }

          n[_] = h, ke(0 <= h), f[_] = p, ke(0 < d), c[_] = h / d, ke(0 <= c[_]);
        }

        for (ke(_ == l.npart_s), ke(129 == o); _ < Pe.CBANDS; ++_) f[_] = 0, c[_] = 0;

        for (function (e, t, n, a) {
          var r = he.length - 1,
              s = 0,
              i = n[s] + n[s + 1];

          for (ke(0 <= i), a[s] = 0 < i ? ((o = t[s]) < t[s + 1] && (o = t[s + 1]), ke(0 < e.numlines_s[s] + e.numlines_s[s + 1] - 1), r < (_ = 0 | (i = 20 * (2 * o - i) / (i * (e.numlines_s[s] + e.numlines_s[s + 1] - 1)))) && (_ = r), _) : 0, s = 1; s < e.npart_s - 1; s++) {
            var o, _;

            i = n[s - 1] + n[s] + n[s + 1], ke(s + 1 < e.npart_s), ke(0 <= i), a[s] = 0 < i ? ((o = t[s - 1]) < t[s] && (o = t[s]), o < t[s + 1] && (o = t[s + 1]), ke(0 < e.numlines_s[s - 1] + e.numlines_s[s] + e.numlines_s[s + 1] - 1), r < (_ = 0 | (i = 20 * (3 * o - i) / (i * (e.numlines_s[s - 1] + e.numlines_s[s] + e.numlines_s[s + 1] - 1)))) && (_ = r), _) : 0;
          }

          ke(0 < s), ke(s == e.npart_s - 1), i = n[s - 1] + n[s], ke(0 <= i), a[s] = 0 < i ? ((o = t[s - 1]) < t[s] && (o = t[s]), ke(0 < e.numlines_s[s - 1] + e.numlines_s[s] - 1), r < (_ = 0 | (i = 20 * (2 * o - i) / (i * (e.numlines_s[s - 1] + e.numlines_s[s] - 1)))) && (_ = r), _) : 0, ke(s == e.npart_s - 1);
        }(l, f, c, u), o = _ = 0; _ < l.npart_s; _++) {
          var m,
              v,
              g,
              w,
              S,
              y = l.s3ind_s[_][0],
              M = l.s3ind_s[_][1];

          for (m = u[y], v = 1, w = l.s3_ss[o] * n[y] * he[u[y]], ++o, ++y; y <= M;) m += u[y], v += 1, w = x(w, g = l.s3_ss[o] * n[y] * he[u[y]], y - _), ++o, ++y;

          w *= S = .5 * he[m = (1 + 2 * m) / (2 * v)], a[_] = w, l.nb_s2[r][_] = l.nb_s1[r][_], l.nb_s1[r][_] = w, g = f[_], g *= l.minval_s[_], g *= S, a[_] > g && (a[_] = g), 1 < l.masking_lower && (a[_] *= l.masking_lower), a[_] > n[_] && (a[_] = n[_]), l.masking_lower < 1 && (a[_] *= l.masking_lower), ke(0 <= a[_]);
        }

        for (; _ < Pe.CBANDS; ++_) n[_] = 0, a[_] = 0;
      }

      function U(e, t, n, a, r) {
        var s,
            i = Be(Pe.CBANDS),
            o = Be(Pe.CBANDS),
            _ = Te(Pe.CBANDS + 2);

        Se(e, t, n, i, o), ye(e, i, o, _);
        var l = 0;

        for (s = 0; s < e.npart_l; s++) {
          var f,
              c,
              u,
              h = e.s3ind[s][0],
              p = e.s3ind[s][1],
              d = 0,
              b = 0;

          for (d = _[h], b += 1, c = e.s3_ll[l] * n[h] * he[_[h]], ++l, ++h; h <= p;) d += _[h], b += 1, c = x(c, f = e.s3_ll[l] * n[h] * he[_[h]], h - s), ++l, ++h;

          if (c *= u = .5 * he[d = (1 + 2 * d) / (2 * b)], e.blocktype_old[1 & r] == Pe.SHORT_TYPE) {
            var m = _e * e.nb_1[r][s];
            a[s] = 0 < m ? Math.min(c, m) : Math.min(c, n[s] * fe);
          } else {
            var v = le * e.nb_2[r][s],
                g = _e * e.nb_1[r][s];
            v <= 0 && (v = c), g <= 0 && (g = c), m = e.blocktype_old[1 & r] == Pe.NORM_TYPE ? Math.min(g, v) : g, a[s] = Math.min(c, m);
          }

          e.nb_2[r][s] = e.nb_1[r][s], e.nb_1[r][s] = c, f = i[s], f *= e.minval_l[s], f *= u, a[s] > f && (a[s] = f), 1 < e.masking_lower && (a[s] *= e.masking_lower), a[s] > n[s] && (a[s] = n[s]), e.masking_lower < 1 && (a[s] *= e.masking_lower), ke(0 <= a[s]);
        }

        for (; s < Pe.CBANDS; ++s) n[s] = 0, a[s] = 0;
      }

      function z(e, t, n, a, r, s, i) {
        for (var o, _, l = 2 * s, f = 0 < s ? Math.pow(10, r) : 1, c = 0; c < i; ++c) {
          var u = e[2][c],
              h = e[3][c],
              p = t[0][c],
              d = t[1][c],
              b = t[2][c],
              m = t[3][c];

          if (p <= 1.58 * d && d <= 1.58 * p) {
            var v = n[c] * h,
                g = n[c] * u;
            _ = Math.max(b, Math.min(m, v)), o = Math.max(m, Math.min(b, g));
          } else _ = b, o = m;

          if (0 < s) {
            var w,
                S,
                y = a[c] * f;

            if (w = Math.min(Math.max(p, y), Math.max(d, y)), 0 < (S = (b = Math.max(_, y)) + (m = Math.max(o, y))) && w * l < S) {
              var M = w * l / S;
              b *= M, m *= M, ke(0 < S);
            }

            _ = Math.min(b, _), o = Math.min(m, o);
          }

          u < _ && (_ = u), h < o && (o = h), t[2][c] = _, t[3][c] = o;
        }
      }

      function y(e, t) {
        var n;
        return (n = 0 <= e ? 27 * -e : e * t) <= -72 ? 0 : Math.exp(n * w);
      }

      function M(e) {
        var t,
            n,
            a,
            r,
            s = 0;

        for (s = 0; 1e-20 < y(s, e); s -= 1);

        for (a = s, r = 0; 1e-12 < Math.abs(r - a);) 0 < y(s = (r + a) / 2, e) ? r = s : a = s;

        for (t = a, s = s = 0; 1e-20 < y(s, e); s += 1);

        for (a = 0, r = s; 1e-12 < Math.abs(r - a);) 0 < y(s = (r + a) / 2, e) ? a = s : r = s;

        n = r;
        var i,
            o = 0;

        for (i = 0; i <= 1e3; ++i) o += y(s = t + i * (n - t) / 1e3, e);

        return 1001 / (o * (n - t));
      }

      function V(e) {
        return e < 0 && (e = 0), e *= .001, 13 * Math.atan(.76 * e) + 3.5 * Math.atan(e * e / 56.25);
      }

      function H(e, t, n, a, r, s, i, o, _, l, f, c) {
        var u,
            h = Be(Pe.CBANDS + 1),
            p = o / (15 < c ? 1152 : 384),
            d = Te(Pe.HBLKSIZE);
        o /= _;
        var b = 0,
            m = 0;

        for (u = 0; u < Pe.CBANDS; u++) {
          var v;

          for (B = V(o * b), h[u] = o * b, v = b; V(o * v) - B < k && v <= _ / 2; v++);

          for (e[u] = v - b, m = u + 1; b < v;) ke(b < Pe.HBLKSIZE), d[b++] = u;

          if (_ / 2 < b) {
            b = _ / 2, ++u;
            break;
          }
        }

        ke(u < Pe.CBANDS), h[u] = o * b;

        for (var g = 0; g < c; g++) {
          var w, S, y, M, x;
          y = l[g], M = l[g + 1], (w = 0 | Math.floor(.5 + f * (y - .5))) < 0 && (w = 0), _ / 2 < (S = 0 | Math.floor(.5 + f * (M - .5))) && (S = _ / 2), n[g] = (d[w] + d[S]) / 2, t[g] = d[S];
          var R = p * M;
          i[g] = (R - h[t[g]]) / (h[t[g] + 1] - h[t[g]]), i[g] < 0 ? i[g] = 0 : 1 < i[g] && (i[g] = 1), x = V(o * l[g] * f), x = Math.min(x, 15.5) / 15.5, s[g] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * x)) - 2.5);
        }

        for (var A = b = 0; A < m; A++) {
          var B,
              E,
              T = e[A];
          B = V(o * b), E = V(o * (b + T - 1)), a[A] = .5 * (B + E), B = V(o * (b - .5)), E = V(o * (b + T - .5)), r[A] = E - B, b += T;
        }

        return m;
      }

      function O(e, t, n, a, r, s) {
        var i,
            o,
            _,
            l,
            f,
            c,
            u = Ee([Pe.CBANDS, Pe.CBANDS]),
            h = 0;

        if (s) for (var p = 0; p < t; p++) for (i = 0; i < t; i++) {
          var d = (o = n[p] - n[i], c = f = l = _ = void 0, _ = o, l = .5 <= (_ *= 0 <= _ ? 3 : 1.5) && _ <= 2.5 ? 8 * ((c = _ - .5) * c - 2 * c) : 0, ((f = 15.811389 + 7.5 * (_ += .474) - 17.5 * Math.sqrt(1 + _ * _)) <= -60 ? 0 : (_ = Math.exp((l + f) * w), _ /= .6609193)) * a[i]);
          u[p][i] = d * r[p];
        } else for (i = 0; i < t; i++) {
          var b = 15 + Math.min(21 / n[i], 12),
              m = M(b);

          for (p = 0; p < t; p++) d = m * y(n[p] - n[i], b) * a[i], u[p][i] = d * r[p];
        }

        for (p = 0; p < t; p++) {
          for (i = 0; i < t && !(0 < u[p][i]); i++);

          for (e[p][0] = i, i = t - 1; 0 < i && !(0 < u[p][i]); i--);

          e[p][1] = i, h += e[p][1] - e[p][0] + 1;
        }

        var v = Be(h),
            g = 0;

        for (p = 0; p < t; p++) for (i = e[p][0]; i <= e[p][1]; i++) v[g++] = u[p][i];

        return v;
      }

      function N(e) {
        var t = V(e);
        return t = Math.min(t, 15.5) / 15.5, Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * t)) - 2.5);
      }

      function a(e, t) {
        return e < -.3 && (e = 3410), e /= 1e3, e = Math.max(.1, e), 3.64 * Math.pow(e, -.8) - 6.8 * Math.exp(-.6 * Math.pow(e - 3.4, 2)) + 6 * Math.exp(-.15 * Math.pow(e - 8.7, 2)) + .001 * (.6 + .04 * t) * Math.pow(e, 4);
      }

      this.L3psycho_anal_vbr = function (e, t, n, a, r, s, i, o, _, l) {
        var f,
            c,
            u,
            h,
            p,
            d = e.internal_flags,
            b = Be(Pe.HBLKSIZE),
            m = Ee([3, Pe.HBLKSIZE_s]),
            v = Ee([2, Pe.BLKSIZE]),
            g = Ee([2, 3, Pe.BLKSIZE_s]),
            w = Ee([4, Pe.CBANDS]),
            S = Ee([4, Pe.CBANDS]),
            y = Ee([4, 3]),
            M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            x = Te(2),
            R = e.mode == MPEGMode.JOINT_STEREO ? 4 : d.channels_out;
        !function (e, t, n, a, r, s, i, o, _, l) {
          for (var f = Ee([2, 576]), c = e.internal_flags, u = c.channels_out, h = e.mode == MPEGMode.JOINT_STEREO ? 4 : u, p = 0; p < u; p++) {
            firbuf = t[p];
            var d = n + 576 - 350 - ce + 192;
            ke(X.length == (ce - 1) / 2);

            for (var b = 0; b < 576; b++) {
              var m, v;
              m = firbuf[d + b + 10];

              for (var g = v = 0; g < (ce - 1) / 2 - 1; g += 2) m += X[g] * (firbuf[d + b + g] + firbuf[d + b + ce - g]), v += X[g + 1] * (firbuf[d + b + g + 1] + firbuf[d + b + ce - g - 1]);

              f[p][b] = m + v;
            }

            r[a][p].en.assign(c.en[p]), r[a][p].thm.assign(c.thm[p]), 2 < h && (s[a][p].en.assign(c.en[p + 2]), s[a][p].thm.assign(c.thm[p + 2]));
          }

          for (p = 0; p < h; p++) {
            var w = Be(12),
                S = Be(12),
                y = [0, 0, 0, 0],
                M = f[1 & p],
                x = 0,
                R = 3 == p ? c.nsPsy.attackthre_s : c.nsPsy.attackthre,
                A = 1;
            if (2 == p) for (b = 0, g = 576; 0 < g; ++b, --g) {
              var B = f[0][b],
                  E = f[1][b];
              f[0][b] = B + E, f[1][b] = B - E;
            }

            for (b = 0; b < 3; b++) S[b] = c.nsPsy.last_en_subshort[p][b + 6], ke(0 < c.nsPsy.last_en_subshort[p][b + 4]), w[b] = S[b] / c.nsPsy.last_en_subshort[p][b + 4], y[0] += S[b];

            for (b = 0; b < 9; b++) {
              for (var T = x + 64, k = 1; x < T; x++) k < Math.abs(M[x]) && (k = Math.abs(M[x]));

              c.nsPsy.last_en_subshort[p][b] = S[b + 3] = k, y[1 + b / 3] += k, k > S[b + 3 - 2] ? (ke(0 < S[b + 3 - 2]), k /= S[b + 3 - 2]) : k = S[b + 3 - 2] > 10 * k ? (ke(0 < k), S[b + 3 - 2] / (10 * k)) : 0, w[b + 3] = k;
            }

            for (b = 0; b < 3; ++b) {
              var P = S[3 * b + 3] + S[3 * b + 4] + S[3 * b + 5],
                  L = 1;
              6 * S[3 * b + 5] < P && (L *= .5, 6 * S[3 * b + 4] < P && (L *= .5)), o[p][b] = L;
            }

            if (e.analysis) {
              var I = w[0];

              for (b = 1; b < 12; b++) I < w[b] && (I = w[b]);

              c.pinfo.ers[a][p] = c.pinfo.ers_save[p], c.pinfo.ers_save[p] = I;
            }

            for (b = 0; b < 12; b++) 0 == _[p][b / 3] && w[b] > R && (_[p][b / 3] = b % 3 + 1);

            for (b = 1; b < 4; b++) {
              var V = y[b - 1],
                  H = y[b];
              Math.max(V, H) < 4e4 && V < 1.7 * H && H < 1.7 * V && (1 == b && _[p][0] <= _[p][b] && (_[p][0] = 0), _[p][b] = 0);
            }

            _[p][0] <= c.nsPsy.lastAttacks[p] && (_[p][0] = 0), 3 != c.nsPsy.lastAttacks[p] && _[p][0] + _[p][1] + _[p][2] + _[p][3] == 0 || ((A = 0) != _[p][1] && 0 != _[p][0] && (_[p][1] = 0), 0 != _[p][2] && 0 != _[p][1] && (_[p][2] = 0), 0 != _[p][3] && 0 != _[p][2] && (_[p][3] = 0)), p < 2 ? l[p] = A : 0 == A && (l[0] = l[1] = 0), i[p] = c.tot_ener[p];
          }
        }(e, t, n, a, r, s, _, y, M, x), function (e, t) {
          var n = e.internal_flags;
          e.short_blocks != Re.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);

          for (var a = 0; a < n.channels_out; a++) e.short_blocks == Re.short_block_dispensed && (t[a] = 1), e.short_blocks == Re.short_block_forced && (t[a] = 0);
        }(e, x);

        for (var A = 0; A < R; A++) C(e, t, n, A, a, b, v, E = 1 & A), c = a, u = A, h = b, p = void 0, p = (f = e).internal_flags, 2 == f.athaa_loudapprox && u < 2 && (p.loudness_sq[c][u] = p.loudness_sq_save[u], p.loudness_sq_save[u] = F(h, p)), 0 != x[E] ? U(d, b, w[A], S[A], A) : Y(d, A);

        for (x[0] + x[1] == 2 && e.mode == MPEGMode.JOINT_STEREO && z(w, S, d.mld_cb_l, d.ATH.cb_l, e.ATHlower * d.ATH.adjust, e.msfix, d.npart_l), A = 0; A < R; A++) 0 != x[E = 1 & A] && be(d, w[A], S[A], A);

        for (var B = 0; B < 3; B++) {
          for (A = 0; A < R; ++A) 0 != x[E = 1 & A] ? q(d, A, B) : (D(e, t, n, A, B, m, g, E), j(e, m, w[A], S[A], A, B));

          for (x[0] + x[1] == 0 && e.mode == MPEGMode.JOINT_STEREO && z(w, S, d.mld_cb_s, d.ATH.cb_s, e.ATHlower * d.ATH.adjust, e.msfix, d.npart_s), A = 0; A < R; ++A) 0 == x[E = 1 & A] && de(d, w[A], S[A], A, B);
        }

        for (A = 0; A < R; A++) {
          var E;
          if (0 == x[E = 1 & A]) for (var T = 0; T < Pe.SBMAX_s; T++) {
            var k = Be(3);

            for (B = 0; B < 3; B++) {
              var P = d.thm[A].s[T][B];

              if (P *= .8, 2 <= M[A][B] || 1 == M[A][B + 1]) {
                var L = 0 != B ? B - 1 : 2,
                    I = ve(d.thm[A].s[T][L], P, .36);
                P = Math.min(P, I);
              } else 1 == M[A][B] ? (L = 0 != B ? B - 1 : 2, I = ve(d.thm[A].s[T][L], P, .6 * fe), P = Math.min(P, I)) : (0 != B && 3 == M[A][B - 1] || 0 == B && 3 == d.nsPsy.lastAttacks[A]) && (L = 2 != B ? B + 1 : 0, I = ve(d.thm[A].s[T][L], P, .6 * fe), P = Math.min(P, I));

              P *= y[A][B], k[B] = P;
            }

            for (B = 0; B < 3; B++) d.thm[A].s[T][B] = k[B];
          }
        }

        for (A = 0; A < R; A++) d.nsPsy.lastAttacks[A] = M[A][2];

        for (function (e, t, n) {
          for (var a = e.internal_flags, r = 0; r < a.channels_out; r++) {
            var s = Pe.NORM_TYPE;
            0 != t[r] ? (ke(a.blocktype_old[r] != Pe.START_TYPE), a.blocktype_old[r] == Pe.SHORT_TYPE && (s = Pe.STOP_TYPE)) : (s = Pe.SHORT_TYPE, a.blocktype_old[r] == Pe.NORM_TYPE && (a.blocktype_old[r] = Pe.START_TYPE), a.blocktype_old[r] == Pe.STOP_TYPE && (a.blocktype_old[r] = Pe.SHORT_TYPE)), n[r] = a.blocktype_old[r], a.blocktype_old[r] = s;
          }
        }(e, x, l), A = 0; A < R; A++) {
          var V, H, O, N;
          N = 1 < A ? (V = o, H = -2, O = Pe.NORM_TYPE, l[0] != Pe.SHORT_TYPE && l[1] != Pe.SHORT_TYPE || (O = Pe.SHORT_TYPE), s[a][A - 2]) : (V = i, H = 0, O = l[A], r[a][A]), O == Pe.SHORT_TYPE ? V[H + A] = ge(N, d.masking_lower) : V[H + A] = we(N, d.masking_lower), e.analysis && (d.pinfo.pe[a][A] = V[H + A]);
        }

        return 0;
      }, this.psymodel_init = function (e) {
        var t,
            n,
            a = e.internal_flags,
            r = !0,
            s = 13,
            i = 0,
            o = 0,
            _ = -8.25,
            l = -4.5,
            f = Be(Pe.CBANDS),
            c = Be(Pe.CBANDS),
            u = Be(Pe.CBANDS),
            h = e.out_samplerate;

        switch (e.experimentalZ) {
          default:
          case 0:
            r = !0;
            break;

          case 1:
            r = e.VBR != xe.vbr_mtrh && e.VBR != xe.vbr_mt;
            break;

          case 2:
            r = !1;
            break;

          case 3:
            s = 8, i = -1.75, o = -.0125, _ = -8.25, l = -2.25;
        }

        for (a.ms_ener_ratio_old = .25, a.blocktype_old[0] = a.blocktype_old[1] = Pe.NORM_TYPE, t = 0; t < 4; ++t) {
          for (var p = 0; p < Pe.CBANDS; ++p) a.nb_1[t][p] = 1e20, a.nb_2[t][p] = 1e20, a.nb_s1[t][p] = a.nb_s2[t][p] = 1;

          for (var d = 0; d < Pe.SBMAX_l; d++) a.en[t].l[d] = 1e20, a.thm[t].l[d] = 1e20;

          for (p = 0; p < 3; ++p) {
            for (d = 0; d < Pe.SBMAX_s; d++) a.en[t].s[d][p] = 1e20, a.thm[t].s[d][p] = 1e20;

            a.nsPsy.lastAttacks[t] = 0;
          }

          for (p = 0; p < 9; p++) a.nsPsy.last_en_subshort[t][p] = 10;
        }

        for (a.loudness_sq_save[0] = a.loudness_sq_save[1] = 0, a.npart_l = H(a.numlines_l, a.bo_l, a.bm_l, f, c, a.mld_l, a.PSY.bo_l_weight, h, Pe.BLKSIZE, a.scalefac_band.l, Pe.BLKSIZE / 1152, Pe.SBMAX_l), ke(a.npart_l < Pe.CBANDS), t = 0; t < a.npart_l; t++) {
          var b = i;
          f[t] >= s && (b = o * (f[t] - s) / (24 - s) + i * (24 - f[t]) / (24 - s)), u[t] = Math.pow(10, b / 10), 0 < a.numlines_l[t] ? a.rnumlines_l[t] = 1 / a.numlines_l[t] : a.rnumlines_l[t] = 0;
        }

        for (a.s3_ll = O(a.s3ind, a.npart_l, f, c, u, r), t = p = 0; t < a.npart_l; t++) {
          g = G.MAX_VALUE;

          for (var m = 0; m < a.numlines_l[t]; m++, p++) {
            var v = h * p / (1e3 * Pe.BLKSIZE);
            w = this.ATHformula(1e3 * v, e) - 20, w = Math.pow(10, .1 * w), (w *= a.numlines_l[t]) < g && (g = w);
          }

          a.ATH.cb_l[t] = g, 6 < (g = 20 * f[t] / 10 - 20) && (g = 100), g < -15 && (g = -15), g -= 8, a.minval_l[t] = Math.pow(10, g / 10) * a.numlines_l[t];
        }

        for (a.npart_s = H(a.numlines_s, a.bo_s, a.bm_s, f, c, a.mld_s, a.PSY.bo_s_weight, h, Pe.BLKSIZE_s, a.scalefac_band.s, Pe.BLKSIZE_s / 384, Pe.SBMAX_s), ke(a.npart_s < Pe.CBANDS), t = p = 0; t < a.npart_s; t++) {
          var g;

          for (b = _, f[t] >= s && (b = l * (f[t] - s) / (24 - s) + _ * (24 - f[t]) / (24 - s)), u[t] = Math.pow(10, b / 10), g = G.MAX_VALUE, m = 0; m < a.numlines_s[t]; m++, p++) {
            var w;
            v = h * p / (1e3 * Pe.BLKSIZE_s), w = this.ATHformula(1e3 * v, e) - 20, w = Math.pow(10, .1 * w), (w *= a.numlines_s[t]) < g && (g = w);
          }

          a.ATH.cb_s[t] = g, g = 7 * f[t] / 12 - 7, 12 < f[t] && (g *= 1 + 3.1 * Math.log(1 + g)), f[t] < 12 && (g *= 1 + 2.3 * Math.log(1 - g)), g < -15 && (g = -15), g -= 8, a.minval_s[t] = Math.pow(10, g / 10) * a.numlines_s[t];
        }

        a.s3_ss = O(a.s3ind_s, a.npart_s, f, c, u, r), B = Math.pow(10, (P + 1) / 16), E = Math.pow(10, (L + 1) / 16), T = Math.pow(10, I / 10), R.init_fft(a), a.decay = Math.exp(-1 * A / (.01 * h / 192)), n = 3.5, 0 != (2 & e.exp_nspsytune) && (n = 1), 0 < Math.abs(e.msfix) && (n = e.msfix), e.msfix = n;

        for (var S = 0; S < a.npart_l; S++) a.s3ind[S][1] > a.npart_l - 1 && (a.s3ind[S][1] = a.npart_l - 1);

        var y = 576 * a.mode_gr / h;

        if (a.ATH.decay = Math.pow(10, -1.2 * y), a.ATH.adjust = .01, a.ATH.adjustLimit = 1, ke(a.bo_l[Pe.SBMAX_l - 1] <= a.npart_l), ke(a.bo_s[Pe.SBMAX_s - 1] <= a.npart_s), -1 != e.ATHtype) {
          var M = e.out_samplerate / Pe.BLKSIZE,
              x = 0;

          for (t = v = 0; t < Pe.BLKSIZE / 2; ++t) v += M, a.ATH.eql_w[t] = 1 / Math.pow(10, this.ATHformula(v, e) / 10), x += a.ATH.eql_w[t];

          for (x = 1 / x, t = Pe.BLKSIZE / 2; 0 <= --t;) a.ATH.eql_w[t] *= x;
        }

        for (S = p = 0; S < a.npart_s; ++S) for (t = 0; t < a.numlines_s[S]; ++t) ++p;

        for (ke(129 == p), S = p = 0; S < a.npart_l; ++S) for (t = 0; t < a.numlines_l[S]; ++t) ++p;

        for (ke(513 == p), t = p = 0; t < a.npart_l; t++) v = h * (p + a.numlines_l[t] / 2) / (1 * Pe.BLKSIZE), a.mld_cb_l[t] = N(v), p += a.numlines_l[t];

        for (; t < Pe.CBANDS; ++t) a.mld_cb_l[t] = 1;

        for (t = p = 0; t < a.npart_s; t++) v = h * (p + a.numlines_s[t] / 2) / (1 * Pe.BLKSIZE_s), a.mld_cb_s[t] = N(v), p += a.numlines_s[t];

        for (; t < Pe.CBANDS; ++t) a.mld_cb_s[t] = 1;

        return 0;
      }, this.ATHformula = function (e, t) {
        var n;

        switch (t.ATHtype) {
          case 0:
            n = a(e, 9);
            break;

          case 1:
            n = a(e, -1);
            break;

          case 2:
            n = a(e, 0);
            break;

          case 3:
            n = a(e, 1) + 6;
            break;

          case 4:
            n = a(e, t.ATHcurve);
            break;

          default:
            n = a(e, 0);
        }

        return n;
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        E = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util),
        r = (a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        v = (a.new_float_n, a.new_int, a.new_int_n, a.assert, n(1));

    e.exports = function () {
      var h = r(v.BLKSIZE),
          d = r(v.BLKSIZE_s / 2),
          B = [.9238795325112867, .3826834323650898, .9951847266721969, .0980171403295606, .9996988186962042, .02454122852291229, .9999811752826011, .006135884649154475];

      function b(e, t, n) {
        var a,
            r,
            s,
            i = 0,
            o = t + (n <<= 1);
        a = 4;

        do {
          var _, l, f, c, u, h, p;

          for (p = a >> 1, h = (u = (c = a) << 1) + c, a = u << 1, s = (r = t) + p; S = e[r + 0] - e[r + c], w = e[r + 0] + e[r + c], R = e[r + u] - e[r + h], M = e[r + u] + e[r + h], e[r + u] = w - M, e[r + 0] = w + M, e[r + h] = S - R, e[r + c] = S + R, S = e[s + 0] - e[s + c], w = e[s + 0] + e[s + c], R = E.SQRT2 * e[s + h], M = E.SQRT2 * e[s + u], e[s + u] = w - M, e[s + 0] = w + M, e[s + h] = S - R, e[s + c] = S + R, s += a, (r += a) < o;);

          for (l = B[i + 0], _ = B[i + 1], f = 1; f < p; f++) {
            var d, b;
            d = 1 - 2 * _ * _, b = 2 * _ * l, r = t + f, s = t + c - f;

            do {
              var m, v, g, w, S, y, M, x, R, A;
              v = b * e[r + c] - d * e[s + c], m = d * e[r + c] + b * e[s + c], S = e[r + 0] - m, w = e[r + 0] + m, y = e[s + 0] - v, g = e[s + 0] + v, v = b * e[r + h] - d * e[s + h], m = d * e[r + h] + b * e[s + h], R = e[r + u] - m, M = e[r + u] + m, A = e[s + u] - v, x = e[s + u] + v, v = _ * M - l * A, m = l * M + _ * A, e[r + u] = w - m, e[r + 0] = w + m, e[s + h] = y - v, e[s + c] = y + v, v = l * x - _ * R, m = _ * x + l * R, e[s + u] = g - m, e[s + 0] = g + m, e[r + h] = S - v, e[r + c] = S + v, s += a, r += a;
            } while (r < o);

            l = (d = l) * B[i + 0] - _ * B[i + 1], _ = d * B[i + 1] + _ * B[i + 0];
          }

          i += 2;
        } while (a < n);
      }

      var m = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254];
      this.fft_short = function (e, t, n, a, r) {
        for (var s = 0; s < 3; s++) {
          var i = v.BLKSIZE_s / 2,
              o = 65535 & 192 * (s + 1),
              _ = v.BLKSIZE_s / 8 - 1;

          do {
            var l,
                f,
                c,
                u,
                h,
                p = 255 & m[_ << 2];
            f = (l = d[p] * a[n][r + p + o]) - (h = d[127 - p] * a[n][r + p + o + 128]), l += h, u = (c = d[p + 64] * a[n][r + p + o + 64]) - (h = d[63 - p] * a[n][r + p + o + 192]), c += h, i -= 4, t[s][i + 0] = l + c, t[s][i + 2] = l - c, t[s][i + 1] = f + u, t[s][i + 3] = f - u, f = (l = d[p + 1] * a[n][r + p + o + 1]) - (h = d[126 - p] * a[n][r + p + o + 129]), l += h, u = (c = d[p + 65] * a[n][r + p + o + 65]) - (h = d[62 - p] * a[n][r + p + o + 193]), c += h, t[s][i + v.BLKSIZE_s / 2 + 0] = l + c, t[s][i + v.BLKSIZE_s / 2 + 2] = l - c, t[s][i + v.BLKSIZE_s / 2 + 1] = f + u, t[s][i + v.BLKSIZE_s / 2 + 3] = f - u;
          } while (0 <= --_);

          b(t[s], i, v.BLKSIZE_s / 2);
        }
      }, this.fft_long = function (e, t, n, a, r) {
        var s = v.BLKSIZE / 8 - 1,
            i = v.BLKSIZE / 2;

        do {
          var o,
              _,
              l,
              f,
              c,
              u = 255 & m[s];

          _ = (o = h[u] * a[n][r + u]) - (c = h[u + 512] * a[n][r + u + 512]), o += c, f = (l = h[u + 256] * a[n][r + u + 256]) - (c = h[u + 768] * a[n][r + u + 768]), l += c, t[0 + (i -= 4)] = o + l, t[i + 2] = o - l, t[i + 1] = _ + f, t[i + 3] = _ - f, _ = (o = h[u + 1] * a[n][r + u + 1]) - (c = h[u + 513] * a[n][r + u + 513]), o += c, f = (l = h[u + 257] * a[n][r + u + 257]) - (c = h[u + 769] * a[n][r + u + 769]), l += c, t[i + v.BLKSIZE / 2 + 0] = o + l, t[i + v.BLKSIZE / 2 + 2] = o - l, t[i + v.BLKSIZE / 2 + 1] = _ + f, t[i + v.BLKSIZE / 2 + 3] = _ - f;
        } while (0 <= --s);

        b(t, i, v.BLKSIZE / 2);
      }, this.init_fft = function (e) {
        for (var t = 0; t < v.BLKSIZE; t++) h[t] = .42 - .5 * Math.cos(2 * Math.PI * (t + .5) / v.BLKSIZE) + .08 * Math.cos(4 * Math.PI * (t + .5) / v.BLKSIZE);

        for (t = 0; t < v.BLKSIZE_s / 2; t++) d[t] = .5 * (1 - Math.cos(2 * Math.PI * (t + .5) / v.BLKSIZE_s));
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        J = a.System,
        h = (a.VbrMode, a.Float, a.ShortBlock, a.Util),
        ee = a.Arrays,
        te = (a.new_array_n, a.new_byte, a.new_double, a.new_float),
        ne = (a.new_float_n, a.new_int, a.new_int_n, a.assert, n(1));

    e.exports = function () {
      var u = [-.1482523854003001, 32.308141959636465, 296.40344946382766, 883.1344870032432, 11113.947376231741, 1057.2713659324597, 305.7402417275812, 30.825928907280012, 3.8533188138216365, 59.42900443849514, 709.5899960123345, 5281.91112291017, -5829.66483675846, -817.6293103748613, -76.91656988279972, -4.594269939176596, .9063471690191471, .1960342806591213, -.15466694054279598, 34.324387823855965, 301.8067566458425, 817.599602898885, 11573.795901679885, 1181.2520595540152, 321.59731579894424, 31.232021761053772, 3.7107095756221318, 53.650946155329365, 684.167428119626, 5224.56624370173, -6366.391851890084, -908.9766368219582, -89.83068876699639, -5.411397422890401, .8206787908286602, .3901806440322567, -.16070888947830023, 36.147034243915876, 304.11815768187864, 732.7429163887613, 11989.60988270091, 1300.012278487897, 335.28490093152146, 31.48816102859945, 3.373875931311736, 47.232241542899175, 652.7371796173471, 5132.414255594984, -6909.087078780055, -1001.9990371107289, -103.62185754286375, -6.104916304710272, .7416505462720353, .5805693545089249, -.16636367662261495, 37.751650073343995, 303.01103387567713, 627.9747488785183, 12358.763425278165, 1412.2779918482834, 346.7496836825721, 31.598286663170416, 3.1598635433980946, 40.57878626349686, 616.1671130880391, 5007.833007176154, -7454.040671756168, -1095.7960341867115, -118.24411666465777, -6.818469345853504, .6681786379192989, .7653668647301797, -.1716176790982088, 39.11551877123304, 298.3413246578966, 503.5259106886539, 12679.589408408976, 1516.5821921214542, 355.9850766329023, 31.395241710249053, 2.9164211881972335, 33.79716964664243, 574.8943997801362, 4853.234992253242, -7997.57021486075, -1189.7624067269965, -133.6444792601766, -7.7202770609839915, .5993769336819237, .9427934736519954, -.17645823955292173, 40.21879108166477, 289.9982036694474, 359.3226160751053, 12950.259102786438, 1612.1013903507662, 362.85067106591504, 31.045922092242872, 2.822222032597987, 26.988862316190684, 529.8996541764288, 4671.371946949588, -8535.899136645805, -1282.5898586244496, -149.58553632943463, -8.643494270763135, .5345111359507916, 1.111140466039205, -.36174739330527045, 41.04429910497807, 277.5463268268618, 195.6386023135583, 13169.43812144731, 1697.6433561479398, 367.40983966190305, 30.557037410382826, 2.531473372857427, 20.070154905927314, 481.50208566532336, 4464.970341588308, -9065.36882077239, -1373.62841526722, -166.1660487028118, -9.58289321133207, .4729647758913199, 1.268786568327291, -.36970682634889585, 41.393213350082036, 261.2935935556502, 12.935476055240873, 13336.131683328815, 1772.508612059496, 369.76534388639965, 29.751323653701338, 2.4023193045459172, 13.304795348228817, 430.5615775526625, 4237.0568611071185, -9581.931701634761, -1461.6913552409758, -183.12733958476446, -10.718010163869403, .41421356237309503, 1.414213562373095, -.37677560326535325, 41.619486213528496, 241.05423794991074, -187.94665032361226, 13450.063605744153, 1836.153896465782, 369.4908799925761, 29.001847876923147, 2.0714759319987186, 6.779591200894186, 377.7767837205709, 3990.386575512536, -10081.709459700915, -1545.947424837898, -200.3762958015653, -11.864482073055006, .3578057213145241, 1.546020906725474, -.3829366947518991, 41.1516456456653, 216.47684307105183, -406.1569483347166, 13511.136535077321, 1887.8076599260432, 367.3025214564151, 28.136213436723654, 1.913880671464418, .3829366947518991, 323.85365704338597, 3728.1472257487526, -10561.233882199509, -1625.2025997821418, -217.62525175416, -13.015432208941645, .3033466836073424, 1.66293922460509, -.5822628872992417, 40.35639251440489, 188.20071124269245, -640.2706748618148, 13519.21490106562, 1927.6022433578062, 362.8197642637487, 26.968821921868447, 1.7463817695935329, -5.62650678237171, 269.3016715297017, 3453.386536448852, -11016.145278780888, -1698.6569643425091, -234.7658734267683, -14.16351421663124, .2504869601913055, 1.76384252869671, -.5887180101749253, 39.23429103868072, 155.76096234403798, -889.2492977967378, 13475.470561874661, 1955.0535223723712, 356.4450994756727, 25.894952980042156, 1.5695032905781554, -11.181939564328772, 214.80884394039484, 3169.1640829158237, -11443.321309975563, -1765.1588461316153, -251.68908574481912, -15.49755935939164, .198912367379658, 1.847759065022573, -.7912582233652842, 37.39369355329111, 119.699486012458, -1151.0956593239027, 13380.446257078214, 1970.3952110853447, 348.01959814116185, 24.731487364283044, 1.3850130831637748, -16.421408865300393, 161.05030052864092, 2878.3322807850063, -11838.991423510031, -1823.985884688674, -268.2854986386903, -16.81724543849939, .1483359875383474, 1.913880671464418, -.7960642926861912, 35.2322109610459, 80.01928065061526, -1424.0212633405113, 13235.794061869668, 1973.804052543835, 337.9908651258184, 23.289159354463873, 1.3934255946442087, -21.099669467133474, 108.48348407242611, 2583.700758091299, -12199.726194855148, -1874.2780658979746, -284.2467154529415, -18.11369784385905, .09849140335716425, 1.961570560806461, -.998795456205172, 32.56307803611191, 36.958364584370486, -1706.075448829146, 13043.287458812016, 1965.3831106103316, 326.43182772364605, 22.175018750622293, 1.198638339011324, -25.371248002043963, 57.53505923036915, 2288.41886619975, -12522.674544337233, -1914.8400385312243, -299.26241273417224, -19.37805630698734, .04912684976946725, 1.990369453344394, .035780907 * h.SQRT2 * .5 / 2384e-9, .017876148 * h.SQRT2 * .5 / 2384e-9, .003134727 * h.SQRT2 * .5 / 2384e-9, .002457142 * h.SQRT2 * .5 / 2384e-9, 971317e-9 * h.SQRT2 * .5 / 2384e-9, 218868e-9 * h.SQRT2 * .5 / 2384e-9, 101566e-9 * h.SQRT2 * .5 / 2384e-9, 13828e-9 * h.SQRT2 * .5 / 2384e-9, 12804.797818791945, 1945.5515939597317, 313.4244966442953, 49591e-9 / 2384e-9, 1995.1556208053692, 21458e-9 / 2384e-9, -69618e-9 / 2384e-9],
          U = [[2382191739347913e-28, 6423305872147834e-28, 9400849094049688e-28, 1122435026096556e-27, 1183840321267481e-27, 1122435026096556e-27, 940084909404969e-27, 6423305872147839e-28, 2382191739347918e-28, 5456116108943412e-27, 4878985199565852e-27, 4240448995017367e-27, 3559909094758252e-27, 2858043359288075e-27, 2156177623817898e-27, 1475637723558783e-27, 8371015190102974e-28, 2599706096327376e-28, -5456116108943412e-27, -4878985199565852e-27, -4240448995017367e-27, -3559909094758252e-27, -2858043359288076e-27, -2156177623817898e-27, -1475637723558783e-27, -8371015190102975e-28, -2599706096327376e-28, -2382191739347923e-28, -6423305872147843e-28, -9400849094049696e-28, -1122435026096556e-27, -1183840321267481e-27, -1122435026096556e-27, -9400849094049694e-28, -642330587214784e-27, -2382191739347918e-28], [2382191739347913e-28, 6423305872147834e-28, 9400849094049688e-28, 1122435026096556e-27, 1183840321267481e-27, 1122435026096556e-27, 9400849094049688e-28, 6423305872147841e-28, 2382191739347918e-28, 5456116108943413e-27, 4878985199565852e-27, 4240448995017367e-27, 3559909094758253e-27, 2858043359288075e-27, 2156177623817898e-27, 1475637723558782e-27, 8371015190102975e-28, 2599706096327376e-28, -5461314069809755e-27, -4921085770524055e-27, -4343405037091838e-27, -3732668368707687e-27, -3093523840190885e-27, -2430835727329465e-27, -1734679010007751e-27, -974825365660928e-27, -2797435120168326e-28, 0, 0, 0, 0, 0, 0, -2283748241799531e-28, -4037858874020686e-28, -2146547464825323e-28], [.1316524975873958, .414213562373095, .7673269879789602, 1.091308501069271, 1.303225372841206, 1.56968557711749, 1.920982126971166, 2.414213562373094, 3.171594802363212, 4.510708503662055, 7.595754112725146, 22.90376554843115, .984807753012208, .6427876096865394, .3420201433256688, .9396926207859084, -.1736481776669303, -.7660444431189779, .8660254037844387, .5, -.5144957554275265, -.4717319685649723, -.3133774542039019, -.1819131996109812, -.09457419252642064, -.04096558288530405, -.01419856857247115, -.003699974673760037, .8574929257125442, .8817419973177052, .9496286491027329, .9833145924917901, .9955178160675857, .9991605581781475, .999899195244447, .9999931550702802], [0, 0, 0, 0, 0, 0, 2283748241799531e-28, 4037858874020686e-28, 2146547464825323e-28, 5461314069809755e-27, 4921085770524055e-27, 4343405037091838e-27, 3732668368707687e-27, 3093523840190885e-27, 2430835727329466e-27, 1734679010007751e-27, 974825365660928e-27, 2797435120168326e-28, -5456116108943413e-27, -4878985199565852e-27, -4240448995017367e-27, -3559909094758253e-27, -2858043359288075e-27, -2156177623817898e-27, -1475637723558782e-27, -8371015190102975e-28, -2599706096327376e-28, -2382191739347913e-28, -6423305872147834e-28, -9400849094049688e-28, -1122435026096556e-27, -1183840321267481e-27, -1122435026096556e-27, -9400849094049688e-28, -6423305872147841e-28, -2382191739347918e-28]],
          z = U[ne.SHORT_TYPE],
          G = U[ne.SHORT_TYPE],
          K = U[ne.SHORT_TYPE],
          Z = U[ne.SHORT_TYPE],
          Q = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];

      function W(e, t, n) {
        for (var a, r, s, i = 10, o = t + 238 - 14 - 286, _ = -15; _ < 0; _++) {
          var l, f, c;
          l = u[i + -10], f = e[o + -224] * l, c = e[t + 224] * l, l = u[i + -9], f += e[o + -160] * l, c += e[t + 160] * l, l = u[i + -8], f += e[o + -96] * l, c += e[t + 96] * l, l = u[i + -7], f += e[o + -32] * l, c += e[t + 32] * l, l = u[i + -6], f += e[o + 32] * l, c += e[t + -32] * l, l = u[i + -5], f += e[o + 96] * l, c += e[t + -96] * l, l = u[i + -4], f += e[o + 160] * l, c += e[t + -160] * l, l = u[i + -3], f += e[o + 224] * l, c += e[t + -224] * l, l = u[i + -2], f += e[t + -256] * l, c -= e[o + 256] * l, l = u[i + -1], f += e[t + -192] * l, c -= e[o + 192] * l, l = u[i + 0], f += e[t + -128] * l, c -= e[o + 128] * l, l = u[i + 1], f += e[t + -64] * l, c -= e[o + 64] * l, l = u[i + 2], f += e[t + 0] * l, c -= e[o + 0] * l, l = u[i + 3], f += e[t + 64] * l, c -= e[o + -64] * l, l = u[i + 4], f += e[t + 128] * l, c -= e[o + -128] * l, l = u[i + 5], f += e[t + 192] * l, l = (c -= e[o + -192] * l) - (f *= u[i + 6]), n[30 + 2 * _] = c + f, n[31 + 2 * _] = u[i + 7] * l, i += 18, t--, o++;
        }

        c = e[t + -16] * u[i + -10], f = e[t + -32] * u[i + -2], c += (e[t + -48] - e[t + 16]) * u[i + -9], f += e[t + -96] * u[i + -1], c += (e[t + -80] + e[t + 48]) * u[i + -8], f += e[t + -160] * u[i + 0], c += (e[t + -112] - e[t + 80]) * u[i + -7], f += e[t + -224] * u[i + 1], c += (e[t + -144] + e[t + 112]) * u[i + -6], f -= e[t + 32] * u[i + 2], c += (e[t + -176] - e[t + 144]) * u[i + -5], f -= e[t + 96] * u[i + 3], c += (e[t + -208] + e[t + 176]) * u[i + -4], f -= e[t + 160] * u[i + 4], c += (e[t + -240] - e[t + 208]) * u[i + -3], a = (f -= e[t + 224]) - c, r = f + c, c = n[14], f = n[15] - c, n[31] = r + c, n[30] = a + f, n[15] = a - f, n[14] = r - c, s = n[28] - n[0], n[0] += n[28], n[28] = s * u[i + -36 + 7], s = n[29] - n[1], n[1] += n[29], n[29] = s * u[i + -36 + 7], s = n[26] - n[2], n[2] += n[26], n[26] = s * u[i + -72 + 7], s = n[27] - n[3], n[3] += n[27], n[27] = s * u[i + -72 + 7], s = n[24] - n[4], n[4] += n[24], n[24] = s * u[i + -108 + 7], s = n[25] - n[5], n[5] += n[25], n[25] = s * u[i + -108 + 7], s = n[22] - n[6], n[6] += n[22], n[22] = s * h.SQRT2, s = n[23] - n[7], n[7] += n[23], n[23] = s * h.SQRT2 - n[7], n[7] -= n[6], n[22] -= n[7], n[23] -= n[22], s = n[6], n[6] = n[31] - s, n[31] = n[31] + s, s = n[7], n[7] = n[30] - s, n[30] = n[30] + s, s = n[22], n[22] = n[15] - s, n[15] = n[15] + s, s = n[23], n[23] = n[14] - s, n[14] = n[14] + s, s = n[20] - n[8], n[8] += n[20], n[20] = s * u[i + -180 + 7], s = n[21] - n[9], n[9] += n[21], n[21] = s * u[i + -180 + 7], s = n[18] - n[10], n[10] += n[18], n[18] = s * u[i + -216 + 7], s = n[19] - n[11], n[11] += n[19], n[19] = s * u[i + -216 + 7], s = n[16] - n[12], n[12] += n[16], n[16] = s * u[i + -252 + 7], s = n[17] - n[13], n[13] += n[17], n[17] = s * u[i + -252 + 7], s = -n[20] + n[24], n[20] += n[24], n[24] = s * u[i + -216 + 7], s = -n[21] + n[25], n[21] += n[25], n[25] = s * u[i + -216 + 7], s = n[4] - n[8], n[4] += n[8], n[8] = s * u[i + -216 + 7], s = n[5] - n[9], n[5] += n[9], n[9] = s * u[i + -216 + 7], s = n[0] - n[12], n[0] += n[12], n[12] = s * u[i + -72 + 7], s = n[1] - n[13], n[1] += n[13], n[13] = s * u[i + -72 + 7], s = n[16] - n[28], n[16] += n[28], n[28] = s * u[i + -72 + 7], s = -n[17] + n[29], n[17] += n[29], n[29] = s * u[i + -72 + 7], s = h.SQRT2 * (n[2] - n[10]), n[2] += n[10], n[10] = s, s = h.SQRT2 * (n[3] - n[11]), n[3] += n[11], n[11] = s, s = h.SQRT2 * (-n[18] + n[26]), n[18] += n[26], n[26] = s - n[18], s = h.SQRT2 * (-n[19] + n[27]), n[19] += n[27], n[27] = s - n[19], s = n[2], n[19] -= n[3], n[3] -= s, n[2] = n[31] - s, n[31] += s, s = n[3], n[11] -= n[19], n[18] -= s, n[3] = n[30] - s, n[30] += s, s = n[18], n[27] -= n[11], n[19] -= s, n[18] = n[15] - s, n[15] += s, s = n[19], n[10] -= s, n[19] = n[14] - s, n[14] += s, s = n[10], n[11] -= s, n[10] = n[23] - s, n[23] += s, s = n[11], n[26] -= s, n[11] = n[22] - s, n[22] += s, s = n[26], n[27] -= s, n[26] = n[7] - s, n[7] += s, s = n[27], n[27] = n[6] - s, n[6] += s, s = h.SQRT2 * (n[0] - n[4]), n[0] += n[4], n[4] = s, s = h.SQRT2 * (n[1] - n[5]), n[1] += n[5], n[5] = s, s = h.SQRT2 * (n[16] - n[20]), n[16] += n[20], n[20] = s, s = h.SQRT2 * (n[17] - n[21]), n[17] += n[21], n[21] = s, s = -h.SQRT2 * (n[8] - n[12]), n[8] += n[12], n[12] = s - n[8], s = -h.SQRT2 * (n[9] - n[13]), n[9] += n[13], n[13] = s - n[9], s = -h.SQRT2 * (n[25] - n[29]), n[25] += n[29], n[29] = s - n[25], s = -h.SQRT2 * (n[24] + n[28]), n[24] -= n[28], n[28] = s - n[24], s = n[24] - n[16], n[24] = s, s = n[20] - s, n[20] = s, s = n[28] - s, n[28] = s, s = n[25] - n[17], n[25] = s, s = n[21] - s, n[21] = s, s = n[29] - s, n[29] = s, s = n[17] - n[1], n[17] = s, s = n[9] - s, n[9] = s, s = n[25] - s, n[25] = s, s = n[5] - s, n[5] = s, s = n[21] - s, n[21] = s, s = n[13] - s, n[13] = s, s = n[29] - s, n[29] = s, s = n[1] - n[0], n[1] = s, s = n[16] - s, n[16] = s, s = n[17] - s, n[17] = s, s = n[8] - s, n[8] = s, s = n[9] - s, n[9] = s, s = n[24] - s, n[24] = s, s = n[25] - s, n[25] = s, s = n[4] - s, n[4] = s, s = n[5] - s, n[5] = s, s = n[20] - s, n[20] = s, s = n[21] - s, n[21] = s, s = n[12] - s, n[12] = s, s = n[13] - s, n[13] = s, s = n[28] - s, n[28] = s, s = n[29] - s, n[29] = s, s = n[0], n[0] += n[31], n[31] -= s, s = n[1], n[1] += n[30], n[30] -= s, s = n[16], n[16] += n[15], n[15] -= s, s = n[17], n[17] += n[14], n[14] -= s, s = n[8], n[8] += n[23], n[23] -= s, s = n[9], n[9] += n[22], n[22] -= s, s = n[24], n[24] += n[7], n[7] -= s, s = n[25], n[25] += n[6], n[6] -= s, s = n[4], n[4] += n[27], n[27] -= s, s = n[5], n[5] += n[26], n[26] -= s, s = n[20], n[20] += n[11], n[11] -= s, s = n[21], n[21] += n[10], n[10] -= s, s = n[12], n[12] += n[19], n[19] -= s, s = n[13], n[13] += n[18], n[18] -= s, s = n[28], n[28] += n[3], n[3] -= s, s = n[29], n[29] += n[2], n[2] -= s;
      }

      function $(e, t) {
        for (var n = 0; n < 3; n++) {
          var a, r, s, i, o, _;

          r = (i = e[t + 6] * U[ne.SHORT_TYPE][0] - e[t + 15]) + (a = e[t + 0] * U[ne.SHORT_TYPE][2] - e[t + 9]), s = i - a, o = (i = e[t + 15] * U[ne.SHORT_TYPE][0] + e[t + 6]) + (a = e[t + 9] * U[ne.SHORT_TYPE][2] + e[t + 0]), _ = -i + a, a = 2069978111953089e-26 * (e[t + 3] * U[ne.SHORT_TYPE][1] - e[t + 12]), i = 2069978111953089e-26 * (e[t + 12] * U[ne.SHORT_TYPE][1] + e[t + 3]), e[t + 0] = 190752519173728e-25 * r + a, e[t + 15] = 190752519173728e-25 * -o + i, s = .8660254037844387 * s * 1907525191737281e-26, o = .5 * o * 1907525191737281e-26 + i, e[t + 3] = s - o, e[t + 6] = s + o, r = .5 * r * 1907525191737281e-26 - a, _ = .8660254037844387 * _ * 1907525191737281e-26, e[t + 9] = r + _, e[t + 12] = r - _, t++;
        }
      }

      this.mdct_sub48 = function (e, t, n) {
        for (var a, r, s, i, o, _, l, f, c, u, h, p, d, b, m, v, g, w, S, y, M, x = t, R = 286, A = 0; A < e.channels_out; A++) {
          for (var B = 0; B < e.mode_gr; B++) {
            for (var E, T = e.l3_side.tt[B][A], k = T.xr, P = 0, L = e.sb_sample[A][1 - B], I = 0, V = 0; V < 9; V++) for (W(x, R, L[I]), W(x, R + 32, L[I + 1]), I += 2, R += 64, E = 1; E < 32; E += 2) L[I - 1][E] *= -1;

            for (E = 0; E < 32; E++, P += 18) {
              var H = T.block_type,
                  O = e.sb_sample[A][B],
                  N = e.sb_sample[A][1 - B];
              if (0 != T.mixed_block_flag && E < 2 && (H = 0), e.amp_filter[E] < 1e-12) ee.fill(k, P + 0, P + 18, 0);else {
                if (e.amp_filter[E] < 1) for (V = 0; V < 18; V++) N[V][Q[E]] *= e.amp_filter[E];

                if (H == ne.SHORT_TYPE) {
                  for (V = -3; V < 0; V++) {
                    var F = U[ne.SHORT_TYPE][V + 3];
                    k[P + 3 * V + 9] = O[9 + V][Q[E]] * F - O[8 - V][Q[E]], k[P + 3 * V + 18] = O[14 - V][Q[E]] * F + O[15 + V][Q[E]], k[P + 3 * V + 10] = O[15 + V][Q[E]] * F - O[14 - V][Q[E]], k[P + 3 * V + 19] = N[2 - V][Q[E]] * F + N[3 + V][Q[E]], k[P + 3 * V + 11] = N[3 + V][Q[E]] * F - N[2 - V][Q[E]], k[P + 3 * V + 20] = N[8 - V][Q[E]] * F + N[9 + V][Q[E]];
                  }

                  $(k, P);
                } else {
                  var C = te(18);

                  for (V = -9; V < 0; V++) {
                    var D, X;
                    D = U[H][V + 27] * N[V + 9][Q[E]] + U[H][V + 36] * N[8 - V][Q[E]], X = U[H][V + 9] * O[V + 9][Q[E]] - U[H][V + 18] * O[8 - V][Q[E]], C[V + 9] = D - X * z[3 + V + 9], C[V + 18] = D * z[3 + V + 9] + X;
                  }

                  a = k, r = P, M = y = S = w = g = v = m = b = d = p = h = u = c = f = l = _ = o = i = void 0, _ = (s = C)[17] - s[9], f = s[15] - s[11], c = s[14] - s[12], u = s[0] + s[8], h = s[1] + s[7], p = s[2] + s[6], d = s[3] + s[5], a[r + 17] = u + p - d - (h - s[4]), o = (u + p - d) * G[19] + (h - s[4]), i = (_ - f - c) * G[18], a[r + 5] = i + o, a[r + 6] = i - o, l = (s[16] - s[10]) * G[18], h = h * G[19] + s[4], i = _ * G[12] + l + f * G[13] + c * G[14], o = -u * G[16] + h - p * G[17] + d * G[15], a[r + 1] = i + o, a[r + 2] = i - o, i = _ * G[13] - l - f * G[14] + c * G[12], o = -u * G[17] + h - p * G[15] + d * G[16], a[r + 9] = i + o, a[r + 10] = i - o, i = _ * G[14] - l + f * G[12] - c * G[13], o = u * G[15] - h + p * G[16] - d * G[17], a[r + 13] = i + o, a[r + 14] = i - o, b = s[8] - s[0], v = s[6] - s[2], g = s[5] - s[3], w = s[17] + s[9], S = s[16] + s[10], y = s[15] + s[11], M = s[14] + s[12], a[r + 0] = w + y + M + (S + s[13]), i = (w + y + M) * G[19] - (S + s[13]), o = (b - v + g) * G[18], a[r + 11] = i + o, a[r + 12] = i - o, m = (s[7] - s[1]) * G[18], S = s[13] - S * G[19], i = w * G[15] - S + y * G[16] + M * G[17], o = b * G[14] + m + v * G[12] + g * G[13], a[r + 3] = i + o, a[r + 4] = i - o, i = -w * G[17] + S - y * G[15] - M * G[16], o = b * G[13] + m - v * G[14] - g * G[12], a[r + 7] = i + o, a[r + 8] = i - o, i = -w * G[16] + S - y * G[17] - M * G[15], o = b * G[12] - m + v * G[13] - g * G[14], a[r + 15] = i + o, a[r + 16] = i - o;
                }
              }
              if (H != ne.SHORT_TYPE && 0 != E) for (V = 7; 0 <= V; --V) {
                var q, Y;
                q = k[P + V] * K[20 + V] + k[P + -1 - V] * Z[28 + V], Y = k[P + V] * Z[28 + V] - k[P + -1 - V] * K[20 + V], k[P + -1 - V] = q, k[P + V] = Y;
              }
            }
          }

          if (x = n, R = 286, 1 == e.mode_gr) for (var j = 0; j < 18; j++) J.arraycopy(e.sb_sample[A][1][j], 0, e.sb_sample[A][0][j], 0, 32);
        }
      };
    };
  }, function (e, t, n) {
    var a = n(8);

    e.exports = function () {
      this.thm = new a(), this.en = new a();
    };
  }, function (e, t, n) {
    var a = n(9);

    e.exports = function () {
      this.class_id = 0, this.num_samples = 0, this.num_channels = 0, this.in_samplerate = 0, this.out_samplerate = 0, this.scale = 0, this.scale_left = 0, this.scale_right = 0, this.analysis = !1, this.bWriteVbrTag = !1, this.decode_only = !1, this.quality = 0, this.mode = a.STEREO, this.force_ms = !1, this.free_format = !1, this.findReplayGain = !1, this.decode_on_the_fly = !1, this.write_id3tag_automatic = !1, this.brate = 0, this.compression_ratio = 0, this.copyright = 0, this.original = 0, this.extension = 0, this.emphasis = 0, this.error_protection = 0, this.strict_ISO = !1, this.disable_reservoir = !1, this.quant_comp = 0, this.quant_comp_short = 0, this.experimentalY = !1, this.experimentalZ = 0, this.exp_nspsytune = 0, this.preset = 0, this.VBR = null, this.VBR_q_frac = 0, this.VBR_q = 0, this.VBR_mean_bitrate_kbps = 0, this.VBR_min_bitrate_kbps = 0, this.VBR_max_bitrate_kbps = 0, this.VBR_hard_min = 0, this.lowpassfreq = 0, this.highpassfreq = 0, this.lowpasswidth = 0, this.highpasswidth = 0, this.maskingadjust = 0, this.maskingadjust_short = 0, this.ATHonly = !1, this.ATHshort = !1, this.noATH = !1, this.ATHtype = 0, this.ATHcurve = 0, this.ATHlower = 0, this.athaa_type = 0, this.athaa_loudapprox = 0, this.athaa_sensitivity = 0, this.short_blocks = null, this.useTemporal = !1, this.interChRatio = 0, this.msfix = 0, this.tune = !1, this.tune_value_a = 0, this.version = 0, this.encoder_delay = 0, this.encoder_padding = 0, this.framesize = 0, this.frameNum = 0, this.lame_allocated_gfp = 0, this.internal_flags = null;
    };
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float, a.new_float_n, a.new_int),
        s = (a.new_int_n, a.assert, n(6));

    e.exports = function () {
      this.tt = [[null, null], [null, null]], this.main_data_begin = 0, this.private_bits = 0, this.resvDrain_pre = 0, this.resvDrain_post = 0, this.scfsi = [r(4), r(4)];

      for (var e = 0; e < 2; e++) for (var t = 0; t < 2; t++) this.tt[e][t] = new s();
    };
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        s = a.new_float_n,
        i = a.new_int,
        o = (a.new_int_n, a.assert, n(1));

    e.exports = function () {
      this.last_en_subshort = s([4, 9]), this.lastAttacks = i(4), this.pefirbuf = r(19), this.longfact = r(o.SBMAX_l), this.shortfact = r(o.SBMAX_s), this.attackthre = 0, this.attackthre_s = 0;
    };
  }, function (e, t) {
    e.exports = function () {
      this.sum = 0, this.seen = 0, this.want = 0, this.pos = 0, this.size = 0, this.bag = null, this.nVbrNumFrames = 0, this.nBytesWritten = 0, this.TotalFrameSize = 0;
    };
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        s = (a.new_float_n, a.new_int, a.new_int_n, a.assert, n(1));

    e.exports = function () {
      this.useAdjust = 0, this.aaSensitivityP = 0, this.adjust = 0, this.adjustLimit = 0, this.decay = 0, this.floor = 0, this.l = r(s.SBMAX_l), this.s = r(s.SBMAX_s), this.psfb21 = r(s.PSFB21), this.psfb12 = r(s.PSFB12), this.cb_l = r(s.CBANDS), this.cb_s = r(s.CBANDS), this.eql_w = r(s.BLKSIZE / 2);
    };
  }, function (e, t, n) {
    var a = n(0),
        r = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        s = (a.new_float_n, a.new_int),
        i = (a.new_int_n, a.assert, n(11));

    e.exports = function () {
      this.linprebuf = r(2 * i.MAX_ORDER), this.linpre = 0, this.lstepbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.lstep = 0, this.loutbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.lout = 0, this.rinprebuf = r(2 * i.MAX_ORDER), this.rinpre = 0, this.rstepbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.rstep = 0, this.routbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.rout = 0, this.sampleWindow = 0, this.totsamp = 0, this.lsum = 0, this.rsum = 0, this.freqindex = 0, this.first = 0, this.A = s(0 | i.STEPS_per_dB * i.MAX_dB), this.B = s(0 | i.STEPS_per_dB * i.MAX_dB);
    };
  }, function (e, t, n) {
    var a = n(0),
        m = (a.System, a.VbrMode, a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float),
        v = (a.new_float_n, a.new_int),
        g = (a.new_int_n, a.assert),
        w = n(12),
        S = n(1),
        y = n(5),
        M = n(4);

    e.exports = function (e) {
      var t = e;
      this.quantize = t, this.iteration_loop = function (e, t, n, a) {
        var r,
            s = e.internal_flags,
            i = m(y.SFBMAX),
            o = m(576),
            _ = v(2),
            l = 0,
            f = s.l3_side,
            c = new w(l);

        this.quantize.rv.ResvFrameBegin(e, c), l = c.bits;

        for (var u = 0; u < s.mode_gr; u++) {
          r = this.quantize.qupvt.on_pe(e, t, _, l, u, u), s.mode_ext == S.MPG_MD_MS_LR && (this.quantize.ms_convert(s.l3_side, u), this.quantize.qupvt.reduce_side(_, n[u], l, r));

          for (var h = 0; h < s.channels_out; h++) {
            var p,
                d,
                b = f.tt[u][h];
            d = b.block_type != S.SHORT_TYPE ? (p = 0, s.PSY.mask_adjust - p) : (p = 0, s.PSY.mask_adjust_short - p), s.masking_lower = Math.pow(10, .1 * d), this.quantize.init_outer_loop(s, b), this.quantize.init_xrpow(s, b, o) && (this.quantize.qupvt.calc_xmin(e, a[u][h], b, i), this.quantize.outer_loop(e, b, i, o, h, _[h])), this.quantize.iteration_finish_one(s, u, h), g(b.part2_3_length <= M.MAX_BITS_PER_CHANNEL), g(b.part2_3_length <= _[h]);
          }
        }

        this.quantize.rv.ResvFrameEnd(s, l);
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        u = (a.System, a.VbrMode);
    a.Float, a.ShortBlock, a.Util, a.Arrays, a.new_array_n, a.new_byte, a.new_double, a.new_float, a.new_float_n, a.new_int, a.new_int_n, a.assert;

    e.exports = function () {
      function e(e, t, n, a, r, s, i, o, _, l, f, c, u, h, p) {
        this.vbr_q = e, this.quant_comp = t, this.quant_comp_s = n, this.expY = a, this.st_lrm = r, this.st_s = s, this.masking_adj = i, this.masking_adj_short = o, this.ath_lower = _, this.ath_curve = l, this.ath_sensitivity = f, this.interch = c, this.safejoint = u, this.sfb21mod = h, this.msfix = p;
      }

      function t(e, t, n, a, r, s, i, o, _, l, f, c, u, h) {
        this.quant_comp = t, this.quant_comp_s = n, this.safejoint = a, this.nsmsfix = r, this.st_lrm = s, this.st_s = i, this.nsbass = o, this.scale = _, this.masking_adj = l, this.ath_lower = f, this.ath_curve = c, this.interch = u, this.sfscale = h;
      }

      var i;

      this.setModules = function (e) {
        i = e;
      };

      var f = [new e(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97), new e(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new e(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new e(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3), new e(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new e(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new e(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new e(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)],
          c = [new e(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97), new e(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new e(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new e(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new e(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new e(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new e(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new e(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)];

      function a(e, t, n) {
        var a,
            r,
            s = e.VBR == u.vbr_rh ? f : c,
            i = e.VBR_q_frac,
            o = s[t],
            _ = s[t + 1],
            l = o;
        o.st_lrm = o.st_lrm + i * (_.st_lrm - o.st_lrm), o.st_s = o.st_s + i * (_.st_s - o.st_s), o.masking_adj = o.masking_adj + i * (_.masking_adj - o.masking_adj), o.masking_adj_short = o.masking_adj_short + i * (_.masking_adj_short - o.masking_adj_short), o.ath_lower = o.ath_lower + i * (_.ath_lower - o.ath_lower), o.ath_curve = o.ath_curve + i * (_.ath_curve - o.ath_curve), o.ath_sensitivity = o.ath_sensitivity + i * (_.ath_sensitivity - o.ath_sensitivity), o.interch = o.interch + i * (_.interch - o.interch), o.msfix = o.msfix + i * (_.msfix - o.msfix), a = e, (r = l.vbr_q) < 0 && (r = 0), 9 < r && (r = 9), a.VBR_q = r, (a.VBR_q_frac = 0) != n ? e.quant_comp = l.quant_comp : 0 < Math.abs(e.quant_comp - -1) || (e.quant_comp = l.quant_comp), 0 != n ? e.quant_comp_short = l.quant_comp_s : 0 < Math.abs(e.quant_comp_short - -1) || (e.quant_comp_short = l.quant_comp_s), 0 != l.expY && (e.experimentalY = 0 != l.expY), 0 != n ? e.internal_flags.nsPsy.attackthre = l.st_lrm : 0 < Math.abs(e.internal_flags.nsPsy.attackthre - -1) || (e.internal_flags.nsPsy.attackthre = l.st_lrm), 0 != n ? e.internal_flags.nsPsy.attackthre_s = l.st_s : 0 < Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) || (e.internal_flags.nsPsy.attackthre_s = l.st_s), 0 != n ? e.maskingadjust = l.masking_adj : 0 < Math.abs(e.maskingadjust - 0) || (e.maskingadjust = l.masking_adj), 0 != n ? e.maskingadjust_short = l.masking_adj_short : 0 < Math.abs(e.maskingadjust_short - 0) || (e.maskingadjust_short = l.masking_adj_short), 0 != n ? e.ATHlower = -l.ath_lower / 10 : 0 < Math.abs(10 * -e.ATHlower - 0) || (e.ATHlower = -l.ath_lower / 10), 0 != n ? e.ATHcurve = l.ath_curve : 0 < Math.abs(e.ATHcurve - -1) || (e.ATHcurve = l.ath_curve), 0 != n ? e.athaa_sensitivity = l.ath_sensitivity : 0 < Math.abs(e.athaa_sensitivity - -1) || (e.athaa_sensitivity = l.ath_sensitivity), 0 < l.interch && (0 != n ? e.interChRatio = l.interch : 0 < Math.abs(e.interChRatio - -1) || (e.interChRatio = l.interch)), 0 < l.safejoint && (e.exp_nspsytune = e.exp_nspsytune | l.safejoint), 0 < l.sfb21mod && (e.exp_nspsytune = e.exp_nspsytune | l.sfb21mod << 20), 0 != n ? e.msfix = l.msfix : 0 < Math.abs(e.msfix - -1) || (e.msfix = l.msfix), 0 == n && (e.VBR_q = t, e.VBR_q_frac = i);
      }

      var o = [new t(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1), new t(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1), new t(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1), new t(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1), new t(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1), new t(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1), new t(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1), new t(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1), new t(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1), new t(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1), new t(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1), new t(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0), new t(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0), new t(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0), new t(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)];

      function r(e, t, n) {
        var a = t,
            r = i.nearestBitrateFullIndex(t);

        if (e.VBR = u.vbr_abr, e.VBR_mean_bitrate_kbps = a, e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320), e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.brate = e.VBR_mean_bitrate_kbps, 320 < e.VBR_mean_bitrate_kbps && (e.disable_reservoir = !0), 0 < o[r].safejoint && (e.exp_nspsytune = 2 | e.exp_nspsytune), 0 < o[r].sfscale && (e.internal_flags.noise_shaping = 2), 0 < Math.abs(o[r].nsbass)) {
          var s = int(4 * o[r].nsbass);
          s < 0 && (s += 64), e.exp_nspsytune = e.exp_nspsytune | s << 2;
        }

        return 0 != n ? e.quant_comp = o[r].quant_comp : 0 < Math.abs(e.quant_comp - -1) || (e.quant_comp = o[r].quant_comp), 0 != n ? e.quant_comp_short = o[r].quant_comp_s : 0 < Math.abs(e.quant_comp_short - -1) || (e.quant_comp_short = o[r].quant_comp_s), 0 != n ? e.msfix = o[r].nsmsfix : 0 < Math.abs(e.msfix - -1) || (e.msfix = o[r].nsmsfix), 0 != n ? e.internal_flags.nsPsy.attackthre = o[r].st_lrm : 0 < Math.abs(e.internal_flags.nsPsy.attackthre - -1) || (e.internal_flags.nsPsy.attackthre = o[r].st_lrm), 0 != n ? e.internal_flags.nsPsy.attackthre_s = o[r].st_s : 0 < Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) || (e.internal_flags.nsPsy.attackthre_s = o[r].st_s), 0 != n ? e.scale = o[r].scale : 0 < Math.abs(e.scale - -1) || (e.scale = o[r].scale), 0 != n ? e.maskingadjust = o[r].masking_adj : 0 < Math.abs(e.maskingadjust - 0) || (e.maskingadjust = o[r].masking_adj), 0 < o[r].masking_adj ? 0 != n ? e.maskingadjust_short = .9 * o[r].masking_adj : 0 < Math.abs(e.maskingadjust_short - 0) || (e.maskingadjust_short = .9 * o[r].masking_adj) : 0 != n ? e.maskingadjust_short = 1.1 * o[r].masking_adj : 0 < Math.abs(e.maskingadjust_short - 0) || (e.maskingadjust_short = 1.1 * o[r].masking_adj), 0 != n ? e.ATHlower = -o[r].ath_lower / 10 : 0 < Math.abs(10 * -e.ATHlower - 0) || (e.ATHlower = -o[r].ath_lower / 10), 0 != n ? e.ATHcurve = o[r].ath_curve : 0 < Math.abs(e.ATHcurve - -1) || (e.ATHcurve = o[r].ath_curve), 0 != n ? e.interChRatio = o[r].interch : 0 < Math.abs(e.interChRatio - -1) || (e.interChRatio = o[r].interch), t;
      }

      this.apply_preset = function (e, t, n) {
        switch (t) {
          case Lame.R3MIX:
            t = Lame.V3, e.VBR = u.vbr_mtrh;
            break;

          case Lame.MEDIUM:
            t = Lame.V4, e.VBR = u.vbr_rh;
            break;

          case Lame.MEDIUM_FAST:
            t = Lame.V4, e.VBR = u.vbr_mtrh;
            break;

          case Lame.STANDARD:
            t = Lame.V2, e.VBR = u.vbr_rh;
            break;

          case Lame.STANDARD_FAST:
            t = Lame.V2, e.VBR = u.vbr_mtrh;
            break;

          case Lame.EXTREME:
            t = Lame.V0, e.VBR = u.vbr_rh;
            break;

          case Lame.EXTREME_FAST:
            t = Lame.V0, e.VBR = u.vbr_mtrh;
            break;

          case Lame.INSANE:
            return t = 320, e.preset = t, r(e, t, n), e.VBR = u.vbr_off, t;
        }

        switch (e.preset = t) {
          case Lame.V9:
            return a(e, 9, n), t;

          case Lame.V8:
            return a(e, 8, n), t;

          case Lame.V7:
            return a(e, 7, n), t;

          case Lame.V6:
            return a(e, 6, n), t;

          case Lame.V5:
            return a(e, 5, n), t;

          case Lame.V4:
            return a(e, 4, n), t;

          case Lame.V3:
            return a(e, 3, n), t;

          case Lame.V2:
            return a(e, 2, n), t;

          case Lame.V1:
            return a(e, 1, n), t;

          case Lame.V0:
            return a(e, 0, n), t;
        }

        return 8 <= t && t <= 320 ? r(e, t, n) : (e.preset = 0, t);
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        A = a.System,
        B = a.VbrMode,
        i = (a.Float, a.ShortBlock, a.Util),
        b = a.Arrays,
        E = (a.new_array_n, a.new_byte, a.new_double, a.new_float),
        T = (a.new_float_n, a.new_int, a.new_int_n, a.assert),
        s = n(41),
        k = n(42),
        P = n(43),
        L = n(1),
        I = n(6),
        V = n(5);

    e.exports = function () {
      var m, g, S;
      this.rv = null, this.qupvt = null;
      var y,
          r = new s();

      function M(e) {
        this.ordinal = e;
      }

      function o(e) {
        for (var t = 0; t < e.sfbmax; t++) if (e.scalefac[t] + e.subblock_gain[e.window[t]] == 0) return !1;

        return !0;
      }

      function x(e, t, n, a, r) {
        var s;

        switch (e) {
          default:
          case 9:
            0 < t.over_count ? (s = n.over_SSD <= t.over_SSD, n.over_SSD == t.over_SSD && (s = n.bits < t.bits)) : s = n.max_noise < 0 && 10 * n.max_noise + n.bits <= 10 * t.max_noise + t.bits;
            break;

          case 0:
            s = n.over_count < t.over_count || n.over_count == t.over_count && n.over_noise < t.over_noise || n.over_count == t.over_count && BitStream.EQ(n.over_noise, t.over_noise) && n.tot_noise < t.tot_noise;
            break;

          case 8:
            n.max_noise = function (e, t) {
              for (var n, a = 1e-37, r = 0; r < t.psymax; r++) a += (n = e[r], i.FAST_LOG10(.368 + .632 * n * n * n));

              return Math.max(1e-20, a);
            }(r, a);

          case 1:
            s = n.max_noise < t.max_noise;
            break;

          case 2:
            s = n.tot_noise < t.tot_noise;
            break;

          case 3:
            s = n.tot_noise < t.tot_noise && n.max_noise < t.max_noise;
            break;

          case 4:
            s = n.max_noise <= 0 && .2 < t.max_noise || n.max_noise <= 0 && t.max_noise < 0 && t.max_noise > n.max_noise - .2 && n.tot_noise < t.tot_noise || n.max_noise <= 0 && 0 < t.max_noise && t.max_noise > n.max_noise - .2 && n.tot_noise < t.tot_noise + t.over_noise || 0 < n.max_noise && -.05 < t.max_noise && t.max_noise > n.max_noise - .1 && n.tot_noise + n.over_noise < t.tot_noise + t.over_noise || 0 < n.max_noise && -.1 < t.max_noise && t.max_noise > n.max_noise - .15 && n.tot_noise + n.over_noise + n.over_noise < t.tot_noise + t.over_noise + t.over_noise;
            break;

          case 5:
            s = n.over_noise < t.over_noise || BitStream.EQ(n.over_noise, t.over_noise) && n.tot_noise < t.tot_noise;
            break;

          case 6:
            s = n.over_noise < t.over_noise || BitStream.EQ(n.over_noise, t.over_noise) && (n.max_noise < t.max_noise || BitStream.EQ(n.max_noise, t.max_noise) && n.tot_noise <= t.tot_noise);
            break;

          case 7:
            s = n.over_count < t.over_count || n.over_noise < t.over_noise;
        }

        return 0 == t.over_count && (s = s && n.bits < t.bits), s;
      }

      function R(e, t, n, a, r) {
        var s = e.internal_flags;
        !function (e, t, n, a, r) {
          var s,
              i = e.internal_flags;
          s = 0 == t.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;

          for (var o = 0, _ = 0; _ < t.sfbmax; _++) o < n[_] && (o = n[_]);

          var l = i.noise_shaping_amp;

          switch (3 == l && (l = r ? 2 : 1), l) {
            case 2:
              break;

            case 1:
              1 < o ? o = Math.pow(o, .5) : o *= .95;
              break;

            case 0:
            default:
              1 < o ? o = 1 : o *= .95;
          }

          var f = 0;

          for (_ = 0; _ < t.sfbmax; _++) {
            var c,
                u = t.width[_];

            if (f += u, !(n[_] < o)) {
              if (0 != (2 & i.substep_shaping) && (i.pseudohalf[_] = 0 == i.pseudohalf[_] ? 1 : 0, 0 == i.pseudohalf[_] && 2 == i.noise_shaping_amp)) return;

              for (t.scalefac[_]++, c = -u; c < 0; c++) a[f + c] *= s, a[f + c] > t.xrpow_max && (t.xrpow_max = a[f + c]);

              if (2 == i.noise_shaping_amp) return;
            }
          }
        }(e, t, n, a, r);
        var i = o(t);
        return !(i || (i = 2 == s.mode_gr ? y.scale_bitcount(t) : y.scale_bitcount_lsf(s, t)) && (1 < s.noise_shaping && (b.fill(s.pseudohalf, 0), 0 == t.scalefac_scale ? (function (e, t) {
          for (var n = 0, a = 0; a < e.sfbmax; a++) {
            var r = e.width[a],
                s = e.scalefac[a];

            if (0 != e.preflag && (s += S.pretab[a]), n += r, 0 != (1 & s)) {
              s++;

              for (var i = -r; i < 0; i++) t[n + i] *= 1.2968395546510096, t[n + i] > e.xrpow_max && (e.xrpow_max = t[n + i]);
            }

            e.scalefac[a] = s >> 1;
          }

          e.preflag = 0, e.scalefac_scale = 1;
        }(t, a), i = !1) : t.block_type == L.SHORT_TYPE && 0 < s.subblock_gain && (i = function (e, t, n) {
          var a,
              r = t.scalefac;

          for (a = 0; a < t.sfb_lmax; a++) if (16 <= r[a]) return !0;

          for (var s = 0; s < 3; s++) {
            var i = 0,
                o = 0;

            for (a = t.sfb_lmax + s; a < t.sfbdivide; a += 3) i < r[a] && (i = r[a]);

            for (; a < t.sfbmax; a += 3) o < r[a] && (o = r[a]);

            if (!(i < 16 && o < 8)) {
              if (7 <= t.subblock_gain[s]) return !0;
              t.subblock_gain[s]++;
              var _ = e.scalefac_band.l[t.sfb_lmax];

              for (a = t.sfb_lmax + s; a < t.sfbmax; a += 3) {
                var l = t.width[a],
                    f = r[a];
                if (T(0 <= f), 0 <= (f -= 4 >> t.scalefac_scale)) r[a] = f, _ += 3 * l;else {
                  r[a] = 0;
                  var c = 210 + (f << t.scalefac_scale + 1);
                  h = S.IPOW20(c), _ += l * (s + 1);

                  for (var u = -l; u < 0; u++) n[_ + u] *= h, n[_ + u] > t.xrpow_max && (t.xrpow_max = n[_ + u]);

                  _ += l * (3 - s - 1);
                }
              }

              var h = S.IPOW20(202);

              for (_ += t.width[a] * (s + 1), u = -t.width[a]; u < 0; u++) n[_ + u] *= h, n[_ + u] > t.xrpow_max && (t.xrpow_max = n[_ + u]);
            }
          }

          return !1;
        }(s, t, a) || o(t))), i || (i = 2 == s.mode_gr ? y.scale_bitcount(t) : y.scale_bitcount_lsf(s, t)), i));
      }

      this.setModules = function (e, t, n, a) {
        m = e, g = t, this.rv = t, S = n, this.qupvt = n, y = a, r.setModules(S, y);
      }, this.ms_convert = function (e, t) {
        for (var n = 0; n < 576; ++n) {
          var a = e.tt[t][0].xr[n],
              r = e.tt[t][1].xr[n];
          e.tt[t][0].xr[n] = (a + r) * (.5 * i.SQRT2), e.tt[t][1].xr[n] = (a - r) * (.5 * i.SQRT2);
        }
      }, this.init_xrpow = function (e, t, n) {
        var a = 0,
            r = 0 | t.max_nonzero_coeff;

        if (T(null != n), t.xrpow_max = 0, T(0 <= r && r <= 575), b.fill(n, r, 576, 0), 1e-20 < (a = function (e, t, n, a) {
          for (var r = a = 0; r <= n; ++r) {
            var s = Math.abs(e.xr[r]);
            a += s, t[r] = Math.sqrt(s * Math.sqrt(s)), t[r] > e.xrpow_max && (e.xrpow_max = t[r]);
          }

          return a;
        }(t, n, r, a))) {
          var s = 0;
          0 != (2 & e.substep_shaping) && (s = 1);

          for (var i = 0; i < t.psymax; i++) e.pseudohalf[i] = s;

          return !0;
        }

        return b.fill(t.l3_enc, 0, 576, 0), !1;
      }, this.init_outer_loop = function (e, t) {
        t.part2_3_length = 0, t.big_values = 0, t.count1 = 0, t.global_gain = 210, t.scalefac_compress = 0, t.table_select[0] = 0, t.table_select[1] = 0, t.table_select[2] = 0, t.subblock_gain[0] = 0, t.subblock_gain[1] = 0, t.subblock_gain[2] = 0, t.subblock_gain[3] = 0, t.region0_count = 0, t.region1_count = 0, t.preflag = 0, t.scalefac_scale = 0, t.count1table_select = 0, t.part2_length = 0, t.sfb_lmax = L.SBPSY_l, t.sfb_smin = L.SBPSY_s, t.psy_lmax = e.sfb21_extra ? L.SBMAX_l : L.SBPSY_l, t.psymax = t.psy_lmax, t.sfbmax = t.sfb_lmax, t.sfbdivide = 11;

        for (var n = 0; n < L.SBMAX_l; n++) t.width[n] = e.scalefac_band.l[n + 1] - e.scalefac_band.l[n], t.window[n] = 3;

        if (t.block_type == L.SHORT_TYPE) {
          var a = E(576);
          t.sfb_smin = 0, (t.sfb_lmax = 0) != t.mixed_block_flag && (t.sfb_smin = 3, t.sfb_lmax = 2 * e.mode_gr + 4), t.psymax = t.sfb_lmax + 3 * ((e.sfb21_extra ? L.SBMAX_s : L.SBPSY_s) - t.sfb_smin), t.sfbmax = t.sfb_lmax + 3 * (L.SBPSY_s - t.sfb_smin), t.sfbdivide = t.sfbmax - 18, t.psy_lmax = t.sfb_lmax;
          var r = e.scalefac_band.l[t.sfb_lmax];

          for (A.arraycopy(t.xr, 0, a, 0, 576), n = t.sfb_smin; n < L.SBMAX_s; n++) for (var s = e.scalefac_band.s[n], i = e.scalefac_band.s[n + 1], o = 0; o < 3; o++) for (var _ = s; _ < i; _++) t.xr[r++] = a[3 * _ + o];

          var l = t.sfb_lmax;

          for (n = t.sfb_smin; n < L.SBMAX_s; n++) t.width[l] = t.width[l + 1] = t.width[l + 2] = e.scalefac_band.s[n + 1] - e.scalefac_band.s[n], t.window[l] = 0, t.window[l + 1] = 1, t.window[l + 2] = 2, l += 3;
        }

        t.count1bits = 0, t.sfb_partition_table = S.nr_of_sfb_block[0][0], t.slen[0] = 0, t.slen[1] = 0, t.slen[2] = 0, t.slen[3] = 0, t.max_nonzero_coeff = 575, b.fill(t.scalefac, 0), function (e, t) {
          var n = e.ATH,
              a = t.xr;
          if (t.block_type != L.SHORT_TYPE) for (var r = !1, s = L.PSFB21 - 1; 0 <= s && !r; s--) {
            var i = e.scalefac_band.psfb21[s],
                o = e.scalefac_band.psfb21[s + 1],
                _ = S.athAdjust(n.adjust, n.psfb21[s], n.floor);

            1e-12 < e.nsPsy.longfact[21] && (_ *= e.nsPsy.longfact[21]);

            for (var l = o - 1; i <= l; l--) {
              if (!(Math.abs(a[l]) < _)) {
                r = !0;
                break;
              }

              a[l] = 0;
            }
          } else for (var f = 0; f < 3; f++) for (r = !1, s = L.PSFB12 - 1; 0 <= s && !r; s--) {
            o = (i = 3 * e.scalefac_band.s[12] + (e.scalefac_band.s[13] - e.scalefac_band.s[12]) * f + (e.scalefac_band.psfb12[s] - e.scalefac_band.psfb12[0])) + (e.scalefac_band.psfb12[s + 1] - e.scalefac_band.psfb12[s]);
            var c = S.athAdjust(n.adjust, n.psfb12[s], n.floor);

            for (1e-12 < e.nsPsy.shortfact[12] && (c *= e.nsPsy.shortfact[12]), l = o - 1; i <= l; l--) {
              if (!(Math.abs(a[l]) < c)) {
                r = !0;
                break;
              }

              a[l] = 0;
            }
          }
        }(e, t);
      }, M.BINSEARCH_NONE = new M(0), M.BINSEARCH_UP = new M(1), M.BINSEARCH_DOWN = new M(2), this.trancate_smallspectrums = function (e, t, n, a) {
        var r = E(V.SFBMAX);

        if ((0 != (4 & e.substep_shaping) || t.block_type != L.SHORT_TYPE) && 0 == (128 & e.substep_shaping)) {
          S.calc_noise(t, n, r, new k(), null);

          for (var s = 0; s < 576; s++) {
            var i = 0;
            0 != t.l3_enc[s] && (i = Math.abs(t.xr[s])), a[s] = i;
          }

          s = 0;
          var o = 8;
          t.block_type == L.SHORT_TYPE && (o = 6);

          do {
            var _,
                l,
                f,
                c,
                u = t.width[o];

            if (s += u, !(1 <= r[o] || (b.sort(a, s - u, u), BitStream.EQ(a[s - 1], 0)))) {
              _ = (1 - r[o]) * n[o], c = l = 0;

              do {
                var h;

                for (f = 1; c + f < u && !BitStream.NEQ(a[c + s - u], a[c + s + f - u]); f++);

                if (_ < (h = a[c + s - u] * a[c + s - u] * f)) {
                  0 != c && (l = a[c + s - u - 1]);
                  break;
                }

                _ -= h, c += f;
              } while (c < u);

              if (!BitStream.EQ(l, 0)) for (; Math.abs(t.xr[s - u]) <= l && (t.l3_enc[s - u] = 0), 0 < --u;);
            }
          } while (++o < t.psymax);

          t.part2_3_length = y.noquant_count_bits(e, t, null);
        }
      }, this.outer_loop = function (e, t, n, a, r, s) {
        var i = e.internal_flags,
            o = new I(),
            _ = E(576),
            l = E(V.SFBMAX),
            f = new k(),
            c = new P(),
            u = 9999999,
            h = !1,
            p = !1,
            d = 0;

        if (function (e, t, n, a, r) {
          var s,
              i = e.CurrentStep[a],
              o = !1,
              _ = e.OldValue[a],
              l = M.BINSEARCH_NONE;

          for (t.global_gain = _, n -= t.part2_length, T(0 != i);;) {
            var f;
            if (s = y.count_bits(e, r, t, null), 1 == i || s == n) break;
            f = n < s ? (l == M.BINSEARCH_DOWN && (o = !0), o && (i /= 2), l = M.BINSEARCH_UP, i) : (l == M.BINSEARCH_UP && (o = !0), o && (i /= 2), l = M.BINSEARCH_DOWN, -i), t.global_gain += f, t.global_gain < 0 && (o = !(t.global_gain = 0)), 255 < t.global_gain && (t.global_gain = 255, o = !0);
          }

          for (T(0 <= t.global_gain), T(t.global_gain < 256); n < s && t.global_gain < 255;) t.global_gain++, s = y.count_bits(e, r, t, null);

          e.CurrentStep[a] = 4 <= _ - t.global_gain ? 4 : 2, e.OldValue[a] = t.global_gain, t.part2_3_length = s;
        }(i, t, s, r, a), 0 == i.noise_shaping) return 100;
        S.calc_noise(t, n, l, f, c), f.bits = t.part2_3_length, o.assign(t);
        var b = 0;

        for (A.arraycopy(a, 0, _, 0, 576); !h;) {
          do {
            var m,
                v = new k(),
                g = 255;

            if (m = 0 != (2 & i.substep_shaping) ? 20 : 3, i.sfb21_extra) {
              if (1 < l[o.sfbmax]) break;
              if (o.block_type == L.SHORT_TYPE && (1 < l[o.sfbmax + 1] || 1 < l[o.sfbmax + 2])) break;
            }

            if (!R(e, o, l, a, p)) break;
            0 != o.scalefac_scale && (g = 254);
            var w = s - o.part2_length;
            if (w <= 0) break;

            for (; (o.part2_3_length = y.count_bits(i, a, o, c)) > w && o.global_gain <= g;) o.global_gain++;

            if (o.global_gain > g) break;

            if (0 == f.over_count) {
              for (; (o.part2_3_length = y.count_bits(i, a, o, c)) > u && o.global_gain <= g;) o.global_gain++;

              if (o.global_gain > g) break;
            }

            if (S.calc_noise(o, n, l, v, c), v.bits = o.part2_3_length, 0 != (x(t.block_type != L.SHORT_TYPE ? e.quant_comp : e.quant_comp_short, f, v, o, l) ? 1 : 0)) u = t.part2_3_length, f = v, t.assign(o), b = 0, A.arraycopy(a, 0, _, 0, 576);else if (0 == i.full_outer_loop) {
              if (++b > m && 0 == f.over_count) break;
              if (3 == i.noise_shaping_amp && p && 30 < b) break;
              if (3 == i.noise_shaping_amp && p && 15 < o.global_gain - d) break;
            }
          } while (o.global_gain + o.scalefac_scale < 255);

          3 == i.noise_shaping_amp ? p ? h = !0 : (o.assign(t), A.arraycopy(_, 0, a, 0, 576), b = 0, d = o.global_gain, p = !0) : h = !0;
        }

        return T(t.global_gain + t.scalefac_scale <= 255), e.VBR == B.vbr_rh || e.VBR == B.vbr_mtrh ? A.arraycopy(_, 0, a, 0, 576) : 0 != (1 & i.substep_shaping) && trancate_smallspectrums(i, t, n, a), f.over_count;
      }, this.iteration_finish_one = function (e, t, n) {
        var a = e.l3_side,
            r = a.tt[t][n];
        y.best_scalefac_store(e, t, n, a), 1 == e.use_best_huffman && y.best_huffman_divide(e, r), g.ResvAdjust(e, r);
      }, this.VBR_encode_granule = function (e, t, n, a, r, s, i) {
        var o,
            _ = e.internal_flags,
            l = new I(),
            f = E(576),
            c = i,
            u = i + 1,
            h = (i + s) / 2,
            p = 0,
            d = _.sfb21_extra;

        for (T(c <= LameInternalFlags.MAX_BITS_PER_CHANNEL), b.fill(l.l3_enc, 0); T(s <= h), T(h <= i), T(s <= i), _.sfb21_extra = !(c - 42 < h) && d, outer_loop(e, t, n, a, r, h) <= 0 ? (p = 1, u = t.part2_3_length, l.assign(t), A.arraycopy(a, 0, f, 0, 576), o = (i = u - 32) - s, h = (i + s) / 2) : (o = i - (s = h + 32), h = (i + s) / 2, 0 != p && (p = 2, t.assign(l), A.arraycopy(f, 0, a, 0, 576))), 12 < o;);

        _.sfb21_extra = d, 2 == p && A.arraycopy(l.l3_enc, 0, t.l3_enc, 0, 576), T(t.part2_3_length <= c);
      }, this.get_framebits = function (e, t) {
        var n = e.internal_flags;
        n.bitrate_index = n.VBR_min_bitrate;
        var a = m.getframebits(e);
        n.bitrate_index = 1, a = m.getframebits(e);

        for (var r = 1; r <= n.VBR_max_bitrate; r++) {
          n.bitrate_index = r;
          var s = new MeanBits(a);
          t[r] = g.ResvFrameBegin(e, s), a = s.bits;
        }
      }, this.VBR_old_prepare = function (e, t, n, a, r, s, i, o, _) {
        var l,
            f = e.internal_flags,
            c = 0,
            u = 1,
            h = 0;
        f.bitrate_index = f.VBR_max_bitrate;
        var p = g.ResvFrameBegin(e, new MeanBits(0)) / f.mode_gr;
        get_framebits(e, s);

        for (var d = 0; d < f.mode_gr; d++) {
          var b = S.on_pe(e, t, o[d], p, d, 0);
          f.mode_ext == L.MPG_MD_MS_LR && (ms_convert(f.l3_side, d), S.reduce_side(o[d], n[d], p, b));

          for (var m = 0; m < f.channels_out; ++m) {
            var v = f.l3_side.tt[d][m];
            l = v.block_type != L.SHORT_TYPE ? (c = 1.28 / (1 + Math.exp(3.5 - t[d][m] / 300)) - .05, f.PSY.mask_adjust - c) : (c = 2.56 / (1 + Math.exp(3.5 - t[d][m] / 300)) - .14, f.PSY.mask_adjust_short - c), f.masking_lower = Math.pow(10, .1 * l), init_outer_loop(f, v), _[d][m] = S.calc_xmin(e, a[d][m], v, r[d][m]), 0 != _[d][m] && (u = 0), i[d][m] = 126, h += o[d][m];
          }
        }

        for (d = 0; d < f.mode_gr; d++) for (m = 0; m < f.channels_out; m++) h > s[f.VBR_max_bitrate] && (o[d][m] *= s[f.VBR_max_bitrate], o[d][m] /= h), i[d][m] > o[d][m] && (i[d][m] = o[d][m]);

        return u;
      }, this.bitpressure_strategy = function (e, t, n, a) {
        for (var r = 0; r < e.mode_gr; r++) for (var s = 0; s < e.channels_out; s++) {
          for (var i = e.l3_side.tt[r][s], o = t[r][s], _ = 0, l = 0; l < i.psy_lmax; l++) o[_++] *= 1 + .029 * l * l / L.SBMAX_l / L.SBMAX_l;

          if (i.block_type == L.SHORT_TYPE) for (l = i.sfb_smin; l < L.SBMAX_s; l++) o[_++] *= 1 + .029 * l * l / L.SBMAX_s / L.SBMAX_s, o[_++] *= 1 + .029 * l * l / L.SBMAX_s / L.SBMAX_s, o[_++] *= 1 + .029 * l * l / L.SBMAX_s / L.SBMAX_s;
          a[r][s] = 0 | Math.max(n[r][s], .9 * a[r][s]);
        }
      }, this.VBR_new_prepare = function (e, t, n, a, r, s) {
        var i,
            o = e.internal_flags,
            _ = 1,
            l = 0,
            f = 0;
        if (e.free_format) o.bitrate_index = 0, c = new MeanBits(l), i = g.ResvFrameBegin(e, c), l = c.bits, r[0] = i;else {
          o.bitrate_index = o.VBR_max_bitrate;
          var c = new MeanBits(l);
          g.ResvFrameBegin(e, c), l = c.bits, get_framebits(e, r), i = r[o.VBR_max_bitrate];
        }

        for (var u = 0; u < o.mode_gr; u++) {
          S.on_pe(e, t, s[u], l, u, 0), o.mode_ext == L.MPG_MD_MS_LR && ms_convert(o.l3_side, u);

          for (var h = 0; h < o.channels_out; ++h) {
            var p = o.l3_side.tt[u][h];
            o.masking_lower = Math.pow(10, .1 * o.PSY.mask_adjust), init_outer_loop(o, p), 0 != S.calc_xmin(e, n[u][h], p, a[u][h]) && (_ = 0), f += s[u][h];
          }
        }

        for (u = 0; u < o.mode_gr; u++) for (h = 0; h < o.channels_out; h++) i < f && (s[u][h] *= i, s[u][h] /= f);

        return _;
      }, this.calc_target_bits = function (e, t, n, a, r, s) {
        var i,
            o,
            _,
            l,
            f = e.internal_flags,
            c = f.l3_side,
            u = 0;

        f.bitrate_index = f.VBR_max_bitrate;
        var h = new MeanBits(u);

        for (s[0] = g.ResvFrameBegin(e, h), u = h.bits, f.bitrate_index = 1, u = m.getframebits(e) - 8 * f.sideinfo_len, r[0] = u / (f.mode_gr * f.channels_out), u = e.VBR_mean_bitrate_kbps * e.framesize * 1e3, 0 != (1 & f.substep_shaping) && (u *= 1.09), u /= e.out_samplerate, u -= 8 * f.sideinfo_len, u /= f.mode_gr * f.channels_out, (i = .93 + .07 * (11 - e.compression_ratio) / 5.5) < .9 && (i = .9), 1 < i && (i = 1), o = 0; o < f.mode_gr; o++) {
          var p = 0;

          for (_ = 0; _ < f.channels_out; _++) {
            if (a[o][_] = int(i * u), 700 < t[o][_]) {
              var d = int((t[o][_] - 700) / 1.4),
                  b = c.tt[o][_];
              a[o][_] = int(i * u), b.block_type == L.SHORT_TYPE && d < u / 2 && (d = u / 2), 3 * u / 2 < d ? d = 3 * u / 2 : d < 0 && (d = 0), a[o][_] += d;
            }

            a[o][_] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (a[o][_] = LameInternalFlags.MAX_BITS_PER_CHANNEL), p += a[o][_];
          }

          if (p > LameInternalFlags.MAX_BITS_PER_GRANULE) for (_ = 0; _ < f.channels_out; ++_) a[o][_] *= LameInternalFlags.MAX_BITS_PER_GRANULE, a[o][_] /= p;
        }

        if (f.mode_ext == L.MPG_MD_MS_LR) for (o = 0; o < f.mode_gr; o++) S.reduce_side(a[o], n[o], u * f.channels_out, LameInternalFlags.MAX_BITS_PER_GRANULE);

        for (o = l = 0; o < f.mode_gr; o++) for (_ = 0; _ < f.channels_out; _++) a[o][_] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (a[o][_] = LameInternalFlags.MAX_BITS_PER_CHANNEL), l += a[o][_];

        if (l > s[0]) for (o = 0; o < f.mode_gr; o++) for (_ = 0; _ < f.channels_out; _++) a[o][_] *= s[0], a[o][_] /= l;
      };
    };
  }, function (e, t) {
    e.exports = function () {
      this.setModules = function (e, t) {};
    };
  }, function (e, t) {
    e.exports = function () {
      this.over_noise = 0, this.tot_noise = 0, this.max_noise = 0, this.over_count = 0, this.over_SSD = 0, this.bits = 0;
    };
  }, function (e, t, n) {
    var a = n(0),
        r = a.new_float,
        s = a.new_int;
    a.assert;

    e.exports = function () {
      this.global_gain = 0, this.sfb_count1 = 0, this.step = s(39), this.noise = r(39), this.noise_log = r(39);
    };
  }, function (e, t, n) {
    var l = n(0).assert;

    e.exports = function () {
      var _;

      this.setModules = function (e) {
        _ = e;
      }, this.ResvFrameBegin = function (e, t) {
        var n,
            a = e.internal_flags,
            r = a.l3_side,
            s = _.getframebits(e);

        t.bits = (s - 8 * a.sideinfo_len) / a.mode_gr;
        var i = 2048 * a.mode_gr - 8;
        320 < e.brate ? n = 8 * int(1e3 * e.brate / (e.out_samplerate / 1152) / 8 + .5) : (n = 11520, e.strict_ISO && (n = 8 * int(32e4 / (e.out_samplerate / 1152) / 8 + .5))), a.ResvMax = n - s, a.ResvMax > i && (a.ResvMax = i), (a.ResvMax < 0 || e.disable_reservoir) && (a.ResvMax = 0);
        var o = t.bits * a.mode_gr + Math.min(a.ResvSize, a.ResvMax);
        return n < o && (o = n), l(0 == a.ResvMax % 8), l(0 <= a.ResvMax), r.resvDrain_pre = 0, null != a.pinfo && (a.pinfo.mean_bits = t.bits / 2, a.pinfo.resvsize = a.ResvSize), o;
      }, this.ResvMaxBits = function (e, t, n, a) {
        var r,
            s = e.internal_flags,
            i = s.ResvSize,
            o = s.ResvMax;
        0 != a && (i += t), 0 != (1 & s.substep_shaping) && (o *= .9), n.bits = t, 9 * o < 10 * i ? (r = i - 9 * o / 10, n.bits += r, s.substep_shaping |= 128) : (r = 0, s.substep_shaping &= 127, e.disable_reservoir || 0 != (1 & s.substep_shaping) || (n.bits -= .1 * t));

        var _ = i < 6 * s.ResvMax / 10 ? i : 6 * s.ResvMax / 10;

        return (_ -= r) < 0 && (_ = 0), _;
      }, this.ResvAdjust = function (e, t) {
        e.ResvSize -= t.part2_3_length + t.part2_length;
      }, this.ResvFrameEnd = function (e, t) {
        var n,
            a = e.l3_side;
        e.ResvSize += t * e.mode_gr;
        var r = 0;
        a.resvDrain_post = 0, (a.resvDrain_pre = 0) != (n = e.ResvSize % 8) && (r += n), 0 < (n = e.ResvSize - r - e.ResvMax) && (l(0 == n % 8), l(0 <= n), r += n);
        var s = Math.min(8 * a.main_data_begin, r) / 8;
        a.resvDrain_pre += 8 * s, r -= 8 * s, e.ResvSize -= 8 * s, a.main_data_begin -= s, a.resvDrain_post += r, e.ResvSize -= r;
      };
    };
  }, function (e, t) {
    e.exports = function () {
      this.getLameVersion = function () {
        return "3.98.4";
      }, this.getLameShortVersion = function () {
        return "3.98.4";
      }, this.getLameVeryShortVersion = function () {
        return "LAME3.98r";
      }, this.getPsyVersion = function () {
        return "0.93";
      }, this.getLameUrl = function () {
        return "http://www.mp3dev.org/";
      }, this.getLameOsBitness = function () {
        return "32bits";
      };
    };
  }, function (e, t, n) {
    var a = n(0),
        u = a.System,
        m = a.VbrMode,
        N = (a.Float, a.ShortBlock),
        v = (a.Util, a.Arrays),
        g = (a.new_array_n, a.new_byte),
        r = (a.new_double, a.new_float, a.new_float_n, a.new_int, a.new_int_n, a.assert);

    function s() {
      var i, _, I;

      this.setModules = function (e, t, n) {
        i = e, _ = t, I = n;
      };

      var h = s.NUMTOCENTRIES,
          l = s.MAXFRAMESIZE,
          f = h + 4 + 4 + 4 + 4 + 4 + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2,
          p = "Xing",
          d = "Info",
          n = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];

      function b(e, t) {
        var n = 255 & e[t + 0];
        return n <<= 8, n |= 255 & e[t + 1], n <<= 8, n |= 255 & e[t + 2], n <<= 8, n |= 255 & e[t + 3];
      }

      function V(e, t, n) {
        e[t + 0] = 255 & n >> 24, e[t + 1] = 255 & n >> 16, e[t + 2] = 255 & n >> 8, e[t + 3] = 255 & n;
      }

      function H(e, t, n) {
        e[t + 0] = 255 & n >> 8, e[t + 1] = 255 & n;
      }

      function o(e, t, n) {
        return 255 & (e << t | n & ~(-1 << t));
      }

      function c(e, t) {
        var n = e.internal_flags;
        t[0] = o(t[0], 8, 255), t[1] = o(t[1], 3, 7), t[1] = o(t[1], 1, e.out_samplerate < 16e3 ? 0 : 1), t[1] = o(t[1], 1, e.version), t[1] = o(t[1], 2, 1), t[1] = o(t[1], 1, e.error_protection ? 0 : 1), t[2] = o(t[2], 4, n.bitrate_index), t[2] = o(t[2], 2, n.samplerate_index), t[2] = o(t[2], 1, 0), t[2] = o(t[2], 1, e.extension), t[3] = o(t[3], 2, e.mode.ordinal()), t[3] = o(t[3], 2, n.mode_ext), t[3] = o(t[3], 1, e.copyright), t[3] = o(t[3], 1, e.original), t[3] = o(t[3], 2, e.emphasis), t[0] = 255;
        var a,
            r,
            s = 241 & t[1];
        a = 1 == e.version ? 128 : e.out_samplerate < 16e3 ? 32 : 64, e.VBR == m.vbr_off && (a = e.brate), r = e.free_format ? 0 : 255 & 16 * i.BitrateIndex(a, e.version, e.out_samplerate), s = (1 == e.version ? t[1] = 255 & (10 | s) : t[1] = 255 & (2 | s), 13 & t[2]), t[2] = 255 & (r | s);
      }

      function O(e, t) {
        return t = t >> 8 ^ n[255 & (t ^ e)];
      }

      this.addVbrFrame = function (e) {
        var t = e.internal_flags,
            n = Tables.bitrate_table[e.version][t.bitrate_index];
        r(null != t.VBR_seek_table.bag), function (e, t) {
          if (e.nVbrNumFrames++, e.sum += t, e.seen++, !(e.seen < e.want) && (e.pos < e.size && (e.bag[e.pos] = e.sum, e.pos++, e.seen = 0), e.pos == e.size)) {
            for (var n = 1; n < e.size; n += 2) e.bag[n / 2] = e.bag[n];

            e.want *= 2, e.pos /= 2;
          }
        }(t.VBR_seek_table, n);
      }, this.getVbrTag = function (e) {
        var t = new VBRTagData(),
            n = 0;
        t.flags = 0;

        var a,
            r,
            s = e[n + 1] >> 3 & 1,
            i = e[n + 2] >> 2 & 3,
            o = e[n + 3] >> 6 & 3,
            _ = e[n + 2] >> 4 & 15;

        if (_ = Tables.bitrate_table[s][_], e[n + 1] >> 4 == 14 ? t.samprate = Tables.samplerate_table[2][i] : t.samprate = Tables.samplerate_table[s][i], a = e, r = n += 0 != s ? 3 != o ? 36 : 21 : 3 != o ? 21 : 13, !new String(a, r, p.length(), null).equals(p) && !new String(a, r, d.length(), null).equals(d)) return null;
        n += 4, t.hId = s;
        var l = t.flags = b(e, n);

        if (n += 4, 0 != (1 & l) && (t.frames = b(e, n), n += 4), 0 != (2 & l) && (t.bytes = b(e, n), n += 4), 0 != (4 & l)) {
          if (null != t.toc) for (var f = 0; f < h; f++) t.toc[f] = e[n + f];
          n += h;
        }

        t.vbrScale = -1, 0 != (8 & l) && (t.vbrScale = b(e, n), n += 4), t.headersize = 72e3 * (s + 1) * _ / t.samprate;
        var c = e[(n += 21) + 0] << 4;
        c += e[n + 1] >> 4;
        var u = (15 & e[n + 1]) << 8;
        return (c < 0 || 3e3 < c) && (c = -1), ((u += 255 & e[n + 2]) < 0 || 3e3 < u) && (u = -1), t.encDelay = c, t.encPadding = u, t;
      }, this.InitVbrTag = function (e) {
        var t,
            n = e.internal_flags;
        t = 1 == e.version ? 128 : e.out_samplerate < 16e3 ? 32 : 64, e.VBR == m.vbr_off && (t = e.brate);
        var a = 72e3 * (e.version + 1) * t / e.out_samplerate,
            r = n.sideinfo_len + f;
        if ((n.VBR_seek_table.TotalFrameSize = a) < r || l < a) e.bWriteVbrTag = !1;else {
          n.VBR_seek_table.nVbrNumFrames = 0, n.VBR_seek_table.nBytesWritten = 0, n.VBR_seek_table.sum = 0, n.VBR_seek_table.seen = 0, n.VBR_seek_table.want = 1, n.VBR_seek_table.pos = 0, null == n.VBR_seek_table.bag && (n.VBR_seek_table.bag = new int[400](), n.VBR_seek_table.size = 400);
          var s = g(l);
          c(e, s);

          for (var i = n.VBR_seek_table.TotalFrameSize, o = 0; o < i; ++o) _.add_dummy_byte(e, 255 & s[o], 1);
        }
      }, this.updateMusicCRC = function (e, t, n, a) {
        for (var r = 0; r < a; ++r) e[0] = O(t[n + r], e[0]);
      }, this.getLameTagFrame = function (e, t) {
        var n = e.internal_flags;
        if (!e.bWriteVbrTag) return 0;
        if (n.Class_ID != Lame.LAME_ID) return 0;
        if (n.VBR_seek_table.pos <= 0) return 0;
        if (t.length < n.VBR_seek_table.TotalFrameSize) return n.VBR_seek_table.TotalFrameSize;
        v.fill(t, 0, n.VBR_seek_table.TotalFrameSize, 0), c(e, t);
        var a = g(h);
        if (e.free_format) for (var r = 1; r < h; ++r) a[r] = 255 & 255 * r / 100;else !function (e, t) {
          if (!(e.pos <= 0)) for (var n = 1; n < h; ++n) {
            var a = n / h,
                r = 0 | Math.floor(a * e.pos);
            r > e.pos - 1 && (r = e.pos - 1);
            var s = 0 | 256 * e.bag[r] / e.sum;
            255 < s && (s = 255), t[n] = 255 & s;
          }
        }(n.VBR_seek_table, a);
        var s = n.sideinfo_len;
        e.error_protection && (s -= 2), e.VBR == m.vbr_off ? (t[s++] = 255 & d.charAt(0), t[s++] = 255 & d.charAt(1), t[s++] = 255 & d.charAt(2), t[s++] = 255 & d.charAt(3)) : (t[s++] = 255 & p.charAt(0), t[s++] = 255 & p.charAt(1), t[s++] = 255 & p.charAt(2), t[s++] = 255 & p.charAt(3)), V(t, s, 15), V(t, s += 4, n.VBR_seek_table.nVbrNumFrames), s += 4;
        var i = n.VBR_seek_table.nBytesWritten + n.VBR_seek_table.TotalFrameSize;
        V(t, s, 0 | i), s += 4, u.arraycopy(a, 0, t, s, a.length), s += a.length, e.error_protection && _.CRC_writeheader(n, t);
        var o = 0;

        for (r = 0; r < s; r++) o = O(t[r], o);

        return s += function (e, t, n, a, r) {
          var s,
              i,
              o,
              _,
              l,
              f = e.internal_flags,
              c = 0,
              u = e.encoder_delay,
              h = e.encoder_padding,
              p = 100 - 10 * e.VBR_q - e.quality,
              d = I.getLameVeryShortVersion(),
              b = [1, 5, 3, 2, 4, 0, 3],
              m = 0 | (255 < e.lowpassfreq / 100 + .5 ? 255 : e.lowpassfreq / 100 + .5),
              v = 0,
              g = 0,
              w = e.internal_flags.noise_shaping,
              S = 0,
              y = 0,
              M = 0,
              x = 0 != (1 & e.exp_nspsytune),
              R = 0 != (2 & e.exp_nspsytune),
              A = !1,
              B = !1,
              E = e.internal_flags.nogap_total,
              T = e.internal_flags.nogap_current,
              k = e.ATHtype;

          switch (e.VBR) {
            case vbr_abr:
              l = e.VBR_mean_bitrate_kbps;
              break;

            case vbr_off:
              l = e.brate;
              break;

            default:
              l = e.VBR_min_bitrate_kbps;
          }

          switch (s = 0 + (e.VBR.ordinal() < b.length ? b[e.VBR.ordinal()] : 0), f.findReplayGain && (510 < f.RadioGain && (f.RadioGain = 510), f.RadioGain < -510 && (f.RadioGain = -510), g = 8192, g |= 3072, 0 <= f.RadioGain ? g |= f.RadioGain : (g |= 512, g |= -f.RadioGain)), f.findPeakSample && (v = Math.abs(0 | f.PeakSample / 32767 * Math.pow(2, 23) + .5)), -1 != E && (0 < T && (B = !0), T < E - 1 && (A = !0)), _ = k + ((x ? 1 : 0) << 4) + ((R ? 1 : 0) << 5) + ((A ? 1 : 0) << 6) + ((B ? 1 : 0) << 7), p < 0 && (p = 0), e.mode) {
            case MONO:
              S = 0;
              break;

            case STEREO:
              S = 1;
              break;

            case DUAL_CHANNEL:
              S = 2;
              break;

            case JOINT_STEREO:
              S = e.force_ms ? 4 : 3;
              break;

            case NOT_SET:
            default:
              S = 7;
          }

          M = e.in_samplerate <= 32e3 ? 0 : 48e3 == e.in_samplerate ? 2 : 48e3 < e.in_samplerate ? 3 : 1, (e.short_blocks == N.short_block_forced || e.short_blocks == N.short_block_dispensed || -1 == e.lowpassfreq && -1 == e.highpassfreq || e.scale_left < e.scale_right || e.scale_left > e.scale_right || e.disable_reservoir && e.brate < 320 || e.noATH || e.ATHonly || 0 == k || e.in_samplerate <= 32e3) && (y = 1), i = w + (S << 2) + (y << 5) + (M << 6), o = f.nMusicCRC, V(n, a + c, p), c += 4;

          for (var P = 0; P < 9; P++) n[a + c + P] = 255 & d.charAt(P);

          n[a + (c += 9)] = 255 & s, n[a + ++c] = 255 & m, V(n, a + ++c, v), H(n, a + (c += 4), g), H(n, a + (c += 2), 0), n[a + (c += 2)] = 255 & _, n[a + ++c] = 255 <= l ? 255 : 255 & l, n[a + ++c] = 255 & u >> 4, n[a + c + 1] = 255 & (u << 4) + (h >> 8), n[a + c + 2] = 255 & h, n[a + (c += 3)] = 255 & i, c++, n[a + c++] = 0, H(n, a + c, e.preset), V(n, a + (c += 2), t), H(n, a + (c += 4), o), c += 2;

          for (var L = 0; L < c; L++) r = O(n[a + L], r);

          return H(n, a + c, r), c += 2;
        }(e, i, t, s, o), n.VBR_seek_table.TotalFrameSize;
      }, this.putVbrTag = function (e, t) {
        if (e.internal_flags.VBR_seek_table.pos <= 0) return -1;
        if (t.seek(t.length()), 0 == t.length()) return -1;

        var n = function (e) {
          e.seek(0);
          var t = g(10);
          return e.readFully(t), new String(t, "ISO-8859-1").startsWith("ID3") ? 0 : ((127 & t[6]) << 21 | (127 & t[7]) << 14 | (127 & t[8]) << 7 | 127 & t[9]) + t.length;
        }(t);

        t.seek(n);
        var a = g(l),
            r = getLameTagFrame(e, a);
        return r > a.length ? -1 : (r < 1 || t.write(a, 0, r), 0);
      };
    }

    s.NUMTOCENTRIES = 100, s.MAXFRAMESIZE = 2880, e.exports = s;
  }, function (e, t, n) {
    var a = n(48);
    "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals);
    (0, n(3).default)("5b0bec03", a, !1, {});
  }, function (e, t, n) {
    (e.exports = n(2)(!1)).push([e.i, "\n.ar-icon {\n  fill: #747474;\n  border-radius: 50%;\n  border: 1px solid #05CBCD;\n  background-color: #FFFFFF;\n  padding: 5px;\n  cursor: pointer;\n  transition: .2s;\n}\n.ar-icon--no-border {\n    border: 0;\n    border-radius: 0;\n    padding: 0;\n}\n.ar-icon--rec {\n    fill: white;\n    background-color: #FF6B64;\n    border-color: transparent;\n}\n.ar-icon--pulse {\n    animation: ripple .5s linear infinite;\n}\n@keyframes ripple {\n0% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 1px rgba(255, 0, 0, 0.1), 0 0 0 5px rgba(255, 0, 0, 0.1);\n}\n100% {\n    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 10px rgba(255, 0, 0, 0.1), 0 0 0 20px rgba(255, 0, 0, 0);\n}\n}\n.ar-icon__xs {\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n}\n.ar-icon__sm {\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n}\n.ar-icon__lg {\n    width: 45px;\n    height: 45px;\n    line-height: 45px;\n    box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);\n}\n", ""]);
  }, function (e, t, n) {
    "use strict";

    n.r(t);

    var a = {
      props: {
        name: {
          type: String
        }
      },
      data: function () {
        return {
          icons: {
            download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>',
            mic: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
            pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
            play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
            save: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
            stop: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>',
            volume: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
          }
        };
      }
    },
        r = function () {
      var e = this,
          t = e.$createElement;
      return (e._self._c || t)("div", {
        domProps: {
          innerHTML: e._s(e.icons[e.name])
        }
      });
    };

    function s(e, t, n, a, r, s, i, o) {
      var _ = typeof (e = e || {}).default;

      "object" !== _ && "function" !== _ || (e = e.default);
      var l,
          f = "function" == typeof e ? e.options : e;
      if (t && (f.render = t, f.staticRenderFns = n, f._compiled = !0), a && (f.functional = !0), s && (f._scopeId = s), i ? (l = function (e) {
        (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(i);
      }, f._ssrRegister = l) : r && (l = o ? function () {
        r.call(this, this.$root.$options.shadowRoot);
      } : r), l) if (f.functional) {
        f._injectStyles = l;
        var c = f.render;

        f.render = function (e, t) {
          return l.call(t), c(e, t);
        };
      } else {
        var u = f.beforeCreate;
        f.beforeCreate = u ? [].concat(u, l) : [l];
      }
      return {
        exports: e,
        options: f
      };
    }

    r._withStripped = !0;
    var i = s(a, r, [], !1, null, null, null);
    i.options.__file = "src/components/icon-button.vue";
    var o = i.exports;

    function _(e, t) {
      var n = t.getBoundingClientRect().width,
          a = e.target.getBoundingClientRect().left,
          r = (e.clientX - a) / n;

      try {
        if (!e.target.className.match(/^ar\-line\-control/)) return;
      } catch (e) {
        return;
      }

      return r = 1 < (r = r < 0 ? 0 : r) ? 1 : r;
    }

    function l(e) {
      return new Date(1e3 * e).toISOString().substr(14, 5);
    }

    var f = {
      props: {
        refId: {
          type: String
        },
        eventName: {
          type: String
        },
        percentage: {
          type: Number,
          default: 0
        },
        rowDirection: {
          type: Boolean,
          default: !0
        }
      },
      methods: {
        onMouseDown: function (e) {
          var t = _(e, this.$refs[this.refId]);

          this.$emit("change-linehead", t), document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp);
        },
        onMouseUp: function (e) {
          document.removeEventListener("mouseup", this.onMouseUp), document.removeEventListener("mousemove", this.onMouseMove);

          var t = _(e, this.$refs[this.refId]);

          this.$emit("change-linehead", t);
        },
        onMouseMove: function (e) {
          var t = _(e, this.$refs[this.refId]);

          this.$emit("change-linehead", t);
        }
      },
      computed: {
        calculateSize: function () {
          var e = this.percentage < 1 ? 100 * this.percentage : this.percentage;
          return (this.rowDirection ? "width" : "height") + ": " + e + "%";
        }
      }
    },
        c = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        ref: e.refId,
        staticClass: "ar-line-control",
        on: {
          mousedown: e.onMouseDown
        }
      }, [n("div", {
        staticClass: "ar-line-control__head",
        style: e.calculateSize
      })]);
    };

    c._withStripped = !0;
    var u = s(f, c, [], !1, function (e) {
      n(19);
    }, null, null);
    u.options.__file = "src/components/line-control.vue";

    var h = u.exports,
        p = {
      data: function () {
        return {
          volume: .8
        };
      },
      components: {
        IconButton: o,
        LineControl: h
      },
      methods: {
        onChangeLinehead: function (e) {
          this.$emit("change-volume", e), this.volume = e;
        }
      }
    },
        d = function () {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "ar-volume"
      }, [n("icon-button", {
        staticClass: "ar-volume__icon",
        attrs: {
          name: "volume"
        }
      }), e._v(" "), n("line-control", {
        staticClass: "ar-volume-bar",
        attrs: {
          "ref-id": "volume",
          percentage: e.volume
        },
        on: {
          "change-linehead": e.onChangeLinehead
        }
      })], 1);
    };

    d._withStripped = !0;
    var b = s(p, d, [], !1, function (e) {
      n(21);
    }, null, null);
    b.options.__file = "src/components/volume-control.vue";

    var m = b.exports,
        v = {
      props: {
        src: {
          type: String
        },
        record: {
          type: Object
        },
        filename: {
          type: String
        }
      },
      data: function () {
        return {
          isPlaying: !1,
          duration: l(0),
          playedTime: l(0),
          progress: 0
        };
      },
      components: {
        IconButton: o,
        LineControl: h,
        VolumeControl: m
      },
      mounted: function () {
        var t = this;
        this.player = document.getElementById(this.playerUniqId), this.player.addEventListener("ended", function () {
          t.isPlaying = !1;
        }), this.player.addEventListener("loadeddata", function (e) {
          t._resetProgress(), t.duration = l(t.player.duration);
        }), this.player.addEventListener("timeupdate", this._onTimeUpdate), this.$eventBus.$on("remove-record", function () {
          t._resetProgress();
        });
      },
      computed: {
        audioSource: function () {
          var e = this.src || this.record.url;
          if (e) return e;

          this._resetProgress();
        },
        playBtnIcon: function () {
          return this.isPlaying ? "pause" : "play";
        },
        playerUniqId: function () {
          return "audio-player" + this._uid;
        }
      },
      methods: {
        playback: function () {
          var e = this;
          this.audioSource && (this.isPlaying ? this.player.pause() : setTimeout(function () {
            e.player.play();
          }, 0), this.isPlaying = !this.isPlaying);
        },
        _resetProgress: function () {
          this.isPlaying && this.player.pause(), this.duration = l(0), this.playedTime = l(0), this.progress = 0, this.isPlaying = !1;
        },
        _onTimeUpdate: function () {
          this.playedTime = l(this.player.currentTime), this.progress = this.player.currentTime / this.player.duration * 100;
        },
        _onUpdateProgress: function (e) {
          e && (this.player.currentTime = e * this.player.duration);
        },
        _onChangeVolume: function (e) {
          e && (this.player.volume = e);
        }
      }
    },
        g = function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;
      return n("div", {
        staticClass: "ar-player"
      }, [n("div", {
        staticClass: "ar-player-actions"
      }, [n("icon-button", {
        staticClass: "ar-icon ar-icon__lg ar-player__play",
        class: {
          "ar-player__play--active": t.isPlaying
        },
        attrs: {
          id: "play",
          name: t.playBtnIcon
        },
        nativeOn: {
          click: function (e) {
            return t.playback(e);
          }
        }
      })], 1), t._v(" "), n("div", {
        staticClass: "ar-player-bar"
      }, [n("div", {
        staticClass: "ar-player__time"
      }, [t._v(t._s(t.playedTime))]), t._v(" "), n("line-control", {
        staticClass: "ar-player__progress",
        attrs: {
          "ref-id": "progress",
          percentage: t.progress
        },
        on: {
          "change-linehead": t._onUpdateProgress
        }
      }), t._v(" "), n("div", {
        staticClass: "ar-player__time"
      }, [t._v(t._s(t.duration))]), t._v(" "), n("volume-control", {
        on: {
          "change-volume": t._onChangeVolume
        }
      })], 1), t._v(" "), n("audio", {
        attrs: {
          id: t.playerUniqId,
          src: t.audioSource
        }
      })]);
    };

    g._withStripped = !0;
    var w = s(v, g, [], !1, function (e) {
      n(17);
    }, null, null);
    w.options.__file = "src/components/player.vue";

    var S = w.exports,
        y = {
      props: {
        record: {
          type: Object
        },
        filename: {
          type: String
        }
      },
      components: {
        IconButton: o
      },
      methods: {
        download: function () {
          if (this.record.url) {
            var e = document.createElement("a");
            e.href = this.record.url, e.download = this.filename + ".mp3", e.click();
          }
        }
      }
    },
        M = function () {
      var t = this,
          e = t.$createElement;
      return (t._self._c || e)("icon-button", {
        staticClass: "ar-icon ar-icon__xs ar-icon--no-border",
        attrs: {
          id: "download",
          name: "download"
        },
        nativeOn: {
          click: function (e) {
            return t.download(e);
          }
        }
      });
    };

    M._withStripped = !0;
    var x = s(y, M, [], !1, function (e) {
      n(25);
    }, null, null);
    x.options.__file = "src/components/downloader.vue";

    var R = x.exports,
        A = n(16),
        B = function () {
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
        }
      }

      return function (e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
      };
    }();

    var E = function () {
      function t(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.bitRate = e.bitRate || 128, this.sampleRate = e.sampleRate || 44100, this.dataBuffer = [], this.encoder = new A.Mp3Encoder(1, this.sampleRate, this.bitRate);
      }

      return B(t, [{
        key: "encode",
        value: function (e) {
          for (var t = this._convertBuffer(e), n = t.length, a = 0; 0 <= n; a += 1152) {
            var r = t.subarray(a, a + 1152),
                s = this.encoder.encodeBuffer(r);
            this.dataBuffer.push(new Int8Array(s)), n -= 1152;
          }
        }
      }, {
        key: "finish",
        value: function () {
          this.dataBuffer.push(this.encoder.flush());
          var e = new Blob(this.dataBuffer, {
            type: "audio/mp3"
          });
          return this.dataBuffer = [], {
            id: Date.now(),
            blob: e,
            url: URL.createObjectURL(e)
          };
        }
      }, {
        key: "_floatTo16BitPCM",
        value: function (e, t) {
          for (var n = 0; n < e.length; n++) {
            var a = Math.max(-1, Math.min(1, e[n]));
            t[n] = a < 0 ? 32768 * a : 32767 * a;
          }
        }
      }, {
        key: "_convertBuffer",
        value: function (e) {
          var t = new Float32Array(e),
              n = new Int16Array(e.length);
          return this._floatTo16BitPCM(t, n), n;
        }
      }]), t;
    }(),
        T = function () {
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
        }
      }

      return function (e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
      };
    }();

    var k = function () {
      function t() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.beforeRecording = e.beforeRecording, this.pauseRecording = e.pauseRecording, this.afterRecording = e.afterRecording, this.micFailed = e.micFailed, this.bufferSize = 4096, this.records = [], this.isPause = !1, this.isRecording = !1, this.duration = 0, this.volume = 0, this._duration = 0;
      }

      return T(t, [{
        key: "start",
        value: function () {
          this.beforeRecording && this.beforeRecording("start recording"), navigator.mediaDevices.getUserMedia({
            video: !1,
            audio: {
              channelCount: 1,
              echoCancellation: !1
            }
          }).then(this._micCaptured.bind(this)).catch(this._micError.bind(this)), this.isPause = !1, this.isRecording = !0, this.lameEncoder = new E({});
        }
      }, {
        key: "stop",
        value: function () {
          this.stream.getTracks().forEach(function (e) {
            return e.stop();
          }), this.input.disconnect(), this.processor.disconnect(), this.context.close();
          var e = this.lameEncoder.finish();
          e.duration = l(this.duration), this.records.push(e), this._duration = 0, this.duration = 0, this.isPause = !1, this.isRecording = !1, this.afterRecording && this.afterRecording(e);
        }
      }, {
        key: "pause",
        value: function () {
          this.stream.getTracks().forEach(function (e) {
            return e.stop();
          }), this.input.disconnect(), this.processor.disconnect(), this.context.close(), this._duration = this.duration, this.isPause = !0, this.pauseRecording && this.pauseRecording("pause recording");
        }
      }, {
        key: "recordList",
        value: function () {
          return this.records;
        }
      }, {
        key: "lastRecord",
        value: function () {
          return this.records.slice(-1);
        }
      }, {
        key: "_micCaptured",
        value: function (e) {
          var r = this;
          this.context = new (window.AudioContext || window.webkitAudioContext)(), this.duration = this._duration, this.input = this.context.createMediaStreamSource(e), this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1), this.stream = e, this.processor.onaudioprocess = function (e) {
            var t = e.inputBuffer.getChannelData(0),
                n = 0;
            r.lameEncoder.encode(t);

            for (var a = 0; a < t.length; ++a) n += t[a] * t[a];

            r.duration = parseFloat(r._duration) + parseFloat(r.context.currentTime.toFixed(2)), r.volume = Math.sqrt(n / t.length).toFixed(2);
          }, this.input.connect(this.processor), this.processor.connect(this.context.destination);
        }
      }, {
        key: "_micError",
        value: function (e) {
          this.micFailed && this.micFailed(e);
        }
      }]), t;
    }(),
        P = {
      props: {
        filename: {
          type: String,
          default: "record"
        },
        headers: {
          type: Object,
          default: function () {
            return {};
          }
        },
        uploadUrl: {
          type: String
        }
      }
    },
        L = {
      mixins: [P],
      props: {
        record: {
          type: Object
        }
      },
      components: {
        IconButton: o
      },
      methods: {
        upload: function () {
          var t = this;

          if (this.record.url) {
            this.$eventBus.$emit("start-upload");
            var e = new FormData();
            e.append("audio", this.record.blob, this.filename + ".mp3");
            var n = Object.assign(this.headers, {});
            n["Content-Type"] = "multipart/form-data; boundary=" + e._boundary, this.$http.post(this.uploadUrl, e, {
              headers: n
            }).then(function (e) {
              t.$eventBus.$emit("end-upload", {
                status: "success",
                response: e
              });
            }).catch(function (e) {
              t.$eventBus.$emit("end-upload", {
                status: "fail",
                response: e
              });
            });
          }
        }
      }
    },
        I = function () {
      var t = this,
          e = t.$createElement;
      return (t._self._c || e)("icon-button", {
        staticClass: "ar-icon ar-icon__xs ar-icon--no-border",
        attrs: {
          name: "save"
        },
        nativeOn: {
          click: function (e) {
            return t.upload(e);
          }
        }
      });
    };

    I._withStripped = !0;
    var V = s(L, I, [], !1, function (e) {
      n(47);
    }, null, null);
    V.options.__file = "src/components/uploader.vue";

    var H = V.exports,
        O = {
      mixins: [P],
      props: {
        attempts: {
          type: Number
        },
        time: {
          type: Number
        },
        showDownloadButton: {
          type: Boolean,
          default: !0
        },
        showUploadButton: {
          type: Boolean,
          default: !0
        },
        micFailed: {
          type: Function
        },
        beforeRecording: {
          type: Function
        },
        pauseRecording: {
          type: Function
        },
        afterRecording: {
          type: Function
        },
        failedUpload: {
          type: Function
        },
        beforeUpload: {
          type: Function
        },
        successfulUpload: {
          type: Function
        },
        selectRecord: {
          type: Function
        }
      },
      data: function () {
        return {
          isUploading: !1,
          recorder: this._initRecorder(),
          recordList: [],
          selected: {},
          uploadStatus: null
        };
      },
      components: {
        AudioPlayer: S,
        Downloader: R,
        IconButton: o,
        Uploader: H
      },
      mounted: function () {
        var t = this;
        this.$eventBus.$on("start-upload", function () {
          t.isUploading = !0, t.beforeUpload && t.beforeUpload("before upload");
        }), this.$eventBus.$on("end-upload", function (e) {
          t.isUploading = !1, "success" === e.status ? t.successfulUpload && t.successfulUpload(e.response) : t.failedUpload && t.failedUpload(e.response);
        });
      },
      beforeDestroy: function () {
        this.stopRecorder();
      },
      methods: {
        toggleRecorder: function () {
          this.attempts && this.recorder.records.length >= this.attempts || (!this.isRecording || this.isRecording && this.isPause ? this.recorder.start() : this.recorder.pause());
        },
        stopRecorder: function () {
          this.isRecording && (this.recorder.stop(), this.recordList = this.recorder.recordList());
        },
        removeRecord: function (e) {
          this.recordList.splice(e, 1), this.$set(this.selected, "url", null), this.$eventBus.$emit("remove-record");
        },
        choiceRecord: function (e) {
          this.selected !== e && (this.selected = e, this.selectRecord && this.selectRecord(e));
        },
        _initRecorder: function () {
          return new k({
            beforeRecording: this.beforeRecording,
            afterRecording: this.afterRecording,
            pauseRecording: this.pauseRecording,
            micFailed: this.micFailed
          });
        }
      },
      computed: {
        attemptsLeft: function () {
          return this.attempts - this.recordList.length;
        },
        iconButtonType: function () {
          return this.isRecording && this.isPause ? "mic" : this.isRecording ? "pause" : "mic";
        },
        isPause: function () {
          return this.recorder.isPause;
        },
        isRecording: function () {
          return this.recorder.isRecording;
        },
        recordedTime: function () {
          return this.time && this.recorder.duration >= 60 * this.time && this.stopRecorder(), l(this.recorder.duration);
        },
        volume: function () {
          return parseFloat(this.recorder.volume);
        }
      }
    },
        N = function () {
      var a = this,
          e = a.$createElement,
          r = a._self._c || e;
      return r("div", {
        staticClass: "ar"
      }, [a.isUploading ? r("div", {
        staticClass: "ar__overlay"
      }) : a._e(), a._v(" "), a.isUploading ? r("div", {
        staticClass: "ar-spinner"
      }, [r("div", {
        staticClass: "ar-spinner__dot"
      }), a._v(" "), r("div", {
        staticClass: "ar-spinner__dot"
      }), a._v(" "), r("div", {
        staticClass: "ar-spinner__dot"
      })]) : a._e(), a._v(" "), r("div", {
        staticClass: "ar-content",
        class: {
          ar__blur: a.isUploading
        }
      }, [r("div", {
        staticClass: "ar-recorder"
      }, [r("icon-button", {
        staticClass: "ar-icon ar-icon__lg",
        class: {
          "ar-icon--rec": a.isRecording,
          "ar-icon--pulse": a.isRecording && .02 < a.volume
        },
        attrs: {
          name: a.iconButtonType
        },
        nativeOn: {
          click: function (e) {
            return a.toggleRecorder(e);
          }
        }
      }), a._v(" "), r("icon-button", {
        staticClass: "ar-icon ar-icon__sm ar-recorder__stop",
        attrs: {
          name: "stop"
        },
        nativeOn: {
          click: function (e) {
            return a.stopRecorder(e);
          }
        }
      })], 1), a._v(" "), a.attempts ? r("div", {
        staticClass: "ar-recorder__records-limit"
      }, [a._v("Attempts: " + a._s(a.attemptsLeft) + "/" + a._s(a.attempts))]) : a._e(), a._v(" "), r("div", {
        staticClass: "ar-recorder__duration"
      }, [a._v(a._s(a.recordedTime))]), a._v(" "), a.time ? r("div", {
        staticClass: "ar-recorder__time-limit"
      }, [a._v("Record duration is limited: " + a._s(a.time) + "m")]) : a._e(), a._v(" "), r("div", {
        staticClass: "ar-records"
      }, a._l(a.recordList, function (t, n) {
        return r("div", {
          key: t.id,
          staticClass: "ar-records__record",
          class: {
            "ar-records__record--selected": t.id === a.selected.id
          },
          on: {
            click: function (e) {
              a.choiceRecord(t);
            }
          }
        }, [t.id === a.selected.id ? r("div", {
          staticClass: "ar__rm",
          on: {
            click: function (e) {
              a.removeRecord(n);
            }
          }
        }, [a._v("×")]) : a._e(), a._v(" "), r("div", {
          staticClass: "ar__text"
        }, [a._v("Record " + a._s(n + 1))]), a._v(" "), r("div", {
          staticClass: "ar__text"
        }, [a._v(a._s(t.duration))]), a._v(" "), t.id === a.selected.id && a.showDownloadButton ? r("downloader", {
          staticClass: "ar__downloader",
          attrs: {
            record: t,
            filename: a.filename
          }
        }) : a._e(), a._v(" "), t.id === a.selected.id && a.showUploadButton ? r("uploader", {
          staticClass: "ar__uploader",
          attrs: {
            record: t,
            filename: a.filename,
            headers: a.headers,
            "upload-url": a.uploadUrl
          }
        }) : a._e()], 1);
      })), a._v(" "), r("audio-player", {
        attrs: {
          record: a.selected
        }
      })], 1)]);
    };

    N._withStripped = !0;
    var F = s(O, N, [], !1, function (e) {
      n(23);
    }, null, null);
    F.options.__file = "src/components/recorder.vue";
    var C = F.exports;
    n.d(t, "AudioPlayer", function () {
      return S;
    }), n.d(t, "AudioRecorder", function () {
      return C;
    });
    var D = {
      AudioPlayer: S,
      AudioRecorder: C,
      install: function (e) {
        this.installed || (this.installed = !0, e.prototype.$eventBus = e.prototype.$eventBus || new e(), e.component("audio-player", S), e.component("audio-recorder", C));
      }
    };
    t.default = D;
  }]).default;
});
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./src/App.vue"));

var _vueAudioRecorder = _interopRequireDefault(require("vue-audio-recorder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueAudioRecorder.default);

new _vue.default(_App.default).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./src/App.vue":"src/App.vue","vue-audio-recorder":"node_modules/vue-audio-recorder/dist/vue-audio-recorder.min.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38829" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map