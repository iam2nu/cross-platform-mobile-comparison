import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/password_generator_service.dart';

class PasswordGeneratorDialog extends StatefulWidget {
  const PasswordGeneratorDialog({super.key});

  @override
  State<PasswordGeneratorDialog> createState() => _PasswordGeneratorDialogState();
}

class _PasswordGeneratorDialogState extends State<PasswordGeneratorDialog> {
  final _generator = PasswordGeneratorService();
  String _generatedPassword = '';
  int _length = 16;
  bool _includeLowercase = true;
  bool _includeUppercase = true;
  bool _includeNumbers = true;
  bool _includeSymbols = true;

  @override
  void initState() {
    super.initState();
    _generatePassword();
  }

  void _generatePassword() {
    setState(() {
      _generatedPassword = _generator.generatePassword(
        length: _length,
        includeLowercase: _includeLowercase,
        includeUppercase: _includeUppercase,
        includeNumbers: _includeNumbers,
        includeSymbols: _includeSymbols,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final strength = _generator.checkPasswordStrength(_generatedPassword);

    return Dialog(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            const Text(
              'Passwort generieren',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      _generatedPassword,
                      style: const TextStyle(
                        fontSize: 16,
                        fontFamily: 'monospace',
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.copy),
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: _generatedPassword));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Passwort kopiert')),
                      );
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.refresh),
                    onPressed: _generatePassword,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: LinearProgressIndicator(
                    value: strength.value,
                    backgroundColor: Colors.grey[300],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      Color(strength.colorValue),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  strength.label,
                  style: TextStyle(
                    color: Color(strength.colorValue),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            Text('Länge: $_length'),
            Slider(
              value: _length.toDouble(),
              min: 4,
              max: 64,
              divisions: 60,
              label: _length.toString(),
              onChanged: (value) {
                setState(() {
                  _length = value.round();
                });
                _generatePassword();
              },
            ),
            CheckboxListTile(
              title: const Text('Kleinbuchstaben (a-z)'),
              value: _includeLowercase,
              onChanged: (value) {
                setState(() {
                  _includeLowercase = value ?? true;
                });
                _generatePassword();
              },
            ),
            CheckboxListTile(
              title: const Text('Großbuchstaben (A-Z)'),
              value: _includeUppercase,
              onChanged: (value) {
                setState(() {
                  _includeUppercase = value ?? true;
                });
                _generatePassword();
              },
            ),
            CheckboxListTile(
              title: const Text('Zahlen (0-9)'),
              value: _includeNumbers,
              onChanged: (value) {
                setState(() {
                  _includeNumbers = value ?? true;
                });
                _generatePassword();
              },
            ),
            CheckboxListTile(
              title: const Text('Symbole (!@#\$...)'),
              value: _includeSymbols,
              onChanged: (value) {
                setState(() {
                  _includeSymbols = value ?? true;
                });
                _generatePassword();
              },
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Abbrechen'),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () => Navigator.pop(context, _generatedPassword),
                  child: const Text('Verwenden'),
                ),
              ],
            ),
          ],
        ),
      ),
      ),
    );
  }
}
