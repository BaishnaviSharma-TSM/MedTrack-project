import { Platform, StyleSheet } from 'react-native';

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
  headerAction: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  headerActionPrimary: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  headerActionPressed: {
    opacity: 0.85,
  },
  headerActionDisabled: {
    opacity: 0.6,
  },
  headerActionLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.foreground,
  },
  headerActionLabelPrimary: {
    color: colors.white,
  },
});
