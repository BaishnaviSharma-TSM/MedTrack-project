import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';

import { ClayButton } from '@/components/ui';
import type { VitalSign } from '@/types';
import { fontFamilies, fontSizes, radii, shadows, spacing, useTheme } from '@/theme';

import { formatVitalReading } from '../utils/formatVitalValue';

type VisitVitalsChipsProps = {
  vitals: VitalSign[];
  max?: number;
};

const isWeb = Platform.OS === 'web';
const CHIP_MAX = 2;

function stopRowPress(event: GestureResponderEvent) {
  event.stopPropagation?.();
}

function VitalChip({ vital }: { vital: VitalSign }) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        minWidth: 0,
        maxWidth: '100%',
        backgroundColor: isDark ? colors.brand.alpha06 : '#F0ECF5',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        gap: 4,
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          flexShrink: 1,
          fontFamily: fontFamilies.body.medium,
          fontSize: 11,
          color: colors.muted,
        }}
      >
        {vital.label}:
      </Text>
      <Text
        numberOfLines={1}
        style={{
          flexShrink: 0,
          fontFamily: fontFamilies.body.bold,
          fontSize: 11,
          color: colors.foreground,
        }}
      >
        {formatVitalReading(vital)}
      </Text>
    </View>
  );
}

function VitalsDetailsModal({
  visible,
  vitals,
  onClose,
}: {
  visible: boolean;
  vitals: VitalSign[];
  onClose: () => void;
}) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.lg,
        }}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close vitals"
      >
        <Pressable
          style={{
            width: '100%',
            maxWidth: 400,
            maxHeight: '80%',
            backgroundColor: colors.cardBg,
            borderRadius: radii.card,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            padding: spacing.lg,
            gap: spacing.md,
            ...shadows.clayCard,
          }}
          onPress={(event) => event.stopPropagation()}
          accessibilityRole="none"
        >
          <Text
            style={{
              fontFamily: fontFamilies.heading.bold,
              fontSize: fontSizes.lg,
              color: colors.foreground,
            }}
          >
            Vitals
          </Text>
          <ScrollView
            style={{ maxHeight: 360 }}
            contentContainerStyle={{ gap: spacing.sm }}
            showsVerticalScrollIndicator={false}
          >
            {vitals.map((vital) => (
              <View
                key={vital.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: spacing.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.md,
                  borderRadius: 10,
                  backgroundColor: colors.brand.alpha04,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontFamily: fontFamilies.body.medium,
                    fontSize: fontSizes.sm,
                    color: colors.muted,
                  }}
                >
                  {vital.label}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamilies.body.bold,
                    fontSize: fontSizes.sm,
                    color: colors.foreground,
                  }}
                >
                  {formatVitalReading(vital)}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ClayButton
              label="Close"
              variant="outline"
              onPress={onClose}
              style={{ minWidth: 96 }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function VisitVitalsChips({ vitals, max = CHIP_MAX }: VisitVitalsChipsProps) {
  const { colors, isDark } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const shown = vitals.slice(0, max);
  const extraCount = vitals.length - shown.length;

  if (shown.length === 0) {
    return (
      <Text style={{ fontFamily: fontFamilies.body.regular, fontSize: 13, color: colors.muted }}>
        —
      </Text>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: 6,
        minWidth: 0,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {shown.map((vital) => (
        <View
          key={vital.key}
          style={{ flexShrink: 1, minWidth: 0, maxWidth: extraCount > 0 ? '44%' : '50%' }}
        >
          <VitalChip vital={vital} />
        </View>
      ))}
      {extraCount > 0 ? (
        <Pressable
          onPress={(event) => {
            stopRowPress(event);
            setModalVisible(true);
          }}
          onPressIn={stopRowPress}
          accessibilityRole="button"
          accessibilityLabel={`Show ${extraCount} more vitals`}
          hitSlop={6}
          {...(isWeb ? { dataSet: { stopRowPress: 'true' } } : null)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            backgroundColor: isDark ? colors.brand.alpha10 : colors.brand.alpha08,
            ...(isWeb ? ({ cursor: 'pointer' } as object) : null),
          }}
        >
          <Feather name="plus" size={12} color={colors.accent.primary} />
        </Pressable>
      ) : null}
      <VitalsDetailsModal
        visible={modalVisible}
        vitals={vitals}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
