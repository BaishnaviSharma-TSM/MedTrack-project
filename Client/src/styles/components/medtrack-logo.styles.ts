import { StyleSheet } from 'react-native';

const brandTeal = '#0B7285';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  med: {
    fontFamily: 'Nunito_800ExtraBold',
    color: brandTeal,
    letterSpacing: 0.5,
  },
  track: {
    fontFamily: 'Nunito_400Regular',
    color: brandTeal,
    letterSpacing: 0.5,
  },
  iconShadow: {
    shadowColor: brandTeal,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
});
