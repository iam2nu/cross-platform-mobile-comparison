# PasswortTresor - Flutter - Quick Start

## 🚀 In 2 Schritten starten

### 1. Dependencies installieren
```bash
cd Flutter/passworttresor
flutter pub get
```

### 2. App starten
```bash
flutter run
```

Wähle dann:
- **Android Emulator**: Drücke `a`
- **iOS Simulator**: Drücke `i` (nur macOS)
- **Chrome Browser**: Drücke `c` (biometrische Auth funktioniert nur auf echten Geräten)

## 📱 Erste Schritte

1. **Master-Passwort erstellen** - Mindestens 6 Zeichen beim ersten Start
2. **Ersten Eintrag hinzufügen** - Klicke auf `+` Button
3. **Passwort-Generator** - Klicke auf ✨ Icon im Passwort-Feld
4. **Passwort kopieren** - Tippe auf Eintrag → Kopieren-Icon
5. **Favorit markieren** - Stern-Icon in der Detail-Ansicht

## 🔐 Features testen

### Biometrische Authentifizierung
- Nur auf echten Geräten verfügbar
- App sperren → Neu öffnen → Mit Fingerabdruck/Face ID entsperren

### Passwort-Generator
- Länge: 4-64 Zeichen
- Optionen: Groß-/Kleinbuchstaben, Zahlen, Symbole
- Live Passwort-Stärke-Anzeige

### Favoriten
- Stern-Icon klicken
- Favoriten erscheinen oben in der Liste

### Passwort-Historie
- Beim Bearbeiten: "Passwort-Historie anzeigen"
- Letzte 5 Passwörter werden gespeichert
- Wiederherstellung möglich

### Export/Import
- Menü → Exportieren → JSON kopieren
- Menü → Importieren → JSON einfügen

## 🔧 Wichtige Befehle

```bash
# Hot Reload
r

# Hot Restart
R

# Build für Android
flutter build apk

# Build für iOS
flutter build ios
```

## 🔐 Sicherheitshinweise

⚠️ **Wichtig:**
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- Biometrische Auth als Backup zu Master-Passwort

## 🐛 Häufige Probleme

### "Biometrie funktioniert nicht"
- Nur auf echten Geräten verfügbar
- Biometrie auf Gerät aktiviert?
- Berechtigungen in AndroidManifest.xml/Info.plist

### "Daten weg nach Neuinstallation"
- Daten sind gerätespezifisch
- Vorher exportieren!

### Dependencies fehlen
```bash
flutter clean
flutter pub get
flutter run
```

## ✅ Fertig!

Die App ist nun einsatzbereit. Sichere Passwort-Verwaltung! 🔐
