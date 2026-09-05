import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import { ScreenContainer } from '@/components/layout';
import { colors, textStyles } from '@/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <ScreenContainer title="404">
        <View style={styles.content}>
          <Text style={[textStyles.sectionTitle, styles.title]}>
            Page not found
          </Text>
          <Link href="/" asChild>
            <ClayButton label="Go home" />
          </Link>
        </View>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    color: colors.foreground,
  },
});
