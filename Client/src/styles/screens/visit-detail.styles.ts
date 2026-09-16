import { Platform, StyleSheet } from "react-native";

import { fontFamilies, fontSizes, spacing } from "@/theme";

export default StyleSheet.create({
  /* ── Layout scaffolding ─────────────────────────── */
  scroll: { flex: 1 },
  page: {
    flex: 1,
    minHeight: 0,
    ...(Platform.OS === "web" ? ({ height: "100%" } as object) : null),
  },
  pagePad: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    ...(Platform.OS === "web"
      ? ({ height: "100%", boxSizing: "border-box" } as object)
      : null),
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },

  /* ── Main card ──────────────────────────────────── */
  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  cardFill: {
    flex: 1,
    minHeight: 0,
    flexDirection: "column",
  },

  /* ── Accent stripe (top of card) ────────────────── */
  accentStripe: {
    height: 5,
  },

  /* ── Header row ─────────────────────────────────── */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    flexShrink: 0,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  headerIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes.lg,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  /* ── Body / scroll area ─────────────────────────── */
  body: {
    flex: 1,
    minHeight: 0,
    ...(Platform.OS === "web" ? ({ overflow: "auto" } as object) : null),
  },

  /* ── Patient banner ─────────────────────────────── */
  patientBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  patientAvatarText: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
    color: "#FFFFFF",
  },
  patientBannerInfo: {
    flex: 1,
    minWidth: 0,
  },
  patientName: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
  },
  patientMeta: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.sm,
    marginTop: 2,
  },

  /* ── Sections grid ──────────────────────────────── */
  sectionsRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  sectionsRowFill: {
    flex: 1,
    minHeight: 0,
  },
  dividerH: {
    height: 1,
    flexShrink: 0,
  },
  dividerV: {
    width: 1,
  },

  /* ── Section ────────────────────────────────────── */
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    gap: spacing.sm,
  },
  sectionWide: {
    paddingVertical: 0,
    paddingTop: spacing.lg,
    paddingBottom: 0,
    gap: 5,
  },
  sectionFlex: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  /* ── Field grid ─────────────────────────────────── */
  fieldGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.base,
  },
  fieldGridWide: {
    gap: spacing.lg,
  },

  /* ── Individual field ───────────────────────────── */
  field: {
    minWidth: 130,
    flexGrow: 1,
    flexBasis: 130,
    gap: 3,
  },
  fieldStacked: {
    flexBasis: "100%",
    minWidth: "100%",
  },
  fieldLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    letterSpacing: 0.3,
  },
  fieldValue: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
  },

  /* ── Condition / Severity badges ────────────────── */
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
    letterSpacing: 0.3,
  },

  /* ── Condition description ──────────────────────── */
  conditionDesc: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    lineHeight: 18,
    marginTop: 2,
  },

  /* ── Relative time chip ─────────────────────────── */
  relativeTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  relativeTimeText: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
  },

  /* ── Vitals grid ────────────────────────────────── */
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  vitalCard: {
    minWidth: 140,
    flexGrow: 1,
    flexBasis: 140,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: 4,
  },
  vitalLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    letterSpacing: 0.2,
  },
  vitalValue: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
  },
  vitalUnit: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    marginLeft: 3,
  },
  vitalValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  vitalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  vitalStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  vitalStatusText: {
    fontFamily: fontFamilies.body.bold,
    fontSize: 10,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  /* ── Prescription section ───────────────────────── */
  prescriptionBox: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  prescriptionText: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.sm,
    lineHeight: 22,
  },
  followUpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.xs,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  followUpText: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
  },

  /* ── Notes section ──────────────────────────────── */
  notesBox: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  notes: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    lineHeight: 22,
  },

  /* ── Doctor / visit-count info row ──────────────── */
  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  infoChipText: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
  },
  infoChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },

  /* ── Muted fallback ─────────────────────────────── */
  muted: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.base,
  },
});
