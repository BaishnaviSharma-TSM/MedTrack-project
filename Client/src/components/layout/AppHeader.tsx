import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MedTrackLogoHorizontal } from '@/components/ui';
import styles from '@/styles/layout/app-header.styles';

const HEADER_VERTICAL_PADDING = 14;

/** Top bar — MedTrack logo only (profile moved to bottom nav) */
export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: HEADER_VERTICAL_PADDING + insets.top }]}>
      <MedTrackLogoHorizontal height={36} />
    </View>
  );
}
