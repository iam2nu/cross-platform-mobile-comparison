import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/weather_provider.dart';
import '../widgets/current_weather_widget.dart';
import '../widgets/weather_forecast_widget.dart';
import '../widgets/hourly_weather_widget.dart';

class WeatherScreen extends StatefulWidget {
  const WeatherScreen({super.key});

  @override
  State<WeatherScreen> createState() => _WeatherScreenState();
}

class _WeatherScreenState extends State<WeatherScreen> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _popularCities = [
    'Dietikon',
    'Zürich',
    'Winterthur',
    'Schlieren',
    'Neuenhof',
    'Baden',
    'Urdorf',
    'Bassersdorf',
  ];

  @override
  void initState() {
    super.initState();
    // Lade initiale Wetterdaten für Dietikon
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final provider = context.read<WeatherProvider>();
      provider.fetchWeatherData('Dietikon').then((_) {
        // Lade automatisch stündliche Daten für heute
        provider.selectDate(DateTime.now());
      });
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Wetter App',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: Colors.blue.shade600,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: Colors.white),
            onPressed: () {
              context.read<WeatherProvider>().refreshWeatherData();
            },
          ),
        ],
      ),
      body: Consumer<WeatherProvider>(
        builder: (context, weatherProvider, child) {
          return RefreshIndicator(
            onRefresh: () => weatherProvider.refreshWeatherData(),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Stadt-Suchfeld
                    _buildSearchSection(),
                    const SizedBox(height: 20),

                    // Error-Anzeige
                    if (weatherProvider.error != null)
                      _buildErrorWidget(weatherProvider.error!),

                    // Loading-Indikator
                    if (weatherProvider.isLoading) _buildLoadingWidget(),

                    // Current Weather
                    if (!weatherProvider.isLoading &&
                        weatherProvider.currentWeather != null)
                      CurrentWeatherWidget(
                        weather: weatherProvider.currentWeather!,
                      ),

                    const SizedBox(height: 20),

                    // 7-Tage Vorhersage
                    if (!weatherProvider.isLoading &&
                        weatherProvider.forecast.isNotEmpty)
                      WeatherForecastWidget(
                        forecasts: weatherProvider.forecast,
                        selectedDate: weatherProvider.selectedDate,
                        onDaySelected: (date) {
                          weatherProvider.selectDate(date);
                        },
                      ),

                    const SizedBox(height: 20),

                    // 3-Stunden-Vorhersage
                    if (weatherProvider.selectedDate != null &&
                        !weatherProvider.isLoadingHourly)
                      HourlyWeatherWidget(
                        hourlyData: weatherProvider.hourlyWeather,
                        cityName: weatherProvider.currentCity,
                        selectedDate: weatherProvider.selectedDate!,
                      ),

                    if (weatherProvider.isLoadingHourly)
                      const Card(
                        child: Padding(
                          padding: EdgeInsets.all(16.0),
                          child: Center(child: CircularProgressIndicator()),
                        ),
                      ),

                    const SizedBox(height: 20),

                    // Beliebte Städte
                    if (!weatherProvider.isLoading)
                      _buildPopularCitiesSection(),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSearchSection() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _searchController,
                decoration: const InputDecoration(
                  hintText: 'Stadt eingeben...',
                  border: InputBorder.none,
                  prefixIcon: Icon(Icons.location_city),
                ),
                onSubmitted: (value) => _searchWeather(value),
              ),
            ),
            ElevatedButton(
              onPressed: () => _searchWeather(_searchController.text),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue.shade600,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Text('Suchen'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildErrorWidget(String error) {
    return Card(
      color: Colors.red.shade50,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Icon(Icons.error, color: Colors.red.shade600),
            const SizedBox(width: 12),
            Expanded(
              child: Text(error, style: TextStyle(color: Colors.red.shade800)),
            ),
            IconButton(
              icon: const Icon(Icons.close),
              onPressed: () {
                context.read<WeatherProvider>().clearError();
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLoadingWidget() {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(32.0),
        child: Center(
          child: Column(
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('Wetterdaten werden geladen...'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPopularCitiesSection() {
    return SizedBox(
      width: double.infinity,
      child: Card(
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Beliebte Städte',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _popularCities.map((city) {
                  return ActionChip(
                    label: Text(city),
                    onPressed: () => _searchWeather(city),
                    backgroundColor: Colors.blue.shade50,
                    side: BorderSide(color: Colors.blue.shade200),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _searchWeather(String cityName) {
    if (cityName.trim().isNotEmpty) {
      context.read<WeatherProvider>().fetchWeatherData(cityName.trim());
      _searchController.clear();
      FocusScope.of(context).unfocus();
    }
  }
}
