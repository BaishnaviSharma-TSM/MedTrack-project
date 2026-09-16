import { useEffect } from 'react';
import { Platform } from 'react-native';

/** Sets the browser document title on web. No-op on native. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    const previousTitle = document.title;
    document.title = title ? `${title} · MedTrack` : 'MedTrack';

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
