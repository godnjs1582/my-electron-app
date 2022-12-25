//controls main process
const { app, BrowserWindow, ipcMain, nativeTheme } =require("electron")
const path = require("path")
//app, which controls your application's event lifecycle
//browserwindow, which creates and manages app windows 
const createWindow = () =>{
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload:path.join(__dirname,"preload.js")
        },
    })
    ipcMain.handle('ping', ()=>'pong')
    win.loadFile('index.html')

    ipcMain.handle('dark-mode:toggle',()=>{
        if(nativeTheme.shouldUseDarkColors){
            nativeTheme.themeSource="light"
        }else{
            nativeTheme.themeSource="dark"
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle("dark-mode:system",()=>{
        nativeTheme.themeSource="system"
    })
}




//createWindow() function loads your web page into a new BrowserWindow instance

app.whenReady().then(()=>{
    createWindow()
})

// app.on('window-all-closed',()=>{
//     if(process.platform!=='darwin') app.quit()
// })
//window와 linux에서!!

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length===0) createWindow()
})

