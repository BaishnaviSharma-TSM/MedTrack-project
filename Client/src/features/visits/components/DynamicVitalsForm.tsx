import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { ClayInput } from '@/components/ui';
import type { ConditionDefinition, ConditionFieldDef } from '@/features/conditions/types';
import styles from '@/styles/visits/dynamic-vitals-form.styles';
import { colors } from '@/theme';

type VitalValues = Record<string, string | boolean | undefined>;

type DynamicVitalsFormProps = {
  condition: ConditionDefinition;
  values: VitalValues;
  errors: Record<string, string>;
  onChange: (key: string, value: string | boolean) => void;
  title?: string;
  isWideLayout?: boolean;
};

function isBooleanField(field: ConditionFieldDef) {
  return field.type === 'boolean';
}

/** Pair fields two-across on wide layouts, keeping checkboxes on checkbox-only rows. */
function groupFields(fields: ConditionFieldDef[], isWideLayout: boolean) {
  if (!isWideLayout) {
    return fields.map((field) => [field]);
  }

  const rows: ConditionFieldDef[][] = [];
  let pair: ConditionFieldDef[] = [];
  let pairingBooleans: boolean | null = null;

  function flushPair() {
    if (pair.length === 0) return;
    rows.push(pair);
    pair = [];
    pairingBooleans = null;
  }

  fields.forEach((field) => {
    const isBoolean = isBooleanField(field);

    if (pairingBooleans !== null && pairingBooleans !== isBoolean) {
      flushPair();
    }

    pair.push(field);
    pairingBooleans = isBoolean;

    if (pair.length === 2) {
      flushPair();
    }
  });

  flushPair();
  return rows;
}

function VitalField({
  field,
  values,
  errors,
  onChange,
  isWideLayout,
}: {
  field: ConditionFieldDef;
  values: VitalValues;
  errors: Record<string, string>;
  onChange: (key: string, value: string | boolean) => void;
  isWideLayout: boolean;
}) {
  const label = field.unit ? `${field.label} (${field.unit})` : field.label;

  if (field.type === 'boolean') {
    const checked = values[field.key] === true;
    return (
      <View style={styles.fieldBlock}>
        <Pressable
          style={styles.checkboxRow}
          onPress={() => onChange(field.key, !checked)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          accessibilityLabel={field.label}
        >
          <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
            {checked ? <Feather name="check" size={14} color={colors.white} /> : null}
          </View>
          <Text style={styles.fieldLabel}>{field.label}</Text>
        </Pressable>
        {errors[field.key] ? <Text style={styles.errorText}>{errors[field.key]}</Text> : null}
      </View>
    );
  }

  const rawValue = values[field.key];
  const textValue = typeof rawValue === 'string' ? rawValue : '';

  return (
    <View style={styles.fieldBlock}>
      <ClayInput
        label={label}
        required={field.required !== false}
        labelStyle={styles.inputLabel}
        placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
        value={textValue}
        onChangeText={(text) => {
          const next = field.type === 'number' ? text.replace(/[^0-9.]/g, '') : text;
          onChange(field.key, next);
        }}
        keyboardType={field.type === 'number' ? 'decimal-pad' : 'default'}
        variant={isWideLayout ? 'flat' : 'clay'}
      />
      {errors[field.key] ? <Text style={styles.errorText}>{errors[field.key]}</Text> : null}
    </View>
  );
}

/** PRD 3.2 — Field set is driven entirely by the selected condition. */
export function DynamicVitalsForm({
  condition,
  values,
  errors,
  onChange,
  title = 'Record vitals',
  isWideLayout = false,
}: DynamicVitalsFormProps) {
  const rows = groupFields(condition.fields, isWideLayout);

  return (
    <View style={[styles.scrollContent, isWideLayout && styles.scrollContentWide]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {rows.map((row) => {
        const rowKey = row.map((field) => field.key).join('-');
        const useColumns = isWideLayout && row.length > 1;

        return (
          <View key={rowKey} style={useColumns ? styles.fieldRow : undefined}>
            {row.map((field) => (
              <View key={field.key} style={useColumns ? styles.fieldCol : undefined}>
                <VitalField
                  field={field}
                  values={values}
                  errors={errors}
                  onChange={onChange}
                  isWideLayout={isWideLayout}
                />
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}
