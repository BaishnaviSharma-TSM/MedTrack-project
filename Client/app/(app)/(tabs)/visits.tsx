import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState, RecordListSkeleton, TableSkeleton } from '@/components/feedback';
import { ScreenLayout } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import { VisitFilters } from '@/features/visits/components/VisitFilters';
import { VisitRecordCard } from '@/features/visits/components/VisitRecordCard';
import { VisitRecordsTable } from '@/features/visits/components/VisitRecordsTable';
import type { DateRangeChip } from '@/features/visits/types';
import { useVisitRecords } from '@/features/visits/hooks/useVisitRecords';
import { getTabContentBottomPadding, SCREEN_TITLES } from '@/constants/navigation';
import { useDocumentTitle, useIsWideLayout } from '@/hooks';
import { spacing, useTheme } from '@/theme';
import styles from '@/styles/screens/visits-tab.styles';
import wideStyles from '@/styles/layout/wide-layout.styles';

function parseDateRange(value?: string): DateRangeChip | undefined {
  if (value === 'all' || value === '7d' || value === '30d') return value;
  return undefined;
}

export default function VisitsTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isWideLayout = useIsWideLayout();
  const { colors, isDark } = useTheme();
  const { range } = useLocalSearchParams<{ range?: string | string[] }>();
  const requestedRange = parseDateRange(Array.isArray(range) ? range[0] : range);
  const {
    records,
    isLoading,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    refresh,
  } = useVisitRecords(requestedRange ?? '30d');

  useEffect(() => {
    if (requestedRange) {
      setDateRange(requestedRange);
    }
  }, [requestedRange, setDateRange]);

  useDocumentTitle(SCREEN_TITLES.visits);

  useFocusEffect(
    useCallback(() => {
      refresh(searchQuery);
    }, [refresh, searchQuery]),
  );

  return (
    <ScreenLayout
      title={SCREEN_TITLES.visits}
      showBack
      onBack={() => router.navigate('/(app)/(tabs)/')}
    >
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isWideLayout && wideStyles.contentContainer,
            { paddingBottom: getTabContentBottomPadding(insets.bottom, isWideLayout) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!isWideLayout ? (
            <View
              style={[
                styles.ctaCard,
                {
                  backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
                  borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
                },
              ]}
            >
              <Text style={[styles.ctaTitle, { color: colors.foreground }]}>
                Log a new visit
              </Text>
              <Text style={[styles.ctaText, { color: colors.muted }]}>
                Pick a patient, save their condition, then fill the vitals form that loads for it.
              </Text>
              <ClayButton
                label="Record Visit"
                icon="activity"
                onPress={() => router.push('/(app)/visits/new')}
                style={{ marginTop: spacing.xs }}
              />
            </View>
          ) : null}

          <VisitFilters
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {isLoading ? (
            isWideLayout ? <TableSkeleton rows={6} columns={6} /> : <RecordListSkeleton />
          ) : records.length === 0 ? (
            <EmptyState
              title={searchQuery ? 'No matches found' : 'No visit records'}
              description={
                searchQuery
                  ? 'Try a different name, ID, or condition.'
                  : 'Tap Record Visit to log vitals for a patient.'
              }
            />
          ) : isWideLayout ? (
            <VisitRecordsTable records={records} />
          ) : (
            records.map((record) => (
              <VisitRecordCard key={record.visit.id} record={record} />
            ))
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
