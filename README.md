# Clappr eStat streaming Plugin

[Mediametrie eStat streaming](http://www.mediametrie-estat.com/estatstreaming/) plugin for [Clappr](https://github.com/clappr/clappr) video player.

This plugin use the eStat Javascript streaming tag library.

__KNOWN ISSUES:__ player events are not properly tracked on iOS with Safari if using "native" media controls. _(VOD and Live with DVR)_

# Usage

Add both Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/clappr/0.2.66/clappr.min.js"></script>
  <script type="text/javascript" src="dist/clappr-estat-plugin.min.js"></script>
</head>
```

Then just add `ClapprEstatPlugin` into the list of core plugins of your player instance, and the options for the plugin go in the `estatPlugin` property as shown below.

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.mp4",
  plugins: {
    core: [ClapprEstatPlugin],
  },
  estatPlugin: {
    eStatTagCfg: {
      serial: 'ESTAT-STREAMING-SERIAL',
      streaming: {
        streamName: 'MyVideoTitle',
        streamGenre: 'MyVideoGenre',
      },
    },
  }
});
```

## eStatTagCfg

`eStatTagCfg` __required__ property is the __eStatTag__ configuration object. For more details, read eStat streaming manual provided by Mediametrie.

Default plugin behaviour is to automatically update the following __eStatTag__ configuration properties with these values :

```javascript
  /* eStatTag automatically updated properties */
  {
    measure: '*',            // value is set to 'streaming'
    streaming: {
      diffusion: '*',        // value is set according player playback type ('live', 'replay' or 'timeshifting')
      callbackPosition: '*', // value is the internal player position callback function
      playerName: '*',       // value is set to 'Clappr'
      playerVersion: '*',    // value is set to Clappr player version
      playerObject: '*',     // value is set to player container element
      streamDuration: '*',   // value is set to video duration (if available, otherwise is not set)
    }
  }
```

The above configuration properties are not required, but can be overridden in `eStatTagCfg` plugin option.

Therefore, the minimal required plugin configuration is :

```javascript
  /* [...] */
  estatPlugin: {
    eStatTagCfg: {
      serial: 'ESTAT-STREAMING-SERIAL',
      streaming: {
        streamName: 'MyVideoTitle',
      },
    },
  }
  /* [...] */
```

## debug

`debug` __optional__ property is a boolean which indicate if the developement version of the eStat library is loaded. Default value is `false`.

This version use browser console to display informations. _(alert if eStatTag is not properly configured, and more...)_

This property is only for development purposes. Do NOT set to `true` in production.

## secure

`secure` __optional__ property is a boolean which force the eStat library to be loaded using HTTPS protocol. Default value is `false`. _(default behaviour is to match current document protocol)_

# External Interface

The `eStatStreamTag()` method is added to Clappr player instance. This method return the __eStatTag__ instance object associated to player.

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.mp4",
  plugins: {
    core: [ClapprEstatPlugin],
  },
  estatPlugin: {
    eStatTagCfg: {
      serial: 'ESTAT-STREAMING-SERIAL',
      streaming: {
        streamName: 'MyVideoTitle',
      },
    },
  }
});

var tag = player.eStatStreamTag();

tag.set({
  levels: {
    level_1: 'foo',
    level_2: 'bar',
  }
});
```

For more details about __eStatTag__ object, read eStat streaming manual provided by Mediametrie.

# Development

Install dependencies :

```shell
  yarn
```

Start dev. HTTP server (http://0.0.0.0:8080) :

```shell
  yarn run start
```
