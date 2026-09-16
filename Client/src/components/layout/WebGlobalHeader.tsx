import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import { useAuthContext } from '@/providers';
import { fontFamilies, useTheme } from '@/theme';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDateLine(): string {
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = dayNames[now.getDay()];
  const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const weekOfMonth = Math.ceil(now.getDate() / 7);
  const suffix = weekOfMonth === 1 ? 'st' : weekOfMonth === 2 ? 'nd' : weekOfMonth === 3 ? 'rd' : 'th';
  return `${day}, ${date} · Week ${weekOfMonth}${suffix} of the month`;
}

/**
 * Shared top header bar for all wide-web pages.
 * Shows greeting, date, Record visit, and New patient.
 */
export function WebGlobalHeader() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { colors, isDark } = useTheme();

  const displayName = user?.displayName ?? 'Doctor';
  const cleanName = displayName.replace(/^(Dr\.?\s*)/i, '').trim();
  const lastName = cleanName.split(' ').pop() ?? cleanName;
  const rolePrefix = user?.role === 'doctor' ? 'Dr. ' : '';
  const greeting = `${getGreeting()}, ${rolePrefix}${lastName}`;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? colors.borderMuted : colors.brand.alpha06,
        backgroundColor: isDark ? '#0D1E30' : '#FFFFFF',
        gap: 16,
      }}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontFamily: fontFamilies.body.bold,
            fontSize: 22,
            color: colors.foreground,
          }}
          numberOfLines={1}
        >
          {greeting}
        </Text>
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 12,
            color: colors.muted,
            marginTop: 2,
          }}
          numberOfLines={1}
        >
          {getDateLine()}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <ClayButton
          label="Record visit"
          variant="secondary"
          icon="activity"
          onPress={() => router.push('/(app)/visits/new')}
        />
        <ClayButton
          label="New patient"
          icon="plus"
          onPress={() => router.push('/(app)/patients/new')}
        />
      </View>
    </View>
  );
}
