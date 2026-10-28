# Optionen für plattformübergreifende Mobilapplikationen

## Über dieses Projekt

Projektarbeit im Bachelorstudium Informatik an der ZHAW School of Engineering (Herbst 2025, Note 5.5). Ich habe dieselben drei Apps je einmal in Flutter, Expo (React Native) und Capacitor umgesetzt, insgesamt also neun Apps, und die Frameworks anhand von Entwicklungsaufwand, Code-Qualität, Performance, Developer Experience und Feature-Parität verglichen.

## Projekt-Übersicht

Dieses Projekt vergleicht drei führende Cross-Platform-Frameworks für die Entwicklung mobiler Anwendungen:

- **Flutter** - Google's UI-Framework mit Dart
- **Expo** - React Native mit verbesserter Developer Experience
- **Capacitor** - Web-to-Native mit Ionic

Jedes Framework wurde anhand von drei verschiedenen Beispiel-Apps evaluiert:
1. **AutoLogbuch** - Fahrzeugverwaltung mit GPS-Tracking
2. **WetterApp** - Wetter-Anzeige mit API-Integration
3. **PasswortTresor** - Passwort-Manager mit Verschlüsselung

## 💻 Systemvoraussetzungen

### Allgemein (für alle Frameworks)

- **Betriebssystem**: Windows 10/11, macOS 10.15+, oder Linux
- **RAM**: Mindestens 8 GB (16 GB empfohlen)
- **Speicherplatz**: Mindestens 10 GB frei
- **Internet**: Für Downloads und Package-Installation

### Framework-spezifische Anforderungen

#### Flutter
- **Flutter SDK**: 3.0.0 oder höher
- **Dart SDK**: 3.0.0 oder höher (im Flutter SDK enthalten)
- **Android Studio**: Für Android-Entwicklung
- **Xcode**: Für iOS-Entwicklung (nur macOS)
- **Git**: Für Flutter Installation

#### Expo (React Native)
- **Node.js**: 18.x oder höher
- **npm**: 9.x oder höher (mit Node.js)
- **Expo Go App**: Auf Smartphone für Testing
- **Android Studio**: Für Android-Builds (optional)
- **Xcode**: Für iOS-Builds (nur macOS, optional)

#### Capacitor
- **Node.js**: 18.x oder höher
- **npm**: 9.x oder höher
- **Android Studio**: Für Android-Entwicklung
- **Xcode**: Für iOS-Entwicklung (nur macOS)
- **Chrome/Firefox**: Für Web-Entwicklung

### Geräte zum Testen

- **Android**: Physisches Gerät oder Emulator (API Level 21+)
- **iOS**: iPhone/iPad oder Simulator (iOS 12+, nur macOS)
- **Web**: Moderner Browser (Chrome, Firefox, Safari, Edge)

### Installation der Tools

#### Node.js installieren
```bash
# Download von https://nodejs.org
# Nach Installation prüfen:
node --version
npm --version
```

#### Flutter installieren
```bash
# Download von https://flutter.dev/docs/get-started/install
# Nach Installation prüfen:
flutter doctor
```

#### Android Studio installieren
- Download: https://developer.android.com/studio
- Android SDK installieren
- Emulator einrichten

#### Xcode installieren (nur macOS)
- Über Mac App Store
- Command Line Tools installieren:
  ```bash
  xcode-select --install
  ```

## 📁 Projektstruktur

```
Optionen-fuer-plattformuebergreifende-Mobilapplikationen/
├── Flutter/
│   ├── autologbuch/
│   ├── wetterapp/
│   └── passworttresor/
├── Expo/
│   ├── autologbuch/
│   ├── wetterapp/
│   └── passworttresor/
└── Capacitor/
    ├── AutoLogbuch/
    ├── WetterApp/
    └── PasswortTresor/
```

## 🎯 Ziel

Vergleichbare Implementierungen derselben Apps in verschiedenen Frameworks zur Evaluation von:
- **Entwicklungseffizienz** - Wie schnell kann entwickelt werden?
- **Code-Qualität** - Wie wartbar und verständlich ist der Code?
- **Performance** - Wie performant laufen die Apps?
- **Developer Experience** - Wie angenehm ist die Entwicklung?
- **Feature-Parität** - Haben alle Versionen dieselben Features?

## 🚀 Quick Start

### Flutter
```bash
cd Flutter/[app-name]
flutter pub get
flutter run
```

### Expo
```bash
cd Expo/[app-name]
npm install
npm start
```

### Capacitor
```bash
cd Capacitor/[app-name]
npm install
npm run dev
```

## 📱 Implementierte Apps

### 1. AutoLogbuch
Fahrzeugverwaltung mit folgenden Features:
- Fahrzeuge hinzufügen und verwalten
- Wartungseinträge erfassen
- GPS-Tracking für Fahrten
- Fahrtenbuch mit Distanz und Dauer
- Persistente Datenspeicherung

