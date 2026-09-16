import { Tabs } from 'expo-router';

import { CurvedTabBar, TabShell } from '@/components/layout';
import { SCREEN_TITLES } from '@/constants/navigation';
import { useIsWideLayout } from '@/hooks';

export default function TabsLayout() {
  const isWideLayout = useIsWideLayout();

  return (
    <TabShell>
      <Tabs
        tabBar={isWideLayout ? () => null : (props) => <CurvedTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: SCREEN_TITLES.home }} />
        <Tabs.Screen name="patients" options={{ title: SCREEN_TITLES.patients }} />
        <Tabs.Screen name="visits" options={{ title: SCREEN_TITLES.visits }} />
        <Tabs.Screen name="profile" options={{ title: SCREEN_TITLES.profile }} />
      </Tabs>
    </TabShell>
  );
}
