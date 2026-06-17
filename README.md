# Mobile + Desktop Template

This repository includes:

1. Mobile app in `Mobile` (Ionic + Angular + Capacitor)
2. Desktop app in `Desktop` (Electron shell)

## Prerequisites

1. Install Node.js and npm
2. Install Ionic CLI globally:

```bash
npm install -g @ionic/cli
```

3. For Android builds:
	- Android Studio
	- Android SDK
	- Java 17+

## Install Dependencies

1. Install mobile dependencies:

```bash
cd Mobile
npm install
```

2. Install desktop dependencies:

```bash
cd ../Desktop
npm install
```

## Run Desktop App

1. Build the Ionic app for Electron file loading:

```bash
cd ../Mobile
ionic build -- --base-href ./ --deploy-url ./
```

2. Start Electron:

```bash
cd ../Desktop
npm start
```

## Debug Desktop App

1. Rebuild web assets after mobile code changes:

```bash
cd ../Mobile
ionic build -- --base-href ./ --deploy-url ./
```

2. Relaunch Electron:

```bash
cd ../Desktop
npm start
```

3. Open Electron DevTools:
	- `Ctrl+Shift+I` on Linux/Windows
	- Menu: `View -> Toggle Developer Tools`

### Desktop Troubleshooting

If the window is blank/black:

1. Confirm `Desktop/main.js` loads `../Mobile/www/index.html`
2. Confirm the mobile build used `--base-href ./ --deploy-url ./`

## Run Mobile App (Browser)

```bash
cd Mobile
ionic serve
```

## Build and Run Mobile App (Android)

1. Build web assets:

```bash
cd Mobile
ionic build
```

2. Add Android platform (first time only):

```bash
npx cap add android
```

```bash
export CAPACITOR_ANDROID_STUDIO_PATH="$HOME/.local/bin/android-studio-flatpak"
```

3. Sync assets into native Android project:

```bash
npx cap sync android
```

4. Open in Android Studio:

```bash
source ~/.bashrc
echo "$CAPACITOR_ANDROID_STUDIO_PATH"
npx cap open android
```

## Debug Mobile App

### Browser Debug

1. Run `ionic serve`
2. Use browser DevTools

### Android Debug

1. Open Android Studio with `npx cap open android`
2. Run on emulator/device
3. Use Logcat and Chrome remote debugging for WebView

## Package Desktop App

1. Build mobile web assets for Electron first:

```bash
cd ../Mobile
ionic build -- --base-href ./ --deploy-url ./
```

2. Package Electron app:

```bash
cd ../Desktop
npm run package
```

3. Find packaged output in `Desktop/out` (or `Desktop/out/make` depending on maker).

## Package Mobile App (Android)

### Option 1: Build from Android Studio (recommended)

1. Build and sync web assets:

```bash
cd Mobile
ionic build
npx cap sync android
```

2. Open Android Studio:

```bash
npx cap open android
```

3. In Android Studio:
	- For APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
	- For Play Store: `Build > Generate Signed Bundle / APK > Android App Bundle`

### Option 2: Build from CLI with Gradle

1. Build and sync web assets:

```bash
cd Mobile
ionic build
npx cap sync android
```

2. Build debug APK:

```bash
cd android
./gradlew assembleDebug
```

3. Build release AAB:

```bash
./gradlew bundleRelease
```

4. Output locations:
	- Debug APK: `Mobile/android/app/build/outputs/apk/debug/`
	- Release AAB: `Mobile/android/app/build/outputs/bundle/release/`

## Useful Paths

1. Mobile source: `Mobile/src`
2. Mobile web build: `Mobile/www`
3. Electron main process: `Desktop/main.js`
4. Electron preload script: `Desktop/preload.js`