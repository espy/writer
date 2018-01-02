var resolvePath = require('electron-collection/resolve-path')
var defaultMenu = require('electron-collection/default-menu')
var electron = require('electron')

var BrowserWindow = electron.BrowserWindow
var Menu = electron.Menu
var app = electron.app

var win

var windowStyles = {
  width: 800,
  height: 1000,
  titleBarStyle: 'hidden-inset',
  minWidth: 640,
  minHeight: 395
}

app.setName('writer-electron')

var shouldQuit = app.makeSingleInstance(createInstance)
if (shouldQuit) app.quit()

app.on('ready', function () {
  win = new BrowserWindow(windowStyles)
  var indexPath = process.env.NODE_ENV === 'development'
  ? resolvePath('./index.html')
  : resolvePath('./index_prod.html')
  win.loadURL('file://' + indexPath)

  win.webContents.on('did-finish-load', function () {
    win.show()
    var menu = Menu.buildFromTemplate(defaultMenu(app, electron.shell))
    Menu.setApplicationMenu(menu)
    if (process.env.NODE_ENV === 'development') {
      win.webContents.openDevTools({ mode: 'detach' })
    }
  })

  win.on('closed', function () {
    win = null
  })
})

app.on('window-all-closed', function () {
  app.quit()
})

function createInstance () {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}
