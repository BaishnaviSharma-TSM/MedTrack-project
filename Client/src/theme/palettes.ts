/**
 * Light & Dark color palettes for MedTrack.
 * Both palettes share the same shape so components can swap seamlessly.
 */

const BRAND_RGB = '11, 114, 133';
const BRAND_HEX = '#0B7285';

/* ───────────────────────── LIGHT PALETTE ───────────────────────── */
export const lightPalette = {
  canvas: '#F4F1FA',
  foreground: '#332F3A',
  muted: '#635F69',
  cardBg: '#FFFFFF',
  cardGlass: 'rgba(255, 255, 255, 0.72)',
  cardGlassStrong: 'rgba(255, 255, 255, 0.88)',
  inputBg: '#EFEBF5',
  surfaceElevated: '#FFFFFF',
  borderSubtle: '#E8E4EF',
  borderMuted: 'rgba(11, 114, 133, 0.08)',

  brand: {
    primary: BRAND_HEX,
    alpha03: `rgba(${BRAND_RGB}, 0.03)`,
    alpha04: `rgba(${BRAND_RGB}, 0.04)`,
    alpha06: `rgba(${BRAND_RGB}, 0.06)`,
    alpha08: `rgba(${BRAND_RGB}, 0.08)`,
    alpha10: `rgba(${BRAND_RGB}, 0.1)`,
    alpha30: `rgba(${BRAND_RGB}, 0.3)`,
    alpha35: `rgba(${BRAND_RGB}, 0.35)`,
  },

  accent: {
    primary: BRAND_HEX,
    secondary: '#DB2777',
    tertiary: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
  },

  gradient: {
    primaryStart: '#18A3B8',
    primaryEnd: BRAND_HEX,
    textStart: '#332F3A',
    textMid: BRAND_HEX,
    textEnd: '#DB2777',
  },

  orb: {
    blue: { start: '#60A5FA', end: '#2563EB' },
    purple: { start: '#C084FC', end: '#9333EA' },
    pink: { start: '#F472B6', end: '#DB2777' },
    green: { start: '#34D399', end: '#059669' },
    cyan: { start: '#22D3EE', end: '#0891B2' },
    amber: { start: '#FBBF24', end: '#D97706' },
  },

  blob: {
    violet: '#8B5CF6',
    pink: '#EC4899',
    sky: '#0EA5E9',
    emerald: '#10B981',
  },

  shadow: {
    ambient: '#CDC6D9',
    highlight: '#FFFFFF',
    cardDrop: 'rgba(160, 150, 180, 0.35)',
    buttonDrop: `rgba(${BRAND_RGB}, 0.35)`,
    pressed: '#D9D4E3',
    innerBrand: `rgba(${BRAND_RGB}, 0.08)`,
  },

  ring: `rgba(${BRAND_RGB}, 0.3)`,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  /** Semantic chart colors */
  chart: {
    barTrack: '#F1EEF6',
    bar1: BRAND_HEX,
    bar2: '#2A9D8F',
    bar3: '#457B9D',
    bar4: '#6C63AC',
  },

  /** Overlay */
  overlay: 'rgba(51, 47, 58, 0.45)',
  /** Danger */
  danger: '#DC2626',
  dangerBg: 'rgba(220, 38, 38, 0.08)',
} as const;

/* ───────────────────────── DARK PALETTE ───────────────────────── */
export const darkPalette = {
  canvas: '#0B1A2A',
  foreground: '#E2E8F0',
  muted: '#8899A8',
  cardBg: '#112A3C',
  cardGlass: 'rgba(17, 42, 60, 0.82)',
  cardGlassStrong: 'rgba(17, 42, 60, 0.92)',
  inputBg: '#0A1628',
  surfaceElevated: '#132D42',
  borderSubtle: 'rgba(11, 114, 133, 0.2)',
  borderMuted: 'rgba(11, 114, 133, 0.15)',

  brand: {
    primary: '#14B8CC',
    alpha03: 'rgba(20, 184, 204, 0.03)',
    alpha04: 'rgba(20, 184, 204, 0.05)',
    alpha06: 'rgba(20, 184, 204, 0.08)',
    alpha08: 'rgba(20, 184, 204, 0.1)',
    alpha10: 'rgba(20, 184, 204, 0.14)',
    alpha30: 'rgba(20, 184, 204, 0.3)',
    alpha35: 'rgba(20, 184, 204, 0.35)',
  },

  accent: {
    primary: '#14B8CC',
    secondary: '#F472B6',
    tertiary: '#38BDF8',
    success: '#34D399',
    warning: '#FBBF24',
  },

  gradient: {
    primaryStart: '#14B8CC',
    primaryEnd: '#0B7285',
    textStart: '#E2E8F0',
    textMid: '#14B8CC',
    textEnd: '#F472B6',
  },

  orb: {
    blue: { start: '#3B82F6', end: '#1D4ED8' },
    purple: { start: '#A855F7', end: '#7C3AED' },
    pink: { start: '#EC4899', end: '#BE185D' },
    green: { start: '#10B981', end: '#047857' },
    cyan: { start: '#06B6D4', end: '#0E7490' },
    amber: { start: '#F59E0B', end: '#B45309' },
  },

  blob: {
    violet: 'rgba(139, 92, 246, 0.06)',
    pink: 'rgba(236, 72, 153, 0.04)',
    sky: 'rgba(14, 165, 233, 0.06)',
    emerald: 'rgba(16, 185, 129, 0.04)',
  },

  shadow: {
    ambient: 'rgba(0, 0, 0, 0.4)',
    highlight: 'rgba(255, 255, 255, 0.03)',
    cardDrop: 'rgba(0, 0, 0, 0.5)',
    buttonDrop: 'rgba(11, 114, 133, 0.5)',
    pressed: 'rgba(0, 0, 0, 0.3)',
    innerBrand: 'rgba(20, 184, 204, 0.1)',
  },

  ring: 'rgba(20, 184, 204, 0.4)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  chart: {
    barTrack: '#1A3050',
    bar1: '#14B8CC',
    bar2: '#2A9D8F',
    bar3: '#457B9D',
    bar4: '#8B5CF6',
  },

  overlay: 'rgba(0, 0, 0, 0.6)',
  danger: '#EF4444',
  dangerBg: 'rgba(239, 68, 68, 0.12)',
} as const;

/**
 * Widened type so both palettes fit the same shape.
 * We type it against the light palette's keys but with `string` leaf values.
 */
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? { [SK in keyof T[K]]: string }
    : string;
};

export type ThemePalette = DeepStringify<typeof lightPalette>;
export type ThemeMode = 'light' | 'dark';

/** Pre-typed palette references for use in the context */
export const lightColors: ThemePalette = lightPalette as unknown as ThemePalette;
export const darkColors: ThemePalette = darkPalette as unknown as ThemePalette;
