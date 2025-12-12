# PasswortTresor - Capacitor - Quick Start

## 🚀 In 2 Schritten starten

### 1. Dependencies installieren
```bash
cd Capacitor/PasswortTresor
npm install
```

### 2. App im Browser starten
```bash
npm run dev
```

Öffne: **http://localhost:3000**

## 📱 Native Apps erstellen

### Android
```bash
# Plattform hinzufügen (einmalig)
npx cap add android

# Build erstellen
npm run build

# Zu Android syncen
npx cap sync

# Android Studio öffnen
npx cap open android
```

In Android Studio:
1. Gradle-Sync abwarten
2. Emulator oder Gerät wählen
3. Play-Button klicken

### iOS (nur macOS)
```bash
# Plattform hinzufügen (einmalig)
npx cap add ios

# Build erstellen
npm run build

# Zu iOS syncen
npx cap sync

# Xcode öffnen
npx cap open ios
```

## 📋 Features testen

1. **Master-Passwort erstellen** - Beim ersten Start (min. 6 Zeichen)
2. **Eintrag hinzufügen** - `+` Button klicken
3. **Passwort-Generator** - ✨ Icon im Passwort-Feld
4. **Favorit markieren** - Stern-Icon in Eintrag
5. **Export/Import** - Menü (⋮) → Exportieren/Importieren

## 🔧 Wichtige Befehle

```bash
# Development Server
npm run dev

# Production Build
npm run build

# Capacitor Sync
npx cap sync

# Native Apps öffnen
npx cap open android
npx cap open ios
```

## 🔐 Sicherheitshinweise

⚠️ **Wichtig:**
- Master-Passwort gut merken (kein Recovery!)
- Export-Daten sicher aufbewahren
- Keine Biometrische Auth in dieser Version

## 🐛 Häufige Probleme

### "Port 3000 belegt"
Ändere Port in `vite.config.ts`:
```typescript
server: { port: 3001 }
```

### "Build-Fehler"
```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Android Sync-Fehler"
```bash
npx cap sync android
```

## 💡 Tipps

- **Browser-DevTools**: F12 für Debugging
- **Hot Reload**: Automatisch im Browser
- **Sync nach Änderungen**: `npx cap sync` ausführen
- **Native Debugging**: Chrome DevTools für Android, Safari für iOS

## ✅ Fertig!

Die App sollte nun laufen. Sichere Passwort-Verwaltung! 🔐
