# Benutzerhandbuch - Passwort-Tresor

## Schnellstart-Anleitung

### Erste Schritte
1. **App starten** - Beim ersten Start ein Master-Passwort erstellen
2. **Biometrie einrichten** (optional) - Fingerabdruck oder Gesichtserkennung aktivieren
3. **Ersten Eintrag erstellen** - Plus-Button (+) unten rechts tippen

---

## 📱 Hauptfunktionen

### Neuen Eintrag erstellen
1. **Plus-Button** unten rechts tippen
2. **Titel** eingeben (z.B. "Gmail", "Facebook")
3. **Benutzername** eingeben (E-Mail oder Username)
4. **Passwort** eingeben oder generieren lassen
5. **Notizen** hinzufügen (optional)
6. **Speichern** tippen

### 🔐 Passwort generieren
**Im Bearbeitungsmodus:**
1. Auf das **Zauberstab-Icon** ⚡ neben dem Passwort-Feld tippen
2. **Länge einstellen** mit dem Slider (4-64 Zeichen)
3. **Zeichentypen auswählen:**
   - ☑️ Kleinbuchstaben (a-z)
   - ☑️ Großbuchstaben (A-Z)
   - ☑️ Zahlen (0-9)
   - ☑️ Symbole (!@#$...)
4. **Aktualisieren** mit dem Refresh-Icon für neues Passwort
5. **Verwenden** tippen zum Übernehmen

**Tipp:** Die Stärke-Anzeige zeigt sofort die Sicherheit des Passworts:
- 🔴 Sehr schwach
- 🟠 Schwach
- 🟡 Mittel
- 🟢 Stark
- 🟢 Sehr stark

### ⭐ Favoriten verwenden
**Eintrag als Favorit markieren:**
1. Eintrag in der Liste antippen
2. Auf das **Stern-Icon** ⭐ tippen (oben rechts)
3. Stern wird gelb = Favorit

**Vorteile:**
- Favoriten erscheinen immer oben in der Liste
- Gelber Stern-Badge auf dem Avatar
- Schneller Zugriff auf wichtige Einträge

### 📝 Notizen hinzufügen
**Verwendungszwecke für Notizen:**
- 🌐 Website-URLs
- 🔒 Sicherheitsfragen und Antworten
- 🔢 PINs oder zusätzliche Codes
- 💡 Beliebige Hinweise

**Hinzufügen:**
1. Beim Erstellen/Bearbeiten: Notizen-Feld ausfüllen
2. Bei Anzeige: In Detail-Ansicht unter dem Passwort

### 🕐 Passwort-Historie nutzen
**Automatische Speicherung:**
- Letzte 5 Passwörter werden automatisch gespeichert
- Nur bei Änderung eines bestehenden Eintrags

**Zugriff:**
1. Eintrag bearbeiten
2. **"Passwort-Historie anzeigen"** tippen
3. Gewünschtes Passwort auswählen
4. **Wiederherstellen-Icon** tippen zum Übernehmen

### 🔍 Einträge suchen
1. **Such-Icon** 🔍 in der App-Bar tippen
2. Begriff eingeben (durchsucht Titel und Benutzername)
3. Eintrag aus Ergebnissen auswählen

### 📋 Daten kopieren
**In der Detail-Ansicht:**
- **Benutzername kopieren:** Copy-Icon neben Benutzername
- **Passwort kopieren:** Copy-Icon neben Passwort
- **Bestätigung:** "Kopiert"-Meldung erscheint

### ✏️ Eintrag bearbeiten
1. Eintrag in Liste antippen
2. **Bearbeiten-Icon** ✏️ (oben rechts) tippen
3. Änderungen vornehmen
4. **Änderungen speichern** tippen

### 🗑️ Eintrag löschen
1. **Papierkorb-Icon** 🗑️ in der Liste tippen
2. Löschen bestätigen
3. Eintrag wird dauerhaft entfernt

---

## ⚙️ Erweiterte Funktionen

### 📤 Daten exportieren
**Sicherung erstellen:**
1. **Menü** (drei Punkte) → **Exportieren**
2. JSON-Daten werden angezeigt
3. **Kopieren** tippen
4. In sichere Datei einfügen (z.B. verschlüsselte Cloud)

**Export enthält:**
- Alle Einträge mit allen Daten
- Passwort-Historie
- Notizen und Favoriten
- Zeitstempel des Exports
- Versionsnummer

⚠️ **Wichtig:** Export-Daten sicher aufbewahren! Sie enthalten alle Passwörter.

### 📥 Daten importieren
**Wiederherstellung:**
1. **Menü** → **Importieren**
2. Export-Daten einfügen
3. **Importieren** tippen
4. Alle Einträge werden wiederhergestellt

⚠️ **Achtung:** Import überschreibt aktuelle Daten!

### ⏱️ Auto-Lock einstellen
**Automatisches Sperren konfigurieren:**
1. **Menü** → **Einstellungen**
2. **Auto-Lock-Timeout** mit Slider einstellen (1-30 Minuten)
3. **Speichern** tippen

**Funktionsweise:**
- App sperrt sich nach eingestellter Inaktivität
- Auch beim App-Wechsel wird Timer zurückgesetzt
- Biometrische Authentifizierung oder Master-Passwort erforderlich

---

## 🔒 Sicherheit

### Master-Passwort
- **Sicher speichern:** Als SHA-256 Hash verschlüsselt
- **Nicht wiederherstellbar:** Bei Verlust keine Wiederherstellung möglich
- **Mindestlänge:** 6 Zeichen (länger ist sicherer)

### Biometrische Authentifizierung
- **Primäre Methode:** Fingerabdruck oder Gesichtserkennung
- **Fallback:** Master-Passwort immer verfügbar
- **Keine Speicherung:** Biometrische Daten bleiben auf dem Gerät

### Datenspeicherung
- **Android:** Keystore mit EncryptedSharedPreferences
- **iOS:** Keychain
- **Verschlüsselt:** Alle Daten sind verschlüsselt
- **Lokal:** Keine Cloud-Synchronisation

### Passwort-Sicherheit
- **Generator:** Kryptographisch sicherer Zufallsgenerator
- **Stärke-Meter:** Hilft bei der Bewertung
- **Historie:** Verschlüsselt gespeichert
- **Export:** Benutzer sollte zusätzlich verschlüsseln

---

## 💡 Tipps & Tricks

### 🎯 Beste Praktiken
1. **Starke Passwörter:** Nutzen Sie den Generator mit allen Zeichentypen
2. **Einzigartige Passwörter:** Niemals das gleiche Passwort mehrfach verwenden
3. **Favoriten:** Markieren Sie häufig genutzte Einträge
4. **Regelmäßige Backups:** Exportieren Sie Ihre Daten regelmäßig
5. **Auto-Lock:** Stellen Sie einen kurzen Timeout ein (5 Min empfohlen)
6. **Notizen nutzen:** Speichern Sie Sicherheitsfragen und URLs

### 📱 Schnelle Aktionen
- **Pull-to-Refresh:** Liste nach unten ziehen zum Aktualisieren
- **Lange drücken:** -
- **Doppelt tippen:** Detail-Ansicht öffnen

### 🔧 Problemlösungen

**Biometrie funktioniert nicht:**
- Master-Passwort als Alternative nutzen
- Biometrie-Einstellungen im Gerät prüfen
- App-Berechtigungen kontrollieren

**Passwort vergessen:**
- ⚠️ Keine Wiederherstellung möglich
- Daten müssen gelöscht und neu erstellt werden
- Regelmäßige Backups verhindern Datenverlust

**Import schlägt fehl:**
- JSON-Format prüfen
- Vollständige Daten kopieren
- Keine zusätzlichen Zeichen einfügen

**App sperrt zu schnell:**
- Menü → Einstellungen → Auto-Lock-Timeout erhöhen
- Maximum: 30 Minuten

---

## 📊 Übersicht aller Funktionen

| Funktion | Icon | Wo zu finden |
|----------|------|--------------|
| Neuer Eintrag | ➕ | Unten rechts (FAB) |
| Suchen | 🔍 | App-Bar |
| Exportieren | 📤 | Menü → Exportieren |
| Importieren | 📥 | Menü → Importieren |
| Einstellungen | ⚙️ | Menü → Einstellungen |
| Passwort generieren | ⚡ | Im Passwort-Feld |
| Favorit | ⭐ | Detail-Ansicht |
| Bearbeiten | ✏️ | Detail-Ansicht |
| Löschen | 🗑️ | In der Liste |
| Kopieren | 📋 | Detail-Ansicht |
| Passwort anzeigen | 👁️ | Bei Passwort-Feld |
| Historie | 🕐 | Beim Bearbeiten |

---

## ❓ Häufige Fragen (FAQ)

**Q: Wie viele Einträge kann ich speichern?**
A: Unbegrenzt (abhängig vom Gerätespeicher)

**Q: Werden meine Daten in der Cloud gespeichert?**
A: Nein, alle Daten bleiben lokal auf Ihrem Gerät

**Q: Was passiert bei App-Deinstallation?**
A: Alle Daten werden unwiderruflich gelöscht

**Q: Kann ich Daten mit anderen Geräten synchronisieren?**
A: Aktuell nicht automatisch, aber manuell über Export/Import

**Q: Wie sicher ist die App?**
A: Sehr sicher - Verschlüsselung, Biometrie, Auto-Lock, keine Cloud

**Q: Kann jemand meine Export-Daten lesen?**
A: Ja, Export ist im Klartext - bitte zusätzlich verschlüsseln

**Q: Wie lange bleiben Passwörter in der Historie?**
A: Die letzten 5 Passwörter pro Eintrag

**Q: Was ist ein gutes Passwort?**
A: Mindestens 16 Zeichen, gemischte Typen, vom Generator erstellt

---

## 🆘 Support

Bei Problemen:
1. README.md lesen
2. NEUE_FEATURES.md für Feature-Details
3. GitHub Issues erstellen

**Wichtig:** Bei Sicherheitsproblemen bitte verantwortungsvoll melden!

---

Viel Erfolg mit Ihrem sicheren Passwort-Tresor! 🔐✨
