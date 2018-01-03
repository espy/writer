const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

class SearchInput extends Nanocomponent {
  createElement (state, emit) {
    this.state = state
    this.emit = emit
    this.onKeyUp = this.onKeyUp.bind(this)

    return html`
      <input type='text' onkeyup=${this.onKeyUp}></input>
    `
  }

  // Should the component re-render?
  update (state, emit) {
    return false
  }

  onKeyUp (e) {
    this.emit('search:term', e.target.value)
  }
}

module.exports = SearchInput
