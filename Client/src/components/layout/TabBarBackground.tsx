import Svg, { Path } from 'react-native-svg';

type TabBarBackgroundProps = {
  width: number;
  height: number;
};

/** White tab bar with rounded top corners and center notch for FAB */
export function TabBarBackground({ width, height }: TabBarBackgroundProps) {
  const cornerRadius = 24;
  const centerX = width / 2;
  const notchHalfWidth = 42;
  const notchDepth = 26;

  const path = `
    M 0 ${height}
    L 0 ${cornerRadius}
    Q 0 0 ${cornerRadius} 0
    L ${centerX - notchHalfWidth} 0
    C ${centerX - notchHalfWidth + 8} 0 ${centerX - 28} ${notchDepth} ${centerX} ${notchDepth + 4}
    C ${centerX + 28} ${notchDepth} ${centerX + notchHalfWidth - 8} 0 ${centerX + notchHalfWidth} 0
    L ${width - cornerRadius} 0
    Q ${width} 0 ${width} ${cornerRadius}
    L ${width} ${height}
    Z
  `;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height }}
    >
      <Path d={path} fill="#FFFFFF" />
    </Svg>
  );
}
