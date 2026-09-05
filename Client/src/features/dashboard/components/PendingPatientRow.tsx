import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { Patient } from '@/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import styles from '@/styles/dashboard/pending-patient-row.styles';

type PendingPatientRowProps = {
  patient: Patient;
};

export function PendingPatientRow({ patient }: PendingPatientRowProps) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.info}
        onPress={() => router.push(`/(app)/patients/${patient.id}`)}
        accessibilityRole="button"
        accessibilityLabel={`Open profile for ${patient.name}`}
      >
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.meta}>
          {patient.uniqueId} · Registered {formatDisplayDate(patient.createdAt)}
        </Text>
      </Pressable>

      <Pressable
        style={styles.recordButton}
        onPress={() => router.push(`/(app)/visits/new?patientId=${patient.id}`)}
        accessibilityRole="button"
        accessibilityLabel={`Record visit for ${patient.name}`}
      >
        <Text style={styles.recordButtonText}>Record</Text>
      </Pressable>
    </View>
  );
}
