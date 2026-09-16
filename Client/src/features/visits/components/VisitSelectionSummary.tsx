import { Pressable, Text, View } from 'react-native';

import styles from '@/styles/visits/visit-selection-summary.styles';

type SummaryItem = {
  label: string;
  value: string;
  onChange?: () => void;
};

type VisitSelectionSummaryProps = {
  items: SummaryItem[];
  isWideLayout?: boolean;
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.textBlock}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

/** Keeps the locked-in patient and condition visible while the doctor fills vitals. */
export function VisitSelectionSummary({ items, isWideLayout = false }: VisitSelectionSummaryProps) {
  if (items.length === 0) return null;

  const wideChangeItem =
    items.find((item) => item.label === 'Patient' && item.onChange) ??
    items.find((item) => item.onChange);

  if (isWideLayout) {
    return (
      <View style={[styles.container, styles.containerWide]}>
        <View style={styles.wideItems}>
          {items.map((item) => (
            <SummaryRow key={item.label} label={item.label} value={item.value} />
          ))}
        </View>

        {wideChangeItem?.onChange ? (
          <Pressable
            onPress={wideChangeItem.onChange}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Change ${wideChangeItem.label.toLowerCase()}`}
          >
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <SummaryRow label={item.label} value={item.value} />

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
