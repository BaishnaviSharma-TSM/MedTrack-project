import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { PatientRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import styles from '@/styles/screens/patients-tab.styles';
import { colors } from '@/theme';

type PatientRecordCardProps = {
  record: PatientRecord;
};

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

/** PRD 2.2 — Basic details only; full record lives on the patient profile (2.3). */
export function PatientRecordCard({ record }: PatientRecordCardProps) {
  const router = useRouter();
  const { patient, visitCount, lastVisitDate } = record;

  return (
    <Pressable
      style={styles.recordCard}
      onPress={() => router.push(`/(app)/patients/${patient.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`Open profile for ${patient.name}`}
    >
      <View style={styles.recordCardHeader}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <View style={styles.idBadge}>
          <Text style={styles.idBadgeText}>{patient.uniqueId}</Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <Feather name="user" size={14} color={colors.muted} />
        <Text style={styles.detailText}>
          {patient.age} yrs · {formatGender(patient.gender)}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Feather name="phone" size={14} color={colors.muted} />
        <Text style={styles.detailText}>{patient.contactNumber}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.footerMeta}>
          {visitCount === 0
            ? 'No visits yet'
            : `${visitCount} visit${visitCount > 1 ? 's' : ''} · Last ${formatDisplayDate(lastVisitDate)}`}
        </Text>
        <Feather name="chevron-right" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}
