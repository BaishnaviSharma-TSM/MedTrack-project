export type DoctorRole = 'doctor' | 'nurse';

export type DoctorProfile = {
  id: string;
  doctorId: string;
  fullName: string;
  specialty: string;
  clinic: string;
  phone: string;
  role: DoctorRole;
  email: string;
  updatedAt: string;
};

export type DoctorProfileInput = Omit<DoctorProfile, 'updatedAt'>;

export type DoctorProfileFormValues = {
  fullName: string;
  specialty: string;
  clinic: string;
  phone: string;
};

export type DoctorProfileFormErrors = Partial<Record<keyof DoctorProfileFormValues, string>>;
