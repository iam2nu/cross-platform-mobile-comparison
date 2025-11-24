class HourlyWeather {
  final DateTime dateTime;
  final double temperature;
  final String description;
  final String icon;
  final double humidity;
  final double windSpeed;
  final double pop; // Probability of precipitation

  HourlyWeather({
    required this.dateTime,
    required this.temperature,
    required this.description,
    required this.icon,
    required this.humidity,
    required this.windSpeed,
    required this.pop,
  });

  factory HourlyWeather.fromJson(Map<String, dynamic> json) {
    try {
      final desc = json['weather']?[0]?['description'] ?? '';
      final descString = desc is String ? desc : desc.toString();

      return HourlyWeather(
        dateTime: DateTime.fromMillisecondsSinceEpoch(
          (json['dt'] as int) * 1000,
        ),
        temperature: (json['main']['temp'] as num).toDouble(),
        description: descString.replaceAll('ß', 'ss'),
        icon: json['weather']?[0]?['icon']?.toString() ?? '01d',
        humidity: (json['main']['humidity'] as num).toDouble(),
        windSpeed: (json['wind']?['speed'] ?? 0 as num).toDouble(),
        pop: ((json['pop'] ?? 0) as num).toDouble() * 100,
      );
    } catch (e) {
      print('Error in HourlyWeather.fromJson: $e');
      print('JSON data: $json');
      rethrow;
    }
  }

  String get iconUrl => 'https://openweathermap.org/img/wn/$icon@2x.png';

  int get temperatureCelsius => temperature.round();

  String get hourString {
    return '${dateTime.hour.toString().padLeft(2, '0')}:00';
  }

  int get precipitationPercent => pop.round();
}
