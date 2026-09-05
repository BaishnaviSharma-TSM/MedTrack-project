import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

export function PatientPickerSkeleton() {
  return (
    <View
      style={styles.listStack}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading patients"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.patientPickCard}>
          <ShimmerBone width="55%" height={16} radius={6} />
          <ShimmerBone width="70%" height={13} radius={6} />
        </View>
      ))}
    </View>
  );
}
