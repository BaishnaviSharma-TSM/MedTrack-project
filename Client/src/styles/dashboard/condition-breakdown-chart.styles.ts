import { StyleSheet } from "react-native";

import { colors, spacing } from "@/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E4EF",
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  empty: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: colors.muted,
  },
  bars: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  conditionLabel: {
    width: 115,
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: colors.foreground,
  },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F1EEF6",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  count: {
    width: 24,
    textAlign: "right",
    fontFamily: "DMSans_700Bold",
    fontSize: 13,
    color: colors.foreground,
  },
});
