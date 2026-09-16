export { useDoctorProfile } from './hooks/useDoctorProfile';
export { getDoctorProfile, saveDoctorProfile } from './services/doctorProfileService';
export { ProfileHero } from './components/ProfileHero';
export { ProfileDetailsCard } from './components/ProfileDetailsCard';
export { ProfileStatStrip } from './components/ProfileStatStrip';
export { EditDoctorForm } from './components/EditDoctorForm';
export { validateDoctorProfile } from './utils/validateDoctorProfile';
export { getProfileInitials } from './utils/getProfileInitials';
export { splitFullName, joinFullName } from './utils/splitFullName';
export { ProfileInfoField } from './components/ProfileInfoField';
export type {
  DoctorProfile,
  DoctorProfileInput,
  DoctorProfileFormValues,
  DoctorProfileFormErrors,
  DoctorRole,
} from './types';
