import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/credential.dart';
import '../services/secure_storage_service.dart';
import '../services/auto_lock_service.dart';
import 'add_edit_credential_screen.dart';
import 'auth_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with WidgetsBindingObserver {
  final _storageService = SecureStorageService();
  final _autoLockService = AutoLockService();
  List<Credential> _credentials = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initializeAutoLock();
    _loadCredentials();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _autoLockService.dispose();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _autoLockService.resetTimer();
    } else if (state == AppLifecycleState.paused) {
      _autoLockService.resetTimer();
    }
  }

  Future<void> _initializeAutoLock() async {
    final settings = await _storageService.getSettings();
    final timeout = settings['autoLockTimeout'] ?? 5;
    _autoLockService.initialize(timeout, _lockApp);
  }

  void _lockApp() {
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const AuthScreen()),
      (route) => false,
    );
  }

  Future<void> _loadCredentials() async {
    setState(() => _isLoading = true);
    final credentials = await _storageService.getCredentials();
    credentials.sort((a, b) {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return b.createdAt.compareTo(a.createdAt);
    });
    setState(() {
      _credentials = credentials;
      _isLoading = false;
    });
  }

  Future<void> _toggleFavorite(String id) async {
    await _storageService.toggleFavorite(id);
    _loadCredentials();
  }

  Future<void> _deleteCredential(String id) async {
    await _storageService.deleteCredential(id);
    _loadCredentials();
  }

  void _showDeleteDialog(Credential credential) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Eintrag löschen'),
        content: Text('Möchten Sie "${credential.title}" wirklich löschen?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Abbrechen'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _deleteCredential(credential.id);
            },
            child: const Text('Löschen', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showCredentialDetails(Credential credential) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.6,
        minChildSize: 0.4,
        maxChildSize: 0.9,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      credential.title,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: Icon(
                      credential.isFavorite ? Icons.star : Icons.star_border,
                      color: credential.isFavorite ? Colors.amber : null,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                      _toggleFavorite(credential.id);
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.edit),
                    onPressed: () async {
                      Navigator.pop(context);
                      await Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) =>
                              AddEditCredentialScreen(credential: credential),
                        ),
                      );
                      _loadCredentials();
                    },
                  ),
                ],
              ),
              const Divider(height: 32),
              _DetailRow(
                label: 'Benutzername',
                value: credential.username,
                onCopy: () {
                  Clipboard.setData(ClipboardData(text: credential.username));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Benutzername kopiert')),
                  );
                },
              ),
              const SizedBox(height: 16),
              _DetailRow(
                label: 'Passwort',
                value: credential.password,
                isPassword: true,
                onCopy: () {
                  Clipboard.setData(ClipboardData(text: credential.password));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Passwort kopiert')),
                  );
                },
              ),
              if (credential.notes != null && credential.notes!.isNotEmpty) ...[
                const SizedBox(height: 16),
                const Text(
                  'Notizen',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 4),
                Text(credential.notes!),
              ],
              const SizedBox(height: 24),
              Text(
                'Erstellt: ${_formatDate(credential.createdAt)}',
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
              if (credential.modifiedAt != null)
                Text(
                  'Geändert: ${_formatDate(credential.modifiedAt!)}',
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  Future<void> _showExportDialog() async {
    try {
      final exportData = await _storageService.exportCredentials();
      if (!mounted) return;
      
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Daten exportieren'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Exportierte Daten (verschlüsselt):'),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Text(
                    exportData,
                    style: const TextStyle(fontSize: 10, fontFamily: 'monospace'),
                  ),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Schliessen'),
            ),
            ElevatedButton.icon(
              icon: const Icon(Icons.copy),
              label: const Text('Kopieren'),
              onPressed: () {
                Clipboard.setData(ClipboardData(text: exportData));
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Export-Daten kopiert')),
                );
              },
            ),
          ],
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Fehler beim Exportieren')),
      );
    }
  }

  Future<void> _showImportDialog() async {
    final controller = TextEditingController();
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Daten importieren'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(
            labelText: 'Export-Daten einfügen',
            border: OutlineInputBorder(),
          ),
          maxLines: 5,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Abbrechen'),
          ),
          ElevatedButton(
            onPressed: () async {
              final success = await _storageService.importCredentials(controller.text);
              if (!context.mounted) return;
              Navigator.pop(context);
              if (success) {
                _loadCredentials();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Daten erfolgreich importiert')),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Fehler beim Importieren')),
                );
              }
            },
            child: const Text('Importieren'),
          ),
        ],
      ),
    );
  }

  void _showSettingsDialog() async {
    final settings = await _storageService.getSettings();
    int autoLockTimeout = settings['autoLockTimeout'] ?? 5;
    
    if (!mounted) return;
    
    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Einstellungen'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                title: const Text('Auto-Lock Timeout'),
                subtitle: Text('$autoLockTimeout Minuten'),
              ),
              Slider(
                value: autoLockTimeout.toDouble(),
                min: 1,
                max: 30,
                divisions: 29,
                label: '$autoLockTimeout Min',
                onChanged: (value) {
                  setState(() {
                    autoLockTimeout = value.round();
                  });
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Abbrechen'),
            ),
            ElevatedButton(
              onPressed: () async {
                await _storageService.saveSettings({
                  'autoLockTimeout': autoLockTimeout,
                });
                _autoLockService.updateTimeout(autoLockTimeout);
                if (!context.mounted) return;
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Einstellungen gespeichert')),
                );
              },
              child: const Text('Speichern'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Passwort-Tresor'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              showSearch(
                context: context,
                delegate: _CredentialSearchDelegate(_credentials, (credential) {
                  _showCredentialDetails(credential);
                }),
              );
            },
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              switch (value) {
                case 'export':
                  _showExportDialog();
                  break;
                case 'import':
                  _showImportDialog();
                  break;
                case 'settings':
                  _showSettingsDialog();
                  break;
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'export',
                child: Row(
                  children: [
                    Icon(Icons.upload),
                    SizedBox(width: 8),
                    Text('Exportieren'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'import',
                child: Row(
                  children: [
                    Icon(Icons.download),
                    SizedBox(width: 8),
                    Text('Importieren'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'settings',
                child: Row(
                  children: [
                    Icon(Icons.settings),
                    SizedBox(width: 8),
                    Text('Einstellungen'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _credentials.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.lock_open, size: 80, color: Colors.grey),
                  SizedBox(height: 16),
                  Text(
                    'Keine Einträge vorhanden',
                    style: TextStyle(fontSize: 18, color: Colors.grey),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Fügen Sie einen neuen Eintrag hinzu',
                    style: TextStyle(color: Colors.grey),
                  ),
                ],
              ),
            )
          : RefreshIndicator(
              onRefresh: _loadCredentials,
              child: ListView.builder(
                itemCount: _credentials.length,
                itemBuilder: (context, index) {
                  final credential = _credentials[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    child: ListTile(
                      leading: Stack(
                        children: [
                          CircleAvatar(
                            child: Text(credential.title[0].toUpperCase()),
                          ),
                          if (credential.isFavorite)
                            Positioned(
                              right: 0,
                              bottom: 0,
                              child: Container(
                                padding: const EdgeInsets.all(2),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                  size: 12,
                                ),
                              ),
                            ),
                        ],
                      ),
                      title: Text(credential.title),
                      subtitle: Text(credential.username),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _showDeleteDialog(credential),
                      ),
                      onTap: () => _showCredentialDetails(credential),
                    ),
                  );
                },
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const AddEditCredentialScreen()),
          );
          _loadCredentials();
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class _DetailRow extends StatefulWidget {
  final String label;
  final String value;
  final bool isPassword;
  final VoidCallback onCopy;

  const _DetailRow({
    required this.label,
    required this.value,
    this.isPassword = false,
    required this.onCopy,
  });

  @override
  State<_DetailRow> createState() => _DetailRowState();
}

class _DetailRowState extends State<_DetailRow> {
  bool _isVisible = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ),
        const SizedBox(height: 4),
        Row(
          children: [
            Expanded(
              child: Text(
                widget.isPassword && !_isVisible
                    ? '•' * widget.value.length
                    : widget.value,
                style: const TextStyle(fontSize: 16),
              ),
            ),
            if (widget.isPassword)
              IconButton(
                icon: Icon(
                  _isVisible ? Icons.visibility_off : Icons.visibility,
                ),
                onPressed: () => setState(() => _isVisible = !_isVisible),
              ),
            IconButton(icon: const Icon(Icons.copy), onPressed: widget.onCopy),
          ],
        ),
      ],
    );
  }
}

class _CredentialSearchDelegate extends SearchDelegate<Credential?> {
  final List<Credential> credentials;
  final Function(Credential) onSelect;

  _CredentialSearchDelegate(this.credentials, this.onSelect);

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(icon: const Icon(Icons.clear), onPressed: () => query = ''),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed: () => close(context, null),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return buildSuggestions(context);
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final results = credentials
        .where(
          (c) =>
              c.title.toLowerCase().contains(query.toLowerCase()) ||
              c.username.toLowerCase().contains(query.toLowerCase()),
        )
        .toList();

    if (results.isEmpty) {
      return const Center(child: Text('Keine Ergebnisse gefunden'));
    }

    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) {
        final credential = results[index];
        return ListTile(
          leading: CircleAvatar(child: Text(credential.title[0].toUpperCase())),
          title: Text(credential.title),
          subtitle: Text(credential.username),
          onTap: () {
            close(context, credential);
            onSelect(credential);
          },
        );
      },
    );
  }
}
