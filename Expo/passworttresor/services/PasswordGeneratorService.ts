export enum PasswordStrength {
  VeryWeak = 'veryWeak',
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong',
  VeryStrong = 'veryStrong',
}

export interface PasswordStrengthInfo {
  strength: PasswordStrength;
  label: string;
  value: number;
  color: string;
}

class PasswordGeneratorService {
  private static LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  private static UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static NUMBERS = '0123456789';
  private static SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  generatePassword(options: {
    length?: number;
    includeLowercase?: boolean;
    includeUppercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
  } = {}): string {
    let length = options.length || 16;
    if (length < 4) length = 4;
    if (length > 64) length = 64;

    const includeLowercase = options.includeLowercase !== false;
    const includeUppercase = options.includeUppercase !== false;
    const includeNumbers = options.includeNumbers !== false;
    const includeSymbols = options.includeSymbols !== false;

    let chars = '';
    if (includeLowercase) chars += PasswordGeneratorService.LOWERCASE;
    if (includeUppercase) chars += PasswordGeneratorService.UPPERCASE;
    if (includeNumbers) chars += PasswordGeneratorService.NUMBERS;
    if (includeSymbols) chars += PasswordGeneratorService.SYMBOLS;

    if (chars.length === 0) chars = PasswordGeneratorService.LOWERCASE;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    return password;
  }

  checkPasswordStrength(password: string): PasswordStrengthInfo {
    if (!password || password.length === 0) {
      return {
        strength: PasswordStrength.VeryWeak,
        label: 'Sehr schwach',
        value: 0.2,
        color: '#D32F2F',
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 2) {
      return {
        strength: PasswordStrength.VeryWeak,
        label: 'Sehr schwach',
        value: 0.2,
        color: '#D32F2F',
      };
    } else if (score <= 4) {
      return {
        strength: PasswordStrength.Weak,
        label: 'Schwach',
        value: 0.4,
        color: '#F57C00',
      };
    } else if (score <= 5) {
      return {
        strength: PasswordStrength.Medium,
        label: 'Mittel',
        value: 0.6,
        color: '#FBC02D',
      };
    } else if (score <= 6) {
      return {
        strength: PasswordStrength.Strong,
        label: 'Stark',
        value: 0.8,
        color: '#689F38',
      };
    } else {
      return {
        strength: PasswordStrength.VeryStrong,
        label: 'Sehr stark',
        value: 1.0,
        color: '#388E3C',
      };
    }
  }
}

export default PasswordGeneratorService;
