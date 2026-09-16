import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';

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
  const { colors, isDark } = useTheme();
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
      style={[
        {
          overflow: 'hidden',
          backgroundColor: colors.inputBg,
          width,
          height,
          borderRadius: radius,
        },
        style,
      ]}
    >
      {layoutWidth > 0 ? (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '40%',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.72)',
            transform: [{ translateX }],
          }}
        />
      ) : null}
    </View>
  );
}
