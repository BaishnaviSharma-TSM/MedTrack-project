import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function VisitDetailSkeleton() {
  return (
    <View
      style={[styles.whiteCard, { flex: 1 }]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading visit"
    >
      <View style={styles.rowBetween}>
        <ShimmerBone width="28%" height={18} radius={6} />
        <ShimmerBone width={168} height={40} radius={12} />
      </View>
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <View key={sectionIndex} style={styles.footerMeta}>
          <ShimmerBone width="22%" height={12} radius={6} />
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.detailRow}>
              <ShimmerBone width="35%" height={13} radius={6} />
              <ShimmerBone width="40%" height={14} radius={6} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
