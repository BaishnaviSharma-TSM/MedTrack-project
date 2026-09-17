import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PatientProfileSkeleton } from "@/components/feedback";
import { ScreenContainer, ScreenLayout } from "@/components/layout";
import { VisitHistoryTable } from "@/features/visits/components/VisitHistoryTable";
import { VisitVitalsChips } from "@/features/visits/components/VisitVitalsChips";
import { ClayButton } from "@/components/ui";
import { NORMAL_RANGES } from "@/constants";
import { getPatientById } from "@/features/patients/services/patientService";
import {
  buildLatestVitalsSnapshot,
  type VitalSnapshot,
} from "@/features/patients/utils/buildLatestVitalsSnapshot";
import { getVisitsByPatient } from "@/features/visits/services/visitService";
import { getConditionLabel } from "@/features/visits/services/visitRecordService";
import { formatVitalValue } from "@/features/visits/utils/formatVitalValue";
import { useDocumentTitle, useIsWideLayout } from "@/hooks";
import type { Patient, Visit } from "@/types";
import {
  formatDisplayDate,
  formatShortDisplayDate,
} from "@/utils/formatDisplayDate";
import { getRelativeTime } from "@/utils/getRelativeTime";
import baseStyles from "@/styles/screens/patient-profile.styles";
import wideStyles from "@/styles/layout/wide-layout.styles";
import { spacing, useTheme } from "@/theme";

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

type VitalStatus = "normal" | "high" | "low";

function getVitalStatus(
  key: string,
  value: string | number | boolean,
): VitalStatus | null {
  if (typeof value !== "number") return null;
  const range = NORMAL_RANGES[key];
  if (!range) return null;
  if (value < range.min) return "low";
  if (value > range.max) return "high";
  return "normal";
}

function getVitalTileColors(
  status: VitalStatus | null,
  isDark: boolean,
): { bg: string; border: string } {
  if (status === "high") {
    return isDark
      ? { bg: "rgba(248, 113, 113, 0.12)", border: "rgba(248, 113, 113, 0.25)" }
      : {
          bg: "rgba(254, 226, 226, 0.85)",
          border: "rgba(252, 165, 165, 0.45)",
        };
  }
  if (status === "low") {
    return isDark
      ? { bg: "rgba(251, 191, 36, 0.12)", border: "rgba(251, 191, 36, 0.25)" }
      : { bg: "rgba(255, 237, 213, 0.9)", border: "rgba(253, 186, 116, 0.45)" };
  }
  if (status === "normal") {
    return isDark
      ? { bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.18)" }
      : {
          bg: "rgba(236, 253, 245, 0.75)",
          border: "rgba(167, 243, 208, 0.45)",
        };
  }
  return isDark
    ? { bg: "rgba(148, 163, 184, 0.08)", border: "rgba(148, 163, 184, 0.18)" }
    : { bg: "rgba(241, 245, 249, 0.95)", border: "rgba(203, 213, 225, 0.55)" };
}

function getVitalFooterNote(snapshot: VitalSnapshot): string | null {
  const status = getVitalStatus(snapshot.key, snapshot.value);
  if (snapshot.key === "postMealGlucose") return "post meal";
  if (status === "low") return "low normal";
  if (status === "high") return "high";
  if (snapshot.condition && snapshot.condition !== "general") {
    return getConditionLabel(snapshot.condition);
  }
  return null;
}

type HeroDetailColProps = {
  label: string;
  value: string;
  numberOfLines?: number;
  mutedValue?: boolean;
};

function HeroDetailCol({
  label,
  value,
  numberOfLines = 1,
  mutedValue = false,
}: HeroDetailColProps) {
  const { colors } = useTheme();
  return (
    <View style={baseStyles.heroDetailCol}>
      <Text style={[baseStyles.heroDetailLabel, { color: colors.muted }]}>
        {label}
      </Text>
      <Text
        style={[
          baseStyles.heroDetailValue,
          { color: mutedValue ? colors.muted : colors.foreground },
        ]}
        numberOfLines={numberOfLines}
      >
        {value}
      </Text>
    </View>
  );
}

type VitalSnapshotTileProps = {
  snapshot: VitalSnapshot;
};

