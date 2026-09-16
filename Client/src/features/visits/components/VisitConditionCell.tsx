import { Text, View } from 'react-native';

import { getConditionLabel } from '../services/visitRecordService';
import { fontFamilies, useTheme } from '@/theme';

const CONDITION_DOT_COLORS: Record<string, string> = {
  fever: '#14B8CC',
  general: '#2A9D8F',
  diabetes: '#457B9D',
  hypertension: '#6C63AC',
  asthma: '#1ABC9C',
  cardiac: '#E67E22',
  anemia: '#9B59B6',
};

type VisitConditionCellProps = {
  condition: string;
};

export function VisitConditionCell({ condition }: VisitConditionCellProps) {
  const { colors } = useTheme();
  const dotColor = CONDITION_DOT_COLORS[condition] ?? colors.accent.primary;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      <Text
        style={{
          flexShrink: 1,
          fontFamily: fontFamilies.body.medium,
          fontSize: 13,
          color: colors.foreground,
        }}
        numberOfLines={1}
      >
        {getConditionLabel(condition)}
      </Text>
    </View>
  );
}
