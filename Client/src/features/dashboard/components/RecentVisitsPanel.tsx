import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import { VisitConditionCell } from '@/features/visits/components/VisitConditionCell';
import { VisitVitalsChips } from '@/features/visits/components/VisitVitalsChips';
import type { VisitRecord } from '@/features/visits/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useTheme } from '@/theme';

const PREVIEW_LIMIT = 5;

type RecentVisitsPanelProps = {
  records: VisitRecord[];
};

export function RecentVisitsPanel({ records }: RecentVisitsPanelProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const previewRecords = records.slice(0, PREVIEW_LIMIT);

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 14,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading.bold,
              fontSize: 15,
              color: colors.foreground,
            }}
          >
            Recent visits
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 12,
              color: colors.muted,
            }}
          >
            last 5 records
          </Text>
        </View>
        <Pressable
          onPress={() => router.navigate('/(app)/(tabs)/visits?range=all')}
          style={{
            ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
          }}
        >
          <Text
            style={{
              fontFamily: fontFamilies.body.bold,
              fontSize: 12,
              color: colors.accent.primary,
            }}
          >
            View all
          </Text>
        </Pressable>
      </View>

      {/* Column headers */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: isDark ? colors.brand.alpha06 : colors.brand.alpha04,
          borderTopWidth: 1,
          borderTopColor: isDark ? colors.borderSubtle : colors.brand.alpha06,
        }}
      >
        <Text style={[colHeaderStyle(colors.muted), { flex: 1.2 }]}>Date</Text>
        <Text style={[colHeaderStyle(colors.muted), { flex: 2 }]}>Patient</Text>
        <Text style={[colHeaderStyle(colors.muted), { flex: 2 }]}>Condition</Text>
        <Text style={[colHeaderStyle(colors.muted), { flex: 3 }]}>Vitals</Text>
        <Text style={[colHeaderStyle(colors.muted), { flex: 0.8, textAlign: 'right' }]}> </Text>
      </View>

      {/* Rows */}
      {previewRecords.length === 0 ? (
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 14,
            color: colors.muted,
            textAlign: 'center',
            paddingVertical: 24,
          }}
        >
          No recent visits recorded.
        </Text>
      ) : (
        previewRecords.map((record, index) => {
          const isLast = index === previewRecords.length - 1;
          const isHovered = hoveredId === record.visit.id;

          return (
            <Pressable
              key={record.visit.id}
              onPress={() => router.push(`/(app)/visits/${record.visit.id}`)}
              onHoverIn={Platform.OS === 'web' ? () => setHoveredId(record.visit.id) : undefined}
              onHoverOut={Platform.OS === 'web' ? () => setHoveredId(null) : undefined}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: isDark ? colors.brand.alpha06 : colors.brand.alpha04,
                backgroundColor: isHovered ? colors.brand.alpha04 : 'transparent',
                ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
              }}
            >
              <Text
                style={{
                  flex: 1.2,
                  fontFamily: fontFamilies.body.regular,
                  fontSize: 13,
                  color: colors.muted,
                }}
              >
                {formatDisplayDate(record.visit.visitDate)}
              </Text>

              <View style={{ flex: 2, minWidth: 0 }}>
                <Text
                  style={{
                    fontFamily: fontFamilies.heading.bold,
                    fontSize: 13,
                    color: colors.foreground,
                  }}
                  numberOfLines={1}
                >
                  {record.patient.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamilies.body.regular,
                    fontSize: 11,
                    color: colors.muted,
                  }}
                >
                  {record.patient.uniqueId}
                </Text>
              </View>

              <View style={{ flex: 2, minWidth: 0 }}>
                <VisitConditionCell condition={record.visit.condition} />
              </View>

              <View style={{ flex: 3, minWidth: 0 }}>
                <VisitVitalsChips vitals={record.visit.vitals} />
              </View>

              <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                <ClayButton
                  label="Open"
                  variant="secondary"
                  onPress={(event) => {
                    event.stopPropagation?.();
                    router.push(`/(app)/visits/${record.visit.id}`);
                  }}
                />
              </View>
            </Pressable>
          );
        })
      )}
    </View>
  );
}

function colHeaderStyle(color: string) {
  return {
    fontFamily: fontFamilies.body.bold,
    fontSize: 11,
    color,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.4,
  };
}
