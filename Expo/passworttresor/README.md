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

## 🛠️ Technologie-Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **Storage**: Expo Secure Store
- **Biometrie**: Expo Local Authentication
- **Crypto**: Expo Crypto (SHA-256)
- **Clipboard**: Expo Clipboard
- **State**: React Hooks

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v18+)
- Expo Go App (für Testing) oder
- Development Build (für biometrische Auth)

### Befehle
```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Auf spezifischer Plattform
npm run android    # Android
npm run ios        # iOS (nur macOS)
```

**Hinweis**: Biometrische Authentifizierung funktioniert nur in Development/Production Builds, nicht in Expo Go.

## 📁 Projektstruktur

```
src/
├── models/                   # TypeScript Interfaces
│   ├── Credential.ts
│   └── Settings.ts
├── services/                 # Business Logic
│   ├── StorageService.ts
│   ├── CryptoService.ts
│   ├── PasswordGeneratorService.ts
│   └── BiometricService.ts
├── screens/                  # Screen Components
│   ├── SetupScreen.tsx
│   ├── AuthScreen.tsx
│   └── HomeScreen.tsx
├── components/               # UI Components
│   ├── CredentialModal.tsx
│   ├── PasswordGeneratorModal.tsx
│   ├── PasswordHistoryModal.tsx
│   └── SettingsModal.tsx
└── theme/                    # Design System
    └── theme.ts
```

## 🎯 Hauptfunktionen

### Authentifizierung
- **Setup**: Master-Passwort erstellen beim ersten Start
- **Login**: Mit Master-Passwort oder Biometrie
- **Auto-Lock**: Automatische Sperre nach 5 Minuten Inaktivität

### Credential-Verwaltung
- **Erstellen**: Neuen Eintrag mit Titel, Username, Passwort, Notizen
- **Bearbeiten**: Einträge nachträglich ändern
- **Löschen**: Einträge entfernen mit Bestätigung
- **Suchen**: Nach Titel oder Username suchen
- **Favoriten**: Wichtige Einträge oben anzeigen
- **Kopieren**: Username und Passwort mit einem Tap kopieren

### Passwort-Generator
- **Länge**: 8-32 Zeichen
- **Optionen**:
  - Großbuchstaben (A-Z)
  - Kleinbuchstaben (a-z)
  - Zahlen (0-9)
  - Symbole (!@#$%^&*)
- **Passwort-Stärke**: Live-Anzeige während Generierung
- **Kryptographisch sicher**: Expo Crypto für Zufallszahlen

### Passwort-Historie
- **Automatische Speicherung**: Letzte 5 Passwörter pro Eintrag
- **Wiederherstellung**: Altes Passwort wiederverwenden
- **Anzeige**: Historie in separatem Modal

### Export/Import
- **Export**: Alle Daten als JSON exportieren
- **Import**: Daten aus JSON wiederherstellen
- **Format**: Strukturiertes JSON mit Versionierung

## 📦 Wichtige Dependencies

```json
{
  "expo": "~54.0.23",
  "react-native": "0.81.5",
  "expo-secure-store": "^15.0.7",
  "expo-local-authentication": "^17.0.7",
  "expo-crypto": "^15.0.7",
  "expo-clipboard": "^8.0.7",
  "typescript": "~5.9.2"
}
```

## 🔐 Sicherheit

### Implementierte Maßnahmen
- ✅ SHA-256 Passwort-Hashing (Master-Passwort)
- ✅ Verschlüsselte Speicherung (Expo Secure Store)
- ✅ Biometrische Authentifizierung (native)
- ✅ Auto-Lock nach Inaktivität
- ✅ Keine Cloud-Speicherung
- ✅ Keine Logs mit sensiblen Daten
- ✅ Kryptographisch sichere Zufallszahlen

### Sicherheitshinweise
⚠️ **Wichtig**:
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- App auf aktuellem Stand halten
- Biometrische Daten bleiben auf Gerät

## 🎨 UI/UX

- **Farbschema**: Blau (#2196F3) als Primary Color
- **Material Design** inspirierte Komponenten
- **Modal Dialoge** für Aktionen
- **Loading States** während Operationen
- **Error Handling** mit Fehlermeldungen
- **Passwort-Stärke-Indicator** mit Farben
- **Smooth Animationen**
- **Responsive Design**

## 🔧 Entwicklung

### Development Build erstellen
Für biometrische Auth benötigt:
```bash
# Development Client installieren
npx expo install expo-dev-client

# Build erstellen
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Hot Reload
- Änderungen werden automatisch aktualisiert
- Shake-Geste für Dev-Menu

### TypeScript Check
```bash
npx tsc --noEmit
```

## 📱 Build & Deployment

### Production Build
```bash
eas build --platform android
eas build --platform ios
```

### App Store Submission
```bash
eas submit --platform android
eas submit --platform ios
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

## 💡 Verwendung

### Erste Schritte
1. App starten
2. Master-Passwort erstellen (min. 6 Zeichen)
3. Ersten Eintrag hinzufügen (`+` Button)
4. Passwort-Generator nutzen (✨ Icon)
5. Biometrische Auth aktivieren (beim nächsten Login)

### Passwort-Generator
1. In "Neuer Eintrag" oder "Bearbeiten"
2. ✨ Icon im Passwort-Feld antippen
3. Optionen anpassen
4. "Verwenden" antippen

### Export/Import
1. **Export**: Menü → Exportieren → JSON kopieren
2. **Import**: Menü → Importieren → JSON einfügen → Bestätigen

## 📚 Weitere Dokumentation

- [Expo Docs](https://docs.expo.dev)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo Local Authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/)
- [Expo Crypto](https://docs.expo.dev/versions/latest/sdk/crypto/)

## 🎯 Mögliche Erweiterungen

- Password Breach Check (Have I Been Pwned API)
- 2FA Token Generator (TOTP)
- Sichere Notizen
- Datei-Anhänge
- Cloud-Backup (verschlüsselt)
- Browser-Extension
- Dark Mode
- Mehrsprachigkeit

## 🆚 Vergleich mit anderen Frameworks

| Feature | Expo | Flutter | Capacitor |
|---------|------|---------|-----------|
| Biometrische Auth | ✅ | ✅ | ⚠️ Plugin |
| Verschlüsselte Storage | ✅ | ✅ | ✅ |
| Passwort-Generator | ✅ | ✅ | ✅ |
| Code-Komplexität | Mittel | Mittel | Mittel |
| Performance | Gut | Sehr gut | Gut |

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
