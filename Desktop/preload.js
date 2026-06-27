// preload.cjs
const { contextBridge, ipcRenderer } = require('electron');

// Expose API to renderer process so that the renderer can call Electron main process methods safely
contextBridge.exposeInMainWorld('electronApi', {
    showMessageBox: (options) => ipcRenderer.invoke('desktop-show-message-box', options),
});