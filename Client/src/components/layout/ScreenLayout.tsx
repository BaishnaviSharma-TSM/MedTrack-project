import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useIsWideLayout } from '@/hooks';
import { useWebPageMeta, type WebPageMeta } from '@/hooks/useWebPageMeta';

import { AppHeader } from './AppHeader';
import { PageHeader } from './PageHeader';

type ScreenLayoutProps = WebPageMeta & {
  children: ReactNode;
  /** PageHeader background on compact layout */
  headerBackground?: 'white' | 'canvas' | 'transparent';
  /** Brand logo header on compact layout (Home). Web still uses `title`.
   *  'none' hides the compact header entirely (screen owns its own chrome). */
  compactHeader?: 'title' | 'brand' | 'none';
};

/**
 * Unified screen wrapper — registers wide-web header meta and renders
 * compact PageHeader on mobile/narrow viewports.
 */
export function ScreenLayout({
  children,
  title,
  subtitle,
  showBack,
  onBack,
  actions,
  headerBackground = 'transparent',
  compactHeader = 'title',
}: ScreenLayoutProps) {
  const isWideLayout = useIsWideLayout();

  useWebPageMeta({
    title,
    subtitle,
    showBack: isWideLayout ? showBack : false,
    onBack,
    actions: isWideLayout ? actions : undefined,
  });

  if (isWideLayout) {
    return <>{children}</>;
  }

  return (
    <View style={{ flex: 1 }}>
      {compactHeader === 'brand' ? (
        <AppHeader />
      ) : compactHeader !== 'none' && title ? (
        <PageHeader
          title={title}
          showBack={showBack}
          onBack={onBack}
          background={headerBackground}
        />
      ) : null}
      {children}
    </View>
  );
}
