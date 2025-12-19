# Expo - React Native Framework

## Übersicht

Expo ist ein Framework und eine Plattform für universelle React Native Anwendungen. Es vereinfacht die Entwicklung, das Deployment und die Iteration von iOS-, Android- und Web-Apps aus einer einzigen JavaScript/TypeScript-Codebasis.

## 🎯 Implementierte Apps

### 1. AutoLogbuch
Fahrzeugverwaltungs-App mit GPS-Tracking, Wartungshistorie und SQLite-Datenbank.

**Siehe:** [autologbuch/README.md](autologbuch/README.md)

### 2. WetterApp
Wetter-App mit aktuellen Daten, 7-Tage und stündlicher Vorhersage von OpenWeatherMap API.

**Siehe:** [wetterapp/README.md](wetterapp/README.md)

### 3. PasswortTresor
Sicherer Passwort-Manager mit biometrischer Authentifizierung und verschlüsselter Speicherung.

**Siehe:** [passworttresor/README.md](passworttresor/README.md)

## 🚀 Vorteile von Expo

### Developer Experience
- **Expo Go** für sofortiges Testen auf echten Geräten
- **Hot Reload** für schnelle Entwicklungszyklen
- **Over-the-Air Updates** ohne App Store Submission
- **Expo CLI** mit einfachen Befehlen

### Ecosystem
- **Umfangreiche Expo SDK** mit nativen APIs
- **Zugriff auf NPM** mit tausenden Packages
- **EAS Build** für Cloud-Builds
- **EAS Update** für OTA-Updates

### Community
- **Größte React Native Community**
- **Viele Tutorials und Ressourcen**
- **Aktive Entwicklung** durch Expo-Team
- **React-Kenntnisse übertragbar**

### Plattform-Support
- ✅ Android
- ✅ iOS
- ✅ Web

## 🛠️ Technologie-Stack

### Sprachen
- **TypeScript** - Type-safe JavaScript
- **JavaScript** - Alternative zu TypeScript

### UI Framework
- **React Native** - Cross-platform UI
- **React Native Paper** - Material Design (optional)
- **NativeBase** - Component Library (optional)

### State Management
- **React Hooks** (useState, useEffect)
- **Context API** für globalen State
- **Zustand** - Leichtgewichtiges State Management
- **Redux** - Enterprise State Management (optional)

### Wichtige Expo Modules
- **expo-secure-store** - Sichere Datenspeicherung
- **expo-local-authentication** - Biometrische Auth
- **expo-location** - GPS-Funktionalität
- **expo-sqlite** - SQLite Datenbank
- **expo-crypto** - Kryptographie

### Navigation
- **React Navigation** - Routing Library
- **Expo Router** - File-based Routing (Alternative)

## 💻 Systemvoraussetzungen

### Minimum
- **Betriebssystem**: Windows 10/11, macOS 10.15+, oder Linux (Ubuntu 18.04+)
- **RAM**: 8 GB
- **Speicherplatz**: 10 GB frei
- **Node.js**: 18.x oder höher
- **npm**: 9.x oder höher

### Empfohlen
- **RAM**: 16 GB oder mehr
- **Speicherplatz**: 20 GB+ frei
- **Node.js**: Latest LTS (20.x)
- **SSD**: Für bessere Build-Performance

### Für Testing

