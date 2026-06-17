import { contextBridge, ipcRenderer } from 'electron';

const runtime = {
    isElectron: Boolean(process.versions?.electron),
    platform: process.platform,
    electronVersion: process.versions?.electron ?? '',
};

contextBridge.exposeInMainWorld('electronApi', {
    isElectron: runtime.isElectron,
    logStartup: (message) => ipcRenderer.send('desktop-log', message),
    getRuntime: () => runtime,
});