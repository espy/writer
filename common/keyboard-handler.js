module.exports = function (state, emitter) {
  document.onkeydown = (e) => {
    // ESC
    if (e.keyCode === 27) {
      if (state.synonyms && state.synonyms.synonyms && state.synonyms.synonyms.length > 0) {
        emitter.emit('synonyms:reset')
      } else {
        if (!state.search) {
          document.getElementById('search-input').focus()
        }
      }
    }
  }
}
