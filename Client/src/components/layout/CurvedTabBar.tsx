import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FAB_OVERFLOW, FAB_SIZE, TAB_BAR_HEIGHT } from '@/constants/navigation';
import styles from '@/styles/layout/curved-tab-bar.styles';
import { colors } from '@/theme';

import { TabBarBackground } from './TabBarBackground';

type CurvedTabBarProps = {
  state: {
    index: number;
    routes: { name: string; key: string }[];
  };
  navigation: {
    navigate: (name: string) => void;
  };
};

type TabConfig = {
  name: string;
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

const TAB_CONFIG: TabConfig[] = [
  { name: 'index', label: 'Home', icon: 'home' },
  { name: 'patients', label: 'Patients', icon: 'users' },
  { name: 'visits', label: 'Visits', icon: 'activity' },
  { name: 'profile', label: 'Profile', icon: 'user' },
];

export function CurvedTabBar({ state, navigation }: CurvedTabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const barTotalHeight = TAB_BAR_HEIGHT + insets.bottom;

  const leftTabs = TAB_CONFIG.slice(0, 2);
  const rightTabs = TAB_CONFIG.slice(2, 4);

  function renderTab(tab: TabConfig) {
    const routeIndex = state.routes.findIndex((r: { name: string }) => r.name === tab.name);
    if (routeIndex === -1) return null;

    const isFocused = state.index === routeIndex;
    const color = isFocused ? colors.brand.primary : colors.muted;

    return (
      <Pressable
        key={tab.name}
        style={styles.tabItem}
        onPress={() => navigation.navigate(state.routes[routeIndex].name)}
        accessibilityRole="button"
        accessibilityState={{ selected: isFocused }}
        accessibilityLabel={tab.label}
      >
        <Feather name={tab.icon} size={22} color={color} />
        <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{tab.label}</Text>
      </Pressable>
    );
  }

  return (
    <View
      style={[styles.container, { height: barTotalHeight + FAB_OVERFLOW }]}
      onLayout={(event) => {
        const nextWidth = event.nativeEvent.layout.width;
        if (nextWidth > 0 && nextWidth !== barWidth) {
          setBarWidth(nextWidth);
        }
      }}
    >
      <View style={[styles.barLayer, { height: barTotalHeight }]}>
        {barWidth > 0 ? (
          <TabBarBackground width={barWidth} height={barTotalHeight} />
        ) : null}
        <View style={styles.row}>
          <View style={styles.side}>{leftTabs.map(renderTab)}</View>
          <View style={styles.fabGap} />
          <View style={styles.side}>{rightTabs.map(renderTab)}</View>
        </View>
        <View style={[styles.insetSpacer, { height: insets.bottom }]} />
      </View>

      <Pressable
        style={[styles.fab, { bottom: barTotalHeight - FAB_SIZE / 2 + 4 }]}
        onPress={() => router.push('/(app)/patients/new')}
        accessibilityRole="button"
        accessibilityLabel="Add patient"
      >
        <Feather name="plus" size={28} color={colors.white} />
      </Pressable>
    </View>
  );
}
