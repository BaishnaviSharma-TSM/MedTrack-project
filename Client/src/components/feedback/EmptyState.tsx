import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, textStyles } from '@/theme';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={[textStyles.cardTitle, styles.title]}>{title}</Text>
      {description ? (
        <Text style={[textStyles.body, styles.description]}>{description}</Text>
      ) : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.base,
    padding: spacing.lg,
  },
  title: {
    color: colors.foreground,
    textAlign: 'center',
  },
  description: {
    color: colors.muted,
    textAlign: 'center',
  },
});
