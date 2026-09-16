import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClayButton } from '@/components/ui';
import { ScreenContainer } from '@/components/layout';
import { logout } from '@/features/auth/services/authService';
import { useDocumentTitle } from '@/hooks';
import { useAuthContext } from '@/providers';
import { textStyles, useThemeColors } from '@/theme';

/** Admin users manage staff via Swagger — clinical tabs are doctor/nurse only. */
export default function AdminNoticeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setUser } = useAuthContext();

  const colors = useThemeColors();
  useDocumentTitle('Admin');

  async function handleLogout() {
    await logout();
    setUser(null);
    router.replace('/(auth)');
  }

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', gap: 16, paddingHorizontal: 24, paddingTop: insets.top }}>
        <Text style={[textStyles.sectionTitle, { textAlign: 'center' }]}>Admin account</Text>
        <Text style={[textStyles.body, { color: colors.muted, textAlign: 'center' }]}>
          Clinical features are for doctors and nurses on mobile and web. Use Swagger or a future
          admin panel to register staff via POST /users.
        </Text>
        <ClayButton label="Sign out" onPress={handleLogout} />
      </View>
    </ScreenContainer>
  );
}
