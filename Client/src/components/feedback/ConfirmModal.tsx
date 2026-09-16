import { Modal, Pressable, Text, View } from 'react-native';

import { ClayButton } from '@/components/ui';
import { fontFamilies, fontSizes, radii, shadows, spacing, useTheme } from '@/theme';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
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
        onPress={onCancel}
        accessibilityRole="button"
      >
        <Pressable
          style={{
            width: '100%',
            maxWidth: 400,
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
            {title}
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: fontSizes.base,
              color: colors.muted,
              lineHeight: 22,
            }}
          >
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}
          >
            <ClayButton
              label={cancelLabel}
              variant="outline"
              onPress={onCancel}
              disabled={confirmLoading}
              style={{ minWidth: 96 }}
            />
            <ClayButton
              label={confirmLabel}
              onPress={onConfirm}
              disabled={confirmLoading}
              style={{ minWidth: 96 }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
