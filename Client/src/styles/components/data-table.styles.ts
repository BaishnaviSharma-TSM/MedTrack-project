import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, spacing } from '@/theme';

const TABLE_RADIUS = 12;

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.brand.alpha08,
    borderRadius: TABLE_RADIUS,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          borderTopLeftRadius: TABLE_RADIUS,
          borderTopRightRadius: TABLE_RADIUS,
          borderBottomLeftRadius: TABLE_RADIUS,
          borderBottomRightRadius: TABLE_RADIUS,
        } as object)
      : null),
  },
  table: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.brand.alpha04,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.alpha08,
  },
  headerCellWrap: {
    justifyContent: 'center',
  },
  headerCell: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  bodyRow: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.alpha06,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  bodyRowLast: {
    borderBottomWidth: 0,
  },
  bodyRowHover: {
    backgroundColor: colors.brand.alpha03,
  },
  bodyCell: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    color: colors.foreground,
  },
  bodyCellStrong: {
    fontFamily: fontFamilies.body.bold,
  },
  bodyCellMuted: {
    color: colors.muted,
  },
  empty: {
    padding: spacing.xl,
    textAlign: 'center',
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    color: colors.muted,
  },
});
