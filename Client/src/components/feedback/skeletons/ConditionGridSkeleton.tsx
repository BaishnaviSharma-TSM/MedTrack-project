import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function ConditionGridSkeleton() {
  return (
    <View
      style={styles.stack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading conditions"
    >
      <ShimmerBone width="50%" height={18} radius={6} />
      <ShimmerBone width="80%" height={13} radius={6} />
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.conditionCard}>
          <ShimmerBone width="45%" height={16} radius={6} />
          <ShimmerBone width="35%" height={13} radius={6} />
        </View>
      ))}
    </View>
  );
}
