import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClayBackground, MedTrackLogo } from '@/components/ui';
import { APP_TAGLINE } from '@/constants';
import styles from '@/styles/auth/logo-splash.styles';

const SPLASH_DURATION_MS = 2800;

export function LogoSplash() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const horizontalPadding = width < 360 ? 20 : 32;
  const logoSize = width < 360 ? 'sm' : 'md';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const navigated = useRef(false);

  const goToLogin = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    router.replace('/(auth)/login');
  }, [router]);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(goToLogin, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, taglineAnim, goToLogin]);

  return (
    <ClayBackground style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable
          style={[styles.pressable, { paddingHorizontal: horizontalPadding }]}
          onPress={goToLogin}
        >
          <Animated.View
            style={[
              styles.logoWrap,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <MedTrackLogo size={logoSize} />
          </Animated.View>

          <Animated.View style={{ opacity: taglineAnim }}>
            <Text style={styles.tagline}>{APP_TAGLINE}</Text>
            <Text style={styles.hint}>Tap to continue</Text>
          </Animated.View>
        </Pressable>
      </SafeAreaView>
    </ClayBackground>
  );
}
