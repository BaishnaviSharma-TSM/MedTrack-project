import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, primaryButtonStyle, radii, shadows, sizes, textStyles } from '@/theme';

type ClayButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: StyleProp<ViewStyle>;
};

export function ClayButton({
  label,
  variant = 'primary',
  style,
  disabled,
  ...props
}: ClayButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          textStyles.button,
          variant === 'primary' ? styles.labelPrimary : styles.labelDefault,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    ...primaryButtonStyle,
    minHeight: sizes.button,
    paddingHorizontal: 24,
  },
  pressed: {
    transform: [{ scale: 0.92 }],
    ...shadows.clayPressed,
  },
  disabled: {
    opacity: 0.6,
  },
  labelPrimary: {
    color: colors.white,
  },
  labelDefault: {
    color: colors.foreground,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent.primary,
    ...shadows.clayButton,
  },
  secondary: {
    backgroundColor: colors.white,
    ...shadows.clayButton,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: `${colors.accent.primary}33`,
    ...shadows.none,
  },
  ghost: {
    backgroundColor: colors.transparent,
    ...shadows.none,
    minHeight: sizes.buttonSm,
  },
});