#### Expo Go App (Einfachste Methode)
- **Android**: Expo Go aus [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: Expo Go aus [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Wichtig**: PC und Smartphone müssen im **gleichen WLAN** sein!

#### Development Builds (Für native Features)
- Erforderlich für: Biometrische Auth, Push Notifications, etc.
- **Android Studio**: Für Android-Builds
- **Xcode**: Für iOS-Builds (nur macOS)

### Plattform-spezifische Tools

#### Für Android-Entwicklung (Optional)
- **Android Studio**: Latest stable version
- **Android SDK**: API Level 21 (Android 5.0) oder höher
- **JDK**: Version 17 oder höher
- Nur nötig für: Development Builds, native Modules

#### Für iOS-Entwicklung (nur macOS, Optional)
- **Xcode**: 14.0 oder höher
- **CocoaPods**: Für Dependencies
- **macOS**: 12.0 (Monterey) oder höher
- Nur nötig für: Development Builds, native Modules

#### Für Web-Entwicklung
- **Chrome/Firefox/Edge**: Latest version
- **react-dom**: Für Web-Support
- **react-native-web**: Für Web-Support

### Installation

#### 1. Node.js installieren

**Windows:**
```bash
# Download von https://nodejs.org
# Installer ausführen (LTS Version empfohlen)
# Nach Installation verifizieren:
node --version  # Sollte v18.x oder höher sein
npm --version   # Sollte v9.x oder höher sein
```

**macOS:**
```bash
# Mit Homebrew (empfohlen):
brew install node

# Oder Download von https://nodejs.org
# Verifizieren:
node --version
npm --version
```

**Linux:**
```bash
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifizieren:
node --version
npm --version
```

#### 2. Expo CLI installieren (Optional, aber empfohlen)

```bash
npm install -g expo-cli

# Verifizieren:
expo --version
```

**Alternativ (ohne globale Installation):**
```bash
# npx verwenden:
npx expo --version
```

#### 3. Expo Go App installieren

Auf deinem Smartphone:
- **Android**: [Google Play Store → "Expo Go"](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store → "Expo Go"](https://apps.apple.com/app/expo-go/id982107779)

#### 4. EAS CLI installieren (Für Production Builds, Optional)

```bash
npm install -g eas-cli

# Login (Expo Account benötigt):
eas login
```

#### 5. Android Studio einrichten (Optional)

Nur wenn du Development Builds oder native Module brauchst:

1. Download: https://developer.android.com/studio
2. Android SDK installieren (API Level 34 empfohlen)
3. Environment Variables setzen:

**Windows:**
```bash
ANDROID_HOME=C:\Users\[USERNAME]\AppData\Local\Android\Sdk
```

**macOS/Linux:**
```bash
# In ~/.bash_profile oder ~/.zshrc:
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

4. Emulator erstellen (optional)

#### 6. Xcode einrichten (nur macOS, Optional)

Nur für iOS Development Builds:

```bash
# Xcode installieren (über App Store)
xcode-select --install

# CocoaPods installieren:
sudo gem install cocoapods
pod --version
```

#### 7. Editor einrichten

**VS Code (empfohlen):**
```bash
# Extensions installieren:
# - React Native Tools
# - ES7+ React/Redux/React-Native snippets
# - TypeScript
# - ESLint
```

### Quick Start ohne Installation

Für schnelles Testen ohne lokale Installation:

1. **Snack**: https://snack.expo.dev
   - Online-Editor im Browser
   - Direkt auf Smartphone testen mit Expo Go
   - Keine Installation nötig

### Troubleshooting Installation

#### Node.js Version zu alt
```bash
# Aktuelle Version prüfen:
node --version

# Wenn < 18.x, Node.js aktualisieren:
# Windows/macOS: Neuen Installer von nodejs.org
# Linux: nvm verwenden
```

#### npm Berechtigungsfehler (Linux/macOS)
```bash
# npm Prefix ändern:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

#### Port bereits in Verwendung
```bash
# Standardport (8081) wird benutzt?
# Anderen Port verwenden:
npx expo start --port 8082
```

## 📦 Installation & Setup

### Voraussetzungen

1. **Node.js** installieren (v18+):
   ```bash
   node --version
   ```

2. **Expo Go App** auf Smartphone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

3. **Optional:** Expo CLI global:
   ```bash
   npm install -g expo-cli
   ```

### Expo-Projekt starten

```bash
# In App-Verzeichnis wechseln
cd Expo/[app-name]

# Dependencies installieren
npm install

# Development Server starten
npm start
# oder
npx expo start
```

### Verfügbare Befehle

```bash
# Development
npm start                      # Metro Bundler starten
npx expo start --clear        # Mit Cache-Clear
npx expo start --tunnel       # Über Tunnel (kein lokales Netzwerk nötig)

# Plattformen
npm run android               # Android App/Emulator
npm run ios                   # iOS App/Simulator (nur macOS)
npm run web                   # Web Browser

# Build
eas build --platform android  # Android Build
eas build --platform ios      # iOS Build
eas build --platform all      # Beide Plattformen

# Update
eas update                    # OTA Update publishen
```

## 📊 Code-Struktur

Typische Expo-App-Struktur:

```
app/
├── app/                      # Expo Router Screens (optional)
├── src/
│   ├── components/           # React Components
│   ├── screens/              # Screen Components
│   ├── navigation/           # Navigation Setup
│   ├── services/             # API Services
│   ├── models/               # TypeScript Interfaces
│   ├── store/                # State Management
│   └── utils/                # Hilfsfunktionen
├── assets/                   # Bilder, Fonts
├── App.tsx                   # Entry Point
├── app.json                  # Expo Config
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript Config
```

## 🎨 UI-Entwicklung

### Component-Beispiel

```typescript
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
```

### State Management mit Hooks

```typescript
import { useState, useEffect } from 'react';

function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
```

## 🔧 Best Practices

### Code-Organisation
- Trenne Komponenten von Business Logic
- Verwende TypeScript für Type-Safety
- Erstelle wiederverwendbare Custom Hooks
- Nutze Barrel-Exports (`index.ts`)

### Performance
- Verwende `React.memo` für teure Components
- Implementiere `useMemo` und `useCallback`
- Nutze `FlatList` statt `ScrollView` für lange Listen
- Vermeide inline Functions in Render

### Sicherheit
- Verwende `expo-secure-store` für sensible Daten
- Validiere alle Benutzereingaben
- Verwende HTTPS für API-Calls
- Speichere keine Secrets im Code

## 📱 Native Module

### Expo Secure Store
```typescript
import * as SecureStore from 'expo-secure-store';

// Speichern
await SecureStore.setItemAsync('key', 'value');

// Laden
const value = await SecureStore.getItemAsync('key');
```

### Expo Location
```typescript
import * as Location from 'expo-location';

// Permission anfordern
const { status } = await Location.requestForegroundPermissionsAsync();

// Position abrufen
const location = await Location.getCurrentPositionAsync({});
```

## 🆚 Vergleich mit anderen Frameworks

| Feature | Expo | Flutter | Capacitor |
|---------|------|---------|-----------|
| Sprache | JS/TS | Dart | JS/TS |
| Web-Support | ⚠️ Begrenzt | ⚠️ Separat | ✅ Nativ |
| UI | Components | Widgets | HTML/CSS |
| Performance | Gut | Sehr gut | Gut |
| Lernkurve | Flach | Mittel | Flach |
| Community | Sehr groß | Groß | Mittel |
| PWA Support | ❌ | ❌ | ✅ Exzellent |
| OTA Updates | ✅ | ❌ | ✅ |
| Web-Kenntnisse | ✅ | ❌ | ✅ |

## ✅ Wann Expo verwenden?

### Ideal für:
- Teams mit React/Web-Erfahrung
- Schnelle Prototypen und MVPs
- Apps mit OTA-Update-Anforderung
- Projekte mit häufigen Updates
- Zugang zu NPM-Ecosystem gewünscht

### Weniger ideal für:
- Apps mit vielen Custom Native Modules
- Sehr performance-kritische Apps (Gaming)
- Apps mit komplexen Animationen
- Wenn minimale App-Größe kritisch ist

## 📚 Ressourcen

### Offizielle Dokumentation
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Packages](https://docs.expo.dev/versions/latest/)

### Community
- [Expo Discord](https://chat.expo.dev)
- [Expo Forums](https://forums.expo.dev)
- [GitHub](https://github.com/expo/expo)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Lernen
- [Expo Learn](https://docs.expo.dev/tutorial/introduction/)
- [React Native Express](https://www.reactnative.express)
- [Expo Examples](https://docs.expo.dev/examples/)

### Tools
- [Expo Snack](https://snack.expo.dev) - Online IDE
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)

## 🎯 Nächste Schritte

1. **Expo Go installieren** - App auf Smartphone laden
2. **Beispiel-App testen** - Eine der drei Apps starten
3. **Dokumentation lesen** - Expo und React Native Docs
4. **Eigenes Projekt starten** - `npx create-expo-app my-app`

## 📄 Weitere Dokumentationen

- [autologbuch/README.md](autologbuch/README.md)
- [wetterapp/README.md](wetterapp/README.md)
- [passworttresor/README.md](passworttresor/README.md)

## 💡 Tipps

### Entwicklung
- **Expo Go** - Nutze Expo Go für schnelles Testen
- **Hot Reload** - Fast Refresh beschleunigt Entwicklung
- **Tunnel Mode** - Verwende bei Netzwerkproblemen
- **DevTools** - React DevTools für Component-Debugging

### Deployment
- **EAS Build** - Cloud-Builds für iOS ohne Mac
- **OTA Updates** - Schnelle Fixes ohne App Store Review
- **Expo Snack** - Teile Code-Snippets online
- **App Stores** - Nutze EAS Submit für Deployment
