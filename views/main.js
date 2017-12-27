const html = require('choo/html')
const fileBrowser = require('./file-browser')
const TextPane = require('./text-pane')
const textPane = new TextPane()
const footer = require('./footer')

module.exports = view

function view (state, emit) {
  return html`
    <body class="sans-serif">
      ${fileBrowser(state, emit)}
      ${state.params.date
        ? textPane.render(state, emit)
        : ''
      }
      ${footer(state, emit)}
    </body>
  `
}
