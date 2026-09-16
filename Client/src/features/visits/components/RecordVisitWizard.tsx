import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
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
import { useDocumentTitle, useIsWideLayout } from '@/hooks';
import { useWebPageMeta } from '@/hooks/useWebPageMeta';
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
  const isWideLayout = useIsWideLayout();
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

  useDocumentTitle('Record Visit');
  useWebPageMeta({
    title: 'Record Visit',
    showBack: true,
    onBack: handleBack,
  });

  const formBody = (
    <>
      <VisitSelectionSummary items={summaryItems} isWideLayout={isWideLayout} />

      {step === 1 ? (
        <PatientSelectStep
          selectedPatientId={selectedPatient?.id ?? ''}
          error={patientError}
          onSelect={handlePatientSelect}
          isWideLayout={isWideLayout}
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
            isWideLayout={isWideLayout}
          />
        )
      ) : null}

      {step === 3 && selectedCondition ? (
        <View style={isWideLayout ? styles.vitalsStack : undefined}>
          <DynamicVitalsForm
            condition={selectedCondition}
            values={vitalValues}
            errors={vitalErrors}
            onChange={updateVital}
            title={`${getConditionLabel(condition)} vitals`}
            isWideLayout={isWideLayout}
          />

          <View style={isWideLayout ? styles.notesBlockWide : styles.notesBlock}>
            <ClayInput
              label="Visit notes (optional)"
              labelStyle={styles.notesLabel}
              placeholder="Observations, advice, follow-up plan"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              style={styles.notesInput}
              variant={isWideLayout ? 'flat' : 'clay'}
            />
          </View>
        </View>
      ) : null}
    </>
  );

  const actionButton = (() => {
    const buttonStyle = isWideLayout ? styles.cardActionButton : undefined;

    if (step === 1) {
      return (
        <ClayButton
          label="Confirm Patient"
          fullWidth={!isWideLayout}
          onPress={handleConfirmPatient}
          style={buttonStyle}
        />
      );
    }
    if (step === 2) {
      return (
        <ClayButton
          label="Continue"
          fullWidth={!isWideLayout}
          onPress={handleSaveCondition}
          style={buttonStyle}
        />
      );
    }
    return (
      <ClayButton
        label={isSubmitting ? 'Saving…' : 'Save Visit'}
        fullWidth={!isWideLayout}
        onPress={handleSaveVisit}
        disabled={isSubmitting}
        style={buttonStyle}
      />
    );
  })();

  const errorBanner: ReactNode = submitError ? (
    <View style={styles.errorBanner}>
      <Text style={styles.errorBannerText}>{submitError}</Text>
    </View>
  ) : null;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {!isWideLayout ? (
        <PageHeader title="Record Visit" onBack={handleBack} background="canvas" />
      ) : null}

      {isWideLayout ? (
        <View style={styles.wideBody}>
          <View style={styles.wideTopStepper}>
            <VisitStepper current={step} highestReached={highestReached} onStepPress={setStep} />
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.wideFormScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formCard}>
              {formBody}
              {errorBanner}
              <View style={styles.cardFooterActions}>{actionButton}</View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <>
          <View style={styles.stepperWrap}>
            <VisitStepper current={step} highestReached={highestReached} onStepPress={setStep} />
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {formBody}
          </ScrollView>

          <View style={styles.footer}>
            {errorBanner}
            {actionButton}
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}
