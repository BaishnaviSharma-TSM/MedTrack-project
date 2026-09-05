/**
 * Animation durations and timing for clay micro-interactions.
 * Use with Animated API or Reanimated when those are added.
 */
export const durations = {
  fast: 200,
  normal: 300,
  slow: 500,
  blob: 8000,
  blobAlt: 10000,
  blobSlow: 12000,
  breathe: 6000,
} as const;

export const animationDelays = {
  short: 2000,
  long: 4000,
} as const;

/** Scale transforms for interactive states */
export const scales = {
  press: 0.92,
  hoverSubtle: 1.02,
  hoverMedium: 1.05,
  hoverOrb: 1.1,
} as const;

/** Translate Y lift values (px) */
export const lifts = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export type Durations = typeof durations;
