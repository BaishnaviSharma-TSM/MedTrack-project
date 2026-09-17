import { Feather } from '@expo/vector-icons';
import { Pressable, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fontFamilies, fontSizes, spacing, useTheme } from '@/theme';

type PageHeaderProps = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  background?: 'white' | 'canvas' | 'transparent';
};

export function PageHeader({
  title,
  onBack,
  showBack = true,
  background = 'white',
}: PageHeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const bgColor =
    background === 'canvas'
      ? colors.canvas
      : background === 'transparent'
        ? 'transparent'
        : isDark
          ? colors.cardBg
          : '#FFFFFF';

  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderBottomWidth: background === 'transparent' ? 0 : 1,
        borderBottomColor: colors.borderMuted,
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.base,
          paddingVertical: spacing.md,
          minHeight: 52,
        }}
      >
        {showBack && onBack ? (
          <Pressable
            style={{
              marginRight: spacing.sm,
              padding: spacing.xs,
              ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
            }}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 12, bottom: 12, right: 16, left: 4 }}
          >
            <Feather name="chevron-left" size={26} color={colors.muted} />
          </Pressable>
        ) : null}
        <Text
          style={{
            flex: 1,
            fontFamily: fontFamilies.heading.bold,
            fontSize: fontSizes.xl,
            color: colors.foreground,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
