# PasswortTresor - Capacitor

Ein sicherer Passwort-Manager entwickelt mit Ionic React und Capacitor.

## 📱 Features

- **Master-Passwort Setup**: Sicheres Hauptpasswort beim ersten Start
- **Verschlüsselte Speicherung**: Capacitor Preferences mit SHA-256 Hashing
- **Passwort-Verwaltung**: Erstellen, Bearbeiten, Löschen von Einträgen
- **Passwort-Generator**: Konfigurierbar mit Stärke-Anzeige
- **Favoriten-System**: Wichtige Einträge markieren
- **Passwort-Historie**: Letzte 5 Passwörter pro Eintrag
- **Suche**: Durchsuchen von Titel und Username
- **Export/Import**: Backup und Restore als JSON
- **Kopieren**: Username und Passwort in Zwischenablage
- **Ionic UI**: Native Look & Feel mit Ionic Components

## 🛠️ Tech Stack

- **Framework**: Ionic React 8
- **Sprache**: TypeScript
- **Build Tool**: Vite
- **Mobile Runtime**: Capacitor 6
- **Storage**: Capacitor Preferences
- **Clipboard**: Capacitor Clipboard
- **Crypto**: Native Crypto API für Hashing
- **UI**: Ionic Components

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Capacitor/PasswortTresor
npm install
```

### 2. App im Browser starten

```bash
npm run dev
```

Öffne: **http://localhost:3000**

### 3. Native Apps erstellen

#### Android

```bash
# Android-Plattform hinzufügen (beim ersten Mal erforderlich)
npx cap add android

# Build erstellen
npm run build

# Zu Android syncen
npx cap sync

# Android Studio öffnen
npx cap open android
```

In Android Studio:
1. Gradle-Sync abwarten
2. Emulator oder Gerät wählen
3. Play-Button klicken

#### iOS (nur macOS)

```bash
# iOS-Plattform hinzufügen (beim ersten Mal erforderlich)
npx cap add ios

# Build erstellen
npm run build

# Zu iOS syncen
npx cap sync

# Xcode öffnen
npx cap open ios
```

## 📝 Verwendung

### Erste Schritte

1. **Master-Passwort erstellen** - Beim ersten Start (min. 6 Zeichen)
2. **Eintrag hinzufügen** - `+` Button klicken
3. **Passwort-Generator** - ✨ Icon im Passwort-Feld
4. **Favorit markieren** - Stern-Icon in Eintrag
5. **Export/Import** - Menü (⋮) → Exportieren/Importieren

### Passwort-Generator

- **Länge**: 8-32 Zeichen
- **Optionen**: Groß-/Kleinbuchstaben, Zahlen, Symbole
- **Passwort-Stärke**: Live-Anzeige mit Farben
- **Kryptographisch sicher**: Crypto.getRandomValues()

### Export/Import

1. **Export**: Menü → Exportieren → JSON kopieren
2. **Import**: Menü → Importieren → JSON einfügen

## 📁 Projektstruktur

```
src/
├── models/                   # Datenmodelle
│   ├── Credential.ts
│   └── Settings.ts
├── pages/                    # Ionic Pages
│   ├── SetupPage.tsx
│   ├── AuthPage.tsx
│   └── HomePage.tsx
├── components/               # Wiederverwendbare Komponenten
│   ├── CredentialModal.tsx
│   ├── ExportImportModal.tsx
│   └── SettingsModal.tsx
├── services/                 # Business Logic
│   ├── StorageService.ts
│   ├── CryptoService.ts
│   ├── PasswordGeneratorService.ts
│   └── AutoLockService.ts
├── theme/                    # Styling
│   ├── variables.css
│   └── global.css
├── App.tsx                   # Haupt-App-Komponente
└── main.tsx                  # Entry Point
```

## 🔧 Wichtige Befehle

```bash
# Development Server
npm run dev

# Production Build
npm run build

# Capacitor Sync
npx cap sync

# Native Apps öffnen
npx cap open android
npx cap open ios
```

## 🐛 Troubleshooting

### "Port 3000 belegt"
Ändere Port in `vite.config.ts`:
```typescript
server: { port: 3001 }
```

### "Build-Fehler"
```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Android Sync-Fehler"
```bash
npx cap sync android
```

### "Daten weg nach Neuinstallation"
Preferences werden bei Deinstallation gelöscht. Vorher exportieren!

## 💡 Tipps

- **Browser-DevTools**: F12 für Debugging
- **Hot Reload**: Automatisch im Browser
- **Sync nach Änderungen**: `npx cap sync` ausführen
- **Native Debugging**: Chrome DevTools für Android, Safari für iOS

### Sicherheitshinweise

⚠️ **Wichtig:**
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- Keine Biometrische Auth in dieser Version

**Implementierte Maßnahmen:**
- SHA-256 Passwort-Hashing
- Verschlüsselte Speicherung (Capacitor Preferences)
- Kein Cloud-Speicher
- Keine Logs mit sensiblen Daten
- Kryptographisch sichere Zufallszahlen

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
