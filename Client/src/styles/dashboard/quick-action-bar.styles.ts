import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, radii, shadows, spacing } from '@/theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.base,
    ...shadows.clayCard,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.card,
    backgroundColor: colors.brand.alpha10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  label: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.base,
    color: colors.foreground,
  },
  description: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    color: colors.muted,
  },
});
