import { View } from 'react-native';

import { ShimmerBone } from '@/components/feedback/ShimmerBone';
import styles from '@/styles/feedback/skeletons.styles';

function FieldPair() {
  return (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <View style={{ flex: 1, gap: 4, paddingVertical: 8 }}>
        <ShimmerBone width="40%" height={10} radius={4} />
        <ShimmerBone width="70%" height={14} radius={6} />
      </View>
      <View style={{ flex: 1, gap: 4, paddingVertical: 8 }}>
        <ShimmerBone width="35%" height={10} radius={4} />
        <ShimmerBone width="60%" height={14} radius={6} />
      </View>
    </View>
  );
}

export function VisitDetailSkeleton() {
  return (
    <View
      style={styles.whiteCard}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading visit"
    >
      {/* Header */}
      <View style={styles.rowBetween}>
        <ShimmerBone width={120} height={18} radius={6} />
        <ShimmerBone width={130} height={36} radius={10} />
      </View>

      {/* Visit Information fields */}
      <View style={styles.footerMeta}>
        <ShimmerBone width="30%" height={10} radius={4} />
        <View style={{ marginTop: 12, gap: 4 }}>
          <FieldPair />
          <FieldPair />
          <FieldPair />
          <FieldPair />
        </View>
      </View>

      {/* Vitals fields */}
      <View style={styles.footerMeta}>
        <ShimmerBone width="25%" height={10} radius={4} />
        <View style={{ marginTop: 12, gap: 4 }}>
          <FieldPair />
          <FieldPair />
          <FieldPair />
        </View>
      </View>

      {/* Notes */}
      <View style={styles.footerMeta}>
        <ShimmerBone width="28%" height={10} radius={4} />
        <View style={{ marginTop: 12 }}>
          <ShimmerBone width="100%" height={60} radius={12} />
        </View>
      </View>
    </View>
  );
}
