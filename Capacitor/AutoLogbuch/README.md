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

## 🚀 Installation & Setup

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

### 3. Android/iOS Plattformen hinzufügen

```bash
npx cap add android
npx cap add ios
```

### 4. Projekt syncen

```bash
npm run sync
```

### 5. Native Apps öffnen

```bash
# Android Studio
npm run open:android

# Xcode
npm run open:ios
```

## 📝 Scripts

- `npm run dev` - Vite Dev Server starten
- `npm run build` - Production Build
- `npm run preview` - Production Build Preview
- `npm run sync` - Capacitor sync
- `npm run android` - Android App starten
- `npm run ios` - iOS App starten
- `npm run open:android` - Android Studio öffnen
- `npm run open:ios` - Xcode öffnen

## 🔑 Berechtigungen

### Android (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

### iOS (ios/App/App/Info.plist)

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Diese App benötigt Zugriff auf GPS für die Fahrtaufzeichnung.</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>Diese App benötigt dauerhaften Zugriff auf GPS für Hintergrund-Tracking.</string>
```

## 🗄️ Datenbank-Schema

Die App verwendet **Capacitor Preferences** für die Datenspeicherung mit 3 Hauptdatenstrukturen:

### Fahrzeuge
- id (number)
- marke (string)
- modell (string)
- kennzeichen (string)
- kilometerstand (number)
- createdAt (ISO string)

### Wartungen
- id (number)
- fahrzeugId (number)
- typ (string)
- beschreibung (string)
- kosten (number)
- datum (ISO string)
- kilometerstand (number)

### Fahrten
- id (number)
- fahrzeugId (number)
- startZeit (ISO string)
- endZeit (ISO string | null)
- distanzKm (number)
- notizen (string)
- positionen (Position[])

## 🌐 Browser vs. Native

**Im Browser:**
- GPS funktioniert nur über HTTPS oder localhost
- Preferences werden in LocalStorage gespeichert

**Native (Android/iOS):**
- Voller Zugriff auf GPS mit Hintergrund-Tracking
- Preferences nutzen native Storage APIs

## 📊 Vergleich Flutter vs. Capacitor

| Feature | Flutter | Capacitor/Ionic |
|---------|---------|-----------------|
| Datenbank | Drift (SQLite) | Preferences (Key-Value) |
| GPS | Geolocator | @capacitor/geolocation |
| UI Framework | Material Design | Ionic Components |
| State Management | StreamBuilder | React Hooks (useState) |
| Navigation | Navigator | React Router |
| Build Tool | Flutter CLI | Vite |

## 🎯 Nächste Schritte

1. **SQLite Integration**: Statt Preferences könnte `@capacitor-community/sqlite` für komplexere Queries genutzt werden
2. **Offline-First**: Service Worker für PWA-Funktionalität
3. **Karten-Integration**: Leaflet oder Google Maps für Routenanzeige
4. **Export**: CSV/PDF Export für Fahrtenbuch

## 📄 Lizenz

Dieses Projekt ist eine 1:1 Portierung der Flutter Auto-Logbuch App zu Vergleichszwecken.
