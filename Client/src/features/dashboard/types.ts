import type { ConditionType, Patient } from '@/types';
import type { VisitRecord } from '@/features/visits/types';

export type ConditionCount = {
  condition: ConditionType;
  label: string;
  count: number;
};

export type WeeklyVisitBar = {
  weekLabel: string;
  total: number;
  byCondition: Record<string, number>;
};

export type DashboardStats = {
  visitsToday: number;
  pendingFirstVisitCount: number;
  totalPatients: number;
  visitsThisWeek: number;
  visitsIn30Days: number;
  pendingPatients: Patient[];
  recentVisits: VisitRecord[];
  visitsByCondition: ConditionCount[];
  weeklyVisitRhythm: WeeklyVisitBar[];
  lastVisitSummary: string | null;
};
