import { CONDITIONS } from '@/constants';
import { getPatients } from '@/features/patients/services/patientService.mock';
import { getAllVisits } from '@/features/visits/services/visitService.mock';
import { getVisitRecords } from '@/features/visits/services/visitRecordService.mock';
import type { ConditionType } from '@/types';

import type { DashboardStats } from '../types';

function startOfLocalDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isSameLocalDay(isoDate: string, reference = new Date()) {
  const date = new Date(isoDate);
  return startOfLocalDay(date).getTime() === startOfLocalDay(reference).getTime();
}

function isWithinDays(isoDate: string, days: number) {
  const date = new Date(isoDate);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  cutoff.setHours(0, 0, 0, 0);
  return date >= cutoff;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [patients, visits, visitRecords] = await Promise.all([
    getPatients(),
    getAllVisits(),
    getVisitRecords(),
  ]);

  const visitedPatientIds = new Set(visits.map((visit) => visit.patientId));
  const pendingPatients = patients
    .filter((patient) => !visitedPatientIds.has(patient.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const visitsToday = visits.filter((visit) => isSameLocalDay(visit.visitDate)).length;
  const visitsThisWeek = visits.filter((visit) => isWithinDays(visit.visitDate, 7)).length;
  const visitsLast30d = visits.filter((visit) => isWithinDays(visit.visitDate, 30));

  const conditionCounts = new Map<ConditionType, number>();
  for (const visit of visitsLast30d) {
    const key = visit.condition as ConditionType;
    conditionCounts.set(key, (conditionCounts.get(key) ?? 0) + 1);
  }

  const visitsByCondition = (Object.keys(CONDITIONS) as ConditionType[])
    .map((condition) => ({
      condition,
      label: CONDITIONS[condition].label,
      count: conditionCounts.get(condition) ?? 0,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    visitsToday,
    pendingFirstVisitCount: pendingPatients.length,
    totalPatients: patients.length,
    visitsThisWeek,
    pendingPatients: pendingPatients.slice(0, 5),
    recentVisits: visitRecords.slice(0, 5),
    visitsByCondition,
  };
}
