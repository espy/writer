module.exports = function (state, emitter) {
  function setDefaults () {
    state.synonyms = {
      synonyms: [],
      currentSynonym: 0,
      originalWordStart: undefined,
      originalWordEnd: undefined,
      originalWord: undefined
    }
  }

  setDefaults()

  emitter.on('synonyms:show', showSynonyms)

  function showSynonyms ({synonyms, originalWordStart, originalWordEnd, originalWord}) {
    if (!synonyms || synonyms.length === 0) return
    const cleanedSynonyms = synonyms.filter((synonym) => {
      return synonym.toLowerCase() !== originalWord.toLowerCase()
    })
    if (cleanedSynonyms.length === 0) return
    state.synonyms.synonyms = cleanedSynonyms
    state.synonyms.originalWordStart = originalWordStart
    state.synonyms.originalWordEnd = originalWordEnd
    state.synonyms.originalWord = originalWord
    emitter.emit('render')
  }

  emitter.on('synonyms:next', nextSynonym)

  function nextSynonym () {
    state.synonyms.currentSynonym = state.synonyms.currentSynonym + 1
    if (state.synonyms.currentSynonym > state.synonyms.synonyms.length - 1) {
      state.synonyms.currentSynonym = 0
    }
    emitter.emit('render')
  }

  emitter.on('synonyms:prev', prevSynonym)

  function prevSynonym () {
    state.synonyms.currentSynonym = state.synonyms.currentSynonym - 1
    if (state.synonyms.currentSynonym < 0) {
      state.synonyms.currentSynonym = state.synonyms.synonyms.length - 1
    }
    emitter.emit('render')
  }

  emitter.on('synonyms:reset', resetSynonym)

  function resetSynonym () {
    setDefaults()
    emitter.emit('render')
  }
}
