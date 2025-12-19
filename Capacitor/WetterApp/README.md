# WetterApp - Capacitor mit Ionic & React

Eine moderne Wetter-App mit OpenWeatherMap API, entwickelt mit Capacitor, Ionic und React.

## 📱 Features

- **Aktuelle Wetterdaten** für ausgewählte Stadt
- **7-Tage Wettervorhersage** mit horizontal scrollbarer Ansicht
- **Stündliche Wettervorhersage** für den ausgewählten Tag
- **Stadt-Suche Funktionalität** mit Echtzeit-Suche
- **Liste beliebter Städte** für schnellen Zugriff
- **Pull-to-Refresh** zum Aktualisieren der Daten
- **State Management** mit Zustand
- **Performance-optimiert** mit effizienten Scroll-Listen
- **Responsive Design** für alle Bildschirmgrössen

## 🛠️ Tech Stack

- **Framework**: React 18.2
- **UI Library**: Ionic React 8.0
- **State Management**: Zustand 4.5
- **Mobile Runtime**: Capacitor 6.0
- **HTTP Client**: Axios 1.6
- **Build Tool**: Vite 7.3
- **Language**: TypeScript 5.3
- **API**: OpenWeatherMap API

## 🚀 Quick Start

### 1. Environment Variables einrichten

Kopiere `.env.example` zu `.env` und trage deinen API-Key ein:

```powershell
cd Capacitor/WetterApp
copy .env.example .env
```

Bearbeite `.env` und trage deinen OpenWeatherMap API-Key ein:
```
VITE_OPENWEATHER_API_KEY=dein_api_key_hier
```

API-Key kostenlos erhalten: https://openweathermap.org/api

### 2. Dependencies installieren

```powershell
npm install
```

### 3. App starten

#### Im Browser (Empfohlen für Entwicklung)

```powershell
npm run dev
```

Öffne: **http://localhost:3000**

#### Auf Android

**Erste Schritte:**
```powershell
# Android-Plattform hinzufügen (einmalig)
npx cap add android

# Build erstellen
npm run build

# Zu Android syncen
npx cap sync
```

**Option 1: Android Studio öffnen**
```powershell
npm run open:android
```

Dann in Android Studio:
1. Warte bis Gradle-Build fertig ist
2. Wähle Emulator oder verbundenes Gerät
3. Klicke auf grünen Play-Button

**Option 2: Direkt auf Gerät**
```powershell
npm run android
```

#### Auf iOS (nur macOS)

```powershell
# iOS-Plattform hinzufügen (einmalig)
npx cap add ios

# Build erstellen
npm run build

# Zu iOS syncen
npx cap sync

# Xcode öffnen
npm run open:ios
```

## 📝 Verwendung

### Erste Schritte

1. **Stadt auswählen** - Aus der Liste beliebter Städte
2. **Stadt suchen** - Suche nach beliebiger Stadt weltweit
3. **Aktuelles Wetter** - Temperatur, Beschreibung, Luftfeuchtigkeit, Wind
4. **7-Tage Vorhersage** - Scrolle horizontal durch die Woche
5. **Stündliche Vorhersage** - Tippe auf einen Tag für Details
6. **Aktualisieren** - Ziehe von oben nach unten (Pull-to-Refresh)

## 📁 Projektstruktur

```
src/
├── components/           # React Components
│   ├── CurrentWeather.tsx
│   ├── WeatherForecastComponent.tsx
│   ├── HourlyWeatherComponent.tsx
│   ├── SearchBar.tsx
│   └── PopularCities.tsx
├── models/              # TypeScript Models
│   ├── Weather.ts
│   ├── WeatherForecast.ts
│   └── HourlyWeather.ts
├── screens/             # Screen Components
│   └── WeatherScreen.tsx
├── services/            # API Services
│   └── weatherService.ts
├── store/               # State Management
│   └── weatherStore.ts
├── theme/               # Theme & Styling
│   └── variables.css
├── App.tsx              # Main App Component
├── main.tsx             # Entry Point
└── vite-env.d.ts        # Vite Types
```

## 🔧 Wichtige Befehle

```bash
# Development Server (Browser)
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview

# Capacitor Sync
npm run sync

# Android Studio öffnen
npm run open:android

# iOS Xcode öffnen
npm run open:ios

# Android App direkt starten
npm run android

# iOS App direkt starten
npm run ios
```

## 🌐 API Integration

### OpenWeatherMap API

Die App verwendet folgende Endpoints:
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`

Konfiguriert in `src/services/weatherService.ts`

## 🐛 Troubleshooting

### "Port 3000 belegt"
Ändere Port in `vite.config.ts`

### "API Key fehlt"
Stelle sicher, dass `.env` existiert und `VITE_OPENWEATHER_API_KEY` gesetzt ist

### "Build-Fehler"
```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Capacitor Sync-Fehler"
```bash
npx cap sync
```

## 💡 Tipps

- **Hot Reload**: Änderungen werden automatisch im Browser aktualisiert
- **Capacitor Sync**: Nach grösseren Änderungen `npm run sync` ausführen
- **API-Limit**: Kostenloser Plan hat 60 Calls/Minute Limit
- **Offline-Modus**: App speichert letzte Daten im Cache

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
