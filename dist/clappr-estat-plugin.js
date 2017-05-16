(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["clappr"], factory);
	else if(typeof exports === 'object')
		exports["ClapprEstatPlugin"] = factory(require("clappr"));
	else
		root["ClapprEstatPlugin"] = factory(root["Clappr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cb) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '5.2';
  var debug = arguments[2];
  var secure = arguments[3];

  var win = window,
      doc = document,
      el = 'script';

  if (win.eStatTag) {
    if (typeof cb === 'function') cb();

    return;
  }

  var s = secure === true ? 'https:' : '';
  var d = debug === true ? 'integration-' : '';
  var first = doc.getElementsByTagName(el)[0];
  var script = doc.createElement(el);

  script.src = s + '//prof.estat.com/js/mu-' + d + version + '.js';
  script.async = true;
  if (typeof cb === 'function') script.onload = cb;
  first.parentNode.insertBefore(script, first);
};

module.exports = exports['default']; /**
                                      * eStat "mu" library lazy loader.
                                      * @function
                                      * @param {function} The library loaded callback.
                                      * @param {string} The library version. (Default is '5.2')
                                      * @param {boolean} Set to true to load the debug/integration version of library.
                                      * @param {boolean} Set to true to force HTTPS load protocol. (Default behaviour is to match current protocol)
                                      */

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clappr = __webpack_require__(1);

var _estatLoader = __webpack_require__(0);

var _estatLoader2 = _interopRequireDefault(_estatLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Clappr player is Copyright 2014 Globo.com Player authors. All rights reserved.
// eStat’Streaming is Copyright 2012 Médiamétrie-eStat. All rights reserved.

var EstatPlugin = function (_CorePlugin) {
  _inherits(EstatPlugin, _CorePlugin);

  _createClass(EstatPlugin, [{
    key: 'name',
    get: function get() {
      return 'estat_streaming_mu';
    }
  }]);

  function EstatPlugin(core) {
    _classCallCheck(this, EstatPlugin);

    var _this = _possibleConstructorReturn(this, (EstatPlugin.__proto__ || Object.getPrototypeOf(EstatPlugin)).call(this, core));

    _this._esEvents = {};
    _this.configurePlugin();

    // Load eStat library
    _this._esLoaded = false;
    (0, _estatLoader2.default)(function () {
      _this._esLoaded = true;
      _this.eStatCreateTag();
    }, '5.2', _this._esDebug, _this._esSecure);
    return _this;
  }

  _createClass(EstatPlugin, [{
    key: 'configurePlugin',
    value: function configurePlugin() {
      // Without configuration, tag instance will not be created
      if (!this.options.estatPlugin) {
        return;
      }

      // eStat streaming tag configuration is required
      this._esTagCfg = this.options.estatPlugin.eStatTagCfg;
      if (!this._esTagCfg) {
        throw new Error(this.name + ' plugin : "eStatTagCfg" configuration property is missing');
      }

      // Minimal requirements are serial and stream name
      if (!this._esTagCfg.serial) {
        throw new Error(this.name + ' plugin : eStat serial is missing in configuration');
      }
      if (!this._esTagCfg.streaming || !this._esTagCfg.streaming.streamName) {
        throw new Error(this.name + ' plugin : eStat stream name is missing in configuration');
      }

      this._esDebug = this.options.estatPlugin.debug === true;
      this._esSecure = this.options.estatPlugin.secure === true;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.ensureTagIsStopped(this._esTag);
      this._esTag = null;
      _get(EstatPlugin.prototype.__proto__ || Object.getPrototypeOf(EstatPlugin.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'ensureTagIsStopped',
    value: function ensureTagIsStopped(tag) {
      // If video is not fully stopped, notify 'stop' to eStat tag
      // to ensure that "polling" events are stopped.
      if (this.posEvent('stop') === -1) {
        tag && tag.notifyPlayer('stop');
      }
    }
  }, {
    key: 'bindEvents',
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
        this.configurePlugin();
        this.eStatCreateTag(true);
      }
    }
  }, {
    key: 'getExternalInterface',
    value: function getExternalInterface() {
      return {
        eStatStreamTag: this.eStatTag
      };
    }
  }, {
    key: 'containerChanged',
    value: function containerChanged() {
      this.stopListening();
      this.bindEvents();
    }
  }, {
    key: 'eStatTagDefaultConfig',
    value: function eStatTagDefaultConfig() {
      var _this2 = this;

      // container must be available
      if (!this._container) return {};

      return {
        measure: 'streaming',
        streaming: {
          diffusion: 'replay', // Arbitrary set to 'replay', resolved at playback time
          callbackPosition: function callbackPosition() {
            return _this2.trunc(_this2.playerPosition);
          },
          playerName: 'Clappr',
          playerVersion: _clappr.version,
          playerObj: this.playerElement
        }
      };
    }
  }, {
    key: 'eStatCreateTag',
    value: function eStatCreateTag(recreate) {
      // Library must be loaded and container must be available
      if (!this._esLoaded || !this._container) return;

      // Ensure plugin is configured
      if (!this._esTagCfg) return;

      // Ensure tag is not already created
      if (this._esTag && !recreate) return;

      // Check for overridable streaming properties
      this._esTagCfgHasDuration = this._esTagCfg.streaming.streamDuration ? true : false;
      this._esTagCfgHasDiffusion = this._esTagCfg.streaming.diffusion ? true : false;

      // Check if configuration is already satisfied
      this._esTagCfgSatisfied = this._esTagCfgHasDuration && this._esTagCfgHasDiffusion;

      // Store eStat streaming diffusion (if provided)
      if (this._esTagCfgHasDiffusion) {
        this._esDiffusion = this._esTagCfg.streaming.diffusion;
      }

      // Ensure previous tag is stopped (if created)
      if (this._esTag) {
        this.ensureTagIsStopped(this._esTag);
      }

      // Reset events
      this._esEvents = {};

      // Build tag configuration
      var tagCfg = {};
      _clappr.$.extend(true, tagCfg, this.eStatTagDefaultConfig(), this._esTagCfg);

      // Create eStat stream tag instance (Also trigger authentication request)
      this._esTag = new window.eStatTag(tagCfg);
    }
  }, {
    key: 'eStatSatisfyTagCfg',
    value: function eStatSatisfyTagCfg() {
      var cfg = { streaming: {} };

      // Resolve eStat streaming diffusion according playback type
      if (!this._esTagCfgHasDiffusion) {
        if (this.isLive) {
          cfg.streaming.diffusion = this._container.isDvrEnabled() ? 'timeshifting' : 'live';
        } else {
          cfg.streaming.diffusion = 'replay';
        }
        this._esDiffusion = cfg.streaming.diffusion;
      }

      // Set stream duration (only if available)
      if (!this._esTagCfgHasDuration && !this.isLive) {
        cfg.streaming.streamDuration = this.trunc(this.playerDuration);
      }

      // Satisfy eStat tag configuration
      this._esTag && this._esTag.set(cfg);
      this._esTagCfgSatisfied = true;
    }
  }, {
    key: 'esTagNotify',
    value: function esTagNotify(eventName, pos) {
      if (this._esDebug === true) {
        console.log(this.name + ' plugin : notify ' + eventName + ' event');
      }
      this._esTag && this._esTag.notifyPlayer(eventName, pos);
    }
  }, {
    key: 'eStatTag',
    value: function eStatTag() {
      return this._esTag;
    }
  }, {
    key: 'trunc',
    value: function trunc(n) {
      return parseInt(n, 10);
    }
  }, {
    key: 'recallEvent',
    value: function recallEvent(name, pos) {
      this._esEvents[name] = pos;
    }
  }, {
    key: 'forgetEvent',
    value: function forgetEvent(name) {
      delete this._esEvents[name];
    }
  }, {
    key: 'posEvent',
    value: function posEvent(name) {
      return this._esEvents.hasOwnProperty(name) ? this._esEvents[name] : -1;
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate(o) {
      this._position = o.current || 0;
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      this.recallEvent('play', this.trunc(this.playerPosition));
      this.forgetEvent('pause');
      this.forgetEvent('stop');

      // Some tag configuration properties are only available during playback
      if (!this._esTagCfgSatisfied) this.eStatSatisfyTagCfg();

      // Check if SEEK player event previously occurred
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
      }

      // Player may buffer during playback WITH or WITHOUT "freeze" video display content.
      // FIXME: notify tag with 'pause' event if BUFFERFULL player event occured ?
      // But this fix may significantly increase sessions ? (if live content)

      this.esTagNotify('play');
    }
  }, {
    key: 'onStop',
    value: function onStop() {
      // Recall STOP player event and forget PLAY player event
      this.recallEvent('stop', this.trunc(this.playerPosition));
      this.forgetEvent('play');

      this.esTagNotify('stop');
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      // Recall PAUSE player event and forget PLAY player event
      this.recallEvent('pause', this.trunc(this.playerPosition));
      this.forgetEvent('play');

      // PAUSE player event is triggered when end of VOD content is reached.
      // In this case, eStat tag expect to be notified with 'stop' (not 'pause').
      // Therefore, PAUSE player event is ignored and 'stop' is notified in ENDED player event
      if (!this.isLive && this.isEnd) return;

      // Safari + iOS workaround :
      // PAUSE player event is trigerred when "native" HTML5 video LIVE content is stopped.
      // In this case, eStat tag does not expect to be notified with 'pause' after 'stop'.
      if (this.posEvent('stop') > -1 && this.isLiveHtml5) {
        this.forgetEvent('stop');

        return;
      }

      this.esTagNotify('pause');
    }
  }, {
    key: 'onSeek',
    value: function onSeek(o) {
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
    key: 'onBuffering',
    value: function onBuffering() {
      // Recall BUFFERING player event only if PLAY player event occurred
      if (this.posEvent('play') > -1) {
        this.forgetEvent('play');
        this.recallEvent('buffering', this.trunc(this.playerPosition));
      }
    }
  }, {
    key: 'onBufferfull',
    value: function onBufferfull() {
      // Recall BUFFERFULL player event only if BUFFERING player event occurred
      var pos = this.posEvent('buffering');
      if (pos > -1) {
        this.forgetEvent('buffering');
        this.recallEvent('bufferfull', pos);
      }
    }
  }, {
    key: 'onEnded',
    value: function onEnded() {
      // Notify 'stop' to eStat tag if video ended (eStat compliance)
      this.esTagNotify('stop');
    }
  }, {
    key: 'playerElement',
    get: function get() {
      // Container DOM element is used for player element
      return this._container && this._container.el;
    }
  }, {
    key: 'playerPosition',
    get: function get() {
      return this.isLive ? 0 : this._position;
    }
  }, {
    key: 'playerDuration',
    get: function get() {
      return this.isLive ? 0 : this._container && this._container.getDuration();
    }
  }, {
    key: 'isLive',
    get: function get() {
      return this._container.getPlaybackType() === _clappr.Playback.LIVE;
    }
  }, {
    key: 'isLiveHtml5',
    get: function get() {
      return this.isLive && this._container.playback.name === 'html5_video';
    }
  }, {
    key: 'isTimeshift',
    get: function get() {
      return this._container.isDvrEnabled() && this._container.isDvrInUse();
    }
  }, {
    key: 'isEnd',
    get: function get() {
      return this.trunc(this.playerDuration) === this.trunc(this.playerPosition);
    }
  }]);

  return EstatPlugin;
}(_clappr.CorePlugin);

exports.default = EstatPlugin;
module.exports = exports['default'];

/***/ })
/******/ ]);
});