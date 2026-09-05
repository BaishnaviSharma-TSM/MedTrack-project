import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeader } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import { EmptyState, RecordListSkeleton } from '@/components/feedback';
import { VisitFilters } from '@/features/visits/components/VisitFilters';
import { VisitRecordCard } from '@/features/visits/components/VisitRecordCard';
import { useVisitRecords } from '@/features/visits/hooks/useVisitRecords';
import { getTabContentBottomPadding } from '@/constants/navigation';
import styles from '@/styles/screens/visits-tab.styles';

export default function VisitsTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
  } = useVisitRecords();

  useFocusEffect(
    useCallback(() => {
      refresh(searchQuery);
    }, [refresh, searchQuery]),
  );

  return (
    <View style={styles.screen}>
      <PageHeader
        title="Visit Records"
        onBack={() => router.navigate('/(app)/(tabs)/')}
        background="transparent"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getTabContentBottomPadding(insets.bottom) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Log a new visit</Text>
          <Text style={styles.ctaText}>
            Pick a patient, save their condition, then fill the vitals form that loads for it.
          </Text>
          <ClayButton
            label="Record Visit"
            onPress={() => router.push('/(app)/visits/new')}
            style={styles.recordButton}
          />
        </View>

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
          <RecordListSkeleton />
        ) : records.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No matches found' : 'No visit records'}
            description={
              searchQuery
                ? 'Try a different name, ID, or condition.'
                : 'Tap Record Visit to log vitals for a patient.'
            }
          />
        ) : (
          records.map((record) => (
            <VisitRecordCard key={record.visit.id} record={record} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
