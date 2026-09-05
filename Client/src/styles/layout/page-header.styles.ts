import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  containerCanvas: {
    backgroundColor: colors.canvas,
  },
  containerTransparent: {
    backgroundColor: colors.transparent,
  },
  row: {
    position: 'relative',
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: spacing.sm,
  },
  sideSpacer: {
    width: 44,
    height: 44,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: colors.foreground,
    paddingHorizontal: 48,
  },
});
