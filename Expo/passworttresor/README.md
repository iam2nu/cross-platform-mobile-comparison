# PasswortTresor - Expo React Native

Ein sicherer Passwort-Manager mit biometrischer Authentifizierung, entwickelt mit Expo und React Native.

## 📱 Features

- **Master-Passwort Setup**: Sicheres Hauptpasswort beim ersten Start
- **Biometrische Authentifizierung**: Face ID, Touch ID, Fingerabdruck
- **Verschlüsselte Speicherung**: Expo Secure Store (Keychain/KeyStore)
- **Passwort-Verwaltung**: Erstellen, Bearbeiten, Löschen von Einträgen
- **Passwort-Generator**: Konfigurierbar (Länge, Zeichentypen)
- **Passwort-Stärke**: Visueller Indikator mit Farbcodierung
- **Favoriten-System**: Wichtige Einträge markieren
- **Passwort-Historie**: Letzte 5 Passwörter pro Eintrag
- **Suche**: Durchsuchen von Titel und Username
- **Export/Import**: Backup und Restore als JSON
- **Auto-Lock**: Automatische Sperre nach Inaktivität
- **Kopieren**: Username und Passwort in Zwischenablage

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **Storage**: Expo Secure Store
- **Biometrie**: Expo Local Authentication
- **Crypto**: Expo Crypto (SHA-256)
- **Clipboard**: Expo Clipboard
- **State**: React Hooks

## 💻 Systemvoraussetzungen

### Minimum
- **Node.js**: 18.x oder höher
- **npm**: 9.x oder höher
- **Expo Go App**: Auf Smartphone (für Entwicklung)
- **Smartphone**: Android 5.0+ oder iOS 12+
- **WLAN**: PC und Smartphone im gleichen Netzwerk

### Empfohlen
- **Node.js**: 20.x (Latest LTS)
- **RAM**: 8 GB
- **Betriebssystem**: Windows 10+, macOS 10.15+, Linux

### Für biometrische Authentifizierung
**Wichtig**: Biometrie funktioniert **nicht** in Expo Go!

Für biometrische Auth benötigt:
- **Development Build** oder **Production Build**
- **Gerät mit Biometrie**: Face ID, Touch ID, oder Fingerabdruck
- **Android Studio** (für Android Build)
- **Xcode** (für iOS Build, nur macOS)

### Installation der Voraussetzungen

#### 1. Node.js
```bash
# Download: https://nodejs.org (LTS Version)
# Nach Installation:
node --version  # Sollte v18+ sein
npm --version   # Sollte v9+ sein
```

#### 2. Expo Go App
- **Android**: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

#### 3. Optional: Expo CLI
```bash
npm install -g expo-cli
```

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Expo/passworttresor
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

**Hinweis**: Biometrische Authentifizierung funktioniert nur in Development/Production Builds, nicht in Expo Go.

### 3. Development Build für Biometrie

```bash
# Development Client installieren
npx expo install expo-dev-client

# Build erstellen
eas build --profile development --platform android
eas build --profile development --platform ios
```

## 📝 Verwendung

### Erste Schritte

1. **Master-Passwort erstellen** - Mindestens 6 Zeichen beim ersten Start
2. **Ersten Eintrag hinzufügen** - `+` Button antippen
3. **Passwort-Generator nutzen** - ✨ Icon im Passwort-Feld
4. **Biometrische Auth aktivieren** - Beim nächsten Login

### Passwort-Generator

1. In "Neuer Eintrag" oder "Bearbeiten"
2. ✨ Icon im Passwort-Feld antippen
3. Optionen anpassen (Länge: 8-32 Zeichen)
4. "Verwenden" antippen

### Export/Import

1. **Export**: Menü → Exportieren → JSON kopieren
2. **Import**: Menü → Importieren → JSON einfügen → Bestätigen

## 📁 Projektstruktur

```
├── models/                   # TypeScript Interfaces
│   └── Credential.ts
├── screens/                  # Screen Components
│   ├── SetupScreen.tsx
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   └── AddEditCredentialScreen.tsx
├── services/                 # Business Logic
│   ├── SecureStorageService.ts
│   ├── AuthService.ts
│   ├── PasswordGeneratorService.ts
│   └── AutoLockService.ts
├── components/               # UI Components
│   └── widgets/
│       ├── CredentialDetailModal.tsx
│       ├── PasswordGeneratorModal.tsx
│       ├── ExportImportModal.tsx
│       └── SettingsModal.tsx
└── theme/                    # Design System (if exists)
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

# TypeScript Check
npx tsc --noEmit

# Production Build
eas build --platform android
eas build --platform ios
```

## 🐛 Troubleshooting

### "Biometrie funktioniert nicht"
- Development Build erstellen (nicht Expo Go)
- Biometrie auf Gerät aktiviert?
- Berechtigungen in app.json konfiguriert?

### "Daten nach Neuinstallation weg"
- Export vor Deinstallation erstellen!
- Secure Store wird bei Deinstallation gelöscht

### "Cannot connect to Metro"
```bash
npx expo start -c
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
- **Biometrie testen**: Nur auf echten Geräten verfügbar

### Sicherheitshinweise

⚠️ **Wichtig:**
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- App auf aktuellem Stand halten
- Biometrische Daten bleiben auf Gerät

**Implementierte Maßnahmen:**
- SHA-256 Passwort-Hashing (Master-Passwort)
- Verschlüsselte Speicherung (Expo Secure Store)
- Biometrische Authentifizierung (native)
- Auto-Lock nach Inaktivität
- Keine Cloud-Speicherung
- Keine Logs mit sensiblen Daten
- Kryptographisch sichere Zufallszahlen

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