function VitalSnapshotTile({ snapshot }: VitalSnapshotTileProps) {
  const { colors, isDark } = useTheme();
  const status = getVitalStatus(snapshot.key, snapshot.value);
  const tileColors = getVitalTileColors(status, isDark);
  const footerNote = getVitalFooterNote(snapshot);
  const shortDate = formatShortDisplayDate(snapshot.visitDate);
  const footer = footerNote ? `${shortDate} · ${footerNote}` : shortDate;

  return (
    <View
      style={[
        baseStyles.vitalTile,
        {
          backgroundColor: tileColors.bg,
          borderColor: tileColors.border,
        },
      ]}
    >
      <Text
        style={[baseStyles.vitalTileLabel, { color: colors.muted }]}
        numberOfLines={1}
      >
        {snapshot.label}
      </Text>
      <View style={baseStyles.vitalTileValueRow}>
        <Text style={[baseStyles.vitalTileValue, { color: colors.foreground }]}>
          {formatVitalValue(snapshot.value)}
        </Text>
        {snapshot.unit ? (
          <Text style={[baseStyles.vitalTileUnit, { color: colors.muted }]}>
            {snapshot.unit}
          </Text>
        ) : null}
      </View>
      <Text
        style={[baseStyles.vitalTileFooter, { color: colors.muted }]}
        numberOfLines={2}
      >
        {footer}
      </Text>
    </View>
  );
}

type StatStackCardProps = {
  icon: keyof typeof Feather.glyphMap;
  primary: string;
  secondary: string;
  iconBg: string;
  iconColor: string;
  expanded?: boolean;
};

function StatStackCard({
  icon,
  primary,
  secondary,
  iconBg,
  iconColor,
  expanded = false,
}: StatStackCardProps) {
  const { colors, isDark } = useTheme();
  return (
    <View
      style={[
        baseStyles.statStackCard,
        expanded && baseStyles.statStackCardWide,
        {
          backgroundColor: isDark ? colors.cardGlass : colors.cardGlassStrong,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? colors.borderSubtle : "transparent",
        },
      ]}
    >
      <View style={[baseStyles.statStackIconWrap, { backgroundColor: iconBg }]}>
        <Feather name={icon} size={18} color={iconColor} />
      </View>
      <View style={baseStyles.statStackTextWrap}>
        <Text
          style={[baseStyles.statStackPrimary, { color: colors.foreground }]}
          numberOfLines={1}
        >
          {primary}
        </Text>
        <Text
          style={[baseStyles.statStackSecondary, { color: colors.muted }]}
          numberOfLines={2}
        >
          {secondary}
        </Text>
      </View>
    </View>
  );
}

function CompactField({
  label,
  value,
  full,
  mutedValue = false,
  children,
}: {
  label: string;
  value?: string;
  full?: boolean;
  mutedValue?: boolean;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        baseStyles.compactField,
        full && baseStyles.compactFieldFull,
      ]}
    >
      <Text style={[baseStyles.compactFieldLabel, { color: colors.muted }]}>
        {label}
      </Text>
      {children ?? (
        <Text
          style={[
            baseStyles.compactFieldValue,
            { color: mutedValue ? colors.muted : colors.foreground },
          ]}
        >
          {value || "—"}
        </Text>
      )}
    </View>
  );
}

function CompactStatusTag({ status }: { status: VitalStatus }) {
  const { isDark } = useTheme();
  const map: Record<VitalStatus, { bg: string; dot: string; text: string }> =
    isDark
      ? {
          normal: {
            bg: "rgba(52, 211, 153, 0.14)",
            dot: "#34D399",
            text: "#6EE7B7",
          },
          high: {
            bg: "rgba(248, 113, 113, 0.14)",
            dot: "#F87171",
            text: "#FCA5A5",
          },
          low: {
            bg: "rgba(56, 189, 248, 0.14)",
            dot: "#38BDF8",
            text: "#93C5FD",
          },
        }
      : {
          normal: {
            bg: "rgba(16, 185, 129, 0.10)",
            dot: "#10B981",
            text: "#047857",
          },
          high: {
            bg: "rgba(239, 68, 68, 0.10)",
            dot: "#EF4444",
            text: "#B91C1C",
          },
          low: {
            bg: "rgba(14, 165, 233, 0.10)",
            dot: "#0EA5E9",
            text: "#0369A1",
          },
        };
  const c = map[status];
  return (
    <View style={[baseStyles.compactStatusTag, { backgroundColor: c.bg }]}>
      <View style={[baseStyles.compactStatusDot, { backgroundColor: c.dot }]} />
      <Text style={[baseStyles.compactStatusText, { color: c.text }]}>
        {status}
      </Text>
    </View>
  );
}

