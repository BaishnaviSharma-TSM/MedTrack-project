import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, radii, shadows, spacing } from '@/theme';

export const WEB_SIDEBAR_WIDTH = 260;

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.canvas,
    ...(Platform.OS === 'web'
      ? ({ minHeight: '100vh', width: '100%', overflow: 'hidden' } as object)
      : null),
  },
  sidebar: {
    width: WEB_SIDEBAR_WIDTH,
    backgroundColor: colors.cardBg,
    borderRightWidth: 1,
    borderRightColor: colors.brand.alpha08,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    ...shadows.clayCard,
  },
  logoWrap: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  navSection: {
    flex: 1,
    gap: spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: radii.card,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  navItemActive: {
    backgroundColor: colors.brand.alpha10,
  },
  navLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.base,
    color: colors.muted,
  },
  navLabelActive: {
    color: colors.accent.primary,
    fontFamily: fontFamilies.body.bold,
  },
  actionsSection: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  primaryAction: {
    width: '100%',
  },
  secondaryAction: {
    width: '100%',
  },
  userSection: {
    borderTopWidth: 1,
    borderTopColor: colors.brand.alpha08,
    paddingTop: spacing.base,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.alpha10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatarInitials: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.brand.primary,
  },
  userTextBlock: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  userName: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.foreground,
  },
  userRole: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    color: colors.muted,
  },
  signOutIconButton: {
    padding: spacing.xs,
    borderRadius: radii.card,
    flexShrink: 0,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  mainPane: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'column',
    ...(Platform.OS === 'web'
      ? ({ overflow: 'hidden', minHeight: '100vh', width: '100%' } as object)
      : null),
  },
  mainPaneInner: {
    flex: 1,
    width: '100%',
    minWidth: 0,
    ...(Platform.OS === 'web' ? ({ overflow: 'auto' } as object) : null),
  },
});
