# Neue Features - Passwort-Tresor

Dieses Dokument beschreibt alle neu implementierten Features.

## 1. Passwort-Generator ⭐

### Funktionen:
- Generierung sicherer, zufälliger Passwörter
- Anpassbare Länge: 4-64 Zeichen
- Auswählbare Zeichentypen:
  - Kleinbuchstaben (a-z)
  - Großbuchstaben (A-Z)
  - Zahlen (0-9)
  - Symbole (!@#$...)
- Kryptographisch sicherer Zufallsgenerator (Random.secure)
- Live-Vorschau und Aktualisierungsfunktion

### Verwendung:
1. Im Bearbeitungsmodus auf Zauberstab-Icon neben Passwortfeld klicken
2. Gewünschte Optionen auswählen
3. "Verwenden" klicken zum Übernehmen

### Implementierung:
- `lib/services/password_generator_service.dart`
- `lib/widgets/password_generator_dialog.dart`

## 2. Passwort-Stärke-Anzeige

### Funktionen:
- Echtzeit-Analyse der Passwortstärke
- 5 Stufen: Sehr schwach, Schwach, Mittel, Stark, Sehr stark
- Farbcodierte Fortschrittsanzeige
- Berücksichtigt Länge und Zeichenvielfalt

### Bewertungskriterien:
- Passwortlänge (8+, 12+, 16+ Zeichen)
- Verwendung von Kleinbuchstaben
- Verwendung von Großbuchstaben
- Verwendung von Zahlen
- Verwendung von Sonderzeichen

### Implementierung:
- Integriert in `password_generator_service.dart`
- Anzeige in `add_edit_credential_screen.dart`

## 3. Favoriten-System

### Funktionen:
- Markierung wichtiger Einträge als Favoriten
- Automatische Sortierung: Favoriten zuerst
- Visuelle Kennzeichnung mit Stern-Symbol
- Toggle-Funktion in Detail-Ansicht

### Verwendung:
1. Eintrag öffnen
2. Auf Stern-Icon klicken
3. Favoriten erscheinen automatisch oben

### Implementierung:
- Neues Feld `isFavorite` im Credential-Modell
- Toggle-Funktion in `secure_storage_service.dart`
- UI-Integration in `home_screen.dart`

## 4. Passwort-Historie

### Funktionen:
- Automatisches Speichern der letzten 5 Passwörter
- Wiederherstellung alter Passwörter
- Historie-Ansicht im Bearbeitungsmodus

### Verwendung:
1. Beim Bearbeiten eines Eintrags
2. "Passwort-Historie anzeigen" klicken
3. Gewünschtes Passwort mit Wiederherstellen-Icon auswählen

### Implementierung:
- Neues Feld `passwordHistory` im Credential-Modell
- Automatische Aktualisierung beim Speichern
- Historie-Dialog in `add_edit_credential_screen.dart`

## 5. Notizen-Feld

### Funktionen:
- Zusätzliches Textfeld für jeden Eintrag
- Mehrzeilige Eingabe
- Optional (kann leer gelassen werden)

### Verwendungszwecke:
- URLs zu Webseiten
- Sicherheitsfragen und Antworten
- PINs oder zusätzliche Zugangsdaten
- Beliebige Notizen

### Implementierung:
- Neues Feld `notes` im Credential-Modell
- TextFormField in `add_edit_credential_screen.dart`
- Anzeige in Detail-Ansicht

## 6. Auto-Lock-Timer

### Funktionen:
- Automatisches Sperren nach Inaktivität
- Konfigurierbare Timeout-Dauer: 1-30 Minuten
- Reagiert auf App-Lifecycle-Änderungen
- Zurück zur Authentifizierungs-Seite

### Verwendung:
1. Menü → Einstellungen
2. Auto-Lock-Timeout mit Slider einstellen
3. Speichern

### Implementierung:
- `lib/services/auto_lock_service.dart`
- Timer-Management mit Flutter Timer
- Integration in `home_screen.dart`

## 7. Export/Import-Funktion

### Export:
- Alle Credentials als JSON exportieren
- Enthält Version und Zeitstempel
- Daten können kopiert werden

### Import:
- JSON-Daten einfügen
- Vollständige Wiederherstellung aller Einträge
- Validierung der Import-Daten

### Verwendung Export:
1. Menü → Exportieren
2. Daten kopieren
3. Sicher aufbewahren (z.B. in verschlüsselter Datei)

### Verwendung Import:
1. Menü → Importieren
2. Export-Daten einfügen
3. Importieren bestätigen

### Implementierung:
- Export/Import-Funktionen in `secure_storage_service.dart`
- Dialoge in `home_screen.dart`

## Technische Details

### Neue Dateien:
- `lib/services/password_generator_service.dart` - Passwort-Generierung und Stärke-Analyse
- `lib/services/auto_lock_service.dart` - Auto-Lock-Timer-Management
- `lib/widgets/password_generator_dialog.dart` - UI für Passwort-Generator

### Erweiterte Dateien:
- `lib/models/credential.dart` - Neue Felder: notes, isFavorite, passwordHistory
- `lib/services/secure_storage_service.dart` - Export/Import, Favoriten, Einstellungen
- `lib/screens/home_screen.dart` - Favoriten-Anzeige, Export/Import-UI, Auto-Lock, Einstellungen
- `lib/screens/add_edit_credential_screen.dart` - Generator-Integration, Stärke-Anzeige, Historie, Notizen

### Abhängigkeiten:
Keine neuen Dependencies erforderlich! Alle Features nutzen:
- `flutter` (Standard)
- `dart:async` (für Timer)
- `dart:math` (für Random.secure)

## Migration bestehender Daten

Die App ist abwärtskompatibel. Bestehende Einträge werden automatisch mit Standard-Werten erweitert:
- `notes`: null
- `isFavorite`: false
- `passwordHistory`: leere Liste

## Performance

Alle Features sind optimiert für:
- Schnelle Ausführung
- Minimaler Speicherverbrauch
- Keine Verzögerungen in der UI
- Effiziente Datenspeicherung

## Sicherheit

Alle neuen Features berücksichtigen die Sicherheitsanforderungen:
- Passwort-Generator: Random.secure für kryptographische Sicherheit
- Auto-Lock: Schutz vor unbefugtem Zugriff
- Export: JSON-Format, sollte zusätzlich verschlüsselt werden
- Passwort-Historie: Verschlüsselt im sicheren Speicher
