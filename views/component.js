var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

class Thingy extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  createElement (color) {
    this.color = color
    return html`
      <div style="background-color: ${color}">
        Color is ${color}, ${Math.random(1)}
      </div>
    `
  }

  update (newColor) {
    return newColor !== this.color
  }
}

module.exports = Thingy
