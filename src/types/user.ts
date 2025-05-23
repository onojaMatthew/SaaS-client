export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  password: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteGenres: string[]
  authors: string[]
  recommendUsing: 'content' | 'collaborative' | 'hybrid'
}
