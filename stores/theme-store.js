const path = window.require('path')
const fs = window.require('fs-extra')

module.exports = (state, emitter) => {
  state.themes = []
  const internalThemePath = path.join(state.paths.extraResources, 'themes')
  const userThemePath = path.join(state.paths.userData, 'themes')

  function firstRun () {
    fs.copy(internalThemePath, userThemePath, (err) => {
      if (err) {
        console.log('error copying default themes to the userdata folder:', err)
      }
      emitter.emit('themes:available', userThemePath)
    })
  }

  fs.readdir(state.paths.userData, (err, items) => {
    if (items.indexOf('themes') === -1) {
      console.log('No themes in user folder')
      firstRun()
    } else {
      emitter.emit('themes:available', userThemePath)
    }
    if (err) {
      console.log('error checking out the userdata folder:', err)
    }
  })

  emitter.on('themes:available', loadThemes)

  function loadThemes (path) {
    if (path) {
      fs.readdir(path, function (err, items) {
        console.log('available themes: ', items)
        if (err) {
          console.log('error loading user themes:', err)
        }
      })
    }
  }
}
