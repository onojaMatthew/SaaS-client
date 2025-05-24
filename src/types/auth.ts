import { User, UserPreferences } from "./user";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  businessName: string;
  role: string
}

export interface AuthResponse {
  success: boolean;
  data: {
    token?: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: 'user' | 'admin' | 'super_admin' | 'media_manager' | 'content_creator';
      preferences: UserPreferences;
      createdAt: string;
      updatedAt: string;
      
    };
    business: object
  };
  
  message: string;
}