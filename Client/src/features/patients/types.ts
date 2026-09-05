import type { Patient } from '@/types';

export type { Patient, PatientInput } from '@/types';

/** A patient plus the visit-derived metadata the list needs for sorting and filtering. */
export type PatientRecord = {
  patient: Patient;
  lastVisitDate: string;
  lastCondition?: string;
  visitCount: number;
};

export type DateRangeChip = 'all' | '7d' | '30d';
