# 🚀 Quick Start - Auto-Logbuch Capacitor

## ✅ Installation erfolgreich!

Die Capacitor/Ionic React App ist vollständig eingerichtet und läuft.

## 📡 Dev Server Status

**✅ Vite Dev Server läuft!**

- **URL**: http://localhost:5173/
- **Status**: Ready
- **Build Zeit**: 196ms

## 🧪 App im Browser testen

Öffne den Browser und gehe zu:
```
http://localhost:5173/
```

Die App sollte jetzt die Fahrzeugliste (leer) anzeigen.

## 🎯 Erste Schritte

1. **Fahrzeug hinzufügen** - Klicke auf den "+" Button
2. **Wartung erfassen** - Wähle ein Fahrzeug aus
3. **Fahrt starten** - GPS-Tracking im Browser (nur über HTTPS/localhost)

## 📱 Native Apps erstellen

### Android

**⚠️ WICHTIG: Java-Version**

Aktuell ist Java 25 installiert, aber Gradle unterstützt dies noch nicht. Verwende Java 17 oder 21:

**Lösung 1: Java 17 installieren (empfohlen)**
1. Download: https://adoptium.net/temurin/releases/?version=17
2. Installiere Java 17
3. Setze `JAVA_HOME`:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot"
   ```

**Lösung 2: Gradle über Android Studio ausführen**
```bash
# Android Studio öffnen
npm run open:android
```
Android Studio verwendet automatisch die richtige Java-Version.

**Nach Java-Installation:**
```bash
# Gradle Cache löschen
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches"

# Android App starten
npm run android
```

In Android Studio:
1. Warte bis Gradle-Sync fertig ist
2. Verbinde ein Android-Gerät oder starte einen Emulator
3. Klicke auf "Run" (grüner Play-Button)

### iOS (nur auf macOS)

```bash
# iOS hinzufügen
npx cap add ios

# Projekt syncen
npx cap sync

# Xcode öffnen
npm run open:ios
```

In Xcode:
1. Wähle ein Simulator oder echtes iPhone
2. Klicke auf "Run" (Play-Button)

## 🛠️ Wichtige Befehle

```bash
# Dev Server starten
npm run dev

# Production Build
npm run build

# Capacitor sync (nach Code-Änderungen)
npm run sync

# Android App starten
npm run android

# iOS App starten (nur macOS)
npm run ios
```

## 🔍 Code-Struktur

```
src/
├── pages/               # 7 Ionic Pages
│   ├── HomePage.tsx            # ✅ Fahrzeugliste
│   ├── AddFahrzeugPage.tsx     # ✅ Fahrzeug hinzufügen
│   ├── FahrzeugDetailPage.tsx  # ✅ Details + Wartungen
│   ├── AddWartungPage.tsx      # ✅ Wartung erfassen
│   ├── FahrtenListPage.tsx     # ✅ Fahrtenbuch
│   ├── ActiveFahrtPage.tsx     # ✅ Live GPS-Tracking
│   └── FahrtDetailPage.tsx     # ✅ Fahrtdetails
├── services/
│   ├── database.service.ts     # ✅ Preferences Storage
│   └── location.service.ts     # ✅ GPS-Tracking
├── models/
│   ├── Fahrzeug.ts             # ✅ TypeScript Interface
│   ├── Wartung.ts              # ✅ TypeScript Interface
│   └── Fahrt.ts                # ✅ TypeScript Interface
└── App.tsx                      # ✅ Main Component
```

## 📊 Features

| Feature | Status |
|---------|--------|
| Fahrzeuge verwalten | ✅ |
| Wartungen erfassen | ✅ |
| GPS-Tracking | ✅ |
| Fahrtenbuch | ✅ |
| Persistenter Storage | ✅ |
| Ionic UI Components | ✅ |
| TypeScript | ✅ |
| React Router | ✅ |

## 🔐 GPS-Berechtigungen

### Browser
GPS funktioniert automatisch über `http://localhost:5173/`

### Android
Berechtigungen werden automatisch zur Laufzeit angefragt.

### iOS
Info.plist enthält bereits die benötigten Permission-Strings.

## 🐛 Debugging

### Browser Console
Öffne die Browser DevTools (F12) für Logs und Fehler.

### Android Logcat
```bash
npx cap run android -l
```

### iOS Console
In Xcode → Window → Devices and Simulators → Open Console

## 📚 Weitere Dokumentation

- **README.md** - Vollständige Projektdokumentation
- **capacitor.config.ts** - Capacitor-Konfiguration
- **vite.config.ts** - Vite-Build-Konfiguration
- **package.json** - Dependencies und Scripts

## ✨ Next Steps

1. **Teste die App im Browser**: http://localhost:5173/
2. **Füge ein Testfahrzeug hinzu**
3. **Starte eine Testfahrt mit GPS-Tracking**
4. **Erstelle Android/iOS Apps** mit den obigen Befehlen

## 💡 Tipps

- **Hot Reload**: Änderungen im Code werden automatisch im Browser aktualisiert
- **Capacitor Sync**: Nach größeren Änderungen immer `npm run sync` ausführen
- **GPS im Browser**: Funktioniert nur über HTTPS oder localhost
- **Native Features**: Manche Features (GPS im Hintergrund) funktionieren nur in nativen Apps

## 🎉 Fertig!

Die Capacitor/Ionic React Auto-Logbuch App ist vollständig implementiert und ready to use!
