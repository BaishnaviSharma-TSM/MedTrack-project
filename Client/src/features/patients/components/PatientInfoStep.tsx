import { Pressable, Text, View } from 'react-native';

import { ClayInput } from '@/components/ui';
import styles from '@/styles/patients/patient-info-step.styles';

export type PatientDemographics = {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  contactNumber: string;
};

type PatientInfoStepProps = {
  values: PatientDemographics;
  errors: Partial<Record<keyof PatientDemographics, string>>;
  onChange: <K extends keyof PatientDemographics>(
    field: K,
    value: PatientDemographics[K],
  ) => void;
};

const GENDER_OPTIONS: { value: PatientDemographics['gender']; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

/** PRD 2.1 — Name, age, gender, contact number. Unique ID is generated on save. */
export function PatientInfoStep({ values, errors, onChange }: PatientInfoStepProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.sectionTitle}>Patient details</Text>
      <Text style={styles.hint}>
        Register the patient once. Conditions and vitals are captured per visit.
      </Text>

      <ClayInput
        label="Full name"
        placeholder="Enter patient name"
        value={values.name}
        onChangeText={(text) => onChange('name', text)}
        autoCapitalize="words"
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <ClayInput
        label="Age"
        placeholder="Enter age"
        value={values.age}
        onChangeText={(text) => onChange('age', text.replace(/[^0-9]/g, ''))}
        keyboardType="number-pad"
        maxLength={3}
      />
      {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}

      <View>
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.chipRow}>
          {GENDER_OPTIONS.map((option) => {
            const selected = values.gender === option.value;
            return (
              <Pressable
                key={option.value}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => onChange('gender', option.value)}
              >
                <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
      </View>

      <ClayInput
        label="Contact number"
        placeholder="10-digit mobile number"
        value={values.contactNumber}
        onChangeText={(text) => onChange('contactNumber', text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
        maxLength={10}
      />
      {errors.contactNumber ? (
        <Text style={styles.errorText}>{errors.contactNumber}</Text>
      ) : null}

      <View style={styles.noticeBox}>
        <Text style={styles.noticeTitle}>Patient ID</Text>
        <Text style={styles.noticeText}>
          A unique patient ID is generated automatically when you save.
        </Text>
      </View>
    </View>
  );
}
