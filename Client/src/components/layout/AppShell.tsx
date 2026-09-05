import type { ReactNode } from 'react';
import { View } from 'react-native';

import { ClayBackground } from '@/components/ui';
import styles from '@/styles/layout/app-shell.styles';

import { AppHeader } from './AppHeader';

type AppShellProps = {
  children: ReactNode;
};

/** Shared authenticated layout — clay background, header, content area */
export function AppShell({ children }: AppShellProps) {
  return (
    <ClayBackground style={styles.root}>
      <View style={styles.root}>
        <AppHeader />
        <View style={styles.content}>{children}</View>
      </View>
    </ClayBackground>
  );
}
