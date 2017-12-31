const html = require('choo/html')

module.exports = view

function view (state, emit) {
  const currentText = state.texts.find((text) => {
    return text.date === state.params.date
  }) || {
    text: ''
  }
  return html`
    <footer>
    ${currentText.chars && currentText.words
      ? html`<span>${currentText.chars}C ${currentText.words}W ${Math.ceil(currentText.chars / 70)}L</span>`
      : ''
    }
    </footer>
  `
}
