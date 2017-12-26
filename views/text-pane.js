const html = require('choo/html')
const synonyms = require('../common/synonyms_en_us')()

function view (state, emit) {
  console.log('rendering')
  let currentText = state.texts.find((text) => {
    return text.date === state.params.date
  }) || {
    text: ''
  }

  function resetSynonymState (e) {
    if (state.synonyms.synonyms && state.synonyms.synonyms.length > 0) {
      console.log('cursor to ', state.synonyms.originalWordEnd)
      const end = state.synonyms.originalWordEnd
      emit('synonyms:reset')
      // FIX: setting the selection is probably reverted by another emit
      e.target.focus()
      // neither works
      // e.target.setSelectionRange(end, end)
      e.target.selectionEnd = end
    }
  }

  function onInputChange (e) {
    if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
      return
    }
    emit('text:update', {
      date: currentText.date,
      name: currentText.name,
      text: e.target.value,
      chars: e.target.value.length,
      words: e.target.value.split(' ').length
    })
    // Always reset if not TAB or SHIFT-TAB or ENTER
    resetSynonymState(e)
  }

  function onKeyDown (e) {
    // TAB
    if (e.keyCode === 9) {
      e.preventDefault()
      // already displaying a list of synonyms
      if (state.synonyms.synonyms && state.synonyms.synonyms.length > 0) {
        // Let’s navigate up and down in that list
        if (e.shiftKey) {
          emit('synonyms:prev')
        } else {
          emit('synonyms:next')
        }
        return
      }
      // nothing selected
      if (e.target.selectionStart === e.target.selectionEnd) {
        // get the word under or before the cursor
        // get the position of the last space after the selectionEnd (end of the word under the caret)
        var endPos = e.target.value.indexOf(' ', e.target.selectionEnd)
        // If there is none, the last char of the text is the end of the current word
        if (endPos === -1) endPos = e.target.value.length
        // Between the start of the text and the end of the current word, look for whitespace
        var result = /\S+$/.exec(e.target.value.slice(0, endPos))
        console.log('wordStart', result.index, 'wordEnd', endPos)
        var selectedWord = result ? result[0] : null
        // strip any special chars from the end of the word
        if (selectedWord) selectedWord = selectedWord.replace(/['";:,.\/?!\\-]$/, '')
        const selection = synonyms[selectedWord.toLowerCase()]
        console.log(selectedWord, selection)
        emit('synonyms:show', {synonyms: selection, originalWordStart: result.index, originalWordEnd: endPos, originalWord: selectedWord})
      }
      return
    }
    // Enter to apply the currently active synonym
    if (e.keyCode === 13 && state.synonyms.synonyms && state.synonyms.synonyms.length > 0) {
      // replace selected word
      const synonym = state.synonyms.synonyms[state.synonyms.currentSynonym]
      const updatedText = e.target.value.substring(0, state.synonyms.originalWordStart) + synonym + e.target.value.substring(state.synonyms.originalWordEnd)
      emit('text:update', {
        date: currentText.date,
        name: currentText.name,
        text: updatedText,
        chars: e.target.value.length,
        words: e.target.value.split(' ').length,
        selection: [state.synonyms.originalWordEnd, state.synonyms.originalWordEnd]
      })
      resetSynonymState(e)
      return
    }
    // ESC
    if (e.keyCode === 27) {
      resetSynonymState(e)
    }
  }

  return html`
    <section class='text-pane'>
      <textarea
        onkeyup=${onInputChange}
        onkeydown=${onKeyDown}>
        ${currentText.text}
      </textarea>
    </section>
  `
}

module.exports = view
