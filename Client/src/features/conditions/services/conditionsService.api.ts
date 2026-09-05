import { apiClient } from '@/services/apiClient';

import type { ConditionDefinition } from '../types';

export async function getConditions(): Promise<ConditionDefinition[]> {
  const response = await apiClient.get<ConditionDefinition[]>('/conditions');
  return response.data ?? [];
}
