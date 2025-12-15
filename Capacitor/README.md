# Capacitor - Web-to-Native Framework

## Übersicht

Capacitor ist ein Cross-Platform Native Runtime, das es ermöglicht, Web-Apps als native iOS-, Android- und Progressive Web Apps zu erstellen. Es wurde von Ionic entwickelt und bietet eine moderne Alternative zu Cordova.

## 🎯 Implementierte Apps

### 1. AutoLogbuch
Fahrzeugverwaltungs-App mit GPS-Tracking, Wartungshistorie und Capacitor Preferences Storage.

**Siehe:** [AutoLogbuch/README.md](AutoLogbuch/README.md)

### 2. WetterApp
Wetter-App mit aktuellen Daten, 7-Tage und stündlicher Vorhersage von OpenWeatherMap API.

**Siehe:** [WetterApp/README.md](WetterApp/README.md)

### 3. PasswortTresor
Sicherer Passwort-Manager mit verschlüsselter Speicherung und Ionic UI Components.

**Siehe:** [PasswortTresor/README.md](PasswortTresor/README.md)

## 🚀 Vorteile von Capacitor

### Web-Standards
- **HTML, CSS, JavaScript** - Bekannte Web-Technologien
- **Progressive Web Apps** (PWA) Support
- **Jedes Web-Framework** verwendbar (React, Vue, Angular)
- **Web-Performance-Tools** nutzbar

### Developer Experience
- **Live Reload** im Browser während Entwicklung
- **Hot Module Replacement** mit Vite/Webpack
- **Web DevTools** für Debugging
- **Schnelle Iteration** ohne native Builds

### Native Integration
- **Native APIs** über JavaScript
- **Custom Native Code** einfach integrierbar
- **Plugin-System** für Erweiterungen
- **Native UI** wo benötigt

### Plattform-Support
- ✅ Android
- ✅ iOS
- ✅ Web (PWA)

## 🛠️ Technologie-Stack

### Sprachen
- **TypeScript** - Type-safe JavaScript
- **JavaScript** - Alternative zu TypeScript

### UI Frameworks
- **Ionic React** - React mit Ionic Components
- **Ionic Angular** - Angular mit Ionic Components
- **Ionic Vue** - Vue mit Ionic Components
- **Vanilla JS** - Ohne Framework

### Build Tools
- **Vite** - Schneller Build-Tool (modern)
- **Webpack** - Traditioneller Bundler
- **Create React App** - React Setup (deprecated)

### State Management
- **React Hooks** - Built-in State
- **Zustand** - Leichtgewichtig
- **Redux** - Enterprise-Grade
- **Context API** - React Global State

### Wichtige Capacitor Plugins
- **@capacitor/preferences** - Key-Value Storage
- **@capacitor/geolocation** - GPS-Funktionalität
- **@capacitor/network** - Netzwerk-Status
- **@capacitor/clipboard** - Zwischenablage
- **@capacitor/app** - App-Lifecycle

### UI Components (Ionic)
- **Buttons, Cards, Lists** - Standard UI
- **Navigation** - Tabs, Side Menu
- **Forms** - Input, Select, Checkbox
- **Modals & Alerts** - Dialoge

## 📦 Installation & Setup

### Voraussetzungen

1. **Node.js** installieren (v18+):
   ```bash
   node --version
   ```

2. **Ionic CLI** installieren:
   ```bash
   npm install -g @ionic/cli
   ```

3. **Plattform-Tools:**
   - **Android:** Android Studio, Android SDK
   - **iOS:** Xcode (nur macOS)

### Capacitor-Projekt starten

```bash
# In App-Verzeichnis wechseln
cd Capacitor/[app-name]

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

### Native Plattformen hinzufügen

```bash
# Android hinzufügen
npx cap add android

# iOS hinzufügen (nur macOS)
npx cap add ios

# Assets synchronisieren
npx cap sync
```

### Verfügbare Befehle

```bash
# Development
npm run dev                    # Vite Dev Server (Browser)
npm run build                  # Production Build
npm run preview                # Preview Build

# Capacitor
npx cap sync                   # Sync zu nativen Projekten
npx cap open android           # Android Studio öffnen
npx cap open ios               # Xcode öffnen
npx cap run android            # Auf Android starten
npx cap run ios                # Auf iOS starten

# Ionic CLI (Alternative)
ionic serve                    # Dev Server
ionic capacitor build android  # Android Build
ionic capacitor build ios      # iOS Build
```

## 📊 Code-Struktur

Typische Capacitor-App-Struktur:

```
app/
├── src/
│   ├── components/           # React Components
│   ├── pages/                # Ionic Pages
│   ├── services/             # Business Logic
│   ├── models/               # TypeScript Interfaces
│   ├── theme/                # CSS Styling
│   ├── App.tsx               # Main Component
│   └── main.tsx              # Entry Point
├── public/                   # Statische Assets
├── android/                  # Android Native Projekt
├── ios/                      # iOS Native Projekt
├── capacitor.config.ts       # Capacitor Config
├── vite.config.ts            # Vite Config
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript Config
```

## 🎨 UI-Entwicklung mit Ionic

### Ionic Component-Beispiel

```typescript
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton 
} from '@ionic/react';

