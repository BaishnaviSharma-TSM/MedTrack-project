import { USE_MOCK_DATA } from '@/config/dataSource';

import type { DashboardStats } from '../types';
import * as apiDashboard from './dashboardService.api';
import * as mockDashboard from './dashboardService.mock';

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCK_DATA) return mockDashboard.getDashboardStats();
  return apiDashboard.getDashboardStats();
}
