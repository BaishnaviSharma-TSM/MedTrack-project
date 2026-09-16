/** Consistent spacing scale for layout and component padding */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

/** Standard component heights */
export const sizes = {
  button: 36,
  input: 64,
  navBar: 64,
  navBarLg: 80,
} as const;

export type Spacing = typeof spacing;
export type Sizes = typeof sizes;
