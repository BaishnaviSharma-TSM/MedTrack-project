import { apiClient } from '@/services/apiClient';

import type { DoctorProfile, DoctorProfileInput } from '../types';

export async function getDoctorProfile(): Promise<DoctorProfile> {
  const response = await apiClient.get<DoctorProfile>('/users/me');
  return response.data;
}

export async function saveDoctorProfile(profile: DoctorProfileInput): Promise<DoctorProfile> {
  const response = await apiClient.patch<DoctorProfile>('/users/me', {
    fullName: profile.fullName,
    specialty: profile.specialty,
    phone: profile.phone,
  });
  return response.data;
}
