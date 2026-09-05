import { Text, View } from 'react-native';

import type { DoctorProfile } from '../types';
import { formatStaffRole } from '../utils/formatStaffRole';
import { getProfileInitials } from '../utils/getProfileInitials';
import styles from '@/styles/profile/profile-hero.styles';

type ProfileHeroProps = {
  profile: DoctorProfile;
};

export function ProfileHero({ profile }: ProfileHeroProps) {
  const initials = getProfileInitials(profile.fullName, profile.email);
  const specialty = profile.specialty.trim() || 'Add your specialty';

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{formatStaffRole(profile.role)}</Text>
        </View>
      </View>
    </View>
  );
}
