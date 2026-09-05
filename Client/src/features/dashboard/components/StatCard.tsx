import { Pressable, Text, View } from 'react-native';

import styles from '@/styles/dashboard/stat-card.styles';

type StatCardProps = {
  label: string;
  value: number | string;
  subtitle?: string;
  onPress?: () => void;
};

export function StatCard({ label, value, subtitle, onPress }: StatCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Pressable>
  );
}
