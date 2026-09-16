import { Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { fontFamilies, useTheme } from '@/theme';

type DashboardStatCardProps = {
  value: number | string;
  label: string;
  /** Muted secondary line below the label (e.g. "No visit recorded") */
  subtitle?: string;
  /** Teal inline highlight after the label (e.g. "+2 this month") */
  highlight?: string;
  sparkData?: number[];
  sparkColor?: string;
};

function AreaSparkline({
  data,
  color,
  width = 72,
  height = 40,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const { colors, isDark } = useTheme();
  if (data.length < 2) return null;

  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padY = 4;
  const innerH = height - padY * 2;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padY + innerH - ((val - min) / range) * innerH;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const gradientId = `spark-${color.replace('#', '')}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity={isDark ? 0.35 : 0.25} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill={`url(#${gradientId})`} />
      <Path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DashboardStatCard({
  value,
  label,
  subtitle,
  highlight,
  sparkData,
  sparkColor,
}: DashboardStatCardProps) {
  const { colors, isDark } = useTheme();
  const accent = sparkColor ?? colors.accent.primary;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        paddingHorizontal: 20,
        paddingVertical: 18,
        minWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View style={{ flex: 1, minWidth: 0, alignItems: 'flex-start' }}>
        <Text
          style={{
            fontFamily: fontFamilies.heading.extraBold,
            fontSize: 34,
            color: colors.foreground,
            lineHeight: 40,
            letterSpacing: -0.5,
          }}
        >
          {value}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
          <Text
            style={{
              fontFamily: fontFamilies.body.medium,
              fontSize: 13,
              color: colors.muted,
            }}
            numberOfLines={1}
          >
            {label}
          </Text>
          {highlight ? (
            <Text
              style={{
                fontFamily: fontFamilies.body.medium,
                fontSize: 13,
                color: colors.accent.primary,
              }}
              numberOfLines={1}
            >
              {highlight}
            </Text>
          ) : null}
        </View>

        {subtitle ? (
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 11,
              color: colors.muted,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {sparkData && sparkData.length > 1 ? (
        <AreaSparkline data={sparkData} color={accent} />
      ) : null}
    </View>
  );
}
