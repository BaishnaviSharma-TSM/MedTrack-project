import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PatientPickerSkeleton } from '@/components/feedback';
import { ClayInput } from '@/components/ui';
import { getPatients } from '@/features/patients/services/patientService';
import type { Patient } from '@/types';
import styles from '@/styles/visits/patient-select-step.styles';

type PatientSelectStepProps = {
  selectedPatientId: string;
  error?: string;
  onSelect: (patient: Patient) => void;
};

/** PRD 3.3 — A visit must be attached to an already-registered patient. */
export function PatientSelectStep({
  selectedPatientId,
  error,
  onSelect,
}: PatientSelectStepProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPatients()
      .then(setPatients)
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = patients.filter((patient) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      patient.name.toLowerCase().includes(q) ||
      patient.uniqueId.toLowerCase().includes(q) ||
      patient.contactNumber.includes(q)
    );
  });

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.sectionTitle}>Select patient</Text>

      <ClayInput
        placeholder="Search by name, ID, or phone"
        value={search}
        onChangeText={setSearch}
        variant="flat"
      />

      <View style={styles.list}>
        {isLoading ? (
          <PatientPickerSkeleton />
        ) : (
          filtered.map((patient) => {
            const selected = patient.id === selectedPatientId;
            return (
              <Pressable
                key={patient.id}
                style={[styles.patientCard, selected && styles.patientCardSelected]}
                onPress={() => onSelect(patient)}
              >
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientMeta}>
                  {patient.uniqueId} · {patient.age} yrs · {patient.contactNumber}
                </Text>
              </Pressable>
            );
          })
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
