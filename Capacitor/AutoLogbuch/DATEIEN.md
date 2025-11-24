# 📂 Datei-Übersicht - Auto-Logbuch Capacitor

## 🏗️ Projektstruktur

```
Capacitor/AutoLogbuch/
├── 📄 package.json              # Dependencies & Scripts
├── 📄 capacitor.config.ts       # Capacitor Konfiguration
├── 📄 ionic.config.json         # Ionic Framework Config
├── 📄 vite.config.ts            # Vite Build Config
├── 📄 tsconfig.json             # TypeScript Compiler Config
├── 📄 tsconfig.node.json        # TypeScript Node Config
├── 📄 index.html                # HTML Entry Point
├── 📄 README.md                 # Vollständige Dokumentation
├── 📄 QUICKSTART.md             # Schnellstart-Anleitung
├── 📄 FLUTTER_VS_CAPACITOR.md   # Technischer Vergleich
├── 📄 DATEIEN.md                # Diese Datei
│
├── 📁 src/                      # Source Code
│   ├── 📄 main.tsx              # Vite Entry Point
│   ├── 📄 App.tsx               # Main React Component
│   │
│   ├── 📁 models/               # TypeScript Interfaces
│   │   ├── 📄 Fahrzeug.ts       # Fahrzeug + FahrzeugInput
│   │   ├── 📄 Wartung.ts        # Wartung + WartungInput
│   │   ├── 📄 Fahrt.ts          # Fahrt + FahrtInput + Position
│   │   └── 📄 index.ts          # Barrel Export
│   │
│   ├── 📁 services/             # Business Logic
│   │   ├── 📄 database.service.ts    # Datenbank (Preferences)
│   │   └── 📄 location.service.ts    # GPS-Tracking
│   │
│   ├── 📁 pages/                # Ionic Pages (7 Pages)
│   │   ├── 📄 HomePage.tsx              # Fahrzeugliste
│   │   ├── 📄 AddFahrzeugPage.tsx       # Fahrzeug hinzufügen
│   │   ├── 📄 FahrzeugDetailPage.tsx    # Fahrzeugdetails
│   │   ├── 📄 AddWartungPage.tsx        # Wartung hinzufügen
│   │   ├── 📄 FahrtenListPage.tsx       # Fahrtenliste
│   │   ├── 📄 ActiveFahrtPage.tsx       # Live GPS-Tracking
│   │   └── 📄 FahrtDetailPage.tsx       # Fahrtdetails
│   │
│   └── 📁 theme/                # Ionic Theme
│       └── 📄 variables.css     # CSS Custom Properties
│
├── 📁 node_modules/             # Dependencies (356 packages)
├── 📁 android/                  # Android Native Project (npx cap add android)
└── 📁 ios/                      # iOS Native Project (npx cap add ios)
```

## 📄 Datei-Details

### Konfigurationsdateien

#### `package.json`
**Zweck:** npm Dependencies & Scripts  
**Wichtig für:** Installation, Build, Dev Server

**Key Dependencies:**
- `@capacitor/core@^6.0.0` - Capacitor Core
- `@ionic/react@^8.0.0` - Ionic Components
- `react@^18.2.0` - React Library
- `vite@^5.0.11` - Build Tool
- `date-fns@^3.0.6` - Datum-Formatierung

**Scripts:**
```json
"dev": "vite",                    // Development Server
"build": "tsc && vite build",     // Production Build
"android": "cap run android",     // Android App starten
"ios": "cap run ios",             // iOS App starten
"sync": "cap sync"                // Capacitor Sync
```

#### `capacitor.config.ts`
**Zweck:** Capacitor App-Konfiguration  
**Wichtig für:** Native Builds

```typescript
{
  appId: 'com.autologbuch.app',
  appName: 'Auto-Logbuch',
  webDir: 'dist',
  plugins: {
    Geolocation: { enabled: true },
    Preferences: { enabled: true }
  }
}
```

#### `ionic.config.json`
**Zweck:** Ionic Framework Config  
**Wichtig für:** Ionic CLI

```json
{
  "name": "autologbuch-capacitor",
  "integrations": { "capacitor": {} },
  "type": "react"
}
```

