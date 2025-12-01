export interface Credential {
  id: string;
  title: string;
  username: string;
  password: string;
  createdAt: string;
  modifiedAt?: string;
  notes?: string;
  isFavorite: boolean;
  passwordHistory: string[];
}

export const createCredential = (
  data: Omit<Credential, 'id' | 'createdAt' | 'isFavorite' | 'passwordHistory'> & {
    id?: string;
    createdAt?: string;
    isFavorite?: boolean;
    passwordHistory?: string[];
  }
): Credential => {
  return {
    id: data.id || Date.now().toString(),
    title: data.title,
    username: data.username,
    password: data.password,
    createdAt: data.createdAt || new Date().toISOString(),
    modifiedAt: data.modifiedAt,
    notes: data.notes,
    isFavorite: data.isFavorite || false,
    passwordHistory: data.passwordHistory || [],
  };
};
