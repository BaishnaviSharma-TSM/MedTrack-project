import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { FormFieldsSkeleton } from '@/components/feedback';
import { PageHeader, ScreenContainer } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import {
  PatientInfoStep,
  type PatientDemographics,
} from '@/features/patients/components/PatientInfoStep';
import { getPatientById, updatePatient } from '@/features/patients/services/patientService';
import styles from '@/styles/patients/add-patient-wizard.styles';

function validateDemographics(values: PatientDemographics) {
  const errors: Partial<Record<keyof PatientDemographics, string>> = {};

  if (!values.name.trim()) {
    errors.name = 'Patient name is required.';
  }

  const age = Number(values.age);
  if (!values.age || Number.isNaN(age) || age < 1 || age > 120) {
    errors.age = 'Enter a valid age between 1 and 120.';
  }

  if (!values.gender) {
    errors.gender = 'Select a gender.';
  }

  if (!values.contactNumber || values.contactNumber.length < 10) {
    errors.contactNumber = 'Enter a valid 10-digit contact number.';
  }

  return errors;
}

/** Phase 2.4 — Edit patient demographics */
export default function EditPatientScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [demographics, setDemographics] = useState<PatientDemographics>({
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PatientDemographics, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPatientById(id)
      .then((patient) => {
        if (!patient) return;
        setDemographics({
          name: patient.name,
          age: String(patient.age),
          gender: patient.gender,
          contactNumber: patient.contactNumber,
        });
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function updateDemographics<K extends keyof PatientDemographics>(
    field: K,
    value: PatientDemographics[K],
  ) {
    setDemographics((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSave() {
    if (!id) return;

    const validationErrors = validateDemographics(demographics);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await updatePatient(id, {
        name: demographics.name.trim(),
        age: Number(demographics.age),
        gender: demographics.gender as 'male' | 'female' | 'other',
        contactNumber: demographics.contactNumber.trim(),
      });
      router.back();
    } catch {
      setSubmitError('Could not update patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer fullWidth>
        <PageHeader title="Edit Patient" onBack={() => router.back()} />
        <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
          <FormFieldsSkeleton />
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer fullWidth>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <PageHeader title="Edit Patient" onBack={() => router.back()} />

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <PatientInfoStep values={demographics} errors={errors} onChange={updateDemographics} />
        </ScrollView>

        <View style={styles.footer}>
          {submitError ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{submitError}</Text>
            </View>
          ) : null}
          <ClayButton
            label={isSubmitting ? 'Saving…' : 'Save Changes'}
            onPress={handleSave}
            disabled={isSubmitting}
            style={styles.primaryButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
