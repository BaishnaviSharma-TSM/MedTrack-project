import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { DataTable, type DataTableColumn } from '@/components/data';
import { getConditionLabel } from '@/features/visits/services/visitRecordService';
import { buildVitalsSummary } from '@/features/visits/utils/buildVitalsSummary';
import type { VisitRecord } from '@/features/visits/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useThemeColors } from '@/theme';

type RecentVisitsTableProps = {
  records: VisitRecord[];
};

function useColumns(): DataTableColumn<VisitRecord>[] {
  const colors = useThemeColors();

  return [
    {
      key: 'date',
      label: 'Date',
      width: '22%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>
          {formatDisplayDate(record.visit.visitDate)}
        </Text>
      ),
    },
    {
      key: 'patient',
      label: 'Patient',
      width: '28%',
      render: (record) => (
        <Text
          style={{ fontFamily: fontFamilies.body.bold, color: colors.foreground }}
          numberOfLines={1}
        >
          {record.patient.name}
        </Text>
      ),
    },
    {
      key: 'condition',
      label: 'Condition',
      width: '25%',
      render: (record) => (
        <Text style={{ color: colors.foreground }}>
          {getConditionLabel(record.visit.condition)}
        </Text>
      ),
    },
    {
      key: 'vitals',
      label: 'Vitals',
      width: '25%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>
          {buildVitalsSummary(record.visit.vitals, 2)}
        </Text>
      ),
    },
  ];
}

export function RecentVisitsTable({ records }: RecentVisitsTableProps) {
  const router = useRouter();
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={records}
      keyExtractor={(record) => record.visit.id}
      onRowPress={(record) => router.push(`/(app)/visits/${record.visit.id}`)}
      emptyMessage="No recent visits recorded."
    />
  );
}
