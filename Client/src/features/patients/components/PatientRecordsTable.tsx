import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { DataTable, type DataTableColumn } from '@/components/data';
import type { PatientRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useThemeColors } from '@/theme';

type PatientRecordsTableProps = {
  records: PatientRecord[];
};

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

function useColumns(): DataTableColumn<PatientRecord>[] {
  const colors = useThemeColors();

  return [
    {
      key: 'name',
      label: 'Name',
      width: '18%',
      render: (record) => (
        <Text style={{ fontFamily: fontFamilies.body.bold, color: colors.foreground }} numberOfLines={1}>
          {record.patient.name}
        </Text>
      ),
    },
    {
      key: 'id',
      label: 'Patient ID',
      width: '12%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>{record.patient.uniqueId}</Text>
      ),
    },
    {
      key: 'demographics',
      label: 'Age / Gender',
      width: '14%',
      render: (record) => (
        <Text style={{ color: colors.foreground }}>
          {`${record.patient.age} yrs · ${formatGender(record.patient.gender)}`}
        </Text>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      width: '14%',
      render: (record) => (
        <Text style={{ color: colors.foreground }}>{record.patient.contactNumber}</Text>
      ),
    },
    {
      key: 'visits',
      label: 'Visits',
      width: '10%',
      render: (record) => (
        <Text style={{ color: colors.foreground }}>{String(record.visitCount)}</Text>
      ),
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      width: '16%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>
          {record.visitCount === 0 ? '—' : formatDisplayDate(record.lastVisitDate)}
        </Text>
      ),
    },
  ];
}

export function PatientRecordsTable({ records }: PatientRecordsTableProps) {
  const router = useRouter();
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={records}
      keyExtractor={(record) => record.patient.id}
      onRowPress={(record) => router.push(`/(app)/patients/${record.patient.id}`)}
      emptyMessage="No patient records found."
    />
  );
}
