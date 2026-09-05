import { USE_MOCK_DATA } from '@/config/dataSource';
import type { ListQueryParams } from '@/types/api';

import type { PatientRecord } from '../types';
import * as apiRecords from './patientRecordService.api';
import * as mockRecords from './patientRecordService.mock';

export async function getPatientRecords(
  query = '',
  params?: ListQueryParams,
): Promise<PatientRecord[]> {
  if (USE_MOCK_DATA) return mockRecords.getPatientRecords(query, params);
  return apiRecords.getPatientRecords(query, params);
}
