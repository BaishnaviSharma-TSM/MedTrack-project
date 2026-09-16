import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, radii, shadows, spacing } from '@/theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(51, 47, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.cardBg,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.brand.alpha08,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.clayCard,
  },
  title: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
  },
  message: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.base,
    color: colors.muted,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionButton: {
    minWidth: 96,
  },
  cancelButton: {
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
});
