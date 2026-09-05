import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

type RecordListSkeletonProps = {
  count?: number;
};

export function RecordListSkeleton({ count = 4 }: RecordListSkeletonProps) {
  return (
    <View accessibilityRole="progressbar" accessibilityLabel="Loading records">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.recordCard}>
          <View style={styles.rowBetween}>
            <ShimmerBone width="48%" height={16} radius={6} />
            <ShimmerBone width={72} height={24} radius={999} />
          </View>
          <ShimmerBone width="70%" height={13} radius={6} />
          <ShimmerBone width="55%" height={13} radius={6} />
          <View style={styles.footerMeta}>
            <ShimmerBone width="40%" height={12} radius={6} />
          </View>
        </View>
      ))}
    </View>
  );
}
