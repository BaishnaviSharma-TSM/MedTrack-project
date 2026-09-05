import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function DashboardSkeleton() {
  return (
    <View
      style={styles.stack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading dashboard"
    >
      <View style={styles.statGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.statCard}>
            <ShimmerBone width={72} height={28} radius={8} />
            <ShimmerBone width="70%" height={12} radius={6} />
          </View>
        ))}
      </View>

      <View style={styles.whiteCard}>
        <ShimmerBone width="45%" height={16} radius={6} />
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.chartBarRow}>
            <ShimmerBone width={88} height={12} radius={6} />
            <View style={styles.wrap}>
              <ShimmerBone height={10} radius={5} />
            </View>
            <ShimmerBone width={20} height={12} radius={6} />
          </View>
        ))}
      </View>

      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.listRow}>
          <ShimmerBone width="35%" height={12} radius={6} />
          <ShimmerBone width="70%" height={14} radius={6} />
          <ShimmerBone width="50%" height={12} radius={6} />
        </View>
      ))}
    </View>
  );
}
