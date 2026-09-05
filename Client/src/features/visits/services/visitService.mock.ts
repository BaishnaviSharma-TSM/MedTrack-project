import type { Visit, VisitInput } from '../types';

const visits: Visit[] = [
  {
    id: 'v-001',
    patientId: 'p-001',
    condition: 'hypertension',
    vitals: [
      { key: 'systolic', label: 'Systolic BP', value: 142, unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic BP', value: 88, unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', value: 78, unit: 'bpm' },
    ],
    severity: 'moderate',
    notes: 'Patient reports elevated BP. Continue monitoring and review medications.',
    visitDate: '2026-08-15T09:00:00.000Z',
    createdAt: '2026-08-15T09:00:00.000Z',
  },
  {
    id: 'v-002',
    patientId: 'p-002',
    condition: 'fever',
    vitals: [
      { key: 'temperature', label: 'Temperature', value: 101.2, unit: '°F' },
      { key: 'spo2', label: 'Oxygen Saturation', value: 97, unit: '%' },
      { key: 'pulse', label: 'Pulse Rate', value: 92, unit: 'bpm' },
    ],
    severity: 'moderate',
    notes: 'Fever subsiding. Schedule follow-up in 3 days if symptoms persist.',
    visitDate: '2026-08-20T11:30:00.000Z',
    createdAt: '2026-08-20T11:30:00.000Z',
  },
  {
    id: 'v-003',
    patientId: 'p-001',
    condition: 'general',
    vitals: [
      { key: 'temperature', label: 'Temperature', value: 98.4, unit: '°F' },
      { key: 'bloodPressure', label: 'Blood Pressure', value: '118/76', unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', value: 72, unit: 'bpm' },
    ],
    severity: 'mild',
    notes: 'Routine follow-up. Patient reports feeling well.',
    visitDate: '2026-08-25T10:00:00.000Z',
    createdAt: '2026-08-25T10:00:00.000Z',
  },
  {
    id: 'v-004',
    patientId: 'p-003',
    condition: 'diabetes',
    vitals: [
      { key: 'fastingGlucose', label: 'Fasting Blood Glucose', value: 126, unit: 'mg/dL' },
      { key: 'hba1c', label: 'HbA1c', value: 6.8, unit: '%' },
      { key: 'weight', label: 'Weight', value: 82, unit: 'kg' },
    ],
    severity: 'moderate',
    notes: 'HbA1c slightly elevated. Adjust diet plan and recheck in 4 weeks.',
    visitDate: '2026-08-28T14:00:00.000Z',
    createdAt: '2026-08-28T14:00:00.000Z',
  },
];

function sortByVisitDateDesc(list: Visit[]) {
  return [...list].sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime(),
  );
}

export async function getAllVisits(): Promise<Visit[]> {
  return sortByVisitDateDesc(visits);
}

export async function getVisitById(id: string): Promise<Visit | null> {
  return visits.find((visit) => visit.id === id) ?? null;
}

export async function getVisitsByPatient(patientId: string): Promise<Visit[]> {
  return sortByVisitDateDesc(visits.filter((visit) => visit.patientId === patientId));
}

export async function createVisit(input: VisitInput): Promise<Visit> {
  const now = new Date().toISOString();
  const visit: Visit = {
    id: `v-${Date.now()}`,
    ...input,
    visitDate: input.visitDate || now,
    createdAt: now,
  };

  visits.unshift(visit);
  return visit;
}
