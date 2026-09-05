import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

function resolveDevApiBaseUrl(configuredUrl: string): string {
  if (!configuredUrl.includes('localhost') && !configuredUrl.includes('127.0.0.1')) {
    return configuredUrl;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const debuggerHost = hostUri?.split(':')[0];

  if (debuggerHost && debuggerHost !== 'localhost' && debuggerHost !== '127.0.0.1') {
    return configuredUrl
      .replace('localhost', debuggerHost)
      .replace('127.0.0.1', debuggerHost);
  }

  if (Platform.OS === 'android') {
    return configuredUrl
      .replace('localhost', '10.0.2.2')
      .replace('127.0.0.1', '10.0.2.2');
  }

  return configuredUrl;
}

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim() ?? '';

export const API_BASE_URL = configuredApiUrl
  ? resolveDevApiBaseUrl(configuredApiUrl)
  : '';

export function assertApiConfigured() {
  if (!USE_MOCK_DATA && !API_BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_URL is required when EXPO_PUBLIC_USE_MOCK_DATA is false.',
    );
  }
}
