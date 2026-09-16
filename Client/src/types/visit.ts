export type ConditionType =
  | 'fever'
  | 'hypertension'
  | 'diabetes'
  | 'general'
  | 'asthma'
  | 'cardiac'
  | 'anemia';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export interface VitalSign {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
}

export interface Visit {
  id: string;
  patientId: string;
  condition: string;
  vitals: VitalSign[];
  severity?: SeverityLevel;
  notes?: string;
  prescription?: string;
  followUp?: string;
  doctorName?: string;
  visitDate: string;
  createdAt: string;
}

export type VisitInput = Omit<Visit, 'id' | 'createdAt'>;
