import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { VisitDetailSkeleton } from "@/components/feedback";
import { ScreenContainer, ScreenLayout } from "@/components/layout";
import { ClayButton } from "@/components/ui";
import {
  getConditionLabel,
  getVisitRecordById,
} from "@/features/visits/services/visitRecordService";
import { getVisitsByPatient } from "@/features/visits/services/visitService";
import type { VisitRecord } from "@/features/visits/types";
import {
  analyzeVisitVitals,
  getVisitTimelineContext,
  type MeasuredVital,
  type FindingVital,
  type VitalStatus,
} from "@/features/visits/utils/analyzeVisitVitals";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDocumentTitle, useIsWideLayout } from "@/hooks";
import { formatDisplayDateTime } from "@/utils/formatDisplayDate";
import { getRelativeTime } from "@/utils/getRelativeTime";
import type { Visit } from "@/types";
import { spacing, useTheme } from "@/theme";
import wideStyles from "@/styles/layout/wide-layout.styles";
import styles from "@/styles/screens/visit-detail.styles";

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function formatGender(g: string) {
  return g.charAt(0).toUpperCase() + g.slice(1);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function FieldCell({
  label,
  value,
  full,
  stacked,
  compact,
  children,
}: {
  label: string;
  value?: string;
  full?: boolean;
  stacked?: boolean;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.fieldCell,
        full && styles.fieldCellFull,
        stacked && styles.fieldCellStacked,
        compact && !stacked && styles.fieldCellCompact,
      ]}
    >
      <Text style={[styles.fieldLabel, { color: colors.muted }]}>{label}</Text>
      {children ?? (
        <Text style={[styles.fieldValue, { color: colors.foreground }]}>
          {value || "—"}
        </Text>
      )}
    </View>
  );
}

const SEVERITY_COLORS: Record<
  string,
  { bg: string; dot: string; text: string }
> = {
  mild: { bg: "rgba(16, 185, 129, 0.10)", dot: "#10B981", text: "#047857" },
  moderate: {
    bg: "rgba(245, 158, 11, 0.10)",
    dot: "#F59E0B",
    text: "#B45309",
  },
  severe: { bg: "rgba(239, 68, 68, 0.10)", dot: "#EF4444", text: "#B91C1C" },
};
const SEVERITY_COLORS_DARK: Record<
  string,
  { bg: string; dot: string; text: string }
> = {
  mild: { bg: "rgba(52, 211, 153, 0.14)", dot: "#34D399", text: "#6EE7B7" },
  moderate: {
    bg: "rgba(251, 191, 36, 0.14)",
    dot: "#FBBF24",
    text: "#FDE68A",
  },
  severe: {
    bg: "rgba(248, 113, 113, 0.14)",
    dot: "#F87171",
    text: "#FCA5A5",
  },
};

function SeverityBadge({ severity }: { severity: string }) {
  const { isDark } = useTheme();
  const palette = isDark ? SEVERITY_COLORS_DARK : SEVERITY_COLORS;
  const c = palette[severity.toLowerCase()] ?? palette.mild;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <View style={[styles.badgeDot, { backgroundColor: c.dot }]} />
      <Text style={[styles.badgeText, { color: c.text }]}>
        {titleCase(severity)}
      </Text>
    </View>
  );
}

function StatusTag({ status }: { status: VitalStatus }) {
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
    <View style={[styles.statusTag, { backgroundColor: c.bg }]}>
      <View style={[styles.statusDot, { backgroundColor: c.dot }]} />
      <Text style={[styles.statusText, { color: c.text }]}>{status}</Text>
    </View>
  );
}

