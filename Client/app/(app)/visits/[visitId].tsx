import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { VisitDetailSkeleton } from '@/components/feedback';
import { ScreenContainer, ScreenLayout } from '@/components/layout';
import { ClayButton } from '@/components/ui';
import { NORMAL_RANGES } from '@/constants';
import {
  getVisitRecordById,
  getConditionLabel,
  getVisitRecords,
} from '@/features/visits/services/visitRecordService';
import type { VisitRecord } from '@/features/visits/types';
import { formatVitalValue } from '@/features/visits/utils/formatVitalValue';
import { useDocumentTitle, useIsWideLayout } from '@/hooks';
import { formatDisplayDateTime } from '@/utils/formatDisplayDate';
import { useTheme } from '@/theme';
import styles from '@/styles/screens/visit-detail.styles';

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function formatGender(gender: string) {
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

type VitalStatus = 'normal' | 'high' | 'low';

function getVitalStatus(key: string, value: string | number | boolean): VitalStatus | null {
  if (typeof value !== 'number') return null;
  const range = NORMAL_RANGES[key];
  if (!range) return null;
  if (value < range.min) return 'low';
  if (value > range.max) return 'high';
  return 'normal';
}

const VITAL_STATUS_LABELS: Record<VitalStatus, string> = {
  normal: 'Normal',
  high: 'High',
  low: 'Low',
};

const CONDITION_DESCRIPTIONS: Record<string, string> = {
  fever: 'Elevated body temperature, potential infection or inflammatory response.',
  hypertension: 'Persistently elevated blood pressure requiring monitoring.',
  diabetes: 'Blood sugar regulation assessment and metabolic screening.',
  general: 'Routine wellness checkup and general health assessment.',
  asthma: 'Respiratory function evaluation and airway management.',
  cardiac: 'Cardiovascular assessment including heart rate, rhythm and function.',
  anemia: 'Low hemoglobin evaluation and iron/nutrient deficiency screening.',
};

const SEVERITY_COLORS: Record<string, { bg: string; dot: string; text: string }> = {
  mild: { bg: 'rgba(16, 185, 129, 0.10)', dot: '#10B981', text: '#047857' },
  moderate: { bg: 'rgba(245, 158, 11, 0.10)', dot: '#F59E0B', text: '#B45309' },
  severe: { bg: 'rgba(239, 68, 68, 0.10)', dot: '#EF4444', text: '#B91C1C' },
};
const SEVERITY_COLORS_DARK: Record<string, { bg: string; dot: string; text: string }> = {
  mild: { bg: 'rgba(52, 211, 153, 0.14)', dot: '#34D399', text: '#6EE7B7' },
  moderate: { bg: 'rgba(251, 191, 36, 0.14)', dot: '#FBBF24', text: '#FDE68A' },
  severe: { bg: 'rgba(248, 113, 113, 0.14)', dot: '#F87171', text: '#FCA5A5' },
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function InfoField({
  label,
  value,
  stacked,
}: {
  label: string;
  value: string;
  stacked?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.field, stacked && styles.fieldStacked]}>
      <Text style={[styles.fieldLabel, { color: colors.muted }]}>{label}</Text>
      <Text style={[styles.fieldValue, { color: colors.foreground }]}>{value}</Text>
    </View>
  );
}

function SectionHeader({
  icon,
  title,
  iconBg,
  iconColor,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  iconBg: string;
  iconColor: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: iconBg }]}>
        <Feather name={icon} size={14} color={iconColor} />
      </View>
      <Text style={[styles.sectionTitle, { color: colors.muted }]}>{title}</Text>
    </View>
  );
}

function Section({
  title,
  icon,
  iconBg,
  iconColor,
  children,
  flex,
  wide,
}: {
  title: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  iconBg: string;
  iconColor: string;
  children: ReactNode;
  flex?: boolean;
  wide?: boolean;
}) {
  return (
    <View style={[styles.section, wide && styles.sectionWide, flex && styles.sectionFlex]}>
      <SectionHeader icon={icon} title={title} iconBg={iconBg} iconColor={iconColor} />
      {children}
    </View>
  );
}

function Badge({ label, severity }: { label: string; severity?: string }) {
  const { isDark, colors } = useTheme();
  const palette = isDark ? SEVERITY_COLORS_DARK : SEVERITY_COLORS;
  const key = severity?.toLowerCase() ?? '';
  const col = palette[key] ?? {
    bg: isDark ? colors.brand.alpha10 : colors.brand.alpha08,
    dot: colors.accent.primary,
    text: colors.accent.primary,
  };

  return (
    <View style={[styles.badge, { backgroundColor: col.bg }]}>
      <View style={[styles.badgeDot, { backgroundColor: col.dot }]} />
      <Text style={[styles.badgeText, { color: col.text }]}>{label}</Text>
    </View>
  );
}

