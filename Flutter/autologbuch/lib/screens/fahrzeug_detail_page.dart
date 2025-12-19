import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../database/database.dart';
import 'add_wartung_page.dart';
import 'fahrten_list_page.dart';

class FahrzeugDetailPage extends StatelessWidget {
  final AppDatabase database;
  final int fahrzeugId;

  const FahrzeugDetailPage({
    super.key,
    required this.database,
    required this.fahrzeugId,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd.MM.yyyy');
    final currencyFormat = NumberFormat.currency(
      locale: 'de_DE',
      symbol: 'CHF',
    );

    return Scaffold(
      appBar: AppBar(
        title: FutureBuilder<FahrzeugeData?>(
          future: database.fahrzeugDao.getFahrzeugById(fahrzeugId),
          builder: (context, snapshot) {
            if (snapshot.hasData && snapshot.data != null) {
              return Text(snapshot.data!.name);
            }
            return const Text('Fahrzeug Details');
          },
        ),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Column(
        children: [
          // Schnellzugriff-Buttons
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => FahrtenListPage(
                            database: database,
                            fahrzeugId: fahrzeugId,
                          ),
                        ),
                      );
                    },
                    icon: const Icon(Icons.route),
                    label: const Text('Fahrten'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => AddWartungPage(
                            database: database,
                            fahrzeugId: fahrzeugId,
                          ),
                        ),
                      );
                    },
                    icon: const Icon(Icons.build),
                    label: const Text('Wartung'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Gesamtkosten-Anzeige
          StreamBuilder<double?>(
            stream: database.wartungDao.watchTotalKostenForFahrzeug(fahrzeugId),
            builder: (context, snapshot) {
              final totalKosten = snapshot.data ?? 0.0;
              return Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                margin: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    const Text(
                      'Gesamtkosten',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      currencyFormat.format(totalKosten),
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
          const SizedBox(height: 16),
          // Eintragsliste
          Expanded(
            child: StreamBuilder<List<WartungseintraegeData>>(
              stream: database.wartungDao.watchEintraegeForFahrzeug(fahrzeugId),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(child: Text('Fehler: ${snapshot.error}'));
                }

                final eintraege = snapshot.data ?? [];

                if (eintraege.isEmpty) {
                  return const Center(
                    child: Text(
                      'Keine Wartungseinträge vorhanden.\nFügen Sie einen Eintrag hinzu!',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16),
                    ),
                  );
                }

                return ListView.builder(
                  itemCount: eintraege.length,
                  itemBuilder: (context, index) {
                    final eintrag = eintraege[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          child: Icon(
                            Icons.build,
                            color: Theme.of(
                              context,
                            ).colorScheme.onPrimaryContainer,
                          ),
                        ),
                        title: Text(
                          eintrag.beschreibung,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 4),
                            Text('Datum: ${dateFormat.format(eintrag.datum)}'),
                            Text(
                              'Kilometerstand: ${eintrag.kilometerstand.toString()} km',
                            ),
                          ],
                        ),
                        trailing: Text(
                          currencyFormat.format(eintrag.kosten),
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        isThreeLine: true,
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showModalBottomSheet(
            context: context,
            builder: (BuildContext context) {
              return Container(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ListTile(
                      leading: const Icon(Icons.route, color: Colors.blue),
                      title: const Text('Neue Fahrt starten'),
                      subtitle: const Text('GPS-Tracking aktivieren'),
                      onTap: () {
                        Navigator.pop(context);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => FahrtenListPage(
                              database: database,
                              fahrzeugId: fahrzeugId,
                            ),
                          ),
                        );
                      },
                    ),
                    const Divider(),
                    ListTile(
                      leading: const Icon(Icons.build, color: Colors.orange),
                      title: const Text('Neue Wartung hinzufügen'),
                      subtitle: const Text('Kosten und Details erfassen'),
                      onTap: () {
                        Navigator.pop(context);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => AddWartungPage(
                              database: database,
                              fahrzeugId: fahrzeugId,
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              );
            },
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
