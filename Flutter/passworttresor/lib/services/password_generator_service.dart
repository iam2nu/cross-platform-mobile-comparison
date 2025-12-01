import 'dart:math';

class PasswordGeneratorService {
  static const String _lowercase = 'abcdefghijklmnopqrstuvwxyz';
  static const String _uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static const String _numbers = '0123456789';
  static const String _symbols = '!@#\$%^&*()_+-=[]{}|;:,.<>?';

  String generatePassword({
    int length = 16,
    bool includeLowercase = true,
    bool includeUppercase = true,
    bool includeNumbers = true,
    bool includeSymbols = true,
  }) {
    if (length < 4) length = 4;
    if (length > 64) length = 64;

    String chars = '';
    if (includeLowercase) chars += _lowercase;
    if (includeUppercase) chars += _uppercase;
    if (includeNumbers) chars += _numbers;
    if (includeSymbols) chars += _symbols;

    if (chars.isEmpty) chars = _lowercase;

    final random = Random.secure();
    return List.generate(length, (_) => chars[random.nextInt(chars.length)])
        .join();
  }

  PasswordStrength checkPasswordStrength(String password) {
    if (password.isEmpty) {
      return PasswordStrength.veryWeak;
    }

    int score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    
    if (RegExp(r'[a-z]').hasMatch(password)) score++;
    if (RegExp(r'[A-Z]').hasMatch(password)) score++;
    if (RegExp(r'[0-9]').hasMatch(password)) score++;
    if (RegExp(r'[!@#$%^&*(),.?":{}|<>]').hasMatch(password)) score++;

    if (score <= 2) return PasswordStrength.veryWeak;
    if (score <= 4) return PasswordStrength.weak;
    if (score <= 5) return PasswordStrength.medium;
    if (score <= 6) return PasswordStrength.strong;
    return PasswordStrength.veryStrong;
  }
}

enum PasswordStrength {
  veryWeak,
  weak,
  medium,
  strong,
  veryStrong;

  String get label {
    switch (this) {
      case PasswordStrength.veryWeak:
        return 'Sehr schwach';
      case PasswordStrength.weak:
        return 'Schwach';
      case PasswordStrength.medium:
        return 'Mittel';
      case PasswordStrength.strong:
        return 'Stark';
      case PasswordStrength.veryStrong:
        return 'Sehr stark';
    }
  }

  double get value {
    switch (this) {
      case PasswordStrength.veryWeak:
        return 0.2;
      case PasswordStrength.weak:
        return 0.4;
      case PasswordStrength.medium:
        return 0.6;
      case PasswordStrength.strong:
        return 0.8;
      case PasswordStrength.veryStrong:
        return 1.0;
    }
  }

  int get colorValue {
    switch (this) {
      case PasswordStrength.veryWeak:
        return 0xFFD32F2F;
      case PasswordStrength.weak:
        return 0xFFF57C00;
      case PasswordStrength.medium:
        return 0xFFFBC02D;
      case PasswordStrength.strong:
        return 0xFF689F38;
      case PasswordStrength.veryStrong:
        return 0xFF388E3C;
    }
  }
}
