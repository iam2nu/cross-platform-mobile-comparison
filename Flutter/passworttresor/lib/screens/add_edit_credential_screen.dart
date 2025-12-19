import 'package:flutter/material.dart';
import '../models/credential.dart';
import '../services/secure_storage_service.dart';
import '../services/password_generator_service.dart';
import '../widgets/password_generator_dialog.dart';

class AddEditCredentialScreen extends StatefulWidget {
  final Credential? credential;

  const AddEditCredentialScreen({super.key, this.credential});

  @override
  State<AddEditCredentialScreen> createState() =>
      _AddEditCredentialScreenState();
}

class _AddEditCredentialScreenState extends State<AddEditCredentialScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _urlController = TextEditingController();
  final _notesController = TextEditingController();
  final _storageService = SecureStorageService();
  final _passwordGenerator = PasswordGeneratorService();
  bool _obscurePassword = true;
  bool _isLoading = false;
  PasswordStrength _passwordStrength = PasswordStrength.veryWeak;

  @override
  void initState() {
    super.initState();
    if (widget.credential != null) {
      _titleController.text = widget.credential!.title;
      _usernameController.text = widget.credential!.username;
      _passwordController.text = widget.credential!.password;
      _urlController.text = widget.credential!.url ?? '';
      _notesController.text = widget.credential!.notes ?? '';
      _passwordStrength = _passwordGenerator.checkPasswordStrength(widget.credential!.password);
    }
    _passwordController.addListener(_updatePasswordStrength);
  }

  @override
  void dispose() {
    _titleController.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
    _urlController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  void _updatePasswordStrength() {
    setState(() {
      _passwordStrength = _passwordGenerator.checkPasswordStrength(_passwordController.text);
    });
  }

  Future<void> _showPasswordGenerator() async {
    final password = await showDialog<String>(
      context: context,
      builder: (context) => const PasswordGeneratorDialog(),
    );
    if (password != null) {
      setState(() {
        _passwordController.text = password;
      });
    }
  }

  void _showPasswordHistory() {
    if (widget.credential == null || widget.credential!.passwordHistory.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Keine Passwort-Historie vorhanden')),
      );
      return;
    }

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Passwort-Historie'),
        content: SizedBox(
          width: double.maxFinite,
          child: ListView.builder(
            shrinkWrap: true,
            itemCount: widget.credential!.passwordHistory.length,
            itemBuilder: (context, index) {
              final password = widget.credential!.passwordHistory[index];
              return ListTile(
                title: Text(
                  password,
                  style: const TextStyle(fontFamily: 'monospace'),
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.restore),
                  onPressed: () {
                    setState(() {
                      _passwordController.text = password;
                    });
                    Navigator.pop(context);
                  },
                ),
              );
            },
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Schliessen'),
          ),
        ],
      ),
    );
  }

  Future<void> _saveCredential() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    List<String> updatedPasswordHistory = List.from(widget.credential?.passwordHistory ?? []);
    
    if (widget.credential != null && widget.credential!.password != _passwordController.text) {
      updatedPasswordHistory.insert(0, widget.credential!.password);
      if (updatedPasswordHistory.length > 5) {
        updatedPasswordHistory = updatedPasswordHistory.take(5).toList();
      }
    }

    final credential = Credential(
      id: widget.credential?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      title: _titleController.text,
      username: _usernameController.text,
      password: _passwordController.text,
      createdAt: widget.credential?.createdAt ?? DateTime.now(),
      modifiedAt: widget.credential != null ? DateTime.now() : null,
      url: _urlController.text.isEmpty ? null : _urlController.text,
      notes: _notesController.text.isEmpty ? null : _notesController.text,
      isFavorite: widget.credential?.isFavorite ?? false,
      passwordHistory: updatedPasswordHistory,
    );

    try {
      if (widget.credential == null) {
        await _storageService.addCredential(credential);
      } else {
        await _storageService.updateCredential(credential);
      }

      if (!mounted) return;
      Navigator.pop(context);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Fehler beim Speichern')),
      );
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEdit = widget.credential != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(isEdit ? 'Eintrag bearbeiten' : 'Neuer Eintrag'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: 'Titel',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.title),
                  hintText: 'z.B. Gmail, Facebook, Bank',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Bitte geben Sie einen Titel ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _usernameController,
                decoration: const InputDecoration(
                  labelText: 'Benutzername',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                  hintText: 'E-Mail oder Benutzername',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Bitte geben Sie einen Benutzernamen ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _passwordController,
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  labelText: 'Passwort',
                  border: const OutlineInputBorder(),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.auto_awesome),
                        tooltip: 'Passwort generieren',
                        onPressed: _showPasswordGenerator,
                      ),
                      IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility
                              : Icons.visibility_off,
                        ),
                        onPressed: () =>
                            setState(() => _obscurePassword = !_obscurePassword),
                      ),
                    ],
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Bitte geben Sie ein Passwort ein';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: LinearProgressIndicator(
                      value: _passwordStrength.value,
                      backgroundColor: Colors.grey[300],
                      valueColor: AlwaysStoppedAnimation<Color>(
                        Color(_passwordStrength.colorValue),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    _passwordStrength.label,
                    style: TextStyle(
                      color: Color(_passwordStrength.colorValue),
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              if (widget.credential != null && widget.credential!.passwordHistory.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 8.0),
                  child: TextButton.icon(
                    icon: const Icon(Icons.history),
                    label: const Text('Passwort-Historie anzeigen'),
                    onPressed: _showPasswordHistory,
                  ),
                ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _urlController,
                decoration: const InputDecoration(
                  labelText: 'URL (optional)',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.link),
                  hintText: 'https://...',
                ),
                keyboardType: TextInputType.url,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _notesController,
                decoration: const InputDecoration(
                  labelText: 'Notizen (optional)',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.note),
                  hintText: 'Zusätzliche Informationen',
                ),
                maxLines: 3,
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isLoading ? null : _saveCredential,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator()
                    : Text(
                        isEdit ? 'Änderungen speichern' : 'Eintrag hinzufügen',
                        style: const TextStyle(fontSize: 16),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
