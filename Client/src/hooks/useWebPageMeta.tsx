import { useFocusEffect, useSegments } from 'expo-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { resolveDefaultWebPageTitle } from '@/constants/webPageMeta';

export type WebPageMeta = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: ReactNode;
};

type WebPageMetaContextValue = {
  meta: WebPageMeta;
  setMeta: (meta: WebPageMeta) => void;
  clearMeta: () => void;
};

const WebPageMetaContext = createContext<WebPageMetaContextValue | null>(null);

function metaEquals(a: WebPageMeta, b: WebPageMeta) {
  return (
    a.title === b.title &&
    a.subtitle === b.subtitle &&
    a.showBack === b.showBack
  );
}

export function WebPageMetaProvider({ children }: { children: ReactNode }) {
  const segments = useSegments();
  const segmentKey = segments.join('/');
  const [meta, setMetaState] = useState<WebPageMeta>({});

  const setMeta = useCallback((next: WebPageMeta) => {
    setMetaState((prev) => (metaEquals(prev, next) ? prev : next));
  }, []);

  const clearMeta = useCallback(() => {
    setMetaState((prev) => (Object.keys(prev).length === 0 ? prev : {}));
  }, []);

  /** Drop stale overrides when the active route changes (e.g. tab switches). */
  useEffect(() => {
    setMetaState((prev) => (Object.keys(prev).length === 0 ? prev : {}));
  }, [segmentKey]);

  const resolvedMeta = useMemo<WebPageMeta>(() => {
    const defaultTitle = resolveDefaultWebPageTitle(segments);
    return {
      title: meta.title ?? defaultTitle,
      subtitle: meta.subtitle,
      showBack: meta.showBack,
      onBack: meta.onBack,
      actions: meta.actions,
    };
  }, [meta, segments]);

  const value = useMemo(
    () => ({
      meta: resolvedMeta,
      setMeta,
      clearMeta,
    }),
    [resolvedMeta, setMeta, clearMeta],
  );

  return (
    <WebPageMetaContext.Provider value={value}>{children}</WebPageMetaContext.Provider>
  );
}

export function useWebPageMetaContext(): WebPageMetaContextValue | null {
  return useContext(WebPageMetaContext);
}

/**
 * Register page header metadata for the wide-web shell header.
 * Only applies while the screen is focused so background tabs cannot
 * overwrite the active page title. No-op outside provider.
 */
export function useWebPageMeta(meta: WebPageMeta) {
  const setMeta = useWebPageMetaContext()?.setMeta;
  const metaRef = useRef(meta);
  const isFocusedRef = useRef(false);

  metaRef.current = meta;

  useFocusEffect(
    useCallback(() => {
      if (!setMeta) return;
      isFocusedRef.current = true;
      setMeta(metaRef.current);
      return () => {
        isFocusedRef.current = false;
      };
    }, [setMeta]),
  );

  /** Refresh header when title/back/actions change while this screen stays focused. */
  useEffect(() => {
    if (!setMeta || !isFocusedRef.current) return;
    setMeta(metaRef.current);
  }, [meta.title, meta.subtitle, meta.showBack, setMeta]);
}
