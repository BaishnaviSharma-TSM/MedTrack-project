import { CONDITIONS } from '@/constants/conditions';
import type { ConditionType } from '@/types';

import type { ConditionDefinition } from './types';

function definitionsFromConstants(): ConditionDefinition[] {
  return (Object.entries(CONDITIONS) as [ConditionType, (typeof CONDITIONS)[ConditionType]][]).map(
    ([slug, config]) => ({
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
    }),
  );
}

function toTitleCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

let conditionsCache: ConditionDefinition[] = definitionsFromConstants();

export function setConditionsCache(conditions: ConditionDefinition[]) {
  conditionsCache = conditions.length > 0 ? conditions : definitionsFromConstants();
}

export function getConditionsCache(): ConditionDefinition[] {
  return conditionsCache;
}

export function getConditionLabelFromCache(slug?: string): string {
  if (!slug?.trim()) return 'General Checkup';

  const normalized = slug.trim();
  const fromCache = conditionsCache.find((item) => item.slug === normalized)?.label;
  if (fromCache) return fromCache;

  const fromConstants = CONDITIONS[normalized as ConditionType]?.label;
  if (fromConstants) return fromConstants;

  return toTitleCase(normalized);
}

export function getConditionBySlug(slug: string): ConditionDefinition | undefined {
  return conditionsCache.find((item) => item.slug === slug);
}
