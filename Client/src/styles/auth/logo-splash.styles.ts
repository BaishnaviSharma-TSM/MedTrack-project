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
  content: {
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
});
