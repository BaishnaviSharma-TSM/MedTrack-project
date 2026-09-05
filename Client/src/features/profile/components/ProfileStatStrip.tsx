import { Text, View } from 'react-native';

import styles from '@/styles/profile/profile-stat-strip.styles';

type ProfileStatStripProps = {
  totalPatients: number;
  totalVisits: number;
};

export function ProfileStatStrip({ totalPatients, totalVisits }: ProfileStatStripProps) {
  return (
    <View style={styles.row}>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{totalPatients}</Text>
        <Text style={styles.statLabel}>Patients managed</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{totalVisits}</Text>
        <Text style={styles.statLabel}>Visits logged</Text>
      </View>
    </View>
  );
}
