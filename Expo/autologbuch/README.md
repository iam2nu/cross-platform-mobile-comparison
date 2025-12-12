# AutoLogbuch - Expo React Native

Eine Fahrzeugverwaltungs-App mit GPS-Tracking, entwickelt mit Expo und React Native.

## 📱 Features

- **Fahrzeugverwaltung**: Fahrzeuge mit Marke, Modell und Kilometerstand hinzufügen
- **Wartungshistorie**: Wartungseinträge mit Typ, Beschreibung, Kosten und Datum erfassen
- **GPS-Tracking**: Fahrten mit Live-GPS-Tracking aufzeichnen
- **Fahrtenbuch**: Übersicht aller Fahrten mit Distanz, Dauer und GPS-Daten
- **SQLite Datenbank**: Persistente lokale Datenspeicherung mit Expo SQLite
- **React Native UI**: Native Komponenten für iOS und Android

## 🛠️ Technologie-Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **Navigation**: React Navigation
- **Datenbank**: Expo SQLite
- **GPS**: Expo Location
- **State**: React Hooks (useState, useEffect)

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v18+)
- Expo Go App auf Smartphone
- Optional: Android Emulator oder iOS Simulator

### Befehle
```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Auf spezifischer Plattform
npm run android    # Android
npm run ios        # iOS (nur macOS)
npm run web        # Web Browser
```

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

## 🎯 Hauptfunktionen

### Fahrzeuge
- Fahrzeug hinzufügen (Marke, Modell, Kennzeichen)
- Fahrzeuge-Liste anzeigen
- Kilometerstand verwalten
- Fahrzeug-Statistiken

### Wartungen
- Wartung erfassen (Datum, Kosten, Beschreibung)
- Wartungshistorie pro Fahrzeug
- Gesamtkosten berechnen
- DatePicker für Datumswahl

### Fahrten
- Fahrt starten mit GPS-Tracking
- Live-Distanzberechnung
- Echtzeit-Timer
- Fahrt beenden
- Notizen zu Fahrten hinzufügen
- Start/End GPS-Koordinaten
- Geocoding für Adressen

## 📦 Wichtige Dependencies

```json
{
  "expo": "~54.0.23",
  "react-native": "0.81.5",
  "@react-navigation/native-stack": "^7.1.8",
  "expo-location": "~18.0.4",
  "expo-sqlite": "~15.0.3",
  "date-fns": "^4.1.0",
  "typescript": "~5.9.2"
}
```

## 🔐 Berechtigungen

### Android
Automatisch in `app.json` konfiguriert:
```json
{
  "permissions": [
    "ACCESS_FINE_LOCATION",
    "ACCESS_COARSE_LOCATION"
  ]
}
```

### iOS
Automatisch in `app.json` konfiguriert:
```json
{
  "infoPlist": {
    "NSLocationWhenInUseUsageDescription": "Für GPS-Tracking von Fahrten"
  }
}
```

## 📊 Datenbank-Schema

### Fahrzeuge Tabelle
- id (INTEGER PRIMARY KEY)
- marke (TEXT)
- modell (TEXT)
- kennzeichen (TEXT)
- kilometerstand (REAL)
- created_at (TEXT)

### Wartungen Tabelle
- id (INTEGER PRIMARY KEY)
- fahrzeug_id (INTEGER)
- typ (TEXT)
- beschreibung (TEXT)
- kosten (REAL)
- datum (TEXT)
- kilometerstand (REAL)

### Fahrten Tabelle
- id (INTEGER PRIMARY KEY)
- fahrzeug_id (INTEGER)
- start_zeit (TEXT)
- end_zeit (TEXT)
- distanz_km (REAL)
- notizen (TEXT)
- start_lat (REAL)
- start_lon (REAL)
- end_lat (REAL)
- end_lon (REAL)

## 🎨 UI/UX

- **Material Design** inspirierte Komponenten
- **Cards** für Listen-Items
- **FloatingActionButton** für Haupt-Aktionen
- **Modal Bottom Sheets** für Dialoge
- **Live-Updates** während GPS-Tracking
- **Loading States** und Error Handling
- **Responsive Design**

## 🔧 Entwicklung

### Hot Reload
- Änderungen werden automatisch aktualisiert
- Shake-Geste (Gerät) für Dev-Menu
- `Strg+M` (Android) oder `Cmd+D` (iOS) für Dev-Menu

### Debugging
```bash
# React Native Debugger
npm start
# Dann im Dev-Menu "Debug" wählen
```

### TypeScript Check
```bash
npx tsc --noEmit
```

## 📱 Build & Deployment

### Development Build
```bash
npx expo install expo-dev-client
eas build --profile development --platform android
```

### Production Build
```bash
eas build --platform android
eas build --platform ios
```

### Over-the-Air Updates
```bash
eas update --branch production
```

## 🐛 Troubleshooting

### GPS funktioniert nicht
- Prüfe Berechtigungen
- Location Services aktiviert?
- Auf echtem Gerät testen (Simulator hat Einschränkungen)

### Datenbank-Fehler
```bash
# App deinstallieren und neu installieren
# Oder Cache löschen
npx expo start -c
```

### Dependencies-Fehler
```bash
rm -rf node_modules
npm install
npx expo start -c
```

## 📚 Weitere Dokumentation

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

## 🎯 Mögliche Erweiterungen

- Karten-Integration (Google Maps, Leaflet)
- CSV/PDF Export für Fahrtenbuch
- Cloud-Synchronisation
- Push-Benachrichtigungen für Wartungen
- Foto-Upload für Wartungen
- Statistiken und Charts

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
