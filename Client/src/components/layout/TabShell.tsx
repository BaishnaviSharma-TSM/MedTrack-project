import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSegments } from 'expo-router';

import { ClayBackground } from '@/components/ui';
import styles from '@/styles/layout/app-shell.styles';

import { AppHeader } from './AppHeader';

type TabShellProps = {
  children: ReactNode;
};

/** Authenticated tab layout — optional header + full-width tabs above curved tab bar */
export function TabShell({ children }: TabShellProps) {
  const segments = useSegments();
  const hideHeader = segments.includes('patients') || segments.includes('visits');

  return (
    <ClayBackground style={styles.root}>
      <View style={styles.root}>
        {!hideHeader ? <AppHeader /> : null}
        <View style={styles.tabs}>{children}</View>
      </View>
    </ClayBackground>
  );
}
