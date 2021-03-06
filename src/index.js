// Clappr player is Copyright 2014 Globo.com Player authors. All rights reserved.
// eStat’Streaming is Copyright 2012 Médiamétrie-eStat. All rights reserved.

import {CorePlugin, Events, Playback, version, $} from 'clappr'
import eStatLoader from './estat-loader'

/* global PLUGIN_VERSION: false */

export default class EstatPlugin extends CorePlugin {
  get name() { return 'estat_streaming_mu' }

  constructor(core) {
    super(core)

    if (! this.canLoad()) {
      console.error && console.error(this.name + ' plugin : Clappr version 0.3.0 or greater not yet supported')

      return
    }

    this._esEvents = {}
    this.configurePlugin()

    // Load eStat library
    this._esLoaded = false
    eStatLoader(() => {
      this._esLoaded = true
      this.eStatCreateTag()
    })
  }

  canLoad() {
    let v = version.split('.')

    return v.length > 1 && v[1] < 3
  }

  configurePlugin() {
    // Without configuration, tag instance will not be created
    if (!this.options.estatPlugin) {
      return
    }

    // eStat streaming tag configuration is required
    this._esTagCfg = this.options.estatPlugin.eStatTagCfg
    if (!this._esTagCfg) {
      throw new Error(this.name + ' plugin : "eStatTagCfg" configuration property is missing')
    }

    // Minimal requirements are serial and stream name
    if (!this._esTagCfg.serial) {
      throw new Error(this.name + ' plugin : eStat serial is missing in configuration')
    }
    if (!this._esTagCfg.streaming || !this._esTagCfg.streaming.streamName) {
      throw new Error(this.name + ' plugin : eStat stream name is missing in configuration')
    }

    // Display eStat tag notified events in console if set to true
    this._esDebug = this.options.estatPlugin.debug === true
  }

  destroy() {
    this.ensureTagIsStopped(this._esTag)
    this._esTag = null
    super.destroy()
  }

  ensureTagIsStopped(tag) {
    // notify 'stop' to eStat tag to ensure that "polling" events are stopped.
    // eStatTag handle multiple consecutive call (it send event only once)
    tag && tag.notifyPlayer('stop')
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged)
    this._container = this.core.getCurrentContainer()
    if (this._container) {
      this.listenTo(this._container, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate)
      this.listenTo(this._container, Events.CONTAINER_PLAY, this.onPlay)
      this.listenTo(this._container, Events.CONTAINER_STOP, this.onStop)
      this.listenTo(this._container, Events.CONTAINER_PAUSE, this.onPause)
      this.listenTo(this._container, Events.CONTAINER_SEEK, this.onSeek)
      this.listenTo(this._container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
      this.listenTo(this._container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull)
      this.listenTo(this._container, Events.CONTAINER_ENDED, this.onEnded)
    }
  }

  getExternalInterface() {
    return {
      eStatStreamTag: this.eStatTag
    }
  }

  containerChanged() {
    this.stopListening()
    this.configurePlugin()
    this.eStatCreateTag(true)
    this.bindEvents()
  }

  get playerElement() {
    // Container DOM element is used for player element
    return this._container && this._container.el
  }

  get pluginVersion() {
    return PLUGIN_VERSION
  }

  eStatTagDefaultConfig() {
    // container must be available
    if (!this._container) return {}

    return {
      measure: 'streaming',
      streaming: {
        diffusion: 'replay', // Arbitrary set to 'replay', resolved at playback time
        callbackPosition: () => { return this.trunc(this.playerPosition) },
        playerName: 'Clappr',
        playerVersion: version,
        playerObj: this.playerElement,
        pluginName: 'clappr-estat-plugin',
        pluginVersion: this.pluginVersion
      }
    }
  }

  eStatCreateTag(recreate) {
    // Library must be loaded and container must be available
    if (!this._esLoaded || !this._container) return

    // Ensure plugin is configured
    if (!this._esTagCfg) return

    // Ensure tag is not already created
    if (this._esTag && !recreate) return

    // Check for overridable streaming properties
    this._esTagCfgHasDuration = !!this._esTagCfg.streaming.streamDuration
    this._esTagCfgHasDiffusion = !!this._esTagCfg.streaming.diffusion

    // Check if configuration is already satisfied
    this._esTagCfgSatisfied = this._esTagCfgHasDuration && this._esTagCfgHasDiffusion

    // Store eStat streaming diffusion (if provided)
    if (this._esTagCfgHasDiffusion) {
      this._esDiffusion = this._esTagCfg.streaming.diffusion
    }

    // Ensure previous tag is stopped (if created)
    if (this._esTag) {
      this.ensureTagIsStopped(this._esTag)
    }

    // Reset events
    this._esEvents = {}

    // Build tag configuration
    let tagCfg = {}
    $.extend(true, tagCfg, this.eStatTagDefaultConfig(), this._esTagCfg)

    // Create eStat stream tag instance (Also trigger authentication request)
    this._esTag = new window.eStatTag(tagCfg) // eslint-disable-line new-cap
  }

