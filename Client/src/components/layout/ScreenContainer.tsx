import { StyleSheet, Text, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClayBackground } from '@/components/ui';
import { colors, spacing, textStyles } from '@/theme';

type ScreenContainerProps = ViewProps & {
  children: React.ReactNode;
  title?: string;
  scroll?: boolean;
  /** Remove default horizontal padding — useful for centered auth screens */
  fullWidth?: boolean;
};

export function ScreenContainer({
  children,
  title,
  fullWidth,
  style,
  ...props
}: ScreenContainerProps) {
  return (
    <ClayBackground style={styles.flex}>
      <SafeAreaView style={[styles.flex, style]} edges={['bottom', 'left', 'right']} {...props}>
        {title ? (
          <Text style={[textStyles.sectionTitle, styles.title]}>{title}</Text>
        ) : null}
        <View style={[styles.content, fullWidth && styles.contentFullWidth]}>
          {children}
        </View>
      </SafeAreaView>
    </ClayBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  title: {
    color: colors.foreground,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  contentFullWidth: {
    paddingHorizontal: 0,
  },
});
