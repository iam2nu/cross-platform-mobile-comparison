import 'package:flutter/material.dart';
import '../models/weather.dart';

class CurrentWeatherWidget extends StatelessWidget {
  final Weather weather;

  const CurrentWeatherWidget({super.key, required this.weather});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.blue.shade300, Colors.blue.shade600],
        ),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            weather.cityName,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.network(
                weather.iconUrl,
                width: 80,
                height: 80,
                errorBuilder: (context, error, stackTrace) {
                  return const Icon(
                    Icons.wb_sunny,
                    size: 80,
                    color: Colors.white,
                  );
                },
              ),
              const SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${weather.temperatureCelsius}°C',
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    weather.description,
                    style: const TextStyle(fontSize: 16, color: Colors.white),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildWeatherInfo(
                icon: Icons.water_drop,
                label: 'Luftfeuchtigkeit',
                value: '${weather.humidity.round()}%',
              ),
              _buildWeatherInfo(
                icon: Icons.air,
                label: 'Wind',
                value: '${weather.windSpeed.toStringAsFixed(1)} m/s',
              ),
              _buildWeatherInfo(
                icon: Icons.speed,
                label: 'Druck',
                value: '${weather.pressure.round()} hPa',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildWeatherInfo({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Column(
      children: [
        Icon(icon, color: Colors.white, size: 24),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(fontSize: 12, color: Colors.white70),
        ),
        Text(
          value,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
