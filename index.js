const css = require('sheetify')
const choo = require('choo')

css('tachyons')
css('./assets/main.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

// Stores
app.use(require('./stores/text-store'))
app.use(require('./stores/synonym-store'))

app.route('/', require('./views/main'))
app.route('/day/:date', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
