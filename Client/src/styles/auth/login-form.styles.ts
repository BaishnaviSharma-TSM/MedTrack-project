import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBlock: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    marginBottom: 32,
    letterSpacing: 0.1,
  },
  formStack: {
    width: '100%',
    gap: 16,
  },
  flatInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 20,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: colors.foreground,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  passwordWrap: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 52,
  },
  eyeButton: {
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: colors.accent.secondary,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    marginTop: 4,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: colors.brand.primary,
    borderRadius: 12,
    height: 56,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  loginButtonLabel: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
