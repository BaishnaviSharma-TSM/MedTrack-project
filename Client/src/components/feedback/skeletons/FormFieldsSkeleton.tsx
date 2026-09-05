import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function FormFieldsSkeleton() {
  return (
    <View
      style={styles.formStack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading form"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.formStack}>
          <ShimmerBone width="30%" height={13} radius={6} />
          <ShimmerBone height={56} radius={20} />
        </View>
      ))}
      <View style={styles.chipRow}>
        <ShimmerBone width={72} height={36} radius={999} />
        <ShimmerBone width={84} height={36} radius={999} />
        <ShimmerBone width={76} height={36} radius={999} />
      </View>
    </View>
  );
}
