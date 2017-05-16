// Clappr player is Copyright 2014 Globo.com Player authors. All rights reserved.
// eStat’Streaming is Copyright 2012 Médiamétrie-eStat. All rights reserved.

import {CorePlugin, Events, Playback, version, $} from 'clappr'
import eStatLoader from './estat-loader'

export default class EstatPlugin extends CorePlugin {
  get name() { return 'estat_streaming_mu' }

  constructor(core) {
    super(core)

    this._esEvents = {}
    this.configurePlugin()

    // Load eStat library
    this._esLoaded = false
    eStatLoader(
      () => {
        this._esLoaded = true
        this.eStatCreateTag()
      },
      '5.2',
      this._esDebug,
      this._esSecure
    )
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
    if(!this._esTagCfg.serial) {
      throw new Error(this.name + ' plugin : eStat serial is missing in configuration')
    }
    if(!this._esTagCfg.streaming || !this._esTagCfg.streaming.streamName) {
      throw new Error(this.name + ' plugin : eStat stream name is missing in configuration')
    }

    this._esDebug = this.options.estatPlugin.debug === true
    this._esSecure = this.options.estatPlugin.secure === true
  }

  destroy() {
    this.ensureTagIsStopped(this._esTag)
    this._esTag = null
    super.destroy()
  }

  ensureTagIsStopped(tag) {
    // If video is not fully stopped, notify 'stop' to eStat tag
    // to ensure that "polling" events are stopped.
    if (this.posEvent('stop') === -1) {
      tag && tag.notifyPlayer('stop')
    }
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
      this.configurePlugin()
      this.eStatCreateTag(true)
    }
  }

  getExternalInterface() {
    return {
      eStatStreamTag: this.eStatTag
    }
  }

  containerChanged() {
    this.stopListening()
    this.bindEvents()
  }

  get playerElement() {
    // Container DOM element is used for player element
    return this._container && this._container.el
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
    this._esTagCfgHasDuration = this._esTagCfg.streaming.streamDuration ? true : false
    this._esTagCfgHasDiffusion = this._esTagCfg.streaming.diffusion ? true : false

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
    this._esTag = new window.eStatTag(tagCfg)
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

  get isLiveHtml5() {
    return this.isLive && this._container.playback.name === 'html5_video'
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
    return this._esEvents.hasOwnProperty(name) ? this._esEvents[name] : -1
  }

  onTimeUpdate(o){
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

    // Safari + iOS workaround :
    // PAUSE player event is trigerred when "native" HTML5 video LIVE content is stopped.
    // In this case, eStat tag does not expect to be notified with 'pause' after 'stop'.
    if (this.posEvent('stop') > -1 && this.isLiveHtml5) {
      this.forgetEvent('stop')

      return
    }

    this.esTagNotify('pause')
  }

  onSeek(o) {
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
