import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';

import { LoadingScreen } from '@/components/feedback';
import { WebAppShell } from '@/components/layout';
import { getConditions } from '@/features/conditions/services/conditionsService';
import { useIsWideLayout } from '@/hooks';
import { useAuthContext } from '@/providers';

function ClinicalStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="patients/new" />
      <Stack.Screen name="patients/[id]/index" />
      <Stack.Screen name="patients/[id]/edit" />
      <Stack.Screen name="visits/new" />
      <Stack.Screen name="visits/[visitId]" />
    </Stack>
  );
}

export default function AppLayout() {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const isWideLayout = useIsWideLayout();

  useEffect(() => {
    if (!isAuthenticated || user?.role === 'admin') return;
    void getConditions().catch(() => undefined);
  }, [isAuthenticated, user?.role]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  if (user?.role === 'admin') {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="admin-notice" />
      </Stack>
    );
  }

  if (isWideLayout) {
    return (
      <WebAppShell>
        <ClinicalStack />
      </WebAppShell>
    );
  }

  return <ClinicalStack />;
}
