# WetterApp - Flutter

Eine moderne Wetter-App mit OpenWeatherMap API, entwickelt mit Flutter.

## 📱 Features

- **Aktuelle Wetterdaten**: Temperatur, Beschreibung, Luftfeuchtigkeit, Wind
- **7-Tage Vorhersage**: Horizontal scrollbare Wochenübersicht
- **Stündliche Vorhersage**: Detaillierte 24-Stunden-Prognose
- **Stadt-Suche**: Suche nach beliebigen Städten weltweit
- **Beliebte Städte**: Schnellzugriff auf häufig genutzte Städte
- **Pull-to-Refresh**: Daten aktualisieren durch Herunterziehen
- **Material Design**: Native UI für Android und iOS

## 🛠️ Tech Stack

- **Framework**: Flutter 3.x
- **Sprache**: Dart 3.x
- **HTTP**: http Package für API-Calls
- **State**: Provider / StatefulWidget
- **UI**: Material Design Widgets
- **API**: OpenWeatherMap API

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Flutter/wetterapp
flutter pub get
```

### 2. API Key konfigurieren

API Key ist bereits in `lib/services/weather_service.dart` konfiguriert.
Für eigenen Key: Registriere dich auf https://openweathermap.org/api

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

1. **Stadt auswählen** - Aus der Liste beliebter Städte
2. **Stadt suchen** - Suchfeld nutzen für beliebige Stadt
3. **Aktuelles Wetter** - Temperatur, Beschreibung, Luftfeuchtigkeit, Wind
4. **7-Tage Vorhersage** - Horizontal durchscrollen
5. **Stündliche Vorhersage** - Auf Tag tippen für 24h-Details
6. **Aktualisieren** - Nach unten ziehen (Pull-to-Refresh)

## 📁 Projektstruktur

```
lib/
├── main.dart                 # Entry Point
├── models/                   # Datenmodelle
│   ├── weather.dart
│   ├── weather_forecast.dart
│   └── hourly_weather.dart
├── services/                 # API Services
│   └── weather_service.dart
├── screens/                  # UI Screens
│   └── weather_screen.dart
└── widgets/                  # UI Components
    ├── current_weather_widget.dart
    ├── forecast_widget.dart
    ├── hourly_weather_widget.dart
    └── search_bar_widget.dart
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

# Tests ausführen
flutter test
```

## 🌐 API Integration

### OpenWeatherMap API

Die App verwendet folgende Endpoints:
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`

Konfiguriert in `lib/services/weather_service.dart`

## 🐛 Troubleshooting

### "API Fehler"
- Internet-Verbindung prüfen
- API-Key gültig?
- Stadt korrekt geschrieben?

### "Dependencies fehlen"
```bash
flutter clean
flutter pub get
flutter run
```

### "Build-Fehler"
```bash
flutter clean
flutter pub get
flutter run
```

## 💡 Tipps

- **Hot Reload**: `r` in der laufenden App
- **Hot Restart**: `R` für vollständigen Neustart
- **API-Limit**: Kostenloser Plan hat 60 Calls/Minute Limit
- **Offline**: App funktioniert mit letzten gecachten Daten

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
