// Clappr player is Copyright 2014 Globo.com Player authors. All rights reserved.
// eStat’Streaming is Copyright 2012 Médiamétrie-eStat. All rights reserved.

import {CorePlugin, Events, $} from 'clappr'
import isEqual from 'lodash.isequal'

export default class EstatPlugin extends CorePlugin {
  get name() { return 'estat_streaming_ds' }

  constructor(core) {
    super(core)

    if (!this.options.estatPlugin) {
      throw new Error(this.name + ' plugin configuration is missing')
    }

    // eStat streaming serial is required
    this._serial = this.options.estatPlugin.serial
    if (!this._serial) {
      throw new Error(this.name + ' plugin "serial" configuration property is missing')
    }

    // eStat session parameter object is required
    if (!this.options.estatPlugin.session) {
      throw new Error(this.name + ' plugin "session" configuration property is missing')
    }
    this.setSession(this.options.estatPlugin.session)

    // eStat streaming ready callback is optional
    this._readyCb = this.options.estatPlugin.readyCallback
    if (this._readyCb && typeof this._readyCb !== 'function') {
      throw new Error(this.name + ' plugin "readyCallback" configuration property is not a function')
    }

    this.eStatSetup()
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged)
    this._container = this.core.getCurrentContainer()
    if (this._container) {
      this.listenTo(this._container, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate)
      this.listenTo(this._container, Events.CONTAINER_PLAY, this.onPlay)
      this.listenTo(this._container, Events.CONTAINER_STOP, this.onStop)
      this.listenTo(this._container, Events.CONTAINER_PAUSE, this.onPause)
    }
  }

  getExternalInterface() {
    return {
      estatNewSession: this.eStatNewSession
    }
  }

  containerChanged() {
    this.stopListening()
    this.bindEvents()
  }

  get playerElement() {
    // Container DOM element is used for player element
    // eStat library will attach an 'Obj' property on session creation
    return this._container && this._container.el
  }

  get satisfyVersion() {
    // Assume is compatible with version 4.*.* (Tested with version 4.0.36)
    return this.eStatVersion.indexOf('4.') === 0
  }

  get satisfyRequirements() {
    return window.estat_Object && window.eStat_ms && window.DS
  }

  get eStatVersion() {
    return window.eStat_version || 'unknown'
  }

  setSession(session) {
    // Copy object to avoid modifications by reference
    let newSession = Object.assign({}, session)

    // Ensure session object has expected properties
    $.each(['videoName', 'level1', 'level2', 'level3', 'level4', 'level5', 'genre'], (index, item) => {
      if (!(item in newSession)) {
        throw new Error(this.name + ' plugin "session" configuration property is invalid')
      }
    })

    this._session = newSession
  }

  eStatSetup() {
    if (!window.estat_Object) {
      // Load eStat library with manual "DS" tracker
      window._PJS = 0
      window._cmsJS = 0
      window._eStatDS = 1
      window.eStat_PJS = () => { this.eStatLoaded() }
      window.eStat_CMSJS = () => { this.eStatMsLoaded() }

      // The following script will set _PJS to 1 and call eStat_PJS()
      // Given _cmsJS is defined, the following script will load ms library, set _cmsJS to 1 and call eStat_CMSJS()
      // Given _eStatDS is defined, the ms library will load DS player library
      const script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('async', 'async')
      script.setAttribute('src', '//prof.estat.com/js/' + this._serial + '.js')
      document.body.appendChild(script)
    } else {
      // Assume eStat library is already loaded with manual "DS" tracker and authentification done
      if (!this.satisfyRequirements) {
        throw new Error(this.name + 'plugin require eStat library loaded with _cmsJS and _eStatDS defined. Please refer to eStat manual')
      }
      this.eStatMsLoaded()
    }
  }

  eStatLoaded() {
    if (!this.satisfyVersion) {
      console.log(this.name + ' plugin may be incompatible with eStat version ' + window.eStat_version)
    }
    this.eStatAuth()
  }

  eStatMsLoaded() {
    this.eStatSession()
    this.eStatReady()
  }

  eStatReady() {
    if (this._readyCb) process.nextTick(() => this._readyCb())
  }

  eStatAuth() {
    // The following method setup cmsVI, eS_host and eS_access values
    window.eStat_id && window.eStat_id.serial(this._serial)
  }

  eStatNewSession(session) {
    // Apply only if tracking parameters differs
    if (isEqual(this._session, session)) return

    // Get current play state
    let playState = this.isPlaying

    // Setup new eStat player session
    // Note: stop current session and start new only if player is playing
    this.setSession(session)
    if (playState) this.onStop()
    window.eStat_ms && window.eStat_ms.newStreamUI(
      this.playerElement,
      this._session.videoName,
      this._session.level1,
      this._session.level2,
      this._session.level3,
      this._session.level4,
      this._session.level5,
      this._session.genre,
    )
    if (playState) this.onPlay()
  }

  eStatSession() {
    // Setup eStat player session
    window.eStat_ms && window.eStat_ms.referenceUI(
      this.playerElement,
      'DS',
      this._session.videoName,
      this._session.level1,
      this._session.level2,
      this._session.level3,
      this._session.level4,
      this._session.level5,
      this._session.genre,
      '',
      () => { return this.playerPosition }
    )
  }

  get playerPosition() {
    return this._container.getPlaybackType() === 'live' ? 0 : this._position
  }

  get isPlaying() {
    return this._container.isPlaying()
  }

  onTimeUpdate(o){
    this._position = o.current || 0
  }

  onPlay() {
    window.eStat_ms && window.eStat_ms.TagDS(this.playerElement).sendEvent(window.eStatPlayState.Play)
  }

  onStop() {
    window.eStat_ms && window.eStat_ms.TagDS(this.playerElement).sendEvent(window.eStatPlayState.Stop)
  }

  onPause() {
    window.eStat_ms && window.eStat_ms.TagDS(this.playerElement).sendEvent(window.eStatPlayState.Pause)
  }
}
