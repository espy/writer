var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

class Thingy extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  wtf (e) {
    console.log('wtf', e)
    this.state.lol = 'erm'
    this.emit('render')
  }

  createElement (color, state, emit) {
    this.color = color
    this.state = state
    this.emit = emit
    this.wtf = this.wtf.bind(this)
    return html`
      <div style="background-color: ${color}" onclick=${this.wtf}>
        ${Math.random(1)}, ${this.state.synonyms.synonyms.length}
      </div>
    `
  }

  update (newColor) {
    return newColor !== this.color
  }
}

module.exports = Thingy
