import type { VitalSign } from '@/types';

import { formatVitalValue } from './formatVitalValue';

export function buildVitalsSummary(vitals: VitalSign[], max = 3) {
  return vitals
    .slice(0, max)
    .map((vital) => {
      const unit = typeof vital.value === 'boolean' ? '' : vital.unit ? ` ${vital.unit}` : '';
      return `${vital.label}: ${formatVitalValue(vital.value)}${unit}`;
    })
    .join(' · ');
}
