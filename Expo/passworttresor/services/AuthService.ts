import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import SecureStorageService from './SecureStorageService';

class AuthService {
  private storage = new SecureStorageService();

  async isBiometricAvailable(): Promise<boolean> {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return compatible && enrolled;
    } catch (e) {
      return false;
    }
  }

  async getAvailableBiometrics(): Promise<number[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (e) {
      return [];
    }
  }

  async authenticateWithBiometrics(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Bitte authentifizieren Sie sich, um auf den Passwort-Tresor zuzugreifen',
        fallbackLabel: 'Mit Passwort entsperren',
      });
      return result.success;
    } catch (e) {
      return false;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  }

  async setMasterPassword(password: string): Promise<boolean> {
    try {
      const hash = await this.hashPassword(password);
      await this.storage.saveMasterPassword(hash);
      return true;
    } catch (e) {
      return false;
    }
  }

  async verifyMasterPassword(password: string): Promise<boolean> {
    try {
      const hash = await this.hashPassword(password);
      const storedHash = await this.storage.getMasterPasswordHash();
      return hash === storedHash;
    } catch (e) {
      return false;
    }
  }

  async hasMasterPassword(): Promise<boolean> {
    return await this.storage.hasMasterPassword();
  }

  async authenticate(): Promise<boolean> {
    const biometricAvailable = await this.isBiometricAvailable();

    if (biometricAvailable) {
      return await this.authenticateWithBiometrics();
    }

    return false;
  }
}

export default AuthService;
