import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import styles from '@/styles/visits/visit-stepper.styles';
import { useThemeColors } from '@/theme';

export type VisitStepNumber = 1 | 2 | 3;

const STEPS: { number: VisitStepNumber; label: string }[] = [
  { number: 1, label: 'Patient' },
  { number: 2, label: 'Condition' },
  { number: 3, label: 'Vitals' },
];

type VisitStepperProps = {
  current: VisitStepNumber;
  highestReached: VisitStepNumber;
  onStepPress: (step: VisitStepNumber) => void;
  orientation?: 'horizontal' | 'vertical';
};

/** Progress indicator for the Phase 3 record-visit flow: patient → condition → vitals. */
export function VisitStepper({
  current,
  highestReached,
  onStepPress,
  orientation = 'horizontal',
}: VisitStepperProps) {
  const colors = useThemeColors();
  const isVertical = orientation === 'vertical';

  return (
    <View style={isVertical ? styles.containerVertical : styles.container}>
      {STEPS.map((step, index) => {
        const isActive = step.number === current;
        const isDone = step.number < highestReached;
        const canNavigate = step.number <= highestReached && step.number !== current;
        const incomingDone = step.number <= highestReached;
        const outgoingDone = step.number < highestReached;
        const isFirst = index === 0;
        const isLast = index === STEPS.length - 1;
        const statusLabel = isActive ? 'Current' : isDone ? 'Done' : 'Upcoming';

        const bubble = (
          <View
            style={[
              styles.bubble,
              isVertical && styles.bubbleVertical,
              isActive && styles.bubbleActive,
              isDone && styles.bubbleDone,
            ]}
          >
            {isDone ? (
              <Feather name="check" size={14} color={colors.white} />
            ) : (
              <Text style={[styles.bubbleText, isActive && styles.bubbleTextActive]}>
                {step.number}
              </Text>
            )}
          </View>
        );

        if (isVertical) {
          return (
            <Pressable
              key={step.number}
              style={[styles.verticalStep, isLast && styles.verticalStepLast]}
              disabled={!canNavigate}
              onPress={() => onStepPress(step.number)}
              accessibilityRole="button"
              accessibilityLabel={`Step ${step.number}: ${step.label}`}
              accessibilityState={{ selected: isActive, disabled: !canNavigate }}
            >
              <View style={styles.verticalTrack}>
                {bubble}
                {isLast ? null : (
                  <View
                    style={[styles.verticalConnector, outgoingDone && styles.connectorDone]}
                  />
                )}
              </View>

              <View style={styles.verticalLabelWrap}>
                <Text
                  style={[
                    styles.stepLabel,
                    styles.verticalStepLabel,
                    isActive && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.verticalStepHint}>{statusLabel}</Text>
              </View>
            </Pressable>
          );
        }

        return (
          <View key={step.number} style={styles.stepWrap}>
            <View style={styles.bubbleRow}>
              <View
                style={[
                  styles.connector,
                  isFirst && styles.connectorHidden,
                  !isFirst && incomingDone && styles.connectorDone,
                ]}
              />
              <Pressable
                style={styles.step}
                disabled={!canNavigate}
                onPress={() => onStepPress(step.number)}
                accessibilityRole="button"
                accessibilityLabel={`Step ${step.number}: ${step.label}`}
              >
                {bubble}
              </Pressable>
              <View
                style={[
                  styles.connector,
                  isLast && styles.connectorHidden,
                  !isLast && outgoingDone && styles.connectorDone,
                ]}
              />
            </View>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{step.label}</Text>
          </View>
        );
      })}
    </View>
  );
}
