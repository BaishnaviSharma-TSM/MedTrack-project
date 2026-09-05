import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
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
    marginTop: -spacing.sm,
  },
  fieldBlock: {
    gap: spacing.sm,
  },
  booleanRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  booleanOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.inputBg,
  },
  booleanOptionSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: 'rgba(11, 114, 133, 0.08)',
  },
  booleanLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.muted,
  },
  booleanLabelSelected: {
    color: colors.brand.primary,
  },
  fieldLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#DC2626',
  },
});
