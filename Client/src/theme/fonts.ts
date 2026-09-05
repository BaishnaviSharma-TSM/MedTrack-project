import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';

/** Font map passed to useFonts — spread into useClayFonts */
export const clayFontMap = {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} as const;

/** Hook to load all clay typography fonts before first paint */
export function useClayFonts() {
  const [loaded, error] = useFonts(clayFontMap);
  return { loaded, error };
}
