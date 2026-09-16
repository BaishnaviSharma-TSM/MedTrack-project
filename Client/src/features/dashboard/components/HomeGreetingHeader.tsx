import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, Text, TextInput, View } from 'react-native';

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

export function HomeGreetingHeader() {
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: 8,
        gap: 16,
      }}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontFamily: fontFamilies.body.bold,
            fontSize: 26,
            color: colors.foreground,
          }}
          numberOfLines={1}
        >
          {greeting}
        </Text>
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 13,
            color: colors.muted,
            marginTop: 4,
          }}
        >
          {getDateLine()}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDark ? colors.inputBg : colors.inputBg,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: isDark ? colors.borderSubtle : colors.borderSubtle,
            minWidth: 180,
            gap: 8,
          }}
        >
          <Feather name="search" size={15} color={colors.muted} />
          <TextInput
            placeholder="Search patient or ID"
            placeholderTextColor={colors.muted}
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 13,
              color: colors.foreground,
              flex: 1,
              ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null),
            }}
          />
        </View>

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
