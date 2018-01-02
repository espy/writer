const {remote} = window.require('electron')
const path = window.require('path')
// For details on window.require
//   see https://github.com/electron/electron/issues/7300
//   and https://github.com/chentsulin/electron-react-boilerplate/issues/374

/*

Because paths in Electron are weird (see below), there is now `state.paths` to make sure you always get the correct paths to `extraResources` and `userData`.

Note that `userData` contains the hard-coded app name, if that changes, you need to change this.

*/

module.exports = (state, emit) => {
  // remote.process.cwd() is basically the only correct path returned by Electron when in development
  console.log('remote.process.resourcesPath', remote.process.resourcesPath)
  console.log('remote.app.getPath(appData)', remote.app.getPath('appData'))
  const extraResources = remote.process.env.NODE_ENV === 'development' ? path.join(remote.process.cwd(), 'electron_dist', 'mac', 'writer.app', 'Contents', 'Resources', 'extra-resources') : path.join(remote.process.resourcesPath, 'extra-resources')
  const userData = path.join(remote.app.getPath('appData'), 'writer')
  state.paths = {
    extraResources,
    userData
  }
}

  /*
  Paths in Electron are weird.
  Development:
  - choo is running via Bankai (npm run dev), electron is wrapping choo (npm start)
  - process.env.NODE_ENV is 'development'
  - electron paths to the app are ALL WRONG, they all point to `node_modules/electron` (there’s a point about this in their FAQ, but it doesn’t help in this case: https://github.com/electron/electron/blob/master/docs/faq.md#requireelectronxxx-is-undefined)
  - window.require('electron') gets: `/Users/espy/Sites/writer/node_modules/electron/dist/Electron.app/Contents/Resources/electron.asar/renderer/api/exports/electron.js`, which is useless.
  - remote.process.resourcesPath gets: `/Users/espy/Sites/writer/node_modules/electron/dist/Electron.app/Contents/Resources`, which is also wrong
  - remote.app.getPath(userData) gets:
  `/Users/espy/Library/Application Support/Electron`, almost correct
  - remote.app.getAppPath() gets: `/Users/espy/Sites/writer/node_modules/electron/dist/Electron.app/Contents/Resources/default_app.asar`, again, useless
  - app.getPath(appData) gets: `/Users/espy/Library/Application Support`, which is actually correct!
  - app.getPath(temp) gets `/var/folders/df/d4gk92hs7ts317rs0wgrntdc0000gn/T/`, also correct!
  - app.getPath(exe) gets: `/Users/espy/Sites/writer/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron`, total rubbish.

  Same vars in the bundled app (npm run build) are all correct:
  - window.require('electron') gets: `/Users/espy/Sites/writer/electron_dist/mac/writer.app/Contents/Resources/electron.asar/renderer/api/exports/electron.js`
  - remote.process.resourcesPath gets: `/Users/espy/Sites/writer/electron_dist/mac/writer.app/Contents/Resources`
  - remote.app.getPath(userData) /Users/espy/Library/Application Support/writer
  - remote.app.getAppPath() /Users/espy/Sites/writer/electron_dist/mac/writer.app/Contents/Resources/app.asar
  - app.getPath(appData) /Users/espy/Library/Application Support
  - app.getPath(temp) /var/folders/df/d4gk92hs7ts317rs0wgrntdc0000gn/T/
  - app.getPath(exe) /Users/espy/Sites/writer/electron_dist/mac/writer.app/Contents/MacOS/writer
  */
