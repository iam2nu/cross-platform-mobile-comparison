export interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

class PasswordGeneratorService {
  private readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  private readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly NUMBERS = '0123456789';
  private readonly SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  generatePassword(options: PasswordOptions): string {
    let chars = '';
    if (options.includeLowercase) chars += this.LOWERCASE;
    if (options.includeUppercase) chars += this.UPPERCASE;
    if (options.includeNumbers) chars += this.NUMBERS;
    if (options.includeSymbols) chars += this.SYMBOLS;

    if (chars.length === 0) {
      chars = this.LOWERCASE + this.NUMBERS;
    }

    let password = '';
    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < options.length; i++) {
      password += chars[array[i] % chars.length];
    }

    return password;
  }

  calculateStrength(password: string): {
    score: number;
    label: string;
    color: string;
  } {
    let score = 0;
    
    if (!password) {
      return { score: 0, label: 'Sehr schwach', color: '#f44336' };
    }

    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Normalize to 0-5 scale
    score = Math.min(score, 5);

    let label = '';
    let color = '';

    switch (score) {
      case 0:
      case 1:
        label = 'Sehr schwach';
        color = '#f44336';
        break;
      case 2:
        label = 'Schwach';
        color = '#FF9800';
        break;
      case 3:
        label = 'Mittel';
        color = '#FFC107';
        break;
      case 4:
        label = 'Stark';
        color = '#8BC34A';
        break;
      case 5:
        label = 'Sehr stark';
        color = '#4CAF50';
        break;
    }

    return { score, label, color };
  }
}

export default new PasswordGeneratorService();
