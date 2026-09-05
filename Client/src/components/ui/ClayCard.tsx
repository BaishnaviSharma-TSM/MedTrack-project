import { StyleSheet, View, type ViewProps } from 'react-native';

import { cardStyle } from '@/theme';

type ClayCardProps = ViewProps & {
  children: React.ReactNode;
};

export function ClayCard({ children, style, ...props }: ClayCardProps) {
  return (
    <View style={[cardStyle, styles.inner, style]} {...props}>
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
