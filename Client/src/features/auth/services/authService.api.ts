import { apiClient } from '@/services/apiClient';
import { clearTokens, getAccessToken, setTokens } from '@/services/tokenStorage';

import type { AuthUser, LoginCredentials, LoginResult } from '../types';

type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

type MePayload = {
  id: string;
  email: string;
  role: AuthUser['role'];
  clinicId: string;
  staffCode: string;
};

type ProfilePayload = {
  fullName: string;
};

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  const response = await apiClient.post<AuthPayload>(
    '/auth/login',
    credentials,
    false,
  );

  await setTokens(response.data.accessToken, response.data.refreshToken);
  return { user: response.data.user };
}

export async function logout(): Promise<void> {
  const { getRefreshToken } = await import('@/services/tokenStorage');
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch {
      // Ignore logout failures — local session is cleared regardless.
    }
  }

  await clearTokens();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const [meResponse, profileResponse] = await Promise.all([
    apiClient.get<MePayload>('/auth/me'),
    apiClient.get<ProfilePayload>('/users/me'),
  ]);

  return {
    id: meResponse.data.id,
    email: meResponse.data.email,
    displayName: profileResponse.data.fullName,
    clinicId: meResponse.data.clinicId,
    staffCode: meResponse.data.staffCode,
    role: meResponse.data.role,
  };
}

export async function bootstrapSession(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch {
    await clearTokens();
    return null;
  }
}
