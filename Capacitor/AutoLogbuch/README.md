# Auto-Logbuch (Capacitor / Ionic React)

Eine vollständige Capacitor/Ionic React Implementierung der Flutter Auto-Logbuch App.

## 📱 Features

- **Fahrzeugverwaltung**: Fahrzeuge hinzufügen mit Marke, Modell, Kennzeichen und Kilometerstand
- **Wartungshistorie**: Wartungseinträge mit Typ, Beschreibung, Kosten, Datum und Kilometerstand
- **GPS-Tracking**: Fahrten mit Live-GPS-Tracking aufzeichnen
- **Fahrtenbuch**: Übersicht aller Fahrten mit Distanz und Dauer
- **Persistent Storage**: Daten werden mit Capacitor Preferences gespeichert

## 🛠️ Tech Stack

- **Framework**: Capacitor 6.0
- **UI Library**: Ionic React 8.0
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router
- **State**: React Hooks
- **Storage**: @capacitor/preferences
- **GPS**: @capacitor/geolocation
- **Date Formatting**: date-fns

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Capacitor/AutoLogbuch
npm install
```

### 2. Im Browser testen

```bash
npm run dev
```

Die App läuft auf `http://localhost:5173`

### 3. Native Apps erstellen

#### Android

**⚠️ WICHTIG: Java-Version**

Aktuell ist Java 25 installiert, aber Gradle unterstützt dies noch nicht. Verwende Java 17 oder 21:

**Lösung 1: Java 17 installieren (empfohlen)**
1. Download: https://adoptium.net/temurin/releases/?version=17
2. Installiere Java 17
3. Setze `JAVA_HOME`:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot"
   ```

**Lösung 2: Gradle über Android Studio ausführen**
```bash
# Android Studio öffnen
npm run open:android
```
Android Studio verwendet automatisch die richtige Java-Version.

**Nach Java-Installation:**
```bash
# Gradle Cache löschen
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches"

# Android App starten
npm run android
```

#### iOS (nur auf macOS)

```bash
# iOS hinzufügen
npx cap add ios

# Projekt syncen
npx cap sync

# Xcode öffnen
npm run open:ios
```

## 📝 Verwendung

### Erste Schritte

1. **Fahrzeug hinzufügen** - Klicke auf den "+" Button
2. **Wartung erfassen** - Wähle ein Fahrzeug aus
3. **Fahrt starten** - GPS-Tracking im Browser (nur über HTTPS/localhost)

### GPS im Browser

GPS funktioniert automatisch über `http://localhost:5173/`

### GPS-Berechtigungen

#### Android
Berechtigungen werden automatisch zur Laufzeit angefragt.

#### iOS
Info.plist enthält bereits die benötigten Permission-Strings.

## 📁 Projektstruktur

```
src/
├── models/           # TypeScript Interfaces (Fahrzeug, Wartung, Fahrt)
├── services/         # Business Logic
│   ├── database.service.ts    # Datenbank-Operationen
│   └── location.service.ts    # GPS-Tracking
├── pages/            # 7 Ionic Pages
│   ├── HomePage.tsx              # Fahrzeugliste
│   ├── AddFahrzeugPage.tsx       # Fahrzeug hinzufügen
│   ├── FahrzeugDetailPage.tsx    # Fahrzeugdetails
│   ├── AddWartungPage.tsx        # Wartung hinzufügen
│   ├── FahrtenListPage.tsx       # Fahrtenliste
│   ├── ActiveFahrtPage.tsx       # Live GPS-Tracking
│   └── FahrtDetailPage.tsx       # Fahrtdetails
├── theme/            # Ionic CSS Variables
├── App.tsx           # Main App Component
└── main.tsx          # Entry Point
```

## 🔧 Wichtige Befehle

```bash
# Dev Server starten
npm run dev

# Production Build
npm run build

# Capacitor sync (nach Code-Änderungen)
npm run sync

# Android App starten
npm run android

# iOS App starten (nur macOS)
npm run ios

# Android Studio öffnen
npm run open:android

# Xcode öffnen
npm run open:ios
```

## 🐛 Troubleshooting

### Port belegt
Ändere Port in `vite.config.ts`

### Build-Fehler
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Capacitor Sync-Fehler
```bash
npx cap sync
```

## 💡 Tipps

- **Hot Reload**: Änderungen im Code werden automatisch im Browser aktualisiert
- **Capacitor Sync**: Nach größeren Änderungen immer `npm run sync` ausführen
- **GPS im Browser**: Funktioniert nur über HTTPS oder localhost
- **Native Features**: Manche Features (GPS im Hintergrund) funktionieren nur in nativen Apps

## 📄 Lizenz

Dieses Projekt ist eine 1:1 Portierung der Flutter Auto-Logbuch App zu Vergleichszwecken.
