import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function PatientProfileSkeleton() {
  return (
    <View
      style={styles.stack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading patient profile"
    >
      <View style={styles.whiteCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <ShimmerBone width={52} height={52} radius={26} />
            <View style={styles.wrap}>
              <ShimmerBone width="65%" height={18} radius={6} />
              <ShimmerBone width="40%" height={13} radius={6} />
            </View>
          </View>
          <ShimmerBone width={96} height={40} radius={12} />
        </View>
        <ShimmerBone width="35%" height={16} radius={6} />
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.detailRow}>
            <ShimmerBone width="40%" height={13} radius={6} />
            <ShimmerBone width="40%" height={13} radius={6} />
          </View>
        ))}
      </View>

      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.statBox}>
            <ShimmerBone width={56} height={14} radius={6} />
            <ShimmerBone width={64} height={11} radius={6} />
          </View>
        ))}
      </View>

      <View style={styles.whiteCard}>
        <View style={styles.rowBetween}>
          <ShimmerBone width="35%" height={16} radius={6} />
          <ShimmerBone width={112} height={40} radius={12} />
        </View>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.listRow}>
            <ShimmerBone width="30%" height={12} radius={6} />
            <ShimmerBone width="55%" height={15} radius={6} />
            <ShimmerBone width="80%" height={12} radius={6} />
          </View>
        ))}
      </View>
    </View>
  );
}
