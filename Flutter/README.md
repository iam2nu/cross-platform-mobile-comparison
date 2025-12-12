# Flutter - Cross-Platform Framework

## Übersicht

Flutter ist Google's UI-Framework zur Entwicklung von nativen Apps für Mobile, Web und Desktop aus einer einzigen Codebasis. Es verwendet die Programmiersprache Dart und bietet eine umfangreiche Widget-Bibliothek.

## 🎯 Implementierte Apps

### 1. AutoLogbuch
Fahrzeugverwaltungs-App mit GPS-Tracking und Wartungshistorie.

**Siehe:** [autologbuch/README.md](autologbuch/README.md)

### 2. WetterApp
Wetter-App mit aktuellen Daten und Vorhersagen von OpenWeatherMap API.

**Siehe:** [wetterapp/README.md](wetterapp/README.md)

### 3. PasswortTresor
Sicherer Passwort-Manager mit biometrischer Authentifizierung.

**Siehe:** [passworttresor/README.md](passworttresor/README.md)

## 🚀 Vorteile von Flutter

### Performance
- **Native Performance** durch Kompilierung zu nativem Code
- **60 FPS** konstant bei gut optimiertem Code
- **Keine Bridge** zwischen UI und nativer Schicht

### UI/UX
- **Konsistentes UI** über alle Plattformen
- **Material Design** und Cupertino Widgets integriert
- **Smooth Animations** und Transitions
- **Pixel-perfekte** Kontrolle

### Developer Experience
- **Hot Reload** für schnelle Entwicklung
- **Widget-Inspector** für UI-Debugging
- **Starkes Type-System** mit Dart
- **Umfangreiche DevTools**

### Plattform-Support
- ✅ Android
- ✅ iOS
- ✅ Web
- ✅ Windows
- ✅ macOS
- ✅ Linux

## 🛠️ Technologie-Stack

### Sprache
- **Dart 3.x** - Moderne, objektorientierte Sprache
- **Null Safety** integriert
- **Async/Await** für asynchrone Operationen

### UI Framework
- **Material Design** Widgets
- **Cupertino** (iOS-Style) Widgets
- **Custom Widgets** einfach erstellbar

### State Management
- **StatefulWidget** - Built-in State
- **Provider** - Einfaches State Management
- **Riverpod** - Modernes State Management (Alternative)
- **Bloc** - Business Logic Component (Alternative)

### Wichtige Packages
- **flutter_secure_storage** - Sichere Datenspeicherung
- **local_auth** - Biometrische Authentifizierung
- **geolocator** - GPS-Funktionalität
- **http** / **dio** - HTTP-Requests
- **sqflite** - SQLite Datenbank

## 📦 Installation & Setup

### Voraussetzungen

1. **Flutter SDK** installieren:
   ```bash
   # Download von https://flutter.dev/docs/get-started/install
   ```

2. **Editor** installieren:
   - Android Studio (empfohlen)
   - VS Code mit Flutter Extension

3. **Plattform-spezifische Tools:**
   - **Android:** Android Studio, Android SDK
   - **iOS:** Xcode (nur macOS)

### Flutter-Projekt starten

```bash
# In App-Verzeichnis wechseln
cd Flutter/[app-name]

# Dependencies installieren
flutter pub get

# App starten
flutter run
```

### Verfügbare Befehle

```bash
# Development
flutter run                    # App starten
flutter run -d chrome          # Im Chrome Browser
flutter run -d android         # Auf Android
flutter run -d ios             # Auf iOS

# Build
flutter build apk              # Android APK
flutter build appbundle        # Android App Bundle
flutter build ios              # iOS App
flutter build web              # Web Build

# Analyse
flutter analyze                # Code-Analyse
flutter test                   # Tests ausführen
flutter doctor                 # System prüfen
```

## 📊 Code-Struktur

Typische Flutter-App-Struktur:

