import { Text, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClayBackground } from '@/components/ui';
import { spacing, textStyles, useTheme } from '@/theme';

type ScreenContainerProps = ViewProps & {
  children: React.ReactNode;
  title?: string;
  scroll?: boolean;
  fullWidth?: boolean;
};

export function ScreenContainer({
  children,
  title,
  fullWidth,
  style,
  ...props
}: ScreenContainerProps) {
  const { colors } = useTheme();

  return (
    <ClayBackground style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: colors.canvas }, style]}
        edges={['bottom', 'left', 'right']}
        {...props}
      >
        {title ? (
          <Text
            style={[
              textStyles.sectionTitle,
              {
                color: colors.foreground,
                paddingHorizontal: spacing.lg,
                paddingTop: spacing.base,
                paddingBottom: spacing.sm,
              },
            ]}
          >
            {title}
          </Text>
        ) : null}
        <View
          style={[
            { flex: 1, paddingHorizontal: spacing.lg },
            fullWidth && { paddingHorizontal: 0 },
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </ClayBackground>
  );
}
