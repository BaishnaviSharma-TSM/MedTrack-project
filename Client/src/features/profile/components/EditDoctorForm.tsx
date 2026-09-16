import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import type { DoctorProfile, DoctorProfileFormErrors, DoctorProfileFormValues } from '../types';
import { formatStaffRole, getStaffIdLabel } from '../utils/formatStaffRole';
import { joinFullName, splitFullName } from '../utils/splitFullName';
import { ProfileInfoField } from './ProfileInfoField';
import baseStyles from '@/styles/profile/edit-doctor-form.styles';

type EditDoctorFormProps = {
  profile: DoctorProfile;
  values: DoctorProfileFormValues;
  errors: DoctorProfileFormErrors;
  onChange: <K extends keyof DoctorProfileFormValues>(
    field: K,
    value: DoctorProfileFormValues[K],
  ) => void;
  isWideLayout?: boolean;
};

export function EditDoctorForm({
  profile,
  values,
  errors,
  onChange,
  isWideLayout = false,
}: EditDoctorFormProps) {
  const { firstName, lastName } = splitFullName(values.fullName);
  const { colors, isDark } = useTheme();
  const rowStyle = [baseStyles.fieldRow, isWideLayout && baseStyles.fieldRowWide];

  function handleNameChange(nextFirst: string, nextLast: string) {
    onChange('fullName', joinFullName(nextFirst, nextLast, profile.fullName));
  }

  return (
    <View
      style={[
        baseStyles.card,
        {
          backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        },
      ]}
    >
      <View
        style={[
          baseStyles.cardTitleRow,
          { borderBottomColor: isDark ? colors.borderMuted : '#F1EEF6' },
        ]}
      >
        <Feather name="user" size={16} color={colors.foreground} />
        <Text style={[baseStyles.cardTitle, { color: colors.foreground }]}>
          Personal Information
        </Text>
      </View>

      <View style={baseStyles.fields}>
        <View style={rowStyle}>
          <ProfileInfoField
            label="First Name"
            value={firstName}
            editable
            required
            autoCapitalize="words"
            placeholder="First name"
            error={errors.fullName}
            onChangeText={(text) => handleNameChange(text, lastName)}
          />
          <ProfileInfoField
            label="Last Name"
            value={lastName}
            editable
            autoCapitalize="words"
            placeholder="Last name"
            onChangeText={(text) => handleNameChange(firstName, text)}
          />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField label="Email" value={profile.email} />
          <ProfileInfoField
            label="Phone Number"
            value={values.phone}
            editable
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="10-digit mobile number"
            error={errors.phone}
            onChangeText={(text) => onChange('phone', text.replace(/[^0-9]/g, ''))}
          />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField
            label="Clinic"
            value={values.clinic}
            editable
            required
            autoCapitalize="words"
            placeholder="Clinic name and city"
            error={errors.clinic}
            onChangeText={(text) => onChange('clinic', text)}
          />
          <ProfileInfoField
            label="Specialty"
            value={values.specialty}
            editable
            autoCapitalize="words"
            placeholder="e.g. Cardiologist, General Physician"
            onChangeText={(text) => onChange('specialty', text)}
          />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField label={getStaffIdLabel(profile.role)} value={profile.doctorId} />
          <ProfileInfoField label="Role" value={formatStaffRole(profile.role)} />
        </View>
      </View>
    </View>
  );
}
