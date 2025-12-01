export interface Credential {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  isFavorite: boolean;
  createdAt: string;
  modifiedAt?: string;
  passwordHistory: string[];
}

export const createCredential = (data: Partial<Credential>): Credential => {
  return {
    id: data.id || Date.now().toString(),
    title: data.title || '',
    username: data.username || '',
    password: data.password || '',
    url: data.url,
    notes: data.notes,
    isFavorite: data.isFavorite || false,
    createdAt: data.createdAt || new Date().toISOString(),
    modifiedAt: data.modifiedAt,
    passwordHistory: data.passwordHistory || []
  };
};
