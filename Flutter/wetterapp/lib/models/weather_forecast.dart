class WeatherForecast {
  final String date;
  final double maxTemp;
  final double minTemp;
  final String description;
  final String icon;
  final double humidity;
  final DateTime dateTime;

  WeatherForecast({
    required this.date,
    required this.maxTemp,
    required this.minTemp,
    required this.description,
    required this.icon,
    required this.humidity,
    required this.dateTime,
  });

  factory WeatherForecast.fromJson(Map<String, dynamic> json) {
    return WeatherForecast(
      date: json['dt_txt'] ?? '',
      maxTemp: (json['main']['temp_max'] as num).toDouble(),
      minTemp: (json['main']['temp_min'] as num).toDouble(),
      description:
          json['weather'][0]['description'].replaceAll('ß', 'ss') ?? '',
      icon: json['weather'][0]['icon'] ?? '',
      humidity: (json['main']['humidity'] as num).toDouble(),
      dateTime: DateTime.fromMillisecondsSinceEpoch((json['dt'] as int) * 1000),
    );
  }

  String get iconUrl => 'https://openweathermap.org/img/wn/$icon@2x.png';

  int get maxTempCelsius => maxTemp.round();
  int get minTempCelsius => minTemp.round();

  String get dayOfWeek {
    List<String> weekdays = [
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
      'Sonntag',
    ];
    return weekdays[dateTime.weekday - 1];
  }
}
