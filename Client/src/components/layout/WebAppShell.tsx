import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { ConfirmModal } from "@/components/feedback";
import { ClayButton, MedTrackLogoHorizontal } from "@/components/ui";
import { isSidebarNavActive, SIDEBAR_NAV_ITEMS } from "@/constants/navigation";
import { logout } from "@/features/auth/services/authService";
import { getDashboardStats } from "@/features/dashboard";
import { getProfileInitials } from "@/features/profile";
import { formatStaffRole } from "@/features/profile/utils/formatStaffRole";
import { WebPageMetaProvider } from "@/hooks/useWebPageMeta";
import { useAuthContext } from "@/providers";
import baseStyles from "@/styles/layout/web-sidebar.styles";
import { fontFamilies, useTheme } from "@/theme";

import { WebGlobalHeader } from "./WebGlobalHeader";

type WebSidebarProps = {
  children: ReactNode;
};

/** Desktop clinic sidebar for wide web layout (>= 768px). */
export function WebAppShell({ children }: WebSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const { user, setUser } = useAuthContext();
  const { colors, isDark } = useTheme();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const displayName = user?.displayName ?? user?.email ?? "Staff member";
  const initials = getProfileInitials(user?.displayName, user?.email);
  const roleLabel =
    user?.role === "doctor" || user?.role === "nurse"
      ? formatStaffRole(user.role)
      : (user?.role ?? "Staff");

  const loadPendingCount = useCallback(async () => {
    try {
      const stats = await getDashboardStats();
      setPendingCount(stats.pendingFirstVisitCount);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadPendingCount();
  }, [loadPendingCount, pathname]);

  async function handleConfirmSignOut() {
    setIsSigningOut(true);
    try {
      await logout();
      setUser(null);
      router.replace("/(auth)");
    } finally {
      setIsSigningOut(false);
      setShowSignOutConfirm(false);
    }
  }

  const themed = {
    root: {
      backgroundColor: colors.canvas,
      ...(Platform.OS === 'web'
        ? ({ minHeight: '100vh', width: '100%', overflow: 'hidden' } as object)
        : null),
    },
    sidebar: {
      backgroundColor: isDark ? '#091520' : colors.cardBg,
      borderRightColor: colors.borderMuted,
    },
    navItemActive: {
      backgroundColor: colors.brand.alpha10,
    },
    navLabel: {
      color: colors.muted,
    },
    navLabelActive: {
      color: colors.accent.primary,
    },
    userSection: {
      borderTopColor: colors.borderMuted,
    },
    userAvatar: {
      backgroundColor: colors.brand.alpha10,
    },
    userAvatarInitials: {
      color: colors.brand.primary,
    },
    userName: {
      color: colors.foreground,
    },
    userRole: {
      color: colors.muted,
    },
    mainPane: {
      backgroundColor: colors.canvas,
    },
  };

  return (
    <WebPageMetaProvider>
      <View style={[baseStyles.root, themed.root, { flexDirection: 'row' }]}>
        {/* ─── Sidebar ─── */}
        <View style={[baseStyles.sidebar, themed.sidebar]}>
          <View style={baseStyles.logoWrap}>
            <MedTrackLogoHorizontal />
          </View>

          {/* Navigation items */}
          <View style={baseStyles.navSection}>
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const active = isSidebarNavActive(
                segments,
                item.matchSegments,
                pathname,
              );
              return (
                <Pressable
                  key={item.href}
                  style={[
                    baseStyles.navItem,
                    active && [baseStyles.navItemActive, themed.navItemActive],
                  ]}
                  onPress={() => router.navigate(item.href as never)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Feather
                    name={item.icon}
                    size={20}
                    color={active ? colors.accent.primary : colors.muted}
                  />
                  <Text
                    style={[
                      baseStyles.navLabel,
                      themed.navLabel,
                      active && [baseStyles.navLabelActive, themed.navLabelActive],
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Pending patients card (replaces old buttons) */}
          <View
            style={{
              backgroundColor: isDark ? colors.cardBg : '#F0FAFB',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: isDark ? colors.borderSubtle : '#D0E8EC',
              padding: 14,
              marginBottom: 14,
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.body.medium,
                fontSize: 13,
                color: colors.foreground,
                lineHeight: 18,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamilies.body.bold,
                  fontSize: 15,
                  color: colors.accent.primary,
                }}
              >
                {pendingCount}
              </Text>
              {pendingCount === 1
                ? ' patient is registered but has no visit on record.'
                : ' patients are registered but have no visit on record.'}
            </Text>
            <ClayButton
              label="Record a visit"
              variant="secondary"
              icon="file-plus"
              fullWidth
              onPress={() => router.push('/(app)/visits/new')}
            />
          </View>

          {/* User section */}
          <View style={[baseStyles.userSection, themed.userSection]}>
            <View style={baseStyles.userRow}>
              <View style={[baseStyles.userAvatar, themed.userAvatar]}>
                <Text style={[baseStyles.userAvatarInitials, themed.userAvatarInitials]}>
                  {initials}
                </Text>
              </View>

              <View style={baseStyles.userTextBlock}>
                <Text style={[baseStyles.userName, themed.userName]} numberOfLines={1}>
                  {displayName}
                </Text>
                <Text style={[baseStyles.userRole, themed.userRole]} numberOfLines={1}>
                  {roleLabel}
                </Text>
              </View>

              <Pressable
                style={baseStyles.signOutIconButton}
                onPress={() => setShowSignOutConfirm(true)}
                accessibilityRole="button"
                accessibilityLabel="Sign out"
              >
                <Feather name="log-out" size={18} color={colors.muted} />
              </Pressable>
            </View>
          </View>
        </View>

        <ConfirmModal
          visible={showSignOutConfirm}
          title="Sign out?"
          message="Are you sure you want to sign out?"
          confirmLabel="Sign out"
          cancelLabel="Cancel"
          confirmLoading={isSigningOut}
          onConfirm={handleConfirmSignOut}
          onCancel={() => {
            if (!isSigningOut) {
              setShowSignOutConfirm(false);
            }
          }}
        />

        {/* ─── Main content pane ─── */}
        <View style={[baseStyles.mainPane, themed.mainPane]}>
          <WebGlobalHeader />
          <View style={baseStyles.mainPaneInner}>{children}</View>
        </View>
      </View>
    </WebPageMetaProvider>
  );
}
