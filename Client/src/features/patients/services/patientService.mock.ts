import type { Patient, PatientInput } from '../types';

const DUMMY_PATIENTS: Patient[] = [
  {
    id: 'p-001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'male',
    contactNumber: '9876543210',
    address: '12 MG Road, Andheri West, Mumbai',
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
    address: '45 Park Street, Kolkata',
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
    address: '8 Civil Lines, Jaipur',
    uniqueId: 'PT-003',
    createdAt: '2026-08-28T08:15:00.000Z',
    updatedAt: '2026-08-28T08:15:00.000Z',
  },
  {
    id: 'p-004',
    name: 'Sunita Desai',
    age: 41,
    gender: 'female',
    contactNumber: '9012345678',
    address: '22 Law Garden, Ahmedabad',
    uniqueId: 'PT-004',
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'p-005',
    name: 'Vikram Singh',
    age: 67,
    gender: 'male',
    contactNumber: '9822334455',
    address: '19 Sector 17, Chandigarh',
    uniqueId: 'PT-005',
    createdAt: '2026-09-02T14:30:00.000Z',
    updatedAt: '2026-09-02T14:30:00.000Z',
  },
  {
    id: 'p-006',
    name: 'Meera Patel',
    age: 29,
    gender: 'female',
    contactNumber: '9765432109',
    address: '7 CG Road, Navrangpura, Ahmedabad',
    uniqueId: 'PT-006',
    createdAt: '2026-09-03T09:15:00.000Z',
    updatedAt: '2026-09-03T09:15:00.000Z',
  },
  {
    id: 'p-007',
    name: 'Arjun Nair',
    age: 52,
    gender: 'male',
    contactNumber: '9898989898',
    address: '31 Marine Drive, Kochi',
    uniqueId: 'PT-007',
    createdAt: '2026-09-04T11:00:00.000Z',
    updatedAt: '2026-09-04T11:00:00.000Z',
  },
  {
    id: 'p-008',
    name: 'Kavita Rao',
    age: 36,
    gender: 'female',
    contactNumber: '9111222333',
    address: '14 Banjara Hills, Hyderabad',
    uniqueId: 'PT-008',
    createdAt: '2026-09-05T08:45:00.000Z',
    updatedAt: '2026-09-05T08:45:00.000Z',
  },
  {
    id: 'p-009',
    name: 'Deepak Joshi',
    age: 49,
    gender: 'male',
    contactNumber: '9334455667',
    address: '9 FC Road, Pune',
    uniqueId: 'PT-009',
    createdAt: '2026-09-06T16:20:00.000Z',
    updatedAt: '2026-09-06T16:20:00.000Z',
  },
  {
    id: 'p-010',
    name: 'Lakshmi Iyer',
    age: 61,
    gender: 'female',
    contactNumber: '9445566778',
    address: '5 Adyar, Chennai',
    uniqueId: 'PT-010',
    createdAt: '2026-09-07T13:10:00.000Z',
    updatedAt: '2026-09-07T13:10:00.000Z',
  },
  {
    id: 'p-011',
    name: 'Rohan Gupta',
    age: 24,
    gender: 'male',
    contactNumber: '9556677889',
    address: '18 Connaught Place, New Delhi',
    uniqueId: 'PT-011',
    createdAt: '2026-09-08T10:30:00.000Z',
    updatedAt: '2026-09-08T10:30:00.000Z',
  },
  {
    id: 'p-012',
    name: 'Neha Kulkarni',
    age: 38,
    gender: 'female',
    contactNumber: '9667788990',
    address: '27 Koregaon Park, Pune',
    uniqueId: 'PT-012',
    createdAt: '2026-09-09T15:00:00.000Z',
    updatedAt: '2026-09-09T15:00:00.000Z',
  },
  {
    id: 'p-013',
    name: 'Suresh Reddy',
    age: 55,
    gender: 'male',
    contactNumber: '9778899001',
    address: '3 Banjara Road, Hyderabad',
    uniqueId: 'PT-013',
    createdAt: '2026-09-10T09:00:00.000Z',
    updatedAt: '2026-09-10T09:00:00.000Z',
  },
  {
    id: 'p-014',
    name: 'Pooja Menon',
    age: 33,
    gender: 'female',
    contactNumber: '9889900112',
    address: '11 Panampilly Nagar, Kochi',
    uniqueId: 'PT-014',
    createdAt: '2026-09-11T12:45:00.000Z',
    updatedAt: '2026-09-11T12:45:00.000Z',
  },
  {
    id: 'p-015',
    name: 'Harish Bhatt',
    age: 70,
    gender: 'male',
    contactNumber: '9990011223',
    address: '6 Ellis Bridge, Ahmedabad',
    uniqueId: 'PT-015',
    createdAt: '2026-09-12T08:00:00.000Z',
    updatedAt: '2026-09-12T08:00:00.000Z',
  },
  {
    id: 'p-016',
    name: 'Anita Verma',
    age: 44,
    gender: 'female',
    contactNumber: '9001122334',
    address: '21 MG Road, Bengaluru',
    uniqueId: 'PT-016',
    createdAt: '2026-09-14T09:30:00.000Z',
    updatedAt: '2026-09-14T09:30:00.000Z',
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
