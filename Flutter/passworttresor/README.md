# PasswortTresor - Flutter

Eine sichere Flutter-Applikation zur Verwaltung von Passwörtern mit biometrischer Authentifizierung.

## 📱 Features

- **Biometrische Authentifizierung**: Entsperren mit Fingerabdruck oder Gesichtserkennung
- **Master-Passwort als Fallback**: Zugriff auch ohne Biometrie möglich
- **Sichere Speicherung**: Verschlüsselte Daten (iOS: Keychain, Android: Keystore)
- **Passwort-Verwaltung**: Speichern, bearbeiten und löschen von Anmeldeinformationen
- **Passwort-Generator**: Generieren sicherer, zufälliger Passwörter (4-64 Zeichen)
- **Passwort-Stärke-Anzeige**: Visuelle Bewertung der Passwortstärke
- **Favoriten**: Markieren häufig verwendeter Einträge
- **Passwort-Historie**: Speichert die letzten 5 Passwörter pro Eintrag
- **Notizen-Feld**: Zusätzliche Informationen zu jedem Eintrag
- **Auto-Lock**: Automatisches Sperren nach Inaktivität (konfigurierbar)
- **Export/Import**: Sichern und Wiederherstellen der Daten
- **Kopieren-Funktion**: Schnelles Kopieren von Benutzername und Passwort
- **Suchfunktion**: Einträge schnell finden

## 🛠️ Tech Stack

- **Framework**: Flutter 3.x
- **Sprache**: Dart 3.x
- **Auth**: local_auth (Biometrie)
- **Storage**: flutter_secure_storage
- **Crypto**: crypto (SHA-256 Hashing)
- **UI**: Material Design

## 🚀 Quick Start

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

## 📝 Verwendung

### Erste Schritte

1. **Master-Passwort erstellen** - Mindestens 6 Zeichen beim ersten Start
2. **Ersten Eintrag hinzufügen** - Klicke auf `+` Button
3. **Passwort-Generator** - Klicke auf ✨ Icon im Passwort-Feld
4. **Passwort kopieren** - Tippe auf Eintrag → Kopieren-Icon
5. **Favorit markieren** - Stern-Icon in der Detail-Ansicht

### Passwort-Generator

- Länge: 4-64 Zeichen
- Optionen: Gross-/Kleinbuchstaben, Zahlen, Symbole
- Live Passwort-Stärke-Anzeige
- Kryptographisch sicher (Random.secure)

### Passwort-Historie

- Beim Bearbeiten: "Passwort-Historie anzeigen"
- Letzte 5 Passwörter werden gespeichert
- Wiederherstellung möglich

### Export/Import

- **Export**: Menü → Exportieren → JSON kopieren
- **Import**: Menü → Importieren → JSON einfügen

### Biometrische Authentifizierung

- Nur auf echten Geräten verfügbar
- App sperren → Neu öffnen → Mit Fingerabdruck/Face ID entsperren

## 📁 Projektstruktur

```
lib/
├── main.dart                 # Entry Point
├── models/                   # Datenmodelle
│   └── credential.dart
├── screens/                  # UI Screens
│   ├── setup_screen.dart
│   ├── auth_screen.dart
│   ├── home_screen.dart
│   └── add_edit_credential_screen.dart
├── services/                 # Business Logic
│   ├── secure_storage_service.dart
│   ├── auth_service.dart
│   ├── password_generator_service.dart
│   └── auto_lock_service.dart
└── widgets/                  # UI Components
    └── password_generator_dialog.dart
```

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

## 🐛 Troubleshooting

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

## 💡 Tipps

- **Hot Reload**: `r` in der laufenden App
- **Hot Restart**: `R` für vollständigen Neustart
- **Biometrie**: Nur auf echten Geräten testen

### Sicherheitshinweise

⚠️ **Wichtig:**
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- Biometrische Auth als Backup zu Master-Passwort

**Implementierte Massnahmen:**
- SHA-256 Passwort-Hashing
- Verschlüsselte Speicherung (Keychain/Keystore)
- Biometrische Authentifizierung
- Auto-Lock nach Inaktivität
- Kryptographisch sichere Zufallszahlen
- Keine Cloud-Speicherung
- Passwort-Historie verschlüsselt

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.
