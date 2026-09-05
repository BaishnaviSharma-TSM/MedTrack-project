import { useLocalSearchParams } from 'expo-router';

import { ScreenContainer } from '@/components/layout';
import { RecordVisitWizard } from '@/features/visits/components/RecordVisitWizard';

/** Phase 3 — Record visit for existing patient */
export default function NewVisitScreen() {
  const { patientId } = useLocalSearchParams<{ patientId?: string }>();

  return (
    <ScreenContainer fullWidth>
      <RecordVisitWizard initialPatientId={patientId} />
    </ScreenContainer>
  );
}
