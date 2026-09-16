import { StyleSheet } from 'react-native';

import { colors, fontFamilies, spacing } from '@/theme';

export default StyleSheet.create({
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
    marginBottom: spacing.sm,
    gap: 4,
  },
  date: {
    fontFamily: fontFamilies.body.regular,
    fontSize: 12,
    color: colors.muted,
  },
  patientName: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 15,
    color: colors.foreground,
  },
  condition: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 13,
    color: colors.brand.primary,
  },
  vitals: {
    fontFamily: fontFamilies.body.regular,
    fontSize: 12,
    color: colors.muted,
  },
});
