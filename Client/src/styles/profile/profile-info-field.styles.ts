import { Platform, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  field: {
    flex: 1,
    minWidth: 0,
    gap: 5,
  },
  fieldLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  fieldInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    minHeight: 40,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null),
  },
  fieldInputEditable: {
    backgroundColor: colors.white,
    borderColor: colors.brand.alpha30,
  },
  fieldValue: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
  },
  asterisk: {
    color: '#DC2626',
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: '#DC2626',
  },
});
