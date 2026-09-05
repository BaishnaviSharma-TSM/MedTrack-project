import { Pressable, Text, View } from 'react-native';

import type { ConditionDefinition } from '@/features/conditions/types';
import styles from '@/styles/visits/condition-select-step.styles';

type ConditionSelectStepProps = {
  conditions: ConditionDefinition[];
  value: string;
  error?: string;
  onChange: (conditionSlug: string) => void;
};

/** PRD 3.1 — Disease / condition selector driven by API or mock catalog. */
export function ConditionSelectStep({
  conditions,
  value,
  error,
  onChange,
}: ConditionSelectStepProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.sectionTitle}>Select condition</Text>
      <Text style={styles.hint}>
        Save the condition to load the matching vital-sign fields.
      </Text>

      <View style={styles.conditionGrid}>
        {conditions.map((condition) => {
          const selected = value === condition.slug;
          return (
            <Pressable
              key={condition.slug}
              style={[styles.conditionCard, selected && styles.conditionCardSelected]}
              onPress={() => onChange(condition.slug)}
            >
              <Text style={styles.conditionLabel}>{condition.label}</Text>
              <Text style={styles.conditionHint}>{condition.fields.length} measurements</Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
