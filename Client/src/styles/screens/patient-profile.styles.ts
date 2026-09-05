import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  headerWrap: {
    paddingHorizontal: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.base,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 22,
    color: colors.white,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  patientName: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: colors.foreground,
  },
  patientId: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.brand.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: colors.foreground,
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
  },
  cardTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.base,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EEF6',
  },
  detailLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.muted,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: colors.foreground,
  },
  recordButton: {
    backgroundColor: colors.brand.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: colors.foreground,
  },
  sectionCount: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    color: colors.brand.primary,
    backgroundColor: 'rgba(11, 114, 133, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
  },
  historyMain: {
    flex: 1,
    gap: 2,
  },
  historyDate: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
  },
  historyCondition: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.foreground,
  },
  historyVitals: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    lineHeight: 19,
  },
  muted: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    color: colors.muted,
  },
});
