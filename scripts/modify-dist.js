// Bankai outputs dist/index.js with absolute paths, but Electron doesn’t
// like that, so we remove those extra slashies and make all src and href
// attributes relative.
const shell = require('shelljs')
shell.sed('-i', /(href|src)="\//g, '$1="', 'dist/index.html')
shell.echo('- - - - - - - - - - - - - - - - - - - - - - -')
shell.echo('Made src and href relative in dist/index.html')
shell.echo('- - - - - - - - - - - - - - - - - - - - - - -')
