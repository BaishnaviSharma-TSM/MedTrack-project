import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { DataTable, type DataTableColumn } from '@/components/data';
import { ClayButton } from '@/components/ui';
import type { Patient } from '@/types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useThemeColors } from '@/theme';

type PendingPatientsTableProps = {
  patients: Patient[];
};

function useColumns(): DataTableColumn<Patient>[] {
  const colors = useThemeColors();

  return [
    {
      key: 'name',
      label: 'Name',
      width: '30%',
      render: (patient) => (
        <Text
          style={{ fontFamily: fontFamilies.body.bold, color: colors.foreground }}
          numberOfLines={1}
        >
          {patient.name}
        </Text>
      ),
    },
    {
      key: 'id',
      label: 'Patient ID',
      width: '20%',
      render: (patient) => (
        <Text style={{ color: colors.foreground }}>{patient.uniqueId}</Text>
      ),
    },
    {
      key: 'registered',
      label: 'Registered',
      width: '25%',
      render: (patient) => (
        <Text style={{ color: colors.muted }}>{formatDisplayDate(patient.createdAt)}</Text>
      ),
    },
    {
      key: 'action',
      label: '',
      width: '25%',
      render: (patient) => <RecordAction patient={patient} />,
    },
  ];
}

function RecordAction({ patient }: { patient: Patient }) {
  const router = useRouter();

  return (
    <ClayButton
      label="Record visit"
      variant="secondary"
      onPress={(event) => {
        event.stopPropagation?.();
        router.push(`/(app)/visits/new?patientId=${patient.id}`);
      }}
    />
  );
}

export function PendingPatientsTable({ patients }: PendingPatientsTableProps) {
  const router = useRouter();
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={patients}
      keyExtractor={(patient) => patient.id}
      onRowPress={(patient) => router.push(`/(app)/patients/${patient.id}`)}
      emptyMessage="All patients have at least one visit."
    />
  );
}
