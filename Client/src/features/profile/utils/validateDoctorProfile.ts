import type { DoctorProfileFormErrors, DoctorProfileFormValues } from '../types';

export function validateDoctorProfile(values: DoctorProfileFormValues): DoctorProfileFormErrors {
  const errors: DoctorProfileFormErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name (at least 2 characters).';
  }

  if (!values.clinic.trim()) {
    errors.clinic = 'Clinic or hospital name is required.';
  }

  if (values.phone.trim() && values.phone.trim().length < 10) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  return errors;
}
