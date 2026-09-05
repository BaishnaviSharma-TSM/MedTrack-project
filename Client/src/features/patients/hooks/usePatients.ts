import { useCallback, useEffect, useState } from 'react';

import type { Patient } from '../types';
import { getPatients, searchPatients } from '../services/patientService';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const refresh = useCallback(async (query = searchQuery) => {
    setIsLoading(true);
    try {
      const data = query.trim() ? await searchPatients(query) : await getPatients();
      setPatients(data);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { patients, isLoading, searchQuery, setSearchQuery, refresh };
}