function VitalField({
  reading,
  compact,
}: {
  reading: MeasuredVital;
  compact?: boolean;
}) {
  const { colors } = useTheme();
  const unit = reading.unit ? ` ${reading.unit}` : "";
  return (
    <FieldCell label={reading.label} compact={compact}>
      <Text style={[styles.fieldValue, { color: colors.foreground }]}>
        {reading.displayValue}
        {unit ? (
          <Text style={{ color: colors.muted, fontWeight: "400" }}>{unit}</Text>
        ) : null}
      </Text>
      {reading.status ? <StatusTag status={reading.status} /> : null}
    </FieldCell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCREEN
   ═══════════════════════════════════════════════════════════════ */

export default function VisitDetailScreen() {
  const router = useRouter();
  const { visitId } = useLocalSearchParams<{ visitId: string }>();
  const isWideLayout = useIsWideLayout();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [record, setRecord] = useState<VisitRecord | null>(null);
  const [patientVisits, setPatientVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const goToVisitsList = useCallback(
    () => router.push("/(app)/(tabs)/visits"),
    [router],
  );

  const conditionLabel = record
    ? getConditionLabel(record.visit.condition)
    : "Visit";
  const pageTitle = record
    ? `${conditionLabel} · ${record.patient.name}`
    : "Visit Detail";

  useDocumentTitle(pageTitle);

  useEffect(() => {
    if (!visitId) return;
    getVisitRecordById(visitId)
      .then(setRecord)
      .finally(() => setIsLoading(false));
  }, [visitId]);

  useEffect(() => {
    if (!record) return;
    getVisitsByPatient(record.patient.id).then(setPatientVisits);
  }, [record]);

  const timeline = useMemo(
    () =>
      record ? getVisitTimelineContext(patientVisits, record.visit.id) : null,
    [patientVisits, record],
  );

  const analysis = useMemo(
    () =>
      record
        ? analyzeVisitVitals(record.visit.vitals, timeline?.previous?.vitals)
        : null,
    [record, timeline],
  );

  const dividerColor = isDark ? colors.borderMuted : "#F1EEF6";
  const stackFields = !isWideLayout;

  const amberFg = isDark ? "#FBBF24" : "#D97706";

  /* ── Render ──────────────────────────────────────── */

  const mobileCardBg = {
    backgroundColor: isDark ? colors.cardBg : "#FFFFFF",
    borderColor: isDark ? colors.borderSubtle : "#E8E4EF",
    borderWidth: isDark ? 1 : 0,
  };

  const mobileHeader = (
    <View
      style={[
        styles.headerRow,
        styles.headerRowCompact,
        {
          borderBottomColor: dividerColor,
          paddingTop: insets.top + spacing.md,
        },
      ]}
    >
      <View style={styles.headerLeft}>
        <Pressable
          style={styles.backButton}
          onPress={goToVisitsList}
          accessibilityRole="button"
          accessibilityLabel="Back to visits list"
          hitSlop={{ top: 12, bottom: 12, left: 4, right: 12 }}
        >
          <Feather name="chevron-left" size={26} color={colors.muted} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            styles.headerTitleCompact,
            { color: colors.foreground },
          ]}
          numberOfLines={1}
        >
          Visit Info
        </Text>
      </View>
      {record ? (
        <ClayButton
          label="View patient"
          variant="outline"
          icon="external-link"
          iconPosition="right"
          onPress={() => router.push(`/(app)/patients/${record.patient.id}`)}
          style={styles.headerActionCompact}
        />
      ) : null}
    </View>
  );

  if (isLoading) {
    return (
      <ScreenContainer fullWidth>
        <ScreenLayout
          title="Visit Detail"
          headerBackground="canvas"
          showBack
          onBack={goToVisitsList}
          compactHeader="none"
        >
          {isWideLayout ? (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={[
                styles.scrollContent,
                wideStyles.contentContainer,
              ]}
            >
              <VisitDetailSkeleton />
            </ScrollView>
          ) : (
            <View style={[styles.card, styles.cardFullScreen, mobileCardBg]}>
              {mobileHeader}
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContentCompact}
              >
                <VisitDetailSkeleton />
              </ScrollView>
            </View>
          )}
        </ScreenLayout>
      </ScreenContainer>
    );
  }

  if (!record || !analysis) {
    return (
      <ScreenContainer fullWidth>
        <ScreenLayout
          title="Visit Detail"
          headerBackground="canvas"
          showBack
          onBack={goToVisitsList}
          compactHeader="none"
        >
          {isWideLayout ? (
            <Text style={[styles.muted, { color: colors.muted }]}>
              Visit not found.
            </Text>
          ) : (
            <View style={[styles.card, styles.cardFullScreen, mobileCardBg]}>
              {mobileHeader}
              <Text style={[styles.muted, { color: colors.muted }]}>
                Visit not found.
              </Text>
            </View>
          )}
        </ScreenLayout>
      </ScreenContainer>
    );
  }

  const { visit, patient } = record;

  const boolFindings = analysis.findings.filter(
    (f) => f.displayValue === "Yes" || f.displayValue === "No",
  );
  const textFindings = analysis.findings.filter(
    (f) => f.displayValue !== "Yes" && f.displayValue !== "No",
  );

  const sectionStyle = [
    styles.section,
    !isWideLayout && styles.sectionCompact,
  ];

  /* ── Visit Information section (left / top) ─────── */
  const visitInfoSection = (
    <View style={sectionStyle}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>
        Details
      </Text>
      <View style={styles.fieldGrid}>
        <FieldCell
          label="Patient Name"
          value={patient.name}
          compact={stackFields}
        />
        <FieldCell
          label="Patient ID"
          value={patient.uniqueId}
          compact={stackFields}
        />
        <FieldCell label="Condition" compact={stackFields}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Text style={[styles.fieldValue, { color: colors.foreground }]}>
              {conditionLabel}
            </Text>
            {visit.severity ? (
              <SeverityBadge severity={visit.severity} />
            ) : null}
          </View>
        </FieldCell>
        <FieldCell
          label="Visit Date"
          value={formatDisplayDateTime(visit.visitDate)}
          compact={stackFields}
        />
        <FieldCell
          label="Age / Gender"
          value={`${patient.age} yrs · ${formatGender(patient.gender)}`}
          compact={stackFields}
        />
        {visit.doctorName ? (
          <FieldCell
            label="Attending Doctor"
            value={visit.doctorName}
            compact={stackFields}
          />
        ) : null}
        {/* {timeline && timeline.total > 0 ? (
          <FieldCell
            label="Visit History"
            value={`Visit ${timeline.ordinal} of ${timeline.total}`}
            stacked={stackFields}
          />
        ) : null} */}
        <FieldCell
          label="Recorded"
          value={getRelativeTime(visit.visitDate)}
          compact={stackFields}
        />
      </View>
    </View>
  );

  /* ── Vitals Recorded section (right / bottom) ───── */
  const vitalsSection = (
    <View style={sectionStyle}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>
        Vitals Recorded
      </Text>

      {analysis.measured.length > 0 ? (
        <View style={styles.fieldGrid}>
          {analysis.measured.map((reading) => (
            <VitalField
              key={reading.key}
              reading={reading}
              compact={stackFields}
            />
          ))}
        </View>
      ) : (
        <Text style={[styles.fieldLabel, { color: colors.muted }]}>
          No vitals were recorded for this visit.
        </Text>
      )}

      {analysis.findings.length > 0 ? (
        <>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.muted, marginTop: 12 },
            ]}
          >
            Findings / Symptoms
          </Text>
          {boolFindings.length > 0 ? (
            <View style={styles.findingsRow}>
              {boolFindings.map((f) => (
                <View
                  key={f.key}
                  style={[
                    styles.findingChip,
                    {
                      backgroundColor: f.emphasized
                        ? isDark
                          ? "rgba(251, 191, 36, 0.12)"
                          : "rgba(255, 237, 213, 0.9)"
                        : isDark
                          ? colors.brand.alpha04
                          : colors.brand.alpha03,
                      borderColor: f.emphasized
                        ? isDark
                          ? "rgba(251, 191, 36, 0.28)"
                          : "rgba(253, 186, 116, 0.5)"
                        : isDark
                          ? colors.borderSubtle
                          : colors.brand.alpha08,
                    },
                  ]}
                >
                  <Text
                    style={[styles.findingChipLabel, { color: colors.muted }]}
                  >
                    {f.label}
                  </Text>
                  <Text
                    style={[
                      styles.findingChipValue,
                      {
                        color: f.emphasized ? amberFg : colors.foreground,
                      },
                    ]}
                  >
                    {f.displayValue}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
          {textFindings.length > 0 ? (
            <View style={styles.fieldGrid}>
              {textFindings.map((f) => (
                <FieldCell
                  key={f.key}
                  label={f.label}
                  value={f.displayValue}
                  full
                />
              ))}
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );

  /* ── Notes & Clinical section ────────────────────── */
  const hasNotes = visit.notes || visit.prescription || visit.followUp;
  const clinicalSection = hasNotes ? (
    <View style={sectionStyle}>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>
        Clinical Notes
      </Text>
      <View style={styles.fieldGrid}>
        {visit.prescription ? (
          <FieldCell label="Prescription" full>
            <View
              style={[
                styles.notesBox,
                {
                  backgroundColor: isDark
                    ? "rgba(52, 211, 153, 0.06)"
                    : "rgba(16, 185, 129, 0.04)",
                  borderColor: isDark
                    ? colors.borderSubtle
                    : "rgba(16, 185, 129, 0.15)",
                },
              ]}
            >
              <Text style={[styles.notesText, { color: colors.foreground }]}>
                {visit.prescription}
              </Text>
            </View>
          </FieldCell>
        ) : null}
        {visit.followUp ? (
          <FieldCell
            label="Follow-up"
            value={visit.followUp}
            compact={stackFields}
          />
        ) : null}
        {visit.notes ? (
          <FieldCell label="Doctor's Notes" full>
            <View
              style={[
                styles.notesBox,
                {
                  backgroundColor: isDark ? colors.brand.alpha04 : "#F9F8FC",
                  borderColor: isDark ? colors.borderSubtle : "#ECEAF3",
                },
              ]}
            >
              <Text style={[styles.notesText, { color: colors.foreground }]}>
                {visit.notes}
              </Text>
            </View>
          </FieldCell>
        ) : null}
      </View>
    </View>
  ) : null;

  return (
    <ScreenContainer fullWidth>
      <ScreenLayout
        title={pageTitle}
        headerBackground="canvas"
        showBack
        onBack={goToVisitsList}
        compactHeader="none"
      >
        {isWideLayout ? (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              wideStyles.contentContainer,
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.card,
                styles.cardFill,
                {
                  backgroundColor: isDark ? colors.cardBg : "#FFFFFF",
                  borderColor: isDark ? colors.borderSubtle : "#E8E4EF",
                  borderWidth: isDark ? 1 : 0,
                },
              ]}
            >
              <View
                style={[styles.headerRow, { borderBottomColor: dividerColor }]}
              >
                <View style={styles.headerLeft}>
                  <Pressable
                    style={styles.backButton}
                    onPress={goToVisitsList}
                    accessibilityRole="button"
                    accessibilityLabel="Back to visits list"
                    hitSlop={{ top: 12, bottom: 12, left: 4, right: 12 }}
                  >
                    <Feather
                      name="chevron-left"
                      size={26}
                      color={colors.muted}
                    />
                  </Pressable>
                  <Text
                    style={[
                      styles.headerTitle,
                      { color: colors.foreground },
                    ]}
                    numberOfLines={1}
                  >
                    Visit Info
                  </Text>
                </View>
                <ClayButton
                  label="View patient"
                  variant="outline"
                  icon="external-link"
                  iconPosition="right"
                  onPress={() => router.push(`/(app)/patients/${patient.id}`)}
                />
              </View>

              <View style={[styles.bodyRow, styles.bodyRowWide]}>
                <View style={styles.bodyLeft}>
                  {visitInfoSection}
                  <View
                    style={[styles.divider, { backgroundColor: dividerColor }]}
                  />
                  {clinicalSection}
                </View>
                <View
                  style={[
                    styles.bodyDividerV,
                    { backgroundColor: dividerColor },
                  ]}
                />
                <View style={styles.bodyRight}>{vitalsSection}</View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.card, styles.cardFullScreen, mobileCardBg]}>
            {mobileHeader}
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContentCompact}
              showsVerticalScrollIndicator={false}
            >
              {visitInfoSection}
              <View
                style={[styles.divider, { backgroundColor: dividerColor }]}
              />
              {vitalsSection}
              {clinicalSection ? (
                <>
                  <View
                    style={[
                      styles.divider,
                      { backgroundColor: dividerColor },
                    ]}
                  />
                  {clinicalSection}
                </>
              ) : null}
            </ScrollView>
          </View>
        )}
      </ScreenLayout>
    </ScreenContainer>
  );
}
