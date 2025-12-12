# 🚀 WetterApp - Quick Start Guide

## ✅ Projekt ist bereit!

Alle Fehler wurden behoben und die App ist einsatzbereit.

## 📱 App starten

### Im Browser (Empfohlen für Entwicklung)

```powershell
cd C:\Users\thunu\source\repos\Optionen-fuer-plattformuebergreifende-Mobilapplikationen\Capacitor\WetterApp
npm run dev
```

Öffne: **http://localhost:3000**

### Auf Android

#### Option 1: Android Studio öffnen
```powershell
cd C:\Users\thunu\source\repos\Optionen-fuer-plattformuebergreifende-Mobilapplikationen\Capacitor\WetterApp
npm run open:android
```

Dann in Android Studio:
1. Warte bis Gradle-Build fertig ist (erstes Mal: 5-10 Minuten)
2. Wähle Emulator oder verbundenes Gerät
3. Klicke auf grünen Play-Button

#### Option 2: Direkt auf Gerät
```powershell
npm run android
```

### Auf iOS (nur macOS)

```powershell
npm run open:ios
```

## 🔧 Verfügbare Commands

| Command | Beschreibung |
|---------|--------------|
| `npm run dev` | Development Server (http://localhost:3000) |
| `npm run build` | Production Build erstellen |
| `npm run preview` | Production Build testen |
| `npm run sync` | Web-Assets zu Native syncen |
| `npm run open:android` | Android Studio öffnen |
| `npm run open:ios` | Xcode öffnen |
| `npm run android` | Direkt auf Android starten |
| `npm run ios` | Direkt auf iOS starten |

## 📝 Nach Code-Änderungen

```powershell
# 1. Build erstellen
npm run build

# 2. Zu Native syncen
npm run sync

# 3. In Android Studio neu starten
npm run open:android
```

## 🎯 Features

✅ **Aktuelles Wetter** - Temperatur, Beschreibung, Details
✅ **7-Tage Vorhersage** - Horizontal scrollbar, klickbar
✅ **Stündliche Vorhersage** - Für ausgewählten Tag
✅ **Stadt-Suche** - Mit Echtzeit-Suche
✅ **Beliebte Städte** - 8 Schweizer Städte als Quick-Access
✅ **Pull-to-Refresh** - Daten aktualisieren
✅ **Material Design** - Blaue Farbpalette
✅ **TypeScript** - Vollständig typisiert
✅ **Responsive** - Mobile, Tablet, Desktop

## 📁 Projekt-Struktur

```
Capacitor/WetterApp/
├── src/
│   ├── components/     # React Components
│   ├── models/        # TypeScript Interfaces
│   ├── services/      # API Service
│   ├── store/         # Zustand State Management
│   ├── screens/       # Main Screen
│   ├── theme/         # CSS & Styling
│   ├── App.tsx        # App Component
│   └── main.tsx       # Entry Point
├── android/           # Android Native
├── ios/              # iOS Native
├── dist/             # Build Output
└── package.json      # Dependencies
```

## 🔌 API

- **Provider**: OpenWeatherMap
- **Endpoints**: Current Weather, 5-Day Forecast

## 🐛 Troubleshooting

### Problem: Port 3000 belegt
```powershell
# In vite.config.ts den Port ändern
server: { port: 3001 }
```

### Problem: Android Build Error
```powershell
cd android
./gradlew clean
cd ..
npm run sync
```

### Problem: Dependencies fehlen
```powershell
rm -rf node_modules
npm install
```

## 📚 Dokumentation

- **README.md** - Vollständige Dokumentation
- **SETUP.md** - Detaillierte Setup-Anleitung
- **VERGLEICH.md** - Flutter vs Capacitor
- **DATEIEN.md** - Datei-Übersicht

## ✨ Nächste Schritte

1. ✅ Teste im Browser: `npm run dev`
2. ✅ Prüfe Features:
   - Stadt-Suche (z.B. "Zürich")
   - 7-Tage Vorhersage klicken
   - Pull-to-Refresh testen
3. ✅ Build für Android: `npm run build && npm run sync`
4. ✅ In Android Studio testen

## 🎉 Fertig!

Die App ist **production-ready** und repliziert alle Features der Flutter WetterApp!

**Viel Erfolg! ☀️🌧️⛈️**
