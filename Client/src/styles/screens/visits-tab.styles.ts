import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  headerWrap: {
    paddingHorizontal: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  muted: {
    color: colors.muted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
  },
  ctaCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
    marginBottom: spacing.base,
    gap: spacing.sm,
  },
  ctaTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.foreground,
  },
  ctaText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    lineHeight: 19,
  },
  recordButton: {
    backgroundColor: colors.brand.primary,
    marginTop: spacing.xs,
  },
  filtersBlock: {
    gap: spacing.base,
    marginBottom: spacing.sm,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dateFieldWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  dateLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    paddingHorizontal: spacing.md,
    height: 48,
  },
  dateInput: {
    flex: 1,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    paddingVertical: 0,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E8E4EF',
  },
  chipSelected: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  chipLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  chipLabelSelected: {
    color: colors.white,
    fontFamily: 'DMSans_700Bold',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    paddingVertical: 0,
  },
  filterIconButton: {
    paddingLeft: spacing.sm,
    paddingVertical: spacing.sm,
  },
  recordCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
    marginBottom: spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recordCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  recordDate: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
  },
  idBadge: {
    backgroundColor: 'rgba(11, 114, 133, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
  },
  idBadgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    color: colors.brand.primary,
  },
  recordLine: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 22,
    marginBottom: 6,
  },
  recordLabel: {
    fontFamily: 'DMSans_700Bold',
    color: colors.foreground,
  },
  recordValue: {
    fontFamily: 'DMSans_400Regular',
    color: colors.foreground,
  },
  recordValueStrong: {
    fontFamily: 'DMSans_700Bold',
    color: colors.foreground,
  },
});
