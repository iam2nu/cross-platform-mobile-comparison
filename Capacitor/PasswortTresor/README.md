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
- **Responsive Design**: Funktioniert auf allen Bildschirmgrößen

## 🛠️ Technologie-Stack

- **Framework**: Ionic React 8
- **Sprache**: TypeScript
- **Build Tool**: Vite
- **Mobile Runtime**: Capacitor 6
- **Storage**: Capacitor Preferences
- **Clipboard**: Capacitor Clipboard
- **Crypto**: Native Crypto API für Hashing
- **UI**: Ionic Components

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v18+)
- Ionic CLI: `npm install -g @ionic/cli`
- Für Android: Android Studio
- Für iOS: Xcode (nur macOS)

### Befehle
```bash
# Dependencies installieren
npm install

# Im Browser entwickeln
npm run dev

# Production Build
npm run build

# Capacitor sync
npx cap sync

# Native Apps
npx cap open android
npx cap open ios
```

## 📁 Projektstruktur

```
src/
├── models/                   # Datenmodelle
│   ├── Credential.ts
│   └── Settings.ts
├── services/                 # Business Logic
│   ├── StorageService.ts
│   ├── CryptoService.ts
│   └── PasswordGeneratorService.ts
├── pages/                    # Ionic Pages
│   ├── SetupPage.tsx
│   ├── AuthPage.tsx
│   └── HomePage.tsx
├── components/               # Wiederverwendbare Komponenten
│   └── CredentialModal.tsx
├── theme/                    # Styling
│   ├── variables.css
│   └── global.css
├── App.tsx                   # Haupt-App-Komponente
└── main.tsx                  # Entry Point
```

## 🎯 Hauptfunktionen

### Authentifizierung
- **Setup**: Master-Passwort beim ersten Start erstellen
- **Login**: Mit Master-Passwort entsperren
- **SHA-256 Hashing**: Sicheres Passwort-Hashing

### Credential-Verwaltung
- **Erstellen**: Neuen Eintrag mit Titel, Username, Passwort, Notizen
- **Bearbeiten**: Einträge nachträglich ändern
- **Löschen**: Mit Bestätigungs-Dialog
- **Suchen**: Nach Titel oder Username
- **Favoriten**: Wichtige Einträge markieren
- **Kopieren**: In Zwischenablage kopieren

### Passwort-Generator
- **Länge**: 8-32 Zeichen
- **Optionen**: Groß-/Kleinbuchstaben, Zahlen, Symbole
- **Passwort-Stärke**: Live-Anzeige mit Farben
- **Kryptographisch sicher**: Crypto.getRandomValues()

### Passwort-Historie
- **Automatisch**: Letzte 5 Passwörter gespeichert
- **Wiederherstellung**: Altes Passwort wiederverwenden
- **Anzeige**: In separatem Modal

### Daten-Management
- **Export**: JSON-Format zum Sichern
- **Import**: JSON wiederherstellen
- **Versionierung**: Format-Version im Export

## 📦 Wichtige Dependencies

```json
{
  "@ionic/react": "^8.0.0",
  "@capacitor/core": "^6.0.0",
  "@capacitor/preferences": "^6.0.0",
  "@capacitor/clipboard": "^6.0.0",
  "react": "^18.2.0",
  "typescript": "^5.3.0",
  "vite": "^5.0.0"
}
```

## 🔐 Sicherheit

### Implementierte Maßnahmen
- ✅ SHA-256 Passwort-Hashing
- ✅ Verschlüsselte Speicherung (Capacitor Preferences)
- ✅ Kein Cloud-Speicher
- ✅ Keine Logs mit sensiblen Daten
- ✅ Kryptographisch sichere Zufallszahlen

### Sicherheitshinweise
⚠️ **Wichtig**:
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- Keine Biometrische Auth in dieser Version (kann hinzugefügt werden)

## 🎨 UI/UX

- **Primary Color**: #2196F3 (Blau)
- **Ionic Components**: Native Look & Feel
- **Modal Dialoge**: Für Aktionen
- **Loading States**: Während Operationen
- **Error Handling**: Benutzerfreundliche Fehlermeldungen
- **Passwort-Stärke-Indicator**: Farbcodiert
- **Responsive**: Funktioniert auf Mobil, Tablet, Desktop

## 🔧 Entwicklung

### Browser Development
```bash
npm run dev
# Öffne http://localhost:3000
```

### Hot Reload
- Vite Hot Module Replacement aktiv
- Änderungen werden automatisch im Browser aktualisiert

### TypeScript
```bash
npx tsc --noEmit
```

## 📱 Native Builds

### Android
```bash
# Einmalig: Platform hinzufügen
npx cap add android

# Nach Code-Änderungen
npm run build
npx cap sync

# Android Studio öffnen
npx cap open android
```

### iOS (nur macOS)
```bash
# Einmalig: Platform hinzufügen
npx cap add ios

# Nach Code-Änderungen
npm run build
npx cap sync

# Xcode öffnen
npx cap open ios
```

## 🐛 Troubleshooting

### "Port 3000 belegt"
Ändere Port in `vite.config.ts`.

### "Build-Fehler"
```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Capacitor Sync-Fehler"
```bash
npx cap sync
```

### "Daten weg nach Neuinstallation"
Preferences werden bei Deinstallation gelöscht. Vorher exportieren!

## 💡 Verwendung

### Erste Schritte
1. App starten
2. Master-Passwort erstellen (min. 6 Zeichen)
3. Ersten Eintrag hinzufügen (`+` Button)
4. Passwort-Generator nutzen (beim Erstellen/Bearbeiten)

### Export/Import
1. **Export**: Menü (⋮) → Exportieren → JSON kopieren
2. **Import**: Menü → Importieren → JSON einfügen

## 📚 Weitere Dokumentation

- [Ionic Docs](https://ionicframework.com/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Capacitor Preferences](https://capacitorjs.com/docs/apis/preferences)

## 🎯 Mögliche Erweiterungen

- Biometrische Authentifizierung (mit Plugin)
- Auto-Lock Funktion
- Password Breach Check
- 2FA Token Generator
- Dark Mode
- Cloud-Backup (verschlüsselt)
- Browser-Extension
- Mehrsprachigkeit

## 🆚 Vergleich mit anderen Frameworks

| Feature | Capacitor | Flutter | Expo |
|---------|-----------|---------|------|
| Web-Standards | ✅ | ❌ | ⚠️ |
| Ionic UI | ✅ | ❌ | ❌ |
| PWA Support | ✅ | ⚠️ | ❌ |
| Lernkurve | Flach | Mittel | Flach |
| Performance | Gut | Sehr gut | Gut |

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
