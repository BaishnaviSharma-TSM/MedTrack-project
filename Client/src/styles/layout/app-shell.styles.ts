import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  /** Full-width area for Tabs navigator + custom tab bar */
  tabs: {
    flex: 1,
  },
  /** Padded content area for stack screens using AppShell */
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
