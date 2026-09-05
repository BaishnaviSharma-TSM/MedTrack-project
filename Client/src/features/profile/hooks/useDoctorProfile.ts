import { useCallback, useState } from 'react';

import type { AuthUser } from '@/features/auth/types';

import type { DoctorProfile, DoctorProfileFormValues } from '../types';
import { getDoctorProfile, saveDoctorProfile } from '../services/doctorProfileService';
import { validateDoctorProfile } from '../utils/validateDoctorProfile';

type UseDoctorProfileOptions = {
  user: AuthUser | null;
  onSaved?: (profile: DoctorProfile) => void;
};

export function useDoctorProfile({ user, onSaved }: UseDoctorProfileOptions) {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof DoctorProfileFormValues, string>>>(
    {},
  );

  const refresh = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getDoctorProfile(user.id, user.email, user.displayName);
      setProfile(data);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const startEditing = useCallback(() => {
    setSaveError(null);
    setFormErrors({});
    setIsEditing(true);
  }, []);

  const cancelEditing = useCallback(() => {
    setSaveError(null);
    setFormErrors({});
    setIsEditing(false);
  }, []);

  const save = useCallback(
    async (values: DoctorProfileFormValues) => {
      if (!user || !profile) return false;

      const errors = validateDoctorProfile(values);
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) return false;

      setIsSaving(true);
      setSaveError(null);

      try {
        const saved = await saveDoctorProfile({
          ...profile,
          fullName: values.fullName.trim(),
          specialty: values.specialty.trim(),
          clinic: values.clinic.trim(),
          phone: values.phone.trim(),
        });

        setProfile(saved);
        setIsEditing(false);
        onSaved?.(saved);
        return true;
      } catch {
        setSaveError('Could not save profile. Please try again.');
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [onSaved, profile, user],
  );

  return {
    profile,
    isLoading,
    isEditing,
    isSaving,
    saveError,
    formErrors,
    setFormErrors,
    refresh,
    startEditing,
    cancelEditing,
    save,
  };
}
