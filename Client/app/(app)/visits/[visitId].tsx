import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { VisitDetailSkeleton } from '@/components/feedback';
import { PageHeader, ScreenContainer } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import { getVisitRecordById, getConditionLabel } from '@/features/visits/services/visitRecordService';
import type { VisitRecord } from '@/features/visits/types';
import { formatVitalValue } from '@/features/visits/utils/formatVitalValue';
import { formatDisplayDateTime } from '@/utils/formatDisplayDate';
import styles from '@/styles/screens/visit-detail.styles';

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

/** Phase 3.5 — Visit detail */
export default function VisitDetailScreen() {
  const router = useRouter();
  const { visitId } = useLocalSearchParams<{ visitId: string }>();
  const [record, setRecord] = useState<VisitRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!visitId) return;
    getVisitRecordById(visitId)
      .then(setRecord)
      .finally(() => setIsLoading(false));
  }, [visitId]);

  return (
    <ScreenContainer fullWidth>
      <PageHeader
        title="Visit Detail"
        onBack={() => router.navigate('/(app)/(tabs)/visits')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <VisitDetailSkeleton />
        ) : !record ? (
          <Text style={styles.muted}>Visit not found.</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Patient</Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Name: </Text>
                {record.patient.name}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>ID: </Text>
                {record.patient.uniqueId}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Age / Gender: </Text>
                {record.patient.age} yrs · {formatGender(record.patient.gender)}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Contact: </Text>
                {record.patient.contactNumber}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Visit info</Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Date: </Text>
                {formatDisplayDateTime(record.visit.visitDate)}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Condition: </Text>
                {getConditionLabel(record.visit.condition)}
              </Text>
              {record.visit.severity ? (
                <Text style={styles.line}>
                  <Text style={styles.label}>Severity: </Text>
                  {record.visit.severity.charAt(0).toUpperCase() + record.visit.severity.slice(1)}
                </Text>
              ) : null}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Vitals</Text>
              {record.visit.vitals.map((vital) => (
                <View key={vital.key} style={styles.vitalRow}>
                  <Text style={styles.vitalLabel}>{vital.label}</Text>
                  <Text style={styles.vitalValue}>
                    {formatVitalValue(vital.value)}
                    {typeof vital.value !== 'boolean' && vital.unit ? ` ${vital.unit}` : ''}
                  </Text>
                </View>
              ))}
            </View>

            {record.visit.notes ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Notes</Text>
                <Text style={styles.line}>{record.visit.notes}</Text>
              </View>
            ) : null}

            <ClayButton
              label="View patient profile"
              variant="outline"
              onPress={() => router.push(`/(app)/patients/${record.patient.id}`)}
              style={styles.linkButton}
            />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
