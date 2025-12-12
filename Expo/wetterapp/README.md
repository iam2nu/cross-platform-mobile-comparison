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

## 🛠️ Technologie-Stack

- **Framework**: Expo SDK 54
- **Sprache**: TypeScript 5.9
- **UI**: React Native Components
- **State**: Zustand (State Management Library)
- **HTTP**: Axios für API-Calls
- **API**: OpenWeatherMap API
- **Navigation**: React Navigation (optional)

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v18+)
- Expo Go App auf Smartphone
- Optional: Android Emulator oder iOS Simulator

### Befehle
```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Auf spezifischer Plattform
npm run android    # Android
npm run ios        # iOS (nur macOS)
npm run web        # Web Browser
```

## 📁 Projektstruktur

```
src/
├── components/               # UI Components
│   ├── CurrentWeatherWidget.tsx
│   ├── WeatherForecastWidget.tsx
│   ├── HourlyWeatherWidget.tsx
│   └── SearchBar.tsx
├── models/                   # TypeScript Interfaces
│   ├── Weather.ts
│   ├── WeatherForecast.ts
│   └── HourlyWeather.ts
├── services/                 # API Services
│   └── weatherService.ts
├── store/                    # State Management
│   └── weatherStore.ts
├── screens/                  # Screen Components
│   └── WeatherScreen.tsx
└── theme/                    # Design Tokens
    └── theme.ts
```

## 🌐 API Integration

### OpenWeatherMap API
Die App verwendet folgende Endpoints:
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`

API Key ist in `src/services/weatherService.ts` konfiguriert.

### Beispiel API-Call
```typescript
import { weatherService } from './src/services/weatherService';

const weather = await weatherService.getCurrentWeather('Zürich');
const forecast = await weatherService.getWeatherForecast('Zürich');
```

## 🎯 Hauptfunktionen

### Aktuelles Wetter
- Temperatur (°C)
- Wetterbeschreibung (Deutsch)
- Gefühlte Temperatur
- Luftfeuchtigkeit (%)
- Windgeschwindigkeit (km/h)
- Wetter-Icon

### 7-Tage Vorhersage
- Min/Max Temperaturen
- Wetterbeschreibung
- Wetter-Icons
- Horizontal scrollbar
- Klickbar für stündliche Details

### Stündliche Vorhersage
- 24-Stunden Prognose für ausgewählten Tag
- Temperatur pro Stunde
- Wetter-Icons
- Zeitangabe (HH:MM)

### Stadt-Suche
- Echtzeit-Suche beim Tippen
- Beliebte Städte als Quick-Access
- Fehlerbehandlung bei ungültigen Städten

## 📦 Wichtige Dependencies

```json
{
  "expo": "~54.0.23",
  "react-native": "0.81.5",
  "zustand": "^5.0.2",
  "axios": "^1.7.9",
  "date-fns": "^4.1.0",
  "typescript": "~5.9.2"
}
```

## 🎨 UI/UX

- **Farbschema**: Blau (#1976D2) als Primary, Orange (#FF9800) als Accent
- **Material Design** inspirierte Komponenten
- **Responsive Layout** für verschiedene Bildschirmgrößen
- **Loading States** während API-Calls
- **Error Handling** mit Fehlermeldungen
- **Pull-to-Refresh** Geste
- **Smooth Scrolling** und Animationen
- **TouchableOpacity** für interaktive Elemente

## 🔧 Konfiguration

### API Key ändern
In `src/services/weatherService.ts`:
```typescript
const API_KEY = 'YOUR_API_KEY';
```

### Sprache ändern
```typescript
const API_LANGUAGE = 'en'; // Statt 'de'
```

### Standard-Stadt ändern
In `src/screens/WeatherScreen.tsx`:
```typescript
const [cityName, setCityName] = useState('Berlin'); // Statt 'Zürich'
```

## 📱 State Management

Die App verwendet **Zustand** für globales State Management:

```typescript
// Store verwenden
const {
  currentWeather,
  forecast,
  hourlyWeather,
  isLoading,
  error,
  fetchWeatherData,
  selectDate,
} = useWeatherStore();

// Daten laden
await fetchWeatherData('Zürich');

// Tag auswählen
selectDate(new Date());
```

## 🔧 Entwicklung

### Hot Reload
- Änderungen werden automatisch aktualisiert
- Shake-Geste für Dev-Menu
- `Cmd+D` (iOS) oder `Ctrl+M` (Android) für Dev-Menu

### Debugging
```bash
# React Native Debugger verwenden
npm start
# Im Dev-Menu "Debug" wählen
```

### TypeScript Check
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## 📱 Build & Deployment

### Development Build
```bash
eas build --profile development --platform android
```

### Production Build
```bash
eas build --platform android
eas build --platform ios
```

### Over-the-Air Updates
```bash
eas update --branch production
```

## 🐛 Troubleshooting

### API-Fehler
- Prüfe API Key
- Prüfe Internetverbindung
- API-Limit erreicht? (60 Calls/Minute kostenlos)

### "Cannot connect to Metro"
```bash
npx expo start -c
```

### Bilder laden nicht
- Internetverbindung prüfen
- Wetter-Icon URLs korrekt?

### Dependencies fehlen
```bash
rm -rf node_modules
npm install
npx expo start -c
```

## 🌍 Unterstützte Städte

Die App funktioniert mit allen Städten weltweit. Beispiele:
- **Schweiz**: Zürich, Bern, Basel, Genf, Lausanne, Luzern, St. Gallen, Lugano
- **Deutschland**: Berlin, München, Hamburg, Köln, Frankfurt
- **Österreich**: Wien, Salzburg, Graz, Innsbruck
- **Und viele mehr...**

## 📚 Weitere Dokumentation

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 🎯 Mögliche Erweiterungen

- Favoriten-Städte speichern (AsyncStorage)
- Geolocation für aktuellen Standort
- Wetter-Benachrichtigungen
- Dark Mode Toggle
- Mehrsprachigkeit (i18n)
- Offline-Modus mit Caching
- Wetter-Charts mit Victory Native
- Animation bei Wetter-Übergängen

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
