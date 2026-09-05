import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { ClayButton } from '@/components/ui';
import { PageHeader } from '@/components/layout';
import styles from '@/styles/patients/add-patient-wizard.styles';

import { PatientInfoStep, type PatientDemographics } from './PatientInfoStep';
import { createPatient } from '../services/patientService';

const INITIAL_DEMOGRAPHICS: PatientDemographics = {
  name: '',
  age: '',
  gender: '',
  contactNumber: '',
};

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

type SaveIntent = 'list' | 'visit';

/** PRD 2.1 — Registration captures demographics only; visits are recorded in Phase 3 flow. */
export function AddPatientWizard() {
  const router = useRouter();
  const [demographics, setDemographics] = useState<PatientDemographics>(INITIAL_DEMOGRAPHICS);
  const [errors, setErrors] = useState<Partial<Record<keyof PatientDemographics, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSave(intent: SaveIntent) {
    const validationErrors = validateDemographics(demographics);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const patient = await createPatient({
        name: demographics.name.trim(),
        age: Number(demographics.age),
        gender: demographics.gender as 'male' | 'female' | 'other',
        contactNumber: demographics.contactNumber,
        uniqueId: 'pending',
      });

      if (intent === 'visit') {
        router.replace(`/(app)/visits/new?patientId=${patient.id}`);
      } else {
        router.replace('/(app)/(tabs)/patients');
      }
    } catch {
      setSubmitError('Could not save patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <PageHeader title="Add Patient" onBack={() => router.back()} background="canvas" />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PatientInfoStep
          values={demographics}
          errors={errors}
          onChange={updateDemographics}
        />
      </ScrollView>

      <View style={styles.footer}>
        {submitError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{submitError}</Text>
          </View>
        ) : null}

        <ClayButton
          label={isSubmitting ? 'Saving…' : 'Save Patient'}
          onPress={() => handleSave('list')}
          disabled={isSubmitting}
          style={styles.primaryButton}
        />
        <ClayButton
          label="Save & Record Visit"
          variant="outline"
          onPress={() => handleSave('visit')}
          disabled={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
