import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from '@/styles/layout/page-header.styles';
import { colors } from '@/theme';

type PageHeaderProps = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  /** white = default; canvas = lavender screen; transparent = clay/gray tab screens */
  background?: 'white' | 'canvas' | 'transparent';
};

/** Full-bleed page header — extends into the status bar */
export function PageHeader({
  title,
  onBack,
  showBack = true,
  background = 'white',
}: PageHeaderProps) {
  const insets = useSafeAreaInsets();
  const backgroundStyle =
    background === 'canvas'
      ? styles.containerCanvas
      : background === 'transparent'
        ? styles.containerTransparent
        : undefined;

  return (
    <View style={[styles.container, backgroundStyle, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {showBack && onBack ? (
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 12, bottom: 12, right: 16, left: 4 }}
          >
            <Feather name="chevron-left" size={26} color={colors.muted} />
          </Pressable>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