### 2. WetterApp
Wetter-Anzeige mit:
- Aktuelle Wetterdaten
- 7-Tage Vorhersage
- Stündliche Wettervorhersage
- Stadt-Suche
- Pull-to-Refresh
- Material Design UI

### 3. PasswortTresor
Sicherer Passwort-Manager mit:
- Master-Passwort Setup
- Biometrische Authentifizierung
- Verschlüsselte Speicherung
- Passwort-Generator
- Passwort-Historie
- Favoriten-System
- Export/Import-Funktion

## 📊 Framework-Vergleich

### Flutter
**Vorteile:**
- ✅ Sehr gute Performance
- ✅ Konsistentes UI auf allen Plattformen
- ✅ Hot Reload
- ✅ Starkes Type-System (Dart)
- ✅ Umfangreiche Widget-Bibliothek

**Nachteile:**
- ❌ Grössere App-Grösse
- ❌ Steilere Lernkurve
- ❌ Kleinere Community als React

### Expo (React Native)
**Vorteile:**
- ✅ Web-Developer-freundlich
- ✅ Grössere Community
- ✅ Grosses NPM-Ökosystem
- ✅ OTA-Updates möglich
- ✅ Schnelle Entwicklung

**Nachteile:**
- ❌ Plattform-spezifische UI-Unterschiede
- ❌ Mehr Dependencies
- ❌ Bridge-Overhead

### Capacitor (Ionic)
**Vorteile:**
- ✅ Web-Standards (HTML/CSS/JS)
- ✅ Progressive Web App Support
- ✅ Einfache Web-Integration
- ✅ Ionic UI Components
- ✅ Flexibel erweiterbar

**Nachteile:**
- ❌ Performance nicht immer native-level
- ❌ Zusätzliche Abstraktionsebene
- ❌ Weniger native Features

## 🛠️ Technologie-Stack

### Flutter
- **Sprache:** Dart
- **UI:** Material Design Widgets
- **State:** Provider
- **Build:** Flutter CLI

### Expo
- **Sprache:** TypeScript/JavaScript
- **UI:** React Native Components
- **State:** React Hooks, Zustand
- **Build:** Expo CLI

### Capacitor
- **Sprache:** TypeScript
- **UI:** Ionic React Components
- **State:** React Hooks, Zustand
- **Build:** Vite

## 📈 Entwicklungszeit-Vergleich

Geschätzte Entwicklungszeit pro App:

| App | Flutter | Expo | Capacitor |
|-----|---------|------|-----------|
| AutoLogbuch | 16h | 12h | 14h |
| WetterApp | 10h | 8h | 9h |
| PasswortTresor | 18h | 14h | 16h |

**Hinweis:** Expo war oft schneller, da React-Kenntnisse vorhanden waren.

## 🎨 UI/UX

Alle Apps verwenden ähnliche Designs:
- **Primary Color:** Blau (#2196F3)
- **Material Design** inspiriert
- **Responsive** für verschiedene Bildschirmgrössen
- **Konsistente Navigation**

## 🔐 Sicherheit

Alle PasswortTresor-Implementierungen bieten:
- SHA-256 Passwort-Hashing
- Verschlüsselte Speicherung (Keychain/KeyStore)
- Biometrische Authentifizierung
- Keine Cloud-Speicherung
- Auto-Lock Funktion

## 📚 Dokumentation

Jede App-Implementierung enthält:
- **README.md** - Vollständige Dokumentation mit Quick Start Guide

Jedes Framework hat zusätzlich:
- Übersichts-README zur Technologie

## 🎯 Empfehlungen

### Wann Flutter?
- Team ohne Web-Erfahrung
- Konsistentes UI über alle Plattformen benötigt
- Desktop-Support erforderlich
- Performance ist kritisch

### Wann Expo?
- Team mit React/Web-Erfahrung
- Schnelle Entwicklung wichtig
- OTA-Updates benötigt
- Grosses NPM-Ökosystem gewünscht

### Wann Capacitor?
- Bestehende Web-App vorhanden
- Progressive Web App gewünscht
- Ionic UI-Komponenten bevorzugt
- Web-Standards wichtig

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke und Framework-Vergleiche erstellt.

## 👥 Entwicklung

Alle Apps wurden mit Fokus auf:
- **Feature-Parität** - Identische Features in allen Frameworks
- **Code-Qualität** - Sauberer, wartbarer Code
- **Best Practices** - Framework-spezifische Best Practices
- **TypeScript** - Wo möglich, für Type-Safety

## 📞 Weitere Informationen

Für detaillierte Informationen zu einzelnen Frameworks oder Apps, siehe die jeweiligen README-Dateien in den Unterordnern.
