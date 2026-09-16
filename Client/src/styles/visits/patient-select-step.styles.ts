import { Platform, StyleSheet } from "react-native";

import { colors, spacing } from "@/theme";

export default StyleSheet.create({
  fieldGroup: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: colors.foreground,
  },
  list: {
    gap: spacing.sm,
  },
  listWide: {
    ...(Platform.OS === "web"
      ? ({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        } as object)
      : {
          flexDirection: "row",
          flexWrap: "wrap",
        }),
  },
  patientCard: {
    padding: spacing.base,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.inputBg,
    ...(Platform.OS === "web" ? ({ cursor: "pointer" } as object) : null),
  },
  patientCardWide: {
    ...(Platform.OS === "web"
      ? { width: "100%", minWidth: 0 }
      : {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 240,
          minWidth: 200,
          maxWidth: 360,
        }),
    backgroundColor: colors.canvas,
  },
  patientCardSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: "rgba(11, 114, 133, 0.06)",
  },
  patientName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    color: colors.foreground,
  },
  patientMeta: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  errorText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: "#DC2626",
  },
});
