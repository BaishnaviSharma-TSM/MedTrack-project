import { apiClient } from '@/services/apiClient';

import type { Patient, PatientInput } from '../types';

export async function getPatients(): Promise<Patient[]> {
  const response = await apiClient.get<Patient[]>('/patients', { limit: 100 });
  return response.data ?? [];
}

export async function getPatientById(id: string): Promise<Patient | null> {
  try {
    const response = await apiClient.get<Patient>(`/patients/${id}`);
    return response.data ?? null;
  } catch {
    return null;
  }
}

export async function searchPatients(query: string): Promise<Patient[]> {
  const response = await apiClient.get<Patient[]>('/patients', {
    q: query.trim(),
    limit: 100,
  });
  return response.data ?? [];
}

export async function createPatient(input: PatientInput): Promise<Patient> {
  const response = await apiClient.post<Patient>('/patients', input);
  return response.data;
}

export async function updatePatient(
  id: string,
  input: Partial<PatientInput>,
): Promise<Patient> {
  const response = await apiClient.patch<Patient>(`/patients/${id}`, input);
  return response.data;
}
