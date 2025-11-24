# WetterApp - Expo/React Native

Eine vollständige Wetter-App entwickelt mit **Expo** und **React Native**, die als Neuimplementierung der Flutter-Wetter-App dient.

## Features

✅ **Aktuelle Wetterdaten** für ausgewählte Stadt  
✅ **7-Tage Wettervorhersage** (horizontal scrollbar)  
✅ **Stündliche Wettervorhersage** für ausgewählten Tag  
✅ **Stadt-Suche Funktionalität**  
✅ **Liste beliebter Städte** (Quick Access)  
✅ **Pull-to-Refresh** für Datenerneuerung  
✅ **Optimierte Performance** mit FlatList  
✅ **State Management** mit Zustand  
✅ **TypeScript** für Type Safety  

## Technologie-Stack

- **Framework:** Expo / React Native
- **Sprache:** TypeScript
- **State Management:** Zustand
- **UI-Komponenten:** React Native Core + Expo Vector Icons
- **API:** OpenWeatherMap API
- **Gradients:** expo-linear-gradient

## Projekt-Struktur

```
wetterapp/
├── src/
│   ├── components/          # UI-Komponenten
│   │   ├── CurrentWeatherWidget.tsx
│   │   ├── WeatherForecastWidget.tsx
│   │   ├── HourlyWeatherWidget.tsx
│   │   ├── SearchBar.tsx
│   │   └── PopularCities.tsx
│   ├── models/             # TypeScript Interfaces & Models
│   │   ├── Weather.ts
│   │   ├── WeatherForecast.ts
│   │   └── HourlyWeather.ts
│   ├── screens/            # App Screens
│   │   └── WeatherScreen.tsx
│   ├── services/           # API Services
│   │   └── weatherService.ts
│   ├── store/              # State Management (Zustand)
│   │   └── weatherStore.ts
│   └── theme/              # Design Tokens
│       └── theme.ts
├── App.tsx                 # Haupteinstiegspunkt
├── package.json
├── tsconfig.json
├── app.json                # Expo Konfiguration
└── README.md
```

## Installation & Setup

### Voraussetzungen

- **Node.js** (v18 oder höher)
- **npm** oder **yarn**
- **Expo CLI** (optional, wird automatisch installiert)

### 1. Dependencies installieren

```bash
cd Expo/wetterapp
npm install
```

oder mit yarn:

```bash
yarn install
```

### 2. App starten

```bash
npm start
```

oder:

```bash
npx expo start
```

### 3. App auf Gerät/Emulator ausführen

Nach dem Start von `expo start`:

- **iOS Simulator:** Drücke `i` (nur auf macOS)
- **Android Emulator:** Drücke `a`
- **Web Browser:** Drücke `w`
- **Expo Go App:** Scanne den QR-Code mit der Expo Go App auf deinem Smartphone

## API-Konfiguration

Die App verwendet die **OpenWeatherMap API**. Der API-Key ist bereits in der App eingebunden:

```typescript
// src/services/weatherService.ts
const API_KEY = '263ea31dffaabd18f22500019c36e755';
```

**Hinweis:** Für Produktions-Apps sollte der API-Key in Umgebungsvariablen ausgelagert werden.

## Verwendung

### Stadt suchen

1. Gebe einen Stadtnamen in die Suchleiste ein
2. Tippe auf "Suchen" oder drücke Enter

### 7-Tage Vorhersage

- Scrolle horizontal durch die 7-Tage Vorhersage
- Tippe auf einen Tag, um stündliche Daten zu laden

### Aktualisieren

- **Pull-to-Refresh:** Ziehe den Bildschirm nach unten
- **Refresh-Button:** Tippe auf das Icon oben rechts

### Beliebte Städte

Tippe auf eine Stadt in der Liste "Beliebte Städte" für schnellen Zugriff.

## Build für Production

### Android APK/AAB Build

```bash
npx expo build:android
```

oder mit EAS Build:

```bash
npm install -g eas-cli
eas build --platform android
```

### iOS Build

```bash
npx expo build:ios
```

oder mit EAS Build:

```bash
eas build --platform ios
```

## Scripts

- `npm start` - Startet Expo Development Server
- `npm run android` - Startet auf Android
- `npm run ios` - Startet auf iOS (nur macOS)
- `npm run web` - Startet Web Version
- `npm run lint` - ESLint Check
- `npm run type-check` - TypeScript Type Check

## State Management

Die App verwendet **Zustand** für State Management:

```typescript
// Verwendung im Component
const { currentWeather, fetchWeatherData } = useWeatherStore();
```

### Store Actions

- `fetchWeatherData(cityName)` - Lade Wetterdaten für Stadt
- `refreshWeatherData()` - Aktualisiere aktuelle Stadt
- `fetchHourlyWeather(date)` - Lade stündliche Daten
- `selectDate(date)` - Wähle Tag für stündliche Anzeige
- `clearError()` - Lösche Fehlermeldung

## Design

Die App verwendet eine **blaue Farbpalette** ähnlich der Flutter-Version:

- **Primärfarbe:** #1976D2 (Blue 600)
- **Sekundärfarbe:** #FF9800 (Orange)
- **Hintergrund:** #F5F5F5 (Grey 100)

## Performance-Optimierung

- **FlatList** für horizontales Scrolling (7-Tage & stündliche Vorhersage)
- **Lazy Loading** von stündlichen Daten
- **Parallele API-Calls** mit `Promise.all()`
- **Memoization** mit React.memo (bei Bedarf)

## Unterschiede zur Flutter-Version

| Feature | Flutter | Expo/React Native |
|---------|---------|-------------------|
| State Management | Provider | Zustand |
| UI Framework | Material Design | React Native Core |
| Gradients | BoxDecoration | expo-linear-gradient |
| Icons | Material Icons | @expo/vector-icons (Feather) |
| Navigation | - | React Navigation (optional) |
| Performance Lists | ListView.builder | FlatList |

## Troubleshooting

### App startet nicht

```bash
# Cache löschen
npx expo start -c
```

### TypeScript Fehler

```bash
# Type Check
npm run type-check
```

### Dependencies Probleme

```bash
# node_modules neu installieren
rm -rf node_modules
npm install
```

## Lizenz

MIT License

## Autor

Entwickelt als Vergleichsprojekt für plattformübergreifende Mobilapplikationen.

---

**API Credits:** [OpenWeatherMap](https://openweathermap.org/)
