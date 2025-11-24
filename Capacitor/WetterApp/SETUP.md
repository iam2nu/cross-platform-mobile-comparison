# Setup-Anleitung für WetterApp (Capacitor + Ionic + React)

## Schritt-für-Schritt Installation

### 1. Voraussetzungen prüfen

```powershell
# Node.js Version prüfen (sollte >= 18 sein)
node --version

# npm Version prüfen
npm --version
```

Falls Node.js nicht installiert ist: https://nodejs.org/

### 2. Ionic CLI installieren (global)

```powershell
npm install -g @ionic/cli
```

### 3. Projekt-Dependencies installieren

```powershell
# In das Projektverzeichnis wechseln
cd Capacitor\WetterApp

# Alle Dependencies installieren
npm install
```

Dies installiert:
- React & React-DOM
- Ionic React
- Capacitor Core & CLI
- Axios (HTTP Client)
- Zustand (State Management)
- TypeScript
- Vite (Build Tool)

### 4. Development Server testen

```powershell
npm run dev
```

Öffne: http://localhost:3000

Die App sollte jetzt im Browser laufen!

### 5. Für Android vorbereiten

#### Android Studio installieren
1. Download: https://developer.android.com/studio
2. Installiere Android Studio mit SDK
3. Installiere JDK 17 (wird von Android Studio vorgeschlagen)

#### Umgebungsvariablen setzen (Windows)

```powershell
# ANDROID_HOME setzen
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")

# JAVA_HOME setzen (Pfad anpassen!)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
```

PowerShell neu starten nach dem Setzen der Variablen!

#### Android Platform hinzufügen

```powershell
# Android Platform hinzufügen
ionic capacitor add android

# Assets synchronisieren
ionic capacitor sync android
```

### 6. Android App bauen und testen

#### Option A: Mit Android Studio

```powershell
# Android Studio öffnen
npx cap open android
```

In Android Studio:
1. Warte bis Gradle-Build fertig ist
2. Wähle einen Emulator oder verbinde ein Gerät
3. Klicke auf "Run" (grüner Play-Button)

#### Option B: Direkt über CLI

```powershell
# Bauen und auf verbundenem Gerät starten
npm run android

# Oder manuell:
ionic capacitor run android
```

### 7. Für iOS vorbereiten (nur auf macOS)

#### Xcode installieren
1. Aus dem Mac App Store installieren
2. Command Line Tools installieren:
```bash
xcode-select --install
```

#### CocoaPods installieren
```bash
sudo gem install cocoapods
```

#### iOS Platform hinzufügen

```bash
# iOS Platform hinzufügen
ionic capacitor add ios

# Assets synchronisieren
ionic capacitor sync ios

# Xcode öffnen
npx cap open ios
```

In Xcode:
1. Wähle ein Entwicklerteam für Signing
2. Wähle einen Simulator
3. Klicke auf "Run" (Play-Button)

### 8. Production Build erstellen

```powershell
# Web-Build erstellen
npm run build

# Assets zu nativen Projekten synchronisieren
ionic capacitor sync
```

### 9. Troubleshooting

#### Problem: "Cannot find module 'react'"
```powershell
# Dependencies neu installieren
rm -rf node_modules
npm install
```

#### Problem: "Gradle build failed"
```powershell
# Im android/ Ordner:
cd android
./gradlew clean
cd ..
ionic capacitor sync android
```

#### Problem: API-Calls funktionieren nicht
- Prüfe Internet-Verbindung
- Prüfe API-Key in `src/services/weatherService.ts`
- Öffne Browser DevTools (F12) und checke Console

#### Problem: "Command not found: ionic"
```powershell
# Ionic CLI neu installieren
npm install -g @ionic/cli
```

### 10. Nützliche Befehle

```powershell
# Development Server mit Hot Reload
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview

# Assets zu nativen Projekten kopieren
ionic capacitor sync

# Android in Android Studio öffnen
npx cap open android

# iOS in Xcode öffnen (macOS)
npx cap open ios

# Plugins aktualisieren
npm update

# Cache löschen
npm cache clean --force
```

### 11. Projekt-Struktur verstehen

```
Capacitor/WetterApp/
├── src/                    # Source Code
│   ├── components/         # React Components
│   ├── models/            # TypeScript Interfaces
│   ├── services/          # API Services
│   ├── store/             # Zustand Store
│   ├── screens/           # Screen Components
│   ├── theme/             # CSS & Theme
│   ├── App.tsx            # Main App
│   └── main.tsx           # Entry Point
├── android/               # Android Native Projekt
├── ios/                   # iOS Native Projekt
├── dist/                  # Build Output
├── node_modules/          # Dependencies
├── index.html             # HTML Entry
├── package.json           # NPM Config
├── tsconfig.json          # TypeScript Config
├── vite.config.ts         # Vite Config
└── capacitor.config.ts    # Capacitor Config
```

### 12. Development Workflow

1. **Änderungen machen** in `src/` Dateien
2. **Hot Reload** im Browser testen (`npm run dev`)
3. **Build erstellen** (`npm run build`)
4. **Sync zu Mobile** (`ionic capacitor sync`)
5. **Auf Gerät testen** (`npm run android` / `npm run ios`)

### 13. Tipps für beste Performance

- Nutze `React.memo()` für Components
- Vermeide unnötige Re-Renders
- Nutze Zustand Store für globalen State
- Bilder lazy-loaden
- API-Calls cachen wenn möglich

### 14. Nächste Schritte

Nach erfolgreicher Installation:

1. ✅ Öffne die App im Browser
2. ✅ Teste die Stadt-Suche
3. ✅ Prüfe die 7-Tage Vorhersage
4. ✅ Klicke auf einen Tag für stündliche Daten
5. ✅ Teste Pull-to-Refresh
6. ✅ Baue für Android/iOS

## Support

Bei Problemen:
1. Prüfe die Console-Logs
2. Checke die README.md
3. Validiere alle Dependencies mit `npm list`

**Viel Erfolg! 🚀**
