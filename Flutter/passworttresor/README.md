# Passwort-Tresor

Eine sichere Flutter-Applikation zur Verwaltung von Passwörtern mit biometrischer Authentifizierung.

## Funktionen

- **Biometrische Authentifizierung**: Entsperren Sie die App mit Fingerabdruck oder Gesichtserkennung
- **Master-Passwort als Fallback**: Zugriff auch ohne Biometrie möglich
- **Sichere Speicherung**: Alle Daten werden verschlüsselt gespeichert
  - iOS: Keychain
  - Android: Keystore/EncryptedSharedPreferences
- **Passwort-Verwaltung**: Speichern, bearbeiten und löschen Sie Anmeldeinformationen
- **Passwort-Generator**: Generieren Sie sichere, zufällige Passwörter
- **Passwort-Stärke-Anzeige**: Visuelle Bewertung der Passwortstärke
- **Favoriten**: Markieren Sie häufig verwendete Einträge
- **Passwort-Historie**: Speichert die letzten 5 Passwörter pro Eintrag
- **Notizen-Feld**: Fügen Sie zusätzliche Informationen zu jedem Eintrag hinzu
- **Auto-Lock**: Automatisches Sperren nach Inaktivität (konfigurierbar)
- **Export/Import**: Sichern und Wiederherstellen Ihrer Daten
- **Kopieren-Funktion**: Schnelles Kopieren von Benutzername und Passwort
- **Suchfunktion**: Finden Sie Ihre Einträge schnell und einfach

## Implementierte Verbesserungen

### 1. Erweiterte Datenmodellierung
- **Credential-Modell** mit zusätzlichen Feldern:
  - `id`: Eindeutige Identifikation
  - `title`: Beschreibender Name (z.B. "Gmail", "Facebook")
  - `createdAt` und `modifiedAt`: Zeitstempel für bessere Nachverfolgbarkeit
  - `notes`: Optionales Notizen-Feld für zusätzliche Informationen
  - `isFavorite`: Markierung für Favoriten
  - `passwordHistory`: Liste der letzten 5 Passwörter

### 2. Passwort-Generator
- **Zufallsgenerator** mit anpassbaren Optionen:
  - Länge: 4-64 Zeichen
  - Klein- und Großbuchstaben
  - Zahlen und Symbole
  - Kryptographisch sicher (Random.secure)
- **Live-Stärke-Anzeige** während der Generierung
- **Sofortige Integration** in Passwortfeld

### 3. Passwort-Stärke-Meter
- **Visuelle Bewertung** in 5 Stufen (Sehr schwach bis Sehr stark)
- **Echtzeit-Analyse** während der Eingabe
- **Farbcodierte Anzeige** für schnelle Orientierung
- **Berücksichtigt**:
  - Passwortlänge
  - Zeichenvielfalt (Klein-/Großbuchstaben, Zahlen, Symbole)

### 4. Favoriten-System
- **Stern-Icon** zum Markieren wichtiger Einträge
- **Automatische Sortierung**: Favoriten erscheinen oben in der Liste
- **Visuelle Kennzeichnung** mit gelbem Stern-Symbol

### 5. Passwort-Historie
- **Automatisches Speichern** der letzten 5 Passwörter bei Änderung
- **Wiederherstellungsfunktion** aus Historie
- **Historie-Ansicht** über Button im Bearbeitungsmodus

### 6. Notizen-Feld
- **Zusätzliches Textfeld** für jeden Eintrag
- **Mehrzeilige Eingabe** für längere Notizen
- **Anzeige in Detail-Ansicht**
- **Verwendung** für: URLs, Sicherheitsfragen, zusätzliche Hinweise

### 7. Auto-Lock-Timer
- **Automatisches Sperren** nach konfigurierter Inaktivität
- **Einstellbar**: 1-30 Minuten
- **Reagiert auf App-Lifecycle**: Sperrt bei App-Wechsel
- **Schutz** vor unbefugtem Zugriff

### 8. Export/Import-Funktion
- **Vollständiger Daten-Export** im JSON-Format
- **Import-Funktion** zur Wiederherstellung
- **Versionierung** der Export-Daten
- **Zeitstempel** für Nachverfolgbarkeit

