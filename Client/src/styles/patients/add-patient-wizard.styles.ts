import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.base,
    gap: spacing.sm,
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
