const {app, BrowserWindow} = require('electron')
const path = require('node:path')

const indexWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'index/preload.js')
        }
    })

    win.webContents.openDevTools()
    win.loadFile('src/index/index.html')
}

app.whenReady().then(() => {
    indexWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            indexWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
