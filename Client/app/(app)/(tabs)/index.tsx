import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardSkeleton, EmptyState } from '@/components/feedback';
import { getTabContentBottomPadding } from '@/constants/navigation';
import {
  ConditionBreakdownChart,
  PendingPatientRow,
  RecentVisitRow,
  StatCard,
  useDashboardStats,
} from '@/features/dashboard';
import styles from '@/styles/screens/home.styles';

/** PRD 1.4 — Dashboard with clinic overview from Phases 2 and 3 data. */
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { stats, isLoading, refresh } = useDashboardStats();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const isEmpty =
    !isLoading &&
    stats.totalPatients === 0 &&
    stats.recentVisits.length === 0;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: getTabContentBottomPadding(insets.bottom) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text style={styles.pageTitle}>Dashboard</Text>
      <Text style={styles.pageSubtitle}>Clinic overview for today</Text> */}

      {isLoading ? (
        <DashboardSkeleton />
      ) : isEmpty ? (
        <EmptyState
          title="No patients yet"
          description="Tap + to add your first patient and start recording vitals."
        />
      ) : (
        <>
          <View style={styles.statGrid}>
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
          </View>

          <ConditionBreakdownChart data={stats.visitsByCondition} />

          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Needs first visit</Text>
              {stats.pendingFirstVisitCount > 0 ? (
                <Pressable onPress={() => router.navigate('/(app)/(tabs)/patients')}>
                  <Text style={styles.viewAll}>View all</Text>
                </Pressable>
              ) : null}
            </View>

            {stats.pendingPatients.length === 0 ? (
              <Text style={styles.emptySection}>
                All registered patients have at least one visit recorded.
              </Text>
            ) : (
              stats.pendingPatients.map((patient) => (
                <PendingPatientRow key={patient.id} patient={patient} />
              ))
            )}
          </View>

          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Recent visits</Text>
              {stats.recentVisits.length > 0 ? (
                <Pressable onPress={() => router.navigate('/(app)/(tabs)/visits')}>
                  <Text style={styles.viewAll}>View all</Text>
                </Pressable>
              ) : null}
            </View>

            {stats.recentVisits.length === 0 ? (
              <Text style={styles.emptySection}>
                No visits recorded yet. Tap Record Visit on the Visits tab.
              </Text>
            ) : (
              stats.recentVisits.map((record) => (
                <RecentVisitRow key={record.visit.id} record={record} />
              ))
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
