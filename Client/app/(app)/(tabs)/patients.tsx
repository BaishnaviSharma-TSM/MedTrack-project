import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeader } from '@/components/layout';
import { EmptyState, RecordListSkeleton } from '@/components/feedback';
import { PatientFilters } from '@/features/patients/components/PatientFilters';
import { PatientRecordCard } from '@/features/patients/components/PatientRecordCard';
import { usePatientRecords } from '@/features/patients/hooks/usePatientRecords';
import { getTabContentBottomPadding } from '@/constants/navigation';
import styles from '@/styles/screens/patients-tab.styles';

export default function PatientsTabScreen() {
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
  } = usePatientRecords();

  useFocusEffect(
    useCallback(() => {
      refresh(searchQuery);
    }, [refresh, searchQuery]),
  );

  return (
    <View style={styles.screen}>
      <PageHeader
        title="Patient Records"
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
          <RecordListSkeleton />
        ) : records.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No matches found' : 'No patient records'}
            description={
              searchQuery
                ? 'Try a different name, patient ID, or phone number.'
                : 'Tap + to register a new patient.'
            }
          />
        ) : (
          records.map((record) => (
            <PatientRecordCard key={record.patient.id} record={record} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
