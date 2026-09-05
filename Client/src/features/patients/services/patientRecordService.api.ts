import { apiClient } from '@/services/apiClient';
import type { ListQueryParams } from '@/types/api';

import type { PatientRecord } from '../types';

export async function getPatientRecords(
  query = '',
  params?: ListQueryParams,
): Promise<PatientRecord[]> {
  const response = await apiClient.get<PatientRecord[]>('/patients/records', {
    q: query.trim() || params?.q,
    range: params?.range,
    from: params?.from,
    to: params?.to,
    page: params?.page ?? 1,
    limit: params?.limit ?? 100,
  });

  return response.data ?? [];
}
