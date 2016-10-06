/**
 * eStat "mu" library lazy loader.
 * @function
 * @param {function} The library loaded callback.
 * @param {string} The library version. (Default is '5.2')
 * @param {boolean} Set to true to load the debug/integration version of library.
 * @param {boolean} Set to true to force HTTPS load protocol. (Default behaviour is to match current protocol)
 */
export default function (cb, version='5.2', debug, secure) {
  let win = window, doc = document, el = 'script'

  if (win.eStatTag) {
    if (typeof cb === 'function') cb()

    return
  }

  let s = secure === true ? 'https:' : ''
  let d = debug === true ? 'integration-' : ''
  let first = doc.getElementsByTagName(el)[0]
  let script = doc.createElement(el)

  script.src = s + '//prof.estat.com/js/mu-' + d + version + '.js'
  script.async = true
  if (typeof cb === 'function') script.onload = cb
  first.parentNode.insertBefore(script, first)
}
