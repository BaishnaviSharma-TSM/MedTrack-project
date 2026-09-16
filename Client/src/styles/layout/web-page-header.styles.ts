import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, spacing } from '@/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.alpha08,
    paddingHorizontal: spacing.lg,
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ position: 'sticky', top: 0, zIndex: 10 } as object)
      : null),
  },
  backButton: {
    position: 'absolute',
    left: spacing.lg,
    top: 0,
    bottom: 0,
    minWidth: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  titleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
    gap: 2,
  },
  title: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    color: colors.muted,
    textAlign: 'center',
  },
  actions: {
    position: 'absolute',
    right: spacing.lg,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    zIndex: 1,
  },
});
