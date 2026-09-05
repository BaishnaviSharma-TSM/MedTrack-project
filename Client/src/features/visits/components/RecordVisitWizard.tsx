import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { ConditionGridSkeleton } from '@/components/feedback';
import { PageHeader } from '@/components/layout';
import { ClayButton, ClayInput } from '@/components/ui';
import { useConditions } from '@/features/conditions/hooks/useConditions';
import { getPatientById } from '@/features/patients/services/patientService';
import type { Patient } from '@/types';
import styles from '@/styles/visits/record-visit-wizard.styles';

import { ConditionSelectStep } from './ConditionSelectStep';
import { DynamicVitalsForm } from './DynamicVitalsForm';
import { PatientSelectStep } from './PatientSelectStep';
import { VisitSelectionSummary } from './VisitSelectionSummary';
import { VisitStepper, type VisitStepNumber } from './VisitStepper';
import { getConditionLabel } from '../services/visitRecordService';
import { createVisit } from '../services/visitService';
import { buildVitals } from '../utils/buildVitals';
import { validateVitals } from '../utils/validateVitals';

type RecordVisitWizardProps = {
  initialPatientId?: string;
};

/**
 * PRD 3.1 condition selector, 3.2 dynamic vitals form, 3.3 save visit.
 * The doctor picks a patient, saves a condition, and only then does the
 * condition-specific vitals form render.
 */
export function RecordVisitWizard({ initialPatientId }: RecordVisitWizardProps) {
  const router = useRouter();
  const params = useLocalSearchParams<{ patientId?: string }>();
  const patientId = initialPatientId ?? params.patientId;

  const { conditions, isLoading: isConditionsLoading } = useConditions();
  const [step, setStep] = useState<VisitStepNumber>(1);
  const [highestReached, setHighestReached] = useState<VisitStepNumber>(1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [condition, setCondition] = useState('');
  const [patientError, setPatientError] = useState<string | undefined>();
  const [conditionError, setConditionError] = useState<string | undefined>();
  const [vitalValues, setVitalValues] = useState<Record<string, string | boolean | undefined>>({});
  const [vitalErrors, setVitalErrors] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!patientId) return;
    getPatientById(patientId).then((patient) => {
      if (!patient) return;
      setSelectedPatient(patient);
      setStep(2);
      setHighestReached((current) => (current < 2 ? 2 : current));
    });
  }, [patientId]);

  function goToStep(next: VisitStepNumber) {
    setStep(next);
    setHighestReached((current) => (next > current ? next : current));
  }

  function handlePatientSelect(patient: Patient) {
    setSelectedPatient(patient);
    setPatientError(undefined);
  }

  function handleConditionSelect(value: string) {
    setCondition(value);
    setConditionError(undefined);
    setVitalValues({});
    setVitalErrors({});
  }

  const selectedCondition = conditions.find((item) => item.slug === condition);

  function updateVital(key: string, value: string | boolean) {
    setVitalValues((current) => ({ ...current, [key]: value }));
    setVitalErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  /** Step 1 → 2: lock in the patient this visit belongs to. */
  function handleConfirmPatient() {
    if (!selectedPatient) {
      setPatientError('Select a patient to continue.');
      return;
    }
    goToStep(2);
  }

  /** Step 2 → 3 (PRD 3.1 → 3.2): saving the condition is what renders the vitals form. */
  function handleSaveCondition() {
    if (!condition) {
      setConditionError('Select a condition to load its vitals form.');
      return;
    }
    setSubmitError(null);
    goToStep(3);
  }

  /** PRD 3.3 — persist patient + date + vitals as one visit record. */
  async function handleSaveVisit() {
    if (!selectedPatient || !selectedCondition) return;

    const errors = validateVitals(selectedCondition.fields, vitalValues);
    setVitalErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const visit = await createVisit({
        patientId: selectedPatient.id,
        condition: selectedCondition.slug,
        vitals: buildVitals(selectedCondition.fields, vitalValues),
        notes: notes.trim() || undefined,
        visitDate: new Date().toISOString(),
      });

      router.replace(`/(app)/visits/${visit.id}`);
    } catch {
      setSubmitError('Could not save visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    if (step === 3) {
      setStep(2);
      return;
    }
    if (step === 2 && !patientId) {
      setStep(1);
      return;
    }
    router.back();
  }

  const summaryItems = [
    ...(step >= 2 && selectedPatient
      ? [
          {
            label: 'Patient',
            value: `${selectedPatient.name} · ${selectedPatient.uniqueId}`,
            onChange: patientId ? undefined : () => setStep(1),
          },
        ]
      : []),
    ...(step === 3 && condition
      ? [
          {
            label: 'Condition',
            value: getConditionLabel(condition),
            onChange: () => setStep(2),
          },
        ]
      : []),
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <PageHeader title="Record Visit" onBack={handleBack} background="canvas" />

      <View style={styles.stepperWrap}>
        <VisitStepper current={step} highestReached={highestReached} onStepPress={setStep} />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <VisitSelectionSummary items={summaryItems} />

        {step === 1 ? (
          <PatientSelectStep
            selectedPatientId={selectedPatient?.id ?? ''}
            error={patientError}
            onSelect={handlePatientSelect}
          />
        ) : null}

        {step === 2 ? (
          isConditionsLoading ? (
            <ConditionGridSkeleton />
          ) : (
            <ConditionSelectStep
              conditions={conditions}
              value={condition}
              error={conditionError}
              onChange={handleConditionSelect}
            />
          )
        ) : null}

        {step === 3 && selectedCondition ? (
          <>
            <DynamicVitalsForm
              condition={selectedCondition}
              values={vitalValues}
              errors={vitalErrors}
              onChange={updateVital}
              title={`${getConditionLabel(condition)} vitals`}
            />

            <View style={styles.notesBlock}>
              <ClayInput
                label="Visit notes (optional)"
                placeholder="Observations, advice, follow-up plan"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                style={styles.notesInput}
              />
            </View>
          </>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {submitError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{submitError}</Text>
          </View>
        ) : null}

        {step === 1 ? (
          <ClayButton
            label="Confirm Patient"
            onPress={handleConfirmPatient}
            style={styles.primaryButton}
          />
        ) : null}

        {step === 2 ? (
          <ClayButton
            label="Save Condition & Load Form"
            onPress={handleSaveCondition}
            style={styles.primaryButton}
          />
        ) : null}

        {step === 3 ? (
          <ClayButton
            label={isSubmitting ? 'Saving…' : 'Save Visit'}
            onPress={handleSaveVisit}
            disabled={isSubmitting}
            style={styles.primaryButton}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
