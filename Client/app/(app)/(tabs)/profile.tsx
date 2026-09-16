import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ConfirmModal, ProfileSkeleton } from "@/components/feedback";
import { ScreenLayout } from "@/components/layout";
import { ClayButton } from "@/components/ui";
import { getTabContentBottomPadding, SCREEN_TITLES } from "@/constants/navigation";
import { getDashboardStats } from "@/features/dashboard";
import { logout } from "@/features/auth/services/authService";
import {
  EditDoctorForm,
  ProfileDetailsCard,
  ProfileHero,
  ProfileStatStrip,
  useDoctorProfile,
} from "@/features/profile";
import type { DoctorProfileFormValues } from "@/features/profile";
import { useDocumentTitle, useIsWideLayout } from "@/hooks";
import { useAuthContext } from "@/providers";
import { useTheme } from "@/theme";
import styles from "@/styles/screens/profile-tab.styles";
import wideStyles from "@/styles/layout/wide-layout.styles";

const EMPTY_FORM: DoctorProfileFormValues = {
  fullName: "",
  specialty: "",
  clinic: "",
  phone: "",
};

const PROFILE_SUBTITLE = "View and update your personal information";

/** Doctor profile hub — view/edit professional details. */
export default function ProfileTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isWideLayout = useIsWideLayout();
  const { user, setUser } = useAuthContext();
  const { colors } = useTheme();
  const [formValues, setFormValues] =
    useState<DoctorProfileFormValues>(EMPTY_FORM);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const {
    profile,
    isLoading,
    isEditing,
    isSaving,
    saveError,
    formErrors,
    setFormErrors,
    refresh,
    startEditing,
    cancelEditing,
    save,
  } = useDoctorProfile({
    user,
    onSaved: (saved) => {
      if (user) {
        setUser({ ...user, displayName: saved.fullName });
      }
    },
  });

  useDocumentTitle(SCREEN_TITLES.profile);

  const loadScreenData = useCallback(async () => {
    await refresh();
    const dashboardStats = await getDashboardStats();
    setTotalPatients(dashboardStats.totalPatients);
    setTotalVisits(
      dashboardStats.visitsByCondition.reduce((sum, item) => sum + item.count, 0),
    );
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      loadScreenData();
    }, [loadScreenData]),
  );

  function handleStartEditing() {
    if (!profile) return;
    setFormValues({
      fullName: profile.fullName,
      specialty: profile.specialty,
      clinic: profile.clinic,
      phone: profile.phone,
    });
    setFormErrors({});
    startEditing();
  }

  function handleCancelEditing() {
    cancelEditing();
  }

  async function handleSave() {
    await save(formValues);
  }

  function updateFormField<K extends keyof DoctorProfileFormValues>(
    field: K,
    value: DoctorProfileFormValues[K],
  ) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

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

  const headerActions = profile ? (
    isEditing ? (
      <>
        <ClayButton
          label={isSaving ? "Saving…" : "Save Profile"}
          onPress={handleSave}
          disabled={isSaving}
        />
        <ClayButton
          label="Cancel"
          variant="outline"
          onPress={handleCancelEditing}
          disabled={isSaving}
        />
      </>
    ) : (
      <>
        <ClayButton label="Edit Profile" variant="outline" onPress={handleStartEditing} />
        <ClayButton
          label="Sign out"
          variant="outline"
          onPress={() => setShowSignOutConfirm(true)}
        />
      </>
    )
  ) : null;

  return (
    <ScreenLayout title={SCREEN_TITLES.profile} subtitle={PROFILE_SUBTITLE}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        isWideLayout && wideStyles.contentContainer,
        { paddingBottom: getTabContentBottomPadding(insets.bottom, isWideLayout) },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {isLoading ? (
        <ProfileSkeleton />
      ) : !profile ? (
        <Text style={[styles.muted, { color: colors.muted }]}>
          Sign in to view your profile.
        </Text>
      ) : (
        <>
          <ProfileHero profile={profile} actions={headerActions} />

          {saveError ? (
            <View style={[styles.errorBanner, { backgroundColor: colors.dangerBg }]}>
              <Text style={[styles.errorBannerText, { color: colors.danger }]}>
                {saveError}
              </Text>
            </View>
          ) : null}

          {isEditing ? (
            <EditDoctorForm
              profile={profile}
              values={formValues}
              errors={formErrors}
              onChange={updateFormField}
              isWideLayout={isWideLayout}
            />
          ) : (
            <ProfileDetailsCard profile={profile} isWideLayout={isWideLayout} />
          )}

          {!isEditing ? (
            <ProfileStatStrip
              totalPatients={totalPatients}
              totalVisits={totalVisits}
            />
          ) : null}
        </>
      )}
    </ScrollView>

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
    </ScreenLayout>
  );
}
