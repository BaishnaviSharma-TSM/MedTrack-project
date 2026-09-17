import type { Visit } from '@/types';

export type VitalSnapshot = {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
  visitDate: string;
  condition: string;
};

/** Most recent reading per vital key across all visits (newest visit wins per key). */
export function buildLatestVitalsSnapshot(visits: Visit[], max = 6): VitalSnapshot[] {
  const seen = new Set<string>();
  const result: VitalSnapshot[] = [];

  for (const visit of visits) {
    for (const vital of visit.vitals) {
      if (typeof vital.value === 'boolean') continue;
      if (seen.has(vital.key)) continue;

      seen.add(vital.key);
      result.push({
        key: vital.key,
        label: vital.label,
        value: vital.value,
        unit: vital.unit,
        visitDate: visit.visitDate,
        condition: visit.condition,
      });

      if (result.length >= max) return result;
    }
  }

  return result;
}
