import { Pressable, Text, View } from 'react-native';

import styles from '@/styles/visits/visit-selection-summary.styles';

type SummaryItem = {
  label: string;
  value: string;
  onChange?: () => void;
};

type VisitSelectionSummaryProps = {
  items: SummaryItem[];
};

/** Keeps the locked-in patient and condition visible while the doctor fills vitals. */
export function VisitSelectionSummary({ items }: VisitSelectionSummaryProps) {
  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <View style={styles.textBlock}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value} numberOfLines={1}>
              {item.value}
            </Text>
          </View>

          {item.onChange ? (
            <Pressable
              onPress={item.onChange}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Change ${item.label.toLowerCase()}`}
            >
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </View>
  );
}
