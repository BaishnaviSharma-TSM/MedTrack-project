import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  stepWrap: {
    flex: 1,
    alignItems: 'center',
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.inputBg,
  },
  connectorHidden: {
    backgroundColor: 'transparent',
  },
  connectorDone: {
    backgroundColor: colors.brand.primary,
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.inputBg,
  },
  bubbleActive: {
    borderColor: colors.brand.primary,
    backgroundColor: 'rgba(11, 114, 133, 0.1)',
  },
  bubbleDone: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.brand.primary,
  },
  bubbleText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.muted,
  },
  bubbleTextActive: {
    color: colors.brand.primary,
  },
  stepLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: colors.muted,
    marginTop: 6,
    textAlign: 'center',
  },
  stepLabelActive: {
    fontFamily: 'DMSans_700Bold',
    color: colors.brand.primary,
  },
});
