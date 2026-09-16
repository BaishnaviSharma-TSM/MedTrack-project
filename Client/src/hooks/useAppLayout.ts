import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export const WIDE_LAYOUT_BREAKPOINT = 768;

export type AppLayoutMode = 'compact' | 'wide';

/**
 * Responsive layout helper.
 * Native always uses compact (mobile tab bar).
 * Web switches to wide sidebar at >= 768px viewport width.
 */
export function useAppLayout(): AppLayoutMode {
  const { width } = useWindowDimensions();
  const [mode, setMode] = useState<AppLayoutMode>(() => resolveLayoutMode(width));

  useEffect(() => {
    setMode(resolveLayoutMode(width));
  }, [width]);

  return mode;
}

export function resolveLayoutMode(width: number): AppLayoutMode {
  if (Platform.OS !== 'web') {
    return 'compact';
  }
  return width >= WIDE_LAYOUT_BREAKPOINT ? 'wide' : 'compact';
}

export function useIsWideLayout(): boolean {
  return useAppLayout() === 'wide';
}