### 9. Verbesserte Benutzeroberfläche
- **Material Design 3** für moderne Optik
- **Detail-Ansicht** mit Modal Bottom Sheet für bessere UX
- **Kopieren-Buttons** für Benutzername und Passwort
- **Passwort-Anzeige-Toggle** in Detail-Ansicht
- **Suchfunktion** für schnelles Finden von Einträgen
- **Pull-to-Refresh** für Aktualisierung der Liste
- **Einstellungs-Menü** für Konfiguration

### 10. Erweiterte Sicherheit
- **SHA-256 Hashing** für Master-Passwort
- **Biometrie als primäre Methode**, Passwort als Fallback
- **Passwort-Validierung** mit Stärke-Anzeige
- **Kryptographisch sicherer** Passwort-Generator

### 11. Bessere Fehlerbehandlung
- Try-catch Blöcke in allen kritischen Bereichen
- Benutzerfreundliche Fehlermeldungen
- Loading-States für besseres Feedback

## Installation

1. Stellen Sie sicher, dass Flutter installiert ist:
```bash
flutter doctor
```

2. Installieren Sie die Abhängigkeiten:
```bash
flutter pub get
```

3. Führen Sie die App aus:
```bash
flutter run
```

## Verwendete Packages

- **local_auth** (^2.3.0): Biometrische Authentifizierung
- **flutter_secure_storage** (^9.2.2): Sichere Datenspeicherung
- **crypto** (^3.0.6): Passwort-Hashing

## Plattform-Anforderungen

### Android
- Minimum SDK: 23 (Android 6.0)
- Erforderliche Permissions sind in `AndroidManifest.xml` konfiguriert

### iOS
- Minimum iOS Version: 12.0
- Biometrie-Nutzung muss in `Info.plist` beschrieben werden

## Verwendung

1. **Erste Einrichtung**: 
   - Beim ersten Start ein Master-Passwort erstellen
   - Dieses dient als Fallback, wenn Biometrie nicht verfügbar ist

2. **Entsperren**:
   - Primär über biometrische Authentifizierung
   - Alternativ mit Master-Passwort
   - Auto-Lock nach konfigurierbarer Inaktivität

3. **Einträge verwalten**:
   - **Neuer Eintrag**: Plus-Button unten rechts
   - **Bearbeiten**: Eintrag antippen → Bearbeiten-Icon
   - **Löschen**: Papierkorb-Icon in der Liste
   - **Kopieren**: In der Detail-Ansicht auf Kopieren-Icon tippen
   - **Favorit markieren**: Stern-Icon in der Detail-Ansicht
   - **Notizen hinzufügen**: Optionales Notizen-Feld beim Erstellen/Bearbeiten

4. **Passwort-Generator**:
   - Im Bearbeitungsmodus: Zauberstab-Icon neben Passwort-Feld
   - Länge und Zeichentypen anpassen
   - Passwort-Stärke wird live angezeigt
   - "Verwenden" klicken zum Übernehmen

5. **Passwort-Historie**:
   - Beim Bearbeiten: "Passwort-Historie anzeigen" Button
   - Frühere Passwörter wiederherstellen
   - Automatische Speicherung der letzten 5 Passwörter

6. **Suchen**:
   - Such-Icon in der App-Bar für schnelles Finden
   - Suche nach Titel oder Benutzername

7. **Daten-Verwaltung**:
   - **Exportieren**: Menü → Exportieren → Daten kopieren
   - **Importieren**: Menü → Importieren → Daten einfügen
   - **Einstellungen**: Menü → Einstellungen → Auto-Lock-Timeout anpassen

## Sicherheitshinweise

- Das Master-Passwort wird als SHA-256 Hash gespeichert
- Alle Anmeldedaten werden verschlüsselt im sicheren Speicher des Geräts abgelegt
- Bei Deinstallation der App werden alle Daten automatisch gelöscht
- Biometrische Daten werden nicht in der App gespeichert, sondern nur über die System-API abgefragt
- Der Passwort-Generator verwendet Random.secure für kryptographisch sichere Zufallszahlen
- Auto-Lock schützt vor unbefugtem Zugriff bei Inaktivität
- Export-Daten sollten sicher aufbewahrt werden (z.B. verschlüsselt in Cloud-Speicher)
- Passwort-Historie ist verschlüsselt im sicheren Speicher

