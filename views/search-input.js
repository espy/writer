const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

class SearchInput extends Nanocomponent {
  createElement (state, emit) {
    this.state = state
    this.emit = emit
    this.onKeyUp = this.onKeyUp.bind(this)

    return html`
      <input type='text' onkeyup=${this.onKeyUp} id='search-input'></input>
    `
  }

  // Should the component re-render?
  update (state, emit) {
    return false
  }

  onKeyUp (e) {
    // ESC
    // FIX: only if ESC and in search mode, this.state.search is wrong
    if (e.keyCode === 27 && this.state.search) {
      document.getElementById('editor').focus()
      document.getElementById('search-input').value = ''
      this.emit('search:reset')
    } else {
      this.emit('search:term', e.target.value)
    }
  }
}

module.exports = SearchInput
