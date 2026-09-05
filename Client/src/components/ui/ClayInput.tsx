import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, inputStyle, spacing, textStyles } from '@/theme';

type ClayInputProps = TextInputProps & {
  label?: string;
  /** clay = recessed; flat = white field with soft shadow (login-style) */
  variant?: 'clay' | 'flat';
  containerStyle?: StyleProp<ViewStyle>;
};

export function ClayInput({
  label,
  variant = 'clay',
  style,
  containerStyle,
  ...props
}: ClayInputProps) {
  const isFlat = variant === 'flat';

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && !isFlat ? (
        <Text style={[textStyles.caption, styles.label]}>{label}</Text>
      ) : null}
      <TextInput
        style={[
          isFlat ? styles.flatInput : inputStyle,
          textStyles.body,
          styles.input,
          style,
        ]}
        placeholderTextColor={isFlat ? '#BDBDBD' : colors.muted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.muted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    color: colors.foreground,
  },
  flatInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 20,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
});
