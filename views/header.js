const html = require('choo/html')
const SearchInput = require('./search-input')
const searchInput = new SearchInput()

module.exports = view

function view (state, emit) {
  return html`<header>
    ${searchInput.render(state, emit)}
  </header>`
}
