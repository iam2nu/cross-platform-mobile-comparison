# WetterApp - Projekt Setup Anleitung

## Schritt-für-Schritt Anleitung zum Erstellen des Projekts von Grund auf

### 1. Neue Expo App erstellen (Optional - bereits erstellt)

Falls Sie das Projekt von Grund auf neu erstellen möchten:

```bash
# Mit TypeScript Template
npx create-expo-app wetterapp --template blank-typescript

cd wetterapp
```

### 2. Dependencies installieren

```bash
npm install zustand expo-linear-gradient
```

oder alle auf einmal:

```bash
npm install zustand expo-linear-gradient @expo/vector-icons expo-status-bar react-native-safe-area-context
```

### 3. Verzeichnisstruktur erstellen

```bash
# PowerShell (Windows)
New-Item -ItemType Directory -Path src/models, src/services, src/store, src/screens, src/components, src/theme

# Bash (macOS/Linux)
mkdir -p src/{models,services,store,screens,components,theme}
```

### 4. Dateien erstellen

Die folgenden Dateien wurden bereits erstellt:

#### Models
- `src/models/Weather.ts`
- `src/models/WeatherForecast.ts`
- `src/models/HourlyWeather.ts`
- `src/models/index.ts`

#### Services
- `src/services/weatherService.ts`
- `src/services/index.ts`

#### Store
- `src/store/weatherStore.ts`
- `src/store/index.ts`

#### Theme
- `src/theme/theme.ts`
- `src/theme/index.ts`

#### Components
- `src/components/CurrentWeatherWidget.tsx`
- `src/components/WeatherForecastWidget.tsx`
- `src/components/HourlyWeatherWidget.tsx`
- `src/components/SearchBar.tsx`
- `src/components/PopularCities.tsx`
- `src/components/index.ts`

#### Screens
- `src/screens/WeatherScreen.tsx`
- `src/screens/index.ts`

#### Root
- `App.tsx`

### 5. Konfigurationsdateien

Die folgenden Dateien wurden konfiguriert:
- `package.json` - Dependencies und Scripts
- `app.json` - Expo Konfiguration
- `tsconfig.json` - TypeScript Konfiguration
- `babel.config.js` - Babel Konfiguration

### 6. Projekt starten

```bash
npm start
```

oder mit Expo CLI:

```bash
npx expo start
```

### 7. App testen

- **Android:** Drücke `a` im Terminal oder scanne QR-Code mit Expo Go
- **iOS:** Drücke `i` im Terminal (nur macOS) oder scanne QR-Code
- **Web:** Drücke `w` im Terminal

## Dateiübersicht

### API Service (`weatherService.ts`)

Enthält drei Hauptfunktionen:
- `getCurrentWeather(cityName)` - Aktuelle Wetterdaten
- `getWeatherForecast(cityName)` - 7-Tage Vorhersage
- `getHourlyWeather(cityName, date)` - Stündliche Daten

### State Store (`weatherStore.ts`)

Zustand Store mit:
- **States:** currentWeather, forecast, hourlyWeather, isLoading, error, etc.
- **Actions:** fetchWeatherData, refreshWeatherData, selectDate, etc.

### Komponenten

Alle UI-Komponenten sind eigenständig und wiederverwendbar:
- **CurrentWeatherWidget** - Zeigt aktuelle Wetterdaten mit Gradient
- **WeatherForecastWidget** - 7-Tage Vorhersage mit horizontalem Scroll
- **HourlyWeatherWidget** - Stündliche Vorhersage
- **SearchBar** - Stadt-Suchfeld
- **PopularCities** - Quick-Access zu beliebten Städten

## Wichtige Konzepte

### 1. State Management mit Zustand

```typescript
// Store definieren
export const useWeatherStore = create<WeatherState>((set, get) => ({
  currentWeather: null,
  fetchWeatherData: async (cityName) => {
    // Implementation
  }
}));

// In Komponente verwenden
const { currentWeather, fetchWeatherData } = useWeatherStore();
```

### 2. TypeScript Models

```typescript
export interface Weather {
  cityName: string;
  temperature: number;
  // ...
}

export const parseWeather = (json: WeatherApiResponse): Weather => {
  // Parse API response
};
```

### 3. FlatList für Performance

```typescript
<FlatList
  data={forecasts}
  renderItem={renderForecastCard}
  keyExtractor={(item, index) => `${item.date}-${index}`}
  horizontal
  showsHorizontalScrollIndicator={false}
/>
```

### 4. Pull-to-Refresh

```typescript
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={isLoading}
      onRefresh={handleRefresh}
    />
  }
>
```

## Nächste Schritte

1. **API-Key auslagern** in Umgebungsvariablen
2. **Error Handling** verbessern
3. **Unit Tests** hinzufügen
4. **Offline-Modus** mit AsyncStorage
5. **Animationen** mit react-native-reanimated
6. **Dark Mode** Support

## Fehlerbehebung

### Expo Go Verbindung

Wenn die App nicht im Expo Go lädt:
```bash
# Cache löschen
npx expo start -c
```

### TypeScript Fehler

```bash
# Type Check ausführen
npm run type-check
```

### Module nicht gefunden

```bash
# node_modules neu installieren
rm -rf node_modules package-lock.json
npm install
```

## Weitere Ressourcen

- [Expo Dokumentation](https://docs.expo.dev/)
- [React Native Dokumentation](https://reactnative.dev/)
- [Zustand Dokumentation](https://github.com/pmndrs/zustand)
- [OpenWeatherMap API](https://openweathermap.org/api)
