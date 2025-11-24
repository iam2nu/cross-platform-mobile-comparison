 # Flutter vs. Expo/React Native - WetterApp Vergleich

## Überblick

Dieser Vergleich zeigt die Unterschiede zwischen der Flutter- und Expo/React Native-Implementation der gleichen Wetter-App.

## Architektur-Vergleich

### State Management

| Flutter | Expo/React Native |
|---------|-------------------|
| Provider Package | Zustand |
| ChangeNotifier | create() Store |
| ChangeNotifierProvider | useWeatherStore Hook |
| context.read<Provider>() | useWeatherStore() |

**Flutter Beispiel:**
```dart
class WeatherProvider with ChangeNotifier {
  Weather? _currentWeather;
  
  Future<void> fetchWeatherData(String cityName) async {
    _isLoading = true;
    notifyListeners();
    // ... fetch data
    _isLoading = false;
    notifyListeners();
  }
}
```

**Expo Beispiel:**
```typescript
export const useWeatherStore = create<WeatherState>((set, get) => ({
  currentWeather: null,
  
  fetchWeatherData: async (cityName: string) => {
    set({ isLoading: true });
    // ... fetch data
    set({ isLoading: false });
  }
}));
```

### UI-Komponenten

| Feature | Flutter | React Native |
|---------|---------|--------------|
| Gradient | BoxDecoration | LinearGradient (expo-linear-gradient) |
| Cards | Card Widget | View mit StyleSheet |
| Icons | Icon Widget | @expo/vector-icons |
| Listen | ListView.builder | FlatList |
| Pull-to-Refresh | RefreshIndicator | RefreshControl |
| Scrolling | SingleChildScrollView | ScrollView |

### Dateien-Struktur

**Flutter:**
```
lib/
├── main.dart
├── models/
│   ├── weather.dart
│   ├── weather_forecast.dart
│   └── hourly_weather.dart
├── providers/
│   └── weather_provider.dart
├── screens/
│   └── weather_screen.dart
├── services/
│   └── weather_service.dart
└── widgets/
    ├── current_weather_widget.dart
    ├── weather_forecast_widget.dart
    └── hourly_weather_widget.dart
```

**Expo/React Native:**
```
src/
├── components/
│   ├── CurrentWeatherWidget.tsx
│   ├── WeatherForecastWidget.tsx
│   ├── HourlyWeatherWidget.tsx
│   ├── SearchBar.tsx
│   └── PopularCities.tsx
├── models/
│   ├── Weather.ts
│   ├── WeatherForecast.ts
│   └── HourlyWeather.ts
├── screens/
│   └── WeatherScreen.tsx
├── services/
│   └── weatherService.ts
├── store/
│   └── weatherStore.ts
└── theme/
    └── theme.ts
```

## Code-Vergleich

### 1. API Call

**Flutter:**
```dart
static Future<Weather> getCurrentWeather(String cityName) async {
  final url = Uri.parse(
    '$_baseUrl/weather?q=$cityName&appid=$_apiKey&units=metric&lang=de',
  );
  
  final response = await http.get(url);
  
  if (response.statusCode == 200) {
    final jsonData = json.decode(response.body);
    return Weather.fromJson(jsonData);
  } else {
    throw Exception('Failed to load weather data');
  }
}
```

**Expo/React Native:**
```typescript
static async getCurrentWeather(cityName: string): Promise<Weather> {
  const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=de`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to load weather data: ${response.status}`);
  }
  
  const jsonData: WeatherApiResponse = await response.json();
  return parseWeather(jsonData);
}
```

### 2. Model Definition

**Flutter:**
```dart
class Weather {
  final String cityName;
  final double temperature;
  final String description;
  
  Weather({
    required this.cityName,
    required this.temperature,
    required this.description,
  });
  
  factory Weather.fromJson(Map<String, dynamic> json) {
    return Weather(
      cityName: json['name'],
      temperature: (json['main']['temp'] as num).toDouble(),
      description: json['weather'][0]['description'],
    );
  }
}
```

**Expo/React Native:**
```typescript
export interface Weather {
  cityName: string;
  temperature: number;
  description: string;
}

export interface WeatherApiResponse {
  name: string;
  main: { temp: number };
  weather: Array<{ description: string }>;
}

export const parseWeather = (json: WeatherApiResponse): Weather => {
  return {
    cityName: json.name,
    temperature: json.main.temp,
    description: json.weather[0].description,
  };
};
```

### 3. Liste mit horizontalem Scroll

**Flutter:**
```dart
SizedBox(
  height: 200,
  child: ListView.builder(
    scrollDirection: Axis.horizontal,
    itemCount: forecasts.length,
    itemBuilder: (context, index) {
      return _buildForecastCard(forecasts[index]);
    },
  ),
)
```

