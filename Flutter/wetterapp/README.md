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
- **State**: Provider
- **UI**: Material Design Widgets
- **API**: OpenWeatherMap API
- **Env**: flutter_dotenv für Umgebungsvariablen

## 💻 Systemvoraussetzungen

### Minimum
- **Flutter SDK**: 3.0.0 oder höher
- **Dart SDK**: 3.0.0+ (im Flutter SDK enthalten)
- **Betriebssystem**: Windows 10+, macOS 10.15+, Linux Ubuntu 18.04+
- **RAM**: 8 GB
- **Speicherplatz**: 10 GB frei
- **OpenWeatherMap API Key**: Kostenlos von https://openweathermap.org/api

### Empfohlen
- **Flutter SDK**: Latest stable
- **RAM**: 16 GB
- **SSD**: Für bessere Performance

### Für Android-Entwicklung
- **Android Studio**: Latest stable
- **Android SDK**: API Level 21+ (Android 5.0+)
- **JDK**: Version 11+
- **Android Emulator**: Optional

### Für iOS-Entwicklung (nur macOS)
- **Xcode**: 13.0+
- **CocoaPods**: Latest
- **macOS**: 11.0+ (Big Sur)
- **iOS Simulator**: Im Xcode enthalten

### Installation der Voraussetzungen

#### 1. Flutter SDK installieren

**Windows:**
```bash
# Download: https://flutter.dev/docs/get-started/install/windows
# Zu PATH hinzufügen
# Verifizieren:
flutter doctor
```

**macOS:**
```bash
# Mit Homebrew:
brew install flutter

# Verifizieren:
flutter doctor
```

**Linux:**
```bash
sudo snap install flutter --classic
flutter doctor
```

#### 2. Flutter Doctor ausführen
```bash
flutter doctor
```
Dieser Befehl zeigt, was noch installiert werden muss.

#### 3. OpenWeatherMap API Key
1. Registrieren: https://openweathermap.org/api
2. Kostenlosen API Key generieren
3. In `.env` Datei eintragen (siehe unten)

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Flutter/wetterapp
flutter pub get
```

### 2. API Key konfigurieren

1. Kopiere `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Trage deinen OpenWeatherMap API Key in `.env` ein:
   ```
   API_KEY=dein_api_key_hier
   ```

3. Hole dir einen kostenlosen API Key von: https://openweathermap.org/api

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
├── providers/                # State Management
│   └── weather_provider.dart
├── services/                 # API Services
│   └── weather_service.dart
├── screens/                  # UI Screens
│   └── weather_screen.dart
└── widgets/                  # UI Components
    ├── current_weather_widget.dart
    ├── weather_forecast_widget.dart
    ├── hourly_weather_widget.dart
    └── performance_optimized_list_view.dart
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
