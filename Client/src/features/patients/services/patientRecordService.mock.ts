import type { ListQueryParams } from '@/types/api';

import type { PatientRecord } from '../types';
import { getVisitsByPatient } from '@/features/visits/services/visitService.mock';
import { getPatients, searchPatients } from './patientService.mock';

/** PRD 2.2 — Patient list data: registered patients with visit-derived metadata. */
export async function getPatientRecords(
  query = '',
  _params?: ListQueryParams,
): Promise<PatientRecord[]> {
  const patients = query.trim() ? await searchPatients(query) : await getPatients();

  const records = await Promise.all(
    patients.map(async (patient) => {
      const visits = await getVisitsByPatient(patient.id);
      const latestVisit = visits[0];

      return {
        patient,
        lastVisitDate: latestVisit?.visitDate ?? patient.createdAt,
        lastCondition: latestVisit?.condition,
        visitCount: visits.length,
      } satisfies PatientRecord;
    }),
  );

  return records.sort(
    (a, b) => new Date(b.lastVisitDate).getTime() - new Date(a.lastVisitDate).getTime(),
  );
}
