# AutoLogbuch - Flutter

Eine Fahrzeugverwaltungs-App mit GPS-Tracking, entwickelt mit Flutter.

## 📱 Features

- **Fahrzeugverwaltung**: Fahrzeuge mit Marke, Modell, Kennzeichen und Kilometerstand hinzufügen
- **Wartungshistorie**: Wartungseinträge mit Typ, Beschreibung, Kosten und Datum erfassen
- **GPS-Tracking**: Fahrten mit Live-GPS-Tracking aufzeichnen
- **Fahrtenbuch**: Übersicht aller Fahrten mit Distanz, Dauer und Routen
- **SQLite Datenbank**: Persistente lokale Datenspeicherung
- **Material Design**: Native Android und iOS UI

## 🛠️ Tech Stack

- **Framework**: Flutter 3.x
- **Sprache**: Dart 3.x
- **Datenbank**: Drift (SQLite)
- **GPS**: Geolocator Package
- **State**: StatefulWidget + StreamBuilder

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Flutter/autologbuch
flutter pub get
```

### 2. Code generieren (Drift Datenbank)

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 3. App starten

```bash
flutter run
```

Wähle dann:
- **Android Emulator**: Drücke `a`
- **iOS Simulator**: Drücke `i` (nur macOS)
- **Chrome Browser**: Drücke `c`

## 📝 Verwendung

### Features testen

1. **Fahrzeug hinzufügen** - Klicke auf `+` Button
2. **Wartung erfassen** - Fahrzeug auswählen → Wartung hinzufügen
3. **Fahrt starten** - GPS-Berechtigung erlauben → Fahrt starten
4. **Fahrt aufzeichnen** - Bewege dich oder simuliere GPS
5. **Fahrt beenden** - Fahrt beenden → Details ansehen

### GPS-Berechtigungen

**Android** - In `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

**iOS** - In `ios/Runner/Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Diese App benötigt Zugriff auf GPS für die Fahrtaufzeichnung.</string>
```

## 📁 Projektstruktur

```
lib/
├── main.dart                 # Entry Point
├── database/                 # Drift Datenbank
│   └── database.dart
├── screens/                  # UI Screens
│   ├── home_page.dart
│   ├── fahrzeug_detail_page.dart
│   ├── add_fahrzeug_page.dart
│   ├── add_wartung_page.dart
│   ├── fahrten_list_page.dart
│   ├── active_fahrt_page.dart
│   └── fahrt_detail_page.dart
└── services/                 # Business Logic
    └── location_service.dart
```

## 🔧 Wichtige Befehle

```bash
# Hot Reload
r

# Hot Restart
R

# Build für Android
flutter build apk

# Build für iOS
flutter build ios

# Tests
flutter test
```

## 🐛 Troubleshooting

### "Code nicht generiert"
```bash
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs
```

### "GPS funktioniert nicht"
- Prüfe Berechtigungen in AndroidManifest.xml
- Aktiviere Location Services auf Gerät
- Im Simulator: Fake Location setzen

### Dependencies fehlen
```bash
flutter clean
flutter pub get
```

## 💡 Tipps

- **Hot Reload**: `r` in der laufenden App
- **Hot Restart**: `R` für vollständigen Neustart
- **Code-Generierung**: Nach Drift-Änderungen `build_runner` ausführen

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
