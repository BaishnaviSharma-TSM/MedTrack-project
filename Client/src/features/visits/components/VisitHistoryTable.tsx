import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { DataTable, type DataTableColumn } from '@/components/data';
import { getConditionLabel } from '../services/visitRecordService';
import { VisitVitalsChips } from './VisitVitalsChips';
import type { Visit } from '@/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useThemeColors } from '@/theme';

type VisitHistoryTableProps = {
  visits: Visit[];
};

function useColumns(): DataTableColumn<Visit>[] {
  const colors = useThemeColors();

  return [
    {
      key: 'date',
      label: 'Date',
      width: '20%',
      render: (visit) => (
        <Text style={{ color: colors.muted }}>{formatDisplayDate(visit.visitDate)}</Text>
      ),
    },
    {
      key: 'condition',
      label: 'Condition',
      width: '25%',
      render: (visit) => (
        <Text style={{ fontFamily: fontFamilies.body.bold, color: colors.foreground }} numberOfLines={1}>
          {getConditionLabel(visit.condition)}
        </Text>
      ),
    },
    {
      key: 'vitals',
      label: 'Vitals',
      width: '35%',
      render: (visit) => <VisitVitalsChips vitals={visit.vitals} max={2} />,
    },
    {
      key: 'notes',
      label: 'Notes',
      width: '20%',
      render: (visit) => (
        <Text style={{ color: colors.muted }}>
          {visit.notes ? visit.notes.slice(0, 40) : '—'}
        </Text>
      ),
    },
  ];
}

export function VisitHistoryTable({ visits }: VisitHistoryTableProps) {
  const router = useRouter();
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={visits}
      keyExtractor={(visit) => visit.id}
      onRowPress={(visit) => router.push(`/(app)/visits/${visit.id}`)}
      emptyMessage="No visits recorded yet."
    />
  );
}
