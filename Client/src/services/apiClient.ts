import { API_BASE_URL, assertApiConfigured } from '@/config/dataSource';
import type { ApiResponse } from '@/types/api';
import { ApiError } from '@/types/api';
import { createLogger } from '@/utils/logger';

import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './tokenStorage';

const logger = createLogger('API');

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

function buildQuery(params?: Record<string, string | number | undefined>) {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  logger.debug('Refreshing access token');

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const payload = (await response.json()) as ApiResponse<{
    accessToken: string;
    refreshToken: string;
  }>;

  if (!response.ok || !payload.success || !payload.data) {
    logger.warn('Token refresh failed', { status: response.status, message: payload.message });
    await clearTokens();
    return null;
  }

  await setTokens(payload.data.accessToken, payload.data.refreshToken);
  logger.info('Access token refreshed');
  return payload.data.accessToken;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  assertApiConfigured();

  const { method = 'GET', body, auth = true, retryOnUnauthorized = true } = options;
  const started = Date.now();
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = await getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  logger.debug(`→ ${method} ${path}`, { auth, body });

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload: ApiResponse<T>;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    logger.error(`${method} ${path} invalid JSON`, { status: response.status, durationMs: Date.now() - started });
    throw new ApiError(
      response.ok
        ? 'Invalid response from server'
        : `Server error (${response.status}). Is the API running at ${API_BASE_URL}?`,
      response.status,
    );
  }

  const durationMs = Date.now() - started;

  if (response.status === 401 && auth && retryOnUnauthorized) {
    logger.warn(`${method} ${path} unauthorized — attempting refresh`);
    const nextToken = await refreshAccessToken();
    if (nextToken) {
      return apiRequest<T>(path, { ...options, retryOnUnauthorized: false });
    }
    unauthorizedHandler?.();
    throw new ApiError(payload.message || 'Unauthorized', 401, payload.errors ?? []);
  }

  if (!response.ok || !payload.success) {
    logger.warn(`${method} ${path} ${response.status} ${durationMs}ms`, {
      message: payload.message,
      errors: payload.errors,
    });
    throw new ApiError(
      payload.message || 'Request failed',
      payload.statusCode ?? response.status,
      payload.errors ?? [],
    );
  }

  logger.info(`${method} ${path} ${response.status} ${durationMs}ms`, {
    message: payload.message,
  });

  return payload;
}

export const apiClient = {
  get<T>(path: string, params?: Record<string, string | number | undefined>, auth = true) {
    return apiRequest<T>(`${path}${buildQuery(params)}`, { method: 'GET', auth });
  },
  post<T>(path: string, body?: unknown, auth = true) {
    return apiRequest<T>(path, { method: 'POST', body, auth });
  },
  patch<T>(path: string, body?: unknown, auth = true) {
    return apiRequest<T>(path, { method: 'PATCH', body, auth });
  },
};