function VitalStatusBadge({ status }: { status: VitalStatus }) {
  const { isDark } = useTheme();
  const colorMap: Record<VitalStatus, { bg: string; dot: string; text: string }> = isDark
    ? {
        normal: { bg: 'rgba(52, 211, 153, 0.14)', dot: '#34D399', text: '#6EE7B7' },
        high: { bg: 'rgba(248, 113, 113, 0.14)', dot: '#F87171', text: '#FCA5A5' },
        low: { bg: 'rgba(56, 189, 248, 0.14)', dot: '#38BDF8', text: '#93C5FD' },
      }
    : {
        normal: { bg: 'rgba(16, 185, 129, 0.10)', dot: '#10B981', text: '#047857' },
        high: { bg: 'rgba(239, 68, 68, 0.10)', dot: '#EF4444', text: '#B91C1C' },
        low: { bg: 'rgba(14, 165, 233, 0.10)', dot: '#0EA5E9', text: '#0369A1' },
      };

  const c = colorMap[status];
  return (
    <View style={[styles.vitalStatusBadge, { backgroundColor: c.bg }]}>
      <View style={[styles.vitalStatusDot, { backgroundColor: c.dot }]} />
      <Text style={[styles.vitalStatusText, { color: c.text }]}>
        {VITAL_STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

function VitalCard({
  vitalKey,
  label,
  value,
  rawValue,
  unit,
}: {
  vitalKey: string;
  label: string;
  value: string;
  rawValue: string | number | boolean;
  unit?: string;
}) {
  const { colors, isDark } = useTheme();
  const status = getVitalStatus(vitalKey, rawValue);

  return (
    <View
      style={[
        styles.vitalCard,
        {
          backgroundColor: isDark ? colors.brand.alpha04 : colors.brand.alpha03,
          borderColor: isDark ? colors.borderSubtle : colors.brand.alpha08,
        },
      ]}
    >
      <Text style={[styles.vitalLabel, { color: colors.muted }]}>{label}</Text>
      <View style={styles.vitalValueRow}>
        <Text style={[styles.vitalValue, { color: colors.foreground }]}>{value}</Text>
        {unit ? (
          <Text style={[styles.vitalUnit, { color: colors.muted }]}>{unit}</Text>
        ) : null}
      </View>
      {status ? <VitalStatusBadge status={status} /> : null}
    </View>
  );
}

function InfoChip({
  icon,
  label,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
}) {
  const { colors, isDark } = useTheme();
  return (
    <View
      style={[
        styles.infoChip,
        { backgroundColor: isDark ? colors.brand.alpha06 : colors.brand.alpha04 },
      ]}
    >
      <Feather name={icon} size={12} color={colors.muted} />
      <Text style={[styles.infoChipText, { color: colors.muted }]}>{label}</Text>
    </View>
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
  const [record, setRecord] = useState<VisitRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [patientVisitCount, setPatientVisitCount] = useState(0);

  useDocumentTitle(record ? `Visit · ${record.patient.name}` : 'Visit Detail');

  useEffect(() => {
    if (!visitId) return;
    getVisitRecordById(visitId)
      .then(setRecord)
      .finally(() => setIsLoading(false));
  }, [visitId]);

  useEffect(() => {
    if (!record) return;
    getVisitRecords().then((all) => {
      const count = all.filter((r) => r.patient.id === record.patient.id).length;
      setPatientVisitCount(count);
    });
  }, [record]);

  const dividerColor = isDark ? colors.borderMuted : '#F1EEF6';
  const stackFields = !isWideLayout;

  /* ── icon section tints ──────────────────────────── */
  const tealBg = isDark ? colors.brand.alpha10 : colors.brand.alpha08;
  const tealFg = colors.accent.primary;
  const amberBg = isDark ? 'rgba(251, 191, 36, 0.12)' : 'rgba(245, 158, 11, 0.10)';
  const amberFg = isDark ? '#FBBF24' : '#D97706';
  const purpleBg = isDark ? 'rgba(168, 85, 247, 0.12)' : 'rgba(139, 92, 246, 0.10)';
  const purpleFg = isDark ? '#C084FC' : '#7C3AED';
  const blueBg = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 165, 233, 0.10)';
  const blueFg = isDark ? '#38BDF8' : '#0EA5E9';
  const greenBg = isDark ? 'rgba(52, 211, 153, 0.12)' : 'rgba(16, 185, 129, 0.10)';
  const greenFg = isDark ? '#34D399' : '#059669';
  /* ── Info chips (doctor, visit count, relative time) ── */
  const infoChips = record ? (
    <View style={styles.infoChipsRow}>
      {record.visit.doctorName ? (
        <InfoChip icon="user-check" label={record.visit.doctorName} />
      ) : null}
      {patientVisitCount > 0 ? (
        <InfoChip
          icon="bar-chart-2"
          label={`${patientVisitCount} total visit${patientVisitCount !== 1 ? 's' : ''}`}
        />
      ) : null}
      <InfoChip icon="clock" label={getRelativeTime(record.visit.visitDate)} />
    </View>
  ) : null;

  /* ── Patient section ─────────────────────────────── */
  const patientSection = record ? (
    <Section
      title="Patient Details"
      icon="user"
      iconBg={tealBg}
      iconColor={tealFg}
      flex={isWideLayout}
      wide={isWideLayout}
    >
      <View style={[styles.fieldGrid, isWideLayout && styles.fieldGridWide]}>
        <InfoField label="Patient ID" value={record.patient.uniqueId} stacked={stackFields} />
        <InfoField
          label="Age / Gender"
          value={`${record.patient.age} yrs · ${formatGender(record.patient.gender)}`}
          stacked={stackFields}
        />
        <InfoField label="Contact" value={record.patient.contactNumber} stacked={stackFields} />
        <InfoField label="Address" value={record.patient.address} stacked={stackFields} />
      </View>
    </Section>
  ) : null;

  /* ── Visit section ───────────────────────────────── */
  const conditionKey = record?.visit.condition ?? '';
  const conditionDesc = CONDITION_DESCRIPTIONS[conditionKey];

  const visitSection = record ? (
    <Section
      title="Visit Details"
      icon="clipboard"
      iconBg={purpleBg}
      iconColor={purpleFg}
      flex={isWideLayout}
      wide={isWideLayout}
    >
      <View style={[styles.fieldGrid, isWideLayout && styles.fieldGridWide]}>
        <InfoField
          label="Date & Time"
          value={formatDisplayDateTime(record.visit.visitDate)}
          stacked={stackFields}
        />
        {record.visit.doctorName ? (
          <InfoField
            label="Attending Doctor"
            value={record.visit.doctorName}
            stacked={stackFields}
          />
        ) : null}
      </View>
      <View style={styles.badgeRow}>
        <Badge label={getConditionLabel(record.visit.condition)} />
        {record.visit.severity ? (
          <Badge
            label={
              record.visit.severity.charAt(0).toUpperCase() + record.visit.severity.slice(1)
            }
            severity={record.visit.severity}
          />
        ) : null}
      </View>
      {conditionDesc ? (
        <Text style={[styles.conditionDesc, { color: colors.muted }]}>{conditionDesc}</Text>
      ) : null}
      <View style={styles.relativeTimeRow}>
        <Feather name="clock" size={11} color={colors.muted} />
        <Text style={[styles.relativeTimeText, { color: colors.muted }]}>
          {getRelativeTime(record.visit.visitDate)}
        </Text>
      </View>
    </Section>
  ) : null;

  /* ── Vitals section ──────────────────────────────── */
  const vitalsSection = record ? (
    <Section
      title="Vitals"
      icon="activity"
      iconBg={amberBg}
      iconColor={amberFg}
      flex={isWideLayout}
      wide={isWideLayout}
    >
      <View style={styles.vitalsGrid}>
        {record.visit.vitals.map((vital) => (
          <VitalCard
            key={vital.key}
            vitalKey={vital.key}
            label={vital.label}
            value={formatVitalValue(vital.value)}
            rawValue={vital.value}
            unit={typeof vital.value === 'boolean' ? undefined : vital.unit}
          />
        ))}
      </View>
    </Section>
  ) : null;

  /* ── Prescription section ────────────────────────── */
  const prescriptionSection = record?.visit.prescription ? (
    <Section
      title="Prescription"
      icon="file-plus"
      iconBg={greenBg}
      iconColor={greenFg}
      flex={isWideLayout}
      wide={isWideLayout}
    >
      <View
        style={[
          styles.prescriptionBox,
          {
            backgroundColor: isDark ? 'rgba(52, 211, 153, 0.06)' : 'rgba(16, 185, 129, 0.04)',
            borderColor: isDark ? colors.borderSubtle : 'rgba(16, 185, 129, 0.15)',
          },
        ]}
      >
        <Text style={[styles.prescriptionText, { color: colors.foreground }]}>
          {record.visit.prescription}
        </Text>
      </View>
      {record.visit.followUp ? (
        <View
          style={[
            styles.followUpRow,
            {
              backgroundColor: isDark
                ? 'rgba(56, 189, 248, 0.10)'
                : 'rgba(14, 165, 233, 0.08)',
            },
          ]}
        >
          <Feather name="calendar" size={12} color={blueFg} />
          <Text style={[styles.followUpText, { color: blueFg }]}>
            Follow-up: {record.visit.followUp}
          </Text>
        </View>
      ) : null}
    </Section>
  ) : null;

  /* ── Notes section ───────────────────────────────── */
  const notesSection = record?.visit.notes ? (
    <Section
      title="Notes"
      icon="file-text"
      iconBg={blueBg}
      iconColor={blueFg}
      flex={isWideLayout}
      wide={isWideLayout}
    >
      <View
        style={[
          styles.notesBox,
          {
            backgroundColor: isDark ? colors.brand.alpha04 : '#F9F8FC',
            borderColor: isDark ? colors.borderSubtle : '#ECEAF3',
          },
        ]}
      >
        <Text style={[styles.notes, { color: colors.foreground }]}>{record.visit.notes}</Text>
      </View>
    </Section>
  ) : null;

  /* ── Composed card ───────────────────────────────── */
  const card = !record ? (
    <Text style={[styles.muted, { color: colors.muted }]}>Visit not found.</Text>
  ) : (
    <View
      style={[
        styles.card,
        isWideLayout && styles.cardFill,
        {
          backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        },
      ]}
    >
      {/* ─ Accent stripe ─ */}
      <View style={[styles.accentStripe, { backgroundColor: colors.accent.primary }]} />

      {/* ─ Header ─ */}
      <View style={[styles.headerRow, { borderBottomColor: dividerColor }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIconCircle, { backgroundColor: tealBg }]}>
            <Feather name="file-text" size={18} color={tealFg} />
          </View>
          <Text style={[styles.heading, { color: colors.foreground }]}>Visit Info</Text>
        </View>
        <ClayButton
          label="View patient profile"
          variant="outline"
          icon="external-link"
          iconPosition="right"
          onPress={() => router.push(`/(app)/patients/${record.patient.id}`)}
        />
      </View>

      {/* ─ Patient banner ─ */}
      <View style={styles.patientBanner}>
        <View style={[styles.patientAvatar, { backgroundColor: colors.accent.primary }]}>
          <Text style={styles.patientAvatarText}>{getInitials(record.patient.name)}</Text>
        </View>
        <View style={styles.patientBannerInfo}>
          <Text style={[styles.patientName, { color: colors.foreground }]}>
            {record.patient.name}
          </Text>
          <Text style={[styles.patientMeta, { color: colors.muted }]}>
            {record.patient.uniqueId} · {record.patient.age} yrs ·{' '}
            {formatGender(record.patient.gender)}
          </Text>
        </View>
      </View>

      {/* ─ Info chips row (doctor, visits, relative time) ─ */}
      {infoChips}

      <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />

      {/* ─ Body sections ─ */}
      {isWideLayout ? (
        <View style={styles.body}>
          {/* Row 1: Patient Details | Visit Details */}
          <View style={[styles.sectionsRow, styles.sectionsRowFill]}>
            {patientSection}
            <View style={[styles.dividerV, { backgroundColor: dividerColor }]} />
            {visitSection}
          </View>
          <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />

          {/* Row 2: Vitals | Prescription */}
          <View style={[styles.sectionsRow, styles.sectionsRowFill]}>
            {vitalsSection}
            <View style={[styles.dividerV, { backgroundColor: dividerColor }]} />
            {prescriptionSection || notesSection || (
              <View style={styles.sectionFlex} />
            )}
          </View>

          {/* Row 3: Notes (if prescription was shown above) */}
          {prescriptionSection && notesSection ? (
            <>
              <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />
              <View style={styles.sectionsRowFill}>{notesSection}</View>
            </>
          ) : null}
        </View>
      ) : (
        <>
          {patientSection}
          <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />
          {visitSection}
          <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />
          {vitalsSection}
          {prescriptionSection ? (
            <>
              <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />
              {prescriptionSection}
            </>
          ) : null}
          {notesSection ? (
            <>
              <View style={[styles.dividerH, { backgroundColor: dividerColor }]} />
              {notesSection}
            </>
          ) : null}
        </>
      )}
    </View>
  );

  return (
    <ScreenContainer fullWidth>
      <ScreenLayout
        title={record ? `Visit · ${record.patient.name}` : 'Visit Detail'}
        showBack
        onBack={() => router.navigate('/(app)/(tabs)/visits')}
      >
        {isWideLayout ? (
          <View style={styles.page}>
            <View style={styles.pagePad}>{isLoading ? <VisitDetailSkeleton /> : card}</View>
          </View>
        ) : (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? <VisitDetailSkeleton /> : card}
          </ScrollView>
        )}
      </ScreenLayout>
    </ScreenContainer>
  );
}
