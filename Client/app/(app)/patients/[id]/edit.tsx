import { ScreenContainer } from '@/components/layout';

import { EditPatientWizard } from '@/features/patients/components/EditPatientWizard';

/** Phase 2.4 — Edit patient demographics */
export default function EditPatientScreen() {
  return (
    <ScreenContainer fullWidth>
      <EditPatientWizard />
    </ScreenContainer>
  );
}
