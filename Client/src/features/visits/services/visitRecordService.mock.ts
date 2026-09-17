import { getConditionLabelFromCache } from '@/features/conditions/conditionsCache';
import { getPatients } from '@/features/patients/services/patientService.mock';
import type { Patient } from '@/types';

import type { VisitRecord } from '../types';
import { getAllVisits } from './visitService.mock';

export function getConditionLabel(condition?: string) {
  return getConditionLabelFromCache(condition);
}

async function buildVisitRecords(allPatients: Patient[]): Promise<VisitRecord[]> {
  const patientMap = new Map(allPatients.map((patient) => [patient.id, patient]));
  const allVisits = await getAllVisits();

  return allVisits
    .map((visit) => {
      const patient = patientMap.get(visit.patientId);
      if (!patient) return null;
      return { visit, patient } satisfies VisitRecord;
    })
    .filter((record): record is VisitRecord => record !== null);
}

export async function getVisitRecords(query = ''): Promise<VisitRecord[]> {
  const allPatients = await getPatients();
  const records = await buildVisitRecords(allPatients);

  const normalized = query.trim().toLowerCase();
  if (!normalized) return records;

  return records.filter((record) => {
    const conditionLabel = getConditionLabel(record.visit.condition).toLowerCase();
    return (
      record.patient.name.toLowerCase().includes(normalized) ||
      record.patient.contactNumber.includes(normalized) ||
      record.patient.uniqueId.toLowerCase().includes(normalized) ||
      conditionLabel.includes(normalized)
    );
  });
}

export async function getVisitRecordById(id: string): Promise<VisitRecord | null> {
  const records = await getVisitRecords();
  return records.find((record) => record.visit.id === id) ?? null;
}
