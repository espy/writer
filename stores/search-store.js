const path = window.require('path')
const findInFolder = window.require('./common/find-in-folder')

module.exports = function (state, emitter) {
  state.search = undefined

  emitter.on('search:term', onSearch)

  function onSearch (term) {
    if (!term || term.length <= 2) {
      onReset()
      return
    }
    const textsPath = path.join(state.paths.userData, 'texts')
    findInFolder(term, textsPath, (results) => {
      state.search = {
        term,
        files: results
      }
      emitter.emit('render')
    })
  }

  emitter.on('search:reset', onReset)

  function onReset () {
    state.search = undefined
    emitter.emit('render')
  }
}
