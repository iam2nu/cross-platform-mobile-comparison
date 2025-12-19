# WetterApp - Expo React Native

Eine moderne Wetter-App mit OpenWeatherMap API, entwickelt mit Expo und React Native.

## 📱 Features

- **Aktuelle Wetterdaten**: Temperatur, Beschreibung, Luftfeuchtigkeit, Wind
- **7-Tage Vorhersage**: Horizontal scrollbare Wochenübersicht
- **Stündliche Vorhersage**: Detaillierte 24-Stunden-Prognose für ausgewählten Tag
- **Stadt-Suche**: Echtzeit-Suche nach beliebigen Städten weltweit
- **Beliebte Städte**: Schnellzugriff auf Schweizer Städte
- **Pull-to-Refresh**: Daten durch Herunterziehen aktualisieren
- **State Management**: Zustand für globales State Management

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **State**: Zustand (State Management Library)
- **HTTP**: Fetch API
- **API**: OpenWeatherMap API

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd Expo/wetterapp
npm install
```

### 2. API Key konfigurieren

1. Erstelle `.env` Datei im Projekt-Root:
   ```bash
   cp .env.example .env
   ```

2. Trage deinen API Key ein:
   ```
   EXPO_PUBLIC_WEATHER_API_KEY=dein_api_key_hier
   ```

3. Registriere dich auf https://openweathermap.org/api für einen kostenlosen Key

### 3. App starten

```bash
npm start
```

Dann wählen:
- **Android**: Drücke `a` (Emulator) oder scanne QR-Code mit Expo Go
- **iOS**: Drücke `i` (Simulator, nur macOS) oder scanne QR-Code
- **Web**: Drücke `w`

### 4. Expo Go App

**Installation:**
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

**Verwendung:**
1. Expo Go öffnen
2. QR-Code scannen
3. App lädt automatisch

## 📝 Verwendung

### Features testen

1. **Stadt auswählen** - Aus der Liste beliebter Städte
2. **Stadt suchen** - Tippe auf Suchfeld und gib Stadt ein
3. **Aktuelles Wetter** - Temperatur, Beschreibung, Luftfeuchtigkeit, Wind
4. **7-Tage Vorhersage** - Scrolle horizontal durch die Woche
5. **Stündliche Vorhersage** - Tippe auf einen Tag für 24h-Details
6. **Aktualisieren** - Ziehe Liste nach unten (Pull-to-Refresh)

## 📁 Projektstruktur

```
src/
├── components/               # UI Components
│   ├── CurrentWeatherWidget.tsx
│   ├── WeatherForecastWidget.tsx
│   ├── HourlyWeatherWidget.tsx
│   ├── SearchBar.tsx
│   ├── PopularCities.tsx
│   └── index.ts
├── models/                   # TypeScript Interfaces
│   ├── Weather.ts
│   ├── WeatherForecast.ts
│   ├── HourlyWeather.ts
│   └── index.ts
├── services/                 # API Services
│   ├── weatherService.ts
│   └── index.ts
├── store/                    # State Management
│   ├── weatherStore.ts
│   └── index.ts
├── screens/                  # Screen Components
│   ├── WeatherScreen.tsx
│   └── index.ts
└── theme/                    # Design Tokens
    ├── theme.ts
    └── index.ts
```

## 🔧 Wichtige Befehle

```bash
# Development Server
npm start

# Mit Cache-Clear
npx expo start -c

# Spezifische Plattform
npm run android
npm run ios
npm run web

# TypeScript Check
npx tsc --noEmit
```

## 🌐 API Integration

### OpenWeatherMap API

Die App verwendet folgende Endpoints:
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`

Konfiguriert in `src/services/weatherService.ts`

## 🐛 Troubleshooting

### "Cannot connect to Metro"
```bash
npx expo start -c
```

### "API Fehler"
- Prüfe Internet-Verbindung
- API-Key gültig?
- Stadt korrekt geschrieben?

### Dependencies fehlen
```bash
rm -rf node_modules
npm install
npx expo start -c
```

## 💡 Tipps

- **Dev-Menu**: Gerät schütteln oder `Cmd+D` (iOS) / `Ctrl+M` (Android)
- **Reload**: `r` im Terminal drücken
- **Clear Cache**: `npx expo start -c`
- **API-Limit**: Kostenloser Plan hat 60 Calls/Minute Limit

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
