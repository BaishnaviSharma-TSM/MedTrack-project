import type { ConditionType } from '@/types';

import { CONDITIONS } from './conditions';

/**
 * Teal-ramp condition definitions for stacked charts.
 *
 * Shared across VisitRhythmCard, ConditionDonutChart, and visit-table dots
 * so one shade always means one condition app-wide.
 *
 * Light-mode colors follow a teal ramp (dark → light):
 *   general ▸ t900   fever ▸ t600   hypertension ▸ t400   diabetes ▸ t200
 *   asthma ▸ t500   cardiac ▸ t700   anemia ▸ t300
 * Dark-mode inverts the ramp so bars stay legible on dark canvases.
 */
export interface ChartCondition {
  id: ConditionType;
  name: string;
  /** Light-mode fill */
  color: string;
  /** Dark-mode fill */
  darkColor: string;
}

/* ── Teal ramp reference (not exported; kept for docs) ──
 * t950 #03211f   t900 #063b38   t800 #0a544e   t700 #0e6b64
 * t600 #12857c   t500 #19a39a   t400 #4dbcb4   t300 #86d5ce
 * t200 #bfe9e5   t100 #e3f4f2   t050 #f1faf8
 */

export const CHART_CONDITIONS: ChartCondition[] = [
  { id: 'general',      name: CONDITIONS.general.label,      color: '#063b38', darkColor: '#86d5ce' },
  { id: 'fever',        name: CONDITIONS.fever.label,        color: '#12857c', darkColor: '#4dbcb4' },
  { id: 'hypertension', name: CONDITIONS.hypertension.label, color: '#4dbcb4', darkColor: '#19a39a' },
  { id: 'diabetes',     name: CONDITIONS.diabetes.label,     color: '#bfe9e5', darkColor: '#0e6b64' },
  { id: 'asthma',       name: CONDITIONS.asthma.label,       color: '#19a39a', darkColor: '#12857c' },
  { id: 'cardiac',      name: CONDITIONS.cardiac.label,      color: '#0e6b64', darkColor: '#063b38' },
  { id: 'anemia',       name: CONDITIONS.anemia.label,       color: '#86d5ce', darkColor: '#bfe9e5' },
];

/** Quick lookup: condition id → { color, darkColor } */
export const CONDITION_COLOR_MAP = Object.fromEntries(
  CHART_CONDITIONS.map((c) => [c.id, { color: c.color, darkColor: c.darkColor }]),
) as Record<ConditionType, { color: string; darkColor: string }>;
