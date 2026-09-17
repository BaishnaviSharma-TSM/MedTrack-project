import { Text, View, type StyleProp, type ViewStyle } from "react-native";

import { getConditionLabel } from "@/features/visits/services/visitRecordService";
import { fontFamilies, useTheme } from "@/theme";
import type { ConditionCount } from "../types";

type ConditionBreakdownChartProps = {
  data: ConditionCount[];
  containerStyle?: StyleProp<ViewStyle>;
};

export function ConditionBreakdownChart({
  data,
  containerStyle,
}: ConditionBreakdownChartProps) {
  const { colors, isDark } = useTheme();

  const BAR_COLORS = [colors.chart.bar1, colors.chart.bar2, colors.chart.bar3, colors.chart.bar4];

  const containerBase: ViewStyle = {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
    padding: 16,
    marginBottom: 16,
  };

  if (data.length === 0) {
    return (
      <View style={[containerBase, containerStyle]}>
        <Text
          style={{
            fontFamily: fontFamilies.heading.bold,
            fontSize: 16,
            color: colors.foreground,
            marginBottom: 12,
          }}
        >
          Visits by condition (30d)
        </Text>
        <Text
          style={{
            fontFamily: fontFamilies.body.regular,
            fontSize: 14,
            color: colors.muted,
          }}
        >
          No visits in the last 30 days.
        </Text>
      </View>
    );
  }

  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <View style={[containerBase, containerStyle]}>
      <Text
        style={{
          fontFamily: fontFamilies.heading.bold,
          fontSize: 16,
          color: colors.foreground,
          marginBottom: 12,
        }}
      >
        Visits by condition (30d)
      </Text>
      <View style={{ gap: 8 }}>
        {data.map((item, index) => {
          const widthPercent = Math.max((item.count / maxCount) * 100, 8);
          return (
            <View
              key={item.condition}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text
                style={{
                  width: 115,
                  fontFamily: fontFamilies.body.medium,
                  fontSize: 12,
                  color: colors.foreground,
                }}
                numberOfLines={1}
              >
                {getConditionLabel(item.condition)}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.chart.barTrack,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    borderRadius: 5,
                    width: `${widthPercent}%`,
                    backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                  }}
                />
              </View>
              <Text
                style={{
                  width: 24,
                  textAlign: 'right',
                  fontFamily: fontFamilies.body.bold,
                  fontSize: 13,
                  color: colors.foreground,
                }}
              >
                {item.count}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
