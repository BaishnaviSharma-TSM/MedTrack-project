import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { PatientProfileSkeleton } from "@/components/feedback";
import { ScreenContainer, ScreenLayout } from "@/components/layout";
import { VisitHistoryTable } from "@/features/visits/components/VisitHistoryTable";
import { VisitVitalsChips } from "@/features/visits/components/VisitVitalsChips";
import { ClayButton } from "@/components/ui";
import { getPatientById } from "@/features/patients/services/patientService";
import { getVisitsByPatient } from "@/features/visits/services/visitService";
import { getConditionLabel } from "@/features/visits/services/visitRecordService";
import { useDocumentTitle, useIsWideLayout } from "@/hooks";
import type { Patient, Visit } from "@/types";
import { formatDisplayDate } from "@/utils/formatDisplayDate";
import baseStyles from "@/styles/screens/patient-profile.styles";
import wideStyles from "@/styles/layout/wide-layout.styles";
import { useTheme } from "@/theme";

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

type DetailFieldProps = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  numberOfLines?: number;
};

function DetailField({ icon, label, value, numberOfLines = 2 }: DetailFieldProps) {
  const { colors } = useTheme();
  return (
    <View style={baseStyles.detailField}>
      <View
        style={[baseStyles.detailIconWrap, { backgroundColor: colors.brand.alpha06 }]}
      >
        <Feather name={icon} size={15} color={colors.brand.primary} />
      </View>
      <View style={baseStyles.detailTextWrap}>
        <Text style={[baseStyles.detailLabel, { color: colors.muted }]}>{label}</Text>
        <Text
          style={[baseStyles.detailValue, { color: colors.foreground }]}
          numberOfLines={numberOfLines}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

type StatCardProps = {
  icon: keyof typeof Feather.glyphMap;
  value: string;
  label: string;
  bgColor: string;
  iconColor: string;
};

function StatCard({ icon, value, label, bgColor, iconColor }: StatCardProps) {
  const { colors, isDark } = useTheme();
  return (
    <View
      style={[
        baseStyles.statCard,
        {
          backgroundColor: isDark ? colors.cardGlass : colors.cardGlassStrong,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? colors.borderSubtle : 'transparent',
        },
      ]}
    >
      <View style={[baseStyles.statIconWrap, { backgroundColor: bgColor }]}>
        <Feather name={icon} size={17} color={iconColor} />
      </View>
      <Text style={[baseStyles.statValue, { color: colors.foreground }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[baseStyles.statLabel, { color: colors.muted }]}>{label}</Text>
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
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useDocumentTitle("Patient Details");

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

  const themedCard = {
    backgroundColor: isDark ? colors.cardGlass : colors.cardGlassStrong,
    borderWidth: isDark ? 1 : 0,
    borderColor: isDark ? colors.borderSubtle : 'transparent',
  };

  const recordVisitRoute = patient
    ? `/(app)/visits/new?patientId=${patient.id}`
    : undefined;

  return (
    <ScreenContainer fullWidth>
      <ScreenLayout
        title="Patient Details"
        showBack
        onBack={() => router.back()}
        headerBackground="canvas"
      >
        <ScrollView
          style={baseStyles.scroll}
          contentContainerStyle={[
            baseStyles.scrollContent,
            isWideLayout && wideStyles.contentContainer,
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
                <View style={[baseStyles.heroBrandStrip, { backgroundColor: colors.brand.primary }]} />
                <View style={baseStyles.heroHeaderRow}>
                  <View style={baseStyles.heroInner}>
                    <View style={baseStyles.avatar}>
                      <Text style={baseStyles.avatarText}>
                        {patient.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={baseStyles.heroTextWrap}>
                      <Text style={[baseStyles.patientName, { color: colors.foreground }]}>
                        {patient.name}
                      </Text>
                      <View style={[baseStyles.idBadge, { backgroundColor: colors.brand.alpha08 }]}>
                        <Feather name="hash" size={10} color={colors.brand.primary} />
                        <Text style={[baseStyles.idBadgeText, { color: colors.brand.primary }]}>
                          {patient.uniqueId}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ClayButton
                    label="Edit Patient"
                    variant="outline"
                    icon="edit-2"
                    onPress={() => router.push(`/(app)/patients/${patient.id}/edit`)}
                  />
                </View>

                <View style={[baseStyles.detailsDivider, { borderTopColor: colors.borderMuted }]}>
                  <View style={baseStyles.detailsHeader}>
                    <Feather name="file-text" size={18} color={colors.brand.primary} />
                    <Text style={[baseStyles.detailsTitle, { color: colors.foreground }]}>
                      Patient details
                    </Text>
                  </View>
                  <View style={baseStyles.detailsGrid}>
                    <View
                      style={[
                        baseStyles.detailPairRow,
                        { borderBottomColor: isDark ? colors.borderMuted : '#F1EEF6' },
                      ]}
                    >
                      <DetailField icon="calendar" label="Age" value={`${patient.age} yrs`} />
                      <DetailField
                        icon="users"
                        label="Gender"
                        value={formatGender(patient.gender)}
                      />
                    </View>
                    <View
                      style={[
                        baseStyles.detailPairRow,
                        { borderBottomColor: isDark ? colors.borderMuted : '#F1EEF6' },
                      ]}
                    >
                      <DetailField icon="phone" label="Contact" value={patient.contactNumber} />
                      <DetailField
                        icon="map-pin"
                        label="Address"
                        value={patient.address?.trim() || '—'}
                        numberOfLines={3}
                      />
                    </View>
                    <View style={[baseStyles.detailPairRow, baseStyles.detailPairRowLast]}>
                      <DetailField
                        icon="clock"
                        label="Registered on"
                        value={formatDisplayDate(patient.createdAt)}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={baseStyles.statsRow}>
                <StatCard
                  icon="activity"
                  value={String(visits.length)}
                  label="Total visits"
                  bgColor={isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.12)'}
                  iconColor={colors.accent.tertiary}
                />
                <StatCard
                  icon="calendar"
                  value={lastVisit ? formatDisplayDate(lastVisit.visitDate) : "—"}
                  label="Last visit"
                  bgColor={isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)'}
                  iconColor={colors.accent.success}
                />
                <StatCard
                  icon="clipboard"
                  value={lastVisit ? getConditionLabel(lastVisit.condition) : "—"}
                  label="Last condition"
                  bgColor={isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.12)'}
                  iconColor={colors.accent.warning}
                />
              </View>

              <View style={[baseStyles.historySection, themedCard]}>
                <View style={baseStyles.sectionHeaderWrap}>
                  <View style={baseStyles.sectionHeaderLeft}>
                    <Feather name="clock" size={18} color={colors.brand.primary} />
                    <Text style={[baseStyles.sectionTitle, { color: colors.foreground }]}>
                      Visit history
                    </Text>
                    <Text style={baseStyles.sectionCount}>{visits.length}</Text>
                  </View>
                  <View style={baseStyles.sectionHeaderRight}>
                    <ClayButton
                      label="Record Visit"
                      icon="activity"
                      onPress={() => recordVisitRoute && router.push(recordVisitRoute)}
                    />
                  </View>
                </View>

                {visits.length === 0 ? (
                  <View style={baseStyles.emptyWrap}>
                    <Feather name="inbox" size={32} color={colors.brand.alpha30} />
                    <Text style={[baseStyles.emptyText, { color: colors.muted }]}>
                      No visits recorded yet.{"\n"}Tap Record Visit to log the first one.
                    </Text>
                  </View>
                ) : isWideLayout ? (
                  <View style={baseStyles.tableWrap}>
                    <VisitHistoryTable visits={visits} />
                  </View>
                ) : (
                  <View style={baseStyles.historyListWrap}>
                    {visits.map((visit) => {
                      const dateParts = splitDate(formatDisplayDate(visit.visitDate));
                      return (
                        <Pressable
                          key={visit.id}
                          style={[
                            baseStyles.historyCard,
                            {
                              backgroundColor: isDark ? colors.surfaceElevated : '#FFFFFF',
                              borderColor: isDark ? colors.borderSubtle : '#EEEAF4',
                            },
                          ]}
                          onPress={() => router.push(`/(app)/visits/${visit.id}`)}
                          accessibilityRole="button"
                          accessibilityLabel={`Open visit from ${formatDisplayDate(visit.visitDate)}`}
                        >
                          <View style={baseStyles.historyDateCol}>
                            <Text style={[baseStyles.historyDay, { color: colors.foreground }]}>
                              {dateParts.day}
                            </Text>
                            <Text style={[baseStyles.historyMonthYear, { color: colors.muted }]}>
                              {dateParts.monthYear}
                            </Text>
                          </View>
                          <View
                            style={[
                              baseStyles.historyDivider,
                              { backgroundColor: isDark ? colors.borderSubtle : '#EEEAF4' },
                            ]}
                          />
                          <View style={baseStyles.historyMain}>
                            <Text style={[baseStyles.historyCondition, { color: colors.foreground }]}>
                              {getConditionLabel(visit.condition)}
                            </Text>
                            <VisitVitalsChips vitals={visit.vitals} max={2} />
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
              </View>
            </View>
          )}
        </ScrollView>
      </ScreenLayout>
    </ScreenContainer>
  );
}
