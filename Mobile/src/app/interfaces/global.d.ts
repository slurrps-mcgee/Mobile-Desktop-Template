export interface IRuntime {
    isElectron: boolean;
    platform: string;
    electronVersion: string;
}
export interface IElectronAPI {
    isElectron: boolean;
    logStartup: (message: string) => void;
    getRuntime: () => IRuntime;
}

//Used to declare the desktop API available on the window object in an Electron environment.
declare global {
  interface Window {
    electronApi?: IElectronAPI;
  }
}
