import type { ConditionFieldDef } from '@/features/conditions/types';
import type { VitalSign } from '@/types';

export function buildVitals(
  fields: ConditionFieldDef[],
  values: Record<string, string | boolean | undefined>,
): VitalSign[] {
  return fields.map((field) => {
    const raw = values[field.key];
    let value: string | number | boolean = '';

    if (field.type === 'boolean') {
      value = Boolean(raw);
    } else     if (field.type === 'number') {
      const numeric = Number(raw);
      value = Number.isNaN(numeric) ? '' : numeric;
    } else {
      value = String(raw ?? '');
    }

    return {
      key: field.key,
      label: field.label,
      value,
      unit: field.unit,
    };
  });
}
