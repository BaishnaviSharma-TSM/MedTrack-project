import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { fontFamilies, useTheme } from '@/theme';

type QuickAction = {
  label: string;
  description: string;
  icon: ComponentProps<typeof Feather>['name'];
  href: string;
};

const ACTIONS: QuickAction[] = [
  {
    label: 'Add New Patient',
    description: 'Register demographics and start a record',
    icon: 'user-plus',
    href: '/(app)/patients/new',
  },
  {
    label: 'Record Visit',
    description: 'Log vitals for an existing patient',
    icon: 'activity',
    href: '/(app)/visits/new',
  },
];

export function QuickActionBar() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {ACTIONS.map((action) => (
        <Pressable
          key={action.href}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
            borderRadius: 32,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderSubtle : 'transparent',
            ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
          }}
          onPress={() => router.push(action.href as never)}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.brand.alpha10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name={action.icon} size={22} color={colors.accent.primary} />
          </View>
          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            <Text
              style={{
                fontFamily: fontFamilies.body.bold,
                fontSize: 16,
                color: colors.foreground,
              }}
            >
              {action.label}
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies.body.regular,
                fontSize: 14,
                color: colors.muted,
              }}
            >
              {action.description}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.muted} />
        </Pressable>
      ))}
    </View>
  );
}
