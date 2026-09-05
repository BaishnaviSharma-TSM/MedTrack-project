import { Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import styles from '@/styles/components/medtrack-logo-horizontal.styles';

type MedTrackLogoHorizontalProps = {
  height?: number;
};

/** Horizontal logo from assets/medtrack-logo (2).svg — icon + inline wordmark */
export function MedTrackLogoHorizontal({ height = 36 }: MedTrackLogoHorizontalProps) {
  const iconSize = height * (100 / 110);
  const wordmarkSize = height * 0.52;

  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Svg viewBox="0 0 100 110" width={iconSize} height={height}>
          <Rect width={100} height={100} rx={22} fill="#0B7285" x={0} y={5} />
          <Rect x={22} y={48} width={56} height={18} rx={3} fill="#FFFFFF" />
          <Rect x={41} y={29} width={18} height={56} rx={3} fill="#FFFFFF" />
          <Rect x={65} y={77} width={5} height={16} rx={2.5} fill="#FFFFFF" opacity={0.35} />
          <Rect x={73} y={69} width={5} height={24} rx={2.5} fill="#FFFFFF" opacity={0.65} />
          <Rect x={81} y={61} width={5} height={32} rx={2.5} fill="#FFFFFF" />
        </Svg>
      </View>
      <View style={styles.wordmarkRow}>
        <Text style={[styles.med, { fontSize: wordmarkSize }]}>Med</Text>
        <Text style={[styles.track, { fontSize: wordmarkSize }]}>Track</Text>
      </View>
    </View>
  );
}
