import type { ConditionFieldDef } from '@/features/conditions/types';

export function validateVitals(
  fields: ConditionFieldDef[],
  values: Record<string, string | boolean | undefined>,
) {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    if (field.required === false) continue;

    const value = values[field.key];

    if (field.type === 'boolean') {
      if (typeof value !== 'boolean') {
        errors[field.key] = 'Please select Yes or No.';
      }
      continue;
    }

    if (!value || String(value).trim() === '') {
      errors[field.key] = `${field.label} is required.`;
    }
  }

  return errors;
}
