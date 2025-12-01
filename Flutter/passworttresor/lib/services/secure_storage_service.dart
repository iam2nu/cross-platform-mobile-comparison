import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/credential.dart';

class SecureStorageService {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  static const _credentialsKey = 'credentials_list';
  static const _masterPasswordKey = 'master_password_hash';
  static const _settingsKey = 'app_settings';

  Future<void> saveMasterPassword(String passwordHash) async {
    await _storage.write(key: _masterPasswordKey, value: passwordHash);
  }

  Future<String?> getMasterPasswordHash() async {
    return await _storage.read(key: _masterPasswordKey);
  }

  Future<bool> hasMasterPassword() async {
    final hash = await getMasterPasswordHash();
    return hash != null && hash.isNotEmpty;
  }

  Future<List<Credential>> getCredentials() async {
    try {
      final jsonString = await _storage.read(key: _credentialsKey);
      if (jsonString == null) return [];

      final List<dynamic> jsonList = json.decode(jsonString);
      return jsonList.map((json) => Credential.fromJson(json)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<void> saveCredentials(List<Credential> credentials) async {
    final jsonString = json.encode(credentials.map((c) => c.toJson()).toList());
    await _storage.write(key: _credentialsKey, value: jsonString);
  }

  Future<void> addCredential(Credential credential) async {
    final credentials = await getCredentials();
    credentials.add(credential);
    await saveCredentials(credentials);
  }

  Future<void> updateCredential(Credential credential) async {
    final credentials = await getCredentials();
    final index = credentials.indexWhere((c) => c.id == credential.id);
    if (index != -1) {
      credentials[index] = credential;
      await saveCredentials(credentials);
    }
  }

  Future<void> deleteCredential(String id) async {
    final credentials = await getCredentials();
    credentials.removeWhere((c) => c.id == id);
    await saveCredentials(credentials);
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }

  Future<void> toggleFavorite(String id) async {
    final credentials = await getCredentials();
    final index = credentials.indexWhere((c) => c.id == id);
    if (index != -1) {
      credentials[index] = credentials[index].copyWith(
        isFavorite: !credentials[index].isFavorite,
      );
      await saveCredentials(credentials);
    }
  }

  Future<Map<String, dynamic>> getSettings() async {
    try {
      final jsonString = await _storage.read(key: _settingsKey);
      if (jsonString == null) {
        return {'autoLockTimeout': 5};
      }
      return json.decode(jsonString);
    } catch (e) {
      return {'autoLockTimeout': 5};
    }
  }

  Future<void> saveSettings(Map<String, dynamic> settings) async {
    final jsonString = json.encode(settings);
    await _storage.write(key: _settingsKey, value: jsonString);
  }

  Future<String> exportCredentials() async {
    final credentials = await getCredentials();
    final export = {
      'version': '1.0',
      'exportDate': DateTime.now().toIso8601String(),
      'credentials': credentials.map((c) => c.toJson()).toList(),
    };
    return json.encode(export);
  }

  Future<bool> importCredentials(String jsonString) async {
    try {
      final data = json.decode(jsonString);
      final List<dynamic> credentialsList = data['credentials'];
      final credentials = credentialsList.map((json) => Credential.fromJson(json)).toList();
      await saveCredentials(credentials);
      return true;
    } catch (e) {
      return false;
    }
  }
}
