/**
 * eStat "mu" library lazy loader.
 * @function
 * @param {function} The library loaded callback.
 * @param {string} The library version. (Default is '5.4')
 */
export default function (cb, version = '5.4') {
  let win = window
  let doc = document
  let el = 'script'

  if (win.eStatTag) {
    if (typeof cb === 'function') cb()

    return
  }

  let first = doc.getElementsByTagName(el)[0]
  let script = doc.createElement(el)

  script.src = 'https://prof.estat.com/js/mu-' + version + '.js'
  script.async = true
  if (typeof cb === 'function') script.onload = cb
  first.parentNode.insertBefore(script, first)
}
