# AutoLogbuch - Expo React Native

Eine Fahrzeugverwaltungs-App mit GPS-Tracking, entwickelt mit Expo und React Native.

## 📱 Features

- **Fahrzeugverwaltung**: Fahrzeuge mit Marke, Modell und Kilometerstand hinzufügen
- **Wartungshistorie**: Wartungseinträge mit Typ, Beschreibung, Kosten und Datum erfassen
- **GPS-Tracking**: Fahrten mit Live-GPS-Tracking aufzeichnen
- **Fahrtenbuch**: Übersicht aller Fahrten mit Distanz, Dauer und GPS-Daten
- **SQLite Datenbank**: Persistente lokale Datenspeicherung mit Expo SQLite
- **React Native UI**: Native Komponenten für iOS und Android

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **Navigation**: React Navigation
- **Datenbank**: Expo SQLite
- **GPS**: Expo Location
- **State**: React Hooks (useState, useEffect)

## 🚀 Quick Start

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

### 3. Expo Go App

**Installation:**
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

**Verwendung:**
1. Expo Go öffnen
2. QR-Code scannen
3. App lädt automatisch

## 📝 Verwendung

### Features testen

1. **Fahrzeug hinzufügen** - `+` Button auf Home Screen
2. **Wartung erfassen** - Fahrzeug auswählen → "Wartung hinzufügen"
3. **Fahrt starten** - "Fahrt starten" → GPS-Berechtigung erlauben
4. **GPS-Tracking** - Bewege dich oder simuliere GPS
5. **Fahrt beenden** - "Fahrt beenden" → Notizen hinzufügen

### GPS-Berechtigungen

Die App fragt automatisch nach GPS-Berechtigungen beim ersten Start einer Fahrt.

**Simulator:**
- **Android**: Fake-Location über Emulator-Controls
- **iOS**: Simulate Location in Xcode

**Echtes Gerät:**
- Location Services aktivieren
- Berechtigung "Jederzeit zulassen" für Hintergrund-Tracking

## 📁 Projektstruktur

```
src/
├── models/                   # TypeScript Interfaces
│   ├── Fahrzeug.ts
│   ├── Wartung.ts
│   └── Fahrt.ts
├── database/                 # SQLite Datenbank
│   └── database.ts
├── services/                 # Business Logic
│   └── LocationService.ts
├── screens/                  # Screen Components
│   ├── HomeScreen.tsx
│   ├── AddFahrzeugScreen.tsx
│   ├── FahrzeugDetailScreen.tsx
│   ├── AddWartungScreen.tsx
│   ├── FahrtenListScreen.tsx
│   ├── ActiveFahrtScreen.tsx
│   └── FahrtDetailScreen.tsx
├── navigation/               # Navigation Setup
│   └── AppNavigator.tsx
└── theme/                    # Design System
    └── theme.ts
```

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

## 🐛 Troubleshooting

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

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
