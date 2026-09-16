import { Platform, Pressable, Text, View } from "react-native";

import type { ConditionDefinition } from "@/features/conditions/types";
import { spacing, useTheme } from "@/theme";

type ConditionSelectStepProps = {
  conditions: ConditionDefinition[];
  value: string;
  error?: string;
  onChange: (conditionSlug: string) => void;
  isWideLayout?: boolean;
};

export function ConditionSelectStep({
  conditions,
  value,
  error,
  onChange,
  isWideLayout = false,
}: ConditionSelectStepProps) {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ gap: spacing.md }}>
      <Text
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: 18,
          color: colors.foreground,
        }}
      >
        Select condition
      </Text>
      <Text
        style={{
          fontFamily: "DMSans_400Regular",
          fontSize: 13,
          color: colors.muted,
          marginBottom: spacing.sm,
        }}
      >
        Save the condition to load the matching vital-sign fields.
      </Text>

      <View
        style={[
          { gap: spacing.sm },
          isWideLayout &&
            (Platform.OS === "web"
              ? ({
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                } as object)
              : { flexDirection: "row", flexWrap: "wrap" }),
        ]}
      >
        {conditions.map((condition) => {
          const selected = value === condition.slug;
          return (
            <Pressable
              key={condition.slug}
              style={[
                {
                  padding: spacing.base,
                  borderRadius: 16,
                  backgroundColor: isDark ? colors.inputBg : "#FFFFFF",
                  borderWidth: 2,
                  borderColor: isDark ? colors.borderSubtle : colors.inputBg,
                  ...(Platform.OS === "web"
                    ? ({ cursor: "pointer" } as object)
                    : null),
                },
                isWideLayout && {
                  ...(Platform.OS === "web"
                    ? { width: "100%", minWidth: 0 }
                    : {
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 220,
                        minWidth: 180,
                        maxWidth: 320,
                      }),
                  backgroundColor: isDark ? colors.inputBg : colors.canvas,
                },
                selected && {
                  borderColor: colors.brand.primary,
                  backgroundColor: colors.brand.alpha06,
                },
              ]}
              onPress={() => onChange(condition.slug)}
            >
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 16,
                  color: colors.foreground,
                }}
              >
                {condition.label}
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 13,
                  color: colors.muted,
                  marginTop: 4,
                }}
              >
                {condition.fields.length} measurements
              </Text>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 13,
            color: colors.danger,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
