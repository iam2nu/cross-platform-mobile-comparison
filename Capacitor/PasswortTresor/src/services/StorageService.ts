import { Preferences } from '@capacitor/preferences';
import { Credential } from '../models/Credential';
import { Settings, defaultSettings } from '../models/Settings';

const KEYS = {
  MASTER_PASSWORD: 'master_password_hash',
  CREDENTIALS: 'credentials',
  SETTINGS: 'settings'
};

class StorageService {
  // Master Password
  async saveMasterPasswordHash(hash: string): Promise<void> {
    await Preferences.set({ key: KEYS.MASTER_PASSWORD, value: hash });
  }

  async getMasterPasswordHash(): Promise<string | null> {
    const { value } = await Preferences.get({ key: KEYS.MASTER_PASSWORD });
    return value;
  }

  async hasMasterPassword(): Promise<boolean> {
    const hash = await this.getMasterPasswordHash();
    return hash !== null;
  }

  // Credentials
  async getCredentials(): Promise<Credential[]> {
    const { value } = await Preferences.get({ key: KEYS.CREDENTIALS });
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }

  async saveCredentials(credentials: Credential[]): Promise<void> {
    await Preferences.set({
      key: KEYS.CREDENTIALS,
      value: JSON.stringify(credentials)
    });
  }

  async addCredential(credential: Credential): Promise<void> {
    const credentials = await this.getCredentials();
    credentials.push(credential);
    await this.saveCredentials(credentials);
  }

  async updateCredential(updatedCredential: Credential): Promise<void> {
    const credentials = await this.getCredentials();
    const index = credentials.findIndex(c => c.id === updatedCredential.id);
    if (index !== -1) {
      credentials[index] = {
        ...updatedCredential,
        modifiedAt: new Date().toISOString()
      };
      await this.saveCredentials(credentials);
    }
  }

  async deleteCredential(id: string): Promise<void> {
    const credentials = await this.getCredentials();
    const filtered = credentials.filter(c => c.id !== id);
    await this.saveCredentials(filtered);
  }

  async toggleFavorite(id: string): Promise<void> {
    const credentials = await this.getCredentials();
    const credential = credentials.find(c => c.id === id);
    if (credential) {
      credential.isFavorite = !credential.isFavorite;
      await this.saveCredentials(credentials);
    }
  }

  // Settings
  async getSettings(): Promise<Settings> {
    const { value } = await Preferences.get({ key: KEYS.SETTINGS });
    if (!value) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(value) };
    } catch {
      return defaultSettings;
    }
  }

  async saveSettings(settings: Settings): Promise<void> {
    await Preferences.set({
      key: KEYS.SETTINGS,
      value: JSON.stringify(settings)
    });
  }

  // Export/Import
  async exportData(): Promise<string> {
    const credentials = await this.getCredentials();
    const settings = await this.getSettings();
    return JSON.stringify({ credentials, settings }, null, 2);
  }

  async importData(data: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(data);
      if (parsed.credentials) {
        await this.saveCredentials(parsed.credentials);
      }
      if (parsed.settings) {
        await this.saveSettings(parsed.settings);
      }
      return true;
    } catch {
      return false;
    }
  }

  // Clear all data
  async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}

export default new StorageService();
