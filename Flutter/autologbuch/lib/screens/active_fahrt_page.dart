import 'dart:async';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:drift/drift.dart' as drift;
import '../database/database.dart';
import '../services/location_service.dart';

class ActiveFahrtPage extends StatefulWidget {
  final AppDatabase database;
  final int fahrzeugId;

  const ActiveFahrtPage({
    super.key,
    required this.database,
    required this.fahrzeugId,
  });

  @override
  State<ActiveFahrtPage> createState() => _ActiveFahrtPageState();
}

class _ActiveFahrtPageState extends State<ActiveFahrtPage> {
  final LocationService _locationService = LocationService();
  StreamSubscription<Position>? _positionSubscription;

  FahrtenData? _currentFahrt;
  Position? _currentPosition;
  double _currentDistanz = 0.0;
  Duration _dauer = Duration.zero;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _initializeFahrt();
  }

  @override
  void dispose() {
    _positionSubscription?.cancel();
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _initializeFahrt() async {
    // Prüfe ob bereits eine aktive Fahrt existiert
    final activeFahrt = await widget.database.fahrtDao
        .watchActiveFahrt(widget.fahrzeugId)
        .first;

    if (activeFahrt != null) {
      // Fortsetzen einer existierenden Fahrt
      setState(() {
        _currentFahrt = activeFahrt;
        _currentDistanz = activeFahrt.distanzKm;
      });
      _startTimer();
      _startLocationTracking();
    } else {
      // Neue Fahrt starten
      await _startNewFahrt();
    }
  }

  Future<void> _startNewFahrt() async {
    // Prüfe Berechtigung
    bool hasPermission = await _locationService.requestLocationPermission();
    if (!hasPermission) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Standort-Berechtigung erforderlich'),
            backgroundColor: Colors.red,
          ),
        );
        Navigator.pop(context);
      }
      return;
    }

    // Hole aktuelle Position
    Position? position = await _locationService.getCurrentPosition();
    if (position == null) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Standort konnte nicht ermittelt werden'),
            backgroundColor: Colors.red,
          ),
        );
        Navigator.pop(context);
      }
      return;
    }

    // Erstelle neue Fahrt in Datenbank
    final fahrtId = await widget.database.fahrtDao.startFahrt(
      FahrtenCompanion(
        fahrzeugId: drift.Value(widget.fahrzeugId),
        startZeit: drift.Value(DateTime.now()),
        startLatitude: drift.Value(position.latitude),
        startLongitude: drift.Value(position.longitude),
        istAbgeschlossen: const drift.Value(false),
      ),
    );

    final fahrt = await widget.database.fahrtDao.getFahrtById(fahrtId);

    setState(() {
      _currentFahrt = fahrt;
      _currentPosition = position;
    });

    _startTimer();
    _startLocationTracking();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_currentFahrt != null) {
        setState(() {
          _dauer = DateTime.now().difference(_currentFahrt!.startZeit);
        });
      }
    });
  }

  void _startLocationTracking() {
    _positionSubscription = _locationService.getPositionStream().listen(
      (Position position) {
        if (_currentPosition != null) {
          // Berechne Distanz seit letztem Update
          double distanzDelta = _locationService.calculateDistance(
            _currentPosition!.latitude,
            _currentPosition!.longitude,
            position.latitude,
            position.longitude,
          );

          setState(() {
            _currentPosition = position;
            _currentDistanz += distanzDelta;
          });
        } else {
          setState(() {
            _currentPosition = position;
          });
        }
      },
      onError: (error) {
        debugPrint('Location tracking error: $error');
      },
    );
  }

  Future<void> _endFahrt() async {
    if (_currentFahrt == null || _currentPosition == null) return;

    final bool? confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Fahrt beenden?'),
        content: Text(
          'Distanz: ${_currentDistanz.toStringAsFixed(1)} km\n'
          'Dauer: ${_dauer.inHours}h ${_dauer.inMinutes % 60}min',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Abbrechen'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Beenden'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await widget.database.fahrtDao.endFahrt(
        _currentFahrt!.id,
        DateTime.now(),
        _currentPosition!.latitude,
        _currentPosition!.longitude,
        _currentDistanz,
        null, // Adresse könnte hier mit Geocoding hinzugefügt werden
      );

      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final timeFormat = DateFormat('HH:mm:ss');

    return Scaffold(
      appBar: AppBar(
        title: const Text('Aktive Fahrt'),
        backgroundColor: Colors.green.shade700,
      ),
      body: _currentFahrt == null
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Status-Karte
                  Card(
                    color: Colors.green.shade50,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          Icon(
                            Icons.directions_car,
                            size: 64,
                            color: Colors.green.shade700,
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            'Fahrt läuft',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Seit ${timeFormat.format(_currentFahrt!.startZeit)}',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Distanz-Karte
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          const Text(
                            'Distanz',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '${_currentDistanz.toStringAsFixed(2)} km',
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                              color: Colors.blue,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Dauer-Karte
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          const Text(
                            'Dauer',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '${_dauer.inHours}:${(_dauer.inMinutes % 60).toString().padLeft(2, '0')}:${(_dauer.inSeconds % 60).toString().padLeft(2, '0')}',
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                              color: Colors.orange,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // GPS-Status
                  Card(
                    child: ListTile(
                      leading: Icon(
                        _currentPosition != null ? Icons.gps_fixed : Icons.gps_not_fixed,
                        color: _currentPosition != null ? Colors.green : Colors.red,
                      ),
                      title: const Text('GPS-Status'),
                      subtitle: Text(
                        _currentPosition != null
                            ? 'Verbunden (${_currentPosition!.accuracy.toStringAsFixed(0)}m Genauigkeit)'
                            : 'Keine Verbindung',
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Fahrt beenden Button
                  ElevatedButton.icon(
                    onPressed: _endFahrt,
                    icon: const Icon(Icons.stop),
                    label: const Text('Fahrt beenden'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
