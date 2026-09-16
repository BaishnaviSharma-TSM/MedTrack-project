import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import type { DoctorProfile } from '../types';
import { formatStaffRole } from '../utils/formatStaffRole';
import baseStyles from '@/styles/profile/profile-hero.styles';
import { useTheme } from '@/theme';

type ProfileHeroProps = {
  profile: DoctorProfile;
  actions?: ReactNode;
};

export function ProfileHero({ profile, actions }: ProfileHeroProps) {
  const role = formatStaffRole(profile.role);
  const clinic = profile.clinic.trim();
  const specialty = profile.specialty.trim();
  const { colors, isDark } = useTheme();

  const parts: string[] = [];
  if (specialty) parts.push(specialty);
  if (clinic) parts.push(clinic);
  const subtitle = parts.length > 0 ? parts.join(' · ') : profile.email;

  return (
    <View
      style={[
        baseStyles.card,
        {
          backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
          borderLeftColor: colors.brand.primary,
        },
      ]}
    >
      <View style={baseStyles.identity}>
        <View style={baseStyles.nameRow}>
          <Text style={[baseStyles.name, { color: colors.foreground }]}>{profile.fullName}</Text>
          <View style={[baseStyles.roleBadge, { backgroundColor: colors.brand.alpha10 }]}>
            <Text style={[baseStyles.roleText, { color: colors.brand.primary }]}>{role}</Text>
          </View>
        </View>
        <Text style={[baseStyles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
      </View>

      {actions ? <View style={baseStyles.actions}>{actions}</View> : null}
    </View>
  );
}
