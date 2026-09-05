import { useEffect, useState } from 'react';

import { getConditions } from '../services/conditionsService';
import type { ConditionDefinition } from '../types';

export function useConditions() {
  const [conditions, setConditions] = useState<ConditionDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getConditions()
      .then(setConditions)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { conditions, isLoading, error };
}
