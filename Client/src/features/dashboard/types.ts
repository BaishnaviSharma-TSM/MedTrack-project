import type { ConditionType, Patient } from '@/types';
import type { VisitRecord } from '@/features/visits/types';

export type ConditionCount = {
  condition: ConditionType;
  label: string;
  count: number;
};

export type DashboardStats = {
  visitsToday: number;
  pendingFirstVisitCount: number;
  totalPatients: number;
  visitsThisWeek: number;
  pendingPatients: Patient[];
  recentVisits: VisitRecord[];
  visitsByCondition: ConditionCount[];
};
