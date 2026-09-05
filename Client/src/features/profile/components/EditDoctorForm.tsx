import { Text, View } from 'react-native';

import { ClayInput } from '@/components/ui';
import type { DoctorProfile, DoctorProfileFormErrors, DoctorProfileFormValues } from '../types';
import { formatStaffRole, getStaffIdLabel } from '../utils/formatStaffRole';
import styles from '@/styles/profile/edit-doctor-form.styles';

type EditDoctorFormProps = {
  profile: DoctorProfile;
  values: DoctorProfileFormValues;
  errors: DoctorProfileFormErrors;
  onChange: <K extends keyof DoctorProfileFormValues>(
    field: K,
    value: DoctorProfileFormValues[K],
  ) => void;
};

export function EditDoctorForm({ profile, values, errors, onChange }: EditDoctorFormProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Edit profile</Text>

      <View style={styles.readOnlyBlock}>
        <Text style={styles.readOnlyLabel}>{getStaffIdLabel(profile.role)}</Text>
        <Text style={styles.readOnlyValue}>{profile.doctorId}</Text>
      </View>

      <ClayInput
        label="Full name"
        placeholder="Dr. Arjun Mehta"
        value={values.fullName}
        onChangeText={(text) => onChange('fullName', text)}
        autoCapitalize="words"
      />
      {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

      <ClayInput
        label="Specialty"
        placeholder="e.g. Cardiologist, General Physician"
        value={values.specialty}
        onChangeText={(text) => onChange('specialty', text)}
        autoCapitalize="words"
      />

      <ClayInput
        label="Clinic / hospital"
        placeholder="Clinic name and city"
        value={values.clinic}
        onChangeText={(text) => onChange('clinic', text)}
        autoCapitalize="words"
      />
      {errors.clinic ? <Text style={styles.errorText}>{errors.clinic}</Text> : null}

      <ClayInput
        label="Phone"
        placeholder="10-digit mobile number"
        value={values.phone}
        onChangeText={(text) => onChange('phone', text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
        maxLength={10}
      />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

      <View style={styles.readOnlyBlock}>
        <Text style={styles.readOnlyLabel}>Email</Text>
        <Text style={styles.readOnlyValue}>{profile.email}</Text>
      </View>

      <View style={styles.readOnlyBlock}>
        <Text style={styles.readOnlyLabel}>Role</Text>
        <Text style={styles.readOnlyValue}>{formatStaffRole(profile.role)}</Text>
      </View>
    </View>
  );
}
