import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClayButton, MedTrackLogoHorizontal } from '@/components/ui';
import { ApiError } from '@/types/api';
import { useTheme } from '@/theme';

import { useAuthContext } from '../hooks/useAuth';
import { login } from '../services/authService';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getResponsiveLayout(width: number) {
  const viewportWidth = width > 0 ? width : 768;
  const isCompact = viewportWidth < 360;
  const isLarge = viewportWidth >= 428;

  return {
    horizontalPadding: isCompact ? 28 : isLarge ? 40 : 32,
    logoHeight: isCompact ? 38 : isLarge ? 48 : 42,
    verticalPadding: isCompact ? 16 : 24,
  };
}

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const layout = getResponsiveLayout(width);
  const { colors, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentMinHeight = height - insets.top - insets.bottom;

  async function handleLogin() {
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login({ email: trimmedEmail, password });
      setUser(result.user);
      router.replace('/(app)');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error && err.message.includes('Network request failed')) {
        setError(
          'Cannot reach the server. Check that the backend is running and EXPO_PUBLIC_API_URL points to your machine (not localhost on a physical device).',
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Sign in failed. Please check your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputBg = isDark ? colors.inputBg : '#FFFFFF';
  const inputBorder = isDark ? colors.borderSubtle : 'transparent';
  const placeholderColor = isDark ? '#5A6B7A' : '#BDBDBD';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', backgroundColor: isDark ? colors.canvas : '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
      <ScrollView
        style={{ flex: 1, width: '100%', backgroundColor: isDark ? colors.canvas : '#FFFFFF' }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: contentMinHeight,
          paddingHorizontal: layout.horizontalPadding,
          paddingVertical: layout.verticalPadding,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
            alignItems: 'stretch',
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <MedTrackLogoHorizontal height={layout.logoHeight} />
          </View>

          <Text
            style={{
              color: colors.muted,
              textAlign: 'center',
              fontFamily: 'DMSans_500Medium',
              fontSize: 16,
              marginBottom: 32,
              letterSpacing: 0.1,
            }}
          >
            Login to your Account
          </Text>

          <View
            style={{
              width: '100%',
              maxWidth: 400,
              minWidth: 0,
              gap: 16,
              alignSelf: 'stretch',
            }}
          >
            <TextInput
              style={{
                backgroundColor: inputBg,
                borderRadius: 12,
                height: 56,
                paddingHorizontal: 20,
                fontFamily: 'DMSans_400Regular',
                fontSize: 16,
                color: colors.foreground,
                width: '100%',
                alignSelf: 'stretch',
                borderWidth: isDark ? 1 : 0,
                borderColor: inputBorder,
                shadowColor: isDark ? 'transparent' : '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.06,
                shadowRadius: 10,
                elevation: isDark ? 0 : 3,
                ...(Platform.OS === 'web'
                  ? ({ outlineStyle: 'none' } as object)
                  : null),
              }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              placeholderTextColor={placeholderColor}
              editable={!isSubmitting}
            />

            <View
              style={{
                width: '100%',
                position: 'relative',
                justifyContent: 'center',
                alignSelf: 'stretch',
              }}
            >
              <TextInput
                style={{
                  backgroundColor: inputBg,
                  borderRadius: 12,
                  height: 56,
                  paddingHorizontal: 20,
                  paddingRight: 52,
                  fontFamily: 'DMSans_400Regular',
                  fontSize: 16,
                  color: colors.foreground,
                  width: '100%',
                  alignSelf: 'stretch',
                  borderWidth: isDark ? 1 : 0,
                  borderColor: inputBorder,
                  shadowColor: isDark ? 'transparent' : '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.06,
                  shadowRadius: 10,
                  elevation: isDark ? 0 : 3,
                  ...(Platform.OS === 'web'
                    ? ({ outlineStyle: 'none' } as object)
                    : null),
                }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                placeholderTextColor={placeholderColor}
                editable={!isSubmitting}
              />
              <Pressable
                style={{
                  position: 'absolute',
                  right: 4,
                  top: 0,
                  bottom: 0,
                  width: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
                hitSlop={8}
              >
                <Feather
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color={isDark ? colors.muted : '#9CA3AF'}
                />
              </Pressable>
            </View>

            {error ? (
              <Text
                style={{
                  color: colors.accent.secondary,
                  textAlign: 'center',
                  fontFamily: 'DMSans_500Medium',
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                {error}
              </Text>
            ) : null}

            <ClayButton
              label={isSubmitting ? 'Signing in…' : 'Sign In'}
              fullWidth
              onPress={handleLogin}
              disabled={isSubmitting}
              style={{ marginTop: 8, height: 45, minHeight: 45 }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
