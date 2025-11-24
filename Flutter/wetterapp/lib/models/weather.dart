class Weather {
  final String cityName;
  final double temperature;
  final String description;
  final String icon;
  final double humidity;
  final double windSpeed;
  final double pressure;
  final DateTime timestamp;

  Weather({
    required this.cityName,
    required this.temperature,
    required this.description,
    required this.icon,
    required this.humidity,
    required this.windSpeed,
    required this.pressure,
    required this.timestamp,
  });

  factory Weather.fromJson(Map<String, dynamic> json) {
    return Weather(
      cityName: json['name'].replaceAll('ß', 'ss') ?? '',
      temperature: (json['main']['temp'] as num).toDouble(),
      description:
          json['weather'][0]['description'].replaceAll('ß', 'ss') ?? '',
      icon: json['weather'][0]['icon'] ?? '',
      humidity: (json['main']['humidity'] as num).toDouble(),
      windSpeed: (json['wind']['speed'] as num).toDouble(),
      pressure: (json['main']['pressure'] as num).toDouble(),
      timestamp: DateTime.now(),
    );
  }

  String get iconUrl => 'https://openweathermap.org/img/wn/$icon@2x.png';

  int get temperatureCelsius => temperature.round();
}
