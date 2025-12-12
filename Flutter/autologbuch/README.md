# AutoLogbuch - Flutter

Eine Fahrzeugverwaltungs-App mit GPS-Tracking, entwickelt mit Flutter.

## 📱 Features

- **Fahrzeugverwaltung**: Fahrzeuge mit Marke, Modell, Kennzeichen und Kilometerstand hinzufügen
- **Wartungshistorie**: Wartungseinträge mit Typ, Beschreibung, Kosten und Datum erfassen
- **GPS-Tracking**: Fahrten mit Live-GPS-Tracking aufzeichnen
- **Fahrtenbuch**: Übersicht aller Fahrten mit Distanz, Dauer und Routen
- **SQLite Datenbank**: Persistente lokale Datenspeicherung
- **Material Design**: Native Android und iOS UI

## 🛠️ Technologie-Stack

- **Framework**: Flutter 3.x
- **Sprache**: Dart 3.x
- **Datenbank**: Drift (SQLite)
- **GPS**: Geolocator Package
- **State**: StatefulWidget + StreamBuilder

## 🚀 Installation & Start

### Voraussetzungen
- Flutter SDK installiert
- Android Studio oder Xcode (für iOS)

### Befehle
```bash
# Dependencies installieren
flutter pub get

# App starten
flutter run

# Auf spezifischer Plattform
flutter run -d android
flutter run -d ios
flutter run -d chrome
```

## 📁 Projektstruktur

```
lib/
├── main.dart                 # Entry Point
├── models/                   # Datenmodelle
│   ├── fahrzeug.dart
│   ├── wartung.dart
│   └── fahrt.dart
├── database/                 # Drift Datenbank
│   └── database.dart
├── screens/                  # UI Screens
│   ├── home_screen.dart
│   ├── fahrzeug_detail_screen.dart
│   ├── add_fahrzeug_screen.dart
│   ├── add_wartung_screen.dart
│   ├── fahrten_list_screen.dart
│   ├── active_fahrt_screen.dart
│   └── fahrt_detail_screen.dart
└── services/                 # Business Logic
    └── location_service.dart
```

## 🎯 Hauptfunktionen

### Fahrzeuge
- Fahrzeug hinzufügen (Marke, Modell, Kennzeichen)
- Fahrzeuge anzeigen
- Kilometerstand verwalten

### Wartungen
- Wartung erfassen (Datum, Kosten, Beschreibung)
- Wartungshistorie pro Fahrzeug
- Gesamtkosten berechnen

### Fahrten
- Fahrt starten (GPS-Tracking)
- Live-Distanzberechnung
- Fahrt beenden
- Fahrtenbuch mit Details

## 📦 Wichtige Packages

```yaml
dependencies:
  flutter:
    sdk: flutter
  drift: ^2.x.x              # SQLite ORM
  geolocator: ^10.x.x        # GPS-Tracking
  intl: ^0.18.x              # Datum-Formatierung
  path: ^1.8.x               # Pfad-Utilities
```

## 🔐 Berechtigungen

### Android
In `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### iOS
In `ios/Runner/Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Diese App benötigt Zugriff auf GPS für die Fahrtaufzeichnung.</string>
```

## 📊 Datenbank-Schema

### Fahrzeuge
- id (INT, Primary Key)
- marke (TEXT)
- modell (TEXT)
- kennzeichen (TEXT)
- kilometerstand (REAL)
- created_at (DATETIME)

### Wartungen
- id (INT, Primary Key)
- fahrzeug_id (INT, Foreign Key)
- typ (TEXT)
- beschreibung (TEXT)
- kosten (REAL)
- datum (DATETIME)
- kilometerstand (REAL)

### Fahrten
- id (INT, Primary Key)
- fahrzeug_id (INT, Foreign Key)
- start_zeit (DATETIME)
- end_zeit (DATETIME, nullable)
- distanz_km (REAL)
- notizen (TEXT)
- positionen (JSON)

## 🎨 UI/UX

- Material Design Komponenten
- Responsive Layout
- Smooth Animationen
- FloatingActionButton für Haupt-Aktionen
- Bottom Sheets für Aktionsmenüs
- Pull-to-Refresh
- Loading States

## 🔧 Entwicklung

### Hot Reload
```bash
# In der laufenden App: 'r' drücken
r
# Hot Restart: 'R' drücken
R
```

### Code-Generierung (Drift)
```bash
flutter pub run build_runner build
```

### Tests
```bash
flutter test
```

## 📱 Build

### Android APK
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## 🐛 Troubleshooting

### GPS funktioniert nicht
- Berechtigungen in AndroidManifest.xml / Info.plist prüfen
- Location Services auf Gerät aktiviert?
- Im Simulator: Fake Location setzen

### Drift Fehler
```bash
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs
```

## 📚 Weitere Dokumentation

- [Flutter Docs](https://flutter.dev/docs)
- [Drift Docs](https://drift.simonbinder.eu)
- [Geolocator Package](https://pub.dev/packages/geolocator)

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
