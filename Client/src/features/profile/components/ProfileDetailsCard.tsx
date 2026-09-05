import { Text, View } from 'react-native';

import type { DoctorProfile } from '../types';
import { formatStaffRole, getStaffIdLabel } from '../utils/formatStaffRole';
import styles from '@/styles/profile/profile-details-card.styles';

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || '—'}</Text>
    </View>
  );
}

type ProfileDetailsCardProps = {
  profile: DoctorProfile;
};

export function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Professional details</Text>
      <DetailRow label={getStaffIdLabel(profile.role)} value={profile.doctorId} />
      <DetailRow label="Full name" value={profile.fullName} />
      <DetailRow label="Specialty" value={profile.specialty} />
      <DetailRow label="Clinic" value={profile.clinic} />
      <DetailRow label="Phone" value={profile.phone} />
      <DetailRow label="Email" value={profile.email} />
      <DetailRow label="Role" value={formatStaffRole(profile.role)} />
    </View>
  );
}
