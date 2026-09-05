import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import styles from '@/styles/feedback/shimmer-bone.styles';

type ShimmerBoneProps = {
  width?: DimensionValue;
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

export function ShimmerBone({
  width = '100%',
  height,
  radius = 8,
  style,
}: ShimmerBoneProps) {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [progress]);

  const translateX = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-layoutWidth, layoutWidth],
      }),
    [layoutWidth, progress],
  );

  return (
    <View
      onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
      style={[styles.bone, { width, height, borderRadius: radius }, style]}
    >
      {layoutWidth > 0 ? (
        <Animated.View style={[styles.highlight, { transform: [{ translateX }] }]} />
      ) : null}
    </View>
  );
}
