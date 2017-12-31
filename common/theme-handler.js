/*

Supports loading 100rabbits-style theme files, see
https://github.com/hundredrabbits/Themes

Appends a `<script>` element to the head and overrides the
default css vars defined in `assets/main.css`.

*/

module.exports = function (state, emitter) {
  emitter.on('thm:load', loadTheme)

  function loadTheme (path, rawTheme) {
    const theme = JSON.parse(rawTheme)
    const oldTheme = document.getElementById('theme-container')
    if (oldTheme) oldTheme.remove()
    const style = document.createElement('style')
    const css = `
    :root {
      --background: ${theme.background};
      --f_high: ${theme.f_high};
      --f_med: ${theme.f_med};
      --f_low: ${theme.f_low};
      --f_inv: ${theme.f_inv};
      --b_high: ${theme.b_high};
      --b_med: ${theme.b_med};
      --b_low: ${theme.b_low};
      --b_inv: ${theme.b_inv};
    }
    `
    style.type = 'text/css'
    style.id = 'theme-container'
    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }
    document.head.appendChild(style)
    const themeName = path.split('/').pop().split('.').shift()
    console.log(` 🎨 Loaded the ${themeName} theme.`)
    emitter.emit('viewstate:add', {
      key: 'theme',
      value: themeName
    })
  }
}
