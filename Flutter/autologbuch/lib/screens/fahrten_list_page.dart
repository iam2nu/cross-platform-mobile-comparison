import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../database/database.dart';
import 'active_fahrt_page.dart';
import 'fahrt_detail_page.dart';

class FahrtenListPage extends StatelessWidget {
  final AppDatabase database;
  final int fahrzeugId;

  const FahrtenListPage({
    super.key,
    required this.database,
    required this.fahrzeugId,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd.MM.yyyy HH:mm');

    return Scaffold(
      appBar: AppBar(
        title: const Text('Fahrten-Logbuch'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Column(
        children: [
          // Gesamtdistanz-Anzeige
          StreamBuilder<double?>(
            stream: database.fahrtDao.watchTotalDistanzForFahrzeug(fahrzeugId),
            builder: (context, snapshot) {
              final totalDistanz = snapshot.data ?? 0.0;
              return Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                margin: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.secondaryContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    const Text(
                      'Gesamtdistanz',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${totalDistanz.toStringAsFixed(1)} km',
                      style: const TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
          // Aktive Fahrt Warnung
          StreamBuilder<FahrtenData?>(
            stream: database.fahrtDao.watchActiveFahrt(fahrzeugId),
            builder: (context, snapshot) {
              if (snapshot.hasData && snapshot.data != null) {
                return Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16),
                  child: Card(
                    color: Colors.orange.shade100,
                    child: ListTile(
                      leading: const Icon(Icons.directions_car, color: Colors.orange),
                      title: const Text(
                        'Aktive Fahrt läuft',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        'Gestartet: ${dateFormat.format(snapshot.data!.startZeit)}',
                      ),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ActiveFahrtPage(
                              database: database,
                              fahrzeugId: fahrzeugId,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                );
              }
              return const SizedBox.shrink();
            },
          ),
          const SizedBox(height: 8),
          // Fahrten-Liste
          Expanded(
            child: StreamBuilder<List<FahrtenData>>(
              stream: database.fahrtDao.watchFahrtenForFahrzeug(fahrzeugId),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(child: Text('Fehler: ${snapshot.error}'));
                }

                final fahrten = snapshot.data ?? [];
                final abgeschlosseneFahrten = fahrten.where((f) => f.istAbgeschlossen).toList();

                if (abgeschlosseneFahrten.isEmpty) {
                  return const Center(
                    child: Text(
                      'Keine abgeschlossenen Fahrten.\nStarten Sie eine neue Fahrt!',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16),
                    ),
                  );
                }

                return ListView.builder(
                  itemCount: abgeschlosseneFahrten.length,
                  itemBuilder: (context, index) {
                    final fahrt = abgeschlosseneFahrten[index];
                    final dauer = fahrt.endZeit != null
                        ? fahrt.endZeit!.difference(fahrt.startZeit)
                        : Duration.zero;
                    final stunden = dauer.inHours;
                    final minuten = dauer.inMinutes % 60;

                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                          child: Icon(
                            Icons.route,
                            color: Theme.of(context).colorScheme.onPrimaryContainer,
                          ),
                        ),
                        title: Text(
                          dateFormat.format(fahrt.startZeit),
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 4),
                            Text('Distanz: ${fahrt.distanzKm.toStringAsFixed(1)} km'),
                            if (stunden > 0 || minuten > 0)
                              Text('Dauer: ${stunden}h ${minuten}min'),
                            if (fahrt.startAdresse != null)
                              Text(
                                'Von: ${fahrt.startAdresse}',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                          ],
                        ),
                        trailing: const Icon(Icons.chevron_right),
                        isThreeLine: true,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => FahrtDetailPage(
                                database: database,
                                fahrtId: fahrt.id,
                              ),
                            ),
                          );
                        },
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: StreamBuilder<FahrtenData?>(
        stream: database.fahrtDao.watchActiveFahrt(fahrzeugId),
        builder: (context, snapshot) {
          final hasActiveFahrt = snapshot.hasData && snapshot.data != null;
          return FloatingActionButton.extended(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ActiveFahrtPage(
                    database: database,
                    fahrzeugId: fahrzeugId,
                  ),
                ),
              );
            },
            icon: Icon(hasActiveFahrt ? Icons.stop : Icons.play_arrow),
            label: Text(hasActiveFahrt ? 'Fahrt beenden' : 'Fahrt starten'),
            backgroundColor: hasActiveFahrt ? Colors.red : null,
          );
        },
      ),
    );
  }
}
