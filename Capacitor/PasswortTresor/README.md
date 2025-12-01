# Passwort-Tresor - Capacitor Implementation

Sichere Passwort-Manager-App mit Ionic React und Capacitor.

## ✨ Features

- ✅ Master-Passwort Setup
- ✅ Sichere Speicherung mit Capacitor Preferences
- ✅ Passwort-Generator mit Stärke-Anzeige
- ✅ Favoriten-System
- ✅ Suche
- ✅ Export/Import
- ✅ Passwort-Historie
- ✅ Kopieren in Zwischenablage
- ✅ Responsive Design

## 🚀 Installation & Start

```bash
# Dependencies installieren
npm install

# Web-Entwicklung starten
npm run dev

# Build erstellen
npm run build

# Capacitor synchronisieren
npm run sync

# Android App
npm run android

# iOS App (nur macOS)
npm run ios
```

## 📱 Plattformen

- ✅ Android
- ✅ iOS
- ✅ Web

## 🛠 Tech Stack

- **Framework**: Ionic React 8
- **Sprache**: TypeScript
- **Build**: Vite
- **Mobile**: Capacitor 6
- **Storage**: Capacitor Preferences
- **Clipboard**: Capacitor Clipboard
- **Icons**: Ionicons

## 📁 Projekt-Struktur

```
src/
├── models/          # Datenmodelle (Credential, Settings)
├── services/        # Business Logic
│   ├── StorageService.ts
│   ├── CryptoService.ts
│   └── PasswordGeneratorService.ts
├── pages/           # Haupt-Seiten
│   ├── SetupPage.tsx
│   ├── AuthPage.tsx
│   └── HomePage.tsx
├── components/      # Wiederverwendbare Komponenten
│   └── CredentialModal.tsx
├── theme/           # Styling
│   ├── variables.css
│   └── global.css
├── App.tsx          # Haupt-App
└── main.tsx         # Entry Point
```

## 🎨 Design

Identisches Design wie Flutter und Expo Versionen:
- **Primary Color**: #2196F3 (Blau)
- **Success**: #4CAF50 (Grün)
- **Warning**: #FFC107 (Orange)
- **Danger**: #f44336 (Rot)

## 🔐 Sicherheit

- SHA-256 Password Hashing
- Capacitor SecureStorage (Keychain/KeyStore)
- Crypto.getRandomValues() für Passwort-Generator
- Keine Cloud-Speicherung

## 📖 Capacitor Best Practices

1. **Native APIs**: Verwendung von Capacitor Plugins
2. **Ionic Components**: UI-Komponenten für natives Look & Feel
3. **TypeScript**: Type-Safety
4. **Preferences API**: Sichere lokale Speicherung
5. **Responsive**: Funktioniert auf allen Bildschirmgrößen

## 🔄 Vergleich mit anderen Frameworks

### Vorteile Capacitor
- ✅ Web-Standards (HTML/CSS/JS)
- ✅ Ionic UI Components
- ✅ Einfache Integration mit bestehenden Web-Apps
- ✅ Hot Reload im Browser
- ✅ Progressive Web App Support

### Gleiche Funktionen wie Flutter/Expo
- ✅ 100% Feature-Parität
- ✅ Identisches Design
- ✅ Gleiche Sicherheitsstufe
- ✅ Vergleichbare Performance

## 📝 Scripts

```bash
npm run dev          # Development Server (Port 3000)
npm run build        # Production Build
npm run preview      # Preview Production Build
npm run sync         # Sync mit nativen Plattformen
npm run android      # Android App starten
npm run ios          # iOS App starten (macOS only)
npm run open:android # Android Studio öffnen
npm run open:ios     # Xcode öffnen
```

## 🐛 Bekannte Einschränkungen

- Keine Biometrische Authentifizierung (kann hinzugefügt werden)
- Keine Auto-Lock Funktion im Web-Modus
- Export/Import nur über Zwischenablage

## 📚 Weitere Dokumentation

- [Ionic React Docs](https://ionicframework.com/docs/react)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Capacitor Plugins](https://capacitorjs.com/docs/apis)

---

**Version**: 1.0.0  
**Framework**: Ionic React 8 + Capacitor 6  
**Erstellt**: November 2024
