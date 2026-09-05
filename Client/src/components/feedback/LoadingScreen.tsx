import { View } from 'react-native';

import { screenStyle } from '@/theme';

/** Blank canvas while fonts or session load — logo lives only on LogoSplash. */
export function LoadingScreen() {
  return <View style={screenStyle} />;
}
