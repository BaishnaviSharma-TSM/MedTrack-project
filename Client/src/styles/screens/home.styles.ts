import { StyleSheet } from 'react-native';

import { colors, fontFamilies, spacing } from '@/theme';

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
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: 24,
    marginBottom: 4,
  },
  pageSubtitle: {
    color: colors.muted,
    fontFamily: fontFamilies.body.regular,
    fontSize: 14,
    marginBottom: spacing.base,
  },
  /** Consistent vertical spacing between all home sections (mobile + wide) */
  homeContentStack: {
    width: '100%',
    gap: spacing.lg,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionBlock: {
    width: '100%',
  },
  stackItemFlush: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    color: colors.foreground,
    fontFamily: fontFamilies.heading.bold,
    fontSize: 16,
  },
  viewAll: {
    fontFamily: fontFamilies.body.bold,
    fontSize: 13,
    color: colors.brand.primary,
  },
  muted: {
    color: colors.muted,
    fontFamily: fontFamilies.body.medium,
    fontSize: 15,
  },
  emptySection: {
    fontFamily: fontFamilies.body.regular,
    fontSize: 14,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
});
