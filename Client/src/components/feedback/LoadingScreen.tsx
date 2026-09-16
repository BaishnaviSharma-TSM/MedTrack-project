import { View } from 'react-native';

import { useTheme } from '@/theme';

/** Blank canvas while fonts or session load — logo lives only on LogoSplash. */
export function LoadingScreen() {
  const { colors } = useTheme();
  return <View style={{ flex: 1, backgroundColor: colors.canvas }} />;
}