```
app/
├── lib/
│   ├── main.dart             # Entry Point
│   ├── models/               # Datenmodelle
│   ├── screens/              # UI-Screens
│   ├── widgets/              # Wiederverwendbare Widgets
│   ├── services/             # Business Logic
│   └── utils/                # Hilfsfunktionen
├── assets/                   # Bilder, Fonts, etc.
├── android/                  # Android-spezifisch
├── ios/                      # iOS-spezifisch
└── pubspec.yaml             # Dependencies
```

## 🎨 UI-Entwicklung

### Widget-Hierarchie
Flutter verwendet eine Widget-basierte Architektur:

```dart
MaterialApp(
  home: Scaffold(
    appBar: AppBar(title: Text('Titel')),
    body: Center(
      child: Column(
        children: [
          Text('Hallo'),
          ElevatedButton(
            onPressed: () {},
            child: Text('Button'),
          ),
        ],
      ),
    ),
  ),
)
```

### State Management Beispiel

```dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Text('Counter: $_counter');
  }
}
```

## 🔧 Best Practices

### Code-Organisation
- Trenne UI von Business Logic
- Verwende `const` Widgets wo möglich
- Erstelle wiederverwendbare Widgets
- Nutze Barrel-Exports (`index.dart`)

### Performance
- Verwende `const` Konstruktoren
- Vermeide unnötige `setState()` Aufrufe
- Nutze `ListView.builder` für lange Listen
- Implementiere `shouldRebuild` wo sinnvoll

### Sicherheit
- Verwende `flutter_secure_storage` für sensible Daten
- Validiere alle Benutzereingaben
- Verwende HTTPS für API-Calls
- Implementiere biometrische Auth wo möglich

## 📱 Plattform-spezifische Anpassungen

### Android
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS
```xml
<!-- ios/Runner/Info.plist -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Beschreibung</string>
```

## 🆚 Vergleich mit anderen Frameworks

| Feature | Flutter | Expo | Capacitor |
|---------|---------|------|-----------|
| Sprache | Dart | JS/TS | JS/TS |
| UI | Widgets | Components | Components |
| Performance | Sehr gut | Gut | Mittel-Gut |
| Lernkurve | Mittel | Flach | Flach |
| Community | Groß | Sehr groß | Mittel |
| App-Größe | ~20MB | ~15MB | ~15MB |

## ✅ Wann Flutter verwenden?

### Ideal für:
- Apps mit konsistentem UI über alle Plattformen
- Performance-kritische Anwendungen
- Teams ohne Web-Entwicklung-Hintergrund
- Projekte mit Desktop-Support-Anforderung
- Apps mit vielen Custom-Animationen

### Weniger ideal für:
- Sehr einfache Apps (Overhead)
- Teams nur mit Web-Erfahrung
- Projekte mit vielen plattform-spezifischen Features
- Wenn App-Größe kritisch ist

## 📚 Ressourcen

### Offizielle Dokumentation
- [Flutter.dev](https://flutter.dev)
- [Dart.dev](https://dart.dev)
- [Flutter Packages](https://pub.dev)

### Community
- [Flutter Community](https://flutter.dev/community)
- [Flutter auf GitHub](https://github.com/flutter/flutter)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)

### Lernen
- [Flutter Codelabs](https://docs.flutter.dev/codelabs)
- [Flutter Samples](https://flutter.github.io/samples/)
- [Flutter Widget Catalog](https://docs.flutter.dev/ui/widgets)

## 🎯 Nächste Schritte

1. **Flutter installieren** - `flutter doctor` ausführen
2. **Beispiel-Apps testen** - Eine der drei Apps starten
3. **Dokumentation lesen** - Offizielle Flutter-Docs
4. **Eigenes Projekt starten** - `flutter create my_app`

## 📄 Weitere Dokumentationen

- [autologbuch/README.md](autologbuch/README.md)
- [wetterapp/README.md](wetterapp/README.md)
- [passworttresor/README.md](passworttresor/README.md)
