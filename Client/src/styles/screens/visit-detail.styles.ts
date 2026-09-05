import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.base,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    padding: spacing.base,
    gap: spacing.sm,
  },
  cardTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  line: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 22,
  },
  label: {
    fontFamily: 'DMSans_700Bold',
  },
  vitalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEF5',
  },
  vitalLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: colors.muted,
    flex: 1,
  },
  vitalValue: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: colors.foreground,
  },
  linkButton: {
    marginTop: spacing.sm,
  },
  muted: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: colors.muted,
  },
});
