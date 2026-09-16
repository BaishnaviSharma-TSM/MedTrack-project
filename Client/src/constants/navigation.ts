import type { ComponentProps } from 'react';
import type { Feather } from '@expo/vector-icons';

/** Screen titles — must match sidebar nav labels. */
export const SCREEN_TITLES = {
  home: 'Home',
  patients: 'Patients',
  visits: 'Visits',
  profile: 'Profile',
  addPatient: 'Add Patient',
  editPatient: 'Edit Patient',
  patientProfile: 'Patient Details',
  recordVisit: 'Record Visit',
  visitDetail: 'Visit Detail',
} as const;

export type SidebarNavItem = {
  label: string;
  icon: ComponentProps<typeof Feather>['name'];
  href: string;
  matchSegments: string[];
};

const TAB_ROUTE_SEGMENTS = ['patients', 'visits', 'profile'] as const;

/** Sidebar active state — home omits "index" from expo-router segments. */
export function isSidebarNavActive(
  segments: string[],
  matchSegments: string[],
  pathname = '',
): boolean {
  if (matchSegments.includes('index')) {
    if (TAB_ROUTE_SEGMENTS.some((segment) => segments.includes(segment))) {
      return false;
    }

    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    return segments.length === 0 || segments.includes('index') || normalizedPath === '/';
  }

  return matchSegments.some((segment) => segments.includes(segment));
}

/** Sidebar navigation — single source of truth for tab labels. */
export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    label: SCREEN_TITLES.home,
    icon: 'home',
    href: '/(app)/(tabs)/',
    matchSegments: ['index'],
  },
  {
    label: SCREEN_TITLES.patients,
    icon: 'users',
    href: '/(app)/(tabs)/patients',
    matchSegments: ['patients'],
  },
  {
    label: SCREEN_TITLES.visits,
    icon: 'activity',
    href: '/(app)/(tabs)/visits',
    matchSegments: ['visits'],
  },
  {
    label: SCREEN_TITLES.profile,
    icon: 'user',
    href: '/(app)/(tabs)/profile',
    matchSegments: ['profile'],
  },
];

/** Shared bottom tab bar dimensions */
export const TAB_BAR_HEIGHT = 64;
export const FAB_SIZE = 56;
export const FAB_OVERFLOW = FAB_SIZE / 2;
export const TAB_CONTENT_BOTTOM_PADDING = TAB_BAR_HEIGHT + FAB_OVERFLOW + 16;

export function getTabContentBottomPadding(bottomInset: number, isWideLayout = false) {
  if (isWideLayout) {
    return 32;
  }
  return TAB_CONTENT_BOTTOM_PADDING + bottomInset;
}
