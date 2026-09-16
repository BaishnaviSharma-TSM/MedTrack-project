import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function ProfileSkeleton() {
  return (
    <View
      style={styles.stack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading profile"
    >
      <View style={styles.identityCard}>
        <View style={styles.wrap}>
          <ShimmerBone width="42%" height={20} radius={6} />
          <ShimmerBone width="55%" height={14} radius={6} />
        </View>
        <ShimmerBone width={96} height={36} radius={8} />
        <ShimmerBone width={88} height={36} radius={8} />
      </View>

      <View style={styles.whiteCard}>
        <ShimmerBone width="36%" height={16} radius={6} />
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.rowBetween}>
            <View style={styles.wrap}>
              <ShimmerBone width="30%" height={12} radius={6} />
              <ShimmerBone height={42} radius={10} />
            </View>
            <View style={styles.wrap}>
              <ShimmerBone width="30%" height={12} radius={6} />
              <ShimmerBone height={42} radius={10} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.row}>
        <View style={styles.statBox}>
          <ShimmerBone width={48} height={22} radius={6} />
          <ShimmerBone width={72} height={12} radius={6} />
        </View>
        <View style={styles.statBox}>
          <ShimmerBone width={48} height={22} radius={6} />
          <ShimmerBone width={72} height={12} radius={6} />
        </View>
      </View>
    </View>
  );
}
