(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["clappr"], factory);
	else if(typeof exports === 'object')
		exports["ClapprEstatPlugin"] = factory(require("clappr"));
	else
		root["ClapprEstatPlugin"] = factory(root["Clappr"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _clappr = __webpack_require__(1);

var _estatLoader = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global PLUGIN_VERSION: false */
var EstatPlugin = /*#__PURE__*/function (_CorePlugin) {
  _inherits(EstatPlugin, _CorePlugin);

  _createClass(EstatPlugin, [{
    key: "name",
    get: function get() {
      return 'estat_streaming_mu';
    }
  }]);

  function EstatPlugin(core) {
    var _this;

    _classCallCheck(this, EstatPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EstatPlugin).call(this, core));

    if (!_this.canLoad()) {
      console.error && console.error(_this.name + ' plugin : Clappr version 0.3.0 or greater not yet supported');
      return _possibleConstructorReturn(_this);
    }

    _this._esEvents = {};

    _this.configurePlugin(); // Load eStat library


    _this._esLoaded = false;
    (0, _estatLoader["default"])(function () {
      _this._esLoaded = true;

      _this.eStatCreateTag();
    });
    return _this;
  }

  _createClass(EstatPlugin, [{
    key: "canLoad",
    value: function canLoad() {
      var v = _clappr.version.split('.');

      return v.length > 1 && v[1] < 3;
    }
  }, {
    key: "configurePlugin",
    value: function configurePlugin() {
      // Without configuration, tag instance will not be created
      if (!this.options.estatPlugin) {
        return;
      } // eStat streaming tag configuration is required


      this._esTagCfg = this.options.estatPlugin.eStatTagCfg;

      if (!this._esTagCfg) {
        throw new Error(this.name + ' plugin : "eStatTagCfg" configuration property is missing');
      } // Minimal requirements are serial and stream name


      if (!this._esTagCfg.serial) {
        throw new Error(this.name + ' plugin : eStat serial is missing in configuration');
      }

      if (!this._esTagCfg.streaming || !this._esTagCfg.streaming.streamName) {
        throw new Error(this.name + ' plugin : eStat stream name is missing in configuration');
      } // Display eStat tag notified events in console if set to true


      this._esDebug = this.options.estatPlugin.debug === true;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.ensureTagIsStopped(this._esTag);
      this._esTag = null;

      _get(_getPrototypeOf(EstatPlugin.prototype), "destroy", this).call(this);
    }
  }, {
    key: "ensureTagIsStopped",
    value: function ensureTagIsStopped(tag) {
      // notify 'stop' to eStat tag to ensure that "polling" events are stopped.
      // eStatTag handle multiple consecutive call (it send event only once)
      tag && tag.notifyPlayer('stop');
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.listenTo(this.core.mediaControl, _clappr.Events.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
      this._container = this.core.getCurrentContainer();

      if (this._container) {
        this.listenTo(this._container, _clappr.Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate);
        this.listenTo(this._container, _clappr.Events.CONTAINER_PLAY, this.onPlay);
        this.listenTo(this._container, _clappr.Events.CONTAINER_STOP, this.onStop);
        this.listenTo(this._container, _clappr.Events.CONTAINER_PAUSE, this.onPause);
        this.listenTo(this._container, _clappr.Events.CONTAINER_SEEK, this.onSeek);
        this.listenTo(this._container, _clappr.Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
        this.listenTo(this._container, _clappr.Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull);
        this.listenTo(this._container, _clappr.Events.CONTAINER_ENDED, this.onEnded);
      }
    }
  }, {
    key: "getExternalInterface",
    value: function getExternalInterface() {
      return {
        eStatStreamTag: this.eStatTag
      };
    }
  }, {
    key: "containerChanged",
    value: function containerChanged() {
      this.stopListening();
      this.configurePlugin();
      this.eStatCreateTag(true);
      this.bindEvents();
    }
  }, {
    key: "eStatTagDefaultConfig",
    value: function eStatTagDefaultConfig() {
      var _this2 = this;

      // container must be available
      if (!this._container) return {};
      return {
        measure: 'streaming',
        streaming: {
          diffusion: 'replay',
          // Arbitrary set to 'replay', resolved at playback time
          callbackPosition: function callbackPosition() {
            return _this2.trunc(_this2.playerPosition);
          },
          playerName: 'Clappr',
          playerVersion: _clappr.version,
          playerObj: this.playerElement,
          pluginName: 'clappr-estat-plugin',
          pluginVersion: this.pluginVersion
        }
      };
    }
  }, {
    key: "eStatCreateTag",
    value: function eStatCreateTag(recreate) {
      // Library must be loaded and container must be available
      if (!this._esLoaded || !this._container) return; // Ensure plugin is configured

      if (!this._esTagCfg) return; // Ensure tag is not already created

      if (this._esTag && !recreate) return; // Check for overridable streaming properties

      this._esTagCfgHasDuration = !!this._esTagCfg.streaming.streamDuration;
      this._esTagCfgHasDiffusion = !!this._esTagCfg.streaming.diffusion; // Check if configuration is already satisfied

      this._esTagCfgSatisfied = this._esTagCfgHasDuration && this._esTagCfgHasDiffusion; // Store eStat streaming diffusion (if provided)

      if (this._esTagCfgHasDiffusion) {
        this._esDiffusion = this._esTagCfg.streaming.diffusion;
      } // Ensure previous tag is stopped (if created)


      if (this._esTag) {
        this.ensureTagIsStopped(this._esTag);
      } // Reset events


      this._esEvents = {}; // Build tag configuration

      var tagCfg = {};

      _clappr.$.extend(true, tagCfg, this.eStatTagDefaultConfig(), this._esTagCfg); // Create eStat stream tag instance (Also trigger authentication request)


      this._esTag = new window.eStatTag(tagCfg); // eslint-disable-line new-cap
    }
  }, {
    key: "eStatSatisfyTagCfg",
    value: function eStatSatisfyTagCfg() {
      var cfg = {
        streaming: {}
      }; // Resolve eStat streaming diffusion according playback type

      if (!this._esTagCfgHasDiffusion) {
        if (this.isLive) {
          cfg.streaming.diffusion = this._container.isDvrEnabled() ? 'timeshifting' : 'live';
        } else {
          cfg.streaming.diffusion = 'replay';
        }

        this._esDiffusion = cfg.streaming.diffusion;
      } // Set stream duration (only if available)


      if (!this._esTagCfgHasDuration && !this.isLive) {
        cfg.streaming.streamDuration = this.trunc(this.playerDuration);
      } // Satisfy eStat tag configuration


      this._esTag && this._esTag.set(cfg);
      this._esTagCfgSatisfied = true;
    }
  }, {
    key: "esTagNotify",
    value: function esTagNotify(eventName, pos) {
      if (this._esDebug === true) {
        console.log(this.name + ' plugin : notify ' + eventName + ' event');
      }

      this._esTag && this._esTag.notifyPlayer(eventName, pos);
    }
  }, {
    key: "eStatTag",
    value: function eStatTag() {
      return this._esTag;
    }
  }, {
    key: "trunc",
    value: function trunc(n) {
      return parseInt(n, 10);
    }
  }, {
    key: "recallEvent",
    value: function recallEvent(name, pos) {
      this._esEvents[name] = pos;
    }
  }, {
    key: "forgetEvent",
    value: function forgetEvent(name) {
      delete this._esEvents[name];
    }
  }, {
    key: "posEvent",
    value: function posEvent(name) {
      return Object.prototype.hasOwnProperty.call(this._esEvents, name) ? this._esEvents[name] : -1;
    }
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate(o) {
      this._position = o.current || 0;
    }
  }, {
    key: "onPlay",
    value: function onPlay() {
      this.recallEvent('play', this.trunc(this.playerPosition));
      this.forgetEvent('pause');
      this.forgetEvent('stop'); // Some tag configuration properties are only available during playback

      if (!this._esTagCfgSatisfied) this.eStatSatisfyTagCfg(); // Check if SEEK player event previously occurred

      var pos = this.posEvent('seek');

      if (pos > -1) {
        // isTimeshift is "true" if playing time shifted content and "false" if back playing live content
        if (this._esDiffusion === 'timeshifting' && !this.isTimeshift) {
          // Back to live content
          this.esTagNotify('stop', pos);
        } else {
          // Replay or time shifted content
          this.esTagNotify('pause', pos);
        }

        this.forgetEvent('seek');
      } // Player may buffer during playback WITH or WITHOUT "freeze" video display content.
      // FIXME: notify tag with 'pause' event if BUFFERFULL player event occured ?
      // But this fix may significantly increase sessions ? (if live content)


      this.esTagNotify('play');
    }
  }, {
    key: "onStop",
    value: function onStop() {
      // Recall STOP player event and forget PLAY player event
      this.recallEvent('stop', this.trunc(this.playerPosition));
      this.forgetEvent('play');
      this.esTagNotify('stop');
    }
  }, {
    key: "onPause",
    value: function onPause() {
      // Recall PAUSE player event and forget PLAY player event
      this.recallEvent('pause', this.trunc(this.playerPosition));
      this.forgetEvent('play'); // PAUSE player event is triggered when end of VOD content is reached.
      // In this case, eStat tag expect to be notified with 'stop' (not 'pause').
      // Therefore, PAUSE player event is ignored and 'stop' is notified in ENDED player event

      if (!this.isLive && this.isEnd) return; // PAUSE player event is trigerred when "native" HTML5 video LIVE content is stopped.
      // In this case, eStat tag does not expect to be notified with 'pause' after 'stop'.
      // UPDATE: since Clappr 0.2.80, PAUSE player event may also be trigerred on desktop

      if (this.posEvent('stop') > -1) {
        this.forgetEvent('stop');
        return;
      }

      this.esTagNotify('pause');
    }
  }, {
    key: "onSeek",
    value: function onSeek() {
      /**
       * SEEK operation must be notified to eStat tag like the following :
       *
       *   'pause', then 'play' if diffusion is 'replay'.
       *   'pause', then 'play' if diffusion is 'timeshiftin' and SEEK is completed on recorded part.
       *   'stop', then 'play' if diffusion is 'timeshiftin' and SEEK if for go back to live.
       *
       * Clappr container trigger PLAY event after SEEK operation.
       */
      this.recallEvent('seek', this.trunc(this.playerPosition));
    }
  }, {
    key: "onBuffering",
    value: function onBuffering() {
      // Recall BUFFERING player event only if PLAY player event occurred
      if (this.posEvent('play') > -1) {
        this.forgetEvent('play');
        this.recallEvent('buffering', this.trunc(this.playerPosition));
      }
    }
  }, {
    key: "onBufferfull",
    value: function onBufferfull() {
      // Recall BUFFERFULL player event only if BUFFERING player event occurred
      var pos = this.posEvent('buffering');

      if (pos > -1) {
        this.forgetEvent('buffering');
        this.recallEvent('bufferfull', pos);
      }
    }
  }, {
    key: "onEnded",
    value: function onEnded() {
      // Notify 'stop' to eStat tag if video ended (eStat compliance)
      this.esTagNotify('stop');
    }
  }, {
    key: "playerElement",
    get: function get() {
      // Container DOM element is used for player element
      return this._container && this._container.el;
    }
  }, {
    key: "pluginVersion",
    get: function get() {
      return "0.4.2";
    }
  }, {
    key: "playerPosition",
    get: function get() {
      return this.isLive ? 0 : this._position;
    }
  }, {
    key: "playerDuration",
    get: function get() {
      return this.isLive ? 0 : this._container && this._container.getDuration();
    }
  }, {
    key: "isLive",
    get: function get() {
      return this._container.getPlaybackType() === _clappr.Playback.LIVE;
    }
  }, {
    key: "isTimeshift",
    get: function get() {
      return this._container.isDvrEnabled() && this._container.isDvrInUse();
    }
  }, {
    key: "isEnd",
    get: function get() {
      return this.trunc(this.playerDuration) === this.trunc(this.playerPosition);
    }
  }]);

  return EstatPlugin;
}(_clappr.CorePlugin);

exports["default"] = EstatPlugin;
module.exports = exports.default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * eStat "mu" library lazy loader.
 * @function
 * @param {function} The library loaded callback.
 * @param {string} The library version. (Default is '5.4')
 */
function _default(cb) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '5.4';
  var win = window;
  var doc = document;
  var el = 'script';

  if (win.eStatTag) {
    if (typeof cb === 'function') cb();
    return;
  }

  var first = doc.getElementsByTagName(el)[0];
  var script = doc.createElement(el);
  script.src = 'https://prof.estat.com/js/mu-' + version + '.js';
  script.async = true;
  if (typeof cb === 'function') script.onload = cb;
  first.parentNode.insertBefore(script, first);
}

module.exports = exports.default;

/***/ })
/******/ ]);
});