import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import styles from '@/styles/visits/visit-stepper.styles';
import { colors } from '@/theme';

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
};

/** Progress indicator for the Phase 3 record-visit flow: patient → condition → vitals. */
export function VisitStepper({ current, highestReached, onStepPress }: VisitStepperProps) {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isActive = step.number === current;
        const isDone = step.number < highestReached;
        const canNavigate = step.number <= highestReached && step.number !== current;
        const incomingDone = step.number <= highestReached;
        const outgoingDone = step.number < highestReached;
        const isFirst = index === 0;
        const isLast = index === STEPS.length - 1;

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
                <View
                  style={[
                    styles.bubble,
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
