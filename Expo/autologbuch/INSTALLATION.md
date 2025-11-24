# 🚀 Installation & Setup Guide - Expo Autologbuch

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Expo Go App auf Smartphone (für Tests)
- Optional: Android Studio oder Xcode für native Builds

## 📥 Installation

### Schritt 1: Dependencies installieren

```bash
cd Expo/autologbuch
npm install
```

### Schritt 2: Expo CLI (global) installieren (optional)

```bash
npm install -g expo-cli
```

## 🏃 App starten

### Development Server

```bash
npx expo start
```

Nach dem Start öffnet sich Metro Bundler im Browser mit folgenden Optionen:

- **`a`** - Android Emulator/Gerät öffnen
- **`i`** - iOS Simulator öffnen (nur macOS)
- **`w`** - Web-Browser öffnen
- **`r`** - Reload App
- **`m`** - Toggle Menu

### QR-Code scannen

1. Installiere **Expo Go** auf deinem Smartphone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scanne den QR-Code im Terminal/Browser mit:
   - **iOS**: Kamera-App
   - **Android**: Expo Go App

## 🔧 Platform-spezifische Befehle

### Android

```bash
# Android Emulator starten
npm run android

# Oder direkt mit Expo
npx expo start --android
```

### iOS (nur macOS)

```bash
# iOS Simulator starten
npm run ios

# Oder direkt mit Expo
npx expo start --ios
```

### Web

```bash
# Web-Version im Browser
npm run web

# Oder direkt mit Expo
npx expo start --web
```

## 📱 Berechtigungen

Die App benötigt GPS-Berechtigungen für das Fahrtenbuch:

### iOS
- Automatisch über `app.json` konfiguriert
- Beim ersten Start wird nach Location-Berechtigung gefragt
- "Always Allow" für Hintergrund-Tracking empfohlen

### Android
- Automatisch über `app.json` konfiguriert
- Beim ersten Start wird nach Location-Berechtigung gefragt
- "Allow all the time" für Hintergrund-Tracking empfohlen

## 🗄️ Datenbank

Die SQLite-Datenbank wird automatisch beim ersten Start erstellt:

- **Speicherort**: App-spezifischer Documents-Ordner
- **Dateiname**: `autologbuch.db`
- **Schema**: Automatisch mit 3 Tabellen initialisiert

## 🐛 Troubleshooting

### Problem: "Cannot find module 'expo-sqlite'"

**Lösung**:
```bash
npm install
npx expo start --clear
```

### Problem: Location-Berechtigung funktioniert nicht

**Lösung iOS**:
1. Einstellungen → Datenschutz → Ortungsdienste
2. Expo Go → "Beim Verwenden der App" oder "Immer"

**Lösung Android**:
1. Einstellungen → Apps → Expo Go → Berechtigungen
2. Standort → "Jederzeit zulassen"

### Problem: Metro Bundler startet nicht

**Lösung**:
```bash
# Cache löschen
npx expo start --clear

# Oder Node Modules neu installieren
rm -rf node_modules
npm install
```

### Problem: Build-Fehler bei Dependencies

**Lösung**:
```bash
# Lockfile löschen und neu installieren
rm package-lock.json
rm -rf node_modules
npm install
```

## 🏗️ Production Build

### Expo Application Services (EAS)

1. **EAS CLI installieren**:
```bash
npm install -g eas-cli
```

2. **Bei Expo anmelden**:
```bash
eas login
```

3. **Build konfigurieren**:
```bash
eas build:configure
```

4. **Android APK erstellen**:
```bash
eas build --platform android --profile preview
```

5. **iOS Build erstellen** (benötigt Apple Developer Account):
```bash
eas build --platform ios --profile preview
```

### Lokaler Build (Alternative)

#### Android (APK)

```bash
# Expo erstellt einen lokalen Build
npx expo prebuild
cd android
./gradlew assembleRelease
```

Die APK findest du dann unter:
`android/app/build/outputs/apk/release/app-release.apk`

## 📊 Development Tools

### TypeScript Type-Checking

```bash
# Type-Check ausführen
npx tsc --noEmit
```

### Expo Doctor (Projekt prüfen)

```bash
npx expo-doctor
```

## 🔄 Updates

### Dependencies aktualisieren

```bash
# Expo SDK Update
npx expo install --fix

# Einzelne Packages
npm update
```

## 📖 Weitere Ressourcen

- [Expo Dokumentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

## ✅ Checkliste für ersten Start

- [ ] Node.js installiert (v18+)
- [ ] Dependencies installiert (`npm install`)
- [ ] Expo Go App auf Smartphone installiert
- [ ] Development Server gestartet (`npx expo start`)
- [ ] QR-Code gescannt oder Emulator gestartet
- [ ] Location-Berechtigung erteilt
- [ ] Erstes Fahrzeug hinzugefügt
- [ ] Erste Fahrt gestartet

## 🎯 Quick Start Zusammenfassung

```bash
# Kompletter Setup in 3 Befehlen:
cd Expo/autologbuch
npm install
npx expo start
```

Dann QR-Code mit Expo Go scannen und App nutzen! 🚀

---

Bei Problemen oder Fragen: Siehe Troubleshooting-Sektion oben.
