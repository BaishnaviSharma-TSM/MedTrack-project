import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

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
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: colors.muted,
  },
  patientName: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.foreground,
  },
  condition: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.brand.primary,
  },
  vitals: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: colors.muted,
  },
});
