import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { getConditionLabel } from '../services/visitRecordService';
import { buildVitalsSummary } from '../utils/buildVitalsSummary';
import type { VisitRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { spacing, useTheme } from '@/theme';

type VisitRecordCardProps = {
  record: VisitRecord;
};

export function VisitRecordCard({ record }: VisitRecordCardProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { visit, patient } = record;

  const lineStyle = {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 22,
    marginBottom: 6,
  };
  const labelStyle = { fontFamily: 'DMSans_700Bold', color: colors.foreground };
  const valueStyle = { fontFamily: 'DMSans_400Regular', color: colors.foreground };
  const strongStyle = { fontFamily: 'DMSans_700Bold', color: colors.foreground };

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
      onPress={() => router.push(`/(app)/visits/${visit.id}`)}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing.md,
        }}
      >
        <Text style={{ fontFamily: 'DMSans_400Regular', fontSize: 13, color: colors.muted }}>
          {formatDisplayDate(visit.visitDate)}
        </Text>
        <View
          style={{
            backgroundColor: colors.brand.alpha10,
            paddingHorizontal: spacing.md,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: 12, color: colors.brand.primary }}>
            ID: {patient.uniqueId}
          </Text>
        </View>
      </View>

      <Text style={lineStyle}>
        <Text style={labelStyle}>Patient: </Text>
        <Text style={strongStyle}>{patient.name}</Text>
      </Text>

      <Text style={lineStyle}>
        <Text style={labelStyle}>Condition: </Text>
        <Text style={valueStyle}>{getConditionLabel(visit.condition)}</Text>
      </Text>

      <Text style={lineStyle}>
        <Text style={labelStyle}>Vitals: </Text>
        <Text style={valueStyle}>{buildVitalsSummary(visit.vitals)}</Text>
      </Text>

      {visit.notes ? (
        <Text style={lineStyle}>
          <Text style={labelStyle}>Notes: </Text>
          <Text style={valueStyle}>{visit.notes}</Text>
        </Text>
      ) : null}
    </Pressable>
  );
}
