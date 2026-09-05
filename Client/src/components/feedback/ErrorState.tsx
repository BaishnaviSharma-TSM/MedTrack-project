import { StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import { colors, spacing, textStyles } from '@/theme';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={[textStyles.cardTitle, styles.title]}>Oops</Text>
      <Text style={[textStyles.body, styles.message]}>{message}</Text>
      {onRetry ? <ClayButton label="Try again" onPress={onRetry} /> : null}
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
    color: colors.accent.secondary,
  },
  message: {
    color: colors.muted,
    textAlign: 'center',
  },
});
