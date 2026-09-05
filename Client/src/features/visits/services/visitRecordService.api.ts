import { apiClient } from '@/services/apiClient';
import type { ListQueryParams } from '@/types/api';

import type { VisitRecord } from '../types';
import { getConditionLabelFromCache } from '@/features/conditions/conditionsCache';

export function getConditionLabel(condition?: string) {
  return getConditionLabelFromCache(condition);
}

export async function getVisitRecords(
  query = '',
  params?: ListQueryParams,
): Promise<VisitRecord[]> {
  const response = await apiClient.get<VisitRecord[]>('/visits/records', {
    q: query.trim() || params?.q,
    range: params?.range,
    from: params?.from,
    to: params?.to,
    page: params?.page ?? 1,
    limit: params?.limit ?? 100,
  });

  return response.data ?? [];
}

export async function getVisitRecordById(id: string): Promise<VisitRecord | null> {
  try {
    const response = await apiClient.get<VisitRecord>(`/visits/${id}`);
    return response.data ?? null;
  } catch {
    return null;
  }
}
