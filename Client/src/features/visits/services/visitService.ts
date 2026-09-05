import { USE_MOCK_DATA } from '@/config/dataSource';

import type { Visit, VisitInput } from '../types';
import * as apiVisits from './visitService.api';
import * as mockVisits from './visitService.mock';

export async function getAllVisits(): Promise<Visit[]> {
  if (USE_MOCK_DATA) return mockVisits.getAllVisits();
  return apiVisits.getAllVisits();
}

export async function getVisitById(id: string): Promise<Visit | null> {
  if (USE_MOCK_DATA) return mockVisits.getVisitById(id);
  return apiVisits.getVisitById(id);
}

export async function getVisitsByPatient(patientId: string): Promise<Visit[]> {
  if (USE_MOCK_DATA) return mockVisits.getVisitsByPatient(patientId);
  return apiVisits.getVisitsByPatient(patientId);
}

export async function createVisit(input: VisitInput): Promise<Visit> {
  if (USE_MOCK_DATA) return mockVisits.createVisit(input);
  return apiVisits.createVisit(input);
}
