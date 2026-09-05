import { TextStyle } from 'react-native';

/**
 * Font family names match @expo-google-fonts loaded assets.
 * Load via useClayFonts() before rendering text.
 */
export const fontFamilies = {
  heading: {
    black: 'Nunito_900Black',
    extraBold: 'Nunito_800ExtraBold',
    bold: 'Nunito_700Bold',
  },
  body: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    bold: 'DMSans_700Bold',
  },
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

/** Pre-composed text styles for the clay design system */
export const textStyles = {
  hero: {
    fontFamily: fontFamilies.heading.black,
    fontSize: fontSizes['5xl'],
    lineHeight: fontSizes['5xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,

  sectionTitle: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,

  cardTitle: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
    lineHeight: fontSizes.xl * lineHeights.snug,
  } satisfies TextStyle,

  cardTitleLg: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  } satisfies TextStyle,

  body: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.relaxed,
  } satisfies TextStyle,

  bodyLg: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.relaxed,
  } satisfies TextStyle,

  label: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  caption: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.normal,
  } satisfies TextStyle,

  stat: {
    fontFamily: fontFamilies.heading.black,
    fontSize: fontSizes['4xl'],
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
  } satisfies TextStyle,

  button: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,
} as const;

export type TextStyles = typeof textStyles;
