import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/weather.dart';
import '../models/weather_forecast.dart';
import '../models/hourly_weather.dart';

class WeatherService {
  static String get _apiKey => dotenv.env['API_KEY'] ?? '';
  static const String _baseUrl = 'https://api.openweathermap.org/data/2.5';

  static Future<Weather> getCurrentWeather(String cityName) async {
    try {
      final url = Uri.parse(
        '$_baseUrl/weather?q=$cityName&appid=$_apiKey&units=metric&lang=de',
      );

      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        return Weather.fromJson(jsonData);
      } else {
        throw Exception('Failed to load weather data: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching weather data: $e');
    }
  }

  static Future<List<WeatherForecast>> getWeatherForecast(
    String cityName,
  ) async {
    try {
      final url = Uri.parse(
        '$_baseUrl/forecast?q=$cityName&appid=$_apiKey&units=metric&lang=de',
      );

      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        final List<dynamic> forecastList = jsonData['list'];

        // Gruppiere die Vorhersagen nach Tagen und nimm nur eine pro Tag
        Map<String, WeatherForecast> dailyForecasts = {};

        for (var item in forecastList) {
          final forecast = WeatherForecast.fromJson(item);
          final dateKey = forecast.dateTime.toIso8601String().substring(0, 10);

          // Nimm nur die Mittags-Vorhersage (12:00) oder die erste des Tages
          if (!dailyForecasts.containsKey(dateKey) ||
              forecast.dateTime.hour == 12) {
            dailyForecasts[dateKey] = forecast;
          }
        }

        // Sortiere nach Datum und nimm maximal 7 Tage
        final sortedForecasts = dailyForecasts.values.toList()
          ..sort((a, b) => a.dateTime.compareTo(b.dateTime));

        return sortedForecasts.take(7).toList();
      } else {
        throw Exception('Failed to load forecast data: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching forecast data: $e');
    }
  }

  static Future<List<HourlyWeather>> getHourlyWeather(
    String cityName,
    DateTime date,
  ) async {
    try {
      final url = Uri.parse(
        '$_baseUrl/forecast?q=$cityName&appid=$_apiKey&units=metric&lang=de',
      );

      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        final List<dynamic> forecastList = jsonData['list'];

        // Filtere nur die Stunden für den ausgewählten Tag
        final targetDate = DateTime(date.year, date.month, date.day);
        final List<HourlyWeather> hourlyForecasts = [];

        for (var item in forecastList) {
          try {
            final hourly = HourlyWeather.fromJson(item);
            final itemDate = DateTime(
              hourly.dateTime.year,
              hourly.dateTime.month,
              hourly.dateTime.day,
            );

            // Prüfe ob es der gleiche Tag ist
            if (itemDate.year == targetDate.year &&
                itemDate.month == targetDate.month &&
                itemDate.day == targetDate.day) {
              hourlyForecasts.add(hourly);
            }
          } catch (e) {
            print('Error parsing hourly item: $e');
            // Überspringe dieses Item und mache mit dem nächsten weiter
            continue;
          }
        }

        // Sortiere nach Zeit
        hourlyForecasts.sort((a, b) => a.dateTime.compareTo(b.dateTime));

        return hourlyForecasts;
      } else {
        throw Exception(
          'Failed to load hourly weather: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('getHourlyWeather error: $e');
      throw Exception('Error fetching hourly weather: $e');
    }
  }
}
