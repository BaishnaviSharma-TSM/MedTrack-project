import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export default StyleSheet.create({
  bone: {
    overflow: 'hidden',
    backgroundColor: colors.inputBg,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
  },
});
