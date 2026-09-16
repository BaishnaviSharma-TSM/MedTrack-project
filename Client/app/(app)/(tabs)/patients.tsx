import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState, RecordListSkeleton, TableSkeleton } from '@/components/feedback';
import { ScreenLayout } from '@/components/layout';
import { PatientFilters } from '@/features/patients/components/PatientFilters';
import { PatientRecordCard } from '@/features/patients/components/PatientRecordCard';
import { PatientRecordsTable } from '@/features/patients/components/PatientRecordsTable';
import { usePatientRecords } from '@/features/patients/hooks/usePatientRecords';
import { getTabContentBottomPadding, SCREEN_TITLES } from '@/constants/navigation';
import { useDocumentTitle, useIsWideLayout } from '@/hooks';
import styles from '@/styles/screens/patients-tab.styles';
import wideStyles from '@/styles/layout/wide-layout.styles';

export default function PatientsTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isWideLayout = useIsWideLayout();
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
  } = usePatientRecords();

  useDocumentTitle(SCREEN_TITLES.patients);

  useFocusEffect(
    useCallback(() => {
      refresh(searchQuery);
    }, [refresh, searchQuery]),
  );

  return (
    <ScreenLayout
      title={SCREEN_TITLES.patients}
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
          <PatientFilters
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
              title={searchQuery ? 'No matches found' : 'No patient records'}
              description={
                searchQuery
                  ? 'Try a different name, patient ID, or phone number.'
                  : 'Tap + to register a new patient.'
              }
            />
          ) : isWideLayout ? (
            <PatientRecordsTable records={records} />
          ) : (
            records.map((record) => (
              <PatientRecordCard key={record.patient.id} record={record} />
            ))
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
