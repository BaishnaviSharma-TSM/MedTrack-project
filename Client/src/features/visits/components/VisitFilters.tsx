import { Feather } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';

import type { DateRangeChip } from '../types';
import styles from '@/styles/screens/visits-tab.styles';
import { colors } from '@/theme';

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
  return (
    <View style={styles.filtersBlock}>
      <View style={styles.dateRow}>
        <View style={styles.dateFieldWrap}>
          <Text style={styles.dateLabel}>From Date</Text>
          <View style={styles.dateField}>
            <Feather name="calendar" size={18} color={colors.muted} />
            <TextInput
              style={styles.dateInput}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.muted}
              value={fromDate}
              onChangeText={onFromDateChange}
            />
          </View>
        </View>
        <View style={styles.dateFieldWrap}>
          <Text style={styles.dateLabel}>To Date</Text>
          <View style={styles.dateField}>
            <Feather name="calendar" size={18} color={colors.muted} />
            <TextInput
              style={styles.dateInput}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.muted}
              value={toDate}
              onChangeText={onToDateChange}
            />
          </View>
        </View>
      </View>

      <View style={styles.chipRow}>
        {RANGE_OPTIONS.map((option) => {
          const selected = dateRange === option.value;
          return (
            <Pressable
              key={option.value}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => onDateRangeChange(option.value)}
            >
              <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.searchRow}>
        <Feather name="search" size={18} color={colors.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, ID, or condition..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <Pressable style={styles.filterIconButton} accessibilityLabel="Filter options">
          <Feather name="sliders" size={18} color={colors.muted} />
        </Pressable>
      </View>
    </View>
  );
}
