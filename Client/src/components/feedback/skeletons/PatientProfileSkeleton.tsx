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
          <View style={[styles.row, { flex: 1, gap: 16 }]}>
            <View style={styles.row}>
              <ShimmerBone width={28} height={28} radius={8} />
              <ShimmerBone width={48} height={48} radius={24} />
              <View style={styles.wrap}>
                <ShimmerBone width={80} height={18} radius={6} />
                <ShimmerBone width={140} height={12} radius={6} />
              </View>
            </View>
            <ShimmerBone width={1} height={48} radius={1} />
            <View style={[styles.row, { flex: 1, gap: 20 }]}>
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} style={{ gap: 6 }}>
                  <ShimmerBone width={48} height={10} radius={4} />
                  <ShimmerBone width={64} height={14} radius={6} />
                </View>
              ))}
            </View>
          </View>
          <ShimmerBone width={96} height={40} radius={12} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.whiteCard, { flex: 1.4, gap: 12 }]}>
          <ShimmerBone width="45%" height={16} radius={6} />
          <ShimmerBone width="75%" height={12} radius={6} />
          <View style={styles.statGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={[styles.statCard, { minWidth: '30%' }]}>
                <ShimmerBone width="70%" height={11} radius={4} />
                <ShimmerBone width="50%" height={20} radius={6} />
                <ShimmerBone width="85%" height={10} radius={4} />
              </View>
            ))}
          </View>
        </View>
        <View style={{ flex: 0.7, gap: 8 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.listRow}>
              <ShimmerBone width={40} height={40} radius={12} />
              <View style={{ flex: 1, gap: 6 }}>
                <ShimmerBone width="70%" height={14} radius={6} />
                <ShimmerBone width="55%" height={11} radius={6} />
              </View>
            </View>
          ))}
        </View>
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
