import { StyleSheet } from 'react-native';

import { colors, fontFamilies, spacing } from '@/theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 15,
    color: colors.foreground,
  },
  meta: {
    fontFamily: fontFamilies.body.regular,
    fontSize: 12,
    color: colors.muted,
  },
});
