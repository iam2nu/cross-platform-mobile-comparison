# WetterApp - Capacitor mit Ionic & React

Eine moderne Wetter-App, die mit Capacitor, Ionic und React entwickelt wurde. Die App zeigt aktuelle Wetterdaten, 7-Tage-Vorhersagen und stündliche Wettervorhersagen für verschiedene Städte an.

## 📱 Features

- ✅ **Aktuelle Wetterdaten** für ausgewählte Stadt
- ✅ **7-Tage Wettervorhersage** mit horizontal scrollbarer Ansicht
- ✅ **Stündliche Wettervorhersage** für den ausgewählten Tag
- ✅ **Stadt-Suche Funktionalität** mit Echtzeit-Suche
- ✅ **Liste beliebter Städte** für schnellen Zugriff
- ✅ **Pull-to-Refresh** zum Aktualisieren der Daten
- ✅ **State Management** mit Zustand
- ✅ **Performance-optimiert** mit effizienten Scroll-Listen
- ✅ **Capacitor Network Plugin** für Netzwerk-Status
- ✅ **Material Design** mit blauer Farbpalette
- ✅ **Responsive Design** für alle Bildschirmgrößen
- ✅ **TypeScript** für Type-Safety

## 🏗️ Technologie-Stack

- **Framework**: React 18.2
- **UI Library**: Ionic React 8.0
- **State Management**: Zustand 4.5
- **Mobile Runtime**: Capacitor 6.0
- **HTTP Client**: Axios 1.6
- **Build Tool**: Vite 5.0
- **Language**: TypeScript 5.3
- **API**: OpenWeatherMap API

## 📁 Projektstruktur

```
Capacitor/WetterApp/
├── src/
│   ├── components/           # React Components
│   │   ├── CurrentWeather.tsx
│   │   ├── CurrentWeather.css
│   │   ├── WeatherForecastComponent.tsx
│   │   ├── WeatherForecastComponent.css
│   │   ├── HourlyWeatherComponent.tsx
│   │   ├── HourlyWeatherComponent.css
│   │   ├── SearchBar.tsx
│   │   └── SearchBar.css
│   ├── models/              # TypeScript Models
│   │   ├── Weather.ts
│   │   ├── WeatherForecast.ts
│   │   └── HourlyWeather.ts
│   ├── services/            # API Services
│   │   └── weatherService.ts
│   ├── store/               # State Management
│   │   └── weatherStore.ts
│   ├── screens/             # Screen Components
│   │   ├── WeatherScreen.tsx
│   │   └── WeatherScreen.css
│   ├── theme/               # Theme & Styling
│   │   └── variables.css
│   ├── App.tsx              # Main App Component
│   └── main.tsx             # Entry Point
├── index.html               # HTML Entry
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript Config
├── vite.config.ts           # Vite Config
└── capacitor.config.ts      # Capacitor Config
```

## 🚀 Installation & Setup

### Voraussetzungen

- Node.js (v18 oder höher)
- npm oder yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Für Android: Android Studio & JDK 17
- Für iOS: Xcode (nur auf macOS)

### Schritt 1: Environment Variables einrichten

Kopiere `.env.example` zu `.env` und trage deinen API-Key ein:

```powershell
cd Capacitor/WetterApp
copy .env.example .env
```

Bearbeite `.env` und trage deinen OpenWeatherMap API-Key ein:
```
VITE_OPENWEATHER_API_KEY=dein_api_key_hier
```

### Schritt 2: Dependencies installieren

```powershell
npm install
```

### Schritt 3: Development Server starten

```powershell
npm run dev
```

Die App ist nun unter `http://localhost:3000` erreichbar.

### Schritt 4: Build für Produktion

```powershell
npm run build
```

## 📱 Mobile Deployment

### Android Setup

1. **Android Platform hinzufügen:**
```powershell
ionic capacitor add android
```

2. **Projekt synchronisieren:**
```powershell
npm run sync
```

3. **In Android Studio öffnen und starten:**
```powershell
npm run android
```

Oder manuell:
```powershell
npx cap open android
```

### iOS Setup (nur auf macOS)

1. **iOS Platform hinzufügen:**
```powershell
ionic capacitor add ios
```

2. **Projekt synchronisieren:**
```powershell
npm run sync
```

3. **In Xcode öffnen und starten:**
```powershell
npm run ios
```

Oder manuell:
```powershell
npx cap open ios
```

## 🔧 Verfügbare Scripts

| Script | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet den Development Server |
| `npm run build` | Erstellt Production Build |
| `npm run preview` | Preview des Production Builds |
| `npm run android` | Startet die App auf Android |
| `npm run ios` | Startet die App auf iOS |
| `npm run sync` | Synchronisiert Web-Assets mit nativen Projekten |

## 🌐 API Integration

Die App verwendet die **OpenWeatherMap API** für Wetterdaten.

