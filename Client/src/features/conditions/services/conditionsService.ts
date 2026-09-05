import { USE_MOCK_DATA } from '@/config/dataSource';

import { setConditionsCache } from '../conditionsCache';
import type { ConditionDefinition } from '../types';
import * as apiConditions from './conditionsService.api';
import * as mockConditions from './conditionsService.mock';

export async function getConditions(): Promise<ConditionDefinition[]> {
  const conditions = USE_MOCK_DATA
    ? await mockConditions.getConditions()
    : await apiConditions.getConditions();

  setConditionsCache(conditions);
  return conditions;
}

export type { ConditionDefinition };
