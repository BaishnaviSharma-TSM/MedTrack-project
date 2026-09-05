import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { getConditionLabel } from '../services/visitRecordService';
import { buildVitalsSummary } from '../utils/buildVitalsSummary';
import type { VisitRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import styles from '@/styles/screens/visits-tab.styles';

type VisitRecordCardProps = {
  record: VisitRecord;
};

export function VisitRecordCard({ record }: VisitRecordCardProps) {
  const router = useRouter();
  const { visit, patient } = record;

  return (
    <Pressable
      style={styles.recordCard}
      onPress={() => router.push(`/(app)/visits/${visit.id}`)}
    >
      <View style={styles.recordCardHeader}>
        <Text style={styles.recordDate}>{formatDisplayDate(visit.visitDate)}</Text>
        <View style={styles.idBadge}>
          <Text style={styles.idBadgeText}>ID: {patient.uniqueId}</Text>
        </View>
      </View>

      <Text style={styles.recordLine}>
        <Text style={styles.recordLabel}>Patient: </Text>
        <Text style={styles.recordValueStrong}>{patient.name}</Text>
      </Text>

      <Text style={styles.recordLine}>
        <Text style={styles.recordLabel}>Condition: </Text>
        <Text style={styles.recordValue}>{getConditionLabel(visit.condition)}</Text>
      </Text>

      <Text style={styles.recordLine}>
        <Text style={styles.recordLabel}>Vitals: </Text>
        <Text style={styles.recordValue}>{buildVitalsSummary(visit.vitals)}</Text>
      </Text>

      {visit.notes ? (
        <Text style={styles.recordLine}>
          <Text style={styles.recordLabel}>Notes: </Text>
          <Text style={styles.recordValue}>{visit.notes}</Text>
        </Text>
      ) : null}
    </Pressable>
  );
}
