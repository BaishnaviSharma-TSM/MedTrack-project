import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  card: {
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
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 26,
    color: colors.white,
  },
  textBlock: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: colors.foreground,
  },
  specialty: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.muted,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: 'rgba(11, 114, 133, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  roleText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    color: colors.brand.primary,
  },
});
