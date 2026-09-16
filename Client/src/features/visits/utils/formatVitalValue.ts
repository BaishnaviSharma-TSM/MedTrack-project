import type { VitalSign } from '@/types';

export function formatVitalValue(value: string | number | boolean): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}

export function formatVitalReading(vital: Pick<VitalSign, 'value' | 'unit'>): string {
  const unit = typeof vital.value === 'boolean' ? '' : vital.unit ? ` ${vital.unit}` : '';
  return `${formatVitalValue(vital.value)}${unit}`;
}
