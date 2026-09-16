import { TextStyle, ViewStyle } from 'react-native';

import { animationDelays, durations, lifts, scales } from './animations';
import { blobColors, colors } from './colors';
import { clayFontMap, useClayFonts } from './fonts';
import { radii } from './radii';
import { shadows } from './shadows';
import { sizes, spacing } from './spacing';
import { fontFamilies, fontSizes, letterSpacing, lineHeights, textStyles } from './typography';

/**
 * Unified clay design system theme.
 * Import `clayTheme` for tokens; use `useClayFonts()` at app root.
 */
export const clayTheme = {
  colors,
  blobColors,
  fontFamilies,
  fontSizes,
  lineHeights,
  letterSpacing,
  textStyles,
  shadows,
  radii,
  spacing,
  sizes,
  durations,
  animationDelays,
  scales,
  lifts,
  clayFontMap,
  useClayFonts,
} as const;

export type ClayTheme = typeof clayTheme;

/** Global screen canvas style */
export const screenStyle: ViewStyle = {
  flex: 1,
  backgroundColor: colors.canvas,
};

/** Default body text color applied with typography presets */
export const bodyTextColor: TextStyle = {
  color: colors.foreground,
};

export const mutedTextColor: TextStyle = {
  color: colors.muted,
};

/** Primary card shell — glass-clay hybrid */
export const cardStyle: ViewStyle = {
  backgroundColor: colors.cardGlass,
  borderRadius: radii.card,
  padding: spacing.lg,
  ...shadows.clayCard,
};

/** Recessed input shell */
export const inputStyle: ViewStyle = {
  backgroundColor: colors.inputBg,
  borderRadius: radii.input,
  height: sizes.input,
  paddingHorizontal: spacing.lg,
  ...shadows.clayPressed,
};

/** Shared action-button shell — no drop shadow */
export const primaryButtonStyle: ViewStyle = {
  height: sizes.button,
  minHeight: sizes.button,
  borderRadius: radii.button,
  alignItems: 'center',
  justifyContent: 'center',
  ...shadows.none,
};

export default clayTheme;
