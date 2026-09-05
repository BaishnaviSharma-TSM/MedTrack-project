import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  fieldGroup: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: colors.foreground,
  },
  hint: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  conditionGrid: {
    gap: spacing.sm,
  },
  conditionCard: {
    padding: spacing.base,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.inputBg,
  },
  conditionCardSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: 'rgba(11, 114, 133, 0.06)',
  },
  conditionLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: colors.foreground,
  },
  conditionHint: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#DC2626',
  },
});
