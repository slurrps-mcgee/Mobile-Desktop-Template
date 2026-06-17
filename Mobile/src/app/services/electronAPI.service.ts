// Electron Service to access Electron APIs
import { Injectable } from '@angular/core';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
    providedIn: 'root',
})

export class ElectronAPIService {
    constructor() {}

    isElectron(): boolean {
        return window.electronApi?.isElectron ?? false;
    }

    logStartup(message: string): void {
        window.electronApi?.logStartup(message);
    }

    getRuntime(): { isElectron: boolean; platform: string; electronVersion: string } {
        return window.electronApi?.getRuntime() ?? { isElectron: false, platform: '', electronVersion: '' };
    }
}

