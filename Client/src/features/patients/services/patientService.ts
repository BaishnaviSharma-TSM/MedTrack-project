import { USE_MOCK_DATA } from '@/config/dataSource';

import type { Patient, PatientInput } from '../types';
import * as apiPatients from './patientService.api';
import * as mockPatients from './patientService.mock';

export async function getPatients(): Promise<Patient[]> {
  if (USE_MOCK_DATA) return mockPatients.getPatients();
  return apiPatients.getPatients();
}

export async function getPatientById(id: string): Promise<Patient | null> {
  if (USE_MOCK_DATA) return mockPatients.getPatientById(id);
  return apiPatients.getPatientById(id);
}

export async function searchPatients(query: string): Promise<Patient[]> {
  if (USE_MOCK_DATA) return mockPatients.searchPatients(query);
  return apiPatients.searchPatients(query);
}

export async function createPatient(input: PatientInput): Promise<Patient> {
  if (USE_MOCK_DATA) return mockPatients.createPatient(input);
  return apiPatients.createPatient(input);
}

export async function updatePatient(
  id: string,
  input: Partial<PatientInput>,
): Promise<Patient> {
  if (USE_MOCK_DATA) return mockPatients.updatePatient(id, input);
  return apiPatients.updatePatient(id, input);
}
