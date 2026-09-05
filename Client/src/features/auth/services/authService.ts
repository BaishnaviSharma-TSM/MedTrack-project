import { USE_MOCK_DATA } from '@/config/dataSource';
import { createLogger } from '@/utils/logger';

import type { AuthUser, LoginCredentials, LoginResult } from '../types';
import * as apiAuth from './authService.api';
import * as mockAuth from './authService.mock';

const logger = createLogger('Auth');

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  logger.info(`Login attempt (${USE_MOCK_DATA ? 'mock' : 'api'})`, {
    email: credentials.email,
  });

  try {
    const result = USE_MOCK_DATA
      ? await mockAuth.login(credentials)
      : await apiAuth.login(credentials);

    logger.info('Login successful', {
      userId: result.user.id,
      role: result.user.role,
    });
    return result;
  } catch (error) {
    logger.error('Login failed', {
      email: credentials.email,
      message: error instanceof Error ? error.message : 'unknown error',
    });
    throw error;
  }
}

export async function logout(): Promise<void> {
  logger.info(`Logout (${USE_MOCK_DATA ? 'mock' : 'api'})`);
  if (USE_MOCK_DATA) return mockAuth.logout();
  return apiAuth.logout();
}

export async function bootstrapSession(): Promise<AuthUser | null> {
  logger.debug(`Bootstrap session (${USE_MOCK_DATA ? 'mock' : 'api'})`);

  const user = USE_MOCK_DATA
    ? await mockAuth.bootstrapSession()
    : await apiAuth.bootstrapSession();

  if (user) {
    logger.info('Session restored', { userId: user.id, role: user.role });
  } else {
    logger.debug('No active session');
  }

  return user;
}
