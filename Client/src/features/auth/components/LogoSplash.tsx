import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MedTrackLogo } from '@/components/ui';
import { APP_TAGLINE } from '@/constants';
import { useDocumentTitle } from '@/hooks';
import { useTheme } from '@/theme';

const FADE_IN_MS = Platform.OS === 'web' ? 550 : 800;
const TAGLINE_MS = Platform.OS === 'web' ? 400 : 500;
const FADE_OUT_MS = Platform.OS === 'web' ? 450 : 550;
const SPLASH_VISIBLE_MS = Platform.OS === 'web' ? 2000 : 3400;

export function LogoSplash() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const horizontalPadding = width < 360 ? 20 : 32;
  const logoSize = width < 360 ? 'sm' : 'md';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const navigated = useRef(false);

  useDocumentTitle('Welcome');

  const goToLogin = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    router.replace('/(auth)/login');
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: FADE_IN_MS,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 35,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: TAGLINE_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: FADE_OUT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(taglineAnim, {
          toValue: 0,
          duration: FADE_OUT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.96,
          duration: FADE_OUT_MS,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && !cancelled) {
          goToLogin();
        }
      });
    }, SPLASH_VISIBLE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fadeAnim, scaleAnim, taglineAnim, goToLogin]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: horizontalPadding,
          }}
        >
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            <MedTrackLogo size={logoSize} />
          </Animated.View>

          <Animated.View style={{ opacity: taglineAnim }}>
            <Text
              style={{
                color: colors.muted,
                textAlign: 'center',
                marginTop: 20,
                fontFamily: 'DMSans_500Medium',
                fontSize: 16,
              }}
            >
              {APP_TAGLINE}
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
