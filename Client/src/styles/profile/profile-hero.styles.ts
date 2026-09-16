import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.base,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4EF',
    borderLeftWidth: 4,
    borderLeftColor: colors.brand.primary,
    flexWrap: 'wrap',
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    minHeight: 72,
  },
  identity: {
    flex: 1,
    minWidth: 180,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 2,
  },
  name: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: colors.foreground,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 114, 133, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  roleText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    color: colors.brand.primary,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
