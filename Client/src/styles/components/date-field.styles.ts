import { Platform, StyleSheet } from 'react-native';

import { colors, fontFamilies, fontSizes, radii, shadows, spacing } from '@/theme';

const webPointer = Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null;
const webNoSelect = Platform.OS === 'web' ? ({ userSelect: 'none' } as object) : null;

export default StyleSheet.create({
  wrap: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 13,
    color: colors.muted,
  },
  field: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    paddingHorizontal: spacing.md,
    height: 48,
  },
  fieldButton: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: '100%',
    ...webPointer,
  },
  value: {
    flex: 1,
    fontFamily: fontFamilies.body.regular,
    fontSize: 14,
    color: colors.foreground,
    ...webNoSelect,
  },
  placeholder: {
    color: colors.muted,
  },
  clearButton: {
    padding: 2,
    ...webPointer,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    ...(Platform.OS === 'web'
      ? ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
        } as object)
      : null),
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(51, 47, 58, 0.45)',
  },
  dialog: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.brand.alpha08,
    padding: spacing.base,
    gap: spacing.md,
    zIndex: 1,
    ...shadows.clayCard,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...webPointer,
  },
  monthLabel: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.base,
    color: colors.foreground,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamilies.body.medium,
    fontSize: 12,
    color: colors.muted,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.285%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...webPointer,
  },
  daySelected: {
    backgroundColor: colors.brand.primary,
  },
  dayToday: {
    borderWidth: 1,
    borderColor: colors.brand.primary,
  },
  dayDisabled: {
    opacity: 0.35,
  },
  dayLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 13,
    color: colors.foreground,
  },
  dayLabelSelected: {
    color: colors.white,
    fontFamily: fontFamilies.body.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  footerButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    ...webPointer,
  },
  footerButtonLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 13,
    color: colors.brand.primary,
  },
});
