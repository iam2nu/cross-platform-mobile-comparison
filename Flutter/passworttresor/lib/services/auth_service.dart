import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'package:local_auth/local_auth.dart';
import 'secure_storage_service.dart';

class AuthService {
  final LocalAuthentication _localAuth = LocalAuthentication();
  final SecureStorageService _storage = SecureStorageService();

  Future<bool> isBiometricAvailable() async {
    try {
      final isAvailable = await _localAuth.canCheckBiometrics;
      final isDeviceSupported = await _localAuth.isDeviceSupported();
      return isAvailable && isDeviceSupported;
    } catch (e) {
      return false;
    }
  }

  Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _localAuth.getAvailableBiometrics();
    } catch (e) {
      return [];
    }
  }

  Future<bool> authenticateWithBiometrics() async {
    try {
      final bool didAuthenticate = await _localAuth.authenticate(
        localizedReason:
            'Bitte authentifizieren Sie sich, um auf den Passwort-Tresor zuzugreifen',
      );
      return didAuthenticate;
    } catch (e) {
      return false;
    }
  }

  String hashPassword(String password) {
    final bytes = utf8.encode(password);
    final hash = sha256.convert(bytes);
    return hash.toString();
  }

  Future<bool> setMasterPassword(String password) async {
    try {
      final hash = hashPassword(password);
      await _storage.saveMasterPassword(hash);
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<bool> verifyMasterPassword(String password) async {
    try {
      final hash = hashPassword(password);
      final storedHash = await _storage.getMasterPasswordHash();
      return hash == storedHash;
    } catch (e) {
      return false;
    }
  }

  Future<bool> hasMasterPassword() async {
    return await _storage.hasMasterPassword();
  }

  Future<bool> authenticate() async {
    final biometricAvailable = await isBiometricAvailable();

    if (biometricAvailable) {
      return await authenticateWithBiometrics();
    }

    return false;
  }
}
