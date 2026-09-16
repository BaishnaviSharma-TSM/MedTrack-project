import { Platform, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  stepperWrap: {
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  notesBlock: {
    marginTop: spacing.base,
  },
  notesBlockWide: {
    width: '100%',
  },
  notesInput: {
    minHeight: 96,
    height: 96,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    textAlignVertical: 'top',
  },
  notesLabel: {
    fontSize: 15,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.base,
    gap: spacing.sm,
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
  wideBody: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  wideTopStepper: {
    marginBottom: spacing.lg,
  },
  wideFormScroll: {
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
  vitalsStack: {
    width: '100%',
    gap: spacing.lg,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.lg,
    gap: spacing.lg,
    width: '100%',
    alignSelf: 'stretch',
  },
  cardFooterActions: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  cardActionButton: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-end',
    ...(Platform.OS === 'web' ? ({ whiteSpace: 'nowrap' } as object) : null),
  },
});
