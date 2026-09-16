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

  /* ─── Hero Identity Card ──────────────────────────────────── */
  heroCard: {
    backgroundColor: colors.cardGlassStrong,
    borderRadius: radii.card,
    padding: spacing.lg,
    ...shadows.clayCard,
    overflow: "hidden",
  },
  heroBrandStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.brand.primary,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card,
  },
  heroHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.base,
    marginTop: spacing.xs,
  },
  heroInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.clayButton,
  },
  avatarText: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 26,
    color: colors.white,
  },
  heroTextWrap: {
    flex: 1,
    gap: 4,
  },
  patientName: {
    fontFamily: fontFamilies.heading.extraBold,
    fontSize: fontSizes.xl,
    color: colors.foreground,
  },
  idBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.brand.alpha08,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 999,
    gap: 4,
  },
  idBadgeText: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.xs,
    color: colors.brand.primary,
    letterSpacing: 0.4,
  },
  detailsDivider: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.brand.alpha08,
  },

  /* ─── Quick Stats ─────────────────────────────────────────── */
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardGlassStrong,
    borderRadius: radii.medium,
    padding: spacing.base,
    alignItems: "center",
    gap: 6,
    ...shadows.clayCard,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  statValue: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.base,
    color: colors.foreground,
    textAlign: "center",
  },
  statLabel: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    color: colors.muted,
    textAlign: "center",
  },

  /* ─── Details section (inside hero card) ──────────────────── */
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  detailsTitle: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: fontSizes.lg,
    color: colors.foreground,
  },
  detailsGrid: {
    gap: spacing.md,
  },
  detailPairRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EEF6",
  },
  detailPairRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  detailField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    minWidth: 0,
  },
  detailIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.brand.alpha06,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  detailTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  detailLabel: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    color: colors.muted,
    marginBottom: 1,
  },
  detailValue: {
    fontFamily: fontFamilies.body.bold,
    fontSize: fontSizes.sm,
    color: colors.foreground,
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
  historyVitals: {
    fontFamily: fontFamilies.body.regular,
    fontSize: fontSizes.xs,
    color: colors.muted,
    lineHeight: 17,
  },
  historyChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brand.alpha06,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ─── Table wrapper for wide layout ───────────────────────── */
  tableWrap: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
  },

  /* ─── Empty & Muted ───────────────────────────────────────── */
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

  /* ─── Page stack ──────────────────────────────────────────── */
  pageStack: {
    gap: spacing.lg,
  },
});
