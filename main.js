var resolvePath = require('electron-collection/resolve-path')
var defaultMenu = require('electron-collection/default-menu')
var electron = require('electron')
const windowStateKeeper = require('electron-window-state')

var BrowserWindow = electron.BrowserWindow
var Menu = electron.Menu
var app = electron.app

var win

var windowStyles = {
  titleBarStyle: 'hidden-inset',
  minWidth: 640,
  minHeight: 395,
  show: false
}

app.setName('writer-electron')

var shouldQuit = app.makeSingleInstance(createInstance)
if (shouldQuit) app.quit()

app.on('ready', function () {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 640,
    defaultHeight: 1000
  })

  windowStyles.x = mainWindowState.x
  windowStyles.y = mainWindowState.y
  windowStyles.width = mainWindowState.width
  windowStyles.height = mainWindowState.height

  win = new BrowserWindow(windowStyles)
  mainWindowState.manage(win)
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

  win.on('ready-to-show', function () {
    win.show()
    win.focus()
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
