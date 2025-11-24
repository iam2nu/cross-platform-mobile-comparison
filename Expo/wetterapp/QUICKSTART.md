# ⚡ Quick Start Guide - WetterApp Expo

## 🚀 In 3 Minuten starten!

### Schritt 1: Dependencies installieren
```bash
cd Expo/wetterapp
npm install
```

### Schritt 2: App starten
```bash
npm start
```

### Schritt 3: Auf Gerät öffnen
- **Android:** Drücke `a` im Terminal
- **iOS:** Drücke `i` im Terminal (nur macOS)
- **Web:** Drücke `w` im Terminal
- **Smartphone:** Scanne QR-Code mit Expo Go App

## 📱 Expo Go App installieren

### Android
[Expo Go auf Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### iOS
[Expo Go im App Store](https://apps.apple.com/app/expo-go/id982107779)

## 🎯 Features der App

✅ **Aktuelle Wetterdaten** - Zeigt Temperatur, Luftfeuchtigkeit, Wind  
✅ **7-Tage Vorhersage** - Horizontal scrollbare Vorhersage  
✅ **Stündliche Vorhersage** - Tippe auf Tag für Details  
✅ **Stadt-Suche** - Suche beliebige Städte  
✅ **Beliebte Städte** - Quick Access zu Schweizer Städten  
✅ **Pull-to-Refresh** - Ziehe nach unten zum Aktualisieren  

## 🔧 Befehle

```bash
# Development Server starten
npm start

# Cache löschen und neu starten
npx expo start -c

# Android Build
npm run android

# iOS Build (nur macOS)
npm run ios

# Web Version
npm run web

# Type Check
npm run type-check

# Linting
npm run lint
```

## 📂 Projekt-Struktur (Vereinfacht)

```
src/
├── components/      # UI-Komponenten
├── models/         # TypeScript Interfaces
├── screens/        # App-Screens
├── services/       # API-Calls
├── store/          # State Management (Zustand)
└── theme/          # Design Tokens
```

## 🎨 Design

- **Primary Color:** Blue (#1976D2)
- **Secondary Color:** Orange (#FF9800)
- **Background:** Light Grey (#F5F5F5)
- **UI-Stil:** Material Design inspiriert

## 🌐 API

Die App verwendet **OpenWeatherMap API**:
- API-Key ist bereits konfiguriert
- Keine zusätzliche Einrichtung nötig
- Deutsche Sprache aktiviert

## 💡 Tipps

### Problem: App lädt nicht
```bash
# Cache löschen
npx expo start -c
```

### Problem: Module nicht gefunden
```bash
# Dependencies neu installieren
rm -rf node_modules
npm install
```

### Problem: TypeScript Fehler
```bash
# Type Check ausführen
npm run type-check
```

## 📚 Weitere Dokumentation

- **README_WETTERAPP.md** - Vollständige Dokumentation
- **SETUP.md** - Detaillierte Setup-Anleitung
- **FLUTTER_VS_EXPO_VERGLEICH.md** - Framework Vergleich
- **DATEIEN_UEBERSICHT.md** - Alle Dateien erklärt

## 🎓 Code-Beispiele

### Weather Service verwenden
```typescript
import { WeatherService } from './src/services';

const weather = await WeatherService.getCurrentWeather('Zürich');
```

### Store verwenden
```typescript
import { useWeatherStore } from './src/store';

const { currentWeather, fetchWeatherData } = useWeatherStore();
await fetchWeatherData('Zürich');
```

### Komponente verwenden
```typescript
import { CurrentWeatherWidget } from './src/components';

<CurrentWeatherWidget weather={currentWeather} />
```

## 🐛 Bekannte Issues

### Expo Go Verbindung
- Stelle sicher, dass Smartphone und PC im selben WLAN sind
- Firewall kann Verbindung blockieren

### iOS Simulator
- Nur auf macOS verfügbar
- Xcode muss installiert sein

### Android Emulator
- Android Studio benötigt
- Emulator muss gestartet sein

## ✅ Checkliste

- [ ] Node.js installiert (v18+)
- [ ] npm install ausgeführt
- [ ] Expo Go App auf Smartphone installiert
- [ ] npm start ausgeführt
- [ ] QR-Code gescannt oder Emulator gestartet
- [ ] App läuft erfolgreich!

## 🎉 Fertig!

Die App sollte jetzt laufen. Viel Spaß beim Testen! 🌤️

---

**Bei Problemen:** Siehe vollständige Dokumentation in `README_WETTERAPP.md`
