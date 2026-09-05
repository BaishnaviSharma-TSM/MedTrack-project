import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProfileSkeleton } from "@/components/feedback";
import { ClayButton } from "@/components/ui";
import { getTabContentBottomPadding } from "@/constants/navigation";
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
import { useAuthContext } from "@/providers";
import styles from "@/styles/screens/profile-tab.styles";

const EMPTY_FORM: DoctorProfileFormValues = {
  fullName: "",
  specialty: "",
  clinic: "",
  phone: "",
};

/** Doctor profile hub — view/edit professional details (PRD users: name, clinic, role). */
export default function ProfileTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useAuthContext();
  const [formValues, setFormValues] =
    useState<DoctorProfileFormValues>(EMPTY_FORM);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);

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

  async function handleLogout() {
    await logout();
    setUser(null);
    router.replace("/(auth)");
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: getTabContentBottomPadding(insets.bottom) },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* <Text style={styles.pageTitle}>Profile</Text>
      <Text style={styles.pageSubtitle}>Your professional details and clinic activity</Text> */}

      {isLoading ? (
        <ProfileSkeleton />
      ) : !profile ? (
        <Text style={styles.muted}>Sign in to view your profile.</Text>
      ) : (
        <>
          <ProfileHero profile={profile} />

          {!isEditing ? (
            <ProfileStatStrip
              totalPatients={totalPatients}
              totalVisits={totalVisits}
            />
          ) : null}

          {isEditing ? (
            <EditDoctorForm
              profile={profile}
              values={formValues}
              errors={formErrors}
              onChange={updateFormField}
            />
          ) : (
            <ProfileDetailsCard profile={profile} />
          )}

          <View style={styles.actions}>
            {saveError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{saveError}</Text>
              </View>
            ) : null}

            {isEditing ? (
              <>
                <ClayButton
                  label={isSaving ? "Saving…" : "Save Profile"}
                  onPress={handleSave}
                  disabled={isSaving}
                  style={styles.primaryButton}
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
                <ClayButton
                  label="Edit Profile"
                  onPress={handleStartEditing}
                  style={styles.primaryButton}
                />
                <ClayButton
                  label="Sign out"
                  variant="outline"
                  onPress={handleLogout}
                />
              </>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
