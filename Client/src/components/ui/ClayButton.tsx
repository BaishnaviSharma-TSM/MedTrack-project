import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { primaryButtonStyle, textStyles, useTheme } from '@/theme';

type ClayButtonVariant = 'primary' | 'secondary' | 'outline';

type ClayButtonProps = PressableProps & {
  label: string;
  variant?: ClayButtonVariant;
  icon?: ComponentProps<typeof Feather>['name'];
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ICON_SIZE = 14;
const webPointer = Platform.OS === 'web' ? ({ cursor: 'pointer' } as const) : null;

export function ClayButton({
  label,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  disabled,
  ...props
}: ClayButtonProps) {
  const { colors, isDark } = useTheme();

  const variantStyle =
    variant === 'primary'
      ? { backgroundColor: colors.accent.primary }
      : variant === 'secondary'
        ? {
            backgroundColor: isDark ? colors.brand.alpha10 : colors.brand.alpha08,
            borderWidth: 1,
            borderColor: isDark ? colors.borderSubtle : 'transparent',
          }
        : {
            backgroundColor: isDark ? colors.cardBg : colors.white,
            borderWidth: 1,
            borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
          };

  const contentColor = variant === 'primary' ? colors.white : colors.accent.primary;

  const iconNode = icon ? (
    <Feather name={icon} size={ICON_SIZE} color={contentColor} />
  ) : null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        fullWidth ? styles.fullWidth : styles.hug,
        webPointer,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      {iconPosition === 'left' ? iconNode : null}
      <Text style={[textStyles.button, { color: contentColor }]} numberOfLines={1}>
        {label}
      </Text>
      {iconPosition === 'right' ? iconNode : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    ...primaryButtonStyle,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    flexShrink: 0,
    ...(Platform.OS === 'web' ? ({ boxSizing: 'border-box' } as object) : null),
  },
  hug: {
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
});
