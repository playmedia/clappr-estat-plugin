# Clappr eStat streaming Plugin

[Mediametrie eStat streaming](http://www.mediametrie-estat.com/estatstreaming/) plugin for [Clappr](https://github.com/clappr/clappr) video player.

This plugin use the eStat streaming "DS" manual tracker. The "DS" tracker is compatible with any player playback type.

__Experimental :__ This plugin may work only with eStat streaming library version `4.0.36` or compatible. (It is a fairly old version!)

# Usage

Add both Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="http://cdn.clappr.io/latest/clappr.min.js"></script>
  <script type="text/javascript" src="dist/clappr-estat-plugin.js"></script>
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
    serial: 'ESTAT-STREAMING-SERIAL',
    session: {
      videoName: 'Video name',
      level1: 'Level 1 value',
      level2: 'Level 2 value',
      level3: 'Level 3 value',
      level4: 'Level 4 value',
      level5: 'Level 5 value',
      genre: 'Video genre',
    },
  }
});
```

`serial` property must be the eStat serial provided by Mediametrie.

`session` property must be a plain Object with eStat player session properties. For more details, read eStat streaming manual provided by Mediametrie.

`readyCallback` property is an optional callback function called when eStat library is ready.

This plugin also add `estatNewSession` method to Clappr player instance. This optional method may be used for live stream to create a new session when program change or for load another video source without destroying player or changing options.

```javascript
player.estatNewSession({
  videoName: 'Another video name',
  level1: 'Level 1 value',
  level2: 'Level 2 value',
  level3: 'Level 3 value',
  level4: 'Level 4 value',
  level5: 'Level 5 value',
  genre: 'Another video genre',
})
```

Keep in mind that using this method for live stream will increase significantly session count.

# Development

Install dependencies :

```shell
  npm install
```

Dev. build :

```shell
  npm run dev
```

Dist build :

```shell
  npm run dist
```

Watch mode :

```shell
  npm run watch
```

Start HTTP server (http://0.0.0.0:8080/demo/) :

```shell
  npm run demo
```
