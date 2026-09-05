import { Platform, ViewStyle } from 'react-native';

import { colors } from './colors';

/**
 * Clay shadow presets for React Native.
 * RN supports a single outer shadow per view — these approximate the
 * 4-layer CSS stacks from the design system. Pair with nested views
 * or expo-linear-gradient for full fidelity on key components.
 */
function clayShadow(ios: ViewStyle, elevation: number): ViewStyle {
  return Platform.select({
    ios,
    android: { elevation },
    default: ios,
  }) as ViewStyle;
}

export const shadows = {
  /** Large surface / hero containers */
  deepClay: clayShadow(
    {
      shadowColor: colors.shadow.ambient,
      shadowOffset: { width: 15, height: 15 },
      shadowOpacity: 0.45,
      shadowRadius: 30,
    },
    14,
  ),

  /** Standard floating cards */
  clayCard: clayShadow(
    {
      shadowColor: colors.shadow.cardDrop,
      shadowOffset: { width: 8, height: 8 },
      shadowOpacity: 0.9,
      shadowRadius: 16,
    },
    8,
  ),

  /** Enhanced card hover — use on pressed-in hover states */
  clayCardHover: clayShadow(
    {
      shadowColor: colors.shadow.cardDrop,
      shadowOffset: { width: 12, height: 14 },
      shadowOpacity: 1,
      shadowRadius: 24,
    },
    12,
  ),

  /** High-convexity buttons */
  clayButton: clayShadow(
    {
      shadowColor: colors.accent.primary,
      shadowOffset: { width: 6, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
    },
    10,
  ),

  clayButtonHover: clayShadow(
    {
      shadowColor: colors.accent.primary,
      shadowOffset: { width: 8, height: 12 },
      shadowOpacity: 0.45,
      shadowRadius: 18,
    },
    14,
  ),

  /**
   * Recessed / pressed surfaces.
   * True inset shadows need an inner wrapper — this uses a flat style
   * hint; components should also use inputBg background.
   */
  clayPressed: {
    shadowColor: colors.shadow.pressed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,

  none: {
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,
} as const;

export type Shadows = typeof shadows;
