import type { DoctorRole } from '../types';

export function formatStaffRole(role: DoctorRole): string {
  return role === 'nurse' ? 'Nurse' : 'Doctor';
}

export function getStaffIdLabel(role: DoctorRole): string {
  return role === 'nurse' ? 'Nurse ID' : 'Doctor ID';
}
