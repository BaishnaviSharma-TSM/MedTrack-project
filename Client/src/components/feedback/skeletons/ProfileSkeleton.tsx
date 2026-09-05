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
        <ShimmerBone width={72} height={72} radius={36} />
        <View style={styles.wrap}>
          <ShimmerBone width="70%" height={20} radius={6} />
          <ShimmerBone width="50%" height={14} radius={6} />
          <ShimmerBone width={88} height={22} radius={999} />
        </View>
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

      <View style={styles.whiteCard}>
        <ShimmerBone width="40%" height={16} radius={6} />
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.detailRow}>
            <ShimmerBone width="30%" height={13} radius={6} />
            <ShimmerBone width="40%" height={14} radius={6} />
          </View>
        ))}
      </View>

      <ShimmerBone height={56} radius={20} />
      <ShimmerBone height={56} radius={20} />
    </View>
  );
}
