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

## 🛠️ Technologie-Stack

- **Framework**: Flutter 3.x
- **Sprache**: Dart 3.x
- **HTTP**: http Package für API-Calls
- **State**: Provider / StatefulWidget
- **UI**: Material Design Widgets
- **API**: OpenWeatherMap API

## 🚀 Installation & Start

### Voraussetzungen
- Flutter SDK installiert
- OpenWeatherMap API Key (bereits konfiguriert)

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

## 🌐 API Integration

### OpenWeatherMap API
Die App verwendet folgende Endpoints:
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`

API Key ist in `lib/services/weather_service.dart` konfiguriert.

### Beispiel API-Call
```dart
final weatherService = WeatherService();
final weather = await weatherService.getCurrentWeather('Zürich');
```

## 🎯 Hauptfunktionen

### Aktuelles Wetter
- Temperatur (°C)
- Wetterbeschreibung
- Gefühlte Temperatur
- Luftfeuchtigkeit
- Windgeschwindigkeit
- Wetter-Icon

### 7-Tage Vorhersage
- Min/Max Temperaturen
- Wetterbeschreibung
- Horizontal scrollbar
- Klickbar für Details

### Stündliche Vorhersage
- 24-Stunden Prognose
- Temperatur pro Stunde
- Wetter-Icons
- Zeitangabe

### Stadt-Suche
- Echtzeit-Suche
- Beliebte Städte Liste
- Such-Historie (optional)

## 📦 Wichtige Packages

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.x               # HTTP Requests
  intl: ^0.18.x              # Datum/Zeit Formatierung
```

## 🎨 UI/UX

- **Farbschema**: Blau (#2196F3) als Primary Color
- **Material Design** Komponenten
- **Responsive Layout** für verschiedene Bildschirmgrößen
- **Loading States** während API-Calls
- **Error Handling** mit Fehlermeldungen
- **Pull-to-Refresh** Geste
- **Smooth Scrolling** und Animationen

## 🔧 Konfiguration

### API Key einrichten

1. Kopiere `.env.example` zu `.env`:
```bash
cp .env.example .env
```

2. Füge deinen OpenWeatherMap API Key in `.env` ein:
```env
API_KEY=dein_api_key_hier
```

### API Key ändern
Bearbeite die `.env` Datei:
```env
API_KEY=YOUR_NEW_API_KEY
```

### Sprache ändern
In `lib/services/weather_service.dart`:
```dart
// Ändere 'de' zu gewünschter Sprache (z.B. 'en')
'$_baseUrl/weather?q=$cityName&appid=$_apiKey&units=metric&lang=de'
```

### Einheiten ändern
```dart
// Ändere 'metric' zu 'imperial' für Fahrenheit
units=metric  // Celsius
units=imperial  // Fahrenheit
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

### Web
```bash
flutter build web
```

## 🔧 Entwicklung

### Hot Reload
```bash
# In der laufenden App: 'r' drücken
r
```

### Debug
```bash
flutter run --verbose
```

### Logs
```bash
flutter logs
```

## 🐛 Troubleshooting

### API-Fehler
- Prüfe API Key
- Prüfe Internetverbindung
- Prüfe API-Limits (60 Calls/Minute)

### Bilder laden nicht
- Prüfe Internetverbindung
- Wetter-Icon URLs korrekt?

### Build-Fehler
```bash
flutter clean
flutter pub get
flutter run
```

## 🌍 Unterstützte Städte

Die App funktioniert mit allen Städten weltweit. Beispiele:
- Zürich, Bern, Basel (Schweiz)
- Berlin, München, Hamburg (Deutschland)
- Wien, Salzburg, Graz (Österreich)
- Und viele mehr...

## 📚 Weitere Dokumentation

- [Flutter Docs](https://flutter.dev/docs)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [http Package](https://pub.dev/packages/http)

## 🎯 Mögliche Erweiterungen

- Favoriten-Städte speichern
- Wetter-Benachrichtigungen
- Dark Mode
- Wetter-Charts
- Offline-Modus mit Caching
- Geolocation für aktuellen Standort

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
