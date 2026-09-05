import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 32,
  },
  pageTitle: {
    color: colors.foreground,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    marginBottom: 4,
  },
  pageSubtitle: {
    color: colors.muted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    marginBottom: spacing.base,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  sectionBlock: {
    marginBottom: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    color: colors.foreground,
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  },
  viewAll: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.brand.primary,
  },
  muted: {
    color: colors.muted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
  },
  emptySection: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
});
