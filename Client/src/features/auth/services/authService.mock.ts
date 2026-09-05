import type { AuthUser, LoginCredentials, LoginResult } from '../types';

const MOCK_USERS: Record<string, AuthUser> = {
  'admin@medtrack.com': {
    id: 'mock-admin',
    email: 'admin@medtrack.com',
    displayName: 'Admin User',
    clinicId: 'mock-clinic',
    staffCode: 'AD-001',
    role: 'admin',
  },
  'doctor@medtrack.com': {
    id: 'mock-doctor',
    email: 'doctor@medtrack.com',
    displayName: 'Dr. Arjun Mehta',
    clinicId: 'mock-clinic',
    staffCode: 'DR-001',
    role: 'doctor',
  },
  'nurse@medtrack.com': {
    id: 'mock-nurse',
    email: 'nurse@medtrack.com',
    displayName: 'Nurse Priya Sharma',
    clinicId: 'mock-clinic',
    staffCode: 'NR-001',
    role: 'nurse',
  },
};

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  const email = credentials.email.trim().toLowerCase();
  const user = MOCK_USERS[email];

  if (!user || credentials.password.length < 6) {
    throw new Error('Invalid email or password');
  }

  return { user };
}

export async function logout(): Promise<void> {
  // Mock mode has no persisted tokens.
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return null;
}

export async function bootstrapSession(): Promise<AuthUser | null> {
  return null;
}
