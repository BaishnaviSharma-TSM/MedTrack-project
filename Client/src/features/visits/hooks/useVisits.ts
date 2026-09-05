import { useEffect, useState } from 'react';

import type { Visit } from '../types';
import { getVisitsByPatient } from '../services/visitService';

export function useVisits(patientId: string) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;
    getVisitsByPatient(patientId)
      .then(setVisits)
      .finally(() => setIsLoading(false));
  }, [patientId]);

  return { visits, isLoading };
}
