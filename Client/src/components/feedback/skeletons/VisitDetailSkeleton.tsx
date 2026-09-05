import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function VisitDetailSkeleton() {
  return (
    <View
      style={styles.stack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading visit"
    >
      {Array.from({ length: 3 }).map((_, cardIndex) => (
        <View key={cardIndex} style={styles.whiteCard}>
          <ShimmerBone width="32%" height={16} radius={6} />
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.detailRow}>
              <ShimmerBone width="35%" height={13} radius={6} />
              <ShimmerBone width="40%" height={14} radius={6} />
            </View>
          ))}
        </View>
      ))}
      <ShimmerBone height={56} radius={20} />
    </View>
  );
}
