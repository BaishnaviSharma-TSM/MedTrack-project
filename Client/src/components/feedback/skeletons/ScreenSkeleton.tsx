import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function ScreenSkeleton() {
  return (
    <View
      style={styles.screenCentered}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <View style={styles.whiteCard}>
        <ShimmerBone width="60%" height={18} radius={6} />
        <ShimmerBone height={12} radius={6} />
        <ShimmerBone width="80%" height={12} radius={6} />
      </View>
      <View style={styles.whiteCard}>
        <ShimmerBone width="40%" height={16} radius={6} />
        <ShimmerBone height={12} radius={6} />
        <ShimmerBone width="70%" height={12} radius={6} />
      </View>
      <View style={styles.whiteCard}>
        <ShimmerBone width="50%" height={16} radius={6} />
        <ShimmerBone height={12} radius={6} />
      </View>
    </View>
  );
}
