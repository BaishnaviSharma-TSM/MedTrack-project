import { Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import styles from '@/styles/components/medtrack-logo.styles';

const ICON_SIZES = {
  sm: 56,
  md: 72,
  lg: 88,
} as const;

const WORDMARK_SIZES = {
  sm: 26,
  md: 32,
  lg: 38,
} as const;

export type MedTrackLogoSize = keyof typeof ICON_SIZES;

type MedTrackLogoProps = {
  size?: MedTrackLogoSize;
  showWordmark?: boolean;
};

function MedTrackIcon({ size }: { size: number }) {
  return (
    <View style={styles.iconShadow}>
      <Svg viewBox="0 0 400 400" width={size} height={size}>
        <Rect width={400} height={400} rx={90} fill="#0B7285" />
        <Rect x={90} y={162} width={220} height={76} rx={13} fill="#FFFFFF" />
        <Rect x={162} y={90} width={76} height={220} rx={13} fill="#FFFFFF" />
        <Rect x={254} y={320} width={18} height={30} rx={9} fill="#FFFFFF" opacity={0.35} />
        <Rect x={278} y={300} width={18} height={50} rx={9} fill="#FFFFFF" opacity={0.65} />
        <Rect x={302} y={280} width={18} height={70} rx={9} fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

/** MedTrack brand mark — icon from SVG + native wordmark for crisp text */
export function MedTrackLogo({ size = 'md', showWordmark = true }: MedTrackLogoProps) {
  const iconSize = ICON_SIZES[size];
  const wordmarkSize = WORDMARK_SIZES[size];

  return (
    <View style={styles.container}>
      <MedTrackIcon size={iconSize} />
      {showWordmark ? (
        <View style={styles.wordmarkRow}>
          <Text style={[styles.med, { fontSize: wordmarkSize }]}>Med</Text>
          <Text style={[styles.track, { fontSize: wordmarkSize }]}>Track</Text>
        </View>
      ) : null}
    </View>
  );
}
