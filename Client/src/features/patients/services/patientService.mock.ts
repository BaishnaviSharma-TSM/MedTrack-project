import type { Patient, PatientInput } from '../types';

const DUMMY_PATIENTS: Patient[] = [
  {
    id: 'p-001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'male',
    contactNumber: '9876543210',
    uniqueId: 'PT-001',
    createdAt: '2026-08-15T09:00:00.000Z',
    updatedAt: '2026-08-15T09:00:00.000Z',
  },
  {
    id: 'p-002',
    name: 'Priya Sharma',
    age: 32,
    gender: 'female',
    contactNumber: '9123456780',
    uniqueId: 'PT-002',
    createdAt: '2026-08-20T11:30:00.000Z',
    updatedAt: '2026-08-20T11:30:00.000Z',
  },
  {
    id: 'p-003',
    name: 'Anil Mehta',
    age: 58,
    gender: 'male',
    contactNumber: '9988776655',
    uniqueId: 'PT-003',
    createdAt: '2026-08-28T08:15:00.000Z',
    updatedAt: '2026-08-28T08:15:00.000Z',
  },
];

let patients: Patient[] = [...DUMMY_PATIENTS];

function nextUniqueId(): string {
  const maxNum = patients.reduce((max, patient) => {
    const match = patient.uniqueId.match(/^PT-(\d+)$/);
    const num = match ? Number(match[1]) : 0;
    return Math.max(max, num);
  }, 0);

  return `PT-${String(maxNum + 1).padStart(3, '0')}`;
}

export async function getPatients(): Promise<Patient[]> {
  return [...patients].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPatientById(id: string): Promise<Patient | null> {
  const all = await getPatients();
  return all.find((patient) => patient.id === id) ?? null;
}

export async function searchPatients(query: string): Promise<Patient[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getPatients();

  const all = await getPatients();
  return all.filter(
    (patient) =>
      patient.name.toLowerCase().includes(normalized) ||
      patient.contactNumber.includes(normalized) ||
      patient.uniqueId.toLowerCase().includes(normalized),
  );
}

export async function createPatient(input: PatientInput): Promise<Patient> {
  const now = new Date().toISOString();
  const patient: Patient = {
    id: `p-${Date.now()}`,
    ...input,
    uniqueId: nextUniqueId(),
    createdAt: now,
    updatedAt: now,
  };

  patients = [patient, ...patients];
  return patient;
}

export async function updatePatient(
  id: string,
  input: Partial<PatientInput>,
): Promise<Patient> {
  const index = patients.findIndex((patient) => patient.id === id);
  if (index < 0) {
    throw new Error('Patient not found');
  }

  const updated: Patient = {
    ...patients[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  patients[index] = updated;
  return updated;
}
