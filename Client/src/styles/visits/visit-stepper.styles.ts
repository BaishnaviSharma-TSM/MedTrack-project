import { Platform, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  containerVertical: {
    gap: 0,
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
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
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
  bubbleVertical: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  verticalStep: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
    minHeight: 64,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  verticalStepLast: {
    minHeight: 32,
    alignItems: 'center',
  },
  verticalTrack: {
    width: 32,
    alignItems: 'center',
  },
  verticalConnector: {
    width: 2,
    flex: 1,
    minHeight: 20,
    backgroundColor: colors.inputBg,
  },
  verticalLabelWrap: {
    flex: 1,
    paddingTop: 4,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  verticalStepLabel: {
    marginTop: 0,
    textAlign: 'left',
    fontSize: 14,
  },
  verticalStepHint: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
});
