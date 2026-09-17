import { StyleSheet, Platform } from "react-native";

import {
  colors,
  spacing,
  shadows,
  radii,
  fontFamilies,
  fontSizes,
} from "@/theme";

export default StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["2xl"],
    gap: spacing.lg,
  },

  /* ─── Compact Hero Bar ─────────────────────────────────────── */
  heroCard: {
    backgroundColor: colors.cardGlassStrong,
    borderRadius: radii.card,
    padding: spacing.lg,
    ...shadows.clayCard,
    overflow: "hidden",
    gap: spacing.base,
  },
  heroBrandStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.brand.primary,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg,
    marginTop: spacing.xs,
  },
  heroMainRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    gap: spacing.lg,
  },
  heroIdentityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 0,
    minWidth: 0,
  },
  heroDivider: {
    width: 1,
    alignSelf: "stretch",
    marginVertical: 2,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: 2,
    ...(Platform.OS === "web" ? ({ cursor: "pointer" } as object) : null),
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 22,
    color: colors.white,
  },
  heroTextWrap: {
    gap: 3,
    minWidth: 0,
    maxWidth: 220,
  },
  patientName: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
  },
  heroMetaLine: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    color: colors.muted,
  },
  heroDetailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.xl,
    flex: 1,
    minWidth: 0,
  },
  heroDetailsRowWide: {
    flexWrap: "nowrap",
  },
  heroDetailCol: {
    minWidth: 72,
    gap: 2,
  },
  heroDetailLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  heroDetailValue: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.foreground,
  },

  /* ─── Vitals + Stats two-column ───────────────────────────── */
  insightsRow: {
    gap: spacing.lg,
  },
  insightsRowWide: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  vitalsPanel: {
    borderRadius: radii.card,
    padding: spacing.lg,
    ...shadows.clayCard,
    gap: spacing.base,
    flex: 1.35,
    minWidth: 0,
  },
  vitalsPanelHeader: {
    gap: 4,
  },
  vitalsPanelTitle: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
  },
  vitalsPanelSubtitle: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    color: colors.muted,
    lineHeight: 18,
  },
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  vitalTile: {
    flexGrow: 1,
    flexBasis: "30%",
    minWidth: 130,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: 6,
  },
  vitalTileLabel: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    letterSpacing: 0.2,
  },
  vitalTileValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  vitalTileValue: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
  },
  vitalTileUnit: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.xs,
    marginLeft: 3,
  },
  vitalTileFooter: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 11,
    lineHeight: 15,
  },
  vitalsEmpty: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  vitalsEmptyText: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },

  statsStack: {
    gap: spacing.sm,
    flex: 0.65,
    minWidth: 0,
  },
  statsStackWide: {
    alignSelf: "stretch",
  },
  statStackCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
    borderRadius: radii.medium,
    padding: spacing.base,
    ...shadows.clayCard,
    minHeight: 72,
  },
  statStackCardWide: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  statStackIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statStackTextWrap: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  statStackPrimary: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.base,
  },
  statStackSecondary: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
  },

  /* ─── Visit History Section ───────────────────────────────── */
  historySection: {
    backgroundColor: colors.cardGlassStrong,
    borderRadius: radii.card,
    ...shadows.clayCard,
    overflow: "hidden",
  },
  sectionHeaderWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  sectionHeaderRight: {
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
  },
  sectionCount: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
    color: colors.white,
    backgroundColor: colors.brand.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
    minWidth: 22,
    textAlign: "center",
  },
  historyListWrap: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    gap: spacing.sm,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.icon,
    borderWidth: 1,
    borderColor: "#EEEAF4",
    padding: spacing.base,
    ...(Platform.OS === "web"
      ? ({ cursor: "pointer", transition: "all 0.15s ease" } as object)
      : null),
  },
  historyDateCol: {
    alignItems: "center",
    width: 48,
  },
  historyDay: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.xl,
    color: colors.foreground,
    lineHeight: 24,
  },
  historyMonthYear: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 10,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  historyDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#EEEAF4",
    marginVertical: 2,
  },
  historyMain: {
    flex: 1,
    gap: 4,
  },
  historyCondition: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.foreground,
  },
  historyChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brand.alpha06,
    alignItems: "center",
    justifyContent: "center",
  },

  tableWrap: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
  },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyText: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.sm,
    color: colors.muted,
    textAlign: "center",
  },
  muted: {
    fontFamily: fontFamilies.body.medium,
    fontSize: fontSizes.base,
    color: colors.muted,
  },

  pageStack: {
    gap: spacing.lg,
  },
});
