import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { PatientRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { spacing, useTheme } from '@/theme';

type PatientRecordCardProps = {
  record: PatientRecord;
};

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

export function PatientRecordCard({ record }: PatientRecordCardProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { patient, visitCount, lastVisitDate } = record;

  return (
    <Pressable
      style={{
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: spacing.base,
        marginBottom: spacing.md,
        shadowColor: isDark ? 'transparent' : '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0 : 0.04,
        shadowRadius: 8,
        elevation: isDark ? 0 : 2,
      }}
      onPress={() => router.push(`/(app)/patients/${patient.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`Open profile for ${patient.name}`}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing.sm,
          marginBottom: spacing.md,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: 'Nunito_700Bold',
            fontSize: 17,
            color: colors.foreground,
          }}
        >
          {patient.name}
        </Text>
        <View
          style={{
            backgroundColor: colors.brand.alpha10,
            paddingHorizontal: spacing.md,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              fontFamily: 'DMSans_700Bold',
              fontSize: 12,
              color: colors.brand.primary,
            }}
          >
            {patient.uniqueId}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          marginBottom: spacing.sm,
        }}
      >
        <Feather name="user" size={14} color={colors.muted} />
        <Text style={{ fontFamily: 'DMSans_400Regular', fontSize: 14, color: colors.foreground }}>
          {patient.age} yrs · {formatGender(patient.gender)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          marginBottom: spacing.sm,
        }}
      >
        <Feather name="phone" size={14} color={colors.muted} />
        <Text style={{ fontFamily: 'DMSans_400Regular', fontSize: 14, color: colors.foreground }}>
          {patient.contactNumber}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: spacing.sm,
          paddingTop: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: isDark ? colors.borderMuted : '#F1EEF6',
        }}
      >
        <Text style={{ fontFamily: 'DMSans_500Medium', fontSize: 13, color: colors.muted }}>
          {visitCount === 0
            ? 'No visits yet'
            : `${visitCount} visit${visitCount > 1 ? 's' : ''} · Last ${formatDisplayDate(lastVisitDate)}`}
        </Text>
        <Feather name="chevron-right" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}
