import { USE_MOCK_DATA } from '@/config/dataSource';

import type { DoctorProfile, DoctorProfileInput } from '../types';
import * as apiProfile from './doctorProfileService.api';
import * as mockProfile from './doctorProfileService.mock';

export async function getDoctorProfile(
  userId: string,
  email: string,
  displayName?: string,
): Promise<DoctorProfile> {
  if (USE_MOCK_DATA) return mockProfile.getDoctorProfile(userId, email, displayName);
  return apiProfile.getDoctorProfile();
}

export async function saveDoctorProfile(profile: DoctorProfileInput): Promise<DoctorProfile> {
  if (USE_MOCK_DATA) return mockProfile.saveDoctorProfile(profile);
  return apiProfile.saveDoctorProfile(profile);
}
