# Quick Start Guide - Passwort-Tresor (Expo)

## 🚀 Schnellstart in 5 Minuten

### 1. Voraussetzungen prüfen

```bash
# Node.js Version (min. 18.x)
node --version

# npm Version
npm --version
```

Falls nicht installiert:
- Node.js: https://nodejs.org/
- Expo Go App auf Smartphone installieren (iOS/Android)

---

### 2. Projekt einrichten

```bash
# In Projektordner wechseln
cd Expo/passworttresor

# Dependencies installieren
npm install

# (Optional) Expo CLI global installieren
npm install -g expo-cli
```

---

### 3. App starten

```bash
# Development Server starten
npm start
```

Ein QR-Code wird angezeigt. Jetzt:

**iOS**: 
- Kamera-App öffnen
- QR-Code scannen
- In Expo Go öffnen

**Android**:
- Expo Go App öffnen
- "Scan QR Code" tippen
- QR-Code scannen

---

### 4. Erste Schritte in der App

1. **Master-Passwort einrichten**
   - Mindestens 6 Zeichen
   - Passwort merken! (Kein Recovery möglich)

2. **Ersten Eintrag erstellen**
   - "+" Button antippen
   - Titel, Username, Passwort eingeben
   - "Eintrag hinzufügen" tippen

3. **Passwort-Generator nutzen**
   - In "Neuer Eintrag" Screen
   - Sparkles-Icon (✨) im Passwort-Feld
   - Optionen anpassen
   - "Verwenden" tippen

4. **Biometrische Auth aktivieren**
   - App sperren (Home-Button)
   - App neu öffnen
   - "Mit Biometrie entsperren" wählen

---

## 📱 Emulator/Simulator

### iOS Simulator (nur macOS)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

**Hinweis**: Biometrische Auth funktioniert nur auf echten Geräten richtig.

---

## 🔧 Entwicklung

### Hot Reload nutzen
- Dateien ändern
- Speichern
- App aktualisiert automatisch

### Logs anzeigen
```bash
# Im Terminal nach "npm start"
# Logs werden automatisch angezeigt
```

### TypeScript prüfen
```bash
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### "expo command not found"
```bash
npm install -g expo-cli
```

### "Cannot connect to Metro"
```bash
# Server neu starten
# Strg+C zum Beenden
npm start -- --clear
```

### "Unable to resolve module"
```bash
# Cache löschen
npm start -- --clear

# Oder node_modules neu installieren
rm -rf node_modules
npm install
```

### App lädt nicht auf Gerät
1. Gerät und Computer im gleichen WLAN?
2. Firewall blockiert Port 8081?
3. Expo Go App aktuell?

---

## 📖 Weitere Ressourcen

### In diesem Projekt
- [README_DE.md](README_DE.md) - Vollständige Dokumentation
- [SUMMARY.md](SUMMARY.md) - Feature-Übersicht
- [IMPLEMENTATION_COMPARISON.md](IMPLEMENTATION_COMPARISON.md) - Flutter vs Expo

### Expo Dokumentation
- https://docs.expo.dev/
- https://reactnative.dev/

### Hilfe
- Expo Discord: https://chat.expo.dev/
- Stack Overflow: Tag `expo`

---

## ✅ Checkliste

Nach dem Start sollte funktionieren:
- [ ] Master-Passwort Setup
- [ ] Credential hinzufügen
- [ ] Credential bearbeiten
- [ ] Credential löschen
- [ ] Passwort-Generator
- [ ] Suche
- [ ] Favoriten
- [ ] Export/Import

---

## 🎯 Nächste Schritte

1. **App testen**: Alle Features durchprobieren
2. **Code ansehen**: Projektstruktur verstehen
3. **Anpassen**: UI/Funktionen nach Wunsch ändern
4. **Deployen**: Build für Produktion erstellen

---

**Viel Erfolg! 🚀**

Bei Problemen: Dokumentation lesen oder Issue erstellen.
