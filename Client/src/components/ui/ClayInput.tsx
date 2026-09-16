import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { inputStyle, spacing, textStyles, useTheme } from '@/theme';

type ClayInputProps = TextInputProps & {
  label?: string;
  required?: boolean;
  /** clay = recessed; flat = white field with soft shadow (login-style) */
  variant?: 'clay' | 'flat';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function ClayInput({
  label,
  required = false,
  variant = 'clay',
  style,
  containerStyle,
  labelStyle,
  ...props
}: ClayInputProps) {
  const isFlat = variant === 'flat';
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text
          style={[
            textStyles.caption,
            isFlat
              ? { color: colors.foreground, fontWeight: '500', letterSpacing: 0, textTransform: 'none', fontSize: 13 }
              : { color: colors.muted, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
            labelStyle,
          ]}
        >
          {label}
          {required ? (
            <Text style={{ color: colors.danger, fontFamily: 'DMSans_700Bold' }}>
              {' *'}
            </Text>
          ) : null}
        </Text>
      ) : null}
      <TextInput
        style={[
          isFlat
            ? {
                backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
                height: 48,
                paddingHorizontal: spacing.base,
                fontFamily: 'DMSans_400Regular',
                fontSize: 15,
              }
            : {
                ...inputStyle,
                backgroundColor: colors.inputBg,
              },
          textStyles.body,
          {
            color: colors.foreground,
            ...(Platform.OS === 'web'
              ? ({ outlineStyle: 'none', outlineWidth: 0, boxShadow: 'none' } as object)
              : null),
          },
          style,
        ]}
        placeholderTextColor={isDark ? '#5A6B7A' : isFlat ? '#BDBDBD' : colors.muted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
});
