export interface Settings {
  autoLockTimeout: number; // in minutes
  useBiometric: boolean;
}

export const defaultSettings: Settings = {
  autoLockTimeout: 5,
  useBiometric: false
};
