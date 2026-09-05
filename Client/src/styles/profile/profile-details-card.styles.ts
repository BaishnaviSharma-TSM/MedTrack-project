import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
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
});
