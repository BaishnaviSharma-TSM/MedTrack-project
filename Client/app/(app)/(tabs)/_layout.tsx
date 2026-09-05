import { Tabs } from 'expo-router';

import { CurvedTabBar, TabShell } from '@/components/layout';

export default function TabsLayout() {
  return (
    <TabShell>
      <Tabs
        tabBar={(props) => <CurvedTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          safeAreaInsets: { bottom: 0 },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="patients" options={{ title: 'Patients' }} />
        <Tabs.Screen name="visits" options={{ title: 'Visits' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </TabShell>
  );
}
