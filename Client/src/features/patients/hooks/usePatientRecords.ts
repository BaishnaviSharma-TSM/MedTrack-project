import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ListQueryParams } from '@/types/api';

import type { DateRangeChip, PatientRecord } from '../types';
import { getPatientRecords } from '../services/patientRecordService';

function buildQueryParams(
  dateRange: DateRangeChip,
  fromDate: string,
  toDate: string,
): ListQueryParams {
  if (fromDate || toDate) {
    return { from: fromDate, to: toDate };
  }
  if (dateRange !== 'all') {
    return { range: dateRange };
  }
  return {};
}

function isWithinDays(isoDate: string, days: number) {
  const date = new Date(isoDate);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff;
}

function isWithinRange(isoDate: string, fromDate: string, toDate: string) {
  const date = new Date(isoDate);
  if (fromDate) {
    const from = new Date(fromDate);
    if (date < from) return false;
  }
  if (toDate) {
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);
    if (date > to) return false;
  }
  return true;
}

export function usePatientRecords() {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeChip>('30d');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const refresh = useCallback(async (query = searchQuery) => {
    setIsLoading(true);
    try {
      const data = await getPatientRecords(query, buildQueryParams(dateRange, fromDate, toDate));
      setRecords(data);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, dateRange, fromDate, toDate]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (fromDate || toDate) {
        return isWithinRange(record.lastVisitDate, fromDate, toDate);
      }

      if (dateRange === '7d') return isWithinDays(record.lastVisitDate, 7);
      if (dateRange === '30d') return isWithinDays(record.lastVisitDate, 30);
      return true;
    });
  }, [records, dateRange, fromDate, toDate]);

  return {
    records: filteredRecords,
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
  };
}
