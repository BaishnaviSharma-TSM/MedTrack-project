import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import { spacing, useTheme } from '@/theme';

export function DashboardSkeleton() {
  const { colors, isDark } = useTheme();

  const cardBg = isDark ? colors.cardBg : '#FFFFFF';
  const border = isDark ? colors.borderSubtle : '#E8E4EF';

  return (
    <View
      style={{ gap: spacing.base }}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading dashboard"
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              minWidth: '46%' as unknown as number,
              backgroundColor: cardBg,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: border,
              padding: spacing.base,
              gap: 8,
            }}
          >
            <ShimmerBone width={72} height={28} radius={8} />
            <ShimmerBone width="70%" height={12} radius={6} />
          </View>
        ))}
      </View>

      <View
        style={{
          backgroundColor: cardBg,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: border,
          padding: spacing.base,
          gap: spacing.sm,
        }}
      >
        <ShimmerBone width="45%" height={16} radius={6} />
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <ShimmerBone width={88} height={12} radius={6} />
            <View style={{ flex: 1, gap: 8 }}>
              <ShimmerBone height={10} radius={5} />
            </View>
            <ShimmerBone width={20} height={12} radius={6} />
          </View>
        ))}
      </View>

      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: cardBg,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: border,
            padding: spacing.base,
            marginBottom: spacing.sm,
            gap: 8,
          }}
        >
          <ShimmerBone width="35%" height={12} radius={6} />
          <ShimmerBone width="70%" height={14} radius={6} />
          <ShimmerBone width="50%" height={12} radius={6} />
        </View>
      ))}
    </View>
  );
}
