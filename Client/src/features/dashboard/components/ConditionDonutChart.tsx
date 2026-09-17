import { Platform, Pressable, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { getConditionLabel } from '@/features/visits/services/visitRecordService';
import { fontFamilies, useTheme } from '@/theme';
import type { ConditionCount } from '../types';

const CHART_COLORS = ['#14B8CC', '#2A9D8F', '#457B9D', '#6C63AC', '#1ABC9C', '#E67E22', '#9B59B6'];

type ConditionDonutChartProps = {
  data: ConditionCount[];
};

export function ConditionDonutChart({ data }: ConditionDonutChartProps) {
  const { colors, isDark } = useTheme();

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const radius = 56;
  const strokeWidth = 16;
  const center = radius + strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: 20,
        minWidth: 0,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading.bold,
              fontSize: 15,
              color: colors.foreground,
            }}
          >
            What you're treating
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 12,
              color: colors.muted,
            }}
          >
            30-day share of visits
          </Text>
        </View>
        <Pressable
          style={{
            ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
          }}
        >
          {/* <Text
            style={{
              fontFamily: fontFamilies.body.bold,
              fontSize: 12,
              color: colors.accent.primary,
            }}
          >
            Show as bars
          </Text> */}
        </Pressable>
      </View>

      {/* Chart + Legend */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
        {/* Donut */}
        <View style={{ width: center * 2, height: center * 2, position: 'relative' }}>
          <Svg width={center * 2} height={center * 2}>
            {/* Background track */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={isDark ? colors.brand.alpha06 : '#F0ECF5'}
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Data segments */}
            {data.map((item, index) => {
              const segmentLength = total > 0 ? (item.count / total) * circumference : 0;
              const offset = cumulativeOffset;
              cumulativeOffset += segmentLength;
              return (
                <Circle
                  key={item.condition}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                  strokeDashoffset={circumference * 0.25 - offset}
                />
              );
            })}
          </Svg>
          {/* Center total */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.heading.extraBold,
                fontSize: 28,
                color: colors.accent.primary,
                lineHeight: 32,
              }}
            >
              {total}
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies.body.regular,
                fontSize: 11,
                color: colors.muted,
              }}
            >
              visits
            </Text>
          </View>
        </View>

        {/* Legend */}
        <View style={{ flex: 1, gap: 8 }}>
          {data.map((item, index) => (
            <View
              key={item.condition}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontFamilies.body.medium,
                    fontSize: 13,
                    color: colors.foreground,
                  }}
                  numberOfLines={1}
                >
                  {getConditionLabel(item.condition)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text
                  style={{
                    fontFamily: fontFamilies.body.bold,
                    fontSize: 14,
                    color: colors.foreground,
                    minWidth: 20,
                    textAlign: 'right',
                  }}
                >
                  {item.count}
                </Text>
                <View
                  style={{
                    backgroundColor: isDark ? colors.brand.alpha08 : '#F0ECF5',
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamilies.body.medium,
                      fontSize: 11,
                      color: colors.muted,
                    }}
                  >
                    {total > 0 ? Math.round((item.count / total) * 100) : 0}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
