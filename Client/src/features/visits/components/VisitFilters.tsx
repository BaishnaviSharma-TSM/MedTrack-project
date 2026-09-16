import { Feather } from '@expo/vector-icons';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

import type { DateRangeChip } from '../types';
import { DateField } from '@/components/ui';
import { spacing, useTheme } from '@/theme';

type VisitFiltersProps = {
  fromDate: string;
  toDate: string;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  dateRange: DateRangeChip;
  onDateRangeChange: (value: DateRangeChip) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const RANGE_OPTIONS: { value: DateRangeChip; label: string }[] = [
  { value: 'all', label: 'All Records' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

export function VisitFilters({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  dateRange,
  onDateRangeChange,
  searchQuery,
  onSearchChange,
}: VisitFiltersProps) {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ gap: spacing.base, marginBottom: spacing.sm }}>
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        <DateField
          label="From Date"
          value={fromDate}
          onChange={onFromDateChange}
          maxDate={toDate || undefined}
        />
        <DateField
          label="To Date"
          value={toDate}
          onChange={onToDateChange}
          minDate={fromDate || undefined}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {RANGE_OPTIONS.map((option) => {
          const selected = dateRange === option.value;
          return (
            <Pressable
              key={option.value}
              style={{
                paddingHorizontal: spacing.base,
                paddingVertical: spacing.sm,
                borderRadius: 999,
                backgroundColor: selected
                  ? colors.brand.primary
                  : isDark ? colors.cardBg : '#FFFFFF',
                borderWidth: 1,
                borderColor: selected
                  ? colors.brand.primary
                  : isDark ? colors.borderSubtle : '#E8E4EF',
              }}
              onPress={() => onDateRangeChange(option.value)}
            >
              <Text
                style={{
                  fontFamily: selected ? 'DMSans_700Bold' : 'DMSans_500Medium',
                  fontSize: 13,
                  color: selected ? '#FFFFFF' : colors.muted,
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
          paddingHorizontal: spacing.md,
          height: 48,
        }}
      >
        <Feather
          name="search"
          size={18}
          color={colors.muted}
          style={{ marginRight: spacing.sm }}
        />
        <TextInput
          style={{
            flex: 1,
            fontFamily: 'DMSans_400Regular',
            fontSize: 14,
            color: colors.foreground,
            paddingVertical: 0,
            ...(Platform.OS === 'web'
              ? ({ outlineStyle: 'none', outlineWidth: 0, boxShadow: 'none' } as object)
              : null),
          }}
          placeholder="Search by name, ID, or condition..."
          placeholderTextColor={isDark ? '#5A6B7A' : colors.muted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
}
