import { View } from 'react-native';

import { spacing, useTheme } from '@/theme';
import { ShimmerBone } from '../ShimmerBone';

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
};

const TABLE_RADIUS = 12;

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : colors.brand.alpha08,
        borderRadius: TABLE_RADIUS,
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: spacing.md,
          padding: spacing.md,
          backgroundColor: colors.brand.alpha04,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.borderSubtle : colors.brand.alpha08,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <ShimmerBone key={`h-${index}`} height={14} style={{ flex: 1, borderRadius: 6 }} />
        ))}
      </View>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View
          key={`r-${rowIndex}`}
          style={{
            flexDirection: 'row',
            gap: spacing.md,
            padding: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.brand.alpha06,
          }}
        >
          {Array.from({ length: columns }).map((__, colIndex) => (
            <ShimmerBone key={`c-${rowIndex}-${colIndex}`} height={16} style={{ flex: 1, borderRadius: 6 }} />
          ))}
        </View>
      ))}
    </View>
  );
}
