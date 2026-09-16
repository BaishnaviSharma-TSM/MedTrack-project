import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { CONDITIONS } from '@/constants';
import { fontFamilies, useTheme } from '@/theme';
import type { WeeklyVisitBar } from '../types';

const CONDITION_COLORS: Record<string, string> = {
  fever: '#14B8CC',
  general: '#2A9D8F',
  diabetes: '#457B9D',
  hypertension: '#6C63AC',
  asthma: '#1ABC9C',
  cardiac: '#E67E22',
  anemia: '#9B59B6',
};

type TimeRange = 'Wk' | 'Mo' | 'Yr';

type VisitRhythmChartProps = {
  data: WeeklyVisitBar[];
};

export function VisitRhythmChart({ data }: VisitRhythmChartProps) {
  const { colors, isDark } = useTheme();
  const [activeRange] = useState<TimeRange>('Wk');

  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const maxBarHeight = 140;

  const conditionKeys = Object.keys(CONDITIONS);

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: 20,
        flex: 2.2,
        minHeight: 220,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading.bold,
              fontSize: 15,
              color: colors.foreground,
            }}
          >
            Visit rhythm
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 12,
              color: colors.muted,
            }}
          >
            last 17 weeks, stacked by condition
          </Text>
        </View>

        {/* Time range pills */}
        <View style={{ flexDirection: 'row', gap: 2, backgroundColor: isDark ? colors.brand.alpha06 : '#F0ECF5', borderRadius: 8, padding: 2 }}>
          {(['Yr', 'Mo', 'Wk'] as TimeRange[]).map((range) => (
            <Pressable
              key={range}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: activeRange === range
                  ? (isDark ? colors.accent.primary : colors.accent.primary)
                  : 'transparent',
                ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamilies.body.bold,
                  fontSize: 12,
                  color: activeRange === range ? '#FFFFFF' : colors.muted,
                }}
              >
                {range}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Bar chart */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, flex: 1 }}>
        {data.map((bar, i) => {
          const barHeight = maxTotal > 0 ? (bar.total / maxTotal) * maxBarHeight : 0;

          return (
            <View
              key={`${bar.weekLabel}-${i}`}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                minWidth: 0,
              }}
            >
              {/* Total label on top */}
              {bar.total > 0 && (
                <Text
                  style={{
                    fontFamily: fontFamilies.body.bold,
                    fontSize: 10,
                    color: colors.foreground,
                    marginBottom: 4,
                  }}
                >
                  {bar.total}
                </Text>
              )}

              {/* Stacked bar */}
              <View
                style={{
                  width: '80%',
                  maxWidth: 28,
                  height: Math.max(barHeight, bar.total > 0 ? 4 : 0),
                  borderRadius: 4,
                  overflow: 'hidden',
                  justifyContent: 'flex-end',
                }}
              >
                {conditionKeys.map((condKey) => {
                  const count = bar.byCondition[condKey] ?? 0;
                  if (count === 0) return null;
                  const segmentHeight = (count / bar.total) * Math.max(barHeight, 4);
                  return (
                    <View
                      key={condKey}
                      style={{
                        height: segmentHeight,
                        backgroundColor: CONDITION_COLORS[condKey] ?? colors.chart.bar1,
                      }}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      {/* X-axis labels */}
      <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
        {data.map((bar, i) => (
          <View key={`label-${i}`} style={{ flex: 1, alignItems: 'center' }}>
            {i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1 ? (
              <Text
                style={{
                  fontFamily: fontFamilies.body.regular,
                  fontSize: 9,
                  color: colors.muted,
                }}
                numberOfLines={1}
              >
                {bar.weekLabel}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
