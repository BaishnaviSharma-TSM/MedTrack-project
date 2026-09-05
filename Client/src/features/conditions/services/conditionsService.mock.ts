import { CONDITIONS } from '@/constants';

import type { ConditionDefinition } from '../types';

export async function getConditions(): Promise<ConditionDefinition[]> {
  return Object.entries(CONDITIONS).map(([slug, config]) => ({
    slug,
    label: config.label,
    fields: config.fields.map((field) => ({
      key: field.key,
      label: field.label,
      type: field.type,
      unit: field.unit,
      placeholder: field.placeholder,
      required: true,
    })),
  }));
}
