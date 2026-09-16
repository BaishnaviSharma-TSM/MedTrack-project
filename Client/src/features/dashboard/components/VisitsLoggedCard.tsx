import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';

import { fontFamilies, letterSpacing, useTheme } from '@/theme';

type VisitsLoggedCardProps = {
  visitsToday: number;
  pendingFirstVisitCount: number;
  lastVisitSummary: string | null;
};

export function VisitsLoggedCard({
  visitsToday,
  pendingFirstVisitCount,
  lastVisitSummary,
}: VisitsLoggedCardProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        minHeight: 220,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: fontFamilies.body.medium,
            fontSize: 13,
            color: colors.muted,
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Visits logged today
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading.extraBold,
              fontSize: 48,
              color: colors.accent.primary,
              lineHeight: 56,
            }}
          >
            {visitsToday}
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 14,
              color: colors.muted,
            }}
          >
            so far
          </Text>
        </View>
        {lastVisitSummary ? (
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 13,
              color: colors.muted,
              marginTop: 4,
            }}
            numberOfLines={2}
          >
            {lastVisitSummary}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 13,
              color: colors.muted,
              marginTop: 4,
            }}
          >
            Nothing recorded yet.
          </Text>
        )}
      </View>

      <View style={{ gap: 10, marginTop: 16 }}>
        {pendingFirstVisitCount > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Feather name="clock" size={14} color={colors.accent.warning} />
            <Text
              style={{
                fontFamily: fontFamilies.body.medium,
                fontSize: 13,
                color: colors.foreground,
              }}
            >
              <Text style={{ fontFamily: fontFamilies.body.bold, color: colors.accent.primary }}>
                {pendingFirstVisitCount}
              </Text>{' '}
              patients waiting on a first visit
            </Text>
          </View>
        )}
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: isDark ? 'transparent' : '#FFFFFF',
            borderWidth: 1,
            borderColor: isDark ? colors.borderSubtle : '#E0DCE8',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 16,
            ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
          }}
          onPress={() => router.push('/(app)/visits/new')}
        >
          <Feather name="plus-circle" size={16} color={colors.accent.primary} />
          <Text
            style={{
              fontFamily: fontFamilies.body.bold,
              fontSize: 14,
              letterSpacing: letterSpacing.wide,
              color: colors.accent.primary,
            }}
          >
            Start a visit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
