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

import { MedTrackLogoHorizontal } from '@/components/ui';
import { ApiError } from '@/types/api';
import styles from '@/styles/auth/login-form.styles';

import { useAuthContext } from '../hooks/useAuth';
import { login } from '../services/authService';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getResponsiveLayout(width: number) {
  const isCompact = width < 360;
  const isLarge = width >= 428;

  return {
    horizontalPadding: isCompact ? 28 : isLarge ? 40 : 32,
    formMaxWidth: Math.min(width - (isCompact ? 56 : isLarge ? 80 : 64), 400),
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

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: contentMinHeight,
            paddingHorizontal: layout.horizontalPadding,
            paddingVertical: layout.verticalPadding,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.centerBlock, { maxWidth: layout.formMaxWidth }]}>
          <View style={styles.logoWrap}>
            <MedTrackLogoHorizontal height={layout.logoHeight} />
          </View>

          <Text style={styles.subtitle}>Login to your Account</Text>

          <View style={styles.formStack}>
            <TextInput
              style={styles.flatInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              placeholderTextColor="#BDBDBD"
              editable={!isSubmitting}
            />

            <View style={styles.passwordWrap}>
              <TextInput
                style={[styles.flatInput, styles.passwordInput]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                placeholderTextColor="#BDBDBD"
                editable={!isSubmitting}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
                hitSlop={8}
              >
                <Feather
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                isSubmitting && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={isSubmitting}
            >
              <Text style={styles.loginButtonLabel}>
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
