const html = require('choo/html')

const css = require('sheetify')
css('./theme-preview.css')

module.exports = view

function view (themeName, emit) {
  // Remove the viewstate describing this element, so
  // its parent will remove it from the dom
  setTimeout(() => {
    emit('viewstate:remove', 'theme')
  }, 2000)
  return html`
    <div class='theme-preview-container'>
      <div class='theme-preview'>
        <div class='theme-preview--description'>Loaded the <span class='theme-preview--name'>${themeName}</span> theme</div>
        <div class='theme-preview--swatch f-high'></div>
        <div class='theme-preview--swatch f-med'></div>
        <div class='theme-preview--swatch f-low'></div>
        <div class='theme-preview--swatch f-inv'></div>
        <div class='theme-preview--swatch b-high'></div>
        <div class='theme-preview--swatch b-med'></div>
        <div class='theme-preview--swatch b-low'></div>
        <div class='theme-preview--swatch b-inv'></div>
      </div>
    </div>
  `
}
