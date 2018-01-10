const html = require('choo/html')
const fileBrowser = require('./file-browser')
const TextPane = require('./text-pane')
const textPane = new TextPane()
const themePreview = require('./theme-preview')
const header = require('./header')
const footer = require('./footer')

module.exports = view

function view (state, emit) {
  function onDrop (e) {
    emit('drop', e)
  }
  function onDragOver (e) {
    return false
  }
  function onDragLeave (e) {
    return false
  }
  function onDragEnd (e) {
    return false
  }

  return html`
    <body
      ondrop=${onDrop}
      ondragover=${onDragOver}
      ondragleave=${onDragLeave}
      ondragend=${onDragEnd}
    >
      ${header(state, emit)}
      ${fileBrowser(state, emit)}
      ${textPane.render(state, emit)}
      ${state.viewstate.theme && themePreview(state.viewstate.theme, emit)}
      ${footer(state, emit)}
    </body>
  `
}
