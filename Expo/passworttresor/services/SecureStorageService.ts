import * as SecureStore from 'expo-secure-store';
import { Credential } from '../models/Credential';

class SecureStorageService {
  private static CREDENTIALS_KEY = 'credentials_list';
  private static MASTER_PASSWORD_KEY = 'master_password_hash';
  private static SETTINGS_KEY = 'app_settings';

  async saveMasterPassword(passwordHash: string): Promise<void> {
    await SecureStore.setItemAsync(SecureStorageService.MASTER_PASSWORD_KEY, passwordHash);
  }

  async getMasterPasswordHash(): Promise<string | null> {
    return await SecureStore.getItemAsync(SecureStorageService.MASTER_PASSWORD_KEY);
  }

  async hasMasterPassword(): Promise<boolean> {
    const hash = await this.getMasterPasswordHash();
    return hash !== null && hash.length > 0;
  }

  async getCredentials(): Promise<Credential[]> {
    try {
      const jsonString = await SecureStore.getItemAsync(SecureStorageService.CREDENTIALS_KEY);
      if (!jsonString) return [];

      const jsonList = JSON.parse(jsonString);
      return jsonList as Credential[];
    } catch (e) {
      return [];
    }
  }

  async saveCredentials(credentials: Credential[]): Promise<void> {
    const jsonString = JSON.stringify(credentials);
    await SecureStore.setItemAsync(SecureStorageService.CREDENTIALS_KEY, jsonString);
  }

  async addCredential(credential: Credential): Promise<void> {
    const credentials = await this.getCredentials();
    credentials.push(credential);
    await this.saveCredentials(credentials);
  }

  async updateCredential(credential: Credential): Promise<void> {
    const credentials = await this.getCredentials();
    const index = credentials.findIndex((c) => c.id === credential.id);
    if (index !== -1) {
      credentials[index] = credential;
      await this.saveCredentials(credentials);
    }
  }

  async deleteCredential(id: string): Promise<void> {
    const credentials = await this.getCredentials();
    const filtered = credentials.filter((c) => c.id !== id);
    await this.saveCredentials(filtered);
  }

  async clearAll(): Promise<void> {
    await SecureStore.deleteItemAsync(SecureStorageService.CREDENTIALS_KEY);
    await SecureStore.deleteItemAsync(SecureStorageService.MASTER_PASSWORD_KEY);
    await SecureStore.deleteItemAsync(SecureStorageService.SETTINGS_KEY);
  }

  async toggleFavorite(id: string): Promise<void> {
    const credentials = await this.getCredentials();
    const index = credentials.findIndex((c) => c.id === id);
    if (index !== -1) {
      credentials[index] = {
        ...credentials[index],
        isFavorite: !credentials[index].isFavorite,
      };
      await this.saveCredentials(credentials);
    }
  }

  async getSettings(): Promise<{ autoLockTimeout: number }> {
    try {
      const jsonString = await SecureStore.getItemAsync(SecureStorageService.SETTINGS_KEY);
      if (!jsonString) {
        return { autoLockTimeout: 5 };
      }
      return JSON.parse(jsonString);
    } catch (e) {
      return { autoLockTimeout: 5 };
    }
  }

  async saveSettings(settings: { autoLockTimeout: number }): Promise<void> {
    const jsonString = JSON.stringify(settings);
    await SecureStore.setItemAsync(SecureStorageService.SETTINGS_KEY, jsonString);
  }

  async exportCredentials(): Promise<string> {
    const credentials = await this.getCredentials();
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      credentials: credentials,
    };
    return JSON.stringify(exportData);
  }

  async importCredentials(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      const credentials = data.credentials as Credential[];
      await this.saveCredentials(credentials);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default SecureStorageService;
