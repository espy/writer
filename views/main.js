const html = require('choo/html')
const fileBrowser = require('./file-browser')
const textPane = require('./text-pane')
const footer = require('./footer')
const Thingy = require('./component')
const component = new Thingy()

module.exports = view

function view (state, emit) {
  return html`
    <body class="sans-serif">
      ${fileBrowser(state, emit)}
      ${state.params.date
        ? textPane(state, emit)
        : ''
      }
      ${footer(state, emit)}
      ${component.render('red')}
    </body>
  `
}
