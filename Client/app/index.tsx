import { Redirect } from 'expo-router';

import { LoadingScreen } from '@/components/feedback';
import { useAuthContext } from '@/providers';

export default function Index() {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Redirect href="/(app)/admin-notice" />;
    }
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)" />;
}
