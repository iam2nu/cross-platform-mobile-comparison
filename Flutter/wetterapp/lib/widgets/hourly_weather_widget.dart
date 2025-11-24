import 'package:flutter/material.dart';
import '../models/hourly_weather.dart';

class HourlyWeatherWidget extends StatelessWidget {
  final List<HourlyWeather> hourlyData;
  final String cityName;
  final DateTime selectedDate;

  const HourlyWeatherWidget({
    super.key,
    required this.hourlyData,
    required this.cityName,
    required this.selectedDate,
  });

  @override
  Widget build(BuildContext context) {
    if (hourlyData.isEmpty) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: Text(
              'Keine stündlichen Daten für diesen Tag verfügbar',
              style: TextStyle(color: Colors.grey.shade600),
            ),
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          child: Row(
            children: [
              Icon(Icons.access_time, color: Colors.blue.shade700),
              const SizedBox(width: 8),
              Text(
                'Stündliche Vorhersage - ${_formatDate(selectedDate)}',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 160,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            itemCount: hourlyData.length,
            itemBuilder: (context, index) {
              return _buildHourlyCard(hourlyData[index], index == 0);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildHourlyCard(HourlyWeather hourly, bool isFirst) {
    final now = DateTime.now();
    final isCurrentHour =
        hourly.dateTime.hour == now.hour &&
        hourly.dateTime.day == now.day &&
        hourly.dateTime.month == now.month;

    return Container(
      width: 90,
      margin: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 4.0),
      decoration: BoxDecoration(
        gradient: isCurrentHour
            ? LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.blue.shade400, Colors.blue.shade600],
              )
            : null,
        color: isCurrentHour ? null : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isCurrentHour ? Colors.blue.shade700 : Colors.grey.shade300,
          width: isCurrentHour ? 2 : 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // Zeit
            Text(
              hourly.hourString,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: isCurrentHour ? Colors.white : Colors.black87,
              ),
            ),

            // Wetter Icon
            Image.network(
              hourly.iconUrl,
              width: 35,
              height: 35,
              errorBuilder: (context, error, stackTrace) {
                return Icon(
                  Icons.wb_sunny,
                  size: 35,
                  color: isCurrentHour ? Colors.white : Colors.orange.shade400,
                );
              },
            ),

            // Temperatur
            Text(
              '${hourly.temperatureCelsius}°',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: isCurrentHour ? Colors.white : Colors.black87,
              ),
            ),

            // Regenwahrscheinlichkeit (nur wenn > 0)
            if (hourly.precipitationPercent > 0)
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.water_drop,
                    size: 12,
                    color: isCurrentHour
                        ? Colors.white70
                        : Colors.blue.shade600,
                  ),
                  const SizedBox(width: 2),
                  Text(
                    '${hourly.precipitationPercent}%',
                    style: TextStyle(
                      fontSize: 11,
                      color: isCurrentHour
                          ? Colors.white70
                          : Colors.blue.shade600,
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final tomorrow = today.add(const Duration(days: 1));
    final dateOnly = DateTime(date.year, date.month, date.day);

    if (dateOnly == today) {
      return 'Heute';
    } else if (dateOnly == tomorrow) {
      return 'Morgen';
    } else {
      final weekdays = [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag',
      ];
      return '${weekdays[date.weekday - 1]}, ${date.day}.${date.month}';
    }
  }
}
