import { Component } from '@angular/core';
import { ElectronAPIService } from '../../services/electronAPI.service';
import { Capacitor } from '@capacitor/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  startupEnvironment = 'detecting...';
  startupDetails = '';

  constructor(private electronAPI: ElectronAPIService) {
    this.detectStartupEnvironment();
  }

  private detectStartupEnvironment(): void {

    const userAgent = navigator.userAgent ?? '';
    const isElectronUserAgent = /electron/i.test(userAgent);
    const isDesktopElectron = this.electronAPI.isElectron() || isElectronUserAgent;

    if (isDesktopElectron) {
      const runtime = this.electronAPI.getRuntime();
      this.startupEnvironment = 'desktop (electron)';
      this.startupDetails = `platform=${runtime?.platform ?? 'unknown'} electron=${runtime?.electronVersion ?? 'unknown'}`;
      this.electronAPI.logStartup(`App started in desktop environment. ${this.startupDetails}`);
      console.log('[Startup] Desktop (Electron) environment detected.', {
        runtime,
        userAgent,
      });
      return;
    }

    const capacitorPlatform = Capacitor.getPlatform();
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
      this.startupEnvironment = `mobile (${capacitorPlatform})`;
      this.startupDetails = 'running in Capacitor native runtime';
      console.log('[Startup] Mobile native environment detected.', {
        capacitorPlatform,
        userAgent,
      });
      return;
    }

    this.startupEnvironment = 'web browser (ionic)';
    this.startupDetails = `platform=${capacitorPlatform}`;
    console.log('[Startup] Web browser environment detected.', {
      capacitorPlatform,
      userAgent,
    });
  }
}
