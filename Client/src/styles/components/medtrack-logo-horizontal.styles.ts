import { StyleSheet } from 'react-native';

const brandTeal = '#0B7285';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    shadowColor: brandTeal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 10,
  },
  med: {
    fontFamily: 'Nunito_800ExtraBold',
    color: brandTeal,
    letterSpacing: 0.3,
  },
  track: {
    fontFamily: 'Nunito_400Regular',
    color: brandTeal,
    letterSpacing: 0.3,
  },
});
