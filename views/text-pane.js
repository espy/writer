const html = require('choo/html')
const Nanocomponent = require('nanocomponent')
const synonyms = require('../common/synonyms_en_us')()

class TextPane extends Nanocomponent {
  createElement (state, emit) {
    this.state = state
    this.emit = emit
    this.onInputChange = this.onInputChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.currentText = this.getCurrentText()

    return html`
    <section class='text-pane'>
      <textarea
        onkeyup=${this.onInputChange}
        onkeydown=${this.onKeyDown}>
        ${this.currentText.text}
      </textarea>
    </section>
    `
  }

  // Should the component re-render?
  update (state, emit) {
    // return true (do re-render) if the current text isn’t for the current date
    return this.state.params.date !== this.currentText.date
  }

  getCurrentText () {
    return this.state.texts.find((text) => {
      return text.date === this.state.params.date
    }) || {
      text: ''
    }
  }

  resetSynonymState (e) {
    if (this.state.synonyms.synonyms && this.state.synonyms.synonyms.length > 0) {
      this.emit('synonyms:reset')
    }
  }

  onInputChange (e) {
    if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
      return
    }
    this.emit('text:update', {
      date: this.currentText.date,
      name: this.currentText.name,
      text: e.target.value,
      chars: e.target.value.length,
      words: e.target.value.split(' ').length
    })
    // Always reset if not TAB or SHIFT-TAB or ENTER
    this.resetSynonymState(e)
  }

  onKeyDown (e) {
    // TAB
    if (e.keyCode === 9) {
      e.preventDefault()
      // already displaying a list of synonyms
      if (this.state.synonyms.synonyms && this.state.synonyms.synonyms.length > 0) {
        // Let’s navigate up and down in that list
        if (e.shiftKey) {
          this.emit('synonyms:prev')
        } else {
          this.emit('synonyms:next')
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
        this.emit('synonyms:show', {synonyms: selection, originalWordStart: result.index, originalWordEnd: endPos, originalWord: selectedWord})
      }
      return
    }
    // Enter to apply the currently active synonym
    if (e.keyCode === 13 && this.state.synonyms.synonyms && this.state.synonyms.synonyms.length > 0) {
      e.preventDefault()
      // replace selected word
      const synonym = this.state.synonyms.synonyms[this.state.synonyms.currentSynonym]
      const updatedText = e.target.value.substring(0, this.state.synonyms.originalWordStart) + synonym + e.target.value.substring(this.state.synonyms.originalWordEnd)
      // Update the textfield value
      e.target.value = updatedText
      // Re-apply the caret position
      const selectionEnd = this.state.synonyms.originalWordStart + synonym.length
      e.target.setSelectionRange(selectionEnd, selectionEnd)
      // Store the updated text
      this.emit('text:update', {
        date: this.currentText.date,
        name: this.currentText.name,
        text: updatedText,
        chars: e.target.value.length,
        words: e.target.value.split(' ').length
      })
      this.resetSynonymState(e)
      return
    }
    // ESC
    if (e.keyCode === 27) {
      this.resetSynonymState(e)
    }
  }
}

module.exports = TextPane