function CompactVitalField({ snapshot }: { snapshot: VitalSnapshot }) {
  const { colors } = useTheme();
  const status = getVitalStatus(snapshot.key, snapshot.value);
  const unit = snapshot.unit ? ` ${snapshot.unit}` : "";
  return (
    <View style={baseStyles.compactField}>
      <Text style={[baseStyles.compactFieldLabel, { color: colors.muted }]}>
        {snapshot.label}
      </Text>
      <Text style={[baseStyles.compactFieldValue, { color: colors.foreground }]}>
        {formatVitalValue(snapshot.value)}
        {unit ? (
          <Text style={{ color: colors.muted, fontWeight: "400" }}>{unit}</Text>
        ) : null}
      </Text>
      {status ? <CompactStatusTag status={status} /> : null}
    </View>
  );
}

function splitDate(dateStr: string): { day: string; monthYear: string } {
  const parts = dateStr.split(" ");
  if (parts.length >= 2) {
    return { day: parts[0], monthYear: parts.slice(1).join(" ") };
  }
  return { day: dateStr, monthYear: "" };
}

export default function PatientProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isWideLayout = useIsWideLayout();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useDocumentTitle("Patient Details");

  const goToPatientsList = useCallback(() => {
    router.push("/(app)/(tabs)/patients");
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      let active = true;

      Promise.all([getPatientById(id), getVisitsByPatient(id)])
        .then(([foundPatient, patientVisits]) => {
          if (!active) return;
          setPatient(foundPatient);
          setVisits(patientVisits);
        })
        .finally(() => {
          if (active) setIsLoading(false);
        });

      return () => {
        active = false;
      };
    }, [id]),
  );

  const lastVisit = visits[0];
  const latestVitals = useMemo(
    () => buildLatestVitalsSnapshot(visits),
    [visits],
  );

  const themedCard = {
    backgroundColor: isDark ? colors.cardGlass : colors.cardGlassStrong,
    borderWidth: isDark ? 1 : 0,
    borderColor: isDark ? colors.borderSubtle : "transparent",
  };

  const recordVisitRoute = patient
    ? `/(app)/visits/new?patientId=${patient.id}`
    : undefined;

  const lastVisitPrimary = lastVisit
    ? formatShortDisplayDate(lastVisit.visitDate)
    : "—";
  const lastVisitSecondary = lastVisit
    ? `Last visit · ${getRelativeTime(lastVisit.visitDate)}`
    : "Last visit";

  const lastConditionPrimary = lastVisit
    ? getConditionLabel(lastVisit.condition)
    : "—";
  const lastConditionSecondary = lastVisit
    ? "Last condition · monitoring"
    : "Last condition";

  const compactCardSurface = {
    backgroundColor: isDark ? colors.cardBg : "#FFFFFF",
    borderColor: isDark ? colors.borderSubtle : "#E8E4EF",
    borderWidth: isDark ? 1 : 0,
  };

  const dividerColor = isDark ? colors.borderMuted : "#F1EEF6";

  const mobilePatientHeader = (
    <View
      style={[
        baseStyles.compactHeaderRow,
        {
          borderBottomColor: dividerColor,
          paddingTop: insets.top + spacing.md,
        },
      ]}
    >
      <View style={baseStyles.compactHeaderLeft}>
        <Pressable
          style={baseStyles.backButton}
          onPress={goToPatientsList}
          accessibilityRole="button"
          accessibilityLabel="Back to patients list"
          hitSlop={{ top: 12, bottom: 12, left: 4, right: 12 }}
        >
          <Feather name="chevron-left" size={26} color={colors.muted} />
        </Pressable>
        <Text
          style={[
            baseStyles.compactHeaderTitle,
            { color: colors.foreground },
          ]}
          numberOfLines={1}
        >
          Patient Info
        </Text>
      </View>
      {patient ? (
        <ClayButton
          label="Edit patient"
          variant="outline"
          icon="edit-2"
          onPress={() => router.push(`/(app)/patients/${patient.id}/edit`)}
        />
      ) : null}
    </View>
  );

  return (
    <ScreenContainer fullWidth>
      <ScreenLayout
        title="Patient Details"
        headerBackground="canvas"
        showBack={!isWideLayout}
        onBack={!isWideLayout ? goToPatientsList : undefined}
        compactHeader="none"
      >
        {isWideLayout ? (
          /* ═══ WIDE / WEB — unchanged ═══════════════════════════ */
          <ScrollView
            style={baseStyles.scroll}
            contentContainerStyle={[
              baseStyles.scrollContent,
              wideStyles.contentContainer,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              <PatientProfileSkeleton />
            ) : !patient ? (
              <Text style={[baseStyles.muted, { color: colors.muted }]}>
                Patient not found.
              </Text>
            ) : (
              <View style={baseStyles.pageStack}>
                <View style={[baseStyles.heroCard, themedCard]}>
                  <View style={baseStyles.heroTopRow}>
                    <View style={baseStyles.heroMainRow}>
                      <View style={baseStyles.heroIdentityRow}>
                        <Pressable
                          style={baseStyles.backButton}
                          onPress={goToPatientsList}
                          accessibilityRole="button"
                          accessibilityLabel="Back to patients list"
                          hitSlop={{
                            top: 12,
                            bottom: 12,
                            left: 4,
                            right: 12,
                          }}
                        >
                          <Feather
                            name="chevron-left"
                            size={26}
                            color={colors.muted}
                          />
                        </Pressable>
                        <View style={baseStyles.avatar}>
                          <Text style={baseStyles.avatarText}>
                            {patient.name.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                        <View style={baseStyles.heroTextWrap}>
                          <Text
                            style={[
                              baseStyles.patientName,
                              { color: colors.foreground },
                            ]}
                            numberOfLines={1}
                          >
                            {patient.name}
                          </Text>
                          <Text
                            style={[
                              baseStyles.heroMetaLine,
                              { color: colors.muted },
                            ]}
                          >
                            {patient.uniqueId} · Registered{" "}
                            {formatDisplayDate(patient.createdAt)}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          baseStyles.heroDivider,
                          {
                            backgroundColor: isDark
                              ? colors.borderSubtle
                              : colors.borderMuted,
                          },
                        ]}
                      />

                      <View
                        style={[
                          baseStyles.heroDetailsRow,
                          baseStyles.heroDetailsRowWide,
                        ]}
                      >
                        <HeroDetailCol
                          label="Age"
                          value={`${patient.age} yrs`}
                        />
                        <HeroDetailCol
                          label="Gender"
                          value={formatGender(patient.gender)}
                        />
                        <HeroDetailCol
                          label="Contact"
                          value={patient.contactNumber}
                        />
                        <HeroDetailCol
                          label="Address"
                          value={patient.address?.trim() || "—"}
                          numberOfLines={1}
                          mutedValue={!patient.address?.trim()}
                        />
                      </View>
                    </View>

                    <ClayButton
                      label="Edit patient"
                      variant="outline"
                      icon="edit-2"
                      onPress={() =>
                        router.push(`/(app)/patients/${patient.id}/edit`)
                      }
                    />
                  </View>
                </View>

                <View
                  style={[
                    baseStyles.insightsRow,
                    baseStyles.insightsRowWide,
                  ]}
                >
                  <View style={[baseStyles.vitalsPanel, themedCard]}>
                    <View style={baseStyles.vitalsPanelHeader}>
                      <Text
                        style={[
                          baseStyles.vitalsPanelTitle,
                          { color: colors.foreground },
                        ]}
                      >
                        Latest vitals snapshot
                      </Text>
                      <Text
                        style={[
                          baseStyles.vitalsPanelSubtitle,
                          { color: colors.muted },
                        ]}
                      >
                        Most recent reading for each measure, across all visits.
                      </Text>
                    </View>

                    {latestVitals.length === 0 ? (
                      <View style={baseStyles.vitalsEmpty}>
                        <Feather
                          name="activity"
                          size={28}
                          color={colors.brand.alpha30}
                        />
                        <Text
                          style={[
                            baseStyles.vitalsEmptyText,
                            { color: colors.muted },
                          ]}
                        >
                          No vitals recorded yet.{"\n"}Record a visit to see the
                          latest readings.
                        </Text>
                      </View>
                    ) : (
                      <View style={baseStyles.vitalsGrid}>
                        {latestVitals.map((snapshot) => (
                          <VitalSnapshotTile
                            key={snapshot.key}
                            snapshot={snapshot}
                          />
                        ))}
                      </View>
                    )}
                  </View>

                  <View
                    style={[
                      baseStyles.statsStack,
                      baseStyles.statsStackWide,
                    ]}
                  >
                    <StatStackCard
                      expanded
                      icon="activity"
                      primary={`${visits.length} Total visits`}
                      secondary="All recorded visits for this patient"
                      iconBg={
                        isDark
                          ? "rgba(14, 165, 233, 0.2)"
                          : "rgba(14, 165, 233, 0.12)"
                      }
                      iconColor={colors.accent.tertiary}
                    />
                    <StatStackCard
                      expanded
                      icon="calendar"
                      primary={lastVisitPrimary}
                      secondary={lastVisitSecondary}
                      iconBg={
                        isDark
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(16, 185, 129, 0.12)"
                      }
                      iconColor={colors.accent.success}
                    />
                    <StatStackCard
                      expanded
                      icon="clipboard"
                      primary={lastConditionPrimary}
                      secondary={lastConditionSecondary}
                      iconBg={
                        isDark
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(245, 158, 11, 0.12)"
                      }
                      iconColor={colors.accent.warning}
                    />
                  </View>
                </View>

                <View style={[baseStyles.historySection, themedCard]}>
                  <View style={baseStyles.sectionHeaderWrap}>
                    <View style={baseStyles.sectionHeaderLeft}>
                      <Feather
                        name="clock"
                        size={18}
                        color={colors.brand.primary}
                      />
                      <Text
                        style={[
                          baseStyles.sectionTitle,
                          { color: colors.foreground },
                        ]}
                      >
                        Visit history
                      </Text>
                      <Text style={baseStyles.sectionCount}>
                        {visits.length}
                      </Text>
                    </View>
                    <View style={baseStyles.sectionHeaderRight}>
                      <ClayButton
                        label="Record Visit"
                        icon="activity"
                        onPress={() =>
                          recordVisitRoute && router.push(recordVisitRoute)
                        }
                      />
                    </View>
                  </View>

                  {visits.length === 0 ? (
                    <View style={baseStyles.emptyWrap}>
                      <Feather
                        name="inbox"
                        size={32}
                        color={colors.brand.alpha30}
                      />
                      <Text
                        style={[
                          baseStyles.emptyText,
                          { color: colors.muted },
                        ]}
                      >
                        No visits recorded yet.{"\n"}Tap Record Visit to log the
                        first one.
                      </Text>
                    </View>
                  ) : (
                    <View style={baseStyles.tableWrap}>
                      <VisitHistoryTable visits={visits} />
                    </View>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          /* ═══ MOBILE — full-screen card ════════════════════════ */
          <View
            style={[
              baseStyles.compactCardFullScreen,
              compactCardSurface,
            ]}
          >
            {mobilePatientHeader}
            <ScrollView
              style={baseStyles.scroll}
              contentContainerStyle={{
                paddingBottom: spacing["2xl"],
              }}
              showsVerticalScrollIndicator={false}
            >
              {isLoading ? (
                <PatientProfileSkeleton />
              ) : !patient ? (
                <Text style={[baseStyles.muted, { color: colors.muted }]}>
                  Patient not found.
                </Text>
              ) : (
                <>
                  <View style={baseStyles.compactSection}>
                    <Text
                      style={[
                        baseStyles.compactSectionTitle,
                        { color: colors.muted },
                      ]}
                    >
                      Details
                    </Text>
                    <View style={baseStyles.compactFieldGrid}>
                      <CompactField
                        label="Patient Name"
                        value={patient.name}
                        full
                      />
                      <CompactField
                        label="Patient ID"
                        value={patient.uniqueId}
                        full
                      />
                      <CompactField
                        label="Age / Gender"
                        value={`${patient.age} yrs · ${formatGender(patient.gender)}`}
                        full
                      />
                      <CompactField
                        label="Contact"
                        value={patient.contactNumber}
                        full
                      />
                      <CompactField
                        label="Address"
                        value={patient.address?.trim() || "—"}
                        mutedValue={!patient.address?.trim()}
                        full
                      />
                      <CompactField
                        label="Registered"
                        value={formatDisplayDate(patient.createdAt)}
                        full
                      />
                      {lastVisit ? (
                        <CompactField
                          label="Last Visit"
                          value={`${formatDisplayDate(lastVisit.visitDate)} · ${getRelativeTime(lastVisit.visitDate)}`}
                          full
                        />
                      ) : null}
                      {lastVisit ? (
                        <CompactField
                          label="Last Condition"
                          value={lastConditionPrimary}
                          full
                        />
                      ) : null}
                      <CompactField
                        label="Total Visits"
                        value={String(visits.length)}
                        full
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      baseStyles.compactDivider,
                      { backgroundColor: dividerColor },
                    ]}
                  />

                  <View style={baseStyles.compactSection}>
                    <Text
                      style={[
                        baseStyles.compactSectionTitle,
                        { color: colors.muted },
                      ]}
                    >
                      Vitals Recorded
                    </Text>
                    {latestVitals.length === 0 ? (
                      <Text
                        style={[
                          baseStyles.compactFieldLabel,
                          baseStyles.compactVitalsEmpty,
                          { color: colors.muted },
                        ]}
                      >
                        No vitals recorded yet. Record a visit to see the latest
                        readings.
                      </Text>
                    ) : (
                      <View style={baseStyles.compactFieldGrid}>
                        {latestVitals.map((snapshot) => (
                          <CompactVitalField
                            key={snapshot.key}
                            snapshot={snapshot}
                          />
                        ))}
                      </View>
                    )}
                  </View>

                  <View
                    style={[
                      baseStyles.compactDivider,
                      { backgroundColor: dividerColor },
                    ]}
                  />

                  <View style={baseStyles.compactHistoryHeader}>
                    <Text
                      style={[
                        baseStyles.compactSectionTitle,
                        { color: colors.muted, marginBottom: 0 },
                      ]}
                    >
                      Visit History
                    </Text>
                    <ClayButton
                      label="Record Visit"
                      icon="activity"
                      onPress={() =>
                        recordVisitRoute && router.push(recordVisitRoute)
                      }
                    />
                  </View>

                  {visits.length === 0 ? (
                    <View style={baseStyles.emptyWrap}>
                      <Feather
                        name="inbox"
                        size={32}
                        color={colors.brand.alpha30}
                      />
                      <Text
                        style={[
                          baseStyles.emptyText,
                          { color: colors.muted },
                        ]}
                      >
                        No visits recorded yet.{"\n"}Tap Record Visit to log the
                        first one.
                      </Text>
                    </View>
                  ) : (
                    <View style={baseStyles.historyListWrap}>
                      {visits.map((visit) => {
                        const dateParts = splitDate(
                          formatDisplayDate(visit.visitDate),
                        );
                        return (
                          <Pressable
                            key={visit.id}
                            style={[
                              baseStyles.historyCard,
                              {
                                backgroundColor: isDark
                                  ? colors.surfaceElevated
                                  : "#FFFFFF",
                                borderColor: isDark
                                  ? colors.borderSubtle
                                  : "#EEEAF4",
                              },
                            ]}
                            onPress={() =>
                              router.push(`/(app)/visits/${visit.id}`)
                            }
                            accessibilityRole="button"
                            accessibilityLabel={`Open visit from ${formatDisplayDate(visit.visitDate)}`}
                          >
                            <View style={baseStyles.historyDateCol}>
                              <Text
                                style={[
                                  baseStyles.historyDay,
                                  { color: colors.foreground },
                                ]}
                              >
                                {dateParts.day}
                              </Text>
                              <Text
                                style={[
                                  baseStyles.historyMonthYear,
                                  { color: colors.muted },
                                ]}
                              >
                                {dateParts.monthYear}
                              </Text>
                            </View>
                            <View
                              style={[
                                baseStyles.historyDivider,
                                {
                                  backgroundColor: isDark
                                    ? colors.borderSubtle
                                    : "#EEEAF4",
                                },
                              ]}
                            />
                            <View style={baseStyles.historyMain}>
                              <Text
                                style={[
                                  baseStyles.historyCondition,
                                  { color: colors.foreground },
                                ]}
                              >
                                {getConditionLabel(visit.condition)}
                              </Text>
                              <VisitVitalsChips
                                vitals={visit.vitals}
                                max={2}
                              />
                            </View>
                            <View
                              style={[
                                baseStyles.historyChevron,
                                { backgroundColor: colors.brand.alpha06 },
                              ]}
                            >
                              <Feather
                                name="chevron-right"
                                size={15}
                                color={colors.brand.primary}
                              />
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        )}
      </ScreenLayout>
    </ScreenContainer>
  );
}
