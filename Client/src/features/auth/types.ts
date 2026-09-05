export type UserRole = 'admin' | 'doctor' | 'nurse';

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  clinicId: string;
  staffCode: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  user: AuthUser;
}
