/**
 * Super-rounded radii — minimum 20px per clay design rules.
 */
export const radii = {
  /** Buttons & inputs */
  button: 20,
  /** Medium elements — pills, blog cards */
  medium: 24,
  /** Standard cards (default) */
  card: 32,
  /** Large containers */
  container: 48,
  /** Hero sections */
  hero: 60,
  /** Icon squares */
  icon: 16,
  /** Full circles — stat orbs, blobs */
  full: 9999,
} as const;

export type Radii = typeof radii;