### API-Key
Der API-Key wird sicher über Environment Variables geladen:
1. Registriere dich bei [OpenWeatherMap](https://openweathermap.org/api)
2. Kopiere `.env.example` zu `.env`
3. Trage deinen API-Key in die `.env` Datei ein
```env
VITE_OPENWEATHER_API_KEY=dein_api_key_hier
```

**Wichtig**: Die `.env` Datei ist in `.gitignore` und wird nicht ins Repository committed!

### API Endpoints

1. **Current Weather**
   - Endpoint: `/weather`
   - Funktion: `getCurrentWeather(cityName)`

2. **7-Day Forecast**
   - Endpoint: `/forecast`
   - Funktion: `getWeatherForecast(cityName)`

3. **Hourly Weather**
   - Endpoint: `/forecast`
   - Funktion: `getHourlyWeather(cityName, date)`

## 🎨 Design & Styling

### Farbpalette

Die App verwendet eine blaue Farbpalette basierend auf Material Design:

- **Primary**: `#2563eb` (Blue 600)
- **Secondary**: `#4a90e2` (Sky Blue)
- **Tertiary**: `#1e40af` (Blue 800)
- **Background**: `#f5f5f5` (Light Gray)

### Components Styling

- **Cards**: Abgerundete Ecken (12px), Schatten
- **Buttons**: Material Design, Blauer Akzent
- **Icons**: Ionicons Library
- **Scrolling**: Smooth Scrolling mit Bounce-Effekt

## 🔄 State Management

Die App verwendet **Zustand** für globales State Management:

```typescript
// Store Hook verwenden
const {
  currentWeather,
  forecast,
  hourlyWeather,
  isLoading,
  error,
  fetchWeatherData,
  refreshWeatherData,
  selectDate,
} = useWeatherStore();
```

### Store Actions

- `fetchWeatherData(cityName)`: Lädt Wetterdaten für eine Stadt
- `refreshWeatherData()`: Aktualisiert die aktuellen Daten
- `fetchHourlyWeather(date)`: Lädt stündliche Vorhersage
- `selectDate(date)`: Wählt einen Tag aus
- `clearError()`: Löscht Fehlermeldungen

## 📊 Performance Optimierungen

1. **Parallele API-Calls**: Current Weather & Forecast werden gleichzeitig geladen
2. **Optimiertes Scrolling**: Virtualisierung bei langen Listen
3. **Lazy Loading**: Components werden bei Bedarf geladen
4. **Memoization**: React.memo für Component-Optimierung
5. **Bundle-Splitting**: Vite optimiert automatisch die Bundles

## 🔌 Capacitor Plugins

### Network Plugin
Überwacht den Netzwerk-Status der App:

```typescript
import { Network } from '@capacitor/network';

// Netzwerk-Status prüfen
const status = await Network.getStatus();
```

## 🐛 Debugging

### Browser DevTools
```powershell
npm run dev
# Öffne http://localhost:3000
# Nutze Chrome DevTools (F12)
```

### Android Debugging
```powershell
# Logcat öffnen
adb logcat | grep "Capacitor"
```

### iOS Debugging
```powershell
# Safari Web Inspector verwenden
# Safari > Develop > Simulator
```

## 📝 Code-Struktur

### Models
TypeScript Interfaces für Type-Safety:
- `Weather`: Aktuelles Wetter
- `WeatherForecast`: 7-Tage Vorhersage
- `HourlyWeather`: Stündliche Vorhersage

### Services
- `weatherService.ts`: API-Kommunikation mit Axios

### Components
- `CurrentWeather`: Zeigt aktuelles Wetter
- `WeatherForecastComponent`: 7-Tage horizontal scrollbar
- `HourlyWeatherComponent`: Stündliche Vorhersage
- `SearchBar`: Stadt-Suche mit beliebten Städten

### Screens
- `WeatherScreen`: Hauptbildschirm mit allen Features

## 🔐 Sicherheit

- ✅ API-Key wird über Environment Variables verwaltet (`.env` Datei)
- ✅ `.env` ist in `.gitignore` und wird nicht committed
- ✅ HTTPS für alle API-Calls
- ✅ Input-Validierung bei Stadt-Suche
- ⚠️ Für Production Builds: API-Key über CI/CD Pipeline setzen

## 🌍 Internationalisierung

Aktuell: Deutsch (`lang=de` in API-Calls)

Erweiterbar auf mehrere Sprachen:
- Anpassen in `weatherService.ts`: `lang` Parameter
- UI-Texte in separate Language-Files auslagern

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.

## 👥 Entwickler-Hinweise

### Hot Reload
Der Development Server unterstützt Hot Module Replacement (HMR) für schnelles Entwickeln.

### TypeScript
Strenge Type-Checking ist aktiviert. Alle Components und Functions sind typisiert.

### Code Style
- 2 Spaces Indentation
- Single Quotes
- Trailing Commas
- Semicolons

## 📞 Support & Kontakt

Bei Fragen oder Problemen:
1. Überprüfen Sie die Console-Logs
2. Prüfen Sie die Netzwerk-Verbindung
3. Validieren Sie den API-Key

## 🎯 Nächste Schritte

Mögliche Erweiterungen:
- [ ] Geolocation für automatische Standort-Erkennung
- [ ] Favoriten-Städte speichern (Local Storage)
- [ ] Wetter-Benachrichtigungen
- [ ] Dark Mode Toggle
- [ ] Mehrsprachigkeit
- [ ] Offline-Modus mit Caching
- [ ] Wetter-Charts mit Chart.js
- [ ] Animation bei Wetter-Übergängen

## 🚀 Quick Start Zusammenfassung

```powershell
# 1. Environment Setup
cd Capacitor/WetterApp
copy .env.example .env
# Bearbeite .env und trage deinen API-Key ein

# 2. Installation
npm install

# 3. Development starten
npm run dev

# 3. Für Android bauen
ionic capacitor add android
npm run sync
npm run android

# 4. Für iOS bauen (nur macOS)
ionic capacitor add ios
npm run sync
npm run ios
```

---

**Viel Erfolg mit der WetterApp! ☀️🌧️⛈️**
