import { Platform, StyleSheet } from "react-native";

import { colors, fontFamilies, fontSizes, shadows, spacing } from "@/theme";

export default StyleSheet.create({
  /* ── Layout ─────────────────────────────────────── */
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["2xl"],
    gap: spacing.lg,
  },
  scrollContentCompact: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },

  /* ── Card shell ─────────────────────────────────── */
  card: {
    backgroundColor: colors.cardGlassStrong,
    borderRadius: 16,
    ...shadows.clayCard,
    overflow: "hidden",
  },
  cardFill: {
    flex: 1,
    minHeight: 0,
  },
  cardFullScreen: {
    flex: 1,
    borderRadius: 0,
  },

  /* ── Header row (back + title + patient link) ───── */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
  },
  headerRowCompact: {
    flexWrap: "nowrap",
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  backButton: {
    padding: spacing.xs,
    ...(Platform.OS === "web" ? ({ cursor: "pointer" } as object) : null),
  },
  headerTitle: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes.lg,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    flexShrink: 1,
  },
  headerTitleCompact: {
    fontSize: fontSizes.base,
  },
  headerActionCompact: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  /* ── Section ────────────────────────────────────── */
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.base,
  },
  sectionCompact: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
  },

  /* ── Two-column field grid (like the reference) ── */
  fieldGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fieldCell: {
    width: "50%",
    minWidth: 0,
    paddingVertical: spacing.sm,
    paddingRight: spacing.lg,
  },
  fieldCellFull: {
    width: "100%",
    paddingVertical: spacing.sm,
  },
  fieldCellStacked: {
    width: "100%",
    paddingVertical: spacing.sm,
    paddingRight: 0,
  },
  fieldCellCompact: {
    paddingVertical: spacing.xs,
    paddingRight: spacing.md,
  },
  fieldLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  fieldValue: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
  },

  /* ── Severity badge ─────────────────────────────── */
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
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

  /* ── Status tag (Normal / High / Low) ───────────── */
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: fontFamilies.body.bold,
    fontSize: 10,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  /* ── Findings chips ─────────────────────────────── */
  findingsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  findingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  findingChipLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
  },
  findingChipValue: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
  },

  /* ── Notes box ──────────────────────────────────── */
  notesBox: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  notesText: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.sm,
    lineHeight: 22,
  },

  /* ── Two-column body on wide ────────────────────── */
  bodyRow: {
    gap: 0,
  },
  bodyRowWide: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  bodyLeft: {
    flex: 1.1,
    minWidth: 0,
  },
  bodyRight: {
    flex: 1,
    minWidth: 0,
  },
  bodyDividerV: {
    width: 1,
  },

  /* ── Muted fallback ─────────────────────────────── */
  muted: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.base,
    paddingVertical: spacing.xl,
    textAlign: "center",
  },
});
