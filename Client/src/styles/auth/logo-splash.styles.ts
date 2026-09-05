import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  safe: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
  },
  tagline: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
  },
  hint: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
  },
});
