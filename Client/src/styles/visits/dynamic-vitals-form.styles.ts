import { Platform, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  scrollContentWide: {
    paddingBottom: 0,
    width: '100%',
  },
  sectionHeader: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: colors.foreground,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    width: '100%',
  },
  fieldCol: {
    flex: 1,
    minWidth: 0,
  },
  fieldBlock: {
    gap: spacing.sm,
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxBoxChecked: {
    backgroundColor: colors.brand.primary,
  },
  fieldLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    color: colors.foreground,
    flex: 1,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#DC2626',
  },
});
