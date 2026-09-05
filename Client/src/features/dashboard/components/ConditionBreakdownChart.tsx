import { Text, View } from 'react-native';

import type { ConditionCount } from '../types';
import styles from '@/styles/dashboard/condition-breakdown-chart.styles';
import { colors } from '@/theme';

const BAR_COLORS = [
  colors.brand.primary,
  '#2A9D8F',
  '#457B9D',
  '#6C63AC',
];

type ConditionBreakdownChartProps = {
  data: ConditionCount[];
};

export function ConditionBreakdownChart({ data }: ConditionBreakdownChartProps) {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Visits by condition (30d)</Text>
        <Text style={styles.empty}>No visits in the last 30 days.</Text>
      </View>
    );
  }

  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visits by condition (30d)</Text>
      <View style={styles.bars}>
        {data.map((item, index) => {
          const widthPercent = Math.max((item.count / maxCount) * 100, 8);
          return (
            <View key={item.condition} style={styles.row}>
              <Text style={styles.conditionLabel} numberOfLines={1}>
                {item.label}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${widthPercent}%`,
                      backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                    },
                  ]}
                />
              </View>
              <Text style={styles.count}>{item.count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
