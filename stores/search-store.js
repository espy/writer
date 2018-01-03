const path = window.require('path')
const grep = window.require('simple-grep')

module.exports = function (state, emitter) {
  state.search = undefined

  emitter.on('search:term', onSearch)

  function onSearch (term) {
    console.log('onSearch', term)
    if (!term || term.length <= 2) {
      onReset()
      return
    }
    const textsPath = path.join(state.paths.userData, 'texts')
    // Grep is called via exec, and it can’t handle spaces in paths
    // So we wrap the path in an extra set of quotes
    grep(term, `'${textsPath}'`, (results) => {
      state.search = {
        term,
        results
      }
      console.log('state.search', state.search)
      emitter.emit('render')
    })
  }

  emitter.on('search:reset', onReset)

  function onReset () {
    state.search = undefined
    emitter.emit('render')
  }
}
