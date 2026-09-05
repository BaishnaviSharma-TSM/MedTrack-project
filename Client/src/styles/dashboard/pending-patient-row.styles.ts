import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

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
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.foreground,
  },
  meta: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: colors.muted,
  },
  recordButton: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  recordButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.white,
  },
});
