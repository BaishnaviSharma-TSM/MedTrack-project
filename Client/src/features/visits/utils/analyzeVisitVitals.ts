import { NORMAL_RANGES } from '@/constants';
import type { Visit, VitalSign } from '@/types';

import { formatVitalValue } from './formatVitalValue';

export type VitalStatus = 'normal' | 'high' | 'low';

export type MeasuredVital = {
  key: string;
  label: string;
  displayValue: string;
  unit?: string;
  status: VitalStatus | null;
  rangeLabel: string | null;
  statusNote: string | null;
  previousNote: string | null;
};

export type FindingVital = {
  key: string;
  label: string;
  displayValue: string;
  emphasized: boolean;
};

export type VisitVitalsAnalysis = {
  measured: MeasuredVital[];
  findings: FindingVital[];
  flaggedCount: number;
  measuredCount: number;
  reportedFindingCount: number;
};

export type VisitTimelineContext = {
  ordinal: number;
  total: number;
  previous: Visit | null;
};

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1).replace(/\.0$/, '');
}

function parseBloodPressure(value: string): { systolic: number; diastolic: number } | null {
  const match = value.trim().match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/);
  if (!match) return null;
  return { systolic: Number(match[1]), diastolic: Number(match[2]) };
}

function getNumericStatus(key: string, value: number): VitalStatus | null {
  const range = NORMAL_RANGES[key];
  if (!range) return null;
  if (value < range.min) return 'low';
  if (value > range.max) return 'high';
  return 'normal';
}

function combineBpStatus(
  systolic: VitalStatus | null,
  diastolic: VitalStatus | null,
): VitalStatus | null {
  if (systolic === 'high' || diastolic === 'high') return 'high';
  if (systolic === 'low' || diastolic === 'low') return 'low';
  if (systolic === 'normal' && diastolic === 'normal') return 'normal';
  return systolic ?? diastolic;
}

function formatDelta(current: number, previous: number, unit?: string): string {
  const diff = current - previous;
  if (Math.abs(diff) < 0.05) return 'Unchanged from last visit';
  const arrow = diff > 0 ? '↑' : '↓';
  const unitPart = unit ? ` ${unit}` : '';
  return `${arrow} ${formatNumber(Math.abs(diff))}${unitPart} from last visit`;
}

function statusNoteForRange(status: VitalStatus, value: number, key: string): string {
  const range = NORMAL_RANGES[key];
  if (!range) return '';
  if (status === 'normal') return `Within ${range.min}–${range.max} ${range.unit}`;
  if (status === 'high') {
    return `${formatNumber(value - range.max)} ${range.unit} above range`;
  }
  return `${formatNumber(range.min - value)} ${range.unit} below range`;
}

function analyzeBloodPressure(
  vital: VitalSign,
  parsed: { systolic: number; diastolic: number },
  previous: VitalSign | undefined,
): MeasuredVital {
  const systolicStatus = getNumericStatus('systolic', parsed.systolic);
  const diastolicStatus = getNumericStatus('diastolic', parsed.diastolic);
  const status = combineBpStatus(systolicStatus, diastolicStatus);
  const previousBp =
    typeof previous?.value === 'string' ? parseBloodPressure(previous.value) : null;

  let statusNote: string | null = null;
  if (status === 'normal') statusNote = 'Within 90–120 / 60–80 mmHg';
  else if (status === 'high') statusNote = 'Above 120/80 mmHg';
  else if (status === 'low') statusNote = 'Below 90/60 mmHg';

  let previousNote: string | null = null;
  if (previousBp) {
    if (
      previousBp.systolic === parsed.systolic &&
      previousBp.diastolic === parsed.diastolic
    ) {
      previousNote = 'Unchanged from last visit';
    } else {
      previousNote = `Last visit ${previousBp.systolic}/${previousBp.diastolic}`;
    }
  }

  return {
    key: vital.key,
    label: vital.label,
    displayValue: `${parsed.systolic}/${parsed.diastolic}`,
    unit: vital.unit ?? 'mmHg',
    status,
    rangeLabel: '90–120 / 60–80 mmHg',
    statusNote,
    previousNote,
  };
}

export function analyzeVisitVitals(
  vitals: VitalSign[],
  previousVitals?: VitalSign[],
): VisitVitalsAnalysis {
  const previousByKey = new Map((previousVitals ?? []).map((vital) => [vital.key, vital]));
  const measured: MeasuredVital[] = [];
  const findings: FindingVital[] = [];

  for (const vital of vitals) {
    if (typeof vital.value === 'boolean') {
      findings.push({
        key: vital.key,
        label: vital.label,
        displayValue: vital.value ? 'Yes' : 'No',
        emphasized: vital.value,
      });
      continue;
    }

    if (typeof vital.value === 'string') {
      const trimmed = vital.value.trim();
      if (!trimmed) continue;

      const parsedBp = parseBloodPressure(trimmed);
      if (parsedBp) {
        measured.push(analyzeBloodPressure(vital, parsedBp, previousByKey.get(vital.key)));
        continue;
      }

      findings.push({
        key: vital.key,
        label: vital.label,
        displayValue: trimmed,
        emphasized: true,
      });
      continue;
    }

    if (typeof vital.value !== 'number' || !Number.isFinite(vital.value)) continue;

    const previous = previousByKey.get(vital.key);
    const previousNumber = typeof previous?.value === 'number' ? previous.value : null;
    const status = getNumericStatus(vital.key, vital.value);
    const range = NORMAL_RANGES[vital.key];

    measured.push({
      key: vital.key,
      label: vital.label,
      displayValue: formatVitalValue(vital.value),
      unit: vital.unit,
      status,
      rangeLabel: range ? `${range.min}–${range.max} ${range.unit}` : null,
      statusNote: status ? statusNoteForRange(status, vital.value, vital.key) : null,
      previousNote:
        previousNumber == null ? null : formatDelta(vital.value, previousNumber, vital.unit),
    });
  }

  return {
    measured,
    findings,
    flaggedCount: measured.filter((item) => item.status === 'high' || item.status === 'low')
      .length,
    measuredCount: measured.length,
    reportedFindingCount: findings.filter((item) => item.emphasized).length,
  };
}

export function getVisitTimelineContext(
  visits: Visit[],
  currentId: string,
): VisitTimelineContext {
  const chronological = [...visits].sort(
    (left, right) => new Date(left.visitDate).getTime() - new Date(right.visitDate).getTime(),
  );
  const index = chronological.findIndex((visit) => visit.id === currentId);

  return {
    ordinal: index >= 0 ? index + 1 : 0,
    total: visits.length,
    previous: index > 0 ? chronological[index - 1] : null,
  };
}