**Expo/React Native:**
```typescript
<FlatList
  data={forecasts}
  renderItem={({ item }) => renderForecastCard(item)}
  keyExtractor={(item, index) => `${item.date}-${index}`}
  horizontal
  showsHorizontalScrollIndicator={false}
/>
```

### 4. Gradient Background

**Flutter:**
```dart
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [Colors.blue.shade300, Colors.blue.shade600],
    ),
    borderRadius: BorderRadius.circular(15),
  ),
  child: ...,
)
```

**Expo/React Native:**
```typescript
<LinearGradient
  colors={[theme.colors.blueGradientStart, theme.colors.blueGradientEnd]}
  style={styles.container}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
>
  ...
</LinearGradient>
```

### 5. Pull-to-Refresh

**Flutter:**
```dart
RefreshIndicator(
  onRefresh: () => weatherProvider.refreshWeatherData(),
  child: SingleChildScrollView(
    child: ...,
  ),
)
```

**Expo/React Native:**
```typescript
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={isLoading}
      onRefresh={handleRefresh}
      tintColor={theme.colors.primary}
    />
  }
>
  ...
</ScrollView>
```

## Performance-Vergleich

### Flutter
- **Kompilierung:** AOT (Ahead-of-Time) zu nativem Code
- **Rendering:** Eigene Skia Rendering Engine
- **Hot Reload:** Sehr schnell (< 1s)
- **App-Größe:** ~15-20 MB (Release)
- **Liste Performance:** Lazy Loading mit ListView.builder

### Expo/React Native
- **Kompilierung:** JavaScript Bundle + Metro Bundler
- **Rendering:** Native Components über Bridge
- **Fast Refresh:** Schnell (< 2s)
- **App-Größe:** ~25-30 MB (mit Expo Go größer)
- **Liste Performance:** FlatList mit windowSize Optimierung

## Entwicklererfahrung

### Flutter
✅ Single Codebase für alle Plattformen  
✅ Sehr gute Dokumentation  
✅ Starke Type Safety mit Dart  
✅ Material Design & Cupertino out-of-the-box  
❌ Größere App-Größe  
❌ Kleinere Community als React  

### Expo/React Native
✅ Große React/JavaScript Community  
✅ Viele Third-Party Libraries  
✅ Web-Entwickler können schnell einsteigen  
✅ Expo macht Setup sehr einfach  
❌ Bridge kann Performance-Bottleneck sein  
❌ Native Module manchmal kompliziert  

## Setup-Zeit

| Task | Flutter | Expo/React Native |
|------|---------|-------------------|
| Projekt erstellen | `flutter create` (2-3 Min) | `npx create-expo-app` (1-2 Min) |
| Dependencies | `flutter pub get` | `npm install` |
| Hot Reload | Native | Fast Refresh |
| Erststart | 30-60 Sek | 15-30 Sek (mit Expo Go) |

## Code-Zeilen Vergleich

| Datei | Flutter | React Native |
|-------|---------|--------------|
| Weather Service | ~120 Zeilen | ~130 Zeilen |
| State Management | ~80 Zeilen | ~70 Zeilen |
| Main Screen | ~200 Zeilen | ~190 Zeilen |
| Current Weather Widget | ~120 Zeilen | ~130 Zeilen |

**Fazit:** Ähnlicher Code-Umfang, leicht unterschiedliche Syntax

## Testing

### Flutter
```dart
testWidgets('WeatherScreen displays city name', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  expect(find.text('Dietikon'), findsOneWidget);
});
```

### Expo/React Native
```typescript
import { render } from '@testing-library/react-native';

test('WeatherScreen displays city name', () => {
  const { getByText } = render(<WeatherScreen />);
  expect(getByText('Dietikon')).toBeTruthy();
});
```

## Deployment

### Flutter
```bash
# Android
flutter build apk --release

# iOS
flutter build ipa --release
```

### Expo/React Native
```bash
# Mit EAS Build
eas build --platform android
eas build --platform ios

# Klassisch (nach Eject)
npx react-native run-android --variant=release
```

## Fazit

### Wann Flutter wählen?
- Performance ist kritisch
- Konsistentes UI über alle Plattformen
- Team hat Erfahrung mit OOP
- Projekt braucht Custom UI/Animationen

### Wann Expo/React Native wählen?
- Team hat Web/React Erfahrung
- Schnelles Prototyping
- Großes Ökosystem benötigt
- Web-Version zusätzlich gewünscht

### Gemeinsamkeiten
✅ Cross-Platform Development  
✅ Hot Reload  
✅ Native Performance (größtenteils)  
✅ Große Communities  
✅ Production-Ready  

Beide Frameworks sind ausgezeichnete Wahl für moderne Mobile Apps!
