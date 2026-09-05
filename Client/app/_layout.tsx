import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ErrorState, LoadingScreen } from '@/components/feedback';
import { AppProviders } from '@/providers';
import { colors, useClayFonts } from '@/theme';

export default function RootLayout() {
  const { loaded, error } = useClayFonts();

  if (error) {
    return (
      <ErrorState message="Failed to load fonts. Please restart the app." />
    );
  }

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }} />
    </AppProviders>
  );
}
