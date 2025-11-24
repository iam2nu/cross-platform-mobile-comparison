import 'package:flutter/material.dart';
import '../database/database.dart';
import 'fahrzeug_detail_page.dart';
import 'add_fahrzeug_page.dart';

class HomePage extends StatelessWidget {
  final AppDatabase database;

  const HomePage({super.key, required this.database});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meine Fahrzeuge'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: StreamBuilder<List<FahrzeugeData>>(
        stream: database.fahrzeugDao.watchAllFahrzeuge(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Fehler: ${snapshot.error}'));
          }

          final fahrzeuge = snapshot.data ?? [];

          if (fahrzeuge.isEmpty) {
            return const Center(
              child: Text(
                'Keine Fahrzeuge vorhanden.\nFügen Sie ein Fahrzeug hinzu!',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16),
              ),
            );
          }

          return ListView.builder(
            itemCount: fahrzeuge.length,
            itemBuilder: (context, index) {
              final fahrzeug = fahrzeuge[index];
              return ListTile(
                leading: const Icon(Icons.directions_car),
                title: Text(fahrzeug.name),
                subtitle: fahrzeug.marke != null || fahrzeug.modell != null
                    ? Text('${fahrzeug.marke ?? ''} ${fahrzeug.modell ?? ''}'.trim())
                    : null,
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => FahrzeugDetailPage(
                        database: database,
                        fahrzeugId: fahrzeug.id,
                      ),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddFahrzeugPage(database: database),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
