import type { ReactNode } from 'react';
import { View } from 'react-native';

import { ClayBackground } from '@/components/ui';
import styles from '@/styles/layout/app-shell.styles';

type TabShellProps = {
  children: ReactNode;
};

/** Authenticated tab layout — tab screens use ScreenLayout for page titles. */
export function TabShell({ children }: TabShellProps) {
  return (
    <ClayBackground style={styles.root}>
      <View style={styles.root}>
        <View style={styles.tabs}>{children}</View>
      </View>
    </ClayBackground>
  );
}
