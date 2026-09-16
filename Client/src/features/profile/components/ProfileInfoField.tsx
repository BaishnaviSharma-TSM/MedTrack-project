import { Platform, Text, TextInput, View, type TextInputProps } from 'react-native';

import { spacing, useTheme } from '@/theme';

type ProfileInfoFieldProps = {
  label: string;
  value: string;
  editable?: boolean;
  required?: boolean;
  error?: string;
  onChangeText?: (text: string) => void;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'editable'>;

export function ProfileInfoField({
  label,
  value,
  editable = false,
  required = false,
  error,
  onChangeText,
  ...inputProps
}: ProfileInfoFieldProps) {
  const { colors, isDark } = useTheme();

  const inputBase = {
    backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
    minHeight: 40,
    paddingHorizontal: spacing.md,
    justifyContent: 'center' as const,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.foreground,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null),
  };

  const editableStyle = editable
    ? {
        backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
        borderColor: isDark ? colors.brand.alpha35 : colors.brand.alpha30,
      }
    : {};

  return (
    <View style={{ flex: 1, minWidth: 0, gap: 5 }}>
      <Text style={{ fontFamily: 'DMSans_500Medium', fontSize: 13, color: colors.muted }}>
        {label}
        {required ? (
          <Text style={{ color: colors.danger, fontFamily: 'DMSans_700Bold', fontSize: 13 }}>
            {' *'}
          </Text>
        ) : null}
      </Text>
      {editable ? (
        <TextInput
          style={[inputBase, editableStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={isDark ? '#5A6B7A' : colors.muted}
          {...inputProps}
        />
      ) : (
        <View style={inputBase} accessibilityLabel={`${label}: ${value || '—'}`}>
          <Text
            style={{ fontFamily: 'DMSans_400Regular', fontSize: 14, color: colors.foreground }}
            numberOfLines={1}
          >
            {value || '—'}
          </Text>
        </View>
      )}
      {error ? (
        <Text style={{ fontFamily: 'DMSans_500Medium', fontSize: 12, color: colors.danger }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
