import { Pressable, Text, View } from 'react-native';

import { ClayInput } from '@/components/ui';
import type { ConditionDefinition } from '@/features/conditions/types';
import styles from '@/styles/visits/dynamic-vitals-form.styles';

type VitalValues = Record<string, string | boolean | undefined>;

type DynamicVitalsFormProps = {
  condition: ConditionDefinition;
  values: VitalValues;
  errors: Record<string, string>;
  onChange: (key: string, value: string | boolean) => void;
  title?: string;
};

/** PRD 3.2 — Field set is driven entirely by the selected condition. */
export function DynamicVitalsForm({
  condition,
  values,
  errors,
  onChange,
  title = 'Record vitals',
}: DynamicVitalsFormProps) {
  return (
    <View style={styles.scrollContent}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.hint}>
        {condition.fields.length} measurements required for {condition.label.toLowerCase()}.
      </Text>

      {condition.fields.map((field) => {
        const label = field.unit ? `${field.label} (${field.unit})` : field.label;

        if (field.type === 'boolean') {
          const current = values[field.key];
          return (
            <View key={field.key} style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <View style={styles.booleanRow}>
                {(['Yes', 'No'] as const).map((option) => {
                  const boolValue = option === 'Yes';
                  const selected = current === boolValue;
                  return (
                    <Pressable
                      key={option}
                      style={[styles.booleanOption, selected && styles.booleanOptionSelected]}
                      onPress={() => onChange(field.key, boolValue)}
                    >
                      <Text
                        style={[styles.booleanLabel, selected && styles.booleanLabelSelected]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors[field.key] ? (
                <Text style={styles.errorText}>{errors[field.key]}</Text>
              ) : null}
            </View>
          );
        }

        const rawValue = values[field.key];
        const textValue = typeof rawValue === 'string' ? rawValue : '';

        return (
          <View key={field.key} style={styles.fieldBlock}>
            <ClayInput
              label={label}
              placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
              value={textValue}
              onChangeText={(text) => {
                const next =
                  field.type === 'number' ? text.replace(/[^0-9.]/g, '') : text;
                onChange(field.key, next);
              }}
              keyboardType={field.type === 'number' ? 'decimal-pad' : 'default'}
            />
            {errors[field.key] ? (
              <Text style={styles.errorText}>{errors[field.key]}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