export default function MyPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meine Seite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block">
          Klick mich
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
```

### Capacitor Plugin verwenden

```typescript
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';

// Preferences
await Preferences.set({ key: 'name', value: 'Max' });
const { value } = await Preferences.get({ key: 'name' });

// Geolocation
const position = await Geolocation.getCurrentPosition();
console.log(position.coords.latitude);
```

## 🔧 Best Practices

### Code-Organisation
- Trenne UI-Components von Business Logic
- Verwende Services für API-Calls
- Nutze TypeScript für Type-Safety
- Erstelle wiederverwendbare Components

### Performance
- Optimiere Bundle-Größe (Tree Shaking)
- Lazy-Load Routes und Components
- Verwende Ionic Virtual Scroll für lange Listen
- Minimiere Re-Renders mit React.memo

### Progressive Web App
- Service Worker für Offline-Support
- App Manifest für Installation
- Cache-Strategie definieren
- Push-Benachrichtigungen

### Sicherheit
- Verwende HTTPS für alle API-Calls
- Validiere Benutzereingaben
- Nutze Capacitor Preferences für sichere Daten
- Implementiere Content Security Policy

## 📱 Native Features

### Platform Detection
```typescript
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
// 'web', 'ios', oder 'android'

if (Capacitor.isNativePlatform()) {
  // Native Features verwenden
}
```

### Network Status
```typescript
import { Network } from '@capacitor/network';

const status = await Network.getStatus();
console.log('Connected:', status.connected);

Network.addListener('networkStatusChange', status => {
  console.log('Network status changed', status);
});
```

## 🆚 Vergleich mit anderen Frameworks

| Feature | Capacitor | Flutter | Expo |
|---------|-----------|---------|------|
| Sprache | JS/TS | Dart | JS/TS |
| Web-Support | ✅ Nativ | ⚠️ Separat | ⚠️ Begrenzt |
| UI | HTML/CSS | Widgets | Components |
| Performance | Gut | Sehr gut | Gut |
| Lernkurve | Flach | Mittel | Flach |
| PWA Support | ✅ Exzellent | ❌ | ❌ |
| Web-Integration | ✅ Perfekt | ❌ | ❌ |

## ✅ Wann Capacitor verwenden?

### Ideal für:
- Teams mit Web-Entwicklung-Erfahrung
- Bestehende Web-Apps mobilisieren
- Progressive Web Apps erstellen
- Projekte mit starkem Web-Fokus
- Ionic UI Components gewünscht

### Weniger ideal für:
- Sehr performance-kritische Apps
- Apps mit vielen komplexen Animationen
- Projekte ohne Web-Komponente
- Wenn native UI-Look wichtig ist

## 📚 Ressourcen

### Offizielle Dokumentation
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Ionic Docs](https://ionicframework.com/docs)
- [Ionic React](https://ionicframework.com/docs/react)

### Community
- [Ionic Forum](https://forum.ionicframework.com)
- [Capacitor GitHub](https://github.com/ionic-team/capacitor)
- [Ionic Discord](https://ionic.link/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

### Lernen
- [Ionic Academy](https://ionic.link/academy)
- [Capacitor Examples](https://capacitorjs.com/docs/examples)
- [Ionic Blog](https://ionic.io/blog)

### Tools
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)
- [Ionic Native](https://ionicframework.com/docs/native)

### Plugins
- [Official Plugins](https://capacitorjs.com/docs/apis)
- [Community Plugins](https://github.com/capacitor-community)

## 🎯 Nächste Schritte

1. **Ionic CLI installieren** - `npm install -g @ionic/cli`
2. **Beispiel-App testen** - Eine der drei Apps im Browser starten
3. **Dokumentation lesen** - Capacitor und Ionic Docs
4. **Native Build erstellen** - Android Studio oder Xcode verwenden

## 📄 Weitere Dokumentationen

- [AutoLogbuch/README.md](AutoLogbuch/README.md)
- [WetterApp/README.md](WetterApp/README.md)
- [PasswortTresor/README.md](PasswortTresor/README.md)

## 💡 Tipps

### Entwicklung
- **Browser-first** - Entwickle primär im Browser
- **Native testen** - Teste regelmäßig auf echten Geräten
- **Hot Reload** - Nutze Vite für schnelle Iteration
- **DevTools** - Chrome DevTools für Debugging

### Deployment
- **Progressive Web App** - Deploye als PWA für Web
- **App Stores** - Native Builds für iOS/Android
- **Updates** - Web-Updates ohne Store-Review
- **Versioning** - Synchronisiere Web und Native Versionen
