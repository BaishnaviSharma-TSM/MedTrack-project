import { NORMAL_RANGES } from '@/constants';

export function isVitalInRange(key: string, value: number): boolean {
  const range = NORMAL_RANGES[key];
  if (!range) return true;
  return value >= range.min && value <= range.max;
}

export function validateNumericVital(key: string, value: string): string | null {
  const num = parseFloat(value);
  if (Number.isNaN(num)) return 'Please enter a valid number';
  if (key === 'temperature' && (num < 90 || num > 110)) {
    return 'Temperature must be between 90°F and 110°F';
  }
  return null;
}
