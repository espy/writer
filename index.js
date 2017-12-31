var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app