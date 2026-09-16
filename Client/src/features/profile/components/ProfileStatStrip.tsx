import { Text, View } from 'react-native';

import { spacing, useTheme } from '@/theme';

type ProfileStatStripProps = {
  totalPatients: number;
  totalVisits: number;
};

export function ProfileStatStrip({ totalPatients, totalVisits }: ProfileStatStripProps) {
  const { colors, isDark } = useTheme();

  const boxStyle = {
    flex: 1,
    backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.sm,
    alignItems: 'center' as const,
    gap: 4,
  };

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      <View style={boxStyle}>
        <Text
          style={{
            fontFamily: 'Nunito_700Bold',
            fontSize: 24,
            color: colors.brand.primary,
            textAlign: 'center',
          }}
        >
          {totalPatients}
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans_400Regular',
            fontSize: 12,
            color: colors.muted,
            textAlign: 'center',
          }}
        >
          Patients managed
        </Text>
      </View>
      <View style={boxStyle}>
        <Text
          style={{
            fontFamily: 'Nunito_700Bold',
            fontSize: 24,
            color: colors.brand.primary,
            textAlign: 'center',
          }}
        >
          {totalVisits}
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans_400Regular',
            fontSize: 12,
            color: colors.muted,
            textAlign: 'center',
          }}
        >
          Visits logged
        </Text>
      </View>
    </View>
  );
}
