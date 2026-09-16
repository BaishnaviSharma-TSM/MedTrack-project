import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { useWebPageMetaContext } from '@/hooks/useWebPageMeta';
import baseStyles from '@/styles/layout/web-page-header.styles';
import { useTheme } from '@/theme';

/** Sticky top header for wide-web main pane — reads registered page metadata. */
export function WebPageHeader() {
  const ctx = useWebPageMetaContext();
  const { colors, isDark } = useTheme();

  if (!ctx) return null;

  const { meta } = ctx;
  const { title, subtitle, showBack, onBack, actions } = meta;

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor: isDark ? '#0D1E30' : '#FFFFFF',
          borderBottomColor: colors.borderMuted,
        },
      ]}
    >
      {showBack && onBack ? (
        <Pressable
          style={baseStyles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="chevron-left" size={24} color={colors.muted} />
        </Pressable>
      ) : null}

      <View style={baseStyles.titleBlock}>
        <Text style={[baseStyles.title, { color: colors.foreground }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[baseStyles.subtitle, { color: colors.muted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actions ? <View style={baseStyles.actions}>{actions}</View> : null}
    </View>
  );
}
