import 'package:flutter/foundation.dart';
import '../models/weather.dart';
import '../models/weather_forecast.dart';
import '../models/hourly_weather.dart';
import '../services/weather_service.dart';

class WeatherProvider with ChangeNotifier {
  Weather? _currentWeather;
  List<WeatherForecast> _forecast = [];
  List<HourlyWeather> _hourlyWeather = [];
  bool _isLoading = false;
  bool _isLoadingHourly = false;
  String? _error;
  String _currentCity = 'Dietikon';
  DateTime? _selectedDate;

  Weather? get currentWeather => _currentWeather;
  List<WeatherForecast> get forecast => _forecast;
  List<HourlyWeather> get hourlyWeather => _hourlyWeather;
  bool get isLoading => _isLoading;
  bool get isLoadingHourly => _isLoadingHourly;
  String? get error => _error;
  String get currentCity => _currentCity;
  DateTime? get selectedDate => _selectedDate;

  Future<void> fetchWeatherData(String cityName) async {
    _isLoading = true;
    _error = null;
    _currentCity = cityName;
    notifyListeners();

    try {
      // Führe beide API-Calls parallel aus für bessere Performance
      final futures = await Future.wait([
        WeatherService.getCurrentWeather(cityName),
        WeatherService.getWeatherForecast(cityName),
      ]);

      _currentWeather = futures[0] as Weather;
      _forecast = futures[1] as List<WeatherForecast>;
    } catch (e) {
      _error = 'Fehler beim Laden der Wetterdaten: $e';
      _currentWeather = null;
      _forecast = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> refreshWeatherData() async {
    await fetchWeatherData(_currentCity);
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  Future<void> fetchHourlyWeather(DateTime date) async {
    _isLoadingHourly = true;
    _selectedDate = date;
    _error = null; // Clear previous errors
    notifyListeners();

    try {
      final hourlyData = await WeatherService.getHourlyWeather(
        _currentCity,
        date,
      );

      if (hourlyData.isEmpty) {
        // Keine Daten verfügbar, aber kein Fehler
        _hourlyWeather = [];
        // Optional: Setze eine Info-Nachricht statt Fehler
        // _error = 'Keine stündlichen Daten für diesen Tag verfügbar';
      } else {
        _hourlyWeather = hourlyData;
      }
    } catch (e) {
      print('Error loading hourly weather: $e'); // Debug
      _error = 'Fehler beim Laden der stündlichen Wetterdaten: ${e.toString()}';
      _hourlyWeather = [];
    } finally {
      _isLoadingHourly = false;
      notifyListeners();
    }
  }

  void selectDate(DateTime date) {
    fetchHourlyWeather(date);
  }
}
