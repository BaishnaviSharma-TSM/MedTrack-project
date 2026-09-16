/**
 * High-Fidelity Claymorphism — color tokens
 * Candy-shop palette with WCAG AA-friendly foreground contrast.
 */
const BRAND_RGB = '11, 114, 133';
const BRAND_HEX = '#0B7285';

export const colors = {
  /** Canvas — very pale cool lavender-white (#F4F1FA) */
  canvas: '#F4F1FA',

  /** Primary text — soft charcoal (#332F3A) */
  foreground: '#332F3A',

  /** Secondary text — dark lavender-gray (#635F69), never go lighter */
  muted: '#635F69',

  /** Solid card surface */
  cardBg: '#FFFFFF',

  /** Glass-clay card overlays */
  cardGlass: 'rgba(255, 255, 255, 0.72)',
  cardGlassStrong: 'rgba(255, 255, 255, 0.88)',

  /** Recessed input background */
  inputBg: '#EFEBF5',

  brand: {
    /** MedTrack primary brand teal — rgba(11, 114, 133, 1) */
    primary: BRAND_HEX,
    /** Tint utilities derived from brand RGB */
    alpha03: `rgba(${BRAND_RGB}, 0.03)`,
    alpha04: `rgba(${BRAND_RGB}, 0.04)`,
    alpha06: `rgba(${BRAND_RGB}, 0.06)`,
    alpha08: `rgba(${BRAND_RGB}, 0.08)`,
    alpha10: `rgba(${BRAND_RGB}, 0.1)`,
    alpha30: `rgba(${BRAND_RGB}, 0.3)`,
    alpha35: `rgba(${BRAND_RGB}, 0.35)`,
  },

  accent: {
    /** Primary CTAs, links, active nav — brand teal */
    primary: BRAND_HEX,
    /** Hot pink — gradients, secondary emphasis (#DB2777) */
    secondary: '#DB2777',
    /** Sky blue — informational elements (#0EA5E9) */
    tertiary: '#0EA5E9',
    /** Emerald — success, checkmarks (#10B981) */
    success: '#10B981',
    /** Amber — warnings, ratings (#F59E0B) */
    warning: '#F59E0B',
  },

  gradient: {
    /** Primary button: lighter teal → brand teal */
    primaryStart: '#18A3B8',
    primaryEnd: BRAND_HEX,
    /** Hero text gradient stops */
    textStart: '#332F3A',
    textMid: BRAND_HEX,
    textEnd: '#DB2777',
  },

  /** Icon orb gradient pairs (light 400 → saturated 600) */
  orb: {
    blue: { start: '#60A5FA', end: '#2563EB' },
    purple: { start: '#C084FC', end: '#9333EA' },
    pink: { start: '#F472B6', end: '#DB2777' },
    green: { start: '#34D399', end: '#059669' },
    cyan: { start: '#22D3EE', end: '#0891B2' },
    amber: { start: '#FBBF24', end: '#D97706' },
  },

  /** Ambient background blobs — use at ~10% opacity */
  blob: {
    violet: '#8B5CF6',
    pink: '#EC4899',
    sky: '#0EA5E9',
    emerald: '#10B981',
  },

  /** Shadow tint colors for clay lighting simulation */
  shadow: {
    ambient: '#CDC6D9',
    highlight: '#FFFFFF',
    cardDrop: 'rgba(160, 150, 180, 0.35)',
    buttonDrop: `rgba(${BRAND_RGB}, 0.35)`,
    pressed: '#D9D4E3',
    innerBrand: `rgba(${BRAND_RGB}, 0.08)`,
  },

  /** Focus ring */
  ring: `rgba(${BRAND_RGB}, 0.3)`,

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;

/** Blob colors at 10% opacity for ambient lighting */
export const blobColors = {
  // violet: 'rgba(139, 92, 246, 0.1)',
  // // pink: 'rgba(236, 72, 153, 0.1)',
  // sky: 'rgba(14, 165, 233, 0.1)',
  // emerald: 'rgba(16, 185, 129, 0.1)',
} as const;
