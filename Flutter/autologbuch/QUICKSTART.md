# AutoLogbuch - Flutter - Quick Start

## 🚀 In 3 Schritten starten

### 1. Dependencies installieren
```bash
cd Flutter/autologbuch
flutter pub get
```

### 2. Code generieren (Drift Datenbank)
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 3. App starten
```bash
flutter run
```

Wähle dann:
- **Android Emulator**: Drücke `a`
- **iOS Simulator**: Drücke `i` (nur macOS)
- **Chrome Browser**: Drücke `c`

## 📱 Features testen

1. **Fahrzeug hinzufügen** - Klicke auf `+` Button
2. **Wartung erfassen** - Fahrzeug auswählen → Wartung hinzufügen
3. **Fahrt starten** - GPS-Berechtigung erlauben → Fahrt starten
4. **Fahrt aufzeichnen** - Bewege dich oder simuliere GPS
5. **Fahrt beenden** - Fahrt beenden → Details ansehen

## 🔧 Wichtige Befehle

```bash
# Hot Reload (in laufender App)
r

# Hot Restart
R

# Build für Android
flutter build apk

# Build für iOS
flutter build ios

# Tests
flutter test
```

## 🐛 Häufige Probleme

### "Code nicht generiert"
```bash
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs
```

### "GPS funktioniert nicht"
- Prüfe Berechtigungen in AndroidManifest.xml
- Aktiviere Location Services auf Gerät
- Im Simulator: Fake Location setzen

### "Dependencies fehlen"
```bash
flutter clean
flutter pub get
```

## ✅ Fertig!

Die App sollte nun laufen. Viel Spaß beim Testen! 🚗
