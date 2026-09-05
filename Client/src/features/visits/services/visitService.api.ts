import { apiClient } from '@/services/apiClient';

import type { Visit, VisitInput } from '../types';

export async function getAllVisits(): Promise<Visit[]> {
  const response = await apiClient.get<Array<{ visit: Visit; patient: unknown }>>(
    '/visits/records',
    { limit: 100 },
  );
  return (response.data ?? []).map((record) => record.visit);
}

export async function getVisitById(id: string): Promise<Visit | null> {
  try {
    const response = await apiClient.get<{ visit: Visit }>(`/visits/${id}`);
    return response.data?.visit ?? null;
  } catch {
    return null;
  }
}

export async function getVisitsByPatient(patientId: string): Promise<Visit[]> {
  const response = await apiClient.get<Visit[]>(`/patients/${patientId}/visits`, {
    limit: 100,
  });
  return response.data ?? [];
}

export async function createVisit(input: VisitInput): Promise<Visit> {
  const response = await apiClient.post<Visit>('/visits', {
    patientId: input.patientId,
    condition: input.condition,
    vitals: input.vitals,
    notes: input.notes,
    visitDate: input.visitDate,
  });
  return response.data;
}
