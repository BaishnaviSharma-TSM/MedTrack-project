import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { PatientProfileSkeleton } from '@/components/feedback';
import { PageHeader, ScreenContainer } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import { getPatientById } from '@/features/patients/services/patientService';
import { getVisitsByPatient } from '@/features/visits/services/visitService';
import { getConditionLabel } from '@/features/visits/services/visitRecordService';
import { buildVitalsSummary } from '@/features/visits/utils/buildVitalsSummary';
import type { Patient, Visit } from '@/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import styles from '@/styles/screens/patient-profile.styles';
import { colors } from '@/theme';

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

type DetailRowProps = { label: string; value: string };

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

/** PRD 2.3 — Full patient details, and 3.4 — visit history in chronological order. */
export default function PatientProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      let active = true;

      Promise.all([getPatientById(id), getVisitsByPatient(id)])
        .then(([foundPatient, patientVisits]) => {
          if (!active) return;
          setPatient(foundPatient);
          setVisits(patientVisits);
        })
        .finally(() => {
          if (active) setIsLoading(false);
        });

      return () => {
        active = false;
      };
    }, [id]),
  );

  const lastVisit = visits[0];

  return (
    <ScreenContainer fullWidth>
      <PageHeader title="Patient Profile" onBack={() => router.back()} background="canvas" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <PatientProfileSkeleton />
        ) : !patient ? (
          <Text style={styles.muted}>Patient not found.</Text>
        ) : (
          <>
            <View style={styles.identityCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{patient.name.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.identityText}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientId}>{patient.uniqueId}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{visits.length}</Text>
                <Text style={styles.statLabel}>Total visits</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {lastVisit ? formatDisplayDate(lastVisit.visitDate) : '—'}
                </Text>
                <Text style={styles.statLabel}>Last visit</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue} numberOfLines={1}>
                  {lastVisit ? getConditionLabel(lastVisit.condition) : '—'}
                </Text>
                <Text style={styles.statLabel}>Last condition</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Patient details</Text>
              <DetailRow label="Full name" value={patient.name} />
              <DetailRow label="Patient ID" value={patient.uniqueId} />
              <DetailRow label="Age" value={`${patient.age} yrs`} />
              <DetailRow label="Gender" value={formatGender(patient.gender)} />
              <DetailRow label="Contact" value={patient.contactNumber} />
              <DetailRow label="Registered on" value={formatDisplayDate(patient.createdAt)} />
            </View>

            <ClayButton
              label="Record Visit"
              onPress={() => router.push(`/(app)/visits/new?patientId=${patient.id}`)}
              style={styles.recordButton}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Visit history</Text>
              <Text style={styles.sectionCount}>{visits.length}</Text>
            </View>

            {visits.length === 0 ? (
              <Text style={styles.muted}>
                No visits recorded yet. Tap Record Visit to log the first one.
              </Text>
            ) : (
              visits.map((visit) => (
                <Pressable
                  key={visit.id}
                  style={styles.historyCard}
                  onPress={() => router.push(`/(app)/visits/${visit.id}`)}
                  accessibilityRole="button"
                  accessibilityLabel={`Open visit from ${formatDisplayDate(visit.visitDate)}`}
                >
                  <View style={styles.historyMain}>
                    <Text style={styles.historyDate}>{formatDisplayDate(visit.visitDate)}</Text>
                    <Text style={styles.historyCondition}>
                      {getConditionLabel(visit.condition)}
                    </Text>
                    <Text style={styles.historyVitals} numberOfLines={2}>
                      {buildVitalsSummary(visit.vitals)}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color={colors.muted} />
                </Pressable>
              ))
            )}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
