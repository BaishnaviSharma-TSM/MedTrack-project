import { USE_MOCK_DATA } from '@/config/dataSource';
import type { ListQueryParams } from '@/types/api';

import type { VisitRecord } from '../types';
import * as apiRecords from './visitRecordService.api';
import * as mockRecords from './visitRecordService.mock';

export function getConditionLabel(condition?: string) {
  if (USE_MOCK_DATA) return mockRecords.getConditionLabel(condition);
  return apiRecords.getConditionLabel(condition);
}

export async function getVisitRecords(
  query = '',
  params?: ListQueryParams,
): Promise<VisitRecord[]> {
  if (USE_MOCK_DATA) return mockRecords.getVisitRecords(query);
  return apiRecords.getVisitRecords(query, params);
}

export async function getVisitRecordById(id: string): Promise<VisitRecord | null> {
  if (USE_MOCK_DATA) return mockRecords.getVisitRecordById(id);
  return apiRecords.getVisitRecordById(id);
}
