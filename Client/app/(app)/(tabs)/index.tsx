import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardSkeleton, EmptyState } from '@/components/feedback';
import { ScreenLayout } from '@/components/layout';
import { getTabContentBottomPadding, SCREEN_TITLES } from '@/constants/navigation';
import {
  ConditionBreakdownChart,
  ConditionDonutChart,
  DashboardStatCard,
  PendingPatientRow,
  PendingPatientsPanel,
  RecentVisitRow,
  RecentVisitsPanel,
  StatCard,
  useDashboardStats,
  VisitsLoggedCard,
  VisitRhythmChart,
} from '@/features/dashboard';
import { PendingPatientsTable } from '@/features/dashboard/components/PendingPatientsTable';
import { QuickActionBar } from '@/features/dashboard/components/QuickActionBar';
import { RecentVisitsTable } from '@/features/dashboard/components/RecentVisitsTable';
import { useDocumentTitle, useIsWideLayout } from '@/hooks';
import { useTheme } from '@/theme';
import styles from '@/styles/screens/home.styles';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isWideLayout = useIsWideLayout();
  const { stats, isLoading, refresh } = useDashboardStats();
  const { colors } = useTheme();

  useDocumentTitle(SCREEN_TITLES.home);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const isEmpty =
    !isLoading &&
    stats.totalPatients === 0 &&
    stats.recentVisits.length === 0;

  /* ──────── Generate sparkline data from weekly rhythm ──────── */
  const weeklyTotals = (stats.weeklyVisitRhythm ?? []).map((w) => w.total);
  const last7Weeks = weeklyTotals.slice(-7);

  /* ──────── MOBILE LAYOUT (unchanged fallback) ──────── */
  const mobileStatCards = (
    <>
      <StatCard
        label="Visits today"
        value={stats.visitsToday}
        onPress={() => router.navigate('/(app)/(tabs)/visits')}
      />
      <StatCard
        label="Pending first visit"
        value={stats.pendingFirstVisitCount}
        subtitle="No visit recorded"
        onPress={() => router.navigate('/(app)/(tabs)/patients')}
      />
      <StatCard
        label="Total patients"
        value={stats.totalPatients}
        onPress={() => router.navigate('/(app)/(tabs)/patients')}
      />
      <StatCard
        label="Visits this week"
        value={stats.visitsThisWeek}
        onPress={() => router.navigate('/(app)/(tabs)/visits')}
      />
    </>
  );

  const mobilePendingSection = (
    <View style={styles.sectionBlock}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Needs first visit</Text>
        {stats.pendingFirstVisitCount > 0 ? (
          <Pressable onPress={() => router.navigate('/(app)/(tabs)/patients')}>
            <Text style={[styles.viewAll, { color: colors.accent.primary }]}>View all</Text>
          </Pressable>
        ) : null}
      </View>
      {stats.pendingPatients.length === 0 ? (
        <Text style={[styles.emptySection, { color: colors.muted }]}>
          All registered patients have at least one visit recorded.
        </Text>
      ) : (
        stats.pendingPatients.map((patient) => (
          <PendingPatientRow key={patient.id} patient={patient} />
        ))
      )}
    </View>
  );

  const mobileRecentSection = (
    <View style={styles.sectionBlock}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Recent visits</Text>
        {stats.recentVisits.length > 0 ? (
          <Pressable onPress={() => router.navigate('/(app)/(tabs)/visits?range=all')}>
            <Text style={[styles.viewAll, { color: colors.accent.primary }]}>View all</Text>
          </Pressable>
        ) : null}
      </View>
      {stats.recentVisits.length === 0 ? (
        <Text style={[styles.emptySection, { color: colors.muted }]}>
          No visits recorded yet.
        </Text>
      ) : (
        stats.recentVisits.map((record) => (
          <RecentVisitRow key={record.visit.id} record={record} />
        ))
      )}
    </View>
  );

  /* ──────── WEB WIDE LAYOUT — matches design image ──────── */
  const webDashboard = (
    <View style={{ width: '100%', gap: 20 }}>
      {/* Row 1: Visits today + Visit rhythm chart (commented out for now) */}
      {/* <View style={{ flexDirection: 'row', gap: 16, alignItems: 'stretch' }}>
        <VisitsLoggedCard
          visitsToday={stats.visitsToday}
          pendingFirstVisitCount={stats.pendingFirstVisitCount}
          lastVisitSummary={stats.lastVisitSummary}
        />
        <VisitRhythmChart data={stats.weeklyVisitRhythm} />
      </View> */}

      {/* Row 2: Four stat cards */}
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <DashboardStatCard
          value={stats.visitsToday}
          label="Visits today"
          sparkData={last7Weeks}
        />
        <DashboardStatCard
          value={stats.pendingFirstVisitCount}
          label="Pending first visit"
          subtitle="No visit recorded"
          sparkData={weeklyTotals.slice(-8)}
        />
        <DashboardStatCard
          value={stats.totalPatients}
          label="Total patients"
          sparkData={last7Weeks}
        />
        <DashboardStatCard
          value={stats.visitsThisWeek}
          label="Visits this week"
          sparkData={last7Weeks}
        />
      </View>

      {/* Row 4: Condition donut + Pending patients */}
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'stretch' }}>
        <ConditionDonutChart data={stats.visitsByCondition} />
        <PendingPatientsPanel
          patients={stats.pendingPatients}
          totalPending={stats.pendingFirstVisitCount}
        />
      </View>

      {/* Row 5: Recent visits */}
      <RecentVisitsPanel records={stats.recentVisits} />
    </View>
  );

  return (
    <ScreenLayout title={SCREEN_TITLES.home} compactHeader="brand">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          isWideLayout && { paddingTop: 24, paddingBottom: 40, paddingHorizontal: 28 },
          { paddingBottom: getTabContentBottomPadding(insets.bottom, isWideLayout) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <DashboardSkeleton />
        ) : isEmpty ? (
          <>
            {isWideLayout ? (
              <View style={{ gap: 20 }}>
                <QuickActionBar />
                <EmptyState
                  title="No patients yet"
                  description="Tap + to add your first patient and start recording vitals."
                />
              </View>
            ) : (
              <EmptyState
                title="No patients yet"
                description="Tap + to add your first patient and start recording vitals."
              />
            )}
          </>
        ) : isWideLayout ? (
          webDashboard
        ) : (
          <View style={styles.homeContentStack}>
            <View style={styles.statGrid}>{mobileStatCards}</View>
            <ConditionBreakdownChart
              data={stats.visitsByCondition}
              containerStyle={styles.stackItemFlush}
            />
            {mobilePendingSection}
            {mobileRecentSection}
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
