const path = window.require('path')
const fs = window.require('fs')

module.exports = (state, emitter) => {
  state.themes = []
  const themePath = path.join(state.paths.extraResources, 'themes')
  if (themePath) {
    fs.readdir(themePath, function (err, items) {
      console.log('available built-in themes: ', items)
      if (err) {
        console.log('error loading bundled themes:', err)
      }
    })
  }
}
