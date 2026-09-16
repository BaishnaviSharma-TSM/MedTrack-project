import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';

import { darkColors, lightColors, type ThemeMode, type ThemePalette } from './palettes';

const STORAGE_KEY = 'medtrack_theme_mode';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemePalette;
  isDark: boolean;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  colors: lightColors,
  isDark: false,
  toggle: () => {},
  setMode: () => {},
});

function readStoredMode(): ThemeMode | null {
  try {
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    }
  } catch {
    /* storage unavailable */
  }
  return null;
}

function writeStoredMode(mode: ThemeMode) {
  try {
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  } catch {
    /* storage unavailable */
  }
}

/**
 * Injects a <style> tag on web that applies smooth CSS transitions
 * for background-color and color changes across the entire app.
 */
function injectWebTransitions() {
  if (Platform.OS !== 'web') return;
  const id = 'medtrack-theme-transitions';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    *, *::before, *::after {
      transition: background-color 0.3s ease, color 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode() ?? 'dark');

  useEffect(() => {
    injectWebTransitions();
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    writeStoredMode(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      writeStoredMode(next);
      return next;
    });
  }, []);

  const colors = mode === 'dark' ? darkColors : lightColors;
  const isDark = mode === 'dark';

  const value = useMemo(
    () => ({ mode, colors, isDark, toggle, setMode }),
    [mode, colors, isDark, toggle, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Access the current theme palette and mode. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/** Shorthand — returns only the active color palette. */
export function useThemeColors(): ThemePalette {
  return useContext(ThemeContext).colors;
}
