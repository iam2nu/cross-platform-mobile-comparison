import 'package:flutter/material.dart';
import 'package:intl/intl.dart' as intl;
import 'package:drift/drift.dart' as drift;
import '../database/database.dart';

class AddWartungPage extends StatefulWidget {
  final AppDatabase database;
  final int fahrzeugId;

  const AddWartungPage({
    super.key,
    required this.database,
    required this.fahrzeugId,
  });

  @override
  State<AddWartungPage> createState() => _AddWartungPageState();
}

class _AddWartungPageState extends State<AddWartungPage> {
  final _formKey = GlobalKey<FormState>();
  final _datumController = TextEditingController();
  final _kilometerstandController = TextEditingController();
  final _kostenController = TextEditingController();
  final _beschreibungController = TextEditingController();

  DateTime? _selectedDate;
  final _dateFormat = intl.DateFormat('dd.MM.yyyy');

  @override
  void dispose() {
    _datumController.dispose();
    _kilometerstandController.dispose();
    _kostenController.dispose();
    _beschreibungController.dispose();
    super.dispose();
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
      locale: const Locale('de', 'DE'),
    );

    if (picked != null) {
      setState(() {
        _selectedDate = picked;
        _datumController.text = _dateFormat.format(picked);
      });
    }
  }

  Future<void> _saveWartung() async {
    if (_formKey.currentState!.validate()) {
      if (_selectedDate == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Bitte wählen Sie ein Datum aus')),
        );
        return;
      }

      final kilometerstand = int.tryParse(_kilometerstandController.text);
      final kosten = double.tryParse(_kostenController.text.replaceAll(',', '.'));

      if (kilometerstand == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Ungültiger Kilometerstand')),
        );
        return;
      }

      if (kosten == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Ungültige Kosten')),
        );
        return;
      }

      final companion = WartungseintraegeCompanion(
        fahrzeugId: drift.Value(widget.fahrzeugId),
        datum: drift.Value(_selectedDate!),
        kilometerstand: drift.Value(kilometerstand),
        kosten: drift.Value(kosten),
        beschreibung: drift.Value(_beschreibungController.text.trim()),
      );

      await widget.database.wartungDao.insertEintrag(companion);

      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wartung hinzufügen'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Datum
              TextFormField(
                controller: _datumController,
                decoration: const InputDecoration(
                  labelText: 'Datum *',
                  hintText: 'Datum auswählen',
                  border: OutlineInputBorder(),
                  suffixIcon: Icon(Icons.calendar_today),
                ),
                readOnly: true,
                onTap: _selectDate,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Bitte wählen Sie ein Datum aus';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              // Kilometerstand
              TextFormField(
                controller: _kilometerstandController,
                decoration: const InputDecoration(
                  labelText: 'Kilometerstand *',
                  hintText: 'z.B. 50000',
                  border: OutlineInputBorder(),
                  suffixText: 'km',
                ),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Bitte geben Sie den Kilometerstand ein';
                  }
                  if (int.tryParse(value) == null) {
                    return 'Bitte geben Sie eine gültige Zahl ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              // Kosten
              TextFormField(
                controller: _kostenController,
                decoration: const InputDecoration(
                  labelText: 'Kosten *',
                  hintText: 'z.B. 123.45',
                  border: OutlineInputBorder(),
                  suffixText: 'CHF',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Bitte geben Sie die Kosten ein';
                  }
                  final normalizedValue = value.replaceAll(',', '.');
                  if (double.tryParse(normalizedValue) == null) {
                    return 'Bitte geben Sie eine gültige Zahl ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              // Beschreibung
              TextFormField(
                controller: _beschreibungController,
                decoration: const InputDecoration(
                  labelText: 'Beschreibung *',
                  hintText: 'z.B. Ölwechsel',
                  border: OutlineInputBorder(),
                  alignLabelWithHint: true,
                ),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Bitte geben Sie eine Beschreibung ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _saveWartung,
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
