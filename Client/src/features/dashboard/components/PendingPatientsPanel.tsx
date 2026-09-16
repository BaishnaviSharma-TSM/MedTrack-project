import { useRouter } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import type { Patient } from '@/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useTheme } from '@/theme';

const PREVIEW_LIMIT = 3;

type PendingPatientsPanelProps = {
  patients: Patient[];
  totalPending: number;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function getDaysWaiting(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)));
}

export function PendingPatientsPanel({ patients, totalPending }: PendingPatientsPanelProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const previewPatients = patients.slice(0, PREVIEW_LIMIT);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: 20,
        minWidth: 0,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
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
            Waiting on a first visit
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 12,
              color: colors.muted,
            }}
          >
            registered, no visits yet
          </Text>
        </View>
        {totalPending > 0 && (
          <Pressable
            onPress={() => router.navigate('/(app)/(tabs)/patients')}
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
        )}
      </View>

      {/* Patient rows */}
      {previewPatients.length === 0 ? (
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 14,
            color: colors.muted,
            textAlign: 'center',
            paddingVertical: 20,
          }}
        >
          All patients have at least one visit recorded.
        </Text>
      ) : (
        <View style={{ gap: 10 }}>
          {previewPatients.map((patient) => {
            const initials = getInitials(patient.name);
            const daysWaiting = getDaysWaiting(patient.createdAt);

            return (
              <View
                key={patient.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingVertical: 6,
                }}
              >
                {/* Avatar */}
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: colors.brand.alpha10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.body.bold,
                      fontSize: 13,
                      color: colors.accent.primary,
                    }}
                  >
                    {initials}
                  </Text>
                </View>

                {/* Info */}
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    style={{
                      fontFamily: fontFamilies.heading.bold,
                      fontSize: 14,
                      color: colors.foreground,
                    }}
                    numberOfLines={1}
                  >
                    {patient.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.body.regular,
                      fontSize: 12,
                      color: colors.muted,
                    }}
                    numberOfLines={1}
                  >
                    {patient.uniqueId} · registered {formatDisplayDate(patient.createdAt)}
                  </Text>
                </View>

                {/* Badges */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <View
                    style={{
                      backgroundColor: isDark ? 'rgba(251, 191, 36, 0.12)' : 'rgba(245, 158, 11, 0.1)',
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fontFamilies.body.medium,
                        fontSize: 11,
                        color: colors.accent.warning,
                      }}
                    >
                      {daysWaiting} days waiting
                    </Text>
                  </View>

                  <ClayButton
                    label="Record visit"
                    variant="secondary"
                    onPress={() => router.push(`/(app)/visits/new?patientId=${patient.id}`)}
                  />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
