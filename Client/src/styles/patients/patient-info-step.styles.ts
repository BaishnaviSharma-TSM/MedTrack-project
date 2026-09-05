import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
    gap: spacing.base,
  },
  sectionTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  fieldGroup: {
    gap: spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.inputBg,
  },
  chipSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: 'rgba(11, 114, 133, 0.08)',
  },
  chipLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: colors.muted,
  },
  chipLabelSelected: {
    color: colors.brand.primary,
    fontFamily: 'DMSans_700Bold',
  },
  hint: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    marginTop: -spacing.sm,
    lineHeight: 19,
  },
  noticeBox: {
    padding: spacing.base,
    borderRadius: 12,
    backgroundColor: 'rgba(11, 114, 133, 0.06)',
  },
  noticeTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.brand.primary,
    marginBottom: 2,
  },
  noticeText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    lineHeight: 19,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#DC2626',
    marginTop: -4,
  },
});
