import { Platform, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

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
  headerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.brand.alpha04,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.alpha08,
  },
  headerBone: {
    flex: 1,
    height: 14,
    borderRadius: 6,
  },
  bodyRow: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.alpha06,
  },
  bodyBone: {
    flex: 1,
    height: 16,
    borderRadius: 6,
  },
});
