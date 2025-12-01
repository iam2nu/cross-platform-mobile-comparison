import 'package:flutter/material.dart';
import 'services/auth_service.dart';
import 'screens/setup_screen.dart';
import 'screens/auth_screen.dart';

void main() {
  runApp(const PasswordVaultApp());
}

class PasswordVaultApp extends StatelessWidget {
  const PasswordVaultApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Passwort-Tresor',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const InitialScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class InitialScreen extends StatefulWidget {
  const InitialScreen({super.key});

  @override
  State<InitialScreen> createState() => _InitialScreenState();
}

class _InitialScreenState extends State<InitialScreen> {
  final _authService = AuthService();
  bool _isLoading = true;
  bool _hasMasterPassword = false;

  @override
  void initState() {
    super.initState();
    _checkSetup();
  }

  Future<void> _checkSetup() async {
    final hasMasterPassword = await _authService.hasMasterPassword();
    setState(() {
      _hasMasterPassword = hasMasterPassword;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return _hasMasterPassword ? const AuthScreen() : const SetupScreen();
  }
}
