import 'package:flutter/material.dart';
import 'package:drift/drift.dart' as drift;
import '../database/database.dart';

class AddFahrzeugPage extends StatefulWidget {
  final AppDatabase database;

  const AddFahrzeugPage({super.key, required this.database});

  @override
  State<AddFahrzeugPage> createState() => _AddFahrzeugPageState();
}

class _AddFahrzeugPageState extends State<AddFahrzeugPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _markeController = TextEditingController();
  final _modellController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _markeController.dispose();
    _modellController.dispose();
    super.dispose();
  }

  Future<void> _saveFahrzeug() async {
    if (_formKey.currentState!.validate()) {
      final companion = FahrzeugeCompanion(
        name: drift.Value(_nameController.text.trim()),
        marke: _markeController.text.trim().isEmpty
            ? const drift.Value.absent()
            : drift.Value(_markeController.text.trim()),
        modell: _modellController.text.trim().isEmpty
            ? const drift.Value.absent()
            : drift.Value(_modellController.text.trim()),
      );

      await widget.database.fahrzeugDao.insertFahrzeug(companion);

      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fahrzeug hinzufügen'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Name *',
                  hintText: 'z.B. Mein Golf',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Bitte geben Sie einen Namen ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _markeController,
                decoration: const InputDecoration(
                  labelText: 'Marke (optional)',
                  hintText: 'z.B. VW',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _modellController,
                decoration: const InputDecoration(
                  labelText: 'Modell (optional)',
                  hintText: 'z.B. Golf VII',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _saveFahrzeug,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'Speichern',
                  style: TextStyle(fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
