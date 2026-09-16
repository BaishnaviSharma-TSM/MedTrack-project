import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(11, 114, 133, 0.06)',
    borderRadius: 12,
    paddingHorizontal: spacing.base,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: spacing.base,
  },
  containerWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.base,
    marginBottom: 0,
  },
  wideItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    minWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.base,
    paddingVertical: spacing.sm,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  value: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.foreground,
  },
  changeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.brand.primary,
  },
});
