import 'package:flutter/material.dart';
import '../models/weather_forecast.dart';
import 'performance_optimized_list_view.dart';

class WeatherForecastWidget extends StatelessWidget {
  final List<WeatherForecast> forecasts;
  final Function(DateTime)? onDaySelected;
  final DateTime? selectedDate;

  const WeatherForecastWidget({
    super.key,
    required this.forecasts,
    this.onDaySelected,
    this.selectedDate,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          child: Row(
            children: [
              Text(
                '7-Tage Vorhersage',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              SizedBox(width: 8),
              Text(
                '(Tippen für Stunden)',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                  fontStyle: FontStyle.italic,
                ),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 200,
          child: PerformanceOptimizedListView(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: forecasts.length,
            height: 200,
            itemBuilder: (context, index) {
              final forecast = forecasts[index];
              final isSelected =
                  selectedDate != null &&
                  _isSameDay(forecast.dateTime, selectedDate!);
              return _buildForecastCard(forecast, isSelected, context);
            },
          ),
        ),
      ],
    );
  }

  bool _isSameDay(DateTime date1, DateTime date2) {
    return date1.year == date2.year &&
        date1.month == date2.month &&
        date1.day == date2.day;
  }

  bool _isToday(DateTime date) {
    final now = DateTime.now();
    return _isSameDay(date, now);
  }

  Widget _buildForecastCard(
    WeatherForecast forecast,
    bool isSelected,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () {
        if (onDaySelected != null) {
          onDaySelected!(forecast.dateTime);
        }
      },
      child: Container(
        width: 120,
        margin: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
        decoration: BoxDecoration(
          color: isSelected ? Colors.blue.shade100 : Colors.blue.shade50,
          borderRadius: BorderRadius.circular(12),
          border: isSelected ? Border.all(color: Colors.blue, width: 2) : null,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(5.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text(
                _isToday(forecast.dateTime) ? 'Heute' : forecast.dayOfWeek,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                  color: isSelected ? Colors.blue.shade800 : Colors.black87,
                ),
              ),
              Image.network(
                forecast.iconUrl,
                width: 40,
                height: 40,
                errorBuilder: (context, error, stackTrace) {
                  return Icon(
                    Icons.wb_sunny,
                    size: 40,
                    color: Colors.orange.shade400,
                  );
                },
              ),
              Column(
                children: [
                  Text(
                    '${forecast.maxTempCelsius}°',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                  Text(
                    '${forecast.minTempCelsius}°',
                    style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
                  ),
                ],
              ),
              Text(
                forecast.description,
                style: TextStyle(fontSize: 10, color: Colors.grey.shade700),
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
