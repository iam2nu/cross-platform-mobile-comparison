import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:drift/drift.dart' as drift;
import '../database/database.dart';

class FahrtDetailPage extends StatefulWidget {
  final AppDatabase database;
  final int fahrtId;

  const FahrtDetailPage({
    super.key,
    required this.database,
    required this.fahrtId,
  });

  @override
  State<FahrtDetailPage> createState() => _FahrtDetailPageState();
}

class _FahrtDetailPageState extends State<FahrtDetailPage> {
  final _notizenController = TextEditingController();
  FahrtenData? _fahrt;

  @override
  void initState() {
    super.initState();
    _loadFahrt();
  }

  @override
  void dispose() {
    _notizenController.dispose();
    super.dispose();
  }

  Future<void> _loadFahrt() async {
    final fahrt = await widget.database.fahrtDao.getFahrtById(widget.fahrtId);
    if (fahrt != null) {
      setState(() {
        _fahrt = fahrt;
        _notizenController.text = fahrt.notizen ?? '';
      });
    }
  }

  Future<void> _saveNotizen() async {
    if (_fahrt == null) return;

    await widget.database.fahrtDao.updateFahrt(
      widget.fahrtId,
      FahrtenCompanion(
        notizen: drift.Value(_notizenController.text),
      ),
    );

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Notizen gespeichert')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_fahrt == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Fahrt Details')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final dateFormat = DateFormat('dd.MM.yyyy HH:mm');
    final dauer = _fahrt!.endZeit != null
        ? _fahrt!.endZeit!.difference(_fahrt!.startZeit)
        : Duration.zero;
    final stunden = dauer.inHours;
    final minuten = dauer.inMinutes % 60;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Fahrt Details'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Distanz-Karte
            Card(
              color: Theme.of(context).colorScheme.primaryContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Icon(
                      Icons.route,
                      size: 48,
                      color: Theme.of(context).colorScheme.onPrimaryContainer,
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Distanz',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${_fahrt!.distanzKm.toStringAsFixed(2)} km',
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            // Zeit-Informationen
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Zeit',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(),
                    _buildInfoRow(
                      Icons.play_arrow,
                      'Start',
                      dateFormat.format(_fahrt!.startZeit),
                    ),
                    if (_fahrt!.endZeit != null) ...[
                      const SizedBox(height: 8),
                      _buildInfoRow(
                        Icons.stop,
                        'Ende',
                        dateFormat.format(_fahrt!.endZeit!),
                      ),
                      const SizedBox(height: 8),
                      _buildInfoRow(
                        Icons.timer,
                        'Dauer',
                        '${stunden}h ${minuten}min',
                      ),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            // GPS-Koordinaten
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'GPS-Koordinaten',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(),
                    _buildInfoRow(
                      Icons.location_on,
                      'Start',
                      '${_fahrt!.startLatitude.toStringAsFixed(6)}, ${_fahrt!.startLongitude.toStringAsFixed(6)}',
                    ),
                    if (_fahrt!.endLatitude != null && _fahrt!.endLongitude != null) ...[
                      const SizedBox(height: 8),
                      _buildInfoRow(
                        Icons.location_on,
                        'Ende',
                        '${_fahrt!.endLatitude!.toStringAsFixed(6)}, ${_fahrt!.endLongitude!.toStringAsFixed(6)}',
                      ),
                    ],
                  ],
                ),
              ),
            ),
            if (_fahrt!.startAdresse != null || _fahrt!.endAdresse != null) ...[
              const SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Adressen',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Divider(),
                      if (_fahrt!.startAdresse != null)
                        _buildInfoRow(
                          Icons.place,
                          'Von',
                          _fahrt!.startAdresse!,
                        ),
                      if (_fahrt!.endAdresse != null) ...[
                        const SizedBox(height: 8),
                        _buildInfoRow(
                          Icons.place,
                          'Nach',
                          _fahrt!.endAdresse!,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
            const SizedBox(height: 16),
            // Notizen
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Notizen',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Divider(),
                    TextField(
                      controller: _notizenController,
                      decoration: const InputDecoration(
                        hintText: 'Notizen zur Fahrt...',
                        border: OutlineInputBorder(),
                      ),
                      maxLines: 4,
                    ),
                    const SizedBox(height: 8),
                    Align(
                      alignment: Alignment.centerRight,
                      child: ElevatedButton.icon(
                        onPressed: _saveNotizen,
                        icon: const Icon(Icons.save),
                        label: const Text('Speichern'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Row(
      children: [
        Icon(icon, size: 20, color: Colors.grey.shade600),
        const SizedBox(width: 8),
        Text(
          '$label: ',
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
        Expanded(
          child: Text(
            value,
            style: TextStyle(color: Colors.grey.shade700),
          ),
        ),
      ],
    );
  }
}
