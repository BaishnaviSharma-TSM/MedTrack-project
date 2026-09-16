import { Platform, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { fontFamilies, useTheme } from '@/theme';

type StatCardProps = {
  label: string;
  value: number | string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function StatCard({ label, value, subtitle, onPress, style }: StatCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          flex: 1,
          minWidth: '46%' as unknown as number,
          backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
          padding: 16,
          gap: 4,
          ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
        },
        style,
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text
        style={{
          fontFamily: fontFamilies.heading.extraBold,
          fontSize: 28,
          color: colors.accent.primary,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: fontFamilies.body.bold,
          fontSize: 13,
          color: colors.foreground,
        }}
      >
        {label}
      </Text>
      {subtitle ? (
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 11,
            color: colors.muted,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
}
