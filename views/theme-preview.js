const html = require('choo/html')

module.exports = view

function view (themeName, emit) {
  setTimeout(() => {
    emit('viewstate:remove', 'theme')
  }, 2000)
  return html`
    <div class='theme-preview-container'>
      <div class='theme-preview'>
        <div class='theme-preview--name'>Loaded the ${themeName} theme.</div>
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
