# Clappr eStat streaming Plugin

[Mediametrie eStat streaming](http://www.mediametrie-estat.com/estatstreaming/) plugin for [Clappr](https://github.com/clappr/clappr) video player.

This plugin use the eStat Javascript streaming tag library.

__KNOWN ISSUES:__ player events are not properly tracked on iOS with Safari if using "native" media controls. _(VOD and Live with DVR)_

# Usage

Add both Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr-estat-plugin@latest/dist/clappr-estat-plugin.min.js"></script>
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
      pluginName: '*',       // value is set to 'clappr-estat-plugin'
      pluginVersion: '*',    // value is set to Clappr eStat streaming plugin version
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

# Clappr External Interface

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

# Load another source without destroy player

Simply use Clappr player `configure()` method to load another source with new eStat tag configuration :

```javascript
player.configure({
  source: "http://another.video/here.mp4",
  estatPlugin: {
    eStatTagCfg: {
      serial: 'ESTAT-STREAMING-SERIAL',
      streaming: {
        streamName: 'AnotherVideoTitle',
      },
    },
  }
});
```

# Development

Install dependencies :

```shell
  yarn install
```

Start dev. HTTP server (http://0.0.0.0:8080) :

```shell
  yarn start
```
