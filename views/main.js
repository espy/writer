const html = require('choo/html')
const fileBrowser = require('./file-browser')
const TextPane = require('./text-pane')
const textPane = new TextPane()
const footer = require('./footer')

module.exports = view

function view (state, emit) {
  function onDrop (e) {
    emit('drop', e)
  }

  return html`
    <body class="sans-serif" ondrop=${onDrop}>
      ${fileBrowser(state, emit)}
      ${state.params.date
        ? textPane.render(state, emit)
        : ''
      }
      ${footer(state, emit)}
    </body>
  `
}
