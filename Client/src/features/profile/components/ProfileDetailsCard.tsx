import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';
import type { DoctorProfile } from '../types';
import { formatStaffRole, getStaffIdLabel } from '../utils/formatStaffRole';
import { splitFullName } from '../utils/splitFullName';
import { ProfileInfoField } from './ProfileInfoField';
import baseStyles from '@/styles/profile/profile-details-card.styles';

type ProfileDetailsCardProps = {
  profile: DoctorProfile;
  isWideLayout?: boolean;
};

export function ProfileDetailsCard({
  profile,
  isWideLayout = false,
}: ProfileDetailsCardProps) {
  const { firstName, lastName } = splitFullName(profile.fullName);
  const { colors, isDark } = useTheme();
  const rowStyle = [baseStyles.fieldRow, isWideLayout && baseStyles.fieldRowWide];

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
          <ProfileInfoField label="First Name" value={firstName} />
          <ProfileInfoField label="Last Name" value={lastName} />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField label="Email" value={profile.email} />
          <ProfileInfoField label="Phone Number" value={profile.phone} />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField label="Clinic" value={profile.clinic} />
          <ProfileInfoField label="Specialty" value={profile.specialty} />
        </View>
        <View style={rowStyle}>
          <ProfileInfoField label={getStaffIdLabel(profile.role)} value={profile.doctorId} />
          <ProfileInfoField label="Role" value={formatStaffRole(profile.role)} />
        </View>
      </View>
    </View>
  );
}
