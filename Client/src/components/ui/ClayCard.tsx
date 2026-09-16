import { StyleSheet, View, type ViewProps } from 'react-native';

import { radii, shadows, spacing, useTheme } from '@/theme';

type ClayCardProps = ViewProps & {
  children: React.ReactNode;
};

export function ClayCard({ children, style, ...props }: ClayCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: isDark ? colors.cardGlass : colors.cardGlass,
          borderRadius: radii.card,
          padding: spacing.lg,
          ...shadows.clayCard,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? colors.borderSubtle : 'transparent',
        },
        styles.inner,
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
