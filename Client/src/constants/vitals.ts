/** Normal reference ranges for vital signs — Phase 4.3 */
export const NORMAL_RANGES: Record<string, { min: number; max: number; unit: string }> = {
  temperature: { min: 97, max: 99, unit: '°F' },
  spo2: { min: 95, max: 100, unit: '%' },
  pulse: { min: 60, max: 100, unit: 'bpm' },
  systolic: { min: 90, max: 120, unit: 'mmHg' },
  diastolic: { min: 60, max: 80, unit: 'mmHg' },
  fastingGlucose: { min: 70, max: 100, unit: 'mg/dL' },
  postMealGlucose: { min: 70, max: 140, unit: 'mg/dL' },
  hba1c: { min: 4, max: 5.6, unit: '%' },
  respiratoryRate: { min: 12, max: 20, unit: 'breaths/min' },
};
