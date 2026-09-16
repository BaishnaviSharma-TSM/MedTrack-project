import { Text, View } from 'react-native';

import { spacing, textStyles, useTheme } from '@/theme';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.base,
        padding: spacing.lg,
      }}
    >
      <Text style={[textStyles.cardTitle, { color: colors.foreground, textAlign: 'center' }]}>
        {title}
      </Text>
      {description ? (
        <Text style={[textStyles.body, { color: colors.muted, textAlign: 'center' }]}>
          {description}
        </Text>
      ) : null}
      {action}
    </View>
  );
}
