import type { DoctorProfile, DoctorProfileInput } from '../types';

const SEED_PROFILE: DoctorProfile = {
  id: '1',
  doctorId: 'DR-001',
  fullName: 'Dr. Arjun Mehta',
  specialty: 'General Physician',
  clinic: 'MedTrack Clinic, Pune',
  phone: '9876543210',
  role: 'doctor',
  email: 'arjun.mehta@medtrack.in',
  updatedAt: '2026-08-01T10:00:00.000Z',
};

let profiles: DoctorProfile[] = [SEED_PROFILE];

function nextDoctorId(): string {
  const maxNum = profiles.reduce((max, profile) => {
    const match = profile.doctorId.match(/^DR-(\d+)$/);
    const num = match ? Number(match[1]) : 0;
    return Math.max(max, num);
  }, 0);

  return `DR-${String(maxNum + 1).padStart(3, '0')}`;
}

function buildDefaultProfile(
  userId: string,
  email: string,
  displayName?: string,
): DoctorProfile {
  const now = new Date().toISOString();
  const fallbackName = displayName?.trim() || email.split('@')[0] || 'Doctor';

  return {
    id: userId,
    doctorId: nextDoctorId(),
    fullName: fallbackName,
    specialty: '',
    clinic: '',
    phone: '',
    role: 'doctor',
    email,
    updatedAt: now,
  };
}

export async function getDoctorProfile(
  userId: string,
  email: string,
  displayName?: string,
): Promise<DoctorProfile> {
  const existing = profiles.find((profile) => profile.id === userId);
  if (existing) {
    return {
      ...existing,
      email: existing.email || email,
      fullName: existing.fullName || displayName || email.split('@')[0],
    };
  }

  const created = buildDefaultProfile(userId, email, displayName);
  profiles = [...profiles, created];
  return created;
}

export async function saveDoctorProfile(profile: DoctorProfileInput): Promise<DoctorProfile> {
  const now = new Date().toISOString();
  const saved: DoctorProfile = {
    ...profile,
    doctorId: profile.doctorId || nextDoctorId(),
    role: profile.role ?? 'doctor',
    updatedAt: now,
  };

  const index = profiles.findIndex((item) => item.id === profile.id);
  if (index >= 0) {
    profiles[index] = saved;
  } else {
    profiles = [...profiles, saved];
  }

  return saved;
}
