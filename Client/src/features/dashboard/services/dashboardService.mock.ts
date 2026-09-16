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

  const visitsIn30Days = visitsLast30d.length;

  /* ── Weekly rhythm (last 17 weeks, stacked by condition) ── */
  const weeklyMap = new Map<string, Record<string, number>>();
  const now = new Date();
  for (let w = 16; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - w * 7);
    const key = `${weekStart.getDate()} ${weekStart.toLocaleString('default', { month: 'short' })}`;
    weeklyMap.set(key, {});
  }

  for (const visit of visits) {
    const vd = new Date(visit.visitDate);
    const diffMs = now.getTime() - vd.getTime();
    const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    if (diffWeeks >= 0 && diffWeeks <= 16) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - diffWeeks * 7);
      const key = `${weekStart.getDate()} ${weekStart.toLocaleString('default', { month: 'short' })}`;
      const bucket = weeklyMap.get(key);
      if (bucket) {
        const cond = visit.condition;
        bucket[cond] = (bucket[cond] ?? 0) + 1;
      }
    }
  }

  const weeklyVisitRhythm = Array.from(weeklyMap.entries()).map(([weekLabel, byCondition]) => ({
    weekLabel,
    total: Object.values(byCondition).reduce((s, c) => s + c, 0),
    byCondition,
  }));

  /* ── Last visit summary ── */
  const sortedVisits = [...visits].sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime(),
  );
  const lastVisit = sortedVisits[0];
  const lastVisitSummary = lastVisit
    ? (() => {
        const matchedPatient = patients.find((p) => p.id === lastVisit.patientId);
        const vDate = new Date(lastVisit.visitDate);
        const dayDiff = Math.floor((now.getTime() - vDate.getTime()) / (1000 * 60 * 60 * 24));
        const when = dayDiff === 0 ? 'today' : dayDiff === 1 ? 'yesterday' : `${dayDiff} days ago`;
        return matchedPatient
          ? `Your last visit was ${matchedPatient.name}, ${when}`
          : `Last visit was ${when}`;
      })()
    : null;

  return {
    visitsToday,
    pendingFirstVisitCount: pendingPatients.length,
    totalPatients: patients.length,
    visitsThisWeek,
    visitsIn30Days,
    pendingPatients: pendingPatients.slice(0, 3),
    recentVisits: visitRecords.slice(0, 5),
    visitsByCondition,
    weeklyVisitRhythm,
    lastVisitSummary,
  };
}
