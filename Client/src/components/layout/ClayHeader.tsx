import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, textStyles } from '@/theme';

type ClayHeaderProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function ClayHeader({ title, subtitle, right }: ClayHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={[textStyles.cardTitle, styles.title]}>{title}</Text>
        {subtitle ? (
          <Text style={[textStyles.caption, styles.subtitle]}>{subtitle}</Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radii.medium,
  },
  textBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.foreground,
  },
  subtitle: {
    color: colors.muted,
  },
});
