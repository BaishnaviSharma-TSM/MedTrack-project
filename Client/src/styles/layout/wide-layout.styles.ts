import { StyleSheet } from "react-native";

import { spacing } from "@/theme";

/** Shared responsive layout tokens for wide web screens */
export default StyleSheet.create({
  contentContainer: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  centeredColumn: {
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  twoColumnRow: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "flex-start",
  },
  twoColumnMain: {
    flex: 1.1,
    minWidth: 0,
  },
  twoColumnAside: {
    flex: 1,
    minWidth: 0,
  },
  statGridWide: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: spacing.sm,
  },
  statCardWide: {
    flex: 1,
    minWidth: 0,
  },
  dashboardColumns: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "flex-start",
  },
  dashboardMainColumn: {
    flex: 1.4,
    minWidth: 0,
    gap: spacing.base,
  },
  dashboardSideColumn: {
    flex: 1,
    minWidth: 0,
    gap: spacing.base,
  },
  statGridVertical: {
    width: "100%",
    flexDirection: "column",
    gap: spacing.sm,
  },
  statCardStacked: {
    width: "100%",
    flex: undefined,
    minWidth: undefined,
  },
});
