import { ScreenContainer } from '@/components/layout';

import { AddPatientWizard } from '@/features/patients/components/AddPatientWizard';

/** Phase 2.1 — Add Patient wizard (demographics + condition + vitals) */
export default function NewPatientScreen() {
  return (
    <ScreenContainer fullWidth>
      <AddPatientWizard />
    </ScreenContainer>
  );
}
