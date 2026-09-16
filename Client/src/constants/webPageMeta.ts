import { SCREEN_TITLES } from '@/constants/navigation';

/** Default page titles for wide-web header when a screen has not registered custom meta. */
export function resolveDefaultWebPageTitle(segments: string[]): string {
  const joined = segments.join('/');

  if (joined.includes('patients') && joined.includes('new')) return SCREEN_TITLES.addPatient;
  if (joined.includes('edit')) return SCREEN_TITLES.editPatient;
  if (joined.includes('visits') && joined.includes('new')) return SCREEN_TITLES.recordVisit;

  const patientsIndex = segments.indexOf('patients');
  if (patientsIndex >= 0) {
    const next = segments[patientsIndex + 1];
    if (next && next !== 'new' && next !== 'edit') {
      return SCREEN_TITLES.patientProfile;
    }
  }

  const visitsIndex = segments.indexOf('visits');
  if (visitsIndex >= 0) {
    const next = segments[visitsIndex + 1];
    if (next && next !== 'new') {
      return SCREEN_TITLES.visitDetail;
    }
  }

  const last = segments[segments.length - 1] ?? '';

  switch (last) {
    case 'index':
      return SCREEN_TITLES.home;
    case 'patients':
      return SCREEN_TITLES.patients;
    case 'visits':
      return SCREEN_TITLES.visits;
    case 'profile':
      return SCREEN_TITLES.profile;
    default:
      return 'MedTrack';
  }
}
