import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ClayInput } from '@/components/ui';
import { spacing, useTheme } from '@/theme';
import baseStyles from '@/styles/patients/patient-info-step.styles';

export type PatientDemographics = {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  contactNumber: string;
  address: string;
};

type PatientInfoStepProps = {
  values: PatientDemographics;
  errors: Partial<Record<keyof PatientDemographics, string>>;
  onChange: <K extends keyof PatientDemographics>(
    field: K,
    value: PatientDemographics[K],
  ) => void;
  isWideLayout?: boolean;
  existingPatientId?: string;
  actions?: ReactNode;
  submitError?: string | null;
};

const GENDER_OPTIONS: { value: PatientDemographics['gender']; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const FIELD_LABEL_STYLE = { fontSize: 15 };

function renderNameField(
  values: PatientDemographics,
  errors: PatientInfoStepProps['errors'],
  onChange: PatientInfoStepProps['onChange'],
  isWideLayout: boolean,
  errorColor: string,
) {
  return (
    <View style={isWideLayout ? baseStyles.fieldBlock : undefined}>
      <ClayInput
        label="Full name"
        required
        placeholder="Enter patient name"
        value={values.name}
        onChangeText={(text) => onChange('name', text)}
        autoCapitalize="words"
        variant={isWideLayout ? 'flat' : 'clay'}
        labelStyle={FIELD_LABEL_STYLE}
      />
      {errors.name ? (
        <Text style={[baseStyles.errorText, { color: errorColor }]}>{errors.name}</Text>
      ) : null}
    </View>
  );
}

function renderAgeField(
  values: PatientDemographics,
  errors: PatientInfoStepProps['errors'],
  onChange: PatientInfoStepProps['onChange'],
  isWideLayout: boolean,
  errorColor: string,
) {
  return (
    <View style={isWideLayout ? baseStyles.fieldBlock : undefined}>
      <ClayInput
        label="Age"
        required
        placeholder="Enter age"
        value={values.age}
        onChangeText={(text) => onChange('age', text.replace(/[^0-9]/g, ''))}
        keyboardType="number-pad"
        maxLength={3}
        variant={isWideLayout ? 'flat' : 'clay'}
        labelStyle={FIELD_LABEL_STYLE}
      />
      {errors.age ? (
        <Text style={[baseStyles.errorText, { color: errorColor }]}>{errors.age}</Text>
      ) : null}
    </View>
  );
}

function renderContactField(
  values: PatientDemographics,
  errors: PatientInfoStepProps['errors'],
  onChange: PatientInfoStepProps['onChange'],
  isWideLayout: boolean,
  errorColor: string,
) {
  return (
    <View style={isWideLayout ? baseStyles.fieldBlock : undefined}>
      <ClayInput
        label="Contact number"
        required
        placeholder="10-digit mobile number"
        value={values.contactNumber}
        onChangeText={(text) => onChange('contactNumber', text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
        maxLength={10}
        variant={isWideLayout ? 'flat' : 'clay'}
        labelStyle={FIELD_LABEL_STYLE}
      />
      {errors.contactNumber ? (
        <Text style={[baseStyles.errorText, { color: errorColor }]}>
          {errors.contactNumber}
        </Text>
      ) : null}
    </View>
  );
}

function renderAddressField(
  values: PatientDemographics,
  errors: PatientInfoStepProps['errors'],
  onChange: PatientInfoStepProps['onChange'],
  isWideLayout: boolean,
  errorColor: string,
) {
  return (
    <View style={isWideLayout ? baseStyles.fieldBlock : undefined}>
      <ClayInput
        label="Address"
        placeholder="Enter patient address"
        value={values.address}
        onChangeText={(text) => onChange('address', text)}
        autoCapitalize="words"
        maxLength={255}
        variant={isWideLayout ? 'flat' : 'clay'}
        labelStyle={FIELD_LABEL_STYLE}
      />
      {errors.address ? (
        <Text style={[baseStyles.errorText, { color: errorColor }]}>{errors.address}</Text>
      ) : null}
    </View>
  );
}

export function PatientInfoStep({
  values,
  errors,
  onChange,
  isWideLayout = false,
  existingPatientId,
  actions,
  submitError,
}: PatientInfoStepProps) {
  const { colors, isDark } = useTheme();

  const formCardStyle = isWideLayout
    ? {
        backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
        padding: spacing.lg,
        gap: spacing.lg,
        width: '100%' as const,
      }
    : undefined;

  const content = (
    <>
      <View>
        <Text style={[baseStyles.sectionTitle, { color: colors.foreground }]}>
          Patient details
        </Text>
        <Text style={[baseStyles.hint, { color: colors.muted }]}>
          Register the patient once. Conditions and vitals are captured per visit.
        </Text>
      </View>

      {submitError ? (
        <View style={[baseStyles.errorBanner, { backgroundColor: colors.dangerBg }]}>
          <Text style={[baseStyles.errorBannerText, { color: colors.danger }]}>
            {submitError}
          </Text>
        </View>
      ) : null}

      {isWideLayout ? (
        <View style={baseStyles.twoColumnRow}>
          <View style={baseStyles.columnField}>
            {renderNameField(values, errors, onChange, true, colors.danger)}
          </View>
          <View style={baseStyles.columnField}>
            {renderAgeField(values, errors, onChange, true, colors.danger)}
          </View>
        </View>
      ) : (
        <>
          {renderNameField(values, errors, onChange, false, colors.danger)}
          {renderAgeField(values, errors, onChange, false, colors.danger)}
        </>
      )}

      <View>
        <Text style={[baseStyles.fieldLabel, { color: colors.foreground }]}>
          Gender
          <Text style={{ color: colors.danger, fontFamily: 'DMSans_700Bold' }}>{' *'}</Text>
        </Text>
        <View style={baseStyles.chipRow}>
          {GENDER_OPTIONS.map((option) => {
            const selected = values.gender === option.value;
            return (
              <Pressable
                key={option.value}
                style={[
                  baseStyles.chip,
                  {
                    backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
                    borderColor: isDark ? colors.borderSubtle : colors.inputBg,
                  },
                  selected && {
                    borderColor: colors.brand.primary,
                    backgroundColor: colors.brand.alpha08,
                  },
                ]}
                onPress={() => onChange('gender', option.value)}
              >
                <Text
                  style={[
                    baseStyles.chipLabel,
                    { color: colors.muted },
                    selected && { color: colors.brand.primary, fontFamily: 'DMSans_700Bold' },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errors.gender ? (
          <Text style={[baseStyles.errorText, { color: colors.danger }]}>{errors.gender}</Text>
        ) : null}
      </View>

      {isWideLayout ? (
        <View style={baseStyles.twoColumnRow}>
          <View style={baseStyles.columnField}>
            {renderContactField(values, errors, onChange, true, colors.danger)}
          </View>
          <View style={baseStyles.columnField}>
            {renderAddressField(values, errors, onChange, true, colors.danger)}
          </View>
        </View>
      ) : (
        <>
          {renderContactField(values, errors, onChange, false, colors.danger)}
          {renderAddressField(values, errors, onChange, false, colors.danger)}
        </>
      )}

      <View
        style={[
          baseStyles.noticeBox,
          { backgroundColor: colors.brand.alpha06 },
        ]}
      >
        <Text style={[baseStyles.noticeTitle, { color: colors.brand.primary }]}>
          Patient ID
        </Text>
        <Text style={[baseStyles.noticeText, { color: colors.muted }]}>
          {existingPatientId ??
            'A unique patient ID is generated automatically when you save.'}
        </Text>
      </View>

      {isWideLayout && actions ? (
        <View style={baseStyles.cardFooterActions}>{actions}</View>
      ) : null}
    </>
  );

  return (
    <View style={[baseStyles.fieldGroup, formCardStyle]}>
      {content}
    </View>
  );
}
