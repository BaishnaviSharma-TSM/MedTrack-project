import type { ConditionDefinition } from './types';

let conditionsCache: ConditionDefinition[] = [];

export function setConditionsCache(conditions: ConditionDefinition[]) {
  conditionsCache = conditions;
}

export function getConditionsCache(): ConditionDefinition[] {
  return conditionsCache;
}

export function getConditionLabelFromCache(slug?: string): string {
  if (!slug) return 'General Checkup';
  return conditionsCache.find((item) => item.slug === slug)?.label ?? slug;
}

export function getConditionBySlug(slug: string): ConditionDefinition | undefined {
  return conditionsCache.find((item) => item.slug === slug);
}