#### `vite.config.ts`
**Zweck:** Vite Build-Konfiguration  
**Wichtig für:** Dev Server, Production Build

```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['sql.js']  // Falls später SQLite genutzt wird
  }
});
```

#### `tsconfig.json`
**Zweck:** TypeScript Compiler-Einstellungen  
**Wichtig für:** Type-Checking, IDE Support

**Key Settings:**
- `target: ES2020` - Modern JavaScript
- `jsx: react-jsx` - React 18 JSX Transform
- `strict: true` - Strenge Type-Checks

### Source Code

#### `src/main.tsx` (Entry Point)
**Zweck:** Vite Entry Point + React Root  
**Imports:**
- Ionic CSS (Core, Normalize, Typography, Utils)
- Theme Variables
- App Component

**Code:**
```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `src/App.tsx` (Main Component)
**Zweck:** React Router + Navigation  
**Funktionen:**
- `setupIonicReact()` - Ionic initialisieren
- `initDatabase()` - Datenbank laden (useEffect)
- `IonReactRouter` - Router Setup
- 7 Routes definiert

**Routes:**
```tsx
/home                        → HomePage
/add-fahrzeug                → AddFahrzeugPage
/fahrzeug/:id                → FahrzeugDetailPage
/fahrzeug/:id/add-wartung    → AddWartungPage
/fahrzeug/:id/fahrten        → FahrtenListPage
/fahrzeug/:id/active-fahrt   → ActiveFahrtPage
/fahrt/:id                   → FahrtDetailPage
```

### Models

#### `src/models/Fahrzeug.ts`
**Interfaces:**
```typescript
interface Fahrzeug {
  id: number;
  marke: string;
  modell: string;
  kennzeichen: string;
  kilometerstand: number;
  createdAt: string;
}

interface FahrzeugInput {
  marke: string;
  modell: string;
  kennzeichen: string;
  kilometerstand: number;
}
```

#### `src/models/Wartung.ts`
**Interfaces:**
```typescript
interface Wartung {
  id: number;
  fahrzeugId: number;
  typ: string;
  beschreibung: string;
  kosten: number;
  datum: string;
  kilometerstand: number;
}

