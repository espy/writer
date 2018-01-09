const path = window.require('path')
const findInFolder = window.require('./common/find-in-folder')
const throttle = require('lodash.throttle')

module.exports = function (state, emitter) {
  state.search = undefined

  emitter.on('search:term', throttle(onSearch, 500, { trailing: true, leading: true }))

  function onSearch (term) {
    // Don’t search if term is empty or shorter than 3 chars
    if (!term || term.length <= 2) {
      onReset()
      return
    }
    const textsPath = path.join(state.paths.userData, 'texts')
    findInFolder(term, textsPath, (results) => {
      if (results) {
        state.search = {
          term,
          files: results
        }
      } else {
        state.search = {
          term,
          files: []
        }
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
