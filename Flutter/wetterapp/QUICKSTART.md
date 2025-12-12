# WetterApp - Flutter - Quick Start

## 🚀 In 2 Schritten starten

### 1. Dependencies installieren
```bash
cd Flutter/wetterapp
flutter pub get
```

### 2. App starten
```bash
flutter run
```

Wähle dann:
- **Android Emulator**: Drücke `a`
- **iOS Simulator**: Drücke `i` (nur macOS)
- **Chrome Browser**: Drücke `c`

## 📱 Features testen

1. **Standard-Stadt** - Zeigt Zürich beim Start
2. **Stadt suchen** - Klicke auf Suche-Icon, gib Stadt ein
3. **7-Tage Vorhersage** - Scrolle horizontal durch die Woche
4. **Stündliche Vorhersage** - Klicke auf einen Tag
5. **Aktualisieren** - Ziehe nach unten (Pull-to-Refresh)

## 🌐 API

Die App verwendet OpenWeatherMap API:
- API Key ist bereits konfiguriert
- Keine zusätzliche Einrichtung nötig
- 60 Anfragen pro Minute kostenlos

## 🔧 Wichtige Befehle

```bash
# Hot Reload (in laufender App)
r

# Hot Restart
R

# Build für Android
flutter build apk

# Build für iOS  
flutter build ios

# Build für Web
flutter build web
```

## 🎨 Anpassungen

### Andere Stadt beim Start
In `lib/screens/weather_screen.dart`:
```dart
String _cityName = 'Berlin'; // Statt 'Zürich'
```

### Andere Sprache
In `lib/services/weather_service.dart`:
```dart
static const String _language = 'en'; // Statt 'de'
```

## 🐛 Häufige Probleme

### "Keine Daten angezeigt"
- Prüfe Internetverbindung
- API-Limit erreicht? (60/Minute)

### "Stadt nicht gefunden"
- Prüfe Schreibweise
- Verwende lateinische Buchstaben

### Dependencies fehlen
```bash
flutter clean
flutter pub get
flutter run
```

## ✅ Fertig!

Die App sollte nun laufen und Wetter-Daten anzeigen. Viel Spaß! ☀️🌧️
