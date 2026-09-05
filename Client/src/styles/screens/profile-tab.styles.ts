import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.base,
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
    marginBottom: spacing.sm,
  },
  muted: {
    color: colors.muted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.brand.primary,
  },
  errorBanner: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
  },
  errorBannerText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#DC2626',
  },
});
