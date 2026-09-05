import type { Patient } from '@/types';
import type { ConditionType, Visit, VisitInput } from '@/types';

export type { Visit, VisitInput, ConditionType } from '@/types';

export type VisitRecord = {
  visit: Visit;
  patient: Patient;
};

export type DateRangeChip = 'all' | '7d' | '30d';