  eStatSatisfyTagCfg() {
    let cfg = {streaming: {}}

    // Resolve eStat streaming diffusion according playback type
    if (!this._esTagCfgHasDiffusion) {
      if (this.isLive) {
        cfg.streaming.diffusion = this._container.isDvrEnabled() ? 'timeshifting' : 'live'
      } else {
        cfg.streaming.diffusion = 'replay'
      }
      this._esDiffusion = cfg.streaming.diffusion
    }

    // Set stream duration (only if available)
    if (!this._esTagCfgHasDuration && !this.isLive) {
      cfg.streaming.streamDuration = this.trunc(this.playerDuration)
    }

    // Satisfy eStat tag configuration
    this._esTag && this._esTag.set(cfg)
    this._esTagCfgSatisfied = true
  }

  esTagNotify(eventName, pos) {
    if (this._esDebug === true) {
      console.log(this.name + ' plugin : notify ' + eventName + ' event')
    }
    this._esTag && this._esTag.notifyPlayer(eventName, pos)
  }

  eStatTag() {
    return this._esTag
  }

  trunc(n) {
    return parseInt(n, 10)
  }

  get playerPosition() {
    return this.isLive ? 0 : this._position
  }

  get playerDuration() {
    return this.isLive ? 0 : this._container && this._container.getDuration()
  }

  get isLive() {
    return this._container.getPlaybackType() === Playback.LIVE
  }

  get isTimeshift() {
    return this._container.isDvrEnabled() && this._container.isDvrInUse()
  }

  get isEnd() {
    return this.trunc(this.playerDuration) === this.trunc(this.playerPosition)
  }

  recallEvent(name, pos) {
    this._esEvents[name] = pos
  }

  forgetEvent(name) {
    delete this._esEvents[name]
  }

  posEvent(name) {
    return Object.prototype.hasOwnProperty.call(this._esEvents, name)
      ? this._esEvents[name]
      : -1
  }

  onTimeUpdate(o) {
    this._position = o.current || 0
  }

  onPlay() {
    this.recallEvent('play', this.trunc(this.playerPosition))
    this.forgetEvent('pause')
    this.forgetEvent('stop')

    // Some tag configuration properties are only available during playback
    if (!this._esTagCfgSatisfied) this.eStatSatisfyTagCfg()

    // Check if SEEK player event previously occurred
    let pos = this.posEvent('seek')
    if (pos > -1) {
      // isTimeshift is "true" if playing time shifted content and "false" if back playing live content
      if (this._esDiffusion === 'timeshifting' && !this.isTimeshift) {
        // Back to live content
        this.esTagNotify('stop', pos)
      } else {
        // Replay or time shifted content
        this.esTagNotify('pause', pos)
      }
      this.forgetEvent('seek')
    }

    // Player may buffer during playback WITH or WITHOUT "freeze" video display content.
    // FIXME: notify tag with 'pause' event if BUFFERFULL player event occured ?
    // But this fix may significantly increase sessions ? (if live content)

    this.esTagNotify('play')
  }

  onStop() {
    // Recall STOP player event and forget PLAY player event
    this.recallEvent('stop', this.trunc(this.playerPosition))
    this.forgetEvent('play')

    this.esTagNotify('stop')
  }

  onPause() {
    // Recall PAUSE player event and forget PLAY player event
    this.recallEvent('pause', this.trunc(this.playerPosition))
    this.forgetEvent('play')

    // PAUSE player event is triggered when end of VOD content is reached.
    // In this case, eStat tag expect to be notified with 'stop' (not 'pause').
    // Therefore, PAUSE player event is ignored and 'stop' is notified in ENDED player event
    if (!this.isLive && this.isEnd) return

    // PAUSE player event is trigerred when "native" HTML5 video LIVE content is stopped.
    // In this case, eStat tag does not expect to be notified with 'pause' after 'stop'.
    // UPDATE: since Clappr 0.2.80, PAUSE player event may also be trigerred on desktop
    if (this.posEvent('stop') > -1) {
      this.forgetEvent('stop')

      return
    }

    this.esTagNotify('pause')
  }

  onSeek() {
    /**
     * SEEK operation must be notified to eStat tag like the following :
     *
     *   'pause', then 'play' if diffusion is 'replay'.
     *   'pause', then 'play' if diffusion is 'timeshiftin' and SEEK is completed on recorded part.
     *   'stop', then 'play' if diffusion is 'timeshiftin' and SEEK if for go back to live.
     *
     * Clappr container trigger PLAY event after SEEK operation.
     */
    this.recallEvent('seek', this.trunc(this.playerPosition))
  }

  onBuffering() {
    // Recall BUFFERING player event only if PLAY player event occurred
    if (this.posEvent('play') > -1) {
      this.forgetEvent('play')
      this.recallEvent('buffering', this.trunc(this.playerPosition))
    }
  }

  onBufferfull() {
    // Recall BUFFERFULL player event only if BUFFERING player event occurred
    let pos = this.posEvent('buffering')
    if (pos > -1) {
      this.forgetEvent('buffering')
      this.recallEvent('bufferfull', pos)
    }
  }

  onEnded() {
    // Notify 'stop' to eStat tag if video ended (eStat compliance)
    this.esTagNotify('stop')
  }
}
