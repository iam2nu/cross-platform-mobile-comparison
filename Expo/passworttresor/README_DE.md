# Passwort-Tresor - Expo React Native Implementation

Eine sichere Passwort-Manager-App implementiert mit Expo und React Native.

## Funktionen

- **Master-Passwort**: Sichere Authentifizierung mit Master-Passwort
- **Biometrische Authentifizierung**: Face ID / Touch ID / Fingerabdruck-Unterstützung
- **Sichere Speicherung**: Verschlüsselte Speicherung mit Expo SecureStore
- **Passwort-Generator**: Generierung sicherer Passwörter mit konfigurierbaren Optionen
- **Passwort-Historie**: Speichert die letzten 5 Passwörter pro Eintrag
- **Favoriten**: Markierung wichtiger Einträge
- **Suche**: Schnelles Finden von Einträgen
- **Export/Import**: Backup und Wiederherstellung der Daten
- **Auto-Lock**: Automatische Sperre nach Inaktivität
- **Passwort-Stärke-Anzeige**: Echtzeit-Bewertung der Passwort-Sicherheit

## Technologie-Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript
- **UI**: React Native
- **Sicherheit**:
  - expo-secure-store: Verschlüsselte Datenspeicherung
  - expo-local-authentication: Biometrische Authentifizierung
  - expo-crypto: SHA-256 Hashing
- **Komponenten**:
  - @react-native-community/slider: Slider-Komponente
  - expo-clipboard: Zwischenablage-Zugriff

## Projektstruktur

```
passworttresor/
├── models/
│   └── Credential.ts           # Datenmodell für Credentials
├── services/
│   ├── AuthService.ts          # Authentifizierung (Biometrie, Master-Passwort)
│   ├── SecureStorageService.ts # Verschlüsselte Datenspeicherung
│   ├── PasswordGeneratorService.ts # Passwort-Generierung
│   └── AutoLockService.ts      # Auto-Lock Funktionalität
├── screens/
│   ├── SetupScreen.tsx         # Initiales Setup (Master-Passwort)
│   ├── AuthScreen.tsx          # Authentifizierungs-Screen
│   ├── HomeScreen.tsx          # Hauptansicht mit Credential-Liste
│   └── AddEditCredentialScreen.tsx # Credential hinzufügen/bearbeiten
├── components/
│   └── widgets/
│       ├── CredentialDetailModal.tsx    # Credential-Detail-Ansicht
│       ├── PasswordGeneratorModal.tsx   # Passwort-Generator Dialog
│       ├── SettingsModal.tsx            # Einstellungen
│       └── ExportImportModal.tsx        # Export/Import Funktionalität
└── App.tsx                     # Haupt-App-Komponente
```

## Installation & Setup

### Voraussetzungen

- Node.js 18 oder höher
- npm oder yarn
- Expo CLI: `npm install -g expo-cli`
- Für iOS: Xcode (nur macOS)
- Für Android: Android Studio

### Installation

```bash
# Abhängigkeiten installieren
npm install

# Expo Dev Client starten
npm start
```

### Ausführen

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## Best Practices & Optimierungen

### Sicherheit

1. **Verschlüsselte Speicherung**: Alle sensiblen Daten werden mit Expo SecureStore verschlüsselt gespeichert
2. **Master-Passwort Hashing**: SHA-256 Hash des Master-Passworts
3. **Biometrische Authentifizierung**: Native Plattform-APIs für maximale Sicherheit
4. **Auto-Lock**: Automatische Sperre zum Schutz vor unbefugtem Zugriff

### Performance

1. **Effiziente State-Verwaltung**: React Hooks (useState, useEffect, useCallback)
2. **Optimierte Listen**: FlatList mit keyExtractor für große Datensätze
3. **Lazy Loading**: Komponenten werden nur bei Bedarf geladen
4. **Memoization**: useCallback für teure Operationen

### Benutzerfreundlichkeit

1. **Native UI-Komponenten**: Plattform-spezifisches Look & Feel
2. **Intuitive Navigation**: Klare Hierarchie und Rückkehr-Möglichkeiten
3. **Inline-Validierung**: Sofortiges Feedback bei Eingaben
4. **Visuelles Feedback**: Passwort-Stärke-Anzeige, Loading-Indikatoren
5. **Accessibility**: Unterstützung für Screen-Reader und Tastatur-Navigation

### Code-Organisation

1. **Modulare Architektur**: Trennung von Models, Services, Screens und Components
2. **TypeScript**: Type-Safety und bessere IDE-Unterstützung
3. **Wiederverwendbare Komponenten**: DRY-Prinzip
4. **Service-Layer**: Trennung von Business-Logik und UI

## Vergleich mit Flutter-Original

### Identische Funktionen

✅ Master-Passwort Setup
✅ Biometrische Authentifizierung
✅ Sichere Datenspeicherung
✅ Passwort-Generator mit Optionen
✅ Passwort-Historie (letzte 5 Passwörter)
✅ Favoriten-Funktion
✅ Suche
✅ Export/Import
✅ Auto-Lock mit konfigurierbarem Timeout
✅ Passwort-Stärke-Anzeige
✅ Copy-to-Clipboard

### Plattform-spezifische Unterschiede

- **UI-Framework**: React Native statt Flutter Widgets
- **State-Management**: React Hooks statt StatefulWidget
- **Styling**: StyleSheet API statt Flutter Theme
- **Navigation**: Modal/Screen-basiert statt Navigator
- **Datenspeicherung**: Expo SecureStore statt flutter_secure_storage

### Performance

- Vergleichbare Performance auf beiden Plattformen
- Schnellere Entwicklung durch Hot-Reload
- Native Performance durch React Native Bridge

## Entwicklung

### Debugging

```bash
# Logs anzeigen
npm start -- --no-dev

# TypeScript Fehler prüfen
npx tsc --noEmit
```

### Testing

Die App kann auf verschiedenen Geräten getestet werden:

- **Expo Go App**: Schnelles Testen ohne Build
- **iOS Simulator**: Xcode erforderlich
- **Android Emulator**: Android Studio erforderlich
- **Physische Geräte**: Über Expo Go oder Dev Build

## Bekannte Einschränkungen

1. **Expo SecureStore**: Limitierung auf kleinere Datenmengen (empfohlen < 2KB pro Key)
2. **Web-Unterstützung**: Biometrische Authentifizierung nur auf nativen Plattformen
3. **Offline-First**: App funktioniert komplett offline (keine Cloud-Sync)

## Lizenz

Dieses Projekt wurde als Vergleichsimplementierung zur Flutter-Version erstellt.

## Autor

Erstellt als Teil eines Cross-Platform-Framework-Vergleichs.