interface WartungInput { /* ... */ }
```

#### `src/models/Fahrt.ts`
**Interfaces:**
```typescript
interface Position {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface Fahrt {
  id: number;
  fahrzeugId: number;
  startZeit: string;
  endZeit: string | null;
  distanzKm: number;
  notizen: string;
  positionen: Position[];
}

interface FahrtInput { /* ... */ }
interface FahrtUpdate { /* ... */ }
```

### Services

#### `src/services/database.service.ts` (319 Zeilen)
**Zweck:** Datenbank-Operationen mit Capacitor Preferences  
**Storage Keys:**
- `autologbuch_fahrzeuge`
- `autologbuch_wartungen`
- `autologbuch_fahrten`
- `autologbuch_next_ids`

**Funktionen:**

**Init:**
- `initDatabase()` - Lädt alle Daten aus Preferences

**Fahrzeuge (6 Funktionen):**
- `insertFahrzeug(input)` - Neues Fahrzeug erstellen
- `getAllFahrzeuge()` - Alle Fahrzeuge laden
- `getFahrzeugById(id)` - Fahrzeug nach ID
- `updateFahrzeugKilometerstand(id, km)` - KM-Stand aktualisieren
- `deleteFahrzeug(id)` - Fahrzeug löschen

**Wartungen (3 Funktionen):**
- `insertWartung(input)` - Neue Wartung
- `getWartungenByFahrzeug(id)` - Wartungen eines Fahrzeugs
- `deleteWartung(id)` - Wartung löschen

**Fahrten (8 Funktionen):**
- `startFahrt(input)` - Neue Fahrt beginnen
- `updateFahrt(id, update)` - Fahrt updaten
- `addPositionToFahrt(id, pos)` - GPS-Punkt hinzufügen
- `endFahrt(id, distanz)` - Fahrt beenden
- `getFahrtById(id)` - Fahrt nach ID
- `getFahrtenByFahrzeug(id)` - Fahrten eines Fahrzeugs
- `deleteFahrt(id)` - Fahrt löschen
- `getActiveFahrtForFahrzeug(id)` - Aktive Fahrt prüfen

#### `src/services/location.service.ts` (96 Zeilen)
**Zweck:** GPS-Tracking mit Capacitor Geolocation  
**Pattern:** Singleton

**Funktionen:**
- `requestPermissions()` - GPS-Berechtigung anfragen
- `getCurrentPosition()` - Einmalige Position
- `watchPosition(callback)` - Live-Tracking starten
- `clearWatch()` - Tracking stoppen
- `calculateDistance(lat1, lon1, lat2, lon2)` - Distanz in km

**Formel:** Haversine (Großkreis-Distanz)

### Pages

#### `src/pages/HomePage.tsx` (76 Zeilen)
**Zweck:** Fahrzeugliste  
**Hooks:**
- `useState<Fahrzeug[]>` - Fahrzeuge
- `useEffect()` - Daten laden
- `useHistory()` - Navigation

**UI:**
- `IonFab` mit `+` Button (oben rechts)
- `IonList` mit Fahrzeug-Items
- Leere Liste: Car-Icon + Text

#### `src/pages/AddFahrzeugPage.tsx` (126 Zeilen)
**Zweck:** Neues Fahrzeug hinzufügen  
**Form Felder:**
- Marke (Text)
- Modell (Text)
- Kennzeichen (Text, uppercase)
- Kilometerstand (Number)

**Validierung:**
- Alle Felder required
- KM muss >= 0 sein

**UI:**
- `IonInput` für Textfelder
- `IonButton` zum Speichern
- `useIonToast` für Feedback

#### `src/pages/FahrzeugDetailPage.tsx` (232 Zeilen)
**Zweck:** Fahrzeugdetails + Wartungen  
**Sections:**
1. **Fahrzeuginfo Card**
   - Kennzeichen
   - Kilometerstand
   - Gesamtkosten (berechnet)

2. **Schnellaktionen Card**
   - Wartung Button
   - Fahrten Button
   - Fahrt starten/fortsetzen Button

3. **Wartungshistorie Card**
   - Liste aller Wartungen
   - Nach Datum sortiert
   - Wartung hinzufügen Button

**Funktionen:**
- `useIonAlert` für Löschen-Bestätigung
- `useIonActionSheet` für Menü

#### `src/pages/AddWartungPage.tsx` (178 Zeilen)
**Zweck:** Neue Wartung erfassen  
**Form Felder:**
- Typ (Select: Ölwechsel, Inspektion, Reparatur, etc.)
- Beschreibung (Textarea)
- Kosten (Number)
- Datum (DateTimePicker)
- Kilometerstand (Number, vorausgefüllt)

**UI:**
- `IonSelect` für Typ
- `IonDatetime` für Datum
- Validierung für Zahlen

#### `src/pages/FahrtenListPage.tsx` (136 Zeilen)
**Zweck:** Fahrtenliste  
**Features:**
- Gesamtstrecke Card (summiert)
- Fahrt starten Button (wenn keine aktive Fahrt)
- Aktive Fahrt fortsetzen Button
- Liste aller Fahrten (neueste zuerst)

**Liste zeigt:**
- Datum
- Uhrzeit
- Distanz
- Notizen (wenn vorhanden)

#### `src/pages/ActiveFahrtPage.tsx` (311 Zeilen)
**Zweck:** Live GPS-Tracking  
**State:**
- `fahrt` - Aktuelle Fahrt
- `currentPosition` - GPS-Position
- `distanzKm` - Gefahrene Distanz
- `dauer` - Fahrtdauer in Sekunden
- `isTracking` - Tracking-Status

**Features:**
1. **Fahrt starten**
   - GPS-Berechtigung prüfen
   - Position abrufen
   - Fahrt in DB anlegen

2. **Live-Tracking**
   - `watchPosition()` mit Callback
   - Distanz-Berechnung (Haversine)
   - Timer für Dauer (setInterval)
   - Positionen in DB speichern

3. **Fahrt beenden**
   - Alert mit Bestätigung
   - Tracking stoppen
   - Kilometerstand aktualisieren
   - Navigation zu FahrtDetailPage

**Cards:**
- Fahrtdaten (Distanz, Dauer, Start)
- Aktuelle Position (Lat/Lng)

#### `src/pages/FahrtDetailPage.tsx` (183 Zeilen)
**Zweck:** Fahrtdetails ansehen/bearbeiten  
**Anzeige:**
- Datum
- Start-/Endzeit
- Distanz
- Dauer (in Std/Min)
- GPS-Punkte (Anzahl)
- Notizen (editierbar)

**Funktionen:**
- Notizen speichern
- Fahrt löschen (mit Alert)

**Berechnung:**
```typescript
const dauer = Math.floor(
  (new Date(endZeit) - new Date(startZeit)) / 1000
);
const hours = Math.floor(dauer / 3600);
const minutes = Math.floor((dauer % 3600) / 60);
```

### Theme

#### `src/theme/variables.css`
**Zweck:** Ionic CSS Custom Properties  
**Farben:**
- `--ion-color-primary` - Blau (#3880ff)
- `--ion-color-secondary` - Cyan (#3dc2ff)
- `--ion-color-success` - Grün (#2dd36f)
- `--ion-color-warning` - Gelb (#ffc409)
- `--ion-color-danger` - Rot (#eb445a)

**Pattern:**
```css
--ion-color-primary: #3880ff;
--ion-color-primary-rgb: 56, 128, 255;
--ion-color-primary-contrast: #ffffff;
--ion-color-primary-shade: #3171e0;
--ion-color-primary-tint: #4c8dff;
```

## 📊 Statistiken

### Code-Zeilen (ohne node_modules)

| Kategorie | Dateien | Zeilen (ca.) |
|-----------|---------|--------------|
| **Config** | 6 | ~150 |
| **Models** | 4 | ~80 |
| **Services** | 2 | ~415 |
| **Pages** | 7 | ~1,242 |
| **Theme** | 1 | ~40 |
| **Main** | 2 | ~50 |
| **Docs** | 4 | ~600 |
| **GESAMT** | 26 | **~2,577** |

### Dependencies

- **Production:** 15 Pakete
- **Development:** 8 Pakete
- **Total (mit Sub-Dependencies):** 356 Pakete

### Plattformen

- ✅ **Web** (Vite Dev Server)
- ✅ **Android** (via `npx cap add android`)
- ✅ **iOS** (via `npx cap add ios`)

## 🎯 Wichtigste Dateien für Entwicklung

| Datei | Änderungshäufigkeit | Zweck |
|-------|---------------------|-------|
| `src/pages/*.tsx` | 🔴 Hoch | UI-Anpassungen |
| `src/services/*.ts` | 🟡 Mittel | Business Logic |
| `src/models/*.ts` | 🟢 Niedrig | Datenstrukturen |
| `src/theme/variables.css` | 🟡 Mittel | Design |
| `capacitor.config.ts` | 🟢 Niedrig | App-Config |
| `package.json` | 🟢 Niedrig | Dependencies |

## 🔍 Datei-Suche Quick Reference

**Neue Page hinzufügen:**
1. Erstelle `src/pages/MeinePage.tsx`
2. Füge Route in `src/App.tsx` hinzu

**Neue Database-Funktion:**
1. Öffne `src/services/database.service.ts`
2. Füge Funktion hinzu (inkl. `saveData()`)

**UI-Anpassungen:**
1. Page-spezifisch: `src/pages/XYZ.tsx`
2. Global: `src/theme/variables.css`

**Models erweitern:**
1. Öffne `src/models/XYZ.ts`
2. Interface erweitern
3. Database Service anpassen

## 📚 Weitere Dokumentation

- **README.md** - Vollständige Projektdokumentation
- **QUICKSTART.md** - Schnellstart-Anleitung
- **FLUTTER_VS_CAPACITOR.md** - Technischer Vergleich

## ✅ Vollständigkeit

**Status:** ✅ Alle Dateien implementiert

- [x] Konfigurationsdateien
- [x] Models (3 + index)
- [x] Services (2)
- [x] Pages (7)
- [x] Theme
- [x] Documentation (4)
- [x] Entry Points (2)

**Keine fehlenden Dateien!**
