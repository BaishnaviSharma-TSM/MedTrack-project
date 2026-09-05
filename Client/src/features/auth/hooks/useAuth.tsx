import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'expo-router';

import { setUnauthorizedHandler } from '@/services/apiClient';
import { createLogger } from '@/utils/logger';

import { bootstrapSession } from '../services/authService';
import type { AuthUser } from '../types';

const logger = createLogger('AuthProvider');

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logger.warn('Session expired — redirecting to login');
      setUser(null);
      router.replace('/(auth)');
    });

    bootstrapSession()
      .then((sessionUser) => {
        if (sessionUser) setUser(sessionUser);
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      setUser,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
