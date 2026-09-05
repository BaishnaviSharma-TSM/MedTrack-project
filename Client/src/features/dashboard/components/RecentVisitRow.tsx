import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { getConditionLabel } from '@/features/visits/services/visitRecordService';
import { buildVitalsSummary } from '@/features/visits/utils/buildVitalsSummary';
import type { VisitRecord } from '@/features/visits/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import styles from '@/styles/dashboard/recent-visit-row.styles';

type RecentVisitRowProps = {
  record: VisitRecord;
};

export function RecentVisitRow({ record }: RecentVisitRowProps) {
  const router = useRouter();
  const { visit, patient } = record;

  return (
    <Pressable
      style={styles.row}
      onPress={() => router.push(`/(app)/visits/${visit.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`Open visit for ${patient.name}`}
    >
      <Text style={styles.date}>{formatDisplayDate(visit.visitDate)}</Text>
      <Text style={styles.patientName}>{patient.name}</Text>
      <Text style={styles.condition}>{getConditionLabel(visit.condition)}</Text>
      <Text style={styles.vitals} numberOfLines={1}>
        {buildVitalsSummary(visit.vitals, 2)}
      </Text>
    </Pressable>
  );
}
