import { apiClient } from '@/services/apiClient';

import type { DashboardStats } from '../types';

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get<DashboardStats>('/dashboard/stats');
  return response.data;
}
