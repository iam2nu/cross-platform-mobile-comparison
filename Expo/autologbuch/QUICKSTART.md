# AutoLogbuch - Expo - Quick Start

## 🚀 In 2 Schritten starten

### 1. Dependencies installieren
```bash
cd Expo/autologbuch
npm install
```

### 2. App starten
```bash
npm start
```

Dann wählen:
- **Android**: Drücke `a` (Emulator) oder scanne QR-Code mit Expo Go
- **iOS**: Drücke `i` (Simulator, nur macOS) oder scanne QR-Code
- **Web**: Drücke `w`

## 📱 Expo Go App

### Installation
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Verwendung
1. Expo Go öffnen
2. QR-Code scannen
3. App lädt automatisch

## 📋 Features testen

1. **Fahrzeug hinzufügen** - `+` Button auf Home Screen
2. **Wartung erfassen** - Fahrzeug auswählen → "Wartung hinzufügen"
3. **Fahrt starten** - "Fahrt starten" → GPS-Berechtigung erlauben
4. **GPS-Tracking** - Bewege dich oder simuliere GPS
5. **Fahrt beenden** - "Fahrt beenden" → Notizen hinzufügen

## 🔧 Wichtige Befehle

```bash
# Development Server
npm start

# Mit Cache-Clear
npx expo start -c

# Spezifische Plattform
npm run android
npm run ios
npm run web

# TypeScript Check
npx tsc --noEmit
```

## 🔐 GPS-Berechtigungen

Die App fragt automatisch nach GPS-Berechtigungen beim ersten Start einer Fahrt.

### Simulator
- **Android**: Fake-Location über Emulator-Controls
- **iOS**: Simulate Location in Xcode

### Echtes Gerät
- Location Services aktivieren
- Berechtigung "Jederzeit zulassen" für Hintergrund-Tracking

## 🐛 Häufige Probleme

### "Cannot connect to Metro"
```bash
npx expo start -c
```

### "GPS funktioniert nicht"
- Berechtigungen erlaubt?
- Location Services aktiviert?
- Auf echtem Gerät testen

### "Datenbank-Fehler"
```bash
# App deinstallieren und neu installieren
```

### Dependencies fehlen
```bash
rm -rf node_modules
npm install
npx expo start -c
```

## 💡 Tipps

- **Dev-Menu**: Gerät schütteln oder `Cmd+D` (iOS) / `Ctrl+M` (Android)
- **Reload**: `r` im Terminal drücken
- **Clear Cache**: `npx expo start -c`
- **TypeScript**: Nutze VS Code für IntelliSense

## ✅ Fertig!

Die App sollte nun laufen. Viel Spaß beim Testen! 🚗
