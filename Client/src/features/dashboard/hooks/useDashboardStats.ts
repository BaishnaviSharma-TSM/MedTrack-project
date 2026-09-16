import { useCallback, useState } from 'react';

import type { DashboardStats } from '../types';
import { getDashboardStats } from '../services/dashboardService';

const EMPTY_STATS: DashboardStats = {
  visitsToday: 0,
  pendingFirstVisitCount: 0,
  totalPatients: 0,
  visitsThisWeek: 0,
  visitsIn30Days: 0,
  pendingPatients: [],
  recentVisits: [],
  visitsByCondition: [],
  weeklyVisitRhythm: [],
  lastVisitSummary: null,
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardStats();
      setStats({ ...EMPTY_STATS, ...data });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, refresh };
}
