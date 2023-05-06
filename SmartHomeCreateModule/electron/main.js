// Модули для управления приложением и создания окна
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const url = require('url');
const Parser = require('./generateModule/generateModule')

function createWindow () {
  // Создаем окно браузера.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "create modules",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.webContents.openDevTools()

  // и загрузить index.html приложения.
  //mainWindow.loadFile('index.html')

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });

  ipcMain.on('app-close', (event, arg) => {
    app.quit()
  })

  ipcMain.on('save-module', (event, arg) => {
    Parser(arg)
  })
  
  mainWindow.loadURL(startUrl);
  // mainWindow.loadURL('http://localhost:3000');

  // Отображаем средства разработчика.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Выйти когда все окна закрыты
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})